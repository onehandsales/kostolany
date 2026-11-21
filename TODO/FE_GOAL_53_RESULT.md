# Goal 53 — 63개 흐름 최종 대조·누락 해소·FE 계약 인계

**전수 대조·연결 수정·인계 자료 작성, 전체 동일 재현은 미완료.** 기능/자동 검사/원본 시각/native를 아래처럼 분리한다. 화면 표의 `부분 대조`를 완전 일치나 기능 전체 통과로 읽지 않는다. 미구현과 검증 대기는 별도다.

2026-11-21 KST. 시작 HEAD `1485ac40de0c6abb5bb3d3787ce0cd5c57bb4c61`(Goal52), 시작 작업 트리 clean. macOS14.2 arm64, `.nvmrc`와 맞춘 Node24.18.0, 기존8081 PID58453 보존. 기존 Goal42·43은 별도 승인된 `b11b004`이고 Goal44~52도 각각 커밋되어 있었다. 이번 변경은 Goal53 코드·테스트·문서이며 ENV/medium 원본을 변경하지 않았다. push·배포·Goal54/백엔드는 수행하지 않는다.

## 결과 집계와 판정 기준

| 단위 | 실제 수행 | 해석/잔여 |
| --- | --- | --- |
| 흐름 | F01~F63의63개를 실제8081 navigation으로 조작 | 흐름별 진입·선택·종료 증거를 별도로 기록. 동일 화면 재등장도 생략하지 않음 |
| 단계 |273개 단계 캡처·action 기록, 원본 대응 누락0 |273개 모두 native와 동등하다는 뜻은 아님. S043 시작 화면/S113 OS 사진 화면은 웹 대체이며 비동등 |
| 고유 화면 |200개 원본 직접 확인, 현재 캡처200개·sRGB 비교/overlay200개·화면별 판정200개 |198개는 차이 있는 부분 대조,2개는 native 원본과 비동등. 동일 재현 완료0개로 보수적 분류 |
| 컨트롤 |C01~C72의72개 묶음을 코드·동작·검사 근거와 대조 |72개 전체 무결함/동일 재현 통과가 아님. 미수록 메뉴·native·음성·Stories bar 등 아래 잔여 명시 |
| 브라우저 | 전체 흐름 촬영 및 별도 실패/경합4개 시나리오, 각 console/page error0 |source 대역은 실패/시계/자료만 주입. navigation 자체는 실제 앱 사용 |
| 자동 검사 |최종 실제 결과는 검증 절 참조 |이전 Goal 수치를 재사용하지 않음 |
| native | 현재 도구 재확인 및 JS export 구분 |iOS/Android 실제 빌드·설치·실행은 도구 부재로 검증 대기 |
| 인계 |[FE 계약](FE_MEDIUM_BACKEND_HANDOFF.md) |실제 공급부 입력/출력·null·ID·소유권·오류·시간·파일·이벤트. 서버/DDL 설계 확정 아님 |

## 발견한 문제와 수정

| 재현·기대/실제 | 원인·수정 | 검증/영향 |
| --- | --- | --- |
| F01 검색/Trending byline이 줄을 추가하고 카드 간격이 밀림 | 기본 크기 한 줄·큰 글자 줄바꿈 허용, 제목/요약과 썸네일의 행 구조 보정 | 실제 재촬영·검색/홈/프로필 사용처 검사; 전체 접근성 이름 유지 |
| F04 공개 목록 제목/설명/작성자·첫 기사 위치 차이 | 제목22/26·설명15/22·avatar40·여백/카드 폭/반응 바 조정 | F04 현재 캡처/공개 목록 navigation; 프로필 userId 기준 유지 |
| 작성자 Lists에 저장/더보기·공유 연결 누락 | 독립 SavePublicListControl/ActionMenu와 ShareSheet 추가, 부모 이동과 분리 | CommunityNavigation 저장→해제→Copy link→닫기→목록 이동; 누락 렌더를 회귀 실패로 발견 후 수정 |
| 본문 Responses의 policy 진입과 작성자 표시 누락 | shield 버튼→기존 ResponsesPanel policy, canonical 이름/아바타 재사용 | ResponsesNavigation 실제 경로와 F29~F36 재촬영 |
| 내 목록 하단 박수/응답이 안내만 표시 | owned user/list ID를 기존 Clap/Response 저장소에 연결 | ListEditingNavigation 비공개 소유자 반응·B 접근 차단; 목록/상세 상태 공유 |
| 기본 읽기 목록 반응 조회가 실패 | public projection이 기본 목록을 제외함. 강제 private 투영을 추가 | guest/B 조회·저장 불가, 소유자 박수/응답 가능, 기본 목록 공유 불가 회귀 |
| 공개 범위/삭제 확정 성공 안내 누락 및 삭제 알림에 탭이 겹침 | confirmed-only 안내·현재 세션 deletionNotice·2600ms 정리, header zIndex/좌표 보정 | createUserListStore 늦은 삭제/추가/수정·scope 테스트와 F47/F49 실제 캡처 |
| Following All의 종류별 분류·See all·verified 누락 | Writer/Publication/Topic 그룹·실제 개수·전용 필터 진입·badge 반영 | RecommendationsNavigation·F12/F13, 실제 관계 기준 상태 유지 |
| 발행 토픽/미리보기·이미지 준비·본문 subheading 표현 차이 | 확인된 토픽8개 순서, chip/행간, scroll 제목, Unlisted 공통 switch·disabled, 이미지 중앙 loading/X, 회색 subheading | Publishing/EditorImages 등 기존 회귀·F07~F11; subheading 연결은 자체 해석 명시 |
| 기사 메뉴 Follow가 pill 형태 | 기존 FollowControl에 메뉴 표현을 추가해 `Follow author` 행으로 표시 | 실패/재시도 테스트와 F24~F29 재촬영; 관계 상태/접근성 label 유지 |
| 원본 비교 green이 다르게 보여 잘못된 색상 수정 가능 | Generic RGB→sRGB 변환 과정 문제. 명시적 CoreGraphics sRGB 비교로 고침 | 작성 버튼 토큰 변경은 되돌림. 비교 파이프라인 문제를 앱 결함으로 세지 않음 |
| 전체 검사에서 BookmarkNavigation alert2개 | 기존 legacy 북마크 fixture는 기본 목록을 public catalog에 투영하지 않음. 목록 반응 baseline을 테스트 공급부에 명시 | alert 기대를 느슨하게 하지 않음. 실제 앱 기본 목록 반응은 별도 통합 회귀로 검증 |

## 상태·저장·취소 계약

- 사용자 ID·목록 ID·article ID를 유지한다. 프로필 이름/사진을 바꿔도 인증 revision이나 개인 저장소를 초기화하지 않는다. 프로필·관계·응답·목록의 기준 상태를 화면에 복제하지 않았다.
- 기본 읽기 목록의 canonical 공개 투영은 이름과 무관하게 private다. 소유자 반응을 위해 조회할 수 있지만 공개 목록/공유 가능 대상으로 바뀌지 않는다. 일반 비공개 목록도 소유자만 반응 내용을 볼 수 있다.
- 공개 범위 안내는 저장 확정 뒤 발생한다. 목록 삭제 안내는 현 세션 명령만 반영하고, 계정 변경 시 제거한다. 화면 취소와 이미 확정된 저장의 취소를 혼동하지 않는다.
- 저장·Follow·설정 등의 실패는 기존 입력/마지막 의도/재시도를 유지한다. 늦은 A 조회/실패가 B와 같은 A 재로그인 화면에 노출되지 않도록 기존 scope 계약을 유지했다.
- 원본 비교 fixture와 기능 fixture는 다르다. F63 정상은 현재 UTC 월과 실제 모의 발행0/0이다. 별도 비교 fixture만 June2025 월간11/2·글별Lifetime0/0을 주입하며, 이것을 정상 집계 공식이나 캐시 현상으로 설명하지 않는다.
- 앱 전체 새로고침/재실행은 메모리 데이터를 초기화한다. 같은 실행 내 A→B→A의 확정 데이터 유지와 다르다. 실제 OS 권한·launcher 상태는 설치 단위다.

## 1차 자기 검토

원본200장/63개 ANALYSIS와 현재 흐름·공통 카드/메뉴/발행·공개 목록·응답·소유권을 직접 대조했다. 독립 검토자가 수행한 검토가 아니다. 검사 실행과 별개로 코드의 저장/취소·public/private·source 수명 및 호출 사용처를 확인했다.

위 표의 목록 반응 안내, 작성자 Lists 저장/공유, 본문 응답 policy, 기본 목록 projection, confirmed 안내, 그룹/레이아웃 문제를 발견해 수정했다. 관련 navigation 회귀를 보완하고 수정 화면을 다시 촬영했다. 초기 lint의 effect 내 상태 초기화 문제는 stage 변경 렌더에서 처리하도록 수정했다. 촬영 도구의 label·cursor·스크롤/저장 완료 대기 오류도 별도로 수정했으며 제품 결함 수와 합치지 않았다.

## 2차 자기 재검토

수정된 diff·새 회귀·기존 소비자·최신 캡처를 다시 확인했다. private 기본 목록이 공개 검색/공유에 노출되지 않는지, 삭제된 목록의 늦은 성공이 부활/성공 알림을 재노출하지 않는지, ShareSheet의 현재 목록 접근권과 Follow의 공통 상태가 유지되는지를 재검토했다. 새로 찾은 BookmarkNavigation 공급부 불일치를 수정했고, 테스트의 alert 기대값을 줄이거나 timeout을 늘려 실패를 숨기지 않았다.

목록 삭제 알림 zIndex, 생성 완료 화면의 촬영 대기, 최신 Follow 메뉴, 응답의 답글 순서도 실제 화면으로 재확인했다. 통계 비교용11/2는 별도로 주입·복원하고 정상 F63을 보존했다. native·시각·작성 글 반응 bar 잔여를 이 재검토의 미완료 항목으로 분리했다. 실제 검토 결과이며 첫 검토 문구를 복사해 두 번으로 계산하지 않는다.

## 실행 명령과 실제 검사

작업 디렉터리 `FE`, 실행 PATH의 Node는 `/Users/jaegeunsong/.local/share/fnm/node-versions/v24.18.0/installation/bin`이다. 검사/촬영은 `caffeinate -i` 아래 실행했고 사용자가 덮개를 열어두기로 답했다. 시간 초과를 절전 때문이라고 단정하지 않는다.

- `npm run typecheck`, `npm run lint` — 최종 로그 `typecheck-final.log`, `lint-final.log`.
- `npm test -- --runInBand --json --outputFile=<외부>/jest-final.json` — 최종 결과는 아래 자동 삽입 값.
- 최초 전체:262 suites 중258 통과/4 실패,1430 tests 중1426 통과/4 실패,579.672초. BookmarkNavigation 두 플랫폼의 실제 fixture 불일치2건, Android ResponsesPanel/LikeNavigation 5초 timeout2건. 최초 실패를 최종 통과로 덮어쓰지 않고 `jest-review1.json`에 보존했다.
- 첫 재검사:6 suites/24 tests 중4 suites/22 tests 통과, Bookmark 두 플랫폼 실패. 나머지 timeout 두 건은 변경 없이 통과했다. 공급부를 기본값으로 바꾸는 것만으로 legacy 목록 계약을 해결할 수 없어 테스트 baseline을 명시한 뒤 최종 전체 검사를 실행했다.
- 중간 검사:8/48(36.097초),26/114(114.975초),14/70(76.25초),6/20(17.894초),8/48(22.992초),8/106(21.349초),6/38(12.894초). 각 시점 범위 검사이며 최종 전체 수와 더하지 않는다.
- 추가/수정 회귀: CommunityNavigation, ResponsesNavigation, ListEditingNavigation, ListManagementNavigation, BookmarkNavigation, PublishingNavigation, RecommendationsNavigation, FollowControl, createPublicListStore, createUserListStore. 저장·반응·기본 목록 private·scope·입력/메뉴 계약을 검증한다. Jest iOS/Android 두 설정은 네이티브 앱 실행이 아니다.

최종 코드 검사: **타입 검사·lint 통과, 전체 262 suites/1430 tests 통과(404.334초), 실패0, snapshots0**. `jest-final.json`과 `tests-final.log`가 현재 결과다. 기존262/1426 기록과 구분한다.

현재 web/iOS/Android JS export는 `export-final.log`에 기록하며 실제 네이티브 빌드·설치·실행으로 계산하지 않는다. `small-screen.json`의320×640·긴 한국어·Dark·CSS 글자1.5배·닫기4개 확인은 실제 OS IME/접근성 검증과 구분한다.


## 브라우저·화면 조건과 증거

외부 증거 루트 **`/var/folders/jg/zn9h2_f91nxfpwz9hzpkqcv80000gn/T/kostolany-goal53-3w02mpzj`**. 저장소에는 캡처·로그·비교 스크립트를 추가하지 않았다. 이 macOS 임시 경로는 시스템 정리/다른 기기에서 보존을 보장하지 않는다. 표의 파일은 이 루트 기준이며 `screens.json`에 원본 절대 경로·SHA256·반복 단계가 있다. `all-steps.json`273개에는 각 action/촬영 시각이 별도로 있다. 원본 파일은 변경하지 않았다.

- `browser-utils.cjs`와 `flows-01-04.cjs`부터 `flows-55-63.cjs`까지 실제 클릭·입력·뒤로를 실행. 이름 범위별 JSON의 errors는0이다. F05 빈 상태는 `flow-05-empty.cjs`의 명시적인 empty source fixture이며 Following 전환 결과라고 추정하지 않는다.
- 실패/경합 `faults.cjs/json`: 조회 실패→재시도, 저장 실패→초안 보존, A 조회→B→늦은 A 실패→A/같은 A 재로그인, 제출 A 저장→닫기/B→A 확정, 공개 목록→기사 중 접근 해제.4개 묶음/errors0. 주입 source는 finally에서 복원했다.
- 기본 조건: Chrome393×759/DPR1/Light, 별도F62 Dark. 원본1179×2556→393×852에서 상하59/34 시스템 영역을 제외한다. 원본 키보드·OS 시트와 웹 viewport는 동등하지 않다. 도구로 키보드를 그려 넣지 않았다.
- `compare-srgb.swift`는 원본/실제/50%overlay를 같은 sRGB로 배치한다. `compare-SNNN.png`200개, `review-atlas-01..50.png`는4쌍씩 직접 검토하기 위한 보조 자료다. overlay는 일치율이 아니다.
- F63 정상 캡처는 `F63-02-S188.png`, `F63-03-S153.png`, `F63-04-S150.png`. 기본 비교 표는 원본 조건 비교를 위해 `stats-reference-S188/S153/S150.png`를 사용하며 `pairs-functional.json`에 정상 대응을 보존했다. 이름/날짜/미집계·11/2는 비교용이고 실제 분석 데이터가 아니다.
- 재현: 기존8081 유지→Node24로 외부 각 `flows-*.cjs` 실행→`flow-05-empty.cjs`·`stats-reference.cjs`→`pairs.json` 대응 확인→외부 `compare-srgb <증거 루트>`·`review-atlas <증거 루트>`. 스크립트는 외부 Playwright 경로를 참조하므로 다른 기기에서는 Playwright/Chrome과 실제 원본 경로를 먼저 맞춰야 한다.

## 플랫폼과 남은 차이

