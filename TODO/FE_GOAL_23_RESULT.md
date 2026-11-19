# Goal 23 — 공통 글꼴·아이콘·레이아웃과 기존 화면 보정 결과

확인일: **2026-11-19 KST**. 프로젝트: `D:\git_repository\kostolany_project`.

**상태: 구현 완료·검증 잔여.** 확인 가능한 공통 표현을 보정하고 두 차례 자체 검토와 수정, 실제 8081 흐름 검증을 수행했다. 원본 글꼴 파일·아이콘 벡터·일부 시각 차이와 실제 native 검증이 남아 있으므로 전체 동일 재현 완료가 아니다. Goal 24는 시작하지 않았다. 후속 사용자 요청에 따라 Goal23 코드·테스트·문서를 로컬 커밋으로 보관하며 push·배포는 하지 않는다.

| 구분 | 결과 | 한계 |
| --- | --- | --- |
| 구현 | 기존 화면의 공통 폰트 적용, 아이콘 윤곽, 카드/탭/시트/입력/메뉴/설정 배치 보정 | 원본 폰트·벡터 미확보, 후속 제품 기능은 미구현 유지 |
| 자동 검사 | typecheck·lint,92 suites/670 tests 통과 | Jest 양 플랫폼 설정의 결과이며 실제 native 실행과 구분한다. |
| 시각·브라우저 | 대표 11쌍과 추가 목록 메뉴/삭제 원본 대조, 주요 흐름·작은 폭·긴 한글 검증 | 부분 비교이며 200장 전체 구현 비교가 아니다. Windows 글리프/OS 차이 잔여 |
| 플랫폼 | iOS·Android JS/Hermes export 성공 | 실제 native build/run·OS 키보드/접근성은 환경 부재로 미검증 |

## 기준과 보존

- 시작 HEAD는 `b6917e6`, 시작 작업 트리는 clean이었다. [Goal22 결과](FE_GOAL_22_RESULT.md), [비교 기준선](FE_GOAL_22_BASELINE.md), [코드·상태 계약](FE_GOAL_22_CODE_AUDIT.md), [실행 계획](FE_MEDIUM_FULL_CLONE_GOALS.md), [원본 대응표](FE_MEDIUM_FULL_CLONE_MAP.md)를 출발점으로 사용했다.
- AGENT README·PROJECT_SCOPE, SOFTWARE_AGENT README, COMMON QUALITY_AND_WORKFLOW·API_CONTRACT·IMPLEMENTATION_STATUS, UXUI README·MEDIUM_REFERENCE를 확인했다. FRONT_AGENT README와 ARCHITECTURE·CODE_CONVENTIONS·STATE_AND_DATA·MOBILE_UI_AND_PLATFORM·PERFORMANCE_AND_SECURITY·TESTING_AND_DELIVERY 6개를 모두 읽고 적용했다.
- 기존 `localhost:8081` PID17148을 사용했다. 서버 재시작·별도 서버·패키지 설치·의존성 변경·실제 서비스 연결은 하지 않았다. `medium` 원본과 ENV, 인증/개인 저장소와 navigation 구현을 보존했다.
- 마무리 SHA-256 대조에서 시작 시 추적666파일 중 삭제0, `medium`382파일 변경0을 확인했다. 저장소/공급부/인증/navigation 구현·package/lock/ENV 변경은 없다. 수정 문서의 내부 링크2,000개에 누락이 없고 C72/F63/S200행을 유지했다. 기존 evidence 링크12개는 과거 기록으로 보존했으며 새 증거 링크로 추가하지 않았다.8081 PID17148/HTTP200과 HEAD `b6917e6` 유지도 재확인했다.
- `TODO/evidence`를 생성하거나 그 안에 쓰지 않았다. 기존 ignored 자료는 보존했다. 캡처·나란히 비교 이미지·Python 검증 코드·로그·export는 모두 저장소 밖 `%TEMP%\kostolany-goal23-8bdedd36afe44e41a75b340d1b33786c`에만 두었다. 임시 파일은 영구 저장소 산출물이나 재현의 필수 링크가 아니다.

