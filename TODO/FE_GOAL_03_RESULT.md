# FE Goal 3 결과 기록

작업일: 2026-11-17

상태: **구현·코드 검토·자동 검증 완료 / 기기 실행·원본 화면 비교 검증 대기**.

범위: [FE_GOALS.md의 Goal 3](FE_GOALS.md). 시작 시 작업 트리는 깨끗했고 기준 커밋은 `e8d78ac`였다. Goal 2의 공통 스타일·하단 탭을 유지하면서 홈만 피드로 교체했다. Goal 4·커밋·배포는 수행하지 않았다.

## 구현과 변경 파일

| 파일 | 구현 |
| --- | --- |
| [HomeFeedScreen.tsx](../FE/src/features/feed/HomeFeedScreen.tsx) | 홈 제목·예시 표시, 정렬 전환, FlatList, 초기·추가 로딩, 빈 결과, 오류·재시도, 마지막 페이지 |
| [ArticleCard.tsx](../FE/src/features/feed/components/ArticleCard.tsx) | 출처·제목·요약·선택적 썸네일·날짜·읽기 시간, 선택한 기사 ID 전달 |
| [FeedSortTabs.tsx](../FE/src/features/feed/components/FeedSortTabs.tsx) | 최신·인기·추천 선택 상태와 밑줄, 가로 스크롤, 접근성 이름 |
| [FeedStatus.tsx](../FE/src/features/feed/components/FeedStatus.tsx) | 로딩·빈 결과·오류 안내 및 재시도·더 보기 버튼 |
| [FeedThumbnail.tsx](../FE/src/features/feed/components/FeedThumbnail.tsx) | 자체 작성한 도시·동전 SVG, 이미지 없는 카드 지원 |
| [useFeed.ts](../FE/src/features/feed/useFeed.ts) | 요청 상태, 같은 시점의 중복 요청 차단, 실패 시 기존 목록 보존, 늦은 응답 무시, 기사 ID 중복 제거 |
| [types.ts](../FE/src/features/feed/types.ts), [fixtures.ts](../FE/src/features/feed/data/fixtures.ts), [mockFeedSource.ts](../FE/src/features/feed/data/mockFeedSource.ts) | 화면용 계약과 고정 예시 목록, 2개 단위 페이지·지연·실패 재현 |
| [feedPreview.ts](../FE/src/features/feed/data/feedPreview.ts) | 앱에서 재현할 mock 시나리오 선택, 기본값 `normal` |
| [MainTabs.tsx](../FE/src/app/navigation/MainTabs.tsx) | 홈 컴포넌트 연결. 다른 3개 탭·방문 이력 방식 유지 |
| [BottomTabBar.tsx](../FE/src/app/navigation/BottomTabBar.tsx), [tokens.ts](../FE/src/shared/theme/tokens.ts) | 탭 그룹 이름 `주요 메뉴`, 작은 정보용 caption 스타일만 추가 |
| [FE README](../FE/README.md) | 현재 구조·상태 재현·검증 방법 갱신 |

카드 선택 경계는 `onSelectArticle(articleId)`다. 테스트에서는 선택한 ID 하나만 전달되는지 확인했다. 실제 앱의 기본 callback은 `기사 상세 준비 중` 안내를 표시한다. 상세 경로·본문·뒤로 가기 흐름은 구현하지 않았다.

화면과 데이터 공급부를 분리했으며 네트워크 호출은 없다. TanStack Query 기본안을 검토했지만, 이번에는 공유 서버 상태가 없는 fixture 전용 범위이므로 기능 내부 hook으로 한정했다. 이후 실제 API 연결 시 다시 검토한다. `types.ts`의 cursor·필드와 mock의 숫자 문자열 cursor는 서버 API 계약이 아니다.

## Medium 참고 근거와 적용 범위

보관된 원본 홈 캡처 **1장**을 로컬 이미지 도구로 열어 확인했다. 새 Gummble MCP 조회·실제 Medium 앱 조작·전체 200장 조사를 한 것은 아니다.

