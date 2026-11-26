# 모바일 실행 환경과 비교 조건 — 1단계

2026-11-26. 사용자가 [7단계 진행 순서](MEDIUM_PARITY/EXECUTION_PLAN.md)를 확정하고 진행을 요청했다. 시작 HEAD는 `3332f0c`이며 시작 작업 트리는 깨끗했다. 현재 단계는 실행 환경 준비와 모바일 첫 실행이며 전체 UX/UI 동일성·Parity21/22 완료 판정이 아니다.

## 현재 확인

- Windows 11 Home, Node24.18.0·npm10.9.0으로 프로젝트 요구 버전을 충족한다.
- `D:\Android\Sdk`에 Android SDK36·Build Tools36.0.0·adb37.0.3·emulator37.3.10이 있다. WHPX 사용 가능 판정이다.
- JDK17.0.21.1은 `D:\Android\test-jdk17\jdk-17.0.21.1+2`에 있다. 사용자/시스템 JAVA_HOME·ANDROID_HOME·PATH는 변경하지 않고 명령 프로세스에만 지정한다.
- 시작 시 실제 Android 연결 기기는 없었다. 사용자는 현재 확인 환경이 Windows라고 답했다. 현재 PC에서는 Android 에뮬레이터로 확인하며 iOS 실행 환경은 미확보 상태로 구분한다.
- 설치된 node_modules에는 잠금 파일의 `react-native-enriched-html`이 누락돼 있었다. `npm.cmd ci --no-audit --no-fund`로1078개 패키지를 복원했으며 package.json·package-lock.json 변경은 없다.
- [app.json](../FE/app.json)의 Android application ID를 로컬 개발 빌드용 `com.kostolany.mobile`로 지정했다. 스토어 등록·서명·배포는 수행하지 않는다.
- `expo prebuild --platform android --no-install` 통과. 기존 native 폴더가 없음을 확인하고 생성했으며 `--clean`은 사용하지 않았다. `FE/android`는 기존 gitignore 대상이다. Swift/Kotlin 소스를 직접 작성하지 않았다.
- `npm.cmd run typecheck` 통과. 현재 변경은 앱 식별자와 실행 준비이며 기존 전체 Jest 결과를 이번 실행으로 표시하지 않는다.
- Android x86_64 debug APK 빌드·설치·앱 시작과 아래 기본 흐름을 확인했다. iOS·실제 휴대폰·원본 전수 비교는 미검증이다.
- 첫 빌드에서 NDK27.1.12297006·CMake3.22.1·일부 의존성이 요구한 Build Tools35.0.0을 기존 SDK에 추가 설치했다. 프로젝트 의존성 버전과 잠금 파일은 변경하지 않았다.

## Android 비교 환경

기존 다른 프로젝트의 AVD 데이터를 보존하고 `FE/.cache/avd/Kostolany_API_36.avd`에 별도 가상 기기를 만들었다. SDK의 기존 Android16/API36 Google APIs x86_64 이미지를 사용한다. 앱·빌드 생성물은 기존 제외 경로인 `FE/android`, `FE/.cache`를 사용한다. 첫 native 빌드가 만든 로컬 Expo 모듈의 `modules/*/android/build/`도 FE gitignore에 추가했다.

| 항목 | 현재 값과 해석 |
| --- | --- |
| AVD | Kostolany_API_36, emulator-5556; 최초 자동 검사는 창 없는 실행, 후속 사용자 확인은 창 표시 |
| 화면 | 1170×2532 physical pixels, density480; 전체 화면 기준390×844 논리 단위 |
| 글자 확대 | adb 조회1.0 |
| 언어·시간·테마 | en-US, 재시작 후 실제 시간대 Asia/Seoul, 실제 시계·Light; 원본 촬영 시각이나 CP-WEB-01 고정 시계 재현 아님 |
| 렌더러 | SwiftShader, WHPX 가속; 실제 휴대폰 GPU·터치 증거 아님 |
| 원본 | Medium iOS catalog1419, PNG1179×2556, 메타데이터390×844; 원본 DPR·기기·OS 확정 근거 없음 |
| 비교 한계 | Android 시스템 바·키보드·Safe Area를 iOS 원본과 분리; 실제 앱 viewport/inset·콘텐츠·테마·스크롤은 진입 후 확인 |

기존 `CP-WEB-01`은 웹 비교 조건으로 보존한다. 새 Android 환경을 그 프로필의 재현 완료나 원본과 동일한 DPR로 표시하지 않는다. 가상 기기는 개발 검증이며5단계의 실제 휴대폰 검증과 구분한다.

