# 63개 흐름과 273단계의 연결 요구

**2026-11-24 최신 추적:** [Parity1~8 잔여 정리](../FE_MEDIUM_PARITY_01_08_REVIEW.md). 원본 R/T/U/C와 배정은 보존한다. 정책·Digest 이미지/비교 집계와 본문 미리보기 연결을 보완했으며, 목록 메모·발행 다운로드는7/8의 후속 해결로 연결했다. 원본 미수록 정책·기기·제외를 구현 결함과 구분한다.

**Parity 7 검토:** [28화면·38배정 단계·저장/메모/순서 결과](../FE_MEDIUM_PARITY_07_RESULT.md). 해당 배정 단계의 원본·현재 구현을 대조했다. 원본 미확인·다운로드 후속·native 대기는 유지한다.

[요약](../FE_MEDIUM_PARITY_AUDIT.md) · [작업](../FE_MEDIUM_PARITY_BACKLOG.md)

같은 PNG가 여러 flow에 있어도 맥락을 삭제하지 않는다. 아래 원본 단계 변화는 정적 캡처의 관찰이며 모든 인접 화면 사이의 정확한 터치·서버 성공을 관찰한 기록이 아니다. 모든 T 요구는 진입/복귀·취소·스크롤/입력 유지의 기존 Goal50/51 계약과 해당 화면의 개별 수용 조건을 함께 적용한다.

<a id="f01"></a>

## F01 — Explore

[원본 분석](<../../medium/flows/Explore/ANALYSIS.md>)

**원본 흐름 목적:** 검색·토픽·인기 순위·Staff Picks·개인 추천·팔로우 카드의 발견 화면을 분석한다.

큐레이션과 개인화는 서로 다른 섹션이다. 추천 순서의 내부 기준은 화면으로 알 수 없다.

- **진입:** Home 뒤 Explore 화면으로 연결된다.

- **종료:** 토픽·Trending·Staff Picks·Recommended for you·Who to follow를 비교한다.

- **미수록 분기:** 추천 갱신·모든 캐러셀 항목·Follow 결과·로딩·실패·빈 상태.

- **원본 해석:** 큐레이션과 개인화는 서로 다른 섹션이다. 추천 순서의 내부 기준은 화면으로 알 수 없다.

