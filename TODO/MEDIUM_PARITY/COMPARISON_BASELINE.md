# Medium Parity — 200개 화면 비교 조건

**묶음7·8 추가 검토:** [결과](../FE_MEDIUM_PARITY_08_RESULT.md#additional-review). 전체302 suites/1590 tests 통과, 목록/프로필/발행 저장·응답 이탈과 비활성 사본 철회 보완. 새 캡처 파일 없이 일부 화면을 메모리에서 대조했다. 기존 원본 R/T/U/C·evidence 이력과 recipe-only 판정은 유지하며 동일 fixture 전수 비교로 승격하지 않는다. 코드 해시는 수동 갱신했다.

[Parity 1 결과](../FE_MEDIUM_PARITY_01_RESULT.md) · [Parity 2 결과](../FE_MEDIUM_PARITY_02_RESULT.md) · [실행 계획](EXECUTION_PLAN.md) · [기계 판독 원본](comparisonBaseline.json) · [공통 기준](COMPARISON_PROTOCOL.md)

최초 자동 생성: `python tools/medium-parity/buildBaseline.py --write`. 요구사항 원문과 수동 작성한 비교 profile을 결합한다. 경로는 현재 코드의 조사·재현 절차이며 200개 실제 실행 통과 기록이 아니다. `recipe-only`는 비교 준비 완료가 아니다. 계정·시간·권한은 비교용 기본안이며 원본 실제 계정/촬영시각을 추정하지 않는다. 아래 currentEvidence 필드는 호환을 위해 유지한 Parity 1 당시 증거다. 현재 코드 해시와 과거 촬영 코드가 같다는 뜻이 아니다. Parity 2의 당시 전후·회귀 기록은 해당 결과 문서를 따른다. 사용자 커밋 6853256에서 기존 EVIDENCE 파일이 삭제됐으며 복원하지 않는다. Parity 5는 사용자 지시로 캡처·manifest를 저장하지 않고 결과 문서만 갱신한다. 입력의 null SHA는 삭제된 과거 capture log이며 현재 무결성 통과가 아니다.

**Parity 6 수동 갱신:** 사용자 지시에 따라 tools를 수정·실행해 생성물을 덮어쓰지 않고 S096/S116/S132/S193의 이번 결과를 직접 연결했다. [결과](../FE_MEDIUM_PARITY_06_RESULT.md). 캡처·manifest를 저장하지 않아 ready/current-web-capture로 승격하지 않는다. tools의 기존 profile/batch 원본에는 묶음6 미착수·June8 불일치라는 당시 값이 남아 재생성 시 이 수동 갱신을 보존해야 한다.

<a id="s001"></a>

## S001 — 타인 하이라이트 숨김

[원본 PNG](<../../medium/flows/Home/Story detail/Changing display/screens/07_sc_00409287a68f4416941e39326f6df6b9.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s001>) · `sc_00409287a68f4416941e39326f6df6b9`

- 담당: V16 / 묶음 4. 상태: **historical-web-capture-parity-01**. Parity 1 당시 관찰: others 토글 off 확인; 강조 데이터 삭제 여부는 이번 검증 대상 아님; 배경·서체·반응 집계 차이 유지.; 현재 공통 보정과 잔여는 Parity 2 결과 참조; Parity 4 새 실행은 latestReview 참조; 과거 캡처를 현재 코드 증거로 승격하지 않음
- 실제 FE 진입 절차(정적 확인): Article 더보기 → Display settings → 100/120%, font, appearance, highlights
- Parity 1 당시 증거: [과거 웹 캡처](<EVIDENCE/PARITY_01/S001.png>). 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ArticleDisplayPopover.tsx](<../../FE/src/features/settings/ArticleDisplayPopover.tsx>), [useReaderTypography.ts](<../../FE/src/features/settings/useReaderTypography.ts>)
- 계정·권한: reader 설정 A; 앱 전역 theme와 별도
- fixture 구성: DisplaySettingsSource; S063 기본관찰값, S125=120%, S198=Dark120%, S001=others off
- 원본 관찰 표시값: 표시값·입력: Highlights from others 꺼짐
- 원본 관찰 상태: 상태: 타인 하이라이트 표시 설정 변경
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 다크 설정 팝오버 토글 회색
- 테마: Dark 관찰; 앱/reader 각각 설정; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F24-07 / U-S001, U-F24 / C02, C12, C13. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 100→120과 배경 제목 줄바꿈, Font family 행, Appearance 하위 선택, 타인 Highlight on/off와 어두운 팝오버를 비교한다. 본인 저장 강조 삭제와 분리한다.

<a id="s002"></a>

## S002 — 리스트 메모 반영

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/List detail/Adding a note/screens/05_sc_02d96a649c7a461b9c07155d33c1dbfc.png>) · [원본 분석](<../../medium/flows/Library/List detail/Adding a note/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s002>) · `sc_02d96a649c7a461b9c07155d33c1dbfc`

- 담당: V25 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>)
- 계정·권한: A 소유; 기본 reading-list와 일반 About mindfulness 구분
- fixture 구성: UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; D13 source 확정 updatedAt(Parity7 자체 계약)
- 원본 관찰 표시값: 표시값·입력: 입력한 메모 표시
- 원본 관찰 상태: 상태: 메모 저장 결과 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 대상 기사 위 세로선·이탤릭 메모
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F45-05 / U-S002, U-F45 / C28, C30, C31, C32, C33, C34, C35. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

<a id="s003"></a>

## S003 — 플레이어 더보기

[원본 PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/02_sc_0414c81870534989959d677ecede926c.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s003>) · `sc_0414c81870534989959d677ecede926c`

- 담당: V19 / 묶음 12. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): 확장 플레이어 → Speed 또는 더보기 → Select a voice → 언어 스크롤·Hans → Done
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListeningSpeedPanel.tsx](<../../FE/src/features/listening/ListeningSpeedPanel.tsx>), [ListeningVoicePanel.tsx](<../../FE/src/features/listening/ListeningVoicePanel.tsx>)
- 계정·권한: A; 권한과 현재 선택을 별도 설정
- fixture 구성: ListeningOptionsSource; Emma/Hans, 1x200WPM·2.5x490WPM은 관찰값 fixture
- 원본 관찰 표시값: 표시값·입력: 현재 1x
- 원본 관찰 상태: 상태: 음성·출력·콘텐츠 행동 메뉴
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 재생기 위 6행 팝오버
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F28-02 / U-S003, U-F28 / C59, C60, C61. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 세로 slider·1x/200 WPM·2.5x/490 WPM·145% 문구, voice 언어 section/국기/성별/나라/선택색, Emma→Hans와 Done, 더보기6행을 비교한다.

<a id="s004"></a>

## S004 — 검색 진입과 토픽 탐색

[원본 PNG](<../../medium/flows/Explore/Searching Medium/screens/02_sc_047c91d900aa47448d61e4faacd68ad5.png>) · [원본 분석](<../../medium/flows/Explore/Searching Medium/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s004>) · `sc_047c91d900aa47448d61e4faacd68ad5`

- 담당: V02 / 묶음 17. 상태: **historical-web-capture-parity-01**. Parity 1 당시 관찰: 빈 검색과 토픽 목록 진입. 원본에 없는 한국어 금융 토픽과 focus 밑줄·글자/간격 차이; Q12와 V02.; 현재 공통 보정과 잔여는 Parity 2 결과 참조
- 실제 FE 진입 절차(정적 확인): Main/Explore → 검색 진입·Mindfulness 입력·Stories; Staff Picks/Who to follow 위치까지 세로·가로 이동
- Parity 1 당시 증거: [과거 웹 캡처](<EVIDENCE/PARITY_01/S004.png>). 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [CatalogSearchResults.tsx](<../../FE/src/features/search/CatalogSearchResults.tsx>), [ExploreSections.tsx](<../../FE/src/features/search/ExploreSections.tsx>), [SearchScreen.tsx](<../../FE/src/features/search/SearchScreen.tsx>)
- 계정·권한: 공개 열람; 관계 조작은 A
- fixture 구성: mediumFeedFixtures / SearchScreen·CatalogSearchResults; 칩·캐러셀 위치는 화면별 설정
- 원본 관찰 표시값: 표시값·입력: Life·Self Improvement·Work·Technology 등
- 원본 관찰 상태: 상태: 검색어 없는 탐색 화면
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 검색창 아래 Explore topics 세로 목록
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F02-02 / U-S004, U-F02 / C06, C07. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 검색 빈 화면의 토픽 행, Stories 결과, 다섯 탭과 X를 분리한다. Trending 순위, Staff Picks 가로 카드, Recommended 세로 카드, Who to follow 가로 이동을 원본 상태별로 비교한다.

<a id="s005"></a>

## S005 — 프로필 사진 선택 반영

[원본 PNG](<../../medium/flows/Profile/Editing profile information/Adding pronouns/screens/01_sc_05df03a16c6b466b8ba91d9d6244c2f5.png>) · [원본 분석](<../../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s005>) · `sc_05df03a16c6b466b8ba91d9d6244c2f5`

- 담당: V32 / 묶음 15. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>)
- 계정·권한: A 소유; 표시 이름 Alex Smith와 userId는 별개
- fixture 구성: ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도
- 원본 관찰 표시값: 표시값·입력: 이름 유지·대명사와 소개 빈값
- 원본 관찰 상태: 상태: 선택 사진 미리보기
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 편집 폼 아바타 변경
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F56-01, T-F57-05 / U-S005, U-F56, U-F57 / C51, C52, C53. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

<a id="s006"></a>

## S006 — 관심 주제 다중 선택

[원본 PNG](<../../medium/flows/Onboarding/screens/09_sc_05f2a886f5464a728dd61a6291707a3d.png>) · [원본 분석](<../../medium/flows/Onboarding/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s006>) · `sc_05f2a886f5464a728dd61a6291707a3d`

- 담당: V30 / 묶음 14. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): guest signup → Onboarding → interests → recommendations → permission → welcome; S043은 실제 cold start
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [OnboardingScreen.tsx](<../../FE/src/features/onboarding/OnboardingScreen.tsx>), [createOnboardingSession.ts](<../../FE/src/features/onboarding/createOnboardingSession.ts>)
- 계정·권한: 신규 A; 기존 A와 분리된 새 메모리 세션
- fixture 구성: OnboardingSource·NotificationPermissionSource; 관심5개/추천Follow/안내 상태; S043 대응 splash 없음
- 원본 관찰 표시값: 표시값·입력: Technology·Self Improvement·Writing·Relationships·Psychology가 선택되어 있다.
- 원본 관찰 상태: 상태: 5개 주제 선택과 진행 버튼 변화가 관찰된다.
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 동일 칩 목록에서 선택 항목이 녹색으로 채워진다.
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F53-09 / U-S006, U-F53 / C49, C50. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 브랜드 시작, 새 경험 소개, 최소3개 안내와 관찰5개 선택, Follow/Finish, Enable/Skip와 다음 목적지를 확인한다. 모든 계정에 동일 순서를 강제하지 않는다.

<a id="s007"></a>

## S007 — 박수 전송 피드백

[원본 PNG](<../../medium/flows/Home/Story detail/Sending claps/screens/02_sc_0629a27b99a645cabe6e110b5d3d3d57.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Sending claps/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s007>) · `sc_0629a27b99a645cabe6e110b5d3d3d57`

- 담당: V13 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Home/Explore 기사 → Article(articleId); 본문·말미·응답 미리보기까지 스크롤; 박수 조작
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ArticleDetailScreen.tsx](<../../FE/src/features/article/ArticleDetailScreen.tsx>), [ReferenceArticleView.tsx](<../../FE/src/features/article/ReferenceArticleView.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>)
- 계정·권한: 공개 읽기와 회원 제한 상태 분리; 반응은 A
- fixture 구성: medium-brain 기본 기사; F16의834와 박수 흐름832는 독립 response fixture
- 원본 관찰 표시값: 표시값·입력: 18K 집계, 응답 832
- 원본 관찰 상태: 상태: 박수 입력 피드백 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 기사 하단 박수 위 녹색 +16 애니메이션
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F38-02 / U-S007, U-F38 / C09, C10, C11, C12. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 제목/부제/작가/읽기시간/표지 출처, 본문 강조·링크·삽입 이미지·토픽·작성자·응답 미리보기·관련 글·고정 반응 바를 각각 비교한다. +16은 입력 피드백이며 터치 횟수 증거가 아니다.

<a id="s008"></a>

## S008 — Medium Rules 정책 문서

[원본 PNG](<../../medium/flows/Home/Story detail/Responses/Medium policy/screens/02_sc_063290fab51b4acd913212f85acde70d.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Medium policy/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s008>) · `sc_063290fab51b4acd913212f85acde70d`

- 담당: V21 / 묶음 3. 상태: **recipe-only**. Parity 3에서 기사 구조·mock 도구·복귀를 실행했다. V21 자산/서체/272 재현 잔여와 U 미확인을 유지한다.; 후속 Parity 3의 연결 검증/새 캡처는 FE_MEDIUM_PARITY_03_RESULT.md 참조. 과거 캡처와 별도이며 원본 동일성 통과 아님; Parity 4 새 실행은 latestReview 참조; 과거 캡처를 현재 코드 증거로 승격하지 않음
- 실제 FE 진입 절차(정적 확인): Article → Responses/본문 shield → PolicyArticle → 원래 응답/기사 복귀; 저장 후 Library → PolicyArticleScreen 재열기
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ResponsePolicyLink.tsx](<../../FE/src/features/responses/ResponsePolicyLink.tsx>), [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>)
- 계정·권한: 공개 정책 읽기; 기존 차단 정책 적용; 팔로우/박수/저장/작성은 mock A, guest 로그인 후 재행동
- fixture 구성: medium-rules/medium-policy-author; 보이는 2문단과 세 번째 문단 시작/54K 초기 박수; 실제 mock 응답 0→1, 원본272와 차이 유지
- 원본 관찰 표시값: 표시값·입력: 문서 표시일 May 26 2021, 11 min read
- 원본 관찰 상태: 상태: 응답에서 연결된 정책 읽기
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Medium Policy 헤더·문서 제목·작성자·본문
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F34-02 / U-S008, U-F34 / C14. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: S008에서 보이는 정책 기사 헤더·작성자·Follow·본문 강조·세 번째 문단 시작·상하단 도구를 개별 재현한다. 정책 전문의 미확인 영역과 보이는 요소의 누락을 혼동하지 않는다.

<a id="s009"></a>

## S009 — 기존 응답 편집 입력

[원본 PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/screens/03_sc_0817971af7f14028a36fd2a233dd5ee7.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s009>) · `sc_0817971af7f14028a36fd2a233dd5ee7`

- 담당: V20 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>)
- 계정·권한: A를 작성자 YOU에 대응; 본인/타인 응답 분리
- fixture 구성: ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태
- 원본 관찰 표시값: 표시값·입력: Replying to Alex Smith 표시, 기존 내용 채움
- 원본 관찰 상태: 상태: 편집 흐름이나 UI 문구는 Replying
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 기존 응답 회색 강조, 키보드·기존 문장 입력창
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 보임 관찰; web은 OS 키보드 비동등
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F33-03 / U-S009, U-F33 / C14, C15, C16, C17, C18, C20. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

<a id="s010"></a>

## S010 — 응답 수정 내용 입력

[원본 PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/screens/04_sc_0950e3a03f7e4b02b9db0d98f818bdea.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s010>) · `sc_0950e3a03f7e4b02b9db0d98f818bdea`

- 담당: V20 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>)
- 계정·권한: A를 작성자 YOU에 대응; 본인/타인 응답 분리
- fixture 구성: ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태
- 원본 관찰 표시값: 표시값·입력: 기존 문장 끝 하트 3개 추가
- 원본 관찰 상태: 상태: 수정 제출 전
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 같은 입력창·키보드
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 보임 관찰; web은 OS 키보드 비동등
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F33-04 / U-S010, U-F33 / C14, C15, C16, C17, C18, C20. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

<a id="s011"></a>

## S011 — 내 리스트 상세 항목

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/List detail/screens/03_sc_0b1e7b64b9f14f2cb5358161e0f67a94.png>) · [원본 분석](<../../medium/flows/Library/List detail/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s011>) · `sc_0b1e7b64b9f14f2cb5358161e0f67a94`

- 담당: V25 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>)
- 계정·권한: A 소유; 기본 reading-list와 일반 About mindfulness 구분
- fixture 구성: UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; D13 source 확정 updatedAt(Parity7 자체 계약)
- 원본 관찰 표시값: 표시값·입력: 4 stories, 저장 아이콘 채움
- 원본 관찰 상태: 상태: 리스트에 글 4개
- 시간: 목록 표시6초+4개; S106과 독립 snapshot/D13
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 4개 글 중 상위 2개·각 항목 Add a note
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F46-03, T-F47-01, T-F48-01, T-F49-01, T-F51-01 / U-S011, U-F46, U-F47, U-F48, U-F49, U-F51 / C28, C30, C31, C32, C33, C34, C35. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

<a id="s012"></a>

## S012 — 구절 하이라이트 반영

[원본 PNG](<../../medium/flows/Home/Story detail/Highlighting a phrase/screens/03_sc_0da01c48dbc9483798e4c2286a11237f.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Highlighting a phrase/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s012>) · `sc_0da01c48dbc9483798e4c2286a11237f`

- 담당: V17 / 묶음 11. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article 본문 구절 선택 → Highlight/Respond/Share → 강조 표시
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [NativePassagePicker.tsx](<../../FE/src/features/highlights/NativePassagePicker.tsx>), [PassageReader.tsx](<../../FE/src/features/highlights/PassageReader.tsx>)
- 계정·권한: A 개인 강조; 타인 강조 표시와 구분
- fixture 구성: HighlightSource + 본문 version/UTF16 범위; native는 별도 Select a passage로 D09 차이
- 원본 관찰 표시값: 표시값·입력: 선택했던 구절 강조
- 원본 관찰 상태: 상태: 하이라이트 적용 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 선택 핸들·메뉴 없이 연녹색 강조 유지
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F25-03 / U-S012, U-F25 / C19, C20. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 원본 본문 위 시작/끝 핸들과 선택 영역·플로팅 Highlight/Respond/Share/더보기, 메뉴 종료 후 강조 잔존을 확인한다. 별도 선택 화면은 동일 조작 완료가 아니다.

<a id="s013"></a>

## S013 — 이메일 인증 코드 입력 대기

[원본 PNG](<../../medium/flows/Logging in/screens/05_sc_10e0a1c6f1154b3b85f8d5ed18b692d7.png>) · [원본 분석](<../../medium/flows/Logging in/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s013>) · `sc_10e0a1c6f1154b3b85f8d5ed18b692d7`

- 담당: V29 / 묶음 14. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile 또는 Library guest → AuthDialogs → 이메일 signup/login/code; Profile/Settings → Sign out
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [AuthDialogs.tsx](<../../FE/src/features/auth/AuthDialogs.tsx>), [EmailLogin.tsx](<../../FE/src/features/auth/EmailLogin.tsx>), [createEmailAttempt.ts](<../../FE/src/features/auth/createEmailAttempt.ts>)
- 계정·권한: guest→A 모의 인증; 기존 세션 로그아웃은 A 시작
- fixture 구성: mockUsers + emailAuthSource; 개인정보·원본 인증코드 복사 없이 합성 테스트값 사용
- 원본 관찰 표시값: 표시값·입력: 샘플 계정 이메일을 대상으로 빈 코드 여섯 칸이 보인다. 이 화면은 가입과 로그인 흐름에 공통으로 수록되어 있다.
- 원본 관찰 상태: 상태: 코드 미입력 상태다.
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 닫기 X가 있는 전면 시트에 인증 안내와 여섯 칸 입력란이 배치된다.
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F52-05, T-F53-05 / U-S013, U-F52, U-F53 / C46, C47, C48, C67. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 가입4/로그인5 제공자, 이메일/이름/약관/뒤로·6칸 코드와Validate·Resend·닫기, Sign out Cancel/Confirm→intro를 비교한다. 빈 폼의 녹색 버튼과 실제 입력 검증은 별개다.

<a id="s014"></a>

## S014 — 큐레이션 리스트 상세

[원본 PNG](<../../medium/flows/Explore/Topic detail/Browse curated list/screens/04_sc_15a122b14ac84b3d80c37fb84dfae4c7.png>) · [원본 분석](<../../medium/flows/Explore/Topic detail/Browse curated list/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s014>) · `sc_15a122b14ac84b3d80c37fb84dfae4c7`

- 담당: V04 / 묶음 17. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Topic → 큐레이션 카드 → PublicList(listId); S135는 More from Medium Staff까지 스크롤
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ArticleBookmarkControl.tsx](<../../FE/src/features/bookmarks/ArticleBookmarkControl.tsx>), [PublicListScreen.tsx](<../../FE/src/features/public-lists/PublicListScreen.tsx>), [PublicListStoryCard.tsx](<../../FE/src/features/public-lists/PublicListStoryCard.tsx>), [SavePublicListControl.tsx](<../../FE/src/features/public-lists/SavePublicListControl.tsx>)
- 계정·권한: 공개 목록; 저장·반응은 A
- fixture 구성: publicListFixtures / PublicListSource; 8 stories·108 saves 원본 상태를 별도로 대조
- 원본 관찰 표시값: 표시값·입력: 8 stories, 108 saves, Medium Staff
- 원본 관찰 상태: 상태: 공개 리스트 읽기
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 소유자·날짜·제목·설명·기사 목록·부유 반응 바
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F04-04 / U-S014, U-F04 / C29, C30. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 목록 전체 Save와 개별 기사 저장, 목록 박수·응답·Share를 구분한다. 8 stories/108 saves와 98 claps/1 response는 비교 화면 데이터이며 현재 사용자 수를 위조하지 않는다.

<a id="s015"></a>

## S015 — 멘션 대상 삽입

[원본 PNG](<../../medium/flows/Home/Publishing a story/Mentioning a user/screens/04_sc_15dd105a441c426ca638b4db6cb30997.png>) · [원본 분석](<../../medium/flows/Home/Publishing a story/Mentioning a user/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s015>) · `sc_15dd105a441c426ca638b4db6cb30997`

- 담당: V10 / 묶음 9. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Editor 본문 @ → samlee → 후보 선택 → Sam Lee 삽입
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [DocumentReader.tsx](<../../FE/src/features/editor/DocumentReader.tsx>), [MentionSuggestions.tsx](<../../FE/src/features/editor/MentionSuggestions.tsx>)
- 계정·권한: A 소유 초안
- fixture 구성: mention 검색 source와 문서 snapshot; S015 문자열 위치·키보드 별도
- 원본 관찰 표시값: 표시값·입력: 이름 링크처럼 표시
- 원본 관찰 상태: 상태: 멘션 후보 선택 반영
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 검색 결과 대신 녹색 Sam Lee 텍스트
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F11-04 / U-S015, U-F11 / C43. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: @만 있는 안내, samlee 검색의 이름·아바타·핸들 세 행, 녹색 이름 삽입과 커서·툴바·키보드 위치를 비교한다. 실제 알림 발송은 별도다.

<a id="s016"></a>

## S016 — 재생 속도 선택 초기

[원본 PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/screens/02_sc_1965b9529b534e1597968039af1415b1.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s016>) · `sc_1965b9529b534e1597968039af1415b1`

- 담당: V19 / 묶음 12. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): 확장 플레이어 → Speed 또는 더보기 → Select a voice → 언어 스크롤·Hans → Done
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListeningSpeedPanel.tsx](<../../FE/src/features/listening/ListeningSpeedPanel.tsx>), [ListeningVoicePanel.tsx](<../../FE/src/features/listening/ListeningVoicePanel.tsx>)
- 계정·권한: A; 권한과 현재 선택을 별도 설정
- fixture 구성: ListeningOptionsSource; Emma/Hans, 1x200WPM·2.5x490WPM은 관찰값 fixture
- 원본 관찰 표시값: 표시값·입력: 1x, 200 WPM
- 원본 관찰 상태: 상태: 현재 속도 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Select Speed 시트, 세로 슬라이더·등급 안내
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F27-02 / U-S016, U-F27 / C59, C60, C61. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 세로 slider·1x/200 WPM·2.5x/490 WPM·145% 문구, voice 언어 section/국기/성별/나라/선택색, Emma→Hans와 Done, 더보기6행을 비교한다.

<a id="s017"></a>

## S017 — 구분선 삽입과 이미지 선택

[원본 PNG](<../../medium/flows/Home/Publishing a story/Changing text format/screens/05_sc_19b2bef0854047f5b17cfeca07781ca5.png>) · [원본 분석](<../../medium/flows/Home/Publishing a story/Changing text format/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s017>) · `sc_19b2bef0854047f5b17cfeca07781ca5`

- 담당: V07 / 묶음 9. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Home 작성 → Editor; 제목·본문 입력 → 해당 서식·이미지 블록 선택
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [RichDocumentBody.tsx](<../../FE/src/features/editor/RichDocumentBody.tsx>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>), [editorModel.ts](<../../FE/src/features/editor/editorModel.ts>)
- 계정·권한: A 소유 초안; 같은 draftId 유지
- fixture 구성: DraftSource·EditorSession; 음악 제목/단락/인용/목록/구분선은 각 S의 문서 snapshot 별도
- 원본 관찰 표시값: 표시값·입력: 사진 블록 선택
- 원본 관찰 상태: 상태: 블록 구분선 노출
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 목록 아래 점 3개 구분선, 이미지 녹색 테두리
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F09-05 / U-S017, U-F09 / C40. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 제목과 본문, 회색 문자 스타일, 이탤릭 인용선, bullet, 점3개 구분선, 선택 중 도구 색과 키보드 위 툴바를 비교한다. 코드 도구의 실행 후 모습은 원본 미확인이다.

<a id="s018"></a>

## S018 — 글머리 목록 적용

[원본 PNG](<../../medium/flows/Home/Publishing a story/Changing text format/screens/04_sc_1b0cd82ee04a4c8c9d52b9a2d088823b.png>) · [원본 분석](<../../medium/flows/Home/Publishing a story/Changing text format/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s018>) · `sc_1b0cd82ee04a4c8c9d52b9a2d088823b`

- 담당: V07 / 묶음 9. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Home 작성 → Editor; 제목·본문 입력 → 해당 서식·이미지 블록 선택
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [RichDocumentBody.tsx](<../../FE/src/features/editor/RichDocumentBody.tsx>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>), [editorModel.ts](<../../FE/src/features/editor/editorModel.ts>)
- 계정·권한: A 소유 초안; 같은 draftId 유지
- fixture 구성: DraftSource·EditorSession; 음악 제목/단락/인용/목록/구분선은 각 S의 문서 snapshot 별도
- 원본 관찰 표시값: 표시값·입력: 단일 목록 항목
- 원본 관찰 상태: 상태: 글머리 목록 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 단락 앞 점과 들여쓰기, 목록 도구 녹색
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F09-04 / U-S018, U-F09 / C40. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 제목과 본문, 회색 문자 스타일, 이탤릭 인용선, bullet, 점3개 구분선, 선택 중 도구 색과 키보드 위 툴바를 비교한다. 코드 도구의 실행 후 모습은 원본 미확인이다.

<a id="s019"></a>

## S019 — 구절 응답 입력

[원본 PNG](<../../medium/flows/Home/Story detail/Responding to a phrase/screens/03_sc_1b7c2e5f28d5419d889919fc0c9e3980.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Responding to a phrase/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s019>) · `sc_1b7c2e5f28d5419d889919fc0c9e3980`

- 담당: V20 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>)
- 계정·권한: A를 작성자 YOU에 대응; 본인/타인 응답 분리
- fixture 구성: ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태
- 원본 관찰 표시값: 표시값·입력: Can't agree more!
- 원본 관찰 상태: 상태: 인용 응답 제출 준비
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 인용 카드 아래 문장 입력
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F29-03 / U-S019, U-F29 / C14, C15, C16, C17, C18, C20. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

<a id="s020"></a>

## S020 — 내 프로필 빈 Stories

[원본 PNG](<../../medium/flows/Profile/screens/02_sc_1bd141b757934a88b4a003855e1794cc.png>) · [원본 분석](<../../medium/flows/Profile/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s020>) · `sc_1bd141b757934a88b4a003855e1794cc`

- 담당: V32 / 묶음 15. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>)
- 계정·권한: A 소유; 표시 이름 Alex Smith와 userId는 별개
- fixture 구성: ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도
- 원본 관찰 표시값: 표시값·입력: Alex Smith, 0 followers·1 following
- 원본 관찰 상태: 상태: 발행 글 없음
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 프로필·통계·편집·탭·Public 필터·빈 안내
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F55-02, T-F57-01, T-F63-01 / U-S020, U-F55, U-F57, U-F63 / C51, C52, C53. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

<a id="s021"></a>

## S021 — Explore 첫 화면

[원본 PNG](<../../medium/flows/Explore/screens/02_sc_1c3e4349171248378eada528f7942269.png>) · [원본 분석](<../../medium/flows/Explore/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s021>) · `sc_1c3e4349171248378eada528f7942269`

- 담당: V02 / 묶음 17. 상태: **historical-web-capture-parity-01**. Parity 1 당시 관찰: Trending 상위 기사 순서는 대응. OS 영역·웹 스크롤바·제목/행간·세로 배치 차이; 전수 동일성 아님.; 현재 공통 보정과 잔여는 Parity 2 결과 참조
- 실제 FE 진입 절차(정적 확인): Main/Explore → 검색 진입·Mindfulness 입력·Stories; Staff Picks/Who to follow 위치까지 세로·가로 이동
- Parity 1 당시 증거: [과거 웹 캡처](<EVIDENCE/PARITY_01/S021.png>). 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [CatalogSearchResults.tsx](<../../FE/src/features/search/CatalogSearchResults.tsx>), [ExploreSections.tsx](<../../FE/src/features/search/ExploreSections.tsx>), [SearchScreen.tsx](<../../FE/src/features/search/SearchScreen.tsx>)
- 계정·권한: 공개 열람; 관계 조작은 A
- fixture 구성: mediumFeedFixtures / SearchScreen·CatalogSearchResults; 칩·캐러셀 위치는 화면별 설정
- 원본 관찰 표시값: 표시값·입력: Search Medium 빈값
- 원본 관찰 상태: 상태: 발견 탐색
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 검색창·가로 토픽 칩·번호 매긴 Trending
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F01-02, T-F02-01 / U-S021, U-F01, U-F02 / C06, C07. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 검색 빈 화면의 토픽 행, Stories 결과, 다섯 탭과 X를 분리한다. Trending 순위, Staff Picks 가로 카드, Recommended 세로 카드, Who to follow 가로 이동을 원본 상태별로 비교한다.

<a id="s022"></a>

## S022 — 팔로잉 유형별 목록

[원본 PNG](<../../medium/flows/Home/Refine recommendations/screens/05_sc_1c666fb7aadc411c9add1aa2b19bd56c.png>) · [원본 분석](<../../medium/flows/Home/Refine recommendations/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s022>) · `sc_1c666fb7aadc411c9add1aa2b19bd56c`

- 담당: V11 / 묶음 5. 상태: **recipe-only**. Parity 5에서 mock 연결/웹 부분 대조를 수행함; 원본 차이·미확인·native 대기. 사용자 지시로 캡처 파일을 저장하지 않았으며 원본 동일성이나 ready로 승격하지 않음
- 최신 검토: [Parity 5 결과](<../FE_MEDIUM_PARITY_05_RESULT.md>); 관계 카탈로그·관리 목록·동작 및 웹 부분 비교; 원본 시각 차이·U 미확인·native 대기
- 실제 FE 진입 절차(정적 확인): Home 더보기/Refine recommendations → Recommendations → Following/Reading history/Muted/Suggestions → All·Topics 등 필터
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [RefineRecommendationsScreen.tsx](<../../FE/src/features/recommendations/RefineRecommendationsScreen.tsx>)
- 계정·권한: A 개인 관계; 빈 상태와 Writers1/Topics3 독립
- fixture 구성: RelationshipSource·ModerationSource·TopicSource + useIdentityCatalog(DirectorySource/mockUsers/확정 공개 프로필); Writers1/Topics3는 UI 팔로우로 구성, 숫자와 목록·해제를 함께 확인
- 원본 관찰 표시값: 표시값·입력: Writers 1, Topics 3
- 원본 관찰 상태: 상태: 작가·토픽 팔로우 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Writers·Topics 섹션과 개수
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F12-05 / U-S022, U-F12 / C05, C12, C25, C26. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 네 탭, All/Writers/Publications/Topics, 빈 Following, 종류별 count/See all, Follow/Following, See more suggestions를 개별 확인한다.

<a id="s023"></a>

## S023 — 발행 전 Story preview

[원본 PNG](<../../medium/flows/Home/Publishing a story/Adding topics/screens/01_sc_1ceed9061b86476ebc7eb5acb9dd89c7.png>) · [원본 분석](<../../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s023>) · `sc_1ceed9061b86476ebc7eb5acb9dd89c7`

- 담당: V06 / 묶음 9. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Home 작성 → Editor → Next/PublishPreview → Topics → 검색·선택·Save → preview
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [PublishTopics.tsx](<../../FE/src/features/editor/PublishTopics.tsx>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>)
- 계정·권한: A 소유 초안; Public/Unlisted 별도
- fixture 구성: DraftSource·PublishTopics; The Silence between Notes, Music/Culture/Art, 별도 Publication 없음
- 원본 관찰 표시값: 표시값·입력: No topics added, No publication selected, Unlisted 꺼짐
- 원본 관찰 상태: 상태: 공개 전 설정
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 예상 기사 카드와 Topics·Publication 행, 하단 Publish now
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F07-01, T-F08-08 / U-S023, U-F07, U-F08 / C44, C45. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 검색 X와 chip X, 0/5·3/5·최대5, 빈값 Save의 모양, 미리보기 Edit/Publication/Unlisted/Publish now와 스크롤 헤더를 각각 확인한다.

<a id="s024"></a>

## S024 — 이메일 로그인 입력 완료

[원본 PNG](<../../medium/flows/Logging in/screens/04_sc_1d3dc01005c343c18427fe2c199e4075.png>) · [원본 분석](<../../medium/flows/Logging in/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s024>) · `sc_1d3dc01005c343c18427fe2c199e4075`

- 담당: V29 / 묶음 14. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile 또는 Library guest → AuthDialogs → 이메일 signup/login/code; Profile/Settings → Sign out
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [AuthDialogs.tsx](<../../FE/src/features/auth/AuthDialogs.tsx>), [EmailLogin.tsx](<../../FE/src/features/auth/EmailLogin.tsx>), [createEmailAttempt.ts](<../../FE/src/features/auth/createEmailAttempt.ts>)
- 계정·권한: guest→A 모의 인증; 기존 세션 로그아웃은 A 시작
- fixture 구성: mockUsers + emailAuthSource; 개인정보·원본 인증코드 복사 없이 합성 테스트값 사용
- 원본 관찰 표시값: 표시값·입력: 샘플 계정 이메일 입력
- 원본 관찰 상태: 상태: 로그인 요청 전
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 동일 로그인 폼
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F52-04 / U-S024, U-F52 / C46, C47, C48, C67. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 가입4/로그인5 제공자, 이메일/이름/약관/뒤로·6칸 코드와Validate·Resend·닫기, Sign out Cancel/Confirm→intro를 비교한다. 빈 폼의 녹색 버튼과 실제 입력 검증은 별개다.

