# 화면별 원본 요구사항

[검토 요약](../FE_MEDIUM_PARITY_AUDIT.md) · [보완 작업](../FE_MEDIUM_PARITY_BACKLOG.md) · [계약 원문](CONTRACTS.md) · [흐름 맥락](FLOWS.md) · [미확인 항목](UNKNOWN.md)

이번 목록은 원본에서 추출한 **관찰 요구사항**이다. L=배치, D=표시값/입력, S=상태, C=컨트롤, V=PNG 추가 세부 관찰이다. L/D/S는 원문 한 문장의 모든 요소를 포함하는 묶음이며 단일 버튼 수가 아니다. C는 명시적으로 나눈 조작점이다. 이 숫자를 기능 완성률의 분모로 사용하지 않는다.

`포함`은 기능 작업 범위에 있다는 판정이며 현재 FE 동일 재현 완료라는 뜻이 아니다. `일부 포함`은 공통/상위 계약은 있지만 개별 조건이 분산된 경우다. 코드 링크는 구현 조사 위치이며 자동으로 해당 요구의 통과를 증명하지 않는다. 과거 Goal53 판정은 당시 증거이고 현재 재촬영 결과가 아니다. 모든 행의 완료 조건은 해당 원본 PNG의 데이터·상태를 맞춘 비교와 FLOWS의 진입/복귀 검증을 함께 적용한다.


<a id="s126"></a>

## S126 — 본문 이미지 로딩

안정 원본 ID: `sc_ae30c2a2ca504522b03f98f11d59c429` · [원본 분석](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>):214 · [원본 PNG](<../../medium/flows/Home/Publishing a story/screens/06_sc_ae30c2a2ca504522b03f98f11d59c429.png>)

흐름 맥락: [F08/06](FLOWS.md#f08)

FE 조사 경로: [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>), [ImagePickerSheet.tsx](<../../FE/src/features/editor/ImagePickerSheet.tsx>)

기본 담당: [G37](CONTRACTS.md#g37) · 실행 작업: [V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08)

**화면별 수용 조건:** 사진 소스 시트, Unsplash 2열 가변 높이와 작가 표시, 준비 중 덮개·스피너·녹색 테두리·X, 삽입 후 키보드 상태를 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 실제 pending prepare 프레임 촬영. spinner가 이미지 아래 있던 결함을 검은 overlay 중앙으로 수정. 로컬 사진 비율/OS 키보드 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):320)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 사진 우상단 X, 서식 도구, Next

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s126-l"></a>`R-S126-L` | 배치: 본문 아래 사진 위 어두운 덮개·스피너·녹색 선택 테두리 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G37](CONTRACTS.md#g37), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08) |
| <a id="r-s126-d"></a>`R-S126-D` | 표시값·입력: 사진 블록 선택 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G37](CONTRACTS.md#g37), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08) |
| <a id="r-s126-s"></a>`R-S126-S` | 상태: 이미지 삽입 처리 중 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G37](CONTRACTS.md#g37), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08) |
| <a id="r-s126-c01"></a>`R-S126-C01` | 컨트롤: 사진 우상단 X | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G37](CONTRACTS.md#g37) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08) |
| <a id="r-s126-c02"></a>`R-S126-C02` | 컨트롤: 서식 도구 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G37](CONTRACTS.md#g37) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08) |
| <a id="r-s126-c03"></a>`R-S126-C03` | 컨트롤: Next | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G37](CONTRACTS.md#g37), [G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S126](UNKNOWN.md#u-s126)

<a id="s127"></a>

## S127 — 신고 사유 선택 완료

안정 원본 ID: `sc_af0ecdded03643ca8cea85ec5341d906` · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/Reporting an author/ANALYSIS.md>):147 · [원본 PNG](<../../medium/flows/Home/Story detail/Author detail/Reporting an author/screens/04_sc_af0ecdded03643ca8cea85ec5341d906.png>)

