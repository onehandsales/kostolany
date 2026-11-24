# 화면별 원본 요구사항

**Parity20 현재 결과:** [글 통계·날짜 선택·미집계와 현재 검사](../FE_MEDIUM_PARITY_20_RESULT.md). V34의3화면·15 R/3 T/4 U/15 C를 대조하고 웹 그래프/포커스·부분집계 안내·원형 범례를 보완했다. 실제8081 고정 UTC snapshot 부분 비교·자동 검사·원본/시각/native 잔여를 구분한다.9~19 잔여는 기존 담당에 유지한다. 승인 조건 충족 후20 로컬 커밋으로16~20 연속 작업 종료;21·22/push/배포 제외. 아래는 각 당시 이력이다.

**Parity19 현재 결과:** [멤버십 확정·source 수명·포커스와 현재 검사](../FE_MEDIUM_PARITY_19_RESULT.md). V31의5화면·24 R/6 T/7 U/15 C를 대조하고 모의 확정 검증·이전 자격 무효화·성공 배경/완료 스크롤을 보완했다. 실제8081 부분 비교·자동 검사·원본/시각/native 잔여를 구분하며9~18 잔여는 기존 담당에 유지한다. 승인 조건 충족 후19 로컬 커밋→20 진행; push/배포/21·22 제외. 아래는 각 당시 이력이다.

**Parity18 현재 결과:** [시작·설정·아이콘과 현재 검사](../FE_MEDIUM_PARITY_18_RESULT.md). D10/V33의5화면·60 R/9 T/11 U/16 C를 대조하고 시작 대체 자산/설정·아이콘 늦은 안내/큰 글자·Email 행을 보완했다. 두 차례 자기 검토·실제8081 부분 비교·최종 자동 검사와 원본/native 잔여를 구분한다.9~17 잔여 기존 담당 유지. 사용자 승인 조건 충족 후18 로컬 커밋→19 진행; push/배포/21·22 제외. 아래 진행 상태는 당시 이력이다.

**Parity17 검토(2026-11-24):** [18 S/139 R/31 T/33 U/21 C의 실제 결과·자체 정책·잔여](../FE_MEDIUM_PARITY_17_RESULT.md). 알림 점/빈 Featured·개인 정책 실패·공개 목록 접근/이탈을 대조했다. 원본18 PNG 직접 열람, 실제8081 메모리 비교이며 캡처 파일/도구 생성 없음.33 U·원본/자산/시각/native 및9~16 잔여 유지. 원본 요구·ID·과거 evidence/readiness를 승격하지 않는다.

