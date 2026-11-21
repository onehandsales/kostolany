# Goal 50 — 검색 추가 결과·홈/탭/진입 경로 마감

2026-11-21 KST · macOS14.2 arm64 · Node24.18.0. 시작 HEAD `670ec9d2214f48b55188ccbc0ef311accbb959b4`(Goal49), 시작 작업 트리 clean. **기능 구현·두 차례 자체 검토 / 현재 자동 검사 통과 / 원본 미수록·시각 차이·실제 native 검증 잔여.** Goal44→53 연속 요청에 따라 로컬 커밋 후51로 진행한다. 전체 클론 완료나 외부 검색 서비스 연동을 뜻하지 않는다.

## 구현과 계약

| 경로 | 실제 연결과 검증 |
| --- | --- |
| Stories | 기존 기사 source와 같은 DraftSource의 공개 발행 글을 검색한다. 작성→발행→검색→작성 상세→뒤로, 프로필 이름 변경 후 작성자 검색을 확인했다. |
| People / Publications | DirectoryProvider의 기존 ID와 확정 ProfileStore 표시값을 사용한다. A/B 예시 계정의 공개 프로필도 검색한다. 자기 Follow를 숨기며 source에서도 자기 관계 변경을 거부한다. |
| Topics | 기존 TopicProvider 결과에서 정확한 ID로 이동한다. 같은 Music 이름은 접근성 label에 팔로워 설명을 덧붙여 구분한다. |
| Lists | 기존 PublicListStore의 공개 목록만 검색한다. 소유자에게 보이는 private 목록도 공개 검색/공개 프로필 Lists에서 제외한다. 비공개 전환·삭제 후 결과가 갱신된다. |
| 공개 프로필 | 검색에서 연 작성자/publication의 Stories에 같은 발행 저장소의 공개 글을 합친다. 기존 pinned가 먼저, 새 공개 발행 글, 나머지 원본 fixture 순이다. 조회 실패를 빈 목록으로 숨기지 않고 Retry를 제공한다. |
| 홈 | For you의 −와 Featured 북마크를 구분했다. 선택된 Featured에는 New를 표시하지 않는다. Following의 일부 조회 실패는 이미 확인된 기사와 함께 갱신 오류·재시도를 보인다. +·추천 −/Undo·Follow→Following 연결을 확인했다. |
| Explore | Trending·토픽·Staff Picks·Recommended·Who to follow·See all과 기존 대상/뒤로를 확인했다. 검색 결과 네 유형에 남아 있던 안내 전용 동작을 제거했다. |
| 공개 링크 | `kostolany://{kind}/{id}`와 `https://kostolany.invalid/{kind}/{id}`를 기존 article/written/writer/publication/topic/list route에 연결한다. 지원 tab은 Home/Explore/Library/Profile이다. 알 수 없는 종류는 돌아가기 가능한 오류 화면이다. |