<a id="s025"></a>

## S025 — 팔로우된 작가 프로필

[원본 PNG](<../../medium/flows/Home/Story detail/Author detail/Following an author/screens/04_sc_1da36ea095e64ec0a5b6b9478b032524.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/Following an author/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_01.md#s025>) · `sc_1da36ea095e64ec0a5b6b9478b032524`

- 담당: V14 / 묶음 5. 상태: **recipe-only**. Parity 5에서 mock 연결/웹 부분 대조를 수행함; 원본 차이·미확인·native 대기. 사용자 지시로 캡처 파일을 저장하지 않았으며 원본 동일성이나 ready로 승격하지 않음
- 최신 검토: [Parity 5 결과](<../FE_MEDIUM_PARITY_05_RESULT.md>); 관계 카탈로그·관리 목록·동작 및 웹 부분 비교; 원본 시각 차이·U 미확인·native 대기
- 실제 FE 진입 절차(정적 확인): Article 작성자 → Identity(writer Jordan) → Stories/Lists/About → Following·followers → Connections
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ConnectionsScreen.tsx](<../../FE/src/features/community/ConnectionsScreen.tsx>), [FollowControl.tsx](<../../FE/src/features/community/FollowControl.tsx>), [PublicIdentityScreen.tsx](<../../FE/src/features/community/PublicIdentityScreen.tsx>)
- 계정·권한: 공개 프로필; follow/email 관계는 A
- fixture 구성: useIdentityCatalog·RelationshipSource; Jordan10.2K/25, 기사말미24를 억지로 통일하지 않음; 동적 B 이름은 확정 프로필과 같은 ID로 해석
- 원본 관찰 표시값: 표시값·입력: 팔로우 상태 활성
- 원본 관찰 상태: 상태: 관계 설정 메뉴 닫힘
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Following 버튼·Stories 목록
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F19-04 / U-S025, U-F19 / C21, C22. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About, Pinned, member/Friend 시작 월, Follow 성공·메뉴·해제 토스트, Email on/off, 작가와 publication 관계 목록을 각각 확인한다.

<a id="s026"></a>

## S026 — 홈 피드 스크롤 상태

[원본 PNG](<../../medium/flows/Home/screens/02_sc_1ef4e2f769774d2c958fcb38b96dc94f.png>) · [원본 분석](<../../medium/flows/Home/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s026>) · `sc_1ef4e2f769774d2c958fcb38b96dc94f`

- 담당: V01 / 묶음 17. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Home → For you·Featured 선택; S026은 헤더가 접힌 하단 카드, S176은 Featured 빈 상태
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [FollowingFeed.tsx](<../../FE/src/features/community/FollowingFeed.tsx>), [HomeFeedScreen.tsx](<../../FE/src/features/feed/HomeFeedScreen.tsx>)
- 계정·권한: 공개 열람; 원본 개인화 상태 비교는 A
- fixture 구성: mediumFeedFixtures / feedPreviewScenario(normal); Featured empty는 별도 feedSource 필요
- 원본 관찰 표시값: 표시값·입력: 다른 기사 카드와 집계 표시
- 원본 관찰 상태: 상태: For you 하단 목록
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 상단 제목 접힘, 가로 탭과 하단 탐색 유지
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F05-02, T-F16-01 / U-S026, U-F05, U-F16 / C04, C05. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: For you의 원형 −와 Featured의 북마크를 구분한다. 헤더 접힘, 탭 가로 위치, New 배지, 알림 점, 빈 Featured CTA와 채워진 목록을 각각 비교한다.

<a id="s027"></a>

## S027 — 프로필 폼으로 대명사 반환

[원본 PNG](<../../medium/flows/Profile/Editing profile information/Adding pronouns/screens/06_sc_20bfc41de9f845119aea54bb5971a01e.png>) · [원본 분석](<../../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s027>) · `sc_20bfc41de9f845119aea54bb5971a01e`

- 담당: V32 / 묶음 15. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>)
- 계정·권한: A 소유; 표시 이름 Alex Smith와 userId는 별개
- fixture 구성: ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도
- 원본 관찰 표시값: 표시값·입력: 2/4, 소개 빈값
- 원본 관찰 상태: 상태: 선택값 폼에 반영
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 편집 폼 Pronouns he·him
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F56-06 / U-S027, U-F56 / C51, C52, C53. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

<a id="s028"></a>

## S028 — 이미지 저장 행동 노출

[원본 PNG](<../../medium/flows/Home/Story detail/Sharing a story/screens/04_sc_221a38b7f8ac42959ddd75840253b5c8.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Sharing a story/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s028>) · `sc_221a38b7f8ac42959ddd75840253b5c8`

- 담당: V23 / 묶음 13. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article/인용/Identity/PublicList 공유 → 카드 → Copy link/Save image/Share via
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ShareCard.tsx](<../../FE/src/features/sharing/ShareCard.tsx>), [ShareSheet.tsx](<../../FE/src/features/sharing/ShareSheet.tsx>)
- 계정·권한: A; 공개 권한/모의 회원 링크 자격 각각 검증
- fixture 구성: ShareAdapter; 공개 공유 target + 카드 style index; OS 저장·공유는 Q07
- 원본 관찰 표시값: 표시값·입력: 동일 카드
- 원본 관찰 상태: 상태: Save image 전체 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 공유 시트 하단 가로 행동 영역 이동
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F39-04, T-F40-01 / U-S028, U-F39, U-F40 / C23, C61, C62, C63, C64. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: blur 배경·카드 테두리·회전 주소·페이지 점·행동 가로 이동, Copy link·Friend Link·Share via·Save image와 각 성공 토스트를 비교한다.

<a id="s029"></a>

## S029 — Music 토픽 검색

[원본 PNG](<../../medium/flows/Home/Publishing a story/Adding topics/screens/03_sc_234fd58378fc447ba6bc2e6c0033f9c2.png>) · [원본 분석](<../../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s029>) · `sc_234fd58378fc447ba6bc2e6c0033f9c2`

- 담당: V06 / 묶음 9. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Home 작성 → Editor → Next/PublishPreview → Topics → 검색·선택·Save → preview
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [PublishTopics.tsx](<../../FE/src/features/editor/PublishTopics.tsx>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>)
- 계정·권한: A 소유 초안; Public/Unlisted 별도
- fixture 구성: DraftSource·PublishTopics; The Silence between Notes, Music/Culture/Art, 별도 Publication 없음
- 원본 관찰 표시값: 표시값·입력: Music 입력
- 원본 관찰 상태: 상태: 유사 철자·다른 토픽 결과
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 검색어 아래 유사 이름과 팔로워 수 목록
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F07-03 / U-S029, U-F07 / C44, C45. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 검색 X와 chip X, 0/5·3/5·최대5, 빈값 Save의 모양, 미리보기 Edit/Publication/Unlisted/Publish now와 스크롤 헤더를 각각 확인한다.

<a id="s030"></a>

## S030 — 작성기 더보기 메뉴

[원본 PNG](<../../medium/flows/Home/Publishing a story/Drafts/screens/02_sc_2436081faa2445cb86e17ea0b88b4fc9.png>) · [원본 분석](<../../medium/flows/Home/Publishing a story/Drafts/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s030>) · `sc_2436081faa2445cb86e17ea0b88b4fc9`

- 담당: V09 / 묶음 9. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Editor 더보기 또는 Profile Drafts → Drafts; 저장한 같은 draftId 재열기
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [DraftsScreen.tsx](<../../FE/src/features/editor/DraftsScreen.tsx>), [createDraftSession.ts](<../../FE/src/features/editor/createDraftSession.ts>)
- 계정·권한: A 개인 초안; 빈 목록과 1개 초안 구분
- fixture 구성: DraftSource; 제목 The Silence between Notes, editedAt=비교 시계-60초
- 원본 관찰 표시값: 표시값·입력: 본문 유지
- 원본 관찰 상태: 상태: 발행 보조 메뉴 열림
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 상단 더보기 아래 4행 팝오버
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F10-02 / U-S030, U-F10 / C42. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 더보기 네 메뉴의 순서·각 목적지, Drafts 제목/Edited 시각/Close/재개를 확인한다. 목록의 시각 표시는 서버 동기화 완료 표시가 아니다.

<a id="s031"></a>

## S031 — 본문 문자 스타일 변경

[원본 PNG](<../../medium/flows/Home/Publishing a story/Changing text format/screens/02_sc_24b381a199374acb8d2a6a516052c9a7.png>) · [원본 분석](<../../medium/flows/Home/Publishing a story/Changing text format/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s031>) · `sc_24b381a199374acb8d2a6a516052c9a7`

- 담당: V07 / 묶음 9. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Home 작성 → Editor; 제목·본문 입력 → 해당 서식·이미지 블록 선택
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [RichDocumentBody.tsx](<../../FE/src/features/editor/RichDocumentBody.tsx>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>), [editorModel.ts](<../../FE/src/features/editor/editorModel.ts>)
- 계정·권한: A 소유 초안; 같은 draftId 유지
- fixture 구성: DraftSource·EditorSession; 음악 제목/단락/인용/목록/구분선은 각 S의 문서 snapshot 별도
- 원본 관찰 표시값: 표시값·입력: 제목 유지, 단락 스타일 변경
- 원본 관찰 상태: 상태: 텍스트 서식 선택 상태
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 회색 산세리프 단락과 녹색 문자 도구
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F09-02 / U-S031, U-F09 / C40. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 제목과 본문, 회색 문자 스타일, 이탤릭 인용선, bullet, 점3개 구분선, 선택 중 도구 색과 키보드 위 툴바를 비교한다. 코드 도구의 실행 후 모습은 원본 미확인이다.

<a id="s032"></a>

## S032 — 최신순 응답 목록

[원본 PNG](<../../medium/flows/Home/Story detail/Responses/Sorting responses/screens/03_sc_280ed6ce41b24f6f876aac698f4a8119.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Sorting responses/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s032>) · `sc_280ed6ce41b24f6f876aac698f4a8119`

- 담당: V20 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>)
- 계정·권한: A를 작성자 YOU에 대응; 본인/타인 응답 분리
- fixture 구성: ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태
- 원본 관찰 표시값: 표시값·입력: 1 hour ago, 4 hours ago, 7 hours ago
- 원본 관찰 상태: 상태: 최근 응답이 먼저 보임
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Most Recent 선택·새로운 작성자 목록
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F36-03 / U-S032, U-F36 / C14, C15, C16, C17, C18, C20. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

<a id="s033"></a>

## S033 — 전체 추천의 작가 섹션

[원본 PNG](<../../medium/flows/Home/Refine recommendations/Filtering suggestions/screens/03_sc_28a0bd2548fc4800b2b024bdc06bb115.png>) · [원본 분석](<../../medium/flows/Home/Refine recommendations/Filtering suggestions/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s033>) · `sc_28a0bd2548fc4800b2b024bdc06bb115`

- 담당: V11 / 묶음 5. 상태: **recipe-only**. Parity 5에서 mock 연결/웹 부분 대조를 수행함; 원본 차이·미확인·native 대기. 사용자 지시로 캡처 파일을 저장하지 않았으며 원본 동일성이나 ready로 승격하지 않음
- 최신 검토: [Parity 5 결과](<../FE_MEDIUM_PARITY_05_RESULT.md>); 관계 카탈로그·관리 목록·동작 및 웹 부분 비교; 원본 시각 차이·U 미확인·native 대기
- 실제 FE 진입 절차(정적 확인): Home 더보기/Refine recommendations → Recommendations → Following/Reading history/Muted/Suggestions → All·Topics 등 필터
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [RefineRecommendationsScreen.tsx](<../../FE/src/features/recommendations/RefineRecommendationsScreen.tsx>)
- 계정·권한: A 개인 관계; 빈 상태와 Writers1/Topics3 독립
- fixture 구성: RelationshipSource·ModerationSource·TopicSource + useIdentityCatalog(DirectorySource/mockUsers/확정 공개 프로필); Writers1/Topics3는 UI 팔로우로 구성, 숫자와 목록·해제를 함께 확인
- 원본 관찰 표시값: 표시값·입력: 작가 소개·인증 배지 일부
- 원본 관찰 상태: 상태: 전체 추천 중 작가 목록
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: All 필터 아래 Writers to follow
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F13-03 / U-S033, U-F13 / C05, C12, C25, C26. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 네 탭, All/Writers/Publications/Topics, 빈 Following, 종류별 count/See all, Follow/Following, See more suggestions를 개별 확인한다.

<a id="s034"></a>

## S034 — 로그아웃 확인

[원본 PNG](<../../medium/flows/Profile/Settings/Logging out/screens/02_sc_2d1afd7a02a347868564f9757753d077.png>) · [원본 분석](<../../medium/flows/Profile/Settings/Logging out/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s034>) · `sc_2d1afd7a02a347868564f9757753d077`

- 담당: V29 / 묶음 14. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile 또는 Library guest → AuthDialogs → 이메일 signup/login/code; Profile/Settings → Sign out
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [AuthDialogs.tsx](<../../FE/src/features/auth/AuthDialogs.tsx>), [EmailLogin.tsx](<../../FE/src/features/auth/EmailLogin.tsx>), [createEmailAttempt.ts](<../../FE/src/features/auth/createEmailAttempt.ts>)
- 계정·권한: guest→A 모의 인증; 기존 세션 로그아웃은 A 시작
- fixture 구성: mockUsers + emailAuthSource; 개인정보·원본 인증코드 복사 없이 합성 테스트값 사용
- 원본 관찰 표시값: 표시값·입력: 로그아웃 의사 확인
- 원본 관찰 상태: 상태: 세션 종료 전 확인
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 설정 위 중앙 Sign out 대화상자
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F61-02 / U-S034, U-F61 / C46, C47, C48, C67. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 가입4/로그인5 제공자, 이메일/이름/약관/뒤로·6칸 코드와Validate·Resend·닫기, Sign out Cancel/Confirm→intro를 비교한다. 빈 폼의 녹색 버튼과 실제 입력 검증은 별개다.

<a id="s035"></a>

## S035 — 관심사 기반 작가·발행물 추천

[원본 PNG](<../../medium/flows/Onboarding/screens/10_sc_301ef788e5514bb5b8e9c1fc9afcfa61.png>) · [원본 분석](<../../medium/flows/Onboarding/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s035>) · `sc_301ef788e5514bb5b8e9c1fc9afcfa61`

- 담당: V30 / 묶음 14. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): guest signup → Onboarding → interests → recommendations → permission → welcome; S043은 실제 cold start
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [OnboardingScreen.tsx](<../../FE/src/features/onboarding/OnboardingScreen.tsx>), [createOnboardingSession.ts](<../../FE/src/features/onboarding/createOnboardingSession.ts>)
- 계정·권한: 신규 A; 기존 A와 분리된 새 메모리 세션
- fixture 구성: OnboardingSource·NotificationPermissionSource; 관심5개/추천Follow/안내 상태; S043 대응 splash 없음
- 원본 관찰 표시값: 표시값·입력: 별도 입력란 없음. 작가와 Publication이 함께 표시됨
- 원본 관찰 상태: 상태: 팔로우 전 추천 목록
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 상단 환영 제목 아래 아바타·소개·Follow 행, 하단 고정 Finish
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F53-10 / U-S035, U-F53 / C49, C50. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 브랜드 시작, 새 경험 소개, 최소3개 안내와 관찰5개 선택, Follow/Finish, Enable/Skip와 다음 목적지를 확인한다. 모든 계정에 동일 순서를 강제하지 않는다.

<a id="s036"></a>

## S036 — 기사 저장 대상 선택

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Home/Story detail/Saving a story/screens/02_sc_31edfd53d2874259a6ed5ecbc756d10b.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Saving a story/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s036>) · `sc_31edfd53d2874259a6ed5ecbc756d10b`

- 담당: V22 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article 하단 저장 → Save to → Reading list 선택 → Done/닫기
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ArticleBookmarkControl.tsx](<../../FE/src/features/bookmarks/ArticleBookmarkControl.tsx>), [SaveToListSheet.tsx](<../../FE/src/features/bookmarks/SaveToListSheet.tsx>)
- 계정·권한: A 개인 기본 목록; guest는 로그인 복귀 후 재행동
- fixture 구성: BookmarkSource·UserListStore; reading-list 체크와 canonical articleId
- 원본 관찰 표시값: 표시값·입력: Reading list 체크·자물쇠
- 원본 관찰 상태: 상태: 비공개 읽기 목록 선택
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 하단 Save to 시트
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F37-02 / U-S036, U-F37 / C28. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Save to, Reading list 체크/잠금, Create new list, Done, 복귀한 채운 북마크를 비교한다. 체크와 확정 시점을 자체 계약으로 명시한다.

<a id="s037"></a>

## S037 — 기사 상세 상단

[원본 PNG](<../../medium/flows/Home/Story detail/screens/02_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>) · [원본 분석](<../../medium/flows/Home/Story detail/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s037>) · `sc_332d5b0923e546fcbf6a8fc613cda6a4`

- 담당: V13 / 묶음 10. 상태: **historical-web-capture-parity-01**. Parity 1 당시 관찰: medium-brain 상단 진입. 제목/작가/커버 대응, 원본834와 현재7 응답·부제 줄바꿈·본문 크기 차이.; 현재 공통 보정과 잔여는 Parity 2 결과 참조
- 실제 FE 진입 절차(정적 확인): Home/Explore 기사 → Article(articleId); 본문·말미·응답 미리보기까지 스크롤; 박수 조작
- Parity 1 당시 증거: [과거 웹 캡처](<EVIDENCE/PARITY_01/S037.png>). 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ArticleDetailScreen.tsx](<../../FE/src/features/article/ArticleDetailScreen.tsx>), [ReferenceArticleView.tsx](<../../FE/src/features/article/ReferenceArticleView.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>)
- 계정·권한: 공개 읽기와 회원 제한 상태 분리; 반응은 A
- fixture 구성: medium-brain 기본 기사; F16의834와 박수 흐름832는 독립 response fixture
- 원본 관찰 표시값: 표시값·입력: 5 min read, Apr 30 2025, Jordan Gibbs, 18K 박수·834 응답
- 원본 관찰 상태: 상태: 멤버 전용 기사 읽기 화면
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Member-only 배지·제목·부제·읽기 시간·작가·커버, 고정 반응 바
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F16-02, T-F17-01, T-F24-01, T-F26-01, T-F30-01, T-F37-01, T-F38-01, T-F39-01 / U-S037, U-F16, U-F17, U-F24, U-F26, U-F30, U-F37, U-F38, U-F39 / C09, C10, C11, C12. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 제목/부제/작가/읽기시간/표지 출처, 본문 강조·링크·삽입 이미지·토픽·작성자·응답 미리보기·관련 글·고정 반응 바를 각각 비교한다. +16은 입력 피드백이며 터치 횟수 증거가 아니다.

<a id="s038"></a>

## S038 — 작가 공개 리스트

[원본 PNG](<../../medium/flows/Home/Story detail/Author detail/screens/03_sc_334d50df678445baaa7ba445c96861ba.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s038>) · `sc_334d50df678445baaa7ba445c96861ba`

- 담당: V14 / 묶음 5. 상태: **recipe-only**. Parity 5에서 mock 연결/웹 부분 대조를 수행함; 원본 차이·미확인·native 대기. 사용자 지시로 캡처 파일을 저장하지 않았으며 원본 동일성이나 ready로 승격하지 않음
- 최신 검토: [Parity 5 결과](<../FE_MEDIUM_PARITY_05_RESULT.md>); 관계 카탈로그·관리 목록·동작 및 웹 부분 비교; 원본 시각 차이·U 미확인·native 대기
- 실제 FE 진입 절차(정적 확인): Article 작성자 → Identity(writer Jordan) → Stories/Lists/About → Following·followers → Connections
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ConnectionsScreen.tsx](<../../FE/src/features/community/ConnectionsScreen.tsx>), [FollowControl.tsx](<../../FE/src/features/community/FollowControl.tsx>), [PublicIdentityScreen.tsx](<../../FE/src/features/community/PublicIdentityScreen.tsx>)
- 계정·권한: 공개 프로필; follow/email 관계는 A
- fixture 구성: useIdentityCatalog·RelationshipSource; Jordan10.2K/25, 기사말미24를 억지로 통일하지 않음; 동적 B 이름은 확정 프로필과 같은 ID로 해석
- 원본 관찰 표시값: 표시값·입력: 2 stories·이미지 모음
- 원본 관찰 상태: 상태: 작가 목록 탐색
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Lists 탭에 AAA AI 카드
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F17-03 / U-S038, U-F17 / C21, C22. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About, Pinned, member/Friend 시작 월, Follow 성공·메뉴·해제 토스트, Email on/off, 작가와 publication 관계 목록을 각각 확인한다.

<a id="s039"></a>

## S039 — 새 리스트 생성 표시

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/Creating a list/screens/04_sc_35dcbd9d4308404b9f11ecd03f893eb8.png>) · [원본 분석](<../../medium/flows/Library/Creating a list/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s039>) · `sc_35dcbd9d4308404b9f11ecd03f893eb8`

- 담당: V24 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Library → Your lists / Saved lists / Highlighted; 새 목록·삭제 후 복귀
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [LibraryScreen.tsx](<../../FE/src/features/bookmarks/LibraryScreen.tsx>), [HighlightList.tsx](<../../FE/src/features/highlights/HighlightList.tsx>)
- 계정·권한: A 개인 목록; 기본 reading-list는 항상 private
- fixture 구성: UserListStore·HighlightSource; empty/3/4 stories·About mindfulness를 각 상태별 구성
- 원본 관찰 표시값: 표시값·입력: About mindfulness, No stories, 자물쇠 없음
- 원본 관찰 상태: 상태: 새 목록 생성 결과
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Your lists에 기본 목록과 새 카드
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F42-04, T-F46-01 / U-S039, U-F42, U-F46 / C20, C29, C31, C37. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 가로5탭, 초기 배너/닫기·Digest New, New list, 빈/3개/4개 카드 썸네일/잠금/다운로드/메뉴, Highlighted 구절·작성자·원문 링크를 비교한다.

<a id="s040"></a>

## S040 — 추천 알림 두 항목 끄기

[원본 PNG](<../../medium/flows/Profile/Settings/Changing notification settings/screens/03_sc_368c53cd77e2421e8279124ce03301f4.png>) · [원본 분석](<../../medium/flows/Profile/Settings/Changing notification settings/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s040>) · `sc_368c53cd77e2421e8279124ce03301f4`

- 담당: V28 / 묶음 16. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Digest 설정 또는 Profile/Settings → Email/Push → NotificationSettings(section)
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [NotificationSettingsScreen.tsx](<../../FE/src/features/notifications/NotificationSettingsScreen.tsx>)
- 계정·권한: A; 앱 설정과 OS권한을 별도 기록
- fixture 구성: NotificationSource·설정 source; Daily/PushOn/EmailOn와 개별 토글 상태
- 원본 관찰 표시값: 표시값·입력: Your top story of the day·Editors 꺼짐, Digest 켜짐
- 원본 관찰 상태: 상태: 선택 알림만 비활성
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 같은 알림 폼
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F59-03 / U-S040, U-F59 / C39, C50, C56, C57, C67. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Daily/Push On/Email On의 선택·chevron·외부 화살표를 구분한다. 여섯 토글과 다섯 Tailored 행, Top story/Editors만Off를 비교한다.

<a id="s041"></a>

## S041 — 새 읽기 경험 소개

[원본 PNG](<../../medium/flows/Onboarding/screens/07_sc_3795c955a89d404c85112e637857e74a.png>) · [원본 분석](<../../medium/flows/Onboarding/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s041>) · `sc_3795c955a89d404c85112e637857e74a`

- 담당: V30 / 묶음 14. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): guest signup → Onboarding → interests → recommendations → permission → welcome; S043은 실제 cold start
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [OnboardingScreen.tsx](<../../FE/src/features/onboarding/OnboardingScreen.tsx>), [createOnboardingSession.ts](<../../FE/src/features/onboarding/createOnboardingSession.ts>)
- 계정·권한: 신규 A; 기존 A와 분리된 새 메모리 세션
- fixture 구성: OnboardingSource·NotificationPermissionSource; 관심5개/추천Follow/안내 상태; S043 대응 splash 없음
- 원본 관찰 표시값: 표시값·입력: 입력 필드는 없다.
- 원본 관찰 상태: 상태: 앱 업데이트와 팔로잉 재검토를 안내한다.
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 큰 환영 제목, 추천 개선 설명, 작가 아바타 묶음, 하단 CTA가 있다.
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F53-07 / U-S041, U-F53 / C49, C50. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 브랜드 시작, 새 경험 소개, 최소3개 안내와 관찰5개 선택, Follow/Finish, Enable/Skip와 다음 목적지를 확인한다. 모든 계정에 동일 순서를 강제하지 않는다.

<a id="s042"></a>

## S042 — 빈 기사 편집기

[원본 PNG](<../../medium/flows/Home/Publishing a story/screens/02_sc_397cb0f05ba54659adac7376f29512dd.png>) · [원본 분석](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s042>) · `sc_397cb0f05ba54659adac7376f29512dd`

- 담당: V07 / 묶음 9. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Home 작성 → Editor; 제목·본문 입력 → 해당 서식·이미지 블록 선택
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [RichDocumentBody.tsx](<../../FE/src/features/editor/RichDocumentBody.tsx>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>), [editorModel.ts](<../../FE/src/features/editor/editorModel.ts>)
- 계정·권한: A 소유 초안; 같은 draftId 유지
- fixture 구성: DraftSource·EditorSession; 음악 제목/단락/인용/목록/구분선은 각 S의 문서 snapshot 별도
- 원본 관찰 표시값: 표시값·입력: 본문 빈값
- 원본 관찰 상태: 상태: 작성 시작·키보드 활성
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 상단 Close·더보기·Next, 본문 커서, 키보드 위 서식 도구
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 보임 관찰; web은 OS 키보드 비동등
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F08-02 / U-S042, U-F08 / C40. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 제목과 본문, 회색 문자 스타일, 이탤릭 인용선, bullet, 점3개 구분선, 선택 중 도구 색과 키보드 위 툴바를 비교한다. 코드 도구의 실행 후 모습은 원본 미확인이다.

<a id="s043"></a>

## S043 — 브랜드 시작 화면

[원본 PNG](<../../medium/flows/Onboarding/screens/01_sc_39bd15e8585d404daa48b34a448b0e32.png>) · [원본 분석](<../../medium/flows/Onboarding/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s043>) · `sc_39bd15e8585d404daa48b34a448b0e32`

- 담당: V30 / 묶음 14, 18, 21. 상태: **native-required**. 대응 splash 설정 없음(D10); 웹 Home은 대체 증거가 아님; 실제 cold start는 Q07.
- 실제 FE 진입 절차(정적 확인): guest signup → Onboarding → interests → recommendations → permission → welcome; S043은 실제 cold start
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [OnboardingScreen.tsx](<../../FE/src/features/onboarding/OnboardingScreen.tsx>), [createOnboardingSession.ts](<../../FE/src/features/onboarding/createOnboardingSession.ts>)
- 계정·권한: 신규 A; 기존 A와 분리된 새 메모리 세션
- fixture 구성: OnboardingSource·NotificationPermissionSource; 관심5개/추천Follow/안내 상태; S043 대응 splash 없음
- 원본 관찰 표시값: 표시값·입력: 입력 필드는 없다.
- 원본 관찰 상태: 상태: 앱 진입 시 브랜드 표시 캡처다.
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 검은 전면 배경 중앙에 흰 Medium 로고가 크게 배치된다.
- 테마: black-brand-frame; app theme 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; native 필수/web 비동등; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F53-01 / U-S043, U-F53 / C49, C50. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 브랜드 시작, 새 경험 소개, 최소3개 안내와 관찰5개 선택, Follow/Finish, Enable/Skip와 다음 목적지를 확인한다. 모든 계정에 동일 순서를 강제하지 않는다.

<a id="s044"></a>

## S044 — Unlisted 공개 범위 안내

[원본 PNG](<../../medium/flows/Home/Publishing a story/screens/10_sc_39fb71a1ee0d43f09bab33c7ef775259.png>) · [원본 분석](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s044>) · `sc_39fb71a1ee0d43f09bab33c7ef775259`

- 담당: V06 / 묶음 9. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Home 작성 → Editor → Next/PublishPreview → Topics → 검색·선택·Save → preview
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [PublishTopics.tsx](<../../FE/src/features/editor/PublishTopics.tsx>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>)
- 계정·권한: A 소유 초안; Public/Unlisted 별도
- fixture 구성: DraftSource·PublishTopics; The Silence between Notes, Music/Culture/Art, 별도 Publication 없음
- 원본 관찰 표시값: 표시값·입력: Publication 미지정, Unlisted 꺼짐
- 원본 관찰 상태: 상태: 링크 소지자 접근·공개 목록 제외라는 안내
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 미리보기 하단 스크롤, Publication과 Unlisted 설명
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F08-10 / U-S044, U-F08 / C44, C45. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 검색 X와 chip X, 0/5·3/5·최대5, 빈값 Save의 모양, 미리보기 Edit/Publication/Unlisted/Publish now와 스크롤 헤더를 각각 확인한다.

<a id="s045"></a>

## S045 — 읽기 기록 빈 상태

[원본 PNG](<../../medium/flows/Home/Refine recommendations/Reading history/Clearing history/screens/02_sc_3ab5043fa7b649908c6dde30faf290ab.png>) · [원본 분석](<../../medium/flows/Home/Refine recommendations/Reading history/Clearing history/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s045>) · `sc_3ab5043fa7b649908c6dde30faf290ab`

- 담당: V12 / 묶음 4. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.; Parity 4 새 실행은 latestReview 참조; 과거 캡처를 현재 코드 증거로 승격하지 않음
- 실제 FE 진입 절차(정적 확인): 개발 웹 /?parityHistory=reference-v1 → mock A → Profile/Settings → Refine recommendations → Reading history → 카드·삭제·Clear history; 일반 방문은 Library 이력 경로도 확인
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ReadingHistoryList.tsx](<../../FE/src/features/reading-history/ReadingHistoryList.tsx>)
- 계정·권한: A 개인 방문 이력; Viewed와 실제 Views/Reads 구분
- fixture 구성: ReadingHistorySource + reactive 카탈로그; Parity 4의 명시적 reference-v1 seed는 알려진 세 기사와 합성 방문 시각만 제공; 원본 중간 카드·집계 차이는 V12 잔여; D03/D05 연결 검증은 FE_MEDIUM_PARITY_04_RESULT 참조
- 원본 관찰 표시값: 표시값·입력: 읽은 글이 없다는 문구
- 원본 관찰 상태: 상태: 기록 목록 없음
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Reading history 탭 내 안내 카드
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F15-02 / U-S045, U-F15 / C11, C25, C27, C37. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 전체 Clear history와 개별 휴지통을 분리하고 빈 상태 Explore·목록 스크롤을 확인한다. 발행일을 읽은 시각으로 바꾸지 않는다.

<a id="s046"></a>

## S046 — 음성 선택 목록

[원본 PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/03_sc_3b3db04094fe4a189b31e66c28971bcd.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s046>) · `sc_3b3db04094fe4a189b31e66c28971bcd`

- 담당: V19 / 묶음 12. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): 확장 플레이어 → Speed 또는 더보기 → Select a voice → 언어 스크롤·Hans → Done
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListeningSpeedPanel.tsx](<../../FE/src/features/listening/ListeningSpeedPanel.tsx>), [ListeningVoicePanel.tsx](<../../FE/src/features/listening/ListeningVoicePanel.tsx>)
- 계정·권한: A; 권한과 현재 선택을 별도 설정
- fixture 구성: ListeningOptionsSource; Emma/Hans, 1x200WPM·2.5x490WPM은 관찰값 fixture
- 원본 관찰 표시값: 표시값·입력: Emma 선택, Matthew·Salli 등
- 원본 관찰 상태: 상태: Emma가 현재 선택된 음성 목록. 모든 계정의 기본 음성이라는 의미는 아니다.
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 검색·FEATURED·ENGLISH 섹션과 국기·이름·성별·국가
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F28-03 / U-S046, U-F28 / C59, C60, C61. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 세로 slider·1x/200 WPM·2.5x/490 WPM·145% 문구, voice 언어 section/국기/성별/나라/선택색, Emma→Hans와 Done, 더보기6행을 비교한다.

<a id="s047"></a>

## S047 — 프로필 소개·사진·대명사 표시

[원본 PNG](<../../medium/flows/Profile/screens/06_sc_3cd0855e78a84d4ea413f0e5b3dffb73.png>) · [원본 분석](<../../medium/flows/Profile/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s047>) · `sc_3cd0855e78a84d4ea413f0e5b3dffb73`

- 담당: V32 / 묶음 15. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>)
- 계정·권한: A 소유; 표시 이름 Alex Smith와 userId는 별개
- fixture 구성: ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도
- 원본 관찰 표시값: 표시값·입력: Curious mind sharing thoughts one story at a time
- 원본 관찰 상태: 상태: 프로필 정보 반영
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 프로필 아바타·이름 옆 he/him·About 본문
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F55-06, T-F57-08 / U-S047, U-F55, U-F57 / C51, C52, C53. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

<a id="s048"></a>

## S048 — 작가 프로필 Stories

[원본 PNG](<../../medium/flows/Home/Story detail/Author detail/screens/02_sc_3de359a1c13340968c4b733188faa6d1.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s048>) · `sc_3de359a1c13340968c4b733188faa6d1`

- 담당: V14 / 묶음 5. 상태: **recipe-only**. Parity 5에서 mock 연결/웹 부분 대조를 수행함; 원본 차이·미확인·native 대기. 사용자 지시로 캡처 파일을 저장하지 않았으며 원본 동일성이나 ready로 승격하지 않음
- 최신 검토: [Parity 5 결과](<../FE_MEDIUM_PARITY_05_RESULT.md>); 관계 카탈로그·관리 목록·동작 및 웹 부분 비교; 원본 시각 차이·U 미확인·native 대기
- 실제 FE 진입 절차(정적 확인): Article 작성자 → Identity(writer Jordan) → Stories/Lists/About → Following·followers → Connections
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ConnectionsScreen.tsx](<../../FE/src/features/community/ConnectionsScreen.tsx>), [FollowControl.tsx](<../../FE/src/features/community/FollowControl.tsx>), [PublicIdentityScreen.tsx](<../../FE/src/features/community/PublicIdentityScreen.tsx>)
- 계정·권한: 공개 프로필; follow/email 관계는 A
- fixture 구성: useIdentityCatalog·RelationshipSource; Jordan10.2K/25, 기사말미24를 억지로 통일하지 않음; 동적 B 이름은 확정 프로필과 같은 ID로 해석
- 원본 관찰 표시값: 표시값·입력: Jordan Gibbs, 10.2K followers·25 following
- 원본 관찰 상태: 상태: 고정 글 Pinned 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 프로필·관계 집계·Friend 배지·팔로우 버튼·탭
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F17-02, T-F18-01, T-F19-01, T-F21-01, T-F22-01, T-F23-01 / U-S048, U-F17, U-F18, U-F19, U-F21, U-F22, U-F23 / C21, C22. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About, Pinned, member/Friend 시작 월, Follow 성공·메뉴·해제 토스트, Email on/off, 작가와 publication 관계 목록을 각각 확인한다.

