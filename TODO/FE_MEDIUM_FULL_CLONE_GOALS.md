# Medium 전체 화면·UX 후속 Goal 실행 계획

**현재 진행 — Goal47 공유 기능 구현·두 차례 자체 검토 수행, 원본/실제 native 검증 잔여.** 기사·인용·작가/토픽/목록·발행 글·플레이어의 공유 대상과 실제 웹 복사/PNG 저장을 연결했다. 전체230suites/1318tests와 후속 최종 영향16suites/60tests·브라우저12묶음·5쌍 비교·3플랫폼 export 근거는 [Goal47 결과](FE_GOAL_47_RESULT.md)를 따른다. 실제 OS 저장/공유 검증과 원본 자산 차이·Goal48 멤버십 연결이 남는다. Goal46은 `a148542`에 로컬 커밋했다. Goal48~53을 이어서 진행한다.

**현재 승인:** Goal44→53을 순서대로 구현·두 차례 검토·수정·검사·문서 갱신하고 각 Goal별로 로컬 커밋한다. 사용자의 별도 승인으로 Goal42·43 기준 사본을 새로 검증해 `b11b004`에 분리 기록했다. Goal44·45·46은 `00b2527`·`ee1c299`·`a148542`에 기록했고 이후 단계도 각각 검토·로컬 커밋한다. 기존 변경·ENV·medium·8081을 보존한다. push·배포·Goal54·백엔드 개발은 승인 범위가 아니다. 아래 과거 종료/커밋 금지/검사 수치/PID는 당시 이력이다.

**Goal43 당시 상태 — 과거 실행 기록(2026-11-21, macOS): 구현 완료·검증 잔여.** 프로필 View stats→Monthly/Lifetime·UTC 월/날짜·Latest/Views/Reads·기존 발행 글 상세/복귀를 연결하고 두 차례 자체 검토했다. 타입/lint·전체210 suites/1188 tests(356.807초)·web/iOS/Android export를 통과했다.8081 정상/실패/계정 경합을 확인하고 원본4쌍을 대조했다. 최종 전체 검사에는 UTC 표시·발행 경합 회귀도 포함한다. [Goal43 결과·실제 전체 검사·8081 순서](FE_GOAL_43_RESULT.md)에 기능/자동 검사/시각/native를 구분한다. 월/정렬 펼친 원본·글꼴 차이·실제 native 검증이 남아 전체 완료로 표시하지 않는다.

**Goal42 당시 상태 — 과거 실행 기록(2026-11-20, macOS): 구현 완료·네이티브 검증 대기·원본 차이 잔여.** 사진 Camera/Library·대명사 최대4·부모 Save/Cancel·공유 이름/아바타·About·Stories 복귀를 연결했다. [Goal42 결과·검증·8081 확인 순서](FE_GOAL_42_RESULT.md)에서 Goal42 당시 코드의 실행 결과와 원본 차이·네이티브 검증 대기를 구분한다. 당시 타입/lint·전체204 suites/1156 tests(355.276초)·8081·web/iOS/Android export를 통과했다. Goal41의194 suites/1114 tests는 과거 기록이다. 실제 native/OS 검증이 남아 Goal42 전체 완료로 표시하지 않는다.

**Goal43 당시 승인 — 현재 적용 없음:** Goal43만 구현·두 차례 자체 검토·수정·검증·문서 갱신 후 종료한다. 시작 HEAD는 `036ef6e`이고 Goal42 변경45개 경로가 이미 미커밋 상태였다. 기존 변경·ENV·medium 원본과8081 PID43927을 보존했다. **커밋·push·배포 금지, Goal44 미착수.** 커밋은 사용자가 결과 확인 후 직접 한다. 과거 연속 진행/커밋 승인은 적용하지 않는다.

Goal42 프로필은 Expo OS picker 어댑터와 웹 파일 선택을 구현했다. **Goal37 작성 편집기의 Camera/Library는 여전히 mock 선택**이다. 프로필 OS 호출의 구현과 iOS/Android 기기 성공 검증을 구분한다.

**Goal41 당시 상태 — 과거 실행 기록:** **구현 완료·검증 잔여**. 신규/기존 mock 분기·관심사 최소3·추천 Follow·모의 알림·안내/중단/재개를 기존 인증/관계/navigation에 연결하고 두 차례 자체 검토했다. 최종 타입/lint·전체194suites/1114tests를 통과했다. 8081 정상/실패/계정 전환·원본6쌍·3플랫폼 export를 확인했다. [Goal41 결과](FE_GOAL_41_RESULT.md)에 원본 차이/native·OS 검증 잔여와 자체 정책을 기록했다. 당시 Goal42는 미착수였다. Goal40은 `03b766a`로 커밋됐다. 실제 OS 알림·외부 연동은 없다. Goal37 실제 OS picker는 기존 구현 잔여이며 Goal42에서 필요한 범위를 다시 확인한다.

**과거 승인 — 이번 Goal42에 적용하지 않음(2026-11-20 KST): Goal41→42의 구현·각각 두 차례 자체 검토·검증·결과 기록과 각 Goal별 로컬 커밋1회, 총2회다. Goal41 결과/해시 보고 후 별도 확인 없이 Goal42를 진행하고 종료한다. push·배포·Goal43 이후와 과거 연속 진행/커밋/push 지시는 적용하지 않는다.**

**Goal40 당시 결과:** **구현 완료·검증 잔여**. 가입4/로그인5경로의 공통 mock 인증·이메일6자리/재전송·세션 경계·로그아웃intro를 구현하고 두 차례 자체 검토를 수행했다. 최종 타입/lint·전체190suites/1092tests·8081 정상/실패/계정 흐름·원본 비교·3플랫폼 export를 통과했다. [Goal40 결과](FE_GOAL_40_RESULT.md)에 원본 시각/native·OS 검증 잔여와 정책 변경을 구분했다. 실제 OAuth/메일/계정 생성은 없다. Goal37의 실제 Camera/Library OS picker 호출은 구현 잔여이며 local/mock 선택만 지원한다. Goal37/38/39는 `68a51b4`/`3b41943`/`3c4adb2`에 커밋했고 Goal40 변경을 로컬 커밋한 뒤 종료한다. push·배포·Goal41 이후는 진행하지 않는다.

**Goal39 당시 결과:** **구현 완료·검증 잔여**. 토픽 최대5·미리보기·Publication/Unlisted·mock 발행·실제 작성 문서 상세를 연결하고 두 차례 자체 검토를 수행했다. 최종 타입/lint·전체186suites/1074tests·8081 정상/실패/계정 흐름·원본 비교·3플랫폼 export를 통과했다. 실제 native/OS와 원본 시각 잔여, publication 보완 정책은 [Goal39 결과](FE_GOAL_39_RESULT.md)를 따른다. Goal37/38은 각각 `68a51b4`/`3b41943`에 커밋됐다.

**Goal38 당시 결과:** **구현 완료·검증 잔여**. 초안 자동 저장/실패/재개·ID를 보존하는 멘션과 두 차례 자체 검토, 전체180suites/1060tests·타입/lint를 통과했다. 이후 빈 문서 상태/시각 보정의12suites/54tests, 마지막 후보/메뉴 보정의최종 타입/lint·4suites/18tests·8081·원본5쌍·3플랫폼 export도 통과했다. [코드 기준과 결과](FE_GOAL_38_RESULT.md). 실제 native/OS·원본 시각 잔여와 메모리 초기화 정책은 별도다. Goal37은 `68a51b4`에 로컬 커밋했다.

**Goal37 당시 결과:** **구현 완료·검증 잔여**. 이미지 문서/출력·실패/권한·계정 수명과 두 차례 자체 검토, 전체174suites/1038tests·타입/lint 통과 후 실패 이미지 삭제 보완의 최종 타입/lint·4suites/14tests·브라우저·3플랫폼 export도 통과했다. [현재 결과](FE_GOAL_37_RESULT.md). Camera/Library는 로컬 mock 선택이며 실제 OS picker 호출과 native 실행은 구분한다.

**Goal36 당시 결과:** Write/실제 입력·선택/서식·계정/이탈과 두 차례 자체 검토를 마쳤다. 전체168suites/1014tests(653.522초) 통과 후 제목 포커스 표시만 수정하고 최종 타입/lint·영향 navigation2suites/10tests(28.78초)·브라우저/캡처·3플랫폼 export를 다시 확인했다. [실행 기준과 결과](FE_GOAL_36_RESULT.md).8081 기본8흐름·시각/포커스3흐름·원본5쌍을 확인했으며 원본 동일 재현·실제 native는 잔여다. Goal34의160/964와 Goal35의164/990은 각 Goal 당시 전체 검사다.

**과거 승인 — 현재 적용 없음(2026-11-20 KST): Goal37→38→39→40의 구현·각각 두 차례 자체 검토·검증·결과 기록과 각 Goal별 로컬 커밋1회, 총4회다. 각 결과/해시 보고 후 다음 승인된 Goal을 이어서 진행하고 Goal40에서 종료한다. push·배포·Goal41 이후와 과거 연속 진행/커밋/push 지시는 적용하지 않는다.**

**Goal37~40 당시 기준 — 과거 기록:** Goal35·36은 `66f1041`에 커밋된 상태로 시작했고 작업 트리는 깨끗했다. Node24.18.0/npm10.9.0과 기존8081 PID5248을 확인했다. Goal37은 `68a51b4`에 로컬 커밋했고 Goal38은 `3b41943`에 커밋했다. Goal39는 `3c4adb2`에 커밋했다. Goal40 최종 검사/기록을 마쳤으며 해당 변경만 로컬 커밋하고 종료한다. `TODO/evidence`·`TODO/_evidence` 및 저장소 내부 비교/로그/검증 스크립트는 만들지 않는다.

**과거 승인 기록 — 현재 적용 없음:** Goal25~31의 소스·자산·테스트·결과 문서를 함께 커밋하고 `origin/main`에 푸시하도록 요청받았던 이력이다. Goal32 작업 시작 HEAD는 `da38ae2`였다.

**과거 Goal31 범위 변경 이력:** Goal31까지만 구현·검토·검증·문서화를 마친 뒤 종료하고 Goal32 이후는 시작하지 않도록 했던 요청이다. 현재 범위는 상단 Goal44~53 연속 승인이다.

작성일: 2026-11-19 KST · 작업 위치: `D:\git_repository\kostolany_project`.

**Goal31 종료 당시 상태(macOS):** [Goal31 결과](FE_GOAL_31_RESULT.md)의144 suites/856 tests·타입/lint·8081·양 플랫폼 JS/Hermes는 당시 코드 결과다. Goal32의 검사 결과로 사용하지 않는다.

**과거 연속 진행 승인 이력 — 현재 적용 없음:** Goal25→35 순차 실행 요청과 초기 HEAD `2e7aedd` 기록이 있었다. 이후 Goal31 종료, Goal32 단독 승인으로 변경되었던 이력이다.

목표는 보관된 **Medium iOS 화면·문구·폰트·텍스트 크기·픽셀 위치·상태·이동 흐름을 그대로 재현하는 FE**다. 1차 MVP에 없던 기능뿐 아니라 기존 화면의 차이와 미연결 메뉴까지 포함한다. 백엔드 구축 전에 화면과 mock 동작을 완성하고, 마지막에 실제 구현을 근거로 API/DB 설계에 필요한 계약을 인계한다.

## 읽는 순서와 현재 기준선

1. 이 문서의 범위·필수 규칙·완료 기준을 읽는다.
2. [전체 원본·메뉴·미확인 대응표](FE_MEDIUM_FULL_CLONE_MAP.md)에서 해당 Goal의 흐름과 화면 ID를 확인한다.
3. [Medium 원본 목록](../medium/README.md), 해당 `ANALYSIS.md`와 실제 PNG, [R2 재검토](../medium/REVIEW_R2.md), [공식 자료 대조 기록](../medium/SOURCES.md)을 함께 읽는다.
4. 현재 코드와 직전 결과를 확인한 뒤 아래 의존성 순서대로 실행한다.

| 기준 | 확인 내용 |
| --- | --- |
| 기존 이력 | [Goal 1~13 및 전체 이력](FE_GOALS.md), [Goal 14~21 계획](FE_MEDIUM_CLONE_GOALS.md), [Goal 21 결과](FE_GOAL_21_RESULT.md), [기존 화면 대응표](FE_MEDIUM_SCREEN_MAP.md) |
| 현재 Git 기준 | 재개 HEAD `036ef6e`에서 선행59개 기준 사본을 별도 검증하고 사용자 승인으로 `b11b004`에 기록했다. Goal44~53은 단계별 로컬 커밋한다. |
| 현재 검증의 범위 | [Goal46 결과](FE_GOAL_46_RESULT.md)의 코드/명령 기준을 따른다. 이전 Goal 수치는 당시 이력이며 자동·브라우저·export·native를 구분한다. |
| 원본 범위 | iOS version ID 1419의 보관본. 63개 흐름·273단계 참조·고유 화면 200장. UI 요소 43장은 이 200장의 부분집합이며 화면 ID/파일 해시가 같다. 현재 출시 앱·Android·웹 전체를 조사한 자료는 아니다. |
| 구현 출발점 | 홈/탐색/Stories 검색/기사/저장/목록 기본 편집/모의 계정/프로필 기본 편집이 있다. Write·Responses·Follow·Share·여러 설정은 안내 또는 정적 표현이 남아 있다. 자세한 상태는 대응표와 Goal 22에서 실제 코드로 확인한다. |
| 시각/native 한계 | 기존 비교 31쌍은 200장 전체 비교가 아니다. 원본 글꼴 파일과 일부 메뉴 상태가 없고, JS/Hermes export는 native build/run 증거가 아니다. |
| 승인 경계 | Goal44~53 순차 작업·각 단계 로컬 커밋. mock 유지, 실제 외부 연동·push·배포·Goal54 이후 제외. |

