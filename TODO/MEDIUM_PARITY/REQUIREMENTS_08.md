# 화면별 원본 요구사항

[검토 요약](../FE_MEDIUM_PARITY_AUDIT.md) · [보완 작업](../FE_MEDIUM_PARITY_BACKLOG.md) · [계약 원문](CONTRACTS.md) · [흐름 맥락](FLOWS.md) · [미확인 항목](UNKNOWN.md)

이번 목록은 원본에서 추출한 **관찰 요구사항**이다. L=배치, D=표시값/입력, S=상태, C=컨트롤, V=PNG 추가 세부 관찰이다. L/D/S는 원문 한 문장의 모든 요소를 포함하는 묶음이며 단일 버튼 수가 아니다. C는 명시적으로 나눈 조작점이다. 이 숫자를 기능 완성률의 분모로 사용하지 않는다.

`포함`은 기능 작업 범위에 있다는 판정이며 현재 FE 동일 재현 완료라는 뜻이 아니다. `일부 포함`은 공통/상위 계약은 있지만 개별 조건이 분산된 경우다. 코드 링크는 구현 조사 위치이며 자동으로 해당 요구의 통과를 증명하지 않는다. 과거 Goal53 판정은 당시 증거이고 현재 재촬영 결과가 아니다. 모든 행의 완료 조건은 해당 원본 PNG의 데이터·상태를 맞춘 비교와 FLOWS의 진입/복귀 검증을 함께 적용한다.


<a id="s176"></a>

## S176 — Featured 빈 상태

안정 원본 ID: `sc_e1cf4be8210f432098943d8a233d9d72` · [원본 분석](<../../medium/flows/Home/ANALYSIS.md>):117 · [원본 PNG](<../../medium/flows/Home/screens/03_sc_e1cf4be8210f432098943d8a233d9d72.png>)

