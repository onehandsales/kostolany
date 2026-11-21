# Goal 52 — iOS·Android·접근성·성능·native 경계 검증

2026-11-21 KST · macOS14.2 arm64 · Node24.18.0. 시작 HEAD `44c81e8d276cffd3db377f630adc8141c80f6734`(Goal51), 작업 트리 clean. **플랫폼/접근성 결함 수정·두 차례 자체 검토 / 최종 타입/lint·전체262suites/1426tests 통과 / 실제 iOS·Android 실행과 원본 차이 잔여.** 원본 전체 동일 재현·OS 성공·출시 완료가 아니다. 단계 검증·로컬 커밋 후 승인된 Goal53만 이어간다.

## 수정과 상태 계약

| 문제·재현 | 원인·수정·검증 |
| --- | --- |
| 앱 System 테마의 native 구성 불일치 | `userInterfaceStyle:light`, Android SystemUI 누락. SDK57 권장 `expo-system-ui ~57.0.4` 한 개 추가, `automatic`/plugin 지정. 격리 prebuild의 iOS Automatic·Android automatic 확인. 실제 기기 전환은 미검증. |
| 편집 Camera/Library가 예시 선택 | 기존 프로필의 OS/web picker를 shared/media로 추출. 앱의 기본 편집 source는 실제 picker 어댑터를 사용하고 Unsplash 검색은 기존 로컬 fixture로 유지. 라이브러리 전체 읽기·마이크 권한을 새로 요구하지 않는다. |
| 웹 사진 오류가 모두 처리 실패로 합쳐짐 | 공유 picker의 catch가 형식/용량 invalid도 processing으로 바꿨다. 이미 분류된 LocalImageError를 보존해 재선택 가능한 입력 문제와 처리 실패를 구분한다. 파일 선택 DOM 정리 회귀를 추가했다. |
| 화면을 닫으면 선택 이미지 자원이 사라질 위험 | 편집 image source가 선택/삽입 lease와 `DraftSource.getImageAssetIds()`의 확정 문서 참조를 함께 소유한다. source subscriber로 실제 초안/발행 원본과 연결한다. UI는 별도 문서 목록을 복제하지 않는다. 취소/제거·마지막 문서 참조 종료·source 종료에 해제. |
| 웹 모달 뒤 배경을 계속 탐색 가능 | 로그인 모달 중 홈 탭1개가 접근성 role 조회에 남았다. 공통 AccessibleModal을20개 기존 Modal 사용처에 적용해 웹 body 포털을 inert/aria-hidden으로 격리하고 중첩 모달·원래 속성·진입 포커스를 복원한다. 수정 후 배경 홈 탭0. |
| 모달이 동작 줄이기 설정을 무시 | native AccessibilityInfo와 웹 media query를 연결했다. 초기 조회 전에는 감소 동작을 택하고 늦은 조회가 새 설정을 덮지 않는다. 조회 실패로 권한 요청을 띄우지 않는다. unmount 시 구독 해제. |

공유 사진 picker는 최대20MB/40M픽셀을 검사하고 프로필은최대768, 편집은최대1600변으로 JPEG 처리한다. 원본 라이브러리 파일을 삭제하지 않고 앱 캐시/blob만 소유한다. 프로필의 사진·부모 Save/Cancel·계정별 확정 참조 계약은 유지한다. 편집기에서는 사용자 클릭 안에서 picker를 호출하고 취소·동기 실패·permission/unsupported/invalid/processing·재시도·source 교체/계정 이탈 뒤 늦은 결과를 분리한다. 성공한 선택의 asset ID만 문서에 넣으며 외부 Storage 업로드·영구 저장은 없다. 전체 앱 새로고침은 기존 메모리 문서와 자원 초기화다.

편집기의 정상 뒤로 복귀는 기존 `session.flush()` 완료를 기다린다. 계정/세션 이탈은 진행 중 초안 요청을 abort하고 mock DraftSource는 확정 직전에 signal을 검사한다. 이미 확정된 문서는 subscriber가 사진 참조를 보유하므로 화면 lease 해제만으로 사진을 삭제하지 않는다. 이는 프로필의 이미 확정된 저장을 취소하지 않는 계약과 구분하며 기존 초안 취소 정책을 바꾸지 않았다.

모달의 DOM 조작은 `.web` 경계에만 있다. native는 RN Modal의 기존 onRequestClose/레이아웃을 유지하고 animationType만 감소 동작에 맞춘다. 웹 MutationObserver는 body 직계 포털 변화만 보고 마지막 모달 종료 때 해제한다. 배경 속성은 기존 값을 보관해 복구한다. 이 변경을 실제 OS 화면 읽기 성공이라고 표현하지 않는다.

## 두 차례 검토

독립 검토자는 사용하지 않았다. 외부 `review-1.md`, `review-2.md`가 실제 검토 기록이다.

