import { createMockUserListSource } from '../bookmarks/data/createMockUserListSource';
import { createMockDraftSource } from '../editor/draftSource';
import { emptyEditor } from '../editor/editorModel';
import { createMockEditorImageSource } from '../editor/imageSource';
import { publishedArticleId } from '../editor/publishedArticle';
import { emptyPublishOptions, type PublishedStory } from '../editor/publishing';
import { createDownloadStore } from './createDownloadStore';
import { createMockDownloadSource } from './createMockDownloadSource';
import type { DownloadArticle } from './types';

async function setup(scenario: 'normal' | 'partial-error' = 'normal') {
  const drafts = createMockDraftSource({ delayMs: 0 });
  const command = { userId: 'A', draftId: drafts.newId('A'), authorName: '작성자 A', operationId: 'publish', publishing: emptyPublishOptions(),
    document: { ...emptyEditor().document, version: 1, title: '혼합 목록의 발행 글', body: '\uFFFC\n보관한 본문', blocks: ['paragraph', 'paragraph'] as const,
      images: [{ id: 'image1', offset: 0, assetId: 'local-sunset', source: 'unsplash' as const, description: '해질녘 풍경', credit: 'Local fixture', width: 240, height: 168 }] } };
  // 문서 생성은 실제 발행 공급부를 거치고 변경/철회만 제어 가능한 읽기 공급부로 재현한다.
  const input = { ...command, document: { ...command.document, blocks: [...command.document.blocks] } };
  await drafts.save(input, new AbortController().signal);
  const story = await drafts.publish(input, new AbortController().signal);
  let current: PublishedStory | null = story; let revision = drafts.getRevision();
  const listeners = new Set<() => void>();
  drafts.getPublishedSnapshot = () => current ? [current] : [];
  drafts.getRevision = () => revision;
  drafts.subscribe = listener => { listeners.add(listener); return () => { listeners.delete(listener); }; };
  drafts.story = jest.fn(async () => current);
  const change = (next: PublishedStory | null) => { current = next; revision++; listeners.forEach(listener => listener()); };
  const id = publishedArticleId(story.id);
  const lists = createMockUserListSource({ delayMs: 0, articleExists: articleId => ['medium-love', id].includes(articleId) });
  const content = { name: '혼합 목록', articleIds: ['medium-love', id], isPrivate: false };
  for (const userId of ['A', 'B']) await lists.setList({ userId, listId: 'mixed', content, operation: 'create', commandId: 1 });
  const images = createMockEditorImageSource({ delayMs: 0 });
  const source = createMockDownloadSource({ lists, published: { source: drafts, images }, delayMs: 0, scenario });
  const store = createDownloadStore(source, 'A'); const close = store.connect('A:1', () => true);
  return { story, id, drafts, images, source, store, close, change, lists, content };
}

it('일반·발행 혼합 목록의 부분 실패를 재시도하고 문서·서식·이미지 참조를 독립 사본으로 받는다', async () => {
  const { source, store, id, story, images, close } = await setup('partial-error'); source.load = jest.fn(source.load);
  await store.start('mixed'); expect(store.getSnapshot().entries[0]?.phase).toBe('error');
  expect(store.article('medium-love')).not.toBeNull(); expect(store.article(id)).toBeNull();
  await store.start('mixed'); expect(store.getSnapshot().entries[0]?.phase).toBe('complete');
  expect(source.load).toHaveBeenCalledTimes(3);
  const copy = store.article(id)!.published!;
  expect(copy.story).toEqual(story); expect(copy.story.document).not.toBe(story.document);
  expect(copy.images['local-sunset']).toEqual(images.resolve('local-sunset'));
  source.setOnline(false); expect(store.article(id)?.published).toBe(copy); close();
});

it('발행 버전·공개범위 변경과 삭제는 옛 본문/이미지 사본을 철회하며 재등록도 자동 복원하지 않는다', async () => {
  const { source, store, id, story, change, close } = await setup(); await store.start('mixed');
  const edited = { ...story, document: { ...story.document, version: 2, title: '수정된 원문' } };
  change(edited); expect(store.article(id)).toBeNull(); expect(store.getSnapshot().entries[0]).toMatchObject({ phase: 'complete', outdated: true });
  expect(store.article('medium-love')).not.toBeNull(); await store.start('mixed');
  expect(store.article(id)?.published?.story.document.title).toBe('수정된 원문');
  // Unlisted는 private가 아니라 ID를 아는 사용자에게 허용되는 기존 링크 정책이다.
  change({ ...edited, publishing: { ...edited.publishing, unlisted: true } }); expect(store.article(id)).toBeNull();
  await store.start('mixed'); expect(store.article(id)?.published?.story.publishing.unlisted).toBe(true);
  change(null); expect(source.getVersion(id)).toBeNull(); expect(store.article(id)).toBeNull();
  change(story); expect(store.article(id)).toBeNull(); close();
});

