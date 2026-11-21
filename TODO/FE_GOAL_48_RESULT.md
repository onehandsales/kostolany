# Goal 48 — Member·Friend 구독 화면과 mock 권한

2026-11-21 KST, macOS. **기능 구현·두 차례 자체 검토 수행, 현재 자동 검사 통과·원본/실제 native 검증 잔여.** 시작 HEAD는 Goal47 `10844cb9701bfadeb8adcef1de4e45f4e0d4b459`이며 작업 트리는 깨끗했다. Goal44→53 연속 승인에 따라 검토·검사·문서 갱신 후 이번 범위만 로컬 커밋한다. 실제 구매·스토어·영수증·갱신·환불·외부 서비스는 연결하지 않는다.

## 화면과 연결

| 흐름 | 구현·검증 |
| --- | --- |
| 설정 → Membership and payment / Become a Friend | 실제 플랜 화면으로 연결. 월간/연간 선택, Member/Friend, 현재 플랜, 실패/재시도, 처리 중, mock 성공, Welcome을 제공한다. 닫기 후 원래 설정으로 돌아온다. |
| 온보딩 → Explore membership | 기존 안내만 표시하던 화면을 같은 MembershipPanel로 교체했다. 하위 뒤로/닫기는 온보딩의 membership 단계에 남는다. Start reading은 온보딩 complete 저장을 거친다. 저장 실패는 기존 온보딩 복구 계약을 따른다. |
| Listen | guest는 로그인 안내, Free는 플랜 선택으로 이동한다. 성공 후 원래 기사로 돌아오며 사용자가 Listen을 다시 누른다. Member/Friend는 기존 무음 mock 플레이어를 사용한다. 실제 음성 출력은 없다. |
| 목록 다운로드 | Free는 같은 플랜을 연다. 확정 후 같은 목록에서 사용자가 다시 다운로드한다. 저장소도 권한을 검사해 UI 외 호출로 우회하지 못한다. 기존 사본은 소유권/목록 정책을 유지하며 권한이 없으면 읽을 수 없다. 삭제는 허용한다. |
| Friend Link | 기사/인용의 기존 `reference.memberOnly`를 ShareTarget으로 전달한다. 회원 전용 글의 작성자 또는 Friend 계정만 미리보기 링크를 복사한다. 다른 Free/Member는 Friend 화면을 연다. 무료 글은 일반 Copy link를 안내한다. 실제 우회 링크는 발급하지 않는다. |
| Custom app icon 자격 | 같은 `custom-icon` 권한(Friend)을 설정 진입에서 검사한다. Free/Member는 플랜으로 연결한다. Friend의 실제 아이콘 선택 화면·OS 적용은 Goal49 범위로 남으며 안내 상태를 구현 완료로 계산하지 않는다. |
| 계정·재실행 | 같은 실행에서 B의 확정 Member/Friend와 A의 기존 Member는 분리 보존된다. 로그아웃·같은 A 재로그인·source 교체는 미저장 선택/시트/오류를 제거한다. 전체 새로고침은 인증과 mock 변경을 초기화한다. |

## 상태·취소·소유권 계약

