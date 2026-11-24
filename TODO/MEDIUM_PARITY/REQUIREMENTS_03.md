# 화면별 원본 요구사항

**Parity14 커밋 전 추가 검토(2026-11-24):** [재검토·현재 검사·커밋 범위](../FE_MEDIUM_PARITY_14_RESULT.md#pre-commit-review). 추가 코드 결함 없이 타입/lint·관련12 suites/82 tests를 새로 통과했고 이번 act 경고0이다. 앞선 전체1722건 이후 코드 변경·552개 codeInputs 해시 불일치0. 사용자 요청에 따라36파일 로컬 커밋 범위를 확정했다. 원본/시각·S043/native 및9~13 잔여는 유지하며 push·배포·15 구현은 하지 않는다. 아래 미커밋 기록은 최초 실행 이력이다.

**Parity14 최초 구현·검증(2026-11-24):** [구현·이번 검사·원본 차이·담당](../FE_MEDIUM_PARITY_14_RESULT.md). V29/V30의16화면·99 R·19 T/U/C를 대조하고 이메일 약관/수명·추천 카탈로그/조회·온보딩 뒤로/source 경계를 보완했다. 타입/lint·최종 전체316 suites/1722 tests 통과, 이번 act 경고0. 실제8081 부분 대조와 자동 검증을 구분하며 S043은18/21, 원본 자산/시각/OS 대기는14 및 관련 담당에 유지한다.9~13의 잔여 이전·전체 종료 승인은 아니다. 커밋·push·배포·15 진행 없음.

[검토 요약](../FE_MEDIUM_PARITY_AUDIT.md) · [보완 작업](../FE_MEDIUM_PARITY_BACKLOG.md) · [계약 원문](CONTRACTS.md) · [흐름 맥락](FLOWS.md) · [미확인 항목](UNKNOWN.md)

이번 목록은 원본에서 추출한 **관찰 요구사항**이다. L=배치, D=표시값/입력, S=상태, C=컨트롤, V=PNG 추가 세부 관찰이다. L/D/S는 원문 한 문장의 모든 요소를 포함하는 묶음이며 단일 버튼 수가 아니다. C는 명시적으로 나눈 조작점이다. 이 숫자를 기능 완성률의 분모로 사용하지 않는다.

`포함`은 기능 작업 범위에 있다는 판정이며 현재 FE 동일 재현 완료라는 뜻이 아니다. `일부 포함`은 공통/상위 계약은 있지만 개별 조건이 분산된 경우다. 코드 링크는 구현 조사 위치이며 자동으로 해당 요구의 통과를 증명하지 않는다. 과거 Goal53 판정은 당시 증거이고 현재 재촬영 결과가 아니다. 모든 행의 완료 조건은 해당 원본 PNG의 데이터·상태를 맞춘 비교와 FLOWS의 진입/복귀 검증을 함께 적용한다.


<a id="s051"></a>

## S051 — 링크 복사 피드백
- **Parity13 최신:** [R/T·현재 검사·원본 차이](../FE_MEDIUM_PARITY_13_RESULT.md#screen-status). 이번 실제 웹 부분 확인과 원본/시각/native 잔여를 구분한다. 기존 원본 요구·증거/readiness는 보존한다.

안정 원본 ID: `sc_4225892a7f304ec9b0442fad0aae38bb` · [원본 분석](<../../medium/flows/Home/Story detail/Sharing a story/ANALYSIS.md>):117 · [원본 PNG](<../../medium/flows/Home/Story detail/Sharing a story/screens/03_sc_4225892a7f304ec9b0442fad0aae38bb.png>)

흐름 맥락: [F39/03](FLOWS.md#f39)

FE 조사 경로: [ShareSheet.tsx](<../../FE/src/features/sharing/ShareSheet.tsx>), [ShareCard.tsx](<../../FE/src/features/sharing/ShareCard.tsx>)

기본 담당: [G47](CONTRACTS.md#g47) · 실행 작업: [V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23)

**화면별 수용 조건:** blur 배경·카드 테두리·회전 주소·페이지 점·행동 가로 이동, Copy link·Friend Link·Share via·Save image와 각 성공 토스트를 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 실제웹Clipboard복사완료toast 확인. 원본공유URL대신앱미리보기URL, 배경자산·아이콘차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):245)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 공유 행동 유지

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s051-l"></a>`R-S051-L` | 배치: 공유 시트 상단 검정 토스트 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G47](CONTRACTS.md#g47), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s051-d"></a>`R-S051-D` | 표시값·입력: Link copied | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G47](CONTRACTS.md#g47), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s051-s"></a>`R-S051-S` | 상태: 복사 완료 안내 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G47](CONTRACTS.md#g47), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s051-c01"></a>`R-S051-C01` | 컨트롤: 닫기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s051-c02"></a>`R-S051-C02` | 컨트롤: Copy link | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s051-c03"></a>`R-S051-C03` | 컨트롤: Friend Link | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s051-c04"></a>`R-S051-C04` | 컨트롤: Share via | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s051-c05"></a>`R-S051-C05` | 컨트롤: Save image | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s051-c06"></a>`R-S051-C06` | 컨트롤: 카드 페이지 점 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S051](UNKNOWN.md#u-s051)

<a id="s052"></a>

## S052 — 읽기 기록 스크롤

- **1~8 잔여 정리:** 기존 이력/설정/재열기 연결 유지, 개발 비교 모드 정수7/11/471 추가. Q05 원본 Undo 근거는 여전히 없음. [현재 결과](../FE_MEDIUM_PARITY_01_08_REVIEW.md).

안정 원본 ID: `sc_4239d69cbdce4194a5a34c7472131dfd` · [원본 분석](<../../medium/flows/Home/Refine recommendations/Reading history/ANALYSIS.md>):84 · [원본 PNG](<../../medium/flows/Home/Refine recommendations/Reading history/screens/02_sc_4239d69cbdce4194a5a34c7472131dfd.png>)

흐름 맥락: [F14/02](FLOWS.md#f14)

FE 조사 경로: [ReadingHistoryList.tsx](<../../FE/src/features/reading-history/ReadingHistoryList.tsx>)

기본 담당: [G31](CONTRACTS.md#g31) · 실행 작업: [V12](../FE_MEDIUM_PARITY_BACKLOG.md#v12)

**화면별 수용 조건:** 전체 Clear history와 개별 휴지통을 분리하고 빈 상태 Explore·목록 스크롤을 확인한다. 발행일을 읽은 시각으로 바꾸지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 읽기이력개별기사제거/복귀. 원본과현재선택순서·응답수·제목줄바꿈 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):246)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 휴지통, 더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s052-l"></a>`R-S052-L` | 배치: 읽기 기록 탭 아래 다른 기사 카드 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V12](../FE_MEDIUM_PARITY_BACKLOG.md#v12) |
| <a id="r-s052-d"></a>`R-S052-D` | 표시값·입력: 각 카드 휴지통 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V12](../FE_MEDIUM_PARITY_BACKLOG.md#v12) |
| <a id="r-s052-s"></a>`R-S052-S` | 상태: 개별 기록 삭제 진입 가능 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V12](../FE_MEDIUM_PARITY_BACKLOG.md#v12) |
| <a id="r-s052-c01"></a>`R-S052-C01` | 컨트롤: 휴지통 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V12](../FE_MEDIUM_PARITY_BACKLOG.md#v12) |
| <a id="r-s052-c02"></a>`R-S052-C02` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29), [G31](CONTRACTS.md#g31) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V12](../FE_MEDIUM_PARITY_BACKLOG.md#v12) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S052](UNKNOWN.md#u-s052)

<a id="s053"></a>

## S053 — 편집 추천과 개인 추천

안정 원본 ID: `sc_4352273aa0654f939705613dfa224e75` · [원본 분석](<../../medium/flows/Explore/ANALYSIS.md>):148 · [원본 PNG](<../../medium/flows/Explore/screens/04_sc_4352273aa0654f939705613dfa224e75.png>)

흐름 맥락: [F01/04](FLOWS.md#f01)

FE 조사 경로: [SearchScreen.tsx](<../../FE/src/features/search/SearchScreen.tsx>), [CatalogSearchResults.tsx](<../../FE/src/features/search/CatalogSearchResults.tsx>), [ExploreSections.tsx](<../../FE/src/features/search/ExploreSections.tsx>)

기본 담당: [G50](CONTRACTS.md#g50) · 실행 작업: [V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02)

**화면별 수용 조건:** 검색 빈 화면의 토픽 행, Stories 결과, 다섯 탭과 X를 분리한다. Trending 순위, Staff Picks 가로 카드, Recommended 세로 카드, Who to follow 가로 이동을 원본 상태별로 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Staff Picks/Recommended 배치 대조. F.Perry Wilson 배지 누락을 원본 및 공유 identity fixture에 반영. ([과거 기록](<../FE_GOAL_53_RESULT.md>):247)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 기사 카드

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s053-l"></a>`R-S053-L` | 배치: Staff Picks 가로 큰 카드·Recommended for you 세로 목록 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s053-d"></a>`R-S053-D` | 표시값·입력: 기사 읽기 시간·날짜·집계 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s053-s"></a>`R-S053-S` | 상태: 발견 페이지 중간 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s053-c01"></a>`R-S053-C01` | 컨트롤: 기사 카드 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |


원본 해석 경계: Staff Picks는 팀이 직접 고른다는 안내가 있고 Recommended for you는 별도 섹션이다. 편집 선정과 개인 추천을 같은 기준으로 설명하지 않는다.

미확인 사항: [U-S053](UNKNOWN.md#u-s053)

<a id="s054"></a>

## S054 — 이름과 이메일 입력 완료

**Parity14 개별 판정:** [S054 실행·R/T/U/C](../FE_MEDIUM_PARITY_14_RESULT.md#screens). 이름/이메일 입력과 약관 왕복, 오류 시 보존·수정·재시도 확인. 예시 이름 제한은 기존 mock. 원본 요구·readiness는 유지한다.

안정 원본 ID: `sc_4510def6bbb1459ab0b5f18d07b8427e` · [원본 분석](<../../medium/flows/Onboarding/ANALYSIS.md>):155 · [원본 PNG](<../../medium/flows/Onboarding/screens/04_sc_4510def6bbb1459ab0b5f18d07b8427e.png>)

흐름 맥락: [F53/04](FLOWS.md#f53)

FE 조사 경로: [AuthDialogs.tsx](<../../FE/src/features/auth/AuthDialogs.tsx>), [EmailLogin.tsx](<../../FE/src/features/auth/EmailLogin.tsx>), [createEmailAttempt.ts](<../../FE/src/features/auth/createEmailAttempt.ts>)

기본 담당: [G40](CONTRACTS.md#g40) · 실행 작업: [V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29)

**화면별 수용 조건:** 가입4/로그인5 제공자, 이메일/이름/약관/뒤로·6칸 코드와Validate·Resend·닫기, Sign out Cancel/Confirm→intro를 비교한다. 빈 폼의 녹색 버튼과 실제 입력 검증은 별개다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 가입 입력 확정 가능. 원본 키보드/스크롤 조건과 웹 viewport 차이, OS IME검증 아님. ([과거 기록](<../FE_GOAL_53_RESULT.md>):248)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 녹색 Create account 버튼이 보인다.

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s054-l"></a>`R-S054-L` | 배치: 가입 폼이 위로 이동한 상태로 이름·이메일 입력란과 하단 약관이 보인다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s054-d"></a>`R-S054-D` | 표시값·입력: Alex Smith와 이메일 샘플이 채워졌다. 비밀번호 입력은 없다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s054-s"></a>`R-S054-S` | 상태: 입력 후 제출 전 캡처다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s054-c01"></a>`R-S054-C01` | 컨트롤: Create account | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s054-c02"></a>`R-S054-C02` | 컨트롤: 이름 입력 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s054-c03"></a>`R-S054-C03` | 컨트롤: 이메일 입력 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s054-c04"></a>`R-S054-C04` | 컨트롤: Terms of Service | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40), [G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s054-c05"></a>`R-S054-C05` | 컨트롤: Privacy Policy | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40), [G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s054-c06"></a>`R-S054-C06` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S054](UNKNOWN.md#u-s054)

<a id="s055"></a>

## S055 — 확장 오디오 플레이어
- **Parity12 최신:** [요구별 상태·검사·잔여](../FE_MEDIUM_PARITY_12_RESULT.md#screen-status). 10/30 상대 이동·재생 누락 수정.280/5/1 독립 입력, 이전/다음 비활성은 자체 정책. 공통 플레이어 시각 잔여. 원본 관찰/기존 증거는 보존하며 새 실제 렌더 비교 완료가 아니다.


안정 원본 ID: `sc_45ddcc1f43a54523a1314ce563abf5ee` · [원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/ANALYSIS.md>):147 · [원본 PNG](<../../medium/flows/Home/Story detail/Listening to a story/screens/04_sc_45ddcc1f43a54523a1314ce563abf5ee.png>)

흐름 맥락: [F26/04](FLOWS.md#f26), [F27/01](FLOWS.md#f27), [F28/01](FLOWS.md#f28)

FE 조사 경로: [ListeningPlayer.tsx](<../../FE/src/features/listening/ListeningPlayer.tsx>)

기본 담당: [G45](CONTRACTS.md#g45) · 실행 작업: [V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18)

**화면별 수용 조건:** 준비 중 두 spinner, mini/expanded 동일 기사, 커버·배경·시간·진행선·10초/30초·희미한 이전/다음·닫기·Speechify 표시를 비교한다. 무음 timer는 실제 재생과 구분한다. Q12에서 미니/확장 플레이어의 모의 안내가 원본 배치에 미치는 영향을 판정한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 확대 플레이어; 재생 시각은 실제 조작 경과라 원본5초와 다름. 자체 gradient/vector/폰트 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):249)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 일시정지, 10초 뒤로, 30초 앞으로, 속도, 공유, 더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s055-l"></a>`R-S055-L` | 배치: 커버·작가·제목·진행 바·조작 버튼·Speechify 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G45](CONTRACTS.md#g45), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s055-d"></a>`R-S055-D` | 표시값·입력: 00:05, -04:35, 1x | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G45](CONTRACTS.md#g45), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s055-s"></a>`R-S055-S` | 상태: 확장 재생 화면 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G45](CONTRACTS.md#g45), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s055-c01"></a>`R-S055-C01` | 컨트롤: 접기 손잡이 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s055-c02"></a>`R-S055-C02` | 컨트롤: 진행 바 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s055-c03"></a>`R-S055-C03` | 컨트롤: 일시정지 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s055-c04"></a>`R-S055-C04` | 컨트롤: 10초 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s055-c05"></a>`R-S055-C05` | 컨트롤: 30초 앞으로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s055-c06"></a>`R-S055-C06` | 컨트롤: 이전 트랙(연한 표시) | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s055-c07"></a>`R-S055-C07` | 컨트롤: 다음 트랙(연한 표시) | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s055-c08"></a>`R-S055-C08` | 컨트롤: 속도 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45), [G46](CONTRACTS.md#g46) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s055-c09"></a>`R-S055-C09` | 컨트롤: 공유 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45), [G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s055-c10"></a>`R-S055-C10` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |


원본 해석 경계: 이전·다음 트랙 아이콘은 연하게 보이고 중앙 일시정지·10초 뒤로·30초 앞으로는 선명하다. 상단 손잡이, 공유, Powered by Speechify 표시도 있다. 이전·다음 아이콘의 실제 비활성 여부와 재생 큐는 미확인이다.

미확인 사항: [U-S055](UNKNOWN.md#u-s055)

<a id="s056"></a>

## S056 — 다크 읽기 목록 상세

- Parity 7 최신 검토: [저장·목록·메모·순서 결과](../FE_MEDIUM_PARITY_07_RESULT.md). 기능/브라우저·원본 차이·미확인/native를 분리한다. 아래 초기 판정은 감사 당시 이력이다.

안정 원본 ID: `sc_45fd4ac6da2148968fab1446df649f7f` · [원본 분석](<../../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>):240 · [원본 PNG](<../../medium/flows/Profile/Settings/Switching to dark mode/screens/07_sc_45fd4ac6da2148968fab1446df649f7f.png>)

흐름 맥락: [F62/07](FLOWS.md#f62)

FE 조사 경로: [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>)

기본 담당: [G33](CONTRACTS.md#g33) · 실행 작업: [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25)

**화면별 수용 조건:** 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. DarkReadinglist기본목록반응조회결함수정 후확인. 소유자전용비공개투영/외부공유차단; 원본4기사/inline lock와현재3/Private행차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):250)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 메모·다운로드·더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s056-l"></a>`R-S056-L` | 배치: 제목·메모·기사 카드 어두운 테마 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s056-d"></a>`R-S056-D` | 표시값·입력: 4 stories·자물쇠, 한 기사 Viewed 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s056-s"></a>`R-S056-S` | 상태: 읽은 기사 표시와 다크 테마 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s056-c01"></a>`R-S056-C01` | 컨트롤: 메모 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s056-c02"></a>`R-S056-C02` | 컨트롤: 다운로드 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G35](CONTRACTS.md#g35) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s056-c03"></a>`R-S056-C03` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |


원본 해석 경계: 한 글은 제목이 연해지고 메타데이터에 Viewed가 나타난다. 북마크 채움·다운로드 아이콘과 별개 표시이며 읽음 판정 시간·집계 기준은 화면으로 알 수 없다.

미확인 사항: [U-S056](UNKNOWN.md#u-s056)

<a id="s057"></a>

## S057 — Life 토픽 상세

안정 원본 ID: `sc_4602e853aca341a697239bc9f55b6da3` · [원본 분석](<../../medium/flows/Explore/Topic detail/ANALYSIS.md>):83 · [원본 PNG](<../../medium/flows/Explore/Topic detail/screens/02_sc_4602e853aca341a697239bc9f55b6da3.png>)

흐름 맥락: [F03/02](FLOWS.md#f03), [F04/01](FLOWS.md#f04)

FE 조사 경로: [TopicScreen.tsx](<../../FE/src/features/topics/TopicScreen.tsx>)

기본 담당: [G30](CONTRACTS.md#g30) · 실행 작업: [V03](../FE_MEDIUM_PARITY_BACKLOG.md#v03)

**화면별 수용 조건:** Life와 Self Improvement는 별도 대상이다. Follow/Following·집계·관련 칩·헤더 축소와 See the full list의 대상 보존을 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Life 제목/팔로우/추천 이미지·기사·뒤로 확인; 글꼴·아이콘·48터치 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):251)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Follow, 공유, 관련 토픽

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s057-l"></a>`R-S057-L` | 배치: 가로 관련 토픽·중앙 이름·집계·추천 기사 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G30](CONTRACTS.md#g30), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V03](../FE_MEDIUM_PARITY_BACKLOG.md#v03) |
| <a id="r-s057-d"></a>`R-S057-D` | 표시값·입력: 7.1M followers, 1.3M Stories | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G30](CONTRACTS.md#g30), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V03](../FE_MEDIUM_PARITY_BACKLOG.md#v03) |
| <a id="r-s057-s"></a>`R-S057-S` | 상태: Life 미팔로우 상태 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G30](CONTRACTS.md#g30), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V03](../FE_MEDIUM_PARITY_BACKLOG.md#v03) |
| <a id="r-s057-c01"></a>`R-S057-C01` | 컨트롤: Follow | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G30](CONTRACTS.md#g30) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V03](../FE_MEDIUM_PARITY_BACKLOG.md#v03) |
| <a id="r-s057-c02"></a>`R-S057-C02` | 컨트롤: 공유 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G30](CONTRACTS.md#g30), [G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V03](../FE_MEDIUM_PARITY_BACKLOG.md#v03) |
| <a id="r-s057-c03"></a>`R-S057-C03` | 컨트롤: 관련 토픽 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G30](CONTRACTS.md#g30) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V03](../FE_MEDIUM_PARITY_BACKLOG.md#v03) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S057](UNKNOWN.md#u-s057)

<a id="s058"></a>

## S058 — 다크 Library

- Parity 7 최신 검토: [저장·목록·메모·순서 결과](../FE_MEDIUM_PARITY_07_RESULT.md). 기능/브라우저·원본 차이·미확인/native를 분리한다. 아래 초기 판정은 감사 당시 이력이다.

안정 원본 ID: `sc_4a39ee1d768342a9823787c11c851479` · [원본 분석](<../../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>):180 · [원본 PNG](<../../medium/flows/Profile/Settings/Switching to dark mode/screens/05_sc_4a39ee1d768342a9823787c11c851479.png>)

흐름 맥락: [F62/05](FLOWS.md#f62)

FE 조사 경로: [LibraryScreen.tsx](<../../FE/src/features/bookmarks/LibraryScreen.tsx>), [HighlightList.tsx](<../../FE/src/features/highlights/HighlightList.tsx>)

기본 담당: [G34](CONTRACTS.md#g34) · 실행 작업: [V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24)

**화면별 수용 조건:** 가로5탭, 초기 배너/닫기·Digest New, New list, 빈/3개/4개 카드 썸네일/잠금/다운로드/메뉴, Highlighted 구절·작성자·원문 링크를 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. DarkLibrary저장3기사·공유프로필사진 대조. 원본4기사/커버와차이, 실제저장결과를유지. ([과거 기록](<../FE_GOAL_53_RESULT.md>):252)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** New list, 다운로드, 더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s058-l"></a>`R-S058-L` | 배치: 어두운 리스트 카드·썸네일 유지 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s058-d"></a>`R-S058-D` | 표시값·입력: Reading list4 stories·자물쇠 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s058-s"></a>`R-S058-S` | 상태: 라이브러리 테마 적용 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s058-c01"></a>`R-S058-C01` | 컨트롤: New list | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s058-c02"></a>`R-S058-C02` | 컨트롤: 다운로드 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G34](CONTRACTS.md#g34), [G35](CONTRACTS.md#g35) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s058-c03"></a>`R-S058-C03` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S058](UNKNOWN.md#u-s058)

<a id="s059"></a>

## S059 — Member 혜택과 Friend 플랜 노출

안정 원본 ID: `sc_4beaf37694cb429baac5c27b93a71ccf` · [원본 분석](<../../medium/flows/Onboarding/Subscribing to Medium/ANALYSIS.md>):88 · [원본 PNG](<../../medium/flows/Onboarding/Subscribing to Medium/screens/02_sc_4beaf37694cb429baac5c27b93a71ccf.png>)

흐름 맥락: [F54/02](FLOWS.md#f54)

FE 조사 경로: [MembershipSheet.tsx](<../../FE/src/features/membership/MembershipSheet.tsx>)

기본 담당: [G48](CONTRACTS.md#g48) · 실행 작업: [V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31)

**화면별 수용 조건:** 월/년 선택, SGD 가격·Save up to $39·혜택·Friend 카드, loading 덮개, 성공 팝업 OK와Start reading을 비교한다. 실제 구매 완료로 표시하지 않는다. Q12에서 모의 결제 안내의 노출·배치 차이를 함께 판정한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. BFree에서Member선택 가능. 기존 원본SGD가격보관값/계층 대조, mock표시와 버튼·행간 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):253)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Select, 닫기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s059-l"></a>`R-S059-L` | 배치: 멤버십 시트 스크롤 중 Member 전체 카드와 다음 Friend 카드 일부 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G48](CONTRACTS.md#g48), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="r-s059-d"></a>`R-S059-D` | 표시값·입력: Member $6.98 SGD/month, Friend $19.98 SGD/month | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G48](CONTRACTS.md#g48), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="r-s059-s"></a>`R-S059-S` | 상태: 오프라인·오디오 등 혜택 설명 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G48](CONTRACTS.md#g48), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="r-s059-c01"></a>`R-S059-C01` | 컨트롤: Select | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G48](CONTRACTS.md#g48) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="r-s059-c02"></a>`R-S059-C02` | 컨트롤: 닫기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G48](CONTRACTS.md#g48) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |


원본 해석 경계: 혜택에는 유료 글 읽기, 작가 지원, 글 수익, 오디오, 앱 오프라인 읽기, Mastodon 커뮤니티, 커스텀 도메인, Publication 생성이 열거된다. 안내에 Cancel anytime이 있지만 취소·환불 실행 화면은 없다.

미확인 사항: [U-S059](UNKNOWN.md#u-s059)

<a id="s060"></a>

## S060 — 제목과 본문 입력

- Parity9: 제목/본문·서식·선택의 저장/재개/발행 연결 확인; 원본 입력은 사용자가 재현하며 기본값 강제 없음. [모든 R의 현재 판정·검증](../FE_MEDIUM_PARITY_09_RESULT.md). 과거 관찰/계약은 보존하며 시각 동일성 완료로 승격하지 않는다.

안정 원본 ID: `sc_4db886af7d024100a72b9e02fa3c1ee8` · [원본 분석](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>):124 · [원본 PNG](<../../medium/flows/Home/Publishing a story/screens/03_sc_4db886af7d024100a72b9e02fa3c1ee8.png>)

흐름 맥락: [F08/03](FLOWS.md#f08)

FE 조사 경로: [RichDocumentBody.tsx](<../../FE/src/features/editor/RichDocumentBody.tsx>), [editorModel.ts](<../../FE/src/features/editor/editorModel.ts>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>)

기본 담당: [G36](CONTRACTS.md#g36) · 실행 작업: [V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07)

**화면별 수용 조건:** 제목과 본문, 회색 문자 스타일, 이탤릭 인용선, bullet, 점3개 구분선, 선택 중 도구 색과 키보드 위 툴바를 비교한다. 코드 도구의 실행 후 모습은 원본 미확인이다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 같은 제목/본문 실제 입력. Georgia 등 원본 글꼴·줄바꿈, 자체 autosave 상태, 웹의 OS 키보드 부재 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):254)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Close, 더보기, Next, 서식·이미지 도구

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s060-l"></a>`R-S060-L` | 배치: 굵은 제목과 세리프 본문, 키보드 위 편집 도구 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G36](CONTRACTS.md#g36), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s060-d"></a>`R-S060-D` | 표시값·입력: The Silence between Notes 제목과 음악 관련 단락 입력 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G36](CONTRACTS.md#g36), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s060-s"></a>`R-S060-S` | 상태: 본문 끝 커서 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G36](CONTRACTS.md#g36), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s060-c01"></a>`R-S060-C01` | 컨트롤: Close | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s060-c02"></a>`R-S060-C02` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s060-c03"></a>`R-S060-C03` | 컨트롤: Next | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s060-c04"></a>`R-S060-C04` | 컨트롤: 문자 스타일 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s060-c05"></a>`R-S060-C05` | 컨트롤: 인용 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s060-c06"></a>`R-S060-C06` | 컨트롤: 목록 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s060-c07"></a>`R-S060-C07` | 컨트롤: 구분선 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s060-c08"></a>`R-S060-C08` | 컨트롤: 멘션 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G38](CONTRACTS.md#g38) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s060-c09"></a>`R-S060-C09` | 컨트롤: 코드 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s060-c10"></a>`R-S060-C10` | 컨트롤: 이미지 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G37](CONTRACTS.md#g37) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s060-c11"></a>`R-S060-C11` | 컨트롤: 제목·본문 입력 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S060](UNKNOWN.md#u-s060)

<a id="s061"></a>

## S061 — Featured 기사 목록

안정 원본 ID: `sc_4ec0a8b65f954b0984ece5b3b9f258e4` · [원본 분석](<../../medium/flows/Home/ANALYSIS.md>):147 · [원본 PNG](<../../medium/flows/Home/screens/04_sc_4ec0a8b65f954b0984ece5b3b9f258e4.png>)

흐름 맥락: [F05/04](FLOWS.md#f05)

FE 조사 경로: [HomeFeedScreen.tsx](<../../FE/src/features/feed/HomeFeedScreen.tsx>), [FollowingFeed.tsx](<../../FE/src/features/community/FollowingFeed.tsx>)

기본 담당: [G50](CONTRACTS.md#g50) · 실행 작업: [V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01)

**화면별 수용 조건:** For you의 원형 −와 Featured의 북마크를 구분한다. 헤더 접힘, 탭 가로 위치, New 배지, 알림 점, 빈 Featured CTA와 채워진 목록을 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Featured 실제 정상 fixture. 두 기사·북마크/더보기·뒤로 확인. 미수록된 세 번째 글 전체와 계정 표시/실응답 수 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):255)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 저장, 더보기, 작성, 알림

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s061-l"></a>`R-S061-L` | 배치: 동일 홈 구조에 발행물별 기사 카드 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s061-d"></a>`R-S061-D` | 표시값·입력: Featured 선택. 저장 아이콘 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s061-s"></a>`R-S061-S` | 상태: Featured 콘텐츠가 있는 상태 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s061-c01"></a>`R-S061-C01` | 컨트롤: 저장 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s061-c02"></a>`R-S061-C02` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s061-c03"></a>`R-S061-C03` | 컨트롤: 작성 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s061-c04"></a>`R-S061-C04` | 컨트롤: 알림 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |


원본 해석 경계: Featured 카드에는 북마크+ 아이콘이 보인다. For you의 원형 −와 카드 액션 구성이 다르므로 공통 저장 버튼으로 일괄 모델링하지 않는다.

미확인 사항: [U-S061](UNKNOWN.md#u-s061)

<a id="s062"></a>

## S062 — 새 응답 표시

- **Parity10 판정:** YOU를 별도 배지로 분리. 작성 후 실제 경과 초 표시. 비교 모드832→833, 일반 모드7→8. 실제 원본 계정 이름/사진은 동일하지 않음. [이번 코드/검사·한계](../FE_MEDIUM_PARITY_10_RESULT.md#screen-status). 원본·과거 판정은 아래에 보존한다.

안정 원본 ID: `sc_500793b8306c411585ba54ddaf6a8f25` · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Commenting a story/ANALYSIS.md>):115 · [원본 PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/screens/03_sc_500793b8306c411585ba54ddaf6a8f25.png>)

흐름 맥락: [F31/03](FLOWS.md#f31), [F32/01](FLOWS.md#f32), [F33/01](FLOWS.md#f33)

FE 조사 경로: [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>)

기본 담당: [G26](CONTRACTS.md#g26) · 실행 작업: [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20)

**화면별 수용 조건:** 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 작성한 댓글이 상단. 원본시간/집계와 실제이름/토스트 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):256)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 본인 더보기, Reply

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s062-l"></a>`R-S062-L` | 배치: 응답 목록 맨 위 Alex Smith YOU | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s062-d"></a>`R-S062-D` | 표시값·입력: Responses 833, 2 seconds ago, 입력한 문장 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s062-s"></a>`R-S062-S` | 상태: Responses 833 및 본인 새 응답 표시. Commenting a story 흐름의 직전 입력 화면에서는 832였다 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s062-c01"></a>`R-S062-C01` | 컨트롤: 본인 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s062-c02"></a>`R-S062-C02` | 컨트롤: Reply | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |


원본 해석 경계: YOU 표식과 본인 응답의 연한 박수 아이콘이 함께 보인다. 타인의 검은 박수 아이콘과 시각적 차이는 있으나 본인 박수 차단 API 규칙은 별도 검증 대상이다.

미확인 사항: [U-S062](UNKNOWN.md#u-s062)

<a id="s063"></a>

## S063 — 읽기 표시 설정 기본

안정 원본 ID: `sc_557c1fb7c6bf4dcc82ba1d6aba677f94` · [원본 분석](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>):121 · [원본 PNG](<../../medium/flows/Home/Story detail/Changing display/screens/03_sc_557c1fb7c6bf4dcc82ba1d6aba677f94.png>)

흐름 맥락: [F24/03](FLOWS.md#f24)

FE 조사 경로: [ArticleDisplayPopover.tsx](<../../FE/src/features/settings/ArticleDisplayPopover.tsx>), [useReaderTypography.ts](<../../FE/src/features/settings/useReaderTypography.ts>)

기본 담당: [G24](CONTRACTS.md#g24) · 실행 작업: [V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16)

**화면별 수용 조건:** 100→120과 배경 제목 줄바꿈, Font family 행, Appearance 하위 선택, 타인 Highlight on/off와 어두운 팝오버를 비교한다. 본인 저장 강조 삭제와 분리한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 표시설정Font/Appearance/Highlights컨트롤. wrap행의세로정렬수정, 48터치·폰트·nativeblur차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):257)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 작은/큰 A, 글꼴, Appearance, 토글

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s063-l"></a>`R-S063-L` | 배치: 상단 크기 조절과 3개 설정 행 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G24](CONTRACTS.md#g24), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s063-d"></a>`R-S063-D` | 표시값·입력: 100%, Font Default, System default (Light), Highlights from others 켜짐 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G24](CONTRACTS.md#g24), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s063-s"></a>`R-S063-S` | 상태: 이 캡처의 현재 표시 설정: 100%, Default 글꼴, System default (Light), 타인 하이라이트 On. 제품 전체 초기 기본값 여부는 미확인. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G24](CONTRACTS.md#g24), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s063-c01"></a>`R-S063-C01` | 컨트롤: 작은 A | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s063-c02"></a>`R-S063-C02` | 컨트롤: 큰 A | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s063-c03"></a>`R-S063-C03` | 컨트롤: Font family | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s063-c04"></a>`R-S063-C04` | 컨트롤: Appearance | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s063-c05"></a>`R-S063-C05` | 컨트롤: Highlights from others 토글 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |


원본 해석 경계: 글꼴 선택 컨트롤은 있으나 펼친 글꼴 목록은 수록되지 않았다. 별도 Save 버튼은 보이지 않으며 설정 변경 뒤 화면 반영만 관찰했다.

미확인 사항: [U-S063](UNKNOWN.md#u-s063)

<a id="s064"></a>

## S064 — 가입 인증 코드 입력 완료

**Parity14 개별 판정:** [S064 실행·R/T/U/C](../FE_MEDIUM_PARITY_14_RESULT.md#screens). 가입 코드 입력·오입력·재전송·Validate·신규 A 온보딩 연결 확인. 메일 발송/실제 인증 없음. 원본 요구·readiness는 유지한다.

안정 원본 ID: `sc_55d8ee5f826740d69ebd2e163aaa6486` · [원본 분석](<../../medium/flows/Onboarding/ANALYSIS.md>):216 · [원본 PNG](<../../medium/flows/Onboarding/screens/06_sc_55d8ee5f826740d69ebd2e163aaa6486.png>)

흐름 맥락: [F53/06](FLOWS.md#f53)

FE 조사 경로: [AuthDialogs.tsx](<../../FE/src/features/auth/AuthDialogs.tsx>), [EmailLogin.tsx](<../../FE/src/features/auth/EmailLogin.tsx>), [createEmailAttempt.ts](<../../FE/src/features/auth/createEmailAttempt.ts>)

기본 담당: [G40](CONTRACTS.md#g40) · 실행 작업: [V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29)

**화면별 수용 조건:** 가입4/로그인5 제공자, 이메일/이름/약관/뒤로·6칸 코드와Validate·Resend·닫기, Sign out Cancel/Confirm→intro를 비교한다. 빈 폼의 녹색 버튼과 실제 입력 검증은 별개다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 가입코드6칸/Validate 연결. 테스트코드123456·mock안내/닫기·서체 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):258)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Validate가 어두운색으로 바뀌고 Resend code는 유지된다.

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s064-l"></a>`R-S064-L` | 배치: 동일한 인증 시트에서 입력 여섯 칸이 채워졌다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s064-d"></a>`R-S064-D` | 표시값·입력: 6자리 숫자가 입력돼 있다. 실제 인증 값은 문서에 재기록하지 않는다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s064-s"></a>`R-S064-S` | 상태: 입력 완성에 따른 제출 가능 표현이다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s064-c01"></a>`R-S064-C01` | 컨트롤: Validate 어두운색 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s064-c02"></a>`R-S064-C02` | 컨트롤: Resend code | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s064-c03"></a>`R-S064-C03` | 컨트롤: 닫기 X | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s064-c04"></a>`R-S064-C04` | 컨트롤: 인증 코드 여섯 칸 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S064](UNKNOWN.md#u-s064)

<a id="s065"></a>

## S065 — Music 선택

- Parity9: 검색X와chipX/행체크/취소/저장 구분; 새 스크롤 렌더 대기. [모든 R의 현재 판정·검증](../FE_MEDIUM_PARITY_09_RESULT.md). 과거 관찰/계약은 보존하며 시각 동일성 완료로 승격하지 않는다.

안정 원본 ID: `sc_57162331e2334952b5da8676e4de3c22` · [원본 분석](<../../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>):149 · [원본 PNG](<../../medium/flows/Home/Publishing a story/Adding topics/screens/04_sc_57162331e2334952b5da8676e4de3c22.png>)

흐름 맥락: [F07/04](FLOWS.md#f07)

FE 조사 경로: [PublishTopics.tsx](<../../FE/src/features/editor/PublishTopics.tsx>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>)

기본 담당: [G39](CONTRACTS.md#g39) · 실행 작업: [V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06)

**화면별 수용 조건:** 검색 X와 chip X, 0/5·3/5·최대5, 빈값 Save의 모양, 미리보기 Edit/Publication/Unlisted/Publish now와 스크롤 헤더를 각각 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 선택 체크/칩 동시 표시·삭제 경로 확인. 칩 글자/배경/가로 여백 보정. ([과거 기록](<../FE_GOAL_53_RESULT.md>):259)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 칩 X, 결과 체크, Save

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s065-l"></a>`R-S065-L` | 배치: 검색 아래 삭제 가능한 칩과 결과 체크 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G39](CONTRACTS.md#g39), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s065-d"></a>`R-S065-D` | 표시값·입력: Music 1개 선택 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G39](CONTRACTS.md#g39), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s065-s"></a>`R-S065-S` | 상태: 선택 상태 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G39](CONTRACTS.md#g39), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s065-c01"></a>`R-S065-C01` | 컨트롤: 칩 X | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s065-c02"></a>`R-S065-C02` | 컨트롤: 결과 체크 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s065-c03"></a>`R-S065-C03` | 컨트롤: Save | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |


원본 해석 경계: 검색어 지우기 X와 선택된 토픽 칩의 X는 서로 다른 컨트롤이다. 선택 행의 체크와 칩이 동시에 보이며 Save로 편집을 반영하는 경로가 표시된다.

미확인 사항: [U-S065](UNKNOWN.md#u-s065)

<a id="s066"></a>

## S066 — 저장 글 있는 읽기 목록

- Parity 7 최신 검토: [저장·목록·메모·순서 결과](../FE_MEDIUM_PARITY_07_RESULT.md). 기능/브라우저·원본 차이·미확인/native를 분리한다. 아래 초기 판정은 감사 당시 이력이다.

안정 원본 ID: `sc_57450c38bf994be18d95fcaf712c56ba` · [원본 분석](<../../medium/flows/Library/ANALYSIS.md>):117 · [원본 PNG](<../../medium/flows/Library/screens/03_sc_57450c38bf994be18d95fcaf712c56ba.png>)

흐름 맥락: [F41/03](FLOWS.md#f41), [F42/01](FLOWS.md#f42)

FE 조사 경로: [LibraryScreen.tsx](<../../FE/src/features/bookmarks/LibraryScreen.tsx>), [HighlightList.tsx](<../../FE/src/features/highlights/HighlightList.tsx>)

기본 담당: [G34](CONTRACTS.md#g34) · 실행 작업: [V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24)

**화면별 수용 조건:** 가로5탭, 초기 배너/닫기·Digest New, New list, 빈/3개/4개 카드 썸네일/잠금/다운로드/메뉴, Highlighted 구절·작성자·원문 링크를 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 실제3기사 저장 후 소개 숨김 확인. 원본3기사와 선택한 기사/커버/순서가 다름. ([과거 기록](<../FE_GOAL_53_RESULT.md>):260)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 다운로드, 더보기, 카드

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s066-l"></a>`R-S066-L` | 배치: Your lists의 Reading list 카드·3개 썸네일 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s066-d"></a>`R-S066-D` | 표시값·입력: 3 stories·자물쇠 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s066-s"></a>`R-S066-S` | 상태: 기본 목록에 글 존재 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s066-c01"></a>`R-S066-C01` | 컨트롤: 다운로드 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G34](CONTRACTS.md#g34), [G35](CONTRACTS.md#g35) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s066-c02"></a>`R-S066-C02` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s066-c03"></a>`R-S066-C03` | 컨트롤: 카드 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S066](UNKNOWN.md#u-s066)

<a id="s067"></a>

## S067 — 관심 주제 미선택

**Parity14 개별 판정:** [S067 실행·R/T/U/C](../FE_MEDIUM_PARITY_14_RESULT.md#screens). 최소3개 안내·0/1/2 비활성/3 활성·선택 초안·뒤로·확정 재개 확인. 원본 요구·readiness는 유지한다.

안정 원본 ID: `sc_5843ae43bf154aadb5507c6fa51d150d` · [원본 분석](<../../medium/flows/Onboarding/ANALYSIS.md>):276 · [원본 PNG](<../../medium/flows/Onboarding/screens/08_sc_5843ae43bf154aadb5507c6fa51d150d.png>)

흐름 맥락: [F53/08](FLOWS.md#f53)

FE 조사 경로: [OnboardingScreen.tsx](<../../FE/src/features/onboarding/OnboardingScreen.tsx>), [createOnboardingSession.ts](<../../FE/src/features/onboarding/createOnboardingSession.ts>)

기본 담당: [G41](CONTRACTS.md#g41) · 실행 작업: [V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30)

**화면별 수용 조건:** 브랜드 시작, 새 경험 소개, 최소3개 안내와 관찰5개 선택, Follow/Finish, Enable/Skip와 다음 목적지를 확인한다. 모든 계정에 동일 순서를 강제하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 관심사 미선택/3개 최소/Next비활성. 칩48논리영역으로 줄간격·하단 보이는 범위 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):261)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 뒤로 가기와 회색 Next가 있다.

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s067-l"></a>`R-S067-L` | 배치: 제목·설명 아래 다수 주제 칩을 줄바꿈 배치하고 하단에 Next를 둔다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G41](CONTRACTS.md#g41), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="r-s067-d"></a>`R-S067-D` | 표시값·입력: 주제 3개 이상 선택 안내가 있고 보이는 칩은 미선택이다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G41](CONTRACTS.md#g41), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="r-s067-s"></a>`R-S067-S` | 상태: 최소 선택 개수를 안내하는 초기 상태다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G41](CONTRACTS.md#g41), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="r-s067-c01"></a>`R-S067-C01` | 컨트롤: 주제 chip | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G41](CONTRACTS.md#g41) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="r-s067-c02"></a>`R-S067-C02` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G41](CONTRACTS.md#g41) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="r-s067-c03"></a>`R-S067-C03` | 컨트롤: Next 회색 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G41](CONTRACTS.md#g41) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S067](UNKNOWN.md#u-s067)

<a id="s068"></a>

## S068 — 알림 목록

안정 원본 ID: `sc_5d1c7181dea04ba59b57242abbc19fee` · [원본 분석](<../../medium/flows/Home/Notifications/ANALYSIS.md>):84 · [원본 PNG](<../../medium/flows/Home/Notifications/screens/02_sc_5d1c7181dea04ba59b57242abbc19fee.png>)

흐름 맥락: [F06/02](FLOWS.md#f06)

FE 조사 경로: [NotificationsScreen.tsx](<../../FE/src/features/notifications/NotificationsScreen.tsx>)

기본 담당: [G44](CONTRACTS.md#g44) · 실행 작업: [V05](../FE_MEDIUM_PARITY_BACKLOG.md#v05)

**화면별 수용 조건:** 원본 네 행의 사용자·목록·글 이벤트, Follow가 있는 행, 녹색선, 날짜·아이콘을 고정 fixture에서 비교한다. 녹색선을 원본 읽음 정책으로 단정하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 알림 정상 기능 fixture와 원본4행 대조. actor/subject/종류5건은 기능 연결 검증용이라 원본4행 데이터 재현이 아님. 기존 참조 fixture 별도 기록 예정. ([과거 기록](<../FE_GOAL_53_RESULT.md>):262)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Follow, 알림 행, 뒤로

**이번 증거 해석:** 기존 비교 파일과 당시 해시 일치. 원본4행과 기능 fixture5행 차이, 정확 참조 fixture 재현은 미검증. 위 예정/진행 문구는 과거 이력이며 이번 새 촬영이 아니다. [최신 증거 판정](../FE_MEDIUM_PARITY_AUDIT.md#evidence), [Q09](../FE_MEDIUM_PARITY_BACKLOG.md#q09).

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s068-l"></a>`R-S068-L` | 배치: 행별 아바타·이벤트 문장·날짜, 일부 왼쪽 녹색선 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G44](CONTRACTS.md#g44), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V05](../FE_MEDIUM_PARITY_BACKLOG.md#v05) |
| <a id="r-s068-d"></a>`R-S068-D` | 표시값·입력: 새 팔로워·저장 리스트 새 글·박수 이벤트 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G44](CONTRACTS.md#g44), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V05](../FE_MEDIUM_PARITY_BACKLOG.md#v05) |
| <a id="r-s068-s"></a>`R-S068-S` | 상태: 여러 종류 알림 존재 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G44](CONTRACTS.md#g44), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V05](../FE_MEDIUM_PARITY_BACKLOG.md#v05) |
| <a id="r-s068-c01"></a>`R-S068-C01` | 컨트롤: Follow | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28), [G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V05](../FE_MEDIUM_PARITY_BACKLOG.md#v05) |
| <a id="r-s068-c02"></a>`R-S068-C02` | 컨트롤: 알림 행 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V05](../FE_MEDIUM_PARITY_BACKLOG.md#v05) |
| <a id="r-s068-c03"></a>`R-S068-C03` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V05](../FE_MEDIUM_PARITY_BACKLOG.md#v05) |


원본 해석 경계: 새 팔로워 행은 Follow를 제공하지만 리스트 갱신·박수 행에는 같은 버튼이 없다. 행별 대상이 사용자·리스트·글로 달라 알림 클릭의 목적지와 읽음 처리를 이벤트 유형별로 확인해야 한다.

미확인 사항: [U-S068](UNKNOWN.md#u-s068)

<a id="s069"></a>

## S069 — For you 홈 피드

안정 원본 ID: `sc_5e0ba0e498ff49579bf838096aec4b5e` · [원본 분석](<../../medium/flows/Explore/ANALYSIS.md>):57 · [원본 PNG](<../../medium/flows/Explore/screens/01_sc_5e0ba0e498ff49579bf838096aec4b5e.png>)

흐름 맥락: [F01/01](FLOWS.md#f01), [F05/01](FLOWS.md#f05), [F06/01](FLOWS.md#f06), [F08/01](FLOWS.md#f08), [F12/01](FLOWS.md#f12), [F41/01](FLOWS.md#f41), [F52/07](FLOWS.md#f52), [F53/13](FLOWS.md#f53), [F54/06](FLOWS.md#f54), [F55/01](FLOWS.md#f55)

FE 조사 경로: [HomeFeedScreen.tsx](<../../FE/src/features/feed/HomeFeedScreen.tsx>), [FollowingFeed.tsx](<../../FE/src/features/community/FollowingFeed.tsx>)

기본 담당: [G50](CONTRACTS.md#g50) · 실행 작업: [V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01)

**화면별 수용 조건:** For you의 원형 −와 Featured의 북마크를 구분한다. 헤더 접힘, 탭 가로 위치, New 배지, 알림 점, 빈 Featured CTA와 채워진 목록을 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Home 카드/정렬/작성/하단 탭 배치 비교. 반응은 계정별 실제 mock 저장소를 사용해 원본 누적 응답 수와 다름. ([과거 기록](<../FE_GOAL_53_RESULT.md>):263)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** +, For you·Following·Featured 탭, 카드의 원형 − 아이콘·더보기, 알림, 작성, 하단 홈·탐색·라이브러리·프로필

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s069-l"></a>`R-S069-L` | 배치: 상단 Home·알림, 가로 탭, 세로 기사 카드, 하단 4탭과 작성 플로팅 버튼 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s069-d"></a>`R-S069-D` | 표시값·입력: For you 활성. 작가·제목·요약·썸네일·날짜·박수·응답 수 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s069-s"></a>`R-S069-S` | 상태: 추천 기사 목록 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s069-c01"></a>`R-S069-C01` | 컨트롤: + | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s069-c02"></a>`R-S069-C02` | 컨트롤: For you | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s069-c03"></a>`R-S069-C03` | 컨트롤: Following | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s069-c04"></a>`R-S069-C04` | 컨트롤: Featured | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s069-c05"></a>`R-S069-C05` | 컨트롤: 토픽 탭 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s069-c06"></a>`R-S069-C06` | 컨트롤: 카드 원형 − | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s069-c07"></a>`R-S069-C07` | 컨트롤: 카드 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s069-c08"></a>`R-S069-C08` | 컨트롤: 알림 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s069-c09"></a>`R-S069-C09` | 컨트롤: 작성 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s069-c10"></a>`R-S069-C10` | 컨트롤: 하단 Home | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s069-c11"></a>`R-S069-C11` | 컨트롤: 하단 Explore | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s069-c12"></a>`R-S069-C12` | 컨트롤: 하단 Library | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s069-c13"></a>`R-S069-C13` | 컨트롤: 하단 Profile | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s069-v"></a>`R-S069-V` | PNG 추가 세부 관찰: Featured 옆 녹색 New 배지와 우측 잘린 토픽 탭, 선택된 Home 하단 아이콘, Profile 아이콘 위 멤버 별 표식도 비교 대상이다. | 일부 포함: 공통 시각 계약에 포함되나 이 요소 묶음의 독립 판정 필요<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |


원본 해석 경계: 카드 하단 원형 − 아이콘을 저장 아이콘으로 기록했던 부분을 교정했다. 아이콘의 실행 결과는 이 흐름에 없으며 기사 상세의 북마크와 구분한다.

미확인 사항: [U-S069](UNKNOWN.md#u-s069)

<a id="s070"></a>

## S070 — Explore 토픽 가로 이동

안정 원본 ID: `sc_602f368bf00a46b8b57d68f964ed6c16` · [원본 분석](<../../medium/flows/Explore/ANALYSIS.md>):118 · [원본 PNG](<../../medium/flows/Explore/screens/03_sc_602f368bf00a46b8b57d68f964ed6c16.png>)

흐름 맥락: [F01/03](FLOWS.md#f01), [F03/01](FLOWS.md#f03)

FE 조사 경로: [SearchScreen.tsx](<../../FE/src/features/search/SearchScreen.tsx>), [CatalogSearchResults.tsx](<../../FE/src/features/search/CatalogSearchResults.tsx>), [ExploreSections.tsx](<../../FE/src/features/search/ExploreSections.tsx>)

기본 담당: [G50](CONTRACTS.md#g50) · 실행 작업: [V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02)

**화면별 수용 조건:** 검색 빈 화면의 토픽 행, Stories 결과, 다섯 탭과 X를 분리한다. Trending 순위, Staff Picks 가로 카드, Recommended 세로 카드, Who to follow 가로 이동을 원본 상태별로 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 가로 주제 스크롤 후 Health/Life 진입 대조. 원본 19 hours와 fixture18 hours는 원본 시점별 표시 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):264)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 토픽 칩

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s070-l"></a>`R-S070-L` | 배치: 가로 칩 영역에 다른 주제 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s070-d"></a>`R-S070-D` | 표시값·입력: Health·Science·Business·Life 등 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s070-s"></a>`R-S070-S` | 상태: 가로 탐색 상태 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s070-c01"></a>`R-S070-C01` | 컨트롤: 토픽 칩 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G30](CONTRACTS.md#g30), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S070](UNKNOWN.md#u-s070)

<a id="s071"></a>

## S071 — 답글 생성 표시

- **Parity10 판정:** 답글 후 펼침/들여쓰기와 루트 집계 유지. 1초 표시 지원. 원본 미수록 답글 수/본문의 완전 재현은 잔여. [이번 코드/검사·한계](../FE_MEDIUM_PARITY_10_RESULT.md#screen-status). 원본·과거 판정은 아래에 보존한다.

안정 원본 ID: `sc_60bd813234264b59b304bd3ac3df0af4` · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Replying a response/ANALYSIS.md>):146 · [원본 PNG](<../../medium/flows/Home/Story detail/Responses/Replying a response/screens/04_sc_60bd813234264b59b304bd3ac3df0af4.png>)

흐름 맥락: [F35/04](FLOWS.md#f35)

FE 조사 경로: [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>)

기본 담당: [G26](CONTRACTS.md#g26) · 실행 작업: [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20)

**화면별 수용 조건:** 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 답글확정/부모ID보존. 캡처의 새답글위치가원본상단과달라재검토필요. ([과거 기록](<../FE_GOAL_53_RESULT.md>):265)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Reply, 더보기, See more replies

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s071-l"></a>`R-S071-L` | 배치: 들여쓴 YOU 응답·1 second ago | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s071-d"></a>`R-S071-D` | 표시값·입력: Agree!, Responses 832 유지 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s071-s"></a>`R-S071-S` | 상태: 새 답글 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s071-c01"></a>`R-S071-C01` | 컨트롤: Reply | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s071-c02"></a>`R-S071-C02` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s071-c03"></a>`R-S071-C03` | 컨트롤: See more replies | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S071](UNKNOWN.md#u-s071)

<a id="s072"></a>

## S072 — 답글 대상 선택

- **Parity10 판정:** 부모 한 행만 강조하던 차이를 자손 스레드까지 보완. Cancel은 지역 초안 폐기, 원문 보존. 부모 차단 중 전송 권한 재검사. [이번 코드/검사·한계](../FE_MEDIUM_PARITY_10_RESULT.md#screen-status). 원본·과거 판정은 아래에 보존한다.

안정 원본 ID: `sc_6101af9ca21443afbe2c2146c8ac2e3d` · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Replying a response/ANALYSIS.md>):86 · [원본 PNG](<../../medium/flows/Home/Story detail/Responses/Replying a response/screens/02_sc_6101af9ca21443afbe2c2146c8ac2e3d.png>)

흐름 맥락: [F35/02](FLOWS.md#f35)

FE 조사 경로: [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>)

기본 담당: [G26](CONTRACTS.md#g26) · 실행 작업: [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20)

**화면별 수용 조건:** 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Bérnie 답글대상/빈초안. 이전자기댓글존재와웹키보드조건차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):266)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Cancel, 작성창

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s072-l"></a>`R-S072-L` | 배치: 부모 응답과 하위 답글 위 회색 배경, 하단 대상 안내 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s072-d"></a>`R-S072-D` | 표시값·입력: Replying to Bérnie, 빈 작성창 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s072-s"></a>`R-S072-S` | 상태: 특정 응답에 답글 모드 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s072-c01"></a>`R-S072-C01` | 컨트롤: Cancel | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s072-c02"></a>`R-S072-C02` | 컨트롤: 작성창 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S072](UNKNOWN.md#u-s072)

<a id="s073"></a>

## S073 — 공유 이미지 저장 안내
- **Parity13 최신:** [R/T·현재 검사·원본 차이](../FE_MEDIUM_PARITY_13_RESULT.md#screen-status). 이번 실제 웹 부분 확인과 원본/시각/native 잔여를 구분한다. 기존 원본 요구·증거/readiness는 보존한다.

안정 원본 ID: `sc_62256b592ebc4b028f1097aa21f9e400` · [원본 분석](<../../medium/flows/Home/Story detail/Sharing a story/Downloading an image/ANALYSIS.md>):83 · [원본 PNG](<../../medium/flows/Home/Story detail/Sharing a story/Downloading an image/screens/02_sc_62256b592ebc4b028f1097aa21f9e400.png>)

흐름 맥락: [F40/02](FLOWS.md#f40)

FE 조사 경로: [ShareSheet.tsx](<../../FE/src/features/sharing/ShareSheet.tsx>), [ShareCard.tsx](<../../FE/src/features/sharing/ShareCard.tsx>)

기본 담당: [G47](CONTRACTS.md#g47) · 실행 작업: [V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23)

**화면별 수용 조건:** blur 배경·카드 테두리·회전 주소·페이지 점·행동 가로 이동, Copy link·Friend Link·Share via·Save image와 각 성공 토스트를 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 현재 웹 PNG 다운로드 성공과 안내 확인. 원본 photo-library 저장 성공과 구분; 동일 이미지 자산/배경 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):267)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 공유 행동 유지

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s073-l"></a>`R-S073-L` | 배치: 상단 Image saved to library 토스트 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G47](CONTRACTS.md#g47), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s073-d"></a>`R-S073-D` | 표시값·입력: 동일 카드 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G47](CONTRACTS.md#g47), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s073-s"></a>`R-S073-S` | 상태: 이미지 저장 성공 안내 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G47](CONTRACTS.md#g47), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s073-c01"></a>`R-S073-C01` | 컨트롤: 닫기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s073-c02"></a>`R-S073-C02` | 컨트롤: Copy link | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s073-c03"></a>`R-S073-C03` | 컨트롤: Friend Link | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s073-c04"></a>`R-S073-C04` | 컨트롤: Share via | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s073-c05"></a>`R-S073-C05` | 컨트롤: Save image | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s073-c06"></a>`R-S073-C06` | 컨트롤: 카드 페이지 점 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |


원본 해석 경계: 저장 대상은 공유용 카드 이미지다. Medium 기사 북마크·리스트 오프라인 다운로드와 다른 행동이며, Image saved to library 안내 뒤 실제 사진 앱 파일은 수록되지 않았다.

미확인 사항: [U-S073](UNKNOWN.md#u-s073)

<a id="s074"></a>

## S074 — 내 프로필 Lists

안정 원본 ID: `sc_64afef71457f48808c33def66fd6d90e` · [원본 분석](<../../medium/flows/Profile/ANALYSIS.md>):149 · [원본 PNG](<../../medium/flows/Profile/screens/04_sc_64afef71457f48808c33def66fd6d90e.png>)

흐름 맥락: [F55/04](FLOWS.md#f55)

FE 조사 경로: [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>)

기본 담당: [G42](CONTRACTS.md#g42) · 실행 작업: [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32)

**화면별 수용 조건:** Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 프로필Lists 기본목록 진입. 원본4기사를 자동fixture생성하지 않아 실제목록0; Continue setup/커버 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):268)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 다운로드, 더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s074-l"></a>`R-S074-L` | 배치: Lists 탭의 기본 Reading list | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s074-d"></a>`R-S074-D` | 표시값·입력: 4 stories·자물쇠 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s074-s"></a>`R-S074-S` | 상태: 소유자가 비공개 목록을 봄 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s074-c01"></a>`R-S074-C01` | 컨트롤: 다운로드 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G35](CONTRACTS.md#g35), [G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s074-c02"></a>`R-S074-C02` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S074](UNKNOWN.md#u-s074)

<a id="s075"></a>

## S075 — 앱 아이콘 선택과 멤버십 제한

안정 원본 ID: `sc_64b75d913b284d708ab44e4f3663a59f` · [원본 분석](<../../medium/flows/Profile/Settings/Custom app icon/ANALYSIS.md>):83 · [원본 PNG](<../../medium/flows/Profile/Settings/Custom app icon/screens/02_sc_64b75d913b284d708ab44e4f3663a59f.png>)

흐름 맥락: [F60/02](FLOWS.md#f60)

FE 조사 경로: [SettingsScreen.tsx](<../../FE/src/features/settings/SettingsScreen.tsx>), [SettingsExtrasScreen.tsx](<../../FE/src/features/settings/SettingsExtrasScreen.tsx>), [AppIconScreen.tsx](<../../FE/src/features/app-icon/AppIconScreen.tsx>)

기본 담당: [G49](CONTRACTS.md#g49) · 실행 작업: [V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33)

**화면별 수용 조건:** 모든 행과 섹션·외부 화살표·Facebook 안내·버전·Appearance 선택, 2열 아이콘8종·Wordmark Black선택·Friend잠금·하단잘림을 비교한다. 자체 K 자산을 원본과 동일로 세지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Customicon선택/잠금/멤버십진입 대조. 자체K아이콘8개는원본M및하단미확인아이콘과다름; 실제launcher실행대기. ([과거 기록](<../FE_GOAL_53_RESULT.md>):269)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 아이콘 카드, Become a Friend of Medium to unlock

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s075-l"></a>`R-S075-L` | 배치: 2열 아이콘 카드·하단 업그레이드 버튼 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G49](CONTRACTS.md#g49), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s075-d"></a>`R-S075-D` | 표시값·입력: Wordmark Black 선택, 다른 아이콘 흐림 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G49](CONTRACTS.md#g49), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s075-s"></a>`R-S075-S` | 상태: 아이콘 변경 기능 잠금 안내 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G49](CONTRACTS.md#g49), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s075-c01"></a>`R-S075-C01` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s075-c02"></a>`R-S075-C02` | 컨트롤: Wordmark Black | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s075-c03"></a>`R-S075-C03` | 컨트롤: Wordmark White | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s075-c04"></a>`R-S075-C04` | 컨트롤: Founder’s Choice Black | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s075-c05"></a>`R-S075-C05` | 컨트롤: Founder’s Choice White | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s075-c06"></a>`R-S075-C06` | 컨트롤: Friend Tier | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s075-c07"></a>`R-S075-C07` | 컨트롤: Throwback 2012 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s075-c08"></a>`R-S075-C08` | 컨트롤: Throwback 2015 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s075-c09"></a>`R-S075-C09` | 컨트롤: Throwback 2017 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s075-c10"></a>`R-S075-C10` | 컨트롤: Become a Friend of Medium to unlock | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G48](CONTRACTS.md#g48), [G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |


원본 해석 경계: 온전히 읽히는 선택지는 Wordmark Black/White, Founder's Choice Black/White, Friend Tier, Throwback 2012/2015/2017이다. 하단 일부 카드는 잘려 있어 전체 아이콘 개수를 확정하지 않는다. 다른 아이콘 선택·OS 홈 화면 결과는 없다.

미확인 사항: [U-S075](UNKNOWN.md#u-s075)
