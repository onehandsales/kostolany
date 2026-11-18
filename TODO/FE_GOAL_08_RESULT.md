# Goal 8 — 북마크 저장·해제와 저장 목록 결과

2026-11-18 KST. **구현·자동 검증·PC 브라우저 흐름·모바일 폭 원본 비교 완료 / 실제 iOS·Android 기기 검증 대기**.

홈·검색·상세에서 기사를 저장하고 라이브러리의 기본 읽기 목록에서 같은 기사를 다시 읽을 수 있다. 저장·해제, 빈 목록, 조회·변경 실패와 재시도를 구현했다. 실제 인증·DB 저장이 아닌 fixture·mock 프론트엔드 결과다. Goal 9는 시작하지 않았다.

## 적용 규칙과 작업 환경

- `AGENT/README.md`, 제품 범위·기술 구성·현재 상태·공통 검증·UX 규칙, `FRONT_AGENT/README.md`와 하위 규칙 6개, `FE_GOALS.md`와 Goal 7 결과·실제 좋아요 코드를 확인했다. 기존 4탭·Expo·native-stack과 `app / features / shared` 구조를 유지했다.
- 작업 시작 시 `git status --short`는 비어 있었다. 새 설명 주석은 한글 한 문장·한 줄로 작성했다. 기존 규칙 7개와 Medium 원본·분석 문서를 수정하지 않았다.
- macOS 14.2 arm64에서 `/opt/homebrew/opt/node@24/bin`의 Node 24.10.0·npm 11.6.0으로 검사했다. 프로젝트의 Node 24.18.0·npm 10.9.0 지정과 실행 환경의 차이를 기록하며 설정·패키지·lockfile은 바꾸지 않았다.
- 시작 시 8081 포트에 서버가 없어 기존 `npm run web`으로 localhost 미리보기를 실행했다. 앱 실행 설정을 바꾸거나 다른 미리보기 서버를 종료하지 않았다.
- 브라우저 자동화에 `/tmp/kostolany-goal8-browser`의 Playwright Core와 설치된 Chrome을 사용했다. 앱 의존성에 자동화 패키지를 추가하지 않았으며 인증·외부 서비스에 접속하지 않았다.

## 구현과 파일 책임

| 위치 | 책임 |
| --- | --- |
| `FE/src/features/bookmarks/types.ts` | 사용자·기사 identity, 목표 상태 명령, 읽기 목록·표시 상태 계약 |
| `bookmarks/data/bookmarkFixtures.ts` | 기존 10개 기사를 중복 없이 제공하는 읽기 목록 카탈로그·모의 사용자 |
| `bookmarks/data/createMockBookmarkSource.ts` | 사용자별 저장 ID 집합·목록 조회·등록/해제·반영 전 실패 |
| `bookmarks/data/bookmarkPreview.ts` | 실행 화면의 정상·실패·지연 시나리오 선택 |
| `bookmarks/createBookmarkStore.ts` | 기사별 확정·최신 목표·진행 명령·변경 세대·실패 목표·구독, 목록 파생 |
| `bookmarks/BookmarkProvider.tsx` | 공급부 수명과 사용자별 저장소 소유, 사용자/공급부 범위 격리 |
| `bookmarks/useBookmarks.ts` | 기사·목록의 `useSyncExternalStore` 구독, 초기 조회·사용자 행동 연결 |
| `bookmarks/BookmarkIcon.tsx`, `ArticleBookmarkControl.tsx` | 윤곽/채움 북마크, 조작 상태·접근성·재시도 |
| `bookmarks/LibraryScreen.tsx` | 기본 읽기 목록 카드·저장 수·존재하는 삽화 미리보기 |
| `bookmarks/ReadingListScreen.tsx`, `ReadingListFeedback.tsx` | 저장 기사 목록·빈 상태·둘러보기·조회/변경 오류·목록 밖 실패 재시도 |
| `app/navigation/LibraryNavigator.tsx` | Library 탭 안의 라이브러리→읽기 목록 이동 |
| `AppNavigator.tsx`, `MainTabs.tsx` | 공유 Provider 조립, Library 진입과 상세 복귀 맥락 연결 |
| 홈 `ArticleCard`, `SearchCard`, `ArticleDetailScreen` | 기사 이동과 독립된 북마크 조작, 기존 좋아요와 상세 하단 바 연결 |

