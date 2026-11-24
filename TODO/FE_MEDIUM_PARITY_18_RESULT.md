# Medium Parity 묶음 18 — 설정·시작 자산·아이콘

2026-11-24 KST. 시작 HEAD `5296216e522955182bb481d874ab1b9deeff29fc`, 작업 트리/staged 없음. 선행2·14,17 결과/커밋과 실제 공유 코드를 대조했다. [실행 계획](MEDIUM_PARITY/EXECUTION_PLAN.md#batch-18)의 D10/V33만 수행한다.9~17 잔여는 기존 담당에 유지한다. 사용자 승인 조건을 충족하면18 로컬 커밋 후19로 진행하며 push/배포/21·22 작업은 제외한다.

| 판정 | 결과 |
| --- | --- |
| 기능 | 시작 UI·splash 설정/제품 자산 추가, 아이콘 늦은 안내·큰 글자 넘침·Email 행 표시 보완 |
| 자동 검사 | 최종 타입/lint·iOS/Android318 suites/1772 tests 통과; 이번 act0 |
| 시각 |5 원본 PNG 직접 열람·8081 메모리 비교. 대체 서체/기존 K 아이콘·OS 영역·정확 배치 차이 유지 |
| native | 플러그인 등록/자산·메모리 JS/Hermes와 실제 생성/빌드/cold start/런처 적용을 구분. 실제 기기 대기 |

<a id="scope"></a>
## 요구·흐름·계약 대조

**5 S /60 R /9 T /11 U /실행 계획16 C**, S043의 공유 C49/50은14 경계로 추가 확인했다. 원본 요구·ID·PNG·과거 evidence/readiness는 변경하지 않았다. Settings·Custom app icon·Switching to dark mode·Onboarding의 ANALYSIS와 배정 흐름/UNKNOWN을 대조했다.

| S·전체 R 접두사 | 배정 T | 구현·검증·차이 |
| --- | --- | --- |
| S043 / R-S043-* (5) | T-F53-01 | 검정 중앙 흰 Medium 시작 UI와 제품 PNG/설정. 자체 Georgia 대체이며 원본 glyph 아님. 앱 첫 배치/이미지 준비 후 기존 Home로 이동. 실제 native 시작/인증 복원은 미검증 |
| S075 / R-S075-* (13) | T-F60-02 |2열8개 이름·Wordmark Black·Friend 잠금·선택/취소·적용 실패/재시도·기기 상태/계정 자격 분리. 원본 M과 다른 K 자산 유지, 잘린 추가 카드 미생성 |
| S110 / R-S110-* (15) | T-F62-02 |Dark 선택·전체 테마·다른 화면/복귀. 저장 실패 시 선택 보존/재시도. reader 설정은 별도 기존 계약 |
| S149 / R-S149-* (11) | T-F58-03,T-F61-01 |Social/About/App Controls·Facebook 문장·Help/Terms/Privacy/Rate·More controls·로그아웃. 원본4.263.185257은 관찰값이며 현재앱0.1.0으로 표시 |
| S173 / R-S173-* (16) | T-F58-02,T-F59-01,T-F60-01,T-F62-01 |Account/Configure 모든 진입·테마3선택·Push/Email/아이콘·뒤로. 원본에 없는 Email chevron 제거, 내부 mock Email 목적지는 유지 |

R 접두사는 해당 화면의 L/D/S/C 전체와 S043-V를 포함한다. 외부 화살표는 실제 대상 PNG에서 대조했다. S173/S110 Email 행에는 화살표가 없고 S149 Help/Terms/Privacy/Rate도 plain 행이다. 묶음16 S162의 Digest Email 외부 화살표와 혼합하지 않았다. 현재 외부 참고 페이지는 자체 확인 화면을 거쳐 열며 원본에서 그 중간 화면을 관찰했다고 주장하지 않는다.

- C01/02/03: 대체 자산·테마·48px·작은 폭·CSS 글자 확대/스크롤. 실제 Safe Area/OS 글자/스크린리더는21/Q07.
- C67/68/69 직접: 계정/결제/Email/Facebook·외부 참고·기기 설정·아이콘의 화면 연결과 실패/복귀.
- C65/66: 기존 모의 Friend 자격이 아이콘 잠금을 여는 연결.19 전체 구현/종료 판정 아님.
- C09/36/53/58/59/60/61: 기사·다운로드·프로필·오디오의 기존 설정/자격 소비 경계와 전체 회귀. 각 담당 기능 전체로 확장하지 않음.
- C71: 실제 native 동작은21/Q07. S043의 C49/50은14 온보딩 분기 유지와 이번 시작 화면의 경계로 확인.
-11 U(S043/075/110/149/173,F53/58/59/60/61/62)의 질문은 원본 미확인 유지. 앱 시작 시간/세션복원, 전체 아이콘/구독조건/OS 적용, 계정 하위 화면, 다른기기/재시작, 테마 저장값 동등성을 원본 정책으로 확정하지 않는다.

<a id="contracts"></a>
## 시작 자산·상태 수명과19 인계

[자산 출처](../FE/assets/app-icons/SOURCES.md)에 SVG/PNG 생성 방식과 차이를 기록했다. 원본 S043을 직접 대조한 코드 벡터를 Georgia bold로 작성하고 로컬 브라우저 SVG/canvas로960×240 RGBA 제품 PNG를 생성했다. 비교 캡처가 아니며 원본의 OS 상태바/홈 인디케이터도 포함하지 않는다. 원본 독립 wordmark/폰트는 미확보이며 획·크기 비율 차이가 남는다. 기존8개 K 아이콘은 변경하지 않았다.

`StartupBoundary`는 첫 앱 배치와 이미지 loadEnd 후 다음 프레임에 기존 앱을 연다. 임의 초 단위 타이머나 강제 가입/온보딩 순서를 만들지 않았다. 이미지 오류 역시 loadEnd로 진행한다. 시작 동안 접근성/포인터와 웹 keyboard focus를 가리고, 웹은 inert를 사용한다. 개발 웹의 명시적 `?parityStart=hold`만 비교를 위해 유지하며 기본 URL/production에 적용하지 않는다. 새로고침은 기존 메모리 인증/개인 데이터 초기화 정책을 따른다.

app.json은 검정 배경·contain·같은 제품 PNG로 expo-splash-screen을 구성한다(iOS308pt/Android200dp). 설치된 Expo57의 bundledNativeModules 범위~57.0.11에 맞는57.0.12를 추가했다. 누락된 native 시작 구성을 위한 의존성1개이며 다른 의존성 업그레이드/외부 서비스 추가는 없다. [Expo57 공식 문서](https://docs.expo.dev/versions/v57.0.0/sdk/splash-screen/)의 config plugin을 사용한다. 실제 standalone cold start/OS 크기·클리핑은 별도 native 검증이다.

- 아이콘은 설치/기기 단위의 확정 사실이다. 로그인 계정이 바뀌어도 OS 적용 결과를 다른 계정의 개인 데이터처럼 지우지 않는다. Friend 자격·선택 초안·안내는 userId/auth revision/source/화면 세대에 속한다.
- apply는 미지원/권한 없음/중복 요청을 거부한다. 이미 OS에 제출한 요청의 결과는 기기 store에 반영하지만 화면 이탈·재진입·자격 변경 후 이전 성공/실패 안내를 열지 않는다. 조회의 역순 응답은 generation으로 배제한다. 실패는 기기 상태 재조회 후 사용자가 다시 시도한다.
- icon 화면 미제출 choice는 Cancel/이탈/자격 변경에서 폐기한다. Apply 성공 전 선택 표시와 기기 적용 문구는 별도다. 웹 adapter는 supported=false이므로 모의 Friend여도 OS 적용 성공을 만들지 않는다.
- Appearance는 owner별 display store의 낙관적 선택/확정값·직렬 저장·마지막 제출 의도 계약을 유지한다. 실패 시 선택을 유지해 재시도하고 계정/source 경계에서는 초안을 정리한다. readerTheme와 appTheme는 별도이며 System reader는 앱의 유효 테마를 따른다.
- Facebook은 계정별 mock 연결 선택이며 취소/이탈/계정 경계에서 미확정 요청을 폐기한다. 실제 Facebook/OAuth를 연결하지 않았다.
-19 인계: `custom-icon`/`friend-link`는 Friend, `audio`/`offline`은 Member 또는 Friend라는 기존 계약을 유지한다. 자격이 변경될 때 아이콘 초안/안내를 폐기하며 기기 사실은 보존한다. 이번 모의 업그레이드 확인은19의 모든 멤버십 화면/가격/경합 완료를 대신하지 않는다.

<a id="defects"></a>
## 결함·수정·두 차례 자기 검토

| 재현·원인 | 수정·검증 |
| --- | --- |
| app.json 시작 설정 없음·JS Home만 표시 | 대체 제품 워드마크·StartupBoundary·splash 플러그인 연결. 실제 앱 root 회귀/웹 시작·기본 복귀/구성 등록 확인 |
| 아이콘 apply 중 Home→Profile 복귀 후 늦은 성공/실패가 새 화면에 표시됨 | live boolean 재활성화만 보던 조건에 요청 화면 세대/자격 경계를 추가. 실제 navigation2 RED→GREEN, 기기 확정값 유지 |
| 시작 overlay 아래 Tab이 Notifications에 들어감 | 실제 CDP Tab에서 hidden BUTTON 포커스 재현. 웹 inert 추가 후 BODY 유지, 시작 종료 후 inert 해제 |
|320폭/CSS2배에서 Wordmark·Founder 이름이 옆 카드로 넘어감 | Text 폭을 카드 내부로 제한하고 줄바꿈.8개 label 각각 scrollWidth=clientWidth95px·page overflow0 확인 |
| Settings Email 행이 원본에 없는 chevron을 표시 | S173/S110 관찰에 맞게 제거. 내부 Email 이동/복귀는 유지 |

1차 자기 검토: 배정 R/T/U/C, 앱 자산/config/plugin·아이콘 store/adapter·권한/화면·settings 호출부와 기존 테스트를 검토했다. 늦은 안내를 실제 navigation으로 재현하고 수정했다.

2차 자기 재검토: diff와 초기화/계정/source/자격·OS 사실/초안 분리·시작 로딩/포커스·큰 글자 레이아웃을 대조했다. 브라우저에서 발견한 Tab 침투/글자 넘침을 수정하고 다시 확인했다. 두 검토 모두 자기 검토이며 독립 리뷰어/하위 에이전트는 사용하지 않았다.

<a id="verification"></a>
## 검사·실패·재실행

Node24.18.0. Jest는 `--expose-gc --runInBand --logHeapUsage --selectProjects iOS|Android --json`, 결과를 메모리 집계한다. 불필요한 skip/기대값 약화/timeout 상향은 없다.

- 최초 typecheck: RN0.86에서 제거된 absoluteFillObject1 오류. 명시적 position/top/right/bottom/left로 수정.
- 최초 관련5 suites/24 tests:18통과6실패11.925초. 시작 중 hidden인 root에 테스트가 layout 이벤트를 전달하지 못한 harness 오류. includeHiddenElements로 실제 준비 이벤트를 전달하도록 수정했다.
- 아이콘 세대 guard를 제외한 대조 실행: 새 늦은 성공/실패2개 모두 RED3.998초. testNamePattern으로 기존5개는 실행 대상에서 제외된 진단이며 전체 통과로 집계하지 않는다. guard 복원 후 관련5 suites/24 tests20.620초 모두 통과/act0.
- 초기 제품 참조 추가와 PNG 생성 사이 HMR asset resolve 오류2건이 발생했다. 파일 생성 후 기본 reload와 시작/설정 UI 재확인에서 해당 오류 없음.
- config plugin 단독 조사2회: projectRoot 메타데이터 누락, 이미 처리된 pluginHistory로 mod가 생략된 조사 오류. plain config+현재projectRoot로 재실행해 android6 mods/ios4 mods 등록·PNG960×240·기존icon8파일을 확인했다. 파일을 생성하는 mods/prebuild/native build는 실행하지 않았다.
- 첫 전체 iOS159 suites/886 tests224.088초 모두 통과/act0. 이 뒤 웹 inert/아이콘 글자 폭을 보완해 최종 검사를 다시 수행했다.
- 두 번째 전체 iOS159 suites/886 tests 중885통과·1실패1207.141초/act0. FollowControl의 A 늦은 success 사례로, elapsed90→1060초의 공백과 호스트 Maintenance Sleep(913~992초) 기록이 확인됐다. 해당4 tests는 코드/기대값/timeout 변경 없이 단독4.076초 모두 통과했다. Sleep 영향이 의심되는 환경 실패로 구분하고 과거 act 경고의 원인과 혼합하지 않는다. 기존 caffeinate -i에 시스템 sleep 방지(-s,AC)를 추가해 이번 연속 작업 동안만 유지하며 종료 시 해제한다.
- 첫 Android159 suites/886 tests245.260초 모두 통과/act0. 마지막 큰 글자 폭 보완을 포함한 최종 전체 실행 결과는 아래에 별도로 기록한다.
- 절전 방지 후 한 iOS 실행은 대화 출력 한도로 최종 집계가 유실되어 통과 근거로 사용하지 않고 재실행했다. 재실행 준비 중 `--selectProjects ios`의 대소문자 오류로0 tests/선택 실패1회가 있었으며, 설정의 실제 이름 `iOS`로 바로잡았다. 테스트나 설정은 변경하지 않았다.
- 최종 typecheck/lint exit0. web/iOS/Android 메모리 production JS 구문 검사 통과(2,049,481/2,370,299/2,370,993 bytes). iOS/Android Hermes exit0, 각각 unbound-global 경고35/오류0. 실제 native 빌드/실행과 구분한다.
- 최종 iOS159 suites/886 tests223.957초 모두 통과(실패/skip/이번 act0).
- 최종 Android159 suites/886 tests227.430초 모두 통과(실패/skip/이번 act0). 양 플랫폼 합계318 suites/1772 tests.
- 과거16 Android act1의 비재현은 원인 해결로 취급하지 않는다. 이번 경고/실패 결과를 각 실행별로 기록한다.

<a id="browser"></a>
##8081 실제 조작·시각 대조

기존8081 PID22023 보존. Chrome158/CDP 실제 포인터·키보드 이벤트와 메모리 화면을 사용했다. 저장된 비교 캡처 파일 없음. 원본1179×2556과 이번320/393 CSS 폭·DSF1·OS영역 없는 웹은 동일 기기 조건이 아니다.

- 기본 새로고침→시작 자산 준비→Home·로그인A→Profile→Settings. 명시적 hold URL에서 검정 중앙 워드마크/조작 없음과 Tab 차단, 기본URL에서는 시작 종료를 확인했다.
- Story stats/Account/Edit profile 취소/Refine recommendations/Push/Email/Custom icon 진입·뒤로. Help/Terms/Privacy/Rate 각각 안내 페이지 진입·복귀, More controls 웹 미지원 안내를 확인했다.
- Facebook 선택 취소→일회성 source 실패→입력/확인 유지→재시도→Connected(mock). source 함수를 복원했다. Appearance Dark 저장 실패→선택 유지→Retry→System/Light 복귀도 실제 UI에서 확인하고 source를 복원했다.
- 외부 열기는 window.open 거절→오류→재시도 요청 URL을 제어 대역으로 확인했다. 실제 Medium 사이트 로드/서비스 성공으로 표현하지 않는다. 원래 window.open을 복원했다.
- 아이콘 잠금/8 radios·업그레이드 닫기→모의Friend→아이콘 선택/Cancel·탭 이탈/복귀 시 초안 폐기. 웹 Apply 비활성·미지원 문구. 실제 OS apply 성공/실패는 Jest adapter 제어 검사이며 브라우저 OS 적용 결과가 아니다.
- A Friend→B 잠금→A Friend 복원, Wordmark Black 상태 유지. B의 선택을 A의 권한으로 조작하지 않는다. 마지막 reload로 계정·관계·source 주입·CSS를 정상 초기화했다.
-320/393·Light/Dark, 긴 한국어 기존 안내·CSS2배·48px·선택 표시·포커스·스크롤·닫기/뒤로를 확인했다. 점검 viewport 내48px 미만 대상0·page overflow0. 큰 글자는 카드 내부에서 여러 줄로 래핑한다. CSS/합성 Tab은 실제 OS 글자 확대·스크린리더/IME 검증이 아니다.

<a id="remaining"></a>
## 잔여·종료 조건

| 항목 | 담당·영향·종료 조건 |
| --- | --- |
| 원본 wordmark 서체/독립 자산,8개 M 아이콘/잘린 추가 카드 |18/Q02. Georgia 대체·기존 K는 원본 동일 아님. 자산/출처·온전한 목록 확보 후 제품 교체/동일 조건 재비교 |
| native splash·launcher 실제 적용/cold start·취소/계정 후 기기 사실 |21/Q07+18. Xcode는 CommandLineTools뿐,simctl/Android SDK·adb/실기기 없음. release/standalone build에서 OS 배경·이미지 크기/클리핑·런처 반영/앱재시작 확인 필요 |
|11 U·원본 version/하위 화면/테마 영속성 |18/V33,14 공유S043/F53·16알림 경계. 정적원본으로 확정하지 않으며 추가 원본/실기기 관찰 후 판정 |
| 자체 reading tools·mock 자격/연결·OS미지원 안내와 화면 높이 |18/Q12. 기능 접근을 유지하고 정확 폰트/OS 조건 확보 후 재비교. 원본 앱 버전을 현재앱버전으로 위장하지 않음 |
|9~17 이전 잔여 |각 기존 담당 유지. 이번 진행은 전체 동일성/출시 승인 아님 |

S043의14 인계: 시작 파일/JS UI/구성 결손은18에서 보완했다. 원본 glyph 동일성과 실제 native cold start는 여전히18/Q02·21/Q07 담당이다.14의 가입/온보딩 세션 분기를 변경하지 않았다.최종 검사/재검토에서19 진행을 막는 해결 가능한 기능 결함은 남지 않았다. 원본/native 잔여를 명시한 조건부 로컬 커밋·진행 조건을 충족한다.

##8081 최종 확인 순서

1. 기본 URL 새로고침 후 Home까지 열림을 확인한다. 개발 비교는 `http://localhost:8081/?parityStart=hold`로 시작 화면만 확인하고 기본 URL로 복귀한다.
2. Notifications→모의A 로그인→Profile→Settings. 모든 Account/Configure 행과 목적지·뒤로를 확인한다.
3. System/Light/Dark 선택→프로필/홈→Settings 복귀. Email과 Push 진입·원래 설정 복귀.
4. Custom icon8개/Wordmark Black/Friend 잠금→업그레이드 닫기. 모의Friend 선택→OK→Start reading→선택/Cancel. 웹에서는 OS Apply가 비활성임을 확인한다.
5. 아이콘 초안 선택→Home→Profile 복귀. A 로그아웃→Sign in B→아이콘잠금→A 재로그인/자격 복원.
6. Facebook mock 연결 선택/Cancel/확정과 Account 반영. Help/Terms/Privacy/Rate·More controls 안내/복귀. 로그아웃 Cancel/Confirm.
7.320/393·Light/Dark·글자 확대와 스크롤 확인 후 기본URL reload로 모의 상태를 초기화한다.

## 변경·수동 추적·파일 제한

FE/App·StartupBoundary·제품SVG/PNG·app.json/package/lock·자산 출처·AppIconScreen/SettingsScreen과 실제 root/navigation 회귀를 변경했다. 결과·실행 계획·BACKLOG·배정 R/T/U/C/비교·현재 상태와14의S043 인계를 수동 갱신한다. comparisonBaseline의18 review/상태·존재 입력 해시를 갱신하고17 manualUpdate를 history에 보존한다. 새 runtime StartupBoundary만codeInputs에 수동 추가한다. 원본/ID/readiness/과거 evidence와 삭제된4입력은 유지하며 tools 생성기는 실행하지 않는다.

tools/evidence/비교캡처/검증로그/검증manifest/별도 검증폴더 생성·수정 없음. 새PNG는 승인된 실제 시작 제품 자산1개다. 기존8개 K 아이콘·과거 파일/삭제 상태를 복원하거나 지우지 않았다. 외부서비스/push/배포 없음.
