# Goal 21 — 전체 클론 화면·UX 통합 대조

> Goal53 후속 링크 점검: 이 문서의 과거 경로 중 실제 파일이 없는 20곳은 링크 대신 당시 경로와 보관 상태를 표시했다. 과거 검사 결과·캡처를 재실행하거나 복구한 것이 아니다. 삭제된 `evidence/` 자료는 이 작업 트리에 없으며 역사적 결과의 보관 한계로 남긴다.


2026-11-19 · Goal14→21 연속 실행의 마지막 단계. **목표 화면 구현과 두 차례 검토·검증을 수행했으며, 100% 시각 일치와 실제 네이티브 실행/빌드 확인은 완료되지 않았다.** 원본에 없는 동작·자산·플랫폼 확인을 완료로 꾸미지 않는다. Goal22나 외부 연동은 시작하지 않는다.

## Goal별 결과와 Git

| Goal | 실행 결과 | 검토·증거 |
| --- | --- | --- |
| 14 | 전체 규칙 검토, 공급부 교체 시 이전 피드 노출·검색 카드 배치·주석/계약/미사용 코드 수정, 재검토 후 로컬 커밋 | [14 결과](FE_GOAL_14_RESULT.md), 당시614 tests·JS/Hermes·브라우저 |
| 15 | 원본 대응표, 공통 토큰/아이콘/48pt 버튼/미연결 안내/탭·Safe Area 기준 | [15 결과](FE_GOAL_15_RESULT.md) |
| 16 | Home·For you/Following/Featured·Explore·Search와 원본 카드/사진 | [16 결과](FE_GOAL_16_RESULT.md) |
| 17 | 기사·반응 바·원본에 보이는 본문/응답/추천·Save to, 자체 읽기 도구 유지 | [17 결과](FE_GOAL_17_RESULT.md) |
| 18 | Library·기본/사용자 목록·생성/편집/삭제/제거/Undo·목록 설명/private 표시 | [18 결과](FE_GOAL_18_RESULT.md) |
| 19 | 로그인 소개/공급자·가입 UI·mock A/B/실패/취소/재시도·Sign out 확인 | [19 결과](FE_GOAL_19_RESULT.md) |
| 20 | Profile Stories/Lists/About·편집 폼·Settings·개인 목록/기사 복귀·기본 수준 연결 | [20 결과](FE_GOAL_20_RESULT.md) |
| 21 | 위 화면들의 최종 원본 대조, 터치 영역·응답 타이포·메뉴 누락 수정, 통합/회귀/플랫폼 검증과 문서 정리 | 이 문서 및 최종 비교 (저장소 보관본 없음: `evidence/goal21/COMPARISON.html`) |

Goal21 종료 당시 유일한 작업 커밋은 `d016c066c188c58a84a4bc0e438164dfe6b88cc4` (`fix(fe): audit frontend rules and isolate feed request state`)다. 당시 Goal15~21은 미커밋·미스테이징이었으며 push/배포하지 않았다. 시작 당시 작업 트리는 clean이었고 기존 사용자 삭제/과거 이력을 복구하거나 임의 커밋하지 않았다. `medium` 원본 파일은 수정하지 않았다. 기존8081 Expo 프로세스 PID42833을 재시작하지 않고 유지했다.

후속 사용자 요청으로 Goal15~21 변경과 검증 증거를 `feat(fe): implement Medium reference UI for goals 15-21` 로컬 커밋으로 함께 보관한다. 위의 미커밋 상태와 final-state.json은 Goal21 종료 시점의 검증 기록이며 이후 커밋 상태와 구분한다. 커밋 해시는 해당 제목의 Git 이력에서 확인한다. push·배포는 하지 않는다.

## 1차 통합 검토와 수정

원본 README·해당 ANALYSIS·PNG와 [전체 대응표](FE_MEDIUM_SCREEN_MAP.md), Goal14~20 결과, 현재 코드/캡처를 다시 대조했다. 이전 테스트 통과 기록으로 최종 코드를 대신하지 않았다.

