# Goal 44 — 알림 목록·Push·Email·Tailored 설정

2026-11-21, macOS. **기능 구현·두 차례 자체 검토 수행, 원본/실제 native 검증 잔여.** 실제 Push/Email 발송·토큰 등록·분석 수집은 연결하지 않았다. Goal44→53 순차 작업과 각 단계 로컬 커밋이 승인됐다. 다음 단계에서도 이 문서의 미확인 항목을 완료로 계산하지 않는다.

## 재개 기준과 보존

- 재개 HEAD는 `036ef6e`였다. 중단 전 기준 사본 59개를 SHA-256으로 검증하고 현재 변경 88개 경로와 비교했다. 기존 Goal42·43 코드를 임의로 Goal44에 포함하지 않았다.
- 사용자의 별도 승인으로 정확한 선행 사본을 외부 격리 디렉터리에 복원하고 `npm ci`와 `npm run check`를 새로 실행했다. 210 suites/1188 tests, 410.242초 통과 후 `b11b0049a65f855664784c0992906b1b35b5f5cf`에 Goal42·43만 기록했다. 해당 결과는 Goal44 검사 결과가 아니다. 실제 worktree를 되돌리지 않고 별도 index로 커밋했다.
- 재개 시 이전8081 PID43927과 listener가 없고 HTTP 연결도 실패했다. 실행 중인 서버를 종료하지 않고 `npm run web`으로8081을 시작했다. 재개 후 PID58453을 유지했다. 과거 PID는 현재 사실로 사용하지 않았다.
- ENV·medium 원본·사용자 삭제를 수정하지 않았다. 캡처·로그·비교 도구는 저장소 밖에 보관했다. 장애 기본값은 `notificationPreviewScenario = 'normal'`이다.

## 구현과 사용자 흐름

| 흐름 | 구현·검증 |
| --- | --- |
| 홈→Notifications→홈 | 실제 root navigation 연결. 로그인 닫기/취소/실패/재시도 후 홈 복귀, 개인 행동은 사용자가 다시 실행한다. 홈 Featured 선택 보존을 navigation 테스트로 확인했다. |
| 알림 목록 | 사용자별 fixture, 초기 로딩·빈 목록·조회 오류/Retry·추가 갱신. FlatList의 알림 ID 키, 시간 내림차순/ID 동률 정렬. 페이지 API 없이 전체 mock 목록을 가상화한다. |
| 사용자/기사/목록/응답 대상 | 기존 작성자·기사·공개 목록·응답 패널로 이동한다. 목록 owner/접근 권한, 기사 존재/차단, 응답의 기사 ID와 삭제 여부를 확인한다. 기존 응답 패널에서 대상과 조상 답글을 펼쳐 표시한다. 실패 시 목록에 남고 재시도할 수 있다. |
| Follow | 부모 알림 열기와 독립된 버튼. 기존 관계 저장소를 사용하며 작성자 화면과 일치한다. 이름·사진은 ID로 공유 프로필을 조회한다. |
| Push | Digest/Top stories/Editors/Featured/Applause/Saves 각각 즉시 저장한다. 변경 중 Saving, 실패 시 선택 보존·항목별 Retry. |
| Tailored | 작가 새 글·박수·highlight·응답·멘션의 하위 초안 선택. Done 확정, 닫기/Escape 취소, 트리거로 포커스 복귀. |
| Email | 전역·Digest·작가·소셜·Digest 메일 빈도를 선택하고 저장한다. 실제 계정 페이지가 아닌 자체 mock 화면임을 표시한다. |
| Digest | Frequency·Push·Email을 같은 공급부에 연결했다. 하나의 모달 안에서 하위 화면과 선택을 전환한다. 하위 뒤로/취소가 부모를 함께 닫지 않는다. 날짜 June11 선택과 기존 목록 맥락을 보존한다. |
| 온보딩/OS 권한 | 계정별 안내 이력과 기기 권한을 분리했다. native 어댑터의 조회·명시적 요청·설정 열기·앱 복귀 조회를 구현했다. 웹/모듈 없는 binary는 unsupported다. 실제 기기 성공은 미검증이다. |
| 인증/재시작 | A→B→A, 같은 A 재로그인, source 교체, 늦은 성공/실패 격리. 같은 실행의 확정 데이터는 source에 유지하고 화면 초안·오류는 새 수명으로 분리한다. 전체 웹 reload는 인증·mock 데이터 초기화다. 실제 앱 재실행은 미검증이다. |

## 상태와 데이터 계약

