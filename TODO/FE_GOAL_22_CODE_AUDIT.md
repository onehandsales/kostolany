# Goal 22 현재 코드와 후속 계약

사용자 후속 지시에 따라 별도 `TODO/evidence` 산출물은 커밋하지 않고 이 문서에 검토 내용을 보존한다. 기존 캡처·로그는 로컬 자료이며 이 문서의 필수 링크로 요구하지 않는다.

2026-11-19 KST · 시작 HEAD `5ff91ea` · FE 코드 기준 `234b224` 이후 소스 변경 없음.

이 문서는 [C01~C72 대응표](FE_MEDIUM_FULL_CLONE_MAP.md)의 **현재 코드 조사 결과**다. `동작`은 명시한 mock 동작에만 적용하며 원본 기능 전체·픽셀·native 완료를 뜻하지 않는다. `부분`은 일부 동작, `정적`은 고정 표시, `안내`는 ReferenceNotice만 표시, `미구현`은 해당 화면/상태 계약이 없다는 뜻이다. 행 안에서 구분하며 수치로 완료율을 계산하지 않는다. 실제 조작한 항목은 [실행 결과](FE_GOAL_22_RESULT.md), 나머지는 코드 검토 근거다.

## 세부 기능 72개

| 항목 | 현재 상태와 실제 경계 | 코드 근거 | 후속 담당 |
| --- | --- | --- | --- |
| C01 | 부분: 공통 토큰·아이콘·로컬 사진 있음; 원본 font 파일 없음, OS fallback과 수작업 SVG·치수 사용 | [tokens], [icons] | 23 |
| C02 | 정적/안내: System default 표시, Light/Dark 클릭 안내; 전역 테마 store 없음 | [settings] | 24 |
| C03 | 부분: SafeArea/논리 터치 영역·label 존재; OS 큰 글자/IME/스크린리더 실검증 없음 | [navigation], [sheet] | 52 |
| C04 | 부분: For you/Following/Featured fixture 전환·4탭 이동; 관계 기반 Following 미구현, +/알림/Write 안내 | [feed], [feed-tabs] | 50,31,36,44 |
| C05 | 안내: −/More/Show less/관심사 선택이 추천 상태를 바꾸지 않음 | [feed-card], [feed-tabs] | 31 |
| C06 | 부분: Trending/Staff Picks/추천 카드·가로 topic 표시; 사람/추천 publication 목적지 안내 | [search], [explore] | 30 |
| C07 | 동작/안내: Stories 검색·clear·뒤로·상세 복귀 동작; People/Publications/Topics/Lists 안내 후 Stories 유지 | [search] | 50 |
| C08 | 미구현: topic 상세·Follow·공개 큐레이션 목록 없음; topic chip은 기사 검색 연결 | [search], [explore] | 30 |
| C09 | 부분: 원본 기사 excerpt·표지·배지·고정 반응바; 관련 글/작가/토픽 안내, 금융 fixture의 4단계 설명은 자체 기능 | [article], [article-footer] | 25 |
| C10 | 부분: 기존 boolean like 동작; 기사 누적 claps·내 기여·Undo claps·박수 사용자 목록 없음 | [likes], [like-types] | 25 |
| C11 | 미구현: Viewed 및 읽은 기사 회색 제목 상태 없음 | [feed-card], [article] | 25,31 |
| C12 | 부분/안내: Story options는 기존 읽기 도구·저장 중심; 원본 5항목 계약 없음 | [article] | 29; 실행24,28,31 |
| C13 | 미구현: 원본 Font family/100~120%/Highlights from others 표시 설정 없음; 자체 설명 수준과 별개 | [article], [reading-types] | 24 |
| C14 | 정적/안내: 본문 아래 Responses(834), 일부 댓글만 fixture 표시; 전체 modal·정렬 미구현 | [article-footer] | 26 |
| C15 | 안내/미구현: 입력·Reply·내 댓글 수정/삭제 store·확정/취소 없음 | [article-footer] | 26 |
| C16 | 안내: Read more/Replies는 본문·답글을 확장하지 않음 | [article-footer] | 26 |
| C17 | 안내: 댓글별 claps 표시 고정; 사용자별 반응 상태 없음 | [article-footer] | 26 |
| C18 | 안내/미구현: Response options 안내; 신고·숨김·닫기·차단 관리 화면 없음 | [article-footer] | 29 |
| C19 | 정적/미구현: 인용·색칠 구간만 렌더; 실제 문구 선택 메뉴 없음 | [article] | 27 |
| C20 | 미구현: 내 highlight 생성/삭제·인용 응답·Library 연계 없음 | [article], [library] | 27 |
| C21 | 정적/안내: 작가 이름·소개·사진은 기사 내부 표시; 작성자 상세의 Stories/Lists/About 없음 | [article] | 28 |
| C22 | 안내: Follow author·followers/following 진입; 관계·이메일 구독 store 없음 | [article], [profile] | 28 |
| C23 | 미구현: 작가 메뉴 Share/Mute/Block 상태와 목적지 없음 | [article] | 29,47 |
| C24 | 안내/미구현: Report this item 안내; 사유/차단/완료·Blocked users 관리 없음 | [list-story], [settings] | 29,49 |
| C25 | 안내: Refine recommendations; 4탭·필터·실제 추천 설정 없음 | [settings] | 31 |
| C26 | 미구현: 대상별 follow/mute 추천 변경과 복귀 상태 없음 | [settings], [article] | 31,28,29 |
| C27 | 안내/미구현: Reading history 탭 안내; 기록/삭제/추천 제거 store 없음 | [library] | 31 |
| C28 | 동작/부분: 로그인 후 사용자가 다시 저장 실행, 다중 체크·Done/Cancel·새 목록·소속 공유; 원본 치수/새 기능 미완성 | [bookmark], [save-sheet] | 33 |
| C29 | 미구현: 공개 목록 전체 Save 관계 없음; Saved lists 탭 안내 | [library] | 32 |
| C30 | 정적/안내: 목록 상세 반응 수/공유 진입; 공개 목록 claps/Responses 동작 없음 | [list-detail] | 32,47 |
| C31 | 동작/부분: 기본/사용자 목록 조회·생성·제목/설명 편집·행 메뉴 있음; 소유자·기본 목록 정책 존재 | [list-detail], [list-actions], [list-editor] | 33 |
| C32 | 안내: Add note; 목록-기사별 메모 store·편집·취소·지우기 없음 | [list-story] | 33 |
| C33 | 안내: Reorder 안내; 순서 초안·Done/Cancel 없음 | [list-actions] | 33 |
| C34 | 부분: private 값 변경은 가능하나 원본 비공개 전환 확인 단계가 없음 | [list-actions], [list-types] | 33 |
| C35 | 동작/부분: Remove/Undo·Delete 확인/취소·다른 목록 소속 유지; 후속 메모/순서 복원 의미는 미구현 | [list-detail], [list-actions], [bookmark] | 33 |
| C36 | 안내: Download 아이콘; 다운로드 작업/캐시/취소/오프라인 상태 없음 | [list-detail], [library-card] | 35 |
| C37 | 부분: Your lists·목록 상세 동작; Saved lists/Digest/Highlighted/Reading history 안내 | [library] | 34; 데이터27,31,32,33,35 |
| C38 | 미구현: Digest 날짜 sheet·선택·과거 feed 없음 | [library] | 34 |
| C39 | 안내/미구현: Digest 설정·빈도·Email 하위 화면 없음 | [library], [settings] | 44 |
| C40 | 안내/미구현: Write/Get started 진입 안내; 편집기·서식·선택 영역 없음 | [feed], [profile] | 36 |
| C41 | 미구현: 편집기 Camera/Photo Library/Unsplash·삽입·취소 없음 | [feed] | 37 |
| C42 | 미구현: 작성 초안/자동 저장/재개/삭제 없음 | [profile] | 38 |
| C43 | 미구현: 멘션 후보·선택 토큰·대상 ID 없음 | [feed] | 38 |
| C44 | 미구현: 발행 topic 5개 한도·검색·제거·미리보기 없음 | [feed], [profile] | 39 |
| C45 | 미구현: Publication/Unlisted/Publish와 발행 글 조회 반영 없음 | [profile] | 39 |
| C46 | 부분/안내: Sign in 5개/Sign up 4개 제공자 외형; Google mock A/B만 실제 mock 세션 변경 | [auth-dialogs], [auth-types] | 40 |
| C47 | 안내/미구현: Email·코드·재전송·확인·실패·만료 단계 없음 | [auth-dialogs] | 40 |
| C48 | 동작/부분: 로그아웃 취소/실패/재시도와 사용자 경계 동작; 원본 intro 복귀와 현재 공개 화면 유지 차이 | [auth], [navigation] | 40 |
| C49 | 미구현: 가입 topic 선택·추천 Follow 온보딩 없음 | [auth-dialogs] | 41 |
| C50 | 미구현: Stay up to date/skip/OS 권한 온보딩 없음 | [auth-dialogs] | 41 |
| C51 | 정적/안내: 빈 아바타/Update photo; 사진 선택·crop·임시값·저장/취소 없음 | [profile-editor] | 42 |
| C52 | 정적/안내: Pronouns Add…/0 of 4; 하위 선택 sheet 없음 | [profile-editor] | 42 |
| C53 | 동작/부분: name/bio 편집·취소/저장·반영; Stories 빈 상태와 Public 안내·About 정적 문구, 계정 이름과 ID 분리 | [profile], [profile-editor], [profile-types] | 42 |
| C54 | 안내: View stats/Story stats; Monthly/Lifetime·월 선택·정렬 없음 | [profile], [settings] | 43 |
| C55 | 안내: Notifications 버튼; 알림 목록·읽음·대상 이동 없음 | [feed] | 44 |
| C56 | 안내: Push notifications; 스위치·OS 권한 adapter 없음 | [settings] | 44 |
| C57 | 안내/미구현: Tailored for you 선택·Email 세부 없음 | [settings] | 44 |
| C58 | 안내: Listen; 재생 상태·mini/full player·progress·seek 없음 | [article] | 45 |
| C59 | 미구현: 속도/WPM 표시·추천·닫기 상태 없음 | [article] | 46 |
| C60 | 미구현: 언어·voice 검색/선택/저장 없음 | [article] | 46 |
| C61 | 미구현: AirPlay/queue/menu·출력 장치 adapter 없음 | [article] | 46,47 |
| C62 | 안내/미구현: Share story; 링크·friend link·소셜·OS sheet·copy 없음 | [article] | 47 |
| C63 | 미구현: Share as image 카드·스타일·사진 저장 없음 | [article] | 47 |
| C64 | 안내/미구현: 목록 share 진입; 작가/topic/highlight 대상별 공유 계약 없음 | [list-detail], [article] | 47 |
| C65 | 안내: Become a Friend; Member/Friend 연월 가격표·가입 화면 없음 | [settings] | 48 |
| C66 | 정적/미구현: Member-only 배지만 표시; mock entitlement·자격 갱신·구독 상태 없음 | [article], [settings] | 48 |
| C67 | 안내: Account/Membership and payment/Facebook/More app controls | [settings] | 49 |
| C68 | 안내: Help/Terms/Privacy/Rate 목적지 | [settings] | 49 |
| C69 | 안내: Custom app icon; 선택 상태·Friend 제한·OS 아이콘 적용 없음 | [settings] | 49 |
| C70 | 부분: 기존 인증·like·bookmark·profile·기본 설명 상태와 경합 테스트 있음; 신규 관계/작성/반응 통합 없음 | [navigation], [auth], [bookmark], [likes] | 51 |
| C71 | 부분 검증: web·양 플랫폼 Jest·JS/Hermes export; 실제 OS 실행/빌드·IME·접근성 미검증 | [실행 결과](FE_GOAL_22_RESULT.md), [실행 결과](FE_GOAL_22_RESULT.md) | 52 |
| C72 | 기준선만: 200 원본 전수 관찰/11쌍 현재 비교; 63흐름 전체 동작·200장 구현 비교·BE 인계 미완성 | [기준선](FE_GOAL_22_BASELINE.md) | 53 |

