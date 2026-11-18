# Library 플로우 분석

검토 상태: **R2 누락·내용 재검토 완료(정적 캡처 범위)**. 실제 이미지 재확인 **5/5단계**. 계정 재현은 수행하지 않았다.

관찰은 Gummble 캡처에서 직접 본 내용, 문서 확인은 현재 공식 도움말, 설계 가정은 우리 구현 후보를 뜻한다. 버튼의 존재·성공 안내·실제 서버 결과를 구분한다.

## 1. 출처와 검토 상태

| 항목 | 기록 |
| --- | --- |
| 앱 | Medium iOS · `medium-ios` · `4674239e-d24a-4ef4-aed5-9682429edd48` |
| Flow ID | `0884e152-cbbf-474c-b439-32544ad035b2` |
| 원본 | [Gummble flow](https://gummble.com/apps/medium-ios?tab=flows&flow=0884e152-cbbf-474c-b439-32544ad035b2) |
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

내 리스트의 빈/채워진 상태와 Digest·Highlighted 탭을 비교한다.

Saved lists·Reading history 탭이 보여도 이 부모 흐름에 그 내용은 수록되지 않았다.

- 상위 흐름: 없음. Gummble의 최상위 흐름이다.
- 하위 흐름: [Creating a list](<Creating a list/ANALYSIS.md>) · [List detail](<List detail/ANALYSIS.md>) · [Filtering digest](<Filtering digest/ANALYSIS.md>)
- 폴더 위치: `medium/flows/Library`
- 부모·자식은 Gummble 탐색 분류다. 모든 자식 흐름이 반드시 실행되는 순차 단계나 런타임 화면 트리를 뜻하지 않는다.

### 진입 조건과 확인된 종료 범위

- 진입: Home 뒤 Your library에서 시작한다.
- 종료: Your lists 빈/채워진 상태, Digest, Highlighted를 확인한다.
- 관련 흐름: [Saving a story](<../Home/Story detail/Saving a story/ANALYSIS.md>) · [Reading history](<../Home/Refine recommendations/Reading history/ANALYSIS.md>)
- 관련 흐름 링크는 기능의 연결점이다. 서로 다른 캡처를 같은 계정·같은 시각의 연속 실행으로 합치지 않는다.

## 3. 전체 단계표

MCP가 반환한 순서다. 스크롤·메뉴·입력·로딩도 각각 한 단계이며 캡처 사이의 클릭·저장·네트워크가 모두 기록되었다는 뜻은 아니다.

| 단계 | Screen ID와 원본 | 확인된 화면 | 다음 캡처와의 관계 |
| --- | --- | --- | --- |
| 01 | [`sc_5e0ba0e498ff49579bf838096aec4b5e`](https://gummble.com/screens/sc_5e0ba0e498ff49579bf838096aec4b5e?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [For you 홈 피드](<screens/01_sc_5e0ba0e498ff49579bf838096aec4b5e.png>) | Library 초기 목록 — 기본 읽기 목록이 비어 있음 |
| 02 | [`sc_84e0421de98041bbb014822fc05dd3fb`](https://gummble.com/screens/sc_84e0421de98041bbb014822fc05dd3fb?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [Library 초기 목록](<screens/02_sc_84e0421de98041bbb014822fc05dd3fb.png>) | 저장 글 있는 읽기 목록 — 기본 목록에 글 존재 |
| 03 | [`sc_57450c38bf994be18d95fcaf712c56ba`](https://gummble.com/screens/sc_57450c38bf994be18d95fcaf712c56ba?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [저장 글 있는 읽기 목록](<screens/03_sc_57450c38bf994be18d95fcaf712c56ba.png>) | Digest 일자별 추천 — 특정 날짜 다이제스트 |
| 04 | [`sc_bafbf7b80b154e25aec15e120a13f72a`](https://gummble.com/screens/sc_bafbf7b80b154e25aec15e120a13f72a?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [Digest 일자별 추천](<screens/04_sc_bafbf7b80b154e25aec15e120a13f72a.png>) | 저장한 하이라이트 목록 — 여러 글의 개인 하이라이트 모음 |
| 05 | [`sc_c37aefd0916548dda3cb46d61cc25193`](https://gummble.com/screens/sc_c37aefd0916548dda3cb46d61cc25193?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [저장한 하이라이트 목록](<screens/05_sc_c37aefd0916548dda3cb46d61cc25193.png>) | 이 흐름의 기록 종료; 2절의 종료 범위 참조 |

## 4. 화면별 상세 분석

### 단계 01 — For you 홈 피드

- Screen ID: `sc_5e0ba0e498ff49579bf838096aec4b5e`
- 원본: [화면 페이지](https://gummble.com/screens/sc_5e0ba0e498ff49579bf838096aec4b5e?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/33b28771-e947-4feb-9868-73bc4a3b1941.png)
- 로컬 이미지: [01_sc_5e0ba0e498ff49579bf838096aec4b5e.png](<screens/01_sc_5e0ba0e498ff49579bf838096aec4b5e.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `플로우 시작` → 현재 → `sc_84e0421de98041bbb014822fc05dd3fb`

#### 화면에서 직접 확인한 내용

- 레이아웃: 상단 Home·알림, 가로 탭, 세로 기사 카드, 하단 4탭과 작성 플로팅 버튼
- 입력 항목·기본값·표시 데이터: For you 활성. 작가·제목·요약·썸네일·날짜·박수·응답 수 표시
- 버튼·메뉴·안내 문구: +, For you·Following·Featured 탭, 카드의 원형 − 아이콘·더보기, 알림, 작성, 하단 홈·탐색·라이브러리·프로필
- 확인된 상태: 추천 기사 목록
- R2 보완 관찰·해석: 카드 하단 원형 − 아이콘을 저장 아이콘으로 기록했던 부분을 교정했다. 아이콘의 실행 결과는 이 흐름에 없으며 기사 상세의 북마크와 구분한다.
- 단계 간 변화: 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 피드 항목·기사·작성자·집계 및 사용자 추천 피드백 분리. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 추천 알고리즘·개인화 저장·카드 전체 클릭 영역

#### 모델링 영향

- 후보와 근거: 피드 항목·기사·작성자·집계 및 사용자 추천 피드백 분리. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 추천 알고리즘·개인화 저장·카드 전체 클릭 영역. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 02 — Library 초기 목록

- Screen ID: `sc_84e0421de98041bbb014822fc05dd3fb`
- 원본: [화면 페이지](https://gummble.com/screens/sc_84e0421de98041bbb014822fc05dd3fb?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/b9da01de-2a84-4b9f-acb3-250057c4744d.png)
- 로컬 이미지: [02_sc_84e0421de98041bbb014822fc05dd3fb.png](<screens/02_sc_84e0421de98041bbb014822fc05dd3fb.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_5e0ba0e498ff49579bf838096aec4b5e` → 현재 → `sc_57450c38bf994be18d95fcaf712c56ba`

#### 화면에서 직접 확인한 내용

- 레이아웃: Your library·New list·가로 탭·시작 배너·Reading list 카드
- 입력 항목·기본값·표시 데이터: Your lists 활성, No stories·자물쇠
- 버튼·메뉴·안내 문구: New list, Start a list, 배너 닫기, 다운로드, 더보기
- 확인된 상태: 기본 읽기 목록이 비어 있음
- 단계 간 변화: For you 홈 피드 → Library 초기 목록. 현재 관찰값: Your lists 활성, No stories·자물쇠. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 기본 읽기 목록과 사용자 생성 리스트. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 기본 Reading list의 자동 생성 시점·빈 목록 다운로드 동작은 미확인. 기본 리스트 삭제 불가는 공식 도움말에서 확인했다.

#### 모델링 영향

- 후보와 근거: 기본 읽기 목록과 사용자 생성 리스트. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 기본 Reading list의 자동 생성 시점·빈 목록 다운로드 동작은 미확인. 기본 리스트 삭제 불가는 공식 도움말에서 확인했다. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 03 — 저장 글 있는 읽기 목록

- Screen ID: `sc_57450c38bf994be18d95fcaf712c56ba`
- 원본: [화면 페이지](https://gummble.com/screens/sc_57450c38bf994be18d95fcaf712c56ba?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/29a527b5-05d5-457e-bcee-054c95a9fdef.png)
- 로컬 이미지: [03_sc_57450c38bf994be18d95fcaf712c56ba.png](<screens/03_sc_57450c38bf994be18d95fcaf712c56ba.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_84e0421de98041bbb014822fc05dd3fb` → 현재 → `sc_bafbf7b80b154e25aec15e120a13f72a`

#### 화면에서 직접 확인한 내용

- 레이아웃: Your lists의 Reading list 카드·3개 썸네일
- 입력 항목·기본값·표시 데이터: 3 stories·자물쇠
- 버튼·메뉴·안내 문구: 다운로드, 더보기, 카드
- 확인된 상태: 기본 목록에 글 존재
- 단계 간 변화: Library 초기 목록 → 저장 글 있는 읽기 목록. 현재 관찰값: 3 stories·자물쇠. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 리스트 기사 수와 커버 이미지 모음. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 글 추가 경로·정렬

#### 모델링 영향

- 후보와 근거: 리스트 기사 수와 커버 이미지 모음. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 글 추가 경로·정렬. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 04 — Digest 일자별 추천

- Screen ID: `sc_bafbf7b80b154e25aec15e120a13f72a`
- 원본: [화면 페이지](https://gummble.com/screens/sc_bafbf7b80b154e25aec15e120a13f72a?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/c874cfa3-e3ba-4d91-937e-1d0b7a076b4a.png)
- 로컬 이미지: [04_sc_bafbf7b80b154e25aec15e120a13f72a.png](<screens/04_sc_bafbf7b80b154e25aec15e120a13f72a.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_57450c38bf994be18d95fcaf712c56ba` → 현재 → `sc_c37aefd0916548dda3cb46d61cc25193`

#### 화면에서 직접 확인한 내용

- 레이아웃: Digest 탭·날짜 선택·설정·Today's highlights
- 입력 항목·기본값·표시 데이터: June 12 2025
- 버튼·메뉴·안내 문구: 날짜 필터, 설정, 기사 저장·더보기
- 확인된 상태: 특정 날짜 다이제스트
- 단계 간 변화: 저장 글 있는 읽기 목록 → Digest 일자별 추천. 현재 관찰값: June 12 2025. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 다이제스트 발행일과 기사 목록. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 화면 날짜는 캡처일이 아님·생성 기준 미확인

#### 모델링 영향

- 후보와 근거: 다이제스트 발행일과 기사 목록. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 화면 날짜는 캡처일이 아님·생성 기준 미확인. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 05 — 저장한 하이라이트 목록

- Screen ID: `sc_c37aefd0916548dda3cb46d61cc25193`
- 원본: [화면 페이지](https://gummble.com/screens/sc_c37aefd0916548dda3cb46d61cc25193?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/dcaec3f1-55e9-4b5e-a7c0-b04ebb185dd9.png)
- 로컬 이미지: [05_sc_c37aefd0916548dda3cb46d61cc25193.png](<screens/05_sc_c37aefd0916548dda3cb46d61cc25193.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_bafbf7b80b154e25aec15e120a13f72a` → 현재 → `플로우 기록 종료`

#### 화면에서 직접 확인한 내용

- 레이아웃: Highlighted 탭·강조 구절·원문 제목·작성자
- 입력 항목·기본값·표시 데이터: Alex Smith highlighted
- 버튼·메뉴·안내 문구: 원문 항목
- 확인된 상태: 여러 글의 개인 하이라이트 모음
- R2 보완 관찰·해석: 가로 탭에는 Reading history도 보인다. 이 라이브러리 탭의 본문은 수록되지 않았으며 Home 아래 Refine recommendations의 Reading history 화면과 같다고 단정하지 않는다.
- 단계 간 변화: Digest 일자별 추천 → 저장한 하이라이트 목록. 현재 관찰값: Alex Smith highlighted. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 사용자 강조를 기사와 연결. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 정렬·원문 삭제 시 처리

#### 모델링 영향

- 후보와 근거: 사용자 강조를 기사와 연결. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 정렬·원문 삭제 시 처리. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

## 5. 업무 규칙과 데이터 변화

Saved lists·Reading history 탭이 보여도 이 부모 흐름에 그 내용은 수록되지 않았다.

| 단계 | 관찰된 상태·값 | 근거의 한계 |
| --- | --- | --- |
| 01 | 추천 기사 목록 — For you 활성. 작가·제목·요약·썸네일·날짜·박수·응답 수 표시 | 추천 알고리즘·개인화 저장·카드 전체 클릭 영역 |
| 02 | 기본 읽기 목록이 비어 있음 — Your lists 활성, No stories·자물쇠 | 기본 Reading list의 자동 생성 시점·빈 목록 다운로드 동작은 미확인. 기본 리스트 삭제 불가는 공식 도움말에서 확인했다. |
| 03 | 기본 목록에 글 존재 — 3 stories·자물쇠 | 글 추가 경로·정렬 |
| 04 | 특정 날짜 다이제스트 — June 12 2025 | 화면 날짜는 캡처일이 아님·생성 기준 미확인 |
| 05 | 여러 글의 개인 하이라이트 모음 — Alex Smith highlighted | 정렬·원문 삭제 시 처리 |

위 표는 보이는 상태 변화다. 성공 토스트가 있어도 외부 계정의 가시성·영수증·서버 저장을 독립 검증한 것은 아니다.

## 6. 공식 도움말과 API 대조

공식 자료는 현재 문서이며 과거 캡처와 시점이 다를 수 있다. 아래 기능 설명의 범위만 대조했으며 내부 API나 제품 전체 규칙을 확인한 것은 아니다.

- [Create and manage lists](https://help.medium.com/hc/en-us/articles/214993247-Create-and-manage-lists): 글을 여러 리스트에 선택해 저장할 수 있고 공개 리스트 자체는 Saved lists에 저장한다. 리스트 설명은 선택 입력이다. 비공개 리스트는 본인만 접근하며 기본 Reading list는 삭제할 수 없다. 리스트별 글 메모·재정렬·제거와 다운로드 버튼 재탭을 통한 오프라인 사본 제거를 설명한다. 캡처에 없는 실행 결과는 검증 완료로 기록하지 않는다. [공통 문서 대조](<../../SOURCES.md#lists>).
- [About highlights](https://help.medium.com/hc/en-us/articles/214406358-About-highlights): 강조 구절은 작성자·팔로워에게 보일 수 있다. 구절 인용 응답과 타인 하이라이트 숨김을 설명한다. [공통 문서 대조](<../../SOURCES.md#highlights>).

화면에서 관찰한 값·메뉴와 문서에 없는 세부 상태는 구분한다. 미수록 오류·권한·실패 분기는 아래 질문으로 남긴다.

- [API 검토](<../../SOURCES.md#api>). 이 흐름의 내부 endpoint·요청·응답·DB 스키마는 확인하지 않았다.

## 7. 데이터 모델링 시사점

다음은 관찰에 기반한 구현 후보다. Kostolany의 기능 채택·스키마·업무 정책으로 확정하지 않는다.

- 단계 01: 피드 항목·기사·작성자·집계 및 사용자 추천 피드백 분리
- 단계 02: 기본 읽기 목록과 사용자 생성 리스트
- 단계 03: 리스트 기사 수와 커버 이미지 모음
- 단계 04: 다이제스트 발행일과 기사 목록
- 단계 05: 사용자 강조를 기사와 연결

## 8. 미확인 사항과 검토 질문

**원본에 없는 분기·남은 범위:** Saved lists·Library Reading history 본문, 배너 닫기 결과·빈 탭·실패·페이지네이션.

- 단계 01: 추천 알고리즘·개인화 저장·카드 전체 클릭 영역
- 단계 02: 기본 Reading list의 자동 생성 시점·빈 목록 다운로드 동작은 미확인. 기본 리스트 삭제 불가는 공식 도움말에서 확인했다.
- 단계 03: 글 추가 경로·정렬
- 단계 04: 화면 날짜는 캡처일이 아님·생성 기준 미확인
- 단계 05: 정렬·원문 삭제 시 처리
- 같은 계정·같은 빌드에서 시작 상태를 맞춘 뒤 정상·취소·실패·재진입 결과를 검증해야 한다.

## 9. 검토 이력

| 차수 | 날짜 | 확인·작성 내용 | 남은 범위 |
| --- | --- | --- | --- |
| R1 | 2026-11-18 KST | MCP 5단계와 실제 이미지 5단계 대조. 원본·로컬 파일 연결, 관찰·문서·가정 분리 | 실제 계정 재현·미수록 상태·8절 항목 |
| R2 | 2026-11-18 KST | MCP 5단계 순서 재조회 및 이미지 재검토. 3개 단계의 관찰·표현 보완. 진입·종료·미수록 분기·관련 흐름 및 공식 규칙 대조 추가 | 원본에 없는 8절 분기·실제 계정 동작 |
| 문서 점검 | 2026-11-18 KST | 전체 63개 문서의 단계 순서·이미지 ID·로컬 링크·필수 절 구조를 검증 스크립트로 점검 | 이미지 2차 검토로 계산하지 않음 |
| 이미지 배치 | 2026-11-18 KST | MCP 단계 목록 재조회 후 이 흐름의 원본 5개를 screens/에 단계 순서대로 복사. 문서 링크·화면 ID·순서·크기·SHA-256 대조 | 파일 배치·무결성 점검이며 추가 시각 검토나 계정 재현은 아님 |
