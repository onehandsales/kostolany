# Goal 12 — 설정과 기본 설명 수준

작성일: 2026-11-18 KST

상태: 구현·자동 검증·8081 흐름·모바일 폭 원본 비교 완료 / 실제 iOS·Android 실행·네이티브 빌드 검증 대기

## 범위와 시작 상태

- 로컬 `main`, Goal 11 커밋 `87db23f`에서 작업을 시작했고 작업 전 Git 변경은 없었다. 기존 8081 서버(PID `42833`)를 보존했다.
- `AGENT/README.md`, 제품 범위·공통 검증·UX 규칙, FRONT_AGENT README와 ARCHITECTURE·CODE_CONVENTIONS·STATE_AND_DATA·MOBILE_UI_AND_PLATFORM·PERFORMANCE_AND_SECURITY·TESTING 6개 규칙, FE_GOALS의 공통 조건과 Goal 12를 확인했다.
- Goal 5·10·11 결과와 설명 수준·인증·프로필·navigation 및 좋아요·북마크·목록 저장소를 직접 확인했다. 변경 영역의 props 명명·한글 주석·수명·비동기 처리를 검토했다.
- fixture/mock 프론트엔드다. 실제 Google OAuth·Supabase·백엔드·Storage·RSS·AI 연결, 계정/토큰 생성, 알림·결제·구독·다크 모드·아이콘 변경·계정 삭제는 없다. 의존성·lockfile·ENV·Medium 원본을 바꾸지 않았다.
- Goal 12 구현 요청에서는 커밋·push·배포하지 않았다. 구현 보고 후 별도 사용자 요청에 따라 아래 후속 커밋 기록을 추가했다.

## 구현 위치

| 위치 | 역할 |
| --- | --- |
| `FE/src/features/settings/types.ts` | 사용자 ID·기본 수준·조회/저장 계약과 snapshot |
| `settings/data/createMockReadingSettingsSource.ts`, `settingsPreview.ts` | 사용자별 메모리 공급부, 최초 성인, 정상/조회 실패/저장 실패/지연 |
| `settings/createReadingSettingsStore.ts` | 확정 설정, 조회 세대, 중복 제출 합치기, 마지막 제출 직렬 저장 |
| `settings/ReadingSettingsProvider.tsx` | 공급부·사용자별 저장소 수명, 개인 화면 scope, 기사에 전달할 공개 preference hook |
| `settings/SettingsScreen.tsx`, `DefaultLevelSheet.tsx`, `settingsStyles.ts` | 설정 조회·선택·저장·취소·재시도·스크롤·모달 |
| `FE/src/app/navigation/ProfileNavigator.tsx`, `ProfileRouteScreen.tsx` | 프로필/설정 내부 stack, 인증 세션별 개인 화면 정리 |
| `AppNavigator.tsx`, `ArticleRouteScreen.tsx` | 앱 수명의 설정 공급부, 동일 인증 ID, 기존 로그아웃과 기사 기본값 연결 |
| `FE/src/features/profile/ProfileScreen.tsx`, `profileStyles.ts` | 프로필 상단 설정 진입, 기존 조회/편집/로그아웃 보존 |
| `FE/src/features/article/useEntryExplanationPreference.ts` | 본문 조회 전부터 기사 진입의 기본값을 한 번 확정 |
| `ArticleDetailScreen.tsx`, `ExplanationSection.tsx`, `explanationTypes.ts` | 기본값 전달, 기사 임시 선택과 개인 세션 구분, 수준 검증 |

`settings`는 article의 공개 수준 타입만 참조하고 article은 settings 저장소를 import하지 않는다. app에서 preference를 전달한다. `useExplanation`의 기사 ID·수준 검증, 비활성 요청의 늦은 응답 무시와 재시도는 유지했다.

## 상태·수명 기본안

아래는 이번 mock 구현의 기본안이며 실제 서비스의 확정 정책이 아니다.

