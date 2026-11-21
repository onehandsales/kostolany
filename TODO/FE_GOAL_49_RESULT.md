# Goal 49 — 남은 설정·앱 아이콘·외부 안내

2026-11-21 KST, macOS. **기능·OS 어댑터 구현 / 현재 자동 검사 통과 / 원본 차이·실제 native 빌드와 실행 검증 대기.** 시작 HEAD는 Goal48 `c1f89612539e670fd1f1435b661d672caa25a8a2`이며 Git 작업 트리는 깨끗했다. Goal44→53 연속 요청에 따라 이번 범위의 검토·검증·문서 갱신 후 로컬 커밋하고50으로 이어간다.

## 설정 행과 실제 목적지

| 설정 행 | 연결·상태·근거 |
| --- | --- |
| Become a Friend / Membership and payment | Goal48의 같은 계정별 MembershipSource·선택/성공/취소 화면을 유지한다. 실제 결제는 없다. |
| Story stats | 기존 안내를 Goal43의 실제 통계 route로 교체했다. 뒤로는 진입한 Settings로 돌아온다. |
| Account | 프로필 기준 이름·Auth userId·기존 EmailAuth의 예시 주소를 읽는다. Email notifications·Blocked users·Facebook으로 연결하는 최소 보완 화면이다. 주소 변경/실제 인증 메일/계정 삭제를 추가하지 않는다. |
| Blocked users | Account 안에서 Goal29의 같은 moderation store/기존 차단 관리 Modal을 연다. 원본 Settings PNG에 별도 행이 없어 기존 추가 행을 Account 안으로 옮겼다. 현재 공식 설명은 Account 구역에서의 차단 관리를 설명하지만 이 하위 화면 배치를 과거 관찰값으로 보증하지 않는다. |
| Edit profile / Refine recommendations / Appearance | 기존 ProfileProvider·관계/추천·DisplaySettingsSource를 그대로 사용한다. |
| Push / Email notifications | Goal44의 같은 설정 route·source로 연결한다. Account의 Email 진입도 같은 경로다. |
| Custom app icon | 확인된8개 선택 이름·선택 테두리·Friend gate·선택 취소·기기 조회/적용·실패/재시도를 제공한다. Free/Member도 잠금 화면을 먼저 보고 Friend 선택 후 같은 화면으로 돌아온다. |
| Facebook | 확인/취소→모의 연결 또는 해제→공유 표시. 실제 Facebook OAuth나 게시를 하지 않는다. 연결 사실은 계정별 AccountConnectionSource 한 곳에서 관리한다. |
| Help / Terms / Privacy / Rate | 고정된 공식 Medium 도움말·정책·App Store 주소를 외부 참고 페이지로 연다. Kostolany의 실제 약관/개인정보 고지/스토어 평가라고 표시하지 않는다. 페이지 열기 실패/팝업 차단 후 같은 버튼으로 재시도한다. |
| More app controls | 원본 하위 미수록을 명시한 최소 보완: 기기 앱 설정(Linking.openSettings), 기존 Push 설정, 앱 아이콘으로 연결한다. 웹의 기기 설정은 미지원 오류와 복구 경로를 보인다. |
| Sign out / Reading tools | 기존 인증 확인/취소/실패/복귀와 기본 설명 수준 계약을 유지한다. |

Settings의 미연결 ReferenceNotice를 제거했다. Account·Social·Controls·외부 안내·아이콘은 실제 Profile native-stack의 SettingsDetail route로 연결된다. 원본에 없는 하위 화면을 원본 재현 완료로 계산하지 않는다.

## 소유권·취소·OS 수명