it('아직 받지 않은 발행 문서 변경도 진행 작업을 중단하고 늦은 성공은 새 사본을 덮지 않는다', async () => {
  const { source, store, story, id, change, close } = await setup(); const original = source.load;
  let resolve!: (value: DownloadArticle) => void;
  const old = new Promise<DownloadArticle>(yes => { resolve = yes; });
  source.load = jest.fn().mockReturnValueOnce(old).mockImplementation(original);
  const pending = store.start('mixed'); const request = { userId: 'A', listId: 'mixed', articleId: 'medium-love', jobId: store.getSnapshot().entries[0]!.jobId };
  const response = await original(request, new AbortController().signal);
  change({ ...story, document: { ...story.document, version: 2, title: '새 문서' } });
  expect(store.getSnapshot().entries[0]?.phase).toBe('cancelled');
  await store.start('mixed'); resolve(response); await pending;
  expect(store.article(id)?.published?.story.document.title).toBe('새 문서'); expect(store.getSnapshot().entries[0]?.phase).toBe('complete'); close();
});

it('본문 조회 중 접근권 철회·잘못된 문서·누락 이미지는 완료로 표시하지 않는다', async () => {
  const { source, store, drafts, images, id, story, change, close } = await setup();
  drafts.story = jest.fn(async () => null);
  await store.start('mixed'); expect(store.article(id)).toBeNull(); expect(source.getVersion(id)).toBeNull();
  change(story); drafts.story = jest.fn(async () => ({ ...story, userId: 'wrong-owner' }));
  await store.start('mixed'); expect(store.getSnapshot().entries[0]?.phase).toBe('error'); expect(store.article(id)).toBeNull();
  drafts.story = jest.fn(async () => story); const resolve = images.resolve; images.resolve = () => undefined;
  await store.start('mixed'); expect(store.getSnapshot().entries[0]?.phase).toBe('error');
  images.resolve = resolve; await store.start('mixed'); expect(store.getSnapshot().entries[0]?.phase).toBe('complete'); close();
});

it('A 발행 사본 요청 중 로그아웃→B→A에서 늦은 실패와 이전 오류가 섞이지 않는다', async () => {
  const { source, store, id, close } = await setup(); const original = source.load;
  let reject!: (error: Error) => void;
  source.load = jest.fn().mockImplementationOnce(() => new Promise<DownloadArticle>((_, no) => { reject = no; })).mockImplementation(original);
  const pending = store.start('mixed'); close();
  const b = createDownloadStore(source, 'B'); const stopB = b.connect('B:2', () => true);
  expect(b.article(id)).toBeNull(); await b.start('mixed'); expect(b.article(id)?.userId).toBe('B'); stopB();
  const again = store.connect('A:3', () => true); await store.start('mixed'); reject(new Error('late A')); await pending;
  expect(store.article(id)?.userId).toBe('A'); expect(store.getSnapshot().entries[0]?.phase).toBe('complete'); again();
  const same = store.connect('A:4', () => true); expect(store.article(id)?.userId).toBe('A'); same();
});

it('주입 공급부가 버전 표지만 맞춘 다른 발행 본문을 반환해도 사본으로 수용하지 않는다', async () => {
  const { source, store, id, close } = await setup(); const load = source.load;
  source.load = async (request, signal) => {
    const result = await load(request, signal);
    return result.published ? { ...result, published: { ...result.published, story: { ...result.published.story,
      document: { ...result.published.story.document, title: '버전과 다른 본문' } } } } : result;
  };
  await store.start('mixed'); expect(store.getSnapshot().entries[0]?.phase).toBe('error'); expect(store.article(id)).toBeNull(); close();
});

it('A가 로그아웃한 사이 삭제→동일 문서 복구가 있어도 이전 사본은 A 복귀 때 부활하지 않는다', async () => {
  const { source, store, id, story, change, close } = await setup(); await store.start('mixed');
  const oldVersion = store.article(id)!.contentVersion; close();
  // 앱의 online 구독은 인증이 없는 동안에도 source 카탈로그 변경을 계속 관찰한다.
  const stopObserving = source.subscribe(() => undefined);
  change(null); change(story);
  const reconnect = store.connect('A:2', () => true);
  expect(source.getVersion(id)).not.toBe(oldVersion); expect(store.article(id)).toBeNull();
  await store.start('mixed'); expect(store.article(id)?.published?.story).toEqual(story);
  reconnect(); stopObserving();
});
