# Goal 9 — 라이브러리 목록 관리 결과

2026-11-18 KST. **구현·자동 검증·8081 브라우저 흐름·모바일 폭 원본 비교 완료 / 실제 iOS·Android 기기·네이티브 빌드 검증 대기**.

사용자 목록을 만들고 이름을 바꾸거나 삭제할 수 있다. 같은 기사를 여러 목록에 저장하고 목록에서 상세를 읽은 뒤 원래 목록으로 돌아온다. 홈·검색·상세·라이브러리의 저장 표시는 공유하며, 각 작업의 로딩·실패 복구·재시도를 제공한다. fixture·mock 프론트엔드 결과이며 실제 서비스 정책이나 영속 저장의 완료를 뜻하지 않는다. Goal 10은 시작하지 않았다.

## 시작 상태와 적용 규칙

- 시작 시 `git status --short`가 비어 있었고 HEAD는 `514fc19` (`feat(fe): add bookmarks and reading list for Goal 8`)였다. 이전 커밋 요청을 적용하지 않았으며 구현 보고 시점에는 커밋·push·배포하지 않았다.
- `AGENT/README.md`, 제품 범위, 공통 검증·현재 상태·UX 규칙, `FRONT_AGENT/README.md`와 하위 6개 규칙, `FE_GOALS.md`의 공통 완료 조건·Goal 9를 확인했다. Goal 8 결과와 실제 북마크·좋아요·navigation 코드 및 테스트를 읽었다.
- 기존 `app / features / shared`, named export, strict TypeScript, 기능별 공급부·상태·화면 분리를 유지했다. 새 설명 주석과 시나리오는 한글로 작성했다. 기존 구현의 정확성을 전제하지 않고 변경 경계와 회귀 테스트를 검토했다.
- 시작 시 8081 서버가 실행 중이고 HTTP 200이었다. 해당 프로세스와 `npm run web` 설정을 보존했다. 검증을 위한 장애 모드는 끝난 뒤 `normal`로 복원했다.
- macOS 14.2 arm64, Node 24.10.0·npm 11.6.0을 사용했다. 프로젝트 지정 Node 24.18.0·npm 10.9.0과 실행 환경의 차이는 기존과 같다. 패키지·lockfile·ENV·Medium 원본·FRONT_AGENT 규칙은 바꾸지 않았다.

## 구현 파일과 책임

아래 북마크 파일의 기준 폴더는 `FE/src/features/bookmarks/`다.

| 파일 | 책임 |
| --- | --- |
| `listTypes.ts`, `validateListName.ts` | 사용자·목록·기사 ID, 전체 목록 목표 명령, 이름 정규화·검증 |
| `data/createMockUserListSource.ts`, `data/userListPreview.ts` | 사용자별 목록·삭제 기록, 반영 전 1회 실패와 지연 시나리오 |
| `createUserListStore.ts` | 목록별 확정/최신 목표·직렬 쓰기·조회 경합·삭제 기록·실패 목표와 재시도 |
| `createLibraryStore.ts` | 기본 읽기 목록과 사용자 목록을 조합해 기사별 저장 표시를 파생 |
| `BookmarkProvider.tsx`, `useBookmarks.ts` | 사용자별 공유 저장소 소유와 구독, 범위 변경 시 열린 입력 정리 |
| `LibrarySheet.tsx`, `ListEditorSheet.tsx` | Safe Area·키보드 회피·스크롤 시트, 생성/수정 입력·검증·취소·실패 재시도 |
| `ListActions.tsx`, `SaveToListSheet.tsx` | 관리 메뉴·삭제 확인, 여러 저장 대상의 선택 초안·적용 |
| `LibraryScreen.tsx`, `LibraryListCard.tsx`, `ReadingListScreen.tsx` | 기본/사용자 목록 카드·개수·삽화·빈 상태·목록별 제거·상세 진입 |
| `UserListFeedback.tsx`, `ArticleBookmarkControl.tsx` | 목록/기사별 진행·오류·재시도, 선택된 북마크·저장 대상 메뉴 |
| `types.ts`, `data/createMockBookmarkSource.ts` | 기존 기본 목록 공급 계약에 사용자 목록 공급부 연결 |
| `FE/src/app/navigation/{AppNavigator,MainTabs,LibraryNavigator}.tsx` | 목록 ID와 기사 ID를 전달하고 같은 목록으로 복귀 |
| `FE/src/features/search/SearchCard.tsx` | 기존 카드를 재사용하면서 목록 전용 제거 행을 받을 수 있는 footer 추가 |