- Auth ID/revision은 인증 경계다. 프로필 이름·사진, 멤버십, 이메일 알림, moderation을 설정 화면에 중복 저장하지 않는다. EmailAuth의 `reader.a@example.test`/`reader.b@example.test`만 표시하며 실제 개인정보를 요구하지 않는다.
- AccountConnectionSource는 `userId/facebook`의 확정 메모리 상태를 소유한다. 변경은 목표 boolean·AbortSignal·현재 인증 predicate·사용자별 요청 identity를 검사한다. 중복 제출은 화면에서 막고 늦은 요청은 source에서도 거부한다. 실패는 확인 선택을 유지한다. 취소/이탈 전 미확정 변경만 폐기하고 이미 확정된 연결은 유지한다.
- 연결 source는 같은 실행에서 A/B를 분리 보존한다. 새로고침/재실행은 mock 연결을 초기화한다. 이 값은 AuthSource의 로그인 제공자나 실제 OAuth 연결 사실을 변경하지 않는다. 부모 Settings·Account·Social 표시가 같은 source를 읽는다.
- SettingsServicesProvider는 계정별 연결 source, 고정 외부 목적지 adapter, **기기 설치 단위 AppIconStore**를 조립한다. source/adapter 세대·인증 revision이 개인 화면의 확인/오류/초안 수명을 구분한다. A→B→A·같은 A 재로그인은 이전 화면의 미확정 상태를 복원하지 않는다.
- 아이콘의 화면 `choice`, 기기의 `applied`, `supported`, 조회 상태와 적용 중 상태는 분리한다. Friend 자격은 Goal48의 live membership snapshot으로 확인한다. 자격이 없어지면 화면 선택은 제거하지만 설치에 이미 적용된 아이콘을 임의로 되돌리지 않는다. 계정 전환은 기기 전체 아이콘 초기화가 아니다.
- 적용은 사용자의 명시적 Apply에서만 시작하고 진행 중 중복/다른 선택을 막는다. Apply 이전 취소는 초안만 버린다. OS에 제출된 작업은 취소 API가 없으므로 화면 이탈 뒤 실제 OS가 확정한 결과는 기기 사실로 유지한다. 이전 화면의 성공/오류 안내는 재노출하지 않는다.
- 기기 조회보다 새 적용이 시작되면 오래된 조회 응답을 버린다. 적용 실패/불일치 응답 뒤 기기 상태를 재조회하며 실패를 성공으로 표시하지 않는다. 선택 초안은 유지한다. foreground 복귀 때 OS 상태를 재확인하되 적용 중 중복 조회는 건너뛴다.
- 외부 목적지는 enum→고정 HTTPS 주소만 허용한다. 사용자 ID/이메일/token을 URL로 전달하지 않는다. 외부 열기 성공은 요청 전달 결과이며 실제 로그인/정책 동의/평가 제출의 성공이 아니다. source 교체·이탈 뒤 늦은 실패는 현재 화면에 노출하지 않는다.

## OS 아이콘 구현과 한계

새 외부 의존성 없이 설치된 Expo Modules API와 config plugin 도구를 사용했다. `FE/modules/kostolany-app-icon`은 로컬 Swift/Kotlin 모듈이며 `FE/plugins/withAppIcons.js`가 빌드 구성을 생성한다.

| 환경 | 실제 구현·검증 |
| --- | --- |
| iOS | `supportsAlternateIcons/alternateIconName/setAlternateIconName`을 메인 큐에서 연결한다. 중복·비활성 앱·잘못된 ID를 거부하고 callback 뒤 실제 이름을 읽는다. 기본 아이콘과7개 alternate asset catalog/build setting을 생성했다. Swift syntax parse만 통과했으며 UIKit/Expo를 포함한 타입 검사·컴파일은 수행하지 못했다. |
| Android | MainActivity의 런처 intent만8개 activity-alias로 옮기고 기존 VIEW/deep link는 보존한다. 기본 alias만 활성화한다. API33 이상은 원자적 설정 변경, 이전 버전은 새 alias 활성화 후 기존 alias를 끄고 실패 시 이전 설정 복구를 시도한다. PackageManager가 확인한 활성 alias를 읽으며 launcher 화면 갱신 완료로 단정하지 않는다. Kotlin 컴파일·기기 실행은 미검증이다. |
| web / 모듈 없는 native binary | `supported:false/applied:null`이다. 선택 미리보기와 잠금 해제는 검증할 수 있지만 Apply를 OS 성공으로 표시하지 않는다. Expo Go나 JS export만으로 로컬 모듈이 설치되지 않는다. |
| 기기 저장 | 실제 OS 아이콘은 기기 설치의 사실이므로 mock 데이터 새로고침 정책과 다르다. 앱 재설치/업데이트·런처 cache·복원 정책은 실제 기기에서 확인해야 한다. |

Kostolany K 도형을 직접 그린8개 서로 다른1024×1024 RGB/alpha 없는 PNG를 사용한다. Medium 로고를 원본 PNG에서 추출하지 않았다. 선택 이름/순서는 원본과 대응하지만 자산 자체가 다르다. 아이콘명은 안정된 ID이며 프로필 사진이나 사용자 이름이 아니다.

