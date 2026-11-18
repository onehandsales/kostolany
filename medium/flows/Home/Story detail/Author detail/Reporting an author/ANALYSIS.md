# Reporting an author 플로우 분석

검토 상태: **R2 누락·내용 재검토 완료(정적 캡처 범위)**. 실제 이미지 재확인 **5/5단계**. 계정 재현은 수행하지 않았다.

관찰은 Gummble 캡처에서 직접 본 내용, 문서 확인은 현재 공식 도움말, 설계 가정은 우리 구현 후보를 뜻한다. 버튼의 존재·성공 안내·실제 서버 결과를 구분한다.

## 1. 출처와 검토 상태

| 항목 | 기록 |
| --- | --- |
| 앱 | Medium iOS · `medium-ios` · `4674239e-d24a-4ef4-aed5-9682429edd48` |
| Flow ID | `64d3f74a-531c-49d8-a81f-3d16533d6c91` |
| 원본 | [Gummble flow](https://gummble.com/apps/medium-ios?tab=flows&flow=64d3f74a-531c-49d8-a81f-3d16533d6c91) |
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

신고 사유·선택적 차단·필수 선택에 따른 버튼 활성화와 접수 토스트를 확인한다.

Spam 선택 후 제출하며 추가 차단은 체크하지 않았다. 신고 접수가 제재 완료를 뜻하지 않는다.

- 상위 흐름: [Author detail](<../ANALYSIS.md>)
- 하위 흐름: 없음.
- 폴더 위치: `medium/flows/Home/Story detail/Author detail/Reporting an author`
- 부모·자식은 Gummble 탐색 분류다. 모든 자식 흐름이 반드시 실행되는 순차 단계나 런타임 화면 트리를 뜻하지 않는다.

### 진입 조건과 확인된 종료 범위

- 진입: 작가 더보기의 Report author에서 시작한다.
- 종료: Spam 선택 후 신고 성공 토스트. Also block은 미체크다.
- 관련 흐름: [Blocking an author](<../Blocking an author/ANALYSIS.md>) · [Medium policy](<../../Responses/Medium policy/ANALYSIS.md>)
- 관련 흐름 링크는 기능의 연결점이다. 서로 다른 캡처를 같은 계정·같은 시각의 연속 실행으로 합치지 않는다.

## 3. 전체 단계표

MCP가 반환한 순서다. 스크롤·메뉴·입력·로딩도 각각 한 단계이며 캡처 사이의 클릭·저장·네트워크가 모두 기록되었다는 뜻은 아니다.

| 단계 | Screen ID와 원본 | 확인된 화면 | 다음 캡처와의 관계 |
| --- | --- | --- | --- |
| 01 | [`sc_3de359a1c13340968c4b733188faa6d1`](https://gummble.com/screens/sc_3de359a1c13340968c4b733188faa6d1?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [작가 프로필 Stories](<screens/01_sc_3de359a1c13340968c4b733188faa6d1.png>) | 작가 더보기 액션 — 작가 관리 메뉴 |
| 02 | [`sc_c25f22caf7cd49ba88c8611fb7480932`](https://gummble.com/screens/sc_c25f22caf7cd49ba88c8611fb7480932?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [작가 더보기 액션](<screens/02_sc_c25f22caf7cd49ba88c8611fb7480932.png>) | 사용자 신고 사유 선택 — 신고 입력 전 |
| 03 | [`sc_d07b03740ecc44328719d4d21703bb06`](https://gummble.com/screens/sc_d07b03740ecc44328719d4d21703bb06?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [사용자 신고 사유 선택](<screens/03_sc_d07b03740ecc44328719d4d21703bb06.png>) | 신고 사유 선택 완료 — 신고 제출 준비 |
| 04 | [`sc_af0ecdded03643ca8cea85ec5341d906`](https://gummble.com/screens/sc_af0ecdded03643ca8cea85ec5341d906?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [신고 사유 선택 완료](<screens/04_sc_af0ecdded03643ca8cea85ec5341d906.png>) | 사용자 신고 성공 안내 — 신고 접수 성공 표시 |
| 05 | [`sc_d9ba56fa632249c7908f15a8e3082d97`](https://gummble.com/screens/sc_d9ba56fa632249c7908f15a8e3082d97?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [사용자 신고 성공 안내](<screens/05_sc_d9ba56fa632249c7908f15a8e3082d97.png>) | 이 흐름의 기록 종료; 2절의 종료 범위 참조 |

## 4. 화면별 상세 분석

### 단계 01 — 작가 프로필 Stories

- Screen ID: `sc_3de359a1c13340968c4b733188faa6d1`
- 원본: [화면 페이지](https://gummble.com/screens/sc_3de359a1c13340968c4b733188faa6d1?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/5f5a2b22-7784-4f14-b72d-88ec4ad97ff9.png)
- 로컬 이미지: [01_sc_3de359a1c13340968c4b733188faa6d1.png](<screens/01_sc_3de359a1c13340968c4b733188faa6d1.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `플로우 시작` → 현재 → `sc_c25f22caf7cd49ba88c8611fb7480932`

#### 화면에서 직접 확인한 내용

- 레이아웃: 프로필·관계 집계·Friend 배지·팔로우 버튼·탭
- 입력 항목·기본값·표시 데이터: Jordan Gibbs, 10.2K followers·25 following
- 버튼·메뉴·안내 문구: Follow, Stories, Lists, About, 더보기
- 확인된 상태: 고정 글 Pinned 표시
- 단계 간 변화: 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 작가 프로필·고정 기사·멤버십 배지. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 프로필 내 정렬·배지 현재 조건

#### 모델링 영향

- 후보와 근거: 작가 프로필·고정 기사·멤버십 배지. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 프로필 내 정렬·배지 현재 조건. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 02 — 작가 더보기 액션

- Screen ID: `sc_c25f22caf7cd49ba88c8611fb7480932`
- 원본: [화면 페이지](https://gummble.com/screens/sc_c25f22caf7cd49ba88c8611fb7480932?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/ab62aa5c-2721-43a1-80e0-0d4f04868889.png)
- 로컬 이미지: [02_sc_c25f22caf7cd49ba88c8611fb7480932.png](<screens/02_sc_c25f22caf7cd49ba88c8611fb7480932.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_3de359a1c13340968c4b733188faa6d1` → 현재 → `sc_d07b03740ecc44328719d4d21703bb06`

#### 화면에서 직접 확인한 내용

- 레이아웃: 프로필 위 하단 시트
- 입력 항목·기본값·표시 데이터: 추가 입력 없음
- 버튼·메뉴·안내 문구: Share author, Mute author, Block author, Report author, Cancel
- 확인된 상태: 작가 관리 메뉴
- 단계 간 변화: 작가 프로필 Stories → 작가 더보기 액션. 현재 관찰값: 추가 입력 없음. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 개인 피드 제어·상호 접근 제한·운영 신고 분리. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 음소거·차단·신고의 정확한 범위

#### 모델링 영향

- 후보와 근거: 개인 피드 제어·상호 접근 제한·운영 신고 분리. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 음소거·차단·신고의 정확한 범위. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 03 — 사용자 신고 사유 선택

- Screen ID: `sc_d07b03740ecc44328719d4d21703bb06`
- 원본: [화면 페이지](https://gummble.com/screens/sc_d07b03740ecc44328719d4d21703bb06?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/52ddfdfb-e649-4899-955c-0e1a0e85c081.png)
- 로컬 이미지: [03_sc_d07b03740ecc44328719d4d21703bb06.png](<screens/03_sc_d07b03740ecc44328719d4d21703bb06.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_c25f22caf7cd49ba88c8611fb7480932` → 현재 → `sc_af0ecdded03643ca8cea85ec5341d906`

#### 화면에서 직접 확인한 내용

- 레이아웃: Report user 시트, 라디오 사유·추가 차단 체크·정책 링크
- 입력 항목·기본값·표시 데이터: Spam·Harassment·Rules violation·AI-generated 모두 미선택, 차단 미체크
- 버튼·메뉴·안내 문구: Report 비활성, 정책·권리침해 링크, 닫기
- 확인된 상태: 신고 입력 전
- R2 보완 관찰·해석: 사유 선택용 원형 항목과 Also block this user 사각 체크박스를 구분한다. 신고 사유와 추가 차단은 별도 입력이며, 권리 침해 신고는 별도 링크로 분기한다.
- 단계 간 변화: 작가 더보기 액션 → 사용자 신고 사유 선택. 현재 관찰값: Spam·Harassment·Rules violation·AI-generated 모두 미선택, 차단 미체크. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 신고 사유와 차단 부가 행동 분리. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 사유별 추가 입력·신고 기준

#### 모델링 영향

- 후보와 근거: 신고 사유와 차단 부가 행동 분리. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 사유별 추가 입력·신고 기준. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 04 — 신고 사유 선택 완료

- Screen ID: `sc_af0ecdded03643ca8cea85ec5341d906`
- 원본: [화면 페이지](https://gummble.com/screens/sc_af0ecdded03643ca8cea85ec5341d906?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/6989a272-27d3-4aaf-be5f-09fe8b77c09a.png)
- 로컬 이미지: [04_sc_af0ecdded03643ca8cea85ec5341d906.png](<screens/04_sc_af0ecdded03643ca8cea85ec5341d906.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_d07b03740ecc44328719d4d21703bb06` → 현재 → `sc_d9ba56fa632249c7908f15a8e3082d97`

#### 화면에서 직접 확인한 내용

- 레이아웃: Spam 라디오 선택, 하단 빨간 버튼
- 입력 항목·기본값·표시 데이터: Spam 선택·차단 미체크
- 버튼·메뉴·안내 문구: Report 활성
- 확인된 상태: 신고 제출 준비
- R2 보완 관찰·해석: Spam 선택 후에도 Also block this user는 미체크다. 이후 성공 화면을 신고와 차단이 모두 실행된 결과로 해석하지 않는다.
- 단계 간 변화: 사용자 신고 사유 선택 → 신고 사유 선택 완료. 현재 관찰값: Spam 선택·차단 미체크. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 선택 사유와 제출 가능 상태. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 필수값 서버 검증·중복 신고

#### 모델링 영향

- 후보와 근거: 선택 사유와 제출 가능 상태. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 필수값 서버 검증·중복 신고. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 05 — 사용자 신고 성공 안내

- Screen ID: `sc_d9ba56fa632249c7908f15a8e3082d97`
- 원본: [화면 페이지](https://gummble.com/screens/sc_d9ba56fa632249c7908f15a8e3082d97?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/c23a80f8-74de-4f6c-9dc7-28f4efe72dfc.png)
- 로컬 이미지: [05_sc_d9ba56fa632249c7908f15a8e3082d97.png](<screens/05_sc_d9ba56fa632249c7908f15a8e3082d97.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_af0ecdded03643ca8cea85ec5341d906` → 현재 → `플로우 기록 종료`

#### 화면에서 직접 확인한 내용

- 레이아웃: 프로필에 검정 토스트
- 입력 항목·기본값·표시 데이터: Successfully reported user
- 버튼·메뉴·안내 문구: Follow, 더보기
- 확인된 상태: 신고 접수 성공 표시
- 단계 간 변화: 신고 사유 선택 완료 → 사용자 신고 성공 안내. 현재 관찰값: Successfully reported user. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 신고 접수와 조치 상태 구분. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 운영 검토·제재 결과는 미수록

#### 모델링 영향

- 후보와 근거: 신고 접수와 조치 상태 구분. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 운영 검토·제재 결과는 미수록. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

## 5. 업무 규칙과 데이터 변화

Spam 선택 후 제출하며 추가 차단은 체크하지 않았다. 신고 접수가 제재 완료를 뜻하지 않는다.

| 단계 | 관찰된 상태·값 | 근거의 한계 |
| --- | --- | --- |
| 01 | 고정 글 Pinned 표시 — Jordan Gibbs, 10.2K followers·25 following | 프로필 내 정렬·배지 현재 조건 |
| 02 | 작가 관리 메뉴 — 추가 입력 없음 | 음소거·차단·신고의 정확한 범위 |
| 03 | 신고 입력 전 — Spam·Harassment·Rules violation·AI-generated 모두 미선택, 차단 미체크 | 사유별 추가 입력·신고 기준 |
| 04 | 신고 제출 준비 — Spam 선택·차단 미체크 | 필수값 서버 검증·중복 신고 |
| 05 | 신고 접수 성공 표시 — Successfully reported user | 운영 검토·제재 결과는 미수록 |

위 표는 보이는 상태 변화다. 성공 토스트가 있어도 외부 계정의 가시성·영수증·서버 저장을 독립 검증한 것은 아니다.

## 6. 공식 도움말과 API 대조

공식 자료는 현재 문서이며 과거 캡처와 시점이 다를 수 있다. 아래 기능 설명의 범위만 대조했으며 내부 API나 제품 전체 규칙을 확인한 것은 아니다.

- [Medium Rules](https://help.medium.com/hc/en-us/articles/213477928-Medium-Rules): 글·응답·계정의 더보기에서 신고할 수 있다고 안내한다. 신고 접수와 운영 판단·제재는 별개다. [공통 문서 대조](<../../../../../SOURCES.md#rules>).
- [Report posts, lists, and users](https://help.medium.com/hc/en-us/articles/217047977-Report-posts-lists-and-users): 신고에는 로그인이 필요하며 신고된 글·사용자는 Trust & Safety의 검토 대상이다. 접수 성공은 제재 확정이 아니다. 현재 도움말의 iOS 기사 신고 진입은 Share를 설명하지만 캡처에는 기사 더보기의 Report story도 보여 진입점 차이를 보존한다. [공통 문서 대조](<../../../../../SOURCES.md#reporting>).
- [How to block and manage blocked users](https://help.medium.com/hc/en-us/articles/217048077-How-to-block-and-manage-blocked-users): 현재 도움말은 차단 시 피드·Digest 제외, 팔로우 불가, 상대 프로필은 보되 글은 볼 수 없음을 설명한다. 차단된 사용자의 로그인 상태 콘텐츠 접근·상호작용도 제한하며, 그 사용자의 리스트에 저장된 내 글은 제거된다고 안내한다. 캡처에는 차단 토스트 이후에도 글 카드가 보이므로 현재 규칙을 재현한 화면으로 단정하지 않는다. [공통 문서 대조](<../../../../../SOURCES.md#blocking>).

화면에서 관찰한 값·메뉴와 문서에 없는 세부 상태는 구분한다. 미수록 오류·권한·실패 분기는 아래 질문으로 남긴다.

- [API 검토](<../../../../../SOURCES.md#api>). 이 흐름의 내부 endpoint·요청·응답·DB 스키마는 확인하지 않았다.

## 7. 데이터 모델링 시사점

다음은 관찰에 기반한 구현 후보다. Kostolany의 기능 채택·스키마·업무 정책으로 확정하지 않는다.

- 단계 01: 작가 프로필·고정 기사·멤버십 배지
- 단계 02: 개인 피드 제어·상호 접근 제한·운영 신고 분리
- 단계 03: 신고 사유와 차단 부가 행동 분리
- 단계 04: 선택 사유와 제출 가능 상태
- 단계 05: 신고 접수와 조치 상태 구분

## 8. 미확인 사항과 검토 질문

**원본에 없는 분기·남은 범위:** 나머지 사유·동시 차단·권리 침해 분기·닫기·중복·접수 실패·제재 결과.

- 단계 01: 프로필 내 정렬·배지 현재 조건
- 단계 02: 음소거·차단·신고의 정확한 범위
- 단계 03: 사유별 추가 입력·신고 기준
- 단계 04: 필수값 서버 검증·중복 신고
- 단계 05: 운영 검토·제재 결과는 미수록
- 같은 계정·같은 빌드에서 시작 상태를 맞춘 뒤 정상·취소·실패·재진입 결과를 검증해야 한다.

## 9. 검토 이력

| 차수 | 날짜 | 확인·작성 내용 | 남은 범위 |
| --- | --- | --- | --- |
| R1 | 2026-11-18 KST | MCP 5단계와 실제 이미지 5단계 대조. 원본·로컬 파일 연결, 관찰·문서·가정 분리 | 실제 계정 재현·미수록 상태·8절 항목 |
| R2 | 2026-11-18 KST | MCP 5단계 순서 재조회 및 이미지 재검토. 2개 단계의 관찰·표현 보완. 진입·종료·미수록 분기·관련 흐름 및 공식 규칙 대조 추가 | 원본에 없는 8절 분기·실제 계정 동작 |
| 문서 점검 | 2026-11-18 KST | 전체 63개 문서의 단계 순서·이미지 ID·로컬 링크·필수 절 구조를 검증 스크립트로 점검 | 이미지 2차 검토로 계산하지 않음 |
| 이미지 배치 | 2026-11-18 KST | MCP 단계 목록 재조회 후 이 흐름의 원본 5개를 screens/에 단계 순서대로 복사. 문서 링크·화면 ID·순서·크기·SHA-256 대조 | 파일 배치·무결성 점검이며 추가 시각 검토나 계정 재현은 아님 |
