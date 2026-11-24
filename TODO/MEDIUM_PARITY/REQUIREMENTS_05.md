# 화면별 원본 요구사항

**Parity14 커밋 전 추가 검토(2026-11-24):** [재검토·현재 검사·커밋 범위](../FE_MEDIUM_PARITY_14_RESULT.md#pre-commit-review). 추가 코드 결함 없이 타입/lint·관련12 suites/82 tests를 새로 통과했고 이번 act 경고0이다. 앞선 전체1722건 이후 코드 변경·552개 codeInputs 해시 불일치0. 사용자 요청에 따라36파일 로컬 커밋 범위를 확정했다. 원본/시각·S043/native 및9~13 잔여는 유지하며 push·배포·15 구현은 하지 않는다. 아래 미커밋 기록은 최초 실행 이력이다.

**Parity14 최초 구현·검증(2026-11-24):** [구현·이번 검사·원본 차이·담당](../FE_MEDIUM_PARITY_14_RESULT.md). V29/V30의16화면·99 R·19 T/U/C를 대조하고 이메일 약관/수명·추천 카탈로그/조회·온보딩 뒤로/source 경계를 보완했다. 타입/lint·최종 전체316 suites/1722 tests 통과, 이번 act 경고0. 실제8081 부분 대조와 자동 검증을 구분하며 S043은18/21, 원본 자산/시각/OS 대기는14 및 관련 담당에 유지한다.9~13의 잔여 이전·전체 종료 승인은 아니다. 커밋·push·배포·15 진행 없음.

**Parity11 추가 보완(2026-11-24):** [최신 판정·근거·담당](../FE_MEDIUM_PARITY_11_RESULT.md#additional-review). S122의 선택 입력 강조·웹/기존 메뉴 실측을 보완했다. native 대체 메뉴는 문단 내부 흐름 배치이고 다중 문단은 별도 picker다. R-S122-L/D/S/V 전체 시각 일치 완료가 아니다.

[검토 요약](../FE_MEDIUM_PARITY_AUDIT.md) · [보완 작업](../FE_MEDIUM_PARITY_BACKLOG.md) · [계약 원문](CONTRACTS.md) · [흐름 맥락](FLOWS.md) · [미확인 항목](UNKNOWN.md)

이번 목록은 원본에서 추출한 **관찰 요구사항**이다. L=배치, D=표시값/입력, S=상태, C=컨트롤, V=PNG 추가 세부 관찰이다. L/D/S는 원문 한 문장의 모든 요소를 포함하는 묶음이며 단일 버튼 수가 아니다. C는 명시적으로 나눈 조작점이다. 이 숫자를 기능 완성률의 분모로 사용하지 않는다.

`포함`은 기능 작업 범위에 있다는 판정이며 현재 FE 동일 재현 완료라는 뜻이 아니다. `일부 포함`은 공통/상위 계약은 있지만 개별 조건이 분산된 경우다. 코드 링크는 구현 조사 위치이며 자동으로 해당 요구의 통과를 증명하지 않는다. 과거 Goal53 판정은 당시 증거이고 현재 재촬영 결과가 아니다. 모든 행의 완료 조건은 해당 원본 PNG의 데이터·상태를 맞춘 비교와 FLOWS의 진입/복귀 검증을 함께 적용한다.


<a id="s101"></a>

## S101 — 비공개 리스트 표시

- Parity 7 최신 검토: [저장·목록·메모·순서 결과](../FE_MEDIUM_PARITY_07_RESULT.md). 기능/브라우저·원본 차이·미확인/native를 분리한다. 아래 초기 판정은 감사 당시 이력이다.

안정 원본 ID: `sc_91b39d224f6b4c9ab7573c0c3df633eb` · [원본 분석](<../../medium/flows/Library/List detail/Making a list private/ANALYSIS.md>):178 · [원본 PNG](<../../medium/flows/Library/List detail/Making a list private/screens/05_sc_91b39d224f6b4c9ab7573c0c3df633eb.png>)

흐름 맥락: [F49/05](FLOWS.md#f49)

FE 조사 경로: [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>)

기본 담당: [G33](CONTRACTS.md#g33) · 실행 작업: [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25)

**화면별 수용 조건:** 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 확정 비공개 표시 유지. 원본 작은 inline lock 대신 별도 Private행, 다운로드 정책상 재갱신 안내 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):295)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 더보기·다운로드

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s101-l"></a>`R-S101-L` | 배치: 리스트 메타데이터에 자물쇠 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s101-d"></a>`R-S101-D` | 표시값·입력: 4 stories·자물쇠 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s101-s"></a>`R-S101-S` | 상태: 비공개 상태 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s101-c01"></a>`R-S101-C01` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s101-c02"></a>`R-S101-C02` | 컨트롤: 다운로드 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G35](CONTRACTS.md#g35) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s101-c03"></a>`R-S101-C03` | 컨트롤: 목록 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s101-c04"></a>`R-S101-C04` | 컨트롤: Add a note | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s101-c05"></a>`R-S101-C05` | 컨트롤: 기사 저장 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s101-c06"></a>`R-S101-C06` | 컨트롤: 기사 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s101-c07"></a>`R-S101-C07` | 컨트롤: 목록 박수 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G32](CONTRACTS.md#g32), [G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s101-c08"></a>`R-S101-C08` | 컨트롤: 목록 응답 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G32](CONTRACTS.md#g32), [G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s101-c09"></a>`R-S101-C09` | 컨트롤: 목록 공유 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |


원본 해석 경계: 자물쇠가 표시되어도 하단 공유 아이콘은 남아 있다. 공유 UI 존재를 공개 접근 허용으로 해석하지 않는다.

미확인 사항: [U-S101](UNKNOWN.md#u-s101)

<a id="s102"></a>

## S102 — 같은 작가의 추가 기사

- **Parity10 판정:** 추천 첫 글 제외 시 다른 글로 May24/반응 도구가 이동하던 index 결합 수정. 추천 순서/미수록 글 데이터는 추정하지 않음. [이번 코드/검사·한계](../FE_MEDIUM_PARITY_10_RESULT.md#screen-status). 원본·과거 판정은 아래에 보존한다.

안정 원본 ID: `sc_92624aea551d44a7bbcf71d7d78aff4c` · [원본 분석](<../../medium/flows/Home/Story detail/ANALYSIS.md>):241 · [원본 PNG](<../../medium/flows/Home/Story detail/screens/07_sc_92624aea551d44a7bbcf71d7d78aff4c.png>)

흐름 맥락: [F16/07](FLOWS.md#f16)

FE 조사 경로: [ArticleDetailScreen.tsx](<../../FE/src/features/article/ArticleDetailScreen.tsx>), [ReferenceArticleView.tsx](<../../FE/src/features/article/ReferenceArticleView.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>)

기본 담당: [G25](CONTRACTS.md#g25) · 실행 작업: [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13)

**화면별 수용 조건:** 제목/부제/작가/읽기시간/표지 출처, 본문 강조·링크·삽입 이미지·토픽·작성자·응답 미리보기·관련 글·고정 반응 바를 각각 비교한다. +16은 입력 피드백이며 터치 횟수 증거가 아니다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Morefrom기사/커버/동일작가연결. 카드구조수정후다음커버위치대조; 실제응답수/폰트차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):296)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 저장, 더보기, 기사 카드

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s102-l"></a>`R-S102-L` | 배치: More from Jordan Gibbs 아래 큰 이미지 카드 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s102-d"></a>`R-S102-D` | 표시값·입력: 기사별 날짜·박수·응답 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s102-s"></a>`R-S102-S` | 상태: 읽기 후 작가 콘텐츠 추천 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s102-c01"></a>`R-S102-C01` | 컨트롤: 저장 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s102-c02"></a>`R-S102-C02` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s102-c03"></a>`R-S102-C03` | 컨트롤: 기사 카드 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S102](UNKNOWN.md#u-s102)

<a id="s103"></a>

## S103 — 팔로우 설정 메뉴

안정 원본 ID: `sc_937a1fdc91724d1ca5cc41b1d43d5132` · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/Following an author/ANALYSIS.md>):116 · [원본 PNG](<../../medium/flows/Home/Story detail/Author detail/Following an author/screens/03_sc_937a1fdc91724d1ca5cc41b1d43d5132.png>)

흐름 맥락: [F19/03](FLOWS.md#f19), [F20/01](FLOWS.md#f20)

FE 조사 경로: [PublicIdentityScreen.tsx](<../../FE/src/features/community/PublicIdentityScreen.tsx>), [FollowControl.tsx](<../../FE/src/features/community/FollowControl.tsx>), [ConnectionsScreen.tsx](<../../FE/src/features/community/ConnectionsScreen.tsx>)

기본 담당: [G28](CONTRACTS.md#g28) · 실행 작업: [V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14)

**화면별 수용 조건:** Stories/Lists/About, Pinned, member/Friend 시작 월, Follow 성공·메뉴·해제 토스트, Email on/off, 작가와 publication 관계 목록을 각각 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Following이메일메뉴체크/On·Off·Unfollow연결. 기본off와원본on차이, 원본미확인기본정책으로일반화하지않음. ([과거 기록](<../FE_GOAL_53_RESULT.md>):297)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Email notifications off, Unfollow

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s103-l"></a>`R-S103-L` | 배치: 프로필 Following 팝오버 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G28](CONTRACTS.md#g28), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s103-d"></a>`R-S103-D` | 표시값·입력: Email notifications on 체크 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G28](CONTRACTS.md#g28), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s103-s"></a>`R-S103-S` | 상태: 팔로우 해제 진입점 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G28](CONTRACTS.md#g28), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s103-c01"></a>`R-S103-C01` | 컨트롤: Email notifications off | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s103-c02"></a>`R-S103-C02` | 컨트롤: Unfollow | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S103](UNKNOWN.md#u-s103)

<a id="s104"></a>

## S104 — 팔로잉 빈 상태

안정 원본 ID: `sc_944b2eea3834408b8c04981e5eb2adf8` · [원본 분석](<../../medium/flows/Home/Refine recommendations/ANALYSIS.md>):149 · [원본 PNG](<../../medium/flows/Home/Refine recommendations/screens/04_sc_944b2eea3834408b8c04981e5eb2adf8.png>)

흐름 맥락: [F12/04](FLOWS.md#f12)

FE 조사 경로: [RefineRecommendationsScreen.tsx](<../../FE/src/features/recommendations/RefineRecommendationsScreen.tsx>)

기본 담당: [G31](CONTRACTS.md#g31) · 실행 작업: [V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11)

**화면별 수용 조건:** 네 탭, All/Writers/Publications/Topics, 빈 Following, 종류별 count/See all, Follow/Following, See more suggestions를 개별 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Following없음/All/빈문구 확인. 원본구분선/문구크기·tab선택context차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):298)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 유형 필터

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s104-l"></a>`R-S104-L` | 배치: Following 탭과 All 필터, 중앙 안내 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s104-d"></a>`R-S104-D` | 표시값·입력: You don't follow anything yet | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s104-s"></a>`R-S104-S` | 상태: 팔로우 대상 없음 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s104-c01"></a>`R-S104-C01` | 컨트롤: 유형 필터 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S104](UNKNOWN.md#u-s104)

<a id="s105"></a>

## S105 — 리스트 비공개 확인

- Parity 7 최신 검토: [저장·목록·메모·순서 결과](../FE_MEDIUM_PARITY_07_RESULT.md). 기능/브라우저·원본 차이·미확인/native를 분리한다. 아래 초기 판정은 감사 당시 이력이다.

안정 원본 ID: `sc_95e504331794455fb4776bd322254c76` · [원본 분석](<../../medium/flows/Library/List detail/Making a list private/ANALYSIS.md>):118 · [원본 PNG](<../../medium/flows/Library/List detail/Making a list private/screens/03_sc_95e504331794455fb4776bd322254c76.png>)

흐름 맥락: [F49/03](FLOWS.md#f49)

FE 조사 경로: [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>)

기본 담당: [G33](CONTRACTS.md#g33) · 실행 작업: [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25)

**화면별 수용 조건:** 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Private확인 경고/확정·취소 계약 대조. OS alert 대신 앱 dialog, 확인 색/48버튼 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):299)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Cancel, Make private

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s105-l"></a>`R-S105-L` | 배치: 중앙 확인 대화상자 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s105-d"></a>`R-S105-D` | 표시값·입력: 다른 사용자가 저장한 목록이 라이브러리에서 제거된다는 안내 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s105-s"></a>`R-S105-S` | 상태: 비공개 전 영향 안내 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s105-c01"></a>`R-S105-C01` | 컨트롤: Cancel | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s105-c02"></a>`R-S105-C02` | 컨트롤: Make private | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S105](UNKNOWN.md#u-s105)

<a id="s106"></a>

## S106 — 빈 리스트 상세

- Parity 7 최신 검토: [저장·목록·메모·순서 결과](../FE_MEDIUM_PARITY_07_RESULT.md). 기능/브라우저·원본 차이·미확인/native를 분리한다. 아래 초기 판정은 감사 당시 이력이다.

안정 원본 ID: `sc_967232cfb5f845839053e0d371d78911` · [원본 분석](<../../medium/flows/Library/List detail/ANALYSIS.md>):85 · [원본 PNG](<../../medium/flows/Library/List detail/screens/02_sc_967232cfb5f845839053e0d371d78911.png>)

흐름 맥락: [F46/02](FLOWS.md#f46)

FE 조사 경로: [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>)

기본 담당: [G33](CONTRACTS.md#g33) · 실행 작업: [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25)

**화면별 수용 조건:** 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 빈 사용자 목록/Start browsing/반응 연결 대조. 원본 상대시각 대신 실제 개수 표시; 하단 canonical반응0 자체 계약. ([과거 기록](<../FE_GOAL_53_RESULT.md>):300)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Start browsing, 다운로드, 더보기, 공유·응답

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s106-l"></a>`R-S106-L` | 배치: 소유자·제목·빈 상태·하단 리스트 반응 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s106-d"></a>`R-S106-D` | 표시값·입력: About mindfulness, 14 seconds ago | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 상대 시간 표시·시간 데이터 계약 없음; 순서/제목 등 나머지 요소는 V25에서 대조<br>[D13](../FE_MEDIUM_PARITY_BACKLOG.md#d13), [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s106-s"></a>`R-S106-S` | 상태: 콘텐츠 없는 리스트 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s106-c01"></a>`R-S106-C01` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s106-c02"></a>`R-S106-C02` | 컨트롤: Start browsing | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s106-c03"></a>`R-S106-C03` | 컨트롤: 다운로드 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G35](CONTRACTS.md#g35) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s106-c04"></a>`R-S106-C04` | 컨트롤: 목록 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s106-c05"></a>`R-S106-C05` | 컨트롤: 목록 박수(연한 표시) | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G32](CONTRACTS.md#g32), [G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s106-c06"></a>`R-S106-C06` | 컨트롤: 목록 응답 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G32](CONTRACTS.md#g32), [G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s106-c07"></a>`R-S106-C07` | 컨트롤: 목록 공유 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S106](UNKNOWN.md#u-s106)

<a id="s107"></a>

## S107 — 토픽 내 큐레이션

안정 원본 ID: `sc_974be74d8855401e84cbad9f01dc8e93` · [원본 분석](<../../medium/flows/Explore/Topic detail/Browse curated list/ANALYSIS.md>):117 · [원본 PNG](<../../medium/flows/Explore/Topic detail/Browse curated list/screens/03_sc_974be74d8855401e84cbad9f01dc8e93.png>)

흐름 맥락: [F04/03](FLOWS.md#f04)

FE 조사 경로: [TopicScreen.tsx](<../../FE/src/features/topics/TopicScreen.tsx>)

기본 담당: [G30](CONTRACTS.md#g30) · 실행 작업: [V03](../FE_MEDIUM_PARITY_BACKLOG.md#v03)

**화면별 수용 조건:** Life와 Self Improvement는 별도 대상이다. Follow/Following·집계·관련 칩·헤더 축소와 See the full list의 대상 보존을 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. curated list 제목/가로 미리보기/See full list 대조. 스크롤 위치 보정 및 공유 IdentityLink verified 누락 수정. ([과거 기록](<../FE_GOAL_53_RESULT.md>):301)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** See the full list, 기사 더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s107-l"></a>`R-S107-L` | 배치: The power of a morning routine 가로 기사 묶음 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G30](CONTRACTS.md#g30), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V03](../FE_MEDIUM_PARITY_BACKLOG.md#v03) |
| <a id="r-s107-d"></a>`R-S107-D` | 표시값·입력: List curated by Medium Staff | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G30](CONTRACTS.md#g30), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V03](../FE_MEDIUM_PARITY_BACKLOG.md#v03) |
| <a id="r-s107-s"></a>`R-S107-S` | 상태: 편집 리스트 미리보기 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G30](CONTRACTS.md#g30), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V03](../FE_MEDIUM_PARITY_BACKLOG.md#v03) |
| <a id="r-s107-c01"></a>`R-S107-C01` | 컨트롤: See the full list | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G30](CONTRACTS.md#g30), [G32](CONTRACTS.md#g32) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V03](../FE_MEDIUM_PARITY_BACKLOG.md#v03) |
| <a id="r-s107-c02"></a>`R-S107-C02` | 컨트롤: 기사 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G30](CONTRACTS.md#g30) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V03](../FE_MEDIUM_PARITY_BACKLOG.md#v03) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S107](UNKNOWN.md#u-s107)

<a id="s108"></a>

## S108 — 다크 하이라이트 목록

- Parity 7 최신 검토: [저장·목록·메모·순서 결과](../FE_MEDIUM_PARITY_07_RESULT.md). 기능/브라우저·원본 차이·미확인/native를 분리한다. 아래 초기 판정은 감사 당시 이력이다.

안정 원본 ID: `sc_97fb65c906bf4e309ec595d2067e4bce` · [원본 분석](<../../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>):210 · [원본 PNG](<../../medium/flows/Profile/Settings/Switching to dark mode/screens/06_sc_97fb65c906bf4e309ec595d2067e4bce.png>)

흐름 맥락: [F62/06](FLOWS.md#f62)

FE 조사 경로: [LibraryScreen.tsx](<../../FE/src/features/bookmarks/LibraryScreen.tsx>), [HighlightList.tsx](<../../FE/src/features/highlights/HighlightList.tsx>)

기본 담당: [G34](CONTRACTS.md#g34) · 실행 작업: [V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24)

**화면별 수용 조건:** 가로5탭, 초기 배너/닫기·Digest New, New list, 빈/3개/4개 카드 썸네일/잠금/다운로드/메뉴, Highlighted 구절·작성자·원문 링크를 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. DarkHighlight실제발췌저장조회. 원본3발췌와현재1개·삭제보완·폰트차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):302)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 강조 항목

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s108-l"></a>`R-S108-L` | 배치: 어두운 녹색 강조·밝은 본문 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s108-d"></a>`R-S108-D` | 표시값·입력: Highlighted 활성 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s108-s"></a>`R-S108-S` | 상태: 하이라이트 대비 변경 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s108-c01"></a>`R-S108-C01` | 컨트롤: 강조 항목 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G27](CONTRACTS.md#g27), [G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S108](UNKNOWN.md#u-s108)

<a id="s109"></a>

## S109 — 비공개 변경 성공 안내

- Parity 7 최신 검토: [저장·목록·메모·순서 결과](../FE_MEDIUM_PARITY_07_RESULT.md). 기능/브라우저·원본 차이·미확인/native를 분리한다. 아래 초기 판정은 감사 당시 이력이다.

안정 원본 ID: `sc_996c48382ff0466099cf371adf783dae` · [원본 분석](<../../medium/flows/Library/List detail/Making a list private/ANALYSIS.md>):148 · [원본 PNG](<../../medium/flows/Library/List detail/Making a list private/screens/04_sc_996c48382ff0466099cf371adf783dae.png>)

흐름 맥락: [F49/04](FLOWS.md#f49)

FE 조사 경로: [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>)

기본 담당: [G33](CONTRACTS.md#g33) · 실행 작업: [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25)

**화면별 수용 조건:** 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 확정 Private성공 안내 추가. 자체 비공개 설명/다운로드 stale경고가 원본보다 많은 공간을 사용. ([과거 기록](<../FE_GOAL_53_RESULT.md>):303)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 리스트 관리

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s109-l"></a>`R-S109-L` | 배치: 리스트 상세 위 검정 토스트 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s109-d"></a>`R-S109-D` | 표시값·입력: About mindfulness is now private | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s109-s"></a>`R-S109-S` | 상태: 비공개 전환 안내 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s109-c01"></a>`R-S109-C01` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s109-c02"></a>`R-S109-C02` | 컨트롤: 다운로드 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G35](CONTRACTS.md#g35) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s109-c03"></a>`R-S109-C03` | 컨트롤: 목록 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s109-c04"></a>`R-S109-C04` | 컨트롤: Add a note | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s109-c05"></a>`R-S109-C05` | 컨트롤: 기사 저장 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s109-c06"></a>`R-S109-C06` | 컨트롤: 기사 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s109-c07"></a>`R-S109-C07` | 컨트롤: 목록 박수 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G32](CONTRACTS.md#g32), [G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s109-c08"></a>`R-S109-C08` | 컨트롤: 목록 응답 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G32](CONTRACTS.md#g32), [G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s109-c09"></a>`R-S109-C09` | 컨트롤: 목록 공유 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S109](UNKNOWN.md#u-s109)

<a id="s110"></a>

## S110 — 앱 다크 테마 설정

안정 원본 ID: `sc_9b1044709d764fe682a5e95603fd5c56` · [원본 분석](<../../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>):89 · [원본 PNG](<../../medium/flows/Profile/Settings/Switching to dark mode/screens/02_sc_9b1044709d764fe682a5e95603fd5c56.png>)

흐름 맥락: [F62/02](FLOWS.md#f62)

FE 조사 경로: [SettingsScreen.tsx](<../../FE/src/features/settings/SettingsScreen.tsx>), [SettingsExtrasScreen.tsx](<../../FE/src/features/settings/SettingsExtrasScreen.tsx>), [AppIconScreen.tsx](<../../FE/src/features/app-icon/AppIconScreen.tsx>)

기본 담당: [G49](CONTRACTS.md#g49) · 실행 작업: [V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33)

**화면별 수용 조건:** 모든 행과 섹션·외부 화살표·Facebook 안내·버전·Appearance 선택, 2열 아이콘8종·Wordmark Black선택·Friend잠금·하단잘림을 비교한다. 자체 K 자산을 원본과 동일로 세지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Dark선택Settings/뒤로 복귀 대조. 현재Member값·행높이·글꼴 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):304)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** System default, Light, Dark

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s110-l"></a>`R-S110-L` | 배치: 설정 전체 검정 배경 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G49](CONTRACTS.md#g49), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s110-d"></a>`R-S110-D` | 표시값·입력: Appearance Dark 선택 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G49](CONTRACTS.md#g49), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s110-s"></a>`R-S110-S` | 상태: 앱 설정 다크 적용 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G49](CONTRACTS.md#g49), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s110-c01"></a>`R-S110-C01` | 컨트롤: System default | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24), [G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s110-c02"></a>`R-S110-C02` | 컨트롤: Light | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24), [G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s110-c03"></a>`R-S110-C03` | 컨트롤: Dark | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24), [G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s110-c04"></a>`R-S110-C04` | 컨트롤: 계정 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s110-c05"></a>`R-S110-C05` | 컨트롤: 결제 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s110-c06"></a>`R-S110-C06` | 컨트롤: 통계 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G43](CONTRACTS.md#g43), [G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s110-c07"></a>`R-S110-C07` | 컨트롤: 프로필 편집 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42), [G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s110-c08"></a>`R-S110-C08` | 컨트롤: 추천 관리 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31), [G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s110-c09"></a>`R-S110-C09` | 컨트롤: Push | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44), [G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s110-c10"></a>`R-S110-C10` | 컨트롤: Email | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44), [G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s110-c11"></a>`R-S110-C11` | 컨트롤: Custom app icon | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s110-c12"></a>`R-S110-C12` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S110](UNKNOWN.md#u-s110)

<a id="s111"></a>

## S111 — 응답 정렬 선택

- **Parity10 판정:** Most Relevant/Most Recent 선택·체크·닫기 유지. 관련도는 fixture 정책이며 Medium 계산식 아님. [이번 코드/검사·한계](../FE_MEDIUM_PARITY_10_RESULT.md#screen-status). 원본·과거 판정은 아래에 보존한다.

안정 원본 ID: `sc_9b94403d105c4eda8933ae7bbe2d6a00` · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Sorting responses/ANALYSIS.md>):85 · [원본 PNG](<../../medium/flows/Home/Story detail/Responses/Sorting responses/screens/02_sc_9b94403d105c4eda8933ae7bbe2d6a00.png>)

흐름 맥락: [F36/02](FLOWS.md#f36)

FE 조사 경로: [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>)

기본 담당: [G26](CONTRACTS.md#g26) · 실행 작업: [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20)

**화면별 수용 조건:** 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 정렬메뉴 Most Relevant/Recent와체크. nativeblur/위치차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):305)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Most Relevant, Most Recent

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s111-l"></a>`R-S111-L` | 배치: Most Relevant 드롭다운 팝오버 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s111-d"></a>`R-S111-D` | 표시값·입력: Most Relevant 체크 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s111-s"></a>`R-S111-S` | 상태: 정렬 선택 중 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s111-c01"></a>`R-S111-C01` | 컨트롤: Most Relevant | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s111-c02"></a>`R-S111-C02` | 컨트롤: Most Recent | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S111](UNKNOWN.md#u-s111)

<a id="s112"></a>

## S112 — 응답 스크롤과 추가 답글

- **Parity10 판정:** edited 경과 시각/Read more 확장 접근성/Hide replies 유지. 원본 See more replies (4)의 추가4개 본문 부재로 동일 fixture 재현 잔여. [이번 코드/검사·한계](../FE_MEDIUM_PARITY_10_RESULT.md#screen-status). 원본·과거 판정은 아래에 보존한다.

안정 원본 ID: `sc_9c9af2f5f8ad43c193c0c30ef0974156` · [원본 분석](<../../medium/flows/Home/Story detail/Responses/ANALYSIS.md>):116 · [원본 PNG](<../../medium/flows/Home/Story detail/Responses/screens/03_sc_9c9af2f5f8ad43c193c0c30ef0974156.png>)

흐름 맥락: [F30/03](FLOWS.md#f30)

FE 조사 경로: [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>)

기본 담당: [G26](CONTRACTS.md#g26) · 실행 작업: [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20)

**화면별 수용 조건:** 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Alfred/Elena 답글 실제 표시. 미수록4개 추가댓글은 만들지 않아 See more replies4와 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):306)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Read more, Reply, See more replies, 더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s112-l"></a>`R-S112-L` | 배치: edited 표시·대명사·답글 1개·추가 답글 링크 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s112-d"></a>`R-S112-D` | 표시값·입력: See more replies (4) | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s112-s"></a>`R-S112-S` | 상태: 접힌 본문·부분 로딩 답글 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s112-c01"></a>`R-S112-C01` | 컨트롤: Read more | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s112-c02"></a>`R-S112-C02` | 컨트롤: Reply | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s112-c03"></a>`R-S112-C03` | 컨트롤: See more replies | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s112-c04"></a>`R-S112-C04` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S112](UNKNOWN.md#u-s112)

<a id="s113"></a>

## S113 — 기기 사진 선택기

- Parity15 현재 검토: [화면별 결과·R/T/U/C](../FE_MEDIUM_PARITY_15_RESULT.md#scope). 기능/실제8081 부분 대조와 원본 시각·동일 fixture·native 대기를 구분한다. 아래 원본 관찰과 최초 감사 이력은 유지한다.

안정 원본 ID: `sc_9fd133df622e4ddd859bbbeb845ba4da` · [원본 분석](<../../medium/flows/Profile/Editing profile information/ANALYSIS.md>):151 · [원본 PNG](<../../medium/flows/Profile/Editing profile information/screens/04_sc_9fd133df622e4ddd859bbbeb845ba4da.png>)

흐름 맥락: [F57/04](FLOWS.md#f57)

FE 조사 경로: [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>)

기본 담당: [G42](CONTRACTS.md#g42) · 실행 작업: [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32)

**화면별 수용 조건:** Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

**과거 Goal53 화면 판정:** **비동등 · native 원본 검증 대기**. 웹파일chooser대기화면을 촬영. 원본iOS사진picker와 비동등, OS선택기 픽셀clone대상 아님; nativeadapter실행 대기. ([과거 기록](<../FE_GOAL_53_RESULT.md>):307)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 사진 선택, Collections, 하단 옵션

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s113-l"></a>`R-S113-L` | 배치: Mobbin 앨범의 3열 사진 그리드 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s113-d"></a>`R-S113-D` | 표시값·입력: 사진 4개, Location Is Included | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s113-s"></a>`R-S113-S` | 상태: OS 사진 선택 UI | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s113-c01"></a>`R-S113-C01` | 컨트롤: 사진 선택 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42), [G52](CONTRACTS.md#g52) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s113-c02"></a>`R-S113-C02` | 컨트롤: Collections | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42), [G52](CONTRACTS.md#g52) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s113-c03"></a>`R-S113-C03` | 컨트롤: 하단 옵션 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42), [G52](CONTRACTS.md#g52) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s113-v"></a>`R-S113-V` | PNG 추가 세부 관찰: 사진 선택기의 Location Is Included 표시와 하단 옵션은 OS UI 관찰이다. OS 버전·앨범이 다른 실행을 동일 픽셀로 판정하지 않는다. | 일부 포함: 공통 시각 계약에 포함되나 이 요소 묶음의 독립 판정 필요<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S113](UNKNOWN.md#u-s113)

<a id="s114"></a>

## S114 — 리스트 삭제 확인 시트

- Parity 7 최신 검토: [저장·목록·메모·순서 결과](../FE_MEDIUM_PARITY_07_RESULT.md). 기능/브라우저·원본 차이·미확인/native를 분리한다. 아래 초기 판정은 감사 당시 이력이다.

안정 원본 ID: `sc_a1562b1931fc4650a544861094934588` · [원본 분석](<../../medium/flows/Library/List detail/Deleting a list/ANALYSIS.md>):117 · [원본 PNG](<../../medium/flows/Library/List detail/Deleting a list/screens/03_sc_a1562b1931fc4650a544861094934588.png>)

흐름 맥락: [F47/03](FLOWS.md#f47)

FE 조사 경로: [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>)

기본 담당: [G33](CONTRACTS.md#g33) · 실행 작업: [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25)

**화면별 수용 조건:** 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Delete확인 문구/취소·확정 및 기존 기사 보존. 시트 글꼴·버튼48높이 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):308)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Delete, 닫기 X

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s114-l"></a>`R-S114-L` | 배치: 하단 Delete list 설명·빨간 버튼 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s114-d"></a>`R-S114-D` | 표시값·입력: 내 라이브러리와 타인 저장에서 제거, 원문 기사는 삭제하지 않는다는 안내 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s114-s"></a>`R-S114-S` | 상태: 삭제 전 영향 확인 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s114-c01"></a>`R-S114-C01` | 컨트롤: Delete | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s114-c02"></a>`R-S114-C02` | 컨트롤: 닫기 X | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S114](UNKNOWN.md#u-s114)

<a id="s115"></a>

## S115 — 3개 토픽 선택

- Parity9: 3/5·칩제거·최대5/6번째·저장/취소의 mock 확인; 실제 렌더 대기. [모든 R의 현재 판정·검증](../FE_MEDIUM_PARITY_09_RESULT.md). 과거 관찰/계약은 보존하며 시각 동일성 완료로 승격하지 않는다.

안정 원본 ID: `sc_a4216c4ff1f64bb59bc982a8d0067b6e` · [원본 분석](<../../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>):180 · [원본 PNG](<../../medium/flows/Home/Publishing a story/Adding topics/screens/05_sc_a4216c4ff1f64bb59bc982a8d0067b6e.png>)

흐름 맥락: [F07/05](FLOWS.md#f07)

FE 조사 경로: [PublishTopics.tsx](<../../FE/src/features/editor/PublishTopics.tsx>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>)

기본 담당: [G39](CONTRACTS.md#g39) · 실행 작업: [V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06)

**화면별 수용 조건:** 검색 X와 chip X, 0/5·3/5·최대5, 빈값 Save의 모양, 미리보기 Edit/Publication/Unlisted/Publish now와 스크롤 헤더를 각각 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 3/5 및 Music/Culture/Art 초안 선택. 기본 후보 순서·칩/Your topics 보정. ([과거 기록](<../FE_GOAL_53_RESULT.md>):309)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 각 칩 X, Save

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s115-l"></a>`R-S115-L` | 배치: 검색창 3/5와 Music·Culture·Art 칩 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G39](CONTRACTS.md#g39), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s115-d"></a>`R-S115-D` | 표시값·입력: 검색어 비움, 3개 선택 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G39](CONTRACTS.md#g39), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s115-s"></a>`R-S115-S` | 상태: 최대 5개 중 3개 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G39](CONTRACTS.md#g39), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s115-c01"></a>`R-S115-C01` | 컨트롤: 각 칩 X | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s115-c02"></a>`R-S115-C02` | 컨트롤: Save | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S115](UNKNOWN.md#u-s115)

<a id="s116"></a>

## S116 — 선택 날짜 다이제스트

- **1~8 잔여 정리:** Goodbye Notion 커버·xeladu 원본 crop 및 명시적 비교17 보완. 날짜/계정/응답 공유 상태 검증과 원본 과거 호 정책은 구분. [현재 결과](../FE_MEDIUM_PARITY_01_08_REVIEW.md).

안정 원본 ID: `sc_a42fffc3afb34954bc5e4afcc2e08e04` · [원본 분석](<../../medium/flows/Library/Filtering digest/ANALYSIS.md>):146 · [원본 PNG](<../../medium/flows/Library/Filtering digest/screens/04_sc_a42fffc3afb34954bc5e4afcc2e08e04.png>)

흐름 맥락: [F43/04](FLOWS.md#f43)

FE 조사 경로: [DigestPanel.tsx](<../../FE/src/features/digest/DigestPanel.tsx>), [NotificationSettingsScreen.tsx](<../../FE/src/features/notifications/NotificationSettingsScreen.tsx>), [LibraryScreen.tsx](<../../FE/src/features/bookmarks/LibraryScreen.tsx>), [IdentityLink.tsx](<../../FE/src/features/community/IdentityLink.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>), [ResponseButton.tsx](<../../FE/src/features/responses/ResponseButton.tsx>)

기본 담당: [G34](CONTRACTS.md#g34) · 실행 작업: [V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27)

**화면별 수용 조건:** June12→June8의 임시 radio/Done·확정 날짜·바뀐 기사, last10 안내와 제목/카드 반응/저장을 비교한다. 날짜10일과 발행10개를 구분한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. June8 확정·표시/실제 응답 조건 일치. 원본 Goodbye Notion과 mock 해당 일 기사 다름. ([과거 기록](<../FE_GOAL_53_RESULT.md>):310)

**현재 판정 — Parity 6:** [이번 실행](../FE_MEDIUM_PARITY_06_RESULT.md). June8 Goodbye Notion/xeladu·2분·회원용 별·기사/작성자/반응/저장/설정/목록 연결을 확인했다. 사진·아바타 및 실제 응답 수 차이는 남는다. 기능 mock 검증과 시각 차이·U/native 대기를 구분하며 전체 동일성은 미완료다. 사용자 지시로 캡처 파일은 저장하지 않았다. 아래 개별 행은 최초 조사 이력이며 이번 판정은 이 문단과 결과 문서를 따른다.

**원본 컨트롤 관찰 문장:** 날짜, 설정, 저장

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s116-l"></a>`R-S116-L` | 배치: Digest 날짜·기사 교체 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s116-d"></a>`R-S116-D` | 표시값·입력: June 8 2025, Goodbye Notion | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s116-s"></a>`R-S116-S` | 상태: 선택한 날짜 콘텐츠 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s116-c01"></a>`R-S116-C01` | 컨트롤: 날짜 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s116-c02"></a>`R-S116-C02` | 컨트롤: 설정 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G34](CONTRACTS.md#g34), [G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s116-c03"></a>`R-S116-C03` | 컨트롤: 저장 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s116-c04"></a>`R-S116-C04` | 컨트롤(PNG 재확인): 기사 박수170 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G34](CONTRACTS.md#g34) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s116-c05"></a>`R-S116-C05` | 컨트롤(PNG 재확인): 기사 응답17 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26), [G34](CONTRACTS.md#g34) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s116-c06"></a>`R-S116-C06` | 컨트롤(PNG 재확인): 기사 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29), [G34](CONTRACTS.md#g34) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s116-c07"></a>`R-S116-C07` | 컨트롤(PNG 재확인): xeladu 작성자 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28), [G34](CONTRACTS.md#g34) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s116-c08"></a>`R-S116-C08` | 컨트롤(PNG 재확인): Goodbye Notion 기사 열기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G34](CONTRACTS.md#g34) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s116-c09"></a>`R-S116-C09` | 컨트롤(PNG 재확인): New list | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G34](CONTRACTS.md#g34) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s116-v"></a>`R-S116-V` | PNG 추가 세부 관찰: June 8의 Goodbye Notion 카드에서 읽기 시간2 min read 앞에 금색 회원용 글 별표가 보인다. | 일부 포함: 공통 시각 계약에 포함되나 이 요소 묶음의 독립 판정 필요<br>[G23](CONTRACTS.md#g23), [G25](CONTRACTS.md#g25), [G34](CONTRACTS.md#g34), [G53](CONTRACTS.md#g53) | 구현 차이 확인: DigestStory는 memberOnly 배지 렌더 분기가 없음<br>[D11](../FE_MEDIUM_PARITY_BACKLOG.md#d11) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S116](UNKNOWN.md#u-s116)

<a id="s117"></a>

## S117 — 이메일 가입 기본 폼

**Parity14 개별 판정:** [S117 실행·R/T/U/C](../FE_MEDIUM_PARITY_14_RESULT.md#screens). 빈 가입 폼의 녹색 버튼 유지, 유효 제출은 별도 검증. 누락 Terms/Privacy를 기존 안내 화면에 연결. 원본 요구·readiness는 유지한다.

안정 원본 ID: `sc_a4438be77c814444b7f0c005ee44e8b6` · [원본 분석](<../../medium/flows/Onboarding/ANALYSIS.md>):124 · [원본 PNG](<../../medium/flows/Onboarding/screens/03_sc_a4438be77c814444b7f0c005ee44e8b6.png>)

흐름 맥락: [F53/03](FLOWS.md#f53)

FE 조사 경로: [AuthDialogs.tsx](<../../FE/src/features/auth/AuthDialogs.tsx>), [EmailLogin.tsx](<../../FE/src/features/auth/EmailLogin.tsx>), [createEmailAttempt.ts](<../../FE/src/features/auth/createEmailAttempt.ts>)

기본 담당: [G40](CONTRACTS.md#g40) · 실행 작업: [V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29)

**화면별 수용 조건:** 가입4/로그인5 제공자, 이메일/이름/약관/뒤로·6칸 코드와Validate·Resend·닫기, Sign out Cancel/Confirm→intro를 비교한다. 빈 폼의 녹색 버튼과 실제 입력 검증은 별개다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Email가입 이름/주소/생성 form 대조. mock허용계정/실제 개인정보 안내·기본값·서체 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):311)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Create account 버튼, Terms of Service와 Privacy Policy 링크가 있다.

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s117-l"></a>`R-S117-L` | 배치: 상단 뒤로 가기·로고·가입 제목, 중앙 이름/이메일 입력, 하단 약관 안내가 있다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s117-d"></a>`R-S117-D` | 표시값·입력: Your full name과 Your email에 예시 placeholder가 보이며 비밀번호 필드는 없다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s117-s"></a>`R-S117-S` | 상태: 빈 이메일 가입 폼이다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s117-c01"></a>`R-S117-C01` | 컨트롤: 이름 입력 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s117-c02"></a>`R-S117-C02` | 컨트롤: 이메일 입력 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s117-c03"></a>`R-S117-C03` | 컨트롤: Create account 녹색 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s117-c04"></a>`R-S117-C04` | 컨트롤: Terms of Service | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40), [G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s117-c05"></a>`R-S117-C05` | 컨트롤: Privacy Policy | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40), [G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s117-c06"></a>`R-S117-C06` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |


원본 해석 경계: 빈 필드에서도 Create account는 녹색이다. 버튼 색만으로 유효 입력·서버 승인 상태를 판정하지 않는다.

미확인 사항: [U-S117](UNKNOWN.md#u-s117)

<a id="s118"></a>

## S118 — 토픽 추가 초기 상태

- Parity9: 0/5 Save 활성/빈 선택 저장 회귀 추가; 최소1개를 임의 필수로 두지 않음. [모든 R의 현재 판정·검증](../FE_MEDIUM_PARITY_09_RESULT.md). 과거 관찰/계약은 보존하며 시각 동일성 완료로 승격하지 않는다.

안정 원본 ID: `sc_a51d0e5d058b47809e1c299e1c28ff0e` · [원본 분석](<../../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>):88 · [원본 PNG](<../../medium/flows/Home/Publishing a story/Adding topics/screens/02_sc_a51d0e5d058b47809e1c299e1c28ff0e.png>)

흐름 맥락: [F07/02](FLOWS.md#f07)

FE 조사 경로: [PublishTopics.tsx](<../../FE/src/features/editor/PublishTopics.tsx>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>)

기본 담당: [G39](CONTRACTS.md#g39) · 실행 작업: [V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06)

**화면별 수용 조건:** 검색 X와 chip X, 0/5·3/5·최대5, 빈값 Save의 모양, 미리보기 Edit/Publication/Unlisted/Publish now와 스크롤 헤더를 각각 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 토픽0/5 검색과 목록 대조. 보관본 첫8개 기본 순서·Your topics 두께 반영, 추가 미수록 후보는 뒤 이름순 자체 정책. ([과거 기록](<../FE_GOAL_53_RESULT.md>):312)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 검색, 토픽 행, Save

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s118-l"></a>`R-S118-L` | 배치: 설명·검색·Your topics 목록·하단 Save | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G39](CONTRACTS.md#g39), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s118-d"></a>`R-S118-D` | 표시값·입력: 0/5, 최대 5개 안내 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G39](CONTRACTS.md#g39), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s118-s"></a>`R-S118-S` | 상태: 미선택 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G39](CONTRACTS.md#g39), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s118-c01"></a>`R-S118-C01` | 컨트롤: 검색 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s118-c02"></a>`R-S118-C02` | 컨트롤: 토픽 행 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s118-c03"></a>`R-S118-C03` | 컨트롤: Save | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |


원본 해석 경계: 0/5인 미선택 상태에서도 Save 버튼은 어두운 활성형이다. 최소 1개 토픽을 필수로 요구한다는 근거는 없다.

미확인 사항: [U-S118](UNKNOWN.md#u-s118)

<a id="s119"></a>

## S119 — 읽기 테마 선택

안정 원본 ID: `sc_a5d80c9e0226452cbb67e018702c5f1b` · [원본 분석](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>):182 · [원본 PNG](<../../medium/flows/Home/Story detail/Changing display/screens/05_sc_a5d80c9e0226452cbb67e018702c5f1b.png>)

흐름 맥락: [F24/05](FLOWS.md#f24)

FE 조사 경로: [ArticleDisplayPopover.tsx](<../../FE/src/features/settings/ArticleDisplayPopover.tsx>), [useReaderTypography.ts](<../../FE/src/features/settings/useReaderTypography.ts>)

기본 담당: [G24](CONTRACTS.md#g24) · 실행 작업: [V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16)

**화면별 수용 조건:** 100→120과 배경 제목 줄바꿈, Font family 행, Appearance 하위 선택, 타인 Highlight on/off와 어두운 팝오버를 비교한다. 본인 저장 강조 삭제와 분리한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Appearance 선택 메뉴/체크 일치, native blur/행높이와 웹 터치영역 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):313)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** System default, Light, Dark

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s119-l"></a>`R-S119-L` | 배치: Appearance 아래 팝오버 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G24](CONTRACTS.md#g24), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s119-d"></a>`R-S119-D` | 표시값·입력: System default 체크 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G24](CONTRACTS.md#g24), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s119-s"></a>`R-S119-S` | 상태: 테마 선택 중 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G24](CONTRACTS.md#g24), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s119-c01"></a>`R-S119-C01` | 컨트롤: System default | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s119-c02"></a>`R-S119-C02` | 컨트롤: Light | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s119-c03"></a>`R-S119-C03` | 컨트롤: Dark | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S119](UNKNOWN.md#u-s119)

<a id="s120"></a>

## S120 — 대명사 1개 선택

- Parity15 현재 검토: [화면별 결과·R/T/U/C](../FE_MEDIUM_PARITY_15_RESULT.md#scope). 기능/실제8081 부분 대조와 원본 시각·동일 fixture·native 대기를 구분한다. 아래 원본 관찰과 최초 감사 이력은 유지한다.

안정 원본 ID: `sc_a6051a9dd4514d3694dde85cd95c6b6d` · [원본 분석](<../../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>):148 · [원본 PNG](<../../medium/flows/Profile/Editing profile information/Adding pronouns/screens/04_sc_a6051a9dd4514d3694dde85cd95c6b6d.png>)

흐름 맥락: [F56/04](FLOWS.md#f56)

FE 조사 경로: [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>)

기본 담당: [G42](CONTRACTS.md#g42) · 실행 작업: [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32)

**화면별 수용 조건:** Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. hechip1·4/삭제/검색계속. focusoutline/뒤로 버튼은 웹 접근성 보완. ([과거 기록](<../FE_GOAL_53_RESULT.md>):314)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 칩 삭제, Add, Done

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s120-l"></a>`R-S120-L` | 배치: 입력란 he 칩과 X | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s120-d"></a>`R-S120-D` | 표시값·입력: 1/4 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s120-s"></a>`R-S120-S` | 상태: 첫 대명사 선택 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s120-c01"></a>`R-S120-C01` | 컨트롤: 칩 삭제 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s120-c02"></a>`R-S120-C02` | 컨트롤: Add | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s120-c03"></a>`R-S120-C03` | 컨트롤: Done | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S120](UNKNOWN.md#u-s120)

<a id="s121"></a>

## S121 — 리스트에서 기사 제거

- Parity 7 최신 검토: [저장·목록·메모·순서 결과](../FE_MEDIUM_PARITY_07_RESULT.md). 기능/브라우저·원본 차이·미확인/native를 분리한다. 아래 초기 판정은 감사 당시 이력이다.

안정 원본 ID: `sc_a79a8c62cfd64776ae74f84e0d98b5c3` · [원본 분석](<../../medium/flows/Library/List detail/Removing a story/ANALYSIS.md>):84 · [원본 PNG](<../../medium/flows/Library/List detail/Removing a story/screens/02_sc_a79a8c62cfd64776ae74f84e0d98b5c3.png>)

흐름 맥락: [F50/02](FLOWS.md#f50)

FE 조사 경로: [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>)

기본 담당: [G33](CONTRACTS.md#g33) · 실행 작업: [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25)

**화면별 수용 조건:** 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 기사 제거 후 Undo로 같은 위치/메모 복구. 자체 문구와 toolbar위치·48터치 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):315)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Undo

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s121-l"></a>`R-S121-L` | 배치: 상단 알림·대상 기사 사라짐 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s121-d"></a>`R-S121-D` | 표시값·입력: This item has been removed from your list | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s121-s"></a>`R-S121-S` | 상태: 항목 제거와 되돌리기 제공 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s121-c01"></a>`R-S121-C01` | 컨트롤: Undo | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |


원본 해석 경계: Undo 링크는 보이지만 눌러 복구한 결과는 없다. 제거 성공 안내, 복구 기능의 존재, 실제 복구 완료를 서로 구분한다.

미확인 사항: [U-S121](UNKNOWN.md#u-s121)

<a id="s122"></a>

## S122 — 본문 구절 선택

**Parity11 최신:** [요구별 구현·검증·잔여](../FE_MEDIUM_PARITY_11_RESULT.md#requirements). 본문 한 문단 native 선택과 강조 톤·접근 철회를 보완했다. 아래 원본 요구/초기 조사 판정은 보존한다. 다중 문단·서식·메뉴 좌표와 실제 렌더/기기 검증은 남아 전체 동일성 미완료다.

안정 원본 ID: `sc_a8112b7354bb44908f9359e95ba3c288` · [원본 분석](<../../medium/flows/Home/Story detail/Highlighting a phrase/ANALYSIS.md>):84 · [원본 PNG](<../../medium/flows/Home/Story detail/Highlighting a phrase/screens/02_sc_a8112b7354bb44908f9359e95ba3c288.png>)

흐름 맥락: [F25/02](FLOWS.md#f25), [F29/01](FLOWS.md#f29)

FE 조사 경로: [PassageReader.tsx](<../../FE/src/features/highlights/PassageReader.tsx>), [NativePassagePicker.tsx](<../../FE/src/features/highlights/NativePassagePicker.tsx>)

기본 담당: [G27](CONTRACTS.md#g27) · 실행 작업: [V17](../FE_MEDIUM_PARITY_BACKLOG.md#v17)

**화면별 수용 조건:** 원본 본문 위 시작/끝 핸들과 선택 영역·플로팅 Highlight/Respond/Share/더보기, 메뉴 종료 후 강조 잔존을 확인한다. 별도 선택 화면은 동일 조작 완료가 아니다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 실제 DOM 선택; OS selection handles는 웹에서 재현하지 않음. 좌표/원본 폰트 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):316)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Highlight, Respond, Share, 더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s122-l"></a>`R-S122-L` | 배치: 녹색 선택 핸들·플로팅 행동 메뉴 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G27](CONTRACTS.md#g27), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V17](../FE_MEDIUM_PARITY_BACKLOG.md#v17) |
| <a id="r-s122-d"></a>`R-S122-D` | 표시값·입력: 여러 줄 텍스트 선택 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G27](CONTRACTS.md#g27), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V17](../FE_MEDIUM_PARITY_BACKLOG.md#v17) |
| <a id="r-s122-s"></a>`R-S122-S` | 상태: 텍스트 선택 상태 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G27](CONTRACTS.md#g27), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V17](../FE_MEDIUM_PARITY_BACKLOG.md#v17) |
| <a id="r-s122-c01"></a>`R-S122-C01` | 컨트롤: Highlight | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G27](CONTRACTS.md#g27) | 차이 확인: native는 별도 Select a passage+Done 화면<br>[D09](../FE_MEDIUM_PARITY_BACKLOG.md#d09) |
| <a id="r-s122-c02"></a>`R-S122-C02` | 컨트롤: Respond | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26), [G27](CONTRACTS.md#g27) | 차이 확인: native는 별도 Select a passage+Done 화면<br>[D09](../FE_MEDIUM_PARITY_BACKLOG.md#d09) |
| <a id="r-s122-c03"></a>`R-S122-C03` | 컨트롤: Share | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G27](CONTRACTS.md#g27), [G47](CONTRACTS.md#g47) | 차이 확인: native는 별도 Select a passage+Done 화면<br>[D09](../FE_MEDIUM_PARITY_BACKLOG.md#d09) |
| <a id="r-s122-c04"></a>`R-S122-C04` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G27](CONTRACTS.md#g27) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V17](../FE_MEDIUM_PARITY_BACKLOG.md#v17) |
| <a id="r-s122-v"></a>`R-S122-V` | PNG 추가 세부 관찰: 본문의 두 녹색 원형 핸들과 메뉴가 같은 읽기 화면 위에 있다. 별도 Select a passage 화면 진입과 Done 추가 단계는 원본에 없다. | 일부 포함: 공통 시각 계약에 포함되나 이 요소 묶음의 독립 판정 필요<br>[G27](CONTRACTS.md#g27), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 차이 확인: 원본 inline 선택과 native 별도 선택 화면<br>[D09](../FE_MEDIUM_PARITY_BACKLOG.md#d09) |


원본 해석 경계: 선택 범위의 시작·끝 핸들이 보이며 메뉴에는 Highlight·Respond·Share·더보기가 있다. Respond 진입과 Highlight 적용은 서로 다른 자식 흐름으로 이어지는 분기다.

미확인 사항: [U-S122](UNKNOWN.md#u-s122)

<a id="s123"></a>

## S123 — 프로필 편집 폼

- Parity15 현재 검토: [화면별 결과·R/T/U/C](../FE_MEDIUM_PARITY_15_RESULT.md#scope). 기능/실제8081 부분 대조와 원본 시각·동일 fixture·native 대기를 구분한다. 아래 원본 관찰과 최초 감사 이력은 유지한다.

안정 원본 ID: `sc_a829121c47a444cd8a8fd0d9889edaed` · [원본 분석](<../../medium/flows/Profile/Editing profile information/ANALYSIS.md>):90 · [원본 PNG](<../../medium/flows/Profile/Editing profile information/screens/02_sc_a829121c47a444cd8a8fd0d9889edaed.png>)

흐름 맥락: [F57/02](FLOWS.md#f57)

FE 조사 경로: [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>)

기본 담당: [G42](CONTRACTS.md#g42) · 실행 작업: [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32)

**화면별 수용 조건:** Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 사진없는 초기부모편집·이름10·50 대조. placeholder색·웹focus 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):317)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Update photo, Save, 닫기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s123-l"></a>`R-S123-L` | 배치: 사진·Name*·Pronouns·Short bio·About Page 안내 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s123-d"></a>`R-S123-D` | 표시값·입력: Alex Smith10/50, Pronouns0/4, Short bio0/160 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s123-s"></a>`R-S123-S` | 상태: 이름 필수 표시·소개 선택 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s123-c01"></a>`R-S123-C01` | 컨트롤: Update photo | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s123-c02"></a>`R-S123-C02` | 컨트롤: Save | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s123-c03"></a>`R-S123-C03` | 컨트롤: 닫기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |


원본 해석 경계: Name만 별표로 필수임을 표시한다. 0/4는 대명사 선택 개수이며, 0/160은 Short bio 문자 카운터다. About Page는 데스크톱 웹의 medium.com/me/about에서 편집하라는 별도 안내다.

미확인 사항: [U-S123](UNKNOWN.md#u-s123)

<a id="s124"></a>

## S124 — 응답 삭제 성공 표시

- **Parity10 판정:** 소유권·삭제 확인/취소·성공 토스트·삭제된 부모의 자식 보존 유지. 삭제 화면으로 전환 뒤 이전 편집 성공/실패를 폐기. [이번 코드/검사·한계](../FE_MEDIUM_PARITY_10_RESULT.md#screen-status). 원본·과거 판정은 아래에 보존한다.

안정 원본 ID: `sc_aa1b32e30ce5436b8ca8fcc4c7d74d1b` · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Deleting a response/ANALYSIS.md>):115 · [원본 PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Deleting a response/screens/03_sc_aa1b32e30ce5436b8ca8fcc4c7d74d1b.png>)

흐름 맥락: [F32/03](FLOWS.md#f32)

FE 조사 경로: [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>)

기본 담당: [G26](CONTRACTS.md#g26) · 실행 작업: [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20)

**화면별 수용 조건:** 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 실제 삭제 성공토스트. 댓글수7/원본833, 위쪽sort 유지 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):318)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 다른 응답 Reply·더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s124-l"></a>`R-S124-L` | 배치: 상단 검정 토스트·본인 응답 사라진 목록 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s124-d"></a>`R-S124-D` | 표시값·입력: Successfully deleted response | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s124-s"></a>`R-S124-S` | 상태: 삭제 성공 안내 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s124-c01"></a>`R-S124-C01` | 컨트롤: Reply | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s124-c02"></a>`R-S124-C02` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s124-c03"></a>`R-S124-C03` | 컨트롤: 박수 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s124-c04"></a>`R-S124-C04` | 컨트롤: Hide replies | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s124-c05"></a>`R-S124-C05` | 컨트롤: Read more | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s124-c06"></a>`R-S124-C06` | 컨트롤: 응답 작성창 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s124-c07"></a>`R-S124-C07` | 컨트롤: 닫기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s124-c08"></a>`R-S124-C08` | 컨트롤: 정책 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |


원본 해석 경계: 삭제 토스트가 상단 응답 총수를 가리므로 이 캡처로 삭제 후 총수의 정확한 값을 읽지 않는다. 본인 응답이 사라진 결과와 성공 안내만 확인했다.

미확인 사항: [U-S124](UNKNOWN.md#u-s124)

<a id="s125"></a>

## S125 — 글자 크기 확대

안정 원본 ID: `sc_ad140eae0b7e409aa2204c1f36bfa385` · [원본 분석](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>):152 · [원본 PNG](<../../medium/flows/Home/Story detail/Changing display/screens/04_sc_ad140eae0b7e409aa2204c1f36bfa385.png>)

흐름 맥락: [F24/04](FLOWS.md#f24)

FE 조사 경로: [ArticleDisplayPopover.tsx](<../../FE/src/features/settings/ArticleDisplayPopover.tsx>), [useReaderTypography.ts](<../../FE/src/features/settings/useReaderTypography.ts>)

기본 담당: [G24](CONTRACTS.md#g24) · 실행 작업: [V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16)

**화면별 수용 조건:** 100→120과 배경 제목 줄바꿈, Font family 행, Appearance 하위 선택, 타인 Highlight on/off와 어두운 팝오버를 비교한다. 본인 저장 강조 삭제와 분리한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 120% 선택/값 일치. Font family 행 수직 정렬 결함을 발견해 alignContent center 추가, 재촬영 진행. ([과거 기록](<../FE_GOAL_53_RESULT.md>):319)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 작은/큰 A

**이번 증거 해석:** 기존 비교 파일과 당시 해시 일치.120%/Font family 확인, 간격·서체·반응 수 차이 잔여. 위 예정/진행 문구는 과거 이력이며 이번 새 촬영이 아니다. [최신 증거 판정](../FE_MEDIUM_PARITY_AUDIT.md#evidence), [Q09](../FE_MEDIUM_PARITY_BACKLOG.md#q09).

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s125-l"></a>`R-S125-L` | 배치: 설정 유지·배경 제목 줄바꿈 증가 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G24](CONTRACTS.md#g24), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s125-d"></a>`R-S125-D` | 표시값·입력: 120% | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G24](CONTRACTS.md#g24), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s125-s"></a>`R-S125-S` | 상태: 크기 변경이 화면에 반영 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G24](CONTRACTS.md#g24), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s125-c01"></a>`R-S125-C01` | 컨트롤: 작은 A | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s125-c02"></a>`R-S125-C02` | 컨트롤: 큰 A | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s125-c03"></a>`R-S125-C03` | 컨트롤: Font family | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s125-c04"></a>`R-S125-C04` | 컨트롤: Appearance | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s125-c05"></a>`R-S125-C05` | 컨트롤: Highlights from others 토글 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S125](UNKNOWN.md#u-s125)
