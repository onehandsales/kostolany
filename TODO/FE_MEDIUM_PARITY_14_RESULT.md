# Medium Parity 14 — 인증·온보딩 결과

**묶음18 S043 인계 갱신:** [시작 자산/구성·현재 웹과 native 경계](FE_MEDIUM_PARITY_18_RESULT.md). 파일/JS 시작 UI/플러그인 구성은18에서 보완했다. Georgia 대체 wordmark와 실제 native cold start는 각각18/Q02·21/Q07 잔여이며14 인증/온보딩 분기는 유지한다. 아래 splash 미구현 기록은14 당시 상태다.

2026-11-24 KST. 시작 HEAD `6bbe3354224341b228c546ba16837c6d1ad78fe0`(`main`), staged/작업 트리 비어 있음. 묶음13 커밋을 실제 이력과 대조했으며 기존8081 PID22023을 보존했다. 이번 범위는 V29/V30 하나이고 묶음9~13의 잔여·소유권을 유지한다. 최초 구현에서는 커밋·push·배포·묶음15를 진행하지 않았다. 후속 사용자 요청의 로컬 커밋 검토는 아래 최신 절을 따른다.

<a id="pre-commit-review"></a>
## 커밋 전 추가 검토 — 2026-11-24

후속 요청에 따라 묶음14의 전체 diff·실제 호출부·요구 연결·검사 기록을 다시 자기 검토했다. 추가 코드 결함은 발견하지 못했다. 이메일 요청/검증/재전송과 취소, 온보딩 재연결·source/계정 경계, 추천의 kind:id·Mute/Block 조회, 관심사 초안/확정 관계, 약관 왕복과 보호 화면 정리를 확인했다. 독립 리뷰는 수행하지 않았다.

- 새 실행: Node24.18.0에서 `npm run typecheck`, `npm run lint` 각각 종료0. 이메일/온보딩 store와 EmailAuthNavigation·OnboardingNavigation·AuthBoundaryNavigation·BookmarkNavigation을 `npm test -- --runTestsByPath`로 양 플랫폼에서 재검사해 **12 suites/82 tests,36.694초 통과**, 실패·skip·act 경고0.
- 기존 최종 전체316 suites/1722 tests 이후 FE 코드 변경이 없으며, 기존552개 codeInputs 해시의 불일치0을 확인했다. 이번에는 관련 검사만 새로 실행했다. 전체 테스트·브라우저·Hermes를 이번 재검토에서 재실행한 것으로 기록하지 않는다.
- 문서의 미커밋 기록을 최초 실행 이력으로 구분하고 이 절·현재 인계·baseline의 추가 검토 기록을 연결했다. 원본 관찰/ID/과거 증거/readiness와 묶음9~13 담당은 유지한다. 시각 자산·S043·실제 native/OS/IME 대기는 앞선 판정대로 남는다.
- 커밋 범위는 이 결과를 포함한36파일(FE 구현7·회귀5·문서/추적24)이다. 기존 HEAD6bbe335·staged0을 확인했으며 사용자 요청으로 검토된 묶음14 변경의 로컬 커밋만 승인됐다. 해시와 성공 여부는 실제 Git 결과를 따른다. push·배포·묶음15 구현은 수행하지 않는다.
- 다음 작업은 실행 계획의 묶음15(D12/V32, 프로필·게시 경과 시간)다. 선행2/9/14를 대조하되9~14의 잔여를 기존 담당에 유지하고 독립 가능한 배정 범위만 새 요청으로 진행한다. 이번 커밋은 선행 전체 동일성 완료 승인이 아니다.
- tools·별도 검증 스크립트·evidence·캡처·검증 로그·manifest 생성/복원 없음. 8081은 기존 PID22023으로 유지한다.

| 판정 축 | 현재 판정 |
| --- | --- |
| 기능 | mock 인증/온보딩의 연결·수명·누락 UI 보완. S043 native 시작 화면은18/21 담당 잔여 |
| 자동 검사 | 타입/lint·최종 전체316 suites/1722 tests 통과, 실패/skip/act 경고0. JS 구문·Hermes 컴파일 통과; native 실행과 구분 |
| 시각 비교 | 원본16 PNG 직접 확인, 실제8081 인증/온보딩을 부분 대조. 폰트·자산·OS 영역·정확 배치가 달라 동일성 완료 아님 |
| native | 실제 iOS/Android 빌드·실행/권한/IME/접근성 미실행. 환경·담당·종료 조건 아래 명시 |

AGENT/README, 공통·UX, FRONT_AGENT README/6규칙, 선행2,5의 추가 재검토,9의 AuthBoundary 경고 인계,13의 커밋 전 추가 검토를 읽고 실제 코드와 대조했다. 현재 실행 기준은 EXECUTION_PLAN이며 과거 Goal40/41은 계약 이력이다. 독립 리뷰어를 사용하지 않았으며 아래 두 검토는 자기 검토다.

<a id="screens"></a>
## 화면·요구·흐름 연결

