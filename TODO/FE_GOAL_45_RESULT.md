# Goal 45 — Listen·미니/확장 플레이어·재생 제어

2026-11-21, macOS. **기능 구현·두 차례 자체 검토 수행, 원본 차이·실제 native 검증 잔여.** 소리 없는 mock 타이머이며 실제 오디오·Speechify SDK·TTS·백그라운드 음성은 연결하지 않았다. Goal44 로컬 커밋 `00b2527de3798be566b7b85297a75183958040af`와 깨끗한 작업 트리에서 시작했다. 현재 승인대로 이 단계 변경을 로컬 커밋한 뒤 Goal46을 진행한다.

## 구현·흐름

| 대상 | 구현 및 확인 |
| --- | --- |
| 기사 Listen | 기존 안내를 준비 로딩→재생으로 연결했다. 준비 실패 문구/Retry, 중복 시작 방지, 다른 기사 시작 시 교체를 지원한다. |
| 미니 플레이어 | 기사 하단·기존 탭/공개 화면 footer 위에서 커버·작성자·제목·진행률·재생/일시정지·닫기를 표시한다. 원문 접근 차단 확정 시 플레이어도 닫힌다. |
| 확장 플레이어 | 같은 store의 시간/재생 상태, 커버·원문, 10초 뒤/30초 앞, 타임라인 선택, 끝 재개, 접기를 연결했다. 작은 화면은 스크롤한다. |
| View story | 같은 원문 위에서는 중복 push 없이 접고, 다른 경로에서는 해당 articleId를 전달한다. 홈/검색 진입 맥락과 기존 탭 선택을 보존한다. |
| Share/더보기 | 해당 기사 ID·제목의 진입을 연결했다. 실제 공유는 Goal47, 속도·음성·추가 메뉴는 Goal46의 승인 범위다. 별도 외부 공유 성공으로 표시하지 않는다. |
| 인증·source 수명 | 계정 ID+인증 revision+source 교체는 이전 재생/모달/요청을 폐기한다. A→B·같은 B 재로그인·늦은 A 성공/실패를 실제 navigation 테스트로 확인했다. 프로필 이름 변경은 재생 scope를 바꾸지 않는다. |
| background·재실행 | foreground 이탈은 일시정지하고 돌아와도 자동 재개하지 않는다. close/dispose는 interval/AbortController를 정리한다. 전체 웹 reload 초기화를 확인했다. 실제 OS 재실행/백그라운드 오디오는 미검증이다. |

## 상태와 계약

- `ListeningProvider`가 source와 사용자/인증 수명에 맞는 단일 `ListeningStore`를 조립한다. `idle/loading/error/playing/paused/ended`의 판별 union이며 기사 ID·메타데이터·위치(초)·길이(초)·확장 여부를 함께 소유한다. 화면마다 별도 시간을 갖지 않는다.
- `ListeningSource(story, signal)`은 같은 articleId·양의 유한 durationSeconds·`mode: silent-mock`을 반환해야 한다. 동기 예외·응답 ID/길이 오류도 준비 실패로 처리한다. source를 교체해 실패/지연을 검사할 수 있다.
- 기본 준비 500ms, 실패 0회, 비교 길이 280초다. 보관본 00:05/-04:35 및 00:40/-04:00의 길이를 비교 fixture에 사용했으며 실제 낭독 길이·35초 이동 원인을 관찰했다고 주장하지 않는다. 다른 기사도 동일 길이를 쓰는 기능 mock이며 읽기 시간/글자 수를 음원 길이로 계산하지 않는다.
- 250ms interval 하나가 시작 위치와 경과 시각으로 진행한다. 뒤로 가는 시스템 시각은 재생 위치를 후퇴시키지 않는다. seek는 0~duration으로 제한하고 끝에서 재생하면 처음부터 시작한다. 표시 elapsed와 remaining은 동일한 정수 초를 기준으로 표시한다.
- 재생 준비마다 요청 세대를 발급하고 이전 요청을 abort한다. 늦은 성공/실패는 세대·active·signal을 확인한다. close나 계정/source 교체 뒤 이전 플레이어를 부활시키지 않는다. 원문에서 벗어나도 탭 이동 중 재생은 유지한다.
- 미니/확장/Listen만 store를 구독하며 매 tick으로 전체 앱 provider를 갱신하지 않는다. 차단 감시도 별도 작은 구독 컴포넌트다. 확장 내부 메뉴는 두 번째 native Modal을 열지 않고 같은 모달 내부 상태로 전환한다.
- 로그인/멤버십 gate는 Goal48 연결 전의 명시적 mock 계약으로 guest/A/B에게 동일하게 제공한다. 현재 Medium의 유료 오디오 권한을 구현했다고 표시하지 않는다. 이전/다음은 확인된 비활성 표현만 유지하고 임의 큐·자동 다음 재생을 만들지 않았다.

## 1차 자체 검토 → 수정

