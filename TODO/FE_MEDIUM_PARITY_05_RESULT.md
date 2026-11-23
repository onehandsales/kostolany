# Medium Parity 5 — 관계·추천 관리

2026-11-23, macOS. 시작 HEAD `68532565c87ae68fdf294ab7faff75b61c4d09e4` (`ㅁㄴㅇ`), 시작 작업 트리는 깨끗했다. 범위는 [실행 계획 묶음 5](MEDIUM_PARITY/EXECUTION_PLAN.md#batch-05)의 D06/V11/V14/V15다. 묶음 2와 4 결과는 구현 이력으로 읽고 현재 검사를 별도로 실행했다. 커밋·push·배포·묶음 6은 수행하지 않는다.

**판정:** D06의 동적 사용자 관계 목록·이름·해제 연결을 수정했다. V11/V14/V15의 기존 mock 행동을 재검증하고 목록 배치·팔로우 표시·메뉴 수명을 보완했다. 시각 동일성은 미완료이고, 원본 미확인 및 실제 native 검증은 남는다. 실제 인증·신고·추천 서비스나 출시 완료가 아니다.

사용자의 마지막 지시인 **“절대로 evidence는 만들지마”**를 적용했다. 새 evidence 폴더, 이미지 파일, 캡처 로그, manifest를 만들지 않았다. 브라우저 캡처는 메모리에서 열람하고 결과만 이 문서에 남긴다. `6853256`에서 삭제된 기존 EVIDENCE는 복원하지 않았다. 과거 결과의 경로·수치는 당시 이력이며 현재 파일 존재나 현재 코드 통과를 의미하지 않는다.

## 변경과 결함

| 항목 | 재현·원인 | 수정·검증 |
| --- | --- | --- |
| D06 동적 사용자 누락 | 실제 8081에서 A가 검색한 B를 Follow하면 프로필은 `1 following`인데 Refine Following은 빈 상태. 검색만 mockUsers/확정 프로필을 합치고 관리 목록은 정적 directory를 읽음 | `useIdentityCatalog`에서 DirectorySource + mockUsers + 확정 공개 프로필을 ID/kind로 결합. 검색·공개 프로필·내 Following·Refine·Blocked가 같은 카탈로그를 소비. 수정 전 navigation 회귀가 iOS/Android 모두 같은 누락에서 실패했고 수정 후 연결/해제 통과 |
| 차단 목록의 오래된 이름 | Blocked는 별도의 정적 이름 함수 사용 | 같은 카탈로그로 변경. B가 이름·소개를 저장하고 A 재로그인 후 새 이름으로 Unblock/Unmute/Unfollow. 이름을 소유권 키로 사용하지 않음 |
| 팔로우 팝오버 재등장 | 닫힌 뒤 늦게 도착한 `measureInWindow`가 메뉴를 다시 열 수 있음 | 위치 요청 세대와 닫기/해제/언마운트 경계를 연결. 공개 프로필 focus 변경 시 열린 메뉴·메시지 수명 종료. 닫기와 이탈 후 늦은 측정 회귀 통과 |
| 목록 소개문 배치 | 이름·소개와 Follow 버튼을 옆 열로 배치하여 소개가 좁아지고 과도하게 줄바꿈 | 추천 행과 공개 Following 행을 이름/행동 + 전체 폭 소개로 배치. 아바타 32, 클릭 영역 48, 이름 진입 및 아바타 터치 유지. Following writer/publication의 chevron·옅은 테두리 보완. Topic은 메뉴 chevron 없음 |
| 공개 디렉터리 교체와 개인 상태 | DirectoryProvider를 moderation 위로 옮길 때 기존 fallback/injected key가 하위 저장소·navigation까지 재생성할 수 있음 | 공급부 교체는 기존 조회 세대 보호로 처리하고 subtree key 제거. 실제 navigation에서 B를 팔로우하고 Following에 진입한 채 source 교체 후 같은 화면·관계 유지 |
| 대상 kind 구분 | writer와 publication에 같은 문자열 ID가 들어올 때 공개 프로필 덮어쓰기 가능성 | 확정 프로필 이름·소개·사진 조회는 writer에만 적용. 자기 자신은 Suggestions에 추천하지 않음 |

주요 코드: `community/useIdentityCatalog.ts`, `DirectoryProvider.tsx`, `ConnectionsScreen.tsx`, `PublicIdentityScreen.tsx`, `FollowControl.tsx`, `recommendations/RefineRecommendationsScreen.tsx`, `search/CatalogSearchResults.tsx`, `moderation/ModerationDialogs.tsx`, `app/navigation/AppNavigator.tsx`. 새로운 저장소·외부 의존성·제품 기능을 추가하지 않았다.

## 상태와 실패·경합 계약

- 관계/이메일은 userId별 RelationshipStore, 음소거/차단/신고는 userId별 ModerationStore가 소유한다. 대상은 `kind:id`; auth revision과 source generation은 화면·오류·초안 수명을 구분한다. 이름 변경은 ID·auth revision·관계 데이터를 바꾸지 않는다.
- 공통 카탈로그는 파생 조회다. 별도 가변 사용자 저장소를 만들지 않으며 편집 초안·비공개 설정을 공개 목록에 합치지 않는다. `useKnownProfiles`의 저장 완료 값만 사용한다. 디렉터리 loading/error는 ready로 꾸미지 않는다.
- follow/email 쓰기는 기존 직렬 처리와 마지막 의도를 유지한다. 늦은 조회 성공/실패, 이메일 실패/재시도, 중복 명령, 차단 중 늦은 팔로우 거부는 기존 store 테스트를 다시 실행했다.
- mute는 follow/email과 별개다. block은 현재 mock에서 기사 접근·새 follow를 막지만 기존 소속/저장을 삭제하지 않는다. 차단 해제 뒤 기존 follow가 유지된다. 추가 재검토에서 차단 중 명시적 Unfollow도 허용했으며 follow/email만 해제하고 mute/block은 유지한다. 신고는 접수 mock이며 Also block을 선택한 경우에만 차단을 동반한다.
- 메뉴를 닫는 것은 이미 보낸 관계 쓰기의 롤백이 아니다. 확정 데이터와 이전 메뉴·토스트·오류의 노출 수명을 구분한다. source A→B→A에서 이전 성공이 새 명단을 덮지 않는 테스트를 추가했다.
- 신고 취소는 초안을 폐기하며 실패는 선택·설명을 유지한다. 중복 제출은 busy/idempotency 경계로 묶인다. 취소를 무시하는 늦은 성공/실패가 A→B→A의 새 신고 초안·선택·토스트에 섞이지 않는 회귀를 추가했다.
- 메모리 정책을 유지한다. 같은 실행의 A→B→A는 확정 개인 데이터를 복원하고, 전체 새로고침은 초기화한다. 영속 저장·외부 계정 연동은 없다.

## 원본·R/T/U/C 대조

직접 대상 21개 PNG와 연결된 9개 흐름의 ANALYSIS를 읽었다. R 125개, T 30개, U-S 21개와 U-F 9개를 [comparisonBaseline.json](MEDIUM_PARITY/comparisonBaseline.json)에 연결해 확인했다. 추가로 묶음 4의 S168 PNG와 기사 메뉴를 재검토했다. 전체 200개 화면을 새로 실행했다는 뜻은 아니다.

아래 각 행은 해당 S의 R-L/D/S 및 표시한 모든 R-C를 포함한다. 원본 링크·관찰 문장·개별 R-ID는 [화면별 비교 조건](MEDIUM_PARITY/COMPARISON_BASELINE.md)과 REQUIREMENTS에 유지한다. 브라우저의 부분 대조는 원본 동일성 통과가 아니다.

| 화면 / R-C 범위 | 현재 실행·처리 | 원본 차이·미확인 |
| --- | --- | --- |
| S022 C01~02 | Following의 Writers(1)/Topics(3), Kim·세 topic, See all 유형 전환 | 대체 서체/줄바꿈·OS 영역·선택된 하단 탭 차이 |
| S025 C01 | Following pill, Stories/Lists/About, 관계 유지 | 서체·간격·기사 반응 수 차이 |
| S033 C01 | Suggestions All의 Kim/Zulie/F. Perry와 Follow, 소개 폭 수정 | 추가 fixture 작가와 전체 목록 순서·분량은 자체 mock |
| S038 C01~03 | Jordan Lists→AAA AI·2 stories·목록 열기/복귀, 저장/메뉴 기존 경로 | AAA AI 상세는 캡처 2 stories 중 현재 본문 0개인 기존 sample 한계를 안내한다. 해당 공개 목록 묶음과 이미지 비율/간격 잔여 |
| S048 C01~05 | Stories·고정 글·10.2K/25·Friend 배지, 기사 진입/복귀 | 고정 글 응답 18/59 원본 대비 현재 mock 0; 기사말미 24와 profile 25는 독립 snapshot |
| S049 C01~04 | Follow 성공 토스트·이메일 메뉴·On/Off 선택 | 원본 On 관찰을 전체 기본값으로 단정하지 않음. 기존 mock 신규 follow 기본 Off 유지 |
| S083 C01~02 | About 두 문단·member October 2023/Friend December 2023 구분 | 회원 시작 월은 계정 가입일 아님. 현재 website 줄은 원본에서 미관찰한 자체 항목 |
| S090 C01~03 | 작가/publication 혼합 Following, 이름·아바타 진입, Follow | 캡처 밖 전체 명단/소속은 미확인; 기존 자체 안내 유지 |
| S093 C01~06 | 다른 캡처 상태를 원본에서 확인, 현 구현과 차이 기록 | 10.8K·Stories/About·Follow/Lists 부재는 별도 snapshot. 차단의 확정 결과로 재현/완료 처리하지 않음 |
| S099 C01~03 | Suggestions Topics, Programming/Self Improvement/Data Science/Writing/Relationships, 팔로우 전환 | 실제 추천 알고리즘·추가 페이지 결과 미확인 |
| S103 C01~02 | Following 재진입·Email On/Off와 Unfollow, 선택 표시 | 팔로우·이메일은 별도 필드; 원본의 unfollow 후 구독 정책 미확인 |
| S104 C01 | 모두 해제 후 Following 빈 문구 | empty 조건 원본 확인; 글꼴·정확 위치/OS 영역 차이 |
| S127 C01 | Spam 선택·Also block 별도 체크·Report 활성 | 추가 상세 입력은 자체 보완 |
| S130 C01 | Unfollow 토스트·Follow 복귀·관리 목록 제거 | 정확 토스트 크기·수명은 자체 정책 |
| S143 C01~05 | Share/Mute/Block/Report/Cancel 순서, 파랑/빨강 및 취소 | 공유 자체 효과는 기존 별도 범위. native blur/OS 여백은 비동등 |
| S151 C01~03 | 세 topic Following·나머지 Follow·See more, 필터 간 공유 | 원본 밖 확대 결과·추천 순서는 mock. follow가 추천 행을 없앤다고 가정하지 않음 |
| S152 C01~02 | Mute 토스트·독립 follow 유지·Muted 목록 해제 | 앞뒤 다른 follow 상태를 mute의 효과로 단정하지 않음 |
| S161 C01~09 | 사유 4개·독립 Also block·미선택 비활성·취소·링크 진입 요소 | 외부 정책 페이지는 열지 않음. 추가 설명·Demo 안내·확인 시트는 자체 UI |
| S170 C01~02 | 신고 성공·중복 제출 보호·비차단 신고 뒤 Follow 유지 | 실제 전송·제재·수신 확인이 아님 |
| S194 C01~04 | All/Writers/Publications/Topics, 선택 체크·메뉴 닫기 | 원본에 미수록된 유형별 결과는 자체 mock |
| S199 C01~02 | Block 토스트·설정 차단 목록·취소/해제 | 원본은 토스트 뒤에도 카드가 보임. 앱은 기존 접근 제한 정책 유지하며 시각 차이로 남김 |
| S168 인계 C01~05 | Show less→확정→Undo, Follow/이메일, Mute, Report story→취소; Display 진입 기존 연결 | 기사 본문/반응 수·정확 서체·표시 설정의 나머지 비교는 묶음 4/10 경계 |

직접 흐름: T-F12-02/04/05, T-F13-01~04, T-F17-02~04, T-F18-01~04, T-F19-01~04, T-F20-01~02, T-F21-01~02, T-F22-01~03, T-F23-01~05. 원본의 흐름명/연속 캡처와 현재 mock에서 실제 실행한 명령의 인과관계를 구분한다.

U-S022/025/033/038/048/049/083/090/093/099/103/104/127/130/143/151/152/161/170/194/199 및 U-F12/13/17/18/19/20/21/22/23은 원본의 미수록 상태·효과·오류·기기/계정 조건을 그대로 유지한다. Muted 내용, 추가 목록/필터 결과, 이메일 기본값/해제 정책, 차단 효과, 신고 추가 입력/중복/접수 효력은 mock 실행만으로 원본 확인으로 승격하지 않는다.

| 연결 C | 이번 범위에서의 처리 |
| --- | --- |
| C01/02/03/09/36/53/58/59/60/61/65/66/67/71 | source/ID/수명·모바일 UI·48 터치·접근성·실패/재시도·플랫폼 구분을 적용. 관련 자동/웹 검사와 native 잔여를 별도로 기록 |
| C05/07/12/18/21/22/23/24/25/26/70 | 검색→공개 프로필→follow/email→mute/block/report→관리 목록·추천·기사 복귀를 기존 계약에 연결. 이력/목록/공유/외부 효력 등 각 C의 전체 제품 범위를 이번에 완료한 것으로 확대하지 않음 |

## 두 차례 자체 검토

1. **1차:** 검색·관리 목록의 데이터 경계, 저장 완료 프로필과 편집 초안, follow/email/mute/block 분리, 원본 21개 상태와 실패 테스트를 검토했다. D06·차단 이름·소개 폭·목록 chevron·메뉴 늦은 측정 문제를 수정했다. 실제 navigation 테스트에서 수정 전 누락을 확인하고 수정 후 통과시켰다.
2. **2차:** 변경 diff와 provider 배치, source 교체/A→B→A, 신고 취소를 무시한 응답, 작성자 kind, 아바타/이름 진입과 작은 폭을 다시 확인했다. DirectoryProvider의 subtree 초기화를 제거하고 공급부 변경 후 navigation/관계 유지 회귀를 보강했다. 이름 필드는 writer에 한정하고 아바타 터치도 유지했다. 독립 리뷰어를 사용한 검토는 아니다.

검사 과정의 실패도 구분한다. 초기 D06 회귀는 의도한 재현 실패였다. 신규 테스트 작성 중 실제 설정 복귀 label과 신고 타입/cleanup timer를 맞춘 후 다시 검사했다. 첫 전체 검사는 기존 iOS AuthNavigation 1건이 15초 제한을 초과했으며, 코드/시간 제한 변경 없이 단독 5건은 28.842초에 통과했다. 브라우저 조작 도구의 모달/버튼 동명 selector와 transition 대기 오류는 도구를 고쳐 재실행했고 앱 console 오류로 기록하지 않았다.

## 추가·수정한 회귀 테스트

| 파일 | 의미 있는 검증 |
| --- | --- |
| `app/navigation/RelationshipManagementNavigation.test.tsx` (신규 2건) | 실제 stack/tab navigation으로 검색 B→Follow→내 Following→공개 프로필→Refine→해제. 디렉터리 source 교체 후 화면/관계 유지. A→B 이름·소개 저장→A 복귀→Blocked/Muted/Following 각각 취소/해제 |
| `community/FollowControl.test.tsx` (2건 추가) | 닫기 또는 공개 화면 이탈 후 늦은 위치 측정이 메뉴를 되살리지 않음. 기존 A/B 늦은 성공/실패 검사도 재실행 |
| `community/DirectoryProvider.test.tsx` (1건 추가) | source A→B→A 역순 성공을 버리고 최신 카탈로그와 중복 없는 동적 ID 유지 |
| `moderation/ModerationDialogs.test.tsx` (신규 2건) | 취소를 무시한 신고 성공/실패가 A→B→A의 새 사유·Also block·초안·오류/토스트를 덮지 않음 |

위 7개 논리 사례는 iOS/Android Jest 두 프로젝트에서 실행한다. navigation 통합 검사에서 navigation 전체를 mock으로 대체하지 않았다. 실패·이메일 재시도·Show less/Undo·Mute 해제 실패·신고 선택/실패 재시도·공개 프로필/목록 복귀는 기존 Community/Recommendations/Moderation/SearchCategories navigation 및 relationship/moderation store 검사도 활용했다.

## 최초 보고 시 실행 결과

추가 재검토 이후의 최신 검사는 [아래 추가 검토](#additional-review)를 따른다. 아래 수치는 최초 보고 시점의 이력이다.

- Node **24.10.0**, npm **11.6.0**, FE engines `>=24 <25`. `.nvmrc`의 24.18.0과 minor 차이가 있다. 루트 shell의 Node22로 FE 검사를 수행하지 않았다.
- 최종 `npm run check`: **종료 코드 0**. `npm run typecheck`·`npm run lint`·전체 `npm test` 모두 통과. 최종 전체 결과는 **288 suites / 1518 tests 통과, 467.195초**다. 마지막 아바타 터치 보정과 정상 preview 복원 이후의 현재 코드 검사다.
- 관련 navigation·FollowControl: 10 suites / 28 tests 통과. source 교체·신고 수명 추가 후 관련 6 suites / 12 tests 통과. 두 수치를 전체 검사로 합산하지 않는다.
- 첫 `npm test`: 286 suites 중 285 통과/1 실패, 1512 tests 중 1511 통과/1 timeout, 818.7초. 다음 전체 재실행은 **288 suites / 1518 tests 통과, 506.056초**였다. 이 실행에는 기존 LibraryInteractions의 VirtualizedList act 경고가 1회 있었고 실패는 없었다. 이후 마지막 보정과 정상 설정 복원 후 위 최종 `npm run check`까지 통과했다.
- 최종 `npx expo export --platform ios --platform android`: **종료 코드 0**, 각 Hermes `.hbc` 생성 통과(Android 9.101초, iOS 15.567초). 임시 빌드 산출물은 확인 후 정리했다. 색상 출력 환경변수 경고가 있었지만 번들 오류는 없었다. 실제 native 실행/빌드와 다르다.
- 8081 실패 재현: relationship `email-error`, moderation `write-error`를 잠시 적용해 이메일 실패→재시도 On, 신고 실패→Spam/Also block/한글 설명 보존→재시도 성공·차단을 실제 확인했다. 두 preview 파일은 정상 `normal`로 정확히 복원해 Git diff가 없고, 새로고침으로 실패용 세션을 폐기했다.
- 8081 Chromium: 검색 B→Follow/Mute→프로필 숫자·Following·Muted, B 이름/소개 저장·A→B→A, Blocked/Muted/Following 각각 해제, 이메일 On→Off 빠른 변경, 메뉴 취소, 신고 미선택/선택/Also block/취소/중복 제출/성공, 원래 기사 복귀를 조작했다. 해당 흐름의 수집된 app console error/unhandled rejection은 0.
- CP-WEB-01 부분 비교: 390×844 CSS px, DPR1, UTC/en-US, JS now `2025-06-13T12:00:00.000Z`, Light, 기본 글자, 웹 inset0. 원본 1179×2556 PNG와 전체 영역으로 대조했으며 DPR을 역산하거나 임의 crop/유사도 점수를 만들지 않았다. 초기 기능 재현은 기본 데스크톱 폭으로도 수행했고 이를 390 비교와 구분한다.
- 320×640 + CSS 본문/컨트롤 글자 150% 신고·추천 화면: 줄바꿈·스크롤·긴 한국어 입력·하단 Report·닫기 확인, 수평 overflow 없음. 취소 후 포커스 `Story options`로 복귀. 추천의 긴 이름 줄바꿈, 4개 필터 행 48px, 수평 overflow 없음도 확인했다. Escape로 필터를 닫으면 `Filter recommendations: All`로 포커스가 돌아온다. 아바타 실제 좌표 클릭으로 Kim/Jo 프로필 진입도 확인했다. 실제 OS Dynamic Type/IME/키보드 가림 검증이 아니다.
- iOS: `xcode-select -p`는 CommandLineTools, Xcode.app 없음, `xcrun simctl` 실행 불가. 실제 build/시뮬레이터/기기 실행 대기.
- Android: adb/emulator PATH 도구 및 `~/Library/Android/sdk` 없음. JDK17/21/23은 있지만 SDK/AVD가 없어 실제 build/기기 실행 대기. native 디렉터리를 생성하거나 도구를 설치하지 않았다.
- 비교 문서의 엄격한 과거 증거 검사는 사용자 삭제로 capture log/PNG가 없어 완료할 수 없다. 파일을 복원하거나 검사를 거짓 통과시키지 않는다. 현재 R/T/U/C 배정·경로·생성 문서 정합성은 독립 검사로 통과했다: 200 S/273 T/263 U/72 C, 묶음 5의 21 S/125 R/30 T/30 U. 현재 생성 문서는 extract/render 결과와 일치하고 기존 R/T/U/C·원본 이미지 해시·과거 evidenceContext를 변경하지 않았다. 엄격한 validate는 삭제된 과거 캡처 때문에 34개 진단을 반환한다. generator는 삭제된 입력 hash를 null로 명시하고 OS별 경로 정렬 차이를 제거했으며, 엄격한 파일 존재 검사는 완화하지 않았다.

## 8081 최종 확인 순서

1. `http://localhost:8081`을 새로고침한다. Profile에서 모의 로그인 A를 선택하고, 필요하면 자동 온보딩을 닫는다. 실제 Google 계정은 사용하지 않는다.
2. Explore→검색→People에서 `예시 독자 B`를 찾는다. Follow를 누르고 이메일 메뉴를 닫는다. B 프로필 더보기→Mute→확정한다.
3. Profile의 `1 following`→My following에서 B를 연다. 뒤로 돌아가 Settings→Refine recommendations의 Following/Muted에서 같은 B를 확인한다. 각 유형 필터와 See all을 눌러본다.
4. B 프로필에서 Block 취소·확정을 시험한다. Settings→Account→Blocked users에서 B를 확인하고 일단 닫는다.
5. Settings에서 로그아웃하고 B로 로그인한다. B의 My following은 A와 다르다. Edit profile에서 이름과 소개를 저장한다. 로그아웃→A 로그인 후 Settings→Account→Blocked users에서 변경된 B 이름으로 해제한다. Cancel은 유지, Confirm은 제거다.
6. Refine→Muted에서 변경된 이름/소개를 확인하고 Unmute한다. Following에는 여전히 남아 있다. Following 메뉴의 이메일 On/Off를 바꾼 뒤 Unfollow한다. 목록과 프로필 숫자가 함께 바뀌는지 확인한다.
7. 검색에서 Jordan Gibbs→Stories/Lists/About, AAA AI, Following list와 복귀를 확인한다. Follow→Email on/off→Unfollow, 더보기의 Mute/Block/Report/Cancel을 확인한다.
8. Report를 열면 미선택 제출은 비활성이다. 사유와 Also block은 별도 선택이다. 설명을 쓴 뒤 취소하고 다시 열면 초안은 없어야 한다. Also block을 끄고 제출하면 신고 토스트가 나타나고 Follow는 유지된다.
9. Jordan의 ChatGPT 기사→Story options에서 5개 행을 확인한다. Follow/Mute는 작가, Report story는 기사 대상이다. Show less 확정→Undo→Close 후 기사에 복귀한다.
10. Settings→Refine→Suggestions에서 All/Writers/Publications/Topics와 See more를 확인한다. Kim과 Self Improvement/Writing/Relationships를 팔로우하면 Following에서 Writers(1)/Topics(3)를 확인할 수 있다. 마지막 전체 새로고침에서 메모리 계정·관계가 초기화된다.

실제 native에서 남은 항목은 OS Safe Area, 화면 회전, 큰 글자, VoiceOver/TalkBack, 키보드 가림, 한글 조합·제출, Android 뒤로/네이티브 모달과 스크롤이다. Xcode/iOS runtime 및 Android SDK/AVD 또는 연결 기기가 필요하다. 브라우저/Jest/Hermes를 그 검증의 대체로 표현하지 않는다.

권장 커밋 메시지: `fix(fe): unify relationship catalog and refine recommendation management`.

최초 보고 시 변경은 FE 코드·테스트·문서 및 Parity 생성기/추적 원본 26개 경로였다. `git diff --check` 통과, HEAD `6853256` 유지, 8081 정상 미리보기 유지, 모든 장애 재현 설정 정상값 복원, EVIDENCE 및 새 캡처 파일 없음. 묶음 5 결과 보고에서 종료한다.


<a id="additional-review"></a>

## 사용자 요청 후 추가 재검토

2026-11-23. 사용자의 “누락된 부분은 없어?” 요청으로 같은 HEAD와 미커밋 변경을 다시 검토했다. 기존 통과 수치를 현재 결과로 대신하지 않았고, 최종 수명 대조를 포함해 아래 네 가지 누락을 추가로 발견했다.

| 누락 | 원인·수정 | 검증 |
| --- | --- | --- |
| 기사·검색·관계/추천 관리의 팔로우 메뉴 수명 | 최초 수정은 공개 프로필만 `active`를 전달했다. 다른 진입점이 유지된 채 포커스를 잃으면 이전 메뉴가 남을 수 있었다. 기사 헤더/하단/더보기, 탐색·검색 결과, Connections, Refine에 포커스를 전달했다. Refine 유형 필터도 이탈 시 닫고 늦은 측정을 무효화한다. | `RelationshipScreenLifetime`의 네 화면 사례에서 이탈/복귀 후 메뉴 없음과 확정 Following 유지 확인. 기존 늦은 측정·계정 전환 테스트도 재실행. 이 테스트 자체는 화면+공급부 검사이며 실제 navigation 검사로 부르지 않는다. |
| 차단된 작성자의 팔로우 해제 경로 없음 | 원래 UI는 차단 여부만 보고 모든 관계 행동을 숨겼다. follow와 block을 함께 설정하면 관리 목록에서 Unfollow할 수 없었다. 기존 mock source의 계약대로 새 follow/email 변경은 제한하되 명시적 해제를 허용한다. 차단 상태 전환 시 이전 이메일 메뉴도 폐기한다. | 실제 navigation에서 B의 follow/email 해제 → 프로필 0 → Muted와 Blocked의 B 유지 확인. 8081에서도 같은 흐름을 조작. 정책 보완은 원본 관찰과 구분한다. |
| 다른 화면 이동 뒤 신고 초안 잔존 | ModerationProvider는 인증/source 수명만 구분하고 navigation route를 구분하지 않았다. 신고 전송 중 다른 작성자 미리보기 링크가 들어오면 이전 작성자의 창이 새 화면을 가렸다. 실제 활성 route key를 dialog/토스트 수명에만 연결하고 저장소/read scope는 유지한다. 이탈 시 초안·요청 UI를 폐기하며 늦은 성공/실패를 새 신고에 노출하지 않는다. | 실제 AppNavigator에서 Jordan 신고 → B 링크 진입 → 새 B 신고를 조작. 수정 전 양 플랫폼 4건 모두 이전 초안 노출로 실패했고 늦은 성공/실패 각각을 회귀로 검증했다. |
| 차단 목록의 카탈로그 실패/재시도 누락 | 이름 조회가 실패해도 기술 ID를 보여 주며 정상 목록처럼 처리했다. 조회 중/오류 UI와 `Retry blocked user names`를 연결해 같은 목록에서 재조회한다. | DirectorySource read-error → 재시도 → 같은 Jordan 이름/Unblock 복구, blocked ID 유지 회귀. 실제 웹에서도 directory read-error 상태에서 기사 신고의 Also block으로 Kris Gage를 차단하고, Blocked users의 오류→재시도→Kris 이름/Unblock 복구를 확인. |

추가 테스트는 네 화면 메뉴 수명, 차단 중 해제, 카탈로그 재시도, 실제 navigation에서 신고 중 다른 대상 이동의 늦은 성공/실패로 총 8개 논리 사례다. 처음 회귀 실행은 6 suites에서 12 실패/8 통과였고, 그중 검색 사례는 fixture 조회 대기 부족도 포함했다. 테스트 대기와 필터 label을 실제 UI에 맞추고, 참조 값을 render 중 변경한다는 lint 지적도 수정했다. 회귀 작성 중 실패와 앱 결함 재현을 혼동하지 않는다. 수정 후 화면 수명/FollowControl 4 suites·16 tests, 차단/카탈로그 포함 다른 4 suites는 통과했다. 전체 최신 검사 결과는 이어서 기록한다.

추가 8081 확인 순서: A 로그인 → 검색 B → Follow·Mute·Block → Profile의 My following → 차단된 B를 Unfollow → 빈 목록/0 following → Refine Muted에서 B 유지 → Account Blocked users에서 B 유지. 320×640에서 뒤로/이름/Unfollow 터치 높이 48px, 수평 overflow 없음. 실행 캡처는 메모리에서만 확인했다.

기능 연결과 실패 수명은 보완했지만 최초 기록의 시각 차이, 원본 U 항목, 실제 iOS/Android·OS 접근성/IME 미검증과 삭제된 과거 evidence의 엄격 검사 제한은 계속 남는다. 묶음 6은 시작하지 않는다.


추가 실행 이력:

- 첫 추가 `npm run check`: typecheck/lint 통과, 전체 **290 suites 중 286 통과/4 실패, 1530 tests 중 1525 통과/5 실패, 978.549초**. iOS ProfileDetails/SearchScreen/ResponsesPanel/App에서 5초 timeout 4건과 그 뒤 ProfileDetails의 사진 버튼 조회 실패 1건이 있었다. 기존 AuthNavigation에서 VirtualizedList act 경고도 출력됐다. 새 회귀 사례는 통과했다.
- 실패한 iOS 네 파일을 코드/timeout 변경 없이 분리 실행: **4 suites / 30 tests 통과, 29.331초**. 지연의 정확한 원인을 확정하지 않았으며 최초 실패를 삭제하지 않는다. `--selectProjects ios`는 이름 대소문자 때문에 실행되지 않아 `iOS`로 고쳐 실제 검사를 수행했다.
- 추가 웹 실패 주입 후 relationshipPreview를 HEAD의 `normal`과 정확히 일치하도록 복원했다. 새로고침 후 guest 초기 상태·app console error/unhandled rejection 0을 확인하고 검사용 Chrome만 종료했다. 기존 8081은 유지한다. 새 evidence/캡처/로그/manifest는 생성하지 않았다.

- 재실행 도중 최종 코드 추적으로 신고 route 수명 누락을 발견하여 해당 전체 검사는 직접 중단했다(종료 130, 전체 통과로 계산하지 않음). 신규 `ModerationRouteLifetime`은 실제 navigation을 사용하고 PreviewLinkSource만 주입했다. 수정 전 2 suites/4 tests 모두 이전 신고 초안 잔존을 재현했다. route key는 dialog/토스트만 폐기하고 확정 개인 저장소와 auth revision을 변경하지 않는다.

- 신고 route 수정 후 관련 navigation 재검증: **6 suites / 14 tests 통과, 38.303초**. 전역 navigation을 mock으로 대체하지 않았다.
- **최종 `npm run check` 종료 0:** Node24.10.0에서 typecheck/lint와 **292 suites / 1534 tests 전체 통과, 528.488초**. 모든 추가 수정과 preview 정상 복원 후의 코드다. 검사를 통과시키기 위해 timeout이나 테스트 기대값을 완화하지 않았다.
- **최종 iOS/Android `expo export` 종료 0:** iOS 8.715초, Android 15.845초. 양 플랫폼의 3.6MB Hermes `.hbc`와 118 assets를 생성·확인했다. 임시 산출물은 정리했다. 실제 native build/기기 실행을 의미하지 않으며 현재 Xcode/Android SDK/AVD 부재는 재확인했다.
- 최종 8081 Chromium: Jordan의 신고 사유·한글 초안 작성 → 모의 URL 이벤트로 B 화면 진입 → 이전 창 폐기 → 새 B 신고의 radio 네 개 미선택·Report 비활성 확인. 기사 Follow 메뉴 → B 링크 → 뒤로 기사 복귀에서도 이전 이메일 메뉴는 사라지고 Following은 유지됐다. 앱 console error/unhandled rejection 0. URL 이벤트는 브라우저 개발 실행의 등록 콜백에 주입했으며 OS 딥링크 검증이 아니다. 도구가 React Native Web의 중복 콜백으로 B를 두 번 push한 첫 시도는 복귀 검증으로 채택하지 않고, 단일 이벤트로 다시 실행해 확인했다.
- 최종 변경은 **33개 경로**다. 최초 보고 이후 `ReferenceArticleView`, `ExploreSections`, `SearchScreen`, `DiscoveryRow`, `ModerationProvider`와 신규 `RelationshipScreenLifetime.test.tsx`, `ModerationRouteLifetime.test.tsx`가 추가로 변경 대상에 포함됐다. 기존 관계/추천/신고 코드·테스트와 결과·실행 계획·추적 문서도 실제 결과로 갱신했다.
- 최종 정합성: 생성 문서와 현재 입력 일치, 200 S/273 T/263 U/72 C 및 묶음5의 21 S/125 R/30 T 연결 보존, 과거 원본/증거 메타데이터 보존. 엄격 검사에는 삭제된 과거 evidence 관련 34개 진단만 남는다. `git diff --check` 통과, HEAD `6853256` 유지, 8081 HTTP200, 장애 설정 정상값, 새 evidence/캡처/로그/manifest 없음. 커밋·push·배포 및 묶음6은 수행하지 않았다.