## 현재 상태 소유권과 공개 계약

아래는 **실제 코드**다. source는 mock 저장소이며 서버 API/DB 스키마가 아니다. 사용자 ID는 이 FE 내부 모의 신원이고 실제 서버의 권한 검증 근거가 아니다.

| 상태 | 단일 소유자·공개 입력/출력 | 수명·주의 |
| --- | --- | --- |
| 인증 | AuthProvider → createAuthStore; AuthSource.signIn(userId, scenario), signOut; AuthSnapshot의 user/revision/dialog | 앱 수명, 성공/취소/실패/slow mock; 늦은 응답에 요청 세대 검사; 사용자 이름 수정은 인증 revision 변경 아님 |
| 공개 기사·검색 | app 조립부가 article/feed/search source 주입; 기사 ID와 cursor/검색어·정렬 | 피드·검색·상세는 같은 기사 ID; component 초안/스크롤과 공개 데이터 source 구분 |
| 기존 좋아요 | LikeProvider의 userId별 store; ArticleLike, setArticleLiked의 liked 목표값/commandId | boolean like; 로그아웃 중 이전 계정 응답은 그 계정 store에만 적용; source 교체 시 store 교체; 누적 claps로 의미를 조용히 변경하지 않음 |
| 북마크/목록 | BookmarkProvider → 사용자별 createLibraryStore; BookmarkSource, UserListSource; articleId/listId/userId, commandId | store는 계정별 메모리 보관; UI key는 source version/userId/sessionRevision; 조회보다 새 변경 우선, 목록 삭제 후 늦은 응답 부활 방지 |
| 기본 목록 | DEFAULT_LIST_ID=`reading-list`; 목록의 articleIds, 선택 description/isPrivate; 목록명 최대60 | 기본 목록 삭제 금지; 다른 소속이 남으면 저장 표시 유지; 목록 삭제는 원본 기사·like 삭제 아님 |
| 프로필 | ProfileProvider → createProfileStore; fields={name,bio}, userId, commandId; saved/superseded/failed | 이름과 소유자 ID 분리; 저장 초안은 sessionRevision key로 폐기; photo/pronouns는 아직 계약 없음 |
| 기본 설명 수준 | ReadingSettingsProvider; {userId,defaultLevel}, commandId; saved/superseded/failed | 계정별 메모리; 기사 내부 수동 수준과 분리; 늦은 기본값 조회가 수동 선택을 덮지 않음; Medium 표시 크기/폰트와 다름 |
| navigation | native-stack Article + Main bottom-tabs; Article origin/tab/listId/ownerUserId/sessionRevision | 상세 뒤로 복귀 시 현재 사용자·revision·목록 존재 확인; Library/Profile 개인 stack과 공개 기사 경로 수명 분리 |
| 편집 초안/시트 | 각 feature가 임시 입력/선택 보관; Done/Save에서 owner store로 명령 | Cancel은 영구 상태 변경 아님; A→B→A에서도 이전 개인 화면 초안/오류 재노출 금지 |

