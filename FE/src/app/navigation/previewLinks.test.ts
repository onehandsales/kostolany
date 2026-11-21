import { parsePreviewLink } from './previewLinks';

it('공개 미리보기 대상만 해석하고 사용자·세션·권한을 URL에서 받지 않는다', () => {
  expect(parsePreviewLink('kostolany://article/medium-chatgpt')).toEqual({
    kind: 'article',
    id: 'medium-chatgpt',
  });
  expect(
    parsePreviewLink('https://kostolany.invalid/article/a?preview=friend&userId=other#quote-1-2'),
  ).toEqual({ kind: 'article', id: 'a' });
  expect(parsePreviewLink('http://localhost:8081/?previewLink=kostolany%3A%2F%2Ftab%2FLibrary')).toEqual({
    kind: 'tab',
    tab: 'Library',
  });
  expect(parsePreviewLink('https://medium.com/article/a')).toBeNull();
  for (const url of [
    'kostolany://editor/other',
    'kostolany://list/a%2Fb',
    'kostolany://article/%ZZ',
    'https://user@kostolany.invalid/article/a',
  ])
    expect(parsePreviewLink(url)).toEqual({ kind: 'invalid' });
});