저장소 밖 `native-audit/` 사본에 검증용 bundle/package ID `com.kostolany.preview`를 지정해 `expo prebuild --no-install --platform all`을 실행했다. 원본 FE에 `ios/`·`android/`를 생성하거나 ENV·8081을 변경하지 않았다. autolinking resolve는 양 플랫폼의 로컬 모듈을 찾았다. 생성 결과7개 alternate/8개 alias/활성 alias1개와 반복 생성의 중복 없음을 확인했다. `expo-system-ui` 미설치에 대한 기존 appearance 구성 경고가 있으며 OS 시스템 테마/시스템 바는 검증 대기다. config 생성은 native 빌드가 아니다.

## 1차 자체 검토 → 수정

독립 에이전트 검토가 아닌 자체 검토다.

| 재현·기대 | 원인·수정·검증 |
| --- | --- |
| Settings→Story stats가 실제 통계로 가야 한다 | ReferenceNotice만 열었다. 기존 StatsRoute에 연결하고 실제 navigation 복귀를 검사했다. |
| Account/차단/Email 연결이 기존 소유권을 유지해야 한다 | 미수록 Account는 안내뿐이었다. 기존 프로필/Email fixture/알림/moderation을 읽는 최소 화면을 연결했다. Blocked 진입 회귀 테스트도 실제 새 경로를 따른다. |
| 설정 단독 테스트가 관련 없는 AuthProvider에 의존하지 않아야 한다 | Facebook 표시 hook이 직접 Auth를 요구했다. nullable 서비스 Context의 userId·source로 읽도록 고쳐 기존 설정 테스트를 유지했다. |
| 확인/초안 정리와 React 규칙이 일치해야 한다 | effect 안 동기 setState lint를 발견했다. 렌더 경계 변경에서 UI 상태를 조정하고 layout effect는 작업 수명 정리에 사용했다. lint를 비활성화하지 않았다. |

타입·lint 및 영향 검사12 suites/54 tests,29.663초 통과(`review-1-tests.log`). 그 뒤의 추가 수정은 다음 검토와 구분한다.

## 2차 재검토 → 수정·확인

- source/adapter/화면 소유권·실제 navigation·native 설정·현재 브라우저·원본3쌍을 다시 검토했다. 첫 기록을 복사한 검토가 아니다.
- iOS의 알 수 없는 alternate 이름을 기본 아이콘으로 잘못 간주하지 않도록 미확인 null 처리했다. 기기 적용 실패 뒤 실제 상태 재조회와 OS 확정/화면 취소 분리를 테스트했다.
- 초기 이미지 생성 도구의 Retina2048/alpha 결과를 발견해 고정1024 RGB 자산으로 다시 생성했다. 생성 보조 도구의 JIT/link 및 bitmap context 실패는 외부 도구 문제로 기록하고 repo 임시 파일을 추가하지 않았다.
- Android manifest의 반복 적용·기존 deep link·단일 활성 런처를 회귀 검사했다. 테스트 fixture를 설치된 Expo AndroidManifest 타입에 맞춰 보완했으며 require/lint 예외로 우회하지 않았다.
- 실제 A→B→A/같은 A 재로그인 중 미확정 Facebook 응답 격리 회귀를 추가했다. 화면 이탈 뒤 늦은 외부 실패와 source 교체·미지원 아이콘도 검사한다.
- 아이콘 카드의 Founder's Choice 줄바꿈과 업그레이드 버튼의 시각 폭/높이를 원본에 맞춰 보정했다. 논리 터치 영역48을 유지한다. 설정 Facebook 설명의 글자 크기도 대조해 조정했다.
- 웹 설정 route 복귀 시 원래 진입 버튼에 포커스를 돌려준다. native의 navigation/OS 포커스는 실행 검증 대기로 구분한다.
- 실제 브라우저6개 정상/연결 묶음과4개 실패/경합/확대 묶음을 실행했다. 실패 주입은 브라우저 메모리에서만 수행했고 reload로 복원했다.

## 현재 자동 검사·브라우저 결과

Node24.18.0을 `.nvmrc`·package 기준으로 사용한다. 기존 Goal48 통과 수치는 재사용하지 않는다.