- 검색 입력/유형은 SearchScreen, 조회 응답은 query/source/attempt/active에 묶인 hook, 추가 표시 수와 스크롤은 해당 결과 컴포넌트가 소유한다. 상세 진입·복귀는 같은 인스턴스를 유지한다. 검색 닫기는 입력/유형을 초기화하고, query 또는 유형 변경은 표시 페이지를 초기화한다. 계정/source 세대 변경은 개인 결과 하위 UI 수명을 분리한다.
- 검색은 NFC·trim·공백 정리·대소문자 정규화 후 모든 단어 포함으로 판정한다. 기존 catalogue 순서와 최초 ID를 유지한다. 250ms debounce, 8행씩 로컬 Show more를 제공한다. **서버 검색 순위·서버 cursor 정책이 아니다.** 공개 발행 글은 발행 시각 내림차순/ID 동률 순서로 fixture 기사보다 앞에 합친다.
- DraftSource `publicStories(signal)`는 확정된 public 발행 글만 반환한다. Unlisted/초안은 제외하며 작성자/publication ID·원래 제목/본문을 유지한다. revision 변경 후 새 조회를 이전 응답이 덮지 못하고 blur/이탈/교체 시 abort한다. 누락된 optional publicStories는 이전 source의 미지원 계약으로 빈 추가 목록을 사용한다.
- ProfileProvider의 `useKnownProfiles`는 이미 생성된 확정 프로필 store의 공개 표시 필드만 구독한다. 이름·사진을 식별자로 쓰지 않고 초안·인증·개인 설정을 복제하지 않는다. 이름 변경으로 auth revision이나 발행/관계/목록 저장소를 초기화하지 않는다.
- 목록 공개 범위 source는 owner 응답에도 현재 isPrivate를 정확히 표시한다. 화면 필터만으로 권한을 대신하지 않으며 대상 상세는 기존 조회/접근 검사를 유지한다. Unlisted 글은 공개 검색에 없지만 기존 명시적 링크 접근 계약을 유지한다.
- 발행 글 공유는 `written` 타입과 `/written/{id}`를 사용한다. 이전 `/article/{writtenId}`가 일반 fixture 기사 화면을 열던 연결 결함을 수정했다. 기존 공유 시트·이미지·취소 기능을 재사용한다. 친구 링크 query는 권한을 부여하지 않고 인용 fragment는 선택을 자동 복구하지 않는다.
- 링크의 ID는 현재 canonical ID 계약(빈 값/제어 문자/공백/슬래시 금지)을 검사한다. URL의 userId·token·권한을 신뢰하지 않는다. 초기 URL보다 늦게 수신한 새 이벤트를 우선하고 source 교체/해제 후 이전 응답을 버린다. 웹의 `?previewLink=<인코딩한 URL>`는 자체 미리보기 진입 규칙이다.
- 웹의 검색 대상·추천·Write 복귀 포커스는 기존 Settings hook을 shared로 이동해 재사용했다. native 기본 구현은 OS navigation에 맡기며 실제 화면 읽기 도구/키보드 복귀 검증은 대기다. 검색 source는 비활성 debounce/늦은 응답을 폐기하되 이미 얻은 결과는 복귀 시 재요청하지 않는다.
- 인증·개인 확정 데이터의 기존 메모리 수명을 유지한다. A/B의 공개 프로필/공개 글 검색 가능성과 개인 데이터 접근을 구분한다. 새로고침은 mock 발행 글을 초기화하므로 복사한 해당 글 주소도 다음 실행에서는 존재하지 않을 수 있다.

## 1차 자체 검토와 수정

독립 검토자는 사용하지 않았다. 첫 검토는 구현 후보·실제 AppNavigator 검사·홈/검색 원본·브라우저를 대조했다. 검토 기록은 외부 증거의 `review-1.md`다.

| 재현 / 기대와 실제 차이 | 원인과 수정 | 검증 |
| --- | --- | --- |
| People 등 네 탭 선택 → 안내만 나옴 | 기존 catalogue/provider 결과와 실제 목적지 연결 | 다섯 유형 실제 navigation·8081 |
| Featured → −가 보임, 선택 후 New가 남음 | 공통 home variant 분기 부족; 북마크/선택 상태 분리 | 원본02 overlay·탭 회귀 |
| private로 바꾼 내 목록 → 공개 검색 잔존 | source snapshot이 현재 isPrivate를 누락; 반영/공개 필터 | 공개/비공개/삭제 navigation |
| 발행한 글·변경한 작성자 이름 → 검색 누락 | fixture만 검색; 확정 발행/프로필 구독 추가 | 작성→발행→검색 및 이름 변경 |
| Following에 기사 존재 + 토픽 조회 실패 → 오류 없음 | ListEmpty만 오류 표시; 유지된 기사와 오류 헤더 분리 | 실패 후 동일 기사·재시도 |
| 두 Music 버튼 → 같은 접근성 이름 | 중복 표시명에 현재 설명 추가 | Topics 실제 진입/복귀 |

## 2차 자체 재검토와 추가 수정

수정 후 코드의 ID/소유권·비공개 필터·source/활성 경합·현재 테스트와 비교 캡처를 다시 읽었다. 첫 기록을 복제한 검토가 아니다. 자동 검사 실행은 아래 별도 기록이다.

