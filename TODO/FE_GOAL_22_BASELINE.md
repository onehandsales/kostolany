# Goal 22 원본·비교 환경 기준선

사용자 후속 지시에 따라 별도 `TODO/evidence` 산출물은 커밋하지 않고 이 문서에 검토 내용을 보존한다. 기존 캡처·로그는 로컬 자료이며 이 문서의 필수 링크로 요구하지 않는다.

확인일: **2026-11-19 KST**. [결과 보고](FE_GOAL_22_RESULT.md) · [C01~C72 현재 코드/공개 계약](FE_GOAL_22_CODE_AUDIT.md).

## 원본 범위와 전수 대조

기본 목표는 보관된 **Medium iOS version ID 1419**다. 현재 출시 앱이나 Android/web 전체를 같은 원본이라고 부르지 않는다. [medium README](../medium/README.md), [REVIEW_R2](../medium/REVIEW_R2.md), [SOURCES](../medium/SOURCES.md), 63개 ANALYSIS의 각 단계·입력·메뉴·상태·R2 해석·미확인 분기를 대응표와 대조했다.

| 검사 | 현재 확인 결과 | 증거 |
| --- | --- | --- |
| 흐름/단계 | ANALYSIS 63개, PNG 단계 참조273개; 대응표 F01~F63/273링크와 일치 | [원본 대응표](FE_MEDIUM_FULL_CLONE_MAP.md) |
| 고유 화면 | screen ID 200개, S001~S200 정확히 대응; 모두1179×2556 | 원본 대응표 S001~S200 |
| UI 요소 | 43장은 200장의 부분집합; ID와 SHA-256 모두 흐름 PNG와 동일 | 43개 UI 요소의 ID/해시 검사 |
| 육안 전수 관찰 | 원본200장을 01~20 축소 시트로 직접 확인 | 20개 시트, 각10장; 글꼴 정밀 측정 증거와 구분 |
| 실제 구현 비교 | 11개의 서로 다른 원본과 현재 앱 캡처를 확대·나란히 확인, overlay/diff 생성 | [실행 결과](FE_GOAL_22_RESULT.md), 당시 화면 비교 |
| 담당/의존성 | C01~C72, F01~F63, S001~S200의 Goal 링크와 단계 연결 검사 | [실행 결과](FE_GOAL_22_RESULT.md) |

축소 시트의 200장과 구현 비교 11장을 합쳐서 211장 구현 검증이라고 세지 않는다. `Snnn`은 이 문서 계열의 정렬 인덱스이고 안정 식별자는 `sc_...`다. 원본 경로·흐름별 단계·중복 occurrence는 원본 대응표와 아래 대표 화면 연결표로 확인한다. 해시는 당시 파일을 읽어 대조했으며 통과 결과만 문서에 남긴다. `medium` 원본 파일은 수정하지 않았다.

## 비교 환경과 재현

| 조건 | 고정한 값 / 한계 |
| --- | --- |
| 코드/fixture | HEAD `5ff91ea`, FE 소스는 변경 없음; 기존 mediumCatalog/mediumFixtures/금융 fixture; 파일별 SHA-256는 당시 보존 검사 기록 |
| 실행 | 기존 localhost:8081, 최초 확인 PID17148 유지; 별도 서버 생성/재시작 없음 |
| 브라우저 | Windows 11 계열 OS build26200, Edge157.0.4341.60, Playwright headless, locale en-US |
| 화면 | 주 비교393×759 CSS px, DPR1, 브라우저 기본 확대100%, OS 배율은 headless 환경에 직접 대응하지 않음 |
| 원본 정규화 | 원본1179×2556→393×852 LANCZOS→crop(0,59,393,818); 앱759높이. 실제 원본 기기/DPR 증명 아님 |
| Safe Area | web inset0; 원본59/34제외는 비교용. sheet의 상단 쌓인 배경/하단 홈 표시 영역은 시각 차이로 남김 |
| 테마 | light, reduced-motion=reduce; 실제 앱 테마 선택은 현재 정적 안내 |
| 계정 | 새 브라우저 context, guest 시작→Google mock A. 개인 프로필을 UI에서 Alex Smith로 변경; 소유자 ID는 example-reader 그대로 |
| 입력/선택 | search Mindfulness/Stories, 기사 ChatGPT 상단, 저장 Reading list 체크 후Done 전, 프로필 Stories빈상태, 설정System default, 새 목록빈폼 |
| 키보드/포커스 | 실제 OS 키보드 없음; search/profile/list의 웹 focus outline은 원본과 다름. S076 빈폼에는 원본도 키보드가 보이지 않음 |
| 스크롤/로딩 | 대표화면 상단, 입력 검색결과 도착·document.fonts.ready·이미지decode와 두 프레임 렌더 후 촬영; 데이터가 없을 때는 명시한 empty상태 |
| 네트워크 | 캡처 context는 localhost8081/data/blob만 허용; 외부 서비스 요청0, 차단목록0; Gummble/공식 문서 조회는 별도 읽기 전용 조사 |
| 추가 폭 | home320×844,1440×844 별도 캡처; 원본 동일 치수 비교/실제 접근성 검증에 포함하지 않음 |