| 상태 | 소유자·키 | 수명 |
| --- | --- | --- |
| 인증 | 기존 AuthStore, `AuthUser.id`와 revision | Goal 10 유지, 최초 비로그인 |
| 모의 계정 구분 | `AuthUser.name` / mockUsers의 고정 A/B 표시 | 편집 가능한 프로필 이름과 별개 |
| 프로필 이름 | 기존 사용자 ID별 ProfileStore | 설정 값·소유권·인증 revision에 영향 없음 |
| 확정 기본 수준 | 앱의 ReadingSettingsProvider가 보관하는 사용자 ID별 ReadingSettingsStore | 동일 공급부의 앱 메모리, 화면 이탈·로그아웃·A→B→A에도 유지 |
| 설정 편집 선택 | DefaultLevelSheet의 로컬 상태 | 열 때 확정 값으로 시작, 닫기/취소/뒤로/탭 이탈/인증 변경으로 폐기 |
| 기사 진입 기본값 | ArticleDetailScreen의 진입 preference | 기사 ID·설정 scope별 최초 확정 값 |
| 기사 임시 선택 | ExplanationSession | 동일 기사 화면 인스턴스·개인 세션 동안 유지 |

- 최초 A/B 값은 모두 `adult`(성인). 이름을 식별 키로 쓰지 않는다. 프로필 이름 또는 설정 저장은 인증 revision, 좋아요·북마크·목록, 공개 navigation을 초기화하지 않는다.
- 비로그인은 설정 화면을 열거나 조회·변경하지 않는다. 기사 읽기와 임시 4단계 전환은 허용하고 성인으로 시작한다. 비로그인의 선택을 로그인한 사용자에게 이전하지 않는다.
- 로그아웃은 설정 삭제가 아니다. 같은 사용자 재로그인과 A→B→A에서 확정 값·진행 중 제출 결과는 그 사용자 저장소에 남는다. 개인 화면 scope는 `[공급부 버전, 사용자 ID, 인증 revision]`이므로 같은 A로 다시 로그인해도 이전 설정 화면·시트·초안은 정리된다.
- 앱 재실행/전체 새로고침으로 기본 공급부를 새로 만들면 비로그인과 성인으로 초기화한다. AsyncStorage·localStorage·디스크·서버 저장은 사용하지 않는다. 개발 중 Fast Refresh는 영속성 보장이 아니다.
- 공급부 자체를 교체하는 테스트 경계에서는 새 캐시와 개인 화면 scope를 만든다. 이전 공급부 요청이 새 저장소에 반영되지 않는다.

### 기사 진입과 복귀

| 상황 | 적용 방식 |
| --- | --- |
| 홈·검색·라이브러리에서 새 기사 진입 | 그 시점의 확정 기본 수준 사용 |
| 뒤로 나간 뒤 같은 기사 다시 열기 | 새 화면 인스턴스이므로 최신 확정 기본값 사용 |
| 다른 화면에서 기존 기사 인스턴스로 뒤로 복귀 | 그 인스턴스의 임시 선택 유지 |
| 기사 안에서 수준 전환 | 해당 기사에서만 변경, 설정 저장 요청 없음 |
| 기본 설정 저장 중 기사 진입 | 마지막 성공으로 확정된 값 사용, 진행 중 목표는 사용하지 않음 |
| 기사 본문 조회 중 설정 저장 완료 | 진입 때 확정한 값 유지, 이후 저장은 다음 진입부터 적용 |
| 설정 최초 조회 중 기사 진입 | 성인으로 먼저 읽고 조회 중 안내, 사용자 선택 전이면 최초 성공 값 한 번 적용 |
| 설정 조회 전 사용자가 직접 수준 선택 | 성인을 다시 누른 경우까지 명시적 의도로 인정, 늦은 조회는 현재 선택을 덮지 않음 |
| 최초 설정 조회 실패 | 성인 읽기·직접 선택 허용, 기본 설정 재시도 제공 |
| 기사 위에서 로그인·로그아웃·사용자 전환 | 공개 기사 경로/사실 본문은 유지하고 설명 세션만 현재 사용자 기본값으로 다시 시작 |

