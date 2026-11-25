# Parity 1~20 잔여 통합 검토·보완

**후속 Git 요청(2026-11-25):** 사용자가 이 결과의 커밋과 `origin/main` 푸시를 요청했다. 아래 커밋·push 미수행 경계는 최초 보완 작업 당시 기록이다. 기존 검증 결과와 잔여·21/22 미착수 판정은 유지한다.

기준일: 2026-11-25 KST. 시작 HEAD는 `c6898b5`이며 시작 작업 트리는 깨끗했다.
사용자가 승인한 범위는 잔여 분류, 기존 구조의 보완, 가능한 검증·자기 재검토와 관련 문서 갱신이다.
이 문서는 기존 결과를 대체하지 않고 현재 판정과 후속 종료 조건을 연결한다.
Parity21/22 착수, 새 의존성/native 모듈 도입, 실제 서비스 연결, 커밋·push·배포는 수행하지 않는다.

## 검토 기준과 범위

- AGENT 진입/프로젝트 범위/공통·UX 규칙과 FRONT_AGENT 7개 문서를 적용한다. 설명 주석은 한글 한 문장 한 줄이며 기존 app/features/shared, 상태 소유권, 요청 수명, UTF-16·본문 version 계약을 보존한다.
- MEDIUM_PARITY의 18개 파일은 목록·ID·배정·상호 연결을 검사하고, 수정과 직접 관련된 R/T/U/C·비교 조건·원본 관찰 절을 정독한다. 모든 요구사항을 실제 화면에서 새로 실행했다는 뜻은 아니다.
- 과거 결과의 미착수/미구현과 후속 결과를 대조한다. [1~8 재검토](FE_MEDIUM_PARITY_01_08_REVIEW.md), [9](FE_MEDIUM_PARITY_09_RESULT.md), [11](FE_MEDIUM_PARITY_11_RESULT.md), [16~20 재검토](FE_MEDIUM_PARITY_16_20_REVIEW.md)의 이전 증거를 이번 실행으로 재사용하지 않는다.
- 8081은 이번 시작 전 사용자의 요청으로 실행한 서버를 유지한다. ENV·medium 원본·기존 baseline/evidenceContext와 과거 해시는 덮어쓰지 않는다.
- tools/evidence/별도 검증 스크립트/캡처/로그/manifest 파일을 생성·복원하지 않는다. 명령 출력과 원본 이미지는 메모리에서 확인하고 결과만 이 문서에 기록한다.

### 목록 검사와 실제 원본 열람의 구분

- 실제 flows의 ANALYSIS 63개·PNG 273개·고유 화면200개를 baseline의 흐름/단계/화면과 대조했다. 미등록·원본 PNG/ANALYSIS 누락 경로·화면 담당 미배정0, 원본200개 PNG SHA-256 불일치0이다.
- REQUIREMENTS_01~08의 R1395개와 baseline의 R집합을 대조했다. 누락·중복0이며 아래 D/Q/V59개도 taskAssignments와 누락·중복0이다. 질문263개·C72개는 기존 담당 미배정0이며 관련 소비 계약을 참조했다. 이는 각 질문의 해소나 모든 C의 실제 실행 완료가 아니다.
- 실제 이미지 열람은 [F08 발행11단계](<../medium/flows/Home/Publishing a story/ANALYSIS.md>), [F09 서식5단계](<../medium/flows/Home/Publishing a story/Changing text format/ANALYSIS.md>), [F25 강조3단계](<../medium/flows/Home/Story detail/Highlighting a phrase/ANALYSIS.md>), [F29 구절 응답4단계](<../medium/flows/Home/Story detail/Responding to a phrase/ANALYSIS.md>)다. 해당 ANALYSIS 전체와 단계별 PNG를 읽었다.23단계의 중복2개를 제외한 고유21화면이며 전체200화면의 새 시각 검증이 아니다.
- F08의 입력/사진 목록·작가/스피너/발행 미리보기·Public 결과, F09의 인용선·목록 들여쓰기·중앙 구분선, F25/F29의 선택 핸들·기존 강조·인용 입력/결과를 직접 확인했다. 빈 글에서 사진을 먼저 넣는 입력 순서, 여러 문단에 걸친 실제 OS 선택, 서버 저장·발행 성공은 원본 정적 자료에서 관찰하지 못했다.
- PNG 물리 크기는1179×2556이며 보관된 논리 크기 메타데이터390×844와 구분한다. 새 crop/정규화 파일은 만들지 않았고 DPR·기기·OS를 추정으로 확정하지 않았다. 구현 렌더와의 현재 직접 비교는 브라우저 연결 제한으로 미실행이다.

