# Parity 16~20 추가 재검토 — 2026-11-25

검토 기준은 `5113c7e..719405a`의 다섯 커밋과 시작 HEAD `719405a8b2be4394d0d3c74a943b756c881cd72f`다. 사용자의 재검토·결함 수정·로컬 커밋 요청에 따른 작업이며 push·배포·Parity21/22 시작은 포함하지 않는다. 아래 검증은 과거 결과와 구분한다.

## 범위와 적용 규칙

- AGENT/README, FRONT_AGENT의 README·ARCHITECTURE·CODE_CONVENTIONS·STATE_AND_DATA·MOBILE_UI_AND_PLATFORM·PERFORMANCE_AND_SECURITY·TESTING_AND_DELIVERY, 공통 QUALITY_AND_WORKFLOW와 UXUI 규칙을 적용했다.
- 다섯 커밋의 제품 코드·테스트 변경, 현재 provider/store/navigation 호출부, Parity16~20 결과와 실행 계획·비교 조건·자체 UI 정책을 재검토했다. 자기 검토이며 독립 리뷰어/하위 에이전트 검토가 아니다.
- 기존 미추적 `FE/modules/kostolany-app-icon/android/.gradle/`를 보존하고 커밋에서 제외한다. 시작 시 추적 파일의 미커밋 변경은 없었다. ENV와 medium 원본은 수정하지 않는다.
- 실행 환경은 Windows/PowerShell, Node 24.18.0이다. 커밋된 expo-splash-screen이 로컬 node_modules에 없어 기존 package-lock 기준 `npm.cmd ci --ignore-scripts --no-audit --no-fund`로 복원했다. package.json/lock 변경이나 새 의존성 추가는 없다.

| 묶음 | 검토한 기능·경계 | 이번 판정 |
| --- | --- | --- |
| 16 / V05·V28 | 알림 목적지·읽음·차단·계정·공급부 수명, Push/Digest/Email 선택과 실패 복구 | 같은 렌더 배치의 차단 확정/응답 완료 경합을 새로 재현해 수정 |
| 17 / V01~V04 | 홈 미읽음 점·빈 Featured, 검색/토픽의 개인 정책 실패, 공개 목록 메모/카드·이탈 시트 | 공통 차단 판정의 최신 snapshot 소비를 함께 보완하고 관련 회귀 검사 |
| 18 / D10·V33 | StartupBoundary 배치/이미지 준비, 웹 inert, 아이콘 기기 사실과 화면 안내 세대, 설정 연결 | 추가 제품 코드 결함 발견 없음; App 탭 테스트의 지연 타이머 제어 보완; splash 설정 등록 재확인, 실제 OS 적용 미검증 |
| 19 / V31 | 구매 응답과 확정 snapshot 일치, source A→B→A와 해제, 성공 배경 격리·Welcome 스크롤 | 추가 코드 결함 발견 없음; 기존 mock 정책·원본/native 잔여 유지 |
| 20 / V34 | 월/누적 조회 수명, null/0 구분, 그래프 포인터/키보드·날짜 메뉴 포커스 | 추가 코드 결함 발견 없음; 원본 집계/서체·배치/native 잔여 유지 |

## 원본·추적 대조 범위

목록 검사는 실제 `medium/flows`의 63 ANALYSIS·273 PNG 단계·고유 200 화면과 baseline의 200 S/63 F/273 T/263 U/72 C를 대조했다. 16~20 배정은 고유 35 S/281 R이며 14개 관련 ANALYSIS의 진입·종료·화면 관찰·미수록 항목을 중심으로 읽었다. 이 검사는 전체 200화면의 기능·현재 렌더 재검증이 아니다.

직접 다시 연 원본은 다음 8장이다. PNG는 모두 보관된 원본 파일을 열람했으며 crop·재저장·기기/DPR 역산을 하지 않았다. 35장 전체의 파일 SHA-256은 기준과 일치한다.

| 화면 | 이번 직접 확인 내용 |
| --- | --- |
| S068 | 팔로우/목록/박수 사건, Follow 독립 버튼·녹색선·날짜·복귀 |
| S040 | Top story/Editors Off, 나머지 토글·Tailored 선택형·잘린 하단 구분 |
| S014 | 목록 전체 Save와 개별 저장, 소유자/날짜/8 stories/108 saves, 목록 반응 바 |
| S043 | 검정 배경 중앙 Medium 워드마크, OS 영역과 앱 영역 구분 |
| S075 | 2열·8개 읽을 수 있는 아이콘 이름·선택 테두리·Friend 잠금·잘린 다음 행 |
| S084 | 처리 중 반투명 덮개·녹색 spinner·닫기 표시 |
| S133 | 성공 안내와 OK, OS alert 형식과 자체 mock 안내 차이 |
| S153 | Jun12 선택선/두 점, UTC 기간·11/2와 Reads/Views 범례 |

