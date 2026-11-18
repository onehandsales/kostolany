# FE Goal 4 — 기사 상세 결과

작업일: 2026-11-18 KST

상태: **구현·테스트 작성·코드 검토·자동 검증 완료 / 기기 실행·원본 화면 비교 검증 대기**

## 구현 범위와 변경 파일

홈의 기사 카드를 누르면 선택한 ID로 상세를 조회하고 제목·부제·출처·게시 시각·읽기 시간·이미지·본문을 표시한다. 사실 요약과 AI 해석은 서로 다른 제목과 구획으로 구분한다. 모든 내용은 직접 작성한 예시이며 실제 보도·AI 생성 결과·코스톨라니 인용문이 아니다.

| 변경 | 위치와 역할 |
| --- | --- |
| 상세 진입·홈 복귀 | [AppNavigator.tsx](../FE/src/app/navigation/AppNavigator.tsx), [MainTabs.tsx](../FE/src/app/navigation/MainTabs.tsx), [App.tsx](../FE/App.tsx): native-stack의 Main 탭과 Article 화면 연결 |
| 읽기 화면 | [ArticleDetailScreen.tsx](../FE/src/features/article/ArticleDetailScreen.tsx): 상단 뒤로 가기, 스크롤 본문, 제목·메타데이터·삽화·구획·로딩/오류/재시도 |
| 상세 조회 상태 | [useArticle.ts](../FE/src/features/article/useArticle.ts), [types.ts](../FE/src/features/article/types.ts): 기사별 조회, 재시도, 정리된 요청의 응답 차단. 실제 API 계약이 아닌 로컬 fixture 경계 |
| 예시 데이터 | [fixtures.ts](../FE/src/features/article/data/fixtures.ts), [mockArticleSource.ts](../FE/src/features/article/data/mockArticleSource.ts), [articlePreview.ts](../FE/src/features/article/data/articlePreview.ts): 홈 10개 기사와 대응하는 본문·시나리오 |
| 홈 선택 연결 | [HomeFeedScreen.tsx](../FE/src/features/feed/HomeFeedScreen.tsx): 임시 안내를 제거하고 필수 선택 callback으로 ID 전달 |
| 공통 표시 재사용 | [ContentIllustration.tsx](../FE/src/shared/ui/ContentIllustration.tsx), [ContentStatus.tsx](../FE/src/shared/ui/ContentStatus.tsx): 기존 피드 SVG·상태 표시를 공통 위치로 이동. 기존 피드 컴포넌트 경로는 재수출 유지 |
| 의존성 | [package.json](../FE/package.json), [package-lock.json](../FE/package-lock.json): `@react-navigation/native-stack` 7.21.1 추가·고정 |
| 작업 기록 | [FE README](../FE/README.md), [Goal 계획](FE_GOALS.md), [현재 구현 상태](../AGENT/SOFTWARE_AGENT/COMMON/IMPLEMENTATION_STATUS.md), 이 문서 |

상세는 Main 위의 별도 화면이며 하단 탭을 표시하지 않는다. 뒤로 가면 Main을 새로 만들지 않고 돌아가므로 선택 정렬과 이미 조회한 페이지를 유지한다. 로딩·오류 중에도 뒤로 가기를 사용할 수 있다. 다른 기사 진입은 새로운 읽기 수명으로 처리하며 이전 기사의 늦은 응답을 반영하지 않는다. OS 종료 후 복원이나 영속 저장은 포함하지 않았다.

이미지가 없는 기사는 이미지·캡션 영역을 만들지 않는다. 원격 이미지 URL 대신 기존 피드의 자체 SVG를 본문 크기로 재사용한다. 네트워크 이미지 다운로드·실패·캐시 처리는 이번 로컬 예시 범위에 없다.

## Medium 참고 범위와 적용

