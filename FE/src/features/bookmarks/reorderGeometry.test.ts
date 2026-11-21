import { edgeScrollDelta, reorderDestination } from './reorderGeometry';

it('화면 가장자리에서만 시간에 비례해 스크롤하고 작은 화면과 멈춘 프레임의 이동량을 제한한다', () => {
  expect(edgeScrollDelta(200, 600, 16)).toBe(0);
  expect(edgeScrollDelta(0, 600, 16)).toBe(-9.6);
  expect(edgeScrollDelta(600, 600, 32)).toBe(19.2);
  expect(edgeScrollDelta(999, 600, 1000)).toBe(24);
  expect(edgeScrollDelta(20, 40, 16)).toBe(0);
  expect(edgeScrollDelta(0, 0, 16)).toBe(0);
});

it('가변 높이와 자동 스크롤을 반영한 문서 좌표에서 처음·중간·끝의 삽입 위치를 찾는다', () => {
  const ids = ['first', 'second', 'third', 'fourth'];
  const heights = new Map([['first', 72], ['second', 130], ['third', 90]]);
  expect(reorderDestination(ids, 'first', 250, heights)).toBe(2);
  expect(reorderDestination(ids, 'first', 500, heights)).toBe(3);
  expect(reorderDestination(ids, 'third', -10, heights)).toBe(0);
});
