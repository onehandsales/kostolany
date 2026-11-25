# Medium Parity 묶음 17 — 홈·탐색·토픽·공개 목록

작성일: 2026-11-24 KST. 시작 HEAD `86cc148`, 작업 트리/staged 변경 없음. [실행 계획](MEDIUM_PARITY/EXECUTION_PLAN.md#batch-17)의 V01~04만 수행한다. 선행2·5·7·10과16의 결과/공유 코드, 원본 분석·PNG·R/T/U/C를 대조했다.9~15 잔여는 기존 담당 유지. 사용자 승인에 따라 검토·검증 조건을 충족한 뒤17만 로컬 커밋하고18로 진행한다.

| 판정 | 상태 |
| --- | --- |
| 기능 | 알림 점·빈 Featured New·차단 큐레이터/기사 메모·개인 정책 실패·화면 이탈 초안·메타데이터 보완 |
| 자동 검사 | 타입/lint·318 suites/1766 tests 통과. 실패/중단 이력 별도 기록 |
| 시각 |18개 원본 직접 열람, 실제8081 메모리 렌더 비교. 정확 서체/OS 영역/독립 snapshot 차이 유지 |
| native | 실제 실행/빌드 대기. 웹/Jest/메모리JS/Hermes와 구분 |

<a id="scope"></a>
## 화면·R/T/U/C

**18 S /139 R /31 T /33 U /21 C**. 표의 R 접두사는 해당 화면의 L/D/S·모든 C 항목 및 S069-V 전체를 의미한다. ID·원본 PNG·분석 경로와 과거 증거는 comparisonBaseline에 보존했다. Explore/Searching Medium·Topic detail/Browse curated list·Explore·Home·Switching to dark mode의6 ANALYSIS와 실제18 PNG를 직접 확인했다.

| 화면·R 접두사 | 배정 단계 | 현재 구현/검증과 원본 경계 |
| --- | --- | --- |
| S004 / R-S004-* | T-F02-02 | 빈 검색·토픽 행·뒤로. 카테고리 계층은 미확인. |
| S014 / R-S014-* | T-F04-04 | 전체 Save/개별 북마크·기사·목록 반응·공유·복귀. 8개 중 알려진5개만 공급. |
| S021 / R-S021-* | T-F01-02, T-F02-01 | 검색·토픽 가로 이동·Trending4개·작성 연결. 실제 인기 알고리즘 없음. |
| S026 / R-S026-* | T-F05-02, T-F16-01 | 추가 조회·제목 접힘·기사 복귀. −와 더보기 유지. |
| S053 / R-S053-* | T-F01-04 | Staff Picks 가로/Recommended 세로·기사 왕복. 잘린 Staff Pick은 미수록 안내. |
| S057 / R-S057-* | T-F03-02, T-F04-01 | Life7.1M/1.3M·Follow·공유·관련 토픽. |
| S061 / R-S061-* | T-F05-04 | Featured 채워진2개·북마크·더보기·알림 점. 원본 팔로우 전후 인과 미확인. |
| S069 / R-S069-* | T-F01-01, T-F05-01, T-F06-01, T-F08-01, T-F12-01, T-F41-01, T-F52-07, T-F53-13, T-F54-06, T-F55-01 | For you·New·+·하단4탭·Write·알림 진입. 알림 점을 mock 미읽음에 연결. |
| S070 / R-S070-* | T-F01-03, T-F03-01 | Health/Science/Business/Life 등 가로 칩; 원본 전체 순서/개인화 미확인. |
| S079 / R-S079-* | T-F01-05 | iris/Coinmonks 추천·별도 관계 상태·프로필 왕복. |
| S086 / R-S086-* | T-F62-03 | Dark 소비·작은 폭·원형−. 원본의 다른 기사는 테마 변경 결과로 생성하지 않음. |
| S091 / R-S091-* | T-F04-02 | Self Improvement10.6M/1M·Following; Life와 별도ID. |
| S098 / R-S098-* | T-F02-03 | Mindfulness·Stories/People/Publications/Topics/Lists·X·기사 복귀 시 검색어/선택/포커스. |
| S107 / R-S107-* | T-F04-03 | 미리보기와 전체 목록의 서로 다른 첫 기사 유지. 차단 큐레이터 미리보기 누락 수정. |
| S135 / R-S135-* | T-F04-05 | 고정 제목·말미2기사·More from Medium Staff·Follow·부유 반응. 미수록3개 안내는 자체 UI. |
| S174 / R-S174-* | T-F01-06 | Daily Dollar/Alex 가로 카드·Follow/Following; A/B 분리. |
| S176 / R-S176-* | T-F05-03 | 빈 Featured·New·View recommended publications. 메모리의 빈 fixture로 독립 재현. |
| S185 / R-S185-* | T-F62-04 | Dark Explore·검색/토픽/기사 소비. 원본의 다른 Trending 데이터는 독립 snapshot 잔여. |

원본1179×2556과 보관390×844 메타데이터, 이번320/393 CSS 폭·DSF1은 서로 다르다. 원본 촬영 시각·DPR·OS inset·계정을 동일 조건으로 확정하지 않는다. 원본 캡처 사이의 클릭/요청·집계 변경 인과를 추정하지 않았다.

<a id="contracts"></a>
## 계약·소유권·자체 정책

- C04/05: sort/source별 공개 feed 조회와 커서 수명. 같은 tick 중복 추가 조회는1회, 기사ID 중복 제거, 이전 sort/source 응답은 무시한다. 정렬을 바꾸면 새 목록·스크롤, 기사 뒤로 복귀는 기존 목록을 유지한다. 개인 정책 실패 시 공개 조회 hook은 유지하지만 카드와 열린 메뉴/시트 UI는 폐기한다.
- C04 알림 점: userId/auth revision/source별 NotificationStore의 미읽음 존재 여부다. 원본 녹색점의 실제 의미는 미확인. 조회 실패는 알림 화면의 재시도를 사용하며 숫자를 위조하지 않는다.
- Featured New: 비선택 또는 선택된 빈 결과에 표시하고, 선택된 채워진 결과에서는 숨기는 자체 mock 표시다. S176/S061의 서로 다른 상태를 반영한 것으로 Medium의 배지 소멸 이벤트·개인화 규칙을 확정한 것이 아니다. Featured는 기존 고정 fixture, Following은 관계 기반이며 빈/채워짐을 임의 Follow 이벤트의 결과로 만들지 않는다.
- C06/07: 검색어 정규화/debounce250ms·query/source/active 수명, A→B→A 요청 세대·늦은 응답 배제. 개인 정책 재조회 때 공개 검색 hook은 유지하고 결과 UI/포털은 제거한다. query/category 초안은 유지한다. 카탈로그 결과는 계정 범위/유형별 수명이다. 공개 검색은 Mute만으로 삭제하지 않고 Block은 제외한다. 추천은 Mute/Block/Show less를 소비한다.
- C08: Life/Self Improvement 별도 topicID와 관계 키. 토픽 공유는 기존13 mock 링크 계약. 미리보기는 목록 소유자 Block을 전체 목록과 동일하게 확인한다. 미리보기 Darius 첫 글과 전체 목록 Eve 첫 글은 각각 원본의 독립 순서이며 미수록3개를 만들지 않는다.
- C29/30: 목록 소유자/listID와 기사ID를 분리한다. 저장 수108/박수98은 기존 비교 baseline에 개인 변경을 더하는 mock 계약. 전체 목록 Save와 개별 북마크·목록 응답/박수와 기사 응답/박수는 별도 대상이다. 비공개/삭제/접근 철회는 저장 관계를 제거하고 늦은 성공으로 부활하지 않는다. 소유자 자기저장/자기팔로우/자기신고 제한 유지.
- 원본1 response는 개발 웹 `?parityResponses=reference-v1`의 명시적 비교 공급부에만 추가했다. 기본 목록은0에서 시작하고 실제 mock 응답을 합산한다. 비교 모드에서는 본문 미수록1건을 별도 집계하며 본문을 창작하지 않는다. 같은 ID의 article 응답과 혼합하지 않고 production/비교 비활성은0이다.
- 공개 목록 응답·저장·메뉴·박수 목록은 화면 이탈 시 닫는다. 확정 저장/반응은 공유 store에 남고 미제출 초안은 복원하지 않는다. 계정별 store와 auth revision·source 세대를 분리해 A/B·같은A 재로그인을 격리한다.
- C01/02/03: 기존 자산/서체/테마/48px 계약 소비. C09/36/53/58~61/65~67은 기사·다운로드·프로필·오디오·멤버십·설정으로의 기존 연결만 대조했다. C71 실제 OS 검증은21/Q07. 이들 묶음 전체의 새 구현/완료 판정은 아니다.

<a id="defects"></a>
## 발견한 결함·수정

| 재현·원인 | 수정·검증 |
| --- | --- |
| 미읽음이 있어도 Home bell에 점이 없음 | NotificationStore 조회/힌트/녹색점 연결. 읽음·A/B·A 복귀 real navigation 회귀 |
| 차단한 medium-staff의 목록은 전체 화면에서 차단되나 토픽 미리보기에는 남음 | 동일 소유자 Block 검사. 메뉴/목록명/See full list 비노출 회귀·실제 웹 확인 |
| Block 기사 카드는 스스로 숨지만 부모의 해당 메모는 남음 | 부모의 articleID 필터에 Block을 적용해 기사와 메모를 함께 제거. Darius 차단 회귀 |
| 공개 목록을 벗어나도 응답/저장/메뉴/박수 모달이 뒤로 복귀 시 남음 | active 전달·메뉴/박수 로컬 수명 분리. 실제 스택 기사 push/back 회귀. 모달 뒤 이벤트를 직접 발생시킨 제어 테스트이며 일반 포인터 조작과 구분 |
| 개인 정책 조회 실패/미확인 중 Home/Explore/Topic 내용 노출 | UI를 fail-closed 처리하고 재시도 제공. 공개 조회 캐시는 보존하고 카드/결과 UI·포털은 폐기. 기존 로그인 복귀 회귀와 새 cache/cursor/menu 회귀 |
| 첫 보완에서 display:none만 적용하면 이미 열린 포털 메뉴는 남음 | 브라우저에서 직접 재현. 조회 hook을 유지한 채 카드 결과를 반환하지 않도록 수정해 포털까지 unmount. 실패 후 재시도에서도 메뉴는 자동 재개하지 않음 |
| 선택된 빈 Featured에는 New가 없고 재선택하면 보완된 New도 사라짐 | 빈/채워진 결과를 구분하고 같은 정렬 재선택에서는 빈 상태를 유지. 기존 Home 테스트에 채워짐·빈 상태·재선택 단언 추가 |
| 읽기 시간 미확인인 공개 목록 기사에서 날짜 앞에 구분점만 남음 | 양수·날짜·Viewed의 유효 항목만 join. 임의 읽기 시간 생성 없음 |

## 두 차례 자기 검토

1차:18화면/31단계/139 R·호출부·관계/알림/검색/목록 store·기존 테스트를 대조했다. 알림 점, 차단 큐레이터/메모, 목록 초안 수명, 빈 Featured/집계 차이를 수정했다.

2차: 변경 diff와 실제 navigation·인증 복귀·공개 조회 수명·포털·source/account 영향을 재검토했다. 전체 검사3실패를 재현해 수정했고, 브라우저 포털 잔존을 추가 재현/수정했다. 독립 리뷰어나 하위 에이전트를 사용하지 않았으며 두 차례 모두 자기 검토다. 최종 검사/문서 대조 후 커밋한다.

<a id="verification"></a>
## 실제 검사·실패 이력

Node24.18.0(`fnm exec --using=24.18.0`), 기존 `--expose-gc --runInBand --logHeapUsage --selectProjects iOS|Android --json`. 출력은 메모리에서 집계한다. skip/기대값 약화/timeout 상향은 하지 않았다.

- 관련 최초3회귀에서 알림 점/차단 미리보기 누락을 재현했다. 공개 목록 테스트는 하단 탭 이동이 스택을 pop하는 기존 정책 때문에 기사 push/back으로 재현 경로를 바로잡았다.
- 초기 privacy 보완 뒤 관련4 suites/36 tests 중10실패: 정적 토픽 진입까지 가린 구현과 잘못된 fixture 제목/모호한 selector를 구분했다. 정적 진입 유지, 실제 fixture/정확 selector 사용 후 관련5 suites/46 tests 통과17.743초.
- 첫 전체 iOS:159 suites/882 tests 중879통과·3실패,225.885초,act0. AuthNavigation 검색 복귀, AuthBoundary 새 계정의 정책 대기, PublishedLibrarySession 메뉴. 단독3 suites/11 tests도8통과/3실패32.124초로 재현.
- 공개 feed/search hook을 지우던 보완을 수정하고 새 계정의 즉시 초안 부재 단언은 유지한 채 정책 완료만 findBy로 기다리도록 했다. AuthNavigation/AuthBoundary2 suites/10 tests31.578초 통과, PublishedLibrarySession/AuthBoundary2 suites/6 tests7.779초 통과.
- cache/cursor 유지 회귀 추가 후 관련5 suites/47 tests18.456초 통과. 이후 포털 잔존을 브라우저에서 발견해 진행 중이던 두 번째 전체 iOS를180.048초/39 suites 통과 시점에 SIGTERM으로 중단했다. 중단 실행을 전체 통과로 집계하지 않는다.
- 포털 수정 뒤 AuthNavigation/HomeFeed/PublishedLibrarySession3 suites/17 tests31.610초 통과,act0. Home 회귀는 열린 Story actions가 hidden 상태에도 남지 않는 것까지 확인한다.
- 포털 수정 후 전체 iOS159 suites/883 tests 통과228.618초(act0/실패0/skip0). 최종 diff에서 빈 Featured 재선택의 New 소실을 발견해1행 수정과 기존 테스트 단언을 보강했다. 그 뒤 전체 iOS 재실행 하나는 실행 출력 연결 복구를 위해 중단하고 새 실행으로 대체했다. 중단을 통과로 집계하지 않는다.
- 최종 typecheck/lint 통과. 최종 전체 iOS: 159 suites/883 tests 통과222.014초(act0/실패0/skip0). Android159 suites/883 tests 통과232.731초(act0/실패0/skip0). 메모리 JS web2,047,987·iOS2,368,793·Android2,369,487 bytes 구문 통과. iOS/Android Hermes exit0/각 unbound-global 경고35/오류0. 실제 native 빌드/실행 아님.
- 루트에서 npm typecheck를 잘못 실행한2회는 missing script로 종료했고 FE 경로에서 재실행했다. 자동 생성된 작업 외부 `~/.npm/_logs` 진단2개는 제거했다. 저장소 검증 로그/스크립트/manifest는 만들지 않았다.
- 과거16 Android act1의 비재현은 원인 해결로 취급하지 않는다. 이번 발생 여부는 최종 결과에 별도로 기록한다.

<a id="browser"></a>
## 실제8081·시각 비교

기존8081 PID22023 보존. Chrome158.0.8127.38 headless/CDP의 실제 UI를 조작했다. headless의 hidden 탭/RAF 및 메뉴 배경 중앙을 누르는 자동 조작 문제는 focus emulation·안전한 배경 좌표·렌더 후 측정으로 구분했다. CDP selector/대기 실패를 앱 오류나 검증 성공으로 기록하지 않는다. 캡처는 메모리로만 열람했다.

- Home 로그인 A, 정렬·추가 조회·헤더 접힘·기사 진입/복귀. 자동 클릭의 scrollIntoView가 이동시킨 위치와 복귀 위치를 구분했다. 검색 빈 토픽·Mindfulness·다섯 유형·X·기사 복귀에서 query/Stories/카드 포커스를 확인했다.
- Life Follow·Share, Self Improvement Follow·큐레이션→전체 목록→기사→목록→토픽→Explore. 목록 Save108→109→108과 개별 북마크 유지, 박수98→99, 실제 mock 응답0→1, 공유 닫기를 확인했다. 별도 명시적 비교 URL의 새 세션에서8 stories/108 saves/98 claps/1 response 렌더도 확인했다.
- iris/Daily Dollar Follow 후 작성자/publication 왕복, Staff Pick 기사 왕복. A의 Following2개가 B에서는 Follow이며 A 재로그인에서 복원됨을 확인했다. 회원가입 경로의 온보딩은 기존14 정책으로 구분해 닫고 계정 재검증은 Sign in으로 수행했다.
- source.read 일회성 실패를 주입해 Home 카드 비노출, 검색어 입력·재시도 후 긴 한국어 보존 확인. 열린 Story actions 상태에서도 실패 후 메뉴가 제거됨을 다시 확인했다. 원래 read 함수를 즉시 복원했다.
- 큐레이터 Block에서 전체 목록 불가→뒤로→토픽 미리보기 불가, Unblock 복구. 기본 source 정책의 UI 소비 검증이며 실제 서버 차단이 아니다.
- 빈 Featured는 feed hook의 메모리 결과를 빈 fixture로 바꿔 New/CTA를 따로 비교했다. 실제 Follow 하나가 빈 결과를 만들었다고 주장하지 않는다. 최종 reload로 fixture/개인 데이터/함수 주입을 초기화했다. 기본 URL과 주입 객체 부재·Home 렌더·console 오류0을 다시 확인했다.
- 320/393·Light/Dark·CSS 두 배·긴 한국어 검색, 스크롤·포커스·모달 닫기·DOM 선택 상태를 확인했다. 점검 화면의 document 가로 넘침0, viewport 내48px 미만 대상0. CSS 확대/합성 입력은 OS 글자 확대·IME·스크린리더 검증이 아니다.
- 원본의 S086/S185는 Light와 다른 데이터 snapshot이다. 현재 Dark는 같은 fixture의 테마를 변경하며 원본의 다른 콘텐츠를 테마의 부작용으로 만들지 않는다. 자체 모의 안내·미수록3개 안내·한글 일부 CTA·48px 영역·대체 서체·SVG·OS 영역 차이가 남는다. pixel parity 완료/readiness 승격 아님.

<a id="remaining"></a>
## 미확인·native·다음 묶음 경계

| 잔여 | 담당·영향·종료 조건 |
| --- | --- |
|33 U: 추천/인기 알고리즘·토픽 계층·검색 다른 유형/실패·Featured 인과/New·8개 전체 순서·집계/저장 알림 |17/V01~04. 현재 mock 계약만 검증. 해당 원본의 추가 관찰/순서/행동 자료 확보 후 재판정 |
| 원본 서체·정확 glyph/배치·잘린 자산·Dark 독립 콘텐츠 |17와Q02 자산 담당. 출처/자산/비교 조건 확보 및 동일 조건 실렌더 필요.18 기능 구현을 막지 않음 |
| 실제 iOS/Android 실행·Safe Area·터치·키보드·OS 접근성 |21/Q07+17 소비자. 현재 xcode-select는 CommandLineTools, simctl 미설치, adb/Android SDK 없음. 개발 빌드·Xcode/Simulator·SDK/실기기에서 실행 후 종료 |
| C09/36/53/58~61/65~67 및9~16 기존 잔여 |각 기존 담당. 이번 변경은 연결/소비 검증이며 전체 완료나 담당 이전 아님 |

18 인계: IconButton의 optional hint 추가 외 자산/아이콘/설정 계약 변경 없음. 실제 런처/splash는18·21. 알림 점의 미읽음 연계는16/17 mock 정책.18 시작 전에17 커밋/문서 확인.

<a id="manual-check"></a>
## 8081 최종 확인 순서

1. 새로고침→Home→Notifications에서 모의A 로그인. Home 알림 점·For you−·Featured 북마크·New를 구분한다.
2. For you 추가 조회→기사→홈 복귀. Featured→For you, +추천/알림/작성 및 하단 탭 연결을 확인한다.
3. Explore→가로 토픽/Trending/Staff Picks/Recommended/Who to follow. iris·Daily Dollar Follow→프로필/publication→Explore 복귀.
4. 검색 열기→빈 토픽→Mindfulness→다섯 탭→Stories 기사→검색 복귀→X→뒤로. query/선택/포커스 확인.
5. Life→Follow/공유 닫기→Self Improvement→Follow→See the full list. Save·개별 북마크·박수·응답·공유·기사와 뒤로 복귀.
6. 전체 Save 해제 후 개별 북마크 유지 확인. 목록 말미/고정 제목/원본 미수록 안내 확인.
7. Profile→로그아웃→Sign in으로 B→Explore 관계→A 재로그인. 계정별 관계/저장/응답 확인.
8. Settings Light/Dark·320/393 폭을 확인한다. 개발 웹의 `?parityResponses=reference-v1`은 별도 비교 fixture이며 기본 운영 집계가 아니다. 마지막 reload로 메모리 상태 초기화.

## 변경·수동 추적·금지 파일

HomeFeed/FeedSortTabs·SearchScreen·TopicScreen·PublicListScreen/StoryCard·IconButton·responsePreview와 해당 회귀/인증 경계 테스트만 제품 범위에서 변경한다. 결과·실행 계획·BACKLOG·요구/흐름/미확인/비교·현재 상태를 수동 갱신한다. comparisonBaseline의17 review/묶음 상태/존재하는 입력 해시만 갱신하고16 manualUpdate 원문을 history에 보존한다.554 codeInputs·삭제된4입력·원본/과거 evidence/readiness 유지. tools 생성기를 실행하지 않는다.

tools·evidence·캡처·검증 manifest·별도 검증 폴더 생성/수정 없음. 저장소 검증 로그 없음(위 npm 자동 진단2개 생성/제거 이력 제외). 외부 서비스/새 의존성/push/배포 없음. 결과와 최종 diff를 다시 대조한 후 로컬 커밋한다.

## 2026-11-25 추가 재검토

[Parity16~20 통합 재검토](FE_MEDIUM_PARITY_16_20_REVIEW.md)에서 현재 코드·검사·실행 환경을 다시 확인했다. 공통 차단 판정의 최신 snapshot 소비와 관련 회귀를 확인한다. 이 문서의 과거 브라우저·검사 기록은 보존하고 이번 결과로 재사용하지 않는다. 기존 구현 차이·원본 미확인·기기 잔여의 담당과 종료 조건은 유지한다. 로컬 커밋 이외의 push·배포·21/22는 이번 범위가 아니다.
