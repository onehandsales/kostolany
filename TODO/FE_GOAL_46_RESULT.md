# Goal 46 — 재생 속도·음성·검색·AirPlay·큐 상태

2026-11-21, macOS. **mock 기능 구현·두 차례 자체 검토 수행, 원본 차이·실제 native 검증 잔여.** Goal45 커밋 `ee1c2990d76381b6d4dd7f5c2794f43b16f47d87`와 깨끗한 작업 트리에서 시작했다. 승인된 Goal44→53 연속 작업 중이며 이 단계 변경만 로컬 커밋하고 Goal47로 진행한다. push·배포·실제 오디오/TTS 연결은 하지 않았다.

## 구현과 사용자 흐름

| 대상 | 실제 구현·검증 |
| --- | --- |
| Select Speed | 세로 slider·1×/200 WPM·2.5×/490 WPM·범주·강조·Done을 구현했다. 웹 포인터/키보드, native PanResponder/접근성 action을 분리했다. 취소는 기존 속도를 유지하고 Done 성공만 타이머/남은 시간에 반영한다. |
| Select Voice | Featured/언어별 15개 음성·국가/성별·국기·선택 마크·검색·빈 상태·실패/Retry·Done을 구현했다. Emma→Hans 선택 취소/확정·재진입·스크롤을 확인했다. 실제 발화나 본문 번역은 없다. |
| 더보기 | 원본 순서의 AirPlay/Select a voice/View story/Show less/Mute/Report를 연결했다. 추천·뮤트·신고는 기존 공유 저장소를 사용하고 플레이어를 접은 뒤 기존 기능으로 넘긴다. |
| AirPlay | 현재 silent mock의 명시적인 미지원 상태·닫기/복귀를 제공한다. OS 출력 장치 목록/연결은 **미구현**이며 기기 성공을 검증하지 못한 상태와 구분한다. 가짜 장치 목록이나 연결 성공을 만들지 않았다. |
| 큐 | 원본에 보이는 이전/다음 비활성 상태를 유지했다. 미수록 큐 목록·자동 다음 재생은 추가하지 않았다. |
| 기존 재생 | 속도 변경 후 같은 위치에서 배속 경과를 적용한다. 다른 기사로 교체하면 확정 속도/음성은 유지하고 진행 중 적용/검색은 폐기한다. close/계정·source 변경은 기본1×/Emma로 초기화한다. |
| 계정 경계 | 실제 navigation 테스트에서 음성 적용 중 A→B·늦은 A 성공/실패를 확인했다. 기존 같은 계정 재로그인/source 교체·차단·background 회귀도 통과했다. |

## 상태·수명 계약

- `ListeningStore`가 확정 `{speed, voiceId}`와 `optionsStatus: idle/saving/error`를 소유한다. 속도/음성 화면의 선택은 지역 초안이며 Done 전에는 재생을 바꾸지 않는다. 부모 닫기·취소·기사/세션 교체는 해당 초안과 요청을 폐기한다.
- `ListeningOptionsSource.searchVoices(query, signal)`과 `apply(articleId, options, signal)`을 분리했다. 기본150ms/실패0회, 외부 서비스 없는 메모리 mock이다. apply 응답은 유효한 속도·기존 음성 ID이며 요청값과 같아야 한다. 요청 객체를 복사해 외부 변경과 분리한다.
- 저장 중 Done·검색·음성/속도 선택을 비활성화한다. 닫기는 가능하다. 실패하면 확정값은 그대로, 초안은 남으며 Done으로 재시도한다. 성공한 뒤 닫는 것은 이미 확정된 값을 취소하지 않는다. pending close는 abort하고 늦은 완료를 적용하지 않는 local mock 계약이다.
- active·AbortController·현재 요청·articleId·auth revision/source별 store 수명을 확인해 오래된 성공/실패를 무시한다. A→B→A 적용의 마지막 의도와 기사 교체를 store 테스트로 검증했다.
- 검색어는 NFC/trim/소문자 정규화 후200ms 지연한다. 빈 검색은 전체 카탈로그 조회다. scope/query/retry 키가 바뀌면 이전 후보를 즉시 숨기고 요청을 취소한다. 같은 검색어로 돌아와도 이전 요청이 최신 결과를 덮지 못한다. 동기 예외·중복 ID·잘못된 메타데이터도 오류로 처리한다.
- 범위0.5~4×/0.5 간격·슬라이더 위치·Done 적용·취소 버튼은 미수록 부분의 자체 보완이다. WPM은 관찰된1×=200/2.5×=490만 표시하고 다른 속도는 `— WPM`으로 두었다. 145% 문구는 원본 비교 표시이며 생산성 측정 결과가 아니다.
- 경과 위치는 원본 콘텐츠 초, 남은 시간은 `(duration - floor(position))/speed`를 내린 초다. 속도 변경 직전까지 이전 속도로 위치를 계산하고 새 타이머 기준점을 잡는다. 기사 길이280초는 기존 비교 fixture다. 원본별 남은 시간 차이를 추측한 음성 길이/배속 공식으로 덮지 않았다.
- 음성 언어는 목소리 메타데이터이며 기사 번역 계약이 아니다. 실제 음원·미리 듣기·출력 장치·background 음성은 연결하지 않았다.