| 재현·발견 | 원인·수정 | 검증 |
| --- | --- | --- |
| Profile Lists→기사 중 사용자 전환/목록 삭제의 새 진입 경계 | Profile origin에도 소유자·revision·목록 존재 검사를 적용한 소비자를 점검하고 실제 navigation 사용자 전환 및 삭제 단위 회귀를 보강 | ProfileNavigation·ArticleRouteScreen, integration.json |
| 320px Profile의 Stories45.25/Lists30.20/About38.81, Library Digest41.61 폭 | 글자 폭을 그대로 터치 폭으로 사용. 글자·밑줄은 내부에 유지하고 버튼은 최소48로 확장. 짧은 기사 토픽도 최소48 | 수정 전 (저장소 보관본 없음: `evidence/goal21/touch-target-before.json`), 수정 후 (저장소 보관본 없음: `evidence/goal21/touch-target-audit.json`) |
| Responses 글자가 원본보다 커서 같은 내용이 더 많은 줄을 차지함 | 본문14/18, 이름14/20·작은 정보12/18, 응답 간격·입력 시각 영역 조정 | 최종 Responses 실제 캡처 비교 |
| More from 추천 카드의 저장 모양 누락 | 로컬 미연결 안내를 여는 저장 아이콘 추가. 원문/기사 ID가 확보되지 않은 추천을 실제 저장 기능처럼 구현하지 않음 | 실제 캡처·전체 회귀 |
| 최종 비교 스크립트가 응답/추천 제목을 고정 헤더 뒤로 스크롤함 | 비교 스크립트의 정렬 좌표를 헤더 아래64로 수정. 제품 제목이 삭제된 문제와 구분 | screens17/browser.mjs·최종 캡처 |
| 저장 시트의 원본 선택/구현 미선택 비교 조건 불일치 | 최종 비교는 실제 `save-selected` 캡처를 연결 | comparison-manifest.json |
| 일부 신규 JSX/스타일이 한 줄로 압축되고 props가 인라인, 남은 미사용 스타일 | 의미 단위 여러 줄, 공개 컴포넌트 props 이름, 메뉴 boolean 이름, 불필요한 타입 단언/미사용 스타일 정리 | typecheck·lint·코드 재검토 |

원본 하단의 상/하단 툴바 노출 조건은 전체 인터랙션으로 확인되지 않았다. 정적인 PNG에서 스크롤 방향별 숨김 정책을 확정하지 않았다. 구현은 뒤로 가기/저장 접근을 유지하며 툴바가 남는다. 최종 캡처에서 제목을 가리지 않게 정렬했지만 원본과 같은 좌표라고 주장하지 않는다.

## 2차 재검토와 규칙 판정

- 아키텍처: app이 실제 navigation·provider를 조립하고 features는 ID/콜백으로 이동한다. shared가 features를 참조하거나 features가 app을 역참조한 import는119개 production 파일 검사에서0건이었다. 이는 순환/설계 전체 자동 증명이 아니라 직접 검토의 보조 자료다.
- 명명/타입/주석: strict 계약·named export·기능별 파일, 상태 의미를 드러내는 이름과 한글 설명 주석을 확인했다. 포매터는 임시 npm 실행 도구이며 프로젝트 의존성·lockfile을 변경하지 않았다. 정리 파일 (저장소 보관본 없음: `evidence/goal21/formatted-files.txt`), 규칙 보조 검사 (저장소 보관본 없음: `evidence/goal21/rule-audit.json`).
- 상태/비동기: 사용자 ID·기사 ID·목록 ID·인증 revision, 최신 의도/직렬 쓰기/삭제 tombstone, 공급부별 메모리 소유, 화면 초안 및 시트 키를 다시 확인했다. 프로필 이름/설정 변경은 인증 revision을 바꾸지 않는다. 기존 실패·늦은 응답·A→B→A 테스트를 포함해 실행했다.
- 모바일/접근성: Safe Area와 최소48pt 터치, 선택 aria 속성, 폼 스크롤·모달 닫기·포커스를 확인했다. 320폭 여덟 화면의 보이는 대상에48미만 없음. 화면 전체의 모든 상태나 실제 OS 접근성 합격을 뜻하지 않는다.
- 성능/보안: 기존 목록 가상화/지연 검색/요청 세대 보호와 로컬 이미지 사용을 유지했다. 실제 인증/백엔드/Storage/AI·비밀정보·새 외부 서비스는 없다. 원본 사진45개 출처/영역이 유효하며 원본 PNG를 바꾸지 않았다: 자산 검사 (저장소 보관본 없음: `evidence/goal21/asset-audit.json`).
- 검증/전달: 아래 실행 로그·실제 브라우저·원본 캡처와 재검토를 연결했다. 두 번의 자체 코드/화면 검토를 독립된 외부 리뷰나 테스트 실행 자체와 혼동하지 않는다. 최종 미확인 항목은 별도로 남긴다.