## 원본과 비교 조건

[medium README](../medium/README.md), [REVIEW_R2](../medium/REVIEW_R2.md), [SOURCES](../medium/SOURCES.md)와 Home·Explore·Searching Medium·Story detail·Saving a story·Logging in·Library·Creating a list·List detail·Profile·Editing profile information·Settings의 관련 ANALYSIS 및 실제 PNG를 확인했다. 기준은 **보관본 iOS version ID 1419**다. 63흐름/273단계/200고유 화면/43중복이라는 Goal22 범위를 유지하며 이번 Goal에서 전 화면을 다시 구현 검증했다고 표현하지 않는다.

| 대표 화면 | 원본 안정 ID | 확인한 표현·상태 |
| --- | --- | --- |
| Home · S069 | `sc_5e0ba0e498ff49579bf838096aec4b5e` | For you, 카드 제목/메타정보/사진 crop, 선택선·탭·알림 |
| Explore · S021 | `sc_1c3e4349171248378eada528f7942269` | Trending 토픽, 순위·저자·배지·행간 |
| Search · S098 | `sc_8dc9eeb5f9d244ca9fa6fb7a973de82f` | Mindfulness, Stories, 검색 필드·비활성 분류·결과 카드 |
| Article · S037 | `sc_332d5b0923e546fcbf6a8fc613cda6a4` | ChatGPT 기사 상단, 제목/표지/저자/반응 |
| Login · S182 | `sc_e4d414380a1047a2b7970cf7869a0866` | Human stories..., 제공자 버튼·닫기 |
| Save · S036 | `sc_31edfd53d2874259a6ed5ecbc756d10b` | Save to, Reading list 체크, Done 확정 전 |
| Profile · S020 | `sc_1bd141b757934a88b4a003855e1794cc` | Alex Smith, 빈 Stories, 설정·프로필 편집 |
| Profile edit · S123 | `sc_a829121c47a444cd8a8fd0d9889edaed` | 이름/대명사/소개/카운터·About Page·닫기/Save |
| Settings · S173 | `sc_ddd51660cb8346a1b200ed970a2d5c45` | Account·Configure Medium·Social 섹션, System default |
| Library empty · S095 | `sc_84e0421de98041bbb014822fc05dd3fb` | 헤더·배너·Reading list·New list |
| Create list · S076 | `sc_675e3eda08504708979533659dacdcf6` | 빈 이름/설명, Private 해제, Create 비활성 |

각 ID의 실제 원본 파일 경로·단계·담당은 [원본 대응표](FE_MEDIUM_FULL_CLONE_MAP.md)의 S행을 따른다. 추가로 `Library/List detail/Deleting a list`의 `sc_0b1e7b64b9f14f2cb5358161e0f67a94`(상세), `sc_71f31ac7803a47f89b2e76b6a9355a7c`(펼친 메뉴), `sc_a1562b1931fc4650a544861094934588`(삭제 확인) PNG를 직접 열어 메뉴 x/폭과 확인 시트 제목/핸들/버튼을 대조했다. 실제 앱에서는 자체 목록 데이터를 사용하므로 원본의 기사 수·목록 이름까지 같은 상태라고 판정하지 않는다.