Goal 5의 모든 진입 성인 정책을 사용자 기본값으로 확장했다. Goal 10의 공개 기사 navigation 유지 정책은 유지하되 인증 세션이 달라지면 개인 수준이 새 계정에 남지 않도록 **설명 선택 하위 세션만** 초기화한다. 설정 저장·이름 수정은 이 초기화를 유발하지 않는다. 기존 기사로 뒤로 복귀하는 경우는 실제 React Navigation stack 테스트로 확인했으며 현재 제품에 별도의 기사→기사 메뉴를 추가한 것은 아니다.

선택 표시·제목·설명·예시는 같은 기사 ID와 수준을 사용한다. 수준 변경 시 기존 설명을 로딩으로 교체하고 해당 조합의 응답만 표시한다. 사실 요약은 유지한다.

### 저장·취소·경합

- 조회 중 중복 조회를 합치고, 저장 제출은 이전 조회 세대를 무효화한다. 늦은 조회 성공/실패가 저장 결과를 덮지 않는다.
- 확정 값과 같은 저장은 공급부 요청 없이 성공/닫기 처리한다. 단, 다른 저장이 진행 중이면 원래 값으로 되돌리는 제출도 실제 마지막 목표로 처리한다.
- 현재 마지막 목표와 동일한 중복 제출은 같은 Promise/명령을 공유한다. UI도 동일 제출 버튼을 비활성화한다.
- 저장 중 다른 수준 선택과 추가 제출을 허용한다. 첫 요청 뒤에는 대기 중인 **마지막 제출** 하나만 직렬 전송한다. 미제출 선택은 저장 목표가 아니다.
- 이전 요청의 실제 성공은 확정 이력에 반영할 수 있지만, 대기 중인 최신 제출이 끝나기 전 완료/오류로 표시하지 않는다. 최신 제출 실패 시 직전 성공 값을 유지한다. mock 실패는 적용 전에 발생한다.
- 편집 선택과 확정 설정은 별개다. 저장 실패 후 선택을 보존하고 수정 후 재시도할 수 있다. 저장 중 추가 선택이 있으면 이전 저장 성공이 시트를 닫지 않는다.
- 취소/닫기/모달 뒤로/다른 탭으로 이탈은 미제출 선택만 버린다. **제출된 저장은 계속**된다. 이 정책을 시트에 표시한다. 닫은 뒤 실패하면 설정 화면에서 실패를 알리고 다시 열어 선택하도록 안내한다.
- 저장소 결과와 별도로 시트의 제출 번호·초안 버전·mount 상태를 확인한다. 닫고 새로 연 시트는 과거 콜백으로 닫히거나 선택/오류가 바뀌지 않는다.
- 사용자 전환 뒤 늦은 A 응답은 A 저장소에서만 처리한다. B 설정·초안·오류·인증 상태는 바꾸지 않는다. A 복귀 시 저장 결과 또는 조회 재시도 상태를 확인할 수 있다.
- 기존 AuthStore의 로그아웃 확인/취소/처리 중/실패/재시도를 재사용한다. 성공 시 개인 설정 stack을 제거하고 비로그인 프로필로 복귀한다. 실패·취소는 기존 설정 화면과 인증을 유지한다.

## Medium 원본 비교

보관된 `medium/README.md`, Profile·Profile/Settings·Profile/Settings/Logging out의 ANALYSIS와 실제 PNG를 확인했다. 카탈로그는 **Medium iOS Latest, version ID 1419**다. 설정 하단의 제품 빌드 `4.263.185257`은 그 캡처에서만 관찰한 값이다. 모든 흐름의 동일 빌드라고 단정하지 않는다. 재확인일은 2026-11-18 KST이며 새 원격 조회나 실제 Medium 앱 조작은 하지 않았다.

