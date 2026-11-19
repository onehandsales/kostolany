# Goal 24 — 전역 테마와 기사 표시 설정

2026-11-19 KST · Windows · 시작 HEAD `529f0fa` · 시작 작업 트리 clean.

현재 상태: **Goal24 구현 완료·시각/native 검증 잔여.** 두 차례 자체 검토와 발견 사항 수정, 현재 코드의 타입/lint·98 suites/690 tests, 8081 사용자 흐름과 원본 부분 대조, 양 플랫폼 JS/Hermes export를 마쳤다. 원본 font/vector와 실제 native 검증은 잔여다. 최신 사용자 지시로 연속 작업 범위를 **Goal24까지**로 변경했다. Goal24만 로컬 커밋한 뒤 종료하며 Goal25 이후는 미착수·별도 요청 대기다. push·배포는 하지 않는다.

## 범위와 원본

- F16 Story detail 7단계, F24 Changing display 9단계, F58 Settings 3단계, F62 Switching to dark mode 8단계의 ANALYSIS와 실제 PNG를 확인했다. 중복 화면을 새 화면으로 집계하지 않았다.
- `medium/README.md`, `REVIEW_R2.md`, `SOURCES.md`, Goal22 기준선·코드 감사·Goal23 결과와 현재 코드를 대조했다. FRONT README와 6개 하위 규칙, 공통·UX 규칙을 적용했다.
- 구현: 전역 System/Light/Dark, OS 테마 구독, 기사 Display 팝오버·글자 크기·글꼴·기사 Appearance·타인 강조 표시, 기존 화면/카드/입력/탭/아이콘/시트/메뉴의 테마 적용. 금융 예시 기사도 표시 설정과 본문 크기/글꼴을 사용한다.
- 기존 인증 revision·ID·개인 저장소·목록·navigation·4단계 설명·기본 설명 수준·boolean like는 유지한다. 박수/Viewed/Responses/Highlight 생성·삭제/관계/신고는 이번 Goal에서 구현하지 않는다.

| 원본 단계 | 안정 ID | 비교 대상과 연결 |
| --- | --- | --- |
| F16/02, F24/01 | `sc_332d5b0923e546fcbf6a8fc613cda6a4` | 기사 상단, 100%, 유료 배지·커버·고정 반응 바 |
| F24/02 | `sc_d62e32234117483b85b4c73ed63249cd` | Story options→Display 진입. 전체 다섯 행과 처리 계약은 Goal25/28/29/31 |
| F24/03 | `sc_557c1fb7c6bf4dcc82ba1d6aba677f94` | 100%·Default·System default (Light)·Highlights from others |
| F24/04 | `sc_ad140eae0b7e409aa2204c1f36bfa385` | 120%와 제목 세 줄 |
| F24/05 | `sc_a5d80c9e0226452cbb67e018702c5f1b` | 별도 Appearance 메뉴·System default/Light/Dark·체크 |
| F24/06–07 | `sc_fd7de1ebfba14fbca6ddbe3ff642c42c`, `sc_00409287a68f4416941e39326f6df6b9` | Dark 팝오버·타인 강조 on/off |
| F24/08–09 | `sc_ee957cf03e9848948f9ec8189264d8d8`, `sc_d1d05d6500f349d89c5a3e5646ff238b` | 닫은 Dark 기사와 확대 세리프 본문 |
| F58/02, F62/01 | `sc_ddd51660cb8346a1b200ed970a2d5c45` | Settings System 상태 |
| F62/02 | `sc_9b1044709d764fe682a5e95603fd5c56` | Settings Dark 상태 |
| F62/03–05 | `sc_77bbb7d671f14c6db68071c5921f22fa`, `sc_eaaa223bd5c84facb010485d0f797e76`, `sc_4a39ee1d768342a9823787c11c851479` | Home/Explore/Library의 Dark 표면·본문·탭 |
| F62/06–08 | `sc_97fb65c906bf4e309ec595d2067e4bce`, `sc_45fd4ac6da2148968fab1446df649f7f`, `sc_c31a2100ddcd41cba45b5081c69b78b5` | Highlighted/목록/Profile. Highlighted 기능은 Goal27, Viewed는 Goal25 |

