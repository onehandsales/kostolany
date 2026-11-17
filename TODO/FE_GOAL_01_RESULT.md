# FE Goal 1 결과 기록

작업일: 2026-11-17

상태: 구현·코드 검토·자동 검증 완료. 기기 실행은 환경 부재로 미검증.

범위: [FE_GOALS.md의 Goal 1](FE_GOALS.md)

## 구현

- `FE`에 Expo SDK 57 기반 React Native·TypeScript 프로젝트를 초기화했다. 작업 시작 당시 Git 작업 트리는 깨끗했고 FE는 비어 있었다.
- 앱 등록 → Safe Area provider → 최소 시작 화면을 연결했다. 제목·한글 소개만 표시하며 기능 화면·탭·로그인은 추가하지 않았다.
- TypeScript strict, lint, Jest와 React Native Testing Library, 기본 시작 화면 테스트를 구성했다.
- 직접 의존성의 정확한 버전과 lockfile을 추가하고, [설치·실행 안내](../FE/README.md)를 작성했다.
- node_modules, Expo 캐시, 생성 번들, 로컬 ENV, 패키지 캐시를 Git에서 제외한다.
- 백엔드·Supabase·Google 인증·배포는 수행하지 않았다. Goal 2를 시작하지 않는다.
- Goal 1 종료 시 커밋하지 않았으며, 이후 별도 사용자 요청에 따라 이 산출물을 로컬 커밋으로 기록한다. 원격 push는 수행하지 않는다.

## 참고 기준

- AGENT의 React Native·UX·검증 규칙을 적용했다. 첫 화면은 초기 구동 확인용 자체 화면이며 Medium의 특정 기능 화면을 재현한 결과가 아니다.
- 이 Goal에서 새 Gummble 화면을 조회하지 않았다. 기존 Medium 선택 화면 10장의 조사 상태를 유지한다.
- SDK 선택: [Expo 공식 안내](https://docs.expo.dev/more/create-expo/)의 실기기 Expo Go용 SDK 57 권장과 설치된 Expo 의존성 표를 기준으로 했다.
- Google 네이티브 인증의 향후 확장에는 development build가 필요하다는 [Expo 안내](https://docs.expo.dev/guides/google-authentication/)를 확인했지만 실제 연동은 구현하지 않았다.

## 테스트 코드

[App.test.tsx](../FE/src/app/App.test.tsx)는 실제 `App` 루트를 렌더링해 앱 제목을 heading 역할로 찾고, 두 개의 한글 소개 문구가 표시되는지 검증한다. 테스트 1개이며 스냅샷 테스트는 없다.

Goal 1 화면에는 버튼이나 데이터 요청이 없다. 테스트를 늘리기 위한 가짜 기능은 추가하지 않았다. 모의 로그인·반응·검색 등의 상호작용 테스트는 해당 Goal에서 작성한다.

[test/setup.ts](../FE/test/setup.ts)는 네이티브 window inset이 없는 Jest를 위해 Safe Area 라이브러리의 공식 mock을 사용한다. `App`과 시작 화면 컴포넌트는 mock하지 않는다.

## 코드·의존성 검토

- `test-renderer`의 내부 `react-reconciler` peer 조건을 확인해 React 19.2 계열과 호환되는 `test-renderer@1.2.0`으로 고정했다. peer 오류를 무시하는 설치 옵션은 사용하지 않았다.
- TypeScript 6 환경에서 Jest 전역 타입을 명시하고 테스트 파일을 타입 검사에 포함했다.
- Expo 호환성 검사에 맞춰 `@types/react`를 19.2.4로 조정했다.
- ESLint 9.39.5는 지원 종료 경고가 있으나, SDK 57의 Expo 설정이 사용하는 React·import 플러그인의 peer 범위가 ESLint 9까지이므로 호환 버전을 유지했다. 향후 SDK·lint 구성을 함께 갱신할 때 재검토한다.
- `npm audit`에서는 minimatch 간접 의존성으로 인한 moderate 항목 3개가 보고됐다. 직접 취약 라이브러리 추가 3건이라는 의미는 아니며 minimatch·상위 패키지로 전파된 집계다. 제안된 강제 수정은 Expo 52로 변경하므로 적용하지 않았다. [관련 advisory](https://github.com/advisories/GHSA-g3hv-75wg-m249).
- 시작 화면에는 고정 높이·줄 수 제한을 두지 않고 ScrollView와 Safe Area를 사용했다. 실제 글자 확대·작은 화면·네이티브 레이아웃 검증은 아직 하지 못했다.
- 미사용 템플릿 이미지 삭제 명령은 자동 승인 검토에서 `blocked by policy`로 거부되어 실행되지 않았다. 파일을 보존했고, 현재 앱에서는 참조하지 않는다.

## 실행 결과

아래 결과는 실제 실행 기록이다. 코드·도구 실행과 기기 실행을 구분한다.

| 검증 | 결과 |
| --- | --- |
| `npm ci` | 통과: lockfile 기준 960 packages 재설치 |
| `npm run check` | 재설치 후 아래 타입 검사·lint·테스트 순차 실행 통과 |
| `npm run typecheck` | 통과 |
| `npm run lint` | 통과: 오류·경고 없음 |
| `npm test` | 1 suite·1 test 통과, 스냅샷 0개 |
| `npx expo install --check` | 통과: Dependencies are up to date |
| `npx --yes expo-doctor@1.21.8` | 21/21 통과 |
| `npm ls --all --json` | exit 0, problems 없음 |
| `npm run export:android` | 통과: index.ts, 590 modules, Hermes 번들 생성 |
| `npm run export:ios` | 통과: index.ts, 592 modules, Hermes 번들 생성 |
| 실제 Android 실행·화면 비교 | 미검증: SDK·에뮬레이터·실기기 없음 |
| 실제 iOS 실행·화면 비교 | 미검증: macOS/Xcode·실기기 없음 |
| APK·AAB·IPA 빌드·설치·배포 | 미실행 |

사용자가 현재 사용할 수 있는 휴대폰이 없다고 확인했다. JS/Hermes 번들 생성은 실제 기기에서 시작 화면을 확인한 증거가 아니다.

Goal 1의 프로젝트 초기화·테스트 작성·코드 검토·자동 검증·실행 안내를 완료했다. 현재 이용 가능한 모바일 실행 환경은 없으므로 해당 검증은 미검증으로 인계한다. Goal 2는 자동으로 시작하지 않는다.

## 남은 확인과 다음 작업

- Android 기기 또는 SDK·에뮬레이터, iPhone 또는 macOS/Xcode가 준비되면 시작 화면을 실행하고 작은 화면·글자 확대·Safe Area를 확인한다.
- 의존성 advisory와 ESLint 지원 범위는 다음 SDK 갱신 시 재검토한다.
- Goal 2의 탭·공통 스타일 작업은 별도 요청을 받기 전 시작하지 않는다.
