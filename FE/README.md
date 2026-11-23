# Kostolany Mobile

**현재 — Parity 6:** [Digest 결과·검사·8081 확인 순서](../TODO/FE_MEDIUM_PARITY_06_RESULT.md). 기존/새 호의 현재 관계 필터, June 8 기사 구성, 미확인 읽기 시간·회원용 별표, 화면 이탈·조회 수명과 포커스를 보완했다. 구현·mock 검증과 시각 잔여·U 미확인·native 대기를 구분한다. D04/D11의 다른 소비자는 묶음7에 남는다. tools·evidence·캡처/로그/manifest 파일은 생성·수정하지 않는다. 커밋·push·배포·묶음7은 수행하지 않았다. 아래 기록은 각 실행 당시 이력이다.

**Parity 5 추가 재검토:** [팔로우/신고 화면 이탈·차단 중 해제·사용자 이름 조회 실패의 누락 수정](../TODO/FE_MEDIUM_PARITY_05_RESULT.md#additional-review). 최초 실행과 추가 검사를 구분하며 원본 시각 차이·U/native 대기는 유지한다.

**Parity 5 당시:** [관계·추천 관리 결과와 8081 확인 순서](../TODO/FE_MEDIUM_PARITY_05_RESULT.md). 검색·공개 프로필·Following/Muted/Blocked의 동적 사용자 카탈로그와 이름/해제 연결, 목록 배치, 팔로우 메뉴 수명을 보완했다. D06 mock 연결과 V11/V14/V15 부분 시각 보정을 구분하며 원본 차이·미확인·실제 native 검증은 남는다. 사용자 지시로 evidence/캡처 파일은 생성하지 않았고 기존 삭제도 보존했다. 커밋·push·배포하지 않으며 묶음 6은 미착수다. 아래 이전 결과는 당시 이력이다.

**Parity 4 당시:** [결과와 8081 확인 순서](../TODO/FE_MEDIUM_PARITY_04_RESULT.md). 발행 reader의 공통 읽기 설정/Viewed, 일반·발행·정책 이력 재열기, 본문 링크의 오래된 응답 보호를 보완했다. 개발 웹의 `?parityHistory=reference-v1`은 명시적인 이력 비교용이며 정상 기본값을 변경하지 않는다. Q05 미확인·Q11 후속·V12/V16 시각 잔여와 실제 native 검증 대기를 유지한다. 다음은 묶음 5이며 자동 시작하지 않는다. 아래 이전 결과는 당시 이력이다.

**Parity 3 추가 재검토:** [View story 이동 후 남는 Responses와 정책 접근권 상실 시 남는 입력창 수정·추가 검증](../TODO/FE_MEDIUM_PARITY_03_RESULT.md#additional-review). 현재 코드의 검증과 최초 P3 기록을 구분하며 V21 시각 잔여·기기 검증 대기는 유지한다.

**Parity 3 당시(2026-11-23).** 정책 기사 S008의 헤더/작성자/강조/도구를 기존 mock 상태에 연결하고 Responses 복귀·초안/정렬/스크롤/포커스·Library 재열기를 검증했다. [결과·이번 실행·재검토·잔여](../TODO/FE_MEDIUM_PARITY_03_RESULT.md)를 따른다. V21 원본 자산/서체/272 응답 재현과 실제 기기 검증은 미완료다. 다음은 묶음4(D01/D03/D05/Q05/Q11/V12/V16), 미착수다. 아래 Parity 2의 다음 작업/검증 수치는 당시 이력이다. 커밋·push·배포하지 않았다.

**추가 재검토 — Parity 2(2026-11-23).** 공통 팝오버와 읽기 설정의 키보드 포커스 복귀 결함, 증거 검사 누락을 수정했다. 이번 타입/lint·관련10 suites30 tests·새32캡처·Android/iOS JS export와 잔여는 [추가 결과](../TODO/FE_MEDIUM_PARITY_02_RESULT.md#additional-review)를 따른다. 아래 최초53캡처/82테스트는 당시 기록이며 현재 검증을 대신하지 않는다. 기기 검증 대기와 묶음3 미착수, 커밋·push·배포 금지는 유지한다.

**현재 상태 — Parity 2(2026-11-23).** [공통 UI 보정·재검토 결과](../TODO/FE_MEDIUM_PARITY_02_RESULT.md): 모바일 웹 본문 폭·원문 이미지 비율·팝오버 안전 영역·표시 설정 구획/아이콘을 보정하고 자체 UI의 상태별 비교 기준을 정리했다. 타입/lint·관련16 suites82 tests·현재 브라우저53캡처·iOS/Android JS export를 확인했다. Q02/Q12 화면별 잔여와 실제 네이티브 검증은 미완료다. 다음은 묶음3(D08/V21), 미착수이며 커밋·push·배포하지 않았다. 아래 Parity 1/Goal 기록은 과거 상태다.

**현재 상태 — Parity 1(2026-11-23).** [비교 기준·실행 배정 결과](../TODO/FE_MEDIUM_PARITY_01_RESULT.md)와 [실행 계획](../TODO/MEDIUM_PARITY/EXECUTION_PLAN.md)을 추가했다. 200화면 조건·R/T/U/C 연결, 59개 보완 항목의 22묶음 배정과 도구 검증·웹 진단10캡처까지 진행했다. Q01 전수 동일 fixture 재현과 Q02 실제 UI 보정은 미완료다. FE 제품 코드/정상 fixture는 변경하지 않았고 실제 외부 서비스/native 검증은 기존 경계를 유지한다. 아래 Goal53 결과·커밋 문구는 과거 이력이다.

**현재 상태 — Goal53 후속 보완(2026-11-21).** 기본 Reading list 메뉴, 작성 글의 박수·응답·저장/Library 연결, 목록 안 순서 편집·자동 스크롤, 외부 링크 오류 복구, guest 터치 영역과 문서 정합성을 보완했다. 현재 코드의 두 차례 자체 검토·자동/8081/JS export 결과와 잔여는 [후속 결과](../TODO/FE_GOAL_53_FOLLOWUP_RESULT.md)를 따른다. 아래 Goal53 및 이전 수치·캡처·승인은 과거 이력이다. 실제 native 빌드·기기 실행은 이번 사용자 제외 범위이고, 원본 미확인·서체/자산·선택 UX 차이는 남아 전체 클론/출시 완료가 아니다. 이번 변경만 로컬 커밋 1회로 기록하며 push·배포·Goal54는 진행하지 않는다.


**Goal53 당시 상태 — 전수 대조·연결 수정·FE 계약 인계, 전체 클론은 미완료.** 실제8081의63흐름/273단계·200개 고유 화면과C01~C72를 대조하고 두 차례 자기 검토했다. 현재 타입/lint·전체262 suites/1430 tests·3플랫폼 JS export 통과. [결과·200개 판정·잔여](../TODO/FE_GOAL_53_RESULT.md), [FE 계약 인계](../TODO/FE_MEDIUM_BACKEND_HANDOFF.md)를 따른다. 원본 시각 차이·작성 글 반응/저장 bar 미통합·native 실행 대기가 남아 동일 재현/출시 완료가 아니다. Goal53 결과/로컬 커밋에서 종료하며 후속 개발은 시작하지 않는다.

**과거 Goal44~53 연속 작업 승인/이력 — 현재 실행 지시 아님:** Goal44→53의 구현·두 차례 검토·수정·검사·문서 갱신과 단계별 로컬 커밋. 선행42·43은 별도 승인된 `b11b004`, Goal44~52는 각각 `00b2527`·`ee1c299`·`a148542`·`10844cb`·`c1f8961`·`670ec9d`·`22b6674`·`44c81e8`·`1485ac4`다. Goal53은 이번 변경의 로컬 커밋으로 기록한다. 기존 변경·ENV·medium·8081을 보존하며 push·배포·Goal54·백엔드를 진행하지 않는다. 아래 과거 승인/검사/PID는 당시 이력이다.

**Goal43 당시 상태 — 과거 실행 기록(2026-11-21, macOS): 구현 완료·검증 잔여.** 프로필 View stats→Monthly/Lifetime·UTC 월/날짜·Latest/Views/Reads·기존 발행 글 상세/복귀를 연결하고 두 차례 자체 검토했다. 타입/lint·전체210 suites/1188 tests(356.807초)·web/iOS/Android export를 통과했다.8081 정상/실패/계정 경합을 확인하고 원본4쌍을 대조했다. 최종 전체 검사에는 UTC 표시·발행 경합 회귀도 포함한다. [Goal43 결과·실제 전체 검사·8081 순서](../TODO/FE_GOAL_43_RESULT.md)에 기능/자동 검사/시각/native를 구분한다. 월/정렬 펼친 원본·글꼴 차이·실제 native 검증이 남아 전체 완료로 표시하지 않는다.

**Goal42 당시 상태 — 과거 실행 기록(2026-11-20, macOS): 구현 완료·네이티브 검증 대기·원본 차이 잔여.** 사진 Camera/Library·대명사 최대4·부모 Save/Cancel·공유 이름/아바타·About·Stories 복귀를 연결했다. [Goal42 결과·검증·8081 확인 순서](../TODO/FE_GOAL_42_RESULT.md)에서 Goal42 당시 코드의 실행 결과와 원본 차이·네이티브 검증 대기를 구분한다. 당시 타입/lint·전체204 suites/1156 tests(355.276초)·8081·web/iOS/Android export를 통과했다. Goal41의194 suites/1114 tests는 과거 기록이다. 실제 native/OS 검증이 남아 Goal42 전체 완료로 표시하지 않는다.

**Goal43 당시 승인 — 현재 적용 없음:** Goal43만 구현·두 차례 자체 검토·수정·검증·문서 갱신 후 종료한다. 시작 HEAD는 `036ef6e`이고 Goal42 변경45개 경로가 이미 미커밋 상태였다. 기존 변경·ENV·medium 원본과8081 PID43927을 보존했다. **커밋·push·배포 금지, Goal44 미착수.** 커밋은 사용자가 결과 확인 후 직접 한다. 과거 연속 진행/커밋 승인은 적용하지 않는다.

Goal52에서 Goal42 프로필의 사진 선택 처리를 공유 어댑터로 추출하고 **Goal37 편집 Camera/Library의 실제 OS/web 호출을 연결했다.** 웹 파일 선택·취소·실패·초안/발행 사진은 검증했으나 iOS/Android 촬영·앨범·권한의 실제 기기 실행은 여전히 대기다. [현재 결과](../TODO/FE_GOAL_52_RESULT.md).

**Goal41 당시 상태 — 과거 실행 기록:** **구현 완료·검증 잔여**. 신규/기존 mock 분기·관심사 최소3·추천 Follow·모의 알림·안내/중단/재개를 기존 인증/관계/navigation에 연결하고 두 차례 자체 검토했다. 최종 타입/lint·전체194suites/1114tests를 통과했다. 8081 정상/실패/계정 전환·원본6쌍·3플랫폼 export를 확인했다. [Goal41 결과](../TODO/FE_GOAL_41_RESULT.md)에 원본 차이/native·OS 검증 잔여와 자체 정책을 기록했다. 당시 Goal42는 미착수였다. Goal40은 `03b766a`로 커밋됐다. 실제 OS 알림·외부 연동은 없다. Goal37 실제 OS picker는 기존 구현 잔여이며 Goal42에서 필요한 범위를 다시 확인한다.

**과거 승인 — 이번 Goal42에 적용하지 않음(2026-11-20 KST): Goal41→42의 구현·각각 두 차례 자체 검토·검증·결과 기록과 각 Goal별 로컬 커밋1회, 총2회다. Goal41 결과/해시 보고 후 별도 확인 없이 Goal42를 진행하고 종료한다. push·배포·Goal43 이후와 과거 연속 진행/커밋/push 지시는 적용하지 않는다.**

**Goal40 당시 결과:** **구현 완료·검증 잔여**. 가입4/로그인5경로의 공통 mock 인증·이메일6자리/재전송·세션 경계·로그아웃intro를 구현하고 두 차례 자체 검토를 수행했다. 최종 타입/lint·전체190suites/1092tests·8081 정상/실패/계정 흐름·원본 비교·3플랫폼 export를 통과했다. [Goal40 결과](../TODO/FE_GOAL_40_RESULT.md)에 원본 시각/native·OS 검증 잔여와 정책 변경을 구분했다. 실제 OAuth/메일/계정 생성은 없다. Goal37의 실제 Camera/Library OS picker 호출은 구현 잔여이며 local/mock 선택만 지원한다. Goal37/38/39는 `68a51b4`/`3b41943`/`3c4adb2`에 커밋했고 Goal40 변경을 로컬 커밋한 뒤 종료한다. push·배포·Goal41 이후는 진행하지 않는다.

**Goal39 당시 결과:** **구현 완료·검증 잔여**. 토픽 최대5·미리보기·Publication/Unlisted·mock 발행·실제 작성 문서 상세를 연결하고 두 차례 자체 검토를 수행했다. 최종 타입/lint·전체186suites/1074tests·8081 정상/실패/계정 흐름·원본 비교·3플랫폼 export를 통과했다. 실제 native/OS와 원본 시각 잔여, publication 보완 정책은 [Goal39 결과](../TODO/FE_GOAL_39_RESULT.md)를 따른다. Goal37/38은 각각 `68a51b4`/`3b41943`에 커밋됐다.

**Goal38 당시 결과:** **구현 완료·검증 잔여**. 초안 자동 저장/실패/재개·ID를 보존하는 멘션과 두 차례 자체 검토, 전체180suites/1060tests·타입/lint를 통과했다. 이후 빈 문서 상태/시각 보정의12suites/54tests, 마지막 후보/메뉴 보정의최종 타입/lint·4suites/18tests·8081·원본5쌍·3플랫폼 export도 통과했다. [코드 기준과 결과](../TODO/FE_GOAL_38_RESULT.md). 실제 native/OS·원본 시각 잔여와 메모리 초기화 정책은 별도다. Goal37은 `68a51b4`에 로컬 커밋했다.

**Goal37 당시 결과:** **구현 완료·검증 잔여**. 이미지 문서/출력·실패/권한·계정 수명과 두 차례 자체 검토, 전체174suites/1038tests·타입/lint 통과 후 실패 이미지 삭제 보완의 최종 타입/lint·4suites/14tests·브라우저·3플랫폼 export도 통과했다. [현재 결과](../TODO/FE_GOAL_37_RESULT.md). Camera/Library는 로컬 mock 선택이며 실제 OS picker 호출과 native 실행은 구분한다.

**Goal36 당시 검증:** Write/실제 입력·선택/서식·계정/이탈과 두 차례 자체 검토,8081 기본8흐름·시각/포커스3흐름·원본5쌍을 확인했다. 전체168suites/1014tests(653.522초) 통과 후 제목 포커스 표시만 보정하고 최종 타입/lint·영향2suites/10tests(28.78초)·브라우저/캡처·web/iOS/Android export도 통과했다. [실행 기준과 결과](../TODO/FE_GOAL_36_RESULT.md). 실제 native/OS 접근성·IME·원본 동일 재현은 잔여다. [Goal35](../TODO/FE_GOAL_35_RESULT.md)는 메모리 사본이며 파일 캐시·재시작 보존은 없다.

**과거 승인 — 현재 적용 없음(2026-11-20 KST): Goal37→38→39→40의 구현·각각 두 차례 자체 검토·검증·결과 기록과 각 Goal별 로컬 커밋1회, 총4회다. 각 결과/해시 보고 후 다음 승인된 Goal을 이어서 진행하고 Goal40에서 종료한다. push·배포·Goal41 이후와 과거 연속 진행/커밋/push 지시는 적용하지 않는다.**

과거 작업 시작 기록의 HEAD는 `66f1041`, 작업 트리는 깨끗했다. Node24.18.0/npm10.9.0과 기존8081 PID5248을 유지한다. medium 원본·ENV·기존 사용자 변경을 보존하고 비교/로그/export는 저장소 밖 임시 경로에 둔다. 아래 과거 승인/검사는 당시 이력이다.

**Goal32 당시 검사:** 152 suites/906 tests·typecheck/lint·원본2쌍·web/iOS/Android export는 [Goal32 결과](../TODO/FE_GOAL_32_RESULT.md)의 이력이며 Goal33 변경 검사가 아니다.

**과거 승인 이력 — 현재 적용 없음:** Goal25~31의 소스·자산·테스트·결과 문서를 함께 커밋하고 `origin/main`에 푸시하도록 요청받았다. 아래 커밋/push 금지와 미커밋 표기는 개발 종료 당시 이력이다. 배포하지 않으며 Goal32 이후는 시작하지 않는다.

**과거 Goal31 종료 요청:** Goal31에서 종료했던 당시 기록이다. 현재 승인과 검사는 문서 상단 Goal37~40 기준이다.

로컬 미리보기는 기존 [http://localhost:8081](http://localhost:8081)을 사용한다. 실행 중이면 중복 서버를 시작하지 않는다.

**Goal31 당시 상태(2026-11-20, macOS):** [Goal31 결과](../TODO/FE_GOAL_31_RESULT.md). Goal25~31은 구현 완료·시각/native 검증 잔여다. 추천 관리·관심사·Show less·이력 삭제/Library 동기화,늦은 이력 응답/실패 복구와 빠른 계정 전환의 개인 navigation 초기화를 구현했다. 각 Goal에서 두 차례 자체 검토·수정했다. 현재 코드 typecheck·lint·전체 **144 suites/856 tests 통과**,8081 정상/장애/계정/320px·긴 목록·원본 대조와 iOS/Android JS/Hermes export를 확인했다. 원본 font/vector·시각 차이와 실제 native build/run·OS 접근성/IME는 남는다. 최신 사용자 지시에 따라 **Goal31에서 종료하며 Goal32 이후 미착수**다. 커밋/push/배포·외부 연동은 없다. HEAD2e7aedd,Node24.18.0/npm10.9.0,기존8081 PID11374·medium382개 파일·ENV·lockfile을 보존했다. 산출물은 저장소 밖 임시 경로이며 아래 과거 승인/검사/PID/중단 문구는 당시 이력이다.

Goal 21 완료 당시 기록: Goal 14~21의 순차 구현·각 두 차례 검토·결과 기록을 마쳤다. 최종638 tests/84 suites·typecheck·lint·양 플랫폼 JS/Hermes·8081 통합 흐름·원본31쌍 비교를 확인했다. **100% 시각 일치 및 실제 iOS/Android 실행·native build 검증은 미완료**이며 남은 차이/필요 환경은 Goal21 결과에 기록했다. Goal14 커밋 `d016c06`, Goal15~21은 후속 사용자 요청에 따라 로컬 커밋으로 보관한다. 후속 개발은 시작하지 않는다.

후속 커밋 요청: 소스·자산·테스트·결과 문서·검증 증거를 `feat(fe): implement Medium reference UI for goals 15-21` 커밋으로 함께 기록한다. 이전 단계의 미커밋 표기는 당시 이력이며 push·배포는 수행하지 않는다.
React Native 기반 iOS·Android mock 앱이다. Goal14~21에서 Medium 원본을 기준으로 Home·Explore/Search·기사·저장·Library/목록·로그인·Profile·Settings 화면을 구현했다. 원본 사진/영어 콘텐츠 fixture와 기존 금융 fixture를 함께 사용한다. 모의 A/B 계정별 좋아요·저장·목록·이름/소개·기본 설명 수준은 메모리에 보관하며 전체 Reload 시 초기화한다. 실제 외부 서비스는 연결하지 않았다. [최종 결과와8081 확인 순서](../TODO/FE_GOAL_21_RESULT.md), 31쌍 원본 비교(과거 임시 산출물·현재 미보관; [Goal21 결과](../TODO/FE_GOAL_21_RESULT.md) 참조)는 Goal21 시점의 기록이다. 현재 기준은 위 최신 Goal 결과를 따른다.

## 환경과 기술 선택

[Goal14~21 연속 작업](../TODO/FE_MEDIUM_CLONE_GOALS.md)의 당시 환경은 Node24.10.0, 결과는638 tests/84 suites였다. Goal14 커밋은 `d016c06`이다. 현재 환경과 검증은 위 최신 Goal 결과를 따르며 실제 native 실행 환경은 없다. 남은 차이를100% 클론 완료로 표현하지 않는다.

| 항목 | 고정 버전 |
| --- | --- |
| Node.js | 24.18.0 (`.nvmrc`, Node 24 계열) |
| npm | 10.9.0 |
| Expo SDK | 57 (`expo` 57.0.33) |
| React / React Native | 19.2.3 / 0.86.3 |
| React DOM / React Native Web | 19.2.3 / 0.21.4 (PC 미리보기) |
| Expo Metro runtime | 57.0.18 |
| TypeScript | 6.0.3, strict |
| Jest / jest-expo | 29.7.0 / 57.0.6 |
| React Native Testing Library / test-renderer | 14.1.0 / 1.2.0 |
| ESLint / eslint-config-expo | 9.39.5 / 57.0.2 |
| React Navigation / bottom-tabs | 7.5.2 / 7.22.0 |
| React Navigation native-stack | 7.21.1 |
| react-native-screens / react-native-svg | 4.26.2 / 15.15.4 |
| babel-preset-expo | 57.0.17 |

직접 의존성은 `package.json`에 정확한 버전으로 지정하고, 전체 설치 결과는 `package-lock.json`으로 고정한다. 패키지 관리자는 npm을 사용한다.

2026-11-17 기준 Expo 공식 안내의 SDK 58 전환 기간에는 실기기 Expo Go용으로 SDK 57을 권장한다. 이 기준과 SDK 57의 의존성 검사 결과에 맞췄다. 최신 버전으로 일괄 갱신하지 말고 Expo·React Native·테스트 도구의 호환성을 함께 확인한다.

`index.ts`에서 앱을 등록하고 React Navigation의 native-stack 안에 Main 탭과 Article 상세를 둔다. 상세에서는 하단 탭을 숨기고 뒤로 가면 유지된 홈·탐색·읽기 목록으로 복귀한다. Library 탭 안의 별도 stack은 라이브러리와 기본/사용자 목록을 연결한다. 기사 ID·목록 ID·진입 탭·목록 소유자·인증 revision을 전달해 복귀를 구분한다. 로그인 Modal은 공개 화면을 유지하고 사용자 전환은 개인 Library/Profile stack과 시트·초안을 정리하고, 공개 기사 경로를 유지한 채 설명 수준 하위 세션을 현재 계정 기준으로 시작한다. Profile 내부 stack은 프로필·설정·Profile Lists에서 연 목록을 연결한다. Main 내부는 bottom-tabs의 `history` 방식을 사용하며, 홈에서 더 돌아갈 이력이 없으면 OS 기본 뒤로 가기에 맡긴다. Expo Router는 설치하지 않았다. 실제 기기의 뒤로 가기·제스처는 아직 미검증이다. 향후 실제 Google 네이티브 인증을 붙일 때에는 development build와 각 플랫폼 설정을 별도로 확인해야 한다.

근거: [Expo 프로젝트 생성](https://docs.expo.dev/more/create-expo/), [Expo 테스트 구성](https://docs.expo.dev/develop/unit-testing/), [RNTL v14](https://oss.callstack.com/react-native-testing-library/docs/start/quick-start), [Google 인증](https://docs.expo.dev/guides/google-authentication/).

탭 구성과 테스트는 [React Navigation bottom-tabs](https://reactnavigation.org/docs/bottom-tab-navigator/), [테스트 지침](https://reactnavigation.org/docs/testing/)을 참고했다. 플랫폼별 Jest 변환에는 [Expo Babel 설정](https://docs.expo.dev/versions/latest/config/babel/)을 명시했다.

## 설치와 실행

Windows PowerShell 기준:

```powershell
Set-Location D:\git_repository\kostolany_project\FE
npm.cmd ci
npm.cmd start
```

현재 화면에는 ENV 값이나 Supabase·Google 계정 설정이 필요하지 않다. 기존 사용자 ENV를 새로 만들거나 덮어쓰지 않는다.

- 실기기: 호환되는 Expo Go를 설치하고 PC와 기기를 같은 네트워크에 연결한 뒤 터미널의 QR을 연다.
- Android 에뮬레이터: Android SDK와 가상 기기를 준비한 뒤 `npm.cmd run android`를 실행한다.
- iOS 시뮬레이터: macOS와 Xcode가 있는 환경에서 `npm run ios`를 실행한다. Windows에서는 iOS 시뮬레이터를 실행하지 않는다.
- Metro 종료: 실행 중인 터미널에서 `Ctrl+C`를 누른다.

macOS에서는 위 `npm.cmd` 명령을 `npm`으로 실행한다. 서비스 대상은 iOS·Android다. 사용자의 PC 로컬 확인 요청에 따라 `app.json`에 개발용 웹 미리보기도 허용했다.

### PC 브라우저 미리보기

```powershell
Set-Location D:\git_repository\kostolany_project\FE
npm.cmd run web
```

[http://localhost:8081](http://localhost:8081)을 연다. `--localhost`로 실행하며 실제 계정·ENV·백엔드가 필요 없다. 좋아요·저장·라이브러리는 화면의 모의 로그인 후 사용한다. 모바일과 같은 화면 코드를 React Native Web으로 표시한다. 홈의 기사 카드를 클릭하면 상세를 읽고 상단 뒤로 가기로 돌아온다. 휴대폰 폭으로 보려면 Chrome/Edge에서 `F12` → `Ctrl+Shift+M`을 누르고 폭 390 정도를 선택한다. 종료는 실행한 터미널의 `Ctrl+C`다. 이미 이 주소에서 실행 중이면 새 서버를 중복 실행하지 않고 해당 주소를 사용한다.

2026-11-18 Chrome의 390×844·1365×900 뷰포트에서 홈 표시, 선택 기사 상세, 사실/해석 구분, 삽화·이미지 없는 기사, 본문 스크롤과 홈 복귀를 확인했다. 브라우저 콘솔 오류는 수정 후 0건이었다. 이 결과는 실제 iOS·Android 실행이나 네이티브 화면 비교를 대신하지 않는다. 구성 근거: [Expo 웹 실행 안내](https://docs.expo.dev/workflow/web/).

## 검증 명령

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
```

세 검사를 순서대로 실행하려면 `npm.cmd run check`, 테스트 수정 중에는 `npm.cmd run test:watch`를 사용한다. 타입 검사에는 테스트 파일도 포함된다.

`npm.cmd test`는 테스트를 iOS·Android Jest 설정에서 각각 실행한다. Goal21 최종 기준 논리319개, 양 플랫폼 합계638건(84 suites)이다. Goal14의614건 등 이전 수치는 당시 결과다. 특정 설정만 확인하려면 `npm.cmd test -- --selectProjects iOS` 또는 `npm.cmd test -- --selectProjects Android`를 사용한다. 이 결과는 JS 컴포넌트·hook·mock 데이터 테스트이며 실기기 실행 결과가 아니다.

```powershell
npx.cmd expo install --check
npx.cmd --yes expo-doctor@1.21.8
npm.cmd run export:android
npm.cmd run export:ios
```

`export:*`는 각 플랫폼의 JavaScript/Hermes 번들을 생성한다. APK·AAB·IPA 네이티브 빌드나 기기 실행을 대신하지 않는다. 생성물은 `dist/android`, `dist/ios`에 저장되며 Git에서 제외한다.

## 파일 구성

```text
index.ts                             앱 등록
App.tsx                              Safe Area provider와 루트 이동 연결
src/app/navigation/AppNavigator.tsx 인증·개인 공급부 연결과 Main·Article stack
src/app/navigation/ArticleRouteScreen.tsx 사용자·세션·목록 존재를 확인하는 기사 복귀
src/app/navigation/MainTabs.tsx      4개 탭 등록
src/app/navigation/LibraryNavigator.tsx 라이브러리·기본/사용자 목록 이동
src/app/navigation/BottomTabBar.tsx  접근 가능한 아이콘 탭과 Safe Area
src/app/navigation/tabs.ts          타입이 지정된 경로·명칭·아이콘
src/features/auth/AuthProvider.tsx   앱 수명의 모의 인증 소유자·공유 구독
src/features/auth/createAuthStore.ts 로그인/로그아웃·취소·요청 세대·실패 재시도
src/features/auth/AuthDialogs.tsx    로그인·로그아웃 Modal과 모의 결과 선택
src/features/auth/AccountScreen.tsx  비로그인 프로필·라이브러리 안내
src/features/auth/LoginRequestButton.tsx 개인 행동에서 로그인 진입
src/features/auth/data/              예시 독자 A/B·모의 응답 공급부
src/app/navigation/ProfileRouteScreen.tsx 인증 세션별 개인 프로필 진입
src/app/navigation/ProfileNavigator.tsx 프로필·설정 내부 stack
src/features/settings/ReadingSettingsProvider.tsx 사용자별 기본 수준 공급부·저장소·scope
src/features/settings/createReadingSettingsStore.ts 조회 세대·직렬 최신 제출
src/features/settings/SettingsScreen.tsx 설정 조회·변경 진입·로그아웃
src/features/settings/DefaultLevelSheet.tsx 기본 수준 편집 선택·저장·취소
src/features/settings/data/          메모리 설정·실패/지연 재현
src/features/article/useEntryExplanationPreference.ts 기사 진입의 확정 기본값
src/features/profile/ProfileProvider.tsx 사용자별 프로필 공급부·저장소·개인 UI 범위
src/features/profile/createProfileStore.ts 조회 세대·확정 프로필·직렬 최신 제출
src/features/profile/profileValidation.ts 이름/소개 정규화·코드 포인트 계산·검증
src/features/profile/ProfileScreen.tsx 프로필 조회·빈 소개·편집 진입·오류/재시도
src/features/profile/ProfileEditorSheet.tsx 이름/소개 초안·저장·취소·입력 보존
src/features/profile/data/           사용자별 모의 프로필·실패/지연 시나리오
src/features/feed/HomeFeedScreen.tsx 홈 피드·상태 표시와 기사 선택 경계
src/features/feed/components/        기사 카드·정렬 탭·상태·자체 SVG 썸네일
src/features/feed/useFeed.ts         조회·재시도·추가 요청·오래된 응답 처리
src/features/feed/types.ts           fixture용 데이터 접근 계약
src/features/feed/data/fixtures.ts   정렬별 고정 예시 기사
src/features/feed/data/mockFeedSource.ts 페이지·지연·실패를 재현하는 공급부
src/features/feed/data/feedPreview.ts 실행 화면의 mock 시나리오 선택
src/features/article/ArticleDetailScreen.tsx 상세 읽기·뒤로 가기·상태 표시
src/features/article/useArticle.ts   상세 조회·재시도·오래된 응답 차단
src/features/article/ExplanationSection.tsx 4단계 선택·수준별 설명과 예시
src/features/article/useExplanation.ts 기사·수준별 요청 수명과 재시도
src/features/article/explanationTypes.ts 난이도·로컬 설명 데이터 계약
src/features/article/types.ts        fixture용 상세 데이터 접근 계약
src/features/article/data/           10개 본문 예시·상세 공급부·상태 재현
src/features/search/SearchScreen.tsx 탐색·검색 입력·빈 입력·결과·상태 표시
src/features/search/SearchCard.tsx   검색 전용 카드·출처·전체 폭 요약
src/features/search/useSearch.ts     debounce·재시도·이전 응답 차단
src/features/search/data/            예시 검색 규칙·주제 바로가기·상태 재현
src/features/likes/LikeProvider.tsx  앱 수명의 반응 상태 소유자
src/features/likes/createLikeStore.ts 기사별 직렬 변경·최신 의도·낙관적 표시·복구
src/features/likes/useArticleLike.ts 기사별 구독과 입력 연결
src/features/bookmarks/BookmarkProvider.tsx 모의 공급부·사용자별 저장소 수명
src/features/bookmarks/createBookmarkStore.ts 기본 읽기 목록·기사별 직렬 쓰기·실패 복구
src/features/bookmarks/createUserListStore.ts 사용자 목록·이름/소속/삭제·최신 목표·실패 복구
src/features/bookmarks/createLibraryStore.ts 기본/사용자 목록 조합·기사별 합집합 선택
src/features/bookmarks/listTypes.ts          사용자·목록·기사 ID와 목록 명령 계약
src/features/bookmarks/validateListName.ts   제출용 이름 정규화·60자/중복 검증
src/features/bookmarks/LibrarySheet.tsx      Modal·Safe Area·키보드 회피·스크롤
src/features/bookmarks/ListEditorSheet.tsx   목록 생성·이름 수정·입력 보존·취소
src/features/bookmarks/ListActions.tsx       관리 메뉴·이름 수정·삭제 확인
src/features/bookmarks/SaveToListSheet.tsx   저장 대상 선택 초안·완료·취소
src/features/bookmarks/LibraryListCard.tsx   목록별 카드·개수·미리보기
src/features/bookmarks/UserListFeedback.tsx  목록 진행/실패·재시도
src/features/bookmarks/useBookmarks.ts 기사별·목록별 구독과 입력 연결
src/features/bookmarks/ArticleBookmarkControl.tsx 저장 상태·접근성·실패 재시도
src/features/bookmarks/LibraryScreen.tsx 기본/사용자 목록 카드·생성 진입
src/features/bookmarks/ReadingListScreen.tsx 저장 기사·빈 상태·상세 이동
src/features/bookmarks/data/         기사 카탈로그·모의 사용자별 저장·상태 재현
src/features/public-lists/PublicListScreen.tsx 공개 목록 상세·소유자·기사·목록 반응
src/features/public-lists/PublicListProvider.tsx 사용자/source별 저장소·권한 알림·인증 scope
src/features/public-lists/createPublicListStore.ts 전체 목록 저장·직렬 최신 의도·응답 유실/재시도
src/features/public-lists/SavedLists.tsx Library 저장 목록·상세 진입·해제 동기화
src/features/public-lists/data/      관찰한 공개 목록·권한/실패/긴 목록 mock
src/features/reactions/ClapProvider.tsx 공유 박수의 사용자 저장소와 인증 오류 수명
src/features/likes/ArticleLikeControl.tsx 하트·수치·처리/실패·접근성 표시
src/features/likes/data/             모의 사용자·반응 수치·실패/지연 시나리오
src/shared/theme/tokens.ts           현재 화면에 필요한 색상·글자·간격
src/shared/ui/ContentIllustration.tsx 피드·상세가 공유하는 자체 SVG 삽화
src/shared/ui/ContentStatus.tsx      로딩·오류·재시도 공통 표시
src/shared/ui/TabIcon.tsx            자체 SVG 아이콘
src/app/App.test.tsx                 실제 앱 루트에서 탭 이동 테스트
test/setup.ts                        Safe Area의 공식 Jest mock
jest.config.js                       iOS·Android Jest 설정
babel.config.js                      Expo Babel 변환
eslint.config.js                     Expo 기반 lint 설정
tsconfig.json                        strict와 테스트 타입 검사
```

테스트는 앱 루트의 탭 이동·재선택·모의 뒤로 가기·홈 복귀 시 피드 선택 유지, 정렬과 표시 데이터의 일치, 기사 ID 전달, 빈 결과, 첫 조회·추가 조회 실패와 재시도, 동시 추가 요청 방지, 마지막 페이지, 중복 기사 ID 제거, 이전 정렬 응답 무시와 Strict Mode 재시작을 검증한다. React Navigation과 앱 화면은 mock하지 않는다. 네이티브 환경이 없는 Jest에서는 Safe Area의 공식 mock과 jest-expo의 네이티브 대체 환경을 사용한다. 실제 여백·글자 확대·레이아웃·스크린리더를 검증한 것은 아니다.

새 테스트를 작성할 때는 설치된 `node_modules/@testing-library/react-native/docs/guides/llm-guidelines.md`를 확인한다. v14의 `render`와 사용자 이벤트는 비동기 API이므로 `await`로 완료를 기다린다. 테스트를 통과시키기 위해 실제 화면 컴포넌트 자체를 mock으로 대체하지 않는다.

## 홈 피드 예시와 상태 재현

최신 4개·인기 3개·추천 3개의 서로 다른 고정 예시 목록을 사용한다. 날짜·읽기 시간도 fixture 값이며 실제 집계·추천 결과가 아니다. 홈과 카드 출처에 예시임을 표시한다. 페이지당 2개를 제공하며, `기사 더 보기`로 다음 페이지를 요청한다. 정렬 변경 시 첫 페이지로 돌아가고, 하단 메뉴로 다른 화면을 방문했다 돌아오면 선택한 정렬과 목록 상태를 유지한다.

[feedPreview.ts](src/features/feed/data/feedPreview.ts)의 `feedPreviewScenario`를 아래 값으로 바꾸고 앱을 완전히 Reload하면 상태를 재현할 수 있다. 기본값은 `normal`이며 별도 개발자 메뉴·ENV·외부 연결은 없다. 오류 재현 이력은 공급부 인스턴스에만 있으므로 같은 실패를 다시 보려면 전체 Reload가 필요하다.

| 값 | 재현 상태 |
| --- | --- |
| `normal` | 약 250ms 지연 후 정상 목록, 추가 페이지, 마지막 페이지 안내 |
| `empty` | 빈 결과 안내 |
| `initial-error` | 각 정렬의 첫 요청이 한 번 실패하고 `다시 시도`로 성공 |
| `page-error` | 각 정렬의 추가 페이지 요청이 한 번 실패하고 같은 cursor로 재시도 |
| `slow` | 요청마다 약 10초 지연, 첫 로딩·추가 로딩 관찰 |

실제 기기에서 위 시나리오를 실행한 결과는 아직 없다. 자동 테스트에서는 같은 공급부 또는 제어 가능한 응답을 주입해 상태와 행동을 검증했다. 카드를 누르면 `onSelectArticle(articleId)`를 통해 선택한 ID를 전달하며, navigation이 진입 탭 정보를 함께 보관한다. 상세 공급부에서는 해당 ID의 본문을 읽는다.

## 기사 상세 예시와 상태 재현

홈 예시 10개에 대응하는 본문을 제공한다. 제목·출처·날짜·읽기 시간은 홈과 맞추고 시각 `09:00`은 고정 예시 값으로 덧붙인다. 사실 요약과 AI 해석을 별도 제목·구획으로 표시하며 모두 직접 작성한 가상 내용이다. 실제 보도·AI 생성 결과·책의 인용문이 아니다. 이미지는 자체 SVG 삽화이며, 이미지가 없는 기사는 빈 이미지 영역 없이 본문을 표시한다. 기본 최신 목록의 환율 기사에서 확인할 수 있다.

[articlePreview.ts](src/features/article/data/articlePreview.ts)의 `articlePreviewScenario`를 바꾸고 앱을 전체 Reload하면 상세 상태를 재현하도록 구성했다.

| 값 | 재현 상태 |
| --- | --- |
| `normal` | 약 250ms 로딩 후 선택한 기사 표시 |
| `initial-error` | 각 기사 첫 요청 한 번 실패 → 같은 기사 다시 시도 성공 |
| `slow` | 약 10초 로딩, 로딩 중에도 홈으로 복귀 가능 |

실패 이력은 공급부 메모리에만 보관하며 전체 Reload로 초기화한다. 네트워크·ENV·계정 설정은 필요 없다. 자동 테스트에서 기사 ID 일치, 전체 본문과 구획, 이미지 유무, 실패·재시도, 다른 기사로 이동 후 늦은 성공/실패 무시, 홈 복귀 시 정렬·조회된 페이지 유지와 모의 뒤로 가기를 검증했다. 실제 기기의 스크롤 위치 복원과 iOS 제스처는 검증 대기다.

## 4단계 설명 전환

기사 상세의 **AI 해석 → 설명 수준**에서 초등학생·중학생·고등학생·성인을 선택한다. 홈의 10개 기사에 각각 4단계, 총 40개 설명·예시가 있다. 수준 선택은 해석의 표현과 예시만 바꾸며 공통 사실 요약·제목·출처는 유지한다. 기본 성인 설명은 Goal 4의 기존 해석 본문을 사용한다.

Goal 12부터 로그인한 사용자의 확정 기본 수준으로 새 기사를 시작하고 비로그인·최초 설정은 `성인`이다. 기사 안의 선택은 그 읽기 화면에만 남으며 계정의 기본 설정을 자동 변경하지 않는다. 자세한 재진입·뒤로 복귀·지연 조회 정책은 아래 설정 항목을 따른다. 서버·기기 영속 저장은 없고 실제 나이를 묻거나 추정하지 않는다. 읽기 시간도 기존 고정 예시 값이며 수준별로 재계산하지 않는다.

새 수준을 선택하면 이전 설명·예시는 숨기고 현재 수준의 로딩 또는 오류를 표시한다. 사실 요약과 뒤로 가기는 계속 사용할 수 있다. 선택 컨트롤은 로딩·오류 중에도 동작하며, 재시도는 실패한 기사·수준 조합만 다시 요청한다. 같은 선택을 다시 누르면 추가 조회하지 않는다.

[explanationPreview.ts](src/features/article/data/explanationPreview.ts)의 `explanationPreviewScenario`를 바꾸고 전체 Reload하면 아래 상태를 재현할 수 있다. 검사 후 기본값 `normal`로 복원했다. 실제 API 호출은 없다.

| 값 | 설명 영역의 재현 상태 |
| --- | --- |
| `normal` | 약 250ms 뒤 해당 수준의 설명·예시 표시 |
| `initial-error` | 기사·수준 조합별 첫 요청 1회 실패 → `설명 다시 시도`로 복구 |
| `slow` | 요청마다 약 10초 지연, 대기 중 선택 변경·홈 복귀 |
| `out-of-order` | 초등학생 900ms·중학생 600ms·고등학생 100ms·성인 250ms. 연속 선택 시 뒤늦은 응답이 마지막 선택을 덮어쓰지 않는지 확인 |

Chrome에서 네 수준의 본문·예시·선택 일치, 오류·재시도, 느린 요청 중 복귀, 응답 순서 역전과 320/390/1365px 폭 표시를 확인했다. 자동 테스트는 같은 수준 재진입, 이전 요청의 늦은 실패, 기사 변경과 Strict Mode 정리도 검증한다. 자세한 근거와 한계는 [Goal 5 결과](../TODO/FE_GOAL_05_RESULT.md)에 기록했다.

## 기사 검색과 탐색

하단 **탐색 → 기사 검색**에서 입력하거나 금융 주제 바로가기를 누른다. 결과를 선택하면 같은 기사의 상세가 열리고, 상단 `탐색으로 돌아가기`로 복귀하면 검색어·결과가 유지된다. PC 브라우저에서는 목록의 스크롤 위치 유지도 확인했다. 다른 탭을 방문해도 유지하지만 새로고침·앱 재실행 시 초기화한다. 브라우저 주소창의 URL·이전 페이지 이력과 앱 내부 뒤로 가기는 별개다.

검색 규칙은 **화면용 기본안**이다. 기존 고유 예시 기사 10개의 제목·요약·출처를 NFC 정규화하고 앞뒤/연속 공백과 영문 대소문자를 정리한다. 공백으로 나눈 모든 단어가 해당 필드들을 합친 문자열에 포함되면 일치한다(AND, 리터럴 부분 일치). 결과 순서는 fixture의 최신 4개 → 인기 3개 → 추천 3개 순서를 보존하며 실제 관련도·최신순·서버 검색 정책을 확정하지 않는다. 본문·AI 해석은 검색 대상이 아니며 페이지 구분 없이 전부 표시한다.

입력 마지막 변경 후 250ms에 조회한다. 빈 입력은 검색하지 않고 주제 바로가기를 보여주며, 결과 0건은 별도 안내를 표시한다. 새 검색어를 입력하면 이전 결과를 숨기고 현재 검색어의 로딩/오류를 보여준다. 늦은 성공·실패는 무시하며 같은 검색어로 재시도한다. `금리`는 2건, `환율`은 이미지 없는 기사 1건, `Kostolany`는 10건, `없는기사`는 0건을 확인하기 좋은 예시다.

[searchPreview.ts](src/features/search/data/searchPreview.ts)의 `searchPreviewScenario`를 바꾸고 전체 Reload하면 아래 상태를 재현할 수 있다. 검증 후 `normal`로 복원했다.

| 값 | 검색 상태 |
| --- | --- |
| `normal` | debounce 이후 200ms 지연 후 결과 |
| `initial-error` | 검색어별 첫 요청 1회 실패 → `검색 다시 시도`로 복구 |
| `slow` | 10초 지연; 요청 중 지운 검색어의 늦은 결과 무시 |
| `out-of-order` | 금리 1,200ms·나머지 200ms. 금리 입력 후 250ms 이상 기다려 요청을 시작하고 환율로 바꾸면 늦은 금리 응답 무시 |

원본의 검색창·주제 행·유형 밑줄·출처/제목/썸네일/전체 폭 요약/메타데이터 배치를 반영했다. 기사 외 유형·글쓰기는 제외하며 검색 카드의 좋아요는 Goal 7, 북마크는 Goal 8에서 추가했다. 검색 원본/구현 비교(과거 임시 산출물·현재 미보관; [Goal6 결과](../TODO/FE_GOAL_06_RESULT.md) 참조)와 [Goal 6 검증 기록](../TODO/FE_GOAL_06_RESULT.md)은 반응 추가 전 이력이다.

## 좋아요 예시와 상태 재현

홈·검색 결과의 하트와 상세 하단의 하트는 같은 기사 반응을 공유한다. 현재 인증된 예시 독자 A/B가 사용자별로 1좋아요를 등록·해제하는 화면용 기본안이다. 수치는 각 사용자의 fixture 기준 수치+자신의 선택이며 실제 전체 독자 집계가 아니다. 처음에는 모든 기사 미선택이며 수치는 0~128의 임의 예시다. 저장소는 앱 실행 동안 유지되고 전체 새로고침·앱 재실행 시 초기화한다. 기기에 영속 저장하지 않는다.

기사별 요청은 직렬 처리하며 가장 최근 선택만 대기한다. 수치와 선택을 먼저 보여주고 최신 변경이 실패하면 확정 상태로 복구한다. 재시도는 실패했던 목표를 그대로 사용한다. 이전 조회 응답과 이전 범위의 응답이 최신 상태를 덮지 않도록 처리한다.

`src/features/likes/data/likePreview.ts`의 `likePreviewScenario`를 변경하고 전체 새로고침하면 아래 상태를 확인할 수 있다. 결과 전달 시 기본값은 `normal`이다.

| 시나리오 | 동작 |
| --- | --- |
| `normal` | 조회·쓰기 각각 350ms 뒤 성공 |
| `write-error` | 사용자·기사별 첫 변경 실패, 상태·수치 복구 후 재시도 |
| `unlike-error` | 등록 성공 후 첫 해제 실패, 선택·수치 복구 후 해제 재시도 |
| `read-error` | 첫 조회 실패, 수치 미확인 표시 후 조회 재시도 |
| `slow` | 조회·쓰기 1,800ms 지연, 연속 입력·이동 중 마지막 선택 확인 |

[Goal 7 결과](../TODO/FE_GOAL_07_RESULT.md)에 상태 소유자·수명·동시성·초기 수치·실패 계약을 기록했다. Medium 반응 비교(과거 임시 산출물·현재 미보관; [Goal7 결과](../TODO/FE_GOAL_07_RESULT.md) 참조)는 원본 박수와 우리 단일 좋아요의 차이를 포함한다.

## 북마크와 읽기 목록

홈·검색·상세·읽기 목록의 북마크는 같은 사용자와 기사의 상태를 공유한다. 인증된 사용자 ID를 사용하며, 처음에는 각 독자에게 저장한 기사가 없다. 사용자 목록 소속이 없는 기사의 저장 버튼은 기본 읽기 목록에 즉시 반영되고, 라이브러리 → 읽기 목록 → 기사 상세로 다시 읽을 수 있다. 해제는 목록 소속만 제거하며 기사 원문·좋아요를 삭제하지 않는다. 목록 순서는 기존 10개 fixture의 최신·인기·추천 배열 순서이며 실제 저장 시각 정렬 정책은 아니다.

사용자별 메모리 저장소에서 기사별 쓰기를 직렬 처리하고 마지막 목표를 유지한다. 저장 실패는 기존 미선택으로, 해제 실패는 기존 선택으로 복구하며 같은 목표로 재시도한다. 목록 상단은 화면 밖 기사의 실패도 안내한다. 같은 공급부에서 사용자 범위를 바꿨다가 돌아와도 진행 중 변경은 해당 사용자 저장소에서 완료된다. Goal 10의 모의 로그인과 연결하며 실제 인증은 없다.

전체 새로고침·앱 재실행·Provider 재생성으로 기본 공급부가 새로 만들어지면 저장은 초기화된다. 기기 저장소·서버·오프라인 큐를 사용하지 않으며 Fast Refresh 보존은 보장하지 않는다. `src/features/bookmarks/data/bookmarkPreview.ts`의 `bookmarkPreviewScenario`를 바꾸고 전체 새로고침하면 다음 상태를 확인한다. 전달 시 `normal`이다.

| 시나리오 | 동작 |
| --- | --- |
| `normal` | 목록 조회·기사 변경 각각 350ms 뒤 성공 |
| `read-error` | 사용자별 첫 목록 조회 실패 후 수동 재시도 성공 |
| `save-error` | 사용자·기사별 첫 저장이 반영 전에 실패 |
| `remove-error` | 사용자·기사별 첫 저장 해제가 반영 전에 실패 |
| `slow` | 조회·변경 1,800ms 지연, 연속 입력·화면 이동 확인 |

[Goal 8 결과](../TODO/FE_GOAL_08_RESULT.md)와 원본 비교(과거 임시 산출물·현재 미보관; [Goal8 결과](../TODO/FE_GOAL_08_RESULT.md) 참조)는 기본 읽기 목록 구현 당시의 기록이다. 사용자 목록을 포함한 현재 동작은 아래 Goal 9 설명을 따른다.

## 라이브러리 목록 관리

라이브러리 → `새 목록`에서 생성하고 카드나 목록 상세의 `⋯`에서 이름 수정·삭제한다. 기사 북마크 옆 `⋯` → 목록 체크 → `완료`로 여러 목록에 저장한다. 사용자 목록에 이미 속한 기사는 북마크를 눌러도 이 시트가 열린다. 목록에서 기사를 읽고 뒤로 가면 원래 목록으로 돌아온다.

기본 읽기 목록은 이름 수정·삭제할 수 없고 소속 기사만 바꿀 수 있다. 북마크는 하나 이상의 목록에 속하면 선택된다. `이 목록에서 제거`나 목록 삭제는 해당 소속만 지우며 다른 목록·원문·좋아요는 보존한다. 기본 목록으로 자동 이전하지 않는다. 이 동작은 fixture 단계의 기본안이다.

이름은 제출 때 NFC·앞뒤/연속 공백을 정리하고 최대 60 Unicode 코드 포인트로 검증한다. 같은 사용자 안에서 대소문자를 무시한 중복과 기본 이름 `읽기 목록`은 거부한다. 입력 중 강제 정규화하지 않고 명시적인 버튼으로 제출한다. 제출 전 취소는 초안만 버린다. 요청 중 닫기는 진행 중 저장을 중단하지 않는다. 저장 대상 선택 취소는 기사 소속을 바꾸지 않지만 그 안에서 이미 생성 완료한 빈 목록은 유지한다.

사용자별 공유 저장소가 목록 ID별 쓰기를 직렬화하고 최신 목표만 유지한다. 실패한 목록은 확정 상태로 복원하고 같은 목표를 재시도한다. 여러 목록의 적용은 목록 간 트랜잭션이 아니므로 성공한 다른 목록은 유지한다. 삭제 기록으로 늦은 응답의 부활을 막는다. 앱 재실행·전체 새로고침 시 메모리 초기화 정책은 Goal 8과 같다. 사용자/공급부/인증 revision이 바뀌면 개인 폼·Library navigation을 정리하고 공개 홈·검색·기사는 유지한다.

`src/features/bookmarks/data/userListPreview.ts`의 `userListPreviewScenario`를 바꾸고 전체 새로고침하면 재현한다. 전달 시 `normal`이다.

| 값 | 사용자 목록 상태 |
| --- | --- |
| `normal` | 약 350ms 뒤 조회/변경 성공 |
| `lists-read-error` | 사용자별 첫 조회 실패·재시도 |
| `create-error` | 목록별 첫 생성 실패·입력 보존·같은 ID 재시도 |
| `rename-error` | 첫 이름 수정 실패·확정 이름 복구·재시도 |
| `delete-error` | 첫 삭제 실패·목록 복원·라이브러리 재시도 |
| `add-error` | 첫 기사 추가 실패·기존 소속 복구·재시도 |
| `list-remove-error` | 첫 기사 제거 실패·카드 복원·재시도 |
| `slow` | 약 1,800ms 지연·연속 선택·수정 중 삭제 확인 |

[Goal 9 결과](../TODO/FE_GOAL_09_RESULT.md)에 상태 소유자·취소/수명·삭제 경합·검증을 기록했다. 원본 비교(과거 임시 산출물·현재 미보관; [Goal9 결과](../TODO/FE_GOAL_09_RESULT.md) 참조)는 Medium PNG 11장과 실제 브라우저 화면을 연결한다. 이름 수정 폼은 원본 편집 캡처가 없는 자체 설계다. 공개 목록·공유·댓글·메모·다운로드·수동 순서는 포함하지 않았다. Goal 9 당시 제외한 로그인 UI는 아래 Goal 10에서 추가했다.

## 모의 로그인·취소·로그아웃

최초 상태는 비로그인이다. 기사 읽기·검색·설명 수준 선택은 자유롭게 사용하고, 좋아요·저장·라이브러리는 로그인 후 사용한다. **프로필 → 로그인** 또는 기사의 좋아요/북마크 → `예시 독자 A/B` → `Google로 로그인 (모의)`를 누른다. 실제 Google 계정·인증 코드는 필요 없다.

로그인 후 원래 화면으로 돌아가지만 좋아요·저장을 자동 실행하지 않는다. 직접 다시 눌러야 변경된다. `닫기` 또는 모의 공급자 취소는 오류 없이 이전 화면·데이터를 보존한다. 프로필의 `로그아웃`에서 확인·취소할 수 있고, 실패하면 로그인 상태를 유지하며 재시도할 수 있다.

로그인/로그아웃 창의 **모의 동작 선택 열기**에서 성공·실패·느린 성공(4초)을 고른다. 로그인에는 사용자 취소도 있다. 선택은 화면 재현용이며 실패 후 `다시 시도`는 정상 모의 응답을 요청한다. 처리 중 닫기/취소를 하면 뒤늦은 응답은 인증을 변경하지 않는다. 기본 정상 응답은 약 600ms다.

A(`example-reader`)와 B(`example-reader-b`)는 좋아요·저장·사용자 목록을 서로 공유하지 않는다. 로그아웃은 개인 데이터 삭제가 아니므로 같은 실행 중 A→B→A로 돌아오면 A 데이터를 이어 받는다. 진행 중 개인 변경도 원래 사용자 저장소에서만 완료된다. 열린 개인 상세·입력 초안·저장 시트는 사용자 전환 시 정리한다. 앱 재실행·전체 새로고침은 인증과 개인 메모리를 초기화한다. 기기/서버 영속 저장·데이터 병합은 없다.

Goal 10의 최소 프로필 화면은 아래 Goal 11에서 이름·소개 조회와 편집으로 확장했다. 설정과 기본 설명 수준은 아래 Goal 12에서 연결했다. [Goal 10 결과](../TODO/FE_GOAL_10_RESULT.md)와 원본 비교(과거 임시 산출물·현재 미보관; [Goal10 결과](../TODO/FE_GOAL_10_RESULT.md) 참조)에 설계·검증·미검증을 기록했다.

## 프로필 조회·수정

**프로필 → 로그인 → 예시 독자 A/B → 프로필 편집**에서 이름·소개를 저장한다. 저장한 이름은 프로필과 로그아웃 확인에 함께 반영된다. 계정 선택의 `예시 독자 A/B`는 고정된 모의 계정 표시다. 사용자 ID·인증 revision·좋아요·북마크·목록은 이름 변경으로 초기화하지 않는다.

이름은 필수 50자, 소개는 선택 160자이며 소개 삭제를 허용한다. 입력 중 원문을 유지하고 제출 때 NFC·공백을 정리한다. 코드 포인트 기준으로 한글·단일 이모지는 1자이며 조합형 이모지는 여러 자일 수 있다. 이름 중복을 허용한다. Enter는 저장하지 않고 명시적인 저장 버튼을 사용한다.

취소·닫기·화면 이탈은 미제출 초안을 버린다. 이미 제출한 저장은 계속된다. 저장 중 추가 입력은 이전 응답이 덮지 않고, 추가 저장의 마지막 목표를 직렬 처리한다. 실패한 열린 폼은 입력을 보존하고 수정 후 다시 시도할 수 있다. 로그아웃/A→B→A에서는 사용자별 확정 값을 유지하고 개인 편집 UI는 정리한다. 전체 새로고침·앱 재실행은 메모리를 초기화한다.

`src/features/profile/data/profilePreview.ts`의 `profilePreviewScenario`로 `read-error`·`save-error`·`slow`를 지정한 뒤 전체 새로고침하면 조회/저장 첫 실패·4초 처리를 재현한다. 재시도는 성공한다. 전달 기본값은 `normal`(약 350ms)이다. 실제 인증·Storage는 없다. [Goal 11 결과](../TODO/FE_GOAL_11_RESULT.md)와 원본 비교(과거 임시 산출물·현재 미보관; [Goal11 결과](../TODO/FE_GOAL_11_RESULT.md) 참조)에 정책·검증·미검증을 기록했다.

## 설정과 기본 설명 수준

**프로필 → 설정 → 기본 설명 수준 변경**에서 초등학생·중학생·고등학생·성인 중 선택하고 저장한다. 최초 A/B 기본값은 성인이다. 설정의 뒤로 버튼은 프로필로 돌아가며 기존 편집을 유지한다. 로그아웃 행은 기존 확인·취소·실패·재시도와 연결한다.

확정 기본값은 다음 기사 진입에 적용한다. 기사에서 직접 선택한 수준은 설정을 바꾸지 않는다. 기사에서 나간 뒤 같은 기사를 새로 열면 최신 기본값을 적용하고, 기존 기사 인스턴스로 뒤로 복귀하면 임시 선택을 유지한다. 설정 조회 중에는 성인으로 읽되 첫 성공 값을 한 번 적용하며, 직접 수준을 선택했다면 늦은 조회는 덮어쓰지 않는다. 본문 로딩 중에도 진입 시 확정한 수준을 유지한다.

설정은 사용자 ID별 앱 메모리에 보관한다. 이름 변경·설정 저장은 인증 revision이나 개인 데이터/navigation을 초기화하지 않는다. 로그아웃·A→B→A·같은 A 재로그인은 확정 데이터를 유지하고 개인 화면·초안을 정리한다. 앱 재실행·전체 새로고침은 초기화한다. 비로그인은 개인 설정을 조회/변경하지 않고 성인 기본 읽기와 기사 내 수준 전환을 사용한다.

취소·닫기·뒤로·탭 이탈은 미제출 선택만 버리며 제출한 저장은 계속된다. 저장 중 추가 선택/제출을 허용하고 마지막 제출을 직렬 처리한다. 실패하면 편집 선택을 보존하고 수정한 선택으로 재시도한다.

`src/features/settings/data/settingsPreview.ts`의 `settingsPreviewScenario`를 `read-error`·`save-error`·`slow`로 바꾸고 전체 새로고침하면 최초 조회/저장 실패와 각 4초 처리를 재현한다. 전달 기본값은 `normal`(약 350ms)이다. 재현 뒤 normal로 복원한다. [Goal 12 결과](../TODO/FE_GOAL_12_RESULT.md)와 원본 비교(과거 임시 산출물·현재 미보관; [Goal12 결과](../TODO/FE_GOAL_12_RESULT.md) 참조)에 정책·검증·미검증을 기록했다.

## Goal 13 전체 흐름 검증

홈·검색→기사→설명 수준→로그인→좋아요·저장→목록 관리→프로필→설정→로그아웃→A/B/A를 8081에서 실제 조작했다. 이름 수정 요청 뒤 대기 중인 기사 추가의 북마크 처리 중 표시, 320px 홈 썸네일 겹침, 정렬 탭 잘림을 수정했다. 인증·사용자별 메모리 저장 정책은 유지한다.

- 현재 실행 결과: 타입·lint 통과, 전체 테스트 608건(304개 × iOS/Android, 80 suites). React Navigation 자체를 mock하지 않은 통합 테스트를 포함한다.
- iOS·Android JS/Hermes 번들 생성 성공. 브라우저 검증 19묶음, 최종 캡처 64장과 수정 전 2장, Medium 원본 15장 비교. 실제 네이티브 실행·빌드와 구분한다.
- [최종 확인 순서와 검증 결과](../TODO/FE_GOAL_13_RESULT.md#8081-최종-확인-순서) · 원본/구현 비교(과거 임시 산출물·현재 미보관; [Goal13 결과](../TODO/FE_GOAL_13_RESULT.md) 참조) · 전체 검사 로그(과거 임시 산출물·현재 미보관; [Goal13 결과](../TODO/FE_GOAL_13_RESULT.md) 참조).
- 장애용 `*Preview.ts`는 모두 `normal`로 복원했다. localhost:8081 서버를 유지했다. 검증 후 별도 사용자 요청에 따라 Goal 13 산출물을 로컬 커밋으로 기록하며 원격 push·배포는 하지 않는다.

## 검증 범위와 남은 확인

- 사용자 확인: 현재 사용할 수 있는 휴대폰이 없다.
- Goal 13 최종 검사 환경: macOS 14.2 arm64, Node 24.10.0·npm 11.6.0으로 검사했다. 위 고정 도구 버전과 차이를 기록하며 패키지·lockfile은 변경하지 않았다. Xcode 대신 Command Line Tools만 있고 `xcrun simctl`·`xcodebuild`를 사용할 수 없다. Android SDK·adb·에뮬레이터도 발견하지 못했다.
- 실제 기기·시뮬레이터 실행, 네이티브 화면 캡처와 원본 비교, 네이티브 빌드·설치·출시는 미검증이다. Goal 6~13의 브라우저 모바일 폭 비교와 구분한다.
- 보관된 Medium iOS 홈·기사 상세·검색·저장·라이브러리·목록 상세·기사 제거 캡처를 참고했다. 4단계 설명과 단일 좋아요는 우리 앱의 기본안이다. 목록 관리는 Goal 9, 모의 로그인은 Goal 10에서 구현했다. 프로필 편집은 Goal 11, 설정과 기본 설명 수준은 Goal 12에서 구현했다. Medium 원본의 탭 의미·글·이미지를 그대로 사용한 것은 아니다.
- 실제 인증·API·DB·Storage·RSS·AI 호출은 구현하지 않았다.

현재 구현과 검증은 [Goal 13 결과 기록](../TODO/FE_GOAL_13_RESULT.md)을 따른다. 이전 이력은 [Goal 1](../TODO/FE_GOAL_01_RESULT.md)·[Goal 2](../TODO/FE_GOAL_02_RESULT.md)·[Goal 3](../TODO/FE_GOAL_03_RESULT.md)·[Goal 4](../TODO/FE_GOAL_04_RESULT.md)·[Goal 5](../TODO/FE_GOAL_05_RESULT.md)·[Goal 6](../TODO/FE_GOAL_06_RESULT.md)·[Goal 7](../TODO/FE_GOAL_07_RESULT.md)·[Goal 8](../TODO/FE_GOAL_08_RESULT.md)·[Goal 9](../TODO/FE_GOAL_09_RESULT.md)·[Goal 10](../TODO/FE_GOAL_10_RESULT.md)·[Goal 11](../TODO/FE_GOAL_11_RESULT.md)·[Goal 12](../TODO/FE_GOAL_12_RESULT.md)에 보존한다. 후속 개발은 별도 요청 없이 시작하지 않는다. Goal 4 당시 npm audit는 67건(높음 65·보통 2)을 보고했으며 미해결이다. Goal 5~13에서 의존성·lockfile은 변경하지 않았고 audit를 재실행하지 않았다.

## 적용 규칙

[AGENT](../AGENT/README.md), [React Native 규칙](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/README.md), [검증 규칙](../AGENT/SOFTWARE_AGENT/COMMON/QUALITY_AND_WORKFLOW.md), [FE Goal 계획](../TODO/FE_GOALS.md)을 따른다.

기본 프로젝트는 `create-expo-app@5.0.0`과 `expo-template-blank-typescript@57.0.35`에서 시작했다. 템플릿의 Expo 라이선스와 초기 이미지 파일은 보존했다. 현재 앱은 해당 이미지를 참조하지 않는다.

- Medium clone Goal 17: 기사/저장 시트 구현과 두 검토, 관련 84 tests 및 8081 검증 완료. 폰트·아이콘 차이/native 대기. [결과](../TODO/FE_GOAL_17_RESULT.md). 연속 Goal 18 진행; 15 이후 미커밋.

- Medium clone Goal 18: 라이브러리/목록 UI·로컬 설명/Private·두 검토·관련 자동/브라우저 검증 완료. 원본 차이와 native 대기는 TODO/FE_GOAL_18_RESULT.md 참조. 연속 Goal 19 진행; 15 이후 미커밋.

- Medium clone Goal 19: 소개/모의 인증/로그아웃 UI와 두 검토·관련 자동/브라우저 검증 완료. TODO/FE_GOAL_19_RESULT.md 참조. 연속 Goal20 진행, 원본 차이/native 대기, 미커밋.

## Goal21 최종 화면 기준

기능별 이전 기록의 한국어 화면 이름/초기 카드 구성은 Goal1~13 이력이며, 현재 UI는 원본 영어 문구와 자체 읽기 도구/모의 안내를 구분한다. [화면 대응표](../TODO/FE_MEDIUM_SCREEN_MAP.md)·[검증/남은 차이/실행 순서](../TODO/FE_GOAL_21_RESULT.md)를 우선 확인한다.

## 2026-11-19 소프트웨어 규칙 검토 보완

FRONT_AGENT·UXUI_AGENT 검토에서 발견한 조회 수명, 검색 뒤로 가기, 테스트 시간 제어, 동적 목록 가상화와 공개 Props 타입을 보완했다.

- 기사·설명·검색 hook은 조회 조건 또는 공급부가 바뀌는 렌더부터 이전 결과와 오류를 버린다. A→B→A로 복귀해도 마지막 요청의 로딩에서 시작하며, 이전 요청의 늦은 성공·실패는 반영하지 않는다. 검색의 재시도 이력도 새 조건으로 넘어가지 않아 새 검색어는 다시 250ms debounce를 적용한다.
- `SearchRouteScreen`이 navigation 포커스를 전달하고 `SearchScreen`은 포커스가 있는 검색 화면에서만 뒤로 이벤트를 소비한다. 첫 뒤로 가기는 화면 내 뒤로 버튼처럼 검색어를 지우고 탐색 첫 화면을 연다. 이후는 탭 이력과 OS에 맡긴다. 기사 상세·다른 탭에서는 구독을 해제하고 검색어·결과를 보존한다.
- 프로필의 Lists는 헤더·목록·하단 안내를 하나의 `FlatList`로 표시한다. 저장 대상 선택 시트도 자체 `FlatList`를 사용하며, `LibrarySheet`의 `contentMode: 'list'`에서는 바깥 `ScrollView`를 만들지 않는다. 목록 ID를 key로 쓰고 미제출 선택은 시트가 소유해 행의 수명과 분리한다.
- 공개 컴포넌트 21곳의 인라인 props 타입을 `컴포넌트명Props`로 분리했다. 사용자별 공유 저장소와 source 계약은 유지한다.
- 목록 관리 통합 테스트에 fake timer를 적용했다. Jest의 기본 5초 제한을 늘리지 않고 실제 navigator와 provider를 거쳐 기존 시나리오를 검증한다.

Windows·Node 24.18.0·npm 10.9.0에서 검증했다. 재검토의 최종 `npm.cmd run check`는 타입 검사·lint와 iOS·Android 설정의 90 suites·662건이 모두 통과했다. Jest 실행 시간은 399.268초이며 이전의 테스트 시간 초과와 `VirtualizedList`의 act 경고는 재발하지 않았다. 앞선 수정에서 최종 실행 코드의 `npm.cmd run export:android`와 `npm.cmd run export:ios`도 성공했다. 이는 JS/Hermes 번들 검사이며, 이번 재검토에서는 실행 코드를 바꾸지 않아 번들 검사를 반복하지 않았다. 코드와 테스트는 자체 검토했으며 별도의 독립 리뷰는 수행하지 않았다.

Edge headless 브라우저에서 320×844·390×844·1440×844 폭으로 프로필과 저장 시트를 확인했다. 사용자 목록 80개를 UI로 만들고 프로필에서 마지막 목록까지 이동·열기를 확인했으며, 상단에서 사용자 목록 카드 31개가 마운트된 것을 관찰했다. 저장 시트는 목록 30개의 처음·끝 선택 유지, 저장 후 재진입, 취소 시 초안 폐기를 확인했다. 두 브라우저 실행에서 수집한 JavaScript·콘솔 오류는 0건이다. 이 관찰을 native 성능 수치로 해석하지 않는다.

로컬 Medium 원본 `sc_64afef71457f48808c33def66fd6d90e`와 `sc_31edfd53d2874259a6ed5ecbc756d10b`를 열어 프로필 헤더·목록 카드와 저장 시트의 선택 행·완료 버튼 구성을 대조했다. 자체 모의 사용자·기사·추가 목록은 원본과 다른 데이터이며, 이번 변경은 기존 표현을 유지하면서 스크롤 구조를 조정한 것이다. 전체 화면의 시각적 동일성 완료 판정은 아니다.

실제 iOS·Android 기기의 뒤로 제스처, 키보드, 스크린리더, Safe Area와 native 빌드·설치는 미검증이다. 기존 mock 단계에서의 구현·자동 검사·브라우저 확인과 구분하며, 패키지·ENV·외부 서비스는 변경하지 않았다.

같은 날 재검토에서 수정 코드와 회귀 테스트를 다시 대조했다. 실행 코드 119개 파일의 정적 검사에서 기능→app·shared→기능의 의존성 위반, 실행 import 순환, 인라인 공개 Props, `any`·non-null assertion·`as unknown as`는 발견되지 않았다. 조회 수명·포커스별 뒤로 구독·가상화 목록의 선택 소유권을 자체 검토했으며 추가 코드 수정 사항은 발견하지 않았다.

재검토에서도 Edge headless로 위의 80개 프로필 목록·30개 저장 대상 목록 흐름을 320×844·390×844·1440×844에서 다시 실행해 통과했고 JavaScript·콘솔 오류는 0건이었다. 새 보고서와 캡처는 `%TEMP%\kostolany-fe-review-b6506a4f4f2343eb9ea4f92524c3b1a2`의 `browser-report.json`, `sheet-report.json`, PNG 파일에 보관했다. 기존 8081 Expo 서버를 유지했으며 HTTP 200 응답과 실제 화면 조작을 확인했다.