- 확정 사실은 `MembershipSource.getSnapshot()`의 계정별 record 한 곳이 소유한다. `userId`, `tier: member/friend`, `period: monthly/annually`, `confirmedAt`(UTC ISO), `requestId`를 가진다. record가 없으면 Free다. 화면·Auth·Listening·Download에는 별도의 구독 사실 저장소를 만들지 않는다.
- 기본 fixture A(`example-reader`)는 기존 Member/monthly, B와 다른 미등록 ID는 Free다. A의 온보딩 상태는 별도 관심사 설정 이력이며 멤버십 등급을 생성하거나 취소하지 않는다. 원본 비교는 Free인 B의 월간 선택을 사용한다. 실패·경합 검사는 빈 계정 source와 지연/동기 실패를 별도 주입한다.
- MembershipProvider는 auth 사용자 ID/revision, source 세대와 확정 record를 연결한다. 프로필 이름·사진·기본 설명 수준·목록·반응·관계·발행·통계 상태를 수정하지 않는다. 구독 변경으로 인증 revision/public navigation을 초기화하지 않는다.
- `createMembershipSession`은 화면 지역 주기·선택 플랜·choosing/pending/error/success/welcome만 소유한다. 메모리 카탈로그 조회는 동기 구독이므로 별도 네트워크 조회/조회 로딩을 구현했다고 주장하지 않는다. 로딩은 선택한 mock 명령에 대한 상태다.
- 중복 Select는 한 요청만 실행한다. 처리 중 주기 변경은 이전 미확정 요청을 abort하고 새 선택을 받는다. 실패 시 주기·선택 플랜을 유지하며 같은 Select로 재시도한다. 이미 선택한 동일 플랜/주기는 Current plan으로 비활성화한다. Friend→Member 강등·해지/복원은 미확인 범위로 제공하지 않는다.
- source는 사용자별 마지막 requestId와 AbortSignal·현재 세션 predicate를 확정 직전에 검사한다. 동일 명령 재시도는 기존 결과를 반환하며 새 권한/중복 이벤트를 만들지 않는다. 이미 끝난 옛 명령의 재조회가 최신 진행 요청을 무효화하지 않는다. 취소 시 지연 타이머/abort listener도 정리한다.
- 닫기·화면 이탈·로그아웃·source 교체 전 미확정 요청은 취소한다. **이미 source에 확정된 권한은 성공 화면을 닫아도 유지한다.** 이미 확정된 저장과 화면 초안 취소를 구분한다. 잘못된 응답 사용자/플랜/기간/날짜와 기준 source 미확정 응답은 성공으로 표시하지 않는다.
- 실제 결제 만료/갱신 시각·스토어 상품·영수증·토큰은 없다. `confirmedAt`은 mock 권한 확정 시각이며 구독 만료일이 아니다. 월/연간 변경은 실제 청구를 예약하지 않는다.
- Goal45 guest/A/B 동일 재생과 Goal35 회원 제한 없음 정책을 이번 명시적 mock 권한으로 변경했다. Goal47의 자기 글 전체 Friend 미리보기도 회원 전용 자격으로 좁혔다. 무료/Unlisted 발행 글은 일반 주소로 계속 공유할 수 있다. 현재 공식 설명을 보관본에서 관찰한 권한 정책이라고 기록하지 않는다.

## 1차 자체 검토 → 수정·검증

코드 경계·원본 PNG·초기 검사·8081 화면을 대조했다. 독립 검토가 아니다.

| 재현·기대 | 원인·수정·검증 |
| --- | --- |
| 웹 월/연간 선택이 스크린리더에도 표시돼야 한다 | accessibilityState만으로 웹 aria-checked가 누락됐다. 명시 aria-checked와 native checked를 함께 제공하고 브라우저 속성을 검사했다. |
| 온보딩 하위 멤버십에서 뒤로 가면 부모 membership 단계로 돌아와야 한다 | Modal 부모의 onRequestClose가 notifications 단계로 이동할 수 있었다. 열림 상태를 Modal 소유자로 옮겨 하위 패널부터 닫는다. 실제 Escape→재진입→구독 완료를 확인했다. |
| B의 재생/다운로드 회귀가 새 Free 정책과 일치해야 한다 | 기존 테스트가 B도 바로 사용 가능하다고 가정했다. 실제 플랜 선택·성공·복귀를 거친 후 기존 늦은 응답/사본 소유권 검사를 계속하도록 고쳤다. 정책 검사를 약화하지 않았다. |
| 상태 문구와 입력 값 검사는 의미가 같아야 한다 | RNTL14 text matcher의 기본 exact 비교로 부분 문자열 기대가 실패했다. 정규식 포함 검사로 수정했다. 타입 오류·JSX apostrophe lint도 우회 없이 수정했다. |

## 2차 재검토 → 추가 수정·검증

수정된 source/session·소비자·실제 브라우저·5쌍 비교를 새로 검토했다.