Goal 8의 `createBookmarkStore.ts`는 변경하지 않았다. 기본 읽기 목록의 소속은 그 저장소, 사용자 목록의 내용은 새 목록 저장소가 각각 소유한다. 기사별 종합 북마크는 파생값이며 별도 수정 가능한 원본으로 복제하지 않는다. UI는 저장소에 명령을 전달하고 mock Map을 직접 바꾸지 않는다. 추가 상태 라이브러리·영속 저장 SDK·의존성은 없다.

## 상태·동작의 구현 기본안

| 항목 | 선택 |
| --- | --- |
| 사용자 | 기본 `example-reader`; Provider와 mock 모두 `userId`별 격리. 실제 로그인·전환 UI는 없음 |
| 상태 소유자 | AppNavigator의 BookmarkProvider가 공급부·기사 카탈로그 범위의 사용자별 LibraryStore 소유 |
| 목록 ID | 기본 `reading-list`, 사용자 목록은 생성 명령 때 만든 안정된 ID. 이름 수정·재시도로 ID가 바뀌지 않으며 이름은 key가 아님 |
| 기사 ID | 기존 10개 fixture의 ID 사용. 화면 위치·제목·목록 이름으로 식별하지 않음 |
| 기본 읽기 목록 | 이름 수정·삭제 불가. 기사 추가·제거 가능. 사용자 목록의 자동 백업이나 전체 저장 합계가 아님 |
| 종합 북마크 | 기본 또는 사용자 목록 중 하나 이상에 속하면 선택됨. 모든 소속이 없어지면 해제됨 |
| 여러 목록 소속 | 같은 기사를 각 목록에 한 번씩 저장 가능. A에서 제거해도 B와 기본 목록 소속은 유지 |
| 목록 삭제 | 해당 목록과 그 소속만 제거. 원문·좋아요·다른 목록은 보존. 기본 목록으로 자동 이전하지 않음 |
| 북마크 누르기 | 사용자 목록 소속이 없으면 기존 기본 목록 즉시 저장/해제. 사용자 목록 소속이 있으면 저장 대상 시트로 진입 |
| 저장 대상 진입 | 기사 북마크 옆 `⋯`는 언제나 저장 대상 메뉴. 체크 후 `완료`로 적용 |
| 카드·개수·미리보기 | 현재 목표 상태에서 함께 파생. 이미지 있는 기사 최대 3개 미리보기. 이미지 없는 기사에 가짜 이미지를 붙이지 않음 |
| 정렬 | 기본 목록 먼저, 사용자 목록은 생성/조회 삽입 순서. 목록 안 기사는 기존 fixture 배열 순서. 실제 저장 시각 정렬 정책 아님 |
| 화면 이탈·재진입 | 공유 명령은 계속 처리하고 재진입하면 같은 상태 사용. 단순 화면 이동으로 다시 초기화하지 않음 |
| 사용자 전환 | A→B에서 A 입력·열린 시트·navigation을 정리하고 B 상태 표시. A의 진행 명령은 A 저장소에서 완료하며 A 복귀 시 재사용 |
| 공급부·카탈로그 교체 | 저장소 범위를 새로 만들고 열린 화면/초안 정리. 이전 범위의 늦은 응답이 새 범위에 표시되지 않음 |
| 앱 재실행·전체 새로고침 | Goal 8과 같은 메모리 정책. 기본 공급부가 다시 생성되면 기본 읽기 목록은 비고 사용자 목록도 없음 |
| 영속성 | 기기 저장소·DB·서버·오프라인 큐 사용 안 함. Fast Refresh의 상태 보존은 제품 동작으로 보장하지 않음 |

사용자 저장소와 삭제 ID 기록은 해당 공급부/Provider 수명 동안 보관한다. 현재는 고정 기사와 mock 사용자 범위이며 실제 다수 계정의 보관 한도·세션 폐기·권한 검증을 구현한 것이 아니다. Goal 10의 로그인·로그아웃 정책도 이번 작업에서 확정하지 않았다.