Provider 조립 순서는 Auth → ReadingSettings → Profile → Like → Bookmark → Navigation이다. Profile/ReadingSettings/Bookmark의 source version 및 sessionRevision key와 Like의 사용자별 store 동작은 같은 방식이라고 뭉뚱그리지 않는다. 전체 새로고침은 모든 mock 인증·개인 데이터 초기화이며 브라우저에서도 guest 복귀를 확인했다. 계정별 보존은 **같은 앱 실행 수명** 내 정책이다.

## 후속 공개 계약의 담당과 최소 의존성

아래는 **설계 접점 초안**이며 새 타입/파일/store를 구현하거나 DB를 정한 것이 아니다. 각 담당 Goal에서 실제 UI와 검토를 거쳐 확정한다. 공통적으로 공개 snapshot, 변경 결과, 오류/재시도, 정렬/페이지 경계, user/session/source 수명, 중복 command 처리를 명시한다.

| 데이터·행동 | 계약 담당 | 입력·결과와 보존할 경계 | 의존/통합 |
| --- | --- | --- | --- |
| 테마/기사 표시 | 24 | 앱 appearance와 기사 표시(font/scale/highlights)를 구분; System OS adapter | 23; 전 화면·52 |
| 박수/응답 | 25,26,32 | target kind(article/response/list)+target ID+user ID; 누적 기여와 aggregate, 댓글 parent/quote 식별 | 25→26→27/29/32; 51 |
| 선택/highlight | 27 | article ID+안정된 원문 범위; 내 저장/남의 표시/인용 응답 구분 | 26; 34,47 |
| 작성자/토픽/publication 관계 | 28,30 | 대상 종류+ID, Follow 목표 상태; email subscription은 별도 | 29,31,40/41,50 |
| moderation | 29 | mute/block/report/hide 별도 상태, 목록 항목 신고는 listId+articleId 필요; 공식 Blocked users와 사진 원본 충돌 보류 | 26,28; 49설정 연결 |
| 추천/이력 | 31 | Viewed, history, show less를 저장/박수와 분리; clear가 다른 개인 데이터 삭제 금지 | 29,30; 34,50 |
| 목록 | 32,33 | whole-list Save와 article membership 분리; note는 (listId,articleId), reorder는 임시 순서와 확정; privacy 확인 필요 | 26,28,30; 34,35,47 |
| Digest/다운로드 | 34,35 | 선택 Digest ID/날짜와 캐시 작업 상태 분리; 원격 발송 없음 | 27,31,33; 44 |
| editor/draft/media/publish | 36~39 | owner/draft ID, 구조화 본문/선택, media local adapter, topic ID 최대5, 발행 결과 article ID | 23,24,30; 42,43 |
| auth/onboarding | 40,41 | 기존 user ID/revision 유지; provider/code는 mock; 완료/취소/재전송·만료 명시 | 23,24,30,31; 42 |
| profile/stats | 42,43 | photo/pronouns 초안·저장/취소, 집계 기간·cohort 명시; name 변경으로 신원 변경 금지 | 28,39,40 |
| notifications | 44 | 앱 선호와 OS 권한 분리, target ID와 읽음 상태, Tailored 옵션 | 26,28,34,41 |
| audio/share | 45~47 | 재생 대상·진행·voice/속도·queue·adapter, share target와 mode; 실제 외부 전송 없음 | 25,27~30,32; 52 |
| membership/settings | 48,49 | fixture entitlement와 현재 상태/제한; 결제·메일·계정 삭제는 실제 서비스 미연결 | 33,41,42,44,47 |
| 전체 연결 | 50,51 | 공개 검색 5유형과 typed destination; A→B→A, source 교체/unmount/늦은 응답 통합 | 31,34,35,39,43,44,46,49 |

