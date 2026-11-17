# FE Goal 2 결과 기록

작업일: 2026-11-17

상태: 구현·코드 검토·자동 검증 완료 / 기기 실행·원본 화면 비교 검증 대기.

범위: [FE_GOALS.md의 Goal 2](FE_GOALS.md). 작업 시작 시 Git 작업 트리는 깨끗했으며 기준 커밋은 `0d0e11d`였다. Goal 3와 배포는 수행하지 않았다. Goal 2 구현 작업은 커밋 없이 종료했으며, 이후 별도 사용자 요청에 따라 산출물을 로컬 커밋으로 기록한다.

## 구현 범위와 변경 파일

| 파일 | 변경 |
| --- | --- |
| [App.tsx](../FE/App.tsx) | 앱 진입 시 실제 탭 navigator 연결 |
| [MainTabs.tsx](../FE/src/app/navigation/MainTabs.tsx) | 홈·탐색·라이브러리·프로필 경로, 초기 홈, 방문 이력 기반 뒤로 가기 |
| [BottomTabBar.tsx](../FE/src/app/navigation/BottomTabBar.tsx) | 아이콘 4개, 선택 상태, 접근성 이름·tab 역할, 최소 48 터치 영역, 하단·좌우 Safe Area |
| [tabs.ts](../FE/src/app/navigation/tabs.ts) | 타입이 지정된 경로와 탭별 한국어 안내 |
| [TabPlaceholderScreen.tsx](../FE/src/app/TabPlaceholderScreen.tsx) | 각 탭 제목과 준비 중 안내만 표시 |
| [tokens.ts](../FE/src/shared/theme/tokens.ts) | 현재 화면에 필요한 색상·간격·글자 위계·터치 크기 |
| [Screen.tsx](../FE/src/shared/ui/Screen.tsx) | 상단·좌우 Safe Area, 제목, 긴 글자 대응 스크롤 |
| [TabIcon.tsx](../FE/src/shared/ui/TabIcon.tsx) | 자체 작성한 SVG 아이콘과 채움·굵기·테두리 선택 표시 |
| [App.test.tsx](../FE/src/app/App.test.tsx) | 기본 진입 테스트를 실제 탭 이동·재선택·뒤로 가기 테스트로 확장 |
| [jest.config.js](../FE/jest.config.js), [babel.config.js](../FE/babel.config.js) | iOS·Android 설정으로 같은 테스트 실행, Expo Babel 변환 명시 |
| [package.json](../FE/package.json), [lockfile](../FE/package-lock.json) | 호환 버전으로 navigation·screens·SVG·Babel 의존성 고정 |
| [README](../FE/README.md) | 현재 구조, 실행·테스트 명령, 검증 한계 갱신 |

Goal 1의 `StartScreen.tsx`는 탭 진입 화면으로 교체해 제거했다. 전역 서버 상태, API client, 실제 인증, 피드 데이터 등 다음 단계의 구조를 미리 추가하지 않았다. 이미지·기사·Medium 로고도 앱 자산으로 가져오지 않았다.

## Medium 참고 근거

이번 작업에서는 이전 Gummble MCP 조회로 저장된 원본 캡처 3장을 로컬 이미지 도구로 다시 열어 확인했다. 새 MCP 호출이나 실제 Medium 앱 조작을 수행한 것은 아니다.

- 앱: `medium-ios`, 플랫폼 iOS.
- 최초 조회·재확인: 모두 2026-11-17.
- 보관 위치: `C:\Users\leehg\AppData\Local\Temp\kostolany-gummble-research-20261117`.
- 앱 조회 응답의 선택 버전은 `Latest`, ID `1419`다. 홈은 해당 버전 목록에서 확인됐고, 라이브러리·프로필 개별 화면의 버전 연결은 응답에 없어 미확인으로 유지한다. `Latest`를 실제 앱 배포 버전으로 단정하지 않는다.
- 전체 200장 재조사나 Medium Android 화면 조사를 한 결과가 아니다. 보관 파일은 임시 경로이며 저장소에 복사하지 않았다.