원본 경로와 R/T/U/C는 [comparisonBaseline.json](MEDIUM_PARITY/comparisonBaseline.json)의 각 S 항목으로 추적한다. 특히 이번 수정은 R-S068-C02·T-F06-02·C55의 mock 알림 접근 계약에 속한다. U-S068/U-F06의 원본 읽음 정책·원본 목적지/실패 동작은 여전히 미확인이다. 원본에 없는 응답/멘션 알림 fixture와 차단 실패 정책을 원본 관찰로 승격하지 않는다.

## 새 결함과 수정

**P2 — 확정된 차단이 다음 렌더 전에 알림 이동 검사에 반영되지 않음.**

1. A가 Notifications에서 Bérnie의 응답 알림을 누르고 응답 조회를 보류한다.
2. 기사 작성자 Jordan 차단이 store에 확정된다. 별도 사례는 A의 글 example-latest-rates에 달린 B의 응답에서 B 차단을 확정한다.
3. React의 다음 렌더 전에 같은 배치에서 응답 조회를 완료한다.
4. 수정 전에는 `latest.current.moderation.state`와 `blocked` closure가 이전 렌더의 허용 상태를 읽어 `onOpen`과 `markRead`를 호출했다. 실제 navigation 회귀에서 읽음 저장이 0회여야 하지만 1회 호출되는 실패를 확인했다. 목적지의 후속 차단 UI와 별개로 잘못된 이동/읽음 확정이다.

수정은 기존 store를 유지한 채 `NotificationsScreen.requirePrivacy`와 공통 `useArticleModeration`의 차단/음소거 판정이 호출 시점의 확정 snapshot을 읽게 하는 것이다. 새 저장소·의존성·새 정책은 없다. 발행 글의 owner ID는 기존 article catalog로 해석한다. 알림 계정/요청 세대·화면 이탈·공급부 교체 검사와 오류/재시도는 그대로 유지한다.

회귀는 기존 `NotificationNavigation.test.tsx`에 기사 작성자 차단·내 글의 응답 작성자 차단·타인 글의 응답 작성자 차단 세 경우를 추가했다. 마지막 경우는 기존 정책상 읽기를 허용하여 새 필터로 과도하게 숨기지 않는지 확인한다. 실제 SessionNavigation·provider·store를 사용하고 source의 Promise 완료 순서만 통제했다. navigation을 mock하지 않았다. 기존처럼 차단 뒤 렌더를 먼저 기다리는 테스트도 유지하여 두 실행 순서를 구분한다.

**테스트 보완 — 앱 탭 전환의 지연 갱신이 act 밖에서 실행됨.** 추가 조사에서 `App.test.tsx`의 `BottomTabView.tsx:192` 타이머 경고를 재현했다. 해당 테스트 묶음에 fake timer를 적용하고 테스트 종료 시 남은 타이머를 act 안에서 처리한 뒤 real timer로 복원했다. 기존 기대값·실제 App/navigation·테스트 수는 유지하고 경고를 숨기지 않는다. 제품 코드 변경과 구분하며, 전체 검사에서 나온 두 Provider 경고와 같은 원인이라고 단정하지 않는다.

## 이번 실행 결과

- 관련 최종 검사: iOS/Android 8 suites/80 tests 통과, 119.839초, 실패/skip/act 경고0. 알림·공개 목록·토픽 실제 navigation과 Home 피드 테스트를 포함한다.
- 최종 제품 코드의 전체 검사: iOS 161 suites/894 tests 통과, 728.366초; Android 161 suites/894 tests 통과, 731.159초. 합계 322 suites/1788 tests, 실패/skip0. Android act 경고0, iOS는 TopicProvider/DirectoryScope의 act 밖 갱신 경고 각각1건을 별도로 기록한다. 이 실행 뒤 제품 코드 수정은 없고 App 테스트의 시간 제어만 보완했다.
- 최종 테스트 보완 뒤 검사: App.test.tsx 양 플랫폼 2 suites/12 tests 통과, 28.864초, 실패/skip/act 경고0. 변경한 테스트 파일만 다시 검사했으며 전체 1788건을 다시 실행했다고 표현하지 않는다.
- 최종 타입/lint: `npm.cmd run typecheck`, `npm.cmd run lint` 모두 exit 0. App 테스트의 시간 제어 보완 뒤에도 다시 실행했다.

