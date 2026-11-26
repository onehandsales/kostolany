import { createAuthStore } from '../auth/createAuthStore';
import { createMockAuthSource } from '../auth/data/createMockAuthSource';
import { mockUserA, mockUserB } from '../auth/data/mockUsers';
import { createDraftSession } from './createDraftSession';
import { createMockDraftSource, type Draft, type DraftSource, type SaveDraft } from './draftSource';
import { changeBody, emptyEditor, insertImage, removeImage, selectText, toggleFormat } from './editorModel';
import { emptyPublishOptions } from './publishing';

beforeEach(() => jest.useFakeTimers()); afterEach(() => jest.useRealTimers());
const signal = () => new AbortController().signal;
async function finish<T>(task: Promise<T>) { await jest.runAllTimersAsync(); return task; }
function setup(source: DraftSource) {
  const auth = createAuthStore(createMockAuthSource({ delayMs: 0 }), mockUserA);
  const scope = { userId: mockUserA.id, revision: 0, draftId: source.newId(mockUserA.id), isNew: true };
  const session = createDraftSession(source, auth, scope); const close = session.activate();
  return { auth, scope, session, close };
}
it('Undo/Redo는 한글 입력 묶음·선택 서식·사진을 복원하고 새 편집 뒤 redo를 지운다', () => {
  const { session, close } = setup(createMockDraftSource({ delayMs: 0 }));
  session.edit(changeBody(session.getSnapshot().value, 'ㅎ'));
  session.edit(changeBody(session.getSnapshot().value, '한글 😀'));
  session.undo(); expect(session.getSnapshot().value.document.body).toBe('');
  session.redo(); expect(session.getSnapshot().value.document.body).toBe('한글 😀');
  session.edit(selectText(session.getSnapshot().value, { start: 0, end: 2 }));
  session.edit(toggleFormat(session.getSnapshot().value, { kind: 'bold' }));
  const formatted = session.getSnapshot().value;
  session.edit(insertImage(selectText(formatted, { start: 5, end: 5 }), { id: 'photo', assetId: 'local-sunset', source: 'library', description: 'photo', credit: '', width: 240, height: 168 }));
  const inserted = session.getSnapshot().value;
  session.edit(removeImage(inserted, 'photo')); session.undo();
  expect(session.getSnapshot().value.document.images).toEqual(inserted.document.images);
  expect(session.getSnapshot().historyAssetIds).toEqual(['local-sunset']);
  session.undo(); expect(session.getSnapshot().value.document.body).toBe(formatted.document.body);
  session.undo(); expect(session.getSnapshot().value.document.marks).toEqual([]);
  expect(session.getSnapshot().value.selection).toEqual({ start: 0, end: 2 });
  session.edit(changeBody(session.getSnapshot().value, '다른 입력')); expect(session.getSnapshot().canRedo).toBe(false); close();
});
it('Undo는 저장 중 이전 성공 응답보다 높은 버전으로 저장하며 발행 설정을 되돌리지 않는다', async () => {
  const source = createMockDraftSource({ delayMs: 20 }); const { session, scope, close } = setup(source);
  session.edit(changeBody(session.getSnapshot().value, '처음')); const saving = session.flush();
  await jest.advanceTimersByTimeAsync(1);
  session.undo(); const undoneVersion = session.getSnapshot().value.document.version;
  expect(undoneVersion).toBe(2); expect(await finish(saving)).toBe(true);
  const record = await finish(source.read(scope.userId, scope.draftId, signal()));
  expect(record?.document.body).toBe(''); expect(record?.document.version).toBe(undoneVersion);
  session.redo(); session.configure({ ...emptyPublishOptions(), unlisted: true });
  session.undo(); expect(session.getSnapshot().publishing.unlisted).toBe(true);
  const before = session.getSnapshot(); close(); session.redo(); expect(session.getSnapshot()).toBe(before);
});

