# Goal 31 — 추천 관리·관심사·읽기 이력

2026-11-20 KST · macOS · **구현 완료·시각/native 검증 잔여**.

**최신 사용자 요청은 Goal 31까지다.** Goal 25~31의 결과를 보고한 뒤 종료하며 Goal 32 이후는 시작하지 않는다. 이전 Goal 35까지 연속 진행 지시는 이번 범위 변경으로 대체한다. 커밋·push·배포 금지는 유지한다.

## 구현과 연결

Refine recommendations의 Following/Reading history/Muted/Suggestions, All/Writers/Publications/Topics 필터, See all/See more를 실제 데이터와 연결했다. 홈 +는 기존 토픽 Follow를 사용하는 관심사 화면을 연다. Settings의 Refine recommendations, 기사/카드의 Show less, Library Reading history도 연결했다. 작가·publication·토픽 상세에서 돌아오면 기존 화면과 필터를 유지한다.

Show less는 추천에서 해당 기사를 제외하는 개인 입력이다. Home/Following/Explore/토픽·관련 추천이 같은 입력을 사용하고, 원문·검색·북마크·반응·접근 권한은 유지한다. 확인/취소·실패 재시도·Undo까지 실제 명령으로 처리한다. Following과 Muted는 Goal 28~30의 관계/음소거 저장소를 공유한다. 이력의 개별 제거/전체 삭제·취소·실패 복구와 Library 연동을 완성했다.

## 데이터 소유권·명령·수명

| 대상 | 계약 |
| --- | --- |
| 관심사 | userId+topic kind+topicId의 기존 Follow. 즉시 반영하며 별도 Save 초안이나 복제 상태가 없다. 작가 이메일과 분리한다. |
| 추천 입력 | `features/recommendations`의 주입 가능한 source/store/provider. userId별 hiddenArticleIds/version. operationId+명령 fingerprint, 직렬 쓰기, 응답 검증, 조회 세대, AbortSignal을 사용한다. 실패는 같은 ID로 재시도하며 중복 성공이 Undo를 다시 덮지 않는다. |
| 추천 결과 | 공개 fixture와 Follow/Mute/Block/Show less 입력의 파생 결과. 실제 추천 모델·개인화 랭킹·서버 reset은 구현하지 않는다. |
| 읽기 이력 | userId별 방문. 최초 조회 전 개별 삭제 tombstone·전체 삭제·그 뒤 새 방문을 순서대로 병합한다. 최신 전체 snapshot을 직렬 저장하고 재시도는 같은 commandId를 사용한다. 늦은 저장 성공으로 현재 이력을 덮지 않는다. |
| 실패·세션 | 같은 화면에서는 낙관 삭제와 미저장 안내/재시도를 유지한다. 세션을 떠난 실패는 확정 이력으로 복구하고, 늦은 성공은 원래 사용자에게만 남긴다. 시트/메뉴/필터 초안/쓰기 오류는 인증 scope 변경 시 정리한다. |
| 삭제 영향 | 이력/Viewed만 제거한다. 북마크·박수·목록·Highlight·댓글·팔로우는 삭제하지 않는다. 새 기사 진입은 새 방문으로 기록한다. 이 관계는 자체 보완 정책이다. |
| 보관 | 최근 500개 이력은 자체 메모리 한도다. 계정 A→B→A에서는 확정 개인 데이터를 유지하고 전체 새로고침/재실행에서는 초기화한다. 영속 저장·실제 오프라인 캐시는 없다. |

기존 4단계 설명, 기사 임시 수준/계정 기본값, 앱 테마/기사 override, 타인 강조 설정/내 Highlight의 구분과 로그인 성공 후 개인 행동을 수동으로 다시 실행하는 정책을 유지했다. 이름·설정 변경으로 인증 revision을 초기화하지 않는다.

## 원본·공식 설명·자체 보완

F01/F05/F12~15/F18/F22/F24/F41 관련 분석과 기존 검토를 대조하고 원본 14개 고유 PNG를 직접 확인했다. 기본 시각 기준은 보관 iOS version ID 1419다. 전체 63개 흐름·273단계·고유 200장의 대응표를 이번 구현 완료율로 계산하지 않는다.