읽기 목록은 검색 카드의 공개 컴포넌트를 재사용하며 데이터는 북마크 저장소가 제공한다. 화면이 mock 저장 집합을 직접 읽거나 수정하지 않는다. 목록·카드·상세에 독립적으로 수정 가능한 북마크 원본을 만들지 않았다. 새로운 상태 라이브러리·저장소 SDK·범용 반응 프레임워크는 추가하지 않았다.

## 상태 수명과 임시 기본안

| 항목 | 선택과 근거 |
| --- | --- |
| 상태 소유자 | `AppNavigator`의 `BookmarkProvider`, 해당 공급부·기사 카탈로그 범위 안의 사용자별 저장소 |
| 식별 키 | 사용자별 저장소의 `articleId`; mock 공급부도 `userId`별 저장 ID 집합 분리 |
| 실행 사용자 | 기본 `example-reader`; 실제 로그인·사용자 전환 UI 없음 |
| 최초 조회 | 사용자 목록 한 번 조회, 완료 전 저장 여부 미확인·조작 비활성; 오류를 빈 목록으로 표시하지 않음 |
| 화면 이탈·재진입 | 구독만 해제하고 공유 명령은 계속 처리; 돌아오면 확정/진행 상태 재사용 |
| 사용자 A→B→A | 같은 공급부에서는 A의 저장소·진행 명령을 유지하므로 B에 노출하지 않고 A 복귀 후 마지막 의도 처리 |
| 공급부/카탈로그 교체 | 새 사용자별 저장소 묶음으로 격리; 이전 응답이 새 상태를 변경하지 않음 |
| 앱 재실행 | 기본 공급부·저장소가 새로 생성되며 빈 목록으로 초기화; 기기·서버 영속 저장 없음 |
| Fast Refresh | 개발 도구의 상태 보존을 제품 저장 정책으로 보장하지 않음; 재현에는 전체 새로고침 사용 |
| 목록 구성 | 기본 읽기 목록 하나, 저장 수와 카드·미리보기는 현재 목표 상태에서 파생 |
| 목록 순서 | 기존 최신 4→인기 3→추천 3 fixture 순서; 저장 시각·추천·서버 정책을 확정하지 않음 |
| 이미지 없음 | 해당 기사에 썸네일을 추가하지 않으며 목록 카드의 삽화 미리보기에서도 제외 |
| 저장 해제 | 읽기 목록 소속만 제거하며 기사 원문·좋아요 상태는 유지 |

현재 mock은 고정 10개 기사와 시험용 사용자 범위다. 사용자별 저장소는 Provider 수명 동안 유지된다. 실제 로그인/로그아웃을 도입하는 Goal 10에서는 계정별 cache 삭제·세션 수명·보관 한도를 해당 정책에 맞춰 다시 정해야 한다. 임의 사용자 ID를 받는 mock은 서버 권한 검증이 아니다.

## 경합·실패·복구

- 저장 명령은 `saved: true/false` 목표를 전달한다. 같은 기사에는 한 요청씩 보내며 진행 중 입력은 마지막 목표로 합친다. 다른 기사 요청은 독립적으로 진행한다.
- 선택과 목록을 낙관적으로 함께 바꾼다. 확정 응답은 기준만 갱신하고 진행 중에 들어온 최신 의도를 유지한다. 중복 입력으로 항목이나 수를 추가하지 않는다.
- 최신 의도의 변경이 실패하면 해당 기사의 마지막 확정 상태로 복구하고 실패 목표를 보관한다. 재시도는 현재 값을 뒤집지 않고 그 목표를 다시 보낸다. 처리 중 재시도 연타는 합친다.
- 오래된 쓰기 실패는 더 최신 의도를 롤백하지 않는다. 동일 기사의 쓰기 응답 역전은 직렬화로 차단하며 공급부 교체 전 늦은 성공·실패는 새 저장소와 격리한다.
- 목록 조회 시 기사별 변경 세대를 기록한다. 조회 시작 이후 변경됐거나 쓰기 중·변경 실패 상태인 기사는 과거 목록 응답으로 덮지 않는다. 늦은 조회 실패는 저장 상태를 되돌리지 않으며 목록 갱신 오류로만 표시한다.
- 목록 응답의 사용자·존재하는 기사 ID·중복을 검사하고 쓰기 응답의 사용자·기사·목표 일치를 검사한다. 잘못된 응답과 동기 예외를 성공·빈 상태로 숨기지 않는다.
- 해제 중 마지막 카드가 사라져도 실패하면 다시 표시한다. 목록 밖에서 실패한 저장은 목록 상단에서 재시도할 수 있다. 목록에 복원된 카드의 실패는 카드 한 곳에서 안내해 중복 알림을 피한다.

