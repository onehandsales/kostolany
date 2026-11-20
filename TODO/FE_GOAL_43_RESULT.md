# Goal 43 — Story stats·월간·누적·정렬 결과

작성: 2026-11-21 KST, macOS. **구현 완료·검증 잔여**다. 기능 구현, 자동 검사, 원본 시각 대조, 실제 native 검증은 아래에서 구분한다. 원본 메뉴 자료와 글꼴, 실제 iOS/Android 실행이 남아 전체 완료로 표시하지 않는다. 실제 분석 데이터 수집이나 출시 완료를 뜻하지 않는다.

## 작업 기준과 보존

- 이번 승인은 Goal43 단독이다. 커밋·push·배포하지 않았으며 Goal44를 시작하지 않는다.
- 시작 HEAD: `036ef6e3f8ab15af0fa6ae14487b7a2bfe8c2aaf`. 시작 시 Goal42 관련 변경 **45개 경로(수정31·신규14)**가 이미 있었다. 이전 Goal이 커밋됐다고 가정하지 않았다. 시작 파일 사본과 SHA-256을 저장소 밖에 보관하고 최종 변경과 대조했다. 기존45개 중36개는 바이트 단위로 그대로이고 겹친9개는 통계 연결4개/현재 문서5개 변경만 추가했다.
- 기존 8081 Node PID `43927`을 사용했고 최종 HTTP200/동일 PID를 확인했다. 재시작·중복 서버 생성 없이 유지했다. ENV·package.json·lockfile·app.json·medium 원본은 이번 작업에서 수정하지 않았다.
- AGENT 공통/제품/UX 및 FRONT_AGENT README·6개 규칙, 전체 계획/대응표, Goal39~42 결과와 실제 인증·프로필·발행 코드를 확인했다. Goal42의 사진/대명사/공유 표시 변경을 보존했다. Goal37 작성기의 OS picker 잔여와 Goal42 native 미검증은 통계 구현의 선행 차단 사유가 아니며 해결했다고 기록하지 않는다.
- Goal41의194/1114, Goal42의204/1156은 과거 실행 기록이다. 이번 검사 결과는 아래 새 실행 기록을 따른다.

## 구현과 사용자 흐름

| 대상 | 구현·적용 시점 | 이번 검증 |
| --- | --- | --- |
| 프로필 → View stats → 뒤로 | 안내만 표시하던 버튼을 실제 개인 통계 stack으로 연결, 원래 프로필 복귀 | 실제 navigation 테스트 및8081 |
| 비로그인 프로필 보호 | 기존 mock 로그인 닫기·사용자 취소·실패·재시도·성공 후 프로필 복귀 유지 |8081 실제 조작, 기존 인증 전체 회귀 |
| Monthly | 동일 페이지 상단의 월·UTC 기간·Views/Reads·선/면 그래프·날짜 선택 | 원본 S188/S153 비교, 날짜/기간 단위 검사,8081 |
| 월 선택 | 연도 이동/월 선택은 자체 보완. 월을 누르면 적용·닫힘, 닫기/뒤로는 미적용. 다른 월이면 날짜 선택 해제 | 윤년·연말·현재 부분 월·미래 월 거절·역순 응답·닫기/포커스 |
| 날짜 선택 | 그래프 위치 또는 더보기의 날짜별 수치 메뉴로 선택, 월 전체로 복귀 가능 | 정확한 날짜/수치·선택선, 실제0과 미집계 구분 |
| Lifetime | Monthly 아래에 이어지는 가상 목록, 최초 발행일–Today, 글별 누적 수치 | 원본 S150 비교,0건/0값/긴 한국어/큰 값 |
| Latest/Views/Reads | 선택 즉시 조회·정렬, 닫기 미적용, 동률 발행 시각/ID로 안정 정렬 | 단위 검사·실제 navigation·8081 |
| 글 행 → 기존 작성 글 상세 → 뒤로 | 개인 소유 글만 열기, 별도 통계 상세 화면은 만들지 않음 | 월·정렬·날짜·스크롤 유지, 없는 글/잘못된 소유자 복구 |
| 작성 → mock 발행 → Stories → 통계 | 기존 발행 저장소를 조회, Public/Unlisted 모두 개인 통계 포함, 신규 글 초기0/0 | 실제 편집기/발행 navigation 및8081 |
| 조회 오류/부분 실패 | Monthly와 Lifetime의 로딩/오류/재시도를 분리, 월/정렬/날짜 선택 유지 | 동기 예외·늦은 실패·중복 재시도 검사,8081 월간 부분 실패 |
| A→B→A·같은 A 재로그인 | 계정 확정 데이터는 기존 메모리 정책 유지, 개인 route/선택/시트/오류는 새 세션에서 초기화 | 실제 navigation 및8081 지연 응답 주입 |
| 프로필 수정·다른 개인 기능 | ID 기준 연결, 통계 진입이 프로필/초안/관계/설정/저장/박수/온보딩 저장소를 재생성하지 않음 | 이름 수정→작성 글 표시·통계 유지8081, 관련 전체 회귀; 모든 조합의 수동 재실행을 뜻하지 않음 |
| 새로고침/재실행 | 브라우저 전체 새로고침은 인증·발행 메모리 초기화 |8081 새로고침 확인; native 앱 재실행은 미검증 |

