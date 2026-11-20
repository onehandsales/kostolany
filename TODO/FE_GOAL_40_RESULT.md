# Goal40 — mock 가입·로그인·이메일 코드·세션·로그아웃

2026-11-20 KST · Windows · 시작 HEAD `3c4adb220d2aef98ed4a37f3b51ba95dc839aafa` · Goal39 커밋 후 작업 트리 변경 없음.

상태: **구현 완료·검증 잔여**. 이번 mock 구현·두 차례 자체 검토·현재 환경에서 가능한 필수 검사를 마쳤다. 원본 동일 시각·실제 native/OS 검증은 남는다. Goal40 변경만 로컬 커밋하고 종료한다. 실제 OAuth/이메일/토큰/계정 생성·외부 연동·배포와 Goal41 온보딩은 포함하지 않는다.

## 화면·흐름별 상태

| 대상 | 구현·검증 |
| --- | --- |
| 가입/로그인 소개 | 가입 Google/Facebook/Apple/Email4개, 로그인 X 포함5개를 표시한다. 전환 시 스크롤을 처음으로 되돌린다. 기존 Google만 인증하던 안내 버튼을 공통 mock 세션 명령에 연결했다. |
| 소셜 경로 | Google/Facebook/Apple/X의 선택 제공자·처리 중·사용자 취소·실패·같은 제공자로 재시도를 연결했다. 모의A/B 선택과 진입 context는 보존한다. 실제 공급자 OS/웹 인증 화면은 호출하지 않는다. |
| 이메일 입력 | 가입은 예시 이름+이메일, 로그인은 예시 이메일을 입력한다. 예시A/B 버튼, 빈 입력 상태, 잘못된 fixture, 요청 실패/재시도와 입력 보존을 제공한다. 실제 이메일/이름을 요구하지 않는다. |
| 코드 화면 | 여섯 자리 코드·길이/형식·잘못된 값·만료·재전송·중복 제출·검증 실패/재시도를 연결했다. 한 입력을 여섯 칸으로 표현해 붙여넣기/지우기와 접근성 이름을 유지한다. |
| 닫기·뒤로 | 명시적 닫기는 원래 공개 화면으로 돌아간다. 코드에서 뒤로/Escape는 이메일 폼, 다음 뒤로는 제공자 화면이다. 이전 인증 요청을 무효화하고 폼 입력은 필요한 범위에서 유지한다. |
| 성공 후 복귀 | 인증만 확정하고 원래 화면으로 돌아간다. Write/저장/박수/발행은 자동 재실행하지 않는다. 사용자가 다시 누른다. |
| 로그아웃 | 확인·취소·실패·재시도를 보존하고 성공 후 가입 intro로 전환한다. intro 닫기로 기존 공개 화면을 계속 볼 수 있다. 이전 개인 화면/시트/오류는 정리한다. |
| 계정·작성 데이터 | A→B→A, 같은A 재로그인에서 계정별 확정 초안·목록은 보존하되 화면 입력/코드/시트는 초기화한다. 발행 중 로그아웃의 늦은A 응답을 격리하고 이미 확정한 발행 글은 삭제하지 않는다. |
| 새 실행 | 전체 새로고침/앱 재실행은 mock 인증·challenge·메모리 개인 데이터/글을 초기화한다. 자동 저장이나 초기 사용자 fixture 주입을 영구 세션 복구로 표현하지 않는다. |

## 인증·권한·수명 계약과 정책 변경