## 상태·공개 계약·수명

| 항목 | 구현 계약 |
| --- | --- |
| 소유권 | `features/settings`의 DisplaySettingsProvider/store/source. shared는 팔레트·표현 primitive만 소유하며 feature 저장소/fixture를 참조하지 않는다. |
| 식별·범위 | guest와 각 user ID마다 독립 저장소. 소유자 키는 `JSON.stringify(userId)`로 guest/null과 실제 ID를 분리한다. source 교체 시 저장소를 교체한다. |
| 필드 | `appTheme`, `readerTheme`: system/light/dark. `fontScale`: 80~200, 20 단위. `fontFamily`: default/serif/sans. `showHighlights`: boolean. 기본값 system/system/100/default/true. |
| 우선순위 | 전역 System은 RN useColorScheme의 OS 변경을 구독한다. 기사 명시적 Light/Dark는 기사와 그 팝오버에만 적용한다. 기사 System은 앱의 유효 테마를 상속한다. 이 상속·독립 정책은 원본 미확인 부분의 명시적 mock 설계다. |
| 변경 시점 | 각 선택 즉시 미리보기·메모리 저장. 별도 Done/Save 없음. 바깥 터치/Escape/뒤로는 팝오버를 닫으며 이미 선택한 값을 취소하지 않는다. 펼친 Font/Appearance에서 선택 없이 닫으면 기존 값 유지. |
| 공급부 | `read(owner)`와 `save(owner, settings, command)`가 `{owner, settings}`를 반환한다. 소유자·범위·반환 값이 맞지 않으면 오류다. 실서버/API 호출은 없다. |
| 경합 | 저장 직렬화·중간 제출 합치기·마지막 의도 우선. 조회 중 변경은 사용자가 수정한 필드를 보존하고 미조회 필드를 조회 결과와 병합한 뒤 저장한다. 조회 실패 시 임의 기본값 전체를 저장하지 않고 재시도를 기다린다. 이전 저장 성공/실패는 다음 선택·다른 사용자 상태를 덮지 않는다. |
| 실패 | 저장 실패에서 선택을 유지하고 저장 오류/재시도를 표시한다. 조회 오류/재시도와 저장 중 표시를 구분한다. 같은 값 중복 제출은 생략한다. |
| 계정·복귀 | logout→guest, A→B→A는 각각의 메모리 선호값을 사용한다. 기사 재진입/기존 기사 복귀에서도 그 계정의 최신 표시 선호값을 적용한다. 화면 초안/열린 메뉴는 기존 인증 scope 변경에서 닫힌다. 이름 변경은 인증 revision을 바꾸지 않는다. |
| 전체 재실행 | 새 Provider/source 또는 전체 새로고침은 기본값과 비로그인 상태로 초기화된다. AsyncStorage/localStorage 등 영속 저장은 도입하지 않았다. |
| 강조 | 기존 발췌의 색칠 범위를 타인 강조 표시용 fixture로 사용한다. 원본 자체는 강조 소유자가 미확인이다. 표시 off는 본문 렌더만 바꾸며 저장 하이라이트 삭제 명령이 없다. 내 Highlight 저장/해제·소유권은 Goal27 담당이다. |

100%·120%와 세 테마는 원본 관찰이다. 80~200 범위/20 단계, Default·Serif·Sans serif 목록, 계정별 메모리 수명과 기사 System 상속은 자체 보완이다. Font 메뉴 원본이 확보되지 않아 Medium의 실제 선택 목록으로 주장하지 않는다.

## 검토 기록

두 차례 모두 주 작업자의 **자체 검토**이며 독립 검토로 계산하지 않는다. 검토 판단과 아래 실제 실행 결과는 별개다.

