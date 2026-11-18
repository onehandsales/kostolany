# Kostolany Mobile

React Native 기반 iOS·Android 앱이다. [FE Goal 계획](../TODO/FE_GOALS.md)에 따라 Goal 7의 좋아요 등록·해제까지 구현했다. 홈·탐색에서 예시 기사의 상세를 읽고 4단계 설명과 예시를 선택하며, 같은 기사의 좋아요 상태를 목록·상세에서 공유한다. 라이브러리·프로필은 준비 중 안내를 유지한다. 검색·좋아요는 PC 브라우저 흐름과 모바일 폭의 Medium 원본 비교를 수행했으며 실제 기기 검증은 대기 중이다.

## 환경과 기술 선택

| 항목 | 고정 버전 |
| --- | --- |
| Node.js | 24.18.0 (`.nvmrc`, Node 24 계열) |
| npm | 10.9.0 |
| Expo SDK | 57 (`expo` 57.0.33) |
| React / React Native | 19.2.3 / 0.86.3 |
| React DOM / React Native Web | 19.2.3 / 0.21.4 (PC 미리보기) |
| Expo Metro runtime | 57.0.18 |
| TypeScript | 6.0.3, strict |
| Jest / jest-expo | 29.7.0 / 57.0.6 |
| React Native Testing Library / test-renderer | 14.1.0 / 1.2.0 |
| ESLint / eslint-config-expo | 9.39.5 / 57.0.2 |
| React Navigation / bottom-tabs | 7.5.2 / 7.22.0 |
| React Navigation native-stack | 7.21.1 |
| react-native-screens / react-native-svg | 4.26.2 / 15.15.4 |
| babel-preset-expo | 57.0.17 |

직접 의존성은 `package.json`에 정확한 버전으로 지정하고, 전체 설치 결과는 `package-lock.json`으로 고정한다. 패키지 관리자는 npm을 사용한다.

2026-11-17 기준 Expo 공식 안내의 SDK 58 전환 기간에는 실기기 Expo Go용으로 SDK 57을 권장한다. 이 기준과 SDK 57의 의존성 검사 결과에 맞췄다. 최신 버전으로 일괄 갱신하지 말고 Expo·React Native·테스트 도구의 호환성을 함께 확인한다.

`index.ts`에서 앱을 등록하고 React Navigation의 native-stack 안에 Main 탭과 Article 상세를 둔다. 상세에서는 하단 탭을 숨기고 뒤로 가면 유지된 홈 또는 탐색 목록으로 복귀한다. 기사 ID와 진입 탭을 전달해 뒤로 가기 label을 구분한다. Main 내부는 bottom-tabs의 `history` 방식을 사용하며, 홈에서 더 돌아갈 이력이 없으면 OS 기본 뒤로 가기에 맡긴다. Expo Router는 설치하지 않았다. 실제 기기의 뒤로 가기·제스처는 아직 미검증이다. 향후 실제 Google 네이티브 인증을 붙일 때에는 development build와 각 플랫폼 설정을 별도로 확인해야 한다.