- AuthStore가 유일한 세션 사실 상태를 소유한다. 이메일/제공자 화면은 별도 세션을 만들지 않는다. AuthSource의 signIn 입력에 선택 provider를 전달하고 실패 재시도는 그 제공자와 user ID를 보존한다.
- user ID는 기존 `example-reader`/`example-reader-b` 소유권이다. 표시 이름은 기존 계정 선택용 고정 이름이며 수정 가능한 Profile.name과 분리한다. 모의 가입은 기존A/B로 인증하며 새 계정 생성이나 프로필 덮어쓰기를 하지 않는다.
- 예시 `reader.a@example.test`/`reader.b@example.test`와 대응 이름만 허용한다. 실제 주소·비밀번호·토큰·코드는 수집하지 않는다. 기본 모의 코드는123456부터 요청마다 달라지며 화면에 명시한다. 기본 지연250ms, 유효기간5분은 자체 mock 정책이다.
- AuthStore의 loginAttempt는 로그인 화면 수명, generation은 진행 중 인증/로그아웃 요청, revision은 확정 로그인 세션 수명이다. EmailAuthSource의 attemptId는 이메일 작업 범위, challengeId는 발급 코드, generation은 재요청 순서다. 문서의 draft/story ID·문서 버전/저장·발행 작업 ID와 섞지 않는다.
- 이메일 폼/코드는 EmailAttempt 화면 상태다. request/verify Promise는 busy로 중복 실행을 막고 sequence·lease·인증 attempt/revision을 함께 확인한다. source도 취소/재전송/만료를 검사한다. 다른 이메일/계정의 challenge 응답은 현재 시도를 완료하지 못한다.
- 재전송 요청 시작 시 기존 challenge를 즉시 무효화한다. 실패하면 입력 코드는 남지만 검증할 challenge는 없고 재전송을 다시 요청한다. 성공 시 코드 입력을 비우며 새 코드만 유효하다. 유효시간은 검증 시점에도 검사한다.
- 검증 성공 후 공통 signIn이 실패한 경우 같은 challenge로 재검증/재시도할 수 있다. 실제 세션 확정 또는 닫기/이탈 후 시도를 폐기한다. 별도 인증 토큰은 만들지 않는다.
- 이메일 변경/뒤로/닫기/unmount/계정 변경은 AbortController와 source.cancel로 challenge/타이머를 정리한다. 기존 소셜 AuthSource는 AbortSignal 계약이 없으므로 진행 timer의 물리 취소 대신 generation으로 늦은 성공/실패 반영을 거부한다.
- **로그아웃 정책 변경:** 기존에는 공개 화면만 남겼지만 원본 F61의 확인→intro를 반영해 성공 직후 가입 intro를 표시한다. 공개 navigation 자체는 보존하고, 자체 보완한 닫기로 계속 읽을 수 있다. 취소/실패는 현재 사용자와 개인 데이터/화면을 유지한다. 로그아웃은 계정·초안·발행 글 삭제가 아니다.
- **인증 source 교체 정책 변경:** 초기 source 고정 정책을 확장해 실제 공급부 교체는 이전 요청을 무효화하고 현재 사용자 ID를 보존하면서 revision을 증가시킨다. 이전 개인 화면/코드/오류는 폐기한다. 프로필 이름/기본 설정 변경은 source 교체가 아니므로 revision/public navigation을 초기화하지 않는다.
- 새 앱 실행의 기본 세션은 null이다. 테스트의 initialUser는 mock 시작 조건이며 저장소/토큰 복구가 아니다. 기존4단계 설명·기본 설정·개인 저장소 계약은 보존한다. Goal38 자동 저장·Goal39 발행 데이터도 앱 메모리 수명이다.

## 원본 관찰·공식 설명·자체 보완