| 차수 | 발견·판단 | 수정·확인 |
| --- | --- | --- |
| 1차 | 모듈 정적 팔레트 때문에 테마가 기존 입력/오버레이에 전달되지 않음 | 테마 context·팔레트별 StyleSheet factory, 기본 SVG 색을 구독하도록 변경. shared 경계 유지. |
| 1차 | 하단 탭 함수가 navigation render callback에서 직접 호출되어 hook 추가 후 web Invalid hook call 재현 | `tabBar={(props) => <BottomTabBar {...props} />}`로 React 컴포넌트 경계 수정. 8081 재실행에서 정상 진입/테마/탭 흐름 확인. |
| 1차 | Dark 역상 버튼 글자가 밝은 배경에 흰색, 일부 오류/팝업 배경은 밝은 값에 고정 | accent 글자와 inverse 글자 분리, 오류·입력·팝업·아이콘 색 교정. 관련 화면 실제 캡처 대조. |
| 1차 | RN web Switch가 원본과 다른 청록 thumb·작은 터치 면, Display 팝오버 높이 차이 | 48px 조작 영역과 50×30 track/26px 흰 thumb, 원본 기반 팝오버 320×약227 보정. |
| 1차 | 기사 status bar의 navigation hook을 순수 route 조합에 넣어 기존 단위 검사 실패 | focus/상태바 책임을 app의 ArticlePresentation으로 이동. route 계약 유지. |
| 2차 | 최초 조회 전에 전체 기본값으로 저장하면 미조회 글꼴/강조 설정이 유실될 수 있음 | 수정한 필드만 조회 결과 위에 병합하고 저장. 조회 실패에서는 쓰기를 보류. 실제 늦은 성공/실패·재시도 회귀 검사 추가. |
| 2차 | Appearance 선택이 본문 행을 밀어내는 inline 목록으로 표시됨 | F24/05처럼 별도 250px 팝오버로 변경. 선택 체크·바깥 닫기·Escape와 원래 Display 복귀 확인. |
| 2차 | 기존 금융 기사에서 읽기 표시 변경 진입이 누락 | Display 진입과 본문 표시 공통 계약 연결. 4단계 설명과 기본 수준 저장 의미는 유지. |
| 2차 | 모든 Text/스타일 사용처 검사에서 Explore 하단 제목·공통 안내 제목·설정의 프로필 재시도에 명시 색이 없어 Dark에서 검게 남음 | 세 사용처에 테마 글자 색을 연결하고 Dark 스크롤/안내 및 영향 검사를 재실행. |
| 2차 | 비교 harness의 PowerShell→Python 문자열 인코딩 때문에 저장 완료 대기 문구가 손상됨 | UTF-8 및 실제 한글 locator로 수정. 해당 비교를 최종 코드/저장 완료 상태로 재실행하며 이전 캡처를 최종 근거로 사용하지 않음. |
| 2차 | 새 표시 컨트롤의 접근성 이름·일부 import 순서가 공통 규칙과 어긋남 | 보이는 Medium 원문은 유지하고 새 접근성 label을 한국어로 변경. 외부→내부→같은 폴더 import 순서 정리. |

## 실행 기록

Node24.18.0 / npm10.9.0. 기존 8081 PID17148 사용. 별도 서버를 시작하거나 재시작하지 않았다.