<a id="s049"></a>

## S049 — 작가 팔로우 성공과 알림 메뉴

[원본 PNG](<../../medium/flows/Home/Story detail/Author detail/Following an author/screens/02_sc_3ecf6d2988a6418fa4d2006fa4497b23.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/Following an author/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s049>) · `sc_3ecf6d2988a6418fa4d2006fa4497b23`

- 담당: V14 / 묶음 5. 상태: **recipe-only**. Parity 5에서 mock 연결/웹 부분 대조를 수행함; 원본 차이·미확인·native 대기. 사용자 지시로 캡처 파일을 저장하지 않았으며 원본 동일성이나 ready로 승격하지 않음
- 최신 검토: [Parity 5 결과](<../FE_MEDIUM_PARITY_05_RESULT.md>); 관계 카탈로그·관리 목록·동작 및 웹 부분 비교; 원본 시각 차이·U 미확인·native 대기
- 실제 FE 진입 절차(정적 확인): Article 작성자 → Identity(writer Jordan) → Stories/Lists/About → Following·followers → Connections
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ConnectionsScreen.tsx](<../../FE/src/features/community/ConnectionsScreen.tsx>), [FollowControl.tsx](<../../FE/src/features/community/FollowControl.tsx>), [PublicIdentityScreen.tsx](<../../FE/src/features/community/PublicIdentityScreen.tsx>)
- 계정·권한: 공개 프로필; follow/email 관계는 A
- fixture 구성: useIdentityCatalog·RelationshipSource; Jordan10.2K/25, 기사말미24를 억지로 통일하지 않음; 동적 B 이름은 확정 프로필과 같은 ID로 해석
- 원본 관찰 표시값: 표시값·입력: Email notifications on 체크
- 원본 관찰 상태: 상태: 팔로우 성공 안내
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 성공 토스트 위에 Following 메뉴
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F19-02 / U-S049, U-F19 / C21, C22. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About, Pinned, member/Friend 시작 월, Follow 성공·메뉴·해제 토스트, Email on/off, 작가와 publication 관계 목록을 각각 확인한다.

<a id="s050"></a>

## S050 — 미니 플레이어 재생 상태

[원본 PNG](<../../medium/flows/Home/Story detail/Listening to a story/screens/03_sc_40448a752ea64391a724af01b1e050f1.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_02.md#s050>) · `sc_40448a752ea64391a724af01b1e050f1`

- 담당: V18 / 묶음 12. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article Listen → 미니 플레이어 → 확장 → 재생·정지·seek·닫기
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListeningPlayer.tsx](<../../FE/src/features/listening/ListeningPlayer.tsx>)
- 계정·권한: A 모의 회원 자격; 실제 음성 없음
- fixture 구성: ListeningSource·mock 시계; 00:05/00:10/00:20/00:40 각 snapshot과 duration 독립
- 원본 관찰 표시값: 표시값·입력: 동일 기사
- 원본 관찰 상태: 상태: 재생 중을 나타내는 UI
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 상단 및 미니 플레이어 일시정지 아이콘
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F26-03 / U-S050, U-F26 / C58, C59, C61, C66. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 준비 중 두 spinner, mini/expanded 동일 기사, 커버·배경·시간·진행선·10초/30초·희미한 이전/다음·닫기·Speechify 표시를 비교한다. 무음 timer는 실제 재생과 구분한다. Q12에서 미니/확장 플레이어의 모의 안내가 원본 배치에 미치는 영향을 판정한다.

<a id="s051"></a>

## S051 — 링크 복사 피드백

[원본 PNG](<../../medium/flows/Home/Story detail/Sharing a story/screens/03_sc_4225892a7f304ec9b0442fad0aae38bb.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Sharing a story/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s051>) · `sc_4225892a7f304ec9b0442fad0aae38bb`

- 담당: V23 / 묶음 13. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article/인용/Identity/PublicList 공유 → 카드 → Copy link/Save image/Share via
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ShareCard.tsx](<../../FE/src/features/sharing/ShareCard.tsx>), [ShareSheet.tsx](<../../FE/src/features/sharing/ShareSheet.tsx>)
- 계정·권한: A; 공개 권한/모의 회원 링크 자격 각각 검증
- fixture 구성: ShareAdapter; 공개 공유 target + 카드 style index; OS 저장·공유는 Q07
- 원본 관찰 표시값: 표시값·입력: Link copied
- 원본 관찰 상태: 상태: 복사 완료 안내
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 공유 시트 상단 검정 토스트
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F39-03 / U-S051, U-F39 / C23, C61, C62, C63, C64. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: blur 배경·카드 테두리·회전 주소·페이지 점·행동 가로 이동, Copy link·Friend Link·Share via·Save image와 각 성공 토스트를 비교한다.

<a id="s052"></a>

## S052 — 읽기 기록 스크롤

[원본 PNG](<../../medium/flows/Home/Refine recommendations/Reading history/screens/02_sc_4239d69cbdce4194a5a34c7472131dfd.png>) · [원본 분석](<../../medium/flows/Home/Refine recommendations/Reading history/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s052>) · `sc_4239d69cbdce4194a5a34c7472131dfd`

- 담당: V12 / 묶음 4. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.; Parity 4 새 실행은 latestReview 참조; 과거 캡처를 현재 코드 증거로 승격하지 않음
- 실제 FE 진입 절차(정적 확인): 개발 웹 /?parityHistory=reference-v1 → mock A → Profile/Settings → Refine recommendations → Reading history → 카드·삭제·Clear history; 일반 방문은 Library 이력 경로도 확인
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ReadingHistoryList.tsx](<../../FE/src/features/reading-history/ReadingHistoryList.tsx>)
- 계정·권한: A 개인 방문 이력; Viewed와 실제 Views/Reads 구분
- fixture 구성: ReadingHistorySource + reactive 카탈로그; Parity 4의 명시적 reference-v1 seed는 알려진 세 기사와 합성 방문 시각만 제공; 원본 중간 카드·집계 차이는 V12 잔여; D03/D05 연결 검증은 FE_MEDIUM_PARITY_04_RESULT 참조
- 원본 관찰 표시값: 표시값·입력: 각 카드 휴지통
- 원본 관찰 상태: 상태: 개별 기록 삭제 진입 가능
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 읽기 기록 탭 아래 다른 기사 카드
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F14-02 / U-S052, U-F14 / C11, C25, C27, C37. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 전체 Clear history와 개별 휴지통을 분리하고 빈 상태 Explore·목록 스크롤을 확인한다. 발행일을 읽은 시각으로 바꾸지 않는다.

<a id="s053"></a>

## S053 — 편집 추천과 개인 추천

[원본 PNG](<../../medium/flows/Explore/screens/04_sc_4352273aa0654f939705613dfa224e75.png>) · [원본 분석](<../../medium/flows/Explore/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s053>) · `sc_4352273aa0654f939705613dfa224e75`

- 담당: V02 / 묶음 17. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Explore → 검색 진입·Mindfulness 입력·Stories; Staff Picks/Who to follow 위치까지 세로·가로 이동
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [CatalogSearchResults.tsx](<../../FE/src/features/search/CatalogSearchResults.tsx>), [ExploreSections.tsx](<../../FE/src/features/search/ExploreSections.tsx>), [SearchScreen.tsx](<../../FE/src/features/search/SearchScreen.tsx>)
- 계정·권한: 공개 열람; 관계 조작은 A
- fixture 구성: mediumFeedFixtures / SearchScreen·CatalogSearchResults; 칩·캐러셀 위치는 화면별 설정
- 원본 관찰 표시값: 표시값·입력: 기사 읽기 시간·날짜·집계
- 원본 관찰 상태: 상태: 발견 페이지 중간
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Staff Picks 가로 큰 카드·Recommended for you 세로 목록
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F01-04 / U-S053, U-F01 / C06, C07. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 검색 빈 화면의 토픽 행, Stories 결과, 다섯 탭과 X를 분리한다. Trending 순위, Staff Picks 가로 카드, Recommended 세로 카드, Who to follow 가로 이동을 원본 상태별로 비교한다.

<a id="s054"></a>

## S054 — 이름과 이메일 입력 완료

[원본 PNG](<../../medium/flows/Onboarding/screens/04_sc_4510def6bbb1459ab0b5f18d07b8427e.png>) · [원본 분석](<../../medium/flows/Onboarding/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s054>) · `sc_4510def6bbb1459ab0b5f18d07b8427e`

- 담당: V29 / 묶음 14. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile 또는 Library guest → AuthDialogs → 이메일 signup/login/code; Profile/Settings → Sign out
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [AuthDialogs.tsx](<../../FE/src/features/auth/AuthDialogs.tsx>), [EmailLogin.tsx](<../../FE/src/features/auth/EmailLogin.tsx>), [createEmailAttempt.ts](<../../FE/src/features/auth/createEmailAttempt.ts>)
- 계정·권한: guest→A 모의 인증; 기존 세션 로그아웃은 A 시작
- fixture 구성: mockUsers + emailAuthSource; 개인정보·원본 인증코드 복사 없이 합성 테스트값 사용
- 원본 관찰 표시값: 표시값·입력: Alex Smith와 이메일 샘플이 채워졌다. 비밀번호 입력은 없다.
- 원본 관찰 상태: 상태: 입력 후 제출 전 캡처다.
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 가입 폼이 위로 이동한 상태로 이름·이메일 입력란과 하단 약관이 보인다.
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F53-04 / U-S054, U-F53 / C46, C47, C48, C67. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 가입4/로그인5 제공자, 이메일/이름/약관/뒤로·6칸 코드와Validate·Resend·닫기, Sign out Cancel/Confirm→intro를 비교한다. 빈 폼의 녹색 버튼과 실제 입력 검증은 별개다.

<a id="s055"></a>

## S055 — 확장 오디오 플레이어

[원본 PNG](<../../medium/flows/Home/Story detail/Listening to a story/screens/04_sc_45ddcc1f43a54523a1314ce563abf5ee.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s055>) · `sc_45ddcc1f43a54523a1314ce563abf5ee`

- 담당: V18 / 묶음 12. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article Listen → 미니 플레이어 → 확장 → 재생·정지·seek·닫기
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListeningPlayer.tsx](<../../FE/src/features/listening/ListeningPlayer.tsx>)
- 계정·권한: A 모의 회원 자격; 실제 음성 없음
- fixture 구성: ListeningSource·mock 시계; 00:05/00:10/00:20/00:40 각 snapshot과 duration 독립
- 원본 관찰 표시값: 표시값·입력: 00:05, -04:35, 1x
- 원본 관찰 상태: 상태: 확장 재생 화면
- 시간: 재생00:05/-04:35/1x; mock 진행 고정
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 커버·작가·제목·진행 바·조작 버튼·Speechify 표시
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F26-04, T-F27-01, T-F28-01 / U-S055, U-F26, U-F27, U-F28 / C58, C59, C61, C66. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 준비 중 두 spinner, mini/expanded 동일 기사, 커버·배경·시간·진행선·10초/30초·희미한 이전/다음·닫기·Speechify 표시를 비교한다. 무음 timer는 실제 재생과 구분한다. Q12에서 미니/확장 플레이어의 모의 안내가 원본 배치에 미치는 영향을 판정한다.

<a id="s056"></a>

## S056 — 다크 읽기 목록 상세

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Profile/Settings/Switching to dark mode/screens/07_sc_45fd4ac6da2148968fab1446df649f7f.png>) · [원본 분석](<../../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s056>) · `sc_45fd4ac6da2148968fab1446df649f7f`

- 담당: V25 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>)
- 계정·권한: A 소유; 기본 reading-list와 일반 About mindfulness 구분
- fixture 구성: UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; D13 source 확정 updatedAt(Parity7 자체 계약)
- 원본 관찰 표시값: 표시값·입력: 4 stories·자물쇠, 한 기사 Viewed 표시
- 원본 관찰 상태: 상태: 읽은 기사 표시와 다크 테마
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 제목·메모·기사 카드 어두운 테마
- 테마: Dark 관찰; 앱/reader 각각 설정; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F62-07 / U-S056, U-F62 / C28, C30, C31, C32, C33, C34, C35. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

<a id="s057"></a>

## S057 — Life 토픽 상세

[원본 PNG](<../../medium/flows/Explore/Topic detail/screens/02_sc_4602e853aca341a697239bc9f55b6da3.png>) · [원본 분석](<../../medium/flows/Explore/Topic detail/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s057>) · `sc_4602e853aca341a697239bc9f55b6da3`

- 담당: V03 / 묶음 17. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Explore → Life 또는 Self Improvement → Topic(topicId); 큐레이션까지 스크롤
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [TopicScreen.tsx](<../../FE/src/features/topics/TopicScreen.tsx>)
- 계정·권한: 공개 열람; Following은 A의 topic 관계 필요
- fixture 구성: topicSource + relationshipSource; topicId와 following을 독립 설정
- 원본 관찰 표시값: 표시값·입력: 7.1M followers, 1.3M Stories
- 원본 관찰 상태: 상태: Life 미팔로우 상태
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 가로 관련 토픽·중앙 이름·집계·추천 기사
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F03-02, T-F04-01 / U-S057, U-F03, U-F04 / C06, C08. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Life와 Self Improvement는 별도 대상이다. Follow/Following·집계·관련 칩·헤더 축소와 See the full list의 대상 보존을 확인한다.

<a id="s058"></a>

## S058 — 다크 Library

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Profile/Settings/Switching to dark mode/screens/05_sc_4a39ee1d768342a9823787c11c851479.png>) · [원본 분석](<../../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s058>) · `sc_4a39ee1d768342a9823787c11c851479`

- 담당: V24 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Library → Your lists / Saved lists / Highlighted; 새 목록·삭제 후 복귀
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [LibraryScreen.tsx](<../../FE/src/features/bookmarks/LibraryScreen.tsx>), [HighlightList.tsx](<../../FE/src/features/highlights/HighlightList.tsx>)
- 계정·권한: A 개인 목록; 기본 reading-list는 항상 private
- fixture 구성: UserListStore·HighlightSource; empty/3/4 stories·About mindfulness를 각 상태별 구성
- 원본 관찰 표시값: 표시값·입력: Reading list4 stories·자물쇠
- 원본 관찰 상태: 상태: 라이브러리 테마 적용
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 어두운 리스트 카드·썸네일 유지
- 테마: Dark 관찰; 앱/reader 각각 설정; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F62-05 / U-S058, U-F62 / C20, C29, C31, C37. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 가로5탭, 초기 배너/닫기·Digest New, New list, 빈/3개/4개 카드 썸네일/잠금/다운로드/메뉴, Highlighted 구절·작성자·원문 링크를 비교한다.

<a id="s059"></a>

## S059 — Member 혜택과 Friend 플랜 노출

[원본 PNG](<../../medium/flows/Onboarding/Subscribing to Medium/screens/02_sc_4beaf37694cb429baac5c27b93a71ccf.png>) · [원본 분석](<../../medium/flows/Onboarding/Subscribing to Medium/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s059>) · `sc_4beaf37694cb429baac5c27b93a71ccf`

- 담당: V31 / 묶음 19. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Profile/Settings Upgrade 또는 onboarding 구독 → MembershipSheet → monthly/yearly → 모의 선택·성공
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [MembershipSheet.tsx](<../../FE/src/features/membership/MembershipSheet.tsx>)
- 계정·권한: A free/member/friend 비교 snapshot; 실제 결제 없음
- fixture 구성: MembershipSource; SGD 보관 가격·독립 pending/success fixture; OS 구매 알림과 web Alert 차이
- 원본 관찰 표시값: 표시값·입력: Member $6.98 SGD/month, Friend $19.98 SGD/month
- 원본 관찰 상태: 상태: 오프라인·오디오 등 혜택 설명
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 멤버십 시트 스크롤 중 Member 전체 카드와 다음 Friend 카드 일부
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F54-02 / U-S059, U-F54 / C50, C65, C66, C67. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 월/년 선택, SGD 가격·Save up to $39·혜택·Friend 카드, loading 덮개, 성공 팝업 OK와Start reading을 비교한다. 실제 구매 완료로 표시하지 않는다. Q12에서 모의 결제 안내의 노출·배치 차이를 함께 판정한다.

<a id="s060"></a>

## S060 — 제목과 본문 입력

[원본 PNG](<../../medium/flows/Home/Publishing a story/screens/03_sc_4db886af7d024100a72b9e02fa3c1ee8.png>) · [원본 분석](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s060>) · `sc_4db886af7d024100a72b9e02fa3c1ee8`

- 담당: V07 / 묶음 9. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Home 작성 → Editor; 제목·본문 입력 → 해당 서식·이미지 블록 선택
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [RichDocumentBody.tsx](<../../FE/src/features/editor/RichDocumentBody.tsx>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>), [editorModel.ts](<../../FE/src/features/editor/editorModel.ts>)
- 계정·권한: A 소유 초안; 같은 draftId 유지
- fixture 구성: DraftSource·EditorSession; 음악 제목/단락/인용/목록/구분선은 각 S의 문서 snapshot 별도
- 원본 관찰 표시값: 표시값·입력: The Silence between Notes 제목과 음악 관련 단락 입력
- 원본 관찰 상태: 상태: 본문 끝 커서
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 굵은 제목과 세리프 본문, 키보드 위 편집 도구
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 보임 관찰; web은 OS 키보드 비동등
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F08-03 / U-S060, U-F08 / C40. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 제목과 본문, 회색 문자 스타일, 이탤릭 인용선, bullet, 점3개 구분선, 선택 중 도구 색과 키보드 위 툴바를 비교한다. 코드 도구의 실행 후 모습은 원본 미확인이다.

<a id="s061"></a>

## S061 — Featured 기사 목록

[원본 PNG](<../../medium/flows/Home/screens/04_sc_4ec0a8b65f954b0984ece5b3b9f258e4.png>) · [원본 분석](<../../medium/flows/Home/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s061>) · `sc_4ec0a8b65f954b0984ece5b3b9f258e4`

- 담당: V01 / 묶음 17. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Home → For you·Featured 선택; S026은 헤더가 접힌 하단 카드, S176은 Featured 빈 상태
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [FollowingFeed.tsx](<../../FE/src/features/community/FollowingFeed.tsx>), [HomeFeedScreen.tsx](<../../FE/src/features/feed/HomeFeedScreen.tsx>)
- 계정·권한: 공개 열람; 원본 개인화 상태 비교는 A
- fixture 구성: mediumFeedFixtures / feedPreviewScenario(normal); Featured empty는 별도 feedSource 필요
- 원본 관찰 표시값: 표시값·입력: Featured 선택. 저장 아이콘 표시
- 원본 관찰 상태: 상태: Featured 콘텐츠가 있는 상태
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 동일 홈 구조에 발행물별 기사 카드
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F05-04 / U-S061, U-F05 / C04, C05. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: For you의 원형 −와 Featured의 북마크를 구분한다. 헤더 접힘, 탭 가로 위치, New 배지, 알림 점, 빈 Featured CTA와 채워진 목록을 각각 비교한다.

<a id="s062"></a>

## S062 — 새 응답 표시

[원본 PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/screens/03_sc_500793b8306c411585ba54ddaf6a8f25.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Commenting a story/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s062>) · `sc_500793b8306c411585ba54ddaf6a8f25`

- 담당: V20 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>)
- 계정·권한: A를 작성자 YOU에 대응; 본인/타인 응답 분리
- fixture 구성: ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태
- 원본 관찰 표시값: 표시값·입력: Responses 833, 2 seconds ago, 입력한 문장
- 원본 관찰 상태: 상태: Responses 833 및 본인 새 응답 표시. Commenting a story 흐름의 직전 입력 화면에서는 832였다
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 응답 목록 맨 위 Alex Smith YOU
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F31-03, T-F32-01, T-F33-01 / U-S062, U-F31, U-F32, U-F33 / C14, C15, C16, C17, C18, C20. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

<a id="s063"></a>

## S063 — 읽기 표시 설정 기본

[원본 PNG](<../../medium/flows/Home/Story detail/Changing display/screens/03_sc_557c1fb7c6bf4dcc82ba1d6aba677f94.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s063>) · `sc_557c1fb7c6bf4dcc82ba1d6aba677f94`

- 담당: V16 / 묶음 4. 상태: **historical-web-capture-parity-01**. Parity 1 당시 관찰: guest 표시 설정100%/Default/System Light/others on 실제 확인; 원본 직접 대조에서 팝오버 글자·열 구획·OS 영역·응답7 차이.; 현재 공통 보정과 잔여는 Parity 2 결과 참조; Parity 4 새 실행은 latestReview 참조; 과거 캡처를 현재 코드 증거로 승격하지 않음
- 실제 FE 진입 절차(정적 확인): Article 더보기 → Display settings → 100/120%, font, appearance, highlights
- Parity 1 당시 증거: [과거 웹 캡처](<EVIDENCE/PARITY_01/S063.png>). 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ArticleDisplayPopover.tsx](<../../FE/src/features/settings/ArticleDisplayPopover.tsx>), [useReaderTypography.ts](<../../FE/src/features/settings/useReaderTypography.ts>)
- 계정·권한: reader 설정 A; 앱 전역 theme와 별도
- fixture 구성: DisplaySettingsSource; S063 기본관찰값, S125=120%, S198=Dark120%, S001=others off
- 원본 관찰 표시값: 표시값·입력: 100%, Font Default, System default (Light), Highlights from others 켜짐
- 원본 관찰 상태: 상태: 이 캡처의 현재 표시 설정: 100%, Default 글꼴, System default (Light), 타인 하이라이트 On. 제품 전체 초기 기본값 여부는 미확인.
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 상단 크기 조절과 3개 설정 행
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F24-03 / U-S063, U-F24 / C02, C12, C13. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 100→120과 배경 제목 줄바꿈, Font family 행, Appearance 하위 선택, 타인 Highlight on/off와 어두운 팝오버를 비교한다. 본인 저장 강조 삭제와 분리한다.

<a id="s064"></a>

## S064 — 가입 인증 코드 입력 완료

[원본 PNG](<../../medium/flows/Onboarding/screens/06_sc_55d8ee5f826740d69ebd2e163aaa6486.png>) · [원본 분석](<../../medium/flows/Onboarding/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s064>) · `sc_55d8ee5f826740d69ebd2e163aaa6486`

- 담당: V29 / 묶음 14. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile 또는 Library guest → AuthDialogs → 이메일 signup/login/code; Profile/Settings → Sign out
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [AuthDialogs.tsx](<../../FE/src/features/auth/AuthDialogs.tsx>), [EmailLogin.tsx](<../../FE/src/features/auth/EmailLogin.tsx>), [createEmailAttempt.ts](<../../FE/src/features/auth/createEmailAttempt.ts>)
- 계정·권한: guest→A 모의 인증; 기존 세션 로그아웃은 A 시작
- fixture 구성: mockUsers + emailAuthSource; 개인정보·원본 인증코드 복사 없이 합성 테스트값 사용
- 원본 관찰 표시값: 표시값·입력: 6자리 숫자가 입력돼 있다. 실제 인증 값은 문서에 재기록하지 않는다.
- 원본 관찰 상태: 상태: 입력 완성에 따른 제출 가능 표현이다.
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 동일한 인증 시트에서 입력 여섯 칸이 채워졌다.
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F53-06 / U-S064, U-F53 / C46, C47, C48, C67. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 가입4/로그인5 제공자, 이메일/이름/약관/뒤로·6칸 코드와Validate·Resend·닫기, Sign out Cancel/Confirm→intro를 비교한다. 빈 폼의 녹색 버튼과 실제 입력 검증은 별개다.

<a id="s065"></a>

## S065 — Music 선택

[원본 PNG](<../../medium/flows/Home/Publishing a story/Adding topics/screens/04_sc_57162331e2334952b5da8676e4de3c22.png>) · [원본 분석](<../../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s065>) · `sc_57162331e2334952b5da8676e4de3c22`

- 담당: V06 / 묶음 9. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Home 작성 → Editor → Next/PublishPreview → Topics → 검색·선택·Save → preview
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [PublishTopics.tsx](<../../FE/src/features/editor/PublishTopics.tsx>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>)
- 계정·권한: A 소유 초안; Public/Unlisted 별도
- fixture 구성: DraftSource·PublishTopics; The Silence between Notes, Music/Culture/Art, 별도 Publication 없음
- 원본 관찰 표시값: 표시값·입력: Music 1개 선택
- 원본 관찰 상태: 상태: 선택 상태 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 검색 아래 삭제 가능한 칩과 결과 체크
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F07-04 / U-S065, U-F07 / C44, C45. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 검색 X와 chip X, 0/5·3/5·최대5, 빈값 Save의 모양, 미리보기 Edit/Publication/Unlisted/Publish now와 스크롤 헤더를 각각 확인한다.

<a id="s066"></a>

## S066 — 저장 글 있는 읽기 목록

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/screens/03_sc_57450c38bf994be18d95fcaf712c56ba.png>) · [원본 분석](<../../medium/flows/Library/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s066>) · `sc_57450c38bf994be18d95fcaf712c56ba`

- 담당: V24 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Library → Your lists / Saved lists / Highlighted; 새 목록·삭제 후 복귀
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [LibraryScreen.tsx](<../../FE/src/features/bookmarks/LibraryScreen.tsx>), [HighlightList.tsx](<../../FE/src/features/highlights/HighlightList.tsx>)
- 계정·권한: A 개인 목록; 기본 reading-list는 항상 private
- fixture 구성: UserListStore·HighlightSource; empty/3/4 stories·About mindfulness를 각 상태별 구성
- 원본 관찰 표시값: 표시값·입력: 3 stories·자물쇠
- 원본 관찰 상태: 상태: 기본 목록에 글 존재
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Your lists의 Reading list 카드·3개 썸네일
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F41-03, T-F42-01 / U-S066, U-F41, U-F42 / C20, C29, C31, C37. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 가로5탭, 초기 배너/닫기·Digest New, New list, 빈/3개/4개 카드 썸네일/잠금/다운로드/메뉴, Highlighted 구절·작성자·원문 링크를 비교한다.

<a id="s067"></a>

## S067 — 관심 주제 미선택

[원본 PNG](<../../medium/flows/Onboarding/screens/08_sc_5843ae43bf154aadb5507c6fa51d150d.png>) · [원본 분석](<../../medium/flows/Onboarding/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s067>) · `sc_5843ae43bf154aadb5507c6fa51d150d`

- 담당: V30 / 묶음 14. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): guest signup → Onboarding → interests → recommendations → permission → welcome; S043은 실제 cold start
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [OnboardingScreen.tsx](<../../FE/src/features/onboarding/OnboardingScreen.tsx>), [createOnboardingSession.ts](<../../FE/src/features/onboarding/createOnboardingSession.ts>)
- 계정·권한: 신규 A; 기존 A와 분리된 새 메모리 세션
- fixture 구성: OnboardingSource·NotificationPermissionSource; 관심5개/추천Follow/안내 상태; S043 대응 splash 없음
- 원본 관찰 표시값: 표시값·입력: 주제 3개 이상 선택 안내가 있고 보이는 칩은 미선택이다.
- 원본 관찰 상태: 상태: 최소 선택 개수를 안내하는 초기 상태다.
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 제목·설명 아래 다수 주제 칩을 줄바꿈 배치하고 하단에 Next를 둔다.
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F53-08 / U-S067, U-F53 / C49, C50. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 브랜드 시작, 새 경험 소개, 최소3개 안내와 관찰5개 선택, Follow/Finish, Enable/Skip와 다음 목적지를 확인한다. 모든 계정에 동일 순서를 강제하지 않는다.

<a id="s068"></a>

## S068 — 알림 목록

[원본 PNG](<../../medium/flows/Home/Notifications/screens/02_sc_5d1c7181dea04ba59b57242abbc19fee.png>) · [원본 분석](<../../medium/flows/Home/Notifications/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s068>) · `sc_5d1c7181dea04ba59b57242abbc19fee`

- 담당: V05 / 묶음 16. 상태: **recipe-only**. 원본 알림 이벤트 배열·시간과 같은 fixture 미확정; 기존 Goal53 캡처는 새 증거 아님.
- 실제 FE 진입 절차(정적 확인): A 로그인 → Home 알림 버튼 → Notifications; 알림 유형별 목적지와 복귀
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [NotificationsScreen.tsx](<../../FE/src/features/notifications/NotificationsScreen.tsx>)
- 계정·권한: A 개인 알림; 원본과 같은 이벤트 배열은 별도 필요
- fixture 구성: notificationFixtures + NotificationSource; 현재 목록과 S068 원본 배열의 동일성 미확인
- 원본 관찰 표시값: 표시값·입력: 새 팔로워·저장 리스트 새 글·박수 이벤트
- 원본 관찰 상태: 상태: 여러 종류 알림 존재
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 행별 아바타·이벤트 문장·날짜, 일부 왼쪽 녹색선
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F06-02 / U-S068, U-F06 / C55. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 원본 네 행의 사용자·목록·글 이벤트, Follow가 있는 행, 녹색선, 날짜·아이콘을 고정 fixture에서 비교한다. 녹색선을 원본 읽음 정책으로 단정하지 않는다.

<a id="s069"></a>

## S069 — For you 홈 피드

[원본 PNG](<../../medium/flows/Explore/screens/01_sc_5e0ba0e498ff49579bf838096aec4b5e.png>) · [원본 분석](<../../medium/flows/Explore/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s069>) · `sc_5e0ba0e498ff49579bf838096aec4b5e`

- 담당: V01 / 묶음 17. 상태: **historical-web-capture-parity-01**. Parity 1 당시 관찰: guest/기본 feed 실제 진입. 원본 1.3K·529 응답 대신 현재0; OS 영역·폰트·카드 높이·자체 잘린 기사 안내 차이. 원본과 같은 상태 아님.; 현재 공통 보정과 잔여는 Parity 2 결과 참조
- 실제 FE 진입 절차(정적 확인): Main/Home → For you·Featured 선택; S026은 헤더가 접힌 하단 카드, S176은 Featured 빈 상태
- Parity 1 당시 증거: [과거 웹 캡처](<EVIDENCE/PARITY_01/S069.png>). 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [FollowingFeed.tsx](<../../FE/src/features/community/FollowingFeed.tsx>), [HomeFeedScreen.tsx](<../../FE/src/features/feed/HomeFeedScreen.tsx>)
- 계정·권한: 공개 열람; 원본 개인화 상태 비교는 A
- fixture 구성: mediumFeedFixtures / feedPreviewScenario(normal); Featured empty는 별도 feedSource 필요
- 원본 관찰 표시값: 표시값·입력: For you 활성. 작가·제목·요약·썸네일·날짜·박수·응답 수 표시
- 원본 관찰 상태: 상태: 추천 기사 목록
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 상단 Home·알림, 가로 탭, 세로 기사 카드, 하단 4탭과 작성 플로팅 버튼
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F01-01, T-F05-01, T-F06-01, T-F08-01, T-F12-01, T-F41-01, T-F52-07, T-F53-13, T-F54-06, T-F55-01 / U-S069, U-F01, U-F05, U-F06, U-F08, U-F12, U-F41, U-F52, U-F53, U-F54, U-F55 / C04, C05. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: For you의 원형 −와 Featured의 북마크를 구분한다. 헤더 접힘, 탭 가로 위치, New 배지, 알림 점, 빈 Featured CTA와 채워진 목록을 각각 비교한다.

<a id="s070"></a>

## S070 — Explore 토픽 가로 이동

[원본 PNG](<../../medium/flows/Explore/screens/03_sc_602f368bf00a46b8b57d68f964ed6c16.png>) · [원본 분석](<../../medium/flows/Explore/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s070>) · `sc_602f368bf00a46b8b57d68f964ed6c16`

- 담당: V02 / 묶음 17. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Explore → 검색 진입·Mindfulness 입력·Stories; Staff Picks/Who to follow 위치까지 세로·가로 이동
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [CatalogSearchResults.tsx](<../../FE/src/features/search/CatalogSearchResults.tsx>), [ExploreSections.tsx](<../../FE/src/features/search/ExploreSections.tsx>), [SearchScreen.tsx](<../../FE/src/features/search/SearchScreen.tsx>)
- 계정·권한: 공개 열람; 관계 조작은 A
- fixture 구성: mediumFeedFixtures / SearchScreen·CatalogSearchResults; 칩·캐러셀 위치는 화면별 설정
- 원본 관찰 표시값: 표시값·입력: Health·Science·Business·Life 등
- 원본 관찰 상태: 상태: 가로 탐색 상태
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 가로 칩 영역에 다른 주제
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F01-03, T-F03-01 / U-S070, U-F01, U-F03 / C06, C07. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 검색 빈 화면의 토픽 행, Stories 결과, 다섯 탭과 X를 분리한다. Trending 순위, Staff Picks 가로 카드, Recommended 세로 카드, Who to follow 가로 이동을 원본 상태별로 비교한다.

<a id="s071"></a>

## S071 — 답글 생성 표시

[원본 PNG](<../../medium/flows/Home/Story detail/Responses/Replying a response/screens/04_sc_60bd813234264b59b304bd3ac3df0af4.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Replying a response/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s071>) · `sc_60bd813234264b59b304bd3ac3df0af4`

- 담당: V20 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>)
- 계정·권한: A를 작성자 YOU에 대응; 본인/타인 응답 분리
- fixture 구성: ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태
- 원본 관찰 표시값: 표시값·입력: Agree!, Responses 832 유지
- 원본 관찰 상태: 상태: 새 답글 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 들여쓴 YOU 응답·1 second ago
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F35-04 / U-S071, U-F35 / C14, C15, C16, C17, C18, C20. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

<a id="s072"></a>

## S072 — 답글 대상 선택

[원본 PNG](<../../medium/flows/Home/Story detail/Responses/Replying a response/screens/02_sc_6101af9ca21443afbe2c2146c8ac2e3d.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Replying a response/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s072>) · `sc_6101af9ca21443afbe2c2146c8ac2e3d`

- 담당: V20 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>)
- 계정·권한: A를 작성자 YOU에 대응; 본인/타인 응답 분리
- fixture 구성: ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태
- 원본 관찰 표시값: 표시값·입력: Replying to Bérnie, 빈 작성창
- 원본 관찰 상태: 상태: 특정 응답에 답글 모드
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 부모 응답과 하위 답글 위 회색 배경, 하단 대상 안내
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F35-02 / U-S072, U-F35 / C14, C15, C16, C17, C18, C20. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

<a id="s073"></a>

## S073 — 공유 이미지 저장 안내

[원본 PNG](<../../medium/flows/Home/Story detail/Sharing a story/Downloading an image/screens/02_sc_62256b592ebc4b028f1097aa21f9e400.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Sharing a story/Downloading an image/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s073>) · `sc_62256b592ebc4b028f1097aa21f9e400`

