# FE Goal 10 — 모의 로그인·취소·로그아웃

> Goal53 후속 링크 점검: 이 문서의 과거 경로 중 실제 파일이 없는 8곳은 링크 대신 당시 경로와 보관 상태를 표시했다. 과거 검사 결과·캡처를 재실행하거나 복구한 것이 아니다. 삭제된 `evidence/` 자료는 이 작업 트리에 없으며 역사적 결과의 보관 한계로 남긴다.


작업일: 2026-11-18 KST

상태: **구현·자동 검증·8081 흐름·모바일 폭 원본 비교 완료 / 실제 iOS·Android 실행·네이티브 검증 대기**

## 작업 기준과 범위

시작 시 Git 변경은 없었고 HEAD는 `110e764` (`feat(fe): add library list management for Goal 9`)였다. 실행 중이던 localhost:8081 서버 PID `42833`을 보존했다. 이번 Goal에서 커밋·push·배포하지 않았다.

다음을 확인하고 실제 코드와 대조했다.

- `AGENT/README.md`, `PROJECT_SCOPE.md`, `SOFTWARE_AGENT/README.md`, 공통 `QUALITY_AND_WORKFLOW.md`, UX 규칙.
- `FRONT_AGENT/README.md`와 `ARCHITECTURE`, `CODE_CONVENTIONS`, `STATE_AND_DATA`, `MOBILE_UI_AND_PLATFORM`, `PERFORMANCE_AND_SECURITY`, `TESTING_AND_DELIVERY` 6개 문서.
- `FE_GOALS.md`의 공통 조건과 Goal 10, Goal 7~9 결과, 좋아요·북마크·목록 저장소·공급부·navigation·테스트.
- `medium/README.md`, Logging in·Onboarding·Profile/Settings·Logging out의 `ANALYSIS.md`와 관련 원본 PNG 7개.
- 설치된 RNTL 14의 `docs/guides/llm-guidelines.md`와 실제 API.

Google 버튼의 **모의** 성공·취소·실패·재시도·처리 중 상태, 로그인 진입 화면 복귀, 로그아웃 확인·취소·실패·재시도, A/B 독자의 개인 데이터 분리를 구현했다. 프로필 탭에는 현재 사용자·인증 상태·로그아웃에 필요한 최소 화면만 연결했다. 실제 Google OAuth·Supabase Auth·백엔드·RSS·AI·계정 정보·비밀번호·인증 코드·토큰은 사용하지 않는다.

## 구현 위치

| 파일·영역 | 책임 |
| --- | --- |
| `FE/src/features/auth/types.ts` | 로그인/로그아웃 요청·취소 결과·사용자·진입 맥락·상태별 계약 |
| `auth/createAuthStore.ts` | 세션 소유, 중복 제출 방지, 요청 세대, 취소·오래된 성공/실패 무효화, 재시도 |
| `auth/AuthProvider.tsx` | 앱 실행 단위 저장소 수명과 공유 구독 |
| `auth/data/mockUsers.ts`, `createMockAuthSource.ts` | 두 가상 사용자와 정상 600ms·느린 4초·취소·실패 응답 |
| `auth/AuthDialogs.tsx`, `authStyles.ts` | 로그인 진입·Google 모의 버튼·사용자 선택·로그아웃 확인·모의 동작 선택 |
| `auth/AccountScreen.tsx`, `LoginRequestButton.tsx` | 최소 계정 표시·비로그인 라이브러리·개인 행동에서 로그인 요청 |
| `likes/LikeProvider.tsx`, `data/createMockLikeSource.ts` | 앱 수명의 기본 공급부, 사용자별 저장소/응답/실패 이력 격리 |
| `bookmarks/BookmarkProvider.tsx`, `useBookmarks.ts` | 비로그인 시 개인 저장소 미제공, 사용자·공급부·세션별 UI 정리 키, 복귀 목록 존재 확인 |
| `ArticleLikeControl`, `ArticleBookmarkControl`, `LibraryScreen` | 개인 조작의 로그인 진입, 로그인 후 선택 표시, 이전 개인 시트·초안 정리 |
| `app/navigation/AppNavigator.tsx`, `MainTabs.tsx`, `ArticleRouteScreen.tsx` | 같은 인증 ID 전달, 공개 화면 유지, 개인 navigation 초기화, 기사 복귀 맥락 검증 |
| `shared/ui/restoreModalFocus.web.ts` / `.ts` | 사라진 진입 버튼의 웹 포커스를 현재 제목으로 복구 / 네이티브 기본 동작 경계 |