### 이름 입력과 취소

- 제출용 이름은 NFC 정규화, 앞뒤 공백 제거, 연속 공백을 한 칸으로 정리한다. 입력 중인 원문은 그대로 두어 조합 중 강제 정규화를 피한다.
- 빈 값·공백만 있는 값은 거부한다. 정규화 후 최대 **60 Unicode 코드 포인트**다. 이모지 복합 문자 등의 grapheme 수와 같다고 주장하지 않는다.
- 같은 사용자 안에서 정규화·영문 대소문자 무시 기준으로 중복을 거부한다. 기본 이름 `읽기 목록`도 예약한다. 변경 중 이름·마지막 확정 이름·실패한 목표 이름을 다른 목록이 먼저 쓰지 못하게 한다. 자기 이름의 재저장은 가능하다.
- 이름 입력에서 Enter/키보드 완료는 입력 종료만 하며 저장 요청을 만들지 않는다. 명시적인 `만들기`/`저장`/`다시 시도` 버튼으로 제출한다. pending 중 입력·제출은 비활성화하고 닫기는 가능하다.
- 제출 전 생성/편집 취소는 데이터 변경 없이 초안을 버린다. 삭제 메뉴 진입만으로 삭제하지 않으며 확인 시트의 취소도 기존 상태를 유지한다.
- 제출 후 `닫기`는 진행 중 요청을 취소하지 않는다. 화면에 계속 저장된다는 안내를 표시한다. 실패 시 확정값을 복원하고 같은 목표를 라이브러리에서 재시도할 수 있다. 실패 폼을 유지하면 입력을 고쳐 같은 목록 ID로 재시도한다.
- 저장 대상의 체크는 화면 초안이다. 취소/Escape/Modal 닫기로 버리고, 완료 시 직접 바꾼 행만 반영한다. 열어 둔 동안 다른 곳에서 변경된 미조작 행은 최신 상태를 보존하며 삭제된 목록은 적용 대상에서 제외한다.
- 저장 대상 안의 `새 목록 만들기`에서 생성까지 확정하면 목록 자체는 생성된다. 이후 저장 대상 선택을 취소하면 그 **빈 목록은 남고 기사만 추가하지 않는다**. 별도 테스트로 확인했다.
- 삭제 중인 목록 상세는 즉시 라이브러리로 복귀하며 편집 시트도 정리한다. 삭제 실패는 라이브러리에 복원하고 그곳에서 재시도한다. 사라진 상세를 자동으로 다시 열지는 않는다.

### 동시성·실패 복구

목록의 `{name, articleIds}` 전체 또는 삭제 `null`을 명령 단위로 삼는다. 한 목록은 한 쓰기씩 처리하고 진행 중 입력은 최신 목표로 합친다. 따라서 이름 수정·기사 추가 중 삭제를 요청해도 이전 쓰기가 끝난 뒤 삭제를 처리하며, 중간 응답이 화면을 되살리지 않는다. 서로 다른 목록과 기존 기본 목록의 기사별 명령은 독립적으로 진행한다.

최신 변경 실패는 그 목록의 마지막 확정 내용으로 복원하고 실패 목표를 보관한다. 오래된 실패는 더 최근 의도를 되돌리지 않는다. 삭제 실패는 직전에 확정된 이름과 소속으로 복원한다. 성공한 삭제는 세션 내 삭제 기록을 남겨 늦은 조회나 명령이 같은 ID를 되살리지 못하게 한다. 생성 실패 뒤 이미 삭제를 원한 경우에도 빈 유령 목록을 남기지 않는다.

조회는 중복 요청을 합치며 목록별 변경 세대를 비교한다. 조회 이후 변경·실패·삭제된 항목을 오래된 결과나 오래된 부재 정보로 덮지 않는다. 사용자·목록 ID·이름·기사 ID·중복·쓰기 응답 목표를 검증하며 잘못된 응답과 동기 예외도 실패로 처리한다. 늦은 조회 실패는 준비된 데이터를 지우지 않고 갱신 오류를 표시한다.

여러 목록 선택의 완료는 **목록 사이의 원자적 트랜잭션이 아니다**. 성공한 다른 목록은 유지하고 실패한 목록만 복구·재시도한다. 한 사용자 목록 내부에서는 이름과 소속이 하나의 전체 목표로 확정/복구된다. mock 실패는 모두 **반영 전 실패**다. 서버 반영 후 응답 유실, 다른 기기 변경, 서버 권한·멱등키·버전 충돌은 실제 API 계약의 후속 범위다.