직접16 S / **99 R / 19 T / 19 U / 19 C**. 표의 모든 R을 대조했으며 기능·원본 관찰·미확인·native를 분리한다. 원본은 Logging in, Onboarding, Profile/Settings/Logging out의 ANALYSIS와 실제 PNG다. 같은 S013 빈 코드가 두 흐름에 수록돼 sign up이라고 보이는 사실을 보존하고, 실제 로그인 모드는 sign in으로 표시한다. 서로 다른 캡처를 연속 실행의 효과로 확정하지 않는다.

| 화면 | R | 배정된 T | 직접 C/U | 처리·검증/잔여 |
| --- | --- | --- | --- | --- |
| S006 | R-S006-L, R-S006-D, R-S006-S, R-S006-C01 | T-F53-09 | C49, C50; U-S006, U-F53 | 관찰된 5개 선택과 0/1/2/3개 경계, 해제·재선택·진행을 확인. 추가 토픽은 기존 mock. |
| S013 | R-S013-L, R-S013-D, R-S013-S, R-S013-C01, R-S013-C02, R-S013-C03, R-S013-C04 | T-F52-05, T-F53-05 | C46, C47, C48, C67; U-S013, U-F52, U-F53 | 빈 6칸·Validate 비활성·Resend·뒤로/X 확인. 원본 sign up 공용 캡처와 런타임 모드 문구 구분. |
| S024 | R-S024-L, R-S024-D, R-S024-S, R-S024-C01, R-S024-C02 | T-F52-04 | C46, C47, C48, C67; U-S024, U-F52 | mock A/B 이메일 입력·검증·실패 입력 보존·계속·뒤로 확인. 실제 메일/소유권 검증 없음. |
| S034 | R-S034-L, R-S034-D, R-S034-S, R-S034-C01, R-S034-C02 | T-F61-02 | C46, C47, C48, C67; U-S034, U-F61 | Settings→Sign out→Cancel/Confirm·실패·재시도→가입 화면 확인. 메모리 계정 경계 유지. |
| S035 | R-S035-L, R-S035-D, R-S035-S, R-S035-C01, R-S035-C02, R-S035-C03 | T-F53-10 | C49, C50; U-S035, U-F53 | 추천 4항목 순서/소개 보완, 동적 B/Publication ID 분리·Follow/Unfollow·실패 재시도·관리 목록 연결. 아바타 2개 미확보. |
| S041 | R-S041-L, R-S041-D, R-S041-S, R-S041-C01 | T-F53-07 | C49, C50; U-S041, U-F53 | 새 경험 안내·Continue·기존 자산 7개 묶음 확인. 원본 7인 이미지/정확 배치와 다름; 모든 계정 공통 단계로 확정하지 않음. |
| S043 | R-S043-L, R-S043-D, R-S043-S, R-S043-C01, R-S043-V | T-F53-01 | C49, C50; U-S043, U-F53 | 원본 PNG 직접 확인. JS 홈 진입은 native splash와 다름. splash 미구현·18 자산/구현 및21 실제 cold start 검증 대기. |
| S054 | R-S054-L, R-S054-D, R-S054-S, R-S054-C01, R-S054-C02, R-S054-C03, R-S054-C04, R-S054-C05, R-S054-C06 | T-F53-04 | C46, C47, C48, C67; U-S054, U-F53 | 이름/이메일 입력과 약관 왕복, 오류 시 보존·수정·재시도 확인. 예시 이름 제한은 기존 mock. |
| S064 | R-S064-L, R-S064-D, R-S064-S, R-S064-C01, R-S064-C02, R-S064-C03, R-S064-C04 | T-F53-06 | C46, C47, C48, C67; U-S064, U-F53 | 가입 코드 입력·오입력·재전송·Validate·신규 A 온보딩 연결 확인. 메일 발송/실제 인증 없음. |
| S067 | R-S067-L, R-S067-D, R-S067-S, R-S067-C01, R-S067-C02, R-S067-C03 | T-F53-08 | C49, C50; U-S067, U-F53 | 최소3개 안내·0/1/2 비활성/3 활성·선택 초안·뒤로·확정 재개 확인. |
| S117 | R-S117-L, R-S117-D, R-S117-S, R-S117-C01, R-S117-C02, R-S117-C03, R-S117-C04, R-S117-C05, R-S117-C06 | T-F53-03 | C46, C47, C48, C67; U-S117, U-F53 | 빈 가입 폼의 녹색 버튼 유지, 유효 제출은 별도 검증. 누락 Terms/Privacy를 기존 안내 화면에 연결. |
| S134 | R-S134-L, R-S134-D, R-S134-S, R-S134-C01, R-S134-C02, R-S134-C03 | T-F52-06 | C46, C47, C48, C67; U-S134, U-F52 | 로그인 코드 sign in·입력/삭제/붙여넣기·Validate·원래 개인 진입 복귀 확인. 자동 개인 행동 재실행 없음. |
| S166 | R-S166-L, R-S166-D, R-S166-S, R-S166-C01, R-S166-C02, R-S166-C03, R-S166-C04, R-S166-C05 | T-F52-01, T-F53-02, T-F61-03 | C46, C47, C48, C67; U-S166, U-F52, U-F53, U-F61 | 가입 Google/Facebook/Apple/Email 4개·Sign in 전환·닫기·mock 실패/취소/재시도 확인. |
| S171 | R-S171-L, R-S171-D, R-S171-S, R-S171-C01, R-S171-C02 | T-F52-03 | C46, C47, C48, C67; U-S171, U-F52 | 빈 로그인 이메일·녹색 Continue·실제 제출 비활성·뒤로 확인. |
| S182 | R-S182-L, R-S182-D, R-S182-S, R-S182-C01, R-S182-C02, R-S182-C03, R-S182-C04, R-S182-C05 | T-F52-02 | C46, C47, C48, C67; U-S182, U-F52 | 로그인 Google/Facebook/Apple/X/Email 5개 확인. 외부 제공자 화면/실제 OAuth 제외. |
| S184 | R-S184-L, R-S184-D, R-S184-S, R-S184-C01, R-S184-C02 | T-F53-11 | C49, C50; U-S184, U-F53 | Enable/Skip·미지원 오류·다음 멤버십/홈 연결 확인. mock 거절·실패·늦은 응답/A→B→A는 자동 navigation 검사; 실제 OS 권한 대기. |

