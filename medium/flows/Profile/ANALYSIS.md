# Profile 플로우 분석

검토 상태: **R2 누락·내용 재검토 완료(정적 캡처 범위)**. 실제 이미지 재확인 **6/6단계**. 계정 재현은 수행하지 않았다.

관찰은 Gummble 캡처에서 직접 본 내용, 문서 확인은 현재 공식 도움말, 설계 가정은 우리 구현 후보를 뜻한다. 버튼의 존재·성공 안내·실제 서버 결과를 구분한다.

## 1. 출처와 검토 상태

| 항목 | 기록 |
| --- | --- |
| 앱 | Medium iOS · `medium-ios` · `4674239e-d24a-4ef4-aed5-9682429edd48` |
| Flow ID | `afd2d02e-1bfb-4ffc-9b96-48e3780161f9` |
| 원본 | [Gummble flow](https://gummble.com/apps/medium-ios?tab=flows&flow=afd2d02e-1bfb-4ffc-9b96-48e3780161f9) |
| 카탈로그 버전 | MCP 조회 `Latest`, version ID `1419` |
| 제품 빌드 | 개별 화면의 제품 빌드 미확인. 카탈로그 버전을 제품 버전으로 사용하지 않음 |
| 조회일 / 이미지 검토일 | 2026-11-18 KST. 개별 분·초는 기록하지 않음 |
| 캡처일 | 미확인. 기사·알림·통계에 표시된 날짜는 캡처일이 아님 |
| 화면 수 / 이미지 확인 | 6단계 / 6단계. 공통 이미지는 다른 흐름과 동일 관찰 기록을 재사용 |
| 이미지 검토 방식 | R1: MCP 이미지 또는 로컬 원본. R2: 원본 PNG를 390×844로 축소한 번호 포함 비교 시트. 공통 이미지는 고유 이미지 기준 재검토 후 각 흐름에서 대조 |
| 크기·환경 | MCP 크기와 실제 PNG 픽셀 크기를 단계별 구분. 기기 모델·OS·DPR·배율·국가·계정 권한은 별도 확인 없으면 미확인 |
| 계정 재현 | 미수행. 로그인·발행·구매·신고·삭제·외부 공유를 실행하지 않음 |
| 공식 문서 | 2026-11-18 조회. 6절에 직접 대조 범위와 미확인 범위를 기록 |

## 2. 플로우 목적과 연결

홈에서 내 프로필을 열어 Stories·Lists·About의 빈 상태와 콘텐츠 상태를 비교한다.

발행 과정은 Home 아래 Publishing a story, 사진·소개·대명사 입력은 Profile 아래 편집 흐름에 있다. 부모 캡처 사이의 데이터 변화 원인을 임의로 채우지 않는다.

- 상위 흐름: 없음. Gummble의 최상위 흐름이다.
- 하위 흐름: [Story stats](<Story stats/ANALYSIS.md>) · [Editing profile information](<Editing profile information/ANALYSIS.md>) · [Settings](<Settings/ANALYSIS.md>)
- 폴더 위치: `medium/flows/Profile`
- 부모·자식은 Gummble 탐색 분류다. 모든 자식 흐름이 반드시 실행되는 순차 단계나 런타임 화면 트리를 뜻하지 않는다.

### 진입 조건과 확인된 종료 범위

- 진입: Home 뒤 본인 프로필에서 시작한다.
- 종료: Stories 빈/게시 상태, Lists의 비공개 읽기 목록, About 빈/채워진 상태를 비교한다.
- 관련 흐름: [Author detail](<../Home/Story detail/Author detail/ANALYSIS.md>) · [Editing profile information](<Editing profile information/ANALYSIS.md>) · [Publishing a story](<../Home/Publishing a story/ANALYSIS.md>)
- 관련 흐름 링크는 기능의 연결점이다. 서로 다른 캡처를 같은 계정·같은 시각의 연속 실행으로 합치지 않는다.

## 3. 전체 단계표

MCP가 반환한 순서다. 스크롤·메뉴·입력·로딩도 각각 한 단계이며 캡처 사이의 클릭·저장·네트워크가 모두 기록되었다는 뜻은 아니다.

| 단계 | Screen ID와 원본 | 확인된 화면 | 다음 캡처와의 관계 |
| --- | --- | --- | --- |
| 01 | [`sc_5e0ba0e498ff49579bf838096aec4b5e`](https://gummble.com/screens/sc_5e0ba0e498ff49579bf838096aec4b5e?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | For you 홈 피드 | 내 프로필 빈 Stories — 발행 글 없음 |
| 02 | [`sc_1bd141b757934a88b4a003855e1794cc`](https://gummble.com/screens/sc_1bd141b757934a88b4a003855e1794cc?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 내 프로필 빈 Stories | 발행 글과 반응 있는 프로필 — 발행 후 반응 집계 |
| 03 | [`sc_d76d3680605f4b62ab31e3039d6c4fe6`](https://gummble.com/screens/sc_d76d3680605f4b62ab31e3039d6c4fe6?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 발행 글과 반응 있는 프로필 | 내 프로필 Lists — 소유자가 비공개 목록을 봄 |
| 04 | [`sc_64afef71457f48808c33def66fd6d90e`](https://gummble.com/screens/sc_64afef71457f48808c33def66fd6d90e?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 내 프로필 Lists | 내 소개 빈 상태 — 소개 미작성 |
| 05 | [`sc_d55f02281f894078a734269d60de79c4`](https://gummble.com/screens/sc_d55f02281f894078a734269d60de79c4?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 내 소개 빈 상태 | 프로필 소개·사진·대명사 표시 — 프로필 정보 반영 |
| 06 | [`sc_3cd0855e78a84d4ea413f0e5b3dffb73`](https://gummble.com/screens/sc_3cd0855e78a84d4ea413f0e5b3dffb73?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 프로필 소개·사진·대명사 표시 | 이 흐름의 기록 종료; 2절의 종료 범위 참조 |

## 4. 화면별 상세 분석

### 단계 01 — For you 홈 피드

- Screen ID: `sc_5e0ba0e498ff49579bf838096aec4b5e`
- 원본: [화면 페이지](https://gummble.com/screens/sc_5e0ba0e498ff49579bf838096aec4b5e?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/33b28771-e947-4feb-9868-73bc4a3b1941.png)
- 로컬 이미지: [sc_5e0ba0e498ff49579bf838096aec4b5e.png](<../../screens/sc_5e0ba0e498ff49579bf838096aec4b5e.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `플로우 시작` → 현재 → `sc_1bd141b757934a88b4a003855e1794cc`

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

### 단계 02 — 내 프로필 빈 Stories

- Screen ID: `sc_1bd141b757934a88b4a003855e1794cc`
- 원본: [화면 페이지](https://gummble.com/screens/sc_1bd141b757934a88b4a003855e1794cc?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/c0863491-e2ab-4355-a664-3a63d4697dad.png)
- 로컬 이미지: [sc_1bd141b757934a88b4a003855e1794cc.png](<../../screens/sc_1bd141b757934a88b4a003855e1794cc.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_5e0ba0e498ff49579bf838096aec4b5e` → 현재 → `sc_d76d3680605f4b62ab31e3039d6c4fe6`

#### 화면에서 직접 확인한 내용

- 레이아웃: 프로필·통계·편집·탭·Public 필터·빈 안내
- 입력 항목·기본값·표시 데이터: Alex Smith, 0 followers·1 following
- 버튼·메뉴·안내 문구: View stats, Edit your profile, Get started, 설정
- 확인된 상태: 발행 글 없음
- R2 보완 관찰·해석: Stories의 Public 필터가 표시된다. 필터 선택지 전체·초안·Unlisted 목록은 수록되지 않아 프로필에 나타난 글 수를 계정 전체 글 수로 보지 않는다.
- 단계 간 변화: For you 홈 피드 → 내 프로필 빈 Stories. 현재 관찰값: Alex Smith, 0 followers·1 following. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 프로필 공개 글과 개인 초안 구분. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 미발행 초안 포함 여부

#### 모델링 영향

- 후보와 근거: 프로필 공개 글과 개인 초안 구분. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 미발행 초안 포함 여부. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 03 — 발행 글과 반응 있는 프로필

- Screen ID: `sc_d76d3680605f4b62ab31e3039d6c4fe6`
- 원본: [화면 페이지](https://gummble.com/screens/sc_d76d3680605f4b62ab31e3039d6c4fe6?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/0c744b5a-cc2d-4b6b-9221-eb4f52eb4825.png)
- 로컬 이미지: [sc_d76d3680605f4b62ab31e3039d6c4fe6.png](<../../screens/sc_d76d3680605f4b62ab31e3039d6c4fe6.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_1bd141b757934a88b4a003855e1794cc` → 현재 → `sc_64afef71457f48808c33def66fd6d90e`

#### 화면에서 직접 확인한 내용

- 레이아웃: Stories Public에 기사 카드
- 입력 항목·기본값·표시 데이터: 23h ago, 박수29·응답1
- 버튼·메뉴·안내 문구: View stats, 편집, 글 더보기
- 확인된 상태: 발행 후 반응 집계
- 단계 간 변화: 내 프로필 빈 Stories → 발행 글과 반응 있는 프로필. 현재 관찰값: 23h ago, 박수29·응답1. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 작성자 기사 목록과 반응 요약. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 조회 시점·집계 지연

#### 모델링 영향

- 후보와 근거: 작성자 기사 목록과 반응 요약. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 조회 시점·집계 지연. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 04 — 내 프로필 Lists

- Screen ID: `sc_64afef71457f48808c33def66fd6d90e`
- 원본: [화면 페이지](https://gummble.com/screens/sc_64afef71457f48808c33def66fd6d90e?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/df34055e-e058-4ae8-aaa3-dd2fa71d4697.png)
- 로컬 이미지: [sc_64afef71457f48808c33def66fd6d90e.png](<../../screens/sc_64afef71457f48808c33def66fd6d90e.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_d76d3680605f4b62ab31e3039d6c4fe6` → 현재 → `sc_d55f02281f894078a734269d60de79c4`

#### 화면에서 직접 확인한 내용

- 레이아웃: Lists 탭의 기본 Reading list
- 입력 항목·기본값·표시 데이터: 4 stories·자물쇠
- 버튼·메뉴·안내 문구: 다운로드, 더보기
- 확인된 상태: 소유자가 비공개 목록을 봄
- 단계 간 변화: 발행 글과 반응 있는 프로필 → 내 프로필 Lists. 현재 관찰값: 4 stories·자물쇠. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 프로필 보기 주체별 리스트 가시성. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 타인 프로필에서 비공개 숨김 여부

#### 모델링 영향

- 후보와 근거: 프로필 보기 주체별 리스트 가시성. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 타인 프로필에서 비공개 숨김 여부. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 05 — 내 소개 빈 상태

- Screen ID: `sc_d55f02281f894078a734269d60de79c4`
- 원본: [화면 페이지](https://gummble.com/screens/sc_d55f02281f894078a734269d60de79c4?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/eb530182-05ab-4420-ad23-acc8c889ebde.png)
- 로컬 이미지: [sc_d55f02281f894078a734269d60de79c4.png](<../../screens/sc_d55f02281f894078a734269d60de79c4.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_64afef71457f48808c33def66fd6d90e` → 현재 → `sc_3cd0855e78a84d4ea413f0e5b3dffb73`

#### 화면에서 직접 확인한 내용

- 레이아웃: About 탭에 빈 안내·회원 기간
- 입력 항목·기본값·표시 데이터: Medium member since June 2025
- 버튼·메뉴·안내 문구: Add a short bio
- 확인된 상태: 소개 미작성
- 단계 간 변화: 내 프로필 Lists → 내 소개 빈 상태. 현재 관찰값: Medium member since June 2025. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 선택 프로필 소개. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: Add a short bio의 실제 이동 대상·소개 저장 실패는 미수록. 짧은 소개 160자 표시는 편집 화면 및 공식 문서에서 확인했다.

#### 모델링 영향

- 후보와 근거: 선택 프로필 소개. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: Add a short bio의 실제 이동 대상·소개 저장 실패는 미수록. 짧은 소개 160자 표시는 편집 화면 및 공식 문서에서 확인했다. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 06 — 프로필 소개·사진·대명사 표시

- Screen ID: `sc_3cd0855e78a84d4ea413f0e5b3dffb73`
- 원본: [화면 페이지](https://gummble.com/screens/sc_3cd0855e78a84d4ea413f0e5b3dffb73?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/0ff45dc3-5d29-499b-928f-11aea3936371.png)
- 로컬 이미지: [sc_3cd0855e78a84d4ea413f0e5b3dffb73.png](<../../screens/sc_3cd0855e78a84d4ea413f0e5b3dffb73.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_d55f02281f894078a734269d60de79c4` → 현재 → `플로우 기록 종료`

#### 화면에서 직접 확인한 내용

- 레이아웃: 프로필 아바타·이름 옆 he/him·About 본문
- 입력 항목·기본값·표시 데이터: Curious mind sharing thoughts one story at a time
- 버튼·메뉴·안내 문구: View stats, Edit your profile, 설정
- 확인된 상태: 프로필 정보 반영
- 단계 간 변화: 내 소개 빈 상태 → 프로필 소개·사진·대명사 표시. 현재 관찰값: Curious mind sharing thoughts one story at a time. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 사진·소개·대명사 별도 필드. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 대명사 다른 화면 노출·사진 처리

#### 모델링 영향

- 후보와 근거: 사진·소개·대명사 별도 필드. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 대명사 다른 화면 노출·사진 처리. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

## 5. 업무 규칙과 데이터 변화

발행 과정은 Home 아래 Publishing a story, 사진·소개·대명사 입력은 Profile 아래 편집 흐름에 있다. 부모 캡처 사이의 데이터 변화 원인을 임의로 채우지 않는다.

| 단계 | 관찰된 상태·값 | 근거의 한계 |
| --- | --- | --- |
| 01 | 추천 기사 목록 — For you 활성. 작가·제목·요약·썸네일·날짜·박수·응답 수 표시 | 추천 알고리즘·개인화 저장·카드 전체 클릭 영역 |
| 02 | 발행 글 없음 — Alex Smith, 0 followers·1 following | 미발행 초안 포함 여부 |
| 03 | 발행 후 반응 집계 — 23h ago, 박수29·응답1 | 조회 시점·집계 지연 |
| 04 | 소유자가 비공개 목록을 봄 — 4 stories·자물쇠 | 타인 프로필에서 비공개 숨김 여부 |
| 05 | 소개 미작성 — Medium member since June 2025 | Add a short bio의 실제 이동 대상·소개 저장 실패는 미수록. 짧은 소개 160자 표시는 편집 화면 및 공식 문서에서 확인했다. |
| 06 | 프로필 정보 반영 — Curious mind sharing thoughts one story at a time | 대명사 다른 화면 노출·사진 처리 |

위 표는 보이는 상태 변화다. 성공 토스트가 있어도 외부 계정의 가시성·영수증·서버 저장을 독립 검증한 것은 아니다.

## 6. 공식 도움말과 API 대조

공식 자료는 현재 문서이며 과거 캡처와 시점이 다를 수 있다. 아래 기능 설명의 범위만 대조했으며 내부 API나 제품 전체 규칙을 확인한 것은 아니다.

- [Your profile page](https://help.medium.com/hc/en-us/articles/115004747067-Your-profile-page): 앱에서 이름·사진·160자 소개를 수정한다. 더 긴 About 편집은 웹에서 제공한다. [공통 문서 대조](<../../SOURCES.md#profile>).

화면에서 관찰한 값·메뉴와 문서에 없는 세부 상태는 구분한다. 미수록 오류·권한·실패 분기는 아래 질문으로 남긴다.

- [API 검토](<../../SOURCES.md#api>). 이 흐름의 내부 endpoint·요청·응답·DB 스키마는 확인하지 않았다.

## 7. 데이터 모델링 시사점

다음은 관찰에 기반한 구현 후보다. Kostolany의 기능 채택·스키마·업무 정책으로 확정하지 않는다.

- 단계 01: 피드 항목·기사·작성자·집계 및 사용자 추천 피드백 분리
- 단계 02: 프로필 공개 글과 개인 초안 구분
- 단계 03: 작성자 기사 목록과 반응 요약
- 단계 04: 프로필 보기 주체별 리스트 가시성
- 단계 05: 선택 프로필 소개
- 단계 06: 사진·소개·대명사 별도 필드

## 8. 미확인 사항과 검토 질문

**원본에 없는 분기·남은 범위:** Public 필터 옵션·게시 글 메뉴·타인 시점·소개 편집 진입·조회 실패.

- 단계 01: 추천 알고리즘·개인화 저장·카드 전체 클릭 영역
- 단계 02: 미발행 초안 포함 여부
- 단계 03: 조회 시점·집계 지연
- 단계 04: 타인 프로필에서 비공개 숨김 여부
- 단계 05: Add a short bio의 실제 이동 대상·소개 저장 실패는 미수록. 짧은 소개 160자 표시는 편집 화면 및 공식 문서에서 확인했다.
- 단계 06: 대명사 다른 화면 노출·사진 처리
- 같은 계정·같은 빌드에서 시작 상태를 맞춘 뒤 정상·취소·실패·재진입 결과를 검증해야 한다.

## 9. 검토 이력

| 차수 | 날짜 | 확인·작성 내용 | 남은 범위 |
| --- | --- | --- | --- |
| R1 | 2026-11-18 KST | MCP 6단계와 실제 이미지 6단계 대조. 원본·로컬 파일 연결, 관찰·문서·가정 분리 | 실제 계정 재현·미수록 상태·8절 항목 |
| R2 | 2026-11-18 KST | MCP 6단계 순서 재조회 및 이미지 재검토. 3개 단계의 관찰·표현 보완. 진입·종료·미수록 분기·관련 흐름 및 공식 규칙 대조 추가 | 원본에 없는 8절 분기·실제 계정 동작 |
| 문서 점검 | 2026-11-18 KST | 전체 63개 문서의 단계 순서·이미지 ID·로컬 링크·필수 절 구조를 검증 스크립트로 점검 | 이미지 2차 검토로 계산하지 않음 |