근거: [Expo 프로젝트 생성](https://docs.expo.dev/more/create-expo/), [Expo 테스트 구성](https://docs.expo.dev/develop/unit-testing/), [RNTL v14](https://oss.callstack.com/react-native-testing-library/docs/start/quick-start), [Google 인증](https://docs.expo.dev/guides/google-authentication/).

탭 구성과 테스트는 [React Navigation bottom-tabs](https://reactnavigation.org/docs/bottom-tab-navigator/), [테스트 지침](https://reactnavigation.org/docs/testing/)을 참고했다. 플랫폼별 Jest 변환에는 [Expo Babel 설정](https://docs.expo.dev/versions/latest/config/babel/)을 명시했다.

## 설치와 실행

Windows PowerShell 기준:

```powershell
Set-Location D:\git_repository\kostolany_project\FE
npm.cmd ci
npm.cmd start
```

현재 화면에는 ENV 값이나 Supabase·Google 계정 설정이 필요하지 않다. 기존 사용자 ENV를 새로 만들거나 덮어쓰지 않는다.

- 실기기: 호환되는 Expo Go를 설치하고 PC와 기기를 같은 네트워크에 연결한 뒤 터미널의 QR을 연다.
- Android 에뮬레이터: Android SDK와 가상 기기를 준비한 뒤 `npm.cmd run android`를 실행한다.
- iOS 시뮬레이터: macOS와 Xcode가 있는 환경에서 `npm run ios`를 실행한다. Windows에서는 iOS 시뮬레이터를 실행하지 않는다.
- Metro 종료: 실행 중인 터미널에서 `Ctrl+C`를 누른다.

macOS에서는 위 `npm.cmd` 명령을 `npm`으로 실행한다. 서비스 대상은 iOS·Android다. 사용자의 PC 로컬 확인 요청에 따라 `app.json`에 개발용 웹 미리보기도 허용했다.

### PC 브라우저 미리보기

```powershell
Set-Location D:\git_repository\kostolany_project\FE
npm.cmd run web
```

[http://localhost:8081](http://localhost:8081)을 연다. `--localhost`로 실행하며 로그인·ENV·백엔드가 필요 없다. 모바일과 같은 화면 코드를 React Native Web으로 표시한다. 홈의 기사 카드를 클릭하면 상세를 읽고 상단 뒤로 가기로 돌아온다. 휴대폰 폭으로 보려면 Chrome/Edge에서 `F12` → `Ctrl+Shift+M`을 누르고 폭 390 정도를 선택한다. 종료는 실행한 터미널의 `Ctrl+C`다. 이미 이 주소에서 실행 중이면 새 서버를 중복 실행하지 않고 해당 주소를 사용한다.

2026-11-18 Chrome의 390×844·1365×900 뷰포트에서 홈 표시, 선택 기사 상세, 사실/해석 구분, 삽화·이미지 없는 기사, 본문 스크롤과 홈 복귀를 확인했다. 브라우저 콘솔 오류는 수정 후 0건이었다. 이 결과는 실제 iOS·Android 실행이나 네이티브 화면 비교를 대신하지 않는다. 구성 근거: [Expo 웹 실행 안내](https://docs.expo.dev/workflow/web/).

## 검증 명령

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
```

세 검사를 순서대로 실행하려면 `npm.cmd run check`, 테스트 수정 중에는 `npm.cmd run test:watch`를 사용한다. 타입 검사에는 테스트 파일도 포함된다.

`npm.cmd test`는 테스트 97개를 iOS·Android Jest 설정에서 각각 실행한다(총 194건). 특정 설정만 확인하려면 `npm.cmd test -- --selectProjects iOS` 또는 `npm.cmd test -- --selectProjects Android`를 사용한다. 이 결과는 JS 컴포넌트·hook·mock 데이터 테스트이며 실기기 실행 결과가 아니다.

```powershell
npx.cmd expo install --check
npx.cmd --yes expo-doctor@1.21.8
npm.cmd run export:android
npm.cmd run export:ios
```

`export:*`는 각 플랫폼의 JavaScript/Hermes 번들을 생성한다. APK·AAB·IPA 네이티브 빌드나 기기 실행을 대신하지 않는다. 생성물은 `dist/android`, `dist/ios`에 저장되며 Git에서 제외한다.

## 파일 구성

```text
index.ts                             앱 등록
App.tsx                              Safe Area provider와 루트 이동 연결
src/app/navigation/AppNavigator.tsx Main·Article stack과 기사 ID 전달
src/app/navigation/MainTabs.tsx      4개 탭 등록
src/app/navigation/BottomTabBar.tsx  접근 가능한 아이콘 탭과 Safe Area
src/app/navigation/tabs.ts          타입이 지정된 경로·명칭·임시 안내
src/app/TabPlaceholderScreen.tsx     라이브러리·프로필 임시 화면
src/features/feed/HomeFeedScreen.tsx 홈 피드·상태 표시와 기사 선택 경계
src/features/feed/components/        기사 카드·정렬 탭·상태·자체 SVG 썸네일
src/features/feed/useFeed.ts         조회·재시도·추가 요청·오래된 응답 처리
src/features/feed/types.ts           fixture용 데이터 접근 계약
src/features/feed/data/fixtures.ts   정렬별 고정 예시 기사
src/features/feed/data/mockFeedSource.ts 페이지·지연·실패를 재현하는 공급부
src/features/feed/data/feedPreview.ts 실행 화면의 mock 시나리오 선택
src/features/article/ArticleDetailScreen.tsx 상세 읽기·뒤로 가기·상태 표시
src/features/article/useArticle.ts   상세 조회·재시도·오래된 응답 차단
src/features/article/ExplanationSection.tsx 4단계 선택·수준별 설명과 예시
src/features/article/useExplanation.ts 기사·수준별 요청 수명과 재시도
src/features/article/explanationTypes.ts 난이도·로컬 설명 데이터 계약
src/features/article/types.ts        fixture용 상세 데이터 접근 계약
src/features/article/data/           10개 본문 예시·상세 공급부·상태 재현
src/features/search/SearchScreen.tsx 탐색·검색 입력·빈 입력·결과·상태 표시
src/features/search/SearchCard.tsx   검색 전용 카드·출처·전체 폭 요약
src/features/search/useSearch.ts     debounce·재시도·이전 응답 차단
src/features/search/data/            예시 검색 규칙·주제 바로가기·상태 재현
src/features/likes/LikeProvider.tsx  앱 수명의 반응 상태 소유자
src/features/likes/createLikeStore.ts 기사별 직렬 변경·최신 의도·낙관적 표시·복구
src/features/likes/useArticleLike.ts 기사별 구독과 입력 연결
src/features/likes/ArticleLikeControl.tsx 하트·수치·처리/실패·접근성 표시
src/features/likes/data/             모의 사용자·반응 수치·실패/지연 시나리오
src/shared/theme/tokens.ts           현재 화면에 필요한 색상·글자·간격
src/shared/ui/ContentIllustration.tsx 피드·상세가 공유하는 자체 SVG 삽화
src/shared/ui/ContentStatus.tsx      로딩·오류·재시도 공통 표시
src/shared/ui/Screen.tsx             제목·Safe Area·스크롤 공통 구성
src/shared/ui/TabIcon.tsx            자체 SVG 아이콘
src/app/App.test.tsx                 실제 앱 루트에서 탭 이동 테스트
test/setup.ts                        Safe Area의 공식 Jest mock
jest.config.js                       iOS·Android Jest 설정
babel.config.js                      Expo Babel 변환
eslint.config.js                     Expo 기반 lint 설정
tsconfig.json                        strict와 테스트 타입 검사
```

테스트는 앱 루트의 탭 이동·재선택·모의 뒤로 가기·홈 복귀 시 피드 선택 유지, 정렬과 표시 데이터의 일치, 기사 ID 전달, 빈 결과, 첫 조회·추가 조회 실패와 재시도, 동시 추가 요청 방지, 마지막 페이지, 중복 기사 ID 제거, 이전 정렬 응답 무시와 Strict Mode 재시작을 검증한다. React Navigation과 앱 화면은 mock하지 않는다. 네이티브 환경이 없는 Jest에서는 Safe Area의 공식 mock과 jest-expo의 네이티브 대체 환경을 사용한다. 실제 여백·글자 확대·레이아웃·스크린리더를 검증한 것은 아니다.

새 테스트를 작성할 때는 설치된 `node_modules/@testing-library/react-native/docs/guides/llm-guidelines.md`를 확인한다. v14의 `render`와 사용자 이벤트는 비동기 API이므로 `await`로 완료를 기다린다. 테스트를 통과시키기 위해 실제 화면 컴포넌트 자체를 mock으로 대체하지 않는다.

## 홈 피드 예시와 상태 재현

최신 4개·인기 3개·추천 3개의 서로 다른 고정 예시 목록을 사용한다. 날짜·읽기 시간도 fixture 값이며 실제 집계·추천 결과가 아니다. 홈과 카드 출처에 예시임을 표시한다. 페이지당 2개를 제공하며, `기사 더 보기`로 다음 페이지를 요청한다. 정렬 변경 시 첫 페이지로 돌아가고, 하단 메뉴로 다른 화면을 방문했다 돌아오면 선택한 정렬과 목록 상태를 유지한다.

[feedPreview.ts](src/features/feed/data/feedPreview.ts)의 `feedPreviewScenario`를 아래 값으로 바꾸고 앱을 완전히 Reload하면 상태를 재현할 수 있다. 기본값은 `normal`이며 별도 개발자 메뉴·ENV·외부 연결은 없다. 오류 재현 이력은 공급부 인스턴스에만 있으므로 같은 실패를 다시 보려면 전체 Reload가 필요하다.

| 값 | 재현 상태 |
| --- | --- |
| `normal` | 약 250ms 지연 후 정상 목록, 추가 페이지, 마지막 페이지 안내 |
| `empty` | 빈 결과 안내 |
| `initial-error` | 각 정렬의 첫 요청이 한 번 실패하고 `다시 시도`로 성공 |
| `page-error` | 각 정렬의 추가 페이지 요청이 한 번 실패하고 같은 cursor로 재시도 |
| `slow` | 요청마다 약 10초 지연, 첫 로딩·추가 로딩 관찰 |

실제 기기에서 위 시나리오를 실행한 결과는 아직 없다. 자동 테스트에서는 같은 공급부 또는 제어 가능한 응답을 주입해 상태와 행동을 검증했다. 카드를 누르면 `onSelectArticle(articleId)`를 통해 선택한 ID를 전달하며, navigation이 진입 탭 정보를 함께 보관한다. 상세 공급부에서는 해당 ID의 본문을 읽는다.

## 기사 상세 예시와 상태 재현

홈 예시 10개에 대응하는 본문을 제공한다. 제목·출처·날짜·읽기 시간은 홈과 맞추고 시각 `09:00`은 고정 예시 값으로 덧붙인다. 사실 요약과 AI 해석을 별도 제목·구획으로 표시하며 모두 직접 작성한 가상 내용이다. 실제 보도·AI 생성 결과·책의 인용문이 아니다. 이미지는 자체 SVG 삽화이며, 이미지가 없는 기사는 빈 이미지 영역 없이 본문을 표시한다. 기본 최신 목록의 환율 기사에서 확인할 수 있다.

[articlePreview.ts](src/features/article/data/articlePreview.ts)의 `articlePreviewScenario`를 바꾸고 앱을 전체 Reload하면 상세 상태를 재현하도록 구성했다.

| 값 | 재현 상태 |
| --- | --- |
| `normal` | 약 250ms 로딩 후 선택한 기사 표시 |
| `initial-error` | 각 기사 첫 요청 한 번 실패 → 같은 기사 다시 시도 성공 |
| `slow` | 약 10초 로딩, 로딩 중에도 홈으로 복귀 가능 |

실패 이력은 공급부 메모리에만 보관하며 전체 Reload로 초기화한다. 네트워크·ENV·계정 설정은 필요 없다. 자동 테스트에서 기사 ID 일치, 전체 본문과 구획, 이미지 유무, 실패·재시도, 다른 기사로 이동 후 늦은 성공/실패 무시, 홈 복귀 시 정렬·조회된 페이지 유지와 모의 뒤로 가기를 검증했다. 실제 기기의 스크롤 위치 복원과 iOS 제스처는 검증 대기다.

## 4단계 설명 전환

기사 상세의 **AI 해석 → 설명 수준**에서 초등학생·중학생·고등학생·성인을 선택한다. 홈의 10개 기사에 각각 4단계, 총 40개 설명·예시가 있다. 수준 선택은 해석의 표현과 예시만 바꾸며 공통 사실 요약·제목·출처는 유지한다. 기본 성인 설명은 Goal 4의 기존 해석 본문을 사용한다.

초기값은 `성인`인 화면용 기본안이다. 현재 상세 화면을 나갔다 다시 열거나 다른 기사에 진입하면 초기값으로 돌아간다. 선택값은 계정·서버·기기 저장소에 보관하지 않으며 실제 나이를 묻거나 추정하지 않는다. 읽기 시간도 기존 고정 예시 값이며 수준별로 재계산하지 않는다.

새 수준을 선택하면 이전 설명·예시는 숨기고 현재 수준의 로딩 또는 오류를 표시한다. 사실 요약과 뒤로 가기는 계속 사용할 수 있다. 선택 컨트롤은 로딩·오류 중에도 동작하며, 재시도는 실패한 기사·수준 조합만 다시 요청한다. 같은 선택을 다시 누르면 추가 조회하지 않는다.

[explanationPreview.ts](src/features/article/data/explanationPreview.ts)의 `explanationPreviewScenario`를 바꾸고 전체 Reload하면 아래 상태를 재현할 수 있다. 검사 후 기본값 `normal`로 복원했다. 실제 API 호출은 없다.

| 값 | 설명 영역의 재현 상태 |
| --- | --- |
| `normal` | 약 250ms 뒤 해당 수준의 설명·예시 표시 |
| `initial-error` | 기사·수준 조합별 첫 요청 1회 실패 → `설명 다시 시도`로 복구 |
| `slow` | 요청마다 약 10초 지연, 대기 중 선택 변경·홈 복귀 |
| `out-of-order` | 초등학생 900ms·중학생 600ms·고등학생 100ms·성인 250ms. 연속 선택 시 뒤늦은 응답이 마지막 선택을 덮어쓰지 않는지 확인 |

Chrome에서 네 수준의 본문·예시·선택 일치, 오류·재시도, 느린 요청 중 복귀, 응답 순서 역전과 320/390/1365px 폭 표시를 확인했다. 자동 테스트는 같은 수준 재진입, 이전 요청의 늦은 실패, 기사 변경과 Strict Mode 정리도 검증한다. 자세한 근거와 한계는 [Goal 5 결과](../TODO/FE_GOAL_05_RESULT.md)에 기록했다.

## 기사 검색과 탐색

하단 **탐색 → 기사 검색**에서 입력하거나 금융 주제 바로가기를 누른다. 결과를 선택하면 같은 기사의 상세가 열리고, 상단 `탐색으로 돌아가기`로 복귀하면 검색어·결과가 유지된다. PC 브라우저에서는 목록의 스크롤 위치 유지도 확인했다. 다른 탭을 방문해도 유지하지만 새로고침·앱 재실행 시 초기화한다. 브라우저 주소창의 URL·이전 페이지 이력과 앱 내부 뒤로 가기는 별개다.

검색 규칙은 **화면용 기본안**이다. 기존 고유 예시 기사 10개의 제목·요약·출처를 NFC 정규화하고 앞뒤/연속 공백과 영문 대소문자를 정리한다. 공백으로 나눈 모든 단어가 해당 필드들을 합친 문자열에 포함되면 일치한다(AND, 리터럴 부분 일치). 결과 순서는 fixture의 최신 4개 → 인기 3개 → 추천 3개 순서를 보존하며 실제 관련도·최신순·서버 검색 정책을 확정하지 않는다. 본문·AI 해석은 검색 대상이 아니며 페이지 구분 없이 전부 표시한다.

입력 마지막 변경 후 250ms에 조회한다. 빈 입력은 검색하지 않고 주제 바로가기를 보여주며, 결과 0건은 별도 안내를 표시한다. 새 검색어를 입력하면 이전 결과를 숨기고 현재 검색어의 로딩/오류를 보여준다. 늦은 성공·실패는 무시하며 같은 검색어로 재시도한다. `금리`는 2건, `환율`은 이미지 없는 기사 1건, `Kostolany`는 10건, `없는기사`는 0건을 확인하기 좋은 예시다.

[searchPreview.ts](src/features/search/data/searchPreview.ts)의 `searchPreviewScenario`를 바꾸고 전체 Reload하면 아래 상태를 재현할 수 있다. 검증 후 `normal`로 복원했다.

| 값 | 검색 상태 |
| --- | --- |
| `normal` | debounce 이후 200ms 지연 후 결과 |
| `initial-error` | 검색어별 첫 요청 1회 실패 → `검색 다시 시도`로 복구 |
| `slow` | 10초 지연; 요청 중 지운 검색어의 늦은 결과 무시 |
| `out-of-order` | 금리 1,200ms·나머지 200ms. 금리 입력 후 250ms 이상 기다려 요청을 시작하고 환율로 바꾸면 늦은 금리 응답 무시 |

원본의 검색창·주제 행·유형 밑줄·출처/제목/썸네일/전체 폭 요약/메타데이터 배치를 반영했다. 기사 외 유형·저장·글쓰기는 제외하며 검색 카드의 좋아요는 Goal 7에서 추가했다. [검색 원본/구현 비교](../TODO/evidence/goal6/COMPARISON.html)와 [Goal 6 검증 기록](../TODO/FE_GOAL_06_RESULT.md)은 반응 추가 전 이력이다.

## 좋아요 예시와 상태 재현

홈·검색 결과의 하트와 상세 하단의 하트는 같은 기사 반응을 공유한다. 고정 모의 사용자 `example-reader`가 1좋아요를 등록·해제하는 화면용 기본안이다. 처음에는 모든 기사 미선택이며 수치는 0~128의 임의 예시다. 저장소는 앱 실행 동안 유지되고 전체 새로고침·앱 재실행 시 초기화한다. 기기에 영속 저장하지 않는다.

기사별 요청은 직렬 처리하며 가장 최근 선택만 대기한다. 수치와 선택을 먼저 보여주고 최신 변경이 실패하면 확정 상태로 복구한다. 재시도는 실패했던 목표를 그대로 사용한다. 이전 조회 응답과 이전 범위의 응답이 최신 상태를 덮지 않도록 처리한다.

`src/features/likes/data/likePreview.ts`의 `likePreviewScenario`를 변경하고 전체 새로고침하면 아래 상태를 확인할 수 있다. 결과 전달 시 기본값은 `normal`이다.

| 시나리오 | 동작 |
| --- | --- |
| `normal` | 조회·쓰기 각각 350ms 뒤 성공 |
| `write-error` | 기사별 첫 변경 실패, 상태·수치 복구 후 재시도 |
| `unlike-error` | 등록 성공 후 첫 해제 실패, 선택·수치 복구 후 해제 재시도 |
| `read-error` | 첫 조회 실패, 수치 미확인 표시 후 조회 재시도 |
| `slow` | 조회·쓰기 1,800ms 지연, 연속 입력·이동 중 마지막 선택 확인 |

[Goal 7 결과](../TODO/FE_GOAL_07_RESULT.md)에 상태 소유자·수명·동시성·초기 수치·실패 계약을 기록했다. [Medium 반응 비교](../TODO/evidence/goal7/COMPARISON.html)는 원본 박수와 우리 단일 좋아요의 차이를 포함한다.

## 검증 범위와 남은 확인

- 사용자 확인: 현재 사용할 수 있는 휴대폰이 없다.
- 현재 Windows 환경: Android SDK·adb·에뮬레이터를 발견하지 못했다. macOS/Xcode 환경도 없다.
- 따라서 실제 기기·시뮬레이터 실행, 네이티브 화면 캡처와 원본 비교, 네이티브 빌드·설치·출시는 미검증이다. Goal 6~7의 브라우저 모바일 폭 비교와 구분한다.
- 보관된 Medium iOS 홈·Story detail/Sending claps·Explore/Searching Medium 캡처를 참고했다. 4단계 설명과 단일 좋아요는 우리 앱의 기본안이다. 저장 목록·로그인·프로필 기능은 후속 Goal이다. Medium 원본의 탭 의미·글·이미지를 그대로 사용한 것은 아니다.
- 인증·API·DB·Storage·RSS·AI 호출은 구현하지 않았다.

현재 구현과 검증은 [Goal 7 결과 기록](../TODO/FE_GOAL_07_RESULT.md)을 따른다. 이전 이력은 [Goal 1](../TODO/FE_GOAL_01_RESULT.md)·[Goal 2](../TODO/FE_GOAL_02_RESULT.md)·[Goal 3](../TODO/FE_GOAL_03_RESULT.md)·[Goal 4](../TODO/FE_GOAL_04_RESULT.md)·[Goal 5](../TODO/FE_GOAL_05_RESULT.md)·[Goal 6](../TODO/FE_GOAL_06_RESULT.md)에 보존한다. Goal 8은 별도 요청 없이 시작하지 않는다. Goal 4 당시 npm audit는 67건(높음 65·보통 2)을 보고했으며 미해결이다. Goal 5~7에서 의존성·lockfile은 변경하지 않았고 audit를 재실행하지 않았다.

## 적용 규칙

[AGENT](../AGENT/README.md), [React Native 규칙](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/README.md), [검증 규칙](../AGENT/SOFTWARE_AGENT/COMMON/QUALITY_AND_WORKFLOW.md), [FE Goal 계획](../TODO/FE_GOALS.md)을 따른다.

기본 프로젝트는 `create-expo-app@5.0.0`과 `expo-template-blank-typescript@57.0.35`에서 시작했다. 템플릿의 Expo 라이선스와 초기 이미지 파일은 보존했다. 현재 앱은 해당 이미지를 참조하지 않는다.