| 구분 | 구현/검사 | 미구현·미검증·영향 |
| --- | --- | --- |
| 웹 | 실제 UI/계정/실패·Dark·목록/작성·파일 선택 | 웹 파일 선택/합성 selection은 실제 OS picker/IME가 아님 |
| iOS | native 어댑터 코드·Jest iOS 설정·JS/Hermes export | `xcode-select -p`는 CLT, Xcode.app 없음, xcodebuild exit1/simctl exit72. 실제 build/install/run·권한·사진·공유·아이콘·Dynamic Type/VoiceOver 미검증 |
| Android | native 어댑터 코드·Jest Android 설정·JS/Hermes export | JDK23.0.1은 있으나 SDK/adb/emulator 없음. 실제 Gradle build/install/run·권한·사진·공유·아이콘·TalkBack 미검증 |
| 생성 프로젝트 | Goal52 외부 prebuild 성공은 당시 생성 결과 | 이번 native 실행 결과로 재사용하지 않음. 실제 새 binary와 기기 검증 필요 |
| S043/S113 | 현재 웹 진입/파일 선택 대응 캡처 | 원본 native 브랜드 시작/OS Photos와 비동등. Medium 브랜드 splash를 구현했다고 표시하지 않음 |
| 내 Stories | 작성→발행→Public/Unlisted→작성 문서 상세·통계 연결 | 원본 행의 박수/응답/저장/더보기 bar와 현재 작성 글 카드는 미동등. fixture 기사와 작성 문서의 반응/저장 도메인 통합은 미구현이며 전체 기능 클론 완료가 아님 |
| 목록 Reorder | 선택·확정·취소·순서 보존, 접근 가능한 위/아래 조작 | 원본 inline native drag와 현재 modal 구조 차이, native drag 미동등 |
| 원본 자산/문구 | 확인한 자산·제목/서체 크기·여백 보정 | 원본 font/vector·native blur/시트·아바타/사진/일부 fixture 내용 차이. 공개 목록 미수록3기사 등을 추측 생성하지 않음 |
| 정책 안내 | 응답 policy와 허용 공식 링크 | 원본 Medium Rules 전문/기사 화면은 local 발췌 안내와 다름 |
| 오디오/다운로드 | silent mock timer·음성 선택·메모리 다운로드 | 실제 TTS/음원/AirPlay/background playback·영속 offline 미연결 |
| 서비스 | mock 인증·발행·통계·알림·구매 | 실제 OAuth/API/DB/Storage/Push/Email/분석 수집/결제 미연결, 이번 범위 밖 |

그 외 화면별 차이는200개 판정 표를 따른다. 비교되지 않은 펼친 메뉴/Email/Tailored/월/정렬 선택과 자체 보완은 공식 Medium 동작으로 확정하지 않는다. 필수 native 검증과 위 시각/기능 차이가 남아 **Goal53 전체 클론 완료나 출시 가능 판정은 하지 않는다.** 검증 환경: Xcode+Simulator/실기기, Android SDK+에뮬레이터/실기기 및 새 development build가 필요하다.

## 8081 최종 확인 순서

1. 새로고침으로 정상 mock 초기화→Home For you/Following/Featured→Explore/검색 다섯 유형→기사→뒤로. 이전 검색/탭 맥락을 확인한다.
2. 프로필에서 Google 모의 로그인 A→필요하면 온보딩 닫기→기사 박수/응답/인용/highlight→응답 policy→작성자 Follow/Lists→목록 저장/공유 Copy link→복귀.
3. 기사 Save to→새 목록/기본 읽기 목록 동시 저장→Library→목록 박수/응답→메모/편집/순서/비공개 확인→성공 안내→기사 제거/Undo→목록 삭제→Library 안내. 다른 목록/원본 기사는 유지된다.
4. Library Digest→날짜 Done→설정 Frequency/Push/Email→복귀. 홈 알림→대상/Follow→설정의 동일 수신값 확인.
5. Write→제목/본문/서식/멘션/검증용 사진→Drafts 재개→Next→Topics/Publication/Unlisted→Publish now→내 Stories→작성 글/통계. 현재 기본 통계는0/0이다.
6. 프로필 이름/소개/사진/대명사 변경→취소/Save→기본 설명 수준→기사 재진입. 프로필 이름 변경이 저장/박수/발행 자료를 지우지 않는지 본다.
7. 기사 Listen→미니/확장/play/pause/속도/음성/메뉴→원문. 소리 없는 모의 재생임을 확인한다. 공유/Save image는 웹 다운로드와 native 앨범을 구분한다.
8. 설정 모의 Member/Friend·앱 아이콘 지원 안내·Dark/Light·외부 링크 취소/복귀→로그아웃 취소/확정→B→A. A 확정값 유지와 계정 초안/오류 격리를 확인한 뒤 전체 새로고침의 메모리 초기화를 구분한다.

실패/늦은 응답은 일반 UI로 만들 수 없는 경우 외부 `faults.cjs`를 사용한다. 제품 preview 기본값을 수정하지 않는다.

## 63개 흐름·273단계 대응

각 행은 실제 조작/캡처 기록 수이며 전체 동일 재현 통과 수가 아니다. 공통 캡처 조건과 미동등 경계는 위 절을 따른다. 전체 단계별 원본 ID/action은 `all-steps.json`을 참조한다.

| 흐름 | 원본 경로( medium/flows 기준 ) | 캡처/원본 단계 | 증거·판정 |
| --- | --- | --- | --- |
| F01 | Explore | 6/6 | `F01-01-S069.png`~`F01-06-S174.png` · 실제 UI 조작·차이 잔여 |
| F02 | Explore/Searching Medium | 3/3 | `F02-01-S021.png`~`F02-03-S098.png` · 실제 UI 조작·차이 잔여 |
| F03 | Explore/Topic detail | 2/2 | `F03-01-S070.png`~`F03-02-S057.png` · 실제 UI 조작·차이 잔여 |
| F04 | Explore/Topic detail/Browse curated list | 5/5 | `F04-01-S057.png`~`F04-05-S135.png` · 실제 UI 조작·차이 잔여 |
| F05 | Home | 4/4 | `F05-01-S069.png`~`F05-04-S061.png` · 실제 UI 조작·차이 잔여 |
| F06 | Home/Notifications | 2/2 | `F06-01-S069.png`~`F06-02-S068.png` · 실제 UI 조작·차이 잔여 |
| F07 | Home/Publishing a story/Adding topics | 6/6 | `F07-01-S023.png`~`F07-06-S146.png` · 실제 UI 조작·차이 잔여 |
| F08 | Home/Publishing a story | 11/11 | `F08-01-S069.png`~`F08-11-S178.png` · 실제 UI 조작·차이 잔여 |
| F09 | Home/Publishing a story/Changing text format | 5/5 | `F09-01-S137.png`~`F09-05-S017.png` · 실제 UI 조작·차이 잔여 |
| F10 | Home/Publishing a story/Drafts | 3/3 | `F10-01-S137.png`~`F10-03-S139.png` · 실제 UI 조작·차이 잔여 |
| F11 | Home/Publishing a story/Mentioning a user | 4/4 | `F11-01-S137.png`~`F11-04-S015.png` · 실제 UI 조작·차이 잔여 |
| F12 | Home/Refine recommendations | 5/5 | `F12-01-S069.png`~`F12-05-S022.png` · 실제 UI 조작·차이 잔여 |
| F13 | Home/Refine recommendations/Filtering suggestions | 4/4 | `F13-01-S099.png`~`F13-04-S151.png` · 실제 UI 조작·차이 잔여 |
| F14 | Home/Refine recommendations/Reading history | 2/2 | `F14-01-S190.png`~`F14-02-S052.png` · 실제 UI 조작·차이 잔여 |
| F15 | Home/Refine recommendations/Reading history/Clearing history | 2/2 | `F15-01-S190.png`~`F15-02-S045.png` · 실제 UI 조작·차이 잔여 |
| F16 | Home/Story detail | 7/7 | `F16-01-S026.png`~`F16-07-S102.png` · 실제 UI 조작·차이 잔여 |
| F17 | Home/Story detail/Author detail | 4/4 | `F17-01-S037.png`~`F17-04-S083.png` · 실제 UI 조작·차이 잔여 |
| F18 | Home/Story detail/Author detail/Blocking an author | 4/4 | `F18-01-S048.png`~`F18-04-S093.png` · 실제 UI 조작·차이 잔여 |
| F19 | Home/Story detail/Author detail/Following an author | 4/4 | `F19-01-S048.png`~`F19-04-S025.png` · 실제 UI 조작·차이 잔여 |
| F20 | Home/Story detail/Author detail/Following an author/Unfollowing an author | 2/2 | `F20-01-S103.png`~`F20-02-S130.png` · 실제 UI 조작·차이 잔여 |
| F21 | Home/Story detail/Author detail/Following list | 2/2 | `F21-01-S048.png`~`F21-02-S090.png` · 실제 UI 조작·차이 잔여 |
| F22 | Home/Story detail/Author detail/Muting an author | 3/3 | `F22-01-S048.png`~`F22-03-S152.png` · 실제 UI 조작·차이 잔여 |
| F23 | Home/Story detail/Author detail/Reporting an author | 5/5 | `F23-01-S048.png`~`F23-05-S170.png` · 실제 UI 조작·차이 잔여 |
| F24 | Home/Story detail/Changing display | 9/9 | `F24-01-S037.png`~`F24-09-S164.png` · 실제 UI 조작·차이 잔여 |
| F25 | Home/Story detail/Highlighting a phrase | 3/3 | `F25-01-S189.png`~`F25-03-S012.png` · 실제 UI 조작·차이 잔여 |
| F26 | Home/Story detail/Listening to a story | 5/5 | `F26-01-S037.png`~`F26-05-S160.png` · 실제 UI 조작·차이 잔여 |
| F27 | Home/Story detail/Listening to a story/Changing playback speed | 4/4 | `F27-01-S055.png`~`F27-04-S141.png` · 실제 UI 조작·차이 잔여 |
| F28 | Home/Story detail/Listening to a story/Changing voice | 6/6 | `F28-01-S055.png`~`F28-06-S192.png` · 실제 UI 조작·차이 잔여 |
| F29 | Home/Story detail/Responding to a phrase | 4/4 | `F29-01-S122.png`~`F29-04-S197.png` · 실제 UI 조작·차이 잔여 |
| F30 | Home/Story detail/Responses | 3/3 | `F30-01-S037.png`~`F30-03-S112.png` · 실제 UI 조작·차이 잔여 |
| F31 | Home/Story detail/Responses/Commenting a story | 3/3 | `F31-01-S100.png`~`F31-03-S062.png` · 실제 UI 조작·차이 잔여 |
| F32 | Home/Story detail/Responses/Commenting a story/Deleting a response | 3/3 | `F32-01-S062.png`~`F32-03-S124.png` · 실제 UI 조작·차이 잔여 |
| F33 | Home/Story detail/Responses/Commenting a story/Editing a response | 5/5 | `F33-01-S062.png`~`F33-05-S142.png` · 실제 UI 조작·차이 잔여 |
| F34 | Home/Story detail/Responses/Medium policy | 2/2 | `F34-01-S100.png`~`F34-02-S008.png` · 실제 UI 조작·차이 잔여 |
| F35 | Home/Story detail/Responses/Replying a response | 4/4 | `F35-01-S100.png`~`F35-04-S071.png` · 실제 UI 조작·차이 잔여 |
| F36 | Home/Story detail/Responses/Sorting responses | 3/3 | `F36-01-S100.png`~`F36-03-S032.png` · 실제 UI 조작·차이 잔여 |
| F37 | Home/Story detail/Saving a story | 3/3 | `F37-01-S037.png`~`F37-03-S172.png` · 실제 UI 조작·차이 잔여 |
| F38 | Home/Story detail/Sending claps | 3/3 | `F38-01-S037.png`~`F38-03-S179.png` · 실제 UI 조작·차이 잔여 |
| F39 | Home/Story detail/Sharing a story | 4/4 | `F39-01-S037.png`~`F39-04-S028.png` · 실제 UI 조작·차이 잔여 |
| F40 | Home/Story detail/Sharing a story/Downloading an image | 2/2 | `F40-01-S028.png`~`F40-02-S073.png` · 실제 UI 조작·차이 잔여 |
| F41 | Library | 5/5 | `F41-01-S069.png`~`F41-05-S145.png` · 실제 UI 조작·차이 잔여 |
| F42 | Library/Creating a list | 4/4 | `F42-01-S066.png`~`F42-04-S039.png` · 실제 UI 조작·차이 잔여 |
| F43 | Library/Filtering digest | 4/4 | `F43-01-S132.png`~`F43-04-S116.png` · 실제 UI 조작·차이 잔여 |
| F44 | Library/Filtering digest/Digest settings | 2/2 | `F44-01-S132.png`~`F44-02-S162.png` · 실제 UI 조작·차이 잔여 |
| F45 | Library/List detail/Adding a note | 5/5 | `F45-01-S177.png`~`F45-05-S002.png` · 실제 UI 조작·차이 잔여 |
| F46 | Library/List detail | 4/4 | `F46-01-S039.png`~`F46-04-S177.png` · 실제 UI 조작·차이 잔여 |
| F47 | Library/List detail/Deleting a list | 4/4 | `F47-01-S011.png`~`F47-04-S085.png` · 실제 UI 조작·차이 잔여 |
| F48 | Library/List detail/Downloading a list | 3/3 | `F48-01-S011.png`~`F48-03-S089.png` · 실제 UI 조작·차이 잔여 |
| F49 | Library/List detail/Making a list private | 5/5 | `F49-01-S011.png`~`F49-05-S101.png` · 실제 UI 조작·차이 잔여 |
| F50 | Library/List detail/Removing a story | 2/2 | `F50-01-S195.png`~`F50-02-S121.png` · 실제 UI 조작·차이 잔여 |
| F51 | Library/List detail/Reordering items | 5/5 | `F51-01-S011.png`~`F51-05-S077.png` · 실제 UI 조작·차이 잔여 |
| F52 | Logging in | 7/7 | `F52-01-S166.png`~`F52-07-S069.png` · 실제 UI 조작·차이 잔여 |
| F53 | Onboarding | 13/13 | `F53-01-S043.png`~`F53-13-S069.png` · 웹 대체 포함·native 미동등 |
| F54 | Onboarding/Subscribing to Medium | 6/6 | `F54-01-S129.png`~`F54-06-S069.png` · 실제 UI 조작·차이 잔여 |
| F55 | Profile | 6/6 | `F55-01-S069.png`~`F55-06-S047.png` · 실제 UI 조작·차이 잔여 |
| F56 | Profile/Editing profile information/Adding pronouns | 6/6 | `F56-01-S005.png`~`F56-06-S027.png` · 실제 UI 조작·차이 잔여 |
| F57 | Profile/Editing profile information | 8/8 | `F57-01-S020.png`~`F57-08-S047.png` · 웹 대체 포함·native 미동등 |
| F58 | Profile/Settings | 3/3 | `F58-01-S169.png`~`F58-03-S149.png` · 실제 UI 조작·차이 잔여 |
| F59 | Profile/Settings/Changing notification settings | 3/3 | `F59-01-S173.png`~`F59-03-S040.png` · 실제 UI 조작·차이 잔여 |
| F60 | Profile/Settings/Custom app icon | 2/2 | `F60-01-S173.png`~`F60-02-S075.png` · 실제 UI 조작·차이 잔여 |
| F61 | Profile/Settings/Logging out | 3/3 | `F61-01-S149.png`~`F61-03-S166.png` · 실제 UI 조작·차이 잔여 |
| F62 | Profile/Settings/Switching to dark mode | 8/8 | `F62-01-S173.png`~`F62-08-S144.png` · 실제 UI 조작·차이 잔여 |
| F63 | Profile/Story stats | 4/4 | `F63-01-S020.png`~`F63-04-S150.png` · 실제 UI 조작·차이 잔여 |

## 고유 원본200개 전수 판정

원본 열의 S번호와 `sc_...`는 대응표의 고유 ID다. 원본 경로는 `screens.json`/대응표, 실제/비교 파일은 위 외부 루트 기준이다. Light/Dark·키보드·계정·fixture 차이는 공통 조건 및 해당 action을 함께 적용한다.

