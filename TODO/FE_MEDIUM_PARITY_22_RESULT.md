# Parity 22 — 6단계 전수 판정 및 7단계 인계 입력

2026-11-27 · 검토 코드 기준 `3d73d19` · 문서만 변경.

**후속 검토 정정:** [문서 판정 3건 정정](#review-corrections-20261127)에 OS 사진 선택기 위임 범위, 오디오 메뉴의 실제 기능 분류, 기존 OS 글자 확대 실행 근거를 반영했다. 최초 감사 수치/실행 이력은 아래에 보존하며 이번에도 제품 코드 변경·사용자 재검사·7단계 설계 착수는 없다.

<a id="decision"></a>

## 최종 판정

**6단계의 전수 연결·항목별 판정·인계 정리는 완료했다. 전체 원본과 100% 동일한 서비스 구현 완료는 아니다.** 원본 200화면·63흐름·273단계, 세부 요구 1,395개, 원본 미확인 263묶음, 기존 공통 계약 72개와 Goal 계약 53개를 연결했다. 미지원·모의 기능·외부 미연결·알려진 차이·근거 부족을 아래 항목에 그대로 남겼다.

사용자는 현재 Android 화면/조작을 직접 확인해 확정했고 에뮬레이터 검증을 충분한 기준으로 채택했다. 기존 31개와 이후 안내 변경의 확인을 유지한다. 같은 검사를 다시 요청하지 않으며 iOS/실제 휴대폰 미실행은 필수 대기 조건이 아니다. 이번에는 FE 코드·테스트·디자인·아이콘·원본·사용자 데이터·실행 환경을 변경하거나 앱을 재시작하지 않았다. Android 기본 선택 메뉴 제거는 계속 보류한다.

| 단계 | 이번 판정 |
| --- | --- |
| 1 모바일 실행 환경 | 사용자 채택 Windows/Android 에뮬레이터 환경 준비 완료 유지 |
| 2 공통 디자인 | 보정·차이 정리 종료 및 현재 디자인 수용 유지. 원본 폰트/일부 자산·배치 차이는 아래에 보존 |
| 3 핵심 조작 | 안내한 현 구현 범위 사용자 확인 완료 유지. 미지원·별도 선택 모드 경계는 숨기지 않음 |
| 4 나머지 화면/흐름 | 안내한 현 구현 범위 사용자 확인 완료 유지. 원본 상태별 미확인은 아래 연결 |
| 5 종합 실행 검증 | 사용자 확정 에뮬레이터 기준으로 종료 유지. iOS/휴대폰 재검사 요구 없음 |
| 6 전수 판정 | **연결과 판정 완료.** 미해결을 포함한 감사 종료이며 전수 동일성 통과가 아님 |
| 7 공식 기능→요구사항·DB·API | **미착수.** 아래 입력/질문만 인계했고 공식 기능 신규 조사·설계는 시작하지 않음 |

원본/코드가 알려 주는 사실과 사용자가 채택한 제품 범위를 구분한다. 과거 G53의 모든 상태 신규 캡처·overlay/전체 check 조건은 이번 문서 감사에서 수행하지 않았다. 따라서 G53/C72의 원본 전수 시각 동일성은 여전히 미입증이다. 현재 요청은 FE 변경 없이 기존 증거로 판정하는 것이며, 이 미입증을 추가 사용자 검사 대기로 만들지 않는다.

<a id="coverage"></a>

## 기준 자료와 연결 범위

| 대상 | 연결/검증 결과 | 해석 |
| --- | --- | --- |
| S001~S200 | 200/200 | 고유 원본 ID·PNG·분석·R·T·U·C·현재 FE/V 근거 연결 |
| F01~F63 / T 단계 | 63/63, 273/273 | 단계별 원본 PNG와 S 연결. 캡처 순서를 입증되지 않은 단일 클릭 결과로 합치지 않음 |
| R 요구 | 1,395/1,395 | L 200·D 200·S 200·C 779·PNG 추가 V 16. 기존 8개 요구 문서의 각 행에 현재 판정 반영 |
| U 질문 묶음 | 263/263 | 화면 200+흐름 63. 한 묶음에 여러 질문이 있으므로 원자 질문 263개 또는 모두 해결이라는 뜻이 아님 |
| C 공통 계약 | 72/72 | C01/C03/C70/C71/C72는 화면 직접 참조가 없어도 공통 코드/감사 근거에 연결 |
| G 기존 계약 | 53/53 | 원문/당시 결과 보존, C→G 교차 참조 유지. 과거 조건을 현재 통과로 일괄 승격하지 않음 |
| 잔여 D/Q/V | 59/59 | D13+Q12+V34. 오래된 미지원/미착수 상태를 현재 상태와 분리 |
| 원본 PNG 해시 | 고유 200+단계 273 대조, 불일치 0 | 보관 `comparisonBaseline.json`과 현재 원본 파일의 SHA256 대조 |
| 원본 직접 열람 | 고유 200개 모두 | 이번에는 20장씩 메모리 contact sheet로 구조/텍스트/자산을 확인. 미세 픽셀/폰트 오차 측정은 아님 |
| FE 이미지 자산 | 현재 SOURCES 102개, 원본 지정 영역 RGBA 불일치 0 | 보관 86+후속 16. 화면 전체 렌더 동일성이나 별도 원본 파일 확보를 뜻하지 않음 |
| 원본 서체 | FE/assets·medium의 font 파일 0개 | 현재 시스템 대체 글꼴. 정확한 원본 글자 폭/행간 동일성 미확인 |
| FE 매핑 | 기존 매핑의 고유 코드 경로 91개 모두 현존 | 추가 공통/플랫폼/편집기 경로는 아래 V/C 연결. 파일 존재와 조작 통과는 별개 |
| 자동 검사 자료 | 현재 test 파일 167개 및 기존 실행 이력 | 이번에 Jest/typecheck/lint를 다시 실행하지 않았음. 문서 검사와 제품 테스트를 구분 |

원본은 [medium 보관 자료](<../medium/README.md>)와 [원본 검토](<../medium/REVIEW_R2.md>)의 동결된 Medium iOS/Gummble 자료(version 1419)다. 현재 서비스의 모든 최신 동작을 뜻하지 않는다. 별도 UI-elements 43개/구버전 369개를 200화면 분모에 합치지 않았다. 이번에는 Gummble/API/공식 사이트에 새로 접속하지 않았다.

[비교 조건/화면별 recipe](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md>)의 route·콘텐츠·테마·키보드·스크롤 조건은 재현 기준이다. 모든 현재 FE 상태가 해당 조건으로 새로 캡처되었다는 뜻은 아니다. 실제 사용자 저장 데이터는 비교 fixture로 덮어쓰지 않았다. 과거 `comparisonBaseline.json`의 readiness/자산86/해시 값은 당시 스냅샷으로 보존하고 현재 판정은 이 문서와 갱신한 요구 문서를 우선한다.

<a id="evidence"></a>

## 증거의 종류와 기존 검증 연결

- **현재 코드 연결:** 실제 navigation/provider/source·컴포넌트·검사 코드를 읽어 지원 경계를 확인했다. 화면별 코드/검사는 아래 S/V/C에서 찾는다.
- **사용자 확인:** [24개 안내 시나리오](<../TODO/FE_MOBILE_EXECUTION_01_RESULT.md#manual-batch-20261126>), N1~N5, [Undo/Redo·사진 선택 추가 2개](<../TODO/FE_MOBILE_EXECUTION_01_RESULT.md#editor-history-user-pass-20261127>)로 31개. 이후 보정과 [최종 Android 수용](<../TODO/FE_MOBILE_EXECUTION_01_RESULT.md#emulator-acceptance-20261127>)을 유지한다. 대표 흐름 수용을 모든 S/T의 원본 동일성 시험으로 전파하지 않는다.
- **과거 자동/실행 근거:** Parity1~20 및 후속 기록의 당시 결과를 연결했다. iOS Jest preset은 실제 iOS 실행 결과가 아니다.
- **현재 문서 검사:** 원본/ID/코드·링크/자산/변경 범위 검사. FE 회귀 테스트의 새 실행으로 세지 않는다.

| 기존 검사 시점 | 보관 결과 | 이번 해석 |
| --- | --- | --- |
| Parity1~20 및 통합 후속 | 각 결과 문서에 타입/lint·범위별 Jest·당시 웹 부분 비교 기록 | V별 해당 결과를 연결. 모든 화면/분기의 사용자 검증을 대신하지 않음 |
| 발행 글 읽기 후속 | 326 suites / 1,816 tests 통과 | [flow-followup](<../TODO/FE_MEDIUM_PARITY_01_20_REVIEW.md#flow-followup>); 당시 전체 결과 |
| RN 선택 초기 후속 | 334 suites / 1,838 tests 통과 후 빈 여백 포커스 보완, 후속 8 suites / 40 tests 통과 | [rn-only-followup](<../TODO/FE_MEDIUM_PARITY_01_20_REVIEW.md#rn-only-followup>); 마지막 변경 후 전체 통과로 바꾸지 않음 |
| 연속 리치텍스트 전환 | 전체 334 중 333 suites, 1,853 중 1,852 tests 통과. iOS PublicListsNavigation 5초 timeout 1건. 이후 관련 16 suites / 94 tests 통과 | [medium-editor-followup](<../TODO/FE_MEDIUM_PARITY_01_20_REVIEW.md#medium-editor-followup>); 최종 코드 전체 재실행 결과가 아니며 추가 테스트 때문에 1,853을 현재 총수로 쓰지 않음 |
| 공통 타이포 | 관련 6 suites / 58 tests 및 타입/lint | [타이포 기록](<../TODO/FE_COMMON_DESIGN_02_RESULT.md#representative-typography-20261127>) |
| 사진/멘션 원본 영역 자산 | 관련 46 tests, 최종 사진 선택 16 tests 및 타입/lint | [자산 기록](<../TODO/FE_COMMON_DESIGN_02_RESULT.md#editor-reference-assets-20261127>); 중복 가능한 실행을 합산하지 않음 |
| 인용/빈 행 보정 | 관련 8 suites / 72 tests 및 타입/lint | [인용 기록](<../TODO/FE_COMMON_DESIGN_02_RESULT.md#quote-layout-20261127>) |
| 다크/선택 복원 | 관련 18 suites / 118 tests, 후속 색상 변경 타입/lint | [다크 기록](<../TODO/FE_COMMON_DESIGN_02_RESULT.md#dark-selection-20261127>) |
| 기사/작성자 배치 | 관련 4 suites / 18 tests 및 타입/lint | [읽기 배치](<../TODO/FE_COMMON_DESIGN_02_RESULT.md#reader-layout-20261127>) |
| 사진 선택기 | 관련 4 suites / 30 tests 및 타입/lint | [사진 선택 배치](<../TODO/FE_COMMON_DESIGN_02_RESULT.md#photo-picker-layout-20261127>) |
| 최종 멘션 배치 | 관련 6 suites / 26 tests, 최종 스타일 타입/lint | [멘션 기록](<../TODO/FE_COMMON_DESIGN_02_RESULT.md#mention-layout-20261127>) |

과거 act/VirtualizedList 경고와 기본 timeout 초과 이력은 해당 원문에 보존한다. 이후 관련 실행이 통과했어도 모든 과거 경고의 원인이 해결됐다고 판정하지 않는다. 이번 문서 수정 때문에 같은 기능 검사를 다시 요청하거나 코드/타이머를 변경하지 않는다.

**스냅샷 증거의 한계:** 작업 시작 HEAD `3d73d19`에서 보관 기준의 codeInputs 557개를 대조했으며 해시가 달라진 것은 61개, 누락은 0개였다. 후속 코드 변경이 있으므로 오래된 전체 테스트를 현재 전체 테스트 통과로 사용하지 않는다. 작업 시작 시 보관 입력 80개 중 4개는 파일이 없고 6개는 해시가 달랐다. 이후 이번 문서 갱신도 별도 변경이며 보관 입력 해시를 새 값으로 덮지 않았다. 누락은 과거 captures.json과 comparisonProfiles/currentEvidence/executionBatches 자료다. S001/S004/S021/S037/S063/S069/S119/S125/S168/S198의 기존 비교 캡처 10개도 현재 작업 트리에 없다. 당시 실행 기록만 인용하며 현재 직접 이미지 증거로 계산하지 않는다. 재생성/새 캡처/manifest 생성으로 이력을 덮지 않았다.

<a id="boundaries"></a>

## 구현·모의·미연결·미지원 판정

| 구분 | 현재 범위 | 완료로 오해하면 안 되는 부분 |
| --- | --- | --- |
| 로컬 실제 구현 | RN/TypeScript 화면·이동·리치텍스트/한글·서식·Undo/Redo·선택/메뉴·필터·상태/수명/오류 처리 | 실서버·원본의 모든 정책/화면 동일성이 아님 |
| 실제 플랫폼 어댑터 | 기기 Camera/Library, Clipboard, OS Share, 이미지 capture/사진 보관함, OS 알림 권한, 기존 앱 아이콘 모듈 | 플랫폼 모듈/권한별 실패 가능. 이번에 새 OS 호출을 실행한 것은 아님 |
| 모의 비즈니스 기능 | 인증·발행·댓글/관계/반응·목록·다운로드·알림/Digest·멤버십·통계·무음 Listen | 메모리 source/fixture이며 서버 영속성·실제 타 사용자 동기화/집계 없음 |
| 외부 미연결 | HTTP 서비스/DB/OAuth·이메일/Push 전송·업로드/Unsplash API·결제/영수증·실제 음성·공개/Friend 링크 | 화면 성공/권한 허용/mock 자격이 외부 성공 근거가 아님 |
| 알려진 미지원 | 초안 사용자 삭제, 읽기 이력 삭제 후 Undo, 읽기 사진/구분선 경계 선택, 정책 발췌 개인 선택/강조, AirPlay/재생 큐 | 각각 Q04/Q05/Q06/Q11/V19에 명시. 구현 완료로 처리하지 않음 |
| 알려진 차이 | 시스템 대체 서체, 인용선 18dp, 사진 선택 모드/여백, 일부 원문·자산 미수록, fixture 값/자체 안내 | 2단계 종료는 차이가 없어졌다는 뜻이 아님 |
| 사용자 확정 차이 | 빨간 채움 하트·사진/서식 아이콘, Save to 목록 사이 선 제거, 현재 Android 디자인 | 교체·통일·원본 벡터 확보를 잔여/7단계 과제로 만들지 않음 |
| 원본 미확인 | U263 묶음의 정책·미수록 분기·오류/재시작/취소·실제 효과 | 현재 자체 정책이나 테스트로 Medium의 답을 확정하지 않음 |
| 보류/필수 제외 | Android 기본 선택 메뉴 제거 보류. iOS/실기기 미실행 이력은 필수 완료 조건 제외 | 미실행을 실행 완료라고 바꾸지도, 사용자 대기로 남기지도 않음 |

<a id="refresh"></a>

### 오래된 상태의 정정

| 항목 | 최신 판정과 근거 |
| --- | --- |
| Undo/Redo·편집기 사진 경계 선택 | 구현·사용자 추가 2개 통과. 명시적 Select across photos 모드이며 일반 모드와 동일한 연속 선택은 아님. [RichBody](<../FE/src/features/editor/RichBody.tsx>) / [editorHistory](<../FE/src/features/editor/editorHistory.ts>) |
| 발행 글 Highlight/Respond/Listen | 기존 Q11 미지원 문구는 오래된 기록. [WrittenStoryScreen](<../FE/src/features/editor/WrittenStoryScreen.tsx>)과 [publishedSelection](<../FE/src/features/editor/publishedSelection.ts>)에 연결. 무음 Listen·원문 범위 제한은 유지 |
| 본문 선택·Cancel | 본문 안 손잡이와 Copy/Highlight/Respond/Share/더보기, 바깥 해제 적용. [NativePassageText](<../FE/src/features/highlights/NativePassageText.tsx>) / [PassageMenu](<../FE/src/features/highlights/PassageMenu.tsx>). Android 기본 메뉴는 보류 상태로 공존 |
| 발행 글 목록 다운로드 | [createMockDownloadSource](<../FE/src/features/downloads/createMockDownloadSource.ts>)가 발행 문서/이미지 사본 처리. D07 미지원 아님. 일반 파일 다운로드·영속 캐시는 여전히 없음 |
| 정책 기사 | [PolicyArticle](<../FE/src/features/responses/PolicyArticle.tsx>)에 반응/저장/공유·무음 Listen 존재. 정적 Text 발췌는 개인 선택/Highlight 경로 없음 |
| 공유 | [shareAdapter](<../FE/src/features/sharing/shareAdapter.ts>)는 실제 Clipboard/OS Share/이미지 저장 경계. [공유 URL](<../FE/src/features/sharing/types.ts>)은 kostolany.invalid 모의 주소. OS returned ≠ delivered |
| 알림 | [NotificationPermissionProvider](<../FE/src/features/notifications/NotificationPermissionProvider.tsx>)의 실제 native 권한 어댑터와 mock 알림/설정을 구분. 토큰 등록·전송 미연결 |
| 앱 아이콘 | [appIconAdapter](<../FE/src/features/app-icon/appIconAdapter.ts>)와 기존 native 모듈 존재. 조건부 지원을 항상 미지원으로 쓰지 않음. 현재 도안 변경은 금지 |
| 자산·서체 | SOURCES 102개는 원본 지정 영역과 일치. 이전 86개 기준은 당시 이력. 원본 font 0개·시스템 대체 유지 |
| 검증 환경 | 현재 사용자 결정으로 Android 에뮬레이터 종료. 과거 Q07/Parity21의 iOS/실기기 필수 대기는 적용하지 않음 |

<a id="handoff"></a>

## 7단계로 넘길 입력 — 설계 미착수

아래는 기존 [FE 계약 인계](<../TODO/FE_MEDIUM_BACKEND_HANDOFF.md>)의 최신 읽기 순서와 결정 질문이다. 공식 설명의 확인, 제품 정책 채택, 스키마/endpoint/요청·응답 설계는 이번 범위가 아니다. 각 질문의 원본 출처는 아래 U와 원본 분석에 연결된다.

<a id="h01"></a>

### H01 — 인증·계정·온보딩

현재 A/B mock 세션·이메일/코드·관심사·Follow·재개 상태를 입력으로 삼는다. 실제 인증 주체, 제공자 연결/해제, 코드 만료/재전송, 계정 삭제/전환, 재시작 복구·온보딩 완료의 보존 범위를 공식 기능과 제품 범위로 결정해야 한다. FE userId/revision을 서버 인증 자체로 채택하지 않는다.

관련: [V29](#v29) · [V30](#v30).

<a id="h02"></a>

### H02 — 작성·초안·발행·사진·멘션

schemaVersion3 문서·UTF-16 범위·assetId/resolver·초안/발행 분리·최대 5 topics·Public/Unlisted·명령 중복/수명 보호가 현재 입력이다. 서버 저장/버전 충돌/복구, 이미지 업로드/권리/보존, 실제 Publication 제출, 초안 삭제 채택 여부, 멘션 대상/알림 정책을 결정해야 한다. 원본 사진 경계 동작은 미확인이고 모드 차이는 유지한다.

관련: [V06](#v06) · [V07](#v07) · [V08](#v08) · [V09](#v09) · [V10](#v10).

<a id="h03"></a>

### H03 — 본문·읽기·하이라이트·읽기 이력

원문 version+start/end/text·개인/타인 강조·읽기 설정과 앱 테마의 분리·일반/발행/정책 발췌 지원표를 인계한다. 원문 공급/수정 시 인용 유효성, 강조 공개 범위/소유권, 읽음의 정의·보존·삭제/복구, 전문 미확보와 정책 문서 갱신을 결정해야 한다. 읽기 사진 경계/정책 개인 선택·이력 Undo 미지원은 구현 완료로 전환하지 않는다.

관련: [V12](#v12) · [V13](#v13) · [V16](#v16) · [V17](#v17) · [V21](#v21).

<a id="h04"></a>

### H04 — 개인/공개 목록·저장·메모·캐시

목록 저장과 기사 저장, reading-list 비공개, 소유자/방문자, 순서/메모/Remove Undo·공개 범위 철회·발행 문서 사본의 현재 계약을 인계한다. 삭제/타인 저장의 효과, 정렬 충돌, 공개 접근권, 영속 오프라인 캐시와 권한 만료/재검증·이미지 삭제 정책을 결정해야 한다. 다운로드 완료 아이콘은 디스크 파일/네트워크 단절 보장이 아니다.

관련: [V04](#v04) · [V22](#v22) · [V24](#v24) · [V25](#v25) · [V26](#v26).

<a id="h05"></a>

### H05 — 관계·반응·응답·신고

writer/publication/topic 식별, Follow와 Email 분리, 누적 반응 최대50과 사용자 확정 하트, 응답 parentId·소유권·토론 종료/숨김·Mute/Block/Report의 자체 정책을 인계한다. 서버 권한·동시 수정·집계·삭제 부모/답글·모더레이션/신고 처리의 근거와 원본 정책을 확인해야 한다. 하트 모양을 단일 like 데이터 모델로 바꾸지 않는다.

관련: [V14](#v14) · [V15](#v15) · [V20](#v20).

<a id="h06"></a>

### H06 — 홈·검색·추천·토픽

현재 fixture 카탈로그·다섯 검색 유형·로컬 페이지·토픽/추천 관리와 원본의 일부 섹션/목적지만 확보한 범위를 인계한다. 검색/정렬/필터, 큐레이션과 개인화, 페이지 커서·오류/빈 상태, Mute/Block 반영, 콘텐츠 공급/권한/수집 정책을 결정해야 한다. 추천 알고리즘·Medium 내부 endpoint는 화면에서 추정 확정하지 않는다.

관련: [V01](#v01) · [V02](#v02) · [V03](#v03) · [V11](#v11).

<a id="h07"></a>

### H07 — 알림·이메일·Digest

알림 대상/읽음·설정 범위·최근10개 발행호·OS 권한 어댑터를 인계한다. 원격 기기 토큰/계정 연결·전송/실패/중복·예약/시간대·수신거부/빈도·알림 대상 삭제/차단을 결정해야 한다. OS 권한 허용과 선호 저장은 실제 Push/메일 발송 증거가 아니다.

관련: [V05](#v05) · [V27](#v27) · [V28](#v28).

<a id="h08"></a>

### H08 — 멤버십·자격·오디오

월/연·Member/Friend·모의 구매 상태/자격 및 무음 플레이어·속도/음성 메타데이터를 인계한다. 실제 스토어/영수증/복원/갱신/해지·실패/재시도·지역 가격/혜택, TTS 제공자/콘텐츠 권리·큐·백그라운드/오프라인 재생·AirPlay 채택 범위를 결정해야 한다. 보관 SGD 가격은 현재 판매 가격 근거가 아니다.

관련: [V18](#v18) · [V19](#v19) · [V31](#v31).

<a id="h09"></a>

### H09 — 프로필·공유·설정·기기 경계

이름50/bio160·대명사최대4·부모 Save/Cancel·로컬 사진 URI와 실제 Clipboard/Share/사진 저장/앱 아이콘 어댑터를 인계한다. 서버 프로필·파일 수명, 공개 URL/Friend 링크 발급·접근 범위/만료, 외부 계정/기기 정책과 플랫폼 실패 경계를 결정해야 한다. 공유 returned를 전달 완료로 기록하지 않는다. 현재 디자인/아이콘 및 Android 기본 메뉴 보류는 재설계 대상이 아니다.

관련: [V23](#v23) · [V32](#v32) · [V33](#v33).

<a id="h10"></a>

### H10 — 통계

Monthly/Lifetime·Views/Reads·UTC 시계·빈/미집계 표시와 로컬 게시 글의 목록 연결이 입력이다. 이벤트 정의·중복 제거·집계 기간/시간대·지연/부분 집계·작성자 권한을 공식 기능과 제품 기준으로 결정해야 한다. fixture 수와 로컬 읽기 이력은 실제 조회 분석/수익 정산이 아니다.

관련: [V34](#v34).

<a id="h11"></a>

### H11 — 전 도메인 공통 결정·증거

기존 FE 타입은 구현 입력이며 확정 서버 API/DB 설계가 아니다. 원본 관찰·공식 설명·자체 정책을 분리하고 ID/소유권/공개 범위·명령 멱등성·취소와 이미 확정된 쓰기·버전/충돌·오류·영속성/삭제를 연결해야 한다. 서버 모듈/트랜잭션 경계는 AGENT 규칙을 적용한다. 이번에는 공식 사이트 신규 조사, 요구사항 확정안, DDL, API 요청/응답 설계를 작성하지 않았다.

관련: [C70/C71/C72 및 전체 U](#contracts).

<a id="groups"></a>

## 기능 묶음별 실제 구현과 증거 (V34)

각 묶음의 사용자 확인은 대표 조작/현재 상태의 수용 범위다. 자동 검사 링크는 검사 내용의 위치이며 그 파일의 모든 테스트를 이번 실행했다는 뜻이 아니다. 상태별 성공/실패의 원본 동일성은 개별 S/R/T/U 판정을 따른다.

<a id="v01"></a>

### V01 — 홈 (5화면)

- 실제 구현: 피드 탭·빈 Featured·알림 점·기사/작성/추천 이동이 로컬 카탈로그와 연결됨.
- 경계/차이: 추천·개인화·페이지 데이터는 fixture; 원본 시점별 기사·집계·스크롤과 현재 상태의 일치는 별도 미확인.
- 사용자 근거: 최종 Android 수용. [전체 근거와 범위](#evidence).
- 현재 코드: [community/FollowingFeed.tsx](<../FE/src/features/community/FollowingFeed.tsx>) · [feed/HomeFeedScreen.tsx](<../FE/src/features/feed/HomeFeedScreen.tsx>).
- 기존 검사: [navigation/ArticleRouteScreen.test.tsx](<../FE/src/app/navigation/ArticleRouteScreen.test.tsx>) · [app/App.test.tsx](<../FE/src/app/App.test.tsx>). [Parity 17 실행 기록](<../TODO/FE_MEDIUM_PARITY_17_RESULT.md>) · [후속 보정 기록](<../TODO/FE_COMMON_DESIGN_02_RESULT.md#representative-typography-20261127>).
- 화면: [S026](#s026) · [S061](#s061) · [S069](#s069) · [S086](#s086) · [S176](#s176). 인계: [H06](#h06).

<a id="v02"></a>

### V02 — 탐색·검색 (8화면)

- 실제 구현: Stories/People/Publications/Topics/Lists 검색과 빈 결과·유형별 목적지 연결.
- 경계/차이: 검색 정렬·카테고리 계층은 자체 정책; 일부만 캡처된 Staff Pick은 안내로 처리하고 본문을 생성하지 않음.
- 사용자 근거: 기존 10. [전체 근거와 범위](#evidence).
- 현재 코드: [search/CatalogSearchResults.tsx](<../FE/src/features/search/CatalogSearchResults.tsx>) · [search/ExploreSections.tsx](<../FE/src/features/search/ExploreSections.tsx>) · [search/SearchScreen.tsx](<../FE/src/features/search/SearchScreen.tsx>).
- 기존 검사: [navigation/SearchNavigation.test.tsx](<../FE/src/app/navigation/SearchNavigation.test.tsx>) · [navigation/SearchCategoriesNavigation.test.tsx](<../FE/src/app/navigation/SearchCategoriesNavigation.test.tsx>). [Parity 17 실행 기록](<../TODO/FE_MEDIUM_PARITY_17_RESULT.md>).
- 화면: [S004](#s004) · [S021](#s021) · [S053](#s053) · [S070](#s070) · [S079](#s079) · [S098](#s098) · [S174](#s174) · [S185](#s185). 인계: [H06](#h06).

<a id="v03"></a>

### V03 — 토픽·큐레이션 미리보기 (3화면)

- 실제 구현: 토픽 Follow/해제·관련 칩·추천 기사·curated list 이동.
- 경계/차이: 토픽 집계·연관·추천은 보관 fixture/자체 정책, 실제 추천 서비스 미연결.
- 사용자 근거: 기존 11. [전체 근거와 범위](#evidence).
- 현재 코드: [topics/TopicScreen.tsx](<../FE/src/features/topics/TopicScreen.tsx>).
- 기존 검사: [navigation/TopicNavigation.test.tsx](<../FE/src/app/navigation/TopicNavigation.test.tsx>). [Parity 17 실행 기록](<../TODO/FE_MEDIUM_PARITY_17_RESULT.md>).
- 화면: [S057](#s057) · [S091](#s091) · [S107](#s107). 인계: [H06](#h06).

<a id="v04"></a>

### V04 — 공개 목록 (2화면)

- 실제 구현: 공개 목록 저장·반응·응답·소유자/글 이동·비공개/삭제 접근 철회.
- 경계/차이: 목록/기사 저장과 반응은 서로 다른 메모리 자원; 타 계정 서버 권한·업데이트 알림 미연결.
- 사용자 근거: 최종 Android 수용. [전체 근거와 범위](#evidence).
- 현재 코드: [bookmarks/ArticleBookmarkControl.tsx](<../FE/src/features/bookmarks/ArticleBookmarkControl.tsx>) · [public-lists/PublicListScreen.tsx](<../FE/src/features/public-lists/PublicListScreen.tsx>) · [public-lists/PublicListStoryCard.tsx](<../FE/src/features/public-lists/PublicListStoryCard.tsx>) · [public-lists/SavePublicListControl.tsx](<../FE/src/features/public-lists/SavePublicListControl.tsx>).
- 기존 검사: [navigation/PublicListsNavigation.test.tsx](<../FE/src/app/navigation/PublicListsNavigation.test.tsx>). [Parity 17 실행 기록](<../TODO/FE_MEDIUM_PARITY_17_RESULT.md>).
- 화면: [S014](#s014) · [S135](#s135). 인계: [H04](#h04).

<a id="v05"></a>

### V05 — 알림 (1화면)

- 실제 구현: 알림 대상 해석·읽음·Follow·닫힌/차단된 대상 오류·복귀.
- 경계/차이: 알림 목록은 fixture; 녹색선의 원본 의미·실제 이벤트 전달 미확인.
- 사용자 근거: 기존 18. [전체 근거와 범위](#evidence).
- 현재 코드: [notifications/NotificationsScreen.tsx](<../FE/src/features/notifications/NotificationsScreen.tsx>).
- 기존 검사: [navigation/NotificationNavigation.test.tsx](<../FE/src/app/navigation/NotificationNavigation.test.tsx>). [Parity 16 실행 기록](<../TODO/FE_MEDIUM_PARITY_16_RESULT.md>).
- 화면: [S068](#s068). 인계: [H07](#h07).

<a id="v06"></a>

### V06 — 발행·토픽 (7화면)

- 실제 구현: Topics 최대 5개·취소/Save·Publication 선택·Unlisted·미리보기·모의 발행.
- 경계/차이: 실제 Publication 심사/제출·공개 URL·서버 발행 없음; 유효성·멱등성은 현재 mock 계약.
- 사용자 근거: 기존 5. [전체 근거와 범위](#evidence).
- 현재 코드: [editor/PublishTopics.tsx](<../FE/src/features/editor/PublishTopics.tsx>) · [editor/StoryEditorScreen.tsx](<../FE/src/features/editor/StoryEditorScreen.tsx>).
- 기존 검사: [navigation/PublishingNavigation.test.tsx](<../FE/src/app/navigation/PublishingNavigation.test.tsx>). [Parity 9 실행 기록](<../TODO/FE_MEDIUM_PARITY_09_RESULT.md>).
- 화면: [S023](#s023) · [S029](#s029) · [S044](#s044) · [S065](#s065) · [S115](#s115) · [S118](#s118) · [S146](#s146). 인계: [H02](#h02).

<a id="v07"></a>

### V07 — 편집기 서식 (7화면)

- 실제 구현: 리치텍스트·한글 조합·서식·커서·Undo/Redo·명시적 사진 연속 선택 모드.
- 경계/차이: 인용선 18dp·사진 선택 모드 여백/모드 전환 재선택 차이; 원본의 사진 경계 선택 방식은 미수록.
- 사용자 근거: 기존 1·2·4, N1·N3, 후속 2개. [전체 근거와 범위](#evidence).
- 현재 코드: [editor/RichDocumentBody.tsx](<../FE/src/features/editor/RichDocumentBody.tsx>) · [editor/StoryEditorScreen.tsx](<../FE/src/features/editor/StoryEditorScreen.tsx>) · [editor/editorModel.ts](<../FE/src/features/editor/editorModel.ts>) · [editor/RichBody.tsx](<../FE/src/features/editor/RichBody.tsx>) · [editor/nativeEditorHtml.ts](<../FE/src/features/editor/nativeEditorHtml.ts>) · [editor/editorHistory.ts](<../FE/src/features/editor/editorHistory.ts>).
- 기존 검사: [navigation/EditorNavigation.test.tsx](<../FE/src/app/navigation/EditorNavigation.test.tsx>) · [navigation/DraftsNavigation.test.tsx](<../FE/src/app/navigation/DraftsNavigation.test.tsx>) · [editor/RichBody.test.tsx](<../FE/src/features/editor/RichBody.test.tsx>) · [editor/editorImages.test.ts](<../FE/src/features/editor/editorImages.test.ts>). [Parity 9 실행 기록](<../TODO/FE_MEDIUM_PARITY_09_RESULT.md>) · [후속 보정 기록](<../TODO/FE_COMMON_DESIGN_02_RESULT.md#dark-selection-20261127>).
- 화면: [S017](#s017) · [S018](#s018) · [S031](#s031) · [S042](#s042) · [S060](#s060) · [S137](#s137) · [S183](#s183). 인계: [H02](#h02).

<a id="v08"></a>

### V08 — 편집기 이미지 (3화면)

- 실제 구현: Camera/Library 기기 선택·로컬 이미지 수명, Unsplash 형식 fixture 검색/삽입/삭제.
- 경계/차이: 서버 업로드/Unsplash API 없음; 보관 이미지 7개+기존 예시 4개, 가려진 원본 2카드 미확보.
- 사용자 근거: N2, 후속 사진 선택 확인. [전체 근거와 범위](#evidence).
- 현재 코드: [editor/ImagePickerSheet.tsx](<../FE/src/features/editor/ImagePickerSheet.tsx>) · [editor/StoryEditorScreen.tsx](<../FE/src/features/editor/StoryEditorScreen.tsx>) · [editor/createDeviceEditorImageSource.ts](<../FE/src/features/editor/createDeviceEditorImageSource.ts>) · [medium/SOURCES.json](<../FE/assets/medium/SOURCES.json>).
- 기존 검사: [navigation/EditorImagesNavigation.test.tsx](<../FE/src/app/navigation/EditorImagesNavigation.test.tsx>) · [editor/ImagePickerSheet.test.tsx](<../FE/src/features/editor/ImagePickerSheet.test.tsx>). [Parity 9 실행 기록](<../TODO/FE_MEDIUM_PARITY_09_RESULT.md>) · [후속 보정 기록](<../TODO/FE_COMMON_DESIGN_02_RESULT.md#photo-picker-layout-20261127>).
- 화면: [S087](#s087) · [S126](#s126) · [S148](#s148). 인계: [H02](#h02).

<a id="v09"></a>

### V09 — 초안·작성 메뉴 (2화면)

- 실제 구현: 자동 저장·재시도·Close·초안 목록/재개·모의 발행 후 초안 제거.
- 경계/차이: 메모리 source 수명; 프로세스 재실행 복원·동기화 없음. 사용자가 기존 초안을 삭제하는 명령은 미지원(Q04).
- 사용자 근거: 기존 작성/재개 및 후속 2개. [전체 근거와 범위](#evidence).
- 현재 코드: [editor/DraftsScreen.tsx](<../FE/src/features/editor/DraftsScreen.tsx>) · [editor/createDraftSession.ts](<../FE/src/features/editor/createDraftSession.ts>) · [editor/draftSource.ts](<../FE/src/features/editor/draftSource.ts>).
- 기존 검사: [navigation/DraftsNavigation.test.tsx](<../FE/src/app/navigation/DraftsNavigation.test.tsx>). [Parity 9 실행 기록](<../TODO/FE_MEDIUM_PARITY_09_RESULT.md>) · [후속 보정 기록](<../TODO/FE_COMMON_DESIGN_02_RESULT.md#editor-history-design-20261126>).
- 화면: [S030](#s030) · [S139](#s139). 인계: [H02](#h02).

<a id="v10"></a>

### V10 — 멘션 (3화면)

- 실제 구현: @ 검색·동명이인 핸들·대상 ID 삽입·멘션 프로필 이동.
- 경계/차이: 후보는 fixture; 실제 사용자 검색·알림 전송 없음. 멘션 삽입 중 Undo/Redo 숨김/복귀 보정.
- 사용자 근거: 기존 3, 최종 후속 수용. [전체 근거와 범위](#evidence).
- 현재 코드: [editor/DocumentReader.tsx](<../FE/src/features/editor/DocumentReader.tsx>) · [editor/MentionSuggestions.tsx](<../FE/src/features/editor/MentionSuggestions.tsx>).
- 기존 검사: [navigation/EditorNavigation.test.tsx](<../FE/src/app/navigation/EditorNavigation.test.tsx>) · [navigation/DraftsNavigation.test.tsx](<../FE/src/app/navigation/DraftsNavigation.test.tsx>) · [editor/editorMentions.test.ts](<../FE/src/features/editor/editorMentions.test.ts>). [Parity 9 실행 기록](<../TODO/FE_MEDIUM_PARITY_09_RESULT.md>) · [후속 보정 기록](<../TODO/FE_COMMON_DESIGN_02_RESULT.md#mention-layout-20261127>).
- 화면: [S015](#s015) · [S180](#s180) · [S196](#s196). 인계: [H02](#h02).

<a id="v11"></a>

### V11 — 추천 관리 (6화면)

- 실제 구현: Suggestions/Following/Muted/Reading history·필터·동적 A/B 사용자 관리 연결.
- 경계/차이: 추천 알고리즘·개인화 영속성 없음. 별도 원본 시점의 계정 상태를 한 세션 결과로 합치지 않음.
- 사용자 근거: 최종 Android 수용. [전체 근거와 범위](#evidence).
- 현재 코드: [recommendations/RefineRecommendationsScreen.tsx](<../FE/src/features/recommendations/RefineRecommendationsScreen.tsx>).
- 기존 검사: [navigation/RecommendationsNavigation.test.tsx](<../FE/src/app/navigation/RecommendationsNavigation.test.tsx>). [Parity 5 실행 기록](<../TODO/FE_MEDIUM_PARITY_05_RESULT.md>).
- 화면: [S022](#s022) · [S033](#s033) · [S099](#s099) · [S104](#s104) · [S151](#s151) · [S194](#s194). 인계: [H06](#h06).

<a id="v12"></a>

### V12 — 읽기 이력 (3화면)

- 실제 구현: 일반·발행·정책 글 이력/Viewed·개별/전체 삭제·확인/취소.
- 경계/차이: 이력 삭제 후 Undo는 미지원이며 원본 실행 근거도 없음(Q05); 보존 기간/기기 동기화 미정.
- 사용자 근거: 기존 16. [전체 근거와 범위](#evidence).
- 현재 코드: [reading-history/ReadingHistoryList.tsx](<../FE/src/features/reading-history/ReadingHistoryList.tsx>).
- 기존 검사: [navigation/ClapHistoryNavigation.test.tsx](<../FE/src/app/navigation/ClapHistoryNavigation.test.tsx>) · [navigation/ReadingParityNavigation.test.tsx](<../FE/src/app/navigation/ReadingParityNavigation.test.tsx>). [Parity 4 실행 기록](<../TODO/FE_MEDIUM_PARITY_04_RESULT.md>).
- 화면: [S045](#s045) · [S052](#s052) · [S190](#s190). 인계: [H03](#h03).

<a id="v13"></a>

### V13 — 기사 읽기·반응 (10화면)

- 실제 구현: 본문·반응·작성자·관련글·응답 미리보기·공유·읽기 도구 연결.
- 경계/차이: 일부 기사는 전체 본문 미수록 안내만 제공. 누적 반응 모델은 유지하고 하트 모양은 사용자 확정; 서버 집계 없음.
- 사용자 근거: 기존 읽기 흐름, 최종 Android 수용. [전체 근거와 범위](#evidence).
- 현재 코드: [article/ArticleDetailScreen.tsx](<../FE/src/features/article/ArticleDetailScreen.tsx>) · [article/ReferenceArticleView.tsx](<../FE/src/features/article/ReferenceArticleView.tsx>) · [reactions/ClapControl.tsx](<../FE/src/features/reactions/ClapControl.tsx>) · [editor/WrittenStoryScreen.tsx](<../FE/src/features/editor/WrittenStoryScreen.tsx>) · [editor/DocumentReader.tsx](<../FE/src/features/editor/DocumentReader.tsx>).
- 기존 검사: [navigation/ArticleRouteScreen.test.tsx](<../FE/src/app/navigation/ArticleRouteScreen.test.tsx>) · [navigation/ClapHistoryNavigation.test.tsx](<../FE/src/app/navigation/ClapHistoryNavigation.test.tsx>) · [article/ReferenceArticleView.test.tsx](<../FE/src/features/article/ReferenceArticleView.test.tsx>). [Parity 10 실행 기록](<../TODO/FE_MEDIUM_PARITY_10_RESULT.md>) · [후속 보정 기록](<../TODO/FE_COMMON_DESIGN_02_RESULT.md#reader-layout-20261127>).
- 화면: [S007](#s007) · [S037](#s037) · [S102](#s102) · [S140](#s140) · [S147](#s147) · [S164](#s164) · [S175](#s175) · [S179](#s179) · [S187](#s187) · [S189](#s189). 인계: [H03](#h03).

<a id="v14"></a>

### V14 — 작성자·관계 (8화면)

- 실제 구현: 공개 프로필·Follow/Unfollow·이메일 옵션·관계 목록.
- 경계/차이: 원본 미수록 followers 명단·집계/배지 정책은 자체 범위; 실제 이메일 구독·서버 관계 없음.
- 사용자 근거: 기존 12. [전체 근거와 범위](#evidence).
- 현재 코드: [community/ConnectionsScreen.tsx](<../FE/src/features/community/ConnectionsScreen.tsx>) · [community/FollowControl.tsx](<../FE/src/features/community/FollowControl.tsx>) · [community/PublicIdentityScreen.tsx](<../FE/src/features/community/PublicIdentityScreen.tsx>).
- 기존 검사: [navigation/CommunityNavigation.test.tsx](<../FE/src/app/navigation/CommunityNavigation.test.tsx>). [Parity 5 실행 기록](<../TODO/FE_MEDIUM_PARITY_05_RESULT.md>) · [후속 보정 기록](<../TODO/FE_COMMON_DESIGN_02_RESULT.md#reader-layout-20261127>).
- 화면: [S025](#s025) · [S038](#s038) · [S048](#s048) · [S049](#s049) · [S083](#s083) · [S090](#s090) · [S103](#s103) · [S130](#s130). 인계: [H05](#h05).

<a id="v15"></a>

### V15 — 음소거·차단·신고 (7화면)

- 실제 구현: Mute/Block/Report·해제·차단 대상 접근 제한·신고 실패/중복 보호.
- 경계/차이: 앱 메모리 정책만 적용; 원본 차단 캡처의 글 잔존과 구현 접근 제한 차이, 실제 신고 접수/제재 없음.
- 사용자 근거: 최종 Android 수용. [전체 근거와 범위](#evidence).
- 현재 코드: [moderation/ModerationDialogs.tsx](<../FE/src/features/moderation/ModerationDialogs.tsx>) · [moderation/articleModeration.ts](<../FE/src/features/moderation/articleModeration.ts>).
- 기존 검사: [navigation/ModerationNavigation.test.tsx](<../FE/src/app/navigation/ModerationNavigation.test.tsx>) · [responses/ResponseModeration.test.ts](<../FE/src/features/responses/ResponseModeration.test.ts>). [Parity 5 실행 기록](<../TODO/FE_MEDIUM_PARITY_05_RESULT.md>).
- 화면: [S093](#s093) · [S127](#s127) · [S143](#s143) · [S152](#s152) · [S161](#s161) · [S170](#s170) · [S199](#s199). 인계: [H05](#h05).

<a id="v16"></a>

### V16 — 읽기 설정 (6화면)

- 실제 구현: 앱 테마와 별도 reader 테마·80~200%·서체 선택·타인 강조 설정.
- 경계/차이: 선택 옵션/80~200 경계는 자체 정책, 원본 실제 서체 파일 0개. 기사 확대와 OS 확대 구분.
- 사용자 근거: N4·N5, 후속 다크 확인. [전체 근거와 범위](#evidence).
- 현재 코드: [settings/ArticleDisplayPopover.tsx](<../FE/src/features/settings/ArticleDisplayPopover.tsx>) · [settings/useReaderTypography.ts](<../FE/src/features/settings/useReaderTypography.ts>).
- 기존 검사: [navigation/DisplayNavigation.test.tsx](<../FE/src/app/navigation/DisplayNavigation.test.tsx>) · [navigation/ReadingParityNavigation.test.tsx](<../FE/src/app/navigation/ReadingParityNavigation.test.tsx>). [Parity 4 실행 기록](<../TODO/FE_MEDIUM_PARITY_04_RESULT.md>) · [후속 보정 기록](<../TODO/FE_COMMON_DESIGN_02_RESULT.md#dark-selection-20261127>).
- 화면: [S001](#s001) · [S063](#s063) · [S119](#s119) · [S125](#s125) · [S168](#s168) · [S198](#s198). 인계: [H03](#h03).

<a id="v17"></a>

### V17 — 본문 선택·하이라이트 (2화면)

- 실제 구현: 본문 내 선택 손잡이·Copy/Highlight/Respond/Share·바깥 터치 해제·발행 글 강조.
- 경계/차이: 다중 문단은 별도 picker; 읽기 사진/구분선 경계는 미지원. Android 기본 선택 메뉴 제거 보류; 정확 앵커 동일성 미확인.
- 사용자 근거: 기존 6·7·8·16, 후속 Copy 확인. [전체 근거와 범위](#evidence).
- 현재 코드: [highlights/NativePassagePicker.tsx](<../FE/src/features/highlights/NativePassagePicker.tsx>) · [highlights/PassageReader.tsx](<../FE/src/features/highlights/PassageReader.tsx>) · [highlights/NativePassageText.tsx](<../FE/src/features/highlights/NativePassageText.tsx>) · [highlights/PassageMenu.tsx](<../FE/src/features/highlights/PassageMenu.tsx>) · [highlights/HighlightedText.tsx](<../FE/src/features/highlights/HighlightedText.tsx>) · [highlights/passageMenuPosition.ts](<../FE/src/features/highlights/passageMenuPosition.ts>) · [highlights/selectionDocument.ts](<../FE/src/features/highlights/selectionDocument.ts>) · [editor/publishedSelection.ts](<../FE/src/features/editor/publishedSelection.ts>).
- 기존 검사: [navigation/HighlightsNavigation.test.tsx](<../FE/src/app/navigation/HighlightsNavigation.test.tsx>) · [navigation/PublishedReadingNavigation.test.tsx](<../FE/src/app/navigation/PublishedReadingNavigation.test.tsx>) · [highlights/NativePassageText.test.tsx](<../FE/src/features/highlights/NativePassageText.test.tsx>) · [editor/publishedSelection.test.ts](<../FE/src/features/editor/publishedSelection.test.ts>). [Parity 11 실행 기록](<../TODO/FE_MEDIUM_PARITY_11_RESULT.md>) · [후속 보정 기록](<../TODO/FE_COMMON_DESIGN_02_RESULT.md#dark-selection-20261127>).
- 화면: [S012](#s012) · [S122](#s122). 인계: [H03](#h03).

<a id="v18"></a>

### V18 — 오디오 플레이어 (6화면)

- 실제 구현: 일반·정책·발행 글의 무음 Listen·미니/확장·seek·일시정지·닫기.
- 경계/차이: silent-mock; 실제 TTS/음원·백그라운드/오프라인 재생 없음, 이전/다음 큐 버튼 비활성.
- 사용자 근거: 기존 19. [전체 근거와 범위](#evidence).
- 현재 코드: [listening/ListeningPlayer.tsx](<../FE/src/features/listening/ListeningPlayer.tsx>) · [listening/createMockListeningSource.ts](<../FE/src/features/listening/createMockListeningSource.ts>).
- 기존 검사: [navigation/ListeningNavigation.test.tsx](<../FE/src/app/navigation/ListeningNavigation.test.tsx>) · [navigation/PublishedReadingNavigation.test.tsx](<../FE/src/app/navigation/PublishedReadingNavigation.test.tsx>). [Parity 12 실행 기록](<../TODO/FE_MEDIUM_PARITY_12_RESULT.md>).
- 화면: [S050](#s050) · [S055](#s055) · [S128](#s128) · [S141](#s141) · [S160](#s160) · [S192](#s192). 인계: [H08](#h08).

<a id="v19"></a>

### V19 — 오디오 속도·음성 (6화면)

- 실제 구현: 속도·WPM·음성 목록/검색·임시 선택·Done/취소, 기사 이동·추천 줄이기·음소거 확인·신고창 연결.
- 경계/차이: 속도/음성 선택은 무음 mock 메타데이터; 기사 이동·추천·음소거·신고는 별도 로컬/모의 기능. 실제 발화/번역·AirPlay·재생 큐 미지원, WPM 산식은 자체 비교값.
- 사용자 근거: 기존 19. [전체 근거와 범위](#evidence).
- 현재 코드: [listening/ListeningSpeedPanel.tsx](<../FE/src/features/listening/ListeningSpeedPanel.tsx>) · [listening/ListeningVoicePanel.tsx](<../FE/src/features/listening/ListeningVoicePanel.tsx>). 메뉴/공유 연결: [ListeningMenu](../FE/src/features/listening/ListeningMenu.tsx) · [ListeningPlayer](../FE/src/features/listening/ListeningPlayer.tsx).
- 기존 검사: [navigation/ListeningNavigation.test.tsx](<../FE/src/app/navigation/ListeningNavigation.test.tsx>). [Parity 12 실행 기록](<../TODO/FE_MEDIUM_PARITY_12_RESULT.md>).
- 화면: [S003](#s003) · [S016](#s016) · [S046](#s046) · [S088](#s088) · [S131](#s131) · [S154](#s154). 인계: 오디오 [H08](#h08), 메뉴의 기사 이동 [H03](#h03)·추천 [H06](#h06)·음소거/신고 [H05](#h05).

<a id="v20"></a>

### V20 — 응답·답글 (17화면)

- 실제 구현: 응답/인용·답글·수정/삭제·정렬·숨김/닫힘·수명/권한 보호.
- 경계/차이: source 메모리 저장·자체 깊이/정렬/집계; 실제 타 사용자 조회·서버 소유권 검증·알림 없음.
- 사용자 근거: 기존 8. [전체 근거와 범위](#evidence).
- 현재 코드: [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>).
- 기존 검사: [navigation/ResponsesNavigation.test.tsx](<../FE/src/app/navigation/ResponsesNavigation.test.tsx>) · [responses/ResponseModeration.test.ts](<../FE/src/features/responses/ResponseModeration.test.ts>). [Parity 10 실행 기록](<../TODO/FE_MEDIUM_PARITY_10_RESULT.md>).
- 화면: [S009](#s009) · [S010](#s010) · [S019](#s019) · [S032](#s032) · [S062](#s062) · [S071](#s071) · [S072](#s072) · [S092](#s092) · [S097](#s097) · [S100](#s100) · [S111](#s111) · [S112](#s112) · [S124](#s124) · [S142](#s142) · [S158](#s158) · [S181](#s181) · [S197](#s197). 인계: [H05](#h05).

<a id="v21"></a>

### V21 — 정책 기사 (1화면)

- 실제 구현: 응답→정책 기사·작성자/반응/Listen/공유·원래 화면 복귀.
- 경계/차이: 보관 발췌·원본 강조 표시·공식 링크만 제공. 전문·현재 정책·실제 집계 미확인; PolicyArticle의 정적 Text에는 개인 구절 선택/Highlight 저장 경로가 없음.
- 사용자 근거: 최종 Android 수용. [전체 근거와 범위](#evidence).
- 현재 코드: [responses/ResponsePolicyLink.tsx](<../FE/src/features/responses/ResponsePolicyLink.tsx>) · [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>).
- 기존 검사: [navigation/PolicyNavigation.test.tsx](<../FE/src/app/navigation/PolicyNavigation.test.tsx>). [Parity 3 실행 기록](<../TODO/FE_MEDIUM_PARITY_03_RESULT.md>).
- 화면: [S008](#s008). 인계: [H03](#h03).

<a id="v22"></a>

### V22 — 기사 저장 (2화면)

- 실제 구현: Save to 복수 목록 선택·Done 확정·새 목록·취소/실패 복구.
- 경계/차이: 사용자 결정대로 목록 사이 구분선만 제거, 헤더/Create new list 구분선 유지; 실제 서버 저장 없음.
- 사용자 근거: 기존 13, N4. [전체 근거와 범위](#evidence).
- 현재 코드: [bookmarks/ArticleBookmarkControl.tsx](<../FE/src/features/bookmarks/ArticleBookmarkControl.tsx>) · [bookmarks/SaveToListSheet.tsx](<../FE/src/features/bookmarks/SaveToListSheet.tsx>).
- 기존 검사: [navigation/BookmarkNavigation.test.tsx](<../FE/src/app/navigation/BookmarkNavigation.test.tsx>). [Parity 7 실행 기록](<../TODO/FE_MEDIUM_PARITY_07_RESULT.md>) · [후속 보정 기록](<../TODO/FE_COMMON_DESIGN_02_RESULT.md#s036-save-sheet-followup>).
- 화면: [S036](#s036) · [S172](#s172). 인계: [H04](#h04).

<a id="v23"></a>

### V23 — 공유 (4화면)

- 실제 구현: 실제 Clipboard·OS Share 호출·카드 PNG capture·사진 보관함 저장 adapter.
- 경계/차이: OS 복귀 returned는 전달 완료 증거가 아님. 공유 URL은 kostolany.invalid 모의 주소이며 Friend 링크도 실제 발급하지 않음. 파일 이미지 저장과 목록 메모리 다운로드는 다름.
- 사용자 근거: 기존 9, 후속 Copy; 실제 수신자 전달은 미확인. [전체 근거와 범위](#evidence).
- 현재 코드: [sharing/ShareCard.tsx](<../FE/src/features/sharing/ShareCard.tsx>) · [sharing/ShareSheet.tsx](<../FE/src/features/sharing/ShareSheet.tsx>) · [sharing/shareAdapter.ts](<../FE/src/features/sharing/shareAdapter.ts>) · [sharing/types.ts](<../FE/src/features/sharing/types.ts>).
- 기존 검사: [navigation/SharingNavigation.test.tsx](<../FE/src/app/navigation/SharingNavigation.test.tsx>) · [sharing/shareAdapter.test.ts](<../FE/src/features/sharing/shareAdapter.test.ts>). [Parity 13 실행 기록](<../TODO/FE_MEDIUM_PARITY_13_RESULT.md>).
- 화면: [S028](#s028) · [S051](#s051) · [S073](#s073) · [S163](#s163). 인계: [H09](#h09).

<a id="v24"></a>

### V24 — Library·목록 카드 (7화면)

- 실제 구현: Your/Saved lists·Digest·Highlighted·Reading history·빈/저장/다크 카드.
- 경계/차이: 목록/강조/다운로드는 메모리 상태; 원본 계정·집계·콘텐츠 snapshot과 현재 사용자 데이터는 다름.
- 사용자 근거: 기존 13·16. [전체 근거와 범위](#evidence).
- 현재 코드: [bookmarks/LibraryScreen.tsx](<../FE/src/features/bookmarks/LibraryScreen.tsx>) · [highlights/HighlightList.tsx](<../FE/src/features/highlights/HighlightList.tsx>).
- 기존 검사: [navigation/BookmarkNavigation.test.tsx](<../FE/src/app/navigation/BookmarkNavigation.test.tsx>) · [navigation/DisplayNavigation.test.tsx](<../FE/src/app/navigation/DisplayNavigation.test.tsx>). [Parity 7 실행 기록](<../TODO/FE_MEDIUM_PARITY_07_RESULT.md>) · [후속 보정 기록](<../TODO/FE_COMMON_DESIGN_02_RESULT.md#representative-typography-20261127>).
- 화면: [S039](#s039) · [S058](#s058) · [S066](#s066) · [S085](#s085) · [S095](#s095) · [S108](#s108) · [S145](#s145). 인계: [H04](#h04).

<a id="v25"></a>

### V25 — 내 목록·편집 (19화면)

- 실제 구현: 목록 생성/편집/메모·드래그/접근성 순서 이동·취소/Done·비공개·삭제·Remove/Undo.
- 경계/차이: 자체 소유권/충돌/시간 정책; 기본 Reading list 삭제 제한. 실제 공유/다른 기기 정합성 미연결.
- 사용자 근거: 기존 13·14·15. [전체 근거와 범위](#evidence).
- 현재 코드: [bookmarks/ListActions.tsx](<../FE/src/features/bookmarks/ListActions.tsx>) · [bookmarks/ListEditorSheet.tsx](<../FE/src/features/bookmarks/ListEditorSheet.tsx>) · [bookmarks/ListNoteSheet.tsx](<../FE/src/features/bookmarks/ListNoteSheet.tsx>) · [bookmarks/ListStoryCard.tsx](<../FE/src/features/bookmarks/ListStoryCard.tsx>) · [bookmarks/ReadingListScreen.tsx](<../FE/src/features/bookmarks/ReadingListScreen.tsx>) · [bookmarks/ReorderListEditor.tsx](<../FE/src/features/bookmarks/ReorderListEditor.tsx>) · [bookmarks/createUserListStore.ts](<../FE/src/features/bookmarks/createUserListStore.ts>) · [bookmarks/listTypes.ts](<../FE/src/features/bookmarks/listTypes.ts>) · [bookmarks/ListDetailMetadata.tsx](<../FE/src/features/bookmarks/ListDetailMetadata.tsx>) · [bookmarks/LibrarySheet.tsx](<../FE/src/features/bookmarks/LibrarySheet.tsx>) · [navigation/ReadingListRoute.tsx](<../FE/src/app/navigation/ReadingListRoute.tsx>).
- 기존 검사: [navigation/ListEditingNavigation.test.tsx](<../FE/src/app/navigation/ListEditingNavigation.test.tsx>) · [navigation/ListManagementNavigation.test.tsx](<../FE/src/app/navigation/ListManagementNavigation.test.tsx>) · [navigation/PublishedLibrarySession.test.tsx](<../FE/src/app/navigation/PublishedLibrarySession.test.tsx>). [Parity 7 실행 기록](<../TODO/FE_MEDIUM_PARITY_07_RESULT.md>).
- 화면: [S002](#s002) · [S011](#s011) · [S056](#s056) · [S076](#s076) · [S077](#s077) · [S078](#s078) · [S081](#s081) · [S101](#s101) · [S105](#s105) · [S106](#s106) · [S109](#s109) · [S114](#s114) · [S121](#s121) · [S155](#s155) · [S157](#s157) · [S177](#s177) · [S191](#s191) · [S195](#s195) · [S200](#s200). 인계: [H04](#h04).

<a id="v26"></a>

### V26 — 다운로드 (2화면)

- 실제 구현: 일반+발행 문서/사진의 메모리 사본·진행/완료/취소/실패·철회·제거.
- 경계/차이: 파일 Downloads 저장·디스크 영속화·실제 네트워크 단절 보장 없음. 앱 재시작 보존도 미지원.
- 사용자 근거: 기존 23. [전체 근거와 범위](#evidence).
- 현재 코드: [downloads/DownloadControl.tsx](<../FE/src/features/downloads/DownloadControl.tsx>) · [downloads/createDownloadStore.ts](<../FE/src/features/downloads/createDownloadStore.ts>) · [downloads/createMockDownloadSource.ts](<../FE/src/features/downloads/createMockDownloadSource.ts>) · [downloads/DownloadProvider.tsx](<../FE/src/features/downloads/DownloadProvider.tsx>) · [editor/WrittenStoryScreen.tsx](<../FE/src/features/editor/WrittenStoryScreen.tsx>) · [downloads/publishedDownload.ts](<../FE/src/features/downloads/publishedDownload.ts>) · [downloads/publishedDownload.test.ts](<../FE/src/features/downloads/publishedDownload.test.ts>) · [navigation/PublishedDownloadsNavigation.test.tsx](<../FE/src/app/navigation/PublishedDownloadsNavigation.test.tsx>).
- 기존 검사: [navigation/DownloadsNavigation.test.tsx](<../FE/src/app/navigation/DownloadsNavigation.test.tsx>) · [navigation/PublishedDownloadsNavigation.test.tsx](<../FE/src/app/navigation/PublishedDownloadsNavigation.test.tsx>) · [downloads/publishedDownload.test.ts](<../FE/src/features/downloads/publishedDownload.test.ts>). [Parity 8 실행 기록](<../TODO/FE_MEDIUM_PARITY_08_RESULT.md>).
- 화면: [S089](#s089) · [S165](#s165). 인계: [H04](#h04).

<a id="v27"></a>

### V27 — Digest (4화면)

- 실제 구현: 최근 10호 날짜 초안/Done·기사/작성자/반응·설정 이동·Mute 필터.
- 경계/차이: fixture 호/날짜·자체 필터 정책; 실제 배포/이메일 Digest 생성·전송 없음.
- 사용자 근거: 기존 22. [전체 근거와 범위](#evidence).
- 현재 코드: [bookmarks/LibraryScreen.tsx](<../FE/src/features/bookmarks/LibraryScreen.tsx>) · [community/IdentityLink.tsx](<../FE/src/features/community/IdentityLink.tsx>) · [digest/DigestPanel.tsx](<../FE/src/features/digest/DigestPanel.tsx>) · [notifications/NotificationSettingsScreen.tsx](<../FE/src/features/notifications/NotificationSettingsScreen.tsx>) · [reactions/ClapControl.tsx](<../FE/src/features/reactions/ClapControl.tsx>) · [responses/ResponseButton.tsx](<../FE/src/features/responses/ResponseButton.tsx>).
- 기존 검사: [navigation/DigestNavigation.test.tsx](<../FE/src/app/navigation/DigestNavigation.test.tsx>). [Parity 6 실행 기록](<../TODO/FE_MEDIUM_PARITY_06_RESULT.md>).
- 화면: [S096](#s096) · [S116](#s116) · [S132](#s132) · [S193](#s193). 인계: [H07](#h07).

<a id="v28"></a>

### V28 — Digest·Push 설정 (3화면)

- 실제 구현: Push/Email/Digest 선호·옵션 저장/복원·OS 알림 권한 adapter.
- 경계/차이: OS 권한과 원격 토큰 등록/푸시 전송은 별개; 실제 메일/Push 미연결, 원본 잘린 하단 항목 미확인.
- 사용자 근거: 기존 18·22. [전체 근거와 범위](#evidence).
- 현재 코드: [notifications/NotificationSettingsScreen.tsx](<../FE/src/features/notifications/NotificationSettingsScreen.tsx>) · [notifications/NotificationPermissionProvider.tsx](<../FE/src/features/notifications/NotificationPermissionProvider.tsx>) · [notifications/notificationPermissionAdapter.native.ts](<../FE/src/features/notifications/notificationPermissionAdapter.native.ts>).
- 기존 검사: [navigation/NotificationNavigation.test.tsx](<../FE/src/app/navigation/NotificationNavigation.test.tsx>) · [notifications/notificationPermissionAdapter.test.ts](<../FE/src/features/notifications/notificationPermissionAdapter.test.ts>). [Parity 16 실행 기록](<../TODO/FE_MEDIUM_PARITY_16_RESULT.md>).
- 화면: [S040](#s040) · [S162](#s162) · [S186](#s186). 인계: [H07](#h07).

<a id="v29"></a>

### V29 — 인증·로그아웃 (10화면)

- 실제 구현: 소셜 모의 로그인 A/B·이메일/코드·오류/재전송·로그아웃/취소/계정 격리.
- 경계/차이: 실제 OAuth·메일 발송/소유권 확인·Supabase 세션·프로세스 재시작 복원 없음.
- 사용자 근거: 기존 24. [전체 근거와 범위](#evidence).
- 현재 코드: [auth/AuthDialogs.tsx](<../FE/src/features/auth/AuthDialogs.tsx>) · [auth/EmailLogin.tsx](<../FE/src/features/auth/EmailLogin.tsx>) · [auth/createEmailAttempt.ts](<../FE/src/features/auth/createEmailAttempt.ts>) · [auth/AuthProvider.tsx](<../FE/src/features/auth/AuthProvider.tsx>).
- 기존 검사: [navigation/AuthNavigation.test.tsx](<../FE/src/app/navigation/AuthNavigation.test.tsx>) · [navigation/EmailAuthNavigation.test.tsx](<../FE/src/app/navigation/EmailAuthNavigation.test.tsx>) · [navigation/AuthBoundaryNavigation.test.tsx](<../FE/src/app/navigation/AuthBoundaryNavigation.test.tsx>). [Parity 14 실행 기록](<../TODO/FE_MEDIUM_PARITY_14_RESULT.md>).
- 화면: [S013](#s013) · [S024](#s024) · [S034](#s034) · [S054](#s054) · [S064](#s064) · [S117](#s117) · [S134](#s134) · [S166](#s166) · [S171](#s171) · [S182](#s182). 인계: [H01](#h01).

<a id="v30"></a>

### V30 — 온보딩·시작 (6화면)

- 실제 구현: 시작 자산/StartupBoundary·가입·관심사 최소 3개·추천 Follow·Skip/OS 권한·온보딩 재개.
- 경계/차이: 시작은 대체 워드마크, 온보딩 저장은 mock; 캡처를 신규 가입 전용으로 단정하지 않음.
- 사용자 근거: 기존 시작 화면 확인, 최종 Android 수용. [전체 근거와 범위](#evidence).
- 현재 코드: [onboarding/OnboardingScreen.tsx](<../FE/src/features/onboarding/OnboardingScreen.tsx>) · [onboarding/createOnboardingSession.ts](<../FE/src/features/onboarding/createOnboardingSession.ts>) · [ui/StartupBoundary.tsx](<../FE/src/shared/ui/StartupBoundary.tsx>) · [FE/app.json](<../FE/app.json>).
- 기존 검사: [navigation/OnboardingNavigation.test.tsx](<../FE/src/app/navigation/OnboardingNavigation.test.tsx>) · [app/App.test.tsx](<../FE/src/app/App.test.tsx>). [Parity 14 실행 기록](<../TODO/FE_MEDIUM_PARITY_14_RESULT.md>).
- 화면: [S006](#s006) · [S035](#s035) · [S041](#s041) · [S043](#s043) · [S067](#s067) · [S184](#s184). 인계: [H01](#h01).

<a id="v31"></a>

### V31 — 멤버십 (5화면)

- 실제 구현: Member/Friend·월/연 선택·모의 확정/실패·혜택 자격·Welcome.
- 경계/차이: 실제 스토어 구매/영수증/복원/갱신/해지 없음. 사용자 20번은 기간 선택/닫기이며 구매 Select 성공 증거가 아님.
- 사용자 근거: 기존 20(기간 선택·닫기). [전체 근거와 범위](#evidence).
- 현재 코드: [membership/MembershipSheet.tsx](<../FE/src/features/membership/MembershipSheet.tsx>).
- 기존 검사: [navigation/MembershipNavigation.test.tsx](<../FE/src/app/navigation/MembershipNavigation.test.tsx>). [Parity 19 실행 기록](<../TODO/FE_MEDIUM_PARITY_19_RESULT.md>).
- 화면: [S059](#s059) · [S084](#s084) · [S129](#s129) · [S133](#s133) · [S159](#s159). 인계: [H08](#h08).

<a id="v32"></a>

### V32 — 내 프로필·편집 (18화면)

- 실제 구현: 프로필 이름/bio·사진 기기 선택·대명사 최대 4개·부모 Save/Cancel·Stories/Lists/About.
- 경계/차이: 사진은 로컬 URI/수명 관리, 업로드·서버 프로필 영속 저장 없음. 원본 OS 앨범과 Android picker 모습은 다름.
- 사용자 근거: 기존 17, 최종 후속 수용. [전체 근거와 범위](#evidence).
- 현재 코드: [editor/WrittenStoryActions.tsx](<../FE/src/features/editor/WrittenStoryActions.tsx>) · [editor/WrittenStoryCardReactions.tsx](<../FE/src/features/editor/WrittenStoryCardReactions.tsx>) · [profile/ProfileEditorSheet.tsx](<../FE/src/features/profile/ProfileEditorSheet.tsx>) · [profile/ProfileScreen.tsx](<../FE/src/features/profile/ProfileScreen.tsx>) · [profile/ProfileStories.tsx](<../FE/src/features/profile/ProfileStories.tsx>) · [profile/PronounsEditor.tsx](<../FE/src/features/profile/PronounsEditor.tsx>) · [profile/useProfilePhotoSelection.ts](<../FE/src/features/profile/useProfilePhotoSelection.ts>).
- 기존 검사: [navigation/ProfileDetailsNavigation.test.tsx](<../FE/src/app/navigation/ProfileDetailsNavigation.test.tsx>) · [navigation/ProfileNavigation.test.tsx](<../FE/src/app/navigation/ProfileNavigation.test.tsx>). [Parity 15 실행 기록](<../TODO/FE_MEDIUM_PARITY_15_RESULT.md>) · [후속 보정 기록](<../TODO/FE_COMMON_DESIGN_02_RESULT.md#representative-typography-20261127>).
- 화면: [S005](#s005) · [S020](#s020) · [S027](#s027) · [S047](#s047) · [S074](#s074) · [S080](#s080) · [S082](#s082) · [S094](#s094) · [S113](#s113) · [S120](#s120) · [S123](#s123) · [S136](#s136) · [S138](#s138) · [S144](#s144) · [S156](#s156) · [S167](#s167) · [S169](#s169) · [S178](#s178). 인계: [H09](#h09).

<a id="v33"></a>

### V33 — 설정·앱 아이콘 (4화면)

- 실제 구현: 설정 목적지·외부 링크·앱 테마·아이콘 선택과 native adapter.
- 경계/차이: 계정/Facebook은 mock; 앱 아이콘 어댑터는 모듈 가용성에 따름. 현재 아이콘 모양 확정으로 수정 대상 아님.
- 사용자 근거: N3·N4, 기존 24, 최종 Android 수용. [전체 근거와 범위](#evidence).
- 현재 코드: [app-icon/AppIconScreen.tsx](<../FE/src/features/app-icon/AppIconScreen.tsx>) · [settings/SettingsExtrasScreen.tsx](<../FE/src/features/settings/SettingsExtrasScreen.tsx>) · [settings/SettingsScreen.tsx](<../FE/src/features/settings/SettingsScreen.tsx>) · [app-icon/appIconAdapter.ts](<../FE/src/features/app-icon/appIconAdapter.ts>).
- 기존 검사: [navigation/SettingsExtrasNavigation.test.tsx](<../FE/src/app/navigation/SettingsExtrasNavigation.test.tsx>) · [navigation/DisplayNavigation.test.tsx](<../FE/src/app/navigation/DisplayNavigation.test.tsx>). [Parity 18 실행 기록](<../TODO/FE_MEDIUM_PARITY_18_RESULT.md>).
- 화면: [S075](#s075) · [S110](#s110) · [S149](#s149) · [S173](#s173). 인계: [H09](#h09).

<a id="v34"></a>

### V34 — 글 통계 (3화면)

- 실제 구현: 월간/일자 그래프·Lifetime·Latest/Views/Reads·빈/미집계·글 이동.
- 경계/차이: 통계 fixture/자체 UTC 정책; 실제 이벤트 수집·분석/정산 없음, 과거 11/2와 현재 0/미집계 차이 유지.
- 사용자 근거: 기존 21. [전체 근거와 범위](#evidence).
- 현재 코드: [story-stats/StoryStatsScreen.tsx](<../FE/src/features/story-stats/StoryStatsScreen.tsx>).
- 기존 검사: [navigation/StoryStatsNavigation.test.tsx](<../FE/src/app/navigation/StoryStatsNavigation.test.tsx>). [Parity 20 실행 기록](<../TODO/FE_MEDIUM_PARITY_20_RESULT.md>).
- 화면: [S150](#s150) · [S153](#s153) · [S188](#s188). 인계: [H10](#h10).

<a id="screens"></a>

## 고유 화면 200개 판정

S별 원본/코드/구현 경계와 기존 사용자·자동 검사 근거는 아래에 연결했다. R 1,395개 세부 행의 최신 판정은 각 요구 문서에 반영했다. 원본 관찰값은 바꾸지 않았으며 데이터/레이아웃/조작/상태를 서로 다른 종류의 근거로 판정했다. 같은 원본이 여러 흐름에 쓰이면 T별 맥락을 별도로 유지한다.

<a id="s001"></a>

### S001 — 타인 하이라이트 숨김

- 원본: `sc_00409287a68f4416941e39326f6df6b9` · [PNG](<../medium/flows/Home/Story detail/Changing display/screens/07_sc_00409287a68f4416941e39326f6df6b9.png>) · [분석](<../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s001>).
- 조건: Article 더보기 → Display settings → 100/120%, font, appearance, highlights. DisplaySettingsSource; S063 기본관찰값, S125=120%, S198=Dark120%, S001=others off. 상세 조건은 [S001 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s001>).
- FE: [settings/ArticleDisplayPopover.tsx](<../FE/src/features/settings/ArticleDisplayPopover.tsx>) · [settings/useReaderTypography.ts](<../FE/src/features/settings/useReaderTypography.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V16 읽기 설정](#v16).
- 판정: 로컬 화면/상태 연결 확인; V16의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 선택 옵션/80~200 경계는 자체 정책, 원본 실제 서체 파일 0개. 기사 확대와 OS 확대 구분.
- 전이: [T-F24-07](#t-f24-07). 계약: [C02](#c02) · [C12](#c12) · [C13](#c13). 미확인: [U-S001](#u-s001) · [U-F24](#u-f24). 인계 [H03](#h03).

<a id="s002"></a>

### S002 — 리스트 메모 반영

- 원본: `sc_02d96a649c7a461b9c07155d33c1dbfc` · [PNG](<../medium/flows/Library/List detail/Adding a note/screens/05_sc_02d96a649c7a461b9c07155d33c1dbfc.png>) · [분석](<../medium/flows/Library/List detail/Adding a note/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s002>).
- 조건: Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo. UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; source 확정 updatedAt;14/6/1초 독립 조건. 상세 조건은 [S002 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s002>).
- FE: [bookmarks/ListActions.tsx](<../FE/src/features/bookmarks/ListActions.tsx>) · [bookmarks/ListEditorSheet.tsx](<../FE/src/features/bookmarks/ListEditorSheet.tsx>) · [bookmarks/ListNoteSheet.tsx](<../FE/src/features/bookmarks/ListNoteSheet.tsx>) · [bookmarks/ListStoryCard.tsx](<../FE/src/features/bookmarks/ListStoryCard.tsx>) · [bookmarks/ReadingListScreen.tsx](<../FE/src/features/bookmarks/ReadingListScreen.tsx>) · [bookmarks/ReorderListEditor.tsx](<../FE/src/features/bookmarks/ReorderListEditor.tsx>) · [bookmarks/createUserListStore.ts](<../FE/src/features/bookmarks/createUserListStore.ts>) · [bookmarks/listTypes.ts](<../FE/src/features/bookmarks/listTypes.ts>) · [bookmarks/ListDetailMetadata.tsx](<../FE/src/features/bookmarks/ListDetailMetadata.tsx>) · [bookmarks/LibrarySheet.tsx](<../FE/src/features/bookmarks/LibrarySheet.tsx>) · [navigation/ReadingListRoute.tsx](<../FE/src/app/navigation/ReadingListRoute.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V25 내 목록·편집](#v25).
- 판정: 로컬 화면/상태 연결 확인; V25의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 자체 소유권/충돌/시간 정책; 기본 Reading list 삭제 제한. 실제 공유/다른 기기 정합성 미연결.
- 전이: [T-F45-05](#t-f45-05). 계약: [C28](#c28) · [C30](#c30) · [C31](#c31) · [C32](#c32) · [C33](#c33) · [C34](#c34) · [C35](#c35). 미확인: [U-S002](#u-s002) · [U-F45](#u-f45). 인계 [H04](#h04).

<a id="s003"></a>

### S003 — 플레이어 더보기

- 원본: `sc_0414c81870534989959d677ecede926c` · [PNG](<../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/02_sc_0414c81870534989959d677ecede926c.png>) · [분석](<../medium/flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>) · [R 9개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s003>).
- 조건: 확장 플레이어 → Speed 또는 더보기 → Select a voice → 언어 스크롤·Hans → Done. ListeningOptionsSource; Emma/Hans, 1x200WPM·2.5x490WPM은 관찰값 fixture. 상세 조건은 [S003 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s003>).
- FE: [listening/ListeningSpeedPanel.tsx](<../FE/src/features/listening/ListeningSpeedPanel.tsx>) · [listening/ListeningVoicePanel.tsx](<../FE/src/features/listening/ListeningVoicePanel.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V19 오디오 속도·음성](#v19). 메뉴/공유 연결: [ListeningMenu](../FE/src/features/listening/ListeningMenu.tsx) · [ListeningPlayer](../FE/src/features/listening/ListeningPlayer.tsx).
- 판정: 로컬 화면/상태 연결 확인; V19의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. AirPlay는 미지원. 지원/한계: 속도/음성 선택은 무음 mock 메타데이터; 기사 이동·추천·음소거·신고는 별도 로컬/모의 기능. 실제 발화/번역·AirPlay·재생 큐 미지원, WPM 산식은 자체 비교값.
- 전이: [T-F28-02](#t-f28-02). 계약: [C59](#c59) · [C60](#c60) · [C61](#c61). 미확인: [U-S003](#u-s003) · [U-F28](#u-f28). 인계: 오디오 [H08](#h08), 기사 이동 [H03](#h03), 추천 [H06](#h06), 음소거/신고 [H05](#h05).

<a id="s004"></a>

### S004 — 검색 진입과 토픽 탐색

- 원본: `sc_047c91d900aa47448d61e4faacd68ad5` · [PNG](<../medium/flows/Explore/Searching Medium/screens/02_sc_047c91d900aa47448d61e4faacd68ad5.png>) · [분석](<../medium/flows/Explore/Searching Medium/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s004>).
- 조건: Main/Explore → 검색 진입·Mindfulness 입력·Stories; Staff Picks/Who to follow 위치까지 세로·가로 이동. mediumFeedFixtures / SearchScreen·CatalogSearchResults; 칩·캐러셀 위치는 화면별 설정. 상세 조건은 [S004 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s004>).
- FE: [search/CatalogSearchResults.tsx](<../FE/src/features/search/CatalogSearchResults.tsx>) · [search/ExploreSections.tsx](<../FE/src/features/search/ExploreSections.tsx>) · [search/SearchScreen.tsx](<../FE/src/features/search/SearchScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V02 탐색·검색](#v02).
- 판정: 로컬 화면/상태 연결 확인; V02의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 검색 정렬·카테고리 계층은 자체 정책; 일부만 캡처된 Staff Pick은 안내로 처리하고 본문을 생성하지 않음.
- 전이: [T-F02-02](#t-f02-02). 계약: [C06](#c06) · [C07](#c07). 미확인: [U-S004](#u-s004) · [U-F02](#u-f02). 인계 [H06](#h06).

<a id="s005"></a>

### S005 — 프로필 사진 선택 반영

- 원본: `sc_05df03a16c6b466b8ba91d9d6244c2f5` · [PNG](<../medium/flows/Profile/Editing profile information/Adding pronouns/screens/01_sc_05df03a16c6b466b8ba91d9d6244c2f5.png>) · [분석](<../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s005>).
- 조건: Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save. ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도. 상세 조건은 [S005 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s005>).
- FE: [editor/WrittenStoryActions.tsx](<../FE/src/features/editor/WrittenStoryActions.tsx>) · [editor/WrittenStoryCardReactions.tsx](<../FE/src/features/editor/WrittenStoryCardReactions.tsx>) · [profile/ProfileEditorSheet.tsx](<../FE/src/features/profile/ProfileEditorSheet.tsx>) · [profile/ProfileScreen.tsx](<../FE/src/features/profile/ProfileScreen.tsx>) · [profile/ProfileStories.tsx](<../FE/src/features/profile/ProfileStories.tsx>) · [profile/PronounsEditor.tsx](<../FE/src/features/profile/PronounsEditor.tsx>) · [profile/useProfilePhotoSelection.ts](<../FE/src/features/profile/useProfilePhotoSelection.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V32 내 프로필·편집](#v32). OS 위임 근거: [profilePhotoPicker](../FE/src/features/profile/profilePhotoPicker.ts) · [pickLocalImage](../FE/src/shared/media/pickLocalImage.ts).
- 판정: 로컬 화면/상태 연결 확인; V32의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 사진은 로컬 URI/수명 관리, 업로드·서버 프로필 영속 저장 없음. 원본 OS 앨범과 Android picker 모습은 다름.
- 전이: [T-F56-01](#t-f56-01) · [T-F57-05](#t-f57-05). 계약: [C51](#c51) · [C52](#c52) · [C53](#c53). 미확인: [U-S005](#u-s005) · [U-F56](#u-f56) · [U-F57](#u-f57). 인계 [H09](#h09).

<a id="s006"></a>

### S006 — 관심 주제 다중 선택

- 원본: `sc_05f2a886f5464a728dd61a6291707a3d` · [PNG](<../medium/flows/Onboarding/screens/09_sc_05f2a886f5464a728dd61a6291707a3d.png>) · [분석](<../medium/flows/Onboarding/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s006>).
- 조건: guest signup → Onboarding → interests → recommendations → permission → welcome; S043은 실제 cold start. OnboardingSource·NotificationPermissionSource; 관심5개/추천Follow/안내 상태; S043 대응 splash 없음. 상세 조건은 [S006 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s006>).
- FE: [onboarding/OnboardingScreen.tsx](<../FE/src/features/onboarding/OnboardingScreen.tsx>) · [onboarding/createOnboardingSession.ts](<../FE/src/features/onboarding/createOnboardingSession.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V30 온보딩·시작](#v30).
- 판정: 로컬 화면/상태 연결 확인; V30의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 시작은 대체 워드마크, 온보딩 저장은 mock; 캡처를 신규 가입 전용으로 단정하지 않음.
- 전이: [T-F53-09](#t-f53-09). 계약: [C49](#c49) · [C50](#c50). 미확인: [U-S006](#u-s006) · [U-F53](#u-f53). 인계 [H01](#h01).

<a id="s007"></a>

### S007 — 박수 전송 피드백

- 원본: `sc_0629a27b99a645cabe6e110b5d3d3d57` · [PNG](<../medium/flows/Home/Story detail/Sending claps/screens/02_sc_0629a27b99a645cabe6e110b5d3d3d57.png>) · [분석](<../medium/flows/Home/Story detail/Sending claps/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s007>).
- 조건: Home/Explore 기사 → Article(articleId); 본문·말미·응답 미리보기까지 스크롤; 박수 조작. medium-brain 기본 기사; F16의834와 박수 흐름832는 독립 response fixture. 상세 조건은 [S007 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s007>).
- FE: [article/ArticleDetailScreen.tsx](<../FE/src/features/article/ArticleDetailScreen.tsx>) · [article/ReferenceArticleView.tsx](<../FE/src/features/article/ReferenceArticleView.tsx>) · [reactions/ClapControl.tsx](<../FE/src/features/reactions/ClapControl.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V13 기사 읽기·반응](#v13).
- 판정: 로컬 화면/상태 연결 확인; V13의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 일부 기사는 전체 본문 미수록 안내만 제공. 누적 반응 모델은 유지하고 하트 모양은 사용자 확정; 서버 집계 없음.
- 전이: [T-F38-02](#t-f38-02). 계약: [C09](#c09) · [C10](#c10) · [C11](#c11) · [C12](#c12). 미확인: [U-S007](#u-s007) · [U-F38](#u-f38). 인계 [H03](#h03).

<a id="s008"></a>

### S008 — Medium Rules 정책 문서

- 원본: `sc_063290fab51b4acd913212f85acde70d` · [PNG](<../medium/flows/Home/Story detail/Responses/Medium policy/screens/02_sc_063290fab51b4acd913212f85acde70d.png>) · [분석](<../medium/flows/Home/Story detail/Responses/Medium policy/ANALYSIS.md>) · [R 13개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s008>).
- 조건: Article → Responses/본문 shield → PolicyArticle → 원래 응답/기사 복귀; 저장 후 Library → PolicyArticleScreen 재열기. medium-rules/medium-policy-author; 보이는 2문단과 세 번째 문단 시작/54K 초기 박수; 실제 mock 응답 0→1, 원본272와 차이 유지. 상세 조건은 [S008 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s008>).
- FE: [responses/ResponsePolicyLink.tsx](<../FE/src/features/responses/ResponsePolicyLink.tsx>) · [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V21 정책 기사](#v21).
- 판정: 로컬 화면/상태 연결 확인; V21의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 정책 발췌는 개인 구절 선택/Highlight 저장 미지원. 지원/한계: 보관 발췌·원본 강조 표시·공식 링크만 제공. 전문·현재 정책·실제 집계 미확인; PolicyArticle의 정적 Text에는 개인 구절 선택/Highlight 저장 경로가 없음.
- 전이: [T-F34-02](#t-f34-02). 계약: [C14](#c14). 미확인: [U-S008](#u-s008) · [U-F34](#u-f34). 인계 [H03](#h03).

<a id="s009"></a>

### S009 — 기존 응답 편집 입력

- 원본: `sc_0817971af7f14028a36fd2a233dd5ee7` · [PNG](<../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/screens/03_sc_0817971af7f14028a36fd2a233dd5ee7.png>) · [분석](<../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s009>).
- 조건: Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond. ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태. 상세 조건은 [S009 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s009>).
- FE: [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V20 응답·답글](#v20).
- 판정: 로컬 화면/상태 연결 확인; V20의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: source 메모리 저장·자체 깊이/정렬/집계; 실제 타 사용자 조회·서버 소유권 검증·알림 없음.
- 전이: [T-F33-03](#t-f33-03). 계약: [C14](#c14) · [C15](#c15) · [C16](#c16) · [C17](#c17) · [C18](#c18) · [C20](#c20). 미확인: [U-S009](#u-s009) · [U-F33](#u-f33). 인계 [H05](#h05).

<a id="s010"></a>

### S010 — 응답 수정 내용 입력

- 원본: `sc_0950e3a03f7e4b02b9db0d98f818bdea` · [PNG](<../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/screens/04_sc_0950e3a03f7e4b02b9db0d98f818bdea.png>) · [분석](<../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s010>).
- 조건: Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond. ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태. 상세 조건은 [S010 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s010>).
- FE: [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V20 응답·답글](#v20).
- 판정: 로컬 화면/상태 연결 확인; V20의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: source 메모리 저장·자체 깊이/정렬/집계; 실제 타 사용자 조회·서버 소유권 검증·알림 없음.
- 전이: [T-F33-04](#t-f33-04). 계약: [C14](#c14) · [C15](#c15) · [C16](#c16) · [C17](#c17) · [C18](#c18) · [C20](#c20). 미확인: [U-S010](#u-s010) · [U-F33](#u-f33). 인계 [H05](#h05).

<a id="s011"></a>

### S011 — 내 리스트 상세 항목

- 원본: `sc_0b1e7b64b9f14f2cb5358161e0f67a94` · [PNG](<../medium/flows/Library/List detail/screens/03_sc_0b1e7b64b9f14f2cb5358161e0f67a94.png>) · [분석](<../medium/flows/Library/List detail/ANALYSIS.md>) · [R 7개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s011>).
- 조건: Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo. UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; source 확정 updatedAt;14/6/1초 독립 조건. 상세 조건은 [S011 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s011>).
- FE: [bookmarks/ListActions.tsx](<../FE/src/features/bookmarks/ListActions.tsx>) · [bookmarks/ListEditorSheet.tsx](<../FE/src/features/bookmarks/ListEditorSheet.tsx>) · [bookmarks/ListNoteSheet.tsx](<../FE/src/features/bookmarks/ListNoteSheet.tsx>) · [bookmarks/ListStoryCard.tsx](<../FE/src/features/bookmarks/ListStoryCard.tsx>) · [bookmarks/ReadingListScreen.tsx](<../FE/src/features/bookmarks/ReadingListScreen.tsx>) · [bookmarks/ReorderListEditor.tsx](<../FE/src/features/bookmarks/ReorderListEditor.tsx>) · [bookmarks/createUserListStore.ts](<../FE/src/features/bookmarks/createUserListStore.ts>) · [bookmarks/listTypes.ts](<../FE/src/features/bookmarks/listTypes.ts>) · [bookmarks/ListDetailMetadata.tsx](<../FE/src/features/bookmarks/ListDetailMetadata.tsx>) · [bookmarks/LibrarySheet.tsx](<../FE/src/features/bookmarks/LibrarySheet.tsx>) · [navigation/ReadingListRoute.tsx](<../FE/src/app/navigation/ReadingListRoute.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V25 내 목록·편집](#v25).
- 판정: 로컬 화면/상태 연결 확인; V25의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 자체 소유권/충돌/시간 정책; 기본 Reading list 삭제 제한. 실제 공유/다른 기기 정합성 미연결.
- 전이: [T-F46-03](#t-f46-03) · [T-F47-01](#t-f47-01) · [T-F48-01](#t-f48-01) · [T-F49-01](#t-f49-01) · [T-F51-01](#t-f51-01). 계약: [C28](#c28) · [C30](#c30) · [C31](#c31) · [C32](#c32) · [C33](#c33) · [C34](#c34) · [C35](#c35). 미확인: [U-S011](#u-s011) · [U-F46](#u-f46) · [U-F47](#u-f47) · [U-F48](#u-f48) · [U-F49](#u-f49) · [U-F51](#u-f51). 인계 [H04](#h04).

<a id="s012"></a>

### S012 — 구절 하이라이트 반영

- 원본: `sc_0da01c48dbc9483798e4c2286a11237f` · [PNG](<../medium/flows/Home/Story detail/Highlighting a phrase/screens/03_sc_0da01c48dbc9483798e4c2286a11237f.png>) · [분석](<../medium/flows/Home/Story detail/Highlighting a phrase/ANALYSIS.md>) · [R 10개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s012>).
- 조건: Article 본문 구절 선택 → Highlight/Respond/Share → 강조 표시. HighlightSource + 본문 version/UTF16 범위; native는 별도 Select a passage로 D09 차이. 상세 조건은 [S012 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s012>).
- FE: [highlights/NativePassagePicker.tsx](<../FE/src/features/highlights/NativePassagePicker.tsx>) · [highlights/PassageReader.tsx](<../FE/src/features/highlights/PassageReader.tsx>) · [highlights/NativePassageText.tsx](<../FE/src/features/highlights/NativePassageText.tsx>) · [highlights/PassageMenu.tsx](<../FE/src/features/highlights/PassageMenu.tsx>) · [highlights/HighlightedText.tsx](<../FE/src/features/highlights/HighlightedText.tsx>) · [highlights/passageMenuPosition.ts](<../FE/src/features/highlights/passageMenuPosition.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V17 본문 선택·하이라이트](#v17).
- 판정: 로컬 화면/상태 연결 확인; V17의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 다중 문단은 별도 picker; 읽기 사진/구분선 경계는 미지원. Android 기본 선택 메뉴 제거 보류; 정확 앵커 동일성 미확인.
- 전이: [T-F25-03](#t-f25-03). 계약: [C19](#c19) · [C20](#c20). 미확인: [U-S012](#u-s012) · [U-F25](#u-f25). 인계 [H03](#h03).

<a id="s013"></a>

### S013 — 이메일 인증 코드 입력 대기

- 원본: `sc_10e0a1c6f1154b3b85f8d5ed18b692d7` · [PNG](<../medium/flows/Logging in/screens/05_sc_10e0a1c6f1154b3b85f8d5ed18b692d7.png>) · [분석](<../medium/flows/Logging in/ANALYSIS.md>) · [R 7개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s013>).
- 조건: Main/Profile 또는 Library guest → AuthDialogs → 이메일 signup/login/code; Profile/Settings → Sign out. mockUsers + emailAuthSource; 개인정보·원본 인증코드 복사 없이 합성 테스트값 사용. 상세 조건은 [S013 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s013>).
- FE: [auth/AuthDialogs.tsx](<../FE/src/features/auth/AuthDialogs.tsx>) · [auth/EmailLogin.tsx](<../FE/src/features/auth/EmailLogin.tsx>) · [auth/createEmailAttempt.ts](<../FE/src/features/auth/createEmailAttempt.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V29 인증·로그아웃](#v29).
- 판정: 로컬 화면/상태 연결 확인; V29의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 실제 OAuth·메일 발송/소유권 확인·Supabase 세션·프로세스 재시작 복원 없음.
- 전이: [T-F52-05](#t-f52-05) · [T-F53-05](#t-f53-05). 계약: [C46](#c46) · [C47](#c47) · [C48](#c48) · [C67](#c67). 미확인: [U-S013](#u-s013) · [U-F52](#u-f52) · [U-F53](#u-f53). 인계 [H01](#h01).

<a id="s014"></a>

### S014 — 큐레이션 리스트 상세

- 원본: `sc_15a122b14ac84b3d80c37fb84dfae4c7` · [PNG](<../medium/flows/Explore/Topic detail/Browse curated list/screens/04_sc_15a122b14ac84b3d80c37fb84dfae4c7.png>) · [분석](<../medium/flows/Explore/Topic detail/Browse curated list/ANALYSIS.md>) · [R 11개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s014>).
- 조건: Topic → 큐레이션 카드 → PublicList(listId); S135는 More from Medium Staff까지 스크롤. publicListFixtures / PublicListSource; 8 stories·108 saves 원본 상태를 별도로 대조. 상세 조건은 [S014 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s014>).
- FE: [bookmarks/ArticleBookmarkControl.tsx](<../FE/src/features/bookmarks/ArticleBookmarkControl.tsx>) · [public-lists/PublicListScreen.tsx](<../FE/src/features/public-lists/PublicListScreen.tsx>) · [public-lists/PublicListStoryCard.tsx](<../FE/src/features/public-lists/PublicListStoryCard.tsx>) · [public-lists/SavePublicListControl.tsx](<../FE/src/features/public-lists/SavePublicListControl.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V04 공개 목록](#v04).
- 판정: 로컬 화면/상태 연결 확인; V04의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 목록/기사 저장과 반응은 서로 다른 메모리 자원; 타 계정 서버 권한·업데이트 알림 미연결.
- 전이: [T-F04-04](#t-f04-04). 계약: [C29](#c29) · [C30](#c30). 미확인: [U-S014](#u-s014) · [U-F04](#u-f04). 인계 [H04](#h04).

<a id="s015"></a>

### S015 — 멘션 대상 삽입

- 원본: `sc_15dd105a441c426ca638b4db6cb30997` · [PNG](<../medium/flows/Home/Publishing a story/Mentioning a user/screens/04_sc_15dd105a441c426ca638b4db6cb30997.png>) · [분석](<../medium/flows/Home/Publishing a story/Mentioning a user/ANALYSIS.md>) · [R 13개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s015>).
- 조건: Editor 본문 @ → samlee → 후보 선택 → Sam Lee 삽입. mention 검색 source와 문서 snapshot; S015 문자열 위치·키보드 별도. 상세 조건은 [S015 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s015>).
- FE: [editor/DocumentReader.tsx](<../FE/src/features/editor/DocumentReader.tsx>) · [editor/MentionSuggestions.tsx](<../FE/src/features/editor/MentionSuggestions.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V10 멘션](#v10).
- 판정: 로컬 화면/상태 연결 확인; V10의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 후보는 fixture; 실제 사용자 검색·알림 전송 없음. 멘션 삽입 중 Undo/Redo 숨김/복귀 보정.
- 전이: [T-F11-04](#t-f11-04). 계약: [C43](#c43). 미확인: [U-S015](#u-s015) · [U-F11](#u-f11). 인계 [H02](#h02).

<a id="s016"></a>

### S016 — 재생 속도 선택 초기

- 원본: `sc_1965b9529b534e1597968039af1415b1` · [PNG](<../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/screens/02_sc_1965b9529b534e1597968039af1415b1.png>) · [분석](<../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s016>).
- 조건: 확장 플레이어 → Speed 또는 더보기 → Select a voice → 언어 스크롤·Hans → Done. ListeningOptionsSource; Emma/Hans, 1x200WPM·2.5x490WPM은 관찰값 fixture. 상세 조건은 [S016 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s016>).
- FE: [listening/ListeningSpeedPanel.tsx](<../FE/src/features/listening/ListeningSpeedPanel.tsx>) · [listening/ListeningVoicePanel.tsx](<../FE/src/features/listening/ListeningVoicePanel.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V19 오디오 속도·음성](#v19).
- 판정: 로컬 화면/상태 연결 확인; V19의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 속도/음성 선택은 무음 mock 메타데이터; 기사 이동·추천·음소거·신고는 별도 로컬/모의 기능. 실제 발화/번역·AirPlay·재생 큐 미지원, WPM 산식은 자체 비교값.
- 전이: [T-F27-02](#t-f27-02). 계약: [C59](#c59) · [C60](#c60) · [C61](#c61). 미확인: [U-S016](#u-s016) · [U-F27](#u-f27). 인계 [H08](#h08).

<a id="s017"></a>

### S017 — 구분선 삽입과 이미지 선택

- 원본: `sc_19b2bef0854047f5b17cfeca07781ca5` · [PNG](<../medium/flows/Home/Publishing a story/Changing text format/screens/05_sc_19b2bef0854047f5b17cfeca07781ca5.png>) · [분석](<../medium/flows/Home/Publishing a story/Changing text format/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s017>).
- 조건: Home 작성 → Editor; 제목·본문 입력 → 해당 서식·이미지 블록 선택. DraftSource·EditorSession; 음악 제목/단락/인용/목록/구분선은 각 S의 문서 snapshot 별도. 상세 조건은 [S017 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s017>).
- FE: [editor/RichDocumentBody.tsx](<../FE/src/features/editor/RichDocumentBody.tsx>) · [editor/StoryEditorScreen.tsx](<../FE/src/features/editor/StoryEditorScreen.tsx>) · [editor/editorModel.ts](<../FE/src/features/editor/editorModel.ts>) · [editor/RichBody.tsx](<../FE/src/features/editor/RichBody.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V07 편집기 서식](#v07).
- 판정: 로컬 화면/상태 연결 확인; V07의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 인용선 18dp·사진 선택 모드 여백/모드 전환 재선택 차이; 원본의 사진 경계 선택 방식은 미수록.
- 전이: [T-F09-05](#t-f09-05). 계약: [C40](#c40). 미확인: [U-S017](#u-s017) · [U-F09](#u-f09). 인계 [H02](#h02).

<a id="s018"></a>

### S018 — 글머리 목록 적용

- 원본: `sc_1b0cd82ee04a4c8c9d52b9a2d088823b` · [PNG](<../medium/flows/Home/Publishing a story/Changing text format/screens/04_sc_1b0cd82ee04a4c8c9d52b9a2d088823b.png>) · [분석](<../medium/flows/Home/Publishing a story/Changing text format/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s018>).
- 조건: Home 작성 → Editor; 제목·본문 입력 → 해당 서식·이미지 블록 선택. DraftSource·EditorSession; 음악 제목/단락/인용/목록/구분선은 각 S의 문서 snapshot 별도. 상세 조건은 [S018 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s018>).
- FE: [editor/RichDocumentBody.tsx](<../FE/src/features/editor/RichDocumentBody.tsx>) · [editor/StoryEditorScreen.tsx](<../FE/src/features/editor/StoryEditorScreen.tsx>) · [editor/editorModel.ts](<../FE/src/features/editor/editorModel.ts>) · [editor/RichBody.tsx](<../FE/src/features/editor/RichBody.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V07 편집기 서식](#v07).
- 판정: 로컬 화면/상태 연결 확인; V07의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 인용선 18dp·사진 선택 모드 여백/모드 전환 재선택 차이; 원본의 사진 경계 선택 방식은 미수록.
- 전이: [T-F09-04](#t-f09-04). 계약: [C40](#c40). 미확인: [U-S018](#u-s018) · [U-F09](#u-f09). 인계 [H02](#h02).

<a id="s019"></a>

### S019 — 구절 응답 입력

- 원본: `sc_1b7c2e5f28d5419d889919fc0c9e3980` · [PNG](<../medium/flows/Home/Story detail/Responding to a phrase/screens/03_sc_1b7c2e5f28d5419d889919fc0c9e3980.png>) · [분석](<../medium/flows/Home/Story detail/Responding to a phrase/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s019>).
- 조건: Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond. ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태. 상세 조건은 [S019 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s019>).
- FE: [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V20 응답·답글](#v20).
- 판정: 로컬 화면/상태 연결 확인; V20의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: source 메모리 저장·자체 깊이/정렬/집계; 실제 타 사용자 조회·서버 소유권 검증·알림 없음.
- 전이: [T-F29-03](#t-f29-03). 계약: [C14](#c14) · [C15](#c15) · [C16](#c16) · [C17](#c17) · [C18](#c18) · [C20](#c20). 미확인: [U-S019](#u-s019) · [U-F29](#u-f29). 인계 [H05](#h05).

<a id="s020"></a>

### S020 — 내 프로필 빈 Stories

- 원본: `sc_1bd141b757934a88b4a003855e1794cc` · [PNG](<../medium/flows/Profile/screens/02_sc_1bd141b757934a88b4a003855e1794cc.png>) · [분석](<../medium/flows/Profile/ANALYSIS.md>) · [R 7개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s020>).
- 조건: Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save. ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도. 상세 조건은 [S020 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s020>).
- FE: [editor/WrittenStoryActions.tsx](<../FE/src/features/editor/WrittenStoryActions.tsx>) · [editor/WrittenStoryCardReactions.tsx](<../FE/src/features/editor/WrittenStoryCardReactions.tsx>) · [profile/ProfileEditorSheet.tsx](<../FE/src/features/profile/ProfileEditorSheet.tsx>) · [profile/ProfileScreen.tsx](<../FE/src/features/profile/ProfileScreen.tsx>) · [profile/ProfileStories.tsx](<../FE/src/features/profile/ProfileStories.tsx>) · [profile/PronounsEditor.tsx](<../FE/src/features/profile/PronounsEditor.tsx>) · [profile/useProfilePhotoSelection.ts](<../FE/src/features/profile/useProfilePhotoSelection.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V32 내 프로필·편집](#v32).
- 판정: 로컬 화면/상태 연결 확인; V32의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 사진은 로컬 URI/수명 관리, 업로드·서버 프로필 영속 저장 없음. 원본 OS 앨범과 Android picker 모습은 다름.
- 전이: [T-F55-02](#t-f55-02) · [T-F57-01](#t-f57-01) · [T-F63-01](#t-f63-01). 계약: [C51](#c51) · [C52](#c52) · [C53](#c53). 미확인: [U-S020](#u-s020) · [U-F55](#u-f55) · [U-F57](#u-f57) · [U-F63](#u-f63). 인계 [H09](#h09).

<a id="s021"></a>

### S021 — Explore 첫 화면

- 원본: `sc_1c3e4349171248378eada528f7942269` · [PNG](<../medium/flows/Explore/screens/02_sc_1c3e4349171248378eada528f7942269.png>) · [분석](<../medium/flows/Explore/ANALYSIS.md>) · [R 7개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s021>).
- 조건: Main/Explore → 검색 진입·Mindfulness 입력·Stories; Staff Picks/Who to follow 위치까지 세로·가로 이동. mediumFeedFixtures / SearchScreen·CatalogSearchResults; 칩·캐러셀 위치는 화면별 설정. 상세 조건은 [S021 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s021>).
- FE: [search/CatalogSearchResults.tsx](<../FE/src/features/search/CatalogSearchResults.tsx>) · [search/ExploreSections.tsx](<../FE/src/features/search/ExploreSections.tsx>) · [search/SearchScreen.tsx](<../FE/src/features/search/SearchScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V02 탐색·검색](#v02).
- 판정: 로컬 화면/상태 연결 확인; V02의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 검색 정렬·카테고리 계층은 자체 정책; 일부만 캡처된 Staff Pick은 안내로 처리하고 본문을 생성하지 않음.
- 전이: [T-F01-02](#t-f01-02) · [T-F02-01](#t-f02-01). 계약: [C06](#c06) · [C07](#c07). 미확인: [U-S021](#u-s021) · [U-F01](#u-f01) · [U-F02](#u-f02). 인계 [H06](#h06).

<a id="s022"></a>

### S022 — 팔로잉 유형별 목록

- 원본: `sc_1c666fb7aadc411c9add1aa2b19bd56c` · [PNG](<../medium/flows/Home/Refine recommendations/screens/05_sc_1c666fb7aadc411c9add1aa2b19bd56c.png>) · [분석](<../medium/flows/Home/Refine recommendations/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s022>).
- 조건: Home 더보기/Refine recommendations → Recommendations → Following/Reading history/Muted/Suggestions → All·Topics 등 필터. RelationshipSource·ModerationSource·TopicSource + useIdentityCatalog(DirectorySource/mockUsers/확정 공개 프로필); Writers1/Topics3는 UI 팔로우로 구성, 숫자와 목록·해제를 함께 확인. 상세 조건은 [S022 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s022>).
- FE: [recommendations/RefineRecommendationsScreen.tsx](<../FE/src/features/recommendations/RefineRecommendationsScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V11 추천 관리](#v11).
- 판정: 로컬 화면/상태 연결 확인; V11의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 추천 알고리즘·개인화 영속성 없음. 별도 원본 시점의 계정 상태를 한 세션 결과로 합치지 않음.
- 전이: [T-F12-05](#t-f12-05). 계약: [C05](#c05) · [C12](#c12) · [C25](#c25) · [C26](#c26). 미확인: [U-S022](#u-s022) · [U-F12](#u-f12). 인계 [H06](#h06).

<a id="s023"></a>

### S023 — 발행 전 Story preview

- 원본: `sc_1ceed9061b86476ebc7eb5acb9dd89c7` · [PNG](<../medium/flows/Home/Publishing a story/Adding topics/screens/01_sc_1ceed9061b86476ebc7eb5acb9dd89c7.png>) · [분석](<../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>) · [R 8개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s023>).
- 조건: Home 작성 → Editor → Next/PublishPreview → Topics → 검색·선택·Save → preview. DraftSource·PublishTopics; The Silence between Notes, Music/Culture/Art, 별도 Publication 없음. 상세 조건은 [S023 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s023>).
- FE: [editor/PublishTopics.tsx](<../FE/src/features/editor/PublishTopics.tsx>) · [editor/StoryEditorScreen.tsx](<../FE/src/features/editor/StoryEditorScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V06 발행·토픽](#v06).
- 판정: 로컬 화면/상태 연결 확인; V06의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 실제 Publication 심사/제출·공개 URL·서버 발행 없음; 유효성·멱등성은 현재 mock 계약.
- 전이: [T-F07-01](#t-f07-01) · [T-F08-08](#t-f08-08). 계약: [C44](#c44) · [C45](#c45). 미확인: [U-S023](#u-s023) · [U-F07](#u-f07) · [U-F08](#u-f08). 인계 [H02](#h02).

<a id="s024"></a>

### S024 — 이메일 로그인 입력 완료

- 원본: `sc_1d3dc01005c343c18427fe2c199e4075` · [PNG](<../medium/flows/Logging in/screens/04_sc_1d3dc01005c343c18427fe2c199e4075.png>) · [분석](<../medium/flows/Logging in/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s024>).
- 조건: Main/Profile 또는 Library guest → AuthDialogs → 이메일 signup/login/code; Profile/Settings → Sign out. mockUsers + emailAuthSource; 개인정보·원본 인증코드 복사 없이 합성 테스트값 사용. 상세 조건은 [S024 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s024>).
- FE: [auth/AuthDialogs.tsx](<../FE/src/features/auth/AuthDialogs.tsx>) · [auth/EmailLogin.tsx](<../FE/src/features/auth/EmailLogin.tsx>) · [auth/createEmailAttempt.ts](<../FE/src/features/auth/createEmailAttempt.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V29 인증·로그아웃](#v29).
- 판정: 로컬 화면/상태 연결 확인; V29의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 실제 OAuth·메일 발송/소유권 확인·Supabase 세션·프로세스 재시작 복원 없음.
- 전이: [T-F52-04](#t-f52-04). 계약: [C46](#c46) · [C47](#c47) · [C48](#c48) · [C67](#c67). 미확인: [U-S024](#u-s024) · [U-F52](#u-f52). 인계 [H01](#h01).

<a id="s025"></a>

### S025 — 팔로우된 작가 프로필

- 원본: `sc_1da36ea095e64ec0a5b6b9478b032524` · [PNG](<../medium/flows/Home/Story detail/Author detail/Following an author/screens/04_sc_1da36ea095e64ec0a5b6b9478b032524.png>) · [분석](<../medium/flows/Home/Story detail/Author detail/Following an author/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_01.md#s025>).
- 조건: Article 작성자 → Identity(writer Jordan) → Stories/Lists/About → Following·followers → Connections. useIdentityCatalog·RelationshipSource; Jordan10.2K/25, 기사말미24를 억지로 통일하지 않음; 동적 B 이름은 확정 프로필과 같은 ID로 해석. 상세 조건은 [S025 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s025>).
- FE: [community/ConnectionsScreen.tsx](<../FE/src/features/community/ConnectionsScreen.tsx>) · [community/FollowControl.tsx](<../FE/src/features/community/FollowControl.tsx>) · [community/PublicIdentityScreen.tsx](<../FE/src/features/community/PublicIdentityScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V14 작성자·관계](#v14).
- 판정: 로컬 화면/상태 연결 확인; V14의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 원본 미수록 followers 명단·집계/배지 정책은 자체 범위; 실제 이메일 구독·서버 관계 없음.
- 전이: [T-F19-04](#t-f19-04). 계약: [C21](#c21) · [C22](#c22). 미확인: [U-S025](#u-s025) · [U-F19](#u-f19). 인계 [H05](#h05).

<a id="s026"></a>

### S026 — 홈 피드 스크롤 상태

- 원본: `sc_1ef4e2f769774d2c958fcb38b96dc94f` · [PNG](<../medium/flows/Home/screens/02_sc_1ef4e2f769774d2c958fcb38b96dc94f.png>) · [분석](<../medium/flows/Home/ANALYSIS.md>) · [R 14개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s026>).
- 조건: Main/Home → For you·Featured 선택; S026은 헤더가 접힌 하단 카드, S176은 Featured 빈 상태. mediumFeedFixtures / feedPreviewScenario(normal); Featured empty는 별도 feedSource 필요. 상세 조건은 [S026 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s026>).
- FE: [community/FollowingFeed.tsx](<../FE/src/features/community/FollowingFeed.tsx>) · [feed/HomeFeedScreen.tsx](<../FE/src/features/feed/HomeFeedScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V01 홈](#v01).
- 판정: 로컬 화면/상태 연결 확인; V01의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 추천·개인화·페이지 데이터는 fixture; 원본 시점별 기사·집계·스크롤과 현재 상태의 일치는 별도 미확인.
- 전이: [T-F05-02](#t-f05-02) · [T-F16-01](#t-f16-01). 계약: [C04](#c04) · [C05](#c05). 미확인: [U-S026](#u-s026) · [U-F05](#u-f05) · [U-F16](#u-f16). 인계 [H06](#h06).

<a id="s027"></a>

### S027 — 프로필 폼으로 대명사 반환

- 원본: `sc_20bfc41de9f845119aea54bb5971a01e` · [PNG](<../medium/flows/Profile/Editing profile information/Adding pronouns/screens/06_sc_20bfc41de9f845119aea54bb5971a01e.png>) · [분석](<../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s027>).
- 조건: Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save. ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도. 상세 조건은 [S027 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s027>).
- FE: [editor/WrittenStoryActions.tsx](<../FE/src/features/editor/WrittenStoryActions.tsx>) · [editor/WrittenStoryCardReactions.tsx](<../FE/src/features/editor/WrittenStoryCardReactions.tsx>) · [profile/ProfileEditorSheet.tsx](<../FE/src/features/profile/ProfileEditorSheet.tsx>) · [profile/ProfileScreen.tsx](<../FE/src/features/profile/ProfileScreen.tsx>) · [profile/ProfileStories.tsx](<../FE/src/features/profile/ProfileStories.tsx>) · [profile/PronounsEditor.tsx](<../FE/src/features/profile/PronounsEditor.tsx>) · [profile/useProfilePhotoSelection.ts](<../FE/src/features/profile/useProfilePhotoSelection.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V32 내 프로필·편집](#v32).
- 판정: 로컬 화면/상태 연결 확인; V32의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 사진은 로컬 URI/수명 관리, 업로드·서버 프로필 영속 저장 없음. 원본 OS 앨범과 Android picker 모습은 다름.
- 전이: [T-F56-06](#t-f56-06). 계약: [C51](#c51) · [C52](#c52) · [C53](#c53). 미확인: [U-S027](#u-s027) · [U-F56](#u-f56). 인계 [H09](#h09).

<a id="s028"></a>

### S028 — 이미지 저장 행동 노출

- 원본: `sc_221a38b7f8ac42959ddd75840253b5c8` · [PNG](<../medium/flows/Home/Story detail/Sharing a story/screens/04_sc_221a38b7f8ac42959ddd75840253b5c8.png>) · [분석](<../medium/flows/Home/Story detail/Sharing a story/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s028>).
- 조건: Article/인용/Identity/PublicList 공유 → 카드 → Copy link/Save image/Share via. ShareAdapter; 공개 공유 target + 카드 style index; OS 저장·공유는 Q07. 상세 조건은 [S028 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s028>).
- FE: [sharing/ShareCard.tsx](<../FE/src/features/sharing/ShareCard.tsx>) · [sharing/ShareSheet.tsx](<../FE/src/features/sharing/ShareSheet.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V23 공유](#v23).
- 판정: 로컬 화면/상태 연결 확인; V23의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: OS 복귀 returned는 전달 완료 증거가 아님. 공유 URL은 kostolany.invalid 모의 주소이며 Friend 링크도 실제 발급하지 않음. 파일 이미지 저장과 목록 메모리 다운로드는 다름.
- 전이: [T-F39-04](#t-f39-04) · [T-F40-01](#t-f40-01). 계약: [C23](#c23) · [C61](#c61) · [C62](#c62) · [C63](#c63) · [C64](#c64). 미확인: [U-S028](#u-s028) · [U-F39](#u-f39) · [U-F40](#u-f40). 인계 [H09](#h09).

<a id="s029"></a>

### S029 — Music 토픽 검색

- 원본: `sc_234fd58378fc447ba6bc2e6c0033f9c2` · [PNG](<../medium/flows/Home/Publishing a story/Adding topics/screens/03_sc_234fd58378fc447ba6bc2e6c0033f9c2.png>) · [분석](<../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s029>).
- 조건: Home 작성 → Editor → Next/PublishPreview → Topics → 검색·선택·Save → preview. DraftSource·PublishTopics; The Silence between Notes, Music/Culture/Art, 별도 Publication 없음. 상세 조건은 [S029 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s029>).
- FE: [editor/PublishTopics.tsx](<../FE/src/features/editor/PublishTopics.tsx>) · [editor/StoryEditorScreen.tsx](<../FE/src/features/editor/StoryEditorScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V06 발행·토픽](#v06).
- 판정: 로컬 화면/상태 연결 확인; V06의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 실제 Publication 심사/제출·공개 URL·서버 발행 없음; 유효성·멱등성은 현재 mock 계약.
- 전이: [T-F07-03](#t-f07-03). 계약: [C44](#c44) · [C45](#c45). 미확인: [U-S029](#u-s029) · [U-F07](#u-f07). 인계 [H02](#h02).

<a id="s030"></a>

### S030 — 작성기 더보기 메뉴

- 원본: `sc_2436081faa2445cb86e17ea0b88b4fc9` · [PNG](<../medium/flows/Home/Publishing a story/Drafts/screens/02_sc_2436081faa2445cb86e17ea0b88b4fc9.png>) · [분석](<../medium/flows/Home/Publishing a story/Drafts/ANALYSIS.md>) · [R 7개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s030>).
- 조건: Editor 더보기 또는 Profile Drafts → Drafts; 저장한 같은 draftId 재열기. DraftSource; 제목 The Silence between Notes, editedAt=비교 시계-60초. 상세 조건은 [S030 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s030>).
- FE: [editor/DraftsScreen.tsx](<../FE/src/features/editor/DraftsScreen.tsx>) · [editor/createDraftSession.ts](<../FE/src/features/editor/createDraftSession.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V09 초안·작성 메뉴](#v09).
- 판정: 로컬 화면/상태 연결 확인; V09의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 메모리 source 수명; 프로세스 재실행 복원·동기화 없음. 사용자가 기존 초안을 삭제하는 명령은 미지원(Q04).
- 전이: [T-F10-02](#t-f10-02). 계약: [C42](#c42). 미확인: [U-S030](#u-s030) · [U-F10](#u-f10). 인계 [H02](#h02).

<a id="s031"></a>

### S031 — 본문 문자 스타일 변경

- 원본: `sc_24b381a199374acb8d2a6a516052c9a7` · [PNG](<../medium/flows/Home/Publishing a story/Changing text format/screens/02_sc_24b381a199374acb8d2a6a516052c9a7.png>) · [분석](<../medium/flows/Home/Publishing a story/Changing text format/ANALYSIS.md>) · [R 7개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s031>).
- 조건: Home 작성 → Editor; 제목·본문 입력 → 해당 서식·이미지 블록 선택. DraftSource·EditorSession; 음악 제목/단락/인용/목록/구분선은 각 S의 문서 snapshot 별도. 상세 조건은 [S031 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s031>).
- FE: [editor/RichDocumentBody.tsx](<../FE/src/features/editor/RichDocumentBody.tsx>) · [editor/StoryEditorScreen.tsx](<../FE/src/features/editor/StoryEditorScreen.tsx>) · [editor/editorModel.ts](<../FE/src/features/editor/editorModel.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V07 편집기 서식](#v07).
- 판정: 로컬 화면/상태 연결 확인; V07의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 인용선 18dp·사진 선택 모드 여백/모드 전환 재선택 차이; 원본의 사진 경계 선택 방식은 미수록.
- 전이: [T-F09-02](#t-f09-02). 계약: [C40](#c40). 미확인: [U-S031](#u-s031) · [U-F09](#u-f09). 인계 [H02](#h02).

<a id="s032"></a>

### S032 — 최신순 응답 목록

- 원본: `sc_280ed6ce41b24f6f876aac698f4a8119` · [PNG](<../medium/flows/Home/Story detail/Responses/Sorting responses/screens/03_sc_280ed6ce41b24f6f876aac698f4a8119.png>) · [분석](<../medium/flows/Home/Story detail/Responses/Sorting responses/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s032>).
- 조건: Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond. ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태. 상세 조건은 [S032 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s032>).
- FE: [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V20 응답·답글](#v20).
- 판정: 로컬 화면/상태 연결 확인; V20의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: source 메모리 저장·자체 깊이/정렬/집계; 실제 타 사용자 조회·서버 소유권 검증·알림 없음.
- 전이: [T-F36-03](#t-f36-03). 계약: [C14](#c14) · [C15](#c15) · [C16](#c16) · [C17](#c17) · [C18](#c18) · [C20](#c20). 미확인: [U-S032](#u-s032) · [U-F36](#u-f36). 인계 [H05](#h05).

<a id="s033"></a>

### S033 — 전체 추천의 작가 섹션

- 원본: `sc_28a0bd2548fc4800b2b024bdc06bb115` · [PNG](<../medium/flows/Home/Refine recommendations/Filtering suggestions/screens/03_sc_28a0bd2548fc4800b2b024bdc06bb115.png>) · [분석](<../medium/flows/Home/Refine recommendations/Filtering suggestions/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s033>).
- 조건: Home 더보기/Refine recommendations → Recommendations → Following/Reading history/Muted/Suggestions → All·Topics 등 필터. RelationshipSource·ModerationSource·TopicSource + useIdentityCatalog(DirectorySource/mockUsers/확정 공개 프로필); Writers1/Topics3는 UI 팔로우로 구성, 숫자와 목록·해제를 함께 확인. 상세 조건은 [S033 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s033>).
- FE: [recommendations/RefineRecommendationsScreen.tsx](<../FE/src/features/recommendations/RefineRecommendationsScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V11 추천 관리](#v11).
- 판정: 로컬 화면/상태 연결 확인; V11의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 추천 알고리즘·개인화 영속성 없음. 별도 원본 시점의 계정 상태를 한 세션 결과로 합치지 않음.
- 전이: [T-F13-03](#t-f13-03). 계약: [C05](#c05) · [C12](#c12) · [C25](#c25) · [C26](#c26). 미확인: [U-S033](#u-s033) · [U-F13](#u-f13). 인계 [H06](#h06).

<a id="s034"></a>

### S034 — 로그아웃 확인

- 원본: `sc_2d1afd7a02a347868564f9757753d077` · [PNG](<../medium/flows/Profile/Settings/Logging out/screens/02_sc_2d1afd7a02a347868564f9757753d077.png>) · [분석](<../medium/flows/Profile/Settings/Logging out/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s034>).
- 조건: Main/Profile 또는 Library guest → AuthDialogs → 이메일 signup/login/code; Profile/Settings → Sign out. mockUsers + emailAuthSource; 개인정보·원본 인증코드 복사 없이 합성 테스트값 사용. 상세 조건은 [S034 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s034>).
- FE: [auth/AuthDialogs.tsx](<../FE/src/features/auth/AuthDialogs.tsx>) · [auth/EmailLogin.tsx](<../FE/src/features/auth/EmailLogin.tsx>) · [auth/createEmailAttempt.ts](<../FE/src/features/auth/createEmailAttempt.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V29 인증·로그아웃](#v29).
- 판정: 로컬 화면/상태 연결 확인; V29의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 실제 OAuth·메일 발송/소유권 확인·Supabase 세션·프로세스 재시작 복원 없음.
- 전이: [T-F61-02](#t-f61-02). 계약: [C46](#c46) · [C47](#c47) · [C48](#c48) · [C67](#c67). 미확인: [U-S034](#u-s034) · [U-F61](#u-f61). 인계 [H01](#h01).

<a id="s035"></a>

### S035 — 관심사 기반 작가·발행물 추천

- 원본: `sc_301ef788e5514bb5b8e9c1fc9afcfa61` · [PNG](<../medium/flows/Onboarding/screens/10_sc_301ef788e5514bb5b8e9c1fc9afcfa61.png>) · [분석](<../medium/flows/Onboarding/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s035>).
- 조건: guest signup → Onboarding → interests → recommendations → permission → welcome; S043은 실제 cold start. OnboardingSource·NotificationPermissionSource; 관심5개/추천Follow/안내 상태; S043 대응 splash 없음. 상세 조건은 [S035 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s035>).
- FE: [onboarding/OnboardingScreen.tsx](<../FE/src/features/onboarding/OnboardingScreen.tsx>) · [onboarding/createOnboardingSession.ts](<../FE/src/features/onboarding/createOnboardingSession.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V30 온보딩·시작](#v30).
- 판정: 로컬 화면/상태 연결 확인; V30의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 시작은 대체 워드마크, 온보딩 저장은 mock; 캡처를 신규 가입 전용으로 단정하지 않음.
- 전이: [T-F53-10](#t-f53-10). 계약: [C49](#c49) · [C50](#c50). 미확인: [U-S035](#u-s035) · [U-F53](#u-f53). 인계 [H01](#h01).

<a id="s036"></a>

### S036 — 기사 저장 대상 선택

- 원본: `sc_31edfd53d2874259a6ed5ecbc756d10b` · [PNG](<../medium/flows/Home/Story detail/Saving a story/screens/02_sc_31edfd53d2874259a6ed5ecbc756d10b.png>) · [분석](<../medium/flows/Home/Story detail/Saving a story/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s036>).
- 조건: Article 하단 저장 → Save to → Reading list 선택 → Done/닫기. BookmarkSource·UserListStore; reading-list 체크와 canonical articleId. 상세 조건은 [S036 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s036>).
- FE: [bookmarks/ArticleBookmarkControl.tsx](<../FE/src/features/bookmarks/ArticleBookmarkControl.tsx>) · [bookmarks/SaveToListSheet.tsx](<../FE/src/features/bookmarks/SaveToListSheet.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V22 기사 저장](#v22).
- 판정: 로컬 화면/상태 연결 확인; V22의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 사용자 결정대로 목록 사이 구분선만 제거, 헤더/Create new list 구분선 유지; 실제 서버 저장 없음.
- 전이: [T-F37-02](#t-f37-02). 계약: [C28](#c28). 미확인: [U-S036](#u-s036) · [U-F37](#u-f37). 인계 [H04](#h04).

<a id="s037"></a>

### S037 — 기사 상세 상단

- 원본: `sc_332d5b0923e546fcbf6a8fc613cda6a4` · [PNG](<../medium/flows/Home/Story detail/screens/02_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>) · [분석](<../medium/flows/Home/Story detail/ANALYSIS.md>) · [R 11개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s037>).
- 조건: Home/Explore 기사 → Article(articleId); 본문·말미·응답 미리보기까지 스크롤; 박수 조작. medium-brain 기본 기사; F16의834와 박수 흐름832는 독립 response fixture. 상세 조건은 [S037 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s037>).
- FE: [article/ArticleDetailScreen.tsx](<../FE/src/features/article/ArticleDetailScreen.tsx>) · [article/ReferenceArticleView.tsx](<../FE/src/features/article/ReferenceArticleView.tsx>) · [reactions/ClapControl.tsx](<../FE/src/features/reactions/ClapControl.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V13 기사 읽기·반응](#v13).
- 판정: 로컬 화면/상태 연결 확인; V13의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 일부 기사는 전체 본문 미수록 안내만 제공. 누적 반응 모델은 유지하고 하트 모양은 사용자 확정; 서버 집계 없음.
- 전이: [T-F16-02](#t-f16-02) · [T-F17-01](#t-f17-01) · [T-F24-01](#t-f24-01) · [T-F26-01](#t-f26-01) · [T-F30-01](#t-f30-01) · [T-F37-01](#t-f37-01) · [T-F38-01](#t-f38-01) · [T-F39-01](#t-f39-01). 계약: [C09](#c09) · [C10](#c10) · [C11](#c11) · [C12](#c12). 미확인: [U-S037](#u-s037) · [U-F16](#u-f16) · [U-F17](#u-f17) · [U-F24](#u-f24) · [U-F26](#u-f26) · [U-F30](#u-f30) · [U-F37](#u-f37) · [U-F38](#u-f38) · [U-F39](#u-f39). 인계 [H03](#h03).

<a id="s038"></a>

### S038 — 작가 공개 리스트

- 원본: `sc_334d50df678445baaa7ba445c96861ba` · [PNG](<../medium/flows/Home/Story detail/Author detail/screens/03_sc_334d50df678445baaa7ba445c96861ba.png>) · [분석](<../medium/flows/Home/Story detail/Author detail/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s038>).
- 조건: Article 작성자 → Identity(writer Jordan) → Stories/Lists/About → Following·followers → Connections. useIdentityCatalog·RelationshipSource; Jordan10.2K/25, 기사말미24를 억지로 통일하지 않음; 동적 B 이름은 확정 프로필과 같은 ID로 해석. 상세 조건은 [S038 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s038>).
- FE: [community/ConnectionsScreen.tsx](<../FE/src/features/community/ConnectionsScreen.tsx>) · [community/FollowControl.tsx](<../FE/src/features/community/FollowControl.tsx>) · [community/PublicIdentityScreen.tsx](<../FE/src/features/community/PublicIdentityScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V14 작성자·관계](#v14).
- 판정: 로컬 화면/상태 연결 확인; V14의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 원본 미수록 followers 명단·집계/배지 정책은 자체 범위; 실제 이메일 구독·서버 관계 없음.
- 전이: [T-F17-03](#t-f17-03). 계약: [C21](#c21) · [C22](#c22). 미확인: [U-S038](#u-s038) · [U-F17](#u-f17). 인계 [H05](#h05).

<a id="s039"></a>

### S039 — 새 리스트 생성 표시

- 원본: `sc_35dcbd9d4308404b9f11ecd03f893eb8` · [PNG](<../medium/flows/Library/Creating a list/screens/04_sc_35dcbd9d4308404b9f11ecd03f893eb8.png>) · [분석](<../medium/flows/Library/Creating a list/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s039>).
- 조건: Main/Library → Your lists / Saved lists / Highlighted; 새 목록·삭제 후 복귀. UserListStore·HighlightSource; empty/3/4 stories·About mindfulness를 각 상태별 구성. 상세 조건은 [S039 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s039>).
- FE: [bookmarks/LibraryScreen.tsx](<../FE/src/features/bookmarks/LibraryScreen.tsx>) · [highlights/HighlightList.tsx](<../FE/src/features/highlights/HighlightList.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V24 Library·목록 카드](#v24).
- 판정: 로컬 화면/상태 연결 확인; V24의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 목록/강조/다운로드는 메모리 상태; 원본 계정·집계·콘텐츠 snapshot과 현재 사용자 데이터는 다름.
- 전이: [T-F42-04](#t-f42-04) · [T-F46-01](#t-f46-01). 계약: [C20](#c20) · [C29](#c29) · [C31](#c31) · [C37](#c37). 미확인: [U-S039](#u-s039) · [U-F42](#u-f42) · [U-F46](#u-f46). 인계 [H04](#h04).

<a id="s040"></a>

### S040 — 추천 알림 두 항목 끄기

- 원본: `sc_368c53cd77e2421e8279124ce03301f4` · [PNG](<../medium/flows/Profile/Settings/Changing notification settings/screens/03_sc_368c53cd77e2421e8279124ce03301f4.png>) · [분석](<../medium/flows/Profile/Settings/Changing notification settings/ANALYSIS.md>) · [R 15개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s040>).
- 조건: Digest 설정 또는 Profile/Settings → Email/Push → NotificationSettings(section). NotificationSource·설정 source; Daily/PushOn/EmailOn와 개별 토글 상태. 상세 조건은 [S040 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s040>).
- FE: [notifications/NotificationSettingsScreen.tsx](<../FE/src/features/notifications/NotificationSettingsScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V28 Digest·Push 설정](#v28).
- 판정: 로컬 화면/상태 연결 확인; V28의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: OS 권한과 원격 토큰 등록/푸시 전송은 별개; 실제 메일/Push 미연결, 원본 잘린 하단 항목 미확인.
- 전이: [T-F59-03](#t-f59-03). 계약: [C39](#c39) · [C50](#c50) · [C56](#c56) · [C57](#c57) · [C67](#c67). 미확인: [U-S040](#u-s040) · [U-F59](#u-f59). 인계 [H07](#h07).

<a id="s041"></a>

### S041 — 새 읽기 경험 소개

- 원본: `sc_3795c955a89d404c85112e637857e74a` · [PNG](<../medium/flows/Onboarding/screens/07_sc_3795c955a89d404c85112e637857e74a.png>) · [분석](<../medium/flows/Onboarding/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s041>).
- 조건: guest signup → Onboarding → interests → recommendations → permission → welcome; S043은 실제 cold start. OnboardingSource·NotificationPermissionSource; 관심5개/추천Follow/안내 상태; S043 대응 splash 없음. 상세 조건은 [S041 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s041>).
- FE: [onboarding/OnboardingScreen.tsx](<../FE/src/features/onboarding/OnboardingScreen.tsx>) · [onboarding/createOnboardingSession.ts](<../FE/src/features/onboarding/createOnboardingSession.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V30 온보딩·시작](#v30).
- 판정: 로컬 화면/상태 연결 확인; V30의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 시작은 대체 워드마크, 온보딩 저장은 mock; 캡처를 신규 가입 전용으로 단정하지 않음.
- 전이: [T-F53-07](#t-f53-07). 계약: [C49](#c49) · [C50](#c50). 미확인: [U-S041](#u-s041) · [U-F53](#u-f53). 인계 [H01](#h01).

<a id="s042"></a>

### S042 — 빈 기사 편집기

- 원본: `sc_397cb0f05ba54659adac7376f29512dd` · [PNG](<../medium/flows/Home/Publishing a story/screens/02_sc_397cb0f05ba54659adac7376f29512dd.png>) · [분석](<../medium/flows/Home/Publishing a story/ANALYSIS.md>) · [R 14개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s042>).
- 조건: Home 작성 → Editor; 제목·본문 입력 → 해당 서식·이미지 블록 선택. DraftSource·EditorSession; 음악 제목/단락/인용/목록/구분선은 각 S의 문서 snapshot 별도. 상세 조건은 [S042 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s042>).
- FE: [editor/RichDocumentBody.tsx](<../FE/src/features/editor/RichDocumentBody.tsx>) · [editor/StoryEditorScreen.tsx](<../FE/src/features/editor/StoryEditorScreen.tsx>) · [editor/editorModel.ts](<../FE/src/features/editor/editorModel.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V07 편집기 서식](#v07).
- 판정: 로컬 화면/상태 연결 확인; V07의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 인용선 18dp·사진 선택 모드 여백/모드 전환 재선택 차이; 원본의 사진 경계 선택 방식은 미수록.
- 전이: [T-F08-02](#t-f08-02). 계약: [C40](#c40). 미확인: [U-S042](#u-s042) · [U-F08](#u-f08). 인계 [H02](#h02).

<a id="s043"></a>

### S043 — 브랜드 시작 화면

- 원본: `sc_39bd15e8585d404daa48b34a448b0e32` · [PNG](<../medium/flows/Onboarding/screens/01_sc_39bd15e8585d404daa48b34a448b0e32.png>) · [분석](<../medium/flows/Onboarding/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s043>).
- 조건: guest signup → Onboarding → interests → recommendations → permission → welcome; S043은 실제 cold start. OnboardingSource·NotificationPermissionSource; 관심5개/추천Follow/안내 상태; S043 대응 splash 없음. 상세 조건은 [S043 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s043>).
- FE: [onboarding/OnboardingScreen.tsx](<../FE/src/features/onboarding/OnboardingScreen.tsx>) · [onboarding/createOnboardingSession.ts](<../FE/src/features/onboarding/createOnboardingSession.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V30 온보딩·시작](#v30).
- 판정: 로컬 화면/상태 연결 확인; V30의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 시작 화면은 대체 자산; 원본 워드마크 동일성 없음. 지원/한계: 시작은 대체 워드마크, 온보딩 저장은 mock; 캡처를 신규 가입 전용으로 단정하지 않음.
- 전이: [T-F53-01](#t-f53-01). 계약: [C49](#c49) · [C50](#c50). 미확인: [U-S043](#u-s043) · [U-F53](#u-f53). 인계 [H01](#h01).

<a id="s044"></a>

### S044 — Unlisted 공개 범위 안내

- 원본: `sc_39fb71a1ee0d43f09bab33c7ef775259` · [PNG](<../medium/flows/Home/Publishing a story/screens/10_sc_39fb71a1ee0d43f09bab33c7ef775259.png>) · [분석](<../medium/flows/Home/Publishing a story/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s044>).
- 조건: Home 작성 → Editor → Next/PublishPreview → Topics → 검색·선택·Save → preview. DraftSource·PublishTopics; The Silence between Notes, Music/Culture/Art, 별도 Publication 없음. 상세 조건은 [S044 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s044>).
- FE: [editor/PublishTopics.tsx](<../FE/src/features/editor/PublishTopics.tsx>) · [editor/StoryEditorScreen.tsx](<../FE/src/features/editor/StoryEditorScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V06 발행·토픽](#v06).
- 판정: 로컬 화면/상태 연결 확인; V06의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 실제 Publication 심사/제출·공개 URL·서버 발행 없음; 유효성·멱등성은 현재 mock 계약.
- 전이: [T-F08-10](#t-f08-10). 계약: [C44](#c44) · [C45](#c45). 미확인: [U-S044](#u-s044) · [U-F08](#u-f08). 인계 [H02](#h02).

<a id="s045"></a>

### S045 — 읽기 기록 빈 상태

- 원본: `sc_3ab5043fa7b649908c6dde30faf290ab` · [PNG](<../medium/flows/Home/Refine recommendations/Reading history/Clearing history/screens/02_sc_3ab5043fa7b649908c6dde30faf290ab.png>) · [분석](<../medium/flows/Home/Refine recommendations/Reading history/Clearing history/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s045>).
- 조건: 개발 웹 /?parityHistory=reference-v1 → mock A → Profile/Settings → Refine recommendations → Reading history → 카드·삭제·Clear history; 일반 방문은 Library 이력 경로도 확인. ReadingHistorySource + reactive 카탈로그; Parity 4의 명시적 reference-v1 seed는 알려진 세 기사와 합성 방문 시각만 제공; 원본 중간 카드·집계 차이는 V12 잔여; D03/D05 연결 검증은 FE_MEDIUM_PARITY_04_RESULT 참조. 상세 조건은 [S045 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s045>).
- FE: [reading-history/ReadingHistoryList.tsx](<../FE/src/features/reading-history/ReadingHistoryList.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V12 읽기 이력](#v12).
- 판정: 로컬 화면/상태 연결 확인; V12의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 이력 삭제 후 Undo는 미지원이며 원본 실행 근거도 없음(Q05); 보존 기간/기기 동기화 미정.
- 전이: [T-F15-02](#t-f15-02). 계약: [C11](#c11) · [C25](#c25) · [C27](#c27) · [C37](#c37). 미확인: [U-S045](#u-s045) · [U-F15](#u-f15). 인계 [H03](#h03).

<a id="s046"></a>

### S046 — 음성 선택 목록

- 원본: `sc_3b3db04094fe4a189b31e66c28971bcd` · [PNG](<../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/03_sc_3b3db04094fe4a189b31e66c28971bcd.png>) · [분석](<../medium/flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s046>).
- 조건: 확장 플레이어 → Speed 또는 더보기 → Select a voice → 언어 스크롤·Hans → Done. ListeningOptionsSource; Emma/Hans, 1x200WPM·2.5x490WPM은 관찰값 fixture. 상세 조건은 [S046 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s046>).
- FE: [listening/ListeningSpeedPanel.tsx](<../FE/src/features/listening/ListeningSpeedPanel.tsx>) · [listening/ListeningVoicePanel.tsx](<../FE/src/features/listening/ListeningVoicePanel.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V19 오디오 속도·음성](#v19).
- 판정: 로컬 화면/상태 연결 확인; V19의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 속도/음성 선택은 무음 mock 메타데이터; 기사 이동·추천·음소거·신고는 별도 로컬/모의 기능. 실제 발화/번역·AirPlay·재생 큐 미지원, WPM 산식은 자체 비교값.
- 전이: [T-F28-03](#t-f28-03). 계약: [C59](#c59) · [C60](#c60) · [C61](#c61). 미확인: [U-S046](#u-s046) · [U-F28](#u-f28). 인계 [H08](#h08).

<a id="s047"></a>

### S047 — 프로필 소개·사진·대명사 표시

- 원본: `sc_3cd0855e78a84d4ea413f0e5b3dffb73` · [PNG](<../medium/flows/Profile/screens/06_sc_3cd0855e78a84d4ea413f0e5b3dffb73.png>) · [분석](<../medium/flows/Profile/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s047>).
- 조건: Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save. ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도. 상세 조건은 [S047 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s047>).
- FE: [editor/WrittenStoryActions.tsx](<../FE/src/features/editor/WrittenStoryActions.tsx>) · [editor/WrittenStoryCardReactions.tsx](<../FE/src/features/editor/WrittenStoryCardReactions.tsx>) · [profile/ProfileEditorSheet.tsx](<../FE/src/features/profile/ProfileEditorSheet.tsx>) · [profile/ProfileScreen.tsx](<../FE/src/features/profile/ProfileScreen.tsx>) · [profile/ProfileStories.tsx](<../FE/src/features/profile/ProfileStories.tsx>) · [profile/PronounsEditor.tsx](<../FE/src/features/profile/PronounsEditor.tsx>) · [profile/useProfilePhotoSelection.ts](<../FE/src/features/profile/useProfilePhotoSelection.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V32 내 프로필·편집](#v32).
- 판정: 로컬 화면/상태 연결 확인; V32의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 사진은 로컬 URI/수명 관리, 업로드·서버 프로필 영속 저장 없음. 원본 OS 앨범과 Android picker 모습은 다름.
- 전이: [T-F55-06](#t-f55-06) · [T-F57-08](#t-f57-08). 계약: [C51](#c51) · [C52](#c52) · [C53](#c53). 미확인: [U-S047](#u-s047) · [U-F55](#u-f55) · [U-F57](#u-f57). 인계 [H09](#h09).

<a id="s048"></a>

### S048 — 작가 프로필 Stories

- 원본: `sc_3de359a1c13340968c4b733188faa6d1` · [PNG](<../medium/flows/Home/Story detail/Author detail/screens/02_sc_3de359a1c13340968c4b733188faa6d1.png>) · [분석](<../medium/flows/Home/Story detail/Author detail/ANALYSIS.md>) · [R 8개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s048>).
- 조건: Article 작성자 → Identity(writer Jordan) → Stories/Lists/About → Following·followers → Connections. useIdentityCatalog·RelationshipSource; Jordan10.2K/25, 기사말미24를 억지로 통일하지 않음; 동적 B 이름은 확정 프로필과 같은 ID로 해석. 상세 조건은 [S048 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s048>).
- FE: [community/ConnectionsScreen.tsx](<../FE/src/features/community/ConnectionsScreen.tsx>) · [community/FollowControl.tsx](<../FE/src/features/community/FollowControl.tsx>) · [community/PublicIdentityScreen.tsx](<../FE/src/features/community/PublicIdentityScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V14 작성자·관계](#v14).
- 판정: 로컬 화면/상태 연결 확인; V14의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 원본 미수록 followers 명단·집계/배지 정책은 자체 범위; 실제 이메일 구독·서버 관계 없음.
- 전이: [T-F17-02](#t-f17-02) · [T-F18-01](#t-f18-01) · [T-F19-01](#t-f19-01) · [T-F21-01](#t-f21-01) · [T-F22-01](#t-f22-01) · [T-F23-01](#t-f23-01). 계약: [C21](#c21) · [C22](#c22). 미확인: [U-S048](#u-s048) · [U-F17](#u-f17) · [U-F18](#u-f18) · [U-F19](#u-f19) · [U-F21](#u-f21) · [U-F22](#u-f22) · [U-F23](#u-f23). 인계 [H05](#h05).

<a id="s049"></a>

### S049 — 작가 팔로우 성공과 알림 메뉴

- 원본: `sc_3ecf6d2988a6418fa4d2006fa4497b23` · [PNG](<../medium/flows/Home/Story detail/Author detail/Following an author/screens/02_sc_3ecf6d2988a6418fa4d2006fa4497b23.png>) · [분석](<../medium/flows/Home/Story detail/Author detail/Following an author/ANALYSIS.md>) · [R 7개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s049>).
- 조건: Article 작성자 → Identity(writer Jordan) → Stories/Lists/About → Following·followers → Connections. useIdentityCatalog·RelationshipSource; Jordan10.2K/25, 기사말미24를 억지로 통일하지 않음; 동적 B 이름은 확정 프로필과 같은 ID로 해석. 상세 조건은 [S049 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s049>).
- FE: [community/ConnectionsScreen.tsx](<../FE/src/features/community/ConnectionsScreen.tsx>) · [community/FollowControl.tsx](<../FE/src/features/community/FollowControl.tsx>) · [community/PublicIdentityScreen.tsx](<../FE/src/features/community/PublicIdentityScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V14 작성자·관계](#v14).
- 판정: 로컬 화면/상태 연결 확인; V14의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 원본 미수록 followers 명단·집계/배지 정책은 자체 범위; 실제 이메일 구독·서버 관계 없음.
- 전이: [T-F19-02](#t-f19-02). 계약: [C21](#c21) · [C22](#c22). 미확인: [U-S049](#u-s049) · [U-F19](#u-f19). 인계 [H05](#h05).

<a id="s050"></a>

### S050 — 미니 플레이어 재생 상태

- 원본: `sc_40448a752ea64391a724af01b1e050f1` · [PNG](<../medium/flows/Home/Story detail/Listening to a story/screens/03_sc_40448a752ea64391a724af01b1e050f1.png>) · [분석](<../medium/flows/Home/Story detail/Listening to a story/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_02.md#s050>).
- 조건: Article Listen → 미니 플레이어 → 확장 → 재생·정지·seek·닫기. ListeningSource·mock 시계; 00:05/00:10/00:20/00:40 각 snapshot과 duration 독립. 상세 조건은 [S050 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s050>).
- FE: [listening/ListeningPlayer.tsx](<../FE/src/features/listening/ListeningPlayer.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V18 오디오 플레이어](#v18).
- 판정: 로컬 화면/상태 연결 확인; V18의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: silent-mock; 실제 TTS/음원·백그라운드/오프라인 재생 없음, 이전/다음 큐 버튼 비활성.
- 전이: [T-F26-03](#t-f26-03). 계약: [C58](#c58) · [C59](#c59) · [C61](#c61) · [C66](#c66). 미확인: [U-S050](#u-s050) · [U-F26](#u-f26). 인계 [H08](#h08).

<a id="s051"></a>

### S051 — 링크 복사 피드백

- 원본: `sc_4225892a7f304ec9b0442fad0aae38bb` · [PNG](<../medium/flows/Home/Story detail/Sharing a story/screens/03_sc_4225892a7f304ec9b0442fad0aae38bb.png>) · [분석](<../medium/flows/Home/Story detail/Sharing a story/ANALYSIS.md>) · [R 9개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s051>).
- 조건: Article/인용/Identity/PublicList 공유 → 카드 → Copy link/Save image/Share via. ShareAdapter; 공개 공유 target + 카드 style index; OS 저장·공유는 Q07. 상세 조건은 [S051 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s051>).
- FE: [sharing/ShareCard.tsx](<../FE/src/features/sharing/ShareCard.tsx>) · [sharing/ShareSheet.tsx](<../FE/src/features/sharing/ShareSheet.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V23 공유](#v23).
- 판정: 로컬 화면/상태 연결 확인; V23의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: OS 복귀 returned는 전달 완료 증거가 아님. 공유 URL은 kostolany.invalid 모의 주소이며 Friend 링크도 실제 발급하지 않음. 파일 이미지 저장과 목록 메모리 다운로드는 다름.
- 전이: [T-F39-03](#t-f39-03). 계약: [C23](#c23) · [C61](#c61) · [C62](#c62) · [C63](#c63) · [C64](#c64). 미확인: [U-S051](#u-s051) · [U-F39](#u-f39). 인계 [H09](#h09).

<a id="s052"></a>

### S052 — 읽기 기록 스크롤

- 원본: `sc_4239d69cbdce4194a5a34c7472131dfd` · [PNG](<../medium/flows/Home/Refine recommendations/Reading history/screens/02_sc_4239d69cbdce4194a5a34c7472131dfd.png>) · [분석](<../medium/flows/Home/Refine recommendations/Reading history/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s052>).
- 조건: 개발 웹 /?parityHistory=reference-v1 → mock A → Profile/Settings → Refine recommendations → Reading history → 카드·삭제·Clear history; 일반 방문은 Library 이력 경로도 확인. ReadingHistorySource + reactive 카탈로그; Parity 4의 명시적 reference-v1 seed는 알려진 세 기사와 합성 방문 시각만 제공; 원본 중간 카드·집계 차이는 V12 잔여; D03/D05 연결 검증은 FE_MEDIUM_PARITY_04_RESULT 참조. 상세 조건은 [S052 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s052>).
- FE: [reading-history/ReadingHistoryList.tsx](<../FE/src/features/reading-history/ReadingHistoryList.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V12 읽기 이력](#v12).
- 판정: 로컬 화면/상태 연결 확인; V12의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 이력 삭제 후 Undo는 미지원이며 원본 실행 근거도 없음(Q05); 보존 기간/기기 동기화 미정.
- 전이: [T-F14-02](#t-f14-02). 계약: [C11](#c11) · [C25](#c25) · [C27](#c27) · [C37](#c37). 미확인: [U-S052](#u-s052) · [U-F14](#u-f14). 인계 [H03](#h03).

<a id="s053"></a>

### S053 — 편집 추천과 개인 추천

- 원본: `sc_4352273aa0654f939705613dfa224e75` · [PNG](<../medium/flows/Explore/screens/04_sc_4352273aa0654f939705613dfa224e75.png>) · [분석](<../medium/flows/Explore/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s053>).
- 조건: Main/Explore → 검색 진입·Mindfulness 입력·Stories; Staff Picks/Who to follow 위치까지 세로·가로 이동. mediumFeedFixtures / SearchScreen·CatalogSearchResults; 칩·캐러셀 위치는 화면별 설정. 상세 조건은 [S053 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s053>).
- FE: [search/CatalogSearchResults.tsx](<../FE/src/features/search/CatalogSearchResults.tsx>) · [search/ExploreSections.tsx](<../FE/src/features/search/ExploreSections.tsx>) · [search/SearchScreen.tsx](<../FE/src/features/search/SearchScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V02 탐색·검색](#v02).
- 판정: 로컬 화면/상태 연결 확인; V02의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 검색 정렬·카테고리 계층은 자체 정책; 일부만 캡처된 Staff Pick은 안내로 처리하고 본문을 생성하지 않음.
- 전이: [T-F01-04](#t-f01-04). 계약: [C06](#c06) · [C07](#c07). 미확인: [U-S053](#u-s053) · [U-F01](#u-f01). 인계 [H06](#h06).

<a id="s054"></a>

### S054 — 이름과 이메일 입력 완료

- 원본: `sc_4510def6bbb1459ab0b5f18d07b8427e` · [PNG](<../medium/flows/Onboarding/screens/04_sc_4510def6bbb1459ab0b5f18d07b8427e.png>) · [분석](<../medium/flows/Onboarding/ANALYSIS.md>) · [R 9개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s054>).
- 조건: Main/Profile 또는 Library guest → AuthDialogs → 이메일 signup/login/code; Profile/Settings → Sign out. mockUsers + emailAuthSource; 개인정보·원본 인증코드 복사 없이 합성 테스트값 사용. 상세 조건은 [S054 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s054>).
- FE: [auth/AuthDialogs.tsx](<../FE/src/features/auth/AuthDialogs.tsx>) · [auth/EmailLogin.tsx](<../FE/src/features/auth/EmailLogin.tsx>) · [auth/createEmailAttempt.ts](<../FE/src/features/auth/createEmailAttempt.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V29 인증·로그아웃](#v29).
- 판정: 로컬 화면/상태 연결 확인; V29의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 실제 OAuth·메일 발송/소유권 확인·Supabase 세션·프로세스 재시작 복원 없음.
- 전이: [T-F53-04](#t-f53-04). 계약: [C46](#c46) · [C47](#c47) · [C48](#c48) · [C67](#c67). 미확인: [U-S054](#u-s054) · [U-F53](#u-f53). 인계 [H01](#h01).

<a id="s055"></a>

### S055 — 확장 오디오 플레이어

- 원본: `sc_45ddcc1f43a54523a1314ce563abf5ee` · [PNG](<../medium/flows/Home/Story detail/Listening to a story/screens/04_sc_45ddcc1f43a54523a1314ce563abf5ee.png>) · [분석](<../medium/flows/Home/Story detail/Listening to a story/ANALYSIS.md>) · [R 13개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s055>).
- 조건: Article Listen → 미니 플레이어 → 확장 → 재생·정지·seek·닫기. ListeningSource·mock 시계; 00:05/00:10/00:20/00:40 각 snapshot과 duration 독립. 상세 조건은 [S055 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s055>).
- FE: [listening/ListeningPlayer.tsx](<../FE/src/features/listening/ListeningPlayer.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V18 오디오 플레이어](#v18).
- 판정: 로컬 화면/상태 연결 확인; V18의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 이전/다음 트랙 비활성·실제 음성 없음. 지원/한계: silent-mock; 실제 TTS/음원·백그라운드/오프라인 재생 없음, 이전/다음 큐 버튼 비활성.
- 전이: [T-F26-04](#t-f26-04) · [T-F27-01](#t-f27-01) · [T-F28-01](#t-f28-01). 계약: [C58](#c58) · [C59](#c59) · [C61](#c61) · [C66](#c66). 미확인: [U-S055](#u-s055) · [U-F26](#u-f26) · [U-F27](#u-f27) · [U-F28](#u-f28). 인계 [H08](#h08).

<a id="s056"></a>

### S056 — 다크 읽기 목록 상세

- 원본: `sc_45fd4ac6da2148968fab1446df649f7f` · [PNG](<../medium/flows/Profile/Settings/Switching to dark mode/screens/07_sc_45fd4ac6da2148968fab1446df649f7f.png>) · [분석](<../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s056>).
- 조건: Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo. UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; source 확정 updatedAt;14/6/1초 독립 조건. 상세 조건은 [S056 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s056>).
- FE: [bookmarks/ListActions.tsx](<../FE/src/features/bookmarks/ListActions.tsx>) · [bookmarks/ListEditorSheet.tsx](<../FE/src/features/bookmarks/ListEditorSheet.tsx>) · [bookmarks/ListNoteSheet.tsx](<../FE/src/features/bookmarks/ListNoteSheet.tsx>) · [bookmarks/ListStoryCard.tsx](<../FE/src/features/bookmarks/ListStoryCard.tsx>) · [bookmarks/ReadingListScreen.tsx](<../FE/src/features/bookmarks/ReadingListScreen.tsx>) · [bookmarks/ReorderListEditor.tsx](<../FE/src/features/bookmarks/ReorderListEditor.tsx>) · [bookmarks/createUserListStore.ts](<../FE/src/features/bookmarks/createUserListStore.ts>) · [bookmarks/listTypes.ts](<../FE/src/features/bookmarks/listTypes.ts>) · [bookmarks/ListDetailMetadata.tsx](<../FE/src/features/bookmarks/ListDetailMetadata.tsx>) · [bookmarks/LibrarySheet.tsx](<../FE/src/features/bookmarks/LibrarySheet.tsx>) · [navigation/ReadingListRoute.tsx](<../FE/src/app/navigation/ReadingListRoute.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V25 내 목록·편집](#v25).
- 판정: 로컬 화면/상태 연결 확인; V25의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 자체 소유권/충돌/시간 정책; 기본 Reading list 삭제 제한. 실제 공유/다른 기기 정합성 미연결.
- 전이: [T-F62-07](#t-f62-07). 계약: [C28](#c28) · [C30](#c30) · [C31](#c31) · [C32](#c32) · [C33](#c33) · [C34](#c34) · [C35](#c35). 미확인: [U-S056](#u-s056) · [U-F62](#u-f62). 인계 [H04](#h04).

<a id="s057"></a>

### S057 — Life 토픽 상세

- 원본: `sc_4602e853aca341a697239bc9f55b6da3` · [PNG](<../medium/flows/Explore/Topic detail/screens/02_sc_4602e853aca341a697239bc9f55b6da3.png>) · [분석](<../medium/flows/Explore/Topic detail/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s057>).
- 조건: Main/Explore → Life 또는 Self Improvement → Topic(topicId); 큐레이션까지 스크롤. topicSource + relationshipSource; topicId와 following을 독립 설정. 상세 조건은 [S057 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s057>).
- FE: [topics/TopicScreen.tsx](<../FE/src/features/topics/TopicScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V03 토픽·큐레이션 미리보기](#v03).
- 판정: 로컬 화면/상태 연결 확인; V03의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 토픽 집계·연관·추천은 보관 fixture/자체 정책, 실제 추천 서비스 미연결.
- 전이: [T-F03-02](#t-f03-02) · [T-F04-01](#t-f04-01). 계약: [C06](#c06) · [C08](#c08). 미확인: [U-S057](#u-s057) · [U-F03](#u-f03) · [U-F04](#u-f04). 인계 [H06](#h06).

<a id="s058"></a>

### S058 — 다크 Library

- 원본: `sc_4a39ee1d768342a9823787c11c851479` · [PNG](<../medium/flows/Profile/Settings/Switching to dark mode/screens/05_sc_4a39ee1d768342a9823787c11c851479.png>) · [분석](<../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s058>).
- 조건: Main/Library → Your lists / Saved lists / Highlighted; 새 목록·삭제 후 복귀. UserListStore·HighlightSource; empty/3/4 stories·About mindfulness를 각 상태별 구성. 상세 조건은 [S058 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s058>).
- FE: [bookmarks/LibraryScreen.tsx](<../FE/src/features/bookmarks/LibraryScreen.tsx>) · [highlights/HighlightList.tsx](<../FE/src/features/highlights/HighlightList.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V24 Library·목록 카드](#v24).
- 판정: 로컬 화면/상태 연결 확인; V24의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 목록/강조/다운로드는 메모리 상태; 원본 계정·집계·콘텐츠 snapshot과 현재 사용자 데이터는 다름.
- 전이: [T-F62-05](#t-f62-05). 계약: [C20](#c20) · [C29](#c29) · [C31](#c31) · [C37](#c37). 미확인: [U-S058](#u-s058) · [U-F62](#u-f62). 인계 [H04](#h04).

<a id="s059"></a>

### S059 — Member 혜택과 Friend 플랜 노출

- 원본: `sc_4beaf37694cb429baac5c27b93a71ccf` · [PNG](<../medium/flows/Onboarding/Subscribing to Medium/screens/02_sc_4beaf37694cb429baac5c27b93a71ccf.png>) · [분석](<../medium/flows/Onboarding/Subscribing to Medium/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s059>).
- 조건: Profile/Settings Upgrade 또는 onboarding 구독 → MembershipSheet → monthly/yearly → 모의 선택·성공. MembershipSource; SGD 보관 가격·독립 pending/success fixture; OS 구매 알림과 web Alert 차이. 상세 조건은 [S059 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s059>).
- FE: [membership/MembershipSheet.tsx](<../FE/src/features/membership/MembershipSheet.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V31 멤버십](#v31).
- 판정: 로컬 화면/상태 연결 확인; V31의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 실제 스토어 구매/영수증/복원/갱신/해지 없음. 사용자 20번은 기간 선택/닫기이며 구매 Select 성공 증거가 아님.
- 전이: [T-F54-02](#t-f54-02). 계약: [C50](#c50) · [C65](#c65) · [C66](#c66) · [C67](#c67). 미확인: [U-S059](#u-s059) · [U-F54](#u-f54). 인계 [H08](#h08).

<a id="s060"></a>

### S060 — 제목과 본문 입력

- 원본: `sc_4db886af7d024100a72b9e02fa3c1ee8` · [PNG](<../medium/flows/Home/Publishing a story/screens/03_sc_4db886af7d024100a72b9e02fa3c1ee8.png>) · [분석](<../medium/flows/Home/Publishing a story/ANALYSIS.md>) · [R 14개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s060>).
- 조건: Home 작성 → Editor; 제목·본문 입력 → 해당 서식·이미지 블록 선택. DraftSource·EditorSession; 음악 제목/단락/인용/목록/구분선은 각 S의 문서 snapshot 별도. 상세 조건은 [S060 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s060>).
- FE: [editor/RichDocumentBody.tsx](<../FE/src/features/editor/RichDocumentBody.tsx>) · [editor/StoryEditorScreen.tsx](<../FE/src/features/editor/StoryEditorScreen.tsx>) · [editor/editorModel.ts](<../FE/src/features/editor/editorModel.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V07 편집기 서식](#v07).
- 판정: 로컬 화면/상태 연결 확인; V07의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 인용선 18dp·사진 선택 모드 여백/모드 전환 재선택 차이; 원본의 사진 경계 선택 방식은 미수록.
- 전이: [T-F08-03](#t-f08-03). 계약: [C40](#c40). 미확인: [U-S060](#u-s060) · [U-F08](#u-f08). 인계 [H02](#h02).

<a id="s061"></a>

### S061 — Featured 기사 목록

- 원본: `sc_4ec0a8b65f954b0984ece5b3b9f258e4` · [PNG](<../medium/flows/Home/screens/04_sc_4ec0a8b65f954b0984ece5b3b9f258e4.png>) · [분석](<../medium/flows/Home/ANALYSIS.md>) · [R 7개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s061>).
- 조건: Main/Home → For you·Featured 선택; S026은 헤더가 접힌 하단 카드, S176은 Featured 빈 상태. mediumFeedFixtures / feedPreviewScenario(normal); Featured empty는 별도 feedSource 필요. 상세 조건은 [S061 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s061>).
- FE: [community/FollowingFeed.tsx](<../FE/src/features/community/FollowingFeed.tsx>) · [feed/HomeFeedScreen.tsx](<../FE/src/features/feed/HomeFeedScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V01 홈](#v01).
- 판정: 로컬 화면/상태 연결 확인; V01의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 추천·개인화·페이지 데이터는 fixture; 원본 시점별 기사·집계·스크롤과 현재 상태의 일치는 별도 미확인.
- 전이: [T-F05-04](#t-f05-04). 계약: [C04](#c04) · [C05](#c05). 미확인: [U-S061](#u-s061) · [U-F05](#u-f05). 인계 [H06](#h06).

<a id="s062"></a>

### S062 — 새 응답 표시

- 원본: `sc_500793b8306c411585ba54ddaf6a8f25` · [PNG](<../medium/flows/Home/Story detail/Responses/Commenting a story/screens/03_sc_500793b8306c411585ba54ddaf6a8f25.png>) · [분석](<../medium/flows/Home/Story detail/Responses/Commenting a story/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s062>).
- 조건: Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond. ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태. 상세 조건은 [S062 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s062>).
- FE: [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V20 응답·답글](#v20).
- 판정: 로컬 화면/상태 연결 확인; V20의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: source 메모리 저장·자체 깊이/정렬/집계; 실제 타 사용자 조회·서버 소유권 검증·알림 없음.
- 전이: [T-F31-03](#t-f31-03) · [T-F32-01](#t-f32-01) · [T-F33-01](#t-f33-01). 계약: [C14](#c14) · [C15](#c15) · [C16](#c16) · [C17](#c17) · [C18](#c18) · [C20](#c20). 미확인: [U-S062](#u-s062) · [U-F31](#u-f31) · [U-F32](#u-f32) · [U-F33](#u-f33). 인계 [H05](#h05).

<a id="s063"></a>

### S063 — 읽기 표시 설정 기본

- 원본: `sc_557c1fb7c6bf4dcc82ba1d6aba677f94` · [PNG](<../medium/flows/Home/Story detail/Changing display/screens/03_sc_557c1fb7c6bf4dcc82ba1d6aba677f94.png>) · [분석](<../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>) · [R 8개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s063>).
- 조건: Article 더보기 → Display settings → 100/120%, font, appearance, highlights. DisplaySettingsSource; S063 기본관찰값, S125=120%, S198=Dark120%, S001=others off. 상세 조건은 [S063 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s063>).
- FE: [settings/ArticleDisplayPopover.tsx](<../FE/src/features/settings/ArticleDisplayPopover.tsx>) · [settings/useReaderTypography.ts](<../FE/src/features/settings/useReaderTypography.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V16 읽기 설정](#v16).
- 판정: 로컬 화면/상태 연결 확인; V16의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 선택 옵션/80~200 경계는 자체 정책, 원본 실제 서체 파일 0개. 기사 확대와 OS 확대 구분.
- 전이: [T-F24-03](#t-f24-03). 계약: [C02](#c02) · [C12](#c12) · [C13](#c13). 미확인: [U-S063](#u-s063) · [U-F24](#u-f24). 인계 [H03](#h03).

<a id="s064"></a>

### S064 — 가입 인증 코드 입력 완료

- 원본: `sc_55d8ee5f826740d69ebd2e163aaa6486` · [PNG](<../medium/flows/Onboarding/screens/06_sc_55d8ee5f826740d69ebd2e163aaa6486.png>) · [분석](<../medium/flows/Onboarding/ANALYSIS.md>) · [R 7개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s064>).
- 조건: Main/Profile 또는 Library guest → AuthDialogs → 이메일 signup/login/code; Profile/Settings → Sign out. mockUsers + emailAuthSource; 개인정보·원본 인증코드 복사 없이 합성 테스트값 사용. 상세 조건은 [S064 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s064>).
- FE: [auth/AuthDialogs.tsx](<../FE/src/features/auth/AuthDialogs.tsx>) · [auth/EmailLogin.tsx](<../FE/src/features/auth/EmailLogin.tsx>) · [auth/createEmailAttempt.ts](<../FE/src/features/auth/createEmailAttempt.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V29 인증·로그아웃](#v29).
- 판정: 로컬 화면/상태 연결 확인; V29의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 실제 OAuth·메일 발송/소유권 확인·Supabase 세션·프로세스 재시작 복원 없음.
- 전이: [T-F53-06](#t-f53-06). 계약: [C46](#c46) · [C47](#c47) · [C48](#c48) · [C67](#c67). 미확인: [U-S064](#u-s064) · [U-F53](#u-f53). 인계 [H01](#h01).

<a id="s065"></a>

### S065 — Music 선택

- 원본: `sc_57162331e2334952b5da8676e4de3c22` · [PNG](<../medium/flows/Home/Publishing a story/Adding topics/screens/04_sc_57162331e2334952b5da8676e4de3c22.png>) · [분석](<../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s065>).
- 조건: Home 작성 → Editor → Next/PublishPreview → Topics → 검색·선택·Save → preview. DraftSource·PublishTopics; The Silence between Notes, Music/Culture/Art, 별도 Publication 없음. 상세 조건은 [S065 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s065>).
- FE: [editor/PublishTopics.tsx](<../FE/src/features/editor/PublishTopics.tsx>) · [editor/StoryEditorScreen.tsx](<../FE/src/features/editor/StoryEditorScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V06 발행·토픽](#v06).
- 판정: 로컬 화면/상태 연결 확인; V06의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 실제 Publication 심사/제출·공개 URL·서버 발행 없음; 유효성·멱등성은 현재 mock 계약.
- 전이: [T-F07-04](#t-f07-04). 계약: [C44](#c44) · [C45](#c45). 미확인: [U-S065](#u-s065) · [U-F07](#u-f07). 인계 [H02](#h02).

<a id="s066"></a>

### S066 — 저장 글 있는 읽기 목록

- 원본: `sc_57450c38bf994be18d95fcaf712c56ba` · [PNG](<../medium/flows/Library/screens/03_sc_57450c38bf994be18d95fcaf712c56ba.png>) · [분석](<../medium/flows/Library/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s066>).
- 조건: Main/Library → Your lists / Saved lists / Highlighted; 새 목록·삭제 후 복귀. UserListStore·HighlightSource; empty/3/4 stories·About mindfulness를 각 상태별 구성. 상세 조건은 [S066 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s066>).
- FE: [bookmarks/LibraryScreen.tsx](<../FE/src/features/bookmarks/LibraryScreen.tsx>) · [highlights/HighlightList.tsx](<../FE/src/features/highlights/HighlightList.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V24 Library·목록 카드](#v24).
- 판정: 로컬 화면/상태 연결 확인; V24의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 목록/강조/다운로드는 메모리 상태; 원본 계정·집계·콘텐츠 snapshot과 현재 사용자 데이터는 다름.
- 전이: [T-F41-03](#t-f41-03) · [T-F42-01](#t-f42-01). 계약: [C20](#c20) · [C29](#c29) · [C31](#c31) · [C37](#c37). 미확인: [U-S066](#u-s066) · [U-F41](#u-f41) · [U-F42](#u-f42). 인계 [H04](#h04).

<a id="s067"></a>

### S067 — 관심 주제 미선택

- 원본: `sc_5843ae43bf154aadb5507c6fa51d150d` · [PNG](<../medium/flows/Onboarding/screens/08_sc_5843ae43bf154aadb5507c6fa51d150d.png>) · [분석](<../medium/flows/Onboarding/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s067>).
- 조건: guest signup → Onboarding → interests → recommendations → permission → welcome; S043은 실제 cold start. OnboardingSource·NotificationPermissionSource; 관심5개/추천Follow/안내 상태; S043 대응 splash 없음. 상세 조건은 [S067 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s067>).
- FE: [onboarding/OnboardingScreen.tsx](<../FE/src/features/onboarding/OnboardingScreen.tsx>) · [onboarding/createOnboardingSession.ts](<../FE/src/features/onboarding/createOnboardingSession.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V30 온보딩·시작](#v30).
- 판정: 로컬 화면/상태 연결 확인; V30의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 시작은 대체 워드마크, 온보딩 저장은 mock; 캡처를 신규 가입 전용으로 단정하지 않음.
- 전이: [T-F53-08](#t-f53-08). 계약: [C49](#c49) · [C50](#c50). 미확인: [U-S067](#u-s067) · [U-F53](#u-f53). 인계 [H01](#h01).

<a id="s068"></a>

### S068 — 알림 목록

- 원본: `sc_5d1c7181dea04ba59b57242abbc19fee` · [PNG](<../medium/flows/Home/Notifications/screens/02_sc_5d1c7181dea04ba59b57242abbc19fee.png>) · [분석](<../medium/flows/Home/Notifications/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s068>).
- 조건: A 로그인 → Home 알림 버튼 → Notifications; 알림 유형별 목적지와 복귀. notificationFixtures + NotificationSource; 현재 목록과 S068 원본 배열의 동일성 미확인. 상세 조건은 [S068 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s068>).
- FE: [notifications/NotificationsScreen.tsx](<../FE/src/features/notifications/NotificationsScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V05 알림](#v05).
- 판정: 로컬 화면/상태 연결 확인; V05의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 알림 목록은 fixture; 녹색선의 원본 의미·실제 이벤트 전달 미확인.
- 전이: [T-F06-02](#t-f06-02). 계약: [C55](#c55). 미확인: [U-S068](#u-s068) · [U-F06](#u-f06). 인계 [H07](#h07).

<a id="s069"></a>

### S069 — For you 홈 피드

- 원본: `sc_5e0ba0e498ff49579bf838096aec4b5e` · [PNG](<../medium/flows/Explore/screens/01_sc_5e0ba0e498ff49579bf838096aec4b5e.png>) · [분석](<../medium/flows/Explore/ANALYSIS.md>) · [R 17개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s069>).
- 조건: Main/Home → For you·Featured 선택; S026은 헤더가 접힌 하단 카드, S176은 Featured 빈 상태. mediumFeedFixtures / feedPreviewScenario(normal); Featured empty는 별도 feedSource 필요. 상세 조건은 [S069 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s069>).
- FE: [community/FollowingFeed.tsx](<../FE/src/features/community/FollowingFeed.tsx>) · [feed/HomeFeedScreen.tsx](<../FE/src/features/feed/HomeFeedScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V01 홈](#v01).
- 판정: 로컬 화면/상태 연결 확인; V01의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 추천·개인화·페이지 데이터는 fixture; 원본 시점별 기사·집계·스크롤과 현재 상태의 일치는 별도 미확인.
- 전이: [T-F01-01](#t-f01-01) · [T-F05-01](#t-f05-01) · [T-F06-01](#t-f06-01) · [T-F08-01](#t-f08-01) · [T-F12-01](#t-f12-01) · [T-F41-01](#t-f41-01) · [T-F52-07](#t-f52-07) · [T-F53-13](#t-f53-13) · [T-F54-06](#t-f54-06) · [T-F55-01](#t-f55-01). 계약: [C04](#c04) · [C05](#c05). 미확인: [U-S069](#u-s069) · [U-F01](#u-f01) · [U-F05](#u-f05) · [U-F06](#u-f06) · [U-F08](#u-f08) · [U-F12](#u-f12) · [U-F41](#u-f41) · [U-F52](#u-f52) · [U-F53](#u-f53) · [U-F54](#u-f54) · [U-F55](#u-f55). 인계 [H06](#h06).

<a id="s070"></a>

### S070 — Explore 토픽 가로 이동

- 원본: `sc_602f368bf00a46b8b57d68f964ed6c16` · [PNG](<../medium/flows/Explore/screens/03_sc_602f368bf00a46b8b57d68f964ed6c16.png>) · [분석](<../medium/flows/Explore/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s070>).
- 조건: Main/Explore → 검색 진입·Mindfulness 입력·Stories; Staff Picks/Who to follow 위치까지 세로·가로 이동. mediumFeedFixtures / SearchScreen·CatalogSearchResults; 칩·캐러셀 위치는 화면별 설정. 상세 조건은 [S070 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s070>).
- FE: [search/CatalogSearchResults.tsx](<../FE/src/features/search/CatalogSearchResults.tsx>) · [search/ExploreSections.tsx](<../FE/src/features/search/ExploreSections.tsx>) · [search/SearchScreen.tsx](<../FE/src/features/search/SearchScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V02 탐색·검색](#v02).
- 판정: 로컬 화면/상태 연결 확인; V02의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 검색 정렬·카테고리 계층은 자체 정책; 일부만 캡처된 Staff Pick은 안내로 처리하고 본문을 생성하지 않음.
- 전이: [T-F01-03](#t-f01-03) · [T-F03-01](#t-f03-01). 계약: [C06](#c06) · [C07](#c07). 미확인: [U-S070](#u-s070) · [U-F01](#u-f01) · [U-F03](#u-f03). 인계 [H06](#h06).

<a id="s071"></a>

### S071 — 답글 생성 표시

- 원본: `sc_60bd813234264b59b304bd3ac3df0af4` · [PNG](<../medium/flows/Home/Story detail/Responses/Replying a response/screens/04_sc_60bd813234264b59b304bd3ac3df0af4.png>) · [분석](<../medium/flows/Home/Story detail/Responses/Replying a response/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s071>).
- 조건: Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond. ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태. 상세 조건은 [S071 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s071>).
- FE: [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V20 응답·답글](#v20).
- 판정: 로컬 화면/상태 연결 확인; V20의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: source 메모리 저장·자체 깊이/정렬/집계; 실제 타 사용자 조회·서버 소유권 검증·알림 없음.
- 전이: [T-F35-04](#t-f35-04). 계약: [C14](#c14) · [C15](#c15) · [C16](#c16) · [C17](#c17) · [C18](#c18) · [C20](#c20). 미확인: [U-S071](#u-s071) · [U-F35](#u-f35). 인계 [H05](#h05).

<a id="s072"></a>

### S072 — 답글 대상 선택

- 원본: `sc_6101af9ca21443afbe2c2146c8ac2e3d` · [PNG](<../medium/flows/Home/Story detail/Responses/Replying a response/screens/02_sc_6101af9ca21443afbe2c2146c8ac2e3d.png>) · [분석](<../medium/flows/Home/Story detail/Responses/Replying a response/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s072>).
- 조건: Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond. ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태. 상세 조건은 [S072 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s072>).
- FE: [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V20 응답·답글](#v20).
- 판정: 로컬 화면/상태 연결 확인; V20의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: source 메모리 저장·자체 깊이/정렬/집계; 실제 타 사용자 조회·서버 소유권 검증·알림 없음.
- 전이: [T-F35-02](#t-f35-02). 계약: [C14](#c14) · [C15](#c15) · [C16](#c16) · [C17](#c17) · [C18](#c18) · [C20](#c20). 미확인: [U-S072](#u-s072) · [U-F35](#u-f35). 인계 [H05](#h05).

<a id="s073"></a>

### S073 — 공유 이미지 저장 안내

- 원본: `sc_62256b592ebc4b028f1097aa21f9e400` · [PNG](<../medium/flows/Home/Story detail/Sharing a story/Downloading an image/screens/02_sc_62256b592ebc4b028f1097aa21f9e400.png>) · [분석](<../medium/flows/Home/Story detail/Sharing a story/Downloading an image/ANALYSIS.md>) · [R 9개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s073>).
- 조건: Article/인용/Identity/PublicList 공유 → 카드 → Copy link/Save image/Share via. ShareAdapter; 공개 공유 target + 카드 style index; OS 저장·공유는 Q07. 상세 조건은 [S073 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s073>).
- FE: [sharing/ShareCard.tsx](<../FE/src/features/sharing/ShareCard.tsx>) · [sharing/ShareSheet.tsx](<../FE/src/features/sharing/ShareSheet.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V23 공유](#v23).
- 판정: 로컬 화면/상태 연결 확인; V23의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: OS 복귀 returned는 전달 완료 증거가 아님. 공유 URL은 kostolany.invalid 모의 주소이며 Friend 링크도 실제 발급하지 않음. 파일 이미지 저장과 목록 메모리 다운로드는 다름.
- 전이: [T-F40-02](#t-f40-02). 계약: [C23](#c23) · [C61](#c61) · [C62](#c62) · [C63](#c63) · [C64](#c64). 미확인: [U-S073](#u-s073) · [U-F40](#u-f40). 인계 [H09](#h09).

<a id="s074"></a>

### S074 — 내 프로필 Lists

- 원본: `sc_64afef71457f48808c33def66fd6d90e` · [PNG](<../medium/flows/Profile/screens/04_sc_64afef71457f48808c33def66fd6d90e.png>) · [분석](<../medium/flows/Profile/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s074>).
- 조건: Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save. ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도. 상세 조건은 [S074 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s074>).
- FE: [editor/WrittenStoryActions.tsx](<../FE/src/features/editor/WrittenStoryActions.tsx>) · [editor/WrittenStoryCardReactions.tsx](<../FE/src/features/editor/WrittenStoryCardReactions.tsx>) · [profile/ProfileEditorSheet.tsx](<../FE/src/features/profile/ProfileEditorSheet.tsx>) · [profile/ProfileScreen.tsx](<../FE/src/features/profile/ProfileScreen.tsx>) · [profile/ProfileStories.tsx](<../FE/src/features/profile/ProfileStories.tsx>) · [profile/PronounsEditor.tsx](<../FE/src/features/profile/PronounsEditor.tsx>) · [profile/useProfilePhotoSelection.ts](<../FE/src/features/profile/useProfilePhotoSelection.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V32 내 프로필·편집](#v32).
- 판정: 로컬 화면/상태 연결 확인; V32의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 사진은 로컬 URI/수명 관리, 업로드·서버 프로필 영속 저장 없음. 원본 OS 앨범과 Android picker 모습은 다름.
- 전이: [T-F55-04](#t-f55-04). 계약: [C51](#c51) · [C52](#c52) · [C53](#c53). 미확인: [U-S074](#u-s074) · [U-F55](#u-f55). 인계 [H09](#h09).

<a id="s075"></a>

### S075 — 앱 아이콘 선택과 멤버십 제한

- 원본: `sc_64b75d913b284d708ab44e4f3663a59f` · [PNG](<../medium/flows/Profile/Settings/Custom app icon/screens/02_sc_64b75d913b284d708ab44e4f3663a59f.png>) · [분석](<../medium/flows/Profile/Settings/Custom app icon/ANALYSIS.md>) · [R 13개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_03.md#s075>).
- 조건: Profile/Settings → Account/Appearance/App icon/각 상세 → 복귀. DisplaySettingsSource·AppIconAdapter; 자체 K 아이콘, S075 원본과 비동등. 상세 조건은 [S075 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s075>).
- FE: [app-icon/AppIconScreen.tsx](<../FE/src/features/app-icon/AppIconScreen.tsx>) · [settings/SettingsExtrasScreen.tsx](<../FE/src/features/settings/SettingsExtrasScreen.tsx>) · [settings/SettingsScreen.tsx](<../FE/src/features/settings/SettingsScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V33 설정·앱 아이콘](#v33).
- 판정: 로컬 화면/상태 연결 확인; V33의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 계정/Facebook은 mock; 앱 아이콘 어댑터는 모듈 가용성에 따름. 현재 아이콘 모양 확정으로 수정 대상 아님.
- 전이: [T-F60-02](#t-f60-02). 계약: [C02](#c02) · [C66](#c66) · [C67](#c67) · [C68](#c68) · [C69](#c69). 미확인: [U-S075](#u-s075) · [U-F60](#u-f60). 인계 [H09](#h09).

<a id="s076"></a>

### S076 — 리스트 생성 빈 폼

- 원본: `sc_675e3eda08504708979533659dacdcf6` · [PNG](<../medium/flows/Library/Creating a list/screens/02_sc_675e3eda08504708979533659dacdcf6.png>) · [분석](<../medium/flows/Library/Creating a list/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s076>).
- 조건: Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo. UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; source 확정 updatedAt;14/6/1초 독립 조건. 상세 조건은 [S076 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s076>).
- FE: [bookmarks/ListActions.tsx](<../FE/src/features/bookmarks/ListActions.tsx>) · [bookmarks/ListEditorSheet.tsx](<../FE/src/features/bookmarks/ListEditorSheet.tsx>) · [bookmarks/ListNoteSheet.tsx](<../FE/src/features/bookmarks/ListNoteSheet.tsx>) · [bookmarks/ListStoryCard.tsx](<../FE/src/features/bookmarks/ListStoryCard.tsx>) · [bookmarks/ReadingListScreen.tsx](<../FE/src/features/bookmarks/ReadingListScreen.tsx>) · [bookmarks/ReorderListEditor.tsx](<../FE/src/features/bookmarks/ReorderListEditor.tsx>) · [bookmarks/createUserListStore.ts](<../FE/src/features/bookmarks/createUserListStore.ts>) · [bookmarks/listTypes.ts](<../FE/src/features/bookmarks/listTypes.ts>) · [bookmarks/ListDetailMetadata.tsx](<../FE/src/features/bookmarks/ListDetailMetadata.tsx>) · [bookmarks/LibrarySheet.tsx](<../FE/src/features/bookmarks/LibrarySheet.tsx>) · [navigation/ReadingListRoute.tsx](<../FE/src/app/navigation/ReadingListRoute.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V25 내 목록·편집](#v25).
- 판정: 로컬 화면/상태 연결 확인; V25의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 자체 소유권/충돌/시간 정책; 기본 Reading list 삭제 제한. 실제 공유/다른 기기 정합성 미연결.
- 전이: [T-F42-02](#t-f42-02). 계약: [C28](#c28) · [C30](#c30) · [C31](#c31) · [C32](#c32) · [C33](#c33) · [C34](#c34) · [C35](#c35). 미확인: [U-S076](#u-s076) · [U-F42](#u-f42). 인계 [H04](#h04).

<a id="s077"></a>

### S077 — 변경 순서 반영

- 원본: `sc_6840597985cc46b6b12f6cd0204756f4` · [PNG](<../medium/flows/Library/List detail/Reordering items/screens/05_sc_6840597985cc46b6b12f6cd0204756f4.png>) · [분석](<../medium/flows/Library/List detail/Reordering items/ANALYSIS.md>) · [R 13개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s077>).
- 조건: Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo. UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; source 확정 updatedAt;14/6/1초 독립 조건. 상세 조건은 [S077 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s077>).
- FE: [bookmarks/ListActions.tsx](<../FE/src/features/bookmarks/ListActions.tsx>) · [bookmarks/ListEditorSheet.tsx](<../FE/src/features/bookmarks/ListEditorSheet.tsx>) · [bookmarks/ListNoteSheet.tsx](<../FE/src/features/bookmarks/ListNoteSheet.tsx>) · [bookmarks/ListStoryCard.tsx](<../FE/src/features/bookmarks/ListStoryCard.tsx>) · [bookmarks/ReadingListScreen.tsx](<../FE/src/features/bookmarks/ReadingListScreen.tsx>) · [bookmarks/ReorderListEditor.tsx](<../FE/src/features/bookmarks/ReorderListEditor.tsx>) · [bookmarks/createUserListStore.ts](<../FE/src/features/bookmarks/createUserListStore.ts>) · [bookmarks/listTypes.ts](<../FE/src/features/bookmarks/listTypes.ts>) · [bookmarks/ListDetailMetadata.tsx](<../FE/src/features/bookmarks/ListDetailMetadata.tsx>) · [bookmarks/LibrarySheet.tsx](<../FE/src/features/bookmarks/LibrarySheet.tsx>) · [navigation/ReadingListRoute.tsx](<../FE/src/app/navigation/ReadingListRoute.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V25 내 목록·편집](#v25).
- 판정: 로컬 화면/상태 연결 확인; V25의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 자체 소유권/충돌/시간 정책; 기본 Reading list 삭제 제한. 실제 공유/다른 기기 정합성 미연결.
- 전이: [T-F51-05](#t-f51-05). 계약: [C28](#c28) · [C30](#c30) · [C31](#c31) · [C32](#c32) · [C33](#c33) · [C34](#c34) · [C35](#c35). 미확인: [U-S077](#u-s077) · [U-F51](#u-f51). 인계 [H04](#h04).

<a id="s078"></a>

### S078 — 리스트 순서 편집

- 원본: `sc_6a1036b35729490195c460e5b934bd68` · [PNG](<../medium/flows/Library/List detail/Reordering items/screens/03_sc_6a1036b35729490195c460e5b934bd68.png>) · [분석](<../medium/flows/Library/List detail/Reordering items/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s078>).
- 조건: Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo. UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; source 확정 updatedAt;14/6/1초 독립 조건. 상세 조건은 [S078 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s078>).
- FE: [bookmarks/ListActions.tsx](<../FE/src/features/bookmarks/ListActions.tsx>) · [bookmarks/ListEditorSheet.tsx](<../FE/src/features/bookmarks/ListEditorSheet.tsx>) · [bookmarks/ListNoteSheet.tsx](<../FE/src/features/bookmarks/ListNoteSheet.tsx>) · [bookmarks/ListStoryCard.tsx](<../FE/src/features/bookmarks/ListStoryCard.tsx>) · [bookmarks/ReadingListScreen.tsx](<../FE/src/features/bookmarks/ReadingListScreen.tsx>) · [bookmarks/ReorderListEditor.tsx](<../FE/src/features/bookmarks/ReorderListEditor.tsx>) · [bookmarks/createUserListStore.ts](<../FE/src/features/bookmarks/createUserListStore.ts>) · [bookmarks/listTypes.ts](<../FE/src/features/bookmarks/listTypes.ts>) · [bookmarks/ListDetailMetadata.tsx](<../FE/src/features/bookmarks/ListDetailMetadata.tsx>) · [bookmarks/LibrarySheet.tsx](<../FE/src/features/bookmarks/LibrarySheet.tsx>) · [navigation/ReadingListRoute.tsx](<../FE/src/app/navigation/ReadingListRoute.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V25 내 목록·편집](#v25).
- 판정: 로컬 화면/상태 연결 확인; V25의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 자체 소유권/충돌/시간 정책; 기본 Reading list 삭제 제한. 실제 공유/다른 기기 정합성 미연결.
- 전이: [T-F51-03](#t-f51-03). 계약: [C28](#c28) · [C30](#c30) · [C31](#c31) · [C32](#c32) · [C33](#c33) · [C34](#c34) · [C35](#c35). 미확인: [U-S078](#u-s078) · [U-F51](#u-f51). 인계 [H04](#h04).

<a id="s079"></a>

### S079 — 팔로우 추천 카드

- 원본: `sc_6bc604f45031400d9cebd252cd89e7a2` · [PNG](<../medium/flows/Explore/screens/05_sc_6bc604f45031400d9cebd252cd89e7a2.png>) · [분석](<../medium/flows/Explore/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s079>).
- 조건: Main/Explore → 검색 진입·Mindfulness 입력·Stories; Staff Picks/Who to follow 위치까지 세로·가로 이동. mediumFeedFixtures / SearchScreen·CatalogSearchResults; 칩·캐러셀 위치는 화면별 설정. 상세 조건은 [S079 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s079>).
- FE: [search/CatalogSearchResults.tsx](<../FE/src/features/search/CatalogSearchResults.tsx>) · [search/ExploreSections.tsx](<../FE/src/features/search/ExploreSections.tsx>) · [search/SearchScreen.tsx](<../FE/src/features/search/SearchScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V02 탐색·검색](#v02).
- 판정: 로컬 화면/상태 연결 확인; V02의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 검색 정렬·카테고리 계층은 자체 정책; 일부만 캡처된 Staff Pick은 안내로 처리하고 본문을 생성하지 않음.
- 전이: [T-F01-05](#t-f01-05). 계약: [C06](#c06) · [C07](#c07). 미확인: [U-S079](#u-s079) · [U-F01](#u-f01). 인계 [H06](#h06).

<a id="s080"></a>

### S080 — 대명사 검색

- 원본: `sc_6c7a00132f3c47e6b2e803743cc10d21` · [PNG](<../medium/flows/Profile/Editing profile information/Adding pronouns/screens/03_sc_6c7a00132f3c47e6b2e803743cc10d21.png>) · [분석](<../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s080>).
- 조건: Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save. ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도. 상세 조건은 [S080 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s080>).
- FE: [editor/WrittenStoryActions.tsx](<../FE/src/features/editor/WrittenStoryActions.tsx>) · [editor/WrittenStoryCardReactions.tsx](<../FE/src/features/editor/WrittenStoryCardReactions.tsx>) · [profile/ProfileEditorSheet.tsx](<../FE/src/features/profile/ProfileEditorSheet.tsx>) · [profile/ProfileScreen.tsx](<../FE/src/features/profile/ProfileScreen.tsx>) · [profile/ProfileStories.tsx](<../FE/src/features/profile/ProfileStories.tsx>) · [profile/PronounsEditor.tsx](<../FE/src/features/profile/PronounsEditor.tsx>) · [profile/useProfilePhotoSelection.ts](<../FE/src/features/profile/useProfilePhotoSelection.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V32 내 프로필·편집](#v32).
- 판정: 로컬 화면/상태 연결 확인; V32의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 사진은 로컬 URI/수명 관리, 업로드·서버 프로필 영속 저장 없음. 원본 OS 앨범과 Android picker 모습은 다름.
- 전이: [T-F56-03](#t-f56-03). 계약: [C51](#c51) · [C52](#c52) · [C53](#c53). 미확인: [U-S080](#u-s080) · [U-F56](#u-f56). 인계 [H09](#h09).

<a id="s081"></a>

### S081 — 내 리스트 관리 메뉴

- 원본: `sc_71f31ac7803a47f89b2e76b6a9355a7c` · [PNG](<../medium/flows/Library/List detail/Deleting a list/screens/02_sc_71f31ac7803a47f89b2e76b6a9355a7c.png>) · [분석](<../medium/flows/Library/List detail/Deleting a list/ANALYSIS.md>) · [R 7개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s081>).
- 조건: Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo. UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; source 확정 updatedAt;14/6/1초 독립 조건. 상세 조건은 [S081 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s081>).
- FE: [bookmarks/ListActions.tsx](<../FE/src/features/bookmarks/ListActions.tsx>) · [bookmarks/ListEditorSheet.tsx](<../FE/src/features/bookmarks/ListEditorSheet.tsx>) · [bookmarks/ListNoteSheet.tsx](<../FE/src/features/bookmarks/ListNoteSheet.tsx>) · [bookmarks/ListStoryCard.tsx](<../FE/src/features/bookmarks/ListStoryCard.tsx>) · [bookmarks/ReadingListScreen.tsx](<../FE/src/features/bookmarks/ReadingListScreen.tsx>) · [bookmarks/ReorderListEditor.tsx](<../FE/src/features/bookmarks/ReorderListEditor.tsx>) · [bookmarks/createUserListStore.ts](<../FE/src/features/bookmarks/createUserListStore.ts>) · [bookmarks/listTypes.ts](<../FE/src/features/bookmarks/listTypes.ts>) · [bookmarks/ListDetailMetadata.tsx](<../FE/src/features/bookmarks/ListDetailMetadata.tsx>) · [bookmarks/LibrarySheet.tsx](<../FE/src/features/bookmarks/LibrarySheet.tsx>) · [navigation/ReadingListRoute.tsx](<../FE/src/app/navigation/ReadingListRoute.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V25 내 목록·편집](#v25).
- 판정: 로컬 화면/상태 연결 확인; V25의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 자체 소유권/충돌/시간 정책; 기본 Reading list 삭제 제한. 실제 공유/다른 기기 정합성 미연결.
- 전이: [T-F47-02](#t-f47-02) · [T-F49-02](#t-f49-02) · [T-F51-02](#t-f51-02). 계약: [C28](#c28) · [C30](#c30) · [C31](#c31) · [C32](#c32) · [C33](#c33) · [C34](#c34) · [C35](#c35). 미확인: [U-S081](#u-s081) · [U-F47](#u-f47) · [U-F49](#u-f49) · [U-F51](#u-f51). 인계 [H04](#h04).

<a id="s082"></a>

### S082 — 대명사 선택 빈 폼

- 원본: `sc_743e421bb2b14205b19b76062fdf27cd` · [PNG](<../medium/flows/Profile/Editing profile information/Adding pronouns/screens/02_sc_743e421bb2b14205b19b76062fdf27cd.png>) · [분석](<../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s082>).
- 조건: Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save. ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도. 상세 조건은 [S082 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s082>).
- FE: [editor/WrittenStoryActions.tsx](<../FE/src/features/editor/WrittenStoryActions.tsx>) · [editor/WrittenStoryCardReactions.tsx](<../FE/src/features/editor/WrittenStoryCardReactions.tsx>) · [profile/ProfileEditorSheet.tsx](<../FE/src/features/profile/ProfileEditorSheet.tsx>) · [profile/ProfileScreen.tsx](<../FE/src/features/profile/ProfileScreen.tsx>) · [profile/ProfileStories.tsx](<../FE/src/features/profile/ProfileStories.tsx>) · [profile/PronounsEditor.tsx](<../FE/src/features/profile/PronounsEditor.tsx>) · [profile/useProfilePhotoSelection.ts](<../FE/src/features/profile/useProfilePhotoSelection.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V32 내 프로필·편집](#v32).
- 판정: 로컬 화면/상태 연결 확인; V32의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 사진은 로컬 URI/수명 관리, 업로드·서버 프로필 영속 저장 없음. 원본 OS 앨범과 Android picker 모습은 다름.
- 전이: [T-F56-02](#t-f56-02). 계약: [C51](#c51) · [C52](#c52) · [C53](#c53). 미확인: [U-S082](#u-s082) · [U-F56](#u-f56). 인계 [H09](#h09).

<a id="s083"></a>

### S083 — 작가 About

- 원본: `sc_74429222aa3d45a89f1980b3aa0b6f9e` · [PNG](<../medium/flows/Home/Story detail/Author detail/screens/04_sc_74429222aa3d45a89f1980b3aa0b6f9e.png>) · [분석](<../medium/flows/Home/Story detail/Author detail/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s083>).
- 조건: Article 작성자 → Identity(writer Jordan) → Stories/Lists/About → Following·followers → Connections. useIdentityCatalog·RelationshipSource; Jordan10.2K/25, 기사말미24를 억지로 통일하지 않음; 동적 B 이름은 확정 프로필과 같은 ID로 해석. 상세 조건은 [S083 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s083>).
- FE: [community/ConnectionsScreen.tsx](<../FE/src/features/community/ConnectionsScreen.tsx>) · [community/FollowControl.tsx](<../FE/src/features/community/FollowControl.tsx>) · [community/PublicIdentityScreen.tsx](<../FE/src/features/community/PublicIdentityScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V14 작성자·관계](#v14).
- 판정: 로컬 화면/상태 연결 확인; V14의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 원본 미수록 followers 명단·집계/배지 정책은 자체 범위; 실제 이메일 구독·서버 관계 없음.
- 전이: [T-F17-04](#t-f17-04). 계약: [C21](#c21) · [C22](#c22). 미확인: [U-S083](#u-s083) · [U-F17](#u-f17). 인계 [H05](#h05).

<a id="s084"></a>

### S084 — 멤버십 선택 처리 중

- 원본: `sc_754aff4161c64e0685e7331a359eae32` · [PNG](<../medium/flows/Onboarding/Subscribing to Medium/screens/03_sc_754aff4161c64e0685e7331a359eae32.png>) · [분석](<../medium/flows/Onboarding/Subscribing to Medium/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s084>).
- 조건: Profile/Settings Upgrade 또는 onboarding 구독 → MembershipSheet → monthly/yearly → 모의 선택·성공. MembershipSource; SGD 보관 가격·독립 pending/success fixture; OS 구매 알림과 web Alert 차이. 상세 조건은 [S084 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s084>).
- FE: [membership/MembershipSheet.tsx](<../FE/src/features/membership/MembershipSheet.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V31 멤버십](#v31).
- 판정: 로컬 화면/상태 연결 확인; V31의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 구매 처리/성공은 mock이며 사용자 20번의 구매 실행 통과로 계산하지 않음. 지원/한계: 실제 스토어 구매/영수증/복원/갱신/해지 없음. 사용자 20번은 기간 선택/닫기이며 구매 Select 성공 증거가 아님.
- 전이: [T-F54-03](#t-f54-03). 계약: [C50](#c50) · [C65](#c65) · [C66](#c66) · [C67](#c67). 미확인: [U-S084](#u-s084) · [U-F54](#u-f54). 인계 [H08](#h08).

<a id="s085"></a>

### S085 — 리스트 삭제 후 라이브러리

- 원본: `sc_7749ef5c35474c229a2515a9c2a53878` · [PNG](<../medium/flows/Library/List detail/Deleting a list/screens/04_sc_7749ef5c35474c229a2515a9c2a53878.png>) · [분석](<../medium/flows/Library/List detail/Deleting a list/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s085>).
- 조건: Main/Library → Your lists / Saved lists / Highlighted; 새 목록·삭제 후 복귀. UserListStore·HighlightSource; empty/3/4 stories·About mindfulness를 각 상태별 구성. 상세 조건은 [S085 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s085>).
- FE: [bookmarks/LibraryScreen.tsx](<../FE/src/features/bookmarks/LibraryScreen.tsx>) · [highlights/HighlightList.tsx](<../FE/src/features/highlights/HighlightList.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V24 Library·목록 카드](#v24).
- 판정: 로컬 화면/상태 연결 확인; V24의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 목록/강조/다운로드는 메모리 상태; 원본 계정·집계·콘텐츠 snapshot과 현재 사용자 데이터는 다름.
- 전이: [T-F47-04](#t-f47-04). 계약: [C20](#c20) · [C29](#c29) · [C31](#c31) · [C37](#c37). 미확인: [U-S085](#u-s085) · [U-F47](#u-f47). 인계 [H04](#h04).

<a id="s086"></a>

### S086 — 다크 홈 피드

- 원본: `sc_77bbb7d671f14c6db68071c5921f22fa` · [PNG](<../medium/flows/Profile/Settings/Switching to dark mode/screens/03_sc_77bbb7d671f14c6db68071c5921f22fa.png>) · [분석](<../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>) · [R 16개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s086>).
- 조건: Main/Home → For you·Featured 선택; S026은 헤더가 접힌 하단 카드, S176은 Featured 빈 상태. mediumFeedFixtures / feedPreviewScenario(normal); Featured empty는 별도 feedSource 필요. 상세 조건은 [S086 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s086>).
- FE: [community/FollowingFeed.tsx](<../FE/src/features/community/FollowingFeed.tsx>) · [feed/HomeFeedScreen.tsx](<../FE/src/features/feed/HomeFeedScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V01 홈](#v01).
- 판정: 로컬 화면/상태 연결 확인; V01의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 추천·개인화·페이지 데이터는 fixture; 원본 시점별 기사·집계·스크롤과 현재 상태의 일치는 별도 미확인.
- 전이: [T-F62-03](#t-f62-03). 계약: [C04](#c04) · [C05](#c05). 미확인: [U-S086](#u-s086) · [U-F62](#u-f62). 인계 [H06](#h06).

<a id="s087"></a>

### S087 — Unsplash 사진 선택

- 원본: `sc_785431954ec4405eb0a3b22debce165a` · [PNG](<../medium/flows/Home/Publishing a story/screens/05_sc_785431954ec4405eb0a3b22debce165a.png>) · [분석](<../medium/flows/Home/Publishing a story/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s087>).
- 조건: Editor → 이미지 메뉴 → Camera/Library/Unsplash → 선택·삽입; 로딩은 지연 source로 제어. EditorImageSource; 로컬 예시 자산·삽입 지연·성공 snapshot; 실제 외부 검색 아님. 상세 조건은 [S087 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s087>).
- FE: [editor/ImagePickerSheet.tsx](<../FE/src/features/editor/ImagePickerSheet.tsx>) · [editor/StoryEditorScreen.tsx](<../FE/src/features/editor/StoryEditorScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V08 편집기 이미지](#v08).
- 판정: 로컬 화면/상태 연결 확인; V08의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 서버 업로드/Unsplash API 없음; 보관 이미지 7개+기존 예시 4개, 가려진 원본 2카드 미확보.
- 전이: [T-F08-05](#t-f08-05). 계약: [C41](#c41). 미확인: [U-S087](#u-s087) · [U-F08](#u-f08). 인계 [H02](#h02).

<a id="s088"></a>

### S088 — Hans 음성 선택

- 원본: `sc_78bee192bd2041a98f6721240f2352d5` · [PNG](<../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/05_sc_78bee192bd2041a98f6721240f2352d5.png>) · [분석](<../medium/flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s088>).
- 조건: 확장 플레이어 → Speed 또는 더보기 → Select a voice → 언어 스크롤·Hans → Done. ListeningOptionsSource; Emma/Hans, 1x200WPM·2.5x490WPM은 관찰값 fixture. 상세 조건은 [S088 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s088>).
- FE: [listening/ListeningSpeedPanel.tsx](<../FE/src/features/listening/ListeningSpeedPanel.tsx>) · [listening/ListeningVoicePanel.tsx](<../FE/src/features/listening/ListeningVoicePanel.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V19 오디오 속도·음성](#v19).
- 판정: 로컬 화면/상태 연결 확인; V19의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 속도/음성 선택은 무음 mock 메타데이터; 기사 이동·추천·음소거·신고는 별도 로컬/모의 기능. 실제 발화/번역·AirPlay·재생 큐 미지원, WPM 산식은 자체 비교값.
- 전이: [T-F28-05](#t-f28-05). 계약: [C59](#c59) · [C60](#c60) · [C61](#c61). 미확인: [U-S088](#u-s088) · [U-F28](#u-f28). 인계 [H08](#h08).

<a id="s089"></a>

### S089 — 다운로드 표시 변경

- 원본: `sc_7b31963fc5c64fc8b9268beab4009201` · [PNG](<../medium/flows/Library/List detail/Downloading a list/screens/03_sc_7b31963fc5c64fc8b9268beab4009201.png>) · [분석](<../medium/flows/Library/List detail/Downloading a list/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s089>).
- 조건: Library → ReadingList → Download → 진행·완료·취소·본문 열기. DownloadSource; 4개 일반 글 및 발행 혼합; 진행률·취소 source 제어; 영속 파일 없음. 상세 조건은 [S089 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s089>).
- FE: [downloads/DownloadControl.tsx](<../FE/src/features/downloads/DownloadControl.tsx>) · [downloads/createDownloadStore.ts](<../FE/src/features/downloads/createDownloadStore.ts>) · [downloads/createMockDownloadSource.ts](<../FE/src/features/downloads/createMockDownloadSource.ts>) · [downloads/DownloadProvider.tsx](<../FE/src/features/downloads/DownloadProvider.tsx>) · [editor/WrittenStoryScreen.tsx](<../FE/src/features/editor/WrittenStoryScreen.tsx>) · [downloads/publishedDownload.ts](<../FE/src/features/downloads/publishedDownload.ts>) · [downloads/publishedDownload.test.ts](<../FE/src/features/downloads/publishedDownload.test.ts>) · [navigation/PublishedDownloadsNavigation.test.tsx](<../FE/src/app/navigation/PublishedDownloadsNavigation.test.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V26 다운로드](#v26).
- 판정: 로컬 화면/상태 연결 확인; V26의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 파일 Downloads 저장·디스크 영속화·실제 네트워크 단절 보장 없음. 앱 재시작 보존도 미지원.
- 전이: [T-F48-03](#t-f48-03). 계약: [C36](#c36) · [C66](#c66). 미확인: [U-S089](#u-s089) · [U-F48](#u-f48). 인계 [H04](#h04).

<a id="s090"></a>

### S090 — 팔로잉 계정 목록

- 원본: `sc_7c89f4496e7f4cb0b5c23b776080b6bf` · [PNG](<../medium/flows/Home/Story detail/Author detail/Following list/screens/02_sc_7c89f4496e7f4cb0b5c23b776080b6bf.png>) · [분석](<../medium/flows/Home/Story detail/Author detail/Following list/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s090>).
- 조건: Article 작성자 → Identity(writer Jordan) → Stories/Lists/About → Following·followers → Connections. useIdentityCatalog·RelationshipSource; Jordan10.2K/25, 기사말미24를 억지로 통일하지 않음; 동적 B 이름은 확정 프로필과 같은 ID로 해석. 상세 조건은 [S090 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s090>).
- FE: [community/ConnectionsScreen.tsx](<../FE/src/features/community/ConnectionsScreen.tsx>) · [community/FollowControl.tsx](<../FE/src/features/community/FollowControl.tsx>) · [community/PublicIdentityScreen.tsx](<../FE/src/features/community/PublicIdentityScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V14 작성자·관계](#v14).
- 판정: 로컬 화면/상태 연결 확인; V14의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 원본 미수록 followers 명단·집계/배지 정책은 자체 범위; 실제 이메일 구독·서버 관계 없음.
- 전이: [T-F21-02](#t-f21-02). 계약: [C21](#c21) · [C22](#c22). 미확인: [U-S090](#u-s090) · [U-F21](#u-f21). 인계 [H05](#h05).

<a id="s091"></a>

### S091 — Self Improvement 토픽

- 원본: `sc_7de88da749774d0483716f2e861fb080` · [PNG](<../medium/flows/Explore/Topic detail/Browse curated list/screens/02_sc_7de88da749774d0483716f2e861fb080.png>) · [분석](<../medium/flows/Explore/Topic detail/Browse curated list/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s091>).
- 조건: Main/Explore → Life 또는 Self Improvement → Topic(topicId); 큐레이션까지 스크롤. topicSource + relationshipSource; topicId와 following을 독립 설정. 상세 조건은 [S091 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s091>).
- FE: [topics/TopicScreen.tsx](<../FE/src/features/topics/TopicScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V03 토픽·큐레이션 미리보기](#v03).
- 판정: 로컬 화면/상태 연결 확인; V03의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 토픽 집계·연관·추천은 보관 fixture/자체 정책, 실제 추천 서비스 미연결.
- 전이: [T-F04-02](#t-f04-02). 계약: [C06](#c06) · [C08](#c08). 미확인: [U-S091](#u-s091) · [U-F04](#u-f04). 인계 [H06](#h06).

<a id="s092"></a>

### S092 — 답글 내용 입력

- 원본: `sc_8202187474f444de8773b38fe92c4d82` · [PNG](<../medium/flows/Home/Story detail/Responses/Replying a response/screens/03_sc_8202187474f444de8773b38fe92c4d82.png>) · [분석](<../medium/flows/Home/Story detail/Responses/Replying a response/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s092>).
- 조건: Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond. ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태. 상세 조건은 [S092 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s092>).
- FE: [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V20 응답·답글](#v20).
- 판정: 로컬 화면/상태 연결 확인; V20의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: source 메모리 저장·자체 깊이/정렬/집계; 실제 타 사용자 조회·서버 소유권 검증·알림 없음.
- 전이: [T-F35-03](#t-f35-03). 계약: [C14](#c14) · [C15](#c15) · [C16](#c16) · [C17](#c17) · [C18](#c18) · [C20](#c20). 미확인: [U-S092](#u-s092) · [U-F35](#u-f35). 인계 [H05](#h05).

<a id="s093"></a>

### S093 — 작가 프로필의 다른 캡처 상태

- 원본: `sc_8208a84fba4c4046aa1d364055d14db7` · [PNG](<../medium/flows/Home/Story detail/Author detail/Blocking an author/screens/04_sc_8208a84fba4c4046aa1d364055d14db7.png>) · [분석](<../medium/flows/Home/Story detail/Author detail/Blocking an author/ANALYSIS.md>) · [R 9개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s093>).
- 조건: Identity 또는 Article 더보기 → Mute/Block/Report → 선택·확정·토스트. ModerationSource·RelationshipSource와 공통 사용자 카탈로그; S093은 별도 snapshot이며 차단 결과로 단정하지 않음; 신고/차단/음소거 별도 상태. 상세 조건은 [S093 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s093>).
- FE: [moderation/ModerationDialogs.tsx](<../FE/src/features/moderation/ModerationDialogs.tsx>) · [moderation/articleModeration.ts](<../FE/src/features/moderation/articleModeration.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V15 음소거·차단·신고](#v15).
- 판정: 로컬 화면/상태 연결 확인; V15의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 앱 메모리 정책만 적용; 원본 차단 캡처의 글 잔존과 구현 접근 제한 차이, 실제 신고 접수/제재 없음.
- 전이: [T-F18-04](#t-f18-04). 계약: [C12](#c12) · [C18](#c18) · [C23](#c23) · [C24](#c24) · [C61](#c61). 미확인: [U-S093](#u-s093) · [U-F18](#u-f18). 인계 [H05](#h05).

<a id="s094"></a>

### S094 — 대명사 2개 선택

- 원본: `sc_82178c6b5a56471cb64fecb5a4e4bc4e` · [PNG](<../medium/flows/Profile/Editing profile information/Adding pronouns/screens/05_sc_82178c6b5a56471cb64fecb5a4e4bc4e.png>) · [분석](<../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s094>).
- 조건: Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save. ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도. 상세 조건은 [S094 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s094>).
- FE: [editor/WrittenStoryActions.tsx](<../FE/src/features/editor/WrittenStoryActions.tsx>) · [editor/WrittenStoryCardReactions.tsx](<../FE/src/features/editor/WrittenStoryCardReactions.tsx>) · [profile/ProfileEditorSheet.tsx](<../FE/src/features/profile/ProfileEditorSheet.tsx>) · [profile/ProfileScreen.tsx](<../FE/src/features/profile/ProfileScreen.tsx>) · [profile/ProfileStories.tsx](<../FE/src/features/profile/ProfileStories.tsx>) · [profile/PronounsEditor.tsx](<../FE/src/features/profile/PronounsEditor.tsx>) · [profile/useProfilePhotoSelection.ts](<../FE/src/features/profile/useProfilePhotoSelection.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V32 내 프로필·편집](#v32).
- 판정: 로컬 화면/상태 연결 확인; V32의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 사진은 로컬 URI/수명 관리, 업로드·서버 프로필 영속 저장 없음. 원본 OS 앨범과 Android picker 모습은 다름.
- 전이: [T-F56-05](#t-f56-05). 계약: [C51](#c51) · [C52](#c52) · [C53](#c53). 미확인: [U-S094](#u-s094) · [U-F56](#u-f56). 인계 [H09](#h09).

<a id="s095"></a>

### S095 — Library 초기 목록

- 원본: `sc_84e0421de98041bbb014822fc05dd3fb` · [PNG](<../medium/flows/Library/screens/02_sc_84e0421de98041bbb014822fc05dd3fb.png>) · [분석](<../medium/flows/Library/ANALYSIS.md>) · [R 14개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s095>).
- 조건: Main/Library → Your lists / Saved lists / Highlighted; 새 목록·삭제 후 복귀. UserListStore·HighlightSource; empty/3/4 stories·About mindfulness를 각 상태별 구성. 상세 조건은 [S095 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s095>).
- FE: [bookmarks/LibraryScreen.tsx](<../FE/src/features/bookmarks/LibraryScreen.tsx>) · [highlights/HighlightList.tsx](<../FE/src/features/highlights/HighlightList.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V24 Library·목록 카드](#v24).
- 판정: 로컬 화면/상태 연결 확인; V24의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 목록/강조/다운로드는 메모리 상태; 원본 계정·집계·콘텐츠 snapshot과 현재 사용자 데이터는 다름.
- 전이: [T-F41-02](#t-f41-02). 계약: [C20](#c20) · [C29](#c29) · [C31](#c31) · [C37](#c37). 미확인: [U-S095](#u-s095) · [U-F41](#u-f41). 인계 [H04](#h04).

<a id="s096"></a>

### S096 — 과거 다이제스트 선택

- 원본: `sc_8866044a55164824903265c3b8b97337` · [PNG](<../medium/flows/Library/Filtering digest/screens/03_sc_8866044a55164824903265c3b8b97337.png>) · [분석](<../medium/flows/Library/Filtering digest/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s096>).
- 조건: Main/Library → Digest → 날짜 선택 → June12/June8 → 닫기. digestFixtures/replaceIssues; June12 love/jeremiah, June8 Goodbye Notion/xeladu·Alex; 다른 호는 자체 mock, 사진·응답 snapshot 차이 잔여. 상세 조건은 [S096 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s096>).
- FE: [bookmarks/LibraryScreen.tsx](<../FE/src/features/bookmarks/LibraryScreen.tsx>) · [community/IdentityLink.tsx](<../FE/src/features/community/IdentityLink.tsx>) · [digest/DigestPanel.tsx](<../FE/src/features/digest/DigestPanel.tsx>) · [notifications/NotificationSettingsScreen.tsx](<../FE/src/features/notifications/NotificationSettingsScreen.tsx>) · [reactions/ClapControl.tsx](<../FE/src/features/reactions/ClapControl.tsx>) · [responses/ResponseButton.tsx](<../FE/src/features/responses/ResponseButton.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V27 Digest](#v27).
- 판정: 로컬 화면/상태 연결 확인; V27의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: fixture 호/날짜·자체 필터 정책; 실제 배포/이메일 Digest 생성·전송 없음.
- 전이: [T-F43-03](#t-f43-03). 계약: [C37](#c37) · [C38](#c38). 미확인: [U-S096](#u-s096) · [U-F43](#u-f43). 인계 [H07](#h07).

<a id="s097"></a>

### S097 — 구절 인용 응답 작성 시작

- 원본: `sc_8accfd977771416a89329576c7ba48d8` · [PNG](<../medium/flows/Home/Story detail/Responding to a phrase/screens/02_sc_8accfd977771416a89329576c7ba48d8.png>) · [분석](<../medium/flows/Home/Story detail/Responding to a phrase/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s097>).
- 조건: Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond. ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태. 상세 조건은 [S097 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s097>).
- FE: [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V20 응답·답글](#v20).
- 판정: 로컬 화면/상태 연결 확인; V20의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: source 메모리 저장·자체 깊이/정렬/집계; 실제 타 사용자 조회·서버 소유권 검증·알림 없음.
- 전이: [T-F29-02](#t-f29-02). 계약: [C14](#c14) · [C15](#c15) · [C16](#c16) · [C17](#c17) · [C18](#c18) · [C20](#c20). 미확인: [U-S097](#u-s097) · [U-F29](#u-f29). 인계 [H05](#h05).

<a id="s098"></a>

### S098 — Medium 검색 결과

- 원본: `sc_8dc9eeb5f9d244ca9fa6fb7a973de82f` · [PNG](<../medium/flows/Explore/Searching Medium/screens/03_sc_8dc9eeb5f9d244ca9fa6fb7a973de82f.png>) · [분석](<../medium/flows/Explore/Searching Medium/ANALYSIS.md>) · [R 9개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s098>).
- 조건: Main/Explore → 검색 진입·Mindfulness 입력·Stories; Staff Picks/Who to follow 위치까지 세로·가로 이동. mediumFeedFixtures / SearchScreen·CatalogSearchResults; 칩·캐러셀 위치는 화면별 설정. 상세 조건은 [S098 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s098>).
- FE: [search/CatalogSearchResults.tsx](<../FE/src/features/search/CatalogSearchResults.tsx>) · [search/ExploreSections.tsx](<../FE/src/features/search/ExploreSections.tsx>) · [search/SearchScreen.tsx](<../FE/src/features/search/SearchScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V02 탐색·검색](#v02).
- 판정: 로컬 화면/상태 연결 확인; V02의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 검색 정렬·카테고리 계층은 자체 정책; 일부만 캡처된 Staff Pick은 안내로 처리하고 본문을 생성하지 않음.
- 전이: [T-F02-03](#t-f02-03). 계약: [C06](#c06) · [C07](#c07). 미확인: [U-S098](#u-s098) · [U-F02](#u-f02). 인계 [H06](#h06).

<a id="s099"></a>

### S099 — 추천 조정의 Suggestions

- 원본: `sc_90bc6a79e86d436e89d94d7dc82b624c` · [PNG](<../medium/flows/Home/Refine recommendations/screens/02_sc_90bc6a79e86d436e89d94d7dc82b624c.png>) · [분석](<../medium/flows/Home/Refine recommendations/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s099>).
- 조건: Home 더보기/Refine recommendations → Recommendations → Following/Reading history/Muted/Suggestions → All·Topics 등 필터. RelationshipSource·ModerationSource·TopicSource + useIdentityCatalog(DirectorySource/mockUsers/확정 공개 프로필); Writers1/Topics3는 UI 팔로우로 구성, 숫자와 목록·해제를 함께 확인. 상세 조건은 [S099 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s099>).
- FE: [recommendations/RefineRecommendationsScreen.tsx](<../FE/src/features/recommendations/RefineRecommendationsScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V11 추천 관리](#v11).
- 판정: 로컬 화면/상태 연결 확인; V11의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 추천 알고리즘·개인화 영속성 없음. 별도 원본 시점의 계정 상태를 한 세션 결과로 합치지 않음.
- 전이: [T-F12-02](#t-f12-02) · [T-F13-01](#t-f13-01). 계약: [C05](#c05) · [C12](#c12) · [C25](#c25) · [C26](#c26). 미확인: [U-S099](#u-s099) · [U-F12](#u-f12) · [U-F13](#u-f13). 인계 [H06](#h06).

<a id="s100"></a>

### S100 — 응답 시트와 중첩 답글

- 원본: `sc_915888473ac24e8987c996b8954f54c6` · [PNG](<../medium/flows/Home/Story detail/Responses/screens/02_sc_915888473ac24e8987c996b8954f54c6.png>) · [분석](<../medium/flows/Home/Story detail/Responses/ANALYSIS.md>) · [R 8개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_04.md#s100>).
- 조건: Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond. ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태. 상세 조건은 [S100 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s100>).
- FE: [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V20 응답·답글](#v20).
- 판정: 로컬 화면/상태 연결 확인; V20의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: source 메모리 저장·자체 깊이/정렬/집계; 실제 타 사용자 조회·서버 소유권 검증·알림 없음.
- 전이: [T-F30-02](#t-f30-02) · [T-F31-01](#t-f31-01) · [T-F34-01](#t-f34-01) · [T-F35-01](#t-f35-01) · [T-F36-01](#t-f36-01). 계약: [C14](#c14) · [C15](#c15) · [C16](#c16) · [C17](#c17) · [C18](#c18) · [C20](#c20). 미확인: [U-S100](#u-s100) · [U-F30](#u-f30) · [U-F31](#u-f31) · [U-F34](#u-f34) · [U-F35](#u-f35) · [U-F36](#u-f36). 인계 [H05](#h05).

<a id="s101"></a>

### S101 — 비공개 리스트 표시

- 원본: `sc_91b39d224f6b4c9ab7573c0c3df633eb` · [PNG](<../medium/flows/Library/List detail/Making a list private/screens/05_sc_91b39d224f6b4c9ab7573c0c3df633eb.png>) · [분석](<../medium/flows/Library/List detail/Making a list private/ANALYSIS.md>) · [R 12개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s101>).
- 조건: Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo. UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; source 확정 updatedAt;14/6/1초 독립 조건. 상세 조건은 [S101 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s101>).
- FE: [bookmarks/ListActions.tsx](<../FE/src/features/bookmarks/ListActions.tsx>) · [bookmarks/ListEditorSheet.tsx](<../FE/src/features/bookmarks/ListEditorSheet.tsx>) · [bookmarks/ListNoteSheet.tsx](<../FE/src/features/bookmarks/ListNoteSheet.tsx>) · [bookmarks/ListStoryCard.tsx](<../FE/src/features/bookmarks/ListStoryCard.tsx>) · [bookmarks/ReadingListScreen.tsx](<../FE/src/features/bookmarks/ReadingListScreen.tsx>) · [bookmarks/ReorderListEditor.tsx](<../FE/src/features/bookmarks/ReorderListEditor.tsx>) · [bookmarks/createUserListStore.ts](<../FE/src/features/bookmarks/createUserListStore.ts>) · [bookmarks/listTypes.ts](<../FE/src/features/bookmarks/listTypes.ts>) · [bookmarks/ListDetailMetadata.tsx](<../FE/src/features/bookmarks/ListDetailMetadata.tsx>) · [bookmarks/LibrarySheet.tsx](<../FE/src/features/bookmarks/LibrarySheet.tsx>) · [navigation/ReadingListRoute.tsx](<../FE/src/app/navigation/ReadingListRoute.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V25 내 목록·편집](#v25).
- 판정: 로컬 화면/상태 연결 확인; V25의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 자체 소유권/충돌/시간 정책; 기본 Reading list 삭제 제한. 실제 공유/다른 기기 정합성 미연결.
- 전이: [T-F49-05](#t-f49-05). 계약: [C28](#c28) · [C30](#c30) · [C31](#c31) · [C32](#c32) · [C33](#c33) · [C34](#c34) · [C35](#c35). 미확인: [U-S101](#u-s101) · [U-F49](#u-f49). 인계 [H04](#h04).

<a id="s102"></a>

### S102 — 같은 작가의 추가 기사

- 원본: `sc_92624aea551d44a7bbcf71d7d78aff4c` · [PNG](<../medium/flows/Home/Story detail/screens/07_sc_92624aea551d44a7bbcf71d7d78aff4c.png>) · [분석](<../medium/flows/Home/Story detail/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s102>).
- 조건: Home/Explore 기사 → Article(articleId); 본문·말미·응답 미리보기까지 스크롤; 박수 조작. medium-brain 기본 기사; F16의834와 박수 흐름832는 독립 response fixture. 상세 조건은 [S102 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s102>).
- FE: [article/ArticleDetailScreen.tsx](<../FE/src/features/article/ArticleDetailScreen.tsx>) · [article/ReferenceArticleView.tsx](<../FE/src/features/article/ReferenceArticleView.tsx>) · [reactions/ClapControl.tsx](<../FE/src/features/reactions/ClapControl.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V13 기사 읽기·반응](#v13).
- 판정: 로컬 화면/상태 연결 확인; V13의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 일부 기사는 전체 본문 미수록 안내만 제공. 누적 반응 모델은 유지하고 하트 모양은 사용자 확정; 서버 집계 없음.
- 전이: [T-F16-07](#t-f16-07). 계약: [C09](#c09) · [C10](#c10) · [C11](#c11) · [C12](#c12). 미확인: [U-S102](#u-s102) · [U-F16](#u-f16). 인계 [H03](#h03).

<a id="s103"></a>

### S103 — 팔로우 설정 메뉴

- 원본: `sc_937a1fdc91724d1ca5cc41b1d43d5132` · [PNG](<../medium/flows/Home/Story detail/Author detail/Following an author/screens/03_sc_937a1fdc91724d1ca5cc41b1d43d5132.png>) · [분석](<../medium/flows/Home/Story detail/Author detail/Following an author/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s103>).
- 조건: Article 작성자 → Identity(writer Jordan) → Stories/Lists/About → Following·followers → Connections. useIdentityCatalog·RelationshipSource; Jordan10.2K/25, 기사말미24를 억지로 통일하지 않음; 동적 B 이름은 확정 프로필과 같은 ID로 해석. 상세 조건은 [S103 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s103>).
- FE: [community/ConnectionsScreen.tsx](<../FE/src/features/community/ConnectionsScreen.tsx>) · [community/FollowControl.tsx](<../FE/src/features/community/FollowControl.tsx>) · [community/PublicIdentityScreen.tsx](<../FE/src/features/community/PublicIdentityScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V14 작성자·관계](#v14).
- 판정: 로컬 화면/상태 연결 확인; V14의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 원본 미수록 followers 명단·집계/배지 정책은 자체 범위; 실제 이메일 구독·서버 관계 없음.
- 전이: [T-F19-03](#t-f19-03) · [T-F20-01](#t-f20-01). 계약: [C21](#c21) · [C22](#c22). 미확인: [U-S103](#u-s103) · [U-F19](#u-f19) · [U-F20](#u-f20). 인계 [H05](#h05).

<a id="s104"></a>

### S104 — 팔로잉 빈 상태

- 원본: `sc_944b2eea3834408b8c04981e5eb2adf8` · [PNG](<../medium/flows/Home/Refine recommendations/screens/04_sc_944b2eea3834408b8c04981e5eb2adf8.png>) · [분석](<../medium/flows/Home/Refine recommendations/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s104>).
- 조건: Home 더보기/Refine recommendations → Recommendations → Following/Reading history/Muted/Suggestions → All·Topics 등 필터. RelationshipSource·ModerationSource·TopicSource + useIdentityCatalog(DirectorySource/mockUsers/확정 공개 프로필); Writers1/Topics3는 UI 팔로우로 구성, 숫자와 목록·해제를 함께 확인. 상세 조건은 [S104 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s104>).
- FE: [recommendations/RefineRecommendationsScreen.tsx](<../FE/src/features/recommendations/RefineRecommendationsScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V11 추천 관리](#v11).
- 판정: 로컬 화면/상태 연결 확인; V11의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 추천 알고리즘·개인화 영속성 없음. 별도 원본 시점의 계정 상태를 한 세션 결과로 합치지 않음.
- 전이: [T-F12-04](#t-f12-04). 계약: [C05](#c05) · [C12](#c12) · [C25](#c25) · [C26](#c26). 미확인: [U-S104](#u-s104) · [U-F12](#u-f12). 인계 [H06](#h06).

<a id="s105"></a>

### S105 — 리스트 비공개 확인

- 원본: `sc_95e504331794455fb4776bd322254c76` · [PNG](<../medium/flows/Library/List detail/Making a list private/screens/03_sc_95e504331794455fb4776bd322254c76.png>) · [분석](<../medium/flows/Library/List detail/Making a list private/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s105>).
- 조건: Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo. UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; source 확정 updatedAt;14/6/1초 독립 조건. 상세 조건은 [S105 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s105>).
- FE: [bookmarks/ListActions.tsx](<../FE/src/features/bookmarks/ListActions.tsx>) · [bookmarks/ListEditorSheet.tsx](<../FE/src/features/bookmarks/ListEditorSheet.tsx>) · [bookmarks/ListNoteSheet.tsx](<../FE/src/features/bookmarks/ListNoteSheet.tsx>) · [bookmarks/ListStoryCard.tsx](<../FE/src/features/bookmarks/ListStoryCard.tsx>) · [bookmarks/ReadingListScreen.tsx](<../FE/src/features/bookmarks/ReadingListScreen.tsx>) · [bookmarks/ReorderListEditor.tsx](<../FE/src/features/bookmarks/ReorderListEditor.tsx>) · [bookmarks/createUserListStore.ts](<../FE/src/features/bookmarks/createUserListStore.ts>) · [bookmarks/listTypes.ts](<../FE/src/features/bookmarks/listTypes.ts>) · [bookmarks/ListDetailMetadata.tsx](<../FE/src/features/bookmarks/ListDetailMetadata.tsx>) · [bookmarks/LibrarySheet.tsx](<../FE/src/features/bookmarks/LibrarySheet.tsx>) · [navigation/ReadingListRoute.tsx](<../FE/src/app/navigation/ReadingListRoute.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V25 내 목록·편집](#v25).
- 판정: 로컬 화면/상태 연결 확인; V25의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 자체 소유권/충돌/시간 정책; 기본 Reading list 삭제 제한. 실제 공유/다른 기기 정합성 미연결.
- 전이: [T-F49-03](#t-f49-03). 계약: [C28](#c28) · [C30](#c30) · [C31](#c31) · [C32](#c32) · [C33](#c33) · [C34](#c34) · [C35](#c35). 미확인: [U-S105](#u-s105) · [U-F49](#u-f49). 인계 [H04](#h04).

<a id="s106"></a>

### S106 — 빈 리스트 상세

- 원본: `sc_967232cfb5f845839053e0d371d78911` · [PNG](<../medium/flows/Library/List detail/screens/02_sc_967232cfb5f845839053e0d371d78911.png>) · [분석](<../medium/flows/Library/List detail/ANALYSIS.md>) · [R 10개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s106>).
- 조건: Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo. UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; source 확정 updatedAt;14/6/1초 독립 조건. 상세 조건은 [S106 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s106>).
- FE: [bookmarks/ListActions.tsx](<../FE/src/features/bookmarks/ListActions.tsx>) · [bookmarks/ListEditorSheet.tsx](<../FE/src/features/bookmarks/ListEditorSheet.tsx>) · [bookmarks/ListNoteSheet.tsx](<../FE/src/features/bookmarks/ListNoteSheet.tsx>) · [bookmarks/ListStoryCard.tsx](<../FE/src/features/bookmarks/ListStoryCard.tsx>) · [bookmarks/ReadingListScreen.tsx](<../FE/src/features/bookmarks/ReadingListScreen.tsx>) · [bookmarks/ReorderListEditor.tsx](<../FE/src/features/bookmarks/ReorderListEditor.tsx>) · [bookmarks/createUserListStore.ts](<../FE/src/features/bookmarks/createUserListStore.ts>) · [bookmarks/listTypes.ts](<../FE/src/features/bookmarks/listTypes.ts>) · [bookmarks/ListDetailMetadata.tsx](<../FE/src/features/bookmarks/ListDetailMetadata.tsx>) · [bookmarks/LibrarySheet.tsx](<../FE/src/features/bookmarks/LibrarySheet.tsx>) · [navigation/ReadingListRoute.tsx](<../FE/src/app/navigation/ReadingListRoute.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V25 내 목록·편집](#v25).
- 판정: 로컬 화면/상태 연결 확인; V25의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 자체 소유권/충돌/시간 정책; 기본 Reading list 삭제 제한. 실제 공유/다른 기기 정합성 미연결.
- 전이: [T-F46-02](#t-f46-02). 계약: [C28](#c28) · [C30](#c30) · [C31](#c31) · [C32](#c32) · [C33](#c33) · [C34](#c34) · [C35](#c35). 미확인: [U-S106](#u-s106) · [U-F46](#u-f46). 인계 [H04](#h04).

<a id="s107"></a>

### S107 — 토픽 내 큐레이션

- 원본: `sc_974be74d8855401e84cbad9f01dc8e93` · [PNG](<../medium/flows/Explore/Topic detail/Browse curated list/screens/03_sc_974be74d8855401e84cbad9f01dc8e93.png>) · [분석](<../medium/flows/Explore/Topic detail/Browse curated list/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s107>).
- 조건: Main/Explore → Life 또는 Self Improvement → Topic(topicId); 큐레이션까지 스크롤. topicSource + relationshipSource; topicId와 following을 독립 설정. 상세 조건은 [S107 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s107>).
- FE: [topics/TopicScreen.tsx](<../FE/src/features/topics/TopicScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V03 토픽·큐레이션 미리보기](#v03).
- 판정: 로컬 화면/상태 연결 확인; V03의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 토픽 집계·연관·추천은 보관 fixture/자체 정책, 실제 추천 서비스 미연결.
- 전이: [T-F04-03](#t-f04-03). 계약: [C06](#c06) · [C08](#c08). 미확인: [U-S107](#u-s107) · [U-F04](#u-f04). 인계 [H06](#h06).

<a id="s108"></a>

### S108 — 다크 하이라이트 목록

- 원본: `sc_97fb65c906bf4e309ec595d2067e4bce` · [PNG](<../medium/flows/Profile/Settings/Switching to dark mode/screens/06_sc_97fb65c906bf4e309ec595d2067e4bce.png>) · [분석](<../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s108>).
- 조건: Main/Library → Your lists / Saved lists / Highlighted; 새 목록·삭제 후 복귀. UserListStore·HighlightSource; empty/3/4 stories·About mindfulness를 각 상태별 구성. 상세 조건은 [S108 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s108>).
- FE: [bookmarks/LibraryScreen.tsx](<../FE/src/features/bookmarks/LibraryScreen.tsx>) · [highlights/HighlightList.tsx](<../FE/src/features/highlights/HighlightList.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V24 Library·목록 카드](#v24).
- 판정: 로컬 화면/상태 연결 확인; V24의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 목록/강조/다운로드는 메모리 상태; 원본 계정·집계·콘텐츠 snapshot과 현재 사용자 데이터는 다름.
- 전이: [T-F62-06](#t-f62-06). 계약: [C20](#c20) · [C29](#c29) · [C31](#c31) · [C37](#c37). 미확인: [U-S108](#u-s108) · [U-F62](#u-f62). 인계 [H04](#h04).

<a id="s109"></a>

### S109 — 비공개 변경 성공 안내

- 원본: `sc_996c48382ff0466099cf371adf783dae` · [PNG](<../medium/flows/Library/List detail/Making a list private/screens/04_sc_996c48382ff0466099cf371adf783dae.png>) · [분석](<../medium/flows/Library/List detail/Making a list private/ANALYSIS.md>) · [R 12개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s109>).
- 조건: Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo. UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; source 확정 updatedAt;14/6/1초 독립 조건. 상세 조건은 [S109 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s109>).
- FE: [bookmarks/ListActions.tsx](<../FE/src/features/bookmarks/ListActions.tsx>) · [bookmarks/ListEditorSheet.tsx](<../FE/src/features/bookmarks/ListEditorSheet.tsx>) · [bookmarks/ListNoteSheet.tsx](<../FE/src/features/bookmarks/ListNoteSheet.tsx>) · [bookmarks/ListStoryCard.tsx](<../FE/src/features/bookmarks/ListStoryCard.tsx>) · [bookmarks/ReadingListScreen.tsx](<../FE/src/features/bookmarks/ReadingListScreen.tsx>) · [bookmarks/ReorderListEditor.tsx](<../FE/src/features/bookmarks/ReorderListEditor.tsx>) · [bookmarks/createUserListStore.ts](<../FE/src/features/bookmarks/createUserListStore.ts>) · [bookmarks/listTypes.ts](<../FE/src/features/bookmarks/listTypes.ts>) · [bookmarks/ListDetailMetadata.tsx](<../FE/src/features/bookmarks/ListDetailMetadata.tsx>) · [bookmarks/LibrarySheet.tsx](<../FE/src/features/bookmarks/LibrarySheet.tsx>) · [navigation/ReadingListRoute.tsx](<../FE/src/app/navigation/ReadingListRoute.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V25 내 목록·편집](#v25).
- 판정: 로컬 화면/상태 연결 확인; V25의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 자체 소유권/충돌/시간 정책; 기본 Reading list 삭제 제한. 실제 공유/다른 기기 정합성 미연결.
- 전이: [T-F49-04](#t-f49-04). 계약: [C28](#c28) · [C30](#c30) · [C31](#c31) · [C32](#c32) · [C33](#c33) · [C34](#c34) · [C35](#c35). 미확인: [U-S109](#u-s109) · [U-F49](#u-f49). 인계 [H04](#h04).

<a id="s110"></a>

### S110 — 앱 다크 테마 설정

- 원본: `sc_9b1044709d764fe682a5e95603fd5c56` · [PNG](<../medium/flows/Profile/Settings/Switching to dark mode/screens/02_sc_9b1044709d764fe682a5e95603fd5c56.png>) · [분석](<../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>) · [R 15개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s110>).
- 조건: Profile/Settings → Account/Appearance/App icon/각 상세 → 복귀. DisplaySettingsSource·AppIconAdapter; 자체 K 아이콘, S075 원본과 비동등. 상세 조건은 [S110 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s110>).
- FE: [app-icon/AppIconScreen.tsx](<../FE/src/features/app-icon/AppIconScreen.tsx>) · [settings/SettingsExtrasScreen.tsx](<../FE/src/features/settings/SettingsExtrasScreen.tsx>) · [settings/SettingsScreen.tsx](<../FE/src/features/settings/SettingsScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V33 설정·앱 아이콘](#v33).
- 판정: 로컬 화면/상태 연결 확인; V33의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 계정/Facebook은 mock; 앱 아이콘 어댑터는 모듈 가용성에 따름. 현재 아이콘 모양 확정으로 수정 대상 아님.
- 전이: [T-F62-02](#t-f62-02). 계약: [C02](#c02) · [C66](#c66) · [C67](#c67) · [C68](#c68) · [C69](#c69). 미확인: [U-S110](#u-s110) · [U-F62](#u-f62). 인계 [H09](#h09).

<a id="s111"></a>

### S111 — 응답 정렬 선택

- 원본: `sc_9b94403d105c4eda8933ae7bbe2d6a00` · [PNG](<../medium/flows/Home/Story detail/Responses/Sorting responses/screens/02_sc_9b94403d105c4eda8933ae7bbe2d6a00.png>) · [분석](<../medium/flows/Home/Story detail/Responses/Sorting responses/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s111>).
- 조건: Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond. ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태. 상세 조건은 [S111 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s111>).
- FE: [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V20 응답·답글](#v20).
- 판정: 로컬 화면/상태 연결 확인; V20의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: source 메모리 저장·자체 깊이/정렬/집계; 실제 타 사용자 조회·서버 소유권 검증·알림 없음.
- 전이: [T-F36-02](#t-f36-02). 계약: [C14](#c14) · [C15](#c15) · [C16](#c16) · [C17](#c17) · [C18](#c18) · [C20](#c20). 미확인: [U-S111](#u-s111) · [U-F36](#u-f36). 인계 [H05](#h05).

<a id="s112"></a>

### S112 — 응답 스크롤과 추가 답글

- 원본: `sc_9c9af2f5f8ad43c193c0c30ef0974156` · [PNG](<../medium/flows/Home/Story detail/Responses/screens/03_sc_9c9af2f5f8ad43c193c0c30ef0974156.png>) · [분석](<../medium/flows/Home/Story detail/Responses/ANALYSIS.md>) · [R 7개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s112>).
- 조건: Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond. ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태. 상세 조건은 [S112 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s112>).
- FE: [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V20 응답·답글](#v20).
- 판정: 로컬 화면/상태 연결 확인; V20의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: source 메모리 저장·자체 깊이/정렬/집계; 실제 타 사용자 조회·서버 소유권 검증·알림 없음.
- 전이: [T-F30-03](#t-f30-03). 계약: [C14](#c14) · [C15](#c15) · [C16](#c16) · [C17](#c17) · [C18](#c18) · [C20](#c20). 미확인: [U-S112](#u-s112) · [U-F30](#u-f30). 인계 [H05](#h05).

<a id="s113"></a>

### S113 — 기기 사진 선택기

- 원본: `sc_9fd133df622e4ddd859bbbeb845ba4da` · [PNG](<../medium/flows/Profile/Editing profile information/screens/04_sc_9fd133df622e4ddd859bbbeb845ba4da.png>) · [분석](<../medium/flows/Profile/Editing profile information/ANALYSIS.md>) · [R 7개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s113>).
- 조건: Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save. ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도. 상세 조건은 [S113 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s113>).
- FE: [editor/WrittenStoryActions.tsx](<../FE/src/features/editor/WrittenStoryActions.tsx>) · [editor/WrittenStoryCardReactions.tsx](<../FE/src/features/editor/WrittenStoryCardReactions.tsx>) · [profile/ProfileEditorSheet.tsx](<../FE/src/features/profile/ProfileEditorSheet.tsx>) · [profile/ProfileScreen.tsx](<../FE/src/features/profile/ProfileScreen.tsx>) · [profile/ProfileStories.tsx](<../FE/src/features/profile/ProfileStories.tsx>) · [profile/PronounsEditor.tsx](<../FE/src/features/profile/PronounsEditor.tsx>) · [profile/useProfilePhotoSelection.ts](<../FE/src/features/profile/useProfilePhotoSelection.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V32 내 프로필·편집](#v32).
- 판정: 기기 사진 선택 어댑터의 호출/반환 처리는 코드에서 확인했다. Collections·하단 옵션은 OS 제공 UI이며 원본 iOS 컨트롤의 현재 Android 대응/개별 실행 근거는 미확인이다. 이를 FE 자체 컨트롤 구현 완료로 계산하지 않는다. 현재 Android 디자인/조작 수용은 유지하며 사진 업로드·서버 프로필 영속 저장은 미연결이다.
- 전이: [T-F57-04](#t-f57-04). 계약: [C51](#c51) · [C52](#c52) · [C53](#c53). 미확인: [U-S113](#u-s113) · [U-F57](#u-f57). 인계 [H09](#h09).

<a id="s114"></a>

### S114 — 리스트 삭제 확인 시트

- 원본: `sc_a1562b1931fc4650a544861094934588` · [PNG](<../medium/flows/Library/List detail/Deleting a list/screens/03_sc_a1562b1931fc4650a544861094934588.png>) · [분석](<../medium/flows/Library/List detail/Deleting a list/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s114>).
- 조건: Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo. UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; source 확정 updatedAt;14/6/1초 독립 조건. 상세 조건은 [S114 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s114>).
- FE: [bookmarks/ListActions.tsx](<../FE/src/features/bookmarks/ListActions.tsx>) · [bookmarks/ListEditorSheet.tsx](<../FE/src/features/bookmarks/ListEditorSheet.tsx>) · [bookmarks/ListNoteSheet.tsx](<../FE/src/features/bookmarks/ListNoteSheet.tsx>) · [bookmarks/ListStoryCard.tsx](<../FE/src/features/bookmarks/ListStoryCard.tsx>) · [bookmarks/ReadingListScreen.tsx](<../FE/src/features/bookmarks/ReadingListScreen.tsx>) · [bookmarks/ReorderListEditor.tsx](<../FE/src/features/bookmarks/ReorderListEditor.tsx>) · [bookmarks/createUserListStore.ts](<../FE/src/features/bookmarks/createUserListStore.ts>) · [bookmarks/listTypes.ts](<../FE/src/features/bookmarks/listTypes.ts>) · [bookmarks/ListDetailMetadata.tsx](<../FE/src/features/bookmarks/ListDetailMetadata.tsx>) · [bookmarks/LibrarySheet.tsx](<../FE/src/features/bookmarks/LibrarySheet.tsx>) · [navigation/ReadingListRoute.tsx](<../FE/src/app/navigation/ReadingListRoute.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V25 내 목록·편집](#v25).
- 판정: 로컬 화면/상태 연결 확인; V25의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 자체 소유권/충돌/시간 정책; 기본 Reading list 삭제 제한. 실제 공유/다른 기기 정합성 미연결.
- 전이: [T-F47-03](#t-f47-03). 계약: [C28](#c28) · [C30](#c30) · [C31](#c31) · [C32](#c32) · [C33](#c33) · [C34](#c34) · [C35](#c35). 미확인: [U-S114](#u-s114) · [U-F47](#u-f47). 인계 [H04](#h04).

<a id="s115"></a>

### S115 — 3개 토픽 선택

- 원본: `sc_a4216c4ff1f64bb59bc982a8d0067b6e` · [PNG](<../medium/flows/Home/Publishing a story/Adding topics/screens/05_sc_a4216c4ff1f64bb59bc982a8d0067b6e.png>) · [분석](<../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s115>).
- 조건: Home 작성 → Editor → Next/PublishPreview → Topics → 검색·선택·Save → preview. DraftSource·PublishTopics; The Silence between Notes, Music/Culture/Art, 별도 Publication 없음. 상세 조건은 [S115 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s115>).
- FE: [editor/PublishTopics.tsx](<../FE/src/features/editor/PublishTopics.tsx>) · [editor/StoryEditorScreen.tsx](<../FE/src/features/editor/StoryEditorScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V06 발행·토픽](#v06).
- 판정: 로컬 화면/상태 연결 확인; V06의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 실제 Publication 심사/제출·공개 URL·서버 발행 없음; 유효성·멱등성은 현재 mock 계약.
- 전이: [T-F07-05](#t-f07-05). 계약: [C44](#c44) · [C45](#c45). 미확인: [U-S115](#u-s115) · [U-F07](#u-f07). 인계 [H02](#h02).

<a id="s116"></a>

### S116 — 선택 날짜 다이제스트

- 원본: `sc_a42fffc3afb34954bc5e4afcc2e08e04` · [PNG](<../medium/flows/Library/Filtering digest/screens/04_sc_a42fffc3afb34954bc5e4afcc2e08e04.png>) · [분석](<../medium/flows/Library/Filtering digest/ANALYSIS.md>) · [R 13개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s116>).
- 조건: Main/Library → Digest → 날짜 선택 → June12/June8 → 닫기. digestFixtures/replaceIssues; June12 love/jeremiah, June8 Goodbye Notion/xeladu·Alex; 다른 호는 자체 mock, 사진·응답 snapshot 차이 잔여. 상세 조건은 [S116 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s116>).
- FE: [bookmarks/LibraryScreen.tsx](<../FE/src/features/bookmarks/LibraryScreen.tsx>) · [community/IdentityLink.tsx](<../FE/src/features/community/IdentityLink.tsx>) · [digest/DigestPanel.tsx](<../FE/src/features/digest/DigestPanel.tsx>) · [notifications/NotificationSettingsScreen.tsx](<../FE/src/features/notifications/NotificationSettingsScreen.tsx>) · [reactions/ClapControl.tsx](<../FE/src/features/reactions/ClapControl.tsx>) · [responses/ResponseButton.tsx](<../FE/src/features/responses/ResponseButton.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V27 Digest](#v27).
- 판정: 로컬 화면/상태 연결 확인; V27의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: fixture 호/날짜·자체 필터 정책; 실제 배포/이메일 Digest 생성·전송 없음.
- 전이: [T-F43-04](#t-f43-04). 계약: [C37](#c37) · [C38](#c38). 미확인: [U-S116](#u-s116) · [U-F43](#u-f43). 인계 [H07](#h07).

<a id="s117"></a>

### S117 — 이메일 가입 기본 폼

- 원본: `sc_a4438be77c814444b7f0c005ee44e8b6` · [PNG](<../medium/flows/Onboarding/screens/03_sc_a4438be77c814444b7f0c005ee44e8b6.png>) · [분석](<../medium/flows/Onboarding/ANALYSIS.md>) · [R 9개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s117>).
- 조건: Main/Profile 또는 Library guest → AuthDialogs → 이메일 signup/login/code; Profile/Settings → Sign out. mockUsers + emailAuthSource; 개인정보·원본 인증코드 복사 없이 합성 테스트값 사용. 상세 조건은 [S117 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s117>).
- FE: [auth/AuthDialogs.tsx](<../FE/src/features/auth/AuthDialogs.tsx>) · [auth/EmailLogin.tsx](<../FE/src/features/auth/EmailLogin.tsx>) · [auth/createEmailAttempt.ts](<../FE/src/features/auth/createEmailAttempt.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V29 인증·로그아웃](#v29).
- 판정: 로컬 화면/상태 연결 확인; V29의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 실제 OAuth·메일 발송/소유권 확인·Supabase 세션·프로세스 재시작 복원 없음.
- 전이: [T-F53-03](#t-f53-03). 계약: [C46](#c46) · [C47](#c47) · [C48](#c48) · [C67](#c67). 미확인: [U-S117](#u-s117) · [U-F53](#u-f53). 인계 [H01](#h01).

<a id="s118"></a>

### S118 — 토픽 추가 초기 상태

- 원본: `sc_a51d0e5d058b47809e1c299e1c28ff0e` · [PNG](<../medium/flows/Home/Publishing a story/Adding topics/screens/02_sc_a51d0e5d058b47809e1c299e1c28ff0e.png>) · [분석](<../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s118>).
- 조건: Home 작성 → Editor → Next/PublishPreview → Topics → 검색·선택·Save → preview. DraftSource·PublishTopics; The Silence between Notes, Music/Culture/Art, 별도 Publication 없음. 상세 조건은 [S118 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s118>).
- FE: [editor/PublishTopics.tsx](<../FE/src/features/editor/PublishTopics.tsx>) · [editor/StoryEditorScreen.tsx](<../FE/src/features/editor/StoryEditorScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V06 발행·토픽](#v06).
- 판정: 로컬 화면/상태 연결 확인; V06의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 실제 Publication 심사/제출·공개 URL·서버 발행 없음; 유효성·멱등성은 현재 mock 계약.
- 전이: [T-F07-02](#t-f07-02). 계약: [C44](#c44) · [C45](#c45). 미확인: [U-S118](#u-s118) · [U-F07](#u-f07). 인계 [H02](#h02).

<a id="s119"></a>

### S119 — 읽기 테마 선택

- 원본: `sc_a5d80c9e0226452cbb67e018702c5f1b` · [PNG](<../medium/flows/Home/Story detail/Changing display/screens/05_sc_a5d80c9e0226452cbb67e018702c5f1b.png>) · [분석](<../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s119>).
- 조건: Article 더보기 → Display settings → 100/120%, font, appearance, highlights. DisplaySettingsSource; S063 기본관찰값, S125=120%, S198=Dark120%, S001=others off. 상세 조건은 [S119 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s119>).
- FE: [settings/ArticleDisplayPopover.tsx](<../FE/src/features/settings/ArticleDisplayPopover.tsx>) · [settings/useReaderTypography.ts](<../FE/src/features/settings/useReaderTypography.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V16 읽기 설정](#v16).
- 판정: 로컬 화면/상태 연결 확인; V16의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 선택 옵션/80~200 경계는 자체 정책, 원본 실제 서체 파일 0개. 기사 확대와 OS 확대 구분.
- 전이: [T-F24-05](#t-f24-05). 계약: [C02](#c02) · [C12](#c12) · [C13](#c13). 미확인: [U-S119](#u-s119) · [U-F24](#u-f24). 인계 [H03](#h03).

<a id="s120"></a>

### S120 — 대명사 1개 선택

- 원본: `sc_a6051a9dd4514d3694dde85cd95c6b6d` · [PNG](<../medium/flows/Profile/Editing profile information/Adding pronouns/screens/04_sc_a6051a9dd4514d3694dde85cd95c6b6d.png>) · [분석](<../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s120>).
- 조건: Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save. ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도. 상세 조건은 [S120 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s120>).
- FE: [editor/WrittenStoryActions.tsx](<../FE/src/features/editor/WrittenStoryActions.tsx>) · [editor/WrittenStoryCardReactions.tsx](<../FE/src/features/editor/WrittenStoryCardReactions.tsx>) · [profile/ProfileEditorSheet.tsx](<../FE/src/features/profile/ProfileEditorSheet.tsx>) · [profile/ProfileScreen.tsx](<../FE/src/features/profile/ProfileScreen.tsx>) · [profile/ProfileStories.tsx](<../FE/src/features/profile/ProfileStories.tsx>) · [profile/PronounsEditor.tsx](<../FE/src/features/profile/PronounsEditor.tsx>) · [profile/useProfilePhotoSelection.ts](<../FE/src/features/profile/useProfilePhotoSelection.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V32 내 프로필·편집](#v32).
- 판정: 로컬 화면/상태 연결 확인; V32의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 사진은 로컬 URI/수명 관리, 업로드·서버 프로필 영속 저장 없음. 원본 OS 앨범과 Android picker 모습은 다름.
- 전이: [T-F56-04](#t-f56-04). 계약: [C51](#c51) · [C52](#c52) · [C53](#c53). 미확인: [U-S120](#u-s120) · [U-F56](#u-f56). 인계 [H09](#h09).

<a id="s121"></a>

### S121 — 리스트에서 기사 제거

- 원본: `sc_a79a8c62cfd64776ae74f84e0d98b5c3` · [PNG](<../medium/flows/Library/List detail/Removing a story/screens/02_sc_a79a8c62cfd64776ae74f84e0d98b5c3.png>) · [분석](<../medium/flows/Library/List detail/Removing a story/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s121>).
- 조건: Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo. UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; source 확정 updatedAt;14/6/1초 독립 조건. 상세 조건은 [S121 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s121>).
- FE: [bookmarks/ListActions.tsx](<../FE/src/features/bookmarks/ListActions.tsx>) · [bookmarks/ListEditorSheet.tsx](<../FE/src/features/bookmarks/ListEditorSheet.tsx>) · [bookmarks/ListNoteSheet.tsx](<../FE/src/features/bookmarks/ListNoteSheet.tsx>) · [bookmarks/ListStoryCard.tsx](<../FE/src/features/bookmarks/ListStoryCard.tsx>) · [bookmarks/ReadingListScreen.tsx](<../FE/src/features/bookmarks/ReadingListScreen.tsx>) · [bookmarks/ReorderListEditor.tsx](<../FE/src/features/bookmarks/ReorderListEditor.tsx>) · [bookmarks/createUserListStore.ts](<../FE/src/features/bookmarks/createUserListStore.ts>) · [bookmarks/listTypes.ts](<../FE/src/features/bookmarks/listTypes.ts>) · [bookmarks/ListDetailMetadata.tsx](<../FE/src/features/bookmarks/ListDetailMetadata.tsx>) · [bookmarks/LibrarySheet.tsx](<../FE/src/features/bookmarks/LibrarySheet.tsx>) · [navigation/ReadingListRoute.tsx](<../FE/src/app/navigation/ReadingListRoute.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V25 내 목록·편집](#v25).
- 판정: 로컬 화면/상태 연결 확인; V25의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 자체 소유권/충돌/시간 정책; 기본 Reading list 삭제 제한. 실제 공유/다른 기기 정합성 미연결.
- 전이: [T-F50-02](#t-f50-02). 계약: [C28](#c28) · [C30](#c30) · [C31](#c31) · [C32](#c32) · [C33](#c33) · [C34](#c34) · [C35](#c35). 미확인: [U-S121](#u-s121) · [U-F50](#u-f50). 인계 [H04](#h04).

<a id="s122"></a>

### S122 — 본문 구절 선택

- 원본: `sc_a8112b7354bb44908f9359e95ba3c288` · [PNG](<../medium/flows/Home/Story detail/Highlighting a phrase/screens/02_sc_a8112b7354bb44908f9359e95ba3c288.png>) · [분석](<../medium/flows/Home/Story detail/Highlighting a phrase/ANALYSIS.md>) · [R 8개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s122>).
- 조건: Article 본문 구절 선택 → Highlight/Respond/Share → 강조 표시. HighlightSource + 본문 version/UTF16 범위; native는 별도 Select a passage로 D09 차이. 상세 조건은 [S122 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s122>).
- FE: [highlights/NativePassagePicker.tsx](<../FE/src/features/highlights/NativePassagePicker.tsx>) · [highlights/PassageReader.tsx](<../FE/src/features/highlights/PassageReader.tsx>) · [highlights/NativePassageText.tsx](<../FE/src/features/highlights/NativePassageText.tsx>) · [highlights/PassageMenu.tsx](<../FE/src/features/highlights/PassageMenu.tsx>) · [highlights/HighlightedText.tsx](<../FE/src/features/highlights/HighlightedText.tsx>) · [highlights/passageMenuPosition.ts](<../FE/src/features/highlights/passageMenuPosition.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V17 본문 선택·하이라이트](#v17).
- 판정: 로컬 화면/상태 연결 확인; V17의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 다중 문단은 별도 picker; 읽기 사진/구분선 경계는 미지원. Android 기본 선택 메뉴 제거 보류; 정확 앵커 동일성 미확인.
- 전이: [T-F25-02](#t-f25-02) · [T-F29-01](#t-f29-01). 계약: [C19](#c19) · [C20](#c20). 미확인: [U-S122](#u-s122) · [U-F25](#u-f25) · [U-F29](#u-f29). 인계 [H03](#h03).

<a id="s123"></a>

### S123 — 프로필 편집 폼

- 원본: `sc_a829121c47a444cd8a8fd0d9889edaed` · [PNG](<../medium/flows/Profile/Editing profile information/screens/02_sc_a829121c47a444cd8a8fd0d9889edaed.png>) · [분석](<../medium/flows/Profile/Editing profile information/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s123>).
- 조건: Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save. ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도. 상세 조건은 [S123 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s123>).
- FE: [editor/WrittenStoryActions.tsx](<../FE/src/features/editor/WrittenStoryActions.tsx>) · [editor/WrittenStoryCardReactions.tsx](<../FE/src/features/editor/WrittenStoryCardReactions.tsx>) · [profile/ProfileEditorSheet.tsx](<../FE/src/features/profile/ProfileEditorSheet.tsx>) · [profile/ProfileScreen.tsx](<../FE/src/features/profile/ProfileScreen.tsx>) · [profile/ProfileStories.tsx](<../FE/src/features/profile/ProfileStories.tsx>) · [profile/PronounsEditor.tsx](<../FE/src/features/profile/PronounsEditor.tsx>) · [profile/useProfilePhotoSelection.ts](<../FE/src/features/profile/useProfilePhotoSelection.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V32 내 프로필·편집](#v32).
- 판정: 로컬 화면/상태 연결 확인; V32의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 사진은 로컬 URI/수명 관리, 업로드·서버 프로필 영속 저장 없음. 원본 OS 앨범과 Android picker 모습은 다름.
- 전이: [T-F57-02](#t-f57-02). 계약: [C51](#c51) · [C52](#c52) · [C53](#c53). 미확인: [U-S123](#u-s123) · [U-F57](#u-f57). 인계 [H09](#h09).

<a id="s124"></a>

### S124 — 응답 삭제 성공 표시

- 원본: `sc_aa1b32e30ce5436b8ca8fcc4c7d74d1b` · [PNG](<../medium/flows/Home/Story detail/Responses/Commenting a story/Deleting a response/screens/03_sc_aa1b32e30ce5436b8ca8fcc4c7d74d1b.png>) · [분석](<../medium/flows/Home/Story detail/Responses/Commenting a story/Deleting a response/ANALYSIS.md>) · [R 11개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s124>).
- 조건: Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond. ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태. 상세 조건은 [S124 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s124>).
- FE: [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V20 응답·답글](#v20).
- 판정: 로컬 화면/상태 연결 확인; V20의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: source 메모리 저장·자체 깊이/정렬/집계; 실제 타 사용자 조회·서버 소유권 검증·알림 없음.
- 전이: [T-F32-03](#t-f32-03). 계약: [C14](#c14) · [C15](#c15) · [C16](#c16) · [C17](#c17) · [C18](#c18) · [C20](#c20). 미확인: [U-S124](#u-s124) · [U-F32](#u-f32). 인계 [H05](#h05).

<a id="s125"></a>

### S125 — 글자 크기 확대

- 원본: `sc_ad140eae0b7e409aa2204c1f36bfa385` · [PNG](<../medium/flows/Home/Story detail/Changing display/screens/04_sc_ad140eae0b7e409aa2204c1f36bfa385.png>) · [분석](<../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>) · [R 8개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_05.md#s125>).
- 조건: Article 더보기 → Display settings → 100/120%, font, appearance, highlights. DisplaySettingsSource; S063 기본관찰값, S125=120%, S198=Dark120%, S001=others off. 상세 조건은 [S125 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s125>).
- FE: [settings/ArticleDisplayPopover.tsx](<../FE/src/features/settings/ArticleDisplayPopover.tsx>) · [settings/useReaderTypography.ts](<../FE/src/features/settings/useReaderTypography.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V16 읽기 설정](#v16).
- 판정: 로컬 화면/상태 연결 확인; V16의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 선택 옵션/80~200 경계는 자체 정책, 원본 실제 서체 파일 0개. 기사 확대와 OS 확대 구분.
- 전이: [T-F24-04](#t-f24-04). 계약: [C02](#c02) · [C12](#c12) · [C13](#c13). 미확인: [U-S125](#u-s125) · [U-F24](#u-f24). 인계 [H03](#h03).

<a id="s126"></a>

### S126 — 본문 이미지 로딩

- 원본: `sc_ae30c2a2ca504522b03f98f11d59c429` · [PNG](<../medium/flows/Home/Publishing a story/screens/06_sc_ae30c2a2ca504522b03f98f11d59c429.png>) · [분석](<../medium/flows/Home/Publishing a story/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s126>).
- 조건: Editor → 이미지 메뉴 → Camera/Library/Unsplash → 선택·삽입; 로딩은 지연 source로 제어. EditorImageSource; 로컬 예시 자산·삽입 지연·성공 snapshot; 실제 외부 검색 아님. 상세 조건은 [S126 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s126>).
- FE: [editor/ImagePickerSheet.tsx](<../FE/src/features/editor/ImagePickerSheet.tsx>) · [editor/StoryEditorScreen.tsx](<../FE/src/features/editor/StoryEditorScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V08 편집기 이미지](#v08).
- 판정: 로컬 화면/상태 연결 확인; V08의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 서버 업로드/Unsplash API 없음; 보관 이미지 7개+기존 예시 4개, 가려진 원본 2카드 미확보.
- 전이: [T-F08-06](#t-f08-06). 계약: [C41](#c41). 미확인: [U-S126](#u-s126) · [U-F08](#u-f08). 인계 [H02](#h02).

<a id="s127"></a>

### S127 — 신고 사유 선택 완료

- 원본: `sc_af0ecdded03643ca8cea85ec5341d906` · [PNG](<../medium/flows/Home/Story detail/Author detail/Reporting an author/screens/04_sc_af0ecdded03643ca8cea85ec5341d906.png>) · [분석](<../medium/flows/Home/Story detail/Author detail/Reporting an author/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s127>).
- 조건: Identity 또는 Article 더보기 → Mute/Block/Report → 선택·확정·토스트. ModerationSource·RelationshipSource와 공통 사용자 카탈로그; S093은 별도 snapshot이며 차단 결과로 단정하지 않음; 신고/차단/음소거 별도 상태. 상세 조건은 [S127 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s127>).
- FE: [moderation/ModerationDialogs.tsx](<../FE/src/features/moderation/ModerationDialogs.tsx>) · [moderation/articleModeration.ts](<../FE/src/features/moderation/articleModeration.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V15 음소거·차단·신고](#v15).
- 판정: 로컬 화면/상태 연결 확인; V15의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 앱 메모리 정책만 적용; 원본 차단 캡처의 글 잔존과 구현 접근 제한 차이, 실제 신고 접수/제재 없음.
- 전이: [T-F23-04](#t-f23-04). 계약: [C12](#c12) · [C18](#c18) · [C23](#c23) · [C24](#c24) · [C61](#c61). 미확인: [U-S127](#u-s127) · [U-F23](#u-f23). 인계 [H05](#h05).

<a id="s128"></a>

### S128 — 오디오 로딩

- 원본: `sc_b43c7474098746baa684870217c28927` · [PNG](<../medium/flows/Home/Story detail/Listening to a story/screens/02_sc_b43c7474098746baa684870217c28927.png>) · [분석](<../medium/flows/Home/Story detail/Listening to a story/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s128>).
- 조건: Article Listen → 미니 플레이어 → 확장 → 재생·정지·seek·닫기. ListeningSource·mock 시계; 00:05/00:10/00:20/00:40 각 snapshot과 duration 독립. 상세 조건은 [S128 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s128>).
- FE: [listening/ListeningPlayer.tsx](<../FE/src/features/listening/ListeningPlayer.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V18 오디오 플레이어](#v18).
- 판정: 로컬 화면/상태 연결 확인; V18의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: silent-mock; 실제 TTS/음원·백그라운드/오프라인 재생 없음, 이전/다음 큐 버튼 비활성.
- 전이: [T-F26-02](#t-f26-02). 계약: [C58](#c58) · [C59](#c59) · [C61](#c61) · [C66](#c66). 미확인: [U-S128](#u-s128) · [U-F26](#u-f26). 인계 [H08](#h08).

<a id="s129"></a>

### S129 — 월간 멤버십 선택

- 원본: `sc_b4e85416681544c9b996826eefa22432` · [PNG](<../medium/flows/Onboarding/screens/12_sc_b4e85416681544c9b996826eefa22432.png>) · [분석](<../medium/flows/Onboarding/ANALYSIS.md>) · [R 7개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s129>).
- 조건: Profile/Settings Upgrade 또는 onboarding 구독 → MembershipSheet → monthly/yearly → 모의 선택·성공. MembershipSource; SGD 보관 가격·독립 pending/success fixture; OS 구매 알림과 web Alert 차이. 상세 조건은 [S129 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s129>).
- FE: [membership/MembershipSheet.tsx](<../FE/src/features/membership/MembershipSheet.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V31 멤버십](#v31).
- 판정: 로컬 화면/상태 연결 확인; V31의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 실제 스토어 구매/영수증/복원/갱신/해지 없음. 사용자 20번은 기간 선택/닫기이며 구매 Select 성공 증거가 아님.
- 전이: [T-F53-12](#t-f53-12) · [T-F54-01](#t-f54-01). 계약: [C50](#c50) · [C65](#c65) · [C66](#c66) · [C67](#c67). 미확인: [U-S129](#u-s129) · [U-F53](#u-f53) · [U-F54](#u-f54). 인계 [H08](#h08).

<a id="s130"></a>

### S130 — 팔로우 해제 안내

- 원본: `sc_b606d8b25cf248c28200cbfd24da865f` · [PNG](<../medium/flows/Home/Story detail/Author detail/Following an author/Unfollowing an author/screens/02_sc_b606d8b25cf248c28200cbfd24da865f.png>) · [분석](<../medium/flows/Home/Story detail/Author detail/Following an author/Unfollowing an author/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s130>).
- 조건: Article 작성자 → Identity(writer Jordan) → Stories/Lists/About → Following·followers → Connections. useIdentityCatalog·RelationshipSource; Jordan10.2K/25, 기사말미24를 억지로 통일하지 않음; 동적 B 이름은 확정 프로필과 같은 ID로 해석. 상세 조건은 [S130 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s130>).
- FE: [community/ConnectionsScreen.tsx](<../FE/src/features/community/ConnectionsScreen.tsx>) · [community/FollowControl.tsx](<../FE/src/features/community/FollowControl.tsx>) · [community/PublicIdentityScreen.tsx](<../FE/src/features/community/PublicIdentityScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V14 작성자·관계](#v14).
- 판정: 로컬 화면/상태 연결 확인; V14의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 원본 미수록 followers 명단·집계/배지 정책은 자체 범위; 실제 이메일 구독·서버 관계 없음.
- 전이: [T-F20-02](#t-f20-02). 계약: [C21](#c21) · [C22](#c22). 미확인: [U-S130](#u-s130) · [U-F20](#u-f20). 인계 [H05](#h05).

<a id="s131"></a>

### S131 — 재생 속도 2.5배 선택

- 원본: `sc_b6f46f91fdc549b790b4e9c1a434afae` · [PNG](<../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/screens/03_sc_b6f46f91fdc549b790b4e9c1a434afae.png>) · [분석](<../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s131>).
- 조건: 확장 플레이어 → Speed 또는 더보기 → Select a voice → 언어 스크롤·Hans → Done. ListeningOptionsSource; Emma/Hans, 1x200WPM·2.5x490WPM은 관찰값 fixture. 상세 조건은 [S131 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s131>).
- FE: [listening/ListeningSpeedPanel.tsx](<../FE/src/features/listening/ListeningSpeedPanel.tsx>) · [listening/ListeningVoicePanel.tsx](<../FE/src/features/listening/ListeningVoicePanel.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V19 오디오 속도·음성](#v19).
- 판정: 로컬 화면/상태 연결 확인; V19의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 속도/음성 선택은 무음 mock 메타데이터; 기사 이동·추천·음소거·신고는 별도 로컬/모의 기능. 실제 발화/번역·AirPlay·재생 큐 미지원, WPM 산식은 자체 비교값.
- 전이: [T-F27-03](#t-f27-03). 계약: [C59](#c59) · [C60](#c60) · [C61](#c61). 미확인: [U-S131](#u-s131) · [U-F27](#u-f27). 인계 [H08](#h08).

<a id="s132"></a>

### S132 — Digest 일자별 추천

- 원본: `sc_bafbf7b80b154e25aec15e120a13f72a` · [PNG](<../medium/flows/Library/screens/04_sc_bafbf7b80b154e25aec15e120a13f72a.png>) · [분석](<../medium/flows/Library/ANALYSIS.md>) · [R 13개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s132>).
- 조건: Main/Library → Digest → 날짜 선택 → June12/June8 → 닫기. digestFixtures/replaceIssues; June12 love/jeremiah, June8 Goodbye Notion/xeladu·Alex; 다른 호는 자체 mock, 사진·응답 snapshot 차이 잔여. 상세 조건은 [S132 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s132>).
- FE: [bookmarks/LibraryScreen.tsx](<../FE/src/features/bookmarks/LibraryScreen.tsx>) · [community/IdentityLink.tsx](<../FE/src/features/community/IdentityLink.tsx>) · [digest/DigestPanel.tsx](<../FE/src/features/digest/DigestPanel.tsx>) · [notifications/NotificationSettingsScreen.tsx](<../FE/src/features/notifications/NotificationSettingsScreen.tsx>) · [reactions/ClapControl.tsx](<../FE/src/features/reactions/ClapControl.tsx>) · [responses/ResponseButton.tsx](<../FE/src/features/responses/ResponseButton.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V27 Digest](#v27).
- 판정: 로컬 화면/상태 연결 확인; V27의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: fixture 호/날짜·자체 필터 정책; 실제 배포/이메일 Digest 생성·전송 없음.
- 전이: [T-F41-04](#t-f41-04) · [T-F43-01](#t-f43-01) · [T-F44-01](#t-f44-01). 계약: [C37](#c37) · [C38](#c38). 미확인: [U-S132](#u-s132) · [U-F41](#u-f41) · [U-F43](#u-f43) · [U-F44](#u-f44). 인계 [H07](#h07).

<a id="s133"></a>

### S133 — 구매 성공 안내 팝업

- 원본: `sc_bb00623f121d405abc840e589837c3fd` · [PNG](<../medium/flows/Onboarding/Subscribing to Medium/screens/04_sc_bb00623f121d405abc840e589837c3fd.png>) · [분석](<../medium/flows/Onboarding/Subscribing to Medium/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s133>).
- 조건: Profile/Settings Upgrade 또는 onboarding 구독 → MembershipSheet → monthly/yearly → 모의 선택·성공. MembershipSource; SGD 보관 가격·독립 pending/success fixture; OS 구매 알림과 web Alert 차이. 상세 조건은 [S133 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s133>).
- FE: [membership/MembershipSheet.tsx](<../FE/src/features/membership/MembershipSheet.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V31 멤버십](#v31).
- 판정: 로컬 화면/상태 연결 확인; V31의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 구매 처리/성공은 mock이며 사용자 20번의 구매 실행 통과로 계산하지 않음. 지원/한계: 실제 스토어 구매/영수증/복원/갱신/해지 없음. 사용자 20번은 기간 선택/닫기이며 구매 Select 성공 증거가 아님.
- 전이: [T-F54-04](#t-f54-04). 계약: [C50](#c50) · [C65](#c65) · [C66](#c66) · [C67](#c67). 미확인: [U-S133](#u-s133) · [U-F54](#u-f54). 인계 [H08](#h08).

<a id="s134"></a>

### S134 — 로그인 인증 코드 입력

- 원본: `sc_bc8c0aff71644874a42b97e6c7fd4ce2` · [PNG](<../medium/flows/Logging in/screens/06_sc_bc8c0aff71644874a42b97e6c7fd4ce2.png>) · [분석](<../medium/flows/Logging in/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s134>).
- 조건: Main/Profile 또는 Library guest → AuthDialogs → 이메일 signup/login/code; Profile/Settings → Sign out. mockUsers + emailAuthSource; 개인정보·원본 인증코드 복사 없이 합성 테스트값 사용. 상세 조건은 [S134 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s134>).
- FE: [auth/AuthDialogs.tsx](<../FE/src/features/auth/AuthDialogs.tsx>) · [auth/EmailLogin.tsx](<../FE/src/features/auth/EmailLogin.tsx>) · [auth/createEmailAttempt.ts](<../FE/src/features/auth/createEmailAttempt.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V29 인증·로그아웃](#v29).
- 판정: 로컬 화면/상태 연결 확인; V29의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 실제 OAuth·메일 발송/소유권 확인·Supabase 세션·프로세스 재시작 복원 없음.
- 전이: [T-F52-06](#t-f52-06). 계약: [C46](#c46) · [C47](#c47) · [C48](#c48) · [C67](#c67). 미확인: [U-S134](#u-s134) · [U-F52](#u-f52). 인계 [H01](#h01).

<a id="s135"></a>

### S135 — 큐레이션 리스트 하단

- 원본: `sc_bd0cb76562a74fb69a3569e15daf02ee` · [PNG](<../medium/flows/Explore/Topic detail/Browse curated list/screens/05_sc_bd0cb76562a74fb69a3569e15daf02ee.png>) · [분석](<../medium/flows/Explore/Topic detail/Browse curated list/ANALYSIS.md>) · [R 8개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s135>).
- 조건: Topic → 큐레이션 카드 → PublicList(listId); S135는 More from Medium Staff까지 스크롤. publicListFixtures / PublicListSource; 8 stories·108 saves 원본 상태를 별도로 대조. 상세 조건은 [S135 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s135>).
- FE: [bookmarks/ArticleBookmarkControl.tsx](<../FE/src/features/bookmarks/ArticleBookmarkControl.tsx>) · [public-lists/PublicListScreen.tsx](<../FE/src/features/public-lists/PublicListScreen.tsx>) · [public-lists/PublicListStoryCard.tsx](<../FE/src/features/public-lists/PublicListStoryCard.tsx>) · [public-lists/SavePublicListControl.tsx](<../FE/src/features/public-lists/SavePublicListControl.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V04 공개 목록](#v04).
- 판정: 로컬 화면/상태 연결 확인; V04의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 목록/기사 저장과 반응은 서로 다른 메모리 자원; 타 계정 서버 권한·업데이트 알림 미연결.
- 전이: [T-F04-05](#t-f04-05). 계약: [C29](#c29) · [C30](#c30). 미확인: [U-S135](#u-s135) · [U-F04](#u-f04). 인계 [H04](#h04).

<a id="s136"></a>

### S136 — 프로필 편집 결과

- 원본: `sc_be99c4fdcf634190a324ec9820a84f43` · [PNG](<../medium/flows/Profile/Editing profile information/screens/07_sc_be99c4fdcf634190a324ec9820a84f43.png>) · [분석](<../medium/flows/Profile/Editing profile information/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s136>).
- 조건: Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save. ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도. 상세 조건은 [S136 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s136>).
- FE: [editor/WrittenStoryActions.tsx](<../FE/src/features/editor/WrittenStoryActions.tsx>) · [editor/WrittenStoryCardReactions.tsx](<../FE/src/features/editor/WrittenStoryCardReactions.tsx>) · [profile/ProfileEditorSheet.tsx](<../FE/src/features/profile/ProfileEditorSheet.tsx>) · [profile/ProfileScreen.tsx](<../FE/src/features/profile/ProfileScreen.tsx>) · [profile/ProfileStories.tsx](<../FE/src/features/profile/ProfileStories.tsx>) · [profile/PronounsEditor.tsx](<../FE/src/features/profile/PronounsEditor.tsx>) · [profile/useProfilePhotoSelection.ts](<../FE/src/features/profile/useProfilePhotoSelection.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V32 내 프로필·편집](#v32).
- 판정: 로컬 화면/상태 연결 확인; V32의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 사진은 로컬 URI/수명 관리, 업로드·서버 프로필 영속 저장 없음. 원본 OS 앨범과 Android picker 모습은 다름.
- 전이: [T-F57-07](#t-f57-07). 계약: [C51](#c51) · [C52](#c52) · [C53](#c53). 미확인: [U-S136](#u-s136) · [U-F57](#u-f57). 인계 [H09](#h09).

<a id="s137"></a>

### S137 — 이미지 삽입 후 편집기

- 원본: `sc_bed3857c8edc4a02b07af1e095ad7fba` · [PNG](<../medium/flows/Home/Publishing a story/screens/07_sc_bed3857c8edc4a02b07af1e095ad7fba.png>) · [분석](<../medium/flows/Home/Publishing a story/ANALYSIS.md>) · [R 13개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s137>).
- 조건: Home 작성 → Editor; 제목·본문 입력 → 해당 서식·이미지 블록 선택. DraftSource·EditorSession; 음악 제목/단락/인용/목록/구분선은 각 S의 문서 snapshot 별도. 상세 조건은 [S137 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s137>).
- FE: [editor/RichDocumentBody.tsx](<../FE/src/features/editor/RichDocumentBody.tsx>) · [editor/StoryEditorScreen.tsx](<../FE/src/features/editor/StoryEditorScreen.tsx>) · [editor/editorModel.ts](<../FE/src/features/editor/editorModel.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V07 편집기 서식](#v07).
- 판정: 로컬 화면/상태 연결 확인; V07의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 인용선 18dp·사진 선택 모드 여백/모드 전환 재선택 차이; 원본의 사진 경계 선택 방식은 미수록.
- 전이: [T-F08-07](#t-f08-07) · [T-F09-01](#t-f09-01) · [T-F10-01](#t-f10-01) · [T-F11-01](#t-f11-01). 계약: [C40](#c40). 미확인: [U-S137](#u-s137) · [U-F08](#u-f08) · [U-F09](#u-f09) · [U-F10](#u-f10) · [U-F11](#u-f11). 인계 [H02](#h02).

<a id="s138"></a>

### S138 — 대명사·소개 입력된 프로필

- 원본: `sc_befb6fde38cc48f3827ea389caed11de` · [PNG](<../medium/flows/Profile/Editing profile information/screens/06_sc_befb6fde38cc48f3827ea389caed11de.png>) · [분석](<../medium/flows/Profile/Editing profile information/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s138>).
- 조건: Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save. ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도. 상세 조건은 [S138 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s138>).
- FE: [editor/WrittenStoryActions.tsx](<../FE/src/features/editor/WrittenStoryActions.tsx>) · [editor/WrittenStoryCardReactions.tsx](<../FE/src/features/editor/WrittenStoryCardReactions.tsx>) · [profile/ProfileEditorSheet.tsx](<../FE/src/features/profile/ProfileEditorSheet.tsx>) · [profile/ProfileScreen.tsx](<../FE/src/features/profile/ProfileScreen.tsx>) · [profile/ProfileStories.tsx](<../FE/src/features/profile/ProfileStories.tsx>) · [profile/PronounsEditor.tsx](<../FE/src/features/profile/PronounsEditor.tsx>) · [profile/useProfilePhotoSelection.ts](<../FE/src/features/profile/useProfilePhotoSelection.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V32 내 프로필·편집](#v32).
- 판정: 로컬 화면/상태 연결 확인; V32의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 사진은 로컬 URI/수명 관리, 업로드·서버 프로필 영속 저장 없음. 원본 OS 앨범과 Android picker 모습은 다름.
- 전이: [T-F57-06](#t-f57-06). 계약: [C51](#c51) · [C52](#c52) · [C53](#c53). 미확인: [U-S138](#u-s138) · [U-F57](#u-f57). 인계 [H09](#h09).

<a id="s139"></a>

### S139 — 초안 목록

- 원본: `sc_c020fbe7604a43569b5bf77da2725119` · [PNG](<../medium/flows/Home/Publishing a story/Drafts/screens/03_sc_c020fbe7604a43569b5bf77da2725119.png>) · [분석](<../medium/flows/Home/Publishing a story/Drafts/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s139>).
- 조건: Editor 더보기 또는 Profile Drafts → Drafts; 저장한 같은 draftId 재열기. DraftSource; 제목 The Silence between Notes, editedAt=비교 시계-60초. 상세 조건은 [S139 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s139>).
- FE: [editor/DraftsScreen.tsx](<../FE/src/features/editor/DraftsScreen.tsx>) · [editor/createDraftSession.ts](<../FE/src/features/editor/createDraftSession.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V09 초안·작성 메뉴](#v09).
- 판정: 로컬 화면/상태 연결 확인; V09의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 기존 초안 사용자 삭제 미지원(발행 후 자동 제거와 별개). 지원/한계: 메모리 source 수명; 프로세스 재실행 복원·동기화 없음. 사용자가 기존 초안을 삭제하는 명령은 미지원(Q04).
- 전이: [T-F10-03](#t-f10-03). 계약: [C42](#c42). 미확인: [U-S139](#u-s139) · [U-F10](#u-f10). 인계 [H02](#h02).

<a id="s140"></a>

### S140 — 응답 미리보기 끝

- 원본: `sc_c068a6d42c5c48fb9d60c8af4adb446f` · [PNG](<../medium/flows/Home/Story detail/screens/06_sc_c068a6d42c5c48fb9d60c8af4adb446f.png>) · [분석](<../medium/flows/Home/Story detail/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s140>).
- 조건: Home/Explore 기사 → Article(articleId); 본문·말미·응답 미리보기까지 스크롤; 박수 조작. medium-brain 기본 기사; F16의834와 박수 흐름832는 독립 response fixture. 상세 조건은 [S140 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s140>).
- FE: [article/ArticleDetailScreen.tsx](<../FE/src/features/article/ArticleDetailScreen.tsx>) · [article/ReferenceArticleView.tsx](<../FE/src/features/article/ReferenceArticleView.tsx>) · [reactions/ClapControl.tsx](<../FE/src/features/reactions/ClapControl.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V13 기사 읽기·반응](#v13).
- 판정: 로컬 화면/상태 연결 확인; V13의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 일부 기사는 전체 본문 미수록 안내만 제공. 누적 반응 모델은 유지하고 하트 모양은 사용자 확정; 서버 집계 없음.
- 전이: [T-F16-06](#t-f16-06). 계약: [C09](#c09) · [C10](#c10) · [C11](#c11) · [C12](#c12). 미확인: [U-S140](#u-s140) · [U-F16](#u-f16). 인계 [H03](#h03).

<a id="s141"></a>

### S141 — 2.5배 재생 표시

- 원본: `sc_c0fd5f5f29594fb997865177863b9482` · [PNG](<../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/screens/04_sc_c0fd5f5f29594fb997865177863b9482.png>) · [분석](<../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/ANALYSIS.md>) · [R 13개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s141>).
- 조건: Article Listen → 미니 플레이어 → 확장 → 재생·정지·seek·닫기. ListeningSource·mock 시계; 00:05/00:10/00:20/00:40 각 snapshot과 duration 독립. 상세 조건은 [S141 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s141>).
- FE: [listening/ListeningPlayer.tsx](<../FE/src/features/listening/ListeningPlayer.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V18 오디오 플레이어](#v18).
- 판정: 로컬 화면/상태 연결 확인; V18의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 이전/다음 트랙 비활성·실제 음성 없음. 지원/한계: silent-mock; 실제 TTS/음원·백그라운드/오프라인 재생 없음, 이전/다음 큐 버튼 비활성.
- 전이: [T-F27-04](#t-f27-04). 계약: [C58](#c58) · [C59](#c59) · [C61](#c61) · [C66](#c66). 미확인: [U-S141](#u-s141) · [U-F27](#u-f27). 인계 [H08](#h08).

<a id="s142"></a>

### S142 — 응답 수정 반영

- 원본: `sc_c1a6af7cef31436a9cdd090eae87479f` · [PNG](<../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/screens/05_sc_c1a6af7cef31436a9cdd090eae87479f.png>) · [분석](<../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s142>).
- 조건: Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond. ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태. 상세 조건은 [S142 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s142>).
- FE: [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V20 응답·답글](#v20).
- 판정: 로컬 화면/상태 연결 확인; V20의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: source 메모리 저장·자체 깊이/정렬/집계; 실제 타 사용자 조회·서버 소유권 검증·알림 없음.
- 전이: [T-F33-05](#t-f33-05). 계약: [C14](#c14) · [C15](#c15) · [C16](#c16) · [C17](#c17) · [C18](#c18) · [C20](#c20). 미확인: [U-S142](#u-s142) · [U-F33](#u-f33). 인계 [H05](#h05).

<a id="s143"></a>

### S143 — 작가 더보기 액션

- 원본: `sc_c25f22caf7cd49ba88c8611fb7480932` · [PNG](<../medium/flows/Home/Story detail/Author detail/Blocking an author/screens/02_sc_c25f22caf7cd49ba88c8611fb7480932.png>) · [분석](<../medium/flows/Home/Story detail/Author detail/Blocking an author/ANALYSIS.md>) · [R 8개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s143>).
- 조건: Identity 또는 Article 더보기 → Mute/Block/Report → 선택·확정·토스트. ModerationSource·RelationshipSource와 공통 사용자 카탈로그; S093은 별도 snapshot이며 차단 결과로 단정하지 않음; 신고/차단/음소거 별도 상태. 상세 조건은 [S143 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s143>).
- FE: [moderation/ModerationDialogs.tsx](<../FE/src/features/moderation/ModerationDialogs.tsx>) · [moderation/articleModeration.ts](<../FE/src/features/moderation/articleModeration.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V15 음소거·차단·신고](#v15).
- 판정: 로컬 화면/상태 연결 확인; V15의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 앱 메모리 정책만 적용; 원본 차단 캡처의 글 잔존과 구현 접근 제한 차이, 실제 신고 접수/제재 없음.
- 전이: [T-F18-02](#t-f18-02) · [T-F22-02](#t-f22-02) · [T-F23-02](#t-f23-02). 계약: [C12](#c12) · [C18](#c18) · [C23](#c23) · [C24](#c24) · [C61](#c61). 미확인: [U-S143](#u-s143) · [U-F18](#u-f18) · [U-F22](#u-f22) · [U-F23](#u-f23). 인계 [H05](#h05).

<a id="s144"></a>

### S144 — 다크 내 프로필

- 원본: `sc_c31a2100ddcd41cba45b5081c69b78b5` · [PNG](<../medium/flows/Profile/Settings/Switching to dark mode/screens/08_sc_c31a2100ddcd41cba45b5081c69b78b5.png>) · [분석](<../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s144>).
- 조건: Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save. ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도. 상세 조건은 [S144 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s144>).
- FE: [editor/WrittenStoryActions.tsx](<../FE/src/features/editor/WrittenStoryActions.tsx>) · [editor/WrittenStoryCardReactions.tsx](<../FE/src/features/editor/WrittenStoryCardReactions.tsx>) · [profile/ProfileEditorSheet.tsx](<../FE/src/features/profile/ProfileEditorSheet.tsx>) · [profile/ProfileScreen.tsx](<../FE/src/features/profile/ProfileScreen.tsx>) · [profile/ProfileStories.tsx](<../FE/src/features/profile/ProfileStories.tsx>) · [profile/PronounsEditor.tsx](<../FE/src/features/profile/PronounsEditor.tsx>) · [profile/useProfilePhotoSelection.ts](<../FE/src/features/profile/useProfilePhotoSelection.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V32 내 프로필·편집](#v32).
- 판정: 로컬 화면/상태 연결 확인; V32의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 사진은 로컬 URI/수명 관리, 업로드·서버 프로필 영속 저장 없음. 원본 OS 앨범과 Android picker 모습은 다름.
- 전이: [T-F62-08](#t-f62-08). 계약: [C51](#c51) · [C52](#c52) · [C53](#c53). 미확인: [U-S144](#u-s144) · [U-F62](#u-f62). 인계 [H09](#h09).

<a id="s145"></a>

### S145 — 저장한 하이라이트 목록

- 원본: `sc_c37aefd0916548dda3cb46d61cc25193` · [PNG](<../medium/flows/Library/screens/05_sc_c37aefd0916548dda3cb46d61cc25193.png>) · [분석](<../medium/flows/Library/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s145>).
- 조건: Main/Library → Your lists / Saved lists / Highlighted; 새 목록·삭제 후 복귀. UserListStore·HighlightSource; empty/3/4 stories·About mindfulness를 각 상태별 구성. 상세 조건은 [S145 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s145>).
- FE: [bookmarks/LibraryScreen.tsx](<../FE/src/features/bookmarks/LibraryScreen.tsx>) · [highlights/HighlightList.tsx](<../FE/src/features/highlights/HighlightList.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V24 Library·목록 카드](#v24).
- 판정: 로컬 화면/상태 연결 확인; V24의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 목록/강조/다운로드는 메모리 상태; 원본 계정·집계·콘텐츠 snapshot과 현재 사용자 데이터는 다름.
- 전이: [T-F41-05](#t-f41-05). 계약: [C20](#c20) · [C29](#c29) · [C31](#c31) · [C37](#c37). 미확인: [U-S145](#u-s145) · [U-F41](#u-f41). 인계 [H04](#h04).

<a id="s146"></a>

### S146 — 토픽 지정된 발행 미리보기

- 원본: `sc_c3bdb30e524c4709ae45998ec529a6c0` · [PNG](<../medium/flows/Home/Publishing a story/Adding topics/screens/06_sc_c3bdb30e524c4709ae45998ec529a6c0.png>) · [분석](<../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>) · [R 7개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s146>).
- 조건: Home 작성 → Editor → Next/PublishPreview → Topics → 검색·선택·Save → preview. DraftSource·PublishTopics; The Silence between Notes, Music/Culture/Art, 별도 Publication 없음. 상세 조건은 [S146 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s146>).
- FE: [editor/PublishTopics.tsx](<../FE/src/features/editor/PublishTopics.tsx>) · [editor/StoryEditorScreen.tsx](<../FE/src/features/editor/StoryEditorScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V06 발행·토픽](#v06).
- 판정: 로컬 화면/상태 연결 확인; V06의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 실제 Publication 심사/제출·공개 URL·서버 발행 없음; 유효성·멱등성은 현재 mock 계약.
- 전이: [T-F07-06](#t-f07-06) · [T-F08-09](#t-f08-09). 계약: [C44](#c44) · [C45](#c45). 미확인: [U-S146](#u-s146) · [U-F07](#u-f07) · [U-F08](#u-f08). 인계 [H02](#h02).

<a id="s147"></a>

### S147 — 기사 말미와 작성자 카드

- 원본: `sc_c3fcf42b84be4b7298dfc138c224e241` · [PNG](<../medium/flows/Home/Story detail/screens/04_sc_c3fcf42b84be4b7298dfc138c224e241.png>) · [분석](<../medium/flows/Home/Story detail/ANALYSIS.md>) · [R 7개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s147>).
- 조건: Home/Explore 기사 → Article(articleId); 본문·말미·응답 미리보기까지 스크롤; 박수 조작. medium-brain 기본 기사; F16의834와 박수 흐름832는 독립 response fixture. 상세 조건은 [S147 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s147>).
- FE: [article/ArticleDetailScreen.tsx](<../FE/src/features/article/ArticleDetailScreen.tsx>) · [article/ReferenceArticleView.tsx](<../FE/src/features/article/ReferenceArticleView.tsx>) · [reactions/ClapControl.tsx](<../FE/src/features/reactions/ClapControl.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V13 기사 읽기·반응](#v13).
- 판정: 로컬 화면/상태 연결 확인; V13의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 일부 기사는 전체 본문 미수록 안내만 제공. 누적 반응 모델은 유지하고 하트 모양은 사용자 확정; 서버 집계 없음.
- 전이: [T-F16-04](#t-f16-04). 계약: [C09](#c09) · [C10](#c10) · [C11](#c11) · [C12](#c12). 미확인: [U-S147](#u-s147) · [U-F16](#u-f16). 인계 [H03](#h03).

<a id="s148"></a>

### S148 — 이미지 추가 방식 선택

- 원본: `sc_c609f8fa87b84b76bea6f312df2e3e0f` · [PNG](<../medium/flows/Home/Publishing a story/screens/04_sc_c609f8fa87b84b76bea6f312df2e3e0f.png>) · [분석](<../medium/flows/Home/Publishing a story/ANALYSIS.md>) · [R 7개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s148>).
- 조건: Editor → 이미지 메뉴 → Camera/Library/Unsplash → 선택·삽입; 로딩은 지연 source로 제어. EditorImageSource; 로컬 예시 자산·삽입 지연·성공 snapshot; 실제 외부 검색 아님. 상세 조건은 [S148 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s148>).
- FE: [editor/ImagePickerSheet.tsx](<../FE/src/features/editor/ImagePickerSheet.tsx>) · [editor/StoryEditorScreen.tsx](<../FE/src/features/editor/StoryEditorScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V08 편집기 이미지](#v08).
- 판정: 로컬 화면/상태 연결 확인; V08의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 서버 업로드/Unsplash API 없음; 보관 이미지 7개+기존 예시 4개, 가려진 원본 2카드 미확보.
- 전이: [T-F08-04](#t-f08-04). 계약: [C41](#c41). 미확인: [U-S148](#u-s148) · [U-F08](#u-f08). 인계 [H02](#h02).

<a id="s149"></a>

### S149 — 설정 하단

- 원본: `sc_c653047933aa40b2be7a8f281643d41d` · [PNG](<../medium/flows/Profile/Settings/screens/03_sc_c653047933aa40b2be7a8f281643d41d.png>) · [분석](<../medium/flows/Profile/Settings/ANALYSIS.md>) · [R 11개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s149>).
- 조건: Profile/Settings → Account/Appearance/App icon/각 상세 → 복귀. DisplaySettingsSource·AppIconAdapter; 자체 K 아이콘, S075 원본과 비동등. 상세 조건은 [S149 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s149>).
- FE: [app-icon/AppIconScreen.tsx](<../FE/src/features/app-icon/AppIconScreen.tsx>) · [settings/SettingsExtrasScreen.tsx](<../FE/src/features/settings/SettingsExtrasScreen.tsx>) · [settings/SettingsScreen.tsx](<../FE/src/features/settings/SettingsScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V33 설정·앱 아이콘](#v33).
- 판정: 로컬 화면/상태 연결 확인; V33의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 계정/Facebook은 mock; 앱 아이콘 어댑터는 모듈 가용성에 따름. 현재 아이콘 모양 확정으로 수정 대상 아님.
- 전이: [T-F58-03](#t-f58-03) · [T-F61-01](#t-f61-01). 계약: [C02](#c02) · [C66](#c66) · [C67](#c67) · [C68](#c68) · [C69](#c69). 미확인: [U-S149](#u-s149) · [U-F58](#u-f58) · [U-F61](#u-f61). 인계 [H09](#h09).

<a id="s150"></a>

### S150 — 글별 Lifetime 통계

- 원본: `sc_c6580d2d071a4f079981013ccc658af4` · [PNG](<../medium/flows/Profile/Story stats/screens/04_sc_c6580d2d071a4f079981013ccc658af4.png>) · [분석](<../medium/flows/Profile/Story stats/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_06.md#s150>).
- 조건: Profile → View stats → StoryStats → Monthly/Lifetime·날짜·글 선택. StoryStatsSource; June1–13 UTC11/2와 글 Lifetime0/0 독립 initial/asOf fixture. 상세 조건은 [S150 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s150>).
- FE: [story-stats/StoryStatsScreen.tsx](<../FE/src/features/story-stats/StoryStatsScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V34 글 통계](#v34).
- 판정: 로컬 화면/상태 연결 확인; V34의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 통계 fixture/자체 UTC 정책; 실제 이벤트 수집·분석/정산 없음, 과거 11/2와 현재 0/미집계 차이 유지.
- 전이: [T-F63-04](#t-f63-04). 계약: [C54](#c54). 미확인: [U-S150](#u-s150) · [U-F63](#u-f63). 인계 [H10](#h10).

<a id="s151"></a>

### S151 — 추천 토픽 팔로우 상태

- 원본: `sc_c7deda6b53824957b587bd922cd55399` · [PNG](<../medium/flows/Home/Refine recommendations/Filtering suggestions/screens/04_sc_c7deda6b53824957b587bd922cd55399.png>) · [분석](<../medium/flows/Home/Refine recommendations/Filtering suggestions/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s151>).
- 조건: Home 더보기/Refine recommendations → Recommendations → Following/Reading history/Muted/Suggestions → All·Topics 등 필터. RelationshipSource·ModerationSource·TopicSource + useIdentityCatalog(DirectorySource/mockUsers/확정 공개 프로필); Writers1/Topics3는 UI 팔로우로 구성, 숫자와 목록·해제를 함께 확인. 상세 조건은 [S151 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s151>).
- FE: [recommendations/RefineRecommendationsScreen.tsx](<../FE/src/features/recommendations/RefineRecommendationsScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V11 추천 관리](#v11).
- 판정: 로컬 화면/상태 연결 확인; V11의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 추천 알고리즘·개인화 영속성 없음. 별도 원본 시점의 계정 상태를 한 세션 결과로 합치지 않음.
- 전이: [T-F13-04](#t-f13-04). 계약: [C05](#c05) · [C12](#c12) · [C25](#c25) · [C26](#c26). 미확인: [U-S151](#u-s151) · [U-F13](#u-f13). 인계 [H06](#h06).

<a id="s152"></a>

### S152 — 작가 음소거 안내

- 원본: `sc_c8b24e7669734e74922bee69b751350b` · [PNG](<../medium/flows/Home/Story detail/Author detail/Muting an author/screens/03_sc_c8b24e7669734e74922bee69b751350b.png>) · [분석](<../medium/flows/Home/Story detail/Author detail/Muting an author/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s152>).
- 조건: Identity 또는 Article 더보기 → Mute/Block/Report → 선택·확정·토스트. ModerationSource·RelationshipSource와 공통 사용자 카탈로그; S093은 별도 snapshot이며 차단 결과로 단정하지 않음; 신고/차단/음소거 별도 상태. 상세 조건은 [S152 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s152>).
- FE: [moderation/ModerationDialogs.tsx](<../FE/src/features/moderation/ModerationDialogs.tsx>) · [moderation/articleModeration.ts](<../FE/src/features/moderation/articleModeration.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V15 음소거·차단·신고](#v15).
- 판정: 로컬 화면/상태 연결 확인; V15의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 앱 메모리 정책만 적용; 원본 차단 캡처의 글 잔존과 구현 접근 제한 차이, 실제 신고 접수/제재 없음.
- 전이: [T-F22-03](#t-f22-03). 계약: [C12](#c12) · [C18](#c18) · [C23](#c23) · [C24](#c24) · [C61](#c61). 미확인: [U-S152](#u-s152) · [U-F22](#u-f22). 인계 [H05](#h05).

<a id="s153"></a>

### S153 — 통계 그래프 날짜 선택

- 원본: `sc_c8fa56a2dd5b4e959c333ea3e6d334e2` · [PNG](<../medium/flows/Profile/Story stats/screens/03_sc_c8fa56a2dd5b4e959c333ea3e6d334e2.png>) · [분석](<../medium/flows/Profile/Story stats/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s153>).
- 조건: Profile → View stats → StoryStats → Monthly/Lifetime·날짜·글 선택. StoryStatsSource; June1–13 UTC11/2와 글 Lifetime0/0 독립 initial/asOf fixture. 상세 조건은 [S153 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s153>).
- FE: [story-stats/StoryStatsScreen.tsx](<../FE/src/features/story-stats/StoryStatsScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V34 글 통계](#v34).
- 판정: 로컬 화면/상태 연결 확인; V34의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 통계 fixture/자체 UTC 정책; 실제 이벤트 수집·분석/정산 없음, 과거 11/2와 현재 0/미집계 차이 유지.
- 전이: [T-F63-03](#t-f63-03). 계약: [C54](#c54). 미확인: [U-S153](#u-s153) · [U-F63](#u-f63). 인계 [H10](#h10).

<a id="s154"></a>

### S154 — 언어별 음성 목록 스크롤

- 원본: `sc_ca2321d6dc9142e5a97e2734260c2b0f` · [PNG](<../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/04_sc_ca2321d6dc9142e5a97e2734260c2b0f.png>) · [분석](<../medium/flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s154>).
- 조건: 확장 플레이어 → Speed 또는 더보기 → Select a voice → 언어 스크롤·Hans → Done. ListeningOptionsSource; Emma/Hans, 1x200WPM·2.5x490WPM은 관찰값 fixture. 상세 조건은 [S154 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s154>).
- FE: [listening/ListeningSpeedPanel.tsx](<../FE/src/features/listening/ListeningSpeedPanel.tsx>) · [listening/ListeningVoicePanel.tsx](<../FE/src/features/listening/ListeningVoicePanel.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V19 오디오 속도·음성](#v19).
- 판정: 로컬 화면/상태 연결 확인; V19의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 속도/음성 선택은 무음 mock 메타데이터; 기사 이동·추천·음소거·신고는 별도 로컬/모의 기능. 실제 발화/번역·AirPlay·재생 큐 미지원, WPM 산식은 자체 비교값.
- 전이: [T-F28-04](#t-f28-04). 계약: [C59](#c59) · [C60](#c60) · [C61](#c61). 미확인: [U-S154](#u-s154) · [U-F28](#u-f28). 인계 [H08](#h08).

<a id="s155"></a>

### S155 — 리스트 이름 입력

- 원본: `sc_ca3b32e4373a40fc84405838671eab27` · [PNG](<../medium/flows/Library/Creating a list/screens/03_sc_ca3b32e4373a40fc84405838671eab27.png>) · [분석](<../medium/flows/Library/Creating a list/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s155>).
- 조건: Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo. UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; source 확정 updatedAt;14/6/1초 독립 조건. 상세 조건은 [S155 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s155>).
- FE: [bookmarks/ListActions.tsx](<../FE/src/features/bookmarks/ListActions.tsx>) · [bookmarks/ListEditorSheet.tsx](<../FE/src/features/bookmarks/ListEditorSheet.tsx>) · [bookmarks/ListNoteSheet.tsx](<../FE/src/features/bookmarks/ListNoteSheet.tsx>) · [bookmarks/ListStoryCard.tsx](<../FE/src/features/bookmarks/ListStoryCard.tsx>) · [bookmarks/ReadingListScreen.tsx](<../FE/src/features/bookmarks/ReadingListScreen.tsx>) · [bookmarks/ReorderListEditor.tsx](<../FE/src/features/bookmarks/ReorderListEditor.tsx>) · [bookmarks/createUserListStore.ts](<../FE/src/features/bookmarks/createUserListStore.ts>) · [bookmarks/listTypes.ts](<../FE/src/features/bookmarks/listTypes.ts>) · [bookmarks/ListDetailMetadata.tsx](<../FE/src/features/bookmarks/ListDetailMetadata.tsx>) · [bookmarks/LibrarySheet.tsx](<../FE/src/features/bookmarks/LibrarySheet.tsx>) · [navigation/ReadingListRoute.tsx](<../FE/src/app/navigation/ReadingListRoute.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V25 내 목록·편집](#v25).
- 판정: 로컬 화면/상태 연결 확인; V25의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 자체 소유권/충돌/시간 정책; 기본 Reading list 삭제 제한. 실제 공유/다른 기기 정합성 미연결.
- 전이: [T-F42-03](#t-f42-03). 계약: [C28](#c28) · [C30](#c30) · [C31](#c31) · [C32](#c32) · [C33](#c33) · [C34](#c34) · [C35](#c35). 미확인: [U-S155](#u-s155) · [U-F42](#u-f42). 인계 [H04](#h04).

<a id="s156"></a>

### S156 — 프로필 사진 소스 선택

- 원본: `sc_cba29e82e4364a239d3e5423213fa670` · [PNG](<../medium/flows/Profile/Editing profile information/screens/03_sc_cba29e82e4364a239d3e5423213fa670.png>) · [분석](<../medium/flows/Profile/Editing profile information/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s156>).
- 조건: Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save. ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도. 상세 조건은 [S156 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s156>).
- FE: [editor/WrittenStoryActions.tsx](<../FE/src/features/editor/WrittenStoryActions.tsx>) · [editor/WrittenStoryCardReactions.tsx](<../FE/src/features/editor/WrittenStoryCardReactions.tsx>) · [profile/ProfileEditorSheet.tsx](<../FE/src/features/profile/ProfileEditorSheet.tsx>) · [profile/ProfileScreen.tsx](<../FE/src/features/profile/ProfileScreen.tsx>) · [profile/ProfileStories.tsx](<../FE/src/features/profile/ProfileStories.tsx>) · [profile/PronounsEditor.tsx](<../FE/src/features/profile/PronounsEditor.tsx>) · [profile/useProfilePhotoSelection.ts](<../FE/src/features/profile/useProfilePhotoSelection.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V32 내 프로필·편집](#v32).
- 판정: 로컬 화면/상태 연결 확인; V32의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 사진은 로컬 URI/수명 관리, 업로드·서버 프로필 영속 저장 없음. 원본 OS 앨범과 Android picker 모습은 다름.
- 전이: [T-F57-03](#t-f57-03). 계약: [C51](#c51) · [C52](#c52) · [C53](#c53). 미확인: [U-S156](#u-s156) · [U-F57](#u-f57). 인계 [H09](#h09).

<a id="s157"></a>

### S157 — 항목 순서 변경

- 원본: `sc_cdf564e8e6a144389299ff49a7d626ce` · [PNG](<../medium/flows/Library/List detail/Reordering items/screens/04_sc_cdf564e8e6a144389299ff49a7d626ce.png>) · [분석](<../medium/flows/Library/List detail/Reordering items/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s157>).
- 조건: Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo. UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; source 확정 updatedAt;14/6/1초 독립 조건. 상세 조건은 [S157 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s157>).
- FE: [bookmarks/ListActions.tsx](<../FE/src/features/bookmarks/ListActions.tsx>) · [bookmarks/ListEditorSheet.tsx](<../FE/src/features/bookmarks/ListEditorSheet.tsx>) · [bookmarks/ListNoteSheet.tsx](<../FE/src/features/bookmarks/ListNoteSheet.tsx>) · [bookmarks/ListStoryCard.tsx](<../FE/src/features/bookmarks/ListStoryCard.tsx>) · [bookmarks/ReadingListScreen.tsx](<../FE/src/features/bookmarks/ReadingListScreen.tsx>) · [bookmarks/ReorderListEditor.tsx](<../FE/src/features/bookmarks/ReorderListEditor.tsx>) · [bookmarks/createUserListStore.ts](<../FE/src/features/bookmarks/createUserListStore.ts>) · [bookmarks/listTypes.ts](<../FE/src/features/bookmarks/listTypes.ts>) · [bookmarks/ListDetailMetadata.tsx](<../FE/src/features/bookmarks/ListDetailMetadata.tsx>) · [bookmarks/LibrarySheet.tsx](<../FE/src/features/bookmarks/LibrarySheet.tsx>) · [navigation/ReadingListRoute.tsx](<../FE/src/app/navigation/ReadingListRoute.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V25 내 목록·편집](#v25).
- 판정: 로컬 화면/상태 연결 확인; V25의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 자체 소유권/충돌/시간 정책; 기본 Reading list 삭제 제한. 실제 공유/다른 기기 정합성 미연결.
- 전이: [T-F51-04](#t-f51-04). 계약: [C28](#c28) · [C30](#c30) · [C31](#c31) · [C32](#c32) · [C33](#c33) · [C34](#c34) · [C35](#c35). 미확인: [U-S157](#u-s157) · [U-F51](#u-f51). 인계 [H04](#h04).

<a id="s158"></a>

### S158 — 기사 응답 입력

- 원본: `sc_cebfd0ad696f4e20a1c7d99da1dc1cef` · [PNG](<../medium/flows/Home/Story detail/Responses/Commenting a story/screens/02_sc_cebfd0ad696f4e20a1c7d99da1dc1cef.png>) · [분석](<../medium/flows/Home/Story detail/Responses/Commenting a story/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s158>).
- 조건: Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond. ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태. 상세 조건은 [S158 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s158>).
- FE: [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V20 응답·답글](#v20).
- 판정: 로컬 화면/상태 연결 확인; V20의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: source 메모리 저장·자체 깊이/정렬/집계; 실제 타 사용자 조회·서버 소유권 검증·알림 없음.
- 전이: [T-F31-02](#t-f31-02). 계약: [C14](#c14) · [C15](#c15) · [C16](#c16) · [C17](#c17) · [C18](#c18) · [C20](#c20). 미확인: [U-S158](#u-s158) · [U-F31](#u-f31). 인계 [H05](#h05).

<a id="s159"></a>

### S159 — 멤버 가입 완료 화면

- 원본: `sc_cf306e89e43144029ce108cb5338132a` · [PNG](<../medium/flows/Onboarding/Subscribing to Medium/screens/05_sc_cf306e89e43144029ce108cb5338132a.png>) · [분석](<../medium/flows/Onboarding/Subscribing to Medium/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s159>).
- 조건: Profile/Settings Upgrade 또는 onboarding 구독 → MembershipSheet → monthly/yearly → 모의 선택·성공. MembershipSource; SGD 보관 가격·독립 pending/success fixture; OS 구매 알림과 web Alert 차이. 상세 조건은 [S159 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s159>).
- FE: [membership/MembershipSheet.tsx](<../FE/src/features/membership/MembershipSheet.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V31 멤버십](#v31).
- 판정: 로컬 화면/상태 연결 확인; V31의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 구매 처리/성공은 mock이며 사용자 20번의 구매 실행 통과로 계산하지 않음. 지원/한계: 실제 스토어 구매/영수증/복원/갱신/해지 없음. 사용자 20번은 기간 선택/닫기이며 구매 Select 성공 증거가 아님.
- 전이: [T-F54-05](#t-f54-05). 계약: [C50](#c50) · [C65](#c65) · [C66](#c66) · [C67](#c67). 미확인: [U-S159](#u-s159) · [U-F54](#u-f54). 인계 [H08](#h08).

<a id="s160"></a>

### S160 — 재생 진행 상태

- 원본: `sc_d035c7d2bcfe4d0f99df80fddecebdcd` · [PNG](<../medium/flows/Home/Story detail/Listening to a story/screens/05_sc_d035c7d2bcfe4d0f99df80fddecebdcd.png>) · [분석](<../medium/flows/Home/Story detail/Listening to a story/ANALYSIS.md>) · [R 13개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s160>).
- 조건: Article Listen → 미니 플레이어 → 확장 → 재생·정지·seek·닫기. ListeningSource·mock 시계; 00:05/00:10/00:20/00:40 각 snapshot과 duration 독립. 상세 조건은 [S160 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s160>).
- FE: [listening/ListeningPlayer.tsx](<../FE/src/features/listening/ListeningPlayer.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V18 오디오 플레이어](#v18).
- 판정: 로컬 화면/상태 연결 확인; V18의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 이전/다음 트랙 비활성·실제 음성 없음. 지원/한계: silent-mock; 실제 TTS/음원·백그라운드/오프라인 재생 없음, 이전/다음 큐 버튼 비활성.
- 전이: [T-F26-05](#t-f26-05). 계약: [C58](#c58) · [C59](#c59) · [C61](#c61) · [C66](#c66). 미확인: [U-S160](#u-s160) · [U-F26](#u-f26). 인계 [H08](#h08).

<a id="s161"></a>

### S161 — 사용자 신고 사유 선택

- 원본: `sc_d07b03740ecc44328719d4d21703bb06` · [PNG](<../medium/flows/Home/Story detail/Author detail/Reporting an author/screens/03_sc_d07b03740ecc44328719d4d21703bb06.png>) · [분석](<../medium/flows/Home/Story detail/Author detail/Reporting an author/ANALYSIS.md>) · [R 12개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s161>).
- 조건: Identity 또는 Article 더보기 → Mute/Block/Report → 선택·확정·토스트. ModerationSource·RelationshipSource와 공통 사용자 카탈로그; S093은 별도 snapshot이며 차단 결과로 단정하지 않음; 신고/차단/음소거 별도 상태. 상세 조건은 [S161 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s161>).
- FE: [moderation/ModerationDialogs.tsx](<../FE/src/features/moderation/ModerationDialogs.tsx>) · [moderation/articleModeration.ts](<../FE/src/features/moderation/articleModeration.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V15 음소거·차단·신고](#v15).
- 판정: 로컬 화면/상태 연결 확인; V15의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 앱 메모리 정책만 적용; 원본 차단 캡처의 글 잔존과 구현 접근 제한 차이, 실제 신고 접수/제재 없음.
- 전이: [T-F23-03](#t-f23-03). 계약: [C12](#c12) · [C18](#c18) · [C23](#c23) · [C24](#c24) · [C61](#c61). 미확인: [U-S161](#u-s161) · [U-F23](#u-f23). 인계 [H05](#h05).

<a id="s162"></a>

### S162 — 다이제스트 설정

- 원본: `sc_d17bad2e556e4b0abfdc9541f90c46f2` · [PNG](<../medium/flows/Library/Filtering digest/Digest settings/screens/02_sc_d17bad2e556e4b0abfdc9541f90c46f2.png>) · [분석](<../medium/flows/Library/Filtering digest/Digest settings/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s162>).
- 조건: Digest 설정 또는 Profile/Settings → Email/Push → NotificationSettings(section). NotificationSource·설정 source; Daily/PushOn/EmailOn와 개별 토글 상태. 상세 조건은 [S162 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s162>).
- FE: [notifications/NotificationSettingsScreen.tsx](<../FE/src/features/notifications/NotificationSettingsScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V28 Digest·Push 설정](#v28).
- 판정: 로컬 화면/상태 연결 확인; V28의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: OS 권한과 원격 토큰 등록/푸시 전송은 별개; 실제 메일/Push 미연결, 원본 잘린 하단 항목 미확인.
- 전이: [T-F44-02](#t-f44-02). 계약: [C39](#c39) · [C50](#c50) · [C56](#c56) · [C57](#c57) · [C67](#c67). 미확인: [U-S162](#u-s162) · [U-F44](#u-f44). 인계 [H07](#h07).

<a id="s163"></a>

### S163 — 공유 카드 시트

- 원본: `sc_d1c962cd0a8240ee94769a612a81d64f` · [PNG](<../medium/flows/Home/Story detail/Sharing a story/screens/02_sc_d1c962cd0a8240ee94769a612a81d64f.png>) · [분석](<../medium/flows/Home/Story detail/Sharing a story/ANALYSIS.md>) · [R 8개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s163>).
- 조건: Article/인용/Identity/PublicList 공유 → 카드 → Copy link/Save image/Share via. ShareAdapter; 공개 공유 target + 카드 style index; OS 저장·공유는 Q07. 상세 조건은 [S163 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s163>).
- FE: [sharing/ShareCard.tsx](<../FE/src/features/sharing/ShareCard.tsx>) · [sharing/ShareSheet.tsx](<../FE/src/features/sharing/ShareSheet.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V23 공유](#v23).
- 판정: 로컬 화면/상태 연결 확인; V23의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: OS 복귀 returned는 전달 완료 증거가 아님. 공유 URL은 kostolany.invalid 모의 주소이며 Friend 링크도 실제 발급하지 않음. 파일 이미지 저장과 목록 메모리 다운로드는 다름.
- 전이: [T-F39-02](#t-f39-02). 계약: [C23](#c23) · [C61](#c61) · [C62](#c62) · [C63](#c63) · [C64](#c64). 미확인: [U-S163](#u-s163) · [U-F39](#u-f39). 인계 [H09](#h09).

<a id="s164"></a>

### S164 — 다크 기사 본문

- 원본: `sc_d1d05d6500f349d89c5a3e5646ff238b` · [PNG](<../medium/flows/Home/Story detail/Changing display/screens/09_sc_d1d05d6500f349d89c5a3e5646ff238b.png>) · [분석](<../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s164>).
- 조건: Home/Explore 기사 → Article(articleId); 본문·말미·응답 미리보기까지 스크롤; 박수 조작. medium-brain 기본 기사; F16의834와 박수 흐름832는 독립 response fixture. 상세 조건은 [S164 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s164>).
- FE: [article/ArticleDetailScreen.tsx](<../FE/src/features/article/ArticleDetailScreen.tsx>) · [article/ReferenceArticleView.tsx](<../FE/src/features/article/ReferenceArticleView.tsx>) · [reactions/ClapControl.tsx](<../FE/src/features/reactions/ClapControl.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V13 기사 읽기·반응](#v13).
- 판정: 로컬 화면/상태 연결 확인; V13의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 일부 기사는 전체 본문 미수록 안내만 제공. 누적 반응 모델은 유지하고 하트 모양은 사용자 확정; 서버 집계 없음.
- 전이: [T-F24-09](#t-f24-09). 계약: [C09](#c09) · [C10](#c10) · [C11](#c11) · [C12](#c12). 미확인: [U-S164](#u-s164) · [U-F24](#u-f24). 인계 [H03](#h03).

<a id="s165"></a>

### S165 — 리스트 다운로드 진행

- 원본: `sc_d23a5b4ea6ff462f8a05ce2371e90734` · [PNG](<../medium/flows/Library/List detail/Downloading a list/screens/02_sc_d23a5b4ea6ff462f8a05ce2371e90734.png>) · [분석](<../medium/flows/Library/List detail/Downloading a list/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s165>).
- 조건: Library → ReadingList → Download → 진행·완료·취소·본문 열기. DownloadSource; 4개 일반 글 및 발행 혼합; 진행률·취소 source 제어; 영속 파일 없음. 상세 조건은 [S165 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s165>).
- FE: [downloads/DownloadControl.tsx](<../FE/src/features/downloads/DownloadControl.tsx>) · [downloads/createDownloadStore.ts](<../FE/src/features/downloads/createDownloadStore.ts>) · [downloads/createMockDownloadSource.ts](<../FE/src/features/downloads/createMockDownloadSource.ts>) · [downloads/DownloadProvider.tsx](<../FE/src/features/downloads/DownloadProvider.tsx>) · [editor/WrittenStoryScreen.tsx](<../FE/src/features/editor/WrittenStoryScreen.tsx>) · [downloads/publishedDownload.ts](<../FE/src/features/downloads/publishedDownload.ts>) · [downloads/publishedDownload.test.ts](<../FE/src/features/downloads/publishedDownload.test.ts>) · [navigation/PublishedDownloadsNavigation.test.tsx](<../FE/src/app/navigation/PublishedDownloadsNavigation.test.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V26 다운로드](#v26).
- 판정: 로컬 화면/상태 연결 확인; V26의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 파일 Downloads 저장·디스크 영속화·실제 네트워크 단절 보장 없음. 앱 재시작 보존도 미지원.
- 전이: [T-F48-02](#t-f48-02). 계약: [C36](#c36) · [C66](#c66). 미확인: [U-S165](#u-s165) · [U-F48](#u-f48). 인계 [H04](#h04).

<a id="s166"></a>

### S166 — 가입 공급자 선택

- 원본: `sc_d55739aa2ac1495da026006235e7c0a7` · [PNG](<../medium/flows/Logging in/screens/01_sc_d55739aa2ac1495da026006235e7c0a7.png>) · [분석](<../medium/flows/Logging in/ANALYSIS.md>) · [R 8개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s166>).
- 조건: Main/Profile 또는 Library guest → AuthDialogs → 이메일 signup/login/code; Profile/Settings → Sign out. mockUsers + emailAuthSource; 개인정보·원본 인증코드 복사 없이 합성 테스트값 사용. 상세 조건은 [S166 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s166>).
- FE: [auth/AuthDialogs.tsx](<../FE/src/features/auth/AuthDialogs.tsx>) · [auth/EmailLogin.tsx](<../FE/src/features/auth/EmailLogin.tsx>) · [auth/createEmailAttempt.ts](<../FE/src/features/auth/createEmailAttempt.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V29 인증·로그아웃](#v29).
- 판정: 로컬 화면/상태 연결 확인; V29의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 실제 OAuth·메일 발송/소유권 확인·Supabase 세션·프로세스 재시작 복원 없음.
- 전이: [T-F52-01](#t-f52-01) · [T-F53-02](#t-f53-02) · [T-F61-03](#t-f61-03). 계약: [C46](#c46) · [C47](#c47) · [C48](#c48) · [C67](#c67). 미확인: [U-S166](#u-s166) · [U-F52](#u-f52) · [U-F53](#u-f53) · [U-F61](#u-f61). 인계 [H01](#h01).

<a id="s167"></a>

### S167 — 내 소개 빈 상태

- 원본: `sc_d55f02281f894078a734269d60de79c4` · [PNG](<../medium/flows/Profile/screens/05_sc_d55f02281f894078a734269d60de79c4.png>) · [분석](<../medium/flows/Profile/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s167>).
- 조건: Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save. ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도. 상세 조건은 [S167 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s167>).
- FE: [editor/WrittenStoryActions.tsx](<../FE/src/features/editor/WrittenStoryActions.tsx>) · [editor/WrittenStoryCardReactions.tsx](<../FE/src/features/editor/WrittenStoryCardReactions.tsx>) · [profile/ProfileEditorSheet.tsx](<../FE/src/features/profile/ProfileEditorSheet.tsx>) · [profile/ProfileScreen.tsx](<../FE/src/features/profile/ProfileScreen.tsx>) · [profile/ProfileStories.tsx](<../FE/src/features/profile/ProfileStories.tsx>) · [profile/PronounsEditor.tsx](<../FE/src/features/profile/PronounsEditor.tsx>) · [profile/useProfilePhotoSelection.ts](<../FE/src/features/profile/useProfilePhotoSelection.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V32 내 프로필·편집](#v32).
- 판정: 로컬 화면/상태 연결 확인; V32의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 사진은 로컬 URI/수명 관리, 업로드·서버 프로필 영속 저장 없음. 원본 OS 앨범과 Android picker 모습은 다름.
- 전이: [T-F55-05](#t-f55-05). 계약: [C51](#c51) · [C52](#c52) · [C53](#c53). 미확인: [U-S167](#u-s167) · [U-F55](#u-f55). 인계 [H09](#h09).

<a id="s168"></a>

### S168 — 기사 더보기 메뉴

- 원본: `sc_d62e32234117483b85b4c73ed63249cd` · [PNG](<../medium/flows/Home/Story detail/Changing display/screens/02_sc_d62e32234117483b85b4c73ed63249cd.png>) · [분석](<../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>) · [R 8개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s168>).
- 조건: Article 더보기 → Display settings → 100/120%, font, appearance, highlights. DisplaySettingsSource; S063 기본관찰값, S125=120%, S198=Dark120%, S001=others off. 상세 조건은 [S168 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s168>).
- FE: [settings/ArticleDisplayPopover.tsx](<../FE/src/features/settings/ArticleDisplayPopover.tsx>) · [settings/useReaderTypography.ts](<../FE/src/features/settings/useReaderTypography.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V16 읽기 설정](#v16).
- 판정: 로컬 화면/상태 연결 확인; V16의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 선택 옵션/80~200 경계는 자체 정책, 원본 실제 서체 파일 0개. 기사 확대와 OS 확대 구분.
- 전이: [T-F24-02](#t-f24-02). 계약: [C02](#c02) · [C12](#c12) · [C13](#c13). 미확인: [U-S168](#u-s168) · [U-F24](#u-f24). 인계 [H03](#h03).

<a id="s169"></a>

### S169 — 발행 글과 반응 있는 프로필

- 원본: `sc_d76d3680605f4b62ab31e3039d6c4fe6` · [PNG](<../medium/flows/Profile/screens/03_sc_d76d3680605f4b62ab31e3039d6c4fe6.png>) · [분석](<../medium/flows/Profile/ANALYSIS.md>) · [R 16개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s169>).
- 조건: Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save. ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도. 상세 조건은 [S169 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s169>).
- FE: [editor/WrittenStoryActions.tsx](<../FE/src/features/editor/WrittenStoryActions.tsx>) · [editor/WrittenStoryCardReactions.tsx](<../FE/src/features/editor/WrittenStoryCardReactions.tsx>) · [profile/ProfileEditorSheet.tsx](<../FE/src/features/profile/ProfileEditorSheet.tsx>) · [profile/ProfileScreen.tsx](<../FE/src/features/profile/ProfileScreen.tsx>) · [profile/ProfileStories.tsx](<../FE/src/features/profile/ProfileStories.tsx>) · [profile/PronounsEditor.tsx](<../FE/src/features/profile/PronounsEditor.tsx>) · [profile/useProfilePhotoSelection.ts](<../FE/src/features/profile/useProfilePhotoSelection.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V32 내 프로필·편집](#v32).
- 판정: 로컬 화면/상태 연결 확인; V32의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 사진은 로컬 URI/수명 관리, 업로드·서버 프로필 영속 저장 없음. 원본 OS 앨범과 Android picker 모습은 다름.
- 전이: [T-F55-03](#t-f55-03) · [T-F58-01](#t-f58-01). 계약: [C51](#c51) · [C52](#c52) · [C53](#c53). 미확인: [U-S169](#u-s169) · [U-F55](#u-f55) · [U-F58](#u-f58). 인계 [H09](#h09).

<a id="s170"></a>

### S170 — 사용자 신고 성공 안내

- 원본: `sc_d9ba56fa632249c7908f15a8e3082d97` · [PNG](<../medium/flows/Home/Story detail/Author detail/Reporting an author/screens/05_sc_d9ba56fa632249c7908f15a8e3082d97.png>) · [분석](<../medium/flows/Home/Story detail/Author detail/Reporting an author/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s170>).
- 조건: Identity 또는 Article 더보기 → Mute/Block/Report → 선택·확정·토스트. ModerationSource·RelationshipSource와 공통 사용자 카탈로그; S093은 별도 snapshot이며 차단 결과로 단정하지 않음; 신고/차단/음소거 별도 상태. 상세 조건은 [S170 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s170>).
- FE: [moderation/ModerationDialogs.tsx](<../FE/src/features/moderation/ModerationDialogs.tsx>) · [moderation/articleModeration.ts](<../FE/src/features/moderation/articleModeration.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V15 음소거·차단·신고](#v15).
- 판정: 로컬 화면/상태 연결 확인; V15의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 앱 메모리 정책만 적용; 원본 차단 캡처의 글 잔존과 구현 접근 제한 차이, 실제 신고 접수/제재 없음.
- 전이: [T-F23-05](#t-f23-05). 계약: [C12](#c12) · [C18](#c18) · [C23](#c23) · [C24](#c24) · [C61](#c61). 미확인: [U-S170](#u-s170) · [U-F23](#u-f23). 인계 [H05](#h05).

<a id="s171"></a>

### S171 — 이메일 로그인 빈 폼

- 원본: `sc_da2ab413cfe5481d9abe4f23eeaeb426` · [PNG](<../medium/flows/Logging in/screens/03_sc_da2ab413cfe5481d9abe4f23eeaeb426.png>) · [분석](<../medium/flows/Logging in/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s171>).
- 조건: Main/Profile 또는 Library guest → AuthDialogs → 이메일 signup/login/code; Profile/Settings → Sign out. mockUsers + emailAuthSource; 개인정보·원본 인증코드 복사 없이 합성 테스트값 사용. 상세 조건은 [S171 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s171>).
- FE: [auth/AuthDialogs.tsx](<../FE/src/features/auth/AuthDialogs.tsx>) · [auth/EmailLogin.tsx](<../FE/src/features/auth/EmailLogin.tsx>) · [auth/createEmailAttempt.ts](<../FE/src/features/auth/createEmailAttempt.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V29 인증·로그아웃](#v29).
- 판정: 로컬 화면/상태 연결 확인; V29의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 실제 OAuth·메일 발송/소유권 확인·Supabase 세션·프로세스 재시작 복원 없음.
- 전이: [T-F52-03](#t-f52-03). 계약: [C46](#c46) · [C47](#c47) · [C48](#c48) · [C67](#c67). 미확인: [U-S171](#u-s171) · [U-F52](#u-f52). 인계 [H01](#h01).

<a id="s172"></a>

### S172 — 저장 아이콘 활성

- 원본: `sc_dda8e78e9eb943629d3cf54eaed5fc22` · [PNG](<../medium/flows/Home/Story detail/Saving a story/screens/03_sc_dda8e78e9eb943629d3cf54eaed5fc22.png>) · [분석](<../medium/flows/Home/Story detail/Saving a story/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s172>).
- 조건: Article 하단 저장 → Save to → Reading list 선택 → Done/닫기. BookmarkSource·UserListStore; reading-list 체크와 canonical articleId. 상세 조건은 [S172 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s172>).
- FE: [bookmarks/ArticleBookmarkControl.tsx](<../FE/src/features/bookmarks/ArticleBookmarkControl.tsx>) · [bookmarks/SaveToListSheet.tsx](<../FE/src/features/bookmarks/SaveToListSheet.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V22 기사 저장](#v22).
- 판정: 로컬 화면/상태 연결 확인; V22의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 사용자 결정대로 목록 사이 구분선만 제거, 헤더/Create new list 구분선 유지; 실제 서버 저장 없음.
- 전이: [T-F37-03](#t-f37-03). 계약: [C28](#c28). 미확인: [U-S172](#u-s172) · [U-F37](#u-f37). 인계 [H04](#h04).

<a id="s173"></a>

### S173 — 설정 상단

- 원본: `sc_ddd51660cb8346a1b200ed970a2d5c45` · [PNG](<../medium/flows/Profile/Settings/screens/02_sc_ddd51660cb8346a1b200ed970a2d5c45.png>) · [분석](<../medium/flows/Profile/Settings/ANALYSIS.md>) · [R 16개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s173>).
- 조건: Profile/Settings → Account/Appearance/App icon/각 상세 → 복귀. DisplaySettingsSource·AppIconAdapter; 자체 K 아이콘, S075 원본과 비동등. 상세 조건은 [S173 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s173>).
- FE: [app-icon/AppIconScreen.tsx](<../FE/src/features/app-icon/AppIconScreen.tsx>) · [settings/SettingsExtrasScreen.tsx](<../FE/src/features/settings/SettingsExtrasScreen.tsx>) · [settings/SettingsScreen.tsx](<../FE/src/features/settings/SettingsScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V33 설정·앱 아이콘](#v33).
- 판정: 로컬 화면/상태 연결 확인; V33의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 계정/Facebook은 mock; 앱 아이콘 어댑터는 모듈 가용성에 따름. 현재 아이콘 모양 확정으로 수정 대상 아님.
- 전이: [T-F58-02](#t-f58-02) · [T-F59-01](#t-f59-01) · [T-F60-01](#t-f60-01) · [T-F62-01](#t-f62-01). 계약: [C02](#c02) · [C66](#c66) · [C67](#c67) · [C68](#c68) · [C69](#c69). 미확인: [U-S173](#u-s173) · [U-F58](#u-f58) · [U-F59](#u-f59) · [U-F60](#u-f60) · [U-F62](#u-f62). 인계 [H09](#h09).

<a id="s174"></a>

### S174 — 팔로우 추천 가로 스크롤

- 원본: `sc_dfdd5f6377a848c59b3512417cb47490` · [PNG](<../medium/flows/Explore/screens/06_sc_dfdd5f6377a848c59b3512417cb47490.png>) · [분석](<../medium/flows/Explore/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s174>).
- 조건: Main/Explore → 검색 진입·Mindfulness 입력·Stories; Staff Picks/Who to follow 위치까지 세로·가로 이동. mediumFeedFixtures / SearchScreen·CatalogSearchResults; 칩·캐러셀 위치는 화면별 설정. 상세 조건은 [S174 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s174>).
- FE: [search/CatalogSearchResults.tsx](<../FE/src/features/search/CatalogSearchResults.tsx>) · [search/ExploreSections.tsx](<../FE/src/features/search/ExploreSections.tsx>) · [search/SearchScreen.tsx](<../FE/src/features/search/SearchScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V02 탐색·검색](#v02).
- 판정: 로컬 화면/상태 연결 확인; V02의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 검색 정렬·카테고리 계층은 자체 정책; 일부만 캡처된 Staff Pick은 안내로 처리하고 본문을 생성하지 않음.
- 전이: [T-F01-06](#t-f01-06). 계약: [C06](#c06) · [C07](#c07). 미확인: [U-S174](#u-s174) · [U-F01](#u-f01). 인계 [H06](#h06).

<a id="s175"></a>

### S175 — 본문 아래 응답 미리보기

- 원본: `sc_e1a92b59829c4678b3362d2dc6abae59` · [PNG](<../medium/flows/Home/Story detail/screens/05_sc_e1a92b59829c4678b3362d2dc6abae59.png>) · [분석](<../medium/flows/Home/Story detail/ANALYSIS.md>) · [R 8개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_07.md#s175>).
- 조건: Home/Explore 기사 → Article(articleId); 본문·말미·응답 미리보기까지 스크롤; 박수 조작. medium-brain 기본 기사; F16의834와 박수 흐름832는 독립 response fixture. 상세 조건은 [S175 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s175>).
- FE: [article/ArticleDetailScreen.tsx](<../FE/src/features/article/ArticleDetailScreen.tsx>) · [article/ReferenceArticleView.tsx](<../FE/src/features/article/ReferenceArticleView.tsx>) · [reactions/ClapControl.tsx](<../FE/src/features/reactions/ClapControl.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V13 기사 읽기·반응](#v13).
- 판정: 로컬 화면/상태 연결 확인; V13의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 일부 기사는 전체 본문 미수록 안내만 제공. 누적 반응 모델은 유지하고 하트 모양은 사용자 확정; 서버 집계 없음.
- 전이: [T-F16-05](#t-f16-05). 계약: [C09](#c09) · [C10](#c10) · [C11](#c11) · [C12](#c12). 미확인: [U-S175](#u-s175) · [U-F16](#u-f16). 인계 [H03](#h03).

<a id="s176"></a>

### S176 — Featured 빈 상태

- 원본: `sc_e1cf4be8210f432098943d8a233d9d72` · [PNG](<../medium/flows/Home/screens/03_sc_e1cf4be8210f432098943d8a233d9d72.png>) · [분석](<../medium/flows/Home/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s176>).
- 조건: Main/Home → For you·Featured 선택; S026은 헤더가 접힌 하단 카드, S176은 Featured 빈 상태. mediumFeedFixtures / feedPreviewScenario(normal); Featured empty는 별도 feedSource 필요. 상세 조건은 [S176 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s176>).
- FE: [community/FollowingFeed.tsx](<../FE/src/features/community/FollowingFeed.tsx>) · [feed/HomeFeedScreen.tsx](<../FE/src/features/feed/HomeFeedScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V01 홈](#v01).
- 판정: 로컬 화면/상태 연결 확인; V01의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 추천·개인화·페이지 데이터는 fixture; 원본 시점별 기사·집계·스크롤과 현재 상태의 일치는 별도 미확인.
- 전이: [T-F05-03](#t-f05-03). 계약: [C04](#c04) · [C05](#c05). 미확인: [U-S176](#u-s176) · [U-F05](#u-f05). 인계 [H06](#h06).

<a id="s177"></a>

### S177 — 리스트 상세 스크롤

- 원본: `sc_e20e59ee459b4a0d9a0a0302091962bd` · [PNG](<../medium/flows/Library/List detail/Adding a note/screens/01_sc_e20e59ee459b4a0d9a0a0302091962bd.png>) · [분석](<../medium/flows/Library/List detail/Adding a note/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s177>).
- 조건: Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo. UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; source 확정 updatedAt;14/6/1초 독립 조건. 상세 조건은 [S177 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s177>).
- FE: [bookmarks/ListActions.tsx](<../FE/src/features/bookmarks/ListActions.tsx>) · [bookmarks/ListEditorSheet.tsx](<../FE/src/features/bookmarks/ListEditorSheet.tsx>) · [bookmarks/ListNoteSheet.tsx](<../FE/src/features/bookmarks/ListNoteSheet.tsx>) · [bookmarks/ListStoryCard.tsx](<../FE/src/features/bookmarks/ListStoryCard.tsx>) · [bookmarks/ReadingListScreen.tsx](<../FE/src/features/bookmarks/ReadingListScreen.tsx>) · [bookmarks/ReorderListEditor.tsx](<../FE/src/features/bookmarks/ReorderListEditor.tsx>) · [bookmarks/createUserListStore.ts](<../FE/src/features/bookmarks/createUserListStore.ts>) · [bookmarks/listTypes.ts](<../FE/src/features/bookmarks/listTypes.ts>) · [bookmarks/ListDetailMetadata.tsx](<../FE/src/features/bookmarks/ListDetailMetadata.tsx>) · [bookmarks/LibrarySheet.tsx](<../FE/src/features/bookmarks/LibrarySheet.tsx>) · [navigation/ReadingListRoute.tsx](<../FE/src/app/navigation/ReadingListRoute.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V25 내 목록·편집](#v25).
- 판정: 로컬 화면/상태 연결 확인; V25의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 자체 소유권/충돌/시간 정책; 기본 Reading list 삭제 제한. 실제 공유/다른 기기 정합성 미연결.
- 전이: [T-F45-01](#t-f45-01) · [T-F46-04](#t-f46-04). 계약: [C28](#c28) · [C30](#c30) · [C31](#c31) · [C32](#c32) · [C33](#c33) · [C34](#c34) · [C35](#c35). 미확인: [U-S177](#u-s177) · [U-F45](#u-f45) · [U-F46](#u-f46). 인계 [H04](#h04).

<a id="s178"></a>

### S178 — 프로필에 발행 글 표시

- 원본: `sc_e3b2276c9abd4bc7b08e6e4c322dee9e` · [PNG](<../medium/flows/Home/Publishing a story/screens/11_sc_e3b2276c9abd4bc7b08e6e4c322dee9e.png>) · [분석](<../medium/flows/Home/Publishing a story/ANALYSIS.md>) · [R 13개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s178>).
- 조건: Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save. ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도. 상세 조건은 [S178 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s178>).
- FE: [editor/WrittenStoryActions.tsx](<../FE/src/features/editor/WrittenStoryActions.tsx>) · [editor/WrittenStoryCardReactions.tsx](<../FE/src/features/editor/WrittenStoryCardReactions.tsx>) · [profile/ProfileEditorSheet.tsx](<../FE/src/features/profile/ProfileEditorSheet.tsx>) · [profile/ProfileScreen.tsx](<../FE/src/features/profile/ProfileScreen.tsx>) · [profile/ProfileStories.tsx](<../FE/src/features/profile/ProfileStories.tsx>) · [profile/PronounsEditor.tsx](<../FE/src/features/profile/PronounsEditor.tsx>) · [profile/useProfilePhotoSelection.ts](<../FE/src/features/profile/useProfilePhotoSelection.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V32 내 프로필·편집](#v32).
- 판정: 로컬 화면/상태 연결 확인; V32의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 사진은 로컬 URI/수명 관리, 업로드·서버 프로필 영속 저장 없음. 원본 OS 앨범과 Android picker 모습은 다름.
- 전이: [T-F08-11](#t-f08-11). 계약: [C51](#c51) · [C52](#c52) · [C53](#c53). 미확인: [U-S178](#u-s178) · [U-F08](#u-f08). 인계 [H09](#h09).

<a id="s179"></a>

### S179 — 박수 피드백 종료

- 원본: `sc_e3b85b46c655483eb954e6f953d0b7f6` · [PNG](<../medium/flows/Home/Story detail/Sending claps/screens/03_sc_e3b85b46c655483eb954e6f953d0b7f6.png>) · [분석](<../medium/flows/Home/Story detail/Sending claps/ANALYSIS.md>) · [R 7개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s179>).
- 조건: Home/Explore 기사 → Article(articleId); 본문·말미·응답 미리보기까지 스크롤; 박수 조작. medium-brain 기본 기사; F16의834와 박수 흐름832는 독립 response fixture. 상세 조건은 [S179 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s179>).
- FE: [article/ArticleDetailScreen.tsx](<../FE/src/features/article/ArticleDetailScreen.tsx>) · [article/ReferenceArticleView.tsx](<../FE/src/features/article/ReferenceArticleView.tsx>) · [reactions/ClapControl.tsx](<../FE/src/features/reactions/ClapControl.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V13 기사 읽기·반응](#v13).
- 판정: 로컬 화면/상태 연결 확인; V13의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 일부 기사는 전체 본문 미수록 안내만 제공. 누적 반응 모델은 유지하고 하트 모양은 사용자 확정; 서버 집계 없음.
- 전이: [T-F38-03](#t-f38-03). 계약: [C09](#c09) · [C10](#c10) · [C11](#c11) · [C12](#c12). 미확인: [U-S179](#u-s179) · [U-F38](#u-f38). 인계 [H03](#h03).

<a id="s180"></a>

### S180 — 멘션 입력 시작

- 원본: `sc_e3c9949b35ca4bc7b3328ee4e887fc5a` · [PNG](<../medium/flows/Home/Publishing a story/Mentioning a user/screens/02_sc_e3c9949b35ca4bc7b3328ee4e887fc5a.png>) · [분석](<../medium/flows/Home/Publishing a story/Mentioning a user/ANALYSIS.md>) · [R 7개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s180>).
- 조건: Editor 본문 @ → samlee → 후보 선택 → Sam Lee 삽입. mention 검색 source와 문서 snapshot; S015 문자열 위치·키보드 별도. 상세 조건은 [S180 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s180>).
- FE: [editor/DocumentReader.tsx](<../FE/src/features/editor/DocumentReader.tsx>) · [editor/MentionSuggestions.tsx](<../FE/src/features/editor/MentionSuggestions.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V10 멘션](#v10).
- 판정: 로컬 화면/상태 연결 확인; V10의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 후보는 fixture; 실제 사용자 검색·알림 전송 없음. 멘션 삽입 중 Undo/Redo 숨김/복귀 보정.
- 전이: [T-F11-02](#t-f11-02). 계약: [C43](#c43). 미확인: [U-S180](#u-s180) · [U-F11](#u-f11). 인계 [H02](#h02).

<a id="s181"></a>

### S181 — 본인 응답 관리 메뉴

- 원본: `sc_e4b254a2635b47069e314a1462c985d6` · [PNG](<../medium/flows/Home/Story detail/Responses/Commenting a story/Deleting a response/screens/02_sc_e4b254a2635b47069e314a1462c985d6.png>) · [분석](<../medium/flows/Home/Story detail/Responses/Commenting a story/Deleting a response/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s181>).
- 조건: Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond. ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태. 상세 조건은 [S181 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s181>).
- FE: [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V20 응답·답글](#v20).
- 판정: 로컬 화면/상태 연결 확인; V20의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: source 메모리 저장·자체 깊이/정렬/집계; 실제 타 사용자 조회·서버 소유권 검증·알림 없음.
- 전이: [T-F32-02](#t-f32-02) · [T-F33-02](#t-f33-02). 계약: [C14](#c14) · [C15](#c15) · [C16](#c16) · [C17](#c17) · [C18](#c18) · [C20](#c20). 미확인: [U-S181](#u-s181) · [U-F32](#u-f32) · [U-F33](#u-f33). 인계 [H05](#h05).

<a id="s182"></a>

### S182 — 로그인 수단 선택

- 원본: `sc_e4d414380a1047a2b7970cf7869a0866` · [PNG](<../medium/flows/Logging in/screens/02_sc_e4d414380a1047a2b7970cf7869a0866.png>) · [분석](<../medium/flows/Logging in/ANALYSIS.md>) · [R 8개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s182>).
- 조건: Main/Profile 또는 Library guest → AuthDialogs → 이메일 signup/login/code; Profile/Settings → Sign out. mockUsers + emailAuthSource; 개인정보·원본 인증코드 복사 없이 합성 테스트값 사용. 상세 조건은 [S182 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s182>).
- FE: [auth/AuthDialogs.tsx](<../FE/src/features/auth/AuthDialogs.tsx>) · [auth/EmailLogin.tsx](<../FE/src/features/auth/EmailLogin.tsx>) · [auth/createEmailAttempt.ts](<../FE/src/features/auth/createEmailAttempt.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V29 인증·로그아웃](#v29).
- 판정: 로컬 화면/상태 연결 확인; V29의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 실제 OAuth·메일 발송/소유권 확인·Supabase 세션·프로세스 재시작 복원 없음.
- 전이: [T-F52-02](#t-f52-02). 계약: [C46](#c46) · [C47](#c47) · [C48](#c48) · [C67](#c67). 미확인: [U-S182](#u-s182) · [U-F52](#u-f52). 인계 [H01](#h01).

<a id="s183"></a>

### S183 — 인용 서식 적용

- 원본: `sc_e5826f356093493a86c19716420e8fdf` · [PNG](<../medium/flows/Home/Publishing a story/Changing text format/screens/03_sc_e5826f356093493a86c19716420e8fdf.png>) · [분석](<../medium/flows/Home/Publishing a story/Changing text format/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s183>).
- 조건: Home 작성 → Editor; 제목·본문 입력 → 해당 서식·이미지 블록 선택. DraftSource·EditorSession; 음악 제목/단락/인용/목록/구분선은 각 S의 문서 snapshot 별도. 상세 조건은 [S183 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s183>).
- FE: [editor/RichDocumentBody.tsx](<../FE/src/features/editor/RichDocumentBody.tsx>) · [editor/StoryEditorScreen.tsx](<../FE/src/features/editor/StoryEditorScreen.tsx>) · [editor/editorModel.ts](<../FE/src/features/editor/editorModel.ts>) · [editor/RichBody.tsx](<../FE/src/features/editor/RichBody.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V07 편집기 서식](#v07).
- 판정: 로컬 화면/상태 연결 확인; V07의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 인용선 18dp·사진 선택 모드 여백/모드 전환 재선택 차이; 원본의 사진 경계 선택 방식은 미수록.
- 전이: [T-F09-03](#t-f09-03). 계약: [C40](#c40). 미확인: [U-S183](#u-s183) · [U-F09](#u-f09). 인계 [H02](#h02).

<a id="s184"></a>

### S184 — 알림 활성화 안내

- 원본: `sc_e9f4c426cfb3426d9ca05121dea00ce3` · [PNG](<../medium/flows/Onboarding/screens/11_sc_e9f4c426cfb3426d9ca05121dea00ce3.png>) · [분석](<../medium/flows/Onboarding/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s184>).
- 조건: guest signup → Onboarding → interests → recommendations → permission → welcome; S043은 실제 cold start. OnboardingSource·NotificationPermissionSource; 관심5개/추천Follow/안내 상태; S043 대응 splash 없음. 상세 조건은 [S184 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s184>).
- FE: [onboarding/OnboardingScreen.tsx](<../FE/src/features/onboarding/OnboardingScreen.tsx>) · [onboarding/createOnboardingSession.ts](<../FE/src/features/onboarding/createOnboardingSession.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V30 온보딩·시작](#v30).
- 판정: 로컬 화면/상태 연결 확인; V30의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 시작은 대체 워드마크, 온보딩 저장은 mock; 캡처를 신규 가입 전용으로 단정하지 않음.
- 전이: [T-F53-11](#t-f53-11). 계약: [C49](#c49) · [C50](#c50). 미확인: [U-S184](#u-s184) · [U-F53](#u-f53). 인계 [H01](#h01).

<a id="s185"></a>

### S185 — 다크 Explore

- 원본: `sc_eaaa223bd5c84facb010485d0f797e76` · [PNG](<../medium/flows/Profile/Settings/Switching to dark mode/screens/04_sc_eaaa223bd5c84facb010485d0f797e76.png>) · [분석](<../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s185>).
- 조건: Main/Explore → 검색 진입·Mindfulness 입력·Stories; Staff Picks/Who to follow 위치까지 세로·가로 이동. mediumFeedFixtures / SearchScreen·CatalogSearchResults; 칩·캐러셀 위치는 화면별 설정. 상세 조건은 [S185 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s185>).
- FE: [search/CatalogSearchResults.tsx](<../FE/src/features/search/CatalogSearchResults.tsx>) · [search/ExploreSections.tsx](<../FE/src/features/search/ExploreSections.tsx>) · [search/SearchScreen.tsx](<../FE/src/features/search/SearchScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V02 탐색·검색](#v02).
- 판정: 로컬 화면/상태 연결 확인; V02의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 검색 정렬·카테고리 계층은 자체 정책; 일부만 캡처된 Staff Pick은 안내로 처리하고 본문을 생성하지 않음.
- 전이: [T-F62-04](#t-f62-04). 계약: [C06](#c06) · [C07](#c07). 미확인: [U-S185](#u-s185) · [U-F62](#u-f62). 인계 [H06](#h06).

<a id="s186"></a>

### S186 — 푸시 알림 상세 설정

- 원본: `sc_ee2e76b092df4d309bfd0633f25273a6` · [PNG](<../medium/flows/Profile/Settings/Changing notification settings/screens/02_sc_ee2e76b092df4d309bfd0633f25273a6.png>) · [분석](<../medium/flows/Profile/Settings/Changing notification settings/ANALYSIS.md>) · [R 16개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s186>).
- 조건: Digest 설정 또는 Profile/Settings → Email/Push → NotificationSettings(section). NotificationSource·설정 source; Daily/PushOn/EmailOn와 개별 토글 상태. 상세 조건은 [S186 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s186>).
- FE: [notifications/NotificationSettingsScreen.tsx](<../FE/src/features/notifications/NotificationSettingsScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V28 Digest·Push 설정](#v28).
- 판정: 로컬 화면/상태 연결 확인; V28의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: OS 권한과 원격 토큰 등록/푸시 전송은 별개; 실제 메일/Push 미연결, 원본 잘린 하단 항목 미확인.
- 전이: [T-F59-02](#t-f59-02). 계약: [C39](#c39) · [C50](#c50) · [C56](#c56) · [C57](#c57) · [C67](#c67). 미확인: [U-S186](#u-s186) · [U-F59](#u-f59). 인계 [H07](#h07).

<a id="s187"></a>

### S187 — 설정 닫힌 다크 기사

- 원본: `sc_ee957cf03e9848948f9ec8189264d8d8` · [PNG](<../medium/flows/Home/Story detail/Changing display/screens/08_sc_ee957cf03e9848948f9ec8189264d8d8.png>) · [분석](<../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>) · [R 12개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s187>).
- 조건: Home/Explore 기사 → Article(articleId); 본문·말미·응답 미리보기까지 스크롤; 박수 조작. medium-brain 기본 기사; F16의834와 박수 흐름832는 독립 response fixture. 상세 조건은 [S187 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s187>).
- FE: [article/ArticleDetailScreen.tsx](<../FE/src/features/article/ArticleDetailScreen.tsx>) · [article/ReferenceArticleView.tsx](<../FE/src/features/article/ReferenceArticleView.tsx>) · [reactions/ClapControl.tsx](<../FE/src/features/reactions/ClapControl.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V13 기사 읽기·반응](#v13).
- 판정: 로컬 화면/상태 연결 확인; V13의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 일부 기사는 전체 본문 미수록 안내만 제공. 누적 반응 모델은 유지하고 하트 모양은 사용자 확정; 서버 집계 없음.
- 전이: [T-F24-08](#t-f24-08). 계약: [C09](#c09) · [C10](#c10) · [C11](#c11) · [C12](#c12). 미확인: [U-S187](#u-s187) · [U-F24](#u-f24). 인계 [H03](#h03).

<a id="s188"></a>

### S188 — 월간 글 통계

- 원본: `sc_eece99396c944a4fac5e50820715f00a` · [PNG](<../medium/flows/Profile/Story stats/screens/02_sc_eece99396c944a4fac5e50820715f00a.png>) · [분석](<../medium/flows/Profile/Story stats/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s188>).
- 조건: Profile → View stats → StoryStats → Monthly/Lifetime·날짜·글 선택. StoryStatsSource; June1–13 UTC11/2와 글 Lifetime0/0 독립 initial/asOf fixture. 상세 조건은 [S188 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s188>).
- FE: [story-stats/StoryStatsScreen.tsx](<../FE/src/features/story-stats/StoryStatsScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V34 글 통계](#v34).
- 판정: 로컬 화면/상태 연결 확인; V34의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 통계 fixture/자체 UTC 정책; 실제 이벤트 수집·분석/정산 없음, 과거 11/2와 현재 0/미집계 차이 유지.
- 전이: [T-F63-02](#t-f63-02). 계약: [C54](#c54). 미확인: [U-S188](#u-s188) · [U-F63](#u-f63). 인계 [H10](#h10).

<a id="s189"></a>

### S189 — 기사 본문 스크롤

- 원본: `sc_f4b06612bdbf48ecbd8a7b6e2607d117` · [PNG](<../medium/flows/Home/Story detail/screens/03_sc_f4b06612bdbf48ecbd8a7b6e2607d117.png>) · [분석](<../medium/flows/Home/Story detail/ANALYSIS.md>) · [R 10개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s189>).
- 조건: Home/Explore 기사 → Article(articleId); 본문·말미·응답 미리보기까지 스크롤; 박수 조작. medium-brain 기본 기사; F16의834와 박수 흐름832는 독립 response fixture. 상세 조건은 [S189 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s189>).
- FE: [article/ArticleDetailScreen.tsx](<../FE/src/features/article/ArticleDetailScreen.tsx>) · [article/ReferenceArticleView.tsx](<../FE/src/features/article/ReferenceArticleView.tsx>) · [reactions/ClapControl.tsx](<../FE/src/features/reactions/ClapControl.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V13 기사 읽기·반응](#v13).
- 판정: 로컬 화면/상태 연결 확인; V13의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 일부 기사는 전체 본문 미수록 안내만 제공. 누적 반응 모델은 유지하고 하트 모양은 사용자 확정; 서버 집계 없음.
- 전이: [T-F16-03](#t-f16-03) · [T-F25-01](#t-f25-01). 계약: [C09](#c09) · [C10](#c10) · [C11](#c11) · [C12](#c12). 미확인: [U-S189](#u-s189) · [U-F16](#u-f16) · [U-F25](#u-f25). 인계 [H03](#h03).

<a id="s190"></a>

### S190 — 읽기 기록 목록

- 원본: `sc_f4bb3fa34f32466b9bd12eea57ea518f` · [PNG](<../medium/flows/Home/Refine recommendations/screens/03_sc_f4bb3fa34f32466b9bd12eea57ea518f.png>) · [분석](<../medium/flows/Home/Refine recommendations/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s190>).
- 조건: 개발 웹 /?parityHistory=reference-v1 → mock A → Profile/Settings → Refine recommendations → Reading history → 카드·삭제·Clear history; 일반 방문은 Library 이력 경로도 확인. ReadingHistorySource + reactive 카탈로그; Parity 4의 명시적 reference-v1 seed는 알려진 세 기사와 합성 방문 시각만 제공; 원본 중간 카드·집계 차이는 V12 잔여; D03/D05 연결 검증은 FE_MEDIUM_PARITY_04_RESULT 참조. 상세 조건은 [S190 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s190>).
- FE: [reading-history/ReadingHistoryList.tsx](<../FE/src/features/reading-history/ReadingHistoryList.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V12 읽기 이력](#v12).
- 판정: 로컬 화면/상태 연결 확인; V12의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 이력 삭제 후 Undo는 미지원이며 원본 실행 근거도 없음(Q05); 보존 기간/기기 동기화 미정.
- 전이: [T-F12-03](#t-f12-03) · [T-F14-01](#t-f14-01) · [T-F15-01](#t-f15-01). 계약: [C11](#c11) · [C25](#c25) · [C27](#c27) · [C37](#c37). 미확인: [U-S190](#u-s190) · [U-F12](#u-f12) · [U-F14](#u-f14) · [U-F15](#u-f15). 인계 [H03](#h03).

<a id="s191"></a>

### S191 — 메모 내용 입력

- 원본: `sc_f4f970015d6743538664901310d2c17b` · [PNG](<../medium/flows/Library/List detail/Adding a note/screens/04_sc_f4f970015d6743538664901310d2c17b.png>) · [분석](<../medium/flows/Library/List detail/Adding a note/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s191>).
- 조건: Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo. UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; source 확정 updatedAt;14/6/1초 독립 조건. 상세 조건은 [S191 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s191>).
- FE: [bookmarks/ListActions.tsx](<../FE/src/features/bookmarks/ListActions.tsx>) · [bookmarks/ListEditorSheet.tsx](<../FE/src/features/bookmarks/ListEditorSheet.tsx>) · [bookmarks/ListNoteSheet.tsx](<../FE/src/features/bookmarks/ListNoteSheet.tsx>) · [bookmarks/ListStoryCard.tsx](<../FE/src/features/bookmarks/ListStoryCard.tsx>) · [bookmarks/ReadingListScreen.tsx](<../FE/src/features/bookmarks/ReadingListScreen.tsx>) · [bookmarks/ReorderListEditor.tsx](<../FE/src/features/bookmarks/ReorderListEditor.tsx>) · [bookmarks/createUserListStore.ts](<../FE/src/features/bookmarks/createUserListStore.ts>) · [bookmarks/listTypes.ts](<../FE/src/features/bookmarks/listTypes.ts>) · [bookmarks/ListDetailMetadata.tsx](<../FE/src/features/bookmarks/ListDetailMetadata.tsx>) · [bookmarks/LibrarySheet.tsx](<../FE/src/features/bookmarks/LibrarySheet.tsx>) · [navigation/ReadingListRoute.tsx](<../FE/src/app/navigation/ReadingListRoute.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V25 내 목록·편집](#v25).
- 판정: 로컬 화면/상태 연결 확인; V25의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 자체 소유권/충돌/시간 정책; 기본 Reading list 삭제 제한. 실제 공유/다른 기기 정합성 미연결.
- 전이: [T-F45-04](#t-f45-04). 계약: [C28](#c28) · [C30](#c30) · [C31](#c31) · [C32](#c32) · [C33](#c33) · [C34](#c34) · [C35](#c35). 미확인: [U-S191](#u-s191) · [U-F45](#u-f45). 인계 [H04](#h04).

<a id="s192"></a>

### S192 — 음성 선택 후 플레이어

- 원본: `sc_f637c648d6ec470a81cf77e5594e02da` · [PNG](<../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/06_sc_f637c648d6ec470a81cf77e5594e02da.png>) · [분석](<../medium/flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>) · [R 13개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s192>).
- 조건: Article Listen → 미니 플레이어 → 확장 → 재생·정지·seek·닫기. ListeningSource·mock 시계; 00:05/00:10/00:20/00:40 각 snapshot과 duration 독립. 상세 조건은 [S192 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s192>).
- FE: [listening/ListeningPlayer.tsx](<../FE/src/features/listening/ListeningPlayer.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V18 오디오 플레이어](#v18).
- 판정: 로컬 화면/상태 연결 확인; V18의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 이전/다음 트랙 비활성·실제 음성 없음. 지원/한계: silent-mock; 실제 TTS/음원·백그라운드/오프라인 재생 없음, 이전/다음 큐 버튼 비활성.
- 전이: [T-F28-06](#t-f28-06). 계약: [C58](#c58) · [C59](#c59) · [C61](#c61) · [C66](#c66). 미확인: [U-S192](#u-s192) · [U-F28](#u-f28). 인계 [H08](#h08).

<a id="s193"></a>

### S193 — 다이제스트 날짜 선택

- 원본: `sc_f647f3c6b04d48e9bb1b31f5d0fb2cfe` · [PNG](<../medium/flows/Library/Filtering digest/screens/02_sc_f647f3c6b04d48e9bb1b31f5d0fb2cfe.png>) · [분석](<../medium/flows/Library/Filtering digest/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s193>).
- 조건: Main/Library → Digest → 날짜 선택 → June12/June8 → 닫기. digestFixtures/replaceIssues; June12 love/jeremiah, June8 Goodbye Notion/xeladu·Alex; 다른 호는 자체 mock, 사진·응답 snapshot 차이 잔여. 상세 조건은 [S193 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s193>).
- FE: [bookmarks/LibraryScreen.tsx](<../FE/src/features/bookmarks/LibraryScreen.tsx>) · [community/IdentityLink.tsx](<../FE/src/features/community/IdentityLink.tsx>) · [digest/DigestPanel.tsx](<../FE/src/features/digest/DigestPanel.tsx>) · [notifications/NotificationSettingsScreen.tsx](<../FE/src/features/notifications/NotificationSettingsScreen.tsx>) · [reactions/ClapControl.tsx](<../FE/src/features/reactions/ClapControl.tsx>) · [responses/ResponseButton.tsx](<../FE/src/features/responses/ResponseButton.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V27 Digest](#v27).
- 판정: 로컬 화면/상태 연결 확인; V27의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: fixture 호/날짜·자체 필터 정책; 실제 배포/이메일 Digest 생성·전송 없음.
- 전이: [T-F43-02](#t-f43-02). 계약: [C37](#c37) · [C38](#c38). 미확인: [U-S193](#u-s193) · [U-F43](#u-f43). 인계 [H07](#h07).

<a id="s194"></a>

### S194 — 추천 유형 필터 메뉴

- 원본: `sc_f978feb6af9f44b5a5fa8f514899f3da` · [PNG](<../medium/flows/Home/Refine recommendations/Filtering suggestions/screens/02_sc_f978feb6af9f44b5a5fa8f514899f3da.png>) · [분석](<../medium/flows/Home/Refine recommendations/Filtering suggestions/ANALYSIS.md>) · [R 7개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s194>).
- 조건: Home 더보기/Refine recommendations → Recommendations → Following/Reading history/Muted/Suggestions → All·Topics 등 필터. RelationshipSource·ModerationSource·TopicSource + useIdentityCatalog(DirectorySource/mockUsers/확정 공개 프로필); Writers1/Topics3는 UI 팔로우로 구성, 숫자와 목록·해제를 함께 확인. 상세 조건은 [S194 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s194>).
- FE: [recommendations/RefineRecommendationsScreen.tsx](<../FE/src/features/recommendations/RefineRecommendationsScreen.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V11 추천 관리](#v11).
- 판정: 로컬 화면/상태 연결 확인; V11의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 추천 알고리즘·개인화 영속성 없음. 별도 원본 시점의 계정 상태를 한 세션 결과로 합치지 않음.
- 전이: [T-F13-02](#t-f13-02). 계약: [C05](#c05) · [C12](#c12) · [C25](#c25) · [C26](#c26). 미확인: [U-S194](#u-s194) · [U-F13](#u-f13). 인계 [H06](#h06).

<a id="s195"></a>

### S195 — 리스트 항목 메뉴

- 원본: `sc_fa4e79f0bed747d698ae44e23f9223f9` · [PNG](<../medium/flows/Library/List detail/Adding a note/screens/02_sc_fa4e79f0bed747d698ae44e23f9223f9.png>) · [분석](<../medium/flows/Library/List detail/Adding a note/ANALYSIS.md>) · [R 6개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s195>).
- 조건: Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo. UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; source 확정 updatedAt;14/6/1초 독립 조건. 상세 조건은 [S195 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s195>).
- FE: [bookmarks/ListActions.tsx](<../FE/src/features/bookmarks/ListActions.tsx>) · [bookmarks/ListEditorSheet.tsx](<../FE/src/features/bookmarks/ListEditorSheet.tsx>) · [bookmarks/ListNoteSheet.tsx](<../FE/src/features/bookmarks/ListNoteSheet.tsx>) · [bookmarks/ListStoryCard.tsx](<../FE/src/features/bookmarks/ListStoryCard.tsx>) · [bookmarks/ReadingListScreen.tsx](<../FE/src/features/bookmarks/ReadingListScreen.tsx>) · [bookmarks/ReorderListEditor.tsx](<../FE/src/features/bookmarks/ReorderListEditor.tsx>) · [bookmarks/createUserListStore.ts](<../FE/src/features/bookmarks/createUserListStore.ts>) · [bookmarks/listTypes.ts](<../FE/src/features/bookmarks/listTypes.ts>) · [bookmarks/ListDetailMetadata.tsx](<../FE/src/features/bookmarks/ListDetailMetadata.tsx>) · [bookmarks/LibrarySheet.tsx](<../FE/src/features/bookmarks/LibrarySheet.tsx>) · [navigation/ReadingListRoute.tsx](<../FE/src/app/navigation/ReadingListRoute.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V25 내 목록·편집](#v25).
- 판정: 로컬 화면/상태 연결 확인; V25의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 자체 소유권/충돌/시간 정책; 기본 Reading list 삭제 제한. 실제 공유/다른 기기 정합성 미연결.
- 전이: [T-F45-02](#t-f45-02) · [T-F50-01](#t-f50-01). 계약: [C28](#c28) · [C30](#c30) · [C31](#c31) · [C32](#c32) · [C33](#c33) · [C34](#c34) · [C35](#c35). 미확인: [U-S195](#u-s195) · [U-F45](#u-f45) · [U-F50](#u-f50). 인계 [H04](#h04).

<a id="s196"></a>

### S196 — 멘션 검색 후보

- 원본: `sc_fbca217fbc1346d09deb4c0d09dac86e` · [PNG](<../medium/flows/Home/Publishing a story/Mentioning a user/screens/03_sc_fbca217fbc1346d09deb4c0d09dac86e.png>) · [분석](<../medium/flows/Home/Publishing a story/Mentioning a user/ANALYSIS.md>) · [R 4개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s196>).
- 조건: Editor 본문 @ → samlee → 후보 선택 → Sam Lee 삽입. mention 검색 source와 문서 snapshot; S015 문자열 위치·키보드 별도. 상세 조건은 [S196 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s196>).
- FE: [editor/DocumentReader.tsx](<../FE/src/features/editor/DocumentReader.tsx>) · [editor/MentionSuggestions.tsx](<../FE/src/features/editor/MentionSuggestions.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V10 멘션](#v10).
- 판정: 로컬 화면/상태 연결 확인; V10의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 후보는 fixture; 실제 사용자 검색·알림 전송 없음. 멘션 삽입 중 Undo/Redo 숨김/복귀 보정.
- 전이: [T-F11-03](#t-f11-03). 계약: [C43](#c43). 미확인: [U-S196](#u-s196) · [U-F11](#u-f11). 인계 [H02](#h02).

<a id="s197"></a>

### S197 — 구절 인용 응답 등록

- 원본: `sc_fcdcd471caeb41b8bfa89273d8e29a8d` · [PNG](<../medium/flows/Home/Story detail/Responding to a phrase/screens/04_sc_fcdcd471caeb41b8bfa89273d8e29a8d.png>) · [분석](<../medium/flows/Home/Story detail/Responding to a phrase/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s197>).
- 조건: Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond. ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태. 상세 조건은 [S197 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s197>).
- FE: [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V20 응답·답글](#v20).
- 판정: 로컬 화면/상태 연결 확인; V20의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: source 메모리 저장·자체 깊이/정렬/집계; 실제 타 사용자 조회·서버 소유권 검증·알림 없음.
- 전이: [T-F29-04](#t-f29-04). 계약: [C14](#c14) · [C15](#c15) · [C16](#c16) · [C17](#c17) · [C18](#c18) · [C20](#c20). 미확인: [U-S197](#u-s197) · [U-F29](#u-f29). 인계 [H05](#h05).

<a id="s198"></a>

### S198 — 다크 테마 적용

- 원본: `sc_fd7de1ebfba14fbca6ddbe3ff642c42c` · [PNG](<../medium/flows/Home/Story detail/Changing display/screens/06_sc_fd7de1ebfba14fbca6ddbe3ff642c42c.png>) · [분석](<../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>) · [R 8개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s198>).
- 조건: Article 더보기 → Display settings → 100/120%, font, appearance, highlights. DisplaySettingsSource; S063 기본관찰값, S125=120%, S198=Dark120%, S001=others off. 상세 조건은 [S198 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s198>).
- FE: [settings/ArticleDisplayPopover.tsx](<../FE/src/features/settings/ArticleDisplayPopover.tsx>) · [settings/useReaderTypography.ts](<../FE/src/features/settings/useReaderTypography.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V16 읽기 설정](#v16).
- 판정: 로컬 화면/상태 연결 확인; V16의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 선택 옵션/80~200 경계는 자체 정책, 원본 실제 서체 파일 0개. 기사 확대와 OS 확대 구분.
- 전이: [T-F24-06](#t-f24-06). 계약: [C02](#c02) · [C12](#c12) · [C13](#c13). 미확인: [U-S198](#u-s198) · [U-F24](#u-f24). 인계 [H03](#h03).

<a id="s199"></a>

### S199 — 작가 차단 안내

- 원본: `sc_ff143e1e9b4d4e5ab0579b3fdc61dc1a` · [PNG](<../medium/flows/Home/Story detail/Author detail/Blocking an author/screens/03_sc_ff143e1e9b4d4e5ab0579b3fdc61dc1a.png>) · [분석](<../medium/flows/Home/Story detail/Author detail/Blocking an author/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s199>).
- 조건: Identity 또는 Article 더보기 → Mute/Block/Report → 선택·확정·토스트. ModerationSource·RelationshipSource와 공통 사용자 카탈로그; S093은 별도 snapshot이며 차단 결과로 단정하지 않음; 신고/차단/음소거 별도 상태. 상세 조건은 [S199 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s199>).
- FE: [moderation/ModerationDialogs.tsx](<../FE/src/features/moderation/ModerationDialogs.tsx>) · [moderation/articleModeration.ts](<../FE/src/features/moderation/articleModeration.ts>). 추가 공통 코드/기존 검사/사용자 근거: [V15 음소거·차단·신고](#v15).
- 판정: 로컬 화면/상태 연결 확인; V15의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 앱 메모리 정책만 적용; 원본 차단 캡처의 글 잔존과 구현 접근 제한 차이, 실제 신고 접수/제재 없음.
- 전이: [T-F18-03](#t-f18-03). 계약: [C12](#c12) · [C18](#c18) · [C23](#c23) · [C24](#c24) · [C61](#c61). 미확인: [U-S199](#u-s199) · [U-F18](#u-f18). 인계 [H05](#h05).

<a id="s200"></a>

### S200 — 리스트 항목 메모 폼

- 원본: `sc_ffa4d0c8f01440e1a0842a4e1a59708a` · [PNG](<../medium/flows/Library/List detail/Adding a note/screens/03_sc_ffa4d0c8f01440e1a0842a4e1a59708a.png>) · [분석](<../medium/flows/Library/List detail/Adding a note/ANALYSIS.md>) · [R 5개 원문/개별 판정](<../TODO/MEDIUM_PARITY/REQUIREMENTS_08.md#s200>).
- 조건: Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo. UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; source 확정 updatedAt;14/6/1초 독립 조건. 상세 조건은 [S200 비교 기준](<../TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md#s200>).
- FE: [bookmarks/ListActions.tsx](<../FE/src/features/bookmarks/ListActions.tsx>) · [bookmarks/ListEditorSheet.tsx](<../FE/src/features/bookmarks/ListEditorSheet.tsx>) · [bookmarks/ListNoteSheet.tsx](<../FE/src/features/bookmarks/ListNoteSheet.tsx>) · [bookmarks/ListStoryCard.tsx](<../FE/src/features/bookmarks/ListStoryCard.tsx>) · [bookmarks/ReadingListScreen.tsx](<../FE/src/features/bookmarks/ReadingListScreen.tsx>) · [bookmarks/ReorderListEditor.tsx](<../FE/src/features/bookmarks/ReorderListEditor.tsx>) · [bookmarks/createUserListStore.ts](<../FE/src/features/bookmarks/createUserListStore.ts>) · [bookmarks/listTypes.ts](<../FE/src/features/bookmarks/listTypes.ts>) · [bookmarks/ListDetailMetadata.tsx](<../FE/src/features/bookmarks/ListDetailMetadata.tsx>) · [bookmarks/LibrarySheet.tsx](<../FE/src/features/bookmarks/LibrarySheet.tsx>) · [navigation/ReadingListRoute.tsx](<../FE/src/app/navigation/ReadingListRoute.tsx>). 추가 공통 코드/기존 검사/사용자 근거: [V25 내 목록·편집](#v25).
- 판정: 로컬 화면/상태 연결 확인; V25의 모의·플랫폼 경계를 적용. Android 현 디자인/조작 수용, 원본 이 상태의 픽셀·값·정확 전이 동일성은 미확인. 지원/한계: 자체 소유권/충돌/시간 정책; 기본 Reading list 삭제 제한. 실제 공유/다른 기기 정합성 미연결.
- 전이: [T-F45-03](#t-f45-03). 계약: [C28](#c28) · [C30](#c30) · [C31](#c31) · [C32](#c32) · [C33](#c33) · [C34](#c34) · [C35](#c35). 미확인: [U-S200](#u-s200) · [U-F45](#u-f45). 인계 [H04](#h04).

<a id="flows"></a>

## 흐름 63개 · 단계 273개 판정

각 T의 현재 판정은 해당 S/V의 코드·기존 사용자/자동 검사와 경계를 참조한다. 원본 미수록 앞뒤 조작은 미확인이다. 이 표의 연결 완료를 273개 실제 전이의 신규 재현 통과로 읽지 않는다. 정확한 이전→현재 관찰/수용 문장은 기존 FLOWS의 각 T에서 보존했다.

<a id="f01"></a>

### F01 — Explore

[원본 분석](<../medium/flows/Explore/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f01>) · [U-F01](#u-f01).

현재 경로/기존 검사: [search/SearchScreen.tsx](<../FE/src/features/search/SearchScreen.tsx>) · [search/CatalogSearchResults.tsx](<../FE/src/features/search/CatalogSearchResults.tsx>) · [navigation/SearchNavigation.test.tsx](<../FE/src/app/navigation/SearchNavigation.test.tsx>) · [navigation/SearchCategoriesNavigation.test.tsx](<../FE/src/app/navigation/SearchCategoriesNavigation.test.tsx>). 기능 경계: [V01](#v01) · [V02](#v02). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f01-01"></a>`T-F01-01` | [S069 For you 홈 피드](#s069) · [단계 PNG](<../medium/flows/Explore/screens/01_sc_5e0ba0e498ff49579bf838096aec4b5e.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f01-01>) | 상태: 추천 기사 목록. [V01](#v01) 구현 연결; 해당 모의·미지원·차이 적용. [U-F01](#u-f01)의 미수록 전이는 미확인 |
| <a id="t-f01-02"></a>`T-F01-02` | [S021 Explore 첫 화면](#s021) · [단계 PNG](<../medium/flows/Explore/screens/02_sc_1c3e4349171248378eada528f7942269.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f01-02>) | 상태: 발견 탐색. [V02](#v02) 구현 연결; 해당 모의·미지원·차이 적용. [U-F01](#u-f01)의 미수록 전이는 미확인 |
| <a id="t-f01-03"></a>`T-F01-03` | [S070 Explore 토픽 가로 이동](#s070) · [단계 PNG](<../medium/flows/Explore/screens/03_sc_602f368bf00a46b8b57d68f964ed6c16.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f01-03>) | 상태: 가로 탐색 상태. [V02](#v02) 구현 연결; 해당 모의·미지원·차이 적용. [U-F01](#u-f01)의 미수록 전이는 미확인 |
| <a id="t-f01-04"></a>`T-F01-04` | [S053 편집 추천과 개인 추천](#s053) · [단계 PNG](<../medium/flows/Explore/screens/04_sc_4352273aa0654f939705613dfa224e75.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f01-04>) | 상태: 발견 페이지 중간. [V02](#v02) 구현 연결; 해당 모의·미지원·차이 적용. [U-F01](#u-f01)의 미수록 전이는 미확인 |
| <a id="t-f01-05"></a>`T-F01-05` | [S079 팔로우 추천 카드](#s079) · [단계 PNG](<../medium/flows/Explore/screens/05_sc_6bc604f45031400d9cebd252cd89e7a2.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f01-05>) | 상태: 팔로우 대상 추천. [V02](#v02) 구현 연결; 해당 모의·미지원·차이 적용. [U-F01](#u-f01)의 미수록 전이는 미확인 |
| <a id="t-f01-06"></a>`T-F01-06` | [S174 팔로우 추천 가로 스크롤](#s174) · [단계 PNG](<../medium/flows/Explore/screens/06_sc_dfdd5f6377a848c59b3512417cb47490.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f01-06>) | 상태: 캐러셀 이동. [V02](#v02) 구현 연결; 해당 모의·미지원·차이 적용. [U-F01](#u-f01)의 미수록 전이는 미확인 |

<a id="f02"></a>

### F02 — Explore/Searching Medium

[원본 분석](<../medium/flows/Explore/Searching Medium/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f02>) · [U-F02](#u-f02).

현재 경로/기존 검사: [search/SearchScreen.tsx](<../FE/src/features/search/SearchScreen.tsx>) · [search/CatalogSearchResults.tsx](<../FE/src/features/search/CatalogSearchResults.tsx>) · [navigation/SearchNavigation.test.tsx](<../FE/src/app/navigation/SearchNavigation.test.tsx>) · [navigation/SearchCategoriesNavigation.test.tsx](<../FE/src/app/navigation/SearchCategoriesNavigation.test.tsx>). 기능 경계: [V02](#v02). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f02-01"></a>`T-F02-01` | [S021 Explore 첫 화면](#s021) · [단계 PNG](<../medium/flows/Explore/Searching Medium/screens/01_sc_1c3e4349171248378eada528f7942269.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f02-01>) | 상태: 발견 탐색. [V02](#v02) 구현 연결; 해당 모의·미지원·차이 적용. [U-F02](#u-f02)의 미수록 전이는 미확인 |
| <a id="t-f02-02"></a>`T-F02-02` | [S004 검색 진입과 토픽 탐색](#s004) · [단계 PNG](<../medium/flows/Explore/Searching Medium/screens/02_sc_047c91d900aa47448d61e4faacd68ad5.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f02-02>) | 상태: 검색어 없는 탐색 화면. [V02](#v02) 구현 연결; 해당 모의·미지원·차이 적용. [U-F02](#u-f02)의 미수록 전이는 미확인 |
| <a id="t-f02-03"></a>`T-F02-03` | [S098 Medium 검색 결과](#s098) · [단계 PNG](<../medium/flows/Explore/Searching Medium/screens/03_sc_8dc9eeb5f9d244ca9fa6fb7a973de82f.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f02-03>) | 상태: 기사 검색 결과. [V02](#v02) 구현 연결; 해당 모의·미지원·차이 적용. [U-F02](#u-f02)의 미수록 전이는 미확인 |

<a id="f03"></a>

### F03 — Explore/Topic detail

[원본 분석](<../medium/flows/Explore/Topic detail/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f03>) · [U-F03](#u-f03).

현재 경로/기존 검사: [topics/TopicScreen.tsx](<../FE/src/features/topics/TopicScreen.tsx>) · [navigation/TopicNavigation.test.tsx](<../FE/src/app/navigation/TopicNavigation.test.tsx>). 기능 경계: [V02](#v02) · [V03](#v03). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f03-01"></a>`T-F03-01` | [S070 Explore 토픽 가로 이동](#s070) · [단계 PNG](<../medium/flows/Explore/Topic detail/screens/01_sc_602f368bf00a46b8b57d68f964ed6c16.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f03-01>) | 상태: 가로 탐색 상태. [V02](#v02) 구현 연결; 해당 모의·미지원·차이 적용. [U-F03](#u-f03)의 미수록 전이는 미확인 |
| <a id="t-f03-02"></a>`T-F03-02` | [S057 Life 토픽 상세](#s057) · [단계 PNG](<../medium/flows/Explore/Topic detail/screens/02_sc_4602e853aca341a697239bc9f55b6da3.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f03-02>) | 상태: Life 미팔로우 상태. [V03](#v03) 구현 연결; 해당 모의·미지원·차이 적용. [U-F03](#u-f03)의 미수록 전이는 미확인 |

<a id="f04"></a>

### F04 — Explore/Topic detail/Browse curated list

[원본 분석](<../medium/flows/Explore/Topic detail/Browse curated list/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f04>) · [U-F04](#u-f04).

현재 경로/기존 검사: [public-lists/PublicListScreen.tsx](<../FE/src/features/public-lists/PublicListScreen.tsx>) · [public-lists/SavePublicListControl.tsx](<../FE/src/features/public-lists/SavePublicListControl.tsx>) · [navigation/PublicListsNavigation.test.tsx](<../FE/src/app/navigation/PublicListsNavigation.test.tsx>). 기능 경계: [V03](#v03) · [V04](#v04). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f04-01"></a>`T-F04-01` | [S057 Life 토픽 상세](#s057) · [단계 PNG](<../medium/flows/Explore/Topic detail/Browse curated list/screens/01_sc_4602e853aca341a697239bc9f55b6da3.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f04-01>) | 상태: Life 미팔로우 상태. [V03](#v03) 구현 연결; 해당 모의·미지원·차이 적용. [U-F04](#u-f04)의 미수록 전이는 미확인 |
| <a id="t-f04-02"></a>`T-F04-02` | [S091 Self Improvement 토픽](#s091) · [단계 PNG](<../medium/flows/Explore/Topic detail/Browse curated list/screens/02_sc_7de88da749774d0483716f2e861fb080.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f04-02>) | 상태: 팔로우 중인 다른 토픽. [V03](#v03) 구현 연결; 해당 모의·미지원·차이 적용. [U-F04](#u-f04)의 미수록 전이는 미확인 |
| <a id="t-f04-03"></a>`T-F04-03` | [S107 토픽 내 큐레이션](#s107) · [단계 PNG](<../medium/flows/Explore/Topic detail/Browse curated list/screens/03_sc_974be74d8855401e84cbad9f01dc8e93.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f04-03>) | 상태: 편집 리스트 미리보기. [V03](#v03) 구현 연결; 해당 모의·미지원·차이 적용. [U-F04](#u-f04)의 미수록 전이는 미확인 |
| <a id="t-f04-04"></a>`T-F04-04` | [S014 큐레이션 리스트 상세](#s014) · [단계 PNG](<../medium/flows/Explore/Topic detail/Browse curated list/screens/04_sc_15a122b14ac84b3d80c37fb84dfae4c7.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f04-04>) | 상태: 공개 리스트 읽기. [V04](#v04) 구현 연결; 해당 모의·미지원·차이 적용. [U-F04](#u-f04)의 미수록 전이는 미확인 |
| <a id="t-f04-05"></a>`T-F04-05` | [S135 큐레이션 리스트 하단](#s135) · [단계 PNG](<../medium/flows/Explore/Topic detail/Browse curated list/screens/05_sc_bd0cb76562a74fb69a3569e15daf02ee.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f04-05>) | 상태: 목록 말미. [V04](#v04) 구현 연결; 해당 모의·미지원·차이 적용. [U-F04](#u-f04)의 미수록 전이는 미확인 |

<a id="f05"></a>

### F05 — Home

[원본 분석](<../medium/flows/Home/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f05>) · [U-F05](#u-f05).

현재 경로/기존 검사: [feed/HomeFeedScreen.tsx](<../FE/src/features/feed/HomeFeedScreen.tsx>) · [community/FollowingFeed.tsx](<../FE/src/features/community/FollowingFeed.tsx>) · [navigation/SearchCategoriesNavigation.test.tsx](<../FE/src/app/navigation/SearchCategoriesNavigation.test.tsx>). 기능 경계: [V01](#v01). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f05-01"></a>`T-F05-01` | [S069 For you 홈 피드](#s069) · [단계 PNG](<../medium/flows/Home/screens/01_sc_5e0ba0e498ff49579bf838096aec4b5e.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f05-01>) | 상태: 추천 기사 목록. [V01](#v01) 구현 연결; 해당 모의·미지원·차이 적용. [U-F05](#u-f05)의 미수록 전이는 미확인 |
| <a id="t-f05-02"></a>`T-F05-02` | [S026 홈 피드 스크롤 상태](#s026) · [단계 PNG](<../medium/flows/Home/screens/02_sc_1ef4e2f769774d2c958fcb38b96dc94f.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f05-02>) | 상태: For you 하단 목록. [V01](#v01) 구현 연결; 해당 모의·미지원·차이 적용. [U-F05](#u-f05)의 미수록 전이는 미확인 |
| <a id="t-f05-03"></a>`T-F05-03` | [S176 Featured 빈 상태](#s176) · [단계 PNG](<../medium/flows/Home/screens/03_sc_e1cf4be8210f432098943d8a233d9d72.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f05-03>) | 상태: 팔로우 발행물의 추천 글이 없다는 안내. [V01](#v01) 구현 연결; 해당 모의·미지원·차이 적용. [U-F05](#u-f05)의 미수록 전이는 미확인 |
| <a id="t-f05-04"></a>`T-F05-04` | [S061 Featured 기사 목록](#s061) · [단계 PNG](<../medium/flows/Home/screens/04_sc_4ec0a8b65f954b0984ece5b3b9f258e4.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f05-04>) | 상태: Featured 콘텐츠가 있는 상태. [V01](#v01) 구현 연결; 해당 모의·미지원·차이 적용. [U-F05](#u-f05)의 미수록 전이는 미확인 |

<a id="f06"></a>

### F06 — Home/Notifications

[원본 분석](<../medium/flows/Home/Notifications/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f06>) · [U-F06](#u-f06).

현재 경로/기존 검사: [notifications/NotificationsScreen.tsx](<../FE/src/features/notifications/NotificationsScreen.tsx>) · [navigation/NotificationNavigation.test.tsx](<../FE/src/app/navigation/NotificationNavigation.test.tsx>). 기능 경계: [V01](#v01) · [V05](#v05). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f06-01"></a>`T-F06-01` | [S069 For you 홈 피드](#s069) · [단계 PNG](<../medium/flows/Home/Notifications/screens/01_sc_5e0ba0e498ff49579bf838096aec4b5e.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f06-01>) | 상태: 추천 기사 목록. [V01](#v01) 구현 연결; 해당 모의·미지원·차이 적용. [U-F06](#u-f06)의 미수록 전이는 미확인 |
| <a id="t-f06-02"></a>`T-F06-02` | [S068 알림 목록](#s068) · [단계 PNG](<../medium/flows/Home/Notifications/screens/02_sc_5d1c7181dea04ba59b57242abbc19fee.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f06-02>) | 상태: 여러 종류 알림 존재. [V05](#v05) 구현 연결; 해당 모의·미지원·차이 적용. [U-F06](#u-f06)의 미수록 전이는 미확인 |

<a id="f07"></a>

### F07 — Home/Publishing a story/Adding topics

[원본 분석](<../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f07>) · [U-F07](#u-f07).

현재 경로/기존 검사: [editor/PublishTopics.tsx](<../FE/src/features/editor/PublishTopics.tsx>) · [navigation/PublishingNavigation.test.tsx](<../FE/src/app/navigation/PublishingNavigation.test.tsx>). 기능 경계: [V06](#v06). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f07-01"></a>`T-F07-01` | [S023 발행 전 Story preview](#s023) · [단계 PNG](<../medium/flows/Home/Publishing a story/Adding topics/screens/01_sc_1ceed9061b86476ebc7eb5acb9dd89c7.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f07-01>) | 상태: 공개 전 설정. [V06](#v06) 구현 연결; 해당 모의·미지원·차이 적용. [U-F07](#u-f07)의 미수록 전이는 미확인 |
| <a id="t-f07-02"></a>`T-F07-02` | [S118 토픽 추가 초기 상태](#s118) · [단계 PNG](<../medium/flows/Home/Publishing a story/Adding topics/screens/02_sc_a51d0e5d058b47809e1c299e1c28ff0e.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f07-02>) | 상태: 미선택. [V06](#v06) 구현 연결; 해당 모의·미지원·차이 적용. [U-F07](#u-f07)의 미수록 전이는 미확인 |
| <a id="t-f07-03"></a>`T-F07-03` | [S029 Music 토픽 검색](#s029) · [단계 PNG](<../medium/flows/Home/Publishing a story/Adding topics/screens/03_sc_234fd58378fc447ba6bc2e6c0033f9c2.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f07-03>) | 상태: 유사 철자·다른 토픽 결과. [V06](#v06) 구현 연결; 해당 모의·미지원·차이 적용. [U-F07](#u-f07)의 미수록 전이는 미확인 |
| <a id="t-f07-04"></a>`T-F07-04` | [S065 Music 선택](#s065) · [단계 PNG](<../medium/flows/Home/Publishing a story/Adding topics/screens/04_sc_57162331e2334952b5da8676e4de3c22.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f07-04>) | 상태: 선택 상태 표시. [V06](#v06) 구현 연결; 해당 모의·미지원·차이 적용. [U-F07](#u-f07)의 미수록 전이는 미확인 |
| <a id="t-f07-05"></a>`T-F07-05` | [S115 3개 토픽 선택](#s115) · [단계 PNG](<../medium/flows/Home/Publishing a story/Adding topics/screens/05_sc_a4216c4ff1f64bb59bc982a8d0067b6e.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f07-05>) | 상태: 최대 5개 중 3개. [V06](#v06) 구현 연결; 해당 모의·미지원·차이 적용. [U-F07](#u-f07)의 미수록 전이는 미확인 |
| <a id="t-f07-06"></a>`T-F07-06` | [S146 토픽 지정된 발행 미리보기](#s146) · [단계 PNG](<../medium/flows/Home/Publishing a story/Adding topics/screens/06_sc_c3bdb30e524c4709ae45998ec529a6c0.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f07-06>) | 상태: 토픽 선택 반영. [V06](#v06) 구현 연결; 해당 모의·미지원·차이 적용. [U-F07](#u-f07)의 미수록 전이는 미확인 |

<a id="f08"></a>

### F08 — Home/Publishing a story

[원본 분석](<../medium/flows/Home/Publishing a story/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f08>) · [U-F08](#u-f08).

현재 경로/기존 검사: [editor/StoryEditorScreen.tsx](<../FE/src/features/editor/StoryEditorScreen.tsx>) · [editor/WrittenStoryScreen.tsx](<../FE/src/features/editor/WrittenStoryScreen.tsx>) · [editor/draftSource.ts](<../FE/src/features/editor/draftSource.ts>) · [navigation/PublishingNavigation.test.tsx](<../FE/src/app/navigation/PublishingNavigation.test.tsx>) · [navigation/EditorImagesNavigation.test.tsx](<../FE/src/app/navigation/EditorImagesNavigation.test.tsx>) · [navigation/PublishedLibrarySession.test.tsx](<../FE/src/app/navigation/PublishedLibrarySession.test.tsx>). 기능 경계: [V01](#v01) · [V07](#v07) · [V08](#v08) · [V06](#v06) · [V32](#v32). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f08-01"></a>`T-F08-01` | [S069 For you 홈 피드](#s069) · [단계 PNG](<../medium/flows/Home/Publishing a story/screens/01_sc_5e0ba0e498ff49579bf838096aec4b5e.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f08-01>) | 상태: 추천 기사 목록. [V01](#v01) 구현 연결; 해당 모의·미지원·차이 적용. [U-F08](#u-f08)의 미수록 전이는 미확인 |
| <a id="t-f08-02"></a>`T-F08-02` | [S042 빈 기사 편집기](#s042) · [단계 PNG](<../medium/flows/Home/Publishing a story/screens/02_sc_397cb0f05ba54659adac7376f29512dd.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f08-02>) | 상태: 작성 시작·키보드 활성. [V07](#v07) 구현 연결; 해당 모의·미지원·차이 적용. [U-F08](#u-f08)의 미수록 전이는 미확인 |
| <a id="t-f08-03"></a>`T-F08-03` | [S060 제목과 본문 입력](#s060) · [단계 PNG](<../medium/flows/Home/Publishing a story/screens/03_sc_4db886af7d024100a72b9e02fa3c1ee8.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f08-03>) | 상태: 본문 끝 커서. [V07](#v07) 구현 연결; 해당 모의·미지원·차이 적용. [U-F08](#u-f08)의 미수록 전이는 미확인 |
| <a id="t-f08-04"></a>`T-F08-04` | [S148 이미지 추가 방식 선택](#s148) · [단계 PNG](<../medium/flows/Home/Publishing a story/screens/04_sc_c609f8fa87b84b76bea6f312df2e3e0f.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f08-04>) | 상태: 이미지 소스 선택. [V08](#v08) 구현 연결; 해당 모의·미지원·차이 적용. [U-F08](#u-f08)의 미수록 전이는 미확인 |
| <a id="t-f08-05"></a>`T-F08-05` | [S087 Unsplash 사진 선택](#s087) · [단계 PNG](<../medium/flows/Home/Publishing a story/screens/05_sc_785431954ec4405eb0a3b22debce165a.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f08-05>) | 상태: 외부 사진 탐색 시트. [V08](#v08) 구현 연결; 해당 모의·미지원·차이 적용. [U-F08](#u-f08)의 미수록 전이는 미확인 |
| <a id="t-f08-06"></a>`T-F08-06` | [S126 본문 이미지 로딩](#s126) · [단계 PNG](<../medium/flows/Home/Publishing a story/screens/06_sc_ae30c2a2ca504522b03f98f11d59c429.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f08-06>) | 상태: 이미지 삽입 처리 중. [V08](#v08) 구현 연결; 해당 모의·미지원·차이 적용. [U-F08](#u-f08)의 미수록 전이는 미확인 |
| <a id="t-f08-07"></a>`T-F08-07` | [S137 이미지 삽입 후 편집기](#s137) · [단계 PNG](<../medium/flows/Home/Publishing a story/screens/07_sc_bed3857c8edc4a02b07af1e095ad7fba.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f08-07>) | 상태: 이미지 로딩 표시 사라짐. [V07](#v07) 구현 연결; 해당 모의·미지원·차이 적용. [U-F08](#u-f08)의 미수록 전이는 미확인 |
| <a id="t-f08-08"></a>`T-F08-08` | [S023 발행 전 Story preview](#s023) · [단계 PNG](<../medium/flows/Home/Publishing a story/screens/08_sc_1ceed9061b86476ebc7eb5acb9dd89c7.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f08-08>) | 상태: 공개 전 설정. [V06](#v06) 구현 연결; 해당 모의·미지원·차이 적용. [U-F08](#u-f08)의 미수록 전이는 미확인 |
| <a id="t-f08-09"></a>`T-F08-09` | [S146 토픽 지정된 발행 미리보기](#s146) · [단계 PNG](<../medium/flows/Home/Publishing a story/screens/09_sc_c3bdb30e524c4709ae45998ec529a6c0.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f08-09>) | 상태: 토픽 선택 반영. [V06](#v06) 구현 연결; 해당 모의·미지원·차이 적용. [U-F08](#u-f08)의 미수록 전이는 미확인 |
| <a id="t-f08-10"></a>`T-F08-10` | [S044 Unlisted 공개 범위 안내](#s044) · [단계 PNG](<../medium/flows/Home/Publishing a story/screens/10_sc_39fb71a1ee0d43f09bab33c7ef775259.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f08-10>) | 상태: 링크 소지자 접근·공개 목록 제외라는 안내. [V06](#v06) 구현 연결; 해당 모의·미지원·차이 적용. [U-F08](#u-f08)의 미수록 전이는 미확인 |
| <a id="t-f08-11"></a>`T-F08-11` | [S178 프로필에 발행 글 표시](#s178) · [단계 PNG](<../medium/flows/Home/Publishing a story/screens/11_sc_e3b2276c9abd4bc7b08e6e4c322dee9e.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f08-11>) | 상태: 발행된 것으로 보이는 글 카드. [V32](#v32) 구현 연결; 해당 모의·미지원·차이 적용. [U-F08](#u-f08)의 미수록 전이는 미확인 |

<a id="f09"></a>

### F09 — Home/Publishing a story/Changing text format

[원본 분석](<../medium/flows/Home/Publishing a story/Changing text format/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f09>) · [U-F09](#u-f09).

현재 경로/기존 검사: [editor/RichDocumentBody.tsx](<../FE/src/features/editor/RichDocumentBody.tsx>) · [editor/editorModel.ts](<../FE/src/features/editor/editorModel.ts>) · [navigation/EditorNavigation.test.tsx](<../FE/src/app/navigation/EditorNavigation.test.tsx>). 기능 경계: [V07](#v07). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f09-01"></a>`T-F09-01` | [S137 이미지 삽입 후 편집기](#s137) · [단계 PNG](<../medium/flows/Home/Publishing a story/Changing text format/screens/01_sc_bed3857c8edc4a02b07af1e095ad7fba.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f09-01>) | 상태: 이미지 로딩 표시 사라짐. [V07](#v07) 구현 연결; 해당 모의·미지원·차이 적용. [U-F09](#u-f09)의 미수록 전이는 미확인 |
| <a id="t-f09-02"></a>`T-F09-02` | [S031 본문 문자 스타일 변경](#s031) · [단계 PNG](<../medium/flows/Home/Publishing a story/Changing text format/screens/02_sc_24b381a199374acb8d2a6a516052c9a7.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f09-02>) | 상태: 텍스트 서식 선택 상태. [V07](#v07) 구현 연결; 해당 모의·미지원·차이 적용. [U-F09](#u-f09)의 미수록 전이는 미확인 |
| <a id="t-f09-03"></a>`T-F09-03` | [S183 인용 서식 적용](#s183) · [단계 PNG](<../medium/flows/Home/Publishing a story/Changing text format/screens/03_sc_e5826f356093493a86c19716420e8fdf.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f09-03>) | 상태: 인용 블록 표시. [V07](#v07) 구현 연결; 해당 모의·미지원·차이 적용. [U-F09](#u-f09)의 미수록 전이는 미확인 |
| <a id="t-f09-04"></a>`T-F09-04` | [S018 글머리 목록 적용](#s018) · [단계 PNG](<../medium/flows/Home/Publishing a story/Changing text format/screens/04_sc_1b0cd82ee04a4c8c9d52b9a2d088823b.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f09-04>) | 상태: 글머리 목록 표시. [V07](#v07) 구현 연결; 해당 모의·미지원·차이 적용. [U-F09](#u-f09)의 미수록 전이는 미확인 |
| <a id="t-f09-05"></a>`T-F09-05` | [S017 구분선 삽입과 이미지 선택](#s017) · [단계 PNG](<../medium/flows/Home/Publishing a story/Changing text format/screens/05_sc_19b2bef0854047f5b17cfeca07781ca5.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f09-05>) | 상태: 블록 구분선 노출. [V07](#v07) 구현 연결; 해당 모의·미지원·차이 적용. [U-F09](#u-f09)의 미수록 전이는 미확인 |

<a id="f10"></a>

### F10 — Home/Publishing a story/Drafts

[원본 분석](<../medium/flows/Home/Publishing a story/Drafts/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f10>) · [U-F10](#u-f10).

현재 경로/기존 검사: [editor/DraftsScreen.tsx](<../FE/src/features/editor/DraftsScreen.tsx>) · [editor/createDraftSession.ts](<../FE/src/features/editor/createDraftSession.ts>) · [navigation/DraftsNavigation.test.tsx](<../FE/src/app/navigation/DraftsNavigation.test.tsx>). 기능 경계: [V07](#v07) · [V09](#v09). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f10-01"></a>`T-F10-01` | [S137 이미지 삽입 후 편집기](#s137) · [단계 PNG](<../medium/flows/Home/Publishing a story/Drafts/screens/01_sc_bed3857c8edc4a02b07af1e095ad7fba.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f10-01>) | 상태: 이미지 로딩 표시 사라짐. [V07](#v07) 구현 연결; 해당 모의·미지원·차이 적용. [U-F10](#u-f10)의 미수록 전이는 미확인 |
| <a id="t-f10-02"></a>`T-F10-02` | [S030 작성기 더보기 메뉴](#s030) · [단계 PNG](<../medium/flows/Home/Publishing a story/Drafts/screens/02_sc_2436081faa2445cb86e17ea0b88b4fc9.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f10-02>) | 상태: 발행 보조 메뉴 열림. [V09](#v09) 구현 연결; 해당 모의·미지원·차이 적용. [U-F10](#u-f10)의 미수록 전이는 미확인 |
| <a id="t-f10-03"></a>`T-F10-03` | [S139 초안 목록](#s139) · [단계 PNG](<../medium/flows/Home/Publishing a story/Drafts/screens/03_sc_c020fbe7604a43569b5bf77da2725119.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f10-03>) | 상태: 초안 1건 표시. [V09](#v09) 구현 연결; 해당 모의·미지원·차이 적용. [U-F10](#u-f10)의 미수록 전이는 미확인 |

<a id="f11"></a>

### F11 — Home/Publishing a story/Mentioning a user

[원본 분석](<../medium/flows/Home/Publishing a story/Mentioning a user/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f11>) · [U-F11](#u-f11).

현재 경로/기존 검사: [editor/MentionSuggestions.tsx](<../FE/src/features/editor/MentionSuggestions.tsx>) · [editor/DocumentReader.tsx](<../FE/src/features/editor/DocumentReader.tsx>) · [navigation/EditorNavigation.test.tsx](<../FE/src/app/navigation/EditorNavigation.test.tsx>). 기능 경계: [V07](#v07) · [V10](#v10). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f11-01"></a>`T-F11-01` | [S137 이미지 삽입 후 편집기](#s137) · [단계 PNG](<../medium/flows/Home/Publishing a story/Mentioning a user/screens/01_sc_bed3857c8edc4a02b07af1e095ad7fba.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f11-01>) | 상태: 이미지 로딩 표시 사라짐. [V07](#v07) 구현 연결; 해당 모의·미지원·차이 적용. [U-F11](#u-f11)의 미수록 전이는 미확인 |
| <a id="t-f11-02"></a>`T-F11-02` | [S180 멘션 입력 시작](#s180) · [단계 PNG](<../medium/flows/Home/Publishing a story/Mentioning a user/screens/02_sc_e3c9949b35ca4bc7b3328ee4e887fc5a.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f11-02>) | 상태: 멘션 검색 대기. [V10](#v10) 구현 연결; 해당 모의·미지원·차이 적용. [U-F11](#u-f11)의 미수록 전이는 미확인 |
| <a id="t-f11-03"></a>`T-F11-03` | [S196 멘션 검색 후보](#s196) · [단계 PNG](<../medium/flows/Home/Publishing a story/Mentioning a user/screens/03_sc_fbca217fbc1346d09deb4c0d09dac86e.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f11-03>) | 상태: 동명이인 구분 가능한 후보 목록. [V10](#v10) 구현 연결; 해당 모의·미지원·차이 적용. [U-F11](#u-f11)의 미수록 전이는 미확인 |
| <a id="t-f11-04"></a>`T-F11-04` | [S015 멘션 대상 삽입](#s015) · [단계 PNG](<../medium/flows/Home/Publishing a story/Mentioning a user/screens/04_sc_15dd105a441c426ca638b4db6cb30997.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f11-04>) | 상태: 멘션 후보 선택 반영. [V10](#v10) 구현 연결; 해당 모의·미지원·차이 적용. [U-F11](#u-f11)의 미수록 전이는 미확인 |

<a id="f12"></a>

### F12 — Home/Refine recommendations

[원본 분석](<../medium/flows/Home/Refine recommendations/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f12>) · [U-F12](#u-f12).

현재 경로/기존 검사: [recommendations/RefineRecommendationsScreen.tsx](<../FE/src/features/recommendations/RefineRecommendationsScreen.tsx>) · [navigation/RecommendationsNavigation.test.tsx](<../FE/src/app/navigation/RecommendationsNavigation.test.tsx>). 기능 경계: [V01](#v01) · [V11](#v11) · [V12](#v12). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f12-01"></a>`T-F12-01` | [S069 For you 홈 피드](#s069) · [단계 PNG](<../medium/flows/Home/Refine recommendations/screens/01_sc_5e0ba0e498ff49579bf838096aec4b5e.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f12-01>) | 상태: 추천 기사 목록. [V01](#v01) 구현 연결; 해당 모의·미지원·차이 적용. [U-F12](#u-f12)의 미수록 전이는 미확인 |
| <a id="t-f12-02"></a>`T-F12-02` | [S099 추천 조정의 Suggestions](#s099) · [단계 PNG](<../medium/flows/Home/Refine recommendations/screens/02_sc_90bc6a79e86d436e89d94d7dc82b624c.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f12-02>) | 상태: 추천 토픽과 기사·팔로워 집계. [V11](#v11) 구현 연결; 해당 모의·미지원·차이 적용. [U-F12](#u-f12)의 미수록 전이는 미확인 |
| <a id="t-f12-03"></a>`T-F12-03` | [S190 읽기 기록 목록](#s190) · [단계 PNG](<../medium/flows/Home/Refine recommendations/screens/03_sc_f4bb3fa34f32466b9bd12eea57ea518f.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f12-03>) | 상태: 읽기 기록 존재. [V12](#v12) 구현 연결; 해당 모의·미지원·차이 적용. [U-F12](#u-f12)의 미수록 전이는 미확인 |
| <a id="t-f12-04"></a>`T-F12-04` | [S104 팔로잉 빈 상태](#s104) · [단계 PNG](<../medium/flows/Home/Refine recommendations/screens/04_sc_944b2eea3834408b8c04981e5eb2adf8.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f12-04>) | 상태: 팔로우 대상 없음. [V11](#v11) 구현 연결; 해당 모의·미지원·차이 적용. [U-F12](#u-f12)의 미수록 전이는 미확인 |
| <a id="t-f12-05"></a>`T-F12-05` | [S022 팔로잉 유형별 목록](#s022) · [단계 PNG](<../medium/flows/Home/Refine recommendations/screens/05_sc_1c666fb7aadc411c9add1aa2b19bd56c.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f12-05>) | 상태: 작가·토픽 팔로우 표시. [V11](#v11) 구현 연결; 해당 모의·미지원·차이 적용. [U-F12](#u-f12)의 미수록 전이는 미확인 |

<a id="f13"></a>

### F13 — Home/Refine recommendations/Filtering suggestions

[원본 분석](<../medium/flows/Home/Refine recommendations/Filtering suggestions/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f13>) · [U-F13](#u-f13).

현재 경로/기존 검사: [recommendations/RefineRecommendationsScreen.tsx](<../FE/src/features/recommendations/RefineRecommendationsScreen.tsx>) · [navigation/RecommendationsNavigation.test.tsx](<../FE/src/app/navigation/RecommendationsNavigation.test.tsx>). 기능 경계: [V11](#v11). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f13-01"></a>`T-F13-01` | [S099 추천 조정의 Suggestions](#s099) · [단계 PNG](<../medium/flows/Home/Refine recommendations/Filtering suggestions/screens/01_sc_90bc6a79e86d436e89d94d7dc82b624c.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f13-01>) | 상태: 추천 토픽과 기사·팔로워 집계. [V11](#v11) 구현 연결; 해당 모의·미지원·차이 적용. [U-F13](#u-f13)의 미수록 전이는 미확인 |
| <a id="t-f13-02"></a>`T-F13-02` | [S194 추천 유형 필터 메뉴](#s194) · [단계 PNG](<../medium/flows/Home/Refine recommendations/Filtering suggestions/screens/02_sc_f978feb6af9f44b5a5fa8f514899f3da.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f13-02>) | 상태: 유형 선택 중. [V11](#v11) 구현 연결; 해당 모의·미지원·차이 적용. [U-F13](#u-f13)의 미수록 전이는 미확인 |
| <a id="t-f13-03"></a>`T-F13-03` | [S033 전체 추천의 작가 섹션](#s033) · [단계 PNG](<../medium/flows/Home/Refine recommendations/Filtering suggestions/screens/03_sc_28a0bd2548fc4800b2b024bdc06bb115.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f13-03>) | 상태: 전체 추천 중 작가 목록. [V11](#v11) 구현 연결; 해당 모의·미지원·차이 적용. [U-F13](#u-f13)의 미수록 전이는 미확인 |
| <a id="t-f13-04"></a>`T-F13-04` | [S151 추천 토픽 팔로우 상태](#s151) · [단계 PNG](<../medium/flows/Home/Refine recommendations/Filtering suggestions/screens/04_sc_c7deda6b53824957b587bd922cd55399.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f13-04>) | 상태: 일부 팔로우 반영. [V11](#v11) 구현 연결; 해당 모의·미지원·차이 적용. [U-F13](#u-f13)의 미수록 전이는 미확인 |

<a id="f14"></a>

### F14 — Home/Refine recommendations/Reading history

[원본 분석](<../medium/flows/Home/Refine recommendations/Reading history/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f14>) · [U-F14](#u-f14).

현재 경로/기존 검사: [reading-history/ReadingHistoryList.tsx](<../FE/src/features/reading-history/ReadingHistoryList.tsx>) · [reading-history/createReadingHistoryStore.ts](<../FE/src/features/reading-history/createReadingHistoryStore.ts>) · [navigation/RecommendationsNavigation.test.tsx](<../FE/src/app/navigation/RecommendationsNavigation.test.tsx>) · [navigation/ClapHistoryNavigation.test.tsx](<../FE/src/app/navigation/ClapHistoryNavigation.test.tsx>). 기능 경계: [V12](#v12). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f14-01"></a>`T-F14-01` | [S190 읽기 기록 목록](#s190) · [단계 PNG](<../medium/flows/Home/Refine recommendations/Reading history/screens/01_sc_f4bb3fa34f32466b9bd12eea57ea518f.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f14-01>) | 상태: 읽기 기록 존재. [V12](#v12) 구현 연결; 해당 모의·미지원·차이 적용. [U-F14](#u-f14)의 미수록 전이는 미확인 |
| <a id="t-f14-02"></a>`T-F14-02` | [S052 읽기 기록 스크롤](#s052) · [단계 PNG](<../medium/flows/Home/Refine recommendations/Reading history/screens/02_sc_4239d69cbdce4194a5a34c7472131dfd.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f14-02>) | 상태: 개별 기록 삭제 진입 가능. [V12](#v12) 구현 연결; 해당 모의·미지원·차이 적용. [U-F14](#u-f14)의 미수록 전이는 미확인 |

<a id="f15"></a>

### F15 — Home/Refine recommendations/Reading history/Clearing history

[원본 분석](<../medium/flows/Home/Refine recommendations/Reading history/Clearing history/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f15>) · [U-F15](#u-f15).

현재 경로/기존 검사: [reading-history/ReadingHistoryList.tsx](<../FE/src/features/reading-history/ReadingHistoryList.tsx>) · [reading-history/createReadingHistoryStore.ts](<../FE/src/features/reading-history/createReadingHistoryStore.ts>) · [navigation/RecommendationsNavigation.test.tsx](<../FE/src/app/navigation/RecommendationsNavigation.test.tsx>) · [navigation/ClapHistoryNavigation.test.tsx](<../FE/src/app/navigation/ClapHistoryNavigation.test.tsx>). 기능 경계: [V12](#v12). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f15-01"></a>`T-F15-01` | [S190 읽기 기록 목록](#s190) · [단계 PNG](<../medium/flows/Home/Refine recommendations/Reading history/Clearing history/screens/01_sc_f4bb3fa34f32466b9bd12eea57ea518f.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f15-01>) | 상태: 읽기 기록 존재. [V12](#v12) 구현 연결; 해당 모의·미지원·차이 적용. [U-F15](#u-f15)의 미수록 전이는 미확인 |
| <a id="t-f15-02"></a>`T-F15-02` | [S045 읽기 기록 빈 상태](#s045) · [단계 PNG](<../medium/flows/Home/Refine recommendations/Reading history/Clearing history/screens/02_sc_3ab5043fa7b649908c6dde30faf290ab.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f15-02>) | 상태: 기록 목록 없음. [V12](#v12) 구현 연결; 해당 모의·미지원·차이 적용. [U-F15](#u-f15)의 미수록 전이는 미확인 |

<a id="f16"></a>

### F16 — Home/Story detail

[원본 분석](<../medium/flows/Home/Story detail/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f16>) · [U-F16](#u-f16).

현재 경로/기존 검사: [article/ArticleDetailScreen.tsx](<../FE/src/features/article/ArticleDetailScreen.tsx>) · [article/ReferenceArticleView.tsx](<../FE/src/features/article/ReferenceArticleView.tsx>) · [navigation/ArticleRouteScreen.test.tsx](<../FE/src/app/navigation/ArticleRouteScreen.test.tsx>) · [navigation/ResponsesNavigation.test.tsx](<../FE/src/app/navigation/ResponsesNavigation.test.tsx>). 기능 경계: [V01](#v01) · [V13](#v13). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f16-01"></a>`T-F16-01` | [S026 홈 피드 스크롤 상태](#s026) · [단계 PNG](<../medium/flows/Home/Story detail/screens/01_sc_1ef4e2f769774d2c958fcb38b96dc94f.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f16-01>) | 상태: For you 하단 목록. [V01](#v01) 구현 연결; 해당 모의·미지원·차이 적용. [U-F16](#u-f16)의 미수록 전이는 미확인 |
| <a id="t-f16-02"></a>`T-F16-02` | [S037 기사 상세 상단](#s037) · [단계 PNG](<../medium/flows/Home/Story detail/screens/02_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f16-02>) | 상태: 멤버 전용 기사 읽기 화면. [V13](#v13) 구현 연결; 해당 모의·미지원·차이 적용. [U-F16](#u-f16)의 미수록 전이는 미확인 |
| <a id="t-f16-03"></a>`T-F16-03` | [S189 기사 본문 스크롤](#s189) · [단계 PNG](<../medium/flows/Home/Story detail/screens/03_sc_f4b06612bdbf48ecbd8a7b6e2607d117.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f16-03>) | 상태: 본문 중간 읽기. [V13](#v13) 구현 연결; 해당 모의·미지원·차이 적용. [U-F16](#u-f16)의 미수록 전이는 미확인 |
| <a id="t-f16-04"></a>`T-F16-04` | [S147 기사 말미와 작성자 카드](#s147) · [단계 PNG](<../medium/flows/Home/Story detail/screens/04_sc_c3fcf42b84be4b7298dfc138c224e241.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f16-04>) | 상태: 기사 말미 도달. [V13](#v13) 구현 연결; 해당 모의·미지원·차이 적용. [U-F16](#u-f16)의 미수록 전이는 미확인 |
| <a id="t-f16-05"></a>`T-F16-05` | [S175 본문 아래 응답 미리보기](#s175) · [단계 PNG](<../medium/flows/Home/Story detail/screens/05_sc_e1a92b59829c4678b3362d2dc6abae59.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f16-05>) | 상태: 응답 일부 표시. [V13](#v13) 구현 연결; 해당 모의·미지원·차이 적용. [U-F16](#u-f16)의 미수록 전이는 미확인 |
| <a id="t-f16-06"></a>`T-F16-06` | [S140 응답 미리보기 끝](#s140) · [단계 PNG](<../medium/flows/Home/Story detail/screens/06_sc_c068a6d42c5c48fb9d60c8af4adb446f.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f16-06>) | 상태: 부분 응답 목록의 끝. [V13](#v13) 구현 연결; 해당 모의·미지원·차이 적용. [U-F16](#u-f16)의 미수록 전이는 미확인 |
| <a id="t-f16-07"></a>`T-F16-07` | [S102 같은 작가의 추가 기사](#s102) · [단계 PNG](<../medium/flows/Home/Story detail/screens/07_sc_92624aea551d44a7bbcf71d7d78aff4c.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f16-07>) | 상태: 읽기 후 작가 콘텐츠 추천. [V13](#v13) 구현 연결; 해당 모의·미지원·차이 적용. [U-F16](#u-f16)의 미수록 전이는 미확인 |

<a id="f17"></a>

### F17 — Home/Story detail/Author detail

[원본 분석](<../medium/flows/Home/Story detail/Author detail/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f17>) · [U-F17](#u-f17).

현재 경로/기존 검사: [community/PublicIdentityScreen.tsx](<../FE/src/features/community/PublicIdentityScreen.tsx>) · [navigation/CommunityNavigation.test.tsx](<../FE/src/app/navigation/CommunityNavigation.test.tsx>). 기능 경계: [V13](#v13) · [V14](#v14). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f17-01"></a>`T-F17-01` | [S037 기사 상세 상단](#s037) · [단계 PNG](<../medium/flows/Home/Story detail/Author detail/screens/01_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f17-01>) | 상태: 멤버 전용 기사 읽기 화면. [V13](#v13) 구현 연결; 해당 모의·미지원·차이 적용. [U-F17](#u-f17)의 미수록 전이는 미확인 |
| <a id="t-f17-02"></a>`T-F17-02` | [S048 작가 프로필 Stories](#s048) · [단계 PNG](<../medium/flows/Home/Story detail/Author detail/screens/02_sc_3de359a1c13340968c4b733188faa6d1.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f17-02>) | 상태: 고정 글 Pinned 표시. [V14](#v14) 구현 연결; 해당 모의·미지원·차이 적용. [U-F17](#u-f17)의 미수록 전이는 미확인 |
| <a id="t-f17-03"></a>`T-F17-03` | [S038 작가 공개 리스트](#s038) · [단계 PNG](<../medium/flows/Home/Story detail/Author detail/screens/03_sc_334d50df678445baaa7ba445c96861ba.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f17-03>) | 상태: 작가 목록 탐색. [V14](#v14) 구현 연결; 해당 모의·미지원·차이 적용. [U-F17](#u-f17)의 미수록 전이는 미확인 |
| <a id="t-f17-04"></a>`T-F17-04` | [S083 작가 About](#s083) · [단계 PNG](<../medium/flows/Home/Story detail/Author detail/screens/04_sc_74429222aa3d45a89f1980b3aa0b6f9e.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f17-04>) | 상태: 소개·회원 이력 표시. [V14](#v14) 구현 연결; 해당 모의·미지원·차이 적용. [U-F17](#u-f17)의 미수록 전이는 미확인 |

<a id="f18"></a>

### F18 — Home/Story detail/Author detail/Blocking an author

[원본 분석](<../medium/flows/Home/Story detail/Author detail/Blocking an author/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f18>) · [U-F18](#u-f18).

현재 경로/기존 검사: [moderation/ModerationDialogs.tsx](<../FE/src/features/moderation/ModerationDialogs.tsx>) · [moderation/articleModeration.ts](<../FE/src/features/moderation/articleModeration.ts>) · [navigation/ModerationNavigation.test.tsx](<../FE/src/app/navigation/ModerationNavigation.test.tsx>). 기능 경계: [V14](#v14) · [V15](#v15). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f18-01"></a>`T-F18-01` | [S048 작가 프로필 Stories](#s048) · [단계 PNG](<../medium/flows/Home/Story detail/Author detail/Blocking an author/screens/01_sc_3de359a1c13340968c4b733188faa6d1.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f18-01>) | 상태: 고정 글 Pinned 표시. [V14](#v14) 구현 연결; 해당 모의·미지원·차이 적용. [U-F18](#u-f18)의 미수록 전이는 미확인 |
| <a id="t-f18-02"></a>`T-F18-02` | [S143 작가 더보기 액션](#s143) · [단계 PNG](<../medium/flows/Home/Story detail/Author detail/Blocking an author/screens/02_sc_c25f22caf7cd49ba88c8611fb7480932.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f18-02>) | 상태: 작가 관리 메뉴. [V15](#v15) 구현 연결; 해당 모의·미지원·차이 적용. [U-F18](#u-f18)의 미수록 전이는 미확인 |
| <a id="t-f18-03"></a>`T-F18-03` | [S199 작가 차단 안내](#s199) · [단계 PNG](<../medium/flows/Home/Story detail/Author detail/Blocking an author/screens/03_sc_ff143e1e9b4d4e5ab0579b3fdc61dc1a.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f18-03>) | 상태: 차단 성공 표시. [V15](#v15) 구현 연결; 해당 모의·미지원·차이 적용. [U-F18](#u-f18)의 미수록 전이는 미확인 |
| <a id="t-f18-04"></a>`T-F18-04` | [S093 작가 프로필의 다른 캡처 상태](#s093) · [단계 PNG](<../medium/flows/Home/Story detail/Author detail/Blocking an author/screens/04_sc_8208a84fba4c4046aa1d364055d14db7.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f18-04>) | 상태: 차단 흐름 후 별도 프로필 상태. [V15](#v15) 구현 연결; 해당 모의·미지원·차이 적용. [U-F18](#u-f18)의 미수록 전이는 미확인 |

<a id="f19"></a>

### F19 — Home/Story detail/Author detail/Following an author

[원본 분석](<../medium/flows/Home/Story detail/Author detail/Following an author/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f19>) · [U-F19](#u-f19).

현재 경로/기존 검사: [community/FollowControl.tsx](<../FE/src/features/community/FollowControl.tsx>) · [navigation/CommunityNavigation.test.tsx](<../FE/src/app/navigation/CommunityNavigation.test.tsx>). 기능 경계: [V14](#v14). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f19-01"></a>`T-F19-01` | [S048 작가 프로필 Stories](#s048) · [단계 PNG](<../medium/flows/Home/Story detail/Author detail/Following an author/screens/01_sc_3de359a1c13340968c4b733188faa6d1.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f19-01>) | 상태: 고정 글 Pinned 표시. [V14](#v14) 구현 연결; 해당 모의·미지원·차이 적용. [U-F19](#u-f19)의 미수록 전이는 미확인 |
| <a id="t-f19-02"></a>`T-F19-02` | [S049 작가 팔로우 성공과 알림 메뉴](#s049) · [단계 PNG](<../medium/flows/Home/Story detail/Author detail/Following an author/screens/02_sc_3ecf6d2988a6418fa4d2006fa4497b23.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f19-02>) | 상태: 팔로우 성공 안내. [V14](#v14) 구현 연결; 해당 모의·미지원·차이 적용. [U-F19](#u-f19)의 미수록 전이는 미확인 |
| <a id="t-f19-03"></a>`T-F19-03` | [S103 팔로우 설정 메뉴](#s103) · [단계 PNG](<../medium/flows/Home/Story detail/Author detail/Following an author/screens/03_sc_937a1fdc91724d1ca5cc41b1d43d5132.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f19-03>) | 상태: 팔로우 해제 진입점. [V14](#v14) 구현 연결; 해당 모의·미지원·차이 적용. [U-F19](#u-f19)의 미수록 전이는 미확인 |
| <a id="t-f19-04"></a>`T-F19-04` | [S025 팔로우된 작가 프로필](#s025) · [단계 PNG](<../medium/flows/Home/Story detail/Author detail/Following an author/screens/04_sc_1da36ea095e64ec0a5b6b9478b032524.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f19-04>) | 상태: 관계 설정 메뉴 닫힘. [V14](#v14) 구현 연결; 해당 모의·미지원·차이 적용. [U-F19](#u-f19)의 미수록 전이는 미확인 |

<a id="f20"></a>

### F20 — Home/Story detail/Author detail/Following an author/Unfollowing an author

[원본 분석](<../medium/flows/Home/Story detail/Author detail/Following an author/Unfollowing an author/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f20>) · [U-F20](#u-f20).

현재 경로/기존 검사: [community/FollowControl.tsx](<../FE/src/features/community/FollowControl.tsx>) · [navigation/CommunityNavigation.test.tsx](<../FE/src/app/navigation/CommunityNavigation.test.tsx>). 기능 경계: [V14](#v14). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f20-01"></a>`T-F20-01` | [S103 팔로우 설정 메뉴](#s103) · [단계 PNG](<../medium/flows/Home/Story detail/Author detail/Following an author/Unfollowing an author/screens/01_sc_937a1fdc91724d1ca5cc41b1d43d5132.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f20-01>) | 상태: 팔로우 해제 진입점. [V14](#v14) 구현 연결; 해당 모의·미지원·차이 적용. [U-F20](#u-f20)의 미수록 전이는 미확인 |
| <a id="t-f20-02"></a>`T-F20-02` | [S130 팔로우 해제 안내](#s130) · [단계 PNG](<../medium/flows/Home/Story detail/Author detail/Following an author/Unfollowing an author/screens/02_sc_b606d8b25cf248c28200cbfd24da865f.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f20-02>) | 상태: 해제 성공 안내. [V14](#v14) 구현 연결; 해당 모의·미지원·차이 적용. [U-F20](#u-f20)의 미수록 전이는 미확인 |

<a id="f21"></a>

### F21 — Home/Story detail/Author detail/Following list

[원본 분석](<../medium/flows/Home/Story detail/Author detail/Following list/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f21>) · [U-F21](#u-f21).

현재 경로/기존 검사: [community/ConnectionsScreen.tsx](<../FE/src/features/community/ConnectionsScreen.tsx>) · [navigation/CommunityNavigation.test.tsx](<../FE/src/app/navigation/CommunityNavigation.test.tsx>). 기능 경계: [V14](#v14). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f21-01"></a>`T-F21-01` | [S048 작가 프로필 Stories](#s048) · [단계 PNG](<../medium/flows/Home/Story detail/Author detail/Following list/screens/01_sc_3de359a1c13340968c4b733188faa6d1.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f21-01>) | 상태: 고정 글 Pinned 표시. [V14](#v14) 구현 연결; 해당 모의·미지원·차이 적용. [U-F21](#u-f21)의 미수록 전이는 미확인 |
| <a id="t-f21-02"></a>`T-F21-02` | [S090 팔로잉 계정 목록](#s090) · [단계 PNG](<../medium/flows/Home/Story detail/Author detail/Following list/screens/02_sc_7c89f4496e7f4cb0b5c23b776080b6bf.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f21-02>) | 상태: 관계 목록 표시. [V14](#v14) 구현 연결; 해당 모의·미지원·차이 적용. [U-F21](#u-f21)의 미수록 전이는 미확인 |

<a id="f22"></a>

### F22 — Home/Story detail/Author detail/Muting an author

[원본 분석](<../medium/flows/Home/Story detail/Author detail/Muting an author/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f22>) · [U-F22](#u-f22).

현재 경로/기존 검사: [moderation/ModerationDialogs.tsx](<../FE/src/features/moderation/ModerationDialogs.tsx>) · [moderation/articleModeration.ts](<../FE/src/features/moderation/articleModeration.ts>) · [navigation/ModerationNavigation.test.tsx](<../FE/src/app/navigation/ModerationNavigation.test.tsx>). 기능 경계: [V14](#v14) · [V15](#v15). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f22-01"></a>`T-F22-01` | [S048 작가 프로필 Stories](#s048) · [단계 PNG](<../medium/flows/Home/Story detail/Author detail/Muting an author/screens/01_sc_3de359a1c13340968c4b733188faa6d1.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f22-01>) | 상태: 고정 글 Pinned 표시. [V14](#v14) 구현 연결; 해당 모의·미지원·차이 적용. [U-F22](#u-f22)의 미수록 전이는 미확인 |
| <a id="t-f22-02"></a>`T-F22-02` | [S143 작가 더보기 액션](#s143) · [단계 PNG](<../medium/flows/Home/Story detail/Author detail/Muting an author/screens/02_sc_c25f22caf7cd49ba88c8611fb7480932.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f22-02>) | 상태: 작가 관리 메뉴. [V15](#v15) 구현 연결; 해당 모의·미지원·차이 적용. [U-F22](#u-f22)의 미수록 전이는 미확인 |
| <a id="t-f22-03"></a>`T-F22-03` | [S152 작가 음소거 안내](#s152) · [단계 PNG](<../medium/flows/Home/Story detail/Author detail/Muting an author/screens/03_sc_c8b24e7669734e74922bee69b751350b.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f22-03>) | 상태: 음소거 성공 표시. [V15](#v15) 구현 연결; 해당 모의·미지원·차이 적용. [U-F22](#u-f22)의 미수록 전이는 미확인 |

<a id="f23"></a>

### F23 — Home/Story detail/Author detail/Reporting an author

[원본 분석](<../medium/flows/Home/Story detail/Author detail/Reporting an author/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f23>) · [U-F23](#u-f23).

현재 경로/기존 검사: [moderation/ModerationDialogs.tsx](<../FE/src/features/moderation/ModerationDialogs.tsx>) · [moderation/articleModeration.ts](<../FE/src/features/moderation/articleModeration.ts>) · [navigation/ModerationNavigation.test.tsx](<../FE/src/app/navigation/ModerationNavigation.test.tsx>). 기능 경계: [V14](#v14) · [V15](#v15). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f23-01"></a>`T-F23-01` | [S048 작가 프로필 Stories](#s048) · [단계 PNG](<../medium/flows/Home/Story detail/Author detail/Reporting an author/screens/01_sc_3de359a1c13340968c4b733188faa6d1.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f23-01>) | 상태: 고정 글 Pinned 표시. [V14](#v14) 구현 연결; 해당 모의·미지원·차이 적용. [U-F23](#u-f23)의 미수록 전이는 미확인 |
| <a id="t-f23-02"></a>`T-F23-02` | [S143 작가 더보기 액션](#s143) · [단계 PNG](<../medium/flows/Home/Story detail/Author detail/Reporting an author/screens/02_sc_c25f22caf7cd49ba88c8611fb7480932.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f23-02>) | 상태: 작가 관리 메뉴. [V15](#v15) 구현 연결; 해당 모의·미지원·차이 적용. [U-F23](#u-f23)의 미수록 전이는 미확인 |
| <a id="t-f23-03"></a>`T-F23-03` | [S161 사용자 신고 사유 선택](#s161) · [단계 PNG](<../medium/flows/Home/Story detail/Author detail/Reporting an author/screens/03_sc_d07b03740ecc44328719d4d21703bb06.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f23-03>) | 상태: 신고 입력 전. [V15](#v15) 구현 연결; 해당 모의·미지원·차이 적용. [U-F23](#u-f23)의 미수록 전이는 미확인 |
| <a id="t-f23-04"></a>`T-F23-04` | [S127 신고 사유 선택 완료](#s127) · [단계 PNG](<../medium/flows/Home/Story detail/Author detail/Reporting an author/screens/04_sc_af0ecdded03643ca8cea85ec5341d906.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f23-04>) | 상태: 신고 제출 준비. [V15](#v15) 구현 연결; 해당 모의·미지원·차이 적용. [U-F23](#u-f23)의 미수록 전이는 미확인 |
| <a id="t-f23-05"></a>`T-F23-05` | [S170 사용자 신고 성공 안내](#s170) · [단계 PNG](<../medium/flows/Home/Story detail/Author detail/Reporting an author/screens/05_sc_d9ba56fa632249c7908f15a8e3082d97.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f23-05>) | 상태: 신고 접수 성공 표시. [V15](#v15) 구현 연결; 해당 모의·미지원·차이 적용. [U-F23](#u-f23)의 미수록 전이는 미확인 |

<a id="f24"></a>

### F24 — Home/Story detail/Changing display

[원본 분석](<../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f24>) · [U-F24](#u-f24).

현재 경로/기존 검사: [settings/ArticleDisplayPopover.tsx](<../FE/src/features/settings/ArticleDisplayPopover.tsx>) · [settings/useReaderTypography.ts](<../FE/src/features/settings/useReaderTypography.ts>) · [navigation/DisplayNavigation.test.tsx](<../FE/src/app/navigation/DisplayNavigation.test.tsx>). 기능 경계: [V13](#v13) · [V16](#v16). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f24-01"></a>`T-F24-01` | [S037 기사 상세 상단](#s037) · [단계 PNG](<../medium/flows/Home/Story detail/Changing display/screens/01_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f24-01>) | 상태: 멤버 전용 기사 읽기 화면. [V13](#v13) 구현 연결; 해당 모의·미지원·차이 적용. [U-F24](#u-f24)의 미수록 전이는 미확인 |
| <a id="t-f24-02"></a>`T-F24-02` | [S168 기사 더보기 메뉴](#s168) · [단계 PNG](<../medium/flows/Home/Story detail/Changing display/screens/02_sc_d62e32234117483b85b4c73ed63249cd.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f24-02>) | 상태: 읽기·추천·작가·신고 행동. [V16](#v16) 구현 연결; 해당 모의·미지원·차이 적용. [U-F24](#u-f24)의 미수록 전이는 미확인 |
| <a id="t-f24-03"></a>`T-F24-03` | [S063 읽기 표시 설정 기본](#s063) · [단계 PNG](<../medium/flows/Home/Story detail/Changing display/screens/03_sc_557c1fb7c6bf4dcc82ba1d6aba677f94.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f24-03>) | 상태: 이 캡처의 현재 표시 설정: 100%, Default 글꼴, System default (Light), 타인 하이라이트 On. 제품 전체 초기 기본값 여부는 미확인.. [V16](#v16) 구현 연결; 해당 모의·미지원·차이 적용. [U-F24](#u-f24)의 미수록 전이는 미확인 |
| <a id="t-f24-04"></a>`T-F24-04` | [S125 글자 크기 확대](#s125) · [단계 PNG](<../medium/flows/Home/Story detail/Changing display/screens/04_sc_ad140eae0b7e409aa2204c1f36bfa385.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f24-04>) | 상태: 크기 변경이 화면에 반영. [V16](#v16) 구현 연결; 해당 모의·미지원·차이 적용. [U-F24](#u-f24)의 미수록 전이는 미확인 |
| <a id="t-f24-05"></a>`T-F24-05` | [S119 읽기 테마 선택](#s119) · [단계 PNG](<../medium/flows/Home/Story detail/Changing display/screens/05_sc_a5d80c9e0226452cbb67e018702c5f1b.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f24-05>) | 상태: 테마 선택 중. [V16](#v16) 구현 연결; 해당 모의·미지원·차이 적용. [U-F24](#u-f24)의 미수록 전이는 미확인 |
| <a id="t-f24-06"></a>`T-F24-06` | [S198 다크 테마 적용](#s198) · [단계 PNG](<../medium/flows/Home/Story detail/Changing display/screens/06_sc_fd7de1ebfba14fbca6ddbe3ff642c42c.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f24-06>) | 상태: 다크 테마 반영. [V16](#v16) 구현 연결; 해당 모의·미지원·차이 적용. [U-F24](#u-f24)의 미수록 전이는 미확인 |
| <a id="t-f24-07"></a>`T-F24-07` | [S001 타인 하이라이트 숨김](#s001) · [단계 PNG](<../medium/flows/Home/Story detail/Changing display/screens/07_sc_00409287a68f4416941e39326f6df6b9.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f24-07>) | 상태: 타인 하이라이트 표시 설정 변경. [V16](#v16) 구현 연결; 해당 모의·미지원·차이 적용. [U-F24](#u-f24)의 미수록 전이는 미확인 |
| <a id="t-f24-08"></a>`T-F24-08` | [S187 설정 닫힌 다크 기사](#s187) · [단계 PNG](<../medium/flows/Home/Story detail/Changing display/screens/08_sc_ee957cf03e9848948f9ec8189264d8d8.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f24-08>) | 상태: 표시 설정 적용 결과. [V13](#v13) 구현 연결; 해당 모의·미지원·차이 적용. [U-F24](#u-f24)의 미수록 전이는 미확인 |
| <a id="t-f24-09"></a>`T-F24-09` | [S164 다크 기사 본문](#s164) · [단계 PNG](<../medium/flows/Home/Story detail/Changing display/screens/09_sc_d1d05d6500f349d89c5a3e5646ff238b.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f24-09>) | 상태: 스크롤 중 읽기 UI. [V13](#v13) 구현 연결; 해당 모의·미지원·차이 적용. [U-F24](#u-f24)의 미수록 전이는 미확인 |

<a id="f25"></a>

### F25 — Home/Story detail/Highlighting a phrase

[원본 분석](<../medium/flows/Home/Story detail/Highlighting a phrase/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f25>) · [U-F25](#u-f25).

현재 경로/기존 검사: [highlights/PassageReader.tsx](<../FE/src/features/highlights/PassageReader.tsx>) · [highlights/NativePassagePicker.tsx](<../FE/src/features/highlights/NativePassagePicker.tsx>) · [navigation/HighlightsNavigation.test.tsx](<../FE/src/app/navigation/HighlightsNavigation.test.tsx>). 기능 경계: [V13](#v13) · [V17](#v17). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f25-01"></a>`T-F25-01` | [S189 기사 본문 스크롤](#s189) · [단계 PNG](<../medium/flows/Home/Story detail/Highlighting a phrase/screens/01_sc_f4b06612bdbf48ecbd8a7b6e2607d117.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f25-01>) | 상태: 본문 중간 읽기. [V13](#v13) 구현 연결; 해당 모의·미지원·차이 적용. [U-F25](#u-f25)의 미수록 전이는 미확인 |
| <a id="t-f25-02"></a>`T-F25-02` | [S122 본문 구절 선택](#s122) · [단계 PNG](<../medium/flows/Home/Story detail/Highlighting a phrase/screens/02_sc_a8112b7354bb44908f9359e95ba3c288.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f25-02>) | 상태: 텍스트 선택 상태. [V17](#v17) 구현 연결; 해당 모의·미지원·차이 적용. [U-F25](#u-f25)의 미수록 전이는 미확인 |
| <a id="t-f25-03"></a>`T-F25-03` | [S012 구절 하이라이트 반영](#s012) · [단계 PNG](<../medium/flows/Home/Story detail/Highlighting a phrase/screens/03_sc_0da01c48dbc9483798e4c2286a11237f.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f25-03>) | 상태: 하이라이트 적용 표시. [V17](#v17) 구현 연결; 해당 모의·미지원·차이 적용. [U-F25](#u-f25)의 미수록 전이는 미확인 |

<a id="f26"></a>

### F26 — Home/Story detail/Listening to a story

[원본 분석](<../medium/flows/Home/Story detail/Listening to a story/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f26>) · [U-F26](#u-f26).

현재 경로/기존 검사: [listening/ListeningPlayer.tsx](<../FE/src/features/listening/ListeningPlayer.tsx>) · [listening/ListeningSpeedPanel.tsx](<../FE/src/features/listening/ListeningSpeedPanel.tsx>) · [listening/ListeningVoicePanel.tsx](<../FE/src/features/listening/ListeningVoicePanel.tsx>) · [navigation/ListeningNavigation.test.tsx](<../FE/src/app/navigation/ListeningNavigation.test.tsx>). 기능 경계: [V13](#v13) · [V18](#v18). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f26-01"></a>`T-F26-01` | [S037 기사 상세 상단](#s037) · [단계 PNG](<../medium/flows/Home/Story detail/Listening to a story/screens/01_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f26-01>) | 상태: 멤버 전용 기사 읽기 화면. [V13](#v13) 구현 연결; 해당 모의·미지원·차이 적용. [U-F26](#u-f26)의 미수록 전이는 미확인 |
| <a id="t-f26-02"></a>`T-F26-02` | [S128 오디오 로딩](#s128) · [단계 PNG](<../medium/flows/Home/Story detail/Listening to a story/screens/02_sc_b43c7474098746baa684870217c28927.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f26-02>) | 상태: 오디오 준비 중. [V18](#v18) 구현 연결; 해당 모의·미지원·차이 적용. [U-F26](#u-f26)의 미수록 전이는 미확인 |
| <a id="t-f26-03"></a>`T-F26-03` | [S050 미니 플레이어 재생 상태](#s050) · [단계 PNG](<../medium/flows/Home/Story detail/Listening to a story/screens/03_sc_40448a752ea64391a724af01b1e050f1.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f26-03>) | 상태: 재생 중을 나타내는 UI. [V18](#v18) 구현 연결; 해당 모의·미지원·차이 적용. [U-F26](#u-f26)의 미수록 전이는 미확인 |
| <a id="t-f26-04"></a>`T-F26-04` | [S055 확장 오디오 플레이어](#s055) · [단계 PNG](<../medium/flows/Home/Story detail/Listening to a story/screens/04_sc_45ddcc1f43a54523a1314ce563abf5ee.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f26-04>) | 상태: 확장 재생 화면. [V18](#v18) 구현 연결; 해당 모의·미지원·차이 적용. [U-F26](#u-f26)의 미수록 전이는 미확인 |
| <a id="t-f26-05"></a>`T-F26-05` | [S160 재생 진행 상태](#s160) · [단계 PNG](<../medium/flows/Home/Story detail/Listening to a story/screens/05_sc_d035c7d2bcfe4d0f99df80fddecebdcd.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f26-05>) | 상태: 재생 위치 증가. [V18](#v18) 구현 연결; 해당 모의·미지원·차이 적용. [U-F26](#u-f26)의 미수록 전이는 미확인 |

<a id="f27"></a>

### F27 — Home/Story detail/Listening to a story/Changing playback speed

[원본 분석](<../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f27>) · [U-F27](#u-f27).

현재 경로/기존 검사: [listening/ListeningPlayer.tsx](<../FE/src/features/listening/ListeningPlayer.tsx>) · [listening/ListeningSpeedPanel.tsx](<../FE/src/features/listening/ListeningSpeedPanel.tsx>) · [listening/ListeningVoicePanel.tsx](<../FE/src/features/listening/ListeningVoicePanel.tsx>) · [navigation/ListeningNavigation.test.tsx](<../FE/src/app/navigation/ListeningNavigation.test.tsx>). 기능 경계: [V18](#v18) · [V19](#v19). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f27-01"></a>`T-F27-01` | [S055 확장 오디오 플레이어](#s055) · [단계 PNG](<../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/screens/01_sc_45ddcc1f43a54523a1314ce563abf5ee.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f27-01>) | 상태: 확장 재생 화면. [V18](#v18) 구현 연결; 해당 모의·미지원·차이 적용. [U-F27](#u-f27)의 미수록 전이는 미확인 |
| <a id="t-f27-02"></a>`T-F27-02` | [S016 재생 속도 선택 초기](#s016) · [단계 PNG](<../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/screens/02_sc_1965b9529b534e1597968039af1415b1.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f27-02>) | 상태: 현재 속도 표시. [V19](#v19) 구현 연결; 해당 모의·미지원·차이 적용. [U-F27](#u-f27)의 미수록 전이는 미확인 |
| <a id="t-f27-03"></a>`T-F27-03` | [S131 재생 속도 2.5배 선택](#s131) · [단계 PNG](<../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/screens/03_sc_b6f46f91fdc549b790b4e9c1a434afae.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f27-03>) | 상태: 변경값 표시. [V19](#v19) 구현 연결; 해당 모의·미지원·차이 적용. [U-F27](#u-f27)의 미수록 전이는 미확인 |
| <a id="t-f27-04"></a>`T-F27-04` | [S141 2.5배 재생 표시](#s141) · [단계 PNG](<../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/screens/04_sc_c0fd5f5f29594fb997865177863b9482.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f27-04>) | 상태: 배속 변경 반영. [V18](#v18) 구현 연결; 해당 모의·미지원·차이 적용. [U-F27](#u-f27)의 미수록 전이는 미확인 |

<a id="f28"></a>

### F28 — Home/Story detail/Listening to a story/Changing voice

[원본 분석](<../medium/flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f28>) · [U-F28](#u-f28).

현재 경로/기존 검사: [listening/ListeningPlayer.tsx](<../FE/src/features/listening/ListeningPlayer.tsx>) · [listening/ListeningSpeedPanel.tsx](<../FE/src/features/listening/ListeningSpeedPanel.tsx>) · [listening/ListeningVoicePanel.tsx](<../FE/src/features/listening/ListeningVoicePanel.tsx>) · [navigation/ListeningNavigation.test.tsx](<../FE/src/app/navigation/ListeningNavigation.test.tsx>). 기능 경계: [V18](#v18) · [V19](#v19). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f28-01"></a>`T-F28-01` | [S055 확장 오디오 플레이어](#s055) · [단계 PNG](<../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/01_sc_45ddcc1f43a54523a1314ce563abf5ee.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f28-01>) | 상태: 확장 재생 화면. [V18](#v18) 구현 연결; 해당 모의·미지원·차이 적용. [U-F28](#u-f28)의 미수록 전이는 미확인 |
| <a id="t-f28-02"></a>`T-F28-02` | [S003 플레이어 더보기](#s003) · [단계 PNG](<../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/02_sc_0414c81870534989959d677ecede926c.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f28-02>) | 상태: 음성·출력·콘텐츠 행동 메뉴. [V19](#v19) 구현 연결; 해당 모의·미지원·차이 적용. [U-F28](#u-f28)의 미수록 전이는 미확인 |
| <a id="t-f28-03"></a>`T-F28-03` | [S046 음성 선택 목록](#s046) · [단계 PNG](<../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/03_sc_3b3db04094fe4a189b31e66c28971bcd.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f28-03>) | 상태: Emma가 현재 선택된 음성 목록. 모든 계정의 기본 음성이라는 의미는 아니다.. [V19](#v19) 구현 연결; 해당 모의·미지원·차이 적용. [U-F28](#u-f28)의 미수록 전이는 미확인 |
| <a id="t-f28-04"></a>`T-F28-04` | [S154 언어별 음성 목록 스크롤](#s154) · [단계 PNG](<../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/04_sc_ca2321d6dc9142e5a97e2734260c2b0f.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f28-04>) | 상태: 다국어 음성 선택지 표시. [V19](#v19) 구현 연결; 해당 모의·미지원·차이 적용. [U-F28](#u-f28)의 미수록 전이는 미확인 |
| <a id="t-f28-05"></a>`T-F28-05` | [S088 Hans 음성 선택](#s088) · [단계 PNG](<../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/05_sc_78bee192bd2041a98f6721240f2352d5.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f28-05>) | 상태: 음성 선택 변경. [V19](#v19) 구현 연결; 해당 모의·미지원·차이 적용. [U-F28](#u-f28)의 미수록 전이는 미확인 |
| <a id="t-f28-06"></a>`T-F28-06` | [S192 음성 선택 후 플레이어](#s192) · [단계 PNG](<../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/06_sc_f637c648d6ec470a81cf77e5594e02da.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f28-06>) | 상태: 재생 UI 복귀. [V18](#v18) 구현 연결; 해당 모의·미지원·차이 적용. [U-F28](#u-f28)의 미수록 전이는 미확인 |

<a id="f29"></a>

### F29 — Home/Story detail/Responding to a phrase

[원본 분석](<../medium/flows/Home/Story detail/Responding to a phrase/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f29>) · [U-F29](#u-f29).

현재 경로/기존 검사: [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>) · [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [navigation/ResponsesNavigation.test.tsx](<../FE/src/app/navigation/ResponsesNavigation.test.tsx>). 기능 경계: [V17](#v17) · [V20](#v20). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f29-01"></a>`T-F29-01` | [S122 본문 구절 선택](#s122) · [단계 PNG](<../medium/flows/Home/Story detail/Responding to a phrase/screens/01_sc_a8112b7354bb44908f9359e95ba3c288.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f29-01>) | 상태: 텍스트 선택 상태. [V17](#v17) 구현 연결; 해당 모의·미지원·차이 적용. [U-F29](#u-f29)의 미수록 전이는 미확인 |
| <a id="t-f29-02"></a>`T-F29-02` | [S097 구절 인용 응답 작성 시작](#s097) · [단계 PNG](<../medium/flows/Home/Story detail/Responding to a phrase/screens/02_sc_8accfd977771416a89329576c7ba48d8.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f29-02>) | 상태: 인용 포함 응답 초안. [V20](#v20) 구현 연결; 해당 모의·미지원·차이 적용. [U-F29](#u-f29)의 미수록 전이는 미확인 |
| <a id="t-f29-03"></a>`T-F29-03` | [S019 구절 응답 입력](#s019) · [단계 PNG](<../medium/flows/Home/Story detail/Responding to a phrase/screens/03_sc_1b7c2e5f28d5419d889919fc0c9e3980.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f29-03>) | 상태: 인용 응답 제출 준비. [V20](#v20) 구현 연결; 해당 모의·미지원·차이 적용. [U-F29](#u-f29)의 미수록 전이는 미확인 |
| <a id="t-f29-04"></a>`T-F29-04` | [S197 구절 인용 응답 등록](#s197) · [단계 PNG](<../medium/flows/Home/Story detail/Responding to a phrase/screens/04_sc_fcdcd471caeb41b8bfa89273d8e29a8d.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f29-04>) | 상태: 인용 응답 목록에 표시. [V20](#v20) 구현 연결; 해당 모의·미지원·차이 적용. [U-F29](#u-f29)의 미수록 전이는 미확인 |

<a id="f30"></a>

### F30 — Home/Story detail/Responses

[원본 분석](<../medium/flows/Home/Story detail/Responses/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f30>) · [U-F30](#u-f30).

현재 경로/기존 검사: [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>) · [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [navigation/ResponsesNavigation.test.tsx](<../FE/src/app/navigation/ResponsesNavigation.test.tsx>). 기능 경계: [V13](#v13) · [V20](#v20). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f30-01"></a>`T-F30-01` | [S037 기사 상세 상단](#s037) · [단계 PNG](<../medium/flows/Home/Story detail/Responses/screens/01_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f30-01>) | 상태: 멤버 전용 기사 읽기 화면. [V13](#v13) 구현 연결; 해당 모의·미지원·차이 적용. [U-F30](#u-f30)의 미수록 전이는 미확인 |
| <a id="t-f30-02"></a>`T-F30-02` | [S100 응답 시트와 중첩 답글](#s100) · [단계 PNG](<../medium/flows/Home/Story detail/Responses/screens/02_sc_915888473ac24e8987c996b8954f54c6.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f30-02>) | 상태: 복수 깊이 답글 표시. [V20](#v20) 구현 연결; 해당 모의·미지원·차이 적용. [U-F30](#u-f30)의 미수록 전이는 미확인 |
| <a id="t-f30-03"></a>`T-F30-03` | [S112 응답 스크롤과 추가 답글](#s112) · [단계 PNG](<../medium/flows/Home/Story detail/Responses/screens/03_sc_9c9af2f5f8ad43c193c0c30ef0974156.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f30-03>) | 상태: 접힌 본문·부분 로딩 답글. [V20](#v20) 구현 연결; 해당 모의·미지원·차이 적용. [U-F30](#u-f30)의 미수록 전이는 미확인 |

<a id="f31"></a>

### F31 — Home/Story detail/Responses/Commenting a story

[원본 분석](<../medium/flows/Home/Story detail/Responses/Commenting a story/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f31>) · [U-F31](#u-f31).

현재 경로/기존 검사: [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>) · [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [navigation/ResponsesNavigation.test.tsx](<../FE/src/app/navigation/ResponsesNavigation.test.tsx>). 기능 경계: [V20](#v20). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f31-01"></a>`T-F31-01` | [S100 응답 시트와 중첩 답글](#s100) · [단계 PNG](<../medium/flows/Home/Story detail/Responses/Commenting a story/screens/01_sc_915888473ac24e8987c996b8954f54c6.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f31-01>) | 상태: 복수 깊이 답글 표시. [V20](#v20) 구현 연결; 해당 모의·미지원·차이 적용. [U-F31](#u-f31)의 미수록 전이는 미확인 |
| <a id="t-f31-02"></a>`T-F31-02` | [S158 기사 응답 입력](#s158) · [단계 PNG](<../medium/flows/Home/Story detail/Responses/Commenting a story/screens/02_sc_cebfd0ad696f4e20a1c7d99da1dc1cef.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f31-02>) | 상태: 응답 제출 전. [V20](#v20) 구현 연결; 해당 모의·미지원·차이 적용. [U-F31](#u-f31)의 미수록 전이는 미확인 |
| <a id="t-f31-03"></a>`T-F31-03` | [S062 새 응답 표시](#s062) · [단계 PNG](<../medium/flows/Home/Story detail/Responses/Commenting a story/screens/03_sc_500793b8306c411585ba54ddaf6a8f25.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f31-03>) | 상태: Responses 833 및 본인 새 응답 표시. Commenting a story 흐름의 직전 입력 화면에서는 832였다. [V20](#v20) 구현 연결; 해당 모의·미지원·차이 적용. [U-F31](#u-f31)의 미수록 전이는 미확인 |

<a id="f32"></a>

### F32 — Home/Story detail/Responses/Commenting a story/Deleting a response

[원본 분석](<../medium/flows/Home/Story detail/Responses/Commenting a story/Deleting a response/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f32>) · [U-F32](#u-f32).

현재 경로/기존 검사: [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>) · [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [navigation/ResponsesNavigation.test.tsx](<../FE/src/app/navigation/ResponsesNavigation.test.tsx>). 기능 경계: [V20](#v20). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f32-01"></a>`T-F32-01` | [S062 새 응답 표시](#s062) · [단계 PNG](<../medium/flows/Home/Story detail/Responses/Commenting a story/Deleting a response/screens/01_sc_500793b8306c411585ba54ddaf6a8f25.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f32-01>) | 상태: Responses 833 및 본인 새 응답 표시. Commenting a story 흐름의 직전 입력 화면에서는 832였다. [V20](#v20) 구현 연결; 해당 모의·미지원·차이 적용. [U-F32](#u-f32)의 미수록 전이는 미확인 |
| <a id="t-f32-02"></a>`T-F32-02` | [S181 본인 응답 관리 메뉴](#s181) · [단계 PNG](<../medium/flows/Home/Story detail/Responses/Commenting a story/Deleting a response/screens/02_sc_e4b254a2635b47069e314a1462c985d6.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f32-02>) | 상태: 수정·삭제 선택 가능. [V20](#v20) 구현 연결; 해당 모의·미지원·차이 적용. [U-F32](#u-f32)의 미수록 전이는 미확인 |
| <a id="t-f32-03"></a>`T-F32-03` | [S124 응답 삭제 성공 표시](#s124) · [단계 PNG](<../medium/flows/Home/Story detail/Responses/Commenting a story/Deleting a response/screens/03_sc_aa1b32e30ce5436b8ca8fcc4c7d74d1b.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f32-03>) | 상태: 삭제 성공 안내. [V20](#v20) 구현 연결; 해당 모의·미지원·차이 적용. [U-F32](#u-f32)의 미수록 전이는 미확인 |

<a id="f33"></a>

### F33 — Home/Story detail/Responses/Commenting a story/Editing a response

[원본 분석](<../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f33>) · [U-F33](#u-f33).

현재 경로/기존 검사: [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>) · [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [navigation/ResponsesNavigation.test.tsx](<../FE/src/app/navigation/ResponsesNavigation.test.tsx>). 기능 경계: [V20](#v20). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f33-01"></a>`T-F33-01` | [S062 새 응답 표시](#s062) · [단계 PNG](<../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/screens/01_sc_500793b8306c411585ba54ddaf6a8f25.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f33-01>) | 상태: Responses 833 및 본인 새 응답 표시. Commenting a story 흐름의 직전 입력 화면에서는 832였다. [V20](#v20) 구현 연결; 해당 모의·미지원·차이 적용. [U-F33](#u-f33)의 미수록 전이는 미확인 |
| <a id="t-f33-02"></a>`T-F33-02` | [S181 본인 응답 관리 메뉴](#s181) · [단계 PNG](<../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/screens/02_sc_e4b254a2635b47069e314a1462c985d6.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f33-02>) | 상태: 수정·삭제 선택 가능. [V20](#v20) 구현 연결; 해당 모의·미지원·차이 적용. [U-F33](#u-f33)의 미수록 전이는 미확인 |
| <a id="t-f33-03"></a>`T-F33-03` | [S009 기존 응답 편집 입력](#s009) · [단계 PNG](<../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/screens/03_sc_0817971af7f14028a36fd2a233dd5ee7.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f33-03>) | 상태: 편집 흐름이나 UI 문구는 Replying. [V20](#v20) 구현 연결; 해당 모의·미지원·차이 적용. [U-F33](#u-f33)의 미수록 전이는 미확인 |
| <a id="t-f33-04"></a>`T-F33-04` | [S010 응답 수정 내용 입력](#s010) · [단계 PNG](<../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/screens/04_sc_0950e3a03f7e4b02b9db0d98f818bdea.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f33-04>) | 상태: 수정 제출 전. [V20](#v20) 구현 연결; 해당 모의·미지원·차이 적용. [U-F33](#u-f33)의 미수록 전이는 미확인 |
| <a id="t-f33-05"></a>`T-F33-05` | [S142 응답 수정 반영](#s142) · [단계 PNG](<../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/screens/05_sc_c1a6af7cef31436a9cdd090eae87479f.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f33-05>) | 상태: 내용 변경과 edited 확인. [V20](#v20) 구현 연결; 해당 모의·미지원·차이 적용. [U-F33](#u-f33)의 미수록 전이는 미확인 |

<a id="f34"></a>

### F34 — Home/Story detail/Responses/Medium policy

[원본 분석](<../medium/flows/Home/Story detail/Responses/Medium policy/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f34>) · [U-F34](#u-f34).

현재 경로/기존 검사: [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>) · [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [navigation/ResponsesNavigation.test.tsx](<../FE/src/app/navigation/ResponsesNavigation.test.tsx>). 기능 경계: [V20](#v20) · [V21](#v21). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f34-01"></a>`T-F34-01` | [S100 응답 시트와 중첩 답글](#s100) · [단계 PNG](<../medium/flows/Home/Story detail/Responses/Medium policy/screens/01_sc_915888473ac24e8987c996b8954f54c6.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f34-01>) | 상태: 복수 깊이 답글 표시. [V20](#v20) 구현 연결; 해당 모의·미지원·차이 적용. [U-F34](#u-f34)의 미수록 전이는 미확인 |
| <a id="t-f34-02"></a>`T-F34-02` | [S008 Medium Rules 정책 문서](#s008) · [단계 PNG](<../medium/flows/Home/Story detail/Responses/Medium policy/screens/02_sc_063290fab51b4acd913212f85acde70d.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f34-02>) | 상태: 응답에서 연결된 정책 읽기. [V21](#v21) 구현 연결; 해당 모의·미지원·차이 적용. [U-F34](#u-f34)의 미수록 전이는 미확인 |

<a id="f35"></a>

### F35 — Home/Story detail/Responses/Replying a response

[원본 분석](<../medium/flows/Home/Story detail/Responses/Replying a response/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f35>) · [U-F35](#u-f35).

현재 경로/기존 검사: [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>) · [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [navigation/ResponsesNavigation.test.tsx](<../FE/src/app/navigation/ResponsesNavigation.test.tsx>). 기능 경계: [V20](#v20). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f35-01"></a>`T-F35-01` | [S100 응답 시트와 중첩 답글](#s100) · [단계 PNG](<../medium/flows/Home/Story detail/Responses/Replying a response/screens/01_sc_915888473ac24e8987c996b8954f54c6.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f35-01>) | 상태: 복수 깊이 답글 표시. [V20](#v20) 구현 연결; 해당 모의·미지원·차이 적용. [U-F35](#u-f35)의 미수록 전이는 미확인 |
| <a id="t-f35-02"></a>`T-F35-02` | [S072 답글 대상 선택](#s072) · [단계 PNG](<../medium/flows/Home/Story detail/Responses/Replying a response/screens/02_sc_6101af9ca21443afbe2c2146c8ac2e3d.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f35-02>) | 상태: 특정 응답에 답글 모드. [V20](#v20) 구현 연결; 해당 모의·미지원·차이 적용. [U-F35](#u-f35)의 미수록 전이는 미확인 |
| <a id="t-f35-03"></a>`T-F35-03` | [S092 답글 내용 입력](#s092) · [단계 PNG](<../medium/flows/Home/Story detail/Responses/Replying a response/screens/03_sc_8202187474f444de8773b38fe92c4d82.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f35-03>) | 상태: 답글 제출 전. [V20](#v20) 구현 연결; 해당 모의·미지원·차이 적용. [U-F35](#u-f35)의 미수록 전이는 미확인 |
| <a id="t-f35-04"></a>`T-F35-04` | [S071 답글 생성 표시](#s071) · [단계 PNG](<../medium/flows/Home/Story detail/Responses/Replying a response/screens/04_sc_60bd813234264b59b304bd3ac3df0af4.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f35-04>) | 상태: 새 답글 표시. [V20](#v20) 구현 연결; 해당 모의·미지원·차이 적용. [U-F35](#u-f35)의 미수록 전이는 미확인 |

<a id="f36"></a>

### F36 — Home/Story detail/Responses/Sorting responses

[원본 분석](<../medium/flows/Home/Story detail/Responses/Sorting responses/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f36>) · [U-F36](#u-f36).

현재 경로/기존 검사: [responses/ResponsesPanel.tsx](<../FE/src/features/responses/ResponsesPanel.tsx>) · [responses/responseRows.ts](<../FE/src/features/responses/responseRows.ts>) · [responses/ResponseManagement.tsx](<../FE/src/features/responses/ResponseManagement.tsx>) · [navigation/ResponsesNavigation.test.tsx](<../FE/src/app/navigation/ResponsesNavigation.test.tsx>). 기능 경계: [V20](#v20). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f36-01"></a>`T-F36-01` | [S100 응답 시트와 중첩 답글](#s100) · [단계 PNG](<../medium/flows/Home/Story detail/Responses/Sorting responses/screens/01_sc_915888473ac24e8987c996b8954f54c6.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f36-01>) | 상태: 복수 깊이 답글 표시. [V20](#v20) 구현 연결; 해당 모의·미지원·차이 적용. [U-F36](#u-f36)의 미수록 전이는 미확인 |
| <a id="t-f36-02"></a>`T-F36-02` | [S111 응답 정렬 선택](#s111) · [단계 PNG](<../medium/flows/Home/Story detail/Responses/Sorting responses/screens/02_sc_9b94403d105c4eda8933ae7bbe2d6a00.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f36-02>) | 상태: 정렬 선택 중. [V20](#v20) 구현 연결; 해당 모의·미지원·차이 적용. [U-F36](#u-f36)의 미수록 전이는 미확인 |
| <a id="t-f36-03"></a>`T-F36-03` | [S032 최신순 응답 목록](#s032) · [단계 PNG](<../medium/flows/Home/Story detail/Responses/Sorting responses/screens/03_sc_280ed6ce41b24f6f876aac698f4a8119.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f36-03>) | 상태: 최근 응답이 먼저 보임. [V20](#v20) 구현 연결; 해당 모의·미지원·차이 적용. [U-F36](#u-f36)의 미수록 전이는 미확인 |

<a id="f37"></a>

### F37 — Home/Story detail/Saving a story

[원본 분석](<../medium/flows/Home/Story detail/Saving a story/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f37>) · [U-F37](#u-f37).

현재 경로/기존 검사: [bookmarks/ArticleBookmarkControl.tsx](<../FE/src/features/bookmarks/ArticleBookmarkControl.tsx>) · [bookmarks/SaveToListSheet.tsx](<../FE/src/features/bookmarks/SaveToListSheet.tsx>) · [navigation/BookmarkNavigation.test.tsx](<../FE/src/app/navigation/BookmarkNavigation.test.tsx>). 기능 경계: [V13](#v13) · [V22](#v22). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f37-01"></a>`T-F37-01` | [S037 기사 상세 상단](#s037) · [단계 PNG](<../medium/flows/Home/Story detail/Saving a story/screens/01_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f37-01>) | 상태: 멤버 전용 기사 읽기 화면. [V13](#v13) 구현 연결; 해당 모의·미지원·차이 적용. [U-F37](#u-f37)의 미수록 전이는 미확인 |
| <a id="t-f37-02"></a>`T-F37-02` | [S036 기사 저장 대상 선택](#s036) · [단계 PNG](<../medium/flows/Home/Story detail/Saving a story/screens/02_sc_31edfd53d2874259a6ed5ecbc756d10b.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f37-02>) | 상태: 비공개 읽기 목록 선택. [V22](#v22) 구현 연결; 해당 모의·미지원·차이 적용. [U-F37](#u-f37)의 미수록 전이는 미확인 |
| <a id="t-f37-03"></a>`T-F37-03` | [S172 저장 아이콘 활성](#s172) · [단계 PNG](<../medium/flows/Home/Story detail/Saving a story/screens/03_sc_dda8e78e9eb943629d3cf54eaed5fc22.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f37-03>) | 상태: 저장 선택 반영. [V22](#v22) 구현 연결; 해당 모의·미지원·차이 적용. [U-F37](#u-f37)의 미수록 전이는 미확인 |

<a id="f38"></a>

### F38 — Home/Story detail/Sending claps

[원본 분석](<../medium/flows/Home/Story detail/Sending claps/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f38>) · [U-F38](#u-f38).

현재 경로/기존 검사: [reactions/ClapControl.tsx](<../FE/src/features/reactions/ClapControl.tsx>) · [navigation/ClapHistoryNavigation.test.tsx](<../FE/src/app/navigation/ClapHistoryNavigation.test.tsx>). 기능 경계: [V13](#v13). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f38-01"></a>`T-F38-01` | [S037 기사 상세 상단](#s037) · [단계 PNG](<../medium/flows/Home/Story detail/Sending claps/screens/01_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f38-01>) | 상태: 멤버 전용 기사 읽기 화면. [V13](#v13) 구현 연결; 해당 모의·미지원·차이 적용. [U-F38](#u-f38)의 미수록 전이는 미확인 |
| <a id="t-f38-02"></a>`T-F38-02` | [S007 박수 전송 피드백](#s007) · [단계 PNG](<../medium/flows/Home/Story detail/Sending claps/screens/02_sc_0629a27b99a645cabe6e110b5d3d3d57.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f38-02>) | 상태: 박수 입력 피드백 표시. [V13](#v13) 구현 연결; 해당 모의·미지원·차이 적용. [U-F38](#u-f38)의 미수록 전이는 미확인 |
| <a id="t-f38-03"></a>`T-F38-03` | [S179 박수 피드백 종료](#s179) · [단계 PNG](<../medium/flows/Home/Story detail/Sending claps/screens/03_sc_e3b85b46c655483eb954e6f953d0b7f6.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f38-03>) | 상태: 일시적 +16 배지 사라짐. [V13](#v13) 구현 연결; 해당 모의·미지원·차이 적용. [U-F38](#u-f38)의 미수록 전이는 미확인 |

<a id="f39"></a>

### F39 — Home/Story detail/Sharing a story

[원본 분석](<../medium/flows/Home/Story detail/Sharing a story/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f39>) · [U-F39](#u-f39).

현재 경로/기존 검사: [sharing/ShareSheet.tsx](<../FE/src/features/sharing/ShareSheet.tsx>) · [navigation/SharingNavigation.test.tsx](<../FE/src/app/navigation/SharingNavigation.test.tsx>). 기능 경계: [V13](#v13) · [V23](#v23). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f39-01"></a>`T-F39-01` | [S037 기사 상세 상단](#s037) · [단계 PNG](<../medium/flows/Home/Story detail/Sharing a story/screens/01_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f39-01>) | 상태: 멤버 전용 기사 읽기 화면. [V13](#v13) 구현 연결; 해당 모의·미지원·차이 적용. [U-F39](#u-f39)의 미수록 전이는 미확인 |
| <a id="t-f39-02"></a>`T-F39-02` | [S163 공유 카드 시트](#s163) · [단계 PNG](<../medium/flows/Home/Story detail/Sharing a story/screens/02_sc_d1c962cd0a8240ee94769a612a81d64f.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f39-02>) | 상태: 공유 미리보기. [V23](#v23) 구현 연결; 해당 모의·미지원·차이 적용. [U-F39](#u-f39)의 미수록 전이는 미확인 |
| <a id="t-f39-03"></a>`T-F39-03` | [S051 링크 복사 피드백](#s051) · [단계 PNG](<../medium/flows/Home/Story detail/Sharing a story/screens/03_sc_4225892a7f304ec9b0442fad0aae38bb.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f39-03>) | 상태: 복사 완료 안내. [V23](#v23) 구현 연결; 해당 모의·미지원·차이 적용. [U-F39](#u-f39)의 미수록 전이는 미확인 |
| <a id="t-f39-04"></a>`T-F39-04` | [S028 이미지 저장 행동 노출](#s028) · [단계 PNG](<../medium/flows/Home/Story detail/Sharing a story/screens/04_sc_221a38b7f8ac42959ddd75840253b5c8.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f39-04>) | 상태: Save image 전체 표시. [V23](#v23) 구현 연결; 해당 모의·미지원·차이 적용. [U-F39](#u-f39)의 미수록 전이는 미확인 |

<a id="f40"></a>

### F40 — Home/Story detail/Sharing a story/Downloading an image

[원본 분석](<../medium/flows/Home/Story detail/Sharing a story/Downloading an image/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f40>) · [U-F40](#u-f40).

현재 경로/기존 검사: [sharing/ShareSheet.tsx](<../FE/src/features/sharing/ShareSheet.tsx>) · [navigation/SharingNavigation.test.tsx](<../FE/src/app/navigation/SharingNavigation.test.tsx>). 기능 경계: [V23](#v23). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f40-01"></a>`T-F40-01` | [S028 이미지 저장 행동 노출](#s028) · [단계 PNG](<../medium/flows/Home/Story detail/Sharing a story/Downloading an image/screens/01_sc_221a38b7f8ac42959ddd75840253b5c8.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f40-01>) | 상태: Save image 전체 표시. [V23](#v23) 구현 연결; 해당 모의·미지원·차이 적용. [U-F40](#u-f40)의 미수록 전이는 미확인 |
| <a id="t-f40-02"></a>`T-F40-02` | [S073 공유 이미지 저장 안내](#s073) · [단계 PNG](<../medium/flows/Home/Story detail/Sharing a story/Downloading an image/screens/02_sc_62256b592ebc4b028f1097aa21f9e400.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f40-02>) | 상태: 이미지 저장 성공 안내. [V23](#v23) 구현 연결; 해당 모의·미지원·차이 적용. [U-F40](#u-f40)의 미수록 전이는 미확인 |

<a id="f41"></a>

### F41 — Library

[원본 분석](<../medium/flows/Library/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f41>) · [U-F41](#u-f41).

현재 경로/기존 검사: [bookmarks/LibraryScreen.tsx](<../FE/src/features/bookmarks/LibraryScreen.tsx>) · [highlights/HighlightList.tsx](<../FE/src/features/highlights/HighlightList.tsx>) · [navigation/BookmarkNavigation.test.tsx](<../FE/src/app/navigation/BookmarkNavigation.test.tsx>) · [navigation/DigestNavigation.test.tsx](<../FE/src/app/navigation/DigestNavigation.test.tsx>). 기능 경계: [V01](#v01) · [V24](#v24) · [V27](#v27). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f41-01"></a>`T-F41-01` | [S069 For you 홈 피드](#s069) · [단계 PNG](<../medium/flows/Library/screens/01_sc_5e0ba0e498ff49579bf838096aec4b5e.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f41-01>) | 상태: 추천 기사 목록. [V01](#v01) 구현 연결; 해당 모의·미지원·차이 적용. [U-F41](#u-f41)의 미수록 전이는 미확인 |
| <a id="t-f41-02"></a>`T-F41-02` | [S095 Library 초기 목록](#s095) · [단계 PNG](<../medium/flows/Library/screens/02_sc_84e0421de98041bbb014822fc05dd3fb.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f41-02>) | 상태: 기본 읽기 목록이 비어 있음. [V24](#v24) 구현 연결; 해당 모의·미지원·차이 적용. [U-F41](#u-f41)의 미수록 전이는 미확인 |
| <a id="t-f41-03"></a>`T-F41-03` | [S066 저장 글 있는 읽기 목록](#s066) · [단계 PNG](<../medium/flows/Library/screens/03_sc_57450c38bf994be18d95fcaf712c56ba.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f41-03>) | 상태: 기본 목록에 글 존재. [V24](#v24) 구현 연결; 해당 모의·미지원·차이 적용. [U-F41](#u-f41)의 미수록 전이는 미확인 |
| <a id="t-f41-04"></a>`T-F41-04` | [S132 Digest 일자별 추천](#s132) · [단계 PNG](<../medium/flows/Library/screens/04_sc_bafbf7b80b154e25aec15e120a13f72a.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f41-04>) | 상태: 특정 날짜 다이제스트. [V27](#v27) 구현 연결; 해당 모의·미지원·차이 적용. [U-F41](#u-f41)의 미수록 전이는 미확인 |
| <a id="t-f41-05"></a>`T-F41-05` | [S145 저장한 하이라이트 목록](#s145) · [단계 PNG](<../medium/flows/Library/screens/05_sc_c37aefd0916548dda3cb46d61cc25193.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f41-05>) | 상태: 여러 글의 개인 하이라이트 모음. [V24](#v24) 구현 연결; 해당 모의·미지원·차이 적용. [U-F41](#u-f41)의 미수록 전이는 미확인 |

<a id="f42"></a>

### F42 — Library/Creating a list

[원본 분석](<../medium/flows/Library/Creating a list/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f42>) · [U-F42](#u-f42).

현재 경로/기존 검사: [bookmarks/ListEditorSheet.tsx](<../FE/src/features/bookmarks/ListEditorSheet.tsx>) · [navigation/ListManagementNavigation.test.tsx](<../FE/src/app/navigation/ListManagementNavigation.test.tsx>). 기능 경계: [V24](#v24) · [V25](#v25). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f42-01"></a>`T-F42-01` | [S066 저장 글 있는 읽기 목록](#s066) · [단계 PNG](<../medium/flows/Library/Creating a list/screens/01_sc_57450c38bf994be18d95fcaf712c56ba.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f42-01>) | 상태: 기본 목록에 글 존재. [V24](#v24) 구현 연결; 해당 모의·미지원·차이 적용. [U-F42](#u-f42)의 미수록 전이는 미확인 |
| <a id="t-f42-02"></a>`T-F42-02` | [S076 리스트 생성 빈 폼](#s076) · [단계 PNG](<../medium/flows/Library/Creating a list/screens/02_sc_675e3eda08504708979533659dacdcf6.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f42-02>) | 상태: 생성 전 입력. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F42](#u-f42)의 미수록 전이는 미확인 |
| <a id="t-f42-03"></a>`T-F42-03` | [S155 리스트 이름 입력](#s155) · [단계 PNG](<../medium/flows/Library/Creating a list/screens/03_sc_ca3b32e4373a40fc84405838671eab27.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f42-03>) | 상태: 이름만 입력해 생성 가능 표시. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F42](#u-f42)의 미수록 전이는 미확인 |
| <a id="t-f42-04"></a>`T-F42-04` | [S039 새 리스트 생성 표시](#s039) · [단계 PNG](<../medium/flows/Library/Creating a list/screens/04_sc_35dcbd9d4308404b9f11ecd03f893eb8.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f42-04>) | 상태: 새 목록 생성 결과. [V24](#v24) 구현 연결; 해당 모의·미지원·차이 적용. [U-F42](#u-f42)의 미수록 전이는 미확인 |

<a id="f43"></a>

### F43 — Library/Filtering digest

[원본 분석](<../medium/flows/Library/Filtering digest/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f43>) · [U-F43](#u-f43).

현재 경로/기존 검사: [digest/DigestPanel.tsx](<../FE/src/features/digest/DigestPanel.tsx>) · [navigation/DigestNavigation.test.tsx](<../FE/src/app/navigation/DigestNavigation.test.tsx>). 기능 경계: [V27](#v27). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f43-01"></a>`T-F43-01` | [S132 Digest 일자별 추천](#s132) · [단계 PNG](<../medium/flows/Library/Filtering digest/screens/01_sc_bafbf7b80b154e25aec15e120a13f72a.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f43-01>) | 상태: 특정 날짜 다이제스트. [V27](#v27) 구현 연결; 해당 모의·미지원·차이 적용. [U-F43](#u-f43)의 미수록 전이는 미확인 |
| <a id="t-f43-02"></a>`T-F43-02` | [S193 다이제스트 날짜 선택](#s193) · [단계 PNG](<../medium/flows/Library/Filtering digest/screens/02_sc_f647f3c6b04d48e9bb1b31f5d0fb2cfe.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f43-02>) | 상태: 최근 10개까지 볼 수 있다는 안내. [V27](#v27) 구현 연결; 해당 모의·미지원·차이 적용. [U-F43](#u-f43)의 미수록 전이는 미확인 |
| <a id="t-f43-03"></a>`T-F43-03` | [S096 과거 다이제스트 선택](#s096) · [단계 PNG](<../medium/flows/Library/Filtering digest/screens/03_sc_8866044a55164824903265c3b8b97337.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f43-03>) | 상태: 다른 날짜 임시 선택. [V27](#v27) 구현 연결; 해당 모의·미지원·차이 적용. [U-F43](#u-f43)의 미수록 전이는 미확인 |
| <a id="t-f43-04"></a>`T-F43-04` | [S116 선택 날짜 다이제스트](#s116) · [단계 PNG](<../medium/flows/Library/Filtering digest/screens/04_sc_a42fffc3afb34954bc5e4afcc2e08e04.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f43-04>) | 상태: 선택한 날짜 콘텐츠 표시. [V27](#v27) 구현 연결; 해당 모의·미지원·차이 적용. [U-F43](#u-f43)의 미수록 전이는 미확인 |

<a id="f44"></a>

### F44 — Library/Filtering digest/Digest settings

[원본 분석](<../medium/flows/Library/Filtering digest/Digest settings/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f44>) · [U-F44](#u-f44).

현재 경로/기존 검사: [notifications/NotificationSettingsScreen.tsx](<../FE/src/features/notifications/NotificationSettingsScreen.tsx>) · [navigation/NotificationNavigation.test.tsx](<../FE/src/app/navigation/NotificationNavigation.test.tsx>). 기능 경계: [V27](#v27) · [V28](#v28). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f44-01"></a>`T-F44-01` | [S132 Digest 일자별 추천](#s132) · [단계 PNG](<../medium/flows/Library/Filtering digest/Digest settings/screens/01_sc_bafbf7b80b154e25aec15e120a13f72a.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f44-01>) | 상태: 특정 날짜 다이제스트. [V27](#v27) 구현 연결; 해당 모의·미지원·차이 적용. [U-F44](#u-f44)의 미수록 전이는 미확인 |
| <a id="t-f44-02"></a>`T-F44-02` | [S162 다이제스트 설정](#s162) · [단계 PNG](<../medium/flows/Library/Filtering digest/Digest settings/screens/02_sc_d17bad2e556e4b0abfdc9541f90c46f2.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f44-02>) | 상태: 다이제스트 주기·알림 채널 표시. [V28](#v28) 구현 연결; 해당 모의·미지원·차이 적용. [U-F44](#u-f44)의 미수록 전이는 미확인 |

<a id="f45"></a>

### F45 — Library/List detail/Adding a note

[원본 분석](<../medium/flows/Library/List detail/Adding a note/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f45>) · [U-F45](#u-f45).

현재 경로/기존 검사: [bookmarks/ListNoteSheet.tsx](<../FE/src/features/bookmarks/ListNoteSheet.tsx>) · [navigation/ListEditingNavigation.test.tsx](<../FE/src/app/navigation/ListEditingNavigation.test.tsx>). 기능 경계: [V25](#v25). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f45-01"></a>`T-F45-01` | [S177 리스트 상세 스크롤](#s177) · [단계 PNG](<../medium/flows/Library/List detail/Adding a note/screens/01_sc_e20e59ee459b4a0d9a0a0302091962bd.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f45-01>) | 상태: 목록 후반. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F45](#u-f45)의 미수록 전이는 미확인 |
| <a id="t-f45-02"></a>`T-F45-02` | [S195 리스트 항목 메뉴](#s195) · [단계 PNG](<../medium/flows/Library/List detail/Adding a note/screens/02_sc_fa4e79f0bed747d698ae44e23f9223f9.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f45-02>) | 상태: 항목별 관리. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F45](#u-f45)의 미수록 전이는 미확인 |
| <a id="t-f45-03"></a>`T-F45-03` | [S200 리스트 항목 메모 폼](#s200) · [단계 PNG](<../medium/flows/Library/List detail/Adding a note/screens/03_sc_ffa4d0c8f01440e1a0842a4e1a59708a.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f45-03>) | 상태: 메모 입력 전. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F45](#u-f45)의 미수록 전이는 미확인 |
| <a id="t-f45-04"></a>`T-F45-04` | [S191 메모 내용 입력](#s191) · [단계 PNG](<../medium/flows/Library/List detail/Adding a note/screens/04_sc_f4f970015d6743538664901310d2c17b.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f45-04>) | 상태: 메모 제출 준비. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F45](#u-f45)의 미수록 전이는 미확인 |
| <a id="t-f45-05"></a>`T-F45-05` | [S002 리스트 메모 반영](#s002) · [단계 PNG](<../medium/flows/Library/List detail/Adding a note/screens/05_sc_02d96a649c7a461b9c07155d33c1dbfc.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f45-05>) | 상태: 메모 저장 결과 표시. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F45](#u-f45)의 미수록 전이는 미확인 |

<a id="f46"></a>

### F46 — Library/List detail

[원본 분석](<../medium/flows/Library/List detail/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f46>) · [U-F46](#u-f46).

현재 경로/기존 검사: [bookmarks/ReadingListScreen.tsx](<../FE/src/features/bookmarks/ReadingListScreen.tsx>) · [bookmarks/ListActions.tsx](<../FE/src/features/bookmarks/ListActions.tsx>) · [navigation/ListEditingNavigation.test.tsx](<../FE/src/app/navigation/ListEditingNavigation.test.tsx>) · [navigation/PublishedLibrarySession.test.tsx](<../FE/src/app/navigation/PublishedLibrarySession.test.tsx>). 기능 경계: [V24](#v24) · [V25](#v25). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f46-01"></a>`T-F46-01` | [S039 새 리스트 생성 표시](#s039) · [단계 PNG](<../medium/flows/Library/List detail/screens/01_sc_35dcbd9d4308404b9f11ecd03f893eb8.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f46-01>) | 상태: 새 목록 생성 결과. [V24](#v24) 구현 연결; 해당 모의·미지원·차이 적용. [U-F46](#u-f46)의 미수록 전이는 미확인 |
| <a id="t-f46-02"></a>`T-F46-02` | [S106 빈 리스트 상세](#s106) · [단계 PNG](<../medium/flows/Library/List detail/screens/02_sc_967232cfb5f845839053e0d371d78911.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f46-02>) | 상태: 콘텐츠 없는 리스트. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F46](#u-f46)의 미수록 전이는 미확인 |
| <a id="t-f46-03"></a>`T-F46-03` | [S011 내 리스트 상세 항목](#s011) · [단계 PNG](<../medium/flows/Library/List detail/screens/03_sc_0b1e7b64b9f14f2cb5358161e0f67a94.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f46-03>) | 상태: 리스트에 글 4개. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F46](#u-f46)의 미수록 전이는 미확인 |
| <a id="t-f46-04"></a>`T-F46-04` | [S177 리스트 상세 스크롤](#s177) · [단계 PNG](<../medium/flows/Library/List detail/screens/04_sc_e20e59ee459b4a0d9a0a0302091962bd.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f46-04>) | 상태: 목록 후반. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F46](#u-f46)의 미수록 전이는 미확인 |

<a id="f47"></a>

### F47 — Library/List detail/Deleting a list

[원본 분석](<../medium/flows/Library/List detail/Deleting a list/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f47>) · [U-F47](#u-f47).

현재 경로/기존 검사: [bookmarks/ListActions.tsx](<../FE/src/features/bookmarks/ListActions.tsx>) · [bookmarks/createUserListStore.ts](<../FE/src/features/bookmarks/createUserListStore.ts>) · [navigation/ListManagementNavigation.test.tsx](<../FE/src/app/navigation/ListManagementNavigation.test.tsx>). 기능 경계: [V25](#v25) · [V24](#v24). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f47-01"></a>`T-F47-01` | [S011 내 리스트 상세 항목](#s011) · [단계 PNG](<../medium/flows/Library/List detail/Deleting a list/screens/01_sc_0b1e7b64b9f14f2cb5358161e0f67a94.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f47-01>) | 상태: 리스트에 글 4개. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F47](#u-f47)의 미수록 전이는 미확인 |
| <a id="t-f47-02"></a>`T-F47-02` | [S081 내 리스트 관리 메뉴](#s081) · [단계 PNG](<../medium/flows/Library/List detail/Deleting a list/screens/02_sc_71f31ac7803a47f89b2e76b6a9355a7c.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f47-02>) | 상태: 목록 관리 작업 선택. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F47](#u-f47)의 미수록 전이는 미확인 |
| <a id="t-f47-03"></a>`T-F47-03` | [S114 리스트 삭제 확인 시트](#s114) · [단계 PNG](<../medium/flows/Library/List detail/Deleting a list/screens/03_sc_a1562b1931fc4650a544861094934588.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f47-03>) | 상태: 삭제 전 영향 확인. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F47](#u-f47)의 미수록 전이는 미확인 |
| <a id="t-f47-04"></a>`T-F47-04` | [S085 리스트 삭제 후 라이브러리](#s085) · [단계 PNG](<../medium/flows/Library/List detail/Deleting a list/screens/04_sc_7749ef5c35474c229a2515a9c2a53878.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f47-04>) | 상태: 대상 리스트 제거 표시. [V24](#v24) 구현 연결; 해당 모의·미지원·차이 적용. [U-F47](#u-f47)의 미수록 전이는 미확인 |

<a id="f48"></a>

### F48 — Library/List detail/Downloading a list

[원본 분석](<../medium/flows/Library/List detail/Downloading a list/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f48>) · [U-F48](#u-f48).

현재 경로/기존 검사: [downloads/DownloadControl.tsx](<../FE/src/features/downloads/DownloadControl.tsx>) · [navigation/DownloadsNavigation.test.tsx](<../FE/src/app/navigation/DownloadsNavigation.test.tsx>). 기능 경계: [V25](#v25) · [V26](#v26). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f48-01"></a>`T-F48-01` | [S011 내 리스트 상세 항목](#s011) · [단계 PNG](<../medium/flows/Library/List detail/Downloading a list/screens/01_sc_0b1e7b64b9f14f2cb5358161e0f67a94.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f48-01>) | 상태: 리스트에 글 4개. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F48](#u-f48)의 미수록 전이는 미확인 |
| <a id="t-f48-02"></a>`T-F48-02` | [S165 리스트 다운로드 진행](#s165) · [단계 PNG](<../medium/flows/Library/List detail/Downloading a list/screens/02_sc_d23a5b4ea6ff462f8a05ce2371e90734.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f48-02>) | 상태: 다운로드 진행으로 보이는 상태. [V26](#v26) 구현 연결; 해당 모의·미지원·차이 적용. [U-F48](#u-f48)의 미수록 전이는 미확인 |
| <a id="t-f48-03"></a>`T-F48-03` | [S089 다운로드 표시 변경](#s089) · [단계 PNG](<../medium/flows/Library/List detail/Downloading a list/screens/03_sc_7b31963fc5c64fc8b9268beab4009201.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f48-03>) | 상태: 다운로드 완료를 나타내는 표시. [V26](#v26) 구현 연결; 해당 모의·미지원·차이 적용. [U-F48](#u-f48)의 미수록 전이는 미확인 |

<a id="f49"></a>

### F49 — Library/List detail/Making a list private

[원본 분석](<../medium/flows/Library/List detail/Making a list private/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f49>) · [U-F49](#u-f49).

현재 경로/기존 검사: [bookmarks/ListPrivacyDialog.tsx](<../FE/src/features/bookmarks/ListPrivacyDialog.tsx>) · [navigation/ListManagementNavigation.test.tsx](<../FE/src/app/navigation/ListManagementNavigation.test.tsx>). 기능 경계: [V25](#v25). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f49-01"></a>`T-F49-01` | [S011 내 리스트 상세 항목](#s011) · [단계 PNG](<../medium/flows/Library/List detail/Making a list private/screens/01_sc_0b1e7b64b9f14f2cb5358161e0f67a94.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f49-01>) | 상태: 리스트에 글 4개. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F49](#u-f49)의 미수록 전이는 미확인 |
| <a id="t-f49-02"></a>`T-F49-02` | [S081 내 리스트 관리 메뉴](#s081) · [단계 PNG](<../medium/flows/Library/List detail/Making a list private/screens/02_sc_71f31ac7803a47f89b2e76b6a9355a7c.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f49-02>) | 상태: 목록 관리 작업 선택. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F49](#u-f49)의 미수록 전이는 미확인 |
| <a id="t-f49-03"></a>`T-F49-03` | [S105 리스트 비공개 확인](#s105) · [단계 PNG](<../medium/flows/Library/List detail/Making a list private/screens/03_sc_95e504331794455fb4776bd322254c76.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f49-03>) | 상태: 비공개 전 영향 안내. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F49](#u-f49)의 미수록 전이는 미확인 |
| <a id="t-f49-04"></a>`T-F49-04` | [S109 비공개 변경 성공 안내](#s109) · [단계 PNG](<../medium/flows/Library/List detail/Making a list private/screens/04_sc_996c48382ff0466099cf371adf783dae.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f49-04>) | 상태: 비공개 전환 안내. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F49](#u-f49)의 미수록 전이는 미확인 |
| <a id="t-f49-05"></a>`T-F49-05` | [S101 비공개 리스트 표시](#s101) · [단계 PNG](<../medium/flows/Library/List detail/Making a list private/screens/05_sc_91b39d224f6b4c9ab7573c0c3df633eb.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f49-05>) | 상태: 비공개 상태 표시. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F49](#u-f49)의 미수록 전이는 미확인 |

<a id="f50"></a>

### F50 — Library/List detail/Removing a story

[원본 분석](<../medium/flows/Library/List detail/Removing a story/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f50>) · [U-F50](#u-f50).

현재 경로/기존 검사: [bookmarks/createUserListStore.ts](<../FE/src/features/bookmarks/createUserListStore.ts>) · [bookmarks/UserListFeedback.tsx](<../FE/src/features/bookmarks/UserListFeedback.tsx>) · [navigation/ListEditingNavigation.test.tsx](<../FE/src/app/navigation/ListEditingNavigation.test.tsx>). 기능 경계: [V25](#v25). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f50-01"></a>`T-F50-01` | [S195 리스트 항목 메뉴](#s195) · [단계 PNG](<../medium/flows/Library/List detail/Removing a story/screens/01_sc_fa4e79f0bed747d698ae44e23f9223f9.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f50-01>) | 상태: 항목별 관리. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F50](#u-f50)의 미수록 전이는 미확인 |
| <a id="t-f50-02"></a>`T-F50-02` | [S121 리스트에서 기사 제거](#s121) · [단계 PNG](<../medium/flows/Library/List detail/Removing a story/screens/02_sc_a79a8c62cfd64776ae74f84e0d98b5c3.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f50-02>) | 상태: 항목 제거와 되돌리기 제공. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F50](#u-f50)의 미수록 전이는 미확인 |

<a id="f51"></a>

### F51 — Library/List detail/Reordering items

[원본 분석](<../medium/flows/Library/List detail/Reordering items/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f51>) · [U-F51](#u-f51).

현재 경로/기존 검사: [bookmarks/ReorderListEditor.tsx](<../FE/src/features/bookmarks/ReorderListEditor.tsx>) · [bookmarks/useReorderDrag.ts](<../FE/src/features/bookmarks/useReorderDrag.ts>) · [navigation/ListEditingNavigation.test.tsx](<../FE/src/app/navigation/ListEditingNavigation.test.tsx>). 기능 경계: [V25](#v25). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f51-01"></a>`T-F51-01` | [S011 내 리스트 상세 항목](#s011) · [단계 PNG](<../medium/flows/Library/List detail/Reordering items/screens/01_sc_0b1e7b64b9f14f2cb5358161e0f67a94.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f51-01>) | 상태: 리스트에 글 4개. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F51](#u-f51)의 미수록 전이는 미확인 |
| <a id="t-f51-02"></a>`T-F51-02` | [S081 내 리스트 관리 메뉴](#s081) · [단계 PNG](<../medium/flows/Library/List detail/Reordering items/screens/02_sc_71f31ac7803a47f89b2e76b6a9355a7c.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f51-02>) | 상태: 목록 관리 작업 선택. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F51](#u-f51)의 미수록 전이는 미확인 |
| <a id="t-f51-03"></a>`T-F51-03` | [S078 리스트 순서 편집](#s078) · [단계 PNG](<../medium/flows/Library/List detail/Reordering items/screens/03_sc_6a1036b35729490195c460e5b934bd68.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f51-03>) | 상태: 재정렬 모드. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F51](#u-f51)의 미수록 전이는 미확인 |
| <a id="t-f51-04"></a>`T-F51-04` | [S157 항목 순서 변경](#s157) · [단계 PNG](<../medium/flows/Library/List detail/Reordering items/screens/04_sc_cdf564e8e6a144389299ff49a7d626ce.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f51-04>) | 상태: 저장 전 새 순서. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F51](#u-f51)의 미수록 전이는 미확인 |
| <a id="t-f51-05"></a>`T-F51-05` | [S077 변경 순서 반영](#s077) · [단계 PNG](<../medium/flows/Library/List detail/Reordering items/screens/05_sc_6840597985cc46b6b12f6cd0204756f4.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f51-05>) | 상태: 재정렬 결과 표시. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F51](#u-f51)의 미수록 전이는 미확인 |

<a id="f52"></a>

### F52 — Logging in

[원본 분석](<../medium/flows/Logging in/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f52>) · [U-F52](#u-f52).

현재 경로/기존 검사: [auth/AuthDialogs.tsx](<../FE/src/features/auth/AuthDialogs.tsx>) · [auth/EmailLogin.tsx](<../FE/src/features/auth/EmailLogin.tsx>) · [auth/createEmailAttempt.ts](<../FE/src/features/auth/createEmailAttempt.ts>) · [navigation/EmailAuthNavigation.test.tsx](<../FE/src/app/navigation/EmailAuthNavigation.test.tsx>) · [navigation/AuthNavigation.test.tsx](<../FE/src/app/navigation/AuthNavigation.test.tsx>). 기능 경계: [V29](#v29) · [V01](#v01). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f52-01"></a>`T-F52-01` | [S166 가입 공급자 선택](#s166) · [단계 PNG](<../medium/flows/Logging in/screens/01_sc_d55739aa2ac1495da026006235e7c0a7.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f52-01>) | 상태: 신규 가입과 기존 사용자 로그인을 구분하는 진입 화면이다.. [V29](#v29) 구현 연결; 해당 모의·미지원·차이 적용. [U-F52](#u-f52)의 미수록 전이는 미확인 |
| <a id="t-f52-02"></a>`T-F52-02` | [S182 로그인 수단 선택](#s182) · [단계 PNG](<../medium/flows/Logging in/screens/02_sc_e4d414380a1047a2b7970cf7869a0866.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f52-02>) | 상태: 로그인 시작. [V29](#v29) 구현 연결; 해당 모의·미지원·차이 적용. [U-F52](#u-f52)의 미수록 전이는 미확인 |
| <a id="t-f52-03"></a>`T-F52-03` | [S171 이메일 로그인 빈 폼](#s171) · [단계 PNG](<../medium/flows/Logging in/screens/03_sc_da2ab413cfe5481d9abe4f23eeaeb426.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f52-03>) | 상태: 이메일 입력 전. [V29](#v29) 구현 연결; 해당 모의·미지원·차이 적용. [U-F52](#u-f52)의 미수록 전이는 미확인 |
| <a id="t-f52-04"></a>`T-F52-04` | [S024 이메일 로그인 입력 완료](#s024) · [단계 PNG](<../medium/flows/Logging in/screens/04_sc_1d3dc01005c343c18427fe2c199e4075.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f52-04>) | 상태: 로그인 요청 전. [V29](#v29) 구현 연결; 해당 모의·미지원·차이 적용. [U-F52](#u-f52)의 미수록 전이는 미확인 |
| <a id="t-f52-05"></a>`T-F52-05` | [S013 이메일 인증 코드 입력 대기](#s013) · [단계 PNG](<../medium/flows/Logging in/screens/05_sc_10e0a1c6f1154b3b85f8d5ed18b692d7.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f52-05>) | 상태: 코드 미입력 상태다.. [V29](#v29) 구현 연결; 해당 모의·미지원·차이 적용. [U-F52](#u-f52)의 미수록 전이는 미확인 |
| <a id="t-f52-06"></a>`T-F52-06` | [S134 로그인 인증 코드 입력](#s134) · [단계 PNG](<../medium/flows/Logging in/screens/06_sc_bc8c0aff71644874a42b97e6c7fd4ce2.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f52-06>) | 상태: 이메일 코드 검증 준비. [V29](#v29) 구현 연결; 해당 모의·미지원·차이 적용. [U-F52](#u-f52)의 미수록 전이는 미확인 |
| <a id="t-f52-07"></a>`T-F52-07` | [S069 For you 홈 피드](#s069) · [단계 PNG](<../medium/flows/Logging in/screens/07_sc_5e0ba0e498ff49579bf838096aec4b5e.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f52-07>) | 상태: 추천 기사 목록. [V01](#v01) 구현 연결; 해당 모의·미지원·차이 적용. [U-F52](#u-f52)의 미수록 전이는 미확인 |

<a id="f53"></a>

### F53 — Onboarding

[원본 분석](<../medium/flows/Onboarding/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f53>) · [U-F53](#u-f53).

현재 경로/기존 검사: [onboarding/OnboardingScreen.tsx](<../FE/src/features/onboarding/OnboardingScreen.tsx>) · [onboarding/createOnboardingSession.ts](<../FE/src/features/onboarding/createOnboardingSession.ts>) · [navigation/OnboardingNavigation.test.tsx](<../FE/src/app/navigation/OnboardingNavigation.test.tsx>). 기능 경계: [V30](#v30) · [V29](#v29) · [V31](#v31) · [V01](#v01). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f53-01"></a>`T-F53-01` | [S043 브랜드 시작 화면](#s043) · [단계 PNG](<../medium/flows/Onboarding/screens/01_sc_39bd15e8585d404daa48b34a448b0e32.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f53-01>) | 상태: 앱 진입 시 브랜드 표시 캡처다.. [V30](#v30) 구현 연결; 해당 모의·미지원·차이 적용. [U-F53](#u-f53)의 미수록 전이는 미확인 |
| <a id="t-f53-02"></a>`T-F53-02` | [S166 가입 공급자 선택](#s166) · [단계 PNG](<../medium/flows/Onboarding/screens/02_sc_d55739aa2ac1495da026006235e7c0a7.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f53-02>) | 상태: 신규 가입과 기존 사용자 로그인을 구분하는 진입 화면이다.. [V29](#v29) 구현 연결; 해당 모의·미지원·차이 적용. [U-F53](#u-f53)의 미수록 전이는 미확인 |
| <a id="t-f53-03"></a>`T-F53-03` | [S117 이메일 가입 기본 폼](#s117) · [단계 PNG](<../medium/flows/Onboarding/screens/03_sc_a4438be77c814444b7f0c005ee44e8b6.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f53-03>) | 상태: 빈 이메일 가입 폼이다.. [V29](#v29) 구현 연결; 해당 모의·미지원·차이 적용. [U-F53](#u-f53)의 미수록 전이는 미확인 |
| <a id="t-f53-04"></a>`T-F53-04` | [S054 이름과 이메일 입력 완료](#s054) · [단계 PNG](<../medium/flows/Onboarding/screens/04_sc_4510def6bbb1459ab0b5f18d07b8427e.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f53-04>) | 상태: 입력 후 제출 전 캡처다.. [V29](#v29) 구현 연결; 해당 모의·미지원·차이 적용. [U-F53](#u-f53)의 미수록 전이는 미확인 |
| <a id="t-f53-05"></a>`T-F53-05` | [S013 이메일 인증 코드 입력 대기](#s013) · [단계 PNG](<../medium/flows/Onboarding/screens/05_sc_10e0a1c6f1154b3b85f8d5ed18b692d7.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f53-05>) | 상태: 코드 미입력 상태다.. [V29](#v29) 구현 연결; 해당 모의·미지원·차이 적용. [U-F53](#u-f53)의 미수록 전이는 미확인 |
| <a id="t-f53-06"></a>`T-F53-06` | [S064 가입 인증 코드 입력 완료](#s064) · [단계 PNG](<../medium/flows/Onboarding/screens/06_sc_55d8ee5f826740d69ebd2e163aaa6486.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f53-06>) | 상태: 입력 완성에 따른 제출 가능 표현이다.. [V29](#v29) 구현 연결; 해당 모의·미지원·차이 적용. [U-F53](#u-f53)의 미수록 전이는 미확인 |
| <a id="t-f53-07"></a>`T-F53-07` | [S041 새 읽기 경험 소개](#s041) · [단계 PNG](<../medium/flows/Onboarding/screens/07_sc_3795c955a89d404c85112e637857e74a.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f53-07>) | 상태: 앱 업데이트와 팔로잉 재검토를 안내한다.. [V30](#v30) 구현 연결; 해당 모의·미지원·차이 적용. [U-F53](#u-f53)의 미수록 전이는 미확인 |
| <a id="t-f53-08"></a>`T-F53-08` | [S067 관심 주제 미선택](#s067) · [단계 PNG](<../medium/flows/Onboarding/screens/08_sc_5843ae43bf154aadb5507c6fa51d150d.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f53-08>) | 상태: 최소 선택 개수를 안내하는 초기 상태다.. [V30](#v30) 구현 연결; 해당 모의·미지원·차이 적용. [U-F53](#u-f53)의 미수록 전이는 미확인 |
| <a id="t-f53-09"></a>`T-F53-09` | [S006 관심 주제 다중 선택](#s006) · [단계 PNG](<../medium/flows/Onboarding/screens/09_sc_05f2a886f5464a728dd61a6291707a3d.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f53-09>) | 상태: 5개 주제 선택과 진행 버튼 변화가 관찰된다.. [V30](#v30) 구현 연결; 해당 모의·미지원·차이 적용. [U-F53](#u-f53)의 미수록 전이는 미확인 |
| <a id="t-f53-10"></a>`T-F53-10` | [S035 관심사 기반 작가·발행물 추천](#s035) · [단계 PNG](<../medium/flows/Onboarding/screens/10_sc_301ef788e5514bb5b8e9c1fc9afcfa61.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f53-10>) | 상태: 팔로우 전 추천 목록. [V30](#v30) 구현 연결; 해당 모의·미지원·차이 적용. [U-F53](#u-f53)의 미수록 전이는 미확인 |
| <a id="t-f53-11"></a>`T-F53-11` | [S184 알림 활성화 안내](#s184) · [단계 PNG](<../medium/flows/Onboarding/screens/11_sc_e9f4c426cfb3426d9ca05121dea00ce3.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f53-11>) | 상태: 알림 권한 요청 전 앱 안내. [V30](#v30) 구현 연결; 해당 모의·미지원·차이 적용. [U-F53](#u-f53)의 미수록 전이는 미확인 |
| <a id="t-f53-12"></a>`T-F53-12` | [S129 월간 멤버십 선택](#s129) · [단계 PNG](<../medium/flows/Onboarding/screens/12_sc_b4e85416681544c9b996826eefa22432.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f53-12>) | 상태: 월간 플랜 소개와 혜택 목록. [V31](#v31) 구현 연결; 해당 모의·미지원·차이 적용. [U-F53](#u-f53)의 미수록 전이는 미확인 |
| <a id="t-f53-13"></a>`T-F53-13` | [S069 For you 홈 피드](#s069) · [단계 PNG](<../medium/flows/Onboarding/screens/13_sc_5e0ba0e498ff49579bf838096aec4b5e.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f53-13>) | 상태: 추천 기사 목록. [V01](#v01) 구현 연결; 해당 모의·미지원·차이 적용. [U-F53](#u-f53)의 미수록 전이는 미확인 |

<a id="f54"></a>

### F54 — Onboarding/Subscribing to Medium

[원본 분석](<../medium/flows/Onboarding/Subscribing to Medium/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f54>) · [U-F54](#u-f54).

현재 경로/기존 검사: [membership/MembershipSheet.tsx](<../FE/src/features/membership/MembershipSheet.tsx>) · [navigation/MembershipNavigation.test.tsx](<../FE/src/app/navigation/MembershipNavigation.test.tsx>). 기능 경계: [V31](#v31) · [V01](#v01). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f54-01"></a>`T-F54-01` | [S129 월간 멤버십 선택](#s129) · [단계 PNG](<../medium/flows/Onboarding/Subscribing to Medium/screens/01_sc_b4e85416681544c9b996826eefa22432.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f54-01>) | 상태: 월간 플랜 소개와 혜택 목록. [V31](#v31) 구현 연결; 해당 모의·미지원·차이 적용. [U-F54](#u-f54)의 미수록 전이는 미확인 |
| <a id="t-f54-02"></a>`T-F54-02` | [S059 Member 혜택과 Friend 플랜 노출](#s059) · [단계 PNG](<../medium/flows/Onboarding/Subscribing to Medium/screens/02_sc_4beaf37694cb429baac5c27b93a71ccf.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f54-02>) | 상태: 오프라인·오디오 등 혜택 설명. [V31](#v31) 구현 연결; 해당 모의·미지원·차이 적용. [U-F54](#u-f54)의 미수록 전이는 미확인 |
| <a id="t-f54-03"></a>`T-F54-03` | [S084 멤버십 선택 처리 중](#s084) · [단계 PNG](<../medium/flows/Onboarding/Subscribing to Medium/screens/03_sc_754aff4161c64e0685e7331a359eae32.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f54-03>) | 상태: 요청 처리 중으로 보이는 로딩 상태. [V31](#v31) 구현 연결; 해당 모의·미지원·차이 적용. [U-F54](#u-f54)의 미수록 전이는 미확인 |
| <a id="t-f54-04"></a>`T-F54-04` | [S133 구매 성공 안내 팝업](#s133) · [단계 PNG](<../medium/flows/Onboarding/Subscribing to Medium/screens/04_sc_bb00623f121d405abc840e589837c3fd.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f54-04>) | 상태: 캡처에 구매 성공 메시지 표시. [V31](#v31) 구현 연결; 해당 모의·미지원·차이 적용. [U-F54](#u-f54)의 미수록 전이는 미확인 |
| <a id="t-f54-05"></a>`T-F54-05` | [S159 멤버 가입 완료 화면](#s159) · [단계 PNG](<../medium/flows/Onboarding/Subscribing to Medium/screens/05_sc_cf306e89e43144029ce108cb5338132a.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f54-05>) | 상태: 멤버십 완료 안내. [V31](#v31) 구현 연결; 해당 모의·미지원·차이 적용. [U-F54](#u-f54)의 미수록 전이는 미확인 |
| <a id="t-f54-06"></a>`T-F54-06` | [S069 For you 홈 피드](#s069) · [단계 PNG](<../medium/flows/Onboarding/Subscribing to Medium/screens/06_sc_5e0ba0e498ff49579bf838096aec4b5e.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f54-06>) | 상태: 추천 기사 목록. [V01](#v01) 구현 연결; 해당 모의·미지원·차이 적용. [U-F54](#u-f54)의 미수록 전이는 미확인 |

<a id="f55"></a>

### F55 — Profile

[원본 분석](<../medium/flows/Profile/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f55>) · [U-F55](#u-f55).

현재 경로/기존 검사: [profile/ProfileScreen.tsx](<../FE/src/features/profile/ProfileScreen.tsx>) · [profile/ProfileStories.tsx](<../FE/src/features/profile/ProfileStories.tsx>) · [profile/ProfileLists.tsx](<../FE/src/features/profile/ProfileLists.tsx>) · [navigation/ProfileDetailsNavigation.test.tsx](<../FE/src/app/navigation/ProfileDetailsNavigation.test.tsx>) · [navigation/PublishedLibrarySession.test.tsx](<../FE/src/app/navigation/PublishedLibrarySession.test.tsx>). 기능 경계: [V01](#v01) · [V32](#v32). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f55-01"></a>`T-F55-01` | [S069 For you 홈 피드](#s069) · [단계 PNG](<../medium/flows/Profile/screens/01_sc_5e0ba0e498ff49579bf838096aec4b5e.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f55-01>) | 상태: 추천 기사 목록. [V01](#v01) 구현 연결; 해당 모의·미지원·차이 적용. [U-F55](#u-f55)의 미수록 전이는 미확인 |
| <a id="t-f55-02"></a>`T-F55-02` | [S020 내 프로필 빈 Stories](#s020) · [단계 PNG](<../medium/flows/Profile/screens/02_sc_1bd141b757934a88b4a003855e1794cc.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f55-02>) | 상태: 발행 글 없음. [V32](#v32) 구현 연결; 해당 모의·미지원·차이 적용. [U-F55](#u-f55)의 미수록 전이는 미확인 |
| <a id="t-f55-03"></a>`T-F55-03` | [S169 발행 글과 반응 있는 프로필](#s169) · [단계 PNG](<../medium/flows/Profile/screens/03_sc_d76d3680605f4b62ab31e3039d6c4fe6.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f55-03>) | 상태: 발행 후 반응 집계. [V32](#v32) 구현 연결; 해당 모의·미지원·차이 적용. [U-F55](#u-f55)의 미수록 전이는 미확인 |
| <a id="t-f55-04"></a>`T-F55-04` | [S074 내 프로필 Lists](#s074) · [단계 PNG](<../medium/flows/Profile/screens/04_sc_64afef71457f48808c33def66fd6d90e.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f55-04>) | 상태: 소유자가 비공개 목록을 봄. [V32](#v32) 구현 연결; 해당 모의·미지원·차이 적용. [U-F55](#u-f55)의 미수록 전이는 미확인 |
| <a id="t-f55-05"></a>`T-F55-05` | [S167 내 소개 빈 상태](#s167) · [단계 PNG](<../medium/flows/Profile/screens/05_sc_d55f02281f894078a734269d60de79c4.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f55-05>) | 상태: 소개 미작성. [V32](#v32) 구현 연결; 해당 모의·미지원·차이 적용. [U-F55](#u-f55)의 미수록 전이는 미확인 |
| <a id="t-f55-06"></a>`T-F55-06` | [S047 프로필 소개·사진·대명사 표시](#s047) · [단계 PNG](<../medium/flows/Profile/screens/06_sc_3cd0855e78a84d4ea413f0e5b3dffb73.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f55-06>) | 상태: 프로필 정보 반영. [V32](#v32) 구현 연결; 해당 모의·미지원·차이 적용. [U-F55](#u-f55)의 미수록 전이는 미확인 |

<a id="f56"></a>

### F56 — Profile/Editing profile information/Adding pronouns

[원본 분석](<../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f56>) · [U-F56](#u-f56).

현재 경로/기존 검사: [profile/ProfileEditorSheet.tsx](<../FE/src/features/profile/ProfileEditorSheet.tsx>) · [profile/PronounsEditor.tsx](<../FE/src/features/profile/PronounsEditor.tsx>) · [profile/useProfilePhotoSelection.ts](<../FE/src/features/profile/useProfilePhotoSelection.ts>) · [navigation/ProfileNavigation.test.tsx](<../FE/src/app/navigation/ProfileNavigation.test.tsx>) · [navigation/ProfileDetailsNavigation.test.tsx](<../FE/src/app/navigation/ProfileDetailsNavigation.test.tsx>). 기능 경계: [V32](#v32). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f56-01"></a>`T-F56-01` | [S005 프로필 사진 선택 반영](#s005) · [단계 PNG](<../medium/flows/Profile/Editing profile information/Adding pronouns/screens/01_sc_05df03a16c6b466b8ba91d9d6244c2f5.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f56-01>) | 상태: 선택 사진 미리보기. [V32](#v32) 구현 연결; 해당 모의·미지원·차이 적용. [U-F56](#u-f56)의 미수록 전이는 미확인 |
| <a id="t-f56-02"></a>`T-F56-02` | [S082 대명사 선택 빈 폼](#s082) · [단계 PNG](<../medium/flows/Profile/Editing profile information/Adding pronouns/screens/02_sc_743e421bb2b14205b19b76062fdf27cd.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f56-02>) | 상태: 대명사 미선택. [V32](#v32) 구현 연결; 해당 모의·미지원·차이 적용. [U-F56](#u-f56)의 미수록 전이는 미확인 |
| <a id="t-f56-03"></a>`T-F56-03` | [S080 대명사 검색](#s080) · [단계 PNG](<../medium/flows/Profile/Editing profile information/Adding pronouns/screens/03_sc_6c7a00132f3c47e6b2e803743cc10d21.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f56-03>) | 상태: 검색어에 맞춘 대명사 선택. [V32](#v32) 구현 연결; 해당 모의·미지원·차이 적용. [U-F56](#u-f56)의 미수록 전이는 미확인 |
| <a id="t-f56-04"></a>`T-F56-04` | [S120 대명사 1개 선택](#s120) · [단계 PNG](<../medium/flows/Profile/Editing profile information/Adding pronouns/screens/04_sc_a6051a9dd4514d3694dde85cd95c6b6d.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f56-04>) | 상태: 첫 대명사 선택. [V32](#v32) 구현 연결; 해당 모의·미지원·차이 적용. [U-F56](#u-f56)의 미수록 전이는 미확인 |
| <a id="t-f56-05"></a>`T-F56-05` | [S094 대명사 2개 선택](#s094) · [단계 PNG](<../medium/flows/Profile/Editing profile information/Adding pronouns/screens/05_sc_82178c6b5a56471cb64fecb5a4e4bc4e.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f56-05>) | 상태: 두 대명사 선택. [V32](#v32) 구현 연결; 해당 모의·미지원·차이 적용. [U-F56](#u-f56)의 미수록 전이는 미확인 |
| <a id="t-f56-06"></a>`T-F56-06` | [S027 프로필 폼으로 대명사 반환](#s027) · [단계 PNG](<../medium/flows/Profile/Editing profile information/Adding pronouns/screens/06_sc_20bfc41de9f845119aea54bb5971a01e.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f56-06>) | 상태: 선택값 폼에 반영. [V32](#v32) 구현 연결; 해당 모의·미지원·차이 적용. [U-F56](#u-f56)의 미수록 전이는 미확인 |

<a id="f57"></a>

### F57 — Profile/Editing profile information

[원본 분석](<../medium/flows/Profile/Editing profile information/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f57>) · [U-F57](#u-f57).

현재 경로/기존 검사: [profile/ProfileEditorSheet.tsx](<../FE/src/features/profile/ProfileEditorSheet.tsx>) · [profile/PronounsEditor.tsx](<../FE/src/features/profile/PronounsEditor.tsx>) · [profile/useProfilePhotoSelection.ts](<../FE/src/features/profile/useProfilePhotoSelection.ts>) · [navigation/ProfileNavigation.test.tsx](<../FE/src/app/navigation/ProfileNavigation.test.tsx>) · [navigation/ProfileDetailsNavigation.test.tsx](<../FE/src/app/navigation/ProfileDetailsNavigation.test.tsx>). 기능 경계: [V32](#v32). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f57-01"></a>`T-F57-01` | [S020 내 프로필 빈 Stories](#s020) · [단계 PNG](<../medium/flows/Profile/Editing profile information/screens/01_sc_1bd141b757934a88b4a003855e1794cc.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f57-01>) | 상태: 발행 글 없음. [V32](#v32) 구현 연결; 해당 모의·미지원·차이 적용. [U-F57](#u-f57)의 미수록 전이는 미확인 |
| <a id="t-f57-02"></a>`T-F57-02` | [S123 프로필 편집 폼](#s123) · [단계 PNG](<../medium/flows/Profile/Editing profile information/screens/02_sc_a829121c47a444cd8a8fd0d9889edaed.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f57-02>) | 상태: 이름 필수 표시·소개 선택. [V32](#v32) 구현 연결; 해당 모의·미지원·차이 적용. [U-F57](#u-f57)의 미수록 전이는 미확인 |
| <a id="t-f57-03"></a>`T-F57-03` | [S156 프로필 사진 소스 선택](#s156) · [단계 PNG](<../medium/flows/Profile/Editing profile information/screens/03_sc_cba29e82e4364a239d3e5423213fa670.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f57-03>) | 상태: 사진 추가 방식 선택. [V32](#v32) 구현 연결; 해당 모의·미지원·차이 적용. [U-F57](#u-f57)의 미수록 전이는 미확인 |
| <a id="t-f57-04"></a>`T-F57-04` | [S113 기기 사진 선택기](#s113) · [단계 PNG](<../medium/flows/Profile/Editing profile information/screens/04_sc_9fd133df622e4ddd859bbbeb845ba4da.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f57-04>) | 상태: OS 사진 선택 UI. [V32](#v32) 구현 연결; 해당 모의·미지원·차이 적용. [U-F57](#u-f57)의 미수록 전이는 미확인 |
| <a id="t-f57-05"></a>`T-F57-05` | [S005 프로필 사진 선택 반영](#s005) · [단계 PNG](<../medium/flows/Profile/Editing profile information/screens/05_sc_05df03a16c6b466b8ba91d9d6244c2f5.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f57-05>) | 상태: 선택 사진 미리보기. [V32](#v32) 구현 연결; 해당 모의·미지원·차이 적용. [U-F57](#u-f57)의 미수록 전이는 미확인 |
| <a id="t-f57-06"></a>`T-F57-06` | [S138 대명사·소개 입력된 프로필](#s138) · [단계 PNG](<../medium/flows/Profile/Editing profile information/screens/06_sc_befb6fde38cc48f3827ea389caed11de.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f57-06>) | 상태: 저장 전 정보 완성. [V32](#v32) 구현 연결; 해당 모의·미지원·차이 적용. [U-F57](#u-f57)의 미수록 전이는 미확인 |
| <a id="t-f57-07"></a>`T-F57-07` | [S136 프로필 편집 결과](#s136) · [단계 PNG](<../medium/flows/Profile/Editing profile information/screens/07_sc_be99c4fdcf634190a324ec9820a84f43.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f57-07>) | 상태: 사진·대명사 반영. [V32](#v32) 구현 연결; 해당 모의·미지원·차이 적용. [U-F57](#u-f57)의 미수록 전이는 미확인 |
| <a id="t-f57-08"></a>`T-F57-08` | [S047 프로필 소개·사진·대명사 표시](#s047) · [단계 PNG](<../medium/flows/Profile/Editing profile information/screens/08_sc_3cd0855e78a84d4ea413f0e5b3dffb73.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f57-08>) | 상태: 프로필 정보 반영. [V32](#v32) 구현 연결; 해당 모의·미지원·차이 적용. [U-F57](#u-f57)의 미수록 전이는 미확인 |

<a id="f58"></a>

### F58 — Profile/Settings

[원본 분석](<../medium/flows/Profile/Settings/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f58>) · [U-F58](#u-f58).

현재 경로/기존 검사: [settings/SettingsScreen.tsx](<../FE/src/features/settings/SettingsScreen.tsx>) · [settings/SettingsExtrasScreen.tsx](<../FE/src/features/settings/SettingsExtrasScreen.tsx>) · [navigation/SettingsExtrasNavigation.test.tsx](<../FE/src/app/navigation/SettingsExtrasNavigation.test.tsx>). 기능 경계: [V32](#v32) · [V33](#v33). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f58-01"></a>`T-F58-01` | [S169 발행 글과 반응 있는 프로필](#s169) · [단계 PNG](<../medium/flows/Profile/Settings/screens/01_sc_d76d3680605f4b62ab31e3039d6c4fe6.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f58-01>) | 상태: 발행 후 반응 집계. [V32](#v32) 구현 연결; 해당 모의·미지원·차이 적용. [U-F58](#u-f58)의 미수록 전이는 미확인 |
| <a id="t-f58-02"></a>`T-F58-02` | [S173 설정 상단](#s173) · [단계 PNG](<../medium/flows/Profile/Settings/screens/02_sc_ddd51660cb8346a1b200ed970a2d5c45.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f58-02>) | 상태: 주요 설정 진입점. [V33](#v33) 구현 연결; 해당 모의·미지원·차이 적용. [U-F58](#u-f58)의 미수록 전이는 미확인 |
| <a id="t-f58-03"></a>`T-F58-03` | [S149 설정 하단](#s149) · [단계 PNG](<../medium/flows/Profile/Settings/screens/03_sc_c653047933aa40b2be7a8f281643d41d.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f58-03>) | 상태: 설정과 앱 버전 표시. [V33](#v33) 구현 연결; 해당 모의·미지원·차이 적용. [U-F58](#u-f58)의 미수록 전이는 미확인 |

<a id="f59"></a>

### F59 — Profile/Settings/Changing notification settings

[원본 분석](<../medium/flows/Profile/Settings/Changing notification settings/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f59>) · [U-F59](#u-f59).

현재 경로/기존 검사: [notifications/NotificationSettingsScreen.tsx](<../FE/src/features/notifications/NotificationSettingsScreen.tsx>) · [navigation/NotificationNavigation.test.tsx](<../FE/src/app/navigation/NotificationNavigation.test.tsx>). 기능 경계: [V33](#v33) · [V28](#v28). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f59-01"></a>`T-F59-01` | [S173 설정 상단](#s173) · [단계 PNG](<../medium/flows/Profile/Settings/Changing notification settings/screens/01_sc_ddd51660cb8346a1b200ed970a2d5c45.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f59-01>) | 상태: 주요 설정 진입점. [V33](#v33) 구현 연결; 해당 모의·미지원·차이 적용. [U-F59](#u-f59)의 미수록 전이는 미확인 |
| <a id="t-f59-02"></a>`T-F59-02` | [S186 푸시 알림 상세 설정](#s186) · [단계 PNG](<../medium/flows/Profile/Settings/Changing notification settings/screens/02_sc_ee2e76b092df4d309bfd0633f25273a6.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f59-02>) | 상태: 이벤트별 푸시 제어. [V28](#v28) 구현 연결; 해당 모의·미지원·차이 적용. [U-F59](#u-f59)의 미수록 전이는 미확인 |
| <a id="t-f59-03"></a>`T-F59-03` | [S040 추천 알림 두 항목 끄기](#s040) · [단계 PNG](<../medium/flows/Profile/Settings/Changing notification settings/screens/03_sc_368c53cd77e2421e8279124ce03301f4.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f59-03>) | 상태: 선택 알림만 비활성. [V28](#v28) 구현 연결; 해당 모의·미지원·차이 적용. [U-F59](#u-f59)의 미수록 전이는 미확인 |

<a id="f60"></a>

### F60 — Profile/Settings/Custom app icon

[원본 분석](<../medium/flows/Profile/Settings/Custom app icon/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f60>) · [U-F60](#u-f60).

현재 경로/기존 검사: [app-icon/AppIconScreen.tsx](<../FE/src/features/app-icon/AppIconScreen.tsx>) · [navigation/SettingsExtrasNavigation.test.tsx](<../FE/src/app/navigation/SettingsExtrasNavigation.test.tsx>). 기능 경계: [V33](#v33). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f60-01"></a>`T-F60-01` | [S173 설정 상단](#s173) · [단계 PNG](<../medium/flows/Profile/Settings/Custom app icon/screens/01_sc_ddd51660cb8346a1b200ed970a2d5c45.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f60-01>) | 상태: 주요 설정 진입점. [V33](#v33) 구현 연결; 해당 모의·미지원·차이 적용. [U-F60](#u-f60)의 미수록 전이는 미확인 |
| <a id="t-f60-02"></a>`T-F60-02` | [S075 앱 아이콘 선택과 멤버십 제한](#s075) · [단계 PNG](<../medium/flows/Profile/Settings/Custom app icon/screens/02_sc_64b75d913b284d708ab44e4f3663a59f.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f60-02>) | 상태: 아이콘 변경 기능 잠금 안내. [V33](#v33) 구현 연결; 해당 모의·미지원·차이 적용. [U-F60](#u-f60)의 미수록 전이는 미확인 |

<a id="f61"></a>

### F61 — Profile/Settings/Logging out

[원본 분석](<../medium/flows/Profile/Settings/Logging out/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f61>) · [U-F61](#u-f61).

현재 경로/기존 검사: [auth/AuthDialogs.tsx](<../FE/src/features/auth/AuthDialogs.tsx>) · [auth/createAuthStore.ts](<../FE/src/features/auth/createAuthStore.ts>) · [navigation/AuthBoundaryNavigation.test.tsx](<../FE/src/app/navigation/AuthBoundaryNavigation.test.tsx>). 기능 경계: [V33](#v33) · [V29](#v29). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f61-01"></a>`T-F61-01` | [S149 설정 하단](#s149) · [단계 PNG](<../medium/flows/Profile/Settings/Logging out/screens/01_sc_c653047933aa40b2be7a8f281643d41d.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f61-01>) | 상태: 설정과 앱 버전 표시. [V33](#v33) 구현 연결; 해당 모의·미지원·차이 적용. [U-F61](#u-f61)의 미수록 전이는 미확인 |
| <a id="t-f61-02"></a>`T-F61-02` | [S034 로그아웃 확인](#s034) · [단계 PNG](<../medium/flows/Profile/Settings/Logging out/screens/02_sc_2d1afd7a02a347868564f9757753d077.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f61-02>) | 상태: 세션 종료 전 확인. [V29](#v29) 구현 연결; 해당 모의·미지원·차이 적용. [U-F61](#u-f61)의 미수록 전이는 미확인 |
| <a id="t-f61-03"></a>`T-F61-03` | [S166 가입 공급자 선택](#s166) · [단계 PNG](<../medium/flows/Profile/Settings/Logging out/screens/03_sc_d55739aa2ac1495da026006235e7c0a7.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f61-03>) | 상태: 신규 가입과 기존 사용자 로그인을 구분하는 진입 화면이다.. [V29](#v29) 구현 연결; 해당 모의·미지원·차이 적용. [U-F61](#u-f61)의 미수록 전이는 미확인 |

<a id="f62"></a>

### F62 — Profile/Settings/Switching to dark mode

[원본 분석](<../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f62>) · [U-F62](#u-f62).

현재 경로/기존 검사: [settings/DisplaySettingsProvider.tsx](<../FE/src/features/settings/DisplaySettingsProvider.tsx>) · [settings/ArticleDisplayPopover.tsx](<../FE/src/features/settings/ArticleDisplayPopover.tsx>) · [navigation/DisplayNavigation.test.tsx](<../FE/src/app/navigation/DisplayNavigation.test.tsx>). 기능 경계: [V33](#v33) · [V01](#v01) · [V02](#v02) · [V24](#v24) · [V25](#v25) · [V32](#v32). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f62-01"></a>`T-F62-01` | [S173 설정 상단](#s173) · [단계 PNG](<../medium/flows/Profile/Settings/Switching to dark mode/screens/01_sc_ddd51660cb8346a1b200ed970a2d5c45.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f62-01>) | 상태: 주요 설정 진입점. [V33](#v33) 구현 연결; 해당 모의·미지원·차이 적용. [U-F62](#u-f62)의 미수록 전이는 미확인 |
| <a id="t-f62-02"></a>`T-F62-02` | [S110 앱 다크 테마 설정](#s110) · [단계 PNG](<../medium/flows/Profile/Settings/Switching to dark mode/screens/02_sc_9b1044709d764fe682a5e95603fd5c56.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f62-02>) | 상태: 앱 설정 다크 적용. [V33](#v33) 구현 연결; 해당 모의·미지원·차이 적용. [U-F62](#u-f62)의 미수록 전이는 미확인 |
| <a id="t-f62-03"></a>`T-F62-03` | [S086 다크 홈 피드](#s086) · [단계 PNG](<../medium/flows/Profile/Settings/Switching to dark mode/screens/03_sc_77bbb7d671f14c6db68071c5921f22fa.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f62-03>) | 상태: 홈에도 테마 적용. [V01](#v01) 구현 연결; 해당 모의·미지원·차이 적용. [U-F62](#u-f62)의 미수록 전이는 미확인 |
| <a id="t-f62-04"></a>`T-F62-04` | [S185 다크 Explore](#s185) · [단계 PNG](<../medium/flows/Profile/Settings/Switching to dark mode/screens/04_sc_eaaa223bd5c84facb010485d0f797e76.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f62-04>) | 상태: 탐색 화면 테마 적용. [V02](#v02) 구현 연결; 해당 모의·미지원·차이 적용. [U-F62](#u-f62)의 미수록 전이는 미확인 |
| <a id="t-f62-05"></a>`T-F62-05` | [S058 다크 Library](#s058) · [단계 PNG](<../medium/flows/Profile/Settings/Switching to dark mode/screens/05_sc_4a39ee1d768342a9823787c11c851479.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f62-05>) | 상태: 라이브러리 테마 적용. [V24](#v24) 구현 연결; 해당 모의·미지원·차이 적용. [U-F62](#u-f62)의 미수록 전이는 미확인 |
| <a id="t-f62-06"></a>`T-F62-06` | [S108 다크 하이라이트 목록](#s108) · [단계 PNG](<../medium/flows/Profile/Settings/Switching to dark mode/screens/06_sc_97fb65c906bf4e309ec595d2067e4bce.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f62-06>) | 상태: 하이라이트 대비 변경. [V24](#v24) 구현 연결; 해당 모의·미지원·차이 적용. [U-F62](#u-f62)의 미수록 전이는 미확인 |
| <a id="t-f62-07"></a>`T-F62-07` | [S056 다크 읽기 목록 상세](#s056) · [단계 PNG](<../medium/flows/Profile/Settings/Switching to dark mode/screens/07_sc_45fd4ac6da2148968fab1446df649f7f.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f62-07>) | 상태: 읽은 기사 표시와 다크 테마. [V25](#v25) 구현 연결; 해당 모의·미지원·차이 적용. [U-F62](#u-f62)의 미수록 전이는 미확인 |
| <a id="t-f62-08"></a>`T-F62-08` | [S144 다크 내 프로필](#s144) · [단계 PNG](<../medium/flows/Profile/Settings/Switching to dark mode/screens/08_sc_c31a2100ddcd41cba45b5081c69b78b5.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f62-08>) | 상태: 프로필 테마 적용. [V32](#v32) 구현 연결; 해당 모의·미지원·차이 적용. [U-F62](#u-f62)의 미수록 전이는 미확인 |

<a id="f63"></a>

### F63 — Profile/Story stats

[원본 분석](<../medium/flows/Profile/Story stats/ANALYSIS.md>) · [진입/종료·미수록 분기](<../TODO/MEDIUM_PARITY/FLOWS.md#f63>) · [U-F63](#u-f63).

현재 경로/기존 검사: [story-stats/StoryStatsScreen.tsx](<../FE/src/features/story-stats/StoryStatsScreen.tsx>) · [story-stats/createMockStoryStatsSource.ts](<../FE/src/features/story-stats/createMockStoryStatsSource.ts>) · [navigation/StoryStatsNavigation.test.tsx](<../FE/src/app/navigation/StoryStatsNavigation.test.tsx>). 기능 경계: [V32](#v32) · [V34](#v34). 판정: 구현 연결과 현재 Android 수용; 정확한 원본 전이·외부 효과는 위 경계/미확인에 남김.

| 단계 | 원본·구현 화면 | 이번 판정 / 근거 |
| --- | --- | --- |
| <a id="t-f63-01"></a>`T-F63-01` | [S020 내 프로필 빈 Stories](#s020) · [단계 PNG](<../medium/flows/Profile/Story stats/screens/01_sc_1bd141b757934a88b4a003855e1794cc.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f63-01>) | 상태: 발행 글 없음. [V32](#v32) 구현 연결; 해당 모의·미지원·차이 적용. [U-F63](#u-f63)의 미수록 전이는 미확인 |
| <a id="t-f63-02"></a>`T-F63-02` | [S188 월간 글 통계](#s188) · [단계 PNG](<../medium/flows/Profile/Story stats/screens/02_sc_eece99396c944a4fac5e50820715f00a.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f63-02>) | 상태: 일별 통계 시각화. [V34](#v34) 구현 연결; 해당 모의·미지원·차이 적용. [U-F63](#u-f63)의 미수록 전이는 미확인 |
| <a id="t-f63-03"></a>`T-F63-03` | [S153 통계 그래프 날짜 선택](#s153) · [단계 PNG](<../medium/flows/Profile/Story stats/screens/03_sc_c8fa56a2dd5b4e959c333ea3e6d334e2.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f63-03>) | 상태: 특정 날짜 선택. [V34](#v34) 구현 연결; 해당 모의·미지원·차이 적용. [U-F63](#u-f63)의 미수록 전이는 미확인 |
| <a id="t-f63-04"></a>`T-F63-04` | [S150 글별 Lifetime 통계](#s150) · [단계 PNG](<../medium/flows/Profile/Story stats/screens/04_sc_c6580d2d071a4f079981013ccc658af4.png>) · [원본 변화/수용 조건](<../TODO/MEDIUM_PARITY/FLOWS.md#t-f63-04>) | 상태: 글별 누적 통계 표시. [V34](#v34) 구현 연결; 해당 모의·미지원·차이 적용. [U-F63](#u-f63)의 미수록 전이는 미확인 |

<a id="unknowns"></a>

## 원본 미확인 263묶음의 개별 판정

각 행은 기존 질문 전체를 보존하고 현재 코드의 관련 지원/정책과 인계 대상을 연결한다. 원본에 이미 보이는 제한값/옵션은 해당 R에 남겨 두며, 이 표는 그 밖의 미수록 효과·정책·분기를 해결됐다고 처리하지 않는다. 기존 UNKNOWN의 부분 답변/과거 근거도 보존했다. **원본 미확인 유지**는 FE 조작이 모두 미지원이라는 뜻이 아니고, **현재 FE 정책 확인**도 Medium의 정책 확정은 아니다.

| U ID | 원본 질문 묶음 | 현재 판정·관련 구현·7단계 입력 |
| --- | --- | --- |
| <a id="u-s001"></a>[U-S001](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s001>) | 본인 하이라이트 영향·영속성 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S001](#s001)와 [V16](#v16)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-s002"></a>[U-S002](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s002>) | 타인 공개·다른 리스트의 동일 기사 영향 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S002](#s002)와 [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s003"></a>[U-S003](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s003>) | AirPlay 연결·음성 전환 결과 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S003](#s003)와 [V19](#v19)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H08](#h08) |
| <a id="u-s004"></a>[U-S004](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s004>) | 카테고리 하위 구조 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S004](#s004)와 [V02](#v02)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-s005"></a>[U-S005](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s005>) | 즉시 업로드와 최종 저장 구분 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S005](#s005)와 [V32](#v32)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s006"></a>[U-S006](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s006>) | 선택 해제 및 서버 저장 실패 동작은 수록되지 않았다. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S006](#s006)와 [V30](#v30)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H01](#h01) |
| <a id="u-s007"></a>[U-S007](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s007>) | +16의 누적 범위·실제 요청 수·서버 저장은 미확인. 공식 문서의 1인당 최대 50회 규칙은 6절에서 별도 확인했다. | 공식 보관 설명의 1인당 최대 50회는 부분 확정. +16 누적 범위·요청 수·서버 저장은 원본 미확인 유지. [S007](#s007)와 [V13](#v13)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-s008"></a>[U-S008](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s008>) | 현재 정책과 캡처 버전 차이 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S008](#s008)와 [V21](#v21)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-s009"></a>[U-S009](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s009>) | 문구 재사용 이유·실제 편집 모드 계약 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S009](#s009)와 [V20](#v20)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s010"></a>[U-S010](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s010>) | 취소 시 기존 내용 복원 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S010](#s010)와 [V20](#v20)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s011"></a>[U-S011](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s011>) | 글 추가 과정 미수록·카드 다운로드 아이콘 의미 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S011](#s011)와 [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s012"></a>[U-S012](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s012>) | 타 기기 동기화·삭제·공개 범위 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S012](#s012)와 [V17](#v17)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-s013"></a>[U-S013](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s013>) | 발송 성공·만료 시간·재전송 제한은 화면만으로 알 수 없다. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S013](#s013)와 [V29](#v29)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H01](#h01) |
| <a id="u-s014"></a>[U-S014](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s014>) | 리스트 반응·글 반응의 저장 계약과 중복 집계 규칙은 미확인. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S014](#s014)와 [V04](#v04)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s015"></a>[U-S015](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s015>) | 알림 발송 시점·대상 삭제 시 처리 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S015](#s015)와 [V10](#v10)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-s016"></a>[U-S016](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s016>) | 최소·최대·증분·WPM 계산 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S016](#s016)와 [V19](#v19)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H08](#h08) |
| <a id="u-s017"></a>[U-S017](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s017>) | 삭제 확인·되돌리기 지원 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S017](#s017)와 [V07](#v07)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-s018"></a>[U-S018](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s018>) | 중첩·번호 목록·줄바꿈 규칙 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S018](#s018)와 [V07](#v07)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-s019"></a>[U-S019](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s019>) | 입력 제한·인용 삭제 가능 여부 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S019](#s019)와 [V20](#v20)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s020"></a>[U-S020](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s020>) | 미발행 초안 포함 여부 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S020](#s020)와 [V32](#v32)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s021"></a>[U-S021](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s021>) | 인기 집계 기간·정렬 알고리즘 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S021](#s021)와 [V02](#v02)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-s022"></a>[U-S022](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s022>) | 변경 시점·현재 계정 일치 여부 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S022](#s022)와 [V11](#v11)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-s023"></a>[U-S023](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s023>) | 발행 권한·입력 검증·공개 범위 실제 정책 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S023](#s023)와 [V06](#v06)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-s024"></a>[U-S024](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s024>) | 전송 성공·이메일 소유권 미확인 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S024](#s024)와 [V29](#v29)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H01](#h01) |
| <a id="u-s025"></a>[U-S025](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s025>) | 서버 저장·재시작 유지 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S025](#s025)와 [V14](#v14)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s026"></a>[U-S026](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s026>) | 페이지네이션·새로고침·중복 제거 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S026](#s026)와 [V01](#v01)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-s027"></a>[U-S027](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s027>) | 이 자식 흐름에는 Save 실행·저장 후 재진입이 없다. 공식 도움말은 Done 후 상위 프로필 Save를 요구한다. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S027](#s027)와 [V32](#v32)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s028"></a>[U-S028](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s028>) | 사진 권한 요청·저장 형식 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S028](#s028)와 [V23](#v23)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s029"></a>[U-S029](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s029>) | 검색 일치 규칙·동일 표시명 처리 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S029](#s029)와 [V06](#v06)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-s030"></a>[U-S030](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s030>) | 발행물 제출 자격·현재 초안 저장 보장 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S030](#s030)와 [V09](#v09)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-s031"></a>[U-S031](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s031>) | 스타일 이름·적용 범위 내부 표현 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S031](#s031)와 [V07](#v07)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-s032"></a>[U-S032](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s032>) | 동일 시각 정렬·커서 정책 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S032](#s032)와 [V20](#v20)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s033"></a>[U-S033](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s033>) | 작가·발행물·토픽 섹션 정렬 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S033](#s033)와 [V11](#v11)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-s034"></a>[U-S034](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s034>) | 로컬 캐시·다른 기기 세션 영향 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S034](#s034)와 [V29](#v29)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H01](#h01) |
| <a id="u-s035"></a>[U-S035](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s035>) | 팔로우 없이 완료 가능한지, 추천 정렬 기준 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S035](#s035)와 [V30](#v30)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H01](#h01) |
| <a id="u-s036"></a>[U-S036](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s036>) | 체크 즉시 저장인지 Done 확정인지 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S036](#s036)와 [V22](#v22)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s037"></a>[U-S037](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s037>) | 현재 계정 권한·본문 게이트·집계 정확값 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S037](#s037)와 [V13](#v13)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-s038"></a>[U-S038](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s038>) | 비공개 리스트 누락 범위 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S038](#s038)와 [V14](#v14)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s039"></a>[U-S039](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s039>) | 공개 조회·영속성 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S039](#s039)와 [V24](#v24)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s040"></a>[U-S040](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s040>) | 실제 수신 중단·기기 동기화 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S040](#s040)와 [V28](#v28)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H07](#h07) |
| <a id="u-s041"></a>[U-S041](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s041>) | 문구상 기존 사용자의 경험 갱신일 수도 있어 신규 가입 전용 단계로 단정하지 않는다. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S041](#s041)와 [V30](#v30)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H01](#h01) |
| <a id="u-s042"></a>[U-S042](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s042>) | 빈 문서 Next 동작·자동 저장 시점 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S042](#s042)와 [V07](#v07)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-s043"></a>[U-S043](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s043>) | 표시 시간과 세션 복원·자동 이동 조건은 정적 이미지로 알 수 없다. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S043](#s043)와 [V30](#v30)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H01](#h01) |
| <a id="u-s044"></a>[U-S044](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s044>) | 링크 접근의 인증·검색엔진 노출 조건 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S044](#s044)와 [V06](#v06)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-s045"></a>[U-S045](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s045>) | 삭제 완료 영속성·복구 가능성 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S045](#s045)와 [V12](#v12)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-s046"></a>[U-S046](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s046>) | 실제 전환 후 음성·언어 지원 범위 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S046](#s046)와 [V19](#v19)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H08](#h08) |
| <a id="u-s047"></a>[U-S047](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s047>) | 대명사 다른 화면 노출·사진 처리 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S047](#s047)와 [V32](#v32)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s048"></a>[U-S048](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s048>) | 프로필 내 정렬·배지 현재 조건 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S048](#s048)와 [V14](#v14)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s049"></a>[U-S049](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s049>) | 이메일 발송·기존 기본값 유지 정책 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S049](#s049)와 [V14](#v14)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s050"></a>[U-S050](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s050>) | 실제 음성 출력·백그라운드 지속 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S050](#s050)와 [V18](#v18)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H08](#h08) |
| <a id="u-s051"></a>[U-S051](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s051>) | 클립보드 실제 URL·유효 범위 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S051](#s051)와 [V23](#v23)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s052"></a>[U-S052](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s052>) | 개별 삭제 확인·되돌리기 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S052](#s052)와 [V12](#v12)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-s053"></a>[U-S053](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s053>) | 편집 추천 선정 근거·개인 추천 로직 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S053](#s053)와 [V02](#v02)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-s054"></a>[U-S054](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s054>) | 입력값이 유효하다는 서버 판정이나 가입 완료는 아직 입증되지 않는다. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S054](#s054)와 [V29](#v29)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H01](#h01) |
| <a id="u-s055"></a>[U-S055](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s055>) | 음원 실제 길이·탐색·다음 기사 조건 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S055](#s055)와 [V18](#v18)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H08](#h08) |
| <a id="u-s056"></a>[U-S056](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s056>) | Viewed 조건·다운로드 상태와 구분 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S056](#s056)와 [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s057"></a>[U-S057](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s057>) | 토픽 간 계층인지 관련성인지 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S057](#s057)와 [V03](#v03)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-s058"></a>[U-S058](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s058>) | 이미지 밝기 정책 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S058](#s058)와 [V24](#v24)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s059"></a>[U-S059](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s059>) | 혜택 실제 이용 조건 및 현재 가격 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S059](#s059)와 [V31](#v31)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H08](#h08) |
| <a id="u-s060"></a>[U-S060](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s060>) | 저장 완료·글자 제한·제목 필수 검증 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S060](#s060)와 [V07](#v07)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-s061"></a>[U-S061](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s061>) | 직전 빈 상태 이후 팔로우 변화는 화면만으로 확정 불가 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S061](#s061)와 [V01](#v01)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-s062"></a>[U-S062](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s062>) | 서버 생성·다른 사용자 가시성 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S062](#s062)와 [V20](#v20)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s063"></a>[U-S063](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s063>) | 기기·계정 동기화 범위 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S063](#s063)와 [V16](#v16)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-s064"></a>[U-S064](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s064>) | 코드가 서버에서 유효한지는 다음 화면과 별도로 확인해야 한다. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S064](#s064)와 [V29](#v29)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H01](#h01) |
| <a id="u-s065"></a>[U-S065](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s065>) | 중복 추가 처리 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S065](#s065)와 [V06](#v06)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-s066"></a>[U-S066](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s066>) | 글 추가 경로·정렬 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S066](#s066)와 [V24](#v24)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s067"></a>[U-S067](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s067>) | 화면 밖의 선택 상태·주제 전체 수·저장 시점은 미확인이다. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S067](#s067)와 [V30](#v30)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H01](#h01) |
| <a id="u-s068"></a>[U-S068](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s068>) | 녹색선이 읽음 여부인지·이벤트 날짜는 캡처일 아님 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S068](#s068)와 [V05](#v05)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H07](#h07) |
| <a id="u-s069"></a>[U-S069](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s069>) | 추천 알고리즘·개인화 저장·카드 전체 클릭 영역 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S069](#s069)와 [V01](#v01)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-s070"></a>[U-S070](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s070>) | 토픽 전체 목록·개인화 순서 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S070](#s070)와 [V02](#v02)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-s071"></a>[U-S071](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s071>) | 총수 미변화가 집계 규칙인지 갱신 지연인지 미확인 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S071](#s071)와 [V20](#v20)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s072"></a>[U-S072](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s072>) | 대상 삭제·권한 변경 시 처리 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S072](#s072)와 [V20](#v20)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s073"></a>[U-S073](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s073>) | 실제 앨범 파일·해상도·권한 거부 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S073](#s073)와 [V23](#v23)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s074"></a>[U-S074](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s074>) | 타인 프로필에서 비공개 숨김 여부 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S074](#s074)와 [V32](#v32)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s075"></a>[U-S075](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s075>) | 실제 OS 아이콘 변경·구독별 현재 조건 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S075](#s075)와 [V33](#v33)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s076"></a>[U-S076](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s076>) | 이름 공백·중복 검증 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S076](#s076)와 [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s077"></a>[U-S077](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s077>) | 재진입·타기기 순서 유지 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S077](#s077)와 [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s078"></a>[U-S078](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s078>) | 드래그 접근성·동시 편집 충돌 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S078](#s078)와 [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s079"></a>[U-S079](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s079>) | 노출·추천 이유 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S079](#s079)와 [V02](#v02)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-s080"></a>[U-S080](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s080>) | 다국어·사용자 정의 값 지원 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S080](#s080)와 [V32](#v32)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s081"></a>[U-S081](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s081>) | 소유권·공유 편집자 권한 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S081](#s081)와 [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s082"></a>[U-S082](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s082>) | 자유 입력 허용 여부 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S082](#s082)와 [V32](#v32)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s083"></a>[U-S083](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s083>) | 작성 가능한 소개 형식·이력 공개 조건 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S083](#s083)와 [V14](#v14)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s084"></a>[U-S084](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s084>) | 결제창 진입·승인·실패 여부 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S084](#s084)와 [V31](#v31)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H08](#h08) |
| <a id="u-s085"></a>[U-S085](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s085>) | 원문·타인 저장·캐시 정리 결과 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S085](#s085)와 [V24](#v24)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s086"></a>[U-S086](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s086>) | 다른 콘텐츠는 테마 변경의 결과로 단정 불가 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S086](#s086)와 [V01](#v01)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-s087"></a>[U-S087](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s087>) | 검색 요청·사용권·출처 보존 계약 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S087](#s087)와 [V08](#v08)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-s088"></a>[U-S088](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s088>) | 실제 오디오 발화·설정 영속성 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S088](#s088)와 [V19](#v19)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H08](#h08) |
| <a id="u-s089"></a>[U-S089](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s089>) | 비행기 모드 재현·캐시 만료 미확인 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S089](#s089)와 [V26](#v26)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s090"></a>[U-S090](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s090>) | 누구의 목록인지 단독 화면에 제목 없음·진입 맥락 필요 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S090](#s090)와 [V14](#v14)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s091"></a>[U-S091](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s091>) | 이전 Life에서의 선택 과정 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S091](#s091)와 [V03](#v03)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-s092"></a>[U-S092](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s092>) | 중복·실패 처리 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S092](#s092)와 [V20](#v20)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s093"></a>[U-S093](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s093>) | 집계·탭 차이가 차단 때문인지 시점·버전 차이인지 미확인 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S093](#s093)와 [V15](#v15)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s094"></a>[U-S094](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s094>) | 중복 선택·순서 변경 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S094](#s094)와 [V32](#v32)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s095"></a>[U-S095](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s095>) | 기본 Reading list의 자동 생성 시점·빈 목록 다운로드 동작은 미확인. 기본 리스트 삭제 불가는 공식 도움말에서 확인했다. | 기본 Reading list 삭제 불가는 공식 보관 설명으로 부분 확정. 생성 시점·빈 목록 다운로드는 원본 미확인 유지. [S095](#s095)와 [V24](#v24)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s096"></a>[U-S096](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s096>) | 선택 즉시 조회 여부 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S096](#s096)와 [V27](#v27)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H07](#h07) |
| <a id="u-s097"></a>[U-S097](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s097>) | 인용 길이·편집·원문 연결 방식 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S097](#s097)와 [V20](#v20)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s098"></a>[U-S098](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s098>) | 다른 유형 결과·정렬·검색 없음 상태 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S098](#s098)와 [V02](#v02)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-s099"></a>[U-S099](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s099>) | 추천 산출·팔로우 즉시 반영 범위 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S099](#s099)와 [V11](#v11)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-s100"></a>[U-S100](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s100>) | 최대 깊이·전체 수 집계 규칙 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S100](#s100)와 [V20](#v20)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s101"></a>[U-S101](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s101>) | 공유 버튼 잔존 시 접근 정책 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S101](#s101)와 [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s102"></a>[U-S102](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s102>) | 추천 정렬·무한 스크롤 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S102](#s102)와 [V13](#v13)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-s103"></a>[U-S103](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s103>) | 해제 확인·알림 설정 보존 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S103](#s103)와 [V14](#v14)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s104"></a>[U-S104](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s104>) | 다른 캡처 계정 상태와 연속성 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S104](#s104)와 [V11](#v11)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-s105"></a>[U-S105](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s105>) | 타인 저장 목록 실제 제거·재공개 복원 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S105](#s105)와 [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s106"></a>[U-S106](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s106>) | 빈 리스트 공개·다운로드 동작 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S106](#s106)와 [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s107"></a>[U-S107](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s107>) | 리스트 기사 순서·추천 갱신 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S107](#s107)와 [V03](#v03)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-s108"></a>[U-S108](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s108>) | 색약·명암 대비 수치 미검증 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S108](#s108)와 [V24](#v24)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s109"></a>[U-S109](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s109>) | 타인 접근 차단 실제 재현 없음 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S109](#s109)와 [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s110"></a>[U-S110](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s110>) | 기사 표시 설정과 같은 저장값인지 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S110](#s110)와 [V33](#v33)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s111"></a>[U-S111](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s111>) | 관련도 계산식 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S111](#s111)와 [V20](#v20)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s112"></a>[U-S112](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s112>) | 페이지 크기·edited 시각 정책 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S112](#s112)와 [V20](#v20)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s113"></a>[U-S113](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s113>) | 위치 메타데이터 실제 전송·제거 여부 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S113](#s113)와 [V32](#v32)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s114"></a>[U-S114](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s114>) | 메모·오프라인 캐시·복구 정책 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S114](#s114)와 [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s115"></a>[U-S115](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s115>) | 저장 취소 시 유지 여부 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S115](#s115)와 [V06](#v06)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-s116"></a>[U-S116](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s116>) | 과거 콘텐츠 불변성·캐시 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S116](#s116)와 [V27](#v27)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H07](#h07) |
| <a id="u-s117"></a>[U-S117](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s117>) | 필수값 판정 시점과 실제 계정 생성 API는 보이지 않는다. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S117](#s117)와 [V29](#v29)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H01](#h01) |
| <a id="u-s118"></a>[U-S118](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s118>) | 최대 초과 시 UI·저장 실패 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S118](#s118)와 [V06](#v06)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-s119"></a>[U-S119](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s119>) | 시스템 테마 변경 즉시 반영 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S119](#s119)와 [V16](#v16)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-s120"></a>[U-S120](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s120>) | 최대4 초과 상태 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S120](#s120)와 [V32](#v32)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s121"></a>[U-S121](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s121>) | Undo 시간·메모와 순서 복구 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S121](#s121)와 [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s122"></a>[U-S122](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s122>) | 선택 앵커·문서 수정 후 범위 복원 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S122](#s122)와 [V17](#v17)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-s123"></a>[U-S123](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s123>) | 이름의 공백·중복·50자 초과 처리, 프로필 Save 실패와 취소 복원은 미수록. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S123](#s123)와 [V32](#v32)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s124"></a>[U-S124](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s124>) | 삭제 확인 단계·복구·자식 답글 영향 미수록 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S124](#s124)와 [V20](#v20)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s125"></a>[U-S125](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s125>) | 최대·최소·접근성 OS 글자 크기와 관계 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S125](#s125)와 [V16](#v16)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-s126"></a>[U-S126](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s126>) | 업로드인지 다운로드인지 미확인 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S126](#s126)와 [V08](#v08)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-s127"></a>[U-S127](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s127>) | 필수값 서버 검증·중복 신고 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S127](#s127)와 [V15](#v15)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s128"></a>[U-S128](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s128>) | 음원 생성·다운로드·권한 단계 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S128](#s128)와 [V18](#v18)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H08](#h08) |
| <a id="u-s129"></a>[U-S129](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s129>) | 실제 청구·세금·지역·현재 가격은 미확인 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S129](#s129)와 [V31](#v31)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H08](#h08) |
| <a id="u-s130"></a>[U-S130](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s130>) | 기존 이메일 구독 종료 여부 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S130](#s130)와 [V14](#v14)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s131"></a>[U-S131](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s131>) | 안내 수치 근거·즉시 적용 여부 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S131](#s131)와 [V19](#v19)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H08](#h08) |
| <a id="u-s132"></a>[U-S132](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s132>) | 화면 날짜는 캡처일이 아님·생성 기준 미확인 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S132](#s132)와 [V27](#v27)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H07](#h07) |
| <a id="u-s133"></a>[U-S133](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s133>) | 실제 결제 영수증·상품 ID·자동 갱신 상태 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S133](#s133)와 [V31](#v31)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H08](#h08) |
| <a id="u-s134"></a>[U-S134](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s134>) | 만료·오입력·재전송 제한·세션 생성 결과 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S134](#s134)와 [V29](#v29)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H01](#h01) |
| <a id="u-s135"></a>[U-S135](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s135>) | 저장 시 업데이트 알림·소유자 팔로우 관계 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S135](#s135)와 [V04](#v04)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s136"></a>[U-S136](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s136>) | 소개는 About에서 별도 확인 필요 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S136](#s136)와 [V32](#v32)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s137"></a>[U-S137](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s137>) | 자동 저장 성공 여부 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S137](#s137)와 [V07](#v07)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-s138"></a>[U-S138](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s138>) | 초과·중복·순서 검증 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S138](#s138)와 [V32](#v32)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s139"></a>[U-S139](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s139>) | 자동 저장 트리거·충돌·오프라인 동기화 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S139](#s139)와 [V09](#v09)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-s140"></a>[U-S140](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s140>) | 미리보기 개수 정책 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S140](#s140)와 [V13](#v13)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-s141"></a>[U-S141](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s141>) | 남은 시간 계산·위치 재설정 원인 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S141](#s141)와 [V18](#v18)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H08](#h08) |
| <a id="u-s142"></a>[U-S142](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s142>) | 수정 이력·수정 제한 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S142](#s142)와 [V20](#v20)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s143"></a>[U-S143](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s143>) | 음소거·차단·신고의 정확한 범위 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S143](#s143)와 [V15](#v15)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s144"></a>[U-S144](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s144>) | 앱 재시작·다른 기기 적용 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S144](#s144)와 [V32](#v32)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s145"></a>[U-S145](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s145>) | 정렬·원문 삭제 시 처리 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S145](#s145)와 [V24](#v24)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s146"></a>[U-S146](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s146>) | 토픽 6번째 선택 시 UI·삭제·순서·서버 검증은 미확인. 최대 5개 안내는 토픽 선택 화면 및 공식 문서에서 확인했다. | 최대5개 안내는 화면/공식 보관 설명으로 부분 확정. 6번째 UI·제거/순서·서버 검증은 원본 미확인 유지. [S146](#s146)와 [V06](#v06)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-s147"></a>[U-S147](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s147>) | 외부 링크 동작·토픽 추천 연결 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S147](#s147)와 [V13](#v13)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-s148"></a>[U-S148](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s148>) | 카메라·사진 권한 처리 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S148](#s148)와 [V08](#v08)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-s149"></a>[U-S149](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s149>) | 이 버전이 모든 flow에 동일한지는 미확인 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S149](#s149)와 [V33](#v33)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s150"></a>[U-S150](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s150>) | 월간11/2와 글별0/0 차이 원인 미확인 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S150](#s150)와 [V34](#v34)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H10](#h10) |
| <a id="u-s151"></a>[U-S151](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s151>) | 클릭 실패·동기화 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S151](#s151)와 [V11](#v11)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-s152"></a>[U-S152](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s152>) | 실제 피드 재조회·알림 수신·검색 결과는 미검증. 공식 음소거 도움말의 피드·Digest 제외 범위는 6절과 구분해 확인한다. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S152](#s152)와 [V15](#v15)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s153"></a>[U-S153](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s153>) | 선택한 일자 집계·전체 합계 라벨 관계 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S153](#s153)와 [V34](#v34)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H10](#h10) |
| <a id="u-s154"></a>[U-S154](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s154>) | 선택 음성이 기사 번역을 의미하는지는 미확인 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S154](#s154)와 [V19](#v19)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H08](#h08) |
| <a id="u-s155"></a>[U-S155](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s155>) | 서버 필수값·초과 검증 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S155](#s155)와 [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s156"></a>[U-S156](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s156>) | 사진 권한·크롭·업로드 실패 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S156](#s156)와 [V32](#v32)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s157"></a>[U-S157](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s157>) | 취소 복원·부분 저장 여부 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S157](#s157)와 [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s158"></a>[U-S158](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s158>) | 문자 제한·중복 전송·빈값 검증 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S158](#s158)와 [V20](#v20)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s159"></a>[U-S159](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s159>) | 권한 반영 시점·다른 기기 동기화 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S159](#s159)와 [V31](#v31)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H08](#h08) |
| <a id="u-s160"></a>[U-S160](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s160>) | 경과가 자연 재생인지 탐색 입력인지 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S160](#s160)와 [V18](#v18)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H08](#h08) |
| <a id="u-s161"></a>[U-S161](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s161>) | 사유별 추가 입력·신고 기준 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S161](#s161)와 [V15](#v15)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s162"></a>[U-S162](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s162>) | 다른 주기 옵션·발송 시간·외부 설정 결과 미수록 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S162](#s162)와 [V28](#v28)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H07](#h07) |
| <a id="u-s163"></a>[U-S163](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s163>) | Friend Link 권한·외부 앱 전송 결과 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S163](#s163)와 [V23](#v23)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s164"></a>[U-S164](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s164>) | 이미지 색상 반전·스크롤 위치 복원 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S164](#s164)와 [V13](#v13)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-s165"></a>[U-S165](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s165>) | 네트워크 실패·중단·부분 다운로드 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S165](#s165)와 [V26](#v26)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s166"></a>[U-S166](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s166>) | 각 공급자의 인증 완료·취소·오류 결과는 이 화면에 없다. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S166](#s166)와 [V29](#v29)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H01](#h01) |
| <a id="u-s167"></a>[U-S167](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s167>) | Add a short bio의 실제 이동 대상·소개 저장 실패는 미수록. 짧은 소개 160자 표시는 편집 화면 및 공식 문서에서 확인했다. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S167](#s167)와 [V32](#v32)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s168"></a>[U-S168](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s168>) | 각 행동 결과·권한 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S168](#s168)와 [V16](#v16)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-s169"></a>[U-S169](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s169>) | 조회 시점·집계 지연 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S169](#s169)와 [V32](#v32)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s170"></a>[U-S170](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s170>) | 운영 검토·제재 결과는 미수록 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S170](#s170)와 [V15](#v15)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s171"></a>[U-S171](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s171>) | 이메일 형식 검증·계정 없음 처리 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S171](#s171)와 [V29](#v29)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H01](#h01) |
| <a id="u-s172"></a>[U-S172](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s172>) | 다중 리스트 저장 해제 규칙 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S172](#s172)와 [V22](#v22)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s173"></a>[U-S173](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s173>) | 각 계정·결제 하위 화면 미수록 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S173](#s173)와 [V33](#v33)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s174"></a>[U-S174](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s174>) | 추가 페이지 로딩 방식 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S174](#s174)와 [V02](#v02)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-s175"></a>[U-S175](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s175>) | 정렬 기준·응답 총수의 답글 포함 여부 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S175](#s175)와 [V13](#v13)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-s176"></a>[U-S176](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s176>) | 빈 상태의 서버 원인·팔로우 개수 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S176](#s176)와 [V01](#v01)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-s177"></a>[U-S177](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s177>) | 정렬 기준·중복 기사 허용 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S177](#s177)와 [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s178"></a>[U-S178](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s178>) | 실제 공개 URL·외부 계정 조회 결과 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S178](#s178)와 [V32](#v32)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-s179"></a>[U-S179](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s179>) | 재진입 시 박수 수·취소 동작 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S179](#s179)와 [V13](#v13)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-s180"></a>[U-S180](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s180>) | 최소 검색 길이·검색 범위 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S180](#s180)와 [V10](#v10)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-s181"></a>[U-S181](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s181>) | 타인 메뉴·서버 소유권 검증 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S181](#s181)와 [V20](#v20)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s182"></a>[U-S182](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s182>) | 공급자별 실제 OAuth 경로 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S182](#s182)와 [V29](#v29)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H01](#h01) |
| <a id="u-s183"></a>[U-S183](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s183>) | 인용 반복 탭·해제 방식 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S183](#s183)와 [V07](#v07)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-s184"></a>[U-S184](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s184>) | OS 권한 팝업 및 실제 허용 결과 미수록 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S184](#s184)와 [V30](#v30)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H01](#h01) |
| <a id="u-s185"></a>[U-S185](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s185>) | 대비·OS 접근성 검증 미수행 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S185](#s185)와 [V02](#v02)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-s186"></a>[U-S186](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s186>) | 화면 아래 미노출 항목·OS 권한·빈도 옵션 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S186](#s186)와 [V28](#v28)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H07](#h07) |
| <a id="u-s187"></a>[U-S187](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s187>) | 글꼴 선택 옵션은 미수록 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S187](#s187)와 [V13](#v13)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-s188"></a>[U-S188](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s188>) | 과거 캡처의 View·Read 계산식·중복 제거·집계 지연은 미확인. 현재 도움말의 5초·30초 및 사용자/일 중복 제거 규칙을 과거에 소급 적용하지 않는다. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S188](#s188)와 [V34](#v34)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H10](#h10) |
| <a id="u-s189"></a>[U-S189](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s189>) | 강조가 개인 것인지 인기 강조인지 화면만으로 미확인 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S189](#s189)와 [V13](#v13)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-s190"></a>[U-S190](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s190>) | 읽음 판정 기준·기록 보존 기간 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S190](#s190)와 [V12](#v12)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-s191"></a>[U-S191](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s191>) | 수정·삭제·서버 검증 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S191](#s191)와 [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s192"></a>[U-S192](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s192>) | 선택 음성 이름이 안 보여 실제 적용은 청취 필요 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S192](#s192)와 [V18](#v18)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H08](#h08) |
| <a id="u-s193"></a>[U-S193](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s193>) | 발행 주기·누락 날짜·보관 기한·표시 시간대는 미확인. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S193](#s193)와 [V27](#v27)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H07](#h07) |
| <a id="u-s194"></a>[U-S194](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s194>) | 필터 유지 범위 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S194](#s194)와 [V11](#v11)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-s195"></a>[U-S195](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s195>) | 리스트에서 제거한 뒤 다른 리스트·다운로드 사본·메모가 유지되는지는 미검증. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S195](#s195)와 [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-s196"></a>[U-S196](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s196>) | 결과 정렬·페이지네이션 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S196](#s196)와 [V10](#v10)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-s197"></a>[U-S197](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s197>) | 총수 갱신·원문 이동 동작 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S197](#s197)와 [V20](#v20)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s198"></a>[U-S198](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s198>) | 앱 전체·기사별 적용 범위 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S198](#s198)와 [V16](#v16)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-s199"></a>[U-S199](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s199>) | 상대 계정에서의 접근·반응 제한 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S199](#s199)와 [V15](#v15)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-s200"></a>[U-S200](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-s200>) | 빈값 Done·최대 길이·메모 공개 범위 | 원본 미확인 유지(기존 부분 확정은 원문 보존). [S200](#s200)와 [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-f01"></a>[U-F01](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f01>) | 추천 갱신·모든 캐러셀 항목·Follow 결과·로딩·실패·빈 상태. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F01](#f01)와 [V01](#v01) · [V02](#v02)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-f02"></a>[U-F02](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f02>) | People·Publications·Topics·Lists 내용, 입력 중 추천·0건·오타·취소·실패·페이지네이션. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F02](#f02)와 [V02](#v02)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-f03"></a>[U-F03](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f03>) | Life 팔로우 실행·해제·공유, 토픽 간 계층/연관 규칙·빈 추천. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F03](#f03)와 [V02](#v02) · [V03](#v03)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-f04"></a>[U-F04](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f04>) | 리스트 저장·응답·박수·공유 실행, 모든 8개 글의 중간 화면·순서, 토픽 전환 과정. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F04](#f04)와 [V03](#v03) · [V04](#v04)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) · [H04](#h04) |
| <a id="u-f05"></a>[U-F05](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f05>) | Following·개별 토픽 탭 내용, 원형 − 실행, 새로고침·추가 로딩·네트워크 실패. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F05](#f05)와 [V01](#v01)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-f06"></a>[U-F06](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f06>) | 항목별 목적지·읽음·읽지 않음·0건·다음 페이지·실패·설정 연동. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F06](#f06)와 [V01](#v01) · [V05](#v05)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) · [H07](#h07) |
| <a id="u-f07"></a>[U-F07](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f07>) | 5개 경계·6번째 선택, 칩 제거, 중복·검색 0건·Save 실패·취소 복원. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F07](#f07)와 [V06](#v06)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-f08"></a>[U-F08](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f08>) | Close 후 초안 처리, Publication 제출, Unlisted On, 미리보기 Edit, 빈 글·이미지 실패·발행 실패. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F08](#f08)와 [V01](#v01) · [V07](#v07) · [V08](#v08) · [V06](#v06) · [V32](#v32)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) · [H02](#h02) · [H09](#h09) |
| <a id="u-f09"></a>[U-F09](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f09>) | 서식 해제·중첩·코드 블록, 선택 범위별 적용, 취소·자동 저장 실패. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F09](#f09)와 [V07](#v07)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-f10"></a>[U-F10](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f10>) | 초안 다시 열기·삭제·여러 초안·빈 목록, 오프라인 충돌과 자동 저장 실패. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F10](#f10)와 [V07](#v07) · [V09](#v09)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-f11"></a>[U-F11](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f11>) | 검색 0건·중복 이름 식별·멘션 제거, 발행 후 대상 이동·알림 수신. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F11](#f11)와 [V07](#v07) · [V10](#v10)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H02](#h02) |
| <a id="u-f12"></a>[U-F12](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f12>) | Muted 탭 내용, 팔로우 변경 중간 과정, 다른 계정·재진입 동기화. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F12](#f12)와 [V01](#v01) · [V11](#v11) · [V12](#v12)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) · [H03](#h03) |
| <a id="u-f13"></a>[U-F13](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f13>) | Writers·Publications 단독 선택 결과, 필터별 0건·오류·선택 유지. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F13](#f13)와 [V11](#v11)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) |
| <a id="u-f14"></a>[U-F14](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f14>) | 개별 기록 삭제·Undo·기록 생성 조건, Library 쪽 Reading history와의 관계. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F14](#f14)와 [V12](#v12)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-f15"></a>[U-F15](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f15>) | 확인창·취소·삭제 실패·재진입, 추천 데이터의 삭제 범위. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F15](#f15)와 [V12](#v12)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-f16"></a>[U-F16](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f16>) | 비회원 게이트·삭제 글·네트워크 실패, 본문 링크·미리보기 응답 클릭 결과. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F16](#f16)와 [V01](#v01) · [V13](#v13)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) · [H03](#h03) |
| <a id="u-f17"></a>[U-F17](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f17>) | 타인 비공개 목록, 팔로워 목록·고정 정렬, 외부 링크·비로그인 접근. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F17](#f17)와 [V13](#v13) · [V14](#v14)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) · [H05](#h05) |
| <a id="u-f18"></a>[U-F18](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f18>) | 차단 상대 계정에서 접근, 해제, 반응·멘션·저장 리스트 변화. 현재 공식 규칙과 캡처 불일치. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F18](#f18)와 [V14](#v14) · [V15](#v15)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-f19"></a>[U-F19](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f19>) | 이메일 Off 적용·실제 수신·동시 팔로우·실패·재진입, 기본값 판정. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F19](#f19)와 [V14](#v14)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-f20"></a>[U-F20](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f20>) | 확인·취소·실패·재팔로우, 기존 이메일 구독과 설정 보존. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F20](#f20)와 [V14](#v14)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-f21"></a>[U-F21](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f21>) | 목록 제목·선택한 집계 종류, 전체 25건·다음 페이지·팔로우 실행·빈 목록. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F21](#f21)와 [V14](#v14)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-f22"></a>[U-F22](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f22>) | Muted 관리 목록·음소거 해제·새 피드/Digest 확인·실제 알림. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F22](#f22)와 [V14](#v14) · [V15](#v15)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-f23"></a>[U-F23](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f23>) | 나머지 사유·동시 차단·권리 침해 분기·닫기·중복·접수 실패·제재 결과. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F23](#f23)와 [V14](#v14) · [V15](#v15)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-f24"></a>[U-F24](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f24>) | 글꼴 옵션·크기 경계·OS 글자 크기·System 테마 연동·재진입·설정 동기화. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F24](#f24)와 [V13](#v13) · [V16](#v16)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-f25"></a>[U-F25](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f25>) | 강조 제거·겹침·원문 수정/삭제·동기화·타인 노출, Share/더보기 실행. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F25](#f25)와 [V13](#v13) · [V17](#v17)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-f26"></a>[U-F26](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f26>) | 일시정지·닫기·스크럽·백그라운드·오프라인·재생 실패·권한 게이트·재생 큐. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F26](#f26)와 [V13](#v13) · [V18](#v18)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) · [H08](#h08) |
| <a id="u-f27"></a>[U-F27](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f27>) | 최소·최대·증분·취소·다른 글/재진입 유지, 실제 발화 속도. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F27](#f27)와 [V18](#v18) · [V19](#v19)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H08](#h08) |
| <a id="u-f28"></a>[U-F28](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f28>) | 음성 검색·미리 듣기·실패·재진입 유지, 본문 언어와 번역 지원 구분. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F28](#f28)와 [V18](#v18) · [V19](#v19)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H08](#h08) |
| <a id="u-f29"></a>[U-F29](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f29>) | 인용 제거·길이 제한·원문 연결·Cancel·중복·실패, 총수 갱신. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F29](#f29)와 [V17](#v17) · [V20](#v20)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) · [H05](#h05) |
| <a id="u-f30"></a>[U-F30](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f30>) | 응답 0건·닫힌 토론·숨겨진 응답·로그인 필요 상태, 최대 깊이·더 보기 실패. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F30](#f30)와 [V13](#v13) · [V20](#v20)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) · [H05](#h05) |
| <a id="u-f31"></a>[U-F31](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f31>) | 빈값·문자 초과·중복 제출·실패·닫기 시 입력 보존, 토론 닫힘. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F31](#f31)와 [V20](#v20)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-f32"></a>[U-F32](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f32>) | 삭제 전 확인·취소·복구·답글 연쇄 처리·재진입, 서버 소유권 검증. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F32](#f32)와 [V20](#v20)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-f33"></a>[U-F33](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f33>) | Cancel 복원·빈값 수정·타인 권한·토론 닫힘·동시 수정, 수정 이력. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F33](#f33)와 [V20](#v20)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-f34"></a>[U-F34](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f34>) | 문서 전체 내용·버전 차이·링크 이동·뒤로 복귀 결과. 캡처 날짜와 게시 날짜를 구분한다. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F34](#f34)와 [V20](#v20) · [V21](#v21)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) · [H03](#h03) |
| <a id="u-f35"></a>[U-F35](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f35>) | Cancel·빈값·부모 삭제·최대 깊이·닫힌 토론·전송 실패. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F35](#f35)와 [V20](#v20)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-f36"></a>[U-F36](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f36>) | 정렬별 페이지 경계·동률·수정 시각 취급·선택 유지, Most Relevant 계산식. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F36](#f36)와 [V20](#v20)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H05](#h05) |
| <a id="u-f37"></a>[U-F37](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f37>) | 복수 리스트 선택·선택 해제·Create new list 실행·저장 실패, 타 기기 재조회. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F37](#f37)와 [V13](#v13) · [V22](#v22)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) · [H04](#h04) |
| <a id="u-f38"></a>[U-F38](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f38>) | 0~50 경계·취소·실패·재진입, 본인 글의 제한·중복 요청. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F38](#f38)와 [V13](#v13)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) |
| <a id="u-f39"></a>[U-F39](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f39>) | Friend Link 생성·자격 거부, Share via 시스템 시트·취소, 카드 스타일 전환. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F39](#f39)와 [V13](#v13) · [V23](#v23)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H03](#h03) · [H09](#h09) |
| <a id="u-f40"></a>[U-F40](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f40>) | 사진 권한 허용·거부·저장 실패, 실제 앨범 파일·형식·해상도. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F40](#f40)와 [V23](#v23)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-f41"></a>[U-F41](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f41>) | Saved lists·Library Reading history 본문, 배너 닫기 결과·빈 탭·실패·페이지네이션. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F41](#f41)와 [V01](#v01) · [V24](#v24) · [V27](#v27)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) · [H04](#h04) · [H07](#h07) |
| <a id="u-f42"></a>[U-F42](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f42>) | 60/280자 경계·공백·중복 이름·Private On·Cancel·생성 실패. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F42](#f42)와 [V24](#v24) · [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-f43"></a>[U-F43](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f43>) | 닫기·선택 유지·날짜 0건·조회 실패·시간대·10개보다 오래된 기록. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F43](#f43)와 [V27](#v27)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H07](#h07) |
| <a id="u-f44"></a>[U-F44](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f44>) | 다른 빈도 옵션·변경 저장·푸시 세부 화면·외부 이메일 설정·발송 시간. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F44](#f44)와 [V27](#v27) · [V28](#v28)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H07](#h07) |
| <a id="u-f45"></a>[U-F45](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f45>) | 빈값 Done·최대 길이·Cancel·수정/삭제·공개 접근·다른 리스트 동일 글. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F45](#f45)와 [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-f46"></a>[U-F46](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f46>) | Start browsing 결과·글 추가·Edit list info·공유·응답·원문 삭제 영향. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F46](#f46)와 [V24](#v24) · [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-f47"></a>[U-F47](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f47>) | 닫기·실패·복구·타인 라이브러리·캐시/메모 정리, 기본 리스트 삭제 제한. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F47](#f47)와 [V25](#v25) · [V24](#v24)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-f48"></a>[U-F48](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f48>) | 중단·부분 실패·재다운로드·캐시 삭제·저장 공간 부족·비행기 모드. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F48](#f48)와 [V25](#v25) · [V26](#v26)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-f49"></a>[U-F49](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f49>) | Cancel·실패·타인 접근·재공개·타인 저장 복원·공유 링크 처리. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F49](#f49)와 [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-f50"></a>[U-F50](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f50>) | Undo 실행·시간 제한·메모/순서 복구·실패, 다른 리스트와 원문 유지. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F50](#f50)와 [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-f51"></a>[U-F51](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f51>) | Cancel·마지막 두 글 재조회·동시 편집·저장 실패·메모 유지·접근성 이동. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F51](#f51)와 [V25](#v25)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H04](#h04) |
| <a id="u-f52"></a>[U-F52](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f52>) | 잘못된 이메일·미가입 계정·코드 만료/오입력/재전송·소셜 취소·세션 재진입. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F52](#f52)와 [V29](#v29) · [V01](#v01)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H01](#h01) · [H06](#h06) |
| <a id="u-f53"></a>[U-F53](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f53>) | 관심사 0~2개·정확히 3개, 알림 Skip/OS 거부, 소셜 인증, 이메일 오류·재전송, 구독 닫기 결과. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F53](#f53)와 [V30](#v30) · [V29](#v29) · [V31](#v31) · [V01](#v01)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H01](#h01) · [H08](#h08) · [H06](#h06) |
| <a id="u-f54"></a>[U-F54](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f54>) | 연간·Friend 실제 선택, 스토어 확인·취소·실패·복원, 갱신·해지. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F54](#f54)와 [V31](#v31) · [V01](#v01)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H08](#h08) · [H06](#h06) |
| <a id="u-f55"></a>[U-F55](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f55>) | Public 필터 옵션·게시 글 메뉴·타인 시점·소개 편집 진입·조회 실패. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F55](#f55)와 [V01](#v01) · [V32](#v32)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H06](#h06) · [H09](#h09) |
| <a id="u-f56"></a>[U-F56](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f56>) | 칩 삭제·4개/5번째 선택·중복·검색 0건·사용자 정의·Save/취소. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F56](#f56)와 [V32](#v32)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-f57"></a>[U-F57](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f57>) | Name 50·bio 160 경계·빈 이름·Cancel·사진 권한/실패·웹 About 편집. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F57](#f57)와 [V32](#v32)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-f58"></a>[U-F58](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f58>) | Account·Membership and payment·Email·Facebook·More app controls의 실제 하위 화면. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F58](#f58)와 [V32](#v32) · [V33](#v33)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-f59"></a>[U-F59](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f59>) | Tailored 옵션·화면 아래 잘린 행·OS 권한·전송 결과·저장 실패·재진입. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F59](#f59)와 [V33](#v33) · [V28](#v28)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) · [H07](#h07) |
| <a id="u-f60"></a>[U-F60](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f60>) | 전체 아이콘 목록·Friend 해제·대체 아이콘 선택·OS 결과·실패·재시작. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F60](#f60)와 [V33](#v33)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) |
| <a id="u-f61"></a>[U-F61](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f61>) | Cancel·실패·캐시 정리·보호 화면 뒤로 이동·다른 기기 세션 영향. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F61](#f61)와 [V33](#v33) · [V29](#v29)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) · [H01](#h01) |
| <a id="u-f62"></a>[U-F62](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f62>) | Light 복귀·System 연동·재시작·다른 기기·OS 접근성·기사 설정과 동기화. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F62](#f62)와 [V33](#v33) · [V01](#v01) · [V02](#v02) · [V24](#v24) · [V25](#v25) · [V32](#v32)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) · [H06](#h06) · [H04](#h04) |
| <a id="u-f63"></a>[U-F63](<../TODO/MEDIUM_PARITY/UNKNOWN.md#u-f63>) | 다른 월·정렬 옵션·글 상세·0건·오류·새로고침, 집계 불일치 원인. | 원본 미확인 유지(기존 부분 확정은 원문 보존). [F63](#f63)와 [V32](#v32) · [V34](#v34)의 현재 구현/자체 정책·지원 한계에 연결. 공식 근거/정책 결정 입력: [H09](#h09) · [H10](#h10) |

<a id="contracts"></a>

## 기존 공통 계약 C72 · Goal G53 연결

C의 요구 원문·담당 G 링크는 [SCOPE](<../TODO/MEDIUM_PARITY/SCOPE.md>)에서 유지하고, 53개 G의 원래 완료 조건/당시 결과는 [CONTRACTS](<../TODO/MEDIUM_PARITY/CONTRACTS.md>)에서 보존한다. 다음은 현재 충족 범위와 남은 경계다. 전체 C를 모두 실제 서비스 구현 완료로 표시하지 않는다.

| C ID / 기존 요구 | 현 구현·근거·판정 |
| --- | --- |
| <a id="c01"></a>**C01** 공통: 글꼴·본문 serif·아이콘·토큰·좌표·행간·줄바꿈·이미지 crop | 현 Android 디자인 수용·2단계 차이 정리 종료. 원본 서체 미확보·인용선/대체 자산 차이 유지; 아이콘 변경 제외. [tokens](<../FE/src/shared/theme/tokens.ts>) · [SOURCES](<../FE/assets/medium/SOURCES.json>) · [자산/근거](#coverage) |
| <a id="c02"></a>**C02** 공통: Light/Dark/System·OS 추종·시트/입력/카드 테마 | [V16](#v16) · [V33](#v33)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c03"></a>**C03** 공통: 48×48 터치·큰 글자·Safe Area·키보드·VoiceOver/TalkBack | Safe Area/키보드/기사 200%의 기존 사용자 수용 유지. 별도 Android의 OS font_scale2.0에서 홈/기사·표시 설정, 사진 검색창, 멘션 후보를 확인한 실행 이력도 반영: [홈/표시 설정](FE_MOBILE_EXECUTION_01_RESULT.md#dark-selection-native-20261127) · [기사](FE_MOBILE_EXECUTION_01_RESULT.md#reader-layout-native-20261127) · [사진 검색창](FE_MOBILE_EXECUTION_01_RESULT.md#photo-picker-layout-native-20261127) · [멘션](FE_MOBILE_EXECUTION_01_RESULT.md#mention-layout-native-20261127). 대표7화면 전체 OS확대·모든 VoiceOver/TalkBack 분기·모든 터치 영역 실측은 미확인. 원본 동일성·실제 iOS/휴대폰 검증으로 확대하지 않으며 필수 대기로도 삼지 않음. [Q07](#q07) |
| <a id="c04"></a>**C04** 홈: For you/Following/Featured·+·알림·Write·하단 탭 | [V01](#v01)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c05"></a>**C05** 홈: For you 카드 −·더보기·Show less·관심사 편집 | [V11](#v11) · [V01](#v01)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c06"></a>**C06** 탐색: 토픽 가로 이동·Trending·Staff Picks·Recommended for you·Who to follow | [V02](#v02) · [V03](#v03)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c07"></a>**C07** 검색: 검색어·clear·취소·Stories/People/Publications/Topics/Lists·결과 이동 | [V02](#v02)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c08"></a>**C08** 토픽: Follow/Following·토픽 공유·큐레이션 미리보기·publication 관계 | [V03](#v03)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c09"></a>**C09** 기사: 원문/읽기 도구·유료 배지·관련 글·작성자·토픽·반응 영역 | [V13](#v13)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c10"></a>**C10** 기사: 누적 claps·내 기여·피드백 수·다른 카드 수 동기화·Undo claps·박수 사용자 목록 | [V13](#v13)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c11"></a>**C11** 기사: Viewed·읽은 제목 색·읽기 이력 발생 | [V13](#v13) · [V12](#v12)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c12"></a>**C12** 기사 메뉴: Show less / Display / Follow / Mute / Report story | [V16](#v16) · [V13](#v13) · [V11](#v11) · [V15](#v15)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c13"></a>**C13** 읽기 설정: Font size 100%/120%·Font·Theme·Show highlights | [V16](#v16)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c14"></a>**C14** 응답: Responses 열기·수/목록·Most relevant/Most recent·policy | [V21](#v21) · [V20](#v20)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c15"></a>**C15** 응답: 작성·수정·삭제 확인·Cancel/Save/Publish·실패 입력 유지 | [V20](#v20)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c16"></a>**C16** 응답: 부모 댓글·답글 작성·Hide replies·See more replies | [V20](#v20)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c17"></a>**C17** 응답: 댓글/답글 claps·Read more·작성자 메뉴 | [V20](#v20)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c18"></a>**C18** 응답 관리: 이야기 작성자의 응답 숨김·토론 종료·권한/확인 | [V20](#v20) · [V15](#v15)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c19"></a>**C19** 선택: 문구 선택 핸들·Highlight/Respond/Share/더보기 | [V17](#v17)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c20"></a>**C20** 선택: highlight 저장/해제·타인 표시·Library Highlights·인용 응답 | [V20](#v20) · [V17](#v17) · [V24](#v24)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c21"></a>**C21** 작성자: Stories/Lists/About·고정 이야기·Member/Friend 정보·웹사이트 | [V14](#v14)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c22"></a>**C22** 작성자: Follow/Following/Unfollow·팔로워/Following list·이메일 수신 | [V14](#v14)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c23"></a>**C23** 작성자 메뉴: Share author / Mute / Block / Report / Cancel | [V23](#v23) · [V15](#v15)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c24"></a>**C24** 신고: 작가/기사 대상·이유·추가 설명·Also block·정책/권리 링크·Report this item·Blocked users | [V15](#v15)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c25"></a>**C25** 추천: Following/Reading history/Muted/Suggestions·See all/See more | [V11](#v11) · [V12](#v12)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c26"></a>**C26** 추천: All/Writers/Publications/Topics·follow·mute 해제 | [V11](#v11)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c27"></a>**C27** 이력: 개별 기록 제거·Clear history·확인/취소·Library 이력 진입 | [V12](#v12)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c28"></a>**C28** 저장: Save to·여러 목록·선택 초안·Done·새 목록 생성 | [V25](#v25) · [V22](#v22)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c29"></a>**C29** 공개 목록: 전체 목록 Save/해제·저장 수·Saved lists·소유자/방문자 | [V04](#v04) · [V24](#v24)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c30"></a>**C30** 공개 목록: 목록 claps·목록 responses·소유자 Follow·Share·Undo claps·박수 사용자 목록 | [V25](#v25) · [V04](#v04)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c31"></a>**C31** 내 목록: 목록 제목/설명 편집·읽기 목록·새 목록·행별 더보기 | [V25](#v25) · [V24](#v24)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c32"></a>**C32** 내 목록: Add/Edit note·취소/저장·빈값 Done·기존 메모 지우기·공개 범위 | [V25](#v25)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c33"></a>**C33** 내 목록: Reorder·드래그·Cancel/Done·확정 순서 | [V25](#v25)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c34"></a>**C34** 내 목록: Make private 확인·타인 저장 목록 경고·잠금·공유 아이콘 | [V25](#v25)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c35"></a>**C35** 내 목록: Remove story·Undo·Delete list·확인/취소 | [V25](#v25)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c36"></a>**C36** 다운로드: Download list·진행/완료·개별 기사 상태·취소/제거/실패 | [V26](#v26)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c37"></a>**C37** Library: Your lists/Saved lists/Highlights/Reading history·Digest | [V24](#v24) · [V12](#v12) · [V27](#v27)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c38"></a>**C38** Digest: 날짜 선택/Done·해당 이야기·last 10 digests | [V27](#v27)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c39"></a>**C39** Digest: Daily 빈도·Push chevron·Email 외부 링크·설정 복귀 | [V28](#v28)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c40"></a>**C40** 편집기: 제목/본문·서식 툴바·헤더/강조/링크/인용/목록/구분선/코드 | [V07](#v07)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c41"></a>**C41** 편집기: 이미지 메뉴·Camera/Library·Unsplash 검색/로딩/선택·삭제 X | [V08](#v08)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c42"></a>**C42** 편집기: Drafts 메뉴·초안 목록/재개·자동 저장/실패 | [V09](#v09)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c43"></a>**C43** 편집기: @ 검색·핸들/아바타·동명이인·선택/삭제·멘션 대상 | [V10](#v10)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c44"></a>**C44** 발행: 토픽 검색·최대 5개·chip 제거·검색 X·완료 | [V06](#v06)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c45"></a>**C45** 발행: 미리보기 Edit/Topics/Publication/Unlisted/Publish now·내 Stories | [V06](#v06)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c46"></a>**C46** 인증: 가입 제공자 4개·로그인 X 포함 5개·intro/로그인 전환 | [V29](#v29)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c47"></a>**C47** 인증: 이메일·이름·6자리 코드·재전송·활성 상태·닫기/뒤로 | [V29](#v29)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c48"></a>**C48** 인증: 세션 복구·mock A/B·로그아웃 확인→intro·계정 데이터 정리 | [V29](#v29)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c49"></a>**C49** 온보딩: 관심사 최소 3개·Continue·Follow/Finish·재진입 | [V30](#v30)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c50"></a>**C50** 온보딩: 알림 Enable/Skip·새 경험 안내·멤버십 제안 | [V30](#v30) · [V28](#v28) · [V31](#v31)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c51"></a>**C51** 프로필: 사진 Camera/Library·부모 Save·이름·short bio·50/160 표시 | [V32](#v32)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c52"></a>**C52** 프로필: pronouns 최대 4개·검색/선택·Done→부모 Save/Cancel | [V32](#v32)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c53"></a>**C53** 프로필: About 데스크톱 안내·내 Stories/Public 필터·Lists·팔로우 진입 | [V32](#v32)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c54"></a>**C54** 통계: Monthly/Lifetime·날짜/월·Views/Reads·그래프·Stories·Latest | [V34](#v34)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c55"></a>**C55** 알림: 유형별 목록·팔로우 버튼·작가/기사/목록/응답 대상·복귀 | [V05](#v05)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c56"></a>**C56** 알림 설정: Digest/Top stories/Editors/Featured/Applause/Saves 토글 | [V28](#v28)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c57"></a>**C57** 알림 설정: Tailored for you·새 글/박수/highlight/응답/mentions·Email | [V28](#v28)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c58"></a>**C58** 오디오: Listen 로딩·미니/확장·play/pause/close·시간·10초/30초 이동 | [V18](#v18)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c59"></a>**C59** 오디오: 속도 1→2.5·WPM·선택 확인/취소·이전/다음 상태 | [V19](#v19) · [V18](#v18)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c60"></a>**C60** 오디오: Emma→Hans·음성 언어/메타데이터·검색·선택 | [V19](#v19)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c61"></a>**C61** 오디오 메뉴: AirPlay/Select voice/View story/Show less/Mute/Report·Share | [V19](#v19) · [V23](#v23) · [V18](#v18) · [V15](#v15)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c62"></a>**C62** 공유: 기사 카드·스타일 페이지 점·Copy link 토스트·Friend link | [V23](#v23)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c63"></a>**C63** 공유: Share via OS sheet·Save image·앨범 권한/실패/취소 | [V23](#v23)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c64"></a>**C64** 공유: 인용·작성자·토픽·공개/내 목록의 대상별 공유 | [V23](#v23)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c65"></a>**C65** 멤버십: Member/Friend·월간/연간·가격/혜택·loading/success/Welcome | [V31](#v31)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c66"></a>**C66** 멤버십: 구독 상태·오디오/오프라인 혜택·Friend link/아이콘 자격·기사 paywall 진입 | [V18](#v18) · [V31](#v31) · [V33](#v33) · [V26](#v26)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c67"></a>**C67** 설정: Account/Membership & payment/Email/Facebook 연결 | [V29](#v29) · [V28](#v28) · [V31](#v31) · [V33](#v33)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c68"></a>**C68** 설정: Help/Terms/Privacy/Rate/More controls·외부 링크·복귀 | [V33](#v33)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c69"></a>**C69** 앱 아이콘: Wordmark/Founders black·white/Friend/Throwback 2012·2015·2017 | [V33](#v33)의 현재 코드·기존 검사·사용자 수용에 연결. 해당 모의/플랫폼 경계와 미지원·차이를 적용; 원본 미확인/외부 미연결은 완료 아님. |
| <a id="c70"></a>**C70** 통합: 모든 진입·소유권·수/선택 동기화·실패/재시도·A→B→A | navigation/provider/source 계정·권한·요청 수명/오류 계약과 기존 검사 연결. 실서버 권한·모든 경쟁 조건 실증 아님. [AppNavigator](<../FE/src/app/navigation/AppNavigator.tsx>) · [통합 검사](<../FE/src/app/navigation/AppNavigator.test.tsx>) · [인계](<../TODO/FE_MEDIUM_BACKEND_HANDOFF.md>) |
| <a id="c71"></a>**C71** 플랫폼: native 선택/사진/클립보드/공유/저장/알림/아이콘/오디오 | 기기 사진/Clipboard/OS Share/사진 저장/알림 권한/기존 아이콘 어댑터와 무음 Listen을 구분. [V08](#v08) · [V23](#v23) · [V28](#v28) · [V33](#v33) · [V18](#v18). 외부 전송/실제 음성 미지원; Android 선택 메뉴 제거 보류 |
| <a id="c72"></a>**C72** 최종: 63흐름·273단계 연결·200고유 시각 비교·계약 인계 | S200/F63/T273 및 R/U/C/G 연결·판정/인계 완료. 200개 현재 FE 캡처/overlay 신규 생성·전수 픽셀 동일성은 미입증. [최종 판정](#decision) · [현재 문서 검사](#validation) |

<a id="goals"></a>

### G01~G53 계약의 현재 연결

초기 G01~G22는 C 표가 직접 열거하지 않으므로 여기서 따로 연결한다. 원래 계약·당시 결과는 각 링크에 보존되어 있다. 아래 판정은 후속 구현으로 이어진 현재 범위이며 과거의 모든 완료 조건을 새로 통과시킨 것이 아니다.

| G 계약 | 현재 구현/증거 연결 | 판정 |
| --- | --- | --- |
| <a id="g01"></a>[G01 프로젝트 초기화와 테스트 환경](MEDIUM_PARITY/CONTRACTS.md#g01) | [C70](#c70) · [C71](#c71) | 기존 프로젝트/검사 환경 유지. 이번 문서 검사와 과거 FE 검사를 구분 |
| <a id="g02"></a>[G02 공통 스타일과 하단 탭 이동](MEDIUM_PARITY/CONTRACTS.md#g02) | [C01](#c01) · [V01](#v01) · [V33](#v33) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g03"></a>[G03 홈 피드와 기사 카드](MEDIUM_PARITY/CONTRACTS.md#g03) | [V01](#v01) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g04"></a>[G04 기사 상세](MEDIUM_PARITY/CONTRACTS.md#g04) | [V13](#v13) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g05"></a>[G05 4단계 설명 전환](MEDIUM_PARITY/CONTRACTS.md#g05) | [V13](#v13) · [H03](#h03) | 자체 설명 수준/Reading tools 로컬 예시; 실제 AI 생성·원본 Medium 기능으로 확정하지 않음 |
| <a id="g06"></a>[G06 기사 검색](MEDIUM_PARITY/CONTRACTS.md#g06) | [V02](#v02) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g07"></a>[G07 좋아요 등록·해제](MEDIUM_PARITY/CONTRACTS.md#g07) | [V13](#v13) · [V04](#v04) | 후속 누적 반응 계약 최대50 적용, 현재 하트는 사용자 확정 디자인. 초기 좋아요 명칭으로 단일 like 서버 모델을 확정하지 않음 |
| <a id="g08"></a>[G08 북마크와 저장 목록](MEDIUM_PARITY/CONTRACTS.md#g08) | [V22](#v22) · [V24](#v24) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g09"></a>[G09 라이브러리 목록 관리](MEDIUM_PARITY/CONTRACTS.md#g09) | [V25](#v25) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g10"></a>[G10 모의 로그인·취소·로그아웃](MEDIUM_PARITY/CONTRACTS.md#g10) | [V29](#v29) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g11"></a>[G11 프로필 조회·수정](MEDIUM_PARITY/CONTRACTS.md#g11) | [V32](#v32) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g12"></a>[G12 설정](MEDIUM_PARITY/CONTRACTS.md#g12) | [V33](#v33) · [V16](#v16) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g13"></a>[G13 전체 흐름 검증](MEDIUM_PARITY/CONTRACTS.md#g13) | [C70](#c70) | 기존 흐름 검사 근거 연결. 모든 현재 상태 신규 실행 통과 아님 |
| <a id="g14"></a>[G14 FE 규칙 준수 검토·수정·재검토·커밋](MEDIUM_PARITY/CONTRACTS.md#g14) | [C70](#c70) | 문서 감사와 변경 범위 검토 완료. 이번 제품 코드 수정/전체 check 수행 아님 |
| <a id="g15"></a>[G15 원본 대응표·클론 기준·공통 시각 요소](MEDIUM_PARITY/CONTRACTS.md#g15) | [C01](#c01) · [C72](#c72) | 원본/공통 기준 보존 및 현재 시각 수용·차이 기록. 전수 동일성 미입증 |
| <a id="g16"></a>[G16 홈·탐색·검색 클론](MEDIUM_PARITY/CONTRACTS.md#g16) | [V01](#v01) · [V02](#v02) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g17"></a>[G17 기사 상세·반응 바·저장 대상 선택 클론](MEDIUM_PARITY/CONTRACTS.md#g17) | [V13](#v13) · [V22](#v22) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g18"></a>[G18 라이브러리·목록 상세·목록 관리 클론](MEDIUM_PARITY/CONTRACTS.md#g18) | [V24](#v24) · [V25](#v25) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g19"></a>[G19 로그인·로그아웃 클론](MEDIUM_PARITY/CONTRACTS.md#g19) | [V29](#v29) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g20"></a>[G20 프로필·편집·설정 클론](MEDIUM_PARITY/CONTRACTS.md#g20) | [V32](#v32) · [V33](#v33) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g21"></a>[G21 전체 클론 화면·UX 통합 검증](MEDIUM_PARITY/CONTRACTS.md#g21) | [C70](#c70) · [C72](#c72) | 기존 통합 검사·후속 사용자 수용 연결. 원본 전체 시각/외부 효과 미입증 |
| <a id="g22"></a>[G22 원본 전수 대응·현재 코드·비교 환경 기준선](MEDIUM_PARITY/CONTRACTS.md#g22) | [C72](#c72) | 원본 전수 연결·현재 코드/기준 갱신. 이전 스냅샷 해시/캡처 부재는 이력으로 구분 |
| <a id="g23"></a>[G23 공통 글꼴·아이콘·레이아웃과 기존 화면 보정](MEDIUM_PARITY/CONTRACTS.md#g23) | [C01](#c01) | 2단계 보정 종료·현재 디자인 수용; 서체/자산 차이 유지, 아이콘 변경 제외 |
| <a id="g24"></a>[G24 전역 Light·Dark·System과 기사 표시 설정](MEDIUM_PARITY/CONTRACTS.md#g24) | [V16](#v16) · [V33](#v33) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g25"></a>[G25 기사 본문·박수·읽음 표시·상세 메뉴](MEDIUM_PARITY/CONTRACTS.md#g25) | [V12](#v12) · [V13](#v13) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g26"></a>[G26 Responses·댓글·답글·정렬·수정·삭제](MEDIUM_PARITY/CONTRACTS.md#g26) | [V20](#v20) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g27"></a>[G27 문구 선택·Highlight·인용 Responses](MEDIUM_PARITY/CONTRACTS.md#g27) | [V17](#v17) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g28"></a>[G28 작성자 프로필·팔로우·팔로잉·이메일 구독](MEDIUM_PARITY/CONTRACTS.md#g28) | [V14](#v14) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g29"></a>[G29 Mute·Block·신고·응답 관리](MEDIUM_PARITY/CONTRACTS.md#g29) | [V15](#v15) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g30"></a>[G30 토픽·Publication·큐레이션 탐색](MEDIUM_PARITY/CONTRACTS.md#g30) | [V03](#v03) · [V02](#v02) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g31"></a>[G31 추천 관리·관심사·읽기 이력](MEDIUM_PARITY/CONTRACTS.md#g31) | [V11](#v11) · [V12](#v12) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g32"></a>[G32 공개 목록·Saved lists·목록 반응](MEDIUM_PARITY/CONTRACTS.md#g32) | [V04](#v04) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g33"></a>[G33 내 목록 메모·정렬·공개 범위·편집·삭제](MEDIUM_PARITY/CONTRACTS.md#g33) | [V25](#v25) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g34"></a>[G34 Digest·날짜 필터·Library 연결](MEDIUM_PARITY/CONTRACTS.md#g34) | [V27](#v27) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g35"></a>[G35 목록 다운로드·오프라인 화면 상태](MEDIUM_PARITY/CONTRACTS.md#g35) | [V26](#v26) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g36"></a>[G36 글쓰기 편집기·텍스트 서식](MEDIUM_PARITY/CONTRACTS.md#g36) | [V07](#v07) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g37"></a>[G37 글쓰기 이미지·Camera·Library·Unsplash](MEDIUM_PARITY/CONTRACTS.md#g37) | [V08](#v08) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g38"></a>[G38 초안 저장·재개·멘션](MEDIUM_PARITY/CONTRACTS.md#g38) | [V09](#v09) · [V10](#v10) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g39"></a>[G39 토픽 최대 5개·발행 미리보기·Publish](MEDIUM_PARITY/CONTRACTS.md#g39) | [V06](#v06) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g40"></a>[G40 가입·로그인·이메일 코드·세션·로그아웃](MEDIUM_PARITY/CONTRACTS.md#g40) | [V29](#v29) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g41"></a>[G41 온보딩 관심사·추천 팔로우·알림 안내](MEDIUM_PARITY/CONTRACTS.md#g41) | [V30](#v30) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g42"></a>[G42 프로필 사진·대명사·소개·Stories 필터](MEDIUM_PARITY/CONTRACTS.md#g42) | [V32](#v32) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g43"></a>[G43 Story stats·월간·누적·정렬](MEDIUM_PARITY/CONTRACTS.md#g43) | [V34](#v34) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g44"></a>[G44 알림 목록·Push·Email·Tailored 설정](MEDIUM_PARITY/CONTRACTS.md#g44) | [V05](#v05) · [V28](#v28) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g45"></a>[G45 Listen·미니/확장 플레이어·재생 제어](MEDIUM_PARITY/CONTRACTS.md#g45) | [V18](#v18) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g46"></a>[G46 재생 속도·음성·검색·AirPlay·큐 상태](MEDIUM_PARITY/CONTRACTS.md#g46) | [V19](#v19) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g47"></a>[G47 기사·인용·작가·토픽·목록 공유와 이미지 저장](MEDIUM_PARITY/CONTRACTS.md#g47) | [V23](#v23) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g48"></a>[G48 Member·Friend 구독 화면과 mock 권한](MEDIUM_PARITY/CONTRACTS.md#g48) | [V31](#v31) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g49"></a>[G49 남은 설정·앱 아이콘·외부 안내](MEDIUM_PARITY/CONTRACTS.md#g49) | [V33](#v33) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g50"></a>[G50 검색 추가 결과·홈/탭/진입 경로 마감](MEDIUM_PARITY/CONTRACTS.md#g50) | [V01](#v01) · [V02](#v02) | 해당 V의 실제 코드/기존 검사·사용자 수용 연결. 모의·외부 미연결·미지원·원본 미확인은 해당 경계를 그대로 적용 |
| <a id="g51"></a>[G51 기능 간 상태·실패·계정 격리 통합 검증](MEDIUM_PARITY/CONTRACTS.md#g51) | [C70](#c70) | 로컬 상태/계정/명령 수명과 기존 검사 근거. 실서버 권한·영속 동기화 미연결 |
| <a id="g52"></a>[G52 iOS·Android·접근성·성능·native 경계 검증](MEDIUM_PARITY/CONTRACTS.md#g52) | [C03](#c03) · [C71](#c71) · [Q07](#q07) | 사용자 확정 Android 에뮬레이터 기준으로 종료. 일부 화면 OS2.0 실행 이력은 C03에 연결. 대표7화면 전체 OS확대·전체 접근성/성능·실제 iOS/휴대폰은 미확인 이력이며 필수 대기 아님 |
| <a id="g53"></a>[G53 63개 흐름 최종 대조·누락 해소·백엔드 인계](MEDIUM_PARITY/CONTRACTS.md#g53) | [C72](#c72) · [Q10](#q10) · [H11](#h11) | 전수 연결·항목별 판정/인계 종료. 원래 200개 현재 캡처/overlay·전수 동일성은 미입증. 7단계 설계 미착수 |

<a id="backlog"></a>

## D/Q/V 59개 최신 잔여 판정

원래 재현·작업·종료 조건은 [기존 Backlog](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md>)에 보존한다. D의 로컬 결함 보완과 V의 시각 동일성은 별도다. 아래 ‘정리 완료’가 원본 정책 해결 또는 외부 구현을 뜻하지 않는다.

| 항목 | 현재 판정 |
| --- | --- |
| <a id="d01"></a>[D01 발행 본문 링크의 늦은 실패 차단](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#d01>) | 보완 구현 확인: DocumentReader의 문서/공급부/포커스·최신 요청 수명 보호. Parity4 및 읽기 회귀 근거; 과거 늦은 실패 재현은 수정 전 이력. |
| <a id="d02"></a>[D02 음소거의 기존/새 Digest 적용 정책과 연결](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#d02>) | 보완 구현 확인: 기존/새 Digest 조회에 최신 Mute/Block 정책 적용. 실제 발송/원본 캐시 정책은 미확인. |
| <a id="d03"></a>[D03 발행 글의 읽기 이력·Viewed·읽기 설정 연결](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#d03>) | 보완 구현 확인: 발행 글 이력·Viewed·표시 설정 연결. Q11 후속에서 Highlight·인용 응답·무음 Listen도 연결. |
| <a id="d04"></a>[D04 미확인 읽기 시간 0의 표시 통일](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#d04>) | 보완 구현 확인: 읽기 시간 0을 미확인 값으로 구분해 표시. 전문이 없는 글의 실제 읽기 시간은 미확인. |
| <a id="d05"></a>[D05 일반 기사 읽기 이력의 ID 해석 누락](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#d05>) | 보완 구현 확인: 일반/정책/발행 기사 ID를 카탈로그에서 해석해 읽기 이력과 연결. |
| <a id="d06"></a>[D06 동적 mock 사용자의 관계 관리 목록 누락](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#d06>) | 보완 구현 확인: 동적 mock A/B 사용자 관계 관리 연결. 실제 사용자/서버 관계는 미연결. |
| <a id="d07"></a>[D07 발행 글이 들어간 목록의 mock 다운로드](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#d07>) | 보완 구현 확인: 발행 문서·사진을 포함한 목록의 메모리 다운로드 지원. 파일 다운로드/재시작 복원은 미지원. |
| <a id="d08"></a>[D08 Medium Rules의 원본 기사 요소·기능 연결](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#d08>) | 연결 보완 확인: 정책 발췌·작성자·반응/응답·저장/공유·무음 Listen. 전문/현재 정책 미확인, 개인 본문 선택/Highlight 저장은 미지원. |
| <a id="d09"></a>[D09 native 본문 안 선택·하이라이트 UX](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#d09>) | 보완 구현 확인: 본문 내 선택 손잡이·Copy/Highlight/Respond/Share·바깥 해제. 다중 문단 picker/읽기 사진 경계 제한, Android 기본 메뉴 제거 보류. |
| <a id="d10"></a>[D10 브랜드 시작 화면과 앱 자산 차이](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#d10>) | 대체 자산 및 시작 UI 적용·사용자 수용으로 보정 종료. Medium 원본 시작 자산과 동일하지 않음; 실제 iOS 미실행은 필수 대기 아님. |
| <a id="d11"></a>[D11 Digest·내 목록 카드의 회원용 글 표시](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#d11>) | 보완 구현 확인: Digest·내 목록 카드의 회원용 글 표시. 실제 구독 자격/서버 paywall은 미연결. |
| <a id="d12"></a>[D12 발행 글 카드의 게시 경과 시간](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#d12>) | 보완 구현 확인: 발행 카드에 현재 발행 시각의 상대 시간 적용. 원본의 전체 시간·시차 정책은 미확인. |
| <a id="d13"></a>[D13 내 목록 상세의 상대 시간·글 개수 표시](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#d13>) | 보완 구현 확인: 내 목록 상대 시간·글 수 표시. 빈 상세와 Library 빈 카드를 구분; 원본 전체 시간 정책 미확인. |
| <a id="q01"></a>[Q01 동일 비교 조건 고정](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#q01>) | 기준 정리 완료: 원본 ID/조건/콘텐츠/수명과 기존 비교 기록 연결. 현재 200개 FE 상태의 신규 동일 조건 캡처는 없으며 원본과 1:1 픽셀 일치 판정 아님. |
| <a id="q02"></a>[Q02 공통 서체·아이콘·자산·레이아웃 계약 보정](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#q02>) | 2단계 보정·차이 정리 종료 및 Android 사용자 수용 유지. 원본 서체 0개·102 crop 자산·인용선/미수록 자산 차이 기록. 아이콘은 확정되어 잔여에서 제외. |
| <a id="q03"></a>[Q03 원본 미확인 263개 묶음의 개별 종료 판정](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#q03>) | 263개 U 질문 묶음 모두 재분류·연결 완료. 남은 원본 정책 질문은 미확인 유지; 현재 mock 정책/자동 검사로 원본의 답을 확정하지 않음. |
| <a id="q04"></a>[Q04 초안 사용자 삭제의 범위 판정](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#q04>) | 미지원 유지: 초안 사용자 삭제 명령/버튼 없음. 발행 후 자동 초안 제거와 구분. 원본 삭제 동작 미확인, 7단계 범위 결정 입력. |
| <a id="q05"></a>[Q05 읽기 이력 삭제 후 Undo의 범위 판정](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#q05>) | 미지원 유지: 읽기 이력 삭제 후 Undo 없음. 확인/취소만 지원; 원본 Undo 근거 미확인. 편집기 Undo와 목록 Remove Undo는 별개. |
| <a id="q06"></a>[Q06 이미지 경계를 넘는 편집 선택](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#q06>) | 편집기 구현·사용자 통과: 명시적 Select across photos 모드. 일반 모드와 동일 조작은 아니며 읽기의 사진/구분선 경계 선택은 미지원. |
| <a id="q07"></a>[Q07 실제 iOS/Android 기기 검증](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#q07>) | 사용자 확정 Android 에뮬레이터 기준으로 종료. 실제 iOS/휴대폰 미실행 이력만 유지하고 필수 대기/반복 검사에서 제외. |
| <a id="q08"></a>[Q08 실제 외부 서비스와 mock 경계](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#q08>) | 실제 구현·모의·외부 미연결 경계 기록 완료. 서버/DB/OAuth/발송/업로드/결제/TTS/영속 캐시는 미구현; 실제 OS 어댑터와 구분. |
| <a id="q09"></a>[Q09 Goal53 세 중간 증거 문구의 최종 판정](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#q09>) | 기존 Goal53 중간 증거 문구의 최종 판정 연결 완료. 과거 실행·현재 코드·현존하지 않는 캡처를 구분하고 오래된 증거를 새 실행으로 승격하지 않음. |
| <a id="q10"></a>[Q10 보완 구현 뒤 전수 종료 판정](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#q10>) | 6단계 전수 판정 작업 완료: S200/F63/T273/R1395/U263/C72/G53 및 D/Q/V59 모두 연결. 미지원/차이/미확인 잔존을 포함한 감사 종료이며 전체 동일성 통과 아님. |
| <a id="q11"></a>[Q11 발행 글과 일반 기사의 읽기 기능 적용 범위](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#q11>) | 일반·발행 글의 표시 설정/이력/반응/저장·Highlight/인용 응답/무음 Listen 연결. 정책 발췌 개인 선택과 읽기 사진 경계는 미지원, 실제 음성은 없음. |
| <a id="q12"></a>[Q12 원본에 없는 자체 추가 UI의 처리](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#q12>) | 자체 UI·사용자 지정 차이 기록 완료 및 현 Android 수용. 하트/사진/도구 아이콘·Save to 목록 선 제거·모의 안내/추가 진입 유지; 원본과 동일하다고 주장하지 않음. |
| [V01 홈](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v01>) | 현 구현/근거 연결·Android 사용자 수용. 피드 탭·빈 Featured·알림 점·기사/작성/추천 이동이 로컬 카탈로그와 연결됨. 한계: 추천·개인화·페이지 데이터는 fixture; 원본 시점별 기사·집계·스크롤과 현재 상태의 일치는 별도 미확인. [코드/검사](#v01) |
| [V02 탐색·검색](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v02>) | 현 구현/근거 연결·Android 사용자 수용. Stories/People/Publications/Topics/Lists 검색과 빈 결과·유형별 목적지 연결. 한계: 검색 정렬·카테고리 계층은 자체 정책; 일부만 캡처된 Staff Pick은 안내로 처리하고 본문을 생성하지 않음. [코드/검사](#v02) |
| [V03 토픽·큐레이션 미리보기](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v03>) | 현 구현/근거 연결·Android 사용자 수용. 토픽 Follow/해제·관련 칩·추천 기사·curated list 이동. 한계: 토픽 집계·연관·추천은 보관 fixture/자체 정책, 실제 추천 서비스 미연결. [코드/검사](#v03) |
| [V04 공개 목록](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v04>) | 현 구현/근거 연결·Android 사용자 수용. 공개 목록 저장·반응·응답·소유자/글 이동·비공개/삭제 접근 철회. 한계: 목록/기사 저장과 반응은 서로 다른 메모리 자원; 타 계정 서버 권한·업데이트 알림 미연결. [코드/검사](#v04) |
| [V05 알림](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v05>) | 현 구현/근거 연결·Android 사용자 수용. 알림 대상 해석·읽음·Follow·닫힌/차단된 대상 오류·복귀. 한계: 알림 목록은 fixture; 녹색선의 원본 의미·실제 이벤트 전달 미확인. [코드/검사](#v05) |
| [V06 발행·토픽](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v06>) | 현 구현/근거 연결·Android 사용자 수용. Topics 최대 5개·취소/Save·Publication 선택·Unlisted·미리보기·모의 발행. 한계: 실제 Publication 심사/제출·공개 URL·서버 발행 없음; 유효성·멱등성은 현재 mock 계약. [코드/검사](#v06) |
| [V07 편집기 서식](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v07>) | 현 구현/근거 연결·Android 사용자 수용. 리치텍스트·한글 조합·서식·커서·Undo/Redo·명시적 사진 연속 선택 모드. 한계: 인용선 18dp·사진 선택 모드 여백/모드 전환 재선택 차이; 원본의 사진 경계 선택 방식은 미수록. [코드/검사](#v07) |
| [V08 편집기 이미지](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v08>) | 현 구현/근거 연결·Android 사용자 수용. Camera/Library 기기 선택·로컬 이미지 수명, Unsplash 형식 fixture 검색/삽입/삭제. 한계: 서버 업로드/Unsplash API 없음; 보관 이미지 7개+기존 예시 4개, 가려진 원본 2카드 미확보. [코드/검사](#v08) |
| [V09 초안·작성 메뉴](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v09>) | 현 구현/근거 연결·Android 사용자 수용. 자동 저장·재시도·Close·초안 목록/재개·모의 발행 후 초안 제거. 한계: 메모리 source 수명; 프로세스 재실행 복원·동기화 없음. 사용자가 기존 초안을 삭제하는 명령은 미지원(Q04). [코드/검사](#v09) |
| [V10 멘션](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v10>) | 현 구현/근거 연결·Android 사용자 수용. @ 검색·동명이인 핸들·대상 ID 삽입·멘션 프로필 이동. 한계: 후보는 fixture; 실제 사용자 검색·알림 전송 없음. 멘션 삽입 중 Undo/Redo 숨김/복귀 보정. [코드/검사](#v10) |
| [V11 추천 관리](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v11>) | 현 구현/근거 연결·Android 사용자 수용. Suggestions/Following/Muted/Reading history·필터·동적 A/B 사용자 관리 연결. 한계: 추천 알고리즘·개인화 영속성 없음. 별도 원본 시점의 계정 상태를 한 세션 결과로 합치지 않음. [코드/검사](#v11) |
| [V12 읽기 이력](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v12>) | 현 구현/근거 연결·Android 사용자 수용. 일반·발행·정책 글 이력/Viewed·개별/전체 삭제·확인/취소. 한계: 이력 삭제 후 Undo는 미지원이며 원본 실행 근거도 없음(Q05); 보존 기간/기기 동기화 미정. [코드/검사](#v12) |
| [V13 기사 읽기·반응](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v13>) | 현 구현/근거 연결·Android 사용자 수용. 본문·반응·작성자·관련글·응답 미리보기·공유·읽기 도구 연결. 한계: 일부 기사는 전체 본문 미수록 안내만 제공. 누적 반응 모델은 유지하고 하트 모양은 사용자 확정; 서버 집계 없음. [코드/검사](#v13) |
| [V14 작성자·관계](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v14>) | 현 구현/근거 연결·Android 사용자 수용. 공개 프로필·Follow/Unfollow·이메일 옵션·관계 목록. 한계: 원본 미수록 followers 명단·집계/배지 정책은 자체 범위; 실제 이메일 구독·서버 관계 없음. [코드/검사](#v14) |
| [V15 음소거·차단·신고](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v15>) | 현 구현/근거 연결·Android 사용자 수용. Mute/Block/Report·해제·차단 대상 접근 제한·신고 실패/중복 보호. 한계: 앱 메모리 정책만 적용; 원본 차단 캡처의 글 잔존과 구현 접근 제한 차이, 실제 신고 접수/제재 없음. [코드/검사](#v15) |
| [V16 읽기 설정](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v16>) | 현 구현/근거 연결·Android 사용자 수용. 앱 테마와 별도 reader 테마·80~200%·서체 선택·타인 강조 설정. 한계: 선택 옵션/80~200 경계는 자체 정책, 원본 실제 서체 파일 0개. 기사 확대와 OS 확대 구분. [코드/검사](#v16) |
| [V17 본문 선택·하이라이트](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v17>) | 현 구현/근거 연결·Android 사용자 수용. 본문 내 선택 손잡이·Copy/Highlight/Respond/Share·바깥 터치 해제·발행 글 강조. 한계: 다중 문단은 별도 picker; 읽기 사진/구분선 경계는 미지원. Android 기본 선택 메뉴 제거 보류; 정확 앵커 동일성 미확인. [코드/검사](#v17) |
| [V18 오디오 플레이어](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v18>) | 현 구현/근거 연결·Android 사용자 수용. 일반·정책·발행 글의 무음 Listen·미니/확장·seek·일시정지·닫기. 한계: silent-mock; 실제 TTS/음원·백그라운드/오프라인 재생 없음, 이전/다음 큐 버튼 비활성. [코드/검사](#v18) |
| [V19 오디오 속도·음성](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v19>) | 현 구현/근거 연결·Android 사용자 수용. 속도·WPM·음성 목록/검색·임시 선택·Done/취소, 기사 이동·추천 줄이기·음소거 확인·신고창 연결. 한계: 속도/음성 선택은 무음 mock 메타데이터; 기사 이동·추천·음소거·신고는 별도 로컬/모의 기능. 실제 발화/번역·AirPlay·재생 큐 미지원, WPM 산식은 자체 비교값. [코드/검사](#v19) |
| [V20 응답·답글](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v20>) | 현 구현/근거 연결·Android 사용자 수용. 응답/인용·답글·수정/삭제·정렬·숨김/닫힘·수명/권한 보호. 한계: source 메모리 저장·자체 깊이/정렬/집계; 실제 타 사용자 조회·서버 소유권 검증·알림 없음. [코드/검사](#v20) |
| [V21 정책 기사](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v21>) | 현 구현/근거 연결·Android 사용자 수용. 응답→정책 기사·작성자/반응/Listen/공유·원래 화면 복귀. 한계: 보관 발췌·원본 강조 표시·공식 링크만 제공. 전문·현재 정책·실제 집계 미확인; PolicyArticle의 정적 Text에는 개인 구절 선택/Highlight 저장 경로가 없음. [코드/검사](#v21) |
| [V22 기사 저장](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v22>) | 현 구현/근거 연결·Android 사용자 수용. Save to 복수 목록 선택·Done 확정·새 목록·취소/실패 복구. 한계: 사용자 결정대로 목록 사이 구분선만 제거, 헤더/Create new list 구분선 유지; 실제 서버 저장 없음. [코드/검사](#v22) |
| [V23 공유](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v23>) | 현 구현/근거 연결·Android 사용자 수용. 실제 Clipboard·OS Share 호출·카드 PNG capture·사진 보관함 저장 adapter. 한계: OS 복귀 returned는 전달 완료 증거가 아님. 공유 URL은 kostolany.invalid 모의 주소이며 Friend 링크도 실제 발급하지 않음. 파일 이미지 저장과 목록 메모리 다운로드는 다름. [코드/검사](#v23) |
| [V24 Library·목록 카드](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v24>) | 현 구현/근거 연결·Android 사용자 수용. Your/Saved lists·Digest·Highlighted·Reading history·빈/저장/다크 카드. 한계: 목록/강조/다운로드는 메모리 상태; 원본 계정·집계·콘텐츠 snapshot과 현재 사용자 데이터는 다름. [코드/검사](#v24) |
| [V25 내 목록·편집](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v25>) | 현 구현/근거 연결·Android 사용자 수용. 목록 생성/편집/메모·드래그/접근성 순서 이동·취소/Done·비공개·삭제·Remove/Undo. 한계: 자체 소유권/충돌/시간 정책; 기본 Reading list 삭제 제한. 실제 공유/다른 기기 정합성 미연결. [코드/검사](#v25) |
| [V26 다운로드](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v26>) | 현 구현/근거 연결·Android 사용자 수용. 일반+발행 문서/사진의 메모리 사본·진행/완료/취소/실패·철회·제거. 한계: 파일 Downloads 저장·디스크 영속화·실제 네트워크 단절 보장 없음. 앱 재시작 보존도 미지원. [코드/검사](#v26) |
| [V27 Digest](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v27>) | 현 구현/근거 연결·Android 사용자 수용. 최근 10호 날짜 초안/Done·기사/작성자/반응·설정 이동·Mute 필터. 한계: fixture 호/날짜·자체 필터 정책; 실제 배포/이메일 Digest 생성·전송 없음. [코드/검사](#v27) |
| [V28 Digest·Push 설정](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v28>) | 현 구현/근거 연결·Android 사용자 수용. Push/Email/Digest 선호·옵션 저장/복원·OS 알림 권한 adapter. 한계: OS 권한과 원격 토큰 등록/푸시 전송은 별개; 실제 메일/Push 미연결, 원본 잘린 하단 항목 미확인. [코드/검사](#v28) |
| [V29 인증·로그아웃](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v29>) | 현 구현/근거 연결·Android 사용자 수용. 소셜 모의 로그인 A/B·이메일/코드·오류/재전송·로그아웃/취소/계정 격리. 한계: 실제 OAuth·메일 발송/소유권 확인·Supabase 세션·프로세스 재시작 복원 없음. [코드/검사](#v29) |
| [V30 온보딩·시작](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v30>) | 현 구현/근거 연결·Android 사용자 수용. 시작 자산/StartupBoundary·가입·관심사 최소 3개·추천 Follow·Skip/OS 권한·온보딩 재개. 한계: 시작은 대체 워드마크, 온보딩 저장은 mock; 캡처를 신규 가입 전용으로 단정하지 않음. [코드/검사](#v30) |
| [V31 멤버십](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v31>) | 현 구현/근거 연결·Android 사용자 수용. Member/Friend·월/연 선택·모의 확정/실패·혜택 자격·Welcome. 한계: 실제 스토어 구매/영수증/복원/갱신/해지 없음. 사용자 20번은 기간 선택/닫기이며 구매 Select 성공 증거가 아님. [코드/검사](#v31) |
| [V32 내 프로필·편집](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v32>) | 현 구현/근거 연결·Android 사용자 수용. 프로필 이름/bio·사진 기기 선택·대명사 최대 4개·부모 Save/Cancel·Stories/Lists/About. 한계: 사진은 로컬 URI/수명 관리, 업로드·서버 프로필 영속 저장 없음. 원본 OS 앨범과 Android picker 모습은 다름. [코드/검사](#v32) |
| [V33 설정·앱 아이콘](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v33>) | 현 구현/근거 연결·Android 사용자 수용. 설정 목적지·외부 링크·앱 테마·아이콘 선택과 native adapter. 한계: 계정/Facebook은 mock; 앱 아이콘 어댑터는 모듈 가용성에 따름. 현재 아이콘 모양 확정으로 수정 대상 아님. [코드/검사](#v33) |
| [V34 글 통계](<../TODO/FE_MEDIUM_PARITY_BACKLOG.md#v34>) | 현 구현/근거 연결·Android 사용자 수용. 월간/일자 그래프·Lifetime·Latest/Views/Reads·빈/미집계·글 이동. 한계: 통계 fixture/자체 UTC 정책; 실제 이벤트 수집·분석/정산 없음, 과거 11/2와 현재 0/미집계 차이 유지. [코드/검사](#v34) |

<a id="validation"></a>

## 이번 문서 검증과 변경 범위

검증 대상은 이 문서와 기존 요구/흐름/미확인/계약/실행 계획/인계 문서다. 원본 관찰·안정 ID·과거 실행 수치/결함 재현은 보존하고 현재 판정 열/문서 진입 상태를 갱신했다.

- S200/F63/T273/R1395/U263/C72/G53/DQV59의 개수·중복·연결 누락을 검사한다.
- 원본 PNG 해시 및 단계→S 대응, 102 자산의 원본 지정 영역 대조 결과는 위 표에 구분했다.
- 새 결과 문서의 모든 로컬 링크/anchor와 기존 문서에서 새로 추가/변경한 링크를 검사한다. 이미 없는 과거 캡처/도구를 신규 직접 증거 링크로 만들지 않는다.
- FE 제품 코드/테스트·원본·사용자 파일 변경 없음, 문서 diff의 공백 오류와 저장소 변경 범위를 확인한다.
- 새 Jest/typecheck/lint·에뮬레이터/네트워크 시험은 실행하지 않는다. 기존 통과 결과의 시점과 실패 이력을 보존한다.
- 검증 결과와 Git 전달은 아래 확정 기록에 남긴다. 7단계 설계는 미착수다.

### 최초 전수 감사의 문서 검사 결과 — a41fee9 (2026-11-27)

작업 위치는 `D:\git_repository\kostolany_project`다. 임시 파일을 만들지 않는 PowerShell here-string → `python -X utf8 -`로 현재 문서·보관 baseline·`git show HEAD:<path>`를 대조했다.

| 검사 | 결과 |
| --- | --- |
| S/F/T/U/C/G/V/D/Q/H anchor 개수 | 200/63/273/263/72/53/34/13/12/11; 중복·누락 0 |
| R 요구와 현재 판정 | 1,395개 모두 유일·연결됨. S별 현재 판정 200개 |
| 기존 요구/전이 보존 | R의 원본/기존 계약 열 및 T의 원본 화면/변화 열 변경 0 |
| 원본 미확인 보존 | U263 질문 묶음 원문 변경 0. 부분 확정/나머지 질문을 구분 |
| 계약/잔여 | G53 현재 연결 53개, D/Q/V59 현재 판정 59개 |
| 새 결과 전체·기존 문서 추가/변경 로컬 링크 | 15,162회 검사, 파일/anchor 오류 0 |
| 문서 범위 | Markdown 27개. FE 제품 코드/테스트·원본/자산·검사 데이터·환경 파일 변경 0 |
| 기존 제품 검사 | 재실행하지 않음. 위 과거 통과/timeout/후속 관련 검사 기록 보존 |

`git diff --check` 및 커밋 전 `git diff --cached --check`는 공백 오류0으로 통과했다. staged 27개가 모두 Markdown이고 제품 파일 변경·unstaged 변경이 없음을 확인했다. 누락된 과거 직접 캡처10개 및 보관 입력4개는 위 근거 한계로 남기며 새 증거로 계산하지 않는다. 사용자 추가 검사 요청은 없고 7단계 설계는 미착수다. 커밋·Push의 실제 해시는 Git 이력과 작업 완료 응답으로 전달한다.

<a id="review-corrections-20261127"></a>

## 후속 검토 — 문서 판정 3건 정정

최초 감사 커밋 `a41fee9`에 대한 재검토에서 발견한 분류/근거 누락을 정정했다. 원본 관찰·안정 ID·기존 사용자 통과·제품 구현은 보존했다. 아래는 문서 수정이며 새 기능 구현이나 OS 실행 결과가 아니다.

| 정정 대상 | 반영한 판정 | 근거 |
| --- | --- | --- |
| S113 OS 사진 선택기 | 사진 선택 어댑터의 호출/반환과 OS 제공 Collections·하단 옵션을 분리했다. 후자의 원본 iOS/현재 Android 대응·개별 실행 근거는 미확인으로 유지 | [S113 세부 요구](MEDIUM_PARITY/REQUIREMENTS_05.md#s113) · [profilePhotoPicker](../FE/src/features/profile/profilePhotoPicker.ts) · [pickLocalImage](../FE/src/shared/media/pickLocalImage.ts) |
| S003 및 확장 플레이어 메뉴 | View story는 로컬 이동, Show less는 추천 선호, Mute는 음소거 확인, Report는 모의 신고로 구분했다. S055/S141/S160/S192의 공유·더보기 8행도 같은 일괄 분류를 정정했다. 속도/음성 메타데이터·AirPlay 미지원과 섞지 않음 | [S003 세부 요구](MEDIUM_PARITY/REQUIREMENTS_01.md#s003) · [ListeningMenu](../FE/src/features/listening/ListeningMenu.tsx) · [ListeningPlayer](../FE/src/features/listening/ListeningPlayer.tsx) · [기존 메뉴 검사 코드](../FE/src/app/navigation/ListeningNavigation.test.tsx) |
| C03/G52 큰 글자 | 기존 별도 Android OS font_scale2.0의 홈/기사·표시 설정·사진 검색창·멘션 후보 확인을 연결했다. 기사만200%인 검사와 분리하고, 대표7화면 전체 OS확대·전체 접근성/성능·실제 iOS/휴대폰 미확인은 유지 | [C03의 실행 기록별 연결](#c03) · [G52](#g52) |

R 요구 17행의 현재 판정을 정정했다. 메뉴/사진 선택기의 상태·표시값, 개별 조작, 관련 V19/S003/S113/C03/G52, Backlog와 실행 계획에 같은 의미를 반영했다. 무음 재생·모의 URL/추천/음소거/신고·실제 외부 전송 부재는 여전히 명시한다. OS 위임 항목을 FE 자체 구현 완료로 처리하거나 원본 미확인을 새 통과로 올리지 않는다.

후속 문서 검증은 저장소 루트에서 파일을 만들지 않는 `python -X utf8 -`로 수행했다. 결과 문서 전체와 변경 문서의 추가/변경 링크 7,399건에서 파일/anchor 오류0, S200/F63/T273/R1395/U263/C72/G53 및 D/Q/V59의 누락/중복0을 확인했다. 정정된 R17행의 원본/기존 계약 열과 T 전이·U 질문 원문은 변경0이다. 최초 감사의 15,162건/27문서 검사는 당시 이력이며 이번 7,399건/9문서 검사와 합산하지 않는다.

이번 변경은 TODO의 Markdown9개뿐이며 `git diff --check`를 통과했다. FE 제품 코드/테스트·디자인/아이콘·원본/자산·검사 데이터·실행 환경은 보존했다. 제품 테스트/에뮬레이터를 새로 실행하지 않았고 기존 검증 근거를 연결했다. 사용자 추가 검사 요청과 iOS/실기기 필수 대기는 없으며, 7단계 설계는 계속 미착수다.