### 잔여 근거를 읽는 순서

기존 상세 재현·코드 근거는 담당 결과를 따른다. 아래 표는 최신 분류를 덧붙이며 과거 결과의 완료 문구를 일괄 승인하지 않는다.

| 담당 | 기존 결과와 상세 근거 |
| --- | --- |
| 1~4 | [1 비교 기준](FE_MEDIUM_PARITY_01_RESULT.md) · [2 공통 UI](FE_MEDIUM_PARITY_02_RESULT.md) · [3 정책 기사](FE_MEDIUM_PARITY_03_RESULT.md) · [4 이력/설정](FE_MEDIUM_PARITY_04_RESULT.md) |
| 5~8 | [5 관계/추천](FE_MEDIUM_PARITY_05_RESULT.md) · [6 Digest](FE_MEDIUM_PARITY_06_RESULT.md) · [7 저장/목록](FE_MEDIUM_PARITY_07_RESULT.md) · [8 다운로드](FE_MEDIUM_PARITY_08_RESULT.md) |
| 9~12 | [9 작성](FE_MEDIUM_PARITY_09_RESULT.md) · [10 기사/응답](FE_MEDIUM_PARITY_10_RESULT.md) · [11 선택/강조](FE_MEDIUM_PARITY_11_RESULT.md) · [12 오디오](FE_MEDIUM_PARITY_12_RESULT.md) |
| 13~16 | [13 공유](FE_MEDIUM_PARITY_13_RESULT.md) · [14 인증](FE_MEDIUM_PARITY_14_RESULT.md) · [15 프로필](FE_MEDIUM_PARITY_15_RESULT.md) · [16 알림](FE_MEDIUM_PARITY_16_RESULT.md) |
| 17~20 | [17 탐색](FE_MEDIUM_PARITY_17_RESULT.md) · [18 시작/아이콘](FE_MEDIUM_PARITY_18_RESULT.md) · [19 멤버십](FE_MEDIUM_PARITY_19_RESULT.md) · [20 통계](FE_MEDIUM_PARITY_20_RESULT.md) |

## 현재 분류와 판정 방법

`해결`은 해당 코드 결함의 해결이며 화면 전체 동일성 완료와 다르다.
`구현 잔여`는 코드에 알려진 차이가 있는 경우이고 기기 대기로 바꾸지 않는다.
`원본 미확인`은 정적 자료에 동작/내용이 없는 경우다. 미확인 263개는 질문 묶음 수이며 결함 263개라는 뜻이 아니다.
`자산·시각 잔여`, `환경 차단`, `기기 대기`, `범위 제외`를 별도로 기록한다.