## 1차 자체 검토 → 수정·검증

독립 검토가 아닌 코드·실제 navigation·8081·원본 PNG를 이용한 자체 검토다.

| 재현·기대 | 원인·수정·결과 |
| --- | --- |
| 선택 실패 후 재시도에서 초안과 기존 재생값을 구분해야 한다 | store 확정값과 화면 초안을 분리하고 apply 실패를 별도 상태로 유지했다. 속도/음성 취소·Done·실패/재시도 회귀와 브라우저로 확인했다. |
| 검색어 변경 직후 이전 후보가 남으면 안 된다 | query/scope/retry 키로 즉시 로딩 상태를 파생하고 이전 요청을 abort했다. 지연 역전·빈 결과·동기 예외·잘못된 응답을 검사했다. |
| native slider 접근성 조작이 검색되지 않았다 | role만 있던 View에 accessible을 명시했다. native 플랫폼 설정 Jest에서 increment, 웹에서 Arrow/Home/End를 검사했다. 실제 VoiceOver/TalkBack 증거는 아니다. |
| 속도 라벨과 영어 섹션이 원본보다 위에 있었다 | PNG와 실제 캡처의 위치를 비교해 라벨·영어 섹션 간격을 보정했다. |
| 초기 타입/lint 오류 | AppIcon의 search 타입/구현을 추가하고 gesture 생성의 ref 읽기와 effect 안 상태 초기화를 각각 layout state·렌더 키 경계로 변경했다. 타입/lint·6 suites/34 tests가 통과했다. |

## 2차 자체 재검토 → 수정·검증

1차 수정 뒤 확정/취소 계약·store와 provider·계정 경계·실제 캡처·변경 diff를 다시 읽었다.

- pointerEvents만으로는 저장 중 키보드/접근성 조작을 막지 못했다. slider의 disabled/ARIA/tabIndex, 음성 radio disabled, 검색 editable 및 최신 store 상태 검사를 추가했다. 실제 브라우저에서 pending 저장 중 입력/선택 비활성과 완료를 확인했다.
- source 메서드를 직접 노출하면 호출 문맥과 source 변경 검사가 불명확했다. wrapper를 통해 원 source를 호출하고 검색 응답의 성별/국가 코드도 검사했다. apply 요청은 복사하고 응답 일치를 검사한다.
- 큰 글자·최대 속도에서 말풍선이 헤더를 가릴 수 있었다. 실제 높이를 측정해 위/아래 배치하고 고정 높이를 최소 높이로 바꿨다.320px Dark·CSS160% 최소/최대 조작 캡처로 확인했다.
- 적용 중 로그아웃→B 이후 늦은 성공/실패 회귀를 실제 SessionNavigation에 추가했다. navigation 자체는 mock하지 않았다. 외부 source와 인증 명령의 제어를 실제 OS/외부 서비스 검사라고 표현하지 않는다.
- 검색 회색 면36px와 실제 입력48px를 분리해 논리 터치 영역을 확보했다.8081에서 입력 높이와 하단 클릭의 포커스 이동을 검사했다. 최종 비교 중 배경이 웹 placeholder를 가리는 문제를 발견해 입력의 position을 명시하고 캡처를 다시 확인했다.
- Done의 원본 수평 위치를 마지막으로 보정했다. 독일어 비교는 섹션 시작 스크롤 위치를 원본에 맞춰 다시 캡처했다. 테스트의 줄바꿈 정리는 동작 변경이 아니다.