F52의01~06, F53의01~11, F61의02~03이 직접 배정이다. F52-07/F53-13 Home과 F53-12 멤버십은 도착 연결만 확인했으며17/19 전체로 확장하지 않았다. F61-01 Settings 역시 로그아웃 진입 맥락만 확인했다. F53-01/S043은 원본 관찰과 코드 결손 확인이며 실제 시작 화면 실행 성공이 아니다.

<a id="contracts"></a>
## 계약과 상태 수명

- C46/47: 가입4·로그인5 제공자를 유지한다. A/B fixture 외 이메일·이름은 거절한다. 입력 형식/코드 요청/검증/공통 인증 세션은 별도다. 실계정 생성·프로필 이름 변경·메일 전송 없음. 6칸은 장식 표시이고 접근 가능한 단일 입력에서 숫자6자리 제출·붙여넣기·삭제를 처리한다. 칸 강조는 실제 선택 위치/포커스를 사용한다.
- 코드 만료 기본5분, 요청마다 새로운 mock 코드, 재전송은 이전 challenge 무효화, 요청/검증 busy 중 중복 무시를 기존 source 계약 그대로 유지한다. 만료·오입력·재전송 제한은 원본 미수록이다. 요청 실패 뒤 이메일/이름, 검증 실패 뒤 코드 보존. 뒤로는 코드만 폐기하고 이메일/이름을 보존하며 제공자 화면 왕복/닫기는 폼을 폐기한다.
- `AuthStore` revision은 인증 경계, loginAttempt는 로그인 창 수명, email attemptId/challengeId·sequence·AbortController는 코드 요청 수명이다. 오래된 성공/실패와 source 교체는 현재 세션을 확정하지 않는다. Effect 재연결은 취소된 challenge/busy를 비우고 입력 단계에서 재시작한다.
- C48: 성공 뒤 원래 공개 navigation으로 돌아가며 보호된 개인 행동은 자동 재실행하지 않는다. Logout Cancel/실패는 계정을 유지하고 성공은 보호 route/초안/시트를 비운 뒤 가입 intro를 연다. 같은 A 재로그인도 새 revision이다. A→B→A의 확정 개인 데이터는 같은 실행의 메모리에 보존되고, 전체 새로고침/앱 프로세스 재시작은 초기화하는 기존 정책이다. native 프로세스 재시작은 실행하지 않았다.
- C49/50: A는 new fixture, B는 existing fixture. 신규 가입 또는 started인 미완료 단계만 자동 진입한다. A의 일반 로그인에서 아직 시작하지 않은 온보딩은 강제하지 않으며 프로필 Continue setup으로 재개할 수 있다. 완료 뒤 반복하지 않는다. 새 경험/멤버십 단계는 source의 showWelcome/showMembership 계약이며 원본의 모든 계정 순서로 일반화하지 않는다.
- 관심사 초안은 화면 수명, 확정 follow는 계정별 관계 저장소다. 최소3개, Next에서 차례로 확정하며 일부 실패 시 이미 성공한 관계는 롤백하지 않고 선택을 보존해 재시도한다. 이번 자체 보완으로 현재 카탈로그 밖의 기존 topic follow는 Next의 변경 대상에서 제외한다. 보이지 않는 항목을 선택 해제로 간주하지 않으며 원본 미수록 정책임을 구분한다. 닫기/계정/source 교체는 미제출 선택을 폐기한다. 권한·관계 저장 중 OS 뒤로와 버튼 뒤로를 동일하게 잠그고 명시적 X 닫기는 허용한다.
- 추천의 key는 `kind:id`. 검색/공개 프로필/관계 관리와 같은 `useIdentityCatalog`를 소비한다. 자신의 writer만 제외하고 같은 ID의 Publication은 별개다. 확정 프로필 이름을 소비하되 auth revision·소유권을 이름으로 바꾸지 않는다. Mute/Block 조회 중·오류 시 명단을 숨기고 재시도하며 follow/email/mute/block은 별도 상태다. 이미 전송한 follow의 확정은 화면 닫기로 롤백하지 않는다(묶음5 계약). Follow 필수 조건 없이 Finish 허용은 기존 mock 정책이며 원본에서 실행 결과를 확인한 규칙이 아니다.
- 온보딩 session scope는 auth/revision, source, 관계·moderation store, topic/directory source, permission source다. 단계 version과 operationId는 중복·역순·응답 유실 재시도를 구분한다. 재연결 시 이전 pending 대신 확정 단계를 다시 읽는다. source 교체·닫기·계정 경계 뒤 늦은 응답은 새 단계/초안을 덮지 않는다.
- C71: 알림 앱 안내, mock permission, 실제 OS permission은 별개다. 현재 웹 adapter는 unsupported여서 Enable은 오류 안내, Skip은 다음 단계로 이동한다. mock granted/denied/failure/late는 Jest에서 확인한다. 실제 푸시 발송 없음.
- C01/02/03: 대체 시스템 서체·기존 자산/SVG, Light/Dark/System,48px 조작영역·스크롤·입력/포커스를 소비한다. OS Safe Area/큰 글자/IME는 웹 CSS 대조와 구분한다.
- C09/C36/C53/C58~61/C65~67은 기사·다운로드·프로필·오디오·멤버십·설정의 기존 인증 경계와 연결 계약이다. 이번에는 원래 목적지 복귀/자동 재실행 금지·보호 화면 정리·관계/설정/멤버십 진입 영향과 전체 회귀를 확인했다. 다운로드/오디오/멤버십 전체 구현을14의 신규 완료로 재판정하지 않으며 기존 담당8/12/15/18/19의 잔여를 유지한다.