초기 확인 대상은 기존 baseline의 S069 홈, S037 기사 상단, S042 빈 편집기·S183 인용 서식, S036 저장 시트, S095 Library다. 각 화면의 계정·fixture·테마·키보드·스크롤은 [기존 조건](MEDIUM_PARITY/COMPARISON_BASELINE.md)을 따른다. 이 대상 선정은 실제 화면 대조 완료가 아니다.

## 실행 명령과 보존 범위

현재 PowerShell 프로세스에 아래 경로를 지정하고 생성된 Android 프로젝트에서 빌드한다. 사용자의 전역 환경변수·ENV 파일·기존 앱/가상 기기 데이터를 변경하지 않는다.

```powershell
$env:JAVA_HOME = 'D:\Android\test-jdk17\jdk-17.0.21.1+2'
$env:ANDROID_HOME = 'D:\Android\Sdk'
$env:ANDROID_SDK_ROOT = 'D:\Android\Sdk'
$env:GRADLE_USER_HOME = 'D:\git_repository\kostolany_project\FE\.cache\gradle'
Set-Location D:\git_repository\kostolany_project\FE\android
.\gradlew.bat :app:assembleDebug -PreactNativeArchitectures=x86_64 -PreactNativeDevServerPort=8081 --max-workers=2 --no-daemon --console=plain
```

빌드의 임시 디렉터리는 프로세스 TEMP/TMP를 `FE/.cache/tmp`로 지정했다. SDK·Gradle·에뮬레이터의 일반 생성물과 원본 비교 증거를 구분하며 별도 tools/evidence/캡처/검증 manifest는 생성하지 않는다. 기준 원본과 기존 비교 JSON을 보존한다.