- `NotificationSource`가 계정별 확정 inbox/수신 선호/version을 소유한다. `NotificationProvider`의 store는 사용자 ID+인증 revision+source 수명에 묶인다. 이름/사진 변경은 이 키를 변경하지 않는다. 기존 프로필·관계·발행·통계·저장 데이터를 복제하거나 초기화하지 않는다.
- 알림은 `id/eventId/recipientId/actorId/kind/subject/target/occurredAt/read`를 가진다. target은 writer ID, article ID, list ID+owner ID, article ID+response ID의 판별 union이다. 잘못된 수신자/중복 ID/event ID/시간 응답은 오류 처리한다. 대상의 최신 접근성은 열기 전에 다시 확인한다.
- 시각은 UTC ISO `Z`, 정렬은 발생 시각 내림차순 후 ID(en 비교)다. 상대 시간은 1일 미만 분/시간, 이후 UTC 날짜다. 미래 시각은 just now로 제한한다. 화면 활성/앱 foreground 때만 분 단위 표시 시계를 운용한다.
- **읽음은 자체 보완:** 대상 확인 및 navigation 명령 성공 후 `markRead`를 요청한다. Follow만 누른 경우 읽음 처리하지 않는다. 대상 열기 실패는 미읽음 유지, 읽음 저장 실패는 목록의 재시도 표시를 남긴다. 녹색 선은 이 mock 읽음 표현이며 보관 원본 의미가 확인됐다는 주장이 아니다. 대상 화면 이후 추가 조회 실패까지 읽음 명령을 되돌리는 정책은 없다.
- mock `receive`는 수신자+eventId 중복을 무시한다. 재조회/재마운트/계정 복귀는 이벤트 생성이 아니다. 모든 앱 행동에 알림을 자동 생성하지 않는다. 일괄 읽음·삭제·새 필터는 추가하지 않았다.
- 각 설정 항목은 독립 명령이며 같은 항목만 직렬화한다. 실행 중 바뀐 마지막 선택을 다음 명령으로 저장한다. 실패 초안과 operationId를 보존하고 Retry가 중복 명령을 만들지 않는다. 오래된 조회/실패는 최신 쓰기/version을 덮지 않는다. 한 항목의 실패가 다른 항목을 롤백하지 않는다.
- Tailored/빈도 선택 화면은 Done 전까지 화면 초안이다. 부모/하위 닫기 전에 제출된 저장은 source에서 확정됐으면 유지된다. 단순 화면 닫기를 서버 취소로 표현하지 않는다. 로그아웃/공급부 교체는 이전 store AbortSignal을 폐기한다. mock source는 commit 전 취소를 검사한다.
- `digestPush`는 Digest의 Push 표시와 전역 Push의 New Medium Digest가 같은 값이라는 **명시적 mock 연결 정책**이다. `digestFrequency`는 앱 선호이며 기존 날짜별 fixture 묶음을 재생성/삭제하지 않는다. 별도 `emailFrequency`와 동일시하지 않는다.
- 전역 Email Off는 발송 선호의 상위 gate다. 작가별 구독 선택·Follow·기존 알림·저장 기사·Digest를 삭제하지 않는다. 작가별 구독은 기존 relationship source가 계속 소유한다. 실제 발송 엔진은 없으며 두 설정의 조합을 전송 성공처럼 표시하지 않는다.
- OS 권한은 기기/설치 범위의 별도 source다. 계정 변경은 OS 권한을 초기화하지 않는다. 화면 진입은 조회만 수행하며 사용자의 요청 때만 prompt한다. granted/denied/undetermined/unsupported/요청 오류를 구분한다. 미결정·미지원 결과를 denied 온보딩 이력으로 저장하지 않는다.

## 1차 자체 검토와 수정

코드 경계·source/store·ID·쓰기 계약·실제 navigation·중단 시 브라우저 실패를 검토했다. 독립 에이전트 검토가 아니다.

