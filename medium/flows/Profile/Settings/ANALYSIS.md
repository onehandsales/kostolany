# Settings 플로우 분석

검토 상태: **R2 누락·내용 재검토 완료(정적 캡처 범위)**. 실제 이미지 재확인 **3/3단계**. 계정 재현은 수행하지 않았다.

관찰은 Gummble 캡처에서 직접 본 내용, 문서 확인은 현재 공식 도움말, 설계 가정은 우리 구현 후보를 뜻한다. 버튼의 존재·성공 안내·실제 서버 결과를 구분한다.

## 1. 출처와 검토 상태

| 항목 | 기록 |
| --- | --- |
| 앱 | Medium iOS · `medium-ios` · `4674239e-d24a-4ef4-aed5-9682429edd48` |
| Flow ID | `a84364a5-7861-46a3-bf0d-449f8e3b1db2` |
| 원본 | [Gummble flow](https://gummble.com/apps/medium-ios?tab=flows&flow=a84364a5-7861-46a3-bf0d-449f8e3b1db2) |
| 카탈로그 버전 | MCP 조회 `Latest`, version ID `1419` |
| 제품 빌드 | 설정 캡처에 `4.263.185257` 표시. 다른 단계의 동일 빌드 여부는 미확인 |
| 조회일 / 이미지 검토일 | 2026-11-18 KST. 개별 분·초는 기록하지 않음 |
| 캡처일 | 미확인. 기사·알림·통계에 표시된 날짜는 캡처일이 아님 |
| 화면 수 / 이미지 확인 | 3단계 / 3단계. 공통 이미지는 다른 흐름과 동일 관찰 기록을 재사용 |
| 이미지 검토 방식 | R1: MCP 이미지 또는 로컬 원본. R2: 원본 PNG를 390×844로 축소한 번호 포함 비교 시트. 공통 이미지는 고유 이미지 기준 재검토 후 각 흐름에서 대조 |
| 크기·환경 | MCP 크기와 실제 PNG 픽셀 크기를 단계별 구분. 기기 모델·OS·DPR·배율·국가·계정 권한은 별도 확인 없으면 미확인 |
| 계정 재현 | 미수행. 로그인·발행·구매·신고·삭제·외부 공유를 실행하지 않음 |
| 공식 문서 | 2026-11-18 조회. 6절에 직접 대조 범위와 미확인 범위를 기록 |

## 2. 플로우 목적과 연결

프로필에서 계정·결제·추천·테마·알림·아이콘·소셜·도움말·로그아웃 진입점을 확인한다.

하단에 4.263.185257 버전이 표시된다. 이 값이 다른 모든 흐름의 앱 빌드임을 보장하지 않는다.

- 상위 흐름: [Profile](<../ANALYSIS.md>)
- 하위 흐름: [Switching to dark mode](<Switching to dark mode/ANALYSIS.md>) · [Changing notification settings](<Changing notification settings/ANALYSIS.md>) · [Custom app icon](<Custom app icon/ANALYSIS.md>) · [Logging out](<Logging out/ANALYSIS.md>)
- 폴더 위치: `medium/flows/Profile/Settings`
- 부모·자식은 Gummble 탐색 분류다. 모든 자식 흐름이 반드시 실행되는 순차 단계나 런타임 화면 트리를 뜻하지 않는다.

### 진입 조건과 확인된 종료 범위

- 진입: 프로필 톱니바퀴에서 설정에 진입한다.
- 종료: 계정·구독·편집·추천·외관·알림·아이콘·외부 연결·로그아웃 메뉴와 빌드가 보인다.
- 관련 흐름: [Refine recommendations](<../../Home/Refine recommendations/ANALYSIS.md>) · [Story stats](<../Story stats/ANALYSIS.md>) · [Editing profile information](<../Editing profile information/ANALYSIS.md>)
- 관련 흐름 링크는 기능의 연결점이다. 서로 다른 캡처를 같은 계정·같은 시각의 연속 실행으로 합치지 않는다.

## 3. 전체 단계표

MCP가 반환한 순서다. 스크롤·메뉴·입력·로딩도 각각 한 단계이며 캡처 사이의 클릭·저장·네트워크가 모두 기록되었다는 뜻은 아니다.

| 단계 | Screen ID와 원본 | 확인된 화면 | 다음 캡처와의 관계 |
| --- | --- | --- | --- |
| 01 | [`sc_d76d3680605f4b62ab31e3039d6c4fe6`](https://gummble.com/screens/sc_d76d3680605f4b62ab31e3039d6c4fe6?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 발행 글과 반응 있는 프로필 | 설정 상단 — 주요 설정 진입점 |
| 02 | [`sc_ddd51660cb8346a1b200ed970a2d5c45`](https://gummble.com/screens/sc_ddd51660cb8346a1b200ed970a2d5c45?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 설정 상단 | 설정 하단 — 설정과 앱 버전 표시 |
| 03 | [`sc_c653047933aa40b2be7a8f281643d41d`](https://gummble.com/screens/sc_c653047933aa40b2be7a8f281643d41d?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) | 설정 하단 | 이 흐름의 기록 종료; 2절의 종료 범위 참조 |

## 4. 화면별 상세 분석

### 단계 01 — 발행 글과 반응 있는 프로필

- Screen ID: `sc_d76d3680605f4b62ab31e3039d6c4fe6`
- 원본: [화면 페이지](https://gummble.com/screens/sc_d76d3680605f4b62ab31e3039d6c4fe6?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/0c744b5a-cc2d-4b6b-9221-eb4f52eb4825.png)
- 로컬 이미지: [sc_d76d3680605f4b62ab31e3039d6c4fe6.png](<../../../screens/sc_d76d3680605f4b62ab31e3039d6c4fe6.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `플로우 시작` → 현재 → `sc_ddd51660cb8346a1b200ed970a2d5c45`

#### 화면에서 직접 확인한 내용

- 레이아웃: Stories Public에 기사 카드
- 입력 항목·기본값·표시 데이터: 23h ago, 박수29·응답1
- 버튼·메뉴·안내 문구: View stats, 편집, 글 더보기
- 확인된 상태: 발행 후 반응 집계
- 단계 간 변화: 이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 작성자 기사 목록과 반응 요약. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 조회 시점·집계 지연

#### 모델링 영향

- 후보와 근거: 작성자 기사 목록과 반응 요약. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 조회 시점·집계 지연. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 02 — 설정 상단

- Screen ID: `sc_ddd51660cb8346a1b200ed970a2d5c45`
- 원본: [화면 페이지](https://gummble.com/screens/sc_ddd51660cb8346a1b200ed970a2d5c45?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/142bda9b-2006-415b-bd69-9070968ce9a0.png)
- 로컬 이미지: [sc_ddd51660cb8346a1b200ed970a2d5c45.png](<../../../screens/sc_ddd51660cb8346a1b200ed970a2d5c45.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_d76d3680605f4b62ab31e3039d6c4fe6` → 현재 → `sc_c653047933aa40b2be7a8f281643d41d`

#### 화면에서 직접 확인한 내용

- 레이아웃: Account·Configure Medium 섹션
- 입력 항목·기본값·표시 데이터: Appearance System default 선택
- 버튼·메뉴·안내 문구: 계정·결제·통계·프로필·추천·Push·Email·Custom app icon
- 확인된 상태: 주요 설정 진입점
- 단계 간 변화: 발행 글과 반응 있는 프로필 → 설정 상단. 현재 관찰값: Appearance System default 선택. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 설정 범주별 책임 분리. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 각 계정·결제 하위 화면 미수록

#### 모델링 영향

- 후보와 근거: 설정 범주별 책임 분리. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 각 계정·결제 하위 화면 미수록. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

### 단계 03 — 설정 하단

- Screen ID: `sc_c653047933aa40b2be7a8f281643d41d`
- 원본: [화면 페이지](https://gummble.com/screens/sc_c653047933aa40b2be7a8f281643d41d?source=mcp_result&utm_source=mcp&utm_medium=mcp_tool&utm_campaign=screen_result) · [원본 이미지](https://storage.gummble.com/prod/content/app_screens/b962cd25-aeba-418a-b57f-d184b97c1516.png)
- 로컬 이미지: [sc_c653047933aa40b2be7a8f281643d41d.png](<../../../screens/sc_c653047933aa40b2be7a8f281643d41d.png>)
- 실제 이미지 확인일: 2026-11-18 KST · Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관
- R2 이미지 재검토: 2026-11-18 KST · 로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토
- 이미지 크기: MCP 메타데이터 **390 × 844** / 원본 PNG **1179 × 2556 px**. DPR을 역산해 확정하지 않음
- 이전·다음 단계: `sc_ddd51660cb8346a1b200ed970a2d5c45` → 현재 → `플로우 기록 종료`

#### 화면에서 직접 확인한 내용

- 레이아웃: Social·About Medium·App Controls
- 입력 항목·기본값·표시 데이터: Facebook Connect, Version 4.263.185257
- 버튼·메뉴·안내 문구: Help, 약관, 개인정보, 앱 평가, More app controls, Sign out
- 확인된 상태: 설정과 앱 버전 표시
- R2 보완 관찰·해석: Facebook Connect에는 허락 없이 게시하지 않는다는 안내가 있다. 연결·동의·해제 결과는 수록되지 않았다. More app controls도 메뉴만 확인된다.
- 단계 간 변화: 설정 상단 → 설정 하단. 현재 관찰값: Facebook Connect, Version 4.263.185257. 캡처 사이의 정확한 조작·요청은 미기록이다.

#### 동작과 데이터

- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.
- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.
- 설계 가정: 앱 빌드 관찰값과 카탈로그 버전 구분. 구현 후보이며 확정 스키마·정책이 아니다.
- 미확인: 이 버전이 모든 flow에 동일한지는 미확인

#### 모델링 영향

- 후보와 근거: 앱 빌드 관찰값과 카탈로그 버전 구분. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.
- 확정 전 확인: 이 버전이 모든 flow에 동일한지는 미확인. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.

## 5. 업무 규칙과 데이터 변화

하단에 4.263.185257 버전이 표시된다. 이 값이 다른 모든 흐름의 앱 빌드임을 보장하지 않는다.

| 단계 | 관찰된 상태·값 | 근거의 한계 |
| --- | --- | --- |
| 01 | 발행 후 반응 집계 — 23h ago, 박수29·응답1 | 조회 시점·집계 지연 |
| 02 | 주요 설정 진입점 — Appearance System default 선택 | 각 계정·결제 하위 화면 미수록 |
| 03 | 설정과 앱 버전 표시 — Facebook Connect, Version 4.263.185257 | 이 버전이 모든 flow에 동일한지는 미확인 |

위 표는 보이는 상태 변화다. 성공 토스트가 있어도 외부 계정의 가시성·영수증·서버 저장을 독립 검증한 것은 아니다.

## 6. 공식 도움말과 API 대조

공식 자료는 현재 문서이며 과거 캡처와 시점이 다를 수 있다. 아래 기능 설명의 범위만 대조했으며 내부 API나 제품 전체 규칙을 확인한 것은 아니다.

- [Your profile page](https://help.medium.com/hc/en-us/articles/115004747067-Your-profile-page): 앱에서 이름·사진·160자 소개를 수정한다. 더 긴 About 편집은 웹에서 제공한다. [공통 문서 대조](<../../../SOURCES.md#profile>).
- [Adjust email preferences](https://help.medium.com/hc/en-us/articles/115004745947-Adjust-email-preferences): 이메일 알림 종류와 Digest 주기 설정을 설명한다. 앱의 푸시 토글 전체 계약을 대신하지 않는다. [공통 문서 대조](<../../../SOURCES.md#email>).
- [Sign out of your account](https://help.medium.com/hc/en-us/articles/360011420553-Sign-out-of-your-account): 앱 Settings에서 Sign out을 수행한다. 다른 세션 종료는 별도의 메뉴다. [공통 문서 대조](<../../../SOURCES.md#logout>).

화면에서 관찰한 값·메뉴와 문서에 없는 세부 상태는 구분한다. 미수록 오류·권한·실패 분기는 아래 질문으로 남긴다.

- [API 검토](<../../../SOURCES.md#api>). 이 흐름의 내부 endpoint·요청·응답·DB 스키마는 확인하지 않았다.

## 7. 데이터 모델링 시사점

다음은 관찰에 기반한 구현 후보다. Kostolany의 기능 채택·스키마·업무 정책으로 확정하지 않는다.

- 단계 01: 작성자 기사 목록과 반응 요약
- 단계 02: 설정 범주별 책임 분리
- 단계 03: 앱 빌드 관찰값과 카탈로그 버전 구분

## 8. 미확인 사항과 검토 질문

**원본에 없는 분기·남은 범위:** Account·Membership and payment·Email·Facebook·More app controls의 실제 하위 화면.

- 단계 01: 조회 시점·집계 지연
- 단계 02: 각 계정·결제 하위 화면 미수록
- 단계 03: 이 버전이 모든 flow에 동일한지는 미확인
- 같은 계정·같은 빌드에서 시작 상태를 맞춘 뒤 정상·취소·실패·재진입 결과를 검증해야 한다.

## 9. 검토 이력

| 차수 | 날짜 | 확인·작성 내용 | 남은 범위 |
| --- | --- | --- | --- |
| R1 | 2026-11-18 KST | MCP 3단계와 실제 이미지 3단계 대조. 원본·로컬 파일 연결, 관찰·문서·가정 분리 | 실제 계정 재현·미수록 상태·8절 항목 |
| R2 | 2026-11-18 KST | MCP 3단계 순서 재조회 및 이미지 재검토. 1개 단계의 관찰·표현 보완. 진입·종료·미수록 분기·관련 흐름 및 공식 규칙 대조 추가 | 원본에 없는 8절 분기·실제 계정 동작 |
| 문서 점검 | 2026-11-18 KST | 전체 63개 문서의 단계 순서·이미지 ID·로컬 링크·필수 절 구조를 검증 스크립트로 점검 | 이미지 2차 검토로 계산하지 않음 |
