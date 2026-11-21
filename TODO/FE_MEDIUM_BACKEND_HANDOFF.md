# FE 계약 인계 — Goal 53

2026-11-21. Goal53의 실제 TypeScript 공급부·저장소·navigation을 기준으로 작성했다. **현재 구현은 메모리 fixture/mock이며 HTTP API, 서버, DB, DDL, OAuth, 업로드, 결제 검증, Push/Email 발송은 구현하지 않았다.** 아래 조회/명령은 FE 경계 이름이다. URL·테이블·트랜잭션·인증 방식의 서버 설계 확정안이 아니다. 시각/native 잔여는 [Goal53 결과](FE_GOAL_53_RESULT.md), 개별 원본 동작의 확인 범위는 [대응표](FE_MEDIUM_FULL_CLONE_MAP.md)를 따른다.

## 공통 식별자와 수명

| 구분 | 현재 계약 | 후속 연결 시 지켜야 할 경계 |
| --- | --- | --- |
| 사용자 | `AuthUser.id`가 소유권 기준. 이름·소개·사진은 `ProfileProvider` 기준 표시값이다. | 표시 이름·사진·이메일 문구로 소유자를 판정하지 않는다. 서버에서는 요청의 주장된 userId만 믿지 말고 인증 주체와 대조해야 한다. |
| 인증 revision | 로그인·로그아웃/계정 전환의 세션 경계. 프로필 이름 변경은 revision을 바꾸지 않는다. | 같은 A 재로그인도 이전 화면·초안·오류와 구분한다. 서버 데이터 version과 다른 값이다. |
| 화면/request/source | 화면 조회에는 AbortSignal·요청 세대·source identity 경계를 사용한다. | 취소 요청 전달과 이미 확정된 서버 쓰기의 취소는 다르다. 늦은 응답이 현재 화면을 재개하지 않도록 해야 한다. |
| 명령 ID | feature별 `commandId:number`, `operationId:string`, `requestId:string`. 재시도는 같은 의미의 ID를 재사용한다. | 모든 도메인에 동일한 ID 형식을 이미 적용했다고 가정하지 않는다. 같은 ID+다른 payload는 충돌로 취급할 수 있는 서버 계약이 필요하다. |
| 기사 | fixture `articleId`, 작성 발행 `PublishedStory.id`는 다른 namespace. navigation도 `article`/`written`을 구분한다. | 제목이나 URL slug로 합치지 않는다. 작성 발행 글의 반응/저장 bar는 기존 fixture 기사와 아직 동일 기능이 아니다. |
| 사용자 목록 | `(userId,listId)`, 기본 `reading-list`. 공개 투영 ID는 `owned:${JSON.stringify([userId,listId])}`. | 이 문자열은 FE mock 식별 방식이며 DB PK 형식 확정이 아니다. 기본 목록은 항상 소유자 전용 비공개다. |
| 관계 | `{kind:'writer'\|'publication'\|'topic',id}`. 종류가 다르면 같은 id 문자열도 다른 대상이다. | Follow·Email·Mute·Block을 하나의 boolean으로 축약하지 않는다. |
| 인용 | `(articleId,version,start,end,text)`; 끝 offset 제외, 현재 JS 문자열 단위. | 본문 version과 원문 부분 문자열을 검증해야 한다. grapheme/UTF-8 byte offset으로 몰래 바꾸면 기존 인용이 깨진다. |
| 파일 | 문서에는 `assetId`/크기/설명/credit/offset을 보관하며 resolver가 URI를 해석한다. | 현재 blob/file URI를 서버에서 사용 가능한 공개 URL로 간주하지 않는다. 업로드/보존 정책은 미설계다. |
| 재시작 | 동일 실행 A→B→A는 계정별 확정 데이터를 유지한다. 전체 새로고침/앱 재실행은 mock 메모리를 초기화한다. | 영속 세션·DB 복구가 구현됐다고 표현하지 않는다. OS 권한/launcher 아이콘은 설치 단위여서 별도 수명이다. |