<a id="implementation"></a>
## 결함·수정과 두 차례 검토

| 재현/기대 | 원인 | 수정/회귀 |
| --- | --- | --- |
| 가입 빈/입력 폼에서 Terms/Privacy 없음; 원본 두 링크 필요 | EmailLogin 연결 누락 | 기존 SettingsExtras 안내에 연결, 뒤로/OS 닫기에서 폼 보존. 실제 약관 동의가 아니라 원본 참고 링크라는 고지 유지. EmailAuthNavigation 왕복 검증 |
| 빈 폼 녹색 버튼이 과도하게 흐림 | 제출 유효성과 공통 opacity 결합 | 녹색 시각과 제출 비활성을 분리. 코드 Validate는 기존 비활성 회색 유지 |
| 입력 커서를 옮겨도 코드 칸 강조가 항상 문자열 끝 | 길이만으로 강조 | onSelectionChange/Focus/Blur로 표시. 실제 브라우저 코드 붙여넣기·삭제/화살표·작은 폭 확인 |
| 이메일 요청/온보딩 저장 중 Effect 정리→재연결 후 busy 고착 | 취소 수명만 갱신하고 이전 상태 유지 | 이메일은 입력 단계, 온보딩은 확정 단계 재조회. 두 store 회귀 수정 전2실패/기존12통과, 수정 후 통과 |
| 온보딩에 동적 B 누락, 같은 ID Publication도 본인으로 제외 | 정적 directory만 소비/종류 없는 비교 | 통합 카탈로그·writer만 본인 제외. 실제 navigation의 B Follow 실패→재시도→My following→Unfollow 검증 |
| Mute/Block 로딩/실패 때 필터 전 추천 노출 | directory 상태만 ready 판정 | moderation 상태도 함께 gate, 같은 추천 재시도에서 둘 다 복구. 지연/실패/음소거 B 회귀 |
| 알림 요청 중 OS 뒤로는 이전 단계로 이동 | Modal이 Flow의 로컬 작업 상태를 몰랐음 | 같은 back handler와 operationPending 경계 사용. 실제 navigation의 OS 닫기·명시적 X·A→B→A 늦은 허용 회귀 |
| 현재 카탈로그 밖의 기존 관심사까지 Next에서 해제 | 화면의 selectedIds에서 빠진 모든 이전 관계를 false로 저장 | 현재 카탈로그 ID만 변경 대상으로 제한. 실제 navigation 회귀 수정 전1실패→양 플랫폼 통과; 기존 비표시 관계 보존 |
| topic/directory source 교체 후 선택 초안 잔존 | session boundary에 카탈로그 source 빠짐 | source/store를 세션 수명에 연결. 토픽 교체에서 미제출 Life 폐기 회귀 |
| 추천 원본4항목 중2개/Write A Catalyst 소개 누락 | preferred ID만 있고 공급 데이터 없음 | GeekSociety/Level Up Coding의 관찰 이름·종류·잘린 소개만 보완. 미수록 글/독립 아바타 생성 안 함. 추천 순서 회귀 |
| Publication 원형 사진·추천 구분선/소개 크기 차이 | 공통 작가 스타일 | 사각4px 모서리·목록 footer 구분선·소개16/22 보완. 환영 화면은 확보된 이미지7개를 선택하며 원본7인과 동일하다고 하지 않음 |

1차 자기 검토: 요구 R/T/U/C→호출부→auth/session/source·관계/설정 연결을 확인하고 위 결함을 재현·수정했다. 인증/온보딩 중요 회귀는 기존4파일에 보완했으며 실제 AppNavigator/SessionNavigation을 사용했다. 전체 navigation을 mock하지 않았다.