| 재현/기대 | 원인·수정·검증 |
| --- | --- |
| settings 조회 중 저장 성공 후 늦은 조회 실패가 오면 최신 성공을 유지해야 한다 | 조회 세대를 무효화하고 갱신 로딩/오류를 함께 해제했다. 오래된 성공/실패와 항목별 마지막 의도를 store 테스트로 확인했다. |
| store 폐기 후 재활성화한 설정 저장이 이전 잠금에 막히면 안 된다 | 수명별 writing Set을 분리하고 activate에서 초안/읽음 작업/오류를 정리했다. 이전 finally가 새 Set을 건드리지 않는 회귀를 추가했다. |
| Digest 하위 취소가 설정 전체를 닫거나 이중 모달을 남기면 안 된다 | 중첩 Modal을 하나의 LibrarySheet 내부 상태로 변경했다. 실제 requestClose와8081 취소·뒤로·날짜 복귀를 확인했다. |
| 선택을 닫은 뒤 포커스가 사라지면 안 된다 | 선택 트리거 ref를 보관하고 닫기/Done 후 복귀시켰다. 웹 activeElement를 검사했다. |
| 왼쪽 닫기 버튼이 제목까지 덮으면 안 된다 | RN Web의 right undefined 병합 문제를 right auto+48 폭으로 수정했다. 공통 confirmation 아이콘의 기존18 크기는 보존했다. |
| 백그라운드/숨은 알림 화면에 타이머가 계속 남으면 안 된다 | route 활성과 AppState를 함께 확인하고 interval/listener를 해제했다. |

## 2차 자체 재검토와 수정

1차 수정 후 코드·새 회귀·실제 캡처·브라우저 상태를 다시 검토했다. 첫 검토를 복사한 기록이 아니다.

- Permission source 교체 중 busy/error와 늦은 응답이 남는 경로를 source 세대별 컴포넌트로 분리했다. 교체 후 오래된 실패가 새 UI에 나타나지 않는 실제 navigation 테스트를 추가했다.
- 앱 foreground에서 provider/화면이 동시에 권한을 조회하면 응답 순서가 바뀔 수 있었다. 같은 revision의 조회를 공유하고 명시적 요청을 최신 작업으로 보호했다. 동기 예외도 Promise 경계에서 처리했다.
- 온보딩에서 undetermined/unsupported를 거절 이력으로 저장하던 경로를 수정했다. 명시적 허용/거절만 확정하며 오류 뒤 Skip/재시도가 가능하다. 늦은 최초 조회 오류가 새 요청 오류를 덮지 않게 intent를 추가했다.
- native 모듈 미지원에도 웹이라고 하던 안내를 현재 실행 환경 미지원으로 수정했다.
- 최종 비교에서 Push 토글 크기·구분 배경·Digest 문구 크기/행 높이/빈도 수직 정렬·선택 아이콘을 보정했다. 원본44 높이의 일부 행은 논리48 터치 규칙 때문에 세로 차이가 남는다.
- 최종 코드 검토에서 알림 대상의 article source가 교체되는 동안 이전 조회가 완료되는 수명도 분리했다. 기사 공급부 세대별 화면을 재마운트하며 늦은 성공/실패가 navigation·오류를 만들지 않는 회귀를 추가했다. 초기 effect 내 동기 setState 구현은 lint에서 거부되어 render 경계/key 방식으로 수정했으며 lint 우회는 하지 않았다.
- 중단 전/재개 후 Escape 검사 실패를 재현했다. 실패 시 RN Web Modal이 아직 `role=dialog`가 아닌 animation 초기 상태였다. 임의 sleep 대신 활성 dialog를 기다려 검사하도록 외부 스크립트를 수정했다. 앱의 공통 fade 애니메이션은 유지했다. 이 자동화 타이밍 문제를 제품 결함 수정으로 계산하지 않는다.

## 검사 실행

Node24.18.0 (`.nvmrc` 일치), npm, Expo57.0.33/RN0.86.3, macOS14.2 arm64. FE 디렉터리에서 다음 PATH를 적용했다.

```sh
export PATH=/Users/jaegeunsong/.local/share/fnm/node-versions/v24.18.0/installation/bin:$PATH
npm run check
npm test -- --testPathPattern='NotificationNavigation|DigestNavigation'
npx expo install --check
npx expo export --platform all --output-dir <저장소 밖 증거 경로>/commit-export
```

