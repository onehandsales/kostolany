/** @jest-environment jsdom */
import { pickLocalImage } from './pickLocalImage.web';

it('지원하지 않는 파일은 처리 실패와 구분하고 선택 입력을 정리한다', async () => {
  const request = pickLocalImage('library', new AbortController().signal);
  const failure = expect(request).rejects.toMatchObject({ reason: 'invalid' });
  const input = document.querySelector<HTMLInputElement>('input[type="file"]');
  expect(input).not.toBeNull();
  Object.defineProperty(input, 'files', { value: [new File(['text'], 'sample.txt', { type: 'text/plain' })] });
  input?.dispatchEvent(new Event('change'));
  await failure;
  expect(document.querySelector('input[type="file"]')).toBeNull();
});