독립 에이전트 검토가 아닌 자체 코드/테스트/브라우저 검토다.

| 재현·기대 | 원인·수정·검증 |
| --- | --- |
| 작가 차단 확정 후 기존 플레이어가 남으면 안 된다 | Listen 진입의 접근 검사만으로 이미 시작한 작업은 닫히지 않았다. 공유 moderation 기준 상태를 구독해 차단 시 close하며, 해제만으로 재개하지 않는 실제 navigation 회귀를 추가했다. |
| 기사/source 교체 후 이전 메뉴가 남으면 안 된다 | 확장 컴포넌트의 scope+articleId 수명으로 패널을 초기화했다. 계정·source·늦은 완료 테스트로 확인했다. |
| 시간·선택 상태를 접근성 정보로 읽을 수 있어야 한다 | slider 값/레이블과 native increment/decrement, 웹 ARIA 값을 명시했다. |
| 메뉴 취소 후 조작을 이어갈 수 있어야 한다 | 메뉴 첫 항목 포커스, Escape/닫기 후 트리거 ref 복귀를 연결하고8081에서 확인했다. |
| 원본과 다른 두 줄 제목·시간/제어 간격·10/30 아이콘 | 실제 PNG와 캡처를 대조해 제목 한 줄·간격·SVG 되감기/앞으로 아이콘을 보정했다. spinner의 웹 기본 파란색도 테마 보조 텍스트 색으로 보정했다. 원본 배경/폰트 차이는 별도다. |

## 2차 자체 재검토 → 수정

1차 수정 후 전체 diff·store 타이머/취소·원문 복귀·테스트·비교 캡처를 다시 검토했다.

- 실제8081 타임라인 50% 클릭에서 위치가 바뀌지 않았다. RN Web의 Pressable click 이벤트에는 native `locationX`가 없었다. `ListeningSeek.web.tsx`에서 clientX와 현재 요소 경계로 계산하고 Arrow/Home/End 키를 지원했다. native는 별도 `ListeningSeek.tsx`에서 layout/locationX와 접근성 action을 사용한다. 웹 클릭·키보드, native 설정 Jest 이벤트로 각각 검증했다.
- 소수 위치를 각각 내림하면서 `00:00/-04:39`처럼 표시 합이 길이와 1초 어긋났다. elapsed 정수 초를 remaining에서도 사용하도록 수정했다. 5초/40초 비교 상태의 표시를 검사했다.
- 비교 스크립트가 모달 slide 중간에 시계를 고정해 잘못된 캡처를 만들었다. 전환 완료 후 비교 시계를 고정하도록 외부 스크립트를 수정하고 캡처를 교체했다. 앱 결함과 증거 수집 문제를 구분했다.
- 새 코드의 길게 압축된 문장을 여러 줄로 정리하고 원문 navigation 분기를 이름 있는 함수로 분리했다. 사용하지 않는 Listen 스타일을 제거했다. 신규 라이브러리/제품 의존성은 추가하지 않았다.

## 실행 결과

Node24.18.0(`.nvmrc`), npm10.9.0, Expo57.0.33/RN0.86.3, 기존8081 PID58453을 보존했다. shell 기본 Node22와 구분해 FE 명령에 Node24 PATH를 명시했다.

- 초기 타입 검사에서 RN0.86 Role/StyleSheet 타입 오류를 발견해 slider/absoluteFill로 수정했다. 초기 lint의 불필요한 memo 의존성은 실제 scope 인자로 연결했다. 새 navigation 테스트는 Jest의 AppState 초기값이 active가 아님을 확인하고 명시적 외부 경계 mock으로 수정했다. 실제 OS 성공으로 계산하지 않는다.
- `npm run typecheck && npm run lint && npm test`: **220 suites/1266 tests, 361.171초 통과**. 이 실행 뒤 web seek/표시·레이아웃 수정은 아래 영향 검사로 다시 확인한다.
- 2차 수정 후 `npm run typecheck && npm run lint && npm test -- --testPathPattern="ListeningNavigation|createListeningStore|ModerationNavigation"`: **6 suites/24 tests, 8.895초 통과**. 최종 spinner 색 보정 뒤 타입/lint·ListeningNavigation/createListeningStore **4 suites/20 tests, 6.699초 통과**. JSX 줄바꿈 정리는 동작 변경이 없다.
- 실제8081 Chrome: 기본3흐름(준비/미니/확장/30·10초/원문·탭/Share진입/닫기), 추가4흐름(비교5·40초/실제seek·Escape포커스/320px Dark·CSS160%·키보드/reload), console/page error 0. 오류/재시도·늦은 응답·계정/source 경합은 실제 navigation Jest로 검사했으며 해당 실패를 실브라우저에서 조작했다고 주장하지 않는다.
- `npx expo export --platform all --max-workers 2 --output-dir <외부 경로>/commit-export`: web/iOS/Android export 성공. JS/Hermes 산출물이며 native build/run이 아니다.
- 현재 `xcode-select -p`는 CommandLineTools, simctl 72/xcodebuild 1. Android SDK/adb/emulator와 생성 native 디렉터리가 없다. 실제 iOS/Android 빌드·설치·기기 접근성·Safe Area·오디오/백그라운드 검증은 Xcode+Simulator 또는 Android SDK+기기/에뮬레이터 환경이 필요하다. CSS 확대는 Dynamic Type, 웹 키보드는 VoiceOver/TalkBack 검증이 아니다.