- 담당: V23 / 묶음 13. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article/인용/Identity/PublicList 공유 → 카드 → Copy link/Save image/Share via
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ShareCard.tsx](<../../FE/src/features/sharing/ShareCard.tsx>), [ShareSheet.tsx](<../../FE/src/features/sharing/ShareSheet.tsx>)
- 계정·권한: A; 공개 권한/모의 회원 링크 자격 각각 검증
- fixture 구성: ShareAdapter; 공개 공유 target + 카드 style index; OS 저장·공유는 Q07
- 원본 관찰 표시값: 표시값·입력: 동일 카드
- 원본 관찰 상태: 상태: 이미지 저장 성공 안내
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 상단 Image saved to library 토스트
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F40-02 / U-S073, U-F40 / C23, C61, C62, C63, C64. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: blur 배경·카드 테두리·회전 주소·페이지 점·행동 가로 이동, Copy link·Friend Link·Share via·Save image와 각 성공 토스트를 비교한다.

<a id="s074"></a>

## S074 — 내 프로필 Lists

[원본 PNG](<../../medium/flows/Profile/screens/04_sc_64afef71457f48808c33def66fd6d90e.png>) · [원본 분석](<../../medium/flows/Profile/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s074>) · `sc_64afef71457f48808c33def66fd6d90e`

- 담당: V32 / 묶음 15. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>)
- 계정·권한: A 소유; 표시 이름 Alex Smith와 userId는 별개
- fixture 구성: ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도
- 원본 관찰 표시값: 표시값·입력: 4 stories·자물쇠
- 원본 관찰 상태: 상태: 소유자가 비공개 목록을 봄
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Lists 탭의 기본 Reading list
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F55-04 / U-S074, U-F55 / C51, C52, C53. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

<a id="s075"></a>

## S075 — 앱 아이콘 선택과 멤버십 제한

[원본 PNG](<../../medium/flows/Profile/Settings/Custom app icon/screens/02_sc_64b75d913b284d708ab44e4f3663a59f.png>) · [원본 분석](<../../medium/flows/Profile/Settings/Custom app icon/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_03.md#s075>) · `sc_64b75d913b284d708ab44e4f3663a59f`

- 담당: V33 / 묶음 18. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Profile/Settings → Account/Appearance/App icon/각 상세 → 복귀
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [AppIconScreen.tsx](<../../FE/src/features/app-icon/AppIconScreen.tsx>), [SettingsExtrasScreen.tsx](<../../FE/src/features/settings/SettingsExtrasScreen.tsx>), [SettingsScreen.tsx](<../../FE/src/features/settings/SettingsScreen.tsx>)
- 계정·권한: A; friend icon 자격과 OS launcher 상태 별도
- fixture 구성: DisplaySettingsSource·AppIconAdapter; 자체 K 아이콘, S075 원본과 비동등
- 원본 관찰 표시값: 표시값·입력: Wordmark Black 선택, 다른 아이콘 흐림
- 원본 관찰 상태: 상태: 아이콘 변경 기능 잠금 안내
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 2열 아이콘 카드·하단 업그레이드 버튼
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F60-02 / U-S075, U-F60 / C02, C66, C67, C68, C69. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 모든 행과 섹션·외부 화살표·Facebook 안내·버전·Appearance 선택, 2열 아이콘8종·Wordmark Black선택·Friend잠금·하단잘림을 비교한다. 자체 K 자산을 원본과 동일로 세지 않는다.

<a id="s076"></a>

## S076 — 리스트 생성 빈 폼

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/Creating a list/screens/02_sc_675e3eda08504708979533659dacdcf6.png>) · [원본 분석](<../../medium/flows/Library/Creating a list/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s076>) · `sc_675e3eda08504708979533659dacdcf6`

- 담당: V25 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>)
- 계정·권한: A 소유; 기본 reading-list와 일반 About mindfulness 구분
- fixture 구성: UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; D13 source 확정 updatedAt(Parity7 자체 계약)
- 원본 관찰 표시값: 표시값·입력: 이름0/60, 설명0/280, Private 꺼짐
- 원본 관찰 상태: 상태: 생성 전 입력
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Create new list 시트·이름·선택 설명·비공개 토글
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F42-02 / U-S076, U-F42 / C28, C30, C31, C32, C33, C34, C35. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

<a id="s077"></a>

## S077 — 변경 순서 반영

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/List detail/Reordering items/screens/05_sc_6840597985cc46b6b12f6cd0204756f4.png>) · [원본 분석](<../../medium/flows/Library/List detail/Reordering items/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s077>) · `sc_6840597985cc46b6b12f6cd0204756f4`

- 담당: V25 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>)
- 계정·권한: A 소유; 기본 reading-list와 일반 About mindfulness 구분
- fixture 구성: UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; D13 source 확정 updatedAt(Parity7 자체 계약)
- 원본 관찰 표시값: 표시값·입력: 첫 2개 항목이 변경 순서와 일치, 1 second ago
- 원본 관찰 상태: 상태: 재정렬 결과 표시
- 시간: 목록 표시1초+4개; 재정렬 확정 상태/D13
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 기사 카드 목록 복귀
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F51-05 / U-S077, U-F51 / C28, C30, C31, C32, C33, C34, C35. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

<a id="s078"></a>

## S078 — 리스트 순서 편집

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/List detail/Reordering items/screens/03_sc_6a1036b35729490195c460e5b934bd68.png>) · [원본 분석](<../../medium/flows/Library/List detail/Reordering items/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s078>) · `sc_6a1036b35729490195c460e5b934bd68`

- 담당: V25 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>)
- 계정·권한: A 소유; 기본 reading-list와 일반 About mindfulness 구분
- fixture 구성: UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; D13 source 확정 updatedAt(Parity7 자체 계약)
- 원본 관찰 표시값: 표시값·입력: 기존 순서 유지
- 원본 관찰 상태: 상태: 재정렬 모드
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 제목만 있는 4행과 드래그 핸들
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F51-03 / U-S078, U-F51 / C28, C30, C31, C32, C33, C34, C35. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

<a id="s079"></a>

## S079 — 팔로우 추천 카드

[원본 PNG](<../../medium/flows/Explore/screens/05_sc_6bc604f45031400d9cebd252cd89e7a2.png>) · [원본 분석](<../../medium/flows/Explore/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s079>) · `sc_6bc604f45031400d9cebd252cd89e7a2`

- 담당: V02 / 묶음 17. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Explore → 검색 진입·Mindfulness 입력·Stories; Staff Picks/Who to follow 위치까지 세로·가로 이동
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [CatalogSearchResults.tsx](<../../FE/src/features/search/CatalogSearchResults.tsx>), [ExploreSections.tsx](<../../FE/src/features/search/ExploreSections.tsx>), [SearchScreen.tsx](<../../FE/src/features/search/SearchScreen.tsx>)
- 계정·권한: 공개 열람; 관계 조작은 A
- fixture 구성: mediumFeedFixtures / SearchScreen·CatalogSearchResults; 칩·캐러셀 위치는 화면별 설정
- 원본 관찰 표시값: 표시값·입력: 작가와 Publication·소개·팔로워
- 원본 관찰 상태: 상태: 팔로우 대상 추천
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Who to follow 가로 카드
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F01-05 / U-S079, U-F01 / C06, C07. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 검색 빈 화면의 토픽 행, Stories 결과, 다섯 탭과 X를 분리한다. Trending 순위, Staff Picks 가로 카드, Recommended 세로 카드, Who to follow 가로 이동을 원본 상태별로 비교한다.

<a id="s080"></a>

## S080 — 대명사 검색

[원본 PNG](<../../medium/flows/Profile/Editing profile information/Adding pronouns/screens/03_sc_6c7a00132f3c47e6b2e803743cc10d21.png>) · [원본 분석](<../../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s080>) · `sc_6c7a00132f3c47e6b2e803743cc10d21`

- 담당: V32 / 묶음 15. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>)
- 계정·권한: A 소유; 표시 이름 Alex Smith와 userId는 별개
- fixture 구성: ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도
- 원본 관찰 표시값: 표시값·입력: he, her 후보
- 원본 관찰 상태: 상태: 검색어에 맞춘 대명사 선택
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: he 입력 아래 후보 목록
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F56-03 / U-S080, U-F56 / C51, C52, C53. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

<a id="s081"></a>

## S081 — 내 리스트 관리 메뉴

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/List detail/Deleting a list/screens/02_sc_71f31ac7803a47f89b2e76b6a9355a7c.png>) · [원본 분석](<../../medium/flows/Library/List detail/Deleting a list/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s081>) · `sc_71f31ac7803a47f89b2e76b6a9355a7c`

- 담당: V25 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>)
- 계정·권한: A 소유; 기본 reading-list와 일반 About mindfulness 구분
- fixture 구성: UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; D13 source 확정 updatedAt(Parity7 자체 계약)
- 원본 관찰 표시값: 표시값·입력: 공개 상태 메뉴
- 원본 관찰 상태: 상태: 목록 관리 작업 선택
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 제목 옆 더보기 팝오버
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F47-02, T-F49-02, T-F51-02 / U-S081, U-F47, U-F49, U-F51 / C28, C30, C31, C32, C33, C34, C35. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

<a id="s082"></a>

## S082 — 대명사 선택 빈 폼

[원본 PNG](<../../medium/flows/Profile/Editing profile information/Adding pronouns/screens/02_sc_743e421bb2b14205b19b76062fdf27cd.png>) · [원본 분석](<../../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s082>) · `sc_743e421bb2b14205b19b76062fdf27cd`

- 담당: V32 / 묶음 15. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>)
- 계정·권한: A 소유; 표시 이름 Alex Smith와 userId는 별개
- fixture 구성: ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도
- 원본 관찰 표시값: 표시값·입력: 0/4
- 원본 관찰 상태: 상태: 대명사 미선택
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Pronouns 시트·선택 입력란
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F56-02 / U-S082, U-F56 / C51, C52, C53. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

<a id="s083"></a>

## S083 — 작가 About

[원본 PNG](<../../medium/flows/Home/Story detail/Author detail/screens/04_sc_74429222aa3d45a89f1980b3aa0b6f9e.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s083>) · `sc_74429222aa3d45a89f1980b3aa0b6f9e`

- 담당: V14 / 묶음 5. 상태: **recipe-only**. Parity 5에서 mock 연결/웹 부분 대조를 수행함; 원본 차이·미확인·native 대기. 사용자 지시로 캡처 파일을 저장하지 않았으며 원본 동일성이나 ready로 승격하지 않음
- 최신 검토: [Parity 5 결과](<../FE_MEDIUM_PARITY_05_RESULT.md>); 관계 카탈로그·관리 목록·동작 및 웹 부분 비교; 원본 시각 차이·U 미확인·native 대기
- 실제 FE 진입 절차(정적 확인): Article 작성자 → Identity(writer Jordan) → Stories/Lists/About → Following·followers → Connections
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ConnectionsScreen.tsx](<../../FE/src/features/community/ConnectionsScreen.tsx>), [FollowControl.tsx](<../../FE/src/features/community/FollowControl.tsx>), [PublicIdentityScreen.tsx](<../../FE/src/features/community/PublicIdentityScreen.tsx>)
- 계정·권한: 공개 프로필; follow/email 관계는 A
- fixture 구성: useIdentityCatalog·RelationshipSource; Jordan10.2K/25, 기사말미24를 억지로 통일하지 않음; 동적 B 이름은 확정 프로필과 같은 ID로 해석
- 원본 관찰 표시값: 표시값·입력: Medium member since October 2023, Friend since December 2023
- 원본 관찰 상태: 상태: 소개·회원 이력 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: About 탭에 소개 단락·회원 기간
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F17-04 / U-S083, U-F17 / C21, C22. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About, Pinned, member/Friend 시작 월, Follow 성공·메뉴·해제 토스트, Email on/off, 작가와 publication 관계 목록을 각각 확인한다.

<a id="s084"></a>

## S084 — 멤버십 선택 처리 중

[원본 PNG](<../../medium/flows/Onboarding/Subscribing to Medium/screens/03_sc_754aff4161c64e0685e7331a359eae32.png>) · [원본 분석](<../../medium/flows/Onboarding/Subscribing to Medium/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s084>) · `sc_754aff4161c64e0685e7331a359eae32`

- 담당: V31 / 묶음 19. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Profile/Settings Upgrade 또는 onboarding 구독 → MembershipSheet → monthly/yearly → 모의 선택·성공
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [MembershipSheet.tsx](<../../FE/src/features/membership/MembershipSheet.tsx>)
- 계정·권한: A free/member/friend 비교 snapshot; 실제 결제 없음
- fixture 구성: MembershipSource; SGD 보관 가격·독립 pending/success fixture; OS 구매 알림과 web Alert 차이
- 원본 관찰 표시값: 표시값·입력: 선택 버튼 흐리게 표시
- 원본 관찰 상태: 상태: 요청 처리 중으로 보이는 로딩 상태
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 플랜 카드 위 반투명 덮개와 중앙 녹색 로딩
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F54-03 / U-S084, U-F54 / C50, C65, C66, C67. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 월/년 선택, SGD 가격·Save up to $39·혜택·Friend 카드, loading 덮개, 성공 팝업 OK와Start reading을 비교한다. 실제 구매 완료로 표시하지 않는다. Q12에서 모의 결제 안내의 노출·배치 차이를 함께 판정한다.

<a id="s085"></a>

## S085 — 리스트 삭제 후 라이브러리

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/List detail/Deleting a list/screens/04_sc_7749ef5c35474c229a2515a9c2a53878.png>) · [원본 분석](<../../medium/flows/Library/List detail/Deleting a list/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s085>) · `sc_7749ef5c35474c229a2515a9c2a53878`

- 담당: V24 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Library → Your lists / Saved lists / Highlighted; 새 목록·삭제 후 복귀
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [LibraryScreen.tsx](<../../FE/src/features/bookmarks/LibraryScreen.tsx>), [HighlightList.tsx](<../../FE/src/features/highlights/HighlightList.tsx>)
- 계정·권한: A 개인 목록; 기본 reading-list는 항상 private
- fixture 구성: UserListStore·HighlightSource; empty/3/4 stories·About mindfulness를 각 상태별 구성
- 원본 관찰 표시값: 표시값·입력: List deleted and removed from Your library, Reading list 4 stories
- 원본 관찰 상태: 상태: 대상 리스트 제거 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 목록 화면과 삭제 토스트
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F47-04 / U-S085, U-F47 / C20, C29, C31, C37. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 가로5탭, 초기 배너/닫기·Digest New, New list, 빈/3개/4개 카드 썸네일/잠금/다운로드/메뉴, Highlighted 구절·작성자·원문 링크를 비교한다.

<a id="s086"></a>

## S086 — 다크 홈 피드

[원본 PNG](<../../medium/flows/Profile/Settings/Switching to dark mode/screens/03_sc_77bbb7d671f14c6db68071c5921f22fa.png>) · [원본 분석](<../../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s086>) · `sc_77bbb7d671f14c6db68071c5921f22fa`

- 담당: V01 / 묶음 17. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Home → For you·Featured 선택; S026은 헤더가 접힌 하단 카드, S176은 Featured 빈 상태
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [FollowingFeed.tsx](<../../FE/src/features/community/FollowingFeed.tsx>), [HomeFeedScreen.tsx](<../../FE/src/features/feed/HomeFeedScreen.tsx>)
- 계정·권한: 공개 열람; 원본 개인화 상태 비교는 A
- fixture 구성: mediumFeedFixtures / feedPreviewScenario(normal); Featured empty는 별도 feedSource 필요
- 원본 관찰 표시값: 표시값·입력: For you 활성
- 원본 관찰 상태: 상태: 홈에도 테마 적용
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 검정 배경·밝은 카드 텍스트·녹색 작성 버튼
- 테마: Dark 관찰; 앱/reader 각각 설정; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F62-03 / U-S086, U-F62 / C04, C05. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: For you의 원형 −와 Featured의 북마크를 구분한다. 헤더 접힘, 탭 가로 위치, New 배지, 알림 점, 빈 Featured CTA와 채워진 목록을 각각 비교한다.

<a id="s087"></a>

## S087 — Unsplash 사진 선택

[원본 PNG](<../../medium/flows/Home/Publishing a story/screens/05_sc_785431954ec4405eb0a3b22debce165a.png>) · [원본 분석](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s087>) · `sc_785431954ec4405eb0a3b22debce165a`

- 담당: V08 / 묶음 9. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Editor → 이미지 메뉴 → Camera/Library/Unsplash → 선택·삽입; 로딩은 지연 source로 제어
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ImagePickerSheet.tsx](<../../FE/src/features/editor/ImagePickerSheet.tsx>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>)
- 계정·권한: A 소유 초안; OS 권한은 native에서 별도
- fixture 구성: EditorImageSource; 로컬 예시 자산·삽입 지연·성공 snapshot; 실제 외부 검색 아님
- 원본 관찰 표시값: 표시값·입력: Search photos 빈값
- 원본 관찰 상태: 상태: 외부 사진 탐색 시트
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 검색 필드 아래 2열 가변 높이 사진과 작가 이름
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F08-05 / U-S087, U-F08 / C41. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 사진 소스 시트, Unsplash 2열 가변 높이와 작가 표시, 준비 중 덮개·스피너·녹색 테두리·X, 삽입 후 키보드 상태를 각각 비교한다.

<a id="s088"></a>

## S088 — Hans 음성 선택

[원본 PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/05_sc_78bee192bd2041a98f6721240f2352d5.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s088>) · `sc_78bee192bd2041a98f6721240f2352d5`

- 담당: V19 / 묶음 12. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): 확장 플레이어 → Speed 또는 더보기 → Select a voice → 언어 스크롤·Hans → Done
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListeningSpeedPanel.tsx](<../../FE/src/features/listening/ListeningSpeedPanel.tsx>), [ListeningVoicePanel.tsx](<../../FE/src/features/listening/ListeningVoicePanel.tsx>)
- 계정·권한: A; 권한과 현재 선택을 별도 설정
- fixture 구성: ListeningOptionsSource; Emma/Hans, 1x200WPM·2.5x490WPM은 관찰값 fixture
- 원본 관찰 표시값: 표시값·입력: Hans 선택
- 원본 관찰 상태: 상태: 음성 선택 변경
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 독일어 Hans 행 회색·녹색 체크
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F28-05 / U-S088, U-F28 / C59, C60, C61. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 세로 slider·1x/200 WPM·2.5x/490 WPM·145% 문구, voice 언어 section/국기/성별/나라/선택색, Emma→Hans와 Done, 더보기6행을 비교한다.

<a id="s089"></a>

## S089 — 다운로드 표시 변경

**Parity 8 최신 비교:** [이번 결과](../FE_MEDIUM_PARITY_08_RESULT.md). 원본 PNG와 393×852/DPR1 진행/완료, 320/393 Light/Dark의 별표/metadata를 메모리 화면으로 대조했다. S16530초/S08951초는 독립 display clock; 실제 원본 촬영시각/경과 추정 아님. mock 계정·서체/일부 간격·OS 차이와 U/native 잔여, 캡처 파일 없음. 아래 초기 준비 상태는 과거 이력이며 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/List detail/Downloading a list/screens/03_sc_7b31963fc5c64fc8b9268beab4009201.png>) · [원본 분석](<../../medium/flows/Library/List detail/Downloading a list/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s089>) · `sc_7b31963fc5c64fc8b9268beab4009201`

- 담당: V26 / 묶음 8. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Library → ReadingList → Download → 진행·완료·취소·본문 열기
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [DownloadControl.tsx](<../../FE/src/features/downloads/DownloadControl.tsx>)
- 계정·권한: A 모의 회원; 소유 목록 접근권 필요
- fixture 구성: DownloadSource; 4개 일반 글 및 발행 혼합; 진행률·취소 source 제어; 영속 파일 없음
- 원본 관찰 표시값: 표시값·입력: 4 stories
- 원본 관찰 상태: 상태: 다운로드 완료를 나타내는 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 상단 및 기사별 내려받기 아이콘 채움
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F48-03 / U-S089, U-F48 / C36, C66. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 목록 시작 아이콘→정지 사각형→목록/각 기사 채운 아이콘을 확인한다. 메모리 사본과 실제 비행기 모드/재시작 캐시를 구분한다.

<a id="s090"></a>

## S090 — 팔로잉 계정 목록

[원본 PNG](<../../medium/flows/Home/Story detail/Author detail/Following list/screens/02_sc_7c89f4496e7f4cb0b5c23b776080b6bf.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/Following list/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s090>) · `sc_7c89f4496e7f4cb0b5c23b776080b6bf`

- 담당: V14 / 묶음 5. 상태: **recipe-only**. Parity 5에서 mock 연결/웹 부분 대조를 수행함; 원본 차이·미확인·native 대기. 사용자 지시로 캡처 파일을 저장하지 않았으며 원본 동일성이나 ready로 승격하지 않음
- 최신 검토: [Parity 5 결과](<../FE_MEDIUM_PARITY_05_RESULT.md>); 관계 카탈로그·관리 목록·동작 및 웹 부분 비교; 원본 시각 차이·U 미확인·native 대기
- 실제 FE 진입 절차(정적 확인): Article 작성자 → Identity(writer Jordan) → Stories/Lists/About → Following·followers → Connections
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ConnectionsScreen.tsx](<../../FE/src/features/community/ConnectionsScreen.tsx>), [FollowControl.tsx](<../../FE/src/features/community/FollowControl.tsx>), [PublicIdentityScreen.tsx](<../../FE/src/features/community/PublicIdentityScreen.tsx>)
- 계정·권한: 공개 프로필; follow/email 관계는 A
- fixture 구성: useIdentityCatalog·RelationshipSource; Jordan10.2K/25, 기사말미24를 억지로 통일하지 않음; 동적 B 이름은 확정 프로필과 같은 ID로 해석
- 원본 관찰 표시값: 표시값·입력: 여러 사용자와 The Medium Blog 표시
- 원본 관찰 상태: 상태: 관계 목록 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 아바타·이름·소개·Follow 반복 행
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F21-02 / U-S090, U-F21 / C21, C22. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About, Pinned, member/Friend 시작 월, Follow 성공·메뉴·해제 토스트, Email on/off, 작가와 publication 관계 목록을 각각 확인한다.

<a id="s091"></a>

## S091 — Self Improvement 토픽

[원본 PNG](<../../medium/flows/Explore/Topic detail/Browse curated list/screens/02_sc_7de88da749774d0483716f2e861fb080.png>) · [원본 분석](<../../medium/flows/Explore/Topic detail/Browse curated list/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s091>) · `sc_7de88da749774d0483716f2e861fb080`

- 담당: V03 / 묶음 17. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Explore → Life 또는 Self Improvement → Topic(topicId); 큐레이션까지 스크롤
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [TopicScreen.tsx](<../../FE/src/features/topics/TopicScreen.tsx>)
- 계정·권한: 공개 열람; Following은 A의 topic 관계 필요
- fixture 구성: topicSource + relationshipSource; topicId와 following을 독립 설정
- 원본 관찰 표시값: 표시값·입력: 10.6M followers, 1M Stories, Following
- 원본 관찰 상태: 상태: 팔로우 중인 다른 토픽
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 선택 칩 변경·추천 기사 교체
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F04-02 / U-S091, U-F04 / C06, C08. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Life와 Self Improvement는 별도 대상이다. Follow/Following·집계·관련 칩·헤더 축소와 See the full list의 대상 보존을 확인한다.

<a id="s092"></a>

## S092 — 답글 내용 입력

[원본 PNG](<../../medium/flows/Home/Story detail/Responses/Replying a response/screens/03_sc_8202187474f444de8773b38fe92c4d82.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Replying a response/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s092>) · `sc_8202187474f444de8773b38fe92c4d82`

- 담당: V20 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>)
- 계정·권한: A를 작성자 YOU에 대응; 본인/타인 응답 분리
- fixture 구성: ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태
- 원본 관찰 표시값: 표시값·입력: Agree! 입력
- 원본 관찰 상태: 상태: 답글 제출 전
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 대상 안내 아래 키보드와 작성창
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 보임 관찰; web은 OS 키보드 비동등
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F35-03 / U-S092, U-F35 / C14, C15, C16, C17, C18, C20. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

<a id="s093"></a>

## S093 — 작가 프로필의 다른 캡처 상태

[원본 PNG](<../../medium/flows/Home/Story detail/Author detail/Blocking an author/screens/04_sc_8208a84fba4c4046aa1d364055d14db7.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/Blocking an author/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s093>) · `sc_8208a84fba4c4046aa1d364055d14db7`

- 담당: V15 / 묶음 5. 상태: **recipe-only**. Parity 5에서 mock 연결/웹 부분 대조를 수행함; 원본 차이·미확인·native 대기. 사용자 지시로 캡처 파일을 저장하지 않았으며 원본 동일성이나 ready로 승격하지 않음
- 최신 검토: [Parity 5 결과](<../FE_MEDIUM_PARITY_05_RESULT.md>); 관계 카탈로그·관리 목록·동작 및 웹 부분 비교; 원본 시각 차이·U 미확인·native 대기
- 실제 FE 진입 절차(정적 확인): Identity 또는 Article 더보기 → Mute/Block/Report → 선택·확정·토스트
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ModerationDialogs.tsx](<../../FE/src/features/moderation/ModerationDialogs.tsx>), [articleModeration.ts](<../../FE/src/features/moderation/articleModeration.ts>)
- 계정·권한: A; follow/mute/block/report 각각 별도 상태
- fixture 구성: ModerationSource·RelationshipSource와 공통 사용자 카탈로그; S093은 별도 snapshot이며 차단 결과로 단정하지 않음; 신고/차단/음소거 별도 상태
- 원본 관찰 표시값: 표시값·입력: 10.8K followers, 25 following
- 원본 관찰 상태: 상태: 차단 흐름 후 별도 프로필 상태
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 상단 작가 제목, Stories·About만, Follow 버튼 없음
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F18-04 / U-S093, U-F18 / C12, C18, C23, C24, C61. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 메뉴 순서·파랑/빨강·Cancel, 성공 토스트, 신고 radio와 Also block checkbox, 사유 전후 Report 상태를 비교한다. 차단 후 원본 카드 잔존과 자체 접근 제한의 충돌을 기록한다.

<a id="s094"></a>

## S094 — 대명사 2개 선택

[원본 PNG](<../../medium/flows/Profile/Editing profile information/Adding pronouns/screens/05_sc_82178c6b5a56471cb64fecb5a4e4bc4e.png>) · [원본 분석](<../../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s094>) · `sc_82178c6b5a56471cb64fecb5a4e4bc4e`

- 담당: V32 / 묶음 15. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>)
- 계정·권한: A 소유; 표시 이름 Alex Smith와 userId는 별개
- fixture 구성: ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도
- 원본 관찰 표시값: 표시값·입력: 2/4
- 원본 관찰 상태: 상태: 두 대명사 선택
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: he·him 칩
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F56-05 / U-S094, U-F56 / C51, C52, C53. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

<a id="s095"></a>

## S095 — Library 초기 목록

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/screens/02_sc_84e0421de98041bbb014822fc05dd3fb.png>) · [원본 분석](<../../medium/flows/Library/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s095>) · `sc_84e0421de98041bbb014822fc05dd3fb`

- 담당: V24 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Library → Your lists / Saved lists / Highlighted; 새 목록·삭제 후 복귀
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [LibraryScreen.tsx](<../../FE/src/features/bookmarks/LibraryScreen.tsx>), [HighlightList.tsx](<../../FE/src/features/highlights/HighlightList.tsx>)
- 계정·권한: A 개인 목록; 기본 reading-list는 항상 private
- fixture 구성: UserListStore·HighlightSource; empty/3/4 stories·About mindfulness를 각 상태별 구성
- 원본 관찰 표시값: 표시값·입력: Your lists 활성, No stories·자물쇠
- 원본 관찰 상태: 상태: 기본 읽기 목록이 비어 있음
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Your library·New list·가로 탭·시작 배너·Reading list 카드
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F41-02 / U-S095, U-F41 / C20, C29, C31, C37. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 가로5탭, 초기 배너/닫기·Digest New, New list, 빈/3개/4개 카드 썸네일/잠금/다운로드/메뉴, Highlighted 구절·작성자·원문 링크를 비교한다.

<a id="s096"></a>

## S096 — 과거 다이제스트 선택

- 최신 실행: [Parity 6](../FE_MEDIUM_PARITY_06_RESULT.md). 임시 June8 라디오·Done·취소와 화면 이탈 시 초안 폐기를 확인했다. 시각 차이·U/native 대기는 유지한다.

[원본 PNG](<../../medium/flows/Library/Filtering digest/screens/03_sc_8866044a55164824903265c3b8b97337.png>) · [원본 분석](<../../medium/flows/Library/Filtering digest/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s096>) · `sc_8866044a55164824903265c3b8b97337`

- 담당: V27 / 묶음 6. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Library → Digest → 날짜 선택 → June12/June8 → 닫기
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [LibraryScreen.tsx](<../../FE/src/features/bookmarks/LibraryScreen.tsx>), [IdentityLink.tsx](<../../FE/src/features/community/IdentityLink.tsx>), [DigestPanel.tsx](<../../FE/src/features/digest/DigestPanel.tsx>), [NotificationSettingsScreen.tsx](<../../FE/src/features/notifications/NotificationSettingsScreen.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>), [ResponseButton.tsx](<../../FE/src/features/responses/ResponseButton.tsx>)
- 계정·권한: A; 읽기용 모의 issue; 실제 발송 없음
- fixture 구성: digestFixtures/replaceIssues; June12 love/jeremiah, June8 Goodbye Notion/xeladu·Alex; 다른 호는 자체 mock, 사진·응답 snapshot 차이 잔여
- 원본 관찰 표시값: 표시값·입력: June 8 2025 체크
- 원본 관찰 상태: 상태: 다른 날짜 임시 선택
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 같은 날짜 목록
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F43-03 / U-S096, U-F43 / C37, C38. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: June12→June8의 임시 radio/Done·확정 날짜·바뀐 기사, last10 안내와 제목/카드 반응/저장을 비교한다. 날짜10일과 발행10개를 구분한다.

<a id="s097"></a>

## S097 — 구절 인용 응답 작성 시작

[원본 PNG](<../../medium/flows/Home/Story detail/Responding to a phrase/screens/02_sc_8accfd977771416a89329576c7ba48d8.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Responding to a phrase/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s097>) · `sc_8accfd977771416a89329576c7ba48d8`

- 담당: V20 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>)
- 계정·권한: A를 작성자 YOU에 대응; 본인/타인 응답 분리
- fixture 구성: ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태
- 원본 관찰 표시값: 표시값·입력: 인용 문구 자동 포함, 본문 빈값
- 원본 관찰 상태: 상태: 인용 포함 응답 초안
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 응답 시트 하단 인용 카드·입력창·키보드
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 보임 관찰; web은 OS 키보드 비동등
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F29-02 / U-S097, U-F29 / C14, C15, C16, C17, C18, C20. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

<a id="s098"></a>

## S098 — Medium 검색 결과

[원본 PNG](<../../medium/flows/Explore/Searching Medium/screens/03_sc_8dc9eeb5f9d244ca9fa6fb7a973de82f.png>) · [원본 분석](<../../medium/flows/Explore/Searching Medium/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s098>) · `sc_8dc9eeb5f9d244ca9fa6fb7a973de82f`

- 담당: V02 / 묶음 17. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Explore → 검색 진입·Mindfulness 입력·Stories; Staff Picks/Who to follow 위치까지 세로·가로 이동
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [CatalogSearchResults.tsx](<../../FE/src/features/search/CatalogSearchResults.tsx>), [ExploreSections.tsx](<../../FE/src/features/search/ExploreSections.tsx>), [SearchScreen.tsx](<../../FE/src/features/search/SearchScreen.tsx>)
- 계정·권한: 공개 열람; 관계 조작은 A
- fixture 구성: mediumFeedFixtures / SearchScreen·CatalogSearchResults; 칩·캐러셀 위치는 화면별 설정
- 원본 관찰 표시값: 표시값·입력: Mindfulness 검색, Stories 활성
- 원본 관찰 상태: 상태: 기사 검색 결과
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 검색창·유형 탭·기사 카드
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F02-03 / U-S098, U-F02 / C06, C07. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 검색 빈 화면의 토픽 행, Stories 결과, 다섯 탭과 X를 분리한다. Trending 순위, Staff Picks 가로 카드, Recommended 세로 카드, Who to follow 가로 이동을 원본 상태별로 비교한다.

<a id="s099"></a>

## S099 — 추천 조정의 Suggestions

[원본 PNG](<../../medium/flows/Home/Refine recommendations/screens/02_sc_90bc6a79e86d436e89d94d7dc82b624c.png>) · [원본 분석](<../../medium/flows/Home/Refine recommendations/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s099>) · `sc_90bc6a79e86d436e89d94d7dc82b624c`

- 담당: V11 / 묶음 5. 상태: **recipe-only**. Parity 5에서 mock 연결/웹 부분 대조를 수행함; 원본 차이·미확인·native 대기. 사용자 지시로 캡처 파일을 저장하지 않았으며 원본 동일성이나 ready로 승격하지 않음
- 최신 검토: [Parity 5 결과](<../FE_MEDIUM_PARITY_05_RESULT.md>); 관계 카탈로그·관리 목록·동작 및 웹 부분 비교; 원본 시각 차이·U 미확인·native 대기
- 실제 FE 진입 절차(정적 확인): Home 더보기/Refine recommendations → Recommendations → Following/Reading history/Muted/Suggestions → All·Topics 등 필터
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [RefineRecommendationsScreen.tsx](<../../FE/src/features/recommendations/RefineRecommendationsScreen.tsx>)
- 계정·권한: A 개인 관계; 빈 상태와 Writers1/Topics3 독립
- fixture 구성: RelationshipSource·ModerationSource·TopicSource + useIdentityCatalog(DirectorySource/mockUsers/확정 공개 프로필); Writers1/Topics3는 UI 팔로우로 구성, 숫자와 목록·해제를 함께 확인
- 원본 관찰 표시값: 표시값·입력: Suggestions 활성, Topics 필터
- 원본 관찰 상태: 상태: 추천 토픽과 기사·팔로워 집계
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 상단 설명과 Following·Reading history·Muted·Suggestions 탭
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F12-02, T-F13-01 / U-S099, U-F12, U-F13 / C05, C12, C25, C26. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 네 탭, All/Writers/Publications/Topics, 빈 Following, 종류별 count/See all, Follow/Following, See more suggestions를 개별 확인한다.

<a id="s100"></a>

## S100 — 응답 시트와 중첩 답글

[원본 PNG](<../../medium/flows/Home/Story detail/Responses/screens/02_sc_915888473ac24e8987c996b8954f54c6.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Responses/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_04.md#s100>) · `sc_915888473ac24e8987c996b8954f54c6`

- 담당: V20 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.; 후속 Parity 3의 연결 검증/새 캡처는 FE_MEDIUM_PARITY_03_RESULT.md 참조. 과거 캡처와 별도이며 원본 동일성 통과 아님
- 실제 FE 진입 절차(정적 확인): Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>)
- 계정·권한: A를 작성자 YOU에 대응; 본인/타인 응답 분리
- fixture 구성: ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태
- 원본 관찰 표시값: 표시값·입력: 하단 빈 작성창
- 원본 관찰 상태: 상태: 복수 깊이 답글 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Responses 834 시트, Most Relevant 필터, 들여쓴 답글
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F30-02, T-F31-01, T-F34-01, T-F35-01, T-F36-01 / U-S100, U-F30, U-F31, U-F34, U-F35, U-F36 / C14, C15, C16, C17, C18, C20. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

