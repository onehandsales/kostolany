# 화면별 원본 요구사항

**Parity19 현재 결과:** [멤버십 확정·source 수명·포커스와 현재 검사](../FE_MEDIUM_PARITY_19_RESULT.md). V31의5화면·24 R/6 T/7 U/15 C를 대조하고 모의 확정 검증·이전 자격 무효화·성공 배경/완료 스크롤을 보완했다. 실제8081 부분 비교·자동 검사·원본/시각/native 잔여를 구분하며9~18 잔여는 기존 담당에 유지한다. 승인 조건 충족 후19 로컬 커밋→20 진행; push/배포/21·22 제외. 아래는 각 당시 이력이다.

**Parity17 검토(2026-11-24):** [18 S/139 R/31 T/33 U/21 C의 실제 결과·자체 정책·잔여](../FE_MEDIUM_PARITY_17_RESULT.md). 알림 점/빈 Featured·개인 정책 실패·공개 목록 접근/이탈을 대조했다. 원본18 PNG 직접 열람, 실제8081 메모리 비교이며 캡처 파일/도구 생성 없음.33 U·원본/자산/시각/native 및9~16 잔여 유지. 원본 요구·ID·과거 evidence/readiness를 승격하지 않는다.

[검토 요약](../FE_MEDIUM_PARITY_AUDIT.md) · [보완 작업](../FE_MEDIUM_PARITY_BACKLOG.md) · [계약 원문](CONTRACTS.md) · [흐름 맥락](FLOWS.md) · [미확인 항목](UNKNOWN.md)

이번 목록은 원본에서 추출한 **관찰 요구사항**이다. L=배치, D=표시값/입력, S=상태, C=컨트롤, V=PNG 추가 세부 관찰이다. L/D/S는 원문 한 문장의 모든 요소를 포함하는 묶음이며 단일 버튼 수가 아니다. C는 명시적으로 나눈 조작점이다. 이 숫자를 기능 완성률의 분모로 사용하지 않는다.

`포함`은 기능 작업 범위에 있다는 판정이며 현재 FE 동일 재현 완료라는 뜻이 아니다. `일부 포함`은 공통/상위 계약은 있지만 개별 조건이 분산된 경우다. 코드 링크는 구현 조사 위치이며 자동으로 해당 요구의 통과를 증명하지 않는다. 과거 Goal53 판정은 당시 증거이고 현재 재촬영 결과가 아니다. 모든 행의 완료 조건은 해당 원본 PNG의 데이터·상태를 맞춘 비교와 FLOWS의 진입/복귀 검증을 함께 적용한다.


<a id="s076"></a>

## S076 — 리스트 생성 빈 폼

- Parity 7 최신 검토: [저장·목록·메모·순서 결과](../FE_MEDIUM_PARITY_07_RESULT.md). 기능/브라우저·원본 차이·미확인/native를 분리한다. 아래 초기 판정은 감사 당시 이력이다.

안정 원본 ID: `sc_675e3eda08504708979533659dacdcf6` · [원본 분석](<../../medium/flows/Library/Creating a list/ANALYSIS.md>):85 · [원본 PNG](<../../medium/flows/Library/Creating a list/screens/02_sc_675e3eda08504708979533659dacdcf6.png>)

흐름 맥락: [F42/02](FLOWS.md#f42)

FE 조사 경로: [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>)

기본 담당: [G33](CONTRACTS.md#g33) · 실행 작업: [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25)

**화면별 수용 조건:** 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 빈 목록 생성 form/0·60,0·280/Private off/비활성 Create 대조. 웹 focus와48터치 영역 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):270)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Create 비활성, Cancel

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s076-l"></a>`R-S076-L` | 배치: Create new list 시트·이름·선택 설명·비공개 토글 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s076-d"></a>`R-S076-D` | 표시값·입력: 이름0/60, 설명0/280, Private 꺼짐 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s076-s"></a>`R-S076-S` | 상태: 생성 전 입력 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s076-c01"></a>`R-S076-C01` | 컨트롤: Create 비활성 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s076-c02"></a>`R-S076-C02` | 컨트롤: Cancel | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |


원본 해석 경계: Description에 optional이 명시된다. Private 아래 Only you can see the list라는 설명이 있지만 토글은 Off다. 생성된 모든 리스트가 비공개라는 의미가 아니다.