| 대상 ID | 현재 판정·코드/결과 근거 | 담당·종료 조건 |
| --- | --- | --- |
| D01 | 해결: 발행 링크의 문서/요청 세대 보호, DocumentReader/useExternalLink | 4. 기존 실패·재시도·늦은 응답 계약 유지 |
| D02 | 해결: Digest의 원본 ID와 현재 관계 표시 필터 분리 | 6. 과거 호/새 호/해제 회귀 유지 |
| D03 | 해결: 발행 글 이력·Viewed·읽기 설정 연결 | 4. 현재 reader의 소비 계약 유지 |
| D04 | 해결: 미확인 읽기 시간0 표시 제거 | 6/7. 양수·미확인 표시 구분 유지 |
| D05 | 해결: 일반 기사 이력 ID 해석 | 4. 목록→재열기 회귀 유지 |
| D06 | 해결: 동적 mock 사용자 관계 목록과 요청 수명 | 5. A→B→A·차단/해제 회귀 유지 |
| D07 | 해결: 발행 글을 포함한 메모리 다운로드·취소/철회 | 8. 디스크 offline/재실행 영속성과 구분 |
| D08 | 해결: Rules 헤더·도구·응답/기사 복귀 연결 | 3. 시각 잔여는 V21에 유지 |
| D09 | 구현 잔여: 본문 위 다중 문단 선택·정확 native 메뉴, 아래 대안표 참조 | 11. 범위 좌표·스크롤·터치·양 플랫폼 실행 검증까지 필요 |
| D10 | 부분 해결: StartupBoundary와 app.json splash 설정 존재; 원본 로고/아이콘과 차이 | 18 자산 판정,21 실제 cold start/런처 확인 |
| D11 | 해결: Digest/ListStoryCard/ListNoteSheet의 회원용 표시 | 6/7. 기사 memberOnly와 계정 등급 구분 유지 |
| D12 | 해결: 발행 카드 상대 시간과 노출 중 시계 | 15. native background 복귀는21과 검증 |
| D13 | 해결: 목록의 의미 있는 변경 시각·개수·메모·순서 | 7. 원본의 시각 의미는 별도 U 유지 |
| Q01 | 경로/계정/fixture 배정 있음; 200화면 동일 조건 실재현은 미완료 | 각 화면 담당/22. 실제 상태별 비교 후 종료 |
| Q02 | 대체 서체·SVG·사진·정확 배치 차이 | 2 및 각 V. 확보/적용/실렌더 비교를 각각 확인 |
| Q03 | 원본 미수록 질문의 개별 판정 잔여 | 각 U의 기존 담당. 근거 또는 자체 정책 결정을 원본 관찰과 구분 |
| Q04 | 초안 사용자 삭제는 원본 미확인 | 9. 발행 성공의 초안 제거를 삭제 UI 근거로 쓰지 않음 |
| Q05 | 이력 삭제 Undo는 원본 미확인 | 4. 목록 제거 Undo의 원본과 혼동하지 않음 |
| Q06 | 이미지 경계 연속 선택은 현재 미지원·범위 결정 필요 | 9. 단일 구간 계약 확대 여부와 native IME 검증을 별도로 결정 |
| Q07 | 실제 iOS/Android 검증 대기 | 21 및 소비자. SDK·개발 빌드·설치·실행·해당 기기 행동 확인 |
| Q08 | 실제 외부 서비스와 영속 offline 범위 제외 | 모든 묶음. TTS/AirPlay/결제/인증/발송/서버를 실행 대기로 세지 않음 |
| Q09 | 과거 증거 문구 판정은 해결; 오래된 잔여 표에는 최신 결과 연결 필요 | 아래 문서 정합성 보완. 시각 보정 완료와 분리 |
| Q10 | 전수 종료 미착수 | 22. 1~20 구현 잔여 및21 확인 후 전체 동일성 판단 |
| Q11 | 발행 다운로드/이력/설정 지원; 발행 Highlight·구절 인용·Listen 미지원 | 4/8/11/12. 아래 reader 표와 원본 근거/제품 범위 결정 유지 |
| Q12 | 자체 UI 처리 기준 있음; 전 소비 상태의 배치 검증 잔여 | 2 및 각 화면. mock/발췌 안내와 기능 접근을 보존해 비교 |
| V01 | 홈 mock 보완됨; 서체·배치·다크 독립 콘텐츠/원본 정책 잔여 | 17. 같은 fixture/테마 비교, 미수록 추천 근거 확보 |
| V02 | 탐색·검색 mock 보완됨; 검색 유형·순위·원본 자산 잔여 | 17. 같은 입력/결과/빈 상태·오류의 구분과 실렌더 비교 |
| V03 | 토픽·큐레이션 mock 보완됨; 계층·목록 순서·잘린 자료 잔여 | 17. 관찰 자료 확보와 실제 렌더 비교 |
| V04 | 공개 목록 접근/철회 보완됨; 미수록 기사·정확 배치 잔여 | 17. 없는 원문을 생성하지 않고 미수록 상태 유지 |
| V05 | 알림 경합은 c6898b5에서 해결; 원본 읽음/목적지/페이지·아바타 잔여 | 16. 원본 정책과 mock을 분리하고 화면 비교 |
| V06 | 토픽/발행 연결 구현; 원본 실행 정책·자산/화면 검증 잔여 | 9. 작성→토픽→발행→Stories 실제 조작 |
| V07 | 혼합 인용선·native 목록 내어쓰기·Android 혼합 구분선 구현 잔여 | 9. 아래 최소 구현 판단과 선택/IME 계약을 충족 |
| V08 | 사진 앞 입력의 문서 경계·저장 결함은 이번 해결; 원본 사진/credit·picker 실행 잔여 | 9. 구간 입력→저장→재개→발행 회귀 유지, OS picker는21 |
| V09 | 자동 저장·초안 재개 구현; 실제 웹 흐름·원본 미수록 분기 잔여 | 9. 메모리 초안과 재실행 영속성 구분 |
| V10 | 멘션 검색/삽입 구현; 두 후보 사진 미확보·실제 키보드 잔여 | 9. 실제 이름/핸들·커서 복귀 비교, 알림 발송 제외 |
| V11 | 추천 관리 mock 구현; 추천 기준/기본값·원본 자산 잔여 | 5. 근거 확인과 상태별 비교 |
| V12 | 이력/Viewed 구현; 조회 범위·Undo 미확인·시각 잔여 | 4. 삭제→재열기 연결 확인과 원본 근거 판정 |
| V13 | 메타데이터 구분자 해결; 미수록 본문·집계/fixture·서체 잔여 | 10. 본문을 추정 생성하지 않고 같은 상태 비교 |
| V14 | 작성자/관계 구현; 원본 기본값·프로필 자산/배치 잔여 | 5. 관계 전환·복귀와 원본 상태 대조 |
| V15 | 음소거/차단/신고 mock 구현; 실제 원본 효과·외부 신고 제외 | 5. 자체 정책과 미확인, 화면 차이 구분 |
| V16 | 읽기 설정 구현; 정확 서체/글자 크기/OS 배치 잔여 | 4. 설정 소비 및 실제 큰 글자·플랫폼 확인 |
| V17 | 한 문단 선택·강조 유지 구현; 본문 연속 선택·native 메뉴 잔여 | 11. D09와 같은 종료 조건, Library/응답 회귀 |
| V18 | 모의 오디오 구현; 화면별 시간 fixture·배치·실렌더 잔여 | 12. 정상 기본280초를 원본 숫자로 강제 고정하지 않음 |
| V19 | 속도·음성 선택 구현; 원본 취소/영속 정책·정확 배치 잔여 | 12. Emma→Hans/Done/재진입의 mock 계약과 구분 |
| V20 | 응답/답글 구현; Sunil/Navj 사진·미수록 답글·집계·배치 잔여 | 10. 없는 본문/정확 수를 만들지 않고 비교 |
| V21 | 정책 도구/복귀·로고/아바타 보완; 전문/버전·서체/간격 잔여 | 3. 보관 발췌와 공식 외부 링크를 구분 |
| V22 | 저장 대상/목록 연결 구현; 정확 시트/배치·원본 미수록 정책 잔여 | 7. 확정/취소/목록 생성 후 복귀 비교 |
| V23 | 공유 수명/웹 복사 보완; 카드 배경/서체·실제 파일 저장/OS 잔여 | 13. 다운로드 요청과 디스크 완료를 구분 |
| V24 | Library/카드 구현; 이번 목록 테스트 시간 제어 보완, 자산·다크·정확 배치 잔여 | 7. 동일 계정/목록/스크롤로 비교 |
| V25 | 목록 편집/메모/드래그·Undo 구현; 원본 정책·실제 native 제스처 잔여 | 7. 실제 드래그/접근성·복귀 검증, 새 모델 도입 아님 |
| V26 | 메모리 다운로드 구현; 실렌더·원본 미수록 동작 잔여 | 8. 영속 파일/비행기 모드는 Q08 제외 |
| V27 | Digest 자산/비교 정수 보완; 원본 집계 시점·서체·정확 배치 잔여 | 6. 반올림 수치를 정확값으로 역산하지 않음 |
| V28 | 알림 설정 mock 구현; Daily 외 옵션/발송·잘린 행 미확인 | 16. 실제 전송 제외, OS 권한은21 |
| V29 | 인증 mock 구현; 원본 validation/세션·자산·기기 잔여 | 14. 실제 OAuth/인증 코드 발송 제외 |
| V30 | 온보딩 구현, 시작 구성은18 후속 해결; 추천/저장 정책·자산 잔여 | 14/18. native cold start는21 |
| V31 | 멤버십 mock 확정/수명 보완; 전체 혜택/연간 가격·OS 배치 잔여 | 19. 실제 결제 제외, 원본 근거/실렌더 구분 |
| V32 | 프로필 편집/시간 보완; 사진/집계·사진 제거/대명사 정책 미확인 | 15. 실제 사진/IME/접근성은21 |
| V33 | 시작 설정/아이콘 mock 보완; Medium 원본 자산·런처 사실 잔여 | 18. K 대체와 M 원본 구분, 실제 반영은21 |
| V34 | 통계 그래프/메뉴 보완; 다른 월/집계 정책·축/서체/OS 배치 잔여 | 20. 미집계 안내와 원본 콘텐츠 구분 |