공개 화면 조회와 개인 명령을 구분한다. 비로그인 개인 행동은 로그인 안내를 열며, 닫기/취소/실패는 원래 화면을 유지한다. 로그인 성공이 최초 개인 행동의 자동 실행을 뜻하지 않는다. 계정 경계에서 공급부의 확정 A 데이터를 삭제하는 것과 화면의 A 초안·오류를 제거하는 것은 별도다.

## 화면별 조회와 명령

각 행의 타입 링크가 현재 세부 필드와 검증기의 기준이다. 표의 후속 고려사항은 구현된 서버 기능이 아니다.

| 화면/도메인 | 조회 입력 → 출력 | 변경 입력 → 결과/소유권·주의 | 코드 기준 |
| --- | --- | --- | --- |
| 홈 | `{sort,cursor}` → `{items,nextCursor}`; null cursor는 첫 페이지/끝 표시에서 각 위치의 의미가 다름 | `latest/popular/recommended`는 현재 For you/Following/Featured 라벨과 대응. 실제 개인 추천 알고리즘 아님. | [feed/types](../FE/src/features/feed/types.ts), `feed/data/mockFeedSource.ts` |
| 검색/탐색 | 기사 검색 `query` → SearchResult; 나머지 People/Publication/Topic/List는 공유 directory/catalog 및 작성 발행 자료를 결합 | query/type/로컬 페이지·뒤로 복귀 상태는 화면 소유. 다섯 유형이 하나의 서버 검색 API로 구현된 것은 아님. 현재 로컬8행 페이지 정책은 자체 보완. | [search/types](../FE/src/features/search/types.ts), `search/SearchScreen.tsx`, `search/ExploreSections.tsx` |
| 기사 상세/설명 | article ID → 원문; explanation level → 해당 설명 | 기사 안의 수준은 route 수명, 새 진입 기본값은 사용자 설정. 늦은 설정 조회가 수동 수준을 덮지 않음. 실제 AI 호출 없음. | [article/types](../FE/src/features/article/types.ts), [설명 타입](../FE/src/features/article/explanationTypes.ts) |
| 프로필 | `readProfile(userId)` → Profile | `saveProfile({userId,commandId,fields})` → 확정 Profile. 이름50/소개160/대명사최대4. 사진·대명사 하위 Done은 부모 초안만 바꿈. | [profile/types](../FE/src/features/profile/types.ts), `createProfileStore.ts`, `profileValidation.ts` |
| 작성자/관계 | directory → identities; `read(userId)` → version/relationships | `set(userId,command)` → 관계 snapshot. Follow와 작가별 Email은 별도. Follow의 자체 기본 Email off를 Medium 원본 기본값으로 일반화하지 않음. | [community/types](../FE/src/features/community/types.ts), `createRelationshipStore.ts` |
| 추천/뮤트 | 계정별 recommendation 및 moderation snapshot | 관심사·Show less·Mute/Unmute·Block/Unblock. 차단 시 현재 앱은 글/목록 노출을 숨김. 원본 일시 화면과 다른 명시 정책. | [recommendations/types](../FE/src/features/recommendations/types.ts), [moderation/types](../FE/src/features/moderation/types.ts) |
| 신고 | 대상 `{kind,id,writerId}` 및 이유/선택 설명 | Report 성공은 mock 접수. 외부 신고 없음. Also block 결과·실패와 별개 재시도 상태를 검증. | `moderation/createModerationStore.ts`, `moderation/data/createMockModerationSource.ts` |
| 박수 | `{userId,target:{kind,id}}` → 내 수/전체 수 | 저장은 내 최종 목표 기여값, 최대50. Undo는 내 기여 제거. 실제 조회/읽음 통계와 무관. | [reactions/types](../FE/src/features/reactions/types.ts), `createClapStore.ts` |
| 응답/답글 | `{userId\|null,target:{kind:'article'\|'list',id}}` → version/responses/discussion/owner | create/edit/delete/react/hide/discussion 명령+operationId. parentId null=루트. 작성자/토론 소유자 권한을 구분. 삭제 부모에 살아있는 답글이 있을 수 있음. | [responses/types](../FE/src/features/responses/types.ts), `responseRows.ts`, `createResponseStore.ts` |
| 읽기 기록 | userId → `{userId,visits:[{articleId,visitedAt}]}` | 최종 방문 목록+commandId 저장. Viewed와 제목 색/삭제·Clear에 연결되며 서버 Views/Reads로 간주하지 않음. | [reading-history/types](../FE/src/features/reading-history/types.ts) |
| 하이라이트 | userId → version/highlights | set(userId,{operationId,highlight,selected}); 원문 version/범위 검증. quote 응답과 같은 범위 기준 사용. | [highlights/types](../FE/src/features/highlights/types.ts) |
| 개인 목록/저장 | `fetchLists(userId)` → userId/lists | `setList(ListWrite)` → userId/listId/content. content null=삭제, expectedContent=낙관적 충돌 기준. 이름60/설명280, articleIds 순서 유지. | [bookmarks/listTypes](../FE/src/features/bookmarks/listTypes.ts), `createUserListStore.ts` |
| 공개 목록/목록 저장 | `read(userId\|null)` → version/lists/savedIds | save({userId,ownerId,listId,saved,commandId}); 타인 공개 목록 전체 저장과 개인 기사 저장을 구분. private/delete 즉시 접근권 및 savedIds 갱신. | [public-lists/types](../FE/src/features/public-lists/types.ts), `data/createMockPublicListSource.ts` |
| 내 목록 반응 | owner/listId → owned 공개 투영 target | Goal53 기본 목록도 강제 private 투영으로 공통 반응을 읽음. guest/B 조회 불가, 외부 공유 불가. 명칭이 PublicListSource여도 모든 반환 대상이 공개라는 뜻은 아님. | [ownedPublicList](../FE/src/features/public-lists/ownedPublicList.ts), `bookmarks/ReadingListScreen.tsx` |
| Digest | 발행 issue 목록/선택 issue의 기사 | 날짜 선택은 Done 전 초안. 최근10개 **발행분**이며 비어 있는 달력일을 자동 생성하지 않음. 빈도 설정 변경이 과거 발행 데이터를 삭제하지 않음. | [digest/types](../FE/src/features/digest/types.ts), `createDigestStore.ts` |
| 작성 초안 | list(userId), read(userId,draftId,signal) → Draft[]/Draft|null | save({draftId,userId,document,publishing?,operationId},signal). 자동 저장/실패 초안 보존; back은 필요한 flush를 기다림. | [editor/draftSource](../FE/src/features/editor/draftSource.ts), `createDraftSession.ts` |
| 발행 | stories(userId,signal,visibility?,viewerId?), story(storyId), publicStories? | publish({draftId,userId,document,publishing,authorName,operationId}) → PublishedStory. 불명확 성공은 같은 명령으로 확인. draft와 발행 결과의 ID·소유권을 연결. | [editor/publishing](../FE/src/features/editor/publishing.ts), `WrittenStoriesProvider.tsx` |
| 내 Stories/Public/Unlisted | 확정 발행 저장소의 같은 결과 | public은 공개 탐색/프로필, unlisted는 링크 접근 정책과 개인 목록을 구분. 비공개 개인 초안은 publicStories에 포함하지 않음. | `editor/draftSource.ts`, `profile/ProfileStories.tsx`, `editor/WrittenStoryScreen.tsx` |
| Story stats | readMonthly(userId,YYYY-MM,signal), readLifetime(userId,sort,signal) | 쓰기/이벤트 수집 없음. canonical 발행 목록과 연결한 mock 조회. 새 글 초기0/0. 기간·정렬 선택은 화면 상태. | [story-stats/types](../FE/src/features/story-stats/types.ts), `createMockStoryStatsSource.ts` |
| 알림 목록 | readInbox(userId,signal) → version/notifications | markRead(userId,notificationId,operationId,signal) → inbox. eventId/recipientId 중복방지, 행 목적지와 접근권 재확인. 기존 알림을 수신선호 변경으로 삭제하지 않음. | [notifications/types](../FE/src/features/notifications/types.ts), `createNotificationStore.ts` |
| 수신 설정 | readPreferences(userId,signal) → version/preferences | savePreference(userId,{key,value},operationId,signal). 항목별 최종 의도, 다른 항목 실패 전체롤백 금지. Email/Digest 여러 진입에서 공유. | `notifications/types.ts`, `createMockNotificationSource.ts` |
| 표시/읽기 설정 | 계정/guest owner → 설정 snapshot | appTheme/readerTheme/fontScale80~200(20씩 증감)/fontFamily/showHighlights; 기본 설명 수준은 별도 저장소. profile revision을 바꾸지 않음. | [displayTypes](../FE/src/features/settings/displayTypes.ts), [settings/types](../FE/src/features/settings/types.ts) |
| 인증/Email | signIn(userId,scenario,provider); begin/request/verify 이메일 흐름 | 성공 user 또는 cancelled. Email challenge/attempt/만료·재전송 세대. fixture 주소만 허용, 실제 코드/토큰 반환 모델 아님. | [auth/types](../FE/src/features/auth/types.ts), [emailAuthSource](../FE/src/features/auth/emailAuthSource.ts) |
| 온보딩 | read(userId,signal) → version/step/notificationChoice | save(userId,{operationId,expectedVersion,step,notificationChoice?},signal). 최소3관심사/재개/닫기, 실제OS권한과 선택이력 별도. | [onboardingSource](../FE/src/features/onboarding/onboardingSource.ts) |
| 멤버십 | 설치된 mock source snapshot의 계정별 확정 record | purchase(request,signal,isCurrent) → record. tier free/member/friend, monthly/annually. requestId로 중복 방지. 영수증·실제 결제 없음. | [membership/types](../FE/src/features/membership/types.ts) |
| 계정/외부 링크 | 계정 mock 연결 상태, 허용된 목적지 | Facebook연결은mock; Help/Terms/Privacy/Rate는 플랫폼외부이동 경계. 복귀/거절/미지원 상태 구분. | `settings/accountConnectionSource.ts`, `settings/SettingsServicesProvider.tsx`와 해당 플랫폼 어댑터 |

