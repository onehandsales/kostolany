# Medium Parity 묶음 16 — 알림·설정

작성일: 2026-11-24 KST. 기준: [실행 계획](MEDIUM_PARITY/EXECUTION_PLAN.md#batch-16). 시작 HEAD `5113c7e`, 작업 트리와 staged 변경 없음. 묶음2·4·6·14의 결과와15의 커밋 전 재검토, 현재 인증·관계·알림·설정 코드를 대조했다. 묶음9~15의 잔여는 기존 담당에 유지한다.

| 판정 | 현재 상태 |
| --- | --- |
| 기능 | 알림 접근 정책 조회 실패, 응답 대기 중 차단, 동적 사용자 목적지 누락 수정. 작은 폭/큰 글자의 선택값 배치 보완 |
| 자동 검사 | 타입/lint·관련6 suites/58 tests·최종 전체318 suites/1752 tests 통과. Android act 경고1건 별도 기록 |
| 시각 | 네 원본 PNG 직접 열람, 실제8081 메모리 렌더 대조. 원본 아바타·서체·OS 영역 차이 유지 |
| native | 실제 실행/빌드 대기. Jest 설정·메모리 JS/Hermes 검사는 실제 기기 실행과 별개 |

사용자가 승인한16→20 연속 작업의 첫 묶음이다. 검사·문서 검토 조건 충족 후16만 로컬 커밋하고17을 진행한다. push·배포·21/22는 승인 범위가 아니다.

<a id="scope"></a>
## 화면·R/T/U/C 대조

직접 V05/V28: **4 S /43 R /4 T /7 U /19 C**. 아래 R 범위는 각 화면에 배정된 모든 요구다. 원본 경로·해시·분석 문서는 [comparisonBaseline.json](MEDIUM_PARITY/comparisonBaseline.json)에 유지한다. `Home/Notifications`, `Profile/Settings/Changing notification settings`, `Library/Filtering digest/Digest settings`의 ANALYSIS와 PNG를 함께 확인했다.

| 화면·요구 | 단계 | 구현/검증과 원본 차이 |
| --- | --- | --- |
| S068: L/D/S/C01~03 | T-F06-02 | 작가·목록·기사·응답 목적지와 복귀, Follow 분리, 조회/읽음 실패와 재시도. 비교 조건에서는 원본 네 행의 문장·날짜·Follow·녹색선·종류 아이콘을 재현했다. 기본 기능 fixture는5행이며 원본 아바타3종은 확보하지 못한 대체 차이 |
| S162: L/D/S/C01~03 | T-F44-02 | Frequency Daily·Push On·Email On, 선택 아이콘/내부 chevron/외부 화살표를 대조. 주기 선택 취소/Done, Push/Email 왕복과 확정 상태 공유. 원본 Email의 외부 목적지는 미수록이며 현재 내부 mock 설정과 구분 |
| S186: L/D/S/C01~12/V | T-F59-02 | 여섯 토글과 다섯 Tailored 행, 순서·구획·뒤로·스크롤 확인. 작은 폭+CSS 두 배 확대에서 선택값 최대 폭 보완. Saves 아래 잘린 원본 토글의 이름/역할은 구현하지 않음 |
| S040: L/D/S/C01~12 | T-F59-03 | Top story/Editors만 Off이고 나머지 토글/선택은 유지한 상태를 별도로 대조. 저장 실패 초안 보존·재시도·계정 전환은 자체 mock 계약 |

원본1179×2556 물리 px, 보관390×844 메타데이터, 이번 CSS viewport와 DSF1을 구분한다. 원본 촬영 시각·DPR·실제 계정 권한은 확정하지 않는다. 녹색선은 관찰된 시각 상태이며 원본의 읽음 계약으로 해석하지 않는다.

<a id="contracts"></a>
## 계약·상태 소유권

- C55: NotificationSource가 수신자별 확정 알림을 보관한다. notification ID/event ID와 actor/target ID를 분리하고 같은 이벤트 중복을 제거한다. 작가 목적지는 검색·공개 프로필과 같은 `useIdentityCatalog`로 해석한다. 표시 이름 변경은 userId/auth revision 변경이 아니다.
- C55 접근: 목록은 현재 공개 공급부 재조회와 소유자/비공개/차단을 검사한다. 기사/응답은 기사 ID, 현재 차단, 응답 부모/ID·삭제 상태를 검사한다. 차단 설정을 확인하지 못하면 읽음 처리·이동을 보류하고 설정 재조회 후 행 재시도를 제공한다. 응답 조회가 끝난 뒤에도 최신 기사 작성자 차단을 검사한다. 차단된 작성자 프로필의 기존 제한 화면/해제 경로는 묶음5 정책을 유지한다.
- C55 읽음: 목적지 사전 확인 후 이동을 요청하고 읽음을 저장한다. 실패하면 행의 읽음 저장 재시도를 제공한다. 녹색선과 읽음의 대응은 기존 mock 정책이며 Medium 관찰로 승격하지 않는다. 원본에 없는 응답/멘션 행은 기능 검증용이다.
- C56/57: NotificationStore는 userId·인증 revision·source별 수명을 가진다. 항목별 직렬 쓰기와 최신 목표를 보관하고, 다른 항목은 독립적으로 저장한다. 버전·요청 세대·abort로 늦은 조회/쓰기와 A→B→A를 격리한다. 같은 명령 재시도는 같은 operation ID를 사용한다.
- 설정 실패는 확정 저장값을 변경하지 않고 실패한 목표/입력과 Retry를 유지하는 기존 계약이다. 화면이 선택을 보존하는 것을 서버 저장 성공으로 표현하지 않는다. 다시 이전 값을 선택하면 새 명령으로 수정할 수 있다. 선택 시트의 임시 값은 Done 전까지 공유하지 않으며 Cancel/닫기/뒤로는 폐기한다. 이미 제출한 공유 저장을 화면 이탈만으로 되돌리지는 않는다.
- C39: Digest 날짜/발행분과 수신 주기는 별도다. Digest/Push/Email은 같은 계정 알림 저장소를 소비하며 emailFrequency와 digestFrequency는 다른 필드다. 작가 이메일 구독·Follow·Mute·Block도 별도 관계 상태다. 묶음6의 기존/새 호 Mute 표시 계약을 변경하지 않았다.
- C50/67/71: 앱 선호, mock 권한, 실제 OS 권한, 실제 발송은 별개다. 기존 native adapter의 optional module, Android 채널 준비, iOS provisional/ephemeral 매핑, 권한 요청/재조회 수명을 확인했다. 실제 토큰 등록·push/email 발송 없음. 웹 권한은 unsupported다.
- C01/02/03: 기존 토큰·SVG·시스템 대체 서체, Light/Dark,48px 조작영역·포커스·스크롤을 소비한다. CSS 확대와 DOM 측정은 실제 OS 큰 글자/VoiceOver/TalkBack/Safe Area 검증이 아니다.
- C09/36/53/58/59/60/61/65/66: 알림 목적지에서 기사·목록·프로필과 기존 반응/저장/오디오·자격 계약을 소비한다. 다운로드·오디오·멤버십 전체를 새로 구현하거나 각 담당의 잔여를 완료 처리하지 않는다.

전체 새로고침은 인증과 이번 실행의 개인 mock 데이터를 초기화한다. 같은 실행에서 A→B→A는 A의 확정 저장값을 유지하고 이전 화면·오류·미제출 선택은 복원하지 않는다. 이 메모리 정책을 영속 저장이나 실제 계정 동기화로 표현하지 않는다.

<a id="implementation"></a>
## 결함과 두 차례 검토

| 재현 조건·원인 | 수정·검증 |
| --- | --- |
| 차단 설정 조회 실패 후 목록 알림 클릭: 목록 분기가 접근 정책 실패를 확인하지 않고 PublicList 진입/읽음을 시도 | 공통 사전 검사와 목록 재조회 후 정책 재검사. 수정 전 실제 navigation 회귀 실패, 수정 후 알림 유지·Retry·복구 후 한 번 읽음 확인 |
| 응답 알림의 응답 조회가 대기 중일 때 기사 작성자 차단: 기사 조회 직후 검사만 있어 늦은 응답이 이동을 허용 | 응답 조회 완료 후 정책·기사 작성자 차단 재검사. controlled Promise와 실제 moderation store를 사용한 navigation 회귀, 브라우저 차단→늦은 응답→알림 유지→Unblock→Retry 확인 |
| 동적 B의 팔로우 알림 클릭: 정적 Directory만 조회해 검색/공개 프로필에서 존재하는 B를 누락 | `useIdentityCatalog`를 사전 확인과 행 표시에 연결. 수정 전 회귀 실패, 수정 후 B 프로필→원래 알림 복귀·읽음 확인 |
| 320px+CSS 글자 두 배: Tailored 값이 제목 폭을 거의 모두 사용해 제목이 몇 글자씩 줄바꿈 | 선택값 영역 maxWidth 50%. 원본 기본 폭 유지, 확대 조건에서 제목/선택값 각각 줄바꿈·스크롤·취소 조작 확인 |

1. **1차 자기 검토:** 기존 source/store/provider/화면과 원본 요구, 선행 결과를 대조했다. 접근 정책 조회 실패의 이동/읽음 결함을 재현하고 수정했다. 관련 회귀와 실제 목적지/설정 흐름을 실행했다.
2. **2차 자기 재검토:** 변경 코드뿐 아니라 응답의 두 번째 await, 공유 차단 상태, 동적 사용자 카탈로그, 설정 선택 수명·폭·현재 결과 문서를 다시 확인했다. 응답 대기 중 차단과 동적 B 목적지 결함을 추가 재현·수정했고 최종 관련 검사를 통과했다. 작은 폭 확대 배치도 보완했다. 비활성 headless 탭의 requestAnimationFrame 지연을 앱 포커스 결함과 분리했다. Page.bringToFront 후 기존 코드에서 Frequency 취소/Done→Frequency, 부모 닫기→Digest 설정 복귀를 확인하여 임시 포커스 변경은 제거했다. 독립 에이전트 리뷰는 수행하지 않았다.

신규 회귀는 NotificationNavigation의3개 논리 사례다. native-stack/tab을 통째로 mock하지 않는다. 응답 경합 테스트는 실제 `useModeration` 반환값을 관찰해 기존 store의 명령을 호출하며 hook 결과를 가짜 상태로 대체하지 않는다. 기존 알림 store/권한 adapter의 조회·쓰기 실패·마지막 의도·오래된 성공/실패·재활성화·A/B/source 교체 테스트를 함께 실행한다.

<a id="validation"></a>
## 실제 검사와 실패·재실행 이력

Node는 FE/.nvmrc의24.18.0을 `fnm exec --using=24.18.0`으로 사용했다. 검사 출력은 메모리/도구 출력으로만 처리하고 로그 파일을 만들지 않았다.

| 검사 | 실행 결과 |
| --- | --- |
| 타입/lint | 최종 코드 `npm run typecheck`, `npm run lint` 종료0 |
| 관련 검사 | NotificationNavigation·notifications·notificationPermissionAdapter, iOS/Android 합계6 suites/58 tests 통과,13.076초 |
| 최종 전체 | iOS159 suites/876 tests224.850초, Android159 suites/876 tests254.683초 통과. 합계318/1752,실패/skip0. iOS act0,Android act1 |
| 최종 web/iOS/Android JS | 메모리 번들 각각2044291/2365123/2365817 bytes 구문 통과. iOS/Android Hermes 각각 종료0,35 unbound-global 경고/0 error. 실제 native build/export 아님 |
| 실제 iOS | `xcode-select -p`는 CommandLineTools. `xcrun --find simctl` 실패, Xcode/Simulator 없음. 실행·빌드 미수행 |
| 실제 Android | adb와 Android SDK 없음. 실행·빌드 미수행 |

- 수정 전 각 신규 회귀를 `-t`로 골라 실행하여3회 각각 실패를 확인했다. 나머지 이름 필터 제외 항목은 진단 실행의 제외이며 코드에 skip을 추가한 것이 아니다. 접근 실패는 알림 heading 부재, 응답 차단은 NotificationResponse로 잘못 이동, 동적 B는 프로필 복귀 버튼 부재로 실패했다.
- 첫 수정 후 관련6 suites/54 tests(13.269초), 초기 iOS 전체159 suites/874 tests(239.516초)는 통과했다. 이후 폭/응답 경합/카탈로그 변경 전 결과이므로 최종 결과를 대신하지 않는다.
- 확대 보완 뒤 실행하던 iOS/Android 전체 두 프로세스는 추가 경합 결함을 발견하여 명시적으로 중단했다. 완료/통과로 집계하지 않으며 수정 후 새로 전체 검사한다.
- 응답 경합 수정 후 관련6 suites/56 tests(13.148초), 동적 B 수정 후 최종6 suites/58 tests(13.076초). 기대값 약화·timeout 증가·skip 변경 없음.
- 브라우저 자동 조작의 첫 CDP 연결은 Chrome 프로세스가 유지되지 않아 ECONNREFUSED였으며, 독립 세션으로 시작한 전용 Chrome으로 재시도했다. 한 실행의 출력 변수명을 events 대신 errors로 사용해 Node ReferenceError가 났고 출력식을 고쳤다. 앱 console 오류와 구분한다. 비활성 headless 탭에서 RAF 포커스 복귀가 지연된 진단은 Page.bringToFront 후 정상 동작했다. 임시 포커스 변경은 모두 제거하여 최종 코드/번들은 iOS 전체 검사 시점과 같다.
- Android 전체의 LikeNavigation에서 VirtualizedList._updateCellsToRender의 지연 타이머가 act 밖에서 실행된 경고1건을 확인했다. 해당 테스트는 real timer로 실제 navigation을 실행하며 검사 실패는 없었다. 알림 수정 호출 경로와 분리하고 Android 단독 재실행1 suite/2 tests 통과5.067초, act0이었다. 비재현을 원인 해결로 간주하지 않는다. 기존 간헐적 경고의 근본 해결로 처리하지 않으며 담당22/기존 navigation 검증 잔여를 유지한다.
- Jest 전체는 `node --expose-gc node_modules/jest/bin/jest.js --runInBand --logHeapUsage --selectProjects iOS|Android --json`을 사용한다. JSON/진행 출력은 메모리에서 집계한다. 기존 GC 실행 방식을 유지하며 검사 조건을 완화하지 않았다.

<a id="browser"></a>
## 실제 브라우저·원본 비교

기존127.0.0.1:8081/PID22023을 재시작하지 않았다. Chrome158.0.8127.38 headless/CDP 전용 프로필에서 실제 앱 UI를 마우스로 조작했다. 메모리 screenshot만 열람했고 캡처 파일은 없다.

- Home→로그인 A→알림→Follow/Following 메뉴→작성자→알림, 목록→알림, 기사→알림, 응답→닫기→알림을 확인했다. Follow와 행 이동은 별도였다.
- 조회 실패→Retry, 저장 실패→실패 선택 보존→Retry, 접근 정책 조회 실패→알림 유지→복구/Retry를 브라우저 공급부에 일회성 실패를 넣어 확인했다. 정상 source 함수는 즉시 복원했다.
- 응답 조회를 보류하고 기존 moderation 명령으로 Jordan을 차단한 뒤 응답을 완료했다. 알림 유지/오류를 확인하고 차단 해제·재시도로 정상 응답 진입을 확인했다. 실제 서버 경합이 아니라 제어된 mock 응답이다.
- B의 팔로우 이벤트를 주입해 B 공개 프로필→알림 복귀/읽음을 확인했다. A 조회 보류→UI 로그아웃/B 로그인→B 빈 알림→늦은 A 응답→A 재로그인을 확인했다. 최종 새로고침으로 추가 이벤트·오류·로그인 상태·임시 source/시계를 초기화한다.
- Settings→Push에서 여섯 기본 On과 다섯 Tailored, Top story/Editors Off, Mentions 취소/All 확정, Digest Push 상태 공유, Frequency Weekly 취소/확정, Email Off/원래 Digest 복귀를 확인했다. 원본에 없는 선택 옵션과 mock Email 내부 화면은 기존 자체 정책이다.
- 320/393 폭·Light/Dark, 긴 한국어 작성자 표시, CSS 글자 두 배, 스크롤·모달 취소를 확인했다. 측정한 보이는 버튼/스위치는48px 미만0, 가로 document overflow0. DOM 접근성 label/checked를 확인했으며 OS 스크린리더/키보드/IME는 미검증이다.
- 최종 코드의 네 화면을390×844/DSF1로 메모리 대조했다. S068은 UTC/en-US, 네 행의 고정 날짜/문장을 사용했다. 시계 고정 진단도 별도로 했지만 모든 최종 화면이 CP-WEB-01 고정 시계와 원본 inset까지 동일한 것은 아니다. 원본 status bar/home indicator를 웹에 위조하거나 crop해서 동일성을 주장하지 않았다.

### S068 비교 fixture와 한계

| 행 | 비교 표시·날짜 | 비교용 연결 |
| --- | --- | --- |
| 1 | Opedia Studio started following you / Feb12,2025 / Follow / 녹색선 | 기존 jordan ID의 표시 이름을 비교 브라우저에서만 변경 |
| 2 | Lewis J Doyle added 1 story to your saved list Tech / Nov19,2024 / 녹색선 | 기존 medium-staff/public-morning-routine에 대응시킨 표시용 fixture |
| 3 | 같은 Lewis/Tech 문장 / Jun14,2024 / 녹색선 | 별도의 notification/event ID,2행과 다른 사건 |
| 4 | Alan Schilling clapped for Lorem Ipsum / Jun4,2024 / 녹색선 없음 | 기존 akinyele/example-latest-rates에 대응시킨 표시용 fixture |

원본 사람/목록/글을 실제 mock 계정과 동일한 존재로 취급하지 않는다. 비교 중 실제 destination의 전문/자산을 원본 Tech/Lorem Ipsum으로 만들지 않았다. 원본 목적지 자체가 이 흐름에 미수록이며 목적지 기능 검증은 정상 fixture에서 따로 수행했다. 비교는 기존 NotificationSource.readInbox/Directory 데이터에 메모리로 주입한4행이며 영구 기본값 변경이 아니다. source 함수/Directory 복원과 새로고침을 수행했다. 원본 Opedia/Lewis/Alan 아바타가 없어 Jordan/기존 로고/빈 아바타 대체가 남는다.

S162는 주기/Push/Email의 세 행을 대조했다. S186/S040은 동일6토글/5선택에서 두 토글의 상태만 달리했다. 시스템 서체·SVG/토글 윤곽·48px 행 높이·시트 상단과 원본 OS 영역 차이는 유지한다. 자체 OS 권한 카드와 Email mock 안내는 삭제하거나 원본 요소로 분류하지 않는다.

<a id="remaining"></a>
## 미확인·남은 담당과 종료 조건

| 항목 | 담당·영향·종료 조건 |
| --- | --- |
| U-S068/U-F06: 녹색선 의미, 원본 목적지/읽음·빈 상태·실패·다음 페이지 |16/V05. 현재 mock 계약을 제공하지만 원본 동일 정책 미확정. 같은 원본 계정의 실제 동작 자료 확보 후 재판정 |
| U-S040: 실제 수신 중단/기기 동기화 |16/V28, 외부 발송Q08 제외. mock 저장만 확인; 외부 연동 승인/기기 확인 전 실제 수신 완료로 판정하지 않음 |
| U-S162/U-F44: 다른 주기/발송 시각/Email 외부 결과 |16/V28. Daily 외 옵션·내부 Email은 자체 계약. 원본 추가 관찰 전 동일성 미확정 |
| U-S186/U-F59: 잘린 행, Tailored 옵션, OS 권한/전송/저장 실패 |16/V28와18의 설정 연결. 잘린 행은 이름을 만들지 않음. 추가 원본/실제 기기 자료 필요 |
| 원본 아바타·서체·정확 glyph/배치 |16/V05/V28, Q02/자산 담당. 자산 출처/사용 범위 확보와 같은 조건 렌더 비교 필요. 다음17의 기능 구현을 막지 않음 |
| 실제 OS 권한·Safe Area·큰 글자·보조기술·native 뒤로/실행 |21/Q07와16 소비자. iOS Xcode/Simulator 또는기기, Android SDK/adb·기기 및 개발 빌드 필요. 설치/실행 후 실제 권한·복귀·화면 확인이 종료 조건 |
| 기존9~15 잔여 |기존 담당 유지. 이번 커밋/연속 진행으로 종료하거나16에 이전하지 않음 |

<a id="manual-check"></a>
## 8081 최종 확인 순서

1. 새로고침→Home Notifications→모의 A 로그인→Notifications를 다시 누른다. 로그인 성공이 개인 행동을 자동 재실행하지 않는지 확인한다.
2. Jordan Follow와 행 이동을 각각 조작하고 작가→알림으로 돌아온다. 목록/기사/응답 행을 열고 원래 알림으로 복귀한다.
3. Profile→Settings→Push notifications. 여섯 On/다섯 Tailored를 확인하고 Top story/Editors만 끈다. Mentions→Off→취소와 All→Done을 구분한다.
4. Library→Digest→설정. Daily/Push/Email 상태 확인, Frequency Weekly→취소/Done, Push→뒤로, Email→토글→뒤로→닫기를 수행한다. 원래 Digest 날짜를 확인한다.
5. Settings에서 로그아웃→B 로그인→Home Notifications의 빈 상태→A 재로그인으로 계정별 데이터/설정을 확인한다.
6. Light/Dark와320/393 폭에서 설정 스크롤·선택/닫기·긴 내용과 터치 영역을 확인한다. 실제 기기 확대/권한은 별도 환경에서 수행한다.
7. 새로고침으로 인증/개인 데이터 초기화를 확인한다. 실패·경합 주입은 기본 UI 기능이 아니며 기존 source/테스트의 controlled Promise 시나리오로 구분한다.

## 변경·보존·수동 추적

제품 코드: NotificationsScreen, NotificationSettingsScreen. 회귀: NotificationNavigation. 결과·실행 계획·BACKLOG·해당 요구/흐름/미확인/비교·현재 상태 문서를 수동 갱신한다. comparisonBaseline에는 이번 배정 범위의 review와 존재하는 입력의 현재 해시만 갱신하며 원본 R/T/U/C·PNG·assets·과거 증거/currentEvidence/readiness는 보존한다. tools 생성기를 실행하지 않았으므로 자동 생성 재실행 결과가 아니다. 삭제된4개 자동 입력은 복원하지 않는다.

tools 및 하위 파일, 별도 검증 스크립트 폴더, evidence·비교 캡처·검증 로그·검증 manifest 생성/수정 없음. 실제 외부 서비스·의존성 추가 없음. 전용 Chrome의 OS 임시 프로필은 브라우저 실행 데이터이며 저장소 산출물이 아니다. 기존 사용자 파일/8081과 과거 삭제 상태를 보존한다.

## 커밋 판정

두 자기 검토의 해결 가능한 결함을 수정했고 타입/lint·전체 검사·가능한 필수 브라우저 확인·장애 복원·문서/금지 경로 검사를 완료했다.22파일은16 범위이며 기존 사용자 변경 없음. 원본 자산·U·native 및 설명된 기존 타이머 경고는 잔여 담당에 유지하고17의 독립 기능을 막지 않는다. 사용자 사전 승인에 따라 로컬 커밋 후17을 진행한다. 실제 해시는 Git 이력과 다음 결과의 시작 HEAD로 확인하며 push/배포 없음.