흐름 맥락: [F23/04](FLOWS.md#f23)

FE 조사 경로: [ModerationDialogs.tsx](<../../FE/src/features/moderation/ModerationDialogs.tsx>), [articleModeration.ts](<../../FE/src/features/moderation/articleModeration.ts>)

기본 담당: [G29](CONTRACTS.md#g29) · 실행 작업: [V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15)

**화면별 수용 조건:** 메뉴 순서·파랑/빨강·Cancel, 성공 토스트, 신고 radio와 Also block checkbox, 사유 전후 Report 상태를 비교한다. 차단 후 원본 카드 잔존과 자체 접근 제한의 충돌을 기록한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Spam선택/Report가능/AlsoBlock미선택. 실제명령실패복구는기존테스트, 별도설명·mock표시차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):321)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Report 활성

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s127-l"></a>`R-S127-L` | 배치: Spam 라디오 선택, 하단 빨간 버튼 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G29](CONTRACTS.md#g29), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s127-d"></a>`R-S127-D` | 표시값·입력: Spam 선택·차단 미체크 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G29](CONTRACTS.md#g29), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s127-s"></a>`R-S127-S` | 상태: 신고 제출 준비 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G29](CONTRACTS.md#g29), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s127-c01"></a>`R-S127-C01` | 컨트롤: Report 활성 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |


원본 해석 경계: Spam 선택 후에도 Also block this user는 미체크다. 이후 성공 화면을 신고와 차단이 모두 실행된 결과로 해석하지 않는다.

미확인 사항: [U-S127](UNKNOWN.md#u-s127)

<a id="s128"></a>

## S128 — 오디오 로딩

안정 원본 ID: `sc_b43c7474098746baa684870217c28927` · [원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/ANALYSIS.md>):87 · [원본 PNG](<../../medium/flows/Home/Story detail/Listening to a story/screens/02_sc_b43c7474098746baa684870217c28927.png>)

흐름 맥락: [F26/02](FLOWS.md#f26)

FE 조사 경로: [ListeningPlayer.tsx](<../../FE/src/features/listening/ListeningPlayer.tsx>)

기본 담당: [G45](CONTRACTS.md#g45) · 실행 작업: [V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18)

**화면별 수용 조건:** 준비 중 두 spinner, mini/expanded 동일 기사, 커버·배경·시간·진행선·10초/30초·희미한 이전/다음·닫기·Speechify 표시를 비교한다. 무음 timer는 실제 재생과 구분한다. Q12에서 미니/확장 플레이어의 모의 안내가 원본 배치에 미치는 영향을 판정한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 실제 mock 준비중. native spinner 모양/로딩 이미지 도착 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):322)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 미니 플레이어 닫기 X

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s128-l"></a>`R-S128-L` | 배치: 기사 상단과 하단 미니 플레이어에 스피너 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G45](CONTRACTS.md#g45), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s128-d"></a>`R-S128-D` | 표시값·입력: 작가·기사 제목·커버 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G45](CONTRACTS.md#g45), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s128-s"></a>`R-S128-S` | 상태: 오디오 준비 중 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G45](CONTRACTS.md#g45), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s128-c01"></a>`R-S128-C01` | 컨트롤: 미니 플레이어 닫기 X | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S128](UNKNOWN.md#u-s128)

<a id="s129"></a>

## S129 — 월간 멤버십 선택

안정 원본 ID: `sc_b4e85416681544c9b996826eefa22432` · [원본 분석](<../../medium/flows/Onboarding/ANALYSIS.md>):397 · [원본 PNG](<../../medium/flows/Onboarding/screens/12_sc_b4e85416681544c9b996826eefa22432.png>)

흐름 맥락: [F53/12](FLOWS.md#f53), [F54/01](FLOWS.md#f54)

FE 조사 경로: [MembershipSheet.tsx](<../../FE/src/features/membership/MembershipSheet.tsx>)

기본 담당: [G48](CONTRACTS.md#g48) · 실행 작업: [V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31)

**화면별 수용 조건:** 월/년 선택, SGD 가격·Save up to $39·혜택·Friend 카드, loading 덮개, 성공 팝업 OK와Start reading을 비교한다. 실제 구매 완료로 표시하지 않는다. Q12에서 모의 결제 안내의 노출·배치 차이를 함께 판정한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Monthly/Member 선택화면. A기본Member라 Current plan표시; 실제 결제 원본Select와 다른 확정 계정 상태. ([과거 기록](<../FE_GOAL_53_RESULT.md>):323)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Pay monthly, Pay annually, Select, 닫기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s129-l"></a>`R-S129-L` | 배치: 닫기 가능한 시트, 결제 주기 탭과 Member 카드 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G48](CONTRACTS.md#g48), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="r-s129-d"></a>`R-S129-D` | 표시값·입력: Pay monthly 선택. 캡처 금액 $6.98 SGD/month | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G48](CONTRACTS.md#g48), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="r-s129-s"></a>`R-S129-S` | 상태: 월간 플랜 소개와 혜택 목록 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G48](CONTRACTS.md#g48), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="r-s129-c01"></a>`R-S129-C01` | 컨트롤: Pay monthly | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G48](CONTRACTS.md#g48) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="r-s129-c02"></a>`R-S129-C02` | 컨트롤: Pay annually | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G48](CONTRACTS.md#g48) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="r-s129-c03"></a>`R-S129-C03` | 컨트롤: Select | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G48](CONTRACTS.md#g48) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="r-s129-c04"></a>`R-S129-C04` | 컨트롤: 닫기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G48](CONTRACTS.md#g48) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |


원본 해석 경계: 연간 옵션 안내는 Save up to $39이다. 39% 할인이 아니며 월간 SGD 표기와 별개로 기호 $의 통화를 추가 확정하지 않는다. 닫기 X로 이탈할 수 있는 UI가 보인다.

미확인 사항: [U-S129](UNKNOWN.md#u-s129)

<a id="s130"></a>

## S130 — 팔로우 해제 안내

안정 원본 ID: `sc_b606d8b25cf248c28200cbfd24da865f` · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/Following an author/Unfollowing an author/ANALYSIS.md>):83 · [원본 PNG](<../../medium/flows/Home/Story detail/Author detail/Following an author/Unfollowing an author/screens/02_sc_b606d8b25cf248c28200cbfd24da865f.png>)

흐름 맥락: [F20/02](FLOWS.md#f20)

FE 조사 경로: [PublicIdentityScreen.tsx](<../../FE/src/features/community/PublicIdentityScreen.tsx>), [FollowControl.tsx](<../../FE/src/features/community/FollowControl.tsx>), [ConnectionsScreen.tsx](<../../FE/src/features/community/ConnectionsScreen.tsx>)

기본 담당: [G28](CONTRACTS.md#g28) · 실행 작업: [V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14)

**화면별 수용 조건:** Stories/Lists/About, Pinned, member/Friend 시작 월, Follow 성공·메뉴·해제 토스트, Email on/off, 작가와 publication 관계 목록을 각각 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Unfollow성공안내·다시Follow가능. toast폭/원본글반응수차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):324)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Follow

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s130-l"></a>`R-S130-L` | 배치: 검정 토스트와 Follow 버튼 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G28](CONTRACTS.md#g28), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s130-d"></a>`R-S130-D` | 표시값·입력: You unfollowed Jordan Gibbs | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G28](CONTRACTS.md#g28), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s130-s"></a>`R-S130-S` | 상태: 해제 성공 안내 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G28](CONTRACTS.md#g28), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="r-s130-c01"></a>`R-S130-C01` | 컨트롤: Follow | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S130](UNKNOWN.md#u-s130)

<a id="s131"></a>

## S131 — 재생 속도 2.5배 선택

안정 원본 ID: `sc_b6f46f91fdc549b790b4e9c1a434afae` · [원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/ANALYSIS.md>):116 · [원본 PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/screens/03_sc_b6f46f91fdc549b790b4e9c1a434afae.png>)

흐름 맥락: [F27/03](FLOWS.md#f27)

FE 조사 경로: [ListeningSpeedPanel.tsx](<../../FE/src/features/listening/ListeningSpeedPanel.tsx>), [ListeningVoicePanel.tsx](<../../FE/src/features/listening/ListeningVoicePanel.tsx>)

기본 담당: [G46](CONTRACTS.md#g46) · 실행 작업: [V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19)

**화면별 수용 조건:** 세로 slider·1x/200 WPM·2.5x/490 WPM·145% 문구, voice 언어 section/국기/성별/나라/선택색, Emma→Hans와 Done, 더보기6행을 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 2.5x490WPM/145%표시 일치. 웹 키보드 focus outline은 현재 입력 조건. ([과거 기록](<../FE_GOAL_53_RESULT.md>):325)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 슬라이더, Done

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s131-l"></a>`R-S131-L` | 배치: 슬라이더 손잡이 위로 이동 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G46](CONTRACTS.md#g46), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s131-d"></a>`R-S131-D` | 표시값·입력: 2.5x, 490 WPM, 145% productivity boost | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G46](CONTRACTS.md#g46), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s131-s"></a>`R-S131-S` | 상태: 변경값 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G46](CONTRACTS.md#g46), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s131-c01"></a>`R-S131-C01` | 컨트롤: 슬라이더 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G46](CONTRACTS.md#g46) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="r-s131-c02"></a>`R-S131-C02` | 컨트롤: Done | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G46](CONTRACTS.md#g46) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |


원본 해석 경계: 2.5x 옆 490 WPM은 1x의 200 WPM을 단순 2.5배 한 값과 다르다. 표시값을 그대로 기록하고 정확한 계산식·생산성 향상 효과로 확정하지 않는다.

미확인 사항: [U-S131](UNKNOWN.md#u-s131)

<a id="s132"></a>

## S132 — Digest 일자별 추천

안정 원본 ID: `sc_bafbf7b80b154e25aec15e120a13f72a` · [원본 분석](<../../medium/flows/Library/ANALYSIS.md>):147 · [원본 PNG](<../../medium/flows/Library/screens/04_sc_bafbf7b80b154e25aec15e120a13f72a.png>)

흐름 맥락: [F41/04](FLOWS.md#f41), [F43/01](FLOWS.md#f43), [F44/01](FLOWS.md#f44)

FE 조사 경로: [DigestPanel.tsx](<../../FE/src/features/digest/DigestPanel.tsx>), [NotificationSettingsScreen.tsx](<../../FE/src/features/notifications/NotificationSettingsScreen.tsx>), [LibraryScreen.tsx](<../../FE/src/features/bookmarks/LibraryScreen.tsx>), [IdentityLink.tsx](<../../FE/src/features/community/IdentityLink.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>), [ResponseButton.tsx](<../../FE/src/features/responses/ResponseButton.tsx>)

기본 담당: [G34](CONTRACTS.md#g34) · 실행 작업: [V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27)

**화면별 수용 조건:** June12→June8의 임시 radio/Done·확정 날짜·바뀐 기사, last10 안내와 제목/카드 반응/저장을 비교한다. 날짜10일과 발행10개를 구분한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. June12 Digest 선택·제목·첫 글 대조. 커버 crop/반응 실제 수치/회원 표시 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):326)

**현재 판정 — Parity 6:** [이번 실행](../FE_MEDIUM_PARITY_06_RESULT.md). June12 Kris Gage·3분·회원용 별·날짜/설정·기사 행동을 확인했다. 원본158K/1.3K와 현재 mock157K/0의 차이는 보존한다. 기능 mock 검증과 시각 차이·U/native 대기를 구분하며 전체 동일성은 미완료다. 사용자 지시로 캡처 파일은 저장하지 않았다. 아래 개별 행은 최초 조사 이력이며 이번 판정은 이 문단과 결과 문서를 따른다.

**원본 컨트롤 관찰 문장:** 날짜 필터, 설정, 기사 저장·더보기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s132-l"></a>`R-S132-L` | 배치: Digest 탭·날짜 선택·설정·Today's highlights | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s132-d"></a>`R-S132-D` | 표시값·입력: June 12 2025 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s132-s"></a>`R-S132-S` | 상태: 특정 날짜 다이제스트 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s132-c01"></a>`R-S132-C01` | 컨트롤: 날짜 필터 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s132-c02"></a>`R-S132-C02` | 컨트롤: 설정 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G34](CONTRACTS.md#g34), [G44](CONTRACTS.md#g44) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s132-c03"></a>`R-S132-C03` | 컨트롤: 기사 저장 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s132-c04"></a>`R-S132-C04` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29), [G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s132-v"></a>`R-S132-V` | PNG 추가 세부 관찰: 첫 Digest 기사에는 멤버 별·3 min read·박수158K·응답1.3K·북마크+·더보기가 같은 행에 보인다. 표시 조건을 맞추어 비교하며 운영 값을 정적으로 덮지 않는다. | 일부 포함: 공통 시각 계약에 포함되나 이 요소 묶음의 독립 판정 필요<br>[G23](CONTRACTS.md#g23), [G34](CONTRACTS.md#g34), [G53](CONTRACTS.md#g53) | 구현 차이 확인: memberOnly=true인 medium-love에도 DigestStory의 회원용 글 별표 분기가 없음<br>[D11](../FE_MEDIUM_PARITY_BACKLOG.md#d11) |
| <a id="r-s132-c05"></a>`R-S132-C05` | 컨트롤(PNG 재확인): 기사 박수158K | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G34](CONTRACTS.md#g34) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s132-c06"></a>`R-S132-C06` | 컨트롤(PNG 재확인): 기사 응답1.3K | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26), [G34](CONTRACTS.md#g34) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s132-c07"></a>`R-S132-C07` | 컨트롤(PNG 재확인): Kris Gage 작성자 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28), [G34](CONTRACTS.md#g34) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s132-c08"></a>`R-S132-C08` | 컨트롤(PNG 재확인): How to *really* know you’re in love 기사 열기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G34](CONTRACTS.md#g34) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="r-s132-c09"></a>`R-S132-C09` | 컨트롤(PNG 재확인): New list | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G33](CONTRACTS.md#g33), [G34](CONTRACTS.md#g34) | 공통 연결 구조 확인 / 원본 fixture·이번 UI 동일성 미검증<br>[V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S132](UNKNOWN.md#u-s132)

<a id="s133"></a>

## S133 — 구매 성공 안내 팝업

안정 원본 ID: `sc_bb00623f121d405abc840e589837c3fd` · [원본 분석](<../../medium/flows/Onboarding/Subscribing to Medium/ANALYSIS.md>):149 · [원본 PNG](<../../medium/flows/Onboarding/Subscribing to Medium/screens/04_sc_bb00623f121d405abc840e589837c3fd.png>)

흐름 맥락: [F54/04](FLOWS.md#f54)

FE 조사 경로: [MembershipSheet.tsx](<../../FE/src/features/membership/MembershipSheet.tsx>)

기본 담당: [G48](CONTRACTS.md#g48) · 실행 작업: [V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31)

**화면별 수용 조건:** 월/년 선택, SGD 가격·Save up to $39·혜택·Friend 카드, loading 덮개, 성공 팝업 OK와Start reading을 비교한다. 실제 구매 완료로 표시하지 않는다. Q12에서 모의 결제 안내의 노출·배치 차이를 함께 판정한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 모의확정 성공dialog. 원본 purchase문구를 mock membership문구로 구분; OSdialog대비앱레이어 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):327)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** You're all set / Your purchase was successful, OK

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s133-l"></a>`R-S133-L` | 배치: 플랜 시트 위 iOS 형식 중앙 알림 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G48](CONTRACTS.md#g48), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="r-s133-d"></a>`R-S133-D` | 표시값·입력: 입력 없음 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G48](CONTRACTS.md#g48), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="r-s133-s"></a>`R-S133-S` | 상태: 캡처에 구매 성공 메시지 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G48](CONTRACTS.md#g48), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="r-s133-c01"></a>`R-S133-C01` | 컨트롤: OK | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G48](CONTRACTS.md#g48) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S133](UNKNOWN.md#u-s133)

<a id="s134"></a>

## S134 — 로그인 인증 코드 입력

안정 원본 ID: `sc_bc8c0aff71644874a42b97e6c7fd4ce2` · [원본 분석](<../../medium/flows/Logging in/ANALYSIS.md>):211 · [원본 PNG](<../../medium/flows/Logging in/screens/06_sc_bc8c0aff71644874a42b97e6c7fd4ce2.png>)

흐름 맥락: [F52/06](FLOWS.md#f52)

FE 조사 경로: [AuthDialogs.tsx](<../../FE/src/features/auth/AuthDialogs.tsx>), [EmailLogin.tsx](<../../FE/src/features/auth/EmailLogin.tsx>), [createEmailAttempt.ts](<../../FE/src/features/auth/createEmailAttempt.ts>)

기본 담당: [G40](CONTRACTS.md#g40) · 실행 작업: [V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29)

**화면별 수용 조건:** 가입4/로그인5 제공자, 이메일/이름/약관/뒤로·6칸 코드와Validate·Resend·닫기, Sign out Cancel/Confirm→intro를 비교한다. 빈 폼의 녹색 버튼과 실제 입력 검증은 별개다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 모의6자리 코드123456/Validate 가능. 원본 인증코드를 사용하지 않음; 뒤로/모의 안내 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):328)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Validate 활성, Resend code, 닫기

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s134-l"></a>`R-S134-L` | 배치: Check your inbox 시트·6칸 코드·하단 행동 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s134-d"></a>`R-S134-D` | 표시값·입력: 6자리 코드 채워짐. 인증값은 문서에 재기록하지 않음 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s134-s"></a>`R-S134-S` | 상태: 이메일 코드 검증 준비 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G40](CONTRACTS.md#g40), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s134-c01"></a>`R-S134-C01` | 컨트롤: Validate 활성 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s134-c02"></a>`R-S134-C02` | 컨트롤: Resend code | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="r-s134-c03"></a>`R-S134-C03` | 컨트롤: 닫기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |


원본 해석 경계: 코드가 채워진 로그인 화면의 안내는 to sign in이다. 같은 흐름의 앞선 빈 코드 화면은 to sign up이므로 문구 불일치를 명시한다. 코드 입력 완료 자체가 검증 성공은 아니며 후속 Home 캡처와 구분한다.

미확인 사항: [U-S134](UNKNOWN.md#u-s134)

<a id="s135"></a>

## S135 — 큐레이션 리스트 하단

안정 원본 ID: `sc_bd0cb76562a74fb69a3569e15daf02ee` · [원본 분석](<../../medium/flows/Explore/Topic detail/Browse curated list/ANALYSIS.md>):178 · [원본 PNG](<../../medium/flows/Explore/Topic detail/Browse curated list/screens/05_sc_bd0cb76562a74fb69a3569e15daf02ee.png>)

흐름 맥락: [F04/05](FLOWS.md#f04)

FE 조사 경로: [PublicListScreen.tsx](<../../FE/src/features/public-lists/PublicListScreen.tsx>), [SavePublicListControl.tsx](<../../FE/src/features/public-lists/SavePublicListControl.tsx>), [PublicListStoryCard.tsx](<../../FE/src/features/public-lists/PublicListStoryCard.tsx>), [ArticleBookmarkControl.tsx](<../../FE/src/features/bookmarks/ArticleBookmarkControl.tsx>)

기본 담당: [G32](CONTRACTS.md#g32) · 실행 작업: [V04](../FE_MEDIUM_PARITY_BACKLOG.md#v04)

**화면별 수용 조건:** 목록 전체 Save와 개별 기사 저장, 목록 박수·응답·Share를 구분한다. 8 stories/108 saves와 98 claps/1 response는 비교 화면 데이터이며 현재 사용자 수를 위조하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 하단 스크롤 실패였던 촬영을 실제 footer align으로 수정. 접힌 제목14·More 제목16·소개13으로 조정. 5/8안내 및 48터치 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):329)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Follow, 저장, 박수·응답·공유

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s135-l"></a>`R-S135-L` | 배치: 후반 기사와 More from Medium Staff | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G32](CONTRACTS.md#g32), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V04](../FE_MEDIUM_PARITY_BACKLOG.md#v04) |
| <a id="r-s135-d"></a>`R-S135-D` | 표시값·입력: 리스트 제목 상단 고정 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G32](CONTRACTS.md#g32), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V04](../FE_MEDIUM_PARITY_BACKLOG.md#v04) |
| <a id="r-s135-s"></a>`R-S135-S` | 상태: 목록 말미 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G32](CONTRACTS.md#g32), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V04](../FE_MEDIUM_PARITY_BACKLOG.md#v04) |
| <a id="r-s135-c01"></a>`R-S135-C01` | 컨트롤: Follow | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G28](CONTRACTS.md#g28), [G32](CONTRACTS.md#g32) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V04](../FE_MEDIUM_PARITY_BACKLOG.md#v04) |
| <a id="r-s135-c02"></a>`R-S135-C02` | 컨트롤: 저장 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G32](CONTRACTS.md#g32) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V04](../FE_MEDIUM_PARITY_BACKLOG.md#v04) |
| <a id="r-s135-c03"></a>`R-S135-C03` | 컨트롤: 박수 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G32](CONTRACTS.md#g32) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V04](../FE_MEDIUM_PARITY_BACKLOG.md#v04) |
| <a id="r-s135-c04"></a>`R-S135-C04` | 컨트롤: 응답 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G32](CONTRACTS.md#g32) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V04](../FE_MEDIUM_PARITY_BACKLOG.md#v04) |
| <a id="r-s135-c05"></a>`R-S135-C05` | 컨트롤: 공유 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G32](CONTRACTS.md#g32), [G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V04](../FE_MEDIUM_PARITY_BACKLOG.md#v04) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S135](UNKNOWN.md#u-s135)

<a id="s136"></a>

## S136 — 프로필 편집 결과

안정 원본 ID: `sc_be99c4fdcf634190a324ec9820a84f43` · [원본 분석](<../../medium/flows/Profile/Editing profile information/ANALYSIS.md>):241 · [원본 PNG](<../../medium/flows/Profile/Editing profile information/screens/07_sc_be99c4fdcf634190a324ec9820a84f43.png>)

흐름 맥락: [F57/07](FLOWS.md#f57)

FE 조사 경로: [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>)

기본 담당: [G42](CONTRACTS.md#g42) · 실행 작업: [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32)

**화면별 수용 조건:** Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 사진/pronouns저장 후 동일userIDStories복귀. 당시 written row 반응 연결/이미지 차이가 있었다. 반응 연결의 현재 상태는 후속 결과를 따른다. Continue setup/Drafts는 자체 보완이다. ([과거 기록](<../FE_GOAL_53_RESULT.md>):330)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Edit your profile, View stats

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s136-l"></a>`R-S136-L` | 배치: 프로필 사진·he/him 표시·Stories | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s136-d"></a>`R-S136-D` | 표시값·입력: 이름·기사 유지 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s136-s"></a>`R-S136-S` | 상태: 사진·대명사 반영 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s136-c01"></a>`R-S136-C01` | 컨트롤: Edit your profile | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s136-c02"></a>`R-S136-C02` | 컨트롤: View stats | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42), [G43](CONTRACTS.md#g43) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S136](UNKNOWN.md#u-s136)

<a id="s137"></a>

## S137 — 이미지 삽입 후 편집기

안정 원본 ID: `sc_bed3857c8edc4a02b07af1e095ad7fba` · [원본 분석](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>):244 · [원본 PNG](<../../medium/flows/Home/Publishing a story/screens/07_sc_bed3857c8edc4a02b07af1e095ad7fba.png>)

흐름 맥락: [F08/07](FLOWS.md#f08), [F09/01](FLOWS.md#f09), [F10/01](FLOWS.md#f10), [F11/01](FLOWS.md#f11)

FE 조사 경로: [RichDocumentBody.tsx](<../../FE/src/features/editor/RichDocumentBody.tsx>), [editorModel.ts](<../../FE/src/features/editor/editorModel.ts>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>)

기본 담당: [G36](CONTRACTS.md#g36) · 실행 작업: [V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07)

**화면별 수용 조건:** 제목과 본문, 회색 문자 스타일, 이탤릭 인용선, bullet, 점3개 구분선, 선택 중 도구 색과 키보드 위 툴바를 비교한다. 코드 도구의 실행 후 모습은 원본 미확인이다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 준비 완료 이미지가 문서에 실제 삽입. 로컬 sunset과 원본 산/호수의 자산·비율 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):331)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Close, 더보기, Next, 서식 도구

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s137-l"></a>`R-S137-L` | 배치: 제목·본문 아래 산과 호수 사진, 키보드 숨김 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G36](CONTRACTS.md#g36), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s137-d"></a>`R-S137-D` | 표시값·입력: 제목·본문·사진 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G36](CONTRACTS.md#g36), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s137-s"></a>`R-S137-S` | 상태: 이미지 로딩 표시 사라짐 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G36](CONTRACTS.md#g36), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s137-c01"></a>`R-S137-C01` | 컨트롤: Close | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s137-c02"></a>`R-S137-C02` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s137-c03"></a>`R-S137-C03` | 컨트롤: Next | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s137-c04"></a>`R-S137-C04` | 컨트롤: 문자 스타일 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s137-c05"></a>`R-S137-C05` | 컨트롤: 인용 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s137-c06"></a>`R-S137-C06` | 컨트롤: 목록 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s137-c07"></a>`R-S137-C07` | 컨트롤: 구분선 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s137-c08"></a>`R-S137-C08` | 컨트롤: 멘션 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G38](CONTRACTS.md#g38) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s137-c09"></a>`R-S137-C09` | 컨트롤: 코드 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="r-s137-c10"></a>`R-S137-C10` | 컨트롤: 이미지 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G36](CONTRACTS.md#g36), [G37](CONTRACTS.md#g37) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S137](UNKNOWN.md#u-s137)

<a id="s138"></a>

## S138 — 대명사·소개 입력된 프로필

안정 원본 ID: `sc_befb6fde38cc48f3827ea389caed11de` · [원본 분석](<../../medium/flows/Profile/Editing profile information/ANALYSIS.md>):211 · [원본 PNG](<../../medium/flows/Profile/Editing profile information/screens/06_sc_befb6fde38cc48f3827ea389caed11de.png>)

흐름 맥락: [F57/06](FLOWS.md#f57)

FE 조사 경로: [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>)

기본 담당: [G42](CONTRACTS.md#g42) · 실행 작업: [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32)

**화면별 수용 조건:** Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 사진선택·대명사·49·160소개 초안 대조. 검증용사진/여러줄웹입력과 원본한줄스크롤 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):332)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Save, 대명사 Add

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s138-l"></a>`R-S138-L` | 배치: he·him 칩·소개 입력 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s138-d"></a>`R-S138-D` | 표시값·입력: Pronouns2/4, Short bio49/160 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s138-s"></a>`R-S138-S` | 상태: 저장 전 정보 완성 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s138-c01"></a>`R-S138-C01` | 컨트롤: Save | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s138-c02"></a>`R-S138-C02` | 컨트롤: 대명사 Add | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S138](UNKNOWN.md#u-s138)

<a id="s139"></a>

## S139 — 초안 목록

안정 원본 ID: `sc_c020fbe7604a43569b5bf77da2725119` · [원본 분석](<../../medium/flows/Home/Publishing a story/Drafts/ANALYSIS.md>):114 · [원본 PNG](<../../medium/flows/Home/Publishing a story/Drafts/screens/03_sc_c020fbe7604a43569b5bf77da2725119.png>)

흐름 맥락: [F10/03](FLOWS.md#f10)

FE 조사 경로: [DraftsScreen.tsx](<../../FE/src/features/editor/DraftsScreen.tsx>), [createDraftSession.ts](<../../FE/src/features/editor/createDraftSession.ts>)

기본 담당: [G38](CONTRACTS.md#g38) · 실행 작업: [V09](../FE_MEDIUM_PARITY_BACKLOG.md#v09)

**화면별 수용 조건:** 더보기 네 메뉴의 순서·각 목적지, Drafts 제목/Edited 시각/Close/재개를 확인한다. 목록의 시각 표시는 서버 동기화 완료 표시가 아니다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 저장 flush→초안 목록→같은초안재개 확인. 수정 시각은 현재mock시각, 원본1분을 고정하지 않음. ([과거 기록](<../FE_GOAL_53_RESULT.md>):333)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Close, 초안 행

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s139-l"></a>`R-S139-L` | 배치: Drafts 시트와 단일 제목 행 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G38](CONTRACTS.md#g38), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V09](../FE_MEDIUM_PARITY_BACKLOG.md#v09) |
| <a id="r-s139-d"></a>`R-S139-D` | 표시값·입력: The Silence between Notes, Edited 1 minute ago | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G38](CONTRACTS.md#g38), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V09](../FE_MEDIUM_PARITY_BACKLOG.md#v09) |
| <a id="r-s139-s"></a>`R-S139-S` | 상태: 초안 1건 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G38](CONTRACTS.md#g38), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V09](../FE_MEDIUM_PARITY_BACKLOG.md#v09) |
| <a id="r-s139-c01"></a>`R-S139-C01` | 컨트롤: Close | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G38](CONTRACTS.md#g38) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V09](../FE_MEDIUM_PARITY_BACKLOG.md#v09) |
| <a id="r-s139-c02"></a>`R-S139-C02` | 컨트롤: 초안 행 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G38](CONTRACTS.md#g38) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V09](../FE_MEDIUM_PARITY_BACKLOG.md#v09) |


원본 해석 경계: Edited 1 minute ago는 초안 목록의 수정 시각 표시다. 현재 편집 내용 전체가 서버에 저장되었다는 동기화 완료 표시는 아니며, 자동 저장 설명은 공식 작성 도움말과 분리해 읽는다.

미확인 사항: [U-S139](UNKNOWN.md#u-s139)

<a id="s140"></a>

## S140 — 응답 미리보기 끝

안정 원본 ID: `sc_c068a6d42c5c48fb9d60c8af4adb446f` · [원본 분석](<../../medium/flows/Home/Story detail/ANALYSIS.md>):211 · [원본 PNG](<../../medium/flows/Home/Story detail/screens/06_sc_c068a6d42c5c48fb9d60c8af4adb446f.png>)

흐름 맥락: [F16/06](FLOWS.md#f16)

FE 조사 경로: [ArticleDetailScreen.tsx](<../../FE/src/features/article/ArticleDetailScreen.tsx>), [ReferenceArticleView.tsx](<../../FE/src/features/article/ReferenceArticleView.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>)

기본 담당: [G25](CONTRACTS.md#g25) · 실행 작업: [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13)

**화면별 수용 조건:** 제목/부제/작가/읽기시간/표지 출처, 본문 강조·링크·삽입 이미지·토픽·작성자·응답 미리보기·관련 글·고정 반응 바를 각각 비교한다. +16은 입력 피드백이며 터치 횟수 증거가 아니다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. inlineReadmore/replies/Seeall 실제연결. 실제fixture자식수/edited표시와48행높이차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):334)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Reply, replies, See all responses

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s140-l"></a>`R-S140-L` | 배치: 긴 응답 생략과 전체 응답 버튼 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s140-d"></a>`R-S140-D` | 표시값·입력: Read more, See all responses | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s140-s"></a>`R-S140-S` | 상태: 부분 응답 목록의 끝 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s140-c01"></a>`R-S140-C01` | 컨트롤: Reply | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s140-c02"></a>`R-S140-C02` | 컨트롤: replies | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s140-c03"></a>`R-S140-C03` | 컨트롤: See all responses | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S140](UNKNOWN.md#u-s140)

<a id="s141"></a>

## S141 — 2.5배 재생 표시

안정 원본 ID: `sc_c0fd5f5f29594fb997865177863b9482` · [원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/ANALYSIS.md>):147 · [원본 PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/screens/04_sc_c0fd5f5f29594fb997865177863b9482.png>)

흐름 맥락: [F27/04](FLOWS.md#f27)

FE 조사 경로: [ListeningPlayer.tsx](<../../FE/src/features/listening/ListeningPlayer.tsx>)

기본 담당: [G45](CONTRACTS.md#g45) · 실행 작업: [V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18)

**화면별 수용 조건:** 준비 중 두 spinner, mini/expanded 동일 기사, 커버·배경·시간·진행선·10초/30초·희미한 이전/다음·닫기·Speechify 표시를 비교한다. 무음 timer는 실제 재생과 구분한다. Q12에서 미니/확장 플레이어의 모의 안내가 원본 배치에 미치는 영향을 판정한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 2.5x 확정 후 player, 실제 경과와 고정원본 시간 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):335)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 재생 조작·속도

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s141-l"></a>`R-S141-L` | 배치: 플레이어 하단 속도 변경 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G45](CONTRACTS.md#g45), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s141-d"></a>`R-S141-D` | 표시값·입력: 2.5x, 00:10, -01:44 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G45](CONTRACTS.md#g45), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s141-s"></a>`R-S141-S` | 상태: 배속 변경 반영 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G45](CONTRACTS.md#g45), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s141-c01"></a>`R-S141-C01` | 컨트롤: 접기 손잡이 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s141-c02"></a>`R-S141-C02` | 컨트롤: 진행 바 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s141-c03"></a>`R-S141-C03` | 컨트롤: 일시정지 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s141-c04"></a>`R-S141-C04` | 컨트롤: 10초 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s141-c05"></a>`R-S141-C05` | 컨트롤: 30초 앞으로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s141-c06"></a>`R-S141-C06` | 컨트롤: 이전 트랙(연한 표시) | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s141-c07"></a>`R-S141-C07` | 컨트롤: 다음 트랙(연한 표시) | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s141-c08"></a>`R-S141-C08` | 컨트롤: 속도 2.5x | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45), [G46](CONTRACTS.md#g46) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s141-c09"></a>`R-S141-C09` | 컨트롤: 공유 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45), [G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="r-s141-c10"></a>`R-S141-C10` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G45](CONTRACTS.md#g45) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S141](UNKNOWN.md#u-s141)

<a id="s142"></a>

## S142 — 응답 수정 반영

안정 원본 ID: `sc_c1a6af7cef31436a9cdd090eae87479f` · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/ANALYSIS.md>):177 · [원본 PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/screens/05_sc_c1a6af7cef31436a9cdd090eae87479f.png>)

흐름 맥락: [F33/05](FLOWS.md#f33)

FE 조사 경로: [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>)

기본 담당: [G26](CONTRACTS.md#g26) · 실행 작업: [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20)

**화면별 수용 조건:** 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 수정후동일댓글ID, edited표시. 자체성공토스트와원본계정차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):336)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 더보기, Reply

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s142-l"></a>`R-S142-L` | 배치: YOU 응답에 하트 3개·edited 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s142-d"></a>`R-S142-D` | 표시값·입력: Responses 833 유지 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s142-s"></a>`R-S142-S` | 상태: 내용 변경과 edited 확인 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G26](CONTRACTS.md#g26), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s142-c01"></a>`R-S142-C01` | 컨트롤: 더보기 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="r-s142-c02"></a>`R-S142-C02` | 컨트롤: Reply | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G26](CONTRACTS.md#g26) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |


원본 해석 경계: 수정 뒤 표시 시각은 1 second ago (edited)로 바뀐다. 작성 시각과 수정 시각 중 무엇을 정렬에 사용하는지는 이 표시만으로 확정할 수 없다.

미확인 사항: [U-S142](UNKNOWN.md#u-s142)

<a id="s143"></a>

## S143 — 작가 더보기 액션

안정 원본 ID: `sc_c25f22caf7cd49ba88c8611fb7480932` · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/Blocking an author/ANALYSIS.md>):85 · [원본 PNG](<../../medium/flows/Home/Story detail/Author detail/Blocking an author/screens/02_sc_c25f22caf7cd49ba88c8611fb7480932.png>)

흐름 맥락: [F18/02](FLOWS.md#f18), [F22/02](FLOWS.md#f22), [F23/02](FLOWS.md#f23)

FE 조사 경로: [ModerationDialogs.tsx](<../../FE/src/features/moderation/ModerationDialogs.tsx>), [articleModeration.ts](<../../FE/src/features/moderation/articleModeration.ts>)

기본 담당: [G29](CONTRACTS.md#g29) · 실행 작업: [V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15)

**화면별 수용 조건:** 메뉴 순서·파랑/빨강·Cancel, 성공 토스트, 신고 radio와 Also block checkbox, 사유 전후 Report 상태를 비교한다. 차단 후 원본 카드 잔존과 자체 접근 제한의 충돌을 기록한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 작가Share/Mute/Block/Report/Cancel 실제sheet. nativeblur대비웹평면/행높이차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):337)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Share author, Mute author, Block author, Report author, Cancel

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s143-l"></a>`R-S143-L` | 배치: 프로필 위 하단 시트 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G29](CONTRACTS.md#g29), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s143-d"></a>`R-S143-D` | 표시값·입력: 추가 입력 없음 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G29](CONTRACTS.md#g29), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s143-s"></a>`R-S143-S` | 상태: 작가 관리 메뉴 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G29](CONTRACTS.md#g29), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s143-c01"></a>`R-S143-C01` | 컨트롤: Share author | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29), [G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s143-c02"></a>`R-S143-C02` | 컨트롤: Mute author | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s143-c03"></a>`R-S143-C03` | 컨트롤: Block author | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s143-c04"></a>`R-S143-C04` | 컨트롤: Report author | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="r-s143-c05"></a>`R-S143-C05` | 컨트롤: Cancel | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G29](CONTRACTS.md#g29) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S143](UNKNOWN.md#u-s143)

<a id="s144"></a>

## S144 — 다크 내 프로필

안정 원본 ID: `sc_c31a2100ddcd41cba45b5081c69b78b5` · [원본 분석](<../../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>):271 · [원본 PNG](<../../medium/flows/Profile/Settings/Switching to dark mode/screens/08_sc_c31a2100ddcd41cba45b5081c69b78b5.png>)

흐름 맥락: [F62/08](FLOWS.md#f62)

FE 조사 경로: [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>)

기본 담당: [G42](CONTRACTS.md#g42) · 실행 작업: [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32)

**화면별 수용 조건:** Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Dark프로필·사진·발행결과. 원본rowbar와현재written문서row기능차이·재개/Drafts자체보완. ([과거 기록](<../FE_GOAL_53_RESULT.md>):338)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** View stats, 편집, 설정

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s144-l"></a>`R-S144-L` | 배치: 프로필 탭·기사 카드·버튼 색상 변경 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s144-d"></a>`R-S144-D` | 표시값·입력: he/him·Public·기존 글 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s144-s"></a>`R-S144-S` | 상태: 프로필 테마 적용 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G42](CONTRACTS.md#g42), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s144-c01"></a>`R-S144-C01` | 컨트롤: View stats | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42), [G43](CONTRACTS.md#g43) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s144-c02"></a>`R-S144-C02` | 컨트롤: 편집 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="r-s144-c03"></a>`R-S144-C03` | 컨트롤: 설정 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G42](CONTRACTS.md#g42) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S144](UNKNOWN.md#u-s144)

<a id="s145"></a>

## S145 — 저장한 하이라이트 목록

안정 원본 ID: `sc_c37aefd0916548dda3cb46d61cc25193` · [원본 분석](<../../medium/flows/Library/ANALYSIS.md>):177 · [원본 PNG](<../../medium/flows/Library/screens/05_sc_c37aefd0916548dda3cb46d61cc25193.png>)

흐름 맥락: [F41/05](FLOWS.md#f41)

FE 조사 경로: [LibraryScreen.tsx](<../../FE/src/features/bookmarks/LibraryScreen.tsx>), [HighlightList.tsx](<../../FE/src/features/highlights/HighlightList.tsx>)

기본 담당: [G34](CONTRACTS.md#g34) · 실행 작업: [V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24)

**화면별 수용 조건:** 가로5탭, 초기 배너/닫기·Digest New, New list, 빈/3개/4개 카드 썸네일/잠금/다운로드/메뉴, Highlighted 구절·작성자·원문 링크를 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 실제 저장한 개인 highlight1개를 조회. 원본3발췌와 본문·개수 차이, Remove highlight는 자체 복구 조작. ([과거 기록](<../FE_GOAL_53_RESULT.md>):339)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 원문 항목

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s145-l"></a>`R-S145-L` | 배치: Highlighted 탭·강조 구절·원문 제목·작성자 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s145-d"></a>`R-S145-D` | 표시값·입력: Alex Smith highlighted | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s145-s"></a>`R-S145-S` | 상태: 여러 글의 개인 하이라이트 모음 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G34](CONTRACTS.md#g34), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="r-s145-c01"></a>`R-S145-C01` | 컨트롤: 원문 항목 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G27](CONTRACTS.md#g27), [G34](CONTRACTS.md#g34) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |


원본 해석 경계: 가로 탭에는 Reading history도 보인다. 이 라이브러리 탭의 본문은 수록되지 않았으며 Home 아래 Refine recommendations의 Reading history 화면과 같다고 단정하지 않는다.

미확인 사항: [U-S145](UNKNOWN.md#u-s145)

<a id="s146"></a>

## S146 — 토픽 지정된 발행 미리보기

안정 원본 ID: `sc_c3bdb30e524c4709ae45998ec529a6c0` · [원본 분석](<../../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>):210 · [원본 PNG](<../../medium/flows/Home/Publishing a story/Adding topics/screens/06_sc_c3bdb30e524c4709ae45998ec529a6c0.png>)

흐름 맥락: [F07/06](FLOWS.md#f07), [F08/09](FLOWS.md#f08)

FE 조사 경로: [PublishTopics.tsx](<../../FE/src/features/editor/PublishTopics.tsx>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>)

기본 담당: [G39](CONTRACTS.md#g39) · 실행 작업: [V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06)

**화면별 수용 조건:** 검색 X와 chip X, 0/5·3/5·최대5, 빈값 Save의 모양, 미리보기 Edit/Publication/Unlisted/Publish now와 스크롤 헤더를 각각 확인한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 토픽 Save→부모 preview 확인. 쉼표 문장을 원본 칩으로 교정, 부모 저장 계약 유지. ([과거 기록](<../FE_GOAL_53_RESULT.md>):340)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Topics, Publication, Edit, Publish now

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s146-l"></a>`R-S146-L` | 배치: 기사 카드 아래 토픽 칩 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G39](CONTRACTS.md#g39), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s146-d"></a>`R-S146-D` | 표시값·입력: Music, Culture, Art 3개 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G39](CONTRACTS.md#g39), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s146-s"></a>`R-S146-S` | 상태: 토픽 선택 반영 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G39](CONTRACTS.md#g39), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s146-c01"></a>`R-S146-C01` | 컨트롤: Topics | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s146-c02"></a>`R-S146-C02` | 컨트롤: Publication | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s146-c03"></a>`R-S146-C03` | 컨트롤: Edit | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="r-s146-c04"></a>`R-S146-C04` | 컨트롤: Publish now | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G39](CONTRACTS.md#g39) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S146](UNKNOWN.md#u-s146)

<a id="s147"></a>

## S147 — 기사 말미와 작성자 카드

안정 원본 ID: `sc_c3fcf42b84be4b7298dfc138c224e241` · [원본 분석](<../../medium/flows/Home/Story detail/ANALYSIS.md>):150 · [원본 PNG](<../../medium/flows/Home/Story detail/screens/04_sc_c3fcf42b84be4b7298dfc138c224e241.png>)

흐름 맥락: [F16/04](FLOWS.md#f16)

FE 조사 경로: [ArticleDetailScreen.tsx](<../../FE/src/features/article/ArticleDetailScreen.tsx>), [ReferenceArticleView.tsx](<../../FE/src/features/article/ReferenceArticleView.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>)

기본 담당: [G25](CONTRACTS.md#g25) · 실행 작업: [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13)

**화면별 수용 조건:** 제목/부제/작가/읽기시간/표지 출처, 본문 강조·링크·삽입 이미지·토픽·작성자·응답 미리보기·관련 글·고정 반응 바를 각각 비교한다. +16은 입력 피드백이며 터치 횟수 증거가 아니다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. 본문끝/토픽/작가소개/외부링크 연결. serif·태그48터치간격·설명/링크줄바꿈·자동헤더상태차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):341)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 토픽, Follow, 작성자 링크, 공유

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s147-l"></a>`R-S147-L` | 배치: 마지막 문단 아래 토픽 5개와 작성자 소개 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s147-d"></a>`R-S147-D` | 표시값·입력: 10.2K followers·24 following | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s147-s"></a>`R-S147-S` | 상태: 기사 말미 도달 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G25](CONTRACTS.md#g25), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s147-c01"></a>`R-S147-C01` | 컨트롤: 토픽 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G30](CONTRACTS.md#g30) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s147-c02"></a>`R-S147-C02` | 컨트롤: Follow | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s147-c03"></a>`R-S147-C03` | 컨트롤: 작성자 링크 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G28](CONTRACTS.md#g28) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="r-s147-c04"></a>`R-S147-C04` | 컨트롤: 공유 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G25](CONTRACTS.md#g25), [G47](CONTRACTS.md#g47) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |


원본 해석 경계: 기사 말미 작가 카드는 24 following을 표시하지만 Author detail 첫 화면은 25 following이다. 동일 시각 스냅샷으로 단정하지 않는다.

미확인 사항: [U-S147](UNKNOWN.md#u-s147)

<a id="s148"></a>

## S148 — 이미지 추가 방식 선택

안정 원본 ID: `sc_c609f8fa87b84b76bea6f312df2e3e0f` · [원본 분석](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>):154 · [원본 PNG](<../../medium/flows/Home/Publishing a story/screens/04_sc_c609f8fa87b84b76bea6f312df2e3e0f.png>)

흐름 맥락: [F08/04](FLOWS.md#f08)

FE 조사 경로: [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>), [ImagePickerSheet.tsx](<../../FE/src/features/editor/ImagePickerSheet.tsx>)

기본 담당: [G37](CONTRACTS.md#g37) · 실행 작업: [V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08)

**화면별 수용 조건:** 사진 소스 시트, Unsplash 2열 가변 높이와 작가 표시, 준비 중 덮개·스피너·녹색 테두리·X, 삽입 후 키보드 상태를 각각 비교한다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Take photo/Choose library/Unsplash/Cancel 실제 시트. 표준 iOS 자산/폰트·48논리 제어 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):342)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Take photo, Choose from library, Search photos on Unsplash, Cancel

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s148-l"></a>`R-S148-L` | 배치: 편집기 위 하단 액션 시트 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G37](CONTRACTS.md#g37), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08) |
| <a id="r-s148-d"></a>`R-S148-D` | 표시값·입력: 추가 입력 없음 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G37](CONTRACTS.md#g37), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08) |
| <a id="r-s148-s"></a>`R-S148-S` | 상태: 이미지 소스 선택 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G37](CONTRACTS.md#g37), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08) |
| <a id="r-s148-c01"></a>`R-S148-C01` | 컨트롤: Take photo | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G37](CONTRACTS.md#g37), [G52](CONTRACTS.md#g52) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08) |
| <a id="r-s148-c02"></a>`R-S148-C02` | 컨트롤: Choose from library | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G37](CONTRACTS.md#g37), [G52](CONTRACTS.md#g52) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08) |
| <a id="r-s148-c03"></a>`R-S148-C03` | 컨트롤: Search photos on Unsplash | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G37](CONTRACTS.md#g37) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08) |
| <a id="r-s148-c04"></a>`R-S148-C04` | 컨트롤: Cancel | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G37](CONTRACTS.md#g37) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08) |


원본 해석 경계: 조작 결과와 미수록 동작을 구분한다.

미확인 사항: [U-S148](UNKNOWN.md#u-s148)

<a id="s149"></a>

## S149 — 설정 하단

안정 원본 ID: `sc_c653047933aa40b2be7a8f281643d41d` · [원본 분석](<../../medium/flows/Profile/Settings/ANALYSIS.md>):114 · [원본 PNG](<../../medium/flows/Profile/Settings/screens/03_sc_c653047933aa40b2be7a8f281643d41d.png>)

흐름 맥락: [F58/03](FLOWS.md#f58), [F61/01](FLOWS.md#f61)

FE 조사 경로: [SettingsScreen.tsx](<../../FE/src/features/settings/SettingsScreen.tsx>), [SettingsExtrasScreen.tsx](<../../FE/src/features/settings/SettingsExtrasScreen.tsx>), [AppIconScreen.tsx](<../../FE/src/features/app-icon/AppIconScreen.tsx>)

기본 담당: [G49](CONTRACTS.md#g49) · 실행 작업: [V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33)

**화면별 수용 조건:** 모든 행과 섹션·외부 화살표·Facebook 안내·버전·Appearance 선택, 2열 아이콘8종·Wordmark Black선택·Friend잠금·하단잘림을 비교한다. 자체 K 자산을 원본과 동일로 세지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Settings하단Social/Help/정책/로그아웃 진입. 실제앱버전/readingtools별도영역·Facebook아이콘·스크롤 차이. ([과거 기록](<../FE_GOAL_53_RESULT.md>):343)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** Help, 약관, 개인정보, 앱 평가, More app controls, Sign out

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s149-l"></a>`R-S149-L` | 배치: Social·About Medium·App Controls | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G49](CONTRACTS.md#g49), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s149-d"></a>`R-S149-D` | 표시값·입력: Facebook Connect, Version 4.263.185257 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G49](CONTRACTS.md#g49), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s149-s"></a>`R-S149-S` | 상태: 설정과 앱 버전 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G49](CONTRACTS.md#g49), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s149-c01"></a>`R-S149-C01` | 컨트롤: Facebook Connect | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s149-c02"></a>`R-S149-C02` | 컨트롤: Help | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s149-c03"></a>`R-S149-C03` | 컨트롤: Terms of service | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s149-c04"></a>`R-S149-C04` | 컨트롤: Privacy policy | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s149-c05"></a>`R-S149-C05` | 컨트롤: Rate on the App Store | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s149-c06"></a>`R-S149-C06` | 컨트롤: More app controls | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s149-c07"></a>`R-S149-C07` | 컨트롤: Sign out | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G40](CONTRACTS.md#g40), [G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="r-s149-c08"></a>`R-S149-C08` | 컨트롤: 뒤로 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G49](CONTRACTS.md#g49) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |


원본 해석 경계: Facebook Connect에는 허락 없이 게시하지 않는다는 안내가 있다. 연결·동의·해제 결과는 수록되지 않았다. More app controls도 메뉴만 확인된다.

미확인 사항: [U-S149](UNKNOWN.md#u-s149)

<a id="s150"></a>

## S150 — 글별 Lifetime 통계

안정 원본 ID: `sc_c6580d2d071a4f079981013ccc658af4` · [원본 분석](<../../medium/flows/Profile/Story stats/ANALYSIS.md>):147 · [원본 PNG](<../../medium/flows/Profile/Story stats/screens/04_sc_c6580d2d071a4f079981013ccc658af4.png>)

흐름 맥락: [F63/04](FLOWS.md#f63)

FE 조사 경로: [StoryStatsScreen.tsx](<../../FE/src/features/story-stats/StoryStatsScreen.tsx>)

기본 담당: [G43](CONTRACTS.md#g43) · 실행 작업: [V34](../FE_MEDIUM_PARITY_BACKLOG.md#v34)

**화면별 수용 조건:** Monthly 기간UTC/Updated daily, 11/2·그래프 축/범례/색/면·날짜선·점, Lifetime Latest/글0/0을 독립 비교 fixture로 확인한다. 원본 집계 모순을 운영 계산식으로 만들지 않는다. Lifetime 자체의 시작일–Today·Updated daily와 글의23 hours ago도 별도로 비교한다. 현재 코드에 이 분기가 있다는 사실을 새 실행 통과로 표시하지 않는다.

**과거 Goal53 화면 판정:** **부분 대조 · 차이/플랫폼 잔여**. Lifetime 기간·Latest·동일 제목/23hours ago·글별0/0 비교. 정상 집계 공식으로 월간11/2와의 불일치를 설명하지 않음. 행/하단 탭 간격·원형 범례·font 차이. 별도June2025 비교 fixture11/2·Lifetime0/0; 정상F63와 구분. ([과거 기록](<../FE_GOAL_53_RESULT.md>):344)

**현재 판정:** 전체 동일성 미완료. 위 과거 판정과 코드 경로를 확인했으며, 이번 문서 작업에서 해당 화면을 새로 실행·재촬영하지 않았다.

**원본 컨트롤 관찰 문장:** 정렬 드롭다운, 글 행

| 요구 ID | 원본 요구 | 기존 TODO 판정·구체 계약 | FE 판정 / 후속 작업 |
| --- | --- | --- | --- |
| <a id="r-s150-l"></a>`R-S150-L` | 배치: 월간 그래프 아래 Lifetime·정렬·글 행 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G43](CONTRACTS.md#g43), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V34](../FE_MEDIUM_PARITY_BACKLOG.md#v34) |
| <a id="r-s150-d"></a>`R-S150-D` | 표시값·입력: Latest, The Silence between Notes, Views0·Reads0 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G43](CONTRACTS.md#g43), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V34](../FE_MEDIUM_PARITY_BACKLOG.md#v34) |
| <a id="r-s150-s"></a>`R-S150-S` | 상태: 글별 누적 통계 표시 | 일부 포함: 원본·시각 비교 계약은 있으나 이 상태의 개별 수용 조건은 분산됨<br>[G43](CONTRACTS.md#g43), [G23](CONTRACTS.md#g23), [G53](CONTRACTS.md#g53) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V34](../FE_MEDIUM_PARITY_BACKLOG.md#v34) |
| <a id="r-s150-c01"></a>`R-S150-C01` | 컨트롤: 정렬 드롭다운 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G43](CONTRACTS.md#g43) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V34](../FE_MEDIUM_PARITY_BACKLOG.md#v34) |
| <a id="r-s150-c02"></a>`R-S150-C02` | 컨트롤: 글 행 | 기능 범위 포함: 담당 Goal에 상위 계약 있음; 이 조작점의 상세 수용 조건은 아래 원본 기준으로 보완<br>[G43](CONTRACTS.md#g43) | 화면 코드 경로 확인 / 개별 요구의 현재 렌더·조작 동일성 미검증<br>[V34](../FE_MEDIUM_PARITY_BACKLOG.md#v34) |


원본 해석 경계: Lifetime에는 별도 기간·Updated daily·Latest 필터가 있다. 월간 전체 집계 11/2와 이 글 행의 0/0 차이는 범위·시점·캐시 어느 원인인지 확인되지 않았다.

미확인 사항: [U-S150](UNKNOWN.md#u-s150)