| 조건 | 고정값·검증 방법 |
| --- | --- |
| 코드/fixture | 시작 HEAD 이후 이 Goal의 변경으로, 후속 사용자 요청에 따라 로컬 커밋으로 보관한다. 기존 mediumCatalog/mediumFixtures·금융 fixture, Scott의 원본 파란 배지 표시용 선택 필드만 추가 |
| 브라우저 | Windows, Edge157.0.4341.60, Python Playwright, headless, en-US |
| viewport/배율 | 대표393×759 CSS px, DPR1, 브라우저 확대100%, 기본 텍스트 배율 |
| 원본 crop | 1179×2556 PNG를 LANCZOS로393×852 정규화 후 `(0,59,393,818)` crop. 실제 원본 기기/DPR 증명이 아님 |
| Safe Area/테마 | web inset0, light, reduced-motion=reduce. 원본 OS 상·하단 제외는 비교용. 실제 전역 Dark 구현은 Goal24 범위 |
| 계정 | 새 context에서 guest→Google mock A, UI로 이름을 Alex Smith로 저장한 뒤 빈 Library를 캡처. Profile도 같은 이름이며 사용자 ID와 소유권 유지 |
| 선택/스크롤 | Home For you, Search Mindfulness/Stories, 기사 상단, Save Reading list 체크/Done 전, Profile Stories 빈 상태, 새 목록 빈 폼. 대표 캡처는 상단 |
| 로딩 | 결과 도착, `document.fonts.ready`, 이미지 decode, 두 프레임 렌더를 기다림. 활성 route 및 최상단 dialog 내부만 좌표/폰트 측정 |
| 키보드/포커스 | 실제 OS 키보드 없음. 최종 비교는 시트 onShow 포커스와 전환 완료 후 Enter로 해제하고 해제 상태를 확인. 초기 before는 포커스가 남아 있어 outline 차이를 배치 개선으로 계산하지 않음 |
| 추가 조건 | Home320×844·1440×844, 폼320×759, 긴 한국어, CSS 텍스트160% 별도 확인. OS Dynamic Type·실제 한글 IME 증거가 아님 |
| 네트워크 | 앱 context는 localhost/data/blob만 허용, 최종 console/page error와 외부 요청0. 문서/MCP 읽기 조회는 별도 조사 |

원문·대소문자·font family/weight/size/lineHeight/letterSpacing·줄바꿈·좌표·여백·정렬·색상·border/radius·아이콘·이미지 crop·선택 상태·확정/취소/복귀를 함께 확인했다. 화면 전체의 임의 일치율이나 100% 동일 판정은 사용하지 않는다.

## 구현과 측정

### 공통 폰트·아이콘·계층

- `shared/theme/tokens.ts`의 sans를 명시적으로 적용해 Windows의 일부 Segoe UI/일부 Arial 혼합을 줄였다. web fallback에 Helvetica·Arial을 명시했고 실제 Edge heading font는 Arial/Arial Bold로 확인했다. iOS는 `System`, Android는 `sans-serif`다. 본문/로그인의 Georgia·serif와 wordmark를 sans로 덮지 않았다.
- body serif, 제목 weight/행간과 카드 letterSpacing−0.4, 기사 제목−0.6을 별도로 유지한다. **Arial·Georgia·System이 Medium 원본 폰트라는 의미가 아니다.** fallback의 폭·굵기·기준선과 운영체제별 렌더 차이는 남아 있다.
- bell·clap·comment·settings·Friend·verified·하단 탭/bookmark 윤곽과 선 두께를 보정했다. PNG를 참고한 SVG 대체이며 Medium 원본 벡터가 아니다. 선택한 Profile 탭의 외곽선이 viewBox 경계에서 잘리지 않도록 원 중심을 조정했다. 실제 boolean like 계약을 누적 clap으로 바꾸지 않았다.
- `FormTextInput`은 RN TextInput props/ref·제어값·포커스/해제/내용 높이 이벤트를 전달하는 shared 표현 컴포넌트다. feature 모델이나 fixture를 import하지 않는다. 이름·소개·목록 폼에서 회색 배경38px와 실제 입력48px를 분리하고 multiline 내용 높이에 맞춰 확장한다. 초안·유효성·비동기 저장은 기존 feature가 소유한다.
- `LibrarySheet`의 표현 옵션 `variant: standard | confirmation`을 추가했다. 데이터 계약·navigation route는 변경하지 않았다. `ReferenceStory.verifiedAuthor?: boolean`은 원본 배지 표시 메타데이터이며 실제 계정 인증 기능이나 새 서버 필드가 아니다.