<a id="editor-image-boundary"></a>

## 새 결함 수정: 사진을 먼저 삽입한 문서의 앞쪽 입력

재현: 빈 문서에 사진을 먼저 삽입하면 본문은 `\uFFFC\n`이다. 첫 빈 TextSection에 `before`를 입력한 결과 기존 mergeEditorSection은 `before\uFFFC\n`을 만들었다.
이미지 앞 줄바꿈 불변식이 깨져 validEditorDocument가 false이며 첫 구간도 `befor`까지만 잘렸다.
원인은 사진 앞 실제 구분자가 없는 빈 구간을 일반적인 텍스트 교체와 같게 취급한 것이다.
담당은9/V08·V09, C40/C41/C42/C45 및 문서 저장 계약이다. R-S137의 편집 상태·R-S139의 재개, T-F08-06~09·T-F10-03의 소비 흐름에 해당한다. 원본에 빈 글의 사진 우선 입력 동작이 관찰됐다는 주장은 아니다.

- [editorModel.ts](../FE/src/features/editor/editorModel.ts)의 mergeEditorSection에서 이미지 바로 앞의 빈 입력에 새 글을 넣을 때만 구조적 줄바꿈을 추가한다. 사용자가 입력한 마지막 빈 문단과 이미지 경계를 구분하고, 이미 경계가 있는 반복 편집에는 추가하지 않는다.
- [editorImages.test.ts](../FE/src/features/editor/editorImages.test.ts)의 회귀2건은 한글/이모지/여러 문단·마지막 빈 문단, 인용/굵게·커서·다른 이미지·반복 입력/지우기·삭제 후 문서 유효성을 확인한다.
- [DraftsNavigation.test.tsx](../FE/src/app/navigation/DraftsNavigation.test.tsx)의 회귀1건은 실제 SessionNavigation으로 사진 우선 삽입→앞뒤 입력→자동 저장→Drafts 재개→발행→발행 글 열기를 실행한다. 수정 전 Save failed를 재현했고 수정 후 본문/이미지 offset과 발행 후 초안 제거가 일치한다.
- 문서 schemaVersion3, 선택/mark/mention의 UTF-16 기준, 이미지 자산, 저장소·계정 수명, Q06 이미지 경계 연속 선택의 미지원 범위를 변경하지 않았다. 기존 멘션·실패/재시도·A→B→A 회귀는 전체 검사에 포함한다.