- 중간 `npm.cmd run check`: 타입/lint 통과, iOS+Android Jest **98 suites / 690 tests 통과**, 407.676초. 실행 중 후속 수정이 있었으므로 최종 코드 전수 검사로 대체하지 않는다. AuthBoundaryNavigation에서 VirtualizedList act 경고가 발생했다.
- 신규 핵심 회귀 `createDisplaySettingsStore`, `DisplaySettingsProvider`, `DisplayNavigation`: **6 suites / 20 tests 통과**, 23.203초. 실제 NavigationContainer/native-stack/bottom-tabs를 사용하고 navigation 자체를 mock으로 바꾸지 않았다.
- 최초 플랫폼 훅 검사에서는 Expo Jest 대역을 실제 Appearance listener로 오인해 2건 실패했다. 훅 값 변경 단위 검사로 정정했고 실제 구독은 8081 media 변경에서 별도로 확인했다.
- 최초 route 상태바 단위 검사 4건 실패는 app 경계 수정 후 검사에서 통과했다. AuthBoundary 타이머를 전체로 확장한 시도는 실제 navigation 대기 조건을 깨뜨려 4건 실패했고, 원래 타이머 범위를 복원하고 표시 source의 지연을 명시적으로 주입하도록 수정했다.
- 브라우저: Light/Dark/System live media, 다크 Home/Explore/Library/Profile/편집, Display 100/120·font·theme·강조 표시·별도 메뉴 취소·닫기·검색 복귀·320px·전체 새로고침. 추가 기존 흐름 회귀에서 로그인 닫기/취소/실패/재시도, 긴 한글/키보드 focus, 4단계 설명/기본 수준, 좋아요/3개 목록 저장/목록 편집·삭제/다른 소속 보존/A→B→A를 실행했다.
- 장애 브라우저: read-error·save-error에서 입력/선택 유지와 재시도 복구를 확인했다. slow 실행 도중 개발 파일 변경에 따른 Fast Refresh로 세션이 초기화된 실행은 무효로 분리했고, 파일 고정 후 4초 지연·빠른 변경을 재실행해 통과했다. 장애 설정은 `finally`에서 normal로 복원했으며 최종 파일도 normal임을 확인했다.
- 두 번째 전체 `npm.cmd run check`: **98 suites/690 tests 통과**, 427.998초. 이 실행 후 발견한 다크 제목 색·접근성 label 수정까지 포함해 다시 검사했다.
- **최종 `npm.cmd run check`: typecheck·lint·iOS/Android Jest 98 suites/690 tests 통과, 402.613초, exit 0.** 검사 중 import 정렬/들여쓰기만 정리했으며 그 이후 `npm.cmd run typecheck`와 `npm.cmd run lint`도 exit 0이다. 최종 동작 변경은 이 전수 검사와 브라우저 재실행에 모두 포함됐다.
- 새 정식 회귀 테스트: `createDisplaySettingsStore.test.ts`, `DisplaySettingsProvider.test.tsx`, `DisplayNavigation.test.tsx`의 10개 사례를 두 Jest 프로젝트에서 실행했다. 기존 `AuthBoundaryNavigation.test.tsx`에는 지연 없는 표시 공급부를 명시해 인증 흐름의 검사 범위를 보존했다. Jest의 iOS/Android 프로젝트는 실제 기기 실행이 아니다.
- 최종 Edge 브라우저 실행은 주요 흐름 18장, 원본 조건별 표시 비교 8장, 기존 흐름 회귀 8장, 조회/저장 오류·지연 5장, 다크 제목 추가 확인 2장으로 **41회 캡처**했다. 화면 전체 41쌍 또는 고유 원본 41장 전수 비교라는 뜻은 아니다. 각 실행의 page/console error 수집 결과는 0이다. 원본 비교 8장 중 7장은 F24/01·03·04·05·06·07·08 대응이며 본문 1장은 다른 발췌의 크기/행간 확인으로 구분했다.
- 최종 `npx.cmd expo export --platform ios --output-dir <외부TEMP>/goal24-ios-final`과 Android 대응 명령은 각각 exit 0, JS/Hermes 2.4MB 생성이다. iOS hash `40958964dfc9cf9e4db8ac6927a3fe6b`, Android hash `a6c764379a713dd82999a2c6dad36fdd`. native build/run은 수행하지 못했다.
- 문서 검사: 대응표의 63흐름·200개 고유 화면 행·273단계 참조를 파일/flow/step/screen ID와 대조해 불일치 0, Goal anchor 참조1138건의 누락 0이다. 이번 결과의 원본 ID17개가 실제 PNG에 존재한다. 결과/계획/대응표/FE README/현재 상태 문서의 로컬 링크 누락 0, `git diff --check` 오류 0이다. 이는 링크·대응 정합성 검사이며 200개 구현 화면을 모두 시각 검증했다는 뜻은 아니다.

## 원본 비교 조건과 측정