| 화면·원본 ID | 실제 캡처 / 비교 | 차이·판정 |
| --- | --- | --- |
| S001 타인 하이라이트 숨김<br>`sc_00409287a68f4416941e39326f6df6b9` | `F24-07-S001.png`<br>`compare-S001.png` | **부분 대조 · 차이/플랫폼 잔여**. Highlights off 선택 일치. 기본 앱 theme와 reader theme 독립 유지. |
| S002 리스트 메모 반영<br>`sc_02d96a649c7a461b9c07155d33c1dbfc` | `F45-05-S002.png`<br>`compare-S002.png` | **부분 대조 · 차이/플랫폼 잔여**. 확정 메모가 해당 기사 위에 표시되고 재진입 유지. Viewed 실제 상태 및 행 높이·스크롤 차이. |
| S003 플레이어 더보기<br>`sc_0414c81870534989959d677ecede926c` | `F28-02-S003.png`<br>`compare-S003.png` | **부분 대조 · 차이/플랫폼 잔여**. 더보기6행 연결, native blur/실제48px행 차이. |
| S004 검색 진입과 토픽 탐색<br>`sc_047c91d900aa47448d61e4faacd68ad5` | `F02-02-S004.png`<br>`compare-S004.png` | **부분 대조 · 차이/플랫폼 잔여**. 검색창 blur 후 촬영. 주제16px/첫 간격 수정; 48논리 행과 원본 약44px, 앱 경제 주제 추가는 차이. |
| S005 프로필 사진 선택 반영<br>`sc_05df03a16c6b466b8ba91d9d6244c2f5` | `F56-01-S005.png`<br>`compare-S005.png` | **부분 대조 · 차이/플랫폼 잔여**. 부모편집 Updatephoto/50·4·160counter/About안내 대조. fixture사진/필드 높이 미세차이. |
| S006 관심 주제 다중 선택<br>`sc_05f2a886f5464a728dd61a6291707a3d` | `F53-09-S006.png`<br>`compare-S006.png` | **부분 대조 · 차이/플랫폼 잔여**. 원본과 동일5관심사 선택/Next 가능. 칩 폰트/간격·스크롤 범위 차이. |
| S007 박수 전송 피드백<br>`sc_0629a27b99a645cabe6e110b5d3d3d57` | `F38-02-S007.png`<br>`compare-S007.png` | **부분 대조 · 차이/플랫폼 잔여**. 실제16회박수확정/피드백+16. OS길게누르기검증아님; 기존북마크상태/응답수·아이콘차이. |
| S008 Medium Rules 정책 문서<br>`sc_063290fab51b4acd913212f85acde70d` | `F34-02-S008.png`<br>`compare-S008.png` | **부분 대조 · 차이/플랫폼 잔여**. 기존 로컬 정책 발췌+공식원문링크. 원본 전체기사/반응바/작가행과 다른 보완화면으로 동일재현미완료. |
| S009 기존 응답 편집 입력<br>`sc_0817971af7f14028a36fd2a233dd5ee7` | `F33-03-S009.png`<br>`compare-S009.png` | **부분 대조 · 차이/플랫폼 잔여**. 편집기존값 유지. 원본 Replying to 문구 대신 Editing 사용 자체 명확화. |
| S010 응답 수정 내용 입력<br>`sc_0950e3a03f7e4b02b9db0d98f818bdea` | `F33-04-S010.png`<br>`compare-S010.png` | **부분 대조 · 차이/플랫폼 잔여**. 이모지 편집 초안. 웹키보드와OS키보드 검증 구분. |
| S011 내 리스트 상세 항목<br>`sc_0b1e7b64b9f14f2cb5358161e0f67a94` | `F46-03-S011.png`<br>`compare-S011.png` | **부분 대조 · 차이/플랫폼 잔여**. 동일4기사 목록의 첫 두 행·저장·반응 대조. 상대시각 미제공, Viewed/회원표시/제목 줄바꿈 차이. |
| S012 구절 하이라이트 반영<br>`sc_0da01c48dbc9483798e4c2286a11237f` | `F25-03-S012.png`<br>`compare-S012.png` | **부분 대조 · 차이/플랫폼 잔여**. 같은 구간 Highlight 저장, 원본 기본 highlights와 개인 강조를 구분. |
| S013 이메일 인증 코드 입력 대기<br>`sc_10e0a1c6f1154b3b85f8d5ed18b692d7` | `F52-05-S013.png`<br>`compare-S013.png` | **부분 대조 · 차이/플랫폼 잔여**. 비어 있는 코드6칸/비활성 Validate. 원본 sign up문구와 해당 signin흐름 불일치를 복제하지 않음; mock안내 추가. |
| S014 큐레이션 리스트 상세<br>`sc_15a122b14ac84b3d80c37fb84dfae4c7` | `F04-04-S014.png`<br>`compare-S014.png` | **부분 대조 · 차이/플랫폼 잔여**. 공개 목록 avatar40/제목22/설명15·행 여백·반응 바 수정. 기사5/원본기록8의 데이터 한계와 실저장 반응 수 차이. |
| S015 멘션 대상 삽입<br>`sc_15dd105a441c426ca638b4db6cb30997` | `F11-04-S015.png`<br>`compare-S015.png` | **부분 대조 · 차이/플랫폼 잔여**. 선택한 mention ID가 녹색 텍스트로 반영. 원본과 같은 마지막 문단에 다시 입력해 촬영 예정. |
| S016 재생 속도 선택 초기<br>`sc_1965b9529b534e1597968039af1415b1` | `F27-02-S016.png`<br>`compare-S016.png` | **부분 대조 · 차이/플랫폼 잔여**. 1x200WPM/세로 눈금, 자체 취소X 추가. OS sheet stack 차이. |
| S017 구분선 삽입과 이미지 선택<br>`sc_19b2bef0854047f5b17cfeca07781ca5` | `F09-05-S017.png`<br>`compare-S017.png` | **부분 대조 · 차이/플랫폼 잔여**. 구분선 뒤 이미지 선택까지 촬영하도록 보강. 이전 캡처는 이미지 선택을 빠뜨렸음. |
| S018 글머리 목록 적용<br>`sc_1b0cd82ee04a4c8c9d52b9a2d088823b` | `F09-04-S018.png`<br>`compare-S018.png` | **부분 대조 · 차이/플랫폼 잔여**. bullet·들여쓰기·선택 상태 실제 적용. 원본 줄바꿈은 글꼴/키보드 차이. |
| S019 구절 응답 입력<br>`sc_1b7c2e5f28d5419d889919fc0c9e3980` | `F29-03-S019.png`<br>`compare-S019.png` | **부분 대조 · 차이/플랫폼 잔여**. 인용과 입력 보존/활성 제출. 웹 focus outline/키보드 차이. |
| S020 내 프로필 빈 Stories<br>`sc_1bd141b757934a88b4a003855e1794cc` | `F55-02-S020.png`<br>`compare-S020.png` | **부분 대조 · 차이/플랫폼 잔여**. 빈 프로필/편집/통계/Stories 대조. 실제미완료온보딩 Continue setup·Drafts 자체추가,following0vs원본1 차이. |
| S021 Explore 첫 화면<br>`sc_1c3e4349171248378eada528f7942269` | `F01-02-S021.png`<br>`compare-S021.png` | **부분 대조 · 차이/플랫폼 잔여**. Trending byline 한 줄/큰 글자 줄바꿈 수정. 배지/제목/번호/검색 진입 대조. |
| S022 팔로잉 유형별 목록<br>`sc_1c666fb7aadc411c9add1aa2b19bd56c` | `F12-05-S022.png`<br>`compare-S022.png` | **부분 대조 · 차이/플랫폼 잔여**. FollowingAll의 Writers/Topics 그룹·수/Seeall누락수정 후재촬영. 관계는동일ID, 소개줄바꿈/Followpill차이. |
| S023 발행 전 Story preview<br>`sc_1ceed9061b86476ebc7eb5acb9dd89c7` | `F07-01-S023.png`<br>`compare-S023.png` | **부분 대조 · 차이/플랫폼 잔여**. 발행 preview 상단/카드/행 대조. 배경·문구·여백·카드 제목·설정행 크기 수정. 이름/사진은 검증 계정과 로컬 자산. |
| S024 이메일 로그인 입력 완료<br>`sc_1d3dc01005c343c18427fe2c199e4075` | `F52-04-S024.png`<br>`compare-S024.png` | **부분 대조 · 차이/플랫폼 잔여**. 유효 mock Email과Continue 가능. 개인정보 원본 대신 reserved주소·서체/모의 계정선택 차이. |
| S025 팔로우된 작가 프로필<br>`sc_1da36ea095e64ec0a5b6b9478b032524` | `F19-04-S025.png`<br>`compare-S025.png` | **부분 대조 · 차이/플랫폼 잔여**. Following확정·메뉴닫기. 실제상태동기화/표시, 원본반응수와카드높이차이. |
| S026 홈 피드 스크롤 상태<br>`sc_1ef4e2f769774d2c958fcb38b96dc94f` | `F05-02-S026.png`<br>`compare-S026.png` | **부분 대조 · 차이/플랫폼 잔여**. 홈 접힘/다음 페이지 실제 요청 후 촬영. 아직 스크롤 위치 재보정 필요; 보관본 하단 세 번째 부분 기사 미구현 fixture 차이. |
| S027 프로필 폼으로 대명사 반환<br>`sc_20bfc41de9f845119aea54bb5971a01e` | `F56-06-S027.png`<br>`compare-S027.png` | **부분 대조 · 차이/플랫폼 잔여**. 하위Done후 부모초안2·4, 아직저장전. 사진fixture/짧은소개필드 간격 차이. |
| S028 이미지 저장 행동 노출<br>`sc_221a38b7f8ac42959ddd75840253b5c8` | `F39-04-S028.png`<br>`compare-S028.png` | **부분 대조 · 차이/플랫폼 잔여**. 공유 카드의 정보/글쓴이/배치 대조. 자체 gradient 배경·미리보기 kostolany.invalid 링크·좌우 접근성 버튼은 원본 자산과 차이. |
| S029 Music 토픽 검색<br>`sc_234fd58378fc447ba6bc2e6c0033f9c2` | `F07-03-S029.png`<br>`compare-S029.png` | **부분 대조 · 차이/플랫폼 잔여**. Music 동명이름·followers 후보/검색 지우기/Save 대조. 입력 48터치와 줄 높이 차이. |
| S030 작성기 더보기 메뉴<br>`sc_2436081faa2445cb86e17ea0b88b4fc9` | `F10-02-S030.png`<br>`compare-S030.png` | **부분 대조 · 차이/플랫폼 잔여**. 4개 작성 메뉴의 실제 노출·Drafts 목적지 확인.48행·popover shadow/platform 차이. |
| S031 본문 문자 스타일 변경<br>`sc_24b381a199374acb8d2a6a516052c9a7` | `F09-02-S031.png`<br>`compare-S031.png` | **부분 대조 · 차이/플랫폼 잔여**. 문자 스타일 비교로 기존 subheading을 회색 산세리프18/24 표현으로 수정. 원본 내부 스타일 이름은 미확인, 앱 기존 문서 kind에 대응한 자체 결정. |
| S032 최신순 응답 목록<br>`sc_280ed6ce41b24f6f876aac698f4a8119` | `F36-03-S032.png`<br>`compare-S032.png` | **부분 대조 · 차이/플랫폼 잔여**. Recent Navj/Gwyneth/Melanie순서. 원본집계/작성자자산 일부차이. |
| S033 전체 추천의 작가 섹션<br>`sc_28a0bd2548fc4800b2b024bdc06bb115` | `F13-03-S033.png`<br>`compare-S033.png` | **부분 대조 · 차이/플랫폼 잔여**. All추천Writers·공유verified표시보완. 기존follow결과와제목/소개줄수 차이. |
| S034 로그아웃 확인<br>`sc_2d1afd7a02a347868564f9757753d077` | `F61-02-S034.png`<br>`compare-S034.png` | **부분 대조 · 차이/플랫폼 잔여**. Signout확인·취소·성공복귀. 모의실패선택접근UI자체추가, nativealert대비앱dialog차이. |
| S035 관심사 기반 작가·발행물 추천<br>`sc_301ef788e5514bb5b8e9c1fc9afcfa61` | `F53-10-S035.png`<br>`compare-S035.png` | **부분 대조 · 차이/플랫폼 잔여**. 추천작가 Follow 실제 공유 관계 연결. 추천목록 fixture/소개/작가·출판물 avatar차이. |
| S036 기사 저장 대상 선택<br>`sc_31edfd53d2874259a6ed5ecbc756d10b` | `F37-02-S036.png`<br>`compare-S036.png` | **부분 대조 · 차이/플랫폼 잔여**. Reading list 선택초안/Done 일치. 48터치/간격차이. |
| S037 기사 상세 상단<br>`sc_332d5b0923e546fcbf6a8fc613cda6a4` | `F16-02-S037.png`<br>`compare-S037.png` | **부분 대조 · 차이/플랫폼 잔여**. 상세첫화면동일커버/제목/작성자/유료배지 대조. 댓글834vs실제7, serif/Follow폭·헤더높이차이. |
| S038 작가 공개 리스트<br>`sc_334d50df678445baaa7ba445c96861ba` | `F17-03-S038.png`<br>`compare-S038.png` | **부분 대조 · 차이/플랫폼 잔여**. 작성자Lists에독립Save/더보기/Share연결추가, 제목/커버진입보존. 카드48터치/커버crop차이. |
| S039 새 리스트 생성 표시<br>`sc_35dcbd9d4308404b9f11ecd03f893eb8` | `F42-04-S039.png`<br>`compare-S039.png` | **부분 대조 · 차이/플랫폼 잔여**. 생성 확정 후 두 목록과 복귀 확인. 초기 촬영이 Saving 상태였으므로 확정된 library행을 기다리도록 재촬영 수정. |
| S040 추천 알림 두 항목 끄기<br>`sc_368c53cd77e2421e8279124ce03301f4` | `F59-03-S040.png`<br>`compare-S040.png` | **부분 대조 · 차이/플랫폼 잔여**. Topstories/Editors만off저장 및 다른항목 유지.48터치행높이·토글자산 차이. |
| S041 새 읽기 경험 소개<br>`sc_3795c955a89d404c85112e637857e74a` | `F53-07-S041.png`<br>`compare-S041.png` | **부분 대조 · 차이/플랫폼 잔여**. 온보딩 Welcome/Continue 대조. 실제 관계 fixture avatar구성과 대체 serif 차이. |
| S042 빈 기사 편집기<br>`sc_397cb0f05ba54659adac7376f29512dd` | `F08-02-S042.png`<br>`compare-S042.png` | **부분 대조 · 차이/플랫폼 잔여**. 빈 편집기 실제 진입. 웹은 OS 키보드가 없고 screenshot caret 숨김 기본값; native 성공으로 계산 안 함. |
| S043 브랜드 시작 화면<br>`sc_39bd15e8585d404daa48b34a448b0e32` | `F53-01-S043.png`<br>`compare-S043.png` | **비동등 · native 원본 검증 대기**. 원본 native 시작 브랜드 화면과 현재 웹 Home은 비동등. native splash 브랜드 전용 구현/실행 확인 잔여; 캡처 확보를 구현 완료로 세지 않음. |
| S044 Unlisted 공개 범위 안내<br>`sc_39fb71a1ee0d43f09bab33c7ef775259` | `F08-10-S044.png`<br>`compare-S044.png` | **부분 대조 · 차이/플랫폼 잔여**. Unlisted OFF 설명과 스크롤 맥락 대조. preview 접힘 제목/설명 크기·문구·토픽 칩 보정. 웹 Switch/전체 본문 미리보기 자체 보완. |
| S045 읽기 기록 빈 상태<br>`sc_3ab5043fa7b649908c6dde30faf290ab` | `F15-02-S045.png`<br>`compare-S045.png` | **부분 대조 · 차이/플랫폼 잔여**. 이력Clear후빈상태·Explore 진입/취소 대조.48버튼·서체/여백차이. |
| S046 음성 선택 목록<br>`sc_3b3db04094fe4a189b31e66c28971bcd` | `F28-03-S046.png`<br>`compare-S046.png` | **부분 대조 · 차이/플랫폼 잔여**. Emma 선택/후보 그룹/검색 일치; 아이콘 벡터/폰트 차이. |
| S047 프로필 소개·사진·대명사 표시<br>`sc_3cd0855e78a84d4ea413f0e5b3dffb73` | `F55-06-S047.png`<br>`compare-S047.png` | **부분 대조 · 차이/플랫폼 잔여**. 이름/pronouns/bio확정 About표시. 검증용기존자산사진과 원본사용자사진 다름, Continue setup및서체 차이. |
| S048 작가 프로필 Stories<br>`sc_3de359a1c13340968c4b733188faa6d1` | `F17-02-S048.png`<br>`compare-S048.png` | **부분 대조 · 차이/플랫폼 잔여**. 작성자Stories/pinned/Follow·관계숫자 대조. 제목폭/그림crop·실제반응수 차이. |
| S049 작가 팔로우 성공과 알림 메뉴<br>`sc_3ecf6d2988a6418fa4d2006fa4497b23` | `F19-02-S049.png`<br>`compare-S049.png` | **부분 대조 · 차이/플랫폼 잔여**. Follow성공·관계메뉴. 자체정책Email기본off는 원본on과다르며자동구독하지않음; toast줄바꿈/blur차이. |
| S050 미니 플레이어 재생 상태<br>`sc_40448a752ea64391a724af01b1e050f1` | `F26-03-S050.png`<br>`compare-S050.png` | **부분 대조 · 차이/플랫폼 잔여**. 미니 플레이어 재생 상태와 연동, Mock 문구/현재 응답7은 자체 데이터. |
| S051 링크 복사 피드백<br>`sc_4225892a7f304ec9b0442fad0aae38bb` | `F39-03-S051.png`<br>`compare-S051.png` | **부분 대조 · 차이/플랫폼 잔여**. 실제웹Clipboard복사완료toast 확인. 원본공유URL대신앱미리보기URL, 배경자산·아이콘차이. |
| S052 읽기 기록 스크롤<br>`sc_4239d69cbdce4194a5a34c7472131dfd` | `F14-02-S052.png`<br>`compare-S052.png` | **부분 대조 · 차이/플랫폼 잔여**. 읽기이력개별기사제거/복귀. 원본과현재선택순서·응답수·제목줄바꿈 차이. |
| S053 편집 추천과 개인 추천<br>`sc_4352273aa0654f939705613dfa224e75` | `F01-04-S053.png`<br>`compare-S053.png` | **부분 대조 · 차이/플랫폼 잔여**. Staff Picks/Recommended 배치 대조. F.Perry Wilson 배지 누락을 원본 및 공유 identity fixture에 반영. |
| S054 이름과 이메일 입력 완료<br>`sc_4510def6bbb1459ab0b5f18d07b8427e` | `F53-04-S054.png`<br>`compare-S054.png` | **부분 대조 · 차이/플랫폼 잔여**. 가입 입력 확정 가능. 원본 키보드/스크롤 조건과 웹 viewport 차이, OS IME검증 아님. |
| S055 확장 오디오 플레이어<br>`sc_45ddcc1f43a54523a1314ce563abf5ee` | `F26-04-S055.png`<br>`compare-S055.png` | **부분 대조 · 차이/플랫폼 잔여**. 확대 플레이어; 재생 시각은 실제 조작 경과라 원본5초와 다름. 자체 gradient/vector/폰트 차이. |
| S056 다크 읽기 목록 상세<br>`sc_45fd4ac6da2148968fab1446df649f7f` | `F62-07-S056.png`<br>`compare-S056.png` | **부분 대조 · 차이/플랫폼 잔여**. DarkReadinglist기본목록반응조회결함수정 후확인. 소유자전용비공개투영/외부공유차단; 원본4기사/inline lock와현재3/Private행차이. |
| S057 Life 토픽 상세<br>`sc_4602e853aca341a697239bc9f55b6da3` | `F03-02-S057.png`<br>`compare-S057.png` | **부분 대조 · 차이/플랫폼 잔여**. Life 제목/팔로우/추천 이미지·기사·뒤로 확인; 글꼴·아이콘·48터치 차이. |
| S058 다크 Library<br>`sc_4a39ee1d768342a9823787c11c851479` | `F62-05-S058.png`<br>`compare-S058.png` | **부분 대조 · 차이/플랫폼 잔여**. DarkLibrary저장3기사·공유프로필사진 대조. 원본4기사/커버와차이, 실제저장결과를유지. |
| S059 Member 혜택과 Friend 플랜 노출<br>`sc_4beaf37694cb429baac5c27b93a71ccf` | `F54-02-S059.png`<br>`compare-S059.png` | **부분 대조 · 차이/플랫폼 잔여**. BFree에서Member선택 가능. 기존 원본SGD가격보관값/계층 대조, mock표시와 버튼·행간 차이. |
| S060 제목과 본문 입력<br>`sc_4db886af7d024100a72b9e02fa3c1ee8` | `F08-03-S060.png`<br>`compare-S060.png` | **부분 대조 · 차이/플랫폼 잔여**. 같은 제목/본문 실제 입력. Georgia 등 원본 글꼴·줄바꿈, 자체 autosave 상태, 웹의 OS 키보드 부재 차이. |
| S061 Featured 기사 목록<br>`sc_4ec0a8b65f954b0984ece5b3b9f258e4` | `F05-04-S061.png`<br>`compare-S061.png` | **부분 대조 · 차이/플랫폼 잔여**. Featured 실제 정상 fixture. 두 기사·북마크/더보기·뒤로 확인. 미수록된 세 번째 글 전체와 계정 표시/실응답 수 차이. |
| S062 새 응답 표시<br>`sc_500793b8306c411585ba54ddaf6a8f25` | `F31-03-S062.png`<br>`compare-S062.png` | **부분 대조 · 차이/플랫폼 잔여**. 작성한 댓글이 상단. 원본시간/집계와 실제이름/토스트 차이. |
| S063 읽기 표시 설정 기본<br>`sc_557c1fb7c6bf4dcc82ba1d6aba677f94` | `F24-03-S063.png`<br>`compare-S063.png` | **부분 대조 · 차이/플랫폼 잔여**. 표시설정Font/Appearance/Highlights컨트롤. wrap행의세로정렬수정, 48터치·폰트·nativeblur차이. |
| S064 가입 인증 코드 입력 완료<br>`sc_55d8ee5f826740d69ebd2e163aaa6486` | `F53-06-S064.png`<br>`compare-S064.png` | **부분 대조 · 차이/플랫폼 잔여**. 가입코드6칸/Validate 연결. 테스트코드123456·mock안내/닫기·서체 차이. |
| S065 Music 선택<br>`sc_57162331e2334952b5da8676e4de3c22` | `F07-04-S065.png`<br>`compare-S065.png` | **부분 대조 · 차이/플랫폼 잔여**. 선택 체크/칩 동시 표시·삭제 경로 확인. 칩 글자/배경/가로 여백 보정. |
| S066 저장 글 있는 읽기 목록<br>`sc_57450c38bf994be18d95fcaf712c56ba` | `F41-03-S066.png`<br>`compare-S066.png` | **부분 대조 · 차이/플랫폼 잔여**. 실제3기사 저장 후 소개 숨김 확인. 원본3기사와 선택한 기사/커버/순서가 다름. |
| S067 관심 주제 미선택<br>`sc_5843ae43bf154aadb5507c6fa51d150d` | `F53-08-S067.png`<br>`compare-S067.png` | **부분 대조 · 차이/플랫폼 잔여**. 관심사 미선택/3개 최소/Next비활성. 칩48논리영역으로 줄간격·하단 보이는 범위 차이. |
| S068 알림 목록<br>`sc_5d1c7181dea04ba59b57242abbc19fee` | `F06-02-S068.png`<br>`compare-S068.png` | **부분 대조 · 차이/플랫폼 잔여**. 알림 정상 기능 fixture와 원본4행 대조. actor/subject/종류5건은 기능 연결 검증용이라 원본4행 데이터 재현이 아님. 기존 참조 fixture 별도 기록 예정. |
| S069 For you 홈 피드<br>`sc_5e0ba0e498ff49579bf838096aec4b5e` | `F01-01-S069.png`<br>`compare-S069.png` | **부분 대조 · 차이/플랫폼 잔여**. Home 카드/정렬/작성/하단 탭 배치 비교. 반응은 계정별 실제 mock 저장소를 사용해 원본 누적 응답 수와 다름. |
| S070 Explore 토픽 가로 이동<br>`sc_602f368bf00a46b8b57d68f964ed6c16` | `F01-03-S070.png`<br>`compare-S070.png` | **부분 대조 · 차이/플랫폼 잔여**. 가로 주제 스크롤 후 Health/Life 진입 대조. 원본 19 hours와 fixture18 hours는 원본 시점별 표시 차이. |
| S071 답글 생성 표시<br>`sc_60bd813234264b59b304bd3ac3df0af4` | `F35-04-S071.png`<br>`compare-S071.png` | **부분 대조 · 차이/플랫폼 잔여**. 답글확정/부모ID보존. 캡처의 새답글위치가원본상단과달라재검토필요. |
| S072 답글 대상 선택<br>`sc_6101af9ca21443afbe2c2146c8ac2e3d` | `F35-02-S072.png`<br>`compare-S072.png` | **부분 대조 · 차이/플랫폼 잔여**. Bérnie 답글대상/빈초안. 이전자기댓글존재와웹키보드조건차이. |
| S073 공유 이미지 저장 안내<br>`sc_62256b592ebc4b028f1097aa21f9e400` | `F40-02-S073.png`<br>`compare-S073.png` | **부분 대조 · 차이/플랫폼 잔여**. 현재 웹 PNG 다운로드 성공과 안내 확인. 원본 photo-library 저장 성공과 구분; 동일 이미지 자산/배경 차이. |
| S074 내 프로필 Lists<br>`sc_64afef71457f48808c33def66fd6d90e` | `F55-04-S074.png`<br>`compare-S074.png` | **부분 대조 · 차이/플랫폼 잔여**. 프로필Lists 기본목록 진입. 원본4기사를 자동fixture생성하지 않아 실제목록0; Continue setup/커버 차이. |
| S075 앱 아이콘 선택과 멤버십 제한<br>`sc_64b75d913b284d708ab44e4f3663a59f` | `F60-02-S075.png`<br>`compare-S075.png` | **부분 대조 · 차이/플랫폼 잔여**. Customicon선택/잠금/멤버십진입 대조. 자체K아이콘8개는원본M및하단미확인아이콘과다름; 실제launcher실행대기. |
| S076 리스트 생성 빈 폼<br>`sc_675e3eda08504708979533659dacdcf6` | `F42-02-S076.png`<br>`compare-S076.png` | **부분 대조 · 차이/플랫폼 잔여**. 빈 목록 생성 form/0·60,0·280/Private off/비활성 Create 대조. 웹 focus와48터치 영역 차이. |
| S077 변경 순서 반영<br>`sc_6840597985cc46b6b12f6cd0204756f4` | `F51-05-S077.png`<br>`compare-S077.png` | **부분 대조 · 차이/플랫폼 잔여**. 재정렬 확정 후 기사 순서·메모 보존. 다운로드가 stale로 구분되어 원본에 없는 복구 안내 표시. |
| S078 리스트 순서 편집<br>`sc_6a1036b35729490195c460e5b934bd68` | `F51-03-S078.png`<br>`compare-S078.png` | **부분 대조 · 차이/플랫폼 잔여**. Reorder연결/안정ID/확정·취소 대조. 현재 별도 modal과 접근성 이동 버튼은 원본 inline drag화면과 구조 차이. |
| S079 팔로우 추천 카드<br>`sc_6bc604f45031400d9cebd252cd89e7a2` | `F01-05-S079.png`<br>`compare-S079.png` | **부분 대조 · 차이/플랫폼 잔여**. Who to follow 진입/가로 카드 대조. 촬영 스크롤42px 보정; 48터치·카드 높이와 Coinmonks 배너 자산 차이. |
| S080 대명사 검색<br>`sc_6c7a00132f3c47e6b2e803743cc10d21` | `F56-03-S080.png`<br>`compare-S080.png` | **부분 대조 · 차이/플랫폼 잔여**. he검색후he/her후보·중복제외. 후보48터치/필드테두리차이. |
| S081 내 리스트 관리 메뉴<br>`sc_71f31ac7803a47f89b2e76b6a9355a7c` | `F47-02-S081.png`<br>`compare-S081.png` | **부분 대조 · 차이/플랫폼 잔여**. Edit/private/reorder/delete 기존 명령 연결. View list는 공개 투영 확인용 자체 추가; 메뉴 divider/blur 차이. |
| S082 대명사 선택 빈 폼<br>`sc_743e421bb2b14205b19b76062fdf27cd` | `F56-02-S082.png`<br>`compare-S082.png` | **부분 대조 · 차이/플랫폼 잔여**. 대명사 빈검색/Done/0·4 대조. 명시적뒤로·웹focusoutline 자체보완, OSkeyboard 미검증. |
| S083 작가 About<br>`sc_74429222aa3d45a89f1980b3aa0b6f9e` | `F17-04-S083.png`<br>`compare-S083.png` | **부분 대조 · 차이/플랫폼 잔여**. 작성자About본문/회원기간. 원본serif와대체서체, 공유identity의공식웹사이트추가줄 차이. |
| S084 멤버십 선택 처리 중<br>`sc_754aff4161c64e0685e7331a359eae32` | `F54-03-S084.png`<br>`compare-S084.png` | **부분 대조 · 차이/플랫폼 잔여**. mock결제 진행중 비활성/스피너. 실제StoreKit·Play결제 아님; 로딩opacity·spinner형태 차이. |
| S085 리스트 삭제 후 라이브러리<br>`sc_7749ef5c35474c229a2515a9c2a53878` | `F47-04-S085.png`<br>`compare-S085.png` | **부분 대조 · 차이/플랫폼 잔여**. 삭제 성공 후 알림/Library 복귀. 탭과 알림 겹침 결함 수정 후 재촬영; 기본 목록으로 기사를 자동이동하지 않아 원본4와 현재0 다름. |
| S086 다크 홈 피드<br>`sc_77bbb7d671f14c6db68071c5921f22fa` | `F62-03-S086.png`<br>`compare-S086.png` | **부분 대조 · 차이/플랫폼 잔여**. DarkHome실제theme반영. 원본Dark시점피드와현재기본fixture기사구성다름; 알림표시도실제mock상태. |
| S087 Unsplash 사진 선택<br>`sc_785431954ec4405eb0a3b22debce165a` | `F08-05-S087.png`<br>`compare-S087.png` | **부분 대조 · 차이/플랫폼 잔여**. 로컬4사진 mock 검색과 원본 Unsplash 다열 사진 대조. 서비스/원본 사진 미연결, Back와 로컬 안내는 자체 보완. |
| S088 Hans 음성 선택<br>`sc_78bee192bd2041a98f6721240f2352d5` | `F28-05-S088.png`<br>`compare-S088.png` | **부분 대조 · 차이/플랫폼 잔여**. Hans 선택 공유 상태 일치, 동일 스크롤/아이콘 차이. |
| S089 다운로드 표시 변경<br>`sc_7b31963fc5c64fc8b9268beab4009201` | `F48-03-S089.png`<br>`compare-S089.png` | **부분 대조 · 차이/플랫폼 잔여**. 목록 다운로드 완료 아이콘과 기사별 표시 확인. 원본서체·행 높이·Viewed 실제 기록 차이. |
| S090 팔로잉 계정 목록<br>`sc_7c89f4496e7f4cb0b5c23b776080b6bf` | `F21-02-S090.png`<br>`compare-S090.png` | **부분 대조 · 차이/플랫폼 잔여**. Following명단의작가/publication·Follow및verified대조. 소개줄수/row간격·프로필tab맥락차이. |
| S091 Self Improvement 토픽<br>`sc_7de88da749774d0483716f2e861fb080` | `F04-02-S091.png`<br>`compare-S091.png` | **부분 대조 · 차이/플랫폼 잔여**. Self Improvement 선택 및 Following 실제 저장 후 촬영; Life→주제 전환과 뒤로 확인. |
| S092 답글 내용 입력<br>`sc_8202187474f444de8773b38fe92c4d82` | `F35-03-S092.png`<br>`compare-S092.png` | **부분 대조 · 차이/플랫폼 잔여**. Agree 답글입력. source별개세션과앱연속조작목록차이. |
| S093 작가 프로필의 다른 캡처 상태<br>`sc_8208a84fba4c4046aa1d364055d14db7` | `F18-04-S093.png`<br>`compare-S093.png` | **부분 대조 · 차이/플랫폼 잔여**. 차단후재진입에서도본문숨김/해제가능. 원본Stories노출을보안정책과같다고추측하지않음. |
| S094 대명사 2개 선택<br>`sc_82178c6b5a56471cb64fecb5a4e4bc4e` | `F56-05-S094.png`<br>`compare-S094.png` | **부분 대조 · 차이/플랫폼 잔여**. he/him2·4/Done초안확정. 칩모서리·삭제아이콘·서체 차이. |
| S095 Library 초기 목록<br>`sc_84e0421de98041bbb014822fc05dd3fb` | `F41-02-S095.png`<br>`compare-S095.png` | **부분 대조 · 차이/플랫폼 잔여**. 빈 Reading list/소개 배너/탭 배치 대조. mock 사용자 이름과 아이콘 선/서체 차이. |
| S096 과거 다이제스트 선택<br>`sc_8866044a55164824903265c3b8b97337` | `F43-03-S096.png`<br>`compare-S096.png` | **부분 대조 · 차이/플랫폼 잔여**. June8 초안 선택·Done 전 적용 안 됨. 빈 발행일을 임의로 생성하지 않아 날짜 목록 차이. |
| S097 구절 인용 응답 작성 시작<br>`sc_8accfd977771416a89329576c7ba48d8` | `F29-02-S097.png`<br>`compare-S097.png` | **부분 대조 · 차이/플랫폼 잔여**. 인용 초안/비활성 제출. 실제OS키보드 없음,7건 로컬 응답과 원본834 차이. |
| S098 Medium 검색 결과<br>`sc_8dc9eeb5f9d244ca9fa6fb7a973de82f` | `F02-03-S098.png`<br>`compare-S098.png` | **부분 대조 · 차이/플랫폼 잔여**. 로딩 상태를 결과 캡처로 취급한 촬영 결함 수정. 결과 제목 및 visible spinner 완료를 기다려 재촬영. |
| S099 추천 조정의 Suggestions<br>`sc_90bc6a79e86d436e89d94d7dc82b624c` | `F12-02-S099.png`<br>`compare-S099.png` | **부분 대조 · 차이/플랫폼 잔여**. 추천Topics5행/metadata/Follow 대조. 선택tab/복귀context는 Profile진입이므로 원본Home선택과다름; 서체/간격차이. |
| S100 응답 시트와 중첩 답글<br>`sc_915888473ac24e8987c996b8954f54c6` | `F30-02-S100.png`<br>`compare-S100.png` | **부분 대조 · 차이/플랫폼 잔여**. Most Relevant/댓글·답글 실제 연결. 원본834를 복제하지 않고7로집계,48터치영역/간격 차이. |
| S101 비공개 리스트 표시<br>`sc_91b39d224f6b4c9ab7573c0c3df633eb` | `F49-05-S101.png`<br>`compare-S101.png` | **부분 대조 · 차이/플랫폼 잔여**. 확정 비공개 표시 유지. 원본 작은 inline lock 대신 별도 Private행, 다운로드 정책상 재갱신 안내 차이. |
| S102 같은 작가의 추가 기사<br>`sc_92624aea551d44a7bbcf71d7d78aff4c` | `F16-07-S102.png`<br>`compare-S102.png` | **부분 대조 · 차이/플랫폼 잔여**. Morefrom기사/커버/동일작가연결. 카드구조수정후다음커버위치대조; 실제응답수/폰트차이. |
| S103 팔로우 설정 메뉴<br>`sc_937a1fdc91724d1ca5cc41b1d43d5132` | `F19-03-S103.png`<br>`compare-S103.png` | **부분 대조 · 차이/플랫폼 잔여**. Following이메일메뉴체크/On·Off·Unfollow연결. 기본off와원본on차이, 원본미확인기본정책으로일반화하지않음. |
| S104 팔로잉 빈 상태<br>`sc_944b2eea3834408b8c04981e5eb2adf8` | `F12-04-S104.png`<br>`compare-S104.png` | **부분 대조 · 차이/플랫폼 잔여**. Following없음/All/빈문구 확인. 원본구분선/문구크기·tab선택context차이. |
| S105 리스트 비공개 확인<br>`sc_95e504331794455fb4776bd322254c76` | `F49-03-S105.png`<br>`compare-S105.png` | **부분 대조 · 차이/플랫폼 잔여**. Private확인 경고/확정·취소 계약 대조. OS alert 대신 앱 dialog, 확인 색/48버튼 차이. |
| S106 빈 리스트 상세<br>`sc_967232cfb5f845839053e0d371d78911` | `F46-02-S106.png`<br>`compare-S106.png` | **부분 대조 · 차이/플랫폼 잔여**. 빈 사용자 목록/Start browsing/반응 연결 대조. 원본 상대시각 대신 실제 개수 표시; 하단 canonical반응0 자체 계약. |
| S107 토픽 내 큐레이션<br>`sc_974be74d8855401e84cbad9f01dc8e93` | `F04-03-S107.png`<br>`compare-S107.png` | **부분 대조 · 차이/플랫폼 잔여**. curated list 제목/가로 미리보기/See full list 대조. 스크롤 위치 보정 및 공유 IdentityLink verified 누락 수정. |
| S108 다크 하이라이트 목록<br>`sc_97fb65c906bf4e309ec595d2067e4bce` | `F62-06-S108.png`<br>`compare-S108.png` | **부분 대조 · 차이/플랫폼 잔여**. DarkHighlight실제발췌저장조회. 원본3발췌와현재1개·삭제보완·폰트차이. |
| S109 비공개 변경 성공 안내<br>`sc_996c48382ff0466099cf371adf783dae` | `F49-04-S109.png`<br>`compare-S109.png` | **부분 대조 · 차이/플랫폼 잔여**. 확정 Private성공 안내 추가. 자체 비공개 설명/다운로드 stale경고가 원본보다 많은 공간을 사용. |
| S110 앱 다크 테마 설정<br>`sc_9b1044709d764fe682a5e95603fd5c56` | `F62-02-S110.png`<br>`compare-S110.png` | **부분 대조 · 차이/플랫폼 잔여**. Dark선택Settings/뒤로 복귀 대조. 현재Member값·행높이·글꼴 차이. |
| S111 응답 정렬 선택<br>`sc_9b94403d105c4eda8933ae7bbe2d6a00` | `F36-02-S111.png`<br>`compare-S111.png` | **부분 대조 · 차이/플랫폼 잔여**. 정렬메뉴 Most Relevant/Recent와체크. nativeblur/위치차이. |
| S112 응답 스크롤과 추가 답글<br>`sc_9c9af2f5f8ad43c193c0c30ef0974156` | `F30-03-S112.png`<br>`compare-S112.png` | **부분 대조 · 차이/플랫폼 잔여**. Alfred/Elena 답글 실제 표시. 미수록4개 추가댓글은 만들지 않아 See more replies4와 차이. |
| S113 기기 사진 선택기<br>`sc_9fd133df622e4ddd859bbbeb845ba4da` | `F57-04-S113.png`<br>`compare-S113.png` | **비동등 · native 원본 검증 대기**. 웹파일chooser대기화면을 촬영. 원본iOS사진picker와 비동등, OS선택기 픽셀clone대상 아님; nativeadapter실행 대기. |
| S114 리스트 삭제 확인 시트<br>`sc_a1562b1931fc4650a544861094934588` | `F47-03-S114.png`<br>`compare-S114.png` | **부분 대조 · 차이/플랫폼 잔여**. Delete확인 문구/취소·확정 및 기존 기사 보존. 시트 글꼴·버튼48높이 차이. |
| S115 3개 토픽 선택<br>`sc_a4216c4ff1f64bb59bc982a8d0067b6e` | `F07-05-S115.png`<br>`compare-S115.png` | **부분 대조 · 차이/플랫폼 잔여**. 3/5 및 Music/Culture/Art 초안 선택. 기본 후보 순서·칩/Your topics 보정. |
| S116 선택 날짜 다이제스트<br>`sc_a42fffc3afb34954bc5e4afcc2e08e04` | `F43-04-S116.png`<br>`compare-S116.png` | **부분 대조 · 차이/플랫폼 잔여**. June8 확정·표시/실제 응답 조건 일치. 원본 Goodbye Notion과 mock 해당 일 기사 다름. |
| S117 이메일 가입 기본 폼<br>`sc_a4438be77c814444b7f0c005ee44e8b6` | `F53-03-S117.png`<br>`compare-S117.png` | **부분 대조 · 차이/플랫폼 잔여**. Email가입 이름/주소/생성 form 대조. mock허용계정/실제 개인정보 안내·기본값·서체 차이. |
| S118 토픽 추가 초기 상태<br>`sc_a51d0e5d058b47809e1c299e1c28ff0e` | `F07-02-S118.png`<br>`compare-S118.png` | **부분 대조 · 차이/플랫폼 잔여**. 토픽0/5 검색과 목록 대조. 보관본 첫8개 기본 순서·Your topics 두께 반영, 추가 미수록 후보는 뒤 이름순 자체 정책. |
| S119 읽기 테마 선택<br>`sc_a5d80c9e0226452cbb67e018702c5f1b` | `F24-05-S119.png`<br>`compare-S119.png` | **부분 대조 · 차이/플랫폼 잔여**. Appearance 선택 메뉴/체크 일치, native blur/행높이와 웹 터치영역 차이. |
| S120 대명사 1개 선택<br>`sc_a6051a9dd4514d3694dde85cd95c6b6d` | `F56-04-S120.png`<br>`compare-S120.png` | **부분 대조 · 차이/플랫폼 잔여**. hechip1·4/삭제/검색계속. focusoutline/뒤로 버튼은 웹 접근성 보완. |
| S121 리스트에서 기사 제거<br>`sc_a79a8c62cfd64776ae74f84e0d98b5c3` | `F50-02-S121.png`<br>`compare-S121.png` | **부분 대조 · 차이/플랫폼 잔여**. 기사 제거 후 Undo로 같은 위치/메모 복구. 자체 문구와 toolbar위치·48터치 차이. |
| S122 본문 구절 선택<br>`sc_a8112b7354bb44908f9359e95ba3c288` | `F25-02-S122.png`<br>`compare-S122.png` | **부분 대조 · 차이/플랫폼 잔여**. 실제 DOM 선택; OS selection handles는 웹에서 재현하지 않음. 좌표/원본 폰트 차이. |
| S123 프로필 편집 폼<br>`sc_a829121c47a444cd8a8fd0d9889edaed` | `F57-02-S123.png`<br>`compare-S123.png` | **부분 대조 · 차이/플랫폼 잔여**. 사진없는 초기부모편집·이름10·50 대조. placeholder색·웹focus 차이. |
| S124 응답 삭제 성공 표시<br>`sc_aa1b32e30ce5436b8ca8fcc4c7d74d1b` | `F32-03-S124.png`<br>`compare-S124.png` | **부분 대조 · 차이/플랫폼 잔여**. 실제 삭제 성공토스트. 댓글수7/원본833, 위쪽sort 유지 차이. |
| S125 글자 크기 확대<br>`sc_ad140eae0b7e409aa2204c1f36bfa385` | `F24-04-S125.png`<br>`compare-S125.png` | **부분 대조 · 차이/플랫폼 잔여**. 120% 선택/값 일치. Font family 행 수직 정렬 결함을 발견해 alignContent center 추가, 재촬영 진행. |
| S126 본문 이미지 로딩<br>`sc_ae30c2a2ca504522b03f98f11d59c429` | `F08-06-S126.png`<br>`compare-S126.png` | **부분 대조 · 차이/플랫폼 잔여**. 실제 pending prepare 프레임 촬영. spinner가 이미지 아래 있던 결함을 검은 overlay 중앙으로 수정. 로컬 사진 비율/OS 키보드 차이. |
| S127 신고 사유 선택 완료<br>`sc_af0ecdded03643ca8cea85ec5341d906` | `F23-04-S127.png`<br>`compare-S127.png` | **부분 대조 · 차이/플랫폼 잔여**. Spam선택/Report가능/AlsoBlock미선택. 실제명령실패복구는기존테스트, 별도설명·mock표시차이. |
| S128 오디오 로딩<br>`sc_b43c7474098746baa684870217c28927` | `F26-02-S128.png`<br>`compare-S128.png` | **부분 대조 · 차이/플랫폼 잔여**. 실제 mock 준비중. native spinner 모양/로딩 이미지 도착 차이. |
| S129 월간 멤버십 선택<br>`sc_b4e85416681544c9b996826eefa22432` | `F53-12-S129.png`<br>`compare-S129.png` | **부분 대조 · 차이/플랫폼 잔여**. Monthly/Member 선택화면. A기본Member라 Current plan표시; 실제 결제 원본Select와 다른 확정 계정 상태. |
| S130 팔로우 해제 안내<br>`sc_b606d8b25cf248c28200cbfd24da865f` | `F20-02-S130.png`<br>`compare-S130.png` | **부분 대조 · 차이/플랫폼 잔여**. Unfollow성공안내·다시Follow가능. toast폭/원본글반응수차이. |
| S131 재생 속도 2.5배 선택<br>`sc_b6f46f91fdc549b790b4e9c1a434afae` | `F27-03-S131.png`<br>`compare-S131.png` | **부분 대조 · 차이/플랫폼 잔여**. 2.5x490WPM/145%표시 일치. 웹 키보드 focus outline은 현재 입력 조건. |
| S132 Digest 일자별 추천<br>`sc_bafbf7b80b154e25aec15e120a13f72a` | `F41-04-S132.png`<br>`compare-S132.png` | **부분 대조 · 차이/플랫폼 잔여**. June12 Digest 선택·제목·첫 글 대조. 커버 crop/반응 실제 수치/회원 표시 차이. |
| S133 구매 성공 안내 팝업<br>`sc_bb00623f121d405abc840e589837c3fd` | `F54-04-S133.png`<br>`compare-S133.png` | **부분 대조 · 차이/플랫폼 잔여**. 모의확정 성공dialog. 원본 purchase문구를 mock membership문구로 구분; OSdialog대비앱레이어 차이. |
| S134 로그인 인증 코드 입력<br>`sc_bc8c0aff71644874a42b97e6c7fd4ce2` | `F52-06-S134.png`<br>`compare-S134.png` | **부분 대조 · 차이/플랫폼 잔여**. 모의6자리 코드123456/Validate 가능. 원본 인증코드를 사용하지 않음; 뒤로/모의 안내 차이. |
| S135 큐레이션 리스트 하단<br>`sc_bd0cb76562a74fb69a3569e15daf02ee` | `F04-05-S135.png`<br>`compare-S135.png` | **부분 대조 · 차이/플랫폼 잔여**. 하단 스크롤 실패였던 촬영을 실제 footer align으로 수정. 접힌 제목14·More 제목16·소개13으로 조정. 5/8안내 및 48터치 차이. |
| S136 프로필 편집 결과<br>`sc_be99c4fdcf634190a324ec9820a84f43` | `F57-07-S136.png`<br>`compare-S136.png` | **부분 대조 · 차이/플랫폼 잔여**. 사진/pronouns저장 후 동일userIDStories복귀. writtenrow반응bar연결/이미지 차이, Continue setup/Drafts 자체보완. |
| S137 이미지 삽입 후 편집기<br>`sc_bed3857c8edc4a02b07af1e095ad7fba` | `F08-07-S137.png`<br>`compare-S137.png` | **부분 대조 · 차이/플랫폼 잔여**. 준비 완료 이미지가 문서에 실제 삽입. 로컬 sunset과 원본 산/호수의 자산·비율 차이. |
| S138 대명사·소개 입력된 프로필<br>`sc_befb6fde38cc48f3827ea389caed11de` | `F57-06-S138.png`<br>`compare-S138.png` | **부분 대조 · 차이/플랫폼 잔여**. 사진선택·대명사·49·160소개 초안 대조. 검증용사진/여러줄웹입력과 원본한줄스크롤 차이. |
| S139 초안 목록<br>`sc_c020fbe7604a43569b5bf77da2725119` | `F10-03-S139.png`<br>`compare-S139.png` | **부분 대조 · 차이/플랫폼 잔여**. 저장 flush→초안 목록→같은초안재개 확인. 수정 시각은 현재mock시각, 원본1분을 고정하지 않음. |
| S140 응답 미리보기 끝<br>`sc_c068a6d42c5c48fb9d60c8af4adb446f` | `F16-06-S140.png`<br>`compare-S140.png` | **부분 대조 · 차이/플랫폼 잔여**. inlineReadmore/replies/Seeall 실제연결. 실제fixture자식수/edited표시와48행높이차이. |
| S141 2.5배 재생 표시<br>`sc_c0fd5f5f29594fb997865177863b9482` | `F27-04-S141.png`<br>`compare-S141.png` | **부분 대조 · 차이/플랫폼 잔여**. 2.5x 확정 후 player, 실제 경과와 고정원본 시간 차이. |
| S142 응답 수정 반영<br>`sc_c1a6af7cef31436a9cdd090eae87479f` | `F33-05-S142.png`<br>`compare-S142.png` | **부분 대조 · 차이/플랫폼 잔여**. 수정후동일댓글ID, edited표시. 자체성공토스트와원본계정차이. |
| S143 작가 더보기 액션<br>`sc_c25f22caf7cd49ba88c8611fb7480932` | `F18-02-S143.png`<br>`compare-S143.png` | **부분 대조 · 차이/플랫폼 잔여**. 작가Share/Mute/Block/Report/Cancel 실제sheet. nativeblur대비웹평면/행높이차이. |
| S144 다크 내 프로필<br>`sc_c31a2100ddcd41cba45b5081c69b78b5` | `F62-08-S144.png`<br>`compare-S144.png` | **부분 대조 · 차이/플랫폼 잔여**. Dark프로필·사진·발행결과. 원본rowbar와현재written문서row기능차이·재개/Drafts자체보완. |
| S145 저장한 하이라이트 목록<br>`sc_c37aefd0916548dda3cb46d61cc25193` | `F41-05-S145.png`<br>`compare-S145.png` | **부분 대조 · 차이/플랫폼 잔여**. 실제 저장한 개인 highlight1개를 조회. 원본3발췌와 본문·개수 차이, Remove highlight는 자체 복구 조작. |
| S146 토픽 지정된 발행 미리보기<br>`sc_c3bdb30e524c4709ae45998ec529a6c0` | `F07-06-S146.png`<br>`compare-S146.png` | **부분 대조 · 차이/플랫폼 잔여**. 토픽 Save→부모 preview 확인. 쉼표 문장을 원본 칩으로 교정, 부모 저장 계약 유지. |
| S147 기사 말미와 작성자 카드<br>`sc_c3fcf42b84be4b7298dfc138c224e241` | `F16-04-S147.png`<br>`compare-S147.png` | **부분 대조 · 차이/플랫폼 잔여**. 본문끝/토픽/작가소개/외부링크 연결. serif·태그48터치간격·설명/링크줄바꿈·자동헤더상태차이. |
| S148 이미지 추가 방식 선택<br>`sc_c609f8fa87b84b76bea6f312df2e3e0f` | `F08-04-S148.png`<br>`compare-S148.png` | **부분 대조 · 차이/플랫폼 잔여**. Take photo/Choose library/Unsplash/Cancel 실제 시트. 표준 iOS 자산/폰트·48논리 제어 차이. |
| S149 설정 하단<br>`sc_c653047933aa40b2be7a8f281643d41d` | `F58-03-S149.png`<br>`compare-S149.png` | **부분 대조 · 차이/플랫폼 잔여**. Settings하단Social/Help/정책/로그아웃 진입. 실제앱버전/readingtools별도영역·Facebook아이콘·스크롤 차이. |
| S150 글별 Lifetime 통계<br>`sc_c6580d2d071a4f079981013ccc658af4` | `stats-reference-S150.png`<br>`compare-S150.png` | **부분 대조 · 차이/플랫폼 잔여**. Lifetime 기간·Latest·동일 제목/23hours ago·글별0/0 비교. 정상 집계 공식으로 월간11/2와의 불일치를 설명하지 않음. 행/하단 탭 간격·원형 범례·font 차이. 별도June2025 비교 fixture11/2·Lifetime0/0; 정상F63와 구분. |
| S151 추천 토픽 팔로우 상태<br>`sc_c7deda6b53824957b587bd922cd55399` | `F13-04-S151.png`<br>`compare-S151.png` | **부분 대조 · 차이/플랫폼 잔여**. Topics추천5행/Following/Seemore 실제연결. 전체도메인관계동기화 유지, 행간/폰트차이. |
| S152 작가 음소거 안내<br>`sc_c8b24e7669734e74922bee69b751350b` | `F22-03-S152.png`<br>`compare-S152.png` | **부분 대조 · 차이/플랫폼 잔여**. Mute확정안내. 현재앞서Unfollow한상태라원본Following과다름; Mute가관계를임의변경하지않음. |
| S153 통계 그래프 날짜 선택<br>`sc_c8fa56a2dd5b4e959c333ea3e6d334e2` | `stats-reference-S153.png`<br>`compare-S153.png` | **부분 대조 · 차이/플랫폼 잔여**. June12 날짜 선택선·강조점·11/2 수치와 기간 대조. 원본 비교용 fixture이며 실제 분석 이벤트 아님. 글꼴·강조점/범례 원형 표현 차이. 별도June2025 비교 fixture11/2·Lifetime0/0; 정상F63와 구분. |
| S154 언어별 음성 목록 스크롤<br>`sc_ca2321d6dc9142e5a97e2734260c2b0f` | `F28-04-S154.png`<br>`compare-S154.png` | **부분 대조 · 차이/플랫폼 잔여**. German 이후 동일 후보. 스크롤 시작점 약20px 차이. |
| S155 리스트 이름 입력<br>`sc_ca3b32e4373a40fc84405838671eab27` | `F42-03-S155.png`<br>`compare-S155.png` | **부분 대조 · 차이/플랫폼 잔여**. About mindfulness17자/Public 선택 일치. 글꼴·토글 색/높이 차이. |
| S156 프로필 사진 소스 선택<br>`sc_cba29e82e4364a239d3e5423213fa670` | `F57-03-S156.png`<br>`compare-S156.png` | **부분 대조 · 차이/플랫폼 잔여**. Camera/Choosefromlibrary/Cancel시트 실제adapters연결. OSnative실행은 대기, 시트여백·서체 차이. |
| S157 항목 순서 변경<br>`sc_cdf564e8e6a144389299ff49a7d626ce` | `F51-04-S157.png`<br>`compare-S157.png` | **부분 대조 · 차이/플랫폼 잔여**. 동일 순서로 실제 변경. 웹 위/아래 조작은 native drag재현 아님; footer/modal/손잡이 자산 차이. |
| S158 기사 응답 입력<br>`sc_cebfd0ad696f4e20a1c7d99da1dc1cef` | `F31-02-S158.png`<br>`compare-S158.png` | **부분 대조 · 차이/플랫폼 잔여**. 작성 초안/활성 제출, OS키보드는 미검증. |
| S159 멤버 가입 완료 화면<br>`sc_cf306e89e43144029ce108cb5338132a` | `F54-05-S159.png`<br>`compare-S159.png` | **부분 대조 · 차이/플랫폼 잔여**. Member확정 환영/Start reading 복귀. mock문구/대체serif와 위치·48터치 차이. |
| S160 재생 진행 상태<br>`sc_d035c7d2bcfe4d0f99df80fddecebdcd` | `F26-05-S160.png`<br>`compare-S160.png` | **부분 대조 · 차이/플랫폼 잔여**. 30초 이동 실제 조작. 원본40초를 조작 없이 고정하지 않음. |
| S161 사용자 신고 사유 선택<br>`sc_d07b03740ecc44328719d4d21703bb06` | `F23-03-S161.png`<br>`compare-S161.png` | **부분 대조 · 차이/플랫폼 잔여**. Reportuser미선택/비활성·정책링크. 추가설명/Mock안내자체보완, native폼과여백차이. |
| S162 다이제스트 설정<br>`sc_d17bad2e556e4b0abfdc9541f90c46f2` | `F44-02-S162.png`<br>`compare-S162.png` | **부분 대조 · 차이/플랫폼 잔여**. Frequency/Push/Email 같은 기준 상태 대조. 외부 이동 표현과 내부 mock설정 연결 차이 명시. |
| S163 공유 카드 시트<br>`sc_d1c962cd0a8240ee94769a612a81d64f` | `F39-02-S163.png`<br>`compare-S163.png` | **부분 대조 · 차이/플랫폼 잔여**. Share시트첫페이지/카드/도구연결. 자체gradient·invalid미리보기URL·48접근버튼/서체차이. |
| S164 다크 기사 본문<br>`sc_d1d05d6500f349d89c5a3e5646ff238b` | `F24-09-S164.png`<br>`compare-S164.png` | **부분 대조 · 차이/플랫폼 잔여**. 동일 발췌/삽입 이미지, 대체 serif와 스크롤 정렬 차이. 미수록 본문은 창작하지 않음. |
| S165 리스트 다운로드 진행<br>`sc_d23a5b4ea6ff462f8a05ce2371e90734` | `F48-02-S165.png`<br>`compare-S165.png` | **부분 대조 · 차이/플랫폼 잔여**. 목록 다운로드 진행중 stop아이콘/현재 실제 준비 상태. source시각/Viewed/회원표시 차이. |
| S166 가입 공급자 선택<br>`sc_d55739aa2ac1495da026006235e7c0a7` | `F52-01-S166.png`<br>`compare-S166.png` | **부분 대조 · 차이/플랫폼 잔여**. 가입 방법·문구·배치 대조. mock 표시/닫기 추가와 대체 serif 굵기 차이. |
| S167 내 소개 빈 상태<br>`sc_d55f02281f894078a734269d60de79c4` | `F55-05-S167.png`<br>`compare-S167.png` | **부분 대조 · 차이/플랫폼 잔여**. About빈 상태/short bio편집 진입. Continue setup·48터치·설명 간격 차이. |
| S168 기사 더보기 메뉴<br>`sc_d62e32234117483b85b4c73ed63249cd` | `F24-02-S168.png`<br>`compare-S168.png` | **부분 대조 · 차이/플랫폼 잔여**. 기사메뉴Followpill을원본plainFollowauthor행으로수정. 공통관계저장소/접근성label·실패복구유지, nativeblur/행높이차이. |
| S169 발행 글과 반응 있는 프로필<br>`sc_d76d3680605f4b62ab31e3039d6c4fe6` | `F55-03-S169.png`<br>`compare-S169.png` | **부분 대조 · 차이/플랫폼 잔여**. 실제발행글 조회/진입 확인. 원본사진·반응/저장/더보기 bar와 현재written문서 row 차이 잔여; 발행날짜는 현재값. |
| S170 사용자 신고 성공 안내<br>`sc_d9ba56fa632249c7908f15a8e3082d97` | `F23-05-S170.png`<br>`compare-S170.png` | **부분 대조 · 차이/플랫폼 잔여**. 모의신고확정안내·기존화면복귀. 외부신고없음, toast/서체차이. |
| S171 이메일 로그인 빈 폼<br>`sc_da2ab413cfe5481d9abe4f23eeaeb426` | `F52-03-S171.png`<br>`compare-S171.png` | **부분 대조 · 차이/플랫폼 잔여**. Email로그인 빈 상태 대조. 예약된 example.test 입력 보조/실제 정보 입력 금지 안내가 자체 추가. |
| S172 저장 아이콘 활성<br>`sc_dda8e78e9eb943629d3cf54eaed5fc22` | `F37-03-S172.png`<br>`compare-S172.png` | **부분 대조 · 차이/플랫폼 잔여**. Done 후 북마크채움. 원본834댓글과현재7은다름. |
| S173 설정 상단<br>`sc_ddd51660cb8346a1b200ed970a2d5c45` | `F58-02-S173.png`<br>`compare-S173.png` | **부분 대조 · 차이/플랫폼 잔여**. Settings상단항목/Appearance/Systemdefault 대조. mockmember현재값·Email내부진입·48행높이 차이. |
| S174 팔로우 추천 가로 스크롤<br>`sc_dfdd5f6377a848c59b3512417cb47490` | `F01-06-S174.png`<br>`compare-S174.png` | **부분 대조 · 차이/플랫폼 잔여**. Daily Dollar publication은 원본처럼 사각 avatar, Alex Mathers 확인된 배지 복원. 두 번째 가로 스크롤 맥락 확인. |
| S175 본문 아래 응답 미리보기<br>`sc_e1a92b59829c4678b3362d2dc6abae59` | `F16-05-S175.png`<br>`compare-S175.png` | **부분 대조 · 차이/플랫폼 잔여**. inlineResponses제목/작성자/입력·policy누락수정. 공유프로필아바타와실제7응답, 원본834/작성자Member배지차이. |
| S176 Featured 빈 상태<br>`sc_e1cf4be8210f432098943d8a233d9d72` | `F05-03-S176.png`<br>`compare-S176.png` | **부분 대조 · 차이/플랫폼 잔여**. Featured빈공급부 조건으로실제빈화면 촬영, 임시공급부는 finally복원. 정상피드와 구분하며 source빈문구/여백·서체차이. |
| S177 리스트 상세 스크롤<br>`sc_e20e59ee459b4a0d9a0a0302091962bd` | `F45-01-S177.png`<br>`compare-S177.png` | **부분 대조 · 차이/플랫폼 잔여**. 목록 스크롤 맥락/메모/3기사 대조. Viewed 실제 기록·기사 제목 폭·메모/날짜행 높이 차이. |
| S178 프로필에 발행 글 표시<br>`sc_e3b2276c9abd4bc7b08e6e4c322dee9e` | `F08-11-S178.png`<br>`compare-S178.png` | **부분 대조 · 차이/플랫폼 잔여**. mock 발행→본인 Stories 실제 연결. 계정/온보딩 재개/초안 진입·시각은 현재 정책. 글 카드 북마크/메뉴 원본과 차이: F55 추가 검토 필요. |
| S179 박수 피드백 종료<br>`sc_e3b85b46c655483eb954e6f953d0b7f6` | `F38-03-S179.png`<br>`compare-S179.png` | **부분 대조 · 차이/플랫폼 잔여**. 박수피드백종료후내기여유지. 원본832와현재7응답·실제저장상태차이. |
| S180 멘션 입력 시작<br>`sc_e3c9949b35ca4bc7b3328ee4e887fc5a` | `F11-02-S180.png`<br>`compare-S180.png` | **부분 대조 · 차이/플랫폼 잔여**. @ 진입. End 키가 줄 끝에 삽입했던 촬영 입력을 문서 끝 입력으로 보정; OS키보드 미검증. |
| S181 본인 응답 관리 메뉴<br>`sc_e4b254a2635b47069e314a1462c985d6` | `F32-02-S181.png`<br>`compare-S181.png` | **부분 대조 · 차이/플랫폼 잔여**. 자기 댓글 Edit/Delete 메뉴. 웹48행/위치/nativeblur 차이. |
| S182 로그인 수단 선택<br>`sc_e4d414380a1047a2b7970cf7869a0866` | `F52-02-S182.png`<br>`compare-S182.png` | **부분 대조 · 차이/플랫폼 잔여**. 로그인 Google/Facebook/Apple/X/Email 대조. 실제 OAuth 없음, mock/닫기·서체 차이. |
| S183 인용 서식 적용<br>`sc_e5826f356093493a86c19716420e8fdf` | `F09-03-S183.png`<br>`compare-S183.png` | **부분 대조 · 차이/플랫폼 잔여**. 인용 세로선·이탤릭·같은 내용/이미지 유지. 글꼴·키보드·선택 범위 차이. |
| S184 알림 활성화 안내<br>`sc_e9f4c426cfb3426d9ca05121dea00ce3` | `F53-11-S184.png`<br>`compare-S184.png` | **부분 대조 · 차이/플랫폼 잔여**. 알림 Enable/Skip 대조. 웹 unsupported실제권한 안내/닫기 추가로 중앙 위치 차이; OS허용으로 표시하지 않음. |
| S185 다크 Explore<br>`sc_eaaa223bd5c84facb010485d0f797e76` | `F62-04-S185.png`<br>`compare-S185.png` | **부분 대조 · 차이/플랫폼 잔여**. DarkExplore/검색/Trending 연결. 원본시점추천과현재fixture순위·주제가다름. |
| S186 푸시 알림 상세 설정<br>`sc_ee2e76b092df4d309bfd0633f25273a6` | `F59-02-S186.png`<br>`compare-S186.png` | **부분 대조 · 차이/플랫폼 잔여**. Push기본토글/Tailored컨트롤 대조.48행높이누적으로하단원본보다더스크롤; OS권한과수신선호분리. |
| S187 설정 닫힌 다크 기사<br>`sc_ee957cf03e9848948f9ec8189264d8d8` | `F24-08-S187.png`<br>`compare-S187.png` | **부분 대조 · 차이/플랫폼 잔여**. Dark120% 제목/사진/배지 구조 일치, 원본 폰트/제목 행높이와 Follow 테두리 차이. |
| S188 월간 글 통계<br>`sc_eece99396c944a4fac5e50820715f00a` | `stats-reference-S188.png`<br>`compare-S188.png` | **부분 대조 · 차이/플랫폼 잔여**. 원본 조건용 June2025 월간11/2를 명시 주입해 제목·기간·축/그래프·범례 배치 대조. 원본 선/범례 원형과 현재 채움·서체/아이콘 미세 차이. 정상 현재월0/0은 F63 별도 보존. 별도June2025 비교 fixture11/2·Lifetime0/0; 정상F63와 구분. |
| S189 기사 본문 스크롤<br>`sc_f4b06612bdbf48ecbd8a7b6e2607d117` | `F16-03-S189.png`<br>`compare-S189.png` | **부분 대조 · 차이/플랫폼 잔여**. 동일본문발췌·강조/구분선대조. 대체serif와스크롤방향에따른자동헤더숨김; 미수록문단안내자체추가. |
| S190 읽기 기록 목록<br>`sc_f4bb3fa34f32466b9bd12eea57ea518f` | `F12-03-S190.png`<br>`compare-S190.png` | **부분 대조 · 차이/플랫폼 잔여**. 읽기이력Clear/기사행·삭제 실제연결. 첫기사동일, 이후기사/응답수·줄바꿈은현재mock기록. |
| S191 메모 내용 입력<br>`sc_f4f970015d6743538664901310d2c17b` | `F45-04-S191.png`<br>`compare-S191.png` | **부분 대조 · 차이/플랫폼 잔여**. 동일 메모 입력과 확정 가능 상태. 제목 줄바꿈·카드/버튼 높이 차이. |
| S192 음성 선택 후 플레이어<br>`sc_f637c648d6ec470a81cf77e5594e02da` | `F28-06-S192.png`<br>`compare-S192.png` | **부분 대조 · 차이/플랫폼 잔여**. 선택 목소리 확정 후 player. 실제 오디오가 없는 mock과 배경 차이. |
| S193 다이제스트 날짜 선택<br>`sc_f647f3c6b04d48e9bb1b31f5d0fb2cfe` | `F43-02-S193.png`<br>`compare-S193.png` | **부분 대조 · 차이/플랫폼 잔여**. Digest history10발행분/선택/Done 연결. mock의 실제 발행 날짜 간격을 보존해 원본 연속10일과 다름. |
| S194 추천 유형 필터 메뉴<br>`sc_f978feb6af9f44b5a5fa8f514899f3da` | `F13-02-S194.png`<br>`compare-S194.png` | **부분 대조 · 차이/플랫폼 잔여**. All/Writers/Publications/Topics 선택·체크 대조. nativeblur/44원본행과48논리영역 차이. |
| S195 리스트 항목 메뉴<br>`sc_fa4e79f0bed747d698ae44e23f9223f9` | `F45-02-S195.png`<br>`compare-S195.png` | **부분 대조 · 차이/플랫폼 잔여**. 해당 기사 Add note/Remove/Report 메뉴 연결. native anchored blur 대신 웹 메뉴·48행으로 위치/높이 다름. |
| S196 멘션 검색 후보<br>`sc_fbca217fbc1346d09deb4c0d09dac86e` | `F11-03-S196.png`<br>`compare-S196.png` | **부분 대조 · 차이/플랫폼 잔여**. Sam Lee 동명이인 handle·canonical ID 검색. 원본 프로필 사진 대신 로컬 initials이며 외부 계정 조회 아님. |
| S197 구절 인용 응답 등록<br>`sc_fcdcd471caeb41b8bfa89273d8e29a8d` | `F29-04-S197.png`<br>`compare-S197.png` | **부분 대조 · 차이/플랫폼 잔여**. 인용 댓글 확정. 실제 프로필 이름/8건/성공토스트는 현재 mock상태. |
| S198 다크 테마 적용<br>`sc_fd7de1ebfba14fbca6ddbe3ff642c42c` | `F24-06-S198.png`<br>`compare-S198.png` | **부분 대조 · 차이/플랫폼 잔여**. Dark reader 선택. 원본 배경의 디밍과 실제 modal/테마 차이; 본문 폰트와 댓글 수 차이. |
| S199 작가 차단 안내<br>`sc_ff143e1e9b4d4e5ab0579b3fdc61dc1a` | `F18-03-S199.png`<br>`compare-S199.png` | **부분 대조 · 차이/플랫폼 잔여**. 차단확정·성공알림. 현재앱은차단글/목록을숨기는명시정책으로 원본즉시화면의글노출과다름. |
| S200 리스트 항목 메모 폼<br>`sc_ffa4d0c8f01440e1a0842a4e1a59708a` | `F45-03-S200.png`<br>`compare-S200.png` | **부분 대조 · 차이/플랫폼 잔여**. 빈 메모/선택 기사/Done form 대조. 원본 이미지 자산과 현재 fixture crop·필드 focus 차이. |