### null·생략·순서

- Profile `photo` 생략 또는 null은 사진 없음, `pronouns` 생략은 빈 배열로 읽는 이전 공급부 호환 정책이다. ProfileFields에는 partial PATCH 의미가 없다. 서버 PATCH를 도입하면 누락/삭제를 다시 정의해야 한다.
- UserList `description`, `notes`, `isPrivate`는 선택 필드다. 기본 목록은 legacy 값과 무관하게 private로 투영한다. `content:null` 삭제와 빈 articleIds의 살아있는 목록을 구분한다.
- PublicListSource의 `canAccess`/`subscribe`, DraftSource의 `publicStories`/`getImageAssetIds`, EditorImageSource의 `pick`/`retainDocuments`는 optional capability다. 생략을 원격 기능 성공으로 해석하지 않는다.
- Feed nextCursor null=더 조회할 페이지 없음. 다른 공급부는 전체 snapshot/로컬 분할이므로 모든 기능에 cursor API가 이미 있다고 쓰지 않는다.
- 응답은 부모/자식 트리, relevance/recent 선택과 안정 ID 동률 순서를 사용한다. 답글은 새 날짜 우선이다. 원본의834개를 표시하기 위해 실제7개 응답을 부풀리지 않는다.
- 개인 목록 articleIds 순서가 사용자 재정렬 기준이다. 일부 기사 제거/삭제는 원본 기사·다른 소속·박수를 삭제하지 않는다. 목록 삭제 tombstone을 늦은 update/add 성공으로 되살리지 않는다.
- stats 정렬은 latest/views/reads와 발행시각/ID 동률 처리를 사용한다. 수치는 유효 비음수이며 `StatsDay` null은 아직 집계되지 않은 날짜,0은 실제0이다.