- People→A/B 공개 프로필에서 방금 발행한 글이 보이지 않는 연결을 발견했다. 검색 전용 읽기 hook/행을 editor의 `usePublicStories`/`PublishedStoryRow`로 옮겨 실제 공유 필요 경계에 두고, 작성자/publication의 ID로 필터링했다. 조회 실패/Retry·상세/뒤로·현재 프로필 이름·자기 Follow 없음과 기존 pinned 순서를 재검사했다. 공개 프로필의 Lists도 private를 제외한다.
- 작성 글의 Share→Copy link가 `/article/written-*`를 만들어 올바른 저장소에 도달하지 못했다. 공유 타입에 written을 명시하고 기존 미리보기 parser와 연결했다. 실제 공유 버튼→복사 주소→navigation 이벤트→같은 본문→뒤로를 회귀 검사했다.
- 검색의 See all/Write 등 추가 진입도 포커스 복귀 hook을 사용하도록 정리했다. 공유 hook 이동 후 기존 Settings 회귀도 통과했다.
- `useKnownProfiles`의 mutable snapshot cache를 useMemo 내부 생성 함수에 두었을 때 lint가 실패해 별도 factory로 이동했다. 자체 store의 안정된 snapshot 참조와 구독 해제 계약은 유지한다.
- 검사 코드의 잘못된 작성자 이름·native bookmark role·가상 목록 렌더 대기·존재하지 않는 mock import는 수정 후 재실행했다. 이 실패들을 제품 결함 수로 계산하지 않는다. 초기 실패 로그도 보존했다.
- 남아 있는 원본 데이터/글꼴/아이콘 차이와 미수록 결과 정책을 완료로 계산하지 않았다. 자체 기능 계약의 알려진 연결 결함은 이 단계에서 수정했다.

## 실제 실행 결과

FE/.nvmrc·package.json 확인 후 Node `24.18.0`의 PATH로 FE 디렉터리에서 실행했다. Jest iOS/Android 두 설정은 native OS 실행이 아니다.

| 검사 | 결과와 증거 |
| --- | --- |
| `npm run typecheck`, `npm run lint` | 수정 후 통과. `typecheck-final.log`, `lint-final.log`. |
| `npm test -- --runInBand` | **252 suites / 1,388 tests 통과, 392.221초**(`full-tests.log`). 공개 프로필/공유 링크 마지막 보완 전의 전체 검사 시점이다. |
| 공개 프로필·목록·발행·Settings 영향 검사 | `--testPathPattern='SearchCategoriesNavigation\|CommunityNavigation\|PublishingNavigation\|usePublicStories\|PublicListsNavigation\|SettingsExtrasNavigation\|FollowingFeed\|ProfileNavigation'`: **14 suites / 60 tests, 30.596초**, `review2-final.log`. |
| 마지막 공유/프로필 영향 검사 | **14 suites / 52 tests, 15.735초**, `sharing-regression.log`. 전체 검사 이후 변경을 별도 검증했으며 전체 검사가 마지막 수정까지 포함했다고 표현하지 않는다. |
| 8081 Chrome | `browser.cjs`:5묶음, `faults.cjs`:4묶음, `connections.cjs`:4묶음. 오류 수집 모두0. 마지막 공개 프로필/publication·복사 주소 보완은 `verified-connections.cjs`로 재검사했다. 중복 재검사를 새로운 고유 흐름으로 더하지 않는다. |
| 웹/iOS/Android export | `node node_modules/expo/bin/cli export --platform all --max-workers 2 --output-dir <외부>/export-verified` 통과. JS/Hermes 번들이며 실제 native 실행이 아니다. |
| native 구성 생성 | 저장소 밖 native-audit에서 prebuild 성공. iOS URL scheme과 Android MainActivity VIEW/BROWSABLE의 `kostolany` 등록 확인. Android `<queries>`의 https는 app link 등록이 아니다. `native-links.json`. |

추가/수정 검사는 `SearchCategoriesNavigation`, `previewLinks`, `catalogSearch`, `useSearch`, `usePublicStories`, publishing, 공유 types다. navigation은 실제 AppNavigator와 native-stack을 사용하며 source/OS adapter만 교체했다. 기존 Settings·Community·Publishing·Profile·공개 목록·공유 회귀를 포함했다. 서버/API/분석 수집을 추가하지 않았다.

## Medium 근거와 실제 비교

