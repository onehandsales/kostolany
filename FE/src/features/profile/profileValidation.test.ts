import { countProfileCharacters, normalizeProfileFields, validateProfileFields } from './profileValidation';

it('이름 공백은 제출 때 합치고 소개의 내부 줄바꿈은 남기며 빈 소개와 같은 이름을 허용한다', () => {
  expect(normalizeProfileFields({ name: '  같은   이름\t ', bio: ' \r\n첫 줄\r\n둘째 줄  \n끝\n ' }))
    .toEqual({ name: '같은 이름', bio: '첫 줄\n둘째 줄  \n끝' });
  expect(validateProfileFields({ name: '같은 이름', bio: '' })).toBeNull();
  expect(validateProfileFields({ name: ' \n\t ', bio: '소개' })).toBe('이름을 입력해 주세요.');
});

it('이름 50자와 소개 160자는 허용하고 초과 값은 잘라내지 않고 오류로 반환한다', () => {
  expect(validateProfileFields({ name: '가'.repeat(50), bio: '나'.repeat(160) })).toBeNull();
  expect(validateProfileFields({ name: '가'.repeat(51), bio: '' })).toMatch(/50자/);
  expect(validateProfileFields({ name: '독자', bio: '나'.repeat(161) })).toMatch(/160자/);
});

it('NFC 한글과 단일 이모지는 한 코드 포인트이며 조합형 이모지는 구성 코드 포인트를 센다', () => {
  expect(countProfileCharacters('한글😀')).toBe(3);
  expect(countProfileCharacters('👨‍👩‍👧‍👦')).toBe(7);
  expect(countProfileCharacters('👍🏽')).toBe(2);
  expect(validateProfileFields({ name: '😀'.repeat(50), bio: '가'.repeat(160) })).toBeNull();
  expect(validateProfileFields({ name: '😀'.repeat(51), bio: '' })).toMatch(/50자/);
});

it('소개 내용 삭제와 바깥 공백 정리는 허용하되 표시 불가능한 제어 문자는 거부한다', () => {
  expect(normalizeProfileFields({ name: '독자', bio: ' \n\t ' }).bio).toBe('');
  expect(validateProfileFields({ name: '독자', bio: '소개\u0000' })).toMatch(/제어 문자/);
});