| 검사 | 현재 결과 |
| --- | --- |
| 전체 타입/lint/Jest 체크포인트 | `npm run typecheck && npm run lint && npm test`:244 suites/1,368 tests 통과,387.451초(`final-current.log`). 실행 중 최종 포커스/시각 수정이 이어져 아래 최종 영향 검사를 별도 수행했다. 모든 변경 후 전체 검사를 다시 실행했다고 표현하지 않는다. |
| 최종 수정 영향 검사 | 타입·lint 통과. `npm test -- --testPathPattern='SettingsExtrasNavigation\|createAppIconStore\|appIconConfiguration\|accountConnectionSource\|SettingsScreen\|MembershipNavigation\|ModerationNavigation\|StoryStatsNavigation'`:16 suites/68 tests 통과,35.658초(`final-impact.log`). 최종 포커스·시각 수정과 설정/통계/멤버십/차단 회귀를 포함한다. |
| 추가 회귀 | createAppIconStore, appIconConfiguration, accountConnectionSource, SettingsExtrasNavigation. 기존 ModerationNavigation은 Account 진입을 반영한다. navigation 자체를 mock하지 않는다. |
| 8081 Chrome | 정상6묶음 + 실패4묶음, 각 console/page 오류0. 공식 외부 주소의 새 창 요청·복귀, 계정별 연결, 웹 아이콘 미지원, 실제 CSS160%와 키보드 포커스를 확인했다. 최종 UI 조정 후 재실행했으며 통계/아이콘에서 돌아온 원래 설정 버튼의 activeElement도 확인했다. |
| web/iOS/Android export | 최종 영향 검사 뒤 설치된 Expo57 CLI `export --platform all --max-workers 2 --output-dir <증거 루트>/final-export` 통과. JS/Hermes 결과이며 native 빌드가 아니다. |
| native 구성 | 별도 사본 prebuild·양 플랫폼 autolinking·Swift parse·manifest/asset 검증. 실제 빌드/설치/실행은 대기다. |

중간 타입/lint 실패와 설정 단독 테스트 실패는 수정 전 로그로 보존했다. 자동화 초기의 모달 Close label·숨겨진 중복 텍스트 selector·HMR 도중 캡처 문제, 외부 사본 복사 시 작업 디렉터리 실수도 수정 후 다시 확인했다. 최종 통과나 앱 결함으로 혼용하지 않는다.

## 원본 대조·공식 자료·미확인

F54/55/58/60의 대응표와 관련 분석을 대조했다. 이번 직접 시각 대조의 고유 원본은 Settings 상단/하단·Custom app icon 잠금3장이다. F54의 구독 연결은 Goal48의 같은 화면/자격을 재사용하며 그때의5장 비교를 이번 새 캡처로 주장하지 않는다.

| 원본 ID | 구현 캡처·남은 차이 |
| --- | --- |
| `sc_ddd51660cb8346a1b200ed970a2d5c45` | `settings-top.png`. 행 순서/구역/제어를 맞췄다. Mock tier 표시·시스템 글꼴·48px 헤더·프로필 fixture 차이. |
| `sc_c653047933aa40b2be7a8f281643d41d` | `settings-bottom.png`. Custom app icon을 상단에 맞춘 같은 스크롤 맥락. Facebook 표식/폰트·mock 연결 상태·자체 Reading tools·현재 앱 버전 위치 차이. |
| `sc_64b75d913b284d708ab44e4f3663a59f` | `icons-locked.png`.8개 확인 이름·2열·선택/잠금·Friend 진입. 자체 K 자산·48px 터치/헤더·미수록 하단 카드 제외·플랫폼 미지원 안내와 Apply 보완 차이. |

비교는1179×2556 원본을393px로 축소하고 OS 상단59/하단34를 제외한393×759와8081 Chrome393×759를 나란히 보았다. 원본 iOS 렌더러와 동일 환경이 아니다. 글꼴·자산·하단 일부 미확인·native 결과가 남아100% 일치를 주장하지 않는다.

