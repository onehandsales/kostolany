# Goal41 — 온보딩 관심사·추천 팔로우·알림 안내

**Goal44 후속 갱신(2026-11-21):** Goal44에서 기기 권한 어댑터를 온보딩에 연결했다. 안내 이력과 실제 OS 권한을 분리하고 미결정/미지원 결과를 denied로 저장하지 않는다. 실제 iOS/Android 권한 prompt·빌드/실행은 환경 부족으로 검증 대기다. [현재 구현·검사](FE_GOAL_44_RESULT.md). 아래 수치·미연결 표기는 당시 코드의 과거 기록이며 재작성하지 않는다.

실행일: 2026-11-20 KST. 시작 HEAD `03b766a7045260b6b4b3a7e5bfdc4c06ddb4a136`, 작업 트리 변경 없음. 이번 승인은 Goal41→42와 각각 로컬 커밋이며 push·배포·Goal43 이후는 제외한다.

현재 상태: 구현 완료·검증 잔여. 최종 타입/lint·전체194suites/1114tests·8081·3플랫폼 export 통과. 실제 OS 알림 요청은 이번 mock 범위에 포함하지 않는다. native 실행·OS 접근성·원본 동일 재현과 미수록 정책 확인은 잔여다.

## 구현과 사용자 흐름

| 흐름 | 구현과 검증 |
| --- | --- |
| 신규 가입→안내→관심사→추천→알림→멤버십 안내→원래 화면 | 실제 AppNavigator 통합 검사 및8081. A의 신규 fixture 가입만 자동 시작하며 저장/작성 등 개인 행동은 자동 실행하지 않는다. |
| 관심사 2/3개·선택 해제·저장·취소 | 선택 초안은 화면에 두고 Next에서 기존 topic 관계 저장소에 반영한다. 실제 navigation에서2/3경계·해제/재선택을 검사했다. |
| 관심사/추천 조회 실패·관심사 저장 실패·재시도 | 실제 navigation에서 조회 복구와 선택 보존을 검사한다. 브라우저에서 관계 source를 일시 실패시켜 선택 보존/재시도를 확인했다. |
| 추천 Follow·Unfollow·실패·Finish | 기존 FollowControl/RelationshipStore를 재사용한다. 팔로우 없이 Finish 가능. 브라우저에서 실패→Retry→Unfollow→재Follow를 조작했다. |
| 알림 Enable/Skip·실패·거절·이미 결정됨 | 실제 navigation에서 실패→거절 후 계속, Skip을 검사한다. 단위 검사에서 권한 허용·이미 결정됨·취소를 검사하고 브라우저에서 실패→허용을 확인했다. OS 요청은 하지 않는다. |
| 중단·재진입·뒤로 | 닫기 후 프로필 Continue setup으로 확정 단계 재조회. 실제 navigation에서 응답 유실→닫기→재진입과 공급부 교체를 검사했다. 브라우저 Escape는 이전 단계로 이동한다. |
| 완료·A→B→A·같은 A·새로고침 | 브라우저에서 완료 반복 방지·B 기존 계정 분기·같은 A 재로그인·새로고침 초기화 확인. 단위 검사에서 늦은 A 성공/실패 및 같은 A의 이전 revision을 격리한다. |
| 홈 반영 | 관심사와 추천 Follow가 기존 관계에 저장된다. Following은 기존 기사-topic/writer/publication 관계로 필터링한다. For you의 새로운 추천 알고리즘은 만들지 않았다. |

## 상태·권한·수명 계약

