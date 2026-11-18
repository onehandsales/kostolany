# 코드·명명·한글 주석 규칙

[규칙 진입점](README.md) · [아키텍처](ARCHITECTURE.md)

## 공통 원칙

식별자는 영어로, 설명 주석은 한글로 작성한다. 이름은 대상과 행동·상태를 표현한다. 줄 수를 줄이기 위한 축약, 로마자로 옮긴 한글, 의미 없는 번호를 피한다. 기존 코드의 공개 계약을 바꿀 때는 모든 소비자와 테스트를 함께 확인한다.

## 파일·폴더·export

| 대상 | 규칙 | 예시 |
| --- | --- | --- |
| React 컴포넌트 파일 | 주 컴포넌트와 같은 PascalCase, `.tsx` | `ArticleCard.tsx`, `LikeButton.tsx` |
| 경로 화면 | `대상Screen` | `ArticleDetailScreen.tsx` |
| React hook | `use` + 기능 PascalCase, JSX가 없으면 `.ts` | `useArticleSearch.ts` |
| 순수 함수 파일 | 역할을 나타내는 camelCase | `normalizeSearchQuery.ts` |
| 공급부·adapter | 기술/출처와 역할을 드러냄 | `createMockArticleSource.ts`, `articleStorage.ts` |
| 타입 | 작은 기능은 `types.ts`, 커지면 관심사로 구분 | `explanationTypes.ts` |
| 테스트 | 대상과 같은 이름 + `.test.ts(x)` | `LikeButton.test.tsx` |
| 플랫폼별 구현 | 동일 계약 + `.ios` / `.android` / 필요 시 `.web` | `ArticleActions.ios.tsx` |
| 폴더 | 소문자, 여러 단어는 kebab-case | `article`, `reading-history` |
| 이미지 파일 | 내용·변형을 드러내는 kebab-case | `empty-library.png` |

- import의 대소문자는 실제 파일명과 정확히 맞춘다. Windows에서만 성공하는 경로를 만들지 않는다.
- 앱 진입점·도구가 요구하는 export를 제외하면 named export를 기본으로 한다. 같은 모듈을 제각기 다른 이름으로 import하지 않는다.
- 컴포넌트가 작고 외부 재사용이 없으면 같은 파일의 private 하위 컴포넌트로 둘 수 있다. 한 파일에 여러 기능의 화면을 섞지 않는다.
- 이름 뒤에 `New`, `Old`, `V2`, `Final`, `Temp`를 붙여 병행 구현을 영구 보관하지 않는다. 실제 호환 버전 경계가 있다면 버전의 의미와 제거 조건을 기록한다.
- 프로젝트에 없는 path alias·포매터·생성기를 설치된 것처럼 사용하지 않는다. 설정 변경은 별도 변경으로 검증한다.

## 컴포넌트·props·스타일 이름

| 대상 | 기준 | 좋은 예 | 피할 예 |
| --- | --- | --- | --- |
| 표현 컴포넌트 | UI의 의미와 역할 | `ArticleCard`, `SearchResults`, `LikeButton` | `Box2`, `CommonComponent`, `RenderItem` |
| 상태 영역 | 나타내는 상태·범위 | `SearchEmptyState`, `ArticleLoadError` | `NoData` 하나로 모든 실패 처리 |
| props 타입 | 컴포넌트 이름 + `Props` | `ArticleCardProps` | 외부 공개된 `Props` |
| 모달·시트 | 역할을 이름에 포함 | `DeleteListDialog`, `ArticleActionsSheet` | `Popup`, `Modal1` |
| callback prop | 사용자 의도에 `on` | `onSelectArticle`, `onLikeChange` | `setParentData`, `callback1` |
| 스타일 키 | 표현 역할, camelCase | `title`, `metadata`, `selectedTab` | `text1`, `blueThing`, `margin10` |

한 파일의 작은 비공개 타입은 지역적으로 명확하면 짧은 이름을 사용할 수 있다. 공개 props의 boolean 조합으로 불가능한 상태를 허용하지 않는다. 독립적으로 달라지는 값만 props로 받고 부모에서 계산 가능한 값을 중복 전달하지 않는다.

## 함수·메서드·이벤트 이름

함수와 클래스 메서드 모두 `camelCase`, **동사 + 대상 + 필요한 조건**을 기본으로 한다. `doWork`, `processData`, `handleEverything`처럼 실제 책임을 숨기는 이름을 피한다.

