# Publishing a story 플로우 분석

검토 상태: **R2 누락·내용 재검토 완료(정적 캡처 범위)**. 실제 이미지 재확인 **11/11단계**. 계정 재현은 수행하지 않았다.

관찰은 Gummble 캡처에서 직접 본 내용, 문서 확인은 현재 공식 도움말, 설계 가정은 우리 구현 후보를 뜻한다. 버튼의 존재·성공 안내·실제 서버 결과를 구분한다.

## 1. 출처와 검토 상태

| 항목 | 기록 |
| --- | --- |
| 앱 | Medium iOS · `medium-ios` · `4674239e-d24a-4ef4-aed5-9682429edd48` |
| Flow ID | `b5e303bd-a11f-4f6a-8864-03fc45c1c380` |
| 원본 | [Gummble flow](https://gummble.com/apps/medium-ios?tab=flows&flow=b5e303bd-a11f-4f6a-8864-03fc45c1c380) |
| 카탈로그 버전 | MCP 조회 `Latest`, version ID `1419` |
| 제품 빌드 | 개별 화면의 제품 빌드 미확인. 카탈로그 버전을 제품 버전으로 사용하지 않음 |
| 조회일 / 이미지 검토일 | 2026-11-18 KST. 개별 분·초는 기록하지 않음 |
| 캡처일 | 미확인. 기사·알림·통계에 표시된 날짜는 캡처일이 아님 |
| 화면 수 / 이미지 확인 | 11단계 / 11단계. 공통 이미지는 다른 흐름과 동일 관찰 기록을 재사용 |
| 이미지 검토 방식 | R1: MCP 이미지 또는 로컬 원본. R2: 원본 PNG를 390×844로 축소한 번호 포함 비교 시트. 공통 이미지는 고유 이미지 기준 재검토 후 각 흐름에서 대조 |
| 크기·환경 | MCP 크기와 실제 PNG 픽셀 크기를 단계별 구분. 기기 모델·OS·DPR·배율·국가·계정 권한은 별도 확인 없으면 미확인 |
| 계정 재현 | 미수행. 로그인·발행·구매·신고·삭제·외부 공유를 실행하지 않음 |
| 공식 문서 | 2026-11-18 조회. 6절에 직접 대조 범위와 미확인 범위를 기록 |

## 2. 플로우 목적과 연결

글 입력, 이미지 소스·Unsplash 선택, 삽입 처리, 공개 미리보기·토픽·Unlisted 설정, 프로필 발행 결과를 확인한다.

토픽 선택 중간 과정은 자식 흐름에 있다. 공개 목록에 글이 보이는 결과와 실제 외부 URL 접근 검증을 구분한다.

- 상위 흐름: [Home](<../ANALYSIS.md>)
- 하위 흐름: [Changing text format](<Changing text format/ANALYSIS.md>) · [Mentioning a user](<Mentioning a user/ANALYSIS.md>) · [Drafts](<Drafts/ANALYSIS.md>) · [Adding topics](<Adding topics/ANALYSIS.md>)
- 폴더 위치: `medium/flows/Home/Publishing a story`
- 부모·자식은 Gummble 탐색 분류다. 모든 자식 흐름이 반드시 실행되는 순차 단계나 런타임 화면 트리를 뜻하지 않는다.

### 진입 조건과 확인된 종료 범위

- 진입: Home 작성 버튼과 빈 편집기가 연결된다.
- 종료: 제목·본문·이미지·토픽을 설정한 뒤 프로필 Public 목록에 새 글이 표시된다.
- 관련 흐름: [Profile](<../../Profile/ANALYSIS.md>) · [Adding topics](<Adding topics/ANALYSIS.md>) · [Drafts](<Drafts/ANALYSIS.md>)
- 관련 흐름 링크는 기능의 연결점이다. 서로 다른 캡처를 같은 계정·같은 시각의 연속 실행으로 합치지 않는다.

## 3. 전체 단계표

MCP가 반환한 순서다. 스크롤·메뉴·입력·로딩도 각각 한 단계이며 캡처 사이의 클릭·저장·네트워크가 모두 기록되었다는 뜻은 아니다.

| 단계 | Screen ID와 원본 | 확인된 화면 | 다음 캡처와의 관계 |
| --- | --- | --- | --- |
| 01 | [`sc_5e0ba0e498ff49579bf838096aec4b5e`](https://gummble.com/screens/sc_5e0ba0e498ff49579bf838096aec4b5e?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | For you 홈 피드 | 빈 기사 편집기 — 작성 시작·키보드 활성 |
| 02 | [`sc_397cb0f05ba54659adac7376f29512dd`](https://gummble.com/screens/sc_397cb0f05ba54659adac7376f29512dd?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 빈 기사 편집기 | 제목과 본문 입력 — 본문 끝 커서 |
| 03 | [`sc_4db886af7d024100a72b9e02fa3c1ee8`](https://gummble.com/screens/sc_4db886af7d024100a72b9e02fa3c1ee8?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 제목과 본문 입력 | 이미지 추가 방식 선택 — 이미지 소스 선택 |
| 04 | [`sc_c609f8fa87b84b76bea6f312df2e3e0f`](https://gummble.com/screens/sc_c609f8fa87b84b76bea6f312df2e3e0f?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 이미지 추가 방식 선택 | Unsplash 사진 선택 — 외부 사진 탐색 시트 |
| 05 | [`sc_785431954ec4405eb0a3b22debce165a`](https://gummble.com/screens/sc_785431954ec4405eb0a3b22debce165a?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | Unsplash 사진 선택 | 본문 이미지 로딩 — 이미지 삽입 처리 중 |
| 06 | [`sc_ae30c2a2ca504522b03f98f11d59c429`](https://gummble.com/screens/sc_ae30c2a2ca504522b03f98f11d59c429?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 본문 이미지 로딩 | 이미지 삽입 후 편집기 — 이미지 로딩 표시 사라짐 |
| 07 | [`sc_bed3857c8edc4a02b07af1e095ad7fba`](https://gummble.com/screens/sc_bed3857c8edc4a02b07af1e095ad7fba?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 이미지 삽입 후 편집기 | 발행 전 Story preview — 공개 전 설정 |
| 08 | [`sc_1ceed9061b86476ebc7eb5acb9dd89c7`](https://gummble.com/screens/sc_1ceed9061b86476ebc7eb5acb9dd89c7?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 발행 전 Story preview | 토픽 지정된 발행 미리보기 — 토픽 선택 반영 |
| 09 | [`sc_c3bdb30e524c4709ae45998ec529a6c0`](https://gummble.com/screens/sc_c3bdb30e524c4709ae45998ec529a6c0?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 토픽 지정된 발행 미리보기 | Unlisted 공개 범위 안내 — 링크 소지자 접근·공개 목록 제외라는 안내 |
| 10 | [`sc_39fb71a1ee0d43f09bab33c7ef775259`](https://gummble.com/screens/sc_39fb71a1ee0d43f09bab33c7ef775259?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | Unlisted 공개 범위 안내 | 프로필에 발행 글 표시 — 발행된 것으로 보이는 글 카드 |
| 11 | [`sc_e3b2276c9abd4bc7b08e6e4c322dee9e`](https://gummble.com/screens/sc_e3b2276c9abd4bc7b08e6e4c322dee9e?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 프로필에 발행 글 표시 | 이 흐름의 기록 종료; 2절의 종료 범위 참조 |

## 4. 화면별 상세 분석

### 단계 01 — For you 홈 피드

- Screen ID: `sc_5e0ba0e498ff49579bf838096aec4b5e`
- 원본: [화면 페이지](https://gummble.com/screens/sc_5e0ba0e498ff49579bf838096aec4b5e?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/33b28771-e947-4feb-9868-73bc4a3b1941.png)
- 로컬 이미지: [sc_5e0ba0e498ff49579bf838096aec4b5e.png](<../../../screens/sc_5e0ba0e498ff49579bf838096aec4b5e.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `플로우 시작` → 현재 → `sc_397cb0f05ba54659adac7376f29512dd`

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

### 단계 02 — 빈 기사 편집기

- Screen ID: `sc_397cb0f05ba54659adac7376f29512dd`
- 원본: [화면 페이지](https://gummble.com/screens/sc_397cb0f05ba54659adac7376f29512dd?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/51d2ddc1-7fb4-4434-be91-08e2dcb1806b.png)
- 로컬 이미지: [sc_397cb0f05ba54659adac7376f29512dd.png](<../../../screens/sc_397cb0f05ba54659adac7376f29512dd.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_5e0ba0e498ff49579bf838096aec4b5e` → 현재 → `sc_4db886af7d024100a72b9e02fa3c1ee8`

#### 화면에서 직접 확인한 내용

- 레이아웃: 상단 Close·더보기·Next, 본문 커서, 키보드 위 서식 도구
- 입력 항목·기본값·표시 데이터: 본문 빈값
- 버튼·메뉴·안내 문구: 문자 크기, 인용, 목록, 구분선, 멘션, 코드, 이미지, Next
- 확인된 상태: 작성 시작·키보드 활성
- R2 보완 관찰·해석: Close와 더보기 메뉴로 작성 경로를 벗어나는 진입점이 있다. 빈 문서에서도 Next는 녹색이며, 빈 글 발행 허용 여부는 확인되지 않는다.
- 단계 간 변화: For you 홈 피드 → 빈 기사 편집기. 현재 관찰값: 본문 빈값. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 초안 본문과 편집 선택·키보드 상태 분리. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 빈 문서 Next 동작·자동 저장 시점

#### 모델링 영향

- 후보와 근거: 초안 본문과 편집 선택·키보드 상태 분리. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 빈 문서 Next 동작·자동 저장 시점. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 03 — 제목과 본문 입력

- Screen ID: `sc_4db886af7d024100a72b9e02fa3c1ee8`
- 원본: [화면 페이지](https://gummble.com/screens/sc_4db886af7d024100a72b9e02fa3c1ee8?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/754546ba-fe9d-4625-a558-bad0db6cb657.png)
- 로컬 이미지: [sc_4db886af7d024100a72b9e02fa3c1ee8.png](<../../../screens/sc_4db886af7d024100a72b9e02fa3c1ee8.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_397cb0f05ba54659adac7376f29512dd` → 현재 → `sc_c609f8fa87b84b76bea6f312df2e3e0f`

#### 화면에서 직접 확인한 내용

- 레이아웃: 굵은 제목과 세리프 본문, 키보드 위 편집 도구
- 입력 항목·기본값·표시 데이터: The Silence between Notes 제목과 음악 관련 단락 입력
- 버튼·메뉴·안내 문구: Close, 더보기, Next, 서식·이미지 도구
- 확인된 상태: 본문 끝 커서
- 단계 간 변화: 빈 기사 편집기 → 제목과 본문 입력. 현재 관찰값: The Silence between Notes 제목과 음악 관련 단락 입력. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 문서 제목과 블록형 본문 후보. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 저장 완료·글자 제한·제목 필수 검증

#### 모델링 영향

- 후보와 근거: 문서 제목과 블록형 본문 후보. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 저장 완료·글자 제한·제목 필수 검증. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 04 — 이미지 추가 방식 선택

- Screen ID: `sc_c609f8fa87b84b76bea6f312df2e3e0f`
- 원본: [화면 페이지](https://gummble.com/screens/sc_c609f8fa87b84b76bea6f312df2e3e0f?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/46193b39-be21-4add-a739-805fb8a79727.png)
- 로컬 이미지: [sc_c609f8fa87b84b76bea6f312df2e3e0f.png](<../../../screens/sc_c609f8fa87b84b76bea6f312df2e3e0f.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_4db886af7d024100a72b9e02fa3c1ee8` → 현재 → `sc_785431954ec4405eb0a3b22debce165a`

#### 화면에서 직접 확인한 내용

- 레이아웃: 편집기 위 하단 액션 시트
- 입력 항목·기본값·표시 데이터: 추가 입력 없음
- 버튼·메뉴·안내 문구: Take photo, Choose from library, Search photos on Unsplash, Cancel
- 확인된 상태: 이미지 소스 선택
- 단계 간 변화: 제목과 본문 입력 → 이미지 추가 방식 선택. 현재 관찰값: 추가 입력 없음. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 외부 사진·기기 사진 입력 경로 구분. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 카메라·사진 권한 처리

#### 모델링 영향

- 후보와 근거: 외부 사진·기기 사진 입력 경로 구분. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 카메라·사진 권한 처리. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 05 — Unsplash 사진 선택

- Screen ID: `sc_785431954ec4405eb0a3b22debce165a`
- 원본: [화면 페이지](https://gummble.com/screens/sc_785431954ec4405eb0a3b22debce165a?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/93624499-b302-492a-be2a-6b935f58c2d1.png)
- 로컬 이미지: [sc_785431954ec4405eb0a3b22debce165a.png](<../../../screens/sc_785431954ec4405eb0a3b22debce165a.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_c609f8fa87b84b76bea6f312df2e3e0f` → 현재 → `sc_ae30c2a2ca504522b03f98f11d59c429`

#### 화면에서 직접 확인한 내용

- 레이아웃: 검색 필드 아래 2열 가변 높이 사진과 작가 이름
- 입력 항목·기본값·표시 데이터: Search photos 빈값
- 버튼·메뉴·안내 문구: 사진 항목, Cancel
- 확인된 상태: 외부 사진 탐색 시트
- 단계 간 변화: 이미지 추가 방식 선택 → Unsplash 사진 선택. 현재 관찰값: Search photos 빈값. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 이미지 자산과 제공자·크레딧 메타데이터. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 검색 요청·사용권·출처 보존 계약

#### 모델링 영향

- 후보와 근거: 이미지 자산과 제공자·크레딧 메타데이터. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 검색 요청·사용권·출처 보존 계약. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 06 — 본문 이미지 로딩

- Screen ID: `sc_ae30c2a2ca504522b03f98f11d59c429`
- 원본: [화면 페이지](https://gummble.com/screens/sc_ae30c2a2ca504522b03f98f11d59c429?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/1645fe26-c87f-4dd6-b88c-8a3391a95a1b.png)
- 로컬 이미지: [sc_ae30c2a2ca504522b03f98f11d59c429.png](<../../../screens/sc_ae30c2a2ca504522b03f98f11d59c429.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_785431954ec4405eb0a3b22debce165a` → 현재 → `sc_bed3857c8edc4a02b07af1e095ad7fba`

#### 화면에서 직접 확인한 내용

- 레이아웃: 본문 아래 사진 위 어두운 덮개·스피너·녹색 선택 테두리
- 입력 항목·기본값·표시 데이터: 사진 블록 선택
- 버튼·메뉴·안내 문구: 사진 우상단 X, 서식 도구, Next
- 확인된 상태: 이미지 삽입 처리 중
- 단계 간 변화: Unsplash 사진 선택 → 본문 이미지 로딩. 현재 관찰값: 사진 블록 선택. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 이미지 블록의 로딩·실패·완료 상태. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 업로드인지 다운로드인지 미확인

#### 모델링 영향

- 후보와 근거: 이미지 블록의 로딩·실패·완료 상태. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 업로드인지 다운로드인지 미확인. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 07 — 이미지 삽입 후 편집기

- Screen ID: `sc_bed3857c8edc4a02b07af1e095ad7fba`
- 원본: [화면 페이지](https://gummble.com/screens/sc_bed3857c8edc4a02b07af1e095ad7fba?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/86ae6c3a-2f21-46e5-a1e2-8034bc75b35d.png)
- 로컬 이미지: [sc_bed3857c8edc4a02b07af1e095ad7fba.png](<../../../screens/sc_bed3857c8edc4a02b07af1e095ad7fba.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_ae30c2a2ca504522b03f98f11d59c429` → 현재 → `sc_1ceed9061b86476ebc7eb5acb9dd89c7`

#### 화면에서 직접 확인한 내용

- 레이아웃: 제목·본문 아래 산과 호수 사진, 키보드 숨김
- 입력 항목·기본값·표시 데이터: 제목·본문·사진 표시
- 버튼·메뉴·안내 문구: Close, 더보기, Next, 서식 도구
- 확인된 상태: 이미지 로딩 표시 사라짐
- 단계 간 변화: 본문 이미지 로딩 → 이미지 삽입 후 편집기. 현재 관찰값: 제목·본문·사진 표시. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 텍스트와 이미지 블록 순서 보존. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 자동 저장 성공 여부

#### 모델링 영향

- 후보와 근거: 텍스트와 이미지 블록 순서 보존. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 자동 저장 성공 여부. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 08 — 발행 전 Story preview

- Screen ID: `sc_1ceed9061b86476ebc7eb5acb9dd89c7`
- 원본: [화면 페이지](https://gummble.com/screens/sc_1ceed9061b86476ebc7eb5acb9dd89c7?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/247471e8-e75d-4ccc-8ae1-7674df70fa06.png)
- 로컬 이미지: [sc_1ceed9061b86476ebc7eb5acb9dd89c7.png](<../../../screens/sc_1ceed9061b86476ebc7eb5acb9dd89c7.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_bed3857c8edc4a02b07af1e095ad7fba` → 현재 → `sc_c3bdb30e524c4709ae45998ec529a6c0`

#### 화면에서 직접 확인한 내용

- 레이아웃: 예상 기사 카드와 Topics·Publication 행, 하단 Publish now
- 입력 항목·기본값·표시 데이터: No topics added, No publication selected, Unlisted 꺼짐
- 버튼·메뉴·안내 문구: Edit, Topics, Publication, Publish now, 닫기
- 확인된 상태: 공개 전 설정
- R2 보완 관찰·해석: 미리보기 안내는 홈페이지·구독자 받은편지함 등 공개 영역에서의 노출 형태를 설명한다. 토픽·Publication 미지정 상태에서도 Publish now는 어두운 활성형으로 보이지만 실제 제출 허용 여부는 미검증이다.
- 단계 간 변화: 이미지 삽입 후 편집기 → 발행 전 Story preview. 현재 관찰값: No topics added, No publication selected, Unlisted 꺼짐. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 본문과 공개 카드 요약·발행 대상·가시성 분리. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 발행 권한·입력 검증·공개 범위 실제 정책

#### 모델링 영향

- 후보와 근거: 본문과 공개 카드 요약·발행 대상·가시성 분리. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 발행 권한·입력 검증·공개 범위 실제 정책. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 09 — 토픽 지정된 발행 미리보기

- Screen ID: `sc_c3bdb30e524c4709ae45998ec529a6c0`
- 원본: [화면 페이지](https://gummble.com/screens/sc_c3bdb30e524c4709ae45998ec529a6c0?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/d5eb4f73-9da3-4d1a-a3d2-f1c9f85c99ad.png)
- 로컬 이미지: [sc_c3bdb30e524c4709ae45998ec529a6c0.png](<../../../screens/sc_c3bdb30e524c4709ae45998ec529a6c0.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_1ceed9061b86476ebc7eb5acb9dd89c7` → 현재 → `sc_39fb71a1ee0d43f09bab33c7ef775259`

#### 화면에서 직접 확인한 내용

- 레이아웃: 기사 카드 아래 토픽 칩
- 입력 항목·기본값·표시 데이터: Music, Culture, Art 3개
- 버튼·메뉴·안내 문구: Topics, Publication, Edit, Publish now
- 확인된 상태: 토픽 선택 반영
- 단계 간 변화: 발행 전 Story preview → 토픽 지정된 발행 미리보기. 현재 관찰값: Music, Culture, Art 3개. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 기사-토픽 연결 후보. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 토픽 6번째 선택 시 UI·삭제·순서·서버 검증은 미확인. 최대 5개 안내는 토픽 선택 화면 및 공식 문서에서 확인했다.

#### 모델링 영향

- 후보와 근거: 기사-토픽 연결 후보. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 토픽 6번째 선택 시 UI·삭제·순서·서버 검증은 미확인. 최대 5개 안내는 토픽 선택 화면 및 공식 문서에서 확인했다. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 10 — Unlisted 공개 범위 안내

- Screen ID: `sc_39fb71a1ee0d43f09bab33c7ef775259`
- 원본: [화면 페이지](https://gummble.com/screens/sc_39fb71a1ee0d43f09bab33c7ef775259?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/d4334127-5d4e-4be2-be9f-e70c26bd764d.png)
- 로컬 이미지: [sc_39fb71a1ee0d43f09bab33c7ef775259.png](<../../../screens/sc_39fb71a1ee0d43f09bab33c7ef775259.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_c3bdb30e524c4709ae45998ec529a6c0` → 현재 → `sc_e3b2276c9abd4bc7b08e6e4c322dee9e`

#### 화면에서 직접 확인한 내용

- 레이아웃: 미리보기 하단 스크롤, Publication과 Unlisted 설명
- 입력 항목·기본값·표시 데이터: Publication 미지정, Unlisted 꺼짐
- 버튼·메뉴·안내 문구: Unlisted 토글, Publish now
- 확인된 상태: 링크 소지자 접근·공개 목록 제외라는 안내
- R2 보완 관찰·해석: Unlisted는 꺼진 상태만 수록된다. 토글을 켠 결과·비공개 접근 차단을 관찰한 것으로 기록하지 않는다.
- 단계 간 변화: 토픽 지정된 발행 미리보기 → Unlisted 공개 범위 안내. 현재 관찰값: Publication 미지정, Unlisted 꺼짐. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 목록 노출 여부와 접근 권한 구분. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 링크 접근의 인증·검색엔진 노출 조건

#### 모델링 영향

- 후보와 근거: 목록 노출 여부와 접근 권한 구분. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 링크 접근의 인증·검색엔진 노출 조건. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 11 — 프로필에 발행 글 표시

- Screen ID: `sc_e3b2276c9abd4bc7b08e6e4c322dee9e`
- 원본: [화면 페이지](https://gummble.com/screens/sc_e3b2276c9abd4bc7b08e6e4c322dee9e?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/c9cfb757-fe00-4a93-9972-870485b0ec82.png)
- 로컬 이미지: [sc_e3b2276c9abd4bc7b08e6e4c322dee9e.png](<../../../screens/sc_e3b2276c9abd4bc7b08e6e4c322dee9e.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_39fb71a1ee0d43f09bab33c7ef775259` → 현재 → `플로우 기록 종료`

#### 화면에서 직접 확인한 내용

- 레이아웃: 프로필 Stories 탭 Public 필터 아래 새 글
- 입력 항목·기본값·표시 데이터: Alex Smith, 0 followers·1 following, Just now
- 버튼·메뉴·안내 문구: View stats, Edit your profile, 필터, 저장, 더보기
- 확인된 상태: 발행된 것으로 보이는 글 카드
- 단계 간 변화: Unlisted 공개 범위 안내 → 프로필에 발행 글 표시. 현재 관찰값: Alex Smith, 0 followers·1 following, Just now. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 게시 상태·발행 시각·프로필 목록 관계. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 실제 공개 URL·외부 계정 조회 결과

#### 모델링 영향

- 후보와 근거: 게시 상태·발행 시각·프로필 목록 관계. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 실제 공개 URL·외부 계정 조회 결과. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

## 5. 업무 규칙과 데이터 변화

토픽 선택 중간 과정은 자식 흐름에 있다. 공개 목록에 글이 보이는 결과와 실제 외부 URL 접근 검증을 구분한다.

| 단계 | 관찰된 상태·값 | 근거의 한계 |
| --- | --- | --- |
| 01 | 추천 기사 목록 — For you 활성. 작가·제목·요약·썸네일·날짜·박수·응답 수 표시 | 추천 알고리즘·개인화 저장·카드 전체 클릭 영역 |
| 02 | 작성 시작·키보드 활성 — 본문 빈값 | 빈 문서 Next 동작·자동 저장 시점 |
| 03 | 본문 끝 커서 — The Silence between Notes 제목과 음악 관련 단락 입력 | 저장 완료·글자 제한·제목 필수 검증 |
| 04 | 이미지 소스 선택 — 추가 입력 없음 | 카메라·사진 권한 처리 |
| 05 | 외부 사진 탐색 시트 — Search photos 빈값 | 검색 요청·사용권·출처 보존 계약 |
| 06 | 이미지 삽입 처리 중 — 사진 블록 선택 | 업로드인지 다운로드인지 미확인 |
| 07 | 이미지 로딩 표시 사라짐 — 제목·본문·사진 표시 | 자동 저장 성공 여부 |
| 08 | 공개 전 설정 — No topics added, No publication selected, Unlisted 꺼짐 | 발행 권한·입력 검증·공개 범위 실제 정책 |
| 09 | 토픽 선택 반영 — Music, Culture, Art 3개 | 토픽 6번째 선택 시 UI·삭제·순서·서버 검증은 미확인. 최대 5개 안내는 토픽 선택 화면 및 공식 문서에서 확인했다. |
| 10 | 링크 소지자 접근·공개 목록 제외라는 안내 — Publication 미지정, Unlisted 꺼짐 | 링크 접근의 인증·검색엔진 노출 조건 |
| 11 | 발행된 것으로 보이는 글 카드 — Alex Smith, 0 followers·1 following, Just now | 실제 공개 URL·외부 계정 조회 결과 |

위 표는 보이는 상태 변화다. 성공 토스트가 있어도 외부 계정의 가시성·영수증·서버 저장을 독립 검증한 것은 아니다.

## 6. 공식 도움말과 API 대조

공식 자료는 현재 문서이며 과거 캡처와 시점이 다를 수 있다. 아래 기능 설명의 범위만 대조했으며 내부 API나 제품 전체 규칙을 확인한 것은 아니다.

- [Writing and publishing your first story](https://help.medium.com/hc/en-us/articles/225168768-Writing-and-publishing-your-first-story): 초안 자동 저장, 앱 편집 도구, 이미지 삽입과 발행 단계를 설명한다. 실제 저장 시점은 캡처로 검증하지 않았다. [공통 문서 대조](<../../../SOURCES.md#writing>).
- [Using topics](https://help.medium.com/hc/en-us/articles/214741038-Using-topics): 글에는 최대 5개 토픽을 추가할 수 있으며 앱에서 선택 후 Save로 저장한다. [공통 문서 대조](<../../../SOURCES.md#topics>).

화면에서 관찰한 값·메뉴와 문서에 없는 세부 상태는 구분한다. 미수록 오류·권한·실패 분기는 아래 질문으로 남긴다.

- [API 검토](<../../../SOURCES.md#api>). 이 흐름의 내부 endpoint·요청·응답·DB 스키마는 확인하지 않았다.

## 7. 데이터 모델링 시사점

다음은 관찰에 기반한 구현 후보다. Kostolany의 기능 채택·스키마·업무 정책으로 확정하지 않는다.

- 단계 01: 피드 항목·기사·작성자·집계 및 사용자 추천 피드백 분리
- 단계 02: 초안 본문과 편집 선택·키보드 상태 분리
- 단계 03: 문서 제목과 블록형 본문 후보
- 단계 04: 외부 사진·기기 사진 입력 경로 구분
- 단계 05: 이미지 자산과 제공자·크레딧 메타데이터
- 단계 06: 이미지 블록의 로딩·실패·완료 상태
- 단계 07: 텍스트와 이미지 블록 순서 보존
- 단계 08: 본문과 공개 카드 요약·발행 대상·가시성 분리
- 단계 09: 기사-토픽 연결 후보
- 단계 10: 목록 노출 여부와 접근 권한 구분
- 단계 11: 게시 상태·발행 시각·프로필 목록 관계

## 8. 미확인 사항과 검토 질문

**원본에 없는 분기·남은 범위:** Close 후 초안 처리, Publication 제출, Unlisted On, 미리보기 Edit, 빈 글·이미지 실패·발행 실패.

- 단계 01: 추천 알고리즘·개인화 저장·카드 전체 클릭 영역
- 단계 02: 빈 문서 Next 동작·자동 저장 시점
- 단계 03: 저장 완료·글자 제한·제목 필수 검증
- 단계 04: 카메라·사진 권한 처리
- 단계 05: 검색 요청·사용권·출처 보존 계약
- 단계 06: 업로드인지 다운로드인지 미확인
- 단계 07: 자동 저장 성공 여부
- 단계 08: 발행 권한·입력 검증·공개 범위 실제 정책
- 단계 09: 토픽 6번째 선택 시 UI·삭제·순서·서버 검증은 미확인. 최대 5개 안내는 토픽 선택 화면 및 공식 문서에서 확인했다.
- 단계 10: 링크 접근의 인증·검색엔진 노출 조건
- 단계 11: 실제 공개 URL·외부 계정 조회 결과
- 같은 계정·같은 빌드에서 시작 상태를 맞춘 뒤 정상·취소·실패·재진입 결과를 검증해야 한다.

## 9. 검토 이력

| 차수 | 날짜 | 확인·작성 내용 | 남은 범위 |
| --- | --- | --- | --- |
| R1 | 2026-11-18 KST | MCP 11단계와 실제 이미지 11단계 대조. 원본·로컬 파일 연결, 관찰·문서·가정 분리 | 실제 계정 재현·미수록 상태·8절 항목 |
| R2 | 2026-11-18 KST | MCP 11단계 순서 재조회 및 이미지 재검토. 5개 단계의 관찰·표현 보완. 진입·종료·미수록 분기·관련 흐름 및 공식 규칙 대조 추가 | 원본에 없는 8절 분기·실제 계정 동작 |
| 문서 점검 | 2026-11-18 KST | 전체 63개 문서의 단계 순서·이미지 ID·로컬 링크·필수 절 구조를 검증 스크립트로 점검 | 이미지 2차 검토로 계산하지 않음 |