2차 자기 재검토: diff와 입력/약관 복귀·카탈로그의 kind:id·source/계정 경계·중복/응답 유실·늦은 성공/실패·권한 요청의 back/X 차이·기존 개인 화면 정리를 다시 대조했다. 브라우저에서 발견한 추천 fixture 누락까지 수정하고 관련6 suites/42 tests를 재실행했다. 독립 리뷰가 아니며 원본 자산/native 대기와 기능 결함을 구분한다. 전체 실행에서 재현된 BookmarkNavigation 경고의 예약 타이머 원인도 확인하고 테스트만 보완했다. 추가로 카탈로그 밖 관심사 해제를 RED 회귀로 확인하고 현재 화면 ID만 저장하도록 수정했다. 과거 AuthBoundary의 비재현을 같은 원인의 확정 해결로 확대하지 않는다.

<a id="validation"></a>
## 실제 실행 결과

Node24.18.0(`fnm exec --using=24.18.0`), npm/기존 의존성. 기본 PATH Node22를 사용하지 않았다. 검증 로그 파일은 남기지 않고 stdout/메모리에서 결과를 확인했다.

| 검사 | 이번 결과 |
| --- | --- |
| 수정 전 재현 | iOS emailAuth/onboarding store2파일:2실패·12통과,0.908초. 두 busy 고착 재현 |
| 초기 수정 관련 | iOS4 suites/30 tests 통과,8.25초 |
| 추천 실패 회귀 조정 | Android4 suites 중1실패/3통과,29통과/1실패,10.702초. 관계 실패와 무관한 topic read-error도 켜 My following이 정상 gate에 막힘. 관계 write-error만 주입하도록 테스트 fixture 수정; 앱 기대값 완화 없음 |
| 조정 후 | Android OnboardingNavigation1 suite/12 tests 통과,8.1초 |
| 확장 관련 navigation | 양 플랫폼6 suites/42 tests 통과,33.893초. AuthBoundaryNavigation 포함, act 경고 없음 |
| 타입/lint | 최종 보완 후 각각 종료0. skip/expect 약화/timeout 증가/경고 숨김 없음 |
| 중간 전체 | iOS158 suites/860 tests 통과,231.93초, act0. 추천 fixture/마지막 회귀 보완 중 실행돼 최종 검사로 재사용하지 않음 |
| 전체 재실행 중단 | iOS는40개 파일 PASS 출력 뒤 결과 JSON 없이 프로세스 종료(code=null). assertion 실패 출력 없음. 당시 수집기가 signal을 기록하지 않아 원인 확정 불가; 통과로 집계하지 않음 |
| 이후 Android 전체 |158 suites/860 tests 통과,237.455초. BookmarkNavigation에서 VirtualizedList act 경고1건을 별도로 확인 |
| 경고 원인/수정 | RN VirtualizedList의50ms 예약 콜백(_updateCellsToRender,1806행)이 실제 타이머에서 act 밖 실행. BookmarkNavigation만 fakeTimers와 userEvent.advanceTimers로 제어; navigation/기대값 유지. 관련4 suites/20 tests,14.87초 통과·경고0 |
| GC 재실행 이력 | iOS158 suites/860 tests 통과,250.558초·act0. 이후 카탈로그 밖 관계 결함 발견으로 이어진 Android를 SIGINT로52.948초에 중단(3개 PASS 출력), 완료로 집계하지 않음 |
| 추가 RED | iOS 현재 카탈로그 회귀1실패,3.823초. 이름 필터 밖12건은 해당 실행 미실행이고 코드 skip 추가 없음 |
| 추가 수정 후 관련 | 양 플랫폼 Onboarding/BookmarkNavigation4 suites/36 tests 통과,16.339초. 타입/lint 재실행 종료0 |
| 최종 전체 iOS |158 suites/861 tests 통과,237.878초·실패/skip/act 경고0 |
| 최종 전체 Android |158 suites/861 tests 통과,237.762초·실패/skip/act 경고0 |
| Metro production JS | 기존8081 web/iOS/Android HTTP200·메모리 vm.Script 구문 통과:4,790,191 /5,905,018 /5,913,381 bytes |
| Hermes | iOS/Android `hermesc -dump-bytecode -O0 -` stdin 컴파일 종료0·오류0, stdout36,248,968 /36,270,790 bytes를 메모리에서 소비. 각35개 RN 전역 변수 선언 경고(Promise 등); 실제 런타임 오류/기기 실행과 구분 |

중단 뒤 재실행은 `caffeinate -i`와 Jest `--logHeapUsage`를 추가했다. 로컬 jest-runner/runTest.js415행에서 이 옵션이 노출된 gc를 파일 사이에 호출함을 확인했다. 절전 방지/메모리 회수를 위한 실행 옵션이고 테스트 기대값·timeout 조정이 아니다. 원래 중단을 OOM 또는 절전으로 확정하지 않는다.

9의 AuthBoundaryNavigation 및13의 과거 간헐 act 경고는 이번 재현 여부와 원인 해결을 구분한다. 재현되지 않으면 과거 경고를 해결했다고 닫지 않고14/22 추적에 유지한다. 실제 native 빌드/실행은 별도 대기다.

<a id="comparison"></a>
## 브라우저·원본 대조