| 원본 PNG | 관찰·적용·차이 |
| --- | --- |
| [프로필의 설정 진입](../medium/flows/Profile/Settings/screens/01_sc_d76d3680605f4b62ab31e3039d6c4fe6.png) | 우측 상단 설정 진입. 우리 앱은 48px 이상 `설정` 문자 버튼으로 표시, 프로필 직접 편집·직접 로그아웃도 보존 |
| [설정 상단](../medium/flows/Profile/Settings/screens/02_sc_ddd51660cb8346a1b200ed970a2d5c45.png) | 중앙 제목·왼쪽 뒤로·회색 섹션·흰 메뉴 행·얇은 구분선·하단 탭. 원본 Appearance에는 선택 상태가 보이나 기본 설명 수준 기능의 근거는 아님 |
| [설정 하단](../medium/flows/Profile/Settings/screens/03_sc_c653047933aa40b2be7a8f281643d41d.png) | Sign out 행과 앱 버전. 우리 앱은 필요한 계정/로그아웃 행만 배치 |
| [로그아웃 확인](<../medium/flows/Profile/Settings/Logging out/screens/02_sc_2d1afd7a02a347868564f9757753d077.png>) | 배경 dim·중앙 확인·취소/확인. 기존 Goal 10 확인 UI 재사용, 자체 모의 상태·실패/재시도 추가 |

- **자체 추가**: 읽기 설정 섹션, 현재 기본 수준, 4개 radio와 선택 원/배경/테두리, 저장·취소 시트, 조회/저장 오류·메모리 안내, 사용자별 캐시와 재시도 정책. Medium에서 관찰한 기능이나 동작으로 기록하지 않는다.
- **제외**: 원본의 멤버십·통계·계정 설정·추천·Appearance·알림·아이콘·SNS 연결·약관/도움말 등 전체 메뉴. 기본 수준은 실제 나이나 학년 정보가 아니다.
- **남은 시각 차이**: 자체 한글 기본 글꼴과 금융 콘텐츠, 문자 설정 버튼, 최소한의 섹션, 모의 안내 및 명시적 오류/취소 설명, 최소 48px 터치 영역, PC 최대 폭 680px. 원본 iOS 상태바·홈 인디케이터·native 시스템 확인창을 웹에서 재현했다고 주장하지 않는다.
- [실제 캡처 비교](evidence/goal12/COMPARISON.html), [브라우저 측정](evidence/goal12/browser-results.json)에 배치·타이포·여백·선택 상태와 큰 글자/작은 폭 증거를 남겼다. PNG 자체를 보정하지 않았다.

## 검증과 검토

최종 검사 결과는 아래와 같다. 브라우저 드라이버는 기존 임시 Playwright와 설치된 Chrome을 사용했고 프로젝트 패키지를 추가하지 않았다. Node는 설치된 24.10.0/npm 11.6.0을 사용하며 `.nvmrc` 24.18.0/packageManager npm10.9.0과의 차이를 유지·기록한다.

| 명령·증거 | 최종 결과 |
| --- | --- |
| FE에서 Node 24 PATH로 `npm run check` | 타입·lint 통과, 80 suites·602건 통과(301개 × iOS/Android), 238.495초; [로그](evidence/goal12/check.log) |
| `npm run export:ios` | 1044 modules, 2.3MB JS/Hermes 생성; [로그](evidence/goal12/export-ios.log) |
| `npm run export:android` | 1039 modules, 2.3MB JS/Hermes 생성; [로그](evidence/goal12/export-android.log) |
| `node TODO/evidence/goal12/verify-browser.mjs` | 8개 흐름 묶음, 25회 캡처 측정·24개 PNG(같은 홈 기사 재진입 캡처 파일 재사용), console/page 오류 0·외부 요청 0; [로그](evidence/goal12/browser-run.log) |
| `node TODO/evidence/goal12/check-platforms.mjs` | iOS·Android 도구 제약 기록; [원문](evidence/goal12/platforms.json) |
| Git·문서·8081 | `git diff --check` 통과, 결과/README/비교 페이지 내부 링크 대상 확인, 기존 PID 42833·HTTP 200·HEAD 87db23f 유지 |

