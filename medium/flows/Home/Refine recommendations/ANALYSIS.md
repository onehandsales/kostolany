# Refine recommendations 플로우 분석

검토 상태: **R2 누락·내용 재검토 완료(정적 캡처 범위)**. 실제 이미지 재확인 **5/5단계**. 계정 재현은 수행하지 않았다.

관찰은 Gummble 캡처에서 직접 본 내용, 문서 확인은 현재 공식 도움말, 설계 가정은 우리 구현 후보를 뜻한다. 버튼의 존재·성공 안내·실제 서버 결과를 구분한다.

## 1. 출처와 검토 상태

| 항목 | 기록 |
| --- | --- |
| 앱 | Medium iOS · `medium-ios` · `4674239e-d24a-4ef4-aed5-9682429edd48` |
| Flow ID | `1043a5b0-0f3a-4346-8e55-19489597305b` |
| 원본 | [Gummble flow](https://gummble.com/apps/medium-ios?tab=flows&flow=1043a5b0-0f3a-4346-8e55-19489597305b) |
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

추천 조정 화면의 Suggestions·Reading history·Following 상태를 비교한다.

팔로잉 빈 상태와 작가·토픽이 있는 상태 사이의 변경 동작이 모두 수록되지는 않았다.

- 상위 흐름: [Home](<../ANALYSIS.md>)
- 하위 흐름: [Filtering suggestions](<Filtering suggestions/ANALYSIS.md>) · [Reading history](<Reading history/ANALYSIS.md>)
- 폴더 위치: `medium/flows/Home/Refine recommendations`
- 부모·자식은 Gummble 탐색 분류다. 모든 자식 흐름이 반드시 실행되는 순차 단계나 런타임 화면 트리를 뜻하지 않는다.

### 진입 조건과 확인된 종료 범위

- 진입: Home 뒤 추천 관리 화면이 수록된다.
- 종료: Suggestions·Reading history·Following의 빈/채워진 상태를 비교한다.
- 관련 흐름: [Muting an author](<../Story detail/Author detail/Muting an author/ANALYSIS.md>) · [Following an author](<../Story detail/Author detail/Following an author/ANALYSIS.md>)
- 관련 흐름 링크는 기능의 연결점이다. 서로 다른 캡처를 같은 계정·같은 시각의 연속 실행으로 합치지 않는다.

## 3. 전체 단계표

MCP가 반환한 순서다. 스크롤·메뉴·입력·로딩도 각각 한 단계이며 캡처 사이의 클릭·저장·네트워크가 모두 기록되었다는 뜻은 아니다.

| 단계 | Screen ID와 원본 | 확인된 화면 | 다음 캡처와의 관계 |
| --- | --- | --- | --- |
| 01 | [`sc_5e0ba0e498ff49579bf838096aec4b5e`](https://gummble.com/screens/sc_5e0ba0e498ff49579bf838096aec4b5e?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | For you 홈 피드 | 추천 조정의 Suggestions — 추천 토픽과 기사·팔로워 집계 |
| 02 | [`sc_90bc6a79e86d436e89d94d7dc82b624c`](https://gummble.com/screens/sc_90bc6a79e86d436e89d94d7dc82b624c?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 추천 조정의 Suggestions | 읽기 기록 목록 — 읽기 기록 존재 |
| 03 | [`sc_f4bb3fa34f32466b9bd12eea57ea518f`](https://gummble.com/screens/sc_f4bb3fa34f32466b9bd12eea57ea518f?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 읽기 기록 목록 | 팔로잉 빈 상태 — 팔로우 대상 없음 |
| 04 | [`sc_944b2eea3834408b8c04981e5eb2adf8`](https://gummble.com/screens/sc_944b2eea3834408b8c04981e5eb2adf8?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 팔로잉 빈 상태 | 팔로잉 유형별 목록 — 작가·토픽 팔로우 표시 |
| 05 | [`sc_1c666fb7aadc411c9add1aa2b19bd56c`](https://gummble.com/screens/sc_1c666fb7aadc411c9add1aa2b19bd56c?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 팔로잉 유형별 목록 | 이 흐름의 기록 종료; 2절의 종료 범위 참조 |

## 4. 화면별 상세 분석

### 단계 01 — For you 홈 피드

- Screen ID: `sc_5e0ba0e498ff49579bf838096aec4b5e`
- 원본: [화면 페이지](https://gummble.com/screens/sc_5e0ba0e498ff49579bf838096aec4b5e?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/33b28771-e947-4feb-9868-73bc4a3b1941.png)
- 로컬 이미지: [sc_5e0ba0e498ff49579bf838096aec4b5e.png](<../../../screens/sc_5e0ba0e498ff49579bf838096aec4b5e.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `플로우 시작` → 현재 → `sc_90bc6a79e86d436e89d94d7dc82b624c`

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

### 단계 02 — 추천 조정의 Suggestions

- Screen ID: `sc_90bc6a79e86d436e89d94d7dc82b624c`
- 원본: [화면 페이지](https://gummble.com/screens/sc_90bc6a79e86d436e89d94d7dc82b624c?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/e4fa3bb8-9af0-4ca5-96a1-eb5be804683d.png)
- 로컬 이미지: [sc_90bc6a79e86d436e89d94d7dc82b624c.png](<../../../screens/sc_90bc6a79e86d436e89d94d7dc82b624c.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_5e0ba0e498ff49579bf838096aec4b5e` → 현재 → `sc_f4bb3fa34f32466b9bd12eea57ea518f`

#### 화면에서 직접 확인한 내용

- 레이아웃: 상단 설명과 Following·Reading history·Muted·Suggestions 탭
- 입력 항목·기본값·표시 데이터: Suggestions 활성, Topics 필터
- 버튼·메뉴·안내 문구: Follow, 유형 드롭다운, 뒤로
- 확인된 상태: 추천 토픽과 기사·팔로워 집계
- R2 보완 관찰·해석: Refine recommendations에는 Following·Reading history·Muted·Suggestions 네 탭이 있다. Muted 탭의 존재는 확인되지만 해당 탭 내용은 이 흐름에 수록되지 않았다.
- 단계 간 변화: For you 홈 피드 → 추천 조정의 Suggestions. 현재 관찰값: Suggestions 활성, Topics 필터. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 추천 입력 신호와 팔로우 대상을 구분. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 추천 산출·팔로우 즉시 반영 범위

#### 모델링 영향

- 후보와 근거: 추천 입력 신호와 팔로우 대상을 구분. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 추천 산출·팔로우 즉시 반영 범위. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 03 — 읽기 기록 목록

- Screen ID: `sc_f4bb3fa34f32466b9bd12eea57ea518f`
- 원본: [화면 페이지](https://gummble.com/screens/sc_f4bb3fa34f32466b9bd12eea57ea518f?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/6d2988d1-c826-4b67-aed7-8552188bbfb0.png)
- 로컬 이미지: [sc_f4bb3fa34f32466b9bd12eea57ea518f.png](<../../../screens/sc_f4bb3fa34f32466b9bd12eea57ea518f.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_90bc6a79e86d436e89d94d7dc82b624c` → 현재 → `sc_944b2eea3834408b8c04981e5eb2adf8`

#### 화면에서 직접 확인한 내용

- 레이아웃: Reading history 탭, 전체 삭제 안내, 기사 카드
- 입력 항목·기본값·표시 데이터: 읽은 글·날짜·집계 표시
- 버튼·메뉴·안내 문구: Clear history, 개별 휴지통, 더보기
- 확인된 상태: 읽기 기록 존재
- R2 보완 관찰·해석: 전체 Clear history와 개별 글 휴지통은 삭제 범위가 다르다. 안내는 기록을 지워 새롭게 시작할 수 있다는 설명이며, 추천 모델 데이터까지 완전히 삭제한다는 증거는 아니다.
- 단계 간 변화: 추천 조정의 Suggestions → 읽기 기록 목록. 현재 관찰값: 읽은 글·날짜·집계 표시. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 사용자-기사 읽기 이벤트와 추천 반영. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 읽음 판정 기준·기록 보존 기간

#### 모델링 영향

- 후보와 근거: 사용자-기사 읽기 이벤트와 추천 반영. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 읽음 판정 기준·기록 보존 기간. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 04 — 팔로잉 빈 상태

- Screen ID: `sc_944b2eea3834408b8c04981e5eb2adf8`
- 원본: [화면 페이지](https://gummble.com/screens/sc_944b2eea3834408b8c04981e5eb2adf8?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/3aa7fd94-cb91-4cee-a4fd-70e1671eacae.png)
- 로컬 이미지: [sc_944b2eea3834408b8c04981e5eb2adf8.png](<../../../screens/sc_944b2eea3834408b8c04981e5eb2adf8.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_f4bb3fa34f32466b9bd12eea57ea518f` → 현재 → `sc_1c666fb7aadc411c9add1aa2b19bd56c`

#### 화면에서 직접 확인한 내용

- 레이아웃: Following 탭과 All 필터, 중앙 안내
- 입력 항목·기본값·표시 데이터: You don't follow anything yet
- 버튼·메뉴·안내 문구: 유형 필터
- 확인된 상태: 팔로우 대상 없음
- 단계 간 변화: 읽기 기록 목록 → 팔로잉 빈 상태. 현재 관찰값: You don't follow anything yet. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 빈 팔로우 집합의 UI. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 다른 캡처 계정 상태와 연속성

#### 모델링 영향

- 후보와 근거: 빈 팔로우 집합의 UI. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 다른 캡처 계정 상태와 연속성. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 05 — 팔로잉 유형별 목록

- Screen ID: `sc_1c666fb7aadc411c9add1aa2b19bd56c`
- 원본: [화면 페이지](https://gummble.com/screens/sc_1c666fb7aadc411c9add1aa2b19bd56c?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/9fe5df2b-eca9-4f9e-8a04-e55478ded2fa.png)
- 로컬 이미지: [sc_1c666fb7aadc411c9add1aa2b19bd56c.png](<../../../screens/sc_1c666fb7aadc411c9add1aa2b19bd56c.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_944b2eea3834408b8c04981e5eb2adf8` → 현재 → `플로우 기록 종료`

#### 화면에서 직접 확인한 내용

- 레이아웃: Writers·Topics 섹션과 개수
- 입력 항목·기본값·표시 데이터: Writers 1, Topics 3
- 버튼·메뉴·안내 문구: Following 드롭다운, See all
- 확인된 상태: 작가·토픽 팔로우 표시
- 단계 간 변화: 팔로잉 빈 상태 → 팔로잉 유형별 목록. 현재 관찰값: Writers 1, Topics 3. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 타입별 팔로우 관계·집계. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 변경 시점·현재 계정 일치 여부

#### 모델링 영향

- 후보와 근거: 타입별 팔로우 관계·집계. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 변경 시점·현재 계정 일치 여부. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

## 5. 업무 규칙과 데이터 변화

팔로잉 빈 상태와 작가·토픽이 있는 상태 사이의 변경 동작이 모두 수록되지는 않았다.

| 단계 | 관찰된 상태·값 | 근거의 한계 |
| --- | --- | --- |
| 01 | 추천 기사 목록 — For you 활성. 작가·제목·요약·썸네일·날짜·박수·응답 수 표시 | 추천 알고리즘·개인화 저장·카드 전체 클릭 영역 |
| 02 | 추천 토픽과 기사·팔로워 집계 — Suggestions 활성, Topics 필터 | 추천 산출·팔로우 즉시 반영 범위 |
| 03 | 읽기 기록 존재 — 읽은 글·날짜·집계 표시 | 읽음 판정 기준·기록 보존 기간 |
| 04 | 팔로우 대상 없음 — You don't follow anything yet | 다른 캡처 계정 상태와 연속성 |
| 05 | 작가·토픽 팔로우 표시 — Writers 1, Topics 3 | 변경 시점·현재 계정 일치 여부 |

위 표는 보이는 상태 변화다. 성공 토스트가 있어도 외부 계정의 가시성·영수증·서버 저장을 독립 검증한 것은 아니다.

## 6. 공식 도움말과 API 대조

공식 자료는 현재 문서이며 과거 캡처와 시점이 다를 수 있다. 아래 기능 설명의 범위만 대조했으며 내부 API나 제품 전체 규칙을 확인한 것은 아니다.

- [Refine recommendations](https://help.medium.com/hc/en-us/articles/224488047-Refine-recommendations): 팔로우·추천·읽기 기록·음소거를 조정한다. 기록 제거는 추천을 조정하는 수단이다. [공통 문서 대조](<../../../SOURCES.md#recommend>).

화면에서 관찰한 값·메뉴와 문서에 없는 세부 상태는 구분한다. 미수록 오류·권한·실패 분기는 아래 질문으로 남긴다.

- [API 검토](<../../../SOURCES.md#api>). 이 흐름의 내부 endpoint·요청·응답·DB 스키마는 확인하지 않았다.

## 7. 데이터 모델링 시사점

다음은 관찰에 기반한 구현 후보다. Kostolany의 기능 채택·스키마·업무 정책으로 확정하지 않는다.

- 단계 01: 피드 항목·기사·작성자·집계 및 사용자 추천 피드백 분리
- 단계 02: 추천 입력 신호와 팔로우 대상을 구분
- 단계 03: 사용자-기사 읽기 이벤트와 추천 반영
- 단계 04: 빈 팔로우 집합의 UI
- 단계 05: 타입별 팔로우 관계·집계

## 8. 미확인 사항과 검토 질문

**원본에 없는 분기·남은 범위:** Muted 탭 내용, 팔로우 변경 중간 과정, 다른 계정·재진입 동기화.

- 단계 01: 추천 알고리즘·개인화 저장·카드 전체 클릭 영역
- 단계 02: 추천 산출·팔로우 즉시 반영 범위
- 단계 03: 읽음 판정 기준·기록 보존 기간
- 단계 04: 다른 캡처 계정 상태와 연속성
- 단계 05: 변경 시점·현재 계정 일치 여부
- 같은 계정·같은 빌드에서 시작 상태를 맞춘 뒤 정상·취소·실패·재진입 결과를 검증해야 한다.

## 9. 검토 이력

| 차수 | 날짜 | 확인·작성 내용 | 남은 범위 |
| --- | --- | --- | --- |
| R1 | 2026-11-18 KST | MCP 5단계와 실제 이미지 5단계 대조. 원본·로컬 파일 연결, 관찰·문서·가정 분리 | 실제 계정 재현·미수록 상태·8절 항목 |
| R2 | 2026-11-18 KST | MCP 5단계 순서 재조회 및 이미지 재검토. 3개 단계의 관찰·표현 보완. 진입·종료·미수록 분기·관련 흐름 및 공식 규칙 대조 추가 | 원본에 없는 8절 분기·실제 계정 동작 |
| 문서 점검 | 2026-11-18 KST | 전체 63개 문서의 단계 순서·이미지 ID·로컬 링크·필수 절 구조를 검증 스크립트로 점검 | 이미지 2차 검토로 계산하지 않음 |