**계약의 한계:** mock 실패는 저장 반영 전 실패다. 실제 서버가 반영한 뒤 응답이 끊기는 결과 불명 상태, 다른 기기의 변경, 서버 멱등키·버전·권한, 영속 저장과 오프라인 큐를 검증한 것은 아니다. 실제 API로 교체할 때 별도 계약이 필요하다.

## 화면과 Medium 대조

로컬 분석 문서와 원본 PNG 9장을 다시 열어 확인했다. 새 Gummble 조회나 실제 Medium 계정 조작은 하지 않았다. 앱은 Medium iOS `medium-ios` / `4674239e-d24a-4ef4-aed5-9682429edd48`, 보관 카탈로그 `Latest` / `1419`다. 제품 빌드·캡처일·기기·OS·DPR은 미확인이다.

| 흐름·원본 | 이번에 본 PNG |
| --- | --- |
| [Saving a story](<../medium/flows/Home/Story detail/Saving a story/ANALYSIS.md>), `544f44c3-2d0f-471c-9baf-cd6fb8d58786` | 01 `sc_332d5b0923e546fcbf6a8fc613cda6a4`, 02 `sc_31edfd53d2874259a6ed5ecbc756d10b`, 03 `sc_dda8e78e9eb943629d3cf54eaed5fc22` |
| [Library](../medium/flows/Library/ANALYSIS.md), `0884e152-cbbf-474c-b439-32544ad035b2` | 02 `sc_84e0421de98041bbb014822fc05dd3fb`, 03 `sc_57450c38bf994be18d95fcaf712c56ba` |
| [List detail](<../medium/flows/Library/List detail/ANALYSIS.md>), `adc8aea8-3578-44c2-a256-7f2a893d6676` | 02 `sc_967232cfb5f845839053e0d371d78911`, 03 `sc_0b1e7b64b9f14f2cb5358161e0f67a94` |
| [Removing a story](<../medium/flows/Library/List detail/Removing a story/ANALYSIS.md>), `c82ad1ef-35ad-416c-97ec-9601d7ee97dd` | 01 `sc_fa4e79f0bed747d698ae44e23f9223f9`, 02 `sc_a79a8c62cfd64776ae74f84e0d98b5c3` |

[나란히 비교 HTML](evidence/goal8/COMPARISON.html)은 빈/채워진 라이브러리, 빈/채워진 읽기 목록, 상세의 선택된 북마크, 기사 제거 결과를 연결한다. 원본 1179×2556px을 가로 390px로 비율 유지 축소하며 파일 변경·자르기·위치 보정은 하지 않았다. 구현 캡처는 390×844 CSS px이며 iOS 시스템 영역을 인위적으로 붙이지 않았다.

비교 HTML의 이미지 12개가 로드됨을 확인하고 [목록 비교 캡처](evidence/goal8/comparison-reading-list.png)와 [상세 북마크 비교 캡처](evidence/goal8/comparison-bookmark.png)를 남겼다. 보조 화면은 [320px 상세](evidence/goal8/detail-narrow-mobile.png), [본문 끝과 하단 바](evidence/goal8/detail-end-mobile.png), [큰 글자 목록](evidence/goal8/reading-list-large-text.png), [큰 글자·실패 재시도](evidence/goal8/save-error-detail-large-text.png), [PC 읽기 목록](evidence/goal8/reading-list-desktop.png)에서 확인할 수 있다.

