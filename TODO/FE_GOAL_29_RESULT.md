# Goal 29 — Mute·Block·신고·응답 관리

2026-11-19 KST, macOS. **구현 완료·시각/native 검증 잔여**. 두 차례 자체 검토와 수정·자동 검사·8081 검증을 수행했다. 독립 검토는 수행하지 않았다. Goal 25→35 연속 요청에 따라 다음은 Goal 30이며 커밋·push·배포·실제 신고 전송은 하지 않는다.

## 구현과 데이터 계약

`features/moderation`에서 사용자별 muted(writer/publication), blocked(writer), reports를 관리한다. 신고 대상은 writer/article/list/response의 kind·ID·부모 대상·작가 ID로 구별한다. 이유, 추가 설명, 선택 차단, operationId와 접수 시각은 모의 접수 기록이다. mute·block·report는 별도 명령이며 접수 성공을 제재 확정으로 해석하지 않는다.

절대 상태 명령, 사용자 전체 직렬 쓰기, 조회 generation/version, operationId 중복 방지, 취소 AbortSignal을 적용했다. 확정 상태만 반영하고 실패 시 이전 상태·입력·선택을 유지한다. 같은 작업 ID 재시도가 이중 접수나 이중 차단을 만들지 않는다. 신고와 Also block은 원자적으로 확정한다. 신고 후 차단 해제하고 이전 완료 신고를 재전송해도 다시 차단하지 않는다. 잘못된 사용자·응답 값·권한·자기 차단·누락된 차단 응답을 거부한다.

작가 메뉴, 기사 메뉴, Home/Search 카드, 목록 내 Report this item, 응답 메뉴를 연결했다. 신고 이유 4종, 미선택 제출 방지, Also block, 추가 설명 2000 UTF-16 코드 단위, 취소/실패/재시도/성공 toast 및 HTTPS 정책 링크를 제공한다. 추가 설명 길이·확인창·실패 UI는 자체 보완이다. Share는 대상 계약과 Goal 47 진입 안내이며 공유 실행은 하지 않는다.

Mute는 Home/Following/Explore/관련 추천을 제외하며 직접 검색·프로필·팔로우·북마크는 보존한다. Block은 추천·검색·본문·프로필 Stories/Lists·Follow와 응답 상호작용을 제한한다. 공개 About과 해제 메뉴는 남긴다. 기존 follow/email은 삭제하지 않고 차단 중 비활성화하는 자체 mock 정책이다. 양방향 서버 권한을 구현한 것은 아니다. Settings의 Blocked users는 자체 보완한 해제 경로이며 전체 Account 설정은 Goal 49 담당이다.

응답 관리 상태는 `features/responses` 소유다. ownerId와 open/closed/hidden을 구별하고 소유자만 숨김/복구·토론 변경을 허용한다. 명시적 mock A 소유 금융 기사 `example-latest-rates`와 검증용 B 댓글 1개를 사용한다. Jordan의 글을 A 소유로 바꾸지 않는다. Close는 기존 응답을 보존하되 작성/수정을 금지한다. Hide all은 데이터를 보존하고 노출·작성을 막으며 Open으로 복구하는 자체 정책이다. 개별 숨김은 자손 답글도 숨기고 내용·박수를 보존한다. 숨긴 부모 아래 새 답글은 거부한다. 목록의 동적 소유권은 Goal 32/33에서 연결한다.

데이터는 사용자별 앱 실행 메모리 수명이다. A→B→A에서 확정 값은 보존되고 인증 revision 변경 시 개인 메뉴·초안·오류·진행 요청은 격리한다. 전체 새로고침/재실행은 초기화한다. 삭제·숨김·차단은 기사 원본·북마크·박수·highlight·읽기 이력을 함께 지우지 않는다. 이름/설정 변경으로 인증 revision이나 공개 navigation을 초기화하지 않는다.

## 원본·공식 자료와 보완 정책

보관본 iOS version ID 1419, F18/F22/F23 ANALYSIS와 실제 PNG 7장을 직접 확인했다. `sc_c25f22caf7cd49ba88c8611fb7480932` 작가 메뉴, `sc_ff143e1e9b4d4e5ab0579b3fdc61dc1a` 차단 toast, `sc_8208a84fba4c4046aa1d364055d14db7` 후속 프로필, `sc_c8b24e7669734e74922bee69b751350b` mute toast, `sc_d07b03740ecc44328719d4d21703bb06` 신고 초기, `sc_af0ecdded03643ca8cea85ec5341d906` Spam 선택, `sc_d9ba56fa632249c7908f15a8e3082d97` 접수 toast다. 기사 메뉴 `sc_d62e32234117483b85b4c73ed63249cd`, 목록 기사 메뉴 `sc_fa4e79f0bed747d698ae44e23f9223f9`와 관련 분석도 확인했다.

