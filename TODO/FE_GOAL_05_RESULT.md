# FE Goal 5 — 4단계 설명 전환 결과

작업일: 2026-11-18 KST

상태: **구현·테스트·코드 검토·자동 검증·PC 브라우저 흐름 확인 완료 / 실제 기기·네이티브 원본 비교 검증 대기**

## 구현 범위

기사 상세의 AI 해석 영역에서 **초등학생·중학생·고등학생·성인**을 선택하면 해당 수준의 설명과 예시가 함께 바뀐다. 홈의 10개 기사에 4단계씩 총 40개 조합을 제공한다. 제목·출처·이미지·공통 사실 요약은 수준 선택에 따라 바뀌지 않는다. 성인 설명은 Goal 4의 기존 해석 문단을 보존했고 나머지 수준과 수준별 예시는 직접 작성했다.

선택 상태는 즉시 표시하고 새 설명이 준비될 때까지 이전 수준의 설명·예시는 숨긴다. 로딩·오류에서도 선택을 바꿀 수 있고 사실 요약·뒤로 가기는 계속 사용할 수 있다. `설명 다시 시도`는 실패한 기사 ID·수준 조합을 다시 요청한다. 로딩 중에는 재시도 버튼을 표시하지 않으며 같은 수준을 반복해서 누르면 다시 조회하지 않는다.

초기 선택값 **성인**은 이번 화면의 기본안이다. 사용자의 나이·계정 정보를 사용하지 않는다. 상세를 나갔다 재진입하거나 다른 기사로 이동하면 초기값으로 돌아간다. 계정·서버·로컬 저장소에 선택을 저장하지 않았고, 기본 설명 수준을 바꾸는 설정 기능도 추가하지 않았다. 읽기 시간은 기존 예시 값이며 새 수준별 길이로 재계산하지 않는다.

예시·해석은 실제 기사·AI 호출 결과·코스톨라니 인용문이 아니다. 백엔드·실제 Supabase·인증·RSS·AI 연동, 실제 나이 입력은 없다.

## 변경 파일과 기존 작업 보존

작업 시작 시 기존 미커밋 변경·미추적 파일 **26개**를 확인하고 해시를 기록했다. 새 Goal 때문에 기존 파일을 원복하거나 덮어쓴 것이 아니라 아래 관련 부분만 이어서 수정했다. 브라우저 미리보기는 기존 localhost 8081 서버를 그대로 사용했다.

| 파일 | 변경 내용 |
| --- | --- |
| [explanationTypes.ts](../FE/src/features/article/explanationTypes.ts) | 4단계 명칭·기본값, 기사/수준 요청·설명/예시·상태 타입. 로컬 fixture 계약 |
| [explanationFixtures.ts](../FE/src/features/article/data/explanationFixtures.ts) | 10개 기사 × 4단계 설명과 예시. 성인 본문은 기존 해석 재사용 |
| [mockExplanationSource.ts](../FE/src/features/article/data/mockExplanationSource.ts) | 지연·실패·재시도·응답 순서 역전용 비동기 fixture 공급부 |
| [explanationPreview.ts](../FE/src/features/article/data/explanationPreview.ts) | 실행 화면의 mock 시나리오 선택. 최종값 `normal` |
| [useExplanation.ts](../FE/src/features/article/useExplanation.ts) | 기사·수준·공급부와 응답 일치 검사, 요청 수명·재시도 가드 |
| [ExplanationSection.tsx](../FE/src/features/article/ExplanationSection.tsx) | 네 선택, 선택 표시, 수준별 제목·설명·예시·상태 표시 |
| [ArticleDetailScreen.tsx](../FE/src/features/article/ArticleDetailScreen.tsx) | 기존 해석 구역을 수준별 설명 구역으로 연결. 제목·사실 요약·이미지·홈 복귀 유지 |
| [ExplanationSection.test.tsx](../FE/src/features/article/ExplanationSection.test.tsx) | 선택·본문 일치와 비동기 실패/경합 시나리오 |
| [mockExplanationSource.test.ts](../FE/src/features/article/data/mockExplanationSource.test.ts) | 모든 기사/수준의 내용 완전성·구분·실패 복구 |
| [ArticleDetailScreen.test.tsx](../FE/src/features/article/ArticleDetailScreen.test.tsx) | 기존 상세 검증이 비동기 성인 설명을 기다리도록 보완 |
| [FE README](../FE/README.md), [Goal 계획](FE_GOALS.md), [구현 상태](../AGENT/SOFTWARE_AGENT/COMMON/IMPLEMENTATION_STATUS.md), 이 문서 | 실행·초기값·시나리오·검증·미검증 기록 |

`package.json`·lockfile·`app.json`·하단 탭·홈 피드·기존 참고 자료와 Goal 4 결과 기록은 이번 Goal에서 변경하지 않았다. `medium/flows`는 읽기만 했다. 커밋·push·배포는 하지 않았다.

## Medium 관찰과 자체 확장 구분

