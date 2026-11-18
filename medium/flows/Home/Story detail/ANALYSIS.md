# Story detail 플로우 분석

검토 상태: **R2 누락·내용 재검토 완료(정적 캡처 범위)**. 실제 이미지 재확인 **7/7단계**. 계정 재현은 수행하지 않았다.

관찰은 Gummble 캡처에서 직접 본 내용, 문서 확인은 현재 공식 도움말, 설계 가정은 우리 구현 후보를 뜻한다. 버튼의 존재·성공 안내·실제 서버 결과를 구분한다.

## 1. 출처와 검토 상태

| 항목 | 기록 |
| --- | --- |
| 앱 | Medium iOS · `medium-ios` · `4674239e-d24a-4ef4-aed5-9682429edd48` |
| Flow ID | `d34a6d85-ab07-4cb3-87d2-28db79260b80` |
| 원본 | [Gummble flow](https://gummble.com/apps/medium-ios?tab=flows&flow=d34a6d85-ab07-4cb3-87d2-28db79260b80) |
| 카탈로그 버전 | MCP 조회 `Latest`, version ID `1419` |
| 제품 빌드 | 개별 화면의 제품 빌드 미확인. 카탈로그 버전을 제품 버전으로 사용하지 않음 |
| 조회일 / 이미지 검토일 | 2026-11-18 KST. 개별 분·초는 기록하지 않음 |
| 캡처일 | 미확인. 기사·알림·통계에 표시된 날짜는 캡처일이 아님 |
| 화면 수 / 이미지 확인 | 7단계 / 7단계. 공통 이미지는 다른 흐름과 동일 관찰 기록을 재사용 |
| 이미지 검토 방식 | R1: MCP 이미지 또는 로컬 원본. R2: 원본 PNG를 390×844로 축소한 번호 포함 비교 시트. 공통 이미지는 고유 이미지 기준 재검토 후 각 흐름에서 대조 |
| 크기·환경 | MCP 크기와 실제 PNG 픽셀 크기를 단계별 구분. 기기 모델·OS·DPR·배율·국가·계정 권한은 별도 확인 없으면 미확인 |
| 계정 재현 | 미수행. 로그인·발행·구매·신고·삭제·외부 공유를 실행하지 않음 |
| 공식 문서 | 2026-11-18 조회. 6절에 직접 대조 범위와 미확인 범위를 기록 |

## 2. 플로우 목적과 연결

기사 상단·본문·말미 토픽·작가 소개·응답 미리보기·후속 추천을 읽기 순서로 분석한다.

멤버 전용 배지가 있지만 비회원 접근 제한 분기는 없다. 본문 강조의 소유자는 선택 과정이 없으면 확정하지 않는다.

- 상위 흐름: [Home](<../ANALYSIS.md>)
- 하위 흐름: [Sending claps](<Sending claps/ANALYSIS.md>) · [Responses](<Responses/ANALYSIS.md>) · [Saving a story](<Saving a story/ANALYSIS.md>) · [Sharing a story](<Sharing a story/ANALYSIS.md>) · [Author detail](<Author detail/ANALYSIS.md>) · [Listening to a story](<Listening to a story/ANALYSIS.md>) · [Changing display](<Changing display/ANALYSIS.md>) · [Highlighting a phrase](<Highlighting a phrase/ANALYSIS.md>) · [Responding to a phrase](<Responding to a phrase/ANALYSIS.md>)
- 폴더 위치: `medium/flows/Home/Story detail`
- 부모·자식은 Gummble 탐색 분류다. 모든 자식 흐름이 반드시 실행되는 순차 단계나 런타임 화면 트리를 뜻하지 않는다.

### 진입 조건과 확인된 종료 범위

- 진입: Home에서 멤버 전용 기사 상세로 연결된다.
- 종료: 본문·토픽·작가·응답 미리보기·동일 작가 다른 글까지 스크롤한다.
- 관련 흐름: [Author detail](<Author detail/ANALYSIS.md>) · [Responses](<Responses/ANALYSIS.md>) · [Saving a story](<Saving a story/ANALYSIS.md>)
- 관련 흐름 링크는 기능의 연결점이다. 서로 다른 캡처를 같은 계정·같은 시각의 연속 실행으로 합치지 않는다.

## 3. 전체 단계표

MCP가 반환한 순서다. 스크롤·메뉴·입력·로딩도 각각 한 단계이며 캡처 사이의 클릭·저장·네트워크가 모두 기록되었다는 뜻은 아니다.

| 단계 | Screen ID와 원본 | 확인된 화면 | 다음 캡처와의 관계 |
| --- | --- | --- | --- |
| 01 | [`sc_1ef4e2f769774d2c958fcb38b96dc94f`](https://gummble.com/screens/sc_1ef4e2f769774d2c958fcb38b96dc94f?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 홈 피드 스크롤 상태 | 기사 상세 상단 — 멤버 전용 기사 읽기 화면 |
| 02 | [`sc_332d5b0923e546fcbf6a8fc613cda6a4`](https://gummble.com/screens/sc_332d5b0923e546fcbf6a8fc613cda6a4?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 기사 상세 상단 | 기사 본문 스크롤 — 본문 중간 읽기 |
| 03 | [`sc_f4b06612bdbf48ecbd8a7b6e2607d117`](https://gummble.com/screens/sc_f4b06612bdbf48ecbd8a7b6e2607d117?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 기사 본문 스크롤 | 기사 말미와 작성자 카드 — 기사 말미 도달 |
| 04 | [`sc_c3fcf42b84be4b7298dfc138c224e241`](https://gummble.com/screens/sc_c3fcf42b84be4b7298dfc138c224e241?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 기사 말미와 작성자 카드 | 본문 아래 응답 미리보기 — 응답 일부 표시 |
| 05 | [`sc_e1a92b59829c4678b3362d2dc6abae59`](https://gummble.com/screens/sc_e1a92b59829c4678b3362d2dc6abae59?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 본문 아래 응답 미리보기 | 응답 미리보기 끝 — 부분 응답 목록의 끝 |
| 06 | [`sc_c068a6d42c5c48fb9d60c8af4adb446f`](https://gummble.com/screens/sc_c068a6d42c5c48fb9d60c8af4adb446f?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 응답 미리보기 끝 | 같은 작가의 추가 기사 — 읽기 후 작가 콘텐츠 추천 |
| 07 | [`sc_92624aea551d44a7bbcf71d7d78aff4c`](https://gummble.com/screens/sc_92624aea551d44a7bbcf71d7d78aff4c?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 같은 작가의 추가 기사 | 이 흐름의 기록 종료; 2절의 종료 범위 참조 |

## 4. 화면별 상세 분석

### 단계 01 — 홈 피드 스크롤 상태

- Screen ID: `sc_1ef4e2f769774d2c958fcb38b96dc94f`
- 원본: [화면 페이지](https://gummble.com/screens/sc_1ef4e2f769774d2c958fcb38b96dc94f?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/1159c5fa-5c83-4544-bb5d-9c06eae8935e.png)
- 로컬 이미지: [sc_1ef4e2f769774d2c958fcb38b96dc94f.png](<../../../screens/sc_1ef4e2f769774d2c958fcb38b96dc94f.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `플로우 시작` → 현재 → `sc_332d5b0923e546fcbf6a8fc613cda6a4`

#### 화면에서 직접 확인한 내용

- 레이아웃: 상단 제목 접힘, 가로 탭과 하단 탐색 유지
- 입력 항목·기본값·표시 데이터: 다른 기사 카드와 집계 표시
- 버튼·메뉴·안내 문구: 카드 원형 − 아이콘·더보기, 작성 버튼, 피드 탭·하단 탐색
- 확인된 상태: For you 하단 목록
- R2 보완 관찰·해석: 홈 스크롤 화면의 원형 − 컨트롤은 북마크 모양이 아니다. 실행 동작은 미수록이다.
- 단계 간 변화: 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 피드 스크롤 위치와 기사 목록 상태. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 페이지네이션·새로고침·중복 제거

#### 모델링 영향

- 후보와 근거: 피드 스크롤 위치와 기사 목록 상태. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 페이지네이션·새로고침·중복 제거. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 02 — 기사 상세 상단

- Screen ID: `sc_332d5b0923e546fcbf6a8fc613cda6a4`
- 원본: [화면 페이지](https://gummble.com/screens/sc_332d5b0923e546fcbf6a8fc613cda6a4?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/13453844-2b66-4c67-bc3b-83e90116cd49.png)
- 로컬 이미지: [sc_332d5b0923e546fcbf6a8fc613cda6a4.png](<../../../screens/sc_332d5b0923e546fcbf6a8fc613cda6a4.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_1ef4e2f769774d2c958fcb38b96dc94f` → 현재 → `sc_f4b06612bdbf48ecbd8a7b6e2607d117`

#### 화면에서 직접 확인한 내용

- 레이아웃: Member-only 배지·제목·부제·읽기 시간·작가·커버, 고정 반응 바
- 입력 항목·기본값·표시 데이터: 5 min read, Apr 30 2025, Jordan Gibbs, 18K 박수·834 응답
- 버튼·메뉴·안내 문구: 듣기, 더보기, Follow, 박수, 응답, 저장, 공유
- 확인된 상태: 멤버 전용 기사 읽기 화면
- R2 보완 관찰·해석: 표지 아래 Generated by the author with AI. 출처성 설명이 보인다. 상단 Member-only story 표식과 본문 접근 상태를 구분하며, 비회원 차단 화면은 이 흐름에 없다.
- 단계 간 변화: 홈 피드 스크롤 상태 → 기사 상세 상단. 현재 관찰값: 5 min read, Apr 30 2025, Jordan Gibbs, 18K 박수·834 응답. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 기사 메타데이터·본문·접근 권한·반응 분리. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 현재 계정 권한·본문 게이트·집계 정확값

#### 모델링 영향

- 후보와 근거: 기사 메타데이터·본문·접근 권한·반응 분리. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 현재 계정 권한·본문 게이트·집계 정확값. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 03 — 기사 본문 스크롤

- Screen ID: `sc_f4b06612bdbf48ecbd8a7b6e2607d117`
- 원본: [화면 페이지](https://gummble.com/screens/sc_f4b06612bdbf48ecbd8a7b6e2607d117?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/bb701b43-62a3-4bf4-a07b-aed863e2bb9c.png)
- 로컬 이미지: [sc_f4b06612bdbf48ecbd8a7b6e2607d117.png](<../../../screens/sc_f4b06612bdbf48ecbd8a7b6e2607d117.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_332d5b0923e546fcbf6a8fc613cda6a4` → 현재 → `sc_c3fcf42b84be4b7298dfc138c224e241`

#### 화면에서 직접 확인한 내용

- 레이아웃: 세리프 본문과 굵은 단락·점 구분선·연녹색 강조
- 입력 항목·기본값·표시 데이터: 여러 텍스트 강조 범위
- 버튼·메뉴·안내 문구: 상단 듣기·더보기, 하단 반응
- 확인된 상태: 본문 중간 읽기
- 단계 간 변화: 기사 상세 상단 → 기사 본문 스크롤. 현재 관찰값: 여러 텍스트 강조 범위. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 본문 위치와 강조 범위 별도 관리. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 강조가 개인 것인지 인기 강조인지 화면만으로 미확인

#### 모델링 영향

- 후보와 근거: 본문 위치와 강조 범위 별도 관리. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 강조가 개인 것인지 인기 강조인지 화면만으로 미확인. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 04 — 기사 말미와 작성자 카드

- Screen ID: `sc_c3fcf42b84be4b7298dfc138c224e241`
- 원본: [화면 페이지](https://gummble.com/screens/sc_c3fcf42b84be4b7298dfc138c224e241?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/a140e86a-6122-43ab-a1b9-07430319b477.png)
- 로컬 이미지: [sc_c3fcf42b84be4b7298dfc138c224e241.png](<../../../screens/sc_c3fcf42b84be4b7298dfc138c224e241.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_f4b06612bdbf48ecbd8a7b6e2607d117` → 현재 → `sc_e1a92b59829c4678b3362d2dc6abae59`

#### 화면에서 직접 확인한 내용

- 레이아웃: 마지막 문단 아래 토픽 5개와 작성자 소개
- 입력 항목·기본값·표시 데이터: 10.2K followers·24 following
- 버튼·메뉴·안내 문구: 토픽, Follow, 작성자 링크, 공유
- 확인된 상태: 기사 말미 도달
- R2 보완 관찰·해석: 기사 말미 작가 카드는 24 following을 표시하지만 Author detail 첫 화면은 25 following이다. 동일 시각 스냅샷으로 단정하지 않는다.
- 단계 간 변화: 기사 본문 스크롤 → 기사 말미와 작성자 카드. 현재 관찰값: 10.2K followers·24 following. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 기사-토픽·작성자 관계. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 외부 링크 동작·토픽 추천 연결

#### 모델링 영향

- 후보와 근거: 기사-토픽·작성자 관계. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 외부 링크 동작·토픽 추천 연결. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 05 — 본문 아래 응답 미리보기

- Screen ID: `sc_e1a92b59829c4678b3362d2dc6abae59`
- 원본: [화면 페이지](https://gummble.com/screens/sc_e1a92b59829c4678b3362d2dc6abae59?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/f8bc706a-b7ea-4e1e-b574-03ad2cbf8cee.png)
- 로컬 이미지: [sc_e1a92b59829c4678b3362d2dc6abae59.png](<../../../screens/sc_e1a92b59829c4678b3362d2dc6abae59.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_c3fcf42b84be4b7298dfc138c224e241` → 현재 → `sc_c068a6d42c5c48fb9d60c8af4adb446f`

#### 화면에서 직접 확인한 내용

- 레이아웃: Responses 834, 입력 유도, 응답 작성자·날짜·본문
- 입력 항목·기본값·표시 데이터: Alex Smith, What are your thoughts?
- 버튼·메뉴·안내 문구: 정책 방패, 더보기, 박수, replies, Reply
- 확인된 상태: 응답 일부 표시
- 단계 간 변화: 기사 말미와 작성자 카드 → 본문 아래 응답 미리보기. 현재 관찰값: Alex Smith, What are your thoughts?. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 기사 응답과 답글 계층·작성자. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 정렬 기준·응답 총수의 답글 포함 여부

#### 모델링 영향

- 후보와 근거: 기사 응답과 답글 계층·작성자. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 정렬 기준·응답 총수의 답글 포함 여부. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 06 — 응답 미리보기 끝

- Screen ID: `sc_c068a6d42c5c48fb9d60c8af4adb446f`
- 원본: [화면 페이지](https://gummble.com/screens/sc_c068a6d42c5c48fb9d60c8af4adb446f?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/3011672d-01fb-4a1c-946e-1afe50f9a41e.png)
- 로컬 이미지: [sc_c068a6d42c5c48fb9d60c8af4adb446f.png](<../../../screens/sc_c068a6d42c5c48fb9d60c8af4adb446f.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_e1a92b59829c4678b3362d2dc6abae59` → 현재 → `sc_92624aea551d44a7bbcf71d7d78aff4c`

#### 화면에서 직접 확인한 내용

- 레이아웃: 긴 응답 생략과 전체 응답 버튼
- 입력 항목·기본값·표시 데이터: Read more, See all responses
- 버튼·메뉴·안내 문구: Reply, replies, See all responses
- 확인된 상태: 부분 응답 목록의 끝
- 단계 간 변화: 본문 아래 응답 미리보기 → 응답 미리보기 끝. 현재 관찰값: Read more, See all responses. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 본문 내 일부 응답과 전체 목록 분리. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 미리보기 개수 정책

#### 모델링 영향

- 후보와 근거: 본문 내 일부 응답과 전체 목록 분리. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 미리보기 개수 정책. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 07 — 같은 작가의 추가 기사

- Screen ID: `sc_92624aea551d44a7bbcf71d7d78aff4c`
- 원본: [화면 페이지](https://gummble.com/screens/sc_92624aea551d44a7bbcf71d7d78aff4c?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/f06cdff4-92e1-4513-8930-86aa3224e052.png)
- 로컬 이미지: [sc_92624aea551d44a7bbcf71d7d78aff4c.png](<../../../screens/sc_92624aea551d44a7bbcf71d7d78aff4c.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_c068a6d42c5c48fb9d60c8af4adb446f` → 현재 → `플로우 기록 종료`

#### 화면에서 직접 확인한 내용

- 레이아웃: More from Jordan Gibbs 아래 큰 이미지 카드
- 입력 항목·기본값·표시 데이터: 기사별 날짜·박수·응답
- 버튼·메뉴·안내 문구: 저장, 더보기, 기사 카드
- 확인된 상태: 읽기 후 작가 콘텐츠 추천
- 단계 간 변화: 응답 미리보기 끝 → 같은 작가의 추가 기사. 현재 관찰값: 기사별 날짜·박수·응답. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 현재 기사와 후속 추천 목록. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 추천 정렬·무한 스크롤

#### 모델링 영향

- 후보와 근거: 현재 기사와 후속 추천 목록. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 추천 정렬·무한 스크롤. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

## 5. 업무 규칙과 데이터 변화

멤버 전용 배지가 있지만 비회원 접근 제한 분기는 없다. 본문 강조의 소유자는 선택 과정이 없으면 확정하지 않는다.

| 단계 | 관찰된 상태·값 | 근거의 한계 |
| --- | --- | --- |
| 01 | For you 하단 목록 — 다른 기사 카드와 집계 표시 | 페이지네이션·새로고침·중복 제거 |
| 02 | 멤버 전용 기사 읽기 화면 — 5 min read, Apr 30 2025, Jordan Gibbs, 18K 박수·834 응답 | 현재 계정 권한·본문 게이트·집계 정확값 |
| 03 | 본문 중간 읽기 — 여러 텍스트 강조 범위 | 강조가 개인 것인지 인기 강조인지 화면만으로 미확인 |
| 04 | 기사 말미 도달 — 10.2K followers·24 following | 외부 링크 동작·토픽 추천 연결 |
| 05 | 응답 일부 표시 — Alex Smith, What are your thoughts? | 정렬 기준·응답 총수의 답글 포함 여부 |
| 06 | 부분 응답 목록의 끝 — Read more, See all responses | 미리보기 개수 정책 |
| 07 | 읽기 후 작가 콘텐츠 추천 — 기사별 날짜·박수·응답 | 추천 정렬·무한 스크롤 |

위 표는 보이는 상태 변화다. 성공 토스트가 있어도 외부 계정의 가시성·영수증·서버 저장을 독립 검증한 것은 아니다.

## 6. 공식 도움말과 API 대조

공식 자료는 현재 문서이며 과거 캡처와 시점이 다를 수 있다. 아래 기능 설명의 범위만 대조했으며 내부 API나 제품 전체 규칙을 확인한 것은 아니다.

- [Your homepage](https://help.medium.com/hc/en-us/articles/115012586467-Your-homepage): For you는 개인 추천, Featured는 팔로우한 발행물의 추천 글이다. 앱 검색 진입도 설명한다. [공통 문서 대조](<../../../SOURCES.md#home>).
- [About highlights](https://help.medium.com/hc/en-us/articles/214406358-About-highlights): 강조 구절은 작성자·팔로워에게 보일 수 있다. 구절 인용 응답과 타인 하이라이트 숨김을 설명한다. [공통 문서 대조](<../../../SOURCES.md#highlights>).
- [Write a response](https://help.medium.com/hc/en-us/articles/214578008-Write-a-response): 응답에는 로그인이 필요하고 특정 구절을 인용할 수 있다. 수정·삭제·정렬의 세부 계약은 이 문서로 확정하지 않는다. [공통 문서 대조](<../../../SOURCES.md#responses>).

화면에서 관찰한 값·메뉴와 문서에 없는 세부 상태는 구분한다. 미수록 오류·권한·실패 분기는 아래 질문으로 남긴다.

- [API 검토](<../../../SOURCES.md#api>). 이 흐름의 내부 endpoint·요청·응답·DB 스키마는 확인하지 않았다.

## 7. 데이터 모델링 시사점

다음은 관찰에 기반한 구현 후보다. Kostolany의 기능 채택·스키마·업무 정책으로 확정하지 않는다.

- 단계 01: 피드 스크롤 위치와 기사 목록 상태
- 단계 02: 기사 메타데이터·본문·접근 권한·반응 분리
- 단계 03: 본문 위치와 강조 범위 별도 관리
- 단계 04: 기사-토픽·작성자 관계
- 단계 05: 기사 응답과 답글 계층·작성자
- 단계 06: 본문 내 일부 응답과 전체 목록 분리
- 단계 07: 현재 기사와 후속 추천 목록

## 8. 미확인 사항과 검토 질문

**원본에 없는 분기·남은 범위:** 비회원 게이트·삭제 글·네트워크 실패, 본문 링크·미리보기 응답 클릭 결과.

- 단계 01: 페이지네이션·새로고침·중복 제거
- 단계 02: 현재 계정 권한·본문 게이트·집계 정확값
- 단계 03: 강조가 개인 것인지 인기 강조인지 화면만으로 미확인
- 단계 04: 외부 링크 동작·토픽 추천 연결
- 단계 05: 정렬 기준·응답 총수의 답글 포함 여부
- 단계 06: 미리보기 개수 정책
- 단계 07: 추천 정렬·무한 스크롤
- 같은 계정·같은 빌드에서 시작 상태를 맞춘 뒤 정상·취소·실패·재진입 결과를 검증해야 한다.

## 9. 검토 이력

| 차수 | 날짜 | 확인·작성 내용 | 남은 범위 |
| --- | --- | --- | --- |
| R1 | 2026-11-18 KST | MCP 7단계와 실제 이미지 7단계 대조. 원본·로컬 파일 연결, 관찰·문서·가정 분리 | 실제 계정 재현·미수록 상태·8절 항목 |
| R2 | 2026-11-18 KST | MCP 7단계 순서 재조회 및 이미지 재검토. 3개 단계의 관찰·표현 보완. 진입·종료·미수록 분기·관련 흐름 및 공식 규칙 대조 추가 | 원본에 없는 8절 분기·실제 계정 동작 |
| 문서 점검 | 2026-11-18 KST | 전체 63개 문서의 단계 순서·이미지 ID·로컬 링크·필수 절 구조를 검증 스크립트로 점검 | 이미지 2차 검토로 계산하지 않음 |