- `medium/README.md`, `REVIEW_R2.md`, `SOURCES.md`, Logging in/Onboarding/Profile/Settings/Logging out의 관련 ANALYSIS와 실제 PNG를 대조했다. F56/F57의 계정 표시/프로필 편집과 F58 설정 진입은 기존 프로필 소유권 및 현재 인증 화면과 구분한다.
- F52/F53: 가입 `sc_d55739aa2ac1495da026006235e7c0a7`, 로그인 `sc_e4d414380a1047a2b7970cf7869a0866`, 이메일 `sc_da2ab413cfe5481d9abe4f23eeaeb426`/`sc_1d3dc01005c343c18427fe2c199e4075`, 가입 폼 `sc_a4438be77c814444b7f0c005ee44e8b6`/`sc_4510def6bbb1459ab0b5f18d07b8427e`, 코드 `sc_10e0a1c6f1154b3b85f8d5ed18b692d7`/`sc_bc8c0aff71644874a42b97e6c7fd4ce2`/`sc_55d8ee5f826740d69ebd2e163aaa6486`를 확인했다.
- 코드 빈 화면의 sign up 문구가 로그인 흐름에도 등장하는 불일치는 분석 이력대로 구분했다. 앱은 실제 진입 모드에 따라 sign in/up을 표시한다. 보관 캡처의 개인정보와 코드를 제품 fixture로 복제하지 않았다.
- F61: `sc_2d1afd7a02a347868564f9757753d077` Sign out 확인→가입 intro를 대조했다. 원본의 Settings Version4.263.185257은 해당 캡처 표시값이며 카탈로그 Latest1419나 현재 앱 버전과 동일시하지 않는다.
- [Sign in or sign up](https://help.medium.com/hc/en-us/articles/115004915268-Sign-in-or-sign-up-to-Medium), [Sign out](https://help.medium.com/hc/en-us/articles/360011420553-Sign-out-of-your-account)를2026-11-20 조회했다. 현재 공식 설명은 소셜/이메일·앱6자리/Validate·비밀번호 미지원, 현재 기기 로그아웃과 다른 세션 로그아웃을 구분한다. 공식 링크2시간 만료를 코드5분 정책의 근거로 삼지 않는다.
- Gummble의 invalid/expired/resend 검색은 exact0, 관련3개를 반환했다. 기존 가입 코드 `sc_55d8...`, 목록 삭제 확인 `sc_a156...`, 로그아웃 `sc_2d1...`이며 새로운 만료/실패/재전송 완료 화면은 확보하지 못했다. 다른 화면을 인증 근거로 사용하지 않았다.
- 자체 보완: fixture 이름/이메일/코드,5분,에러/재시도 문구, 요청/취소 세대, 모의 계정 선택/시나리오, 코드 뒤로, intro 닫기, 비활성 입력 조건, source 교체 수명. 실제 약관 동의/계정 생성·이메일 링크 발송 화면은 구현했다고 주장하지 않는다.
- 관심사·추천 팔로우·알림·멤버십 온보딩은 Goal41 이후다. 이번 mock 인증 성공은 원래 화면 복귀까지만 연결하고 후속 기능은 시작하지 않는다.

## 두 차례 자체 검토·결함과 회귀 검사

1. 1차 자체 검토: 기존 제공자 안내/세션 분리·challenge 수명·계정 응답 대조·중복 요청·만료/재전송·실패 입력 보존을 검토했다. 다른 user ID의 challenge를 거부하고 Modal requestClose를 코드→이메일→제공자 뒤로 동작에 연결했다. ref 전달의 lint 규칙 위반은 명시적인 Ref 이름으로 수정했다.
2. 2차 자체 재검토: 수정한 코드/검사와 실제 브라우저·원본 비교를 대조했다. 가입/로그인 전환 후 이전 스크롤 때문에 제목이 사라지는 결함을 scrollTo(0)으로 수정했다. 코드 시트 상단/칸 배치를 보정했다. 전체 검사에서 Digest만 교체하는 테스트가 auth source도 매번 생성하던 혼합 조건을 발견해 인증 fixture를 고정하고 실제 auth source 교체의 늦은 성공을 별도 실제 navigation 회귀 검사로 추가했다. 독립적인 제3자 검토가 아니다.

## 검사 결과와 기준

- 환경: Node24.18.0/npm10.9.0, Expo57/RN0.86.3/React19.2.3, Windows PowerShell, Edge headless. 기존8081 PID5248을 보존했다. 의존성/ENV/native 설정을 변경하지 않았다.
- 기존 AuthNavigation/SettingsNavigation/createAuthStore 검사는 변경한 intro 복귀를 확인한 뒤 닫고 기존 공개 흐름을 검사하도록 수정했다. 기존 안내 검사도 실제 이메일 입력/취소 검사로 바꿨다.
- 추가 `emailAuth.test.ts`: fixture/이름/코드/만료/재전송/중복/실패 보존/공통 세션/계정 응답/늦은 성공·실패·취소를 검사한다. `EmailAuthNavigation.test.tsx`: 실제 navigation의 이메일 가입→코드→원래 화면→다시Write, 네 소셜 경로·로그아웃intro, 시스템 뒤로·source 교체·늦은 제공자 성공/재시도를 검사한다. navigation 자체는 mock하지 않았다.
- 초기 관련10suites/80tests PASS151.149초 뒤 추가 보완을 수행했다. 최종 보완 영향 검사6suites/28tests PASS38.153초. 이전 수치를 최종 전체 검사로 대체하지 않는다.
- 최종 `npm.cmd run check`: **타입/lint·전체190suites/1092tests PASS**, Jest 691.805초, `goal40-check-final.log` 기준이다. 마지막 제품/테스트 수정 뒤 실행했고 이후 문서만 확정했다. 실패한 중간 실행은 Digest fixture 수정 전에 중단했으며 통과 기록으로 계산하지 않는다.
- 최종 Jest에는 `act(...)` 경고15건이 남았다: iOS AuthBoundaryNavigation의 VirtualizedList1건과 양 플랫폼 ResponsesNavigation 각7건이다. 모두 통과했지만 경고 없는 검사로 표현하지 않는다. 실제8081의 console/page 오류0과 별개다.
- `browser40.py`6흐름, `failures40.py`4흐름 PASS, console/page 오류0. 정상·가입/로그인 전환·길이/잘못된/이전 코드·요청/검증 실패 재시도·모든 소셜 취소/실패·늦은 인증·intro·B/A·A 발행 중 전환·같은A 메뉴 초기화·새로고침을 실제8081에서 조작했다. 브라우저 만료는 통제한 expired-code 응답, 만료 시각 경계는 주입한 clock과 짧은 유효기간을 사용하는 저장소 검사로 구분한다.
- `reference40.py`에서 이메일/코드의 합성 `isComposing=true` Enter가 제출하지 않고 일반 Enter는 제출하는 것, 설정의 실제 로그아웃 확인/취소를 추가 확인했다. 설치된 RNW TextInput의 composition/keyCode229 제출 방어와 대조했다. 실제 OS 한글 IME·클립보드/키보드 검증으로 표현하지 않는다. 이 추가 브라우저 검사도 console/page 오류0이다.
- 최종 제품 코드의 `npx.cmd expo export --platform all --output-dir <외부임시>/export40`에서 web JS/iOS·Android Hermes export PASS. 이후 변경은 테스트 fixture/회귀 검사이며 제품 코드는 같다.

## 시각·모바일·플랫폼 차이

- 외부 임시 경로: `C:\Users\leehg\AppData\Local\Temp\kostolany-goals37-40-bafd1b1de3db45efb8a382e232817076`. sources40, browser40/failures40 JSON, 실제 캡처, pairs40 및4쌍 pair/overlay/diff, 검사/export 로그를 둔다. 저장소 안에 evidence/캡처/별도검증 스크립트를 만들지 않았다. 임시 파일의 영구 보존은 보장하지 않는다.
- 비교: 보관 PNG1179×2556→393×852, 상단59/하단34 제외한393×759와 웹393×759 DPR1을 대조했다. 가입 제목 글자 영역(회색값100미만)은 원본 `(69,119,256×32)`, 구현 `(62,120,268×31)`로 폭12px/y1px 차이다. 구현 이름/이메일 입력은 각각 `(24,195,345×48)`/`(24,287,345×48)`, 코드 입력 `(32,222,329×64)`, Validate `(32,342,329×48)`, Resend `(32,422,329×48)`다. 로그아웃 Cancel/Confirm 높이는48이다. 이름·이메일·코드는 fixture 차이이며 source 개인정보로 맞추지 않는다. 서체/wordmark·벡터, 추가 닫기/뒤로/mock 안내·예시 계정 버튼, 빈 폼 버튼 비활성·약관 문구, 코드 상단/키보드 없는 화면 차이가 남는다. 임의의 일치율로 동일 재현 완료를 주장하지 않는다.
- 작은 폭320×600,긴 한국어 안내,Dark,CSS160%,48×48 버튼/아이콘·64px 코드 입력 영역, 스크롤·모달 닫기·Escape를 확인했다. 시각 코드 칸은 개별 터치 입력이 아니라 하나의 큰 접근 가능한 TextInput이다. 실제 native 키보드·Safe Area·OS 글자 확대/스크린리더 검증은 아니다.
- Windows에서 `Get-Command java,adb,gradle,xcodebuild` 결과 없음, FE/android·FE/ios 없음. iOS는 macOS+Xcode/Simulator, Android는 JDK/SDK+기기에서 build/run·OSIME·키보드 가림/닫기·VoiceOver/TalkBack·Safe Area를 추가 확인해야 한다. Jest의 두 플랫폼과 Hermes export는 설치·실행 증거가 아니다.

## 8081 최종 확인 순서

1. 새로고침 → Write a story → 가입/로그인 전환. 가입4/로그인5경로와 선택 상태를 확인한다.
2. Email → 예시A 사용 → 계속/가입 →5자리 비활성/000000 오류 → 화면의 모의 코드 입력 → 재전송 → 이전 코드 거절/새 코드 성공. 실제 이메일·코드를 사용하지 않는다.
3. 인증 후 편집기가 자동으로 열리지 않는지 확인 → 다시Write → 제목/본문 입력 → 나가기 → 프로필 Drafts에서 저장 문서 확인.
4. 로그아웃 취소 → 다시로그아웃 → 모의 실패/재시도 → 가입intro → Sign in → 예시B 이메일 로그인 → B의 개인 초안 분리 확인.
5. 로그아웃 → 각 소셜 제공자로 로그인. 모의 사용자 취소/실패/느린 성공 중 닫기를 확인 → A 복귀 시 확정 초안은 남고 이전 코드/시트는 없는지 확인.
6. 코드 화면에서 뒤로/Escape→이메일→제공자→닫기. Dark/작은 폭에서도 제출·재전송·닫기에 접근한다. 전체 새로고침 후 인증/메모리 초기화를 확인한다.

최종 커밋 뒤 종료하며 push·배포·Goal41 이후 작업은 하지 않는다. mock FE 구현을 실제 서비스 연동·출시 완료로 표현하지 않는다.
