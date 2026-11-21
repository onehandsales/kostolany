import { createAuthStore } from '../auth/createAuthStore';
import { createMockAuthSource } from '../auth/data/createMockAuthSource';
import { mockUserA, mockUserB } from '../auth/data/mockUsers';
import { createDraftSession } from './createDraftSession';
import { createMockDraftSource, type DraftSource } from './draftSource';
import { changeBody, emptyEditor, insertImage, insertMention, setBlock } from './editorModel';
import { PublishError } from './publishing';

const signal = () => new AbortController().signal;
function setup(source: DraftSource) {
  const auth = createAuthStore(createMockAuthSource({ delayMs: 0 }), mockUserA);
  const scope = { userId: mockUserA.id, revision: 0, draftId: source.newId(mockUserA.id), isNew: true };
  const session = createDraftSession(source, auth, scope); const close = session.activate();
  let value = changeBody(emptyEditor(), '실제 작성 내용'); value = { ...value, document: { ...value.document, title: '발행 제목', version: 2 } }; session.edit(value);
  return { source, auth, scope, session, close };
}
it('자동 저장과 중복 발행을 직렬화하고 응답 유실 뒤 같은 영수증을 복구하며 늦은 저장은 초안을 부활시키지 않는다', async () => {
  const { session, source, scope, close } = setup(createMockDraftSource({ delayMs: 0, lostPublishResponses: 1 }));
  session.configure({ topicIds: ['music'], publicationId: null, unlisted: true });
  const first = session.publish('작성자'); expect(session.publish('작성자')).toBe(first); expect(await first).toBeNull();
  expect(session.getSnapshot().publishStatus).toBe('uncertain'); const original = session.getSnapshot().value;
  session.edit(changeBody(original, '늦은 수정')); expect(session.getSnapshot().value).toBe(original);
  const story = await session.publish('바뀐 이름'); expect(story?.authorName).toBe('작성자'); expect(story?.document.body).toBe('실제 작성 내용');
  expect(await source.list(scope.userId, signal())).toEqual([]); expect(await source.stories(scope.userId, signal())).toEqual([]);
  expect(await source.publicStories?.(signal())).toEqual([]);
  await expect(source.stories(scope.userId, signal(), 'unlisted', mockUserB.id)).rejects.toThrow('access-denied');
  expect(await source.stories(scope.userId, signal(), 'unlisted', scope.userId)).toHaveLength(1);
  expect((await source.story(story!.id, signal()))?.document).toEqual(original.document);
  await expect(source.save({ ...scope, document: { ...original.document, version: 99 }, operationId: 'late' }, signal())).rejects.toThrow('already-published'); close();
});
it('실패 후 문서와 토픽 선택을 보존하고 수정한 최신 문서만 발행하며 권한과 토픽 중복을 검사한다', async () => {
  const { source, session, scope, close } = setup(createMockDraftSource({ delayMs: 0, publishFailures: 1 }));
  session.configure({ topicIds: ['music', 'music'], publicationId: null, unlisted: false }); expect(session.getSnapshot().publishing.topicIds).toEqual([]);
  session.configure({ topicIds: ['music', 'culture'], publicationId: null, unlisted: false });
  expect(await session.publish('A')).toBeNull(); expect(session.getSnapshot().publishStatus).toBe('error');
  session.edit(changeBody(session.getSnapshot().value, '수정 후 발행')); const story = await session.publish('A');
  expect(story?.document.body).toBe('수정 후 발행'); expect(story?.publishing.topicIds).toEqual(['music', 'culture']);
  await expect(source.publish({ ...scope, userId: mockUserB.id, document: story!.document, publishing: story!.publishing, authorName: 'B', operationId: 'spoof' }, signal())).rejects.toThrow('access-denied');
  expect(await source.stories(scope.userId, signal())).toHaveLength(1); close();
});
it('이미지·멘션·문단 서식의 실제 문서를 복제해 보존하고 반환 객체 수정이 발행 원본을 바꾸지 않는다', async () => {
  const { session, source, close } = setup(createMockDraftSource({ delayMs: 0 }));
  let value = changeBody(session.getSnapshot().value, '@sam'); value = insertMention(value, { start: 0, end: 4 }, { id: 'mention-samlee', name: 'Sam Lee', handle: 'samlee' });
  value = insertImage(setBlock(value, 'quote'), { id: 'photo', assetId: 'local-sunset', source: 'library', description: '사진', credit: 'Fixture', width: 240, height: 168 }); session.edit(value);
  const story = (await session.publish('A'))!; expect(story.document).toEqual(value.document);
  story.document.images[0]!.description = '변조'; story.document.mentions[0]!.target.id = '변조';
  expect((await source.publicStories?.(signal()))?.map(item => item.id)).toEqual([story.id]);
  const stored = (await source.story(story.id, signal()))!; expect(stored.document.images[0]?.description).toBe('사진'); expect(stored.document.mentions[0]?.target.id).toBe('mention-samlee'); close();
});
it('계정 전환과 같은 계정 재로그인 뒤 늦은 성공·실패는 새 화면에 반영되지 않고 확정 글은 남는다', async () => {
  const base = createMockDraftSource({ delayMs: 0 }); let release!: () => void;
  const source = { ...base, publish: async (...args: Parameters<DraftSource['publish']>) => { const story = await base.publish(...args); await new Promise<void>(resolve => { release = resolve; }); return story; } };
  const { session, auth, scope, close } = setup(source); await session.flush(); const publishing = session.publish('A');
  for (let index = 0; index < 10 && !release; index++) await Promise.resolve();
  auth.openLogout(); await auth.signOut(); auth.openLogin({ kind: 'write' }); await auth.signIn(mockUserB.id); release(); expect(await publishing).toBeNull();
  expect(session.getSnapshot().published).toBeNull(); expect(await source.stories(scope.userId, signal())).toHaveLength(1);
  auth.openLogout(); await auth.signOut(); auth.openLogin({ kind: 'write' }); await auth.signIn(mockUserA.id);
  expect(await session.publish('A')).toBeNull(); close();
  const late = setup({ ...base, publish: async () => { await Promise.resolve(); throw new PublishError(false, 'late'); } });
  const task = late.session.publish('A'); late.close(); expect(await task).toBeNull(); expect(late.session.getSnapshot().published).toBeNull();
});