<a id="s101"></a>

## S101 — 비공개 리스트 표시

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/List detail/Making a list private/screens/05_sc_91b39d224f6b4c9ab7573c0c3df633eb.png>) · [원본 분석](<../../medium/flows/Library/List detail/Making a list private/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s101>) · `sc_91b39d224f6b4c9ab7573c0c3df633eb`

- 담당: V25 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>)
- 계정·권한: A 소유; 기본 reading-list와 일반 About mindfulness 구분
- fixture 구성: UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; D13 source 확정 updatedAt(Parity7 자체 계약)
- 원본 관찰 표시값: 표시값·입력: 4 stories·자물쇠
- 원본 관찰 상태: 상태: 비공개 상태 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 리스트 메타데이터에 자물쇠
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F49-05 / U-S101, U-F49 / C28, C30, C31, C32, C33, C34, C35. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

<a id="s102"></a>

## S102 — 같은 작가의 추가 기사

[원본 PNG](<../../medium/flows/Home/Story detail/screens/07_sc_92624aea551d44a7bbcf71d7d78aff4c.png>) · [원본 분석](<../../medium/flows/Home/Story detail/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s102>) · `sc_92624aea551d44a7bbcf71d7d78aff4c`

- 담당: V13 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Home/Explore 기사 → Article(articleId); 본문·말미·응답 미리보기까지 스크롤; 박수 조작
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ArticleDetailScreen.tsx](<../../FE/src/features/article/ArticleDetailScreen.tsx>), [ReferenceArticleView.tsx](<../../FE/src/features/article/ReferenceArticleView.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>)
- 계정·권한: 공개 읽기와 회원 제한 상태 분리; 반응은 A
- fixture 구성: medium-brain 기본 기사; F16의834와 박수 흐름832는 독립 response fixture
- 원본 관찰 표시값: 표시값·입력: 기사별 날짜·박수·응답
- 원본 관찰 상태: 상태: 읽기 후 작가 콘텐츠 추천
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: More from Jordan Gibbs 아래 큰 이미지 카드
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F16-07 / U-S102, U-F16 / C09, C10, C11, C12. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 제목/부제/작가/읽기시간/표지 출처, 본문 강조·링크·삽입 이미지·토픽·작성자·응답 미리보기·관련 글·고정 반응 바를 각각 비교한다. +16은 입력 피드백이며 터치 횟수 증거가 아니다.

<a id="s103"></a>

## S103 — 팔로우 설정 메뉴

[원본 PNG](<../../medium/flows/Home/Story detail/Author detail/Following an author/screens/03_sc_937a1fdc91724d1ca5cc41b1d43d5132.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/Following an author/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s103>) · `sc_937a1fdc91724d1ca5cc41b1d43d5132`

- 담당: V14 / 묶음 5. 상태: **recipe-only**. Parity 5에서 mock 연결/웹 부분 대조를 수행함; 원본 차이·미확인·native 대기. 사용자 지시로 캡처 파일을 저장하지 않았으며 원본 동일성이나 ready로 승격하지 않음
- 최신 검토: [Parity 5 결과](<../FE_MEDIUM_PARITY_05_RESULT.md>); 관계 카탈로그·관리 목록·동작 및 웹 부분 비교; 원본 시각 차이·U 미확인·native 대기
- 실제 FE 진입 절차(정적 확인): Article 작성자 → Identity(writer Jordan) → Stories/Lists/About → Following·followers → Connections
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ConnectionsScreen.tsx](<../../FE/src/features/community/ConnectionsScreen.tsx>), [FollowControl.tsx](<../../FE/src/features/community/FollowControl.tsx>), [PublicIdentityScreen.tsx](<../../FE/src/features/community/PublicIdentityScreen.tsx>)
- 계정·권한: 공개 프로필; follow/email 관계는 A
- fixture 구성: useIdentityCatalog·RelationshipSource; Jordan10.2K/25, 기사말미24를 억지로 통일하지 않음; 동적 B 이름은 확정 프로필과 같은 ID로 해석
- 원본 관찰 표시값: 표시값·입력: Email notifications on 체크
- 원본 관찰 상태: 상태: 팔로우 해제 진입점
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 프로필 Following 팝오버
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F19-03, T-F20-01 / U-S103, U-F19, U-F20 / C21, C22. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About, Pinned, member/Friend 시작 월, Follow 성공·메뉴·해제 토스트, Email on/off, 작가와 publication 관계 목록을 각각 확인한다.

<a id="s104"></a>

## S104 — 팔로잉 빈 상태

[원본 PNG](<../../medium/flows/Home/Refine recommendations/screens/04_sc_944b2eea3834408b8c04981e5eb2adf8.png>) · [원본 분석](<../../medium/flows/Home/Refine recommendations/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s104>) · `sc_944b2eea3834408b8c04981e5eb2adf8`

- 담당: V11 / 묶음 5. 상태: **recipe-only**. Parity 5에서 mock 연결/웹 부분 대조를 수행함; 원본 차이·미확인·native 대기. 사용자 지시로 캡처 파일을 저장하지 않았으며 원본 동일성이나 ready로 승격하지 않음
- 최신 검토: [Parity 5 결과](<../FE_MEDIUM_PARITY_05_RESULT.md>); 관계 카탈로그·관리 목록·동작 및 웹 부분 비교; 원본 시각 차이·U 미확인·native 대기
- 실제 FE 진입 절차(정적 확인): Home 더보기/Refine recommendations → Recommendations → Following/Reading history/Muted/Suggestions → All·Topics 등 필터
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [RefineRecommendationsScreen.tsx](<../../FE/src/features/recommendations/RefineRecommendationsScreen.tsx>)
- 계정·권한: A 개인 관계; 빈 상태와 Writers1/Topics3 독립
- fixture 구성: RelationshipSource·ModerationSource·TopicSource + useIdentityCatalog(DirectorySource/mockUsers/확정 공개 프로필); Writers1/Topics3는 UI 팔로우로 구성, 숫자와 목록·해제를 함께 확인
- 원본 관찰 표시값: 표시값·입력: You don't follow anything yet
- 원본 관찰 상태: 상태: 팔로우 대상 없음
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Following 탭과 All 필터, 중앙 안내
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F12-04 / U-S104, U-F12 / C05, C12, C25, C26. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 네 탭, All/Writers/Publications/Topics, 빈 Following, 종류별 count/See all, Follow/Following, See more suggestions를 개별 확인한다.

<a id="s105"></a>

## S105 — 리스트 비공개 확인

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/List detail/Making a list private/screens/03_sc_95e504331794455fb4776bd322254c76.png>) · [원본 분석](<../../medium/flows/Library/List detail/Making a list private/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s105>) · `sc_95e504331794455fb4776bd322254c76`

- 담당: V25 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>)
- 계정·권한: A 소유; 기본 reading-list와 일반 About mindfulness 구분
- fixture 구성: UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; D13 source 확정 updatedAt(Parity7 자체 계약)
- 원본 관찰 표시값: 표시값·입력: 다른 사용자가 저장한 목록이 라이브러리에서 제거된다는 안내
- 원본 관찰 상태: 상태: 비공개 전 영향 안내
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 중앙 확인 대화상자
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F49-03 / U-S105, U-F49 / C28, C30, C31, C32, C33, C34, C35. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

<a id="s106"></a>

## S106 — 빈 리스트 상세

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/List detail/screens/02_sc_967232cfb5f845839053e0d371d78911.png>) · [원본 분석](<../../medium/flows/Library/List detail/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s106>) · `sc_967232cfb5f845839053e0d371d78911`

- 담당: V25 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>)
- 계정·권한: A 소유; 기본 reading-list와 일반 About mindfulness 구분
- fixture 구성: UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; D13 source 확정 updatedAt(Parity7 자체 계약)
- 원본 관찰 표시값: 표시값·입력: About mindfulness, 14 seconds ago
- 원본 관찰 상태: 상태: 콘텐츠 없는 리스트
- 시간: 목록 표시14초; 기준 필드 의미는 원본 미확인; mock은 마지막 내용 변경 성공 시각
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 소유자·제목·빈 상태·하단 리스트 반응
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F46-02 / U-S106, U-F46 / C28, C30, C31, C32, C33, C34, C35. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

<a id="s107"></a>

## S107 — 토픽 내 큐레이션

[원본 PNG](<../../medium/flows/Explore/Topic detail/Browse curated list/screens/03_sc_974be74d8855401e84cbad9f01dc8e93.png>) · [원본 분석](<../../medium/flows/Explore/Topic detail/Browse curated list/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s107>) · `sc_974be74d8855401e84cbad9f01dc8e93`

- 담당: V03 / 묶음 17. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Explore → Life 또는 Self Improvement → Topic(topicId); 큐레이션까지 스크롤
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [TopicScreen.tsx](<../../FE/src/features/topics/TopicScreen.tsx>)
- 계정·권한: 공개 열람; Following은 A의 topic 관계 필요
- fixture 구성: topicSource + relationshipSource; topicId와 following을 독립 설정
- 원본 관찰 표시값: 표시값·입력: List curated by Medium Staff
- 원본 관찰 상태: 상태: 편집 리스트 미리보기
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: The power of a morning routine 가로 기사 묶음
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F04-03 / U-S107, U-F04 / C06, C08. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Life와 Self Improvement는 별도 대상이다. Follow/Following·집계·관련 칩·헤더 축소와 See the full list의 대상 보존을 확인한다.

<a id="s108"></a>

## S108 — 다크 하이라이트 목록

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Profile/Settings/Switching to dark mode/screens/06_sc_97fb65c906bf4e309ec595d2067e4bce.png>) · [원본 분석](<../../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s108>) · `sc_97fb65c906bf4e309ec595d2067e4bce`

- 담당: V24 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Library → Your lists / Saved lists / Highlighted; 새 목록·삭제 후 복귀
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [LibraryScreen.tsx](<../../FE/src/features/bookmarks/LibraryScreen.tsx>), [HighlightList.tsx](<../../FE/src/features/highlights/HighlightList.tsx>)
- 계정·권한: A 개인 목록; 기본 reading-list는 항상 private
- fixture 구성: UserListStore·HighlightSource; empty/3/4 stories·About mindfulness를 각 상태별 구성
- 원본 관찰 표시값: 표시값·입력: Highlighted 활성
- 원본 관찰 상태: 상태: 하이라이트 대비 변경
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 어두운 녹색 강조·밝은 본문
- 테마: Dark 관찰; 앱/reader 각각 설정; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F62-06 / U-S108, U-F62 / C20, C29, C31, C37. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 가로5탭, 초기 배너/닫기·Digest New, New list, 빈/3개/4개 카드 썸네일/잠금/다운로드/메뉴, Highlighted 구절·작성자·원문 링크를 비교한다.

<a id="s109"></a>

## S109 — 비공개 변경 성공 안내

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/List detail/Making a list private/screens/04_sc_996c48382ff0466099cf371adf783dae.png>) · [원본 분석](<../../medium/flows/Library/List detail/Making a list private/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s109>) · `sc_996c48382ff0466099cf371adf783dae`

- 담당: V25 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>)
- 계정·권한: A 소유; 기본 reading-list와 일반 About mindfulness 구분
- fixture 구성: UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; D13 source 확정 updatedAt(Parity7 자체 계약)
- 원본 관찰 표시값: 표시값·입력: About mindfulness is now private
- 원본 관찰 상태: 상태: 비공개 전환 안내
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 리스트 상세 위 검정 토스트
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F49-04 / U-S109, U-F49 / C28, C30, C31, C32, C33, C34, C35. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

<a id="s110"></a>

## S110 — 앱 다크 테마 설정

[원본 PNG](<../../medium/flows/Profile/Settings/Switching to dark mode/screens/02_sc_9b1044709d764fe682a5e95603fd5c56.png>) · [원본 분석](<../../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s110>) · `sc_9b1044709d764fe682a5e95603fd5c56`

- 담당: V33 / 묶음 18. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Profile/Settings → Account/Appearance/App icon/각 상세 → 복귀
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [AppIconScreen.tsx](<../../FE/src/features/app-icon/AppIconScreen.tsx>), [SettingsExtrasScreen.tsx](<../../FE/src/features/settings/SettingsExtrasScreen.tsx>), [SettingsScreen.tsx](<../../FE/src/features/settings/SettingsScreen.tsx>)
- 계정·권한: A; friend icon 자격과 OS launcher 상태 별도
- fixture 구성: DisplaySettingsSource·AppIconAdapter; 자체 K 아이콘, S075 원본과 비동등
- 원본 관찰 표시값: 표시값·입력: Appearance Dark 선택
- 원본 관찰 상태: 상태: 앱 설정 다크 적용
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 설정 전체 검정 배경
- 테마: Dark 관찰; 앱/reader 각각 설정; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F62-02 / U-S110, U-F62 / C02, C66, C67, C68, C69. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 모든 행과 섹션·외부 화살표·Facebook 안내·버전·Appearance 선택, 2열 아이콘8종·Wordmark Black선택·Friend잠금·하단잘림을 비교한다. 자체 K 자산을 원본과 동일로 세지 않는다.

<a id="s111"></a>

## S111 — 응답 정렬 선택

[원본 PNG](<../../medium/flows/Home/Story detail/Responses/Sorting responses/screens/02_sc_9b94403d105c4eda8933ae7bbe2d6a00.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Sorting responses/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s111>) · `sc_9b94403d105c4eda8933ae7bbe2d6a00`

- 담당: V20 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>)
- 계정·권한: A를 작성자 YOU에 대응; 본인/타인 응답 분리
- fixture 구성: ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태
- 원본 관찰 표시값: 표시값·입력: Most Relevant 체크
- 원본 관찰 상태: 상태: 정렬 선택 중
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Most Relevant 드롭다운 팝오버
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F36-02 / U-S111, U-F36 / C14, C15, C16, C17, C18, C20. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

<a id="s112"></a>

## S112 — 응답 스크롤과 추가 답글

[원본 PNG](<../../medium/flows/Home/Story detail/Responses/screens/03_sc_9c9af2f5f8ad43c193c0c30ef0974156.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Responses/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s112>) · `sc_9c9af2f5f8ad43c193c0c30ef0974156`

- 담당: V20 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>)
- 계정·권한: A를 작성자 YOU에 대응; 본인/타인 응답 분리
- fixture 구성: ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태
- 원본 관찰 표시값: 표시값·입력: See more replies (4)
- 원본 관찰 상태: 상태: 접힌 본문·부분 로딩 답글
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: edited 표시·대명사·답글 1개·추가 답글 링크
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F30-03 / U-S112, U-F30 / C14, C15, C16, C17, C18, C20. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

<a id="s113"></a>

## S113 — 기기 사진 선택기

[원본 PNG](<../../medium/flows/Profile/Editing profile information/screens/04_sc_9fd133df622e4ddd859bbbeb845ba4da.png>) · [원본 분석](<../../medium/flows/Profile/Editing profile information/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s113>) · `sc_9fd133df622e4ddd859bbbeb845ba4da`

- 담당: V32 / 묶음 15, 21. 상태: **native-required**. OS Photos/앨범4장/권한 환경 필요; 웹 파일 선택기로 동일 재현 불가(Q07).
- 실제 FE 진입 절차(정적 확인): Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>)
- 계정·권한: A 소유; 표시 이름 Alex Smith와 userId는 별개
- fixture 구성: ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도
- 원본 관찰 표시값: 표시값·입력: 사진 4개, Location Is Included
- 원본 관찰 상태: 상태: OS 사진 선택 UI
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Mobbin 앨범의 3열 사진 그리드
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; native 필수/web 비동등; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F57-04 / U-S113, U-F57 / C51, C52, C53. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

<a id="s114"></a>

## S114 — 리스트 삭제 확인 시트

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/List detail/Deleting a list/screens/03_sc_a1562b1931fc4650a544861094934588.png>) · [원본 분석](<../../medium/flows/Library/List detail/Deleting a list/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s114>) · `sc_a1562b1931fc4650a544861094934588`

- 담당: V25 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>)
- 계정·권한: A 소유; 기본 reading-list와 일반 About mindfulness 구분
- fixture 구성: UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; D13 source 확정 updatedAt(Parity7 자체 계약)
- 원본 관찰 표시값: 표시값·입력: 내 라이브러리와 타인 저장에서 제거, 원문 기사는 삭제하지 않는다는 안내
- 원본 관찰 상태: 상태: 삭제 전 영향 확인
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 하단 Delete list 설명·빨간 버튼
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F47-03 / U-S114, U-F47 / C28, C30, C31, C32, C33, C34, C35. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

<a id="s115"></a>

## S115 — 3개 토픽 선택

[원본 PNG](<../../medium/flows/Home/Publishing a story/Adding topics/screens/05_sc_a4216c4ff1f64bb59bc982a8d0067b6e.png>) · [원본 분석](<../../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s115>) · `sc_a4216c4ff1f64bb59bc982a8d0067b6e`

- 담당: V06 / 묶음 9. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Home 작성 → Editor → Next/PublishPreview → Topics → 검색·선택·Save → preview
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [PublishTopics.tsx](<../../FE/src/features/editor/PublishTopics.tsx>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>)
- 계정·권한: A 소유 초안; Public/Unlisted 별도
- fixture 구성: DraftSource·PublishTopics; The Silence between Notes, Music/Culture/Art, 별도 Publication 없음
- 원본 관찰 표시값: 표시값·입력: 검색어 비움, 3개 선택
- 원본 관찰 상태: 상태: 최대 5개 중 3개
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 검색창 3/5와 Music·Culture·Art 칩
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F07-05 / U-S115, U-F07 / C44, C45. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 검색 X와 chip X, 0/5·3/5·최대5, 빈값 Save의 모양, 미리보기 Edit/Publication/Unlisted/Publish now와 스크롤 헤더를 각각 확인한다.

<a id="s116"></a>

## S116 — 선택 날짜 다이제스트

- 최신 실행: [Parity 6](../FE_MEDIUM_PARITY_06_RESULT.md). June8 Goodbye Notion/xeladu·2분·회원용 별·기사/작성자/반응/저장/설정/목록 연결을 확인했다. 사진·아바타 및 실제 응답 수 차이는 남는다. 시각 차이·U/native 대기는 유지한다.

[원본 PNG](<../../medium/flows/Library/Filtering digest/screens/04_sc_a42fffc3afb34954bc5e4afcc2e08e04.png>) · [원본 분석](<../../medium/flows/Library/Filtering digest/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s116>) · `sc_a42fffc3afb34954bc5e4afcc2e08e04`

- 담당: V27 / 묶음 6. 상태: **recipe-only**. June8 현 fixture와 원본 Goodbye Notion 불일치; issue/article source 대조·주입 필요.
- 실제 FE 진입 절차(정적 확인): Main/Library → Digest → 날짜 선택 → June12/June8 → 닫기
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [LibraryScreen.tsx](<../../FE/src/features/bookmarks/LibraryScreen.tsx>), [IdentityLink.tsx](<../../FE/src/features/community/IdentityLink.tsx>), [DigestPanel.tsx](<../../FE/src/features/digest/DigestPanel.tsx>), [NotificationSettingsScreen.tsx](<../../FE/src/features/notifications/NotificationSettingsScreen.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>), [ResponseButton.tsx](<../../FE/src/features/responses/ResponseButton.tsx>)
- 계정·권한: A; 읽기용 모의 issue; 실제 발송 없음
- fixture 구성: digestFixtures/replaceIssues; June12 love/jeremiah, June8 Goodbye Notion/xeladu·Alex; 다른 호는 자체 mock, 사진·응답 snapshot 차이 잔여
- 원본 관찰 표시값: 표시값·입력: June 8 2025, Goodbye Notion
- 원본 관찰 상태: 상태: 선택한 날짜 콘텐츠 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Digest 날짜·기사 교체
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F43-04 / U-S116, U-F43 / C37, C38. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: June12→June8의 임시 radio/Done·확정 날짜·바뀐 기사, last10 안내와 제목/카드 반응/저장을 비교한다. 날짜10일과 발행10개를 구분한다.

<a id="s117"></a>

## S117 — 이메일 가입 기본 폼

[원본 PNG](<../../medium/flows/Onboarding/screens/03_sc_a4438be77c814444b7f0c005ee44e8b6.png>) · [원본 분석](<../../medium/flows/Onboarding/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s117>) · `sc_a4438be77c814444b7f0c005ee44e8b6`

- 담당: V29 / 묶음 14. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile 또는 Library guest → AuthDialogs → 이메일 signup/login/code; Profile/Settings → Sign out
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [AuthDialogs.tsx](<../../FE/src/features/auth/AuthDialogs.tsx>), [EmailLogin.tsx](<../../FE/src/features/auth/EmailLogin.tsx>), [createEmailAttempt.ts](<../../FE/src/features/auth/createEmailAttempt.ts>)
- 계정·권한: guest→A 모의 인증; 기존 세션 로그아웃은 A 시작
- fixture 구성: mockUsers + emailAuthSource; 개인정보·원본 인증코드 복사 없이 합성 테스트값 사용
- 원본 관찰 표시값: 표시값·입력: Your full name과 Your email에 예시 placeholder가 보이며 비밀번호 필드는 없다.
- 원본 관찰 상태: 상태: 빈 이메일 가입 폼이다.
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 상단 뒤로 가기·로고·가입 제목, 중앙 이름/이메일 입력, 하단 약관 안내가 있다.
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F53-03 / U-S117, U-F53 / C46, C47, C48, C67. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 가입4/로그인5 제공자, 이메일/이름/약관/뒤로·6칸 코드와Validate·Resend·닫기, Sign out Cancel/Confirm→intro를 비교한다. 빈 폼의 녹색 버튼과 실제 입력 검증은 별개다.

<a id="s118"></a>

## S118 — 토픽 추가 초기 상태

[원본 PNG](<../../medium/flows/Home/Publishing a story/Adding topics/screens/02_sc_a51d0e5d058b47809e1c299e1c28ff0e.png>) · [원본 분석](<../../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s118>) · `sc_a51d0e5d058b47809e1c299e1c28ff0e`

- 담당: V06 / 묶음 9. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Home 작성 → Editor → Next/PublishPreview → Topics → 검색·선택·Save → preview
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [PublishTopics.tsx](<../../FE/src/features/editor/PublishTopics.tsx>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>)
- 계정·권한: A 소유 초안; Public/Unlisted 별도
- fixture 구성: DraftSource·PublishTopics; The Silence between Notes, Music/Culture/Art, 별도 Publication 없음
- 원본 관찰 표시값: 표시값·입력: 0/5, 최대 5개 안내
- 원본 관찰 상태: 상태: 미선택
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 설명·검색·Your topics 목록·하단 Save
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F07-02 / U-S118, U-F07 / C44, C45. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 검색 X와 chip X, 0/5·3/5·최대5, 빈값 Save의 모양, 미리보기 Edit/Publication/Unlisted/Publish now와 스크롤 헤더를 각각 확인한다.

<a id="s119"></a>

## S119 — 읽기 테마 선택

[원본 PNG](<../../medium/flows/Home/Story detail/Changing display/screens/05_sc_a5d80c9e0226452cbb67e018702c5f1b.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s119>) · `sc_a5d80c9e0226452cbb67e018702c5f1b`

- 담당: V16 / 묶음 4. 상태: **historical-web-capture-parity-01**. Parity 1 당시 관찰: 기사 테마 선택 메뉴 실제 열림; System/Light/Dark 선택지 확인; 원본과 같은 좌표·서체 미확정.; 현재 공통 보정과 잔여는 Parity 2 결과 참조; Parity 4 새 실행은 latestReview 참조; 과거 캡처를 현재 코드 증거로 승격하지 않음
- 실제 FE 진입 절차(정적 확인): Article 더보기 → Display settings → 100/120%, font, appearance, highlights
- Parity 1 당시 증거: [과거 웹 캡처](<EVIDENCE/PARITY_01/S119.png>). 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ArticleDisplayPopover.tsx](<../../FE/src/features/settings/ArticleDisplayPopover.tsx>), [useReaderTypography.ts](<../../FE/src/features/settings/useReaderTypography.ts>)
- 계정·권한: reader 설정 A; 앱 전역 theme와 별도
- fixture 구성: DisplaySettingsSource; S063 기본관찰값, S125=120%, S198=Dark120%, S001=others off
- 원본 관찰 표시값: 표시값·입력: System default 체크
- 원본 관찰 상태: 상태: 테마 선택 중
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Appearance 아래 팝오버
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F24-05 / U-S119, U-F24 / C02, C12, C13. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 100→120과 배경 제목 줄바꿈, Font family 행, Appearance 하위 선택, 타인 Highlight on/off와 어두운 팝오버를 비교한다. 본인 저장 강조 삭제와 분리한다.

<a id="s120"></a>

## S120 — 대명사 1개 선택

[원본 PNG](<../../medium/flows/Profile/Editing profile information/Adding pronouns/screens/04_sc_a6051a9dd4514d3694dde85cd95c6b6d.png>) · [원본 분석](<../../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s120>) · `sc_a6051a9dd4514d3694dde85cd95c6b6d`

- 담당: V32 / 묶음 15. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>)
- 계정·권한: A 소유; 표시 이름 Alex Smith와 userId는 별개
- fixture 구성: ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도
- 원본 관찰 표시값: 표시값·입력: 1/4
- 원본 관찰 상태: 상태: 첫 대명사 선택
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 입력란 he 칩과 X
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F56-04 / U-S120, U-F56 / C51, C52, C53. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

<a id="s121"></a>

## S121 — 리스트에서 기사 제거

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/List detail/Removing a story/screens/02_sc_a79a8c62cfd64776ae74f84e0d98b5c3.png>) · [원본 분석](<../../medium/flows/Library/List detail/Removing a story/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s121>) · `sc_a79a8c62cfd64776ae74f84e0d98b5c3`

- 담당: V25 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>)
- 계정·권한: A 소유; 기본 reading-list와 일반 About mindfulness 구분
- fixture 구성: UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; D13 source 확정 updatedAt(Parity7 자체 계약)
- 원본 관찰 표시값: 표시값·입력: This item has been removed from your list
- 원본 관찰 상태: 상태: 항목 제거와 되돌리기 제공
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 상단 알림·대상 기사 사라짐
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F50-02 / U-S121, U-F50 / C28, C30, C31, C32, C33, C34, C35. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

<a id="s122"></a>

## S122 — 본문 구절 선택

[원본 PNG](<../../medium/flows/Home/Story detail/Highlighting a phrase/screens/02_sc_a8112b7354bb44908f9359e95ba3c288.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Highlighting a phrase/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s122>) · `sc_a8112b7354bb44908f9359e95ba3c288`

- 담당: V17 / 묶음 11. 상태: **recipe-only**. native 별도 Select a passage 화면과 원본 본문 선택이 다름(D09).
- 실제 FE 진입 절차(정적 확인): Article 본문 구절 선택 → Highlight/Respond/Share → 강조 표시
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [NativePassagePicker.tsx](<../../FE/src/features/highlights/NativePassagePicker.tsx>), [PassageReader.tsx](<../../FE/src/features/highlights/PassageReader.tsx>)
- 계정·권한: A 개인 강조; 타인 강조 표시와 구분
- fixture 구성: HighlightSource + 본문 version/UTF16 범위; native는 별도 Select a passage로 D09 차이
- 원본 관찰 표시값: 표시값·입력: 여러 줄 텍스트 선택
- 원본 관찰 상태: 상태: 텍스트 선택 상태
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 녹색 선택 핸들·플로팅 행동 메뉴
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F25-02, T-F29-01 / U-S122, U-F25, U-F29 / C19, C20. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 원본 본문 위 시작/끝 핸들과 선택 영역·플로팅 Highlight/Respond/Share/더보기, 메뉴 종료 후 강조 잔존을 확인한다. 별도 선택 화면은 동일 조작 완료가 아니다.

<a id="s123"></a>

## S123 — 프로필 편집 폼

[원본 PNG](<../../medium/flows/Profile/Editing profile information/screens/02_sc_a829121c47a444cd8a8fd0d9889edaed.png>) · [원본 분석](<../../medium/flows/Profile/Editing profile information/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s123>) · `sc_a829121c47a444cd8a8fd0d9889edaed`

- 담당: V32 / 묶음 15. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>)
- 계정·권한: A 소유; 표시 이름 Alex Smith와 userId는 별개
- fixture 구성: ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도
- 원본 관찰 표시값: 표시값·입력: Alex Smith10/50, Pronouns0/4, Short bio0/160
- 원본 관찰 상태: 상태: 이름 필수 표시·소개 선택
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 사진·Name*·Pronouns·Short bio·About Page 안내
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F57-02 / U-S123, U-F57 / C51, C52, C53. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

<a id="s124"></a>

## S124 — 응답 삭제 성공 표시

[원본 PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Deleting a response/screens/03_sc_aa1b32e30ce5436b8ca8fcc4c7d74d1b.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Deleting a response/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s124>) · `sc_aa1b32e30ce5436b8ca8fcc4c7d74d1b`

- 담당: V20 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>)
- 계정·권한: A를 작성자 YOU에 대응; 본인/타인 응답 분리
- fixture 구성: ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태
- 원본 관찰 표시값: 표시값·입력: Successfully deleted response
- 원본 관찰 상태: 상태: 삭제 성공 안내
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 상단 검정 토스트·본인 응답 사라진 목록
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F32-03 / U-S124, U-F32 / C14, C15, C16, C17, C18, C20. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

<a id="s125"></a>

## S125 — 글자 크기 확대

[원본 PNG](<../../medium/flows/Home/Story detail/Changing display/screens/04_sc_ad140eae0b7e409aa2204c1f36bfa385.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_05.md#s125>) · `sc_ad140eae0b7e409aa2204c1f36bfa385`

- 담당: V16 / 묶음 4. 상태: **historical-web-capture-parity-01**. Parity 1 당시 관찰: 글자 크기 키우기 실제 조작으로120%, 배경 제목 줄바꿈 변경 확인; 원본 동일 배치·집계 미확정.; 현재 공통 보정과 잔여는 Parity 2 결과 참조; Parity 4 새 실행은 latestReview 참조; 과거 캡처를 현재 코드 증거로 승격하지 않음
- 실제 FE 진입 절차(정적 확인): Article 더보기 → Display settings → 100/120%, font, appearance, highlights
- Parity 1 당시 증거: [과거 웹 캡처](<EVIDENCE/PARITY_01/S125.png>). 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ArticleDisplayPopover.tsx](<../../FE/src/features/settings/ArticleDisplayPopover.tsx>), [useReaderTypography.ts](<../../FE/src/features/settings/useReaderTypography.ts>)
- 계정·권한: reader 설정 A; 앱 전역 theme와 별도
- fixture 구성: DisplaySettingsSource; S063 기본관찰값, S125=120%, S198=Dark120%, S001=others off
- 원본 관찰 표시값: 표시값·입력: 120%
- 원본 관찰 상태: 상태: 크기 변경이 화면에 반영
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 설정 유지·배경 제목 줄바꿈 증가
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F24-04 / U-S125, U-F24 / C02, C12, C13. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 100→120과 배경 제목 줄바꿈, Font family 행, Appearance 하위 선택, 타인 Highlight on/off와 어두운 팝오버를 비교한다. 본인 저장 강조 삭제와 분리한다.

<a id="s126"></a>

## S126 — 본문 이미지 로딩

[원본 PNG](<../../medium/flows/Home/Publishing a story/screens/06_sc_ae30c2a2ca504522b03f98f11d59c429.png>) · [원본 분석](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s126>) · `sc_ae30c2a2ca504522b03f98f11d59c429`

- 담당: V08 / 묶음 9. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Editor → 이미지 메뉴 → Camera/Library/Unsplash → 선택·삽입; 로딩은 지연 source로 제어
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ImagePickerSheet.tsx](<../../FE/src/features/editor/ImagePickerSheet.tsx>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>)
- 계정·권한: A 소유 초안; OS 권한은 native에서 별도
- fixture 구성: EditorImageSource; 로컬 예시 자산·삽입 지연·성공 snapshot; 실제 외부 검색 아님
- 원본 관찰 표시값: 표시값·입력: 사진 블록 선택
- 원본 관찰 상태: 상태: 이미지 삽입 처리 중
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 본문 아래 사진 위 어두운 덮개·스피너·녹색 선택 테두리
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F08-06 / U-S126, U-F08 / C41. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 사진 소스 시트, Unsplash 2열 가변 높이와 작가 표시, 준비 중 덮개·스피너·녹색 테두리·X, 삽입 후 키보드 상태를 각각 비교한다.

<a id="s127"></a>

## S127 — 신고 사유 선택 완료

[원본 PNG](<../../medium/flows/Home/Story detail/Author detail/Reporting an author/screens/04_sc_af0ecdded03643ca8cea85ec5341d906.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/Reporting an author/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s127>) · `sc_af0ecdded03643ca8cea85ec5341d906`

- 담당: V15 / 묶음 5. 상태: **recipe-only**. Parity 5에서 mock 연결/웹 부분 대조를 수행함; 원본 차이·미확인·native 대기. 사용자 지시로 캡처 파일을 저장하지 않았으며 원본 동일성이나 ready로 승격하지 않음
- 최신 검토: [Parity 5 결과](<../FE_MEDIUM_PARITY_05_RESULT.md>); 관계 카탈로그·관리 목록·동작 및 웹 부분 비교; 원본 시각 차이·U 미확인·native 대기
- 실제 FE 진입 절차(정적 확인): Identity 또는 Article 더보기 → Mute/Block/Report → 선택·확정·토스트
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ModerationDialogs.tsx](<../../FE/src/features/moderation/ModerationDialogs.tsx>), [articleModeration.ts](<../../FE/src/features/moderation/articleModeration.ts>)
- 계정·권한: A; follow/mute/block/report 각각 별도 상태
- fixture 구성: ModerationSource·RelationshipSource와 공통 사용자 카탈로그; S093은 별도 snapshot이며 차단 결과로 단정하지 않음; 신고/차단/음소거 별도 상태
- 원본 관찰 표시값: 표시값·입력: Spam 선택·차단 미체크
- 원본 관찰 상태: 상태: 신고 제출 준비
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Spam 라디오 선택, 하단 빨간 버튼
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F23-04 / U-S127, U-F23 / C12, C18, C23, C24, C61. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 메뉴 순서·파랑/빨강·Cancel, 성공 토스트, 신고 radio와 Also block checkbox, 사유 전후 Report 상태를 비교한다. 차단 후 원본 카드 잔존과 자체 접근 제한의 충돌을 기록한다.

<a id="s128"></a>

## S128 — 오디오 로딩

[원본 PNG](<../../medium/flows/Home/Story detail/Listening to a story/screens/02_sc_b43c7474098746baa684870217c28927.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s128>) · `sc_b43c7474098746baa684870217c28927`

