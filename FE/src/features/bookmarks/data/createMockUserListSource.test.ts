import { DEFAULT_LIST_ID } from '../listTypes';
import { createMockUserListSource } from './createMockUserListSource';

const articleId = 'example-latest-rates';
const base = { userId: 'reader-a', listId: 'custom-a', commandId: 1,
  content: { name: '경제', articleIds: [articleId] } };

it('사용자별 목록을 분리하고 같은 ID와 기사의 재전송은 중복 효과를 만들지 않는다', async () => {
  const source = createMockUserListSource({ delayMs: 0 });
  await source.setList(base); await source.setList(base);
  await source.setList({ ...base, userId: 'reader-b', content: { name: '다른 이름', articleIds: [] } });
  expect((await source.fetchLists('reader-a')).lists).toEqual([{ userId: 'reader-a', listId: 'custom-a', ...base.content }]);
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
  expect(after.lists).toEqual(content ? [{ userId: base.userId, listId: base.listId, ...content }] : []);
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