## C01~C72 컨트롤 감사

각 묶음의 조작/사용처/근거를 대조했다. 아래 관련 검사는 최종 전체 검사에 포함되며 navigation 대역이 아닌 실제 React Navigation을 사용한다. 시각/native/미수록 잔여는 검사를 통과해도 자동으로 해소되지 않는다. `controls-final.json`에 같은 대응을 보존했다.

| 항목 | 코드/현재 검사·흐름 근거 | 판정·잔여 |
| --- | --- | --- |
| C01 글꼴·본문 serif·아이콘·토큰·좌표·행간·줄바꿈·이미지 crop | `shared/theme · shared/ui` · [DisplayNavigation.test](../FE/src/app/navigation/DisplayNavigation.test.tsx) · F24, F62 | 원본 서체/vector·OS 큰 글자·Safe Area·IME·스크린리더 잔여 |
| C02 Light/Dark/System·OS 추종·시트/입력/카드 테마 | `shared/theme · shared/ui` · [DisplayNavigation.test](../FE/src/app/navigation/DisplayNavigation.test.tsx) · F24, F62 | 원본 서체/vector·OS 큰 글자·Safe Area·IME·스크린리더 잔여 |
| C03 48×48 터치·큰 글자·Safe Area·키보드·VoiceOver/TalkBack | `shared/theme · shared/ui` · [DisplayNavigation.test](../FE/src/app/navigation/DisplayNavigation.test.tsx) · F24, F62 | 원본 서체/vector·OS 큰 글자·Safe Area·IME·스크린리더 잔여 |
| C04 For you/Following/Featured·+·알림·Write·하단 탭 | `feed · recommendations` · [RecommendationsNavigation.test](../FE/src/app/navigation/RecommendationsNavigation.test.tsx) · F05, F12–F15, F16 | For you/Following/Featured는 fixture 정렬; 실제 추천 알고리즘 아님 |
| C05 For you 카드 −·더보기·Show less·관심사 편집 | `feed · recommendations` · [RecommendationsNavigation.test](../FE/src/app/navigation/RecommendationsNavigation.test.tsx) · F05, F12–F15, F16 | For you/Following/Featured는 fixture 정렬; 실제 추천 알고리즘 아님 |
| C06 토픽 가로 이동·Trending·Staff Picks·Recommended for you·Who to follow | `search` · [SearchCategoriesNavigation.test](../FE/src/app/navigation/SearchCategoriesNavigation.test.tsx) · F01–F02 | 다섯 검색 유형·복귀 연결; 미수록 결과는 자체 fixture/로컬 페이지 |
| C07 검색어·clear·취소·Stories/People/Publications/Topics/Lists·결과 이동 | `search` · [SearchCategoriesNavigation.test](../FE/src/app/navigation/SearchCategoriesNavigation.test.tsx) · F01–F02 | 다섯 검색 유형·복귀 연결; 미수록 결과는 자체 fixture/로컬 페이지 |
| C08 Follow/Following·토픽 공유·큐레이션 미리보기·publication 관계 | `topics · community` · [TopicNavigation.test](../FE/src/app/navigation/TopicNavigation.test.tsx) · F03–F04 | 토픽/큐레이션 연결; 일부 미수록 기사·자산 차이 |
| C09 원문/읽기 도구·유료 배지·관련 글·작성자·토픽·반응 영역 | `article · reactions · reading-history · settings` · [ClapHistoryNavigation.test](../FE/src/app/navigation/ClapHistoryNavigation.test.tsx) · F16, F24, F38 | 원문/카운트 공유·표시 설정; 원본 누적 응답/박수와 현재 fixture 구분 |
| C10 누적 claps·내 기여·피드백 수·다른 카드 수 동기화·Undo claps·박수 사용자 목록 | `article · reactions · reading-history · settings` · [ClapHistoryNavigation.test](../FE/src/app/navigation/ClapHistoryNavigation.test.tsx) · F16, F24, F38 | 원문/카운트 공유·표시 설정; 원본 누적 응답/박수와 현재 fixture 구분 |
| C11 Viewed·읽은 제목 색·읽기 이력 발생 | `article · reactions · reading-history · settings` · [ClapHistoryNavigation.test](../FE/src/app/navigation/ClapHistoryNavigation.test.tsx) · F16, F24, F38 | 원문/카운트 공유·표시 설정; 원본 누적 응답/박수와 현재 fixture 구분 |
| C12 Show less / Display / Follow / Mute / Report story | `article · reactions · reading-history · settings` · [ClapHistoryNavigation.test](../FE/src/app/navigation/ClapHistoryNavigation.test.tsx) · F16, F24, F38 | 원문/카운트 공유·표시 설정; 원본 누적 응답/박수와 현재 fixture 구분 |
| C13 Font size 100%/120%·Font·Theme·Show highlights | `article · reactions · reading-history · settings` · [ClapHistoryNavigation.test](../FE/src/app/navigation/ClapHistoryNavigation.test.tsx) · F16, F24, F38 | 원문/카운트 공유·표시 설정; 원본 누적 응답/박수와 현재 fixture 구분 |
| C14 Responses 열기·수/목록·Most relevant/Most recent·policy | `responses` · [ResponsesNavigation.test](../FE/src/app/navigation/ResponsesNavigation.test.tsx) · F29–F36 | 본문 policy·composer 프로필 보완; 원본834개와 실제 응답 수 구분 |
| C15 작성·수정·삭제 확인·Cancel/Save/Publish·실패 입력 유지 | `responses` · [ResponsesNavigation.test](../FE/src/app/navigation/ResponsesNavigation.test.tsx) · F29–F36 | 본문 policy·composer 프로필 보완; 원본834개와 실제 응답 수 구분 |
| C16 부모 댓글·답글 작성·Hide replies·See more replies | `responses` · [ResponsesNavigation.test](../FE/src/app/navigation/ResponsesNavigation.test.tsx) · F29–F36 | 본문 policy·composer 프로필 보완; 원본834개와 실제 응답 수 구분 |
| C17 댓글/답글 claps·Read more·작성자 메뉴 | `responses` · [ResponsesNavigation.test](../FE/src/app/navigation/ResponsesNavigation.test.tsx) · F29–F36 | 본문 policy·composer 프로필 보완; 원본834개와 실제 응답 수 구분 |
| C18 이야기 작성자의 응답 숨김·토론 종료·권한/확인 | `responses` · [ResponsesNavigation.test](../FE/src/app/navigation/ResponsesNavigation.test.tsx) · F29–F36 | 본문 policy·composer 프로필 보완; 원본834개와 실제 응답 수 구분 |
| C19 문구 선택 핸들·Highlight/Respond/Share/더보기 | `highlights · responses` · [HighlightsNavigation.test](../FE/src/app/navigation/HighlightsNavigation.test.tsx) · F25, F29 | 웹 selection API/합성 선택과 native 선택 핸들 검증은 다름 |
| C20 highlight 저장/해제·타인 표시·Library Highlights·인용 응답 | `highlights · responses` · [HighlightsNavigation.test](../FE/src/app/navigation/HighlightsNavigation.test.tsx) · F25, F29 | 웹 selection API/합성 선택과 native 선택 핸들 검증은 다름 |
| C21 Stories/Lists/About·고정 이야기·Member/Friend 정보·웹사이트 | `community · moderation` · [CommunityNavigation.test](../FE/src/app/navigation/CommunityNavigation.test.tsx) · F17–F23 | 작성자 Lists 저장/공유 추가; 차단 후 앱의 숨김 정책은 원본 화면과 차이 |
| C22 Follow/Following/Unfollow·팔로워/Following list·이메일 수신 | `community · moderation` · [CommunityNavigation.test](../FE/src/app/navigation/CommunityNavigation.test.tsx) · F17–F23 | 작성자 Lists 저장/공유 추가; 차단 후 앱의 숨김 정책은 원본 화면과 차이 |
| C23 Share author / Mute / Block / Report / Cancel | `community · moderation` · [CommunityNavigation.test](../FE/src/app/navigation/CommunityNavigation.test.tsx) · F17–F23 | 작성자 Lists 저장/공유 추가; 차단 후 앱의 숨김 정책은 원본 화면과 차이 |
| C24 작가/기사 대상·이유·추가 설명·Also block·정책/권리 링크·Report this item·Blocked users | `community · moderation` · [CommunityNavigation.test](../FE/src/app/navigation/CommunityNavigation.test.tsx) · F17–F23 | 작성자 Lists 저장/공유 추가; 차단 후 앱의 숨김 정책은 원본 화면과 차이 |
| C25 Following/Reading history/Muted/Suggestions·See all/See more | `recommendations · reading-history` · [RecommendationsNavigation.test](../FE/src/app/navigation/RecommendationsNavigation.test.tsx) · F12–F15 | Following All 그룹·See all 보완; 실제 저장소 순서/개수 사용 |
| C26 All/Writers/Publications/Topics·follow·mute 해제 | `recommendations · reading-history` · [RecommendationsNavigation.test](../FE/src/app/navigation/RecommendationsNavigation.test.tsx) · F12–F15 | Following All 그룹·See all 보완; 실제 저장소 순서/개수 사용 |
| C27 개별 기록 제거·Clear history·확인/취소·Library 이력 진입 | `recommendations · reading-history` · [RecommendationsNavigation.test](../FE/src/app/navigation/RecommendationsNavigation.test.tsx) · F12–F15 | Following All 그룹·See all 보완; 실제 저장소 순서/개수 사용 |
| C28 Save to·여러 목록·선택 초안·Done·새 목록 생성 | `bookmarks · public-lists` · [PublicListsNavigation.test](../FE/src/app/navigation/PublicListsNavigation.test.tsx) · F04, F37, F41 | 기사 저장/타인 목록 저장 구분; 공개 목록8개 중 확인된 기사5개 |
| C29 전체 목록 Save/해제·저장 수·Saved lists·소유자/방문자 | `bookmarks · public-lists` · [PublicListsNavigation.test](../FE/src/app/navigation/PublicListsNavigation.test.tsx) · F04, F37, F41 | 기사 저장/타인 목록 저장 구분; 공개 목록8개 중 확인된 기사5개 |
| C30 목록 claps·목록 responses·소유자 Follow·Share·Undo claps·박수 사용자 목록 | `bookmarks · public-lists` · [PublicListsNavigation.test](../FE/src/app/navigation/PublicListsNavigation.test.tsx) · F04, F37, F41 | 기사 저장/타인 목록 저장 구분; 공개 목록8개 중 확인된 기사5개 |
| C31 목록 제목/설명 편집·읽기 목록·새 목록·행별 더보기 | `bookmarks · public-lists` · [ListEditingNavigation.test](../FE/src/app/navigation/ListEditingNavigation.test.tsx) · F42, F45–F51 | 소유 목록 반응·privacy/delete 안내 보완; native drag 형태는 미동등 |
| C32 Add/Edit note·취소/저장·빈값 Done·기존 메모 지우기·공개 범위 | `bookmarks · public-lists` · [ListEditingNavigation.test](../FE/src/app/navigation/ListEditingNavigation.test.tsx) · F42, F45–F51 | 소유 목록 반응·privacy/delete 안내 보완; native drag 형태는 미동등 |
| C33 Reorder·드래그·Cancel/Done·확정 순서 | `bookmarks · public-lists` · [ListEditingNavigation.test](../FE/src/app/navigation/ListEditingNavigation.test.tsx) · F42, F45–F51 | 소유 목록 반응·privacy/delete 안내 보완; native drag 형태는 미동등 |
| C34 Make private 확인·타인 저장 목록 경고·잠금·공유 아이콘 | `bookmarks · public-lists` · [ListEditingNavigation.test](../FE/src/app/navigation/ListEditingNavigation.test.tsx) · F42, F45–F51 | 소유 목록 반응·privacy/delete 안내 보완; native drag 형태는 미동등 |
| C35 Remove story·Undo·Delete list·확인/취소 | `bookmarks · public-lists` · [ListEditingNavigation.test](../FE/src/app/navigation/ListEditingNavigation.test.tsx) · F42, F45–F51 | 소유 목록 반응·privacy/delete 안내 보완; native drag 형태는 미동등 |
| C36 Download list·진행/완료·개별 기사 상태·취소/제거/실패 | `downloads` · [DownloadsNavigation.test](../FE/src/app/navigation/DownloadsNavigation.test.tsx) · F48 | 메모리 다운로드; 재시작 후 영속 offline 아님 |
| C37 Your lists/Saved lists/Highlights/Reading history·Digest | `bookmarks · digest · notifications` · [DigestNavigation.test](../FE/src/app/navigation/DigestNavigation.test.tsx) · F41, F43–F44 | 최근10개 발행분 정책; Frequency/Email 세부 미수록 옵션 자체 보완 |
| C38 날짜 선택/Done·해당 이야기·last 10 digests | `bookmarks · digest · notifications` · [DigestNavigation.test](../FE/src/app/navigation/DigestNavigation.test.tsx) · F41, F43–F44 | 최근10개 발행분 정책; Frequency/Email 세부 미수록 옵션 자체 보완 |
| C39 Daily 빈도·Push chevron·Email 외부 링크·설정 복귀 | `bookmarks · digest · notifications` · [DigestNavigation.test](../FE/src/app/navigation/DigestNavigation.test.tsx) · F41, F43–F44 | 최근10개 발행분 정책; Frequency/Email 세부 미수록 옵션 자체 보완 |
| C40 제목/본문·서식 툴바·헤더/강조/링크/인용/목록/구분선/코드 | `editor` · [EditorImagesNavigation.test](../FE/src/app/navigation/EditorImagesNavigation.test.tsx) · F08–F11 | 툴바/이미지 준비/서식 보완; native picker·IME·키보드 미검증 |
| C41 이미지 메뉴·Camera/Library·Unsplash 검색/로딩/선택·삭제 X | `editor` · [EditorImagesNavigation.test](../FE/src/app/navigation/EditorImagesNavigation.test.tsx) · F08–F11 | 툴바/이미지 준비/서식 보완; native picker·IME·키보드 미검증 |
| C42 Drafts 메뉴·초안 목록/재개·자동 저장/실패 | `editor` · [EditorImagesNavigation.test](../FE/src/app/navigation/EditorImagesNavigation.test.tsx) · F08–F11 | 툴바/이미지 준비/서식 보완; native picker·IME·키보드 미검증 |
| C43 @ 검색·핸들/아바타·동명이인·선택/삭제·멘션 대상 | `editor` · [EditorImagesNavigation.test](../FE/src/app/navigation/EditorImagesNavigation.test.tsx) · F08–F11 | 툴바/이미지 준비/서식 보완; native picker·IME·키보드 미검증 |
| C44 토픽 검색·최대 5개·chip 제거·검색 X·완료 | `editor · profile` · [PublishingNavigation.test](../FE/src/app/navigation/PublishingNavigation.test.tsx) · F07–F08, F55 | 발행 canonical 연결; 작성 글의 fixture 기사 반응/저장 bar 미통합 |
| C45 미리보기 Edit/Topics/Publication/Unlisted/Publish now·내 Stories | `editor · profile` · [PublishingNavigation.test](../FE/src/app/navigation/PublishingNavigation.test.tsx) · F07–F08, F55 | 발행 canonical 연결; 작성 글의 fixture 기사 반응/저장 bar 미통합 |
| C46 가입 제공자 4개·로그인 X 포함 5개·intro/로그인 전환 | `auth` · [EmailAuthNavigation.test](../FE/src/app/navigation/EmailAuthNavigation.test.tsx) · F52, F61 | fixture 인증/메모리 세션; 실제 OAuth/메일 아님 |
| C47 이메일·이름·6자리 코드·재전송·활성 상태·닫기/뒤로 | `auth` · [EmailAuthNavigation.test](../FE/src/app/navigation/EmailAuthNavigation.test.tsx) · F52, F61 | fixture 인증/메모리 세션; 실제 OAuth/메일 아님 |
| C48 세션 복구·mock A/B·로그아웃 확인→intro·계정 데이터 정리 | `auth` · [EmailAuthNavigation.test](../FE/src/app/navigation/EmailAuthNavigation.test.tsx) · F52, F61 | fixture 인증/메모리 세션; 실제 OAuth/메일 아님 |
| C49 관심사 최소 3개·Continue·Follow/Finish·재진입 | `onboarding · notifications` · [OnboardingNavigation.test](../FE/src/app/navigation/OnboardingNavigation.test.tsx) · F53 | 관심사/재개와 OS 권한 분리; actual native 요청 미검증 |
| C50 알림 Enable/Skip·새 경험 안내·멤버십 제안 | `onboarding · notifications` · [OnboardingNavigation.test](../FE/src/app/navigation/OnboardingNavigation.test.tsx) · F53 | 관심사/재개와 OS 권한 분리; actual native 요청 미검증 |
| C51 사진 Camera/Library·부모 Save·이름·short bio·50/160 표시 | `profile · community` · [ProfileDetailsNavigation.test](../FE/src/app/navigation/ProfileDetailsNavigation.test.tsx) · F55–F57 | 사진/대명사 부모 초안·Save; OS 사진 화면 미동등/Stories bar 잔여 |
| C52 pronouns 최대 4개·검색/선택·Done→부모 Save/Cancel | `profile · community` · [ProfileDetailsNavigation.test](../FE/src/app/navigation/ProfileDetailsNavigation.test.tsx) · F55–F57 | 사진/대명사 부모 초안·Save; OS 사진 화면 미동등/Stories bar 잔여 |
| C53 About 데스크톱 안내·내 Stories/Public 필터·Lists·팔로우 진입 | `profile · community` · [ProfileDetailsNavigation.test](../FE/src/app/navigation/ProfileDetailsNavigation.test.tsx) · F55–F57 | 사진/대명사 부모 초안·Save; OS 사진 화면 미동등/Stories bar 잔여 |
| C54 Monthly/Lifetime·날짜/월·Views/Reads·그래프·Stories·Latest | `story-stats` · [StoryStatsNavigation.test](../FE/src/app/navigation/StoryStatsNavigation.test.tsx) · F63 | 정상0/0과 원본 비교11/2 분리; 펼친 메뉴 원본 미수록 |
| C55 유형별 목록·팔로우 버튼·작가/기사/목록/응답 대상·복귀 | `notifications` · [NotificationNavigation.test](../FE/src/app/navigation/NotificationNavigation.test.tsx) · F06, F44, F59 | 대상/읽음/설정 연결; 녹색 표시 의미·Tailored/Email 옵션 자체 보완 |
| C56 Digest/Top stories/Editors/Featured/Applause/Saves 토글 | `notifications` · [NotificationNavigation.test](../FE/src/app/navigation/NotificationNavigation.test.tsx) · F06, F44, F59 | 대상/읽음/설정 연결; 녹색 표시 의미·Tailored/Email 옵션 자체 보완 |
| C57 Tailored for you·새 글/박수/highlight/응답/mentions·Email | `notifications` · [NotificationNavigation.test](../FE/src/app/navigation/NotificationNavigation.test.tsx) · F06, F44, F59 | 대상/읽음/설정 연결; 녹색 표시 의미·Tailored/Email 옵션 자체 보완 |
| C58 Listen 로딩·미니/확장·play/pause/close·시간·10초/30초 이동 | `listening` · [ListeningNavigation.test](../FE/src/app/navigation/ListeningNavigation.test.tsx) · F26–F28 | 시간/속도/음성은 silent mock; 실제 음원·TTS·AirPlay 미연결 |
| C59 속도 1→2.5·WPM·선택 확인/취소·이전/다음 상태 | `listening` · [ListeningNavigation.test](../FE/src/app/navigation/ListeningNavigation.test.tsx) · F26–F28 | 시간/속도/음성은 silent mock; 실제 음원·TTS·AirPlay 미연결 |
| C60 Emma→Hans·음성 언어/메타데이터·검색·선택 | `listening` · [ListeningNavigation.test](../FE/src/app/navigation/ListeningNavigation.test.tsx) · F26–F28 | 시간/속도/음성은 silent mock; 실제 음원·TTS·AirPlay 미연결 |
| C61 AirPlay/Select voice/View story/Show less/Mute/Report·Share | `listening` · [ListeningNavigation.test](../FE/src/app/navigation/ListeningNavigation.test.tsx) · F26–F28 | 시간/속도/음성은 silent mock; 실제 음원·TTS·AirPlay 미연결 |
| C62 기사 카드·스타일 페이지 점·Copy link 토스트·Friend link | `sharing` · [SharingNavigation.test](../FE/src/app/navigation/SharingNavigation.test.tsx) · F25, F39–F40 | 대상별 preview URL/웹 download; actual OS sheet/앨범 미검증 |
| C63 Share via OS sheet·Save image·앨범 권한/실패/취소 | `sharing` · [SharingNavigation.test](../FE/src/app/navigation/SharingNavigation.test.tsx) · F25, F39–F40 | 대상별 preview URL/웹 download; actual OS sheet/앨범 미검증 |
| C64 인용·작성자·토픽·공개/내 목록의 대상별 공유 | `sharing` · [SharingNavigation.test](../FE/src/app/navigation/SharingNavigation.test.tsx) · F25, F39–F40 | 대상별 preview URL/웹 download; actual OS sheet/앨범 미검증 |
| C65 Member/Friend·월간/연간·가격/혜택·loading/success/Welcome | `membership` · [MembershipNavigation.test](../FE/src/app/navigation/MembershipNavigation.test.tsx) · F54 | 모의 구매·자격; 실제 결제/영수증/갱신 없음 |
| C66 구독 상태·오디오/오프라인 혜택·Friend link/아이콘 자격·기사 paywall 진입 | `membership` · [MembershipNavigation.test](../FE/src/app/navigation/MembershipNavigation.test.tsx) · F54 | 모의 구매·자격; 실제 결제/영수증/갱신 없음 |
| C67 Account/Membership & payment/Email/Facebook 연결 | `settings` · [SettingsExtrasNavigation.test](../FE/src/app/navigation/SettingsExtrasNavigation.test.tsx) · F58, F61 | 모의 계정 연결/허용 외부 링크; 실제 연결 계정 변경 없음 |
| C68 Help/Terms/Privacy/Rate/More controls·외부 링크·복귀 | `settings` · [SettingsExtrasNavigation.test](../FE/src/app/navigation/SettingsExtrasNavigation.test.tsx) · F58, F61 | 모의 계정 연결/허용 외부 링크; 실제 연결 계정 변경 없음 |
| C69 Wordmark/Founders black·white/Friend/Throwback 2012·2015·2017 | `app-icon` · [SettingsExtrasNavigation.test](../FE/src/app/navigation/SettingsExtrasNavigation.test.tsx) · F60 | 자체 K 아이콘/native plugin 구현; 실제 launcher 적용 미검증 |
| C70 모든 진입·소유권·수/선택 동기화·실패/재시도·A→B→A | `app/navigation · 각 저장소` · [AuthBoundaryNavigation.test](../FE/src/app/navigation/AuthBoundaryNavigation.test.tsx) · F01–F63, faults.json | 현재 브라우저 실패·A→B→A/동일A 재로그인·접근 해제 검증 |
| C71 native 선택/사진/클립보드/공유/저장/알림/아이콘/오디오 | `플랫폼별 어댑터` · [EditorImagesNavigation.test](../FE/src/app/navigation/EditorImagesNavigation.test.tsx) · F40, F57, F60 | 구현/웹 대체/native 실행 대기를 플랫폼별로 분리 |
| C72 63흐름·273단계 연결·200고유 시각 비교·계약 인계 | `전체 FE 계약` · [AppNavigator.test](../FE/src/app/navigation/AppNavigator.test.tsx) · F01–F63 | 63/273/200 대응·72항목 감사; 전체 동일 재현/출시 완료 아님 |

## 최종 보존·커밋 경계

최종 Git diff/staged diff를 확인해 Goal53 변경만 로컬 커밋한다. 기존 ENV·medium·사용자 변경과8081을 보존한다. 외부 증거는 저장소에 추가하지 않는다. 로컬 커밋은 검증 대기/미구현 잔여까지 완료했다는 의미가 아니다. Goal53 이후 개발·push·배포는 시작하지 않는다.