다음 실행도 기존8081을 사용하고 위 조건과 결과 문서의 사용자 흐름으로 새로 캡처한다. 별도 `TODO/evidence` 폴더·비교HTML·검증스크립트를 저장소에 만들지 않는다. 캡처나 로그 파일이 필요한 검증은 저장소 밖 임시 경로를 쓰고 결과/수치/원본ID/차이를 결과 문서에 기록한다. 격리된 mock context에서만 비교용 이름/저장을 변경한다.

검토 시 활성 route와 aria-hidden 상태를 분리하고 화면 안의 DOM 요소 bounds·computed CSS·CDP 실제 글꼴을 측정했다. 주요 수치는 아래 표에 기록한다. 2차 검토에서 남은 modal 뒤 배경 heading을 발견해 활성 aria-modal dialog 안으로 측정 범위를 한정하고 재실행했다. 최종 login/save/profile-edit/list-create 측정은 해당 modal 제목만 포함한다. 반투명 시트 뒤 배경은 캡처에는 보이지만 modal 내부 측정에는 포함하지 않는다.

## 폰트와 측정 기준

비교 항목은 원문/대소문자/말줄임, font family/파일 출처/weight/size/line-height/letter-spacing/baseline/줄바꿈, x/y/width/height/여백/정렬/색/선/radius/그림자, 아이콘 모양·크기, 이미지 crop, 선택/활성 상태, 전환/확정/취소/복귀 UX다.

| 현재 실제 렌더 기준점 | x/y · 크기 | CSS / 실제 CDP 결과 | 원본 판정 |
| --- | --- | --- | --- |
| Home 제목 | 24/24 · 높이32 | 24px/32px, Arial Bold 계열 | 원본 family/file 없음; 육안 유사성으로 동일 판정 불가 |
| Explore 제목 | 24/24 · 폭345/높이32 | 24px/32px, Segoe UI Semibold | Home과도 폴백이 다름; Goal23 공통 적용 검토 |
| Trending on Medium | 24/216 · 폭345/높이28 | 20px/28px, Segoe UI Semibold | 원본 glyph 굵기/작성자 강조 차이 |
| 기사 제목 | 24/125 ·345×76 | 32px/38px, Segoe UI Bold | 같은 2줄이지만 획/글자 폭·baseline 차이 |
| 로그인 Human… | 24/128 ·3줄 | 72px/80px, Georgia | 원본의 serif 자형·폭·크기와 차이; Georgia는 대체 |
| 프로필 Alex Smith | 96/36 ·높이30 | 24px/30px, Segoe UI Semibold | 원본과 주요 기준점 근접, glyph/탭·아이콘 차이 |
| Settings 제목 | 48/13 ·높이22 | 16px/22px, Segoe UI Bold | 원본 header/행 높이 누적 차이 |

위 좌표는 **실제 DOM box 측정**이다. 원본 PNG에서 CSS font-size·line-height·원본 글꼴 이름을 역으로 확정한 값이 아니다. 원본은 raster라 자형 경계와 layout box가 다르다. 현재 tokens의 web sans는 `-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif`, serif는 `Georgia, "Times New Roman", serif`, wordmark는 Times New Roman 계열이다. 이 환경의 실제 Arial/Segoe/Georgia fallback과 원본 iOS font가 같다는 근거는 없다. Goal23에서 폰트 자산/사용 근거·원본 좌표 측정표를 더 확보해야 한다.

## 대표 화면의 차이와 후속 담당

모든 쌍에 차이가 남아 있다. 동일 조건에 가까운 top-level 화면과 원본 account/focus/sheet OS 구조가 다른 진단용 비교를 구분한다. 정확한 ID와273단계 중 occurrence는 아래 대표 화면 연결표로 연결했다.