현재 Document Control 연결 세션0을 확인한 후 별도 임시 프로필의 Chrome158.0.8127.38 headless/CDP로 기존8081을 조작했다. 원본1179×2556 물리px/보관390×844 metadata, 이번393/320×852 및320×640 CSSpx·DSF1을 구분한다. OS 영역 없는 웹이며 원본 기기/DPR/시각은 미확인이다. 고정 JS시계를 사용하지 않았다. 비교용 캡처는 메모리에서만 열람하고 파일로 저장하지 않았다.

- 가입4/로그인5 선택, 이메일/이름 입력, 잘못된 이름 검증·입력 보존, Terms/Privacy 안내 왕복, 요청 실패1회/재시도, 잘못된 코드·재전송, 코드 뒤로 시 이메일 보존·제공자 재진입 시 빈 폼을 직접 확인했다. 코드 화면 sign up/sign in을 모드별로 확인했다.
- 코드 입력에 CDP 텍스트 입력, Backspace/ArrowLeft 키, browser clipboard의 mock 코드 붙여넣기를 사용했다. 실제 한국어 OS 조합/모바일 키보드 검증이 아니다. 긴 한국어 이름은 합성 입력/검증 오류 보존으로만 확인했다.
- 관심사0/1/2 비활성,3/5 활성,선택 해제/재선택,Next→추천,GeekSociety Follow/Unfollow·Publication Follow→Finish→알림 미지원 오류/Skip→멤버십 열기/닫기→Continue reading을 확인했다. 개인 Write 행동은 자동 실행되지 않았다. 기사에서 느린 로그인 중 X→늦은 성공 무효화·제공자 취소·실패/재시도 후 같은 기사 복귀를 확인하고157000 박수 기준값 유지로 자동 박수 미실행도 확인했다. My following에서 동일 Publication과3토픽을 확인했다.
- Settings→Logout Cancel,실패,Retry→signup intro→B(온보딩 강제 없음)→logout→이메일 A를 확인했다. 전체 새로고침은 guest/Home과 메모리 초기화로 돌아간다. 앱 프로세스 종료/재실행은 native 환경 대기다.
- 가입 제공자와 코드 화면320/393×852·Light/Dark에서 수평 overflow 없음(각320/393),뒤로/X48×48·Validate/Resend 높이48 확인. 320×640 CSS 글자1.6배 진단에서 문구 줄바꿈과 세로 스크롤을 확인했다. 이를 OS fontScale/Dynamic Type/VoiceOver/TalkBack/IME 완료로 표현하지 않는다.
- 브라우저 메모리의 이메일 source.request를1회 실패하도록 바꾼 뒤 해당 호출에서 원래 함수로 즉시 복원했다. 제품 파일/fixture 정상값은 바꾸지 않았다. 추천 Follow 후 자동으로 열린 메뉴가 원래 버튼을 aria-hidden 처리해 자동 조작 selector가1회 실패했으며, 열린 Unfollow 메뉴로 계속 확인했다. 이는 앱 오류가 아니고 console 오류와 구분한다.
- 최종 추천320×640 Dark, 환영7개 이미지393×852 Light·관심사/Next48px·Sign out393×852 Light 모달도 실제 렌더로 대조했다.
- 원본과 남은 차이: 시스템 대체 서체·wordmark, OS status/home 영역, 추가 MOCK/예시계정/재개/오류/닫기 UI 높이, 원본과 다른 합성 이메일·이름·코드, 환영7인 이미지/정확배치, GeekSociety/Level Up Coding 아바타2개, 추가 토픽/추천 전체 목록과 순서의 자체 mock 범위. 없는 원본 자산을 다른 사람 사진으로 위장하지 않았다.
- S043은 app.json에 대응 splash 설정이 없으며 assets/splash-icon.png 존재를 구현 완료로 취급하지 않는다. 새 native splash 정책/타이머를 추측해 추가하지 않았다.

<a id="remaining"></a>
## 남은 항목·담당·종료 조건

| 잔여 | 이유/영향 | 담당·종료 조건 |
| --- | --- | --- |
| 16 S의 U-S 및 U-F52/F53/F61 | 실제 OAuth·가입 validation·코드 만료/재전송/세션,추천 랭킹/필수follow/관심사 저장,OS알림·logout효과는 정적 원본 미수록 |14/Q04/Q06/22. 추가 원본/정책 근거 확보 후 대조. mock 통과로 원본 확인 승격 금지 |
| 시각 자산·정확 배치 | 원본 폰트/독립 wordmark·아바타2개/환영7인 이미지와 OS 조건 미확보 |14/Q02/22. 자산·동등 비교 조건 확보 후 실제 렌더 재대조 |
| S043 cold start | native splash 설정 미구현; JS Home과 다름 |18에서 자산/구현,21에서 실제 iOS/Android cold start·세션 진입 확인,14 연결 최종 판정 |
| 실제 iOS | 현재 xcode-select=CommandLineTools,simctl 없음; iOS 네이티브 프로젝트/실행 환경 없음 |21/Q07와14. 전체 Xcode·Simulator/기기에서 build/run·Safe Area·키보드·권한·OS 접근성 확인 |
| 실제 Android | SDK/adb,ANDROID_HOME/SDK_ROOT 없음,FE/android 없음. JDK17/21/23/11은 설치됨 |21/Q07와14. SDK/build-tools·emulator/기기·native 프로젝트 준비 후 build/run·Back/IME/권한/접근성 확인 |
| 간헐 VirtualizedList act | 과거9/13 기록과 이번 실행을 구분; 비재현만으로 원인 해결 확정 불가 |14/22. 전체 실행 조건에서 재현 시 timer/act 원인 확인·수정·회귀 |
| 묶음9~13 잔여 | 편집/응답/선택/오디오/공유의 구현·시각·원본/native 잔여는 이번 대상 아님 |각 기존 담당 유지.14 진행은 선행 전체 종료 승인이나 잔여 이전이 아님 |

