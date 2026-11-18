# Changing display 플로우 분석

검토 상태: **R2 누락·내용 재검토 완료(정적 캡처 범위)**. 실제 이미지 재확인 **9/9단계**. 계정 재현은 수행하지 않았다.

관찰은 Gummble 캡처에서 직접 본 내용, 문서 확인은 현재 공식 도움말, 설계 가정은 우리 구현 후보를 뜻한다. 버튼의 존재·성공 안내·실제 서버 결과를 구분한다.

## 1. 출처와 검토 상태

| 항목 | 기록 |
| --- | --- |
| 앱 | Medium iOS · `medium-ios` · `4674239e-d24a-4ef4-aed5-9682429edd48` |
| Flow ID | `c0b3cae9-906c-4288-b850-48d21e7586d7` |
| 원본 | [Gummble flow](https://gummble.com/apps/medium-ios?tab=flows&flow=c0b3cae9-906c-4288-b850-48d21e7586d7) |
| 카탈로그 버전 | MCP 조회 `Latest`, version ID `1419` |
| 제품 빌드 | 개별 화면의 제품 빌드 미확인. 카탈로그 버전을 제품 버전으로 사용하지 않음 |
| 조회일 / 이미지 검토일 | 2026-11-18 KST. 개별 분·초는 기록하지 않음 |
| 캡처일 | 미확인. 기사·알림·통계에 표시된 날짜는 캡처일이 아님 |
| 화면 수 / 이미지 확인 | 9단계 / 9단계. 공통 이미지는 다른 흐름과 동일 관찰 기록을 재사용 |
| 이미지 검토 방식 | R1: MCP 이미지 또는 로컬 원본. R2: 원본 PNG를 390×844로 축소한 번호 포함 비교 시트. 공통 이미지는 고유 이미지 기준 재검토 후 각 흐름에서 대조 |
| 크기·환경 | MCP 크기와 실제 PNG 픽셀 크기를 단계별 구분. 기기 모델·OS·DPR·배율·국가·계정 권한은 별도 확인 없으면 미확인 |
| 계정 재현 | 미수행. 로그인·발행·구매·신고·삭제·외부 공유를 실행하지 않음 |
| 공식 문서 | 2026-11-18 조회. 6절에 직접 대조 범위와 미확인 범위를 기록 |

## 2. 플로우 목적과 연결

글자 크기 100→120%, 시스템 테마→Dark, 타인 하이라이트 끄기와 본문 결과를 확인한다.

Font family 컨트롤은 보이나 선택 목록은 수록되지 않았다. 본인 하이라이트 삭제와 표시 숨김을 구분한다.

- 상위 흐름: [Story detail](<../ANALYSIS.md>)
- 하위 흐름: 없음.
- 폴더 위치: `medium/flows/Home/Story detail/Changing display`
- 부모·자식은 Gummble 탐색 분류다. 모든 자식 흐름이 반드시 실행되는 순차 단계나 런타임 화면 트리를 뜻하지 않는다.

### 진입 조건과 확인된 종료 범위

- 진입: 기사 더보기의 Display settings에서 시작한다.
- 종료: 100→120%, System→Dark, 타인 하이라이트 On→Off 뒤 본문을 확인한다.
- 관련 흐름: [Switching to dark mode](<../../../Profile/Settings/Switching to dark mode/ANALYSIS.md>) · [Highlighting a phrase](<../Highlighting a phrase/ANALYSIS.md>)
- 관련 흐름 링크는 기능의 연결점이다. 서로 다른 캡처를 같은 계정·같은 시각의 연속 실행으로 합치지 않는다.

## 3. 전체 단계표

MCP가 반환한 순서다. 스크롤·메뉴·입력·로딩도 각각 한 단계이며 캡처 사이의 클릭·저장·네트워크가 모두 기록되었다는 뜻은 아니다.

| 단계 | Screen ID와 원본 | 확인된 화면 | 다음 캡처와의 관계 |
| --- | --- | --- | --- |
| 01 | [`sc_332d5b0923e546fcbf6a8fc613cda6a4`](https://gummble.com/screens/sc_332d5b0923e546fcbf6a8fc613cda6a4?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [기사 상세 상단](<screens/01_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>) | 기사 더보기 메뉴 — 읽기·추천·작가·신고 행동 |
| 02 | [`sc_d62e32234117483b85b4c73ed63249cd`](https://gummble.com/screens/sc_d62e32234117483b85b4c73ed63249cd?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [기사 더보기 메뉴](<screens/02_sc_d62e32234117483b85b4c73ed63249cd.png>) | 읽기 표시 설정 기본 — 이 캡처의 현재 표시 설정: 100%, Default 글꼴, System default (Light), 타인 하이라이트 On. 제품 전체 초기 기본값 여부는 미확인. |
| 03 | [`sc_557c1fb7c6bf4dcc82ba1d6aba677f94`](https://gummble.com/screens/sc_557c1fb7c6bf4dcc82ba1d6aba677f94?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [읽기 표시 설정 기본](<screens/03_sc_557c1fb7c6bf4dcc82ba1d6aba677f94.png>) | 글자 크기 확대 — 크기 변경이 화면에 반영 |
| 04 | [`sc_ad140eae0b7e409aa2204c1f36bfa385`](https://gummble.com/screens/sc_ad140eae0b7e409aa2204c1f36bfa385?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [글자 크기 확대](<screens/04_sc_ad140eae0b7e409aa2204c1f36bfa385.png>) | 읽기 테마 선택 — 테마 선택 중 |
| 05 | [`sc_a5d80c9e0226452cbb67e018702c5f1b`](https://gummble.com/screens/sc_a5d80c9e0226452cbb67e018702c5f1b?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [읽기 테마 선택](<screens/05_sc_a5d80c9e0226452cbb67e018702c5f1b.png>) | 다크 테마 적용 — 다크 테마 반영 |
| 06 | [`sc_fd7de1ebfba14fbca6ddbe3ff642c42c`](https://gummble.com/screens/sc_fd7de1ebfba14fbca6ddbe3ff642c42c?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [다크 테마 적용](<screens/06_sc_fd7de1ebfba14fbca6ddbe3ff642c42c.png>) | 타인 하이라이트 숨김 — 타인 하이라이트 표시 설정 변경 |
| 07 | [`sc_00409287a68f4416941e39326f6df6b9`](https://gummble.com/screens/sc_00409287a68f4416941e39326f6df6b9?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [타인 하이라이트 숨김](<screens/07_sc_00409287a68f4416941e39326f6df6b9.png>) | 설정 닫힌 다크 기사 — 표시 설정 적용 결과 |
| 08 | [`sc_ee957cf03e9848948f9ec8189264d8d8`](https://gummble.com/screens/sc_ee957cf03e9848948f9ec8189264d8d8?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [설정 닫힌 다크 기사](<screens/08_sc_ee957cf03e9848948f9ec8189264d8d8.png>) | 다크 기사 본문 — 스크롤 중 읽기 UI |
| 09 | [`sc_d1d05d6500f349d89c5a3e5646ff238b`](https://gummble.com/screens/sc_d1d05d6500f349d89c5a3e5646ff238b?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [다크 기사 본문](<screens/09_sc_d1d05d6500f349d89c5a3e5646ff238b.png>) | 이 흐름의 기록 종료; 2절의 종료 범위 참조 |

## 4. 화면별 상세 분석

### 단계 01 — 기사 상세 상단

- Screen ID: `sc_332d5b0923e546fcbf6a8fc613cda6a4`
- 원본: [화면 페이지](https://gummble.com/screens/sc_332d5b0923e546fcbf6a8fc613cda6a4?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/13453844-2b66-4c67-bc3b-83e90116cd49.png)
- 로컬 이미지: [01_sc_332d5b0923e546fcbf6a8fc613cda6a4.png](<screens/01_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `플로우 시작` → 현재 → `sc_d62e32234117483b85b4c73ed63249cd`

#### 화면에서 직접 확인한 내용

- 레이아웃: Member-only 배지·제목·부제·읽기 시간·작가·커버, 고정 반응 바
- 입력 항목·기본값·표시 데이터: 5 min read, Apr 30 2025, Jordan Gibbs, 18K 박수·834 응답
- 버튼·메뉴·안내 문구: 듣기, 더보기, Follow, 박수, 응답, 저장, 공유
- 확인된 상태: 멤버 전용 기사 읽기 화면
- R2 보완 관찰·해석: 표지 아래 Generated by the author with AI. 출처성 설명이 보인다. 상단 Member-only story 표식과 본문 접근 상태를 구분하며, 비회원 차단 화면은 이 흐름에 없다.
- 단계 간 변화: 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 기사 메타데이터·본문·접근 권한·반응 분리. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 현재 계정 권한·본문 게이트·집계 정확값

#### 모델링 영향

- 후보와 근거: 기사 메타데이터·본문·접근 권한·반응 분리. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 현재 계정 권한·본문 게이트·집계 정확값. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 02 — 기사 더보기 메뉴

- Screen ID: `sc_d62e32234117483b85b4c73ed63249cd`
- 원본: [화면 페이지](https://gummble.com/screens/sc_d62e32234117483b85b4c73ed63249cd?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/0cf95a27-4543-4060-ae8f-bb20219babf4.png)
- 로컬 이미지: [02_sc_d62e32234117483b85b4c73ed63249cd.png](<screens/02_sc_d62e32234117483b85b4c73ed63249cd.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_332d5b0923e546fcbf6a8fc613cda6a4` → 현재 → `sc_557c1fb7c6bf4dcc82ba1d6aba677f94`

#### 화면에서 직접 확인한 내용

- 레이아웃: 상단 팝오버 5행
- 입력 항목·기본값·표시 데이터: 추가 입력 없음
- 버튼·메뉴·안내 문구: Show less like this, Display settings, Follow author, Mute author, Report story
- 확인된 상태: 읽기·추천·작가·신고 행동
- 단계 간 변화: 기사 상세 상단 → 기사 더보기 메뉴. 현재 관찰값: 추가 입력 없음. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 기사 관련 사용자 행동의 별도 상태. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 각 행동 결과·권한

#### 모델링 영향

- 후보와 근거: 기사 관련 사용자 행동의 별도 상태. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 각 행동 결과·권한. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 03 — 읽기 표시 설정 기본

- Screen ID: `sc_557c1fb7c6bf4dcc82ba1d6aba677f94`
- 원본: [화면 페이지](https://gummble.com/screens/sc_557c1fb7c6bf4dcc82ba1d6aba677f94?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/10bb04ed-0017-4c96-a36e-b226a77fcf23.png)
- 로컬 이미지: [03_sc_557c1fb7c6bf4dcc82ba1d6aba677f94.png](<screens/03_sc_557c1fb7c6bf4dcc82ba1d6aba677f94.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_d62e32234117483b85b4c73ed63249cd` → 현재 → `sc_ad140eae0b7e409aa2204c1f36bfa385`

#### 화면에서 직접 확인한 내용

- 레이아웃: 상단 크기 조절과 3개 설정 행
- 입력 항목·기본값·표시 데이터: 100%, Font Default, System default (Light), Highlights from others 켜짐
- 버튼·메뉴·안내 문구: 작은/큰 A, 글꼴, Appearance, 토글
- 확인된 상태: 이 캡처의 현재 표시 설정: 100%, Default 글꼴, System default (Light), 타인 하이라이트 On. 제품 전체 초기 기본값 여부는 미확인.
- R2 보완 관찰·해석: 글꼴 선택 컨트롤은 있으나 펼친 글꼴 목록은 수록되지 않았다. 별도 Save 버튼은 보이지 않으며 설정 변경 뒤 화면 반영만 관찰했다.
- 단계 간 변화: 기사 더보기 메뉴 → 읽기 표시 설정 기본. 현재 관찰값: 100%, Font Default, System default (Light), Highlights from others 켜짐. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 읽기 환경 설정과 본문 데이터 분리. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 기기·계정 동기화 범위

#### 모델링 영향

- 후보와 근거: 읽기 환경 설정과 본문 데이터 분리. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 기기·계정 동기화 범위. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 04 — 글자 크기 확대

- Screen ID: `sc_ad140eae0b7e409aa2204c1f36bfa385`
- 원본: [화면 페이지](https://gummble.com/screens/sc_ad140eae0b7e409aa2204c1f36bfa385?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/98cc687f-1583-47e7-b750-0597eb3295b3.png)
- 로컬 이미지: [04_sc_ad140eae0b7e409aa2204c1f36bfa385.png](<screens/04_sc_ad140eae0b7e409aa2204c1f36bfa385.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_557c1fb7c6bf4dcc82ba1d6aba677f94` → 현재 → `sc_a5d80c9e0226452cbb67e018702c5f1b`

#### 화면에서 직접 확인한 내용

- 레이아웃: 설정 유지·배경 제목 줄바꿈 증가
- 입력 항목·기본값·표시 데이터: 120%
- 버튼·메뉴·안내 문구: 작은/큰 A
- 확인된 상태: 크기 변경이 화면에 반영
- 단계 간 변화: 읽기 표시 설정 기본 → 글자 크기 확대. 현재 관찰값: 120%. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 배율 값과 읽기 위치 보존. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 최대·최소·접근성 OS 글자 크기와 관계

#### 모델링 영향

- 후보와 근거: 배율 값과 읽기 위치 보존. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 최대·최소·접근성 OS 글자 크기와 관계. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 05 — 읽기 테마 선택

- Screen ID: `sc_a5d80c9e0226452cbb67e018702c5f1b`
- 원본: [화면 페이지](https://gummble.com/screens/sc_a5d80c9e0226452cbb67e018702c5f1b?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/89081735-1708-4dbe-a7b5-a97954777612.png)
- 로컬 이미지: [05_sc_a5d80c9e0226452cbb67e018702c5f1b.png](<screens/05_sc_a5d80c9e0226452cbb67e018702c5f1b.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_ad140eae0b7e409aa2204c1f36bfa385` → 현재 → `sc_fd7de1ebfba14fbca6ddbe3ff642c42c`

#### 화면에서 직접 확인한 내용

- 레이아웃: Appearance 아래 팝오버
- 입력 항목·기본값·표시 데이터: System default 체크
- 버튼·메뉴·안내 문구: System default, Light, Dark
- 확인된 상태: 테마 선택 중
- 단계 간 변화: 글자 크기 확대 → 읽기 테마 선택. 현재 관찰값: System default 체크. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 테마 선호값과 실제 적용 테마. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 시스템 테마 변경 즉시 반영

#### 모델링 영향

- 후보와 근거: 테마 선호값과 실제 적용 테마. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 시스템 테마 변경 즉시 반영. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 06 — 다크 테마 적용

- Screen ID: `sc_fd7de1ebfba14fbca6ddbe3ff642c42c`
- 원본: [화면 페이지](https://gummble.com/screens/sc_fd7de1ebfba14fbca6ddbe3ff642c42c?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/f9e8593d-aa02-4253-b3f5-2110c4248fe6.png)
- 로컬 이미지: [06_sc_fd7de1ebfba14fbca6ddbe3ff642c42c.png](<screens/06_sc_fd7de1ebfba14fbca6ddbe3ff642c42c.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_a5d80c9e0226452cbb67e018702c5f1b` → 현재 → `sc_00409287a68f4416941e39326f6df6b9`

#### 화면에서 직접 확인한 내용

- 레이아웃: 배경·설정 팝오버 검정 계열
- 입력 항목·기본값·표시 데이터: Dark, 120%, 타인 하이라이트 켜짐
- 버튼·메뉴·안내 문구: 표시 설정 조절
- 확인된 상태: 다크 테마 반영
- 단계 간 변화: 읽기 테마 선택 → 다크 테마 적용. 현재 관찰값: Dark, 120%, 타인 하이라이트 켜짐. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 테마 토큰과 읽기 설정. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 앱 전체·기사별 적용 범위

#### 모델링 영향

- 후보와 근거: 테마 토큰과 읽기 설정. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 앱 전체·기사별 적용 범위. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 07 — 타인 하이라이트 숨김

- Screen ID: `sc_00409287a68f4416941e39326f6df6b9`
- 원본: [화면 페이지](https://gummble.com/screens/sc_00409287a68f4416941e39326f6df6b9?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/4bb34f44-a021-4393-9b6c-fe0b9df24a39.png)
- 로컬 이미지: [07_sc_00409287a68f4416941e39326f6df6b9.png](<screens/07_sc_00409287a68f4416941e39326f6df6b9.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_fd7de1ebfba14fbca6ddbe3ff642c42c` → 현재 → `sc_ee957cf03e9848948f9ec8189264d8d8`

#### 화면에서 직접 확인한 내용

- 레이아웃: 다크 설정 팝오버 토글 회색
- 입력 항목·기본값·표시 데이터: Highlights from others 꺼짐
- 버튼·메뉴·안내 문구: 토글
- 확인된 상태: 타인 하이라이트 표시 설정 변경
- R2 보완 관찰·해석: 타인 하이라이트 표시를 끄는 설정이다. 기존 개인 하이라이트 데이터 삭제로 모델링하지 않는다. 현재 문서의 하이라이트 노출 규칙은 6절에서 따로 대조한다.
- 단계 간 변화: 다크 테마 적용 → 타인 하이라이트 숨김. 현재 관찰값: Highlights from others 꺼짐. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 타인 강조 가시성과 원본 강조 데이터 분리. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 본인 하이라이트 영향·영속성

#### 모델링 영향

- 후보와 근거: 타인 강조 가시성과 원본 강조 데이터 분리. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 본인 하이라이트 영향·영속성. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 08 — 설정 닫힌 다크 기사

- Screen ID: `sc_ee957cf03e9848948f9ec8189264d8d8`
- 원본: [화면 페이지](https://gummble.com/screens/sc_ee957cf03e9848948f9ec8189264d8d8?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/e03ada72-0359-44cc-bb84-9112a37fdb6c.png)
- 로컬 이미지: [08_sc_ee957cf03e9848948f9ec8189264d8d8.png](<screens/08_sc_ee957cf03e9848948f9ec8189264d8d8.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_00409287a68f4416941e39326f6df6b9` → 현재 → `sc_d1d05d6500f349d89c5a3e5646ff238b`

#### 화면에서 직접 확인한 내용

- 레이아웃: 확대 글자·검정 배경·기사 상단
- 입력 항목·기본값·표시 데이터: 120% 설정 후 제목 3줄
- 버튼·메뉴·안내 문구: 듣기·더보기·반응 바
- 확인된 상태: 표시 설정 적용 결과
- 단계 간 변화: 타인 하이라이트 숨김 → 설정 닫힌 다크 기사. 현재 관찰값: 120% 설정 후 제목 3줄. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 읽기 환경 변경 후 레이아웃 재배치. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 글꼴 선택 옵션은 미수록

#### 모델링 영향

- 후보와 근거: 읽기 환경 변경 후 레이아웃 재배치. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 글꼴 선택 옵션은 미수록. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 09 — 다크 기사 본문

- Screen ID: `sc_d1d05d6500f349d89c5a3e5646ff238b`
- 원본: [화면 페이지](https://gummble.com/screens/sc_d1d05d6500f349d89c5a3e5646ff238b?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/dccde2f9-b223-48ad-a725-fc3768e6f1c1.png)
- 로컬 이미지: [09_sc_d1d05d6500f349d89c5a3e5646ff238b.png](<screens/09_sc_d1d05d6500f349d89c5a3e5646ff238b.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_ee957cf03e9848948f9ec8189264d8d8` → 현재 → `플로우 기록 종료`

#### 화면에서 직접 확인한 내용

- 레이아웃: 검정 배경 세리프 본문·링크·삽입 이미지
- 입력 항목·기본값·표시 데이터: 본문 이미지의 밝은 배경 유지
- 버튼·메뉴·안내 문구: 본문 링크
- 확인된 상태: 스크롤 중 읽기 UI
- 단계 간 변화: 설정 닫힌 다크 기사 → 다크 기사 본문. 현재 관찰값: 본문 이미지의 밝은 배경 유지. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 본문 미디어와 테마 표현 분리. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 이미지 색상 반전·스크롤 위치 복원

#### 모델링 영향

- 후보와 근거: 본문 미디어와 테마 표현 분리. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 이미지 색상 반전·스크롤 위치 복원. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

## 5. 업무 규칙과 데이터 변화

Font family 컨트롤은 보이나 선택 목록은 수록되지 않았다. 본인 하이라이트 삭제와 표시 숨김을 구분한다.

| 단계 | 관찰된 상태·값 | 근거의 한계 |
| --- | --- | --- |
| 01 | 멤버 전용 기사 읽기 화면 — 5 min read, Apr 30 2025, Jordan Gibbs, 18K 박수·834 응답 | 현재 계정 권한·본문 게이트·집계 정확값 |
| 02 | 읽기·추천·작가·신고 행동 — 추가 입력 없음 | 각 행동 결과·권한 |
| 03 | 이 캡처의 현재 표시 설정: 100%, Default 글꼴, System default (Light), 타인 하이라이트 On. 제품 전체 초기 기본값 여부는 미확인. — 100%, Font Default, System default (Light), Highlights from others 켜짐 | 기기·계정 동기화 범위 |
| 04 | 크기 변경이 화면에 반영 — 120% | 최대·최소·접근성 OS 글자 크기와 관계 |
| 05 | 테마 선택 중 — System default 체크 | 시스템 테마 변경 즉시 반영 |
| 06 | 다크 테마 반영 — Dark, 120%, 타인 하이라이트 켜짐 | 앱 전체·기사별 적용 범위 |
| 07 | 타인 하이라이트 표시 설정 변경 — Highlights from others 꺼짐 | 본인 하이라이트 영향·영속성 |
| 08 | 표시 설정 적용 결과 — 120% 설정 후 제목 3줄 | 글꼴 선택 옵션은 미수록 |
| 09 | 스크롤 중 읽기 UI — 본문 이미지의 밝은 배경 유지 | 이미지 색상 반전·스크롤 위치 복원 |

위 표는 보이는 상태 변화다. 성공 토스트가 있어도 외부 계정의 가시성·영수증·서버 저장을 독립 검증한 것은 아니다.

## 6. 공식 도움말과 API 대조

공식 자료는 현재 문서이며 과거 캡처와 시점이 다를 수 있다. 아래 기능 설명의 범위만 대조했으며 내부 API나 제품 전체 규칙을 확인한 것은 아니다.

- [About highlights](https://help.medium.com/hc/en-us/articles/214406358-About-highlights): 강조 구절은 작성자·팔로워에게 보일 수 있다. 구절 인용 응답과 타인 하이라이트 숨김을 설명한다. [공통 문서 대조](<../../../../SOURCES.md#highlights>).

공식 하이라이트 문서는 표시 숨김을 직접 설명한다. 글자 배율·글꼴·테마의 전체 옵션과 동기화 계약은 이번 공식 문서 대조에서 확정하지 못했다.

- [API 검토](<../../../../SOURCES.md#api>). 이 흐름의 내부 endpoint·요청·응답·DB 스키마는 확인하지 않았다.

## 7. 데이터 모델링 시사점

다음은 관찰에 기반한 구현 후보다. Kostolany의 기능 채택·스키마·업무 정책으로 확정하지 않는다.

- 단계 01: 기사 메타데이터·본문·접근 권한·반응 분리
- 단계 02: 기사 관련 사용자 행동의 별도 상태
- 단계 03: 읽기 환경 설정과 본문 데이터 분리
- 단계 04: 배율 값과 읽기 위치 보존
- 단계 05: 테마 선호값과 실제 적용 테마
- 단계 06: 테마 토큰과 읽기 설정
- 단계 07: 타인 강조 가시성과 원본 강조 데이터 분리
- 단계 08: 읽기 환경 변경 후 레이아웃 재배치
- 단계 09: 본문 미디어와 테마 표현 분리

## 8. 미확인 사항과 검토 질문

**원본에 없는 분기·남은 범위:** 글꼴 옵션·크기 경계·OS 글자 크기·System 테마 연동·재진입·설정 동기화.

- 단계 01: 현재 계정 권한·본문 게이트·집계 정확값
- 단계 02: 각 행동 결과·권한
- 단계 03: 기기·계정 동기화 범위
- 단계 04: 최대·최소·접근성 OS 글자 크기와 관계
- 단계 05: 시스템 테마 변경 즉시 반영
- 단계 06: 앱 전체·기사별 적용 범위
- 단계 07: 본인 하이라이트 영향·영속성
- 단계 08: 글꼴 선택 옵션은 미수록
- 단계 09: 이미지 색상 반전·스크롤 위치 복원
- 같은 계정·같은 빌드에서 시작 상태를 맞춘 뒤 정상·취소·실패·재진입 결과를 검증해야 한다.

## 9. 검토 이력

| 차수 | 날짜 | 확인·작성 내용 | 남은 범위 |
| --- | --- | --- | --- |
| R1 | 2026-11-18 KST | MCP 9단계와 실제 이미지 9단계 대조. 원본·로컬 파일 연결, 관찰·문서·가정 분리 | 실제 계정 재현·미수록 상태·8절 항목 |
| R2 | 2026-11-18 KST | MCP 9단계 순서 재조회 및 이미지 재검토. 3개 단계의 관찰·표현 보완. 진입·종료·미수록 분기·관련 흐름 및 공식 규칙 대조 추가 | 원본에 없는 8절 분기·실제 계정 동작 |
| 문서 점검 | 2026-11-18 KST | 전체 63개 문서의 단계 순서·이미지 ID·로컬 링크·필수 절 구조를 검증 스크립트로 점검 | 이미지 2차 검토로 계산하지 않음 |
| 이미지 배치 | 2026-11-18 KST | MCP 단계 목록 재조회 후 이 흐름의 원본 9개를 screens/에 단계 순서대로 복사. 문서 링크·화면 ID·순서·크기·SHA-256 대조 | 파일 배치·무결성 점검이며 추가 시각 검토나 계정 재현은 아님 |
