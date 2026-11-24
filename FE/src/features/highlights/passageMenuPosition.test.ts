import { passageMenuPosition } from './passageMenuPosition';

const bounds = { width: 320, height: 568, top: 24, right: 0, bottom: 20, left: 0 };
it('상단 선택은 메뉴를 아래로 옮기고 큰 메뉴는 안전 영역 안에서 스크롤할 공간을 남긴다', () => {
  expect(passageMenuPosition({ x: 270, y: 36, width: 45, height: 30 },
    { width: 280, height: 96 }, bounds)).toEqual({ left: 32, top: 74, width: 280, maxHeight: 508 });
  expect(passageMenuPosition({ x: 0, y: -300, width: 320, height: 1200 },
    { width: 340, height: 700 }, bounds)).toEqual({ left: 8, top: 32, width: 304, maxHeight: 508 });
});
it('하단·가로 안전 영역과 변경된 메뉴 높이를 실측값으로 제한한다', () => {
  const anchor = { x: 280, y: 530, width: 30, height: 30 };
  const normal = passageMenuPosition(anchor, { width: 280, height: 48 }, bounds);
  const expanded = passageMenuPosition(anchor, { width: 280, height: 220 }, bounds);
  expect(normal.top).toBe(474);
  expect(expanded.top).toBe(302);
  expect(expanded.top + 220).toBeLessThanOrEqual(540);
  expect(passageMenuPosition(anchor, { width: 340, height: 48 },
    { ...bounds, left: 40, right: 24 })).toMatchObject({ left: 48, width: 240 });
});