원본은 보관된 iOS version ID1419. PNG1179×2556을393×852로 정규화하고 위59/아래34를 비교용으로 제외한393×759를 사용했다. 실제 원본 기기/DPR의 증거가 아니다. 구현은 Edge157, DPR1,393×759/320×759, OS Light/Dark emulation, web Safe Area0, 화면 상단·각 선택 상태, mock A/B이다. OS 키보드는 없고 입력 focus만 검증했다. 폰트/이미지 decode·저장 완료·전환 완료 후 활성 화면/최상위 모달만 측정한다. 원문·굵기·크기·행간·자간·줄바꿈·좌표·여백·정렬·색·테두리·아이콘·crop을 비교 항목으로 사용했다.

| 항목 | 원본 측정/관찰 | 변경·잔여 |
| --- | --- | --- |
| Dark 기본 배경 | F62/02–03 평면 RGB(18,18,18) | 기존 흰색/초기 추정#111111에서 **#121212**로 교정 |
| Settings 섹션 | F62/02 RGB(25,25,25) | **#191919**, 본문/보조색과 구분선도 별도 토큰 |
| 선택 segmented 면 | F62/02 RGB(102,102,106), 트랙(41,41,44) | **#66666a / #29292c**, 실제 선택값과 연결 |
| Display Dark 면 | F24/06–07 RGB(28,28,29) | **#1c1c1d**. 흐림/그림자/반투명 원본 효과는 완전 동일하지 않음 |
| Display 카드 | 논리 폭320, 오른쪽19, 위약48, 높이약227 | 같은 폭/오프셋, 56+57×3 행. 48px 터치를 확보한 하위 선택 메뉴는 원본44px 행보다 큼 |
| 본문 확대 | 원본100/120 및120 제목3줄 | body20/30→24/36, title32/38→38.4/45.6, subtitle18/26→21.6/31.2. 원본 글꼴 부재로 줄바꿈/기준선·메타/표지 위치 차이가 남음 |
| 글꼴·아이콘 | 파일/family·원본 vector 미확보 | 기존 시스템 sans/Georgia 및 수작업 SVG 대체 유지. Font Default와 Serif는 현재 같은 serif 대체다. |
| fixture 차이 | Dark Home/Explore에는 다른 기사, Profile 사진/발행 글/관계 수가 있음 | 내용이 다른 화면을 픽셀 동일성 판정에 섞지 않고 공통 표면/배치만 비교. 후속 Goal별 콘텐츠 연결은 잔여 |

최종 DOM 실측에서 Display는 x54/y48/폭320, 좁은 320px viewport에서는 x19/폭282였다. Font 행은 y105/높이57, Appearance 행은 y162/높이57이다. Dark Settings 첫 섹션은 x0/y49/높이51, Configure는 y304/높이61이며 Dark 선택 터치 영역은 48×48이다. 120% 본문은 x24/폭345, Georgia 계열 대체 글꼴 24px/36px, RGB(210,210,210)였다. 원본 강조 스위치의 주요 녹색 RGB(65,133,44)와 구현 RGB(65,135,44), thumb 크기 및 blur 차이는 남아 있다. 120% 원본 대비 메타/커버 위치는 약16px 차이가 남아 있어 동일 판정을 하지 않았다.

F24/09의 특정 발췌와 ChatGPT 대화 이미지는 현재 fixture에 없어 동일 내용 스크롤 비교를 완료하지 못했다. 이는 Goal25의 기사 본문 보정 대상이며 이번 글자 확대 비교에서는 서로 다른 본문을 같은 화면으로 취급하지 않았다. 원본 font 목록·원본 파일과 펼친 Font 메뉴도 추가 확보가 필요하다.

읽기 전용 Gummble `medium-ios` 검색 `Medium iOS font family Default reading Display settings font picker`는 exact0/related3이었다. Font picker/원본 파일을 확보하지 못했다. 관련 결과를 글꼴 확인 근거로 사용하지 않는다. 확인일2026-11-19, 보관본 카탈로그1419와 추가 검색 결과의 버전을 혼동하지 않는다.