| 항목 | 반영과 남은 차이 |
| --- | --- |
| 라이브러리 | 제목·내 목록 밑줄·좌우 24 여백·읽기 목록 카드·기사 수·삽화 미리보기 구조 반영; 목록 생성 배너·다른 탭·다운로드·더보기 제외 |
| 읽기 목록 | 뒤로 가기·소유 구분·큰 제목·기사 수·출처/제목/썸네일·구분선·하단 탭 반영; 한글 요약·단일 좋아요는 자체 요소 |
| 빈 상태 | 설명과 초록색 둘러보기 버튼 제공; 홈으로 이동해 저장한 뒤 같은 읽기 목록으로 돌아올 수 있음 |
| 북마크 | 24 단위 윤곽/채움 아이콘과 저장 문구, 최소 48×48 터치 영역; 원본 미선택 아이콘의 + 표식은 생략 |
| 저장 대상 시트 | 원본의 Reading list 체크·Done 화면을 확인했으나 현재 기본 목록 하나에 즉시 저장하는 기본안 선택; 여러 목록 선택·생성은 Goal 9 범위 |
| 제거 | 원본의 더보기→Remove→Undo를 직접 북마크 해제로 대체; 원문은 유지하고 실패 시 복구·동일 목표 재시도 제공; Undo·메모·신고는 미포함 |
| 본문 하단 바 | 좋아요와 북마크를 ScrollView 바깥 형제로 배치; 정상·오류 높이가 본문 영역에 반영되고 마지막 문단이 가려지지 않음 |
| Safe Area | 상세 바깥 SafeAreaView가 상하좌우 소유, 바에 inset 중복 추가 없음; Library 화면은 상단/좌우, 기존 BottomTabBar는 하단 책임 |
| 접근성 | native `togglebutton`/checked·busy·disabled, 웹 button/aria-pressed·busy·disabled; 한글 이름·힌트·오류 재시도, 카드 이동과 형제 조작 영역 |

글자·간격은 기존 토큰과 한글 콘텐츠에 맞춘 구현값이며 Medium 소스 토큰이 아니다. 라이브러리 제목 28/36, 카드 제목 22/30, 본문 카드의 기존 검색 타이포를 사용한다. 보관된 원본의 iOS 시스템 영역과 웹 inset, 콘텐츠 길이 차이는 남아 있다. 브랜드·사진·본문을 제품 자산으로 복사하지 않았다.

## 검증 결과

| 검사 | 결과·한계 |
| --- | --- |
| `npm run check` | 통과: 타입 검사·lint 경고 0·40 suites·266건, 133개 논리 테스트를 iOS/Android 각각 실행 |
| 추가 테스트 | 상태 저장소 21·mock 공급부 4·컴포넌트/Provider 6·실제 navigation 5 = 36개; 기존 97개 회귀 포함 |
| `npm run export:android` | 통과: 1001 modules, 약 2.2MB JS/Hermes 번들, `FE/dist/android` |
| `npm run export:ios` | 통과: 1006 modules, 약 2.2MB JS/Hermes 번들, `FE/dist/ios` |
| 브라우저 정상 | Chrome 157.0.8103.79 headless 실제 렌더·클릭, 390×844·320×740·1365×900; 저장→목록→같은 상세→해제, 이미지 없는 기사, 검색어·상태 유지, 좋아요·설명 수준, 재실행 초기화 |
| 브라우저 실패/지연 | `read-error/save-error/remove-error/slow` 검증; 실패 복구 후 라이브러리에서 재시도, 연속 입력 중 상세 이탈·홈 복귀 |
| 큰 글자 보조 확인 | 320px에서 텍스트 CSS 크기/행간 2배로 목록과 실패 안내·조작 확인; 실제 RN fontScale·OS Dynamic Type 검증과 구분 |
| 레이아웃 | 가로 넘침 없음, 북마크 터치 영역 최소 48, 작은 상세에서 조작이 viewport 안에 위치; 정상 본문 마지막 안내가 고정 바 위에 있음 |
| 콘솔·통신 | 5개 시나리오에서 JS/콘솔 오류 0, 앱 외부 HTTP 요청 0; localhost 개발 요청만 관찰 |
| 실제 플랫폼 | iOS/Android 실행·APK/AAB/IPA 빌드·설치·기기 원본 비교 미실행 |
| 검토 | 변경 코드와 테스트 자기 검토, 독립 리뷰·하위 에이전트 미사용 |

