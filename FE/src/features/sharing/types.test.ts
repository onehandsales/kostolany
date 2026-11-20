import { canShareTarget, shareMessage, type ShareTarget } from './types';

const article: ShareTarget = {
  kind: 'article',
  id: '기사 / 1',
  title: '긴 한국어 제목',
  subtitle: '',
  authorName: 'A',
  visibility: 'public',
};

it('대상 타입과 ID가 주소를 결정하고 제목·이름 변경은 안정적 주소와 소유권을 바꾸지 않는다', () => {
  expect(shareMessage(article).url).toBe('https://kostolany.invalid/article/%EA%B8%B0%EC%82%AC%20%2F%201');
  expect(shareMessage({ ...article, title: '다른 이름', authorName: 'B' }).url).toBe(
    shareMessage(article).url,
  );
  for (const kind of ['writer', 'publication', 'topic', 'list'] as const)
    expect(shareMessage({ ...article, kind }).url).toContain(`/${kind}/`);
  const quote = { ...article, kind: 'quote' as const, quote: '선택한 문장', start: 12, end: 20 };
  expect(shareMessage(quote)).toEqual({
    title: article.title,
    text: `“선택한 문장”\n${article.title}`,
    url: `${shareMessage(article).url}#quote-12-20`,
  });
  expect(shareMessage(quote, true).url).toContain('?preview=friend#quote-12-20');
});

it('비공개·빈 ID·잘못된 인용 범위는 주소를 만들지 않고 Unlisted는 명시적 링크 대상이다', () => {
  for (const target of [
    { ...article, visibility: 'private' as const },
    { ...article, id: ' ' },
    { ...article, kind: 'quote' as const, quote: '문장', start: 5, end: 2 },
  ]) {
    expect(canShareTarget(target)).toBe(false);
    expect(() => shareMessage(target)).toThrow('unavailable-share-target');
  }
  expect(canShareTarget({ ...article, visibility: 'unlisted' })).toBe(true);
});