- 기준: [Story detail 분석 문서](<../medium/flows/Home/Story detail/ANALYSIS.md>), Medium iOS `medium-ios`, 카탈로그 `Latest`, version ID `1419`, flow ID `d34a6d85-ab07-4cb3-87d2-28db79260b80`.
- 원본: [Gummble flow](https://gummble.com/apps/medium-ios?tab=flows&flow=d34a6d85-ab07-4cb3-87d2-28db79260b80). 제품 빌드·캡처 시각은 미확인이다. 카탈로그 버전과 제품 빌드는 구분한다.
- 기존 MCP 조회 기록은 2026-11-18 KST다. 이번 Goal에서는 새 MCP 조회 없이 같은 날 로컬 PNG **3장**을 직접 열어 확인했다. 이전 R2 전체 200장 검토를 이번 Goal에서 새로 수행했다고 표현하지 않는다.
- 각 PNG는 1179×2556 px, 분석 문서의 MCP 메타데이터는 390×844다. 기기 배율·DPR은 확정하지 않았다.

| 참고 화면 | 직접 관찰한 내용 | Goal 4 반영 |
| --- | --- | --- |
| [02 — 상세 상단](<../medium/flows/Home/Story detail/screens/02_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>) · [원본 sc_332d5b0923e546fcbf6a8fc613cda6a4](https://gummble.com/screens/sc_332d5b0923e546fcbf6a8fc613cda6a4) | 뒤로 가기·경계선, 큰 제목·부제, 읽기 시간·날짜, 작성자, 대표 이미지·캡션 | 큰 제목과 보조 정보 위계, 출처·시각·자체 삽화, 고정 상단 뒤로 가기 |
| [03 — 본문](<../medium/flows/Home/Story detail/screens/03_sc_f4b06612bdbf48ecbd8a7b6e2607d117.png>) · [원본 sc_f4b06612bdbf48ecbd8a7b6e2607d117](https://gummble.com/screens/sc_f4b06612bdbf48ecbd8a7b6e2607d117) | 긴 문단·행간, 강조 표시, 상단·하단 도구 | 긴 한국어 본문과 문단 간격, 스크롤 읽기 |
| [04 — 말미](<../medium/flows/Home/Story detail/screens/04_sc_c3fcf42b84be4b7298dfc138c224e241.png>) · [원본 sc_c3fcf42b84be4b7298dfc138c224e241](https://gummble.com/screens/sc_c3fcf42b84be4b7298dfc138c224e241) | 마지막 문단, 토픽, 작성자 소개·팔로우 | 본문 끝 표시. 토픽·작성자 카드·팔로우는 이번 범위에서 제외 |

사실 요약/AI 해석 구획, 예시 안내, 로딩·실패·재시도는 우리 앱의 요구사항을 적용한 부분이다. Medium의 멤버 배지·듣기·더보기·박수·댓글·저장·공유·하이라이트·후속 추천은 구현하지 않았다. 설명 수준 전환은 Goal 5, 반응·저장은 이후 Goal 범위다. 원본에 존재하는 버튼과 실제 실행 결과를 동일하게 간주하지 않는다.

기본값은 좌우 여백 24, 제목 32/42, 부제 20/30, 본문 18/31, 구획 간격 32다. 본문 최대 폭은 680, 이미지 비율은 자체 SVG의 80:64를 유지한다. 본문과 제목은 줄 수·글자 확대를 제한하지 않는다. Safe Area와 48 이상 뒤로 가기·재시도 터치 영역을 적용했다. 수치는 Medium 코드에서 추출한 값이 아니며 원본의 영문 서체를 복제하지 않고 현재 플랫폼 기본 서체를 사용한다. 실제 줄바꿈·간격·글자 확대 비교는 미검증이다.

## fixture와 상태 재현

최신 4개·인기 3개·추천 3개의 모든 홈 ID에 대응하는 상세가 있다. 제목·출처·날짜·읽기 시간·이미지 유무는 홈 fixture에서 가져온다. 게시 시각 `09:00`은 고정 예시이며 실제 수집·발행 정책이 아니다. 다른 기사를 대신 반환하지 않으며 존재하지 않는 ID는 조회 실패로 처리한다.

[articlePreview.ts](../FE/src/features/article/data/articlePreview.ts)의 `articlePreviewScenario`를 수정하고 앱 전체 Reload 후 카드를 선택한다. 별도 개발자 메뉴·ENV·외부 연결은 없다. 실제 기기에서 실행한 기록은 아직 없으며 자동 테스트는 동일 공급부 또는 제어 가능한 응답을 사용했다.

| 시나리오 | 재현 의도 |
| --- | --- |
| `normal` | 약 250ms 로딩 후 선택한 기사 표시 |
| `initial-error` | 기사별 첫 요청 1회 실패 → 같은 기사 재시도 성공 |
| `slow` | 요청마다 약 10초 지연, 로딩 중 뒤로 가기 확인 |
| 이미지 없음 | 기본 최신 목록의 환율 기사. 삽화·캡션 없이 사실 요약부터 본문 읽기 |

실패 이력은 공급부 인스턴스의 메모리에만 있으며 전체 Reload로 초기화한다. 홈 실패 시나리오와는 별개다. 백엔드·Supabase·인증·RSS·AI는 연결하지 않았다.

## 테스트와 코드 검토

| 테스트 파일 | 설정당 건수 | 검증 |
| --- | --- | --- |
| [AppNavigator.test.tsx](../FE/src/app/navigation/AppNavigator.test.tsx) | 3 | 선택 ID와 상세 일치, 이미지 없는 상세, 홈 정렬·추가 페이지 유지, 로딩 중 복귀 후 다른 기사 진입, 모의 OS 뒤로 가기 |
| [ArticleDetailScreen.test.tsx](../FE/src/features/article/ArticleDetailScreen.test.tsx) | 9 | 로딩·메타데이터·구획·전체 본문, 이미지 없음, 실패·같은 ID 재시도, 이전 기사의 늦은 성공/실패, 공급부 교체, 동기 예외·잘못된 ID 거부, Strict Mode 정리 |
| [mockArticleSource.test.ts](../FE/src/features/article/data/mockArticleSource.test.ts) | 3 | 홈 전체 ID의 상세 완전성·일치, 알 수 없는 ID, 실패 후 복구 |
| [App.test.tsx](../FE/src/app/App.test.tsx) | 5 | 기존 4개 탭·선택 상태·재선택·모의 뒤로 가기·피드 선택 유지 회귀 |
| [HomeFeedScreen.test.tsx](../FE/src/features/feed/HomeFeedScreen.test.tsx) | 10 | 기존 피드 상태·정렬·페이지·응답 정리 검증 유지. 더 이상 존재하지 않는 상세 준비 중 안내 테스트만 실제 상세 이동 테스트로 대체 |
| [useFeed.test.ts](../FE/src/features/feed/useFeed.test.ts), [mockFeedSource.test.ts](../FE/src/features/feed/data/mockFeedSource.test.ts) | 4 | 중복 추가 요청 차단·끝 페이지·실패 후 복구 회귀 |

총 **34개 × iOS·Android = 68건 통과**. 실제 화면과 React Navigation은 mock하지 않았다. Safe Area 공식 mock과 jest-expo 네이티브 대체 환경을 사용했으며 추가 native-stack mock은 필요하지 않았다. 이는 JS 상태·행동 검증으로 실제 OS 제스처·픽셀 배치·스크롤 위치 검증을 대신하지 않는다.

코드 검토 내용과 반영:

- Main을 상세로 교체하면 홈 상태를 잃을 수 있으므로 루트 stack의 별도 경로로 상세를 연결했다. 정렬·추가 페이지·재조회 여부를 테스트했다. 기기의 실제 스크롤 좌표 복원은 별도 확인이 필요하다.
- 선택된 ID만 전달하고 상세가 같은 ID를 반환하는지 검사했다. 알 수 없는 ID나 불일치 응답에 다른 기사를 보여주지 않는다.
- 기사 변경·화면 정리·Strict Mode 재시작 후 늦은 응답을 차단한다. 공급부 교체 때 이전 데이터도 숨기며 동기 예외를 오류 화면으로 변환한다.
- 재시도 시 로딩 상태로 바꾸고 in-flight 가드로 중복 요청을 막는다. 대기 중 재시도 버튼을 표시하지 않는다.
- 기존 SVG와 상태 표시를 재사용해 피드·상세 간 중복을 줄였다. 기존 피드·하단 탭 회귀 테스트가 통과했다.
- 필수 선택 callback으로 기존 임시 Alert 연결을 제거했다. 테스트가 실제 카드 선택과 stack 이동을 검증하도록 보완했다.
- 변경 시작 시 Git 작업 트리는 깨끗했다. `medium/flows`·기존 참고 자료·백엔드·ENV는 변경하지 않았다.

이동 구조 참고: [React Navigation native-stack](https://reactnavigation.org/docs/native-stack-navigator/), [상세에서 탭 숨기기](https://reactnavigation.org/docs/hiding-tabbar-in-screens/), [navigator 테스트](https://reactnavigation.org/docs/testing/). 테스트 작성은 설치된 RNTL v14 지침의 비동기 render·사용자 이벤트를 따른다.

## 실행한 검증과 남은 문제

실행 위치: `D:\git_repository\kostolany_project\FE`, Windows PowerShell.

| 검증 | 결과 |
| --- | --- |
| `npm.cmd run typecheck` | 통과, strict·테스트 파일 포함 |
| `npm.cmd run lint` | 통과, `--max-warnings=0` |
| `npm.cmd test -- --selectProjects Android` | 7 suites, 34건 통과 |
| `npm.cmd test -- --selectProjects iOS` | 7 suites, 34건 통과 |
| `npx.cmd expo install --check` | `Dependencies are up to date` |
| `npm.cmd ls @react-navigation/native-stack react-native-screens --depth=0` | 7.21.1 / 4.26.2, exit 0 |
| `npm.cmd run export:android` | exit 0, 971 modules, 약 2.1MB Hermes 번들 |
| `npm.cmd run export:ios` | exit 0, 976 modules, 약 2.1MB Hermes 번들 |
| 정적 코드·문서 검토 | `git diff --check` 통과. 변경 파일 24개·문서 4개·상대 링크 65개 확인, 깨진 링크·문자 없음. 기존 패키지 버전 변경 없음. Medium·BE·ENV 변경 없음 |
| Android 기기 실행·원본 비교 | 미검증: PATH의 adb·emulator 및 기본 Android SDK 경로에서 실행 도구를 발견하지 못함 |
| iOS 기기 실행·원본 비교 | 미검증: 현재 Windows 환경에 macOS/Xcode·연결된 iOS 검증 환경 없음 |
| APK·AAB·IPA 빌드·설치·배포 | 미실행 |

번들 생성은 JS/Hermes 변환 검사이며 네이티브 앱 빌드나 기기 실행 결과가 아니다. 생성물은 Git 제외 경로 `dist/android`, `dist/ios`에 저장했다. 기존 색상 환경 변수 충돌 경고(`NO_COLOR`/`FORCE_COLOR`)는 있었으나 export 종료 코드는 0이었다. 전체 `expo-doctor`는 재실행하지 않았다.

의존성 검토: 새 직접 의존성은 native-stack 7.21.1 한 개이며 기존 패키지 버전은 바꾸지 않았다. 기존 native·screens·safe-area 버전이 해당 peer 범위를 충족함을 확인했다. lockfile에는 새 패키지와 npm이 갱신한 기존 `fsevents`의 dev 분류가 반영됐다.

`npm.cmd audit --package-lock-only --json`은 현재 **67건(높음 65·보통 2)**, 같은 세션에서 임시 폴더에 복사한 변경 전 HEAD package/lockfile은 **66건(높음 64·보통 2)**을 보고했다. 현재 결과에만 추가로 이름이 나타난 항목은 기존 `@testing-library/react-native` 14.1.0의 `via: jest` 높음 항목이었다. 해당 패키지 버전은 바뀌지 않았고 native-stack 자체의 audit 항목은 없었다. 응답별 취약 범위 계산도 달라 차이의 원인을 새 의존성으로 단정하지 않는다. 이 경고들은 해결되지 않았으며 `audit fix`나 관련 없는 SDK·테스트 도구 업그레이드는 실행하지 않았다. 이전 Goal의 보통 3건이라는 수치는 당시 기록이며 현재 상태를 나타내지 않는다.

Goal 4의 요청된 구현·테스트·코드 검토와 가능한 자동 검증은 완료했다. **공통 완료 조건의 실제 기기 실행과 긴 한국어 본문의 원본 비교는 아직 충족하지 못했다.** 작은 화면·OS 글자 확대·Safe Area·스크린리더·실제 스크롤 위치 복원·iOS 뒤로 가기 제스처는 기기가 준비되면 확인해야 한다.

Goal 5는 시작하지 않았다. 커밋·push·배포를 하지 않았으며 참고용 `medium/flows` 파일을 변경하지 않았다.

## 후속 요청 — PC 로컬 미리보기

2026-11-18 사용자가 PC 브라우저 확인을 요청해 `app.json`의 웹 플랫폼·Metro 설정과 `npm.cmd run web` 스크립트를 추가했다. Expo SDK 57에 맞춘 `react-dom` 19.2.3, `react-native-web` 0.21.4, `@expo/metro-runtime` 57.0.18을 고정했다. 서비스 대상은 계속 iOS·Android이며 개발용 로컬 확인 경로다.

- 접속: `http://localhost:8081`. 재실행은 FE에서 `npm.cmd run web`을 사용한다. 기존 ENV·백엔드는 필요 없다.
- Chrome의 390×844 뷰포트에서 홈→선택 기사→사실/해석 본문→스크롤→홈 복귀, 이미지 없는 기사 진입을 확인했다. 1365×900에서도 홈 화면을 확인했다.
- 브라우저 검사에서 SVG의 네이티브 전용 `accessible={false}`가 DOM으로 전달되는 경고를 발견했다. 탭 아이콘·삽화·뒤로 가기 SVG는 웹에서 해당 속성을 생략하고 `aria-hidden`을 유지한다. 수정 후 브라우저 콘솔 오류는 0건이었다.
- 수정 후 `npm.cmd run check`의 타입 검사·lint·iOS/Android 테스트 68건이 통과했다. `expo install --check`와 `git diff --check`도 통과했다. 미리보기 서버는 localhost의 8081 포트에서 실행했으며 자동으로 브라우저 창을 여는 요청은 도구 정책에 차단되어 접속 링크를 안내했다.
- 브라우저 캡처를 직접 확인했으나 모바일 네이티브 실행·원본 화면 일치 검증으로 기록하지 않는다. Goal 5·커밋·배포는 수행하지 않았다.
