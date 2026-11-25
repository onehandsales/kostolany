# Parity 1~20 잔여 통합 검토·보완

**Git 요청(2026-11-26):** 사용자가 이번 Medium 흐름·RN 리치텍스트·읽기 기능 보완의 커밋과 푸시를 요청했다. 현재 변경을 `main`에 커밋해 `origin/main`으로 푸시하는 범위에 적용한다. 아래 커밋·push 미수행 문구는 구현 당시 기록이며 실제 기기 미검증과 원본 차이 판정은 유지한다.

**최신 구현(2026-11-26):** [Medium 원본 재대조와 연속 리치텍스트 입력](#medium-editor-followup). 아래 11월25일 문단별 입력과 추가 의존성 미도입 기록은 당시 이력이며 최신 구현·검증·제약은 이 후속 항목을 따른다.

**후속 flow 보완(2026-11-25, macOS):** [응답창 이동 오류·발행 글 읽기 기능과 현재 검증](#flow-followup). 홈·Explore 카드 응답창의 경로 이탈 처리를 보완하고 Q11의 발행 Highlight·구절 응답·무음 Listen을 연결한다. 아래 최초 검토의 Q11 미지원 판정과 Windows 환경 기록은 당시 이력이며, native9/11 구현 잔여·Q06·원본 자산 차이는 유지한다.

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

<a id="flow-followup"></a>

## Flow 연결 오류와 발행 글 읽기 도구 보완 — 2026-11-25

홈·Explore 카드의 `Responses → Medium policy → Listen → 플레이어 확장 → 더보기 → View story`에서 새 기사 위에 이전 응답 모달이 남았다. macOS Chrome 개발 웹에서 두 경로를 재현했고 Digest의 같은 경로는 정상임을 구분했다. 시작 HEAD는 `5d767b0`이며 작업 트리는 깨끗했다. 이번 사용자 요청의 로컬 보완 범위에서 수정하고 커밋·push·외부 서비스를 실행하지 않는다.

### 구현과 상태 수명

- [ResponsesPanel](../FE/src/features/responses/ResponsesPanel.tsx)은 실제 navigation context가 있는 경우 소유 화면의 `useIsFocused`와 기존 `active`를 함께 검사한다. 카드가 계속 마운트되어 있어도 화면 이탈 시 패널을 숨기고 소유자의 열림 상태를 닫는다. navigation이 없는 독립 컴포넌트에서는 기존 `active` 계약을 유지한다. 응답 저장소·개수·계정별 데이터의 수명은 변경하지 않는다.
- [WrittenStoryScreen](../FE/src/features/editor/WrittenStoryScreen.tsx)에 Highlight·구절 응답·선택 구절 공유·무음 Listen·미니 플레이어를 연결했다. 본인/타인 Public와 링크로 접근한 Unlisted에 적용한다. Unlisted 검색·목록 공개 정책은 확대하지 않는다.
- [publishedSelection](../FE/src/features/editor/publishedSelection.ts)은 실제 reader의 목록 번호·문단·UTF-16 좌표로 선택 문서를 만든다. 이미지와 구분선은 선택 불가 경계이며 그 경계를 넘는 인용은 거절한다. 기존 편집 문서 schemaVersion3와 저장 모델을 바꾸지 않는다.
- [DocumentReader](../FE/src/features/editor/DocumentReader.tsx)와 공통 강조 renderer는 선택 전후 굵게·기울임·링크·멘션 서식을 보존한다. 개인 강조 안의 링크는 강조 메뉴를 먼저 열고, 강조 제거 후 원래 링크 동작을 복원한다. 선택 입력 안에서는 외부 링크·멘션 이동을 실행하지 않는다.
- [HighlightProvider](../FE/src/features/highlights/HighlightProvider.tsx)는 저장 확정 직전에 발행 원문 존재·작성자·차단 상태·본문 버전·선택 문자열을 검증한다. 원문이 변경되거나 철회된 요청은 저장하지 않는다. 기존 개인 강조의 제거는 계속 허용한다.
- Library의 Highlighted에서 발행 글을 열 때 highlight ID를 전달해 위치 복원을 연결했다. 계정 변경·같은 계정 재로그인·화면 이탈에는 선택과 응답 초안을 폐기하고 계정별 확정 강조를 다시 조회한다.
- 듣기에는 발행 기사 ID와 작성자를 사용한다. `View story`는 현재 WrittenStory를 중복 push하지 않는다. 플레이어 공유는 발행 카탈로그의 제목·작성자·Public/Unlisted 상태를 사용하며, 작성자 차단·접근 조회 실패·원문 철회 때 플레이어를 닫는다. 실제 음성 출력은 추가하지 않는다.
- 듣기 메뉴의 발행 작성자 음소거/해제는 실제 moderation 저장소를 거쳐 추천 제외 판정에 반영한다. 음소거만으로 원문 접근을 차단하지 않으며 기존 정적 기사 정책도 유지한다.

### 검증 기록

- 수정 전 새 홈·Explore 회귀는 iOS/Android 4건 모두 기존 모달 잔존으로 실패했다. 첫 수정 후 정책 파일 전체 20건이 통과했다.
- 통합 검사 중 전역 route key를 이용한 초기 접근이 알림 응답 화면의 첫 진입을 닫는 문제를 발견했다. 해당 접근을 제거하고 실제 소유 화면 포커스를 사용했다. 수정 후 정책·알림·발행 읽기·강조 공급부 관련 8 suites/66 tests가 통과했다.
- 발행 읽기·기존 다운로드·계정별 저장·기존 듣기 관련 8 suites/42 tests가 통과했다. 이후 계정 전환·링크 강조 회귀를 추가했으며 최종 검사는 아래 별도로 기록한다.
- 전체 실행에서 기존 ReadingParityNavigation의 고정 `.parent` 스타일 검사가 추가된 강조 span 중첩 때문에 실패했다. 본문에서 실제 fontSize를 선언한 조상까지 탐색하도록 바꾸고 글꼴·크기·행간의 기대값은 유지했다. 수정 후 해당 파일의 양 preset 2 suites/10 tests가 통과했다.
- 첫 전체 `npm run check`는 타입/lint 통과, 326 suites 중323 통과·3 실패, 1814 tests 중1807 통과·7 실패였다. 실패7건은 위 스타일 검사2건, 이전 미지원 계약에 따라 Listen 부재를 기대한4건, 공개 목록의 여러 화면 이동 시나리오에서 기본5초 제한 초과1건이다. Listen 검사는 공급부가 없는 독립 reader에서 비활성 상태를 확인하도록 갱신했고 실제 활성화는 새 navigation 검사로 검증한다. 공개 목록 시나리오만 실행 제한30초를 적용하고 각 이동·삭제의 검증은 유지했다.
- 마지막 음소거 보완을 포함해 발행 읽기·발행 수명·공개 목록 양 preset 6 suites/44 tests가 통과했다. 같은 최종 코드에서 `npm run typecheck`와 `npm run lint`도 exit0이었다.
- 최종 전체 Jest 재실행(`npx jest --maxWorkers=2`)은 iOS/Android 326 suites/1816 tests 모두 통과, 실패·skip0, 240.702초, exit0이었다. 기본 `npm test`의 직렬 실행과 워커 수가 다르며 검사 대상은 동일하다. 이 결과 이후 제품 코드·테스트 변경은 없고 결과 문서만 갱신했다.
- 이 전체 실행에서 iOS `DigestPanel.test.tsx`에 귀속된 `VirtualizedList._updateCellsToRender`의 지연 타이머 `act` 경고1건이 나왔다. 해당 파일은 이번에 수정하지 않았으며 제품 오류 또는 과거 다른 파일의 경고와 같은 원인으로 확정하지 않는다. 테스트는 통과했지만 경고 원인 해결로 처리하지 않고 후속 검증 항목으로 남긴다.
- 실제 Chrome 웹 390×844에서 홈·Explore의 정책 `View story` 이동 후 응답 모달 0개, 원래 화면 복귀 후 0개를 확인했다. 작성→발행→본문 구절 선택→Highlight→Library→원문 복귀→구절 응답 게시를 실제 앱의 mock 상태로 실행했다. 브라우저 DOM Range로 선택했고 실제 OS 선택 핸들 검증으로 취급하지 않는다.
- 최종 웹 확인에서는 두 문단을 가로지르는 강조 저장 후 두 문단에 강조가 남고 기존 굵은 부분의 computed fontWeight가700인 것을 확인했다. Listen→Hans 선택/Done→View story→플레이어 공유에서도 발행 제목·본문·작성자가 유지됐다. 이미지 저장이나 OS 공유 발송을 실행했다는 의미는 아니다.
- F25의 `sc_a8112b7354bb44908f9359e95ba3c288` 원본 PNG를 열어 Highlight·Respond·Share 도구와 본문 내 강조를 확인했다. 발행 글 지원은 이 도구를 확장한 자체 FE 기능이며 원본에 발행 글의 해당 조작이 기록되어 있다고 주장하지 않는다. 전체 200화면 시각 동일성 판정은 하지 않는다.

### 남은 범위

| 항목 | 현재 상태 |
| --- | --- |
| Q11 발행 Highlight·구절 인용·Listen | 로컬 구현 추가, 위 검증 범위로 판정; 실제 음성 출력 제외 |
| F09 native 혼합 인용선·목록 내어쓰기·Android 혼합 구분선 | 기존 구현 잔여 유지; 문단 스타일 native adapter 필요 |
| F25/F29 native 다중 문단 연속 선택·선택 좌표 기반 메뉴 | 기존 별도 picker와 본문 안 메뉴 유지; 원본과 다른 구현 잔여 |
| Q06 이미지 경계를 넘는 편집기 선택 | 현재 미지원 유지; 편집기 선택·IME·이미지 offset 계약과 함께 확장 필요 |
| 원본 콘텐츠·사진·서체·아이콘 | 미수록 내용을 생성하거나 대체 자산을 원본과 동일하다고 판정하지 않음 |
| 실제 기기 | 이 Mac에는 Command Line Tools만 있고 전체 Xcode·iOS SDK·Android SDK/adb가 없어 native 빌드·선택 핸들·IME 미실행 |

네이티브 어댑터를 검증 없이 추가하고 완료로 처리하지 않았다. 이번 변경은 FE의 기존 기능 경계 안에 한정하며 `medium/flows`, 기존 baseline·codeInputs·evidenceContext, ENV, 의존성은 보존한다. 테스트용 브라우저·로그는 저장소 밖 임시 경로를 사용했다. 이번에 시작한 Chrome과8081 Metro만 종료했고 두 포트의 남은 listener가 없음을 확인했다. 위 결과는 자기 검토이며 독립 리뷰가 아니다.

<a id="rn-only-followup"></a>

## React Native 공통 입력·선택 메뉴 보완 — 2026-11-25

아래 문단별 편집기 방식은 [11월26일 연속 리치텍스트 입력](#medium-editor-followup)으로 대체되었다. 선택 메뉴의 줄 측정 방식은 유지하며 아래 수치는 당시 검증 기록이다.

최신 사용자 지시에 따라 `FE`에서 React Native/TypeScript만 사용했다. Swift·Kotlin·새 native module·WebView·추가 의존성을 도입하지 않았다. [FRONT_AGENT 규칙](../AGENT/SOFTWARE_AGENT/FRONT_AGENT/README.md)의 구조·상태·모바일 UI·검증 기준을 적용하고 기존 미커밋 Flow 보완을 보존했다. 위 표의 native adapter 필요 판정은 확정된 요구가 아니라 이전 기술 검토였으며 이번 방식으로 대체한다.

### 요구 근거와 적용 범위

- [Medium story editor](https://help.medium.com/hc/en-us/articles/215194537-Using-the-story-editor)의 모바일 서식·인용 전환·목록 Return 동작과 [About highlights](https://help.medium.com/hc/en-us/articles/214406358-About-highlights)의 선택→강조·구절 응답을 참고했다. 문서에서 확인되지 않은 이미지 경계 선택을 필수 Medium 동작으로 단정하지 않는다.
- F09의 `sc_e5826f356093493a86c19716420e8fdf`와 `sc_1b0cd82ee04a4c8c9d52b9a2d088823b` PNG를 열어 인용선과 목록 내어쓰기를 확인했다. F25의 앞선 구절 선택 캡처는 한 문단의 여러 줄 선택을 보여주며 서로 다른 문단까지 이어지는 OS 선택의 증거로 확대하지 않는다.
- [Apple 메뉴 지침](https://developer.apple.com/design/human-interface-guidelines/menus)은 현재 문맥에 맞는 명확한 동작 이름·관련 명령의 묶음을 참고했다. [Android TextView](https://developer.android.com/reference/android/widget/TextView)의 선택 ActionMode는 플랫폼 동작 비교에 사용했으며 플랫폼별 메뉴 callback을 직접 구현하지 않았다.
- RN의 [TextInput 선택 이벤트](https://reactnative.dev/docs/textinput#onselectionchange)와 [Text 줄 배치 이벤트](https://reactnative.dev/docs/text#ontextlayout)를 대조했다. 실제 구현 기준은 설치된 RN0.86.3의 타입과 코드다. 선택 이벤트의 UTF-16 시작·끝은 사용할 수 있지만 글자별 선택 사각형은 이 공개 이벤트에 없으므로 아래 메뉴 좌표를 정확한 native 선택 좌표라고 기록하지 않는다.

### 구현과 선택한 제약

- [RichBody](../FE/src/features/editor/RichBody.tsx)는 native에서 문단마다 RN `TextInput`을 배치한다. 일반·인용·목록·가운데 인용·구분선을 섞어도 인용선, 목록 내어쓰기, Android/iOS의 문단별 정렬을 각각 적용한다. 목록 표시는 입력 옆에 두고 실제 문서에는 기존 접두 문자열을 유지한다.
- 저장 상태의 기준은 기존 schemaVersion3 문서 하나다. 각 입력의 변경을 구간 전체에 합쳐 기존 `changeBody`·이미지 구간 병합·자동 저장을 사용하고 UTF-16 선택 좌표를 변환한다. 새 저장소나 문서 형식을 만들지 않는다.
- 당시 문단 키 처리(`nativeParagraphs.ts`, 11월26일 연속 입력 전환으로 제거)는 Return·붙여넣기·Backspace 병합 후 커서가 이동한 문단에 기존 입력 인스턴스를 이어 준다. 목록 이어 쓰기·빈 목록 종료·문단 앞 Backspace를 기존 모델과 연결하고, 문단 분할 전의 늦은 선택 이벤트가 새 커서를 덮지 않도록 검사한다.
- 본문 아래 빈 여백에도 입력 진입 영역을 유지했다. 여백을 누르면 기존 선택을 접고 마지막 문단 끝으로 커서와 포커스를 옮겨 이어 쓸 수 있다. 실제 문단 입력은 그 위에 배치해 여백 동작이 문단의 터치를 가리지 않도록 했다.
- **입력 구조의 실제 제약:** 기존에는 이미지 없는 구간 하나가 한 입력이어서 그 안의 여러 문단을 OS 선택 손잡이로 잡을 수 있었다. 이번 문단별 입력에서는 OS 선택·복사·잘라내기가 각 문단 안으로 제한된다. 문단 사이를 가로지르는 선택은 이번에 구현하지 않았으며 기존 기능과의 동작 차이다. 필드 사이의 OS undo·키보드 커서 이동과 목록 표시를 포함한 복사도 기존 한 입력과 동일하다고 보장하지 않는다. 서식 혼합 배치를 RN 공개 구성요소로 처리하기 위해 선택한 비용이며 기기 검증·후속 UX 검토 대상이다.
- 읽기용 [NativePassageText](../FE/src/features/highlights/NativePassageText.tsx)는 선택 입력과 같은 서식의 숨겨진 RN `Text`에서 줄 배치를 측정한다. [selectionLinePosition](../FE/src/features/highlights/selectionLinePosition.ts)은 선택이 걸친 줄들의 영역을 합친다. 문자열·측정값이 맞지 않으면 문단 영역으로 대체하며 글자 폭을 추측해 선택 범위를 만들지 않는다.
- [SelectionMenuHost](../FE/src/features/highlights/SelectionMenuHost.tsx)는 `HighlightProvider` 아래 화면 층에 메뉴를 표시한다. 본문 사이에 메뉴·Cancel 높이가 끼어들지 않으며 `Modal`로 OS 핸들의 터치를 가리지 않는다. Safe Area와 실측 메뉴 높이로 위치를 제한하고, 선택 모드에서만120ms 간격으로 문단 이동을 측정해 스크롤을 따른다. 선택이 화면 밖이면 메뉴를 숨긴다. 정확한 선택 글자에 밀착하는 좌표 구현과는 구분한다.
- 범위를 커서로 접어 Highlight 등 행동이 사라져도 Cancel은 유지한다. 화면·계정·원문 버전 변경 시 기존 `PassageReader` 수명으로 입력·메뉴를 제거하고, 뒤로·백그라운드에서도 닫는다. 제거 뒤 늦게 도착한 측정 결과를 버리고 예약·listener를 정리한다.
- 읽기 화면의 다중 문단 선택은 기존 별도 선택 UI를 유지한다. 이미지 경계를 넘는 편집기 선택은 계속 미지원이다. 이 두 항목을 이번에 구현한 것으로 처리하지 않는다.

### 검증과 자기 검토

- 수정 전 작성 navigation·구절 읽기 baseline은 양 preset4 suites/32 tests가 통과했다. 이는 앞선 전체1816건 이력과 별도 실행이다.
- 혼합 서식·이모지 UTF-16·목록 Return/종료·Backspace 병합·여러 줄 붙여넣기·늦은 선택·동일 문자열의 입력 키 보존을 검증했다. 실제 `EditorNavigation`은 유지하고 기대 선택 범위만 문단별 입력 계약으로 바꿨다. 따라서 이전 다중 문단 선택 테스트의 통과와 동등한 증거로 취급하지 않는다.
- 메뉴 테스트는 native 위치 측정만 대역으로 교체해 본문 높이 유지·스크롤 위치 변화·화면 밖 숨김·해제 후 늦은 응답 폐기를 확인한다. 별도 순수 테스트는 한글·이모지·여러 줄·일치하지 않는 배치·잘못된 측정값을 검사한다. 실제 OS 핸들·폰트 엔진은 이 테스트에 포함되지 않는다.
- 통합 중 반복 interval이 fake timer의 진행 도중 정리되는 실패가 발생했다. 측정 예약을 취소 가능한 재귀 timeout으로 바꾸고 발행 읽기·좌표 관련16 tests를 통과했다. 초안·이미지·읽기 설정24 tests도 통과했다. console 무시나 native 화면/navigation 전체 mock으로 실패를 숨기지 않았다.
- 첫 전체 검사는 타입·lint 및 양 preset334 suites/1836 tests 통과, 실패·skip·act 경고0,270.933초였다. 이후 자기 검토에서 선택을 접으면 Cancel까지 사라지는 문제를 보완하고 복귀 회귀를 추가했다. 최종 코드의 검사 결과는 아래 별도 기록한다.
- Cancel 보완 후 `npm run typecheck && npm run lint && npx jest --maxWorkers=2`는334 suites/1838 tests 모두 통과, 실패·skip·act 경고0,277.63초,exit0이었다. 이 실행 뒤 본문 빈 여백의 입력 진입과 포커스 요청 시 이전 선택 대기의 해제를 보완했으며, 마지막 변경은 아래 관련 검사로 구분한다. 전체1838건을 마지막 여백 보완 뒤 실행했다는 뜻은 아니다.
- 마지막 여백·포커스 보완 후 `npm test -- --runTestsByPath src/features/editor/RichBody.test.tsx src/app/navigation/EditorNavigation.test.tsx src/app/navigation/EditorImagesNavigation.test.tsx src/app/navigation/DraftsNavigation.test.tsx`는 양 preset8 suites/40 tests 통과, 실패·skip·act 경고0,16.035초,exit0이었다. 마지막 두 파일을 포함해 입력→사진 구간→초안 저장·재개→발행의 실제 navigation 회귀를 재실행했다.
- 같은 최종 제품 코드에서 `npm run typecheck && npm run lint`를 다시 실행해 exit0을 확인했다. 이후에는 결과 문서만 갱신했으며 추가 제품 코드·테스트 변경은 없다. 실행 환경은 macOS·Node24.18.0이며 Jest의 iOS/Android preset은 실제 플랫폼 실행과 구분한다.
- 실제 Chrome 개발 웹390×844에서 한글·이모지3문단 입력→두 번째 문단 인용→세 번째 문단 목록→Saved→Next→모의 발행→발행 글 읽기를 실행했다. 인용선3px·목록 내어쓰기28px와 저장 후 내용을 DOM 및 실제 발행 화면 캡처로 확인했다. 이 경로는 기존 `RichBody.web.tsx`의 회귀 확인이며 새 native 입력 배치의 화면 검증이 아니다. 원본과 동일한 기기·DPR·서체 조건의 비교도 아니다.
- 브라우저 자동화 초기에는 headless 문서가 포커스되지 않아 본문 도구가 활성화되지 않았다. CDP의 페이지 포커스를 설정한 뒤 정상 조작했다. 이를 앱 결함으로 수정하지 않았다. 임시 브라우저 스크립트·로그·캡처는 저장소 밖 `/tmp`에 두었다.

### 실제 기기 대기와 보존 범위

현재 Mac은 Command Line Tools만 설치되어 있고 전체 Xcode/iOS SDK·Android SDK/adb가 없다. native 빌드·설치·OS 선택 핸들·한글 IME·문단 분할 중 포커스·스크롤 터치·VoiceOver/TalkBack·큰 글자는 미검증이다. 특히 여러 입력의 연속 타이핑·undo와 숨겨진 Text/실제 TextInput의 폰트 배치 차이를 실제 양 플랫폼에서 확인해야 한다. 자동 검사 성공을 iOS/Android 기기 실행 성공이나 Medium 전체 동일성으로 올리지 않는다.

기존 mock 범위·문서 schema·이미지 offset·계정 수명 계약과 앞선 Flow 보완을 유지했다. 참고 `medium/flows`·ENV·의존성·baseline·기존 증거 파일·Swift/Kotlin 파일은 변경하지 않았다. 커밋·push·배포·외부 서비스 연결은 실행하지 않는다. 위 검토는 자기 검토이며 독립 리뷰가 아니다.

이번 작업에서 시작한8081 Metro와9235 임시 Chrome만 종료하고 두 포트에 남은 listener가 없음을 확인했다. 새 문서 링크·명시적 anchor의 대상 누락0과 `git diff --check` 통과를 확인했다.


<a id="medium-editor-followup"></a>
## Medium 원본 재대조와 연속 리치텍스트 입력 — 2026-11-26

사용자는 `medium/flows`의 관련 흐름까지 확인한 뒤 추천 방향을 판단해 Medium과 동일하게 작업하도록 요청했다. Swift·Kotlin 직접 작성 금지는 유지한다. 앞선 문단별 TextInput 접근은 혼합 배치를 해결하는 대신 문단 사이 OS 선택을 잃었으므로 이번 구현으로 대체했다. 참고 원본과 사용자 변경은 보존하고 커밋·push·배포는 하지 않았다.

### 확인한 원본과 판단

- [Changing text format](../medium/flows/Home/Publishing%20a%20story/Changing%20text%20format/ANALYSIS.md)의 단계·관찰·한계를 읽고 원본 PNG 01~05를 열었다. 키보드가 열린 상태의 회색 소제목, 인용선+기울임, 목록 내어쓰기, 가운데 구분선, 이미지의 초록 선택 테두리와 X가 기준이다. 미리보기에서만 문단 서식을 정확하게 보여 주는 접근은 이 흐름에 충분하지 않다.
- [Publishing a story](../medium/flows/Home/Publishing%20a%20story/ANALYSIS.md)의 11단계 전환·관찰을 재확인했다. 이 후속 작업에서 발행 전체 11장 각각을 새로 시각 비교했다는 의미는 아니다.
- [Highlighting a phrase](../medium/flows/Home/Story%20detail/Highlighting%20a%20phrase/ANALYSIS.md)의 선택/완료 원본 02·03을 열었다. 한 문단의 여러 줄을 선택하고 본문 위 Highlight·Respond·Share 메뉴에서 실행한 뒤 강조가 남는다. 서로 다른 문단이나 이미지를 가로지르는 선택을 증명하는 캡처로 확대하지 않는다.
- [Responding to a phrase](../medium/flows/Home/Story%20detail/Responding%20to%20a%20phrase/ANALYSIS.md)의 관찰과 원본 02~04를 확인했다. 선택 문구가 댓글 입력창에 인용되고, 전송 뒤 자신의 응답에도 인용이 유지된다. 앞선 발행 글·응답 연결은 유지한다.
- 원본은 Medium iOS 카탈로그 Latest/versionID1419이며 PNG1179×2556, 메타데이터390×844다. 실제 OS/build/DPR 정보는 없으므로 Android나 동일 기기 조건의 증거로 취급하지 않는다.
- [Medium 편집기 안내](https://help.medium.com/hc/en-us/articles/215194537-Using-the-story-editor), [하이라이트 안내](https://help.medium.com/hc/en-us/articles/214406358-About-highlights), [Expo 리치텍스트 가이드](https://docs.expo.dev/guides/editing-richtext/)를 확인했다. Expo가 안내하는 native 리치텍스트 경로를 선택해 RN 공통 API에서 문단 서식과 연속 선택을 함께 다룬다. 라이브러리 채택 자체가 Medium 구현과 동일하다는 뜻은 아니다.

### 변경과 데이터 경계

- [RichBody](../FE/src/features/editor/RichBody.tsx)는 이미지 사이의 연속 본문을 한 `EnrichedTextInput`에 둔다. 인용선·목록·제목/소제목·가운데 인용·구분선·코드를 native 문단 스타일로 표현하며 굵게·기울임·링크와 기존 툴바를 연결한다. 별도 문단별 입력과 키 처리 파일은 제거했다. 웹 미리보기의 `RichBody.web.tsx`는 유지한다.
- [nativeEditorHtml](../FE/src/features/editor/nativeEditorHtml.ts)은 입력 경계의 HTML과 기존 문서 모델을 변환한다. 목록 기호를 제외한 native UTF-16 좌표와 저장 문자열 좌표를 양방향 매핑한다. HTML escape·안전한 링크·멘션 ID/이름·빈 문단을 처리하며 자동 인용 기울임과 원래 mark를 구분한다. native가 제한하는 제목 굵게·code 내부 기존 mark는 저장 모델에서 보존한다. 중첩 mark의 직렬화 순서를 고정하고 이름 중간 서식이 멘션을 여러 사람으로 나누지 않도록 했다.
- 외부 서식 명령의 반영 전 늦은 HTML을 무시하고 반영 후 새 입력을 이전 getHTML 응답이 되돌리지 않게 했다. 화면 이탈·새 문서의 수명을 구분한다. 입력 텍스트와 확정 HTML이 다르면 조합/미확정 상태를 알리고 서식·발행을 잠근다. 실제 IME는 별도 기기 검사 대상이다.
- 초안/발행은 HTML 저장으로 변경하지 않았다. schemaVersion3, UTF-16 범위, 이미지 lease/source/session, 모의 저장과 실제 작성한 문서의 발행 경로를 유지한다.
- [RichDocumentBody](../FE/src/features/editor/RichDocumentBody.tsx)에서 자동 포커스 복구가 실패 이미지의 선택을 지워도 삭제가 가능하도록 오류 상태에 삭제 동작을 유지했다. 재시도 시 선택 상태도 복구한다.
- 읽기용 줄 측정 메뉴는 앞선 구현을 유지한다. 문구 하이라이트·구절 응답의 연결 회귀는 검사하지만 이번 native 편집기 채택으로 읽기 메뉴의 글자별 정확 좌표까지 해결됐다고 표시하지 않는다.

### 의존성과 실행 조건

- `react-native-enriched-html@1.2.0`, `htmlparser2@10.1.0`을 정확한 버전으로 추가했다. 둘 다 MIT다. [라이브러리 호환표](https://docs.swmansion.com/react-native-enriched-html/misc/compatibility/)와 설치된 패키지의 RN>=0.82 peer 범위를 대조했으며 현재 앱 RN0.86.3에서 JS export와 autolinking 검색을 확인한다.
- 직접 작성한 Swift·Kotlin·WebView는 없다. 다만 선택한 RN 라이브러리는 native 코드를 포함하므로 기존 앱 binary에는 자동으로 추가되지 않는다. [공식 시작 안내](https://docs.swmansion.com/react-native-enriched-html/)에 따라 iOS/Android development build를 새로 만들어야 하며 Expo Go로 이 입력기를 실행할 수 없다.
- TipTap optional 메뉴 패키지가 설치 시 core3.31.3과 다른 minor로 해석되는 경고와 DOMPurify3.4.16의 신규 low advisory를 확인했다. 이 라이브러리 범위에서만 메뉴3.31.3·DOMPurify3.5.0 override를 적용했다. `npm ls --all`에서 invalid peer가 없고, 재검사 audit은 기존 Expo/fingerprint/minimatch 경로의 moderate3개이며 새 low는 없다. 광범위한 upgrade나 audit force는 실행하지 않았다.
- `expo install --check`는 기존 Expo 계열 5개 패키지의 patch 업데이트를 권고했다(expo57.0.34, metro-runtime57.0.19, image-manipulator57.0.23, image-picker57.0.22, notifications57.0.26). 새 리치텍스트 도입과 분리하여 기록하고 이번 범위에서 일괄 업데이트하지 않았다.

### 검증과 현재 한계

Jest에서는 native view/명령 경계만 대체하고 라이브러리 JS wrapper, 변환기, 앱 navigation, 초안/발행 source는 실제 코드를 사용한다. 운영체제의 핸들·IME·글꼴·Undo를 Jest가 실행한 것으로 기록하지 않는다.

- 이미지 사이 한 입력 안에서 여러 문단 선택이 가능한 구조로 복구했다. 이미지를 가로지르는 편집기 선택과 읽기 화면의 여러 문단 선택 UX는 기존 제한이 남는다.
- 읽기 메뉴 위치는 선택이 걸친 줄의 실측 영역이며 glyph별 정확한 선택 사각형은 아니다. Android OS 메뉴와 iOS 메뉴의 형태 차이도 실제 기기에서 확인해야 한다.
- native HTML이 지원하는 단일 단계 목록과 문단 스타일 범위 안에서 구현한다. 임의 HTML/중첩 목록 전체를 보존하는 범용 HTML 편집기는 아니다. 목록은 native의 순차 번호 매김을 따른다.
- 이 Mac은 Command Line Tools만 있고 전체 Xcode/iOS SDK 및 Android SDK/adb가 없다. native 빌드·설치·실제 기기 캡처, 한글 IME·Undo/Redo·선택 손잡이·큰 글자·VoiceOver/TalkBack·키보드/스크롤 검증은 미실행이다. 현재 결과를 Medium 전체 동일성이나 iOS/Android 앱 출시 완료로 표시하지 않는다.


### 최종 검사 기록

- `npm run typecheck`, `npm run lint`, `git diff --check` 통과. ref의 초기 HTML을 render에서 읽던 부분은 초기 state로 바꿨고 native 경계 mock의 ref prop도 분리해 lint 오류를 수정했다.
- 전체 Jest 1차는 **334 suites 중333 통과,1853 tests 중1852 통과**였다. 이 실행 도중 마지막 경계 테스트가 추가되어 최종 테스트 총수로 사용하지 않는다. iOS `PublicListsNavigation`의 비공개 전환 복귀 사례 하나가 기존5000ms 제한을 넘었으며 assert 실패는 아니었다. 타임아웃을 늘리거나 테스트를 skip하지 않았다.
- 최종 코드의 관련·실패 회귀는 `nativeEditorHtml`, `RichBody`, `EditorNavigation`, `EditorImagesNavigation`, `DraftsNavigation`, `PublishingNavigation`, `PublicListsNavigation`, `PublishedReadingNavigation`을 iOS/Android 설정으로 실행하여 **16 suites /94 tests 모두 통과**했다(37.768초). 앞서 시간을 초과한 사례도 양 설정에서 통과했고 이 최종 실행에 act/console 경고·skip은 없다. 전체 검사를 최종 코드에서 다시 모두 실행한 결과와는 구분한다.
- 검증한 경계는 혼합 문단·문단 간 선택·한글/이모지 UTF-16·목록 Return/종료·중첩 mark 정규화·멘션 중간 서식·미확정 입력 잠금·늦은 HTML/화면 이탈, 실제 navigation을 통한 저장·재개·계정 교체·이미지 실패/복구·발행·읽기 연결이다. HTML/선택 사건과 native 명령 계약을 검사하며 OS 내부 편집기 자체는 대역이다.
- 최종 `expo export --platform ios --platform android --platform web --max-workers 1` 통과. 양 native JS/Hermes 번들은 약3.9MB이며 web은 약2.1MB다. iOS podspec과 Android package/component descriptor의 autolinking 검색도 성공했다. native 컴파일·실행 성공으로 해석하지 않는다.
- 설치 전 lockfile과 비교해 추가 패키지는50개이며 기존 패키지 버전 변경·제거는0개다. `npm ls --all`에서 invalid peer가 없고 audit 결과는 위 의존성 절과 같다.
- Chrome 개발 웹390×844에서 한글·이모지3문단 작성→둘째 문단 인용→셋째 문단 목록→Saved→Next→모의 발행→발행 글 읽기를 실행했다. DOM에서 인용선3px·인용 들여쓰기24px·목록 들여쓰기28px를 확인하고 실제 발행 화면을 캡처해 열었다. 이어 본문 선택→Respond→인용 댓글 게시로 Responses1/자기 인용 응답을 확인했고, 다른 문구 Highlight 후 초록 배경이 남는 것을 확인했다. 최종 export 번들로 새로고침한 뒤에도 작성→인용/목록→발행→읽기를 재확인했다. 원본과 동일한 문구·서체·DPR의 픽셀 비교는 아니다.
- 웹은 기존 `RichBody.web.tsx`의 회귀이며 새 native 입력기의 실제 화면 검증을 대신하지 않는다. 자동 검사와 구현 방향의 보완까지 완료했고 실제 iOS/Android 기기 검사는 위 환경 제약으로 남는다.
- 문서 상대 링크와 변경 diff를 확인했다. 참고용 `medium/flows`, ENV, Swift·Kotlin 파일에는 변경이 없으며 새 platform 프로젝트를 생성하지 않았다. 검증용 서버·브라우저는 작업 종료 때 정리한다.

### 커밋·푸시 전 확인 — 2026-11-26

사용자의 후속 요청으로 현재41개 파일을 한 커밋에 포함한다. 원격 `origin/main`을 fetch해 로컬 시작 HEAD `5d767b0`과 차이가 없음을 확인했다. 제품 코드·의존성·테스트 변경은 앞선 최종 검사 대상이며 이번 단계에서는 Git 요청 기록만 갱신했다. 타입/lint·관련94 tests·3플랫폼 export 결과와 전체 검사1건 timeout 후 관련 묶음 재통과를 그대로 구분한다. `git diff --check`와 최종 staged 범위를 확인하고 일반 push로 전달한다. 실제 커밋 해시와 원격 반영 여부는 Git 작업 결과로 보고한다.