**Parity16 수동 검토:** [4 S/43 R·4 T·7 U·19 C의 처리·현재 검사·잔여](../FE_MEDIUM_PARITY_16_RESULT.md#scope). 기존 원본 관찰·ID·과거 증거·readiness는 보존한다. 실제8081 부분 비교와 원본 자산/시각·OS/native 대기를 구분하며 tools 생성기를 실행하지 않았다.

**Parity14 커밋 전 추가 검토(2026-11-24):** [재검토·현재 검사·커밋 범위](../FE_MEDIUM_PARITY_14_RESULT.md#pre-commit-review). 추가 코드 결함 없이 타입/lint·관련12 suites/82 tests를 새로 통과했고 이번 act 경고0이다. 앞선 전체1722건 이후 코드 변경·552개 codeInputs 해시 불일치0. 사용자 요청에 따라36파일 로컬 커밋 범위를 확정했다. 원본/시각·S043/native 및9~13 잔여는 유지하며 push·배포·15 구현은 하지 않는다. 아래 미커밋 기록은 최초 실행 이력이다.

**Parity14 최초 구현·검증(2026-11-24):** [구현·이번 검사·원본 차이·담당](../FE_MEDIUM_PARITY_14_RESULT.md). V29/V30의16화면·99 R·19 T/U/C를 대조하고 이메일 약관/수명·추천 카탈로그/조회·온보딩 뒤로/source 경계를 보완했다. 타입/lint·최종 전체316 suites/1722 tests 통과, 이번 act 경고0. 실제8081 부분 대조와 자동 검증을 구분하며 S043은18/21, 원본 자산/시각/OS 대기는14 및 관련 담당에 유지한다.9~13의 잔여 이전·전체 종료 승인은 아니다. 커밋·push·배포·15 진행 없음.

[검토 요약](../FE_MEDIUM_PARITY_AUDIT.md) · [보완 작업](../FE_MEDIUM_PARITY_BACKLOG.md) · [계약 원문](CONTRACTS.md) · [흐름 맥락](FLOWS.md) · [미확인 항목](UNKNOWN.md)

이번 목록은 원본에서 추출한 **관찰 요구사항**이다. L=배치, D=표시값/입력, S=상태, C=컨트롤, V=PNG 추가 세부 관찰이다. L/D/S는 원문 한 문장의 모든 요소를 포함하는 묶음이며 단일 버튼 수가 아니다. C는 명시적으로 나눈 조작점이다. 이 숫자를 기능 완성률의 분모로 사용하지 않는다.

`포함`은 기능 작업 범위에 있다는 판정이며 현재 FE 동일 재현 완료라는 뜻이 아니다. `일부 포함`은 공통/상위 계약은 있지만 개별 조건이 분산된 경우다. 코드 링크는 구현 조사 위치이며 자동으로 해당 요구의 통과를 증명하지 않는다. 과거 Goal53 판정은 당시 증거이고 현재 재촬영 결과가 아니다. 모든 행의 완료 조건은 해당 원본 PNG의 데이터·상태를 맞춘 비교와 FLOWS의 진입/복귀 검증을 함께 적용한다.


<a id="s151"></a>

## S151 — 추천 토픽 팔로우 상태

안정 원본 ID: `sc_c7deda6b53824957b587bd922cd55399` · [원본 분석](<../../medium/flows/Home/Refine recommendations/Filtering suggestions/ANALYSIS.md>):146 · [원본 PNG](<../../medium/flows/Home/Refine recommendations/Filtering suggestions/screens/04_sc_c7deda6b53824957b587bd922cd55399.png>)

흐름 맥락: [F13/04](FLOWS.md#f13)

FE 조사 경로: [RefineRecommendationsScreen.tsx](<../../FE/src/features/recommendations/RefineRecommendationsScreen.tsx>)

기본 담당: [G31](CONTRACTS.md#g31) · 실행 작업: [V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11)

**화면별 수용 조건:** 네 탭, All/Writers/Publications/Topics, 빈 Following, 종류별 count/See all, Follow/Following, See more suggestions를 개별 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Topics추천5행/Following/Seemore 실제연결. 전체도메인관계동기화 유지, 행간/폰트차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):345)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Follow, Following, See more suggestions

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s151-l"></a>`R-S151-L` | 배치: Topics to follow 목록과 추가 추천 링크 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s151-d"></a>`R-S151-D` | 표시값·입력: Self Improvement·Writing·Relationships는 Following | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s151-s"></a>`R-S151-S` | 상태: 일부 팔로우 반영 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s151-c01"></a>`R-S151-C01` | 컨트롤: Follow | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s151-c02"></a>`R-S151-C02` | 컨트롤: Following | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s151-c03"></a>`R-S151-C03` | 컨트롤: See more suggestions | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S151](UNKNOWN.md#u-s151)

<a id="s152"></a>

## S152 — 작가 음소거 안내

안정 원본 ID: `sc_c8b24e7669734e74922bee69b751350b` · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/Muting an author/ANALYSIS.md>):114 · [원본 PNG](<../../medium/flows/Home/Story detail/Author detail/Muting an author/screens/03_sc_c8b24e7669734e74922bee69b751350b.png>)

흐름 맥락: [F22/03](FLOWS.md#f22)

FE 조사 경로: [ModerationDialogs.tsx](<../../FE/src/features/moderation/ModerationDialogs.tsx>), [articleModeration.ts](<../../FE/src/features/moderation/articleModeration.ts>)

기본 담당: [G29](CONTRACTS.md#g29) · 실행 작업: [V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15)

**화면별 수용 조건:** 메뉴 순서·파랑/빨강·Cancel, 성공 토스트, 신고 radio와 Also block checkbox, 사유 전후 Report 상태를 비교한다. 차단 후 원본 카드 잔존과 자체 접근 제한의 충돌을 기록한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Mute확정안내. 현재앞서Unfollow한상태라원본Following과다름; Mute가관계를임의변경하지않음. ([과거 기록](<../FE_GOAL_53_RESULT.md>):346)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Following, 더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s152-l"></a>`R-S152-L` | 배치: Author muted 토스트, Following 버튼 유지 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G29](CONTRACTS.md#g29), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s152-d"></a>`R-S152-D` | 표시값·입력: 기사 목록 계속 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G29](CONTRACTS.md#g29), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s152-s"></a>`R-S152-S` | 상태: 음소거 성공 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G29](CONTRACTS.md#g29), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s152-c01"></a>`R-S152-C01` | 컨트롤: Following | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28), [G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s152-c02"></a>`R-S152-C02` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S152](UNKNOWN.md#u-s152)

<a id="s153"></a>

## S153 — 통계 그래프 날짜 선택

**Parity20 실제 검토:** [전체 배정 R/T/U/C·고정 snapshot 비교·차이와 검증](../FE_MEDIUM_PARITY_20_RESULT.md#scope). 원본 관찰과 자체 mock/미집계 정책을 분리하며 readiness는 유지한다.

안정 원본 ID: `sc_c8fa56a2dd5b4e959c333ea3e6d334e2` · [원본 분석](<../../medium/flows/Profile/Story stats/ANALYSIS.md>):117 · [원본 PNG](<../../medium/flows/Profile/Story stats/screens/03_sc_c8fa56a2dd5b4e959c333ea3e6d334e2.png>)

흐름 맥락: [F63/03](FLOWS.md#f63)

FE 조사 경로: [StoryStatsScreen.tsx](<../../FE/src/features/story-stats/StoryStatsScreen.tsx>)

기본 담당: [G43](CONTRACTS.md#g43) · 실행 작업: [V34](../FE_MEDIUM_PARITY_BACKLOG.md#v34)

**화면별 수용 조건:** Monthly 기간UTC/Updated daily, 11/2·그래프 축/범례/색/면·날짜선·점, Lifetime Latest/글0/0을 독립 비교 fixture로 확인한다. 원본 집계 모순을 운영 계산식으로 만들지 않는다. Lifetime 자체의 시작일–Today·Updated daily와 글의23 hours ago도 별도로 비교한다. 현재 코드에 이 분기가 있다는 사실을 새 실행 통과로 표시하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. June12 날짜 선택선·강조점·11/2 수치와 기간 대조. 원본 비교용 fixture이며 실제 분석 이벤트 아님. 글꼴·강조점/범례 원형 표현 차이. 별도June2025 비교 fixture11/2·Lifetime0/0; 정상F63와 구분. ([과거 기록](<../FE_GOAL_53_RESULT.md>):347)

**이전 기준 작성 당시 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 그래프 지점, 월 선택

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s153-l"></a>`R-S153-L` | 배치: 그래프에 수직선·두 지점 강조 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G43](CONTRACTS.md#g43), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V34](../FE_MEDIUM_PARITY_BACKLOG.md#v34) |
| <a id="r-s153-d"></a>`R-S153-D` | 표시값·입력: Jun 12 2025, Views11·Reads2 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G43](CONTRACTS.md#g43), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V34](../FE_MEDIUM_PARITY_BACKLOG.md#v34) |
| <a id="r-s153-s"></a>`R-S153-S` | 상태: 특정 날짜 선택 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G43](CONTRACTS.md#g43), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V34](../FE_MEDIUM_PARITY_BACKLOG.md#v34) |
| <a id="r-s153-c01"></a>`R-S153-C01` | 컨트롤: 그래프 지점 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G43](CONTRACTS.md#g43) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V34](../FE_MEDIUM_PARITY_BACKLOG.md#v34) |
| <a id="r-s153-c02"></a>`R-S153-C02` | 컨트롤: 월 선택 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G43](CONTRACTS.md#g43) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V34](../FE_MEDIUM_PARITY_BACKLOG.md#v34) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S153](UNKNOWN.md#u-s153)

<a id="s154"></a>

## S154 — 언어별 음성 목록 스크롤
- **Parity12 최신:** [요구별 상태·검사·잔여](../FE_MEDIUM_PARITY_12_RESULT.md#screen-status). 기존6그룹15음성 대조. 화면 밖 목록·번역 미확인, 실제 스크롤/키보드 대기. 원본 관찰/기존 증거는 보존하며 새 실제 렌더 비교 완료가 아니다.


안정 원본 ID: `sc_ca2321d6dc9142e5a97e2734260c2b0f` · [원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>):149 · [원본 PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/04_sc_ca2321d6dc9142e5a97e2734260c2b0f.png>)

흐름 맥락: [F28/04](FLOWS.md#f28)

FE 조사 경로: [ListeningSpeedPanel.tsx](<../../FE/src/features/listening/ListeningSpeedPanel.tsx>), [ListeningVoicePanel.tsx](<../../FE/src/features/listening/ListeningVoicePanel.tsx>)

기본 담당: [G46](CONTRACTS.md#g46) · 실행 작업: [V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19)

**화면별 수용 조건:** 세로 slider·1x/200 WPM·2.5x/490 WPM·145% 문구, voice 언어 section/국기/성별/나라/선택색, Emma→Hans와 Done, 더보기6행을 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. German 이후 동일 후보. 스크롤 시작점 약20px 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):348)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 음성 행, Done

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s154-l"></a>`R-S154-L` | 배치: GERMAN·ITALIAN·KOREAN·PORTUGUESE 섹션 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G46](CONTRACTS.md#g46), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s154-d"></a>`R-S154-D` | 표시값·입력: 한국어 Seoyeon 등 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G46](CONTRACTS.md#g46), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s154-s"></a>`R-S154-S` | 상태: 다국어 음성 선택지 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G46](CONTRACTS.md#g46), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s154-c01"></a>`R-S154-C01` | 컨트롤: 음성 행 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G46](CONTRACTS.md#g46) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s154-c02"></a>`R-S154-C02` | 컨트롤: Done | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G46](CONTRACTS.md#g46) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S154](UNKNOWN.md#u-s154)

<a id="s155"></a>

## S155 — 리스트 이름 입력

- Parity 7 최신 검토: [저장·목록·메모·순서 결과](../FE_MEDIUM_PARITY_07_RESULT.md). 기능/브라우저·원본 차이·미확인/native를 분리한다. 아래 초기 판정은 감사 당시 이력이다.

안정 원본 ID: `sc_ca3b32e4373a40fc84405838671eab27` · [원본 분석](<../../medium/flows/Library/Creating a list/ANALYSIS.md>):116 · [원본 PNG](<../../medium/flows/Library/Creating a list/screens/03_sc_ca3b32e4373a40fc84405838671eab27.png>)

흐름 맥락: [F42/03](FLOWS.md#f42)

FE 조사 경로: [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>)

기본 담당: [G33](CONTRACTS.md#g33) · 실행 작업: [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25)

**화면별 수용 조건:** 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. About mindfulness17자/Public 선택 일치. 글꼴·토글 색/높이 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):349)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Create 활성, Cancel

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s155-l"></a>`R-S155-L` | 배치: 동일 생성 폼 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s155-d"></a>`R-S155-D` | 표시값·입력: About mindfulness 17/60, 설명 없음, Private 꺼짐 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s155-s"></a>`R-S155-S` | 상태: 이름만 입력해 생성 가능 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s155-c01"></a>`R-S155-C01` | 컨트롤: Create 활성 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s155-c02"></a>`R-S155-C02` | 컨트롤: Cancel | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S155](UNKNOWN.md#u-s155)

<a id="s156"></a>

## S156 — 프로필 사진 소스 선택

- Parity15 현재 검토: [화면별 결과·R/T/U/C](../FE_MEDIUM_PARITY_15_RESULT.md#scope). 기능/실제8081 부분 대조와 원본 시각·동일 fixture·native 대기를 구분한다. 아래 원본 관찰과 최초 감사 이력은 유지한다.

안정 원본 ID: `sc_cba29e82e4364a239d3e5423213fa670` · [원본 분석](<../../medium/flows/Profile/Editing profile information/ANALYSIS.md>):121 · [원본 PNG](<../../medium/flows/Profile/Editing profile information/screens/03_sc_cba29e82e4364a239d3e5423213fa670.png>)

흐름 맥락: [F57/03](FLOWS.md#f57)

FE 조사 경로: [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>)

기본 담당: [G42](CONTRACTS.md#g42) · 실행 작업: [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32)

**화면별 수용 조건:** Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Camera/Choosefromlibrary/Cancel시트 실제adapters연결. OSnative실행은 대기, 시트여백·서체 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):350)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Camera, Choose from library, Cancel

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s156-l"></a>`R-S156-L` | 배치: 편집 폼 위 하단 액션 시트 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s156-d"></a>`R-S156-D` | 표시값·입력: 기존 폼 유지 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s156-s"></a>`R-S156-S` | 상태: 사진 추가 방식 선택 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s156-c01"></a>`R-S156-C01` | 컨트롤: Camera | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42), [G52](CONTRACTS.md#g52) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s156-c02"></a>`R-S156-C02` | 컨트롤: Choose from library | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42), [G52](CONTRACTS.md#g52) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s156-c03"></a>`R-S156-C03` | 컨트롤: Cancel | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S156](UNKNOWN.md#u-s156)

<a id="s157"></a>

## S157 — 항목 순서 변경

- Parity 7 최신 검토: [저장·목록·메모·순서 결과](../FE_MEDIUM_PARITY_07_RESULT.md). 기능/브라우저·원본 차이·미확인/native를 분리한다. 아래 초기 판정은 감사 당시 이력이다.

안정 원본 ID: `sc_cdf564e8e6a144389299ff49a7d626ce` · [원본 분석](<../../medium/flows/Library/List detail/Reordering items/ANALYSIS.md>):148 · [원본 PNG](<../../medium/flows/Library/List detail/Reordering items/screens/04_sc_cdf564e8e6a144389299ff49a7d626ce.png>)

흐름 맥락: [F51/04](FLOWS.md#f51)

FE 조사 경로: [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>)

기본 담당: [G33](CONTRACTS.md#g33) · 실행 작업: [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25)

**화면별 수용 조건:** 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 동일 순서로 실제 변경. 웹 위/아래 조작은 native drag재현 아님; footer/modal/손잡이 자산 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):351)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Cancel, Done

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s157-l"></a>`R-S157-L` | 배치: 4행의 위치 변경 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s157-d"></a>`R-S157-D` | 표시값·입력: How Useful… → Mind Fullness or Emptiness? → Mind-Fullness → The Chimichurri… | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s157-s"></a>`R-S157-S` | 상태: 저장 전 새 순서 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s157-c01"></a>`R-S157-C01` | 컨트롤: Cancel | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s157-c02"></a>`R-S157-C02` | 컨트롤: Done | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S157](UNKNOWN.md#u-s157)

<a id="s158"></a>

## S158 — 기사 응답 입력

- **Parity10 판정:** 빈값/문자5000 제한·전송·중복 보호 유지. 명시적 작성 진입만 포커스 요청. 832 초기 비교 조건 분리. [이번 코드/검사·한계](../FE_MEDIUM_PARITY_10_RESULT.md#screen-status). 원본·과거 판정은 아래에 보존한다.

안정 원본 ID: `sc_cebfd0ad696f4e20a1c7d99da1dc1cef` · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Commenting a story/ANALYSIS.md>):85 · [원본 PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/screens/02_sc_cebfd0ad696f4e20a1c7d99da1dc1cef.png>)

흐름 맥락: [F31/02](FLOWS.md#f31)

FE 조사 경로: [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>)

기본 담당: [G26](CONTRACTS.md#g26) · 실행 작업: [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20)

**화면별 수용 조건:** 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 작성 초안/활성 제출, OS키보드는 미검증. ([과거 기록](<../FE_GOAL_53_RESULT.md>):352)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 상향 전송 버튼

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s158-l"></a>`R-S158-L` | 배치: 시트 하단 작성창과 키보드 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s158-d"></a>`R-S158-D` | 표시값·입력: Loved this kind of story 입력, Responses 832 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s158-s"></a>`R-S158-S` | 상태: 응답 제출 전 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s158-c01"></a>`R-S158-C01` | 컨트롤: 상향 전송 버튼 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S158](UNKNOWN.md#u-s158)

<a id="s159"></a>

## S159 — 멤버 가입 완료 화면

안정 원본 ID: `sc_cf306e89e43144029ce108cb5338132a` · [원본 분석](<../../medium/flows/Onboarding/Subscribing to Medium/ANALYSIS.md>):179 · [원본 PNG](<../../medium/flows/Onboarding/Subscribing to Medium/screens/05_sc_cf306e89e43144029ce108cb5338132a.png>)

흐름 맥락: [F54/05](FLOWS.md#f54)

FE 조사 경로: [MembershipSheet.tsx](<../../FE/src/features/membership/MembershipSheet.tsx>)

기본 담당: [G48](CONTRACTS.md#g48) · 실행 작업: [V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31)

**화면별 수용 조건:** 월/년 선택, SGD 가격·Save up to $39·혜택·Friend 카드, loading 덮개, 성공 팝업 OK와Start reading을 비교한다. 실제 구매 완료로 표시하지 않는다. Q12에서 모의 결제 안내의 노출·배치 차이를 함께 판정한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Member확정 환영/Start reading 복귀. mock문구/대체serif와 위치·48터치 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):353)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Thanks for becoming a Medium member, Start reading

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s159-l"></a>`R-S159-L` | 배치: 흰 배경 중앙 감사 문구와 단일 버튼 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G48](CONTRACTS.md#g48), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="r-s159-d"></a>`R-S159-D` | 표시값·입력: 입력 없음 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G48](CONTRACTS.md#g48), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="r-s159-s"></a>`R-S159-S` | 상태: 멤버십 완료 안내 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G48](CONTRACTS.md#g48), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="r-s159-c01"></a>`R-S159-C01` | 컨트롤: Start reading | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G48](CONTRACTS.md#g48) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S159](UNKNOWN.md#u-s159)

<a id="s160"></a>

## S160 — 재생 진행 상태
- **Parity12 최신:** [요구별 상태·검사·잔여](../FE_MEDIUM_PARITY_12_RESULT.md#screen-status). 280/40/1 독립 입력과 이동 경계 검증.40초 원본 자연 경과/seek 구분 미확인. 원본 관찰/기존 증거는 보존하며 새 실제 렌더 비교 완료가 아니다.


안정 원본 ID: `sc_d035c7d2bcfe4d0f99df80fddecebdcd` · [원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/ANALYSIS.md>):178 · [원본 PNG](<../../medium/flows/Home/Story detail/Listening to a story/screens/05_sc_d035c7d2bcfe4d0f99df80fddecebdcd.png>)

흐름 맥락: [F26/05](FLOWS.md#f26)

FE 조사 경로: [ListeningPlayer.tsx](<../../FE/src/features/listening/ListeningPlayer.tsx>)

기본 담당: [G45](CONTRACTS.md#g45) · 실행 작업: [V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18)

**화면별 수용 조건:** 준비 중 두 spinner, mini/expanded 동일 기사, 커버·배경·시간·진행선·10초/30초·희미한 이전/다음·닫기·Speechify 표시를 비교한다. 무음 timer는 실제 재생과 구분한다. Q12에서 미니/확장 플레이어의 모의 안내가 원본 배치에 미치는 영향을 판정한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 30초 이동 실제 조작. 원본40초를 조작 없이 고정하지 않음. ([과거 기록](<../FE_GOAL_53_RESULT.md>):354)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 일시정지·10초·30초·속도

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s160-l"></a>`R-S160-L` | 배치: 확장 플레이어 진행 바 이동 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G45](CONTRACTS.md#g45), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s160-d"></a>`R-S160-D` | 표시값·입력: 00:40, -04:00, 1x | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G45](CONTRACTS.md#g45), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s160-s"></a>`R-S160-S` | 상태: 재생 위치 증가 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G45](CONTRACTS.md#g45), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s160-c01"></a>`R-S160-C01` | 컨트롤: 접기 손잡이 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s160-c02"></a>`R-S160-C02` | 컨트롤: 진행 바 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s160-c03"></a>`R-S160-C03` | 컨트롤: 일시정지 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s160-c04"></a>`R-S160-C04` | 컨트롤: 10초 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s160-c05"></a>`R-S160-C05` | 컨트롤: 30초 앞으로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s160-c06"></a>`R-S160-C06` | 컨트롤: 이전 트랙(연한 표시) | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s160-c07"></a>`R-S160-C07` | 컨트롤: 다음 트랙(연한 표시) | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s160-c08"></a>`R-S160-C08` | 컨트롤: 속도 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45), [G46](CONTRACTS.md#g46) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s160-c09"></a>`R-S160-C09` | 컨트롤: 공유 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45), [G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s160-c10"></a>`R-S160-C10` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S160](UNKNOWN.md#u-s160)

<a id="s161"></a>

## S161 — 사용자 신고 사유 선택

안정 원본 ID: `sc_d07b03740ecc44328719d4d21703bb06` · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/Reporting an author/ANALYSIS.md>):116 · [원본 PNG](<../../medium/flows/Home/Story detail/Author detail/Reporting an author/screens/03_sc_d07b03740ecc44328719d4d21703bb06.png>)

흐름 맥락: [F23/03](FLOWS.md#f23)

FE 조사 경로: [ModerationDialogs.tsx](<../../FE/src/features/moderation/ModerationDialogs.tsx>), [articleModeration.ts](<../../FE/src/features/moderation/articleModeration.ts>)

기본 담당: [G29](CONTRACTS.md#g29) · 실행 작업: [V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15)

**화면별 수용 조건:** 메뉴 순서·파랑/빨강·Cancel, 성공 토스트, 신고 radio와 Also block checkbox, 사유 전후 Report 상태를 비교한다. 차단 후 원본 카드 잔존과 자체 접근 제한의 충돌을 기록한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Reportuser미선택/비활성·정책링크. 추가설명/Mock안내자체보완, native폼과여백차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):355)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Report 비활성, 정책·권리침해 링크, 닫기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s161-l"></a>`R-S161-L` | 배치: Report user 시트, 라디오 사유·추가 차단 체크·정책 링크 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G29](CONTRACTS.md#g29), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s161-d"></a>`R-S161-D` | 표시값·입력: Spam·Harassment·Rules violation·AI-generated 모두 미선택, 차단 미체크 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G29](CONTRACTS.md#g29), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s161-s"></a>`R-S161-S` | 상태: 신고 입력 전 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G29](CONTRACTS.md#g29), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s161-c01"></a>`R-S161-C01` | 컨트롤: Spam | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s161-c02"></a>`R-S161-C02` | 컨트롤: Harassment | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s161-c03"></a>`R-S161-C03` | 컨트롤: Rules violation | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s161-c04"></a>`R-S161-C04` | 컨트롤: AI-generated | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s161-c05"></a>`R-S161-C05` | 컨트롤: Also block this user | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s161-c06"></a>`R-S161-C06` | 컨트롤: 권리침해 신고 링크 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s161-c07"></a>`R-S161-C07` | 컨트롤: Read our rules | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s161-c08"></a>`R-S161-C08` | 컨트롤: Report 비활성 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s161-c09"></a>`R-S161-C09` | 컨트롤: 닫기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |


원본 해석 경계: 사유 선택용 원형 항목과 Also block this user 사각 체크박스를 구분한다. 신고 사유와 추가 차단은 별도 입력이며, 권리 침해 신고는 별도 링크로 분기한다.

미확인 사항: [U-S161](UNKNOWN.md#u-s161)

<a id="s162"></a>

## S162 — 다이제스트 설정

안정 원본 ID: `sc_d17bad2e556e4b0abfdc9541f90c46f2` · [원본 분석](<../../medium/flows/Library/Filtering digest/Digest settings/ANALYSIS.md>):83 · [원본 PNG](<../../medium/flows/Library/Filtering digest/Digest settings/screens/02_sc_d17bad2e556e4b0abfdc9541f90c46f2.png>)

흐름 맥락: [F44/02](FLOWS.md#f44)

FE 조사 경로: [NotificationSettingsScreen.tsx](<../../FE/src/features/notifications/NotificationSettingsScreen.tsx>)

기본 담당: [G44](CONTRACTS.md#g44) · 실행 작업: [V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28)

**화면별 수용 조건:** Daily/Push On/Email On의 선택·chevron·외부 화살표를 구분한다. 여섯 토글과 다섯 Tailored 행, Top story/Editors만Off를 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Frequency/Push/Email 같은 기준 상태 대조. 외부 이동 표현과 내부 mock설정 연결 차이 명시. ([과거 기록](<../FE_GOAL_53_RESULT.md>):356)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 빈도 선택, 푸시 이동, 이메일 외부 링크

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s162-l"></a>`R-S162-L` | 배치: Frequency·Push·Email 세 행 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G44](CONTRACTS.md#g44), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s162-d"></a>`R-S162-D` | 표시값·입력: Daily, Push On, Email On | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G44](CONTRACTS.md#g44), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s162-s"></a>`R-S162-S` | 상태: 다이제스트 주기·알림 채널 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G44](CONTRACTS.md#g44), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s162-c01"></a>`R-S162-C01` | 컨트롤: 빈도 선택 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s162-c02"></a>`R-S162-C02` | 컨트롤: 푸시 이동 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s162-c03"></a>`R-S162-C03` | 컨트롤: 이메일 외부 링크 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |


원본 해석 경계: Frequency는 선택 컨트롤, Push notifications는 다음 화면 화살표, Email notifications는 외부 이동 화살표로 구분된다. 이 흐름은 설정 현황까지만 보여주고 값을 변경하거나 저장한 결과는 없다.

미확인 사항: [U-S162](UNKNOWN.md#u-s162)

<a id="s163"></a>

## S163 — 공유 카드 시트
- **Parity13 최신:** [R/T·현재 검사·원본 차이](../FE_MEDIUM_PARITY_13_RESULT.md#screen-status). 이번 실제 웹 부분 확인과 원본/시각/native 잔여를 구분한다. 기존 원본 요구·증거/readiness는 보존한다.

안정 원본 ID: `sc_d1c962cd0a8240ee94769a612a81d64f` · [원본 분석](<../../medium/flows/Home/Story detail/Sharing a story/ANALYSIS.md>):86 · [원본 PNG](<../../medium/flows/Home/Story detail/Sharing a story/screens/02_sc_d1c962cd0a8240ee94769a612a81d64f.png>)

흐름 맥락: [F39/02](FLOWS.md#f39)

FE 조사 경로: [ShareSheet.tsx](<../../FE/src/features/sharing/ShareSheet.tsx>), [ShareCard.tsx](<../../FE/src/features/sharing/ShareCard.tsx>)

기본 담당: [G47](CONTRACTS.md#g47) · 실행 작업: [V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23)

**화면별 수용 조건:** blur 배경·카드 테두리·회전 주소·페이지 점·행동 가로 이동, Copy link·Friend Link·Share via·Save image와 각 성공 토스트를 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Share시트첫페이지/카드/도구연결. 자체gradient·invalid미리보기URL·48접근버튼/서체차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):357)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Copy link, Friend Link, Share via, Save image 일부

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s163-l"></a>`R-S163-L` | 배치: 기사 정보로 만든 이미지 카드·테마 페이지 점·하단 행동 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G47](CONTRACTS.md#g47), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s163-d"></a>`R-S163-D` | 표시값·입력: 읽기 시간·제목·부제·작가·Medium 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G47](CONTRACTS.md#g47), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s163-s"></a>`R-S163-S` | 상태: 공유 미리보기 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G47](CONTRACTS.md#g47), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s163-c01"></a>`R-S163-C01` | 컨트롤: Copy link | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s163-c02"></a>`R-S163-C02` | 컨트롤: Friend Link | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s163-c03"></a>`R-S163-C03` | 컨트롤: Share via | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s163-c04"></a>`R-S163-C04` | 컨트롤: Save image 일부 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s163-v"></a>`R-S163-V` | PNG 추가 세부 관찰: 카드의 세로 회전된 medium.com/@jordan_gibbs 주소, 하단 작가 아바타/이름과 Medium 워드마크, 다수 페이지 점과 blur 배경도 비교 대상이다. | 일부 포함: 공통 시각 계약에 포함되나 이 요소 묶음의 독립 판정 필요<br>[G47](CONTRACTS.md#g47), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |


원본 해석 경계: 공유 이미지 아래 여러 페이지 표시 점과 가로 방향 작업 목록이 보인다. 이미지 스타일 전환 진입점은 있으나 다른 스타일의 결과는 수록되지 않았다.

미확인 사항: [U-S163](UNKNOWN.md#u-s163)

<a id="s164"></a>

## S164 — 다크 기사 본문

- **Parity10 판정:** Dark 본문/링크/밝은 삽입 이미지 유지. 코드와 원본을 대조했으나 실제 앱 스크롤·포커스·색상 렌더 미검증. [이번 코드/검사·한계](../FE_MEDIUM_PARITY_10_RESULT.md#screen-status). 원본·과거 판정은 아래에 보존한다.

안정 원본 ID: `sc_d1d05d6500f349d89c5a3e5646ff238b` · [원본 분석](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>):303 · [원본 PNG](<../../medium/flows/Home/Story detail/Changing display/screens/09_sc_d1d05d6500f349d89c5a3e5646ff238b.png>)

흐름 맥락: [F24/09](FLOWS.md#f24)

FE 조사 경로: [ArticleDetailScreen.tsx](<../../FE/src/features/article/ArticleDetailScreen.tsx>), [ReferenceArticleView.tsx](<../../FE/src/features/article/ReferenceArticleView.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>)

기본 담당: [G25](CONTRACTS.md#g25) · 실행 작업: [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13)

**화면별 수용 조건:** 제목/부제/작가/읽기시간/표지 출처, 본문 강조·링크·삽입 이미지·토픽·작성자·응답 미리보기·관련 글·고정 반응 바를 각각 비교한다. +16은 입력 피드백이며 터치 횟수 증거가 아니다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 동일 발췌/삽입 이미지, 대체 serif와 스크롤 정렬 차이. 미수록 본문은 창작하지 않음. ([과거 기록](<../FE_GOAL_53_RESULT.md>):358)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 본문 링크

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s164-l"></a>`R-S164-L` | 배치: 검정 배경 세리프 본문·링크·삽입 이미지 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s164-d"></a>`R-S164-D` | 표시값·입력: 본문 이미지의 밝은 배경 유지 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s164-s"></a>`R-S164-S` | 상태: 스크롤 중 읽기 UI | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s164-c01"></a>`R-S164-C01` | 컨트롤: 본문 링크 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S164](UNKNOWN.md#u-s164)

<a id="s165"></a>

## S165 — 리스트 다운로드 진행

**Parity 8 최신 검토:** [다운로드 사본·표시/복귀·부분 시각 비교 결과](../FE_MEDIUM_PARITY_08_RESULT.md). 원본 PNG·R/T/U/C 대조 및 mock 구현/두 검토·브라우저 확인, 현재 타입/lint·전체302 suites/1578 tests·export 통과. 원본 자산/서체·U/native 잔여 유지. 아래 현재 판정/행별 코멘트는 초기 문서 감사 이력이며 최신 실행을 대신하지 않는다.

안정 원본 ID: `sc_d23a5b4ea6ff462f8a05ce2371e90734` · [원본 분석](<../../medium/flows/Library/List detail/Downloading a list/ANALYSIS.md>):85 · [원본 PNG](<../../medium/flows/Library/List detail/Downloading a list/screens/02_sc_d23a5b4ea6ff462f8a05ce2371e90734.png>)

흐름 맥락: [F48/02](FLOWS.md#f48)

FE 조사 경로: [DownloadControl.tsx](<../../FE/src/features/downloads/DownloadControl.tsx>)

기본 담당: [G35](CONTRACTS.md#g35) · 실행 작업: [V26](../FE_MEDIUM_PARITY_BACKLOG.md#v26)

**화면별 수용 조건:** 목록 시작 아이콘→정지 사각형→목록/각 기사 채운 아이콘을 확인한다. 메모리 사본과 실제 비행기 모드/재시작 캐시를 구분한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 목록 다운로드 진행중 stop아이콘/현재 실제 준비 상태. source시각/Viewed/회원표시 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):359)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 정지 아이콘

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s165-l"></a>`R-S165-L` | 배치: 상단 다운로드 아이콘이 정지 사각형으로 변경 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G35](CONTRACTS.md#g35), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V26](../FE_MEDIUM_PARITY_BACKLOG.md#v26) |
| <a id="r-s165-d"></a>`R-S165-D` | 표시값·입력: 4 stories 유지 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G35](CONTRACTS.md#g35), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V26](../FE_MEDIUM_PARITY_BACKLOG.md#v26) |
| <a id="r-s165-s"></a>`R-S165-S` | 상태: 다운로드 진행으로 보이는 상태 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G35](CONTRACTS.md#g35), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V26](../FE_MEDIUM_PARITY_BACKLOG.md#v26) |
| <a id="r-s165-c01"></a>`R-S165-C01` | 컨트롤: 정지 아이콘 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G35](CONTRACTS.md#g35) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V26](../FE_MEDIUM_PARITY_BACKLOG.md#v26) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S165](UNKNOWN.md#u-s165)

<a id="s166"></a>

## S166 — 가입 공급자 선택

**Parity14 개별 판정:** [S166 실행·R/T/U/C](../FE_MEDIUM_PARITY_14_RESULT.md#screens). 가입 Google/Facebook/Apple/Email 4개·Sign in 전환·닫기·mock 실패/취소/재시도 확인. 원본 요구·readiness는 유지한다.

안정 원본 ID: `sc_d55739aa2ac1495da026006235e7c0a7` · [원본 분석](<../../medium/flows/Logging in/ANALYSIS.md>):58 · [원본 PNG](<../../medium/flows/Logging in/screens/01_sc_d55739aa2ac1495da026006235e7c0a7.png>)

흐름 맥락: [F52/01](FLOWS.md#f52), [F53/02](FLOWS.md#f53), [F61/03](FLOWS.md#f61)

FE 조사 경로: [AuthDialogs.tsx](<../../FE/src/features/auth/AuthDialogs.tsx>), [EmailLogin.tsx](<../../FE/src/features/auth/EmailLogin.tsx>), [createEmailAttempt.ts](<../../FE/src/features/auth/createEmailAttempt.ts>)

기본 담당: [G40](CONTRACTS.md#g40) · 실행 작업: [V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29)

**화면별 수용 조건:** 가입4/로그인5 제공자, 이메일/이름/약관/뒤로·6칸 코드와Validate·Resend·닫기, Sign out Cancel/Confirm→intro를 비교한다. 빈 폼의 녹색 버튼과 실제 입력 검증은 별개다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 가입 방법·문구·배치 대조. mock 표시/닫기 추가와 대체 serif 굵기 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):360)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Google·Facebook·Apple·Email 가입 버튼과 Sign in 링크가 있다.

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s166-l"></a>`R-S166-L` | 배치: 중앙 서비스 소개 아래 네 개의 둥근 테두리 버튼을 세로 배치하고 하단에 로그인 링크를 둔다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s166-d"></a>`R-S166-D` | 표시값·입력: 직접 입력 필드는 없다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s166-s"></a>`R-S166-S` | 상태: 신규 가입과 기존 사용자 로그인을 구분하는 진입 화면이다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s166-c01"></a>`R-S166-C01` | 컨트롤: Sign up with Google | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s166-c02"></a>`R-S166-C02` | 컨트롤: Sign up with Facebook | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s166-c03"></a>`R-S166-C03` | 컨트롤: Sign up with Apple | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s166-c04"></a>`R-S166-C04` | 컨트롤: Sign up with Email | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s166-c05"></a>`R-S166-C05` | 컨트롤: Sign in | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S166](UNKNOWN.md#u-s166)

<a id="s167"></a>

## S167 — 내 소개 빈 상태

- Parity15 현재 검토: [화면별 결과·R/T/U/C](../FE_MEDIUM_PARITY_15_RESULT.md#scope). 기능/실제8081 부분 대조와 원본 시각·동일 fixture·native 대기를 구분한다. 아래 원본 관찰과 최초 감사 이력은 유지한다.

안정 원본 ID: `sc_d55f02281f894078a734269d60de79c4` · [원본 분석](<../../medium/flows/Profile/ANALYSIS.md>):179 · [원본 PNG](<../../medium/flows/Profile/screens/05_sc_d55f02281f894078a734269d60de79c4.png>)

흐름 맥락: [F55/05](FLOWS.md#f55)

FE 조사 경로: [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>)

기본 담당: [G42](CONTRACTS.md#g42) · 실행 작업: [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32)

**화면별 수용 조건:** Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. About빈 상태/short bio편집 진입. Continue setup·48터치·설명 간격 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):361)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Add a short bio

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s167-l"></a>`R-S167-L` | 배치: About 탭에 빈 안내·회원 기간 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s167-d"></a>`R-S167-D` | 표시값·입력: Medium member since June 2025 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s167-s"></a>`R-S167-S` | 상태: 소개 미작성 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s167-c01"></a>`R-S167-C01` | 컨트롤: Add a short bio | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S167](UNKNOWN.md#u-s167)

<a id="s168"></a>

## S168 — 기사 더보기 메뉴

안정 원본 ID: `sc_d62e32234117483b85b4c73ed63249cd` · [원본 분석](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>):91 · [원본 PNG](<../../medium/flows/Home/Story detail/Changing display/screens/02_sc_d62e32234117483b85b4c73ed63249cd.png>)

흐름 맥락: [F24/02](FLOWS.md#f24)

FE 조사 경로: [ArticleDisplayPopover.tsx](<../../FE/src/features/settings/ArticleDisplayPopover.tsx>), [useReaderTypography.ts](<../../FE/src/features/settings/useReaderTypography.ts>)

기본 담당: [G24](CONTRACTS.md#g24) · 실행 작업: [V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16)

**화면별 수용 조건:** 100→120과 배경 제목 줄바꿈, Font family 행, Appearance 하위 선택, 타인 Highlight on/off와 어두운 팝오버를 비교한다. 본인 저장 강조 삭제와 분리한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 기사메뉴Followpill을원본plainFollowauthor행으로수정. 공통관계저장소/접근성label·실패복구유지, nativeblur/행높이차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):362)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Show less like this, Display settings, Follow author, Mute author, Report story

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s168-l"></a>`R-S168-L` | 배치: 상단 팝오버 5행 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G24](CONTRACTS.md#g24), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s168-d"></a>`R-S168-D` | 표시값·입력: 추가 입력 없음 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G24](CONTRACTS.md#g24), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s168-s"></a>`R-S168-S` | 상태: 읽기·추천·작가·신고 행동 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G24](CONTRACTS.md#g24), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s168-c01"></a>`R-S168-C01` | 컨트롤: Show less like this | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24), [G31](CONTRACTS.md#g31) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s168-c02"></a>`R-S168-C02` | 컨트롤: Display settings | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s168-c03"></a>`R-S168-C03` | 컨트롤: Follow author | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24), [G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s168-c04"></a>`R-S168-C04` | 컨트롤: Mute author | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24), [G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s168-c05"></a>`R-S168-C05` | 컨트롤: Report story | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24), [G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S168](UNKNOWN.md#u-s168)

<a id="s169"></a>

## S169 — 발행 글과 반응 있는 프로필

- Parity15 현재 검토: [화면별 결과·R/T/U/C](../FE_MEDIUM_PARITY_15_RESULT.md#scope). 기능/실제8081 부분 대조와 원본 시각·동일 fixture·native 대기를 구분한다. 아래 원본 관찰과 최초 감사 이력은 유지한다.

안정 원본 ID: `sc_d76d3680605f4b62ab31e3039d6c4fe6` · [원본 분석](<../../medium/flows/Profile/ANALYSIS.md>):119 · [원본 PNG](<../../medium/flows/Profile/screens/03_sc_d76d3680605f4b62ab31e3039d6c4fe6.png>)

흐름 맥락: [F55/03](FLOWS.md#f55), [F58/01](FLOWS.md#f58)

FE 조사 경로: [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>)

기본 담당: [G42](CONTRACTS.md#g42) · 실행 작업: [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32)

**화면별 수용 조건:** Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 실제발행글 조회/진입 확인. 당시 원본 사진·반응/저장/더보기와 written row 차이가 있었다. 후속 보완에서 같은 발행 ID의 반응/저장/더보기를 연결하고 카드 상태를 재대조한다. 사진·계정·현재 날짜 차이는 별도다. ([과거 기록](<../FE_GOAL_53_RESULT.md>):363)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** View stats, 편집, 글 더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s169-l"></a>`R-S169-L` | 배치: Stories Public에 기사 카드 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s169-d"></a>`R-S169-D` | 표시값·입력: 23h ago, 박수29·응답1 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s169-s"></a>`R-S169-S` | 상태: 발행 후 반응 집계 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s169-c01"></a>`R-S169-C01` | 컨트롤: View stats | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42), [G43](CONTRACTS.md#g43) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s169-c02"></a>`R-S169-C02` | 컨트롤: 편집 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s169-c03"></a>`R-S169-C03` | 컨트롤: 글 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G39](CONTRACTS.md#g39), [G42](CONTRACTS.md#g42), [G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s169-c04"></a>`R-S169-C04` | 컨트롤(PNG 재확인): 발행 글 박수29 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G39](CONTRACTS.md#g39), [G42](CONTRACTS.md#g42) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s169-c05"></a>`R-S169-C05` | 컨트롤(PNG 재확인): 발행 글 응답1 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26), [G39](CONTRACTS.md#g39), [G42](CONTRACTS.md#g42) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s169-c06"></a>`R-S169-C06` | 컨트롤(PNG 재확인): 발행 글 저장 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G39](CONTRACTS.md#g39), [G42](CONTRACTS.md#g42) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s169-c07"></a>`R-S169-C07` | 컨트롤(PNG 재확인): Public 필터 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G39](CONTRACTS.md#g39), [G42](CONTRACTS.md#g42) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s169-c08"></a>`R-S169-C08` | 컨트롤(PNG 재확인): 작성 버튼 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G42](CONTRACTS.md#g42) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s169-c09"></a>`R-S169-C09` | 컨트롤(PNG 재확인): 설정 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42), [G49](CONTRACTS.md#g49) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s169-c10"></a>`R-S169-C10` | 컨트롤(PNG 재확인): 발행 글 열기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G39](CONTRACTS.md#g39), [G42](CONTRACTS.md#g42) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s169-c11"></a>`R-S169-C11` | 컨트롤(PNG 재확인): 0 followers 표시/진입점 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28), [G42](CONTRACTS.md#g42) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s169-c12"></a>`R-S169-C12` | 컨트롤(PNG 재확인): 1 following 표시/진입점 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28), [G42](CONTRACTS.md#g42) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s169-v"></a>`R-S169-V` | PNG 추가 세부 관찰: 원본의 발행 글 반응 행 앞에는 게시 경과 시간23h ago가 표시된다. S178의 Just now와 별도 상태다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G23](CONTRACTS.md#g23), [G39](CONTRACTS.md#g39), [G42](CONTRACTS.md#g42), [G53](CONTRACTS.md#g53) | 구현 차이 확인: ProfileStories는1분 미만 외에는 toLocaleDateString을 사용하며23h ago 분기가 없음<br>[D12](../FE_MEDIUM_PARITY_BACKLOG.md#d12) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S169](UNKNOWN.md#u-s169)

<a id="s170"></a>

## S170 — 사용자 신고 성공 안내

안정 원본 ID: `sc_d9ba56fa632249c7908f15a8e3082d97` · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/Reporting an author/ANALYSIS.md>):178 · [원본 PNG](<../../medium/flows/Home/Story detail/Author detail/Reporting an author/screens/05_sc_d9ba56fa632249c7908f15a8e3082d97.png>)

흐름 맥락: [F23/05](FLOWS.md#f23)

FE 조사 경로: [ModerationDialogs.tsx](<../../FE/src/features/moderation/ModerationDialogs.tsx>), [articleModeration.ts](<../../FE/src/features/moderation/articleModeration.ts>)

기본 담당: [G29](CONTRACTS.md#g29) · 실행 작업: [V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15)

**화면별 수용 조건:** 메뉴 순서·파랑/빨강·Cancel, 성공 토스트, 신고 radio와 Also block checkbox, 사유 전후 Report 상태를 비교한다. 차단 후 원본 카드 잔존과 자체 접근 제한의 충돌을 기록한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 모의신고확정안내·기존화면복귀. 외부신고없음, toast/서체차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):364)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Follow, 더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s170-l"></a>`R-S170-L` | 배치: 프로필에 검정 토스트 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G29](CONTRACTS.md#g29), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s170-d"></a>`R-S170-D` | 표시값·입력: Successfully reported user | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G29](CONTRACTS.md#g29), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s170-s"></a>`R-S170-S` | 상태: 신고 접수 성공 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G29](CONTRACTS.md#g29), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s170-c01"></a>`R-S170-C01` | 컨트롤: Follow | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28), [G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s170-c02"></a>`R-S170-C02` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S170](UNKNOWN.md#u-s170)

<a id="s171"></a>

## S171 — 이메일 로그인 빈 폼

**Parity14 개별 판정:** [S171 실행·R/T/U/C](../FE_MEDIUM_PARITY_14_RESULT.md#screens). 빈 로그인 이메일·녹색 Continue·실제 제출 비활성·뒤로 확인. 원본 요구·readiness는 유지한다.

안정 원본 ID: `sc_da2ab413cfe5481d9abe4f23eeaeb426` · [원본 분석](<../../medium/flows/Logging in/ANALYSIS.md>):119 · [원본 PNG](<../../medium/flows/Logging in/screens/03_sc_da2ab413cfe5481d9abe4f23eeaeb426.png>)

흐름 맥락: [F52/03](FLOWS.md#f52)

FE 조사 경로: [AuthDialogs.tsx](<../../FE/src/features/auth/AuthDialogs.tsx>), [EmailLogin.tsx](<../../FE/src/features/auth/EmailLogin.tsx>), [createEmailAttempt.ts](<../../FE/src/features/auth/createEmailAttempt.ts>)

기본 담당: [G40](CONTRACTS.md#g40) · 실행 작업: [V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29)

**화면별 수용 조건:** 가입4/로그인5 제공자, 이메일/이름/약관/뒤로·6칸 코드와Validate·Resend·닫기, Sign out Cancel/Confirm→intro를 비교한다. 빈 폼의 녹색 버튼과 실제 입력 검증은 별개다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Email로그인 빈 상태 대조. 예약된 example.test 입력 보조/실제 정보 입력 금지 안내가 자체 추가. ([과거 기록](<../FE_GOAL_53_RESULT.md>):365)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Continue, 뒤로

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s171-l"></a>`R-S171-L` | 배치: 이메일 필드와 녹색 Continue | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s171-d"></a>`R-S171-D` | 표시값·입력: janedoe@gmail.com 예시 문자열 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s171-s"></a>`R-S171-S` | 상태: 이메일 입력 전 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s171-c01"></a>`R-S171-C01` | 컨트롤: Continue | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s171-c02"></a>`R-S171-C02` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |


원본 해석 경계: 이메일 placeholder만 보이는 상태에서도 Continue는 녹색이다. 버튼 색을 형식 검증 완료로 간주하지 않는다.

미확인 사항: [U-S171](UNKNOWN.md#u-s171)

<a id="s172"></a>

## S172 — 저장 아이콘 활성

- Parity 7 최신 검토: [저장·목록·메모·순서 결과](../FE_MEDIUM_PARITY_07_RESULT.md). 기능/브라우저·원본 차이·미확인/native를 분리한다. 아래 초기 판정은 감사 당시 이력이다.

안정 원본 ID: `sc_dda8e78e9eb943629d3cf54eaed5fc22` · [원본 분석](<../../medium/flows/Home/Story detail/Saving a story/ANALYSIS.md>):116 · [원본 PNG](<../../medium/flows/Home/Story detail/Saving a story/screens/03_sc_dda8e78e9eb943629d3cf54eaed5fc22.png>)

흐름 맥락: [F37/03](FLOWS.md#f37)

FE 조사 경로: [ArticleBookmarkControl.tsx](<../../FE/src/features/bookmarks/ArticleBookmarkControl.tsx>), [SaveToListSheet.tsx](<../../FE/src/features/bookmarks/SaveToListSheet.tsx>)

기본 담당: [G33](CONTRACTS.md#g33) · 실행 작업: [V22](../FE_MEDIUM_PARITY_BACKLOG.md#v22)

**화면별 수용 조건:** Save to, Reading list 체크/잠금, Create new list, Done, 복귀한 채운 북마크를 비교한다. 체크와 확정 시점을 자체 계약으로 명시한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Done 후 북마크채움. 원본834댓글과현재7은다름. ([과거 기록](<../FE_GOAL_53_RESULT.md>):366)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 채워진 북마크

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s172-l"></a>`R-S172-L` | 배치: 기사 상세 하단 북마크 채움 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V22](../FE_MEDIUM_PARITY_BACKLOG.md#v22) |
| <a id="r-s172-d"></a>`R-S172-D` | 표시값·입력: 기사 내용·집계 유지 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V22](../FE_MEDIUM_PARITY_BACKLOG.md#v22) |
| <a id="r-s172-s"></a>`R-S172-S` | 상태: 저장 선택 반영 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V22](../FE_MEDIUM_PARITY_BACKLOG.md#v22) |
| <a id="r-s172-c01"></a>`R-S172-C01` | 컨트롤: 채워진 북마크 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V22](../FE_MEDIUM_PARITY_BACKLOG.md#v22) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S172](UNKNOWN.md#u-s172)

<a id="s173"></a>

## S173 — 설정 상단

안정 원본 ID: `sc_ddd51660cb8346a1b200ed970a2d5c45` · [원본 분석](<../../medium/flows/Profile/Settings/ANALYSIS.md>):84 · [원본 PNG](<../../medium/flows/Profile/Settings/screens/02_sc_ddd51660cb8346a1b200ed970a2d5c45.png>)

흐름 맥락: [F58/02](FLOWS.md#f58), [F59/01](FLOWS.md#f59), [F60/01](FLOWS.md#f60), [F62/01](FLOWS.md#f62)

FE 조사 경로: [SettingsScreen.tsx](<../../FE/src/features/settings/SettingsScreen.tsx>), [SettingsExtrasScreen.tsx](<../../FE/src/features/settings/SettingsExtrasScreen.tsx>), [AppIconScreen.tsx](<../../FE/src/features/app-icon/AppIconScreen.tsx>)

기본 담당: [G49](CONTRACTS.md#g49) · 실행 작업: [V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33)

**화면별 수용 조건:** 모든 행과 섹션·외부 화살표·Facebook 안내·버전·Appearance 선택, 2열 아이콘8종·Wordmark Black선택·Friend잠금·하단잘림을 비교한다. 자체 K 자산을 원본과 동일로 세지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Settings상단항목/Appearance/Systemdefault 대조. mockmember현재값·Email내부진입·48행높이 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):367)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 계정·결제·통계·프로필·추천·Push·Email·Custom app icon

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s173-l"></a>`R-S173-L` | 배치: Account·Configure Medium 섹션 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G49](CONTRACTS.md#g49), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s173-d"></a>`R-S173-D` | 표시값·입력: Appearance System default 선택 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G49](CONTRACTS.md#g49), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s173-s"></a>`R-S173-S` | 상태: 주요 설정 진입점 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G49](CONTRACTS.md#g49), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s173-c01"></a>`R-S173-C01` | 컨트롤: Become a Friend of Medium | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G48](CONTRACTS.md#g48), [G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s173-c02"></a>`R-S173-C02` | 컨트롤: Story stats | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G43](CONTRACTS.md#g43), [G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s173-c03"></a>`R-S173-C03` | 컨트롤: Account | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s173-c04"></a>`R-S173-C04` | 컨트롤: Membership and payment | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s173-c05"></a>`R-S173-C05` | 컨트롤: Edit profile | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42), [G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s173-c06"></a>`R-S173-C06` | 컨트롤: Refine recommendations | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31), [G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s173-c07"></a>`R-S173-C07` | 컨트롤: System default | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24), [G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s173-c08"></a>`R-S173-C08` | 컨트롤: Light | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24), [G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s173-c09"></a>`R-S173-C09` | 컨트롤: Dark | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24), [G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s173-c10"></a>`R-S173-C10` | 컨트롤: Push notifications | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44), [G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s173-c11"></a>`R-S173-C11` | 컨트롤: Email notifications | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44), [G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s173-c12"></a>`R-S173-C12` | 컨트롤: Custom app icon | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s173-c13"></a>`R-S173-C13` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S173](UNKNOWN.md#u-s173)

<a id="s174"></a>

## S174 — 팔로우 추천 가로 스크롤

안정 원본 ID: `sc_dfdd5f6377a848c59b3512417cb47490` · [원본 분석](<../../medium/flows/Explore/ANALYSIS.md>):209 · [원본 PNG](<../../medium/flows/Explore/screens/06_sc_dfdd5f6377a848c59b3512417cb47490.png>)

흐름 맥락: [F01/06](FLOWS.md#f01)

FE 조사 경로: [SearchScreen.tsx](<../../FE/src/features/search/SearchScreen.tsx>), [CatalogSearchResults.tsx](<../../FE/src/features/search/CatalogSearchResults.tsx>), [ExploreSections.tsx](<../../FE/src/features/search/ExploreSections.tsx>)

기본 담당: [G50](CONTRACTS.md#g50) · 실행 작업: [V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02)

**화면별 수용 조건:** 검색 빈 화면의 토픽 행, Stories 결과, 다섯 탭과 X를 분리한다. Trending 순위, Staff Picks 가로 카드, Recommended 세로 카드, Who to follow 가로 이동을 원본 상태별로 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Daily Dollar publication은 원본처럼 사각 avatar, Alex Mathers 확인된 배지 복원. 두 번째 가로 스크롤 맥락 확인. ([과거 기록](<../FE_GOAL_53_RESULT.md>):368)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Follow

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s174-l"></a>`R-S174-L` | 배치: 다른 추천 카드 노출 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s174-d"></a>`R-S174-D` | 표시값·입력: The Daily Dollar·Alex Mathers | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s174-s"></a>`R-S174-S` | 상태: 캐러셀 이동 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s174-c01"></a>`R-S174-C01` | 컨트롤: Follow | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S174](UNKNOWN.md#u-s174)

<a id="s175"></a>

## S175 — 본문 아래 응답 미리보기

- **Parity10 판정:** 본문/버튼/시트의 공통 집계 유지. Write a response와 목록 열람의 포커스 구분. 미리보기 원본 수/아바타 차이 잔여. [이번 코드/검사·한계](../FE_MEDIUM_PARITY_10_RESULT.md#screen-status). 원본·과거 판정은 아래에 보존한다.

안정 원본 ID: `sc_e1a92b59829c4678b3362d2dc6abae59` · [원본 분석](<../../medium/flows/Home/Story detail/ANALYSIS.md>):181 · [원본 PNG](<../../medium/flows/Home/Story detail/screens/05_sc_e1a92b59829c4678b3362d2dc6abae59.png>)

흐름 맥락: [F16/05](FLOWS.md#f16)

FE 조사 경로: [ArticleDetailScreen.tsx](<../../FE/src/features/article/ArticleDetailScreen.tsx>), [ReferenceArticleView.tsx](<../../FE/src/features/article/ReferenceArticleView.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>)

기본 담당: [G25](CONTRACTS.md#g25) · 실행 작업: [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13)

**화면별 수용 조건:** 제목/부제/작가/읽기시간/표지 출처, 본문 강조·링크·삽입 이미지·토픽·작성자·응답 미리보기·관련 글·고정 반응 바를 각각 비교한다. +16은 입력 피드백이며 터치 횟수 증거가 아니다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. inlineResponses제목/작성자/입력·policy누락수정. 공유프로필아바타와실제7응답, 원본834/작성자Member배지차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):369)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 정책 방패, 더보기, 박수, replies, Reply

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s175-l"></a>`R-S175-L` | 배치: Responses 834, 입력 유도, 응답 작성자·날짜·본문 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s175-d"></a>`R-S175-D` | 표시값·입력: Alex Smith, What are your thoughts? | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s175-s"></a>`R-S175-S` | 상태: 응답 일부 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s175-c01"></a>`R-S175-C01` | 컨트롤: 정책 방패 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s175-c02"></a>`R-S175-C02` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G26](CONTRACTS.md#g26), [G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s175-c03"></a>`R-S175-C03` | 컨트롤: 박수 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s175-c04"></a>`R-S175-C04` | 컨트롤: replies | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s175-c05"></a>`R-S175-C05` | 컨트롤: Reply | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S175](UNKNOWN.md#u-s175)