## 구현 기본안과 상태 수명

아래는 fixture 단계의 기본안이며 실제 서비스의 확정 인증·보관 정책이 아니다.

### 인증과 취소

| 항목 | 동작 |
| --- | --- |
| 최초 상태 | 비로그인. 앱 재실행·전체 새로고침도 비로그인 |
| 비로그인 허용 | 홈·정렬·검색·기사 상세·4단계 설명 읽기 |
| 로그인 필요 | 좋아요·북마크 변경, 개인 라이브러리. 프로필에서도 로그인 진입 가능 |
| 사용자 A/B | `example-reader` / `example-reader-b`, 표시 이름 `예시 독자 A` / `예시 독자 B` |
| 로그인 상태 | `AuthSnapshot.user`가 기준. 비로그인에는 로그인 dialog만, 로그인에는 로그아웃 dialog만 허용하는 타입 |
| 처리 상태 | dialog의 `idle`·`pending`·`error`. pending에는 제출/사용자 선택을 잠그고 닫기·취소는 허용 |
| 성공 뒤 행동 | **좋아요·저장을 자동 실행하지 않는다.** 원래 화면에서 다시 누르도록 명시하여 중복 저장·의도와 반대인 토글을 방지 |
| 로그인 취소 | 공급자의 `cancelled`와 닫기/뒤로 가기를 오류와 구분. 사용자·개인 데이터·읽던 화면을 변경하지 않음 |
| 실패·재시도 | 로그인 실패는 비로그인 유지. 실패했던 사용자 ID로 재시도. 로그아웃 실패는 기존 로그인/개인 데이터를 유지 |
| 모의 결과 선택 | 펼친 보조 UI에서 성공·사용자 취소·실패·느린 성공 선택. 로그아웃은 성공·실패·느린 성공. 실패 후 재시도는 정상 모의 응답을 요청 |
| 로그아웃 | 프로필 → 확인 → 성공 시 비로그인. 취소하면 세션 유지. 처리 중 취소도 가능하며 뒤늦은 성공/실패는 버림 |
| 연속 조작 | 처리 중 중복 제출은 요청 하나만 만듦. 다른 독자로 시도하려면 현재 시도를 닫고 다시 진입 |

`AuthProvider`가 `useState`로 인증 저장소 한 개를 소유한다. `source`·`initialUser`는 마운트 시 초기화 옵션이며, 계정 변경에는 인증 명령을 사용한다. 테스트의 로그인된 회귀 조건만 `initialUser`를 주입한다. 실제 앱은 주입하지 않아 비로그인으로 시작한다. 공급부 교체가 필요하면 앱 소유자를 새로 마운트하는 계약이다.

닫기와 새 요청마다 증가하는 요청 세대로 늦은 응답을 거른다. A 로그인 취소→B 로그인, 같은 A 재시도, 로그아웃 뒤 오래된 로그인, 취소된 로그아웃 뒤 B 로그인에서 과거 성공·실패가 현재 인증을 바꾸지 않는다. 모의 공급부는 인증 결과만 반환하고 별도 전역 세션을 수정하지 않는다. 취소는 타이머 결과 무효화이며 실제 네트워크 중단·OAuth 취소를 구현한 것은 아니다.

### 개인 상태와 공개 화면

