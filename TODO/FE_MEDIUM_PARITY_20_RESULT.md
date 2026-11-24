# Medium Parity 묶음 20 — 글 통계

2026-11-24 KST. 시작 HEAD `9f706fe8d19cce4daff39c9d58084e2e17db8a83`, staged/작업 트리 없음. 선행2·9·15,19의 자격 소비 경계를 확인했다. 이번 V34와16~20 연속 요청의 마지막 묶음만 수행한다.9~19의 기존 구현·원본·시각·native 잔여를 인수하거나 전체 완료로 승격하지 않는다.

| 판정 | 결과 |
| --- | --- |
| 기능 | 웹 그래프 직접 선택·포커스 복귀·미집계 안내·원형 범례 보완, UTC/계정/기간/정렬 계약 유지 |
| 자동 검사 | 최종 타입/lint·iOS/Android322 suites/1782 tests 통과, 실패/skip/이번 act0 |
| 시각 |3 원본 PNG 직접 열람, 고정 UTC 비교 snapshot과 실제8081 메모리 부분 비교. 전체 동일성 완료 아님 |
| native | JS/Hermes와 실제 native를 분리. Xcode/Android SDK·기기 조건은21/Q07 대기 |

<a id="scope"></a>
## 화면·요구·흐름·계약

3 S/15 R/3 T/4 U/15 C. `medium/flows/Profile/Story stats/ANALYSIS.md` 전체와 실제 원본1179×2556 PNG3장을 직접 확인했다. 원본 요구·ID·과거 evidence/readiness는 보존한다.

| 대상과 전체 R | 단계 | 확인·처리 |
| --- | --- | --- |
| S188, R-S188-L/D/S/C01/C02 | T-F63-02 | Monthly·Jun1–13 2025 UTC·Updated daily·11/2, 월 선택/더보기, 축0/5/10·Jun1/8·두 녹색 선/면·원형 범례 |
| S153, R-S153-L/D/S/C01/C02 | T-F63-03 | Jun12·11/2·세로 날짜선·두 강조점, 실제 포인터 날짜 선택/키보드 메뉴·월 선택·취소/복귀 |
| S150, R-S150-L/D/S/C01/C02 | T-F63-04 | Lifetime의 Jun12–Today·Updated daily·Latest, The Silence between Notes·23 hours ago·0/0, 정렬/글 본문/통계 복귀 |

- C54 직접: UTC 기간/선택/정렬/두 조회 경계·글별 소유권. C36/53/58/59/60/61: 실제 프로필 navigation·계정/발행 source revision·실패/취소·호출부와 기존 전체 회귀.
- C09: 기존 기사·작성 글 ID/본문 목적지. C65/66/67: 통계 조회를 멤버십/구매 수치로 바꾸지 않고 기존 계정 경계 유지. 실제 analytics 수집 없음.
- C01/02/03: 대체 서체·색·레이아웃·48px·포커스/큰 글자/스크롤. C71: 웹/Jest/JS/Hermes와 OS/native 구분.
- U-S150의 월간11/2 대 글별0/0 원인, U-S153의 선택 일자와 Total 라벨 관계, U-S188의 과거 계산식/중복 제거/지연, U-F63의 다른 월·정렬·상세·0건·오류/refresh는 미확인 유지. 현재 도움말의5초/30초 규칙을 과거 캡처에 소급 적용하지 않았다.

<a id="contracts"></a>
## 데이터·UTC·초안·수명 계약

아래는 기존 메모리 mock 계약과 이번 보완이다. 원본의 연속 조작/운영 집계 정책을 확정하는 설명이 아니다.