- 완료된 옛 요청의 idempotent 재시도가 `latest`를 먼저 바꾸면 진행 중 새 요청이 취소될 수 있었다. 완료 결과 검사 뒤에 latest를 갱신하고 전용 회귀를 추가했다.
- 화면이 닫힌 뒤 확정 결과가 무효화되는지, 기간 변경 뒤 늦은 응답·동기 예외·같은 계정 재로그인에서 선택/오류가 부활하는지 확인했다. 브라우저에서 성공 UI를 닫은 뒤 같은 확정 플랜이 Current plan으로 유지됐다.
- Download의 UI gate뿐 아니라 store의 시작/완료/사본 읽기에도 같은 권한을 연결했다. 권한 철회 중 사본 읽기/새 작업 금지와 사본 제거 허용을 회귀 검사했다.
- DownloadProvider가 React 재구독 전의 권한 boolean을 캡처하면 철회 직후 사본을 읽을 수 있었다. source의 현재 record를 매번 검사하고 source 세대를 scope에 포함했다. React 알림 없이 권한을 철회하는 새 Provider 회귀로 이 간격을 검증했다.
- Member/Friend 화면의 heading 기본 굵기, 결제 주기까지 여백, 혜택 글자·구분선·Select의 시각 높이를 실제 원본 대조로 수정했다. Select는 작은 시각 높이와 별개로48px 터치 영역을 유지한다. 월간 가격 보관본 안내는 고정 헤더에 배치했다.
- 성공/Welcome의 주요 버튼 포커스를 연결했다. 320px·Dark·CSS160%에서 긴 혜택 세로 스크롤·닫기·가로 넘침을 확인했다. 실제 Dynamic Type/VoiceOver/TalkBack 검증으로 계산하지 않는다.
- 온보딩/공유 안의 하위 패널은 부모 Safe Area를 재사용하도록 embedded 경계를 지정했다. session 정리는 layout effect에서 수행해 이탈 커밋 직후 늦은 요청을 차단한다. 다크 Welcome 버튼은 inverse/onInverse 색을 짝지어 대비를 수정했다.
- 앱 아이콘은 권한 입력과 잠금 진입만 이번 범위에서 연결했다. 실제 아이콘 UI/OS 적용을 이번 검증 완료로 오인하지 않는다.

## 실제 검사

Node24.18.0, npm, Expo57.0.33/RN0.86.3. `FE/.nvmrc`와 현재 package를 기준으로 Node 경로를 PATH 앞에 지정했다. 새 의존성은 없다.

| 검사 | 결과 |
| --- | --- |
| 최초 타입/lint | TS 범위/StyleSheet API·JSX lint 실패를 수정했다. 로그를 보존했다. |
| 초기 영향 검사 | 10 suites/68 tests 통과,19.188초. `review-1-tests.log`. |
| 2차 수정 영향 검사 | 10 suites/66 tests 통과,14.652초. `review-2-tests.log`. 이 값은 해당 필터 범위다. |
| 최종 타입·lint·전체 테스트 | `npm run typecheck && npm run lint && npm test`: 234 suites/1,344 tests 통과,378.675초(`final-check.log`). 실행 도중 이어진 최종 경계 수정과 새 DownloadMembership 회귀는 아래 영향 검사로 별도 확인했다. 전체 검사를 모든 최종 수정 이후에 실행했다고 표현하지 않는다. |
| 최종 수정 영향 검사 | 타입·lint 통과. `npm test -- --testPathPattern='Membership\|DownloadsNavigation\|DownloadMembership\|ListeningNavigation\|OnboardingNavigation\|SharingNavigation\|ShareSheet\|createDownloadStore'`: 18 suites/108 tests 통과,27.043초(`final-permission-check.log`). 새 DownloadMembership의 양 플랫폼 회귀를 포함한다. |
| 실제 navigation | 새 MembershipNavigation의 설정 취소/실패/재시도/성공, Listen→Member→Friend 링크, A→B→A/같은 A/source 교체를 확인했다. navigation 자체는 대역이 아니다. 기존 Listening/Downloads/Onboarding navigation도 보완했다. |
| source/session·store | 새 createMembershipSession 테스트와 Download 권한 회귀에서 중복·취소·경합·계정·잘못된 응답·권한별 차이를 확인했다. |
| 8081 Chrome | `browser.cjs`4묶음, `faults.cjs`3묶음, `connections.cjs`4묶음 통과. 각각 console/page 오류0. 실제 웹 clipboard 결과와 기간/플랜 표시를 확인했다. |
| 3플랫폼 export | 최종 경계 수정 후 설치된 Expo57 CLI의 `export --platform all --max-workers 2 --output-dir <증거 루트>/permission-export` 성공. web JS·iOS/Android Hermes 산출이며 실제 native 빌드/실행이 아니다. |

