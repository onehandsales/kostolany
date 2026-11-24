# Parity 1~8 잔여 정리·보완·재검토

**후속 요청 — 커밋 전 추가 검토:** 사용자 지시로 [추가 검토](#pre-commit-review) 후 이번 변경의 로컬 커밋을 진행한다. 아래 최초 작업의 커밋 제외 문구는 당시 경계다. push·배포·Parity9 착수는 승인 범위에 포함하지 않는다.

2026-11-24. 시작 HEAD `2fee9ebea11de3a108776a2d1b225bf34db734eb`, 시작 작업 트리 clean. 이 문서는 [실행 계획](MEDIUM_PARITY/EXECUTION_PLAN.md)의 묶음1~8 잔여를 현재 코드와 대조한 최신 판정이다. 과거 결과·요구·증거는 보존한다. 기존 묶음7·8 추가 수정은 이미 `59602be`에 포함되어 있다. 예전 문서의 “미커밋”, “묶음6 미착수”는 당시 기록이며 현재 상태가 아니다. 이번 변경은 커밋·push·배포하지 않는다.

## 적용 규칙과 확인 범위

- `AGENT/README.md`, 공통 ENGINEERING/QUALITY_AND_WORKFLOW/IMPLEMENTATION_STATUS와 UX 규칙을 확인했다. `FRONT_AGENT/README.md`, `ARCHITECTURE.md`, `CODE_CONVENTIONS.md`, `STATE_AND_DATA.md`, `MOBILE_UI_AND_PLATFORM.md`, `PERFORMANCE_AND_SECURITY.md`, `TESTING_AND_DELIVERY.md`의 7개 문서를 읽고 변경·검토에 적용했다. 한글 설명 주석은 한 문장 한 줄이며 기능별 공급부와 사용자·대상 ID 수명을 유지한다.
- Parity1~8 결과와 추가 검토, AUDIT/BACKLOG/REVIEW, 비교 protocol/baseline/assets/OWN_UI_POLICY, 관련 R/T/U/C를 대조했다. 과거 테스트 수치와 캡처는 이번 실행 결과로 계산하지 않는다.
- `medium/README.md`, `REVIEW_R2.md`, 실제 전체 흐름 목록을 대조했다. 원본63흐름·273단계·고유200화면, R1392·U263·C72·보완59항목의 등록/배정/연결 검사와 실제 화면 검토를 구분한다.
- 묶음3~8의 직접 대상65화면에 연결된25개 ANALYSIS 전체 내용을 확인했다. 반복 문장·공통 화면 관찰은 중복을 제거해 읽고 원문 단계표/링크/이미지 해시는 별도 전수 대조했다. 부모·연결 맥락으로 Home, Story detail, Responses, Digest settings, Profile, Settings의6개 분석도 함께 확인했다. 합계31분석·125단계·고유91PNG를 메모리 비교 시트에서 살폈으며, 수정 대상 S008/S116/S132 및 이력 집계는 원본 세부 영역과 실제 렌더를 대조했다. 200화면 전체를 새로 조작·시각 검증한 결과가 아니다.
- 독립 리뷰어 없이 같은 작업자가 구현 후 소비 코드·테스트·원본·실제 화면·문서를 다시 읽은 자기 재검토다.

## 잔여별 최신 판정

“이미 해결됨”은 해당 mock 계약의 구현 상태다. 원본에 없는 결과를 확인했다는 의미가 아니다. 근거 부족은 추가 원본/동일 조건 관찰이 확보되어야 종료하며, 담당 기능과 최종 묶음22가 이를 추적한다.

| 잔여·ID | 분류와 현재 근거 | 담당·종료 조건 |
| --- | --- | --- |
| Q01 200화면 같은 조건 재현 | 다른 묶음 담당. 경로/계정/fixture 배정은 있음; 전수 실제 재현·시각 동등성은 미완료 | 각 화면 담당 및22. 새 실행으로 상태별 대조하고 미재현을 따로 남김 |
| Q02 원본 폰트·벡터·줄바꿈·정확 간격 | 원본 근거 부족 + 알려진 대체 구현 차이. 플랫폼 시스템/Georgia 계열·SVG 근사 토큰 사용을 명시 | 2 공통 및 각 V,21/22. 원본 자산·환경 또는 승인한 대체 기준 확보 후 비교; “폰트 동일” 판정 금지 |
| Q12 자체 UI 배치와 노출 | 기준은 이미 해결됨, 화면별 적용은 다른 묶음 담당. mock/발췌/미수록 안내 유지 | 각 소비 화면 및22. 상태별 노출·접근 경로·영역 차이 확인 |
| S008/V21 로고·작성자 아바타 | 지금 수정 가능 → 수정. 문자 M 대체를 해당 원본 영역 crop으로 교체 | 3. 실제 이미지 로딩 후 비교; 독립 원본 자산/서비스 사용권 확보와 구분 |
| S116/V27 커버·xeladu, S132 Digest crop | 지금 수정 가능 → 수정. 사진 누락과 홈용 작은 crop 재사용을 해소 | 6. 날짜 취소/확정·작가/기사 연결·반응 유지. 홈의 기존 crop은 유지 |
| S008 272, S116 17, S190/S052 7·11·471 응답 | 지금 수정 가능 → 비교 모드 보완. 명시적 개발 웹 요청에만 본문 없는 정수 집계를 공급 | 3/4/6. 버튼·시트·본문 미리보기 같은 값, 작성/삭제·계정 분리·기본 모드0 유지 |
| S132 158K/1.3K와 홈157K/1.3K | 원본 근거 부족 + 알려진 fixture 차이. 같은 기사라도 캡처별 박수 표시가 다름; 정확값·시점은 미수록 | 6 및 원본 집계 소비10/22. 반올림 표시를 정확한158000/1300으로 역산하지 않음; 실제 row를 생성하지 않음 |
| D08 정책 헤더·강조·도구·복귀 | 이미 해결됨. [묶음3](FE_MEDIUM_PARITY_03_RESULT.md), PolicyArticle/ResponsesPanel의 mock 도구·접근권/화면 이탈 보호 | 3. 이번 변경 영향은 정책 응답·부모 초안·읽기 설정/이력 복귀로 재확인 |
| U-S008/U-F34 전문·현재 버전·각 도구의 원본 실행 결과 | 원본 근거 부족. 보이는 발췌만 유지; 현재 링크는 기존 오류/재시도 계약 | 3/22. 원문/버전별 근거 확보 전 전문 생성 또는 실행 확인 판정 금지 |
| D01 발행 본문 링크의 늦은 성공/실패 | 이미 해결됨. [묶음4](FE_MEDIUM_PARITY_04_RESULT.md), DocumentReader와 useExternalLink의 문서/요청 수명 | 4. 기존 회귀를 이번 전체 검사에 포함; 실제 외부 서비스 연결 제외 |
| D03/D05 일반·발행·정책 기사 이력/Viewed/설정 | 이미 해결됨. 공통 ID 해석, PolicyArticle 전용 재진입, reader 설정 소비 | 4. 실제 navigation 회귀와 브라우저 이력 확인; 원본 조회 기간/동기화는 근거 부족 |
| Q05 이력 Undo | 원본 근거 부족. F14/F15에는 휴지통과 전체 삭제 전후만 있고 Undo 실행/링크 없음 | 4/22. F50의 목록 제거 Undo를 이력 근거로 사용하지 않음 |
| Q11 발행 글 다운로드 | 이미 해결됨. [묶음8](FE_MEDIUM_PARITY_08_RESULT.md)의 발행 문서/이미지 참조/버전 사본과 철회 | 8. 일반·발행 혼합 다운로드 회귀; 영속 offline 지원 판정 금지 |
| Q11 발행 글 Highlight·인용·Listen | 다른 묶음 담당. 기존 판정/미지원 범위를 유지하고 도구 전체 신규 구현으로 확대하지 않음 | 11 강조·인용,12 듣기. 각 기능 지원/미지원과 입력 계약을 별도로 결정 |
| D06 관계 관리·동적 사용자·해제 | 이미 해결됨. [묶음5 추가 검토](FE_MEDIUM_PARITY_05_RESULT.md#additional-review), 사용자 이름/관계 조회·차단 중 해제·수명 보완 | 5. 관계/추천 navigation 회귀; 원본 On 기본값·S093/S199의 차단 효과는 미확인 |
| S038 AAA AI 공개 리스트의2 stories와 미수록 항목 | 다른 묶음 담당 + 원본 근거 부족. 제목/개수 표시는 있으나 원문 기사 식별/본문은 없음 | 17 공개 목록/발견 소비,22. 없는2개 본문을 생성하지 않고 미수록 상태 처리 |
| D02 Digest의 과거/새 호 Mute/Unmute | 이미 해결됨. [묶음6](FE_MEDIUM_PARITY_06_RESULT.md)의 원본 articleIds 유지·최신 관계로 표시만 필터 | 6. 날짜 왕복·재조회·이탈/계정 전환 회귀. 원본 캐시 불변성/발송 효력은 근거 부족 |
| D04 읽기 시간0, D11 회원용 별 | 이미 해결됨. Digest는6, ListStoryCard와 ListNoteSheet는7에서 소비자 보완 | 6/7. 양수만 시간 표시, 별은 article.memberOnly와 연결; 계정 회원 등급과 구분 |
| D13 목록 시간·메모·정렬/저장/공개범위 | 이미 해결됨. [묶음7](FE_MEDIUM_PARITY_07_RESULT.md), 의미 있는 성공 변경의 updatedAt·owner/list/article 메모 키 | 7. 원본의 서로 다른1/6/14초를 일반 앱 시계에 고정하지 않음; 원본 생성/수정 시각 의미는 근거 부족 |
| D07 다운로드 취소·부분 실패·철회·비활성 계정 | 이미 해결됨. [묶음8 추가 검토](FE_MEDIUM_PARITY_08_RESULT.md#additional-review), 실제 source 구독·버전·소속 세대 보호 | 8. 기존 source/store/navigation 회귀 재실행. 과거 변경을 중복 구현하지 않음 |
| 영속 파일 캐시·비행기 모드·콜드 시작 offline·실제 서비스 | 범위 제외. 현재는 메모리 payload와 이미지 참조이며 디스크 사본 구현이 없음 | Q08. 기기만 준비하면 확인될 기능으로 기록하지 않음; 도입은 별도 승인 작업 |
| Safe Area·OS 큰 글자/IME·VoiceOver/TalkBack·native 제스처 | 실제 기기 검증 대기 | Q07/21. iOS/Android 실제 실행 환경에서 검증; 웹/CSS/Jest/Hermes로 대체 금지 |
| Q09 과거 완료 문구와 현재 상태 | 문서 판정은 이미 해결됨, 최신화 누락은 이번 수정. 오래된 미커밋/미착수/도구 실행 안내 교정 | 현재 상태 문서. 과거 원문을 지우지 않고 최신 결과 연결; 시각 보정 완료와 구분 |
| Goodbye Notion 상세의 빈 발행일 뒤 구분자 | 다른 묶음 담당인 알려진 UI 차이. ReferenceArticleView의 `2 min read · `처럼 빈 날짜에도 구분자가 남음 | 10/V13. 미수록 발행일을 만들지 말고 존재하는 메타데이터 사이에만 구분자 렌더; Digest 카드에는 해당 구분자 없음 |

## 구현과 비교 조건

`responsePreview.ts`의 `createResponseComparisonCounts`는 `__DEV__ && Platform.OS === 'web'`와 URL `parityResponses=reference-v1`이 모두 맞을 때만 동작한다. `uncapturedCount`는 원본에 숫자만 있고 본문은 없는 집계다. source/store의 사용자·대상 범위를 유지하며 보이는 루트 응답 수와 합산한다. 답글 포함 여부가 원본에서 확인됐다는 주장이 아니라 기존 mock 루트 집계에 맞춘 비교 정책이다. 숨긴 토론은0, 일반 모드는 실제 mock 응답만 센다. 목록 ID나 미등록/반올림 집계에는 원본 숫자를 주입하지 않는다.

ResponsesPanel에는 미수록 본문 안내를 표시하고, 미수록 집계가 있으면 “Be the first to respond.”를 표시하지 않는다. PolicyArticle의 전문/현재 버전 안내와 mock 안내도 유지한다. 자료에 없는 댓글 행·제목·전체 본문을 만들지 않았다.

코드 근거는 [비교 입력](../FE/src/features/responses/data/responsePreview.ts), [source 경계](../FE/src/features/responses/data/createMockResponseSource.ts), [공통 집계](../FE/src/features/responses/responseVisibility.ts), [본문 소비자](../FE/src/features/responses/ResponsePreview.tsx), [정책 기사](../FE/src/features/responses/PolicyArticle.tsx), [Digest 소비자](../FE/src/features/digest/DigestPanel.tsx), [이미지 출처](../FE/assets/medium/SOURCES.json)다. 회귀는 [응답 계약](../FE/src/features/responses/responseComparison.test.ts), [버튼·본문·시트와 계정 분리](../FE/src/features/responses/ResponsesPanel.test.tsx), [실제 navigation](../FE/src/app/navigation/ReadingParityNavigation.test.tsx)에 연결했다.

새5개 PNG는 기존 원본의 해당 사각형을 자른 **FE에서 사용하는 이미지 자산**이다. 새 브라우저 캡처나 검증 증거 파일이 아니다. 기존 `FE/assets/medium/SOURCES.json`에 원본 경로와 물리 crop 좌표를 추가했다. 리샘플/합성/내용 생성 없이 원본 ICC가 있으면 보존했다. 원본 파일은 수정하지 않았다.

| 자산 | 원본 | 물리 crop 좌표·출력 크기 |
| --- | --- | --- |
| goodbye-notion.png | S116 | [72,993,1107,1482],1035×489 |
| xeladu.png | S116 | [72,1535,132,1595],60×60 |
| digest-love.png | S132 | [72,993,1107,1482],1035×489 |
| policy-brand.png | S008 | [389,212,449,272],60×60 |
| policy-author.png | S008 | [72,711,168,807],96×96 |

이번 웹은 Windows Headless Chrome158.0.8127.36,390×844 CSS px·deviceScaleFactor1·UTC·Light 기본, 작은 폭320px 및 reader120%/Dark를 추가했다. 원본은1179×2556 물리px, 메타데이터390×844이며 원본 기기/DPR은 미확인이다. 웹 safe inset0과 원본 OS 영역을 같은 조건으로 오인하지 않는다. 현재 Date를 고정하지 않아 상대 시간은 동작 확인만 했고 원본 초 단위 시각과 일치 판정을 하지 않았다. 이미지·고정 발행일·날짜 선택·정수 응답은 같은 fixture로 대조했다. 정책 화면은 전후 렌더를, Digest는 수정 후 렌더와 원본을 메모리에서 열람했다. Digest 수정 전 화면을 이번에 캡처했다고 주장하지 않는다. 유사도 점수/정규화 파일을 만들지 않았다.

## 실제 검증과 자기 재검토

Node24.18.0/npm10.9.0, FE의 기존 script와 설치된 RNTL14 지침을 사용했다. 아래는 이번 실행 결과이며 과거 캡처·테스트 수치가 아니다.

| 실제 검사 | 결과·한계 |
| --- | --- |
| `npm.cmd run typecheck`, `npm.cmd run lint` | 구현·응답 미리보기 수정 뒤 각각 종료0. 테스트 타이머 보완 뒤 최종 재실행도 모두 종료0 |
| `npm.cmd test` | 304 suites/1611 tests 통과,1210.823초. 실행 도중 마지막 미리보기 회귀 테스트가 추가되어 전체 실행 하나를 최종 파일의 일괄 결과로 표현하지 않음 |
| 응답 집계·source/store·moderation·panel·실제 ReadingParityNavigation 재검사 | 마지막 미리보기 수정 후10 suites/70 tests 통과,68.07초. 두 Jest 플랫폼 모두 실행했고 navigation을 mock하지 않음 |
| 설정/기사 경고 재현·수정 | 전체 실행의 VirtualizedList/ExplanationContent `act` 경고를 추적. SettingsNavigation/ReferenceArticleView 두 테스트 파일의 별도 실행4 suites/30 tests 통과,96.451초에도 Android VirtualizedList 경고 재현. fake timer와 userEvent의 advanceTimers를 함께 사용한 후4 suites/30 tests 재통과,44.398초·해당 경고0. assertion·실제 navigation·기존 유한 timeout은 유지하고 경고를 숨기지 않음 |
| `expo.cmd export --platform all --output-dir <작업 전용 TEMP>` | 종료0. web992모듈/17984ms, iOS1449/24201ms, Android1444/33156ms. web JS와 iOS/Android Hermes hbc 생성; 실제 앱 설치·빌드·기기 성공이 아님. NO_COLOR/FORCE_COLOR 환경 경고는 별도이며 ENV 변경 없음 |
| 원본·추적 목록 inline 검사 | 63흐름/273단계/200화면,915개 ANALYSIS 로컬 링크,R1392/U263/C72,59작업/22묶음 대조. 미등록·중복R·미배정·공유 PNG 해시 충돌·관찰 문장 누락0. 전체 원본 기능의 새 실행 검증을 의미하지 않음 |
| 이미지 출처·baseline | 추가5자산의 원본 crop 픽셀/크기/ICC 일치. 기존 baseline의542코드 입력 해시 대조. 과거 readiness/evidenceContext는 승격·덮어쓰기하지 않음 |
| 문서/변경 보존 | 새 로컬 링크·AGENT 링크,`git diff --check` 확인. 기존8081 PID29280/HTTP200 유지; medium·ENV 수정 없음 |
| 실제 iOS/Android | 미실행. Windows에서 Xcode 실행 불가; adb/emulator/java 명령 및 `%LOCALAPPDATA%\Android\Sdk` 없음. Q07/묶음21에서 실행 환경과 기기를 준비해 검증 |

브라우저는 실제8081의 navigation·모달·입력·날짜 선택을 조작했다. 일반 URL에서 정책 응답0을 확인하고 명시적 비교 URL에서는272→작성273, 부모 응답 초안 복귀, 설정120%/Dark·Reading history 전용 재진입을 확인했다. 이력 카드의7/11/471도 표시됐다. Digest June12→June8 선택 취소→June12 유지→June8 확정, 사진/아바타 로딩,17→한국어 응답 작성18→닫은 카드18을 확인했다. 최종320px 재검사에서 가로 문서 폭320, 이미지1035×489와 아바타60×60 로딩,17 시트 열기·닫기 및 원래 Responses 버튼으로 포커스 복귀를 확인했다. 정책320px/120%/Dark의 보이는 조작 영역은 최소48px이며 수평 넘침은 없었다. 관찰 구간 앱 console error/Runtime exception0이다. CDP 한국어 입력과 CSS/reader 확대는 실제 OS IME·접근성 큰 글자 검증이 아니다.

마지막에는 작업용 브라우저를 일반 URL로 되돌리고 종료했다. 저장소 안에 검증 파일은 추가하지 않았다. 저장소 밖 작업 전용 TEMP의 `kostolany-parity-1-8-export-20261124`와 `kostolany-parity-1-8-review-20261124`는 자동 승인 검토가 재귀 삭제를 `blocked by policy`로 거절하여 남아 있다. 구체적인 추가 사유는 반환되지 않았고 삭제 우회는 하지 않았다.

재검토에서 본문 응답 미리보기의 집계 누락을 발견했다. 비교값17의 버튼과 함께 본문에는0이 표시되는 회귀를 먼저 실패시킨 뒤 ResponsePreview도 공통 집계를 사용하도록 수정했다. 버튼→본문→응답 시트→새 작성18→닫기 전후를 함께 검증한다. 새 비교 매핑은 Map을 사용하여 `toString` 같은 미등록 ID도0이며, 잘못된 집계/안전 정수 초과를 source 경계에서 거부한다.

초기 테스트에는 정책 버튼 이름과 차단 가시성의 소유자 조건을 잘못 가정한 부분이 있었다. 실제 접근성 label과 기존 owner 계약으로 테스트를 수정했으며 기대 동작을 약화하지 않았다. 브라우저 명령에서도 라디오의 장식 문자와 모달 준비 전 입력을 실제 label·포커스 대기로 바로잡았다. Goodbye Notion을 다른 긴 제목으로 기다린 명령과 발췌 전용 상세에 없는 본문 응답 미리보기를 기다린 명령은15초 제한으로 실패했다. 실제 제목·footer/sheet로 조건을 바로잡고 재실행했으며 본문 공통 집계는 별도 컴포넌트 회귀로 확인했다. 이 명령 오류를 앱 결함/console 오류로 합산하지 않는다. 최종 테스트에는 실패·skip·timeout이 없으며 제한 시간을 늘리지 않았다.

## 8081 재현 순서와 다음 범위

1. 일반 `http://localhost:8081/`에서 새로고침하고 mock A로 로그인한다. 기존 일반 모드의 정책 응답은0부터 시작한다.
2. 비교하려면 `http://localhost:8081/?parityResponses=reference-v1&parityHistory=reference-v1`을 새로 열고 mock A로 로그인한다. 이는 비교 데이터 요청이며 실제 인증/서비스 데이터가 아니다.
3. Home의 ChatGPT 기사→Responses에 초안 입력→Medium policy. 로고/아바타·첫 문단 강조·272를 확인하고 정책 응답 작성 뒤273 및 부모 초안 복귀를 확인한다.
4. 정책 더보기→Display settings에서120%/Dark를 적용하고 Library Reading history에서 Medium Rules 전용 화면을 다시 연다. 이력의 원본 정수7/11/471도 확인한다. 삭제 취소/확정은 기존 mock 정책이다.
5. Library→Digest에서 June12 사진→날짜 June8 선택 후 취소→June12 유지→June8 선택/Done→Goodbye Notion 사진/아바타/회원 별/2min/17을 확인한다. 작성 후18과 복귀를 확인한다. 1.3K의 정확한 응답 본문/집계는 제공되지 않는다.
6. 목록 저장·메모·다운로드 등 기존 소비 화면에서도 일반 모드와 비교 모드가 사용자 상태를 공유하거나 덮지 않는지 확인한다. 전체 새로고침은 메모리 상태를 초기화한다. 종료 시 비교 URL과 임시 런타임 설정을 제거한다.

**Parity9로 진행 가능하다.** 선행인 묶음2 공통 기반을 유지했고 이번 영향 범위의 구현·실제 navigation·웹 확인·회귀를 마쳤다. 원본 근거 부족·대체 서체/벡터의 시각 차이·실제 기기 대기는 담당과 종료 조건을 명시했으며 작성/초안/발행 보완의 선행을 막는 재현 결함은 발견하지 않았다. 이는 Parity1~8의 모든 화면이 원본과 같거나 기기 검증까지 끝났다는 판정이 아니다.

**Parity9의 대상은 Q04·Q06·V06~V10이다.** [묶음9](MEDIUM_PARITY/EXECUTION_PLAN.md#batch-09)에 적힌22화면·F07~F11의 작성/서식/이미지/멘션/초안/발행, 삭제·연속 선택의 원본 근거 판정, autosave/exit/retry·발행 멱등·선택 범위·키보드 흐름을 따른다. 이번에는9를 시작하지 않았다.

tools/evidence/별도 검증 스크립트 폴더/캡처 파일/검증 로그/검증 manifest는 생성·복원하지 않는다. 기존8081·ENV·medium 원본을 보존한다. 기존 baseline JSON은 현재 코드/배정 설명만 수동 갱신하고 과거 evidenceContext·이미지 해시·readiness를 새 실행 증거로 덮지 않는다.

<a id="pre-commit-review"></a>

## 커밋 전 추가 검토 — 2026-11-24

- 변경 코드·테스트·문서를 FRONT_AGENT 7개 규칙에 다시 대조했다. 응답 집계의 전체 소비자, 사용자/대상 ID 범위, 실패·재시도·중복 작성·숨김·삭제·안전 정수 검증과 실제 navigation을 추적했다. 같은 작업자의 추가 자기 검토이며 독립 리뷰가 아니다.
- S008/S116/S132 원본 PNG3개를 다시 직접 열고 정책/Filtering digest 분석과 비교했다. 자산5개의 crop 픽셀·크기·ICC와 출처를 다시 검증했다. 앞선91PNG 검토를 이번에 모두 반복했다고 기록하지 않는다.
- 발견한 검증 누락: 비교 응답 A→B→A 테스트가 작성 완료된 응답만 확인하고 전환 직전 미제출 초안은 넣지 않았다. A의 응답273 표시 뒤 미제출 한국어 초안을 넣고, B의272와 빈 입력, A 복귀의273과 빈 입력을 함께 확인하도록 보강했다. 새 제품 동작은 추가하지 않았다.
- 이번 실행의 관련9파일·두 Jest 플랫폼은18 suites/108 tests 통과,109.99초다. 실행 도중 보강한 초안 사례는 ResponsesPanel 파일을 별도로 재실행하여2 suites/20 tests 통과,39.483초를 확인했다. 실패·skip·act 경고는 없었다. 전체304 suites 실행과 번들은 위 최초 작업의 결과이며 이번 재실행으로 표현하지 않는다.
- 타입 검사·lint는 이번에도 종료0이다. 원본63흐름/273단계/200화면,915개 분석 링크,R1392/U263/C72,59항목의22묶음 배정 검사에서 미등록·중복R·미배정·끊긴 연결0을 확인했다. 최종 새 문서 링크157개와 앵커·기존 AGENT 링크도 유효했다. 원본 화면 readiness/evidenceContext와 과거 자산 정보가 바뀌지 않았음을 확인했다.
- 이번 브라우저 재실행은 자동 승인 검토가 숨김 Chrome 시작 명령을 `blocked by policy`로 거절했다. 추가 사유는 반환되지 않았고 우회하지 않았다. 따라서 이번 실제 브라우저·console·새 렌더 비교는 미실행이며 앞선 작업의 웹 확인과 구분한다. 실제 iOS/Android도 이번에 재실행하지 않았다. 기존8081 프로세스는 유지한다.
- 추가 제품 코드 결함은 발견하지 못했다. 알려진 서체/아이콘/간격 차이·묶음10의 빈 날짜 구분자·원본 미확인·기기 대기는 위 담당과 종료 조건을 유지한다. 이 잔여를 숨기지 않은 상태에서 이번 보완 변경을 커밋하며 Parity9는 시작하지 않는다.

**후속 Parity10 연결:** [Goodbye Notion 빈 날짜 구분자 수정과 회귀 검사](FE_MEDIUM_PARITY_10_RESULT.md#changes). 위 인계 항목의 코드 잔여는 해결했으며 발행일을 추정하지 않았다. 실제 렌더 비교/자산 잔여는10에서 계속 관리한다.
