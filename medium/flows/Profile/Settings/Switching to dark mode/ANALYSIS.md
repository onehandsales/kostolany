# Switching to dark mode 플로우 분석

검토 상태: **R2 누락·내용 재검토 완료(정적 캡처 범위)**. 실제 이미지 재확인 **8/8단계**. 계정 재현은 수행하지 않았다.

관찰은 Gummble 캡처에서 직접 본 내용, 문서 확인은 현재 공식 도움말, 설계 가정은 우리 구현 후보를 뜻한다. 버튼의 존재·성공 안내·실제 서버 결과를 구분한다.

## 1. 출처와 검토 상태

| 항목 | 기록 |
| --- | --- |
| 앱 | Medium iOS · `medium-ios` · `4674239e-d24a-4ef4-aed5-9682429edd48` |
| Flow ID | `3a9d9708-2acd-4164-b01b-551c24202650` |
| 원본 | [Gummble flow](https://gummble.com/apps/medium-ios?tab=flows&flow=3a9d9708-2acd-4164-b01b-551c24202650) |
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

설정에서 Dark 선택 후 Home·Explore·Library·하이라이트·리스트·프로필까지 적용을 확인한다.

여러 화면의 테마는 확인했으나 OS 자동 전환·재실행 유지·동기화는 확인하지 않았다.

- 상위 흐름: [Settings](<../ANALYSIS.md>)
- 하위 흐름: 없음.
- 폴더 위치: `medium/flows/Profile/Settings/Switching to dark mode`
- 부모·자식은 Gummble 탐색 분류다. 모든 자식 흐름이 반드시 실행되는 순차 단계나 런타임 화면 트리를 뜻하지 않는다.

### 진입 조건과 확인된 종료 범위

- 진입: Settings의 System default에서 시작한다.
- 종료: Dark 선택 뒤 Home·Explore·Library·Highlighted·리스트·Profile이 어두워진다.
- 관련 흐름: [Changing display](<../../../Home/Story detail/Changing display/ANALYSIS.md>)
- 관련 흐름 링크는 기능의 연결점이다. 서로 다른 캡처를 같은 계정·같은 시각의 연속 실행으로 합치지 않는다.

## 3. 전체 단계표

MCP가 반환한 순서다. 스크롤·메뉴·입력·로딩도 각각 한 단계이며 캡처 사이의 클릭·저장·네트워크가 모두 기록되었다는 뜻은 아니다.

| 단계 | Screen ID와 원본 | 확인된 화면 | 다음 캡처와의 관계 |
| --- | --- | --- | --- |
| 01 | [`sc_ddd51660cb8346a1b200ed970a2d5c45`](https://gummble.com/screens/sc_ddd51660cb8346a1b200ed970a2d5c45?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 설정 상단 | 앱 다크 테마 설정 — 앱 설정 다크 적용 |
| 02 | [`sc_9b1044709d764fe682a5e95603fd5c56`](https://gummble.com/screens/sc_9b1044709d764fe682a5e95603fd5c56?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 앱 다크 테마 설정 | 다크 홈 피드 — 홈에도 테마 적용 |
| 03 | [`sc_77bbb7d671f14c6db68071c5921f22fa`](https://gummble.com/screens/sc_77bbb7d671f14c6db68071c5921f22fa?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 다크 홈 피드 | 다크 Explore — 탐색 화면 테마 적용 |
| 04 | [`sc_eaaa223bd5c84facb010485d0f797e76`](https://gummble.com/screens/sc_eaaa223bd5c84facb010485d0f797e76?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 다크 Explore | 다크 Library — 라이브러리 테마 적용 |
| 05 | [`sc_4a39ee1d768342a9823787c11c851479`](https://gummble.com/screens/sc_4a39ee1d768342a9823787c11c851479?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 다크 Library | 다크 하이라이트 목록 — 하이라이트 대비 변경 |
| 06 | [`sc_97fb65c906bf4e309ec595d2067e4bce`](https://gummble.com/screens/sc_97fb65c906bf4e309ec595d2067e4bce?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 다크 하이라이트 목록 | 다크 읽기 목록 상세 — 읽은 기사 표시와 다크 테마 |
| 07 | [`sc_45fd4ac6da2148968fab1446df649f7f`](https://gummble.com/screens/sc_45fd4ac6da2148968fab1446df649f7f?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 다크 읽기 목록 상세 | 다크 내 프로필 — 프로필 테마 적용 |
| 08 | [`sc_c31a2100ddcd41cba45b5081c69b78b5`](https://gummble.com/screens/sc_c31a2100ddcd41cba45b5081c69b78b5?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 다크 내 프로필 | 이 흐름의 기록 종료; 2절의 종료 범위 참조 |

## 4. 화면별 상세 분석

### 단계 01 — 설정 상단

- Screen ID: `sc_ddd51660cb8346a1b200ed970a2d5c45`
- 원본: [화면 페이지](https://gummble.com/screens/sc_ddd51660cb8346a1b200ed970a2d5c45?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/142bda9b-2006-415b-bd69-9070968ce9a0.png)
- 로컬 이미지: [sc_ddd51660cb8346a1b200ed970a2d5c45.png](<../../../../screens/sc_ddd51660cb8346a1b200ed970a2d5c45.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `플로우 시작` → 현재 → `sc_9b1044709d764fe682a5e95603fd5c56`

#### 화면에서 직접 확인한 내용

- 레이아웃: Account·Configure Medium 섹션
- 입력 항목·기본값·표시 데이터: Appearance System default 선택
- 버튼·메뉴·안내 문구: 계정·결제·통계·프로필·추천·Push·Email·Custom app icon
- 확인된 상태: 주요 설정 진입점
- 단계 간 변화: 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 설정 범주별 책임 분리. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 각 계정·결제 하위 화면 미수록

#### 모델링 영향

- 후보와 근거: 설정 범주별 책임 분리. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 각 계정·결제 하위 화면 미수록. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 02 — 앱 다크 테마 설정

- Screen ID: `sc_9b1044709d764fe682a5e95603fd5c56`
- 원본: [화면 페이지](https://gummble.com/screens/sc_9b1044709d764fe682a5e95603fd5c56?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/c63fcf8c-76d6-4ac5-9e1b-c76e90483484.png)
- 로컬 이미지: [sc_9b1044709d764fe682a5e95603fd5c56.png](<../../../../screens/sc_9b1044709d764fe682a5e95603fd5c56.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_ddd51660cb8346a1b200ed970a2d5c45` → 현재 → `sc_77bbb7d671f14c6db68071c5921f22fa`

#### 화면에서 직접 확인한 내용

- 레이아웃: 설정 전체 검정 배경
- 입력 항목·기본값·표시 데이터: Appearance Dark 선택
- 버튼·메뉴·안내 문구: System default, Light, Dark
- 확인된 상태: 앱 설정 다크 적용
- 단계 간 변화: 설정 상단 → 앱 다크 테마 설정. 현재 관찰값: Appearance Dark 선택. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 전역 테마와 읽기 설정의 관계 검증. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 기사 표시 설정과 같은 저장값인지

#### 모델링 영향

- 후보와 근거: 전역 테마와 읽기 설정의 관계 검증. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 기사 표시 설정과 같은 저장값인지. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 03 — 다크 홈 피드

- Screen ID: `sc_77bbb7d671f14c6db68071c5921f22fa`
- 원본: [화면 페이지](https://gummble.com/screens/sc_77bbb7d671f14c6db68071c5921f22fa?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/7514be4f-3e87-404e-b512-fa3915872d69.png)
- 로컬 이미지: [sc_77bbb7d671f14c6db68071c5921f22fa.png](<../../../../screens/sc_77bbb7d671f14c6db68071c5921f22fa.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_9b1044709d764fe682a5e95603fd5c56` → 현재 → `sc_eaaa223bd5c84facb010485d0f797e76`

#### 화면에서 직접 확인한 내용

- 레이아웃: 검정 배경·밝은 카드 텍스트·녹색 작성 버튼
- 입력 항목·기본값·표시 데이터: For you 활성
- 버튼·메뉴·안내 문구: 홈 탭·알림·작성·기사 더보기
- 확인된 상태: 홈에도 테마 적용
- R2 보완 관찰·해석: For you 카드의 원형 − 아이콘이 다크 화면에서도 보인다. 테마 변경은 이 컨트롤을 북마크로 바꾸지 않으며 다른 날짜의 기사 노출과 분리해 비교한다.
- 단계 간 변화: 앱 다크 테마 설정 → 다크 홈 피드. 현재 관찰값: For you 활성. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 공통 컴포넌트 테마. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 다른 콘텐츠는 테마 변경의 결과로 단정 불가

#### 모델링 영향

- 후보와 근거: 공통 컴포넌트 테마. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 다른 콘텐츠는 테마 변경의 결과로 단정 불가. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 04 — 다크 Explore

- Screen ID: `sc_eaaa223bd5c84facb010485d0f797e76`
- 원본: [화면 페이지](https://gummble.com/screens/sc_eaaa223bd5c84facb010485d0f797e76?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/994c0f08-aecd-40f5-84ce-def40bc3a6cd.png)
- 로컬 이미지: [sc_eaaa223bd5c84facb010485d0f797e76.png](<../../../../screens/sc_eaaa223bd5c84facb010485d0f797e76.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_77bbb7d671f14c6db68071c5921f22fa` → 현재 → `sc_4a39ee1d768342a9823787c11c851479`

#### 화면에서 직접 확인한 내용

- 레이아웃: 검색창·칩·Trending 모두 어두운 배경
- 입력 항목·기본값·표시 데이터: 검색 빈값
- 버튼·메뉴·안내 문구: 검색·토픽·기사
- 확인된 상태: 탐색 화면 테마 적용
- 단계 간 변화: 다크 홈 피드 → 다크 Explore. 현재 관찰값: 검색 빈값. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 검색·발견 컴포넌트 테마. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 대비·OS 접근성 검증 미수행

#### 모델링 영향

- 후보와 근거: 검색·발견 컴포넌트 테마. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 대비·OS 접근성 검증 미수행. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 05 — 다크 Library

- Screen ID: `sc_4a39ee1d768342a9823787c11c851479`
- 원본: [화면 페이지](https://gummble.com/screens/sc_4a39ee1d768342a9823787c11c851479?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/9449082a-88cf-449a-bdbe-9efb3e0c74c9.png)
- 로컬 이미지: [sc_4a39ee1d768342a9823787c11c851479.png](<../../../../screens/sc_4a39ee1d768342a9823787c11c851479.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_eaaa223bd5c84facb010485d0f797e76` → 현재 → `sc_97fb65c906bf4e309ec595d2067e4bce`

#### 화면에서 직접 확인한 내용

- 레이아웃: 어두운 리스트 카드·썸네일 유지
- 입력 항목·기본값·표시 데이터: Reading list4 stories·자물쇠
- 버튼·메뉴·안내 문구: New list, 다운로드, 더보기
- 확인된 상태: 라이브러리 테마 적용
- 단계 간 변화: 다크 Explore → 다크 Library. 현재 관찰값: Reading list4 stories·자물쇠. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 리스트 UI와 원본 이미지 표현. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 이미지 밝기 정책

#### 모델링 영향

- 후보와 근거: 리스트 UI와 원본 이미지 표현. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 이미지 밝기 정책. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 06 — 다크 하이라이트 목록

- Screen ID: `sc_97fb65c906bf4e309ec595d2067e4bce`
- 원본: [화면 페이지](https://gummble.com/screens/sc_97fb65c906bf4e309ec595d2067e4bce?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/bc3d5f35-28f0-4eb6-921c-ca0805cd6485.png)
- 로컬 이미지: [sc_97fb65c906bf4e309ec595d2067e4bce.png](<../../../../screens/sc_97fb65c906bf4e309ec595d2067e4bce.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_4a39ee1d768342a9823787c11c851479` → 현재 → `sc_45fd4ac6da2148968fab1446df649f7f`

#### 화면에서 직접 확인한 내용

- 레이아웃: 어두운 녹색 강조·밝은 본문
- 입력 항목·기본값·표시 데이터: Highlighted 활성
- 버튼·메뉴·안내 문구: 강조 항목
- 확인된 상태: 하이라이트 대비 변경
- 단계 간 변화: 다크 Library → 다크 하이라이트 목록. 현재 관찰값: Highlighted 활성. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 강조 색상 토큰. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 색약·명암 대비 수치 미검증

#### 모델링 영향

- 후보와 근거: 강조 색상 토큰. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 색약·명암 대비 수치 미검증. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 07 — 다크 읽기 목록 상세

- Screen ID: `sc_45fd4ac6da2148968fab1446df649f7f`
- 원본: [화면 페이지](https://gummble.com/screens/sc_45fd4ac6da2148968fab1446df649f7f?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/619d96b5-134d-47d3-bfed-59239eeb2a24.png)
- 로컬 이미지: [sc_45fd4ac6da2148968fab1446df649f7f.png](<../../../../screens/sc_45fd4ac6da2148968fab1446df649f7f.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_97fb65c906bf4e309ec595d2067e4bce` → 현재 → `sc_c31a2100ddcd41cba45b5081c69b78b5`

#### 화면에서 직접 확인한 내용

- 레이아웃: 제목·메모·기사 카드 어두운 테마
- 입력 항목·기본값·표시 데이터: 4 stories·자물쇠, 한 기사 Viewed 표시
- 버튼·메뉴·안내 문구: 메모·다운로드·더보기
- 확인된 상태: 읽은 기사 표시와 다크 테마
- R2 보완 관찰·해석: 한 글은 제목이 연해지고 메타데이터에 Viewed가 나타난다. 북마크 채움·다운로드 아이콘과 별개 표시이며 읽음 판정 시간·집계 기준은 화면으로 알 수 없다.
- 단계 간 변화: 다크 하이라이트 목록 → 다크 읽기 목록 상세. 현재 관찰값: 4 stories·자물쇠, 한 기사 Viewed 표시. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 읽음·저장·다운로드 상태 독립. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: Viewed 조건·다운로드 상태와 구분

#### 모델링 영향

- 후보와 근거: 읽음·저장·다운로드 상태 독립. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: Viewed 조건·다운로드 상태와 구분. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 08 — 다크 내 프로필

- Screen ID: `sc_c31a2100ddcd41cba45b5081c69b78b5`
- 원본: [화면 페이지](https://gummble.com/screens/sc_c31a2100ddcd41cba45b5081c69b78b5?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/abe2a260-979e-42f6-9933-efb35fd0359f.png)
- 로컬 이미지: [sc_c31a2100ddcd41cba45b5081c69b78b5.png](<../../../../screens/sc_c31a2100ddcd41cba45b5081c69b78b5.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_45fd4ac6da2148968fab1446df649f7f` → 현재 → `플로우 기록 종료`

#### 화면에서 직접 확인한 내용

- 레이아웃: 프로필 탭·기사 카드·버튼 색상 변경
- 입력 항목·기본값·표시 데이터: he/him·Public·기존 글
- 버튼·메뉴·안내 문구: View stats, 편집, 설정
- 확인된 상태: 프로필 테마 적용
- 단계 간 변화: 다크 읽기 목록 상세 → 다크 내 프로필. 현재 관찰값: he/him·Public·기존 글. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 전역 테마의 화면 간 일관성. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 앱 재시작·다른 기기 적용

#### 모델링 영향

- 후보와 근거: 전역 테마의 화면 간 일관성. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 앱 재시작·다른 기기 적용. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

## 5. 업무 규칙과 데이터 변화

여러 화면의 테마는 확인했으나 OS 자동 전환·재실행 유지·동기화는 확인하지 않았다.

| 단계 | 관찰된 상태·값 | 근거의 한계 |
| --- | --- | --- |
| 01 | 주요 설정 진입점 — Appearance System default 선택 | 각 계정·결제 하위 화면 미수록 |
| 02 | 앱 설정 다크 적용 — Appearance Dark 선택 | 기사 표시 설정과 같은 저장값인지 |
| 03 | 홈에도 테마 적용 — For you 활성 | 다른 콘텐츠는 테마 변경의 결과로 단정 불가 |
| 04 | 탐색 화면 테마 적용 — 검색 빈값 | 대비·OS 접근성 검증 미수행 |
| 05 | 라이브러리 테마 적용 — Reading list4 stories·자물쇠 | 이미지 밝기 정책 |
| 06 | 하이라이트 대비 변경 — Highlighted 활성 | 색약·명암 대비 수치 미검증 |
| 07 | 읽은 기사 표시와 다크 테마 — 4 stories·자물쇠, 한 기사 Viewed 표시 | Viewed 조건·다운로드 상태와 구분 |
| 08 | 프로필 테마 적용 — he/him·Public·기존 글 | 앱 재시작·다른 기기 적용 |

위 표는 보이는 상태 변화다. 성공 토스트가 있어도 외부 계정의 가시성·영수증·서버 저장을 독립 검증한 것은 아니다.

## 6. 공식 도움말과 API 대조

공식 자료는 현재 문서이며 과거 캡처와 시점이 다를 수 있다. 아래 기능 설명의 범위만 대조했으며 내부 API나 제품 전체 규칙을 확인한 것은 아니다.

- [About highlights](https://help.medium.com/hc/en-us/articles/214406358-About-highlights): 강조 구절은 작성자·팔로워에게 보일 수 있다. 구절 인용 응답과 타인 하이라이트 숨김을 설명한다. [공통 문서 대조](<../../../../SOURCES.md#highlights>).

공식 하이라이트 문서는 읽기 표시의 일부만 설명한다. 전역 테마 전환 자체는 캡처 근거이며 재시작·OS 연동의 공식 계약은 확인하지 못했다.

- [API 검토](<../../../../SOURCES.md#api>). 이 흐름의 내부 endpoint·요청·응답·DB 스키마는 확인하지 않았다.

## 7. 데이터 모델링 시사점

다음은 관찰에 기반한 구현 후보다. Kostolany의 기능 채택·스키마·업무 정책으로 확정하지 않는다.

- 단계 01: 설정 범주별 책임 분리
- 단계 02: 전역 테마와 읽기 설정의 관계 검증
- 단계 03: 공통 컴포넌트 테마
- 단계 04: 검색·발견 컴포넌트 테마
- 단계 05: 리스트 UI와 원본 이미지 표현
- 단계 06: 강조 색상 토큰
- 단계 07: 읽음·저장·다운로드 상태 독립
- 단계 08: 전역 테마의 화면 간 일관성

## 8. 미확인 사항과 검토 질문

**원본에 없는 분기·남은 범위:** Light 복귀·System 연동·재시작·다른 기기·OS 접근성·기사 설정과 동기화.

- 단계 01: 각 계정·결제 하위 화면 미수록
- 단계 02: 기사 표시 설정과 같은 저장값인지
- 단계 03: 다른 콘텐츠는 테마 변경의 결과로 단정 불가
- 단계 04: 대비·OS 접근성 검증 미수행
- 단계 05: 이미지 밝기 정책
- 단계 06: 색약·명암 대비 수치 미검증
- 단계 07: Viewed 조건·다운로드 상태와 구분
- 단계 08: 앱 재시작·다른 기기 적용
- 같은 계정·같은 빌드에서 시작 상태를 맞춘 뒤 정상·취소·실패·재진입 결과를 검증해야 한다.

## 9. 검토 이력

| 차수 | 날짜 | 확인·작성 내용 | 남은 범위 |
| --- | --- | --- | --- |
| R1 | 2026-11-18 KST | MCP 8단계와 실제 이미지 8단계 대조. 원본·로컬 파일 연결, 관찰·문서·가정 분리 | 실제 계정 재현·미수록 상태·8절 항목 |
| R2 | 2026-11-18 KST | MCP 8단계 순서 재조회 및 이미지 재검토. 2개 단계의 관찰·표현 보완. 진입·종료·미수록 분기·관련 흐름 및 공식 규칙 대조 추가 | 원본에 없는 8절 분기·실제 계정 동작 |
| 문서 점검 | 2026-11-18 KST | 전체 63개 문서의 단계 순서·이미지 ID·로컬 링크·필수 절 구조를 검증 스크립트로 점검 | 이미지 2차 검토로 계산하지 않음 |