- 1차: 테마 설정/모듈·프로필/편집 picker·선택/문서 자원 수명·20개 Modal 사용처·현재 권한/플랫폼 경계를 대조했다. System 테마, mock picker 잔여, 문서 이미지 수명, 모달 배경 노출을 수정했다. 초기 effect 동기 setState와 ref 추적 lint 오류는 source identity와 선택 hook으로 해결했고 검사 규칙을 끄지 않았다.
- 수정 후 검사: 초기 자원 테스트는 발행 제목이 없는 fixture로 실패해 제목을 보완했다. 관련8suites32tests 통과. 실제 브라우저에서 선택 취소/실패/복구·초안·발행 이미지를 확인했다.
- 2차: 수정된 provider/source·구독 해제·브라우저 포커스/중첩·생성 native 설정·원본2쌍을 다시 검토했다. 추가로 감소 동작 연결 누락을 발견해 수정하고4suites6tests와 실제 웹0초 애니메이션을 확인했다. 이후 최종 검사와 번들 결과를 아래에 별도로 기록한다.

## 실제 실행 결과

모든 npm/Expo 검사는 `FE`에서 Node24.18.0 PATH로 실행한다. 최종 후보에 대한 결과만 성공으로 기록하며 중간 실행을 숨기지 않는다.

| 실행 | 결과/증거 |
| --- | --- |
| `expo install expo-system-ui` | SDK57 호환57.0.4, 패키지1개 추가. npm audit의 기존 moderate3건은 유지되고 강제 업그레이드는 하지 않았다. `install-system-ui.log`. |
| 타입/lint | 최종 코드 **통과**, `typecheck-candidate.log` / `lint-candidate.log`. 이후 제품/테스트 코드 변경 없음. |
| picker/resource/모달 단위·provider 회귀 | **8suites/32tests,3.196초** `modal-resource-regression.log`. 모달 DOM 테스트는 jsdom이며 iOS/Android Jest 프로젝트 이름이 실제 OS 실행을 뜻하지 않는다. |
| 감소 동작/모달·최종 사진 오류 회귀 | **4suites/6tests,1.614초** `motion-tests.log`; 웹 invalid 분류 보완 후 **10suites/22tests,5.068초** `tests-postfix.log`. Native AccessibilityInfo는 제어된 대역이다. |
| 중간 편집/프로필/navigation | `media-tests.log`: 제목 누락 fixture2실패/46통과,12suites. 수정 후 `media-modal-tests.log`:15suites 통과/1실패,56tests통과/4실패. 첫 ProfileDetails 시나리오5초 timeout 후 같은 파일 후속3개에 정리 영향. 격리 재실행 `profile-details-isolated.log`는2suites8tests31.799초 통과. 최종 전체 검사를 별도로 수행한다. |
| 전체 Jest | **262suites/1426tests 전부 통과,399.147초**. 모든 제품/테스트 변경을 고정한 `tests-awake.log`/`jest-awake.json`. 중간 실패·절전 증거와 복구는 아래에 별도로 기록한다. |
| 8081 브라우저 | `browser.json`:3개 묶음 error0. 웹 파일 취소/손상/재시도/발행, 모달 반복/포커스,320폭/긴 한국어/CSS 글자160%/Dark/System. `modal-before.json` 배경탭1→`modal-after.json`0. `modal-reduced.json` 모달 조상 애니메이션 모두0s. 웹 invalid 분류 보완 후 `invalid-file.cjs/json/png`에서 오류 분류·입력 정리·재선택·error0을 추가 확인. |
| 긴 목록 현재 재실행 | `long-list.cjs/log`, `browser-extended.json`:3개 묶음 error0.150개 긴 알림 중31행 렌더, 스크롤2400→2400, 행 터치272×238, 가로 넘침 없음. 잘못된 대상 재시도와 원본 비교 fixture도 구분했다. |
| 모달/화면 자원 |10회 모달 열기·닫기 뒤 body observer0/inert root0. 초안 재진입/발행 본문 blob 이미지 naturalWidth240. 전체 앱 메모리 누수의 완전한 증명이나 native heap/FPS 측정은 아니다. |
| `expo prebuild --platform all --no-install` | **성공**. 저장소 밖 사본, 테스트용 `com.kostolany.preview`만 지정, ENV 제외. iOS/Android 프로젝트 생성이고 build/install/run은 아니다. `native-audit.py`, `prebuild.log`, `prebuild-result.json`. |
| `expo export --platform all --max-workers 1` | **web/iOS/Android 성공**, `export.log`/`export/metadata.json`. JS/Hermes 생성이며 native 빌드가 아니다. |

중간 검사와 복구:

- 감소 동작 추가 전 checkpoint는 **258suites/1422tests,394.946초 통과**(`tests-final.log`). 최종 코드의 전체 검사로 대신하지 않는다.
- 감소 동작 테스트의 RN 이벤트 오버로드 타입 오류(`typecheck-complete.log`)는 실제 boolean 이벤트 경계를 정확히 지정해 수정했다. any/강제 이중 변환은 쓰지 않았다.
- 후속 전체 `tests-release.log`는 **259suites 통과/1실패,1422tests 통과/2실패,449.052초**였다. Android SettingsNavigation의5초 제한 초과였다. 코드/한도 변경 없는 격리 실행은 **2suites/24tests,43.142초 통과**(`settings-isolated.log`).
- 단독 전체 `tests-frozen.log`에서도 저장/계정 전환2건이5초를 넘어 내 Jest 프로세스만 중단했다(exit130). 동시 부하만을 원인으로 확정하지 않았다. 기존 동파일의 긴 통합 흐름과 동일하게 로그아웃1건과 저장/계정 전환2건만15초 유한 한도를 적용했다. 실제 navigation·검증문·Promise 순서는 유지하고 모든 변경을 고정한 전체 검사를 다시 실행했다.

- `tests-candidate.log`는 **259suites 통과/3실패,1423tests 통과/3실패,677.613초**였다. SearchScreen·ProfileScreen·App의 실패 구간(16:01:19~02:54,16:03:01~03:54,16:04:05~06:35 KST)이 `sleep-events.log`의 Clamshell/Maintenance Sleep과 겹쳤다. 이 세 테스트는 변경하지 않고 현재 후보를 `caffeinate -i npm test -- --runInBand --json --outputFile=…/jest-awake.json`으로 재검사해 전체262suites/1426tests 통과를 확인했다. 유휴 절전 assertion은 해당 명령 종료 때 해제되며 덮개 닫힘 절전을 막거나 영구 전원 설정을 바꾸지 않는다.

루트 디렉터리에서 잘못 호출한 npm 명령 로그는 FE에서 재실행한 `*-fe.log` 등과 구분한다. 검사 개수 증가 목적의 테스트는 추가하지 않았다. 실제 navigation 검사는 기존 AppNavigator/Provider를 유지한다. 장애 주입은 외부 브라우저 세션에서 복구했고 source 시나리오 기본값을 변경하지 않았다.

## 플랫폼별 확인과 한계

| 항목 | web / 자동 검사 / 코드 확인 | 실제 iOS | 실제 Android |
| --- | --- | --- | --- |
| Camera/Library·이미지 처리 | 프로필/편집 공유 어댑터, 웹 파일 취소·손상·선택·재시도·초안/발행. native permission/cache/late 결과 대역 검사 | OS 호출 구현, 촬영/앨범/권한 화면 실행 미검증 | OS 호출 구현, 실제 Camera/Photo Picker 실행 미검증 |
| 사진 자원·공유·클립보드·저장 | 기존 Share/Clipboard/MediaLibrary/ViewShot 어댑터 및 회귀, 신규 blob 수명 확인 | Share sheet/Photos/Clipboard 실제 동작 대기 | Share chooser/갤러리/Clipboard 실제 동작 대기 |
| 알림 권한·외부 Settings·아이콘 | 기존 어댑터 경계·source 수명/foreground 재조회 검사, F60 잠금/선택 UI·생성 설정 확인 | permission/Settings 복귀/alternate icon 실행 대기 | permission/Settings 복귀/activity alias 실행 대기 |
| 오디오 | mock 재생 위치·속도·음성·수명과 기존 회귀 | 실제 음성 합성/오디오 엔진 미연결 | 실제 음성 합성/오디오 엔진 미연결 |
| 큰 글자·터치·포커스 |320×640, 긴 한국어, CSS160%, web Escape/복귀. 아이콘 화면 visible13조작 모두 최소48논리단위 | Dynamic Type/VoiceOver/노치/키보드/스와이프 미검증 | TalkBack/실제 IME/시스템 뒤로/edge-to-edge 미검증 |
| 감소 동작 | 웹 media query0초, RN API 조회/변경/해제 대역 | 실제 Reduce Motion 대기 | 실제 애니메이션 끔 대기 |
| 성능·자원 | 실제 웹150알림 가상화/스크롤·반복모달 observer, source lease/unit 수명 | native heap/FPS/저사양 실기기 대기 | native heap/FPS/저사양 실기기 대기 |

현재 `platform.json`: Xcode.app 없음, CLT 경로만 활성, xcodebuild exit1·simctl 사용 불가. Android SDK/adb/emulator/sdkmanager/Android Studio 없음, **Corretto JDK23.0.1은 설치돼 있음**. iOS는 지원 Xcode와 simulator/실기기, Android는 호환 SDK/build tools/emulator 또는 기기와 Gradle 환경이 필요하다. 테스트용 bundle ID의 생성 결과를 배포용 앱 식별자나 실제 설치 결과로 취급하지 않는다. 환경 준비 뒤 각 어댑터의 허용/거절/취소·앱 복귀·계정 전환·해당 화면 재진입을 실제 기기에서 반복해야 한다. 카메라는 촬영 가능한 기기가 필요하다.

