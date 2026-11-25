# Medium Parity 7 — 저장·목록·메모·순서

**2026-11-25 검증 보완:** [통합 검토의 전체 검사·목록 테스트 시간 제어](FE_MEDIUM_PARITY_01_20_REVIEW.md). 전체 검사에서 LibraryInteractions의 VirtualizedList 지연 갱신 act 경고를 확인해 fake timer·pending timer 정리를 보완했다. 목록 제품 정책이나 시각 UI는 변경하지 않았으며 이전 검증·원본/기기 잔여는 보존한다. 과거 TopicProvider/DirectoryScope 경고와는 별개다.

**최신 잔여 판정 — 2026-11-24:** [Parity1~8 잔여 정리·보완·재검토](FE_MEDIUM_PARITY_01_08_REVIEW.md). 아래 수치·미커밋·미착수·시각 차이는 해당 실행 당시 기록이다. 후속 해결과 이번 보완, 원본 근거 부족/기기/제외를 최신 표에서 구분하며 과거 증거를 현재 통과로 사용하지 않는다.

최신 추가 검토는 [묶음7·8 전수 재검토](#additional-review)에 기록한다. 아래 최초 검사·커밋 이력과 구분하며 추가 수정은 기존 `41aebaa`를 amend하지 않은 미커밋 변경이다.

2026-11-24 · 시작 HEAD `21c8bc06d9d382f06a34d8012903e1b79f2eee10`. 시작 working tree/staged는 깨끗했다. 현재 실행 계획의 묶음7만 구현했으며 묶음8은 이 결과의 검증·로컬 커밋 이후 시작한다. 현재 코드의 타입/lint·iOS/Android 전체 검사·가능한 브라우저 검증을 통과하여 로컬 커밋 조건을 충족했다. 기능/mock 구현은 완료, 시각 비교는 부분 보정·차이 잔여, native 검증은 환경 대기다.

## 판정과 범위

| 대상 | 구현·mock 판정 | 원본·경계 |
| --- | --- | --- |
| D04 | 메모/목록 카드에서 양수만 읽기 시간 표시. 0·누락값은 생략 | Digest의 묶음6 계약과 동일. 임의 시간 생성 없음 |
| D11 | ListStoryCard의 `memberOnly === true`만 금색 별16px, 다운로드 다음·읽기 시간 앞 | 계정 tier/인증/Friend와 독립. S077 기사 ID 기준으로 재정렬 후 유지 |
| D13 | source가 성공 시각 `updatedAt`을 공급하고 상세가 상대 시간·개수 표시 | 마지막 성공한 의미 있는 내용 변경 시각은 자체 mock 정책. 원본 시간의 정확한 의미는 미확인 |
| V22 | Save to 임시 선택/Done/취소·하위 새 목록과 다중 소속 연결 검증 | 체크 즉시 저장인지 원본 미확인. 현재 Done 확정 정책 유지 |
| V24 | Library 5탭·배너/빈 목록/카드/잠금·Highlighted 원문 연결 점검 | 계정 fixture·폰트·OS영역 차이, Saved lists 등 미수록 결과 유지 |
| V25 | 생성/편집/메모/순서/공개 범위/삭제/Remove·Undo 검증. 이탈 초안·상대 시간·포커스 보완 | Undo 결과/시간 한도·충돌·원격 영속성은 원본 관찰로 승격하지 않음 |

D04/D11은 묶음6의 Digest 처리와 이번 메모/내 목록 소비자 처리로 배정된 구현 누락을 해소한다. 실제 Medium 동일성·기기 검증 완료 의미가 아니다. D07/V26의 발행 본문 다운로드는 이 커밋 이후 묶음8 대상이다.

## 확인한 기준

AGENT README, 공통 품질·FE 아키텍처/명명/한글 주석/상태·비동기/모바일/성능·보안/검증의 하위6규칙, UX 기준을 읽었다. 묶음2·4·5(추가 재검토 포함)·6(추가 검토 포함)의 관계/권한/화면 이탈·표시 계약을 현재 호출부와 대조했다. medium README, 비교 protocol/baseline/asset/own UI, 아래28개 원본 PNG와 연결된10개 ANALYSIS를 실제 열람했다. R/T/U/C 연결을 요구사항 문서·FLOWS·CONTRACTS(G08/09/17/18/27/32/33 포함)·UNKNOWN·JSON에서 대조했다. 과거 검사와 캡처는 이번 실행을 대신하지 않는다.

## 결함과 수정

| 재현 | 원인 | 수정·회귀 |
| --- | --- | --- |
| 미확인 읽기 시간 기사의 메모 열기 | 무조건 `${readingMinutes} min read` | 양수만 표시하고 구분자도 함께 생략. 0/누락/8분 UI 회귀 |
| S077의 회원 글을 목록에 저장·재정렬 | ListStoryCard에 별표 조건 없음 | `memberOnly === true`와 기사 ID 사용. false/누락/true 회귀 |
| 빈 상세·4글 상세·순서 저장 뒤 시간 없음 | 저장소 표시 시각 계약 없음 | source 확정 시각·store 전달·상대 시간 렌더. 14/6/1초 독립 조건/분 경계 회귀 |
| 메모/Save to/이름·순서 편집 중 다른 탭 이탈 | 보존되는 stack route에 초안/시트 잔류 | Library/Profile 공유 ReadingListRoute의 focus 전달, 개인 scope/list 키 및 blur 초기화. 실제 AppNavigator 통합 테스트 |
| 내용 A→B→A 후 이전 성공 도착 | 내용만 같으면 이전 응답 metadata를 수용 | 현재 source catalog의 확정 시각 우선. 늦은 응답 회귀 |
| 만료된 Remove 토큰 Undo | 실패 반환값 무시 | 실패 안내 노출. 토큰·계정·삭제 경계는 기존 회귀 재실행 |
| 웹 메모 시트 닫기 뒤 키보드 포커스가 body로 빠짐 | 포털 종료 시 원래 trigger 복구 누락 | LibrarySheet에 기존 공통 focus 복귀 적용. 사라진 메뉴 trigger는 현재 제목으로 복구; 직접 메모 trigger 복귀 브라우저 재확인 |

## 상태·시각·편집 계약

- `userId`는 소유자, `listId`는 목록, `articleId`는 소속/메모/순서/별표 대상이다. 인증 revision과 공급부 generation을 포함한 scope가 개인 화면·시트를 분리한다. source 교체는 저장소를 새로 만들고 A→B→A는 같은 A의 확정 데이터만 재사용한다. A의 진행 중 쓰기는 A 저장소에 귀속되며 이전 세션 오류·초안은 새 세션에 노출하지 않는다.
- `updatedAt`은 목록 생성 또는 이름·설명·공개 범위·소속·순서·메모의 **실제 내용이 달라진 성공** 시각이다. 취소·실패·동일 명령 재전송·같은 내용은 갱신하지 않는다. ID/commandId의 Date.now에서 추정하지 않는다. 노출 중 1초마다 metadata만 갱신하고 blur/unmount 시 타이머를 정리한다. 초/분/시간/일 floor, 0 seconds ago, 미래/비정상/누락값 생략은 자체 계약이다.
- 처리 중 카드는 기존 store의 optimistic 소속/내용과 confirmed 시각을 사용한다. 성공 뒤 시각 확정, 실패 뒤 확정 내용 복원·재시도 입력 보존이다. 기본 managed Reading list도 같은 계약이며 공급부가 해당 사용자 카탈로그를 처음 준비할 때 자동 생성한 시각을 갖는다(원본 자동 생성 시점은 미확인). legacy timestamp 없는 공급부는 시간을 생략한다. 공개 목록의 publication label은 다른 의미라 이 값으로 채우지 않는다. 원본의 생성/수정/재정렬 중 어떤 시각인지 미확인이다.
- 메모는 `(owner,list,article)` 관계의 값이다. 빈/공백 메모 저장은 제거로 처리하고 NFC를 사용한다. 다른 목록 메모는 독립. 최대 길이는 원본 미확인이라 새 제한을 만들지 않았다. 기본 Reading list는 private/삭제·이름 수정 불가.
- 제목 NFC/trim·60자, 설명 선택/280자·중복 이름 검증은 기존 mock 계약. Save to는 바꾼 행만 Done에서 반영한다. 하위 새 목록 생성은 목록을 생성하고 임시 선택만 켜며, 부모 Done 전에는 기사를 넣지 않는다.
- 순서는 제목 중심 초안, 드래그·접근성 이동 후 Done에서 반영, Cancel/blur는 폐기한다. 동시 소속 변경과 삭제된 목록은 충돌/사용 불가로 처리한다. 원본 기사·다른 목록·박수는 목록 삭제나 소속 제거로 삭제하지 않는다. 북마크는 남은 소속에서 파생한다.
- private 확정 시 방문자 공개 접근과 Saved lists를 철회하고 재공개해도 자동 저장 복원하지 않는다. 공유 아이콘은 private에서도 남되 공개 공유 효력을 주지 않는다. 원본 실제 타인 제거/재공개 결과는 미확인이다.
- Undo는 제거 토큰·scope·현재 목록/소속과 인접 기사로 순서/메모를 복원한다. 새 제거 토큰·계정 변경·목록 삭제로 만료하며 이번 UI는 화면 이탈 시 안내도 닫는다. 시간 제한을 임의로 만들지 않았다. 실패는 안내/기존 retry 계약을 따른다. 원본은 Undo 버튼만 관찰되어 실제 복원 결과와 구분한다.
- Mute/Block은 저장 소속 자체를 삭제하지 않는다. Block된 작성자 카드는 접근 제한/제거 동작을 유지한다. Follow/이메일 상태와도 독립이다. 공개 목록 접근과 발행 문서 접근권을 혼동하지 않는다.

## 화면별 R·T·U·C 검토

아래는 원본 열람·요구사항/호출부 검토 목록이다. 각 행을 개별 동일 fixture 캡처 완료로 해석하지 않는다. 실제 브라우저 조작·부분 시각 비교는 다음 절에 따로 적는다. 다운로드 컨트롤의 본문 공급/사본 완료는 묶음8로 남긴다.

| 화면 | R 요구·현재 처리 | 배정된 단계 | U/C 연결 |
| --- | --- | --- | --- |
| S002 리스트 메모 반영 | 배치: 대상 기사 위 세로선·이탤릭 메모 / 표시값·입력: 입력한 메모 표시 / 상태: 메모 저장 결과 표시 — 위 D/V 처리 및 시각 잔여 적용 | T-F45-05 | U-S002, U-F45; C28, C30, C31, C32, C33, C34, C35 |
| S011 내 리스트 상세 항목 | 배치: 4개 글 중 상위 2개·각 항목 Add a note / 표시값·입력: 4 stories, 저장 아이콘 채움 / 상태: 리스트에 글 4개 / PNG 추가 세부 관찰: 소유자 아래 상대 시간과 글 개수가 6 seconds ago · 4 stories로 함께 표시된다. — 위 D/V 처리 및 시각 잔여 적용 | T-F46-03, T-F47-01, T-F48-01, T-F49-01, T-F51-01 | U-S011, U-F46, U-F47, U-F48, U-F49, U-F51; C28, C30, C31, C32, C33, C34, C35 |
| S036 기사 저장 대상 선택 | 배치: 하단 Save to 시트 / 표시값·입력: Reading list 체크·자물쇠 / 상태: 비공개 읽기 목록 선택 — 위 D/V 처리 및 시각 잔여 적용 | T-F37-02 | U-S036, U-F37; C28 |
| S039 새 리스트 생성 표시 | 배치: Your lists에 기본 목록과 새 카드 / 표시값·입력: About mindfulness, No stories, 자물쇠 없음 / 상태: 새 목록 생성 결과 — 위 D/V 처리 및 시각 잔여 적용 | T-F42-04, T-F46-01 | U-S039, U-F42, U-F46; C20, C29, C31, C37 |
| S056 다크 읽기 목록 상세 | 배치: 제목·메모·기사 카드 어두운 테마 / 표시값·입력: 4 stories·자물쇠, 한 기사 Viewed 표시 / 상태: 읽은 기사 표시와 다크 테마 — 위 D/V 처리 및 시각 잔여 적용 | T-F62-07 | U-S056, U-F62; C28, C30, C31, C32, C33, C34, C35 |
| S058 다크 Library | 배치: 어두운 리스트 카드·썸네일 유지 / 표시값·입력: Reading list4 stories·자물쇠 / 상태: 라이브러리 테마 적용 — 위 D/V 처리 및 시각 잔여 적용 | T-F62-05 | U-S058, U-F62; C20, C29, C31, C37 |
| S066 저장 글 있는 읽기 목록 | 배치: Your lists의 Reading list 카드·3개 썸네일 / 표시값·입력: 3 stories·자물쇠 / 상태: 기본 목록에 글 존재 — 위 D/V 처리 및 시각 잔여 적용 | T-F41-03, T-F42-01 | U-S066, U-F41, U-F42; C20, C29, C31, C37 |
| S076 리스트 생성 빈 폼 | 배치: Create new list 시트·이름·선택 설명·비공개 토글 / 표시값·입력: 이름0/60, 설명0/280, Private 꺼짐 / 상태: 생성 전 입력 — 위 D/V 처리 및 시각 잔여 적용 | T-F42-02 | U-S076, U-F42; C28, C30, C31, C32, C33, C34, C35 |
| S077 변경 순서 반영 | 배치: 기사 카드 목록 복귀 / 표시값·입력: 첫 2개 항목이 변경 순서와 일치, 1 second ago / 상태: 재정렬 결과 표시 / PNG 추가 세부 관찰: 첫 기사 How Useful is Mind Fullness on an Empty Stomach?의 다운로드 아이콘과3 min read 사이에 금색 회원용 글 별표가 보인다. — 위 D/V 처리 및 시각 잔여 적용 | T-F51-05 | U-S077, U-F51; C28, C30, C31, C32, C33, C34, C35 |
| S078 리스트 순서 편집 | 배치: 제목만 있는 4행과 드래그 핸들 / 표시값·입력: 기존 순서 유지 / 상태: 재정렬 모드 — 위 D/V 처리 및 시각 잔여 적용 | T-F51-03 | U-S078, U-F51; C28, C30, C31, C32, C33, C34, C35 |
| S081 내 리스트 관리 메뉴 | 배치: 제목 옆 더보기 팝오버 / 표시값·입력: 공개 상태 메뉴 / 상태: 목록 관리 작업 선택 — 위 D/V 처리 및 시각 잔여 적용 | T-F47-02, T-F49-02, T-F51-02 | U-S081, U-F47, U-F49, U-F51; C28, C30, C31, C32, C33, C34, C35 |
| S085 리스트 삭제 후 라이브러리 | 배치: 목록 화면과 삭제 토스트 / 표시값·입력: List deleted and removed from Your library, Reading list 4 stories / 상태: 대상 리스트 제거 표시 — 위 D/V 처리 및 시각 잔여 적용 | T-F47-04 | U-S085, U-F47; C20, C29, C31, C37 |
| S095 Library 초기 목록 | 배치: Your library·New list·가로 탭·시작 배너·Reading list 카드 / 표시값·입력: Your lists 활성, No stories·자물쇠 / 상태: 기본 읽기 목록이 비어 있음 / PNG 추가 세부 관찰: Digest 옆 New 배지, 녹색 시작 배너의 북마크 그림과 닫기, 빈 카드의 세 칸 이미지 자리도 비교 대상이다. — 위 D/V 처리 및 시각 잔여 적용 | T-F41-02 | U-S095, U-F41; C20, C29, C31, C37 |
| S101 비공개 리스트 표시 | 배치: 리스트 메타데이터에 자물쇠 / 표시값·입력: 4 stories·자물쇠 / 상태: 비공개 상태 표시 — 위 D/V 처리 및 시각 잔여 적용 | T-F49-05 | U-S101, U-F49; C28, C30, C31, C32, C33, C34, C35 |
| S105 리스트 비공개 확인 | 배치: 중앙 확인 대화상자 / 표시값·입력: 다른 사용자가 저장한 목록이 라이브러리에서 제거된다는 안내 / 상태: 비공개 전 영향 안내 — 위 D/V 처리 및 시각 잔여 적용 | T-F49-03 | U-S105, U-F49; C28, C30, C31, C32, C33, C34, C35 |
| S106 빈 리스트 상세 | 배치: 소유자·제목·빈 상태·하단 리스트 반응 / 표시값·입력: About mindfulness, 14 seconds ago / 상태: 콘텐츠 없는 리스트 — 위 D/V 처리 및 시각 잔여 적용 | T-F46-02 | U-S106, U-F46; C28, C30, C31, C32, C33, C34, C35 |
| S108 다크 하이라이트 목록 | 배치: 어두운 녹색 강조·밝은 본문 / 표시값·입력: Highlighted 활성 / 상태: 하이라이트 대비 변경 — 위 D/V 처리 및 시각 잔여 적용 | T-F62-06 | U-S108, U-F62; C20, C29, C31, C37 |
| S109 비공개 변경 성공 안내 | 배치: 리스트 상세 위 검정 토스트 / 표시값·입력: About mindfulness is now private / 상태: 비공개 전환 안내 — 위 D/V 처리 및 시각 잔여 적용 | T-F49-04 | U-S109, U-F49; C28, C30, C31, C32, C33, C34, C35 |
| S114 리스트 삭제 확인 시트 | 배치: 하단 Delete list 설명·빨간 버튼 / 표시값·입력: 내 라이브러리와 타인 저장에서 제거, 원문 기사는 삭제하지 않는다는 안내 / 상태: 삭제 전 영향 확인 — 위 D/V 처리 및 시각 잔여 적용 | T-F47-03 | U-S114, U-F47; C28, C30, C31, C32, C33, C34, C35 |
| S121 리스트에서 기사 제거 | 배치: 상단 알림·대상 기사 사라짐 / 표시값·입력: This item has been removed from your list / 상태: 항목 제거와 되돌리기 제공 — 위 D/V 처리 및 시각 잔여 적용 | T-F50-02 | U-S121, U-F50; C28, C30, C31, C32, C33, C34, C35 |
| S145 저장한 하이라이트 목록 | 배치: Highlighted 탭·강조 구절·원문 제목·작성자 / 표시값·입력: Alex Smith highlighted / 상태: 여러 글의 개인 하이라이트 모음 — 위 D/V 처리 및 시각 잔여 적용 | T-F41-05 | U-S145, U-F41; C20, C29, C31, C37 |
| S155 리스트 이름 입력 | 배치: 동일 생성 폼 / 표시값·입력: About mindfulness 17/60, 설명 없음, Private 꺼짐 / 상태: 이름만 입력해 생성 가능 표시 — 위 D/V 처리 및 시각 잔여 적용 | T-F42-03 | U-S155, U-F42; C28, C30, C31, C32, C33, C34, C35 |
| S157 항목 순서 변경 | 배치: 4행의 위치 변경 / 표시값·입력: How Useful… → Mind Fullness or Emptiness? → Mind-Fullness → The Chimichurri… / 상태: 저장 전 새 순서 — 위 D/V 처리 및 시각 잔여 적용 | T-F51-04 | U-S157, U-F51; C28, C30, C31, C32, C33, C34, C35 |
| S172 저장 아이콘 활성 | 배치: 기사 상세 하단 북마크 채움 / 표시값·입력: 기사 내용·집계 유지 / 상태: 저장 선택 반영 — 위 D/V 처리 및 시각 잔여 적용 | T-F37-03 | U-S172, U-F37; C28 |
| S177 리스트 상세 스크롤 | 배치: 나머지 기사·읽기시간·날짜·메모 영역 / 표시값·입력: 동일 리스트 후반 항목 / 상태: 목록 후반 — 위 D/V 처리 및 시각 잔여 적용 | T-F45-01, T-F46-04 | U-S177, U-F45, U-F46; C28, C30, C31, C32, C33, C34, C35 |
| S191 메모 내용 입력 | 배치: 대상 기사 카드 위 입력란 / 표시값·입력: A very good explanation of mindfulness / 상태: 메모 제출 준비 — 위 D/V 처리 및 시각 잔여 적용 | T-F45-04 | U-S191, U-F45; C28, C30, C31, C32, C33, C34, C35 |
| S195 리스트 항목 메뉴 | 배치: 특정 기사 더보기 3행 팝오버 / 표시값·입력: Mind Fullness or Emptiness? 대상 / 상태: 항목별 관리 — 위 D/V 처리 및 시각 잔여 적용 | T-F45-02, T-F50-01 | U-S195, U-F45, U-F50; C28, C30, C31, C32, C33, C34, C35 |
| S200 리스트 항목 메모 폼 | 배치: Add note 시트·설명 입력·대상 기사 카드 / 표시값·입력: Add a brief description 빈값 / 상태: 메모 입력 전 — 위 D/V 처리 및 시각 잔여 적용 | T-F45-03 | U-S200, U-F45; C28, C30, C31, C32, C33, C34, C35 |

38개 배정 단계는 F37·F41·F42·F45~F51·F62의 해당 화면만 확인했다. F41 Digest 본문, F48 다운로드 진행/완료(S089/S165), F62 설정 자체를 이번 구현 범위로 확대하지 않았다. C01/02/03/09/20/28~38/53/58~61/65~67/70/71의 공통 접근성·상태·소유권·검증 경계도 적용한다.

## 원본 차이와 자체 정책·미확인

- S106은 14초의 빈 상세(상세에 No stories 없음), S011은 6초·4 stories, S077은 1초·4 stories/변경 순서의 독립 조건이다. 하나의 연속 실시간 조작 결과로 설명하지 않는다. Library 카드의 No stories는 그대로 유지한다.
- S077의 금색 회원용 별16px·다운로드 다음 위치, S002의 저장 메모 왼쪽 진한 선을 보완했다. 320에서는 제목/이미지가 세로 배치되고 metadata가 줄바꿈한다. 393/390에서는 가로 카드. 원본 iOS inset·서체·행 높이/아이콘/시트 좌표는 web과 차이가 있고 원본 폰트/vector 미확보다. 프로필은 원본 Alex 대신 mock A 이름/기본 아바타여서 정확한 동일 비교가 아니다.
- S056 Viewed는 다운로드 완료/회원용 별과 별개인 방문 기록. S058/108 Dark의 보유 자산 색은 임의 밝기 변환 없이 유지. 명암비 수치·색약·OS Dynamic Type은 미검증이다.
- S081의 View list 추가 메뉴·Highlighted의 Remove highlight·mock 계정/4단계 설명 등은 OWN_UI_POLICY의 자체 기능이다. 기존 원본 외 보완을 원본 관찰로 기록하지 않는다. 서버 정렬·동시 편집·실제 OAuth/DB/영속성·실제 오프라인은 구현/검증하지 않는다.
- U-S/U-F의 원본 미확인 질문은 모두 유지한다. 제목/설명 검증·Done 확정·취소·실패/재시도·다중 소속·메모/Undo·private/재공개·원문 생존·초안 수명은 위 자체 mock 계약/기존 회귀로 보완한다. 다운로드 캐시·중단·비행기 모드 질문은 묶음8 및 기존 Q08 경계. 실제 Medium 타기기/서버/OS 동작으로 승격하지 않는다.

## 두 차례 검토

1차: 28원본/R/T/U/C, D04/D11 누락과 D13 공급부, Library/Profile 호출부·목록/기사/계정 ID·기존 실패/경합 테스트를 대조했다. 초안이 남는 stack route를 수정했고 source timestamp·UI 표시·actual navigation 회귀를 추가했다.

2차: 전체 diff/호출부/기존 흐름을 다시 검토했다. ABA의 늦은 timestamp, content에 userId/listId가 섞이지 않는 경계, 만료 Undo 반환값, 웹 메모 포커스를 보완했다. source 쓰기/카탈로그 비교·스코프 변경·삭제/재시도·상대 시간 갱신 타이머와 별표/메모의 기사 ID 연결을 재확인했다. reference 없는 일반 예시 기사 SearchCard 경로도 active 키로 저장 시트를 폐기하도록 보완하고 실제 navigation 회귀를 추가했다. 타입/lint와 최종 전체 검사·브라우저를 아래에서 구분한다. navigation 전체 mock을 사용하지 않았다.

## 이번 검사 실행

Node `/opt/homebrew/bin/node` 24.10.0 사용(기본 shell22 대신 package engines>=24<25 충족; .nvmrc24.18.0과 실제 버전은 구분). 출력은 메모리에서 확인했으며 로그 파일을 저장하지 않았다.

| 검사 | 실제 결과 |
| --- | --- |
| 첫 focused | 6 suites/82 tests 중12실패: timestamp가 추가된 exact response와 Private 텍스트→접근성 잠금 쿼리의 기존 기대값. 의미를 유지해 갱신 |
| focused 재실행 | 8 suites/88 tests 통과 |
| 읽기 시간·별표·편집 focused | 4 suites/28 tests 통과 |
| lint 초기 | set-state-in-effect 1건 → render Date.now purity 1건. keyed metadata clock의 lazy 초기화/interval cleanup으로 수정; 규칙 disable 없음 |
| 첫 전체 | 298 suites 중296통과/2실패,1556 tests 중1554통과/2실패,517.822초. AuthNavigation의 정확한 `1개의 기사` label 기대 불일치. 개수+상대 시간의 접근성 label로 기대를 갱신 |
| 두 번째 전체 | 298 suites 중289통과/9실패,1558 tests 중1549통과/9실패. listEditing의 content 응답에 catalog user/list 키 포함 1건 및 8개 navigation timeout. Reporter18968.13초(일부 suite 수천 초)와 실제 프로세스 경과가 일치하지 않았고 다른 focused/export 병행도 있어 원인 확정 불가. current response에는 timestamp만 복사하도록 수정; timeout/skip/기대 약화 없이 최종 단독 재실행 |
| 추가 focused | AuthNavigation/listEditing/ListDetailMetadata 양 플랫폼6 suites/40 tests 통과,55.467초. 일반 카드 이탈 보완 후 ListEditingNavigation 양 플랫폼2 suites/14 tests 통과,12.643초 |
| 최종 typecheck/lint | 모두 exit0. 마지막 일반 기사 이탈 수명 수정까지 포함 |
| 세 번째 전체(포커스 수정 포함) | 298 suites 중296통과/2실패,1558 tests 중1556통과/2실패,864.585초. Android SearchScreen의 synchronous error 대기 및 ProfileScreen 늦은 실패 test5초 timeout. 기능 기대값/timeout 변경 없이 해당 파일 독립 진단 후 메모리 정리 옵션으로 전체 재검사 |
| 시간 초과 파일 독립 진단 | 같은 기대값/timeout, Node --expose-gc·Jest --logHeapUsage로 SearchScreen/ProfileScreen 양 플랫폼4 suites42 tests 통과,39.824초(단조 시계41.72초),heap109~153MB |
| GC 전체 중간 실행 | 시작 후 두 번째 검토에서 일반 예시 기사 SearchCard 경로의 저장 시트 이탈 누락을 추가 발견해 직접 중단(SIGTERM). 완료 검사로 세지 않음 |
| GC 전체 완료 실행 | 298 suites 중294통과/4실패,1560 tests 중1554통과/6실패. iOS SettingsScreen·ListeningNavigation·App·LibraryInteractions 시간 초과 및 Listening 후속 Missing auth. Reporter953.061초/단조 시계511.08초,heap 약200~334MB. GC만으로 해소되지 않아 원인을 메모리로 확정하지 않음 |
| 최종 전체(플랫폼 프로세스 분리) | iOS149 suites/780 tests 전부 통과,250.546초(단조 시계251.74초),act warning0. Android147/149 suites·776/780 tests 통과, AuthNavigation/ResponsesNavigation 4실패(timeout 및 후속 상태). Reporter5492.081초/단조 시계248.52초. iOS 성공 결과는 유지하고 아래 환경 보정 후 Android 전체 재실행 |
| iOS/Android export | 각 Hermes hbc 생성 exit0. 임시 build 디렉터리 제거. 마지막 포커스 수정 이후 재실행도 exit0; 마지막 일반 기사 scope 수정 이후 최종 재실행도 exit0(Android a4161545…,iOS 8edd2a46…); 모두 임시 출력 제거 |
| 환경 원인 확인 및 Android 재실행 | 검사 중 외부 Python 시계 감시에서 wall/monotonic 차이934.163·3165.328·1006.441·138.779초 관찰. `pmset -g log`에서 같은 기간 Sleep/DarkWake와09:10:34 lid/UserActivity Wake 확인. `caffeinate -i`를 Android Jest 명령에만 붙여 유휴 절전 방지(명령 종료 시 자동 해제), 같은 Node/기대값/timeout으로 Android149 suites/780 tests 전부 통과,262.399초(단조 시계263.65초),exit0. 이 실행에서 시계 불연속은 없었다. iOS 결과와 합계298 suites/1560 tests 통과 |
| diff/추적 | diff --check·JSON parse·28원본/ANALYSIS 경로·200원본 해시/과거 evidenceContext 보존·현재 codeInputs 해시 검사 통과 |

새 테스트는 ListDetailMetadata(14/6/1·분 경계·누락), ListMetadataParity(0/누락/양수와 true/false/미확인), source 시각/멱등/실패, 연속 편집·ABA, 실제 AppNavigator blur 초안(reference/일반 예시 기사 두 경로)이다. 기존 목록 실패/복구·Undo·delete·source/계정 전환·public access 및 AuthBoundary/Highlights navigation 회귀도 전체 검사에 포함한다. 7의 결과를 8 변경 뒤 검사로 재사용하지 않는다.

## 8081 실제 실행·플랫폼

기존8081 PID39311을 종료/교체하지 않았다. 새 headless Chrome/CDP에서 UI를 직접 조작했고 저장 캡처 없이 메모리에서 원본과 부분 대조했다. 고정 비교 clock2025-06-13T12:00Z,390×844/DPR1·320/393 보조 조건. 시각14/6/1초는 각각 별도 display clock 조건이다. 초기 비교 목록의4개 기사만 기존 store로 준비했고 생성/편집/취소/삭제/저장·순서/계정 전환은 UI에서 수행했다. fixture 준비와 UI 행동을 구분한다.

- Library 빈 상태/5탭·배너 닫기, 새 목록, 빈 상세14초,4글 상세, 드래그 취소/접근성 이동 Done, 메모 저장/수정 취소/재진입, Remove/Undo의 메모·순서 복원을 확인했다.
- Save to 임시 선택/취소/Done, 하위 새 목록 생성 전후 부모 확정, 다중 소속과 목록 삭제 취소/확정 및 Reading list/다른 목록 보존을 확인했다.
- 이름/설명 저장 실패를 현재 브라우저 source에 1회 주입해 입력 보존/Retry 성공 후 원래 함수를 복원했다. private 확인 취소/확정·잠금·공유 아이콘 잔존과 A→B→A의 B 빈 목록/A 확정 순서·메모 보존을 확인했다.
- 추가로 A의 메모 저장을 pending 상태로 보류→Close→로그아웃→B 로그인→늦은 A 실패→A 복귀를 실제 UI에서 확인했다. B는 빈 개인 목록/오류·초안 없음, A는 원래 메모·순서/시각 복원·failure=null이었다. source 함수를 원래 값으로 복원했다.
- 메모 취소 뒤 포커스가 body로 빠지는 결함을 재현·수정하고 실제 trigger.focus→열기→Cancel→같은 trigger 복귀를 확인했다. 최종 코드에서 Save to→새 목록의 이름 입력 포커스가 새 dialog 안에 있으며 Cancel 후 Save to 복귀·닫기도 재확인했다. Escape/닫기·목록 스크롤·기사 진입/복귀를 확인했다. 합성 한글 입력은 OS IME 검증이 아니다.
- Light/Dark320/393 카드의 별표·읽기 시간·날짜·저장/더보기 겹침 없이 줄바꿈, 가로 overflow 없음. 상세의 보이는 button48px 검사에서 작은 대상0. CSS 글자150%/320 폭 진단에서도 가로 overflow 없이 줄바꿈했다. 이 결과는 OS 글자 확대 검증이 아니다. 61자 이름·281자 설명에서 Create disabled도 확인했다.
- Highlighted는 실제 기사 SelectionDocument의 유효 구간을 기존 store에 준비한 뒤 Library→Highlighted→원문 버튼을 직접 눌러 같은 기사/강조로 진입했다. 원본 S145의 인용/소유자 fixture와는 다른 데이터이며 선택 생성 UI 전체 검증으로 세지 않는다.
- 앱 console.error/unhandled/window error0. 브라우저 조작 selector/타이밍 오류와 Chrome headless의 CVDisplayLink host 메시지는 앱 오류로 합산하지 않는다.
- iOS: CLT만 설치, `xcrun simctl` exit72, `xcodebuild -version` exit1. Xcode/simulator/실기기 필요. Android: adb/SDK/ANDROID_HOME 없음(JDK23 설치). Android SDK·emulator/실기기 필요. native build/install/run·Safe Area 실기기·OS 큰 글자·VoiceOver/TalkBack·실제 키보드/한글조합은 대기다. JS/Hermes/Jest/web을 native 검증이라고 하지 않는다.

## 수동 추적 갱신과 파일 제한

EXECUTION_PLAN 상단/묶음7 상태, BACKLOG D/V, 대상 REQUIREMENTS/FLOWS/CONTRACTS/UNKNOWN/COMPARISON_BASELINE, comparisonBaseline.json의 latestReview/코드 해시와 관련 현재 상태 문서를 직접 갱신한다. 기존 evidenceContext/currentEvidence·원본 해시/이력은 보존한다. tools의 comparisonProfiles/executionBatches/currentEvidence 입력은 수정하지 않으므로 이 수동 갱신과 자동 생성 원본은 다르며 생성기 재실행 시 되돌아갈 수 있다. `readiness=recipe-only`를 시각 ready로 승격하지 않는다.

tools/evidence/비교 캡처/검증 로그/검증용 manifest/별도 검증 도구·스크립트 폴더는 생성·수정하지 않았다. inline 명령과 브라우저 임시 profile, 임시 Expo build 출력만 사용하며 build 출력은 제거한다. 코드의 preview 장애 기본값은 바꾸지 않았다. 백엔드·인증·외부 서비스·의존성 추가 없음.

## 8081 최종 확인 순서

1. Library에서 mock A 로그인, 온보딩이 열리면 닫기. New list로 제목/선택 설명 입력·Cancel·재생성. 빈 상세는 시간만, Library 카드는 No stories 확인.
2. 검색/기사의 Save to에서 Reading list와 내 목록 선택. 취소 후 소속 유지, Done 후 두 소속 확인. Create new list 뒤에도 부모 Done 전에 기사 소속이 확정되지 않음 확인.
3. 내 목록에서 Add a note→저장→수정 취소. 확인된 읽기 시간만 표시. 회원용 글을 포함한 목록에서 별표·재정렬 전후 기사 ID 확인.
4. 메뉴 Reorder items→드래그/이동→Cancel, 다시 변경→Done. 메모/기사 수·새 상대 시간 확인. 제거→Undo로 메모·인접 위치 복원.
5. Edit list info로 이름/설명, Make private 경고 취소·확정/잠금·Share 잔존, Delete 취소·확정. 다른 목록과 원문은 유지됨 확인.
6. Highlighted→원문→복귀, Reading history/Saved lists/Digest 탭 연결. Light/Dark320/393에서 카드·시트·키보드 포커스·48px 대상 확인.
7. 미저장 메모/이름/정렬/Save to 상태에서 화면 이탈 후 재진입. 로그아웃→B→A에서 개인 데이터·초안 격리. 전체 새로고침은 기존 메모리 정책에 따라 초기화.

필수 자동 검사와 가능한 브라우저 점검을 완료했다. 해결 가능한 검토 지적을 수정했고 장애 주입을 복원했으며 파일 제한을 확인했다. 원본 자산/미확인·native 대기는 묶음8을 막지 않는 명시적 잔여다. 이 묶음만 로컬 커밋한다. 사용자 사전 승인에 따라 성공 해시를 확인한 뒤 묶음8로 진행한다. push·배포·amend 없음.

<a id="additional-review"></a>

## 묶음7·8 전수 재검토 — 2026-11-24

사용자의 “검토해줘 전부” 요청에 따라 `41aebaa`의 FE 변경 전체와 묶음8 미커밋 변경, 공유 컴포넌트의 Library/Profile/발행 reader 호출부를 다시 자체 검토했다. D04/D11/D13, V22/V24/V25의 28화면·38단계 배정과 기존 판정표를 실제 코드에 대조했고, 아래 누락을 수정했다. 새로운 Goal 구현이나 원본 미확인 정책 확정은 하지 않았다.

| 발견 사항 | 재현·영향 | 원인·수정 |
| --- | --- | --- |
| P2 내 목록 응답 초안 잔류 | List responses 입력→다른 탭으로 이동→복귀·다시 열기에서 이전 초안 표시 | ReadingListScreen의 ResponseButton에 active 전달 누락. 실제 navigation 회귀에서 빈 초안을 확인 |
| P2 프로필 목록 편집 창 잔류 | Profile→Lists→목록 이름 편집→탭 이탈/복귀에서 미제출 이름과 시트 복원 | ProfileScreen→ProfileLists→기본/사용자 LibraryListCard에 focus 전달. 같은 카드의 다운로드 멤버십 시트도 이 수명 적용 |
| 검증 누락 | 기존 Save to 부재 검사가 native 대역에 없는 dialog 역할을 조회해 열린 창을 놓침 | 실제 존재하는 Save to heading을 열기 전에 확인하고 이탈 후 부재를 검사. 저장 소속 불변도 함께 확인 |

발행 글의 북마크·더보기 Save to 및 프로필 응답에서 같은 focus 누락도 발견해 공통 호출 계약을 연결했다. 발행 본문/프로필 카드의 세 진입점은 컴포넌트 회귀, 프로필의 응답·메뉴 저장은 실제 SessionNavigation 회귀로 검증했다. 상세 결과와 묶음8 사본 결함은 [추가 검토 결과](FE_MEDIUM_PARITY_08_RESULT.md#additional-review)에 함께 기록한다.

1차 재검토에서 실제 실패를 재현한 뒤 수정했고, 2차에서는 Profile을 포함한 모든 LibraryListCard/WrittenStoryBookmark/WrittenStoryMenu 호출부, source 교체/인증 수명, 확정 저장과 초안 폐기 경계를 다시 확인했다. 메모·재정렬·상대 시간·별표·권한/Undo의 기존 계약을 변경하지 않았다. 독립 리뷰어를 사용한 검토가 아니다.

8081에서는 내 목록 응답 입력→실제 navigation으로 탭 변경→복귀/새로 열기의 빈 입력, Profile Lists의 미제출 이름 폐기를 확인했다. 모달 뒤의 경로 이탈은 런타임에서 navigation을 유발한 제어 사례이며 native 제스처 검증이 아니다. 320/393 Light/Dark의 카드 메타데이터·48px 영역을 다시 확인했다. 이번에는 새 동일 fixture 28장 전수 비교를 수행했다고 하지 않는다. 기존 원본 차이·미확인·native 대기를 유지한다.

추가 변경 파일: `ReadingListScreen.tsx`, `ProfileScreen.tsx`, `ProfileLists.tsx`, `ListEditingNavigation.test.tsx` 및 해당 결과/추적 문서. 발행 소비자·다운로드와 전체 검사 결과는 묶음8 추가 검토 절에 모았다. 기존 묶음7 커밋은 보존하며 이 추가 수정의 커밋은 수행하지 않는다.