미확인 사항: [U-S076](UNKNOWN.md#u-s076)

<a id="s077"></a>

## S077 — 변경 순서 반영

- Parity 7 최신 검토: [저장·목록·메모·순서 결과](../FE_MEDIUM_PARITY_07_RESULT.md). 기능/브라우저·원본 차이·미확인/native를 분리한다. 아래 초기 판정은 감사 당시 이력이다.

안정 원본 ID: `sc_6840597985cc46b6b12f6cd0204756f4` · [원본 분석](<../../medium/flows/Library/List detail/Reordering items/ANALYSIS.md>):178 · [원본 PNG](<../../medium/flows/Library/List detail/Reordering items/screens/05_sc_6840597985cc46b6b12f6cd0204756f4.png>)

흐름 맥락: [F51/05](FLOWS.md#f51)

FE 조사 경로: [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>)

기본 담당: [G33](CONTRACTS.md#g33) · 실행 작업: [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25)

**화면별 수용 조건:** 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 재정렬 확정 후 기사 순서·메모 보존. 다운로드가 stale로 구분되어 원본에 없는 복구 안내 표시. ([과거 기록](<../FE_GOAL_53_RESULT.md>):271)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 리스트 관리

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s077-l"></a>`R-S077-L` | 배치: 기사 카드 목록 복귀 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s077-d"></a>`R-S077-D` | 표시값·입력: 첫 2개 항목이 변경 순서와 일치, 1 second ago | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 상대 시간 표시·시간 데이터 계약 없음; 순서/제목 등 나머지 요소는 V25에서 대조<br>[D13](../FE_MEDIUM_PARITY_BACKLOG.md#d13), [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s077-s"></a>`R-S077-S` | 상태: 재정렬 결과 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s077-c01"></a>`R-S077-C01` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s077-c02"></a>`R-S077-C02` | 컨트롤: 다운로드 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G35](CONTRACTS.md#g35) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s077-c03"></a>`R-S077-C03` | 컨트롤: 목록 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s077-c04"></a>`R-S077-C04` | 컨트롤: Add a note | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s077-c05"></a>`R-S077-C05` | 컨트롤: 기사 저장 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s077-c06"></a>`R-S077-C06` | 컨트롤: 개별 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s077-c07"></a>`R-S077-C07` | 컨트롤: 목록 박수 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G32](CONTRACTS.md#g32), [G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s077-c08"></a>`R-S077-C08` | 컨트롤: 목록 응답 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G32](CONTRACTS.md#g32), [G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s077-c09"></a>`R-S077-C09` | 컨트롤: 목록 공유 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s077-v"></a>`R-S077-V` | PNG 추가 세부 관찰: 첫 기사 How Useful is Mind Fullness on an Empty Stomach?의 다운로드 아이콘과3 min read 사이에 금색 회원용 글 별표가 보인다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | ListStoryCard에 회원용 글 별표 분기 없음; medium-horse fixture의 memberOnly는 true<br>[D11](../FE_MEDIUM_PARITY_BACKLOG.md#d11), [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |


원본 해석 경계: 재정렬 후 일반 목록의 첫 두 글이 편집 화면의 새 순서와 일치한다. 마지막 두 글 전체 순서와 재진입 저장 상태는 최종 캡처만으로 모두 확인하지 않았다.

미확인 사항: [U-S077](UNKNOWN.md#u-s077)

<a id="s078"></a>

## S078 — 리스트 순서 편집

- Parity 7 최신 검토: [저장·목록·메모·순서 결과](../FE_MEDIUM_PARITY_07_RESULT.md). 기능/브라우저·원본 차이·미확인/native를 분리한다. 아래 초기 판정은 감사 당시 이력이다.

안정 원본 ID: `sc_6a1036b35729490195c460e5b934bd68` · [원본 분석](<../../medium/flows/Library/List detail/Reordering items/ANALYSIS.md>):118 · [원본 PNG](<../../medium/flows/Library/List detail/Reordering items/screens/03_sc_6a1036b35729490195c460e5b934bd68.png>)

흐름 맥락: [F51/03](FLOWS.md#f51)

FE 조사 경로: [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>)

기본 담당: [G33](CONTRACTS.md#g33) · 실행 작업: [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25)

**화면별 수용 조건:** 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Reorder연결/안정ID/확정·취소 대조. 당시 별도 modal은 원본 inline drag와 구조가 달랐다. 후속 보완에서 목록 안 편집·실제 드래그·가장자리 자동 스크롤로 교체했다. 접근성 이동은 자체 보완이며 현재 비교는 후속 결과를 따른다. ([과거 기록](<../FE_GOAL_53_RESULT.md>):272)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 핸들, Cancel, Done

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s078-l"></a>`R-S078-L` | 배치: 제목만 있는 4행과 드래그 핸들 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s078-d"></a>`R-S078-D` | 표시값·입력: 기존 순서 유지 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s078-s"></a>`R-S078-S` | 상태: 재정렬 모드 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s078-c01"></a>`R-S078-C01` | 컨트롤: 핸들 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s078-c02"></a>`R-S078-C02` | 컨트롤: Cancel | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s078-c03"></a>`R-S078-C03` | 컨트롤: Done | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S078](UNKNOWN.md#u-s078)

<a id="s079"></a>

## S079 — 팔로우 추천 카드

안정 원본 ID: `sc_6bc604f45031400d9cebd252cd89e7a2` · [원본 분석](<../../medium/flows/Explore/ANALYSIS.md>):179 · [원본 PNG](<../../medium/flows/Explore/screens/05_sc_6bc604f45031400d9cebd252cd89e7a2.png>)

흐름 맥락: [F01/05](FLOWS.md#f01)

FE 조사 경로: [SearchScreen.tsx](<../../FE/src/features/search/SearchScreen.tsx>), [CatalogSearchResults.tsx](<../../FE/src/features/search/CatalogSearchResults.tsx>), [ExploreSections.tsx](<../../FE/src/features/search/ExploreSections.tsx>)

기본 담당: [G50](CONTRACTS.md#g50) · 실행 작업: [V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02)

**화면별 수용 조건:** 검색 빈 화면의 토픽 행, Stories 결과, 다섯 탭과 X를 분리한다. Trending 순위, Staff Picks 가로 카드, Recommended 세로 카드, Who to follow 가로 이동을 원본 상태별로 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Who to follow 진입/가로 카드 대조. 촬영 스크롤42px 보정; 48터치·카드 높이와 Coinmonks 배너 자산 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):273)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Follow

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s079-l"></a>`R-S079-L` | 배치: Who to follow 가로 카드 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s079-d"></a>`R-S079-D` | 표시값·입력: 작가와 Publication·소개·팔로워 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s079-s"></a>`R-S079-S` | 상태: 팔로우 대상 추천 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s079-c01"></a>`R-S079-C01` | 컨트롤: Follow | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S079](UNKNOWN.md#u-s079)

<a id="s080"></a>

## S080 — 대명사 검색

- Parity15 현재 검토: [화면별 결과·R/T/U/C](../FE_MEDIUM_PARITY_15_RESULT.md#scope). 기능/실제8081 부분 대조와 원본 시각·동일 fixture·native 대기를 구분한다. 아래 원본 관찰과 최초 감사 이력은 유지한다.

안정 원본 ID: `sc_6c7a00132f3c47e6b2e803743cc10d21` · [원본 분석](<../../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>):118 · [원본 PNG](<../../medium/flows/Profile/Editing profile information/Adding pronouns/screens/03_sc_6c7a00132f3c47e6b2e803743cc10d21.png>)

흐름 맥락: [F56/03](FLOWS.md#f56)

FE 조사 경로: [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>)

기본 담당: [G42](CONTRACTS.md#g42) · 실행 작업: [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32)

**화면별 수용 조건:** Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. he검색후he/her후보·중복제외. 후보48터치/필드테두리차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):274)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 후보, Done

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s080-l"></a>`R-S080-L` | 배치: he 입력 아래 후보 목록 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s080-d"></a>`R-S080-D` | 표시값·입력: he, her 후보 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s080-s"></a>`R-S080-S` | 상태: 검색어에 맞춘 대명사 선택 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s080-c01"></a>`R-S080-C01` | 컨트롤: 후보 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s080-c02"></a>`R-S080-C02` | 컨트롤: Done | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S080](UNKNOWN.md#u-s080)

<a id="s081"></a>

## S081 — 내 리스트 관리 메뉴

- Parity 7 최신 검토: [저장·목록·메모·순서 결과](../FE_MEDIUM_PARITY_07_RESULT.md). 기능/브라우저·원본 차이·미확인/native를 분리한다. 아래 초기 판정은 감사 당시 이력이다.

안정 원본 ID: `sc_71f31ac7803a47f89b2e76b6a9355a7c` · [원본 분석](<../../medium/flows/Library/List detail/Deleting a list/ANALYSIS.md>):86 · [원본 PNG](<../../medium/flows/Library/List detail/Deleting a list/screens/02_sc_71f31ac7803a47f89b2e76b6a9355a7c.png>)

흐름 맥락: [F47/02](FLOWS.md#f47), [F49/02](FLOWS.md#f49), [F51/02](FLOWS.md#f51)

FE 조사 경로: [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>)

기본 담당: [G33](CONTRACTS.md#g33) · 실행 작업: [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25)

**화면별 수용 조건:** 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Edit/private/reorder/delete 기존 명령 연결. View list는 공개 투영 확인용 자체 추가; 메뉴 divider/blur 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):275)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Edit list info, Make list private, Reorder items, Delete list

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s081-l"></a>`R-S081-L` | 배치: 제목 옆 더보기 팝오버 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s081-d"></a>`R-S081-D` | 표시값·입력: 공개 상태 메뉴 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s081-s"></a>`R-S081-S` | 상태: 목록 관리 작업 선택 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s081-c01"></a>`R-S081-C01` | 컨트롤: Edit list info | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s081-c02"></a>`R-S081-C02` | 컨트롤: Make list private | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s081-c03"></a>`R-S081-C03` | 컨트롤: Reorder items | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s081-c04"></a>`R-S081-C04` | 컨트롤: Delete list | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |


원본 해석 경계: Edit list info가 메뉴에 있지만 해당 편집 폼은 별도 흐름·캡처에 없다. 현재 63개 흐름을 모두 문서화한 사실이 이 메뉴까지 분석했다는 뜻은 아니다.

미확인 사항: [U-S081](UNKNOWN.md#u-s081)

<a id="s082"></a>

## S082 — 대명사 선택 빈 폼

- Parity15 현재 검토: [화면별 결과·R/T/U/C](../FE_MEDIUM_PARITY_15_RESULT.md#scope). 기능/실제8081 부분 대조와 원본 시각·동일 fixture·native 대기를 구분한다. 아래 원본 관찰과 최초 감사 이력은 유지한다.

안정 원본 ID: `sc_743e421bb2b14205b19b76062fdf27cd` · [원본 분석](<../../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>):87 · [원본 PNG](<../../medium/flows/Profile/Editing profile information/Adding pronouns/screens/02_sc_743e421bb2b14205b19b76062fdf27cd.png>)

흐름 맥락: [F56/02](FLOWS.md#f56)

FE 조사 경로: [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>)

기본 담당: [G42](CONTRACTS.md#g42) · 실행 작업: [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32)

**화면별 수용 조건:** Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 대명사 빈검색/Done/0·4 대조. 명시적뒤로·웹focusoutline 자체보완, OSkeyboard 미검증. ([과거 기록](<../FE_GOAL_53_RESULT.md>):276)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Add, Done

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s082-l"></a>`R-S082-L` | 배치: Pronouns 시트·선택 입력란 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s082-d"></a>`R-S082-D` | 표시값·입력: 0/4 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s082-s"></a>`R-S082-S` | 상태: 대명사 미선택 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s082-c01"></a>`R-S082-C01` | 컨트롤: Add | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s082-c02"></a>`R-S082-C02` | 컨트롤: Done | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |


원본 해석 경계: 미선택 0/4에서도 Done 링크가 보인다. 후보 선택 없이 자유 문자열을 저장하는 과정은 수록되지 않았다. 선택 편집 완료와 상위 프로필 Save는 별도 단계다.

미확인 사항: [U-S082](UNKNOWN.md#u-s082)

<a id="s083"></a>

## S083 — 작가 About

안정 원본 ID: `sc_74429222aa3d45a89f1980b3aa0b6f9e` · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/ANALYSIS.md>):146 · [원본 PNG](<../../medium/flows/Home/Story detail/Author detail/screens/04_sc_74429222aa3d45a89f1980b3aa0b6f9e.png>)

흐름 맥락: [F17/04](FLOWS.md#f17)

FE 조사 경로: [PublicIdentityScreen.tsx](<../../FE/src/features/community/PublicIdentityScreen.tsx>), [FollowControl.tsx](<../../FE/src/features/community/FollowControl.tsx>), [ConnectionsScreen.tsx](<../../FE/src/features/community/ConnectionsScreen.tsx>)

기본 담당: [G28](CONTRACTS.md#g28) · 실행 작업: [V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14)

**화면별 수용 조건:** Stories/Lists/About, Pinned, member/Friend 시작 월, Follow 성공·메뉴·해제 토스트, Email on/off, 작가와 publication 관계 목록을 각각 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 작성자About본문/회원기간. 원본serif와대체서체, 공유identity의공식웹사이트추가줄 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):277)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Follow, 탭

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s083-l"></a>`R-S083-L` | 배치: About 탭에 소개 단락·회원 기간 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G28](CONTRACTS.md#g28), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s083-d"></a>`R-S083-D` | 표시값·입력: Medium member since October 2023, Friend since December 2023 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G28](CONTRACTS.md#g28), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s083-s"></a>`R-S083-S` | 상태: 소개·회원 이력 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G28](CONTRACTS.md#g28), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s083-c01"></a>`R-S083-C01` | 컨트롤: Follow | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s083-c02"></a>`R-S083-C02` | 컨트롤: 탭 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |


원본 해석 경계: 일반 멤버 시작 월과 Friend 시작 월은 별도로 표시된다. 계정 최초 생성일·과거 결제 내역을 이 두 날짜에서 역산하지 않는다.

미확인 사항: [U-S083](UNKNOWN.md#u-s083)

<a id="s084"></a>

## S084 — 멤버십 선택 처리 중

안정 원본 ID: `sc_754aff4161c64e0685e7331a359eae32` · [원본 분석](<../../medium/flows/Onboarding/Subscribing to Medium/ANALYSIS.md>):119 · [원본 PNG](<../../medium/flows/Onboarding/Subscribing to Medium/screens/03_sc_754aff4161c64e0685e7331a359eae32.png>)

흐름 맥락: [F54/03](FLOWS.md#f54)

FE 조사 경로: [MembershipSheet.tsx](<../../FE/src/features/membership/MembershipSheet.tsx>)

기본 담당: [G48](CONTRACTS.md#g48) · 실행 작업: [V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31)

**화면별 수용 조건:** 월/년 선택, SGD 가격·Save up to $39·혜택·Friend 카드, loading 덮개, 성공 팝업 OK와Start reading을 비교한다. 실제 구매 완료로 표시하지 않는다. Q12에서 모의 결제 안내의 노출·배치 차이를 함께 판정한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. mock결제 진행중 비활성/스피너. 실제StoreKit·Play결제 아님; 로딩opacity·spinner형태 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):278)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 닫기 아이콘 유지

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s084-l"></a>`R-S084-L` | 배치: 플랜 카드 위 반투명 덮개와 중앙 녹색 로딩 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G48](CONTRACTS.md#g48), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="r-s084-d"></a>`R-S084-D` | 표시값·입력: 선택 버튼 흐리게 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G48](CONTRACTS.md#g48), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="r-s084-s"></a>`R-S084-S` | 상태: 요청 처리 중으로 보이는 로딩 상태 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G48](CONTRACTS.md#g48), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="r-s084-c01"></a>`R-S084-C01` | 컨트롤: 닫기 X(로딩 중 표시) | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G48](CONTRACTS.md#g48) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S084](UNKNOWN.md#u-s084)

<a id="s085"></a>

## S085 — 리스트 삭제 후 라이브러리

- Parity 7 최신 검토: [저장·목록·메모·순서 결과](../FE_MEDIUM_PARITY_07_RESULT.md). 기능/브라우저·원본 차이·미확인/native를 분리한다. 아래 초기 판정은 감사 당시 이력이다.

안정 원본 ID: `sc_7749ef5c35474c229a2515a9c2a53878` · [원본 분석](<../../medium/flows/Library/List detail/Deleting a list/ANALYSIS.md>):147 · [원본 PNG](<../../medium/flows/Library/List detail/Deleting a list/screens/04_sc_7749ef5c35474c229a2515a9c2a53878.png>)

흐름 맥락: [F47/04](FLOWS.md#f47)

FE 조사 경로: [LibraryScreen.tsx](<../../FE/src/features/bookmarks/LibraryScreen.tsx>), [HighlightList.tsx](<../../FE/src/features/highlights/HighlightList.tsx>)

기본 담당: [G34](CONTRACTS.md#g34) · 실행 작업: [V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24)

**화면별 수용 조건:** 가로5탭, 초기 배너/닫기·Digest New, New list, 빈/3개/4개 카드 썸네일/잠금/다운로드/메뉴, Highlighted 구절·작성자·원문 링크를 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 삭제 성공 후 알림/Library 복귀. 탭과 알림 겹침 결함 수정 후 재촬영; 기본 목록으로 기사를 자동이동하지 않아 원본4와 현재0 다름. ([과거 기록](<../FE_GOAL_53_RESULT.md>):279)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** New list, 남은 카드

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s085-l"></a>`R-S085-L` | 배치: 목록 화면과 삭제 토스트 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s085-d"></a>`R-S085-D` | 표시값·입력: List deleted and removed from Your library, Reading list 4 stories | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s085-s"></a>`R-S085-S` | 상태: 대상 리스트 제거 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s085-c01"></a>`R-S085-C01` | 컨트롤: New list | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s085-c02"></a>`R-S085-C02` | 컨트롤: 남은 카드 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |


원본 해석 경계: 기본 Reading list가 앞선 생성 화면에서는 3 stories, 삭제 뒤에는 4 stories로 표시된다. 삭제된 리스트의 글이 자동 이동했다는 근거는 없으며 중간 추가 동작이 미수록이다.

미확인 사항: [U-S085](UNKNOWN.md#u-s085)

<a id="s086"></a>

## S086 — 다크 홈 피드

안정 원본 ID: `sc_77bbb7d671f14c6db68071c5921f22fa` · [원본 분석](<../../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>):119 · [원본 PNG](<../../medium/flows/Profile/Settings/Switching to dark mode/screens/03_sc_77bbb7d671f14c6db68071c5921f22fa.png>)

흐름 맥락: [F62/03](FLOWS.md#f62)

FE 조사 경로: [HomeFeedScreen.tsx](<../../FE/src/features/feed/HomeFeedScreen.tsx>), [FollowingFeed.tsx](<../../FE/src/features/community/FollowingFeed.tsx>)

기본 담당: [G50](CONTRACTS.md#g50) · 실행 작업: [V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01)

**화면별 수용 조건:** For you의 원형 −와 Featured의 북마크를 구분한다. 헤더 접힘, 탭 가로 위치, New 배지, 알림 점, 빈 Featured CTA와 채워진 목록을 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. DarkHome실제theme반영. 원본Dark시점피드와현재기본fixture기사구성다름; 알림표시도실제mock상태. ([과거 기록](<../FE_GOAL_53_RESULT.md>):280)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 홈 탭·알림·작성·기사 더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s086-l"></a>`R-S086-L` | 배치: 검정 배경·밝은 카드 텍스트·녹색 작성 버튼 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s086-d"></a>`R-S086-D` | 표시값·입력: For you 활성 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s086-s"></a>`R-S086-S` | 상태: 홈에도 테마 적용 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s086-c01"></a>`R-S086-C01` | 컨트롤: + | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s086-c02"></a>`R-S086-C02` | 컨트롤: For you | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s086-c03"></a>`R-S086-C03` | 컨트롤: Following | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s086-c04"></a>`R-S086-C04` | 컨트롤: Featured | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s086-c05"></a>`R-S086-C05` | 컨트롤: 토픽 탭 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s086-c06"></a>`R-S086-C06` | 컨트롤: 알림 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s086-c07"></a>`R-S086-C07` | 컨트롤: 작성 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s086-c08"></a>`R-S086-C08` | 컨트롤: 카드 원형 − | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s086-c09"></a>`R-S086-C09` | 컨트롤: 카드 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s086-c10"></a>`R-S086-C10` | 컨트롤: 하단 Home | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s086-c11"></a>`R-S086-C11` | 컨트롤: 하단 Explore | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s086-c12"></a>`R-S086-C12` | 컨트롤: 하단 Library | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s086-c13"></a>`R-S086-C13` | 컨트롤: 하단 Profile | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |


원본 해석 경계: For you 카드의 원형 − 아이콘이 다크 화면에서도 보인다. 테마 변경은 이 컨트롤을 북마크로 바꾸지 않으며 다른 날짜의 기사 노출과 분리해 비교한다.

미확인 사항: [U-S086](UNKNOWN.md#u-s086)

<a id="s087"></a>

## S087 — Unsplash 사진 선택

- 2026-11-27 후속: [원본 사진7개가 적용된 상단/검색/카드 배치와 최종 검증](../FE_COMMON_DESIGN_02_RESULT.md#photo-picker-layout-20261127), [별도 Android 실제 실행](../FE_MOBILE_EXECUTION_01_RESULT.md#photo-picker-layout-native-20261127). 제목 중앙·검색 배경/터치·키보드 배치를 보정했고 Back/안내·대체 서체·원본 없는 상태의 차이는 남긴다. 아래 미확보/미실행은 당시 이력이며 전체 동일성 완료로 승격하지 않는다.
- Parity9: 행 정렬 대신 독립2열과 키보드 회피 보완; 원본 사진/작가 자산은 미확보, 현재 local fixture 유지. [모든 R의 현재 판정·검증](../FE_MEDIUM_PARITY_09_RESULT.md). 과거 관찰/계약은 보존하며 시각 동일성 완료로 승격하지 않는다.

안정 원본 ID: `sc_785431954ec4405eb0a3b22debce165a` · [원본 분석](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>):184 · [원본 PNG](<../../medium/flows/Home/Publishing a story/screens/05_sc_785431954ec4405eb0a3b22debce165a.png>)

흐름 맥락: [F08/05](FLOWS.md#f08)

FE 조사 경로: [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>), [ImagePickerSheet.tsx](<../../FE/src/features/editor/ImagePickerSheet.tsx>)

기본 담당: [G37](CONTRACTS.md#g37) · 실행 작업: [V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08)

**화면별 수용 조건:** 사진 소스 시트, Unsplash 2열 가변 높이와 작가 표시, 준비 중 덮개·스피너·녹색 테두리·X, 삽입 후 키보드 상태를 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 로컬4사진 mock 검색과 원본 Unsplash 다열 사진 대조. 서비스/원본 사진 미연결, Back와 로컬 안내는 자체 보완. ([과거 기록](<../FE_GOAL_53_RESULT.md>):281)

**현재 판정:** 전체 동일성 미완료. 2026-11-27에 앞7개 원본 사진·배치·검색/취소/재진입·삽입을 별도 Android에서 대조했다. 원본과 다른 표시·fixture·플랫폼 범위는 위 최신 결과를 따른다. 아래 표의 코드 경로/미검증 문구는 최초 문서화 당시 판정이며, 최신 부분 대조를 전체 원본 동일성으로 확대하지 않는다.

**원본 컨트롤 관찰 문장:** 사진 항목, Cancel

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s087-l"></a>`R-S087-L` | 배치: 검색 필드 아래 2열 가변 높이 사진과 작가 이름 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G37](CONTRACTS.md#g37), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08) |
| <a id="r-s087-d"></a>`R-S087-D` | 표시값·입력: Search photos 빈값 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G37](CONTRACTS.md#g37), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08) |
| <a id="r-s087-s"></a>`R-S087-S` | 상태: 외부 사진 탐색 시트 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G37](CONTRACTS.md#g37), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08) |
| <a id="r-s087-c01"></a>`R-S087-C01` | 컨트롤: Search photos | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G37](CONTRACTS.md#g37) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08) |
| <a id="r-s087-c02"></a>`R-S087-C02` | 컨트롤: 사진 항목 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G37](CONTRACTS.md#g37) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08) |
| <a id="r-s087-c03"></a>`R-S087-C03` | 컨트롤: Cancel | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G37](CONTRACTS.md#g37) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S087](UNKNOWN.md#u-s087)

<a id="s088"></a>

## S088 — Hans 음성 선택
- **Parity12 최신:** [요구별 상태·검사·잔여](../FE_MEDIUM_PARITY_12_RESULT.md#screen-status). Hans·Done/취소·재진입·늦은 응답 검증. 실제 발화·원본 영속성 미확인. 원본 관찰/기존 증거는 보존하며 새 실제 렌더 비교 완료가 아니다.


안정 원본 ID: `sc_78bee192bd2041a98f6721240f2352d5` · [원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>):179 · [원본 PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/05_sc_78bee192bd2041a98f6721240f2352d5.png>)

흐름 맥락: [F28/05](FLOWS.md#f28)

FE 조사 경로: [ListeningSpeedPanel.tsx](<../../FE/src/features/listening/ListeningSpeedPanel.tsx>), [ListeningVoicePanel.tsx](<../../FE/src/features/listening/ListeningVoicePanel.tsx>)

기본 담당: [G46](CONTRACTS.md#g46) · 실행 작업: [V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19)

**화면별 수용 조건:** 세로 slider·1x/200 WPM·2.5x/490 WPM·145% 문구, voice 언어 section/국기/성별/나라/선택색, Emma→Hans와 Done, 더보기6행을 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Hans 선택 공유 상태 일치, 동일 스크롤/아이콘 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):282)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Done, 다른 음성

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s088-l"></a>`R-S088-L` | 배치: 독일어 Hans 행 회색·녹색 체크 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G46](CONTRACTS.md#g46), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s088-d"></a>`R-S088-D` | 표시값·입력: Hans 선택 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G46](CONTRACTS.md#g46), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s088-s"></a>`R-S088-S` | 상태: 음성 선택 변경 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G46](CONTRACTS.md#g46), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s088-c01"></a>`R-S088-C01` | 컨트롤: Done | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G46](CONTRACTS.md#g46) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s088-c02"></a>`R-S088-C02` | 컨트롤: 다른 음성 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G46](CONTRACTS.md#g46) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S088](UNKNOWN.md#u-s088)

<a id="s089"></a>

## S089 — 다운로드 표시 변경

**Parity 8 최신 검토:** [다운로드 사본·표시/복귀·부분 시각 비교 결과](../FE_MEDIUM_PARITY_08_RESULT.md). 원본 PNG·R/T/U/C 대조 및 mock 구현/두 검토·브라우저 확인, 현재 타입/lint·전체302 suites/1578 tests·export 통과. 원본 자산/서체·U/native 잔여 유지. 아래 현재 판정/행별 코멘트는 초기 문서 감사 이력이며 최신 실행을 대신하지 않는다.

안정 원본 ID: `sc_7b31963fc5c64fc8b9268beab4009201` · [원본 분석](<../../medium/flows/Library/List detail/Downloading a list/ANALYSIS.md>):115 · [원본 PNG](<../../medium/flows/Library/List detail/Downloading a list/screens/03_sc_7b31963fc5c64fc8b9268beab4009201.png>)

흐름 맥락: [F48/03](FLOWS.md#f48)

FE 조사 경로: [DownloadControl.tsx](<../../FE/src/features/downloads/DownloadControl.tsx>)

기본 담당: [G35](CONTRACTS.md#g35) · 실행 작업: [V26](../FE_MEDIUM_PARITY_BACKLOG.md#v26)

**화면별 수용 조건:** 목록 시작 아이콘→정지 사각형→목록/각 기사 채운 아이콘을 확인한다. 메모리 사본과 실제 비행기 모드/재시작 캐시를 구분한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 목록 다운로드 완료 아이콘과 기사별 표시 확인. 원본서체·행 높이·Viewed 실제 기록 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):283)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 다운로드 아이콘, 더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s089-l"></a>`R-S089-L` | 배치: 상단 및 기사별 내려받기 아이콘 채움 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G35](CONTRACTS.md#g35), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V26](../FE_MEDIUM_PARITY_BACKLOG.md#v26) |
| <a id="r-s089-d"></a>`R-S089-D` | 표시값·입력: 4 stories | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G35](CONTRACTS.md#g35), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V26](../FE_MEDIUM_PARITY_BACKLOG.md#v26) |
| <a id="r-s089-s"></a>`R-S089-S` | 상태: 다운로드 완료를 나타내는 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G35](CONTRACTS.md#g35), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V26](../FE_MEDIUM_PARITY_BACKLOG.md#v26) |
| <a id="r-s089-c01"></a>`R-S089-C01` | 컨트롤: 다운로드 아이콘 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G35](CONTRACTS.md#g35) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V26](../FE_MEDIUM_PARITY_BACKLOG.md#v26) |
| <a id="r-s089-c02"></a>`R-S089-C02` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G35](CONTRACTS.md#g35) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V26](../FE_MEDIUM_PARITY_BACKLOG.md#v26) |


원본 해석 경계: 상단 리스트 아이콘과 각 글 앞 다운로드 아이콘이 채워진 형태로 바뀐다. 리스트 단위 상태와 글별 다운로드 상태를 구분하되 실제 오프라인 재생·저장 바이트 수는 확인하지 않았다.

미확인 사항: [U-S089](UNKNOWN.md#u-s089)

<a id="s090"></a>

## S090 — 팔로잉 계정 목록

안정 원본 ID: `sc_7c89f4496e7f4cb0b5c23b776080b6bf` · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/Following list/ANALYSIS.md>):83 · [원본 PNG](<../../medium/flows/Home/Story detail/Author detail/Following list/screens/02_sc_7c89f4496e7f4cb0b5c23b776080b6bf.png>)

흐름 맥락: [F21/02](FLOWS.md#f21)

FE 조사 경로: [PublicIdentityScreen.tsx](<../../FE/src/features/community/PublicIdentityScreen.tsx>), [FollowControl.tsx](<../../FE/src/features/community/FollowControl.tsx>), [ConnectionsScreen.tsx](<../../FE/src/features/community/ConnectionsScreen.tsx>)

기본 담당: [G28](CONTRACTS.md#g28) · 실행 작업: [V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14)

**화면별 수용 조건:** Stories/Lists/About, Pinned, member/Friend 시작 월, Follow 성공·메뉴·해제 토스트, Email on/off, 작가와 publication 관계 목록을 각각 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Following명단의작가/publication·Follow및verified대조. 소개줄수/row간격·프로필tab맥락차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):284)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Follow, 계정 행, 뒤로

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s090-l"></a>`R-S090-L` | 배치: 아바타·이름·소개·Follow 반복 행 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G28](CONTRACTS.md#g28), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s090-d"></a>`R-S090-D` | 표시값·입력: 여러 사용자와 The Medium Blog 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G28](CONTRACTS.md#g28), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s090-s"></a>`R-S090-S` | 상태: 관계 목록 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G28](CONTRACTS.md#g28), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s090-c01"></a>`R-S090-C01` | 컨트롤: Follow | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s090-c02"></a>`R-S090-C02` | 컨트롤: 계정 행 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s090-c03"></a>`R-S090-C03` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |


원본 해석 경계: 사용자와 The Medium Blog가 함께 보이는 관계 목록이다. 직전 작가 화면에서는 Home, 이 캡처에서는 Explore 하단 탭이 선택되어 있어 단일 연속 이동으로 단정하지 않는다.

미확인 사항: [U-S090](UNKNOWN.md#u-s090)

<a id="s091"></a>

## S091 — Self Improvement 토픽

안정 원본 ID: `sc_7de88da749774d0483716f2e861fb080` · [원본 분석](<../../medium/flows/Explore/Topic detail/Browse curated list/ANALYSIS.md>):86 · [원본 PNG](<../../medium/flows/Explore/Topic detail/Browse curated list/screens/02_sc_7de88da749774d0483716f2e861fb080.png>)

흐름 맥락: [F04/02](FLOWS.md#f04)

FE 조사 경로: [TopicScreen.tsx](<../../FE/src/features/topics/TopicScreen.tsx>)

기본 담당: [G30](CONTRACTS.md#g30) · 실행 작업: [V03](../FE_MEDIUM_PARITY_BACKLOG.md#v03)

**화면별 수용 조건:** Life와 Self Improvement는 별도 대상이다. Follow/Following·집계·관련 칩·헤더 축소와 See the full list의 대상 보존을 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Self Improvement 선택 및 Following 실제 저장 후 촬영; Life→주제 전환과 뒤로 확인. ([과거 기록](<../FE_GOAL_53_RESULT.md>):285)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Following, 공유

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s091-l"></a>`R-S091-L` | 배치: 선택 칩 변경·추천 기사 교체 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G30](CONTRACTS.md#g30), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V03](../FE_MEDIUM_PARITY_BACKLOG.md#v03) |
| <a id="r-s091-d"></a>`R-S091-D` | 표시값·입력: 10.6M followers, 1M Stories, Following | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G30](CONTRACTS.md#g30), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V03](../FE_MEDIUM_PARITY_BACKLOG.md#v03) |
| <a id="r-s091-s"></a>`R-S091-S` | 상태: 팔로우 중인 다른 토픽 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G30](CONTRACTS.md#g30), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V03](../FE_MEDIUM_PARITY_BACKLOG.md#v03) |
| <a id="r-s091-c01"></a>`R-S091-C01` | 컨트롤: Following | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G30](CONTRACTS.md#g30) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V03](../FE_MEDIUM_PARITY_BACKLOG.md#v03) |
| <a id="r-s091-c02"></a>`R-S091-C02` | 컨트롤: 공유 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G30](CONTRACTS.md#g30), [G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V03](../FE_MEDIUM_PARITY_BACKLOG.md#v03) |


원본 해석 경계: Life의 Follow에서 Self Improvement의 Following으로 바뀌었지만 서로 다른 토픽이다. 동일 토픽에 대한 팔로우 성공 전후로 해석하지 않는다.

미확인 사항: [U-S091](UNKNOWN.md#u-s091)

<a id="s092"></a>

## S092 — 답글 내용 입력

- **Parity10 판정:** 답글 입력/빈값/전송/실패 재시도 유지. 늦은 결과·중복 제출 자동 검증. 실제 키보드 배치 대기. [이번 코드/검사·한계](../FE_MEDIUM_PARITY_10_RESULT.md#screen-status). 원본·과거 판정은 아래에 보존한다.

안정 원본 ID: `sc_8202187474f444de8773b38fe92c4d82` · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Replying a response/ANALYSIS.md>):116 · [원본 PNG](<../../medium/flows/Home/Story detail/Responses/Replying a response/screens/03_sc_8202187474f444de8773b38fe92c4d82.png>)

흐름 맥락: [F35/03](FLOWS.md#f35)

FE 조사 경로: [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>)

기본 담당: [G26](CONTRACTS.md#g26) · 실행 작업: [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20)

**화면별 수용 조건:** 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Agree 답글입력. source별개세션과앱연속조작목록차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):286)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Cancel, 전송

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s092-l"></a>`R-S092-L` | 배치: 대상 안내 아래 키보드와 작성창 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s092-d"></a>`R-S092-D` | 표시값·입력: Agree! 입력 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s092-s"></a>`R-S092-S` | 상태: 답글 제출 전 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s092-c01"></a>`R-S092-C01` | 컨트롤: Cancel | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s092-c02"></a>`R-S092-C02` | 컨트롤: 전송 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S092](UNKNOWN.md#u-s092)

<a id="s093"></a>

## S093 — 작가 프로필의 다른 캡처 상태

안정 원본 ID: `sc_8208a84fba4c4046aa1d364055d14db7` · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/Blocking an author/ANALYSIS.md>):145 · [원본 PNG](<../../medium/flows/Home/Story detail/Author detail/Blocking an author/screens/04_sc_8208a84fba4c4046aa1d364055d14db7.png>)

흐름 맥락: [F18/04](FLOWS.md#f18)

FE 조사 경로: [ModerationDialogs.tsx](<../../FE/src/features/moderation/ModerationDialogs.tsx>), [articleModeration.ts](<../../FE/src/features/moderation/articleModeration.ts>)

기본 담당: [G29](CONTRACTS.md#g29) · 실행 작업: [V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15)

**화면별 수용 조건:** 메뉴 순서·파랑/빨강·Cancel, 성공 토스트, 신고 radio와 Also block checkbox, 사유 전후 Report 상태를 비교한다. 차단 후 원본 카드 잔존과 자체 접근 제한의 충돌을 기록한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 차단후재진입에서도본문숨김/해제가능. 원본Stories노출을보안정책과같다고추측하지않음. ([과거 기록](<../FE_GOAL_53_RESULT.md>):287)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 더보기, 기사 저장

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s093-l"></a>`R-S093-L` | 배치: 상단 작가 제목, Stories·About만, Follow 버튼 없음 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G29](CONTRACTS.md#g29), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s093-d"></a>`R-S093-D` | 표시값·입력: 10.8K followers, 25 following | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G29](CONTRACTS.md#g29), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s093-s"></a>`R-S093-S` | 상태: 차단 흐름 후 별도 프로필 상태 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G29](CONTRACTS.md#g29), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s093-c01"></a>`R-S093-C01` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28), [G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s093-c02"></a>`R-S093-C02` | 컨트롤: 작가 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s093-c03"></a>`R-S093-C03` | 컨트롤: Stories | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28), [G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s093-c04"></a>`R-S093-C04` | 컨트롤: About | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28), [G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s093-c05"></a>`R-S093-C05` | 컨트롤: 기사 저장 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29), [G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s093-c06"></a>`R-S093-C06` | 컨트롤: 기사 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S093](UNKNOWN.md#u-s093)

<a id="s094"></a>

## S094 — 대명사 2개 선택

- Parity15 현재 검토: [화면별 결과·R/T/U/C](../FE_MEDIUM_PARITY_15_RESULT.md#scope). 기능/실제8081 부분 대조와 원본 시각·동일 fixture·native 대기를 구분한다. 아래 원본 관찰과 최초 감사 이력은 유지한다.

안정 원본 ID: `sc_82178c6b5a56471cb64fecb5a4e4bc4e` · [원본 분석](<../../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>):178 · [원본 PNG](<../../medium/flows/Profile/Editing profile information/Adding pronouns/screens/05_sc_82178c6b5a56471cb64fecb5a4e4bc4e.png>)

흐름 맥락: [F56/05](FLOWS.md#f56)

FE 조사 경로: [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>)

기본 담당: [G42](CONTRACTS.md#g42) · 실행 작업: [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32)

**화면별 수용 조건:** Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. he/him2·4/Done초안확정. 칩모서리·삭제아이콘·서체 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):288)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 칩 삭제, Add, Done

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s094-l"></a>`R-S094-L` | 배치: he·him 칩 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s094-d"></a>`R-S094-D` | 표시값·입력: 2/4 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s094-s"></a>`R-S094-S` | 상태: 두 대명사 선택 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s094-c01"></a>`R-S094-C01` | 컨트롤: 칩 삭제 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s094-c02"></a>`R-S094-C02` | 컨트롤: Add | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s094-c03"></a>`R-S094-C03` | 컨트롤: Done | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S094](UNKNOWN.md#u-s094)

<a id="s095"></a>

## S095 — Library 초기 목록

- Parity 7 최신 검토: [저장·목록·메모·순서 결과](../FE_MEDIUM_PARITY_07_RESULT.md). 기능/브라우저·원본 차이·미확인/native를 분리한다. 아래 초기 판정은 감사 당시 이력이다.

안정 원본 ID: `sc_84e0421de98041bbb014822fc05dd3fb` · [원본 분석](<../../medium/flows/Library/ANALYSIS.md>):87 · [원본 PNG](<../../medium/flows/Library/screens/02_sc_84e0421de98041bbb014822fc05dd3fb.png>)

흐름 맥락: [F41/02](FLOWS.md#f41)

FE 조사 경로: [LibraryScreen.tsx](<../../FE/src/features/bookmarks/LibraryScreen.tsx>), [HighlightList.tsx](<../../FE/src/features/highlights/HighlightList.tsx>)

기본 담당: [G34](CONTRACTS.md#g34) · 실행 작업: [V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24)

**화면별 수용 조건:** 가로5탭, 초기 배너/닫기·Digest New, New list, 빈/3개/4개 카드 썸네일/잠금/다운로드/메뉴, Highlighted 구절·작성자·원문 링크를 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 빈 Reading list/소개 배너/탭 배치 대조. mock 사용자 이름과 아이콘 선/서체 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):289)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** New list, Start a list, 배너 닫기, 다운로드, 더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s095-l"></a>`R-S095-L` | 배치: Your library·New list·가로 탭·시작 배너·Reading list 카드 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s095-d"></a>`R-S095-D` | 표시값·입력: Your lists 활성, No stories·자물쇠 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s095-s"></a>`R-S095-S` | 상태: 기본 읽기 목록이 비어 있음 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s095-c01"></a>`R-S095-C01` | 컨트롤: New list | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s095-c02"></a>`R-S095-C02` | 컨트롤: Your lists | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s095-c03"></a>`R-S095-C03` | 컨트롤: Saved lists | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G32](CONTRACTS.md#g32), [G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s095-c04"></a>`R-S095-C04` | 컨트롤: Digest | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s095-c05"></a>`R-S095-C05` | 컨트롤: Highlighted | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G27](CONTRACTS.md#g27), [G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s095-c06"></a>`R-S095-C06` | 컨트롤: Start a list | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s095-c07"></a>`R-S095-C07` | 컨트롤: 배너 닫기 X | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s095-c08"></a>`R-S095-C08` | 컨트롤: Reading list 카드 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s095-c09"></a>`R-S095-C09` | 컨트롤: 다운로드 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G34](CONTRACTS.md#g34), [G35](CONTRACTS.md#g35) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s095-c10"></a>`R-S095-C10` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s095-v"></a>`R-S095-V` | PNG 추가 세부 관찰: Digest 옆 New 배지, 녹색 시작 배너의 북마크 그림과 닫기, 빈 카드의 세 칸 이미지 자리도 비교 대상이다. | 일부 포함: 공통 시각 계약에 포함되나 이 요소 묶음의 독립 판정 필요<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S095](UNKNOWN.md#u-s095)

<a id="s096"></a>

## S096 — 과거 다이제스트 선택

안정 원본 ID: `sc_8866044a55164824903265c3b8b97337` · [원본 분석](<../../medium/flows/Library/Filtering digest/ANALYSIS.md>):116 · [원본 PNG](<../../medium/flows/Library/Filtering digest/screens/03_sc_8866044a55164824903265c3b8b97337.png>)

흐름 맥락: [F43/03](FLOWS.md#f43)

FE 조사 경로: [DigestPanel.tsx](<../../FE/src/features/digest/DigestPanel.tsx>), [NotificationSettingsScreen.tsx](<../../FE/src/features/notifications/NotificationSettingsScreen.tsx>), [LibraryScreen.tsx](<../../FE/src/features/bookmarks/LibraryScreen.tsx>), [IdentityLink.tsx](<../../FE/src/features/community/IdentityLink.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>), [ResponseButton.tsx](<../../FE/src/features/responses/ResponseButton.tsx>)

기본 담당: [G34](CONTRACTS.md#g34) · 실행 작업: [V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27)

**화면별 수용 조건:** June12→June8의 임시 radio/Done·확정 날짜·바뀐 기사, last10 안내와 제목/카드 반응/저장을 비교한다. 날짜10일과 발행10개를 구분한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. June8 초안 선택·Done 전 적용 안 됨. 빈 발행일을 임의로 생성하지 않아 날짜 목록 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):290)

**현재 판정 — Parity 6:** [이번 실행](../FE_MEDIUM_PARITY_06_RESULT.md). 임시 June8 라디오·Done·취소와 화면 이탈 시 초안 폐기를 확인했다. 기능 mock 검증과 시각 차이·U/native 대기를 구분하며 전체 동일성은 미완료다. 사용자 지시로 캡처 파일은 저장하지 않았다. 아래 개별 행은 최초 조사 이력이며 이번 판정은 이 문단과 결과 문서를 따른다.

**원본 컨트롤 관찰 문장:** Done

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s096-l"></a>`R-S096-L` | 배치: 같은 날짜 목록 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s096-d"></a>`R-S096-D` | 표시값·입력: June 8 2025 체크 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s096-s"></a>`R-S096-S` | 상태: 다른 날짜 임시 선택 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s096-c01"></a>`R-S096-C01` | 컨트롤: Done | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S096](UNKNOWN.md#u-s096)

<a id="s097"></a>

## S097 — 구절 인용 응답 작성 시작

- **Parity10 판정:** 초기 인용을 보존하고 작성 진입에서 입력 포커스 요청. 선택 구간의 실제 native UX는11, 키보드 검증은10의 대기. [이번 코드/검사·한계](../FE_MEDIUM_PARITY_10_RESULT.md#screen-status). 원본·과거 판정은 아래에 보존한다.

안정 원본 ID: `sc_8accfd977771416a89329576c7ba48d8` · [원본 분석](<../../medium/flows/Home/Story detail/Responding to a phrase/ANALYSIS.md>):86 · [원본 PNG](<../../medium/flows/Home/Story detail/Responding to a phrase/screens/02_sc_8accfd977771416a89329576c7ba48d8.png>)

흐름 맥락: [F29/02](FLOWS.md#f29)

FE 조사 경로: [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>)

기본 담당: [G26](CONTRACTS.md#g26) · 실행 작업: [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20)

**화면별 수용 조건:** 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 인용 초안/비활성 제출. 실제OS키보드 없음,7건 로컬 응답과 원본834 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):291)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 회색 전송 버튼

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s097-l"></a>`R-S097-L` | 배치: 응답 시트 하단 인용 카드·입력창·키보드 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s097-d"></a>`R-S097-D` | 표시값·입력: 인용 문구 자동 포함, 본문 빈값 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s097-s"></a>`R-S097-S` | 상태: 인용 포함 응답 초안 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s097-c01"></a>`R-S097-C01` | 컨트롤: 회색 전송 버튼 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |


원본 해석 경계: 원문 인용이 이미 포함되어 있어도 응답 본문이 비어 있을 때 전송 화살표는 회색이다. 다음 캡처에서 본문을 입력하면 검게 바뀌므로 인용 포함 여부와 본문 입력 여부를 별도 상태로 기록한다.

미확인 사항: [U-S097](UNKNOWN.md#u-s097)

<a id="s098"></a>

## S098 — Medium 검색 결과

안정 원본 ID: `sc_8dc9eeb5f9d244ca9fa6fb7a973de82f` · [원본 분석](<../../medium/flows/Explore/Searching Medium/ANALYSIS.md>):114 · [원본 PNG](<../../medium/flows/Explore/Searching Medium/screens/03_sc_8dc9eeb5f9d244ca9fa6fb7a973de82f.png>)

흐름 맥락: [F02/03](FLOWS.md#f02)

FE 조사 경로: [SearchScreen.tsx](<../../FE/src/features/search/SearchScreen.tsx>), [CatalogSearchResults.tsx](<../../FE/src/features/search/CatalogSearchResults.tsx>), [ExploreSections.tsx](<../../FE/src/features/search/ExploreSections.tsx>)

기본 담당: [G50](CONTRACTS.md#g50) · 실행 작업: [V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02)

**화면별 수용 조건:** 검색 빈 화면의 토픽 행, Stories 결과, 다섯 탭과 X를 분리한다. Trending 순위, Staff Picks 가로 카드, Recommended 세로 카드, Who to follow 가로 이동을 원본 상태별로 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 로딩 상태를 결과 캡처로 취급한 촬영 결함 수정. 결과 제목 및 visible spinner 완료를 기다려 재촬영. ([과거 기록](<../FE_GOAL_53_RESULT.md>):292)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Stories, People, Publications, Topics, Lists, 지우기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s098-l"></a>`R-S098-L` | 배치: 검색창·유형 탭·기사 카드 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s098-d"></a>`R-S098-D` | 표시값·입력: Mindfulness 검색, Stories 활성 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s098-s"></a>`R-S098-S` | 상태: 기사 검색 결과 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s098-c01"></a>`R-S098-C01` | 컨트롤: Stories | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s098-c02"></a>`R-S098-C02` | 컨트롤: People | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s098-c03"></a>`R-S098-C03` | 컨트롤: Publications | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s098-c04"></a>`R-S098-C04` | 컨트롤: Topics | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s098-c05"></a>`R-S098-C05` | 컨트롤: Lists | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s098-c06"></a>`R-S098-C06` | 컨트롤: 지우기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |


원본 해석 경계: 검색어 오른쪽 X와 다섯 결과 유형 탭이 있다. 이 흐름은 Stories 결과만 보여주며 People·Publications·Topics·Lists 결과 내용과 검색 실패·0건 상태는 수록되지 않았다.

미확인 사항: [U-S098](UNKNOWN.md#u-s098)

<a id="s099"></a>

## S099 — 추천 조정의 Suggestions

안정 원본 ID: `sc_90bc6a79e86d436e89d94d7dc82b624c` · [원본 분석](<../../medium/flows/Home/Refine recommendations/ANALYSIS.md>):87 · [원본 PNG](<../../medium/flows/Home/Refine recommendations/screens/02_sc_90bc6a79e86d436e89d94d7dc82b624c.png>)

흐름 맥락: [F12/02](FLOWS.md#f12), [F13/01](FLOWS.md#f13)

FE 조사 경로: [RefineRecommendationsScreen.tsx](<../../FE/src/features/recommendations/RefineRecommendationsScreen.tsx>)

기본 담당: [G31](CONTRACTS.md#g31) · 실행 작업: [V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11)

**화면별 수용 조건:** 네 탭, All/Writers/Publications/Topics, 빈 Following, 종류별 count/See all, Follow/Following, See more suggestions를 개별 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 추천Topics5행/metadata/Follow 대조. 선택tab/복귀context는 Profile진입이므로 원본Home선택과다름; 서체/간격차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):293)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Follow, 유형 드롭다운, 뒤로

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s099-l"></a>`R-S099-L` | 배치: 상단 설명과 Following·Reading history·Muted·Suggestions 탭 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s099-d"></a>`R-S099-D` | 표시값·입력: Suggestions 활성, Topics 필터 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s099-s"></a>`R-S099-S` | 상태: 추천 토픽과 기사·팔로워 집계 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s099-c01"></a>`R-S099-C01` | 컨트롤: Follow | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s099-c02"></a>`R-S099-C02` | 컨트롤: 유형 드롭다운 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s099-c03"></a>`R-S099-C03` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |


원본 해석 경계: Refine recommendations에는 Following·Reading history·Muted·Suggestions 네 탭이 있다. Muted 탭의 존재는 확인되지만 해당 탭 내용은 이 흐름에 수록되지 않았다.

미확인 사항: [U-S099](UNKNOWN.md#u-s099)

<a id="s100"></a>

## S100 — 응답 시트와 중첩 답글

- **Parity10 판정:** 중첩 선/들여쓰기·정렬·정책/닫기·기본 루트수 연결 유지. 정책 전환 중 카드 메뉴/늦은 오류 정리. 최대 깊이/집계 원본 정책 미확인. [이번 코드/검사·한계](../FE_MEDIUM_PARITY_10_RESULT.md#screen-status). 원본·과거 판정은 아래에 보존한다.

안정 원본 ID: `sc_915888473ac24e8987c996b8954f54c6` · [원본 분석](<../../medium/flows/Home/Story detail/Responses/ANALYSIS.md>):85 · [원본 PNG](<../../medium/flows/Home/Story detail/Responses/screens/02_sc_915888473ac24e8987c996b8954f54c6.png>)

흐름 맥락: [F30/02](FLOWS.md#f30), [F31/01](FLOWS.md#f31), [F34/01](FLOWS.md#f34), [F35/01](FLOWS.md#f35), [F36/01](FLOWS.md#f36)

FE 조사 경로: [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>)

기본 담당: [G26](CONTRACTS.md#g26) · 실행 작업: [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20)

**화면별 수용 조건:** 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Most Relevant/댓글·답글 실제 연결. 원본834를 복제하지 않고7로집계,48터치영역/간격 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):294)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Hide replies, Reply, 더보기, 정책, 닫기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s100-l"></a>`R-S100-L` | 배치: Responses 834 시트, Most Relevant 필터, 들여쓴 답글 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s100-d"></a>`R-S100-D` | 표시값·입력: 하단 빈 작성창 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s100-s"></a>`R-S100-S` | 상태: 복수 깊이 답글 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s100-c01"></a>`R-S100-C01` | 컨트롤: Hide replies | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s100-c02"></a>`R-S100-C02` | 컨트롤: Reply | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s100-c03"></a>`R-S100-C03` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s100-c04"></a>`R-S100-C04` | 컨트롤: 정책 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s100-c05"></a>`R-S100-C05` | 컨트롤: 닫기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |


원본 해석 경계: 응답은 들여쓰기·세로선으로 부모와 답글을 구분한다. Hide replies는 접기, Read more는 본문 펼치기이므로 답글 더 보기와 서로 다른 상태로 다룬다.

미확인 사항: [U-S100](UNKNOWN.md#u-s100)