## Medium 비교와 근거

F16·F26·F27·F28의 분석/연결, F26의 실제 원본5장을 확인했다. F27/28의 속도·음성·메뉴 확장은 다음 Goal46에서 진행한다.

| F26 원본 ID |8081 캡처|비교 상태|
| --- | --- | --- |
| sc_332d5b0923e546fcbf6a8fc613cda6a4 | article.png | Listen 진입 전 기사 |
| sc_b43c7474098746baa684870217c28927 | loading.png | 준비 로딩·미니 spinner |
| sc_40448a752ea64391a724af01b1e050f1 | mini.png | 미니 재생·기사 footer |
| sc_45ddcc1f43a54523a1314ce563abf5ee | expanded-5.png | 확장 재생중00:05/-04:35 |
| sc_d035c7d2bcfe4d0f99df80fddecebdcd | expanded-40.png | 확장 재생중00:40/-04:00 |

- 1179×2556 보관본을393×852로 축소하고 OS 상단59/하단34를 제외한393×759와 웹393×759를 비교했다. 같은 기기/native 렌더 증거는 아니다. `pairs.json`과 `compare-01~05.png`에 원본/실제/50% overlay를 남겼다.
- 원본5/40초 상태 비교는 외부 Playwright에서 시계를 고정하고 정상 store seek를 호출했다. 기본 기능 검증은 실제 UI 조작이며 비교 시계 고정을 실제 경과 시간 측정으로 표현하지 않는다.
- 원본의 유동적인 올리브 배경을 확보하지 못해 정적 gradient를 사용했다. 원본 글꼴/정확한 Speechify 로고 자산 미확보, 카드 제목 잘림·아이콘 폭·footer 위치·기존 기사 반응 수치 차이가 남는다. 자체 Mock/no audio 문구를 추가했다. 100% 일치라고 판단하지 않는다.
- Gummble의 현재 Medium 오디오 오류 검색은 기존 sc_40448… 한 장만 반환했다. 새로운 실패/큐 화면을 확보한 것이 아니다.
- [현재 공식 About audio](https://help.medium.com/hc/en-us/articles/4635049283351-About-audio)의 유료 계정·오디오 UI 설명을 별도 확인했다(2026-11-11 갱신). 현재 공식 설명을 보관본의 권한/기본값으로 소급하지 않는다.

## 증거와 재현

외부 경로: `/var/folders/jg/zn9h2_f91nxfpwz9hzpkqcv80000gn/T/kostolany-goal45-b65sljsn`.

`baseline.json`, `full-check.log`, 영향 검사 로그, `browser.cjs/browser-comparison.cjs`, 실행 JSON·PNG, `pairs.json`, `compare-*`, `platform.json`, `export.log`가 있다. 임시 디렉터리는 OS 정리 시 소실될 수 있고 저장소에 복제하지 않았다. 캡처 재현은8081과 설치된 Chrome/외부 Playwright가 필요하다. mock 장애 기본값은 실패0회이며 외부 브라우저의 시계/메모리 조작은 context 종료·reload로 정리했다.

8081 확인 순서:

1. 탐색→검색→ChatGPT→기사→Listen. 준비 후 미니 재생/일시정지/닫기를 확인한다.
2. 미니 제목→확장→30초 앞으로/10초 뒤로→타임라인 클릭·키보드→끝→재생을 확인한다.
3. 더보기→View story→뒤로→홈/탐색 탭 이동 후 미니와 원문 ID가 유지되는지 확인한다.
4. 확장→Share 진입→Done/Escape→접기·닫기. 공유 외부 연결은 아직 수행하지 않는다.
5. 모의 A 로그인 후 재생→작가 프로필→차단 확정에서 닫힘을 확인한다. 계정 변경/reload도 이전 플레이어를 제거한다.

남은 실제 native/원본 차이와 Goal46·47·48 후속 연결을 완료로 계산하지 않는다.

## Goal46 후속 연결 — 과거 실행 결과와 구분

Goal46에서 속도/음성 초안·Done·검색·기존 더보기 메뉴를 연결했다. [Goal46 결과](FE_GOAL_46_RESULT.md)의 현재 코드/검증과 AirPlay·큐 잔여를 따른다. 위 Goal45 검사 수치와 당시 공유/속도 안내 상태는 과거 기록으로 유지한다.