### 측정값

좌표 단위는 비교 앱 영역 CSS px다. 회색/녹색 범위는 정규화 래스터의 연속 단색 행으로 측정했고 끝 좌표는 제외한다. 회색은 x40~350에서 RGB 허용오차±3/210px 이상, 녹색은 x60~335/200px 이상 기준이다. 둥근 모서리·안티앨리어싱 때문에 DOM bounds와 구별해야 하며 대략1~2px의 경계 오차가 있다.

| 항목 | 원본 | 수정 전 | 수정 후·판정 |
| --- | --- | --- | --- |
| Profile Name 회색 면 y | 202~239 | 203~249 | 203~241, 높이 개선; 시작1px/끝2px 잔여 |
| Profile Pronouns 회색 면 y | 308~342 | 308~356 | 303~341, 상단 약5px 차이 잔여 |
| Profile Bio 회색 면 y | 406~443 | 414~462 | 403~441, 상단 약3px 차이 잔여 |
| Create list Name 회색 면 y | 113~151 | 138~184 | 115~153, 약2px 아래 |
| Create list Description 회색 면 y | 226~263 | 259~307 | 226~264, 약1px 잔여 |
| Save Done 녹색 면 y | 714~750 | 699~735 | **714~750**; 이 면의 좌표 일치가 전체 시트 동일을 뜻하지 않음 |
| Create 버튼 녹색 단색 행 | 387~422 | 아래로 치우침 | 386~424; 곡률·글꼴·비활성 합성 차이를 분리 |
| 입력 터치 bounds | PNG로 직접 판정 불가 | 48px | 최소48px 유지, 낮은 회색 면과 별도 |
| Settings Configure 섹션 DOM y | 래스터 약304 | 316 | 304 |
| Settings Social 섹션 DOM y | 래스터 약670 | 685 | 671, 약1px 잔여 |
| 목록 메뉴 x/폭 | 135/250 | 127/250 | 135/250 |
| 목록 메뉴 4행 높이 | 약44×4 | 48×4 | 48×4 유지, 터치 규칙으로 전체16px 차이 명시 |
| 삭제 확인 시트 상단/제목 | 약524/20px | 약545/16px | 약525/20px, 핸들·X·빨간 버튼 보정 |
| Profile 설정 버튼 | 원본은 시각 영역만 관찰 | 부모 영역과 겹쳐 하단 클릭 실패 | 48×48 DOM·하단 끝 hit test true |

대표 DOM 기록: Home title x24/y24·24/32, Explore title x24/y24·24/32, Search input x104/y1.5·217×48·14/20, Article title x24/y125→124·32/38, Library title x24/y20·24/32, Login headline x24/y128·72/80 Georgia, Profile name x96/y36·24/30. Settings title의 DOM y0에는 paddingTop8이 포함되므로 글리프가 y0에 놓였다고 해석하지 않는다. header title의 좌우 여유80은320px/확대 글자에서 Cancel과 겹침을 방지한다.

홈 이중 구분선을 제거하고 카드 아래 간격·검색 카드 상단/메타정보·토픽 칩 높이·순위 행 간격·검색 선택선/비활성 색을 조정했다. 원본 로컬 사진의 cover/thumb source와 crop 방식은 보존하고 주변 배치를 보정했다. 카드 제목 줄바꿈은 대표 영어 fixture에서 확인했지만 폰트 차이에 따른 글리프/행 높이·뒤 카드 누적 위치 차이는 남아 있다. Profile의 첫 탭/버튼 글자 폭과 시트 배경 쌓임도 원본과 완전히 같지 않다.