후행40/48의 인증·권한이 필요한 앞 단계는 기존 mock 신원과 명시적 entitlement fixture 입력을 사용한다. 순환 선행 관계를 만들거나 후행 Goal 구현을 앞당기지 않는다. [실행 계획](FE_MEDIUM_FULL_CLONE_GOALS.md)의 최소 선행은 그대로 유지한다.

[tokens]: ../FE/src/shared/theme/tokens.ts
[icons]: ../FE/src/shared/ui/AppIcon.tsx
[sheet]: ../FE/src/features/bookmarks/LibrarySheet.tsx
[navigation]: ../FE/src/app/navigation/AppNavigator.tsx
[feed]: ../FE/src/features/feed/HomeFeedScreen.tsx
[feed-tabs]: ../FE/src/features/feed/components/FeedSortTabs.tsx
[feed-card]: ../FE/src/features/feed/components/ReferenceArticleCard.tsx
[search]: ../FE/src/features/search/SearchScreen.tsx
[explore]: ../FE/src/features/search/ExploreSections.tsx
[article]: ../FE/src/features/article/ReferenceArticleView.tsx
[article-footer]: ../FE/src/features/article/ReferenceArticleFooter.tsx
[likes]: ../FE/src/features/likes/LikeProvider.tsx
[like-types]: ../FE/src/features/likes/types.ts
[bookmark]: ../FE/src/features/bookmarks/BookmarkProvider.tsx
[save-sheet]: ../FE/src/features/bookmarks/SaveToListSheet.tsx
[library]: ../FE/src/features/bookmarks/LibraryScreen.tsx
[library-card]: ../FE/src/features/bookmarks/LibraryListCard.tsx
[list-detail]: ../FE/src/features/bookmarks/ReadingListScreen.tsx
[list-actions]: ../FE/src/features/bookmarks/ListActions.tsx
[list-editor]: ../FE/src/features/bookmarks/ListEditorSheet.tsx
[list-story]: ../FE/src/features/bookmarks/ListStoryCard.tsx
[list-types]: ../FE/src/features/bookmarks/listTypes.ts
[auth]: ../FE/src/features/auth/createAuthStore.ts
[auth-dialogs]: ../FE/src/features/auth/AuthDialogs.tsx
[auth-types]: ../FE/src/features/auth/types.ts
[profile]: ../FE/src/features/profile/ProfileScreen.tsx
[profile-editor]: ../FE/src/features/profile/ProfileEditorSheet.tsx
[profile-types]: ../FE/src/features/profile/types.ts
[settings]: ../FE/src/features/settings/SettingsScreen.tsx
[reading-types]: ../FE/src/features/settings/types.ts