## Medium 관찰과 원본 비교

`medium/README.md`와 아래 6개 흐름의 분석을 확인하고 원본 PNG 11장을 직접 열었다. 새 Gummble 조회·Medium 계정 조작은 없다. Medium iOS `medium-ios` / `4674239e-d24a-4ef4-aed5-9682429edd48`, 보관 카탈로그 `Latest` / `1419` 기준이다. 제품 빌드·원본 캡처일·기기·OS·DPR은 미확인이다. 이번 재확인일은 2026-11-18이다.

| 분석·흐름 ID | 직접 확인한 화면 ID |
| --- | --- |
| [Library](../medium/flows/Library/ANALYSIS.md), `0884e152-cbbf-474c-b439-32544ad035b2` | 02 `sc_84e0421de98041bbb014822fc05dd3fb` |
| [Creating a list](<../medium/flows/Library/Creating a list/ANALYSIS.md>), `0c92c7dc-d2eb-4fde-b46e-f6e9ed7c8d9b` | 02 `sc_675e3eda08504708979533659dacdcf6`, 03 `sc_ca3b32e4373a40fc84405838671eab27`, 04 `sc_35dcbd9d4308404b9f11ecd03f893eb8` |
| [List detail](<../medium/flows/Library/List detail/ANALYSIS.md>), `adc8aea8-3578-44c2-a256-7f2a893d6676` | 02 `sc_967232cfb5f845839053e0d371d78911`, 03 `sc_0b1e7b64b9f14f2cb5358161e0f67a94` |
| [Deleting a list](<../medium/flows/Library/List detail/Deleting a list/ANALYSIS.md>), `aeb98b72-2ea5-46f9-828e-f1c3ee6361d4` | 02 `sc_71f31ac7803a47f89b2e76b6a9355a7c`, 03 `sc_a1562b1931fc4650a544861094934588`, 04 `sc_7749ef5c35474c229a2515a9c2a53878` |
| [Removing a story](<../medium/flows/Library/List detail/Removing a story/ANALYSIS.md>), `c82ad1ef-35ad-416c-97ec-9601d7ee97dd` | 01 `sc_fa4e79f0bed747d698ae44e23f9223f9` |
| [Saving a story](<../medium/flows/Home/Story detail/Saving a story/ANALYSIS.md>), `544f44c3-2d0f-471c-9baf-cd6fb8d58786` | 02 `sc_31edfd53d2874259a6ed5ecbc756d10b` |

[원본/구현 비교 HTML](evidence/goal9/COMPARISON.html)에 11쌍과 자체 이름 수정 폼을 연결했다. 원본 링크는 각 쌍에서 직접 열 수 있다. 23개 이미지 로드를 확인하고 [생성 폼](evidence/goal9/comparison-create.png), [저장 대상](evidence/goal9/comparison-save.png), [삭제 확인](evidence/goal9/comparison-delete.png), [목록 상세](evidence/goal9/comparison-detail.png)를 실제 비교 캡처로 남겼다. 원본 1179×2556px은 390px 폭으로 비율만 유지해 표시하며 파일을 수정·자르거나 시스템 영역을 합성하지 않았다. 구현은 Chrome 390×844 CSS px이며 네이티브 캡처가 아니다.

