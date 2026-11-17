# Kostolany Mobile

React Native 기반 iOS·Android 앱이다. 현재는 [FE Goal 1](../TODO/FE_GOALS.md)의 최소 시작 화면과 개발·테스트 환경만 구현했다.

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

직접 의존성은 `package.json`에 정확한 버전으로 지정하고, 전체 설치 결과는 `package-lock.json`으로 고정한다. 패키지 관리자는 npm을 사용한다.

2026-11-17 기준 Expo 공식 안내의 SDK 58 전환 기간에는 실기기 Expo Go용으로 SDK 57을 권장한다. 이 기준과 SDK 57의 의존성 검사 결과에 맞췄다. 최신 버전으로 일괄 갱신하지 말고 Expo·React Native·테스트 도구의 호환성을 함께 확인한다.

현재는 `index.ts`에서 앱을 등록하는 기본 템플릿이다. navigation과 하단 탭은 Goal 2에서 구현하며 Expo Router는 아직 설치하지 않았다. 향후 실제 Google 네이티브 인증을 붙일 때에는 development build와 각 플랫폼 설정을 별도로 확인해야 한다.

근거: [Expo 프로젝트 생성](https://docs.expo.dev/more/create-expo/), [Expo 테스트 구성](https://docs.expo.dev/develop/unit-testing/), [RNTL v14](https://oss.callstack.com/react-native-testing-library/docs/start/quick-start), [Google 인증](https://docs.expo.dev/guides/google-authentication/).

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

```powershell
npx.cmd expo install --check
npx.cmd --yes expo-doctor@1.21.8
npm.cmd run export:android
npm.cmd run export:ios
```

`export:*`는 각 플랫폼의 JavaScript/Hermes 번들을 생성한다. APK·AAB·IPA 네이티브 빌드나 기기 실행을 대신하지 않는다. 생성물은 `dist/android`, `dist/ios`에 저장되며 Git에서 제외한다.

## 파일 구성

```text
index.ts                  앱 등록
App.tsx                   Safe Area provider와 시작 화면 연결
src/app/StartScreen.tsx    최소 시작 화면
src/app/App.test.tsx       실제 App 컴포넌트의 시작 화면 테스트
test/setup.ts             Safe Area의 공식 Jest mock
jest.config.js            jest-expo 설정
eslint.config.js          Expo 기반 lint 설정
tsconfig.json             strict와 테스트 타입 검사
```

테스트는 앱 루트에서 제목과 한글 소개가 접근 가능한 요소로 나타나는지 확인한다. 네이티브 환경이 없는 Jest에서는 Safe Area 라이브러리가 제공하는 mock을 사용한다. 기기의 실제 여백·글자 확대·레이아웃을 검증한 것은 아니다.

새 테스트를 작성할 때는 설치된 `node_modules/@testing-library/react-native/docs/guides/llm-guidelines.md`를 확인한다. v14의 `render`와 사용자 이벤트는 비동기 API이므로 `await`로 완료를 기다린다. 테스트를 통과시키기 위해 실제 화면 컴포넌트 자체를 mock으로 대체하지 않는다.

## 검증 범위와 남은 확인

- 사용자 확인: 현재 사용할 수 있는 휴대폰이 없다.
- 현재 Windows 환경: Android SDK·adb·에뮬레이터를 발견하지 못했다. macOS/Xcode 환경도 없다.
- 따라서 실제 기기·시뮬레이터 실행, 화면 캡처, 원본과의 시각 비교, 네이티브 빌드·설치·출시는 미검증이다.
- 시작 화면은 독립적인 초기 화면이다. Medium 기능 화면이나 4개 탭을 구현한 것으로 보지 않는다.
- 인증·API·DB·Storage·RSS·AI 호출은 구현하지 않았다.

상세 실행 결과와 의존성 검토는 [Goal 1 결과 기록](../TODO/FE_GOAL_01_RESULT.md)을 따른다. 다음 작업은 사용자가 별도로 요청하는 Goal 2다.

## 적용 규칙

[AGENT](../AGENT/README.md), [React Native 규칙](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/README.md), [검증 규칙](../AGENT/SOFTWARE_AGENT/COMMON/QUALITY_AND_WORKFLOW.md), [FE Goal 계획](../TODO/FE_GOALS.md)을 따른다.

기본 프로젝트는 `create-expo-app@5.0.0`과 `expo-template-blank-typescript@57.0.35`에서 시작했다. 템플릿의 Expo 라이선스와 초기 이미지 파일은 보존했다. 현재 `app.json`과 시작 화면은 해당 이미지를 참조하지 않는다.