| 접두사/형태 | 의미 | 예시 |
| --- | --- | --- |
| `get` / `select` | 동기적으로 이미 있는 값을 읽거나 선택 | `getArticleById`, `selectVisibleArticles` |
| `fetch` | 비동기 외부 조회 | `fetchArticleDetail` |
| `load` | 저장소·캐시 등에서 불러오기, 출처를 문서화 | `loadReadingPreferences` |
| `create` | 새 값·인스턴스 생성 | `createMockArticleSource` |
| `set` | 목표 상태로 변경 | `setArticleLiked` |
| `update` | 지정 필드를 갱신 | `updateProfileDraft` |
| `remove` / `delete` | 컬렉션에서 제거 / 자원 삭제, 의미 구분 | `removeArticleFromList`, `deleteReadingList` |
| `normalize` / `parse` / `format` | 정규화 / 외부 형식 해석 / 표시 문자열 생성 | `normalizeSearchQuery`, `parseArticleResponse`, `formatPublishedAt` |
| `validate` | 검증 결과 또는 명시된 예외 계약 | `validateListName` |
| `is` / `has` / `can` / `should` | boolean 질의 | `isArticleVisible`, `hasNextPage`, `canRetry`, `shouldRefresh` |
| `handle` | 현재 컴포넌트 안에서 이벤트 처리 | `handleSearchSubmit`, `handleLikePress` |
| `on` | 컴포넌트·hook 소비자에게 제공하는 이벤트 계약 | `onSelectArticle`, `onDismiss` |
| `use` | 실제 React hook을 조합하는 사용자 정의 hook | `useArticleDetail`, `useArticleReaction` |

- 비동기 여부는 Promise 반환 타입으로 드러낸다. 모든 함수에 `Async`를 붙이지 않는다. 같은 동작의 동기/비동기 API를 구분해야 할 때는 SDK·기존 계약을 따른다.
- `get`으로 시작하는 함수에 네트워크·저장·상태 변경을 숨기지 않는다. SDK가 정한 이름은 adapter 경계에서 이해할 수 있게 한다.
- `toggle`은 지역 UI 전환에는 사용할 수 있다. 재시도 가능한 쓰기 명령은 `setArticleLiked({ articleId, liked: true })`처럼 목표 상태를 드러낸다. 함수 이름만으로 서버 멱등성이 보장되는 것은 아니다.
- 짧은 단일 의도 전달은 inline callback을 허용한다. 검증·여러 분기·오류 처리가 들어가면 이름 있는 함수로 분리한다.
- 배열의 단순 `map`에서 지역적으로 분명한 `item`·`index`는 허용한다. 기능 경계를 넘는 값은 `article`, `articleId`처럼 구체적으로 쓴다.

## 변수·상수·타입

- boolean은 `isLoading`, `hasImage`, `canSubmit`처럼 의미를 드러낸다. 서로 겹치는 `isReady/isError/isLoading` 여러 개보다 판별 가능한 상태 타입을 우선한다.
- 배열은 복수형(`articles`), keyed map은 키를 드러낸다(`reactionsByArticleId`). 특정 의미가 있는 `data`는 `articleDetail`, `searchResult`로 구체화한다.
- 수치의 단위는 이름에 포함한다: `debounceMs`, `readingMinutes`, `imageWidthDp`, `byteLength`. `timeout = 10`처럼 단위 없는 설정을 피한다.
- 변경하지 않는 원시 설정·상한은 `SEARCH_DEBOUNCE_MS`, 도메인 객체·토큰 모음은 `colors`, `feedFixtures`처럼 camelCase를 사용한다. 모든 `const`를 대문자로 만들지 않는다.
- 타입/인터페이스는 PascalCase다. `IArticle`, `TArticle`, `ArticleType`처럼 타입 문법을 이름에 중복하지 않는다.
- `articleId`, `userId`, `imageUrl`처럼 약어 표기를 통일한다. `articleID`, `imageURL`과 혼용하지 않는다. `id`는 바로 인접한 자원이 분명한 좁은 범위에서만 쓴다.
- 상태·수준의 유한 집합은 string literal union을 우선한다. `number`에 0/1/2를 넣어 상태를 암호화하지 않는다.
- 공개 함수의 입출력, hook의 반환 계약, props를 명확하게 선언한다. 짧은 지역 변수·콜백은 타입 추론을 활용한다.
- `type`을 기본으로 쓰되 확장·외부 인터페이스 병합 등 이유가 있으면 `interface`를 쓴다. 의미 없는 일괄 변환은 하지 않는다.
- 옵션이 여러 개거나 같은 타입 인수를 혼동하기 쉬우면 이름 있는 객체 인자를 사용한다. `save(id, true, false, 3)` 같은 호출을 피한다.