**이전 잔여 구분:** Goal37 편집기 실제 OS picker 연결은 이번 코드에서 구현했다. iOS/Android 실행 증거는 여전히 없으므로 OS 성공 완료로 올리지 않는다. Goal49의 SystemUI 누락 경고/고정 Light 구성은 수정했으나 실제 아이콘 적용·native 빌드는 검증 대기다. 웹 파일 선택은 실제 iOS/Android Camera 성공의 증거가 아니다.

## 원본 시각 대조·공식 근거

F60 Custom app icon ANALYSIS와 원본2장, 현재393×759 Light 캡처를 대조했다.1179×2556을1/3로 줄이고 iOS 상하 시스템 영역59/34를 제외한 원본/실제/50% overlay다. 별도320폭·Dark·CSS 확대 캡처는 동일 조건 픽셀 비교와 구분한다.

| 원본 | 현재 캡처·판정 |
| --- | --- |
| `sc_ddd51660cb8346a1b200ed970a2d5c45` | `settings-393.png`/`compare-01.png`: Settings 섹션/Appearance/notification/icon 진입. 글꼴·일부 간격·mock membership 표시·아바타 차이 잔여. |
| `sc_64b75d913b284d708ab44e4f3663a59f` | `icons-393.png`/`compare-02.png`: 확인된8개 카드·Wordmark Black 선택·Friend 잠금. K 자체 자산·폰트/헤더/하단 버튼·원본에서 잘린 추가 카드 차이. OS 런처 모습은 원본에도 미수록이며 이번에도 미검증. |

현재 공식 근거는 [Expo SDK57 ImagePicker](https://docs.expo.dev/versions/v57.0.0/sdk/imagepicker/), [SystemUI](https://docs.expo.dev/versions/v57.0.0/sdk/system-ui/), [Color themes](https://docs.expo.dev/develop/user-interface/color-themes/), [RN0.86 AccessibilityInfo](https://reactnative.dev/docs/0.86/accessibilityinfo)와 설치된 package/type/config plugin이다. 최신 문서의 SDK58과 현재57을 구분해57을 다시 확인했다. 이 자료를 과거 Medium의 픽셀·권한 기본값 근거로 소급하지 않는다. 원본 관찰/실제 구현/자체 보완/미수록을 섞지 않는다.

## 증거와 최종 확인 순서

최종 검토: staged 범위54파일·`git diff --check` 통과. Camera/Library 실제 OS 호출 구현과 웹 파일 검증, native 실행 대기를 구분했다. 최종 전체 검사 이후에는 결과/현재 상태 문서만 갱신했다.

외부 경로: `/var/folders/jg/zn9h2_f91nxfpwz9hzpkqcv80000gn/T/kostolany-goal52-w63b5l1b`. 리뷰·로그·브라우저/비교 스크립트·캡처·pairs.json·compare-01..02.png·격리 native 생성물. 임시 디렉터리이므로 시스템 정리 후 보관이 보장되지 않는다. 재현은 기록한 Node24 명령과 `.cjs`의 Playwright 경로를 현 환경에 맞춰 실행한다. 저장소에 evidence/임시 비교/로그 스크립트를 넣지 않았다.8081 PID58453·기존 ENV·medium·사용자 변경을 보존했다.

1. 8081 새로고침→프로필 mock A 로그인. 로그인 모달 중 배경 탭이 탐색되지 않는지 확인.
2. 프로필 편집→대명사 선택/뒤로→Escape/닫기→진입 버튼 포커스 복귀. 반복 열기/닫기.
3. Home Write→제목/본문→사진 삽입→Library 취소→손상 파일/정상 검증 PNG 선택→편집기 닫기→프로필 Drafts 재진입→Next/Publish→발행 본문 사진 확인.
4. Settings→Dark→320폭 프로필의 긴 이름/소개/대명사 검색→스크롤/닫기. System 전환 후 브라우저 light/dark media 변경 확인.
5. Custom app icon의 선택/잠금·48논리단위 조작 영역 확인. 실제 OS 적용은 native 환경 준비 후 별도로 수행.
6. 긴 알림·실패/접근 해제와 제어된 자원 수명은 외부 스크립트 및 회귀 테스트로 재현.

로컬 커밋 권장 메시지: `fix(fe): verify platform boundaries and accessible modals for goal 52`. 실제 native·원본 시각 잔여를 기록한 것만으로 전체 클론 완료 처리하지 않는다.
