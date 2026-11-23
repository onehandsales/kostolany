# Medium 원본 비교 프로토콜 — Parity 1

[200개 화면 조건](COMPARISON_BASELINE.md) · [실행 계획](EXECUTION_PLAN.md) · [결과](../FE_MEDIUM_PARITY_01_RESULT.md)

**Parity 2 보강:** [자체 UI 노출·비교 처리](OWN_UI_POLICY.md)와 [현재 전후/회귀 증거](../FE_MEDIUM_PARITY_02_RESULT.md)를 추가했다. 캡처 도구의 `--viewport`/`--text-scale=2`는 별도 웹 진단 조건이며 CSS 확대를 RN/OS fontScale 검증으로 사용하지 않는다. PNG는 raw SHA-256, 텍스트는 UTF-8 BOM 제거·LF 정규화 SHA-256으로 보관하며 [증거 검사 도구](../../tools/medium-parity/verifyParity02.py)가 이후 checkout의 파일·로그·해시를 검증한다. 기존 Parity 1 증거와 현재 실행은 분리한다.

## 범위와 상태

**Parity 3 보강:** [새 결과](../FE_MEDIUM_PARITY_03_RESULT.md)는 S008/S100 연결과 정책 도구의 별도 증거다. `capturePreview.mjs`는 input value·선택 위치와 실제 scrollTop을 기록하고 시나리오에서 검증한다. RN Web ref의 `scrollTo({top})`가 실제 위치를 바꾸지 않는 경우를 발견해 DOM scrollTop을 사용하도록 수정했다. 이전 캡처를 새 스크롤 검증으로 간주하지 않는다. [verifyParity03.py](../../tools/medium-parity/verifyParity03.py)의 `--inventory`는 63/273/200의 등록·링크·배정 검사이며 기능 전수 검증이 아니다.