```ts
type SetArticleLikeInput = {
  articleId: string;
  liked: boolean;
};

type LikeButtonProps = {
  articleId: string;
  isLiked: boolean;
  likeCount: number;
  isPending: boolean;
  onLikeChange: (input: SetArticleLikeInput) => void;
};

// 같은 명령을 재시도해도 의도가 뒤집히지 않도록 목표 상태를 전달한다.
function createLikeIntent(articleId: string, isLiked: boolean): SetArticleLikeInput {
  return { articleId, liked: !isLiked };
}
```

위 타입은 명명 예시다. Goal 7의 실제 저장소·API·동시성 구현이 아니며 `isPending`만으로 충돌 처리가 끝났다고 판단하지 않는다.

## TypeScript와 코드 형태

- 기존 `strict`, `noUncheckedIndexedAccess`, 파일 대소문자 검사를 유지한다. `any`, `as unknown as`, 불필요한 non-null assertion으로 오류를 숨기지 않는다.
- 외부 입력·catch 값은 `unknown`에서 검증해 좁힌다. null·undefined·빈 문자열·0을 업무상 같은 값으로 취급하지 않는다. 0이 유효하면 `||` 대신 적절한 nullish 처리 여부를 검토한다.
- props와 공유 snapshot을 직접 변경하지 않는다. 읽기 전용 계약에는 `readonly`를 검토하고, 변경은 소유자의 명시적 명령으로 수행한다.
- switch의 유한 상태는 누락을 타입으로 확인한다. `default: return null`로 새 상태를 조용히 숨기지 않는다.
- `Promise`를 반환하는 작업의 오류 소유자를 정한다. `void`는 오류 처리 수단이 아니다. 의도적으로 기다리지 않는 작업도 실패 처리·취소·수명 책임을 갖는다.
- `eslint-disable`, `@ts-ignore`는 기본 금지다. 외부 타입 결함처럼 국소 예외가 필요하면 이유·해제 조건을 한글로 기록하고 가장 좁은 범위에 적용한다. 예상 오류가 사라지는 것을 확인해야 할 때만 근거 있는 `@ts-expect-error`를 쓴다.
- 새 코드의 기본 표기는 2칸 들여쓰기, TS 문자열 작은따옴표, JSX 속성 큰따옴표, 세미콜론, 읽기 쉬운 여러 줄이다. 대체로 100~120자 안에서 의미 단위로 나누되 숫자를 맞추려고 로직을 왜곡하지 않는다.
- 프로젝트 lint가 강제하는 규칙과 사람이 검토하는 문체 규칙을 구분한다. 현재 별도 Prettier 설정이 있다고 가정하지 않는다.
- import는 외부 모듈 → 내부 기능/공통 → 같은 폴더 순으로 읽기 쉽게 묶는다. 타입만 사용하면 `import type`을 쓴다. 설정 없이 경로 alias를 도입하지 않는다.

## React 작성 규칙