## 최종 실행 결과

- Node24.10.0 / npm11.6.0 사용. engines24계열을 충족하지만 `.nvmrc`24.18.0·packageManager npm10.9.0과 patch/도구 버전 차이는 있다.
- typecheck·lint 통과: typecheck (저장소 보관본 없음: `evidence/goal21/typecheck.log`), lint (저장소 보관본 없음: `evidence/goal21/lint.log`).
- 전체 Jest 최종 **638 tests,84 suites 통과**,282.752s: tests-full.log (저장소 보관본 없음: `evidence/goal21/tests-full.log`). 두 플랫폼 설정의 합계이며 논리319개다. 시각/터치 수정 전638 tests/84 suites 통과 기록은 별도 보존 (저장소 보관본 없음: `evidence/goal21/tests-before-visual-fixes.log`)하며 최종 실행 결과와 구분한다.
- iOS·Android JS/Hermes export: iOS (저장소 보관본 없음: `evidence/goal21/export-ios.log`), Android (저장소 보관본 없음: `evidence/goal21/export-android.log`). 각각약2.4MB hbc와 로컬 자산 생성. Xcode/Gradle로 만든 native앱·실기기 실행이 아니다.
- 최종 화면군 브라우저 재실행: 실행 목록 (저장소 보관본 없음: `evidence/goal21/recapture-runs.json`), 각 screens16~20/browser.json. 기존 성공 기록을 복사한 것이 아니라 새 Chrome 세션에서 최신 코드를 조작/캡처했다.
- 한 세션 전체 흐름: integration.json (저장소 보관본 없음: `evidence/goal21/integration.json`). 비로그인 읽기/수준/복귀→로그인 닫기/성공/자동 행동 없음→반응→저장 시트에서 목록 생성→두 목록 소속→하나에서 제거/삭제→원본/기본 소속/반응 보존→프로필→설정→홈/검색/라이브러리의 기본 수준·본문·예시 일치→임시 변경/재진입→로그아웃 취소→B→A→전체 Reload 초기화를 확인했다. console/page errors0.
- 성공/취소/실패/재시도·느린 로그인 닫기: 최종 screens19/browser.json. 프로필/설정 조회·저장 실패와 보존/재시도는 Goal20 failures.json에서 확인했다. 전체 Jest는 데이터 변경/경합 회귀를 포함한다.
- 접근성/입력 (저장소 보관본 없음: `evidence/goal21/accessibility.json`): 320폭·CSS150%·긴 한국어/이모지/다중행, 합성 composition 검색, Escape로 프로필/설정/목록 폼/메뉴 닫기, 웹 포커스 복귀 통과. 첫 Escape 재현 스크립트는 Modal의 열림 애니메이션 전 완료를 가정했으며 실제 dialog 활성화를 기다리도록 수정했다. 실제 OS 키보드·IME 테스트는 아니다.
- Featured 빈 상태를 별도로 캡처하고 empty.json (저장소 보관본 없음: `evidence/goal21/empty.json`)에 복구를 기록했다. 모든 장애용 PreviewScenario 상수를 normal로 복원했다. 마지막 상태 확인 (저장소 보관본 없음: `evidence/goal21/final-state.json`)에서 HTTP8081=200·기존 PID42833·원본 변경0·스테이징0을 확인했다.