- 통계는 `userId` 소유 public+unlisted 발행 글을 실제 DraftSource에서 읽는다. 다른 계정·미발행 초안·미래 발행 글을 포함하지 않는다. 현재 mock API에는 발행 글 삭제/비공개 전환 명령이 없으므로 새로운 명령을 추가하지 않았다. 공급부 revision 변경/접근 실패/잘못된 소유 응답은 기존 조회 무효화·오류 경계로 처리한다.
- `month`는 YYYY-MM, 일자는 UTC YYYY-MM-DD. `start` 포함/`endExclusive` 미포함이며 현재 월은 asOf의 UTC 일자까지다. 과거 월 전체·윤년·연말·미래 월을 구분한다. asOf와 실제 publishedAt을 사용하며 ID/명령 시각으로 추정하지 않는다.
- 정상 mock source의 측정 기록 부재는 명시적인 모의0이다. 실제 읽기 행동을 수집하거나 수를 증가시키지 않는다. 응답의 null은 미집계이고 조회 중/실패는 spinner/오류로 표시하며0으로 대체하지 않는다.
- 공급부의 월 합계는 알려진 일자의 합이며 null/null 일자는 선/면을 연결하지 않는다. 일부 미집계가 있는 월 전체에는 합계 범위를 안내한다. 전부 null이면 숫자는 `—`; 특정 null 일자도 `—`와 미집계 안내를 표시한다. 알려진0은 숫자0이다.
- 월과 정렬은 독립 확정 값이다. 월 메뉴의 연도 이동만 임시 탐색이며 닫기/배경/뒤로는 월을 바꾸지 않는다. 월 항목은 선택 즉시 확정·메뉴 닫기, 다른 월이면 선택 날짜를 초기화한다. 별도 Done 버튼은 기존 계약에 없다. 날짜/정렬도 항목 선택으로 확정하며 단순 닫기는 유지한다.
- 월간과 Lifetime은 별도의 snapshot/asOf다. 한쪽 실패로 다른 쪽 성공을 지우지 않는다. 같은 source/user/auth revision/발행 revision/월 또는 정렬/attempt의 응답만 채택한다. 빠른 월 A→B→A·정렬 변경·재시도·화면 이탈은 이전 AbortSignal을 끝내며 취소를 무시하는 늦은 성공/실패도 무시한다.
- 글 상세로 갔다 돌아오면 월·날짜·정렬·기존 snapshot을 유지한다. 새 profile 진입/source 교체/인증 revision은 StatsRoute key로 화면과 메뉴를 새로 만든다. source A→B→A도 version을 증가시킨다. 발행 revision 변경은 두 조회를 다시 수행한다.
- 화면에 머물러도 asOf snapshot의 날짜/23 hours ago를 실제 시계 타이머로 임의 갱신하지 않는다. Refresh/재조회가 새 asOf를 만든다.15의 프로필 게시 경과 타이머·초안 Edited·목록 상대 시간과 합치지 않았다.
- 전체 reload는 인증/발행/통계 메모리와 초안을 초기화한다. 통계가 별도 영속 캐시/실서비스 analytics를 만들지 않는다.

## 독립 비교 fixture

자동 통합 테스트와8081의 일시적인 source 주입으로 `asOf=2025-06-13T12:00:00Z`, `start=2025-06-01T00:00:00Z`, `endExclusive=2025-06-14T00:00:00Z`를 고정했다. Jun12=11/2, Lifetime은 별도의 snapshot으로 같은 제목/0/0·publishedAt=Jun12 13:00Z(23시간 전)를 구성했다. 실제 본문 링크는 UI로 발행한 A의 글 ID를 사용했다. **이는 비교용 응답이며 정상 집계 계산식을 변경하거나 월간11/2에서 Lifetime0/0을 계산하지 않는다.**

그래프가 Jun12에서 끝나는 모습을 비교하고 null 경계도 검증하도록 Jun13은 null/null로 주입했다. 이 null과 앞선 날짜의0은 비교 fixture 선택이지 원본에서 개별 일자의 값을 확인했다는 뜻이 아니다. 미집계 안내는 자체 보완이며 원본에는 없고 그래프 위치에 영향을 준다. 브라우저의 임시 source/지연/실패/제목/CSS는 복원하고 최종 reload로 제거한다. 기본 앱은 실제 현재 UTC 월/자기 발행 글/명시적 모의0을 사용한다.

<a id="defects"></a>
## 결함·수정과 두 차례 자기 검토

| 재현·원인 | 수정·검증 |
| --- | --- |
| 웹 그래프 포인터 클릭이 날짜를 선택하지 않고 메뉴를 열음: RN Web MouseEvent에는 native locationX 없음 | 플랫폼별 좌표 adapter로 웹 clientX−그래프 부모 bounds, native locationX 유지. SVG 자식 클릭/키보드(detail0) 회귀와 실제 Jun12 클릭 확인 |
| 그래프 키보드 날짜 메뉴를 닫으면 더보기로 포커스 점프 | graph ref를 복귀 대상으로 연결. 더보기에서 연 날짜 메뉴는 더보기로 복귀, 그래프 경유는 그래프 복귀 |
| 일부 일자 null인데 월 합계가 모든 날짜의 완전한 합계처럼 보임 | 집계된 일자 기준 안내. null/0/조회 실패·재시도/선택 복원 실제 navigation 회귀 |
| Reads/Views 범례가 원본의 테두리 원 대신 글자 ● |9px 테두리 원과 별도 라벨, Light/Dark 색 분리·접근성 장식 숨김 |

