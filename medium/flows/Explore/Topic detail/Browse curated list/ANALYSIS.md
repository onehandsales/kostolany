# Browse curated list 플로우 분석

검토 상태: **R2 누락·내용 재검토 완료(정적 캡처 범위)**. 실제 이미지 재확인 **5/5단계**. 계정 재현은 수행하지 않았다.

관찰은 Gummble 캡처에서 직접 본 내용, 문서 확인은 현재 공식 도움말, 설계 가정은 우리 구현 후보를 뜻한다. 버튼의 존재·성공 안내·실제 서버 결과를 구분한다.

## 1. 출처와 검토 상태

| 항목 | 기록 |
| --- | --- |
| 앱 | Medium iOS · `medium-ios` · `4674239e-d24a-4ef4-aed5-9682429edd48` |
| Flow ID | `3c171ab5-60d4-4273-a996-9af9c170ba73` |
| 원본 | [Gummble flow](https://gummble.com/apps/medium-ios?tab=flows&flow=3c171ab5-60d4-4273-a996-9af9c170ba73) |
| 카탈로그 버전 | MCP 조회 `Latest`, version ID `1419` |
| 제품 빌드 | 개별 화면의 제품 빌드 미확인. 카탈로그 버전을 제품 버전으로 사용하지 않음 |
| 조회일 / 이미지 검토일 | 2026-11-18 KST. 개별 분·초는 기록하지 않음 |
| 캡처일 | 미확인. 기사·알림·통계에 표시된 날짜는 캡처일이 아님 |
| 화면 수 / 이미지 확인 | 5단계 / 5단계. 공통 이미지는 다른 흐름과 동일 관찰 기록을 재사용 |
| 이미지 검토 방식 | R1: MCP 이미지 또는 로컬 원본. R2: 원본 PNG를 390×844로 축소한 번호 포함 비교 시트. 공통 이미지는 고유 이미지 기준 재검토 후 각 흐름에서 대조 |
| 크기·환경 | MCP 크기와 실제 PNG 픽셀 크기를 단계별 구분. 기기 모델·OS·DPR·배율·국가·계정 권한은 별도 확인 없으면 미확인 |
| 계정 재현 | 미수행. 로그인·발행·구매·신고·삭제·외부 공유를 실행하지 않음 |
| 공식 문서 | 2026-11-18 조회. 6절에 직접 대조 범위와 미확인 범위를 기록 |

## 2. 플로우 목적과 연결

토픽 변경 후 Medium Staff의 큐레이션을 전체 리스트로 열고 끝까지 탐색한다.

토픽 추천 카드의 첫 글과 전체 리스트 첫 글이 다르다. 미리보기 순서를 전체 리스트 정렬 규칙으로 사용하지 않는다.

- 상위 흐름: [Topic detail](<../ANALYSIS.md>)
- 하위 흐름: 없음.
- 폴더 위치: `medium/flows/Explore/Topic detail/Browse curated list`
- 부모·자식은 Gummble 탐색 분류다. 모든 자식 흐름이 반드시 실행되는 순차 단계나 런타임 화면 트리를 뜻하지 않는다.

### 진입 조건과 확인된 종료 범위

- 진입: Life 뒤 Self Improvement 토픽과 편집 리스트 미리보기가 수록된다.
- 종료: See the full list 뒤 Medium Staff의 8개 글 리스트와 말미를 확인한다.
- 관련 흐름: [Saving a story](<../../../Home/Story detail/Saving a story/ANALYSIS.md>) · [Library](<../../../Library/ANALYSIS.md>)
- 관련 흐름 링크는 기능의 연결점이다. 서로 다른 캡처를 같은 계정·같은 시각의 연속 실행으로 합치지 않는다.

## 3. 전체 단계표

MCP가 반환한 순서다. 스크롤·메뉴·입력·로딩도 각각 한 단계이며 캡처 사이의 클릭·저장·네트워크가 모두 기록되었다는 뜻은 아니다.

| 단계 | Screen ID와 원본 | 확인된 화면 | 다음 캡처와의 관계 |
| --- | --- | --- | --- |
| 01 | [`sc_4602e853aca341a697239bc9f55b6da3`](https://gummble.com/screens/sc_4602e853aca341a697239bc9f55b6da3?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | Life 토픽 상세 | Self Improvement 토픽 — 팔로우 중인 다른 토픽 |
| 02 | [`sc_7de88da749774d0483716f2e861fb080`](https://gummble.com/screens/sc_7de88da749774d0483716f2e861fb080?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | Self Improvement 토픽 | 토픽 내 큐레이션 — 편집 리스트 미리보기 |
| 03 | [`sc_974be74d8855401e84cbad9f01dc8e93`](https://gummble.com/screens/sc_974be74d8855401e84cbad9f01dc8e93?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 토픽 내 큐레이션 | 큐레이션 리스트 상세 — 공개 리스트 읽기 |
| 04 | [`sc_15a122b14ac84b3d80c37fb84dfae4c7`](https://gummble.com/screens/sc_15a122b14ac84b3d80c37fb84dfae4c7?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 큐레이션 리스트 상세 | 큐레이션 리스트 하단 — 목록 말미 |
| 05 | [`sc_bd0cb76562a74fb69a3569e15daf02ee`](https://gummble.com/screens/sc_bd0cb76562a74fb69a3569e15daf02ee?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 큐레이션 리스트 하단 | 이 흐름의 기록 종료; 2절의 종료 범위 참조 |

## 4. 화면별 상세 분석

### 단계 01 — Life 토픽 상세

- Screen ID: `sc_4602e853aca341a697239bc9f55b6da3`
- 원본: [화면 페이지](https://gummble.com/screens/sc_4602e853aca341a697239bc9f55b6da3?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/b129edc7-3aaa-4e8e-bd7e-299a6697b1a2.png)
- 로컬 이미지: [sc_4602e853aca341a697239bc9f55b6da3.png](<../../../../screens/sc_4602e853aca341a697239bc9f55b6da3.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `플로우 시작` → 현재 → `sc_7de88da749774d0483716f2e861fb080`

#### 화면에서 직접 확인한 내용

- 레이아웃: 가로 관련 토픽·중앙 이름·집계·추천 기사
- 입력 항목·기본값·표시 데이터: 7.1M followers, 1.3M Stories
- 버튼·메뉴·안내 문구: Follow, 공유, 관련 토픽
- 확인된 상태: Life 미팔로우 상태
- 단계 간 변화: 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 토픽 관계와 사용자 팔로우. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 토픽 간 계층인지 관련성인지

#### 모델링 영향

- 후보와 근거: 토픽 관계와 사용자 팔로우. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 토픽 간 계층인지 관련성인지. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 02 — Self Improvement 토픽

- Screen ID: `sc_7de88da749774d0483716f2e861fb080`
- 원본: [화면 페이지](https://gummble.com/screens/sc_7de88da749774d0483716f2e861fb080?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/316fa291-4a3e-41c4-827b-d67a806cb408.png)
- 로컬 이미지: [sc_7de88da749774d0483716f2e861fb080.png](<../../../../screens/sc_7de88da749774d0483716f2e861fb080.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_4602e853aca341a697239bc9f55b6da3` → 현재 → `sc_974be74d8855401e84cbad9f01dc8e93`

#### 화면에서 직접 확인한 내용

- 레이아웃: 선택 칩 변경·추천 기사 교체
- 입력 항목·기본값·표시 데이터: 10.6M followers, 1M Stories, Following
- 버튼·메뉴·안내 문구: Following, 공유
- 확인된 상태: 팔로우 중인 다른 토픽
- R2 보완 관찰·해석: Life의 Follow에서 Self Improvement의 Following으로 바뀌었지만 서로 다른 토픽이다. 동일 토픽에 대한 팔로우 성공 전후로 해석하지 않는다.
- 단계 간 변화: Life 토픽 상세 → Self Improvement 토픽. 현재 관찰값: 10.6M followers, 1M Stories, Following. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 토픽 선택과 목록 조회. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 이전 Life에서의 선택 과정

#### 모델링 영향

- 후보와 근거: 토픽 선택과 목록 조회. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 이전 Life에서의 선택 과정. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 03 — 토픽 내 큐레이션

- Screen ID: `sc_974be74d8855401e84cbad9f01dc8e93`
- 원본: [화면 페이지](https://gummble.com/screens/sc_974be74d8855401e84cbad9f01dc8e93?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/84846b01-6aa0-4c5f-95d4-a56ddfaf8573.png)
- 로컬 이미지: [sc_974be74d8855401e84cbad9f01dc8e93.png](<../../../../screens/sc_974be74d8855401e84cbad9f01dc8e93.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_7de88da749774d0483716f2e861fb080` → 현재 → `sc_15a122b14ac84b3d80c37fb84dfae4c7`

#### 화면에서 직접 확인한 내용

- 레이아웃: The power of a morning routine 가로 기사 묶음
- 입력 항목·기본값·표시 데이터: List curated by Medium Staff
- 버튼·메뉴·안내 문구: See the full list, 기사 더보기
- 확인된 상태: 편집 리스트 미리보기
- 단계 간 변화: Self Improvement 토픽 → 토픽 내 큐레이션. 현재 관찰값: List curated by Medium Staff. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 토픽-큐레이션 리스트 연결. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 리스트 기사 순서·추천 갱신

#### 모델링 영향

- 후보와 근거: 토픽-큐레이션 리스트 연결. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 리스트 기사 순서·추천 갱신. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 04 — 큐레이션 리스트 상세

- Screen ID: `sc_15a122b14ac84b3d80c37fb84dfae4c7`
- 원본: [화면 페이지](https://gummble.com/screens/sc_15a122b14ac84b3d80c37fb84dfae4c7?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/81f7dad3-0afe-448a-a891-b15c69a637c5.png)
- 로컬 이미지: [sc_15a122b14ac84b3d80c37fb84dfae4c7.png](<../../../../screens/sc_15a122b14ac84b3d80c37fb84dfae4c7.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_974be74d8855401e84cbad9f01dc8e93` → 현재 → `sc_bd0cb76562a74fb69a3569e15daf02ee`

#### 화면에서 직접 확인한 내용

- 레이아웃: 소유자·날짜·제목·설명·기사 목록·부유 반응 바
- 입력 항목·기본값·표시 데이터: 8 stories, 108 saves, Medium Staff
- 버튼·메뉴·안내 문구: 리스트 저장·더보기·개별 저장·박수·응답·공유
- 확인된 상태: 공개 리스트 읽기
- R2 보완 관찰·해석: 상단 108 saves는 리스트 저장 수, 하단 고정 98 박수·1 응답은 리스트 반응 영역이다. 개별 기사 행의 저장 버튼과 별도로 제공된다.
- 단계 간 변화: 토픽 내 큐레이션 → 큐레이션 리스트 상세. 현재 관찰값: 8 stories, 108 saves, Medium Staff. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 리스트 독립 엔터티와 기사 구성. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 리스트 반응·글 반응의 저장 계약과 중복 집계 규칙은 미확인.

#### 모델링 영향

- 후보와 근거: 리스트 독립 엔터티와 기사 구성. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 리스트 반응·글 반응의 저장 계약과 중복 집계 규칙은 미확인. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 05 — 큐레이션 리스트 하단

- Screen ID: `sc_bd0cb76562a74fb69a3569e15daf02ee`
- 원본: [화면 페이지](https://gummble.com/screens/sc_bd0cb76562a74fb69a3569e15daf02ee?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/5c092ced-7d0a-4ba8-bb35-c6694902cc59.png)
- 로컬 이미지: [sc_bd0cb76562a74fb69a3569e15daf02ee.png](<../../../../screens/sc_bd0cb76562a74fb69a3569e15daf02ee.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_15a122b14ac84b3d80c37fb84dfae4c7` → 현재 → `플로우 기록 종료`

#### 화면에서 직접 확인한 내용

- 레이아웃: 후반 기사와 More from Medium Staff
- 입력 항목·기본값·표시 데이터: 리스트 제목 상단 고정
- 버튼·메뉴·안내 문구: Follow, 저장, 박수·응답·공유
- 확인된 상태: 목록 말미
- 단계 간 변화: 큐레이션 리스트 상세 → 큐레이션 리스트 하단. 현재 관찰값: 리스트 제목 상단 고정. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 리스트 저장과 소유자 팔로우 분리. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 저장 시 업데이트 알림·소유자 팔로우 관계

#### 모델링 영향

- 후보와 근거: 리스트 저장과 소유자 팔로우 분리. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 저장 시 업데이트 알림·소유자 팔로우 관계. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

## 5. 업무 규칙과 데이터 변화

토픽 추천 카드의 첫 글과 전체 리스트 첫 글이 다르다. 미리보기 순서를 전체 리스트 정렬 규칙으로 사용하지 않는다.

| 단계 | 관찰된 상태·값 | 근거의 한계 |
| --- | --- | --- |
| 01 | Life 미팔로우 상태 — 7.1M followers, 1.3M Stories | 토픽 간 계층인지 관련성인지 |
| 02 | 팔로우 중인 다른 토픽 — 10.6M followers, 1M Stories, Following | 이전 Life에서의 선택 과정 |
| 03 | 편집 리스트 미리보기 — List curated by Medium Staff | 리스트 기사 순서·추천 갱신 |
| 04 | 공개 리스트 읽기 — 8 stories, 108 saves, Medium Staff | 리스트 반응·글 반응의 저장 계약과 중복 집계 규칙은 미확인. |
| 05 | 목록 말미 — 리스트 제목 상단 고정 | 저장 시 업데이트 알림·소유자 팔로우 관계 |

위 표는 보이는 상태 변화다. 성공 토스트가 있어도 외부 계정의 가시성·영수증·서버 저장을 독립 검증한 것은 아니다.

## 6. 공식 도움말과 API 대조

공식 자료는 현재 문서이며 과거 캡처와 시점이 다를 수 있다. 아래 기능 설명의 범위만 대조했으며 내부 API나 제품 전체 규칙을 확인한 것은 아니다.

- [Create and manage lists](https://help.medium.com/hc/en-us/articles/214993247-Create-and-manage-lists): 글을 여러 리스트에 선택해 저장할 수 있고 공개 리스트 자체는 Saved lists에 저장한다. 리스트 설명은 선택 입력이다. 비공개 리스트는 본인만 접근하며 기본 Reading list는 삭제할 수 없다. 리스트별 글 메모·재정렬·제거와 다운로드 버튼 재탭을 통한 오프라인 사본 제거를 설명한다. 캡처에 없는 실행 결과는 검증 완료로 기록하지 않는다. [공통 문서 대조](<../../../../SOURCES.md#lists>).
- [Your homepage](https://help.medium.com/hc/en-us/articles/115012586467-Your-homepage): For you는 개인 추천, Featured는 팔로우한 발행물의 추천 글이다. 앱 검색 진입도 설명한다. [공통 문서 대조](<../../../../SOURCES.md#home>).

화면에서 관찰한 값·메뉴와 문서에 없는 세부 상태는 구분한다. 미수록 오류·권한·실패 분기는 아래 질문으로 남긴다.

- [API 검토](<../../../../SOURCES.md#api>). 이 흐름의 내부 endpoint·요청·응답·DB 스키마는 확인하지 않았다.

## 7. 데이터 모델링 시사점

다음은 관찰에 기반한 구현 후보다. Kostolany의 기능 채택·스키마·업무 정책으로 확정하지 않는다.

- 단계 01: 토픽 관계와 사용자 팔로우
- 단계 02: 토픽 선택과 목록 조회
- 단계 03: 토픽-큐레이션 리스트 연결
- 단계 04: 리스트 독립 엔터티와 기사 구성
- 단계 05: 리스트 저장과 소유자 팔로우 분리

## 8. 미확인 사항과 검토 질문

**원본에 없는 분기·남은 범위:** 리스트 저장·응답·박수·공유 실행, 모든 8개 글의 중간 화면·순서, 토픽 전환 과정.

- 단계 01: 토픽 간 계층인지 관련성인지
- 단계 02: 이전 Life에서의 선택 과정
- 단계 03: 리스트 기사 순서·추천 갱신
- 단계 04: 리스트 반응·글 반응의 저장 계약과 중복 집계 규칙은 미확인.
- 단계 05: 저장 시 업데이트 알림·소유자 팔로우 관계
- 같은 계정·같은 빌드에서 시작 상태를 맞춘 뒤 정상·취소·실패·재진입 결과를 검증해야 한다.

## 9. 검토 이력

| 차수 | 날짜 | 확인·작성 내용 | 남은 범위 |
| --- | --- | --- | --- |
| R1 | 2026-11-18 KST | MCP 5단계와 실제 이미지 5단계 대조. 원본·로컬 파일 연결, 관찰·문서·가정 분리 | 실제 계정 재현·미수록 상태·8절 항목 |
| R2 | 2026-11-18 KST | MCP 5단계 순서 재조회 및 이미지 재검토. 2개 단계의 관찰·표현 보완. 진입·종료·미수록 분기·관련 흐름 및 공식 규칙 대조 추가 | 원본에 없는 8절 분기·실제 계정 동작 |
| 문서 점검 | 2026-11-18 KST | 전체 63개 문서의 단계 순서·이미지 ID·로컬 링크·필수 절 구조를 검증 스크립트로 점검 | 이미지 2차 검토로 계산하지 않음 |