- [현재 공식 연결/해제 설명](https://help.medium.com/hc/en-us/articles/115004746907-Connect-social-media-accounts), [차단 관리 설명](https://help.medium.com/hc/en-us/articles/217048077-How-to-block-and-manage-blocked-users)을2026-11-21 확인했다. 현재 기능 설명과 과거 캡처를 구분한다. 실제 소셜 계정 연결을 수행하지 않는다.
- [공식 Terms](https://policy.medium.com/medium-terms-of-service-9db0094a1e0f), [Privacy](https://policy.medium.com/medium-privacy-policy-f03bf92035c9), [App Store](https://apps.apple.com/app/id828256236)의 목적지를 확인했다. 법률 해석이나 Kostolany 정책으로 채택한 것이 아니다.
- Gummble 추가 검색은 기존 관련 화면5개를 반환했으며 새로운 Account/Facebook/More controls/아이콘 해제 결과는 확보하지 못했다. 미수록 화면을 원본 동작이라고 확정하지 않았다.
- OS 구현은 [Expo local modules/autolinking](https://docs.expo.dev/modules/autolinking/), [Apple alternate icons](https://developer.apple.com/documentation/xcode/configuring-your-app-to-use-alternate-app-icons), [Android PackageManager](https://developer.android.com/reference/android/content/pm/PackageManager)를 확인하고 설치된 Expo 모듈·config plugin API와 대조했다.

## 플랫폼·증거·남은 항목

현재 `platform.json` 재확인: macOS14.2 arm64/CommandLineTools, `xcodebuild` exit1·`simctl` exit72, Android SDK/adb/emulator 없음. iOS/Android native 빌드·설치·아이콘 변경/기본 복원·앱 업데이트/재실행·외부 앱 복귀·Dynamic Type/VoiceOver/TalkBack·Safe Area는 미검증이다. Swift syntax parse를 의미/타입 검사나 native 실행으로 계산하지 않는다.

필요 환경은 Expo57/RN0.86 개발 빌드와 Xcode+iOS 기기/Simulator, Android SDK+기기/에뮬레이터다. 로컬 모듈은 개발 binary에 포함해야 하며 현재8081 웹 성공이 OS 홈 화면 변경 성공을 뜻하지 않는다. 아이콘 OS 연결은 코드에 구현했고 실행 검증을 못 한 상태다. 실제 OAuth·스토어 구매·Email/Push 발송·계정 삭제/주소 변경은 범위 밖 미연동이다.

전체 검사 뒤 파일별 diff·원본 보존·ENV와8081 PID58453·native 생성물이 저장소 밖에 있는지 확인했다. native 적용은 미검증이므로 이 상태를 전체 출시/동일 재현 완료로 표시하지 않는다.

증거 루트: `/var/folders/jg/zn9h2_f91nxfpwz9hzpkqcv80000gn/T/kostolany-goal49-0lz78usm`.

`baseline.json`, `platform.json`, `native-report.json`, autolinking/prebuild/export·검사 로그, 두 자체 검토 기록, `browser.cjs`/`faults.cjs`·결과 JSON·캡처, `pairs.json`·비교3장을 보관했다. 로컬 Playwright/Chrome와 기존8081로 재현한다. native 사본은 실제 설치 산출물이 아니다. OS 임시 경로라 정리되면 사라지며 저장소 안에 임시 증거/로그/검증 스크립트를 추가하지 않는다. `FE/plugins`와 `FE/modules`는 제품 빌드에 필요한 영구 코드다.

## 8081 확인 순서

1. 새로고침→Notifications→예시 독자 B 모의 로그인→프로필→설정.
2. Story stats→월간/누적 확인→뒤로 Settings. Account→예시 이메일→Email notifications→복귀, Blocked users→기존 목록→닫기.
3. Facebook→모의 연결→취소→다시 확정→뒤로. 부모의 Connected(mock)를 확인한다. 해제도 확인/취소 경로를 제공한다.
4. Custom app icon→잠금8개 선택→Friend 업그레이드→mock 성공/Welcome→같은 아이콘 화면. 선택/취소와 웹 적용 미지원을 확인한다.
5. Help/Terms/Privacy/Rate→외부 참고 주소 열기→창 닫기→같은 설정 복귀. More app controls→웹의 기기 설정 미지원→기존 Push/아이콘 진입.
6. B→A→B로 연결/멤버십이 분리 보존되는지 확인하고 전체 새로고침의 mock 초기화를 확인한다. 실패/지연은 외부 faults.cjs와 회귀 테스트로 재현한다.

권장 로컬 커밋 메시지: `feat(fe): connect remaining settings and native app icon adapters for goal 49`.

## Goal52 후속 수정 — 2026-11-21

System 테마의 고정 Light 구성과 Android expo-system-ui 누락을 수정했다. SDK57 호환57.0.4 및 automatic 설정을 격리 native 프로젝트 생성물에서 확인했다. 아이콘의 실제 OS 적용·빌드·실행은 여전히 대기다. 현재 코드의 두 차례 검토·실행 결과와 환경 한계는 [Goal52 결과](FE_GOAL_52_RESULT.md)를 따른다. 과거 실행 결과는 당시 코드의 증거로 유지한다.