- 읽기 위계는 [Story detail 분석](<../medium/flows/Home/Story detail/ANALYSIS.md>)을 따른다. 앱은 Medium iOS `medium-ios`, 기존 MCP 카탈로그 `Latest`, version ID `1419`, flow ID `d34a6d85-ab07-4cb3-87d2-28db79260b80`이다. 제품 빌드·실제 캡처 시각은 미확인이다.
- 이번 Goal에서는 [03 본문 PNG](<../medium/flows/Home/Story detail/screens/03_sc_f4b06612bdbf48ecbd8a7b6e2607d117.png>) **1장**을 2026-11-18 KST에 직접 다시 열어 문단·행간·강조와 읽기 영역을 확인했다. [원본 화면](https://gummble.com/screens/sc_f4b06612bdbf48ecbd8a7b6e2607d117). PNG 1179×2556 px, 기존 MCP 메타데이터 390×844이며 배율을 역산해 확정하지 않았다. 새 MCP 조회나 전체 이미지 재검토는 하지 않았다.
- [Changing display 분석](<../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>)은 글자 크기·테마·하이라이트 표시 설정을 다룬다. 그 기능을 설명 난이도 전환으로 해석하지 않는다. 이번에 그 흐름의 이미지를 새로 검토하지 않았다.
- **4단계 설명 선택은 우리 제품의 자체 확장**이다. 원본 Medium에 같은 기능이 있다고 주장하지 않는다. 기준은 [제품 범위](../AGENT/PROJECT_SCOPE.md)와 [모바일 UX 규칙](../AGENT/UXUI_AGENT/README.md)이다.

선택지는 작은 폭에서도 네 가지를 모두 볼 수 있도록 2열로 배치했다. 최소 터치 높이 48, 체크 표시·색상·굵기와 radio의 checked 상태를 함께 사용한다. 설명 영역에 선택한 수준을 다시 적어 로딩·오류 중에도 어떤 요청인지 알 수 있다. 본문 18/31과 문단 간격은 기존 읽기 화면을 유지하고 예시는 제목·왼쪽 구분선으로 구별했다. 글자 확대나 본문 줄 수를 제한하지 않았다.

## 비동기 상태와 재현 방법

[explanationPreview.ts](../FE/src/features/article/data/explanationPreview.ts)의 `explanationPreviewScenario`를 바꾸고 앱 또는 브라우저를 전체 Reload한다. 실패 이력은 공급부 인스턴스 메모리에만 있으므로 재현 초기화에도 Reload가 필요하다. 개발자용 상태 선택 UI·ENV·네트워크 호출은 추가하지 않았다.

| 시나리오 | 재현 동작 |
| --- | --- |
| `normal` | 250ms 뒤 선택한 기사·수준의 설명과 예시 표시 |
| `initial-error` | 기사·수준마다 첫 조회가 한 번 실패, 같은 조합 재시도로 성공 |
| `slow` | 요청마다 10초 대기. 대기 중 다른 수준 선택·홈 복귀 가능 |
| `out-of-order` | 초등학생 900ms, 중학생 600ms, 고등학생 100ms, 성인 250ms. 초등학생→중학생→고등학생 연속 선택 시 고등학생이 먼저 완료되고 그대로 유지 |

기사 ID와 수준을 요청 수명에 포함한다. A→B→A처럼 같은 수준을 다시 선택해도 최초 A 요청을 재사용하지 않는다. 정리된 요청의 성공·실패와 이전 재시도 응답은 무시한다. 응답의 기사 ID 또는 수준이 다르면 오류로 처리하며 다른 내용으로 대체하지 않는다. 네트워크 요청 취소·서버 캐시는 구현하지 않았고 로컬 Promise의 화면 반영 여부를 관리한다.

## 테스트와 코드 검토

| 테스트 | 플랫폼 설정당 건수 | 확인한 내용 |
| --- | --- | --- |
| ExplanationSection | 14 | 네 단계 각각의 선택/본문/예시와 사실 보존, 같은 수준 반복 선택, 현재 조합 재시도, 이전 성공/실패 무시, A→B→A, 재시도 중 전환, 기사 변경 초기화, 잘못된 기사/수준 응답·동기 예외, Strict Mode 정리 |
| mockExplanationSource | 3 | 전체 40조합의 비어 있지 않은 서로 다른 설명·예시, 조합별 실패 후 복구, 알 수 없는 기사 거부 |
| 기존 앱·피드·상세 테스트 | 34 | 홈·탭·기사 선택·상세 표시·홈 복귀·페이지·오류 처리 회귀 |

합계 **51개 × iOS/Android = 102건**, 18 suites 통과. 실제 앱 화면·navigator는 mock하지 않았고 데이터 공급부와 네이티브 Jest 환경만 대체했다. 제어 가능한 Promise로 응답 순서를 바꿔 검증했으며 단순 스냅샷 테스트를 추가하지 않았다.

검토·수정 내용:

1. 선택 표시가 먼저 바뀌는데 이전 설명이 남으면 본문과 수준이 불일치한다. 기사·수준별 콘텐츠 수명을 분리하고 현재 수준의 로딩/오류만 표시한다. 공통 사실 요약은 계속 읽을 수 있다.
2. 기사 ID만 확인하면 같은 기사 내에서 늦은 다른 수준 응답이 들어올 수 있다. 응답 ID·수준을 모두 검사하고 정리된 effect의 반영을 차단했다. A→B→A·이전 재시도 실패를 별도 테스트했다.
3. 브라우저 오류 상태를 직접 보면서 설명을 불러오지 못했는데도 기존 `끝까지 읽었습니다.`가 표시되는 문제를 발견했다. 정상 설명·예시가 준비된 경우에만 완료 안내를 표시하도록 이동하고 로딩/실패에서 미표시, 성공에서 표시됨을 검증했다.
4. 테스트의 그룹 role 질의는 접근성 요소로 묶이지 않은 네이티브 View를 찾지 못했다. 기존 피드와 같이 그룹 label로 범위를 정하고 각 radio의 역할·checked 상태를 검사했다. 테스트를 통과시키기 위해 그룹 전체를 단일 접근성 요소로 묶어 선택지를 가리지 않았다.
5. 사용하지 않는 성인 설명용 빈 문자열을 제거하고 기존 성인 본문을 재사용하는 타입으로 정리했다. fixture 40조합에 누락·동일 내용 복사가 없는지 검사했다.

## PC 브라우저 검증

기존 `http://localhost:8081` 서버에서 격리된 Chrome 프로필로 실제 DOM·클릭·스크롤을 확인했다. 390×844, 320×740, 1365×900 뷰포트를 사용했다. 사용자의 기존 브라우저 프로필·창을 조작하지 않았다.

- 정상: 네 선택별 제목·설명·예시가 바뀌고 checked는 항상 하나다. 사실 요약은 동일하며 상세를 나갔다 다시 열면 성인으로 돌아온다.
- 실패/재시도: 성인과 중학생 요청에서 실패를 재현하고 각 수준의 재시도로 복구했다. 이전 예시와 읽기 완료 안내가 오류 화면에 남지 않는다.
- 느린 요청: 선택한 수준의 로딩을 확인하고 대기 중 홈으로 돌아왔다.
- 응답 순서 역전: 초등학생→중학생→고등학생 연속 선택 후 느린 이전 응답들이 모두 완료돼도 고등학생 표시·본문이 유지됐다.
- 화면: 초등학생·좁은 폭·데스크톱·오류 상태 캡처를 직접 열어 선택·문단·예시 구획을 확인했다. 320px 폭에서 가로 넘침이 없었다. 각 브라우저 시나리오의 콘솔 오류·실행 예외는 0건이었다.

검사 후 preview 시나리오는 **normal로 복원**했다. 브라우저 캡처·임시 검사 스크립트는 Git 제외 경로 `FE/.cache`에만 있다. PC 결과는 iOS/Android 네이티브 실행이나 원본과의 시각 일치 증거가 아니다.

## 명령 결과와 미검증 범위

실행 위치: `D:\git_repository\kostolany_project\FE`, Windows PowerShell.

| 명령·검증 | 결과 |
| --- | --- |
| `npm.cmd run check` | 수정 후 exit 0: TypeScript strict → ESLint `--max-warnings=0` → 전체 Jest |
| iOS Jest | 9 suites, 51건 통과 |
| Android Jest | 9 suites, 51건 통과 |
| `npm.cmd run export:android` | 수정 후 exit 0, 977 modules, 약 2.1MB Hermes 번들 |
| `npm.cmd run export:ios` | 수정 후 exit 0, 982 modules, 약 2.1MB Hermes 번들 |
| Chrome 정상·실패·지연·순서 역전 | 모두 통과. 콘솔 오류 0건 |
| 정적 검토 | `git diff --check` 통과. Goal 5 변경 14개 파일·문서 상대 링크 60개 확인, 깨진 링크·문자 없음 |
| 실제 Android 실행·원본 비교 | 미검증. PATH와 기본 SDK 경로에서 adb·emulator를 발견하지 못함 |
| 실제 iOS 실행·원본 비교 | 미검증. Windows 환경에 macOS/Xcode·연결된 iOS 검증 환경 없음 |
| APK·AAB·IPA·설치·배포 | 미실행 |

실제 기기의 Safe Area·OS 글자 확대·스크린리더·터치·뒤로 가기 제스처와 긴 한국어 본문의 원본 비교는 남아 있다. 공통 완료 조건의 이 항목들은 충족하지 못했으므로 구현·자동 검사·PC 확인과 분리해 검증 대기로 기록한다.

두 플랫폼 export는 JavaScript/Hermes 번들 생성이며 네이티브 앱 빌드·실행을 대신하지 않는다. 생성물은 Git 제외 경로 `dist/android`, `dist/ios`에 있다. 기존 `NO_COLOR`/`FORCE_COLOR` 충돌 경고는 있었고 종료 코드는 모두 0이었다.

이번 Goal에서 패키지·lockfile·Expo 설정은 변경하지 않았고 의존성 설치·audit·Expo doctor를 다시 실행하지 않았다. Goal 4의 audit 경고는 당시 기록이며 해결했다고 주장하지 않는다. Goal 6는 시작하지 않았고 커밋·push·배포는 수행하지 않았다.