일반 green은 흩어진 `#18820f`를 토큰 `#1a8917`로 통일했고, 저장 시트는 원본 관찰색에 맞춰 `#41872c`, 구분선은 `#f2f2f2`, 시트 radius10을 적용했다. 이 값은 해당 보관본의 래스터와 현재 렌더에 근거한 보정이며 모든 상태/테마에 대한 공식 디자인 토큰이라고 주장하지 않는다.

## 두 차례 검토와 수정

두 검토 모두 이 작업자의 **자체 검토**다. 독립 리뷰어 검토로 표현하지 않는다. 검토에서 발견한 내용과 테스트 실행 결과를 아래에서 구분한다.

| 차수 | 발견·원인 | 수정 및 확인 |
| --- | --- | --- |
| 1차 | 명시하지 않은 fontFamily로 Windows 헤더/폼이 Segoe UI와 Arial 혼합 | sans 적용, 실제 platform font 조회와 11쌍 비교 |
| 1차 | Home 카드/목록 양쪽 구분선, 폼 회색 면48px, 새 목록 간격 누적, Settings 섹션 아래 밀림 | 단일 구분선·면/터치 분리·간격 보정, 표의 위치 측정 |
| 1차 | 구현 중 colors import 중복으로 lint/Metro 오류 | 중복 제거 후 타입/lint·실제8081 재검증. 최종 오류 없음 |
| 1차 | 새 입력 배경이 입력 글자를 덮음 | input position/zIndex 조정, 한글 입력·저장·캡처 검증 |
| 1차 | 기본 브라우저 outline과 원본 폼 차이; `outlineStyle: none`은 RN 타입과 불일치 | 타입 우회 없이 solid/width0/transparent, 별도 녹색 focus 선 유지 |
| 2차 | 실제 web Private switch와 mock radio에 aria 선택 상태가 없음 | aria-checked/aria-disabled와 native accessibilityState 함께 전달, 실제 DOM·Jest 의미 검증 |
| 2차 | Profile 설정의48px 표시 bounds 하단을 콘텐츠가 덮음 | 부모 최소 높이와 zIndex 조정, 하단 hit test 통과 |
| 2차 | 긴 한글 소개가 고정 textarea 높이에서 잘림 | 내용 높이 이벤트 반영,320px 긴 소개/목록 설명·스크롤 검증 |
| 2차 | 목록 메뉴 x·삭제 확인 헤더가 추가 원본과 불일치 | 메뉴 여백8·확인 전용 제목/핸들/X/버튼 보정, 취소/삭제/다른 소속 보존 검증 |
| 2차 | 320px/CSS160%에서 시트 제목과 Cancel 겹침 | 헤더 좌우 여유80, 재캡처에서 분리 및 제출까지 스크롤 확인 |
| 2차 | Save Done 수정 후에도3px 아래, Profile 선택 외곽선 viewBox 경계 | spacer81/paddingBottom3과 원 중심 보정, 최신 캡처 재확인 |
| 2차 | 신규 테스트가 RN Pressable 변환 전 aria prop을 직접 검사해4건 실패 | RN 소스의 accessibilityState 변환을 확인하고 toBeChecked/toBeDisabled로 수정, 해당26건 통과 후 전체 재실행 |
| 2차 | 새 테스트 설명이 영어이고 일부 import 순서가 규칙과 다름 | 테스트 한국어·외부→내부 import 순서 수정 후 재검사 |

검증 코드 자체의 가정도 수정했다. mock 사용자 취소는 로그인 화면을 닫는 기존 계약이고, 금융 기사 기본 북마크는 직접 토글인 반면 reference compact 저장은 선택 시트를 연다. 이 차이를 앱 결함으로 바꾸지 않고 경로를 명시해 확인했다. 시트 onShow가 Enter 뒤 다시 focus하는 캡처 경합은 전환/초기 포커스 완료와 해제 여부를 기다리도록 검증 코드에서 수정했다. 초기 포커스 포함 캡처와 최종 해제 캡처를 같은 조건이라고 기록하지 않는다. 초기 Library 캡처의 예시 독자 A/원본 Alex Smith 차이는 UI 프로필 저장 순서를 앞으로 옮겨 최종 재캡처에서 맞췄다.