- Goal40 AuthStore에 가입 여부와 원래 로그인 context를 세션 진입 메타데이터로 보존한다. 인증 성공, 온보딩 단계/완료는 별개다. 프로필/설정 변경은 사용자 ID나 인증 revision, 공개 navigation을 초기화하지 않는다.
- 기본 fixture A `example-reader`는 신규 온보딩 대상, B `example-reader-b`는 기존 사용자다. 가입 버튼은 계정/개인 데이터 생성·초기화 명령이 아니다. 기존 A/B ID와 저장소는 유지한다. 신규 A도 일반 Sign in이면 처음부터 자동 온보딩을 열지 않으며 프로필 Continue setup에서 시작할 수 있다. 이미 시작한 A는 다음 로그인에서 확정 단계로 재진입한다.
- 신규/기존 여부, started, step, version, showWelcome, showMembership, notificationChoice는 OnboardingSource에 계정별로 저장한다. 기본 welcome→interests→following→notifications→membership→complete 순서는 자체 mock 분기다. welcome/membership 생략 옵션도 지원하며 모든 실제 계정의 공통 순서라고 주장하지 않는다.
- 첫 welcome을 Continue 전에 닫으면 아직 started가 아니므로 일반 로그인에서 자동 반복하지 않는다. 프로필 수동 재개는 가능하다. 단계 이동 성공부터 started를 확정한다. 초기 관심사 단계의 미저장 선택은 닫기/이탈에서 폐기한다.
- 관심사의 사실 상태는 기존 topic ID의 팔로우 관계다. Next 전 선택은 로컬 초안이다. Next는 절대 following 값으로 관계를 순차 저장한다. 일부 성공 후 실패하면 이미 확정한 관계는 유지되고 남은 선택 초안을 보존한다. 재시도는 확정된 동일 관계를 건너뛰며 나머지 실패 관계를 저장한다. 원자적 일괄 저장으로 표현하지 않는다. 모든 선택 반영이 끝난 뒤 단계만 저장한다.
- 추천 팔로우는 기존 관계 계약처럼 즉시 저장한다. Finish·온보딩 닫기/중단은 이를 취소하지 않으며 Unfollow가 취소 동작이다. 추천 목록은 기존 공개 directory fixture이고 관심사 기반의 실제 추천/랭킹은 아니다. 차단/뮤트/자기 사용자를 제외한다.
- 알림 권한 source는 앱 실행 중 기기 단위 undetermined/granted/denied 상태이고 계정과 분리된다. 계정의 enabled/denied/skipped 선택은 온보딩 메타데이터다. 허용 뒤 계정 저장 실패가 나도 이미 결정된 기기 권한을 되돌리지 않는다. Skip은 권한 요청 없이 진행한다. Goal44의 이벤트별 선호·실제 발송은 구현하지 않았다.
- operationId·expectedVersion·receipt로 중복 제출/응답 유실 재시도를 처리한다. 유실된 요청은 같은 의도로만 재시도하며 확정 단계에 중복 반영하지 않는다. 조회/쓰기 sequence와 인증 revision, AbortController, 화면 수명으로 오래된 응답을 격리한다. source 교체는 새 세션/화면 초안을 만든다.
- 기존 관계 source에는 AbortSignal이 없어 이미 발행한 A 관계 요청은 A 저장소에서 완료될 수 있다. 온보딩의 후속 일괄 요청/화면 변경은 즉시 중단하고 B에 반영하지 않는다. A 복귀 시 A의 확정 관계를 읽는다. 화면 초안·시트·오류는 새 revision에서 폐기한다.
- 모의 권한·관계·온보딩은 메모리다. 같은 앱 실행의 A→B→A에서는 보존하고 전체 새로고침/앱 재실행은 인증과 함께 초기화한다. 실제 앱 재실행/OS 프로세스 복구는 검증하지 않았다.
- 멤버십은 안내 열기/닫기/읽기 복귀 경계만 연결했다. 구매·상품 선택·가입 완료 권한을 만들지 않았다. 실제 가입/계정/메일/알림·외부 서비스는 연결하지 않는다.

## 원본과 추가 근거