## 실제 실행 결과

Node24.18.0/npm10.9.0, Expo57.0.33/RN0.86.3. shell 기본Node22와 구분해 FE 실행에 Node24 PATH를 지정했다. 기존8081 PID58453을 유지했다.

- `npm run typecheck && npm run lint && npm test`: **222 suites/1282 tests, 384.641초 통과**. 전체 실행 시작 후의 2차 수정은 아래 영향 검사로 별도 확인했다. 이전 Goal45의220/1266을 현재 결과로 재사용하지 않았다.
- 1차 수정: 타입/lint·`createListeningStore|ListeningNavigation|useListeningVoices` **6 suites/34 tests, 8.747초 통과**.
- 2차 수정: 같은 타입/lint·영향 검사 **6 suites/38 tests, 14.922초 통과**. 추가된 계정 전환 pending 성공/실패도 포함한다.
- 마지막 Done 간격 변경 후 타입/lint·ListeningNavigation **2 suites/16 tests, 10.343초 통과**. 같은 명령의 `commit-export`에서 web/iOS/Android export가 모두 성공했다. 이후 입력 터치 영역 보정도 타입/lint·2 suites/16 tests(10.282초)·`touch-export`를 통과했다. 마지막 placeholder 레이어 변경은 타입/lint·`verified-export`·실제 브라우저/8쌍 캡처로 확인했다.
- 실제8081 Chrome: 기본4그룹, 추가6그룹, 원본 상태 비교2그룹 통과. 속도·음성 선택/취소·검색0건·실패/재시도·역순 응답·저장 중 비활성·메뉴 기존 기능·작은 화면/Dark·CSS160%·닫기·reload를 확인했다. 각 console/page error0.
- 장애 검사는 외부 Playwright에서 메모리 source의 실패/보류만 주입했다. navigation/UI는 실제 앱이다. 종료/reload로 복원했고 앱 기본 실패0회는 변경하지 않았다.
- `npx expo export --platform all --max-workers 2 --output-dir <외부>/export` 성공. web·iOS·Android JS/Hermes이며 실제 native 빌드/실행이 아니다. 새 의존성은 없다.
- 현재 플랫폼 재확인: Xcode 경로는 CommandLineTools, simctl exit72/xcodebuild exit1; Android SDK/adb/emulator·생성 native 프로젝트가 없다. Xcode+Simulator 또는 Android SDK+기기가 있어야 실제 빌드/설치·gesture·키보드·Safe Area·VoiceOver/TalkBack·OS modal 전환을 확인할 수 있다. CSS160%/웹 키보드는 Dynamic Type/OS 접근성 검사가 아니다.

## 원본 비교와 잔여

F26 기반과 F27/F28 ANALYSIS·실제 PNG를 직접 확인했다. 이번8쌍은 다음과 같다.

| 원본 화면 ID | 실제 캡처 | 관찰·남은 차이 |
| --- | --- | --- |
| sc_1965b9529b534e1597968039af1415b1 | speed-1.png | 1×/200·슬라이더/범주·Done. 자체 취소 버튼·글꼴/knob 차이. |
| sc_b6f46f91fdc549b790b4e9c1a434afae | speed-2-5.png | 2.5×/490·145%·강조. 다른 속도/WPM은 미수록. |
| sc_c0fd5f5f29594fb997865177863b9482 | player-speed-reference.png | 2.5×/00:10. 원본-01:44, mock-01:48이며 길이/표시 계약 차이를 유지했다. |
| sc_0414c81870534989959d677ecede926c | menu.png | 6개 메뉴·순서·그룹. 논리48px 터치 영역으로 원본보다 메뉴가 길고 blur/배경/아이콘 차이. |
| sc_3b3db04094fe4a189b31e66c28971bcd | voices-emma.png | Featured/English·Emma·검색·Done. 자체 SVG 국기와 원본 자산 차이. |
| sc_ca2321d6dc9142e5a97e2734260c2b0f | voices-german.png | German/Italian/Korean/Portuguese 스크롤 상태. |
| sc_78bee192bd2041a98f6721240f2352d5 | voices-hans.png | Hans 선택·동일 위치. |
| sc_f637c648d6ec470a81cf77e5594e02da | player-voice-reference.png | Hans 확정·1×/00:20. 원본-04:27, mock-04:20. 별도 흐름의1×를 음성 선택 후 속도 초기화 근거로 사용하지 않는다. |