## 시간·집계·이벤트

`StatsPeriod`는 UTC 시작 포함/`endExclusive` 제외, `asOf`는 집계 기준 시각이다. 날짜 key는 `YYYY-MM-DD`, 월은 `YYYY-MM`; 기기 로컬 timezone으로 날짜를 이동시키지 않는다. 현재 월의 기간과 월말/윤년을 구분한다. Lifetime의 firstPublishedAt null은 발행 없음이다. 현재 mock은 서버 일배치나 실제 사용자 관측값이 아니다.

Goal53 정상 F63은 현재 시각과 실제 mock 발행의0/0을 사용한다. 별도 `stats-reference.cjs`는 화면 비교에만 June2025 월간11/2·June13미집계·글별Lifetime0/0을 주입한다. 이 불일치를 캐시/정상 집계 공식으로 설명하지 않는다. 해당 주입은 한 브라우저 context에서 복원·종료되며 제품 기본값을 바꾸지 않는다.

알림의 `occurredAt`과 읽기기록의 `visitedAt`, 발행의 `publishedAt`은 유효 날짜 문자열이다. 상대 문구는 표시 계층이다. Notification eventId와 notificationId를 분리하고 수신자별 중복 생성/재시도 재생성을 막는다. 화면 재진입/계정 복귀 자체는 새 이벤트가 아니다. 현재 모든 앱 행동이 알림을 생성하지 않으며 실제 Push/Email은 전송하지 않는다.

