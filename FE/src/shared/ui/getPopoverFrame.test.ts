import { getPopoverFrame } from './getPopoverFrame';

const base = { width: 390, height: 844, insets: { top: 0, bottom: 0, left: 0, right: 0 }, preferredWidth: 320, top: 48, right: 19 };

it('기본 화면에서는 요청한 팝오버 폭과 헤더 아래 위치를 보존한다', () => {
  expect(getPopoverFrame(base)).toEqual({ width: 320, top: 48, right: 19, maxHeight: 780 });
});

it('가로 회전으로 선택 메뉴 아래 공간이 부족하면 한 행을 화면 안에 남긴다', () => {
  const frame = getPopoverFrame({ ...base, height: 240, top: 205, preferredWidth: 250 });
  expect(frame.top).toBe(176);
  expect(frame.maxHeight).toBe(48);
  expect(frame.top + frame.maxHeight).toBeLessThanOrEqual(224);
});

it('작은 폭과 좌우 안전 영역에서는 메뉴가 안전 영역 밖으로 나가지 않는다', () => {
  const frame = getPopoverFrame({ ...base, width: 320, insets: { top: 24, bottom: 16, left: 20, right: 30 } });
  expect(frame.width).toBe(254);
  expect(frame.right).toBe(38);
  expect(320 - frame.right - frame.width).toBe(28);
  expect(frame.top + frame.maxHeight).toBeLessThanOrEqual(828);
});