- render는 순수하게 유지한다. render 중 fetch·저장·타이머·구독·다른 컴포넌트 상태 변경을 실행하지 않는다.
- hook은 조건문·반복문 안에서 호출하지 않는다. 조건이 필요한 동작은 hook의 계약이나 하위 컴포넌트의 수명으로 표현한다.
- 현재 props/state에서 계산할 수 있는 값에 effect와 별도 state를 추가하지 않는다. 사용자 이벤트로 발생하는 명령은 이벤트 경로에서 실행한다.
- effect는 외부 시스템과의 동기화에 사용한다. 의존성을 숨기지 않고 구독·타이머·요청 수명을 정리한다. StrictMode의 setup/cleanup 반복을 제거하기 위해 전역 실행 플래그를 두지 않는다. [React effect 지침](https://react.dev/reference/react/useEffect), [불필요한 effect](https://react.dev/learn/you-might-not-need-an-effect).
- props/state를 캡처한 오래된 closure가 최신 사용자 의도를 덮어쓰지 않게 한다. ref는 렌더에 필요 없는 식별자·명령 수명에 사용하고 화면 상태를 ref에만 숨기지 않는다.
- 목록 key는 안정적인 업무 ID를 사용한다. 순서가 바뀌는 목록에 index·난수를 쓰지 않는다. key 변경으로 초기화할 때는 잃는 입력·스크롤·요청 상태까지 설명한다.
- memoization은 정확성의 전제가 아니다. `memo`, `useMemo`, `useCallback`은 구독·연산 비용과 측정 근거가 있을 때 사용한다.
- 주 컴포넌트, 관련 private 컴포넌트/순수 함수, 스타일 순으로 읽을 수 있게 배치한다. 줄 수 제한만으로 쪼개지 않고 책임·분기·변경 이유를 기준으로 분리한다.

## 한글 주석 규칙

**새 설명 주석과 수정하는 설명 주석은 한글로 쓴다.** TypeScript/TSX, 테스트, 설정, 향후 Swift/Kotlin 코드에도 동일하게 적용한다. API 이름·타입·URL·표준 용어는 원문을 함께 사용할 수 있다.

주석에는 다음 중 코드만으로 알기 어려운 내용을 적는다.

- 왜 이 선택이 필요한지, 무엇을 보장해야 하는지.
- 응답 순서·취소·롤백·사용자 범위처럼 깨지면 문제가 되는 불변식.
- 플랫폼/라이브러리 제약과 공식 근거, 다시 검토할 조건.
- 복잡한 공개 함수의 입력 의미·부작용·실패 계약.

단순 대입·getter·JSX 태그를 그대로 읽어주는 주석, 모든 줄의 한국어 번역, 근거 없는 “최적화 완료” 주석은 쓰지 않는다. 이름과 함수 분리로 해결할 수 있으면 먼저 코드를 명확하게 한다.

```ts
// 잘못된 예: active를 false로 변경한다.

// 좋은 예: 화면을 떠난 뒤 도착한 응답이 새 검색 결과를 덮어쓰지 않게 한다.

/**
 * 화면 표시용 검색어를 정규화한다.
 * 원본 입력은 화면에서 유지하며, 서버 검색 정책을 확정하는 함수는 아니다.
 * @param query 사용자가 입력한 문자열
 * @returns 앞뒤·연속 공백과 영문 대소문자를 정리한 문자열
 */
export function normalizeSearchQuery(query: string): string {
  return query.normalize('NFC').trim().replace(/\s+/gu, ' ').toLowerCase();
}
```

- TSDoc은 비자명한 공개 계약에 사용한다. 모든 함수에 비어 있는 `@param`, 타입을 되풀이하는 `@returns`를 붙이지 않는다.
- `TODO`, `FIXME`에는 남은 일·이유·처리 조건 또는 실제 추적 경로를 적는다. 없는 이슈 번호를 만들어 쓰지 않는다. `TODO: 나중에`는 허용하지 않는다.
- 임시 우회에는 영향받는 버전·재현 조건·제거 조건을 기록한다. 검증되지 않은 버전 번호를 채우지 않는다.
- 비밀 키·토큰·실제 사용자 개인정보·내부 응답 원문을 주석에 넣지 않는다. 디버깅용 코드를 주석 처리해 장기간 보관하지 않는다.
- 기존 영문 주석은 해당 로직을 수정할 때 의미를 검토해 한글로 바꾼다. 문서 개정만으로 앱 전체의 주석을 일괄 변경하지 않는다.
- 라이선스·저작권·자동 생성 영역·외부 원문 인용은 원문을 보존한다. `eslint-disable`, `@type`, `@ts-expect-error` 등 기계가 해석하는 구문도 유지하고 사람이 읽는 이유를 한글로 덧붙인다.
- 테스트의 새 시나리오 설명은 한글을 기본으로 하며 “조건 → 행동 → 기대 결과”가 드러나게 쓴다. fixture 식별자와 기술적인 오류 코드는 안정적인 영문 값을 사용할 수 있다.

## 리뷰에서 이름과 주석 확인

이름만 보고 조회인지 변경인지, 화면 의도인지 공급부 명령인지, 수치의 단위가 무엇인지 판단할 수 있어야 한다. 주석과 실제 코드가 다르면 코드와 근거를 대조해 함께 수정한다. 이름만 바꾸는 변경은 필요한 소비자 수정과 구분하고, 원래 동작까지 바뀌지 않았는지 확인한다.