1차 자기 검토:3 PNG·15 R/3 T/4 U/15 C, source/validator/hook/StatsRoute·모달/차트·기존 테스트를 대조하고 위 포인터/포커스·부분집계 문제를 재현했다.2차 자기 재검토: 전체 diff/호출부·source 재생성/AbortSignal·계정·일자 null/실제0·본문 복귀·레이아웃을 다시 확인하고 범례를 보완했다. 독립 리뷰어나 하위 에이전트는 사용하지 않았다.

회귀는 `StoryStatsNavigation.test.tsx`에 실제 SessionNavigation의 고정 snapshot/실패/재시도/날짜·본문 복귀1건, `statsPressLocation.test.ts`에 웹 SVG 부모 좌표/키보드 경계1건을 추가했다. navigation 전체를 mock하지 않았다. 기존 hook의 월 ABA/늦은 성공·실패/source/계정/발행 revision, source의 UTC 경계/소유권/검증 테스트를 함께 실행한다.

<a id="verification"></a>
## 검사 결과와 실패·재실행

Node24.18.0, 메모리 stdout 집계·검증 로그 파일 없음.

- 새 navigation RED:5통과/1실패,5.810초. 부분집계 안내가 없는 기존 화면에서 기대한 실패를 확인했다. 수정 후 관련3 suites/17 tests7.565초 통과/act0.
- 웹 좌표 회귀1 suite/1 test1.908초 통과/act0. jsdom은 이벤트 좌표 단위 경계이며 실제 브라우저/네이티브 검증으로 표현하지 않는다.
- 중간 iOS 전체160 suites/890 tests226.974초 통과/act0. 웹 회귀 파일 추가/최종 원형 범례 변경 전 실행이므로 최종 실행과 구분한다.
- 최종 타입 검사/lint exit0. 웹/iOS/Android 메모리 JS 구문 통과:2,050,949/2,371,590/2,372,284 bytes. iOS/Android Hermes 각 exit0·35경고·0오류, 실제 native 실행/빌드 아님.
- 중간 Android 전체161 suites/891 tests233.630초 통과/act0. 실행 도중 범례 보완이 있었으므로 최종 변경 고정 후 두 플랫폼 전체를 다시 수행한다.
- 최종 iOS161 suites/891 tests226.332초 통과, 실패/skip/이번 act0.
- 최종 Android161 suites/891 tests230.057초 통과, 실패/skip/이번 act0. 양 플랫폼 합계322 suites/1782 tests. 최종 변경 고정 후 실행이며 앞선 중간 결과로 대체하지 않았다.
- 브라우저 보조 조작에서 계정 선택만으로 로그인이 끝났다고 가정하거나 로그인 완료 전에 View stats를 찾고, 숨겨진 그래프/설정의 다른 라벨/잘못된 context 형태를 조회한 실패가 있었다. 실제 제공자 실행·화면 완료 대기·현재 라벨/context로 고쳐 재실행했다. 제품 실패로 처리하거나 숨기지 않는다.
- skip/기대값 약화/timeout 상향 없음. 이전 act 경고 비재현은 원인 해결의 증거가 아니다.18에서 시작한 호스트 sleep 방지는 연속 작업 종료 시 해제한다.

<a id="browser"></a>
## 실제8081·원본 비교

기존8081 PID22023 보존. Chrome158에서 실제 pointer/키보드·스크롤로 조작했다. 원본3 PNG와390×844/DSF1/UTC/en-US/Light 및 고정 source snapshot을 메모리로 대조했다. 원본의 iOS OS 영역·서체·정확 inset/스크롤은 동일 환경이 아니므로 완전 일치 판정은 아니다.