it('같은 렌더에서 이어진 native 입력의 낮은 버전도 최신 세션 버전보다 높게 저장한다', async () => {
  const source = createMockDraftSource({ delayMs: 0 }); const { session, scope, close } = setup(source);
  const base = session.getSnapshot().value;
  session.edit(changeBody(base, '한')); session.edit(changeBody(base, '한글'));
  expect(session.getSnapshot().value.document.version).toBe(2);
  await finish(session.flush());
  expect((await finish(source.read(scope.userId, scope.draftId, signal())))?.document.body).toBe('한글'); close();
});
it('빈 새 문서는 만들지 않고 입력 지연 뒤 저장하며 빠른 변경과 응답 유실 재시도는 하나의 최신 초안만 남긴다', async () => {
  const source = createMockDraftSource({ delayMs: 5, lostResponses: 1 }); const { session, scope, close } = setup(source);
  expect(await session.flush()).toBe(true); expect(await finish(source.list(scope.userId, signal()))).toEqual([]);
  session.edit(changeBody(session.getSnapshot().value, '입력 취소')); session.edit(changeBody(session.getSnapshot().value, ''));
  expect(session.getSnapshot().dirty).toBe(false); expect(session.getSnapshot().saveStatus).toBe('idle');
  await jest.advanceTimersByTimeAsync(700); expect(await finish(source.list(scope.userId, signal()))).toEqual([]);
  session.edit(changeBody(session.getSnapshot().value, '첫 입력')); await jest.advanceTimersByTimeAsync(300);
  session.edit(changeBody(session.getSnapshot().value, '마지막 입력')); await jest.advanceTimersByTimeAsync(599);
  expect(session.getSnapshot().saveStatus).toBe('pending'); await jest.advanceTimersByTimeAsync(6);
  expect(session.getSnapshot().saveStatus).toBe('error'); expect(session.getSnapshot().value.document.body).toBe('마지막 입력');
  expect(await finish(session.flush())).toBe(true);
  const records = await finish(source.list(scope.userId, signal())); expect(records).toHaveLength(1); expect(records[0]?.document.body).toBe('마지막 입력');
  records[0]!.document.blocks[0] = 'code'; expect((await finish(source.read(scope.userId, scope.draftId, signal())))?.document.blocks[0]).toBe('paragraph'); close();
});
it('저장 중 더 최신 입력과 중복 flush를 직렬화하고 오래된 실패 뒤 최신 의도를 저장한다', async () => {
  const pending: { command: SaveDraft; resolve: (value: Draft) => void; reject: (error: Error) => void }[] = [];
  const source: DraftSource = { ...createMockDraftSource(), save: (command) => new Promise((resolve, reject) => pending.push({ command, resolve, reject })) };
  const { session, close } = setup(source); session.edit(changeBody(session.getSnapshot().value, '이전'));
  const saving = session.flush(); expect(session.flush()).toBe(saving);
  session.edit(changeBody(session.getSnapshot().value, '최신')); pending[0]!.reject(new Error('old'));
  await Promise.resolve(); expect(pending).toHaveLength(2);
  const command = pending[1]!.command; pending[1]!.resolve({ id: command.draftId, userId: command.userId, document: command.document, publishing: command.publishing ?? emptyPublishOptions(), updatedAt: '' });
  expect(await saving).toBe(true); expect(session.getSnapshot().value.document.body).toBe('최신'); expect(session.getSnapshot().dirty).toBe(false); close();
});
it('낮은 버전과 다른 소유자의 저장은 최신 내용을 덮지 않고 계정 전환 전 요청은 저장소에서도 중단한다', async () => {
  const source = createMockDraftSource({ delayMs: 30 }); const { auth, session, scope, close } = setup(source);
  const old = changeBody(emptyEditor(), '과거').document; const latest = changeBody({ ...emptyEditor(), document: old }, '현재').document;
  await finish(source.save({ ...scope, document: latest, operationId: 'latest' }, signal()));
  expect((await finish(source.save({ ...scope, document: old, operationId: 'old' }, signal()))).document.body).toBe('현재');
  const denied = source.read(mockUserB.id, scope.draftId, signal()); const deniedCheck = expect(denied).rejects.toThrow('access-denied'); await jest.runAllTimersAsync(); await deniedCheck;
  const otherId = source.newId(mockUserB.id);
  const spoof = source.save({ ...scope, draftId: otherId, document: latest, operationId: 'spoof' }, signal());
  const spoofCheck = expect(spoof).rejects.toThrow('invalid-draft-command'); await jest.runAllTimersAsync(); await spoofCheck;
  await expect(source.save({ ...scope, document: { ...latest, blocks: [] }, operationId: 'invalid' }, signal())).rejects.toThrow('invalid-draft-document');
  session.edit(changeBody(session.getSnapshot().value, '늦은 A')); const saving = session.flush();
  auth.openLogout(); await auth.signOut(); auth.openLogin({ kind: 'write' }); await auth.signIn(mockUserB.id);
  expect(await finish(saving)).toBe(false); expect((await finish(source.read(scope.userId, scope.draftId, signal())))?.document.body).toBe('현재'); close();
});
it('해제 뒤 늦은 성공·실패와 재활성화 이전 응답은 현재 세션을 바꾸지 않고 재개는 확정한 이미지 문서를 복구한다', async () => {
  const pending: ((value: Draft) => void)[] = []; const base = createMockDraftSource({ delayMs: 0 });
  const source = { ...base, save: (command: SaveDraft) => new Promise<Draft>(resolve => pending.push(resolve)) };
  const { session, scope, close } = setup(source); session.edit(changeBody(emptyEditor(), '이탈')); const old = session.flush(); close();
  const deactivate = session.activate(); session.edit(changeBody(session.getSnapshot().value, '재활성')); const current = session.flush();
  pending[0]!({ id: scope.draftId, userId: scope.userId, document: changeBody(emptyEditor(), '이탈').document, publishing: emptyPublishOptions(), updatedAt: '' });
  expect(await old).toBe(false); expect(session.getSnapshot().saveStatus).toBe('saving');
  pending[1]!({ id: scope.draftId, userId: scope.userId, document: session.getSnapshot().value.document, publishing: emptyPublishOptions(), updatedAt: '' }); expect(await current).toBe(true); deactivate();
  const document = insertImage(changeBody(emptyEditor(), '이미지 포함'), { id: 'shared', assetId: 'local-sunset', source: 'library', width: 240, height: 168, description: '사진', credit: 'Local fixture' }).document;
  await finish(base.save({ ...scope, document, operationId: 'image' }, signal()));
  const resumed = createDraftSession(base, createAuthStore(createMockAuthSource(), mockUserA), { ...scope, isNew: false }); const stop = resumed.activate(); await jest.runAllTimersAsync();
  expect(resumed.getSnapshot().value.document).toEqual(document); stop();
});