## FE 응답·상태 수명 계약

### 기준 상태와 식별자

`WrittenStoriesProvider`의 기존 `DraftSource`가 발행 글 ID·소유자·제목·발행 시각·공개 범위의 유일한 기준이다. `createMockStoryStatsSource`는 그 source를 조회하는 투영이며 별도 발행 글 목록을 만들지 않는다. 개인 통계는 해당 사용자 소유 Public와 Unlisted를 합친다. 초안·타인 글·중복 ID·유효하지 않은 공개 범위를 거절한다. 현재 source에서 사라진 글은 다음 조회에서 제외된다. 삭제 제품 기능을 추가하지 않았다.

사용자 ID와 인증 revision은 세션 경계, 기사 ID는 행 키/상세 대상, source 객체와 발행 revision은 데이터 수명, 월/정렬/재시도 번호는 요청 식별자다. 이름/사진은 식별자가 아니다. 인증/프로필/설정 저장소에 통계를 복제하지 않는다. `ProfileRouteScreen`의 기존 개인 scope가 로그아웃/동일 계정 재로그인의 stack을 제거한다. 통계 source 교체도 통계 화면 선택/시트/오류를 초기화한다.

통계 화면의 월·정렬·날짜·스크롤은 route 수명에 속한다. 같은 route에서 글을 열었다가 돌아오면 유지한다. 프로필로 나갔다가 새로 진입하면 현재 UTC 월/Latest/월 전체로 시작한다. blur 시 시트를 닫고 요청을 취소한다. 완료된 같은 조건의 결과는 상세 복귀 때 불필요하게 재조회하지 않는다. 뒤로 복귀 중 source revision이 달라졌다면 다시 조회한다.

### 기간·집계·갱신

- 월은 `YYYY-MM`, 일은 `YYYY-MM-DD`, 시각은 ISO UTC다. 기간은 **시작 포함/끝 제외**다. 과거 월은 다음 달1일00:00까지, 현재 월은 현재 UTC 날짜의 다음 자정까지다. 화면의 끝 날짜는 포함 날짜로 바꿔 표시한다. 로컬 시간대는 날짜 계산에 사용하지 않는다.
- `asOf`는 각 조회 응답의 기준 시각이다. 현재 날짜의 결과는 그 시각까지의 부분 집계이며 미래 날짜를 만들지 않는다. 미래 월은 거절한다. UI 월 메뉴의1970년~현재 월 범위는 자체 보완이다.
- `StatsMeasurement`는 `userId/storyId/date`당 하나의 **이미 집계된 mock Views/Reads**다. 유효한 비음수 안전 정수만 받으며 중복 키·음수·소수·NaN·합계 overflow를 거절한다. 발행일 이전/현재 기준 이후/다른 소유자 기록을 집계하지 않는다. 당일이라도 아직 미래인 발행 시각의 글은 제외한다.
- 기능용 기본 measurements는 빈 배열이다. 존재하는 발행 글의 기록이 없으면0이다. Views/Reads는 이벤트 수집이나 실제 사람 수를 주장하지 않으며, 글 열기/박수/저장으로 증가하지 않는다. Reads≤Views 같은 미확인 제약도 추가하지 않았다.
- 월간 합계는 그 월의 일별 알려진 값 합, 글별 Lifetime은 해당 소유 글의 발행일부터 기준 시각까지의 mock 일별 합이다. Lifetime에는 원본처럼 **글별 수치**를 표시하며 임의의 별도 전체 합계 카드를 추가하지 않는다.
- 응답은 기간의 모든 날짜를 순서대로 포함해야 한다. 배열에서 날짜가 빠지면 오류다. 두 수치가 모두 `null`인 날은 명시적인 미집계 상태이며 `—`·안내·끊어진 그래프로 표시한다. 실제0과 구분한다. 합계는 알려진 날짜만 합하고 모두 미집계면 화면에 `—`를 표시한다. 기본 mock은 기록 없음=0이며 null을 임의 생성하지 않는다.
- 새 발행은 기존 source revision 변경→활성 통계 재조회 또는 다음 진입에서0/0으로 반영한다. 수동 Refresh도 가능하다. 시간만 흐른 경우 자동 polling은 없다. `Updated daily`는 보관본 문구이며 실제 배치 작업이나 현재 Medium 갱신 주기를 구현했다는 뜻이 아니다.
- Latest는 발행 시각 내림차순, Views/Reads는 해당 값 내림차순→발행 시각 내림차순→ID 문자열 오름차순이다. 동률에서도 순서가 안정적이다.