<a id="walkthrough"></a>
## 8081 최종 확인 순서

1. 새로고침→Home→Write a story→Create account. 가입4개 제공자,Sign in에서5개를 확인하고 Email로 들어간다.
2. 빈 폼의 녹색 버튼/제출 비활성, A 예시 입력,Terms/Privacy 왕복·입력 보존을 확인한다. 모의 이름을 바꾸어 제출 실패 후 수정한다.
3. 예시 A로 코드를 요청한다. 화면의 mock code만 사용해5자리 비활성/잘못된6자리 오류/Resend 후 이전코드 거절/새코드 성공을 확인한다. 뒤로·X·재진입 시 입력 정책을 확인한다.
4. 신규 가입 A→Welcome→관심사0/1/2/3/5→해제/재선택→Next. 추천 첫4항목의 종류/소개·Follow→Unfollow,Publication Follow→Finish를 확인한다.
5. 웹 Enable은 미지원 오류이며 Skip으로 멤버십 안내→닫기→Continue reading. Write는 자동 실행되지 않는다. Profile→My following에서 확정 관계를 확인한다.
6. Settings→Sign out→Cancel. 다시 Sign out→모의 동작 선택 열기→실패→Confirm→Retry. B를 골라 로그인해 강제 온보딩 없음/분리된 관계를 확인한다.
7. B 로그아웃→A 로그인. A의 확정 관계와 완료 온보딩 미반복, 미완료라면 마지막 확정 단계 재개를 확인한다. 로그인 제공자의 사용자 취소/실패/느린 성공 중 X도 확인한다.
8. 320/393폭·Light/Dark·긴 한국어/스크롤/Tab·코드 paste/backspace·뒤로/X를 확인한다. 완료 뒤 새로고침으로 임시 런타임/인증/개인 메모리 초기화한다.

<a id="tracking"></a>
## 변경·수동 추적·종료

FE 변경은 EmailLogin/createEmailAttempt,OnboardingProvider/Screen/session,AppNavigator 공급부 연결,publicDirectory의 관찰된 추천 및 기존 회귀4파일 및 재현 경고를 수정한 BookmarkNavigation 테스트다. 새로운 의존성·실제 인증/메일/푸시/Storage/백엔드를 추가하지 않았다.

실행 계획 상단/묶음14, BACKLOG V29/V30, 관련 REQUIREMENTS/FLOWS/CONTRACTS/UNKNOWN·비교/자산/자체 UI·SCOPE·AUDIT/REVIEW 및 FE/AGENT 현재 상태를 수동 갱신했다. comparisonBaseline에는14별 review와 존재하는 입력/codeInputs 해시를 갱신하고 이전 manualUpdate를 history에 보존했다. 원본 관찰/ID/이미지 해시/과거 증거/readiness는 바꾸지 않는다. 기존 JSON과 비교해 screens/transitions/unknowns/controls의 원래 필드·assets 보존, history에13 기록 추가를 확인했다. 새로 추가한 문서의 로컬 링크 누락0, 변경 경로36개(FE 구현7·회귀5·문서/추적24), staged0을 확인했다. 삭제된 tools의 profile/executionBatches/currentEvidence 및 과거 captures4개 입력은 복원하지 않는다. 생성기를 실행한 결과가 아니며 없는 자동 입력과의 차이를 유지한다.

새 tools/별도 검증 스크립트 폴더/evidence/비교 캡처/검증 로그/manifest 생성 없음. 브라우저 임시 프로필은 실행용 캐시이며 브라우저 종료·프로세스 종료 확인 후 제거했다. 마지막 새로고침에서 Home 복귀와 console/exception 오류0을 확인했다. 검사·번들·Hermes 출력은 메모리/stdout만 사용했다. 기존8081을 보존하고 커밋·push·배포·묶음15는 수행하지 않는다.

권장 커밋 메시지: `fix(fe): harden parity 14 auth and onboarding flows`

### 변경 파일 전체