검사 작업 디렉터리는 `FE`다. 전체 Jest는 `node --expose-gc node_modules/jest/bin/jest.js --runInBand --logHeapUsage --json --selectProjects iOS`와 같은 명령의 `Android` 설정을 각각 실행한다. 관련 검사는 `--runTestsByPath`로 NotificationNavigation·PublicListsNavigation·TopicNavigation·HomeFeedScreen의 기존 테스트 파일을 지정했다. JSON은 stdout을 메모리에서 읽었으며 `--outputFile`이나 로그 파일은 사용하지 않았다.

- 수정 전 추가 회귀: iOS 1 실패(읽음 저장 1회), 9.891초. 이름 필터로 기존 14개는 실행 대상에서 제외한 진단이며 전체 검사가 아니다.
- 보완 회귀의 첫 확장 검사: 8 suites/78 tests 중 76 통과/2 실패, 125.227초. 타인 글의 응답 작성자 차단을 모든 응답 비노출로 기대한 테스트 오류였다. 기존 visibleResponses는 글 소유자의 차단일 때 해당 스레드를 숨긴다. 제품 정책을 바꾸지 않고 실제 소유 글의 B 응답 사례와 타인 글의 허용 사례로 분리했다.
- 첫 수정 후 알림 파일 전체: iOS/Android 2 suites/30 tests 통과, 54.498초. 이후 응답 작성자 경우를 추가했으므로 최종 검사는 위 최종 결과를 사용한다.
- 새 경합을 발견하기 전 진행하던 전체 검사는 코드 수정 전에 해당 Jest 프로세스를 중단했다. 중간 PASS들을 전체 통과로 집계하지 않는다.
- 전체 iOS의 두 Provider 경고 조사로 App·AuthBoundaryNavigation·MembershipNavigation·SettingsExtrasNavigation·StoryStatsNavigation 5 suites/27 tests를 실행해 모두 통과했다(53.684초). 두 Provider 경고는 재현되지 않았지만 App의 BottomTabView 타이머 경고1건은 재현되어 위처럼 보완했다. 최초 전체 출력은 경고의 컴포넌트명만 집계했으므로 두 Provider 경고의 발생 테스트/전체 stack은 확보하지 못했다. 이 한계와 비재현을 원인 해결로 간주하지 않는다.
- splash 플러그인 조사에서 extension 없는 package subpath와 CommonJS export 함수를 잘못 사용한 조사 오류 2회를 고쳤다. 실제 package exports의 `app.plugin.js`/default와 plain app.json으로 등록 검사를 통과했다. Expo57.0.33·splash57.0.12·SDK 범위~57.0.11, android6/ios4 mods 등록을 확인했다. mod 실행·prebuild·native 파일 생성/빌드 검사가 아니다.
- 타입/lint 최초 검사와 최종 제품 코드 수정 뒤 검사를 각각 실행했다. 과거 1782건 기록은 이번 최종 검사 결과를 대신하지 않는다.

## 실행 환경과 남은 항목

| 구분 | 현재 상태·담당·종료 조건 |
| --- | --- |
| 실제 브라우저 | 이번 환경에 브라우저 제어 도구가 없고 Document Control 연결 세션도 0이다. 시작 시 8081 listener도 없었다. 기존 차단된 Chrome 실행을 재시도/우회하지 않았고 이번 UI 조작·console·렌더 비교는 미실행이다. 허용된 브라우저 세션과 8081 실행 후 해당 흐름 확인 필요 |
| JS/Hermes 번들 | 이번 알림 접근 수정은 타입/lint·관련/전체 Jest로 검증했고 번들 export는 다시 실행하지 않았다. 과거 16~20의 번들 결과를 이번 결과로 합산하지 않는다 |
| native | Windows에서 adb/emulator/java/xcodebuild를 찾지 못했고 표준 Android SDK/Android Studio/Java 설치 경로도 없었다. iOS는 macOS/Xcode·기기 또는 Simulator, Android는 JDK/SDK·에뮬레이터 또는 기기·개발 빌드 필요. Jest 플랫폼 설정 통과는 실제 실행이 아님 |
| 자동 검사 경고 | 전체 iOS의 TopicProvider/DirectoryScope act 경고2건은 발생 테스트·원인 미확정이다. 묶음22 공통 navigation 검증에서 경고가 속한 테스트/stack을 메모리로 집계하고 재현·시간 제어·정리 계약을 확인할 때 닫는다. 과거16의 LikeNavigation 타이머 또는 기존 AuthBoundary 경고와 같은 원인이라고 단정하지 않음 |
| 원본/자산/시각 | 16의 아바타/읽음 정책,17의 캐러셀·독립 snapshot/미수록 글,18의 원본 서체/아이콘·cold start,19의 연간 가격/OS 구매 UI,20의 집계 차이/정확 배치는 각 기존 담당 유지. 이번 코드 검사로 완전 동일성 판정하지 않음 |
| 이전 묶음 | 9~15 및 그 이전의 구현·원본·환경·기기 잔여를 이전하거나 닫지 않음 |
| 21·22 | 실제 기기 검증과 전수 종료 판정은 사용자 후속 요청 대기. 이번 리뷰/커밋은 전체 Parity 완료 승인이 아님 |
| 외부 서비스 | 실제 알림 발송·결제·analytics·OAuth·백엔드 등은 기존 제외 범위 유지 |