### 실패·역순 완료

Monthly/Lifetime 요청은 독립적이다. 선택을 바꾸면 이전 결과를 새 선택의 결과처럼 남기지 않고 해당 부분을 loading으로 표시한다. 오류 후에도 선택은 보존하고 해당 부분만 재시도한다. 진행 중 재시도는 중복 제출하지 않는다. 요청의 AbortController와 source/사용자/revision/조건/재시도 식별자를 함께 사용해 취소를 무시하는 source의 늦은 성공/실패도 차단한다. 발행 revision보다 오래된 응답은 새 목록을 덮지 못한다. 화면 이탈/source 교체/A→B→A/동일 A 재로그인도 같은 경계에서 처리한다.

글 상세는 기존 `WrittenStoryScreen`을 재사용하되 개인 통계 경로에서 `ownerId`를 검증한다. source가 다른 사람의 글을 잘못 반환하면 오류·재시도, 없는 글이면 찾을 수 없음·뒤로를 제공한다. 기존 공개 작성 글 경로의 정책은 유지한다.

## 원본 근거와 비교

기준은 `medium`의 iOS version ID1419 보관본이다. `Profile/ANALYSIS.md`, `Profile/Story stats/ANALYSIS.md`와 실제 PNG를 읽었다. F55 프로필 진입과 F63 통계4단계 중 아래4장을 비교했다.

| 원본 | 실제 비교 파일 | 관찰·남은 차이 |
| --- | --- | --- |
| S020 `sc_1bd141b757934a88b4a003855e1794cc` F63/01·F55/02 | `compare-S020.png` | View stats 실제 진입 연결. 기존 Drafts 진입 추가로 빈 Stories 위치가 다르고 following0/원본1, 이름·버튼·탭 글꼴/아이콘 차이가 남는다. Goal42의 잔여를 통계 완료로 숨기지 않는다. |
| S188 `sc_eece99396c944a4fac5e50820715f00a` F63/02 | `compare-S188.png` | Monthly, Jun2025, Jun1–13 UTC,11/2, 선/면 그래프·축·범례. 텍스트 weight/폭·범례 원형·하단 아이콘 차이. |
| S153 `sc_c8fa56a2dd5b4e959c333ea3e6d334e2` F63/03 | `compare-S153.png` | Jun12 선택 제목·세로선·강조점·11/2 대응. 글꼴/안티앨리어싱·범례 차이. |
| S150 `sc_c6580d2d071a4f079981013ccc658af4` F63/04 | `compare-S150.png` | 같은 페이지를335px 스크롤한 Lifetime, Latest,23hours, 동일 제목·0/0. 행 수치/라벨 간격을 재검토해 수정. 글꼴·아이콘 차이는 남음. |