- 전체 검사: 타입/lint·216 suites/1242 tests,356.634초 통과. 아래 마지막 시각/기사 공급부 경계 수정 전 실행을 시작한 검사이며, 그 변경은 별도 영향 검사로 확인한다.
- 중간 전체 검사:216 suites/1234 tests,364.711초 통과. 이후 권한/온보딩 회귀와 시각 수정이 있어 이것을 최종 검사로 대신하지 않았다.
- 수정 회귀:10 suites/74 tests,22.791초 통과. source 교체·권한 경합·미결정/미지원 온보딩·실제 navigation 포함.
- Digest 시각 정렬 수정 후 타입/lint·4 suites/26 tests,11.91초 통과. 이후 기사 공급부 교체 회귀를 추가한 최종 타입/lint·4 suites/30 tests,16.259초도 통과했다(`source-final-check.log`). 전체216/1242는 앞선 코드 기준이며 새4건을 포함한 전체 재실행이라고 표기하지 않는다.
- `expo install --check`: Dependencies are up to date. web/iOS/Android export 성공. 마지막 시각/기사 공급부 수정 뒤 `commit-export`도 세 플랫폼 모두 성공했다.
- 8081 Chrome 실제 조작8흐름 통과, console/page 오류0. 별도 대상 권한/긴 목록/원본 비교 fixture3흐름 통과, 오류0. 긴 한국어150행 중31개 렌더,320px에서 수평 overflow 없음, 대상 복귀 후 scroll2400 보존. Dark/CSS160%·선택 checked·Escape/포커스 복귀 확인. 이는 OS 글자 확대/VoiceOver/TalkBack 검증이 아니다.
- `NotificationNavigation.test.tsx`는 실제 AppNavigator를 렌더한다. navigation을 mock하지 않았다. source/OS 권한 주입은 외부 경계 대체다. 기존 OnboardingNavigation/DigestNavigation과 알림 store/native adapter 회귀를 보완했다.

## Medium 근거와 시각 비교

medium README와 F05/F06/F43/F44/F53/F58/F59 분석·원본, 작가 Follow/Email 메뉴를 확인했다. 기준은 보관 iOS version1419이며 현재 앱과 동일 버전이라고 가정하지 않는다.

| 원본 ID | 비교·판정 |
| --- | --- |
| `sc_5d1c7181dea04ba59b57242abbc19fee` | 알림 원본4행. 기능 fixture5행과 별도로 원본 이름·문장·날짜4행을 외부 브라우저 source에 주입해 비교했다. fallback 아바타·폰트·Follow 터치 wrapper와 행 높이 차이가 남는다. |
| `sc_ee2e76b092df4d309bfd0633f25273a6` | Push 기본. 순서·토글/선택형·그룹·문구 구현. header/행48 터치 규칙과 원본40/44 높이 차이, 플랫폼 폰트/아이콘 차이가 남는다. |
| `sc_368c53cd77e2421e8279124ce03301f4` | Top story/Editors 두 토글 Off, 다른 항목 유지. 같은 조건 실제 캡처와 대조했다. |
| `sc_d17bad2e556e4b0abfdc9541f90c46f2` | Digest 설정. Frequency/Daily·Push chevron·Email 외부 화살표·시트 배치 보정. Email 목적지는 자체 mock 화면으로 연결한 차이가 있다. |

5비교쌍은 위 **고유 원본4장**이며 전체200장 검증이 아니다.1179×2556 원본을393×852로 정규화하고 상단59/하단34 제외한 앱 영역과 Chrome393×759를 비교했다. 이는 원본 기기/DPR 측정이 아니다. 보관 `sc_ddd51660cb8346a1b200ed970a2d5c45` 설정 진입, `sc_e9f4c426cfb3426d9ca05121dea00ce3` 온보딩, `sc_3ecf6d2988a6418fa4d2006fa4497b23` 작가 이메일 메뉴도 직접 확인했다.