## 허용된 브라우저 환경에서 후속 확인할 순서

1. 8081 기본 URL → A 로그인 → Notifications → Follow와 행 이동을 별도 확인하고 작가/목록/기사/응답에서 원래 목록으로 돌아온다.
2. 테스트와 같은 mock 응답 보류 중 기사 작성자 또는 내 글의 응답 작성자 차단을 확정한 직후 조회를 완료한다. 알림 유지·읽지 않음·재시도 안내를 확인한다. 타인 글의 응답은 기존 읽기 허용 정책도 확인한다. 차단 해제 후 Retry로 정상 진입을 확인하고 임시 주입은 복원한다.
3. Home/Explore/Topic/공개 목록에서 차단된 카드와 메모의 비노출, 정책 조회 실패·재시도·이탈 시트 폐기를 확인한다.
4. Settings의 Push/Digest 선택 취소·저장, 앱 시작 종료와 아이콘 잠금/선택, 멤버십 처리 중 취소·성공 OK/Welcome, 통계 월/날짜·뒤로 복귀를 확인한다.
5. A→B→A, 작은 폭·큰 글자·키보드 포커스·모달 닫기·console을 확인한다. 이 절차는 이번 실제 브라우저 통과 기록이 아니다.

## 재검토와 보존

수정 후 diff와 세 회귀 기대값, 공통 moderation 소비자·화면 수명, 요구/미확인 상태 및 결과 문서를 다시 대조했다. 이 과정에서 타인 글의 응답 차단에 대한 잘못된 테스트 기대·App 테스트의 시간 제어·결과 문서의 줄바꿈 표기를 고쳤다. 이번에 재현한 알림 경합 외에 추가 제품 코드 결함은 발견하지 않았다. 실제 브라우저/기기 미검증과 원인 미확정 경고 때문에 모든 잔여가 없다고 판정하지 않는다.

기존 requirements/관찰·evidence/readiness는 보존하고 추가 재검토 링크와 존재 입력의 현재 해시만 갱신했다. 과거 manualUpdate는 history에 보존했다. 최종 문서 검사에서 추가 링크19개 깨짐0, 존재 입력/codeInputs의 해시 불일치0, 금지 경로 변경0을 확인했다. codeInputs557개·기존 삭제 입력4개를 유지하며 새 검토 metadata와 입력 해시를 제외한 기준 데이터가 시작 HEAD와 같음을 확인했다. `git diff --check`도 통과했다.

이번에 재현한 제품 결함과 앱 탭 테스트의 타이머 문제를 수정·재검증했으므로 해당 수정과 기록을 로컬 커밋한다. 원인 미확정 Provider 경고2건·브라우저/기기 미검증·각 묶음의 기존 잔여까지 해소됐다는 판정은 아니다. 제품 코드2개·테스트2개·관련 문서19개, 합계23파일이 이번 커밋 대상이다.

tools/evidence/별도 검증 스크립트·캡처·검증 로그·manifest를 생성하거나 복원하지 않는다. Jest JSON과 조사 출력은 프로세스 메모리에서 집계했고 결과는 이 TODO 문서에 기록한다. 기존 삭제 입력4개는 그대로 유지한다. 커밋은 이번 코드·테스트·검토 문서만 포함하고 기존 `.gradle`은 제외한다. push·배포·21/22 실행은 하지 않는다.