Node 실행은 `env PATH=/opt/homebrew/opt/node@24/bin:$PATH`를 사용했다. 새 테스트 45개(양 플랫폼 90건)와 기존 256개(512건)가 함께 통과했다. 검사 중 발견한 타입 오류는 테스트 조회 옵션의 인자 위치를 바로잡아 수정했다. 최초 저장소/UI/preference 64건, navigation 관련 50건을 먼저 확인한 뒤 최종 코드 전체를 검사했다.

- 설정 저장소: 최초/중복 조회, 변경 없는 저장, 중복 제출, 중간 제출 합치기, 마지막 의도, 원래 값으로 복귀, 오래된 조회·저장 성공/실패, 잘못된 사용자/목표 응답, 실패 복구·재시도, 사용자별 공급부와 초기화.
- StrictMode 설정 화면: 기존 값, 취소/닫기/모달 뒤로/탭 이탈, 저장 실패 후 선택 보존, 수정 후 재시도, 저장 중 추가 선택, 닫기·재진입 경합, 늦은 조회, 공급부 교체.
- 실제 navigation: 설정/프로필 왕복, 홈·검색·라이브러리 기사 진입, 같은 기사 재진입, 기존 기사 인스턴스 뒤로 복귀, 수준/본문/예시 일치, 기사 수동 선택 미저장, 설정 조회 중 수동 선택, A 조회/저장 중 B 전환→늦은 성공/실패→A 복귀, 동일 A 재로그인, 설정 로그아웃 취소/실패/재시도, 이름 변경과 설정 보존, 비로그인 분리.
- 기존 전체 회귀: 홈·검색·기사·설명·좋아요·북마크·목록·인증·프로필의 기존 테스트를 함께 실행해 통과했다. 과거 Goal 결과에 적힌 통과 숫자와 이번 전체 결과를 구분한다.
- 검토에서 본문 조회가 늦으면 진입 뒤 저장된 설정을 잘못 초기값으로 읽을 수 있는 경계를 분리했다. `useEntryExplanationPreference`를 본문 조회보다 위에 두고 지연 본문 테스트로 검증한다. 설정/기사 feature 간 순환 의존 없이 app에서 연결했다.
- 원본 대조 후 설정 제목 중앙 정렬·24px 뒤로 SVG·섹션 위계/여백을 보완했다. 새 설명 주석은 한글 한 문장·한 줄이며 변경 영역의 props 명명과 들여쓰기를 정리했다.

### 플랫폼 구분과 미검증

[플랫폼 확인 원문](evidence/goal12/platforms.json)

| 구분 | 결과·한계 |
| --- | --- |
| Chrome 157 / localhost:8081 | 저장·취소·실패·재시도·기사 반영·계정 전환 확인, 실제 브라우저 캡처 |
| 320×740 / 390×844 / 1365×900 | 수평 overflow 없음, 측정 가능한 표시 컨트롤 최소 48px, 스크롤·긴 한글·선택 상태 확인 |
| 큰 글자·포커스 | CSS 2배 글자에서 스크롤/잘림 확인, Tab 가두기·Escape 닫기·진입 버튼 포커스 복귀 확인 |
| iOS Jest / Android Jest | JS 컴포넌트·store·navigation의 각 preset 검사이며 기기 실행 아님 |
| iOS JS/Hermes / Android JS/Hermes | export 결과를 별도 로그로 기록, 네이티브 빌드 아님 |
| iOS 실행·네이티브 빌드 | 미검증: Xcode.app 없음, CLT만 있음, xcodebuild -version 실패, simctl 없음 |
| Android 실행·네이티브 빌드 | 미검증: SDK·adb·emulator 없음, Java 23만으로 실행/빌드 불가 |
| 실제 모바일 UX | 기기 Safe Area·OS 글자 확대·VoiceOver/TalkBack·native 포커스/뒤로/스와이프·화면 캡처 원본 비교 미검증 |