- **관찰:** green 표시, Follow,6토글·5Tailored 행, Digest Daily/Push/Email의 서로 다른 컨트롤. 녹색 의미·잘린 하단 행 전체 이름은 미확인이다.
- **추가 조회:** Gummble에서 Tailored/Email/Digest 설정 보완을 조회했으나 펼친 모바일 옵션 대신 기존 Push 캡처/웹 도움말·설정 자료가 반환됐다. 원본 메뉴 확보로 계산하지 않는다.
- **공식 설명:** [Medium 이메일 선호 도움말](https://help.medium.com/hc/en-us/articles/115004745947-Adjust-email-preferences)은 현재 수신 범주/빈도 개념을 보완한다. 보관본의 기본값·픽셀·선택지 증거가 아니다.
- **자체 보완:** Tailored/All/Off, Daily/Weekly/Off, Email 편집 화면, 읽음·오류/Retry·빈 상태·대상 preflight·permission 안내. 미수록 옵션을 원본 사실로 확정하지 않았다.
- **제외:** 실제 수신·발송·기기 토큰·APNs/FCM/Expo Push 등록, 실계정 Email 페이지 변경, 일괄 읽음/삭제, 원본에 잘린 미확인 행의 기능 추정.

## OS 구현과 검증 대기

`expo-notifications ~57.0.25`를 SDK57 호환 검사 후 최소 추가했다. [SDK57 문서](https://docs.expo.dev/versions/v57.0.0/sdk/notifications/)와 설치된 native module의 permission/channel 계약을 확인했다. 최상위 런타임 import의 자동 token listener를 피하고 Expo optional native permission/channel module만 사용한다. token 발급/등록 API를 호출하지 않으며 실제 권한을 쓰려면 모듈이 포함된 새 native build가 필요하다.

| 환경 | 구현/확인 | 남은 검증 |
| --- | --- | --- |
| 웹 | unsupported를 명시하며 계정 선호는 저장 가능. 브라우저 알림 prompt를 실행하지 않는다. | 웹 성공을 iOS/Android 권한 성공으로 주장하지 않는다. |
| Jest iOS/Android | 권한 module 대체로 허용/거절/미결정/실패·중복/역순·모듈 없음 검사. 최상위 notifications import 금지 회귀 포함. | 실제 OS prompt/설정 복귀가 아니다. |
| iOS | permission 조회/요청·provisional/ephemeral 허용·OS 설정 열기·foreground 갱신 구현. JS/Hermes export 성공. | Xcode 미설치, CLT만 존재. simctl exit72, xcodebuild exit1. Xcode+Simulator/실기기에서 새 빌드·설치·prompt·복귀·Safe Area·VoiceOver·Dynamic Type 확인 필요. |
| Android | explicit 요청 전 notification channel 생성·permission 조회/요청·OS 설정/복귀 구현. JS/Hermes export 성공. | SDK/adb/emulator 없음. JDK는 있으나 실제 build/install/run 불가. SDK와 emulator/실기기에서 새 빌드·API별 권한·뒤로·TalkBack·큰 글자 확인 필요. |

OS 권한 구현은 mock만 남은 Goal41의 연결 잔여를 일부 해소했다. 실제 기기 실행·권한 UI 검증은 아직 해소하지 않았다. 기기 토큰 등록·발송 서비스는 의도적으로 미구현이다.

## 증거 위치와 재현

현재 증거 루트: `/var/folders/jg/zn9h2_f91nxfpwz9hzpkqcv80000gn/T/kostolany-goal44-resume-3qjxkk98`.
중단 전 사본: `/var/folders/jg/zn9h2_f91nxfpwz9hzpkqcv80000gn/T/kostolany-goal44-slioa8zd`.

`final-check.log`, `visual-final-check.log`, `source-final-check.log`, `review2-tests.log`, `commit-export.log`, `platform.json`, `browser-flows.cjs/json/log`, `browser-extended.cjs/json`, `browser-smoke.cjs`, `pairs.json`, `compare-*.png`에 명령/실제 캡처를 보관한다. 재현은 해당 스크립트를 Node로 실행하고8081을 사용한다. 장애/원본 비교용 source 대체는 해당 브라우저 메모리에만 적용하며 기본 앱 코드를 바꾸지 않는다. 임시 디렉터리는 OS 정리로 유실될 수 있고 저장소에 증거를 영구 보관하지 않았다. 문서의 원본 ID·조건·아래 순서로 재생성해야 한다.

## 8081 최종 확인 순서

1. 새로고침→홈 알림→로그인 닫기/사용자 취소/실패→Retry→홈 복귀→알림 다시 열기.
2. A 알림 Follow→작가 프로필의 같은 관계 확인→뒤로. 기사·공개 목록·응답 행을 열고 각각 알림으로 복귀한다.
3. 프로필→설정→Push. Top story/Editors 변경 후 다른 토글을 확인한다. Tailored 선택→취소/Done→재진입한다.
4. 라이브러리→Digest→June11→설정. Frequency 취소/Weekly 저장, Push 같은 값 확인, Email 전역 Off 후 작가별 선택이 유지되는지 확인한다. 닫으면 June11로 복귀한다.
5. 설정 로그아웃 취소/실패/Retry→B 로그인→빈 알림·B 기본 선호→로그아웃→A 복귀 후 A 저장값을 확인한다.
6. 작은 폭320·Dark에서 설정 스크롤/선택/닫기/포커스를 확인한다. 하단 기기 권한은 웹 미지원이며 iOS/Android 성공으로 표시하지 않는다.
7. 전체 새로고침으로 인증과 mock 선호가 초기화되는지 확인한다. 실패/지연/삭제 대상 회귀는 위 외부 브라우저 스크립트 또는 저장소의 테스트로 재현한다.

최종 staged diff는 Goal44 코드·테스트·문서40개 경로만 포함한다. `git diff --cached --check` 통과, ENV/medium/저장소 내부 임시 증거 추가 없음, 재개 후8081 PID58453 유지 확인. 로컬 커밋 후 승인된 Goal45를 이어서 진행한다.