| 원본 화면 | 로컬 캡처 | 관찰과 적용 |
| --- | --- | --- |
| [홈](https://gummble.com/screens/sc_5e0ba0e498ff49579bf838096aec4b5e) | `medium-first-screens-content-0.png` | 밝은 배경, 진한 제목, 얇은 하단 구분선, 같은 간격의 아이콘 4개. 홈 선택 시 집 아이콘 채움 |
| [라이브러리](https://gummble.com/screens/sc_84e0421de98041bbb014822fc05dd3fb) | `medium-library-profile-content-0.png` | 동일한 하단 구조, 라이브러리 선택 시 책갈피 채움 |
| [프로필](https://gummble.com/screens/sc_1bd141b757934a88b4a003855e1794cc) | `medium-library-profile-content-2.png` | 원형 프로필 아이콘 주변에 선택 테두리 |

화면 ID·원본 링크는 위 표에 기록했다. 기존 조사 전체는 [Medium 참고 기록](../AGENT/UXUI_AGENT/MEDIUM_REFERENCE.md)을 따른다. 해당 문서의 하단 3개 메뉴 제안은 과거 기본안이며, 이번에는 최신 사용자 지시와 FE_GOALS의 4개 메뉴를 적용했다.

### 자체 적용과 제외 범위

- 캡처처럼 하단에 글자 없이 아이콘을 표시하되, 각각 `홈 / 탐색 / 라이브러리 / 프로필` 접근성 이름과 선택 상태를 제공한다.
- 수치·폰트는 Medium 소스에서 추출한 값이 아니다. 제목 28/36, 본문 16/26, 페이지 여백 24, 아이콘 24, 최소 터치 크기 48을 현재 앱의 시작 값으로 정했다. 글자 확대를 끄거나 본문 줄 수를 제한하지 않는다.
- 탐색이 선택된 원본 화면은 이번에 확인하지 않았다. 탐색 아이콘의 선택 굵기는 자체 임시 표현이다. 프로필 사진·유료 회원 별 표시는 복사하지 않는다.
- 방문한 탭으로 돌아가는 `history`와 전환 애니메이션 없음은 이번 앱의 동작 선택이며, 정적 캡처에서 관찰한 동작이 아니다.
- 피드 카드·정렬, 검색 입력, 저장 목록, 사용자 프로필, 설정 버튼, 알림·글쓰기 등 탭 내부 기능은 이번 범위에 포함하지 않았다. 준비 중 안내는 자체 임시 콘텐츠다.

## 테스트와 코드 검토

실제 `App`과 React Navigation을 렌더링한다. navigator나 화면을 mock하지 않으며, 네이티브 모듈은 jest-expo 환경과 기존 Safe Area 공식 mock을 사용한다.

1. 첫 진입 시 홈 제목과 안내가 나타나고, 이름이 있는 탭 4개 중 홈 하나만 선택된다.
2. 접근성 이름으로 탐색 → 라이브러리 → 프로필 → 홈을 누르면 제목·안내·선택 상태가 함께 바뀌고 이전 화면은 접근성 질의에서 제외된다.
3. 현재 선택한 라이브러리를 다시 눌러도 화면·선택 상태가 중복되지 않는다.
4. 등록된 네이티브 뒤로 가기 핸들러에 모의 이벤트를 전달하면 라이브러리 → 탐색 → 홈으로 돌아가며, 더 돌아갈 이력이 없으면 이벤트를 소비하지 않는다.

행동 테스트는 4개이며 iOS·Android Jest 설정에서 각각 실행해 합계 8건이다. 뒤로 가기 테스트는 JS 이벤트 처리 검증이며 Android 실기기 버튼·제스처나 iOS 제스처 검증이 아니다.

검토·수정 사항:

- React Native 0.86의 뒤로 가기 이벤트 타입에 맞춰 테스트에 이벤트 객체를 전달했다. navigation 자체는 실제 라이브러리를 사용한다.
- Android Jest 설정의 최초 실행은 Babel 설정 부재로 Flow 구문 파싱에 실패했다. `babel-preset-expo@57.0.17`과 명시적 Babel 설정을 추가한 뒤 두 플랫폼 테스트를 통과했다. 테스트를 건너뛰거나 실제 navigator를 mock하는 방식으로 회피하지 않았다.
- `tabPress`의 취소 가능 이벤트와 재선택을 처리하고, `tabLongPress`도 전달한다. 선택 상태는 navigator의 실제 경로에서 파생하며 별도 UI 상태를 중복 저장하지 않는다.
- 화면은 상단·좌우, 탭은 하단·좌우 Safe Area를 담당한다. 텍스트에 고정 높이·줄 수 제한을 두지 않았다. 실제 잘림·여백·스크린리더 탐색은 검증 대기다.
- 직접 의존성 버전과 lockfile의 일치, peer dependency 문제 없음, 불필요한 네트워크·인증 호출 없음, Goal 2 범위만 구현했음을 검토했다.
- 설치 로그의 moderate 경고 3개는 남아 있다. Goal 1에서 기록한 의존성 경고를 없앴다고 주장하지 않으며 강제 자동 수정은 하지 않았다. ESLint 9 지원 종료에 관한 기존 기록도 유지한다.

기술 근거: [React Navigation 설치](https://reactnavigation.org/docs/getting-started/), [하단 탭](https://reactnavigation.org/docs/bottom-tab-navigator/), [실제 navigator 테스트 원칙](https://reactnavigation.org/docs/testing/), [Expo Babel 설정](https://docs.expo.dev/versions/latest/config/babel/). 플랫폼별 Jest 구성은 설치된 `jest-expo/README.md`도 확인했다.

## 실제 실행 결과

| 검증 | 결과 |
| --- | --- |
| `npm run check` | 타입 검사 → lint → 두 플랫폼 테스트 통과 |
| TypeScript strict | 통과: 테스트 파일 포함 |
| ESLint `--max-warnings=0` | 통과 |
| Jest iOS | 1 suite, 행동 테스트 4개 통과 |
| Jest Android | 1 suite, 행동 테스트 4개 통과 |
| 전체 Jest | 2 suites, 8건 통과, 스냅샷 0개 |
| `npx expo install --check` | Dependencies are up to date |
| `npx --yes expo-doctor@1.21.8` | 21/21 통과 |
| `npm ls --all --json` | exit 0, problems 없음 |
| package.json ↔ package-lock.json | 직접 의존성 일치 |
| `npm run export:android` | 통과: 944 modules, 약 2MB Hermes 번들 |
| `npm run export:ios` | 통과: 949 modules, 약 2MB Hermes 번들 |
| 실제 Android 실행·원본 비교 | 검증 대기: 기기·SDK·에뮬레이터 없음 |
| 실제 iOS 실행·원본 비교 | 검증 대기: 기기·macOS/Xcode 없음 |
| APK·AAB·IPA 빌드·설치·배포 | 미실행 |

이번 Goal에서는 의존성을 설치하고 lockfile을 갱신했다. Goal 1에서 수행한 `npm ci` 재설치를 Goal 2에서도 다시 수행했다고 기록하지 않는다. Android SDK 표준 경로와 adb·emulator·sdkmanager가 없는 상태를 재확인했고, 사용할 기기가 없다는 사용자 답변을 유지한다.

JS/Hermes 번들 생성과 두 플랫폼 Jest 테스트는 네이티브 앱 실행이나 원본과의 시각적 일치 증거가 아니다. 실제 외부 데이터·인증·DB 상태도 생성하지 않았다.

## 완료 조건과 검증 대기

공통 스타일·탭·임시 화면 구현, 테스트 코드, 코드 검토, 가능한 자동 검증과 기록은 완료했다. Goal 2의 원래 완료 조건 중 **실제 실행 화면과 Medium 원본 비교는 충족하지 못했다**. 따라서 전체 상태는 **구현·자동 검증 완료 / 기기·시각 검증 대기**로 남긴다.

기기가 준비되면 두 플랫폼에서 초기 홈, 탭 이동·재선택, 선택 표시, Android 뒤로 가기, Safe Area, 작은 화면·가로 방향·글자 확대, VoiceOver/TalkBack을 확인하고 원본 하단 메뉴와 나란히 비교해야 한다. 자동 테스트 결과만으로 이 항목을 완료 처리하지 않는다.

Goal 2 요청 범위의 가능한 작업과 기록까지 수행하고 종료했다. Goal 3는 자동 생성·시작하지 않는다. 이후 별도 요청에 따른 로컬 커밋 외에 원격 push·배포는 수행하지 않는다.