| 경계 | 소유자·키·수명 |
| --- | --- |
| 인증 | `AuthProvider`의 store. 인증 확정 변경마다 `revision` 증가 |
| 좋아요 | 앱 수명의 source와 `userId → LikeStore` Map. 각 저장소 안에서는 `articleId`로 상태/명령 구분 |
| 북마크/목록 | 기존 `userId → LibraryStore`. 기본 읽기 목록은 사용자+기사, 사용자 목록은 사용자+목록 ID, 소속은 기사 ID로 구분 |
| 로그아웃·A→B→A | 개인 데이터 삭제·병합·이전 없음. 같은 실행 안에서 A로 돌아오면 A의 확정/진행/실패 상태를 이어 받음 |
| 진행 중 개인 요청 | 로그아웃·사용자 전환 뒤에도 원래 사용자의 저장소에서 완료. B의 UI·선택·오류·목록을 변경하지 않음 |
| 새로고침·앱 재실행 | 인증과 기본 mock 공급부·저장소 메모리 모두 초기화. 기기 저장소·쿠키·토큰·서버 보관 없음. Fast Refresh 유지 보장 없음 |
| 개인 UI | 공급부 버전+사용자 ID+인증 revision으로 Library navigator·생성/수정 폼·저장 시트를 다시 구성. 같은 A의 즉시 로그아웃/재로그인도 초안·열린 상세를 재사용하지 않음 |
| 공개 UI | NavigationContainer 전체를 사용자 변경 키로 다시 만들지 않음. 홈 선택·검색어·기사·설명은 유지. 검색어는 공개 탐색 상태이고 개인 목록 입력 초안과 구분 |
| 비로그인 개인 요청 | nullable Provider는 개인 store를 만들거나 조회하지 않음. 기존 사용자 데이터는 메모리에 남지만 개인 UI에는 제공하지 않음 |

Goal 7의 LikeProvider는 기존 `useMemo`+단일 사용자 mock을 앱 수명의 기본 공급부+사용자별 store로 확장했다. 좋아요 mock도 사용자별 Map/실패 키를 사용한다. 표시 수치는 **각 사용자의 fixture 기본 수치 + 그 사용자의 선택 0/1**이며 A/B 사이의 실제 전체 반응 합계를 시뮬레이션하지 않는다. Goal 8~9의 메모리 보관 정책, 목록별 직렬 쓰기·최신 의도·실패 목표 재시도·삭제 기록은 유지한다.

Goal 9의 BookmarkProvider 전체 children key는 공개 navigation까지 초기화하므로, Goal 10에서 개인 UI 경계에만 범위 키를 적용했다. 개인 저장소와 화면의 수명을 나눠 데이터는 보존하면서 이전 계정의 이름·입력·시트·오류가 새 계정에 노출되지 않게 했다.

### 복귀 맥락

로그인은 navigation 위 Modal로 열려 현재 화면 인스턴스와 스크롤/검색 맥락을 보존한다. 진입 원인은 `like`/`bookmark`+기사 ID 또는 `library`/`profile`로 구분한다. 로그인으로 기사·목록 이동이나 개인 행동을 자동 실행하지 않는다.

목록에서 여는 기사 route는 기사 ID·진입 탭·목록 ID·소유자 ID·인증 revision을 보관한다. 뒤로 가기는 살아 있는 stack을 되돌릴 뿐 목록 ID로 새 상세를 생성하지 않는다. 같은 사용자·세션의 존재하는 목록만 원래 목록 복귀 label을 사용한다. 삭제·계정 전환 후에는 라이브러리 복귀로 바뀌며, 개인 stack은 초기화되거나 기존 목록 삭제 처리에 따라 처음으로 돌아간다. 다른 사용자에게 동일한 목록 ID가 있어도 그 상세로 연결하지 않는다.

웹 Modal의 Tab 포커스 가두기·Escape·취소 후 진입 버튼 복귀를 확인했다. 성공 후 진입 버튼이 제거되면 현재 보이는 화면 제목으로 포커스를 복구한다. 네이티브 포커스·VoiceOver/TalkBack 동작은 기기 검증 대기다.

## 검증과 리뷰

최종 자동 검사 결과는 check-node24.log (저장소 보관본 없음: `evidence/goal10/check-node24.log`)에 기록했다. 앱 코드와 테스트를 직접 검토했으며 독립적인 제3자 리뷰는 수행하지 않았다.