원본1179×2556을393×852로 정규화하고 상단59/하단34를 제외한 앱 영역393×759와 Chrome393×759·Light·기본 글자 크기를 비교했다. 이는 비교용 crop이며 실제 native Safe Area/DPR 일치 증명이 아니다. 비교표는 원본/실제/50% overlay다. 기본 흰색 배경·텍스트 대비는 테마 토큰을 따른다. 원본 폰트 파일이 없어 시스템 sans 대체의 동일성을 주장하지 않는다.

**원본 비교 fixture:** 외부 Playwright 스크립트가 새 브라우저 세션의 mock B 이름을 Alex Smith로 저장하고, 검증용 본문으로 `The Silence between Notes`를 실제 발행했다. 고정 시각2025-06-12T10:00Z 발행→2025-06-13T09:00Z 조회로23hours를 재현했다. 월간 응답만11/2로 바꾸고 Lifetime0/0은 유지했다. 그래프가 수록되지 않은 마지막 날짜는 비교용 null로 표시했다. 이는 원본 내부의 미집계 정책을 알아냈다는 뜻이 아니다. **월간11/2와 글별0/0의 원인은 미확인**이며 정상 집계 수식/캐시 정책으로 일반화하지 않는다. 스크립트는 세션 source를 복구하고 닫는다.

**기능 검증 fixture:** 실제 발행 저장소에 연결된 독립적인 일별 measurements로 기간 합계/정렬/소유권을 검사한다. 원본 숫자 불일치를 앱 기본 데이터에 넣지 않았다. 브라우저 큰 값/긴 목록 검사는90억 Views·80억 Reads·200개 응답 행을 주입한 UI 경계 검사다. 실제200개 발행 성공이나 분석 성능 측정으로 표현하지 않는다.

추가 Gummble 검색은 iOS 프로필/목록 및 Medium 웹 피드를 반환했다. 직접 본 `sc_e6491de53d8743dca8a3ff0fc99dc1cb`, `sc_95e504331794455fb4776bd322254c76`, `sc_eeca4575e3d747cba6543964dcd4feb5`에는 필요한 통계 펼친 메뉴가 없었다. 새 자료의 version1419 동일 여부도 확인되지 않아 보관본을 교체하지 않았다.