2026-11-19 현재 공식 [Mute](https://help.medium.com/hc/en-us/articles/224544048-Mute-a-writer-or-publication), [Block](https://help.medium.com/hc/en-us/articles/217048077-How-to-block-and-manage-blocked-users), [Report](https://help.medium.com/hc/en-us/articles/217047977-Report-posts-lists-and-users), [Manage responses](https://help.medium.com/hc/en-us/articles/217048127-Manage-responses), [Other issues](https://help.medium.com/hc/en-us/articles/21310355607831-Reporting-Other-Issues)를 대조했다. 차단 toast 뒤에도 카드가 보이는 보관 화면과 현재 공식 접근 제한은 다르다. 콘텐츠 제한·역방향 해제·추가 확인창은 보완 정책으로 표시한다. 현재 공식 iOS 신고의 Share 진입과 보관된 Report story 메뉴 차이도 구분한다. 후속 프로필의 10.8K/Lists 상태 전체를 차단 결과로 단정하지 않는다.

Gummble에서 응답 관리 원본을 보완 검색했으나 기존 신고 화면과 `sc_95e504331794455fb4776bd322254c76`를 반환했다. 실제 후자는 구형 Make list private 확인창(390×844)이어서 응답 관리 근거로 사용하지 않았다. 펼친 관리 UI는 미수록이다. 63흐름/273단계 참조/200고유 화면 집계는 그대로이며 대응표를 시각 완료율로 계산하지 않는다.

## 두 차례 자체 검토와 수정

1차 검토에서 차단 해제 경로 누락을 찾아 Settings Blocked users를 추가했다. 일반 반응 권한 제한이 소유자의 숨김/복구까지 막던 조건을 분리하고 숨긴 부모 답글의 직접 요청도 거부했다. 차단 상태 변경으로 반응/팔로우 source가 재생성되지 않도록 안정된 policy callback을 주입했다. 초기 ref 갱신 방식은 lint 규칙 4건에 걸려 useMemo와 명시적 source 수명으로 수정했으며 규칙을 억제하지 않았다.

1차 시각 대조에서 신고 시트 시작 위치 24px 차이, 링크색/줄바꿈·설명 위치, 작가 메뉴 하단 8px 차이를 보정했다. 신고 시트 top 10px, 48px 터치 target과 42px 버튼 surface, 57px 메뉴 행을 구분했다. 동작 검증은 처리 완료를 기다려 실제 취소와 테스트의 조기 닫기를 구별했다.

2차 재검토에서 Blocked users의 취소/해제가 같은 목록으로 복귀하도록 수정하고 해제 label을 원시 ID에서 표시 이름으로 바꿨다. Also block의 성공 응답에 실제 차단 상태가 없는 경우도 거부하도록 검증했다. source permission callback의 수명과 실패 후 동일 작업 재시도를 다시 확인했다.

첫 전체 검사에서 권한 조회 중 ArticleDetailScreen 전체를 교체하면서 읽기 상태·뒤로 조작에 영향을 주는 회귀를 확인했다. 해당 실행은 중단했으며 통과로 계산하지 않는다(`goal29-check.log`, 자체 Jest PID 31992만 종료). 본문 접근만 숨기고 ReferenceArticleView·뒤로 버튼·임시 설명 수준의 수명을 유지하도록 수정했다. 일반 금융 fixture는 캡처된 Medium 작가 차단 관계와 혼동하지 않는다. 비동기 조회 후 테스트는 실제 준비 상태를 기다린다. 새 회귀 검사는 조회 전후 동일 화면의 임시 수준과 뒤로 동작을 확인한다.

## 현재 코드 검사 결과

Node 24.18.0 / npm 10.9.0, FE 작업 디렉터리, 프로젝트 의존성/lockfile 변경 없음. 도구는 저장소 밖 임시 설치다.

| 명령/검증 | 결과 |
| --- | --- |
| `caffeinate -i npm run check` | 타입·lint 통과, **132 suites / 824 tests 통과**, Jest 299.941초. `goal29-final-check.log` |
| 접근 경계 수정 회귀 `npm test -- --runTestsByPath …` | 실제 navigation 포함 12 suites/42 tests, 51.188초. `goal29-access-regression.log` |
| source 2차 회귀 | 6 suites/30 tests, 3.033초. `goal29-source-r2.log` |
| `npx expo export --platform ios --platform android --output-dir /tmp/…/goal29-final-export` | 양 플랫폼 JS/Hermes 약 2.7MB, 성공. `goal29-final-export.log` |
| 8081 정상 흐름 | 작가 메뉴/취소/신고·Mute/해제·Block/해제·응답 닫기/열기/숨김/복구, 8캡처, console/page 오류 0 |
| 8081 장애 흐름 | read-error/write-error/slow, 입력 보존·재시도·취소 후 늦은 응답·same-A/B/A·reload, 모두 완료, 오류 0 |
| 8081 추가 흐름 | guest 로그인 취소/성공 뒤 수동 재실행, Dark 앱/Light 기사 override, 320px 긴 한글, 응답 작성자 차단/해제, 오류 0 |

현재 모든 장애 preview 설정은 normal이다. 1차 관련 14 suites/50 tests, 수정 전 export, 중단한 전체 검사는 최종 증거로 대신하지 않는다. 실제 navigation 테스트에서 navigation 자체를 mock으로 대체하지 않았다. 브라우저 측정 스크립트의 잘못된 Report author 텍스트 locator는 수정했으며 제품 결함으로 계산하지 않는다.

## 시각·플랫폼 잔여

캡처/비교/로그/스크립트는 `/tmp/kostolany-goals25-35.4FQsD5/goal29-*`에 있다. 원본 1179×2556을 393×852로 정규화하고 상단 59/하단 34px를 제외한 393×759 조건에서 작가 메뉴/신고 초기/Spam 선택을 나란히 비교했다. DPR이나 실제 OS 화면과 동등하다고 주장하지 않는다. 브라우저 실측 신고 버튼 target은 x24/y690/345×48, Spam 라디오 행은 x24/y76/345×50이었다. 320px에서는 document 폭과 viewport 모두 320px, Dark 신고 제목은 rgb(210,210,210)이다. 신고 입력·모달 닫기·스크롤·확인 버튼을 실제 조작했다.

원본 font/vector 미확보, 일부 문구 줄바꿈·정책 설명 높이 약 16px 차이, destructive 색상·배경/blur 차이, 자체 상세 설명/모의 접수 안내와 추가 관리 UI가 남는다. 남은 차이를 100% 일치로 보고하지 않는다. 터치 target은 48px 기준이며 네이티브 터치·OS 접근성·키보드/한글 IME 검증을 대체하지 않는다.

Jest iOS/Android 프로젝트와 JS/Hermes export는 실제 native 실행/빌드가 아니다. 현재 전체 Xcode/Simulator 및 Android SDK/adb/emulator가 없어 두 플랫폼 native build/run은 미검증이다. 해당 환경에서 Safe Area·하드웨어 뒤로·큰 글자·포커스·키보드 가림·실제 IME를 확인해야 한다. 외부 신고/이메일/인증 서버는 연결하지 않았다.

## 8081 최종 확인 순서와 후속 연결

1. 프로필에서 모의 A 로그인 → 탐색에서 ChatGPT Is Poisoning 검색 → 기사 → Jordan 프로필 → 메뉴.
2. Mute/Block 확인 취소 후 상태 유지 → Mute 확정 → Home 추천 제외·직접 검색 허용 → Unmute.
3. Report author → 이유 미선택 제출 불가 → Spam·Also block·추가 설명 → 취소/다시 입력/제출 → 차단 표시.
4. 프로필 메뉴 또는 Settings Blocked users → 해제 취소/확정 → 같은 목록 복귀와 기사 접근 회복.
5. ‘금리가 오르면’ 기사 → Responses → Manage responses → Close 취소/확정 → 작성 제한 → Open.
6. B 예시 응답 메뉴 → Hide → Hidden responses → Show → 내용 복구. 응답 신고+Also block의 숨김과 Settings 해제도 확인.
7. 로그아웃/B/A 재로그인과 새로고침으로 개인 초안/오류 격리 및 확정 메모리 수명 확인.

Goal 30/31은 토픽·추천과 Muted 관리 연결, Goal 32/33은 목록 소유권·목록 신고/응답 관리 연결, Goal 47은 공유 실행, Goal 49는 전체 Account 설정, Goal 52는 실제 native 검증을 담당한다. 이번 연속 요청의 30~35 연결은 해당 단계에서 완성한다.