중간 전체 검사에서는 기존 Android 다운로드 테스트가 B의 Free 정책을 반영하기 전 실행되어 1 suite/1 test가 실패했다(`full-check-2.log`). 해당 테스트가 실제 Member 선택 후 사본 소유권을 계속 검사하도록 수정했고 위 전체/영향 검사에서 통과했다.

실패 주입은 브라우저 메모리의 membership source에서만 수행하고 reload로 복원했다. 자동화 초기 selector/모달 진입 대기·온보딩 overlay 처리 오류와 스크립트 경로 오타는 수정 후 다시 실행했다. export를 저장소 루트에서 잘못 실행한1회는 package.json 부재로 실패했고 npm cache에서 받은 Expo58을 증거로 사용하지 않았다. FE의 설치된 Expo57 CLI를 명시해 다시 실행했으며 package.json/lock 변경은 없다. 이들을 앱 결함이나 최종 통과 결과로 혼용하지 않는다.

## 원본·공식 설명·미확인

`medium/README.md`, F39/40/53/54/58/60의 분석/대응표와 실제 구독5장·아이콘 잠금 PNG를 확인했다. 공유 관련 PNG는 Goal47에서 직접 대조한 같은 보관본을 사용한다.

비교 조건은 원본1179×2556→393px 축소, OS 상단59/하단34 제외와8081 Chrome393×759다. iOS 네이티브 렌더러와 동일한 환경은 아니다.

| 원본 ID | 구현 캡처·판정 |
| --- | --- |
| `sc_b4e85416681544c9b996826eefa22432` | `monthly.png`, 월/연간·Member·가격/혜택. 헤더의 mock/보관본 안내·폰트·상단 native 시트 배경 차이. |
| `sc_4beaf37694cb429baac5c27b93a71ccf` | `benefits.png`, Member8개 혜택·Friend 진입. 폰트/스크롤 위치·논리 터치 영역 차이. |
| `sc_754aff4161c64e0685e7331a359eae32` | `loading.png`, 중복 금지·spinner·취소 가능. OS spinner/명암 차이. |
| `sc_bb00623f121d405abc840e589837c3fd` | `success.png`, 실제 구매 성공 문구를 `Your mock membership is ready.`로 바꾸어 구분했다. OS Alert를 실제 구매 결과처럼 재현하지 않는다. |
| `sc_cf306e89e43144029ce108cb5338132a` | `welcome.png`, Start reading·복귀. 대체 글꼴·mock 안내·Friend 변형은 차이/보완이다. |