| 구분 | 실행·결과 |
| --- | --- |
| 타입·lint·전체 Jest | Node 24에서 `npm run check` 통과. 타입 오류·lint 경고 0, 216개 논리 테스트 × iOS/Android = **432건 / 60 suite 통과** |
| iOS JS/Hermes | Node 24에서 `npm run export:ios` 성공, 1026 modules·2.3MB. 로그 (저장소 보관본 없음: `evidence/goal10/export-ios.log`). 네이티브 빌드 아님 |
| Android JS/Hermes | Node 24에서 `npm run export:android` 성공, 1021 modules·2.3MB. 로그 (저장소 보관본 없음: `evidence/goal10/export-android.log`). 네이티브 빌드 아님 |
| 브라우저 | 기존 localhost:8081, Chrome 157 headless, 390×844·320×740·1365×900, CSS 글자/행간 2배. 실제 앱 캡처 20장 |
| 브라우저 결과 | 성공·취소·실패/재시도·지연 취소·A/B/A·개인 기능·목록/기사 복귀·새로고침 초기화 통과. 콘솔/페이지 오류 0, 외부 HTTP(S) 요청 0 |
| 증거 | browser-results.json (저장소 보관본 없음: `evidence/goal10/browser-results.json`), 브라우저 재현 코드 (저장소 보관본 없음: `evidence/goal10/verify-browser.mjs`), 원본 비교 (저장소 보관본 없음: `evidence/goal10/COMPARISON.html`) |
| iOS 실제 실행·빌드 | 미검증. Xcode 없음, CLT만 있음. `xcodebuild -version` exit 1, `xcrun simctl list devices available` exit 72 |
| Android 실제 실행·빌드 | 미검증. `adb`·`emulator`와 기본 SDK 경로 없음. Java 23만으로 Android 빌드/실행을 할 수 없음 |
| 환경 근거 | macOS 14.2 arm64. native-environment.json (저장소 보관본 없음: `evidence/goal10/native-environment.json`). 실제 기기·시뮬레이터 실행을 Jest 플랫폼 설정으로 대신 주장하지 않음 |

기본 셸의 Node 22.21.1·npm 11.6.2에서도 전체 검사는 통과했지만, `package.json`의 Node 24 범위를 맞추기 위해 `env PATH=/opt/homebrew/opt/node@24/bin:$PATH`로 Node **24.10.0·npm 11.6.0**을 지정하여 전체 check와 양 플랫폼 export를 다시 통과시켰다. `.nvmrc`의 24.18.0·packageManager의 npm 10.9.0과 패치/도구 버전 차이는 남기며 의존성을 변경하지 않았다. 기본 셸 검사 이력 (저장소 보관본 없음: `evidence/goal10/check.log`)과 최종 Node 24 결과를 구분한다.

브라우저 재현 스크립트는 이전 검증용 `/tmp/kostolany-goal8-browser/node_modules/playwright-core`와 로컬 Chrome을 사용한다. 앱 패키지에 도구를 추가하지 않았다. 다른 환경에서는 이 경로를 준비해야 한다. 스크린샷은 보정·합성하지 않은 브라우저 렌더 캡처이며 HTML은 원본과 캡처를 나란히 보여주는 문서다.

새 테스트는 인증 성공·공급자 취소·닫기·실패·재시도·중복 제출, 이전 성공/실패·동일 사용자 재시도·로그아웃 뒤 늦은 응답, 인증 결과의 사용자 ID 검증을 다룬다. 실제 navigation에서 검색→기사→로그인 취소/실패/성공→복귀와 자동 저장/좋아요 없음, 라이브러리 진입 로그인, 로그아웃 확인/취소/실패/재시도를 검증한다.

A의 좋아요·북마크·목록 생성이 진행 중일 때 로그아웃→B 로그인→A의 성공 또는 실패 도착→A 복귀/재시도를 검증한다. 열린 저장 시트의 생성 초안, 편집 중 같은 A의 즉시 재로그인, A/B가 같은 목록 ID를 가진 상태의 기사 복귀, 원래 목록 삭제 후 복귀 label/기존 back callback도 검증한다. 기존 홈·검색·상세·설명·좋아요·기본 읽기 목록·목록 관리 테스트를 유지했다.

검토 중 수정한 사항:

- LikeProvider의 단일 사용자 공급부와 사용자 전환 시 공급부 재생성 문제를 사용자별 앱 수명 캐시로 해결했다.
- BookmarkProvider의 전체 navigation 재마운트를 개인 UI 범위 키로 바꾸고, 인증 revision을 포함해 A→로그아웃→A를 한 번에 처리해도 초안을 버리게 했다.
- 웹 로그인 성공 후 사라진 버튼 때문에 body로 빠지는 포커스를 실제 브라우저에서 발견하고 현재 제목으로 복구했다. 취소 시 원래 버튼 복귀도 다시 확인했다.
- 새 테스트의 retry 대기, togglebutton checked 단언, RN press 이벤트 인수에 대한 잘못된 기대를 수정했다. 긴 A/B/A 사용자 이벤트 연쇄는 130ms press 지연을 포함하므로 해당 통합 테스트만 15초 제한을 사용한다.

## Medium 원본과 비교

출처는 보관된 **Medium iOS** 자료다. App ID `4674239e-d24a-4ef4-aed5-9682429edd48`, 카탈로그 `Latest`/version ID `1419`. 이는 제품 빌드 번호가 아니다. Settings 캡처에는 `4.263.185257`이 보이며 다른 화면의 같은 빌드 여부는 미확인이다. 원본 촬영일·기기 모델·OS·DPR은 미확인, 이번 로컬 원본/구현 비교일은 2026-11-18 KST다. 원본 PNG 1179×2556과 메타데이터 390×844를 구분했다. 새 Medium 계정 인증이나 외부 서비스 조작은 하지 않았다.

| 흐름·원본 | 관찰과 구현 비교 |
| --- | --- |
| [Logging in 분석](<../medium/flows/Logging in/ANALYSIS.md>), flow `0a9abc62-90f3-4640-8cfc-bac71b630ca6` | `sc_d55739aa2ac1495da026006235e7c0a7` 가입 선택, `sc_e4d414380a1047a2b7970cf7869a0866` 로그인 선택 PNG 확인. 중앙 브랜드·소개·둥근 공급자 버튼 위계를 참고. 로그인 화면의 Google/Facebook/Apple/X/Email 중 Google 모의 버튼만 구현 |
| [Onboarding 분석](<../medium/flows/Onboarding/ANALYSIS.md>), flow `09e904e2-9f9c-40a7-b866-03f8784eb9e4` | 브랜드 시작 `sc_39bd15e8585d404daa48b34a448b0e32`과 공통 가입 선택 원본 확인. 스플래시·가입·관심사·팔로우·알림·구독 단계는 제외 |
| [Settings 분석](<../medium/flows/Profile/Settings/ANALYSIS.md>), flow `a84364a5-7861-46a3-bf0d-449f8e3b1db2` | 프로필 `sc_d76d3680605f4b62ab31e3039d6c4fe6`, 설정 상단 `sc_ddd51660cb8346a1b200ed970a2d5c45`, 하단 `sc_c653047933aa40b2be7a8f281643d41d` PNG 확인. 설정 아이콘→Sign out 경로를 관찰했으나 이번 범위는 최소 프로필에서 직접 로그아웃 |
| [Logging out 분석](<../medium/flows/Profile/Settings/Logging out/ANALYSIS.md>), flow `c6e7ec90-b093-4bdf-aade-84671b79b617` | 확인 `sc_2d1afd7a02a347868564f9757753d077` PNG의 어두운 배경·중앙 대화상자·Cancel/Confirm 참고. 하단 설정·가입 진입 이미지는 위 공통 원본과 동일 |

관찰·추가·제외를 구분한다.