## 파일·OS·음성·공유 경계

| 경계 | 현재 구현 | 수명/실패/후속 사항 |
| --- | --- | --- |
| 사진 picker | 웹 file input, native Expo ImagePicker/ImageManipulator/FileSystem 어댑터 | null 선택취소와 permission/unsupported/prepare 실패 구분. 부모 Save 전 photo는 초안. actual native 실행 미검증. |
| 이미지 lease | ImageLease `{asset,release}` 및 source resolve/retainDocuments | 선택취소·교체·화면이탈 시 임시자원 release; 확정 초안/발행 참조는 별도 retain. 늦은A가B선택을 덮지 않음. 서버Storage 업로드 없음. |
| 다운로드 | DownloadSource getLists/getVersion/isOnline/load → 내용·version; 메모리 캐시 | 목록 snapshot/기사version으로 outdated 구분. 취소·부분실패·삭제·권한·혜택검증. 앱 재실행 후 영속 offline 지원 아님. |
| Listen | `ListeningRecording.mode:'silent-mock'`; 상태 idle/loading/error/playing/paused/ended | 시간·속도·voice선택은mock. 실제 음성파일·엔진·background audio·AirPlay 미연결. API를 만들었다고 표현하지 않음. |
| 공유 | ShareAdapter copy/share/capture/saveImage/openSettings | share의 returned는 OS sheet 복귀이며 외부 전달 증명 아님. saveImage library와 download 구분. 캡처 이미지 release필요. |
| 공유 대상 | article/written/writer/publication/topic/list/quote + typed ID | private/삭제/차단/범위변경 즉시 재검증. quote범위/본문version검증. 미리보기링크의 invalid host는 외부서비스URL이 아님. |
| 알림 권한 | read/refresh/request의 설치 단위 상태 | 계정 선호/온보딩 enabled와 별개. 자동재요청 없음. APNs/FCM/Expo기기토큰등록·업로드 없음. 웹 adapter는 unsupported. |
| 앱 아이콘 | AppIconAdapter read/apply → supported/applied | native plugin/Swift/Kotlin·8개자체K자산. 설치단위상태와 계정Friend자격을 구분; 실제launcher실행 대기. |

## 오류·재시도·경합 인계