[Expo 공식 로컬 빌드 안내](https://docs.expo.dev/guides/local-app-development/)의 native 생성→컴파일→설치→Metro 실행 단계를 구분한다. iOS는 Xcode 환경에서 별도 실행해야 하며 Android 성공으로 대체하지 않는다.

## 후속 실행 결과

### 빌드와 실행

- `:app:assembleDebug` 성공:23분28초,293 tasks 실행. APK는 `FE/android/app/build/outputs/apk/debug/app-debug.apk`,63,535,121 bytes다. x86_64 에뮬레이터용 debug 서명 빌드이며 실제 ARM 휴대폰·release·스토어 산출물이 아니다.
- native 라이브러리의 deprecated API·일부 Manifest 정리 경고와 첫 실행의 NODE_ENV 미지정 경고가 있었다. 경고0으로 기록하지 않는다. 후속 직접 Gradle 실행에는 프로세스 `NODE_ENV=development`를 명시할 수 있다.
- `adb -s emulator-5556 install -r .../app-debug.apk` 성공. `am start -W -n com.kostolany.mobile/.MainActivity`가 COLD/Status ok를 반환했고 실제 홈 화면을 열람했다.
- Android native 실행에서 모의 로그인→편집기 진입→제목 `Mobile smoke test`·영문 두 문단 입력→둘째 문단 인용선/기울임→Saved→Story preview→Publish now→내 Stories→발행 글 읽기를 실행했다. 미리보기와 읽기 화면에 두 문단이 전달됐다. 서버 발행·재실행 영속성 검증은 아니다.
- 편집기의 실제 키보드·인용선·본문과 홈을 메모리 화면으로 확인했다. UI hierarchy도 stdout으로 읽었으며 캡처/XML/로그를 별도 증거 파일로 저장하지 않았다. 모델 표시용 이미지는 축소 JPEG이며 픽셀 동일성 증거로 사용하지 않는다.
- 해당 앱 PID의 AndroidRuntime/ReactNativeJS/ReactNative error 로그 조회에서 일치하는 항목이 없었다. 다른 기기·다른 흐름 전체의 오류 부재를 뜻하지 않는다.

### 사용자 수동 확인 — 2026-11-26

사용자가 Windows의 표시된 Android 에뮬레이터에서 아래 안내 8개 항목을 실행한 뒤 “다 동작해”라고 보고했다. 판정은 **사용자 수동 확인 통과**이며 에이전트가 같은 8항목을 다시 실행한 결과나 실제 휴대폰 검증으로 기록하지 않는다.

| 번호 | 안내한 확인 내용 | 결과 |
| --- | --- | --- |
| 1 | `Stock` 글의 `First sentence.` 중간에 입력해 `First updated sentence.`로 변경 | 사용자 확인 통과 |
| 2 | `Second sentence.`에만 인용 서식 적용 | 사용자 확인 통과 |
| 3 | `Third sentence.`에만 목록 서식 적용 | 사용자 확인 통과 |
| 4 | Saved→Close→Profile/Stories→Drafts→Stock에서 입력과 서식 유지 | 사용자 확인 통과 |
| 5 | Next→Publish now→Stories→Stock 읽기에서 내용과 서식 유지 | 사용자 확인 통과 |
| 6 | 읽기 화면에서 선택 손잡이로 `updated`만 선택하고 Highlight 적용 | 사용자 확인 통과 |
| 7 | `Second sentence.` 선택→Respond→`This is a test response.` 입력→전송 | 사용자 확인 통과 |
| 8 | Save to→읽기 목록→Done→Library에서 같은 글 다시 열기 | 사용자 확인 통과 |

이 보고는 해당 영문 입력·단일 문단 선택·mock 세션 흐름에 한정한다. 한글 IME, 다중 문단/이미지 경계 선택, Undo/Redo, 앱 재시작 영속성, 실제 서버·실기기·iOS·전체 원본 동일성은 미검증으로 유지한다. 이어서 공통 디자인의 대표 화면 대조를 진행한다.

### 실행 서버 보완

처음 CI 모드의 Android 번들은 성공했지만 일반 감시 모드로 실행한 Metro의 `/status`가5초·15초 조회에서 모두 timeout이었다. 기본 Expo blockList는 이번 `FE/.cache`의 Gradle·AVD·Metro 임시 캐시를 제외하지 않았다. 서버 프로세스의 지속적인 CPU 사용도 확인했다.

[metro.config.js](../FE/metro.config.js)에 Expo 기본 제외 목록을 보존하면서 `.cache` 경로를 제외하도록 추가했다. 감시 서버 재시작 뒤 `/status`가 HTTP200(확인 시0.072초, 후속0.067초)으로 응답했고 앱 요청의 Android 번들이1605 modules/3.520초에 생성됐다. 루트 웹 HTML도 HTTP200이었다. 이 기록은 웹 브라우저의 실제 화면 회귀를 대신하지 않는다.

- `npx.cmd --no-install eslint metro.config.js --max-warnings=0` 통과.
- inline Node 검사에서 Windows/POSIX 캐시 경로 제외와 앱 소스·가상 Metro 진입점·이미지 경로 유지 확인.
- 앱 화면 코드·원본 자료·package.json·package-lock.json은 수정하지 않았다. 이번 저장소 변경은 Android 식별자, Metro 설정, 로컬 native 모듈 빌드 폴더 제외, 현재 작업 순서와 결과 문서다.

### 현재 실행 상태와 다음 조건

- 사용자가 Windows에서 직접 확인하는 방법을 요청해 자동 검사용 에뮬레이터를 종료하고 창이 보이는 모드로 다시 열었다. 창 제목은 `Android Emulator - Kostolany_API_36:5556`이며 `emulator-5556`으로 접근한다. 설치된 APK는 유지하고 앱 시작 `Status: ok`를 확인했다. Metro는 기존 localhost8081 감시 서버를 유지했다. 앱 재실행 시 mock 메모리는 초기화된다.
- 실행 준비에는 프로세스 `ANDROID_HOME=D:\Android\Sdk`, `ANDROID_AVD_HOME=D:\git_repository\kostolany_project\FE\.cache\avd`를 사용한다. 창을 표시하는 가상 기기 실행 명령은 `D:\Android\Sdk\emulator\emulator.exe -avd Kostolany_API_36 -port 5556 -no-audio -no-snapshot -no-boot-anim -gpu swiftshader -scale 0.75`다. `-no-window`는 창 없는 자동 검사에만 사용한다. 이미 실행 중이면 중복 실행하지 않는다.
- Metro는 별도 터미널의 FE에서 `npx.cmd --no-install expo start --localhost --port 8081 --max-workers 2`로 실행한다. `adb -s emulator-5556 reverse tcp:8081 tcp:8081` 후 앱을 연다. Windows 명령 검색 경로에 adb가 없으므로 현재는 `D:\Android\Sdk\platform-tools\adb.exe` 전체 경로를 사용한다.
- 후속 앱 복귀 검사에서 `Cannot connect to Expo CLI` 경고와 번들 주소 `10.0.2.2:8081`을 확인했다. 기존 Metro/ADB reverse를 유지하고 Android Dev Menu→Change Bundle Location을 `localhost:8081`로 변경했다. 다시 불러온 뒤 기사→Android 홈5초→런처 복귀에서 스크롤 위치가 유지되고 경고가 재발하지 않았다. [프로필 보정과 함께 확인한 결과](FE_COMMON_DESIGN_02_RESULT.md)를 참조한다.
- Android 개발 실행의 첫 확인은 완료했다. 현재 Windows에서 Android 화면·공통 UI 작업을 진행하고 iOS 실행 검증을 별도 미완료로 유지한다. iOS 빌드·실행과 대표 화면의 동일 fixture 원본 대조가 남아 있어1단계 전체 완료로 판정하지 않는다.
- 단일 문단 선택 손잡이·강조·응답·목록 저장의 사용자 확인은 위8항목에 반영했다. 한글 IME·Undo/Redo·다중 문단/이미지 경계 선택·사진·공유·접근성·실제 휴대폰 종합 검증과 전체 원본 동일성은 이후 단계에 유지한다. [2단계 공통 디자인 첫 보정](FE_COMMON_DESIGN_02_RESULT.md)은 별도 기록하며2~7단계 종료를 이번 기본 흐름 검사로 대신하지 않는다.

### 한글 입력 환경 보완 — 2026-11-26

사용자가 수동 검사1에서 한글을 입력할 수 없다고 보고했다. 시작 시 Gboard는 English (US)만 등록돼 있었고, Physical keyboard의 Show on-screen keyboard는 꺼져 있었다. Android Settings→On-screen keyboard→Gboard→Languages에서 한국어 두벌식을 추가하고 화면 자판을 활성화했다. Windows 입력기·프로젝트 ENV·OS 표시 언어는 변경하지 않았다.

추가 직후에는 실제 자판으로 입력한 `한글`이 제목·본문뿐 아니라 Android Settings 검색창에서도 `ㅎㅏㄴㄱㅡㄹ`로 분리됐다. 사용자도 설정 검색창에서 직접 클릭한 결과가 같다고 확인했다. Gboard 로그에서 한국어 사전 다운로드가12:14:02에 완료된 것을 확인하고, Kostolany/Metro/에뮬레이터를 유지한 채 Gboard 프로세스만 재시작했다. 이후 본문에서 물리 키 이벤트 `gksrmf`→`한글`, 화면 자판 클릭 `ㄱ+ㅏ`→`가`, 화면 자판 클릭 `ㅎ+ㅏ+ㄴ+ㄱ+ㅡ+ㄹ`→`한글`을 실제로 확인했다. 재시작 전후 결과이며 언어팩 내부 결함의 정확한 원인을 확정한 것은 아니다.

Gboard의 PC 키보드용 Show toolbar는 껐으며, 입력 위치 옆 언어 메뉴의 터치 키보드 표시로 한국어 자판을 펼쳤다. 이 에뮬레이터에서는 떠 있는 자판으로 표시되므로 실제 휴대폰의 키보드 배치 증거와 구분한다. 확인용으로 직접 입력한 제목·본문만 일치 여부를 검사한 뒤 비워 사용자 검사를 다시 시작할 수 있게 했다. 편집기 진단용 임시 변경은 제거했으며 최종 제품 코드 변경은 없다. 앱 테스트를 재실행하지 않았고 문서 diff만 검사한다.

환경 보완 직후 판정은 **한국어 키보드 준비와 짧은 조합 입력의 에이전트 확인 통과**였다. 이후 사용자 확인 결과는 아래에 구분한다.

### 한글·선택·사진·초안 재개 사용자 확인 — 2026-11-26

로컬 커밋 `2b84a7b` 이후 안내한8개 검사에 대해 사용자가 “전부 다 동작한다”고 보고했다. 각 항목은 **Android 에뮬레이터 사용자 수동 확인 통과**이며 이번에 에이전트가 같은 조작을 재실행한 결과는 아니다.

| 번호 | 안내한 동작과 정상 결과 | 판정 |
| --- | --- | --- |
| 1 | Windows 영문 A/Gboard 한국어에서 `gksrmf`→`한글`, 제목 `모바일 2차 검사`와 본문3문장 직접 입력; 조합·줄바꿈 및 누락/중복 없음 | 사용자 확인 통과 |
| 2 | 첫 문장 `오늘은 ` 뒤에 `모바일 ` 삽입, 해당 단어 선택·삭제·재입력; 앞뒤 문장과 커서 유지 | 사용자 확인 통과 |
| 3 | 첫 문장 `모바일`부터 두 번째 문장 `링크`까지 손잡이로 연속 선택하고 해제 | 사용자 확인 통과 |
| 4 | `링크` 선택→체인 버튼→`https://example.com`→Cancel 후 본문 유지, 반복→Done으로 링크 서식 적용 | 사용자 확인 통과 |
| 5 | Choose from library→Android 뒤로 취소; 편집기 복귀와 기존 문장 유지 | 사용자 확인 통과 |
| 6 | 마지막 문장 뒤 Enter→Search photos on Unsplash→`sunset` 예시 사진 삽입, 아래에 `사진 아래에도 입력됩니다.` 입력 | 사용자 확인 통과 |
| 7 | Saved→Close→Profile→Stories→Drafts에서 `모바일 2차 검사` 재개; 제목·본문·링크·사진 유지 및 `재개 후 입력도 됩니다.` 추가 | 사용자 확인 통과 |
| 8 | 새 글 `사진 먼저 검사`의 빈 본문에 사진부터 삽입, 사진 위/아래 문장 입력→저장·재개; 위 문장→사진→아래 문장 순서 유지 | 사용자 확인 통과 |

이번 확인은 실행 중인 mock 세션의 작성·취소·저장·재개와 문단 간 텍스트 선택 범위다. 사진 위아래 입력 성공을 이미지 경계를 가로지르는 연속 선택 성공으로 확대하지 않는다. 실제 Unsplash 검색/업로드, 링크 대상 외부 브라우저 열기, 앱 강제 종료 후 영속 복구, Undo/Redo, 빠른 조합 스트레스, 실제 휴대폰·iOS·전체 원본 동일성은 이번 검사에 포함하지 않았다.2단계 진행 중이며3단계의 일부 선행 검증으로 기록한다.

이후 프로필 Continue setup 정렬과 재개/닫기, Settings→Custom app icon의8개 카드 배치, 기사 스크롤→Android 홈→10초 후 복귀의3항목을 안내했다. 결과는 아래에 기록한다.

### 프로필·아이콘 화면·기사 복귀 사용자 확인 — 2026-11-26

직전 안내한3개 검사에 대해 사용자가 “전부 다 동작해”라고 보고했다. 기존 한글·편집8항목과 구분해 **Android 에뮬레이터 사용자 수동 확인 통과**로 기록한다.

| 번호 | 안내한 동작과 정상 결과 | 판정 |
| --- | --- | --- |
| 1 | Saved→Close→Profile에서 Continue setup의 왼쪽 여백 확인, 가입 설정 열기→닫기→프로필 복귀 | 사용자 확인 통과 |
| 2 | 프로필 톱니바퀴→Custom app icon,8개 카드의 두 열 배치와 이름 잘림/겹침 없음 확인→뒤로 | 사용자 확인 통과 |
| 3 | Home 기사 본문 중간→Android Home→10초 대기→최근 앱에서 복귀; 같은 기사·스크롤 위치 유지 및 개발 경고 배너 없음 | 사용자 확인 통과 |

아이콘 선택 화면 배치 확인은 실제 런처 아이콘 적용·영속성 검사가 아니다. 기사 복귀는 실행 중인 앱의 짧은 백그라운드 복귀이며 cold start·프로세스 종료 후 복원을 포함하지 않는다. 실제 휴대폰·iOS·원본 시각 동일성은 미검증으로 유지한다.

현재 안내한 사용자 검사 묶음은 통과했고 추가 반복을 요청하지 않는다. 다음 작업은2단계 원본 서체·배치·자산과 시작 화면의 대조 조건 및 남은 차이 정리다. 이 보고 반영 당시에는 문서만 변경했으며 앱 테스트·앱 조작·추가 커밋·push를 수행하지 않았다.

후속 사용자 요청에 따라 최근11개 통과 기록을 포함한3문서를 로컬 커밋 대상으로 확정했다. 제품 코드 변경은 없으며 문서 링크·diff를 검사한다. 다음 사용자 확인 절차는 [실행 계획](MEDIUM_PARITY/EXECUTION_PLAN.md)의 런처 아이콘 실제 적용/복원과 완전 종료 후 시작 화면이다. 현재는 절차 안내이며 통과로 기록하지 않는다.
