# Parity 2 — 공통 UI 보정과 자체 UI 처리 기준

**사용자 요청 추가 재검토:** 메뉴 닫기 후 포커스 복귀 결함과 증거 검사기의 누락을 추가로 찾아 수정했다. [추가 재검토 결과](#additional-review)의 현재 검증·32개 새 캡처를 따른다. 아래 최초 실행의53캡처·82테스트·코드 해시는 당시 근거로 보존하며 현재 수정 결과를 대신하지 않는다.

2026-11-23 KST, Windows. 시작 HEAD `d7dd712`, 시작 작업 트리 clean. **이번 공통 보정·Q12 처리 기준·재검토 완료 / Q02·Q12의 화면별 잔여 미완료 / 실제 네이티브 검증 대기.** 묶음3 이후는 시작하지 않았다. 커밋·push·배포하지 않았다.

## 범위와 기준

[실행 계획 묶음2](MEDIUM_PARITY/EXECUTION_PLAN.md#batch-02), [비교 프로토콜](MEDIUM_PARITY/COMPARISON_PROTOCOL.md), [자산 기준](MEDIUM_PARITY/ASSET_BASELINE.md), [Parity 1 결과](FE_MEDIUM_PARITY_01_RESULT.md), Goal53/후속/백엔드 인계의 경계를 확인했다. AGENT 공통·UX 규칙과 FRONT_AGENT README/하위6개를 적용했다. 실제 FE 코드·원본 PNG·관련 ANALYSIS와 R/T/U/C를 대조했고 과거 검증 수치는 이번 결과로 사용하지 않았다.

비교는 CP-WEB-01, HeadlessChrome148/Windows, 390×844 CSS px, DSF1, UTC/en-US, JS Date `2025-06-13T12:00:00Z`, fresh guest, 동일 기존 fixture와 실제 navigation이다. 원본 PNG1179×2556과 논리 화면 크기를 구분했다. 원본 기기/DPR/계정/촬영시각은 미확인이다. 원본을 crop·정규화·재압축하거나 OS 영역을 합성하지 않았고, 픽셀 유사도 임계값을 만들지 않았다. 전후 앱 조건은 같지만 원본의 반응 집계·계정까지 일치한 것은 아니다.

## 대상별 변경과 판정

| 대상 | 변경·판정 | 종료 상태 |
| --- | --- | --- |
| Q02 서체·줄바꿈 | 원본 font 파일/weight 매핑 미확보를 유지. Windows CDP에서 영어 제목 Arial Bold, 설정 Arial, 한국어 프로필 Malgun Gothic Bold를 확인. 기존 플랫폼별 대체 폰트 유지. 표시 설정 A의 상대 크기·행간·숫자 색과 가운데 열 분리 보정 | 대체 서체 확인·해당 구획 보정 완료; 전체 타이포 일치 미완료 |
| Q02 아이콘 | 표시 설정의 `⌃⌄` 문자 대신 기존 SVG `select`14 사용. 아이콘은 장식이고 부모 버튼의 접근성 이름·선택 상태 유지. 작은/큰 A와 토글의 터치 대상은 최소48, SVG 가시 크기와 구별 | 해당 컨트롤 보정 완료; 전체 SVG 원본 동일성 미확인 |
| Q02 이미지 | `AspectImage`가 실제 부모 폭으로 비율을 계산. 원문 커버·본문 삽입 이미지에 적용. 정상390에서 커버342×228, 320에서272×약181.33; viewport 기반 높이와 실제 내용 폭의 불일치 제거 | 공통 비율 처리 완료; 81개 crop 전체 재촬영/독립 원본 자산 확보 아님 |
| Q02 공통 스크롤 | 모바일 웹 폭600 이하에서 스크롤바 gutter를 제거해 콘텐츠 폭 확보. 스크롤 동작 유지, 데스크톱 폭600 초과/네이티브는 기존 동작. `PreviewLayout.web`를 App에서 연결 | 선택한 홈·탐색·기사·설정·프로필·모달 흐름 확인; 전200화면 확인 아님 |
| Q02 팝오버 | `getPopoverFrame`으로 좌우 Safe Area와8px 여유, 짧은 높이에서 최소 한 행 공간과 내부 스크롤 보장. 기본390의 요청 위치/폭 유지. 320과390×240에서 실제 메뉴 조작 | 공통 계산/대표 사용처 완료; 실제 notch/OS 확대/스크린리더 대기 |
| Q12 | [상태별 노출·비교 처리 기준](MEDIUM_PARITY/OWN_UI_POLICY.md) 작성. A 재개 표시/B 미표시, Stories의 Drafts/Lists 미표시, 설정·멤버십·읽기 도구의 열린/닫힌 상태를 실행 | 처리 기준 완료; 모든 자체 UI의 배치 보정은 각 담당 묶음 잔여 |

정상 fixture·공급부·계정/인증 revision·개인 데이터 정책은 수정하지 않았다. 폰트 패키지·의존성·원본 PNG·자산 파일도 변경하지 않았다. 반복 촬영용 시계/글자 확대는 별도 비교 브라우저에만 적용된다. 공유 상태·외부 API·제품 기능 추가는 없다.

## 요구사항 추적

이번 검증은 다음 화면의 공통 표현에 한정한다. 각 화면의 R 전체 완료 또는 같은 화면으로 연결된 모든 T 흐름 실행을 뜻하지 않는다. 각 S의 세부 R과 U 질문은 [200화면 조건](MEDIUM_PARITY/COMPARISON_BASELINE.md)에 원문 연결을 유지한다.

| 화면 | 이번 직접 대조·실행 범위 | 잔여 담당 |
| --- | --- | --- |
| S069 | R-S069-L/D/S/C10~C13/V, 홈→탐색; 원본의 카드·탭·하단 메뉴와 폭 대조 | 묶음17/V01, U-S069와 연결 U-F |
| S021/S004 | R-S021-L/D/S/C01, R-S004-L/D/S/C01~C03, T-F01-02·T-F02-01/02; 탐색→검색 | 묶음17/V02, U-S021/U-S004/U-F01/U-F02 |
| S037 | R-S037-L/D/S/C02, T-F24-01; 기사 상단→더보기, 커버 비율 | 묶음10/V13; 기타 듣기/Follow/반응/공유 T 전체 미실행 |
| S168 | R-S168-L/D/S/C02, T-F24-02; 메뉴→표시 설정 | 묶음4/V16; 다른 메뉴 행동 전체 미실행 |
| S063/S125 | 각 R-L/D/S와 A/Font/Appearance/토글 컨트롤, T-F24-03/04;100→120%·글꼴/테마 진입 구조 | 묶음4/V16, U-S063/U-S125/U-F24; 실제 폰트 목록 원본 미수록 |
| S119/S198/S001 | 각 R-L/D/S와 테마/토글 컨트롤, T-F24-05/06/07; System→Dark·타인 강조 on→off | 묶음4/V16, 각 U-S/U-F24; 본인 강조 삭제/계정 동기화 검증 아님 |

직접 배정 C01/C02/C03은 서체·색·토글·터치·팝오버·큰 글자 진단의 해당 부분만 검증했다. C09는 기사 자체 도구, C53은 프로필 탭/재개/초안 노출, C65/C67은 모의 멤버십/설정 노출을 확인했다. C36·C58~C61·C66의 다운로드·오디오·권한 전체 동작은 Q12 기준 적용 대상으로만 남겼으며, C71 실제 OS 동작은 묶음21/Q07 대기다. 동일 C를 참조한다고 전체 계약을 완료 처리하지 않는다.

## 현재 전후 캡처와 원본 대조

채택 증거는 [manifest](MEDIUM_PARITY/EVIDENCE/PARITY_02/evidence-manifest.json)에 파일·SHA-256·촬영 조건·실행 시각·최종 코드 해시를 보관한다. before는 이번 시작 코드, review는 최종 코드에서 다시 촬영했다. Parity 1의10장이나 Goal53의200장을 이번 촬영으로 합산하지 않았다. 아래10개 원본 PNG를 직접 열고 해당 구현 캡처와 비교했다.

| 원본·조건 | 이번 수정 전 | 최종 수정 후 | 관찰·남은 차이 |
| --- | --- | --- | --- |
| [S069](MEDIUM_PARITY/COMPARISON_BASELINE.md#s069) | [before](MEDIUM_PARITY/EVIDENCE/PARITY_02/before/S069.png) | [review](MEDIUM_PARITY/EVIDENCE/PARITY_02/review/S069.png) | scrollbar 제거·폭 복원. 원본 응답1.3K/529 대비0, 서체·세로 간격·placeholder 잔여 |
| [S021](MEDIUM_PARITY/COMPARISON_BASELINE.md#s021) | [before](MEDIUM_PARITY/EVIDENCE/PARITY_02/before/S021.png) | [review](MEDIUM_PARITY/EVIDENCE/PARITY_02/review/S021.png) | Trending/가로 칩/작성 버튼 확인. 폰트·행간·OS 영역 차이 |
| [S004](MEDIUM_PARITY/COMPARISON_BASELINE.md#s004) | [before](MEDIUM_PARITY/EVIDENCE/PARITY_02/before/S004.png) | [review](MEDIUM_PARITY/EVIDENCE/PARITY_02/review/S004.png) | 빈 검색·토픽 목록. focus 밑줄·추가 한국어 토픽·아이콘 가시 크기 잔여 |
| [S037](MEDIUM_PARITY/COMPARISON_BASELINE.md#s037) | [before](MEDIUM_PARITY/EVIDENCE/PARITY_02/before/S037.png) | [review](MEDIUM_PARITY/EVIDENCE/PARITY_02/review/S037.png) | 본문 폭327→342, 커버 비율1.5. 원본834/현재7 응답, 폰트·간격·OS 바 차이 |
| [S168](MEDIUM_PARITY/COMPARISON_BASELINE.md#s168) | [before](MEDIUM_PARITY/EVIDENCE/PARITY_02/before/S168.png) | [review](MEDIUM_PARITY/EVIDENCE/PARITY_02/review/S168.png) | 더보기5행·팝오버 진입/닫기. 행/그림자/정확 좌표 잔여 |
| [S063](MEDIUM_PARITY/COMPARISON_BASELINE.md#s063) | [before](MEDIUM_PARITY/EVIDENCE/PARITY_02/before/S063.png) | [review](MEDIUM_PARITY/EVIDENCE/PARITY_02/review/S063.png) | 100% 가운데 열 양쪽 선·회색 숫자·SVG 선택 표시. 원본 font/OS 토글 렌더와 다름 |
| [S125](MEDIUM_PARITY/COMPARISON_BASELINE.md#s125) | [before](MEDIUM_PARITY/EVIDENCE/PARITY_02/before/S125.png) | [review](MEDIUM_PARITY/EVIDENCE/PARITY_02/review/S125.png) | 120% 적용·배경 줄바꿈·폭 개선. Q09 과거 문구 판정과 실제 시각 잔여를 구분 |
| [S119](MEDIUM_PARITY/COMPARISON_BASELINE.md#s119) | [before](MEDIUM_PARITY/EVIDENCE/PARITY_02/before/S119.png) | [review](MEDIUM_PARITY/EVIDENCE/PARITY_02/review/S119.png) | System 체크·3항목. 원본 행 구분/흐림·선택 메뉴 위치와 차이; 큰 글자 동적 anchor는 묶음4 |
| [S198](MEDIUM_PARITY/COMPARISON_BASELINE.md#s198) | [before](MEDIUM_PARITY/EVIDENCE/PARITY_02/before/S198.png) | [review](MEDIUM_PARITY/EVIDENCE/PARITY_02/review/S198.png) | Dark·120%·on 확인, 흰 웹 scrollbar 없어짐. 서체/색공간/집계 차이 유지 |
| [S001](MEDIUM_PARITY/COMPARISON_BASELINE.md#s001) | [before](MEDIUM_PARITY/EVIDENCE/PARITY_02/before/S001.png) | [review](MEDIUM_PARITY/EVIDENCE/PARITY_02/review/S001.png) | aria-checked=false와 off 토글 확인. 원본 switch 크기·회색/흰 손잡이 렌더 차이 |

전후의 동일 fixture는 우리 앱의 조건을 뜻한다. 이10개는 원본 동일성 통과/비교 준비 전체 완료가 아니다. 가시적인 OS 상하단 영역 차이를 CSS 공백으로 위장하지 않았다.

## 실행 검증

| 검사 | 이번 결과·증거 |
| --- | --- |
| FE 타입 검사·lint | 최종 둘 다 exit0, [로그](MEDIUM_PARITY/EVIDENCE/PARITY_02/checks.txt) |
| 관련 Jest | getPopoverFrame/ReferenceArticleView/SettingsScreen/DisplayNavigation/ProfileScreen: iOS·Android 설정 합계10 suites/60 tests,83.5초 |
| 공통 소비자 추가 회귀 | FollowControl/ResponsesPanel/RecommendationsNavigation:6 suites/22 tests,47.906초, [로그](MEDIUM_PARITY/EVIDENCE/PARITY_02/shared-checks.txt) |
| 새 회귀 | 짧은 높이·좌우 inset·기본 프레임3케이스×2플랫폼. 브라우저는 이미지 비율·가시 터치 크기·선택 속성을 직접 검사 |
| 브라우저 | 전후20장 + 작은 폭6장 + CSS확대6장 + 자체 UI13장 + B/응답 메뉴4장 + 짧은 높이4장 =53장.7회 모두 completed, console/runtime error0. DOM assertion47건 중9건은 before |
| 작은 화면 | [320×568](MEDIUM_PARITY/EVIDENCE/PARITY_02/small/captures.json): 이미지 비율·48px 대상·테마 선택·Escape2회·긴 한국어 검색 |
| 큰 글자 | [CSS2배](MEDIUM_PARITY/EVIDENCE/PARITY_02/large-text/captures.json): 제목64px와 설정 숫자28px 확인, 줄바꿈/토글/닫기 조작. RN fontScale와 실제 OS 접근성 확대 아님 |
| 짧은 높이 | [390×240](MEDIUM_PARITY/EVIDENCE/PARITY_02/short/captures.json): 메뉴 내부 스크롤→Dark 선택→Escape 닫기 |
| 자체 UI/다른 사용처 | [A/guest13상태](MEDIUM_PARITY/EVIDENCE/PARITY_02/own-ui/captures.json), [B 프로필/Lists·응답 메뉴4상태](MEDIUM_PARITY/EVIDENCE/PARITY_02/shared/captures.json) |
| 플랫폼 번들 | [Android/iOS JS/Hermes export](MEDIUM_PARITY/EVIDENCE/PARITY_02/js-export.txt) exit0. 실제 native 빌드·설치·기기 실행이 아님 |
| 기준/도구/증거 | [도구 검증 로그](MEDIUM_PARITY/EVIDENCE/PARITY_02/tools-checks.txt). 생성물 drift·기존14개 회귀·Node 문법·증거 해시/누락/위조 검사를 수행 |

전체 Jest는 실행하지 않았다. 변경 영향8개 테스트 파일을 iOS·Android Jest 설정으로 실행했다. 이 설정을 네이티브 기기 실행으로 표현하지 않는다. 테스트 로그의 PowerShell `NativeCommandError` 포맷은 Jest가 stderr에 PASS를 출력해 감싼 부분이며 최종 exit0/16 suites82 tests가 실제 결과다. Expo의 NO_COLOR/FORCE_COLOR 경고는 보존했다.

기존8081 Metro PID29280을 종료·재시작하지 않았다. 비교용 Chromium은 별도 임시 프로필이며 사용자의 브라우저 세션을 변경하지 않았다. mock 인증/멤버십 선택은 이 브라우저의 메모리 안에서만 수행했다. 장애 재현용 제품 기본값 변경은 없다.

## 구현 후 재검토와 수정

첫 구현 이후 같은 에이전트가 diff·공통 소비자·테스트·PNG·요구사항·문서를 다시 읽었다. 별도 독립 리뷰나 전200화면 리뷰를 수행했다고 주장하지 않는다.

| 발견 | 수정·재검증 |
| --- | --- |
| 첫 이미지 수정에서 RN web의 intrinsic 높이가 남아 커버가 과도하게 커짐 | 부모 비율 View와 내부 absolute Image로 수정. 최종390/320의 실제 비율 assertion·원본 대조·관련 테스트 통과 |
| `StyleSheet.absoluteFillObject`가 현재 RN 타입에 없음 | 명시적 position/top/left/width/height로 수정. 최종 타입/lint·관련60건·두 JS export 통과 |
| 큰 글자 도구가 heading 태그를 누락 | h1~h6 등 포함, 제목32→64px assertion 추가. 이전 부분 확대 캡처를 최종 증거에서 제외하고 재촬영 |
| 스크롤 직후 읽기 도구 닫기 click 좌표가 헤더 변화와 어긋남 | 스크롤 후 레이아웃 대기·elementFromPoint 가림 검사를 추가. 실제 열기/닫기 재실행 통과 |
| B 로그인 대기 문구가 프로필 로딩 완료를 보장하지 않음 | 사용자 이름 대신 프로필 준비 문구/실제 컨트롤을 확인. B의 재개 미표시·탭별 Drafts 노출 재검증 |
| 처음 테스트 파일명/캡처 selector·기대 membership 상태가 잘못됨 | 실제 경로/label·A의 초기 Member/선택 가능한 Friend로 시나리오 수정. 실패 실행은 채택 수에 포함하지 않음 |
| 최신 baseline에서 P1 캡처가 현재 코드의 증거처럼 읽힐 위험 | P1 증거/해시는 보존하고 historical 표기, P2 별도 manifest 연결. 코드 해시에 빠져 있던 FE/App.tsx 포함 |
| 증거 보관 과정의 readiness 허용값·로그 인코딩 누락 | 과거 상태 enum을 검증기에 추가하고 생성물/14개 회귀 재검사. PowerShell UTF-16/혼합 로그를 메시지 변경 없이 UTF-8/LF로 정규화해 Git 체크아웃 해시 검증 가능하게 보관 |
| 공통 변경이 다른 팝오버에 영향을 줄 가능성 | 320 응답 메뉴 실제 열기/닫기, Follow/Responses/추천 navigation22건 추가 확인 |

채택 전후·회귀 PNG/로그는 Git 제외 대상이 아닌 `TODO/MEDIUM_PARITY/EVIDENCE/PARITY_02/`에 보관한다. `verifyParity02.py`는 PNG raw hash, 텍스트 LF/BOM 정규화 hash, 파일 목록·완료 상태·요청/촬영 ID·viewport를 검사한다. `--check-code`는 당시 최종 코드와 현재 코드 일치까지 검사한다. 이후 개발로 코드가 바뀐 checkout에서는 기본 검증으로 보관 증거 자체를 확인하고, 코드 drift를 과거 실행 실패로 오해하지 않는다.

## 남은 차이·미확인·플랫폼 대기

- **미완료:** Q02/Q12의 모든 화면 소비자. 원본 font/vector, 전체 crop 렌더, 정확 간격/그림자/아이콘·토글 형태, 집계·추가 토픽/placeholder, 자체 UI의 기능별 배치 차이. 이 결과를 공통 전체 동일성 완료로 쓰지 않는다.
- **후속 기능별 확인:** 작성 글·About 웹사이트·Rules·듣기 안내는 이번 코드 조건 확인만 수행했다. 실제 상태별 촬영/보정은 OWN_UI_POLICY의 담당 묶음이 수행한다. CSS2배의 반응 바 아이콘/숫자 간격과 nested picker의 고정 anchor 차이는 기사/읽기 담당 묶음10/4에 남긴다.
- **미확인:** 원본 실제 폰트/기기/DPR/계정/시각/허용 오차, Font family 전체 옵션·크기 경계·동기화·기능 범위. 기존 대체값과 자체 UI 유지 기준은 Medium 확정 정책이 아니다.
- **플랫폼 대기:** Windows에서 iOS Xcode 실행 불가, 현재 PATH에 adb/xcodebuild 없음. 실제 iOS/Android 기기·OS 큰 글자·VoiceOver/TalkBack·키보드 가림·한국어 IME 조합·notch/Safe Area 검증은 Q07/묶음21에 유지한다. CDP 텍스트 삽입은 실제 IME 검증이 아니다.
- **기존 경계:** Q08 실제 백엔드·DB·OAuth·결제·AI·음성 서비스 제외. Q09는 과거 문구 판정만 완료이며 S125 등 시각 잔여 별도. Q10 최종 통합 판정은 묶음22다.

## 8081 수동 확인 순서

1. `http://localhost:8081`을 새 탭/새로고침으로 열고 홈→탐색→검색. 390폭과320폭에서 세로/가로 스크롤·뒤로·긴 한국어 입력을 확인한다.
2. `http://localhost:8081/?previewLink=kostolany%3A%2F%2Farticle%2Fmedium-brain`으로 원문 상단을 연다. 제목·부제·커버 비율·스크롤을 확인한다.
3. Story options→Display settings→큰 A(120%)→Appearance→Dark→Highlights off. 선택 표시와 배경,48px 조작 대상, Escape 또는 바깥 영역 닫기를 확인한다.
4. 기사 아래 Reading tools를 펼쳐 수준 UI를 확인하고 다시 접는다. 응답 더보기 메뉴도 열고 닫는다.
5. 새로고침→프로필→모의 로그인 A→Continue setup 열기/닫기→Drafts 열기/닫기→설정→기본 설명 수준 열기/취소→Membership and payment→Friend 모의 선택/성공/Welcome.
6. 새로고침 후 모의 로그인에서 B를 선택한다. Continue setup 미표시와 Stories/Lists의 Drafts 노출 차이를 확인한다. 각 선택은 로컬 mock이며 실제 계정/결제와 연결되지 않는다.

재현 명령은 저장소 루트에서 `node tools/medium-parity/capturePreview.mjs --browser=<기존 Chromium 경로> --out=<새 빈 폴더>`다. 기본10장은 previewScenarios, 자체 UI/작은 폭/짧은 높이는 parity02*Scenarios를 `--scenarios=`로 지정한다. `--viewport=320x568`, `--viewport=390x240`, `--text-scale=2`는 각각 별도 진단 조건이다. 출력 폴더가 차 있으면 도구가 덮어쓰기를 거부한다.

<a id="additional-review"></a>

## 사용자 요청에 따른 추가 재검토 — 2026-11-23

이번에는 수정 diff와 공통 소비자를 다시 읽고 작은 폭+큰 글자의 동시 조건, 넓은 화면, 키보드 포커스 복귀, 증거 검사기의 거짓 통과 가능성을 확인했다. 같은 에이전트의 재검토이며 별도 독립 리뷰는 아니다. 최초53개 캡처와 manifest는 변경하지 않았다.

### 추가로 발견한 문제와 수정

| 발견·재현 | 원인과 수정 | 현재 판정 |
| --- | --- | --- |
| 테마 메뉴에서 Escape 후 Appearance 버튼 대신 표시 설정의 닫기 영역에 포커스가 남음 | 모달이 열린 뒤에는 최초 진입 포커스를 잃을 수 있었다. `TopPopover`가 포털 mount 전에 기존 `captureReturnFocus`로 진입 대상을 기억하고 종료 후 복귀하도록 보정 | 테마 취소/선택·글꼴 Tab→Tab→Enter 선택 후 원래 버튼 복귀 확인 |
| 응답 메뉴에서 Escape 후 화면 밖 기사 제목에 포커스가 이동함 | 동일 공통 팝오버 문제. [수정 전 실패 로그](MEDIUM_PARITY/EVIDENCE/PARITY_02_RECHECK/response-before/failure.json)를 보존하고 공통 복귀 처리 적용 | [수정 후](MEDIUM_PARITY/EVIDENCE/PARITY_02_RECHECK/focus-final/Q12-response-closed.png) Bérnie 응답 메뉴 버튼에 포커스 복귀 |
| Story options→표시 설정→닫기에서 중간 진입 버튼이 사라져 기사 제목으로 복귀함 | 두 메뉴 사이에 원래 메뉴 항목이 unmount된다. `ReferenceArticleView`가 기존 `useReturnFocus`로 전체 메뉴 연쇄의 최초 Story options 버튼을 기억 | Escape·바깥 닫기·더보기 단독 닫기 후 Story options 복귀 확인 |
| 캡처 시계를2000년으로 바꾸거나 선언한 화면 크기를 바꿔도 도구가 수용함 | PNG↔snapshot 크기만 검사하고 비교 프로필의 시계/DPR/시간대·run viewport를 확인하지 않았다. 일치 조건을 추가 | 실제 보관53개는 새 조건에도 통과; 잘못된 조건은 회귀에서 거부 |
| 빈 촬영 목록과 sourceFiles 기록 누락을 수용함 | 요청/촬영 목록의 단순 동등 비교 및 기록된 파일의 해시만 확인했다. 비어 있음·중복·오류 이벤트·assertion 누락과 현재 소스 목록의 추가/삭제를 검사 | 새 파일·빠진 기록·숨겨진 콘솔 오류·빈/중복 목록 거부 |
| `--write`로 기존 manifest의 촬영 증거에 현재 코드 해시를 다시 붙일 수 있음 | 기존 manifest 덮어쓰기를 금지하고 새 검토는 별도 evidence 폴더에서 기록. Git ignore 검사 자체 실패도 오류로 처리 | 과거53개/525개 소스 기록은 그대로 보존; 새 결과는 별도 manifest |

수정 전 테마 포커스 [실패 로그](MEDIUM_PARITY/EVIDENCE/PARITY_02_RECHECK/focus-before/failure.json)와 [검사기 거짓 통과 재현](MEDIUM_PARITY/EVIDENCE/PARITY_02_RECHECK/validator-before.txt)을 보관했다. 검사기 재현은 메모리의 로그/manifest 사본만 바꿨고 기존 파일을 조작하지 않았다. 제품 수정은 공통 팝오버와 원문 기사의 포커스 복귀에 한정된다. 첫 시도의 표시 설정 전용 보정은 공통 처리로 통합했으며 최종 `ArticleDisplayPopover`는 최초 Parity 2 구현과 같다.

최초 증거의 파일 해시는 정상이다. 조건 검사의 결함은 새 manifest를 만들기 전에 잘못된 기록을 거부하는 조건이 부족했다는 뜻이며, 이미 고정된 manifest의 해시 검사를 우회했다는 뜻은 아니다. 현재 코드 일치 검사는 소스 목록 자체도 확인하도록 강화했다.

### 이번에 새로 실행한 검증

| 범위 | 이번 결과 |
| --- | --- |
| 타입·lint·관련 FE 회귀 | [최종 로그](MEDIUM_PARITY/EVIDENCE/PARITY_02_RECHECK/frontend-final.txt): 타입/lint exit0, ReferenceArticleView·DisplayNavigation·FollowControl·ResponsesPanel·RecommendationsNavigation의10 suites/30 tests,66.956초. iOS/Android Jest 설정이며 기기 실행 아님 |
| 도구 회귀 | [검사 로그](MEDIUM_PARITY/EVIDENCE/PARITY_02_RECHECK/tool-checks.txt): 기존14개+새6개. 조건 drift·오류 이벤트·빈/중복 촬영·소스 추가/누락·manifest 보존 검증 |
| 포커스·키보드 | [시나리오](../tools/medium-parity/parity02FocusScenarios.json), [최종10상태](MEDIUM_PARITY/EVIDENCE/PARITY_02_RECHECK/focus-final/captures.json). Tab·Enter·Escape·바깥 영역 닫기 후 실제 `:focus`의 aria-label 검사 |
| 정상 원본 비교 흐름 | [새10캡처](MEDIUM_PARITY/EVIDENCE/PARITY_02_RECHECK/standard-final/captures.json). 최초 구현 캡처와9개 PNG 해시 동일, S037은 작성자 아바타 가장자리2픽셀 차이. 제목·이미지·팝오버 배치와 원본 차이 잔여 유지. 이는 이전 구현과의 회귀 비교이며 원본 동일성 점수가 아님 |
| 작은 폭+큰 글자 | [320×568/CSS2배6상태](MEDIUM_PARITY/EVIDENCE/PARITY_02_RECHECK/small-large-final/captures.json). 두 조건을 함께 적용해 제목64px·커버 비율·팝오버·토글·닫기·긴 한국어 검색 확인 |
| 넓은 화면 | [1280×844/6상태](MEDIUM_PARITY/EVIDENCE/PARITY_02_RECHECK/wide-final/captures.json). 본문 최대680px와 커버 비율·팝오버·닫기·검색 확인, 데스크톱 scrollbar 유지 |
| 플랫폼 번들 | [새 Android/iOS JS export](MEDIUM_PARITY/EVIDENCE/PARITY_02_RECHECK/js-export.txt) 모두 exit0. 실제 native 빌드·기기 실행 아님 |
| 증거 | 새 성공32캡처/4회, DOM assertion35건, console/runtime error0. 별도 실패 재현2회/각1캡처는 성공 수에 합산하지 않음. [추가 검토 manifest](MEDIUM_PARITY/EVIDENCE/PARITY_02_RECHECK/evidence-manifest.json)로 로그·PNG·현재 코드 해시를 보관 |

보강한 `verifyParity02.py`의 기본 호출은 최초 증거 자체를 검증한다. 최초 manifest에 `--check-code`를 사용하면 이번 수정 때문에 코드 drift가 검출되는 것이 정상이다. 과거 해시를 현재 값으로 갱신해 통과시키지 않는다. 현재 재검토 증거는 다음 명령으로 검사한다.

```text
python -X utf8 tools/medium-parity/verifyParity02.py --evidence=TODO/MEDIUM_PARITY/EVIDENCE/PARITY_02_RECHECK --check-code
```

새 캡처를 보관할 때만 새 빈 evidence 폴더와 `--phases=<실행 폴더 이름들> --write`를 사용한다. 기존 manifest에는 `--write`를 반복하지 않는다. 현재 캡처 검사는 source 목록과 해시를 모두 확인하지만 실제 native 접근성 검증을 대신하지 않는다.

**이번 추가 발견은 수정·재검증 완료다.** 원본 서체·자산·정확 간격과 Q02/Q12 기능별 잔여, CSS2배에서의 반응 바 간격·nested picker 위치, 실제 OS/기기 포커스·접근성 대기는 그대로 남긴다. 전체200화면/실서비스에 문제가 없다는 판정은 아니다. 8081 PID29280과 기존 사용자 변경을 보존했고 커밋·push·배포·묶음3 시작은 하지 않았다.

## 다음 요청의 정확한 범위

**묶음3 — 정책 기사: D08·V21, S008, T-F34-02, U-S008·U-F34.** Responses→Rules→원래 응답/기사 복귀를 실제 원본과 대조하고, 보이는 정책 기사 영역·기사 도구의 mock 연결 범위를 보완한다. 미수록 정책 전문이나 실행 결과를 생성하지 않는다. 관련 R-S008 전체와 실행 계획의 C 연결, Q02/Q12 기준을 적용하고 구현→필요한 테스트→실제 화면→원본 비교→재검토·수정→결과 문서 순서로 진행한다. 결과는 `TODO/FE_MEDIUM_PARITY_03_RESULT.md`다. 현재 묶음3은 미착수이며 자동 시작하지 않는다.