원본1179×2556→393×852 축소 후 OS 상단59/하단34 제외393×759와 웹393×759를 비교했다. `compare-01~08.png`는 원본/실제/50% overlay다. 실제 같은 iOS 기기 렌더가 아니다. 플레이어10/20초·메뉴6초는 정상 store 명령과 외부 시계 고정으로 비교 상태를 만들었고 자연 재생 시간 측정과 구분한다.

원본 SF 계열 글꼴·동적 배경·정확한 Speechify/국기 자산·modal 뒤 레이어·blur·일부 아이콘 차이가 남는다. 추가 취소/오류/빈 상태·접근성 포커스·silent mock 문구는 자체 보완이다. 미수록 speed 범위·검색/장치/큐 확장을 확인한 원본 동작이라고 기록하지 않는다.

Gummble에서 현재 Medium AirPlay/voice search 추가 조회를 수행했으나 관련 없는 토픽/탐색/로그아웃3장만 반환돼 실제 PNG를 확인하고 제외했다. 추가 장치/검색 화면은 확보하지 못했다. [Apple AVRoutePickerView](https://developer.apple.com/documentation/avkit/avroutepickerview)와 [AirPlay 지원 설명](https://developer.apple.com/documentation/avfoundation/supporting-airplay-in-your-app)은 OS 출력 선택 기능의 별도 구현 근거일 뿐, 이 앱이 실제 연결했다는 증거가 아니다. [현재 Medium About audio](https://help.medium.com/hc/en-us/articles/4635049283351-About-audio)의 회원/음성 설명과 과거 보관본을 구분한다.

**남은 상태:** silent mock의 속도/음성/기존 메뉴 연결은 구현했다. 실제 AirPlay 장치 연결·음성 출력은 미구현, 실제 native 실행은 환경상 미검증, 원본 시각 차이/추가 자료 확인은 잔여다. 이를 전체 동일 재현·실제 서비스 완료로 계산하지 않는다. 공유는 승인된 Goal47, 멤버십 권한은 Goal48의 별도 범위다.

## 증거와8081 재현

외부 경로: `/var/folders/jg/zn9h2_f91nxfpwz9hzpkqcv80000gn/T/kostolany-goal46-nqsnzs5k`.

baseline/platform JSON, check 로그, browser/extended/comparison 스크립트·실행 JSON·PNG, pairs.json/compare8쌍, export를 보관했다. 기존 FE_GOALS의 Goal21 `evidence/goal21/COMPARISON.html` 링크는 대상이 없는 과거 증거이며 이번 자료로 대체하지 않았다. OS 임시 정리로 소실될 수 있으며 저장소 내부에 검증 스크립트/증거를 추가하지 않았다. 재현에는8081·Chrome·외부 Playwright가 필요하다.

1. 홈 Notifications→모의 Google 로그인→탐색→검색 ChatGPT→기사 Listen→미니 제목으로 확장한다.
2. 1×→Select Speed→2.5×를 선택해 취소/재진입·Done을 비교한다. 키보드 Arrow/Home/End도 확인한다.
3. 더보기→Select a voice→Emma·Hans 검색·없는 검색·지우기·스크롤·선택 취소/Done·재진입을 확인한다. 속도와 음성은 서로 초기화하지 않는다.
4. 더보기→AirPlay 미지원 안내→복귀, View story→원문, Mute/취소·확정/Unmute·Report·Show less의 기존 기능을 확인한다.
5. 다른 기사 Listen에서 확정 선택 유지, 닫기/새 시작·로그아웃/로그인·전체 reload에서 초기화를 확인한다.

실패·지연 재현은 외부 extended.cjs 또는 source 주입 테스트를 사용하며 실제 계정/음성 서비스가 필요하지 않다.

## Goal47 후속 반영

공유 안내는 [Goal47](FE_GOAL_47_RESULT.md)에서 같은 재생 기사 ID의 실제 공유 화면으로 연결했다. 실제 navigation·브라우저 및 Goal47의 후속 영향 검사에 플레이어 회귀를 포함했다. 위 Goal46 당시 실행 결과와 AirPlay 미지원/실제 오디오 미연동 상태는 바꾸지 않는다.
