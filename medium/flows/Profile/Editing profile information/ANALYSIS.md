# Editing profile information 플로우 분석

검토 상태: **R2 누락·내용 재검토 완료(정적 캡처 범위)**. 실제 이미지 재확인 **8/8단계**. 계정 재현은 수행하지 않았다.

관찰은 Gummble 캡처에서 직접 본 내용, 문서 확인은 현재 공식 도움말, 설계 가정은 우리 구현 후보를 뜻한다. 버튼의 존재·성공 안내·실제 서버 결과를 구분한다.

## 1. 출처와 검토 상태

| 항목 | 기록 |
| --- | --- |
| 앱 | Medium iOS · `medium-ios` · `4674239e-d24a-4ef4-aed5-9682429edd48` |
| Flow ID | `aeb4ae5b-7125-4088-94de-7b0abe00e612` |
| 원본 | [Gummble flow](https://gummble.com/apps/medium-ios?tab=flows&flow=aeb4ae5b-7125-4088-94de-7b0abe00e612) |
| 카탈로그 버전 | MCP 조회 `Latest`, version ID `1419` |
| 제품 빌드 | 개별 화면의 제품 빌드 미확인. 카탈로그 버전을 제품 버전으로 사용하지 않음 |
| 조회일 / 이미지 검토일 | 2026-11-18 KST. 개별 분·초는 기록하지 않음 |
| 캡처일 | 미확인. 기사·알림·통계에 표시된 날짜는 캡처일이 아님 |
| 화면 수 / 이미지 확인 | 8단계 / 8단계. 공통 이미지는 다른 흐름과 동일 관찰 기록을 재사용 |
| 이미지 검토 방식 | R1: MCP 이미지 또는 로컬 원본. R2: 원본 PNG를 390×844로 축소한 번호 포함 비교 시트. 공통 이미지는 고유 이미지 기준 재검토 후 각 흐름에서 대조 |
| 크기·환경 | MCP 크기와 실제 PNG 픽셀 크기를 단계별 구분. 기기 모델·OS·DPR·배율·국가·계정 권한은 별도 확인 없으면 미확인 |
| 계정 재현 | 미수행. 로그인·발행·구매·신고·삭제·외부 공유를 실행하지 않음 |
| 공식 문서 | 2026-11-18 조회. 6절에 직접 대조 범위와 미확인 범위를 기록 |

## 2. 플로우 목적과 연결

이름·사진·대명사·짧은 소개 편집과 프로필 Stories·About 반영을 확인한다.

사진 권한과 전송 과정은 미수록이다. 앱에서 안내하는 별도 About Page 편집은 데스크톱 웹 경로다.

- 상위 흐름: [Profile](<../ANALYSIS.md>)
- 하위 흐름: [Adding pronouns](<Adding pronouns/ANALYSIS.md>)
- 폴더 위치: `medium/flows/Profile/Editing profile information`
- 부모·자식은 Gummble 탐색 분류다. 모든 자식 흐름이 반드시 실행되는 순차 단계나 런타임 화면 트리를 뜻하지 않는다.

### 진입 조건과 확인된 종료 범위

- 진입: 본인 프로필 편집에서 이름·대명사·소개를 표시한다.
- 종료: 사진·대명사·소개 입력 뒤 프로필에 사진/he·him/소개가 반영된다.
- 관련 흐름: [Adding pronouns](<Adding pronouns/ANALYSIS.md>) · [Profile](<../ANALYSIS.md>)
- 관련 흐름 링크는 기능의 연결점이다. 서로 다른 캡처를 같은 계정·같은 시각의 연속 실행으로 합치지 않는다.

## 3. 전체 단계표

MCP가 반환한 순서다. 스크롤·메뉴·입력·로딩도 각각 한 단계이며 캡처 사이의 클릭·저장·네트워크가 모두 기록되었다는 뜻은 아니다.

| 단계 | Screen ID와 원본 | 확인된 화면 | 다음 캡처와의 관계 |
| --- | --- | --- | --- |
| 01 | [`sc_1bd141b757934a88b4a003855e1794cc`](https://gummble.com/screens/sc_1bd141b757934a88b4a003855e1794cc?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [내 프로필 빈 Stories](<screens/01_sc_1bd141b757934a88b4a003855e1794cc.png>) | 프로필 편집 폼 — 이름 필수 표시·소개 선택 |
| 02 | [`sc_a829121c47a444cd8a8fd0d9889edaed`](https://gummble.com/screens/sc_a829121c47a444cd8a8fd0d9889edaed?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [프로필 편집 폼](<screens/02_sc_a829121c47a444cd8a8fd0d9889edaed.png>) | 프로필 사진 소스 선택 — 사진 추가 방식 선택 |
| 03 | [`sc_cba29e82e4364a239d3e5423213fa670`](https://gummble.com/screens/sc_cba29e82e4364a239d3e5423213fa670?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [프로필 사진 소스 선택](<screens/03_sc_cba29e82e4364a239d3e5423213fa670.png>) | 기기 사진 선택기 — OS 사진 선택 UI |
| 04 | [`sc_9fd133df622e4ddd859bbbeb845ba4da`](https://gummble.com/screens/sc_9fd133df622e4ddd859bbbeb845ba4da?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [기기 사진 선택기](<screens/04_sc_9fd133df622e4ddd859bbbeb845ba4da.png>) | 프로필 사진 선택 반영 — 선택 사진 미리보기 |
| 05 | [`sc_05df03a16c6b466b8ba91d9d6244c2f5`](https://gummble.com/screens/sc_05df03a16c6b466b8ba91d9d6244c2f5?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [프로필 사진 선택 반영](<screens/05_sc_05df03a16c6b466b8ba91d9d6244c2f5.png>) | 대명사·소개 입력된 프로필 — 저장 전 정보 완성 |
| 06 | [`sc_befb6fde38cc48f3827ea389caed11de`](https://gummble.com/screens/sc_befb6fde38cc48f3827ea389caed11de?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [대명사·소개 입력된 프로필](<screens/06_sc_befb6fde38cc48f3827ea389caed11de.png>) | 프로필 편집 결과 — 사진·대명사 반영 |
| 07 | [`sc_be99c4fdcf634190a324ec9820a84f43`](https://gummble.com/screens/sc_be99c4fdcf634190a324ec9820a84f43?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [프로필 편집 결과](<screens/07_sc_be99c4fdcf634190a324ec9820a84f43.png>) | 프로필 소개·사진·대명사 표시 — 프로필 정보 반영 |
| 08 | [`sc_3cd0855e78a84d4ea413f0e5b3dffb73`](https://gummble.com/screens/sc_3cd0855e78a84d4ea413f0e5b3dffb73?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | [프로필 소개·사진·대명사 표시](<screens/08_sc_3cd0855e78a84d4ea413f0e5b3dffb73.png>) | 이 흐름의 기록 종료; 2절의 종료 범위 참조 |

## 4. 화면별 상세 분석

### 단계 01 — 내 프로필 빈 Stories

- Screen ID: `sc_1bd141b757934a88b4a003855e1794cc`
- 원본: [화면 페이지](https://gummble.com/screens/sc_1bd141b757934a88b4a003855e1794cc?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/c0863491-e2ab-4355-a664-3a63d4697dad.png)
- 로컬 이미지: [01_sc_1bd141b757934a88b4a003855e1794cc.png](<screens/01_sc_1bd141b757934a88b4a003855e1794cc.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `플로우 시작` → 현재 → `sc_a829121c47a444cd8a8fd0d9889edaed`

#### 화면에서 직접 확인한 내용

- 레이아웃: 프로필·통계·편집·탭·Public 필터·빈 안내
- 입력 항목·기본값·표시 데이터: Alex Smith, 0 followers·1 following
- 버튼·메뉴·안내 문구: View stats, Edit your profile, Get started, 설정
- 확인된 상태: 발행 글 없음
- R2 보완 관찰·해석: Stories의 Public 필터가 표시된다. 필터 선택지 전체·초안·Unlisted 목록은 수록되지 않아 프로필에 나타난 글 수를 계정 전체 글 수로 보지 않는다.
- 단계 간 변화: 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 프로필 공개 글과 개인 초안 구분. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 미발행 초안 포함 여부

#### 모델링 영향

- 후보와 근거: 프로필 공개 글과 개인 초안 구분. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 미발행 초안 포함 여부. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 02 — 프로필 편집 폼

- Screen ID: `sc_a829121c47a444cd8a8fd0d9889edaed`
- 원본: [화면 페이지](https://gummble.com/screens/sc_a829121c47a444cd8a8fd0d9889edaed?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/6285df8c-2b83-47d1-88ce-1d0c3fa3c87f.png)
- 로컬 이미지: [02_sc_a829121c47a444cd8a8fd0d9889edaed.png](<screens/02_sc_a829121c47a444cd8a8fd0d9889edaed.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_1bd141b757934a88b4a003855e1794cc` → 현재 → `sc_cba29e82e4364a239d3e5423213fa670`

#### 화면에서 직접 확인한 내용

- 레이아웃: 사진·Name*·Pronouns·Short bio·About Page 안내
- 입력 항목·기본값·표시 데이터: Alex Smith10/50, Pronouns0/4, Short bio0/160
- 버튼·메뉴·안내 문구: Update photo, Save, 닫기
- 확인된 상태: 이름 필수 표시·소개 선택
- R2 보완 관찰·해석: Name만 별표로 필수임을 표시한다. 0/4는 대명사 선택 개수이며, 0/160은 Short bio 문자 카운터다. About Page는 데스크톱 웹의 medium.com/me/about에서 편집하라는 별도 안내다.
- 단계 간 변화: 내 프로필 빈 Stories → 프로필 편집 폼. 현재 관찰값: Alex Smith10/50, Pronouns0/4, Short bio0/160. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 이름·사진·대명사 목록·짧은 소개·About 분리. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 이름의 공백·중복·50자 초과 처리, 프로필 Save 실패와 취소 복원은 미수록.

#### 모델링 영향

- 후보와 근거: 이름·사진·대명사 목록·짧은 소개·About 분리. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 이름의 공백·중복·50자 초과 처리, 프로필 Save 실패와 취소 복원은 미수록. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 03 — 프로필 사진 소스 선택

- Screen ID: `sc_cba29e82e4364a239d3e5423213fa670`
- 원본: [화면 페이지](https://gummble.com/screens/sc_cba29e82e4364a239d3e5423213fa670?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/2c6f3c7e-e299-4fd6-aa36-747659200088.png)
- 로컬 이미지: [03_sc_cba29e82e4364a239d3e5423213fa670.png](<screens/03_sc_cba29e82e4364a239d3e5423213fa670.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_a829121c47a444cd8a8fd0d9889edaed` → 현재 → `sc_9fd133df622e4ddd859bbbeb845ba4da`

#### 화면에서 직접 확인한 내용

- 레이아웃: 편집 폼 위 하단 액션 시트
- 입력 항목·기본값·표시 데이터: 기존 폼 유지
- 버튼·메뉴·안내 문구: Camera, Choose from library, Cancel
- 확인된 상태: 사진 추가 방식 선택
- 단계 간 변화: 프로필 편집 폼 → 프로필 사진 소스 선택. 현재 관찰값: 기존 폼 유지. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 사진 선택과 프로필 저장 분리. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 사진 권한·크롭·업로드 실패

#### 모델링 영향

- 후보와 근거: 사진 선택과 프로필 저장 분리. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 사진 권한·크롭·업로드 실패. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 04 — 기기 사진 선택기

- Screen ID: `sc_9fd133df622e4ddd859bbbeb845ba4da`
- 원본: [화면 페이지](https://gummble.com/screens/sc_9fd133df622e4ddd859bbbeb845ba4da?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/227906c7-a53c-4564-b126-ac1208802864.png)
- 로컬 이미지: [04_sc_9fd133df622e4ddd859bbbeb845ba4da.png](<screens/04_sc_9fd133df622e4ddd859bbbeb845ba4da.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_cba29e82e4364a239d3e5423213fa670` → 현재 → `sc_05df03a16c6b466b8ba91d9d6244c2f5`

#### 화면에서 직접 확인한 내용

- 레이아웃: Mobbin 앨범의 3열 사진 그리드
- 입력 항목·기본값·표시 데이터: 사진 4개, Location Is Included
- 버튼·메뉴·안내 문구: 사진 선택, Collections, 하단 옵션
- 확인된 상태: OS 사진 선택 UI
- 단계 간 변화: 프로필 사진 소스 선택 → 기기 사진 선택기. 현재 관찰값: 사진 4개, Location Is Included. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 기기 사진 권한·메타데이터 처리. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 위치 메타데이터 실제 전송·제거 여부

#### 모델링 영향

- 후보와 근거: 기기 사진 권한·메타데이터 처리. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 위치 메타데이터 실제 전송·제거 여부. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 05 — 프로필 사진 선택 반영

- Screen ID: `sc_05df03a16c6b466b8ba91d9d6244c2f5`
- 원본: [화면 페이지](https://gummble.com/screens/sc_05df03a16c6b466b8ba91d9d6244c2f5?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/5dcb9447-a63e-43b9-b5a8-a1a2ee9d1f83.png)
- 로컬 이미지: [05_sc_05df03a16c6b466b8ba91d9d6244c2f5.png](<screens/05_sc_05df03a16c6b466b8ba91d9d6244c2f5.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_9fd133df622e4ddd859bbbeb845ba4da` → 현재 → `sc_befb6fde38cc48f3827ea389caed11de`

#### 화면에서 직접 확인한 내용

- 레이아웃: 편집 폼 아바타 변경
- 입력 항목·기본값·표시 데이터: 이름 유지·대명사와 소개 빈값
- 버튼·메뉴·안내 문구: Save, Update photo
- 확인된 상태: 선택 사진 미리보기
- 단계 간 변화: 기기 사진 선택기 → 프로필 사진 선택 반영. 현재 관찰값: 이름 유지·대명사와 소개 빈값. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 사진 임시 선택과 확정 프로필. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 즉시 업로드와 최종 저장 구분

#### 모델링 영향

- 후보와 근거: 사진 임시 선택과 확정 프로필. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 즉시 업로드와 최종 저장 구분. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 06 — 대명사·소개 입력된 프로필

- Screen ID: `sc_befb6fde38cc48f3827ea389caed11de`
- 원본: [화면 페이지](https://gummble.com/screens/sc_befb6fde38cc48f3827ea389caed11de?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/9aebe5ac-4f27-451f-b07d-1a20ee6bd5ef.png)
- 로컬 이미지: [06_sc_befb6fde38cc48f3827ea389caed11de.png](<screens/06_sc_befb6fde38cc48f3827ea389caed11de.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_05df03a16c6b466b8ba91d9d6244c2f5` → 현재 → `sc_be99c4fdcf634190a324ec9820a84f43`

#### 화면에서 직접 확인한 내용

- 레이아웃: he·him 칩·소개 입력
- 입력 항목·기본값·표시 데이터: Pronouns2/4, Short bio49/160
- 버튼·메뉴·안내 문구: Save, 대명사 Add
- 확인된 상태: 저장 전 정보 완성
- 단계 간 변화: 프로필 사진 선택 반영 → 대명사·소개 입력된 프로필. 현재 관찰값: Pronouns2/4, Short bio49/160. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 대명사는 최대4개 선택 항목 후보. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 초과·중복·순서 검증

#### 모델링 영향

- 후보와 근거: 대명사는 최대4개 선택 항목 후보. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 초과·중복·순서 검증. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 07 — 프로필 편집 결과

- Screen ID: `sc_be99c4fdcf634190a324ec9820a84f43`
- 원본: [화면 페이지](https://gummble.com/screens/sc_be99c4fdcf634190a324ec9820a84f43?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/341aebfd-20c0-4890-a31f-5faa7599116e.png)
- 로컬 이미지: [07_sc_be99c4fdcf634190a324ec9820a84f43.png](<screens/07_sc_be99c4fdcf634190a324ec9820a84f43.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_befb6fde38cc48f3827ea389caed11de` → 현재 → `sc_3cd0855e78a84d4ea413f0e5b3dffb73`

#### 화면에서 직접 확인한 내용

- 레이아웃: 프로필 사진·he/him 표시·Stories
- 입력 항목·기본값·표시 데이터: 이름·기사 유지
- 버튼·메뉴·안내 문구: Edit your profile, View stats
- 확인된 상태: 사진·대명사 반영
- 단계 간 변화: 대명사·소개 입력된 프로필 → 프로필 편집 결과. 현재 관찰값: 이름·기사 유지. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 프로필 표시값 갱신. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 소개는 About에서 별도 확인 필요

#### 모델링 영향

- 후보와 근거: 프로필 표시값 갱신. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 소개는 About에서 별도 확인 필요. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 08 — 프로필 소개·사진·대명사 표시

- Screen ID: `sc_3cd0855e78a84d4ea413f0e5b3dffb73`
- 원본: [화면 페이지](https://gummble.com/screens/sc_3cd0855e78a84d4ea413f0e5b3dffb73?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/0ff45dc3-5d29-499b-928f-11aea3936371.png)
- 로컬 이미지: [08_sc_3cd0855e78a84d4ea413f0e5b3dffb73.png](<screens/08_sc_3cd0855e78a84d4ea413f0e5b3dffb73.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_be99c4fdcf634190a324ec9820a84f43` → 현재 → `플로우 기록 종료`

#### 화면에서 직접 확인한 내용

- 레이아웃: 프로필 아바타·이름 옆 he/him·About 본문
- 입력 항목·기본값·표시 데이터: Curious mind sharing thoughts one story at a time
- 버튼·메뉴·안내 문구: View stats, Edit your profile, 설정
- 확인된 상태: 프로필 정보 반영
- 단계 간 변화: 프로필 편집 결과 → 프로필 소개·사진·대명사 표시. 현재 관찰값: Curious mind sharing thoughts one story at a time. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 사진·소개·대명사 별도 필드. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 대명사 다른 화면 노출·사진 처리

#### 모델링 영향

- 후보와 근거: 사진·소개·대명사 별도 필드. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 대명사 다른 화면 노출·사진 처리. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

## 5. 업무 규칙과 데이터 변화

사진 권한과 전송 과정은 미수록이다. 앱에서 안내하는 별도 About Page 편집은 데스크톱 웹 경로다.

| 단계 | 관찰된 상태·값 | 근거의 한계 |
| --- | --- | --- |
| 01 | 발행 글 없음 — Alex Smith, 0 followers·1 following | 미발행 초안 포함 여부 |
| 02 | 이름 필수 표시·소개 선택 — Alex Smith10/50, Pronouns0/4, Short bio0/160 | 이름의 공백·중복·50자 초과 처리, 프로필 Save 실패와 취소 복원은 미수록. |
| 03 | 사진 추가 방식 선택 — 기존 폼 유지 | 사진 권한·크롭·업로드 실패 |
| 04 | OS 사진 선택 UI — 사진 4개, Location Is Included | 위치 메타데이터 실제 전송·제거 여부 |
| 05 | 선택 사진 미리보기 — 이름 유지·대명사와 소개 빈값 | 즉시 업로드와 최종 저장 구분 |
| 06 | 저장 전 정보 완성 — Pronouns2/4, Short bio49/160 | 초과·중복·순서 검증 |
| 07 | 사진·대명사 반영 — 이름·기사 유지 | 소개는 About에서 별도 확인 필요 |
| 08 | 프로필 정보 반영 — Curious mind sharing thoughts one story at a time | 대명사 다른 화면 노출·사진 처리 |

위 표는 보이는 상태 변화다. 성공 토스트가 있어도 외부 계정의 가시성·영수증·서버 저장을 독립 검증한 것은 아니다.

## 6. 공식 도움말과 API 대조

공식 자료는 현재 문서이며 과거 캡처와 시점이 다를 수 있다. 아래 기능 설명의 범위만 대조했으며 내부 API나 제품 전체 규칙을 확인한 것은 아니다.

- [Your profile page](https://help.medium.com/hc/en-us/articles/115004747067-Your-profile-page): 앱에서 이름·사진·160자 소개를 수정한다. 더 긴 About 편집은 웹에서 제공한다. [공통 문서 대조](<../../../SOURCES.md#profile>).
- [How to set your pronouns on Medium](https://help.medium.com/hc/en-us/articles/23866640775063-How-to-set-your-pronouns-on-Medium): 대명사는 최대 4개 선택하며 Done 후 프로필 Save가 필요하다. 프로필과 응답 등에 표시된다. [공통 문서 대조](<../../../SOURCES.md#pronouns>).

화면에서 관찰한 값·메뉴와 문서에 없는 세부 상태는 구분한다. 미수록 오류·권한·실패 분기는 아래 질문으로 남긴다.

- [API 검토](<../../../SOURCES.md#api>). 이 흐름의 내부 endpoint·요청·응답·DB 스키마는 확인하지 않았다.

## 7. 데이터 모델링 시사점

다음은 관찰에 기반한 구현 후보다. Kostolany의 기능 채택·스키마·업무 정책으로 확정하지 않는다.

- 단계 01: 프로필 공개 글과 개인 초안 구분
- 단계 02: 이름·사진·대명사 목록·짧은 소개·About 분리
- 단계 03: 사진 선택과 프로필 저장 분리
- 단계 04: 기기 사진 권한·메타데이터 처리
- 단계 05: 사진 임시 선택과 확정 프로필
- 단계 06: 대명사는 최대4개 선택 항목 후보
- 단계 07: 프로필 표시값 갱신
- 단계 08: 사진·소개·대명사 별도 필드

## 8. 미확인 사항과 검토 질문

**원본에 없는 분기·남은 범위:** Name 50·bio 160 경계·빈 이름·Cancel·사진 권한/실패·웹 About 편집.

- 단계 01: 미발행 초안 포함 여부
- 단계 02: 이름의 공백·중복·50자 초과 처리, 프로필 Save 실패와 취소 복원은 미수록.
- 단계 03: 사진 권한·크롭·업로드 실패
- 단계 04: 위치 메타데이터 실제 전송·제거 여부
- 단계 05: 즉시 업로드와 최종 저장 구분
- 단계 06: 초과·중복·순서 검증
- 단계 07: 소개는 About에서 별도 확인 필요
- 단계 08: 대명사 다른 화면 노출·사진 처리
- 같은 계정·같은 빌드에서 시작 상태를 맞춘 뒤 정상·취소·실패·재진입 결과를 검증해야 한다.

## 9. 검토 이력

| 차수 | 날짜 | 확인·작성 내용 | 남은 범위 |
| --- | --- | --- | --- |
| R1 | 2026-11-18 KST | MCP 8단계와 실제 이미지 8단계 대조. 원본·로컬 파일 연결, 관찰·문서·가정 분리 | 실제 계정 재현·미수록 상태·8절 항목 |
| R2 | 2026-11-18 KST | MCP 8단계 순서 재조회 및 이미지 재검토. 2개 단계의 관찰·표현 보완. 진입·종료·미수록 분기·관련 흐름 및 공식 규칙 대조 추가 | 원본에 없는 8절 분기·실제 계정 동작 |
| 문서 점검 | 2026-11-18 KST | 전체 63개 문서의 단계 순서·이미지 ID·로컬 링크·필수 절 구조를 검증 스크립트로 점검 | 이미지 2차 검토로 계산하지 않음 |
| 이미지 배치 | 2026-11-18 KST | MCP 단계 목록 재조회 후 이 흐름의 원본 8개를 screens/에 단계 순서대로 복사. 문서 링크·화면 ID·순서·크기·SHA-256 대조 | 파일 배치·무결성 점검이며 추가 시각 검토나 계정 재현은 아님 |