medium README, F01 Explore/F02 Searching Medium/F05 Home의 ANALYSIS와 실제 PNG를 읽었다. 아래 **5개 고유 원본과 5개 현재 캡처**를 393×759 웹/Light/기본 글자 조건으로 비교했다. 원본1179×2556을3분의1로 줄이고 iOS 상단59/하단34 영역을 제외했다. OS 상태바/홈 표시를 웹 UI에 덧그리지 않았다. `pairs.json`·`compare-01..05.png`는 원본/실제/50% overlay다.

| 원본 screen ID | 현재 캡처 | 확인과 남은 차이 |
| --- | --- | --- |
| sc_5e0ba0e498ff49579bf838096aec4b5e | home.png | 홈 For you·−·구성 대조. 서체 줄바꿈·벡터 아이콘·프로필/알림 fixture 차이. |
| sc_4ec0a8b65f954b0984ece5b3b9f258e4 | featured.png | 북마크·선택 Featured의 New 제거. 토픽 순서/계정 맥락·두 번째 제목 줄바꿈·잘린 세 번째 Timing 글 미수록 잔여. |
| sc_1c3e4349171248378eada528f7942269 | explore.png | 탐색 검색 진입/Trending/칩 대조. byline 글꼴/줄바꿈 차이. |
| sc_047c91d900aa47448d61e4faacd68ad5 | search-empty.png | 빈 입력/목록/취소. 48px 논리 터치 행·웹 포커스 테두리·추가 한국어 fixture는 자체 보완. |
| sc_8dc9eeb5f9d244ca9fa6fb7a973de82f | stories.png | 다섯 탭·Stories 카드/선택 밑줄·검색 문구. 탭 문구 세로 위치 수정, 서체·아이콘·본문 기준선 차이. |

현재 응답 수는 같은 ResponseStore의 실제 mock 수(대상에 따라0)다. 원본 홈/검색의1.3K·529·29·32 등을 카드 숫자만 맞추려고 별도 상태로 덧씌우지 않았다. 원본 비교용 숫자/응답 fixture와 기능 데이터의 차이는 남아 있다. 원본 글꼴·아이콘 자산을 확보하지 못했으며 일치율을 산출하지 않았다.

추가로 원본 sc_4352273aa0654f939705613dfa224e75(Staff Picks), sc_6bc604f45031400d9cebd252cd89e7a2/sc_dfdd5f6377a848c59b3512417cb47490(Who to follow와 가로 이동)를 직접 보았다. 실제 staff-picks/who-to-follow 캡처는 기능 연결 근거이며 동일 스크롤 조건의 overlay5쌍에 추가 계산하지 않았다. F01/F02/F05의13단계 전체 픽셀 검증이나 전체200장 대조 완료를 주장하지 않는다.

