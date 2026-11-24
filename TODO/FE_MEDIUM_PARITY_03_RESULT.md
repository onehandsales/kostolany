# Parity 3 — 정책 기사와 Responses 연결

**최신 잔여 판정 — 2026-11-24:** [Parity1~8 잔여 정리·보완·재검토](FE_MEDIUM_PARITY_01_08_REVIEW.md). 아래 수치·미커밋·미착수·시각 차이는 해당 실행 당시 기록이다. 후속 해결과 이번 보완, 원본 근거 부족/기기/제외를 최신 표에서 구분하며 과거 증거를 현재 통과로 사용하지 않는다.

2026-11-23, Windows 작업 디렉터리 `D:\git_repository\kostolany_project`. 기준 HEAD `d7dd71294ca4c5b815551f13921f73d4f33410c5` 위의 기존 미커밋 Parity 2 변경을 보존했다. 이 문서는 이번 실행을 기록하며 Goal 53·Parity 1/2의 검증을 새 실행으로 대체하지 않는다.

**판정:** D08의 보이는 기사 영역·기존 mock 도구 연결과 복귀를 보완했다. V21의 구조 비교는 수행했으나 원본 폰트·로고/아바타·간격·응답 272 동일 재현은 미완료다. U-S008/U-F34의 실제 Medium 실행 결과·전문·현재 버전은 미확인이다. Q07 실제 기기 검증은 대기, Q08 외부 서비스는 제외 상태를 유지한다. 묶음 4 이후는 시작하지 않았다.

