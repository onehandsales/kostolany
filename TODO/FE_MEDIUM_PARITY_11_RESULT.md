# Parity 11 — 본문 선택·강조 보완과 재검토

**로컬 커밋 요청 반영:** [커밋 전 확인과 다음 인계](#pre-commit-review). 사용자 요청으로 현재35개 경로의 로컬 커밋 범위를 확정했다. 아래 미커밋 기록은 당시 이력이며11 전체 미완료·12 미착수·push/배포 미실행 판정은 유지한다.

작업일: 2026-11-24 KST. 기준 커밋 `79cc8ed21d7eaef398385edcbffe15a8c0109878`, 시작 worktree clean. 이번 변경은 미커밋이다.

**판정: D09/V17 부분 보완, Q11 발행 Highlight 지원 범위 판정. 묶음11 전체 종료는 미충족이다.** native 한 문단은 본문 위치에서 선택·저장·인용할 수 있도록 보완했으나 다중 문단은 별도 선택 화면을 유지한다. 선택 중 서식·메뉴 위치의 구현 차이, 실제 웹/기기 검증이 남아 있다. 기능 테스트 통과를 원본 시각 일치로 판정하지 않는다.

사용자가9/10 잔여 소유를 유지한 독립11 진행을 승인했다.9의 편집 모델/자산/IME와10의 기사·응답 fixture/자산/실제 화면 잔여는 각각9/10에 유지한다. 현재 코드 계약에서11의 저장·인용 검증을 막는 선행 결함은 발견하지 못했다.9/10 전체 완료 승인이 아니다.

<a id="rules"></a>

## 1. 적용 규칙과 보존

- [AGENT 진입점](../AGENT/README.md), COMMON의 품질·작업/엔지니어링 규칙과 [현재 상태](../AGENT/SOFTWARE_AGENT/COMMON/IMPLEMENTATION_STATUS.md), UXUI 진입점·Medium 기준을 읽었다.
- FRONT_AGENT의 [README](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/README.md), [ARCHITECTURE](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/ARCHITECTURE.md), [CODE_CONVENTIONS](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/CODE_CONVENTIONS.md), [STATE_AND_DATA](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/STATE_AND_DATA.md), [MOBILE_UI_AND_PLATFORM](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/MOBILE_UI_AND_PLATFORM.md), [PERFORMANCE_AND_SECURITY](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/PERFORMANCE_AND_SECURITY.md), [TESTING_AND_DELIVERY](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/TESTING_AND_DELIVERY.md)를 모두 읽고 상태 소유권·범위/버전·비동기 수명·접근성·검증에 적용했다. 설치된 RNTL14 비동기 가이드도 확인했다.
- feature 내부 컴포넌트와 기존 source/store 계약을 유지했다. 설명 주석과 새 테스트 이름은 한글이며 설명 주석은 한 문장 한 줄이다. 의존성/편집 모델 전체 확장 없음.
- 사용자 지시로 tools/evidence/별도 검증 스크립트/캡처/로그/manifest를 만들거나 복원하지 않았다. 명령과 결과는 이 문서에 기록한다. 기존 comparisonBaseline은 추적 문서로 갱신하며 과거 증거·원본 관찰·readiness를 보존한다.
- 8081 PID29280, ENV, medium 원본, 정상 mock 기본값을 보존한다. 외부 서비스·commit/push/배포·묶음12 작업 없음.

<a id="source-review"></a>

## 2. 원본 목록과 실제 이미지 검토 범위

`medium/README.md`·`REVIEW_R2.md`와 실제 흐름/요구/배정 목록을 대조했다. 읽기 전용 인라인 검사에서63흐름·273단계·고유200화면, 공유 PNG 해시 충돌0, ANALYSIS 로컬 연결915개,263 U/72 C/22묶음/59 D·Q·V 배정의 누락0이었다. 기존 R1394개를 확인한 뒤 아래 새 관찰 R-S012-V를 추가했다. 최종 R1395개는 원본 요소의 추가 기록이며 새 화면이 아니다.

전체 목록 검사는 전체200화면의 실제 이미지·사용자 행동 재검증을 뜻하지 않는다. 이번 직접 시각 열람은 아래15개 고유 PNG다. 원본을 수정하거나 새 비교 이미지 파일을 만들지 않았다.

| 흐름 | 읽은 ANALYSIS | 직접 열람 PNG/연결 |
| --- | --- | --- |
| [F25 Highlighting a phrase](<../medium/flows/Home/Story detail/Highlighting a phrase/ANALYSIS.md>) | 전체 | 01 S189(sc_f4b066…),02 S122(sc_a8112b…),03 S012(sc_0da01c…) 전부 |
| [F29 Responding to a phrase](<../medium/flows/Home/Story detail/Responding to a phrase/ANALYSIS.md>) | 전체 | 01 S122는 F25와 같은 이미지,02 S097(sc_8accfd…),03 S019(sc_1b7c2e…),04 S197(sc_fcdcd4…) 전부 |
| [F16 Story detail](<../medium/flows/Home/Story detail/ANALYSIS.md>) | 전체 | 01~07 전부.03은 F25/01과 동일. 홈→기사·본문·말미·응답 미리보기·관련 글 맥락 |
| [F30 Responses](<../medium/flows/Home/Story detail/Responses/ANALYSIS.md>) | 전체 | 01~03 전부.01은 F16/02와 동일. 정렬/중첩 응답/정책/닫기 맥락 |
| [Commenting a story](<../medium/flows/Home/Story detail/Responses/Commenting a story/ANALYSIS.md>) | 전체 | 01은 F30/02 공유 이미지.02/03 PNG는 이번 새 열람 대상 아님.832→833과 F29의834 유지 관찰을 합치지 않음 |
| [Library](<../medium/flows/Library/ANALYSIS.md>) | 전체 | 05(sc_c37aef…) Highlighted만 직접 열람.01~04는 이번 PNG 재검토 아님 |

핵심 원본: [S122 PNG](<../medium/flows/Home/Story detail/Highlighting a phrase/screens/02_sc_a8112b7354bb44908f9359e95ba3c288.png>), [S012 PNG](<../medium/flows/Home/Story detail/Highlighting a phrase/screens/03_sc_0da01c48dbc9483798e4c2286a11237f.png>).1179×2556 물리 px이며 MCP390×844는 보관 메타데이터다. 실제 기기·DPR을 역산하지 않는다. crop/정규화 없이 원본 열람 도구로 확인했고 현재 앱 렌더와 같은 조건의 비교는 실행하지 못했다.

S122의 두 녹색 핸들·Highlight/Respond/Share/더보기와 S012의 메뉴 종료 후 강조를 확인했다. S012에는 새 강조와 기존 강조의 서로 다른 배경색이 있다. 원본 RGB 평면값은 `#d1e7d1`/`#e8f3e8`이며 눈으로 위치를 대조한 뒤 픽셀 빈도도 읽었다. 원본 디자인 토큰/색상 관리/OS 렌더와 동일하다는 뜻은 아니다. 다크 ownHighlight는 자체 가독성 기본안이다.

원본에 긴 누름의 최초 선택 단위·제거/겹침·실패·취소·문서 변경 후 복구·다중 문단 제스처·더보기 실행은 없다. ANALYSIS의 공식 설명은2026-11-18 보관 기록을 읽은 것이며 이번 최신 공식 사이트 조회/실제 Medium 계정 실행이 아니다.

<a id="implementation"></a>

## 3. 구현과 상태 계약

| 변경 | 코드와 동작 | 경계 |
| --- | --- | --- |
| 본문 안 native 선택 | [NativePassageText](../FE/src/features/highlights/NativePassageText.tsx), [PassageReader](../FE/src/features/highlights/PassageReader.tsx), [HighlightedText](../FE/src/features/highlights/HighlightedText.tsx). 문단 길게 누르기/접근성 행동→같은 위치의 선택 입력→범위 변경→메뉴. 단일 문단에서 별도 화면·Done 단계 제거 | 최초 문단 전체 선택은 자체 기본안. 단어 선택 결과를 원본 동작으로 확정하지 않음. OS 핸들 실제 작동은 미검증 |
| 선택 메뉴 공용화 | [PassageMenu](../FE/src/features/highlights/PassageMenu.tsx). Highlight/Remove/Respond/Share/더보기·저장 오류/재시도. 쓰기 중 행동 비활성·busy 접근성·최소48 터치 | inline 메뉴는 문단 위에 붙음. 선택 범위 좌표/viewport 충돌 회피와 스크롤 추적의 정밀 보정은 잔여 |
| 다중 문단 | 기존 [NativePassagePicker](../FE/src/features/highlights/NativePassagePicker.tsx)를 `Select across paragraphs`로 유지. 본문 UTF-16 전역 좌표와 문단 사이 `\n\n` 계약 유지 | 본문 위에서 문단 경계를 가로지르는 native 연속 선택은 구현 잔여. 별도 화면을 동일 UX 완료로 처리하지 않음 |
| 범위 무결성 | [selectionDocument](../FE/src/features/highlights/selectionDocument.ts). UTF-16 서로게이트 쌍 중간 선택 거부. 음수·비정수·역전·문단 밖 좌표/빈 선택 거부. Android 입력 변조 원문 복구/선택 해제 | 모든 조합 문자/grapheme 경계까지 구현했다고 주장하지 않음. 한글 IME/외부 키보드 실제 검증 대기 |
| 접근 철회 | [HighlightProvider](../FE/src/features/highlights/HighlightProvider.tsx)와 [mock source](../FE/src/features/highlights/data/createMockHighlightSource.ts). 저장 직전 제출 계정의 차단과 현재 카탈로그 원문 존재·발행 문서 여부 검사 | 이미 보유한 개인 강조의 제거는 허용. 차단만으로 개인 메모리 인용을 자동 삭제하지 않는 자체 정책 |
| 강조 표시 | [theme tokens](../FE/src/shared/theme/tokens.ts)의 ownHighlight와 기존 타인 highlight 분리. 본문과 [HighlightList](../FE/src/features/highlights/HighlightList.tsx)의 개인 강조에 적용 | 타인 표시 숨김은 개인 저장을 지우지 않음. 원본 폰트/줄바꿈/다크색 미확인 유지 |

선택/메뉴/오류/quote는 화면과 `scope(userId, revision)/articleId/version/active`에 소유된다. 기사A→B→A, 본문 변경, 이탈/계정 변경은 선택을 폐기한다. 제출된 쓰기는 원래 계정의 store 수명을 유지하지만 늦은 성공/실패는 새 선택·계정 UI를 닫거나 오류로 덮지 않는다. 같은 A 재로그인에서도 이전 선택/오류는 복원하지 않는다.

Respond는 선택 passage를 응답 초안의 initialQuote로 전달한다. ResponsesPanel 닫기 후 선택·인용 초안을 폐기하고 원래 기사에 남는다. 저장 성공 후 입력은 기존 응답 계약대로 비운다. 시트 실패 후 입력 보존/중복 차단·소유권은 기존 ResponsesPanel/source를 재사용한다. 부모 기사를 다시 생성하지 않지만 실제 픽셀 스크롤·OS 키보드/포커스 복원은 미검증이다. React Native 공통 Text의 공개 onSelectionChange가 없어 기존 TextInput adapter를 국소 사용했다. 전체 rich text native selection bridge나 WebView/새 의존성 도입은 하지 않았다.

<a id="requirements"></a>

## 4. R/T와 직접 ID별 판정

| 요구 | 현재 구현·검증 | 완료 범위/남은 담당 |
| --- | --- | --- |
| D09 | inline 한 문단 선택·메뉴/저장/인용 추가, native preset 자동 테스트 | **부분 보완**. 다중 문단/서식 유지/정밀 메뉴 좌표는11 구현 잔여, OS 검증은11+Q07 |
| V17 | 직접2화면·3T·4U 대조, 원본 강조 톤 누락 추가 | **부분 보완**. 실제 렌더 비교와 native 잔여로 전체 미완료 |
| Q11 | 발행 Highlight/인용 선택 미지원·근거 대기를 구분 | 이번 Highlight 판정 완료. 실제 지원 확장은 결정 필요, Listen12/공유13/다운로드8과 별도이며 Q11 전체 완료 아님 |
| R-S122-L/D/S/V | 같은 본문 위치 선택·범위 계약 보완. 별도 단일 문단 Done 제거 | OS 핸들/선택 색·정확 좌표/스크롤·실제 화면 미검증. 다중 문단은 별도 선택 화면 |
| R-S122-C01 | 저장·제거·실패 재시도·중복·늦은 응답·계정 격리 | mock 자동 검증 완료, 실제 클릭/시각 검증 대기 |
| R-S122-C02 | 선택 구절→Responses→등록/닫기→기사 연결 | 실제 navigation 자동 검증. 키보드/포커스/스크롤은 기기·웹 대기 |
| R-S122-C03 | 기존 ShareSheet로 passage 전달 유지 | 소비 연결 유지. 공유 실행 결과/clipboard·OS·카드 보정은13/21 |
| R-S122-C04 | 더보기 버튼과 미확인 안내 유지 | 원본 실행 결과 미수록. 안내는 자체 UI, 원본 메뉴 항목을 발명하지 않음 |
| R-S012-L/D/S | 저장 후 메뉴 닫기·본문 강조 재표시·Library 재열기/제거 | mock 자동 검증 완료, 원본 렌더 동일성 미완료 |
| R-S012-V(신규) | 새 강조와 기존 강조 배경 구분을 요구에 추가하고 본문/Library 반영 | 원본 관찰 누락 보완. 근사 구현이며 실제 렌더 비교 대기 |
| R-S012-C01 | Listen 버튼의 기존 기사 소비 유지 |12의 플레이어 작업/21의 기기. 이번 실행 결과로 완료하지 않음 |
| R-S012-C02 | 기사 더보기/읽기 표시 기존 소비 | 설정 navigation 회귀 범위, 새 메뉴 구현 없음 |
| R-S012-C03 | 기존 박수 상태/고정 바 유지 |10의 기사 반응. 비교 숫자를 고정하지 않음 |
| R-S012-C04 | 인용 응답 및 일반 Responses/Rules/S008 복귀 소비 | navigation 자동 회귀, S008 전체 보정은3 소유 |
| R-S012-C05 | 기존 저장·Library 소비 |7의 목록 저장과 highlight 저장을 혼동하지 않음 |
| R-S012-C06 | 기사 공유 소비 |13 담당 유지. 이번 공유 결과 검증 완료 아님 |
| T-F25-02 | 본문→범위 선택→행동 메뉴 | 직접 PNG/코드 대조·자동 선택 이벤트, 실제 OS 제스처 대기 |
| T-F25-03 | 저장→핸들/메뉴 종료→강조 유지 | 자동 검증, 톤 분리 수정. 실제 픽셀/스크롤 대기 |
| T-F29-01 | 선택→Respond→초기 quote | 실제 navigation 검증. 후속02~04는10의 응답 소비 회귀 |

<a id="support"></a>

## 5. Q11 지원과 권한 판정

| 원문/사용자 | 현재 지원 | 근거·검증·한계 |
| --- | --- | --- |
| 일반 fixture 기사 + 로그인 A/B | Highlight 저장/제거/Library·구절 인용 응답 지원 | PassageReader·원문 version/UTF16. 저장은 userId별이며 타인 저장 강조에 쓰는 기능 없음 |
| 일반 기사 + guest | 선택 가능, 개인 저장/응답은 로그인 요구 | 기존 requireLogin 유지. 로그인 자동 재실행 없음. 이전 선택은 auth revision에 따라 폐기 |
| 차단/원문 제거/접근 철회 | 새 저장 확정 차단, 기존 개인 강조 제거 허용 | 새 provider/source 테스트에서 대기 중 차단과 원문 제거, A→B→A 확인. 앱 전체 삭제 UI를 새로 만든 것은 아님 |
| 본인 발행 Public/Unlisted | Highlight·구절 선택 인용 미지원 | WrittenStoryScreen→DocumentReader는 PassageReader를 쓰지 않음. 일반 응답 지원과 구분. 기본 source도 publishedStory 신규 저장 거부 |
| 타인 발행 Public/Unlisted | 접근 가능한 글이어도 Highlight·구절 선택 인용 미지원 | 소유권/Unlisted는 기존 발행 접근 계약. own/other×Public/Unlisted 네 경우 source 거부 테스트. 이 매트릭스가 실제 공유·권한 철회 기기 E2E를 뜻하지 않음 |
| 정책 기사 S008 | 개인 Highlight·구절 선택 인용 미지원 | dedicated PolicyArticle의 고정 본문 강조는 개인 저장 기능이 아님. Rules→S008→복귀 navigation 회귀 확인 |

발행·정책 지원 여부를 같은 것으로 가정하지 않는다. 지원 확장에는 각각 원문 version/선택 가능 block·삭제/권한 철회·Library 재진입 계약이 필요하다. 선택1: 현재 미지원 표시/범위를 유지. 선택2: 발행 DocumentReader의 선택 adapter를 별도 승인하여 추가. 이번 원본은 fixture 기사 선택만 보여서 제품 결정을 대신할 근거가 없다. Listen/다운로드 정책을 Highlight 지원의 근거로 사용하지 않는다.

<a id="contracts"></a>

## 6. C 계약 소비

| C | 이번 적용과 경계 |
| --- | --- |
| C01/02/03 | 기존 serif/theme를 전달하고 개인 강조색 분리, 메뉴48 최소/접근성 행동·busy 제공. 작은 폭/큰 글자/OS Safe Area·VoiceOver/TalkBack은 실제 실행 대기 |
| C09 | 일반 기사 reader의 내용/부모 navigation 보존. 발행/정책 reader와 지원 분리 |
| C19/20 | 직접 선택·메뉴·저장/해제·타인 표시·Library·quote 연결. 위 D09/V17 잔여 유지 |
| C36 | 다운로드 사본/삭제 정책은8 소유. 이번 source 접근 확인이 다운로드 지원 확장은 아님 |
| C45/53 | 발행 Public/Unlisted/내 Stories에서 Highlight 미지원 판정 및 기존 발행 navigation 회귀. 작성/프로필 구현 잔여9/15 유지 |
| C58/59/60/61 | Listen/속도/음성/메뉴12. 본문 소비만 확인하며 이번 오디오 완료로 처리하지 않음 |
| C65/66/67 | membership/혜택/설정의 기존 mock 경계 유지. 실제 유료 접근/구독/계정 설정 검증 아님. 관련 담당16/17 등 기존 배정 유지 |
| C71 | native 선택 adapter 보완, 실제 OS 핸들/IME/포커스는11+21(Q07). 사진/공유/오디오 도구 신규 구현 없음 |

<a id="validation"></a>

## 7. 이번 실행 검증

환경: Windows PowerShell, Node24.18.0, 기존 Expo/RN/RNTL/Jest 설정. iOS/Android라는 Jest 프로젝트 이름은 실제 OS 실행을 뜻하지 않는다.

| 실행 | 이번 결과 | 범위/한계 |
| --- | --- | --- |
| 초기 highlight2파일 |4 suites/30 tests 통과,20.045초 | 초기 구현 단계. 최종 코드 전체 결과로 대체하지 않음 |
| 관련8파일 |16 suites/104 tests 통과,127.458초 | PassageReader/store + Highlights/Policy/Publishing/ReadingParity navigation + ReferenceArticleView/ResponsesPanel |
| provider 포함9파일 |18 suites/108 tests 통과,122.530초 | source 접근 검증 추가. 실행 중 마지막 색상/Library 소비 및 다중 문단 검사가 반영되어 아래 최종 재검증과 구분 |
| 최종 타입/lint | 두 명령 exit0 | 마지막 색상/Library 소비·다중 문단 검사 추가 이후 실행 |
| 최종 검사 경로 지정 오류 |8 suites/40 tests 통과,2 suites 실행 실패;45.805초 | 존재하지 않는 ReadScopeNavigation.test.tsx를 지정해 양 preset에서 ENOENT. 제품 결함/시간초과가 아니며 경로를 바로잡아 재실행 |
| 경로 수정 후 관련6파일 |12 suites/52 tests 통과,66.692초 | HighlightProvider/PassageReader/createHighlightStore/HighlightsNavigation/DisplayNavigation/AuthBoundaryNavigation. navigation·표시 설정·auth 소비 포함. 이 실행에서 act 경고 없음 |
| 최종 규칙 정리 후 재검증 |타입/lint exit0,12 suites/52 tests 통과,75.108초 | 위6파일 재실행. 이름 있는 복구/검증 함수 분리 후 결과. act 경고/시간초과 없음 |
| 기존8081 메모리 JS 구문 |web/ios/android HTTP200, vm.Script 통과 |초기5,673,635/7,915,425/7,917,820 bytes;36.262/49.357/43.187초. 요청당60초 제한, 시간초과 없음. 파일 저장/실행 평가 없이 문자열 구문 검사. Hermes bytecode·native 빌드/실행 증거 아님 |
| 최종 규칙 정리 후 메모리 JS |web/ios/android HTTP200, vm.Script 재통과 |5,673,959/7,915,717/7,918,112 bytes;6.323/7.940/8.084초. 현재 최종 코드이며 기존8081 프로세스 보존 |
| 전체 Jest | 이번 미실행 | 규칙의 관련 변경/소비 범위 검사를 수행.9/10의 전체 검사 수치·간헐적 실패/act 경고를 이번 통과로 대체하지 않음.14/22 담당 유지 |
| 8081 실제 브라우저 | 환경 차단/미실행 | 사용 가능한 browser 조작 도구 없음, Document Control 연결 세션0. 기존 자동 승인 차단 Chrome 실행을 우회/반복하지 않음. console/실제 메모리 렌더 열람/동일 조건 비교/웹 DOM 선택은 미검증 |
| iOS·Android 실제 실행 | 미실행/기기 대기 | PATH에서 adb/emulator/java/xcodebuild 없음. Windows에서 Xcode 실행 불가. APK/IPA·OS 선택/IME·접근성 검증 아님 |

실제 navigation 테스트는 AppNavigator/provider를 사용하며 navigation을 mock으로 바꾸지 않았다. HighlightsNavigation에서 본문 longPress→범위→저장 실패/재시도→Library Highlighted→재열기→인용 응답 실패/재시도→기사 복귀→제거→빈 Library를 확인한다. 합성 selectionChange는 OS 핸들 조작을 증명하지 않는다.

최종 명령(FE 디렉터리, 별도 결과 파일 출력 없음):

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test -- --runTestsByPath src/features/highlights/HighlightProvider.test.tsx src/features/highlights/PassageReader.test.tsx src/features/highlights/createHighlightStore.test.ts src/app/navigation/HighlightsNavigation.test.tsx src/app/navigation/DisplayNavigation.test.tsx src/app/navigation/AuthBoundaryNavigation.test.tsx
```

메모리 JS 검사는 기존8081의 `/index.bundle?platform=web|ios|android&dev=true&minify=false`를 각각 fetch한 뒤 Node `vm.Script`로 구문만 파싱했다. `web|ios|android`는 세 개의 개별 platform 값이며 그대로 요청하는 문자열이 아니다.

PassageReader 검사는 원문 변경/active 이탈/A→B→A·같은 A 새 revision, 늦은 성공/실패와 새 선택, 문단 외 좌표/서로게이트/입력 변조, 별도 다중 문단의 한글+이모지를 포함한다. provider 검사는 실제 기본 source와 카탈로그/차단 컨텍스트를 연결해 저장 직전 철회를 확인한다. 조절 가능한 source/store 경계 테스트이며 실제 서버 권한 검증이 아니다.

<a id="review"></a>

## 8. 구현 후 자기 재검토

독립 리뷰는 수행하지 않았다. 변경 diff·테스트·직접 원본·R/T/U/C·종료 조건을 다시 읽고 아래를 수정/분류했다. 실제 앱 화면을 보지 못한 한계는 유지한다.

| 발견/재현 | 원인·영향 | 수정·재검증 |
| --- | --- | --- |
| 둘째 문단에서 잘못된 native 로컬 좌표 | 글로벌 범위로 변환하면 이웃 문단을 가리킬 수 있음 | 문단 bounds/정수/역전 검사 후 변환. 음수/초과/역전/소수 테스트 |
| 이모지 반쪽 선택 | UTF-16 길이만 유효한 범위가 잘못된 문자열을 저장할 수 있음 | 서로게이트 중간 경계 거부, 온전한 emoji/한글·다중 문단 테스트 |
| 쓰기 중 접근 철회 | UI가 닫혀도 mock source 지연 후 신규 저장될 수 있음 | commit 직전 제출 계정·카탈로그 검사. 차단/삭제/계정 전환/복구·제거 테스트 |
| 본인/타인 강조가 동일색 | S012/Library 원본 구분이 토큰 소비에 빠짐 | R-S012-V 추가, ownHighlight 분리 및 본문/Library 적용. 시각 동일성은 대기 |
| 로그인 시트 등으로 inline 입력이 재생성될 때 선택 초기화 | 초기 선택이 무조건 문단 전체이면 조절 범위 손실 | 현재 selection을 initialSelection으로 전달. auth 성공/이탈은 기존 scope remount로 폐기 |
| native 전체 종료를 주장할 수 없음 | 단일 문단 입력 adapter는 rich text 연속 선택 bridge가 아님 | 다음 잔여 표에 구현 차이와 필요한 결정을 명시. 테스트 통과로 D09를 닫지 않음 |

최종 규칙 대조에서는 새 native 입력의 검증·복구 분기를 이름 있는 함수로 분리하고 높이 단위를 `contentHeightDp`, 복구 여부를 `isRestoring`으로 드러냈다. 선택 중 문단 전체 bold·폰트는 유지되므로 이를 손실이라고 넓게 표현하지 않고 기존 강조 span 차이로 잔여 설명을 바로잡았다. 변경 후 타입/lint와 동일6파일을 다시 실행해52 tests를 통과했다.

문서 검사에서는 새 로컬 링크57개/anchor 오류0, 원본63/273/200과 R1395의 중복·연결·배정 오류0을 확인했다. 기존 inputs의 과거 삭제된 tools/evidence4경로는 이력으로 유지하며 복원하지 않았다. HEAD 대비 원본 R/관찰/PNG·evidenceContext/currentEvidence/readiness·기존 T acceptance·manualUpdateHistory 보존을 직접 비교했다. 본문·테스트·현재 상태 문서만 변경했고 `git diff --check` 통과, ENV/medium/패키지/캡처/로그 변경은 없다.

<a id="unknowns"></a>

## 9. 미확인과 잔여·담당·종료 조건

| 분류/ID | 근거와 현재 상태 | 담당·종료 조건 |
| --- | --- | --- |
| 구현 잔여 D09/V17 | 본문 위 다중 문단 연속 선택 미지원. 별도 picker/Done 유지 |11. 기존 version/UTF16 계약을 보존하는 native rich 선택 adapter의 대안/영향을 검토하고 실제 OS 범위·취소·계정/이탈 검증 |
| 구현 잔여 D09/V17 | 선택 중 TextInput은 문단의 기존 개인/타인 강조 span을 그대로 렌더하지 않음. 문단 전체 bold·본문 글꼴 스타일은 전달한다. Cancel 행과 최초 높이 측정으로 배치 차이 가능 |11. 문단 안 기존 강조 표현 보존 방식/선택 모델 선택 후 원본과 전후 배치 비교. 단순 기기 대기로 변경하지 않음 |
| 구현 잔여 D09/V17 | 메뉴는 문단 위 상대 배치여서 긴 문단·스크롤/상단 경계에서 선택 범위와 다른 위치 또는 화면 밖 가능. 범위 anchor/viewport clamp 미구현 |11. native 범위 좌표를 얻는 방식 확정 후 작은 폭·큰 글자·스크롤 중 위치 보정. OS 검증과 별개 구현 잔여 |
| 자산/시각 Q02/V17 | 폰트는 시스템 대체, 점3개 glyph/메뉴 간격·그림자·줄바꿈·selection native색/핸들은 원본 동일 미확인. 다크색은 자체 기본안 |11(Q02 부분). 확보 자산/측정 조건을 기록하고 실제 렌더 비교·보정. 다른 화면의 Q02 전체 완료 아님 |
| U-S012 | 원본 타 기기 동기화·삭제·공개 범위 미수록. 우리 제거·user별 메모리는 검증했으나 원본 사실로 승격 안 함 |11(Q03), 외부동기화 Q08 제외. 보관 추가 자료/허용된 실제 원본 실행으로 질문별 판정 |
| U-S122 | 선택 앵커·문서 수정 후 복원 원본 미확인. 우리 version 불일치는 복원 거부 |11(Q03). 원본 변경 사례 근거 확보. 추정 migration 금지 |
| U-F25 | 제거·겹침·수정/삭제·타인 노출·더보기 결과 원본 미확인. 범위/계정 저장은 자체 mock |11; Share 실행13, 외부 동기화Q08. 각 질문 근거와 자체 정책 분리 유지 |
| U-F29 | quote 길이·인용 제거·Cancel·실패·중복·원문 이동·총수 규칙 미수록 | 선택11/응답10 소유. 현재 자동 테스트는 자체 계약 증거이며 원본 분기 추가 근거가 종료 조건 |
| Q11 제품 결정 | 발행 Highlight/인용 선택 현재 미지원. Public/Unlisted라고 자동 지원하지 않음 |11. 범위 유지 또는 reader adapter 확장 결정과 영향/접근 철회 계약. Listen12 잔여 이전 아님 |
| 환경 차단 | 실제 웹 조작·console·메모리 캡처/원본 쌍 미실행 |11. 허용된 브라우저 연결 후 아래 재현과 작은 폭/큰 글자/scroll·Escape/포커스 검증 |
| 실제 기기 대기 Q07/C71 | OS selection handles·한글 IME·붙여넣기/하드웨어키보드·취소/Back·스크린리더/큰 글자/Safe Area 미실행 |11 소유+21 플랫폼 검증. 실행 가능한 iOS/Android 환경과 실제 기기 확인 필요 |
| 기존9/10·14/22 잔여 | 작성/응답 자산·미확인·환경/기기, 전체 검사 간헐적 시간초과·AuthBoundary act | 기존 담당 유지. 이번 관련 통과만으로 닫지 않음 |

<a id="reproduce"></a>

## 10. 8081 및 native 재현 순서

아래는 **검증 대기용 절차**이며 이번 브라우저 실행 성공 기록이 아니다. fixture 정상 기본값, mock A, Light/100%, 동일 기사 버전으로 시작한다. CP-WEB-01 390×844 CSS px/DSF1은 비교 조건일 뿐 원본 기기 조건이 아니다. 추가320폭/글자 확대/긴 한국어는 별도 조건으로 기록한다.

1. `http://localhost:8081`에서 mock A 로그인→Explore에서 `ChatGPT Is Poisoning Your Brain...` 검색→기사(`medium-brain`) 진입. 선택 구절이 있는 본문으로 스크롤한다. 비교 시각·계정·본문 버전·스크롤 기준을 기록한다.
2. web은 실제 드래그로 “This … public eye at large” 범위를 선택→Highlight. 메뉴 닫기·개인 강조색·주변 타인 강조색 확인. 표시 설정의 타인 강조 off가 내 저장을 지우지 않는지 확인한다.
3. Home→Library→Highlighted→해당 원문 재열기. 내 강조 클릭→Remove highlight→Library 제거 확인. 다른 글/다른 사용자 강조는 보존되는지 확인한다.
4. 다시 범위 선택→Respond→빈 입력의 전송 비활성→한국어+이모지 입력→전송→인용/작성 내용 확인→시트 닫기. 기사 위치·선택 폐기·키보드/포커스 확인. Responses→Rules→S008→복귀에서도 이전 입력·기사 맥락 확인.
5. 작은 폭/큰 글자에서 메뉴48 터치·줄바꿈·스크롤·Escape/모달 닫기·접근성 이름을 확인한다. A→B→A 및 동일 A 재로그인 후 이전 입력/선택/오류 노출이 없어야 한다.
6. native는 같은 기사 문단 길게 누르기→본문 안 선택 핸들 조절→Highlight/Respond/Cancel/Android Back. 키보드 억제·rich 서식 손실·문단 높이/메뉴 위치를 기록한다. 다중 문단은 `Select across paragraphs`→기존 picker→Done이며 이 차이를 그대로 남긴다.
7. 실패/늦은 응답은 기존 테스트의 controlled source 또는 별도 승인된 mock 시나리오로 재현한다. 일반 앱 표시값/시각을 강제 고정하거나 정상 preview 설정을 변경한 채 마무리하지 않는다.

<a id="next"></a>

## 11. 종료와 다음 범위

독립 가능한 구현·자동 검증·근거 분류를 수행했지만11 전체 종료 조건은 미충족이다. native 잔여를21의 단순 기기 검증으로 자동 이전하지 않는다.11의 잔여 보완·실제 화면 확인이 우선이며,12는11을 선행으로 요구하지 않으므로 별도 요청 시 기존 소유를 유지한 독립 진행은 가능하다.

다음 계획은 [묶음12 — 오디오 UI](MEDIUM_PARITY/EXECUTION_PLAN.md#batch-12): Q11 Listen 범위 판정·V18/V19, S003/S016/S046/S050/S055/S088/S128/S131/S141/S154/S160/S192. T-F26-02~05·T-F27-01~04·T-F28-01~06, 관련 U/C. 모의 시계 플레이어·속도·음성, duration/position fixture·Emma→Hans·Done/취소/복귀가 직접 범위다. 실제 TTS/AirPlay/서비스 연결은 제외하며 이번 자동 시작하지 않았다.


<a id="additional-review"></a>

## 12. 잔여 최소 구현 검토와 추가 보완 — 2026-11-24

이번 이어서 작업은 기존 Parity11 미커밋 33개 경로를 보존한 상태에서 시작했다.
위 1~11절의 구현·검사 수치는 최초 작업 이력이며, 아래 판정이 최신이다.
FRONT_AGENT 7개 문서와 관련 공통·UX 규칙, 최신 TODO/배정/비교·자산·자체 UI 기준을 다시 대조했다.
독립 리뷰는 수행하지 않았고 직접 코드·테스트·원본·문서 자기 재검토를 수행했다.

### 최소 구현 판단과 실제 변경

| 대상 | 이번 변경과 근거 | 현재 판정 |
| --- | --- | --- |
| 선택 중 기존 강조 유지 | HighlightedText의 HighlightSpans를 읽기/선택 입력에서 공용으로 사용한다. NativePassageText는 문자열 value 대신 Text 자식에 동일한 개인·타인 강조 구간을 전달하고 문단 스타일을 유지한다. 선택 입력에는 구간별 누르기 동작을 넣지 않는다 | 렌더 전달 누락 수정·양 preset 자동 검증 완료. OS에서 실제 배경·줄바꿈이 유지되는지는 기기 대기 |
| 선택 입력의 최초 높이 | 길게 누르기 전 문단 onLayout 높이를 선택 진입 시 전달한다. 렌더 중 ref 조회 없이 사용자 이벤트에서 읽는다 | 기존 무조건48 높이에서 시작하는 축소를 완화. 메뉴·Cancel 삽입에 따른 배치 이동은 남음 |
| 입력 변조·늦은 선택 | Android 붙여넣기/하드웨어 입력 등에 해당하는 changeText가 오면 선택 입력을 닫아 원문과 강조를 함께 복원한다. 닫힌 입력의 후속 selectionChange는 무시한다 | 합성 이벤트·계정/이탈 자동 회귀 완료. 실제 IME·하드웨어 키보드는 대기. 기존 글 저장 모델은 변경하지 않음 |
| 웹/기존 선택 화면 메뉴 | passageMenuPosition에서 실제 메뉴 높이와 안전 영역을 사용해 위/아래 배치, 좌우·상하 제한, 큰 메뉴의 내부 스크롤을 적용한다. 기존 고정58/180 높이 계산을 제거했다 | 계산 경계·연결 자동 검증 완료. 웹 DOM/기기 실제 렌더 비교는 미실행 |
| native inline 메뉴 | 부모 바깥 bottom:100% 배치는 표시돼도 부모의 native 터치 경계를 벗어날 수 있다. 재검토 후 메뉴를 문단 흐름 안의 ScrollView로 옮겨 부모 밖 터치에 의존하지 않게 했다 | 안전한 자체 대체 배치. 원본의 선택 구간 위 플로팅 메뉴와 다름. 메뉴 표시/숨김 때 문단 이동, 긴 문단에서 메뉴가 스크롤 밖으로 나가는 차이는 구현 잔여 |
| 본문 위 다중 문단 | 문단별 renderer/입력 경계를 단일 선택 영역으로 합치지 않았다. 기존 별도 NativePassagePicker와 전역 UTF-16·version 검사를 유지한다 | 미지원인 구현 잔여. 자동 테스트의 다중 문단 저장 통과를 본문 위 연속 제스처 구현으로 기록하지 않음 |

관련 변경 코드는 [HighlightedText](../FE/src/features/highlights/HighlightedText.tsx), [NativePassageText](../FE/src/features/highlights/NativePassageText.tsx), [PassageReader](../FE/src/features/highlights/PassageReader.tsx), [메뉴 좌표 계산](../FE/src/features/highlights/passageMenuPosition.ts)이다.
D09/V17, R-S122-L/D/S/V/C01/C02와 R-S012-L/D/S/V, T-F25-02/03·T-F29-01, C01/02/03/19/20/36/45/53/65~67/71에 대한 부분 보완이다.
Q11 발행 글/정책 기사 지원 판정과 U-S012/S122/F25/F29의 원본 미수록 질문은 바뀌지 않았다.
응답/공유/Library 저장소와 계정 소유권, 비교용 숫자·fixture는 변경하지 않았다.

설치된 RN0.86.3의 TextInput.js는 Android에서 value와 children 동시 사용을 금지한다.
BaseTextInputShadowNode.h의 getAttributedString은 Text 자식을 attributed string에 합친다.
이 설치 소스와 [RN0.86 TextInput 공식 계약](https://reactnative.dev/docs/0.86/textinput#onselectionchange)을 대조해 자식 구간을 전달하도록 수정했다.
공식 onSelectionChange는 start/end 인덱스를 전달하며 선택 구간의 화면 사각형을 제공하지 않는다.
따라서 구간 정확 좌표를 문자 수 비율로 추정하거나 measureInWindow의 문단 위치를 실제 선택 좌표라고 기록하지 않았다.
설치 소스/JS 테스트 확인은 iOS·Android 실제 렌더 지원 검증의 대체가 아니다.

### 구조 변경 대안과 영향

| 방안 | 필요한 변경 | 얻는 것과 남는 문제 |
| --- | --- | --- |
| 현재 구조의 국소 보완 — 이번 적용 | 같은 문단의 Text 자식 강조, 최초 높이 전달, 메뉴 실측·스크롤, native 문단 내부 대체 메뉴 | 새 의존성/저장 모델 확장 없음. 본문 다중 문단·정확 native 플로팅은 해결하지 못함 |
| 연속 텍스트 구간을 한 TextInput으로 묶기 | ReferenceArticleView/ArticleDetailScreen의 문단별 렌더 계약을 구간 renderer로 확장하고 문단 스타일·간격과 비선택 이미지/구분선의 경계를 매핑 | 새 패키지 없이 다중 문단 선택을 시도할 수 있으나 문단 간격/스크롤 anchor가 변한다. 선택 사각형이 없어 정확 메뉴까지 해결되지 않음. 현재 view들을 숨기고 문자열만 합치는 우회는 적용하지 않음 |
| 읽기 전용 native 선택 view와 메뉴 연결부 — 전체 해결 후보 | iOS/Android view가 연속 문단의 서식·전역 UTF-16 범위·선택 사각형·해제를 전달하고 기사 루트의 메뉴 표시 계층이 좌표/스크롤/안전 영역을 관리 | 기존 HighlightSource/Passage/version 계약을 유지할 수 있다. Swift/Kotlin view, Expo module 연결과 양 플랫폼 개발 빌드·선택/접근성 검증이 필요하다. 기존 modules는 app-icon 전용이며 읽기 view를 제공하지 않음 |
| WebView 기반 읽기 영역 | WebView 의존성, 메시지 검증, 본문/링크/스크롤/접근성 통합 | DOM 선택을 활용할 수 있지만 native reader 구조·보안·기기 UX 영향이 가장 크다. 이번 도입 안 함 |

전체 해결 후보는 마지막 두 native 경계를 작은 읽기 전용 adapter로 한정하는 방식이다.
작성 편집기나 Highlight 저장 스키마 전체를 바꿀 이유는 확인되지 않았다.
native view도 임의 도입하지 않았으며, 구간 렌더 범위와 비선택 block 경계, 양 플랫폼 실행 환경을 확정한 뒤 구현해야 한다.
새 의존성 없이 가능할 수 있다는 것은 native 소스/빌드 확장이 없다는 뜻이 아니다.

### 이번 원본 재검토 범위

F25의 ANALYSIS 전체·3단계 PNG와 F29의 ANALYSIS 전체·4단계 PNG를 다시 대조했다.
F29/01은 F25/02와 같은 S122이므로 직접 열람한 고유 원본은6장이다.
부모 기사/응답 진입·종료 연결과 현재 navigation 소비를 대조했으며, 위 최초15장 전체를 이번 추가 열람으로 재계산하지 않았다.
S122의 기존 강조 유지·선택 메뉴, S012의 저장 후 강조, F29의 빈 입력/활성 전송/등록 결과를 보았다.
PNG1179×2556 물리 px를 무가공 열람했으며 실제 DPR/원본 기기·촬영 시각은 확정하지 않았다.
신규 화면·원본 행동·정책을 추가로 확정하지 않았다.
전체 원본 등록 검사는 별도 목록 검사이며 전체200화면 행동 재검증이 아니다.

### 이번 실행과 재검토

| 검사 | 실제 결과 | 해석 |
| --- | --- | --- |
| 최초 변경 후 타입/lint | 실패: RNTL within의 존재하지 않는 UNSAFE API, render 중 ref 접근2곳 | 사용자 데이터 결함과 별도인 이번 구현 오류. 지원 query와 이벤트/효과 수명으로 수정 |
| 최초 직접 테스트 |2 suites 실패·2 suites 통과,24 passed/2 failed,29.237초 | 새 fixture의 임의 highlight ID가 기존 유효성 계약에 맞지 않음. 실제 highlightId로 생성하도록 수정. 검증기/제품 계약을 완화하지 않음 |
| 수정 후 타입/lint | 각각 exit0 | 최종 기능 코드 기준 |
| 수정 후 직접2파일 |4 suites/26 tests 통과,25.643초 | PassageReader/passageMenuPosition, iOS·Android Jest preset |
| 재검토 후 관련9파일 |18 suites/84 tests 통과,101.064초 | 아래 명령. 실제 AppNavigator 사용. 이번 실행에서 act 경고·시간초과 없음 |
| 기존8081의 web JS |HTTP200,5,678,052 bytes,6.094초,vm.Script 통과 | 메모리 문자열 구문 검사 |
| 기존8081의 iOS JS |HTTP200,7,919,356 bytes,8.323초,vm.Script 통과 | 실제 iOS 빌드/실행·Hermes bytecode 아님 |
| 기존8081의 Android JS |HTTP200,7,921,751 bytes,8.096초,vm.Script 통과 | 실제 APK/기기 실행 아님 |
| 전체 Jest | 이번 추가 작업에서도 미실행 | 관련 공통 소비 범위만 실행. 과거 전체 결과와14/22 잔여를 닫지 않음 |

FE 디렉터리에서 실행했으며 파일 출력 옵션은 사용하지 않았다.

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test -- --runTestsByPath src/features/highlights/PassageReader.test.tsx src/features/highlights/passageMenuPosition.test.ts src/features/highlights/HighlightProvider.test.tsx src/features/highlights/createHighlightStore.test.ts src/app/navigation/HighlightsNavigation.test.tsx src/app/navigation/DisplayNavigation.test.tsx src/app/navigation/PolicyNavigation.test.tsx src/app/navigation/AuthBoundaryNavigation.test.tsx src/features/article/ReferenceArticleView.test.tsx
```

신규 회귀는 선택 중 개인·타인 강조, 변조 후 원문/강조 복원과 늦은 선택 폐기,320 폭의 상단·하단·가로 안전 영역·큰 메뉴·높이 변경이다.
기존 navigation은 선택→실패/재시도→저장→Library→재열기→인용/실패/재시도→기사 복귀·제거를 검증했다.
초안/응답 실패와 계정 A→B→A, 접근 철회·수동 표시 설정·Rules/S008 복귀도 관련 테스트에서 확인했다.
선택 이벤트 합성은 실제 드래그/OS 핸들·IME가 아니며 스타일 assertion은 원본 시각 일치의 증거가 아니다.

자기 재검토에서 native absolute 메뉴의 부모 밖 터치 위험을 발견해 문단 흐름 안의 대체 배치로 수정하고 검사했다.
새 강조 전달 경로가 기존 본문/Library/응답 navigation을 바꾸지 않는지 확인했다.
메뉴를 native 본문 내부로 옮긴 것은 임시 정확 좌표 구현이라고 포장하지 않고 자체 UI/구현 잔여로 기록한다.

최종 문서 검사는63흐름/273단계/고유200화면, R1395 중복0,263 U/72 C/22묶음/59항목의 연결·배정 오류0이었다.
ANALYSIS 로컬 링크915개와 공유 PNG 해시, 코드 입력551개를 다시 검사했다.
현재 미커밋 변경의 새 로컬 링크76개/anchor 오류0, 기록된 입력·코드 해시 불일치0, AGENT 깨진 로컬 링크0이었다.
과거 삭제된 tools/evidence 입력4경로는 이력으로 남기고 복원하지 않았다.
작업 트리는 기존29개 추적 변경·4개 미추적 파일을 보존하면서 메뉴 계산/테스트2개를 더한35개 경로다.
금지 경로 변경0, git diff --check 통과이며 이는 원본 전체 행동·실제 화면 검증을 뜻하지 않는다.

### 실행 환경과 다음 검증의 필요 조건

| 구분 | 이번 확인 | 필요한 조건·종료 조건 |
| --- | --- | --- |
| 환경 차단 — 웹 | 브라우저 제어 도구 없음, Document Control 세션0.8081 PID29280 유지. 실제 UI/console/메모리 렌더 비교 미실행 | localhost:8081에 접근할 수 있는 허용된 브라우저 세션과 선택·스크롤·console·메모리 이미지 열람 기능. 기존 차단 Chrome 실행은 재시도/우회하지 않음 |
| 환경 차단 — Android | PATH에 adb/emulator/java 없음. ANDROID_HOME/ANDROID_SDK_ROOT/JAVA_HOME 값 없음. 기본 Android SDK, Android Studio jbr, Program Files Java 경로도 없음 | 프로젝트와 호환되는 JDK/SDK·adb, AVD 또는 연결 기기, 실행할 앱 빌드와 허용된 조작 경로. 이 조건이 확인된 뒤 빌드/설치/실행 |
| 환경 차단 — iOS | Windows, xcodebuild 없음 | Xcode가 있는 macOS와 simulator/실기기, 앱 빌드 및 조작 환경. iOS JS 구문 통과로 대체하지 않음 |
| 기기 검증 대기 —11/Q07 | 선택 핸들·한글 IME·붙여넣기·외부 키보드·TalkBack/VoiceOver·큰 글자·Safe Area 미실행 | 양 플랫폼에서 선택·저장·인용·취소·Back·복귀·계정 전환을 직접 수행.11 소유 유지,21은 플랫폼 협업 검증 |
| 원본 미확인 —4U/Q11 | 원본 앵커·겹침/제거·수정 후 복원·동기화/공개 범위·인용 Cancel/총수·발행 지원 근거 없음 | 해당 기능 원본/추가 승인 근거 필요. 추측 정책·새 버튼으로 종료하지 않음 |
| 구현 잔여 —D09/V17 | 본문 위 다중 문단, native 구간 좌표/플로팅·스크롤 추적, 메뉴/Cancel로 인한 배치 이동 | 위 native 연결부 범위를 결정·구현하고 원본과 실제 OS 검증. 환경이 생기기만 하면 완료되는 항목이 아님 |

허용된 환경이 갖춰지면 10절 재현 순서에 다음을 추가한다.
개인 강조와 주변 타인 강조가 있는 문단에서 범위를 바꿔도 두 배경이 남는지, Cancel/저장/인용 후 원문을 유지하는지 확인한다.
웹은320/390 폭과 큰 글자에서 메뉴의 상단/하단 반전·오류/더보기 높이 증가·스크롤·Escape를 확인한다.
native는 현재 대체 메뉴의 문단 이동을 기록하고 직접 한글/이모지 선택·붙여넣기·하드웨어 입력 후 복원을 확인한다.
다중 문단은 현재 별도 picker 경로라는 사실을 기록하고 본문 연속 선택 성공으로 계산하지 않는다.

**종료 판정: 독립적으로 가능한 국소 보완과 자동 검증은 수행했으나 Parity11 전체 종료는 미충족이다.**
native 연결부 확장 결정·구현과 실제 웹/기기 검증이 다음 범위다.
9/10 잔여는 기존 담당에 유지하며12를 시작하지 않았다.
tools/evidence/캡처/검증 로그/manifest 생성·복원, 패키지/ENV/medium 변경, commit/push/배포는 하지 않았다.


<a id="pre-commit-review"></a>

## 13. 사용자 요청에 따른 로컬 커밋 전 확인 — 2026-11-24

사용자가 Parity11 변경의 Git 커밋과 다음 작업 요청문 작성을 명시적으로 요청했다.
최초/추가 보완의 미커밋·커밋 미실행 문장은 각 당시 이력이며 이번 지시에 따라35개 경로를 로컬 커밋 대상으로 확정했다.
이는 Parity11 전체 완료 승인이나9/10 잔여 해소,12 구현 시작·push·배포 승인이 아니다.

현재 main/79cc8ed의29개 추적 변경과6개 미추적 파일이 앞선 Parity11 작업 범위와 일치함을 확인했다.
추가 제품 코드 변경 없이 comparisonBaseline의 코드 입력551개 해시를 다시 대조했고 불일치0이었다.
따라서12절의 마지막 타입/lint·18 suites/84 tests·3플랫폼 JS 검사는 동일 코드의 앞선 실제 실행 결과로 유지한다.
이번 커밋 요청에서 같은 테스트를 새로 실행했다고 기록하지 않는다.
커밋 전에는 diff --check와 현재 상태/미추적 파일/문서 링크·해시·금지 경로를 확인한다.

다음은 실행 계획 묶음12의 독립 작업을 요청할 수 있다.
선행은2/4/10이며11 전체 종료를 요구하지 않는다.
단,9/10/11 잔여는 기존 소유로 유지하고12를 실제로 막는 선행 결함이 나타나면 담당·영향·종료 조건을 기록해야 한다.
12의 직접 범위는 Q11 Listen 판정·V18/V19, 지정12화면과 T-F26-02~05/T-F27-01~04/T-F28-01~06이다.
현재 실제 브라우저/native 환경 제약도12에 인계하며 모의 플레이어 검증을 실제 TTS/AirPlay 실행으로 표현하지 않는다.