## 화면·흐름별 상태

| 대상 | 진입·주요 행동·복귀 | 로딩/빈 상태/실패 | 최종 원본 대조 |
| --- | --- | --- | --- |
| Home | For you/Following/Featured, 추가 목록·기사·뒤로 | 기존 feed 오류/추가 페이지/세대 테스트, Following/Featured 빈 상태 | screens16 Home/Featured/Featured empty |
| Explore/Search | 검색 진입/주제/입력/지우기/결과·기사·검색어 유지 | 지연 검색·0건·조회 오류/응답 역전 테스트 | screens16 Explore/Topics/Search/Staff Picks/Who to follow |
| Article | 제목/커버/원본 발췌/반응·저장·원래 탭/목록 | article ID/공급부·설명 수준 로딩/실패/재시도, 공유 상태 | screens17 Article/Responses/More from/Save selected |
| Library/Lists | 생성·편집·취소·삭제 확인/취소·기사·복귀·제거/Undo | 빈 목록·읽기/쓰기 오류·재시도·중복/최신 의도/삭제 중 응답 | screens18 9쌍 및 실제 관리 흐름 |
| Sign in/out | 소개·공급자·mock A/B·닫기/성공/취소·Sign out | 실패/재시도/느린 응답·중복/세션 보호 | screens19 3쌍, Settings 배경은 screens20 |
| Profile | Stories/Lists/About·편집/저장/취소·개인 목록 복귀 | 조회/저장 오류·입력 보존·늦은 응답·사용자 격리 | screens20 Profile/About/Edit empty/filled |
| Settings | 프로필 편집·기본 수준·Sign out·복귀 | 조회/저장 오류·선택 보존·늦은 응답·B/A | screens20 Settings/bottom/logout + 자체 Reading tools |

## 원본과 남은 차이

최종31쌍 비교 인덱스 (저장소 보관본 없음: `evidence/goal21/COMPARISON.html`) · 원본/구현 파일 대응 (저장소 보관본 없음: `evidence/goal21/comparison-manifest.json`) · [관찰/추정/자체/미연결 대응표](FE_MEDIUM_SCREEN_MAP.md). 원본1179×2556을 비교용393×852로 정규화하고 OS 상단59/하단34를 제외한다. 실제 브라우저393×759와 비교하며 실제 DPR/기기 동일 조건을 확정하지 않는다. 스크롤 위치·사용자 데이터가 다른 쌍은 아래 한계와 함께 해석한다.

- 원본에서 관찰: 영어 문구·페이지 구성·사진·카드 위계·선택 모양·Profile/Settings 메뉴·입력 카운터·로그아웃 확인.
- 추정/대체: 시스템 sans/Georgia·Times 계열, 측정한 여백/행간, 자체 SVG 윤곽. 원본 폰트/아이콘 파일·정확한 애니메이션은 확보되지 않았다. 자간/굵기/줄바꿈·작은 아이콘은 다르며100% 일치로 판정하지 않는다.
- 남은 시각 차이: 원본과 다른 OS 글꼴 렌더, 일부 헤더/행/폼/빈 상태 높이, 홈의 주제 탭 fixture 순서·알림 표시,48pt 터치 영역, 입력 포커스 윤곽선과 native시트/키보드, 기사 하단 툴바 유지. 추천/응답 화면은 제목이 보이도록 헤더 아래에서 정렬했다. Source 로그인 brand/Google 등 아이콘은 공식 벡터 원본과 동일하다고 검증되지 않았다.
- 상태가 다른 비교: 기본 Reading list 초기 기사는0개이며 원본의3개 이미지를 임의 사용자 데이터로 초기 저장하지 않는다. 비교 중 실제 저장한 기사·A 이름·소개·목록명/내용·private 값과 원본 Alex Smith/목록이 다를 수 있다. 프로필 edit-filled의 원본 사진/대명사는 기능 제외라 빈 상태를 유지한다. Settings 하단 자체 도구/스크롤 위치와 mock 로그아웃 제어도 차이다.
- 자체 동작: 4단계 설명·기본 수준,1회 반응, mock Google/A/B·실패 선택, 입력 NFC/code-point/공백/중복 정책, 최신 의도·실패 복구. Medium에서 확인한 서비스 동작이 아니다.
- 미연결 범위: 실제 Google·다른 공급자/이메일·백엔드·RSS·AI·사진/대명사·About Page 편집·실제 팔로우/글쓰기/댓글/공유/다운로드·추천 제어·공개 목록/권한·결제/알림/테마/아이콘. 원본 메뉴는 로컬 미연결 안내를 연다.
- 원본 미수록: 전체 기사 본문·후속 추천 원문·이름 수정 폼/실패 동작·Google 완료/계정 선택. 보이지 않는 내용을 원본처럼 창작하지 않고 미수록 표시/자체 구현을 구분한다.