현재 예외는 도메인별 discriminated result와 Error가 섞여 있다. 전역 HTTP 오류 envelope가 구현된 것은 아니다. 다음을 후속 서버 계약의 확인 목록으로 인계한다.

1. 잘못된 요청/존재하지 않음/접근권 소멸/충돌/일시적 실패/취소/확정 여부 불명확을 구분한다. UI의 retry 가능 여부와 입력 보존 여부가 달라진다.
2. ListConflictError.current는 최신 목록을 포함하고 expectedContent와 다른 편집을 덮지 않는다. UnavailableListError는 삭제된 목록의 부활을 막는다.
3. PublishError.uncertain은 실패 전 미적용과 다르다. 동일 operationId로 이미 확정한 결과를 확인할 수 있어야 중복 발행을 막는다.
4. 사용자·대상·기간·정렬·version이 맞지 않는 응답은 현재 조회의 결과로 채택하지 않는다. 오래된 read가 최신 write를 덮지 않도록 요청세대/응답version을 적용한다.
5. 같은 항목의 연속의도는 최신값을 보존하고 필요한 쓰기를 직렬 처리한다. 서로 다른 preference나 목록의 오류까지 통째로 롤백하지 않는다.
6. A 쓰기 후 logout→B→A에서 이미 확정된 A 데이터는 현재 계약대로 남을 수 있지만 A의 pending초안/시트/오류를 B나 새 A 화면에 노출하지 않는다.
7. 서버로 바꿀 때 클라이언트 AbortSignal만으로 쓰기 미확정을 보장할 수 없다. receipt/idempotency와 재조회 정책을 도메인별로 설계해야 한다.
8. 날짜·본문·이미지·이름·정렬을 화면마다 중복 기준상태로 만들지 않는다. 프로필은 userId별 기준 상태, 관계는 typed target별 기준 상태, Stats/Stories는 같은 발행 저장소를 사용한다.

## API/DB 설계에 넘기는 관계와 미결정 사항

다음은 **논리 개체 관계**이며 테이블/DDL 제안 파일이 아니다.

- 사용자→프로필1개, 사용자→수신/표시/읽기 설정·온보딩 각1개, 사용자→관계/목록/초안/발행/방문/하이라이트 다수.
- 목록→기사 ID의 순서 있는 소속 및 메모, 사용자→타인 공개 목록 저장 관계. 기본 목록과 일반 목록의 관리 권한이 다르다.
- 발행→원초안 ID/소유자/문서/토픽 최대5/publication 또는 null/unlisted/발행 시각. publication 작성 권한은 현재 mock 두 곳만 허용한다.
- 반응→typed target와 user, 응답→target/parent/author, 인용→기사 version/범위. 숨김/삭제/토론 종료를 물리 삭제로 일괄 표현하지 않는다.
- 알림→recipient/actor/event/typedtarget, 통계→user/기간/day/story 및 집계 시각. 알림 읽음·Views·Reads·박수는 서로 다른 개념이다.
- 파일 참조/소유권·영속 보관·cleanup/외부 발송 outbox/구독 영수증·지표 수집의 정의는 후속 설계다. 현재 mock 확정으로 서버 권한을 충족했다고 볼 수 없다.

남은 결정: 실제 인증 공급자/세션 저장, 분산 idempotency 키 범위, 부분 PATCH 및 오류 형식, 영속 저장/삭제/복구 기간, 서버 검색/페이지 전략, 작성 발행 글과 fixture 기사 도메인의 통합, 실제 분석 정의/갱신주기, 멤버십 영수증 검증, 음성/파일 제공 권리와 전송 정책. 원본에 미수록인 메뉴·정렬·필터의 자체 보완은 공식 Medium API 요구사항이 아니다.

검증 근거는 [Goal53 결과](FE_GOAL_53_RESULT.md)의 현재 검사·200화면판정 및 Goal44~52 결과 문서다. native 미검증과 시각 차이가 남아 전체 동일 재현/실서비스 출시 완료로 인계하지 않는다.