## 실행한 검사와 사용자 흐름

환경: Node24.18.0/npm10.9.0, Expo57.0.33, React Native0.86.3, React19.2.3, react-native-web0.21.4, TypeScript6.0.3. 기존 lockfile·의존성은 변경하지 않았다.

| 명령·실행 | 결과 |
| --- | --- |
| `npm.cmd run check` — 1차 보정 후 | typecheck·lint,92 suites/666 tests 통과, Jest413.787초 |
| `npm.cmd run check` — 접근성 테스트 추가 후 | typecheck·lint 통과,88 suites 통과/4실패,666 tests 통과/4실패,389.730초. 위 prop 검사 오류로 현재 성공 결과에 사용하지 않음 |
| `npm.cmd test -- --runInBand AuthNavigation.test.tsx LibraryInteractions.test.tsx` — 수정 후 | 4 suites/26 tests 통과,76.681초 |
| `npm.cmd run check` — 2차 수정 후 전체 | typecheck·lint 통과,92 suites/670 tests 통과,387.263초 |
| `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd test -- --runInBand AppNavigator.test.tsx` — 마지막 아이콘 보정 후 | 타입/lint 및2 suites/6 tests 통과,13.072초. 전체 검사 도중 발견한 Profile 탭 SVG 경계 보정에 대해 현재 코드 타입/lint·양 플랫폼 navigation을 다시 검사했다. PowerShell이 Jest stderr의 PASS를 NativeCommandError 모양으로 출력했으나 명령 exit0이고 실제 실패는0이다. |
| `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd test -- --runInBand FormTextInput.test.tsx` — 타입 전용 import 정리 후 | 타입/lint 및2 suites/6 tests 통과,5.549초. 런타임 표현/계약 변경 없음. 위670건에 재실행 건수를 더하지 않는다. |
| `npx.cmd expo export --platform ios --output-dir <TEMP>/export-ios-verified` | 최종 iOS JS/Hermes `index-3a13a17d438ff21b15dd11d25278c6e6.hbc` 약2.4MB 생성 성공 |
| `npx.cmd expo export --platform android --output-dir <TEMP>/export-android-verified` | 최종 Android JS/Hermes `index-99df02199e1ffb38b229e03361666614.hbc` 약2.4MB 생성 성공 |
| `python <TEMP>/browser-final.py <TEMP>/final-matched` | 최종 대표14캡처/11원본 쌍, 안내 진입/복귀 포함9검사, console/page error·외부 요청0 |
| `python <TEMP>/regression.py <TEMP>/regression-final` | 아래7흐름 묶음·8캡처 통과,48×48 hit test 통과, console/page error·외부 요청0 |

새 테스트는 공통 입력의 제어 한글값/포커스/해제/ref, 여러 줄 비활성 입력, 내용 높이 변화와 초안 보존 3개를 양 플랫폼 Jest에서 실행한다. LibraryInteractions에 Private 선택→명령 반영→진행 중 변경 차단1개를 추가했고 기존 실제 navigator 테스트에 mock radio 선택 상태 검증을 보완했다. navigation을 mock으로 대체해 통합이라고 부르지 않았다. Jest의 iOS/Android 프로젝트는 실제 기기 실행이 아니다.

