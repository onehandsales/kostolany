import { DEFAULT_LIST_ID } from '../listTypes';
import { createMockUserListSource } from './createMockUserListSource';

const articleId = 'example-latest-rates';
const base = { userId: 'reader-a', listId: 'custom-a', commandId: 1,
  content: { name: '경제', articleIds: [articleId] } };

it('사용자별 목록을 분리하고 같은 ID와 기사의 재전송은 중복 효과를 만들지 않는다', async () => {
  const source = createMockUserListSource({ delayMs: 0 });
  await source.setList(base); await source.setList(base);
  await source.setList({ ...base, userId: 'reader-b', content: { name: '다른 이름', articleIds: [] } });
  expect((await source.fetchLists('reader-a')).lists).toEqual([{ userId: 'reader-a', listId: 'custom-a', ...base.content, updatedAt: expect.any(Number) }]);
  expect((await source.fetchLists('reader-b')).lists[0]?.articleIds).toEqual([]);
  expect((await createMockUserListSource({ delayMs: 0 }).fetchLists('reader-a')).lists).toEqual([]);
});

it.each(['create-error', 'rename-error', 'delete-error', 'add-error', 'list-remove-error'] as const)('%s는 반영 전 한 번 실패하고 같은 목표 재시도는 성공한다', async (scenario) => {
  const source = createMockUserListSource({ delayMs: 0, scenario });
  if (scenario !== 'create-error') await source.setList({ ...base,
    content: { name: '경제', articleIds: scenario === 'list-remove-error' ? [articleId] : [] } });
  const content = scenario === 'delete-error' ? null : { name: scenario === 'rename-error' ? '새 이름' : '경제',
    articleIds: scenario === 'list-remove-error' ? [] : [articleId] };
  const before = await source.fetchLists(base.userId);
  await expect(source.setList({ ...base, content })).rejects.toThrow('before applying');
  expect(await source.fetchLists(base.userId)).toEqual(before);
  await source.setList({ ...base, content });
  const after = await source.fetchLists(base.userId);
  expect(after.lists).toEqual(content ? [{ userId: base.userId, listId: base.listId, ...content, updatedAt: expect.any(Number) }] : []);
});

it('조회 실패·기본 목록 보호·잘못된 기사·중복 이름·삭제 후 재생성 금지를 명시한다', async () => {
  const source = createMockUserListSource({ delayMs: 0, scenario: 'lists-read-error' });
  await expect(source.fetchLists(base.userId)).rejects.toThrow();
  expect((await source.fetchLists(base.userId)).lists).toEqual([]);
  await expect(source.setList({ ...base, listId: DEFAULT_LIST_ID })).rejects.toThrow();
  await expect(source.setList({ ...base, content: { name: '경제', articleIds: ['unknown'] } })).rejects.toThrow();
  await source.setList(base);
  await expect(source.setList({ ...base, listId: 'custom-b' })).rejects.toThrow();
  await source.setList({ ...base, content: null });
  await expect(source.setList(base)).rejects.toThrow('Deleted');
  await expect(source.fetchLists(' ')).rejects.toThrow();
});


it('확정 시각은 성공한 변경만 갱신하고 실패·재시도·같은 명령·다른 계정과 분리된다', async () => {
  let clock = 1000;
  const source = createMockUserListSource({ delayMs: 0, now: () => clock, scenario: 'note-error', managesReadingList: true });
  const create = { ...base, commandScope: 'time', operation: 'create' as const };
  expect((await source.setList(create)).content?.updatedAt).toBe(1000);
  clock = 2000;
  expect((await source.setList(create)).content?.updatedAt).toBe(1000);
  const edit = { ...create, operation: 'update' as const, commandId: 2,
    content: { ...base.content, notes: { [articleId]: '메모' }, updatedAt: 999999 } };
  await expect(source.setList(edit)).rejects.toThrow('before applying');
  expect((await source.fetchLists(base.userId)).lists.find(list => list.listId === base.listId)?.updatedAt).toBe(1000);
  clock = 3000;
  expect((await source.setList(edit)).content?.updatedAt).toBe(3000);
  clock = 4000;
  expect((await source.setList(edit)).content?.updatedAt).toBe(3000);
  const other = await source.fetchLists('reader-b');
  expect(other.lists).toEqual([{ userId: 'reader-b', listId: DEFAULT_LIST_ID, name: '읽기 목록', articleIds: [], isPrivate: true, updatedAt: 4000 }]);
  expect((await source.fetchLists(base.userId)).lists.find(list => list.listId === base.listId)?.updatedAt).toBe(3000);
});