## 플랫폼 미검증

환경 실측 (저장소 보관본 없음: `evidence/goal21/platform-environment.json`): macOS14.2 arm64, CommandLineTools만 존재. Xcode/xcodebuild/Simulator·simctl 없음. Android SDK/adb/emulator 없음. Java만으로 앱 빌드를 완료할 수 없다. iOS는 Xcode+런타임/시뮬레이터 또는 기기, Android는 SDK/build tools/에뮬레이터 또는 기기가 필요하다. 설치/프로젝트 native 생성 없이 독립적으로 가능한 양 플랫폼 JS/Hermes export까지 수행했다.

**실제 iOS/Android 실행·native build, 실제 Safe Area/상태바·OS 글자 확대·VoiceOver/TalkBack·키보드 가림/한글 IME/뒤로 제스처는 검증 대기다.** Jest의 두 플랫폼 설정·브라우저 CSS 확대·합성 이벤트·Hermes export를 실제 native 검증으로 바꾸어 기록하지 않는다.

## 8081 최종 확인 순서

1. http://localhost:8081 전체 새로고침. Home의 For you/Featured/Following와 Explore→검색 `Mindfulness` 또는 `ChatGPT Is Poisoning`→기사→뒤로를 확인한다.
2. 비로그인 기사에서 박수/북마크→로그인 화면. 닫기 또는 아래 mock 결과에서 사용자 취소/실패→Google (모의)·재시도를 확인한다. 성공해도 원래 반응/저장은 자동 실행하지 않으므로 다시 누른다.
3. 기사 저장 아이콘→Save to→Create new list→이름/설명→Create→Reading list와 새 목록 선택→Done. Library에서 두 소속을 확인하고 목록→동일 기사→뒤로를 확인한다.
4. 목록 더보기→Edit list info→이름 수정, 기사 더보기→Remove from list/Undo, 목록 Delete list→취소/확인. 다른 목록 소속과 원본 기사·반응은 유지된다.
5. Profile→Edit your profile→이름/소개 저장 또는X/Cancel→About. Lists에서 읽기 목록/기사/복귀를 확인한다.
6. 설정 톱니→Edit profile 또는 아래 Reading tools→기본 설명 수준 저장. 홈·검색·라이브러리에서 기사에 새로 들어가 Story options→Open reading tools로 선택/본문/예시를 확인한다. 기사 안 임시 선택은 기본값을 바꾸지 않는다.
7. Settings→Sign out→취소, mock 결과 실패→Confirm→재시도. B로 로그인하면 B의 빈 목록/초기 이름/성인 기본값, 다시A로 로그인하면 A 데이터가 돌아온다. 전체 Reload는 인증/개인 데이터를 초기화한다.
8. 조회/저장 장애는 해당 `data/*Preview.ts`의 **export const 상수**만 read-error/save-error 등의 지원값으로 바꾸고 전체 Reload한다. 복구 확인 후 반드시 normal로 되돌린다. 타입 union의 문자열을 바꾸는 방법은 잘못된 재현이다.

이 결과는 로컬 mock FE 단계의 구현/검증 보고이며 실제 서비스 MVP·출시·100% Medium 일치 완료가 아니다. Goal22와 후속 개발은 시작하지 않는다.
