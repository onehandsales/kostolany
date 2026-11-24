# 화면별 원본 요구사항

**Parity14 커밋 전 추가 검토(2026-11-24):** [재검토·현재 검사·커밋 범위](../FE_MEDIUM_PARITY_14_RESULT.md#pre-commit-review). 추가 코드 결함 없이 타입/lint·관련12 suites/82 tests를 새로 통과했고 이번 act 경고0이다. 앞선 전체1722건 이후 코드 변경·552개 codeInputs 해시 불일치0. 사용자 요청에 따라36파일 로컬 커밋 범위를 확정했다. 원본/시각·S043/native 및9~13 잔여는 유지하며 push·배포·15 구현은 하지 않는다. 아래 미커밋 기록은 최초 실행 이력이다.

**Parity14 최초 구현·검증(2026-11-24):** [구현·이번 검사·원본 차이·담당](../FE_MEDIUM_PARITY_14_RESULT.md). V29/V30의16화면·99 R·19 T/U/C를 대조하고 이메일 약관/수명·추천 카탈로그/조회·온보딩 뒤로/source 경계를 보완했다. 타입/lint·최종 전체316 suites/1722 tests 통과, 이번 act 경고0. 실제8081 부분 대조와 자동 검증을 구분하며 S043은18/21, 원본 자산/시각/OS 대기는14 및 관련 담당에 유지한다.9~13의 잔여 이전·전체 종료 승인은 아니다. 커밋·push·배포·15 진행 없음.

[검토 요약](../FE_MEDIUM_PARITY_AUDIT.md) · [보완 작업](../FE_MEDIUM_PARITY_BACKLOG.md) · [계약 원문](CONTRACTS.md) · [흐름 맥락](FLOWS.md) · [미확인 항목](UNKNOWN.md)

이번 목록은 원본에서 추출한 **관찰 요구사항**이다. L=배치, D=표시값/입력, S=상태, C=컨트롤, V=PNG 추가 세부 관찰이다. L/D/S는 원문 한 문장의 모든 요소를 포함하는 묶음이며 단일 버튼 수가 아니다. C는 명시적으로 나눈 조작점이다. 이 숫자를 기능 완성률의 분모로 사용하지 않는다.

`포함`은 기능 작업 범위에 있다는 판정이며 현재 FE 동일 재현 완료라는 뜻이 아니다. `일부 포함`은 공통/상위 계약은 있지만 개별 조건이 분산된 경우다. 코드 링크는 구현 조사 위치이며 자동으로 해당 요구의 통과를 증명하지 않는다. 과거 Goal53 판정은 당시 증거이고 현재 재촬영 결과가 아니다. 모든 행의 완료 조건은 해당 원본 PNG의 데이터·상태를 맞춘 비교와 FLOWS의 진입/복귀 검증을 함께 적용한다.


<a id="s026"></a>

## S026 — 홈 피드 스크롤 상태

안정 원본 ID: `sc_1ef4e2f769774d2c958fcb38b96dc94f` · [원본 분석](<../../medium/flows/Home/ANALYSIS.md>):86 · [원본 PNG](<../../medium/flows/Home/screens/02_sc_1ef4e2f769774d2c958fcb38b96dc94f.png>)

흐름 맥락: [F05/02](FLOWS.md#f05), [F16/01](FLOWS.md#f16)

FE 조사 경로: [HomeFeedScreen.tsx](<../../FE/src/features/feed/HomeFeedScreen.tsx>), [FollowingFeed.tsx](<../../FE/src/features/community/FollowingFeed.tsx>)

기본 담당: [G50](CONTRACTS.md#g50) · 실행 작업: [V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01)

**화면별 수용 조건:** For you의 원형 −와 Featured의 북마크를 구분한다. 헤더 접힘, 탭 가로 위치, New 배지, 알림 점, 빈 Featured CTA와 채워진 목록을 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 홈 접힘/다음 페이지 실제 요청 후 촬영. 당시 캡처의 스크롤 위치 차이와 세 번째 부분 기사 fixture 차이를 기록했다. 후속 캡처 위치 재확인과 현재 차이는 후속 결과의 S026을 따른다. ([과거 기록](<../FE_GOAL_53_RESULT.md>):220)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 카드 원형 − 아이콘·더보기, 작성 버튼, 피드 탭·하단 탐색

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s026-l"></a>`R-S026-L` | 배치: 상단 제목 접힘, 가로 탭과 하단 탐색 유지 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s026-d"></a>`R-S026-D` | 표시값·입력: 다른 기사 카드와 집계 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s026-s"></a>`R-S026-S` | 상태: For you 하단 목록 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G50](CONTRACTS.md#g50), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s026-c01"></a>`R-S026-C01` | 컨트롤: 카드 원형 − | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s026-c02"></a>`R-S026-C02` | 컨트롤: 카드 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s026-c03"></a>`R-S026-C03` | 컨트롤: 작성 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s026-c04"></a>`R-S026-C04` | 컨트롤: For you | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s026-c05"></a>`R-S026-C05` | 컨트롤: Following | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s026-c06"></a>`R-S026-C06` | 컨트롤: Featured | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s026-c07"></a>`R-S026-C07` | 컨트롤: 토픽 탭 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s026-c08"></a>`R-S026-C08` | 컨트롤: 하단 Home | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s026-c09"></a>`R-S026-C09` | 컨트롤: 하단 Explore | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s026-c10"></a>`R-S026-C10` | 컨트롤: 하단 Library | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="r-s026-c11"></a>`R-S026-C11` | 컨트롤: 하단 Profile | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |


원본 해석 경계: 홈 스크롤 화면의 원형 − 컨트롤은 북마크 모양이 아니다. 실행 동작은 미수록이다.

미확인 사항: [U-S026](UNKNOWN.md#u-s026)

<a id="s027"></a>

## S027 — 프로필 폼으로 대명사 반환

안정 원본 ID: `sc_20bfc41de9f845119aea54bb5971a01e` · [원본 분석](<../../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>):208 · [원본 PNG](<../../medium/flows/Profile/Editing profile information/Adding pronouns/screens/06_sc_20bfc41de9f845119aea54bb5971a01e.png>)

흐름 맥락: [F56/06](FLOWS.md#f56)

FE 조사 경로: [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>)

기본 담당: [G42](CONTRACTS.md#g42) · 실행 작업: [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32)

**화면별 수용 조건:** Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 하위Done후 부모초안2·4, 아직저장전. 사진fixture/짧은소개필드 간격 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):221)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Save, 대명사 Add

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s027-l"></a>`R-S027-L` | 배치: 편집 폼 Pronouns he·him | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s027-d"></a>`R-S027-D` | 표시값·입력: 2/4, 소개 빈값 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s027-s"></a>`R-S027-S` | 상태: 선택값 폼에 반영 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s027-c01"></a>`R-S027-C01` | 컨트롤: Save | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s027-c02"></a>`R-S027-C02` | 컨트롤: 대명사 Add | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |


원본 해석 경계: Adding pronouns 흐름은 프로필 편집 폼으로 돌아온 지점에서 끝난다. 대명사 선택 완료를 프로필 저장 완료로 표시하지 않는다.

미확인 사항: [U-S027](UNKNOWN.md#u-s027)

<a id="s028"></a>

## S028 — 이미지 저장 행동 노출
- **Parity13 최신:** [R/T·현재 검사·원본 차이](../FE_MEDIUM_PARITY_13_RESULT.md#screen-status). 이번 실제 웹 부분 확인과 원본/시각/native 잔여를 구분한다. 기존 원본 요구·증거/readiness는 보존한다.

안정 원본 ID: `sc_221a38b7f8ac42959ddd75840253b5c8` · [원본 분석](<../../medium/flows/Home/Story detail/Sharing a story/ANALYSIS.md>):147 · [원본 PNG](<../../medium/flows/Home/Story detail/Sharing a story/screens/04_sc_221a38b7f8ac42959ddd75840253b5c8.png>)

흐름 맥락: [F39/04](FLOWS.md#f39), [F40/01](FLOWS.md#f40)

FE 조사 경로: [ShareSheet.tsx](<../../FE/src/features/sharing/ShareSheet.tsx>), [ShareCard.tsx](<../../FE/src/features/sharing/ShareCard.tsx>)

기본 담당: [G47](CONTRACTS.md#g47) · 실행 작업: [V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23)

**화면별 수용 조건:** blur 배경·카드 테두리·회전 주소·페이지 점·행동 가로 이동, Copy link·Friend Link·Share via·Save image와 각 성공 토스트를 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 공유 카드의 정보/글쓴이/배치 대조. 자체 gradient 배경·미리보기 kostolany.invalid 링크·좌우 접근성 버튼은 원본 자산과 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):222)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Friend Link, Share via, Save image

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s028-l"></a>`R-S028-L` | 배치: 공유 시트 하단 가로 행동 영역 이동 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G47](CONTRACTS.md#g47), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s028-d"></a>`R-S028-D` | 표시값·입력: 동일 카드 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G47](CONTRACTS.md#g47), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s028-s"></a>`R-S028-S` | 상태: Save image 전체 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G47](CONTRACTS.md#g47), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s028-c01"></a>`R-S028-C01` | 컨트롤: Friend Link | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s028-c02"></a>`R-S028-C02` | 컨트롤: Share via | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="r-s028-c03"></a>`R-S028-C03` | 컨트롤: Save image | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S028](UNKNOWN.md#u-s028)

<a id="s029"></a>

## S029 — Music 토픽 검색

- Parity9: 검색/검색X/유사ID/선택 보존 확인; 검색·설명을 함께 스크롤하도록 보완, 실제 렌더 대기. [모든 R의 현재 판정·검증](../FE_MEDIUM_PARITY_09_RESULT.md). 과거 관찰/계약은 보존하며 시각 동일성 완료로 승격하지 않는다.

안정 원본 ID: `sc_234fd58378fc447ba6bc2e6c0033f9c2` · [원본 분석](<../../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>):119 · [원본 PNG](<../../medium/flows/Home/Publishing a story/Adding topics/screens/03_sc_234fd58378fc447ba6bc2e6c0033f9c2.png>)

흐름 맥락: [F07/03](FLOWS.md#f07)

FE 조사 경로: [PublishTopics.tsx](<../../FE/src/features/editor/PublishTopics.tsx>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>)

기본 담당: [G39](CONTRACTS.md#g39) · 실행 작업: [V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06)

**화면별 수용 조건:** 검색 X와 chip X, 0/5·3/5·최대5, 빈값 Save의 모양, 미리보기 Edit/Publication/Unlisted/Publish now와 스크롤 헤더를 각각 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Music 동명이름·followers 후보/검색 지우기/Save 대조. 입력 48터치와 줄 높이 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):223)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 검색 지우기 X, 결과, Save

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s029-l"></a>`R-S029-L` | 배치: 검색어 아래 유사 이름과 팔로워 수 목록 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G39](CONTRACTS.md#g39), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s029-d"></a>`R-S029-D` | 표시값·입력: Music 입력 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G39](CONTRACTS.md#g39), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s029-s"></a>`R-S029-S` | 상태: 유사 철자·다른 토픽 결과 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G39](CONTRACTS.md#g39), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s029-c01"></a>`R-S029-C01` | 컨트롤: 검색 지우기 X | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s029-c02"></a>`R-S029-C02` | 컨트롤: 결과 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s029-c03"></a>`R-S029-C03` | 컨트롤: Save | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S029](UNKNOWN.md#u-s029)

<a id="s030"></a>

## S030 — 작성기 더보기 메뉴

- Parity9: 네 메뉴의 순서/목적지와 초안 보존 확인; 원본의 Publication 실제 제출 자격은 미확인. [모든 R의 현재 판정·검증](../FE_MEDIUM_PARITY_09_RESULT.md). 과거 관찰/계약은 보존하며 시각 동일성 완료로 승격하지 않는다.

안정 원본 ID: `sc_2436081faa2445cb86e17ea0b88b4fc9` · [원본 분석](<../../medium/flows/Home/Publishing a story/Drafts/ANALYSIS.md>):84 · [원본 PNG](<../../medium/flows/Home/Publishing a story/Drafts/screens/02_sc_2436081faa2445cb86e17ea0b88b4fc9.png>)

흐름 맥락: [F10/02](FLOWS.md#f10)

FE 조사 경로: [DraftsScreen.tsx](<../../FE/src/features/editor/DraftsScreen.tsx>), [createDraftSession.ts](<../../FE/src/features/editor/createDraftSession.ts>)

기본 담당: [G38](CONTRACTS.md#g38) · 실행 작업: [V09](../FE_MEDIUM_PARITY_BACKLOG.md#v09)

**화면별 수용 조건:** 더보기 네 메뉴의 순서·각 목적지, Drafts 제목/Edited 시각/Close/재개를 확인한다. 목록의 시각 표시는 서버 동기화 완료 표시가 아니다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 4개 작성 메뉴의 실제 노출·Drafts 목적지 확인.48행·popover shadow/platform 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):224)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Drafts, Submit to publication, Add or edit topics, Edit story preview

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s030-l"></a>`R-S030-L` | 배치: 상단 더보기 아래 4행 팝오버 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G38](CONTRACTS.md#g38), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V09](../FE_MEDIUM_PARITY_BACKLOG.md#v09) |
| <a id="r-s030-d"></a>`R-S030-D` | 표시값·입력: 본문 유지 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G38](CONTRACTS.md#g38), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V09](../FE_MEDIUM_PARITY_BACKLOG.md#v09) |
| <a id="r-s030-s"></a>`R-S030-S` | 상태: 발행 보조 메뉴 열림 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G38](CONTRACTS.md#g38), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V09](../FE_MEDIUM_PARITY_BACKLOG.md#v09) |
| <a id="r-s030-c01"></a>`R-S030-C01` | 컨트롤: Drafts | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G38](CONTRACTS.md#g38) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V09](../FE_MEDIUM_PARITY_BACKLOG.md#v09) |
| <a id="r-s030-c02"></a>`R-S030-C02` | 컨트롤: Submit to publication | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G38](CONTRACTS.md#g38), [G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V09](../FE_MEDIUM_PARITY_BACKLOG.md#v09) |
| <a id="r-s030-c03"></a>`R-S030-C03` | 컨트롤: Add or edit topics | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G38](CONTRACTS.md#g38), [G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V09](../FE_MEDIUM_PARITY_BACKLOG.md#v09) |
| <a id="r-s030-c04"></a>`R-S030-C04` | 컨트롤: Edit story preview | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G38](CONTRACTS.md#g38), [G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V09](../FE_MEDIUM_PARITY_BACKLOG.md#v09) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S030](UNKNOWN.md#u-s030)

<a id="s031"></a>

## S031 — 본문 문자 스타일 변경

- Parity9: 회색 subheading과 선택 도구의 기존 모델 확인; 원본 스타일 이름/내부 표현 미확인. [모든 R의 현재 판정·검증](../FE_MEDIUM_PARITY_09_RESULT.md). 과거 관찰/계약은 보존하며 시각 동일성 완료로 승격하지 않는다.

안정 원본 ID: `sc_24b381a199374acb8d2a6a516052c9a7` · [원본 분석](<../../medium/flows/Home/Publishing a story/Changing text format/ANALYSIS.md>):86 · [원본 PNG](<../../medium/flows/Home/Publishing a story/Changing text format/screens/02_sc_24b381a199374acb8d2a6a516052c9a7.png>)

흐름 맥락: [F09/02](FLOWS.md#f09)

FE 조사 경로: [RichDocumentBody.tsx](<../../FE/src/features/editor/RichDocumentBody.tsx>), [editorModel.ts](<../../FE/src/features/editor/editorModel.ts>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>)

기본 담당: [G36](CONTRACTS.md#g36) · 실행 작업: [V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07)

**화면별 수용 조건:** 제목과 본문, 회색 문자 스타일, 이탤릭 인용선, bullet, 점3개 구분선, 선택 중 도구 색과 키보드 위 툴바를 비교한다. 코드 도구의 실행 후 모습은 원본 미확인이다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 문자 스타일 비교로 기존 subheading을 회색 산세리프18/24 표현으로 수정. 원본 내부 스타일 이름은 미확인, 앱 기존 문서 kind에 대응한 자체 결정. ([과거 기록](<../FE_GOAL_53_RESULT.md>):225)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 문자 스타일, 인용, 목록, Next

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s031-l"></a>`R-S031-L` | 배치: 회색 산세리프 단락과 녹색 문자 도구 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G36](CONTRACTS.md#g36), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s031-d"></a>`R-S031-D` | 표시값·입력: 제목 유지, 단락 스타일 변경 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G36](CONTRACTS.md#g36), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s031-s"></a>`R-S031-S` | 상태: 텍스트 서식 선택 상태 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G36](CONTRACTS.md#g36), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s031-c01"></a>`R-S031-C01` | 컨트롤: 문자 스타일 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s031-c02"></a>`R-S031-C02` | 컨트롤: 인용 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s031-c03"></a>`R-S031-C03` | 컨트롤: 목록 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s031-c04"></a>`R-S031-C04` | 컨트롤: Next | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S031](UNKNOWN.md#u-s031)

<a id="s032"></a>

## S032 — 최신순 응답 목록

- **Parity10 판정:** Most Recent의 생성 시각 정렬과 보관된 상대 날짜 유지. 날짜를 현재 시각으로 재해석하지 않는다. 정렬 팝오버 실제 렌더 대기. [이번 코드/검사·한계](../FE_MEDIUM_PARITY_10_RESULT.md#screen-status). 원본·과거 판정은 아래에 보존한다.

안정 원본 ID: `sc_280ed6ce41b24f6f876aac698f4a8119` · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Sorting responses/ANALYSIS.md>):115 · [원본 PNG](<../../medium/flows/Home/Story detail/Responses/Sorting responses/screens/03_sc_280ed6ce41b24f6f876aac698f4a8119.png>)

흐름 맥락: [F36/03](FLOWS.md#f36)

FE 조사 경로: [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>)

기본 담당: [G26](CONTRACTS.md#g26) · 실행 작업: [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20)

**화면별 수용 조건:** 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Recent Navj/Gwyneth/Melanie순서. 원본집계/작성자자산 일부차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):226)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 정렬, Reply, 더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s032-l"></a>`R-S032-L` | 배치: Most Recent 선택·새로운 작성자 목록 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s032-d"></a>`R-S032-D` | 표시값·입력: 1 hour ago, 4 hours ago, 7 hours ago | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s032-s"></a>`R-S032-S` | 상태: 최근 응답이 먼저 보임 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s032-c01"></a>`R-S032-C01` | 컨트롤: 정렬 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s032-c02"></a>`R-S032-C02` | 컨트롤: Reply | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s032-c03"></a>`R-S032-C03` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S032](UNKNOWN.md#u-s032)

<a id="s033"></a>

## S033 — 전체 추천의 작가 섹션

안정 원본 ID: `sc_28a0bd2548fc4800b2b024bdc06bb115` · [원본 분석](<../../medium/flows/Home/Refine recommendations/Filtering suggestions/ANALYSIS.md>):116 · [원본 PNG](<../../medium/flows/Home/Refine recommendations/Filtering suggestions/screens/03_sc_28a0bd2548fc4800b2b024bdc06bb115.png>)

흐름 맥락: [F13/03](FLOWS.md#f13)

FE 조사 경로: [RefineRecommendationsScreen.tsx](<../../FE/src/features/recommendations/RefineRecommendationsScreen.tsx>)

기본 담당: [G31](CONTRACTS.md#g31) · 실행 작업: [V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11)

**화면별 수용 조건:** 네 탭, All/Writers/Publications/Topics, 빈 Following, 종류별 count/See all, Follow/Following, See more suggestions를 개별 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. All추천Writers·공유verified표시보완. 기존follow결과와제목/소개줄수 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):227)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Follow

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s033-l"></a>`R-S033-L` | 배치: All 필터 아래 Writers to follow | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s033-d"></a>`R-S033-D` | 표시값·입력: 작가 소개·인증 배지 일부 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s033-s"></a>`R-S033-S` | 상태: 전체 추천 중 작가 목록 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="r-s033-c01"></a>`R-S033-C01` | 컨트롤: Follow | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S033](UNKNOWN.md#u-s033)

<a id="s034"></a>

## S034 — 로그아웃 확인

**Parity14 개별 판정:** [S034 실행·R/T/U/C](../FE_MEDIUM_PARITY_14_RESULT.md#screens). Settings→Sign out→Cancel/Confirm·실패·재시도→가입 화면 확인. 메모리 계정 경계 유지. 원본 요구·readiness는 유지한다.

안정 원본 ID: `sc_2d1afd7a02a347868564f9757753d077` · [원본 분석](<../../medium/flows/Profile/Settings/Logging out/ANALYSIS.md>):85 · [원본 PNG](<../../medium/flows/Profile/Settings/Logging out/screens/02_sc_2d1afd7a02a347868564f9757753d077.png>)

흐름 맥락: [F61/02](FLOWS.md#f61)

FE 조사 경로: [AuthDialogs.tsx](<../../FE/src/features/auth/AuthDialogs.tsx>), [EmailLogin.tsx](<../../FE/src/features/auth/EmailLogin.tsx>), [createEmailAttempt.ts](<../../FE/src/features/auth/createEmailAttempt.ts>)

기본 담당: [G40](CONTRACTS.md#g40) · 실행 작업: [V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29)

**화면별 수용 조건:** 가입4/로그인5 제공자, 이메일/이름/약관/뒤로·6칸 코드와Validate·Resend·닫기, Sign out Cancel/Confirm→intro를 비교한다. 빈 폼의 녹색 버튼과 실제 입력 검증은 별개다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Signout확인·취소·성공복귀. 모의실패선택접근UI자체추가, nativealert대비앱dialog차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):228)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Cancel, Confirm

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s034-l"></a>`R-S034-L` | 배치: 설정 위 중앙 Sign out 대화상자 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s034-d"></a>`R-S034-D` | 표시값·입력: 로그아웃 의사 확인 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s034-s"></a>`R-S034-S` | 상태: 세션 종료 전 확인 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s034-c01"></a>`R-S034-C01` | 컨트롤: Cancel | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s034-c02"></a>`R-S034-C02` | 컨트롤: Confirm | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S034](UNKNOWN.md#u-s034)

<a id="s035"></a>

## S035 — 관심사 기반 작가·발행물 추천

**Parity14 개별 판정:** [S035 실행·R/T/U/C](../FE_MEDIUM_PARITY_14_RESULT.md#screens). 추천 4항목 순서/소개 보완, 동적 B/Publication ID 분리·Follow/Unfollow·실패 재시도·관리 목록 연결. 아바타 2개 미확보. 원본 요구·readiness는 유지한다.

안정 원본 ID: `sc_301ef788e5514bb5b8e9c1fc9afcfa61` · [원본 분석](<../../medium/flows/Onboarding/ANALYSIS.md>):336 · [원본 PNG](<../../medium/flows/Onboarding/screens/10_sc_301ef788e5514bb5b8e9c1fc9afcfa61.png>)

흐름 맥락: [F53/10](FLOWS.md#f53)

FE 조사 경로: [OnboardingScreen.tsx](<../../FE/src/features/onboarding/OnboardingScreen.tsx>), [createOnboardingSession.ts](<../../FE/src/features/onboarding/createOnboardingSession.ts>)

기본 담당: [G41](CONTRACTS.md#g41) · 실행 작업: [V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30)

**화면별 수용 조건:** 브랜드 시작, 새 경험 소개, 최소3개 안내와 관찰5개 선택, Follow/Finish, Enable/Skip와 다음 목적지를 확인한다. 모든 계정에 동일 순서를 강제하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 추천작가 Follow 실제 공유 관계 연결. 추천목록 fixture/소개/작가·출판물 avatar차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):229)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Follow, Finish, 뒤로

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s035-l"></a>`R-S035-L` | 배치: 상단 환영 제목 아래 아바타·소개·Follow 행, 하단 고정 Finish | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G41](CONTRACTS.md#g41), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="r-s035-d"></a>`R-S035-D` | 표시값·입력: 별도 입력란 없음. 작가와 Publication이 함께 표시됨 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G41](CONTRACTS.md#g41), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="r-s035-s"></a>`R-S035-S` | 상태: 팔로우 전 추천 목록 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G41](CONTRACTS.md#g41), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="r-s035-c01"></a>`R-S035-C01` | 컨트롤: Follow | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28), [G41](CONTRACTS.md#g41) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="r-s035-c02"></a>`R-S035-C02` | 컨트롤: Finish | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G41](CONTRACTS.md#g41) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="r-s035-c03"></a>`R-S035-C03` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G41](CONTRACTS.md#g41) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |


원본 해석 경계: 작가와 Publication을 같은 목록에서 구분해 표시한다. 보이는 네 항목이 모두 Follow 상태여도 Finish는 녹색으로 표시된다. 팔로우 필수 조건은 이 캡처에서 입증되지 않는다.

미확인 사항: [U-S035](UNKNOWN.md#u-s035)

<a id="s036"></a>

## S036 — 기사 저장 대상 선택

- Parity 7 최신 검토: [저장·목록·메모·순서 결과](../FE_MEDIUM_PARITY_07_RESULT.md). 기능/브라우저·원본 차이·미확인/native를 분리한다. 아래 초기 판정은 감사 당시 이력이다.

안정 원본 ID: `sc_31edfd53d2874259a6ed5ecbc756d10b` · [원본 분석](<../../medium/flows/Home/Story detail/Saving a story/ANALYSIS.md>):85 · [원본 PNG](<../../medium/flows/Home/Story detail/Saving a story/screens/02_sc_31edfd53d2874259a6ed5ecbc756d10b.png>)

흐름 맥락: [F37/02](FLOWS.md#f37)

FE 조사 경로: [ArticleBookmarkControl.tsx](<../../FE/src/features/bookmarks/ArticleBookmarkControl.tsx>), [SaveToListSheet.tsx](<../../FE/src/features/bookmarks/SaveToListSheet.tsx>)

기본 담당: [G33](CONTRACTS.md#g33) · 실행 작업: [V22](../FE_MEDIUM_PARITY_BACKLOG.md#v22)

**화면별 수용 조건:** Save to, Reading list 체크/잠금, Create new list, Done, 복귀한 채운 북마크를 비교한다. 체크와 확정 시점을 자체 계약으로 명시한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Reading list 선택초안/Done 일치. 48터치/간격차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):230)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Create new list, Reading list, Done

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s036-l"></a>`R-S036-L` | 배치: 하단 Save to 시트 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V22](../FE_MEDIUM_PARITY_BACKLOG.md#v22) |
| <a id="r-s036-d"></a>`R-S036-D` | 표시값·입력: Reading list 체크·자물쇠 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V22](../FE_MEDIUM_PARITY_BACKLOG.md#v22) |
| <a id="r-s036-s"></a>`R-S036-S` | 상태: 비공개 읽기 목록 선택 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G33](CONTRACTS.md#g33), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V22](../FE_MEDIUM_PARITY_BACKLOG.md#v22) |
| <a id="r-s036-c01"></a>`R-S036-C01` | 컨트롤: Create new list | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V22](../FE_MEDIUM_PARITY_BACKLOG.md#v22) |
| <a id="r-s036-c02"></a>`R-S036-C02` | 컨트롤: Reading list | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V22](../FE_MEDIUM_PARITY_BACKLOG.md#v22) |
| <a id="r-s036-c03"></a>`R-S036-C03` | 컨트롤: Done | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V22](../FE_MEDIUM_PARITY_BACKLOG.md#v22) |


원본 해석 경계: 체크는 저장 대상 리스트 선택, 자물쇠는 해당 리스트의 공개 범위 표시다. 기사 자체가 비공개가 되었다는 뜻으로 해석하지 않는다.

미확인 사항: [U-S036](UNKNOWN.md#u-s036)

<a id="s037"></a>

## S037 — 기사 상세 상단

- **Parity10 판정:** 메타데이터 사이만 구분자 표시. 표지 출처·본문·작가·도구 연결 확인. 834 비교 옵션 추가. 표지 출처의 R 누락 보강. [이번 코드/검사·한계](../FE_MEDIUM_PARITY_10_RESULT.md#screen-status). 원본·과거 판정은 아래에 보존한다.

안정 원본 ID: `sc_332d5b0923e546fcbf6a8fc613cda6a4` · [원본 분석](<../../medium/flows/Home/Story detail/ANALYSIS.md>):89 · [원본 PNG](<../../medium/flows/Home/Story detail/screens/02_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>)

흐름 맥락: [F16/02](FLOWS.md#f16), [F17/01](FLOWS.md#f17), [F24/01](FLOWS.md#f24), [F26/01](FLOWS.md#f26), [F30/01](FLOWS.md#f30), [F37/01](FLOWS.md#f37), [F38/01](FLOWS.md#f38), [F39/01](FLOWS.md#f39)

FE 조사 경로: [ArticleDetailScreen.tsx](<../../FE/src/features/article/ArticleDetailScreen.tsx>), [ReferenceArticleView.tsx](<../../FE/src/features/article/ReferenceArticleView.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>)

기본 담당: [G25](CONTRACTS.md#g25) · 실행 작업: [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13)

**화면별 수용 조건:** 제목/부제/작가/읽기시간/표지 출처, 본문 강조·링크·삽입 이미지·토픽·작성자·응답 미리보기·관련 글·고정 반응 바를 각각 비교한다. +16은 입력 피드백이며 터치 횟수 증거가 아니다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 상세첫화면동일커버/제목/작성자/유료배지 대조. 댓글834vs실제7, serif/Follow폭·헤더높이차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):231)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 듣기, 더보기, Follow, 박수, 응답, 저장, 공유

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s037-l"></a>`R-S037-L` | 배치: Member-only 배지·제목·부제·읽기 시간·작가·커버, 고정 반응 바 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s037-d"></a>`R-S037-D` | 표시값·입력: 5 min read, Apr 30 2025, Jordan Gibbs, 18K 박수·834 응답 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s037-s"></a>`R-S037-S` | 상태: 멤버 전용 기사 읽기 화면 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s037-c01"></a>`R-S037-C01` | 컨트롤: 듣기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s037-c02"></a>`R-S037-C02` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s037-c03"></a>`R-S037-C03` | 컨트롤: Follow | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s037-c04"></a>`R-S037-C04` | 컨트롤: 박수 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s037-c05"></a>`R-S037-C05` | 컨트롤: 응답 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s037-c06"></a>`R-S037-C06` | 컨트롤: 저장 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G33](CONTRACTS.md#g33) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s037-c07"></a>`R-S037-C07` | 컨트롤: 공유 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |


원본 해석 경계: 표지 아래 Generated by the author with AI. 출처성 설명이 보인다. 상단 Member-only story 표식과 본문 접근 상태를 구분하며, 비회원 차단 화면은 이 흐름에 없다.

미확인 사항: [U-S037](UNKNOWN.md#u-s037)

**Parity10 원본 누락 보강:** 기존 R을 보존하고 이번 직접 PNG 관찰을 추가한다.

| 추가 요구 | 원본 관찰 | 현재 코드/검증 |
| --- | --- | --- |
| <a id="r-s037-v"></a>`R-S037-V` | 표지 아래 Generated by the author with AI. 출처성 설명이 보인다. | ReferenceArticleView 연결·자동 검증 / 실제 앱 렌더 쌍 비교 대기. [이번 결과](../FE_MEDIUM_PARITY_10_RESULT.md#screen-status) |


<a id="s038"></a>

## S038 — 작가 공개 리스트

안정 원본 ID: `sc_334d50df678445baaa7ba445c96861ba` · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/ANALYSIS.md>):116 · [원본 PNG](<../../medium/flows/Home/Story detail/Author detail/screens/03_sc_334d50df678445baaa7ba445c96861ba.png>)

흐름 맥락: [F17/03](FLOWS.md#f17)

FE 조사 경로: [PublicIdentityScreen.tsx](<../../FE/src/features/community/PublicIdentityScreen.tsx>), [FollowControl.tsx](<../../FE/src/features/community/FollowControl.tsx>), [ConnectionsScreen.tsx](<../../FE/src/features/community/ConnectionsScreen.tsx>)

기본 담당: [G28](CONTRACTS.md#g28) · 실행 작업: [V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14)

**화면별 수용 조건:** Stories/Lists/About, Pinned, member/Friend 시작 월, Follow 성공·메뉴·해제 토스트, Email on/off, 작가와 publication 관계 목록을 각각 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 작성자Lists에독립Save/더보기/Share연결추가, 제목/커버진입보존. 카드48터치/커버crop차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):232)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 리스트 저장, 더보기, 리스트 카드

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s038-l"></a>`R-S038-L` | 배치: Lists 탭에 AAA AI 카드 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G28](CONTRACTS.md#g28), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s038-d"></a>`R-S038-D` | 표시값·입력: 2 stories·이미지 모음 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G28](CONTRACTS.md#g28), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s038-s"></a>`R-S038-S` | 상태: 작가 목록 탐색 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G28](CONTRACTS.md#g28), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s038-c01"></a>`R-S038-C01` | 컨트롤: 리스트 저장 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28), [G32](CONTRACTS.md#g32) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s038-c02"></a>`R-S038-C02` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28), [G32](CONTRACTS.md#g32) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s038-c03"></a>`R-S038-C03` | 컨트롤: 리스트 카드 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S038](UNKNOWN.md#u-s038)

<a id="s039"></a>

## S039 — 새 리스트 생성 표시

- Parity 7 최신 검토: [저장·목록·메모·순서 결과](../FE_MEDIUM_PARITY_07_RESULT.md). 기능/브라우저·원본 차이·미확인/native를 분리한다. 아래 초기 판정은 감사 당시 이력이다.

안정 원본 ID: `sc_35dcbd9d4308404b9f11ecd03f893eb8` · [원본 분석](<../../medium/flows/Library/Creating a list/ANALYSIS.md>):146 · [원본 PNG](<../../medium/flows/Library/Creating a list/screens/04_sc_35dcbd9d4308404b9f11ecd03f893eb8.png>)

흐름 맥락: [F42/04](FLOWS.md#f42), [F46/01](FLOWS.md#f46)

FE 조사 경로: [LibraryScreen.tsx](<../../FE/src/features/bookmarks/LibraryScreen.tsx>), [HighlightList.tsx](<../../FE/src/features/highlights/HighlightList.tsx>)

기본 담당: [G34](CONTRACTS.md#g34) · 실행 작업: [V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24)

**화면별 수용 조건:** 가로5탭, 초기 배너/닫기·Digest New, New list, 빈/3개/4개 카드 썸네일/잠금/다운로드/메뉴, Highlighted 구절·작성자·원문 링크를 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 생성 확정 후 두 목록과 복귀 확인. 초기 촬영이 Saving 상태였으므로 확정된 library행을 기다리도록 재촬영 수정. ([과거 기록](<../FE_GOAL_53_RESULT.md>):233)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 새 카드·다운로드·더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s039-l"></a>`R-S039-L` | 배치: Your lists에 기본 목록과 새 카드 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s039-d"></a>`R-S039-D` | 표시값·입력: About mindfulness, No stories, 자물쇠 없음 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s039-s"></a>`R-S039-S` | 상태: 새 목록 생성 결과 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s039-c01"></a>`R-S039-C01` | 컨트롤: 새 카드 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s039-c02"></a>`R-S039-C02` | 컨트롤: 다운로드 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G34](CONTRACTS.md#g34), [G35](CONTRACTS.md#g35) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s039-c03"></a>`R-S039-C03` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S039](UNKNOWN.md#u-s039)

<a id="s040"></a>

## S040 — 추천 알림 두 항목 끄기

안정 원본 ID: `sc_368c53cd77e2421e8279124ce03301f4` · [원본 분석](<../../medium/flows/Profile/Settings/Changing notification settings/ANALYSIS.md>):115 · [원본 PNG](<../../medium/flows/Profile/Settings/Changing notification settings/screens/03_sc_368c53cd77e2421e8279124ce03301f4.png>)

흐름 맥락: [F59/03](FLOWS.md#f59)

FE 조사 경로: [NotificationSettingsScreen.tsx](<../../FE/src/features/notifications/NotificationSettingsScreen.tsx>)

기본 담당: [G44](CONTRACTS.md#g44) · 실행 작업: [V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28)

**화면별 수용 조건:** Daily/Push On/Email On의 선택·chevron·외부 화살표를 구분한다. 여섯 토글과 다섯 Tailored 행, Top story/Editors만Off를 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Topstories/Editors만off저장 및 다른항목 유지.48터치행높이·토글자산 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):234)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 토글·빈도 선택

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s040-l"></a>`R-S040-L` | 배치: 같은 알림 폼 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G44](CONTRACTS.md#g44), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s040-d"></a>`R-S040-D` | 표시값·입력: Your top story of the day·Editors 꺼짐, Digest 켜짐 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G44](CONTRACTS.md#g44), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s040-s"></a>`R-S040-S` | 상태: 선택 알림만 비활성 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G44](CONTRACTS.md#g44), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s040-c01"></a>`R-S040-C01` | 컨트롤: New Medium Digest 토글 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s040-c02"></a>`R-S040-C02` | 컨트롤: Your top story of the day 토글 Off | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s040-c03"></a>`R-S040-C03` | 컨트롤: Editors 토글 Off | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s040-c04"></a>`R-S040-C04` | 컨트롤: New stories from writers 선택 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s040-c05"></a>`R-S040-C05` | 컨트롤: Featured 토글 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s040-c06"></a>`R-S040-C06` | 컨트롤: Claps 선택 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s040-c07"></a>`R-S040-C07` | 컨트롤: Highlights 선택 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s040-c08"></a>`R-S040-C08` | 컨트롤: Responses 선택 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s040-c09"></a>`R-S040-C09` | 컨트롤: Mentions 선택 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s040-c10"></a>`R-S040-C10` | 컨트롤: Applause 토글 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s040-c11"></a>`R-S040-C11` | 컨트롤: Saves 토글 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="r-s040-c12"></a>`R-S040-C12` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S040](UNKNOWN.md#u-s040)

<a id="s041"></a>

## S041 — 새 읽기 경험 소개

**Parity14 개별 판정:** [S041 실행·R/T/U/C](../FE_MEDIUM_PARITY_14_RESULT.md#screens). 새 경험 안내·Continue·기존 자산 7개 묶음 확인. 원본 7인 이미지/정확 배치와 다름; 모든 계정 공통 단계로 확정하지 않음. 원본 요구·readiness는 유지한다.

안정 원본 ID: `sc_3795c955a89d404c85112e637857e74a` · [원본 분석](<../../medium/flows/Onboarding/ANALYSIS.md>):246 · [원본 PNG](<../../medium/flows/Onboarding/screens/07_sc_3795c955a89d404c85112e637857e74a.png>)

흐름 맥락: [F53/07](FLOWS.md#f53)

FE 조사 경로: [OnboardingScreen.tsx](<../../FE/src/features/onboarding/OnboardingScreen.tsx>), [createOnboardingSession.ts](<../../FE/src/features/onboarding/createOnboardingSession.ts>)

기본 담당: [G41](CONTRACTS.md#g41) · 실행 작업: [V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30)

**화면별 수용 조건:** 브랜드 시작, 새 경험 소개, 최소3개 안내와 관찰5개 선택, Follow/Finish, Enable/Skip와 다음 목적지를 확인한다. 모든 계정에 동일 순서를 강제하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 온보딩 Welcome/Continue 대조. 실제 관계 fixture avatar구성과 대체 serif 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):235)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Continue 버튼이 있다.

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s041-l"></a>`R-S041-L` | 배치: 큰 환영 제목, 추천 개선 설명, 작가 아바타 묶음, 하단 CTA가 있다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G41](CONTRACTS.md#g41), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="r-s041-d"></a>`R-S041-D` | 표시값·입력: 입력 필드는 없다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G41](CONTRACTS.md#g41), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="r-s041-s"></a>`R-S041-S` | 상태: 앱 업데이트와 팔로잉 재검토를 안내한다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G41](CONTRACTS.md#g41), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="r-s041-c01"></a>`R-S041-C01` | 컨트롤: Continue 버튼이 있다. | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G41](CONTRACTS.md#g41) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S041](UNKNOWN.md#u-s041)

<a id="s042"></a>

## S042 — 빈 기사 편집기

- Parity9: 빈 문서의 녹색Next와 입력 확인; mock 미리보기/빈글 발행 차단을 원본 실제 결과로 단정하지 않음. [모든 R의 현재 판정·검증](../FE_MEDIUM_PARITY_09_RESULT.md). 과거 관찰/계약은 보존하며 시각 동일성 완료로 승격하지 않는다.

안정 원본 ID: `sc_397cb0f05ba54659adac7376f29512dd` · [원본 분석](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>):93 · [원본 PNG](<../../medium/flows/Home/Publishing a story/screens/02_sc_397cb0f05ba54659adac7376f29512dd.png>)

흐름 맥락: [F08/02](FLOWS.md#f08)

FE 조사 경로: [RichDocumentBody.tsx](<../../FE/src/features/editor/RichDocumentBody.tsx>), [editorModel.ts](<../../FE/src/features/editor/editorModel.ts>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>)

기본 담당: [G36](CONTRACTS.md#g36) · 실행 작업: [V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07)

**화면별 수용 조건:** 제목과 본문, 회색 문자 스타일, 이탤릭 인용선, bullet, 점3개 구분선, 선택 중 도구 색과 키보드 위 툴바를 비교한다. 코드 도구의 실행 후 모습은 원본 미확인이다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 빈 편집기 실제 진입. 웹은 OS 키보드가 없고 screenshot caret 숨김 기본값; native 성공으로 계산 안 함. ([과거 기록](<../FE_GOAL_53_RESULT.md>):236)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 문자 크기, 인용, 목록, 구분선, 멘션, 코드, 이미지, Next

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s042-l"></a>`R-S042-L` | 배치: 상단 Close·더보기·Next, 본문 커서, 키보드 위 서식 도구 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G36](CONTRACTS.md#g36), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s042-d"></a>`R-S042-D` | 표시값·입력: 본문 빈값 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G36](CONTRACTS.md#g36), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s042-s"></a>`R-S042-S` | 상태: 작성 시작·키보드 활성 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G36](CONTRACTS.md#g36), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s042-c01"></a>`R-S042-C01` | 컨트롤: Close | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s042-c02"></a>`R-S042-C02` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s042-c03"></a>`R-S042-C03` | 컨트롤: Next 녹색 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s042-c04"></a>`R-S042-C04` | 컨트롤: 문자 스타일 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s042-c05"></a>`R-S042-C05` | 컨트롤: 인용 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s042-c06"></a>`R-S042-C06` | 컨트롤: 목록 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s042-c07"></a>`R-S042-C07` | 컨트롤: 구분선 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s042-c08"></a>`R-S042-C08` | 컨트롤: 멘션 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G38](CONTRACTS.md#g38) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s042-c09"></a>`R-S042-C09` | 컨트롤: 코드 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s042-c10"></a>`R-S042-C10` | 컨트롤: 이미지 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G37](CONTRACTS.md#g37) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s042-c11"></a>`R-S042-C11` | 컨트롤: 본문 입력 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |


원본 해석 경계: Close와 더보기 메뉴로 작성 경로를 벗어나는 진입점이 있다. 빈 문서에서도 Next는 녹색이며, 빈 글 발행 허용 여부는 확인되지 않는다.

미확인 사항: [U-S042](UNKNOWN.md#u-s042)

<a id="s043"></a>

## S043 — 브랜드 시작 화면

**Parity14 개별 판정:** [S043 실행·R/T/U/C](../FE_MEDIUM_PARITY_14_RESULT.md#screens). 원본 PNG 직접 확인. JS 홈 진입은 native splash와 다름. splash 미구현·18 자산/구현 및21 실제 cold start 검증 대기. 원본 요구·readiness는 유지한다.

안정 원본 ID: `sc_39bd15e8585d404daa48b34a448b0e32` · [원본 분석](<../../medium/flows/Onboarding/ANALYSIS.md>):64 · [원본 PNG](<../../medium/flows/Onboarding/screens/01_sc_39bd15e8585d404daa48b34a448b0e32.png>)

흐름 맥락: [F53/01](FLOWS.md#f53)

FE 조사 경로: [OnboardingScreen.tsx](<../../FE/src/features/onboarding/OnboardingScreen.tsx>), [createOnboardingSession.ts](<../../FE/src/features/onboarding/createOnboardingSession.ts>)

기본 담당: [G41](CONTRACTS.md#g41) · 실행 작업: [V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30)

**화면별 수용 조건:** 브랜드 시작, 새 경험 소개, 최소3개 안내와 관찰5개 선택, Follow/Finish, Enable/Skip와 다음 목적지를 확인한다. 모든 계정에 동일 순서를 강제하지 않는다.

**과거 Goal53 화면 판정:** **비동등 · native 원본 검증 대기**. 원본 native 시작 브랜드 화면과 현재 웹 Home은 비동등. native splash 브랜드 전용 구현/실행 확인 잔여; 캡처 확보를 구현 완료로 세지 않음. ([과거 기록](<../FE_GOAL_53_RESULT.md>):237)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 상태바와 홈 인디케이터 외 조작 요소는 보이지 않는다.

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s043-l"></a>`R-S043-L` | 배치: 검은 전면 배경 중앙에 흰 Medium 로고가 크게 배치된다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G41](CONTRACTS.md#g41), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="r-s043-d"></a>`R-S043-D` | 표시값·입력: 입력 필드는 없다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G41](CONTRACTS.md#g41), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="r-s043-s"></a>`R-S043-S` | 상태: 앱 진입 시 브랜드 표시 캡처다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G41](CONTRACTS.md#g41), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="r-s043-c01"></a>`R-S043-C01` | 컨트롤: 조작 요소 없음(상태바·홈 인디케이터는 OS 영역) | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G41](CONTRACTS.md#g41) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="r-s043-v"></a>`R-S043-V` | PNG 추가 세부 관찰: 검은 전면의 중앙 흰 Medium 워드마크를 재현해야 한다. 현재 웹 Home 대응 캡처는 이 화면의 구현 근거가 아니다. | 일부 포함: 공통 시각 계약에 포함되나 이 요소 묶음의 독립 판정 필요<br>[G41](CONTRACTS.md#g41), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 전용 브랜드 splash 구현/실행 잔여; 웹 Home으로 대체 판정 불가<br>[D10](../FE_MEDIUM_PARITY_BACKLOG.md#d10) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S043](UNKNOWN.md#u-s043)

<a id="s044"></a>

## S044 — Unlisted 공개 범위 안내

- Parity9: 기존 Unlisted 선택/취소·발행 실패/재시도 확인; 외부 URL·노출 효력은 제외. [모든 R의 현재 판정·검증](../FE_MEDIUM_PARITY_09_RESULT.md). 과거 관찰/계약은 보존하며 시각 동일성 완료로 승격하지 않는다.

안정 원본 ID: `sc_39fb71a1ee0d43f09bab33c7ef775259` · [원본 분석](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>):335 · [원본 PNG](<../../medium/flows/Home/Publishing a story/screens/10_sc_39fb71a1ee0d43f09bab33c7ef775259.png>)

흐름 맥락: [F08/10](FLOWS.md#f08)

FE 조사 경로: [PublishTopics.tsx](<../../FE/src/features/editor/PublishTopics.tsx>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>)

기본 담당: [G39](CONTRACTS.md#g39) · 실행 작업: [V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06)

**화면별 수용 조건:** 검색 X와 chip X, 0/5·3/5·최대5, 빈값 Save의 모양, 미리보기 Edit/Publication/Unlisted/Publish now와 스크롤 헤더를 각각 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Unlisted OFF 설명과 스크롤 맥락 대조. preview 접힘 제목/설명 크기·문구·토픽 칩 보정. 웹 Switch/전체 본문 미리보기 자체 보완. ([과거 기록](<../FE_GOAL_53_RESULT.md>):238)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Unlisted 토글, Publish now

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s044-l"></a>`R-S044-L` | 배치: 미리보기 하단 스크롤, Publication과 Unlisted 설명 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G39](CONTRACTS.md#g39), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s044-d"></a>`R-S044-D` | 표시값·입력: Publication 미지정, Unlisted 꺼짐 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G39](CONTRACTS.md#g39), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s044-s"></a>`R-S044-S` | 상태: 링크 소지자 접근·공개 목록 제외라는 안내 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G39](CONTRACTS.md#g39), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s044-c01"></a>`R-S044-C01` | 컨트롤: Unlisted 토글 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s044-c02"></a>`R-S044-C02` | 컨트롤: Publish now | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |


원본 해석 경계: Unlisted는 꺼진 상태만 수록된다. 토글을 켠 결과·비공개 접근 차단을 관찰한 것으로 기록하지 않는다.

미확인 사항: [U-S044](UNKNOWN.md#u-s044)

<a id="s045"></a>

## S045 — 읽기 기록 빈 상태

안정 원본 ID: `sc_3ab5043fa7b649908c6dde30faf290ab` · [원본 분석](<../../medium/flows/Home/Refine recommendations/Reading history/Clearing history/ANALYSIS.md>):84 · [원본 PNG](<../../medium/flows/Home/Refine recommendations/Reading history/Clearing history/screens/02_sc_3ab5043fa7b649908c6dde30faf290ab.png>)

흐름 맥락: [F15/02](FLOWS.md#f15)

FE 조사 경로: [ReadingHistoryList.tsx](<../../FE/src/features/reading-history/ReadingHistoryList.tsx>)

기본 담당: [G31](CONTRACTS.md#g31) · 실행 작업: [V12](../FE_MEDIUM_PARITY_BACKLOG.md#v12)

**화면별 수용 조건:** 전체 Clear history와 개별 휴지통을 분리하고 빈 상태 Explore·목록 스크롤을 확인한다. 발행일을 읽은 시각으로 바꾸지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 이력Clear후빈상태·Explore 진입/취소 대조.48버튼·서체/여백차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):239)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Explore

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s045-l"></a>`R-S045-L` | 배치: Reading history 탭 내 안내 카드 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V12](../FE_MEDIUM_PARITY_BACKLOG.md#v12) |
| <a id="r-s045-d"></a>`R-S045-D` | 표시값·입력: 읽은 글이 없다는 문구 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V12](../FE_MEDIUM_PARITY_BACKLOG.md#v12) |
| <a id="r-s045-s"></a>`R-S045-S` | 상태: 기록 목록 없음 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G31](CONTRACTS.md#g31), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V12](../FE_MEDIUM_PARITY_BACKLOG.md#v12) |
| <a id="r-s045-c01"></a>`R-S045-C01` | 컨트롤: Explore | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G31](CONTRACTS.md#g31), [G50](CONTRACTS.md#g50) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V12](../FE_MEDIUM_PARITY_BACKLOG.md#v12) |


원본 해석 경계: Clear history 이전에는 목록과 개별 휴지통이 있었고 이후에는 Explore로 복귀를 유도하는 빈 상태가 보인다. 중간 확인창·완료 토스트는 수록되지 않았다.

미확인 사항: [U-S045](UNKNOWN.md#u-s045)

<a id="s046"></a>

## S046 — 음성 선택 목록
- **Parity12 최신:** [요구별 상태·검사·잔여](../FE_MEDIUM_PARITY_12_RESULT.md#screen-status). Emma·검색·국기/이름/성별/국가와 선택/실패 확인. 실제 음성·언어와 원본 검색 결과 미확인. 원본 관찰/기존 증거는 보존하며 새 실제 렌더 비교 완료가 아니다.


안정 원본 ID: `sc_3b3db04094fe4a189b31e66c28971bcd` · [원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>):118 · [원본 PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/03_sc_3b3db04094fe4a189b31e66c28971bcd.png>)

흐름 맥락: [F28/03](FLOWS.md#f28)

FE 조사 경로: [ListeningSpeedPanel.tsx](<../../FE/src/features/listening/ListeningSpeedPanel.tsx>), [ListeningVoicePanel.tsx](<../../FE/src/features/listening/ListeningVoicePanel.tsx>)

기본 담당: [G46](CONTRACTS.md#g46) · 실행 작업: [V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19)

**화면별 수용 조건:** 세로 slider·1x/200 WPM·2.5x/490 WPM·145% 문구, voice 언어 section/국기/성별/나라/선택색, Emma→Hans와 Done, 더보기6행을 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Emma 선택/후보 그룹/검색 일치; 아이콘 벡터/폰트 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):240)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 검색, 음성 행, Done

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s046-l"></a>`R-S046-L` | 배치: 검색·FEATURED·ENGLISH 섹션과 국기·이름·성별·국가 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G46](CONTRACTS.md#g46), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s046-d"></a>`R-S046-D` | 표시값·입력: Emma 선택, Matthew·Salli 등 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G46](CONTRACTS.md#g46), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s046-s"></a>`R-S046-S` | 상태: Emma가 현재 선택된 음성 목록. 모든 계정의 기본 음성이라는 의미는 아니다. | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G46](CONTRACTS.md#g46), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s046-c01"></a>`R-S046-C01` | 컨트롤: 검색 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G46](CONTRACTS.md#g46) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s046-c02"></a>`R-S046-C02` | 컨트롤: 음성 행 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G46](CONTRACTS.md#g46) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s046-c03"></a>`R-S046-C03` | 컨트롤: Done | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G46](CONTRACTS.md#g46) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |


원본 해석 경계: 음성마다 이름·성별 표기·국가를 보여주고 Featured와 English 섹션으로 나눈다. 검색창은 있으나 음성 검색어 입력·빈 결과는 미수록이다.

미확인 사항: [U-S046](UNKNOWN.md#u-s046)

<a id="s047"></a>

## S047 — 프로필 소개·사진·대명사 표시

안정 원본 ID: `sc_3cd0855e78a84d4ea413f0e5b3dffb73` · [원본 분석](<../../medium/flows/Profile/ANALYSIS.md>):209 · [원본 PNG](<../../medium/flows/Profile/screens/06_sc_3cd0855e78a84d4ea413f0e5b3dffb73.png>)

흐름 맥락: [F55/06](FLOWS.md#f55), [F57/08](FLOWS.md#f57)

FE 조사 경로: [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>)

기본 담당: [G42](CONTRACTS.md#g42) · 실행 작업: [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32)

**화면별 수용 조건:** Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 이름/pronouns/bio확정 About표시. 검증용기존자산사진과 원본사용자사진 다름, Continue setup및서체 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):241)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** View stats, Edit your profile, 설정

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s047-l"></a>`R-S047-L` | 배치: 프로필 아바타·이름 옆 he/him·About 본문 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s047-d"></a>`R-S047-D` | 표시값·입력: Curious mind sharing thoughts one story at a time | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s047-s"></a>`R-S047-S` | 상태: 프로필 정보 반영 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s047-c01"></a>`R-S047-C01` | 컨트롤: View stats | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42), [G43](CONTRACTS.md#g43) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s047-c02"></a>`R-S047-C02` | 컨트롤: Edit your profile | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s047-c03"></a>`R-S047-C03` | 컨트롤: 설정 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S047](UNKNOWN.md#u-s047)

<a id="s048"></a>

## S048 — 작가 프로필 Stories

안정 원본 ID: `sc_3de359a1c13340968c4b733188faa6d1` · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/ANALYSIS.md>):86 · [원본 PNG](<../../medium/flows/Home/Story detail/Author detail/screens/02_sc_3de359a1c13340968c4b733188faa6d1.png>)

흐름 맥락: [F17/02](FLOWS.md#f17), [F18/01](FLOWS.md#f18), [F19/01](FLOWS.md#f19), [F21/01](FLOWS.md#f21), [F22/01](FLOWS.md#f22), [F23/01](FLOWS.md#f23)

FE 조사 경로: [PublicIdentityScreen.tsx](<../../FE/src/features/community/PublicIdentityScreen.tsx>), [FollowControl.tsx](<../../FE/src/features/community/FollowControl.tsx>), [ConnectionsScreen.tsx](<../../FE/src/features/community/ConnectionsScreen.tsx>)

기본 담당: [G28](CONTRACTS.md#g28) · 실행 작업: [V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14)

**화면별 수용 조건:** Stories/Lists/About, Pinned, member/Friend 시작 월, Follow 성공·메뉴·해제 토스트, Email on/off, 작가와 publication 관계 목록을 각각 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 작성자Stories/pinned/Follow·관계숫자 대조. 제목폭/그림crop·실제반응수 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):242)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Follow, Stories, Lists, About, 더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s048-l"></a>`R-S048-L` | 배치: 프로필·관계 집계·Friend 배지·팔로우 버튼·탭 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G28](CONTRACTS.md#g28), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s048-d"></a>`R-S048-D` | 표시값·입력: Jordan Gibbs, 10.2K followers·25 following | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G28](CONTRACTS.md#g28), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s048-s"></a>`R-S048-S` | 상태: 고정 글 Pinned 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G28](CONTRACTS.md#g28), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s048-c01"></a>`R-S048-C01` | 컨트롤: Follow | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s048-c02"></a>`R-S048-C02` | 컨트롤: Stories | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s048-c03"></a>`R-S048-C03` | 컨트롤: Lists | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s048-c04"></a>`R-S048-C04` | 컨트롤: About | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s048-c05"></a>`R-S048-C05` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S048](UNKNOWN.md#u-s048)

<a id="s049"></a>

## S049 — 작가 팔로우 성공과 알림 메뉴

안정 원본 ID: `sc_3ecf6d2988a6418fa4d2006fa4497b23` · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/Following an author/ANALYSIS.md>):85 · [원본 PNG](<../../medium/flows/Home/Story detail/Author detail/Following an author/screens/02_sc_3ecf6d2988a6418fa4d2006fa4497b23.png>)

흐름 맥락: [F19/02](FLOWS.md#f19)

FE 조사 경로: [PublicIdentityScreen.tsx](<../../FE/src/features/community/PublicIdentityScreen.tsx>), [FollowControl.tsx](<../../FE/src/features/community/FollowControl.tsx>), [ConnectionsScreen.tsx](<../../FE/src/features/community/ConnectionsScreen.tsx>)

기본 담당: [G28](CONTRACTS.md#g28) · 실행 작업: [V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14)

**화면별 수용 조건:** Stories/Lists/About, Pinned, member/Friend 시작 월, Follow 성공·메뉴·해제 토스트, Email on/off, 작가와 publication 관계 목록을 각각 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Follow성공·관계메뉴. 자체정책Email기본off는 원본on과다르며자동구독하지않음; toast줄바꿈/blur차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):243)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Email notifications on/off, Unfollow

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s049-l"></a>`R-S049-L` | 배치: 성공 토스트 위에 Following 메뉴 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G28](CONTRACTS.md#g28), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s049-d"></a>`R-S049-D` | 표시값·입력: Email notifications on 체크 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G28](CONTRACTS.md#g28), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s049-s"></a>`R-S049-S` | 상태: 팔로우 성공 안내 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G28](CONTRACTS.md#g28), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s049-c01"></a>`R-S049-C01` | 컨트롤: Email notifications on | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s049-c02"></a>`R-S049-C02` | 컨트롤: Email notifications off | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s049-c03"></a>`R-S049-C03` | 컨트롤: Unfollow | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s049-c04"></a>`R-S049-C04` | 컨트롤: Following 메뉴 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |


원본 해석 경계: 성공 토스트와 함께 이메일 알림 On이 체크된 메뉴가 열려 있다. 이것이 모든 신규 팔로우의 기본값인지, 기존 사용자 설정이 반영된 것인지는 미확인이다.

미확인 사항: [U-S049](UNKNOWN.md#u-s049)

<a id="s050"></a>

## S050 — 미니 플레이어 재생 상태
- **Parity12 최신:** [요구별 상태·검사·잔여](../FE_MEDIUM_PARITY_12_RESULT.md#screen-status). 상단/미니 pause·close·확장과 최신 상태 toggle 검증. Mock 안내·높이/긴 제목 시각 잔여. 원본 관찰/기존 증거는 보존하며 새 실제 렌더 비교 완료가 아니다.


안정 원본 ID: `sc_40448a752ea64391a724af01b1e050f1` · [원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/ANALYSIS.md>):117 · [원본 PNG](<../../medium/flows/Home/Story detail/Listening to a story/screens/03_sc_40448a752ea64391a724af01b1e050f1.png>)

흐름 맥락: [F26/03](FLOWS.md#f26)

FE 조사 경로: [ListeningPlayer.tsx](<../../FE/src/features/listening/ListeningPlayer.tsx>)

기본 담당: [G45](CONTRACTS.md#g45) · 실행 작업: [V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18)

**화면별 수용 조건:** 준비 중 두 spinner, mini/expanded 동일 기사, 커버·배경·시간·진행선·10초/30초·희미한 이전/다음·닫기·Speechify 표시를 비교한다. 무음 timer는 실제 재생과 구분한다. Q12에서 미니/확장 플레이어의 모의 안내가 원본 배치에 미치는 영향을 판정한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 미니 플레이어 재생 상태와 연동, Mock 문구/현재 응답7은 자체 데이터. ([과거 기록](<../FE_GOAL_53_RESULT.md>):244)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 일시정지, 닫기, 플레이어 확장 영역

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s050-l"></a>`R-S050-L` | 배치: 상단 및 미니 플레이어 일시정지 아이콘 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G45](CONTRACTS.md#g45), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s050-d"></a>`R-S050-D` | 표시값·입력: 동일 기사 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G45](CONTRACTS.md#g45), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s050-s"></a>`R-S050-S` | 상태: 재생 중을 나타내는 UI | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G45](CONTRACTS.md#g45), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s050-c01"></a>`R-S050-C01` | 컨트롤: 일시정지 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s050-c02"></a>`R-S050-C02` | 컨트롤: 닫기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s050-c03"></a>`R-S050-C03` | 컨트롤: 플레이어 확장 영역 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S050](UNKNOWN.md#u-s050)
