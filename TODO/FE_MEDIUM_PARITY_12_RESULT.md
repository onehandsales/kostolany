# Parity 12 — 오디오 UI 보완·검증 결과

2026-11-24. 시작 HEAD `9d44e3f`, 초기 작업 트리는 깨끗했다.
**독립적으로 가능한 기능 보완·자동 검증·자기 재검토를 수행했지만 묶음12 전체 종료는 미충족이다.**
원본 자산·배치 차이, 실제 브라우저 연결 부재, 실제 기기 검증 대기를 구분한다.
[실행 계획](MEDIUM_PARITY/EXECUTION_PLAN.md#batch-12) · [보완 목록](FE_MEDIUM_PARITY_BACKLOG.md) · [비교 기준](MEDIUM_PARITY/COMPARISON_BASELINE.md)

<a id="scope"></a>

## 1. 범위·규칙·선행 확인

직접 범위는 Q11 Listen 판정·V18/V19의12화면·14단계·97개 R 요구·15개 U·16개 C 소비 계약이다.
화면/단계는 아래 표에 연결하며 다른 기능의 구현이나 Parity13을 시작하지 않았다.

실제로 읽은 규칙은 [AGENT 진입점](../AGENT/README.md), COMMON의 QUALITY_AND_WORKFLOW/ENGINEERING_RULES 및 현재 상태, UXUI 진입점·Medium 원본 지침, FRONT_AGENT의 [README](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/README.md)·[ARCHITECTURE](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/ARCHITECTURE.md)·[CODE_CONVENTIONS](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/CODE_CONVENTIONS.md)·[STATE_AND_DATA](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/STATE_AND_DATA.md)·[MOBILE_UI_AND_PLATFORM](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/MOBILE_UI_AND_PLATFORM.md)·[PERFORMANCE_AND_SECURITY](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/PERFORMANCE_AND_SECURITY.md)·[TESTING_AND_DELIVERY](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/TESTING_AND_DELIVERY.md)다.
상태 계산은 소유자에 두고 화면의 오래된 snapshot으로 변경하지 않으며, 한국어 설명 주석은 한 문장 한 줄을 사용했다.
RNTL14 비동기 이벤트를 await하고 실제 AppNavigator/provider를 사용했다.
새 의존성·편집 모델/전역 구조 확장은 없으며 일반 앱에 비교용 숫자를 고정하지 않았다.

[9 최신 인계](FE_MEDIUM_PARITY_09_RESULT.md#pre-commit-review), [10 최신 재검토](FE_MEDIUM_PARITY_10_RESULT.md#pre-commit-review), [11 추가 보완](FE_MEDIUM_PARITY_11_RESULT.md#additional-review)과 [커밋 전 확인](FE_MEDIUM_PARITY_11_RESULT.md#pre-commit-review)을 읽었다.
9의 편집기 배치/자산,10의 기사/응답 시각 차이,11의 다중 문단/선택 메뉴 잔여와 각 원본 미확인·환경/기기 대기는 기존 담당 소유로 유지한다.
이번12 수행은 이들 전체 완료 승인이 아니다.

선행2의 공통 IconButton/서체/테마·OWN_UI_POLICY,4의 일반/발행/정책 reader와 ID·읽기 설정 계약,10의 실제 기사/Responses/Rules navigation을 코드로 대조했다.
오디오 store·source·옵션/검색·gate·View story가 이미 있으므로 재구현하지 않았다.
12의 독립 작업을 막는 새 선행 결함은 발견하지 못했으나 선행 화면 전체의 시각/기기 종료까지 충족됐다는 의미는 아니다.

기존8081(127.0.0.1, PID29280), ENV, medium 원본을 보존했다.
tools/evidence/별도 검증 스크립트·캡처 파일·검증 로그·manifest를 생성·복원하지 않았다.
명령 결과는 터미널/메모리에서 확인하고 이 문서에 기록했다.
기존 comparisonBaseline.json은 추적 문서로만 수동 갱신하며 과거 evidenceContext/currentEvidence/readiness를 승격하지 않는다.

<a id="source-review"></a>

## 2. 원본·등록·누락 검토

[medium README](../medium/README.md)·[REVIEW_R2](../medium/REVIEW_R2.md), TODO AUDIT/BACKLOG/REVIEW·프로토콜·자산·자체 UI 기준을 대조했다.
현재 실제 목록은63흐름·273단계·고유200화면이다.
ANALYSIS의915개 로컬 링크, 동일 원본 ID의 PNG 해시 충돌, R1395행/중복,22묶음59작업의 배정을 검사했다.
이 목록 검사는200화면의 실제 조작·렌더 재검증이 아니다.

직접 읽은 오디오 ANALYSIS 전체와 단계별 PNG는 다음과 같다.

| 흐름 | 직접 본 원본 단계 | 이번 담당·연결 |
| --- | --- | --- |
| [F26 Listening to a story](<../medium/flows/Home/Story detail/Listening to a story/ANALYSIS.md>) | 01 S037 →02 S128 →03 S050 →04 S055 →05 S160 | 직접 T-F26-02~05,01은 부모 진입 |
| [F27 Changing playback speed](<../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/ANALYSIS.md>) | 01 S055 →02 S016 →03 S131 →04 S141 | T-F27-01~04 |
| [F28 Changing voice](<../medium/flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>) | 01 S055 →02 S003 →03 S046 →04 S154 →05 S088 →06 S192 | T-F28-01~06 |
| [부모 기사](<../medium/flows/Home/Story detail/ANALYSIS.md>)·[정책 연결](<../medium/flows/Home/Story detail/Responses/Medium policy/ANALYSIS.md>) | 기사 S037와 정책 S008의 상단 Listen 표시 | 정책 PNG 02를 추가 열람하고 전용 경로/복귀 코드를 확인 |

오디오3흐름의15단계는 고유13장이다.
S008을 더해 고유14장을 직접 열람했다.
부모 흐름의 나머지 전체 PNG나 전체200화면을 새로 직접 검토한 것은 아니다.
재검토에서는 S192 원본도 다시 열어 시간·속도·음성 이름 미표시를 확인했다.

PNG 물리 크기는1179×2556px다.
보관390×844 화면 메타데이터와 CP-WEB-01의390×844 CSS px/DSF1 비교 기본안을 실제 촬영 기기/DPR로 확정하지 않는다.
이번에는 원본 파일을 직접 열람했고 별도 crop/정규화 파일이나 새 앱 렌더를 만들지 않았다.
따라서 원본과 앱의 동일 viewport·시간·계정 쌍 비교는 미실행이다.

새로운 확정 원본 컨트롤 누락은 발견하지 못했다.
S154 하단의 잘린 다음 섹션은 화면 밖 이름·음성 목록까지 확정할 근거가 없어 추가하지 않았다.
S192에 선택 음성 이름이 보이지 않으므로 Hans의 실제 발화/언어 변경을 관찰 사실로 기록하지 않는다.
공식 설명을 새로 웹 조회하거나 실제 TTS를 청취하지 않았다.
보관 ANALYSIS의 해석, 직접 보이는 요소, 자체 mock 계약을 구분했다.

<a id="changes"></a>

## 3. 구현·재검토에서 수정한 결함

| 문제·재현 | 원인·영향 | 수정·회귀 확인 |
| --- | --- | --- |
| 1초 위치에서 화면 갱신 전30초 앞으로를2회 누르면61초 대신31초 | 두 handler가 같은 렌더 snapshot을 사용하여 마지막 상대 입력이 누락 | store.skip이 현재 위치와 마지막 tick 이후 시간을 반영. 미니/확장 play도 store.togglePlaying 사용. 접근성 이동·웹 화살표도 같은 상대 계약 |
| 속도1배에서 화면 갱신 전 증가3회 후2.5배/490 WPM이 나오지 않음 | SpeedSlider가 이전 value에 계속0.5를 더함. 첫 수정 뒤 재검토에서 발견 | 선택 초안 소유자인 ListeningSpeedPanel의 함수형 setSpeed로 누적. native 접근성/웹 키보드는 onAdjust, 포인터/Home/End는 절대값 유지 |
| 좁은 안전 영역에서 고정32dp 좌우 여백과5개 조작 영역이 충돌 가능 | 중앙60+나머지4×48의 최소 폭252를 고정 여백이 고려하지 않음 | 가용 폭에 맞춘 여백과 줄바꿈 보완.48/60 터치 크기는 유지. 실제 작은 기기/큰 글자 배치는 미검증 |
| 옵션 시트가 bottom Safe Area를 덮을 수 있는 구조 | absoluteFill 자식은 부모 paddingBottom과 별도로 배치됨 | panelLayer bottom에 실제 inset 전달. 실제 기기 시각/제스처 판정은 대기 |

변경 소유자는 [createListeningStore](../FE/src/features/listening/createListeningStore.ts), [ListeningPlayer](../FE/src/features/listening/ListeningPlayer.tsx), [ListeningSpeedPanel](../FE/src/features/listening/ListeningSpeedPanel.tsx)다.
[ListeningSeek](../FE/src/features/listening/ListeningSeek.tsx)·[웹 seek](../FE/src/features/listening/ListeningSeek.web.tsx), [SpeedSlider](../FE/src/features/listening/SpeedSlider.tsx)·[웹 slider](../FE/src/features/listening/SpeedSlider.web.tsx)는 상대/절대 명령만 전달한다.
[types](../FE/src/features/listening/types.ts)의 남은 시간 포맷 추출은 기존 계산을 보존한다.

타이머는 활성 store 하나당250ms interval 하나이며, pause/close/dispose/background에서 해제한다.
skip 전에 Date.now 기반 경과를 반영하므로 tick 사이125ms도 사라지지 않는다.
unsubscribe/dispose 후 callback과 타이머가 남지 않는 회귀를 추가했다.
prepare/options는 기존 abort·revision과 문서/계정 scope를 유지한다.
오래된 성공/실패, 취소 후 새 시트, 중복 Done, A→B→A, loading/playing 중 멤버십 철회와 권한 복구 후 부활 방지를 실제 navigation 테스트로 보강했다.

새 실패 주입은 테스트의 source에만 있다.
일반 source의 기본 delay500ms/duration280과 정상 실패 횟수0을 바꾸지 않았다.
새 UI·큐·실제 음성·전송 기능을 추가하지 않았다.

<a id="support"></a>

## 4. Q11 Listen 지원 판정

| reader/상태 | 현재 코드 판정 | 근거·잔여 |
| --- | --- | --- |
| 일반 fixture 기사 | 무음 mock Listen 지원, 기존 멤버십 audio gate | Article→미니/확장/옵션/복귀 자동 검증. 차단·권한 철회/계정 교체 시 닫힘 |
| 본인 발행 Public | 미지원 | WrittenStoryScreen에 Listen 없음. 읽기/수정·이력/설정 지원과 별개 |
| 본인 발행 Unlisted | 미지원 | 위와 같음. Unlisted를 오디오 권한으로 해석하지 않음 |
| 타인 발행 Public | 미지원 | 접근 가능한 글에도 Listen 없음 |
| 타인 발행 Unlisted | 미지원 | 직접 접근 허용 여부와 오디오 지원을 분리 |
| 정책 기사 S008 | 기존 무음 mock 지원 | 원본 상단 play 표시는 확인. PolicyArticleScreen/ArticleRouteScreen 전용 ID·View story·응답/기사 복귀 자동 검증 |
| 삭제·차단·접근 철회 발행 글 | 읽기 접근 차단, Listen은 원래 없음 | WrittenStoryLifecycle의 소유권/삭제/접근 철회 검증. 존재하지 않는 발행 오디오의 종료를 검증했다고 하지 않음 |

발행 글 Listen은 **알려진 미지원**이고 해당 원본 근거/제품 확장 결정은 별도 대기다.
이를 단순 기기 검증 대기나 정상 기사와 동일 지원으로 바꾸지 않는다.
추가 지원에는 발행 본문 버전·이미지/문단 읽기·접근 취소·길이/음성 source 계약이 필요하므로 이번 범위 판정만으로 구현하지 않았다.
기존 일반 fixture에는 사용자 삭제 기능이 없으므로 일반 기사 삭제 분기를 만들지 않았다.
Q11 Highlight/인용은11, 다운로드는8 등 기존 판정을 유지하며 Q11 전체 완료가 아니다.

<a id="screen-status"></a>

## 5. 화면·요구사항별 상태

각 행은 해당 화면의 R-L/D/S와 모든 C 요구를 포함한다.
기능 자동 검증과 정적 코드 대조를 기록하며 어느 행도 새 실제 렌더의 원본 시각 일치 완료가 아니다.

| 화면·R 범위 | 이번 원본/구현 대조·검증 | 남은 상태 |
| --- | --- | --- |
| [S003](MEDIUM_PARITY/REQUIREMENTS_01.md#s003) L/D/S,C01~06 | AirPlay/Select voice/View story/Show less/Mute/Report6행 순서, 기존 메뉴 목적지·복귀 자동 검증 | AirPlay 실제 연결 제외. 팝오버 크기/위치/서체 실측 대기 |
| [S016](MEDIUM_PARITY/REQUIREMENTS_01.md#s016) L/D/S,C01~02 | 1x/200 WPM·등급/세로 slider·Done, 취소/재진입 | slider/말풍선·큰 글자 배치 시각 잔여 |
| [S046](MEDIUM_PARITY/REQUIREMENTS_02.md#s046) L/D/S,C01~03 | Emma 체크·검색·국기/이름/성별/국가, 실패/빈 검색/선택 자동 검증 | 실제 음성/언어·원본 검색 결과 미확인, 자산·키보드 대기 |
| [S050](MEDIUM_PARITY/REQUIREMENTS_02.md#s050) L/D/S,C01~03 | 기사/미니 pause·close·확장과 연속 toggle | mini 높이·Mock 안내·긴 제목/큰 글자 대조 잔여 |
| [S055](MEDIUM_PARITY/REQUIREMENTS_03.md#s055) L/D/S,C01~10 | cover/작가/제목/진행/접기/재생/10·30/속도/공유/메뉴·Speechify,00:05/-04:35 | 이전/다음은 큐 없음으로 비활성 mock. 공유 신규 보완13, 배경/서체/아이콘 잔여 |
| [S088](MEDIUM_PARITY/REQUIREMENTS_04.md#s088) L/D/S,C01~02 | Hans 회색행/녹색체크, Done/Cancel·재진입 자동 검증 | 실제 발화·원본 영속성 미확인 |
| [S128](MEDIUM_PARITY/REQUIREMENTS_06.md#s128) L/D/S,C01 | 기사와 미니2개 spinner·cover·close, 취소/늦은 준비 완료·retry | 실제 로딩 과정/권한 순서 원본 미확인 |
| [S131](MEDIUM_PARITY/REQUIREMENTS_06.md#s131) L/D/S,C01~02 | 2.5x/490 WPM/145% 문구·Done·연속 증가 결함 수정 | 나머지 배속/WPM 공식 미확인. 즉시 적용 아닌 Done 확정은 자체 정책 |
| [S141](MEDIUM_PARITY/REQUIREMENTS_06.md#s141) L/D/S,C01~10 | 2.5배 적용·위치 유지,00:10/-01:44 독립 fixture | 실제 음원 길이/남은 시간 원리 미확인; 공통 플레이어 시각 잔여 |
| [S154](MEDIUM_PARITY/REQUIREMENTS_07.md#s154) L/D/S,C01~02 | German/Italian/Korean/Portuguese와 Seoyeon 등 기존15행/6그룹 대조 | 화면 밖 추가 목록·번역 미확인, 실제 스크롤/키보드 대기 |
| [S160](MEDIUM_PARITY/REQUIREMENTS_07.md#s160) L/D/S,C01~10 | 00:40/-04:00 독립 fixture, 이동 누적/경계/종료 | 원본40초가 자연 경과인지 직접 seek인지 미확인 |
| [S192](MEDIUM_PARITY/REQUIREMENTS_08.md#s192) L/D/S,C01~10 | 음성 Done→확장 복귀,00:20/-04:27 독립 fixture | 실제 선택 음성 표시는 없음. 일반280초와 차이는 알려진 비교 조건 차이 |

<a id="comparison"></a>

## 6. 시간·자산·자체 UI 기준

| 화면 | 원본 경과/잔여/배속 | 이번 독립 비교 입력 |
| --- | --- | --- |
| S055 | 00:05 / -04:35 /1x | duration280, position5, speed1 |
| S160 | 00:40 / -04:00 /1x | duration280, position40, speed1 |
| S141 | 00:10 / -01:44 /2.5x | duration270, position10, speed2.5 |
| S192 | 00:20 / -04:27 /1x | duration287, position20, speed1, voiceHans |

270/287은 **현재 mock 포맷으로 해당 표시 쌍을 재현하는 합성 입력**이며 원본 음원 길이가 아니다.
음성 변경 때문에 실제 길이가 달라진다고 확정하지 않는다.
기존 주입 가능한 source/clock을 테스트에서 사용하고, 표시 뒤1초 진행 시 position이 speed만큼 증가함도 검증했다.
일반 앱 기본값280에서 S141/S192의 잔여가 원본과 같지 않은 것은 알려진 조건 차이다.
비교용 runtime 메뉴나 별도 도구를 만들지 않았으므로8081 기본 UI에서 이 독립 숫자가 자동 재현되는 상태는 아니다.
시간 고정/voice변경 시 특정 위치 강제 같은 제품 변경을 하지 않았다.

1x의200 WPM,2.5x의490 WPM/145%는 관찰된 문구로 유지한다.
다른 속도의 WPM이나 최소/최대·증분은 원본 공식으로 확정하지 않는다.
0.5~4와0.5단계, Done 적용/Cancel 폐기, 기사 교체 시 확정 옵션 유지/위치 초기화, close·계정 교체 시 초기화, background pause 후 수동 재생은 기존 자체 mock 정책이다.

기존 기사 이미지 brain.png crop은 FE 자산으로 확보/적용되어 있으나 원본 오디오 커버의 구도·crop/품질 동일성은 미검증이다.
원본 폰트/정확 벡터 파일은 확보 확인이 없으며 기존 font token·직접 그린 아이콘/국기·합성 gradient와 Speechify 표시의 차이가 남는다.
표준48dp 터치 영역과 보이는 glyph 크기를 구분했다.
미니의 `· Mock`, 확장의 `Mock preview · no audio`, 취소X·오류/retry·AirPlay 불가 안내는 자체 UI로 유지한다.
이를 원본 관찰로 합치거나 비교를 위해 숨기지 않았다.
실제 렌더가 없어 배치/crop/줄바꿈 보정 완료로 판정하지 않는다.

<a id="contracts"></a>

## 7. C 계약 추적

| C | 이번 책임·근거 | 담당 경계 |
| --- | --- | --- |
| C01/C02/C03 | 공통 자산/테마 소비, 상대 명령·48dp/compact/Safe Area 보완, 선택/disabled label 확인 | 시각 잔여12/Q02, 실제 OS Q07/21. 큰 글자/긴 한국어·포커스·키보드 실측 미실행 |
| C09/C45/C53 | 정상/발행/정책 지원표·전용ID·View story/프로필 복귀 | 발행/프로필 신규 기능은9/15, 도구별 Q11 분리 |
| C20/C36 | Highlight와 다운로드의 기존 소비 경계 확인 | 각각11/8 소유. 오디오 수정으로 이 계약 전체 완료하지 않음 |
| C58/C59/C60/C61 | 준비/미니/확장/시계/이동·옵션·음성·메뉴 직접 검증 | V18/V19·12; 공유 신규 기능13, 실제TTS/AirPlay Q08 제외 |
| C65/C66/C67 | 기존 audio gate, guest/free→모의 멤버십·복귀 및 철회 중 늦은 응답 차단 | 멤버십 신규 보완19·설정16/18, 실제 결제 제외 |
| C71 | 현재 실행 도구·환경 확인 | 실제 OS 오디오/접근성21과12 대기, 무음 mock은 실출력 증거 아님 |

<a id="unknowns"></a>

## 8. U별 판정·종료 조건

모든 아래 원본 질문은 보존한다.
원본 근거 대기는12/Q03 소유이며 질문에 답하는 버전·계정·실행 자료가 확보되어야 닫는다.
TTS/AirPlay 등 제외 항목은 이번 실행 실패나 구현 대기로 계산하지 않는다.

| U | 현재 판정 |
| --- | --- |
| U-S003 | AirPlay 실연결 제외. 음성 metadata 확정/복귀는 mock 검증, 실제 전환 발화 미확인 |
| U-S016 | 최소/최대/증분·WPM 공식 미확인.0.5~4/0.5는 자체 정책, 관찰1x/200 유지 |
| U-S046 | 실제 발화·언어 지원 미확인. 목록/선택은 구현, 음성 엔진 제외 |
| U-S050 | 실제 출력·background 지속 미확인. mock은 background pause |
| U-S055 | 음원 길이·탐색 동작·다음 기사 조건 미확인. mock seek/disabled queue와 분리 |
| U-S088 | 실제 발화·원본 설정 영속성 미확인. 세션 옵션 수명은 자체 계약 |
| U-S128 | 생성/다운로드/권한 단계 미확인. delay·retry·gate는 자체 mock |
| U-S131 | 안내 수치 근거·즉시 적용 미확인. Done 확정/Cancel 폐기는 자체 정책 |
| U-S141 | 잔여 계산·위치 변화 원인 미확인.270초 합성 입력과 기본280 차이를 명시 |
| U-S154 | 음성 선택이 번역이라는 근거 없음. 화면 밖 추가 목록도 확정하지 않음 |
| U-S160 | 자연 경과/탐색 입력 중 어느 것인지 미확인. 두 행동은 mock에서 지원 |
| U-S192 | 화면에 Hans 이름이 없음. 실제 적용은 청취 증거 필요,287초는 합성 입력 |
| U-F26 | pause/close/seek/failure/gate는 자체 계약 검증. background/offline/큐의 원본 정책 미확인, 실음성/다운로드 제외 |
| U-F27 | 범위/취소/기사 간·재진입 유지와 실제 발화 속도 미확인. 선택 초안/확정 수명은 mock으로 명시 |
| U-F28 | 검색/미리듣기/실패/재진입/언어·번역 원본 미확인. 검색·빈/오류·취소·Hans 확정은 mock 검증, 미리듣기/번역은 구현하지 않음 |

<a id="validation"></a>

## 9. 이번 실행 결과와 한계

Node24.18.0, Windows PowerShell, FE의 기존 의존성으로 실행했다.
최종 코드 수정 후 `npm.cmd run typecheck`, `npm.cmd run lint`는 각각 종료0이다.
최종 관련 검사는 다음7경로를 실제 Jest iOS/Android 프로젝트에서 실행했다.
프로젝트 이름은 플랫폼별 테스트 설정이며 실제 native 설치/기기 실행을 뜻하지 않는다.

```powershell
npm.cmd test -- --runTestsByPath src/features/listening/createListeningStore.test.ts src/features/listening/useListeningVoices.test.tsx src/app/navigation/ListeningNavigation.test.tsx src/app/navigation/PolicyNavigation.test.tsx src/app/navigation/MembershipNavigation.test.tsx src/features/editor/WrittenStoryLifecycle.test.tsx src/features/editor/WrittenStoryScreen.test.tsx
```

**최종14 suites/98 tests 통과,136.911초, 실패/skip0.** 최종 출력에서 act/console 경고는 관찰되지 않았다. 이 검사는 마지막 속도 보완까지 포함한다.

실제 명령에서는 위와 같은 인자에 `--json`을 추가하고 Node child process의 stdout/stderr를 메모리에서 요약했다.
출력 파일은 만들지 않았다.
navigation 자체는 mock하지 않았으며 source·시간·native 경계 대역을 사용했다.
원본 타임쌍, 1 interval·해제, 기사 A→B→A·source 교체/이탈/foreground, 실패 retry·늦은 응답, 배속/Hans 확정/취소·재진입, 검색 ABA, 멤버십 철회/계정 교체, 정책 View story/복귀, 발행4소유권 조합의 Listen 부재/접근 경계를 확인했다.

중간 실행과 최종 결과를 구분한다.

- 초기 lowercase `--selectProjects ios`는 프로젝트를 찾지 못한 명령 오류다. 이후 실제 `iOS`/`Android` 설정으로 검사했다.
- 회귀 작성 중 host의 onPress를 직접 읽은2회 시도는 handler 접근 오류였고, awaited 사용자 이벤트로 바꿨다. 제품 실패로 계산하지 않는다.
- 상대 이동 결함은 수정 전 두 프로젝트에서 expected61/received31로2건 실패했다(16.596초). 수정 뒤 관련4 suites/42 tests가 통과했다(49.775초).
- 최초 확대 실행은13 suites 통과/1실패,99 tests 통과/5실패,131.402초였다. Android의 길어진 계정 전환 테스트와 후속 act/탐색 오류를 성공으로 숨기지 않는다. 원인 전체를 제품 경합으로 확정하지 않았고 불필요한 B 멤버십 재구매 흐름을 분리해 A→B→A·늦은 옵션 격리에 집중했다. 단독24 tests가56.244초에 통과했다. timeout 상향·skip으로 통과시키지 않았다.
- 그 뒤 관련14 suites/98 tests가109.145초에 통과했으나 이는 마지막 속도 보완 전이다.
- 자기 재검토에서 연속 속도 증가 회귀를 추가하자 두 프로젝트에서490 WPM 부재로2건 실패했다(18.457초, 필터 밖22건 미실행). 함수형 초안 갱신 뒤 최종 검사를 다시 실행했다.
- 전체 suite는 이번에 실행하지 않았다. 이전 Parity10의 전체 시간초과/안정성 잔여 및9의 AuthBoundary act 경고 담당14/22는 유지한다.

기존8081에서 `/index.bundle?platform=web|ios|android&dev=true&minify=false`를 읽고 메모리의 Node vm.Script로 JS 구문을 확인했다.
세 응답 모두 HTTP200/구문 통과다. 코드 실행·Hermes bytecode·APK/IPA 생성 검사는 아니다.

| 플랫폼 | 응답 byte / 소요초 | 메모리 응답 SHA256 |
| --- | --- | --- |
| web | 5,679,706 /7.275 | `ae52930513c5354816d7b1e05e3c252319ea4483300ccc92d28f005fa2242d67` |
| ios | 7,920,940 /7.373 | `7f06eba81149f34792392ded2d278b41eeb45536984e3832c9ae35fe1b7eb2ed` |
| android | 7,923,335 /7.093 | `8072779a5e662ca1050382f51e4a536827295f0f3c7220dc378c43707f2a39ba` |

현재 Document Control 연결 세션0·executor 없음, 브라우저 제어 도구 없음이다.
과거 Chrome 시작 자동 승인 차단을 반복하거나 다른 경로로 우회하지 않았다.
실제8081 조작·console·메모리 앱 렌더·원본 쌍 비교는 **환경 차단으로 미실행**이다.
HTTP JS 응답 검사는 브라우저 실행이나 console 무오류 증거가 아니다.

adb/emulator/java/xcodebuild, SDK/JDK 환경과 확인한 일반 설치 위치가 없었다.
Android는 SDK/JDK 및 연결 emulator/device, iOS는 macOS/Xcode와 simulator/device가 필요하다.
Windows의 JS 검사와 실제 iOS/Android 빌드·설치·실행을 구분한다.
실제 작은 폭/큰 글자/긴 한국어·Safe Area·스크롤/터치·선택 표시/VoiceOver/TalkBack·포커스·키보드·모달 닫기는 **기기 검증 대기**다.
코드의 min size/label/선택 상태 확인과 합성 accessibilityAction 성공을 OS 접근성 통과로 표현하지 않는다.

<a id="review"></a>

## 10. 구현 후 자기 재검토

FRONT7 규칙, 변경 코드/테스트, 원본→R/T/U/C→소비자/행동→검사 결과, 종료 조건과 문서를 다시 대조했다.
같은 작업자의 자기 검토이며 독립 리뷰/제3자 승인으로 기록하지 않는다.
실제 화면을 열 수 없어 원본 PNG와 코드·자동 렌더 트리를 대조한 한계가 있다.

첫 수정 뒤 속도 slider의 같은 stale value 유형을 추가 발견해 재현·수정·최종 관련 검사를 실행했다.
상대 이동/선택은 store 또는 해당 초안이 계산하고 절대 위치 입력과 섞지 않는지 재확인했다.
close/dispose·abort·auth revision·option 초안·gate 경계를 재검토했고 비교 fixture를 정상 source에 적용하지 않았음을 확인했다.
Safe Area/compact 보완을 실제 화면 검증 완료로 과장하지 않았다.
S192 시간 차이와 발행 Listen 미지원을 막연한 미확인으로 남기지 않고 구현/비교 조건과 원본 질문을 분리했다.

추적 문서 재검토에서는 반복 문맥 패치로 JSON 추가 판정 일부가 다른 U/C에 붙은 것을 발견했다.
ID로 직접 매칭하여 고쳤고12화면·3흐름·14단계·15 U·16 C의 실제 ID 집합을 계획과 다시 대조했다.
기존 모든 화면/흐름/단계/U/C 필드와 과거 원본·증거, manualUpdate 이력의 보존도 확인했다.
최종 목록 검사에서63흐름/273단계/고유200화면·R1395행·59작업 배정 오류0, AGENT 로컬 링크 오류0이었다.
새 로컬 링크102개/앵커 오류0, 현재 코드551파일과 존재하는 기준 입력의 해시 불일치0, 금지 경로 변경0을 확인했다.
과거 삭제된 tools/evidence 입력4개는 부재 상태를 유지했고 복원하지 않았다.
변경은 기존 추적33파일과 새 결과 문서1개이며 git diff --check를 확인했다.

<a id="residuals"></a>

## 11. 잔여별 담당·종료 조건

| 분류 | 잔여·근거 | 담당·종료 조건 |
| --- | --- | --- |
| 완료 | 연속 이동/play/속도 입력 손실 수정, 옵션/권한/계정 늦은 응답 회귀, 독립 시간 fixture 검증, 지원 판정 | 12. 이번 자동 검사 범위 완료이며 전체 시각 종료 아님 |
| 구현·시각 잔여 | font/vector/gradient·cover crop·mini/시트 간격·큰 글자 줄바꿈·Mock UI가 원본과 다름 | 12/Q02/Q12. 허용된 동일 조건 실제 렌더 확보 후 보정·재검증 |
| 비교 재현 잔여 | 기본duration280과 S141/S192 표시 쌍 차이. 합성270/287 입력은 자동 테스트에서만 재현 | 12/Q01. 기존 source/clock 주입 조건의 실제 화면 비교; 제품 기본값 고정 금지 |
| 지원 미구현·결정 대기 | 발행4조합 Listen 없음 | Q11/12. 원본 근거 또는 명시적 제품 결정으로 적용 범위/접근·source 계약 확정. 이번에는 신규 지원 구현하지 않음 |
| 원본 미확인 | 위15 U의 실제 발화·시간·취소/영속·큐/언어 정책 | 12/Q03. 해당 질문을 직접 뒷받침하는 자료 확보 또는 명시적 범위 판정 |
| 환경 차단 | 실제8081 행동·console·새 렌더/쌍 비교 | 12. 허용된 브라우저 연결 환경에서 아래 절차 실행, 같은 차단 반복 금지 |
| 실제 기기 대기 | OS 접근성·터치/드래그·Safe Area·모달/키보드·background lifecycle | 12와 Q07/21. 실제 iOS/Android 기기 실행, 12 시각 잔여를21에 이전하지 않음 |
| 기존 다른 묶음 | 9/10/11 잔여, 공유13, 멤버십19, 전체 검사 안정성22/AuthBoundary14 | 원래 소유 유지. 이번12 통과로 닫지 않음 |
| 범위 제외 | 실제 TTS/AirPlay/다운로드 음원·결제·인증·DB/서버·AI | Q08. 외부 서비스 실행 대기로 집계하지 않음 |

<a id="reproduce"></a>

## 12. 8081 재현 순서

아래는 연결 가능한 환경에서 따라 할 절차이며 이번 브라우저 실행 결과가 아니다.

1. 기존 `http://localhost:8081`에서 mock A 로그인과 audio 권한을 확인한다. free이면 Member 모의 선택→성공 확인→복귀 후 사용자가 Listen을 다시 누른다.
2. Home의 ChatGPT Is Poisoning Your Brain 기사를 연다. Listen→상단/미니 로딩→pause 표시→미니 확장을 확인한다.500ms 기본 지연과 시간이 진행되는 정상 상태를 유지한다.
3. 일시정지하고30초 이동2회가60초 증가하는지,10초 뒤로·경계·재생/일시정지·접기/재확장이 같은 문서를 유지하는지 본다. native 접근성 증가/감소와 web 화살표/Home/End를 각각 확인한다.
4. 속도1x/200 WPM→증가3회→2.5x/490 WPM/145%→취소→1x 유지→다시 선택/Done→2.5x를 본다. Done 중 중복 입력과 취소/재진입은 별도 source 대역의 자동 테스트에서도 확인한다.
5. 더보기→Select a voice→Emma·언어 그룹/메타데이터→검색 Hans→선택→취소→Emma 유지, 다시 Hans/Done→재진입 선택을 확인한다. 실제 발화나 번역으로 해석하지 않는다.
6. View story→기사 복귀, 다른 기사 진입·Listen A→B→A, 홈/라이브러리 이동·복귀, close 후 기본 옵션 초기화를 본다. Share/Show less/Mute/Report는 기존 연결만 확인한다.
7. Responses→Rules/Medium policy→Listen→미니/확장→View story→정책 전용 경로→뒤로 복귀를 확인한다. 발행 Public/Unlisted는 Listen이 없는 현재 지원 경계를 확인한다.
8. A→B→A 시 이전 플레이어/선택/오류가 보이지 않는지 확인한다. 준비/옵션 실패·retry·늦은 응답과 loading/playing 중 권한 철회는 기존 주입 source의 자동 검증과 구분한다. 이를 위해 일반 앱에 장애 토글을 추가하지 않았다.
9. 작은 화면과 큰 OS 글자·긴 한국어, 검색 키보드·스크롤, 모든 닫기·포커스 복귀·접근성 선택/disabled, Safe Area를 실제 렌더로 확인한다. 원본 OS 영역과 crop/논리 viewport/실제 DPR를 별도로 기록한다. 기본앱280의 시간과 독립 비교 입력을 혼동하지 않는다.

<a id="next"></a>

## 13. 종료 판정과 다음 범위

**Parity12의 기능 보완·자동 회귀는 수행했으나 실제 화면/시각 잔여와 기기 조건이 남아 전체 종료 미충족이다.**
9/10/11의 미완료도 유지한다.
커밋·push·배포·Parity13은 수행하지 않았다.

다음 계획은 [묶음13 공유](MEDIUM_PARITY/EXECUTION_PLAN.md#batch-13)다.
직접 V23, S028/S051/S073/S163, T-F39-02~04·T-F40-01~02와 U-S028/U-S051/U-S073/U-S163/U-F39/U-F40, 계획의 C 계약이 범위다.
선행2/7/10/11과 실제 web clipboard/export 성공·실패·취소, OS 공유/사진 Q07, returned≠delivered 경계를 따라야 한다.
12는13의 직접 선행이 아니므로 **9~12 잔여 소유와 전체 미완료 판정을 유지하는 명시적 인계 아래 독립 가능한13 작업은 요청할 수 있다.**
현재 브라우저 제약 때문에13의 실제 웹 종료 조건까지 충족됐다고 미리 판단하지 않는다.

<a id="pre-commit-review"></a>

## 14. 사용자 요청에 따른 커밋·push 전 재검토 — 2026-11-24

이번 사용자는 재검토·필요한 수정 후 Git 커밋과 `git push origin main`을 명시적으로 요청했다.
앞 절의 커밋/push 미실행 문장은 최초 작업 당시 기록이다.
이 요청은 Parity12 전체 종료 승인이나 기존9/10/11 잔여 해소,13 착수·배포 승인이 아니다.

검토 시작은 main/`9d44e3f`이며 기존 추적33파일·새 결과1파일이 직전 Parity12 범위와 일치했다.
**추가로 확정된 제품 코드 결함은 발견하지 못했다.**
store의 최신 상태·tick 경과·단일 timer, 상대/절대 seek, 함수형 속도 초안·Done/취소, 권한·계정 scope와 늦은 응답, compact/Safe Area 소비자를 다시 읽고 테스트와 대조했다.
FRONT7의 상태 소유권·수명·한글 주석·플랫폼·검증 기준을 적용했으며 새 앱 코드/테스트 변경은 하지 않았다.

문서 누락1건은 수정했다.
`AGENT/README.md` 최상단 상태가11에 머물러 있었으므로12 결과와 이번 재검토를 연결했다.
TODO/FE/AGENT 현재 상태와 기준 JSON의 이번 검토 이력·존재하는 입력 해시도 맞췄다.
과거 원본/요구사항/증거/currentEvidence/readiness와 삭제된 tools/evidence 입력4개는 유지한다.

이번에 새로 실행한 검사:
- Node24.18.0에서 typecheck/lint 각각 종료0.
- 9절과 같은7경로의 실제 navigation·store·음성·정책·멤버십·발행 경계 테스트: **14 suites/98 tests 통과,109.716초, 실패/skip0**.
- 최종 출력에서 act/console 경고는 관찰되지 않았다. timeout 변경·skip·재실행으로 실패를 성공으로 대체하지 않았다.
- 전체 suite/JS 번들은 이번 검토에서 재실행하지 않았다.9절의 메모리 JS 결과는 동일 앱 코드의 이전 실행 기록이다.
- 전체63흐름/273단계/고유200화면·R1395·59작업 등록/배정,551코드 입력 해시,12화면/3흐름/14단계/15 U/16 C의 추가 판정 ID와 기존 필드 보존을 다시 확인했다.

원본 재열람은 S131/S160의2장이다.
2.5배/490 WPM/145%와00:40/-04:00·플레이어 조작을 다시 확인했으며 전체14장을 새로 재열람하거나 앱 렌더와 비교했다고 기록하지 않는다.
Document Control 재조회는 연결0/executor 없음이었다.
기존8081 PID29280을 보존했고 과거 차단된 브라우저 실행을 반복/우회하지 않았다.
새 실제 web/console/native/접근성 검증은 미실행이며 기존 시각·원본·환경/기기 잔여를 유지한다.
같은 작업자의 자기 검토이며 독립 리뷰가 아니다.

`git fetch origin main` 후 원격에만 있는 커밋0, 로컬 기존 선행 커밋6개를 확인했다.
사용자가 요청한 main push에는 이 선행6개와 이번35파일의 Parity12 커밋이 포함된다.
커밋 식별자와 push 성공 여부는 실제 Git 결과·최종 보고를 기준으로 확인한다.
새 tools/evidence/캡처/로그/manifest·외부 연동·ENV/medium 변경·Parity13·배포는 수행하지 않는다.
최종 링크109개/앵커·해시 오류0을 확인했고, 새 결과 문서의 스테이징 검사에서 발견한 끝 빈 줄도 정리했다.
