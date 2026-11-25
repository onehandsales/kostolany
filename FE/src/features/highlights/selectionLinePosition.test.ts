import { selectionLinePosition } from './selectionLinePosition';

it('한글·이모지 선택이 걸친 줄을 실측 좌표로 찾고 앞뒤 줄과 구분한다', () => {
  const text = '앞 문장\n한글 😀 선택\n끝 문장';
  const lines = [
    { text: '앞 문장\n', x: 0, y: 0, width: 80, height: 30 },
    { text: '한글 😀 ', x: 2, y: 30, width: 110, height: 32 },
    { text: '선택\n', x: 2, y: 62, width: 50, height: 32 },
    { text: '끝 문장', x: 0, y: 94, width: 80, height: 30 },
  ];
  expect(selectionLinePosition(text, 8, 13, lines)).toEqual({ x: 2, y: 30, width: 110, height: 64 });
  expect(selectionLinePosition(text, 8, 10, lines)).toEqual({ x: 2, y: 30, width: 110, height: 32 });
});

it('줄바꿈 공백은 허용하되 오래된 본문·누락된 줄·잘못된 측정은 사용하지 않는다', () => {
  const lines = [{ text: '첫 줄', x: 0, y: 0, width: 70, height: 30 },
    { text: '다음', x: 0, y: 30, width: 40, height: 30 }];
  expect(selectionLinePosition('첫 줄\n다음', 4, 6, lines)).toEqual({ x: 0, y: 30, width: 40, height: 30 });
  expect(selectionLinePosition('바뀐 글\n다음', 4, 6, lines)).toBeNull();
  expect(selectionLinePosition('첫 줄\n다음\n누락', 0, 2, lines)).toBeNull();
  expect(selectionLinePosition('첫 줄\n다음', 4, 6, [{ ...lines[0]!, width: NaN }, lines[1]!])).toBeNull();
  expect(selectionLinePosition('첫 줄', 0, 0, [])).toBeNull();
});