| 실제8081 검증 묶음 | 확인한 결과 |
| --- | --- |
| 홈·탐색·검색·상세 | 세 정렬 선택, Stories 결과→상세→검색어 유지 복귀. Listen/Responses/Share/Follow/다른 검색 탭 안내와 닫기 보존 |
| 로그인 | 개인 기능→닫기·사용자 취소·실패·재시도→A 로그인→원래 화면. 저장은 사용자가 다시 실행 |
| 프로필 |320px 긴 한국어 이름/소개, 편집 취소·저장·재진입, Tab 포커스, 최소 입력 크기·설정 버튼 하단 클릭 |
| 설명·좋아요·다중 저장 | 기본 중학교 수준 저장, 기사4단계 제목/예시, 좋아요, 같은 기사3목록 저장, 목록↔기사/검색 복귀 |
| 목록 | 생성, 메뉴, 이름 수정 취소/확정, 한 목록에서 제거, 삭제 취소/확정, 나머지 소속·기사·좋아요 유지 |
| 계정 | 기사 내부 수준 변경에도 기본값 중학교 유지, 로그아웃 취소, B 개인 목록 분리, A 재로그인 데이터 복원 |
| 긴 폼·초기화 |320px 긴 목록·소개, Private 선택, CSS160% 글자/줄바꿈·하단 제출 스크롤, 전체 reload로 메모리 인증/개인 데이터 초기화 |

공통 변경을 받는 Library list card/Reading list·로그인 제공자·프로필 시트·설정 기본 수준 시트·목록 메뉴/삭제·뒤로 복귀를 함께 확인했다. 오류/늦은 응답·A→B→A 같은 저장소 경합은 기존 전체 테스트로 재검증했다. 실제 브라우저에서 모든 경합을 인위적으로 주입했다고 주장하지 않는다. mock 기본 지연/장애 설정은 변경하지 않았다.

## 출처 구분과 남은 차이