<a id="native-residuals"></a>

## Parity9·11 최소 구현 판단과 구조 변경 경계

| 문제 | 현재 구조의 판단 | 다음 구현의 구체적 조건 |
| --- | --- | --- |
| 9 혼합 문단 인용선 | RichBody는 하나의 TextInput이며 quote-only 구간만 전체 인용선을 표시한다. 별도 Text의 측정값으로 선을 얹으면 실제 입력 줄바꿈/IME와의 일치를 보장하지 못한다 | 단일 입력의 실제 문단 fragment/측정값 또는 paragraph style adapter가 필요. selection/marks/mentions/image offset·초안 schemaVersion3 유지 |
| 9 목록 내어쓰기·Android 혼합 구분선 | 전체 입력 padding/textAlign 변경은 다른 문단까지 바꾼다. 문단별 입력 분할은 연속 선택·커서·IME 계약을 바꾼다 | native paragraph span/정렬을 적용할 최소 adapter 검토. 기존 문서 모델을 바꾸기 전 양 플랫폼 개발 빌드와 조합 입력 검증 조건 확보 |
| 11 본문 위 다중 문단 | NativePassageText는 단일 block을 받으며 NativePassagePicker는 별도 평문 선택 창이다. 기존 문단 renderer를 합치는 것만으로 이미지/문단 간격/anchor와 정확 메뉴를 모두 해결할 수 없다 | 읽기 전용 연속 구간 renderer 또는 native 선택 view의 범위를 결정. 기존 Passage의 articleId/version/start/end/text를 그대로 사용하고 비선택 block 경계를 검증 |
| 11 메뉴 위치·배치 이동 | onSelectionChange는 start/end만 제공한다. 문단 measureInWindow를 구절의 실제 사각형으로 취급하거나 부모 밖 absolute 버튼을 두는 보정은 채택하지 않는다 | view가 문서 version·selection revision·UTF-16 범위·viewport 사각형을 전달하고 루트 overlay가 Safe Area·스크롤·취소·touch/접근성을 관리해야 함 |