- 담당: V18 / 묶음 12. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article Listen → 미니 플레이어 → 확장 → 재생·정지·seek·닫기
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListeningPlayer.tsx](<../../FE/src/features/listening/ListeningPlayer.tsx>)
- 계정·권한: A 모의 회원 자격; 실제 음성 없음
- fixture 구성: ListeningSource·mock 시계; 00:05/00:10/00:20/00:40 각 snapshot과 duration 독립
- 원본 관찰 표시값: 표시값·입력: 작가·기사 제목·커버
- 원본 관찰 상태: 상태: 오디오 준비 중
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 기사 상단과 하단 미니 플레이어에 스피너
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F26-02 / U-S128, U-F26 / C58, C59, C61, C66. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 준비 중 두 spinner, mini/expanded 동일 기사, 커버·배경·시간·진행선·10초/30초·희미한 이전/다음·닫기·Speechify 표시를 비교한다. 무음 timer는 실제 재생과 구분한다. Q12에서 미니/확장 플레이어의 모의 안내가 원본 배치에 미치는 영향을 판정한다.

<a id="s129"></a>

## S129 — 월간 멤버십 선택

[원본 PNG](<../../medium/flows/Onboarding/screens/12_sc_b4e85416681544c9b996826eefa22432.png>) · [원본 분석](<../../medium/flows/Onboarding/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s129>) · `sc_b4e85416681544c9b996826eefa22432`

- 담당: V31 / 묶음 19. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Profile/Settings Upgrade 또는 onboarding 구독 → MembershipSheet → monthly/yearly → 모의 선택·성공
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [MembershipSheet.tsx](<../../FE/src/features/membership/MembershipSheet.tsx>)
- 계정·권한: A free/member/friend 비교 snapshot; 실제 결제 없음
- fixture 구성: MembershipSource; SGD 보관 가격·독립 pending/success fixture; OS 구매 알림과 web Alert 차이
- 원본 관찰 표시값: 표시값·입력: Pay monthly 선택. 캡처 금액 $6.98 SGD/month
- 원본 관찰 상태: 상태: 월간 플랜 소개와 혜택 목록
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 닫기 가능한 시트, 결제 주기 탭과 Member 카드
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F53-12, T-F54-01 / U-S129, U-F53, U-F54 / C50, C65, C66, C67. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 월/년 선택, SGD 가격·Save up to $39·혜택·Friend 카드, loading 덮개, 성공 팝업 OK와Start reading을 비교한다. 실제 구매 완료로 표시하지 않는다. Q12에서 모의 결제 안내의 노출·배치 차이를 함께 판정한다.

<a id="s130"></a>

## S130 — 팔로우 해제 안내

[원본 PNG](<../../medium/flows/Home/Story detail/Author detail/Following an author/Unfollowing an author/screens/02_sc_b606d8b25cf248c28200cbfd24da865f.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/Following an author/Unfollowing an author/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s130>) · `sc_b606d8b25cf248c28200cbfd24da865f`

- 담당: V14 / 묶음 5. 상태: **recipe-only**. Parity 5에서 mock 연결/웹 부분 대조를 수행함; 원본 차이·미확인·native 대기. 사용자 지시로 캡처 파일을 저장하지 않았으며 원본 동일성이나 ready로 승격하지 않음
- 최신 검토: [Parity 5 결과](<../FE_MEDIUM_PARITY_05_RESULT.md>); 관계 카탈로그·관리 목록·동작 및 웹 부분 비교; 원본 시각 차이·U 미확인·native 대기
- 실제 FE 진입 절차(정적 확인): Article 작성자 → Identity(writer Jordan) → Stories/Lists/About → Following·followers → Connections
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ConnectionsScreen.tsx](<../../FE/src/features/community/ConnectionsScreen.tsx>), [FollowControl.tsx](<../../FE/src/features/community/FollowControl.tsx>), [PublicIdentityScreen.tsx](<../../FE/src/features/community/PublicIdentityScreen.tsx>)
- 계정·권한: 공개 프로필; follow/email 관계는 A
- fixture 구성: useIdentityCatalog·RelationshipSource; Jordan10.2K/25, 기사말미24를 억지로 통일하지 않음; 동적 B 이름은 확정 프로필과 같은 ID로 해석
- 원본 관찰 표시값: 표시값·입력: You unfollowed Jordan Gibbs
- 원본 관찰 상태: 상태: 해제 성공 안내
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 검정 토스트와 Follow 버튼
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F20-02 / U-S130, U-F20 / C21, C22. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About, Pinned, member/Friend 시작 월, Follow 성공·메뉴·해제 토스트, Email on/off, 작가와 publication 관계 목록을 각각 확인한다.

<a id="s131"></a>

## S131 — 재생 속도 2.5배 선택

[원본 PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/screens/03_sc_b6f46f91fdc549b790b4e9c1a434afae.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s131>) · `sc_b6f46f91fdc549b790b4e9c1a434afae`

- 담당: V19 / 묶음 12. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): 확장 플레이어 → Speed 또는 더보기 → Select a voice → 언어 스크롤·Hans → Done
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListeningSpeedPanel.tsx](<../../FE/src/features/listening/ListeningSpeedPanel.tsx>), [ListeningVoicePanel.tsx](<../../FE/src/features/listening/ListeningVoicePanel.tsx>)
- 계정·권한: A; 권한과 현재 선택을 별도 설정
- fixture 구성: ListeningOptionsSource; Emma/Hans, 1x200WPM·2.5x490WPM은 관찰값 fixture
- 원본 관찰 표시값: 표시값·입력: 2.5x, 490 WPM, 145% productivity boost
- 원본 관찰 상태: 상태: 변경값 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 슬라이더 손잡이 위로 이동
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F27-03 / U-S131, U-F27 / C59, C60, C61. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 세로 slider·1x/200 WPM·2.5x/490 WPM·145% 문구, voice 언어 section/국기/성별/나라/선택색, Emma→Hans와 Done, 더보기6행을 비교한다.

<a id="s132"></a>

## S132 — Digest 일자별 추천

- 최신 실행: [Parity 6](../FE_MEDIUM_PARITY_06_RESULT.md). June12 Kris Gage·3분·회원용 별·날짜/설정·기사 행동을 확인했다. 원본158K/1.3K와 현재 mock157K/0의 차이는 보존한다. 시각 차이·U/native 대기는 유지한다.

[원본 PNG](<../../medium/flows/Library/screens/04_sc_bafbf7b80b154e25aec15e120a13f72a.png>) · [원본 분석](<../../medium/flows/Library/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s132>) · `sc_bafbf7b80b154e25aec15e120a13f72a`

- 담당: V27 / 묶음 6. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Library → Digest → 날짜 선택 → June12/June8 → 닫기
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [LibraryScreen.tsx](<../../FE/src/features/bookmarks/LibraryScreen.tsx>), [IdentityLink.tsx](<../../FE/src/features/community/IdentityLink.tsx>), [DigestPanel.tsx](<../../FE/src/features/digest/DigestPanel.tsx>), [NotificationSettingsScreen.tsx](<../../FE/src/features/notifications/NotificationSettingsScreen.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>), [ResponseButton.tsx](<../../FE/src/features/responses/ResponseButton.tsx>)
- 계정·권한: A; 읽기용 모의 issue; 실제 발송 없음
- fixture 구성: digestFixtures/replaceIssues; June12 love/jeremiah, June8 Goodbye Notion/xeladu·Alex; 다른 호는 자체 mock, 사진·응답 snapshot 차이 잔여
- 원본 관찰 표시값: 표시값·입력: June 12 2025
- 원본 관찰 상태: 상태: 특정 날짜 다이제스트
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Digest 탭·날짜 선택·설정·Today's highlights
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F41-04, T-F43-01, T-F44-01 / U-S132, U-F41, U-F43, U-F44 / C37, C38. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: June12→June8의 임시 radio/Done·확정 날짜·바뀐 기사, last10 안내와 제목/카드 반응/저장을 비교한다. 날짜10일과 발행10개를 구분한다.

<a id="s133"></a>

## S133 — 구매 성공 안내 팝업

[원본 PNG](<../../medium/flows/Onboarding/Subscribing to Medium/screens/04_sc_bb00623f121d405abc840e589837c3fd.png>) · [원본 분석](<../../medium/flows/Onboarding/Subscribing to Medium/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s133>) · `sc_bb00623f121d405abc840e589837c3fd`

- 담당: V31 / 묶음 19. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Profile/Settings Upgrade 또는 onboarding 구독 → MembershipSheet → monthly/yearly → 모의 선택·성공
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [MembershipSheet.tsx](<../../FE/src/features/membership/MembershipSheet.tsx>)
- 계정·권한: A free/member/friend 비교 snapshot; 실제 결제 없음
- fixture 구성: MembershipSource; SGD 보관 가격·독립 pending/success fixture; OS 구매 알림과 web Alert 차이
- 원본 관찰 표시값: 표시값·입력: 입력 없음
- 원본 관찰 상태: 상태: 캡처에 구매 성공 메시지 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 플랜 시트 위 iOS 형식 중앙 알림
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F54-04 / U-S133, U-F54 / C50, C65, C66, C67. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 월/년 선택, SGD 가격·Save up to $39·혜택·Friend 카드, loading 덮개, 성공 팝업 OK와Start reading을 비교한다. 실제 구매 완료로 표시하지 않는다. Q12에서 모의 결제 안내의 노출·배치 차이를 함께 판정한다.

<a id="s134"></a>

## S134 — 로그인 인증 코드 입력

[원본 PNG](<../../medium/flows/Logging in/screens/06_sc_bc8c0aff71644874a42b97e6c7fd4ce2.png>) · [원본 분석](<../../medium/flows/Logging in/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s134>) · `sc_bc8c0aff71644874a42b97e6c7fd4ce2`

- 담당: V29 / 묶음 14. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile 또는 Library guest → AuthDialogs → 이메일 signup/login/code; Profile/Settings → Sign out
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [AuthDialogs.tsx](<../../FE/src/features/auth/AuthDialogs.tsx>), [EmailLogin.tsx](<../../FE/src/features/auth/EmailLogin.tsx>), [createEmailAttempt.ts](<../../FE/src/features/auth/createEmailAttempt.ts>)
- 계정·권한: guest→A 모의 인증; 기존 세션 로그아웃은 A 시작
- fixture 구성: mockUsers + emailAuthSource; 개인정보·원본 인증코드 복사 없이 합성 테스트값 사용
- 원본 관찰 표시값: 표시값·입력: 6자리 코드 채워짐. 인증값은 문서에 재기록하지 않음
- 원본 관찰 상태: 상태: 이메일 코드 검증 준비
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Check your inbox 시트·6칸 코드·하단 행동
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F52-06 / U-S134, U-F52 / C46, C47, C48, C67. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 가입4/로그인5 제공자, 이메일/이름/약관/뒤로·6칸 코드와Validate·Resend·닫기, Sign out Cancel/Confirm→intro를 비교한다. 빈 폼의 녹색 버튼과 실제 입력 검증은 별개다.

<a id="s135"></a>

## S135 — 큐레이션 리스트 하단

[원본 PNG](<../../medium/flows/Explore/Topic detail/Browse curated list/screens/05_sc_bd0cb76562a74fb69a3569e15daf02ee.png>) · [원본 분석](<../../medium/flows/Explore/Topic detail/Browse curated list/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s135>) · `sc_bd0cb76562a74fb69a3569e15daf02ee`

- 담당: V04 / 묶음 17. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Topic → 큐레이션 카드 → PublicList(listId); S135는 More from Medium Staff까지 스크롤
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ArticleBookmarkControl.tsx](<../../FE/src/features/bookmarks/ArticleBookmarkControl.tsx>), [PublicListScreen.tsx](<../../FE/src/features/public-lists/PublicListScreen.tsx>), [PublicListStoryCard.tsx](<../../FE/src/features/public-lists/PublicListStoryCard.tsx>), [SavePublicListControl.tsx](<../../FE/src/features/public-lists/SavePublicListControl.tsx>)
- 계정·권한: 공개 목록; 저장·반응은 A
- fixture 구성: publicListFixtures / PublicListSource; 8 stories·108 saves 원본 상태를 별도로 대조
- 원본 관찰 표시값: 표시값·입력: 리스트 제목 상단 고정
- 원본 관찰 상태: 상태: 목록 말미
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 후반 기사와 More from Medium Staff
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F04-05 / U-S135, U-F04 / C29, C30. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 목록 전체 Save와 개별 기사 저장, 목록 박수·응답·Share를 구분한다. 8 stories/108 saves와 98 claps/1 response는 비교 화면 데이터이며 현재 사용자 수를 위조하지 않는다.

<a id="s136"></a>

## S136 — 프로필 편집 결과

[원본 PNG](<../../medium/flows/Profile/Editing profile information/screens/07_sc_be99c4fdcf634190a324ec9820a84f43.png>) · [원본 분석](<../../medium/flows/Profile/Editing profile information/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s136>) · `sc_be99c4fdcf634190a324ec9820a84f43`

- 담당: V32 / 묶음 15. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>)
- 계정·권한: A 소유; 표시 이름 Alex Smith와 userId는 별개
- fixture 구성: ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도
- 원본 관찰 표시값: 표시값·입력: 이름·기사 유지
- 원본 관찰 상태: 상태: 사진·대명사 반영
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 프로필 사진·he/him 표시·Stories
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F57-07 / U-S136, U-F57 / C51, C52, C53. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

<a id="s137"></a>

## S137 — 이미지 삽입 후 편집기

[원본 PNG](<../../medium/flows/Home/Publishing a story/screens/07_sc_bed3857c8edc4a02b07af1e095ad7fba.png>) · [원본 분석](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s137>) · `sc_bed3857c8edc4a02b07af1e095ad7fba`

- 담당: V07 / 묶음 9. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Home 작성 → Editor; 제목·본문 입력 → 해당 서식·이미지 블록 선택
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [RichDocumentBody.tsx](<../../FE/src/features/editor/RichDocumentBody.tsx>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>), [editorModel.ts](<../../FE/src/features/editor/editorModel.ts>)
- 계정·권한: A 소유 초안; 같은 draftId 유지
- fixture 구성: DraftSource·EditorSession; 음악 제목/단락/인용/목록/구분선은 각 S의 문서 snapshot 별도
- 원본 관찰 표시값: 표시값·입력: 제목·본문·사진 표시
- 원본 관찰 상태: 상태: 이미지 로딩 표시 사라짐
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 제목·본문 아래 산과 호수 사진, 키보드 숨김
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 숨김 관찰
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F08-07, T-F09-01, T-F10-01, T-F11-01 / U-S137, U-F08, U-F09, U-F10, U-F11 / C40. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 제목과 본문, 회색 문자 스타일, 이탤릭 인용선, bullet, 점3개 구분선, 선택 중 도구 색과 키보드 위 툴바를 비교한다. 코드 도구의 실행 후 모습은 원본 미확인이다.

<a id="s138"></a>

## S138 — 대명사·소개 입력된 프로필

[원본 PNG](<../../medium/flows/Profile/Editing profile information/screens/06_sc_befb6fde38cc48f3827ea389caed11de.png>) · [원본 분석](<../../medium/flows/Profile/Editing profile information/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s138>) · `sc_befb6fde38cc48f3827ea389caed11de`

- 담당: V32 / 묶음 15. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>)
- 계정·권한: A 소유; 표시 이름 Alex Smith와 userId는 별개
- fixture 구성: ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도
- 원본 관찰 표시값: 표시값·입력: Pronouns2/4, Short bio49/160
- 원본 관찰 상태: 상태: 저장 전 정보 완성
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: he·him 칩·소개 입력
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F57-06 / U-S138, U-F57 / C51, C52, C53. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

<a id="s139"></a>

## S139 — 초안 목록

[원본 PNG](<../../medium/flows/Home/Publishing a story/Drafts/screens/03_sc_c020fbe7604a43569b5bf77da2725119.png>) · [원본 분석](<../../medium/flows/Home/Publishing a story/Drafts/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s139>) · `sc_c020fbe7604a43569b5bf77da2725119`

- 담당: V09 / 묶음 9. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Editor 더보기 또는 Profile Drafts → Drafts; 저장한 같은 draftId 재열기
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [DraftsScreen.tsx](<../../FE/src/features/editor/DraftsScreen.tsx>), [createDraftSession.ts](<../../FE/src/features/editor/createDraftSession.ts>)
- 계정·권한: A 개인 초안; 빈 목록과 1개 초안 구분
- fixture 구성: DraftSource; 제목 The Silence between Notes, editedAt=비교 시계-60초
- 원본 관찰 표시값: 표시값·입력: The Silence between Notes, Edited 1 minute ago
- 원본 관찰 상태: 상태: 초안 1건 표시
- 시간: editedAt=고정 now-60초; 초안1개
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Drafts 시트와 단일 제목 행
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F10-03 / U-S139, U-F10 / C42. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 더보기 네 메뉴의 순서·각 목적지, Drafts 제목/Edited 시각/Close/재개를 확인한다. 목록의 시각 표시는 서버 동기화 완료 표시가 아니다.

<a id="s140"></a>

## S140 — 응답 미리보기 끝

[원본 PNG](<../../medium/flows/Home/Story detail/screens/06_sc_c068a6d42c5c48fb9d60c8af4adb446f.png>) · [원본 분석](<../../medium/flows/Home/Story detail/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s140>) · `sc_c068a6d42c5c48fb9d60c8af4adb446f`

- 담당: V13 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Home/Explore 기사 → Article(articleId); 본문·말미·응답 미리보기까지 스크롤; 박수 조작
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ArticleDetailScreen.tsx](<../../FE/src/features/article/ArticleDetailScreen.tsx>), [ReferenceArticleView.tsx](<../../FE/src/features/article/ReferenceArticleView.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>)
- 계정·권한: 공개 읽기와 회원 제한 상태 분리; 반응은 A
- fixture 구성: medium-brain 기본 기사; F16의834와 박수 흐름832는 독립 response fixture
- 원본 관찰 표시값: 표시값·입력: Read more, See all responses
- 원본 관찰 상태: 상태: 부분 응답 목록의 끝
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 긴 응답 생략과 전체 응답 버튼
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F16-06 / U-S140, U-F16 / C09, C10, C11, C12. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 제목/부제/작가/읽기시간/표지 출처, 본문 강조·링크·삽입 이미지·토픽·작성자·응답 미리보기·관련 글·고정 반응 바를 각각 비교한다. +16은 입력 피드백이며 터치 횟수 증거가 아니다.

<a id="s141"></a>

## S141 — 2.5배 재생 표시

[원본 PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/screens/04_sc_c0fd5f5f29594fb997865177863b9482.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s141>) · `sc_c0fd5f5f29594fb997865177863b9482`

- 담당: V18 / 묶음 12. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article Listen → 미니 플레이어 → 확장 → 재생·정지·seek·닫기
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListeningPlayer.tsx](<../../FE/src/features/listening/ListeningPlayer.tsx>)
- 계정·권한: A 모의 회원 자격; 실제 음성 없음
- fixture 구성: ListeningSource·mock 시계; 00:05/00:10/00:20/00:40 각 snapshot과 duration 독립
- 원본 관찰 표시값: 표시값·입력: 2.5x, 00:10, -01:44
- 원본 관찰 상태: 상태: 배속 변경 반영
- 시간: 재생00:10/-01:44/2.5x; 독립 duration/position
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 플레이어 하단 속도 변경
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F27-04 / U-S141, U-F27 / C58, C59, C61, C66. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 준비 중 두 spinner, mini/expanded 동일 기사, 커버·배경·시간·진행선·10초/30초·희미한 이전/다음·닫기·Speechify 표시를 비교한다. 무음 timer는 실제 재생과 구분한다. Q12에서 미니/확장 플레이어의 모의 안내가 원본 배치에 미치는 영향을 판정한다.

<a id="s142"></a>

## S142 — 응답 수정 반영

[원본 PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/screens/05_sc_c1a6af7cef31436a9cdd090eae87479f.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s142>) · `sc_c1a6af7cef31436a9cdd090eae87479f`

- 담당: V20 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>)
- 계정·권한: A를 작성자 YOU에 대응; 본인/타인 응답 분리
- fixture 구성: ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태
- 원본 관찰 표시값: 표시값·입력: Responses 833 유지
- 원본 관찰 상태: 상태: 내용 변경과 edited 확인
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: YOU 응답에 하트 3개·edited 표시
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F33-05 / U-S142, U-F33 / C14, C15, C16, C17, C18, C20. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

<a id="s143"></a>

## S143 — 작가 더보기 액션

[원본 PNG](<../../medium/flows/Home/Story detail/Author detail/Blocking an author/screens/02_sc_c25f22caf7cd49ba88c8611fb7480932.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/Blocking an author/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s143>) · `sc_c25f22caf7cd49ba88c8611fb7480932`

- 담당: V15 / 묶음 5. 상태: **recipe-only**. Parity 5에서 mock 연결/웹 부분 대조를 수행함; 원본 차이·미확인·native 대기. 사용자 지시로 캡처 파일을 저장하지 않았으며 원본 동일성이나 ready로 승격하지 않음
- 최신 검토: [Parity 5 결과](<../FE_MEDIUM_PARITY_05_RESULT.md>); 관계 카탈로그·관리 목록·동작 및 웹 부분 비교; 원본 시각 차이·U 미확인·native 대기
- 실제 FE 진입 절차(정적 확인): Identity 또는 Article 더보기 → Mute/Block/Report → 선택·확정·토스트
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ModerationDialogs.tsx](<../../FE/src/features/moderation/ModerationDialogs.tsx>), [articleModeration.ts](<../../FE/src/features/moderation/articleModeration.ts>)
- 계정·권한: A; follow/mute/block/report 각각 별도 상태
- fixture 구성: ModerationSource·RelationshipSource와 공통 사용자 카탈로그; S093은 별도 snapshot이며 차단 결과로 단정하지 않음; 신고/차단/음소거 별도 상태
- 원본 관찰 표시값: 표시값·입력: 추가 입력 없음
- 원본 관찰 상태: 상태: 작가 관리 메뉴
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 프로필 위 하단 시트
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F18-02, T-F22-02, T-F23-02 / U-S143, U-F18, U-F22, U-F23 / C12, C18, C23, C24, C61. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 메뉴 순서·파랑/빨강·Cancel, 성공 토스트, 신고 radio와 Also block checkbox, 사유 전후 Report 상태를 비교한다. 차단 후 원본 카드 잔존과 자체 접근 제한의 충돌을 기록한다.

<a id="s144"></a>

## S144 — 다크 내 프로필

[원본 PNG](<../../medium/flows/Profile/Settings/Switching to dark mode/screens/08_sc_c31a2100ddcd41cba45b5081c69b78b5.png>) · [원본 분석](<../../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s144>) · `sc_c31a2100ddcd41cba45b5081c69b78b5`

- 담당: V32 / 묶음 15. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>)
- 계정·권한: A 소유; 표시 이름 Alex Smith와 userId는 별개
- fixture 구성: ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도
- 원본 관찰 표시값: 표시값·입력: he/him·Public·기존 글
- 원본 관찰 상태: 상태: 프로필 테마 적용
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 프로필 탭·기사 카드·버튼 색상 변경
- 테마: Dark 관찰; 앱/reader 각각 설정; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F62-08 / U-S144, U-F62 / C51, C52, C53. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

<a id="s145"></a>

## S145 — 저장한 하이라이트 목록

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/screens/05_sc_c37aefd0916548dda3cb46d61cc25193.png>) · [원본 분석](<../../medium/flows/Library/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s145>) · `sc_c37aefd0916548dda3cb46d61cc25193`

- 담당: V24 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Library → Your lists / Saved lists / Highlighted; 새 목록·삭제 후 복귀
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [LibraryScreen.tsx](<../../FE/src/features/bookmarks/LibraryScreen.tsx>), [HighlightList.tsx](<../../FE/src/features/highlights/HighlightList.tsx>)
- 계정·권한: A 개인 목록; 기본 reading-list는 항상 private
- fixture 구성: UserListStore·HighlightSource; empty/3/4 stories·About mindfulness를 각 상태별 구성
- 원본 관찰 표시값: 표시값·입력: Alex Smith highlighted
- 원본 관찰 상태: 상태: 여러 글의 개인 하이라이트 모음
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Highlighted 탭·강조 구절·원문 제목·작성자
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F41-05 / U-S145, U-F41 / C20, C29, C31, C37. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 가로5탭, 초기 배너/닫기·Digest New, New list, 빈/3개/4개 카드 썸네일/잠금/다운로드/메뉴, Highlighted 구절·작성자·원문 링크를 비교한다.

<a id="s146"></a>

## S146 — 토픽 지정된 발행 미리보기

[원본 PNG](<../../medium/flows/Home/Publishing a story/Adding topics/screens/06_sc_c3bdb30e524c4709ae45998ec529a6c0.png>) · [원본 분석](<../../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s146>) · `sc_c3bdb30e524c4709ae45998ec529a6c0`

- 담당: V06 / 묶음 9. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Home 작성 → Editor → Next/PublishPreview → Topics → 검색·선택·Save → preview
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [PublishTopics.tsx](<../../FE/src/features/editor/PublishTopics.tsx>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>)
- 계정·권한: A 소유 초안; Public/Unlisted 별도
- fixture 구성: DraftSource·PublishTopics; The Silence between Notes, Music/Culture/Art, 별도 Publication 없음
- 원본 관찰 표시값: 표시값·입력: Music, Culture, Art 3개
- 원본 관찰 상태: 상태: 토픽 선택 반영
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 기사 카드 아래 토픽 칩
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F07-06, T-F08-09 / U-S146, U-F07, U-F08 / C44, C45. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 검색 X와 chip X, 0/5·3/5·최대5, 빈값 Save의 모양, 미리보기 Edit/Publication/Unlisted/Publish now와 스크롤 헤더를 각각 확인한다.

<a id="s147"></a>

## S147 — 기사 말미와 작성자 카드

[원본 PNG](<../../medium/flows/Home/Story detail/screens/04_sc_c3fcf42b84be4b7298dfc138c224e241.png>) · [원본 분석](<../../medium/flows/Home/Story detail/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s147>) · `sc_c3fcf42b84be4b7298dfc138c224e241`

- 담당: V13 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Home/Explore 기사 → Article(articleId); 본문·말미·응답 미리보기까지 스크롤; 박수 조작
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ArticleDetailScreen.tsx](<../../FE/src/features/article/ArticleDetailScreen.tsx>), [ReferenceArticleView.tsx](<../../FE/src/features/article/ReferenceArticleView.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>)
- 계정·권한: 공개 읽기와 회원 제한 상태 분리; 반응은 A
- fixture 구성: medium-brain 기본 기사; F16의834와 박수 흐름832는 독립 response fixture
- 원본 관찰 표시값: 표시값·입력: 10.2K followers·24 following
- 원본 관찰 상태: 상태: 기사 말미 도달
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 마지막 문단 아래 토픽 5개와 작성자 소개
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F16-04 / U-S147, U-F16 / C09, C10, C11, C12. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 제목/부제/작가/읽기시간/표지 출처, 본문 강조·링크·삽입 이미지·토픽·작성자·응답 미리보기·관련 글·고정 반응 바를 각각 비교한다. +16은 입력 피드백이며 터치 횟수 증거가 아니다.

<a id="s148"></a>

## S148 — 이미지 추가 방식 선택

[원본 PNG](<../../medium/flows/Home/Publishing a story/screens/04_sc_c609f8fa87b84b76bea6f312df2e3e0f.png>) · [원본 분석](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s148>) · `sc_c609f8fa87b84b76bea6f312df2e3e0f`

- 담당: V08 / 묶음 9. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Editor → 이미지 메뉴 → Camera/Library/Unsplash → 선택·삽입; 로딩은 지연 source로 제어
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ImagePickerSheet.tsx](<../../FE/src/features/editor/ImagePickerSheet.tsx>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>)
- 계정·권한: A 소유 초안; OS 권한은 native에서 별도
- fixture 구성: EditorImageSource; 로컬 예시 자산·삽입 지연·성공 snapshot; 실제 외부 검색 아님
- 원본 관찰 표시값: 표시값·입력: 추가 입력 없음
- 원본 관찰 상태: 상태: 이미지 소스 선택
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 편집기 위 하단 액션 시트
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F08-04 / U-S148, U-F08 / C41. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 사진 소스 시트, Unsplash 2열 가변 높이와 작가 표시, 준비 중 덮개·스피너·녹색 테두리·X, 삽입 후 키보드 상태를 각각 비교한다.

<a id="s149"></a>

## S149 — 설정 하단

[원본 PNG](<../../medium/flows/Profile/Settings/screens/03_sc_c653047933aa40b2be7a8f281643d41d.png>) · [원본 분석](<../../medium/flows/Profile/Settings/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s149>) · `sc_c653047933aa40b2be7a8f281643d41d`

- 담당: V33 / 묶음 18. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Profile/Settings → Account/Appearance/App icon/각 상세 → 복귀
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [AppIconScreen.tsx](<../../FE/src/features/app-icon/AppIconScreen.tsx>), [SettingsExtrasScreen.tsx](<../../FE/src/features/settings/SettingsExtrasScreen.tsx>), [SettingsScreen.tsx](<../../FE/src/features/settings/SettingsScreen.tsx>)
- 계정·권한: A; friend icon 자격과 OS launcher 상태 별도
- fixture 구성: DisplaySettingsSource·AppIconAdapter; 자체 K 아이콘, S075 원본과 비동등
- 원본 관찰 표시값: 표시값·입력: Facebook Connect, Version 4.263.185257
- 원본 관찰 상태: 상태: 설정과 앱 버전 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Social·About Medium·App Controls
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F58-03, T-F61-01 / U-S149, U-F58, U-F61 / C02, C66, C67, C68, C69. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 모든 행과 섹션·외부 화살표·Facebook 안내·버전·Appearance 선택, 2열 아이콘8종·Wordmark Black선택·Friend잠금·하단잘림을 비교한다. 자체 K 자산을 원본과 동일로 세지 않는다.

<a id="s150"></a>

## S150 — 글별 Lifetime 통계

[원본 PNG](<../../medium/flows/Profile/Story stats/screens/04_sc_c6580d2d071a4f079981013ccc658af4.png>) · [원본 분석](<../../medium/flows/Profile/Story stats/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_06.md#s150>) · `sc_c6580d2d071a4f079981013ccc658af4`

- 담당: V34 / 묶음 20. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Profile → View stats → StoryStats → Monthly/Lifetime·날짜·글 선택
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [StoryStatsScreen.tsx](<../../FE/src/features/story-stats/StoryStatsScreen.tsx>)
- 계정·권한: A 소유 발행 글; 이력 방문과 분석집계 별개
- fixture 구성: StoryStatsSource; June1–13 UTC11/2와 글 Lifetime0/0 독립 initial/asOf fixture
- 원본 관찰 표시값: 표시값·입력: Latest, The Silence between Notes, Views0·Reads0
- 원본 관찰 상태: 상태: 글별 누적 통계 표시
- 시간: 별도 글 Lifetime0/0·23hours ago; 월간11/2에서 계산하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 월간 그래프 아래 Lifetime·정렬·글 행
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F63-04 / U-S150, U-F63 / C54. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Monthly 기간UTC/Updated daily, 11/2·그래프 축/범례/색/면·날짜선·점, Lifetime Latest/글0/0을 독립 비교 fixture로 확인한다. 원본 집계 모순을 운영 계산식으로 만들지 않는다. Lifetime 자체의 시작일–Today·Updated daily와 글의23 hours ago도 별도로 비교한다. 현재 코드에 이 분기가 있다는 사실을 새 실행 통과로 표시하지 않는다.

<a id="s151"></a>

## S151 — 추천 토픽 팔로우 상태

[원본 PNG](<../../medium/flows/Home/Refine recommendations/Filtering suggestions/screens/04_sc_c7deda6b53824957b587bd922cd55399.png>) · [원본 분석](<../../medium/flows/Home/Refine recommendations/Filtering suggestions/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s151>) · `sc_c7deda6b53824957b587bd922cd55399`

- 담당: V11 / 묶음 5. 상태: **recipe-only**. Parity 5에서 mock 연결/웹 부분 대조를 수행함; 원본 차이·미확인·native 대기. 사용자 지시로 캡처 파일을 저장하지 않았으며 원본 동일성이나 ready로 승격하지 않음
- 최신 검토: [Parity 5 결과](<../FE_MEDIUM_PARITY_05_RESULT.md>); 관계 카탈로그·관리 목록·동작 및 웹 부분 비교; 원본 시각 차이·U 미확인·native 대기
- 실제 FE 진입 절차(정적 확인): Home 더보기/Refine recommendations → Recommendations → Following/Reading history/Muted/Suggestions → All·Topics 등 필터
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [RefineRecommendationsScreen.tsx](<../../FE/src/features/recommendations/RefineRecommendationsScreen.tsx>)
- 계정·권한: A 개인 관계; 빈 상태와 Writers1/Topics3 독립
- fixture 구성: RelationshipSource·ModerationSource·TopicSource + useIdentityCatalog(DirectorySource/mockUsers/확정 공개 프로필); Writers1/Topics3는 UI 팔로우로 구성, 숫자와 목록·해제를 함께 확인
- 원본 관찰 표시값: 표시값·입력: Self Improvement·Writing·Relationships는 Following
- 원본 관찰 상태: 상태: 일부 팔로우 반영
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Topics to follow 목록과 추가 추천 링크
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F13-04 / U-S151, U-F13 / C05, C12, C25, C26. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 네 탭, All/Writers/Publications/Topics, 빈 Following, 종류별 count/See all, Follow/Following, See more suggestions를 개별 확인한다.

<a id="s152"></a>

## S152 — 작가 음소거 안내

[원본 PNG](<../../medium/flows/Home/Story detail/Author detail/Muting an author/screens/03_sc_c8b24e7669734e74922bee69b751350b.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/Muting an author/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s152>) · `sc_c8b24e7669734e74922bee69b751350b`

- 담당: V15 / 묶음 5. 상태: **recipe-only**. Parity 5에서 mock 연결/웹 부분 대조를 수행함; 원본 차이·미확인·native 대기. 사용자 지시로 캡처 파일을 저장하지 않았으며 원본 동일성이나 ready로 승격하지 않음
- 최신 검토: [Parity 5 결과](<../FE_MEDIUM_PARITY_05_RESULT.md>); 관계 카탈로그·관리 목록·동작 및 웹 부분 비교; 원본 시각 차이·U 미확인·native 대기
- 실제 FE 진입 절차(정적 확인): Identity 또는 Article 더보기 → Mute/Block/Report → 선택·확정·토스트
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ModerationDialogs.tsx](<../../FE/src/features/moderation/ModerationDialogs.tsx>), [articleModeration.ts](<../../FE/src/features/moderation/articleModeration.ts>)
- 계정·권한: A; follow/mute/block/report 각각 별도 상태
- fixture 구성: ModerationSource·RelationshipSource와 공통 사용자 카탈로그; S093은 별도 snapshot이며 차단 결과로 단정하지 않음; 신고/차단/음소거 별도 상태
- 원본 관찰 표시값: 표시값·입력: 기사 목록 계속 표시
- 원본 관찰 상태: 상태: 음소거 성공 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Author muted 토스트, Following 버튼 유지
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F22-03 / U-S152, U-F22 / C12, C18, C23, C24, C61. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 메뉴 순서·파랑/빨강·Cancel, 성공 토스트, 신고 radio와 Also block checkbox, 사유 전후 Report 상태를 비교한다. 차단 후 원본 카드 잔존과 자체 접근 제한의 충돌을 기록한다.