- medium README/REVIEW_R2/SOURCES, F52 Logging in, F53 Onboarding, F54 Subscribing to Medium, F59 Changing notification settings, F61 Logging out의 관련 분석과 실제 PNG를 대조했다. F53 07~12 여섯 화면과 관련 가입/로그인/피드/설정/로그아웃 PNG를 실제 이미지로 열었다.
- 관찰: F53/07 `sc_3795c955a89d404c85112e637857e74a` 새 경험 안내;08 `sc_5843ae43bf154aadb5507c6fa51d150d` 빈 관심사;09 `sc_05f2a886f5464a728dd61a6291707a3d` 선택5개;10 `sc_301ef788e5514bb5b8e9c1fc9afcfa61` 추천4행과 팔로우 없이 활성 Finish;11 `sc_e9f4c426cfb3426d9ca05121dea00ce3` Enable/Skip;12 `sc_b4e85416681544c9b996826eefa22432` 멤버십 제안이다. 선택5개 캡처만으로3개 경계의 저장 정책을 확정하지 않는다.
- 공식 설명: [Refine recommendations](https://help.medium.com/hc/en-us/articles/224488047-Refine-recommendations), [Your homepage](https://help.medium.com/hc/en-us/articles/115012586467-Your-homepage), [Follow writers and publications](https://help.medium.com/hc/en-us/articles/35754720183063-Follow-writers-and-publications)를 현재 조회했다. 관심사/작성자 팔로우와 홈 개인화, Following, 선택적인 이메일 구독을 뒷받침한다. 현재 공식 설명과 보관 iOS 캡처 버전을 같다고 취급하지 않는다.
- Gummble의 온보딩/권한 거절/재진입 검색은 exact0, 관련3개 기존 화면이었다. 별도 거절·재진입 화면을 확보하지 못했다. 다른 흐름의 로그아웃 이미지를 온보딩 정책 근거로 사용하지 않았다.
- 미수록: 기존/신규 자동 분기, 중단 후 재개, OS 거절/이미 결정됨, 저장 실패/응답 유실/부분 저장 정책, 완료 상태 보존 범위. 위 명시적 fixture 분기·오류/재시도·프로필 Continue setup은 자체 보완이다. 원본의 멤버십 구매 화면은 Goal48이며 이번 안내와 동일 재현했다고 기록하지 않는다.

## 두 차례 자체 검토와 결함

1. 1차 자체 검토: 인증 진입 메타데이터, 관심사 사실 상태 중복 여부, 단계/권한 분리, 계정·source·unmount 수명, 응답 유실을 검토했다. 성공했으나 응답을 잃은 저장 후 닫기/재진입에서 이전 화면 단계가 남는 문제를 발견해 open에서 확정 source를 다시 읽게 수정했다. 실제 navigation 회귀 검사와 단위 재시도 검사로 확인했다. metadata 전이의 알림 선택 누락도 source에서 거부한다.
2. 2차 자체 재검토: 수정 코드/테스트·실제 PNG/브라우저를 다시 대조했다. 수동 재개 후 조회 실패 재시도에서 화면이 닫힐 수 있는 문제를 수정해 isOpen을 유지했다. 낮은 버전 조회의 상태 후퇴, 같은 A 재로그인 후 늦은 실패를 회귀 검사했다. 관심사/추천 조회 실패 검사와 원본의 회색 비활성 Next·제목 두께/상단 간격을 보완했다. 이후 코드/테스트를 고정하고 최종 전체 검사를 실행한다. 모두 자체 검토이며 독립 제3자 검토가 아니다.

2차 검토 이후 최종 브라우저 경계 검사에서 초기 metadata 조회 중 닫기가 로딩 모달을 남기는 결함을 재현했다. 가입 여부와 loading으로 가시성을 다시 계산하던 원인을 제거하고 isOpen을 단일 가시성 상태로 사용했다. 조회 전 닫기는 idle로 전이하여 프로필에서 다시 이어갈 수 있다. 실제 navigation에 초기 닫기→재개→늦은 이전 조회 검사를 추가하고 홈 Following 검사도 실제 기사 표시를 확인하도록 강화했다. 수정 후 타입/lint·양 플랫폼 전체 검사와 export, 해당 브라우저 재현을 다시 수행한다.

## 실행 결과·코드 기준

- Node24.18.0/npm10.9.0, Windows PowerShell, Expo57.0.33/RN0.86.3/React19.2.3, Edge headless. 기존8081 PID5248을 유지했다. 의존성/ENV/native 설정 변경 없음.
- `npm.cmd run check`: 초기 닫기 결함 수정 전194suites/1112tests,717.808초 PASS 출력. Windows PowerShell의 stderr 리다이렉션 때문에 호출 셸은1을 반환했으므로 이를 최종 정상 종료 증거로 사용하지 않는다. 수정 후 명령은 `$LASTEXITCODE`를 명시적으로 반환하며 아래 최종 검사를 기준으로 한다. Goal40의190/1092는 재사용하지 않는다.
- 최종 `npm.cmd run typecheck`, `npm.cmd run lint`: 정상 종료0. `npm.cmd test -- --selectProjects iOS`와 `--selectProjects Android`를 별도 프로세스로 병렬 실행하며 각 프로젝트 안에서는 기존 runInBand를 유지했다. iOS97suites/557tests(400.052초), Android97suites/557tests(401.025초), 합계194suites/1114tests 통과. 두 명령 모두 실제 npm_exit=0·호출 종료0이다. 그 뒤 제품 코드/테스트 변경은 없다.
- 부분 검사: 기존 auth 연동+신규 단위6suites/52tests 통과 후 실제 navigation2suites/6tests 통과. 2차 수정 중 상태/navigation4suites/20tests 통과. 뒤에 조회 실패 검사/시각 보정이 추가되어 최종 기준은 전체 검사다.
- `OnboardingNavigation.test.tsx`는 실제 AppNavigator/provider와 화면을 사용한다. 기존 EmailAuthNavigation은 명시적인 기존 계정 onboarding fixture를 주입해 인증 자체의 경계를 검사하며 신규 가입 온보딩은 새 검사에서 담당한다. navigation 자체를 mock하지 않았다.
- `npx.cmd expo export --platform all --output-dir <외부 임시 경로>/export41-final`: 초기 닫기 수정 뒤 web/iOS/Android 성공·정상 종료0. JS/Hermes export이며 native 빌드/실행이 아니다.
- 8081 Playwright Edge: 가입·관심사 실패/선택 보존/재시도·추천 Follow 실패/재시도/취소·알림 실패/허용·안내/복귀·A→B→A/같은A·새로고침·320폭/CSS160%/Dark/Escape 확인. console error/pageerror0. fault 주입은 해당 브라우저 source에만 했고 원래 메서드를 복원한 후 페이지 새로고침/브라우저 종료했다. 저장소 mock 기본값을 변경하지 않았다.
- 별도 브라우저 경계 검사4흐름도 통과했다. metadata 조회/저장 실패→재시도, 응답 유실 후 닫기→확정 단계 재조회, 실제 로그아웃 UI 취소/확정→B 가입(기존 사용자)→A 로그인(단계 재개), mock 거절 후 계속을 확인했고 console/page 오류0이었다. 기본6흐름 중 계정 수명 주입 검사와 실제 UI 계정 전환 검사를 구분한다.
- 최종 초기 조회 닫기→프로필 수동 재개 브라우저 회귀도 통과했고 console/page 오류0이다. 최초 실행의 실패 캡처와 수정 뒤 결과를 구분했다.
- 수정 전 전체 Jest 실행 중 기존 ResponsesNavigation의 VirtualizedList/ExplanationContent/읽기 이력에서 act 경고가 출력됐다. 해당 suite는 PASS이며 브라우저 오류와 구분한다. 경고를 숨기는 console mock을 추가하지 않았다. 최종 두 프로젝트 로그에서는 console.error가 출력되지 않았다.
- OS 알림 거절/실제 iOS·Android 터치·스크린리더·OS 글자 크기·Safe Area/제스처는 미검증. Java/adb/gradle/xcodebuild가 PATH에 없고 FE/android·FE/ios도 없다. Android SDK/JDK/에뮬레이터 또는 기기와 native 프로젝트, iOS는 macOS/Xcode/기기가 필요하다. 이 Goal은 텍스트 입력이 없어 한글 IME 입력 검증 대상은 없으며 Goal42 입력에서 별도 확인한다.

## 시각 비교와 증거 위치

- 임시 경로 `C:\Users\leehg\AppData\Local\Temp\kostolany-goals41-42-4fdab07b77ae4370ad452d4e208e2af4`. `browser41.json`, `browser41-boundaries.json`, 각 실행 로그, `check41-final.log`, `export41.log`, 실제PNG11개, `compare41.jpg`, 여섯 `*-pair.png`/`*-overlay.png`/`*-diff.png`, 원본 contact sheet가 있다. 저장소에 증거 폴더/HTML/로그/스크립트를 추가하지 않는다. 임시 자료는 환경 정리 시 사라질 수 있다.
- 조건: 원본1179×2556을393×852로 축소하고 상단59·하단34 논리px를 제외한393×759와 Edge393×759 DPR1을 비교했다. 단순 crop/정규화이고 기기 OS/서체를 동일하게 맞춘 측정은 아니다.
- Next/Continue/Finish 구현 버튼은 x24/y687/w345/h48이다. 정규화 원본의 녹색 버튼도 약x24/y687/w345/h48이다. Writing 관심사 터치 영역은 x174.67/y242/w69.31/h48이다. 원본 pill은 더 작지만 외부 터치 영역은 캡처에서 알 수 없다. 48논리px는 앱 규칙이다.
- 수정 전 관심사 제목/첫chip이 원본보다 약8~10px 아래여서 content top을8px 줄였다. 현재 행 배치는 영문 서체/글자폭 차이로 Mental Health/Life/Software Development 이후 줄바꿈이 다르다. 시스템 폰트 대체·원본 벡터 미확보 차이는 남는다.
- Welcome 인물은 기존 directory 자산을 재사용하므로 원본7명과 인물/배치가 다르다. 추천도 기존 fixture가 있어 원본4행 중 iris/Write A Catalyst 외 구성과 행높이·사진 crop·본문 줄바꿈이 다르다. 소유자/콘텐츠를 원본에서 확인한 데이터처럼 추가하지 않았다.
- 알림 안내는 OS 미연결을 나타내는 mock 설명 때문에 본문 위치가 원본과 다르고 멤버십은 Goal48 구매 화면 대신 안내/복귀 UI다. 닫기/Continue setup/오류도 자체 보완이다. 화면별 동일 재현 완료나 임의 일치율을 주장하지 않는다.

## 8081 최종 확인 순서

1. 새로고침→Write→Create account→A→Google 모의 가입. Continue 후2개 선택의 Next 비활성,3개/해제/재선택을 확인한다.
2. Next→추천 Follow/Unfollow 또는 아무 팔로우 없이 Finish. 닫고 프로필 Continue setup으로 다시 열면 확정 단계가 나온다.
3. 알림 Enable(모의) 또는 Skip→멤버십 안내 열기/Back→Continue reading. 원래 화면으로 복귀하며 Write/저장 행동은 직접 다시 실행한다.
4. 홈 Following/관심사 관리에서 같은 topic 관계를 확인한다. 프로필 로그아웃→B 로그인→A 로그인에서는 완료 온보딩이 반복되지 않는다. 기존 개인 데이터는 유지한다.
5. 새로고침하면 메모리 인증/관계/온보딩이 초기화된다. 작은 폭/어두운 테마에서도 목록 스크롤·닫기·뒤로를 확인한다. 실패/응답 유실은 테스트 source 또는 외부 검증 스크립트로 재현하며 제품 기본값은 정상이다.

Goal41 로컬 커밋 후 해시를 보고하고 승인된 Goal42만 이어서 진행한다. 남은 원본/OS 검증은 커밋으로 해소됐다고 취급하지 않는다.
