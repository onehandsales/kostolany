# Goal 19 — 로그인·로그아웃 클론

2026-11-19. 기준 `d016c06`, Goal15 이후 미커밋. 구현·두 차례 자체 검토·자동/브라우저 검증 수행, 원본 폰트/아이콘 차이와 native 검증 대기. 연속 요청에 따라 Goal20으로 진행한다.

## 원본·구현 경계

Logging in ANALYSIS/PNG 01~02, Onboarding의 관련 소개 및 Settings/Logging out ANALYSIS/PNG02~03을 직접 확인했다. [원본 비교](evidence/goal19/COMPARISON.html)는 393×759 앱 영역 기준이다. 로그인은 Medium / Human stories and ideas. / 소개 / 5개 공급자 버튼, 가입 소개는 4개 버튼과 Sign in 링크다. Google만 기존 mock 인증이다. Facebook/Apple/X/Email은 로컬 미연결 안내를 열고 계정·토큰·코드·비밀번호를 만들거나 전송하지 않는다. 시작 splash 표시 시간·실제 Google 성공/계정 선택은 원본에서 확인되지 않았다.

Google 이외도 눌렀을 때 명시된 결과가 있다. 상단 MOCK·닫기, 원본 화면 아래 A/B·결과 선택 영역, 실패/재시도/처리 중은 자체 설계다. 원본 정적 화면과 mock 검증 영역을 숨겨 같은 기능이라고 주장하지 않는다. 정상 Google 버튼은 A 성공을 기본안으로 사용하며 아래에서 B·취소·실패·4초 지연을 고를 수 있다.

로그아웃은 원본의 중앙 Sign out / 설명 / Cancel / Confirm 구조다. mock 결과 선택은 확인창 바깥의 별도 스크롤 영역이다. 이번 캡처의 배경은 기존 프로필이고 원본은 Settings이므로 대화상자 비교와 배경 일치를 구분했다(Goal20에서 설정도 연결/캡처). 로그아웃 후에는 기존 개인 화면 정리 정책에 따라 비로그인 프로필로 복귀한다. 원본의 공급자 소개 자동 진입과는 차이가 있으며 사용자가 다시 로그인 진입을 선택한다.

## 상태와 규칙

AuthStore/Provider는 변경하지 않았다. user ID/revision, 취소·실패의 구분, 원래 화면 복귀, 자동 개인 행동 미실행, 세대 번호로 늦은 응답 무효화, 사용자별 저장소·메모리 수명은 기존 계약이다. 표시용 이름은 ProfileProvider에서 받아 logout 설명의 접근성 hint에 전달하며 인증 이름을 덮지 않는다. UI-only 공급자/가입 모드/안내는 로그인 Modal 수명에 속한다. 처리·오류 중 계정/결과·가입 모드 변경을 잠가 재시도 대상이 바뀌지 않게 했다.

## 1차 검토 → 수정

| 문제 | 수정 |
| --- | --- |
| C19-01 실패 안내가 아래 mock 영역에 있어 Google 위치에서 보이지 않음 | 공급자 버튼 위 alert + 같은 Google 위치의 Try again으로 이동 |
| C19-02 logout confirmation만 accessibilityViewIsModal로 지정해 형제 mock 선택이 숨겨짐 | Modal 전체 SafeArea를 접근성 범위로 지정. 공통 LibrarySheet도 같은 형제 취소 경계 수정 |
| C19-03 스크롤 시 고정 MOCK 표시와 큰 제목이 겹침 | 브랜드/닫기 영역을 실제 고정 헤더로 분리, 최초 본문 좌표는 유지 |
| C19-04 원본 대비 wordmark 폭·공급자 위치 | 전용 Times 계열 대체 글꼴과 providers 상단43으로 조정. 원본 글꼴 확보로 표현하지 않음 |
| C19-05 큰 글자에서 logout mock 선택 영역이 넘칠 가능성 | max-height 영역 내부를 ScrollView로 변경 |

## 2차 검토와 실행

- Node24.10.0 typecheck/lint 통과(`typecheck.log`, `lint.log`).
- `tests-final.log`: AuthNavigation/AuthBoundaryNavigation/createAuthStore/createMockAuthSource/ProfileNavigation/LibraryInteractions **80 tests,12 suites 통과**.
- 이후 추가한 소개 전환·미연결 공급자 안내·닫기·원래 기사 보존 회귀를 포함해 `navigation-recheck.log` **10 tests,2 suites 통과**. 겹치는 실행 수를 합산하지 않는다.
- `browser.json`: 실제 8081의 기사→로그인 닫기/사용자 취소/실패→재시도→원래 기사(저장 자동 실행 안 함), logout 취소/실패/재시도, B 선택, 4초 로그인 중 닫기 후 늦은 응답 무시를 확인했다. console/page error0.
- 정상 signin/signup, 공급자 안내, 실패, 처리 중, A/B, logout 확인/실패,320px와 CSS130%를 실제 캡처했다. CSS 확대는 OS Dynamic Type 검증이 아니다. 그림 대조와 코드 재검토는 테스트 실행과 별도다.
- 초기 실패 로그는 접근성 범위 결함 및 브라우저가 로그인 완료 전 배경 heading을 기다린 문제를 기록한다. 최종 브라우저는 실제 저장 컨트롤이 로그인 상태로 바뀌는 조건을 기다린다.

## 차이와 미검증

원본 브랜드/본문 글꼴과 SVG 로고의 정확한 경로는 미확보여서 시각 차이가 남는다. 상단 MOCK/닫기, 공급자 안내, A/B/실패 UI, 최소48 터치, 고정 브랜드 헤더, 로그아웃 후 비로그인 복귀는 자체 구현이다. 실제 이메일/코드/가입·OAuth·공개 계정·결제는 제외했다. source state와 mock state를 같은 인증 완료 증거로 취급하지 않는다.

iOS Xcode/simctl·Android SDK/adb/emulator 부재로 실제 native 실행/빌드·OS 포커스/스크린리더·큰 글자 검증은 대기. Jest iOS/Android와 브라우저만으로 native 완료라 하지 않는다. JS/Hermes는 Goal21에서 재실행한다.

8081: 기사 하단 북마크 → Google(모의). 화면 아래 mock 영역에서 A/B·결과를 바꿀 수 있다. 실패 시 같은 위치 Try again, X로 취소, Create account/Sign in으로 소개 모드 전환. 로그인 후 프로필의 로그아웃에서 Cancel/Confirm과 하단 mock 결과 선택을 확인한다. 커밋/push/배포 없음.