- 월간 Member $6.98 SGD/Friend $19.98 SGD, Save up to $39와 Member 혜택 목록은 보관본 관찰값이다. 39%로 바꾸지 않았다. 현재 판매 가격이나 실제 활성 기능 목록이 아니다. 연간 금액은 미확인으로 표시하고 계산/현재 달러 가격을 끼워 넣지 않았다.
- [현재 공식 Membership 설명](https://help.medium.com/hc/en-us/articles/115004545567-Become-a-Medium-Member), [Friend Links 설명](https://help.medium.com/hc/en-us/articles/360006543813-About-Friend-Links)을2026-11-21 조회했다. 문서의2026-11-11 갱신과 과거 보관본을 구분한다. 오디오/오프라인·Friend 링크의 자격을 참고했으며 원본 픽셀/기본값 증거로 소급하지 않는다.
- Gummble의 연간/Friend/구매 복원 추가 조회는 정확한 결과0, 관련 로그아웃 화면1개였다. 해당 화면을 구독 근거로 쓰지 않았다. Friend 카드의 미수록 상세 설명·연간/실패/Current plan·구독 상태·gate는 최소 mock 보완이다.
- 앱 아이콘의 Friend 자격은 `sc_64b75d913b284d708ab44e4f3663a59f`의 잠금 문구를 확인했다. 실제 모든 아이콘·Friend 해제 결과·OS 홈 화면 변경은 미확인이다.
- 기사 paywall 전체·스토어 구매 확인·복원·자동 갱신·해지·환불 화면은 미수록/미구현 범위다. 수익화·custom domain·publication 생성·Mastodon은 혜택 문구만 보이며 실제 서비스를 추가하지 않았다.

## 플랫폼·증거·남은 검증

- web: 정상/취소/실패/재시도·계정·원래 화면 복귀·모의 권한과 실제 clipboard를 확인했다. 320px Dark CSS160%는 웹 검증이며 OS 접근성 증거가 아니다.
- iOS: macOS14.2의 CommandLineTools만 있다. `xcodebuild -version` exit1, `xcrun simctl` exit72로 Xcode/Simulator가 없다. native 프로젝트도 없다. 실제 빌드·설치·실행/Safe Area·native Modal 뒤로·Dynamic Type·VoiceOver 검증 대기다.
- Android: SDK/adb/emulator와 native 프로젝트가 없다. 실제 빌드·설치·실행/하드웨어 뒤로·TalkBack·큰 글자 검증 대기다. 이 사실은 이번 작업의 `platform.json`에서 새로 확인했다.
- 필요한 환경: Expo57/RN0.86 호환 개발 빌드, Xcode+iOS Simulator/기기, Android SDK+에뮬레이터/기기. 플랜 열기/주기 변경/닫기·성공·계정 전환을 각 플랫폼에서 반복해야 한다. 결제 SDK/스토어 연결은 이번 mock 범위에 포함되지 않는다.

증거 루트: `/var/folders/jg/zn9h2_f91nxfpwz9hzpkqcv80000gn/T/kostolany-goal48-ao428k9y`.

`baseline.json`, `platform.json`, 검사 로그·브라우저 스크립트/JSON·캡처·`pairs.json`·`compare-01.png`~`compare-05.png`·export를 저장소 밖에 보관했다. 임시 OS 경로이므로 정리되면 사라진다. 로컬 Playwright/Chrome과 기존8081로 스크립트를 재실행할 수 있다. 저장소에는 임시 로그/비교/검증 스크립트를 추가하지 않는다. 원본 시각 차이·실제 native 검증이 남으므로 전체 동일 재현/출시 완료로 표시하지 않는다.

## 8081 확인 순서

1. 새로고침→Notifications→예시 독자 B→Google 모의 로그인→프로필→설정→Membership and payment. Free 상태와 월/연간 선택·닫기·재진입을 확인한다.
2. Member Select→처리 중→mock 성공 OK→Start reading→원래 설정. 재진입하면 확정 플랜이 Current plan이다.
3. 탐색에서 ChatGPT 검색→기사→Listen. Member에서 기존 무음 mock 재생을 확인한다.
4. Share story→Friend Link→Friend 멤버십 보기→Select→성공/복귀→Friend Link. `kostolany.invalid` 미리보기 주소가 복사되며 실제 접근 우회가 아니다.
5. 새로고침 후 B로 같은 기사를 읽기 목록에 저장→라이브러리→읽기 목록→Download list→Member 선택/성공→같은 목록에서 Download list 재실행.
6. 로그아웃→A→온보딩을 닫거나 완료→설정 Member 확인→B 복귀→B의 확정 등급 확인. A의 온보딩 Explore membership에서도 같은 선택 화면을 연다.
7. 전체 새로고침 후 B는 Free로 돌아간다. 실패/늦은 응답은 외부 faults.cjs와 자동 회귀 테스트로 재현한다.

기존8081 PID58453·ENV·medium 원본·사용자 변경을 보존했다. 최종 diff/staged 검토와 로컬 커밋 뒤 Goal49로 이어간다.

## Goal49 후속 연결

2026-11-21: 아이콘 자격 안내 잔여를 [Goal49](FE_GOAL_49_RESULT.md)의 실제 선택/취소/미지원/적용 화면과 Swift/Kotlin 어댑터로 연결했다. 실제 native 빌드/실행은 여전히 대기이며 Goal48 당시 검사 결과는 변경하지 않는다.
