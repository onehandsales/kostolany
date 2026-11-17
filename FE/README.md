# Kostolany Mobile

React Native 기반 iOS·Android 앱이다. [FE Goal 계획](../TODO/FE_GOALS.md)에 따라 Goal 3의 홈 피드·기사 카드까지 구현했다. 홈에는 최신·인기·추천 예시 목록을 표시하고, 탐색·라이브러리·프로필은 준비 중 안내를 유지한다. 실제 기기 실행과 Medium 원본 대비 시각 검증은 대기 중이다.

## 환경과 기술 선택

| 항목 | 고정 버전 |
| --- | --- |
| Node.js | 24.18.0 (`.nvmrc`, Node 24 계열) |
| npm | 10.9.0 |
| Expo SDK | 57 (`expo` 57.0.33) |
| React / React Native | 19.2.3 / 0.86.3 |
| TypeScript | 6.0.3, strict |
| Jest / jest-expo | 29.7.0 / 57.0.6 |
| React Native Testing Library / test-renderer | 14.1.0 / 1.2.0 |
| ESLint / eslint-config-expo | 9.39.5 / 57.0.2 |
| React Navigation / bottom-tabs | 7.5.2 / 7.22.0 |
| react-native-screens / react-native-svg | 4.26.2 / 15.15.4 |
| babel-preset-expo | 57.0.17 |

직접 의존성은 `package.json`에 정확한 버전으로 지정하고, 전체 설치 결과는 `package-lock.json`으로 고정한다. 패키지 관리자는 npm을 사용한다.

2026-11-17 기준 Expo 공식 안내의 SDK 58 전환 기간에는 실기기 Expo Go용으로 SDK 57을 권장한다. 이 기준과 SDK 57의 의존성 검사 결과에 맞췄다. 최신 버전으로 일괄 갱신하지 말고 Expo·React Native·테스트 도구의 호환성을 함께 확인한다.

`index.ts`에서 앱을 등록하고 React Navigation의 bottom-tabs를 사용한다. Expo Router는 설치하지 않았다. 방문한 탭 순서로 돌아가는 `history` 방식을 사용하며, 홈에서 더 돌아갈 이력이 없으면 OS 기본 뒤로 가기에 맡긴다. 실제 기기의 뒤로 가기·제스처는 아직 미검증이다. 향후 실제 Google 네이티브 인증을 붙일 때에는 development build와 각 플랫폼 설정을 별도로 확인해야 한다.

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

macOS에서는 위 `npm.cmd` 명령을 `npm`으로 실행한다. 앱 플랫폼은 `app.json`에서 iOS·Android로 제한하며 웹 실행 스크립트는 제공하지 않는다.

## 검증 명령

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
```

세 검사를 순서대로 실행하려면 `npm.cmd run check`, 테스트 수정 중에는 `npm.cmd run test:watch`를 사용한다. 타입 검사에는 테스트 파일도 포함된다.

`npm.cmd test`는 테스트 20개를 iOS·Android Jest 설정에서 각각 실행한다(총 40건). 특정 설정만 확인하려면 `npm.cmd test -- --selectProjects iOS` 또는 `npm.cmd test -- --selectProjects Android`를 사용한다. 이 결과는 JS 컴포넌트·hook·mock 데이터 테스트이며 실기기 실행 결과가 아니다.

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
App.tsx                              Safe Area provider와 탭 연결
src/app/navigation/MainTabs.tsx      실제 navigator와 탭 등록
src/app/navigation/BottomTabBar.tsx  접근 가능한 아이콘 탭과 Safe Area
src/app/navigation/tabs.ts          타입이 지정된 경로·명칭·임시 안내
src/app/TabPlaceholderScreen.tsx     탐색·라이브러리·프로필 임시 화면
src/features/feed/HomeFeedScreen.tsx 홈 피드·상태 표시와 기사 선택 경계
src/features/feed/components/        기사 카드·정렬 탭·상태·자체 SVG 썸네일
src/features/feed/useFeed.ts         조회·재시도·추가 요청·오래된 응답 처리
src/features/feed/types.ts           fixture용 데이터 접근 계약
src/features/feed/data/fixtures.ts   정렬별 고정 예시 기사
src/features/feed/data/mockFeedSource.ts 페이지·지연·실패를 재현하는 공급부
src/features/feed/data/feedPreview.ts 실행 화면의 mock 시나리오 선택
src/shared/theme/tokens.ts           현재 화면에 필요한 색상·글자·간격
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

실제 기기에서 위 시나리오를 실행한 결과는 아직 없다. 자동 테스트에서는 같은 공급부 또는 제어 가능한 응답을 주입해 상태와 행동을 검증했다. 카드를 누르면 `onSelectArticle(articleId)`에 ID만 전달한다. 앱의 기본 연결은 `기사 상세 준비 중` 안내이며 기사 상세 경로·화면은 아직 없다.

## 검증 범위와 남은 확인

- 사용자 확인: 현재 사용할 수 있는 휴대폰이 없다.
- 현재 Windows 환경: Android SDK·adb·에뮬레이터를 발견하지 못했다. macOS/Xcode 환경도 없다.
- 따라서 실제 기기·시뮬레이터 실행, 화면 캡처, 원본과의 시각 비교, 네이티브 빌드·설치·출시는 미검증이다.
- 보관된 Medium iOS 홈 캡처를 참고해 하단 탭 4개와 홈 피드 배치를 구현했다. 검색·저장 목록·프로필 기능은 후속 Goal이다. Medium 원본의 탭 의미·글·이미지를 그대로 사용한 것은 아니다.
- 인증·API·DB·Storage·RSS·AI 호출은 구현하지 않았다.

현재 구현과 검증은 [Goal 3 결과 기록](../TODO/FE_GOAL_03_RESULT.md)을 따른다. 초기화와 하단 탭 이력은 [Goal 1](../TODO/FE_GOAL_01_RESULT.md)·[Goal 2](../TODO/FE_GOAL_02_RESULT.md)에 보존한다. Goal 4는 별도 요청 없이 시작하지 않는다.

## 적용 규칙

[AGENT](../AGENT/README.md), [React Native 규칙](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/README.md), [검증 규칙](../AGENT/SOFTWARE_AGENT/COMMON/QUALITY_AND_WORKFLOW.md), [FE Goal 계획](../TODO/FE_GOALS.md)을 따른다.

기본 프로젝트는 `create-expo-app@5.0.0`과 `expo-template-blank-typescript@57.0.35`에서 시작했다. 템플릿의 Expo 라이선스와 초기 이미지 파일은 보존했다. 현재 앱은 해당 이미지를 참조하지 않는다.