흐름 맥락: [F05/03](FLOWS.md#f05)

FE 조사 경로: [HomeFeedScreen.tsx](<../../FE/src/features/feed/HomeFeedScreen.tsx>), [FollowingFeed.tsx](<../../FE/src/features/community/FollowingFeed.tsx>)

기본 담당: [G50](CONTRACTS.md#g50) · 실행 작업: [V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01)

**화면별 수용 조건:** For you의 원형 −와 Featured의 북마크를 구분한다. 헤더 접힘, 탭 가로 위치, New 배지, 알림 점, 빈 Featured CTA와 채워진 목록을 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Featured빈공급부 조건으로실제빈화면 촬영, 임시공급부는 finally복원. 정상피드와 구분하며 source빈문구/여백·서체차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):370)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** View recommended publications, 작성, 알림

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s176-l"></a>`R-S176-L` | 배치: Featured 선택 탭 아래 회색 안내 카드 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s176-d"></a>`R-S176-D` | 표시값·입력: No featured stories | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s176-s"></a>`R-S176-S` | 상태: 팔로우 발행물의 추천 글이 없다는 안내 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s176-c01"></a>`R-S176-C01` | 컨트롤: View recommended publications | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G30](CONTRACTS.md#g30), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s176-c02"></a>`R-S176-C02` | 컨트롤: 작성 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s176-c03"></a>`R-S176-C03` | 컨트롤: 알림 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S176](UNKNOWN.md#u-s176)

<a id="s177"></a>

## S177 — 리스트 상세 스크롤

안정 원본 ID: `sc_e20e59ee459b4a0d9a0a0302091962bd` · [원본 분석](<../../medium/flows/Library/List detail/Adding a note/ANALYSIS.md>):56 · [원본 PNG](<../../medium/flows/Library/List detail/Adding a note/screens/01_sc_e20e59ee459b4a0d9a0a0302091962bd.png>)

흐름 맥락: [F45/01](FLOWS.md#f45), [F46/04](FLOWS.md#f46)

FE 조사 경로: [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>)

기본 담당: [G33](CONTRACTS.md#g33) · 실행 작업: [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25)

**화면별 수용 조건:** 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 목록 스크롤 맥락/메모/3기사 대조. Viewed 실제 기록·기사 제목 폭·메모/날짜행 높이 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):371)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Add a note, 개별 더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s177-l"></a>`R-S177-L` | 배치: 나머지 기사·읽기시간·날짜·메모 영역 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s177-d"></a>`R-S177-D` | 표시값·입력: 동일 리스트 후반 항목 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s177-s"></a>`R-S177-S` | 상태: 목록 후반 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s177-c01"></a>`R-S177-C01` | 컨트롤: Add a note | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s177-c02"></a>`R-S177-C02` | 컨트롤: 개별 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S177](UNKNOWN.md#u-s177)

<a id="s178"></a>

## S178 — 프로필에 발행 글 표시

안정 원본 ID: `sc_e3b2276c9abd4bc7b08e6e4c322dee9e` · [원본 분석](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>):366 · [원본 PNG](<../../medium/flows/Home/Publishing a story/screens/11_sc_e3b2276c9abd4bc7b08e6e4c322dee9e.png>)

흐름 맥락: [F08/11](FLOWS.md#f08)

FE 조사 경로: [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>)

기본 담당: [G42](CONTRACTS.md#g42) · 실행 작업: [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32)

**화면별 수용 조건:** Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. mock 발행→본인 Stories 실제 연결. 계정/온보딩 재개/초안 진입·시각은 현재 정책. 당시 글 카드 북마크/메뉴가 누락됐다. 후속 보완에서 S178 저장/더보기와 S169 반응 표시를 구분해 구현·재검증했다. 현재 차이는 후속 결과를 따른다. ([과거 기록](<../FE_GOAL_53_RESULT.md>):372)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** View stats, Edit your profile, 필터, 저장, 더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s178-l"></a>`R-S178-L` | 배치: 프로필 Stories 탭 Public 필터 아래 새 글 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s178-d"></a>`R-S178-D` | 표시값·입력: Alex Smith, 0 followers·1 following, Just now | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s178-s"></a>`R-S178-S` | 상태: 발행된 것으로 보이는 글 카드 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s178-c01"></a>`R-S178-C01` | 컨트롤: View stats | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42), [G43](CONTRACTS.md#g43) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s178-c02"></a>`R-S178-C02` | 컨트롤: Edit your profile | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s178-c03"></a>`R-S178-C03` | 컨트롤: 필터 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s178-c04"></a>`R-S178-C04` | 컨트롤: 저장 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G39](CONTRACTS.md#g39), [G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s178-c05"></a>`R-S178-C05` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G39](CONTRACTS.md#g39), [G42](CONTRACTS.md#g42), [G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s178-c06"></a>`R-S178-C06` | 컨트롤(PNG 재확인): 작성 버튼 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G42](CONTRACTS.md#g42) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s178-c07"></a>`R-S178-C07` | 컨트롤(PNG 재확인): 설정 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42), [G49](CONTRACTS.md#g49) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s178-c08"></a>`R-S178-C08` | 컨트롤(PNG 재확인): 발행 글 열기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G39](CONTRACTS.md#g39), [G42](CONTRACTS.md#g42) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s178-c09"></a>`R-S178-C09` | 컨트롤(PNG 재확인): 0 followers 표시/진입점 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28), [G42](CONTRACTS.md#g42) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s178-c10"></a>`R-S178-C10` | 컨트롤(PNG 재확인): 1 following 표시/진입점 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28), [G42](CONTRACTS.md#g42) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S178](UNKNOWN.md#u-s178)

<a id="s179"></a>

## S179 — 박수 피드백 종료

안정 원본 ID: `sc_e3b85b46c655483eb954e6f953d0b7f6` · [원본 분석](<../../medium/flows/Home/Story detail/Sending claps/ANALYSIS.md>):116 · [원본 PNG](<../../medium/flows/Home/Story detail/Sending claps/screens/03_sc_e3b85b46c655483eb954e6f953d0b7f6.png>)

흐름 맥락: [F38/03](FLOWS.md#f38)

FE 조사 경로: [ArticleDetailScreen.tsx](<../../FE/src/features/article/ArticleDetailScreen.tsx>), [ReferenceArticleView.tsx](<../../FE/src/features/article/ReferenceArticleView.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>)

기본 담당: [G25](CONTRACTS.md#g25) · 실행 작업: [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13)

**화면별 수용 조건:** 제목/부제/작가/읽기시간/표지 출처, 본문 강조·링크·삽입 이미지·토픽·작성자·응답 미리보기·관련 글·고정 반응 바를 각각 비교한다. +16은 입력 피드백이며 터치 횟수 증거가 아니다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 박수피드백종료후내기여유지. 원본832와현재7응답·실제저장상태차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):373)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 박수·응답·저장·공유

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s179-l"></a>`R-S179-L` | 배치: 기사 상단과 고정 반응 바 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s179-d"></a>`R-S179-D` | 표시값·입력: 박수 아이콘 검정, 18K, 응답 832 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s179-s"></a>`R-S179-S` | 상태: 일시적 +16 배지 사라짐 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s179-c01"></a>`R-S179-C01` | 컨트롤: 박수 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s179-c02"></a>`R-S179-C02` | 컨트롤: 응답 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s179-c03"></a>`R-S179-C03` | 컨트롤: 저장 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s179-c04"></a>`R-S179-C04` | 컨트롤: 공유 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S179](UNKNOWN.md#u-s179)

<a id="s180"></a>

## S180 — 멘션 입력 시작

안정 원본 ID: `sc_e3c9949b35ca4bc7b3328ee4e887fc5a` · [원본 분석](<../../medium/flows/Home/Publishing a story/Mentioning a user/ANALYSIS.md>):85 · [원본 PNG](<../../medium/flows/Home/Publishing a story/Mentioning a user/screens/02_sc_e3c9949b35ca4bc7b3328ee4e887fc5a.png>)

흐름 맥락: [F11/02](FLOWS.md#f11)

FE 조사 경로: [MentionSuggestions.tsx](<../../FE/src/features/editor/MentionSuggestions.tsx>), [DocumentReader.tsx](<../../FE/src/features/editor/DocumentReader.tsx>)

기본 담당: [G38](CONTRACTS.md#g38) · 실행 작업: [V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10)

**화면별 수용 조건:** @만 있는 안내, samlee 검색의 이름·아바타·핸들 세 행, 녹색 이름 삽입과 커서·툴바·키보드 위치를 비교한다. 실제 알림 발송은 별도다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. @ 진입. End 키가 줄 끝에 삽입했던 촬영 입력을 문서 끝 입력으로 보정; OS키보드 미검증. ([과거 기록](<../FE_GOAL_53_RESULT.md>):374)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Close, Next, 키보드

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s180-l"></a>`R-S180-L` | 배치: 본문 새 줄에 @, 키보드 위 사용자 이름 입력 안내 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G38](CONTRACTS.md#g38), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |
| <a id="r-s180-d"></a>`R-S180-D` | 표시값·입력: @만 입력 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G38](CONTRACTS.md#g38), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |
| <a id="r-s180-s"></a>`R-S180-S` | 상태: 멘션 검색 대기 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G38](CONTRACTS.md#g38), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |
| <a id="r-s180-c01"></a>`R-S180-C01` | 컨트롤: Close | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G38](CONTRACTS.md#g38) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |
| <a id="r-s180-c02"></a>`R-S180-C02` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G38](CONTRACTS.md#g38) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |
| <a id="r-s180-c03"></a>`R-S180-C03` | 컨트롤: Next | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G38](CONTRACTS.md#g38), [G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |
| <a id="r-s180-c04"></a>`R-S180-C04` | 컨트롤: 멘션 입력 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G38](CONTRACTS.md#g38) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S180](UNKNOWN.md#u-s180)

<a id="s181"></a>

## S181 — 본인 응답 관리 메뉴

안정 원본 ID: `sc_e4b254a2635b47069e314a1462c985d6` · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Deleting a response/ANALYSIS.md>):85 · [원본 PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Deleting a response/screens/02_sc_e4b254a2635b47069e314a1462c985d6.png>)

흐름 맥락: [F32/02](FLOWS.md#f32), [F33/02](FLOWS.md#f33)

FE 조사 경로: [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>)

기본 담당: [G26](CONTRACTS.md#g26) · 실행 작업: [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20)

**화면별 수용 조건:** 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 자기 댓글 Edit/Delete 메뉴. 웹48행/위치/nativeblur 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):375)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Edit response, 빨간 Delete response

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s181-l"></a>`R-S181-L` | 배치: 본인 응답 더보기 팝오버 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s181-d"></a>`R-S181-D` | 표시값·입력: 응답 유지 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s181-s"></a>`R-S181-S` | 상태: 수정·삭제 선택 가능 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s181-c01"></a>`R-S181-C01` | 컨트롤: Edit response | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s181-c02"></a>`R-S181-C02` | 컨트롤: 빨간 Delete response | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S181](UNKNOWN.md#u-s181)

<a id="s182"></a>

## S182 — 로그인 수단 선택

안정 원본 ID: `sc_e4d414380a1047a2b7970cf7869a0866` · [원본 분석](<../../medium/flows/Logging in/ANALYSIS.md>):88 · [원본 PNG](<../../medium/flows/Logging in/screens/02_sc_e4d414380a1047a2b7970cf7869a0866.png>)

흐름 맥락: [F52/02](FLOWS.md#f52)

FE 조사 경로: [AuthDialogs.tsx](<../../FE/src/features/auth/AuthDialogs.tsx>), [EmailLogin.tsx](<../../FE/src/features/auth/EmailLogin.tsx>), [createEmailAttempt.ts](<../../FE/src/features/auth/createEmailAttempt.ts>)

기본 담당: [G40](CONTRACTS.md#g40) · 실행 작업: [V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29)

**화면별 수용 조건:** 가입4/로그인5 제공자, 이메일/이름/약관/뒤로·6칸 코드와Validate·Resend·닫기, Sign out Cancel/Confirm→intro를 비교한다. 빈 폼의 녹색 버튼과 실제 입력 검증은 별개다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 로그인 Google/Facebook/Apple/X/Email 대조. 실제 OAuth 없음, mock/닫기·서체 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):376)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Sign in with Google/Facebook/Apple/X/Email

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s182-l"></a>`R-S182-L` | 배치: 브랜드 문구 아래 공급자 버튼 5개 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s182-d"></a>`R-S182-D` | 표시값·입력: 입력 없음 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s182-s"></a>`R-S182-S` | 상태: 로그인 시작 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s182-c01"></a>`R-S182-C01` | 컨트롤: Sign in with Google | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s182-c02"></a>`R-S182-C02` | 컨트롤: Sign in with Facebook | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s182-c03"></a>`R-S182-C03` | 컨트롤: Sign in with Apple | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s182-c04"></a>`R-S182-C04` | 컨트롤: Sign in with X | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s182-c05"></a>`R-S182-C05` | 컨트롤: Sign in with Email | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |


원본 해석 경계: 가입 선택 화면의 4개 공급자와 달리 로그인에는 X가 추가되어 5개다. 가입·로그인의 공급자 목록을 하나로 합치지 않는다.

미확인 사항: [U-S182](UNKNOWN.md#u-s182)

<a id="s183"></a>

## S183 — 인용 서식 적용

안정 원본 ID: `sc_e5826f356093493a86c19716420e8fdf` · [원본 분석](<../../medium/flows/Home/Publishing a story/Changing text format/ANALYSIS.md>):116 · [원본 PNG](<../../medium/flows/Home/Publishing a story/Changing text format/screens/03_sc_e5826f356093493a86c19716420e8fdf.png>)

흐름 맥락: [F09/03](FLOWS.md#f09)

FE 조사 경로: [RichDocumentBody.tsx](<../../FE/src/features/editor/RichDocumentBody.tsx>), [editorModel.ts](<../../FE/src/features/editor/editorModel.ts>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>)

기본 담당: [G36](CONTRACTS.md#g36) · 실행 작업: [V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07)

**화면별 수용 조건:** 제목과 본문, 회색 문자 스타일, 이탤릭 인용선, bullet, 점3개 구분선, 선택 중 도구 색과 키보드 위 툴바를 비교한다. 코드 도구의 실행 후 모습은 원본 미확인이다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 인용 세로선·이탤릭·같은 내용/이미지 유지. 글꼴·키보드·선택 범위 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):377)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 인용 도구, Next

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s183-l"></a>`R-S183-L` | 배치: 단락 왼쪽 세로선과 이탤릭, 인용 도구 녹색 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G36](CONTRACTS.md#g36), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s183-d"></a>`R-S183-D` | 표시값·입력: 동일 문장·이미지 유지 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G36](CONTRACTS.md#g36), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s183-s"></a>`R-S183-S` | 상태: 인용 블록 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G36](CONTRACTS.md#g36), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s183-c01"></a>`R-S183-C01` | 컨트롤: 인용 도구 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s183-c02"></a>`R-S183-C02` | 컨트롤: Next | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S183](UNKNOWN.md#u-s183)

<a id="s184"></a>

## S184 — 알림 활성화 안내

안정 원본 ID: `sc_e9f4c426cfb3426d9ca05121dea00ce3` · [원본 분석](<../../medium/flows/Onboarding/ANALYSIS.md>):367 · [원본 PNG](<../../medium/flows/Onboarding/screens/11_sc_e9f4c426cfb3426d9ca05121dea00ce3.png>)

흐름 맥락: [F53/11](FLOWS.md#f53)

FE 조사 경로: [OnboardingScreen.tsx](<../../FE/src/features/onboarding/OnboardingScreen.tsx>), [createOnboardingSession.ts](<../../FE/src/features/onboarding/createOnboardingSession.ts>)

기본 담당: [G41](CONTRACTS.md#g41) · 실행 작업: [V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30)

**화면별 수용 조건:** 브랜드 시작, 새 경험 소개, 최소3개 안내와 관찰5개 선택, Follow/Finish, Enable/Skip와 다음 목적지를 확인한다. 모든 계정에 동일 순서를 강제하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 알림 Enable/Skip 대조. 웹 unsupported실제권한 안내/닫기 추가로 중앙 위치 차이; OS허용으로 표시하지 않음. ([과거 기록](<../FE_GOAL_53_RESULT.md>):378)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Skip this step, Enable Notifications

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s184-l"></a>`R-S184-L` | 배치: 중앙 Stay up to date 안내와 하단 두 행동 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G41](CONTRACTS.md#g41), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="r-s184-d"></a>`R-S184-D` | 표시값·입력: 입력란 없음 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G41](CONTRACTS.md#g41), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="r-s184-s"></a>`R-S184-S` | 상태: 알림 권한 요청 전 앱 안내 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G41](CONTRACTS.md#g41), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="r-s184-c01"></a>`R-S184-C01` | 컨트롤: Skip this step | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G41](CONTRACTS.md#g41) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="r-s184-c02"></a>`R-S184-C02` | 컨트롤: Enable Notifications | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G41](CONTRACTS.md#g41), [G44](CONTRACTS.md#g44), [G52](CONTRACTS.md#g52) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S184](UNKNOWN.md#u-s184)

<a id="s185"></a>

## S185 — 다크 Explore

안정 원본 ID: `sc_eaaa223bd5c84facb010485d0f797e76` · [원본 분석](<../../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>):150 · [원본 PNG](<../../medium/flows/Profile/Settings/Switching to dark mode/screens/04_sc_eaaa223bd5c84facb010485d0f797e76.png>)

흐름 맥락: [F62/04](FLOWS.md#f62)

FE 조사 경로: [SearchScreen.tsx](<../../FE/src/features/search/SearchScreen.tsx>), [CatalogSearchResults.tsx](<../../FE/src/features/search/CatalogSearchResults.tsx>), [ExploreSections.tsx](<../../FE/src/features/search/ExploreSections.tsx>)

기본 담당: [G50](CONTRACTS.md#g50) · 실행 작업: [V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02)

**화면별 수용 조건:** 검색 빈 화면의 토픽 행, Stories 결과, 다섯 탭과 X를 분리한다. Trending 순위, Staff Picks 가로 카드, Recommended 세로 카드, Who to follow 가로 이동을 원본 상태별로 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. DarkExplore/검색/Trending 연결. 원본시점추천과현재fixture순위·주제가다름. ([과거 기록](<../FE_GOAL_53_RESULT.md>):379)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 검색·토픽·기사

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s185-l"></a>`R-S185-L` | 배치: 검색창·칩·Trending 모두 어두운 배경 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s185-d"></a>`R-S185-D` | 표시값·입력: 검색 빈값 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s185-s"></a>`R-S185-S` | 상태: 탐색 화면 테마 적용 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s185-c01"></a>`R-S185-C01` | 컨트롤: 검색 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s185-c02"></a>`R-S185-C02` | 컨트롤: 토픽 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G30](CONTRACTS.md#g30), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="r-s185-c03"></a>`R-S185-C03` | 컨트롤: 기사 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S185](UNKNOWN.md#u-s185)

<a id="s186"></a>

## S186 — 푸시 알림 상세 설정

안정 원본 ID: `sc_ee2e76b092df4d309bfd0633f25273a6` · [원본 분석](<../../medium/flows/Profile/Settings/Changing notification settings/ANALYSIS.md>):84 · [원본 PNG](<../../medium/flows/Profile/Settings/Changing notification settings/screens/02_sc_ee2e76b092df4d309bfd0633f25273a6.png>)

흐름 맥락: [F59/02](FLOWS.md#f59)

FE 조사 경로: [NotificationSettingsScreen.tsx](<../../FE/src/features/notifications/NotificationSettingsScreen.tsx>)

기본 담당: [G44](CONTRACTS.md#g44) · 실행 작업: [V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28)

**화면별 수용 조건:** Daily/Push On/Email On의 선택·chevron·외부 화살표를 구분한다. 여섯 토글과 다섯 Tailored 행, Top story/Editors만Off를 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Push기본토글/Tailored컨트롤 대조.48행높이누적으로하단원본보다더스크롤; OS권한과수신선호분리. ([과거 기록](<../FE_GOAL_53_RESULT.md>):380)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 이벤트 토글·빈도 선택

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s186-l"></a>`R-S186-L` | 배치: 여러 이벤트 유형의 토글·선택값 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G44](CONTRACTS.md#g44), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s186-d"></a>`R-S186-D` | 표시값·입력: Digest·Top story·Editors·Featured·Applause·Saves 켜짐, 여러 항목 Tailored for you | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G44](CONTRACTS.md#g44), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s186-s"></a>`R-S186-S` | 상태: 이벤트별 푸시 제어 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G44](CONTRACTS.md#g44), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s186-c01"></a>`R-S186-C01` | 컨트롤: New Medium Digest 토글 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s186-c02"></a>`R-S186-C02` | 컨트롤: Your top story of the day 토글 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s186-c03"></a>`R-S186-C03` | 컨트롤: Editors 토글 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s186-c04"></a>`R-S186-C04` | 컨트롤: New stories from writers 선택 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s186-c05"></a>`R-S186-C05` | 컨트롤: Featured 토글 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s186-c06"></a>`R-S186-C06` | 컨트롤: Claps 선택 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s186-c07"></a>`R-S186-C07` | 컨트롤: Highlights 선택 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s186-c08"></a>`R-S186-C08` | 컨트롤: Responses 선택 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s186-c09"></a>`R-S186-C09` | 컨트롤: Mentions 선택 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s186-c10"></a>`R-S186-C10` | 컨트롤: Applause 토글 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s186-c11"></a>`R-S186-C11` | 컨트롤: Saves 토글 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s186-c12"></a>`R-S186-C12` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s186-v"></a>`R-S186-V` | PNG 추가 세부 관찰: 하단 Saves 다음에 잘린 토글 일부가 보인다. 이름·역할을 지어내지 말고 잘린 시각 범위와 미확인 기능을 분리한다. | 일부 포함: 공통 시각 계약에 포함되나 이 요소 묶음의 독립 판정 필요<br>[G44](CONTRACTS.md#g44), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |


원본 해석 경계: Tailored for you 선택형은 New stories from writers you follow, Claps for your stories, Highlights, Responses to your stories, Mentions에 적용된다. On/Off 토글과 다른 설정 타입이다. 아래쪽 잘린 행은 이름·상태를 추정하지 않는다.

미확인 사항: [U-S186](UNKNOWN.md#u-s186)

<a id="s187"></a>

## S187 — 설정 닫힌 다크 기사

안정 원본 ID: `sc_ee957cf03e9848948f9ec8189264d8d8` · [원본 분석](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>):273 · [원본 PNG](<../../medium/flows/Home/Story detail/Changing display/screens/08_sc_ee957cf03e9848948f9ec8189264d8d8.png>)

흐름 맥락: [F24/08](FLOWS.md#f24)

FE 조사 경로: [ArticleDetailScreen.tsx](<../../FE/src/features/article/ArticleDetailScreen.tsx>), [ReferenceArticleView.tsx](<../../FE/src/features/article/ReferenceArticleView.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>)

기본 담당: [G25](CONTRACTS.md#g25) · 실행 작업: [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13)

**화면별 수용 조건:** 제목/부제/작가/읽기시간/표지 출처, 본문 강조·링크·삽입 이미지·토픽·작성자·응답 미리보기·관련 글·고정 반응 바를 각각 비교한다. +16은 입력 피드백이며 터치 횟수 증거가 아니다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Dark120% 제목/사진/배지 구조 일치, 원본 폰트/제목 행높이와 Follow 테두리 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):381)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 듣기·더보기·반응 바

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s187-l"></a>`R-S187-L` | 배치: 확대 글자·검정 배경·기사 상단 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s187-d"></a>`R-S187-D` | 표시값·입력: 120% 설정 후 제목 3줄 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s187-s"></a>`R-S187-S` | 상태: 표시 설정 적용 결과 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s187-c01"></a>`R-S187-C01` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s187-c02"></a>`R-S187-C02` | 컨트롤: 듣기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s187-c03"></a>`R-S187-C03` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s187-c04"></a>`R-S187-C04` | 컨트롤: 작성자 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s187-c05"></a>`R-S187-C05` | 컨트롤: Follow | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s187-c06"></a>`R-S187-C06` | 컨트롤: 박수 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s187-c07"></a>`R-S187-C07` | 컨트롤: 응답 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s187-c08"></a>`R-S187-C08` | 컨트롤: 저장 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s187-c09"></a>`R-S187-C09` | 컨트롤: 공유 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S187](UNKNOWN.md#u-s187)

<a id="s188"></a>

## S188 — 월간 글 통계

안정 원본 ID: `sc_eece99396c944a4fac5e50820715f00a` · [원본 분석](<../../medium/flows/Profile/Story stats/ANALYSIS.md>):86 · [원본 PNG](<../../medium/flows/Profile/Story stats/screens/02_sc_eece99396c944a4fac5e50820715f00a.png>)

흐름 맥락: [F63/02](FLOWS.md#f63)

FE 조사 경로: [StoryStatsScreen.tsx](<../../FE/src/features/story-stats/StoryStatsScreen.tsx>)

기본 담당: [G43](CONTRACTS.md#g43) · 실행 작업: [V34](../FE_MEDIUM_PARITY_BACKLOG.md#v34)

**화면별 수용 조건:** Monthly 기간UTC/Updated daily, 11/2·그래프 축/범례/색/면·날짜선·점, Lifetime Latest/글0/0을 독립 비교 fixture로 확인한다. 원본 집계 모순을 운영 계산식으로 만들지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 원본 조건용 June2025 월간11/2를 명시 주입해 제목·기간·축/그래프·범례 배치 대조. 원본 선/범례 원형과 현재 채움·서체/아이콘 미세 차이. 정상 현재월0/0은 F63 별도 보존. 별도June2025 비교 fixture11/2·Lifetime0/0; 정상F63와 구분. ([과거 기록](<../FE_GOAL_53_RESULT.md>):382)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 월 선택, 더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s188-l"></a>`R-S188-L` | 배치: 월 선택·두 집계·라인 그래프 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G43](CONTRACTS.md#g43), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V34](../FE_MEDIUM_PARITY_BACKLOG.md#v34) |
| <a id="r-s188-d"></a>`R-S188-D` | 표시값·입력: Jun 1–13 2025 UTC, Updated daily, Views11·Reads2 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G43](CONTRACTS.md#g43), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V34](../FE_MEDIUM_PARITY_BACKLOG.md#v34) |
| <a id="r-s188-s"></a>`R-S188-S` | 상태: 일별 통계 시각화 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G43](CONTRACTS.md#g43), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V34](../FE_MEDIUM_PARITY_BACKLOG.md#v34) |
| <a id="r-s188-c01"></a>`R-S188-C01` | 컨트롤: 월 선택 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G43](CONTRACTS.md#g43) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V34](../FE_MEDIUM_PARITY_BACKLOG.md#v34) |
| <a id="r-s188-c02"></a>`R-S188-C02` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G43](CONTRACTS.md#g43) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V34](../FE_MEDIUM_PARITY_BACKLOG.md#v34) |


원본 해석 경계: 기간에 UTC가 명시되고 Reads·Views를 색상 범례로 구분한다. 조회일의 KST와 지표 집계 시간대를 혼동하지 않는다.

미확인 사항: [U-S188](UNKNOWN.md#u-s188)

<a id="s189"></a>

## S189 — 기사 본문 스크롤

안정 원본 ID: `sc_f4b06612bdbf48ecbd8a7b6e2607d117` · [원본 분석](<../../medium/flows/Home/Story detail/ANALYSIS.md>):120 · [원본 PNG](<../../medium/flows/Home/Story detail/screens/03_sc_f4b06612bdbf48ecbd8a7b6e2607d117.png>)

흐름 맥락: [F16/03](FLOWS.md#f16), [F25/01](FLOWS.md#f25)

FE 조사 경로: [ArticleDetailScreen.tsx](<../../FE/src/features/article/ArticleDetailScreen.tsx>), [ReferenceArticleView.tsx](<../../FE/src/features/article/ReferenceArticleView.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>)

기본 담당: [G25](CONTRACTS.md#g25) · 실행 작업: [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13)

**화면별 수용 조건:** 제목/부제/작가/읽기시간/표지 출처, 본문 강조·링크·삽입 이미지·토픽·작성자·응답 미리보기·관련 글·고정 반응 바를 각각 비교한다. +16은 입력 피드백이며 터치 횟수 증거가 아니다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 동일본문발췌·강조/구분선대조. 대체serif와스크롤방향에따른자동헤더숨김; 미수록문단안내자체추가. ([과거 기록](<../FE_GOAL_53_RESULT.md>):383)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 상단 듣기·더보기, 하단 반응

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s189-l"></a>`R-S189-L` | 배치: 세리프 본문과 굵은 단락·점 구분선·연녹색 강조 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s189-d"></a>`R-S189-D` | 표시값·입력: 여러 텍스트 강조 범위 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s189-s"></a>`R-S189-S` | 상태: 본문 중간 읽기 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s189-c01"></a>`R-S189-C01` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s189-c02"></a>`R-S189-C02` | 컨트롤: 듣기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s189-c03"></a>`R-S189-C03` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s189-c04"></a>`R-S189-C04` | 컨트롤: 박수 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s189-c05"></a>`R-S189-C05` | 컨트롤: 응답 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s189-c06"></a>`R-S189-C06` | 컨트롤: 저장 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s189-c07"></a>`R-S189-C07` | 컨트롤: 공유 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S189](UNKNOWN.md#u-s189)

<a id="s190"></a>

## S190 — 읽기 기록 목록

안정 원본 ID: `sc_f4bb3fa34f32466b9bd12eea57ea518f` · [원본 분석](<../../medium/flows/Home/Refine recommendations/ANALYSIS.md>):118 · [원본 PNG](<../../medium/flows/Home/Refine recommendations/screens/03_sc_f4bb3fa34f32466b9bd12eea57ea518f.png>)

흐름 맥락: [F12/03](FLOWS.md#f12), [F14/01](FLOWS.md#f14), [F15/01](FLOWS.md#f15)

FE 조사 경로: [ReadingHistoryList.tsx](<../../FE/src/features/reading-history/ReadingHistoryList.tsx>)

기본 담당: [G31](CONTRACTS.md#g31) · 실행 작업: [V12](../FE_MEDIUM_PARITY_BACKLOG.md#v12)

**화면별 수용 조건:** 전체 Clear history와 개별 휴지통을 분리하고 빈 상태 Explore·목록 스크롤을 확인한다. 발행일을 읽은 시각으로 바꾸지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 읽기이력Clear/기사행·삭제 실제연결. 첫기사동일, 이후기사/응답수·줄바꿈은현재mock기록. ([과거 기록](<../FE_GOAL_53_RESULT.md>):384)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Clear history, 개별 휴지통, 더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s190-l"></a>`R-S190-L` | 배치: Reading history 탭, 전체 삭제 안내, 기사 카드 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V12](../FE_MEDIUM_PARITY_BACKLOG.md#v12) |
| <a id="r-s190-d"></a>`R-S190-D` | 표시값·입력: 읽은 글·날짜·집계 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V12](../FE_MEDIUM_PARITY_BACKLOG.md#v12) |
| <a id="r-s190-s"></a>`R-S190-S` | 상태: 읽기 기록 존재 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V12](../FE_MEDIUM_PARITY_BACKLOG.md#v12) |
| <a id="r-s190-c01"></a>`R-S190-C01` | 컨트롤: Clear history | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V12](../FE_MEDIUM_PARITY_BACKLOG.md#v12) |
| <a id="r-s190-c02"></a>`R-S190-C02` | 컨트롤: 개별 휴지통 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V12](../FE_MEDIUM_PARITY_BACKLOG.md#v12) |
| <a id="r-s190-c03"></a>`R-S190-C03` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29), [G31](CONTRACTS.md#g31) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V12](../FE_MEDIUM_PARITY_BACKLOG.md#v12) |


원본 해석 경계: 전체 Clear history와 개별 글 휴지통은 삭제 범위가 다르다. 안내는 기록을 지워 새롭게 시작할 수 있다는 설명이며, 추천 모델 데이터까지 완전히 삭제한다는 증거는 아니다.

미확인 사항: [U-S190](UNKNOWN.md#u-s190)

<a id="s191"></a>

## S191 — 메모 내용 입력

안정 원본 ID: `sc_f4f970015d6743538664901310d2c17b` · [원본 분석](<../../medium/flows/Library/List detail/Adding a note/ANALYSIS.md>):148 · [원본 PNG](<../../medium/flows/Library/List detail/Adding a note/screens/04_sc_f4f970015d6743538664901310d2c17b.png>)

흐름 맥락: [F45/04](FLOWS.md#f45)

FE 조사 경로: [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>)

기본 담당: [G33](CONTRACTS.md#g33) · 실행 작업: [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25)

**화면별 수용 조건:** 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 동일 메모 입력과 확정 가능 상태. 제목 줄바꿈·카드/버튼 높이 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):385)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Done, Cancel

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s191-l"></a>`R-S191-L` | 배치: 대상 기사 카드 위 입력란 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s191-d"></a>`R-S191-D` | 표시값·입력: A very good explanation of mindfulness | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s191-s"></a>`R-S191-S` | 상태: 메모 제출 준비 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s191-c01"></a>`R-S191-C01` | 컨트롤: Done | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s191-c02"></a>`R-S191-C02` | 컨트롤: Cancel | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S191](UNKNOWN.md#u-s191)

<a id="s192"></a>

## S192 — 음성 선택 후 플레이어

안정 원본 ID: `sc_f637c648d6ec470a81cf77e5594e02da` · [원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>):209 · [원본 PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/06_sc_f637c648d6ec470a81cf77e5594e02da.png>)

흐름 맥락: [F28/06](FLOWS.md#f28)

FE 조사 경로: [ListeningPlayer.tsx](<../../FE/src/features/listening/ListeningPlayer.tsx>)

기본 담당: [G45](CONTRACTS.md#g45) · 실행 작업: [V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18)

**화면별 수용 조건:** 준비 중 두 spinner, mini/expanded 동일 기사, 커버·배경·시간·진행선·10초/30초·희미한 이전/다음·닫기·Speechify 표시를 비교한다. 무음 timer는 실제 재생과 구분한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 선택 목소리 확정 후 player. 실제 오디오가 없는 mock과 배경 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):386)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 재생 조작

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s192-l"></a>`R-S192-L` | 배치: 확장 재생 화면 복귀 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G45](CONTRACTS.md#g45), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s192-d"></a>`R-S192-D` | 표시값·입력: 1x, 00:20, -04:27 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G45](CONTRACTS.md#g45), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s192-s"></a>`R-S192-S` | 상태: 재생 UI 복귀 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G45](CONTRACTS.md#g45), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s192-c01"></a>`R-S192-C01` | 컨트롤: 접기 손잡이 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s192-c02"></a>`R-S192-C02` | 컨트롤: 진행 바 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s192-c03"></a>`R-S192-C03` | 컨트롤: 일시정지 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s192-c04"></a>`R-S192-C04` | 컨트롤: 10초 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s192-c05"></a>`R-S192-C05` | 컨트롤: 30초 앞으로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s192-c06"></a>`R-S192-C06` | 컨트롤: 이전 트랙(연한 표시) | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s192-c07"></a>`R-S192-C07` | 컨트롤: 다음 트랙(연한 표시) | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s192-c08"></a>`R-S192-C08` | 컨트롤: 속도 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45), [G46](CONTRACTS.md#g46) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s192-c09"></a>`R-S192-C09` | 컨트롤: 공유 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45), [G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s192-c10"></a>`R-S192-C10` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |


원본 해석 경계: 플레이어는 1x로 표시된다. 별도 Changing playback speed의 2.5x를 음성 변경이 자동 초기화한 것으로 연결하지 않는다.

미확인 사항: [U-S192](UNKNOWN.md#u-s192)

<a id="s193"></a>

## S193 — 다이제스트 날짜 선택

안정 원본 ID: `sc_f647f3c6b04d48e9bb1b31f5d0fb2cfe` · [원본 분석](<../../medium/flows/Library/Filtering digest/ANALYSIS.md>):85 · [원본 PNG](<../../medium/flows/Library/Filtering digest/screens/02_sc_f647f3c6b04d48e9bb1b31f5d0fb2cfe.png>)

흐름 맥락: [F43/02](FLOWS.md#f43)

FE 조사 경로: [DigestPanel.tsx](<../../FE/src/features/digest/DigestPanel.tsx>), [NotificationSettingsScreen.tsx](<../../FE/src/features/notifications/NotificationSettingsScreen.tsx>), [LibraryScreen.tsx](<../../FE/src/features/bookmarks/LibraryScreen.tsx>), [IdentityLink.tsx](<../../FE/src/features/community/IdentityLink.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>), [ResponseButton.tsx](<../../FE/src/features/responses/ResponseButton.tsx>)

기본 담당: [G34](CONTRACTS.md#g34) · 실행 작업: [V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27)

**화면별 수용 조건:** June12→June8의 임시 radio/Done·확정 날짜·바뀐 기사, last10 안내와 제목/카드 반응/저장을 비교한다. 날짜10일과 발행10개를 구분한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Digest history10발행분/선택/Done 연결. mock의 실제 발행 날짜 간격을 보존해 원본 연속10일과 다름. ([과거 기록](<../FE_GOAL_53_RESULT.md>):387)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 날짜, Done, 닫기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s193-l"></a>`R-S193-L` | 배치: Digest history 시트·라디오 10개·하단 안내 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s193-d"></a>`R-S193-D` | 표시값·입력: June 12 2025 선택, June 3까지 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s193-s"></a>`R-S193-S` | 상태: 최근 10개까지 볼 수 있다는 안내 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s193-c01"></a>`R-S193-C01` | 컨트롤: 날짜 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s193-c02"></a>`R-S193-C02` | 컨트롤: Done | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s193-c03"></a>`R-S193-C03` | 컨트롤: 닫기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |


원본 해석 경계: 안내는 최근 다이제스트 최대 10개다. 이번에는 연속된 날짜 10개가 보이지만 보관 기간을 언제나 10일로 확정하지 않는다.

미확인 사항: [U-S193](UNKNOWN.md#u-s193)

<a id="s194"></a>

## S194 — 추천 유형 필터 메뉴

안정 원본 ID: `sc_f978feb6af9f44b5a5fa8f514899f3da` · [원본 분석](<../../medium/flows/Home/Refine recommendations/Filtering suggestions/ANALYSIS.md>):86 · [원본 PNG](<../../medium/flows/Home/Refine recommendations/Filtering suggestions/screens/02_sc_f978feb6af9f44b5a5fa8f514899f3da.png>)

흐름 맥락: [F13/02](FLOWS.md#f13)

FE 조사 경로: [RefineRecommendationsScreen.tsx](<../../FE/src/features/recommendations/RefineRecommendationsScreen.tsx>)

기본 담당: [G31](CONTRACTS.md#g31) · 실행 작업: [V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11)

**화면별 수용 조건:** 네 탭, All/Writers/Publications/Topics, 빈 Following, 종류별 count/See all, Follow/Following, See more suggestions를 개별 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. All/Writers/Publications/Topics 선택·체크 대조. nativeblur/44원본행과48논리영역 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):388)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** All, Writers, Publications, Topics

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s194-l"></a>`R-S194-L` | 배치: Suggestions 위 팝오버 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s194-d"></a>`R-S194-D` | 표시값·입력: Topics 체크 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s194-s"></a>`R-S194-S` | 상태: 유형 선택 중 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s194-c01"></a>`R-S194-C01` | 컨트롤: All | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s194-c02"></a>`R-S194-C02` | 컨트롤: Writers | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s194-c03"></a>`R-S194-C03` | 컨트롤: Publications | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s194-c04"></a>`R-S194-C04` | 컨트롤: Topics | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S194](UNKNOWN.md#u-s194)

<a id="s195"></a>

## S195 — 리스트 항목 메뉴

안정 원본 ID: `sc_fa4e79f0bed747d698ae44e23f9223f9` · [원본 분석](<../../medium/flows/Library/List detail/Adding a note/ANALYSIS.md>):86 · [원본 PNG](<../../medium/flows/Library/List detail/Adding a note/screens/02_sc_fa4e79f0bed747d698ae44e23f9223f9.png>)

흐름 맥락: [F45/02](FLOWS.md#f45), [F50/01](FLOWS.md#f50)

FE 조사 경로: [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>)

기본 담당: [G33](CONTRACTS.md#g33) · 실행 작업: [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25)

**화면별 수용 조건:** 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 해당 기사 Add note/Remove/Report 메뉴 연결. native anchored blur 대신 웹 메뉴·48행으로 위치/높이 다름. ([과거 기록](<../FE_GOAL_53_RESULT.md>):389)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Add note, Remove from list, Report this item

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s195-l"></a>`R-S195-L` | 배치: 특정 기사 더보기 3행 팝오버 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s195-d"></a>`R-S195-D` | 표시값·입력: Mind Fullness or Emptiness? 대상 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s195-s"></a>`R-S195-S` | 상태: 항목별 관리 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s195-c01"></a>`R-S195-C01` | 컨트롤: Add note | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s195-c02"></a>`R-S195-C02` | 컨트롤: Remove from list | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s195-c03"></a>`R-S195-C03` | 컨트롤: Report this item | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29), [G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |


원본 해석 경계: Remove from list는 현재 리스트 항목을 제거하는 메뉴다. 기사 원문 삭제 메뉴로 해석하지 않는다.

미확인 사항: [U-S195](UNKNOWN.md#u-s195)

<a id="s196"></a>

## S196 — 멘션 검색 후보

안정 원본 ID: `sc_fbca217fbc1346d09deb4c0d09dac86e` · [원본 분석](<../../medium/flows/Home/Publishing a story/Mentioning a user/ANALYSIS.md>):115 · [원본 PNG](<../../medium/flows/Home/Publishing a story/Mentioning a user/screens/03_sc_fbca217fbc1346d09deb4c0d09dac86e.png>)

흐름 맥락: [F11/03](FLOWS.md#f11)

FE 조사 경로: [MentionSuggestions.tsx](<../../FE/src/features/editor/MentionSuggestions.tsx>), [DocumentReader.tsx](<../../FE/src/features/editor/DocumentReader.tsx>)

기본 담당: [G38](CONTRACTS.md#g38) · 실행 작업: [V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10)

**화면별 수용 조건:** @만 있는 안내, samlee 검색의 이름·아바타·핸들 세 행, 녹색 이름 삽입과 커서·툴바·키보드 위치를 비교한다. 실제 알림 발송은 별도다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Sam Lee 동명이인 handle·canonical ID 검색. 원본 프로필 사진 대신 로컬 initials이며 외부 계정 조회 아님. ([과거 기록](<../FE_GOAL_53_RESULT.md>):390)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 후보 Sam Lee 등

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s196-l"></a>`R-S196-L` | 배치: @samlee 입력 아래 아바타·이름·핸들 3행 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G38](CONTRACTS.md#g38), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |
| <a id="r-s196-d"></a>`R-S196-D` | 표시값·입력: 검색어 samlee | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G38](CONTRACTS.md#g38), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |
| <a id="r-s196-s"></a>`R-S196-S` | 상태: 동명이인 구분 가능한 후보 목록 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G38](CONTRACTS.md#g38), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |
| <a id="r-s196-c01"></a>`R-S196-C01` | 컨트롤: 후보 Sam Lee 등 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G38](CONTRACTS.md#g38) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |


원본 해석 경계: 후보는 표시 이름뿐 아니라 @핸들과 아바타를 함께 제시한다. 동일한 Sam Lee 이름도 @samlee와 @sam.lee로 구분되므로 멘션 대상은 표시 이름만으로 식별할 수 없다.

미확인 사항: [U-S196](UNKNOWN.md#u-s196)

<a id="s197"></a>

## S197 — 구절 인용 응답 등록

안정 원본 ID: `sc_fcdcd471caeb41b8bfa89273d8e29a8d` · [원본 분석](<../../medium/flows/Home/Story detail/Responding to a phrase/ANALYSIS.md>):147 · [원본 PNG](<../../medium/flows/Home/Story detail/Responding to a phrase/screens/04_sc_fcdcd471caeb41b8bfa89273d8e29a8d.png>)

흐름 맥락: [F29/04](FLOWS.md#f29)

FE 조사 경로: [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>)

기본 담당: [G26](CONTRACTS.md#g26) · 실행 작업: [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20)

**화면별 수용 조건:** 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 인용 댓글 확정. 실제 프로필 이름/8건/성공토스트는 현재 mock상태. ([과거 기록](<../FE_GOAL_53_RESULT.md>):391)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Reply, 더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s197-l"></a>`R-S197-L` | 배치: YOU 응답에 인용 상자와 본문 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s197-d"></a>`R-S197-D` | 표시값·입력: Now, 총수 834 유지 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s197-s"></a>`R-S197-S` | 상태: 인용 응답 목록에 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s197-c01"></a>`R-S197-C01` | 컨트롤: Reply | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s197-c02"></a>`R-S197-C02` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |


원본 해석 경계: 인용 블록과 본인 응답이 함께 나타나지만 총수 834는 입력 전후 동일하다. 등록 성공 UI와 총수 집계 규칙을 분리하고, 단순히 +1이어야 한다고 교정하지 않는다.

미확인 사항: [U-S197](UNKNOWN.md#u-s197)

<a id="s198"></a>

## S198 — 다크 테마 적용

안정 원본 ID: `sc_fd7de1ebfba14fbca6ddbe3ff642c42c` · [원본 분석](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>):212 · [원본 PNG](<../../medium/flows/Home/Story detail/Changing display/screens/06_sc_fd7de1ebfba14fbca6ddbe3ff642c42c.png>)

흐름 맥락: [F24/06](FLOWS.md#f24)

FE 조사 경로: [ArticleDisplayPopover.tsx](<../../FE/src/features/settings/ArticleDisplayPopover.tsx>), [useReaderTypography.ts](<../../FE/src/features/settings/useReaderTypography.ts>)

기본 담당: [G24](CONTRACTS.md#g24) · 실행 작업: [V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16)

**화면별 수용 조건:** 100→120과 배경 제목 줄바꿈, Font family 행, Appearance 하위 선택, 타인 Highlight on/off와 어두운 팝오버를 비교한다. 본인 저장 강조 삭제와 분리한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Dark reader 선택. 원본 배경의 디밍과 실제 modal/테마 차이; 본문 폰트와 댓글 수 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):392)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 표시 설정 조절

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s198-l"></a>`R-S198-L` | 배치: 배경·설정 팝오버 검정 계열 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G24](CONTRACTS.md#g24), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s198-d"></a>`R-S198-D` | 표시값·입력: Dark, 120%, 타인 하이라이트 켜짐 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G24](CONTRACTS.md#g24), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s198-s"></a>`R-S198-S` | 상태: 다크 테마 반영 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G24](CONTRACTS.md#g24), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s198-c01"></a>`R-S198-C01` | 컨트롤: 작은 A | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s198-c02"></a>`R-S198-C02` | 컨트롤: 큰 A | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s198-c03"></a>`R-S198-C03` | 컨트롤: Font family | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s198-c04"></a>`R-S198-C04` | 컨트롤: Appearance | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="r-s198-c05"></a>`R-S198-C05` | 컨트롤: Highlights from others 토글 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G24](CONTRACTS.md#g24) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S198](UNKNOWN.md#u-s198)

<a id="s199"></a>

## S199 — 작가 차단 안내

안정 원본 ID: `sc_ff143e1e9b4d4e5ab0579b3fdc61dc1a` · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/Blocking an author/ANALYSIS.md>):115 · [원본 PNG](<../../medium/flows/Home/Story detail/Author detail/Blocking an author/screens/03_sc_ff143e1e9b4d4e5ab0579b3fdc61dc1a.png>)

흐름 맥락: [F18/03](FLOWS.md#f18)

FE 조사 경로: [ModerationDialogs.tsx](<../../FE/src/features/moderation/ModerationDialogs.tsx>), [articleModeration.ts](<../../FE/src/features/moderation/articleModeration.ts>)

기본 담당: [G29](CONTRACTS.md#g29) · 실행 작업: [V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15)

**화면별 수용 조건:** 메뉴 순서·파랑/빨강·Cancel, 성공 토스트, 신고 radio와 Also block checkbox, 사유 전후 Report 상태를 비교한다. 차단 후 원본 카드 잔존과 자체 접근 제한의 충돌을 기록한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 차단확정·성공알림. 현재앱은차단글/목록을숨기는명시정책으로 원본즉시화면의글노출과다름. ([과거 기록](<../FE_GOAL_53_RESULT.md>):393)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Follow, 더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s199-l"></a>`R-S199-L` | 배치: Author blocked 토스트, Follow 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G29](CONTRACTS.md#g29), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s199-d"></a>`R-S199-D` | 표시값·입력: 기사 목록은 그대로 보임 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G29](CONTRACTS.md#g29), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s199-s"></a>`R-S199-S` | 상태: 차단 성공 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G29](CONTRACTS.md#g29), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s199-c01"></a>`R-S199-C01` | 컨트롤: Follow | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28), [G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s199-c02"></a>`R-S199-C02` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S199](UNKNOWN.md#u-s199)

<a id="s200"></a>

## S200 — 리스트 항목 메모 폼

안정 원본 ID: `sc_ffa4d0c8f01440e1a0842a4e1a59708a` · [원본 분석](<../../medium/flows/Library/List detail/Adding a note/ANALYSIS.md>):117 · [원본 PNG](<../../medium/flows/Library/List detail/Adding a note/screens/03_sc_ffa4d0c8f01440e1a0842a4e1a59708a.png>)

흐름 맥락: [F45/03](FLOWS.md#f45)

FE 조사 경로: [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>)

기본 담당: [G33](CONTRACTS.md#g33) · 실행 작업: [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25)

**화면별 수용 조건:** 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 빈 메모/선택 기사/Done form 대조. 원본 이미지 자산과 현재 fixture crop·필드 focus 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):394)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Done, Cancel

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s200-l"></a>`R-S200-L` | 배치: Add note 시트·설명 입력·대상 기사 카드 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s200-d"></a>`R-S200-D` | 표시값·입력: Add a brief description 빈값 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s200-s"></a>`R-S200-S` | 상태: 메모 입력 전 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s200-c01"></a>`R-S200-C01` | 컨트롤: Done | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="r-s200-c02"></a>`R-S200-C02` | 컨트롤: Cancel | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |


원본 해석 경계: 빈 메모에서도 Done은 녹색이다. 필수 입력이라고 단정할 수 없으며 빈값 제출·기존 메모 지우기 결과는 수록되지 않았다.

미확인 사항: [U-S200](UNKNOWN.md#u-s200)