**추가 재검토:** 사용자의 재검토 요청으로 발견한 화면 이동·접근권 상실 결함은 [추가 재검토 기록](#additional-review)에 별도 기록한다. 아래 최초 실행의 테스트·캡처는 당시 코드의 증거로 보존한다.

## 적용 규칙과 작업 보존

- `AGENT/README.md`, 공통 현재 상태/품질 규칙, UXUI README와 Medium reference 규칙을 확인했다. 과거 초기 FE 제외 범위는 이후 Goal·Parity 승인과 구분했다.
- `AGENT/SOFTWARE_AGENT/FRONT_AGENT/`의 README, ARCHITECTURE, CODE_CONVENTIONS, STATE_AND_DATA, MOBILE_UI_AND_PLATFORM, PERFORMANCE_AND_SECURITY, TESTING_AND_DELIVERY를 읽고 적용했다. 설치된 RNTL 14 안내도 확인했다.
- app은 route 연결을 소유하고 feature는 callback으로 복귀한다. `PolicyArticle`은 `ResponsesPanel`을 import하지 않아 순환 의존을 피했다. 도구 상태는 기존 auth/관계/박수/저장/응답/reader/공유/듣기 공급부를 재사용한다. 설명 주석은 한글 한 문장 한 줄로 작성했다.
- 계정·인증 revision·response source 변경은 정책 화면/직접 연 응답 패널의 초안과 메뉴 수명을 끝낸다. 같은 사용자 ID라도 새 인증 revision은 이전 UI를 재사용하지 않는다.
- 정책 기사에도 기존 작성자 차단 조회·실패/재시도·차단 상태를 적용했다. 차단 시 본문과 내부 도구를 unmount한다. 정책만 예외로 허용하는 새 제품 정책은 도입하지 않았다.
- ENV 파일·원본 `medium`·기존 8081 프로세스를 변경하지 않았다. 커밋·push·배포·외부 서비스 연결은 하지 않았다. 초기 상태와 파일 해시는 [preflight](MEDIUM_PARITY/EVIDENCE/PARITY_03/preflight.json)에 보관한다.
- 실제 기기·OS IME·VoiceOver/TalkBack 검증을 수행하지 못한 것은 완료 기준의 예외 승인이 아니다. 별도 대기로 남긴다. 독립 리뷰 없이 같은 에이전트가 자기 검토를 두 차례 수행했다.

## 전체 목록 검사와 직접 원본 검토의 범위

[목록 검사 도구](../tools/medium-parity/verifyParity03.py)의 `--inventory`로 실제 `medium/flows`를 comparisonBaseline의 화면·흐름·단계·R/T/U/C 배정과 대조했다.

| 검사 | 결과와 한계 |
| --- | --- |
| ANALYSIS 목록 | 63개 실제 경로와 63개 flow가 일치 |
| 단계 PNG | 273개 경로, 63개 ANALYSIS의 단계표 순서와 T 단계 일치 |
| 고유 이미지 | 200개 reference ID, 반복된 동일 ID의 PNG 바이트 해시 일치; 단계를 고유 화면으로 중복 집계하지 않음 |
| 로컬 연결 | ANALYSIS의 915개 상대 링크 존재 확인 |
| 배정 | D01~D13·Q01~Q12·V01~V34의 59개 항목, 화면/미확인/C 항목에 담당 묶음 존재 |
| 판정 범위 | 미등록·중복 오집계·깨진 로컬 경로·담당 미배정은 발견되지 않음. 링크/수량 통과는 200개 화면의 기능·시각 검증 완료가 아님 |

`medium/README.md`와 `REVIEW_R2.md`의 63/273/200 구분을 확인했다. 아래 세 흐름의 ANALYSIS 전체와 12단계에 해당하는 고유 PNG 10개를 직접 읽고 보았다. 같은 이미지의 중복 경로는 목록/해시로 확인했다. 그 밖의 60개 흐름은 목록·단계·링크·배정 검사이며 PNG 동작을 새로 전수 검토한 것이 아니다.

| 흐름 | 직접 확인한 단계/원본 ID | 이번 검토와 잔여 |
| --- | --- | --- |
| [F16 Story detail](<../medium/flows/Home/Story detail/ANALYSIS.md>) | 01 `1ef4e2…`, 02 `332d5b…`, 03 `f4b066…`, 04 `c3fcf4…`, 05 `e1a92b…`, 06 `c068a6…`, 07 `92624a…` | Home→기사 상단/본문/하단→inline 응답→See all responses→추천 글의 맥락. 원문 전체·추천·834명 재현 보정은 묶음 10 등 기존 담당 |
| [F30 Responses](<../medium/flows/Home/Story detail/Responses/ANALYSIS.md>) | 01 `e1a92b…`, 02 `915888…`, 03 `9c9af2…` | inline 응답과 시트의 차이, 정렬·중첩 답글·composer·shield·닫기. 원본 단계 사이의 정확한 클릭/시간은 미기록 |
| [F34 Medium policy](<../medium/flows/Home/Story detail/Responses/Medium policy/ANALYSIS.md>) | [01 S100](<../medium/flows/Home/Story detail/Responses/Medium policy/screens/01_sc_915888473ac24e8987c996b8954f54c6.png>), [02 S008](<../medium/flows/Home/Story detail/Responses/Medium policy/screens/02_sc_063290fab51b4acd913212f85acde70d.png>) | 진입·제목·저자·강조·도구·복귀 구현 검토. 2장만으로 버튼 실행 결과·원본 복귀 보존 정책을 확정하지 않음 |

원본의 `newsworthiness` 밑줄을 추가로 확인했다. R-S008-V의 세 번째 문단 관찰에 이 세부를 추가하고 렌더링했다. 원본의 미수록 전문, 실제 응답 272개, Listen의 음원, 더보기의 메뉴 내용, 정책 작성자의 상세 프로필을 생성하지 않았다.

## 요구사항별 현재 결과

전체 R-S008은 [기존 요구사항](MEDIUM_PARITY/REQUIREMENTS_01.md#s008)을 보존하고 이번 결과를 추가 연결한다.

| ID | 변경/검증 | 현재 상태 |
| --- | --- | --- |
| R-S008-L | Medium Policy 헤더, 제목·메타데이터·작성자·본문·고정 하단 도구. 헤더/본문/도구 스크롤 영역 분리 | 구조 구현·웹 확인; 원본 좌표/폰트 일치 잔여 |
| R-S008-D | `May 26, 2021`, `11 min read`, 제목/작성자, 보이는 발췌를 `mediumPolicyArticle` fixture로 분리 | 보관 화면 표시값 구현; 현재 정책 날짜라는 의미 아님 |
| R-S008-S, R-S008-C01, T-F34-02 | Responses→Rules→Responses→기사 복귀. 입력·선택한 답글·정렬·답글 접힘 유지. 웹 200px scrollTop 및 shield 포커스 복원 | 이번 mock 정책 구현·검증 완료; 실제 Medium 복귀 결과는 U-F34 |
| R-S008-C02 | 기존 ListenControl/전역 무음 mock 플레이어, 시작·일시정지·닫기 | 기존 mock 연결; 실제 TTS·음원/AirPlay 제외 |
| R-S008-C03 | 더보기→Display settings/현재 정책 링크, Escape와 최초 진입 버튼 포커스 복귀 | 자체 mock 메뉴 연결. 원본 메뉴 항목 관찰로 기록하지 않음 |
| R-S008-C04 | Medium 작성자 ID를 기존 공개 directory에 연결, 프로필 진입·기사 복귀 | mock 연결 완료. 이름·기사 외 미수록 프로필 정보 추가하지 않음 |
| R-S008-C05 | Follow/Following, guest 로그인 취소/성공 후 재행동, 저장 기사 재진입에도 동일 작성자 상태 | 기존 관계 저장소 연결·검증 |
| R-S008-C06 | 보관 기준 54K 박수, 사용자 조작 후 54001, 재진입 공유 | mock 반응 연결·검증; live 집계 아님 |
| R-S008-C07 | 정책 자체 Responses 대상 `article:medium-rules`, 초기 0→작성 후 1, 부모 기사 응답 7과 분리 | 도구 연결 완료; 원본 숫자 272 재현 미완료. 가짜 응답 rows를 만들지 않음 |
| R-S008-C08 | Save to→읽기 목록→저장→Library→동일 정책 본문 재열기 | 기존 저장소/catalog/route 연결·검증 |
| R-S008-C09 | 기존 ShareSheet 열기·닫기/복귀 | mock 공유 연결; 실제 OS 공유·외부 수신 결과 대기/제외 |
| R-S008-V | 첫 문단 연녹색 강조, 세 번째 문단 시작과 밑줄, 9개 조작점 노출 | 부분 완료. 로고/아바타는 M 대체, 원본 서체·숫자·여백 차이 유지 |
| T-F34-01, S100 | 원래 Responses 진입, 정렬·답글·입력·닫기·focus/scroll 회귀 | 연결 확인. 원본 834명/아바타/전체 배치 보정은 묶음 10/V20 |
| U-S008, U-F34 | 전문·현재 버전·실제 도구 실행·원본 복귀/링크 결과 | 미확인 유지; 공식 설명을 새로 조회/확정하지 않음 |
| D08 / V21 | 기사 영역과 기존 mock 연결 / 원본 화면 대조 | D08 이번 연결 범위 완료, V21 시각 동일 재현 미완료 |

정책 작성자를 누르면 기존 공개 navigation을 사용할 수 있도록 Responses를 닫고 프로필로 이동한다. 프로필의 Back은 원래 기사로 돌아오며 닫힌 응답 초안은 복원하지 않는다. 이는 원본 관찰이 아닌 이번 mock 연결 정책이다. Rules의 뒤로 버튼으로 Responses에 복귀하는 경우에는 초안/답글 선택/정렬/스크롤을 보존한다. 정책의 새 진입은 본문 상단부터 시작하며 응답·박수·저장·팔로우는 기존 사용자별 저장소를 사용한다. 전체 새로고침은 기존 메모리 정책대로 초기화한다.

## C 계약과 Q02/Q12의 적용 범위

| 계약 | 이번 적용 / 후속 담당 |
| --- | --- |
| C01/C02/C03 | 기존 대체 폰트·AppIcon·ReaderTheme·48px 터치 영역/가시 아이콘 구분, 작은 폭·CSS 큰 글자·팝오버·포커스. 원본 자산/OS 접근성은 Q02/Q07 잔여 |
| C09/C14 | 정책 도구·작성자·응답/정렬/Rules 복귀 연결. 부모 기사 전체는 묶음 10. 읽기 이력/Viewed·읽기도구 범위는 묶음 4에서 정책 전용 경로까지 함께 대조해야 함 |
| C36 | 저장 재열기를 위해 catalog와 ArticleDetail fixture에 발췌 등록. 다운로드 상태/오프라인 소비는 이번 검증 아님, 묶음 8 |
| C53 | 기존 공개 작성자 화면에 연결. 내 프로필 Stories/Public/Lists 전체 보정은 묶음 15 |
| C58/C59/C60/C61 | 기존 ListenControl/플레이어 시작·일시정지 연결. 속도·음성·AirPlay/메뉴 전체 보정은 묶음 12; 실음원 Q08 제외 |
| C65/C66/C67 | 기존 membership/auth 권한을 우회하지 않음. 기존 mock Member A 조건으로 실행. 결제/계정 설정 전체는 묶음 13/18, 실제 결제 제외 |
| C71 | 웹 DOM/키보드와 native Jest/JS export를 분리. 기기 공유·음성·화면 읽기 검증은 묶음 21/Q07 |

Q12에 따라 발췌·현재 정책 차이·mock 상호작용 안내와 기존 공식 링크를 유지한다. 안내는 발췌 끝에 위치하고, 보이는 viewport에 따라 원본과의 차이를 기록한다. 별도 촬영용 UI나 안내 숨김을 넣지 않았다. `54K`는 해당 보관 기사 fixture의 초기 기준이며 앱 전체 수치를 고정하지 않는다. 원본 `272`는 reference 메타데이터에만 보존하고 실제 표시 수는 응답 저장소가 소유한다.

## 이번 실행과 캡처 조건

- CP-WEB-01: 기존 `http://localhost:8081`, 별도 headless Chrome 프로필, 390×844 CSS px, DPR 1, UTC/en-US, Date `2025-06-13T12:00:00.000Z`, Light, 최초 guest 후 모의 A. 브라우저 세션에서만 시계를 고정했다.
- 원본 PNG는 1179×2556 물리 픽셀이다. 과거 논리 메타데이터 390×844는 원본 기기/DPR 확인값이 아니다. 원본 OS 영역과 웹 safe inset 0은 별도다.
- 원본·현재 PNG는 무가공 보관, crop/색 변환/오버레이/정규화 이미지 생성 없음. 구조·문구·줄바꿈·여백을 직접 대조했으며 픽셀 동일성 점수는 산출하지 않았다.
- 작은 폭 320×568, 작은 폭+CSS 글자 2배, 넓은 화면은 별도 진단이다. CSS 확대/합성 한국어 입력을 OS Dynamic Type/한글 IME 검증으로 표현하지 않는다.
- before-final은 preflight의 코드로 촬영했다. 채택한 최종 실행은 별도 manifest의 sourceFiles에 연결한다. Parity 2 및 추가 재검토 manifest는 그대로 보존한다.
- 첫 전체 검사/캡처 이후 미니 플레이어 연결 누락을 추가 발견했다. `first-review-code.json`은 이 수정 전 FE 코드에 대응한다. 전체 테스트 로그 `frontend-final.txt`와 최초 `*-final` 캡처는 그 시점의 결과이고, 마지막 수정 후 `frontend-review.txt` 및 `*-review` 재촬영을 최종 소스와 연결한다. 이름에 final이 있다는 이유로 과거 캡처를 최신 코드의 증거로 승격하지 않는다.

| 검사 | 이번 실행 결과·증거 |
| --- | --- |
| 첫 전체 검사 | [frontend-final.txt](MEDIUM_PARITY/EVIDENCE/PARITY_03/frontend-final.txt): 타입/lint exit0, **274 suites / 1,460 tests 통과**, 971.527초. 마지막 미니 플레이어 연결 전의 [FE 코드 기록](MEDIUM_PARITY/EVIDENCE/PARITY_03/first-review-code.json)에 대응 |
| 마지막 수정 후 검사 | [frontend-review.txt](MEDIUM_PARITY/EVIDENCE/PARITY_03/frontend-review.txt): 타입/lint exit0. PolicyNavigation·ResponsesPanel·ListeningNavigation·DisplayNavigation·BookmarkNavigation **10 suites / 52개 고유 테스트 대상** 중 최초 51통과/1시간초과. 아래 동일 코드 재실행으로 남은 실패 해소 |
| 시간초과 재검증 | [frontend-review-retry.txt](MEDIUM_PARITY/EVIDENCE/PARITY_03/frontend-review-retry.txt): Android ListeningNavigation **1 suite / 8 tests 통과**, 20.557초. 실패했던 첫 흐름은 1,973ms로 통과. 코드·5초 timeout을 바꾸지 않고 다른 무거운 검사 종료 후 실행. 두 실행의 중복 7개를 새 테스트 수로 더하지 않음 |
| 추가한 회귀 | PolicyNavigation 6사례×2 project: 초안/답글 선택·정렬·접힘/중첩 응답, 링크 늦은 실패·재시도, 팔로우·박수·저장 재열기, Listen/작성자 복귀, 차단, 정책 내부 듣기 실패 재시도/확장/닫기. ResponsesPanel 직접 진입의 A→B→A·같은 A revision 초기화 1사례×2 project |
| 브라우저 주요 흐름 | [flow-review 22상태](MEDIUM_PARITY/EVIDENCE/PARITY_03/flow-review/captures.json): guest 로그인 취소/성공, 한국어 초안, Most Recent, 200px 스크롤, Rules 복귀, Follow/박수/저장/응답/공유/메뉴, Library 재열기. DOM assertion19 |
| 작은 화면 | [320×568 7상태](MEDIUM_PARITY/EVIDENCE/PARITY_03/small-review/captures.json), [같은 폭+CSS 글자2배 7상태](MEDIUM_PARITY/EVIDENCE/PARITY_03/large-review/captures.json): 버튼48px/화면 안 배치, 본문 끝 안내/링크 접근, 팝오버/닫기·포커스. 각 assertion8 |
| 넓은 화면 | [1280×844 7상태](MEDIUM_PARITY/EVIDENCE/PARITY_03/wide-review/captures.json): 최대680px 정책 패널·본문 스크롤/팝오버/복귀. assertion8 |
| 도구/연결 재검토 | [tools-review 9상태](MEDIUM_PARITY/EVIDENCE/PARITY_03/tools-review/captures.json): Listen/pause·작성자 왕복·Light/Dark·닫기, assertion3. [listening-review 6상태](MEDIUM_PARITY/EVIDENCE/PARITY_03/listening-review/captures.json): 정책 안의 플레이어 확장/접기/닫기, assertion2. [entry-review 3상태](MEDIUM_PARITY/EVIDENCE/PARITY_03/entry-review/captures.json): 본문 shield→Rules→Responses→원래 shield 포커스, assertion1 |
| 현재 코드 캡처 합계 | **7회 / 61 PNG / DOM assertion49**, console/runtime error0. 단순 같은 글자 존재 검사와 실제 value·scrollTop·선택 속성·focus 검사를 구분. 한국어 초안의 selectionStart/End=39도 왕복 전후 유지됨을 로그로 대조 |
| 원본 비교 전후 | [수정 전 S008](MEDIUM_PARITY/EVIDENCE/PARITY_03/before-final/S008.png), [마지막 수정 후 S008](MEDIUM_PARITY/EVIDENCE/PARITY_03/flow-review/S008.png), [S100 진입](MEDIUM_PARITY/EVIDENCE/PARITY_03/flow-review/S100.png). 최초 전후/재검토 캡처도 보존하며 현재61개에 중복 합산하지 않음 |
| 도구·목록 | [tool-checks.txt](MEDIUM_PARITY/EVIDENCE/PARITY_03/tool-checks.txt)의 Python20검사/Node 문법 검사·과거 P2/P2_RECHECK archive 무결성 통과. [final-checks.txt](MEDIUM_PARITY/EVIDENCE/PARITY_03/final-checks.txt)는 마지막 FE 코드의 타입별 입력 해시·목록/배정·Python20검사·Node 문법·diff 공백·문서 링크를 확인. 이후 재현 profile의 경로/공급부 목록 보완은 [profile-checks.txt](MEDIUM_PARITY/EVIDENCE/PARITY_03/profile-checks.txt)로 다시 확인 |
| 플랫폼 | [마지막 Android/iOS JS export](MEDIUM_PARITY/EVIDENCE/PARITY_03/js-export-review.txt) 모두 exit0. [환경](MEDIUM_PARITY/EVIDENCE/PARITY_03/platform.json): Windows, PATH의 adb/emulator/java/xcodebuild 및 기본 Android SDK adb 미발견, native 프로젝트 없음. iOS는 macOS/Xcode/기기, Android는 JDK/SDK·기기 또는 emulator가 필요. 실제 빌드/설치/기기 실행은 하지 못함 |
| 보존 | [preflight 대비](MEDIUM_PARITY/EVIDENCE/PARITY_03/preservation.json) `medium` 382파일 바이트 해시 일치, 8081 PID29280 유지. 의도한 FE/도구 변경은 별도 목록. ENV 수정·의존성 설치 없음 |

Jest 전체 로그에는 VirtualizedList의 `act` 경고가 있으며 브라우저 console error0과 다른 기록이다. 시간초과는 한 번의 실행 실패로 남겼으며 단독 재실행 통과만으로 일반적인 성능 보증을 주장하지 않는다. 마지막 수정 후 전체1,460개를 다시 실행했다고 표현하지 않는다.

[최종 증거 manifest](MEDIUM_PARITY/EVIDENCE/PARITY_03/evidence-manifest.json)는 채택한7회 실행, PNG/로그 및 최종 sourceFiles의 해시를 연결한다. `before-final`은 preflight, 최초 `*-final`/전체 테스트는 first-review-code, 마지막 `*-review`/관련 재검증/JS export는 최종 sourceFiles로 구분한다. 이전 manifest를 덮어쓰지 않았다. 원본 재열람의 정확한 경로/ID는 [reference-review.json](MEDIUM_PARITY/EVIDENCE/PARITY_03/reference-review.json)에 보존한다.

```powershell
python -X utf8 tools/medium-parity/buildBaseline.py --check
python -X utf8 tools/medium-parity/verifyParity03.py --inventory
python -X utf8 tools/medium-parity/verifyParity03.py --check-code
```

후속 코드 변경 후에는 `--check-code` 없이 보관 증거만 검사한다. `--write`는 최초 채택 때만 사용하며 이미 채택한 manifest에는 다시 사용하지 않는다. Git ignore 대상이 아닌 위치에 보관했으며 커밋/스테이징은 하지 않았다.

## 구현 후 재검토와 수정

첫 구현 후 변경 코드/테스트를 다시 읽고 실제 원본·브라우저·접근성 상태를 대조했다. 이후 최종 문서와 요구사항 연결도 다시 검토했다. 제3자 독립 리뷰를 수행한 것은 아니다.

| 발견/재현 | 원인·영향 | 수정과 재검증 |
| --- | --- | --- |
| Rules 뒤로 시 shield 포커스가 사라짐 | 원래 header를 unmount해 `captureReturnFocus`가 제거된 DOM을 가리킴 | header를 접근성에서도 숨긴 채 유지. 실제 `:focus` 복원, 초안/정렬/scrollTop200 함께 assertion |
| scroll 명령 성공처럼 보여도 실제 위치 0 | RN Web ref의 `scrollTo`와 DOM `{top}` 형식이 다름 | 캡처 도구가 DOM `scrollTop`을 설정하고 실제값을 검사. 도구 수정 전 로그와 실패를 구분 |
| 큰 글자에서 M 아바타가 고정 높이를 넘음 | 32px 고정 상자에 확대된 문자 | minWidth/minHeight로 보정 후 작은 폭+2배 재촬영 |
| 정책 전용 경로가 기존 기사 차단을 우회 | 새 화면에서 기존 moderation 접근 조건을 적용하지 않음 | 공통 정책과 같은 조회/실패/차단 guard 적용. 차단 fixture에서 본문/도구 미노출·복귀 회귀 추가 |
| 화면 요구에 세 번째 문단 밑줄 세부 누락 | 상위 관찰에 문단 시작만 기록 | R-S008-V에 추가하고 원본에서 보이는 `newsworthiness`만 밑줄 처리 |
| 새 policy ID를 저장해 일반 기사 route로 열 가능성 | 전용 화면과 catalog/detail fixture 연결이 함께 필요 | ID를 통일하고 Library 재열기에서 같은 본문·작성자·박수·응답 상태 확인 |
| 직접 열린 중첩 응답의 계정 수명 | ResponseButton 밖에서 여는 패널도 scope 경계 필요 | ResponsesPanel 자체에 scope/target key. A→B→A·같은 A revision 변경 시 입력·정렬 초기화 회귀 |
| 정책 안에서 듣기 시작 뒤 확장·닫기·재시도 접근 누락 | 기존 미니 플레이어는 부모 기사 화면에 있어 Responses 모달 아래 가려짐; 전용 정책 route에도 미연결 | [수정 전 실제 실패](MEDIUM_PARITY/EVIDENCE/PARITY_03/listening-before/failure.json)를 보존. 정책 안에 기존 미니 플레이어를 재사용해 시작/실패 재시도/확장/접기/닫기를 다시 검증 |

테스트 준비 과정의 중복 `Listen`/heading query, RNTL matcher 차이, AppState 기본값, 스크롤된 정렬 버튼의 viewport 기대값, 비 ASCII shell 입력 문제는 harness 오류로 구분했다. 실패한 시도를 성공 테스트 수에 합산하지 않았다. 늦은 외부 링크 실패·새 실패 재시도는 controlled Promise로 검증하고 navigation 자체는 mock하지 않았다.

## 남은 차이와 확인 대기

- **구현 잔여:** V21 원본 로고/아바타·서체·정확 여백/아이콘/count 크기와 응답 272. Q02/Q12 전체 완료 아님. 묶음 3의 잔여로 보존하고 최종 묶음 22에서 증거와 정책을 재대조한다.
- **미확인:** 정책 전문·현재 버전·실제 Medium의 도구 결과·복귀 시 state 보존·현재 공식 링크 내용. U-S008/U-F34/Q03에 유지한다. 실제 원본 정책 기사 여부와 mock 선택을 혼동하지 않는다.
- **다른 묶음:** S100/F30/V20 전체 시각 보정 10; 읽기 이력/Viewed·reader 범위 4; Listen 전체 12; 공유 전체 17; 관계 전체 5; 다운로드 8. 이번에 새로 미배정된 기능 요구는 없으며 세부 밑줄은 기존 R-S008-V/D08에 포함했다.
- **제품 선택:** 원본 272를 정적 배지로 둘지, 검증 가능한 독립 비교용 응답 fixture를 확보할지 후속 근거가 필요하다. 현재 앱에서는 실제 mock 응답 수 0/1과 버튼 결과를 일치시킨다. 정책 전문/프로필 내용을 임의 생성하는 방식은 채택하지 않았다.
- **플랫폼 대기:** 실제 iOS/Android Safe Area·키보드 가림/IME·VoiceOver/TalkBack·OS 글자 확대·native 모달/뒤로·공유/오디오. Windows JS export와 Jest iOS/Android project는 이 검증을 대체하지 않는다.

## 8081 최종 확인 순서

1. 새로고침 후 홈의 `ChatGPT Is Poisoning Your Brain...` 기사 또는 `/?previewLink=kostolany%3A%2F%2Farticle%2Fmedium-brain`로 진입한다.
2. Responses→shield `Medium policy`에서 제목·날짜·Medium/Follow·강조·도구를 확인한다. 아래로 스크롤해 발췌/mock 안내와 기존 공식 링크를 확인한다.
3. guest에서 Follow→로그인 닫기, 다시 Follow→모의 A 로그인. 원래 기사에서 Responses를 다시 열어 Most Recent와 한국어 초안을 입력한다. 목록을 스크롤한 뒤 Rules→뒤로에서 입력·정렬·위치·shield 포커스를 확인한다.
4. 정책에서 Follow→Following 옵션 닫기, 박수, 읽기 목록에 저장한다. 정책 Responses에 별도 응답을 작성하고 닫아 1 표시와 부모 기사 수가 분리되는지 확인한다.
5. 더보기→표시 설정→테마/글꼴/닫기, Share 열기/닫기, Listen 시작/일시정지를 확인한다. 모의 기능이며 실제 외부 효력은 없다.
6. Rules→Responses→기사→홈→Library→읽기 목록→Medium Rules로 다시 열어 저장·팔로우·반응이 유지되는지 확인한다.
7. 작성자 Medium 프로필을 열고 Back으로 기사에 복귀한다. 이 경로는 Responses를 닫으므로 초안을 보존하는 Rules 뒤로 경로와 다르다.

## 다음 요청의 정확한 범위

**묶음 4 — 읽기 설정·이력·발행 링크: D01·D03·D05·Q05·Q11·V12·V16.** 선행은 묶음 2다. S001/S045/S052/S063/S119/S125/S168/S190/S198, T-F12-03·F14-01/02·F15-01/02·F24-02~07 및 연결된 R/U/C를 직접 대조한다. 발행/일반 catalog 이력·Viewed·reader 설정·본문 링크의 늦은 실패, 문서 A→B→A, 알림/발행→본문→이력→재열기, 권한 철회와 Undo/읽기도구 범위를 검토한다. 새 정책 전용 기사 경로의 이력/reader 소비도 기존 요구와 대조하되 Q05의 미확인 근거를 완료로 처리하지 않는다. 구현→검증→원본 비교→재검토·수정·재검증 후 `TODO/FE_MEDIUM_PARITY_04_RESULT.md`에 기록한다. 이번 작업에서 착수하지 않았다.

<a id="additional-review"></a>

## 추가 재검토 — 화면 이동과 정책 응답 접근권

2026-11-23 추가 요청에 따른 자기 검토다. FRONT_AGENT의 화면 활성 여부와 mount 수명 구분, 입력 소유권·접근권 상실·늦은 응답 격리, 실제 navigation/브라우저 검증 규칙을 적용했다. 독립 리뷰는 수행하지 않았다. 최초 P3 manifest와 현재 코드의 일치를 확인한 뒤 [별도 preflight](MEDIUM_PARITY/EVIDENCE/PARITY_03_RECHECK/preflight.json)를 남기고 수정했다.

| 발견·재현 | 영향·원인 | 수정·수용 조건 |
| --- | --- | --- |
| Rules→Listen→플레이어 확장→더보기→View story | 새 정책 기사 route 위에 이전 Responses 모달이 남아 실제 웹 화면을 가림. navigation 자체는 이동했으나 mounted 상태인 원래 기사가 응답창에 route 활성 여부를 전달하지 않음 | 기존 active 값을 하단 Responses·본문 ResponsePreview·추천 기사 응답과 전용 정책 경로로 전달. 이탈하면 패널을 즉시 숨기고 소유자의 열림 상태를 종료. 원래 기사로 Back 후 모달이 되살아나지 않고 사용자가 다시 열 수 있어야 함 |
| 직접 연 정책 응답에서 정책 작성자 차단 또는 moderation 조회 실패 | 정책 본문 guard 밖의 형제 ResponsesPanel에 접근 조건이 없어 입력창과 초안이 남음 | 패널 자체에도 기존 기사 차단·조회 실패·정책 초기 조회 조건 적용. 접근 상실 시 내부 수명을 종료하고 소유자에게 닫기를 전달. 복구·재진입에서 이전 초안이 되살아나지 않아야 함 |

첫 결함은 [수정 전 실제 브라우저 실패](MEDIUM_PARITY/EVIDENCE/PARITY_03_RECHECK/navigation-before/failure.json)와 [실제 navigation 회귀 실패](MEDIUM_PARITY/EVIDENCE/PARITY_03_RECHECK/navigation-test-before.txt)로 재현했다. 두 번째는 실제 moderation store와 제어 가능한 source를 사용한 [조회 실패 회귀](MEDIUM_PARITY/EVIDENCE/PARITY_03_RECHECK/access-test-before.txt)로 재현했다. 두 번째의 오류/차단 전환은 브라우저나 실제 서버에서 유발한 증거가 아니다.

원래 Responses 안에서 Rules 뒤로 버튼만 누르는 경우는 route 이탈이 아니므로 초안·정렬·스크롤·포커스 보존 정책을 유지한다. View story로 새 route에 이동하면 응답창/초안을 닫는 것은 기존 작성자 프로필 이동과 같은 mock 수명 정책이며 Medium 원본에서 관찰한 결과로 간주하지 않는다. 정책 전용 화면의 비활성 메뉴·공유도 폐기한다. 새 저장소·전역 navigation·외부 연동은 추가하지 않았다.

대상 추적은 D08/V21, R-S008-C01/C03/C07, T-F34-02, C09/C14/C58~61/C71과 Q02/Q12다. 전체 flows 등록·링크·배정 검사는 63흐름/273단계/고유200화면, 59작업/22묶음, 분석 문서 로컬 링크915개를 다시 확인했으며 오류0이다. 전200화면의 동작을 새로 수행했다는 의미는 아니다. F34의 ANALYSIS와 보관 PNG를 다시 대조하고 헤더·본문·도구·발췌 안내의 남은 차이를 유지한다. 원본1179×2556px와 CP-WEB-01 논리 viewport/DPR1을 구분하며 원본 DPR·기기를 추정 확정하지 않는다.

원본 서체·로고/아바타·정확 간격·아이콘/숫자 크기·272 응답 재현, U-S008/U-F34, Q07 실제 기기 대기는 그대로다. 다음 묶음4의 범위는 위와 같고 시작하지 않았다. 아래 추가 실행 증거는 최초 P3 manifest를 덮어쓰지 않는 별도 폴더로 보관한다.

### 추가 실행 결과와 한계

| 검사 | 이번 재검토의 실제 결과 |
| --- | --- |
| 타입·lint | [frontend-review.txt](MEDIUM_PARITY/EVIDENCE/PARITY_03_RECHECK/frontend-review.txt), 각각 exit0 |
| 관련 회귀 | 같은 로그의 14 suites/70개 고유 테스트 대상. PolicyNavigation·ResponsesPanel·ReferenceArticleView·ModerationNavigation·DisplayNavigation·BookmarkNavigation의 12 suites/54개는 통과. ListeningNavigation 2 suites/16개 중 첫 실행은 11통과/5실패로 아래 별도 진단 수행 |
| 듣기 재실행 | [기본 제한 재실행](MEDIUM_PARITY/EVIDENCE/PARITY_03_RECHECK/listening-retry.txt): Android8 통과, iOS는 5초 시간초과 뒤 overlapping act/Missing auth 후속 실패. [실행 제한15초 진단](MEDIUM_PARITY/EVIDENCE/PARITY_03_RECHECK/listening-timeout-diagnostic.txt): 같은 소스의 iOS/Android 16개 모두 통과, 106.518초. 테스트 파일·기본 timeout 설정은 변경하지 않음 |
| 첫 수정 확인 | [targeted-first.txt](MEDIUM_PARITY/EVIDENCE/PARITY_03_RECHECK/targeted-first.txt): iOS 15개 중14통과/기존 계정 전환1개 5초 초과. 이후 위 frontend-review의 동일 계정 전환 사례는 기본 제한으로 통과. 첫 실행 실패도 보존 |
| 새 회귀 | 실제 navigation을 사용하는 Responses/본문 shield 두 진입→View story→Back→응답 재열기 2사례와 직접 정책 응답의 차단/조회 오류→초안 폐기→복구 2사례. iOS/Android 각각 실행. 입력·뒤로·계정 전환·늦은 응답·저장·표시·차단 공통 회귀도 함께 실행 |

듣기 기본5초 실행의 안정성은 이번에 보장하지 않는다. 실행 당시 별도 작업의 테스트 프로세스가 병행 중인 것은 확인했지만 부하가 유일한 원인이라고 확정하지 않는다. 15초 진단의 통과를 기본 검사 일괄 통과나 기기 성능의 증거로 바꾸지 않는다. 묶음12/C58~61의 후속 검토에서는 해당 로그를 근거로 테스트 수명·제한·실행 부하를 함께 확인한다. 이번에는 해당 기능의 정책이나 테스트 제한을 영구 변경하지 않았다. 최초 P3 전체1,460개 테스트를 이번 코드에서 다시 실행하지 않았다.

| 추가 증거 | 실제 결과·범위 |
| --- | --- |
| route 이동/복귀 | [navigation-final](MEDIUM_PARITY/EVIDENCE/PARITY_03_RECHECK/navigation-final/captures.json): 10상태/assertion8, 하단 Responses와 본문 shield에서 정책→플레이어→View story→원래 기사 복귀. 이전 모달 미노출·재진입 확인 |
| 기존 연결 회귀 | [flow](MEDIUM_PARITY/EVIDENCE/PARITY_03_RECHECK/flow/captures.json): 22상태/assertion19, 로그인 취소/성공·긴 한국어 초안·정렬·scrollTop200·포커스 복귀·팔로우/박수/저장/별도 응답·공유·Library 재열기 |
| 작은 화면/큰 글자 | [320×568](MEDIUM_PARITY/EVIDENCE/PARITY_03_RECHECK/small/captures.json), [320×568 CSS2배](MEDIUM_PARITY/EVIDENCE/PARITY_03_RECHECK/large/captures.json), 각각7상태/assertion8. 스크롤 끝 링크·48px 조작점·팝오버·닫기/포커스 확인. OS 글자 확대·IME·native Safe Area 검증 아님 |
| 채택 브라우저 합계 | 현재 FE 코드로 **4회/46 PNG/assertion43, console/runtime error0**. CP-WEB-01의 fixture·모의 A/guest·고정 시간/UTC·DPR1 조건이며 각 로그에 기록 |
| 도구/문서 | [tool-checks](MEDIUM_PARITY/EVIDENCE/PARITY_03_RECHECK/tool-checks.txt): 비교 기준 생성/검사·전수 목록/배정·기존 P3 archive·Python20검사·Node 문법·diff 공백 검사 exit0. baseline의 previousReviews에 최초 P3 연결을 보존하고 latestReview는 이번 실행에 연결 |
| 보존 | [preservation](MEDIUM_PARITY/EVIDENCE/PARITY_03_RECHECK/preservation.json): 원본 medium382파일 바이트 해시·기존 P3 manifest·HEAD 동일, staging 없음. 이번 수정 파일은 별도 목록으로 기록. ENV 수정과 8081 재시작을 수행하지 않음 |

브라우저 [navigation 첫 시도](MEDIUM_PARITY/EVIDENCE/PARITY_03_RECHECK/navigation/failure.json)는 본문 shield에서 돌아온 뒤에도 상단 헤더가 보여야 한다는 잘못된 진단 기대값 때문에 마지막 assertion에 실패했다. 본문 스크롤 위치를 보존하면 기존 `chromeHidden` 정책이 상단 헤더를 숨기는 것이 맞다. 제품 코드를 변경하지 않고 원래 본문 shield와 이전 모달 부재를 검사하도록 수정한 후 `navigation-final`을 다시 실행했다. 실패한9캡처·중간 `navigation-after`7캡처는 채택46개에 합산하지 않는다. 캡처 이미지는 가공하지 않았으며 F34 원본 두 PNG와 현재 S008/S100을 직접 보았다. V21 및 부모 S100의 글자·간격·수치 차이는 미완료로 유지한다.

8081의 추가 재현 순서는 다음과 같다.

1. 원래 ChatGPT 기사→Responses→Medium policy→Follow→모의 A 로그인 후 정책을 다시 연다.
2. Listen→미니 플레이어 확장→더보기→View story를 누른다. 정책 기사 자체 route의 뒤로 버튼이 보이고 이전 Responses가 화면을 가리지 않아야 한다.
3. 뒤로에서 원래 기사로 돌아오면 응답 모달이 없어야 한다. Responses를 다시 열 수 있어야 한다.
4. 원래 기사의 본문 아래 shield에서도 같은 경로를 실행한다. Back 후 기존 본문 스크롤 위치에 복귀하며 모달이 없어야 한다. 이 위치에서는 원래 스크롤 정책에 따라 상단 헤더가 숨겨질 수 있다.
5. 별도로 초안·정렬을 바꾸고 Rules의 뒤로 버튼만 눌러 원래 Responses로 돌아오면 초안·정렬·스크롤·포커스를 유지해야 한다. 차단/조회 오류의 강제 전환은 위 자동 회귀 로그로 구분한다.

[이번 Android/iOS JS export](MEDIUM_PARITY/EVIDENCE/PARITY_03_RECHECK/js-exports.txt)는 모두 exit0이다. 실제 기기 빌드·설치·OS 입력/스크린리더 검증은 수행하지 않았으며 앞서 기록한 Windows/SDK·기기 환경의 한계를 유지한다. 외부 서비스와 새 기능은 연결하지 않았고 커밋·push·배포도 하지 않았다.

[추가 검토 manifest](MEDIUM_PARITY/EVIDENCE/PARITY_03_RECHECK/evidence-manifest.json)는 채택한4회 실행과 현재 sourceFiles를 연결한다. 최초 P3 및 이번의 수정 전/실패/중간 캡처는 현재 성공 증거로 승격하지 않는다. `navigation-after`는 첫 수정 직후의 진단이며 최종 공유 수명 보완 전이다. 기본 제한에서 실패한 테스트 로그도 삭제하지 않는다. 새 증거·도구가 Git ignore 대상이 아님을 확인하며 staging은 하지 않는다.

```powershell
python -X utf8 tools/medium-parity/buildBaseline.py --check
python -X utf8 tools/medium-parity/verifyParity03.py --inventory
python -X utf8 tools/medium-parity/verifyParity03.py
python -X utf8 tools/medium-parity/verifyParity02.py --evidence=TODO/MEDIUM_PARITY/EVIDENCE/PARITY_03_RECHECK --check-code
```

마지막 명령은 기존 공통 증거 검사기를 새 폴더에 적용한다. 이후 코드가 바뀌면 `--check-code`를 제외해 보관 무결성만 확인한다. 이번 추가 검토도 D08 관련 결함 수정과 제한된 회귀 확인이며 앱 전체 무결함·원본 동일성·출시 완료 판정은 아니다.