- 프로필→UI로 제목/한글 본문 입력·발행→View stats의 실제 자기 글0/0→본문→뒤로. 별도 비교 snapshot의 Monthly/Jun12 선택선·두 점/Lifetime Latest/23 hours ago/0/0도 각각 확인했다.
- 임시 연도 변경→닫기에서 Jun2025 유지. Jun→May→Jun→May→Jun·지연 응답 후 최종 Jun 유지. Latest/Reads/Latest 정렬, 날짜 메뉴 취소/선택과 graph 키보드 Space→닫기→graph focus 복귀를 확인했다.
- 일회성 월간 실패→오류/선택 월 보존·Lifetime 유지→재시도→Jun12/11/2 복원. Jun13 null 선택은 `—`, 알려진0·B 빈 발행 목록과 구분했다.
- A의 조회를 수동 지연→화면 이탈/로그아웃→B 로그인/빈 통계→늦은 A 응답 해제→B 유지→A 재로그인/자기 글 복귀를 실제 화면에서 확인했다. 기존 실제 navigation 테스트는 같은 A 새 세션과 늦은 성공/실패까지 확인한다. 같은 A 재로그인도 브라우저에서 새 현재 월/메뉴 초기화를 확인했다.
-320/393 Light/Dark 각 화면의 가로 넘침0·화면 내48px 미만 조작0. CSS2배/긴 한글 제목은272px 폭/264px 높이로 줄바꿈하고 본문 버튼/수치가 겹치지 않았다. 읽기 전용 통계에 IME 입력을 추가하지 않으며 작성 본문의 합성 한글 입력을 실제 OS IME 검증으로 주장하지 않는다.
- 같은 A 재로그인에서도 새 현재 월/닫힌 메뉴로 진입했다. source 함수 복원→기본 URL reload 뒤 주입 객체2개가 undefined였고, 새 A 로그인에서는 방금 발행했던 글이 없는 빈 Lifetime을 확인했다. 최종 기본 URL은 guest Home, browser console/runtime 오류0이다.

## 남은 차이·담당·종료 조건

| 잔여 | 담당·영향·종료 조건 |
| --- | --- |
|4 U, 과거 집계/일자 라벨·다른 월/정렬/실패의 원본 정책 |20/V34/Q03. 추가 원본/동일 상태 관찰 전 미확인 유지. 실제 analytics는 이번 제외 |
| 대체 서체·축/라벨 크기·본문/탭·OS inset/정확 간격, 자체 미집계 안내 높이 |20/Q02/Q12. 동일 플랫폼/확보 자산으로 재대조 필요. 메모리 부분 비교를 readiness 승격으로 사용하지 않음 |
| native 터치/스크린리더/큰 글자·Safe Area/뒤로 |21/Q07+20. 현재 CommandLineTools뿐, simctl/adb/emulator/실기기 없음. 실제 SDK·빌드·설치·조작 후 판정 |
| 앞 묶음의 기존 구현·시각·원본/native 잔여 |9~19 각 담당 유지.16~20의 로컬 커밋이 전체 Parity·실서비스 출시 완료를 뜻하지 않음 |

##8081 최종 확인 순서

1. 기본 URL 새로고침→프로필→로그인→모의A 선택→Sign in with Google 완료→View stats. 발행 글이 없으면 빈 Lifetime/월간0을 확인한다.
2. 프로필로 복귀→Write a story→제목/본문→Next/Publish now→View stats→현재 월·자기 글0/0→본문→뒤로.
3. 월 메뉴에서 이전 연도 탐색 후 닫기→확정 월 유지, 실제 월 선택→새 조회. 그래프 클릭→일자 제목, Space→날짜 메뉴→닫기와 포커스 복귀.
4. 더보기→날짜별 수치→월 전체/개별 날짜, 정렬 Latest/Views/Reads, Refresh와 본문 왕복을 확인한다.
5. 설정에서 로그아웃→B 로그인/빈 목록→A 복귀/자기 글을 확인한다. 새로고침 후 인증·모의 발행이 초기화된다.
6.320/393·Light/Dark·큰 글자에서 스크롤/메뉴/닫기/버튼 접근 확인. June2025·11/2 대0/0은 위 독립 비교 fixture이며 기본 앱의 현재 집계와 혼동하지 않는다.

## 수동 추적·파일 제한·종료

FE 차트/화면·플랫폼 좌표 adapter2개·회귀2파일과 이 결과/실행 계획/BACKLOG·관련 추적/현재 상태만 변경한다. comparisonBaseline의20 review/묶음 상태·존재 입력 해시를 수동 갱신하고19 manualUpdate 원문을 history에 보존한다. runtime codeInputs에는 좌표 adapter2개만 추가(555→557)하고 원본 ID/요구/PNG·과거 evidence/readiness·삭제4입력을 유지한다. tools 생성기는 실행하지 않는다.

tools/evidence/비교 캡처/검증로그/검증manifest/별도 도구 폴더 생성·수정 없음.20에서 자산·의존성·실제 외부 서비스 추가 없음. 현재 범위의 해결 가능한 지적과 설명되지 않은 검사 실패는 남지 않았고 승인된 로컬 커밋 조건을 충족한다.20 로컬 커밋으로16~20 연속 작업을 종료한다.21·22/push/배포는 수행하지 않는다.