공식 자료: [RN0.86 useColorScheme](https://reactnative.dev/docs/0.86/usecolorscheme)은 Appearance 변경 구독 근거다. [Medium About highlights](https://help.medium.com/hc/en-us/articles/214406358-About-highlights)는 앱 Display에서 타인 강조를 숨기는 기능과 내 강조 제거를 구분한다. 2026-11-19 확인, Medium 문서 표기 갱신일2026-11-13. 이 문서는 기사 Theme의 전역 영향·font 목록·저장 수명을 확정해 주지 않는다.

## 잔여와 다음 단계

| 분류 | 상태·영향·후속 담당 |
| --- | --- |
| 구현 | Goal24 구현·두 차례 자체 검토·발견 결함 수정 완료. 박수/읽음/댓글 등은 후속 범위이며 이번 완료 대상이 아님 |
| 자동 검사 | 현재 코드 타입/lint·98 suites/690 tests·양 플랫폼 JS/Hermes 통과. 이전 Goal23의670건을 대신 사용하지 않음 |
| 시각 | 부분 대조. 원본 font/vector/글리프·행 폭·배지/카드 누적 위치·popover blur·native 효과는 잔여. Goal23 잔여 추적 및 Goal52/53 전체 대조 |
| native | 현재 adb/emulator/java/xcodebuild 명령과 FE/android·FE/ios 프로젝트 없음. Windows에서 iOS build/run 불가. JDK+Android SDK+emulator/device, macOS+Xcode+simulator/device 필요. Goal52 담당 |
| OS 검증 | 실제 Dynamic Type·VoiceOver/TalkBack·IME·키보드 가림·Safe Area·시스템 뒤로 제스처 미검증. web CSS160%/media/Jest/JS-Hermes는 대체 증거가 아님 |
| 정책 | Font 목록/크기 범위/기사 System의 전역 영향·원본 저장 수명은 미확인. 명시한 mock 계약으로 다음 Goal의 독립 구현 가능 |

Goal25의 선행 표시 계약은 준비되었지만 **최신 사용자 지시에 따라 Goal25는 시작하지 않는다**. 별도 요청을 받으면 이 표시 계약을 보존하고 기사 본문·누적 박수·Viewed를 다룬다. 타인 강조 표시와 내 강조 데이터는 Goal27에서 합치지 않는다. 후속 공통 UI 변경 시 이번 Light/Dark/팝오버·계정 회귀를 다시 확인한다.

캡처/비교 시트/JSON/로그/일회성 스크립트는 저장소 밖 `%TEMP%/kostolany-goals24-30-94378758859e4a6e95df5acca653505f`에만 있다. 폴더 이름은 최초 요청 범위의 이력이며 Goal25~30 작업 증거가 아니다. `TODO/evidence`에 새 파일을 쓰지 않았다. medium의 추적 파일382개는 시작 해시와 같고 ENV는 수정하지 않았다. 기존 8081 PID17148을 보존했다. 결과와 현재 상태 문서만 갱신하며 기존 Goal 결과는 당시 이력으로 남겼다. FE README의 더 이상 보관하지 않는 과거 evidence 링크는 해당 Goal 결과 문서로 연결했다.

## 8081 확인 순서

1. 새로고침→Profile→Google mock A 로그인→Settings. Light→Dark→Light, System 선택 후 환경 테마 변경을 확인한다.
2. Dark에서 Home/Explore/Library/Profile과 프로필 편집·새 목록·저장 시트·목록 메뉴·삭제 취소를 확인한다.
3. Explore 검색에서 `ChatGPT Is Poisoning`→기사→Story options→Display settings. 100/120, Font, Appearance, Highlights from others를 바꾼다.
4. 펼친 Font/Appearance를 Escape/바깥 터치로 취소하고, Display를 닫아 실제 본문 크기·글꼴·색을 확인한다. 검색으로 돌아가 검색어가 남는지 보고 같은 기사를 다시 연다.
5. 앱 Dark와 기사 Light를 각각 선택해 적용 범위를 확인한다. 기사 System으로 되돌리면 앱 테마를 따른다.
6. Settings에서 로그아웃 취소→확정→B 로그인→기본 표시 상태→로그아웃→A 로그인. A 표시 선호값/개인 목록이 복원되고 B와 섞이지 않는지 확인한다.
7. 전체 새로고침으로 인증·표시 선호값이 초기화되는지 확인한다. 실제 외부 서비스·영속 저장·출시 완료를 뜻하지 않는다.