| 구분 | 관찰·반영·차이 |
| --- | --- |
| 원본 관찰 | Library 제목·내 목록 밑줄·카드의 소유자/목록명/기사 수/미리보기, 생성 폼의 이름 0/60·취소·초록 제출, 저장 대상의 체크·Create new list·Done, 관리 메뉴·빨간 삭제 확인 |
| 이름 수정 | **Edit list info 메뉴만 관찰했으며 편집 폼 캡처는 없다.** 생성 폼 구조를 재사용한 [이름 수정 화면](evidence/goal9/rename-mobile.png)은 자체 설계 |
| 타이포·여백 | 기존 한글 토큰: 페이지 제목 28/36, 카드·시트 제목 22/30, 입력 18/28, 폼 본문 16/26, 좌우/시트 내부 24. 원본 소스 토큰을 확보한 것은 아님 |
| 생성 폼 | 회색 이름 입력·카운터·취소·비활성 제출 반영. 확장 시트·한글 검증·오류 재시도는 구현안. 설명·공개 범위 입력 제외 |
| 관리 메뉴 | 원본 팝오버의 이름 수정/삭제를 공통 하단 시트로 제공. 큰 글자·스크롤·닫기 경로를 통일한 자체 배치 |
| 삭제 | 원문을 삭제하지 않는다는 원본 안내 참고. 다른 목록·좋아요 보존과 북마크 합집합은 우리 기본안. 원본 전후 기사 수만으로 자동 이전을 단정하지 않음 |
| 기사 제거 | 원본 더보기의 Remove this story를 직접 `이 목록에서 제거` 행으로 제공. Undo·메모·신고 메뉴 제외 |
| 저장·빈 상태 | 윤곽/채움 북마크와 선택 체크, 빈 목록 안내·초록 둘러보기 버튼. 완료 전 체크의 저장 시점은 원본 정적 PNG로 확정할 수 없어 구현 기본안으로 명시 |
| 우리 앱 요소 | 한국어 금융 예시·자체 SVG·단일 좋아요·4단계 설명·로딩/실패/재시도·명시적 저장 상태·48 단위 터치 영역 |
| 남은 차이 | iOS 시스템 영역·웹 inset·한글 길이·시트 높이·아이콘 + 표식·관리 메뉴 위치·성공 토스트 차이. 원본과 픽셀 단위 일치를 주장하지 않음 |
| 제외 | 공개 목록·외부 목록 저장·공유·댓글·메모·다운로드·수동 순서·목록 설명/공개 설정·로그인/로그아웃 UI. 원본 브랜드·사진·기사를 제품 자산으로 복사하지 않음 |

## 검증 결과와 증거

| 검사 | 결과·한계 |
| --- | --- |
| 타입·lint·전체 Jest | `npm run check` 통과: 타입 검사·lint 경고 0, 50 suites·374건. 기존 133개 + 신규 54개 = 187개 논리 테스트를 iOS·Android 각각 실행. 실제 기기 실행 아님 |
| 사용자 목록 상태 | `createUserListStore.test.ts` 27개: 입력·중복 생성/소속·최신 의도·오래된 성공/실패·이름 수정/추가 중 삭제·삭제 실패 복구·늦은 조회·잘못된 응답 |
| 공급부·종합 북마크 | `createMockUserListSource.test.ts` 7개 + `createLibraryStore.test.ts` 4개: 반영 전 실패·재시도·사용자 격리·삭제 기록·합집합·다른 목록 보존 |
| 화면 연결 | `ListManagementNavigation.test.tsx` 10개: 생성→추가→목록→상세→복귀→수정→제거→삭제, 취소·삭제 확인·실패·입력 보존·동일 ID 재시도·기본 목록/좋아요/검색 일치 |
| 범위·열린 시트 | `LibraryInteractions.test.tsx` 6개: A→B→A·공급부 교체의 늦은 성공/실패·Modal 닫기·열린 시트의 외부 변경·삭제된 편집 화면 정리 |
| 기존 회귀 | 기존 133개 논리 테스트 유지. 새 저장 대상 버튼 때문에 기사 제목을 포함한 부분 정규식이 여러 버튼을 찾던 5개 기존 테스트 파일의 조회를 제목 시작으로 좁힘. 검증 행동은 유지 |
| Chrome | 157.0.8103.79, Playwright Core 사용. 정상·목록 조회 실패·생성 실패·이름 수정 실패·삭제 실패·기사 추가 실패·기사 제거 실패·지연의 8개 시나리오 통과 |
| 브라우저 오류·외부 요청 | 8개 결과 JSON의 콘솔 error/pageerror·localhost 외 HTTP 요청 모두 0건 |
| Android JS/Hermes | `npm run export:android` 성공, 1,013 modules, HBC 약 2.2MB. APK/AAB·네이티브 빌드/실행 아님 |
| iOS JS/Hermes | `npm run export:ios` 성공, 1,018 modules, HBC 약 2.2MB. Xcode 빌드·IPA·기기 실행 아님 |
| iOS 네이티브 | `xcode-select -p`는 CommandLineTools. `xcrun simctl list devices available` exit 72, `xcodebuild -version` exit 1. Xcode 부재로 실행·빌드 미검증 |
| Android 네이티브 | Java는 있으나 `adb`·`emulator` 미발견, 일반 SDK 경로 없음, ANDROID_HOME/ANDROID_SDK_ROOT 없음. 실행·빌드 미검증 |
| 새 의존성·설정 | 추가 없음. audit는 이번 범위에서 재실행하지 않았으며 이전 Goal의 경고를 해결했다고 주장하지 않음 |

