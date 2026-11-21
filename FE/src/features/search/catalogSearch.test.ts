import { searchCatalog } from './catalogSearch';

it('입력 정규화·모든 검색 조각·중복 ID 제거를 적용하고 기준 순서를 보존한다', () => {
  const entries = [
    { id: 'b', text: '긴 한국어 글' },
    { id: 'a', text: '한국어 긴 글' },
    { id: 'b', text: '중복' },
  ];
  expect(
    searchCatalog(
      entries,
      '  한국어  긴 ',
      (row) => row.id,
      (row) => row.text,
    ).map((row) => row.id),
  ).toEqual(['b', 'a']);
  expect(
    searchCatalog(
      entries,
      '   ',
      (row) => row.id,
      (row) => row.text,
    ),
  ).toEqual([]);
  expect(
    searchCatalog(
      entries,
      '없는',
      (row) => row.id,
      (row) => row.text,
    ),
  ).toEqual([]);
});
