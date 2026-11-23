# Parity 4 — 읽기 설정·이력·발행 링크

기준: 2026-11-23, Windows, 시작 `47c18dbde2c926edd72cb78d8adc39b419eb57b3`의 깨끗한 `main`.
[실행 계획](MEDIUM_PARITY/EXECUTION_PLAN.md#batch-04) · [보완 목록](FE_MEDIUM_PARITY_BACKLOG.md) · [증거 폴더](MEDIUM_PARITY/EVIDENCE/PARITY_04/).

**구현 범위:** D01/D03/D05의 mock 연결과 수명 보호를 보완했다. Q05는 근거 대기, Q11은 도구별 부분 판정이다. V12/V16의 원본 시각 잔여와 실제 기기 검증은 완료가 아니다. 다음은 묶음 5이며 이번에 시작하지 않는다.

작업 중 최신 사용자 지시로 **검증·재검토 후 커밋과 `git push origin main`이 승인**됐다. 최초 요청의 커밋·push 금지는 이 지시에 한해 변경됐으며 배포와 후속 묶음은 승인 범위에 포함되지 않는다. 실제 Git 결과는 최종 응답의 해시로 확인한다.

## 적용 규칙과 보존

- AGENT/README, SOFTWARE_AGENT/COMMON의 ENGINEERING_RULES·QUALITY_AND_WORKFLOW·IMPLEMENTATION_STATUS와 제품 범위, UXUI_AGENT의 README·MEDIUM_REFERENCE를 확인했다. 과거 MVP 제외 문구를 최신 Parity 범위의 금지로 사용하지 않았다.
- FRONT_AGENT의 README, ARCHITECTURE, CODE_CONVENTIONS, STATE_AND_DATA, MOBILE_UI_AND_PLATFORM, PERFORMANCE_AND_SECURITY, TESTING_AND_DELIVERY를 읽고 적용했다. navigation 포커스는 app 계층에서 전달하고 기능은 navigation에 의존하지 않는다. 설명 주석은 한글 한 문장 한 줄이며 새 의존성·lint 억제는 없다.
- P3 추가 재검토의 정책 경로/접근권 수명, AUDIT/BACKLOG/REVIEW, 비교 프로토콜·기준·자산·OWN_UI_POLICY와 관련 R/T/U/C를 대조했다. P3의 테스트·캡처를 이번 실행으로 계산하지 않는다.
- ENV·medium 원본과 8081 PID29280을 보존한다. 비교용 이력은 개발 웹에서 명시적인 `?parityHistory=reference-v1`일 때만 주입한다. 일반 앱과 배포 기본값은 빈 이력이며 source 내부에서도 계정별 이력을 분리한다.
- 실제 DB·서버·인증·결제·AI는 연결하지 않았다. SDK/OS 검증 불가는 규칙 면제나 통과가 아니라 검증 대기다.

## 구현과 상태 소유권

| 대상 | 변경과 검증할 불변식 | 판정 |
| --- | --- | --- |
| D01 | DocumentReader의 문서·이미지 공급부·포커스 수명과 요청 순번을 분리했다. A→B→A, 이탈/해제 후 응답, 최신 성공 뒤 오래된 실패, 최신 실패 뒤 오래된 성공은 현재 오류를 덮지 않는다. 현재 실패의 링크 재시도는 유지한다. | mock 구현 보완 |
| D03 | 발행 글의 `written:` 기사 ID를 공통 카탈로그·이력에 연결했다. 직접 WrittenStory/StatsStory와 Article 경유 모두 reader 테마·글꼴·크기를 소비한다. 프로필/발행 카드의 Viewed는 같은 이력 저장소를 읽는다. | mock 구현 보완 |
| D05 | 이력이 Medium 정적 기사만 찾던 제한을 제거해 일반 fixture·발행 글·정책 기사를 모두 다시 연다. 차단 조회 중/실패는 제목을 먼저 노출하지 않고 재시도한다. 삭제/접근 불가 항목은 제거 가능한 unavailable 상태다. | mock 구현 보완 |
| S008 인계 | Responses 내부와 전용 경로 모두 접근 허용·활성 화면에서 방문을 기록한다. 이력에서 Medium Rules 전용 화면으로 재열고 읽기 설정을 유지한다. | 묶음 4 소비 범위 보완 |
| Q05 | F14/F15에는 이력 Undo가 없다. 다른 기능의 Undo는 증거로 쓰지 않는다. 확인/취소 시트는 기존 자체 정책으로 유지한다. | 원본 동작 미확인, 전체 완료 아님 |
| Q11 | 아래 지원표로 적용 범위를 나눈다. 발행 글의 Highlight/인용/Listen을 이번에 신규 구현하지 않는다. | 묶음 4 판정만 완료, 11/12 후속 |
| V12 | 세 개의 알려진 기사로 비교용 이력, 삭제·빈 상태·Explore·고정 헤더/목록 스크롤을 재현한다. 빈 카드의 모서리를 보정했다. | 동작 검증과 시각 부분 보정, 동일 재현 잔여 |
| V16 | 일반/발행/정책 reader 설정 연결과 글자 확대를 확인한다. 하위 선택 메뉴는 고정 y 대신 실제 선택 행 아래에 배치한다. | 동작 보완, 서체/세부 시각·기기 잔여 |

이력의 소유자는 기존 userId별 ReadingHistoryStore이며 인증 revision은 화면/명령 세션의 경계다. WrittenStoryScreen은 storyId/ownerId/userId/auth revision으로 수명을 나누고 source revision 변경 시 이전 본문·열린 표시 설정을 폐기한다. source 요청은 AbortController로 취소하고 취소를 무시한 늦은 응답도 반영하지 않는다. 본문 source와 moderation의 접근 결과가 허용한 뒤에만 방문한다.

Public/Unlisted는 기존 mock 정책을 유지한다. Public은 공개 목록에, Unlisted는 소유자 목록에만 노출하지만 ID를 가진 링크 진입은 본인·타인 모두 허용한다. 원본 F08-10의 안내와 실제 인증/검색엔진 정책은 별개다. 접근 철회·삭제는 controllable source의 revision/null 응답으로 검증했으며 실제 서버 권한 변경 UI를 새로 구현한 것은 아니다. 차단 시 카탈로그 매핑뿐 아니라 발행 글의 실제 userId도 검사한다.

이력 삭제는 방문과 Viewed만 제거한다. 원문·저장·박수·응답은 삭제하지 않는다. 이력 목록 내부에는 기존 정책대로 Viewed를 중복 표시하지 않는다. 글자 설정은 reader 소비자의 설정이며 작성/미리보기에는 고정 편집 표현을 유지한다. 이력 재방문은 최신 읽기 순서를 갱신하며 원본이 재방문 순서를 어떻게 정하는지는 미확인이다.

## Q11·Q12 도구별 판정

| 기능 | 일반 기사 | 발행 글 | 정책 S008 | 후속/근거 한계 |
| --- | --- | --- | --- | --- |
| 방문·이력·재열기·Viewed | 기존 저장소, 일반 fixture 재열기 보완 | 이번 연결 | 이번 방문 연결 | 원본의 자체 글 Viewed는 미관찰, 발행 카드 표시를 자체 UI로 분류 |
| 글자 크기·글꼴·Light/Dark/System | 기존 설정 | 제목/본문/전용 경로까지 이번 연결 | 기존 설정 소비 재검증 | Default/Serif/Sans, 80~200 범위는 자체 대체 정책; 원본 전체 선택지 미확인 |
| 타인 하이라이트 표시 | 기존 강조 표시, 내 Highlight 보존 회귀 확인 | 타인의 강조 데이터/표시 없음 | 보이는 원문 강조에 기존 표시 설정 적용 | 원본 강조 소유자 미확인, 숨김 의미를 발행 글 기능 구현으로 확대하지 않음 |
| 텍스트 선택·Highlight·인용 응답/이미지 | 기존 지원 범위 유지 | OS 텍스트 선택 속성만 존재, 앱 Highlight·인용 도구 미지원 | 별도 선택 도구 미지원 | 묶음 11 D09/Q11/V17, 인용 응답 연결은 묶음 10, 실제 native는 21 |
| Listen·플레이어 | 기존 mock 시계 | 미지원 | 기존 mock | 묶음 12 Q11/V18/V19; TTS/AirPlay 실제 서비스는 Q08 제외 |
| 저장·박수·응답·공유 | 기존 | 기존, 회귀 범위로 확인 | 기존 | 전체 기능 시각 보정은 각각 담당 묶음; 실제 외부 서비스 완료 아님 |
| 다운로드 | 기존 별도 기능 | 완전한 발행 본문 snapshot 미지원 | 별도 기존 경계 | 묶음 8 D07/V26, 이번에 구현하지 않음 |
| 네 단계 설명 | 자체 fixture 기사 기능 | 미지원 | 미지원 | Medium 원본 동작 아님, Q12 기준 유지 |

발행 reader의 표시 설정 메뉴, 발행 카드 Viewed, 개발용 이력 seed와 확인/재시도 시트는 원본에 그대로 있다는 주장 없이 자체 연결 정책으로 기록한다. 익명 방문은 계정 이력을 저장하지 않는다. 실제 계정 정보는 요구하지 않는다.

## 원본·요구사항·누락 대조

전체 목록 검사는 63흐름/273단계/고유200화면·59개 D/Q/V·22묶음·분석 문서 링크를 검사한다. 이는 모든 기능과 200 PNG를 새로 실행·시각 검토했다는 뜻이 아니다. 직접 이미지 검토는 25단계·고유 PNG 22개이며 [원본 목록/해시](MEDIUM_PARITY/EVIDENCE/PARITY_04/source-review.json)와 [57개 R 요구별 판정](MEDIUM_PARITY/EVIDENCE/PARITY_04/requirement-review.json)에 범위를 남긴다. 공식 설명은 기존 ANALYSIS/SOURCES의 당시 기록을 참고했으며 이번에 공식 사이트나 실제 Medium 계정을 새로 검증하지 않았다.

직접 범위 F12 Refine recommendations 5단계, F14 Reading history 2단계, F15 Clearing history 2단계, F24 Changing display 9단계의 ANALYSIS와 단계 PNG를 대조했다. 부모·관련 Publishing a story/Story detail/Library/Profile/Settings dark/Notifications의 분석에서 진입·종료·미수록 분기를 확인하고, 연결에 필요한 발행 공개범위/프로필 결과, 일반 기사 상단/본문, Library Highlighted/이력 탭, F34 두 단계 PNG를 추가 확인했다. 직접 이미지 목록은 `source-review.json`에 별도 보관한다. 관련 부모의 나머지 단계 전체 시각 보정은 이번 범위가 아니며 해당 묶음에서 다시 검토해야 한다.

| 화면과 R 범위 | 원본 → 코드/행동 → 이번 증거 | 남은 차이·미확인 |
| --- | --- | --- |
| S190 L/D/S/C01~03 | Refine→Reading history, 안내·Clear·카드·휴지통·메뉴 → ReadingHistoryList/ReferenceArticleCard → reference-history/S190 | 원본 중간 `In The Pub by Yuan VK` 카드의 전체 제목/본문 미확인, 응답 수 7/11/471은 현재 mock 0과 차이 |
| S052 L/D/S/C01~02 | 하단 기사/휴지통/메뉴·스크롤 → reference-history/S052 | 정확 원본 scroll offset 미확인, OS 영역/카드 높이·줄바꿈·동일 데이터 잔여 |
| S045 L/D/S/C01 | 빈 안내·Explore → reference-history/S045, Q12-history-explore | 카드 모서리 보정, 원본 글꼴·OS 하단 영역 차이 |
| S168 L/D/S/C01~05 | 5행 기사 메뉴 → display-final/S168 | Display 진입 재검증; Follow/Mute/Report/Show less 원본별 보정은 묶음 5/10 |
| S063 L/D/S/C01~05 | 100/Default/System Light/타인 On → display-final/S063 | 관찰한 현재 상태이며 제품 전체 기본값은 미확인 |
| S125 L/D/S/C01~05 | 120과 제목 줄바꿈 → display-final/S125, 발행/정책 확대 | 대체 서체에 따른 원본 줄바꿈·정확 간격 차이 |
| S119 L/D/S/C01~03 | Appearance 아래 System/Light/Dark 선택 → display-final/S119, display-large/S119 | 큰 글자에서 행 기준 위치 수정; OS 회전/글자 확대는 기기 대기 |
| S198 L/D/S/C01~05 | Dark/120/타인 On → display-final/S198 | 글꼴과 플랫폼 렌더 차이, 색·이미지 역전 없음 확인 |
| S001 L/D/S/C01 | Dark에서 타인 Off → display-final/S001, HighlightsNavigation | 내 Highlight를 지우지 않음; 원본 강조 소유자와 정확한 숨김 범위 미확인 |
| S008 연결 | 정책 방문/표시 설정/초안 복귀/이력 전용 재열기 → policy 캡처·ReadingParityNavigation | P3 로고/아바타·서체·272 응답 재현 잔여 그대로 |

새로 확인한 누락은 단순 수가 아니라 실제 동작에서 찾았다. 정적 Medium 기사 배열 밖의 일반/발행/정책 ID가 이력에서 unavailable로 보이던 연결, 발행 reader가 설정/방문을 소비하지 않던 경로, 큰 글자의 선택 행을 덮는 고정 팝오버를 수정했다. 기존 R의 `읽은 글·날짜·집계` 문구만으로 전체 카드가 일치했다고 판단하지 않고 S190의 부분 노출 카드와 집계 차이를 V12 잔여로 남긴다. 발행일과 visitedAt은 서로 다른 값이다.

T-F12-03, T-F14-01/02, T-F15-01/02, T-F24-02~07을 직접 대조했다. U-S001/S045/S052/S063/S119/S125/S168/S190/S198 및 U-F12/F14/F15/F24는 미수록 옵션·오류·삭제 복원·정확 스크롤·기본값·계정/기기 조건을 그대로 미확인으로 유지한다. 관련 U-F08/F16/F34/F41도 이번 mock 결과로 원본 확인으로 바꾸지 않는다.

| C 계약 | 이번 확인과 경계 |
| --- | --- |
| C01/C02/C03/C13 | reader 크기·서체·테마·행 배치·48px 조작·포커스·작은 웹/CSS 확대; 원본 서체와 실제 native는 대기 |
| C09/C11/C12/C25/C27/C37 | 일반/발행/정책 진입·Viewed·이력/삭제/복귀; 관계 관리와 다른 Library 탭 보정은 묶음 5/6/7/10 |
| C20/C40/C45/C53/C55 | 링크 요청 역전·발행 Public/Unlisted·프로필 Viewed·알림 일반 기사 연결; 선택/작성 전체·프로필·알림 시각은 묶음 9/10/11/15/16 |
| C36/C58/C59/C60/C61 | Q11 지원표로 다운로드/오디오 미지원과 후속 8/12를 구분, 실제 서비스는 Q08 제외 |
| C65/C66/C67 | 기존 mock 멤버십/설정 경계 유지, 실제 결제/인증 없음; 본 배치에서 전체 검증하지 않음 |
| C70/C71 | 실제 AppNavigator 통합·계정/이탈/경합 회귀, OS/native 검증은 묶음 21, 전체 최종 연결은 22/Q10 |

## 재검토 기록

독립 리뷰나 다른 에이전트 리뷰 없이 **자기 검토**를 수행했다. 변경 diff·테스트 기대값·원본·새 캡처·요구사항 표를 서로 대조했다.

1. 링크 수명 보완의 첫 lint가 memo 객체 변경을 금지했다. 수명 identity는 state, effect 실행의 alive는 ref가 가리키는 지역 객체로 나누어 규칙을 충족했다. 메모 캐시를 정확성의 전제로 삼지 않는다.
2. 발행 글의 source revision/null/차단 전환 때 열린 표시 설정이 복구될 수 있어 접근 불가 동안 폐기하고 다시 허용돼도 자동 재개하지 않게 했다. 본인/타인×Public/Unlisted 회귀에 복구 후 설정 닫힘을 포함했다.
3. ActionMenu의 표시 설정 항목은 선택 후 unmount돼 기본 포커스 반환 대상이 사라진다. reader의 실제 Story options 버튼 ref로 복귀시켰고 브라우저 `:focus`로 확인한다. 다른 ActionMenu 소비자는 기존 경로를 유지한다.
4. 320×568/CSS 2배에서 Appearance 하위 메뉴가 고정 y로 선택 행을 덮었다. measureInWindow 결과를 사용하고 늦은 측정은 요청 순번/해제에서 무효화했다. 수정 전후 같은 조건의 캡처로 확인한다.
5. 테스트가 이력 내부에도 Viewed가 있어야 한다고 가정한 부분은 원본/기존 정책과 맞지 않았다. 검증 위치를 소비 카드와 실제 저장소로 고쳤다. navigation을 mock으로 대체하지 않았다.
6. 브라우저 로그인 시나리오의 사용자 이름 불일치, 로그아웃 modal label을 버튼으로 선택, 로그아웃 후 이미 열린 로그인 화면에서 프로필을 찾는 경로 오류를 수정했다. 실패 실행을 삭제하거나 통과로 계산하지 않는다.
7. S052의 캡처 표시를 처음 잘못 읽어 헤더가 사라진 것으로 의심했다. DOM 좌표와 hit test, PNG raw SHA-256·픽셀 비교에서 원래 캡처와 진단/재촬영이 동일했고 제목·탭이 유지됐다. 앱 결함으로 처리하지 않았고 임시 캡처 대기 변경도 되돌렸다. `fromSurface:false` 진단은 검은 화면을 얻었으므로 채택하지 않았다. 진단 스크립트와 출력은 별도로 보존한다.

## 검증과 증거

| 실제 실행 | 결과·증거 |
| --- | --- |
| `npm.cmd run typecheck`, `npm.cmd run lint` (FE) | 최종 모두 exit 0, [checks-reviewed.json](MEDIUM_PARITY/EVIDENCE/PARITY_04/checks-reviewed.json)과 각각 로그 |
| `npm.cmd test` (FE) | **284 suites / 1504 tests 통과**, 실패·skip 0, Jest 929.169초 / subprocess 931.834초, [전체 로그](MEDIUM_PARITY/EVIDENCE/PARITY_04/full-tests.log) |
| 최종 본문 수명 관련 검사 | `DocumentReader WrittenStoryScreen WrittenStoryLifecycle` **6 suites / 26 tests 통과**, [로그](MEDIUM_PARITY/EVIDENCE/PARITY_04/document-reviewed.log). 전체 검사 중 수명 identity 표현을 state로 정리한 뒤 종료 후 관련군과 타입/lint를 별도 재검사했다. |
| 추가 회귀 검사 | 카탈로그·seed·계정 전환·내 Highlight 보존·접근 철회 **10 suites / 18 tests**, 초기 실제 navigation 군 **2 suites / 8 tests** 통과. 현재 전체 검사에도 포함된다. |
| `npm.cmd run export:android`, `export:ios` | 양쪽 exit 0, 각각 Hermes 3.6MB와 metadata 출력. [명령·경과 시간](MEDIUM_PARITY/EVIDENCE/PARITY_04/checks-recheck.json), 실제 native 빌드 아님 |
| 최종 Chrome/8081 | 아래 **8실행 / 77캡처 / 39상태 검사**, 각 console/exception 0. [실행 기록](MEDIUM_PARITY/EVIDENCE/PARITY_04/browser-runs.json), [작은 한국어 화면](MEDIUM_PARITY/EVIDENCE/PARITY_04/browser-small.json) |
| 원본/배정·문서·증거 | buildBaseline write/check, inventory, 링크·PNG·텍스트/source 해시·Git ignore·medium 보존을 최종 integrity 기록으로 확인 |

새 테스트는 링크의 두 요청 순서 역전/재시도·document/source/focus/unmount, Public/Unlisted×본인/타인·접근 복구 시 설정 폐기, 일반/발행/정책 실제 navigation, 동적 카탈로그/차단 조회 실패, 개발 seed 제한을 다룬다. PublishedLibrarySession과 HighlightsNavigation에는 실제 계정 전환의 이력 분리와 타인 강조를 꺼도 내 Highlight 유지 검증을 추가했다. navigation 자체를 mock하지 않았고 native 의존성 대역과 controllable mock source를 사용했다.

전체 로그에는 iOS SettingsNavigation의 BottomTabView/VirtualizedList 및 AuthBoundaryNavigation의 VirtualizedList에서 `act` 경고 **3건**이 있다. 해당 테스트는 통과했지만 로그가 무경고라고 하지 않는다. 이 테스트 파일은 이번에 수정하지 않았으며 경고의 전체 원인·타이머 정리는 묶음 22의 테스트 정합성 후속으로 남긴다. 브라우저 console 0건과 별개다.

초기 타입 검사는 nullable result 경계에서 실패해 명시적 null 가드로 수정했다. 초기 lint 실패와 수정 후 성공은 `checks-final.json`/`checks-recheck.json`에 분리돼 있다. 최초 navigation 테스트는 잘못 가정한 홈 기사·준비 시점·이력 내부 Viewed 기대값에서 실패했고 현재 경로/상태를 검증하도록 수정했다. `published`의 DOM 기다림은 120회×500ms(약 60초) 만료였으며 잘못 선택한 로그아웃 modal label이 원인이었다. CDP 요청 제한은 30초, Chromium 시작 제한은 20초다. 나머지 세 촬영 실패는 잘못된 label/상태 기대값이며 시간초과가 아니다. 수정 뒤 항상 새 출력 디렉터리에서 재실행했고 실패 로그를 보존했다.

PowerShell 초기 로그는 stderr를 NativeCommandError로 포장한 실행도 있으므로 Jest의 PASS와 shell exit를 동일하게 주장하지 않는다. 최종 검사는 Python subprocess의 실제 returncode와 경과 시간을 JSON으로 기록한다. 초기 UTF-16 로그는 내용 보존 후 UTF-8로 바꾸고 변환 목록을 남겨 Git/해시 검사에서 읽을 수 있게 했다.

| 채택 실행 폴더 | 캡처 / 상태 검사 | 범위 |
| --- | --- | --- |
| published-approved | 14 / 3 | 긴 한국어 발행→설정→Viewed→이력→삭제→B 로그인 |
| reference-history | 6 / 2 | S190/S052/S045·Clear·Explore, 비교 seed |
| display-final | 10 / 9 | 같은 조건의 전후 기준, 직접 표시 설정 6화면과 공통 소비 화면 |
| display-small | 10 / 9 | 320×568 작은 웹 폭 |
| display-large | 10 / 9 | 320×568, CSS 2배 진단 |
| policy | 9 / 3 | S008 설정·응답 초안/포커스 복귀·이력 재열기 |
| notification | 4 / 1 | 알림→일반 fixture 기사→이력→재열기 |
| published-small | 14 / 3 | 320×568 긴 한국어 발행 본문·모달·포커스·계정 분리 |

원본 시각 비교에서 정밀 글꼴/여백·OS 상태/홈 영역, S190의 부분 카드·집계 차이를 유지한다. 발행 reader의 기존 뒤로 버튼 위치와 도구 줄바꿈 등 전체 배치는 묶음 9/10에서 보정할 대상이며 이번 설정 연결을 발행 상세 전체 시각 완료로 표현하지 않는다. 작은 폭의 긴 본문은 스크롤 가능하고 선택 메뉴·키보드 포커스·터치 대상이 동작한다.

캡처는 새 Chrome profile의 localhost:8081, UTC/en-US, 고정 now `2025-06-13T12:00:00.000Z`, DPR1, 기본 390×844다. 원본 PNG 1179×2556과 카탈로그 논리 표기 390×844를 구분하며 원본 DPR/기기를 역산하지 않는다. 자동 crop·원본 덮어쓰기·색 보정은 없다. 시각 비교는 원본/구현을 직접 열어 배치·상태·여백·줄바꿈을 대조한 것이고 픽셀 동일성 합격이 아니다.

before-display는 시작 코드의 전후 기준이다. before-history/display-large-before 및 초기 진단은 구현 중간 상태로 별도 분류한다. 중간 캡처를 최종 source hash에 재배정하지 않는다. 최종 채택 캡처는 `capture-code-checkpoint.json`과 새 `evidence-manifest.json`으로 연결한다. 과거 P1/P2/P3 manifest는 수정하지 않는다. PNG는 raw SHA-256, 텍스트는 UTF-8/BOM 제거·LF 기준이다.

[최종 integrity](MEDIUM_PARITY/EVIDENCE/PARITY_04/integrity.json): 현재 source 550개와 채택 촬영 시점 해시 차이 0, medium 382파일 보존, 직접 검토 PNG 해시 오류 0, 문서 상대 링크 658개 오류 0, 과거 증거 변경 0이다. [이번 manifest](MEDIUM_PARITY/EVIDENCE/PARITY_04/evidence-manifest.json)는 새로 생성해 채택 8실행과 진단/실패 파일을 구분한다. `python -X utf8 tools/medium-parity/verifyParity02.py --evidence=TODO/MEDIUM_PARITY/EVIDENCE/PARITY_04 --check-code`로 이후 체크아웃에서도 검증할 수 있다.

현재 환경에서 adb/emulator/java/xcodebuild와 SDK 환경 변수가 확인되지 않았다. iOS 실제 빌드는 macOS/Xcode와 기기가, Android 실제 빌드는 JDK/Android SDK·기기 또는 emulator가 필요하다. JS/Hermes export와 Jest의 iOS/Android 프로젝트는 기기 실행이 아니다. OS 글자 확대·VoiceOver/TalkBack·실제 Safe Area·native IME/키보드·외부 앱 전환은 미검증이다. CSS 확대와 합성 텍스트 입력을 실제 OS 검증으로 표현하지 않는다.

## 8081 확인 순서

1. 새로고침 후 Notifications → mock A 로그인 → 알림의 기준금리 기사 → 뒤로 두 번 → Library → Reading history → 같은 기사 재열기. 일반 fixture가 unavailable로 나오지 않는지 확인한다.
2. Home → Write a story → 긴 한국어 제목/본문 → Next → Publish now → Profile에서 발행 글 열기 → Story options → 표시 설정 → 120/Sans/Dark → 닫기 → Profile Viewed → Library 이력에서 재열기.
3. 이력 휴지통 → Cancel → 다시 휴지통 → Confirm. Profile의 Viewed는 사라지고 발행 글은 남는다. Clear history → 빈 안내 → Explore도 확인한다.
4. 일반 기사 Responses에 초안 입력 → Medium policy → 정책 표시 설정 → 원래 Responses로 복귀 → 초안 보존 → Library 이력 → Medium Rules 전용 화면 재열기.
5. Settings 로그아웃 → Confirm → 이미 열린 mock 로그인에서 B 선택. B 이력이 분리되는지 확인한다. 전체 새로고침 시 메모리 데이터가 초기화되는 것은 기존 mock 정책이다.
6. 원본 비교용으로만 `http://localhost:8081/?parityHistory=reference-v1`을 새로 연 뒤 A 로그인 → Settings → Refine recommendations → Reading history. 이 seed의 시간은 비교용 합성 값이며 원본 실제 방문 시각이 아니다.

## 다음 묶음의 정확한 범위

묶음 5 **D06·V11·V14·V15 — 관계·추천 관리**. 선행은 묶음 2, 결과는 `TODO/FE_MEDIUM_PARITY_05_RESULT.md`다. 검색에서 동적 B → Follow/Mute → Following/Muted/Blocked 관리 목록과 수 → 해제, B 이름 변경·계정 전환·신고/취소를 다룬다. 전체 대상 화면/단계·R/T/U/C는 [실행 계획의 묶음 5](MEDIUM_PARITY/EXECUTION_PLAN.md#batch-05)를 따른다.

이번에 남긴 S168 메뉴의 관계/추천 행동과 F12 관리 목록은 묶음 5에서 다시 대조한다. V12/V16의 정확 데이터·서체·플랫폼 차이는 해당 ID 잔여로 유지해 묶음 21/22에서 확인하며, Q05 근거 부족을 임의 구현으로 해결하지 않는다. Q11의 Highlight/Listen은 11/12가 맡는다. 이번 작업에서 다음 묶음을 시작하지 않는다.