실행 명령은 FE에서 `PATH=/opt/homebrew/opt/node@24/bin:$PATH npm run check`, `npm run export:android`, `npm run export:ios`이며 Node 24 경로를 적용했다. 신규 54개 논리 테스트와 기존 133개의 합계를 중복 실행 횟수와 구분한다.

자동 검증: [전체 check 로그](evidence/goal9/check.log), [Modal 이벤트 수정 후 양 플랫폼 12건 재검증](evidence/goal9/interactions-check.log), [Android JS 번들](evidence/goal9/export-android.log), [iOS JS 번들](evidence/goal9/export-ios.log). 닫기 이벤트 대상을 실제 Modal로 수정한 뒤 해당 파일의 양 플랫폼 12건을 재검증했고, 저장소 수명을 보완한 최종 코드로 전체 check·두 JS 번들·정상 브라우저 흐름을 다시 확인했다.

브라우저 결과: [정상](evidence/goal9/normal-checks.json) · [조회](evidence/goal9/lists-read-error-checks.json) · [생성](evidence/goal9/create-error-checks.json) · [수정](evidence/goal9/rename-error-checks.json) · [삭제](evidence/goal9/delete-error-checks.json) · [기사 추가](evidence/goal9/add-error-checks.json) · [기사 제거](evidence/goal9/list-remove-error-checks.json) · [지연](evidence/goal9/slow-checks.json). [네이티브 환경 확인](evidence/goal9/native-environment.json)과 [비교 이미지 로드 결과](evidence/goal9/comparison-checks.json)도 보관했다.

### 작은 화면·입력·접근성

390×844, 320×740, PC 1365×900에서 확인했다. 캡처 시 문서/모달의 가로 넘침과 화면 안 조작 영역 최소 48×48을 측정했다. 긴 한글 목록명은 줄바꿈되며 제목을 한 줄로 잘라 숨기지 않는다. 목록·폼·시트는 내용이 길어지면 스크롤하고 완료·삭제·재시도 버튼까지 도달한다.

[320px 목록](evidence/goal9/custom-list-narrow.png), [긴 이름](evidence/goal9/long-name-narrow.png), [큰 글자 목록](evidence/goal9/custom-list-large-text.png), [큰 글자 저장 대상 하단](evidence/goal9/save-to-large-text-bottom.png), [큰 글자 삭제 하단](evidence/goal9/delete-confirm-large-text-bottom.png), [큰 글자 생성 실패·재시도](evidence/goal9/create-error-large-text-bottom.png), [PC 라이브러리](evidence/goal9/library-desktop.png)를 남겼다. 큰 글자 검사는 CSS 글자와 행간 2배이며 **OS fontScale 검증이 아니다**.

폼 입력 포커스, Tab의 모달 내부 순환, Escape 취소와 원래 버튼 포커스 복귀, 명시적 제출, 한글 문자열·합성 composition 이벤트, Enter로 저장하지 않음을 Chrome에서 확인했다. React Native Modal `onRequestClose` 계약은 테스트로 확인했으며 실제 Android 뒤로 가기 제스처 검증과 구분한다.

목록 화면은 상단/좌우 Safe Area를 소유하고 기존 하단 탭은 하단 inset을 담당한다. 모달은 자체 SafeAreaView와 KeyboardAvoidingView(iOS padding/Android height), 스크롤, 입력 후 눌림 처리를 둔다. **실제 키보드 가림·한국어 IME 조합/자동완성·OS 글자 확대·기기 Safe Area·VoiceOver/TalkBack·iOS 스와이프/Android 시스템 뒤로 가기는 미검증**이다. 설치된 네이티브 실행 환경에서 후속 확인해야 한다.

### 검토 중 수정한 문제