- **FE 검토:** 탐색/검색/유형별 결과·목적지 구현. A/B 관계 관리 연결은 A08. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [SearchScreen.tsx](<../../FE/src/features/search/SearchScreen.tsx>), [CatalogSearchResults.tsx](<../../FE/src/features/search/CatalogSearchResults.tsx>), [SearchNavigation.test.tsx](<../../FE/src/app/navigation/SearchNavigation.test.tsx>), [SearchCategoriesNavigation.test.tsx](<../../FE/src/app/navigation/SearchCategoriesNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f01-01"></a>`T-F01-01` | [S069](REQUIREMENTS_03.md#s069) · [PNG](<../../medium/flows/Explore/screens/01_sc_5e0ba0e498ff49579bf838096aec4b5e.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: Explore 첫 화면 — 발견 탐색<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="t-f01-02"></a>`T-F01-02` | [S021](REQUIREMENTS_01.md#s021) · [PNG](<../../medium/flows/Explore/screens/02_sc_1c3e4349171248378eada528f7942269.png>) | For you 홈 피드 → Explore 첫 화면. 현재 관찰값: Search Medium 빈값. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: Explore 토픽 가로 이동 — 가로 탐색 상태<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="t-f01-03"></a>`T-F01-03` | [S070](REQUIREMENTS_03.md#s070) · [PNG](<../../medium/flows/Explore/screens/03_sc_602f368bf00a46b8b57d68f964ed6c16.png>) | Explore 첫 화면 → Explore 토픽 가로 이동. 현재 관찰값: Health·Science·Business·Life 등. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 편집 추천과 개인 추천 — 발견 페이지 중간<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="t-f01-04"></a>`T-F01-04` | [S053](REQUIREMENTS_03.md#s053) · [PNG](<../../medium/flows/Explore/screens/04_sc_4352273aa0654f939705613dfa224e75.png>) | Explore 토픽 가로 이동 → 편집 추천과 개인 추천. 현재 관찰값: 기사 읽기 시간·날짜·집계. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 팔로우 추천 카드 — 팔로우 대상 추천<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="t-f01-05"></a>`T-F01-05` | [S079](REQUIREMENTS_04.md#s079) · [PNG](<../../medium/flows/Explore/screens/05_sc_6bc604f45031400d9cebd252cd89e7a2.png>) | 편집 추천과 개인 추천 → 팔로우 추천 카드. 현재 관찰값: 작가와 Publication·소개·팔로워. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 팔로우 추천 가로 스크롤 — 캐러셀 이동<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="t-f01-06"></a>`T-F01-06` | [S174](REQUIREMENTS_07.md#s174) · [PNG](<../../medium/flows/Explore/screens/06_sc_dfdd5f6377a848c59b3512417cb47490.png>) | 팔로우 추천 카드 → 팔로우 추천 가로 스크롤. 현재 관찰값: The Daily Dollar·Alex Mathers. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |

<a id="f02"></a>

## F02 — Explore/Searching Medium

[원본 분석](<../../medium/flows/Explore/Searching Medium/ANALYSIS.md>)

**원본 흐름 목적:** 검색 진입의 토픽 탐색과 Mindfulness 검색 결과를 확인한다.

Stories 외 유형 탭은 존재하지만 해당 결과는 수록되지 않았다. 검색 키워드는 토픽 팔로우와 별도다.

- **진입:** Explore의 검색 진입 후 빈 검색 화면에서 시작한다.

- **종료:** Mindfulness 검색의 Stories 결과를 확인한다.

- **미수록 분기:** People·Publications·Topics·Lists 내용, 입력 중 추천·0건·오타·취소·실패·페이지네이션.

- **원본 해석:** Stories 외 유형 탭은 존재하지만 해당 결과는 수록되지 않았다. 검색 키워드는 토픽 팔로우와 별도다.

- **FE 검토:** 탐색/검색/유형별 결과·목적지 구현. A/B 관계 관리 연결은 A08. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [SearchScreen.tsx](<../../FE/src/features/search/SearchScreen.tsx>), [CatalogSearchResults.tsx](<../../FE/src/features/search/CatalogSearchResults.tsx>), [SearchNavigation.test.tsx](<../../FE/src/app/navigation/SearchNavigation.test.tsx>), [SearchCategoriesNavigation.test.tsx](<../../FE/src/app/navigation/SearchCategoriesNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f02-01"></a>`T-F02-01` | [S021](REQUIREMENTS_01.md#s021) · [PNG](<../../medium/flows/Explore/Searching Medium/screens/01_sc_1c3e4349171248378eada528f7942269.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 검색 진입과 토픽 탐색 — 검색어 없는 탐색 화면<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="t-f02-02"></a>`T-F02-02` | [S004](REQUIREMENTS_01.md#s004) · [PNG](<../../medium/flows/Explore/Searching Medium/screens/02_sc_047c91d900aa47448d61e4faacd68ad5.png>) | Explore 첫 화면 → 검색 진입과 토픽 탐색. 현재 관찰값: Life·Self Improvement·Work·Technology 등. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: Medium 검색 결과 — 기사 검색 결과<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="t-f02-03"></a>`T-F02-03` | [S098](REQUIREMENTS_04.md#s098) · [PNG](<../../medium/flows/Explore/Searching Medium/screens/03_sc_8dc9eeb5f9d244ca9fa6fb7a973de82f.png>) | 검색 진입과 토픽 탐색 → Medium 검색 결과. 현재 관찰값: Mindfulness 검색, Stories 활성. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |

이전 기능 점검 발견 연결: A08 — [재현 근거·현재 범위](../FE_MEDIUM_PARITY_AUDIT.md#evidence).

<a id="f03"></a>

## F03 — Explore/Topic detail

[원본 분석](<../../medium/flows/Explore/Topic detail/ANALYSIS.md>)

**원본 흐름 목적:** Explore 토픽에서 Life 상세와 팔로워·글 수·추천 기사·Follow를 확인한다.

관련 칩의 나열이 토픽 상하위 트리를 뜻하지는 않는다.

- **진입:** Explore의 토픽 칩에서 Life 상세로 연결된다.

- **종료:** 토픽 집계·Follow와 Recommended stories가 보인다.

- **미수록 분기:** Life 팔로우 실행·해제·공유, 토픽 간 계층/연관 규칙·빈 추천.

- **원본 해석:** 관련 칩의 나열이 토픽 상하위 트리를 뜻하지는 않는다.

- **FE 검토:** 토픽 상세·팔로우·기사/curation 연결 구현. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [TopicScreen.tsx](<../../FE/src/features/topics/TopicScreen.tsx>), [TopicNavigation.test.tsx](<../../FE/src/app/navigation/TopicNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f03-01"></a>`T-F03-01` | [S070](REQUIREMENTS_03.md#s070) · [PNG](<../../medium/flows/Explore/Topic detail/screens/01_sc_602f368bf00a46b8b57d68f964ed6c16.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: Life 토픽 상세 — Life 미팔로우 상태<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="t-f03-02"></a>`T-F03-02` | [S057](REQUIREMENTS_03.md#s057) · [PNG](<../../medium/flows/Explore/Topic detail/screens/02_sc_4602e853aca341a697239bc9f55b6da3.png>) | Explore 토픽 가로 이동 → Life 토픽 상세. 현재 관찰값: 7.1M followers, 1.3M Stories. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V03](../FE_MEDIUM_PARITY_BACKLOG.md#v03) |

<a id="f04"></a>

## F04 — Explore/Topic detail/Browse curated list

[원본 분석](<../../medium/flows/Explore/Topic detail/Browse curated list/ANALYSIS.md>)

**원본 흐름 목적:** 토픽 변경 후 Medium Staff의 큐레이션을 전체 리스트로 열고 끝까지 탐색한다.

토픽 추천 카드의 첫 글과 전체 리스트 첫 글이 다르다. 미리보기 순서를 전체 리스트 정렬 규칙으로 사용하지 않는다.

- **진입:** Life 뒤 Self Improvement 토픽과 편집 리스트 미리보기가 수록된다.

- **종료:** See the full list 뒤 Medium Staff의 8개 글 리스트와 말미를 확인한다.

- **미수록 분기:** 리스트 저장·응답·박수·공유 실행, 모든 8개 글의 중간 화면·순서, 토픽 전환 과정.

- **원본 해석:** 토픽 추천 카드의 첫 글과 전체 리스트 첫 글이 다르다. 미리보기 순서를 전체 리스트 정렬 규칙으로 사용하지 않는다.

- **FE 검토:** 공개 목록·저장·박수·응답·접근 상태 구현. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [PublicListScreen.tsx](<../../FE/src/features/public-lists/PublicListScreen.tsx>), [SavePublicListControl.tsx](<../../FE/src/features/public-lists/SavePublicListControl.tsx>), [PublicListsNavigation.test.tsx](<../../FE/src/app/navigation/PublicListsNavigation.test.tsx>)

- **해석 주의:** 미리보기 첫 기사와 전체 목록 첫 기사가 다르다. 전체8건의 순서를 미리보기에서 추론하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f04-01"></a>`T-F04-01` | [S057](REQUIREMENTS_03.md#s057) · [PNG](<../../medium/flows/Explore/Topic detail/Browse curated list/screens/01_sc_4602e853aca341a697239bc9f55b6da3.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: Self Improvement 토픽 — 팔로우 중인 다른 토픽<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 미리보기 첫 기사와 전체 목록 첫 기사가 다르다. 전체8건의 순서를 미리보기에서 추론하지 않는다. | [V03](../FE_MEDIUM_PARITY_BACKLOG.md#v03) |
| <a id="t-f04-02"></a>`T-F04-02` | [S091](REQUIREMENTS_04.md#s091) · [PNG](<../../medium/flows/Explore/Topic detail/Browse curated list/screens/02_sc_7de88da749774d0483716f2e861fb080.png>) | Life 토픽 상세 → Self Improvement 토픽. 현재 관찰값: 10.6M followers, 1M Stories, Following. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 토픽 내 큐레이션 — 편집 리스트 미리보기<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 미리보기 첫 기사와 전체 목록 첫 기사가 다르다. 전체8건의 순서를 미리보기에서 추론하지 않는다. | [V03](../FE_MEDIUM_PARITY_BACKLOG.md#v03) |
| <a id="t-f04-03"></a>`T-F04-03` | [S107](REQUIREMENTS_05.md#s107) · [PNG](<../../medium/flows/Explore/Topic detail/Browse curated list/screens/03_sc_974be74d8855401e84cbad9f01dc8e93.png>) | Self Improvement 토픽 → 토픽 내 큐레이션. 현재 관찰값: List curated by Medium Staff. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 큐레이션 리스트 상세 — 공개 리스트 읽기<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 미리보기 첫 기사와 전체 목록 첫 기사가 다르다. 전체8건의 순서를 미리보기에서 추론하지 않는다. | [V03](../FE_MEDIUM_PARITY_BACKLOG.md#v03) |
| <a id="t-f04-04"></a>`T-F04-04` | [S014](REQUIREMENTS_01.md#s014) · [PNG](<../../medium/flows/Explore/Topic detail/Browse curated list/screens/04_sc_15a122b14ac84b3d80c37fb84dfae4c7.png>) | 토픽 내 큐레이션 → 큐레이션 리스트 상세. 현재 관찰값: 8 stories, 108 saves, Medium Staff. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 큐레이션 리스트 하단 — 목록 말미<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 미리보기 첫 기사와 전체 목록 첫 기사가 다르다. 전체8건의 순서를 미리보기에서 추론하지 않는다. | [V04](../FE_MEDIUM_PARITY_BACKLOG.md#v04) |
| <a id="t-f04-05"></a>`T-F04-05` | [S135](REQUIREMENTS_06.md#s135) · [PNG](<../../medium/flows/Explore/Topic detail/Browse curated list/screens/05_sc_bd0cb76562a74fb69a3569e15daf02ee.png>) | 큐레이션 리스트 상세 → 큐레이션 리스트 하단. 현재 관찰값: 리스트 제목 상단 고정. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 미리보기 첫 기사와 전체 목록 첫 기사가 다르다. 전체8건의 순서를 미리보기에서 추론하지 않는다. | [V04](../FE_MEDIUM_PARITY_BACKLOG.md#v04) |

<a id="f05"></a>

## F05 — Home

[원본 분석](<../../medium/flows/Home/ANALYSIS.md>)

**원본 흐름 목적:** For you 카드 목록과 스크롤, Featured의 빈 상태 및 콘텐츠 상태를 비교한다.

Featured가 채워지는 사이의 팔로우 동작은 없다. 같은 화면 상태 모음이 단일 연속 세션임을 보장하지 않는다.

- **진입:** For you 탭의 카드 목록에서 시작한다.

- **종료:** 스크롤 뒤 Featured의 빈 상태와 채워진 상태가 수록된다. 팔로우 중간 조작은 없다.

- **미수록 분기:** Following·개별 토픽 탭 내용, 원형 − 실행, 새로고침·추가 로딩·네트워크 실패.

- **원본 해석:** Featured가 채워지는 사이의 팔로우 동작은 없다. 같은 화면 상태 모음이 단일 연속 세션임을 보장하지 않는다.

- **FE 검토:** 홈 탭·더 보기·작성/알림/관계 연결 구현. 미수록 기사/시각 잔여 유지. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [HomeFeedScreen.tsx](<../../FE/src/features/feed/HomeFeedScreen.tsx>), [FollowingFeed.tsx](<../../FE/src/features/community/FollowingFeed.tsx>), [SearchCategoriesNavigation.test.tsx](<../../FE/src/app/navigation/SearchCategoriesNavigation.test.tsx>)

- **해석 주의:** Featured 빈/채워진 두 캡처 사이의 follow 이벤트는 미수록이다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f05-01"></a>`T-F05-01` | [S069](REQUIREMENTS_03.md#s069) · [PNG](<../../medium/flows/Home/screens/01_sc_5e0ba0e498ff49579bf838096aec4b5e.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 홈 피드 스크롤 상태 — For you 하단 목록<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. Featured 빈/채워진 두 캡처 사이의 follow 이벤트는 미수록이다. | [V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="t-f05-02"></a>`T-F05-02` | [S026](REQUIREMENTS_02.md#s026) · [PNG](<../../medium/flows/Home/screens/02_sc_1ef4e2f769774d2c958fcb38b96dc94f.png>) | For you 홈 피드 → 홈 피드 스크롤 상태. 현재 관찰값: 다른 기사 카드와 집계 표시. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: Featured 빈 상태 — 팔로우 발행물의 추천 글이 없다는 안내<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. Featured 빈/채워진 두 캡처 사이의 follow 이벤트는 미수록이다. | [V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="t-f05-03"></a>`T-F05-03` | [S176](REQUIREMENTS_08.md#s176) · [PNG](<../../medium/flows/Home/screens/03_sc_e1cf4be8210f432098943d8a233d9d72.png>) | 홈 피드 스크롤 상태 → Featured 빈 상태. 현재 관찰값: No featured stories. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: Featured 기사 목록 — Featured 콘텐츠가 있는 상태<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. Featured 빈/채워진 두 캡처 사이의 follow 이벤트는 미수록이다. | [V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="t-f05-04"></a>`T-F05-04` | [S061](REQUIREMENTS_03.md#s061) · [PNG](<../../medium/flows/Home/screens/04_sc_4ec0a8b65f954b0984ece5b3b9f258e4.png>) | Featured 빈 상태 → Featured 기사 목록. 현재 관찰값: Featured 선택. 저장 아이콘 표시. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. Featured 빈/채워진 두 캡처 사이의 follow 이벤트는 미수록이다. | [V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |

<a id="f06"></a>

## F06 — Home/Notifications

[원본 분석](<../../medium/flows/Home/Notifications/ANALYSIS.md>)

**원본 흐름 목적:** 홈 알림 아이콘에서 팔로워·리스트 변경·박수 알림 목록으로 이동한다.

알림의 과거 날짜는 캡처일이 아니다. 왼쪽 녹색선의 읽음 의미와 읽음 전환은 확인되지 않았다.

- **진입:** Home 알림 아이콘에서 목록으로 연결된다.

- **종료:** 팔로워·저장 리스트 새 글·박수 알림과 일부 Follow 버튼이 보인다.

- **미수록 분기:** 항목별 목적지·읽음·읽지 않음·0건·다음 페이지·실패·설정 연동.

- **원본 해석:** 알림의 과거 날짜는 캡처일이 아니다. 왼쪽 녹색선의 읽음 의미와 읽음 전환은 확인되지 않았다.

- **FE 검토:** 알림 유형별 목적지·읽음·Follow 구현. 이력 후속 연결 A07, 비교 문서 A06. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [NotificationsScreen.tsx](<../../FE/src/features/notifications/NotificationsScreen.tsx>), [NotificationNavigation.test.tsx](<../../FE/src/app/navigation/NotificationNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f06-01"></a>`T-F06-01` | [S069](REQUIREMENTS_03.md#s069) · [PNG](<../../medium/flows/Home/Notifications/screens/01_sc_5e0ba0e498ff49579bf838096aec4b5e.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 알림 목록 — 여러 종류 알림 존재<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="t-f06-02"></a>`T-F06-02` | [S068](REQUIREMENTS_03.md#s068) · [PNG](<../../medium/flows/Home/Notifications/screens/02_sc_5d1c7181dea04ba59b57242abbc19fee.png>) | For you 홈 피드 → 알림 목록. 현재 관찰값: 새 팔로워·저장 리스트 새 글·박수 이벤트. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V05](../FE_MEDIUM_PARITY_BACKLOG.md#v05) |

이전 기능 점검 발견 연결: A06, A07 — [재현 근거·현재 범위](../FE_MEDIUM_PARITY_AUDIT.md#evidence).

<a id="f07"></a>

## F07 — Home/Publishing a story/Adding topics

[원본 분석](<../../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>)

**원본 흐름 목적:** 발행 미리보기에서 토픽을 검색하고 3개 선택한 뒤 미리보기에 반영하는 흐름을 분석한다.

최대 5개 안내와 3/5 표시가 있다. 유사 이름 토픽이 여러 개이므로 표시명만으로 동일성을 판단하지 않는다.

- **진입:** Story preview의 토픽 미지정 상태에서 시작한다.

- **종료:** 0/5 → 검색·선택 → 3/5 → 미리보기에 Music·Culture·Art 반영.

- **미수록 분기:** 5개 경계·6번째 선택, 칩 제거, 중복·검색 0건·Save 실패·취소 복원.

- **원본 해석:** 최대 5개 안내와 3/5 표시가 있다. 유사 이름 토픽이 여러 개이므로 표시명만으로 동일성을 판단하지 않는다.

- **FE 검토:** 토픽 5개 경계·초안/적용/취소 구현. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [PublishTopics.tsx](<../../FE/src/features/editor/PublishTopics.tsx>), [PublishingNavigation.test.tsx](<../../FE/src/app/navigation/PublishingNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f07-01"></a>`T-F07-01` | [S023](REQUIREMENTS_01.md#s023) · [PNG](<../../medium/flows/Home/Publishing a story/Adding topics/screens/01_sc_1ceed9061b86476ebc7eb5acb9dd89c7.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 토픽 추가 초기 상태 — 미선택<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="t-f07-02"></a>`T-F07-02` | [S118](REQUIREMENTS_05.md#s118) · [PNG](<../../medium/flows/Home/Publishing a story/Adding topics/screens/02_sc_a51d0e5d058b47809e1c299e1c28ff0e.png>) | 발행 전 Story preview → 토픽 추가 초기 상태. 현재 관찰값: 0/5, 최대 5개 안내. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: Music 토픽 검색 — 유사 철자·다른 토픽 결과<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="t-f07-03"></a>`T-F07-03` | [S029](REQUIREMENTS_02.md#s029) · [PNG](<../../medium/flows/Home/Publishing a story/Adding topics/screens/03_sc_234fd58378fc447ba6bc2e6c0033f9c2.png>) | 토픽 추가 초기 상태 → Music 토픽 검색. 현재 관찰값: Music 입력. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: Music 선택 — 선택 상태 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="t-f07-04"></a>`T-F07-04` | [S065](REQUIREMENTS_03.md#s065) · [PNG](<../../medium/flows/Home/Publishing a story/Adding topics/screens/04_sc_57162331e2334952b5da8676e4de3c22.png>) | Music 토픽 검색 → Music 선택. 현재 관찰값: Music 1개 선택. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 3개 토픽 선택 — 최대 5개 중 3개<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="t-f07-05"></a>`T-F07-05` | [S115](REQUIREMENTS_05.md#s115) · [PNG](<../../medium/flows/Home/Publishing a story/Adding topics/screens/05_sc_a4216c4ff1f64bb59bc982a8d0067b6e.png>) | Music 선택 → 3개 토픽 선택. 현재 관찰값: 검색어 비움, 3개 선택. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 토픽 지정된 발행 미리보기 — 토픽 선택 반영<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="t-f07-06"></a>`T-F07-06` | [S146](REQUIREMENTS_06.md#s146) · [PNG](<../../medium/flows/Home/Publishing a story/Adding topics/screens/06_sc_c3bdb30e524c4709ae45998ec529a6c0.png>) | 3개 토픽 선택 → 토픽 지정된 발행 미리보기. 현재 관찰값: Music, Culture, Art 3개. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |

<a id="f08"></a>

## F08 — Home/Publishing a story

[원본 분석](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>)

**원본 흐름 목적:** 글 입력, 이미지 소스·Unsplash 선택, 삽입 처리, 공개 미리보기·토픽·Unlisted 설정, 프로필 발행 결과를 확인한다.

토픽 선택 중간 과정은 자식 흐름에 있다. 공개 목록에 글이 보이는 결과와 실제 외부 URL 접근 검증을 구분한다.

- **진입:** Home 작성 버튼과 빈 편집기가 연결된다.

- **종료:** 제목·본문·이미지·토픽을 설정한 뒤 프로필 Public 목록에 새 글이 표시된다.

- **미수록 분기:** Close 후 초안 처리, Publication 제출, Unlisted On, 미리보기 Edit, 빈 글·이미지 실패·발행 실패.

- **원본 해석:** 토픽 선택 중간 과정은 자식 흐름에 있다. 공개 목록에 글이 보이는 결과와 실제 외부 URL 접근 검증을 구분한다.

- **FE 검토:** 작성/이미지/발행/저장/반응 연결 구현. 링크 A01, 읽기 범위 A03. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>), [WrittenStoryScreen.tsx](<../../FE/src/features/editor/WrittenStoryScreen.tsx>), [draftSource.ts](<../../FE/src/features/editor/draftSource.ts>), [PublishingNavigation.test.tsx](<../../FE/src/app/navigation/PublishingNavigation.test.tsx>), [EditorImagesNavigation.test.tsx](<../../FE/src/app/navigation/EditorImagesNavigation.test.tsx>), [PublishedLibrarySession.test.tsx](<../../FE/src/app/navigation/PublishedLibrarySession.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f08-01"></a>`T-F08-01` | [S069](REQUIREMENTS_03.md#s069) · [PNG](<../../medium/flows/Home/Publishing a story/screens/01_sc_5e0ba0e498ff49579bf838096aec4b5e.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 빈 기사 편집기 — 작성 시작·키보드 활성<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="t-f08-02"></a>`T-F08-02` | [S042](REQUIREMENTS_02.md#s042) · [PNG](<../../medium/flows/Home/Publishing a story/screens/02_sc_397cb0f05ba54659adac7376f29512dd.png>) | For you 홈 피드 → 빈 기사 편집기. 현재 관찰값: 본문 빈값. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 제목과 본문 입력 — 본문 끝 커서<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="t-f08-03"></a>`T-F08-03` | [S060](REQUIREMENTS_03.md#s060) · [PNG](<../../medium/flows/Home/Publishing a story/screens/03_sc_4db886af7d024100a72b9e02fa3c1ee8.png>) | 빈 기사 편집기 → 제목과 본문 입력. 현재 관찰값: The Silence between Notes 제목과 음악 관련 단락 입력. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이미지 추가 방식 선택 — 이미지 소스 선택<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="t-f08-04"></a>`T-F08-04` | [S148](REQUIREMENTS_06.md#s148) · [PNG](<../../medium/flows/Home/Publishing a story/screens/04_sc_c609f8fa87b84b76bea6f312df2e3e0f.png>) | 제목과 본문 입력 → 이미지 추가 방식 선택. 현재 관찰값: 추가 입력 없음. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: Unsplash 사진 선택 — 외부 사진 탐색 시트<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08) |
| <a id="t-f08-05"></a>`T-F08-05` | [S087](REQUIREMENTS_04.md#s087) · [PNG](<../../medium/flows/Home/Publishing a story/screens/05_sc_785431954ec4405eb0a3b22debce165a.png>) | 이미지 추가 방식 선택 → Unsplash 사진 선택. 현재 관찰값: Search photos 빈값. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 본문 이미지 로딩 — 이미지 삽입 처리 중<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08) |
| <a id="t-f08-06"></a>`T-F08-06` | [S126](REQUIREMENTS_06.md#s126) · [PNG](<../../medium/flows/Home/Publishing a story/screens/06_sc_ae30c2a2ca504522b03f98f11d59c429.png>) | Unsplash 사진 선택 → 본문 이미지 로딩. 현재 관찰값: 사진 블록 선택. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이미지 삽입 후 편집기 — 이미지 로딩 표시 사라짐<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V08](../FE_MEDIUM_PARITY_BACKLOG.md#v08) |
| <a id="t-f08-07"></a>`T-F08-07` | [S137](REQUIREMENTS_06.md#s137) · [PNG](<../../medium/flows/Home/Publishing a story/screens/07_sc_bed3857c8edc4a02b07af1e095ad7fba.png>) | 본문 이미지 로딩 → 이미지 삽입 후 편집기. 현재 관찰값: 제목·본문·사진 표시. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 발행 전 Story preview — 공개 전 설정<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="t-f08-08"></a>`T-F08-08` | [S023](REQUIREMENTS_01.md#s023) · [PNG](<../../medium/flows/Home/Publishing a story/screens/08_sc_1ceed9061b86476ebc7eb5acb9dd89c7.png>) | 이미지 삽입 후 편집기 → 발행 전 Story preview. 현재 관찰값: No topics added, No publication selected, Unlisted 꺼짐. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 토픽 지정된 발행 미리보기 — 토픽 선택 반영<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="t-f08-09"></a>`T-F08-09` | [S146](REQUIREMENTS_06.md#s146) · [PNG](<../../medium/flows/Home/Publishing a story/screens/09_sc_c3bdb30e524c4709ae45998ec529a6c0.png>) | 발행 전 Story preview → 토픽 지정된 발행 미리보기. 현재 관찰값: Music, Culture, Art 3개. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: Unlisted 공개 범위 안내 — 링크 소지자 접근·공개 목록 제외라는 안내<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="t-f08-10"></a>`T-F08-10` | [S044](REQUIREMENTS_02.md#s044) · [PNG](<../../medium/flows/Home/Publishing a story/screens/10_sc_39fb71a1ee0d43f09bab33c7ef775259.png>) | 토픽 지정된 발행 미리보기 → Unlisted 공개 범위 안내. 현재 관찰값: Publication 미지정, Unlisted 꺼짐. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 프로필에 발행 글 표시 — 발행된 것으로 보이는 글 카드<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V06](../FE_MEDIUM_PARITY_BACKLOG.md#v06) |
| <a id="t-f08-11"></a>`T-F08-11` | [S178](REQUIREMENTS_08.md#s178) · [PNG](<../../medium/flows/Home/Publishing a story/screens/11_sc_e3b2276c9abd4bc7b08e6e4c322dee9e.png>) | Unlisted 공개 범위 안내 → 프로필에 발행 글 표시. 현재 관찰값: Alex Smith, 0 followers·1 following, Just now. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |

이전 기능 점검 발견 연결: A01, A03 — [재현 근거·현재 범위](../FE_MEDIUM_PARITY_AUDIT.md#evidence).

<a id="f09"></a>

## F09 — Home/Publishing a story/Changing text format

[원본 분석](<../../medium/flows/Home/Publishing a story/Changing text format/ANALYSIS.md>)

**원본 흐름 목적:** 같은 글에 문자 스타일·인용·글머리 목록·구분선을 적용한 시각적 변화를 비교한다.

스타일 변경은 캡처에서 확인되지만 내부 블록 스키마·모든 서식 조합·저장 여부는 확인되지 않았다.

- **진입:** 제목·문단·사진이 있는 초안에서 시작한다.

- **종료:** 문자 스타일·인용·목록·구분선의 화면 변화를 확인한다. 최종 발행 결과는 없다.

- **미수록 분기:** 서식 해제·중첩·코드 블록, 선택 범위별 적용, 취소·자동 저장 실패.

- **원본 해석:** 스타일 변경은 캡처에서 확인되지만 내부 블록 스키마·모든 서식 조합·저장 여부는 확인되지 않았다.

- **FE 검토:** 서식·선택 모델 구현. 이미지 경계 단일 연속 선택은 명시적 잔여. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [RichDocumentBody.tsx](<../../FE/src/features/editor/RichDocumentBody.tsx>), [editorModel.ts](<../../FE/src/features/editor/editorModel.ts>), [EditorNavigation.test.tsx](<../../FE/src/app/navigation/EditorNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f09-01"></a>`T-F09-01` | [S137](REQUIREMENTS_06.md#s137) · [PNG](<../../medium/flows/Home/Publishing a story/Changing text format/screens/01_sc_bed3857c8edc4a02b07af1e095ad7fba.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 본문 문자 스타일 변경 — 텍스트 서식 선택 상태<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="t-f09-02"></a>`T-F09-02` | [S031](REQUIREMENTS_02.md#s031) · [PNG](<../../medium/flows/Home/Publishing a story/Changing text format/screens/02_sc_24b381a199374acb8d2a6a516052c9a7.png>) | 이미지 삽입 후 편집기 → 본문 문자 스타일 변경. 현재 관찰값: 제목 유지, 단락 스타일 변경. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 인용 서식 적용 — 인용 블록 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="t-f09-03"></a>`T-F09-03` | [S183](REQUIREMENTS_08.md#s183) · [PNG](<../../medium/flows/Home/Publishing a story/Changing text format/screens/03_sc_e5826f356093493a86c19716420e8fdf.png>) | 본문 문자 스타일 변경 → 인용 서식 적용. 현재 관찰값: 동일 문장·이미지 유지. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 글머리 목록 적용 — 글머리 목록 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="t-f09-04"></a>`T-F09-04` | [S018](REQUIREMENTS_01.md#s018) · [PNG](<../../medium/flows/Home/Publishing a story/Changing text format/screens/04_sc_1b0cd82ee04a4c8c9d52b9a2d088823b.png>) | 인용 서식 적용 → 글머리 목록 적용. 현재 관찰값: 단일 목록 항목. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 구분선 삽입과 이미지 선택 — 블록 구분선 노출<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="t-f09-05"></a>`T-F09-05` | [S017](REQUIREMENTS_01.md#s017) · [PNG](<../../medium/flows/Home/Publishing a story/Changing text format/screens/05_sc_19b2bef0854047f5b17cfeca07781ca5.png>) | 글머리 목록 적용 → 구분선 삽입과 이미지 선택. 현재 관찰값: 사진 블록 선택. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |

<a id="f10"></a>

## F10 — Home/Publishing a story/Drafts

[원본 분석](<../../medium/flows/Home/Publishing a story/Drafts/ANALYSIS.md>)

**원본 흐름 목적:** 편집기 더보기에서 Drafts를 열어 현재 초안을 찾는 경로를 확인한다.

목록에 제목과 수정 시각이 보인다. 이 흐름에는 초안 재개·삭제·오프라인 충돌 상태가 없다.

- **진입:** 초안 편집기의 더보기 메뉴에서 시작한다.

- **종료:** Drafts에 해당 제목과 수정 시각 1건이 표시된다.

- **미수록 분기:** 초안 다시 열기·삭제·여러 초안·빈 목록, 오프라인 충돌과 자동 저장 실패.

- **원본 해석:** 목록에 제목과 수정 시각이 보인다. 이 흐름에는 초안 재개·삭제·오프라인 충돌 상태가 없다.

- **FE 검토:** 자동 저장·여러 초안·재개·실패 복구 구현. 삭제 판정 A04. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [DraftsScreen.tsx](<../../FE/src/features/editor/DraftsScreen.tsx>), [createDraftSession.ts](<../../FE/src/features/editor/createDraftSession.ts>), [DraftsNavigation.test.tsx](<../../FE/src/app/navigation/DraftsNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f10-01"></a>`T-F10-01` | [S137](REQUIREMENTS_06.md#s137) · [PNG](<../../medium/flows/Home/Publishing a story/Drafts/screens/01_sc_bed3857c8edc4a02b07af1e095ad7fba.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 작성기 더보기 메뉴 — 발행 보조 메뉴 열림<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="t-f10-02"></a>`T-F10-02` | [S030](REQUIREMENTS_02.md#s030) · [PNG](<../../medium/flows/Home/Publishing a story/Drafts/screens/02_sc_2436081faa2445cb86e17ea0b88b4fc9.png>) | 이미지 삽입 후 편집기 → 작성기 더보기 메뉴. 현재 관찰값: 본문 유지. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 초안 목록 — 초안 1건 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V09](../FE_MEDIUM_PARITY_BACKLOG.md#v09) |
| <a id="t-f10-03"></a>`T-F10-03` | [S139](REQUIREMENTS_06.md#s139) · [PNG](<../../medium/flows/Home/Publishing a story/Drafts/screens/03_sc_c020fbe7604a43569b5bf77da2725119.png>) | 작성기 더보기 메뉴 → 초안 목록. 현재 관찰값: The Silence between Notes, Edited 1 minute ago. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V09](../FE_MEDIUM_PARITY_BACKLOG.md#v09) |

이전 기능 점검 발견 연결: A04 — [재현 근거·현재 범위](../FE_MEDIUM_PARITY_AUDIT.md#evidence).

<a id="f11"></a>

## F11 — Home/Publishing a story/Mentioning a user

[원본 분석](<../../medium/flows/Home/Publishing a story/Mentioning a user/ANALYSIS.md>)

**원본 흐름 목적:** 본문 @ 입력에서 이름 검색·동명이인 후보·사용자 멘션 삽입까지 확인한다.

녹색 이름 삽입은 확인된다. 상대방 알림 수신과 발행 시점의 멘션 처리까지 확인된 것은 아니다.

- **진입:** 기존 초안의 새 문단에서 @를 입력한다.

- **종료:** 검색 후보에서 이름이 녹색 텍스트로 삽입된다.

- **미수록 분기:** 검색 0건·중복 이름 식별·멘션 제거, 발행 후 대상 이동·알림 수신.

- **원본 해석:** 녹색 이름 삽입은 확인된다. 상대방 알림 수신과 발행 시점의 멘션 처리까지 확인된 것은 아니다.

- **FE 검토:** 검색된 mention ID 삽입·발행 표시/프로필 연결 구현. 비교 문서 A06. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [MentionSuggestions.tsx](<../../FE/src/features/editor/MentionSuggestions.tsx>), [DocumentReader.tsx](<../../FE/src/features/editor/DocumentReader.tsx>), [EditorNavigation.test.tsx](<../../FE/src/app/navigation/EditorNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f11-01"></a>`T-F11-01` | [S137](REQUIREMENTS_06.md#s137) · [PNG](<../../medium/flows/Home/Publishing a story/Mentioning a user/screens/01_sc_bed3857c8edc4a02b07af1e095ad7fba.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 멘션 입력 시작 — 멘션 검색 대기<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V07](../FE_MEDIUM_PARITY_BACKLOG.md#v07) |
| <a id="t-f11-02"></a>`T-F11-02` | [S180](REQUIREMENTS_08.md#s180) · [PNG](<../../medium/flows/Home/Publishing a story/Mentioning a user/screens/02_sc_e3c9949b35ca4bc7b3328ee4e887fc5a.png>) | 이미지 삽입 후 편집기 → 멘션 입력 시작. 현재 관찰값: @만 입력. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 멘션 검색 후보 — 동명이인 구분 가능한 후보 목록<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |
| <a id="t-f11-03"></a>`T-F11-03` | [S196](REQUIREMENTS_08.md#s196) · [PNG](<../../medium/flows/Home/Publishing a story/Mentioning a user/screens/03_sc_fbca217fbc1346d09deb4c0d09dac86e.png>) | 멘션 입력 시작 → 멘션 검색 후보. 현재 관찰값: 검색어 samlee. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 멘션 대상 삽입 — 멘션 후보 선택 반영<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |
| <a id="t-f11-04"></a>`T-F11-04` | [S015](REQUIREMENTS_01.md#s015) · [PNG](<../../medium/flows/Home/Publishing a story/Mentioning a user/screens/04_sc_15dd105a441c426ca638b4db6cb30997.png>) | 멘션 검색 후보 → 멘션 대상 삽입. 현재 관찰값: 이름 링크처럼 표시. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V10](../FE_MEDIUM_PARITY_BACKLOG.md#v10) |

이전 기능 점검 발견 연결: A06 — [재현 근거·현재 범위](../FE_MEDIUM_PARITY_AUDIT.md#evidence).

<a id="f12"></a>

## F12 — Home/Refine recommendations

[원본 분석](<../../medium/flows/Home/Refine recommendations/ANALYSIS.md>)

**원본 흐름 목적:** 추천 조정 화면의 Suggestions·Reading history·Following 상태를 비교한다.

팔로잉 빈 상태와 작가·토픽이 있는 상태 사이의 변경 동작이 모두 수록되지는 않았다.

- **진입:** Home 뒤 추천 관리 화면이 수록된다.

- **종료:** Suggestions·Reading history·Following의 빈/채워진 상태를 비교한다.

- **미수록 분기:** Muted 탭 내용, 팔로우 변경 중간 과정, 다른 계정·재진입 동기화.

- **원본 해석:** 팔로잉 빈 상태와 작가·토픽이 있는 상태 사이의 변경 동작이 모두 수록되지는 않았다.

- **FE 검토:** 네 탭·필터·Follow/Muted/이력 연결 구현. 동적 사용자 누락 A08. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [RefineRecommendationsScreen.tsx](<../../FE/src/features/recommendations/RefineRecommendationsScreen.tsx>), [RecommendationsNavigation.test.tsx](<../../FE/src/app/navigation/RecommendationsNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f12-01"></a>`T-F12-01` | [S069](REQUIREMENTS_03.md#s069) · [PNG](<../../medium/flows/Home/Refine recommendations/screens/01_sc_5e0ba0e498ff49579bf838096aec4b5e.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 추천 조정의 Suggestions — 추천 토픽과 기사·팔로워 집계<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="t-f12-02"></a>`T-F12-02` | [S099](REQUIREMENTS_04.md#s099) · [PNG](<../../medium/flows/Home/Refine recommendations/screens/02_sc_90bc6a79e86d436e89d94d7dc82b624c.png>) | For you 홈 피드 → 추천 조정의 Suggestions. 현재 관찰값: Suggestions 활성, Topics 필터. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 읽기 기록 목록 — 읽기 기록 존재<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="t-f12-03"></a>`T-F12-03` | [S190](REQUIREMENTS_08.md#s190) · [PNG](<../../medium/flows/Home/Refine recommendations/screens/03_sc_f4bb3fa34f32466b9bd12eea57ea518f.png>) | 추천 조정의 Suggestions → 읽기 기록 목록. 현재 관찰값: 읽은 글·날짜·집계 표시. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 팔로잉 빈 상태 — 팔로우 대상 없음<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V12](../FE_MEDIUM_PARITY_BACKLOG.md#v12) |
| <a id="t-f12-04"></a>`T-F12-04` | [S104](REQUIREMENTS_05.md#s104) · [PNG](<../../medium/flows/Home/Refine recommendations/screens/04_sc_944b2eea3834408b8c04981e5eb2adf8.png>) | 읽기 기록 목록 → 팔로잉 빈 상태. 현재 관찰값: You don't follow anything yet. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 팔로잉 유형별 목록 — 작가·토픽 팔로우 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="t-f12-05"></a>`T-F12-05` | [S022](REQUIREMENTS_01.md#s022) · [PNG](<../../medium/flows/Home/Refine recommendations/screens/05_sc_1c666fb7aadc411c9add1aa2b19bd56c.png>) | 팔로잉 빈 상태 → 팔로잉 유형별 목록. 현재 관찰값: Writers 1, Topics 3. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |

이전 기능 점검 발견 연결: A08 — [재현 근거·현재 범위](../FE_MEDIUM_PARITY_AUDIT.md#evidence).

<a id="f13"></a>

## F13 — Home/Refine recommendations/Filtering suggestions

[원본 분석](<../../medium/flows/Home/Refine recommendations/Filtering suggestions/ANALYSIS.md>)

**원본 흐름 목적:** 추천 대상을 Topics에서 All로 바꾸고 작가·토픽 및 팔로우 상태를 확인한다.

All·Writers·Publications·Topics가 선택지다. 이 캡처는 모든 유형의 결과를 각각 검증하지 않는다.

- **진입:** Suggestions의 Topics 필터에서 시작한다.

- **종료:** All 선택 메뉴와 작가·토픽 섹션이 보인다.

- **미수록 분기:** Writers·Publications 단독 선택 결과, 필터별 0건·오류·선택 유지.

- **원본 해석:** All·Writers·Publications·Topics가 선택지다. 이 캡처는 모든 유형의 결과를 각각 검증하지 않는다.

- **FE 검토:** 네 탭·필터·Follow/Muted/이력 연결 구현. 동적 사용자 누락 A08. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [RefineRecommendationsScreen.tsx](<../../FE/src/features/recommendations/RefineRecommendationsScreen.tsx>), [RecommendationsNavigation.test.tsx](<../../FE/src/app/navigation/RecommendationsNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f13-01"></a>`T-F13-01` | [S099](REQUIREMENTS_04.md#s099) · [PNG](<../../medium/flows/Home/Refine recommendations/Filtering suggestions/screens/01_sc_90bc6a79e86d436e89d94d7dc82b624c.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 추천 유형 필터 메뉴 — 유형 선택 중<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="t-f13-02"></a>`T-F13-02` | [S194](REQUIREMENTS_08.md#s194) · [PNG](<../../medium/flows/Home/Refine recommendations/Filtering suggestions/screens/02_sc_f978feb6af9f44b5a5fa8f514899f3da.png>) | 추천 조정의 Suggestions → 추천 유형 필터 메뉴. 현재 관찰값: Topics 체크. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 전체 추천의 작가 섹션 — 전체 추천 중 작가 목록<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="t-f13-03"></a>`T-F13-03` | [S033](REQUIREMENTS_02.md#s033) · [PNG](<../../medium/flows/Home/Refine recommendations/Filtering suggestions/screens/03_sc_28a0bd2548fc4800b2b024bdc06bb115.png>) | 추천 유형 필터 메뉴 → 전체 추천의 작가 섹션. 현재 관찰값: 작가 소개·인증 배지 일부. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 추천 토픽 팔로우 상태 — 일부 팔로우 반영<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |
| <a id="t-f13-04"></a>`T-F13-04` | [S151](REQUIREMENTS_07.md#s151) · [PNG](<../../medium/flows/Home/Refine recommendations/Filtering suggestions/screens/04_sc_c7deda6b53824957b587bd922cd55399.png>) | 전체 추천의 작가 섹션 → 추천 토픽 팔로우 상태. 현재 관찰값: Self Improvement·Writing·Relationships는 Following. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V11](../FE_MEDIUM_PARITY_BACKLOG.md#v11) |

<a id="f14"></a>

## F14 — Home/Refine recommendations/Reading history

[원본 분석](<../../medium/flows/Home/Refine recommendations/Reading history/ANALYSIS.md>)

**원본 흐름 목적:** 읽은 기사 목록과 스크롤, 개별 기록 제거 진입점을 확인한다.

카드의 기사 발행일을 읽은 시각으로 해석하지 않는다. 개별 휴지통 실행 결과는 수록되지 않았다.

- **진입:** 기록 목록과 Clear history가 있는 화면에서 시작한다.

- **종료:** 스크롤된 기록에서도 글별 휴지통이 보인다. 삭제 실행은 없다.

- **미수록 분기:** 개별 기록 삭제·Undo·기록 생성 조건, Library 쪽 Reading history와의 관계.

- **원본 해석:** 카드의 기사 발행일을 읽은 시각으로 해석하지 않는다. 개별 휴지통 실행 결과는 수록되지 않았다.

- **FE 검토:** 일반 Medium 방문·Viewed·개별/전체 제거·취소/재시도 구현. A03/A07/A09 구분 필요. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ReadingHistoryList.tsx](<../../FE/src/features/reading-history/ReadingHistoryList.tsx>), [createReadingHistoryStore.ts](<../../FE/src/features/reading-history/createReadingHistoryStore.ts>), [RecommendationsNavigation.test.tsx](<../../FE/src/app/navigation/RecommendationsNavigation.test.tsx>), [ClapHistoryNavigation.test.tsx](<../../FE/src/app/navigation/ClapHistoryNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f14-01"></a>`T-F14-01` | [S190](REQUIREMENTS_08.md#s190) · [PNG](<../../medium/flows/Home/Refine recommendations/Reading history/screens/01_sc_f4bb3fa34f32466b9bd12eea57ea518f.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 읽기 기록 스크롤 — 개별 기록 삭제 진입 가능<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V12](../FE_MEDIUM_PARITY_BACKLOG.md#v12) |
| <a id="t-f14-02"></a>`T-F14-02` | [S052](REQUIREMENTS_03.md#s052) · [PNG](<../../medium/flows/Home/Refine recommendations/Reading history/screens/02_sc_4239d69cbdce4194a5a34c7472131dfd.png>) | 읽기 기록 목록 → 읽기 기록 스크롤. 현재 관찰값: 각 카드 휴지통. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V12](../FE_MEDIUM_PARITY_BACKLOG.md#v12) |

이전 기능 점검 발견 연결: A03, A07, A09 — [재현 근거·현재 범위](../FE_MEDIUM_PARITY_AUDIT.md#evidence).

<a id="f15"></a>

## F15 — Home/Refine recommendations/Reading history/Clearing history

[원본 분석](<../../medium/flows/Home/Refine recommendations/Reading history/Clearing history/ANALYSIS.md>)

**원본 흐름 목적:** 기록이 있는 화면과 Clear history 이후 빈 상태를 비교한다.

확인 대화상자·처리 중 상태 없이 두 장만 수록됐다. 빈 상태는 관찰되지만 서버 삭제 범위는 미확인이다.

- **진입:** 읽기 기록이 있는 화면에서 시작한다.

- **종료:** 빈 기록 안내와 Explore CTA가 표시된다.

- **미수록 분기:** 확인창·취소·삭제 실패·재진입, 추천 데이터의 삭제 범위.

- **원본 해석:** 확인 대화상자·처리 중 상태 없이 두 장만 수록됐다. 빈 상태는 관찰되지만 서버 삭제 범위는 미확인이다.

- **FE 검토:** 일반 Medium 방문·Viewed·개별/전체 제거·취소/재시도 구현. A03/A07/A09 구분 필요. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ReadingHistoryList.tsx](<../../FE/src/features/reading-history/ReadingHistoryList.tsx>), [createReadingHistoryStore.ts](<../../FE/src/features/reading-history/createReadingHistoryStore.ts>), [RecommendationsNavigation.test.tsx](<../../FE/src/app/navigation/RecommendationsNavigation.test.tsx>), [ClapHistoryNavigation.test.tsx](<../../FE/src/app/navigation/ClapHistoryNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f15-01"></a>`T-F15-01` | [S190](REQUIREMENTS_08.md#s190) · [PNG](<../../medium/flows/Home/Refine recommendations/Reading history/Clearing history/screens/01_sc_f4bb3fa34f32466b9bd12eea57ea518f.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 읽기 기록 빈 상태 — 기록 목록 없음<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V12](../FE_MEDIUM_PARITY_BACKLOG.md#v12) |
| <a id="t-f15-02"></a>`T-F15-02` | [S045](REQUIREMENTS_02.md#s045) · [PNG](<../../medium/flows/Home/Refine recommendations/Reading history/Clearing history/screens/02_sc_3ab5043fa7b649908c6dde30faf290ab.png>) | 읽기 기록 목록 → 읽기 기록 빈 상태. 현재 관찰값: 읽은 글이 없다는 문구. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V12](../FE_MEDIUM_PARITY_BACKLOG.md#v12) |

<a id="f16"></a>

## F16 — Home/Story detail

[원본 분석](<../../medium/flows/Home/Story detail/ANALYSIS.md>)

**원본 흐름 목적:** 기사 상단·본문·말미 토픽·작가 소개·응답 미리보기·후속 추천을 읽기 순서로 분석한다.

멤버 전용 배지가 있지만 비회원 접근 제한 분기는 없다. 본문 강조의 소유자는 선택 과정이 없으면 확정하지 않는다.

- **진입:** Home에서 멤버 전용 기사 상세로 연결된다.

- **종료:** 본문·토픽·작가·응답 미리보기·동일 작가 다른 글까지 스크롤한다.

- **미수록 분기:** 비회원 게이트·삭제 글·네트워크 실패, 본문 링크·미리보기 응답 클릭 결과.

- **원본 해석:** 멤버 전용 배지가 있지만 비회원 접근 제한 분기는 없다. 본문 강조의 소유자는 선택 과정이 없으면 확정하지 않는다.

- **FE 검토:** 원본 기사의 본문/작가/토픽/관련글/반응 연결 구현. 발행 글 별도 경로 A01/A03. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ArticleDetailScreen.tsx](<../../FE/src/features/article/ArticleDetailScreen.tsx>), [ReferenceArticleView.tsx](<../../FE/src/features/article/ReferenceArticleView.tsx>), [ArticleRouteScreen.test.tsx](<../../FE/src/app/navigation/ArticleRouteScreen.test.tsx>), [ResponsesNavigation.test.tsx](<../../FE/src/app/navigation/ResponsesNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f16-01"></a>`T-F16-01` | [S026](REQUIREMENTS_02.md#s026) · [PNG](<../../medium/flows/Home/Story detail/screens/01_sc_1ef4e2f769774d2c958fcb38b96dc94f.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 기사 상세 상단 — 멤버 전용 기사 읽기 화면<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="t-f16-02"></a>`T-F16-02` | [S037](REQUIREMENTS_02.md#s037) · [PNG](<../../medium/flows/Home/Story detail/screens/02_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>) | 홈 피드 스크롤 상태 → 기사 상세 상단. 현재 관찰값: 5 min read, Apr 30 2025, Jordan Gibbs, 18K 박수·834 응답. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 기사 본문 스크롤 — 본문 중간 읽기<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="t-f16-03"></a>`T-F16-03` | [S189](REQUIREMENTS_08.md#s189) · [PNG](<../../medium/flows/Home/Story detail/screens/03_sc_f4b06612bdbf48ecbd8a7b6e2607d117.png>) | 기사 상세 상단 → 기사 본문 스크롤. 현재 관찰값: 여러 텍스트 강조 범위. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 기사 말미와 작성자 카드 — 기사 말미 도달<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="t-f16-04"></a>`T-F16-04` | [S147](REQUIREMENTS_06.md#s147) · [PNG](<../../medium/flows/Home/Story detail/screens/04_sc_c3fcf42b84be4b7298dfc138c224e241.png>) | 기사 본문 스크롤 → 기사 말미와 작성자 카드. 현재 관찰값: 10.2K followers·24 following. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 본문 아래 응답 미리보기 — 응답 일부 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="t-f16-05"></a>`T-F16-05` | [S175](REQUIREMENTS_07.md#s175) · [PNG](<../../medium/flows/Home/Story detail/screens/05_sc_e1a92b59829c4678b3362d2dc6abae59.png>) | 기사 말미와 작성자 카드 → 본문 아래 응답 미리보기. 현재 관찰값: Alex Smith, What are your thoughts?. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 응답 미리보기 끝 — 부분 응답 목록의 끝<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="t-f16-06"></a>`T-F16-06` | [S140](REQUIREMENTS_06.md#s140) · [PNG](<../../medium/flows/Home/Story detail/screens/06_sc_c068a6d42c5c48fb9d60c8af4adb446f.png>) | 본문 아래 응답 미리보기 → 응답 미리보기 끝. 현재 관찰값: Read more, See all responses. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 같은 작가의 추가 기사 — 읽기 후 작가 콘텐츠 추천<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="t-f16-07"></a>`T-F16-07` | [S102](REQUIREMENTS_05.md#s102) · [PNG](<../../medium/flows/Home/Story detail/screens/07_sc_92624aea551d44a7bbcf71d7d78aff4c.png>) | 응답 미리보기 끝 → 같은 작가의 추가 기사. 현재 관찰값: 기사별 날짜·박수·응답. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |

이전 기능 점검 발견 연결: A01 — [재현 근거·현재 범위](../FE_MEDIUM_PARITY_AUDIT.md#evidence).

<a id="f17"></a>

## F17 — Home/Story detail/Author detail

[원본 분석](<../../medium/flows/Home/Story detail/Author detail/ANALYSIS.md>)

**원본 흐름 목적:** 기사 작성자에서 프로필 Stories·Lists·About를 탐색하는 구조를 분석한다.

기사 말미 following 24와 프로필 25가 다르다. 조회 시점·데이터 차이를 단일 변경 이벤트로 설명하지 않는다.

- **진입:** 기사의 작가 정보에서 프로필로 연결된다.

- **종료:** Stories의 고정 글, Lists, About과 회원 시작 월을 비교한다.

- **미수록 분기:** 타인 비공개 목록, 팔로워 목록·고정 정렬, 외부 링크·비로그인 접근.

- **원본 해석:** 기사 말미 following 24와 프로필 25가 다르다. 조회 시점·데이터 차이를 단일 변경 이벤트로 설명하지 않는다.

- **FE 검토:** Stories/Lists/About·공개 발행·소유자/차단 상태 구현. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [PublicIdentityScreen.tsx](<../../FE/src/features/community/PublicIdentityScreen.tsx>), [CommunityNavigation.test.tsx](<../../FE/src/app/navigation/CommunityNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f17-01"></a>`T-F17-01` | [S037](REQUIREMENTS_02.md#s037) · [PNG](<../../medium/flows/Home/Story detail/Author detail/screens/01_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 작가 프로필 Stories — 고정 글 Pinned 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="t-f17-02"></a>`T-F17-02` | [S048](REQUIREMENTS_02.md#s048) · [PNG](<../../medium/flows/Home/Story detail/Author detail/screens/02_sc_3de359a1c13340968c4b733188faa6d1.png>) | 기사 상세 상단 → 작가 프로필 Stories. 현재 관찰값: Jordan Gibbs, 10.2K followers·25 following. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 작가 공개 리스트 — 작가 목록 탐색<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="t-f17-03"></a>`T-F17-03` | [S038](REQUIREMENTS_02.md#s038) · [PNG](<../../medium/flows/Home/Story detail/Author detail/screens/03_sc_334d50df678445baaa7ba445c96861ba.png>) | 작가 프로필 Stories → 작가 공개 리스트. 현재 관찰값: 2 stories·이미지 모음. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 작가 About — 소개·회원 이력 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="t-f17-04"></a>`T-F17-04` | [S083](REQUIREMENTS_04.md#s083) · [PNG](<../../medium/flows/Home/Story detail/Author detail/screens/04_sc_74429222aa3d45a89f1980b3aa0b6f9e.png>) | 작가 공개 리스트 → 작가 About. 현재 관찰값: Medium member since October 2023, Friend since December 2023. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |

<a id="f18"></a>

## F18 — Home/Story detail/Author detail/Blocking an author

[원본 분석](<../../medium/flows/Home/Story detail/Author detail/Blocking an author/ANALYSIS.md>)

**원본 흐름 목적:** 작가 메뉴의 차단, 성공 토스트, 후속 프로필 표시 변화를 비교한다.

후속 캡처의 팔로워 수·탭 구성도 달라졌다. 모든 차이를 차단 효과로 단정하지 않는다.

- **진입:** 작가 더보기의 Block author에서 시작한다.

- **종료:** Author blocked 뒤 글 목록이 보이고, 마지막 캡처는 Follow·Lists가 없다.

- **미수록 분기:** 차단 상대 계정에서 접근, 해제, 반응·멘션·저장 리스트 변화. 현재 공식 규칙과 캡처 불일치.

- **원본 해석:** 후속 캡처의 팔로워 수·탭 구성도 달라졌다. 모든 차이를 차단 효과로 단정하지 않는다.

- **FE 검토:** 차단/음소거/신고·확인/실패/해제 구현. Digest 정책 A02, 동적 사용자 관리 A08. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ModerationDialogs.tsx](<../../FE/src/features/moderation/ModerationDialogs.tsx>), [articleModeration.ts](<../../FE/src/features/moderation/articleModeration.ts>), [ModerationNavigation.test.tsx](<../../FE/src/app/navigation/ModerationNavigation.test.tsx>)

- **해석 주의:** 차단 토스트 뒤 카드가 남고 뒤 캡처의 탭/집계도 다르다. 현재 접근 제한 정책을 과거 원본의 관찰 결과라고 쓰지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f18-01"></a>`T-F18-01` | [S048](REQUIREMENTS_02.md#s048) · [PNG](<../../medium/flows/Home/Story detail/Author detail/Blocking an author/screens/01_sc_3de359a1c13340968c4b733188faa6d1.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 작가 더보기 액션 — 작가 관리 메뉴<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 차단 토스트 뒤 카드가 남고 뒤 캡처의 탭/집계도 다르다. 현재 접근 제한 정책을 과거 원본의 관찰 결과라고 쓰지 않는다. | [V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="t-f18-02"></a>`T-F18-02` | [S143](REQUIREMENTS_06.md#s143) · [PNG](<../../medium/flows/Home/Story detail/Author detail/Blocking an author/screens/02_sc_c25f22caf7cd49ba88c8611fb7480932.png>) | 작가 프로필 Stories → 작가 더보기 액션. 현재 관찰값: 추가 입력 없음. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 작가 차단 안내 — 차단 성공 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 차단 토스트 뒤 카드가 남고 뒤 캡처의 탭/집계도 다르다. 현재 접근 제한 정책을 과거 원본의 관찰 결과라고 쓰지 않는다. | [V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="t-f18-03"></a>`T-F18-03` | [S199](REQUIREMENTS_08.md#s199) · [PNG](<../../medium/flows/Home/Story detail/Author detail/Blocking an author/screens/03_sc_ff143e1e9b4d4e5ab0579b3fdc61dc1a.png>) | 작가 더보기 액션 → 작가 차단 안내. 현재 관찰값: 기사 목록은 그대로 보임. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 작가 프로필의 다른 캡처 상태 — 차단 흐름 후 별도 프로필 상태<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 차단 토스트 뒤 카드가 남고 뒤 캡처의 탭/집계도 다르다. 현재 접근 제한 정책을 과거 원본의 관찰 결과라고 쓰지 않는다. | [V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="t-f18-04"></a>`T-F18-04` | [S093](REQUIREMENTS_04.md#s093) · [PNG](<../../medium/flows/Home/Story detail/Author detail/Blocking an author/screens/04_sc_8208a84fba4c4046aa1d364055d14db7.png>) | 작가 차단 안내 → 작가 프로필의 다른 캡처 상태. 현재 관찰값: 10.8K followers, 25 following. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 차단 토스트 뒤 카드가 남고 뒤 캡처의 탭/집계도 다르다. 현재 접근 제한 정책을 과거 원본의 관찰 결과라고 쓰지 않는다. | [V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |

<a id="f19"></a>

## F19 — Home/Story detail/Author detail/Following an author

[원본 분석](<../../medium/flows/Home/Story detail/Author detail/Following an author/ANALYSIS.md>)

**원본 흐름 목적:** Follow 실행 후 성공 안내, 작가별 이메일 알림 메뉴, Following 상태를 확인한다.

Email notifications on은 캡처 선택값이다. 모든 계정의 최초 기본값이나 실제 발송을 증명하지 않는다.

- **진입:** 작가 프로필 Follow 상태에서 시작한다.

- **종료:** 성공 토스트, Following 상태와 이메일 알림 On/Off 메뉴가 나타난다.

- **미수록 분기:** 이메일 Off 적용·실제 수신·동시 팔로우·실패·재진입, 기본값 판정.

- **원본 해석:** Email notifications on은 캡처 선택값이다. 모든 계정의 최초 기본값이나 실제 발송을 증명하지 않는다.

- **FE 검토:** Follow/Unfollow·이메일 옵션·실패 복구 구현. 관리 목록 A08. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [FollowControl.tsx](<../../FE/src/features/community/FollowControl.tsx>), [CommunityNavigation.test.tsx](<../../FE/src/app/navigation/CommunityNavigation.test.tsx>)

- **해석 주의:** Email on은 그 캡처의 선택값이다. 모든 신규 follow의 기본값이라는 증거는 없다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f19-01"></a>`T-F19-01` | [S048](REQUIREMENTS_02.md#s048) · [PNG](<../../medium/flows/Home/Story detail/Author detail/Following an author/screens/01_sc_3de359a1c13340968c4b733188faa6d1.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 작가 팔로우 성공과 알림 메뉴 — 팔로우 성공 안내<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. Email on은 그 캡처의 선택값이다. 모든 신규 follow의 기본값이라는 증거는 없다. | [V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="t-f19-02"></a>`T-F19-02` | [S049](REQUIREMENTS_02.md#s049) · [PNG](<../../medium/flows/Home/Story detail/Author detail/Following an author/screens/02_sc_3ecf6d2988a6418fa4d2006fa4497b23.png>) | 작가 프로필 Stories → 작가 팔로우 성공과 알림 메뉴. 현재 관찰값: Email notifications on 체크. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 팔로우 설정 메뉴 — 팔로우 해제 진입점<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. Email on은 그 캡처의 선택값이다. 모든 신규 follow의 기본값이라는 증거는 없다. | [V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="t-f19-03"></a>`T-F19-03` | [S103](REQUIREMENTS_05.md#s103) · [PNG](<../../medium/flows/Home/Story detail/Author detail/Following an author/screens/03_sc_937a1fdc91724d1ca5cc41b1d43d5132.png>) | 작가 팔로우 성공과 알림 메뉴 → 팔로우 설정 메뉴. 현재 관찰값: Email notifications on 체크. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 팔로우된 작가 프로필 — 관계 설정 메뉴 닫힘<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. Email on은 그 캡처의 선택값이다. 모든 신규 follow의 기본값이라는 증거는 없다. | [V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="t-f19-04"></a>`T-F19-04` | [S025](REQUIREMENTS_01.md#s025) · [PNG](<../../medium/flows/Home/Story detail/Author detail/Following an author/screens/04_sc_1da36ea095e64ec0a5b6b9478b032524.png>) | 팔로우 설정 메뉴 → 팔로우된 작가 프로필. 현재 관찰값: 팔로우 상태 활성. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. Email on은 그 캡처의 선택값이다. 모든 신규 follow의 기본값이라는 증거는 없다. | [V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |

이전 기능 점검 발견 연결: A08 — [재현 근거·현재 범위](../FE_MEDIUM_PARITY_AUDIT.md#evidence).

<a id="f20"></a>

## F20 — Home/Story detail/Author detail/Following an author/Unfollowing an author

[원본 분석](<../../medium/flows/Home/Story detail/Author detail/Following an author/Unfollowing an author/ANALYSIS.md>)

**원본 흐름 목적:** Following 메뉴의 Unfollow에서 해제 토스트와 Follow 버튼 복귀를 확인한다.

이메일 알림·추천 피드가 실제로 중단되는지까지 재현하지 않았다.

- **진입:** Following 메뉴에서 Unfollow가 보인다.

- **종료:** 해제 토스트와 Follow 버튼으로 바뀐다.

- **미수록 분기:** 확인·취소·실패·재팔로우, 기존 이메일 구독과 설정 보존.

- **원본 해석:** 이메일 알림·추천 피드가 실제로 중단되는지까지 재현하지 않았다.

- **FE 검토:** Follow/Unfollow·이메일 옵션·실패 복구 구현. 관리 목록 A08. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [FollowControl.tsx](<../../FE/src/features/community/FollowControl.tsx>), [CommunityNavigation.test.tsx](<../../FE/src/app/navigation/CommunityNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f20-01"></a>`T-F20-01` | [S103](REQUIREMENTS_05.md#s103) · [PNG](<../../medium/flows/Home/Story detail/Author detail/Following an author/Unfollowing an author/screens/01_sc_937a1fdc91724d1ca5cc41b1d43d5132.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 팔로우 해제 안내 — 해제 성공 안내<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="t-f20-02"></a>`T-F20-02` | [S130](REQUIREMENTS_06.md#s130) · [PNG](<../../medium/flows/Home/Story detail/Author detail/Following an author/Unfollowing an author/screens/02_sc_b606d8b25cf248c28200cbfd24da865f.png>) | 팔로우 설정 메뉴 → 팔로우 해제 안내. 현재 관찰값: You unfollowed Jordan Gibbs. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |

<a id="f21"></a>

## F21 — Home/Story detail/Author detail/Following list

[원본 분석](<../../medium/flows/Home/Story detail/Author detail/Following list/ANALYSIS.md>)

**원본 흐름 목적:** 작가 프로필의 following 집계에서 관계 목록으로 이동하는 맥락을 확인한다.

목록 화면 자체에 소유자 제목이 없다. 관계 대상 목록과 내 계정의 Follow 버튼 상태를 구분한다.

- **진입:** 작가 프로필 다음에 관계 목록이 수록된다.

- **종료:** 사용자와 발행물 행의 Follow 컨트롤을 확인한다.

- **미수록 분기:** 목록 제목·선택한 집계 종류, 전체 25건·다음 페이지·팔로우 실행·빈 목록.

- **원본 해석:** 목록 화면 자체에 소유자 제목이 없다. 관계 대상 목록과 내 계정의 Follow 버튼 상태를 구분한다.

- **FE 검토:** 보관 관계 목록·내 관계 탐색 구현. A/B 대상 누락 A08; 원본 미확인 followers 명단은 제외. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ConnectionsScreen.tsx](<../../FE/src/features/community/ConnectionsScreen.tsx>), [CommunityNavigation.test.tsx](<../../FE/src/app/navigation/CommunityNavigation.test.tsx>)

- **해석 주의:** 직전 Home과 관계 목록 Explore의 선택 탭이 다르므로 단일 연속 이동으로 합치지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f21-01"></a>`T-F21-01` | [S048](REQUIREMENTS_02.md#s048) · [PNG](<../../medium/flows/Home/Story detail/Author detail/Following list/screens/01_sc_3de359a1c13340968c4b733188faa6d1.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 팔로잉 계정 목록 — 관계 목록 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 직전 Home과 관계 목록 Explore의 선택 탭이 다르므로 단일 연속 이동으로 합치지 않는다. | [V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="t-f21-02"></a>`T-F21-02` | [S090](REQUIREMENTS_04.md#s090) · [PNG](<../../medium/flows/Home/Story detail/Author detail/Following list/screens/02_sc_7c89f4496e7f4cb0b5c23b776080b6bf.png>) | 작가 프로필 Stories → 팔로잉 계정 목록. 현재 관찰값: 여러 사용자와 The Medium Blog 표시. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 직전 Home과 관계 목록 Explore의 선택 탭이 다르므로 단일 연속 이동으로 합치지 않는다. | [V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |

이전 기능 점검 발견 연결: A08 — [재현 근거·현재 범위](../FE_MEDIUM_PARITY_AUDIT.md#evidence).

<a id="f22"></a>

## F22 — Home/Story detail/Author detail/Muting an author

**Parity 6:** [이번 결과](../FE_MEDIUM_PARITY_06_RESULT.md)에서 D02 관련 현재 음소거 표시 정책을 검증했다. 이 흐름의 다른 단계·미수록 효과·원본 동일성 전체를 완료로 승격하지 않는다.

[원본 분석](<../../medium/flows/Home/Story detail/Author detail/Muting an author/ANALYSIS.md>)

**원본 흐름 목적:** 작가 더보기의 Mute author와 완료 토스트를 확인한다.

시작은 Follow, 결과는 Following으로 표시되어 관계 변경의 중간 과정이 빠져 있다. 음소거가 자동 팔로우를 만든다고 해석하지 않는다.

- **진입:** 작가 더보기의 Mute author에서 시작한다.

- **종료:** Author muted 토스트와 프로필 글 목록이 보인다. 앞뒤 Follow/Following이 다르다.

- **미수록 분기:** Muted 관리 목록·음소거 해제·새 피드/Digest 확인·실제 알림.

- **원본 해석:** 시작은 Follow, 결과는 Following으로 표시되어 관계 변경의 중간 과정이 빠져 있다. 음소거가 자동 팔로우를 만든다고 해석하지 않는다.

- **FE 검토:** 차단/음소거/신고·확인/실패/해제 구현. Digest 정책 A02, 동적 사용자 관리 A08. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ModerationDialogs.tsx](<../../FE/src/features/moderation/ModerationDialogs.tsx>), [articleModeration.ts](<../../FE/src/features/moderation/articleModeration.ts>), [ModerationNavigation.test.tsx](<../../FE/src/app/navigation/ModerationNavigation.test.tsx>)

- **해석 주의:** 전후 Follow/Following 차이를 mute가 follow를 생성한 결과로 해석하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f22-01"></a>`T-F22-01` | [S048](REQUIREMENTS_02.md#s048) · [PNG](<../../medium/flows/Home/Story detail/Author detail/Muting an author/screens/01_sc_3de359a1c13340968c4b733188faa6d1.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 작가 더보기 액션 — 작가 관리 메뉴<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 전후 Follow/Following 차이를 mute가 follow를 생성한 결과로 해석하지 않는다. | [V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="t-f22-02"></a>`T-F22-02` | [S143](REQUIREMENTS_06.md#s143) · [PNG](<../../medium/flows/Home/Story detail/Author detail/Muting an author/screens/02_sc_c25f22caf7cd49ba88c8611fb7480932.png>) | 작가 프로필 Stories → 작가 더보기 액션. 현재 관찰값: 추가 입력 없음. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 작가 음소거 안내 — 음소거 성공 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 전후 Follow/Following 차이를 mute가 follow를 생성한 결과로 해석하지 않는다. | [V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="t-f22-03"></a>`T-F22-03` | [S152](REQUIREMENTS_07.md#s152) · [PNG](<../../medium/flows/Home/Story detail/Author detail/Muting an author/screens/03_sc_c8b24e7669734e74922bee69b751350b.png>) | 작가 더보기 액션 → 작가 음소거 안내. 현재 관찰값: 기사 목록 계속 표시. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 전후 Follow/Following 차이를 mute가 follow를 생성한 결과로 해석하지 않는다. | [V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |

이전 기능 점검 발견 연결: A02, A08 — [재현 근거·현재 범위](../FE_MEDIUM_PARITY_AUDIT.md#evidence).

<a id="f23"></a>

## F23 — Home/Story detail/Author detail/Reporting an author

[원본 분석](<../../medium/flows/Home/Story detail/Author detail/Reporting an author/ANALYSIS.md>)

**원본 흐름 목적:** 신고 사유·선택적 차단·필수 선택에 따른 버튼 활성화와 접수 토스트를 확인한다.

Spam 선택 후 제출하며 추가 차단은 체크하지 않았다. 신고 접수가 제재 완료를 뜻하지 않는다.

- **진입:** 작가 더보기의 Report author에서 시작한다.

- **종료:** Spam 선택 후 신고 성공 토스트. Also block은 미체크다.

- **미수록 분기:** 나머지 사유·동시 차단·권리 침해 분기·닫기·중복·접수 실패·제재 결과.

- **원본 해석:** Spam 선택 후 제출하며 추가 차단은 체크하지 않았다. 신고 접수가 제재 완료를 뜻하지 않는다.

- **FE 검토:** 차단/음소거/신고·확인/실패/해제 구현. Digest 정책 A02, 동적 사용자 관리 A08. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ModerationDialogs.tsx](<../../FE/src/features/moderation/ModerationDialogs.tsx>), [articleModeration.ts](<../../FE/src/features/moderation/articleModeration.ts>), [ModerationNavigation.test.tsx](<../../FE/src/app/navigation/ModerationNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f23-01"></a>`T-F23-01` | [S048](REQUIREMENTS_02.md#s048) · [PNG](<../../medium/flows/Home/Story detail/Author detail/Reporting an author/screens/01_sc_3de359a1c13340968c4b733188faa6d1.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 작가 더보기 액션 — 작가 관리 메뉴<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V14](../FE_MEDIUM_PARITY_BACKLOG.md#v14) |
| <a id="t-f23-02"></a>`T-F23-02` | [S143](REQUIREMENTS_06.md#s143) · [PNG](<../../medium/flows/Home/Story detail/Author detail/Reporting an author/screens/02_sc_c25f22caf7cd49ba88c8611fb7480932.png>) | 작가 프로필 Stories → 작가 더보기 액션. 현재 관찰값: 추가 입력 없음. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 사용자 신고 사유 선택 — 신고 입력 전<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="t-f23-03"></a>`T-F23-03` | [S161](REQUIREMENTS_07.md#s161) · [PNG](<../../medium/flows/Home/Story detail/Author detail/Reporting an author/screens/03_sc_d07b03740ecc44328719d4d21703bb06.png>) | 작가 더보기 액션 → 사용자 신고 사유 선택. 현재 관찰값: Spam·Harassment·Rules violation·AI-generated 모두 미선택, 차단 미체크. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 신고 사유 선택 완료 — 신고 제출 준비<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="t-f23-04"></a>`T-F23-04` | [S127](REQUIREMENTS_06.md#s127) · [PNG](<../../medium/flows/Home/Story detail/Author detail/Reporting an author/screens/04_sc_af0ecdded03643ca8cea85ec5341d906.png>) | 사용자 신고 사유 선택 → 신고 사유 선택 완료. 현재 관찰값: Spam 선택·차단 미체크. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 사용자 신고 성공 안내 — 신고 접수 성공 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |
| <a id="t-f23-05"></a>`T-F23-05` | [S170](REQUIREMENTS_07.md#s170) · [PNG](<../../medium/flows/Home/Story detail/Author detail/Reporting an author/screens/05_sc_d9ba56fa632249c7908f15a8e3082d97.png>) | 신고 사유 선택 완료 → 사용자 신고 성공 안내. 현재 관찰값: Successfully reported user. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V15](../FE_MEDIUM_PARITY_BACKLOG.md#v15) |

<a id="f24"></a>

## F24 — Home/Story detail/Changing display

[원본 분석](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>)

**원본 흐름 목적:** 글자 크기 100→120%, 시스템 테마→Dark, 타인 하이라이트 끄기와 본문 결과를 확인한다.

Font family 컨트롤은 보이나 선택 목록은 수록되지 않았다. 본인 하이라이트 삭제와 표시 숨김을 구분한다.

- **진입:** 기사 더보기의 Display settings에서 시작한다.

- **종료:** 100→120%, System→Dark, 타인 하이라이트 On→Off 뒤 본문을 확인한다.

- **미수록 분기:** 글꼴 옵션·크기 경계·OS 글자 크기·System 테마 연동·재진입·설정 동기화.

- **원본 해석:** Font family 컨트롤은 보이나 선택 목록은 수록되지 않았다. 본인 하이라이트 삭제와 표시 숨김을 구분한다.

- **FE 검토:** 기사 크기/글꼴/테마/타인 강조 설정 구현. 작성 글 A03, 증거 문구 A06. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ArticleDisplayPopover.tsx](<../../FE/src/features/settings/ArticleDisplayPopover.tsx>), [useReaderTypography.ts](<../../FE/src/features/settings/useReaderTypography.ts>), [DisplayNavigation.test.tsx](<../../FE/src/app/navigation/DisplayNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f24-01"></a>`T-F24-01` | [S037](REQUIREMENTS_02.md#s037) · [PNG](<../../medium/flows/Home/Story detail/Changing display/screens/01_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 기사 더보기 메뉴 — 읽기·추천·작가·신고 행동<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="t-f24-02"></a>`T-F24-02` | [S168](REQUIREMENTS_07.md#s168) · [PNG](<../../medium/flows/Home/Story detail/Changing display/screens/02_sc_d62e32234117483b85b4c73ed63249cd.png>) | 기사 상세 상단 → 기사 더보기 메뉴. 현재 관찰값: 추가 입력 없음. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 읽기 표시 설정 기본 — 이 캡처의 현재 표시 설정: 100%, Default 글꼴, System default (Light), 타인 하이라이트 On. 제품 전체 초기 기본값 여부는 미확인.<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="t-f24-03"></a>`T-F24-03` | [S063](REQUIREMENTS_03.md#s063) · [PNG](<../../medium/flows/Home/Story detail/Changing display/screens/03_sc_557c1fb7c6bf4dcc82ba1d6aba677f94.png>) | 기사 더보기 메뉴 → 읽기 표시 설정 기본. 현재 관찰값: 100%, Font Default, System default (Light), Highlights from others 켜짐. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 글자 크기 확대 — 크기 변경이 화면에 반영<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="t-f24-04"></a>`T-F24-04` | [S125](REQUIREMENTS_05.md#s125) · [PNG](<../../medium/flows/Home/Story detail/Changing display/screens/04_sc_ad140eae0b7e409aa2204c1f36bfa385.png>) | 읽기 표시 설정 기본 → 글자 크기 확대. 현재 관찰값: 120%. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 읽기 테마 선택 — 테마 선택 중<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="t-f24-05"></a>`T-F24-05` | [S119](REQUIREMENTS_05.md#s119) · [PNG](<../../medium/flows/Home/Story detail/Changing display/screens/05_sc_a5d80c9e0226452cbb67e018702c5f1b.png>) | 글자 크기 확대 → 읽기 테마 선택. 현재 관찰값: System default 체크. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 다크 테마 적용 — 다크 테마 반영<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="t-f24-06"></a>`T-F24-06` | [S198](REQUIREMENTS_08.md#s198) · [PNG](<../../medium/flows/Home/Story detail/Changing display/screens/06_sc_fd7de1ebfba14fbca6ddbe3ff642c42c.png>) | 읽기 테마 선택 → 다크 테마 적용. 현재 관찰값: Dark, 120%, 타인 하이라이트 켜짐. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 타인 하이라이트 숨김 — 타인 하이라이트 표시 설정 변경<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="t-f24-07"></a>`T-F24-07` | [S001](REQUIREMENTS_01.md#s001) · [PNG](<../../medium/flows/Home/Story detail/Changing display/screens/07_sc_00409287a68f4416941e39326f6df6b9.png>) | 다크 테마 적용 → 타인 하이라이트 숨김. 현재 관찰값: Highlights from others 꺼짐. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 설정 닫힌 다크 기사 — 표시 설정 적용 결과<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V16](../FE_MEDIUM_PARITY_BACKLOG.md#v16) |
| <a id="t-f24-08"></a>`T-F24-08` | [S187](REQUIREMENTS_08.md#s187) · [PNG](<../../medium/flows/Home/Story detail/Changing display/screens/08_sc_ee957cf03e9848948f9ec8189264d8d8.png>) | 타인 하이라이트 숨김 → 설정 닫힌 다크 기사. 현재 관찰값: 120% 설정 후 제목 3줄. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 다크 기사 본문 — 스크롤 중 읽기 UI<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="t-f24-09"></a>`T-F24-09` | [S164](REQUIREMENTS_07.md#s164) · [PNG](<../../medium/flows/Home/Story detail/Changing display/screens/09_sc_d1d05d6500f349d89c5a3e5646ff238b.png>) | 설정 닫힌 다크 기사 → 다크 기사 본문. 현재 관찰값: 본문 이미지의 밝은 배경 유지. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |

이전 기능 점검 발견 연결: A03, A06 — [재현 근거·현재 범위](../FE_MEDIUM_PARITY_AUDIT.md#evidence).

<a id="f25"></a>

## F25 — Home/Story detail/Highlighting a phrase

[원본 분석](<../../medium/flows/Home/Story detail/Highlighting a phrase/ANALYSIS.md>)

**원본 흐름 목적:** 본문 구절 선택과 Highlight 이후 강조 유지 상태를 확인한다.

본문의 기존 강조와 새로 선택한 강조를 구분한다. 강조 공개 범위는 공식 설명과 대조한다.

- **진입:** 본문의 선택 가능한 텍스트에서 시작한다.

- **종료:** 선택 핸들·Highlight 메뉴 뒤 구절의 녹색 강조가 남는다.

- **미수록 분기:** 강조 제거·겹침·원문 수정/삭제·동기화·타인 노출, Share/더보기 실행.

- **원본 해석:** 본문의 기존 강조와 새로 선택한 강조를 구분한다. 강조 공개 범위는 공식 설명과 대조한다.

- **FE 검토:** web 구절 선택/강조·삭제·Library 연결 구현. native 별도 구절 선택 UI 차이는 유지. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [PassageReader.tsx](<../../FE/src/features/highlights/PassageReader.tsx>), [NativePassagePicker.tsx](<../../FE/src/features/highlights/NativePassagePicker.tsx>), [HighlightsNavigation.test.tsx](<../../FE/src/app/navigation/HighlightsNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f25-01"></a>`T-F25-01` | [S189](REQUIREMENTS_08.md#s189) · [PNG](<../../medium/flows/Home/Story detail/Highlighting a phrase/screens/01_sc_f4b06612bdbf48ecbd8a7b6e2607d117.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 본문 구절 선택 — 텍스트 선택 상태<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="t-f25-02"></a>`T-F25-02` | [S122](REQUIREMENTS_05.md#s122) · [PNG](<../../medium/flows/Home/Story detail/Highlighting a phrase/screens/02_sc_a8112b7354bb44908f9359e95ba3c288.png>) | 기사 본문 스크롤 → 본문 구절 선택. 현재 관찰값: 여러 줄 텍스트 선택. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 구절 하이라이트 반영 — 하이라이트 적용 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V17](../FE_MEDIUM_PARITY_BACKLOG.md#v17) |
| <a id="t-f25-03"></a>`T-F25-03` | [S012](REQUIREMENTS_01.md#s012) · [PNG](<../../medium/flows/Home/Story detail/Highlighting a phrase/screens/03_sc_0da01c48dbc9483798e4c2286a11237f.png>) | 본문 구절 선택 → 구절 하이라이트 반영. 현재 관찰값: 선택했던 구절 강조. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V17](../FE_MEDIUM_PARITY_BACKLOG.md#v17) |

<a id="f26"></a>

## F26 — Home/Story detail/Listening to a story

[원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/ANALYSIS.md>)

**원본 흐름 목적:** 기사 듣기 진입, 로딩, 미니 플레이어, 확장 플레이어와 재생 진행을 분석한다.

실제 음성은 듣지 않았다. 경과 시간 차이만으로 30초 건너뛰기 실행을 단정하지 않는다.

- **진입:** 기사 상단 재생 컨트롤에서 시작한다.

- **종료:** 로딩 → 미니 플레이어 → 확장 플레이어와 증가한 시각을 확인한다.

- **미수록 분기:** 일시정지·닫기·스크럽·백그라운드·오프라인·재생 실패·권한 게이트·재생 큐.

- **원본 해석:** 실제 음성은 듣지 않았다. 경과 시간 차이만으로 30초 건너뛰기 실행을 단정하지 않는다.

- **FE 검토:** mock 재생/정지/seek/배속/음성/메뉴 구현. 실제 TTS/AirPlay/background 및 큐 범위 제외. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ListeningPlayer.tsx](<../../FE/src/features/listening/ListeningPlayer.tsx>), [ListeningSpeedPanel.tsx](<../../FE/src/features/listening/ListeningSpeedPanel.tsx>), [ListeningVoicePanel.tsx](<../../FE/src/features/listening/ListeningVoicePanel.tsx>), [ListeningNavigation.test.tsx](<../../FE/src/app/navigation/ListeningNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f26-01"></a>`T-F26-01` | [S037](REQUIREMENTS_02.md#s037) · [PNG](<../../medium/flows/Home/Story detail/Listening to a story/screens/01_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 오디오 로딩 — 오디오 준비 중<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="t-f26-02"></a>`T-F26-02` | [S128](REQUIREMENTS_06.md#s128) · [PNG](<../../medium/flows/Home/Story detail/Listening to a story/screens/02_sc_b43c7474098746baa684870217c28927.png>) | 기사 상세 상단 → 오디오 로딩. 현재 관찰값: 작가·기사 제목·커버. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 미니 플레이어 재생 상태 — 재생 중을 나타내는 UI<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="t-f26-03"></a>`T-F26-03` | [S050](REQUIREMENTS_02.md#s050) · [PNG](<../../medium/flows/Home/Story detail/Listening to a story/screens/03_sc_40448a752ea64391a724af01b1e050f1.png>) | 오디오 로딩 → 미니 플레이어 재생 상태. 현재 관찰값: 동일 기사. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 확장 오디오 플레이어 — 확장 재생 화면<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="t-f26-04"></a>`T-F26-04` | [S055](REQUIREMENTS_03.md#s055) · [PNG](<../../medium/flows/Home/Story detail/Listening to a story/screens/04_sc_45ddcc1f43a54523a1314ce563abf5ee.png>) | 미니 플레이어 재생 상태 → 확장 오디오 플레이어. 현재 관찰값: 00:05, -04:35, 1x. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 재생 진행 상태 — 재생 위치 증가<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="t-f26-05"></a>`T-F26-05` | [S160](REQUIREMENTS_07.md#s160) · [PNG](<../../medium/flows/Home/Story detail/Listening to a story/screens/05_sc_d035c7d2bcfe4d0f99df80fddecebdcd.png>) | 확장 오디오 플레이어 → 재생 진행 상태. 현재 관찰값: 00:40, -04:00, 1x. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |

<a id="f27"></a>

## F27 — Home/Story detail/Listening to a story/Changing playback speed

[원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/ANALYSIS.md>)

**원본 흐름 목적:** 세로 속도 조절에서 1x를 2.5x로 바꾸고 플레이어 표기를 확인한다.

WPM과 생산성 안내는 화면 표시값이다. 재생 위치가 달라진 원인과 정확한 시간 환산식은 미확인이다.

- **진입:** 확장 플레이어의 1x 상태에서 시작한다.

- **종료:** 1x/200 WPM에서 2.5x/490 WPM으로 선택한 뒤 플레이어에 2.5x가 표시된다.

- **미수록 분기:** 최소·최대·증분·취소·다른 글/재진입 유지, 실제 발화 속도.

- **원본 해석:** WPM과 생산성 안내는 화면 표시값이다. 재생 위치가 달라진 원인과 정확한 시간 환산식은 미확인이다.

- **FE 검토:** mock 재생/정지/seek/배속/음성/메뉴 구현. 실제 TTS/AirPlay/background 및 큐 범위 제외. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ListeningPlayer.tsx](<../../FE/src/features/listening/ListeningPlayer.tsx>), [ListeningSpeedPanel.tsx](<../../FE/src/features/listening/ListeningSpeedPanel.tsx>), [ListeningVoicePanel.tsx](<../../FE/src/features/listening/ListeningVoicePanel.tsx>), [ListeningNavigation.test.tsx](<../../FE/src/app/navigation/ListeningNavigation.test.tsx>)

- **해석 주의:** 1x/200와2.5x/490의 WPM,145% 문구를 관찰값으로 보존한다. 정확한 환산식을 추정하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f27-01"></a>`T-F27-01` | [S055](REQUIREMENTS_03.md#s055) · [PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/screens/01_sc_45ddcc1f43a54523a1314ce563abf5ee.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 재생 속도 선택 초기 — 현재 속도 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 1x/200와2.5x/490의 WPM,145% 문구를 관찰값으로 보존한다. 정확한 환산식을 추정하지 않는다. | [V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="t-f27-02"></a>`T-F27-02` | [S016](REQUIREMENTS_01.md#s016) · [PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/screens/02_sc_1965b9529b534e1597968039af1415b1.png>) | 확장 오디오 플레이어 → 재생 속도 선택 초기. 현재 관찰값: 1x, 200 WPM. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 재생 속도 2.5배 선택 — 변경값 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 1x/200와2.5x/490의 WPM,145% 문구를 관찰값으로 보존한다. 정확한 환산식을 추정하지 않는다. | [V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="t-f27-03"></a>`T-F27-03` | [S131](REQUIREMENTS_06.md#s131) · [PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/screens/03_sc_b6f46f91fdc549b790b4e9c1a434afae.png>) | 재생 속도 선택 초기 → 재생 속도 2.5배 선택. 현재 관찰값: 2.5x, 490 WPM, 145% productivity boost. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 2.5배 재생 표시 — 배속 변경 반영<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 1x/200와2.5x/490의 WPM,145% 문구를 관찰값으로 보존한다. 정확한 환산식을 추정하지 않는다. | [V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="t-f27-04"></a>`T-F27-04` | [S141](REQUIREMENTS_06.md#s141) · [PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/screens/04_sc_c0fd5f5f29594fb997865177863b9482.png>) | 재생 속도 2.5배 선택 → 2.5배 재생 표시. 현재 관찰값: 2.5x, 00:10, -01:44. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 1x/200와2.5x/490의 WPM,145% 문구를 관찰값으로 보존한다. 정확한 환산식을 추정하지 않는다. | [V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |

<a id="f28"></a>

## F28 — Home/Story detail/Listening to a story/Changing voice

[원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>)

**원본 흐름 목적:** 플레이어에서 언어별 음성 목록을 열어 Hans를 선택하고 복귀한다.

한국어 음성 선택지가 있어도 기사 자동 번역이나 한국어 본문 지원의 증거가 아니다.

- **진입:** 플레이어의 Select a voice 메뉴에서 시작한다.

- **종료:** Emma 선택 → Hans 선택 → 플레이어 복귀가 수록된다. 실제 음성은 듣지 않았다.

- **미수록 분기:** 음성 검색·미리 듣기·실패·재진입 유지, 본문 언어와 번역 지원 구분.

- **원본 해석:** 한국어 음성 선택지가 있어도 기사 자동 번역이나 한국어 본문 지원의 증거가 아니다.

- **FE 검토:** mock 재생/정지/seek/배속/음성/메뉴 구현. 실제 TTS/AirPlay/background 및 큐 범위 제외. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ListeningPlayer.tsx](<../../FE/src/features/listening/ListeningPlayer.tsx>), [ListeningSpeedPanel.tsx](<../../FE/src/features/listening/ListeningSpeedPanel.tsx>), [ListeningVoicePanel.tsx](<../../FE/src/features/listening/ListeningVoicePanel.tsx>), [ListeningNavigation.test.tsx](<../../FE/src/app/navigation/ListeningNavigation.test.tsx>)

- **해석 주의:** 별도 배속 흐름의2.5x와 음성 흐름의1x를 음성 변경에 의한 자동 초기화로 연결하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f28-01"></a>`T-F28-01` | [S055](REQUIREMENTS_03.md#s055) · [PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/01_sc_45ddcc1f43a54523a1314ce563abf5ee.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 플레이어 더보기 — 음성·출력·콘텐츠 행동 메뉴<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 별도 배속 흐름의2.5x와 음성 흐름의1x를 음성 변경에 의한 자동 초기화로 연결하지 않는다. | [V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |
| <a id="t-f28-02"></a>`T-F28-02` | [S003](REQUIREMENTS_01.md#s003) · [PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/02_sc_0414c81870534989959d677ecede926c.png>) | 확장 오디오 플레이어 → 플레이어 더보기. 현재 관찰값: 현재 1x. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 음성 선택 목록 — Emma가 현재 선택된 음성 목록. 모든 계정의 기본 음성이라는 의미는 아니다.<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 별도 배속 흐름의2.5x와 음성 흐름의1x를 음성 변경에 의한 자동 초기화로 연결하지 않는다. | [V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="t-f28-03"></a>`T-F28-03` | [S046](REQUIREMENTS_02.md#s046) · [PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/03_sc_3b3db04094fe4a189b31e66c28971bcd.png>) | 플레이어 더보기 → 음성 선택 목록. 현재 관찰값: Emma 선택, Matthew·Salli 등. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 언어별 음성 목록 스크롤 — 다국어 음성 선택지 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 별도 배속 흐름의2.5x와 음성 흐름의1x를 음성 변경에 의한 자동 초기화로 연결하지 않는다. | [V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="t-f28-04"></a>`T-F28-04` | [S154](REQUIREMENTS_07.md#s154) · [PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/04_sc_ca2321d6dc9142e5a97e2734260c2b0f.png>) | 음성 선택 목록 → 언어별 음성 목록 스크롤. 현재 관찰값: 한국어 Seoyeon 등. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: Hans 음성 선택 — 음성 선택 변경<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 별도 배속 흐름의2.5x와 음성 흐름의1x를 음성 변경에 의한 자동 초기화로 연결하지 않는다. | [V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="t-f28-05"></a>`T-F28-05` | [S088](REQUIREMENTS_04.md#s088) · [PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/05_sc_78bee192bd2041a98f6721240f2352d5.png>) | 언어별 음성 목록 스크롤 → Hans 음성 선택. 현재 관찰값: Hans 선택. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 음성 선택 후 플레이어 — 재생 UI 복귀<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 별도 배속 흐름의2.5x와 음성 흐름의1x를 음성 변경에 의한 자동 초기화로 연결하지 않는다. | [V19](../FE_MEDIUM_PARITY_BACKLOG.md#v19) |
| <a id="t-f28-06"></a>`T-F28-06` | [S192](REQUIREMENTS_08.md#s192) · [PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/06_sc_f637c648d6ec470a81cf77e5594e02da.png>) | Hans 음성 선택 → 음성 선택 후 플레이어. 현재 관찰값: 1x, 00:20, -04:27. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 별도 배속 흐름의2.5x와 음성 흐름의1x를 음성 변경에 의한 자동 초기화로 연결하지 않는다. | [V18](../FE_MEDIUM_PARITY_BACKLOG.md#v18) |

<a id="f29"></a>

## F29 — Home/Story detail/Responding to a phrase

[원본 분석](<../../medium/flows/Home/Story detail/Responding to a phrase/ANALYSIS.md>)

**원본 흐름 목적:** 선택 구절을 인용 카드로 붙여 응답을 작성·등록하는 흐름을 분석한다.

인용 원문과 작성 응답이 별도로 보인다. 원문 수정 후 앵커 유지나 전체 응답 수 갱신은 미확인이다.

- **진입:** 본문 선택 메뉴의 Respond 분기다.

- **종료:** 빈 본문에서는 회색 전송, 입력 뒤 검은 전송, 결과에는 인용과 YOU 응답이 함께 표시된다.

- **미수록 분기:** 인용 제거·길이 제한·원문 연결·Cancel·중복·실패, 총수 갱신.

- **원본 해석:** 인용 원문과 작성 응답이 별도로 보인다. 원문 수정 후 앵커 유지나 전체 응답 수 갱신은 미확인이다.

- **FE 검토:** 인용/작성/수정/삭제/답글/정렬/정책/관리 구현. 정책 전문 대신 발췌+링크 차이는 명시됨. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesNavigation.test.tsx](<../../FE/src/app/navigation/ResponsesNavigation.test.tsx>)

- **해석 주의:** 인용 응답 후834 유지와 등록 UI를 구분한다. 테스트를 맞추기 위해 운영 집계를 고정하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f29-01"></a>`T-F29-01` | [S122](REQUIREMENTS_05.md#s122) · [PNG](<../../medium/flows/Home/Story detail/Responding to a phrase/screens/01_sc_a8112b7354bb44908f9359e95ba3c288.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 구절 인용 응답 작성 시작 — 인용 포함 응답 초안<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 인용 응답 후834 유지와 등록 UI를 구분한다. 테스트를 맞추기 위해 운영 집계를 고정하지 않는다. | [V17](../FE_MEDIUM_PARITY_BACKLOG.md#v17) |
| <a id="t-f29-02"></a>`T-F29-02` | [S097](REQUIREMENTS_04.md#s097) · [PNG](<../../medium/flows/Home/Story detail/Responding to a phrase/screens/02_sc_8accfd977771416a89329576c7ba48d8.png>) | 본문 구절 선택 → 구절 인용 응답 작성 시작. 현재 관찰값: 인용 문구 자동 포함, 본문 빈값. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 구절 응답 입력 — 인용 응답 제출 준비<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 인용 응답 후834 유지와 등록 UI를 구분한다. 테스트를 맞추기 위해 운영 집계를 고정하지 않는다. | [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="t-f29-03"></a>`T-F29-03` | [S019](REQUIREMENTS_01.md#s019) · [PNG](<../../medium/flows/Home/Story detail/Responding to a phrase/screens/03_sc_1b7c2e5f28d5419d889919fc0c9e3980.png>) | 구절 인용 응답 작성 시작 → 구절 응답 입력. 현재 관찰값: Can't agree more!. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 구절 인용 응답 등록 — 인용 응답 목록에 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 인용 응답 후834 유지와 등록 UI를 구분한다. 테스트를 맞추기 위해 운영 집계를 고정하지 않는다. | [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="t-f29-04"></a>`T-F29-04` | [S197](REQUIREMENTS_08.md#s197) · [PNG](<../../medium/flows/Home/Story detail/Responding to a phrase/screens/04_sc_fcdcd471caeb41b8bfa89273d8e29a8d.png>) | 구절 응답 입력 → 구절 인용 응답 등록. 현재 관찰값: Now, 총수 834 유지. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 인용 응답 후834 유지와 등록 UI를 구분한다. 테스트를 맞추기 위해 운영 집계를 고정하지 않는다. | [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |

<a id="f30"></a>

## F30 — Home/Story detail/Responses

[원본 분석](<../../medium/flows/Home/Story detail/Responses/ANALYSIS.md>)

**원본 흐름 목적:** 기사 응답 시트와 정렬 컨트롤, 중첩 답글·긴 응답·추가 답글 표시를 살핀다.

다단계 들여쓰기가 보이나 허용 최대 깊이는 알 수 없다. 834가 답글까지 포함하는 총수인지도 미확인이다.

- **진입:** 기사 하단 응답 진입에서 시작한다.

- **종료:** Most Relevant 목록에 응답과 여러 깊이의 답글이 보인다.

- **미수록 분기:** 응답 0건·닫힌 토론·숨겨진 응답·로그인 필요 상태, 최대 깊이·더 보기 실패.

- **원본 해석:** 다단계 들여쓰기가 보이나 허용 최대 깊이는 알 수 없다. 834가 답글까지 포함하는 총수인지도 미확인이다.

- **FE 검토:** 인용/작성/수정/삭제/답글/정렬/정책/관리 구현. 정책 전문 대신 발췌+링크 차이는 명시됨. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesNavigation.test.tsx](<../../FE/src/app/navigation/ResponsesNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f30-01"></a>`T-F30-01` | [S037](REQUIREMENTS_02.md#s037) · [PNG](<../../medium/flows/Home/Story detail/Responses/screens/01_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 응답 시트와 중첩 답글 — 복수 깊이 답글 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="t-f30-02"></a>`T-F30-02` | [S100](REQUIREMENTS_04.md#s100) · [PNG](<../../medium/flows/Home/Story detail/Responses/screens/02_sc_915888473ac24e8987c996b8954f54c6.png>) | 기사 상세 상단 → 응답 시트와 중첩 답글. 현재 관찰값: 하단 빈 작성창. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 응답 스크롤과 추가 답글 — 접힌 본문·부분 로딩 답글<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="t-f30-03"></a>`T-F30-03` | [S112](REQUIREMENTS_05.md#s112) · [PNG](<../../medium/flows/Home/Story detail/Responses/screens/03_sc_9c9af2f5f8ad43c193c0c30ef0974156.png>) | 응답 시트와 중첩 답글 → 응답 스크롤과 추가 답글. 현재 관찰값: See more replies (4). 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |

<a id="f31"></a>

## F31 — Home/Story detail/Responses/Commenting a story

[원본 분석](<../../medium/flows/Home/Story detail/Responses/Commenting a story/ANALYSIS.md>)

**원본 흐름 목적:** 응답 입력·전송 후 YOU 응답과 총수 변화를 확인한다.

진입 캡처는 834, 입력 시 832, 등록 후 833이다. 832→833 구간만 대응시키고 전체 수의 차이를 하나의 작업으로 설명하지 않는다.

- **진입:** Responses 목록에서 새 응답 작성창에 진입한다.

- **종료:** 832 표시의 입력 화면 뒤 YOU 응답과 833이 나타난다. 첫 목록은 834로 다르다.

- **미수록 분기:** 빈값·문자 초과·중복 제출·실패·닫기 시 입력 보존, 토론 닫힘.

- **원본 해석:** 진입 캡처는 834, 입력 시 832, 등록 후 833이다. 832→833 구간만 대응시키고 전체 수의 차이를 하나의 작업으로 설명하지 않는다.

- **FE 검토:** 인용/작성/수정/삭제/답글/정렬/정책/관리 구현. 정책 전문 대신 발췌+링크 차이는 명시됨. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesNavigation.test.tsx](<../../FE/src/app/navigation/ResponsesNavigation.test.tsx>)

- **해석 주의:** 834→832→833 전체를 하나의 댓글 증가 과정으로 설명하지 않는다. 입력전후832→833만 관찰된 구간이다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f31-01"></a>`T-F31-01` | [S100](REQUIREMENTS_04.md#s100) · [PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/screens/01_sc_915888473ac24e8987c996b8954f54c6.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 기사 응답 입력 — 응답 제출 전<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 834→832→833 전체를 하나의 댓글 증가 과정으로 설명하지 않는다. 입력전후832→833만 관찰된 구간이다. | [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="t-f31-02"></a>`T-F31-02` | [S158](REQUIREMENTS_07.md#s158) · [PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/screens/02_sc_cebfd0ad696f4e20a1c7d99da1dc1cef.png>) | 응답 시트와 중첩 답글 → 기사 응답 입력. 현재 관찰값: Loved this kind of story 입력, Responses 832. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 새 응답 표시 — Responses 833 및 본인 새 응답 표시. Commenting a story 흐름의 직전 입력 화면에서는 832였다<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 834→832→833 전체를 하나의 댓글 증가 과정으로 설명하지 않는다. 입력전후832→833만 관찰된 구간이다. | [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="t-f31-03"></a>`T-F31-03` | [S062](REQUIREMENTS_03.md#s062) · [PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/screens/03_sc_500793b8306c411585ba54ddaf6a8f25.png>) | 기사 응답 입력 → 새 응답 표시. 현재 관찰값: Responses 833, 2 seconds ago, 입력한 문장. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 834→832→833 전체를 하나의 댓글 증가 과정으로 설명하지 않는다. 입력전후832→833만 관찰된 구간이다. | [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |

<a id="f32"></a>

## F32 — Home/Story detail/Responses/Commenting a story/Deleting a response

[원본 분석](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Deleting a response/ANALYSIS.md>)

**원본 흐름 목적:** 본인 응답 메뉴의 Delete response와 삭제 성공 토스트·목록 제거를 확인한다.

별도 확인 대화상자는 수록되지 않았다. 답글이 있는 응답의 삭제 영향과 복구는 추가 검증 대상이다.

- **진입:** YOU 응답의 Delete response 메뉴에서 시작한다.

- **종료:** 본인 응답이 사라지고 삭제 성공 토스트가 보인다. 총수는 토스트에 가린다.

- **미수록 분기:** 삭제 전 확인·취소·복구·답글 연쇄 처리·재진입, 서버 소유권 검증.

- **원본 해석:** 별도 확인 대화상자는 수록되지 않았다. 답글이 있는 응답의 삭제 영향과 복구는 추가 검증 대상이다.

- **FE 검토:** 인용/작성/수정/삭제/답글/정렬/정책/관리 구현. 정책 전문 대신 발췌+링크 차이는 명시됨. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesNavigation.test.tsx](<../../FE/src/app/navigation/ResponsesNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f32-01"></a>`T-F32-01` | [S062](REQUIREMENTS_03.md#s062) · [PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Deleting a response/screens/01_sc_500793b8306c411585ba54ddaf6a8f25.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 본인 응답 관리 메뉴 — 수정·삭제 선택 가능<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="t-f32-02"></a>`T-F32-02` | [S181](REQUIREMENTS_08.md#s181) · [PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Deleting a response/screens/02_sc_e4b254a2635b47069e314a1462c985d6.png>) | 새 응답 표시 → 본인 응답 관리 메뉴. 현재 관찰값: 응답 유지. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 응답 삭제 성공 표시 — 삭제 성공 안내<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="t-f32-03"></a>`T-F32-03` | [S124](REQUIREMENTS_05.md#s124) · [PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Deleting a response/screens/03_sc_aa1b32e30ce5436b8ca8fcc4c7d74d1b.png>) | 본인 응답 관리 메뉴 → 응답 삭제 성공 표시. 현재 관찰값: Successfully deleted response. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |

<a id="f33"></a>

## F33 — Home/Story detail/Responses/Commenting a story/Editing a response

[원본 분석](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/ANALYSIS.md>)

**원본 흐름 목적:** 본인 응답의 더보기에서 편집하고 이모지를 추가한 결과와 edited 표시를 확인한다.

편집 중에도 Replying to Alex Smith가 표시된다. 최종 화면은 기존 응답 수정이므로 문구만으로 새 답글 생성이라 판단하지 않는다.

- **진입:** YOU 응답의 Edit response 메뉴에서 시작한다.

- **종료:** 하트 3개가 추가되고 edited 표시가 생긴다. 총수 833은 유지된다.

- **미수록 분기:** Cancel 복원·빈값 수정·타인 권한·토론 닫힘·동시 수정, 수정 이력.

- **원본 해석:** 편집 중에도 Replying to Alex Smith가 표시된다. 최종 화면은 기존 응답 수정이므로 문구만으로 새 답글 생성이라 판단하지 않는다.

- **FE 검토:** 인용/작성/수정/삭제/답글/정렬/정책/관리 구현. 정책 전문 대신 발췌+링크 차이는 명시됨. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesNavigation.test.tsx](<../../FE/src/app/navigation/ResponsesNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f33-01"></a>`T-F33-01` | [S062](REQUIREMENTS_03.md#s062) · [PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/screens/01_sc_500793b8306c411585ba54ddaf6a8f25.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 본인 응답 관리 메뉴 — 수정·삭제 선택 가능<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="t-f33-02"></a>`T-F33-02` | [S181](REQUIREMENTS_08.md#s181) · [PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/screens/02_sc_e4b254a2635b47069e314a1462c985d6.png>) | 새 응답 표시 → 본인 응답 관리 메뉴. 현재 관찰값: 응답 유지. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 기존 응답 편집 입력 — 편집 흐름이나 UI 문구는 Replying<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="t-f33-03"></a>`T-F33-03` | [S009](REQUIREMENTS_01.md#s009) · [PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/screens/03_sc_0817971af7f14028a36fd2a233dd5ee7.png>) | 본인 응답 관리 메뉴 → 기존 응답 편집 입력. 현재 관찰값: Replying to Alex Smith 표시, 기존 내용 채움. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 응답 수정 내용 입력 — 수정 제출 전<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="t-f33-04"></a>`T-F33-04` | [S010](REQUIREMENTS_01.md#s010) · [PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/screens/04_sc_0950e3a03f7e4b02b9db0d98f818bdea.png>) | 기존 응답 편집 입력 → 응답 수정 내용 입력. 현재 관찰값: 기존 문장 끝 하트 3개 추가. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 응답 수정 반영 — 내용 변경과 edited 확인<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="t-f33-05"></a>`T-F33-05` | [S142](REQUIREMENTS_06.md#s142) · [PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/screens/05_sc_c1a6af7cef31436a9cdd090eae87479f.png>) | 응답 수정 내용 입력 → 응답 수정 반영. 현재 관찰값: Responses 833 유지. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |

<a id="f34"></a>

## F34 — Home/Story detail/Responses/Medium policy

**Parity 3 추가 실행:** [S100→S008→원래 응답/기사 복귀·도구 연결·재검토](../FE_MEDIUM_PARITY_03_RESULT.md)를 새로 수행했다. 초안/선택/정렬/스크롤/포커스 보존은 검증한 mock 정책이며 원본의 미수록 복귀 결과를 확정하지 않는다. 아래 FE 검토는 감사 당시 이력이다. T-F34-01의 S100 전체 보정은 묶음10, T-F34-02의 V21 자산/서체/272 잔여는 묶음3에 유지한다.

[원본 분석](<../../medium/flows/Home/Story detail/Responses/Medium policy/ANALYSIS.md>)

**원본 흐름 목적:** 응답 시트의 정책 접근점에서 Medium Rules 문서를 읽는 경로를 확인한다.

캡처 문서의 May 26 2021은 문서 표시 날짜이며 캡처일이 아니다. 현재 공식 정책과 버전을 구분한다.

- **진입:** 응답 시트에 정책 방패 진입점이 보인다.

- **종료:** Medium Rules 문서의 첫 화면으로 이어진다.

- **미수록 분기:** 문서 전체 내용·버전 차이·링크 이동·뒤로 복귀 결과. 캡처 날짜와 게시 날짜를 구분한다.

- **원본 해석:** 캡처 문서의 May 26 2021은 문서 표시 날짜이며 캡처일이 아니다. 현재 공식 정책과 버전을 구분한다.

- **FE 검토:** 인용/작성/수정/삭제/답글/정렬/정책/관리 구현. 정책 전문 대신 발췌+링크 차이는 명시됨. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesNavigation.test.tsx](<../../FE/src/app/navigation/ResponsesNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f34-01"></a>`T-F34-01` | [S100](REQUIREMENTS_04.md#s100) · [PNG](<../../medium/flows/Home/Story detail/Responses/Medium policy/screens/01_sc_915888473ac24e8987c996b8954f54c6.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: Medium Rules 정책 문서 — 응답에서 연결된 정책 읽기<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="t-f34-02"></a>`T-F34-02` | [S008](REQUIREMENTS_01.md#s008) · [PNG](<../../medium/flows/Home/Story detail/Responses/Medium policy/screens/02_sc_063290fab51b4acd913212f85acde70d.png>) | 응답 시트와 중첩 답글 → Medium Rules 정책 문서. 현재 관찰값: 문서 표시일 May 26 2021, 11 min read. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V21](../FE_MEDIUM_PARITY_BACKLOG.md#v21) |

<a id="f35"></a>

## F35 — Home/Story detail/Responses/Replying a response

[원본 분석](<../../medium/flows/Home/Story detail/Responses/Replying a response/ANALYSIS.md>)

**원본 흐름 목적:** 특정 응답을 대상으로 지정하고 Agree!를 작성하여 하위 답글로 표시하는 흐름을 분석한다.

832 총수가 생성 후에도 유지된다. 답글을 제외하는 집계인지 갱신 지연인지 단정하지 않는다.

- **진입:** 기존 응답에 Reply를 선택한 상태가 수록된다.

- **종료:** Replying to Bérnie 입력 뒤 Agree!가 YOU 답글로 나타난다. 총수 832는 유지된다.

- **미수록 분기:** Cancel·빈값·부모 삭제·최대 깊이·닫힌 토론·전송 실패.

- **원본 해석:** 832 총수가 생성 후에도 유지된다. 답글을 제외하는 집계인지 갱신 지연인지 단정하지 않는다.

- **FE 검토:** 인용/작성/수정/삭제/답글/정렬/정책/관리 구현. 정책 전문 대신 발췌+링크 차이는 명시됨. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesNavigation.test.tsx](<../../FE/src/app/navigation/ResponsesNavigation.test.tsx>)

- **해석 주의:** 답글 후832 유지의 원인은 미확인이다. 답글 제외 집계/갱신 지연을 단정하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f35-01"></a>`T-F35-01` | [S100](REQUIREMENTS_04.md#s100) · [PNG](<../../medium/flows/Home/Story detail/Responses/Replying a response/screens/01_sc_915888473ac24e8987c996b8954f54c6.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 답글 대상 선택 — 특정 응답에 답글 모드<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 답글 후832 유지의 원인은 미확인이다. 답글 제외 집계/갱신 지연을 단정하지 않는다. | [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="t-f35-02"></a>`T-F35-02` | [S072](REQUIREMENTS_03.md#s072) · [PNG](<../../medium/flows/Home/Story detail/Responses/Replying a response/screens/02_sc_6101af9ca21443afbe2c2146c8ac2e3d.png>) | 응답 시트와 중첩 답글 → 답글 대상 선택. 현재 관찰값: Replying to Bérnie, 빈 작성창. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 답글 내용 입력 — 답글 제출 전<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 답글 후832 유지의 원인은 미확인이다. 답글 제외 집계/갱신 지연을 단정하지 않는다. | [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="t-f35-03"></a>`T-F35-03` | [S092](REQUIREMENTS_04.md#s092) · [PNG](<../../medium/flows/Home/Story detail/Responses/Replying a response/screens/03_sc_8202187474f444de8773b38fe92c4d82.png>) | 답글 대상 선택 → 답글 내용 입력. 현재 관찰값: Agree! 입력. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 답글 생성 표시 — 새 답글 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 답글 후832 유지의 원인은 미확인이다. 답글 제외 집계/갱신 지연을 단정하지 않는다. | [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="t-f35-04"></a>`T-F35-04` | [S071](REQUIREMENTS_03.md#s071) · [PNG](<../../medium/flows/Home/Story detail/Responses/Replying a response/screens/04_sc_60bd813234264b59b304bd3ac3df0af4.png>) | 답글 내용 입력 → 답글 생성 표시. 현재 관찰값: Agree!, Responses 832 유지. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 답글 후832 유지의 원인은 미확인이다. 답글 제외 집계/갱신 지연을 단정하지 않는다. | [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |

<a id="f36"></a>

## F36 — Home/Story detail/Responses/Sorting responses

[원본 분석](<../../medium/flows/Home/Story detail/Responses/Sorting responses/ANALYSIS.md>)

**원본 흐름 목적:** Most Relevant와 Most Recent 선택 및 목록 순서 변화를 확인한다.

최신순 화면의 1·4·7시간 전 표시는 관찰된다. 관련도 산식과 동률 처리 규칙은 알 수 없다.

- **진입:** 834개 표시의 Most Relevant 목록에서 시작한다.

- **종료:** Most Recent로 바뀌고 1h·4h·7h 순의 응답이 보인다.

- **미수록 분기:** 정렬별 페이지 경계·동률·수정 시각 취급·선택 유지, Most Relevant 계산식.

- **원본 해석:** 최신순 화면의 1·4·7시간 전 표시는 관찰된다. 관련도 산식과 동률 처리 규칙은 알 수 없다.

- **FE 검토:** 인용/작성/수정/삭제/답글/정렬/정책/관리 구현. 정책 전문 대신 발췌+링크 차이는 명시됨. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>), [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesNavigation.test.tsx](<../../FE/src/app/navigation/ResponsesNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f36-01"></a>`T-F36-01` | [S100](REQUIREMENTS_04.md#s100) · [PNG](<../../medium/flows/Home/Story detail/Responses/Sorting responses/screens/01_sc_915888473ac24e8987c996b8954f54c6.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 응답 정렬 선택 — 정렬 선택 중<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="t-f36-02"></a>`T-F36-02` | [S111](REQUIREMENTS_05.md#s111) · [PNG](<../../medium/flows/Home/Story detail/Responses/Sorting responses/screens/02_sc_9b94403d105c4eda8933ae7bbe2d6a00.png>) | 응답 시트와 중첩 답글 → 응답 정렬 선택. 현재 관찰값: Most Relevant 체크. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 최신순 응답 목록 — 최근 응답이 먼저 보임<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |
| <a id="t-f36-03"></a>`T-F36-03` | [S032](REQUIREMENTS_02.md#s032) · [PNG](<../../medium/flows/Home/Story detail/Responses/Sorting responses/screens/03_sc_280ed6ce41b24f6f876aac698f4a8119.png>) | 응답 정렬 선택 → 최신순 응답 목록. 현재 관찰값: 1 hour ago, 4 hours ago, 7 hours ago. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V20](../FE_MEDIUM_PARITY_BACKLOG.md#v20) |

<a id="f37"></a>

## F37 — Home/Story detail/Saving a story

[원본 분석](<../../medium/flows/Home/Story detail/Saving a story/ANALYSIS.md>)

**원본 흐름 목적:** 기사 북마크에서 Reading list 선택과 Done 이후 북마크 활성 상태를 확인한다.

기본 목록에 체크된 상태부터 수록되어 최초 탭의 자동 저장 시점을 확정할 수 없다.

- **진입:** 기사의 빈 북마크에서 시작한다.

- **종료:** Save to에서 Reading list가 체크되고 Done 뒤 북마크가 채워진다.

- **미수록 분기:** 복수 리스트 선택·선택 해제·Create new list 실행·저장 실패, 타 기기 재조회.

- **원본 해석:** 기본 목록에 체크된 상태부터 수록되어 최초 탭의 자동 저장 시점을 확정할 수 없다.

- **FE 검토:** 복수 목록 저장/해제·새 목록·실패 복구 구현. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ArticleBookmarkControl.tsx](<../../FE/src/features/bookmarks/ArticleBookmarkControl.tsx>), [SaveToListSheet.tsx](<../../FE/src/features/bookmarks/SaveToListSheet.tsx>), [BookmarkNavigation.test.tsx](<../../FE/src/app/navigation/BookmarkNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f37-01"></a>`T-F37-01` | [S037](REQUIREMENTS_02.md#s037) · [PNG](<../../medium/flows/Home/Story detail/Saving a story/screens/01_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 기사 저장 대상 선택 — 비공개 읽기 목록 선택<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="t-f37-02"></a>`T-F37-02` | [S036](REQUIREMENTS_02.md#s036) · [PNG](<../../medium/flows/Home/Story detail/Saving a story/screens/02_sc_31edfd53d2874259a6ed5ecbc756d10b.png>) | 기사 상세 상단 → 기사 저장 대상 선택. 현재 관찰값: Reading list 체크·자물쇠. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 저장 아이콘 활성 — 저장 선택 반영<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V22](../FE_MEDIUM_PARITY_BACKLOG.md#v22) |
| <a id="t-f37-03"></a>`T-F37-03` | [S172](REQUIREMENTS_07.md#s172) · [PNG](<../../medium/flows/Home/Story detail/Saving a story/screens/03_sc_dda8e78e9eb943629d3cf54eaed5fc22.png>) | 기사 저장 대상 선택 → 저장 아이콘 활성. 현재 관찰값: 기사 내용·집계 유지. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V22](../FE_MEDIUM_PARITY_BACKLOG.md#v22) |

<a id="f38"></a>

## F38 — Home/Story detail/Sending claps

[원본 분석](<../../medium/flows/Home/Story detail/Sending claps/ANALYSIS.md>)

**원본 흐름 목적:** 기사에서 박수를 보내고 +16 피드백과 채워진 아이콘을 확인한다.

18K는 축약 집계다. +16을 정확한 서버 증가량으로 확정하지 않으며 응답 수 834/832 차이를 박수의 영향으로 보지 않는다.

- **진입:** 기사 상세의 박수 컨트롤에서 시작한다.

- **종료:** +16 피드백 뒤 채워진 박수 아이콘이 남는다. 18K 집계는 축약값이다.

- **미수록 분기:** 0~50 경계·취소·실패·재진입, 본인 글의 제한·중복 요청.

- **원본 해석:** 18K는 축약 집계다. +16을 정확한 서버 증가량으로 확정하지 않으며 응답 수 834/832 차이를 박수의 영향으로 보지 않는다.

- **FE 검토:** 0~50 누적·Undo claps·자기 글 제한 및 계정별 기여 구현. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>), [ClapHistoryNavigation.test.tsx](<../../FE/src/app/navigation/ClapHistoryNavigation.test.tsx>)

- **해석 주의:** +16은 피드백 표시다.18K 축약값과 응답834/832 차이를 정확한 요청수/박수 효과로 해석하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f38-01"></a>`T-F38-01` | [S037](REQUIREMENTS_02.md#s037) · [PNG](<../../medium/flows/Home/Story detail/Sending claps/screens/01_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 박수 전송 피드백 — 박수 입력 피드백 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. +16은 피드백 표시다.18K 축약값과 응답834/832 차이를 정확한 요청수/박수 효과로 해석하지 않는다. | [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="t-f38-02"></a>`T-F38-02` | [S007](REQUIREMENTS_01.md#s007) · [PNG](<../../medium/flows/Home/Story detail/Sending claps/screens/02_sc_0629a27b99a645cabe6e110b5d3d3d57.png>) | 기사 상세 상단 → 박수 전송 피드백. 현재 관찰값: 18K 집계, 응답 832. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 박수 피드백 종료 — 일시적 +16 배지 사라짐<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. +16은 피드백 표시다.18K 축약값과 응답834/832 차이를 정확한 요청수/박수 효과로 해석하지 않는다. | [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="t-f38-03"></a>`T-F38-03` | [S179](REQUIREMENTS_08.md#s179) · [PNG](<../../medium/flows/Home/Story detail/Sending claps/screens/03_sc_e3b85b46c655483eb954e6f953d0b7f6.png>) | 박수 전송 피드백 → 박수 피드백 종료. 현재 관찰값: 박수 아이콘 검정, 18K, 응답 832. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. +16은 피드백 표시다.18K 축약값과 응답834/832 차이를 정확한 요청수/박수 효과로 해석하지 않는다. | [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |

<a id="f39"></a>

## F39 — Home/Story detail/Sharing a story

[원본 분석](<../../medium/flows/Home/Story detail/Sharing a story/ANALYSIS.md>)

**원본 흐름 목적:** 기사의 공유 카드, 링크 복사 토스트, 가로 공유 행동을 분석한다.

Copy link 결과만 보인다. Friend Link와 외부 공유 앱은 버튼 존재만 확인되었다.

- **진입:** 기사 공유 버튼에서 시작한다.

- **종료:** 공유 카드와 Copy link 성공 토스트, Save image 진입점이 보인다.

- **미수록 분기:** Friend Link 생성·자격 거부, Share via 시스템 시트·취소, 카드 스타일 전환.

- **원본 해석:** Copy link 결과만 보인다. Friend Link와 외부 공유 앱은 버튼 존재만 확인되었다.

- **FE 검토:** copy/스타일/Friend 자격/공유 이미지/OS 어댑터 구현. 실제 Friend 발급 제외·native 실행 미검증. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ShareSheet.tsx](<../../FE/src/features/sharing/ShareSheet.tsx>), [SharingNavigation.test.tsx](<../../FE/src/app/navigation/SharingNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f39-01"></a>`T-F39-01` | [S037](REQUIREMENTS_02.md#s037) · [PNG](<../../medium/flows/Home/Story detail/Sharing a story/screens/01_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 공유 카드 시트 — 공유 미리보기<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V13](../FE_MEDIUM_PARITY_BACKLOG.md#v13) |
| <a id="t-f39-02"></a>`T-F39-02` | [S163](REQUIREMENTS_07.md#s163) · [PNG](<../../medium/flows/Home/Story detail/Sharing a story/screens/02_sc_d1c962cd0a8240ee94769a612a81d64f.png>) | 기사 상세 상단 → 공유 카드 시트. 현재 관찰값: 읽기 시간·제목·부제·작가·Medium 표시. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 링크 복사 피드백 — 복사 완료 안내<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="t-f39-03"></a>`T-F39-03` | [S051](REQUIREMENTS_03.md#s051) · [PNG](<../../medium/flows/Home/Story detail/Sharing a story/screens/03_sc_4225892a7f304ec9b0442fad0aae38bb.png>) | 공유 카드 시트 → 링크 복사 피드백. 현재 관찰값: Link copied. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이미지 저장 행동 노출 — Save image 전체 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="t-f39-04"></a>`T-F39-04` | [S028](REQUIREMENTS_02.md#s028) · [PNG](<../../medium/flows/Home/Story detail/Sharing a story/screens/04_sc_221a38b7f8ac42959ddd75840253b5c8.png>) | 링크 복사 피드백 → 이미지 저장 행동 노출. 현재 관찰값: 동일 카드. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |

<a id="f40"></a>

## F40 — Home/Story detail/Sharing a story/Downloading an image

[원본 분석](<../../medium/flows/Home/Story detail/Sharing a story/Downloading an image/ANALYSIS.md>)

**원본 흐름 목적:** 공유 카드 Save image와 이미지 저장 성공 토스트를 확인한다.

다운로드 대상은 기사 본문 원본 사진이 아니라 공유용 카드 이미지다. 실제 사진 보관함 파일은 재현하지 않았다.

- **진입:** 공유 카드의 Save image가 보이는 상태에서 시작한다.

- **종료:** Image saved to library 토스트를 확인한다.

- **미수록 분기:** 사진 권한 허용·거부·저장 실패, 실제 앨범 파일·형식·해상도.

- **원본 해석:** 다운로드 대상은 기사 본문 원본 사진이 아니라 공유용 카드 이미지다. 실제 사진 보관함 파일은 재현하지 않았다.

- **FE 검토:** copy/스타일/Friend 자격/공유 이미지/OS 어댑터 구현. 실제 Friend 발급 제외·native 실행 미검증. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ShareSheet.tsx](<../../FE/src/features/sharing/ShareSheet.tsx>), [SharingNavigation.test.tsx](<../../FE/src/app/navigation/SharingNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f40-01"></a>`T-F40-01` | [S028](REQUIREMENTS_02.md#s028) · [PNG](<../../medium/flows/Home/Story detail/Sharing a story/Downloading an image/screens/01_sc_221a38b7f8ac42959ddd75840253b5c8.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 공유 이미지 저장 안내 — 이미지 저장 성공 안내<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |
| <a id="t-f40-02"></a>`T-F40-02` | [S073](REQUIREMENTS_03.md#s073) · [PNG](<../../medium/flows/Home/Story detail/Sharing a story/Downloading an image/screens/02_sc_62256b592ebc4b028f1097aa21f9e400.png>) | 이미지 저장 행동 노출 → 공유 이미지 저장 안내. 현재 관찰값: 동일 카드. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V23](../FE_MEDIUM_PARITY_BACKLOG.md#v23) |

<a id="f41"></a>

## F41 — Library

**Parity 6:** [이번 결과](../FE_MEDIUM_PARITY_06_RESULT.md)에서 T-F41-04의 Digest 진입·행동 연결을 검증했다. 이 흐름의 다른 단계·미수록 효과·원본 동일성 전체를 완료로 승격하지 않는다.

[원본 분석](<../../medium/flows/Library/ANALYSIS.md>)

**원본 흐름 목적:** 내 리스트의 빈/채워진 상태와 Digest·Highlighted 탭을 비교한다.

Saved lists·Reading history 탭이 보여도 이 부모 흐름에 그 내용은 수록되지 않았다.

- **진입:** Home 뒤 Your library에서 시작한다.

- **종료:** Your lists 빈/채워진 상태, Digest, Highlighted를 확인한다.

- **미수록 분기:** Saved lists·Library Reading history 본문, 배너 닫기 결과·빈 탭·실패·페이지네이션.

- **원본 해석:** Saved lists·Reading history 탭이 보여도 이 부모 흐름에 그 내용은 수록되지 않았다.

- **FE 검토:** Your/Saved lists·Digest·Highlight·이력 진입 구현. A03/A05/A07 적용. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [LibraryScreen.tsx](<../../FE/src/features/bookmarks/LibraryScreen.tsx>), [HighlightList.tsx](<../../FE/src/features/highlights/HighlightList.tsx>), [BookmarkNavigation.test.tsx](<../../FE/src/app/navigation/BookmarkNavigation.test.tsx>), [DigestNavigation.test.tsx](<../../FE/src/app/navigation/DigestNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f41-01"></a>`T-F41-01` | [S069](REQUIREMENTS_03.md#s069) · [PNG](<../../medium/flows/Library/screens/01_sc_5e0ba0e498ff49579bf838096aec4b5e.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: Library 초기 목록 — 기본 읽기 목록이 비어 있음<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="t-f41-02"></a>`T-F41-02` | [S095](REQUIREMENTS_04.md#s095) · [PNG](<../../medium/flows/Library/screens/02_sc_84e0421de98041bbb014822fc05dd3fb.png>) | For you 홈 피드 → Library 초기 목록. 현재 관찰값: Your lists 활성, No stories·자물쇠. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 저장 글 있는 읽기 목록 — 기본 목록에 글 존재<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="t-f41-03"></a>`T-F41-03` | [S066](REQUIREMENTS_03.md#s066) · [PNG](<../../medium/flows/Library/screens/03_sc_57450c38bf994be18d95fcaf712c56ba.png>) | Library 초기 목록 → 저장 글 있는 읽기 목록. 현재 관찰값: 3 stories·자물쇠. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: Digest 일자별 추천 — 특정 날짜 다이제스트<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="t-f41-04"></a>`T-F41-04` | [S132](REQUIREMENTS_06.md#s132) · [PNG](<../../medium/flows/Library/screens/04_sc_bafbf7b80b154e25aec15e120a13f72a.png>) | 저장 글 있는 읽기 목록 → Digest 일자별 추천. 현재 관찰값: June 12 2025. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 저장한 하이라이트 목록 — 여러 글의 개인 하이라이트 모음<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="t-f41-05"></a>`T-F41-05` | [S145](REQUIREMENTS_06.md#s145) · [PNG](<../../medium/flows/Library/screens/05_sc_c37aefd0916548dda3cb46d61cc25193.png>) | Digest 일자별 추천 → 저장한 하이라이트 목록. 현재 관찰값: Alex Smith highlighted. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |

이전 기능 점검 발견 연결: A03, A05, A07 — [재현 근거·현재 범위](../FE_MEDIUM_PARITY_AUDIT.md#evidence).

<a id="f42"></a>

## F42 — Library/Creating a list

[원본 분석](<../../medium/flows/Library/Creating a list/ANALYSIS.md>)

**원본 흐름 목적:** 이름·선택 설명·Private를 가진 생성 폼에서 새 빈 리스트가 추가되는 결과를 확인한다.

이름 60자·설명 280자 카운터가 있다. 초과·중복·공백 이름 검증은 수록되지 않았다.

- **진입:** Your lists의 New list에서 시작한다.

- **종료:** 이름 입력·설명 공란·Private Off 뒤 새 빈 리스트 카드가 보인다.

- **미수록 분기:** 60/280자 경계·공백·중복 이름·Private On·Cancel·생성 실패.

- **원본 해석:** 이름 60자·설명 280자 카운터가 있다. 초과·중복·공백 이름 검증은 수록되지 않았다.

- **FE 검토:** 이름/설명/공개범위/생성·취소·실패 구현. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ListManagementNavigation.test.tsx](<../../FE/src/app/navigation/ListManagementNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f42-01"></a>`T-F42-01` | [S066](REQUIREMENTS_03.md#s066) · [PNG](<../../medium/flows/Library/Creating a list/screens/01_sc_57450c38bf994be18d95fcaf712c56ba.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 리스트 생성 빈 폼 — 생성 전 입력<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="t-f42-02"></a>`T-F42-02` | [S076](REQUIREMENTS_04.md#s076) · [PNG](<../../medium/flows/Library/Creating a list/screens/02_sc_675e3eda08504708979533659dacdcf6.png>) | 저장 글 있는 읽기 목록 → 리스트 생성 빈 폼. 현재 관찰값: 이름0/60, 설명0/280, Private 꺼짐. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 리스트 이름 입력 — 이름만 입력해 생성 가능 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="t-f42-03"></a>`T-F42-03` | [S155](REQUIREMENTS_07.md#s155) · [PNG](<../../medium/flows/Library/Creating a list/screens/03_sc_ca3b32e4373a40fc84405838671eab27.png>) | 리스트 생성 빈 폼 → 리스트 이름 입력. 현재 관찰값: About mindfulness 17/60, 설명 없음, Private 꺼짐. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 새 리스트 생성 표시 — 새 목록 생성 결과<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="t-f42-04"></a>`T-F42-04` | [S039](REQUIREMENTS_02.md#s039) · [PNG](<../../medium/flows/Library/Creating a list/screens/04_sc_35dcbd9d4308404b9f11ecd03f893eb8.png>) | 리스트 이름 입력 → 새 리스트 생성 표시. 현재 관찰값: About mindfulness, No stories, 자물쇠 없음. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |

<a id="f43"></a>

## F43 — Library/Filtering digest

**Parity 6:** [이번 결과](../FE_MEDIUM_PARITY_06_RESULT.md)에서 T-F43-01~04의 날짜 임시 선택/취소/확정·날짜별 기사를 검증했다. 이 흐름의 다른 단계·미수록 효과·원본 동일성 전체를 완료로 승격하지 않는다.

[원본 분석](<../../medium/flows/Library/Filtering digest/ANALYSIS.md>)

**원본 흐름 목적:** 최근 다이제스트 10개 중 다른 날짜를 고르고 해당 기사 묶음으로 전환한다.

June 12→June 8 변화는 선택한 다이제스트 날짜다. Today's highlights 제목만으로 오늘 생성된 것으로 해석하지 않는다.

- **진입:** Digest 날짜 선택에서 시작한다.

- **종료:** 최근 10개 중 June 8을 선택·Done 후 해당 날짜 글이 보인다.

- **미수록 분기:** 닫기·선택 유지·날짜 0건·조회 실패·시간대·10개보다 오래된 기록.

- **원본 해석:** June 12→June 8 변화는 선택한 다이제스트 날짜다. Today's highlights 제목만으로 오늘 생성된 것으로 해석하지 않는다.

- **FE 검토:** 최근 10호 선택/초안/적용/빈 호/조회 오류 구현. A02/A05. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [DigestPanel.tsx](<../../FE/src/features/digest/DigestPanel.tsx>), [DigestNavigation.test.tsx](<../../FE/src/app/navigation/DigestNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f43-01"></a>`T-F43-01` | [S132](REQUIREMENTS_06.md#s132) · [PNG](<../../medium/flows/Library/Filtering digest/screens/01_sc_bafbf7b80b154e25aec15e120a13f72a.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 다이제스트 날짜 선택 — 최근 10개까지 볼 수 있다는 안내<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="t-f43-02"></a>`T-F43-02` | [S193](REQUIREMENTS_08.md#s193) · [PNG](<../../medium/flows/Library/Filtering digest/screens/02_sc_f647f3c6b04d48e9bb1b31f5d0fb2cfe.png>) | Digest 일자별 추천 → 다이제스트 날짜 선택. 현재 관찰값: June 12 2025 선택, June 3까지. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 과거 다이제스트 선택 — 다른 날짜 임시 선택<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="t-f43-03"></a>`T-F43-03` | [S096](REQUIREMENTS_04.md#s096) · [PNG](<../../medium/flows/Library/Filtering digest/screens/03_sc_8866044a55164824903265c3b8b97337.png>) | 다이제스트 날짜 선택 → 과거 다이제스트 선택. 현재 관찰값: June 8 2025 체크. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 선택 날짜 다이제스트 — 선택한 날짜 콘텐츠 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="t-f43-04"></a>`T-F43-04` | [S116](REQUIREMENTS_05.md#s116) · [PNG](<../../medium/flows/Library/Filtering digest/screens/04_sc_a42fffc3afb34954bc5e4afcc2e08e04.png>) | 과거 다이제스트 선택 → 선택 날짜 다이제스트. 현재 관찰값: June 8 2025, Goodbye Notion. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |

이전 기능 점검 발견 연결: A02, A05 — [재현 근거·현재 범위](../FE_MEDIUM_PARITY_AUDIT.md#evidence).

<a id="f44"></a>

## F44 — Library/Filtering digest/Digest settings

**Parity 6:** [이번 결과](../FE_MEDIUM_PARITY_06_RESULT.md)에서 T-F44-01의 Digest 설정 진입과 복귀를 검증했다. 이 흐름의 다른 단계·미수록 효과·원본 동일성 전체를 완료로 승격하지 않는다.

[원본 분석](<../../medium/flows/Library/Filtering digest/Digest settings/ANALYSIS.md>)

**원본 흐름 목적:** Digest 설정에서 빈도와 푸시·이메일 채널 상태 및 이동 경로를 확인한다.

Daily·On 표시는 확인했으나 값 변경 과정은 없다. 이메일 설정과 앱 내 다이제스트 생성 주기가 같다고 확정하지 않는다.

- **진입:** Digest의 톱니바퀴에서 시작한다.

- **종료:** Daily, Push On, Email On을 보여주는 설정 현황에서 기록이 끝난다.

- **미수록 분기:** 다른 빈도 옵션·변경 저장·푸시 세부 화면·외부 이메일 설정·발송 시간.

- **원본 해석:** Daily·On 표시는 확인했으나 값 변경 과정은 없다. 이메일 설정과 앱 내 다이제스트 생성 주기가 같다고 확정하지 않는다.

- **FE 검토:** Digest/Push/Email 공유 선호·옵션·취소/실패 구현. 실제 전송 제외. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [NotificationSettingsScreen.tsx](<../../FE/src/features/notifications/NotificationSettingsScreen.tsx>), [NotificationNavigation.test.tsx](<../../FE/src/app/navigation/NotificationNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f44-01"></a>`T-F44-01` | [S132](REQUIREMENTS_06.md#s132) · [PNG](<../../medium/flows/Library/Filtering digest/Digest settings/screens/01_sc_bafbf7b80b154e25aec15e120a13f72a.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 다이제스트 설정 — 다이제스트 주기·알림 채널 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V27](../FE_MEDIUM_PARITY_BACKLOG.md#v27) |
| <a id="t-f44-02"></a>`T-F44-02` | [S162](REQUIREMENTS_07.md#s162) · [PNG](<../../medium/flows/Library/Filtering digest/Digest settings/screens/02_sc_d17bad2e556e4b0abfdc9541f90c46f2.png>) | Digest 일자별 추천 → 다이제스트 설정. 현재 관찰값: Daily, Push On, Email On. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |

<a id="f45"></a>

## F45 — Library/List detail/Adding a note

[원본 분석](<../../medium/flows/Library/List detail/Adding a note/ANALYSIS.md>)

**원본 흐름 목적:** 리스트의 특정 기사에 메모를 작성하여 카드 위 주석으로 표시하는 흐름을 확인한다.

이 메모는 리스트 항목 메모이며 작성자에게 보내는 private note 기능과 다르다.

- **진입:** 리스트 내 특정 글의 Add note에서 시작한다.

- **종료:** 글 미리보기 위 입력 후 리스트의 해당 글 위에 메모가 나타난다.

- **미수록 분기:** 빈값 Done·최대 길이·Cancel·수정/삭제·공개 접근·다른 리스트 동일 글.

- **원본 해석:** 이 메모는 리스트 항목 메모이며 작성자에게 보내는 private note 기능과 다르다.

- **FE 검토:** 목록별 기사 메모/저장·취소·삭제 구현. 0분 표시 A05. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListEditingNavigation.test.tsx](<../../FE/src/app/navigation/ListEditingNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f45-01"></a>`T-F45-01` | [S177](REQUIREMENTS_08.md#s177) · [PNG](<../../medium/flows/Library/List detail/Adding a note/screens/01_sc_e20e59ee459b4a0d9a0a0302091962bd.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 리스트 항목 메뉴 — 항목별 관리<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="t-f45-02"></a>`T-F45-02` | [S195](REQUIREMENTS_08.md#s195) · [PNG](<../../medium/flows/Library/List detail/Adding a note/screens/02_sc_fa4e79f0bed747d698ae44e23f9223f9.png>) | 리스트 상세 스크롤 → 리스트 항목 메뉴. 현재 관찰값: Mind Fullness or Emptiness? 대상. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 리스트 항목 메모 폼 — 메모 입력 전<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="t-f45-03"></a>`T-F45-03` | [S200](REQUIREMENTS_08.md#s200) · [PNG](<../../medium/flows/Library/List detail/Adding a note/screens/03_sc_ffa4d0c8f01440e1a0842a4e1a59708a.png>) | 리스트 항목 메뉴 → 리스트 항목 메모 폼. 현재 관찰값: Add a brief description 빈값. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 메모 내용 입력 — 메모 제출 준비<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="t-f45-04"></a>`T-F45-04` | [S191](REQUIREMENTS_08.md#s191) · [PNG](<../../medium/flows/Library/List detail/Adding a note/screens/04_sc_f4f970015d6743538664901310d2c17b.png>) | 리스트 항목 메모 폼 → 메모 내용 입력. 현재 관찰값: A very good explanation of mindfulness. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 리스트 메모 반영 — 메모 저장 결과 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="t-f45-05"></a>`T-F45-05` | [S002](REQUIREMENTS_01.md#s002) · [PNG](<../../medium/flows/Library/List detail/Adding a note/screens/05_sc_02d96a649c7a461b9c07155d33c1dbfc.png>) | 메모 내용 입력 → 리스트 메모 반영. 현재 관찰값: 입력한 메모 표시. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |

이전 기능 점검 발견 연결: A05 — [재현 근거·현재 범위](../FE_MEDIUM_PARITY_AUDIT.md#evidence).

<a id="f46"></a>

## F46 — Library/List detail

[원본 분석](<../../medium/flows/Library/List detail/ANALYSIS.md>)

**원본 흐름 목적:** 새 리스트의 빈 상태에서 기사 4개가 있는 목록과 스크롤 상태를 비교한다.

기사 추가 동작은 사이에 수록되지 않았다. 빈 상태와 채워진 상태를 하나의 클릭 결과로 연결하지 않는다.

- **진입:** 새 리스트 카드에서 빈 상세로 진입한다.

- **종료:** 빈 목록 뒤 4개 글·메모 진입점·항목 메뉴가 수록된다. 글 추가 과정은 없다.

- **미수록 분기:** Start browsing 결과·글 추가·Edit list info·공유·응답·원문 삭제 영향.

- **원본 해석:** 기사 추가 동작은 사이에 수록되지 않았다. 빈 상태와 채워진 상태를 하나의 클릭 결과로 연결하지 않는다.

- **FE 검토:** 기본/일반 목록 상세·반응·메뉴·발행 글 재열기 구현. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditingNavigation.test.tsx](<../../FE/src/app/navigation/ListEditingNavigation.test.tsx>), [PublishedLibrarySession.test.tsx](<../../FE/src/app/navigation/PublishedLibrarySession.test.tsx>)

- **해석 주의:** 빈14seconds→채움6seconds는 시간 역행 및 글 추가 단계 미수록이다. 동일 연속 세션으로 강제하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f46-01"></a>`T-F46-01` | [S039](REQUIREMENTS_02.md#s039) · [PNG](<../../medium/flows/Library/List detail/screens/01_sc_35dcbd9d4308404b9f11ecd03f893eb8.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 빈 리스트 상세 — 콘텐츠 없는 리스트<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 빈14seconds→채움6seconds는 시간 역행 및 글 추가 단계 미수록이다. 동일 연속 세션으로 강제하지 않는다. | [V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="t-f46-02"></a>`T-F46-02` | [S106](REQUIREMENTS_05.md#s106) · [PNG](<../../medium/flows/Library/List detail/screens/02_sc_967232cfb5f845839053e0d371d78911.png>) | 새 리스트 생성 표시 → 빈 리스트 상세. 현재 관찰값: About mindfulness, 14 seconds ago. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 내 리스트 상세 항목 — 리스트에 글 4개<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 빈14seconds→채움6seconds는 시간 역행 및 글 추가 단계 미수록이다. 동일 연속 세션으로 강제하지 않는다. | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="t-f46-03"></a>`T-F46-03` | [S011](REQUIREMENTS_01.md#s011) · [PNG](<../../medium/flows/Library/List detail/screens/03_sc_0b1e7b64b9f14f2cb5358161e0f67a94.png>) | 빈 리스트 상세 → 내 리스트 상세 항목. 현재 관찰값: 4 stories, 저장 아이콘 채움. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 리스트 상세 스크롤 — 목록 후반<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 빈14seconds→채움6seconds는 시간 역행 및 글 추가 단계 미수록이다. 동일 연속 세션으로 강제하지 않는다. | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="t-f46-04"></a>`T-F46-04` | [S177](REQUIREMENTS_08.md#s177) · [PNG](<../../medium/flows/Library/List detail/screens/04_sc_e20e59ee459b4a0d9a0a0302091962bd.png>) | 내 리스트 상세 항목 → 리스트 상세 스크롤. 현재 관찰값: 동일 리스트 후반 항목. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 빈14seconds→채움6seconds는 시간 역행 및 글 추가 단계 미수록이다. 동일 연속 세션으로 강제하지 않는다. | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |

<a id="f47"></a>

## F47 — Library/List detail/Deleting a list

[원본 분석](<../../medium/flows/Library/List detail/Deleting a list/ANALYSIS.md>)

**원본 흐름 목적:** 리스트 삭제의 영향 안내와 라이브러리 복귀·삭제 토스트를 확인한다.

안내는 원문 기사가 삭제되지 않는다고 명시한다. 기본 Reading list는 별도 제약을 가진다.

- **진입:** 사용자 생성 리스트의 Delete list에서 시작한다.

- **종료:** 기사 원문은 삭제하지 않는다는 확인 뒤 목록 제거 토스트가 보인다.

- **미수록 분기:** 닫기·실패·복구·타인 라이브러리·캐시/메모 정리, 기본 리스트 삭제 제한.

- **원본 해석:** 안내는 원문 기사가 삭제되지 않는다고 명시한다. 기본 Reading list는 별도 제약을 가진다.

- **FE 검토:** 목록 삭제 영향/취소/실패/타인 저장 제거 구현. 원문 보존. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>), [ListManagementNavigation.test.tsx](<../../FE/src/app/navigation/ListManagementNavigation.test.tsx>)

- **해석 주의:** Reading list3→4는 삭제된 목록의 자동 이전 증거가 아니다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f47-01"></a>`T-F47-01` | [S011](REQUIREMENTS_01.md#s011) · [PNG](<../../medium/flows/Library/List detail/Deleting a list/screens/01_sc_0b1e7b64b9f14f2cb5358161e0f67a94.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 내 리스트 관리 메뉴 — 목록 관리 작업 선택<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. Reading list3→4는 삭제된 목록의 자동 이전 증거가 아니다. | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="t-f47-02"></a>`T-F47-02` | [S081](REQUIREMENTS_04.md#s081) · [PNG](<../../medium/flows/Library/List detail/Deleting a list/screens/02_sc_71f31ac7803a47f89b2e76b6a9355a7c.png>) | 내 리스트 상세 항목 → 내 리스트 관리 메뉴. 현재 관찰값: 공개 상태 메뉴. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 리스트 삭제 확인 시트 — 삭제 전 영향 확인<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. Reading list3→4는 삭제된 목록의 자동 이전 증거가 아니다. | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="t-f47-03"></a>`T-F47-03` | [S114](REQUIREMENTS_05.md#s114) · [PNG](<../../medium/flows/Library/List detail/Deleting a list/screens/03_sc_a1562b1931fc4650a544861094934588.png>) | 내 리스트 관리 메뉴 → 리스트 삭제 확인 시트. 현재 관찰값: 내 라이브러리와 타인 저장에서 제거, 원문 기사는 삭제하지 않는다는 안내. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 리스트 삭제 후 라이브러리 — 대상 리스트 제거 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. Reading list3→4는 삭제된 목록의 자동 이전 증거가 아니다. | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="t-f47-04"></a>`T-F47-04` | [S085](REQUIREMENTS_04.md#s085) · [PNG](<../../medium/flows/Library/List detail/Deleting a list/screens/04_sc_7749ef5c35474c229a2515a9c2a53878.png>) | 리스트 삭제 확인 시트 → 리스트 삭제 후 라이브러리. 현재 관찰값: List deleted and removed from Your library, Reading list 4 stories. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. Reading list3→4는 삭제된 목록의 자동 이전 증거가 아니다. | [V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |

<a id="f48"></a>

## F48 — Library/List detail/Downloading a list

**Parity 8 검토:** T-F48-02(S165)·T-F48-03(S089)의 진행/완료와 일반·발행 혼합 사본, 취소/실패/재시도·복귀를 [이번 결과](../FE_MEDIUM_PARITY_08_RESULT.md)에 구분한다. T-F48-01은 묶음7 이력. 원본 미기록 분기는 자체 mock 계약이며 현재 전체302 suites/1578 tests·타입/lint·export를 통과했다.

[원본 분석](<../../medium/flows/Library/List detail/Downloading a list/ANALYSIS.md>)

**원본 흐름 목적:** 리스트 다운로드 요청의 정지 아이콘과 항목별 완료 표시를 비교한다.

기기 오프라인 상태에서 실제 본문을 열어 보지 않았다. 캐시 만료·일부 실패도 미확인이다.

- **진입:** 글 4개 리스트의 다운로드 컨트롤에서 시작한다.

- **종료:** 정지 모양을 거쳐 리스트·각 글 다운로드 아이콘이 채워진다.

- **미수록 분기:** 중단·부분 실패·재다운로드·캐시 삭제·저장 공간 부족·비행기 모드.

- **원본 해석:** 기기 오프라인 상태에서 실제 본문을 열어 보지 않았다. 캐시 만료·일부 실패도 미확인이다.

- **FE 검토:** mock 부분/취소/실패/재시도/캐시 제거 구현. 발행 글 본문 다운로드 미지원은 기존 명시 잔여. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [DownloadControl.tsx](<../../FE/src/features/downloads/DownloadControl.tsx>), [DownloadsNavigation.test.tsx](<../../FE/src/app/navigation/DownloadsNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f48-01"></a>`T-F48-01` | [S011](REQUIREMENTS_01.md#s011) · [PNG](<../../medium/flows/Library/List detail/Downloading a list/screens/01_sc_0b1e7b64b9f14f2cb5358161e0f67a94.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 리스트 다운로드 진행 — 다운로드 진행으로 보이는 상태<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="t-f48-02"></a>`T-F48-02` | [S165](REQUIREMENTS_07.md#s165) · [PNG](<../../medium/flows/Library/List detail/Downloading a list/screens/02_sc_d23a5b4ea6ff462f8a05ce2371e90734.png>) | 내 리스트 상세 항목 → 리스트 다운로드 진행. 현재 관찰값: 4 stories 유지. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 다운로드 표시 변경 — 다운로드 완료를 나타내는 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V26](../FE_MEDIUM_PARITY_BACKLOG.md#v26) |
| <a id="t-f48-03"></a>`T-F48-03` | [S089](REQUIREMENTS_04.md#s089) · [PNG](<../../medium/flows/Library/List detail/Downloading a list/screens/03_sc_7b31963fc5c64fc8b9268beab4009201.png>) | 리스트 다운로드 진행 → 다운로드 표시 변경. 현재 관찰값: 4 stories. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V26](../FE_MEDIUM_PARITY_BACKLOG.md#v26) |

<a id="f49"></a>

## F49 — Library/List detail/Making a list private

[원본 분석](<../../medium/flows/Library/List detail/Making a list private/ANALYSIS.md>)

**원본 흐름 목적:** 비공개 확인 대화상자, 변경 안내, 자물쇠 표시를 확인한다.

다른 사용자의 저장 라이브러리에서 제거된다는 문구가 있다. 상대 계정과 직접 링크 접근은 재현하지 않았다.

- **진입:** 공개 리스트의 Make list private 메뉴에서 시작한다.

- **종료:** 타인 저장 제거 경고 뒤 완료 토스트·자물쇠 표시가 생긴다.

- **미수록 분기:** Cancel·실패·타인 접근·재공개·타인 저장 복원·공유 링크 처리.

- **원본 해석:** 다른 사용자의 저장 라이브러리에서 제거된다는 문구가 있다. 상대 계정과 직접 링크 접근은 재현하지 않았다.

- **FE 검토:** public/private·취소·타인 접근/저장 제거·재공개 계약 구현. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ListPrivacyDialog.tsx](<../../FE/src/features/bookmarks/ListPrivacyDialog.tsx>), [ListManagementNavigation.test.tsx](<../../FE/src/app/navigation/ListManagementNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f49-01"></a>`T-F49-01` | [S011](REQUIREMENTS_01.md#s011) · [PNG](<../../medium/flows/Library/List detail/Making a list private/screens/01_sc_0b1e7b64b9f14f2cb5358161e0f67a94.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 내 리스트 관리 메뉴 — 목록 관리 작업 선택<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="t-f49-02"></a>`T-F49-02` | [S081](REQUIREMENTS_04.md#s081) · [PNG](<../../medium/flows/Library/List detail/Making a list private/screens/02_sc_71f31ac7803a47f89b2e76b6a9355a7c.png>) | 내 리스트 상세 항목 → 내 리스트 관리 메뉴. 현재 관찰값: 공개 상태 메뉴. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 리스트 비공개 확인 — 비공개 전 영향 안내<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="t-f49-03"></a>`T-F49-03` | [S105](REQUIREMENTS_05.md#s105) · [PNG](<../../medium/flows/Library/List detail/Making a list private/screens/03_sc_95e504331794455fb4776bd322254c76.png>) | 내 리스트 관리 메뉴 → 리스트 비공개 확인. 현재 관찰값: 다른 사용자가 저장한 목록이 라이브러리에서 제거된다는 안내. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 비공개 변경 성공 안내 — 비공개 전환 안내<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="t-f49-04"></a>`T-F49-04` | [S109](REQUIREMENTS_05.md#s109) · [PNG](<../../medium/flows/Library/List detail/Making a list private/screens/04_sc_996c48382ff0466099cf371adf783dae.png>) | 리스트 비공개 확인 → 비공개 변경 성공 안내. 현재 관찰값: About mindfulness is now private. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 비공개 리스트 표시 — 비공개 상태 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="t-f49-05"></a>`T-F49-05` | [S101](REQUIREMENTS_05.md#s101) · [PNG](<../../medium/flows/Library/List detail/Making a list private/screens/05_sc_91b39d224f6b4c9ab7573c0c3df633eb.png>) | 비공개 변경 성공 안내 → 비공개 리스트 표시. 현재 관찰값: 4 stories·자물쇠. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |

<a id="f50"></a>

## F50 — Library/List detail/Removing a story

[원본 분석](<../../medium/flows/Library/List detail/Removing a story/ANALYSIS.md>)

**원본 흐름 목적:** 리스트 항목 메뉴에서 제거하고 Undo 안내를 확인한다.

원문 기사 삭제가 아니라 리스트 구성에서의 제거다. Undo 실행과 복원된 메모·순서는 미수록이다.

- **진입:** 개별 글 메뉴의 Remove from list에서 시작한다.

- **종료:** 해당 항목 제거 안내와 Undo 링크가 보인다.

- **미수록 분기:** Undo 실행·시간 제한·메모/순서 복구·실패, 다른 리스트와 원문 유지.

- **원본 해석:** 원문 기사 삭제가 아니라 리스트 구성에서의 제거다. Undo 실행과 복원된 메모·순서는 미수록이다.

- **FE 검토:** 항목 제거/Undo·메모/순서 복원 구현. 이번 브라우저에서도 메모 복원 확인. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>), [UserListFeedback.tsx](<../../FE/src/features/bookmarks/UserListFeedback.tsx>), [ListEditingNavigation.test.tsx](<../../FE/src/app/navigation/ListEditingNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f50-01"></a>`T-F50-01` | [S195](REQUIREMENTS_08.md#s195) · [PNG](<../../medium/flows/Library/List detail/Removing a story/screens/01_sc_fa4e79f0bed747d698ae44e23f9223f9.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 리스트에서 기사 제거 — 항목 제거와 되돌리기 제공<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="t-f50-02"></a>`T-F50-02` | [S121](REQUIREMENTS_05.md#s121) · [PNG](<../../medium/flows/Library/List detail/Removing a story/screens/02_sc_a79a8c62cfd64776ae74f84e0d98b5c3.png>) | 리스트 항목 메뉴 → 리스트에서 기사 제거. 현재 관찰값: This item has been removed from your list. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |

<a id="f51"></a>

## F51 — Library/List detail/Reordering items

[원본 분석](<../../medium/flows/Library/List detail/Reordering items/ANALYSIS.md>)

**원본 흐름 목적:** 리스트 관리에서 드래그 순서를 바꾸고 Done 후 카드 순서 반영을 확인한다.

재정렬 전후 항목은 동일하다. 메모를 순서가 아닌 항목 정체성에 연결할 필요가 있다.

- **진입:** 리스트 메뉴에서 Reorder items를 연다.

- **종료:** 핸들로 표시된 새 순서 뒤 일반 목록의 앞 두 글 순서가 일치한다.

- **미수록 분기:** Cancel·마지막 두 글 재조회·동시 편집·저장 실패·메모 유지·접근성 이동.

- **원본 해석:** 재정렬 전후 항목은 동일하다. 메모를 순서가 아닌 항목 정체성에 연결할 필요가 있다.

- **FE 검토:** inline 순서 편집·경계 scroll·취소/적용·접근성 이동 구현. 실기기 제스처 미검증. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [useReorderDrag.ts](<../../FE/src/features/bookmarks/useReorderDrag.ts>), [ListEditingNavigation.test.tsx](<../../FE/src/app/navigation/ListEditingNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f51-01"></a>`T-F51-01` | [S011](REQUIREMENTS_01.md#s011) · [PNG](<../../medium/flows/Library/List detail/Reordering items/screens/01_sc_0b1e7b64b9f14f2cb5358161e0f67a94.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 내 리스트 관리 메뉴 — 목록 관리 작업 선택<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="t-f51-02"></a>`T-F51-02` | [S081](REQUIREMENTS_04.md#s081) · [PNG](<../../medium/flows/Library/List detail/Reordering items/screens/02_sc_71f31ac7803a47f89b2e76b6a9355a7c.png>) | 내 리스트 상세 항목 → 내 리스트 관리 메뉴. 현재 관찰값: 공개 상태 메뉴. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 리스트 순서 편집 — 재정렬 모드<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="t-f51-03"></a>`T-F51-03` | [S078](REQUIREMENTS_04.md#s078) · [PNG](<../../medium/flows/Library/List detail/Reordering items/screens/03_sc_6a1036b35729490195c460e5b934bd68.png>) | 내 리스트 관리 메뉴 → 리스트 순서 편집. 현재 관찰값: 기존 순서 유지. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 항목 순서 변경 — 저장 전 새 순서<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="t-f51-04"></a>`T-F51-04` | [S157](REQUIREMENTS_07.md#s157) · [PNG](<../../medium/flows/Library/List detail/Reordering items/screens/04_sc_cdf564e8e6a144389299ff49a7d626ce.png>) | 리스트 순서 편집 → 항목 순서 변경. 현재 관찰값: How Useful… → Mind Fullness or Emptiness? → Mind-Fullness → The Chimichurri…. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 변경 순서 반영 — 재정렬 결과 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="t-f51-05"></a>`T-F51-05` | [S077](REQUIREMENTS_04.md#s077) · [PNG](<../../medium/flows/Library/List detail/Reordering items/screens/05_sc_6840597985cc46b6b12f6cd0204756f4.png>) | 항목 순서 변경 → 변경 순서 반영. 현재 관찰값: 첫 2개 항목이 변경 순서와 일치, 1 second ago. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |

<a id="f52"></a>

## F52 — Logging in

[원본 분석](<../../medium/flows/Logging in/ANALYSIS.md>)

**원본 흐름 목적:** 가입 화면의 Sign in에서 공급자 선택·이메일 입력·코드 검증·홈 복귀까지 확인한다.

코드 요청·입력은 보이나 만료·오류·재전송 결과와 서버 세션은 미수록이다.

- **진입:** 가입 화면의 Sign in에서 공급자 선택으로 이동한다.

- **종료:** 이메일·코드 입력 뒤 Home이 수록된다. 빈 코드 화면의 sign up 문구는 불일치다.

- **미수록 분기:** 잘못된 이메일·미가입 계정·코드 만료/오입력/재전송·소셜 취소·세션 재진입.

- **원본 해석:** 코드 요청·입력은 보이나 만료·오류·재전송 결과와 서버 세션은 미수록이다.

- **FE 검토:** mock 소셜/이메일·코드·오류/재전송/취소 구현. 실제 인증 제외. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [AuthDialogs.tsx](<../../FE/src/features/auth/AuthDialogs.tsx>), [EmailLogin.tsx](<../../FE/src/features/auth/EmailLogin.tsx>), [createEmailAttempt.ts](<../../FE/src/features/auth/createEmailAttempt.ts>), [EmailAuthNavigation.test.tsx](<../../FE/src/app/navigation/EmailAuthNavigation.test.tsx>), [AuthNavigation.test.tsx](<../../FE/src/app/navigation/AuthNavigation.test.tsx>)

- **해석 주의:** 공유된 빈 코드 캡처는to sign up, 채워진 로그인 캡처는to sign in이다. fixture별 문구 차이와 런타임 인증 정책을 구분한다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f52-01"></a>`T-F52-01` | [S166](REQUIREMENTS_07.md#s166) · [PNG](<../../medium/flows/Logging in/screens/01_sc_d55739aa2ac1495da026006235e7c0a7.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 로그인 수단 선택 — 로그인 시작<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 공유된 빈 코드 캡처는to sign up, 채워진 로그인 캡처는to sign in이다. fixture별 문구 차이와 런타임 인증 정책을 구분한다. | [V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="t-f52-02"></a>`T-F52-02` | [S182](REQUIREMENTS_08.md#s182) · [PNG](<../../medium/flows/Logging in/screens/02_sc_e4d414380a1047a2b7970cf7869a0866.png>) | 가입 공급자 선택 → 로그인 수단 선택. 현재 관찰값: 입력 없음. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이메일 로그인 빈 폼 — 이메일 입력 전<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 공유된 빈 코드 캡처는to sign up, 채워진 로그인 캡처는to sign in이다. fixture별 문구 차이와 런타임 인증 정책을 구분한다. | [V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="t-f52-03"></a>`T-F52-03` | [S171](REQUIREMENTS_07.md#s171) · [PNG](<../../medium/flows/Logging in/screens/03_sc_da2ab413cfe5481d9abe4f23eeaeb426.png>) | 로그인 수단 선택 → 이메일 로그인 빈 폼. 현재 관찰값: janedoe@gmail.com 예시 문자열. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이메일 로그인 입력 완료 — 로그인 요청 전<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 공유된 빈 코드 캡처는to sign up, 채워진 로그인 캡처는to sign in이다. fixture별 문구 차이와 런타임 인증 정책을 구분한다. | [V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="t-f52-04"></a>`T-F52-04` | [S024](REQUIREMENTS_01.md#s024) · [PNG](<../../medium/flows/Logging in/screens/04_sc_1d3dc01005c343c18427fe2c199e4075.png>) | 이메일 로그인 빈 폼 → 이메일 로그인 입력 완료. 현재 관찰값: 샘플 계정 이메일 입력. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이메일 인증 코드 입력 대기 — 코드 미입력 상태다.<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 공유된 빈 코드 캡처는to sign up, 채워진 로그인 캡처는to sign in이다. fixture별 문구 차이와 런타임 인증 정책을 구분한다. | [V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="t-f52-05"></a>`T-F52-05` | [S013](REQUIREMENTS_01.md#s013) · [PNG](<../../medium/flows/Logging in/screens/05_sc_10e0a1c6f1154b3b85f8d5ed18b692d7.png>) | 이메일 로그인 입력 완료 → 이메일 인증 코드 입력 대기. 현재 관찰값: 샘플 계정 이메일을 대상으로 빈 코드 여섯 칸이 보인다. 이 화면은 가입과 로그인 흐름에 공통으로 수록되어 있다.. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 로그인 인증 코드 입력 — 이메일 코드 검증 준비<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 공유된 빈 코드 캡처는to sign up, 채워진 로그인 캡처는to sign in이다. fixture별 문구 차이와 런타임 인증 정책을 구분한다. | [V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="t-f52-06"></a>`T-F52-06` | [S134](REQUIREMENTS_06.md#s134) · [PNG](<../../medium/flows/Logging in/screens/06_sc_bc8c0aff71644874a42b97e6c7fd4ce2.png>) | 이메일 인증 코드 입력 대기 → 로그인 인증 코드 입력. 현재 관찰값: 6자리 코드 채워짐. 인증값은 문서에 재기록하지 않음. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: For you 홈 피드 — 추천 기사 목록<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 공유된 빈 코드 캡처는to sign up, 채워진 로그인 캡처는to sign in이다. fixture별 문구 차이와 런타임 인증 정책을 구분한다. | [V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="t-f52-07"></a>`T-F52-07` | [S069](REQUIREMENTS_03.md#s069) · [PNG](<../../medium/flows/Logging in/screens/07_sc_5e0ba0e498ff49579bf838096aec4b5e.png>) | 로그인 인증 코드 입력 → For you 홈 피드. 현재 관찰값: For you 활성. 작가·제목·요약·썸네일·날짜·박수·응답 수 표시. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 공유된 빈 코드 캡처는to sign up, 채워진 로그인 캡처는to sign in이다. fixture별 문구 차이와 런타임 인증 정책을 구분한다. | [V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |

<a id="f53"></a>

## F53 — Onboarding

[원본 분석](<../../medium/flows/Onboarding/ANALYSIS.md>)

**원본 흐름 목적:** 브랜드 진입부터 이메일 가입·코드 검증·관심사·추천 팔로우·알림 안내를 거쳐 홈으로 이동하는 온보딩을 분석한다.

환영 문구에 기존 읽기 경험을 바꾸는 안내가 섞인다. 구독 선택 화면 뒤 홈이 나오지만 이 부모 흐름만으로 결제 완료를 단정하지 않는다.

- **진입:** 브랜드 화면과 가입 공급자 선택에서 시작한다. 계정 생성 전후의 실제 인증 상태는 미재현이다.

- **종료:** 이메일 코드, 관심사 5개, 추천 대상, 알림 안내, 구독 제안 뒤 Home이 수록된다.

- **미수록 분기:** 관심사 0~2개·정확히 3개, 알림 Skip/OS 거부, 소셜 인증, 이메일 오류·재전송, 구독 닫기 결과.

- **원본 해석:** 환영 문구에 기존 읽기 경험을 바꾸는 안내가 섞인다. 구독 선택 화면 뒤 홈이 나오지만 이 부모 흐름만으로 결제 완료를 단정하지 않는다.

- **FE 검토:** 관심사 3개 경계·Follow·권한 Skip/거절·회원 안내/재개 구현. native splash/권한 UI 별도. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [OnboardingScreen.tsx](<../../FE/src/features/onboarding/OnboardingScreen.tsx>), [createOnboardingSession.ts](<../../FE/src/features/onboarding/createOnboardingSession.ts>), [OnboardingNavigation.test.tsx](<../../FE/src/app/navigation/OnboardingNavigation.test.tsx>)

- **해석 주의:** 새 경험 소개가 신규 사용자 전용이라는 증거는 없다. 멤버십 화면 뒤 Home은 실제 결제 영수증이 아니다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f53-01"></a>`T-F53-01` | [S043](REQUIREMENTS_02.md#s043) · [PNG](<../../medium/flows/Onboarding/screens/01_sc_39bd15e8585d404daa48b34a448b0e32.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 가입 공급자 선택 — 신규 가입과 기존 사용자 로그인을 구분하는 진입 화면이다.<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 새 경험 소개가 신규 사용자 전용이라는 증거는 없다. 멤버십 화면 뒤 Home은 실제 결제 영수증이 아니다. | [V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="t-f53-02"></a>`T-F53-02` | [S166](REQUIREMENTS_07.md#s166) · [PNG](<../../medium/flows/Onboarding/screens/02_sc_d55739aa2ac1495da026006235e7c0a7.png>) | 브랜드 시작 화면 → 가입 공급자 선택. 현재 관찰값: 직접 입력 필드는 없다.. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이메일 가입 기본 폼 — 빈 이메일 가입 폼이다.<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 새 경험 소개가 신규 사용자 전용이라는 증거는 없다. 멤버십 화면 뒤 Home은 실제 결제 영수증이 아니다. | [V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="t-f53-03"></a>`T-F53-03` | [S117](REQUIREMENTS_05.md#s117) · [PNG](<../../medium/flows/Onboarding/screens/03_sc_a4438be77c814444b7f0c005ee44e8b6.png>) | 가입 공급자 선택 → 이메일 가입 기본 폼. 현재 관찰값: Your full name과 Your email에 예시 placeholder가 보이며 비밀번호 필드는 없다.. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이름과 이메일 입력 완료 — 입력 후 제출 전 캡처다.<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 새 경험 소개가 신규 사용자 전용이라는 증거는 없다. 멤버십 화면 뒤 Home은 실제 결제 영수증이 아니다. | [V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="t-f53-04"></a>`T-F53-04` | [S054](REQUIREMENTS_03.md#s054) · [PNG](<../../medium/flows/Onboarding/screens/04_sc_4510def6bbb1459ab0b5f18d07b8427e.png>) | 이메일 가입 기본 폼 → 이름과 이메일 입력 완료. 현재 관찰값: Alex Smith와 이메일 샘플이 채워졌다. 비밀번호 입력은 없다.. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이메일 인증 코드 입력 대기 — 코드 미입력 상태다.<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 새 경험 소개가 신규 사용자 전용이라는 증거는 없다. 멤버십 화면 뒤 Home은 실제 결제 영수증이 아니다. | [V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="t-f53-05"></a>`T-F53-05` | [S013](REQUIREMENTS_01.md#s013) · [PNG](<../../medium/flows/Onboarding/screens/05_sc_10e0a1c6f1154b3b85f8d5ed18b692d7.png>) | 이름과 이메일 입력 완료 → 이메일 인증 코드 입력 대기. 현재 관찰값: 샘플 계정 이메일을 대상으로 빈 코드 여섯 칸이 보인다. 이 화면은 가입과 로그인 흐름에 공통으로 수록되어 있다.. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 가입 인증 코드 입력 완료 — 입력 완성에 따른 제출 가능 표현이다.<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 새 경험 소개가 신규 사용자 전용이라는 증거는 없다. 멤버십 화면 뒤 Home은 실제 결제 영수증이 아니다. | [V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="t-f53-06"></a>`T-F53-06` | [S064](REQUIREMENTS_03.md#s064) · [PNG](<../../medium/flows/Onboarding/screens/06_sc_55d8ee5f826740d69ebd2e163aaa6486.png>) | 이메일 인증 코드 입력 대기 → 가입 인증 코드 입력 완료. 현재 관찰값: 6자리 숫자가 입력돼 있다. 실제 인증 값은 문서에 재기록하지 않는다.. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 새 읽기 경험 소개 — 앱 업데이트와 팔로잉 재검토를 안내한다.<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 새 경험 소개가 신규 사용자 전용이라는 증거는 없다. 멤버십 화면 뒤 Home은 실제 결제 영수증이 아니다. | [V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="t-f53-07"></a>`T-F53-07` | [S041](REQUIREMENTS_02.md#s041) · [PNG](<../../medium/flows/Onboarding/screens/07_sc_3795c955a89d404c85112e637857e74a.png>) | 가입 인증 코드 입력 완료 → 새 읽기 경험 소개. 현재 관찰값: 입력 필드는 없다.. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 관심 주제 미선택 — 최소 선택 개수를 안내하는 초기 상태다.<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 새 경험 소개가 신규 사용자 전용이라는 증거는 없다. 멤버십 화면 뒤 Home은 실제 결제 영수증이 아니다. | [V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="t-f53-08"></a>`T-F53-08` | [S067](REQUIREMENTS_03.md#s067) · [PNG](<../../medium/flows/Onboarding/screens/08_sc_5843ae43bf154aadb5507c6fa51d150d.png>) | 새 읽기 경험 소개 → 관심 주제 미선택. 현재 관찰값: 주제 3개 이상 선택 안내가 있고 보이는 칩은 미선택이다.. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 관심 주제 다중 선택 — 5개 주제 선택과 진행 버튼 변화가 관찰된다.<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 새 경험 소개가 신규 사용자 전용이라는 증거는 없다. 멤버십 화면 뒤 Home은 실제 결제 영수증이 아니다. | [V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="t-f53-09"></a>`T-F53-09` | [S006](REQUIREMENTS_01.md#s006) · [PNG](<../../medium/flows/Onboarding/screens/09_sc_05f2a886f5464a728dd61a6291707a3d.png>) | 관심 주제 미선택 → 관심 주제 다중 선택. 현재 관찰값: Technology·Self Improvement·Writing·Relationships·Psychology가 선택되어 있다.. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 관심사 기반 작가·발행물 추천 — 팔로우 전 추천 목록<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 새 경험 소개가 신규 사용자 전용이라는 증거는 없다. 멤버십 화면 뒤 Home은 실제 결제 영수증이 아니다. | [V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="t-f53-10"></a>`T-F53-10` | [S035](REQUIREMENTS_02.md#s035) · [PNG](<../../medium/flows/Onboarding/screens/10_sc_301ef788e5514bb5b8e9c1fc9afcfa61.png>) | 관심 주제 다중 선택 → 관심사 기반 작가·발행물 추천. 현재 관찰값: 별도 입력란 없음. 작가와 Publication이 함께 표시됨. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 알림 활성화 안내 — 알림 권한 요청 전 앱 안내<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 새 경험 소개가 신규 사용자 전용이라는 증거는 없다. 멤버십 화면 뒤 Home은 실제 결제 영수증이 아니다. | [V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="t-f53-11"></a>`T-F53-11` | [S184](REQUIREMENTS_08.md#s184) · [PNG](<../../medium/flows/Onboarding/screens/11_sc_e9f4c426cfb3426d9ca05121dea00ce3.png>) | 관심사 기반 작가·발행물 추천 → 알림 활성화 안내. 현재 관찰값: 입력란 없음. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 월간 멤버십 선택 — 월간 플랜 소개와 혜택 목록<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 새 경험 소개가 신규 사용자 전용이라는 증거는 없다. 멤버십 화면 뒤 Home은 실제 결제 영수증이 아니다. | [V30](../FE_MEDIUM_PARITY_BACKLOG.md#v30) |
| <a id="t-f53-12"></a>`T-F53-12` | [S129](REQUIREMENTS_06.md#s129) · [PNG](<../../medium/flows/Onboarding/screens/12_sc_b4e85416681544c9b996826eefa22432.png>) | 알림 활성화 안내 → 월간 멤버십 선택. 현재 관찰값: Pay monthly 선택. 캡처 금액 $6.98 SGD/month. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: For you 홈 피드 — 추천 기사 목록<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 새 경험 소개가 신규 사용자 전용이라는 증거는 없다. 멤버십 화면 뒤 Home은 실제 결제 영수증이 아니다. | [V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="t-f53-13"></a>`T-F53-13` | [S069](REQUIREMENTS_03.md#s069) · [PNG](<../../medium/flows/Onboarding/screens/13_sc_5e0ba0e498ff49579bf838096aec4b5e.png>) | 월간 멤버십 선택 → For you 홈 피드. 현재 관찰값: For you 활성. 작가·제목·요약·썸네일·날짜·박수·응답 수 표시. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 새 경험 소개가 신규 사용자 전용이라는 증거는 없다. 멤버십 화면 뒤 Home은 실제 결제 영수증이 아니다. | [V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |

<a id="f54"></a>

## F54 — Onboarding/Subscribing to Medium

[원본 분석](<../../medium/flows/Onboarding/Subscribing to Medium/ANALYSIS.md>)

**원본 흐름 목적:** 월간 플랜 선택에서 로딩·구매 성공 안내·멤버 환영·홈 복귀까지 확인한다.

Member와 Friend의 SGD 월간 표시 가격은 캡처 관찰값이다. 스토어 구매 확인·영수증·갱신 분기는 수록되지 않았다.

- **진입:** 월간 결제와 Member 선택 UI가 보인다.

- **종료:** 로딩 → 구매 성공 팝업 → 멤버 환영 → Home. 영수증은 없다.

- **미수록 분기:** 연간·Friend 실제 선택, 스토어 확인·취소·실패·복원, 갱신·해지.

- **원본 해석:** Member와 Friend의 SGD 월간 표시 가격은 캡처 관찰값이다. 스토어 구매 확인·영수증·갱신 분기는 수록되지 않았다.

- **FE 검토:** mock 월/연간·Member/Friend·로딩/성공/취소/실패 구현. 실제 결제/복원/갱신 제외. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [MembershipSheet.tsx](<../../FE/src/features/membership/MembershipSheet.tsx>), [MembershipNavigation.test.tsx](<../../FE/src/app/navigation/MembershipNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f54-01"></a>`T-F54-01` | [S129](REQUIREMENTS_06.md#s129) · [PNG](<../../medium/flows/Onboarding/Subscribing to Medium/screens/01_sc_b4e85416681544c9b996826eefa22432.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: Member 혜택과 Friend 플랜 노출 — 오프라인·오디오 등 혜택 설명<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="t-f54-02"></a>`T-F54-02` | [S059](REQUIREMENTS_03.md#s059) · [PNG](<../../medium/flows/Onboarding/Subscribing to Medium/screens/02_sc_4beaf37694cb429baac5c27b93a71ccf.png>) | 월간 멤버십 선택 → Member 혜택과 Friend 플랜 노출. 현재 관찰값: Member $6.98 SGD/month, Friend $19.98 SGD/month. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 멤버십 선택 처리 중 — 요청 처리 중으로 보이는 로딩 상태<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="t-f54-03"></a>`T-F54-03` | [S084](REQUIREMENTS_04.md#s084) · [PNG](<../../medium/flows/Onboarding/Subscribing to Medium/screens/03_sc_754aff4161c64e0685e7331a359eae32.png>) | Member 혜택과 Friend 플랜 노출 → 멤버십 선택 처리 중. 현재 관찰값: 선택 버튼 흐리게 표시. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 구매 성공 안내 팝업 — 캡처에 구매 성공 메시지 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="t-f54-04"></a>`T-F54-04` | [S133](REQUIREMENTS_06.md#s133) · [PNG](<../../medium/flows/Onboarding/Subscribing to Medium/screens/04_sc_bb00623f121d405abc840e589837c3fd.png>) | 멤버십 선택 처리 중 → 구매 성공 안내 팝업. 현재 관찰값: 입력 없음. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 멤버 가입 완료 화면 — 멤버십 완료 안내<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="t-f54-05"></a>`T-F54-05` | [S159](REQUIREMENTS_07.md#s159) · [PNG](<../../medium/flows/Onboarding/Subscribing to Medium/screens/05_sc_cf306e89e43144029ce108cb5338132a.png>) | 구매 성공 안내 팝업 → 멤버 가입 완료 화면. 현재 관찰값: 입력 없음. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: For you 홈 피드 — 추천 기사 목록<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V31](../FE_MEDIUM_PARITY_BACKLOG.md#v31) |
| <a id="t-f54-06"></a>`T-F54-06` | [S069](REQUIREMENTS_03.md#s069) · [PNG](<../../medium/flows/Onboarding/Subscribing to Medium/screens/06_sc_5e0ba0e498ff49579bf838096aec4b5e.png>) | 멤버 가입 완료 화면 → For you 홈 피드. 현재 관찰값: For you 활성. 작가·제목·요약·썸네일·날짜·박수·응답 수 표시. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |

<a id="f55"></a>

## F55 — Profile

[원본 분석](<../../medium/flows/Profile/ANALYSIS.md>)

**원본 흐름 목적:** 홈에서 내 프로필을 열어 Stories·Lists·About의 빈 상태와 콘텐츠 상태를 비교한다.

발행 과정은 Home 아래 Publishing a story, 사진·소개·대명사 입력은 Profile 아래 편집 흐름에 있다. 부모 캡처 사이의 데이터 변화 원인을 임의로 채우지 않는다.

- **진입:** Home 뒤 본인 프로필에서 시작한다.

- **종료:** Stories 빈/게시 상태, Lists의 비공개 읽기 목록, About 빈/채워진 상태를 비교한다.

- **미수록 분기:** Public 필터 옵션·게시 글 메뉴·타인 시점·소개 편집 진입·조회 실패.

- **원본 해석:** 발행 과정은 Home 아래 Publishing a story, 사진·소개·대명사 입력은 Profile 아래 편집 흐름에 있다. 부모 캡처 사이의 데이터 변화 원인을 임의로 채우지 않는다.

- **FE 검토:** 본인 Stories/Lists/About·Public/Unlisted·통계/편집 연결 구현. 내 Following 행 A08. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [ProfileLists.tsx](<../../FE/src/features/profile/ProfileLists.tsx>), [ProfileDetailsNavigation.test.tsx](<../../FE/src/app/navigation/ProfileDetailsNavigation.test.tsx>), [PublishedLibrarySession.test.tsx](<../../FE/src/app/navigation/PublishedLibrarySession.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f55-01"></a>`T-F55-01` | [S069](REQUIREMENTS_03.md#s069) · [PNG](<../../medium/flows/Profile/screens/01_sc_5e0ba0e498ff49579bf838096aec4b5e.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 내 프로필 빈 Stories — 발행 글 없음<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="t-f55-02"></a>`T-F55-02` | [S020](REQUIREMENTS_01.md#s020) · [PNG](<../../medium/flows/Profile/screens/02_sc_1bd141b757934a88b4a003855e1794cc.png>) | For you 홈 피드 → 내 프로필 빈 Stories. 현재 관찰값: Alex Smith, 0 followers·1 following. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 발행 글과 반응 있는 프로필 — 발행 후 반응 집계<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="t-f55-03"></a>`T-F55-03` | [S169](REQUIREMENTS_07.md#s169) · [PNG](<../../medium/flows/Profile/screens/03_sc_d76d3680605f4b62ab31e3039d6c4fe6.png>) | 내 프로필 빈 Stories → 발행 글과 반응 있는 프로필. 현재 관찰값: 23h ago, 박수29·응답1. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 내 프로필 Lists — 소유자가 비공개 목록을 봄<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="t-f55-04"></a>`T-F55-04` | [S074](REQUIREMENTS_03.md#s074) · [PNG](<../../medium/flows/Profile/screens/04_sc_64afef71457f48808c33def66fd6d90e.png>) | 발행 글과 반응 있는 프로필 → 내 프로필 Lists. 현재 관찰값: 4 stories·자물쇠. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 내 소개 빈 상태 — 소개 미작성<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="t-f55-05"></a>`T-F55-05` | [S167](REQUIREMENTS_07.md#s167) · [PNG](<../../medium/flows/Profile/screens/05_sc_d55f02281f894078a734269d60de79c4.png>) | 내 프로필 Lists → 내 소개 빈 상태. 현재 관찰값: Medium member since June 2025. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 프로필 소개·사진·대명사 표시 — 프로필 정보 반영<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="t-f55-06"></a>`T-F55-06` | [S047](REQUIREMENTS_02.md#s047) · [PNG](<../../medium/flows/Profile/screens/06_sc_3cd0855e78a84d4ea413f0e5b3dffb73.png>) | 내 소개 빈 상태 → 프로필 소개·사진·대명사 표시. 현재 관찰값: Curious mind sharing thoughts one story at a time. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |

이전 기능 점검 발견 연결: A03, A08 — [재현 근거·현재 범위](../FE_MEDIUM_PARITY_AUDIT.md#evidence).

<a id="f56"></a>

## F56 — Profile/Editing profile information/Adding pronouns

[원본 분석](<../../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>)

**원본 흐름 목적:** 대명사 검색과 he·him 선택 후 상위 프로필 폼으로 반환하는 흐름을 분석한다.

최종 프로필 Save 화면 이후 결과는 이 자식 흐름에 없다. Done과 프로필 저장을 구분한다.

- **진입:** 프로필 편집의 Pronouns 0/4에서 시작한다.

- **종료:** he·him 선택 후 2/4가 상위 폼에 반영된다. Save 이전에 흐름이 끝난다.

- **미수록 분기:** 칩 삭제·4개/5번째 선택·중복·검색 0건·사용자 정의·Save/취소.

- **원본 해석:** 최종 프로필 Save 화면 이후 결과는 이 자식 흐름에 없다. Done과 프로필 저장을 구분한다.

- **FE 검토:** 이름/bio·대명사/사진·저장/취소/권한 어댑터 구현. OS 선택기 실기기 검증 대기. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>), [ProfileNavigation.test.tsx](<../../FE/src/app/navigation/ProfileNavigation.test.tsx>), [ProfileDetailsNavigation.test.tsx](<../../FE/src/app/navigation/ProfileDetailsNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f56-01"></a>`T-F56-01` | [S005](REQUIREMENTS_01.md#s005) · [PNG](<../../medium/flows/Profile/Editing profile information/Adding pronouns/screens/01_sc_05df03a16c6b466b8ba91d9d6244c2f5.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 대명사 선택 빈 폼 — 대명사 미선택<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="t-f56-02"></a>`T-F56-02` | [S082](REQUIREMENTS_04.md#s082) · [PNG](<../../medium/flows/Profile/Editing profile information/Adding pronouns/screens/02_sc_743e421bb2b14205b19b76062fdf27cd.png>) | 프로필 사진 선택 반영 → 대명사 선택 빈 폼. 현재 관찰값: 0/4. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 대명사 검색 — 검색어에 맞춘 대명사 선택<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="t-f56-03"></a>`T-F56-03` | [S080](REQUIREMENTS_04.md#s080) · [PNG](<../../medium/flows/Profile/Editing profile information/Adding pronouns/screens/03_sc_6c7a00132f3c47e6b2e803743cc10d21.png>) | 대명사 선택 빈 폼 → 대명사 검색. 현재 관찰값: he, her 후보. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 대명사 1개 선택 — 첫 대명사 선택<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="t-f56-04"></a>`T-F56-04` | [S120](REQUIREMENTS_05.md#s120) · [PNG](<../../medium/flows/Profile/Editing profile information/Adding pronouns/screens/04_sc_a6051a9dd4514d3694dde85cd95c6b6d.png>) | 대명사 검색 → 대명사 1개 선택. 현재 관찰값: 1/4. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 대명사 2개 선택 — 두 대명사 선택<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="t-f56-05"></a>`T-F56-05` | [S094](REQUIREMENTS_04.md#s094) · [PNG](<../../medium/flows/Profile/Editing profile information/Adding pronouns/screens/05_sc_82178c6b5a56471cb64fecb5a4e4bc4e.png>) | 대명사 1개 선택 → 대명사 2개 선택. 현재 관찰값: 2/4. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 프로필 폼으로 대명사 반환 — 선택값 폼에 반영<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="t-f56-06"></a>`T-F56-06` | [S027](REQUIREMENTS_02.md#s027) · [PNG](<../../medium/flows/Profile/Editing profile information/Adding pronouns/screens/06_sc_20bfc41de9f845119aea54bb5971a01e.png>) | 대명사 2개 선택 → 프로필 폼으로 대명사 반환. 현재 관찰값: 2/4, 소개 빈값. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |

<a id="f57"></a>

## F57 — Profile/Editing profile information

[원본 분석](<../../medium/flows/Profile/Editing profile information/ANALYSIS.md>)

**원본 흐름 목적:** 이름·사진·대명사·짧은 소개 편집과 프로필 Stories·About 반영을 확인한다.

사진 권한과 전송 과정은 미수록이다. 앱에서 안내하는 별도 About Page 편집은 데스크톱 웹 경로다.

- **진입:** 본인 프로필 편집에서 이름·대명사·소개를 표시한다.

- **종료:** 사진·대명사·소개 입력 뒤 프로필에 사진/he·him/소개가 반영된다.

- **미수록 분기:** Name 50·bio 160 경계·빈 이름·Cancel·사진 권한/실패·웹 About 편집.

- **원본 해석:** 사진 권한과 전송 과정은 미수록이다. 앱에서 안내하는 별도 About Page 편집은 데스크톱 웹 경로다.

- **FE 검토:** 이름/bio·대명사/사진·저장/취소/권한 어댑터 구현. OS 선택기 실기기 검증 대기. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>), [ProfileNavigation.test.tsx](<../../FE/src/app/navigation/ProfileNavigation.test.tsx>), [ProfileDetailsNavigation.test.tsx](<../../FE/src/app/navigation/ProfileDetailsNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f57-01"></a>`T-F57-01` | [S020](REQUIREMENTS_01.md#s020) · [PNG](<../../medium/flows/Profile/Editing profile information/screens/01_sc_1bd141b757934a88b4a003855e1794cc.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 프로필 편집 폼 — 이름 필수 표시·소개 선택<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="t-f57-02"></a>`T-F57-02` | [S123](REQUIREMENTS_05.md#s123) · [PNG](<../../medium/flows/Profile/Editing profile information/screens/02_sc_a829121c47a444cd8a8fd0d9889edaed.png>) | 내 프로필 빈 Stories → 프로필 편집 폼. 현재 관찰값: Alex Smith10/50, Pronouns0/4, Short bio0/160. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 프로필 사진 소스 선택 — 사진 추가 방식 선택<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="t-f57-03"></a>`T-F57-03` | [S156](REQUIREMENTS_07.md#s156) · [PNG](<../../medium/flows/Profile/Editing profile information/screens/03_sc_cba29e82e4364a239d3e5423213fa670.png>) | 프로필 편집 폼 → 프로필 사진 소스 선택. 현재 관찰값: 기존 폼 유지. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 기기 사진 선택기 — OS 사진 선택 UI<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="t-f57-04"></a>`T-F57-04` | [S113](REQUIREMENTS_05.md#s113) · [PNG](<../../medium/flows/Profile/Editing profile information/screens/04_sc_9fd133df622e4ddd859bbbeb845ba4da.png>) | 프로필 사진 소스 선택 → 기기 사진 선택기. 현재 관찰값: 사진 4개, Location Is Included. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 프로필 사진 선택 반영 — 선택 사진 미리보기<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="t-f57-05"></a>`T-F57-05` | [S005](REQUIREMENTS_01.md#s005) · [PNG](<../../medium/flows/Profile/Editing profile information/screens/05_sc_05df03a16c6b466b8ba91d9d6244c2f5.png>) | 기기 사진 선택기 → 프로필 사진 선택 반영. 현재 관찰값: 이름 유지·대명사와 소개 빈값. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 대명사·소개 입력된 프로필 — 저장 전 정보 완성<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="t-f57-06"></a>`T-F57-06` | [S138](REQUIREMENTS_06.md#s138) · [PNG](<../../medium/flows/Profile/Editing profile information/screens/06_sc_befb6fde38cc48f3827ea389caed11de.png>) | 프로필 사진 선택 반영 → 대명사·소개 입력된 프로필. 현재 관찰값: Pronouns2/4, Short bio49/160. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 프로필 편집 결과 — 사진·대명사 반영<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="t-f57-07"></a>`T-F57-07` | [S136](REQUIREMENTS_06.md#s136) · [PNG](<../../medium/flows/Profile/Editing profile information/screens/07_sc_be99c4fdcf634190a324ec9820a84f43.png>) | 대명사·소개 입력된 프로필 → 프로필 편집 결과. 현재 관찰값: 이름·기사 유지. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 프로필 소개·사진·대명사 표시 — 프로필 정보 반영<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="t-f57-08"></a>`T-F57-08` | [S047](REQUIREMENTS_02.md#s047) · [PNG](<../../medium/flows/Profile/Editing profile information/screens/08_sc_3cd0855e78a84d4ea413f0e5b3dffb73.png>) | 프로필 편집 결과 → 프로필 소개·사진·대명사 표시. 현재 관찰값: Curious mind sharing thoughts one story at a time. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |

<a id="f58"></a>

## F58 — Profile/Settings

[원본 분석](<../../medium/flows/Profile/Settings/ANALYSIS.md>)

**원본 흐름 목적:** 프로필에서 계정·결제·추천·테마·알림·아이콘·소셜·도움말·로그아웃 진입점을 확인한다.

하단에 4.263.185257 버전이 표시된다. 이 값이 다른 모든 흐름의 앱 빌드임을 보장하지 않는다.

- **진입:** 프로필 톱니바퀴에서 설정에 진입한다.

- **종료:** 계정·구독·편집·추천·외관·알림·아이콘·외부 연결·로그아웃 메뉴와 빌드가 보인다.

- **미수록 분기:** Account·Membership and payment·Email·Facebook·More app controls의 실제 하위 화면.

- **원본 해석:** 하단에 4.263.185257 버전이 표시된다. 이 값이 다른 모든 흐름의 앱 빌드임을 보장하지 않는다.

- **FE 검토:** 설정 진입·mock 계정/소셜/controls·정책 링크/오류 구현. 외부 서비스 자체는 제외. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [SettingsScreen.tsx](<../../FE/src/features/settings/SettingsScreen.tsx>), [SettingsExtrasScreen.tsx](<../../FE/src/features/settings/SettingsExtrasScreen.tsx>), [SettingsExtrasNavigation.test.tsx](<../../FE/src/app/navigation/SettingsExtrasNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f58-01"></a>`T-F58-01` | [S169](REQUIREMENTS_07.md#s169) · [PNG](<../../medium/flows/Profile/Settings/screens/01_sc_d76d3680605f4b62ab31e3039d6c4fe6.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 설정 상단 — 주요 설정 진입점<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="t-f58-02"></a>`T-F58-02` | [S173](REQUIREMENTS_07.md#s173) · [PNG](<../../medium/flows/Profile/Settings/screens/02_sc_ddd51660cb8346a1b200ed970a2d5c45.png>) | 발행 글과 반응 있는 프로필 → 설정 상단. 현재 관찰값: Appearance System default 선택. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 설정 하단 — 설정과 앱 버전 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="t-f58-03"></a>`T-F58-03` | [S149](REQUIREMENTS_06.md#s149) · [PNG](<../../medium/flows/Profile/Settings/screens/03_sc_c653047933aa40b2be7a8f281643d41d.png>) | 설정 상단 → 설정 하단. 현재 관찰값: Facebook Connect, Version 4.263.185257. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |

<a id="f59"></a>

## F59 — Profile/Settings/Changing notification settings

[원본 분석](<../../medium/flows/Profile/Settings/Changing notification settings/ANALYSIS.md>)

**원본 흐름 목적:** 푸시 알림 유형별 스위치를 확인하고 추천 알림 두 항목만 끈 결과를 비교한다.

Tailored for you의 다른 옵션은 열리지 않았다. 앱 선호와 OS 푸시 권한을 구분한다.

- **진입:** Settings의 Push notifications에서 시작한다.

- **종료:** Top story와 Editors만 Off로 바뀌고 다른 보이는 값은 유지된다.

- **미수록 분기:** Tailored 옵션·화면 아래 잘린 행·OS 권한·전송 결과·저장 실패·재진입.

- **원본 해석:** Tailored for you의 다른 옵션은 열리지 않았다. 앱 선호와 OS 푸시 권한을 구분한다.

- **FE 검토:** Digest/Push/Email 공유 선호·옵션·취소/실패 구현. 실제 전송 제외. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [NotificationSettingsScreen.tsx](<../../FE/src/features/notifications/NotificationSettingsScreen.tsx>), [NotificationNavigation.test.tsx](<../../FE/src/app/navigation/NotificationNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f59-01"></a>`T-F59-01` | [S173](REQUIREMENTS_07.md#s173) · [PNG](<../../medium/flows/Profile/Settings/Changing notification settings/screens/01_sc_ddd51660cb8346a1b200ed970a2d5c45.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 푸시 알림 상세 설정 — 이벤트별 푸시 제어<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="t-f59-02"></a>`T-F59-02` | [S186](REQUIREMENTS_08.md#s186) · [PNG](<../../medium/flows/Profile/Settings/Changing notification settings/screens/02_sc_ee2e76b092df4d309bfd0633f25273a6.png>) | 설정 상단 → 푸시 알림 상세 설정. 현재 관찰값: Digest·Top story·Editors·Featured·Applause·Saves 켜짐, 여러 항목 Tailored for you. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 추천 알림 두 항목 끄기 — 선택 알림만 비활성<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |
| <a id="t-f59-03"></a>`T-F59-03` | [S040](REQUIREMENTS_02.md#s040) · [PNG](<../../medium/flows/Profile/Settings/Changing notification settings/screens/03_sc_368c53cd77e2421e8279124ce03301f4.png>) | 푸시 알림 상세 설정 → 추천 알림 두 항목 끄기. 현재 관찰값: Your top story of the day·Editors 꺼짐, Digest 켜짐. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V28](../FE_MEDIUM_PARITY_BACKLOG.md#v28) |

<a id="f60"></a>

## F60 — Profile/Settings/Custom app icon

[원본 분석](<../../medium/flows/Profile/Settings/Custom app icon/ANALYSIS.md>)

**원본 흐름 목적:** 아이콘 선택 화면의 기본 선택과 Friend of Medium 잠금 안내를 확인한다.

실제 아이콘 변경 성공 흐름은 없다. 잠금 안내와 제공 가능한 행동의 범위를 문서에 구분한다.

- **진입:** Settings의 Custom app icon에서 시작한다.

- **종료:** Wordmark Black 선택과 Friend 업그레이드 잠금 안내만 확인한다.

- **미수록 분기:** 전체 아이콘 목록·Friend 해제·대체 아이콘 선택·OS 결과·실패·재시작.

- **원본 해석:** 실제 아이콘 변경 성공 흐름은 없다. 잠금 안내와 제공 가능한 행동의 범위를 문서에 구분한다.

- **FE 검토:** Friend 잠금/선택·아이콘 OS 어댑터 구현. 원본 자산·잘린 카드/실기기 미검증. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [AppIconScreen.tsx](<../../FE/src/features/app-icon/AppIconScreen.tsx>), [SettingsExtrasNavigation.test.tsx](<../../FE/src/app/navigation/SettingsExtrasNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f60-01"></a>`T-F60-01` | [S173](REQUIREMENTS_07.md#s173) · [PNG](<../../medium/flows/Profile/Settings/Custom app icon/screens/01_sc_ddd51660cb8346a1b200ed970a2d5c45.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 앱 아이콘 선택과 멤버십 제한 — 아이콘 변경 기능 잠금 안내<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="t-f60-02"></a>`T-F60-02` | [S075](REQUIREMENTS_03.md#s075) · [PNG](<../../medium/flows/Profile/Settings/Custom app icon/screens/02_sc_64b75d913b284d708ab44e4f3663a59f.png>) | 설정 상단 → 앱 아이콘 선택과 멤버십 제한. 현재 관찰값: Wordmark Black 선택, 다른 아이콘 흐림. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |

<a id="f61"></a>

## F61 — Profile/Settings/Logging out

[원본 분석](<../../medium/flows/Profile/Settings/Logging out/ANALYSIS.md>)

**원본 흐름 목적:** Settings의 Sign out 확인 후 가입·로그인 진입 화면 복귀를 확인한다.

모든 기기 세션 종료나 캐시 삭제를 증명하지 않는다. 현재 기기 로그아웃 경로를 분석한다.

- **진입:** Settings 하단 Sign out에서 시작한다.

- **종료:** Cancel/Confirm 팝업 뒤 가입/로그인 진입 화면이 보인다.

- **미수록 분기:** Cancel·실패·캐시 정리·보호 화면 뒤로 이동·다른 기기 세션 영향.

- **원본 해석:** 모든 기기 세션 종료나 캐시 삭제를 증명하지 않는다. 현재 기기 로그아웃 경로를 분석한다.

- **FE 검토:** 로그아웃 확인/취소·개인 route 정리·계정 경계 구현. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [AuthDialogs.tsx](<../../FE/src/features/auth/AuthDialogs.tsx>), [createAuthStore.ts](<../../FE/src/features/auth/createAuthStore.ts>), [AuthBoundaryNavigation.test.tsx](<../../FE/src/app/navigation/AuthBoundaryNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f61-01"></a>`T-F61-01` | [S149](REQUIREMENTS_06.md#s149) · [PNG](<../../medium/flows/Profile/Settings/Logging out/screens/01_sc_c653047933aa40b2be7a8f281643d41d.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 로그아웃 확인 — 세션 종료 전 확인<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="t-f61-02"></a>`T-F61-02` | [S034](REQUIREMENTS_02.md#s034) · [PNG](<../../medium/flows/Profile/Settings/Logging out/screens/02_sc_2d1afd7a02a347868564f9757753d077.png>) | 설정 하단 → 로그아웃 확인. 현재 관찰값: 로그아웃 의사 확인. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 가입 공급자 선택 — 신규 가입과 기존 사용자 로그인을 구분하는 진입 화면이다.<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |
| <a id="t-f61-03"></a>`T-F61-03` | [S166](REQUIREMENTS_07.md#s166) · [PNG](<../../medium/flows/Profile/Settings/Logging out/screens/03_sc_d55739aa2ac1495da026006235e7c0a7.png>) | 로그아웃 확인 → 가입 공급자 선택. 현재 관찰값: 직접 입력 필드는 없다.. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V29](../FE_MEDIUM_PARITY_BACKLOG.md#v29) |

<a id="f62"></a>

## F62 — Profile/Settings/Switching to dark mode

[원본 분석](<../../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>)

**원본 흐름 목적:** 설정에서 Dark 선택 후 Home·Explore·Library·하이라이트·리스트·프로필까지 적용을 확인한다.

여러 화면의 테마는 확인했으나 OS 자동 전환·재실행 유지·동기화는 확인하지 않았다.

- **진입:** Settings의 System default에서 시작한다.

- **종료:** Dark 선택 뒤 Home·Explore·Library·Highlighted·리스트·Profile이 어두워진다.

- **미수록 분기:** Light 복귀·System 연동·재시작·다른 기기·OS 접근성·기사 설정과 동기화.

- **원본 해석:** 여러 화면의 테마는 확인했으나 OS 자동 전환·재실행 유지·동기화는 확인하지 않았다.

- **FE 검토:** 앱/기사 theme·System·Light/Dark 공유 상태 구현. 작성 글 설정 범위 A03. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [DisplaySettingsProvider.tsx](<../../FE/src/features/settings/DisplaySettingsProvider.tsx>), [ArticleDisplayPopover.tsx](<../../FE/src/features/settings/ArticleDisplayPopover.tsx>), [DisplayNavigation.test.tsx](<../../FE/src/app/navigation/DisplayNavigation.test.tsx>)

- **해석 주의:** 미수록 분기의 결과를 관찰 사실로 보완하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f62-01"></a>`T-F62-01` | [S173](REQUIREMENTS_07.md#s173) · [PNG](<../../medium/flows/Profile/Settings/Switching to dark mode/screens/01_sc_ddd51660cb8346a1b200ed970a2d5c45.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 앱 다크 테마 설정 — 앱 설정 다크 적용<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="t-f62-02"></a>`T-F62-02` | [S110](REQUIREMENTS_05.md#s110) · [PNG](<../../medium/flows/Profile/Settings/Switching to dark mode/screens/02_sc_9b1044709d764fe682a5e95603fd5c56.png>) | 설정 상단 → 앱 다크 테마 설정. 현재 관찰값: Appearance Dark 선택. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 다크 홈 피드 — 홈에도 테마 적용<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V33](../FE_MEDIUM_PARITY_BACKLOG.md#v33) |
| <a id="t-f62-03"></a>`T-F62-03` | [S086](REQUIREMENTS_04.md#s086) · [PNG](<../../medium/flows/Profile/Settings/Switching to dark mode/screens/03_sc_77bbb7d671f14c6db68071c5921f22fa.png>) | 앱 다크 테마 설정 → 다크 홈 피드. 현재 관찰값: For you 활성. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 다크 Explore — 탐색 화면 테마 적용<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V01](../FE_MEDIUM_PARITY_BACKLOG.md#v01) |
| <a id="t-f62-04"></a>`T-F62-04` | [S185](REQUIREMENTS_08.md#s185) · [PNG](<../../medium/flows/Profile/Settings/Switching to dark mode/screens/04_sc_eaaa223bd5c84facb010485d0f797e76.png>) | 다크 홈 피드 → 다크 Explore. 현재 관찰값: 검색 빈값. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 다크 Library — 라이브러리 테마 적용<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V02](../FE_MEDIUM_PARITY_BACKLOG.md#v02) |
| <a id="t-f62-05"></a>`T-F62-05` | [S058](REQUIREMENTS_03.md#s058) · [PNG](<../../medium/flows/Profile/Settings/Switching to dark mode/screens/05_sc_4a39ee1d768342a9823787c11c851479.png>) | 다크 Explore → 다크 Library. 현재 관찰값: Reading list4 stories·자물쇠. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 다크 하이라이트 목록 — 하이라이트 대비 변경<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="t-f62-06"></a>`T-F62-06` | [S108](REQUIREMENTS_05.md#s108) · [PNG](<../../medium/flows/Profile/Settings/Switching to dark mode/screens/06_sc_97fb65c906bf4e309ec595d2067e4bce.png>) | 다크 Library → 다크 하이라이트 목록. 현재 관찰값: Highlighted 활성. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 다크 읽기 목록 상세 — 읽은 기사 표시와 다크 테마<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V24](../FE_MEDIUM_PARITY_BACKLOG.md#v24) |
| <a id="t-f62-07"></a>`T-F62-07` | [S056](REQUIREMENTS_03.md#s056) · [PNG](<../../medium/flows/Profile/Settings/Switching to dark mode/screens/07_sc_45fd4ac6da2148968fab1446df649f7f.png>) | 다크 하이라이트 목록 → 다크 읽기 목록 상세. 현재 관찰값: 4 stories·자물쇠, 한 기사 Viewed 표시. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 다크 내 프로필 — 프로필 테마 적용<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V25](../FE_MEDIUM_PARITY_BACKLOG.md#v25) |
| <a id="t-f62-08"></a>`T-F62-08` | [S144](REQUIREMENTS_06.md#s144) · [PNG](<../../medium/flows/Profile/Settings/Switching to dark mode/screens/08_sc_c31a2100ddcd41cba45b5081c69b78b5.png>) | 다크 읽기 목록 상세 → 다크 내 프로필. 현재 관찰값: he/him·Public·기존 글. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다.  | [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |

이전 기능 점검 발견 연결: A03 — [재현 근거·현재 범위](../FE_MEDIUM_PARITY_AUDIT.md#evidence).

<a id="f63"></a>

## F63 — Profile/Story stats

[원본 분석](<../../medium/flows/Profile/Story stats/ANALYSIS.md>)

**원본 흐름 목적:** 프로필에서 월간 조회·읽음 그래프, 특정 날짜, 글별 Lifetime 통계를 확인한다.

월간 11/2와 글별 0/0이 동시에 보여 집계 차이가 있다. 현재 도움말의 갱신 주기와 과거 화면 문구도 다르다.

- **진입:** 프로필의 View stats에서 시작한다.

- **종료:** 월간 UTC 11/2, 날짜 선택, Lifetime 글별 0/0을 확인한다.

- **미수록 분기:** 다른 월·정렬 옵션·글 상세·0건·오류·새로고침, 집계 불일치 원인.

- **원본 해석:** 월간 11/2와 글별 0/0이 동시에 보여 집계 차이가 있다. 현재 도움말의 갱신 주기와 과거 화면 문구도 다르다.

- **FE 검토:** UTC 월/일·미집계·Lifetime/정렬·글 진입/재시도 구현. 실제 분석 제외, 원본 11/2 fixture와 정상 0 구분. 이전 동일 코드의 검토를 인용하며 이번 새 전수 UI 실행 결과는 아니다.

- **코드/기존 검사 조사 위치:** [StoryStatsScreen.tsx](<../../FE/src/features/story-stats/StoryStatsScreen.tsx>), [createMockStoryStatsSource.ts](<../../FE/src/features/story-stats/createMockStoryStatsSource.ts>), [StoryStatsNavigation.test.tsx](<../../FE/src/app/navigation/StoryStatsNavigation.test.tsx>)

- **해석 주의:** 월간11/2와 글별0/0은 서로 다른 관찰값이다. 현재 정책으로 과거 집계 모순을 설명하지 않는다.

| 단계 요구 | 원본 화면·PNG | 원본 단계 변화 / 수용 조건 | 작업 |
| --- | --- | --- | --- |
| <a id="t-f63-01"></a>`T-F63-01` | [S020](REQUIREMENTS_01.md#s020) · [PNG](<../../medium/flows/Profile/Story stats/screens/01_sc_1bd141b757934a88b4a003855e1794cc.png>) | 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.<br>원본 단계표의 다음 캡처 관계: 월간 글 통계 — 일별 통계 시각화<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 월간11/2와 글별0/0은 서로 다른 관찰값이다. 현재 정책으로 과거 집계 모순을 설명하지 않는다. | [V32](../FE_MEDIUM_PARITY_BACKLOG.md#v32) |
| <a id="t-f63-02"></a>`T-F63-02` | [S188](REQUIREMENTS_08.md#s188) · [PNG](<../../medium/flows/Profile/Story stats/screens/02_sc_eece99396c944a4fac5e50820715f00a.png>) | 내 프로필 빈 Stories → 월간 글 통계. 현재 관찰값: Jun 1–13 2025 UTC, Updated daily, Views11·Reads2. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 통계 그래프 날짜 선택 — 특정 날짜 선택<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 월간11/2와 글별0/0은 서로 다른 관찰값이다. 현재 정책으로 과거 집계 모순을 설명하지 않는다. | [V34](../FE_MEDIUM_PARITY_BACKLOG.md#v34) |
| <a id="t-f63-03"></a>`T-F63-03` | [S153](REQUIREMENTS_07.md#s153) · [PNG](<../../medium/flows/Profile/Story stats/screens/03_sc_c8fa56a2dd5b4e959c333ea3e6d334e2.png>) | 월간 글 통계 → 통계 그래프 날짜 선택. 현재 관찰값: Jun 12 2025, Views11·Reads2. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 글별 Lifetime 통계 — 글별 누적 통계 표시<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 월간11/2와 글별0/0은 서로 다른 관찰값이다. 현재 정책으로 과거 집계 모순을 설명하지 않는다. | [V34](../FE_MEDIUM_PARITY_BACKLOG.md#v34) |
| <a id="t-f63-04"></a>`T-F63-04` | [S150](REQUIREMENTS_06.md#s150) · [PNG](<../../medium/flows/Profile/Story stats/screens/04_sc_c6580d2d071a4f079981013ccc658af4.png>) | 통계 그래프 날짜 선택 → 글별 Lifetime 통계. 현재 관찰값: Latest, The Silence between Notes, Views0·Reads0. 캡처 사이의 정확한 조작·요청은 미기록이다.<br>원본 단계표의 다음 캡처 관계: 이 흐름의 기록 종료; 2절의 종료 범위 참조<br>해당 원본 단계의 진입·종료 화면과 선택/입력/스크롤 맥락을 재현한다. 별도 시점의 상태 모음은 한 번의 클릭 결과로 합치지 않는다. 월간11/2와 글별0/0은 서로 다른 관찰값이다. 현재 정책으로 과거 집계 모순을 설명하지 않는다. | [V34](../FE_MEDIUM_PARITY_BACKLOG.md#v34) |