| 구분 | 확인 내용 |
| --- | --- |
| 원본 관찰 | 위 PNG의 문구·회색 입력 면·녹색 면·카드/시트/메뉴 윤곽·배지와 각 위치 |
| 공식 설명 | 2026-11-19 [Apple Managing the fonts for your app](https://developer.apple.com/documentation/technologyoverviews/managing-the-fonts-for-your-app)·[Typography](https://developer.apple.com/design/human-interface-guidelines/typography) 확인. 시스템 폰트 API와 언어/플랫폼 대응 참고이며 Medium이 해당 폰트를 사용한다는 증거가 아님 |
| 읽기 전용 Gummble | `medium-ios` 검색 및 상세조회, 질의 `Medium typography font family story display settings icons`. `sc_368c53cd77e2421e8279124ce03301f4`(Push), `sc_befb6fde38cc48f3827ea389caed11de`(편집), `sc_2d1afd7a02a347868564f9757753d077`(로그아웃) 이미지 확인. 조회 응답으로 원본 font/vector 파일이나 이 추가 이미지의 version ID는 확보하지 못함 |
| 추정 | 래스터에서 판단한 글자 크기/굵기/자간·아이콘 SVG 곡선과 일부 색상·곡률. 공식 디자인 토큰/원본 벡터와 구분 |
| 자체 보완 |48px 터치, web focus 선, 긴 한글 입력 높이, mock A/B·오류/재시도, 금융 fixture·4단계 설명/기본 수준·boolean like |
| 미확인 | 원본 font 파일/라이선스·아이콘 경로·실제 원본 기기/DPR·애니메이션, 펼친 Font picker와 전역/기사 Theme 영향 |

| 잔여 항목 | 다음 확인 방법·담당 |
| --- | --- |
| 정확한 폰트·글리프/기준선/행 폭 | Goal23 동일성 잔여로 유지. Gummble 원본/공식 배포 자산에서 family/file·사용 권한을 확인한 뒤 iOS 원본 조건에서11쌍 재측정. Arial/Georgia 대체를 완료 근거로 사용하지 않음 |
| 아이콘 곡선·획·그림자·누른 효과 | Goal23 잔여. 원본 벡터 확보 또는 확대 PNG 재측정. 현재 수작업 SVG는 근사이며 source의 touch halo/애니메이션까지 일치하지 않음 |
| 폼3~5px·프로필 탭/버튼 폭·카드 누적 위치·OS 시트 배경 | Goal23 잔여. 폰트/실제 Safe Area 고정 뒤 재측정. 표의 남은 좌표를 제거하지 않음 |
| 메뉴44px 원본과48px 터치 | 프로젝트 접근성 규칙을 유지한 의도적 차이. Goal52에서 실제 플랫폼 터치/글자 확대와 함께 검토 |
| Dark·System·기사 Display | Goal24 담당. 이번에는 기존 정적 선택/안내만 유지. Font 메뉴·기사 Theme의 전역 영향은 추가 근거 확보 후 결정 |
| 실제 iOS 실행/build | Windows에 Xcode/xcodebuild·iOS 프로젝트/시뮬레이터 없음. macOS+Xcode+시뮬레이터/기기에서 Goal23 회귀, Goal52 플랫폼 검증 필요 |
| 실제 Android 실행/build | adb/emulator/java와 SDK·ANDROID_HOME/ANDROID_SDK_ROOT/JAVA_HOME·native Android 프로젝트 없음. JDK/SDK/기기 또는 emulator 구성 후 동일 회귀 필요 |
| OS 접근성·IME·Safe Area | VoiceOver/TalkBack, OS Dynamic Type, 실제 한글 조합/키보드 가림·dismiss·하드웨어 뒤로·시트 전환 미검증. CSS160%/합성 입력/Jest/Hermes로 대체하지 않음 |

시각·native 잔여를 문서화했다는 이유로 완료로 바꾸지 않는다. 다음 Goal은 이 잔여와 기존 상태 소유권을 전제로 시작해야 한다. shared UI에 feature 저장소를 넣거나 전역 테마를 기사 임시 선택과 합치지 않는다. 실제 인증·결제·메일/push·서버/DB/Storage는 계속 범위 밖이다.

## 8081 최종 확인 순서

1. 기존 `http://localhost:8081`에서 새로고침한다. Home의 For you/Following/Featured와 카드·하단 탭을 확인한다. Explore→Mindfulness 검색→Stories→기사→뒤로 복귀하여 검색어가 남는지 본다.
2. 기사 저장 또는 Profile에서 로그인을 연다. 닫기, 모의 동작의 사용자 취소/실패를 확인한 뒤 성공으로 돌려 Google mock A로 로그인한다. 로그인 후 저장을 다시 누른다.
3. Profile→Edit your profile에서 Alex Smith 저장 후 다시 열어 Name/Pronouns/Short bio/카운터/Save/닫기를 본다.320px에서 긴 한글 소개를 입력하고 취소·저장을 각각 확인한다.
4. 설정→기본 설명 수준을 중학교로 저장한다. 금융 기사를 열어4단계 설명과 좋아요·저장을 확인한다. 기사 내부 수준을 바꿔도 새 기사 진입은 기본 수준을 쓰는지 확인한다.
5. Library→New list 두 개 생성→기사의 저장할 목록 선택→Reading list와 두 목록 선택→Done. 목록에서 기사 재진입/복귀, 메뉴의 이름 변경·기사 제거·목록 삭제 취소/확정을 확인한다. 다른 목록의 기사는 유지되어야 한다.
6. Settings→로그아웃 취소 후 확정→B 로그인에서 개인 목록이 분리되는지 보고 다시 A로 돌아온다. 마지막 전체 새로고침은 메모리 인증/개인 데이터를 초기화한다.

Goal23 구현 종료 당시에는 미커밋으로 남겼다. 이후 사용자의 `깃 커밋해.` 요청에 따라 `feat(fe): refine Medium shared UI for Goal 23` 로컬 커밋에 코드·테스트·결과/현재 상태 문서를 함께 기록한다. 커밋 준비에서는 앱 코드를 추가 수정하지 않았으며 위 검증 결과와 시각/native 잔여를 유지한다. Goal24·push·배포는 실행하지 않는다.