| 구분 | 경로 |
| --- | --- |
| 결과·추적·현재 상태 | [AGENT/README.md](../AGENT/README.md) |
| 결과·추적·현재 상태 | [AGENT/SOFTWARE_AGENT/COMMON/IMPLEMENTATION_STATUS.md](../AGENT/SOFTWARE_AGENT/COMMON/IMPLEMENTATION_STATUS.md) |
| 결과·추적·현재 상태 | [FE/README.md](../FE/README.md) |
| FE 구현 | [FE/src/app/navigation/AppNavigator.tsx](../FE/src/app/navigation/AppNavigator.tsx) |
| FE 회귀 검사 | [FE/src/app/navigation/BookmarkNavigation.test.tsx](../FE/src/app/navigation/BookmarkNavigation.test.tsx) |
| FE 회귀 검사 | [FE/src/app/navigation/EmailAuthNavigation.test.tsx](../FE/src/app/navigation/EmailAuthNavigation.test.tsx) |
| FE 회귀 검사 | [FE/src/app/navigation/OnboardingNavigation.test.tsx](../FE/src/app/navigation/OnboardingNavigation.test.tsx) |
| FE 구현 | [FE/src/features/auth/EmailLogin.tsx](../FE/src/features/auth/EmailLogin.tsx) |
| FE 구현 | [FE/src/features/auth/createEmailAttempt.ts](../FE/src/features/auth/createEmailAttempt.ts) |
| FE 회귀 검사 | [FE/src/features/auth/emailAuth.test.ts](../FE/src/features/auth/emailAuth.test.ts) |
| FE 구현 | [FE/src/features/community/data/publicDirectory.ts](../FE/src/features/community/data/publicDirectory.ts) |
| FE 구현 | [FE/src/features/onboarding/OnboardingProvider.tsx](../FE/src/features/onboarding/OnboardingProvider.tsx) |
| FE 구현 | [FE/src/features/onboarding/OnboardingScreen.tsx](../FE/src/features/onboarding/OnboardingScreen.tsx) |
| FE 구현 | [FE/src/features/onboarding/createOnboardingSession.ts](../FE/src/features/onboarding/createOnboardingSession.ts) |
| FE 회귀 검사 | [FE/src/features/onboarding/onboarding.test.ts](../FE/src/features/onboarding/onboarding.test.ts) |
| 결과·추적·현재 상태 | [TODO/FE_MEDIUM_PARITY_AUDIT.md](FE_MEDIUM_PARITY_AUDIT.md) |
| 결과·추적·현재 상태 | [TODO/FE_MEDIUM_PARITY_BACKLOG.md](FE_MEDIUM_PARITY_BACKLOG.md) |
| 결과·추적·현재 상태 | [TODO/FE_MEDIUM_PARITY_REVIEW.md](FE_MEDIUM_PARITY_REVIEW.md) |
| 결과·추적·현재 상태 | [TODO/MEDIUM_PARITY/ASSET_BASELINE.md](MEDIUM_PARITY/ASSET_BASELINE.md) |
| 결과·추적·현재 상태 | [TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md](MEDIUM_PARITY/COMPARISON_BASELINE.md) |
| 결과·추적·현재 상태 | [TODO/MEDIUM_PARITY/COMPARISON_PROTOCOL.md](MEDIUM_PARITY/COMPARISON_PROTOCOL.md) |
| 결과·추적·현재 상태 | [TODO/MEDIUM_PARITY/CONTRACTS.md](MEDIUM_PARITY/CONTRACTS.md) |
| 결과·추적·현재 상태 | [TODO/MEDIUM_PARITY/EXECUTION_PLAN.md](MEDIUM_PARITY/EXECUTION_PLAN.md) |
| 결과·추적·현재 상태 | [TODO/MEDIUM_PARITY/FLOWS.md](MEDIUM_PARITY/FLOWS.md) |
| 결과·추적·현재 상태 | [TODO/MEDIUM_PARITY/OWN_UI_POLICY.md](MEDIUM_PARITY/OWN_UI_POLICY.md) |
| 결과·추적·현재 상태 | [TODO/MEDIUM_PARITY/REQUIREMENTS_01.md](MEDIUM_PARITY/REQUIREMENTS_01.md) |
| 결과·추적·현재 상태 | [TODO/MEDIUM_PARITY/REQUIREMENTS_02.md](MEDIUM_PARITY/REQUIREMENTS_02.md) |
| 결과·추적·현재 상태 | [TODO/MEDIUM_PARITY/REQUIREMENTS_03.md](MEDIUM_PARITY/REQUIREMENTS_03.md) |
| 결과·추적·현재 상태 | [TODO/MEDIUM_PARITY/REQUIREMENTS_05.md](MEDIUM_PARITY/REQUIREMENTS_05.md) |
| 결과·추적·현재 상태 | [TODO/MEDIUM_PARITY/REQUIREMENTS_06.md](MEDIUM_PARITY/REQUIREMENTS_06.md) |
| 결과·추적·현재 상태 | [TODO/MEDIUM_PARITY/REQUIREMENTS_07.md](MEDIUM_PARITY/REQUIREMENTS_07.md) |
| 결과·추적·현재 상태 | [TODO/MEDIUM_PARITY/REQUIREMENTS_08.md](MEDIUM_PARITY/REQUIREMENTS_08.md) |
| 결과·추적·현재 상태 | [TODO/MEDIUM_PARITY/SCOPE.md](MEDIUM_PARITY/SCOPE.md) |
| 결과·추적·현재 상태 | [TODO/MEDIUM_PARITY/UNKNOWN.md](MEDIUM_PARITY/UNKNOWN.md) |
| 결과·추적·현재 상태 | [TODO/MEDIUM_PARITY/comparisonBaseline.json](MEDIUM_PARITY/comparisonBaseline.json) |
| 결과·추적·현재 상태 | [TODO/FE_MEDIUM_PARITY_14_RESULT.md](FE_MEDIUM_PARITY_14_RESULT.md) |
