# Filtering suggestions 플로우 분석

검토 상태: **R2 누락·내용 재검토 완료(정적 캡처 범위)**. 실제 이미지 재확인 **4/4단계**. 계정 재현은 수행하지 않았다.

관찰은 Gummble 캡처에서 직접 본 내용, 문서 확인은 현재 공식 도움말, 설계 가정은 우리 구현 후보를 뜻한다. 버튼의 존재·성공 안내·실제 서버 결과를 구분한다.

## 1. 출처와 검토 상태

| 항목 | 기록 |
| --- | --- |
| 앱 | Medium iOS · `medium-ios` · `4674239e-d24a-4ef4-aed5-9682429edd48` |
| Flow ID | `3875fab1-0285-4494-8ecf-b94f0998cc68` |
| 원본 | [Gummble flow](https://gummble.com/apps/medium-ios?tab=flows&flow=3875fab1-0285-4494-8ecf-b94f0998cc68) |
| 카탈로그 버전 | MCP 조회 `Latest`, version ID `1419` |
| 제품 빌드 | 개별 화면의 제품 빌드 미확인. 카탈로그 버전을 제품 버전으로 사용하지 않음 |
| 조회일 / 이미지 검토일 | 2026-11-18 KST. 개별 분·초는 기록하지 않음 |
| 캡처일 | 미확인. 기사·알림·통계에 표시된 날짜는 캡처일이 아님 |
| 화면 수 / 이미지 확인 | 4단계 / 4단계. 공통 이미지는 다른 흐름과 동일 관찰 기록을 재사용 |
| 이미지 검토 방식 | R1: MCP 이미지 또는 로컬 원본. R2: 원본 PNG를 390×844로 축소한 번호 포함 비교 시트. 공통 이미지는 고유 이미지 기준 재검토 후 각 흐름에서 대조 |
| 크기·환경 | MCP 크기와 실제 PNG 픽셀 크기를 단계별 구분. 기기 모델·OS·DPR·배율·국가·계정 권한은 별도 확인 없으면 미확인 |
| 계정 재현 | 미수행. 로그인·발행·구매·신고·삭제·외부 공유를 실행하지 않음 |
| 공식 문서 | 2026-11-18 조회. 6절에 직접 대조 범위와 미확인 범위를 기록 |

## 2. 플로우 목적과 연결

추천 대상을 Topics에서 All로 바꾸고 작가·토픽 및 팔로우 상태를 확인한다.

All·Writers·Publications·Topics가 선택지다. 이 캡처는 모든 유형의 결과를 각각 검증하지 않는다.

- 상위 흐름: [Refine recommendations](<../ANALYSIS.md>)
- 하위 흐름: 없음.
- 폴더 위치: `medium/flows/Home/Refine recommendations/Filtering suggestions`
- 부모·자식은 Gummble 탐색 분류다. 모든 자식 흐름이 반드시 실행되는 순차 단계나 런타임 화면 트리를 뜻하지 않는다.

### 진입 조건과 확인된 종료 범위

- 진입: Suggestions의 Topics 필터에서 시작한다.
- 종료: All 선택 메뉴와 작가·토픽 섹션이 보인다.
- 관련 흐름: [Refine recommendations](<../ANALYSIS.md>)
- 관련 흐름 링크는 기능의 연결점이다. 서로 다른 캡처를 같은 계정·같은 시각의 연속 실행으로 합치지 않는다.

## 3. 전체 단계표

MCP가 반환한 순서다. 스크롤·메뉴·입력·로딩도 각각 한 단계이며 캡처 사이의 클릭·저장·네트워크가 모두 기록되었다는 뜻은 아니다.

| 단계 | Screen ID와 원본 | 확인된 화면 | 다음 캡처와의 관계 |
| --- | --- | --- | --- |
| 01 | [`sc_90bc6a79e86d436e89d94d7dc82b624c`](https://gummble.com/screens/sc_90bc6a79e86d436e89d94d7dc82b624c?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [추천 조정의 Suggestions](<screens/01_sc_90bc6a79e86d436e89d94d7dc82b624c.png>) | 추천 유형 필터 메뉴 — 유형 선택 중 |
| 02 | [`sc_f978feb6af9f44b5a5fa8f514899f3da`](https://gummble.com/screens/sc_f978feb6af9f44b5a5fa8f514899f3da?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [추천 유형 필터 메뉴](<screens/02_sc_f978feb6af9f44b5a5fa8f514899f3da.png>) | 전체 추천의 작가 섹션 — 전체 추천 중 작가 목록 |
| 03 | [`sc_28a0bd2548fc4800b2b024bdc06bb115`](https://gummble.com/screens/sc_28a0bd2548fc4800b2b024bdc06bb115?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [전체 추천의 작가 섹션](<screens/03_sc_28a0bd2548fc4800b2b024bdc06bb115.png>) | 추천 토픽 팔로우 상태 — 일부 팔로우 반영 |
| 04 | [`sc_c7deda6b53824957b587bd922cd55399`](https://gummble.com/screens/sc_c7deda6b53824957b587bd922cd55399?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [추천 토픽 팔로우 상태](<screens/04_sc_c7deda6b53824957b587bd922cd55399.png>) | 이 흐름의 기록 종료; 2절의 종료 범위 참조 |

## 4. 화면별 상세 분석

### 단계 01 — 추천 조정의 Suggestions

- Screen ID: `sc_90bc6a79e86d436e89d94d7dc82b624c`
- 원본: [화면 페이지](https://gummble.com/screens/sc_90bc6a79e86d436e89d94d7dc82b624c?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/e4fa3bb8-9af0-4ca5-96a1-eb5be804683d.png)
- 로컬 이미지: [01_sc_90bc6a79e86d436e89d94d7dc82b624c.png](<screens/01_sc_90bc6a79e86d436e89d94d7dc82b624c.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `플로우 시작` → 현재 → `sc_f978feb6af9f44b5a5fa8f514899f3da`

#### 화면에서 직접 확인한 내용

- 레이아웃: 상단 설명과 Following·Reading history·Muted·Suggestions 탭
- 입력 항목·기본값·표시 데이터: Suggestions 활성, Topics 필터
- 버튼·메뉴·안내 문구: Follow, 유형 드롭다운, 뒤로
- 확인된 상태: 추천 토픽과 기사·팔로워 집계
- R2 보완 관찰·해석: Refine recommendations에는 Following·Reading history·Muted·Suggestions 네 탭이 있다. Muted 탭의 존재는 확인되지만 해당 탭 내용은 이 흐름에 수록되지 않았다.
- 단계 간 변화: 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 추천 입력 신호와 팔로우 대상을 구분. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 추천 산출·팔로우 즉시 반영 범위

#### 모델링 영향

- 후보와 근거: 추천 입력 신호와 팔로우 대상을 구분. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 추천 산출·팔로우 즉시 반영 범위. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 02 — 추천 유형 필터 메뉴

- Screen ID: `sc_f978feb6af9f44b5a5fa8f514899f3da`
- 원본: [화면 페이지](https://gummble.com/screens/sc_f978feb6af9f44b5a5fa8f514899f3da?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/c4e3f3b1-f7f0-47df-93b5-4b76235871a9.png)
- 로컬 이미지: [02_sc_f978feb6af9f44b5a5fa8f514899f3da.png](<screens/02_sc_f978feb6af9f44b5a5fa8f514899f3da.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_90bc6a79e86d436e89d94d7dc82b624c` → 현재 → `sc_28a0bd2548fc4800b2b024bdc06bb115`

#### 화면에서 직접 확인한 내용

- 레이아웃: Suggestions 위 팝오버
- 입력 항목·기본값·표시 데이터: Topics 체크
- 버튼·메뉴·안내 문구: All, Writers, Publications, Topics
- 확인된 상태: 유형 선택 중
- 단계 간 변화: 추천 조정의 Suggestions → 추천 유형 필터 메뉴. 현재 관찰값: Topics 체크. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 추천 엔터티 타입 필터. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 필터 유지 범위

#### 모델링 영향

- 후보와 근거: 추천 엔터티 타입 필터. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 필터 유지 범위. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 03 — 전체 추천의 작가 섹션

- Screen ID: `sc_28a0bd2548fc4800b2b024bdc06bb115`
- 원본: [화면 페이지](https://gummble.com/screens/sc_28a0bd2548fc4800b2b024bdc06bb115?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/305baa74-09e1-4581-898f-9a74dd60fd4b.png)
- 로컬 이미지: [03_sc_28a0bd2548fc4800b2b024bdc06bb115.png](<screens/03_sc_28a0bd2548fc4800b2b024bdc06bb115.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_f978feb6af9f44b5a5fa8f514899f3da` → 현재 → `sc_c7deda6b53824957b587bd922cd55399`

#### 화면에서 직접 확인한 내용

- 레이아웃: All 필터 아래 Writers to follow
- 입력 항목·기본값·표시 데이터: 작가 소개·인증 배지 일부
- 버튼·메뉴·안내 문구: Follow
- 확인된 상태: 전체 추천 중 작가 목록
- 단계 간 변화: 추천 유형 필터 메뉴 → 전체 추천의 작가 섹션. 현재 관찰값: 작가 소개·인증 배지 일부. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 복수 타입 추천 결과. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 작가·발행물·토픽 섹션 정렬

#### 모델링 영향

- 후보와 근거: 복수 타입 추천 결과. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 작가·발행물·토픽 섹션 정렬. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 04 — 추천 토픽 팔로우 상태

- Screen ID: `sc_c7deda6b53824957b587bd922cd55399`
- 원본: [화면 페이지](https://gummble.com/screens/sc_c7deda6b53824957b587bd922cd55399?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/88106d2a-4f02-4a39-b312-f8ed2dc82370.png)
- 로컬 이미지: [04_sc_c7deda6b53824957b587bd922cd55399.png](<screens/04_sc_c7deda6b53824957b587bd922cd55399.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_28a0bd2548fc4800b2b024bdc06bb115` → 현재 → `플로우 기록 종료`

#### 화면에서 직접 확인한 내용

- 레이아웃: Topics to follow 목록과 추가 추천 링크
- 입력 항목·기본값·표시 데이터: Self Improvement·Writing·Relationships는 Following
- 버튼·메뉴·안내 문구: Follow, Following, See more suggestions
- 확인된 상태: 일부 팔로우 반영
- 단계 간 변화: 전체 추천의 작가 섹션 → 추천 토픽 팔로우 상태. 현재 관찰값: Self Improvement·Writing·Relationships는 Following. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 추천 행에 사용자별 관계 상태 결합. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 클릭 실패·동기화

#### 모델링 영향

- 후보와 근거: 추천 행에 사용자별 관계 상태 결합. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 클릭 실패·동기화. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

## 5. 업무 규칙과 데이터 변화

All·Writers·Publications·Topics가 선택지다. 이 캡처는 모든 유형의 결과를 각각 검증하지 않는다.

| 단계 | 관찰된 상태·값 | 근거의 한계 |
| --- | --- | --- |
| 01 | 추천 토픽과 기사·팔로워 집계 — Suggestions 활성, Topics 필터 | 추천 산출·팔로우 즉시 반영 범위 |
| 02 | 유형 선택 중 — Topics 체크 | 필터 유지 범위 |
| 03 | 전체 추천 중 작가 목록 — 작가 소개·인증 배지 일부 | 작가·발행물·토픽 섹션 정렬 |
| 04 | 일부 팔로우 반영 — Self Improvement·Writing·Relationships는 Following | 클릭 실패·동기화 |

위 표는 보이는 상태 변화다. 성공 토스트가 있어도 외부 계정의 가시성·영수증·서버 저장을 독립 검증한 것은 아니다.

## 6. 공식 도움말과 API 대조

공식 자료는 현재 문서이며 과거 캡처와 시점이 다를 수 있다. 아래 기능 설명의 범위만 대조했으며 내부 API나 제품 전체 규칙을 확인한 것은 아니다.

- [Refine recommendations](https://help.medium.com/hc/en-us/articles/224488047-Refine-recommendations): 팔로우·추천·읽기 기록·음소거를 조정한다. 기록 제거는 추천을 조정하는 수단이다. [공통 문서 대조](<../../../../SOURCES.md#recommend>).
- [Follow writers and publications](https://help.medium.com/hc/en-us/articles/35754720183063-Follow-writers-and-publications): 팔로우와 작가별 이메일 알림 선택을 설명한다. 알림 발송에는 작가의 발송 선택도 관여한다. [공통 문서 대조](<../../../../SOURCES.md#follow>).

화면에서 관찰한 값·메뉴와 문서에 없는 세부 상태는 구분한다. 미수록 오류·권한·실패 분기는 아래 질문으로 남긴다.

- [API 검토](<../../../../SOURCES.md#api>). 이 흐름의 내부 endpoint·요청·응답·DB 스키마는 확인하지 않았다.

## 7. 데이터 모델링 시사점

다음은 관찰에 기반한 구현 후보다. Kostolany의 기능 채택·스키마·업무 정책으로 확정하지 않는다.

- 단계 01: 추천 입력 신호와 팔로우 대상을 구분
- 단계 02: 추천 엔터티 타입 필터
- 단계 03: 복수 타입 추천 결과
- 단계 04: 추천 행에 사용자별 관계 상태 결합

## 8. 미확인 사항과 검토 질문

**원본에 없는 분기·남은 범위:** Writers·Publications 단독 선택 결과, 필터별 0건·오류·선택 유지.

- 단계 01: 추천 산출·팔로우 즉시 반영 범위
- 단계 02: 필터 유지 범위
- 단계 03: 작가·발행물·토픽 섹션 정렬
- 단계 04: 클릭 실패·동기화
- 같은 계정·같은 빌드에서 시작 상태를 맞춘 뒤 정상·취소·실패·재진입 결과를 검증해야 한다.

## 9. 검토 이력

| 차수 | 날짜 | 확인·작성 내용 | 남은 범위 |
| --- | --- | --- | --- |
| R1 | 2026-11-18 KST | MCP 4단계와 실제 이미지 4단계 대조. 원본·로컬 파일 연결, 관찰·문서·가정 분리 | 실제 계정 재현·미수록 상태·8절 항목 |
| R2 | 2026-11-18 KST | MCP 4단계 순서 재조회 및 이미지 재검토. 1개 단계의 관찰·표현 보완. 진입·종료·미수록 분기·관련 흐름 및 공식 규칙 대조 추가 | 원본에 없는 8절 분기·실제 계정 동작 |
| 문서 점검 | 2026-11-18 KST | 전체 63개 문서의 단계 순서·이미지 ID·로컬 링크·필수 절 구조를 검증 스크립트로 점검 | 이미지 2차 검토로 계산하지 않음 |
| 이미지 배치 | 2026-11-18 KST | MCP 단계 목록 재조회 후 이 흐름의 원본 4개를 screens/에 단계 순서대로 복사. 문서 링크·화면 ID·순서·크기·SHA-256 대조 | 파일 배치·무결성 점검이며 추가 시각 검토나 계정 재현은 아님 |