기존 서버는 종료/재시작하지 않았다. 브라우저는 Chrome의 실제 웹 실행이고 Jest·JS 번들과 각각 구분한다. 위 native 검증은 환경을 갖춘 뒤 진행해야 하므로 공통 완료 조건 전체를 충족했다고 표시하지 않는다. 기존 의존성 audit 경고는 이번 범위에서 해결하거나 재검사하지 않았다.

## 8081에서 확인하는 방법

1. `http://localhost:8081` → **프로필 → 모의 로그인 시작 → 예시 독자 A → Google로 로그인 (모의)**.
2. **설정 → 기본 설명 수준 변경**. 성인 선택을 확인하고 중학생 선택 → 저장. 현재 기본값이 중학생인지 확인한다.
3. 변경을 다시 열어 고등학생을 고른 뒤 취소 또는 닫기. 다시 열면 중학생이다. 브라우저 Escape도 닫는다.
4. 홈 기사 → 중학생 선택·제목·본문·예시 확인 → 기사 안에서 고등학생 → 뒤로 → 같은 기사 재진입. 기본 중학생으로 시작한다. 탐색의 금리 검색과 라이브러리의 저장 기사에서도 같다.
5. 프로필 탭으로 돌아오면 설정 화면이 유지된다. 왼쪽 뒤로는 프로필로 돌아가며 기존 프로필 편집을 쓸 수 있다.
6. 설정의 로그아웃 → 취소. 다시 로그아웃에서 **모의 동작 선택 열기 → 실패 → 로그아웃 확인 → 다시 시도**로 실패 복구를 확인한다.
7. B 로그인 → 설정은 성인. B를 초등학생으로 저장하고 로그아웃→A 재로그인하면 A는 중학생이다. 전체 새로고침 후에는 비로그인과 최초 성인으로 초기화된다.

설정의 조회/저장 실패와 지연은 `FE/src/features/settings/data/settingsPreview.ts`의 `settingsPreviewScenario`를 아래 값으로 바꾸고 **전체 새로고침**해 재현한다. 전달 시에는 `normal`로 복원했다.

| 값 | 재현 |
| --- | --- |
| `normal` | 약 350ms 정상 처리 |
| `read-error` | 각 사용자 최초 조회 실패 → 설정 조회 다시 시도 성공; 기사에서는 기본 설정 다시 시도도 가능 |
| `save-error` | 각 사용자 최초 실제 변경 저장 실패 → 선택 보존 → 수정 후 다시 시도 성공 |
| `slow` | 조회/저장 각 4초 → 저장 중 다른 수준 추가 제출 → 닫기/재진입에서 새 초안 보존과 마지막 제출 결과 확인 |

재현 후 `normal`과 전체 새로고침으로 되돌린다. 실제 개인정보·외부 계정은 필요 없다.

## 후속 로컬 커밋

구현 보고 후 사용자가 Goal 12의 Git 커밋을 요청했다. 코드·테스트·결과 문서·캡처·검증 로그를 로컬 커밋으로 기록한다. 기존 타입·lint·602건 테스트·양 플랫폼 JS 번들·브라우저 검증 기록을 확인했고 기능 코드는 추가 변경하지 않았다. `git diff --check`와 기존 8081의 PID 42833·HTTP 200을 재확인했다. 원격 push·배포는 수행하지 않고 Goal 13은 요청문만 안내한다.
