# 화면별 원본 요구사항

**Parity17 검토(2026-11-24):** [18 S/139 R/31 T/33 U/21 C의 실제 결과·자체 정책·잔여](../FE_MEDIUM_PARITY_17_RESULT.md). 알림 점/빈 Featured·개인 정책 실패·공개 목록 접근/이탈을 대조했다. 원본18 PNG 직접 열람, 실제8081 메모리 비교이며 캡처 파일/도구 생성 없음.33 U·원본/자산/시각/native 및9~16 잔여 유지. 원본 요구·ID·과거 evidence/readiness를 승격하지 않는다.

**Parity14 커밋 전 추가 검토(2026-11-24):** [재검토·현재 검사·커밋 범위](../FE_MEDIUM_PARITY_14_RESULT.md#pre-commit-review). 추가 코드 결함 없이 타입/lint·관련12 suites/82 tests를 새로 통과했고 이번 act 경고0이다. 앞선 전체1722건 이후 코드 변경·552개 codeInputs 해시 불일치0. 사용자 요청에 따라36파일 로컬 커밋 범위를 확정했다. 원본/시각·S043/native 및9~13 잔여는 유지하며 push·배포·15 구현은 하지 않는다. 아래 미커밋 기록은 최초 실행 이력이다.

**Parity14 최초 구현·검증(2026-11-24):** [구현·이번 검사·원본 차이·담당](../FE_MEDIUM_PARITY_14_RESULT.md). V29/V30의16화면·99 R·19 T/U/C를 대조하고 이메일 약관/수명·추천 카탈로그/조회·온보딩 뒤로/source 경계를 보완했다. 타입/lint·최종 전체316 suites/1722 tests 통과, 이번 act 경고0. 실제8081 부분 대조와 자동 검증을 구분하며 S043은18/21, 원본 자산/시각/OS 대기는14 및 관련 담당에 유지한다.9~13의 잔여 이전·전체 종료 승인은 아니다. 커밋·push·배포·15 진행 없음.

**Parity11 추가 보완(2026-11-24):** [최신 판정·근거·담당](../FE_MEDIUM_PARITY_11_RESULT.md#additional-review). S012의 개인/타인 강조를 선택 입력에도 전달하도록 보완했다. 원본 R은 보존하며 실제 OS 표시와 배치 동일성은 미검증.

[검토 요약](../FE_MEDIUM_PARITY_AUDIT.md) · [보완 작업](../FE_MEDIUM_PARITY_BACKLOG.md) · [계약 원문](CONTRACTS.md) · [흐름 맥락](FLOWS.md) · [미확인 항목](UNKNOWN.md)

이번 목록은 원본에서 추출한 **관찰 요구사항**이다. L=배치, D=표시값/입력, S=상태, C=컨트롤, V=PNG 추가 세부 관찰이다. L/D/S는 원문 한 문장의 모든 요소를 포함하는 묶음이며 단일 버튼 수가 아니다. C는 명시적으로 나눈 조작점이다. 이 숫자를 기능 완성률의 분모로 사용하지 않는다.

`포함`은 기능 작업 범위에 있다는 판정이며 현재 FE 동일 재현 완료라는 뜻이 아니다. `일부 포함`은 공통/상위 계약은 있지만 개별 조건이 분산된 경우다. 코드 링크는 구현 조사 위치이며 자동으로 해당 요구의 통과를 증명하지 않는다. 과거 Goal53 판정은 당시 증거이고 현재 재촬영 결과가 아니다. 모든 행의 완료 조건은 해당 원본 PNG의 데이터·상태를 맞춘 비교와 FLOWS의 진입/복귀 검증을 함께 적용한다.


<a id="s001"></a>

## S001 — 타인 하이라이트 숨김

안정 원본 ID: `sc_00409287a68f4416941e39326f6df6b9` · [원본 분석](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>):242 · [원본 PNG](<../../medium/flows/Home/Story detail/Changing display/screens/07_sc_00409287a68f4416941e39326f6df6b9.png>)

흐름 맥락: [F24/07](FLOWS.md#f24)

FE 조사 경로: [ArticleDisplayPopover.tsx](<../../FE/src/features/settings/ArticleDisplayPopover.tsx>), [useReaderTypography.ts](<../../FE/src/features/settings/useReaderTypography.ts>)

기본 담당: [G24](CONTRACTS.md#g24) · 실행 작업: [V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16)

**화면별 수용 조건:** 100→120과 배경 제목 줄바꿈, Font family 행, Appearance 하위 선택, 타인 Highlight on/off와 어두운 팝오버를 비교한다. 본인 저장 강조 삭제와 분리한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Highlights off 선택 일치. 기본 앱 theme와 reader theme 독립 유지. ([과거 기록](<../FE_GOAL_53_RESULT.md>):195)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 토글

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s001-l"></a>`R-S001-L` | 배치: 다크 설정 팝오버 토글 회색 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G24](CONTRACTS.md#g24), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s001-d"></a>`R-S001-D` | 표시값·입력: Highlights from others 꺼짐 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G24](CONTRACTS.md#g24), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s001-s"></a>`R-S001-S` | 상태: 타인 하이라이트 표시 설정 변경 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G24](CONTRACTS.md#g24), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s001-c01"></a>`R-S001-C01` | 컨트롤: 토글 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |


원본 해석 경계: 타인 하이라이트 표시를 끄는 설정이다. 기존 개인 하이라이트 데이터 삭제로 모델링하지 않는다. 현재 문서의 하이라이트 노출 규칙은 6절에서 따로 대조한다.

미확인 사항: [U-S001](UNKNOWN.md#u-s001)

<a id="s002"></a>

## S002 — 리스트 메모 반영

- Parity 7 최신 검토: [저장·목록·메모·순서 결과](../FE_MEDIUM_PARITY_07_RESULT.md). 기능/브라우저·원본 차이·미확인/native를 분리한다. 아래 초기 판정은 감사 당시 이력이다.

안정 원본 ID: `sc_02d96a649c7a461b9c07155d33c1dbfc` · [원본 분석](<../../medium/flows/Library/List detail/Adding a note/ANALYSIS.md>):178 · [원본 PNG](<../../medium/flows/Library/List detail/Adding a note/screens/05_sc_02d96a649c7a461b9c07155d33c1dbfc.png>)

흐름 맥락: [F45/05](FLOWS.md#f45)

FE 조사 경로: [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>)

기본 담당: [G33](CONTRACTS.md#g33) · 실행 작업: [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25)

**화면별 수용 조건:** 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 확정 메모가 해당 기사 위에 표시되고 재진입 유지. Viewed 실제 상태 및 행 높이·스크롤 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):196)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 개별 더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s002-l"></a>`R-S002-L` | 배치: 대상 기사 위 세로선·이탤릭 메모 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s002-d"></a>`R-S002-D` | 표시값·입력: 입력한 메모 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s002-s"></a>`R-S002-S` | 상태: 메모 저장 결과 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s002-c01"></a>`R-S002-C01` | 컨트롤: 개별 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |


원본 해석 경계: 메모는 선택한 글 카드 바로 위에 붙는다. 기사의 본문 편집이나 작가에게 보내는 비공개 메시지와 구분해 리스트-기사 연결의 부가 정보 후보로 다룬다.

미확인 사항: [U-S002](UNKNOWN.md#u-s002)

<a id="s003"></a>

## S003 — 플레이어 더보기
- **Parity12 최신:** [요구별 상태·검사·잔여](../FE_MEDIUM_PARITY_12_RESULT.md#screen-status). 6행 메뉴 목적지/복귀 자동 검증. AirPlay 실제 전송 제외. 팝오버/자산 시각 잔여. 원본 관찰/기존 증거는 보존하며 새 실제 렌더 비교 완료가 아니다.


안정 원본 ID: `sc_0414c81870534989959d677ecede926c` · [원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>):88 · [원본 PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/02_sc_0414c81870534989959d677ecede926c.png>)

흐름 맥락: [F28/02](FLOWS.md#f28)

FE 조사 경로: [ListeningSpeedPanel.tsx](<../../FE/src/features/listening/ListeningSpeedPanel.tsx>), [ListeningVoicePanel.tsx](<../../FE/src/features/listening/ListeningVoicePanel.tsx>)

기본 담당: [G46](CONTRACTS.md#g46) · 실행 작업: [V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19)

**화면별 수용 조건:** 세로 slider·1x/200 WPM·2.5x/490 WPM·145% 문구, voice 언어 section/국기/성별/나라/선택색, Emma→Hans와 Done, 더보기6행을 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 더보기6행 연결, native blur/실제48px행 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):197)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** AirPlay, Select a voice, View story, Show less like this, Mute author, Report story

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s003-l"></a>`R-S003-L` | 배치: 재생기 위 6행 팝오버 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G46](CONTRACTS.md#g46), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s003-d"></a>`R-S003-D` | 표시값·입력: 현재 1x | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G46](CONTRACTS.md#g46), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s003-s"></a>`R-S003-S` | 상태: 음성·출력·콘텐츠 행동 메뉴 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G46](CONTRACTS.md#g46), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s003-c01"></a>`R-S003-C01` | 컨트롤: AirPlay | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G46](CONTRACTS.md#g46) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s003-c02"></a>`R-S003-C02` | 컨트롤: Select a voice | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G46](CONTRACTS.md#g46) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s003-c03"></a>`R-S003-C03` | 컨트롤: View story | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G46](CONTRACTS.md#g46) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s003-c04"></a>`R-S003-C04` | 컨트롤: Show less like this | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31), [G46](CONTRACTS.md#g46) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s003-c05"></a>`R-S003-C05` | 컨트롤: Mute author | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29), [G46](CONTRACTS.md#g46) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s003-c06"></a>`R-S003-C06` | 컨트롤: Report story | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29), [G46](CONTRACTS.md#g46) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S003](UNKNOWN.md#u-s003)

<a id="s004"></a>

## S004 — 검색 진입과 토픽 탐색

안정 원본 ID: `sc_047c91d900aa47448d61e4faacd68ad5` · [원본 분석](<../../medium/flows/Explore/Searching Medium/ANALYSIS.md>):84 · [원본 PNG](<../../medium/flows/Explore/Searching Medium/screens/02_sc_047c91d900aa47448d61e4faacd68ad5.png>)

흐름 맥락: [F02/02](FLOWS.md#f02)

FE 조사 경로: [SearchScreen.tsx](<../../FE/src/features/search/SearchScreen.tsx>), [CatalogSearchResults.tsx](<../../FE/src/features/search/CatalogSearchResults.tsx>), [ExploreSections.tsx](<../../FE/src/features/search/ExploreSections.tsx>)

기본 담당: [G50](CONTRACTS.md#g50) · 실행 작업: [V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02)

**화면별 수용 조건:** 검색 빈 화면의 토픽 행, Stories 결과, 다섯 탭과 X를 분리한다. Trending 순위, Staff Picks 가로 카드, Recommended 세로 카드, Who to follow 가로 이동을 원본 상태별로 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 검색창 blur 후 촬영. 주제16px/첫 간격 수정; 48논리 행과 원본 약44px, 앱 경제 주제 추가는 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):198)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 검색, 토픽 행, 뒤로

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s004-l"></a>`R-S004-L` | 배치: 검색창 아래 Explore topics 세로 목록 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s004-d"></a>`R-S004-D` | 표시값·입력: Life·Self Improvement·Work·Technology 등 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s004-s"></a>`R-S004-S` | 상태: 검색어 없는 탐색 화면 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s004-c01"></a>`R-S004-C01` | 컨트롤: 검색 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s004-c02"></a>`R-S004-C02` | 컨트롤: 토픽 행 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G30](CONTRACTS.md#g30), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s004-c03"></a>`R-S004-C03` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S004](UNKNOWN.md#u-s004)

<a id="s005"></a>

## S005 — 프로필 사진 선택 반영

- Parity15 현재 검토: [화면별 결과·R/T/U/C](../FE_MEDIUM_PARITY_15_RESULT.md#scope). 기능/실제8081 부분 대조와 원본 시각·동일 fixture·native 대기를 구분한다. 아래 원본 관찰과 최초 감사 이력은 유지한다.

안정 원본 ID: `sc_05df03a16c6b466b8ba91d9d6244c2f5` · [원본 분석](<../../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>):57 · [원본 PNG](<../../medium/flows/Profile/Editing profile information/Adding pronouns/screens/01_sc_05df03a16c6b466b8ba91d9d6244c2f5.png>)

흐름 맥락: [F56/01](FLOWS.md#f56), [F57/05](FLOWS.md#f57)

FE 조사 경로: [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>)

기본 담당: [G42](CONTRACTS.md#g42) · 실행 작업: [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32)

**화면별 수용 조건:** Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 부모편집 Updatephoto/50·4·160counter/About안내 대조. fixture사진/필드 높이 미세차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):199)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Save, Update photo

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s005-l"></a>`R-S005-L` | 배치: 편집 폼 아바타 변경 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s005-d"></a>`R-S005-D` | 표시값·입력: 이름 유지·대명사와 소개 빈값 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s005-s"></a>`R-S005-S` | 상태: 선택 사진 미리보기 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s005-c01"></a>`R-S005-C01` | 컨트롤: Save | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s005-c02"></a>`R-S005-C02` | 컨트롤: Update photo | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S005](UNKNOWN.md#u-s005)

<a id="s006"></a>

## S006 — 관심 주제 다중 선택

**Parity14 개별 판정:** [S006 실행·R/T/U/C](../FE_MEDIUM_PARITY_14_RESULT.md#screens). 관찰된 5개 선택과 0/1/2/3개 경계, 해제·재선택·진행을 확인. 추가 토픽은 기존 mock. 원본 요구·readiness는 유지한다.

안정 원본 ID: `sc_05f2a886f5464a728dd61a6291707a3d` · [원본 분석](<../../medium/flows/Onboarding/ANALYSIS.md>):306 · [원본 PNG](<../../medium/flows/Onboarding/screens/09_sc_05f2a886f5464a728dd61a6291707a3d.png>)

흐름 맥락: [F53/09](FLOWS.md#f53)

FE 조사 경로: [OnboardingScreen.tsx](<../../FE/src/features/onboarding/OnboardingScreen.tsx>), [createOnboardingSession.ts](<../../FE/src/features/onboarding/createOnboardingSession.ts>)

기본 담당: [G41](CONTRACTS.md#g41) · 실행 작업: [V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30)

**화면별 수용 조건:** 브랜드 시작, 새 경험 소개, 최소3개 안내와 관찰5개 선택, Follow/Finish, Enable/Skip와 다음 목적지를 확인한다. 모든 계정에 동일 순서를 강제하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 원본과 동일5관심사 선택/Next 가능. 칩 폰트/간격·스크롤 범위 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):200)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Next가 녹색으로 바뀐다.

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s006-l"></a>`R-S006-L` | 배치: 동일 칩 목록에서 선택 항목이 녹색으로 채워진다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G41](CONTRACTS.md#g41), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="r-s006-d"></a>`R-S006-D` | 표시값·입력: Technology·Self Improvement·Writing·Relationships·Psychology가 선택되어 있다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G41](CONTRACTS.md#g41), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="r-s006-s"></a>`R-S006-S` | 상태: 5개 주제 선택과 진행 버튼 변화가 관찰된다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G41](CONTRACTS.md#g41), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="r-s006-c01"></a>`R-S006-C01` | 컨트롤: Next가 녹색으로 바뀐다. | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G41](CONTRACTS.md#g41) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S006](UNKNOWN.md#u-s006)

<a id="s007"></a>

## S007 — 박수 전송 피드백

- **Parity10 판정:** 누적 박수 피드백/선택/만료는 기존 구현을 검토했다. 832 비교 옵션 추가. +16은 원본 피드백이며 터치16회 증거가 아니다. 정확 수·애니메이션 비교 대기. [이번 코드/검사·한계](../FE_MEDIUM_PARITY_10_RESULT.md#screen-status). 원본·과거 판정은 아래에 보존한다.

안정 원본 ID: `sc_0629a27b99a645cabe6e110b5d3d3d57` · [원본 분석](<../../medium/flows/Home/Story detail/Sending claps/ANALYSIS.md>):85 · [원본 PNG](<../../medium/flows/Home/Story detail/Sending claps/screens/02_sc_0629a27b99a645cabe6e110b5d3d3d57.png>)

흐름 맥락: [F38/02](FLOWS.md#f38)

FE 조사 경로: [ArticleDetailScreen.tsx](<../../FE/src/features/article/ArticleDetailScreen.tsx>), [ReferenceArticleView.tsx](<../../FE/src/features/article/ReferenceArticleView.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>)

기본 담당: [G25](CONTRACTS.md#g25) · 실행 작업: [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13)

**화면별 수용 조건:** 제목/부제/작가/읽기시간/표지 출처, 본문 강조·링크·삽입 이미지·토픽·작성자·응답 미리보기·관련 글·고정 반응 바를 각각 비교한다. +16은 입력 피드백이며 터치 횟수 증거가 아니다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 실제16회박수확정/피드백+16. OS길게누르기검증아님; 기존북마크상태/응답수·아이콘차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):201)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 검게 채워진 박수 아이콘

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s007-l"></a>`R-S007-L` | 배치: 기사 하단 박수 위 녹색 +16 애니메이션 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s007-d"></a>`R-S007-D` | 표시값·입력: 18K 집계, 응답 832 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s007-s"></a>`R-S007-S` | 상태: 박수 입력 피드백 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s007-c01"></a>`R-S007-C01` | 컨트롤: 검게 채워진 박수 아이콘 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |


원본 해석 경계: 18K는 축약된 집계라 +16 반응 후 숫자가 같아도 미반영으로 판단할 수 없다. +16 애니메이션을 개별 탭 16회의 실행 기록으로 환산하지 않는다.

미확인 사항: [U-S007](UNKNOWN.md#u-s007)

<a id="s008"></a>

## S008 — Medium Rules 정책 문서

- **1~8 잔여 정리:** 로고·아바타 원본 crop 연결과 개발 웹 비교272 보완. 일반 응답은 기존 mock 데이터이며 전문/현재 정책·도구 결과는 미확인. [현재 결과](../FE_MEDIUM_PARITY_01_08_REVIEW.md).

**Parity 3 추가 기록:** [구현·실행·재검토 결과](../FE_MEDIUM_PARITY_03_RESULT.md). 아래 감사 당시의 미구현/차이 판정은 과거 근거로 보존한다. 현재 [PolicyArticle](../../FE/src/features/responses/PolicyArticle.tsx)와 [전용 route 화면](../../FE/src/features/responses/PolicyArticleScreen.tsx)에 기사 구조·기존 mock 도구·복귀를 연결했다. R별 최신 상태는 결과 표를 따른다. V21 자산·서체·응답272 재현, U-S008/U-F34는 미완료/미확인이다. R-S008-V의 추가 원본 관찰로 세 번째 문단의 `newsworthiness` 밑줄을 확인해 구현했다.

현재 표시/본문 fixture: [mediumPolicyArticle.ts](../../FE/src/features/feed/data/mediumPolicyArticle.ts). 원본 표시값과 실제 mock 응답 수를 구분한다.

안정 원본 ID: `sc_063290fab51b4acd913212f85acde70d` · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Medium policy/ANALYSIS.md>):84 · [원본 PNG](<../../medium/flows/Home/Story detail/Responses/Medium policy/screens/02_sc_063290fab51b4acd913212f85acde70d.png>)

흐름 맥락: [F34/02](FLOWS.md#f34)

FE 조사 경로: [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [ResponsePolicyLink.tsx](<../../FE/src/features/responses/ResponsePolicyLink.tsx>)

기본 담당: [G26](CONTRACTS.md#g26) · 실행 작업: [V21](../FE_MEDIUM_PARITY_BACKLOG.md#v21)

**화면별 수용 조건:** S008에서 보이는 정책 기사 헤더·작성자·Follow·본문 강조·세 번째 문단 시작·상하단 도구를 개별 재현한다. 정책 전문의 미확인 영역과 보이는 요소의 누락을 혼동하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 기존 로컬 정책 발췌+공식원문링크. 원본 전체기사/반응바/작가행과 다른 보완화면으로 동일재현미완료. ([과거 기록](<../FE_GOAL_53_RESULT.md>):202)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 뒤로, 듣기, 더보기, Follow

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s008-l"></a>`R-S008-L` | 배치: Medium Policy 헤더·문서 제목·작성자·본문 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V21](../FE_MEDIUM_PARITY_BACKLOG.md#v21) |
| <a id="r-s008-d"></a>`R-S008-D` | 표시값·입력: 문서 표시일 May 26 2021, 11 min read | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V21](../FE_MEDIUM_PARITY_BACKLOG.md#v21) |
| <a id="r-s008-s"></a>`R-S008-S` | 상태: 응답에서 연결된 정책 읽기 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V21](../FE_MEDIUM_PARITY_BACKLOG.md#v21) |
| <a id="r-s008-c01"></a>`R-S008-C01` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V21](../FE_MEDIUM_PARITY_BACKLOG.md#v21) |
| <a id="r-s008-c02"></a>`R-S008-C02` | 컨트롤: 듣기 | 상세 작업화 필요: 정책 진입/원본 참조와 차이 기록은 있으나 이 요소의 구현·연결·종료 조건은 미완료<br>[G26](CONTRACTS.md#g26), [G45](CONTRACTS.md#g45) | 미구현: 현재 policy 분기는 발췌·외부 링크이며 이 원본 요소 없음<br>[D08](../FE_MEDIUM_PARITY_BACKLOG.md#d08) |
| <a id="r-s008-c03"></a>`R-S008-C03` | 컨트롤: 더보기 | 상세 작업화 필요: 정책 진입/원본 참조와 차이 기록은 있으나 이 요소의 구현·연결·종료 조건은 미완료<br>[G26](CONTRACTS.md#g26) | 미구현: 현재 policy 분기는 발췌·외부 링크이며 이 원본 요소 없음<br>[D08](../FE_MEDIUM_PARITY_BACKLOG.md#d08) |
| <a id="r-s008-c04"></a>`R-S008-C04` | 컨트롤: Medium 작성자 | 상세 작업화 필요: 정책 진입/원본 참조와 차이 기록은 있으나 이 요소의 구현·연결·종료 조건은 미완료<br>[G26](CONTRACTS.md#g26), [G28](CONTRACTS.md#g28) | 미구현: 현재 policy 분기는 발췌·외부 링크이며 이 원본 요소 없음<br>[D08](../FE_MEDIUM_PARITY_BACKLOG.md#d08) |
| <a id="r-s008-c05"></a>`R-S008-C05` | 컨트롤: Follow | 상세 작업화 필요: 정책 진입/원본 참조와 차이 기록은 있으나 이 요소의 구현·연결·종료 조건은 미완료<br>[G26](CONTRACTS.md#g26), [G28](CONTRACTS.md#g28) | 미구현: 현재 policy 분기는 발췌·외부 링크이며 이 원본 요소 없음<br>[D08](../FE_MEDIUM_PARITY_BACKLOG.md#d08) |
| <a id="r-s008-c06"></a>`R-S008-C06` | 컨트롤: 박수 54K | 상세 작업화 필요: 정책 진입/원본 참조와 차이 기록은 있으나 이 요소의 구현·연결·종료 조건은 미완료<br>[G25](CONTRACTS.md#g25), [G26](CONTRACTS.md#g26) | 미구현: 현재 policy 분기는 발췌·외부 링크이며 이 원본 요소 없음<br>[D08](../FE_MEDIUM_PARITY_BACKLOG.md#d08) |
| <a id="r-s008-c07"></a>`R-S008-C07` | 컨트롤: 응답 272 | 상세 작업화 필요: 정책 진입/원본 참조와 차이 기록은 있으나 이 요소의 구현·연결·종료 조건은 미완료<br>[G26](CONTRACTS.md#g26) | 미구현: 현재 policy 분기는 발췌·외부 링크이며 이 원본 요소 없음<br>[D08](../FE_MEDIUM_PARITY_BACKLOG.md#d08) |
| <a id="r-s008-c08"></a>`R-S008-C08` | 컨트롤: 저장 | 상세 작업화 필요: 정책 진입/원본 참조와 차이 기록은 있으나 이 요소의 구현·연결·종료 조건은 미완료<br>[G26](CONTRACTS.md#g26), [G33](CONTRACTS.md#g33) | 미구현: 현재 policy 분기는 발췌·외부 링크이며 이 원본 요소 없음<br>[D08](../FE_MEDIUM_PARITY_BACKLOG.md#d08) |
| <a id="r-s008-c09"></a>`R-S008-C09` | 컨트롤: 공유 | 상세 작업화 필요: 정책 진입/원본 참조와 차이 기록은 있으나 이 요소의 구현·연결·종료 조건은 미완료<br>[G26](CONTRACTS.md#g26), [G47](CONTRACTS.md#g47) | 미구현: 현재 policy 분기는 발췌·외부 링크이며 이 원본 요소 없음<br>[D08](../FE_MEDIUM_PARITY_BACKLOG.md#d08) |
| <a id="r-s008-v"></a>`R-S008-V` | PNG 추가 세부 관찰: 상단 Medium Policy 로고·듣기·더보기, Medium 작성자 아바타·Follow, 첫 문단의 연녹색 강조, 세 번째 문단 시작, 하단 54K 박수·272 응답·빈 북마크·공유가 보인다. 현재 발췌 안내와 외부 링크는 이 원본 화면에 보이지 않는다. | 일부 포함: 공통 시각 계약에 포함되나 이 요소 묶음의 독립 판정 필요<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 차이 확인: policy 분기에 작성자·기사 도구·강조·세 번째 문단 없음<br>[D08](../FE_MEDIUM_PARITY_BACKLOG.md#d08) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S008](UNKNOWN.md#u-s008)

<a id="s009"></a>

## S009 — 기존 응답 편집 입력

- **Parity10 판정:** 편집 값 채움/Cancel 유지. 보이는 안내를 Replying to로 맞추고 접근성 이름은 편집으로 구분. 늦은 편집 결과의 삭제 화면 오염 수정. [이번 코드/검사·한계](../FE_MEDIUM_PARITY_10_RESULT.md#screen-status). 원본·과거 판정은 아래에 보존한다.

안정 원본 ID: `sc_0817971af7f14028a36fd2a233dd5ee7` · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/ANALYSIS.md>):117 · [원본 PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/screens/03_sc_0817971af7f14028a36fd2a233dd5ee7.png>)

흐름 맥락: [F33/03](FLOWS.md#f33)

FE 조사 경로: [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>)

기본 담당: [G26](CONTRACTS.md#g26) · 실행 작업: [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20)

**화면별 수용 조건:** 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 편집기존값 유지. 원본 Replying to 문구 대신 Editing 사용 자체 명확화. ([과거 기록](<../FE_GOAL_53_RESULT.md>):203)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Cancel, 전송

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s009-l"></a>`R-S009-L` | 배치: 기존 응답 회색 강조, 키보드·기존 문장 입력창 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s009-d"></a>`R-S009-D` | 표시값·입력: Replying to Alex Smith 표시, 기존 내용 채움 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s009-s"></a>`R-S009-S` | 상태: 편집 흐름이나 UI 문구는 Replying | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s009-c01"></a>`R-S009-C01` | 컨트롤: Cancel | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s009-c02"></a>`R-S009-C02` | 컨트롤: 전송 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S009](UNKNOWN.md#u-s009)

<a id="s010"></a>

## S010 — 응답 수정 내용 입력

- **Parity10 판정:** 본문 변경/취소/중복 제출 보호 유지. 편집은 본문만 저장하므로 동작하지 않던 인용 제거 UI를 숨겼다. 실제 키보드/IME 대기. [이번 코드/검사·한계](../FE_MEDIUM_PARITY_10_RESULT.md#screen-status). 원본·과거 판정은 아래에 보존한다.

안정 원본 ID: `sc_0950e3a03f7e4b02b9db0d98f818bdea` · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/ANALYSIS.md>):147 · [원본 PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/screens/04_sc_0950e3a03f7e4b02b9db0d98f818bdea.png>)

흐름 맥락: [F33/04](FLOWS.md#f33)

FE 조사 경로: [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>)

기본 담당: [G26](CONTRACTS.md#g26) · 실행 작업: [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20)

**화면별 수용 조건:** 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 이모지 편집 초안. 웹키보드와OS키보드 검증 구분. ([과거 기록](<../FE_GOAL_53_RESULT.md>):204)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Cancel, 전송

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s010-l"></a>`R-S010-L` | 배치: 같은 입력창·키보드 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s010-d"></a>`R-S010-D` | 표시값·입력: 기존 문장 끝 하트 3개 추가 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s010-s"></a>`R-S010-S` | 상태: 수정 제출 전 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s010-c01"></a>`R-S010-C01` | 컨트롤: Cancel | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s010-c02"></a>`R-S010-C02` | 컨트롤: 전송 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S010](UNKNOWN.md#u-s010)

<a id="s011"></a>

## S011 — 내 리스트 상세 항목

- Parity 7 최신 검토: [저장·목록·메모·순서 결과](../FE_MEDIUM_PARITY_07_RESULT.md). 기능/브라우저·원본 차이·미확인/native를 분리한다. 아래 초기 판정은 감사 당시 이력이다.

안정 원본 ID: `sc_0b1e7b64b9f14f2cb5358161e0f67a94` · [원본 분석](<../../medium/flows/Library/List detail/ANALYSIS.md>):115 · [원본 PNG](<../../medium/flows/Library/List detail/screens/03_sc_0b1e7b64b9f14f2cb5358161e0f67a94.png>)

흐름 맥락: [F46/03](FLOWS.md#f46), [F47/01](FLOWS.md#f47), [F48/01](FLOWS.md#f48), [F49/01](FLOWS.md#f49), [F51/01](FLOWS.md#f51)

FE 조사 경로: [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>)

기본 담당: [G33](CONTRACTS.md#g33) · 실행 작업: [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25)

**화면별 수용 조건:** 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 동일4기사 목록의 첫 두 행·저장·반응 대조. 상대시각 미제공, Viewed/회원표시/제목 줄바꿈 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):205)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Add a note, 개별 더보기, 다운로드

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s011-l"></a>`R-S011-L` | 배치: 4개 글 중 상위 2개·각 항목 Add a note | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s011-d"></a>`R-S011-D` | 표시값·입력: 4 stories, 저장 아이콘 채움 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s011-s"></a>`R-S011-S` | 상태: 리스트에 글 4개 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s011-c01"></a>`R-S011-C01` | 컨트롤: Add a note | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s011-c02"></a>`R-S011-C02` | 컨트롤: 개별 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s011-c03"></a>`R-S011-C03` | 컨트롤: 다운로드 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G35](CONTRACTS.md#g35) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s011-v"></a>`R-S011-V` | PNG 추가 세부 관찰: 소유자 아래 상대 시간과 글 개수가 6 seconds ago · 4 stories로 함께 표시된다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 상대 시간 분기와 데이터 필드 없음; 현재 상세는 글 개수만 표시<br>[D13](../FE_MEDIUM_PARITY_BACKLOG.md#d13), [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |


원본 해석 경계: 빈 리스트 화면의 14 seconds ago 다음에 4개 글이 있는 화면은 6 seconds ago로 표시된다. 기사 추가 과정이 빠져 있고 시각도 역행하므로 끊김 없는 한 세션으로 단정하지 않는다.

미확인 사항: [U-S011](UNKNOWN.md#u-s011)

<a id="s012"></a>

## S012 — 구절 하이라이트 반영

**Parity11 최신:** [요구별 구현·검증·잔여](../FE_MEDIUM_PARITY_11_RESULT.md#requirements). 본문 한 문단 native 선택과 강조 톤·접근 철회를 보완했다. 아래 원본 요구/초기 조사 판정은 보존한다. 다중 문단·서식·메뉴 좌표와 실제 렌더/기기 검증은 남아 전체 동일성 미완료다.

안정 원본 ID: `sc_0da01c48dbc9483798e4c2286a11237f` · [원본 분석](<../../medium/flows/Home/Story detail/Highlighting a phrase/ANALYSIS.md>):115 · [원본 PNG](<../../medium/flows/Home/Story detail/Highlighting a phrase/screens/03_sc_0da01c48dbc9483798e4c2286a11237f.png>)

흐름 맥락: [F25/03](FLOWS.md#f25)

FE 조사 경로: [PassageReader.tsx](<../../FE/src/features/highlights/PassageReader.tsx>), [NativePassagePicker.tsx](<../../FE/src/features/highlights/NativePassagePicker.tsx>)

기본 담당: [G27](CONTRACTS.md#g27) · 실행 작업: [V17](../FE_MEDIUM_PARITY_BACKLOG.md#v17)

**화면별 수용 조건:** 원본 본문 위 시작/끝 핸들과 선택 영역·플로팅 Highlight/Respond/Share/더보기, 메뉴 종료 후 강조 잔존을 확인한다. 별도 선택 화면은 동일 조작 완료가 아니다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 같은 구간 Highlight 저장, 원본 기본 highlights와 개인 강조를 구분. ([과거 기록](<../FE_GOAL_53_RESULT.md>):206)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 기존 읽기 행동

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s012-l"></a>`R-S012-L` | 배치: 선택 핸들·메뉴 없이 연녹색 강조 유지 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G27](CONTRACTS.md#g27), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V17](../FE_MEDIUM_PARITY_BACKLOG.md#v17) |
| <a id="r-s012-d"></a>`R-S012-D` | 표시값·입력: 선택했던 구절 강조 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G27](CONTRACTS.md#g27), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V17](../FE_MEDIUM_PARITY_BACKLOG.md#v17) |
| <a id="r-s012-s"></a>`R-S012-S` | 상태: 하이라이트 적용 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G27](CONTRACTS.md#g27), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V17](../FE_MEDIUM_PARITY_BACKLOG.md#v17) |
| <a id="r-s012-c01"></a>`R-S012-C01` | 컨트롤: 듣기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G27](CONTRACTS.md#g27), [G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V17](../FE_MEDIUM_PARITY_BACKLOG.md#v17) |
| <a id="r-s012-c02"></a>`R-S012-C02` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G27](CONTRACTS.md#g27), [G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V17](../FE_MEDIUM_PARITY_BACKLOG.md#v17) |
| <a id="r-s012-c03"></a>`R-S012-C03` | 컨트롤: 박수 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G27](CONTRACTS.md#g27) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V17](../FE_MEDIUM_PARITY_BACKLOG.md#v17) |
| <a id="r-s012-c04"></a>`R-S012-C04` | 컨트롤: 응답 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26), [G27](CONTRACTS.md#g27) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V17](../FE_MEDIUM_PARITY_BACKLOG.md#v17) |
| <a id="r-s012-c05"></a>`R-S012-C05` | 컨트롤: 저장 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G27](CONTRACTS.md#g27), [G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V17](../FE_MEDIUM_PARITY_BACKLOG.md#v17) |
| <a id="r-s012-c06"></a>`R-S012-C06` | 컨트롤: 공유 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G27](CONTRACTS.md#g27), [G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V17](../FE_MEDIUM_PARITY_BACKLOG.md#v17) |
| <a id="r-s012-v"></a>`R-S012-V` | PNG 추가 세부 관찰: 새로 저장한 구절의 녹색 배경은 주변의 기존 강조보다 진하며 선택 핸들·메뉴 없이 유지된다. | Parity11 원본 재열람으로 보완한 관찰이며 타인 공개 범위·원본 토큰을 확정하지 않음<br>[G27](CONTRACTS.md#g27) | 본문/Library ownHighlight 분리. 실제 렌더 비교 대기<br>[현재 결과](../FE_MEDIUM_PARITY_11_RESULT.md#source-review) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S012](UNKNOWN.md#u-s012)

<a id="s013"></a>

## S013 — 이메일 인증 코드 입력 대기

**Parity14 개별 판정:** [S013 실행·R/T/U/C](../FE_MEDIUM_PARITY_14_RESULT.md#screens). 빈 6칸·Validate 비활성·Resend·뒤로/X 확인. 원본 sign up 공용 캡처와 런타임 모드 문구 구분. 원본 요구·readiness는 유지한다.

안정 원본 ID: `sc_10e0a1c6f1154b3b85f8d5ed18b692d7` · [원본 분석](<../../medium/flows/Logging in/ANALYSIS.md>):180 · [원본 PNG](<../../medium/flows/Logging in/screens/05_sc_10e0a1c6f1154b3b85f8d5ed18b692d7.png>)

흐름 맥락: [F52/05](FLOWS.md#f52), [F53/05](FLOWS.md#f53)

FE 조사 경로: [AuthDialogs.tsx](<../../FE/src/features/auth/AuthDialogs.tsx>), [EmailLogin.tsx](<../../FE/src/features/auth/EmailLogin.tsx>), [createEmailAttempt.ts](<../../FE/src/features/auth/createEmailAttempt.ts>)

기본 담당: [G40](CONTRACTS.md#g40) · 실행 작업: [V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29)

**화면별 수용 조건:** 가입4/로그인5 제공자, 이메일/이름/약관/뒤로·6칸 코드와Validate·Resend·닫기, Sign out Cancel/Confirm→intro를 비교한다. 빈 폼의 녹색 버튼과 실제 입력 검증은 별개다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 비어 있는 코드6칸/비활성 Validate. 원본 sign up문구와 해당 signin흐름 불일치를 복제하지 않음; mock안내 추가. ([과거 기록](<../FE_GOAL_53_RESULT.md>):207)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Validate는 회색이며 Resend code와 닫기가 있다.

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s013-l"></a>`R-S013-L` | 배치: 닫기 X가 있는 전면 시트에 인증 안내와 여섯 칸 입력란이 배치된다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s013-d"></a>`R-S013-D` | 표시값·입력: 샘플 계정 이메일을 대상으로 빈 코드 여섯 칸이 보인다. 이 화면은 가입과 로그인 흐름에 공통으로 수록되어 있다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s013-s"></a>`R-S013-S` | 상태: 코드 미입력 상태다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s013-c01"></a>`R-S013-C01` | 컨트롤: Validate 회색 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s013-c02"></a>`R-S013-C02` | 컨트롤: Resend code | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s013-c03"></a>`R-S013-C03` | 컨트롤: 닫기 X | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s013-c04"></a>`R-S013-C04` | 컨트롤: 인증 코드 여섯 칸 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |


원본 해석 경계: 안내 문구는 to sign up이다. Logging in에서도 같은 Screen ID가 재사용되므로 캡처 문구와 흐름 분류가 일치하지 않는 지점을 보존한다.

미확인 사항: [U-S013](UNKNOWN.md#u-s013)

<a id="s014"></a>

## S014 — 큐레이션 리스트 상세

안정 원본 ID: `sc_15a122b14ac84b3d80c37fb84dfae4c7` · [원본 분석](<../../medium/flows/Explore/Topic detail/Browse curated list/ANALYSIS.md>):147 · [원본 PNG](<../../medium/flows/Explore/Topic detail/Browse curated list/screens/04_sc_15a122b14ac84b3d80c37fb84dfae4c7.png>)

흐름 맥락: [F04/04](FLOWS.md#f04)

FE 조사 경로: [PublicListScreen.tsx](<../../FE/src/features/public-lists/PublicListScreen.tsx>), [SavePublicListControl.tsx](<../../FE/src/features/public-lists/SavePublicListControl.tsx>), [PublicListStoryCard.tsx](<../../FE/src/features/public-lists/PublicListStoryCard.tsx>), [ArticleBookmarkControl.tsx](<../../FE/src/features/bookmarks/ArticleBookmarkControl.tsx>)

기본 담당: [G32](CONTRACTS.md#g32) · 실행 작업: [V04](../FE_MEDIUM_PARITY_BACKLOG.md#v04)

**화면별 수용 조건:** 목록 전체 Save와 개별 기사 저장, 목록 박수·응답·Share를 구분한다. 8 stories/108 saves와 98 claps/1 response는 비교 화면 데이터이며 현재 사용자 수를 위조하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 공개 목록 avatar40/제목22/설명15·행 여백·반응 바 수정. 기사5/원본기록8의 데이터 한계와 실저장 반응 수 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):208)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 리스트 저장·더보기·개별 저장·박수·응답·공유

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s014-l"></a>`R-S014-L` | 배치: 소유자·날짜·제목·설명·기사 목록·부유 반응 바 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G32](CONTRACTS.md#g32), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V04](../FE_MEDIUM_PARITY_BACKLOG.md#v04) |
| <a id="r-s014-d"></a>`R-S014-D` | 표시값·입력: 8 stories, 108 saves, Medium Staff | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G32](CONTRACTS.md#g32), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V04](../FE_MEDIUM_PARITY_BACKLOG.md#v04) |
| <a id="r-s014-s"></a>`R-S014-S` | 상태: 공개 리스트 읽기 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G32](CONTRACTS.md#g32), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V04](../FE_MEDIUM_PARITY_BACKLOG.md#v04) |
| <a id="r-s014-c01"></a>`R-S014-C01` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G32](CONTRACTS.md#g32) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V04](../FE_MEDIUM_PARITY_BACKLOG.md#v04) |
| <a id="r-s014-c02"></a>`R-S014-C02` | 컨트롤: 목록 전체 Save | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G32](CONTRACTS.md#g32) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V04](../FE_MEDIUM_PARITY_BACKLOG.md#v04) |
| <a id="r-s014-c03"></a>`R-S014-C03` | 컨트롤: 목록 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G32](CONTRACTS.md#g32) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V04](../FE_MEDIUM_PARITY_BACKLOG.md#v04) |
| <a id="r-s014-c04"></a>`R-S014-C04` | 컨트롤: 개별 기사 저장 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G32](CONTRACTS.md#g32), [G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V04](../FE_MEDIUM_PARITY_BACKLOG.md#v04) |
| <a id="r-s014-c05"></a>`R-S014-C05` | 컨트롤: 목록 박수 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G32](CONTRACTS.md#g32) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V04](../FE_MEDIUM_PARITY_BACKLOG.md#v04) |
| <a id="r-s014-c06"></a>`R-S014-C06` | 컨트롤: 목록 응답 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G32](CONTRACTS.md#g32) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V04](../FE_MEDIUM_PARITY_BACKLOG.md#v04) |
| <a id="r-s014-c07"></a>`R-S014-C07` | 컨트롤: 목록 공유 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G32](CONTRACTS.md#g32), [G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V04](../FE_MEDIUM_PARITY_BACKLOG.md#v04) |
| <a id="r-s014-c08"></a>`R-S014-C08` | 컨트롤: 개별 기사 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G32](CONTRACTS.md#g32) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V04](../FE_MEDIUM_PARITY_BACKLOG.md#v04) |


원본 해석 경계: 상단 108 saves는 리스트 저장 수, 하단 고정 98 박수·1 응답은 리스트 반응 영역이다. 개별 기사 행의 저장 버튼과 별도로 제공된다.

미확인 사항: [U-S014](UNKNOWN.md#u-s014)

<a id="s015"></a>

## S015 — 멘션 대상 삽입

- Parity9: 멘션 선택 후 커서/서식 툴바 복원을 navigation으로 확인; 실제 키보드/렌더 대기. [모든 R의 현재 판정·검증](../FE_MEDIUM_PARITY_09_RESULT.md). 과거 관찰/계약은 보존하며 시각 동일성 완료로 승격하지 않는다.

안정 원본 ID: `sc_15dd105a441c426ca638b4db6cb30997` · [원본 분석](<../../medium/flows/Home/Publishing a story/Mentioning a user/ANALYSIS.md>):146 · [원본 PNG](<../../medium/flows/Home/Publishing a story/Mentioning a user/screens/04_sc_15dd105a441c426ca638b4db6cb30997.png>)

흐름 맥락: [F11/04](FLOWS.md#f11)

FE 조사 경로: [MentionSuggestions.tsx](<../../FE/src/features/editor/MentionSuggestions.tsx>), [DocumentReader.tsx](<../../FE/src/features/editor/DocumentReader.tsx>)

기본 담당: [G38](CONTRACTS.md#g38) · 실행 작업: [V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10)

**화면별 수용 조건:** @만 있는 안내, samlee 검색의 이름·아바타·핸들 세 행, 녹색 이름 삽입과 커서·툴바·키보드 위치를 비교한다. 실제 알림 발송은 별도다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 선택한 mention ID가 녹색 텍스트로 반영. 원본과 같은 마지막 문단에 다시 입력해 촬영 예정. ([과거 기록](<../FE_GOAL_53_RESULT.md>):209)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Next, 서식 도구

**이번 증거 해석:** 기존 비교 파일과 당시 해시 일치. 녹색 Sam Lee 삽입 확인, 이미지·간격·키보드 차이 잔여. 위 예정/진행 문구는 과거 이력이며 이번 새 촬영이 아니다. [최신 증거 판정](../FE_MEDIUM_PARITY_AUDIT.md#evidence), [Q09](../FE_MEDIUM_PARITY_BACKLOG.md#q09).

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s015-l"></a>`R-S015-L` | 배치: 검색 결과 대신 녹색 Sam Lee 텍스트 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G38](CONTRACTS.md#g38), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |
| <a id="r-s015-d"></a>`R-S015-D` | 표시값·입력: 이름 링크처럼 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G38](CONTRACTS.md#g38), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |
| <a id="r-s015-s"></a>`R-S015-S` | 상태: 멘션 후보 선택 반영 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G38](CONTRACTS.md#g38), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |
| <a id="r-s015-c01"></a>`R-S015-C01` | 컨트롤: Close | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G38](CONTRACTS.md#g38) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |
| <a id="r-s015-c02"></a>`R-S015-C02` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G38](CONTRACTS.md#g38) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |
| <a id="r-s015-c03"></a>`R-S015-C03` | 컨트롤: Next | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G38](CONTRACTS.md#g38), [G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |
| <a id="r-s015-c04"></a>`R-S015-C04` | 컨트롤: 문자 스타일 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G38](CONTRACTS.md#g38) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |
| <a id="r-s015-c05"></a>`R-S015-C05` | 컨트롤: 인용 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G38](CONTRACTS.md#g38) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |
| <a id="r-s015-c06"></a>`R-S015-C06` | 컨트롤: 목록 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G38](CONTRACTS.md#g38) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |
| <a id="r-s015-c07"></a>`R-S015-C07` | 컨트롤: 구분선 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G38](CONTRACTS.md#g38) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |
| <a id="r-s015-c08"></a>`R-S015-C08` | 컨트롤: 멘션 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G38](CONTRACTS.md#g38) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |
| <a id="r-s015-c09"></a>`R-S015-C09` | 컨트롤: 코드 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G38](CONTRACTS.md#g38) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |
| <a id="r-s015-c10"></a>`R-S015-C10` | 컨트롤: 이미지 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G37](CONTRACTS.md#g37), [G38](CONTRACTS.md#g38) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S015](UNKNOWN.md#u-s015)

<a id="s016"></a>

## S016 — 재생 속도 선택 초기
- **Parity12 최신:** [요구별 상태·검사·잔여](../FE_MEDIUM_PARITY_12_RESULT.md#screen-status). 1x/200 WPM·Done/Cancel·초안 수명 확인. slider/큰 글자 실제 화면 대기, 범위/WPM 공식 미확인. 원본 관찰/기존 증거는 보존하며 새 실제 렌더 비교 완료가 아니다.


안정 원본 ID: `sc_1965b9529b534e1597968039af1415b1` · [원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/ANALYSIS.md>):86 · [원본 PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/screens/02_sc_1965b9529b534e1597968039af1415b1.png>)

흐름 맥락: [F27/02](FLOWS.md#f27)

FE 조사 경로: [ListeningSpeedPanel.tsx](<../../FE/src/features/listening/ListeningSpeedPanel.tsx>), [ListeningVoicePanel.tsx](<../../FE/src/features/listening/ListeningVoicePanel.tsx>)

기본 담당: [G46](CONTRACTS.md#g46) · 실행 작업: [V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19)

**화면별 수용 조건:** 세로 slider·1x/200 WPM·2.5x/490 WPM·145% 문구, voice 언어 section/국기/성별/나라/선택색, Emma→Hans와 Done, 더보기6행을 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 1x200WPM/세로 눈금, 자체 취소X 추가. OS sheet stack 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):210)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 세로 슬라이더, Done

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s016-l"></a>`R-S016-L` | 배치: Select Speed 시트, 세로 슬라이더·등급 안내 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G46](CONTRACTS.md#g46), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s016-d"></a>`R-S016-D` | 표시값·입력: 1x, 200 WPM | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G46](CONTRACTS.md#g46), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s016-s"></a>`R-S016-S` | 상태: 현재 속도 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G46](CONTRACTS.md#g46), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s016-c01"></a>`R-S016-C01` | 컨트롤: 세로 슬라이더 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G46](CONTRACTS.md#g46) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s016-c02"></a>`R-S016-C02` | 컨트롤: Done | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G46](CONTRACTS.md#g46) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S016](UNKNOWN.md#u-s016)

<a id="s017"></a>

## S017 — 구분선 삽입과 이미지 선택

- Parity9 추가 보완: 구분선 자간/보조 색과 iOS 문단 정렬을 연결했다. Android 혼합 문단 가운데 정렬은 구현 잔여이며 iOS도 실제 렌더/IME 검증 대기다. [근거·검증·종료 조건](../FE_MEDIUM_PARITY_09_RESULT.md#additional-review). 아래 최초 판정은 이력이며 시각 동일성으로 승격하지 않는다.

- Parity9: 기존 점3개 구분선·사진 선택/삭제 연결 확인; native 가운데 배치/자산 차이 잔여. [모든 R의 현재 판정·검증](../FE_MEDIUM_PARITY_09_RESULT.md). 과거 관찰/계약은 보존하며 시각 동일성 완료로 승격하지 않는다.

안정 원본 ID: `sc_19b2bef0854047f5b17cfeca07781ca5` · [원본 분석](<../../medium/flows/Home/Publishing a story/Changing text format/ANALYSIS.md>):176 · [원본 PNG](<../../medium/flows/Home/Publishing a story/Changing text format/screens/05_sc_19b2bef0854047f5b17cfeca07781ca5.png>)

흐름 맥락: [F09/05](FLOWS.md#f09)

FE 조사 경로: [RichDocumentBody.tsx](<../../FE/src/features/editor/RichDocumentBody.tsx>), [editorModel.ts](<../../FE/src/features/editor/editorModel.ts>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>)

기본 담당: [G36](CONTRACTS.md#g36) · 실행 작업: [V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07)

**화면별 수용 조건:** 제목과 본문, 회색 문자 스타일, 이탤릭 인용선, bullet, 점3개 구분선, 선택 중 도구 색과 키보드 위 툴바를 비교한다. 코드 도구의 실행 후 모습은 원본 미확인이다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 구분선 뒤 이미지 선택까지 촬영하도록 보강. 이전 캡처는 이미지 선택을 빠뜨렸음. ([과거 기록](<../FE_GOAL_53_RESULT.md>):211)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 구분선 도구, 사진 삭제 X, Next

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s017-l"></a>`R-S017-L` | 배치: 목록 아래 점 3개 구분선, 이미지 녹색 테두리 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G36](CONTRACTS.md#g36), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s017-d"></a>`R-S017-D` | 표시값·입력: 사진 블록 선택 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G36](CONTRACTS.md#g36), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s017-s"></a>`R-S017-S` | 상태: 블록 구분선 노출 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G36](CONTRACTS.md#g36), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s017-c01"></a>`R-S017-C01` | 컨트롤: 구분선 도구 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s017-c02"></a>`R-S017-C02` | 컨트롤: 사진 삭제 X | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G37](CONTRACTS.md#g37) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s017-c03"></a>`R-S017-C03` | 컨트롤: Next | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S017](UNKNOWN.md#u-s017)

<a id="s018"></a>

## S018 — 글머리 목록 적용

- Parity9 추가 보완: native 목록 내어쓰기는 알려진 구현 잔여다. 설치 RN의 문단 속성 한계와 단일 입력/선택 계약을 확인했고 입력 분리/모델 확대는 도입하지 않았다. [근거·검증·종료 조건](../FE_MEDIUM_PARITY_09_RESULT.md#additional-review). 아래 최초 판정은 이력이며 시각 동일성으로 승격하지 않는다.

- Parity9: 기존 bullet와 선택 도구 확인; native 들여쓰기 렌더 차이를 기기 대기와 별도로 유지. [모든 R의 현재 판정·검증](../FE_MEDIUM_PARITY_09_RESULT.md). 과거 관찰/계약은 보존하며 시각 동일성 완료로 승격하지 않는다.

안정 원본 ID: `sc_1b0cd82ee04a4c8c9d52b9a2d088823b` · [원본 분석](<../../medium/flows/Home/Publishing a story/Changing text format/ANALYSIS.md>):146 · [원본 PNG](<../../medium/flows/Home/Publishing a story/Changing text format/screens/04_sc_1b0cd82ee04a4c8c9d52b9a2d088823b.png>)

흐름 맥락: [F09/04](FLOWS.md#f09)

FE 조사 경로: [RichDocumentBody.tsx](<../../FE/src/features/editor/RichDocumentBody.tsx>), [editorModel.ts](<../../FE/src/features/editor/editorModel.ts>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>)

기본 담당: [G36](CONTRACTS.md#g36) · 실행 작업: [V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07)

**화면별 수용 조건:** 제목과 본문, 회색 문자 스타일, 이탤릭 인용선, bullet, 점3개 구분선, 선택 중 도구 색과 키보드 위 툴바를 비교한다. 코드 도구의 실행 후 모습은 원본 미확인이다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. bullet·들여쓰기·선택 상태 실제 적용. 원본 줄바꿈은 글꼴/키보드 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):212)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 목록 도구, Next

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s018-l"></a>`R-S018-L` | 배치: 단락 앞 점과 들여쓰기, 목록 도구 녹색 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G36](CONTRACTS.md#g36), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s018-d"></a>`R-S018-D` | 표시값·입력: 단일 목록 항목 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G36](CONTRACTS.md#g36), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s018-s"></a>`R-S018-S` | 상태: 글머리 목록 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G36](CONTRACTS.md#g36), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s018-c01"></a>`R-S018-C01` | 컨트롤: 목록 도구 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s018-c02"></a>`R-S018-C02` | 컨트롤: Next | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S018](UNKNOWN.md#u-s018)

<a id="s019"></a>

## S019 — 구절 응답 입력

- **Parity10 판정:** 인용 아래 입력/빈값 전송 방지/작성 시 인용 제거 유지. 실패 후 초안 보존은 자동 검증. 선택 모델 확장은11. [이번 코드/검사·한계](../FE_MEDIUM_PARITY_10_RESULT.md#screen-status). 원본·과거 판정은 아래에 보존한다.

안정 원본 ID: `sc_1b7c2e5f28d5419d889919fc0c9e3980` · [원본 분석](<../../medium/flows/Home/Story detail/Responding to a phrase/ANALYSIS.md>):117 · [원본 PNG](<../../medium/flows/Home/Story detail/Responding to a phrase/screens/03_sc_1b7c2e5f28d5419d889919fc0c9e3980.png>)

흐름 맥락: [F29/03](FLOWS.md#f29)

FE 조사 경로: [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>)

기본 담당: [G26](CONTRACTS.md#g26) · 실행 작업: [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20)

**화면별 수용 조건:** 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 인용과 입력 보존/활성 제출. 웹 focus outline/키보드 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):213)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 전송 활성

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s019-l"></a>`R-S019-L` | 배치: 인용 카드 아래 문장 입력 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s019-d"></a>`R-S019-D` | 표시값·입력: Can't agree more! | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s019-s"></a>`R-S019-S` | 상태: 인용 응답 제출 준비 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s019-c01"></a>`R-S019-C01` | 컨트롤: 전송 활성 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S019](UNKNOWN.md#u-s019)

<a id="s020"></a>

## S020 — 내 프로필 빈 Stories

- Parity15 현재 검토: [화면별 결과·R/T/U/C](../FE_MEDIUM_PARITY_15_RESULT.md#scope). 기능/실제8081 부분 대조와 원본 시각·동일 fixture·native 대기를 구분한다. 아래 원본 관찰과 최초 감사 이력은 유지한다.

안정 원본 ID: `sc_1bd141b757934a88b4a003855e1794cc` · [원본 분석](<../../medium/flows/Profile/ANALYSIS.md>):88 · [원본 PNG](<../../medium/flows/Profile/screens/02_sc_1bd141b757934a88b4a003855e1794cc.png>)

흐름 맥락: [F55/02](FLOWS.md#f55), [F57/01](FLOWS.md#f57), [F63/01](FLOWS.md#f63)

FE 조사 경로: [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>)

기본 담당: [G42](CONTRACTS.md#g42) · 실행 작업: [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32)

**화면별 수용 조건:** Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 빈 프로필/편집/통계/Stories 대조. 실제미완료온보딩 Continue setup·Drafts 자체추가,following0vs원본1 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):214)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** View stats, Edit your profile, Get started, 설정

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s020-l"></a>`R-S020-L` | 배치: 프로필·통계·편집·탭·Public 필터·빈 안내 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s020-d"></a>`R-S020-D` | 표시값·입력: Alex Smith, 0 followers·1 following | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s020-s"></a>`R-S020-S` | 상태: 발행 글 없음 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s020-c01"></a>`R-S020-C01` | 컨트롤: View stats | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42), [G43](CONTRACTS.md#g43) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s020-c02"></a>`R-S020-C02` | 컨트롤: Edit your profile | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s020-c03"></a>`R-S020-C03` | 컨트롤: Get started | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s020-c04"></a>`R-S020-C04` | 컨트롤: 설정 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |


원본 해석 경계: Stories의 Public 필터가 표시된다. 필터 선택지 전체·초안·Unlisted 목록은 수록되지 않아 프로필에 나타난 글 수를 계정 전체 글 수로 보지 않는다.

미확인 사항: [U-S020](UNKNOWN.md#u-s020)

<a id="s021"></a>

## S021 — Explore 첫 화면

안정 원본 ID: `sc_1c3e4349171248378eada528f7942269` · [원본 분석](<../../medium/flows/Explore/ANALYSIS.md>):88 · [원본 PNG](<../../medium/flows/Explore/screens/02_sc_1c3e4349171248378eada528f7942269.png>)

흐름 맥락: [F01/02](FLOWS.md#f01), [F02/01](FLOWS.md#f02)

FE 조사 경로: [SearchScreen.tsx](<../../FE/src/features/search/SearchScreen.tsx>), [CatalogSearchResults.tsx](<../../FE/src/features/search/CatalogSearchResults.tsx>), [ExploreSections.tsx](<../../FE/src/features/search/ExploreSections.tsx>)

기본 담당: [G50](CONTRACTS.md#g50) · 실행 작업: [V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02)

**화면별 수용 조건:** 검색 빈 화면의 토픽 행, Stories 결과, 다섯 탭과 X를 분리한다. Trending 순위, Staff Picks 가로 카드, Recommended 세로 카드, Who to follow 가로 이동을 원본 상태별로 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Trending byline 한 줄/큰 글자 줄바꿈 수정. 배지/제목/번호/검색 진입 대조. ([과거 기록](<../FE_GOAL_53_RESULT.md>):215)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 검색, 토픽, 인기 기사, 작성

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s021-l"></a>`R-S021-L` | 배치: 검색창·가로 토픽 칩·번호 매긴 Trending | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s021-d"></a>`R-S021-D` | 표시값·입력: Search Medium 빈값 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s021-s"></a>`R-S021-S` | 상태: 발견 탐색 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s021-c01"></a>`R-S021-C01` | 컨트롤: 검색 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s021-c02"></a>`R-S021-C02` | 컨트롤: 토픽 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G30](CONTRACTS.md#g30), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s021-c03"></a>`R-S021-C03` | 컨트롤: 인기 기사 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s021-c04"></a>`R-S021-C04` | 컨트롤: 작성 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S021](UNKNOWN.md#u-s021)

<a id="s022"></a>

## S022 — 팔로잉 유형별 목록

안정 원본 ID: `sc_1c666fb7aadc411c9add1aa2b19bd56c` · [원본 분석](<../../medium/flows/Home/Refine recommendations/ANALYSIS.md>):179 · [원본 PNG](<../../medium/flows/Home/Refine recommendations/screens/05_sc_1c666fb7aadc411c9add1aa2b19bd56c.png>)

흐름 맥락: [F12/05](FLOWS.md#f12)

FE 조사 경로: [RefineRecommendationsScreen.tsx](<../../FE/src/features/recommendations/RefineRecommendationsScreen.tsx>)

기본 담당: [G31](CONTRACTS.md#g31) · 실행 작업: [V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11)

**화면별 수용 조건:** 네 탭, All/Writers/Publications/Topics, 빈 Following, 종류별 count/See all, Follow/Following, See more suggestions를 개별 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. FollowingAll의 Writers/Topics 그룹·수/Seeall누락수정 후재촬영. 관계는동일ID, 소개줄바꿈/Followpill차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):216)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Following 드롭다운, See all

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s022-l"></a>`R-S022-L` | 배치: Writers·Topics 섹션과 개수 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s022-d"></a>`R-S022-D` | 표시값·입력: Writers 1, Topics 3 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s022-s"></a>`R-S022-S` | 상태: 작가·토픽 팔로우 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s022-c01"></a>`R-S022-C01` | 컨트롤: Following 드롭다운 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s022-c02"></a>`R-S022-C02` | 컨트롤: See all | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S022](UNKNOWN.md#u-s022)

<a id="s023"></a>

## S023 — 발행 전 Story preview

- Parity9: 0토픽 발행 미리보기·Edit/Publication/닫기/발행 연결 확인; 원본 사진/서체·자체 UI·렌더 잔여. [모든 R의 현재 판정·검증](../FE_MEDIUM_PARITY_09_RESULT.md). 과거 관찰/계약은 보존하며 시각 동일성 완료로 승격하지 않는다.

안정 원본 ID: `sc_1ceed9061b86476ebc7eb5acb9dd89c7` · [원본 분석](<../../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>):57 · [원본 PNG](<../../medium/flows/Home/Publishing a story/Adding topics/screens/01_sc_1ceed9061b86476ebc7eb5acb9dd89c7.png>)

흐름 맥락: [F07/01](FLOWS.md#f07), [F08/08](FLOWS.md#f08)

FE 조사 경로: [PublishTopics.tsx](<../../FE/src/features/editor/PublishTopics.tsx>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>)

기본 담당: [G39](CONTRACTS.md#g39) · 실행 작업: [V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06)

**화면별 수용 조건:** 검색 X와 chip X, 0/5·3/5·최대5, 빈값 Save의 모양, 미리보기 Edit/Publication/Unlisted/Publish now와 스크롤 헤더를 각각 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 발행 preview 상단/카드/행 대조. 배경·문구·여백·카드 제목·설정행 크기 수정. 이름/사진은 검증 계정과 로컬 자산. ([과거 기록](<../FE_GOAL_53_RESULT.md>):217)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Edit, Topics, Publication, Publish now, 닫기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s023-l"></a>`R-S023-L` | 배치: 예상 기사 카드와 Topics·Publication 행, 하단 Publish now | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G39](CONTRACTS.md#g39), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s023-d"></a>`R-S023-D` | 표시값·입력: No topics added, No publication selected, Unlisted 꺼짐 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G39](CONTRACTS.md#g39), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s023-s"></a>`R-S023-S` | 상태: 공개 전 설정 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G39](CONTRACTS.md#g39), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s023-c01"></a>`R-S023-C01` | 컨트롤: Edit | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s023-c02"></a>`R-S023-C02` | 컨트롤: Topics | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s023-c03"></a>`R-S023-C03` | 컨트롤: Publication | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s023-c04"></a>`R-S023-C04` | 컨트롤: Publish now | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s023-c05"></a>`R-S023-C05` | 컨트롤: 닫기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |


원본 해석 경계: 미리보기 안내는 홈페이지·구독자 받은편지함 등 공개 영역에서의 노출 형태를 설명한다. 토픽·Publication 미지정 상태에서도 Publish now는 어두운 활성형으로 보이지만 실제 제출 허용 여부는 미검증이다.

미확인 사항: [U-S023](UNKNOWN.md#u-s023)

<a id="s024"></a>

## S024 — 이메일 로그인 입력 완료

**Parity14 개별 판정:** [S024 실행·R/T/U/C](../FE_MEDIUM_PARITY_14_RESULT.md#screens). mock A/B 이메일 입력·검증·실패 입력 보존·계속·뒤로 확인. 실제 메일/소유권 검증 없음. 원본 요구·readiness는 유지한다.

안정 원본 ID: `sc_1d3dc01005c343c18427fe2c199e4075` · [원본 분석](<../../medium/flows/Logging in/ANALYSIS.md>):150 · [원본 PNG](<../../medium/flows/Logging in/screens/04_sc_1d3dc01005c343c18427fe2c199e4075.png>)

흐름 맥락: [F52/04](FLOWS.md#f52)

FE 조사 경로: [AuthDialogs.tsx](<../../FE/src/features/auth/AuthDialogs.tsx>), [EmailLogin.tsx](<../../FE/src/features/auth/EmailLogin.tsx>), [createEmailAttempt.ts](<../../FE/src/features/auth/createEmailAttempt.ts>)

기본 담당: [G40](CONTRACTS.md#g40) · 실행 작업: [V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29)

**화면별 수용 조건:** 가입4/로그인5 제공자, 이메일/이름/약관/뒤로·6칸 코드와Validate·Resend·닫기, Sign out Cancel/Confirm→intro를 비교한다. 빈 폼의 녹색 버튼과 실제 입력 검증은 별개다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 유효 mock Email과Continue 가능. 개인정보 원본 대신 reserved주소·서체/모의 계정선택 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):218)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Continue, 뒤로

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s024-l"></a>`R-S024-L` | 배치: 동일 로그인 폼 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s024-d"></a>`R-S024-D` | 표시값·입력: 샘플 계정 이메일 입력 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s024-s"></a>`R-S024-S` | 상태: 로그인 요청 전 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s024-c01"></a>`R-S024-C01` | 컨트롤: Continue | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s024-c02"></a>`R-S024-C02` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S024](UNKNOWN.md#u-s024)

<a id="s025"></a>

## S025 — 팔로우된 작가 프로필

안정 원본 ID: `sc_1da36ea095e64ec0a5b6b9478b032524` · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/Following an author/ANALYSIS.md>):146 · [원본 PNG](<../../medium/flows/Home/Story detail/Author detail/Following an author/screens/04_sc_1da36ea095e64ec0a5b6b9478b032524.png>)

흐름 맥락: [F19/04](FLOWS.md#f19)

FE 조사 경로: [PublicIdentityScreen.tsx](<../../FE/src/features/community/PublicIdentityScreen.tsx>), [FollowControl.tsx](<../../FE/src/features/community/FollowControl.tsx>), [ConnectionsScreen.tsx](<../../FE/src/features/community/ConnectionsScreen.tsx>)

기본 담당: [G28](CONTRACTS.md#g28) · 실행 작업: [V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14)

**화면별 수용 조건:** Stories/Lists/About, Pinned, member/Friend 시작 월, Follow 성공·메뉴·해제 토스트, Email on/off, 작가와 publication 관계 목록을 각각 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Following확정·메뉴닫기. 실제상태동기화/표시, 원본반응수와카드높이차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):219)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Following 드롭다운

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s025-l"></a>`R-S025-L` | 배치: Following 버튼·Stories 목록 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G28](CONTRACTS.md#g28), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s025-d"></a>`R-S025-D` | 표시값·입력: 팔로우 상태 활성 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G28](CONTRACTS.md#g28), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s025-s"></a>`R-S025-S` | 상태: 관계 설정 메뉴 닫힘 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G28](CONTRACTS.md#g28), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s025-c01"></a>`R-S025-C01` | 컨트롤: Following 드롭다운 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S025](UNKNOWN.md#u-s025)