- **원본 관찰:** Google 버튼의 존재, 공급자 선택의 중앙 위계와 외곽선 버튼, 설정 Sign out, 취소/확인 팝업, 이후 가입/로그인 진입 캡처. 기록된 로그인 완료는 이메일/코드 경로이며 Google 성공·계정 선택·취소·실패 화면은 없다. 로그인 공급자 선택 원본에는 별도 닫기 버튼이 보이지 않는다.
- **우리 앱 추가:** A/B 선택, 모의 인증 표시, 닫기, 실패/처리/재시도, 모의 결과 선택, 공개 기사 열람, 로그인 후 원래 화면 복귀와 자동 행동 미실행, 메모리 데이터 정책. 자체 브랜드·한글 문구·36/50 소개 타이포, 24px 좌우 여백, 최소 48px 터치 영역을 사용한다.
- **남은 시각 차이:** 원본은 큰 세리프 영문 소개와 공급자 여러 개, 앱은 짧은 한국어 소개·단일 공급자·모의 선택 UI다. 원본의 Google 다색 심볼 대신 모의 버튼에 문자 G를 사용한다. 로그아웃 원본의 iOS 기본 alert 대신 플랫폼 공통 Modal을 사용해 테두리·반경·높이·버튼 모양이 다르다. 큰 글자에서는 취소/확인 버튼을 여러 줄/세로로 배치하고 스크롤한다.
- **제외:** 실제 OAuth·이메일·코드·다른 공급자·계정 생성·전체 기기 세션 종료, 프로필 편집(Goal 11), 설정 확장(Goal 12), 온보딩 나머지 기능. 원본의 캐시 삭제/영속성은 정적 캡처로 증명하지 않는다.

## 8081에서 확인하는 방법

1. [localhost:8081](http://localhost:8081)에서 홈 기사는 비로그인으로 읽는다. 좋아요/북마크 또는 라이브러리·프로필의 로그인 버튼을 누른다.
2. `예시 독자 A` 또는 `B` → `Google로 로그인 (모의)`. 기사에서 진입했다면 같은 기사로 돌아온다. 좋아요·저장은 이때 자동으로 실행되지 않으므로 직접 누른다.
3. `모의 동작 선택 열기` → `사용자 취소` 또는 `실패`를 선택하고 Google 버튼을 누른다. 실패 뒤 `로그인 다시 시도`는 선택했던 독자로 성공한다. `느린 성공 (4초)` 중 닫은 뒤 다른 독자로 로그인하면 과거 응답은 무시된다.
4. A로 좋아요·저장·사용자 목록을 만든 뒤 **프로필 → 로그아웃**. 확인창에서 취소, 실패→재시도, 느린 성공 중 취소를 재현한다.
5. B로 로그인하면 A의 선택·목록이 없다. 다시 로그아웃→A 로그인하면 같은 실행 중 A의 데이터를 확인할 수 있다. 개인 목록 상세/입력 초안은 재사용하지 않는다.
6. 전체 새로고침하면 비로그인·초기 개인 데이터로 돌아온다. 기존 홈·검색·상세·설명 수준·목록 관리 흐름도 계속 사용할 수 있다.

## 미검증과 마무리

실제 iOS·Android 실행, APK/AAB/IPA 빌드·설치, 기기 Safe Area·OS 큰 글자·스크린리더·제스처/하드웨어 뒤로 가기·네이티브 포커스는 **미검증**이다. 인증 폼에는 문자 입력이 없고, 기존 목록 입력의 실제 키보드 가림·한국어 IME 검증 대기도 남는다. 브라우저의 CSS 2배 글자·Escape·DOM 포커스와 Jest Modal 이벤트는 이를 대신하지 않는다. 관련 도구가 없어 실행 가능한 코드·자동 검사·브라우저 검증을 완료한 뒤 기기 검증을 남긴다.

패키지·lockfile·ENV·Medium 원본·개발 규칙을 변경하지 않았다. 이전 Goal의 검증 대기를 완료로 바꾸지 않았다. Goal 10 결과만 전달하며 Goal 11은 시작하지 않는다. 커밋·push·배포는 수행하지 않았다.

## 구현 보고 후 커밋 요청

이후 별도 사용자 요청에 따라 Goal 10 코드·테스트·문서·화면 증거를 로컬 커밋으로 기록한다. 기존 Node 24 검사 432건 통과와 양 플랫폼 JS 번들·브라우저 검증 기록을 확인했다. 기능 코드 변경이 없어 전체 검사를 반복하지 않는다. 검증 당시 `runtime.json`의 `committed: false`는 당시 상태의 기록이다. 원격 push·배포는 하지 않으며, Goal 11은 요청문만 안내하고 구현을 시작하지 않는다.