2026-11-20 직접 확인한 [공식 Refine recommendations](https://help.medium.com/hc/en-us/articles/224488047-Refine-recommendations)는 네 탭, 이력 제거, Show less의 피드 숨김/추천 입력 역할을 설명한다. 정확한 추천 알고리즘이나 Viewed 삭제 규칙을 공식 관찰로 확장하지 않는다.

Gummble 추가 검색에서 실제 본 1440×900 web 화면 5개는 해당 mobile 본문이 아니었다: `sc_752b917151e54f378b88c3b780f19ff6`, `sc_3add87414eee42b4802d7e39d08a6d07`, `sc_542bed1ce0fd4739917e929077dc5e82`, `sc_470b181e406549f0a10cf416ba67ed78`, `sc_0d482f0f629d4c2599e7b0a81425d28f`. 버전 차이와 미수록 상태를 유지한다. 관심사 편집·Muted 본문·Library 이력·삭제 확인·Show less 확인/Undo는 기존 컴포넌트와 계약으로 보완한 UI다.

추천 토픽의 정적 집계, Kim Witten/Zulie/Perry의 보이는 소개와 얼굴, 이력 세 기사의 메타데이터와 사진만 추가했다. 사진 9개의 물리 crop 좌표와 출처는 `FE/assets/medium/SOURCES.json`에 남겼다. 캡처 발행 날짜를 방문 날짜로 사용하지 않고 전체 본문을 창작하지 않는다.

## 1차 자체 검토 → 수정·검증

상태 소유권·진입/복귀·실패 저장소·실제 navigation과 첫 캡처를 대조했다.

- 초기 타입 검사에서 새 trash/document 아이콘 타입 누락을 찾아 대체 SVG를 추가했다. 원본 벡터 확보로 표현하지 않는다.
- 새 검사가 기존 `설정 열기`와 LibrarySheet의 제목 접두사가 붙는 닫기 이름을 잘못 사용했다. 실제 접근성 이름으로 수정했다. 최초 관련 실행은 12 suites 중10 통과/2 실패,30 tests 중26 통과/4 실패(928.054초)였다. iOS TopicNavigation 한 묶음에919.31초가 기록됐으며 원인을 추측하지 않는다. 수정 후 navigation 2 suites/4 tests(4.093초)가 통과했다.
- 원본보다 소개가 3줄로 늘고 토픽 행이 커지는 차이를 글자/행 간격으로 보정했다. Refine 제목·설명·탭은 목록 스크롤과 분리했다. History 콘텐츠가 탭 높이를 축소하는 문제는 실제 캡처에서 발견해 최소48px/flexShrink0으로 수정했다.
- History는 읽은 기사 목록 자체이므로 홈의 Viewed 문구·회색 제목을 중복 적용하지 않도록 분리했다. 삭제 이전 조회·저장 응답이 항목을 부활시키지 않는지 저장소 회귀로 확인했다.

## 2차 자체 재검토 → 추가 수정·검증

첫 검토와 별도로 계정 수명·늦은 완료·필터 측정 callback·실제 화면을 다시 검토했다.

- 같은 A 재로그인에서 이전 실패의 낙관 삭제만 남고 오류가 숨겨질 수 있었다. 확정 snapshot과 활성 인증 scope를 분리해 세션 이탈 후 실패는 복구하고 성공은 원래 사용자에게 보존했다. 늦은 성공/실패 각각의 회귀를 추가했다. 이 변경까지 타입/lint 및 8 suites/24 tests(9.052초)가 통과했다.
- 위치 측정 callback이 아직 없으면 필터가 열리지 않았다. 기본 위치로 먼저 연 뒤 측정값으로 보정하고 취소/재열기/unmount 세대를 확인한다. Topics 요청 중 Writers 전환→늦은 실패→Topics 재시도 회귀까지 2 suites/6 tests(3.607초)가 통과했다.
- Muted에는 불가능한 Topics 필터를 유지하지 않고 All로 바꾼다. 공개 기사 카드 메뉴도 인증 scope 변경 시 닫는다. Unmute 실패 시 기존 관계 유지→재시도→홈 복귀 회귀를 추가했다.
- 마지막 시각 재검토에서 뒤로 버튼이 가운데 정렬되는 문제, 필터의 가로 위치23.5px 차이, publication byline의 아이콘 순서를 보정했다. 뒤로 버튼은 좌측48px,필터는250px 중앙,byline은 아이콘→In 이름 순서다.

두 차례 모두 자체 검토이며 독립 검토가 아니다. 시각 수정 전에 실행 중이던 `goal31-final-check.log`, `goal31-current-check.log`는 중단 기록으로 보존하고 통과로 계산하지 않는다. 그 다음 전체 실행인 `goal31-final-verified.log`는 아래 테스트 수정 전 실패 기록이며,최종 성공 여부는 `goal31-complete-check.log`로 구분한다.

전체 실행은 144 suites 중142 통과/2 실패,856 tests 중852 통과/4 실패(305.902초)였다. 실패는 Goal30의 TopicProvider 검사가 첫 토픽을 Life로 가정한 2개 사례의 양 플랫폼 실행이었다. Programming 추가로 순서가 바뀌어,순서 대신 Life ID의 존재를 표시·확인하도록 검사 대상을 고쳤다. 늦은 성공/실패가 빈 데이터로 현재 공급부를 덮으면 여전히 실패하는 검사다. production 토픽 순서를 테스트에 맞춰 바꾸지 않았다.

같은 실행의 ProfileNavigation에는 VirtualizedList 갱신의 act 경고가1회 기록됐다. navigation을 mock으로 바꾸지 않고 검사 타이머를 명시적으로 진행하도록 보완했다. 이 두 검사 파일 수정 뒤 관련 검사를 실행하자 빠른 계정 전환에서 실제 navigation 경로를 재사용하는 결함이 드러났다. 관련4 suites 중2 통과/2 실패,20 tests 중18 통과/2 실패(6.511초)였다. A의 ProfileList에서 기사 진입→같은 act 안에서 로그아웃/B 로그인→뒤로 했을 때 B의 ProfileHome 대신 이전 ProfileList 경로를 사용했다. A 데이터가 B로 넘어간 사례는 아니지만 이전 개인 화면이 남는 계약 위반이다.

React key만으로 자식 navigator를 재생성해도 부모 navigation에 보관된 nested state가 빠른 전환에서 재사용될 수 있었다. 설치된 React Navigation의 navigationKey 계약을 확인하고 Library/Profile의 Tab.Screen에 인증 scope key를 적용해 경로 상태까지 새로 생성한다. Home/Explore는 교체하지 않고 이름/설정 변경에도 key를 바꾸지 않는다. 빠른 전환 검사를 느리게 돌려 통과시키지 않았다. 실제 navigation을 유지한 계정 경계/북마크/추천/토픽 회귀10 suites/48 tests(27.251초)가 통과했고 브라우저/export와 전체 check를 최종 코드로 다시 실행했다.

## 실제 실행과 브라우저 증거

Node24.18.0/npm10.9.0, FE 디렉터리에서 프로젝트 스크립트를 실행했다. `npm run check`는 타입 검사→lint→Jest iOS/Android 프로젝트 전체 순서다. 최종 결과는 아래 최종 검사 표에 기록한다. 이전 Goal의 수치를 새 코드 결과로 대신하지 않는다.

8081 Chrome157/Playwright1.58.2에서 정상 13캡처 흐름 완료, console/page 오류0이다. 최신 로그는 `goal31-complete-browser.log`, 상세는 `goal31-browser.json`이다. 추가4캡처에서는 이력 삭제 후 북마크/18001박수/Highlight 유지, Mute 해제 취소/확정, 작가 Following, 320px SystemDark, A→B→A/같은 A/새로고침 초기화를 확인했고 오류0이었다(`goal31-extra.json`).

추천 read-error/write-error/slow,이력 read-error/remove-error/slow의6종도 완료·오류0이다. 첫2종은 `goal31-faults.json`,나머지4종은 `goal31-faults2.json`이다. 최초 slow 추천 시나리오는 mock 로그인 닫기 대기에서30초 타임아웃이 나 별도로 재실행했고 통과했다. 실패를 통과로 합치거나 원인을 임의로 단정하지 않는다. 느린 추천 변경 취소는 확정하지 않고, 느린 이력 삭제 성공은 원래 A에만 반영됐다. 실패 삭제는 동일 명령 재시도로 복구했다.

긴 한국어 토픽300개를 일회성으로 추가한320px 브라우저에서 scrollTop41794/전체높이42334/보이는높이540,추천 버튼 DOM5→21개를 측정했다. 가상화·처음 위치 복귀·가로폭320 유지·오류0을 확인했다. 실제 모바일 성능 수치로 확장하지 않는다. 모든 preview와 임시 대량 fixture를 정상으로 복원했다.

검사 스크립트의 잘못된 검색 진입 생략, Profile 스택의 Settings 복귀, 숨겨진 이전 화면의 중복 텍스트 locator는 실제 흐름에 맞게 수정했다. bookmark는 Save to→Reading list→Done을 실제 조작했다.

## 원본 비교·측정·남은 차이

1179×2556 원본을393×852로 축소한 뒤 상단59/하단34를 제외해393×759 구현과 비교했다. 이는 실제 DPR/OS Safe Area 검증이 아니다. Light·기본글자·같은 대상/선택/목록 시작 상태로 대조하고 실제 방문 순서·반응·진입 탭 차이는 구분했다.

| 비교 | 원본 screen ID | 결과·잔여 |
| --- | --- | --- |
| Suggestions Topics | sc_90bc6a79e86d436e89d94d7dc82b624c | 다섯 토픽/집계·Follow·필터 대조,서체·간격 수px 차이 |
| 필터 열림 | sc_f978feb6af9f44b5a5fa8f514899f3da | x71.5/y299/폭250(원본약72/300/250),각행48px로 전체높이16px 차이,blur 잔여 |
| Suggestions All | sc_28a0bd2548fc4800b2b024bdc06bb115 | 실제 얼굴 crop·작가3명/소개/verified,폰트에 따른 줄바꿈·말줄임 차이 |
| 토픽 선택 | sc_c7deda6b53824957b587bd922cd55399 | SelfImprovement/Writing/Relationships의 실제 Follow/Following 연결 |
| 이력 있음 | sc_f4bb3fa34f32466b9bd12eea57ea518f | 같은 첫 기사·삭제 카드·휴지통·메타 대조,48px target/폰트로 높이 차이 |
| 이력 없음 | sc_3ab5043fa7b649908c6dde30faf290ab | 삭제 완료·Explore 연결,서체/문구 줄바꿈 차이 |
| 이력 스크롤 | sc_4239d69cbdce4194a5a34c7472131dfd | Titans/Personality 메타·헤더 고정,전체 본문 미수록 |
| Following 빈/있음 | sc_944b2eea3834408b8c04981e5eb2adf8 / sc_1c666fb7aadc411c9add1aa2b19bd56c | 원본 관계를 초기값으로 가정하지 않고 직접 Follow 후 비교. 빈 화면의 문구 크기/세로 위치·가로 구분선 차이 잔여 |

추가 직접 확인 원본: Home `sc_5e0ba0e498ff49579bf838096aec4b5e`,Library `sc_84e0421de98041bbb014822fc05dd3fb`, `sc_57450c38bf994be18d95fcaf712c56ba`, `sc_bafbf7b80b154e25aec15e120a13f72a`, `sc_c37aefd0916548dda3cb46d61cc25193`. Library의 탭 존재와 본문 자료 확보를 구분했다.

최종 실측 `goal31-measure.json`: 뒤로(x4,y0,48×48),필터(x24,y251,345×48),Follow(x293.69,y335,75.31×48),필터 선택(x71.5,y299,250×48). Escape로 닫은 뒤 Filter recommendations: Topics에 실제 web 포커스가 복귀했다.

원본은 Home 진입,구현 비교는 Settings 진입으로 하단 Profile 선택을 보존한다. 이 footer 차이를 일치로 계산하지 않는다. 원본 첫 이력 댓글7과 현재 mock 댓글0도 구분한다(Goal26의 실제 응답 상태 연결 정책). 가짜 댓글을 생성하지 않았다. Yuan VK의 부분 byline만 보이는 다음 글도 전체 제목/ID가 없어 창작하지 않았다. 실제 사용자의 세 방문으로 이력을 구성했다. 원본 font/vector/blur와 위 차이가 남으므로100% 일치·전체 클론 완료가 아니다.

## 플랫폼·보존·후속 범위

macOS에서 `xcode-select -p`는 `/Library/Developer/CommandLineTools`, `xcrun simctl list devices`는 simctl 없음(exit72)이다. adb/emulator/기본 Android SDK가 없고 ANDROID_HOME/ANDROID_SDK_ROOT도 미설정이다. 실제 iOS/Android build/run·OS 글자 확대/IME·VoiceOver/TalkBack·Safe Area·키보드/제스처 검증에는 전체 Xcode/Simulator와 Android SDK/emulator 또는 실제 기기가 필요하다. 웹 문구 선택과 JS/Hermes를 실제 native 검증으로 표현하지 않는다.

medium382개 파일의 작업 전 SHA256과 비교해 변경/추가0,package.json/package-lock.json/.nvmrc diff 없음,ENV 변경 없음이다. 기존8081 PID11374와 HEAD2e7aedd를 보존했다. 커밋·push·배포·외부 서비스 연결은 없다. 캡처/로그/일회성 스크립트는 `/tmp/kostolany-goals25-35.4FQsD5/goal31-*`에만 두며 임시 경로라 영구 보관을 보장하지 않는다. 저장소에 evidence 폴더를 만들지 않았다.

Goal32 공개 목록,33 내 목록,34 Library/Digest,35 다운로드와47 공유 실행은 후속 담당으로 남긴다. 이번에는 시작하지 않았다. 실제 OAuth·백엔드·AI·이메일/신고 전송·영속 저장·오프라인 다운로드 지원은 없다.

## 8081 최종 확인 순서

1. 프로필→모의 로그인A→홈+→토픽 Follow→뒤로. 프로필→설정→Refine recommendations→Following에서 같은 관계 확인.
2. Suggestions→All/Writers/Publications/Topics→Follow/이메일 옵션→Following. See more/See all,작가·토픽 상세→뒤로.
3. 홈−또는 카드/기사 메뉴 Show less→취소/확정→추천 제외→Undo. 검색·저장·원문 유지 확인.
4. 기사→박수/Save to/Highlight→복귀→Reading history→개별 삭제 취소/확정→Library 이력 동기화. Highlighted·저장·박수 유지 확인. 기사 재진입은 새 방문이다.
5. 카드 메뉴 Mute→확정→Refine Muted→Unmute 취소/확정→홈 복구. Clear history 취소/확정→빈 목록 Explore.
6. 320px/SystemDark,필터 Escape/포커스,스크롤/뒤로. A→B→A,같은A 재로그인,전체 새로고침의 메모리 수명 확인.
7. 장애 재현은 일회성 mock 주입 기록을 따르고 종료 후 normal로 복원한다. 기본 실행에는 장애나300개 추가 토픽이 없다.

## 변경 위치

- 새 기능: `FE/src/features/recommendations/`, `reading-history/ReadingHistoryList.tsx`, `ReadingHistoryDeletion.test.ts`, `app/navigation/RecommendationsNavigation.test.tsx`.
- 기존 연결: reading-history store/source/provider, community navigation/IdentityLink/directory, topics catalog, AppNavigator/ArticleRouteScreen, 홈·탐색추천·기사메뉴/관련글·Settings·Library.
- 원본 자료: `features/feed/data/mediumHistoryStories.ts`, `FE/assets/medium/`의9사진과`SOURCES.json`.
- 결과/현재 상태: 이 문서,`FE_MEDIUM_FULL_CLONE_GOALS.md`,`FE_MEDIUM_FULL_CLONE_MAP.md`,`FE/README.md`,`AGENT/SOFTWARE_AGENT/COMMON/IMPLEMENTATION_STATUS.md`.


마지막 실행 환경 감사에서 이전 export의 npx launcher가 Node 번들의 npm11.16.0을 사용한 점을 구분했다. 설치나 의존성 변경은 없었지만,최종 export는 프로젝트에 지정된 npm10.9.0의 `npm exec -- expo export --platform all --output-dir /tmp/kostolany-goals25-35.4FQsD5/goal31-project-export`로 다시 확인했다(`goal31-project-export.log`). 코드 검사도 같은 Node24.18.0/npm10.9.0 환경이다.

계정 navigation 수정 후 추가 브라우저 재실행은 본문 스크롤 직후 좌표를 취득하는 단계에서 Highlight 메뉴 대기에 실패했다. 스크롤로 기사 chrome이 접히는 레이아웃 변화를 기다린 뒤 좌표를 취득하도록 일회성 스크립트를 수정했다. 기능 코드나 선택 결과를 가짜로 주입하지 않고 실제 마우스 드래그로 재실행했고4캡처 흐름 완료·오류0을 확인했다. 추가 최종 로그는 `goal31-complete-extra.log`다.


## 최종 검사와 상태

| 구분 | 최종 결과 |
| --- | --- |
| 기능 구현 | Goal31 요청 범위 구현 완료. Goal25~30와 연결했고 Goal32 이후 미착수. |
| 검토 | 1차 자체 검토→수정/검증→2차 자체 재검토→추가 수정/회귀 완료. 독립 검토 아님. |
| 현재 코드 전체 검사 | `caffeinate -i npm run check`: typecheck·lint 통과,**144 suites/856 tests 통과,283.31초**. Jest iOS/Android 두 프로젝트 합계. `goal31-complete-check.log`. |
| 계정 경계 관련 회귀 | 10 suites/48 tests 통과,27.251초. `goal31-account-regression.log`. |
| 현재 코드 브라우저 | 정상13캡처+추가4캡처 모두 완료·console/page 오류0. `goal31-complete-browser.log`의 첫 정상 실행과 `goal31-complete-extra.log`를 최종 증거로 사용. |
| 장애·긴 목록·접근성 | 6종 장애/느림 완료,300개 긴 토픽 가상화·320px·48px·Escape/포커스 확인. 실제 OS 접근성/IME와 구분. |
| JS/Hermes/web export | Node24.18.0/npm10.9.0의 `npm exec -- expo export --platform all ...` 성공. iOS/Android 각약2.8MB,metadata12KB. `goal31-project-export.log`. |
| 원본 시각 대조 | 직접 원본과 구현 캡처를 대조하고 위치/간격을 수정. 서체·벡터·blur·일부 줄바꿈/높이·미수록 화면 차이 잔여. |
| 실제 native | build/run·OS IME/글자 확대·VoiceOver/TalkBack 등 미검증. 전체Xcode/Simulator,Android SDK/emulator 또는 기기 필요. |
| 외부/오프라인 | fixture·mock·메모리 수명. 실제 서비스 연동·영속 캐시/재시작 복원·다운로드 미지원. |

최종 상태는 **구현 완료·시각/native 검증 잔여**이며 잔여를 적었다는 이유로 완전 완료로 바꾸지 않는다. 최신 사용자 요청에 따라 Goal31 결과를 보고하고 종료한다. Goal32는 시작하지 않았고 커밋·push·배포는 하지 않았다.


## 후속 커밋·push 요청

**후속 사용자 요청 — 커밋·push:** Goal25~31의 소스·자산·테스트·결과 문서를 함께 커밋하고 `origin/main`에 푸시하도록 요청받았다. 아래 커밋/push 금지와 미커밋 표기는 개발 종료 당시 이력이다. 배포하지 않으며 Goal32 이후는 시작하지 않는다. 구현 코드와 테스트는 최종 144 suites/856 tests 통과 이후 변경하지 않았다. 이번 후속 변경은 승인 이력을 반영하는 문서 수정이다. 실제 커밋 해시와 원격 반영 결과는 Git 이력으로 확인한다.