기존 문서의 Windows 경로·과거 PID·MVP 제외 범위·이전 종료 문구는 당시 실행의 이력이다. **현재 실행은 macOS `/Users/jaegeunsong/Desktop/workplace/kostolany`와 Goal44~53 순차 작업·단계별 로컬 커밋 지시를 적용**한다. 기존 기능이 일부 있다는 이유로 새 Goal을 완료 처리하지 않으며, 기존 사용자 데이터/4단계 설명/기본 수준/mock 계정 계약은 보존하고 원본 차이를 표시한다.

## 필수 규칙과 구현 경계

매 Goal 시작 시 [AGENT README](../AGENT/README.md), [제품 결정](../AGENT/PROJECT_SCOPE.md), [현재 구현 상태](../AGENT/SOFTWARE_AGENT/COMMON/IMPLEMENTATION_STATUS.md), [공통 작업 규칙](../AGENT/SOFTWARE_AGENT/COMMON/QUALITY_AND_WORKFLOW.md), [UX 규칙](../AGENT/UXUI_AGENT/README.md), [Medium 조사 규칙](../AGENT/UXUI_AGENT/MEDIUM_REFERENCE.md)을 확인한다. FRONT_AGENT는 README만 읽고 끝내지 않는다.

| 필수 FRONT_AGENT 문서 | 모든 Goal에서 적용할 검토 기준 |
| --- | --- |
| [README](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/README.md) | 현재 React Native/Expo 구조·책임과 작업/검증 경계를 지킨다. |
| [ARCHITECTURE](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/ARCHITECTURE.md) | `app/features/shared` 의존성, 기능별 공개 계약·단일 상태 소유자. feature→app 역참조와 shared→feature 모델/fixture 의존을 만들지 않는다. 기능 이름만으로 불필요한 공통 계층을 만들지 않는다. |
| [CODE_CONVENTIONS](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/CODE_CONVENTIONS.md) | strict TypeScript, 명시적인 `ComponentProps`, 의미 있는 영문 이름. `any`·억지 cast·lint 해제로 규칙을 피하지 않는다. 새로 쓰거나 수정하는 설명 주석은 **한국어 한 문장·한 줄**, 테스트 시나리오는 한국어로 쓴다. |
| [STATE_AND_DATA](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/STATE_AND_DATA.md) | 최신 의도·A→B→A·늦은 성공/실패·source 교체·unmount·계정 격리. 이전 조회가 새 쓰기를 덮지 않아야 한다. 목표 상태 명령/중복 방지와 누적 박수의 별도 의미를 지킨다. |
| [MOBILE_UI_AND_PLATFORM](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/MOBILE_UI_AND_PLATFORM.md) | native-stack+bottom-tabs, typed route ID/복귀 맥락, 활성 route만 back 처리. 입력·스크롤·Safe Area·키보드·48×48 논리 터치 영역·OS 글자 확대·VoiceOver/TalkBack을 보존한다. |
| [PERFORMANCE_AND_SECURITY](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/PERFORMANCE_AND_SECURITY.md) | 긴 동적 목록 가상화·안정 키·같은 축 ScrollView 중첩 금지·좁은 구독·이미지 비용·자원 정리. 세션/사용자 데이터·민감 로그·저장소·native 경계를 확인한다. |
| [TESTING_AND_DELIVERY](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/TESTING_AND_DELIVERY.md) | 의미 있는 실패/회귀 검사·두 차례 실제 검토·증거·미검증 전달. 문서·자동 테스트·브라우저·번들·native 결과를 구분한다. |

- `medium`의 문서/PNG는 원본으로 보존한다. 사용자 후속 지시에 따라 `TODO/evidence` 폴더와 별도 비교HTML·로그·검증스크립트 산출물을 새로 만들지 않는다. 실제 캡처/비교·명령 검증은 수행하되 필요한 파일은 저장소 밖 임시 경로를 사용하고, 출처/조건/실측값/실행 결과/차이는 `TODO/FE_GOAL_NN_RESULT.md`와 필요한 TODO 문서에 기록한다.
- Git 상태·기존 사용자 변경·삭제·ENV·8081 프로세스를 확인하고 보존한다. 이 계획이 중복 서버 실행·재시작·패키지 전체 갱신의 이유가 되지 않는다. 실행 환경이 필요할 때 기존 8081을 먼저 확인한다.
- 앞 Goal의 공통 계약을 확장하고 테스트 가능한 mock source/native adapter 경계를 사용한다. 후반 Goal의 실제 인증/멤버십 입력이 필요한 앞 Goal은 기존 mock 세션과 명시적 fixture 입력으로 구현한 뒤 담당 Goal에서 연결한다.
- 폼의 초안/확정 상태·Cancel/Done/Save 시점·실패 입력 보존·국소 롤백을 구분한다. 공유 숫자/목록/관계는 화면별 복제 상태로 관리하지 않는다.
- 실제 서버 연동을 만들지 않아도 [API 계약 규칙](../AGENT/SOFTWARE_AGENT/COMMON/API_CONTRACT.md)에 맞게 입력/출력/오류/순서/식별자/선택적 필드의 의미를 기록한다. 관찰하지 않은 사업 정책을 확정하지 않는다.
- 신규 라이브러리/플랫폼 API가 필요한 Goal은 현재 버전·공식 문서·플랫폼 지원을 조사한 뒤 필요한 변경만 한다. 새로운 외부 유료 서비스나 실제 사용자 계정 연동을 가정하지 않는다.

## 원본과 동일하게 만들기 위한 판정 기준

| 비교 항목 | 필수 기록과 판정 |
| --- | --- |
| 비교 환경 | 원본 ID·분석 문서·캡처 시나리오·OS/브라우저/기기·viewport·배율·폰트 배율·테마·계정·스크롤·키보드·선택값·fixture 버전·실제 구현 커밋/변경 상태 |
| 크기 정규화 | 보관 PNG는 1179×2556. 기존 비교는 393×852로 정규화하고 OS 상단 약59/하단 약34를 제외한 393×759 앱 영역을 썼다. **비교용 값**이며 MCP 390×844 또는 실제 기기/DPR의 증명이 아니다. 시트/키보드 화면은 crop 영역을 개별 확인한다. |
| 폰트/텍스트 | family·파일/출처·weight·size·lineHeight·letterSpacing·baseline·줄바꿈·정렬·문구/대소문자·말줄임·강조 범위. 시스템 sans/Georgia/serif 대체는 동일 판정 근거가 아니다. |
| 위치/형태 | 요소 bounds·x/y·폭/높이·패딩/마진/간격·터치 영역·border/radius·색·그림자·아이콘 형태/크기·사진 crop·시트 높이·고정/스크롤 동작 |
| 행동/상태 | 진입→선택/입력→확정/취소→결과→복귀, 활성/비활성/선택 표시·숫자·로딩·오류·권한·빈 상태·OS UI와 앱 UI의 경계 |
| 실제 비교 증거 | 실제 앱 렌더 캡처와 원본을 나란히/overlay/diff로 비교한다. 검증 중 원본 crop·실제 캡처·비교 결과는 저장소 밖 임시 경로를 사용하고, 문서에는 원본ID·조건·좌표/텍스트 차이와 원인을 남긴다. 생성 이미지나 화면 전체 배경으로 구현을 대체하지 않는다. |
| 차이 허용 해석 | 폰트 미확보·OS 안티앨리어싱·접근성·Safe Area 차이를 숨기거나 임의 점수 99%로 동일 판정하지 않는다. 측정 가능한 배치/타이포 차이는 수정하고 불가피/미확인 차이는 항목별 공개한다. 기본 배율 비교와 큰 글자/Android 적응 검증은 별도다. |

영어 원문·사진·같은 사용자/기사·선택 상태를 비교용 fixture로 재현한다. 원본의 Alex/카운트 등 비교 데이터는 명시적으로 선택하고 실제 사용자 상태를 조작해 캡처를 맞추지 않는다. 원본에 없는 전체 본문을 원문처럼 만들어 넣지 않는다. 보관 자산을 로컬 비교에 쓰는 것과 외부 서비스로 공개하는 것은 별개다.

**완료 판정은 기능 구현 / 자동 검사 / 원본 시각 대조 / 실제 native 검증을 각각 기록한다.** 폰트나 펼친 메뉴를 확인하지 못했으면 해당 동일 재현 항목은 미완료다. 확인된 화면 구현을 진행할 수는 있지만 미확인 항목을 삭제하거나 전체 클론 완료로 묶지 않는다.

## 범위·근거·진행 상태를 기록하는 방법

- 근거는 **관찰 / 공식 설명 / 미수록 / 자체 보완**으로 구분한다. 공식 설명은 동작 근거이며 특정 픽셀·메뉴 모양의 증거가 아니다. 오류·빈 상태·취소·재시작 정책을 보완하면 이유와 원본 차이를 남긴다.
- 진행은 **미착수 / 진행 / 구현 완료·검증 잔여 / 완료 / 진행 불가 항목 있음**으로 기록한다. 마지막 상태는 필요한 근거/환경/해결 조건을 함께 적고 자동으로 다음 기능을 삭제하지 않는다.
- 아래 개별 완료 조건을 충족해도 그 Goal에 필요한 시각/native/근거 확인이 남으면 **구현 완료·검증 잔여**다. 잔여를 문서화한 것만으로 완료로 바꾸지 않는다. 관찰되지 않은 성공 화면을 임의로 만들어 잔여를 해소하지 않는다.
- 모든 새 Goal의 초기 상태는 **미착수**다. 63개 흐름/200장 대응표는 계획 커버리지이며 현재 구현 완료율이 아니다.
- 미수록 자료는 Gummble의 해당 앱/flow/screen 조회 및 필요한 공식 문서로 보완한다. 기존 보관본과 새 버전이 다르면 기본 비교 목표는 보관본으로 유지하고 차이/추가 근거를 별도 기록한다. 특정 기능 의미가 충돌하면 그 항목을 미확정으로 남긴다.
- 자료/환경 부족이 있어도 독립적인 작업은 진행한다. 선행 계약 결함은 먼저 수정하고, 불명확한 정책을 사실로 확정해야만 진행 가능한 항목은 필요한 질문/근거를 남긴다. 기다리는 동안 완료로 표시하지 않는다.
- Member 혜택 문구의 수익화/custom domain/publication 생성/Mastodon은 그 **혜택 표현**을 재현한다. 자료에 없는 별도 운영 서비스까지 자동 구현하지 않는다. 캡처된 진입점에 연결된 미수록 화면은 대응표의 보완 대상으로 유지한다.

## Goal 순서와 실행 단위

권장 실행 순서는 **22→53**이다. 아래 선행 번호는 최소 의존성이다. 23의 공통 표현과 24의 테마 규칙은 모든 후속 화면에 적용하고, 후속 연결은 50/51에서 통합한다. 큰 Goal도 화면/상태 단위로 구현·검증하되 완료 조건을 임의 축소하지 않는다.