브라우저 근거: [정상·실측](evidence/goal8/normal-checks.json), [조회 실패](evidence/goal8/read-error-checks.json), [저장 실패](evidence/goal8/save-error-checks.json), [해제 실패](evidence/goal8/remove-error-checks.json), [지연·연속 입력](evidence/goal8/slow-checks.json). 캡처한 시나리오의 measurements에 viewport·가로 넘침·북마크 크기·선택·처리 상태를 기록했다. 지연 시나리오는 동작만 검사했다. 자동 테스트는 제어 가능한 Promise로 응답 순서를 검증하며 브라우저의 장애 모드는 기본 `normal`로 복구했다.

명령 출력은 [타입·lint·테스트](evidence/goal8/checks.txt), [Android JS 번들](evidence/goal8/export-android.txt), [iOS JS 번들](evidence/goal8/export-ios.txt)에 보관했다.

검토 중 보완한 내용:

- 사용자 전환 때마다 저장소를 버리지 않고 같은 사용자로 돌아올 때 진행 중 명령·최신 의도를 이어 받도록 사용자별 소유자를 유지했다.
- 늦은 목록 조회 실패가 이미 확정한 기사의 변경 오류로 표시되지 않게 구분했다. 공유 목록의 조회 오류와 기사 쓰기 실패의 복구 범위가 다르다.
- 마지막 기사 해제 실패 시 복원된 카드와 상단에 같은 안내가 중복되던 부분을 수정하고 회귀 테스트로 검증했다.
- 기존 피드/검색 테스트의 임의 기사 카탈로그를 북마크 테스트 공급부에 함께 주입했다. 좋아요 테스트는 새 북마크와 구분되도록 정확한 접근성 이름을 사용한다. 제품 코드를 테스트용으로 완화하지 않았다.
- 캡처 시 크기 변경·navigation 전환이 안정된 뒤 촬영하고 본문 끝 캡처는 설명 조회 완료를 기다렸다. 원본이나 구현 이미지를 보정하지 않았다.

## 남은 검증과 종료 범위

- 현재 Mac의 `xcode-select -p`는 `/Library/Developer/CommandLineTools`다. `xcrun simctl list devices available`와 `xcodebuild -version`은 Xcode 도구 부재로 실행하지 못했다. 표준 SDK 경로와 PATH에서 Android SDK·adb·에뮬레이터를 발견하지 못했다. 이전 Windows 환경의 제약을 현재 Mac 상태로 복사하지 않았다.
- 실제 Safe Area·시스템 바, OS 글자 확대, VoiceOver/TalkBack, iOS 스와이프 복귀·Android 시스템 제스처, background/process 재생성은 미검증이다. 브라우저와 Jest·JS 번들을 네이티브 검증으로 기록하지 않는다.
- 실제 인증·서버 권한·DB 영속성·다중 기기·결과 불명 복구는 미구현이다. 기존 npm audit 경고를 이번에 해결하거나 재검사하지 않았다.
- `FE_GOALS.md`, 현재 구현 상태와 `FE/README.md`를 갱신했다. FRONT_AGENT 규칙, Medium 원본, 의존성·lockfile·ENV, 백엔드는 보존했다. 커밋·push·배포는 하지 않았다.
- 구현과 가능한 검증은 마쳤지만 공통 완료 조건의 실제 기기 검증은 남아 있다. **구현 완료 / 실제 기기 검증 대기**로 보고하며 Goal 9를 자동 생성하거나 시작하지 않는다.
- 구현 보고 후 별도 사용자 요청에 따라 이 산출물을 로컬 커밋으로 기록한다. 8081 미리보기의 HTTP 200 응답을 재확인했으며 원격 push·배포는 수행하지 않는다.