현재 [Medium 공식 Stats 도움말](https://help.medium.com/hc/en-us/articles/215108608-Stats)은 월간 날짜별 그래프, 월 선택, 글별 누적 정렬과 별도 상세 통계를 설명한다. 조회 당시 문서는2026-11-13 갱신으로 표시됐으며 Views≥5초·Reads≥30초·사용자별 일 단위 중복 제거와 시간/일 단위 갱신 설명이 있다. 이는 **현재 공식 설명**이며 과거 PNG의 정의·Updated daily·11/2/0/0 원인을 증명하지 않는다. 이 프로젝트는 실제 체류시간이나 조회 이벤트를 수집하지 않는다.

**미수록/자체 보완:** 월 선택기의 모양·선택 범위, Latest 펼친 메뉴의 정확한 옵션/순서, 더보기 옵션·오류/빈 상태·접근성 날짜 목록은 미수록이다. Latest/Views/Reads만 범위에 맞게 제공하고 수익 정렬은 제외했다. 공식 설명의 별도 통계 상세 대신 기존 작성 글 읽기로 연결한 것은 자체 보완이다. 새로운 통계 상세·수익/멤버십/분석 서버를 확장하지 않았다.

## 두 차례 자체 검토와 수정

두 검토 모두 동일 작업자의 **자체 검토**다. 독립 검토/별도 에이전트 검토로 표현하지 않는다. 테스트 성공과 소스·동작·화면 검토를 구분했다.

### 1차: 구현·초기 실행 후 계약과 연결 검토

프로필 진입·실제 stack·발행 source·UTC 경계·합계/소유권·요청 수명·실패 복구를 코드와 초기 테스트/브라우저로 대조했다.

| 재현/실제 문제 | 기대·원인 | 수정·확인 |
| --- | --- | --- |
| 기존 View stats는 안내만 표시 | 실제 통계로 이동해야 하나 callback/route 부재 | 개인 통계와 기존 글 상세 route 연결, 실제 navigation 검사 |
| 잘못된 개인 상세 응답 또는 동기 source 예외 | 타인 글 표시 방지·오류 UI 필요, 기존 reader에 owner/동기 예외 경계 없음 | ownerId·요청 식별자·Promise 실패 경계 보완, 재시도 navigation 검사 |
| focus 복귀 때 같은 조회를 다시 초기화 | 스크롤/목록 맥락 보존 필요 | 같은 완료 조건 결과 유지, 변경된 source revision만 재조회, 뒤로 복귀8081 |
| 낮은 통계에서 소수 눈금·0 선택점 누락 | 집계 정수/선택0 표시 필요 | 최소 눈금1·0 선택 marker, 원본/브라우저 재확인 |
| 같은 UTC 날짜의 미래 발행 시각·합계 overflow | 기준 시각 이후 글 제외·유효 정수 유지 | 발행 시각 필터/합계 검사, 회귀 테스트 |
| 웹 SVG `accessible=false` DOM 경고 | 장식용 SVG의 웹/네이티브 속성 차이 | 플랫폼 속성 분리, 최종 브라우저 console 재확인 |
| 초기 타입/린트 오류 | 지원 아이콘명·테스트 props 타입·effect 상태 처리 오류 | 아이콘/명시 타입/조회 결과 수명 수정 후 검사 통과 |

### 2차: 수정 후 코드·최종 흐름·캡처 재검토

실제8081 정상/실패/취소/계정 전환9흐름과 별도 경계3흐름, 최종 소스·회귀 검사·원본4쌍을 다시 봤다. 첫 기록을 복사해 두 차례로 세지 않았다.

- 마지막 날짜를0으로 연결하면 미집계와0이 같아지는 문제를 확인했다. 명시적 null 날짜·`—`·분리된 선/면을 추가하고 응답 검증 테스트/실제 캡처로 확인했다.
- Lifetime 수치 행의 위 여백과 열 간격, 큰 숫자 축의 왼쪽 여백을 수정했다. 최종 bounds에서 수치/라벨 열은 x24/x120으로 분리되고 버튼/월 선택/뒤로 터치 높이는48 이상이었다.
- 200개 긴 제목 응답은 실제 DOM에10개 행만 렌더됐고320px에서 가로 넘침 없이 정렬/없는 글 복귀가 유지됐다. 화면 읽기 도구의 실제 native 동작까지 증명하는 것은 아니다.
- 최초 비교 캡처가 프로필 저장 완료 전에 찍힌 것은 캡처 스크립트 대기 결함이었다. 저장 시트가 닫힐 때까지 기다려 S020을 다시 캡처했다. 초기 브라우저 중복 텍스트 locator 실패도 도구 범위 문제로 구분했다.
- 최종 UTC 계약 대조에서 오프셋이 포함된 ISO 발행 시각의 날짜를 문자열 앞10자로 표시하던 경계를 발견했다. UTC로 정규화해 +09:00의 월말/윤일과 -09:00의 연도 전환 표시를 수정하고 기존 날짜 시나리오에 회귀 기대를 추가했다.
- 마지막 테스트 검토에서 빈 목록만 대조하던 발행 경합 시나리오를 기존 mock 발행을 실제 수행하는 검사로 강화했다. 조회 중 발행→최신 목록 표시→이전 Latest/Views 빈 응답 완료 후에도 새 글이 남는 것을 양 플랫폼에서 확인했다. 테스트 수는 늘리지 않았다.
- 수정 이후 타입/lint·전체 테스트·3플랫폼 export와 주요8081 흐름을 다시 실행했다. 기능상 알려진 결함을 Goal44/51로 미루지 않았다. 원본 메뉴/글꼴·native 미검증은 별도 잔여다.

## 실제 검사 결과

환경: macOS14.2 arm64, Node **24.18.0**. `.nvmrc`/engines를 확인하고 PATH를 해당 fnm 설치로 지정했다. 기본 shell Node22.21.1은 검사에 쓰지 않았다. packageManager 선언은npm10.9.0, 실행기는 해당 Node에 있는 **npm11.16.0**이다. 의존성을 재설치/갱신하지 않았으며 이 차이를 숨기지 않는다. Expo57.0.33/RN0.86.3/React19.2.3. 기존 react-native-svg15.15.4 사용, Goal43 추가 의존성 없음.

아래 명령은 `FE`에서 실행했다. 공통 접두사는 `env PATH=/Users/jaegeunsong/.local/share/fnm/node-versions/v24.18.0/installation/bin:$PATH`다.

| 명령/검사 | 실제 결과·증거 |
| --- | --- |
| `npm run typecheck` | UTC 표시 보완 후 통과, `typecheck-utc-final.log` |
| `npm run lint` | UTC 표시 보완 후 경고0 통과, `lint-utc-final.log` |
| `npm test` | **210 suites/1188 tests 전부 통과**,356.807초, iOS/Android 각각105 suites·2프로젝트. `full-tests-utc-final.log` |
| `npx jest --runInBand --runTestsByPath src/features/story-stats/useStoryStats.test.tsx` | 마지막 발행 경합 시나리오 보강 후2 suites/10 tests 통과1.542초, `final-race-test.log` |
| Goal43/작성 글 관련 초기 회귀 | iOS+Android8 suites/34 tests 통과25.581초, `review2-targeted.log`; 이후 null/표현 보완은 최종 전체 검사 기준 |
| `npx expo export --platform all --max-workers 2 --output-dir <외부경로>/export-utc-final` | web JS·iOS Hermes·Android Hermes 생성 성공, `export-utc-final.log`; native 빌드/실행 아님 |
| Chrome 실제8081 주요9흐름 최종 재실행 | 전부 통과, `browser-flows-utc-final.log`, `browser-flows.json` errors=[] |
| 계정 경합·동일A·큰 값/긴 목록3흐름 | 전부 통과, `browser-boundaries.json` errors=[] |
| 고정 비교 fixture·원본4쌍 | 캡처/overlay 대조 완료, `browser-reference-utc-final.log`, `browser-reference.json` errors=[] |

UTC 보완 전 전체210 suites/1188 tests(538.994초, `full-tests-final.log`)와 발행 경합 보강의 영향2 suites/10 tests를 먼저 확인했다. 이후 UTC 오프셋 표시 경계를 수정했으므로 전체 검사·타입/lint·export·주요 브라우저를 마지막 제품 코드로 다시 실행해 통과했다. 최종 기준은 위356.807초 실행이며 수치만 늘리는 새 테스트는 추가하지 않았다.

추가 테스트3파일은 `storyStats.test.ts`(6시나리오), `useStoryStats.test.tsx`(5시나리오), `StoryStatsNavigation.test.tsx`(5시나리오)다. 양 플랫폼 프로젝트에서 실행한다. UTC/윤년/년 경계·소유자/공개 범위·합계·null·정렬·실제 발행·취소·동기 예외·source/revision·역순 성공/실패·A/B/동일A·부분 실패·뒤로 복귀를 담당한다. navigation 테스트는 실제 native-stack/bottom-tabs 및 provider를 사용하며 navigation 자체를 가짜로 대체하지 않는다. native 렌더러/환경 mock이 포함된 Jest를 실제 기기 실행으로 표현하지 않는다.

초기 로그의 컴파일/locator/DOM 경고와 최종 결과는 구분한다. export의 NO_COLOR/FORCE_COLOR 경고와 Expo CLI의 src/app 탐지 안내는 실제 브라우저 console 오류가 아니다. 장애용 source 변경은 외부 테스트 세션에서 복구·종료했고 앱 기본 source에는 실패 설정/비교 숫자를 남기지 않았다.

## 플랫폼과 미검증

| 구분 | 이번 확인 | 남은 조건/영향 |
| --- | --- | --- |
| 웹 | 실제Chrome8081,393×759/320×640,Light/Dark,긴 한국어·90억 수치·200행·포커스/Escape/뒤로/선택 상태, CSS160% | CSS 확대는 Dynamic Type 아님. 웹 키보드 조작은 VoiceOver/TalkBack 증명 아님 |
| iOS | Jest iOS, Hermes export | Xcode 앱/Simulator runtime 없음, CLT만 설치. `xcrun simctl` 불가, xcodebuild가 Xcode 필요. 실제 build/run·Safe Area·글자 확대·VoiceOver 대기 |
| Android | Jest Android, Hermes export | SDK/adb/emulator 없음. JDK11/17/21/23은 있어 Java 부재가 원인이 아님. SDK/emulator 또는 기기 연결 후 build/run·TalkBack/폰트 확대 확인 필요 |
| 시각 근거 | F63 수록 화면4장 비교, 원본 PNG 보존 | 원본 글꼴/정확한 메뉴/아이콘 일부 차이, 실제 OS 렌더·스크롤 물리 미확인 |

수록되지 않은 월/정렬/더보기 메뉴는 동등 재현 미완료다. OS 환경을 갖춘 뒤 실제 터치·스크린리더·Safe Area·재실행 확인이 필요하다. 이 조건들을 기록한 것만으로 Goal43 전체 완료로 바꾸지 않는다.

## 증거 보관·재현

모든 임시 캡처·비교·스크립트·로그·시작 사본은 저장소 밖 다음 경로다.

`/var/folders/jg/zn9h2_f91nxfpwz9hzpkqcv80000gn/T/kostolany-goal43-d_9an3cw`

- `platform-environment.json`은 Xcode/Simulator/Android SDK 확인 결과, `preservation-audit.json`은 기존 변경 보존 대조다.
- `COMPARISON.html`, `compare-S020/S188/S153/S150.png`, `pairs.json`, 원본 복사와 실제 캡처를 포함한다. `compare.swift`로 정규화/overlay를 만든다.
- `browser-flows.cjs`, `browser-boundaries.cjs`, `browser-reference.cjs`를 Node로 실행한다. 기존8081과 설치된 Chrome이 필요하다. Playwright는 이전 외부 임시 경로의 설치를 참조하므로 보관 경로가 사라지면 저장소 밖에서 다시 설치/경로 수정이 필요하다.
- `browser-reference.cjs`는 위 고정 시각/이름/글을 새 세션에서 만든다. 기본 수동 사용은 현재 월/0 통계이므로11/2를 바로 보여주지 않는 것이 정상이다.
- 임시 OS 디렉터리는 영구 보관이 아니며 청소/재부팅/환경 교체로 사라질 수 있다. 저장소에는 이 결과 문서/테스트만 남는다. 사용자 변경 사본도 같은 보관 한계가 있다.
- `TODO/evidence`, `TODO/_evidence`와 저장소 내부에 임시 로그/비교/검증 스크립트를 추가하지 않았다.

## 8081 최종 확인 순서

1. `http://localhost:8081` 새로고침→프로필→mock 로그인 닫기/취소/실패 후 재시도→예시 독자 A로 로그인한다. 성공 후 프로필에서 View stats를 직접 누른다.
2. 현재 UTC 월·0/0·빈 Lifetime을 확인한다. 월 선택에서 이전 월을 선택하고 날짜별 수치→날짜 선택→월 전체를 확인한다. 메뉴 닫기/Escape 후 선택과 포커스가 유지되는지 본다.
3. 프로필로 뒤로→Write a story→검증용 제목/본문→Next→Publish now를 진행한다. 한 글은Public, 다른 글은Unlisted로 발행한다. 내 Stories 필터와 개인 통계의 포함 범위가 다른 것을 확인한다.
4. View stats→월/날짜 선택→Lifetime의Latest/Views/Reads→글 열기→뒤로를 확인한다. 초기 통계는0/0이며 동률은 발행 시각/ID 순이다. 원래 월/정렬/스크롤이 남아야 한다.
5. 프로필 이름 변경→Save→View stats/글 상세로 들어가 ID와 발행 글이 유지되는지 본다. 설정의 로그아웃 취소/실패/재시도 후B 로그인→B 빈 통계→A 재로그인→A 발행 글 복원을 확인한다.
6. Dark·작은 모바일 폭·큰 CSS 글자·월/정렬 메뉴 닫기/스크롤을 확인한다. 전체 새로고침하면 mock 인증/발행 메모리가 초기화된다.
7. 조회 실패·역순 응답·비교용11/2·큰 값은 기본 UI에 장애 스위치를 추가하지 않았다. 필요하면 위 외부 스크립트 또는 해당 Jest 테스트로 재현한다.

최종 HEAD는 시작과 동일하고 staged 변경은 없으며 `git diff --check`를 통과했다.

권장 커밋 메시지: `feat(fe): implement Goal 43 story stats and sorting`. 이번 작업은 커밋하지 않았다. 작업 트리에는 이전 Goal42 변경도 함께 있으므로 사용자가 커밋 전 변경 범위를 확인해야 한다.
