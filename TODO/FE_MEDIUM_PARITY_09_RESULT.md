# Parity 9 — 작성·초안·발행

**최신 커밋 전 재검토 — 2026-11-24:** [11절](#pre-commit-review). 추가 코드 결함 없이 새 관련90 tests·타입/lint를 통과했으며 사용자 요청으로 추가 보완분을 로컬 커밋 대상으로 확정했다. 아래 미커밋은 각 당시 상태다. 묶음9 전체 종료 미충족과10 미착수는 유지한다.

**최신 추가 보완 — 2026-11-24:** 기존 변경은 사용자 요청으로 `30907e2`에 커밋했다. 이후 native 부분 보완·검증·종료 판정은 [10절](#additional-review)을 따른다. 아래1~9절은 최초 실행 이력이다. 추가 변경은 미커밋이며 push·배포·묶음10은 실행하지 않았다. 묶음9 전체 종료 조건은 아직 미충족이다.

2026-11-24, Windows, 시작 HEAD `efbf452a41ece8c0daab9eb831b392042c027268`, 시작 작업 트리 clean.

**구현 보완·자동 검증과 원본 시각 일치의 완료를 구분한다.** 작성/저장/재개/발행의 기존 mock을 유지하며 토픽 스크롤, 사진 두 열, 멘션 표시를 보정했다. 재검토에서 Drafts의 경과 시간 갱신과 이미지 선택 종료 후 입력 포커스 복귀 누락을 수정했다. 실제 브라우저 시작은 자동 승인 검토에 차단되어 현재 렌더·console·작은 폭/큰 글자 실측은 검증 대기다. Q04 원본 근거 대기, Q06 연속 선택 미지원, 원본 사진·서체 차이와 실제 기기 검증은 완료로 바꾸지 않는다.

## 1. 적용 규칙과 보존

- [AGENT](../AGENT/README.md), [공통 품질](../AGENT/SOFTWARE_AGENT/COMMON/QUALITY_AND_WORKFLOW.md), [현재 상태](../AGENT/SOFTWARE_AGENT/COMMON/IMPLEMENTATION_STATUS.md), [UX](../AGENT/UXUI_AGENT/README.md)를 확인했다.
- FRONT_AGENT의 [README](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/README.md), [ARCHITECTURE](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/ARCHITECTURE.md), [CODE_CONVENTIONS](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/CODE_CONVENTIONS.md), [STATE_AND_DATA](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/STATE_AND_DATA.md), [MOBILE_UI_AND_PLATFORM](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/MOBILE_UI_AND_PLATFORM.md), [PERFORMANCE_AND_SECURITY](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/PERFORMANCE_AND_SECURITY.md), [TESTING_AND_DELIVERY](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/TESTING_AND_DELIVERY.md)를 적용했다. 새 주석은 한글 한 문장 한 줄, 기능 소유권과 기존 source/provider/navigation 경계를 유지한다.
- [1~8 커밋 전 검토](FE_MEDIUM_PARITY_01_08_REVIEW.md#pre-commit-review), AUDIT/BACKLOG/REVIEW와 [묶음9](MEDIUM_PARITY/EXECUTION_PLAN.md#batch-09), 비교 프로토콜/기준, 자산/자체 UI 기준, R/T/U/C를 대조했다. 이전 결과를 이번 실행 통과로 사용하지 않았다.
- 8081 PID29280을 재시작하지 않았다. ENV, medium 원본, 의존성·lockfile, 외부 서비스 설정은 변경하지 않았다. tools/evidence/별도 검증 스크립트/캡처/로그/manifest 파일을 생성·복원하지 않는다. 터미널 inline 조회와 메모리 이미지 열람만 사용했다.
- 커밋·push·배포·묶음10은 수행하지 않았다. 실제 인증/DB/결제/AI/Unsplash/Storage/알림 발송도 연결하지 않았다.

## 2. 실제 원본 검토 범위

| 구분 | 이번 확인 | 한계 |
| --- | --- | --- |
| 전체 목록 | 63흐름·273단계·고유200화면, R1392/U263/C72, 보완59항목의22묶음 배정, 분석 내 로컬 링크915개 검사 | 등록·링크·배정 검사이며 전체200화면의 새 동작/이미지 검증이 아님 |
| F07 | [Adding topics](<../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>) 전체와 PNG01~06 | 검색/지우기/칩/체크/0·3/5/Save/미리보기 관찰 |
| F08 | [Publishing a story](<../medium/flows/Home/Publishing a story/ANALYSIS.md>) 전체와 PNG01~11 | 직접02~10과 진입 Home01·발행 후 Profile11의 맥락 |
| F09 | [Changing text format](<../medium/flows/Home/Publishing a story/Changing text format/ANALYSIS.md>) 전체와 PNG01~05 | 회색 문자 스타일·인용선·목록·구분선·사진 선택 |
| F10 | [Drafts](<../medium/flows/Home/Publishing a story/Drafts/ANALYSIS.md>) 전체와 PNG01~03 | 네 메뉴 순서와 Drafts/Edited/Close; 삭제 실행은 없음 |
| F11 | [Mentioning a user](<../medium/flows/Home/Publishing a story/Mentioning a user/ANALYSIS.md>) 전체와 PNG01~04 | 안내→세 후보→녹색 이름, 후보가 툴바 자리를 차지하는 상태 |

29단계 PNG를 흐름별로 열람했다. 공유 장면을 중복된 고유 화면으로 세지 않는다. 직접22화면 외 Home/프로필 연결 장면을 포함한 고유24화면이다. 이번 작업에서 다른 흐름의 PNG 전부를 새로 열람하지 않았다. medium/README·REVIEW_R2의 과거 전수 관찰과 이번 범위를 구분한다.

원본 물리 크기는1179×2556px, 열람용 메모리 시트에서는 각 프레임을390×844로 축소하고 위에 파일 번호/물리 크기30px를 붙였다. crop·원본 픽셀 변경·파일 저장은 없다. 이 열람 크기를 실제 기기의 논리 크기/DPR로 확정하지 않는다. 현재 앱의 전후 캡처는 브라우저 차단으로 만들지 못했으므로 원본과 새 렌더의 쌍 비교 완료가 아니다. 공식 설명은 분석 문서의2026-11-18 보관 기록이며 이번에 최신 Medium을 조회하거나 계정으로 실행한 결과가 아니다.

## 3. 변경·연결과 요구사항 판정

| 대상 | 변경·확인 | 현재 상태 |
| --- | --- | --- |
| V06 / C44·C45 | [PublishTopics](../FE/src/features/editor/PublishTopics.tsx)의 설명·검색·칩을 결과와 같은 스크롤에 넣고 Save는 별도로 유지했다. 0개 저장, 검색X/칩X,최대5,취소,Edit,Publication 선택/취소,Unlisted,발행 실패/응답 유실/재시도는 기존 source/navigation으로 검증한다. | 기능/mock 자동 검증; 새 스크롤의 실제 렌더와 키보드 실측 대기 |
| V07 / C40 | 제목/본문·선택 서식·링크 유효성·회색 스타일·인용·목록·구분선·코드의 기존 모델을 확인했다. 원본에 실행 모습이 없는 코드 블록/반복 탭 정책을 원본 사실로 만들지 않았다. | 자동 검증; native 인용선 등 알려진 구현 차이는 아래 잔여 |
| V08 / C41 | [ImagePickerSheet](../FE/src/features/editor/ImagePickerSheet.tsx)의 행 기반2열을 독립2열로 바꿔 높이가 다른 사진 아래 빈 행 간격을 없앴다. 유한 로컬 목록만 ScrollView로 표시하며 키보드 회피를 추가했다. 선택/준비 취소는 이전 입력으로, 성공은 이미지 뒤 본문으로 포커스를 요청한다. 새 입력 마운트 다음 프레임에 복귀하며 이탈/공급부 교체/새 선택 시 예약을 취소한다. 기존 검색·실패·재시도·lease 수명은 유지한다. | 구조 보완·행동/입력 ref 요청 자동 검증; 원본 자산·실제 렌더/OS 키보드 대기 |
| V09 / C42 | 메뉴 네 항목과 저장 후 Drafts→재개를 확인했다. [DraftsScreen](../FE/src/features/editor/DraftsScreen.tsx)은 열린 동안60초 간격으로 Edited 경과 시간만 갱신하고 이탈 때 타이머를 정리한다. 저장/조회 요청·updatedAt을 이 갱신으로 바꾸지 않는다. | 구현·자동 검증; 원본 서버 자동 저장/영속성과 별개 |
| V10 / C43 | [StoryEditorScreen](../FE/src/features/editor/StoryEditorScreen.tsx)에서 @검색 중 서식 툴바를 후보 영역으로 대체하고 선택 후 복원한다. [MentionSuggestions](../FE/src/features/editor/MentionSuggestions.tsx)는 이름·핸들·제공된 아바타를 표시하고 미제공 이미지는 중립 원으로 표시한다. 아바타는 후보 표시 데이터이며 저장하는 MentionTarget에는 섞지 않는다. | 구현·자동 검증; Sam 후보2명의 실제 사진 자산과 새 렌더는 잔여 |
| Q04 | F10 전체와 DraftSource에 사용자 삭제 실행/명령 없음. 발행의 원자적 초안 제거와 사용자 삭제는 다르다. 삭제 UI를 추가하지 않았다. | 원본 근거 대기 |
| Q06 | RichDocumentBody가 이미지 앞뒤를 별도 RichBody 입력으로 나눈다. 하나의 선택으로 경계를 가로지르지 못한다. 같은 구간의 선택/서식/이미지 삽입·삭제는 검증한다. | 알려진 미지원; 원본/제품 결정 대기, native IME와 별개 |

세션의 문서·발행 선택은 createDraftSession, 확정 초안/발행 글은 DraftSource, 후보/검색/메뉴는 화면, 준비 중 이미지는 useImageInsertion이 소유한다. 계정 ID와 인증 revision, 문서/요청 identity, AbortController와 image lease를 다시 추적했다. 기존600ms 자동 저장·직렬 flush·발행 operationId/receipt·응답 유실의 uncertain 잠금·계정 전환 정리를 재사용했다. 같은 앱 실행 안 A의 확정 초안은 A 복귀에 남지만 편집기/이미지 준비/오류/선택은 새 인증 수명에 재사용하지 않는다. 앱 재시작 영속 저장은 구현하지 않았다.

### 직접22화면의 모든 R과 T

각 행의 `R-S번호-*`는 해당 REQUIREMENTS 절에 등록된 L/D/S 및 모든 C 요구를 포함한다. 관찰 문장은 삭제하지 않는다. 기능 자동 검증과 시각 검증을 아래처럼 나누며 어떤 행도 `ready`로 승격하지 않는다.

| 화면·R 접두사 | T 단계 | 확인한 요소·현재 구현 | 남은 차이/검증 |
| --- | --- | --- | --- |
| S015 | F11-04 | 녹색 이름·선택 후 커서·툴바 복원, Close/더보기/Next/각 도구 | 원본 서체·실제 키보드/렌더 |
| S017 | F09-05 | 점3개 구분선·사진 선택/삭제X·Next | native 구분선 배치, 이미지/서체 |
| S018 | F09-04 | bullet·목록 도구 선택·Next | native hanging indent, 실제 렌더 |
| S023 | F07-01,F08-08 | Story preview/Edit/Topics/Publication/Publish/닫기 | 원본 이미지·서체·간격, 자체 안내 |
| S029 | F07-03 | Music 검색·유사 토픽·followers·검색X·Save | 새 스크롤·실제 글자/줄바꿈 |
| S030 | F10-02 | Drafts→Submit to publication→Add or edit topics→Edit story preview | 팝오버/큰 글자 실측 |
| S031 | F09-02 | 회색 산세리프 스타일·도구 선택·Next | 대체 폰트·키보드 |
| S042 | F08-02 | 빈 문서·Close/더보기/녹색Next/7도구/입력 | 제목과 본문 분리 모델; native 입력/IME |
| S044 | F08-10 | 스크롤 헤더·Publication/Unlisted 안내·토글·Publish | 스크롤 offset·실제 렌더 |
| S060 | F08-03 | 제목·본문·도구·커서의 기존 모델 | 원본 문자열은 사용자 입력으로 재현, 기본값 강제 안 함 |
| S065 | F07-04 | Music 칩X/행 체크/검색X/Save | 새 레이아웃 렌더 |
| S087 | F08-05 | 사진 검색/취소/두 독립 열/credit | 사진/작가 자산 차이; 키보드/큰 글자 |
| S115 | F07-05 | 3/5와 Music/Culture/Art 칩 제거/Save | 실제 렌더·간격 |
| S118 | F07-02 | 0/5·최대5 안내·Your topics·빈 선택Save | 실제 렌더·원본 폰트 |
| S126 | F08-06 | 준비 덮개·스피너·녹색 경계·X·실패/재시도·취소 후 입력 복귀 요청 | pending은 하단 표시 후 확정 위치로 삽입하는 기존 mock 정책; 원본 중간 삽입 미수록, 사진/키보드 대기 |
| S137 | F08-07,F09-01,F10-01,F11-01 | 삽입된 사진/본문·도구·닫기/Next | 원본 산/호수 사진과 다름; 실제 키보드 |
| S139 | F10-03 | Drafts/Close/초안 행/Edited/재개 | actual sheet inset·원본1minute 동일 시간 캡처 대기 |
| S146 | F07-06,F08-09 | 미리보기 토픽 칩·Edit/Publication/Publish | 원본 이미지·본문 줄바꿈/서체 |
| S148 | F08-04 | Take photo/Choose from library/Unsplash/Cancel | native 권한·실제 소스 시트 |
| S180 | F11-02 | @ 안내가 툴바 자리를 차지함 | 실제 키보드/렌더 |
| S183 | F09-03 | 웹 인용선·이탤릭/선택 도구; 문서/본문 보존 | native 인용선 미구현, 검증 대기로 축소하지 않음 |
| S196 | F11-03 | Sam Lee/@samlee, LI Sam/@samlee-hk, Sam Lee/@sam.lee의3후보·고유ID 선택 | 두 사진 자산 없음; 실제 렌더 |

C01/C02/C03은 대체 서체·테마·48px·스크롤·접근성의 공통 기준으로 적용했다. C09/C36/C53은 발행 후 기사·라이브러리·프로필 소비 회귀이며 이번에 해당 기능 전체를 신규 구현하지 않았다. C58~C61,C65~C67,C71의 오디오/멤버십/설정/기기 계약은 공유 경계와 후속 담당을 유지한다. 이 배정이 해당 기능 전체 완료를 뜻하지 않는다.

<a id="unknowns"></a>

## 4. Q04/Q06와 U의 질문별 판정

아래 `mock`은 현재 구현 정책이며 원본에서 실제 실행한 결과가 아니다. 모든 원본 미수록 질문의 종료 조건은 해당 버전/계정/행동을 보여 주는 근거 확보 또는 명시적인 제품 범위 결정이다.

| U | 원본 미확인과 현재 판정 |
| --- | --- |
| S015 | 알림 발송 시점/수신은 Q08 제외. 대상 삭제 후 멘션 처리 정책은 원본 근거 대기; 보존된 ID/이름을 현재 문서에서 사용 |
| S017 | 사진 삭제 확인/Undo의 원본 실행 미수록. mock은 즉시 제거하며 Undo 신규 도입 안 함 |
| S018 | 중첩·번호·줄바꿈의 원본 규칙 미수록. mock 단일 깊이 bullet/numbered와 paragraph 전이 유지; 중첩 미지원 |
| S023 | 원본 발행 자격/필수 입력/공개 효력 미확인. mock 로그인 owner·제목+본문 또는 이미지 필요, public/unlisted 분리 |
| S029 | 실제 검색 일치/동명 규칙 미확인. mock 악센트/공백/대소문자 정규화 부분 일치·고유topic ID |
| S030 | 실제 Publication 제출 자격/저장 보장 미확인. mock publication 선택, 심사/제출 외부 연동 제외; Drafts 이동 전 flush |
| S031 | 원본 스타일 이름/내부 표현 미확인. 기존 heading/subheading 모델을 원본 스키마로 단정하지 않음 |
| S042 | 빈 Next 실제 결과/자동 저장 시점 미확인. mock 미리보기는 열고 빈 글 발행 차단, 내용 있는 문서600ms 저장 |
| S044 | 실제 링크 인증/검색 노출 미확인. 로컬 unlisted 목록 정책만 있으며 외부 URL·검색엔진 연동 제외 |
| S060 | 원본 저장 성공/글자 제한/필수 제목 미확인. mock 메모리 저장·발행 제목 검사; 원본 글자 제한을 새로 도입 안 함 |
| S065 | 원본 중복 처리 미확인. mock ID toggle와 발행 검증으로 중복 방지 |
| S087 | 실제 Unsplash 검색 요청/사용권/출처 계약 미확인. 로컬 fixture·credit만 사용, 실제 API/Storage 제외 |
| S115 | 원본 취소 복원 미확인. mock 임시 선택은 취소 시 폐기하고 저장된 토픽 유지 |
| S118 | 원본6번째/저장 실패 미수록. mock6번째 오류·선택 유지·저장 실패 재시도; 최소1개를 강제하지 않음 |
| S126 | 원본 스피너가 업로드인지 다운로드인지 미확인. 현재 local prepare 과정이며 외부 전송 없음 |
| S137 | 원본 이미지 이후 자동 저장 성공 미확인. mock 확정 이미지 문서 저장/재개 자동 검증 |
| S139 | 원본 자동 저장 trigger/충돌/offline 미확인. mock600ms·version·직렬화·실패 보존; 서버 동기화/재실행 영속성 제외 |
| S146 | 최대5 안내는 관찰됨. 6번째/제거/선택순서/서버 검사 실제 결과는 미확인; mock상한·chip제거·선택순서·검증 유지 |
| S148 | 원본 camera/library 권한 미수록. 기존 adapter 대역 검증과 실제 OS 권한 Q07/21 대기를 분리 |
| S180 | 실제 최소 길이/검색범위 미확인. mock @만 있으면 안내, 한 글자부터 로컬 writer 이름/핸들 검색 |
| S183 | 원본 반복탭/해제 미수록. mock paragraph→quote→pullquote 순환, native 인용선은 별도 구현 잔여 |
| S196 | 원본 정렬/페이지 미확인. mock directory 순서의 유한 결과, 페이지 없음; 두 사진 미확보는 알려진 자산 차이 |
| F07 | 상한/6번째·chip제거·중복·0건·실패·취소는 위 mock으로 분기 검증; 원본 실행 미수록 유지 |
| F08 | Close→저장,Publication,Unlisted On,Edit,빈 글,이미지/발행 실패는 자체 mock 정책·자동 검증. 부모 Home/종료Profile의 전체 보정은17/15 |
| F09 | 서식 해제/범위·코드는 기존 모델 검증, 중첩·이미지 경계 선택은 미지원. 저장 실패는mock검증, 원본 조합/코드 실행 장면은 없음 |
| F10 | 재개/여러 초안/빈 목록/실패는mock검증. 사용자 삭제Q04 원본 대기; 발행 후 제거와 구분. offline 충돌/영속성 제외 |
| F11 | 0건/동명ID/멘션 제거는mock검증, 발행 후 DocumentReader의 ID 기반 프로필 이동은 자체 연결. 실제 알림은 제외, 원본 이동/삭제 정책은 미확인 |

Q06의 결정 선택지는 현재 구간별 선택을 유지하거나 연속 선택 편집 모델을 별도 작업으로 승인하는 것이다. 후자는 native 입력/IME·selection offset·서식/이미지 이동·초안 스키마 영향 검토가 필요하다. 이번에는 선택 모델을 확대하지 않았다. Q04도 원본 근거 또는 제품 요청이 있을 때 사용자 삭제/취소/실패/소유권 계약을 추가한다.

## 5. 이번 실행 검증

Node24.18.0/npm10.9.0, 설치된 RNTL14.1.0의 비동기 API 지침을 사용했다. Jest iOS/Android 프로젝트는 플랫폼 대역이며 실기기 실행이 아니다.

| 검사 | 실제 결과·한계 |
| --- | --- |
| `npm.cmd run typecheck` | 종료0 |
| `npm.cmd run lint` | 종료0, max-warnings0 |
| 초기 관련10파일 | 20 suites/86 tests,118.479초. 작업 중의 기준 검사이며 최종 전체 결과로 대체하지 않음 |
| 연결 보강 후3파일 | DraftsNavigation/PublishingNavigation/ImagePickerSheet,6 suites/26 tests,49.951초 통과 |
| 추가 DraftsScreen 회귀 | 최초2실패: unmount 직후 전역 timer0을 기대했지만 RN 터치/목록 유한 timer3개가 남음. 편집기 결함으로 기록하지 않음. 유한 timer를 진행한 뒤 반복 timer가 남지 않는 검증으로 수정;2 suites/2 tests,8.289초 통과 |
| 전체 테스트 | `npm.cmd test`,306 suites/1614 tests 통과,1140.676초. 포커스 추가 보완 전에 시작한 실행이며 마지막 수정의 영향 범위는 아래4파일 재검증으로 확인; 최종 수정 후 전체를 다시 실행했다고 표현하지 않음 |
| 포커스 회귀 재현 | 수정 전 새 회귀의 iOS1건 실패: 사진 선택 취소 후 native 입력 focus 요청 기대1/실제0. 14.087초; 다른4건은 이름 필터로 미실행 |
| 포커스 수정 후 연결 재검증 | EditorImagesNavigation/EditorNavigation/DraftsNavigation/PublishingNavigation,8 suites/32 tests,71.350초 통과. native 입력 ref의 focus 호출 대상/커서, 기존 늦은 응답·계정 전환 회귀 포함 |
| 전체 검사 경고의 재확인 | 전체 실행의 iOS AuthBoundaryNavigation에서 VirtualizedList의 `act` 밖 갱신 경고1건. 해당 파일 재실행은2 suites/10 tests,24.527초 통과하고 경고 재현 없음. 원인 확정/수정으로 처리하지 않으며 앱 브라우저 console 오류와 구분 |
| Metro JS | 마지막 포커스 수정 후 web/iOS/Android HTTP200, 메모리 JS 구문 검사 통과; 아래 크기/해시. 실제 렌더/Hermes 실행과 다름 |
| 8081 | 기존 HTTP200과 PID29280 유지. 서버 응답은 사용자 조작/console 검증의 대체가 아님 |
| 브라우저 | 숨김 Chrome 시작이 자동 승인 검토의 `blocked by policy`로 거절됨. 추가 사유 없음, 우회하지 않음. 현재 브라우저 조작·console·렌더 캡처·320폭/큰 글자/포커스 실측 미실행 |
| native | adb/emulator/java/xcodebuild가 PATH에 없고 기본 Android SDK 폴더도 없음; Windows에서 Xcode 사용 불가. 실제 iOS/Android 빌드·설치·키보드·IME·Safe Area·VoiceOver/TalkBack 미실행 |

마지막 코드의 Metro production JS를 기존8081에서 `index.ts.bundle`의 platform=web/ios/android, dev=false/hot=false/lazy=false/minify=true, transform.engine=hermes, transform.routerRoot=src/app, unstable_transformProfile=hermes-stable로 요청했다. Buffer와 `vm.Script`에서만 검사했으며 실행·파일 저장·Hermes bytecode 생성은 하지 않았다. `export:*` 산출물 대신 이 검사를 사용한 것은 이번 캡처/로그/manifest 생성 금지 경계에 따른다.

| 플랫폼 | bytes | 메모리 응답 SHA256 |
| --- | ---: | --- |
| web | 2046699 | `b59235f51f57a2971243193ff0dd36460ff4839e6d5f08854ff2fb02b4784794` |
| iOS | 2351916 | `fbada0509ac6b4ccc5c902766fd3cd43dc3724532ee24fa43b7c0f4eca297fd5` |
| Android | 2352655 | `dd38d2ef837645f2d5f1cbca8de707b29c9330ba1c18da222ece46c3821cade0` |

새로 보강한 실제 navigation 경로는 작성→멘션/서식→이미지→저장→Drafts 재개→다른 이미지 추가→이탈→프로필 초안 재개→토픽→발행→작성 상세다. 최종 문서의 본문/서식/이미지2개/멘션 ID가 유지되고 발행 글1개·초안0개가 됨을 확인한다. 0/5 Save의 활성/결과, 멘션 중 도구 숨김과 선택 후 커서8/툴바 복원도 검사한다. navigation 자체를 mock하지 않았다.

기존 회귀는 실패·재시도/빠른 입력·저장 직렬화/발행 중복·응답 유실/늦은 성공·실패/이미지 취소·문서 변경·공급부 교체·이탈·lease 정리/A→B→A 및 같은A 재로그인/표시이름 변경과 인증revision 분리를 검증한다. 합성 focus/selection/changeText와 RN Jest 입력 ref spy를 실제 OS 키보드·한국어 IME로 표현하지 않는다. 실패 주입은 테스트 source에만 하며 정상 preview 설정을 바꾸지 않았다.

| 요구·경계 | 이번 실행에서 포함한 검증 코드 |
| --- | --- |
| V06 발행/토픽·중복/늦은 응답 | [PublishingNavigation](../FE/src/app/navigation/PublishingNavigation.test.tsx), [publishing](../FE/src/features/editor/publishing.test.ts) |
| V07 선택/서식·Q06 구간 모델 | [EditorNavigation](../FE/src/app/navigation/EditorNavigation.test.tsx), [editorModel](../FE/src/features/editor/editorModel.test.ts), [editorImages](../FE/src/features/editor/editorImages.test.ts) |
| V08 준비/취소/재시도/계정/포커스 | [EditorImagesNavigation](../FE/src/app/navigation/EditorImagesNavigation.test.tsx), [ImagePickerSheet](../FE/src/features/editor/ImagePickerSheet.test.tsx) |
| V09 자동 저장/재개·발행 연결/시간 | [DraftsNavigation](../FE/src/app/navigation/DraftsNavigation.test.tsx), [draftSession](../FE/src/features/editor/draftSession.test.ts), [DraftsScreen](../FE/src/features/editor/DraftsScreen.test.tsx) |
| V10 후보/동명/선택·툴바/문서 보존 | DraftsNavigation, [editorMentions](../FE/src/features/editor/editorMentions.test.ts) |

<a id="review"></a>

## 6. 구현 후 자기 검토

같은 작업자가 코드·테스트·원본29단계·R/T/U/C·문서 상태를 다시 대조했다. 독립 리뷰는 수행하지 않았다. 테스트 통과를 원본 시각 일치로 사용하지 않는다.

- 첫 보정 후 재검토에서 Drafts의 Edited 표시가 시간이 지나도 바뀌지 않는 것을 발견했다. Date.now를 렌더에서만 읽고 다시 렌더하는 신호가 없던 원인이다. 분 단위 화면 타이머/FlatList extraData와 unmount 정리를 추가했으며 저장/재조회 없이 같은 draft ID가 유지되는 회귀를 통과했다.
- 후보 avatar가 문서 MentionTarget에 포함되면 표시 자산이 저장 계약으로 섞일 수 있어 후보의 `target`과 `avatar`를 분리했다. 선택 callback에는 기존 target만 전달한다.
- 원본 S183의 인용선은 웹 RichBody에는 있지만 native RichBody TextInput의 문단 style에는 없다. S018 들여쓰기와 S017 가운데 구분선도 native 편집 렌더의 알려진 차이다. 단순한 실제 기기 미검증으로 기록하지 않고 구현 잔여로 분류했다. 현재 하나의 TextInput 안의 중첩 Text는 문단별 View 배치를 제공하지 않으며, 문단별 입력으로 임의 분리하면 현재 가능한 같은 구간 내 연속 선택/IME/offset 계약도 바뀐다. 여기서는 시각 속성만 추가하고 동작한다고 주장하거나 새 편집 모델·native 의존성을 도입하지 않았다. native 문단 렌더를 지원하는 방식과 선택 보존을 실제 기기에서 함께 보완해야 한다.
- S126의 pending 사진은 편집 스크롤 맨 아래에 표시되고 확정 후 선택한 문단 끝에 삽입된다. 이는 확인한 현재 mock 정책이다. 원본은 본문 끝 사진만 수록하므로 중간 삽입 pending 위치의 원본 일치/불일치를 확정하지 않으며, 제품 UX 보완 후보와 연속 선택Q06을 구분한다.
- 이미지 선택기를 열 때 입력을 blur한 뒤 취소/삽입 성공에서는 복귀 요청이 없었다. 새 native 입력 ref 회귀가 실제로0회 호출로 실패한 것을 확인한 뒤 다음 프레임의 제목/본문 복귀를 보완했다. 재개·발행·서식·이미지의 관련8 suites/32 tests와 타입/lint·3플랫폼 JS를 다시 통과했다. 실제 OS 키보드 및 웹 focus 실측은 여전히 미검증이다.
- 실제 브라우저가 없으므로 첫 구현의 캡처를 다시 검토했다고 주장하지 않는다. 비교 준비 상태/readiness·과거 evidenceContext와 기존 증거는 유지한다.
- 기존 AuthBoundaryNavigation의 VirtualizedList 경고는 단독 재실행에서 재현되지 않았다. 이 파일의 목록/인증 흐름은 이번 편집기 변경을 소비하지 않으며 테스트 시간 제어의 원인 확정은 미완료다. 묶음14와 최종22의 재검증에 연결하고, 경고를 숨기는 console mock이나 범위 밖 인증 수정을 추가하지 않았다.

최종 코드의 타입/lint, 영향받은4개 navigation 파일과3플랫폼 JS 구문 검사를 다시 통과했다. 전체 검사는306 suites/1614 tests이며 포커스 추가 수정 전 실행 범위라는 제한을 명시했다. 시간초과로 종료하거나 timeout을 올려 실패를 숨긴 검사는 없다. 작성→발행을 추가한 기존 통합 테스트의 제한만30초에서45초로 조정했으며 해당 테스트는 제한 이내에 통과했다.

문서의 원본 R1392/T273/U263/C72와 과거 관찰/증거는 보존했다. 기존 comparisonBaseline의 코드 해시와 현재 판정만 갱신하며 기존 codeInputs 순서는 유지하고 새 정상 테스트1파일만 목록에 추가했다. 새 manifest를 만들지 않았고 삭제된 tools/evidence 입력4경로의 과거 해시는 갱신·복원하지 않았다. 새 로컬 링크109개/앵커의 오류0, 원본 PNG 크기/해시·등록·배정 오류0, 현재 코드543파일 해시 불일치0, `git diff --check` 통과를 확인했다. Git이 안내한 기존 LF→CRLF 변환 경고는 diff 오류와 구분했다. 변경된 추적 파일30개와 신규 테스트/결과 문서2개 외 medium/ENV/의존성/금지 산출물 변경은 없고 HEAD와8081 PID29280을 유지했다.

## 7. 잔여·담당·종료 조건

| 분류 | 남은 항목 | 담당·종료 조건 |
| --- | --- | --- |
| 구현 잔여 | native 인용선/목록 들여쓰기/구분선 배치 | 묶음9 V07. 문단 렌더 방식과 기존 선택/IME 계약을 함께 보완하고 실제 native/웹 비교 후 종료; Q07와 분리 |
| 자체 UX 판정 | 중간 삽입 pending은 하단에 표시하고 확정 시 문단 끝으로 이동 | 묶음9 V08. 원본에는 중간 삽입이 없으므로 원본 확인 또는 제품 결정 후 필요 시 표시 위치 보완; 본문/이미지 저장 결함으로 오판하지 않음 |
| 자산·시각 잔여 | 원본 Unsplash 사진/작가, 산·호수 삽입 이미지, 멘션 후보2명의 사진, 폰트/도구 glyph/정확 간격 | Q02/V06~V10·묶음9. 출처/사용범위가 확인된 자산과 같은 입력 조건으로 렌더 비교; 대체 fixture를 원본으로 위장하지 않음 |
| 검증 대기 | 변경 후 웹 렌더·console·작은 폭·큰 글자·긴 한국어·키보드 focus·모달 복귀 | 묶음9. 허용되는 브라우저 환경에서 아래 순서와 원본쌍 확인 |
| 알려진 미지원/근거 대기 | Q06 연속 선택, Q04 사용자 삭제, U의 원본 미수록 분기 | 묶음9/Q03. 원본 근거 또는 명시적 제품 결정을 확보하여 채택 범위 확정 |
| 기기 검증 대기 | actual iOS/Android IME·Safe Area·스크린리더·권한/OS picker | Q07/묶음21 및9의 소비 검증. 실제 빌드/기기 필요 |
| 다른 묶음 | 일반 기사/응답, 프로필/Public 목록 전체 보정, Home 전체 보정 | 10/15/17. 이번 연결 검사와 전체 보정을 구분 |
| 다른 묶음·검증 경고 | AuthBoundaryNavigation의 간헐적인 VirtualizedList `act` 경고 | 14/22. 전체 실행 조건에서 재현하고 timer/act 원인 확인 후 경고 없는 검증; 단독 재실행10건 통과만으로 해결 판정하지 않음 |
| 범위 제외 | 실제 발행·외부URL/알림·Unsplash/Storage·서버 동기화·영속 초안 | Q08. 이번 대기 작업으로 잘못 집계하지 않음 |

## 8. 8081에서 이어서 확인할 순서

이 절은 브라우저 재현 지침이며 이번 브라우저 실행 기록이 아니다. 기존8081을 그대로 사용한다.

1. 새로고침 후 mock A로 로그인하고 홈 Write a story를 누른다. 원본 비교 시 제목 `The Silence between Notes`와 F08-03의 보이는 문단을 직접 입력한다. 일반 앱 fixture/시각을 강제로 고정하지 않는다.
2. 본문 선택→헤더 스타일/인용/목록/구분선을 확인하고 굵게/기울임/링크의 적용·취소를 확인한다. @만 입력해 안내/툴바 숨김→samlee의3후보→두 Sam의 다른핸들→선택 후 녹색 이름/커서/툴바를 확인한다.
3. 제목/본문에서 각각 사진 선택→Cancel 후 입력 복귀를 확인한다. Unsplash mock의 검색/0건→선택→준비/확정→이미지 뒤 본문 커서와 입력, 사진 선택→삭제를 확인한다. 준비중 실패는 테스트 source 주입으로만 재현하며 정상 ENV를 수정하지 않는다. OS Camera/Library는 실제 권한 테스트로 별도 수행한다.
4. 더보기 네 메뉴를 순서대로 열고 닫아 문서를 보존한다. Drafts 진입→제목/Edited→1분 기다림→재개, Close→프로필 내 초안→재개를 확인한다. 새로고침 시 메모리 초기화와 구분한다.
5. Next→Topics0/5 Save→재진입→Music 검색X/선택chipX→Music·Culture·Art3/5→최대5/6번째 거절→취소와 저장을 각각 확인한다. Publication 취소/선택, Unlisted,Edit→본문 보존도 확인한다.
6. Publish now→프로필 Public 또는 Unlisted 필터→같은 글 열기, 본문·이미지·멘션·토픽 보존과 초안 제거를 확인한다. 중복/늦은 응답·A→B→A는 자동 테스트와 별도로 허용되는 브라우저 source 환경에서 재현한다.
7. 390×844와320폭, 큰 글자, 긴 한국어, Light/Dark에서 스크롤/48px터치/포커스/모달 닫기를 확인한다. viewport/DPR/Date/계정/스크롤/키보드 조건과 실행 여부를 TODO에 기록한다. 원본1179×2556와 웹CSS 크기를 혼동하지 않는다.

## 9. 다음 요청의 범위

묶음9의 구현·검증 잔여가 있으므로 **9 전체 완료로 보고10을 자동 시작하지 않는다.** 먼저 허용되는 브라우저/기기 환경에서 위 잔여를 보완·검증하거나 잔여를 명시적으로 인계하는 결정이 필요하다.

그 이후 계획상 다음은 [묶음10](MEDIUM_PARITY/EXECUTION_PLAN.md#batch-10) **V13·V20 기사·응답**이다. 선행2/3/4/9, 지정27화면과 T-F16~F39 중 배정 단계의 기사 상단/말미·박수832/833/834·응답 정렬/답글/편집/삭제/인용·복귀·소유권/시간/늦은 응답을 검증한다. 1~8 인계의 Goodbye Notion 빈 날짜 뒤 구분자도 포함한다. Highlight 선택 모델은11,Listen UI는12이며10으로 확대하지 않는다.

<a id="additional-review"></a>

## 10. 커밋 후 잔여 보완·추가 자기 검토

2026-11-24, Windows PowerShell. 기존 Parity9의32개 변경 파일과 Git diff를 확인했고 관련 없는 변경은 없었다. 사용자 요청 첫 문장의 선행 커밋으로 `30907e21d78e75b1ce95cd2903fe4072bab64238`(`fix(fe): refine parity 9 writing and draft workflows`)을 만들었다. 커밋 직후 작업 트리는 clean이었다. 요청 마지막 경계에 따라 **이후 추가 변경은 커밋하지 않았다.** push·배포·묶음10도 수행하지 않았다.

### 적용 규칙·원본 조사·보존

- AGENT/README, 공통 QUALITY_AND_WORKFLOW·ENGINEERING_RULES·현재 상태, UX 규칙과 FRONT_AGENT의7개 문서를 읽고 적용했다. 한글 한 문장 한 줄 주석, 단일 입력/문서 소유권, 기존 async 수명, 원본 crop과 서비스용 자산 권한의 구분을 지켰다. 새 의존성·문단별 입력 분리·편집 모델/스키마 변경은 없다.
- medium/README·REVIEW_R2와 F07~F11의 ANALYSIS 전체 및29단계 PNG(F07=6/F08=11/F09=5/F10=3/F11=4)를 대조했다. Home 진입·Profile 발행 결과는 F08의 맥락으로 확인했다. 다른 흐름 전체를 새로 시각 검증하지 않았다.
- 원본1179×2556px를 열람용390×844로 축소하고30px 이름 띠를 붙인 메모리 시트를 사용했다. 파일 저장/crop 없이 보았으며 논리 기기 크기·DPR을 확정하지 않았다. 실제 앱의 새 렌더는 확보하지 못했다.
- 등록 검사는63흐름/273단계/고유200화면, R1392/U263/C72,59항목의22묶음 배정, 로컬 링크915개를 대조했다. 원본 해시·크기·단계·배정·관찰 문장 누락0이었다. 이는200화면의 기능/렌더 통과가 아니다.
- 기존8081 PID29280, ENV·medium·의존성·정상 mock 설정을 보존했다. tools/evidence/별도 검증 스크립트/캡처/로그/manifest 파일을 생성·복원하지 않았다.

### native 부분 보완

| 대상·추적 | 변경·근거 | 판정·남은 범위 |
| --- | --- | --- |
| S183 / R-S183 전체 / T-F09-03 / C40 | [RichBody](../FE/src/features/editor/RichBody.tsx)에 구간 전체가 quote일 때 세로선/여백을 추가했다. 원본은 이미지 앞의 단일 인용문이며 기존 이미지 구간 입력을 유지한다. 선은 onContentSizeChange의 실제 본문 높이를 따른다. | 부분 구현·자동 검증. 일반/인용 문단이 섞인 동일 입력의 문단별 세로선은 여전히 미구현. 실제 native 선/줄바꿈/커서는 미검증이다. |
| S017 / R-S017 전체 / T-F09-05 / C40 | 구분선 자간6/보조 색상을 적용했다. iOS 중첩 Text 문단 정렬을 전달하고 구간 전체가 pullquote/divider이면 입력 전체를 가운데 정렬한다. 사진 선택/삭제·문서는 변경하지 않았다. | iOS는 속성 연결·실기기 미검증. Android의 목록/일반 문단+구분선 혼합 가운데 정렬은 구현 잔여다. |
| S018 / R-S018 전체 / T-F09-04 / C40 | 기존 bullet 문자/선택/줄바꿈과 web hanging indent를 대조했다. RN TextAttributes에는 headIndent/firstLineHeadIndent가 없고 Android 정렬은 입력 전체 기준이다. | native에서 줄이 감긴 목록의 내어쓰기는 **알려진 구현 잔여**다. 단순 기기 대기나 원본 근거 부족으로 바꾸지 않는다. |

설치된 React Native0.86.3의 `RCTAttributedTextUtils.mm`는 alignment를 NSParagraphStyleAttributeName으로, letterSpacing을 NSKernAttributeName으로 전달한다. Android `TextLayoutManager.kt`의 alignment 조회는 첫 fragment 기준이고 `ReactTextInputManager.kt`는 EditText gravity를 설정한다. 이 **로컬 소스 조사**로 플랫폼 조건을 나눴으며 실제 기기 실행 성공을 주장하지 않는다.

남은 내어쓰기/혼합 인용선은 단일 입력을 유지하는 native 문단 렌더/속성 연결을 별도 범위로 검토하거나 현재 제한을 제품 범위로 명시해야 한다. 문단별 TextInput 분리는 연속 선택·IME·offset 계약을 바꾸므로 도입하지 않았다. 공백/추정 글자 폭으로 줄을 재작성하면 초안 본문과 줄바꿈을 오염시키므로 적용하지 않았다. 새 native 의존성이나 편집 모델 전체 확대를 실행한 것은 아니다.

### 자산 확보와 실제 적용

| 항목 | 실제 확보·적용 | 잔여·담당·종료 조건 |
| --- | --- | --- |
| S087 사진·작가 | [imageSource](../FE/src/features/editor/imageSource.ts)는 sunset/vinyl/topic-life/morning-routine 로컬4자산과 `Local fixture` credit을 사용한다. 독립2열은 선행 커밋에 적용됐다. | 원본 Wietse Jongsma·Marek Piwnicki·Philipp·Ingmar 등의 사진/credit 조합은 미확보·미적용. V08/Q02/9에서 출처·사용 범위가 확인된 자산을 확보·적용 후 렌더 대조. 원본 이름을 다른 사진의 작가로 붙이지 않는다. |
| S126/S137·미리보기 | 삽입/저장/발행은 선택한 로컬 자산 참조를 유지한다. | 원본 산/호수의 별도 FE 자산은 없다. PNG 안에 보이는 것과 독립 자산 확보는 다르다. V08/V06/9 담당. |
| S196 멘션 | publicDirectory의 Sam3후보는 avatar가 없다. MentionSuggestions는 제공 시 Image, 없으면 중립 원을 표시한다. | 원본 첫 후보 중립 원과 나머지2명의 사진을 구분한다. 두 사진은 미확보·미적용이며 V10/Q02/9에서 근거 있는 자산 적용 후 재비교한다. |
| 서체·도구·간격 | 시스템 sans/Georgia/serif 대체, StoryEditorScreen 문자 glyph,48px 최소 터치 영역을 확인했다. 이번 추가 변경은 native 인용 여백/구분선 표시다. | 원본 font/vector 미확보. 획·줄바꿈·정확 간격은 실제 비교 대기. V06~V10/Q02/9 담당이다. |

Q12 저장 실패/재시도·모의 안내는 [OWN_UI_POLICY](MEDIUM_PARITY/OWN_UI_POLICY.md)를 유지한다. 원본 정상 화면에 없다는 이유로 오류 UI를 삭제하거나 일반 앱의 표시 숫자/시각을 고정하지 않았다.

### 실행 환경과 이번 검증

허용된 도구 목록에는 브라우저/컴퓨터 제어 도구가 없고 Document Control 연결 세션도 빈 목록이었다. 8081은 실행 중이지만9222/9231 디버그 연결은 없다. 과거 Chrome headless 시작은 자동 승인 검토에서 `blocked by policy`로 거절됐으며 추가 사유는 제공되지 않았다. **이번에는 재시도하거나 다른 실행 경로로 우회하지 않았다.**

adb/emulator/java/xcodebuild 명령과 기본 Android SDK 경로가 없었다. iOS에는 macOS/Xcode와 실행 대상, Android에는 JDK/SDK와 emulator 또는 기기가 필요하다. 웹에는8081에 접속 가능한 허용된 브라우저 제어 연결이 필요하다.

| 시점·검사 | 실제 결과 | 한계 |
| --- | --- | --- |
| 초기 native 보완 후 관련11파일 | iOS/Android22 suites,90 tests 통과,90.711초 | 선의 최소 높이 문제 재검토 전 |
| 선택 회귀 보강 후 EditorNavigation | 2 suites,10 tests 통과,29.137초 | 선 높이 최종 수정 전 |
| 선 높이 재수정 후 최종 관련11파일 | **22 suites,90 tests 통과,82.855초** | 두 Jest 프로젝트이며 기기 실행이 아님. timeout 종료/증액 없음 |
| 최종 타입·lint | `npm.cmd run typecheck`, `npm.cmd run lint` 종료0 | 초기 출력 회수가 끊긴 검사는 완료 근거로 쓰지 않고 최종 변경 뒤 다시 검사 |
| 기존8081 HTTP·3플랫폼 JS | HTTP200, 메모리 응답의 `vm.Script` 구문 검사 통과 | 앱 코드 실행·Hermes bytecode·native 빌드가 아님 |
| 실제 브라우저·console·새 렌더 | 환경 차단으로 미실행 | 작은 폭·큰 글자·긴 한국어·테마·스크롤·모달/focus와 원본 쌍 비교 대기 |
| 실제 native·IME·접근성 | 도구/기기 없음 | iOS/Android 키보드·한글 IME·Safe Area·VoiceOver/TalkBack·OS 사진 선택 대기 |

최종 테스트는 `npm.cmd test -- --runTestsByPath`로 EditorNavigation, EditorImagesNavigation, DraftsNavigation, PublishingNavigation, editorModel, editorImages, editorMentions, draftSession, publishing, DraftsScreen, ImagePickerSheet의11경로를 실행했다. 실제 navigation/provider로 작성→서식/이미지/멘션→저장→초안 재개→토픽→발행 문서/ID 보존, 사진 취소/성공 후 ref 요청, 실패/재시도·중복/응답 유실·늦은 응답·이탈·A→B→A를 검증한다. 합성 입력/ref spy를 OS 키보드/IME로 표현하지 않는다. 전체306 suites/1614 tests는 최초 실행 이력이며 이번 최종 코드의 전체 검사로 재사용하지 않았다. 이번에는 native 입력 표시의 관련 검사만 다시 실행했다.

기존 서버에서 `/index.bundle?platform=<web|ios|android>&dev=false&minify=true&hot=false&lazy=false`를 요청하고 응답을 파일에 저장하지 않았다. 요청별 제한120초 내 완료했다. 렌더·앱 console은 실행하지 않았다.

| 플랫폼 | bytes | 메모리 응답 SHA256 |
| --- | ---: | --- |
| web | 2046601 | `ac63684afead9c44d93974443302bbb305163ad551d1a1192cf48e177dd1204c` |
| iOS | 2530929 | `f2690238f1e082ed2f78c9ac8958d02f7ff13342e777b153e6aae1226e9a7c00` |
| Android | 2532379 | `49e9966328e520618e407c01a3f3dd8188a8aa04a83168d79fe459d7a59c6482` |

### 구현 후 재검토와 수정

같은 작업자가 코드·테스트·원본·요구·문서를 다시 읽고 FRONT_AGENT와 종료 조건을 대조했다. 독립 리뷰가 아니다. 새 실제 렌더가 없어 캡처를 재검토했다고 주장하지 않는다.

1. 첫 구현의 TextInput borderLeft는 짧은 인용문에서도 최소 입력 높이300까지 늘어날 수 있었다. 코드 검토에서 발견해 내용 높이의 장식 View로 바꾸고 기존 입력 클릭/선택 영역은 유지했다. 장식은 터치와 접근성 탐색에서 제외했다. 실제 화면에서 재현한 것으로 기록하지 않는다.
2. 혼합 문단 전체에 인용 여백/선을 적용하면 일반 문단도 영향을 받는다. 전체 quote 조건을 유지하고 [EditorNavigation](../FE/src/app/navigation/EditorNavigation.test.tsx)에 혼합→전체 인용→혼합, 하나의 본문 입력, 선택0..10/5..10, 크기 이벤트 후 최소 입력 영역 보존을 보강했다. 마지막22 suites/90 tests로 다시 검증했다.
3. Android 혼합 문단 정렬을 iOS와 동일 지원으로 쓰지 않도록 조건을 분리했다. iOS 소스 지원과 실기기 미검증도 구분했다. glyph/자간 연결만으로 S017을 닫지 않았다.
4. RichBody의 실제 소비자는 RichDocumentBody이며 웹 입력 구현·공통 reader·모델·저장소·image lease·인증 수명을 바꾸지 않았다. 장애 설정은 테스트 source 내부에서만 사용하고 정상 앱 설정은 보존했다.
5. 기존 원본 요구와 evidence/readiness 이력을 보존하고 최신 부분 판정을 연결했다. 알려진 구현 차이를 Q07 기기 대기로만 넘기지 않는다.

### 잔여별 종료 조건과 묶음10 진입

| 분류 | 현재 상태 | 담당·필요 조건 |
| --- | --- | --- |
| 이번 범위 완료 | 선행 커밋, native 인용 전용 구간/구분선 부분 보완, 선택 회귀·최종 관련 테스트·타입/lint, 원본/배정 대조 | 묶음9. 시각 동일성 전체 완료는 아님 |
| 구현 잔여 | 혼합 문단별 인용선·native 목록 내어쓰기·Android 혼합 구분선 정렬 | V07/9. 단일 입력 계약을 지키는 구현 범위 결정과 native 선택/IME/렌더 검증 후 종료 |
| 자산·시각 잔여 | 원본 사진/작가/두 멘션 사진/font/vector·정확 간격 | V06~V10/Q02/9. 확보→적용→실제 비교 각각 필요 |
| 원본 미확인 | Q04 사용자 삭제, 반복 서식/코드/발행 미수록 분기 | Q03/Q04/9. 행동 근거 또는 제품 결정 필요. 삭제 UI 추가 안 함 |
| 미지원·결정 대기 | Q06 이미지 경계 연속 선택 | Q06/9. 구간 모델 유지 또는 별도 확대 결정; 원본 미수록·native IME 대기와 분리 |
| 자체 mock 정책 | 중간 삽입 pending은 하단, 확정 후 선택 문단 뒤 삽입 | V08/9. 원본에는 본문 뒤 삽입만 있음. 중간 위치를 원본 일치로 단정하지 않으며 정책 변경 근거/요청 때 검토 |
| 환경 차단 | 실제8081 조작·console·새 렌더 | 묶음9. 허용된 브라우저 연결 후8절 흐름과 실패/복귀 실행·TODO 기록 |
| 기기 대기 | native layout/IME/큰 글자/OS picker/스크린리더 | Q07/21 및9의 구현 잔여 검증. iOS/Android 실행 환경 필요 |
| 다른 묶음 | AuthBoundaryNavigation 간헐적 act 경고 | 14/22. 이번 관련 테스트 통과로 해결 처리하지 않고 인증 구현은 변경하지 않음 |
| 범위 제외 | 외부 인증/결제/AI/Unsplash/Storage/알림/영속 서버 초안 | Q08. 이번 실행 대기로 집계하지 않음 |

**묶음9 전체 종료는 미충족이며, 묶음10의 모든 선행 조건 충족도 아직 아니다.** 기능상의 작성→저장→재개→발행 문서/ID 계약은 이번 실제 navigation 자동 검증으로 다시 확인했지만, 계획의 키보드/web 종료 조건과 native 구현 잔여가 남아 있다. 같은 차단 환경에서 같은9 요청을 반복해도 화면 검증은 완료되지 않는다.

묶음10의 기사·응답 기능 작업 자체는 이 편집기 표시 잔여와 분리 가능하다. 순서를 바꾼다면 **잔여를 묶음9 소유로 계속 열어 두고9 전체 완료로 간주하지 않는 명시적 인계**가 필요하다. 현재 그 순서 변경을 적용하거나10을 시작하지 않았다. 다음 기능 범위는 V13/V20·27화면·기사/응답 연결·Goodbye Notion 빈 날짜 구분자이며 Highlight11/Listen12는 제외한다. 새 환경이 마련되면8절8081 순서부터 실행하고 native에서는 S183→일반 문단 혼합→S018→S017, 사진 삽입/삭제, 선택·한글 입력·초안 재개를 확인한다.

최종 문서 점검: Node24.18.0에서 실행했으며 새 로컬 링크29개/앵커 오류0, 현재 코드543파일 및 존재하는 기준 입력의 해시 불일치0, AGENT 로컬 링크 오류0을 확인했다. 삭제된 과거 tools/evidence 입력4개는 그대로 부재하며 복원하지 않았다. 변경은 추적 파일19개이고 새 비추적 파일은 없다. diff 검사에서 발견한 결과 문서 끝의 빈 줄을 정리했다. 기존 LF→CRLF 안내는 검사 오류와 구분한다.

<a id="pre-commit-review"></a>

## 11. 후속 사용자 요청에 따른 커밋 전 재검토

2026-11-24. 검토 시작 HEAD는 `30907e2`이며19개 미커밋 파일은10절의 추가 보완분과 일치했다. 이번 재검토에서 **추가로 확정된 코드 결함은 발견하지 못했다.** 앱 코드·테스트를 다시 변경하지 않았으며 검토/커밋 범위와 현재 상태 문서만 갱신했다. 기존에 분류한 native 구현 잔여·원본 자산 차이·실제 화면/기기 검증 대기는 해소된 것으로 처리하지 않는다.

- FRONT_AGENT 규칙, RichBody와 실제 소비자 RichDocumentBody, 변경된 EditorNavigation,19파일 diff, R/T/U/C와 종료 조건을 다시 대조했다. 전체 quote 조건·혼합 문단 배제·하나의 입력/선택·내용 높이와 최소 입력 영역·장식의 터치/접근성 제외·iOS/Android 분기를 확인했다.
- 실제 이미지 재열람은 F09의03/04/05(S183/S018/S017)3장이다. 원본 물리1179×2556px를 메모리 열람용390×844로 축소했으며 파일을 만들지 않았다.10절의29단계 열람과 이번3장을 구분한다. 원본과 새 앱 렌더의 쌍 비교는 수행하지 않았다.
- 새 검증:10절과 같은11경로의 관련 테스트를 다시 실행해 **22 suites/90 tests 통과,101.962초**. 타입 검사·lint도 각각 종료0이었다. 시간초과/재시도/설정 완화 없음. 전체 suite·JS 번들은 이번 재검토에서 다시 실행하지 않았고10절의 결과는 당시 기록으로 보존했다.
- 브라우저 제어 도구가 없고 Document Control 세션 재조회도0이었다. 기존8081 PID29280을 보존했고 과거 차단된 Chrome 실행을 반복하지 않았다. 이번 웹/console·실제 native/IME 검증을 통과로 기록하지 않는다.
- 원본 관찰/요구/과거 evidence/readiness와 삭제된 tools/evidence 입력4개 부재를 보존했다. 새 로컬 링크35개/앵커 오류0, 현재 코드543파일/존재하는 기준 입력 해시 불일치0,63흐름/273단계/고유200화면 등록·배정 오류0과 `git diff --check` 통과를 확인했다. 독립 리뷰가 아닌 같은 작업자의 자기 검토다.
- 후속 사용자가 요청한 로컬 커밋 범위는 이 문서를 포함한19파일이다. 실제 커밋 식별자는 Git 이력과 최종 보고를 기준으로 확인한다. 이전 절의 미커밋 기록은 당시 이력으로 보존한다. push·배포·묶음10은 실행하지 않는다.

묶음10 요청문에는 **묶음9의 구현 잔여/자산/원본 미확인/환경·기기 대기를9 소유로 계속 열어 둔 채 독립 가능한 기사·응답 작업을 진행한다는 지시**를 포함해야 한다.9 전체 완료로 승격하거나 잔여를10/21에 자동 이전하지 않는다. V13/V20·지정27화면·배정 T와 C 계약, Goodbye Notion의 빈 날짜 구분자 수정, 구현 후 재검토·재검증, 관련 TODO/FE/AGENT 갱신을 정확한 다음 범위로 유지한다.

**후속 작업 순서 인계 — 2026-11-24:** 사용자의 명시적 지시로 [독립 가능한 Parity10](FE_MEDIUM_PARITY_10_RESULT.md)을 수행했다. 이 문서의9 native/자산/원본/환경·기기 잔여는9 소유로 계속 열려 있다.9 전체 종료 승인이나 잔여 이전이 아니며 위10 미착수 문장은 각 당시 이력이다.