<a id="s153"></a>

## S153 — 통계 그래프 날짜 선택

[원본 PNG](<../../medium/flows/Profile/Story stats/screens/03_sc_c8fa56a2dd5b4e959c333ea3e6d334e2.png>) · [원본 분석](<../../medium/flows/Profile/Story stats/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s153>) · `sc_c8fa56a2dd5b4e959c333ea3e6d334e2`

- 담당: V34 / 묶음 20. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Profile → View stats → StoryStats → Monthly/Lifetime·날짜·글 선택
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [StoryStatsScreen.tsx](<../../FE/src/features/story-stats/StoryStatsScreen.tsx>)
- 계정·권한: A 소유 발행 글; 이력 방문과 분석집계 별개
- fixture 구성: StoryStatsSource; June1–13 UTC11/2와 글 Lifetime0/0 독립 initial/asOf fixture
- 원본 관찰 표시값: 표시값·입력: Jun 12 2025, Views11·Reads2
- 원본 관찰 상태: 상태: 특정 날짜 선택
- 시간: 선택 Jun12 2025 UTC; Views11/Reads2
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 그래프에 수직선·두 지점 강조
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F63-03 / U-S153, U-F63 / C54. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Monthly 기간UTC/Updated daily, 11/2·그래프 축/범례/색/면·날짜선·점, Lifetime Latest/글0/0을 독립 비교 fixture로 확인한다. 원본 집계 모순을 운영 계산식으로 만들지 않는다. Lifetime 자체의 시작일–Today·Updated daily와 글의23 hours ago도 별도로 비교한다. 현재 코드에 이 분기가 있다는 사실을 새 실행 통과로 표시하지 않는다.

<a id="s154"></a>

## S154 — 언어별 음성 목록 스크롤

[원본 PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/04_sc_ca2321d6dc9142e5a97e2734260c2b0f.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s154>) · `sc_ca2321d6dc9142e5a97e2734260c2b0f`

- 담당: V19 / 묶음 12. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): 확장 플레이어 → Speed 또는 더보기 → Select a voice → 언어 스크롤·Hans → Done
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListeningSpeedPanel.tsx](<../../FE/src/features/listening/ListeningSpeedPanel.tsx>), [ListeningVoicePanel.tsx](<../../FE/src/features/listening/ListeningVoicePanel.tsx>)
- 계정·권한: A; 권한과 현재 선택을 별도 설정
- fixture 구성: ListeningOptionsSource; Emma/Hans, 1x200WPM·2.5x490WPM은 관찰값 fixture
- 원본 관찰 표시값: 표시값·입력: 한국어 Seoyeon 등
- 원본 관찰 상태: 상태: 다국어 음성 선택지 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: GERMAN·ITALIAN·KOREAN·PORTUGUESE 섹션
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F28-04 / U-S154, U-F28 / C59, C60, C61. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 세로 slider·1x/200 WPM·2.5x/490 WPM·145% 문구, voice 언어 section/국기/성별/나라/선택색, Emma→Hans와 Done, 더보기6행을 비교한다.

<a id="s155"></a>

## S155 — 리스트 이름 입력

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/Creating a list/screens/03_sc_ca3b32e4373a40fc84405838671eab27.png>) · [원본 분석](<../../medium/flows/Library/Creating a list/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s155>) · `sc_ca3b32e4373a40fc84405838671eab27`

- 담당: V25 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>)
- 계정·권한: A 소유; 기본 reading-list와 일반 About mindfulness 구분
- fixture 구성: UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; D13 source 확정 updatedAt(Parity7 자체 계약)
- 원본 관찰 표시값: 표시값·입력: About mindfulness 17/60, 설명 없음, Private 꺼짐
- 원본 관찰 상태: 상태: 이름만 입력해 생성 가능 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 동일 생성 폼
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F42-03 / U-S155, U-F42 / C28, C30, C31, C32, C33, C34, C35. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

<a id="s156"></a>

## S156 — 프로필 사진 소스 선택

[원본 PNG](<../../medium/flows/Profile/Editing profile information/screens/03_sc_cba29e82e4364a239d3e5423213fa670.png>) · [원본 분석](<../../medium/flows/Profile/Editing profile information/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s156>) · `sc_cba29e82e4364a239d3e5423213fa670`

- 담당: V32 / 묶음 15. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>)
- 계정·권한: A 소유; 표시 이름 Alex Smith와 userId는 별개
- fixture 구성: ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도
- 원본 관찰 표시값: 표시값·입력: 기존 폼 유지
- 원본 관찰 상태: 상태: 사진 추가 방식 선택
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 편집 폼 위 하단 액션 시트
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F57-03 / U-S156, U-F57 / C51, C52, C53. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

<a id="s157"></a>

## S157 — 항목 순서 변경

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/List detail/Reordering items/screens/04_sc_cdf564e8e6a144389299ff49a7d626ce.png>) · [원본 분석](<../../medium/flows/Library/List detail/Reordering items/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s157>) · `sc_cdf564e8e6a144389299ff49a7d626ce`

- 담당: V25 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>)
- 계정·권한: A 소유; 기본 reading-list와 일반 About mindfulness 구분
- fixture 구성: UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; D13 source 확정 updatedAt(Parity7 자체 계약)
- 원본 관찰 표시값: 표시값·입력: How Useful… → Mind Fullness or Emptiness? → Mind-Fullness → The Chimichurri…
- 원본 관찰 상태: 상태: 저장 전 새 순서
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 4행의 위치 변경
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F51-04 / U-S157, U-F51 / C28, C30, C31, C32, C33, C34, C35. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

<a id="s158"></a>

## S158 — 기사 응답 입력

[원본 PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/screens/02_sc_cebfd0ad696f4e20a1c7d99da1dc1cef.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Commenting a story/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s158>) · `sc_cebfd0ad696f4e20a1c7d99da1dc1cef`

- 담당: V20 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>)
- 계정·권한: A를 작성자 YOU에 대응; 본인/타인 응답 분리
- fixture 구성: ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태
- 원본 관찰 표시값: 표시값·입력: Loved this kind of story 입력, Responses 832
- 원본 관찰 상태: 상태: 응답 제출 전
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 시트 하단 작성창과 키보드
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 보임 관찰; web은 OS 키보드 비동등
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F31-02 / U-S158, U-F31 / C14, C15, C16, C17, C18, C20. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

<a id="s159"></a>

## S159 — 멤버 가입 완료 화면

[원본 PNG](<../../medium/flows/Onboarding/Subscribing to Medium/screens/05_sc_cf306e89e43144029ce108cb5338132a.png>) · [원본 분석](<../../medium/flows/Onboarding/Subscribing to Medium/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s159>) · `sc_cf306e89e43144029ce108cb5338132a`

- 담당: V31 / 묶음 19. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Profile/Settings Upgrade 또는 onboarding 구독 → MembershipSheet → monthly/yearly → 모의 선택·성공
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [MembershipSheet.tsx](<../../FE/src/features/membership/MembershipSheet.tsx>)
- 계정·권한: A free/member/friend 비교 snapshot; 실제 결제 없음
- fixture 구성: MembershipSource; SGD 보관 가격·독립 pending/success fixture; OS 구매 알림과 web Alert 차이
- 원본 관찰 표시값: 표시값·입력: 입력 없음
- 원본 관찰 상태: 상태: 멤버십 완료 안내
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 흰 배경 중앙 감사 문구와 단일 버튼
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F54-05 / U-S159, U-F54 / C50, C65, C66, C67. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 월/년 선택, SGD 가격·Save up to $39·혜택·Friend 카드, loading 덮개, 성공 팝업 OK와Start reading을 비교한다. 실제 구매 완료로 표시하지 않는다. Q12에서 모의 결제 안내의 노출·배치 차이를 함께 판정한다.

<a id="s160"></a>

## S160 — 재생 진행 상태

[원본 PNG](<../../medium/flows/Home/Story detail/Listening to a story/screens/05_sc_d035c7d2bcfe4d0f99df80fddecebdcd.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s160>) · `sc_d035c7d2bcfe4d0f99df80fddecebdcd`

- 담당: V18 / 묶음 12. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article Listen → 미니 플레이어 → 확장 → 재생·정지·seek·닫기
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListeningPlayer.tsx](<../../FE/src/features/listening/ListeningPlayer.tsx>)
- 계정·권한: A 모의 회원 자격; 실제 음성 없음
- fixture 구성: ListeningSource·mock 시계; 00:05/00:10/00:20/00:40 각 snapshot과 duration 독립
- 원본 관찰 표시값: 표시값·입력: 00:40, -04:00, 1x
- 원본 관찰 상태: 상태: 재생 위치 증가
- 시간: 재생00:40/-04:00/1x; mock 진행 고정
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 확장 플레이어 진행 바 이동
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F26-05 / U-S160, U-F26 / C58, C59, C61, C66. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 준비 중 두 spinner, mini/expanded 동일 기사, 커버·배경·시간·진행선·10초/30초·희미한 이전/다음·닫기·Speechify 표시를 비교한다. 무음 timer는 실제 재생과 구분한다. Q12에서 미니/확장 플레이어의 모의 안내가 원본 배치에 미치는 영향을 판정한다.

<a id="s161"></a>

## S161 — 사용자 신고 사유 선택

[원본 PNG](<../../medium/flows/Home/Story detail/Author detail/Reporting an author/screens/03_sc_d07b03740ecc44328719d4d21703bb06.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/Reporting an author/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s161>) · `sc_d07b03740ecc44328719d4d21703bb06`

- 담당: V15 / 묶음 5. 상태: **recipe-only**. Parity 5에서 mock 연결/웹 부분 대조를 수행함; 원본 차이·미확인·native 대기. 사용자 지시로 캡처 파일을 저장하지 않았으며 원본 동일성이나 ready로 승격하지 않음
- 최신 검토: [Parity 5 결과](<../FE_MEDIUM_PARITY_05_RESULT.md>); 관계 카탈로그·관리 목록·동작 및 웹 부분 비교; 원본 시각 차이·U 미확인·native 대기
- 실제 FE 진입 절차(정적 확인): Identity 또는 Article 더보기 → Mute/Block/Report → 선택·확정·토스트
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ModerationDialogs.tsx](<../../FE/src/features/moderation/ModerationDialogs.tsx>), [articleModeration.ts](<../../FE/src/features/moderation/articleModeration.ts>)
- 계정·권한: A; follow/mute/block/report 각각 별도 상태
- fixture 구성: ModerationSource·RelationshipSource와 공통 사용자 카탈로그; S093은 별도 snapshot이며 차단 결과로 단정하지 않음; 신고/차단/음소거 별도 상태
- 원본 관찰 표시값: 표시값·입력: Spam·Harassment·Rules violation·AI-generated 모두 미선택, 차단 미체크
- 원본 관찰 상태: 상태: 신고 입력 전
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Report user 시트, 라디오 사유·추가 차단 체크·정책 링크
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F23-03 / U-S161, U-F23 / C12, C18, C23, C24, C61. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 메뉴 순서·파랑/빨강·Cancel, 성공 토스트, 신고 radio와 Also block checkbox, 사유 전후 Report 상태를 비교한다. 차단 후 원본 카드 잔존과 자체 접근 제한의 충돌을 기록한다.

<a id="s162"></a>

## S162 — 다이제스트 설정

[원본 PNG](<../../medium/flows/Library/Filtering digest/Digest settings/screens/02_sc_d17bad2e556e4b0abfdc9541f90c46f2.png>) · [원본 분석](<../../medium/flows/Library/Filtering digest/Digest settings/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s162>) · `sc_d17bad2e556e4b0abfdc9541f90c46f2`

- 담당: V28 / 묶음 16. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Digest 설정 또는 Profile/Settings → Email/Push → NotificationSettings(section)
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [NotificationSettingsScreen.tsx](<../../FE/src/features/notifications/NotificationSettingsScreen.tsx>)
- 계정·권한: A; 앱 설정과 OS권한을 별도 기록
- fixture 구성: NotificationSource·설정 source; Daily/PushOn/EmailOn와 개별 토글 상태
- 원본 관찰 표시값: 표시값·입력: Daily, Push On, Email On
- 원본 관찰 상태: 상태: 다이제스트 주기·알림 채널 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Frequency·Push·Email 세 행
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F44-02 / U-S162, U-F44 / C39, C50, C56, C57, C67. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Daily/Push On/Email On의 선택·chevron·외부 화살표를 구분한다. 여섯 토글과 다섯 Tailored 행, Top story/Editors만Off를 비교한다.

<a id="s163"></a>

## S163 — 공유 카드 시트

[원본 PNG](<../../medium/flows/Home/Story detail/Sharing a story/screens/02_sc_d1c962cd0a8240ee94769a612a81d64f.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Sharing a story/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s163>) · `sc_d1c962cd0a8240ee94769a612a81d64f`

- 담당: V23 / 묶음 13. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article/인용/Identity/PublicList 공유 → 카드 → Copy link/Save image/Share via
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ShareCard.tsx](<../../FE/src/features/sharing/ShareCard.tsx>), [ShareSheet.tsx](<../../FE/src/features/sharing/ShareSheet.tsx>)
- 계정·권한: A; 공개 권한/모의 회원 링크 자격 각각 검증
- fixture 구성: ShareAdapter; 공개 공유 target + 카드 style index; OS 저장·공유는 Q07
- 원본 관찰 표시값: 표시값·입력: 읽기 시간·제목·부제·작가·Medium 표시
- 원본 관찰 상태: 상태: 공유 미리보기
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 기사 정보로 만든 이미지 카드·테마 페이지 점·하단 행동
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F39-02 / U-S163, U-F39 / C23, C61, C62, C63, C64. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: blur 배경·카드 테두리·회전 주소·페이지 점·행동 가로 이동, Copy link·Friend Link·Share via·Save image와 각 성공 토스트를 비교한다.

<a id="s164"></a>

## S164 — 다크 기사 본문

[원본 PNG](<../../medium/flows/Home/Story detail/Changing display/screens/09_sc_d1d05d6500f349d89c5a3e5646ff238b.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s164>) · `sc_d1d05d6500f349d89c5a3e5646ff238b`

- 담당: V13 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Home/Explore 기사 → Article(articleId); 본문·말미·응답 미리보기까지 스크롤; 박수 조작
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ArticleDetailScreen.tsx](<../../FE/src/features/article/ArticleDetailScreen.tsx>), [ReferenceArticleView.tsx](<../../FE/src/features/article/ReferenceArticleView.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>)
- 계정·권한: 공개 읽기와 회원 제한 상태 분리; 반응은 A
- fixture 구성: medium-brain 기본 기사; F16의834와 박수 흐름832는 독립 response fixture
- 원본 관찰 표시값: 표시값·입력: 본문 이미지의 밝은 배경 유지
- 원본 관찰 상태: 상태: 스크롤 중 읽기 UI
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 검정 배경 세리프 본문·링크·삽입 이미지
- 테마: Dark 관찰; 앱/reader 각각 설정; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F24-09 / U-S164, U-F24 / C09, C10, C11, C12. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 제목/부제/작가/읽기시간/표지 출처, 본문 강조·링크·삽입 이미지·토픽·작성자·응답 미리보기·관련 글·고정 반응 바를 각각 비교한다. +16은 입력 피드백이며 터치 횟수 증거가 아니다.

<a id="s165"></a>

## S165 — 리스트 다운로드 진행

**Parity 8 최신 비교:** [이번 결과](../FE_MEDIUM_PARITY_08_RESULT.md). 원본 PNG와 393×852/DPR1 진행/완료, 320/393 Light/Dark의 별표/metadata를 메모리 화면으로 대조했다. S16530초/S08951초는 독립 display clock; 실제 원본 촬영시각/경과 추정 아님. mock 계정·서체/일부 간격·OS 차이와 U/native 잔여, 캡처 파일 없음. 아래 초기 준비 상태는 과거 이력이며 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/List detail/Downloading a list/screens/02_sc_d23a5b4ea6ff462f8a05ce2371e90734.png>) · [원본 분석](<../../medium/flows/Library/List detail/Downloading a list/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s165>) · `sc_d23a5b4ea6ff462f8a05ce2371e90734`

- 담당: V26 / 묶음 8. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Library → ReadingList → Download → 진행·완료·취소·본문 열기
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [DownloadControl.tsx](<../../FE/src/features/downloads/DownloadControl.tsx>)
- 계정·권한: A 모의 회원; 소유 목록 접근권 필요
- fixture 구성: DownloadSource; 4개 일반 글 및 발행 혼합; 진행률·취소 source 제어; 영속 파일 없음
- 원본 관찰 표시값: 표시값·입력: 4 stories 유지
- 원본 관찰 상태: 상태: 다운로드 진행으로 보이는 상태
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 상단 다운로드 아이콘이 정지 사각형으로 변경
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F48-02 / U-S165, U-F48 / C36, C66. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 목록 시작 아이콘→정지 사각형→목록/각 기사 채운 아이콘을 확인한다. 메모리 사본과 실제 비행기 모드/재시작 캐시를 구분한다.

<a id="s166"></a>

## S166 — 가입 공급자 선택

[원본 PNG](<../../medium/flows/Logging in/screens/01_sc_d55739aa2ac1495da026006235e7c0a7.png>) · [원본 분석](<../../medium/flows/Logging in/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s166>) · `sc_d55739aa2ac1495da026006235e7c0a7`

- 담당: V29 / 묶음 14. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile 또는 Library guest → AuthDialogs → 이메일 signup/login/code; Profile/Settings → Sign out
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [AuthDialogs.tsx](<../../FE/src/features/auth/AuthDialogs.tsx>), [EmailLogin.tsx](<../../FE/src/features/auth/EmailLogin.tsx>), [createEmailAttempt.ts](<../../FE/src/features/auth/createEmailAttempt.ts>)
- 계정·권한: guest→A 모의 인증; 기존 세션 로그아웃은 A 시작
- fixture 구성: mockUsers + emailAuthSource; 개인정보·원본 인증코드 복사 없이 합성 테스트값 사용
- 원본 관찰 표시값: 표시값·입력: 직접 입력 필드는 없다.
- 원본 관찰 상태: 상태: 신규 가입과 기존 사용자 로그인을 구분하는 진입 화면이다.
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 중앙 서비스 소개 아래 네 개의 둥근 테두리 버튼을 세로 배치하고 하단에 로그인 링크를 둔다.
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F52-01, T-F53-02, T-F61-03 / U-S166, U-F52, U-F53, U-F61 / C46, C47, C48, C67. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 가입4/로그인5 제공자, 이메일/이름/약관/뒤로·6칸 코드와Validate·Resend·닫기, Sign out Cancel/Confirm→intro를 비교한다. 빈 폼의 녹색 버튼과 실제 입력 검증은 별개다.

<a id="s167"></a>

## S167 — 내 소개 빈 상태

[원본 PNG](<../../medium/flows/Profile/screens/05_sc_d55f02281f894078a734269d60de79c4.png>) · [원본 분석](<../../medium/flows/Profile/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s167>) · `sc_d55f02281f894078a734269d60de79c4`

- 담당: V32 / 묶음 15. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>)
- 계정·권한: A 소유; 표시 이름 Alex Smith와 userId는 별개
- fixture 구성: ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도
- 원본 관찰 표시값: 표시값·입력: Medium member since June 2025
- 원본 관찰 상태: 상태: 소개 미작성
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: About 탭에 빈 안내·회원 기간
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F55-05 / U-S167, U-F55 / C51, C52, C53. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

<a id="s168"></a>

## S168 — 기사 더보기 메뉴

[원본 PNG](<../../medium/flows/Home/Story detail/Changing display/screens/02_sc_d62e32234117483b85b4c73ed63249cd.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s168>) · `sc_d62e32234117483b85b4c73ed63249cd`

- 담당: V16 / 묶음 4. 상태: **historical-web-capture-parity-01**. Parity 5에서 mock 연결/웹 부분 대조를 수행함; 원본 차이·미확인·native 대기. 사용자 지시로 캡처 파일을 저장하지 않았으며 원본 동일성이나 ready로 승격하지 않음
- 최신 검토: [Parity 5 결과](<../FE_MEDIUM_PARITY_05_RESULT.md>); 관계 카탈로그·관리 목록·동작 및 웹 부분 비교; 원본 시각 차이·U 미확인·native 대기
- 실제 FE 진입 절차(정적 확인): Article 더보기 → Display settings → 100/120%, font, appearance, highlights
- Parity 1 당시 증거: [과거 웹 캡처](<EVIDENCE/PARITY_01/S168.png>). 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ArticleDisplayPopover.tsx](<../../FE/src/features/settings/ArticleDisplayPopover.tsx>), [useReaderTypography.ts](<../../FE/src/features/settings/useReaderTypography.ts>)
- 계정·권한: reader 설정 A; 앱 전역 theme와 별도
- fixture 구성: DisplaySettingsSource; S063 기본관찰값, S125=120%, S198=Dark120%, S001=others off
- 원본 관찰 표시값: 표시값·입력: 추가 입력 없음
- 원본 관찰 상태: 상태: 읽기·추천·작가·신고 행동
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 상단 팝오버 5행
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F24-02 / U-S168, U-F24 / C02, C12, C13. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 100→120과 배경 제목 줄바꿈, Font family 행, Appearance 하위 선택, 타인 Highlight on/off와 어두운 팝오버를 비교한다. 본인 저장 강조 삭제와 분리한다.

<a id="s169"></a>

## S169 — 발행 글과 반응 있는 프로필

[원본 PNG](<../../medium/flows/Profile/screens/03_sc_d76d3680605f4b62ab31e3039d6c4fe6.png>) · [원본 분석](<../../medium/flows/Profile/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s169>) · `sc_d76d3680605f4b62ab31e3039d6c4fe6`

- 담당: V32 / 묶음 15. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>)
- 계정·권한: A 소유; 표시 이름 Alex Smith와 userId는 별개
- fixture 구성: ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도
- 원본 관찰 표시값: 표시값·입력: 23h ago, 박수29·응답1
- 원본 관찰 상태: 상태: 발행 후 반응 집계
- 시간: publishedAt=고정 now-23시간; D12 상대 표시 미구현
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Stories Public에 기사 카드
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F55-03, T-F58-01 / U-S169, U-F55, U-F58 / C51, C52, C53. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

<a id="s170"></a>

## S170 — 사용자 신고 성공 안내

[원본 PNG](<../../medium/flows/Home/Story detail/Author detail/Reporting an author/screens/05_sc_d9ba56fa632249c7908f15a8e3082d97.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/Reporting an author/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s170>) · `sc_d9ba56fa632249c7908f15a8e3082d97`

- 담당: V15 / 묶음 5. 상태: **recipe-only**. Parity 5에서 mock 연결/웹 부분 대조를 수행함; 원본 차이·미확인·native 대기. 사용자 지시로 캡처 파일을 저장하지 않았으며 원본 동일성이나 ready로 승격하지 않음
- 최신 검토: [Parity 5 결과](<../FE_MEDIUM_PARITY_05_RESULT.md>); 관계 카탈로그·관리 목록·동작 및 웹 부분 비교; 원본 시각 차이·U 미확인·native 대기
- 실제 FE 진입 절차(정적 확인): Identity 또는 Article 더보기 → Mute/Block/Report → 선택·확정·토스트
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ModerationDialogs.tsx](<../../FE/src/features/moderation/ModerationDialogs.tsx>), [articleModeration.ts](<../../FE/src/features/moderation/articleModeration.ts>)
- 계정·권한: A; follow/mute/block/report 각각 별도 상태
- fixture 구성: ModerationSource·RelationshipSource와 공통 사용자 카탈로그; S093은 별도 snapshot이며 차단 결과로 단정하지 않음; 신고/차단/음소거 별도 상태
- 원본 관찰 표시값: 표시값·입력: Successfully reported user
- 원본 관찰 상태: 상태: 신고 접수 성공 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 프로필에 검정 토스트
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F23-05 / U-S170, U-F23 / C12, C18, C23, C24, C61. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 메뉴 순서·파랑/빨강·Cancel, 성공 토스트, 신고 radio와 Also block checkbox, 사유 전후 Report 상태를 비교한다. 차단 후 원본 카드 잔존과 자체 접근 제한의 충돌을 기록한다.

<a id="s171"></a>

## S171 — 이메일 로그인 빈 폼

[원본 PNG](<../../medium/flows/Logging in/screens/03_sc_da2ab413cfe5481d9abe4f23eeaeb426.png>) · [원본 분석](<../../medium/flows/Logging in/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s171>) · `sc_da2ab413cfe5481d9abe4f23eeaeb426`

- 담당: V29 / 묶음 14. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile 또는 Library guest → AuthDialogs → 이메일 signup/login/code; Profile/Settings → Sign out
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [AuthDialogs.tsx](<../../FE/src/features/auth/AuthDialogs.tsx>), [EmailLogin.tsx](<../../FE/src/features/auth/EmailLogin.tsx>), [createEmailAttempt.ts](<../../FE/src/features/auth/createEmailAttempt.ts>)
- 계정·권한: guest→A 모의 인증; 기존 세션 로그아웃은 A 시작
- fixture 구성: mockUsers + emailAuthSource; 개인정보·원본 인증코드 복사 없이 합성 테스트값 사용
- 원본 관찰 표시값: 표시값·입력: janedoe@gmail.com 예시 문자열
- 원본 관찰 상태: 상태: 이메일 입력 전
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 이메일 필드와 녹색 Continue
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F52-03 / U-S171, U-F52 / C46, C47, C48, C67. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 가입4/로그인5 제공자, 이메일/이름/약관/뒤로·6칸 코드와Validate·Resend·닫기, Sign out Cancel/Confirm→intro를 비교한다. 빈 폼의 녹색 버튼과 실제 입력 검증은 별개다.

<a id="s172"></a>

## S172 — 저장 아이콘 활성

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Home/Story detail/Saving a story/screens/03_sc_dda8e78e9eb943629d3cf54eaed5fc22.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Saving a story/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s172>) · `sc_dda8e78e9eb943629d3cf54eaed5fc22`

- 담당: V22 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article 하단 저장 → Save to → Reading list 선택 → Done/닫기
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ArticleBookmarkControl.tsx](<../../FE/src/features/bookmarks/ArticleBookmarkControl.tsx>), [SaveToListSheet.tsx](<../../FE/src/features/bookmarks/SaveToListSheet.tsx>)
- 계정·권한: A 개인 기본 목록; guest는 로그인 복귀 후 재행동
- fixture 구성: BookmarkSource·UserListStore; reading-list 체크와 canonical articleId
- 원본 관찰 표시값: 표시값·입력: 기사 내용·집계 유지
- 원본 관찰 상태: 상태: 저장 선택 반영
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 기사 상세 하단 북마크 채움
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F37-03 / U-S172, U-F37 / C28. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Save to, Reading list 체크/잠금, Create new list, Done, 복귀한 채운 북마크를 비교한다. 체크와 확정 시점을 자체 계약으로 명시한다.

<a id="s173"></a>

## S173 — 설정 상단

[원본 PNG](<../../medium/flows/Profile/Settings/screens/02_sc_ddd51660cb8346a1b200ed970a2d5c45.png>) · [원본 분석](<../../medium/flows/Profile/Settings/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s173>) · `sc_ddd51660cb8346a1b200ed970a2d5c45`

- 담당: V33 / 묶음 18. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Profile/Settings → Account/Appearance/App icon/각 상세 → 복귀
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [AppIconScreen.tsx](<../../FE/src/features/app-icon/AppIconScreen.tsx>), [SettingsExtrasScreen.tsx](<../../FE/src/features/settings/SettingsExtrasScreen.tsx>), [SettingsScreen.tsx](<../../FE/src/features/settings/SettingsScreen.tsx>)
- 계정·권한: A; friend icon 자격과 OS launcher 상태 별도
- fixture 구성: DisplaySettingsSource·AppIconAdapter; 자체 K 아이콘, S075 원본과 비동등
- 원본 관찰 표시값: 표시값·입력: Appearance System default 선택
- 원본 관찰 상태: 상태: 주요 설정 진입점
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Account·Configure Medium 섹션
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F58-02, T-F59-01, T-F60-01, T-F62-01 / U-S173, U-F58, U-F59, U-F60, U-F62 / C02, C66, C67, C68, C69. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 모든 행과 섹션·외부 화살표·Facebook 안내·버전·Appearance 선택, 2열 아이콘8종·Wordmark Black선택·Friend잠금·하단잘림을 비교한다. 자체 K 자산을 원본과 동일로 세지 않는다.

<a id="s174"></a>

## S174 — 팔로우 추천 가로 스크롤

[원본 PNG](<../../medium/flows/Explore/screens/06_sc_dfdd5f6377a848c59b3512417cb47490.png>) · [원본 분석](<../../medium/flows/Explore/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s174>) · `sc_dfdd5f6377a848c59b3512417cb47490`

- 담당: V02 / 묶음 17. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Explore → 검색 진입·Mindfulness 입력·Stories; Staff Picks/Who to follow 위치까지 세로·가로 이동
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [CatalogSearchResults.tsx](<../../FE/src/features/search/CatalogSearchResults.tsx>), [ExploreSections.tsx](<../../FE/src/features/search/ExploreSections.tsx>), [SearchScreen.tsx](<../../FE/src/features/search/SearchScreen.tsx>)
- 계정·권한: 공개 열람; 관계 조작은 A
- fixture 구성: mediumFeedFixtures / SearchScreen·CatalogSearchResults; 칩·캐러셀 위치는 화면별 설정
- 원본 관찰 표시값: 표시값·입력: The Daily Dollar·Alex Mathers
- 원본 관찰 상태: 상태: 캐러셀 이동
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 다른 추천 카드 노출
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F01-06 / U-S174, U-F01 / C06, C07. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 검색 빈 화면의 토픽 행, Stories 결과, 다섯 탭과 X를 분리한다. Trending 순위, Staff Picks 가로 카드, Recommended 세로 카드, Who to follow 가로 이동을 원본 상태별로 비교한다.

<a id="s175"></a>

## S175 — 본문 아래 응답 미리보기

[원본 PNG](<../../medium/flows/Home/Story detail/screens/05_sc_e1a92b59829c4678b3362d2dc6abae59.png>) · [원본 분석](<../../medium/flows/Home/Story detail/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_07.md#s175>) · `sc_e1a92b59829c4678b3362d2dc6abae59`

- 담당: V13 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Home/Explore 기사 → Article(articleId); 본문·말미·응답 미리보기까지 스크롤; 박수 조작
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ArticleDetailScreen.tsx](<../../FE/src/features/article/ArticleDetailScreen.tsx>), [ReferenceArticleView.tsx](<../../FE/src/features/article/ReferenceArticleView.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>)
- 계정·권한: 공개 읽기와 회원 제한 상태 분리; 반응은 A
- fixture 구성: medium-brain 기본 기사; F16의834와 박수 흐름832는 독립 response fixture
- 원본 관찰 표시값: 표시값·입력: Alex Smith, What are your thoughts?
- 원본 관찰 상태: 상태: 응답 일부 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Responses 834, 입력 유도, 응답 작성자·날짜·본문
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F16-05 / U-S175, U-F16 / C09, C10, C11, C12. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 제목/부제/작가/읽기시간/표지 출처, 본문 강조·링크·삽입 이미지·토픽·작성자·응답 미리보기·관련 글·고정 반응 바를 각각 비교한다. +16은 입력 피드백이며 터치 횟수 증거가 아니다.

<a id="s176"></a>

## S176 — Featured 빈 상태

[원본 PNG](<../../medium/flows/Home/screens/03_sc_e1cf4be8210f432098943d8a233d9d72.png>) · [원본 분석](<../../medium/flows/Home/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s176>) · `sc_e1cf4be8210f432098943d8a233d9d72`

- 담당: V01 / 묶음 17. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Home → For you·Featured 선택; S026은 헤더가 접힌 하단 카드, S176은 Featured 빈 상태
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [FollowingFeed.tsx](<../../FE/src/features/community/FollowingFeed.tsx>), [HomeFeedScreen.tsx](<../../FE/src/features/feed/HomeFeedScreen.tsx>)
- 계정·권한: 공개 열람; 원본 개인화 상태 비교는 A
- fixture 구성: mediumFeedFixtures / feedPreviewScenario(normal); Featured empty는 별도 feedSource 필요
- 원본 관찰 표시값: 표시값·입력: No featured stories
- 원본 관찰 상태: 상태: 팔로우 발행물의 추천 글이 없다는 안내
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Featured 선택 탭 아래 회색 안내 카드
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F05-03 / U-S176, U-F05 / C04, C05. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: For you의 원형 −와 Featured의 북마크를 구분한다. 헤더 접힘, 탭 가로 위치, New 배지, 알림 점, 빈 Featured CTA와 채워진 목록을 각각 비교한다.

<a id="s177"></a>

## S177 — 리스트 상세 스크롤

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/List detail/Adding a note/screens/01_sc_e20e59ee459b4a0d9a0a0302091962bd.png>) · [원본 분석](<../../medium/flows/Library/List detail/Adding a note/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s177>) · `sc_e20e59ee459b4a0d9a0a0302091962bd`

- 담당: V25 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>)
- 계정·권한: A 소유; 기본 reading-list와 일반 About mindfulness 구분
- fixture 구성: UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; D13 source 확정 updatedAt(Parity7 자체 계약)
- 원본 관찰 표시값: 표시값·입력: 동일 리스트 후반 항목
- 원본 관찰 상태: 상태: 목록 후반
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 나머지 기사·읽기시간·날짜·메모 영역
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F45-01, T-F46-04 / U-S177, U-F45, U-F46 / C28, C30, C31, C32, C33, C34, C35. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

<a id="s178"></a>

## S178 — 프로필에 발행 글 표시

[원본 PNG](<../../medium/flows/Home/Publishing a story/screens/11_sc_e3b2276c9abd4bc7b08e6e4c322dee9e.png>) · [원본 분석](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s178>) · `sc_e3b2276c9abd4bc7b08e6e4c322dee9e`

- 담당: V32 / 묶음 15. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile → Stories/Lists/About 또는 Edit profile → photo/pronouns → 자식 Done → 부모 Save
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [WrittenStoryActions.tsx](<../../FE/src/features/editor/WrittenStoryActions.tsx>), [WrittenStoryCardReactions.tsx](<../../FE/src/features/editor/WrittenStoryCardReactions.tsx>), [ProfileEditorSheet.tsx](<../../FE/src/features/profile/ProfileEditorSheet.tsx>), [ProfileScreen.tsx](<../../FE/src/features/profile/ProfileScreen.tsx>), [ProfileStories.tsx](<../../FE/src/features/profile/ProfileStories.tsx>), [PronounsEditor.tsx](<../../FE/src/features/profile/PronounsEditor.tsx>), [useProfilePhotoSelection.ts](<../../FE/src/features/profile/useProfilePhotoSelection.ts>)
- 계정·권한: A 소유; 표시 이름 Alex Smith와 userId는 별개
- fixture 구성: ProfileSource·ProfilePhotoPicker·DraftSource; 0/1글, he/him, 소개49자, 사진/반응29/1 별도
- 원본 관찰 표시값: 표시값·입력: Alex Smith, 0 followers·1 following, Just now
- 원본 관찰 상태: 상태: 발행된 것으로 보이는 글 카드
- 시간: publishedAt=고정 now; Just now
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 프로필 Stories 탭 Public 필터 아래 새 글
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F08-11 / U-S178, U-F08 / C51, C52, C53. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Stories/Lists/About·Public·빈 CTA·편집/통계, 사진 미리보기·부모Save/Cancel, name50/bio160·pronouns0/4→2/4·Done, desktop About 안내를 각각 비교한다. OS picker는 실제 어댑터 검증으로 분리한다.