- 기본 목록과 사용자 목록을 독립된 소유자로 유지하면서 모든 표시를 합집합으로 파생해 한 목록 삭제가 다른 소속을 지우지 않도록 했다.
- 생성 실패 후 이름을 고쳐 재시도할 때 새 ID가 생기거나 동일 이름 오류에 막히지 않게 같은 실패 항목을 수정했다.
- 삭제/생성/조회 경합과 오래된 응답을 검토해 삭제 ID의 부활·유령 항목을 차단했다. 화면 삭제는 편집 상태의 수명도 끝내도록 분리했다.
- 사용자·공급부 교체 후 이전 폼 입력이 남지 않도록 공유 Provider 범위에 화면 수명을 맞췄다. 저장소 소유를 useMemo 대신 useState로 유지하고 공급부/카탈로그 변경 세대와 사용자 ID를 화면 key로 사용해 최적화 캐시에 정확성을 의존하지 않도록 했다.
- 기사 제거 실패 시 복원된 카드와 상단에 같은 오류가 중복 표시되던 경로를 정리했다. 화면 밖 추가 실패는 상단에서 계속 재시도할 수 있다.
- 웹 Modal이 이미 dialog를 생성하므로 내부 중복 dialog를 제거하고 Modal에 제목을 연결했다. TextInput autoFocus가 모달의 이전 포커스 기록을 덮던 문제는 Modal onShow 이후 포커스로 수정했다.
- 테스트의 닫기 이벤트를 실제 Modal에 전달해 비표준 이벤트 버블링 경고를 제거했다. 기존 회귀 테스트의 모호한 기사 버튼 조회도 보완했다.

검토는 이번 작업 내 자체 코드·테스트 리뷰다. 별도 독립 리뷰어·실기기 리뷰를 받았다고 주장하지 않는다.

## 8081에서 확인할 순서

1. [http://localhost:8081](http://localhost:8081)을 열고 라이브러리 → 새 목록에서 `경제 공부`를 만든다.
2. 홈 기사의 북마크 옆 `⋯` → `경제 공부` 체크 → 완료. 읽기 목록도 함께 체크하면 같은 기사를 여러 목록에 저장한다.
3. 라이브러리 → 경제 공부 → 기사 → `저장 목록으로 돌아가기`로 같은 목록에 복귀한다.
4. 상단 `⋯` → 이름 수정 → 저장. 카드와 상세의 목록명이 함께 바뀌는지 확인한다.
5. 기사 아래 `이 목록에서 제거`를 누른다. 다른 목록에도 저장했다면 종합 북마크는 계속 선택된다.
6. 목록 상단/카드의 `⋯` → 목록 삭제 → 취소를 확인한 뒤 다시 삭제한다. 라이브러리로 복귀하고 원문·좋아요·다른 목록은 남는다.
7. 전체 새로고침하면 메모리 상태가 초기화된다. 저장이 앱 재실행 후 유지되는 제품으로 오해하지 않는다.

장애 재현은 `FE/src/features/bookmarks/data/userListPreview.ts`의 `userListPreviewScenario`를 바꾸고 전체 새로고침한다. `lists-read-error`, `create-error`, `rename-error`, `delete-error`, `add-error`, `list-remove-error`는 해당 사용자/목록/작업의 첫 요청을 반영 전에 실패시키고 재시도는 성공한다. `slow`는 약 1,800ms 지연이다. 기본값 `normal`은 약 350ms다. 기본 읽기 목록 장애는 기존 `bookmarkPreview.ts`를 사용한다. 전달 시 둘 다 `normal`이다.

구현·가능한 자동/브라우저 검증과 증거 기록은 완료했다. 공통 완료 조건 중 실제 모바일 실행·네이티브 빌드·원본 비교·입력/접근성 검증은 환경 부재로 대기다. 구현 보고 시점에는 커밋·push·배포·외부 연동과 Goal 10을 수행하지 않았다.

## 구현 보고 후 커밋 요청

별도 사용자 요청에 따라 Goal 9 코드·테스트·결과 문서·화면 증거를 로컬 커밋으로 기록한다. 기존 374건 테스트 통과 기록과 변경 범위·문서·8081 HTTP 200을 다시 확인했다. 앱 코드는 추가 수정하지 않았으며 원격 push·배포와 Goal 10 구현은 수행하지 않는다.