| 실제 캡처 ↔ 원본 | 확인한 차이 / UX | 담당 |
| --- | --- | --- |
| home ↔ S069 | 같은 For you 카드/사진/순서. 제목 굵기·카드 행간/구분선·reaction/탭 아이콘과 계정 아이콘 차이; 관계 기반 Following 아님 | 23,25,31,50 |
| explore ↔ S021 | 같은 Trending 순서. 작성자 강조·검증 배지·번호와 baseline·아이콘 차이; topic/detail/Follow 연결 미완성 | 23,28,30 |
| search ↔ S098 | 같은 Mindfulness/Stories. 입력 focus 테두리·행 높이/구분선/북마크 모양 차이; 네 추가 결과 유형은 안내 | 23,50,52 |
| article ↔ S037 | 같은 기사/표지. serif·제목 glyph·날짜/Follow 정렬·반응 아이콘 차이; Listen/Responses/Share/Follow 안내 | 23~29,45,47 |
| login ↔ S182 | 원문/5개 제공자 배열 있음. Georgia serif 폭, MOCK 표시/닫기·계정 선택은 자체 추가; Google만 mock 성공 | 23,40 |
| save ↔ S036 | Reading list 선택 상태 맞춤. sheet row 높이/구분선·배경 어둡기·Done 위치/녹색 차이; 실제 저장/취소 가능 | 23,33 |
| profile ↔ S020 | Alex Smith/빈Stories/0followers·1following 외형. 폰트/선택 밑줄/아이콘 차이; followers 숫자는 정적 | 23,28,42 |
| profile-edit ↔ S123 | name/bio 값 조건 일치. 웹 focus·입력 높이/계수 위치·시트 뒤배경 차이; 사진/pronouns/About 안내 | 23,42,52 |
| settings ↔ S173 | 원문 행은 있음. header·행 높이 누적 오차, Friend 배지 대체, static System 선택; 대부분 안내 | 23,24,44,48,49 |
| library-empty ↔ S095 | Reading list empty조건 일치. 소유자 이름은 예시독자A로 다름; 제목·배너·badge·아이콘 차이 | 23,32~35 |
| list-create ↔ S076 | 원본/웹 모두 키보드 안 보임. 원본 입력은 더 낮고 Create는 위쪽; 웹48높이·focus·시트 여백/disabled색 차이 | 23,33,52 |

사진 로딩 전 생성한 중간 비교는 최종 증거로 쓰지 않았다. 최종11쌍은 이미지 decode 이후의 캡처 해시와 연결한다. 전체200장의 시각 일치·모든63흐름 동작 검증은 Goal53 잔여다. Goal22는 차이 분류와 재현 기준선을 만들며 Goal23의 UI 교정을 먼저 구현하지 않는다.

## 추가 원본 조회와 공식 설명

2026-11-19 읽기 전용 Gummble MCP에서 Medium 앱을 재조회했다. appId=`4674239e-d24a-4ef4-aed5-9682429edd48`, slug=`medium-ios`, catalog의 latest=1419/200screens; 전체5versions/569screens다. 이번 앱 조회는 일부 목록1건을 포함한 metadata 조회이며 원격200장을 다시 다운로드해 검증한 것은 아니다. 로컬200장은 별도전수 대조했다. [실행 결과](FE_GOAL_22_RESULT.md).

| 조회 | 결과와 한계 | 다음 담당 |
| --- | --- | --- |
| Font family picker in story display settings | exact0; 관련 화면3건은 폰트 파일/펼친 선택기를 제공하지 않음 | 23,24 |
| Search People Publications Topics Lists results | exact0; 관련6건 중 기존 검색/토픽/목록 외 자료도 섞임; 추가4탭 결과 내용은 미확정 | 30,32,50 |
| Account Membership and payment Email More app controls settings | exact0; 관련5건으로 하위 화면 전체 해결 안 됨 | 44,48,49 |
| 추가3screen 상세/이미지 | Reading list/Highlighted empty/작가 Following 이미지 직접 확인; 로컬200에 없고 응답에version ID가 없어 현재1419의 누락 원본으로 채택하지 않음 | 28,34,49 재조회 |

[실행 결과](FE_GOAL_22_RESULT.md)의 안정 ID는 `sc_ddd503426d044b0c8b30948d72a5e263`, `sc_57f2ae59009b42388697183d5c90da4a`, `sc_e6491de53d8743dca8a3ff0fc99dc1cb`다. MCP가 제공한 이미지를 보았지만 storage URL 직접 저장은 HTTP403으로 실패했다. 우회하지 않았고 새 원본 PNG 파일을 확보했다고 보고하지 않는다. source URL과 webUrl은 응답에 남겼다. 검색 결과 없음은 기능 자체가 없다는 증거가 아니다.