<a id="s179"></a>

## S179 — 박수 피드백 종료

[원본 PNG](<../../medium/flows/Home/Story detail/Sending claps/screens/03_sc_e3b85b46c655483eb954e6f953d0b7f6.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Sending claps/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s179>) · `sc_e3b85b46c655483eb954e6f953d0b7f6`

- 담당: V13 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Home/Explore 기사 → Article(articleId); 본문·말미·응답 미리보기까지 스크롤; 박수 조작
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ArticleDetailScreen.tsx](<../../FE/src/features/article/ArticleDetailScreen.tsx>), [ReferenceArticleView.tsx](<../../FE/src/features/article/ReferenceArticleView.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>)
- 계정·권한: 공개 읽기와 회원 제한 상태 분리; 반응은 A
- fixture 구성: medium-brain 기본 기사; F16의834와 박수 흐름832는 독립 response fixture
- 원본 관찰 표시값: 표시값·입력: 박수 아이콘 검정, 18K, 응답 832
- 원본 관찰 상태: 상태: 일시적 +16 배지 사라짐
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 기사 상단과 고정 반응 바
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F38-03 / U-S179, U-F38 / C09, C10, C11, C12. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 제목/부제/작가/읽기시간/표지 출처, 본문 강조·링크·삽입 이미지·토픽·작성자·응답 미리보기·관련 글·고정 반응 바를 각각 비교한다. +16은 입력 피드백이며 터치 횟수 증거가 아니다.

<a id="s180"></a>

## S180 — 멘션 입력 시작

[원본 PNG](<../../medium/flows/Home/Publishing a story/Mentioning a user/screens/02_sc_e3c9949b35ca4bc7b3328ee4e887fc5a.png>) · [원본 분석](<../../medium/flows/Home/Publishing a story/Mentioning a user/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s180>) · `sc_e3c9949b35ca4bc7b3328ee4e887fc5a`

- 담당: V10 / 묶음 9. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Editor 본문 @ → samlee → 후보 선택 → Sam Lee 삽입
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [DocumentReader.tsx](<../../FE/src/features/editor/DocumentReader.tsx>), [MentionSuggestions.tsx](<../../FE/src/features/editor/MentionSuggestions.tsx>)
- 계정·권한: A 소유 초안
- fixture 구성: mention 검색 source와 문서 snapshot; S015 문자열 위치·키보드 별도
- 원본 관찰 표시값: 표시값·입력: @만 입력
- 원본 관찰 상태: 상태: 멘션 검색 대기
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 본문 새 줄에 @, 키보드 위 사용자 이름 입력 안내
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 보임 관찰; web은 OS 키보드 비동등
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F11-02 / U-S180, U-F11 / C43. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: @만 있는 안내, samlee 검색의 이름·아바타·핸들 세 행, 녹색 이름 삽입과 커서·툴바·키보드 위치를 비교한다. 실제 알림 발송은 별도다.

<a id="s181"></a>

## S181 — 본인 응답 관리 메뉴

[원본 PNG](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Deleting a response/screens/02_sc_e4b254a2635b47069e314a1462c985d6.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Deleting a response/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s181>) · `sc_e4b254a2635b47069e314a1462c985d6`

- 담당: V20 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>)
- 계정·권한: A를 작성자 YOU에 대응; 본인/타인 응답 분리
- fixture 구성: ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태
- 원본 관찰 표시값: 표시값·입력: 응답 유지
- 원본 관찰 상태: 상태: 수정·삭제 선택 가능
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 본인 응답 더보기 팝오버
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F32-02, T-F33-02 / U-S181, U-F32, U-F33 / C14, C15, C16, C17, C18, C20. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

<a id="s182"></a>

## S182 — 로그인 수단 선택

[원본 PNG](<../../medium/flows/Logging in/screens/02_sc_e4d414380a1047a2b7970cf7869a0866.png>) · [원본 분석](<../../medium/flows/Logging in/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s182>) · `sc_e4d414380a1047a2b7970cf7869a0866`

- 담당: V29 / 묶음 14. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Profile 또는 Library guest → AuthDialogs → 이메일 signup/login/code; Profile/Settings → Sign out
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [AuthDialogs.tsx](<../../FE/src/features/auth/AuthDialogs.tsx>), [EmailLogin.tsx](<../../FE/src/features/auth/EmailLogin.tsx>), [createEmailAttempt.ts](<../../FE/src/features/auth/createEmailAttempt.ts>)
- 계정·권한: guest→A 모의 인증; 기존 세션 로그아웃은 A 시작
- fixture 구성: mockUsers + emailAuthSource; 개인정보·원본 인증코드 복사 없이 합성 테스트값 사용
- 원본 관찰 표시값: 표시값·입력: 입력 없음
- 원본 관찰 상태: 상태: 로그인 시작
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 브랜드 문구 아래 공급자 버튼 5개
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F52-02 / U-S182, U-F52 / C46, C47, C48, C67. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 가입4/로그인5 제공자, 이메일/이름/약관/뒤로·6칸 코드와Validate·Resend·닫기, Sign out Cancel/Confirm→intro를 비교한다. 빈 폼의 녹색 버튼과 실제 입력 검증은 별개다.

<a id="s183"></a>

## S183 — 인용 서식 적용

[원본 PNG](<../../medium/flows/Home/Publishing a story/Changing text format/screens/03_sc_e5826f356093493a86c19716420e8fdf.png>) · [원본 분석](<../../medium/flows/Home/Publishing a story/Changing text format/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s183>) · `sc_e5826f356093493a86c19716420e8fdf`

- 담당: V07 / 묶음 9. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Home 작성 → Editor; 제목·본문 입력 → 해당 서식·이미지 블록 선택
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [RichDocumentBody.tsx](<../../FE/src/features/editor/RichDocumentBody.tsx>), [StoryEditorScreen.tsx](<../../FE/src/features/editor/StoryEditorScreen.tsx>), [editorModel.ts](<../../FE/src/features/editor/editorModel.ts>)
- 계정·권한: A 소유 초안; 같은 draftId 유지
- fixture 구성: DraftSource·EditorSession; 음악 제목/단락/인용/목록/구분선은 각 S의 문서 snapshot 별도
- 원본 관찰 표시값: 표시값·입력: 동일 문장·이미지 유지
- 원본 관찰 상태: 상태: 인용 블록 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 단락 왼쪽 세로선과 이탤릭, 인용 도구 녹색
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F09-03 / U-S183, U-F09 / C40. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 제목과 본문, 회색 문자 스타일, 이탤릭 인용선, bullet, 점3개 구분선, 선택 중 도구 색과 키보드 위 툴바를 비교한다. 코드 도구의 실행 후 모습은 원본 미확인이다.

<a id="s184"></a>

## S184 — 알림 활성화 안내

[원본 PNG](<../../medium/flows/Onboarding/screens/11_sc_e9f4c426cfb3426d9ca05121dea00ce3.png>) · [원본 분석](<../../medium/flows/Onboarding/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s184>) · `sc_e9f4c426cfb3426d9ca05121dea00ce3`

- 담당: V30 / 묶음 14. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): guest signup → Onboarding → interests → recommendations → permission → welcome; S043은 실제 cold start
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [OnboardingScreen.tsx](<../../FE/src/features/onboarding/OnboardingScreen.tsx>), [createOnboardingSession.ts](<../../FE/src/features/onboarding/createOnboardingSession.ts>)
- 계정·권한: 신규 A; 기존 A와 분리된 새 메모리 세션
- fixture 구성: OnboardingSource·NotificationPermissionSource; 관심5개/추천Follow/안내 상태; S043 대응 splash 없음
- 원본 관찰 표시값: 표시값·입력: 입력란 없음
- 원본 관찰 상태: 상태: 알림 권한 요청 전 앱 안내
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 중앙 Stay up to date 안내와 하단 두 행동
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F53-11 / U-S184, U-F53 / C49, C50. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 브랜드 시작, 새 경험 소개, 최소3개 안내와 관찰5개 선택, Follow/Finish, Enable/Skip와 다음 목적지를 확인한다. 모든 계정에 동일 순서를 강제하지 않는다.

<a id="s185"></a>

## S185 — 다크 Explore

[원본 PNG](<../../medium/flows/Profile/Settings/Switching to dark mode/screens/04_sc_eaaa223bd5c84facb010485d0f797e76.png>) · [원본 분석](<../../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s185>) · `sc_eaaa223bd5c84facb010485d0f797e76`

- 담당: V02 / 묶음 17. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Explore → 검색 진입·Mindfulness 입력·Stories; Staff Picks/Who to follow 위치까지 세로·가로 이동
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [CatalogSearchResults.tsx](<../../FE/src/features/search/CatalogSearchResults.tsx>), [ExploreSections.tsx](<../../FE/src/features/search/ExploreSections.tsx>), [SearchScreen.tsx](<../../FE/src/features/search/SearchScreen.tsx>)
- 계정·권한: 공개 열람; 관계 조작은 A
- fixture 구성: mediumFeedFixtures / SearchScreen·CatalogSearchResults; 칩·캐러셀 위치는 화면별 설정
- 원본 관찰 표시값: 표시값·입력: 검색 빈값
- 원본 관찰 상태: 상태: 탐색 화면 테마 적용
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 검색창·칩·Trending 모두 어두운 배경
- 테마: Dark 관찰; 앱/reader 각각 설정; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F62-04 / U-S185, U-F62 / C06, C07. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 검색 빈 화면의 토픽 행, Stories 결과, 다섯 탭과 X를 분리한다. Trending 순위, Staff Picks 가로 카드, Recommended 세로 카드, Who to follow 가로 이동을 원본 상태별로 비교한다.

<a id="s186"></a>

## S186 — 푸시 알림 상세 설정

[원본 PNG](<../../medium/flows/Profile/Settings/Changing notification settings/screens/02_sc_ee2e76b092df4d309bfd0633f25273a6.png>) · [원본 분석](<../../medium/flows/Profile/Settings/Changing notification settings/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s186>) · `sc_ee2e76b092df4d309bfd0633f25273a6`

- 담당: V28 / 묶음 16. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Digest 설정 또는 Profile/Settings → Email/Push → NotificationSettings(section)
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [NotificationSettingsScreen.tsx](<../../FE/src/features/notifications/NotificationSettingsScreen.tsx>)
- 계정·권한: A; 앱 설정과 OS권한을 별도 기록
- fixture 구성: NotificationSource·설정 source; Daily/PushOn/EmailOn와 개별 토글 상태
- 원본 관찰 표시값: 표시값·입력: Digest·Top story·Editors·Featured·Applause·Saves 켜짐, 여러 항목 Tailored for you
- 원본 관찰 상태: 상태: 이벤트별 푸시 제어
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 여러 이벤트 유형의 토글·선택값
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F59-02 / U-S186, U-F59 / C39, C50, C56, C57, C67. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Daily/Push On/Email On의 선택·chevron·외부 화살표를 구분한다. 여섯 토글과 다섯 Tailored 행, Top story/Editors만Off를 비교한다.

<a id="s187"></a>

## S187 — 설정 닫힌 다크 기사

[원본 PNG](<../../medium/flows/Home/Story detail/Changing display/screens/08_sc_ee957cf03e9848948f9ec8189264d8d8.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s187>) · `sc_ee957cf03e9848948f9ec8189264d8d8`

- 담당: V13 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Home/Explore 기사 → Article(articleId); 본문·말미·응답 미리보기까지 스크롤; 박수 조작
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ArticleDetailScreen.tsx](<../../FE/src/features/article/ArticleDetailScreen.tsx>), [ReferenceArticleView.tsx](<../../FE/src/features/article/ReferenceArticleView.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>)
- 계정·권한: 공개 읽기와 회원 제한 상태 분리; 반응은 A
- fixture 구성: medium-brain 기본 기사; F16의834와 박수 흐름832는 독립 response fixture
- 원본 관찰 표시값: 표시값·입력: 120% 설정 후 제목 3줄
- 원본 관찰 상태: 상태: 표시 설정 적용 결과
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 확대 글자·검정 배경·기사 상단
- 테마: Dark 관찰; 앱/reader 각각 설정; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F24-08 / U-S187, U-F24 / C09, C10, C11, C12. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 제목/부제/작가/읽기시간/표지 출처, 본문 강조·링크·삽입 이미지·토픽·작성자·응답 미리보기·관련 글·고정 반응 바를 각각 비교한다. +16은 입력 피드백이며 터치 횟수 증거가 아니다.

<a id="s188"></a>

## S188 — 월간 글 통계

[원본 PNG](<../../medium/flows/Profile/Story stats/screens/02_sc_eece99396c944a4fac5e50820715f00a.png>) · [원본 분석](<../../medium/flows/Profile/Story stats/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s188>) · `sc_eece99396c944a4fac5e50820715f00a`

- 담당: V34 / 묶음 20. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Profile → View stats → StoryStats → Monthly/Lifetime·날짜·글 선택
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [StoryStatsScreen.tsx](<../../FE/src/features/story-stats/StoryStatsScreen.tsx>)
- 계정·권한: A 소유 발행 글; 이력 방문과 분석집계 별개
- fixture 구성: StoryStatsSource; June1–13 UTC11/2와 글 Lifetime0/0 독립 initial/asOf fixture
- 원본 관찰 표시값: 표시값·입력: Jun 1–13 2025 UTC, Updated daily, Views11·Reads2
- 원본 관찰 상태: 상태: 일별 통계 시각화
- 시간: asOf와 June1–13 2025 UTC 기간 고정; 합계11/2
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 월 선택·두 집계·라인 그래프
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F63-02 / U-S188, U-F63 / C54. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: Monthly 기간UTC/Updated daily, 11/2·그래프 축/범례/색/면·날짜선·점, Lifetime Latest/글0/0을 독립 비교 fixture로 확인한다. 원본 집계 모순을 운영 계산식으로 만들지 않는다. Lifetime 자체의 시작일–Today·Updated daily와 글의23 hours ago도 별도로 비교한다. 현재 코드에 이 분기가 있다는 사실을 새 실행 통과로 표시하지 않는다.

<a id="s189"></a>

## S189 — 기사 본문 스크롤

[원본 PNG](<../../medium/flows/Home/Story detail/screens/03_sc_f4b06612bdbf48ecbd8a7b6e2607d117.png>) · [원본 분석](<../../medium/flows/Home/Story detail/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s189>) · `sc_f4b06612bdbf48ecbd8a7b6e2607d117`

- 담당: V13 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Home/Explore 기사 → Article(articleId); 본문·말미·응답 미리보기까지 스크롤; 박수 조작
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ArticleDetailScreen.tsx](<../../FE/src/features/article/ArticleDetailScreen.tsx>), [ReferenceArticleView.tsx](<../../FE/src/features/article/ReferenceArticleView.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>)
- 계정·권한: 공개 읽기와 회원 제한 상태 분리; 반응은 A
- fixture 구성: medium-brain 기본 기사; F16의834와 박수 흐름832는 독립 response fixture
- 원본 관찰 표시값: 표시값·입력: 여러 텍스트 강조 범위
- 원본 관찰 상태: 상태: 본문 중간 읽기
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 세리프 본문과 굵은 단락·점 구분선·연녹색 강조
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F16-03, T-F25-01 / U-S189, U-F16, U-F25 / C09, C10, C11, C12. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 제목/부제/작가/읽기시간/표지 출처, 본문 강조·링크·삽입 이미지·토픽·작성자·응답 미리보기·관련 글·고정 반응 바를 각각 비교한다. +16은 입력 피드백이며 터치 횟수 증거가 아니다.

<a id="s190"></a>

## S190 — 읽기 기록 목록

[원본 PNG](<../../medium/flows/Home/Refine recommendations/screens/03_sc_f4bb3fa34f32466b9bd12eea57ea518f.png>) · [원본 분석](<../../medium/flows/Home/Refine recommendations/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s190>) · `sc_f4bb3fa34f32466b9bd12eea57ea518f`

- 담당: V12 / 묶음 4. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.; Parity 4 새 실행은 latestReview 참조; 과거 캡처를 현재 코드 증거로 승격하지 않음
- 실제 FE 진입 절차(정적 확인): 개발 웹 /?parityHistory=reference-v1 → mock A → Profile/Settings → Refine recommendations → Reading history → 카드·삭제·Clear history; 일반 방문은 Library 이력 경로도 확인
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ReadingHistoryList.tsx](<../../FE/src/features/reading-history/ReadingHistoryList.tsx>)
- 계정·권한: A 개인 방문 이력; Viewed와 실제 Views/Reads 구분
- fixture 구성: ReadingHistorySource + reactive 카탈로그; Parity 4의 명시적 reference-v1 seed는 알려진 세 기사와 합성 방문 시각만 제공; 원본 중간 카드·집계 차이는 V12 잔여; D03/D05 연결 검증은 FE_MEDIUM_PARITY_04_RESULT 참조
- 원본 관찰 표시값: 표시값·입력: 읽은 글·날짜·집계 표시
- 원본 관찰 상태: 상태: 읽기 기록 존재
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Reading history 탭, 전체 삭제 안내, 기사 카드
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F12-03, T-F14-01, T-F15-01 / U-S190, U-F12, U-F14, U-F15 / C11, C25, C27, C37. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 전체 Clear history와 개별 휴지통을 분리하고 빈 상태 Explore·목록 스크롤을 확인한다. 발행일을 읽은 시각으로 바꾸지 않는다.

<a id="s191"></a>

## S191 — 메모 내용 입력

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/List detail/Adding a note/screens/04_sc_f4f970015d6743538664901310d2c17b.png>) · [원본 분석](<../../medium/flows/Library/List detail/Adding a note/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s191>) · `sc_f4f970015d6743538664901310d2c17b`

- 담당: V25 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>)
- 계정·권한: A 소유; 기본 reading-list와 일반 About mindfulness 구분
- fixture 구성: UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; D13 source 확정 updatedAt(Parity7 자체 계약)
- 원본 관찰 표시값: 표시값·입력: A very good explanation of mindfulness
- 원본 관찰 상태: 상태: 메모 제출 준비
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 대상 기사 카드 위 입력란
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F45-04 / U-S191, U-F45 / C28, C30, C31, C32, C33, C34, C35. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

<a id="s192"></a>

## S192 — 음성 선택 후 플레이어

[원본 PNG](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/screens/06_sc_f637c648d6ec470a81cf77e5594e02da.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s192>) · `sc_f637c648d6ec470a81cf77e5594e02da`

- 담당: V18 / 묶음 12. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article Listen → 미니 플레이어 → 확장 → 재생·정지·seek·닫기
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListeningPlayer.tsx](<../../FE/src/features/listening/ListeningPlayer.tsx>)
- 계정·권한: A 모의 회원 자격; 실제 음성 없음
- fixture 구성: ListeningSource·mock 시계; 00:05/00:10/00:20/00:40 각 snapshot과 duration 독립
- 원본 관찰 표시값: 표시값·입력: 1x, 00:20, -04:27
- 원본 관찰 상태: 상태: 재생 UI 복귀
- 시간: 재생00:20/-04:27/1x; 독립 duration/position
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 확장 재생 화면 복귀
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F28-06 / U-S192, U-F28 / C58, C59, C61, C66. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 준비 중 두 spinner, mini/expanded 동일 기사, 커버·배경·시간·진행선·10초/30초·희미한 이전/다음·닫기·Speechify 표시를 비교한다. 무음 timer는 실제 재생과 구분한다. Q12에서 미니/확장 플레이어의 모의 안내가 원본 배치에 미치는 영향을 판정한다.

<a id="s193"></a>

## S193 — 다이제스트 날짜 선택

- 최신 실행: [Parity 6](../FE_MEDIUM_PARITY_06_RESULT.md). June12~June3 라디오10개·최근10발행분 안내·Done/닫기/포커스 복귀를 확인했다. 달력10일을 보관 계약으로 사용하지 않는다. 시각 차이·U/native 대기는 유지한다.

[원본 PNG](<../../medium/flows/Library/Filtering digest/screens/02_sc_f647f3c6b04d48e9bb1b31f5d0fb2cfe.png>) · [원본 분석](<../../medium/flows/Library/Filtering digest/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s193>) · `sc_f647f3c6b04d48e9bb1b31f5d0fb2cfe`

- 담당: V27 / 묶음 6. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Main/Library → Digest → 날짜 선택 → June12/June8 → 닫기
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [LibraryScreen.tsx](<../../FE/src/features/bookmarks/LibraryScreen.tsx>), [IdentityLink.tsx](<../../FE/src/features/community/IdentityLink.tsx>), [DigestPanel.tsx](<../../FE/src/features/digest/DigestPanel.tsx>), [NotificationSettingsScreen.tsx](<../../FE/src/features/notifications/NotificationSettingsScreen.tsx>), [ClapControl.tsx](<../../FE/src/features/reactions/ClapControl.tsx>), [ResponseButton.tsx](<../../FE/src/features/responses/ResponseButton.tsx>)
- 계정·권한: A; 읽기용 모의 issue; 실제 발송 없음
- fixture 구성: digestFixtures/replaceIssues; June12 love/jeremiah, June8 Goodbye Notion/xeladu·Alex; 다른 호는 자체 mock, 사진·응답 snapshot 차이 잔여
- 원본 관찰 표시값: 표시값·입력: June 12 2025 선택, June 3까지
- 원본 관찰 상태: 상태: 최근 10개까지 볼 수 있다는 안내
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Digest history 시트·라디오 10개·하단 안내
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F43-02 / U-S193, U-F43 / C37, C38. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: June12→June8의 임시 radio/Done·확정 날짜·바뀐 기사, last10 안내와 제목/카드 반응/저장을 비교한다. 날짜10일과 발행10개를 구분한다.

<a id="s194"></a>

## S194 — 추천 유형 필터 메뉴

[원본 PNG](<../../medium/flows/Home/Refine recommendations/Filtering suggestions/screens/02_sc_f978feb6af9f44b5a5fa8f514899f3da.png>) · [원본 분석](<../../medium/flows/Home/Refine recommendations/Filtering suggestions/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s194>) · `sc_f978feb6af9f44b5a5fa8f514899f3da`

- 담당: V11 / 묶음 5. 상태: **recipe-only**. Parity 5에서 mock 연결/웹 부분 대조를 수행함; 원본 차이·미확인·native 대기. 사용자 지시로 캡처 파일을 저장하지 않았으며 원본 동일성이나 ready로 승격하지 않음
- 최신 검토: [Parity 5 결과](<../FE_MEDIUM_PARITY_05_RESULT.md>); 관계 카탈로그·관리 목록·동작 및 웹 부분 비교; 원본 시각 차이·U 미확인·native 대기
- 실제 FE 진입 절차(정적 확인): Home 더보기/Refine recommendations → Recommendations → Following/Reading history/Muted/Suggestions → All·Topics 등 필터
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [RefineRecommendationsScreen.tsx](<../../FE/src/features/recommendations/RefineRecommendationsScreen.tsx>)
- 계정·권한: A 개인 관계; 빈 상태와 Writers1/Topics3 독립
- fixture 구성: RelationshipSource·ModerationSource·TopicSource + useIdentityCatalog(DirectorySource/mockUsers/확정 공개 프로필); Writers1/Topics3는 UI 팔로우로 구성, 숫자와 목록·해제를 함께 확인
- 원본 관찰 표시값: 표시값·입력: Topics 체크
- 원본 관찰 상태: 상태: 유형 선택 중
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Suggestions 위 팝오버
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F13-02 / U-S194, U-F13 / C05, C12, C25, C26. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 네 탭, All/Writers/Publications/Topics, 빈 Following, 종류별 count/See all, Follow/Following, See more suggestions를 개별 확인한다.

<a id="s195"></a>

## S195 — 리스트 항목 메뉴

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/List detail/Adding a note/screens/02_sc_fa4e79f0bed747d698ae44e23f9223f9.png>) · [원본 분석](<../../medium/flows/Library/List detail/Adding a note/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s195>) · `sc_fa4e79f0bed747d698ae44e23f9223f9`

- 담당: V25 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>)
- 계정·권한: A 소유; 기본 reading-list와 일반 About mindfulness 구분
- fixture 구성: UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; D13 source 확정 updatedAt(Parity7 자체 계약)
- 원본 관찰 표시값: 표시값·입력: Mind Fullness or Emptiness? 대상
- 원본 관찰 상태: 상태: 항목별 관리
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 특정 기사 더보기 3행 팝오버
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F45-02, T-F50-01 / U-S195, U-F45, U-F50 / C28, C30, C31, C32, C33, C34, C35. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.

<a id="s196"></a>

## S196 — 멘션 검색 후보

[원본 PNG](<../../medium/flows/Home/Publishing a story/Mentioning a user/screens/03_sc_fbca217fbc1346d09deb4c0d09dac86e.png>) · [원본 분석](<../../medium/flows/Home/Publishing a story/Mentioning a user/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s196>) · `sc_fbca217fbc1346d09deb4c0d09dac86e`

- 담당: V10 / 묶음 9. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Editor 본문 @ → samlee → 후보 선택 → Sam Lee 삽입
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [DocumentReader.tsx](<../../FE/src/features/editor/DocumentReader.tsx>), [MentionSuggestions.tsx](<../../FE/src/features/editor/MentionSuggestions.tsx>)
- 계정·권한: A 소유 초안
- fixture 구성: mention 검색 source와 문서 snapshot; S015 문자열 위치·키보드 별도
- 원본 관찰 표시값: 표시값·입력: 검색어 samlee
- 원본 관찰 상태: 상태: 동명이인 구분 가능한 후보 목록
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: @samlee 입력 아래 아바타·이름·핸들 3행
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F11-03 / U-S196, U-F11 / C43. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: @만 있는 안내, samlee 검색의 이름·아바타·핸들 세 행, 녹색 이름 삽입과 커서·툴바·키보드 위치를 비교한다. 실제 알림 발송은 별도다.

<a id="s197"></a>

## S197 — 구절 인용 응답 등록

[원본 PNG](<../../medium/flows/Home/Story detail/Responding to a phrase/screens/04_sc_fcdcd471caeb41b8bfa89273d8e29a8d.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Responding to a phrase/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s197>) · `sc_fcdcd471caeb41b8bfa89273d8e29a8d`

- 담당: V20 / 묶음 10. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Article → Responses; 정렬·답글·본인 더보기·편집·삭제 또는 구절 Respond
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ResponseManagement.tsx](<../../FE/src/features/responses/ResponseManagement.tsx>), [ResponsesPanel.tsx](<../../FE/src/features/responses/ResponsesPanel.tsx>), [responseRows.ts](<../../FE/src/features/responses/responseRows.ts>)
- 계정·권한: A를 작성자 YOU에 대응; 본인/타인 응답 분리
- fixture 구성: ResponseSource·responseFixtures; root counts832/833/834, reply·edit·delete 별도 상태
- 원본 관찰 표시값: 표시값·입력: Now, 총수 834 유지
- 원본 관찰 상태: 상태: 인용 응답 목록에 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: YOU 응답에 인용 상자와 본문
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F29-04 / U-S197, U-F29 / C14, C15, C16, C17, C18, C20. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 들여쓰기·세로선·부모 강조, Hide replies/Read more/See more replies, 빈/채운 전송, YOU·edited·Cancel, 정렬·수정·삭제 토스트·인용을 각각 비교한다.

<a id="s198"></a>

## S198 — 다크 테마 적용

[원본 PNG](<../../medium/flows/Home/Story detail/Changing display/screens/06_sc_fd7de1ebfba14fbca6ddbe3ff642c42c.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s198>) · `sc_fd7de1ebfba14fbca6ddbe3ff642c42c`

- 담당: V16 / 묶음 4. 상태: **historical-web-capture-parity-01**. Parity 1 당시 관찰: Dark 선택 후120%/others on 확인; 원본 직접 대조에서 흰 웹 스크롤바·부제 줄바꿈·폰트·반응7 차이.; 현재 공통 보정과 잔여는 Parity 2 결과 참조; Parity 4 새 실행은 latestReview 참조; 과거 캡처를 현재 코드 증거로 승격하지 않음
- 실제 FE 진입 절차(정적 확인): Article 더보기 → Display settings → 100/120%, font, appearance, highlights
- Parity 1 당시 증거: [과거 웹 캡처](<EVIDENCE/PARITY_01/S198.png>). 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ArticleDisplayPopover.tsx](<../../FE/src/features/settings/ArticleDisplayPopover.tsx>), [useReaderTypography.ts](<../../FE/src/features/settings/useReaderTypography.ts>)
- 계정·권한: reader 설정 A; 앱 전역 theme와 별도
- fixture 구성: DisplaySettingsSource; S063 기본관찰값, S125=120%, S198=Dark120%, S001=others off
- 원본 관찰 표시값: 표시값·입력: Dark, 120%, 타인 하이라이트 켜짐
- 원본 관찰 상태: 상태: 다크 테마 반영
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: 배경·설정 팝오버 검정 계열
- 테마: Dark 관찰; 앱/reader 각각 설정; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F24-06 / U-S198, U-F24 / C02, C12, C13. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 100→120과 배경 제목 줄바꿈, Font family 행, Appearance 하위 선택, 타인 Highlight on/off와 어두운 팝오버를 비교한다. 본인 저장 강조 삭제와 분리한다.

<a id="s199"></a>

## S199 — 작가 차단 안내

[원본 PNG](<../../medium/flows/Home/Story detail/Author detail/Blocking an author/screens/03_sc_ff143e1e9b4d4e5ab0579b3fdc61dc1a.png>) · [원본 분석](<../../medium/flows/Home/Story detail/Author detail/Blocking an author/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s199>) · `sc_ff143e1e9b4d4e5ab0579b3fdc61dc1a`

- 담당: V15 / 묶음 5. 상태: **recipe-only**. Parity 5에서 mock 연결/웹 부분 대조를 수행함; 원본 차이·미확인·native 대기. 사용자 지시로 캡처 파일을 저장하지 않았으며 원본 동일성이나 ready로 승격하지 않음
- 최신 검토: [Parity 5 결과](<../FE_MEDIUM_PARITY_05_RESULT.md>); 관계 카탈로그·관리 목록·동작 및 웹 부분 비교; 원본 시각 차이·U 미확인·native 대기
- 실제 FE 진입 절차(정적 확인): Identity 또는 Article 더보기 → Mute/Block/Report → 선택·확정·토스트
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ModerationDialogs.tsx](<../../FE/src/features/moderation/ModerationDialogs.tsx>), [articleModeration.ts](<../../FE/src/features/moderation/articleModeration.ts>)
- 계정·권한: A; follow/mute/block/report 각각 별도 상태
- fixture 구성: ModerationSource·RelationshipSource와 공통 사용자 카탈로그; S093은 별도 snapshot이며 차단 결과로 단정하지 않음; 신고/차단/음소거 별도 상태
- 원본 관찰 표시값: 표시값·입력: 기사 목록은 그대로 보임
- 원본 관찰 상태: 상태: 차단 성공 표시
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Author blocked 토스트, Follow 표시
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F18-03 / U-S199, U-F18 / C12, C18, C23, C24, C61. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 메뉴 순서·파랑/빨강·Cancel, 성공 토스트, 신고 radio와 Also block checkbox, 사유 전후 Report 상태를 비교한다. 차단 후 원본 카드 잔존과 자체 접근 제한의 충돌을 기록한다.

<a id="s200"></a>

## S200 — 리스트 항목 메모 폼

- 최신 실행: [Parity 7](../FE_MEDIUM_PARITY_07_RESULT.md). 상대 시간·메모·회원용 별·초안 수명 보완과 웹 부분 비교. 서체/자산/OS·U/native 잔여, 저장 캡처 없이 recipe-only 유지.

[원본 PNG](<../../medium/flows/Library/List detail/Adding a note/screens/03_sc_ffa4d0c8f01440e1a0842a4e1a59708a.png>) · [원본 분석](<../../medium/flows/Library/List detail/Adding a note/ANALYSIS.md>) · [R 수용 조건](<REQUIREMENTS_08.md#s200>) · `sc_ffa4d0c8f01440e1a0842a4e1a59708a`

- 담당: V25 / 묶음 7. 상태: **recipe-only**. 동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.
- 실제 FE 진입 절차(정적 확인): Library → ReadingList(listId) → 더보기·Create/Edit/Add note/Reorder/Private/Delete/Remove·Undo
- Parity 1 당시 증거: 없음; 정적 절차만 연결. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.
- 코드: [ListActions.tsx](<../../FE/src/features/bookmarks/ListActions.tsx>), [ListEditorSheet.tsx](<../../FE/src/features/bookmarks/ListEditorSheet.tsx>), [ListNoteSheet.tsx](<../../FE/src/features/bookmarks/ListNoteSheet.tsx>), [ListStoryCard.tsx](<../../FE/src/features/bookmarks/ListStoryCard.tsx>), [ReadingListScreen.tsx](<../../FE/src/features/bookmarks/ReadingListScreen.tsx>), [ReorderListEditor.tsx](<../../FE/src/features/bookmarks/ReorderListEditor.tsx>), [createUserListStore.ts](<../../FE/src/features/bookmarks/createUserListStore.ts>), [listTypes.ts](<../../FE/src/features/bookmarks/listTypes.ts>)
- 계정·권한: A 소유; 기본 reading-list와 일반 About mindfulness 구분
- fixture 구성: UserListStore·mediumLibraryArticles; S157 지정순서·메모·private·확정전후 독립; D13 source 확정 updatedAt(Parity7 자체 계약)
- 원본 관찰 표시값: 표시값·입력: Add a brief description 빈값
- 원본 관찰 상태: 상태: 메모 입력 전
- 시간: CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음
- 스크롤: 정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: 배치: Add note 시트·설명 입력·대상 기사 카드
- 테마: Light 비교 기본안; 원본 theme 설정 자체는 미확인; 키보드: 원본 명시 관찰 없음; PNG와 실제 focus 확인 필요
- 크기/플랫폼: PNG 1179×2556 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도; crop 미정(null), OS 영역 포함 원본 보존.
- 추적: T-F45-03 / U-S200, U-F45 / C28, C30, C31, C32, C33, C34, C35. 모든 R-ID·source 후보·해시는 JSON에 보존.
- 종료 조건: 생성60/280·optional, 빈 목록 CTA, Add note/메뉴/메모, 제목만4행 inline reorder와 Cancel/Done, 비공개 경고/공유 잔존, 삭제 영향 문구, Remove와Undo를 개별 확인한다. S106의14 seconds ago와 S011/S077의 상대 시간·4 stories 조합을 D13으로, S077 기사 별표를 D11로 연결한다. 빈 상세의 시간 표시를 Library 카드의 No stories와 혼동하지 않는다.