| Goal | 작업 | 최소 선행 | 현재 상태 |
| --- | --- | --- | --- |
| [22](#goal-22) | 원본 전수 대응·현재 코드·비교 환경 기준선 | 기존 Goal 21 이후 코드 | 기준선 완료 / 원본 동일성·native 잔여 별도 |
| [23](#goal-23) | 공통 글꼴·아이콘·레이아웃과 기존 화면 보정 | 22 | 구현 완료·검증 잔여 — [결과](FE_GOAL_23_RESULT.md) |
| [24](#goal-24) | 전역 Light·Dark·System과 기사 표시 설정 | 23 | 구현 완료·시각/native 검증 잔여 — [결과](FE_GOAL_24_RESULT.md) |
| [25](#goal-25) | 기사 본문·박수·읽음 표시·상세 메뉴 | 24 | 구현 완료·검증 잔여 — [결과](FE_GOAL_25_RESULT.md) |
| [26](#goal-26) | Responses·댓글·답글·정렬·수정·삭제 | 25 | 구현 완료·검증 잔여 — [결과](FE_GOAL_26_RESULT.md) |
| [27](#goal-27) | 문구 선택·Highlight·인용 Responses | 26 | 구현 완료·검증 잔여 — [결과](FE_GOAL_27_RESULT.md) |
| [28](#goal-28) | 작성자 프로필·팔로우·팔로잉·이메일 구독 | 25 | 구현 완료·검증 잔여 — [결과](FE_GOAL_28_RESULT.md) |
| [29](#goal-29) | Mute·Block·신고·응답 관리 | 26, 28 | 구현 완료·검증 잔여 — [결과](FE_GOAL_29_RESULT.md) |
| [30](#goal-30) | 토픽·Publication·큐레이션 탐색 | 28 | 구현 완료·검증 잔여 — [결과](FE_GOAL_30_RESULT.md) |
| [31](#goal-31) | 추천 관리·관심사·읽기 이력 | 29, 30 | 구현 완료·검증 잔여 — [결과](FE_GOAL_31_RESULT.md) |
| [32](#goal-32) | 공개 목록·Saved lists·목록 반응 | 26, 28, 30 | 구현 완료·원본/native 검증 잔여; [결과](FE_GOAL_32_RESULT.md) |
| [33](#goal-33) | 내 목록 메모·정렬·공개 범위·편집·삭제 | 32 | 구현 완료·검증 잔여 — [결과](FE_GOAL_33_RESULT.md) |
| [34](#goal-34) | Digest·날짜 필터·Library 연결 | 27, 31, 33 | 구현 완료·검증 잔여 — [결과](FE_GOAL_34_RESULT.md) |
| [35](#goal-35) | 목록 다운로드·오프라인 화면 상태 | 33, 34 | 구현 완료·검증 잔여 |
| [36](#goal-36) | 글쓰기 편집기·텍스트 서식 | 23, 24 | 구현 완료·검증 잔여 |
| [37](#goal-37) | 글쓰기 이미지·Camera·Library·Unsplash | 36 | 구현 완료·검증 잔여 |
| [38](#goal-38) | 초안 저장·재개·멘션 | 37 | 구현 완료·검증 잔여 |
| [39](#goal-39) | 토픽 최대 5개·발행 미리보기·Publish | 30, 38 | 구현 완료·검증 잔여 ([결과](FE_GOAL_39_RESULT.md)) |
| [40](#goal-40) | 가입·로그인·이메일 코드·세션·로그아웃 | 23, 24 | 구현 완료·검증 잔여 ([결과](FE_GOAL_40_RESULT.md)) |
| [41](#goal-41) | 온보딩 관심사·추천 팔로우·알림 안내 | 30, 31, 40 | 구현 완료·검증 잔여 ([결과](FE_GOAL_41_RESULT.md)) |
| [42](#goal-42) | 프로필 사진·대명사·소개·Stories 필터 | 28, 39, 40 | 구현 완료·native/원본 검증 잔여 ([결과](FE_GOAL_42_RESULT.md)) |
| [43](#goal-43) | Story stats·월간·누적·정렬 | 39, 42 | 구현 완료·native/원본 메뉴·글꼴 검증 잔여 ([결과](FE_GOAL_43_RESULT.md)) |
| [44](#goal-44) | 알림 목록·Push·Email·Tailored 설정 | 26, 28, 34, 41 | 구현 완료·원본/native 검증 잔여 — [결과](FE_GOAL_44_RESULT.md) |
| [45](#goal-45) | Listen·미니/확장 플레이어·재생 제어 | 25 | 기능 구현·두 차례 자체 검토, 원본/native 검증 잔여 |
| [46](#goal-46) | 재생 속도·음성·검색·AirPlay·큐 상태 | 29, 45 | mock 구현·두 차례 자체 검토·검증 잔여 ([결과](FE_GOAL_46_RESULT.md)) |
| [47](#goal-47) | 기사·인용·작가·토픽·목록 공유와 이미지 저장 | 27, 28, 30, 32, 46 | 기능 구현·두 차례 자체 검토, native/원본 차이 잔여 |
| [48](#goal-48) | Member·Friend 구독 화면과 mock 권한 | 33, 41, 47 | 미착수 |
| [49](#goal-49) | 남은 설정·앱 아이콘·외부 안내 | 42, 44, 48 | 미착수 |
| [50](#goal-50) | 검색 추가 결과·홈/탭/진입 경로 마감 | 31, 34, 39, 44, 49 | 미착수 |
| [51](#goal-51) | 기능 간 상태·실패·계정 격리 통합 검증 | 35, 43, 46, 50 | 미착수 |
| [52](#goal-52) | iOS·Android·접근성·성능·native 경계 검증 | 51 | 미착수 |
| [53](#goal-53) | 63개 흐름 최종 대조·누락 해소·백엔드 인계 | 52 | 미착수 |

## 각 Goal의 필수 실행·두 차례 검토

1. **시작:** 범위/선행 결과/실제 Git/규칙/원본/환경을 확인하고 이번에 구현할 화면 ID와 상태를 목록화한다.
2. **구현:** 해당 범위의 UI·mock 동작·연결과 필요한 회귀 검사를 작성한다. 의미 없는 구현 복제 테스트는 추가하지 않는다.
3. **1차 검토:** 최종 후보의 코드 경계/상태/모든 진입점/화면·메뉴·복귀를 실제 원본과 대조한다. 문제별 파일·규칙/화면 ID·재현·기대/실제·영향을 남긴다.
4. **수정·검증:** 발견된 결함을 고치고 관련 검사와 실제 캡처를 다시 수행한다.
5. **2차 재검토:** 수정된 코드와 사용처·동작·캡처를 새로 검토한다. 첫 검토 표를 복사해서 두 차례 검토로 세지 않는다. 새 결함은 수정 후 영향 범위를 다시 검증한다.
6. **결과 기록:** `TODO/FE_GOAL_NN_RESULT.md`에 검토·측정·명령 실행 결과와 미검증 항목을 기록하고 이 계획/대응표의 실제 상태를 갱신한다. 별도 `TODO/evidence` 폴더는 만들지 않는다. 자기 검토인지 독립 검토인지 구분한다.
7. **다음 단계:** 단일 Goal 요청이면 종료한다. 범위 연속 실행 요청이면 검토/결과를 남긴 뒤 다음 Goal로 진행한다. 해결되지 않은 의존 결함은 먼저 해결한다.

각 Goal은 성공뿐 아니라 해당되는 loading/empty/error/retry/cancel·권한 거절·제한·긴 데이터·계정 교체를 검증한다. 관찰되지 않은 상태는 자체 보완이라고 기록한다.

현재 스크립트 기준 검사는 `FE`에서 다음과 같이 수행한다. Goal 22에서 실제 package.json/환경을 다시 확인한다.

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test -- <영향받은 테스트 파일 또는 패턴>
```

공통 상태/통합 변경과 22/51/53에서는 범위에 맞게 `npm.cmd run check`를 사용한다. 통과한 검사는 새 변경·실패·미해결 우려 없이 반복하지 않는다. 플랫폼 변경 시 필요한 `npm.cmd run export:android`, `npm.cmd run export:ios`는 JS/Hermes 검사이며 native build/run과 별도 기록한다. 문서만 바꾼 이번 작업은 링크·번호·범위·의존성·diff 검사로 검증한다.

## Goal별 상세 작업

<a id="goal-22"></a>

### Goal 22 — 원본 전수 대응·현재 코드·비교 환경 기준선

- **상태/선행:** 기준선 작업 완료 / 기존 구현·현재 Git 확인. [결과](FE_GOAL_22_RESULT.md)의 구현·자동 검사·시각·native 상태를 각각 적용한다. 원본 폰트 확보·미수록 메뉴·실제 native 검증을 완료로 처리한 것은 아니다.
- **원본:** [전체 흐름·화면](FE_MEDIUM_FULL_CLONE_MAP.md). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** 대응표의 63개 흐름·273단계·200개 고유 화면과 43개 UI 요소 중복을 다시 대조한다. 현재 FE의 실제 화면·상태 소유자·ReferenceNotice 진입점·미동작 메뉴를 추적한다. 8081 상태, 실제 기기/시뮬레이터 사용 가능 여부, 폰트·자산·화면 측정 조건을 기록한다. 미수록 분기는 읽기 전용 Gummble 조회와 필요한 공식 문서로 보완하고 확보한 버전·일시·증거를 별도 보관한다.
- **시각 비교:** 원본 PNG·단계·계정·테마·스크롤·키보드·선택값을 캡처 시나리오로 고정한다. 폰트 후보의 출처와 실측 여부, 색상·좌표·텍스트 기준점을 정리한다. 출처가 다른 값은 덮어쓰지 않는다.
- **상태·계약:** 기존 계정·기사·목록·좋아요 상태의 단일 소유자와 후속 기능의 접점을 정한다. 반응 대상 종류, 읽기 이력, 작성 초안, 알림, 설정 등 필요한 FE 공개 계약의 담당 기능을 지정하되 DB 스키마는 만들지 않는다.
- **검증 시나리오:** 현행 typecheck·lint·전체 테스트로 새 기준선을 확인하고 실패가 기존 문제인지 새 문제인지 기록한다. 대표 화면을 실제 렌더해 비교 파이프라인을 확인한다. 원본/문서 링크·중복·메뉴 누락과 이후 의존성을 검사한다.
- **완료 조건:** 모든 원본·현재 진입점·미확인 항목에 담당 Goal이 있고 새 기준선과 비교 재현 절차가 남아 있다. 미확인 자료는 담당 Goal·재조회 결과·다음 확인 방법을 기록한다.
- **미확인·경계:** 원본 폰트 파일·정확한 기기/DPR·애니메이션·누락 메뉴·실제 native 환경을 추측으로 확정하지 않는다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_22_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-23"></a>

### Goal 23 — 공통 글꼴·아이콘·레이아웃과 기존 화면 보정

- **상태/선행:** 구현 완료·검증 잔여 / Goal22. [Goal23 결과](FE_GOAL_23_RESULT.md)의 실측·두 검토·현재 검사와 폰트/아이콘/시각/native 잔여를 따른다. Goal24에서 테마를 연결하며 기존 폰트/아이콘 차이는 유지한다.
- **원본:** [전체 흐름·화면](FE_MEDIUM_FULL_CLONE_MAP.md). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** 홈·탐색·기사·목록·프로필·설정의 공통 헤더/탭/카드/시트/메뉴/입력을 원본에 맞춘다. 확인된 폰트와 아이콘을 적용하고 화면별 크기·행간·굵기·자간·줄바꿈·좌표·여백·색상·선·그림자·이미지 crop을 보정한다.
- **시각 비교:** 기존 추정 토큰을 실측으로 교정한다. 본문과 UI 글꼴을 구분하고 시스템 폴백별 차이를 기록한다. 뒤늦게 폰트가 로드되어 생기는 줄바꿈/높이 변화도 비교한다.
- **상태·계약:** 공통 UI는 표현 계약을 받고 feature의 모델·fixture를 가져오지 않는다. 기존 4단계 읽기 도구·기본 수준·계정 선택은 별도 검증하며 데이터 계약을 유지한다.
- **검증 시나리오:** 대표 화면의 밝은/어두운 배경, 긴 제목, 영어 원문·한국어, OS 글자 확대를 비교한다. 공통 컴포넌트 변경의 실제 사용처 회귀와 탭/시트 터치·닫기를 확인한다.
- **완료 조건:** 측정표와 실제 비교 캡처가 있고 각 공통 구성요소의 차이가 수정되거나 미해결로 명시되어 있다. 시스템 글꼴 대체를 원본 동일로 판정하지 않는다.
- **미확인·경계:** 확보하지 못한 글꼴·아이콘 경로·애니메이션은 대체 근거와 남은 차이를 유지한다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_23_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-24"></a>

### Goal 24 — 전역 Light·Dark·System과 기사 표시 설정

- **상태/선행:** 구현 완료·시각/native 검증 잔여 / Goal23. [Goal24 결과](FE_GOAL_24_RESULT.md). Goal24 당시 실행은 해당 로컬 커밋 후 종료했으며 현재25~35 승인과 구분한다.
- **원본:** [F16](FE_MEDIUM_FULL_CLONE_MAP.md#f16), [F24](FE_MEDIUM_FULL_CLONE_MAP.md#f24), [F58](FE_MEDIUM_FULL_CLONE_MAP.md#f58), [F62](FE_MEDIUM_FULL_CLONE_MAP.md#f62). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** 설정의 Light/Dark/System, OS 테마 추종, 기사 Display의 Font size·Font·Theme·Show highlights를 구현한다. 원본의 100%/120% 상태와 다크 홈·목록·기사·설정·오버레이를 맞춘다.
- **시각 비교:** 표면·보조 글자·구분선·아이콘·선택 표시까지 테마별로 검증한다. 기본 OS 글자 배율의 원본 대조와 큰 글자 검증을 분리한다.
- **상태·계약:** 전역 테마와 기사 읽기 설정의 소유권/우선순위를 근거에 따라 명시한다. 다른 사람의 highlight 표시 설정이 내 저장 highlight를 삭제하지 않는다. 계정 전환·로그아웃·복귀 시 설정 범위를 명시한다.
- **검증 시나리오:** System 상태의 OS 변경, 열린 시트에서 변경, 설정 취소/복귀, 기사 재진입, 비동기 저장 실패와 A→B→A를 검사한다.
- **완료 조건:** 설정값과 모든 연결 화면의 실제 색/크기가 함께 변하며 저장 범위와 native 미검증이 기록되어 있다.
- **미확인·경계:** Font 선택 목록과 기사 Theme의 전역 영향은 원본 후속 상태가 부족하므로 추가 확인 전 동일 동작으로 단정하지 않는다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_24_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-25"></a>

### Goal 25 — 기사 본문·박수·읽음 표시·상세 메뉴

- **상태/선행:** 구현 완료·검증 잔여 / Goal24. [현재 결과](FE_GOAL_25_RESULT.md).
- **원본:** [F05](FE_MEDIUM_FULL_CLONE_MAP.md#f05), [F16](FE_MEDIUM_FULL_CLONE_MAP.md#f16), [F24](FE_MEDIUM_FULL_CLONE_MAP.md#f24), [F30](FE_MEDIUM_FULL_CLONE_MAP.md#f30), [F31](FE_MEDIUM_FULL_CLONE_MAP.md#f31), [F32](FE_MEDIUM_FULL_CLONE_MAP.md#f32), [F33](FE_MEDIUM_FULL_CLONE_MAP.md#f33), [F34](FE_MEDIUM_FULL_CLONE_MAP.md#f34), [F35](FE_MEDIUM_FULL_CLONE_MAP.md#f35), [F36](FE_MEDIUM_FULL_CLONE_MAP.md#f36), [F38](FE_MEDIUM_FULL_CLONE_MAP.md#f38), [F62](FE_MEDIUM_FULL_CLONE_MAP.md#f62). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** 기사 본문·유료 배지·하단 관련 기사/토픽/작성자 구성을 보정하고 누적 박수와 내 반응을 구현한다. 더보기의 Show less like this/Display/Follow/Mute/Report story 진입 계약, 읽음 이력과 목록의 Viewed/제목 색 상태를 마련한다.
- **시각 비교:** 박수 피드백·숫자·기사 머리/꼬리·읽음 색을 원본 상태별로 비교한다. 기존 하트의 boolean like를 누적 박수로 이름만 바꾸지 않는다.
- **상태·계약:** 기사 반응·댓글 반응·목록 반응의 대상 식별과 담당 feature를 분리한다. 읽음 이력 발생 조건과 원본에서 미확인인 정책을 표시한다. 메뉴의 후속 처리 담당은 28/29/31/47이다. 현재 공식 설명의 기사/목록 최대50·Undo claps·박수 사용자 목록은 Goal22 근거를 확인하고 target별 계약으로 반영한다. 펼친 UI와 댓글 한도는 미확인이다.
- **검증 시나리오:** 연속 입력·중복 완료·실패 복구·이전 조회의 새 반응 덮어쓰기·기사 전환·계정 격리·읽음 재진입을 검사한다.
- **완료 조건:** 본문과 반응/읽음 상태가 관련 카드에 일관되게 표시된다. 후속 메뉴의 미연결은 담당 Goal로 추적하며 전체 메뉴 완성을 선행 주장하지 않는다.
- **미확인·경계:** +16 캡처는 16회 터치 증거가 아니다. 박수 상한 등 공식 정책은 실행 시 공식 자료로 확인하고 +50 등을 임의 가정하지 않는다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_25_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-26"></a>

### Goal 26 — Responses·댓글·답글·정렬·수정·삭제

- **상태/선행:** 구현 완료·시각/native 검증 잔여 / Goal25. [결과](FE_GOAL_26_RESULT.md): 두 자체 검토·수정,112 suites/758 tests·타입/lint·브라우저·양 플랫폼 JS/Hermes.
- **원본:** [F16](FE_MEDIUM_FULL_CLONE_MAP.md#f16), [F25](FE_MEDIUM_FULL_CLONE_MAP.md#f25), [F29](FE_MEDIUM_FULL_CLONE_MAP.md#f29), [F30](FE_MEDIUM_FULL_CLONE_MAP.md#f30), [F31](FE_MEDIUM_FULL_CLONE_MAP.md#f31), [F32](FE_MEDIUM_FULL_CLONE_MAP.md#f32), [F33](FE_MEDIUM_FULL_CLONE_MAP.md#f33), [F34](FE_MEDIUM_FULL_CLONE_MAP.md#f34), [F35](FE_MEDIUM_FULL_CLONE_MAP.md#f35), [F36](FE_MEDIUM_FULL_CLONE_MAP.md#f36), [F38](FE_MEDIUM_FULL_CLONE_MAP.md#f38). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** Responses 패널, 댓글 작성/수정/삭제 확인, Most relevant/Most recent, 중첩 답글, 댓글 박수, Hide replies/Read more/See more replies, Medium policy 진입을 구현한다. 정적 834 같은 숫자를 실제 mock 결과와 연결한다.
- **시각 비교:** 입력 포커스·키보드·부모 댓글·답글 들여쓰기·내 댓글 메뉴·본문 펼침을 각각 원본과 대조한다.
- **상태·계약:** 댓글/부모/기사/작성자 ID와 반응 상태를 소유 기능에서 관리한다. 정렬·접힘·페이지 추가를 구분하고 다른 항목의 수정/삭제를 오염시키지 않는다. 작성자 관리 권한은 29와 연결한다.
- **검증 시나리오:** 실패 시 입력 유지, 취소 복원, 중복 제출, 정렬 도중 늦은 응답, 삭제된 대상에 대한 답글, 답글/박수 수의 중복 증가, 긴 스레드 가상화를 검사한다.
- **완료 조건:** 기사에서 댓글 작성→답글→수정→삭제→정렬→복귀가 연결되고 수와 내용이 일치한다. 펼침/답글 숨김은 서로 독립적으로 동작한다.
- **미확인·경계:** 자기 댓글 박수가 비활성처럼 보이는 캡처만으로 정책을 확정하지 않는다. 작성자의 응답 숨김/토론 종료 UI는 29에서 보완한다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_26_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-27"></a>

### Goal 27 — 문구 선택·Highlight·인용 Responses

- **상태/선행:** 구현 완료·시각/native 검증 잔여 / Goal26. [결과](FE_GOAL_27_RESULT.md): 두 자체 검토·현재118 suites/778 tests·타입/lint·8081·양 플랫폼 JS/Hermes.
- **원본:** [F24](FE_MEDIUM_FULL_CLONE_MAP.md#f24), [F25](FE_MEDIUM_FULL_CLONE_MAP.md#f25), [F29](FE_MEDIUM_FULL_CLONE_MAP.md#f29), [F30](FE_MEDIUM_FULL_CLONE_MAP.md#f30), [F31](FE_MEDIUM_FULL_CLONE_MAP.md#f31), [F32](FE_MEDIUM_FULL_CLONE_MAP.md#f32), [F33](FE_MEDIUM_FULL_CLONE_MAP.md#f33), [F34](FE_MEDIUM_FULL_CLONE_MAP.md#f34), [F35](FE_MEDIUM_FULL_CLONE_MAP.md#f35), [F36](FE_MEDIUM_FULL_CLONE_MAP.md#f36), [F41](FE_MEDIUM_FULL_CLONE_MAP.md#f41). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** 본문 선택 핸들/메뉴의 Highlight·Respond·Share·더보기, highlight 표시/해제, 인용 문구를 포함한 댓글, Library Highlighted 진입과 원문 복귀를 구현한다.
- **시각 비교:** 선택 범위·색·문맥 메뉴 위치·인용 블록·키보드 상태를 맞추고 스크린샷 텍스트를 이미지로 붙여 선택을 흉내 내지 않는다.
- **상태·계약:** 기사 버전과 선택 구간/인용 텍스트 식별, 사용자 소유 highlight와 타인 highlight를 구분한다. 원문 변경·삭제·동일 구간 중복의 처리 계약을 남긴다. Share 실행은 47과 연결한다.
- **검증 시나리오:** 여러 문단/긴 문장 선택, 선택 취소, 스크롤 후 메뉴, highlight 중복/삭제 실패, 인용 댓글 실패 시 입력 유지, 계정 변경을 검사한다.
- **완료 조건:** 선택→저장→Library→원문 복귀와 선택→인용 응답이 이어진다. web/native 선택 구현의 실제 검증 범위를 각각 남긴다.
- **미확인·경계:** 미수록 더보기와 선택 API의 플랫폼 차이는 추가 확인하며 단순 정적 색칠을 네이티브 선택 완료로 보지 않는다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_27_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-28"></a>

### Goal 28 — 작성자 프로필·팔로우·팔로잉·이메일 구독

- **상태/선행:** 구현 완료·시각/native 검증 잔여 / Goal25. [실제 결과](FE_GOAL_28_RESULT.md).
- **원본:** [F01](FE_MEDIUM_FULL_CLONE_MAP.md#f01), [F02](FE_MEDIUM_FULL_CLONE_MAP.md#f02), [F03](FE_MEDIUM_FULL_CLONE_MAP.md#f03), [F06](FE_MEDIUM_FULL_CLONE_MAP.md#f06), [F12](FE_MEDIUM_FULL_CLONE_MAP.md#f12), [F13](FE_MEDIUM_FULL_CLONE_MAP.md#f13), [F14](FE_MEDIUM_FULL_CLONE_MAP.md#f14), [F15](FE_MEDIUM_FULL_CLONE_MAP.md#f15), [F16](FE_MEDIUM_FULL_CLONE_MAP.md#f16), [F17](FE_MEDIUM_FULL_CLONE_MAP.md#f17), [F18](FE_MEDIUM_FULL_CLONE_MAP.md#f18), [F19](FE_MEDIUM_FULL_CLONE_MAP.md#f19), [F20](FE_MEDIUM_FULL_CLONE_MAP.md#f20), [F21](FE_MEDIUM_FULL_CLONE_MAP.md#f21), [F22](FE_MEDIUM_FULL_CLONE_MAP.md#f22), [F23](FE_MEDIUM_FULL_CLONE_MAP.md#f23), [F55](FE_MEDIUM_FULL_CLONE_MAP.md#f55), [F56](FE_MEDIUM_FULL_CLONE_MAP.md#f56), [F57](FE_MEDIUM_FULL_CLONE_MAP.md#f57). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** 작성자 Stories/Lists/About, 고정 이야기, 웹사이트, 팔로워/팔로잉 진입, 작가와 publication이 섞인 Following list, Follow/Following/Unfollow, 작가별 이메일 수신을 구현한다.
- **시각 비교:** 프로필 헤더·배지·탭·팔로우 상태·이메일 확인 UI를 원본 문구와 위치로 맞춘다. Member/Friend 시작 월을 계정 가입일로 잘못 해석하지 않는다.
- **상태·계약:** 관계 상태를 작성자 카드·상세·추천·Following에 공유하고 이메일 구독을 팔로우와 별도 계약으로 관리한다. 작가 공유는 47, mute/block/report는 29, 공개 목록은 32와 연결한다.
- **검증 시나리오:** 팔로우/해제 빠른 전환, 모달 취소, 지연 응답, 이메일 실패, 사용자/작가 전환, 잘못된 외부 링크, 긴 Following list를 검사한다.
- **완료 조건:** 같은 작성자의 관계와 수신 상태가 모든 진입점에서 일치하고 공개 프로필 탭/목록 진입이 연결된다.
- **미확인·경계:** 팔로워 목록·공개 About의 추가 상태가 없으면 재조회하고 없는 화면을 원본 관찰로 기록하지 않는다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_28_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-29"></a>

### Goal 29 — Mute·Block·신고·응답 관리

- **상태/선행:** 구현 완료·시각/native 검증 잔여 / Goal26,Goal28. [결과](FE_GOAL_29_RESULT.md).
- **원본:** [F12](FE_MEDIUM_FULL_CLONE_MAP.md#f12), [F13](FE_MEDIUM_FULL_CLONE_MAP.md#f13), [F14](FE_MEDIUM_FULL_CLONE_MAP.md#f14), [F15](FE_MEDIUM_FULL_CLONE_MAP.md#f15), [F16](FE_MEDIUM_FULL_CLONE_MAP.md#f16), [F17](FE_MEDIUM_FULL_CLONE_MAP.md#f17), [F18](FE_MEDIUM_FULL_CLONE_MAP.md#f18), [F19](FE_MEDIUM_FULL_CLONE_MAP.md#f19), [F20](FE_MEDIUM_FULL_CLONE_MAP.md#f20), [F21](FE_MEDIUM_FULL_CLONE_MAP.md#f21), [F22](FE_MEDIUM_FULL_CLONE_MAP.md#f22), [F23](FE_MEDIUM_FULL_CLONE_MAP.md#f23), [F24](FE_MEDIUM_FULL_CLONE_MAP.md#f24), [F28](FE_MEDIUM_FULL_CLONE_MAP.md#f28), [F30](FE_MEDIUM_FULL_CLONE_MAP.md#f30), [F31](FE_MEDIUM_FULL_CLONE_MAP.md#f31), [F32](FE_MEDIUM_FULL_CLONE_MAP.md#f32), [F33](FE_MEDIUM_FULL_CLONE_MAP.md#f33), [F34](FE_MEDIUM_FULL_CLONE_MAP.md#f34), [F35](FE_MEDIUM_FULL_CLONE_MAP.md#f35), [F36](FE_MEDIUM_FULL_CLONE_MAP.md#f36). [F45](FE_MEDIUM_FULL_CLONE_MAP.md#f45), [F46](FE_MEDIUM_FULL_CLONE_MAP.md#f46), [F50](FE_MEDIUM_FULL_CLONE_MAP.md#f50). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** 작성자 Mute/Block/Report author와 기사 Report story, 목록 내 기사 메뉴의 동일 대상 처리를 구현한다. 이유 선택·추가 설명·선택적 Also block·권리/정책 링크·성공/취소 상태, 응답 숨김/토론 종료의 확인된 범위를 다룬다.
- **시각 비교:** 작가 더보기의 Share/Mute/Block/Report/Cancel, 차단/신고 시트의 문구·선택·경고를 원본별로 맞춘다.
- **상태·계약:** mute·block·report를 서로 다른 상태/명령으로 관리한다. 기사/작가/응답 대상 ID를 보존하고 노출·추천·응답 권한에 대한 mock 정책과 관찰 근거를 구분한다.
- **검증 시나리오:** 취소 시 무변경, 미선택 제출, 연속 신고·실패 재시도, 선택적 block 동반 여부, 다른 대상/계정 오염, 음소거 목록의 해제를 검사한다.
- **완료 조건:** 각 대상 메뉴가 올바른 확인/신고 경로로 연결되고 확정 상태만 관련 화면에 반영된다.
- **미확인·경계:** 공식 설명에만 있는 응답 숨김/토론 종료, 캡처에 없는 역방향 해제·신고 세부 화면은 자료 확보 또는 자체 보완으로 표시한다. 차단 토스트 뒤에도 기사 카드가 보이는 보관본과 공식 도움말의 콘텐츠 제한 설명은 충돌을 기록하고, 화면 관찰과 mock 접근 정책을 구분한다. 실제 신고 전송은 하지 않는다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_29_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-30"></a>

### Goal 30 — 토픽·Publication·큐레이션 탐색

- **상태/선행:** 구현 완료·시각/native 검증 잔여 / Goal 28.
- **원본:** [F01](FE_MEDIUM_FULL_CLONE_MAP.md#f01), [F02](FE_MEDIUM_FULL_CLONE_MAP.md#f02), [F03](FE_MEDIUM_FULL_CLONE_MAP.md#f03), [F04](FE_MEDIUM_FULL_CLONE_MAP.md#f04), [F05](FE_MEDIUM_FULL_CLONE_MAP.md#f05), [F07](FE_MEDIUM_FULL_CLONE_MAP.md#f07), [F12](FE_MEDIUM_FULL_CLONE_MAP.md#f12), [F13](FE_MEDIUM_FULL_CLONE_MAP.md#f13), [F14](FE_MEDIUM_FULL_CLONE_MAP.md#f14), [F15](FE_MEDIUM_FULL_CLONE_MAP.md#f15). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** 토픽 상세/Follow, Browse curated list의 미리보기, Recommended publications·Who to follow, 추천 캐러셀과 See all/See more를 연결한다. publication 대상 관계와 상세 진입의 근거를 확보한다.
- **시각 비교:** 토픽 칩/헤더·관련 카드·큐레이션 소개·팔로우 추천의 크기/간격/스크롤을 맞춘다.
- **상태·계약:** 토픽·작가·publication 식별을 구분하고 팔로우가 추천/Following에 반영되게 한다. 큐레이션의 공개 목록 동작은 32와 연결한다.
- **검증 시나리오:** 같은 토픽의 여러 진입점, 캐러셀 끝/빈 상태, 팔로우 실패·역순 완료, 빠른 대상 변경, 목록 복귀 위치를 검사한다.
- **완료 조건:** Explore→토픽→큐레이션과 추천 대상 팔로우가 연결되고 상세/미리보기의 대상이 보존된다.
- **미확인·경계:** 서로 다른 토픽의 Follow/Following 캡처를 동일 토픽 전환 증거로 보지 않는다. publication 상세/생성 화면은 보관본에 없으며 상세 진입은 보완 대상, 생성은 혜택 문구만으로 구현 범위에 넣지 않는다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_30_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-31"></a>

### Goal 31 — 추천 관리·관심사·읽기 이력

- **상태/선행:** 구현 완료·시각/native 검증 잔여 / Goal 29, Goal 30.
- **원본:** [F01](FE_MEDIUM_FULL_CLONE_MAP.md#f01), [F05](FE_MEDIUM_FULL_CLONE_MAP.md#f05), [F12](FE_MEDIUM_FULL_CLONE_MAP.md#f12), [F13](FE_MEDIUM_FULL_CLONE_MAP.md#f13), [F14](FE_MEDIUM_FULL_CLONE_MAP.md#f14), [F15](FE_MEDIUM_FULL_CLONE_MAP.md#f15), [F18](FE_MEDIUM_FULL_CLONE_MAP.md#f18), [F22](FE_MEDIUM_FULL_CLONE_MAP.md#f22), [F24](FE_MEDIUM_FULL_CLONE_MAP.md#f24), [F41](FE_MEDIUM_FULL_CLONE_MAP.md#f41). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** Refine recommendations의 Following/Reading history/Muted/Suggestions, All/Writers/Publications/Topics 필터, 목록 확장, Show less, 홈 + 관심사, 이력 개별 제거/전체 삭제를 구현한다.
- **시각 비교:** 탭·필터·설명·삭제 확인·음소거 해제·빈 목록을 각각 대조한다. Library Reading history 진입은 같은 데이터 계약으로 연결하되 화면 동일 여부를 확인한다.
- **상태·계약:** 추천 제어 입력과 mock 추천 결과를 분리한다. 이력 삭제는 북마크·박수·highlight를 삭제하지 않는다. 읽음 표시와 이력 제거의 관계는 확인된 정책/보완 정책으로 구분한다.
- **검증 시나리오:** 필터 전환 중 요청 역전, 개별/전체 삭제 취소·실패, 오래된 조회 복귀, 계정 격리, 추천/이력/Muted 간 일관성을 검사한다.
- **완료 조건:** 추천을 조절하고 그 결과·이력·음소거 상태를 다시 확인할 수 있으며 홈 복귀 상태가 유지된다.
- **미확인·경계:** 실제 추천 알고리즘은 범위 밖이다. 목록 확장 결과·관심사 편집·Library 이력 화면이 미수록이면 별도 근거를 확보한다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_31_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-32"></a>

### Goal 32 — 공개 목록·Saved lists·목록 반응

- **상태/선행:** 구현 완료·원본 동일 재현/실제 native 검증 잔여 / Goal 26, Goal 28, Goal 30. [Goal32 결과](FE_GOAL_32_RESULT.md)에 실제 실행 결과·두 차례 자체 검토·mock 정책·잔여를 기록했다.
- **원본:** [F02](FE_MEDIUM_FULL_CLONE_MAP.md#f02), [F03](FE_MEDIUM_FULL_CLONE_MAP.md#f03), [F04](FE_MEDIUM_FULL_CLONE_MAP.md#f04), [F17](FE_MEDIUM_FULL_CLONE_MAP.md#f17), [F19](FE_MEDIUM_FULL_CLONE_MAP.md#f19), [F20](FE_MEDIUM_FULL_CLONE_MAP.md#f20), [F21](FE_MEDIUM_FULL_CLONE_MAP.md#f21), [F37](FE_MEDIUM_FULL_CLONE_MAP.md#f37), [F38](FE_MEDIUM_FULL_CLONE_MAP.md#f38), [F41](FE_MEDIUM_FULL_CLONE_MAP.md#f41), [F42](FE_MEDIUM_FULL_CLONE_MAP.md#f42), [F45](FE_MEDIUM_FULL_CLONE_MAP.md#f45), [F46](FE_MEDIUM_FULL_CLONE_MAP.md#f46), [F47](FE_MEDIUM_FULL_CLONE_MAP.md#f47), [F49](FE_MEDIUM_FULL_CLONE_MAP.md#f49), [F50](FE_MEDIUM_FULL_CLONE_MAP.md#f50), [F51](FE_MEDIUM_FULL_CLONE_MAP.md#f51), [F55](FE_MEDIUM_FULL_CLONE_MAP.md#f55). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** 다른 사용자의 공개 목록, 전체 목록 Save/해제, Library Saved lists, 목록 박수/응답·작성자 Follow·공유 진입을 구현한다. 개별 기사 북마크와 목록 전체 저장을 분리한다.
- **시각 비교:** 목록 소개·소유자/방문자 메뉴·기사 행·Save 수·목록 반응 영역을 원본과 비교한다.
- **상태·계약:** 목록 ID·소유자·공개 상태·목록 저장 관계·목록 반응을 명확히 구분한다. 108 저장/98 박수/1 응답 같은 비교 fixture와 실행 중 변경값을 구분한다. 목록 응답은 대상 계약으로 26과 연동한다. 현재 공식 설명의 기사/목록 최대50·Undo claps·박수 사용자 목록은 Goal22 근거를 확인하고 target별 계약으로 반영한다. 펼친 UI와 댓글 한도는 미확인이다.
- **검증 시나리오:** 저장/해제 중복·역전, 비공개/삭제된 원본 목록, 소유자와 방문자 권한, 목록 박수와 기사 박수 격리, Saved lists 재진입을 검사한다.
- **완료 조건:** 공개 목록 탐색→전체 저장→Saved lists→상세 복귀가 작동하고 목록 반응/응답이 기사와 섞이지 않는다.
- **미확인·경계:** Saved lists 내용·목록 응답 펼친 화면은 원본 확보가 필요하다. 기사 댓글 UI를 근거 없이 동일하다고 복제하지 않는다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_32_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-33"></a>

### Goal 33 — 내 목록 메모·정렬·공개 범위·편집·삭제

- **상태/선행:** 구현 완료·검증 잔여 / Goal 32. [Goal33 결과](FE_GOAL_33_RESULT.md): 관계 메모·정렬·확인/Undo·공유 원본·두 차례 자체 검토·현재 검사/시각 차이를 기록했다. 동일 시각 재현·미수록 정책·실제 native 확인은 잔여다.
- **원본:** [F04](FE_MEDIUM_FULL_CLONE_MAP.md#f04), [F16](FE_MEDIUM_FULL_CLONE_MAP.md#f16), [F37](FE_MEDIUM_FULL_CLONE_MAP.md#f37), [F41](FE_MEDIUM_FULL_CLONE_MAP.md#f41), [F42](FE_MEDIUM_FULL_CLONE_MAP.md#f42), [F45](FE_MEDIUM_FULL_CLONE_MAP.md#f45), [F46](FE_MEDIUM_FULL_CLONE_MAP.md#f46), [F47](FE_MEDIUM_FULL_CLONE_MAP.md#f47), [F48](FE_MEDIUM_FULL_CLONE_MAP.md#f48), [F49](FE_MEDIUM_FULL_CLONE_MAP.md#f49), [F50](FE_MEDIUM_FULL_CLONE_MAP.md#f50), [F51](FE_MEDIUM_FULL_CLONE_MAP.md#f51), [F55](FE_MEDIUM_FULL_CLONE_MAP.md#f55). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** 목록 메모 추가/수정, 정렬 Cancel/Done, Make private 확인, 제목/설명 수정, 기사 제거/Undo, 목록 삭제를 완성한다. 기존 목록 생성/다중 저장/제거 기능도 원본에 맞춰 재검토한다.
- **시각 비교:** 원본 행 메뉴·메모 편집기·드래그 표시·비공개 경고·잠금 표시를 맞춘다. 비공개에서도 보이는 공유 아이콘을 임의로 숨기지 않는다.
- **상태·계약:** 메모를 목록 안의 기사 관계에 귀속시키고 개인 DM으로 해석하지 않는다. 정렬 초안과 확정 순서 분리, 비공개 전환의 방문자 저장 목록 영향, 목록 삭제와 기사 생존을 명시한다. 기본 Reading list 삭제 불가와 목록 설명 선택 입력은 보관된 공식 설명을 근거로 유지하고 실행 시 변경 여부를 확인한다.
- **검증 시나리오:** 정렬 취소/실패 복원, 메모 실패 입력 유지, 비공개 확인 취소, 제거→Undo 경쟁, 삭제 후 오래된 조회, 다른 목록의 같은 기사 보존을 검사한다.
- **완료 조건:** 각 편집은 확정 시에만 반영되고 다른 목록/기사/계정 데이터는 보존된다. 공개 목록과 내 목록이 같은 공개 상태를 본다.
- **미확인·경계:** 빈 메모에서도 Done은 녹색이며 필수 입력으로 단정하지 않는다. 빈값 저장·기존 메모 지우기·최대 길이·타인 가시성은 추가 확인하고, 근거 없는 멤버십 제한을 만들지 않는다. Undo 동작은 현재 FE 보완이며 캡처에서 실행 결과가 보이지 않는 부분을 표시한다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_33_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-34"></a>

### Goal 34 — Digest·날짜 필터·Library 연결

- **상태/선행:** 구현 완료·검증 잔여 / Goal 27, Goal 31, Goal 33. [Goal34 결과](FE_GOAL_34_RESULT.md): 발행/날짜 초안·Library 연결·두 차례 자체 검토·자동/브라우저 검사와 원본/native 잔여를 구분한다.
- **원본:** [F25](FE_MEDIUM_FULL_CLONE_MAP.md#f25), [F37](FE_MEDIUM_FULL_CLONE_MAP.md#f37), [F41](FE_MEDIUM_FULL_CLONE_MAP.md#f41), [F42](FE_MEDIUM_FULL_CLONE_MAP.md#f42), [F43](FE_MEDIUM_FULL_CLONE_MAP.md#f43), [F44](FE_MEDIUM_FULL_CLONE_MAP.md#f44), [F48](FE_MEDIUM_FULL_CLONE_MAP.md#f48), [F59](FE_MEDIUM_FULL_CLONE_MAP.md#f59), [F62](FE_MEDIUM_FULL_CLONE_MAP.md#f62). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** Library의 Your lists/Saved lists/Highlights/Reading history 및 Digest 진입을 연결하고 Digest 날짜 선택/Done·Digest settings·빈 날짜를 구현한다.
- **시각 비교:** 날짜 선택기·이야기 목록·설정 행과 Push chevron/Email 외부 링크를 원본 구분대로 맞춘다.
- **상태·계약:** 날짜/발행 묶음과 수신 빈도, push/email 설정을 구분한다. 선택 중 값과 Done 확정값을 분리하고 같은 읽기/저장 상태를 다른 Library 탭에서도 사용한다.
- **검증 시나리오:** 날짜 전환·취소·없는 Digest·로딩/실패/재시도, 새 데이터로 선택 날짜 무효화, 탭 복귀/스크롤 유지, 계정 변경을 검사한다.
- **완료 조건:** Digest 선택→이야기→복귀와 네 Library 구역의 저장/하이라이트/이력 연결이 일관된다.
- **미확인·경계:** last 10 digests를 항상 최근 10일로 계산하지 않는다. Daily 메뉴의 다른 선택지와 Email 목적지는 44의 추가 근거에 따른다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_34_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-35"></a>

### Goal 35 — 목록 다운로드·오프라인 화면 상태

- **상태/선행:** 구현 완료·검증 잔여 / Goal 33, Goal 34. [Goal35 결과](FE_GOAL_35_RESULT.md): 메모리 사본·상태/권한·두 차례 검토·자동/브라우저 검사와 원본/native 잔여를 구분한다.
- **원본:** [F41](FE_MEDIUM_FULL_CLONE_MAP.md#f41), [F45](FE_MEDIUM_FULL_CLONE_MAP.md#f45), [F46](FE_MEDIUM_FULL_CLONE_MAP.md#f46), [F47](FE_MEDIUM_FULL_CLONE_MAP.md#f47), [F48](FE_MEDIUM_FULL_CLONE_MAP.md#f48), [F49](FE_MEDIUM_FULL_CLONE_MAP.md#f49), [F50](FE_MEDIUM_FULL_CLONE_MAP.md#f50), [F51](FE_MEDIUM_FULL_CLONE_MAP.md#f51). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** 다운로드 시작/진행/완료 표시·취소/제거·실패 재시도와 목록/기사의 이용 가능 상태를 구현한다. 네트워크가 없는 상황에서 어떤 mock 콘텐츠를 보여줄지 명시한다.
- **시각 비교:** Downloading/다운로드 아이콘·목록 수·실패/권한 보완 상태를 비교한다. 공유 카드 Save image와 혼동하지 않는다.
- **상태·계약:** 목록 snapshot/기사 ID/콘텐츠 버전/작업 ID와 계정 소유권을 두고 제거 후 지연 성공이 파일/상태를 되살리지 않게 한다. 메모리 fixture와 실제 로컬 캐시 구현 여부를 구분한다.
- **검증 시나리오:** 중복 시작, 다운로드 도중 취소/목록 삭제/계정 전환, 부분 실패·재시도, 앱 재시작과 오프라인 진입을 실제 지원 범위에서 검사한다.
- **완료 조건:** 다운로드 상태 전이가 재현 가능하며 오프라인/재시작 지원 여부가 증거와 함께 명확하다. fixture 표시만으로 실제 오프라인 저장 완료라고 하지 않는다.
- **미확인·경계:** 캡처에 없는 캐시 용량·만료·자동 갱신·실패 UI는 보완 정책이다. 실제 디바이스 저장 검증은 52에 남긴다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_35_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-36"></a>

### Goal 36 — 글쓰기 편집기·텍스트 서식

- **상태/선행:** 구현 완료·검증 잔여 / Goal 23, Goal 24. [Goal36 결과](FE_GOAL_36_RESULT.md): 제목/본문·서식/선택·이탈/계정 수명·두 차례 검토와 실제 native/원본 잔여를 구분한다.
- **원본:** [F05](FE_MEDIUM_FULL_CLONE_MAP.md#f05), [F08](FE_MEDIUM_FULL_CLONE_MAP.md#f08), [F09](FE_MEDIUM_FULL_CLONE_MAP.md#f09), [F10](FE_MEDIUM_FULL_CLONE_MAP.md#f10), [F11](FE_MEDIUM_FULL_CLONE_MAP.md#f11). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** Write 진입, 제목/본문 입력, 텍스트 선택, 헤더·굵기·기울임·링크·인용·목록·구분선 및 관찰된 코드 도구를 구현한다. 에디터 전체 UI를 원본 키보드/툴바 위치로 맞춘다.
- **시각 비교:** 빈 편집기·선택 서식·문단·스크롤·키보드가 열린 상태를 비교한다. 입력 가능한 실제 텍스트와 접근 가능한 도구를 사용한다.
- **상태·계약:** 문서 내용과 선택/포커스/서식 상태를 분리하고 에디터 출력 구조를 FE 계약으로 정의한다. 공유 UI에 문서 모델을 넣지 않는다.
- **검증 시나리오:** IME 조합/한국어·붙여넣기·서식 토글·링크 취소·여러 문단 선택·긴 문서·키보드 닫기/뒤로가기를 검사한다.
- **완료 조건:** 관찰된 서식으로 작성하고 선택/커서/문서 내용이 보존된다. 후속 이미지/멘션/초안/발행이 확장할 명시적 계약이 있다.
- **미확인·경계:** 코드 도구 실행 후 화면·지원 서식의 완전한 목록은 미수록이다. 라이브러리 선택 시 현재 공식 문서와 실제 플랫폼 지원을 확인한다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_36_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-37"></a>

### Goal 37 — 글쓰기 이미지·Camera·Library·Unsplash

- **상태/선행:** local/mock 구현 완료·OS picker 구현/검증 잔여 / Goal 36. [Goal37 결과](FE_GOAL_37_RESULT.md)에 현재 검사와 원본/native 잔여를 기록한다. 실제 Camera/Library OS picker 호출은 미구현이며 mock 선택과 구분한다.
- **원본:** [F08](FE_MEDIUM_FULL_CLONE_MAP.md#f08), [F09](FE_MEDIUM_FULL_CLONE_MAP.md#f09). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** 이미지 삽입 메뉴, Camera/Library 접근, Unsplash 탐색/검색/로딩/선택, 문서 안 이미지 삭제와 배치를 구현한다. fixture 이미지와 native picker 경계를 둔다.
- **시각 비교:** 검색 결과 그리드·선택·로딩·삽입 사진·삭제 X·키보드 전환을 맞춘다.
- **상태·계약:** 선택 미완료 자산과 문서 확정 자산, 작업 ID·출처 메타데이터·취소/해제를 구분한다. 실제 업로드와 Unsplash API 호출은 연결하지 않는다.
- **검증 시나리오:** 권한 거절/제한/취소, 검색 지연 역전, 이미지 삽입 중 문서 전환, 삭제 후 늦은 완료, 큰 사진/해제와 접근성 이름을 검사한다.
- **완료 조건:** 로컬/mock 사진 선택→삽입→삭제가 편집/초안 계약에 반영되며 native picker의 실검증 상태가 별도 기록된다.
- **미확인·경계:** 프로필 사진 흐름에는 기기 갤러리 원본 S113(`sc_9fd133df622e4ddd859bbbeb845ba4da`)이 있다. 편집기에서 같은 선택기를 사용하는지, 촬영·권한 거절·원격 검색 실패는 미확인이다. Goal42/52와 연결하고 OS 소유 화면을 Medium 고유 픽셀 재현으로 주장하지 않는다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_37_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-38"></a>

### Goal 38 — 초안 저장·재개·멘션

- **상태/선행:** 구현 완료·검증 잔여 / Goal 37. [Goal38 결과](FE_GOAL_38_RESULT.md)에 검사와 원본/native 잔여를 기록한다.
- **원본:** [F08](FE_MEDIUM_FULL_CLONE_MAP.md#f08), [F09](FE_MEDIUM_FULL_CLONE_MAP.md#f09), [F10](FE_MEDIUM_FULL_CLONE_MAP.md#f10), [F11](FE_MEDIUM_FULL_CLONE_MAP.md#f11). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** Drafts 진입/목록/재개·초안 보존, @ 사용자 검색/선택/문서 내 멘션, 작성 메뉴의 확인된 항목을 구현한다. 자동 저장 UI와 로컬 mock 보존 범위를 정한다.
- **시각 비교:** 작성 메뉴·Drafts 행·멘션 결과의 아바타/핸들·검색/선택 상태를 원본에 맞춘다.
- **상태·계약:** draft ID/문서 버전/작성자/선택한 mention 대상 ID를 유지한다. 자동 저장과 직접 수정의 순서·재시작 보존 여부·로그아웃 정리를 명시한다.
- **검증 시나리오:** A→B→A 초안, 빠른 입력과 늦은 저장/실패, 문서 재개, 동명이인 멘션, 검색어 변경, 멘션 삭제·이미지 포함 초안 복원을 검사한다.
- **완료 조건:** 작성→나가기→Drafts→재개와 멘션 표시/대상 연결이 동작하고 저장 중/실패가 입력을 잃게 하지 않는다.
- **미확인·경계:** 자동 저장은 공식 설명 근거이며 캡처가 부족하다. 초안 오류/빈 상태·재개 세부 UI를 관찰 사실로 쓰지 않는다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_38_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-39"></a>

### Goal 39 — 토픽 최대 5개·발행 미리보기·Publish

- **상태/선행:** 구현 완료·검증 잔여 / Goal 30, Goal 38. [Goal39 결과](FE_GOAL_39_RESULT.md)에 최종 검사와 원본/native 잔여를 기록한다.
- **원본:** [F07](FE_MEDIUM_FULL_CLONE_MAP.md#f07), [F08](FE_MEDIUM_FULL_CLONE_MAP.md#f08), [F09](FE_MEDIUM_FULL_CLONE_MAP.md#f09), [F10](FE_MEDIUM_FULL_CLONE_MAP.md#f10), [F55](FE_MEDIUM_FULL_CLONE_MAP.md#f55), [F63](FE_MEDIUM_FULL_CLONE_MAP.md#f63). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** 토픽 검색/선택/삭제/최대 5개, Publish preview의 Edit/Topics/Publication/Unlisted/Publish now, 발행 후 내 Stories 연결을 구현한다.
- **시각 비교:** 선택 chip·검색 X·상한 문구·미리보기·발행 버튼·프로필 결과를 맞춘다.
- **상태·계약:** draft/published 상태·토픽 IDs·공개 범위·publication 선택의 확정 시점을 분리한다. 발행 요청 중복으로 이야기가 두 개 생기지 않게 하며 mock 발행과 실제 공개를 구분한다.
- **검증 시나리오:** 6번째 토픽·중복 토픽·chip 삭제와 검색어 초기화 구분, 미리보기 되돌아가기, 실패 입력 유지·재시도, 계정 변경, 발행 후 목록 갱신을 검사한다.
- **완료 조건:** 초안→미리보기→수정→mock 발행→내 Stories→상세가 연결되고 임시/발행 데이터가 일관된다.
- **미확인·경계:** Unlisted On·publication 선택 이후·발행 오류/검수 화면은 미수록이다. 공개 범위 정책을 확인하고 자체 보완은 표시한다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_39_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-40"></a>

### Goal 40 — 가입·로그인·이메일 코드·세션·로그아웃

- **상태/선행:** 구현 완료·검증 잔여 / Goal 23, Goal 24. [Goal40 결과](FE_GOAL_40_RESULT.md)에 최종 검사·원본/native 잔여와 로그아웃/source 교체 정책을 기록한다.
- **원본:** [F52](FE_MEDIUM_FULL_CLONE_MAP.md#f52), [F53](FE_MEDIUM_FULL_CLONE_MAP.md#f53), [F56](FE_MEDIUM_FULL_CLONE_MAP.md#f56), [F57](FE_MEDIUM_FULL_CLONE_MAP.md#f57), [F58](FE_MEDIUM_FULL_CLONE_MAP.md#f58), [F61](FE_MEDIUM_FULL_CLONE_MAP.md#f61). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** 가입의 Google/Facebook/Apple/Email 4개, 로그인의 X 포함 5개 경로를 현재 버튼부터 검토한다. 이메일/이름/6자리 코드·재전송·검증·닫기·진입 복귀와 로그아웃 확인/intro 전환을 mock으로 완성한다.
- **시각 비교:** 가입/로그인 원문 문구·활성/비활성·키보드·intro·오류를 구분한다. 같은 이미지 ID의 다른 플로우 맥락을 보존한다.
- **상태·계약:** 인증 단계와 세션/계정 상태를 분리하고 기존 mock A/B를 유지한다. 재전송 만료·코드 결과·세션 복구는 mock 계약으로 명시하며 실제 OAuth/메일은 호출하지 않는다.
- **검증 시나리오:** 코드 길이·입력 검증·재전송 중복·취소·실패 후 입력 유지·늦은 로그인·로그아웃 중 조회/쓰기·A→B→A 개인정보 격리를 검사한다.
- **완료 조건:** 모든 표시된 제공자 경로의 mock 상태와 이메일 단계가 연결되고 로그아웃은 원본 복귀 흐름과 사용자 데이터 정리를 만족한다.
- **미확인·경계:** 제공자 OS/웹 인증 화면·실제 토큰/계정 생성은 미검증/미연동으로 표시한다. 원본에 없는 비밀번호 화면을 추가하지 않는다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_40_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-41"></a>

### Goal 41 — 온보딩 관심사·추천 팔로우·알림 안내

- **상태/선행:** 구현 완료·검증 잔여 / Goal 30, Goal 31, Goal 40. [현재 결과](FE_GOAL_41_RESULT.md). 원본 동일 재현/native·OS 검증은 잔여다.
- **원본:** [F52](FE_MEDIUM_FULL_CLONE_MAP.md#f52), [F53](FE_MEDIUM_FULL_CLONE_MAP.md#f53), [F54](FE_MEDIUM_FULL_CLONE_MAP.md#f54), [F59](FE_MEDIUM_FULL_CLONE_MAP.md#f59), [F61](FE_MEDIUM_FULL_CLONE_MAP.md#f61). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** 관심사 최소 3개 선택, 추천 Follow/Finish, 알림 Enable/Skip, 새 경험 안내와 멤버십 진입을 원본 순서로 구현한다. 기존 사용자/재진입 분기를 구분한다.
- **시각 비교:** 칩 선택·최소 개수 문구·Continue/Finish·추천 목록·알림 안내·paywall 진입의 위치와 텍스트를 맞춘다.
- **상태·계약:** 온보딩 초안·완료 상태·관심사·follow를 계정별로 관리한다. OS 알림 권한과 앱 선호 설정을 구분하고 멤버십 선택은 48에 연결한다.
- **검증 시나리오:** 2개/3개 경계, 선택 취소·뒤로가기·재로그인, Follow 실패/건너뛰기, Enable 거절/Skip, 가입 완료 후 중복 온보딩을 검사한다.
- **완료 조건:** 새 mock 계정의 가입 이후 흐름과 기존 계정 복귀가 구분되고 관심사/팔로우가 홈에 반영된다.
- **미확인·경계:** Follow가 필수라는 증거는 없다. 알림/새 경험/멤버십 화면이 모든 계정에서 동일 순서로 뜬다고 일반화하지 않는다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_41_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-42"></a>

### Goal 42 — 프로필 사진·대명사·소개·Stories 필터

- **상태/선행:** 구현 완료·네이티브 검증 대기·원본 차이 잔여 / Goal 28, Goal 39, Goal 40, Goal37 이미지 경계 및 Goal41 세션/재개 확인. [결과](FE_GOAL_42_RESULT.md).
- **원본:** [F08](FE_MEDIUM_FULL_CLONE_MAP.md#f08), [F55](FE_MEDIUM_FULL_CLONE_MAP.md#f55), [F56](FE_MEDIUM_FULL_CLONE_MAP.md#f56), [F57](FE_MEDIUM_FULL_CLONE_MAP.md#f57), [F61](FE_MEDIUM_FULL_CLONE_MAP.md#f61), [F63](FE_MEDIUM_FULL_CLONE_MAP.md#f63). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** 프로필 사진 Camera/Library·삭제 가능 여부 확인, pronouns 최대 4개 선택/Done→부모 Save, 이름/short bio, About 데스크톱 안내, 내 Stories/Public 필터와 팔로우 진입을 완성한다.
- **시각 비교:** 프로필 편집·사진 선택·대명사 chip·50/160 글자 표시·About 안내·스토리 필터를 원본에 맞춘다.
- **상태·계약:** 사진/대명사/이름/소개 편집 초안과 부모 저장을 분리한다. 하위 Done만으로 확정 저장하지 않는다. 기존 기본 설명 수준·mock 계정을 보존한다.
- **검증 시나리오:** 4개/5개 경계, 하위 Done 후 부모 취소, 사진 취소/권한 실패, 글자 수/조합 입력, 저장 중 계정 변경, 내 Stories 필터 변경을 검사한다.
- **완료 조건:** 프로필 저장/취소가 모든 아바타/이름 사용처에 일관되게 반영되고 About 안내/Stories 필터 경로가 연결된다.
- **미확인·경계:** 사진 제거·Public 필터 펼친 선택지는 추가 확인한다. About 안내를 근거 없이 모바일 긴 소개 편집기로 바꾸지 않는다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_42_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-43"></a>

### Goal 43 — Story stats·월간·누적·정렬

- **상태/선행:** 구현 완료·검증 잔여 / Goal39 발행 source·Goal40/41 세션·Goal42 프로필과 Stories를 확인했다. 실제 native 및 원본 메뉴/글꼴 확인은 남는다. [결과·두 차례 자체 검토·실제 검사](FE_GOAL_43_RESULT.md).
- **원본:** [F55](FE_MEDIUM_FULL_CLONE_MAP.md#f55), [F63](FE_MEDIUM_FULL_CLONE_MAP.md#f63). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** Monthly/Lifetime 통계, 날짜·월 선택·그래프·Views/Reads·Stories별 수치·Latest 메뉴를 구현하고 프로필의 Story stats 진입을 연결한다.
- **시각 비교:** 원본의 선/면 그래프·축·날짜 선택선·강조점·텍스트·선택 월·스크롤·목록 행을 비교 fixture로 재현했다. S020/S188/S153/S150 실제4쌍을 대조했고 폰트·범례·아이콘 차이는 남는다.
- **상태·계약:** 조회 기간/UTC 기준·집계 단위·정렬 상태·기사별 통계를 FE 응답 계약으로 정의하고 실제 분석 수집과 구분한다.
- **검증 시나리오:** 월 전환 중 역순 완료, 빈 통계·실패/재시도, 기간 경계, 긴 이야기 목록, 정렬 변경과 뒤로가기 복원을 검사한다.
- **완료 조건:** 기간/정렬에 맞는 mock 통계와 상세 목록이 일관되며 원본과 숫자가 다른 경우 fixture/정책 근거를 표시한다.
- **미확인·경계:** 월간 11/2와 누적 0/0 캡처의 집계 모순을 추측 수식으로 해결하지 않는다. 월/Latest 펼친 메뉴는 추가 확인한다.
- **이번 적용:** 발행 저장소의 본인 Public/Unlisted를 조회하고 신규 글은0/0이다. UTC 시작 포함/끝 제외, 안정 정렬, 부분 실패/재시도, 계정/요청 수명을 검증했다. 월/정렬/더보기의 미수록 UI와 기존 글 읽기 연결은 자체 보완이며 실제 분석 수집/별도 통계 상세는 없다. 원본11/2·0/0은 독립 비교 fixture만 사용한다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_43_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-44"></a>

### Goal 44 — 알림 목록·Push·Email·Tailored 설정

- **상태/선행:** 구현 완료·원본/실제 native 검증 잔여 / Goal 26, Goal 28, Goal 34, Goal 41. [결과44](FE_GOAL_44_RESULT.md)에 두 차례 자체 검토·수정·현재 검사와 남은 차이를 기록한다.
- **원본:** [F05](FE_MEDIUM_FULL_CLONE_MAP.md#f05), [F06](FE_MEDIUM_FULL_CLONE_MAP.md#f06), [F43](FE_MEDIUM_FULL_CLONE_MAP.md#f43), [F44](FE_MEDIUM_FULL_CLONE_MAP.md#f44), [F53](FE_MEDIUM_FULL_CLONE_MAP.md#f53), [F58](FE_MEDIUM_FULL_CLONE_MAP.md#f58), [F59](FE_MEDIUM_FULL_CLONE_MAP.md#f59). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** 팔로우/기사/목록/응답 등 알림 종류별 이동·Follow 버튼, Push의 Digest/Top stories/Editors/Featured/Applause/Saves, Tailored for you의 작가 새 글/박수/highlight/응답/멘션 설정과 Email/Digest 설정 연결을 구현한다.
- **시각 비교:** 알림 행·시간·아바타·대상 텍스트·토글/선택형 행·하단 잘린 영역을 구분하여 맞춘다.
- **상태·계약:** 알림 대상 타입/ID·읽음 상태·설정값·OS 권한을 분리한다. mock 이벤트와 목록 결과의 중복 방지 계약을 만들고 실제 push/email 발송은 연결하지 않는다.
- **검증 시나리오:** 삭제된 대상·잘못된 대상 타입·Follow 중복·읽음/미읽음 경합, 설정 취소/실패, 권한 거절·계정 격리·긴 목록을 검사한다.
- **완료 조건:** 알림→정확한 대상→복귀와 각 수신 설정이 연결되고 Digest/작가 이메일 설정과 소유권이 일치한다.
- **미확인·경계:** 녹색 표시를 읽음 상태로 단정하지 않는다. Tailored 메뉴·Email 상세·잘린 추가 항목은 새 근거가 필요하다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_44_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-45"></a>

### Goal 45 — Listen·미니/확장 플레이어·재생 제어

- **상태/선행:** 기능 구현·두 차례 자체 검토 수행, 원본/실제 native 검증 잔여 / Goal25. [실행 기준·결과](FE_GOAL_45_RESULT.md).
- **원본:** [F16](FE_MEDIUM_FULL_CLONE_MAP.md#f16), [F26](FE_MEDIUM_FULL_CLONE_MAP.md#f26), [F27](FE_MEDIUM_FULL_CLONE_MAP.md#f27), [F28](FE_MEDIUM_FULL_CLONE_MAP.md#f28). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** Listen 로딩, 미니/확장 플레이어, 재생/일시정지/닫기, 진행 시간, 10초 뒤/30초 앞, View story·Share·더보기 진입을 구현한다.
- **시각 비교:** 플레이어 높이·기사 커버·컨트롤·타임라인·하단 탭과 겹침·전환 위치를 원본에 맞춘다.
- **상태·계약:** 기사 ID·재생 작업·시간·상태의 단일 소유자와 화면별 표시를 분리한다. mock 타이머/로컬 음원 재생/실제 TTS 제공 여부를 명시한다. Share는 47과 연결한다.
- **검증 시나리오:** 미니↔확장·다른 기사·닫기 후 늦은 완료·탭 이동·시간 경계·재생 오류·백그라운드/해제 시 타이머 정리를 검사한다.
- **완료 조건:** 플레이어들 사이에 재생 상태/시간이 일치하고 원문 복귀가 정확하다. 소리 없는 mock을 실제 오디오 재생으로 보고하지 않는다.
- **미확인·경계:** 이전/다음 버튼의 비활성처럼 보이는 상태만으로 큐 정책을 확정하지 않는다. 실제 백그라운드 오디오 검증은 52에 구분한다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_45_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-46"></a>

### Goal 46 — 재생 속도·음성·검색·AirPlay·큐 상태

- **상태/선행:** mock 기능 구현·두 차례 자체 검토·검증 잔여 / Goal 29, Goal 45. [결과](FE_GOAL_46_RESULT.md)의 현재 검사·원본8쌍·실제 native 한계를 따른다. AirPlay 미지원 진입은 구현했으나 실제 OS 장치 연결/음성 출력은 미구현이다.
- **원본:** [F26](FE_MEDIUM_FULL_CLONE_MAP.md#f26), [F27](FE_MEDIUM_FULL_CLONE_MAP.md#f27), [F28](FE_MEDIUM_FULL_CLONE_MAP.md#f28). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** 속도 선택과 WPM, 음성 목록/선택/검색, AirPlay 진입, View story/Show less/Mute/Report 메뉴 및 이전/다음 상태를 완성한다.
- **시각 비교:** 속도 1→2.5·음성 Emma→Hans·선택 마크·voice 메타데이터·메뉴 순서와 모달 복귀를 맞춘다.
- **상태·계약:** 음성·언어·속도 선택과 기사/세션 재생 상태를 연결한다. 음성 언어 선택을 기사 번역으로 해석하지 않는다. OS 출력 장치와 mock 상태를 분리한다.
- **검증 시나리오:** 재생 중 변경·선택 취소·검색 지연 역전·없는 음성·실패 롤백·장치 지원 없음·기사 변경 시 선택 정책을 검사한다.
- **완료 조건:** 속도/음성 선택이 플레이어에 반영되고 메뉴의 실제 대상·복귀가 일치한다. AirPlay·큐의 확인/미확인 상태가 명시된다.
- **미확인·경계:** WPM 200→490을 정확한 배속 곱셈으로 강제하지 않는다. 음성 검색/출력 장치/큐 확장 화면은 추가 확인한다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_46_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-47"></a>

### Goal 47 — 기사·인용·작가·토픽·목록 공유와 이미지 저장

- **상태/선행:** 공유 기능 구현·두 차례 자체 검토 수행, 실제 native 검증·원본 차이 잔여 / Goal 27, Goal 28, Goal 30, Goal 32, Goal 46. [실제 검사·캡처·수명 계약·남은 항목](FE_GOAL_47_RESULT.md).
- **원본:** [F03](FE_MEDIUM_FULL_CLONE_MAP.md#f03), [F04](FE_MEDIUM_FULL_CLONE_MAP.md#f04), [F16](FE_MEDIUM_FULL_CLONE_MAP.md#f16), [F17](FE_MEDIUM_FULL_CLONE_MAP.md#f17), [F19](FE_MEDIUM_FULL_CLONE_MAP.md#f19), [F20](FE_MEDIUM_FULL_CLONE_MAP.md#f20), [F21](FE_MEDIUM_FULL_CLONE_MAP.md#f21), [F25](FE_MEDIUM_FULL_CLONE_MAP.md#f25), [F26](FE_MEDIUM_FULL_CLONE_MAP.md#f26), [F28](FE_MEDIUM_FULL_CLONE_MAP.md#f28), [F39](FE_MEDIUM_FULL_CLONE_MAP.md#f39), [F40](FE_MEDIUM_FULL_CLONE_MAP.md#f40), [F45](FE_MEDIUM_FULL_CLONE_MAP.md#f45), [F46](FE_MEDIUM_FULL_CLONE_MAP.md#f46), [F47](FE_MEDIUM_FULL_CLONE_MAP.md#f47), [F49](FE_MEDIUM_FULL_CLONE_MAP.md#f49), [F50](FE_MEDIUM_FULL_CLONE_MAP.md#f50), [F51](FE_MEDIUM_FULL_CLONE_MAP.md#f51). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** 대상별 Share 진입, 기사 카드/스타일 페이지, Copy link 토스트, Friend link, Share via OS sheet, Save image와 사진 권한을 구현하고 기존 안내 진입을 연결한다.
- **시각 비교:** 공유 카드의 실제 텍스트·이미지·페이지 점·버튼·토스트를 맞추며 인용과 기사/목록/작가의 제목/주소를 구분한다.
- **상태·계약:** 공유 대상 타입/ID·표시 데이터·안정적 로컬/mock URL·멤버십 상태와 native adapter를 구분한다. 개인/비공개 데이터가 다른 계정의 공유에 남지 않게 한다.
- **검증 시나리오:** 취소/미지원/권한 거절·클립보드 실패·중복 저장·대상 변경 중 이미지 생성 완료·공유 문자열 정확성·큰 글자에 따른 이미지 crop을 검사한다.
- **완료 조건:** 모든 공유 진입이 올바른 대상을 전달하고 local copy/export 성공·실패가 사실대로 표시된다. OS 실제 동작 여부가 증거에 남는다.
- **미확인·경계:** 카드의 추가 스타일·대상별 펼친 공유 화면·Friend link 실제 발급은 미확인/미연동이다. 카드 이미지 저장은 목록 오프라인 다운로드와 별개다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_47_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-48"></a>

### Goal 48 — Member·Friend 구독 화면과 mock 권한

- **상태/선행:** 미착수 / Goal 33, Goal 41, Goal 47.
- **원본:** [F39](FE_MEDIUM_FULL_CLONE_MAP.md#f39), [F40](FE_MEDIUM_FULL_CLONE_MAP.md#f40), [F53](FE_MEDIUM_FULL_CLONE_MAP.md#f53), [F54](FE_MEDIUM_FULL_CLONE_MAP.md#f54), [F58](FE_MEDIUM_FULL_CLONE_MAP.md#f58), [F60](FE_MEDIUM_FULL_CLONE_MAP.md#f60). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** 월간/연간·Member/Friend 선택, 혜택, 로딩/성공/Welcome, 구독 상태·앱 내 제한 진입을 mock으로 구현한다. 오디오·오프라인 혜택, Friend link·앱 아이콘의 확인된 자격을 구분해 관련 권한 입력을 연결한다.
- **시각 비교:** 원본 SGD 가격·통화·혜택 문구는 보관본 비교 fixture로만 사용하고 현재 판매 가격이라고 표시하지 않는다. 요금 전환/선택/성공 화면을 대조한다.
- **상태·계약:** 선택한 plan/기간·요청 상태·mock entitlement·계정별 tier를 분리한다. 중복 제출/실패가 성공 또는 실제 구매로 보이지 않게 한다.
- **검증 시나리오:** 선택 변경 중 늦은 완료, 취소·실패·재시도, 이미 구독한 mock 계정, 계정 변경, 권한 변경 후 관련 기능의 gate 일관성을 검사한다.
- **완료 조건:** 온보딩/설정/권한 진입→선택→mock 성공→관련 화면 반영이 연결되며 실제 결제/영수증/구독 갱신은 미연동으로 표시된다.
- **미확인·경계:** 기사 paywall 전체·복원/해지/환불 화면은 추가 근거 대상이다. 수익화·custom domain·publication 생성·Mastodon은 혜택 문구만으로 별도 서비스 구현을 확정하지 않는다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_48_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-49"></a>

### Goal 49 — 남은 설정·앱 아이콘·외부 안내

- **상태/선행:** 미착수 / Goal 42, Goal 44, Goal 48.
- **원본:** [F54](FE_MEDIUM_FULL_CLONE_MAP.md#f54), [F55](FE_MEDIUM_FULL_CLONE_MAP.md#f55), [F58](FE_MEDIUM_FULL_CLONE_MAP.md#f58), [F60](FE_MEDIUM_FULL_CLONE_MAP.md#f60). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** Account/Membership & payment/Email/Facebook 연결·Help/Terms/Privacy/Rate/More controls 등 모든 보이는 설정 행의 목적지를 확인하고 적합한 화면 또는 외부 링크를 연결한다. Custom app icon의 변형·선택·Friend gate를 구현한다. Account의 Blocked users는29의 상태 계약에 연결하며 현재 공식 설명과 보관 캡처의 차이를 먼저 확인한다.
- **시각 비교:** Wordmark/Founders/Friend/Throwback 연도별 아이콘·선택 테두리·잘린 항목, 계정/설정 구역·외부 링크 표식을 원본에 맞춘다.
- **상태·계약:** 선택 중 아이콘·적용 결과·tier·OS 지원 상태를 분리한다. 연결 여부/구독/이메일은 해당 feature 계약으로 읽고 설정 화면에 별도 사실 상태를 만들지 않는다.
- **검증 시나리오:** 미지원 플랫폼·외부 URL 실패·설정 복귀·아이콘 변경 취소/실패·tier 변경·계정 전환과 미연결 메뉴 잔여 검색을 검사한다.
- **완료 조건:** 관찰된 설정 행마다 확인된 목적지/검증 상태/담당 근거가 있고 기존 ReferenceNotice를 완료된 설정 동작으로 세지 않는다.
- **미확인·경계:** 펼친 계정/이메일/결제/More controls와 OS 아이콘 적용 결과는 원본이 부족하다. 원본 확보 전 임의 삭제하거나 실제 연결 완료로 표시하지 않는다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_49_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-50"></a>

### Goal 50 — 검색 추가 결과·홈/탭/진입 경로 마감

- **상태/선행:** 미착수 / Goal 31, Goal 34, Goal 39, Goal 44, Goal 49.
- **원본:** [F01](FE_MEDIUM_FULL_CLONE_MAP.md#f01), [F02](FE_MEDIUM_FULL_CLONE_MAP.md#f02), [F05](FE_MEDIUM_FULL_CLONE_MAP.md#f05). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** 원본에 보이는 Stories/People/Publications/Topics/Lists 다섯 검색 탭을 연결한다. Stories 외 네 유형의 결과 내용/정렬/이동 근거를 확보하고 해당 사용자·publication·토픽·목록 결과 경로를 구현한다. 홈 For you/Following/Featured, +, 카드 −/더보기, 추천 섹션과 모든 탭/딥링크/복귀를 통합한다.
- **시각 비교:** 홈 For you의 −와 Featured의 북마크를 구분하고 원본 탭별 카드·텍스트·선택 상태·검색 결과를 대조한다.
- **상태·계약:** 검색어/결과 타입/페이지·route ID·return context를 명시하고 내부 서버 정렬명을 탭 번역만으로 재사용하지 않는다. 없어진 대상·로그인 필요·비공개 대상 진입을 처리한다.
- **검증 시나리오:** 검색 A→B→A·debounce 정리·페이지 중복·취소/실패, 작성/알림/공유 등 다른 진입 경로에서 back·스크롤·입력 유지, native back focus를 검사한다.
- **완료 조건:** 각 진입점이 올바른 화면/대상을 열고 복귀가 일관되며 검색·홈의 남은 안내 동작이 대응표에서 추적된다.
- **미확인·경계:** 다섯 검색 탭의 존재는 관찰됐다. People/Publications/Topics/Lists의 결과 내용·정렬·0건·실패·페이지네이션은 미수록이며 추가 확인한다. 없는 탭/추천 알고리즘/딥링크 정책을 Medium 관찰로 꾸미지 않는다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_50_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-51"></a>

### Goal 51 — 기능 간 상태·실패·계정 격리 통합 검증

- **상태/선행:** 미착수 / Goal 35, Goal 43, Goal 46, Goal 50.
- **원본:** [전체 흐름·화면](FE_MEDIUM_FULL_CLONE_MAP.md). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** 읽기→박수→응답→highlight→저장→팔로우→추천→알림, 작성→발행→프로필→통계, 공개 목록→저장→비공개, 권한/설정→관련 UI를 묶어 검증하고 결함을 수정한다.
- **시각 비교:** 통합 중 달라진 수·선택·문구·빈 상태를 같은 원본/fixture 조건으로 다시 비교한다.
- **상태·계약:** 각 상태의 단일 소유자, 공개 계약, 초기화·재시작 보존·로그아웃·사용자 격리, 쓰기 후 이전 조회·늦은 성공/실패·source 교체를 전수 확인한다.
- **검증 시나리오:** mock A→B→A, 실패 주입/재시도/중복 입력/화면 unmount, 긴 리스트, 오래된 route 대상, 계정 전환 후 native callback을 검사하고 전체 check를 실행한다.
- **완료 조건:** 핵심 연결 시나리오가 실제 UI와 의미 있는 자동 검사에서 일치하고 알려진 상태 결함이 수정되어 있다. 부족한 원본/native 검증은 별도 남긴다.
- **미확인·경계:** 자동화 통과가 픽셀 동일·실제 서버/API·OS 검증을 대신하지 않는다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_51_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-52"></a>

### Goal 52 — iOS·Android·접근성·성능·native 경계 검증

- **상태/선행:** 미착수 / Goal 51.
- **원본:** [F60](FE_MEDIUM_FULL_CLONE_MAP.md#f60). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** Safe Area·키보드·뒤로가기·큰 글자·VoiceOver/TalkBack·긴 목록·메모리/리스너/타이머를 확인한다. 카메라/앨범/선택/클립보드/공유/이미지 저장/알림 권한/아이콘/오디오 등 구현한 native adapter를 실제 지원 환경에서 검증한다.
- **시각 비교:** iOS 원본과 Android 적응을 구분한다. 보이는 작은 아이콘의 크기를 유지하면서 논리 터치 영역 48×48 이상을 확보하고 글자 확대를 끄지 않는다.
- **상태·계약:** 앱 foreground/background·권한 거절/변경·활성 route·unmount·계정 변경에 따른 adapter 완료 처리를 확인한다.
- **검증 시나리오:** 현재 환경에서 가능한 native build/install/run, iOS/Android 실제 접근성 도구와 장치 기능을 검사한다. web/check/JS-Hermes export와 native build/run 결과를 분리해 기록한다.
- **완료 조건:** 플랫폼별로 실행/자동 검사/시각/native 증거가 있고 알려진 접근성·성능·플랫폼 결함을 수정한다. 사용 불가능한 환경은 미검증으로 남겨 완료를 과장하지 않는다.
- **미확인·경계:** Windows만으로 iOS 빌드/실행 성공을 주장하지 않는다. 사용할 수 없는 native 환경은 필요 장치/재현 단계/영향/담당 항목을 기록한다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_52_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

<a id="goal-53"></a>

### Goal 53 — 63개 흐름 최종 대조·누락 해소·백엔드 인계

- **상태/선행:** 미착수 / Goal 52.
- **원본:** [전체 흐름·화면](FE_MEDIUM_FULL_CLONE_MAP.md). 해당 흐름의 PNG·상세 분석과 대응표의 메뉴/미확인 항목을 함께 적용한다.
- **구현 범위:** 63개 흐름의 273단계 연결과 200개 고유 화면을 모두 대조하고 공통 이미지의 각 맥락/메뉴/선택 상태를 검증한다. 남은 안내·누락·규칙 위반·시각 차이를 수정하고 최종 결과와 후속 API/DB 설계용 FE 계약 자료를 만든다.
- **시각 비교:** 200개 고유 원본마다 현재 구현의 실제 캡처·overlay/diff·조건·차이·판정을 남긴다. 같은 화면 ID라도 273단계의 진입/종료를 별도 확인한다.
- **상태·계약:** 화면/행동별 입력·출력·ID/관계·소유자·공개 범위·순서·상태 전이·오류·취소·재시작 보존·mock 근거를 인계한다. 가정/확정 정책을 분리하고 DDL/서버를 만들지 않는다.
- **검증 시나리오:** 최종 코드로 두 차례 검토·필요한 수정/회귀·전체 check를 수행하고 모든 미확인/미검증/불일치를 재집계한다. 원본200장·63흐름·상세 메뉴의 누락 0 여부를 확인한다.
- **완료 조건:** 기능/자동검사/시각/native 결과를 별도 수치와 증거로 전달한다. 확인하지 못한 폰트·메뉴·환경·오차가 있으면 해당 항목과 전체 동일 재현은 미완료로 남긴다.
- **미확인·경계:** 결과 문서 작성 자체가 전체 클론 완료는 아니다. 후속 API/DB 인계는 실제 구현 근거이며 공식 백엔드 요구사항·DDL 확정과 구분한다.
- **산출물:** 실제 구현/검증 증거와 `TODO/FE_GOAL_53_RESULT.md`, 대응표 상태·차이 갱신. 위 공통 절차의 **1차 검토→수정→2차 재검토**를 모두 수행한다.

## 결과 문서 양식

아래는 **미래 실행용 양식**이며 이번 작업의 실행 결과가 아니다. 해당되지 않는 검사는 이유를 남긴다.

```markdown
# Goal NN — 제목
실행일/환경/시작 HEAD/종료 코드 상태:
범위와 선행 Goal:
기존 사용자 변경·8081 보존 여부:
근거: 흐름 F번호·단계·screen ID·원본/새 근거의 버전

## 구현과 계약
- 실제 구현한 화면/행동, 변경 파일, 상태 소유자/공개 계약
- 입력·출력·식별자·순서·오류·취소·재시작/계정 격리
- 관찰 / 공식 설명 / 자체 보완 / 미수록

## 1차 검토
- 검토자(자기/독립), 대상 최종 후보
- 문제·규칙/원본 근거·재현·수정·관련 검사·잔여

## 2차 재검토
- 수정 후 다시 확인한 코드/사용처/행동/캡처
- 기존 문제 해결 여부·새 문제·추가 수정/재검증

## 검증과 시각 대조
- 명령·실행 환경·결과·증거 경로·실패/미실행 이유
- 구현 / 자동 검사 / 시각 / native 각각 상태
- 화면 ID·진입/계정/테마/스크롤/키보드/배율·원본/실제 캡처
- 글꼴/크기/좌표/문구/상태 차이·판정·미확인

## 완료 조건과 후속 인계
- 완료 조건별 통과/잔여·담당 Goal·필요 환경/근거
- 흐름 단계 통과 x/y, 고유 화면 비교 x/y, 상세 메뉴 확인 x/y
- 외부 인증/결제/서버/DB의 실제 연동 여부
- 다음 Goal이 사용해도 되는 계약과 해결해야 하는 의존 결함
```

Goal 53의 계약 인계는 별도 `TODO/FE_MEDIUM_BACKEND_HANDOFF.md`로 작성한다. 최소한 화면/명령/조회별 입력·출력·null/선택적 의미·ID 관계·소유권·권한/공개 범위·정렬·페이지·중복 처리·상태 전이·오류·날짜/시간대·파일/음성 참조·재시작 보존·이벤트를 담는다. **실제 서버/DB 테이블·DDL은 후속 설계 작업**이다.

## 계획 문서 자체의 검토 기록

2026-11-19 · 두 차례 **자기 검토**를 수행했다. 아래는 계획 문서의 검토이며 미래 Goal 22~53의 코드 검토/실행 결과가 아니다.

- 1차: 32개 Goal의 범위/선행/검증/산출물과 63개 원본 흐름·273단계·200개 고유 화면·72개 세부 작업 묶음을 대조했다. 이미 관찰된 다섯 검색 탭과 미수록 결과 내용을 분리하고, 목록 메모에 근거 없는 멤버십 제한을 넣지 않도록 수정했다.
- 2차: 수정 후 모든 Goal의 필수 항목·두 검토 절차·결과 파일·앞 번호 의존성, 원본/화면/메뉴 담당과 링크를 다시 검사했다. 기본 Reading list 보호·메모 빈값 Done·차단 관찰/공식 설명의 충돌·완료와 검증 잔여의 구분도 명시했다. 화면 ID/단계 참조의 누락·중복 오류와 잘못된 링크는 발견하지 않았다.
- 원본 파일 검증: 고유 ID 200개와 273개 단계 경로를 대조했고 UI 요소 43장의 원본 해시 일치를 확인했다. 원본 파일과 FE 코드는 수정하지 않았다. 앱 테스트/서버 실행/Goal 구현은 수행하지 않았다.

## 복사해서 사용할 실행 요청문

### 첫 Goal만 실행

```text
D:\git_repository\kostolany_project\TODO\FE_MEDIUM_FULL_CLONE_GOALS.md의 Goal 22만 실행해줘.
FE_MEDIUM_FULL_CLONE_MAP.md와 medium의 해당 ANALYSIS.md/PNG를 전부 대응하고,
AGENT\SOFTWARE_AGENT\FRONT_AGENT의 README와 모든 하위 규칙을 반드시 준수해줘.
Medium 원문·폰트·텍스트 크기·픽셀 위치·상태·흐름을 정확히 비교해줘.
기존 사용자 변경과 medium 원본, ENV, 실행 중인 8081을 보존해줘.
1차 검토→수정·검증→2차 재검토→필요한 추가 수정·검증→결과 문서까지 수행해줘.
구현/자동 검사/시각/native 결과와 미확인을 구분하고, Goal 23은 시작하지 마.
백엔드/DB/실제 인증·결제 연동/커밋/push/배포는 하지 마.
```

### 전체 범위를 연속 실행

```text
D:\git_repository\kostolany_project\TODO\FE_MEDIUM_FULL_CLONE_GOALS.md의 Goal 22부터 53까지 순서대로 실행해줘.
FE_MEDIUM_FULL_CLONE_MAP.md의 63개 흐름·273단계·고유 화면 200장과
각 화면의 메뉴/미수록 분기까지 담당 Goal에 따라 처리해줘.
AGENT\SOFTWARE_AGENT\FRONT_AGENT의 README와 모든 하위 규칙을 반드시 준수하고,
medium 원본의 폰트·크기·좌표·문구·상태·UX를 동일하게 재현해줘.
각 Goal마다 구현→1차 검토→수정·검증→2차 재검토→추가 수정·검증→결과 기록을 마친 뒤 다음으로 진행해줘.
미확인 원본/사용 불가능한 환경은 완료로 처리하지 말고, 독립 작업은 계속 진행하며 의존 결함은 먼저 해결해줘.
기존 사용자 변경과 medium 원본, ENV, 실행 중인 8081을 보존해줘.
FE/mock 범위로 진행하고 실제 인증·결제·서버·DB 연동, 커밋/push/배포는 하지 마.
Goal 53에서 실제 구현에 기반한 API/DB 설계 인계 자료와 모든 잔여 차이를 남긴 뒤 종료해줘.
```

범위를 나누어 실행하려면 두 번째 요청문의 시작/끝 번호를 바꾼다. 단일 Goal 요청으로 다음 Goal까지 자동 승인되지는 않는다. **이 문서에 요청문이 있다는 사실 자체는 실행 지시가 아니다.**