현재 코드 근거는 [RichBody](../FE/src/features/editor/RichBody.tsx), [NativePassageText](../FE/src/features/highlights/NativePassageText.tsx), [NativePassagePicker](../FE/src/features/highlights/NativePassagePicker.tsx), [PassageReader](../FE/src/features/highlights/PassageReader.tsx)다. 위 adapter는 검토 대안이며 도입·동작 보장을 확정한 설계가 아니다.

선택지는 현재 대체 UX 유지, 연속 구간 renderer 확대, 작은 native adapter 도입이다.
마지막 안은 정확한 선택/문단 렌더를 다룰 수 있지만 Swift/Kotlin·Expo 개발 빌드·양 플랫폼 테스트가 추가된다.
WebView는 새 의존성과 입력/접근성/보안 경계 변경이 커서 이번에 도입하지 않는다.
현재 환경에서 검증할 수 없는 native 구현을 작성하고 완료로 처리하지 않는다. 위 차이는 기존9/11 소유의 **구현 잔여**다.

## Q11 reader별 현재 지원

| reader | Highlight·구절 응답 | Listen | 판정 |
| --- | --- | --- | --- |
| 일반 기사 | 지원, native UX는11 잔여 | 무음 mock 지원 | 실행과 원본 동일성을 구분 |
| 발행 글 본인/타인 Public/Unlisted | 미지원 | 미지원 | 11/12의 범위·원본 근거 또는 제품 결정 필요. 자동 신규 구현 안 함 |
| 정책 기사 S008 | 새 본문 선택 도구 미지원 | 무음 mock 지원 | 일반 기사와 지원이 같다고 가정하지 않음 |

발행 글의 이력·읽기 설정·메모리 다운로드 지원은 위 미지원과 별개다.
Q04 사용자 초안 삭제, Q05 이력 Undo, Q06 이미지 경계 연속 선택의 근거/범위 판정도 유지한다.

## 문서 정합성 보완

- ASSET_BASELINE의 과거 splash 설정 없음,14 결과의 S043 미구현은18 후속 보완과 현재 app.json으로 연결한다.
- OWN_UI_POLICY의 과거 D08 미해결 문장은3 후속 해결과 V21 시각 잔여로 연결한다.
- 기존 결과의 과거 수치/원문·comparisonBaseline의 codeInputs/evidenceContext를 새 코드의 검증 증거로 재작성하지 않는다.
- 요구사항 원문과 담당 묶음을 보존하고 현재 보완/잔여의 근거 링크만 추가한다.
- 기존 codeInputs557개의 SHA-256은 Git HEAD blob과 일치한다. Windows 작업 트리의 CRLF/LF 차이와 실제 수정을 구분한다. 편집기 보완 직후 LF 정규화 비교의 차이는3개였으며 이후 목록 테스트 시간 제어까지 포함한 최종 차이는4개다. 기존 manifest를 갱신하거나 과거 해시를 이번 실행 증거로 재사용하지 않는다.
- baseline 화면 currentEvidence의 과거 파일 참조10개는 현재 파일이 없다. 과거 실행 기록은 보존하되 현재 열람 가능한 증거로 다루지 않고, 사용자 지시에 따라 복원하지 않는다. 위 원본 경로 무결성 검사와 별개다.