현재 공식 문서는 보관 iOS 캡처의 시각/당시 정책과 별개 근거다. 다음 페이지를 실제 열어 확인했다.

| 공식 설명 | 확인한 내용 | 버전/한계·담당 |
| --- | --- | --- |
| [Create and manage lists](https://help.medium.com/hc/en-us/articles/214993247-Create-and-manage-lists) | 여러 목록 소속, 전체목록 저장, 기본 Reading list 삭제불가, 목록 항목 메모·재정렬·다운로드 해제·응답 관리 | 표시 update2026-11-11 19:42; 메모에 근거 없는 premium 제한 금지;32~35/29 |
| [About claps](https://help.medium.com/hc/en-us/articles/115011350967-About-claps) | 기사 또는 목록에 최대50claps, Undo claps, 박수 사용자 정보의 노출 차이 | 표시 update2026-11-13 20:15; 댓글 최대치로 일반화 금지, 펼친 UI미확인;25/26/32 |
| [How to block and manage blocked users](https://help.medium.com/hc/en-us/articles/217048077-How-to-block-and-manage-blocked-users) | Account의 Blocked users 관리, feed/Digest·follow·응답/mention·목록에 영향 | 표시 update2026-11-11 19:08; 차단 후에도 카드가 남은 보관캡처와 동일 시점/의미라고 단정 금지;29/49 |

공식 문서 update시각에는 별도 시간대를 추정하지 않았다. 현재 공식 설명은 미래 backend 사업 정책을 확정한 것이 아니다. 예컨대 차단 후 공개 카드 노출의 캡처/문서 충돌은 재현·추가 원본 확인 후 담당29에서 판단한다.

## 미확인·미수록 항목의 소유자

아래 묶음과 [대응표 F01~F63의 미수록 분기](FE_MEDIUM_FULL_CLONE_MAP.md)를 함께 사용한다. 원본이 있는 메뉴/취소/확정은 그 흐름의 주담당이 맡고, 메뉴 실행의 별도기능은 C번호 담당으로 연결한다. 같은 화면이 여러 흐름에 있을 때 관련Goal의 합집합을 유지한다.

| 확인 과제 | 현재 근거 구분 / 다음 확인 방법 | 담당 |
| --- | --- | --- |
| 원본 font file/정확한 weight·아이콘·애니메이션 | 미확인; 원본 소유 출처/동일버전 자료 확보, 대체 glyph를 동일 판정 금지 | 23 |
| Font family 펼친 항목·전역/기사 표시 영향 | 캡처/추가조회 부족;1419 관련 flow/detail 추가조회 | 24 |
| 누적 박수 취소·사용자 목록·응답 자기박수 정책 | 공식/캡처 근거 분리; 원본 메뉴 및 target별 한도 재확인 | 25,26,32 |
| responses 관리·report item·Blocked users | 일부 메뉴는 관찰/하위 미수록, 공식 설명 추가; 목록 item의 신고도 누락 금지 | 29,49 |
| 작가/profile filters·구독·publication/topic·추천 | 관계별 ID/펼친 필터/실패 미수록;각F분기와 데이터 연결 재조회 | 28,30,31,42 |
| Saved lists·메모 빈값·private 전환·순서·Undo | 관찰된 원본과 공식 구분, Cancel/동일기사 다중목록/타인 접근 보완은 자체 설계로 표시 | 32,33 |
| Digest 선택·빈도·offline 취소/실패 | 최신10개와10일 혼동 금지, cache fixture와실제OS저장 구분 | 34,35,44 |
| Camera/Photo Library/Unsplash | **프로필 갤러리 S113은 수록됨**. 편집기에서 같은 picker인지/촬영·권한거절·오류는미확인 | 37,42,52 |
| 편집기 code·초안 재개/삭제·publication/unlisted/발행 | 미수록 분기; 다음화면은 공식/추정/자체보완 구분 | 36~39 |
| 이메일 코드/재전송·provider 취소·온보딩skip/재진입 | 일부원본/실제메일미연결, mock상태로 검증;성공을실제인증이라표현금지 | 40,41 |
| stats 집계기간·월간11/2와Lifetime0/0 모순 | 캡처 관찰만; 코호트/집계 계산식은미확정 | 43 |
| push Tailored/잘린하단·Email | 행은관찰, 펼친옵션미확인; OS권한과계정선호별도 | 44 |
| 오디오 voice/속도/WPM·AirPlay/queue | Hans는음성언어,번역아님;200→490을2.5배계산식으로단정금지 | 45,46 |
| 인용·작가·토픽·목록별Share·friendlink·추가이미지스타일 | 진입관찰/일부OSsheet만수록,발급/외부전송없음 | 47 |
| 멤버십/복원/해지/환불/혜택·Account/외부목적지/아이콘 | SGD보관fixture,혜택표현과미수록서비스구분;추가하위화면조회필요 | 48,49 |
| 나머지검색4유형·모든전환/빈상태/경합·native | 원본추가조회+mock계약통합, 실제기기환경준비 | 50,51,52,53 |

## 검증 상태와 다음 단계 조건

타입/lint/전체662테스트·90suites 및 Android/iOS JS/Hermes export는 **이번실행 통과**다. Jest의 iOS/Android 설정은 OS실행이 아니다. Windows에는 Xcode 실행환경이 없고 Android SDK/adb/emulator/JDK 및 관련환경변수·native프로젝트 디렉터리도 없음을 확인했다. [실행 결과](FE_GOAL_22_RESULT.md). APK/AAB/IPA·실기기·VoiceOver/TalkBack·OSDynamicType·실제IME·AirPlay·권한 검증은 Goal52 담당이며 각플랫폼기능Goal에서도 필요한 장치를 준비한다.

Goal23 시작에 필요한 기준 문서·현재 코드·비교 조건·차이 담당은 마련됐다. 기존 캡처 파일은 커밋에 포함하지 않으므로 다음 실행에서 조건에 맞게 새로 촬영한다. 폰트 미확인 때문에 정확한 글꼴 동일 판정은 여전히 불가하며 해당조사를 Goal23 시작항목으로 유지한다. 비교용 계정/저장상태는 조작한 fixture를 명시하고 UI시트의OS영역은 화면마다 확인한다. 테스트 수치나 screenshot 개수로 미확인 항목을 완료 처리하지 않는다. **이번 작업은 Goal22에서 종료하며 Goal23 구현은 시작하지 않았다.**


## 대표 비교 원본 연결

캡처 파일을 버전 관리하지 않아도 원본을 다시 찾을 수 있도록 ID와 경로를 남긴다. 아래 표는 실제 비교한 11쌍이며 전체200장 구현 검증이 아니다.

| 화면 | 원본 ID | 실제 PNG |
| --- | --- | --- |
| home | S069 · `sc_5e0ba0e498ff49579bf838096aec4b5e` | [원본](<../medium/flows/Explore/screens/01_sc_5e0ba0e498ff49579bf838096aec4b5e.png>) |
| explore | S021 · `sc_1c3e4349171248378eada528f7942269` | [원본](<../medium/flows/Explore/screens/02_sc_1c3e4349171248378eada528f7942269.png>) |
| search | S098 · `sc_8dc9eeb5f9d244ca9fa6fb7a973de82f` | [원본](<../medium/flows/Explore/Searching Medium/screens/03_sc_8dc9eeb5f9d244ca9fa6fb7a973de82f.png>) |
| article | S037 · `sc_332d5b0923e546fcbf6a8fc613cda6a4` | [원본](<../medium/flows/Home/Story detail/screens/02_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>) |
| login | S182 · `sc_e4d414380a1047a2b7970cf7869a0866` | [원본](<../medium/flows/Logging in/screens/02_sc_e4d414380a1047a2b7970cf7869a0866.png>) |
| save | S036 · `sc_31edfd53d2874259a6ed5ecbc756d10b` | [원본](<../medium/flows/Home/Story detail/Saving a story/screens/02_sc_31edfd53d2874259a6ed5ecbc756d10b.png>) |
| profile | S020 · `sc_1bd141b757934a88b4a003855e1794cc` | [원본](<../medium/flows/Profile/screens/02_sc_1bd141b757934a88b4a003855e1794cc.png>) |
| profile-edit | S123 · `sc_a829121c47a444cd8a8fd0d9889edaed` | [원본](<../medium/flows/Profile/Editing profile information/screens/02_sc_a829121c47a444cd8a8fd0d9889edaed.png>) |
| settings | S173 · `sc_ddd51660cb8346a1b200ed970a2d5c45` | [원본](<../medium/flows/Profile/Settings/screens/02_sc_ddd51660cb8346a1b200ed970a2d5c45.png>) |
| library-empty | S095 · `sc_84e0421de98041bbb014822fc05dd3fb` | [원본](<../medium/flows/Library/screens/02_sc_84e0421de98041bbb014822fc05dd3fb.png>) |
| list-create | S076 · `sc_675e3eda08504708979533659dacdcf6` | [원본](<../medium/flows/Library/Creating a list/screens/02_sc_675e3eda08504708979533659dacdcf6.png>) |