추가 재검토에서는 실행 조건의 시계/DPR/시간대/viewport, 빈·중복 촬영, 실제 콘솔 오류와 소스 목록의 누락까지 검사한다. 채택한 manifest는 덮어쓰지 않는다. 후속 코드 변경 후 과거 증거는 기본 무결성 검사로 확인하고, 새 증거는 별도 `--evidence` 폴더와 manifest에 연결한다. [재검토 명령과 한계](../FE_MEDIUM_PARITY_02_RESULT.md#additional-review)를 따른다.

2026-11-23 Windows checkout `82968fe`를 기준으로 한다. 보관 원본은 Medium iOS catalog version ID1419다. 최신 앱·Android 원본·실제 기기 모델·촬영 시각은 이 자료로 확정하지 않는다. Goal53 당시 macOS 증거와 이번 Windows 실행은 별개다.

`comparisonBaseline.json`은 REQUIREMENTS 8개·FLOWS·UNKNOWN·SCOPE·CONTRACTS와 63개 ANALYSIS를 현재 파일에서 읽어 만든다. `comparisonProfiles.json`은 현재 FE 경계에 대한 수동 재현 절차다. JSON의 sourceCandidates는 실제 존재하는 공급부 조사 위치이며 해당 함수가 모든 reference 값을 seed할 수 있다는 뜻은 아니다. 화면별 원본 입력·표시·상태·수용 조건과 R/T/U/C를 함께 보아야 한다.

| 상태 | 의미 | 승격에 필요한 증거 |
| --- | --- | --- |
| recipe-only | 원본 조건·코드·재현 절차 연결; 실행 준비 완료 아님 | 같은 계정·데이터·시각·위치로 진입하고 실제 PNG와 조건 로그 확보 |
| native-required | 웹으로 같은 화면 재현 불가 | S043 cold start 구현/실행, S113 OS 앨범·권한·사진 준비/실행 |
| current-web-capture | 이번 웹 실제 렌더 캡처 | 해당 캡처와 원본의 데이터·상태·비교 영역 대조 후 차이 기록 |
| ready | 비교 조건을 실제로 재현함 | 원본과 현재 이미지, 입력 데이터, 좌표·플랫폼 기록; 시각 동일성 통과와 별도 |

이번 도구는 `ready`나 동일성 통과를 자동 판정하지 않는다. 조건 목록과 코드 경로가 있다는 이유로 준비 완료 또는 Q01 완료를 선언하지 않는다.

## CP-WEB-01 고정 조건

| 구분 | 이번 비교 기본안 | 해석 경계 |
| --- | --- | --- |
| 원본 | 각 PNG의 실제 IHDR·SHA-256·색공간 chunk를 기록 | 보관 1179×2556 물리 픽셀을 RN 단위로 사용하지 않음 |
| 과거 메타데이터 | MCP 390×844 | 기기/DPR 확인값 아님 |
| 이번 웹 | Chromium 390×844 CSS px, deviceScaleFactor=1, portrait | 모바일 폭의 데스크톱 웹; native/emulated phone 인증 아님 |
| 과거 비교 | 393×852 정규화·앱 영역 crop 이력 | 이번 390×844와 혼용 금지; 새 비교 전 재설정 필요 |
| 시간 | JS Date=2025-06-13T12:00:00.000Z, UTC, en-US | 비교용 기준 시계; 원본 촬영시각 아님; timer/재생/로딩은 별도 제어 |
| 글자 | 기본 fontScale=1, 브라우저 zoom=100% | 120% reader 화면은 reader 설정으로 변경; OS Dynamic Type 아님 |
| 테마 | OS 선호 Light, 앱/reader는 S 조건별 설정 | Dark 원본은 앱 theme와 reader theme를 각각 확인 |
| OS 영역 | 웹 safe inset=0, 원본 inset 미확인 | 원본 status bar·home indicator와 웹 차이 유지 |
| crop | 기본 null, 원본·현재 무가공 저장 | 비교자가 sourceRect/currentRect를 각각 확정하기 전 자동 오버레이/유사도 점수 금지 |
| 색공간 | 원본 ICC/chunk 보존 | 과거 Generic RGB→sRGB 문제 재발 방지; 변환 시 도구·프로파일·방식 기록 |
| 스크롤 | 화면별 보이는 anchor와 실제 scrollTop/scrollLeft 기록 | 원본 픽셀 offset 미확인; title만 같다고 같은 스크롤 상태 아님 |
| 키보드 | 원본의 보임/숨김/미확인 분리 | 웹 input focus·합성 입력은 iOS keyboard/IME와 비동등 |

기기 식별이나 원본 DPR을 `1179/393`으로 역산하지 않는다. whole-frame 원본과 OS 영역 없는 웹의 시각 비교는 구조·데이터 차이를 확인하는 부분 대조다. 수치 오차 허용치와 공통 영역이 정해지기 전 픽셀 유사도를 완료 기준으로 만들지 않는다.

## 계정·fixture 재현

1. 각 독립 상태는 새 브라우저 context/앱 새로고침에서 시작한다. 메모리 초기화와 같은 실행 안 A→B→A의 데이터 유지를 구분한다.
2. A=`example-reader`, B=`example-reader-b`, guest=null이다. 원본 Alex Smith 표시는 A 프로필 이름을 비교용으로 바꿔 만들 수 있지만 ID·인증 revision·소유권을 이름으로 바꾸지 않는다. 원본 인물과 mock 사용자를 같은 실제 계정으로 설명하지 않는다.
3. 각 S의 `referenceObservations`에 있는 표시값·상태를 맞춘다. 공개/비공개·본인/타인·회원 전용 글 표시·현재 계정의 회원 등급은 별도 축이다. 불명확한 원본 권한은 미확인으로 남긴다.
4. `AppNavigator`의 source props와 기존 source factory의 공개 옵션을 사용한다. 전역 fixture 정상값, production clock, 전체 앱 navigation을 비교 때문에 바꾸지 않는다. 별도 공급부가 필요하면 해당 묶음에서 주입 경계를 구현·검증한다.
5. 화면별 source 후보의 정확한 지원 입력을 코드와 대조한다. 현재 `createMockDigestSource({initial})`/`replaceIssues`, 통계의 `now`·`measurements`는 주입 가능하다. 반면 프로필 초기 배열은 내부 상수이므로 UI save 또는 별도 ProfileSource가 필요하다. 지원하지 않는 옵션을 호출 예시에 만들지 않는다.
6. 리스트 S106의14초, S011의6초, S077의1초는 독립 캡처 조건이다. 생성/수정 기준은 D13에서 판정한다. 프로필23h ago(D12), 초안Edited1minute, 응답의1/2seconds도 서로 다른 계약이다.
7. 통계 월간11/2와 글별Lifetime0/0은 서로 다른 비교 snapshot이다. 이력 방문을 분석 집계로 쓰거나 정상 source의 계산식을 원본 숫자에 맞춰 변경하지 않는다.
8. 재생 시간·토스트·pending 같은 순간 상태는 Date 고정만으로 재현되지 않는다. 기존 source의 지연·controlled Promise·mock clock을 해당 묶음에서 사용하고 실제 capture 시점을 기록한다.
9. 원본 이메일/인증코드/개인 사진을 실제 인증 자료로 사용하지 않는다. 합성 mock 입력과 허용된 로컬 테스트 이미지를 쓴다. 실제 OAuth·결제·발송·TTS·영속 offline은 Q08 제외다.

## 재사용 명령

저장소 루트에서 Python 3 표준 라이브러리만으로 실행한다.

```powershell
python tools/medium-parity/buildBaseline.py --check
python tools/medium-parity/buildBaseline.py --screen S116
python tools/medium-parity/buildBaseline.py --write
python -m unittest discover -s tools/medium-parity -p "test*.py" -v
```

`--write`는 신규 비교 JSON/세 Markdown만 재생성한다. REQUIREMENTS/FLOWS/UNKNOWN/SCOPE/CONTRACTS·medium 원본·FE source는 수정하지 않는다. 수동 profile 또는 기존 요구가 바뀌면 재생성하고 diff를 검토한다. 내용은 덮어쓰기 전에 Git으로 확인한다.

텍스트 입력과 FE 코드의 해시는 UTF-8 BOM을 제외하고 줄바꿈을 LF로 정규화한 SHA-256이다. Windows `core.autocrlf`에 따른 체크아웃 차이가 문서 변경으로 오인되지 않게 한다. PNG 해시는 원본 바이트 그대로이며 색공간·크기·픽셀 변경을 정규화로 숨기지 않는다. 진단 캡처도 파일·해시·촬영 로그·화면 연결이 모두 있어야 검사를 통과한다.

브라우저 확인은 별도 terminal의 `FE`에서 `npm.cmd run web`으로 8081을 실행한다. 이미 실행 중이면 재시작하지 않는다. Node24 기본 WebSocket을 사용하는 도구는 기존 Chromium 실행 파일을 직접 지정하므로 Playwright 패키지를 새로 설치하지 않는다.

```powershell
node tools/medium-parity/capturePreview.mjs --browser=C:/path/to/chrome.exe --out=TODO/evidence/parity-01/browser
```

위 browser 경로는 예시이며 현재 기기의 실제 실행 파일을 지정한다. `--scenarios=tools/medium-parity/previewScenarios.json`으로 진입 URL과 실제 UI click을 재현한다. 일반 앱 코드는 수정하지 않고 격리한 브라우저에만 JS 시계를 적용한다. 새 context에서 메모리가 초기화된다. 앱 자체의 previewLink 경로를 이용하며 navigation을 mock하지 않는다. 출력은 PNG·캡처 해시·DOM 표시값·label·viewport/DPR·브라우저 버전·시각·스크롤·console/exception이다. 출력의 S-ID는 비교 대상 연결이며 원본 동일성 합격 표시가 아니다.

출력 폴더는 비어 있어야 한다. 재실행 시 새 `--out` 경로를 사용해 이전 실행의 PNG와 실패 로그를 섞지 않는다. `captures.json`의 run에는 실제 UTC 시작·종료 시각, 요청 화면 목록, completed/failed와 console 오류 수가 기록된다. snapshot.date는 고정된 비교용 시각이며 capturedAt은 실제 촬영 시각이다. 표시 설정 시나리오는 화면 안의 글자 크기·테마·스위치 상태를 별도로 검사한다. DOM text/labels 목록은 화면 밖 요소를 포함할 수 있으며 접근성 트리 전체의 가시성 검증이 아니다. assertion 실패나 runtime/console 오류가 있으면 성공 종료하지 않는다.

도구는 자신이 시작한 Chromium만 닫는다. 기존 사용자 브라우저·8081을 종료하지 않는다. 브라우저 프로필은 OS 임시 폴더에 남기며 사용자 프로필을 재사용하지 않는다. `TODO/evidence/`는 기존 gitignore 대상인 작업용 출력 위치다. 이번에 채택한 10개 PNG와 최종 촬영 로그는 [EVIDENCE/PARITY_01](EVIDENCE/PARITY_01/captures.json)에 함께 보관해 Git 추적 대상에 포함했다. 이후 채택할 증거도 별도로 보관하고 currentEvidence에 경로·해시를 연결해야 한다.

## Q01/Q02 잔여와 종료

200개 모두의 조건이 정의되어도 모든 동일 fixture가 실행된 것은 아니다. source 주입, 누락된 구현, 원본 없는 정책, native 전용 화면은 각 담당 묶음에 남긴다. 데이터·상태가 같은 실제 capture 쌍과 조건 로그가 확보된 화면부터 비교 준비 상태를 올린다. Q02의 폰트·자산·배치 변경과 개별 V 보정은 이번 기준 정리로 완료 처리하지 않는다. Q10은 모든 미확인·잔여·기기 대기를 포함해 마지막에 판정한다.