## 이번 실행 결과

아래는 이번 실행이며 기존1788건 통과를 재사용하지 않는다. 테스트 파일/코드 수정 전에 baseline을 끝내고 이후 회귀→최종 검사 순서로 실행했다.

| 실행 | 결과 | 해석 |
| --- | --- | --- |
| 수정 전 `npm.cmd test -- --selectProjects iOS` | 161 suites / 894 tests 통과,599.914초, 실패/skip0 | 이전 TopicProvider/DirectoryScope act 경고 미재현. 원인 해결 판정은 아님 |
| 새 회귀3건만 iOS 실행, 구현 수정 전 | 2 suites의3 tests 실패·기존7건 제외,12.545초 | 문서 경계·마지막 빈 문단 손실 및 실제 navigation의 Save failed를 확인한 의도된 재현 |
| 수정 후 editorImages/DraftsNavigation 두 파일, 양 preset | 4 suites / 20 tests 통과,28.975초, 실패/skip0 | 새3건과 기존7건을 각 preset으로 실행. 실제 OS 화면/IME 증거 아님 |
| 제품 코드 보완 후 `npm.cmd run check` | typecheck/lint 통과;322 suites / 1794 tests 통과,1117.344초, 실패/skip0 | iOS/Android preset 전체. Android LibraryInteractions에서 VirtualizedList act 경고1건; 아래 테스트 시간 제어 보완 전 결과 |
| 목록 테스트 시간 제어 보완 후 `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd test -- --runTestsByPath src/features/bookmarks/LibraryInteractions.test.tsx` | typecheck/lint exit0;2 suites / 16 tests 통과,15.697초, 실패/skip/act 경고0 | 전체 검사 뒤 수정한 테스트만 양 preset으로 재실행. 전체1794건을 이 수정 뒤 다시 돌렸다는 뜻은 아님 |

회귀 재현 명령은 `npm.cmd test -- --selectProjects iOS --runTestsByPath src/features/editor/editorImages.test.ts src/app/navigation/DraftsNavigation.test.tsx --testNamePattern "사진을 먼저|사진 앞 빈|빈 글에 사진"`이다.
수정 후 관련 검사에서는 `--selectProjects`와 `--testNamePattern`을 빼고 같은 두 파일의 전체 테스트를 실행했다.

과거 TopicProvider/DirectoryScope 경고는 원인 미확정 상태로 묶음22에 유지한다. 발생 테스트/stack과 늦은 갱신·타이머 정리 조건을 재현해 확인할 때 닫으며, 이번 비재현만으로 해결 처리하지 않는다. 별도 AuthBoundary 경고의 기존14/22 담당과도 같은 원인으로 합치지 않는다.

이번 전체 실행의 새 경고는 `LibraryInteractions.test.tsx`에 귀속된 VirtualizedList의 `_updateCellsToRender`이며 installed RN의 기본50ms 지연 갱신 stack까지 확인했다. 해당 파일은 실제 시간을 사용하고 있었다. [테스트 시간 제어](../FE/src/features/bookmarks/LibraryInteractions.test.tsx)에 fake timer와 act 안의 pending timer 처리·finally 복원을 추가했다. 목록 제품 코드나 console 출력을 무시하는 처리는 변경하지 않았다. 수정 전 발생 테스트 파일/컴포넌트는 확인했지만 그 파일의 어느 개별 테스트인지는 최초 출력만으로 확정하지 않는다. 검증 보완 담당은7이며 이전 두 Provider 경고와 원인을 합치지 않는다.

### 구현 후 자기 재검토