- 앱: `medium-ios`, 플랫폼 iOS. 기존 조회 응답의 선택 버전 `Latest`, ID `1419`에 해당 홈 화면이 포함되어 있다. 실제 앱 배포 버전은 미확인이다.
- 화면 ID: `sc_5e0ba0e498ff49579bf838096aec4b5e`.
- [원본 홈 화면](https://gummble.com/screens/sc_5e0ba0e498ff49579bf838096aec4b5e), 최초 조회·이번 재확인일: 2026-11-17.
- 로컬 파일: `C:\Users\leehg\AppData\Local\Temp\kostolany-gummble-research-20261117\medium-first-screens-content-0.png`. 임시 보관 파일이며 저장소에 복사하지 않았다.
- 기존 전체 조사: [Medium 참고 기록](../AGENT/UXUI_AGENT/MEDIUM_REFERENCE.md).

| 원본에서 관찰한 부분 | 이번 적용 |
| --- | --- |
| 홈 제목 아래 가로 탭과 선택 밑줄 | 기존 글자·간격 토큰을 이용한 최신·인기·추천 탭 |
| 출처/작성자 → 제목·요약과 오른쪽 썸네일 → 날짜 정보 | 같은 정보 위계의 자체 기사 카드 |
| 밝은 배경·진한 제목·넓은 여백·얇은 구분선 | Goal 2 토큰을 유지한 카드 목록 |
| 동일한 하단 아이콘 메뉴 | Goal 2의 4개 메뉴·전환 동작 유지 |

최신·인기·추천의 의미, 예시 콘텐츠 표시, 상태 안내, `기사 더 보기` 버튼, 상세 준비 중 안내는 자체 적용이다. 원본의 동작을 정적 캡처로 확인한 것으로 기록하지 않는다. 자동 무한 스크롤·당겨서 새로고침은 추가하지 않았다. 원본의 알림·글쓰기·박수·댓글·메뉴·작성자 프로필은 이번 범위에서 제외했다. Medium 로고·글·사진 대신 직접 작성한 예시와 SVG를 사용했다.

수치·폰트는 Medium 소스에서 추출한 값이 아니다. 카드 좌우 여백 24, 상하 32, 제목 20/28, 요약 16/26, 보조 정보 13/20, 썸네일 80×64를 앱의 시작 값으로 사용했다. 작은 화면(폭 360 미만)이나 글자 확대(fontScale 1.3 초과)에는 썸네일을 아래로 배치하며 글자 확대·본문 줄 수를 제한하지 않는다. 실제 배치·수치 일치는 검증 대기다.

## fixture와 상태 재현

최신 4개·인기 3개·추천 3개의 서로 다른 고정 배열을 제공한다. 실제 정렬·조회수 집계·개인화 추천은 없다. 날짜·읽기 시간도 고정 예시 값이다. 각 정렬은 2개씩 조회하며 마지막 `nextCursor`는 `null`이다.

[feedPreview.ts](../FE/src/features/feed/data/feedPreview.ts)의 `feedPreviewScenario`를 바꾸고 앱을 전체 Reload하면 아래 상태를 재현하도록 구성했다. 실제 기기에서의 재현 확인은 대기 중이며 테스트는 같은 공급부 또는 제어 가능한 응답을 주입했다.

| 시나리오 | 동작 |
| --- | --- |
| `normal` | 250ms 지연, 첫 목록 → 기사 더 보기 → 마지막 페이지 안내 |
| `empty` | 빈 결과 안내, 추가 요청 없음 |
| `initial-error` | 정렬별 첫 요청 한 번 실패 → 다시 시도 성공 |
| `page-error` | 정렬별 추가 페이지 한 번 실패 → 기존 목록 유지 → 같은 cursor로 재시도 성공 |
| `slow` | 요청마다 10초 지연, 초기·추가 로딩 상태 |

실패 이력은 공급부 인스턴스 메모리에만 있으며 전체 Reload로 초기화한다. 정렬 변경 시 새 목록 수명으로 첫 페이지부터 조회한다. 이미 정리된 목록의 늦은 응답은 무시한다. 하단 메뉴로 이동했다 홈으로 돌아올 때 정렬과 목록 상태를 유지하는 JS 동작을 테스트했다. OS 앱 종료 후 복원·영속 저장은 구현하지 않았다.

## 테스트와 코드 검토

| 테스트 파일 | 설정당 건수 | 검증하는 동작 |
| --- | --- | --- |
| [App.test.tsx](../FE/src/app/App.test.tsx) | 5 | 기존 4개 탭·선택 상태·재선택·모의 뒤로 가기, 홈 복귀 후 피드 선택 유지 |
| [HomeFeedScreen.test.tsx](../FE/src/features/feed/HomeFeedScreen.test.tsx) | 11 | 정렬/데이터 일치, 카드 ID 전달, 로딩·빈 결과, 첫/추가 조회 재시도, 중복 기사 제거, 마지막 페이지, 이전 정렬의 성공/실패·추가 응답 무시, Strict Mode 재시작, 상세 준비 중 안내 |
| [useFeed.test.ts](../FE/src/features/feed/useFeed.test.ts) | 1 | 같은 시점의 추가 요청 3회를 1회로 제한, 마지막 페이지 이후 요청 차단 |
| [mockFeedSource.test.ts](../FE/src/features/feed/data/mockFeedSource.test.ts) | 3 | 첫/추가 요청 실패 후 복구, 페이지 경계와 기존 페이지 보존 |

총 20개를 iOS·Android 설정에서 각각 실행해 **40건 통과**했다. 실제 화면·navigator를 mock하지 않았고 데이터 공급부와 네이티브 Jest 환경만 대체했다. 화면 상태·행동 테스트이며 실제 기기 E2E나 원본 화면 비교는 아니다.

검토에서 발견한 문제와 수정:

- 요청 시작 시 effect에서 동기 상태를 바꾸는 코드가 lint 규칙에 걸렸다. 최초 로딩은 초기 state, 재시도·추가 로딩은 사용자 이벤트에서 관리하고 응답은 비동기 경계에서 반영하도록 수정했다. 동기 adapter 예외도 실패 응답으로 처리하며 lint 억제는 추가하지 않았다.
- 빠른 추가 요청을 state만으로 차단하면 같은 렌더 안의 연속 호출이 중복될 수 있어 수명별 `inFlight` 가드를 두고 테스트했다. 각 effect 수명의 활성 여부로 정렬 변경·Strict Mode 정리 후 응답을 차단한다.
- 작은 화면에서 세로 배치로 전환할 때 본문 flex가 높이에 영향을 줄 수 있어 세로 배치의 flex·너비를 별도로 지정했다. 실제 잘림·간격 확인은 기기 검증 대기다.
- 상단 정렬 탭이 생기면서 기존 테스트의 전체 tab 개수 질의가 충돌했다. 상단 `피드 정렬`·하단 `주요 메뉴` 그룹을 구분하고 각 그룹 안에서 실제 tab 역할·선택 상태를 검사한다. 테스트를 위해 그룹 전체를 접근성 포커스 대상으로 묶지 않았다.
- 추가 페이지 실패는 기존 기사와 cursor를 보존하며, 로딩 중에는 추가 버튼을 숨긴다. 마지막 페이지에는 요청 버튼을 제거한다. API·인증·외부 데이터 호출, 새 dependency, 다음 Goal 코드가 없음을 확인했다.

기술 근거: [React Native FlatList](https://reactnative.dev/docs/flatlist), [React effect 정리](https://react.dev/reference/react/useEffect), 설치된 RNTL v14 `docs/guides/llm-guidelines.md`.

## 실제 검증 결과

실행 위치: `D:\git_repository\kostolany_project\FE`, Windows PowerShell. 아래 명령은 `npm.cmd`로 실행했다.

| 검증 | 결과 |
| --- | --- |
| `npm.cmd run check` | exit 0: 타입 검사 → lint → 전체 테스트 통과 |
| TypeScript strict / ESLint `--max-warnings=0` | 통과, 테스트 파일 포함 |
| Jest iOS | 4 suites, 20건 통과 |
| Jest Android | 4 suites, 20건 통과 |
| 전체 Jest | 8 suites, 40건 통과, 스냅샷 0개 |
| `npm.cmd run export:android` | exit 0, 954 modules, 약 2.1MB Hermes 번들, `dist/android` |
| `npm.cmd run export:ios` | exit 0, 959 modules, 약 2.1MB Hermes 번들, `dist/ios` |
| 정적 코드·문서 검사 | `git diff --check` 통과. 변경 문서 4개·상대 링크 51개와 새 소스 14개의 UTF-8·공백·외부 호출 표식 확인 |
| 실제 Android 실행·원본 비교 | 검증 대기: 사용자 기기·Android SDK·에뮬레이터 없음 |
| 실제 iOS 실행·원본 비교 | 검증 대기: 사용자 기기·macOS/Xcode 없음 |
| APK·AAB·IPA 빌드·설치·배포 | 미실행 |

번들 생성은 JS/Hermes 변환 검증이며 네이티브 앱 빌드·실행 증거가 아니다. 번들 로그의 색상 환경 변수 충돌 경고(`NO_COLOR`/`FORCE_COLOR`)는 남았지만 종료 코드는 0이었다. 생성물은 Git에서 제외한다.

의존성·lockfile은 변경하지 않았다. 이번에는 패키지 재설치·Expo doctor·npm audit를 다시 실행하지 않았다. 이전 Goal의 의존성 경고와 진단 결과는 해당 시점 기록이며 이번에 해결하거나 재검증했다고 표현하지 않는다. Supabase·백엔드·RSS·AI·Google 인증·실제 정렬 및 추천은 연결하지 않았다.

## 완료 조건과 검증 대기

Goal 3 범위의 구현·테스트 작성·코드 검토·가능한 자동 검증·기록은 완료했다. **공통 완료 조건의 실제 기기 실행과 원본 화면 비교는 충족하지 못했다.** 사용자에게 기기가 없으며 현재 환경에도 Android 실행 도구와 macOS/Xcode가 없어 검증 대기로 남긴다.

기기가 준비되면 두 플랫폼에서 정상/실패 시나리오, 실제 스크롤·목록 끝, 하단 탭 왕복과 위치 유지, 작은 화면·가로 방향·큰 글자·Safe Area, VoiceOver/TalkBack, 준비 중 Alert를 확인한다. 원본과 카드·탭·여백·글자 위계를 나란히 비교해야 한다. 자동 테스트만으로 이를 완료 처리하지 않는다.

요청한 Goal 3의 가능한 작업까지 수행하고 커밋·원격 push·배포 없이 종료했다. 이후 별도 사용자 요청에 따라 산출물을 `onehandsales/kostolany`의 `main`으로 커밋·push하는 범위가 승인됐다. 실제 동기화 결과는 로컬·원격 커밋과 Git 상태로 확인한다. Goal 4는 시작하지 않으며 배포도 수행하지 않는다.