- **관찰:** 다섯 검색 탭·Stories 결과·For you의 −와 Featured 북마크·Explore 추천 섹션.
- **공식 설명:** [홈/검색](https://help.medium.com/hc/en-us/articles/115012586467-Your-homepage), [목록](https://help.medium.com/hc/en-us/articles/214993247-Create-and-manage-lists), [발행](https://help.medium.com/hc/en-us/articles/360018677974-What-happens-to-your-story-when-you-publish-on-Medium), [추천 조정](https://help.medium.com/hc/en-us/articles/224488047-Refine-recommendations)을2026-11-21 확인했다. 현재 설명은 과거 보관본의 검색 순위/기본값/픽셀 근거가 아니다.
- **추가 조회:** Gummble medium-ios 관련 검색은 exact0/related6이었다. 새로 확인한 sc_ddd503426d044b0c8b30948d72a5e263·sc_57f2ae59009b42388697183d5c90da4a는 녹색 아이콘의 구버전 Reading list이며 검색 네 유형 결과 근거가 아니다. 현재200장 목록에 섞지 않았다.
- **미수록/자체 보완:** People/Publications/Topics/Lists의 결과 레이아웃·정렬·빈 상태·오류·로컬8행·딥링크 주소와 invalid 화면. 추가 원본 확보 전까지 원본 동작으로 확정하지 않는다.

## 플랫폼·증거·남은 항목

증거 루트: `/var/folders/jg/zn9h2_f91nxfpwz9hzpkqcv80000gn/T/kostolany-goal50-gsu2txtq`. baseline/platform/native-links/pairs JSON, 원본 대비 PNG, 브라우저 scripts/results, 자동 검사 로그·두 검토 기록을 저장소 밖에 보관했다. 이 macOS 임시 경로는 OS 정리 후 사라질 수 있으며 다른 기기에서 보존을 보장하지 않는다. 재현은 아래 UI 순서와 해당 명령을 따른다. 저장소 내부 evidence/임시 검증 스크립트는 추가하지 않았다.

- 320px·Dark·긴 한국어·CSS160%·Tab 포커스·가로 넘침 없음은 웹에서 확인했다. 합성 fill/웹 Tab은 실제 한글 IME·OS 키보드·Dynamic Type·VoiceOver/TalkBack 검증이 아니다.
- 현재 xcodebuild는 Xcode 부재로 exit1, simctl 부재 exit72, 활성 개발 경로는 CommandLineTools다. Android SDK/adb/emulator도 없다. 실제 iOS/Android 빌드·설치·scheme 열기·native 뒤로 포커스·기기 입력은 미검증이다. Xcode/시뮬레이터 또는 실제 iPhone, Android SDK/JDK/에뮬레이터 또는 기기에서 외부 링크→대상→뒤로·계정 변경을 실행해야 한다.
- app.json scheme 구현과 prebuild 확인은 설치 성공 증거가 아니다. HTTPS universal/app links 도메인 연결을 구현하지 않았다. OS 권한·이미지·오디오 등 앞 단계 native 잔여도 해결됐다고 바꾸지 않는다.
- 장애 주입은 외부 wrapper의 finally에서 searchPreview/relationshipPreview/publicListPreview 세 파일을 원래 바이트로 복원했다(`fault-restore.json`3개true). 사용자 ENV·원본 medium·기존8081 PID58453을 보존한다. 최종 Git diff/상태 검토 후 Goal50 변경만 로컬 커밋한다.

## 8081 최종 확인 순서

1. 새로고침→Home For you의−/Undo, Featured의북마크, +의관심사와 뒤로를 확인한다.
2. Explore→검색: Mindfulness/Stories, Thomas/People, Ironkeel/Publications, Music/Topics, morning/Lists를 차례로 열고 대상→뒤로에서 입력·선택·포커스를 확인한다. 없는 검색어와 여러 결과의 Show more도 확인한다.
3. B로 모의 로그인→People의 Thomas Follow→Home Following에서 같은 관계의 글을 확인한다. 검색/공개 프로필에서 자기 Follow는 없어야 한다.
4. Write→제목/본문→Next→Publication The Ironkeel Collection→Publish now. 검색/내 Stories/작성자 공개 프로필/publication에서 같은 글을 열고 돌아온다.
5. 작성 글 Share→Copy link는 `/written/`이어야 한다. 같은 실행의 실제 navigation 링크 이벤트 회귀 검사가 같은 본문을 연다. 새로고침하면 메모리 발행 글이 초기화되므로 해당 주소의 영속 접근을 기대하지 않는다.
6. 프로필 이름을 바꾼 뒤 People과 Stories에서 새 이름을 검색한다. 공개 프로필과 기존 글의 userId/관계는 그대로다.
7. `http://localhost:8081/?previewLink=kostolany%3A%2F%2Ftopic%2Fmusic`으로 초기 공개 링크를, `kostolany://private/invalid`를 인코딩한 값으로 오류와 뒤로를 확인한다. 실패/재시도는 외부 run-faults.py의 임시 주입/복원 절차를 사용한다.

기능·자동 검사와 원본/native 검증을 분리해 인계한다. Goal51에서 기능 간 상태·실패·계정 격리를 이어서 검증하며 이 문서만으로 남은 시각/native 차이를 완료 처리하지 않는다.

## Goal51 후속 확인 — 과거 실행 결과와 구분

Goal51에서 Settings가 열린 프로필 탭을 유지한 채 홈에서 발행하면 Settings로 복귀하는 결함을 재현하고 ProfileHome 목적지를 명시했다. 또한 Goal50의 `/written` 공유 경로에 맞춰 WrittenStoryScreen 기존 테스트의 기대 URL을 수정했다. [Goal51 결과](FE_GOAL_51_RESULT.md)의 현재 전체 검사와 실제 8081 흐름을 따른다. 이 문서의 당시 검사 수치는 변경하지 않는다.