- 수정3파일을 다시 읽고 첫 입력/빈 입력/반복 수정·삭제 시 경계 조건, UTF-16 커서/이미지 위치, 문단 서식과 다른 구간의 보존을 대조했다. 사진 앞 마지막 문단의 개행도 사용자 입력이므로 구조 경계와 분리해야 함을 회귀에 포함했다.
- navigation을 mock하지 않고 실제 SessionNavigation·화면 전환과 mock source의 저장/발행 문서를 함께 확인했다. fake timer·합성 입력과 실제 키보드/선택 핸들을 구분한다.
- 문서 재검토에서 첫 통합 초안의 C39 표기를 이번 소비 계약인 C40/C41/C42/C45로 바로잡았다. 오래된 splash 미구현/D08 연결 잔여에는 현재 결과를 연결했고 실제 native 완료로 올리지 않았다.
- 전체 검사 후의 새 경고는 목록 테스트의 시간 제어만 보완했다. 최종 제품 코드는 전체1794건 검사 때와 같고, 이후 수정한 테스트의 재실행 범위는 별도로 기록한다.
- 변경은 기존4개 코드/테스트 파일과 관련 Markdown으로 제한한다. 원본 PNG·ENV·의존성·기존 baseline JSON·장애 재현 기본값은 바꾸지 않는다.
- 추가/수정한 문서 링크·명시적 anchor의 대상 누락0, D/Q/V59개 누락·중복0, R1395개 원문 ID 집합 변화0을 확인했다. `git diff --check`는 통과했다.

## 실행 환경과 검증 한계

- Windows/PowerShell, Node24.18.0. 8081 기존 프로세스를 유지한다.
- 연결 가능한 브라우저 조작 도구가 없고 Codex document sessions도0개다. 앞선 브라우저 자동 열기는 실행 정책에서 차단됐으며 다른 실행 방식으로 우회하지 않는다.
- HTTP200/Metro 응답은 실제 화면 조작·console·메모리 렌더 비교의 증거가 아니다.
- adb/emulator/java/xcodebuild 명령, 기본 Android SDK/Android Studio 경로, FE/android·FE/ios가 없다. Windows에서 iOS 실제 빌드를 수행하지 않는다.
- 실제 OS 선택 핸들/IME/VoiceOver/TalkBack/큰 글자/사진 권한/공유/런처·cold start는 미실행이다. Jest의 iOS/Android preset과 구분한다.
- 실제 브라우저/OS 저장 경로를 실행하지 못했으므로 파일 저장 완료는 미검증이다.13의 다운로드 요청 기록을 디스크 저장 완료로 승격하지 않고 새 캡처·검증 파일도 만들지 않는다.

## 8081 후속 재현 순서

1. 기본 URL에서 mock A 로그인 후 Write로 진입한다. 제목을 입력하고 빈 본문에 로컬 fixture 사진을 먼저 삽입한다.
2. 사진 앞의 빈 본문에 한글·이모지·여러 문단을 입력하고 인용/목록 서식을 적용한다. 마지막 글자와 사진이 모두 유지되는지 본다.
3. 사진 뒤에도 입력하고 자동 저장을 기다린 뒤 닫기→Drafts 재개→Topics→발행→Stories 재열기를 확인한다.
4. 일반 기사에서 기존 강조가 있는 문단을 선택하고 범위를 변경한다. Highlight 저장/제거·인용 Respond·취소/기사 복귀를 확인한다.
5. 작은 폭/큰 글자에서 메뉴·본문·포커스와 실패 재시도를 확인한다. native의 별도 다중 문단 창과 메뉴 배치 차이는 해결된 것으로 처리하지 않는다.

이 순서는 허용된 브라우저/native 환경에서 수행할 후속 절차이며 이번 실제 실행 완료 기록이 아니다.

## 다음 작업과 종료 판단

1. 이번 등록/배정 점검·잔여 분류·사진 앞 입력 결함·목록 테스트 시간 제어·자기 재검토·관련 문서 갱신은 완료했다. 전체 Parity 동일성 완료는 아니다.
2. 원본 자산의 확보/사용 조건과 대체 허용 기준, Q06/Q11의 지원 범위를 구체적으로 결정한다.
3. 9/11 native adapter 또는 renderer 확대 범위와 실행 환경을 확정한 뒤 구현·검증한다.
4. 허용된 브라우저에서 미검증9~12 흐름을 실행하고, 별도21 요청으로 실제 native를 검증한다.
5. 마지막22는 전수 R/T/U/C·원본 차이·기기 결과를 대조한다. 이번 통합 목록 점검을22 완료로 기록하지 않는다.

자기 재검토와 독립 리뷰를 구분하며 이번 독립 리뷰는 수행하지 않는다.
