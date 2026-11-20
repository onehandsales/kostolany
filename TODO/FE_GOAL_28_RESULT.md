# Goal 28 — 작성자 프로필·팔로우·팔로잉·이메일 구독

2026-11-19 KST/macOS. **구현 완료·시각/native 검증 잔여**.25~28의 두 자체 검토·수정·자동/브라우저 검증을 기록하고35까지 연속 진행한다. 커밋/push/배포 없음.

## 현재 구현과 계약

community feature의 공개 directory·작성자/Publication 고정 ID·관계 source/store/provider와 실제 root navigation을 연결했다. Stories/Lists/About·Pinned·웹사이트·Followers/Following, 기사 머리/꼬리/메뉴·Home/Search 작성자·Explore 추천·내 Profile·Following 피드가 같은 관계 상태를 쓴다. 공개 목록 preview 식별/소유자 계약은32에서 실제 저장/응답까지 확장한다. 신고29/탐색30/추천31/공유47은 담당 범위에서 이어서 연결한다.

팔로우는 target(kind,id), 사용자 ID, 작업 ID를 구분한 절대 상태 명령이다. 작가 이메일은 별도 boolean이며 publication에는 허용하지 않는다. 초기 이메일 off·Unfollow 시off·다시Follow 시off는 명시적 mock 정책이다. 실제 이메일 발송 없음. 사용자별 확정 데이터는 provider 메모리에 유지되고 전체reload/restart 초기화. A/B 격리·revision별 메뉴/오류 분리, 이름·표시 설정 변경으로 인증revision을 바꾸지 않는다.

전체 사용자 쓰기를 직렬화하고 대상별 마지막 선택을 낙관적으로 표시한다. 오래된 실패는 새 선택을 되돌리지 않는다. 읽기 generation/version으로 이전 조회가 새 쓰기를 덮지 않게 한다. 원래 작업 ID로 실패 재시도하고 중복 완료는 다시 적용하지 않는다. 재로그인은 확정 관계를 보존하되 과거 오류/재시도UI를 노출하지 않는다.

## 원본과 정책 확인

F17 Author detail/F19 Following author/F20 Unfollowing/F21 Following list ANALYSIS와 실제8장(sc_3de359a1,334d50,744292,3ecf6d,937a1f,1da36e,b606d8,7c89f4)을 직접 확인했다. 관련 Home/Explore/기사 원본은 이전 Goal의 검토와 현재 연결을 대조한다.

2026-11-19 [Follow writers and publications](https://help.medium.com/hc/en-us/articles/35754720183063-Follow-writers-and-publications), [Your profile page](https://help.medium.com/hc/en-us/articles/115004747067-Your-profile-page)를 다시 조회했다. 공식 설명은 팔로우와 선택적 작가 이메일 설정을 구분한다. 원본의 Email on 체크가 모든 신규계정 기본값임을 뜻하지 않는다. Member October2023/Friend December2023은 회원 유형 시작 월이며 계정 가입일로 기록하지 않는다.

Gummble에서 미수록 followers/About를 보완 검색했으나 기존 Jordan profile과 본인 Edit profile(sc_a829121c 직접확인), 구형 Reading list(sc_ddd503 직접확인)를 반환했다. 추가 공개 followers 명단은 확보하지 못했다. 구형 화면의 제품버전/캡처일은 미확인이라 보관versionID1419와 같다고 주장하지 않는다. Followers는 원본 미수록임을 표시하고10.2K명의 이름을 만들지 않는다. Following의 보이는7명은 소유자가 캡처에 없어 Jordan과의 연결을 자체 mock 탐색 정책으로 표시한다.

## 1차 자체 검토와 수정

- 실제 navigation에서 Lists/About 뒤 다른 화면→복귀할 때 public 탭을 보존하도록 화면 수명을 분리했다. 개인 메뉴·토스트는 auth범위/비활성 전환 때 닫는다.
- 웹 aria-selected/aria-checked가 없어 선택 상태가 접근성 트리에 누락되는 것을 실제 브라우저에서 발견했다. 탭·이메일 및 기존 기사 테마/글꼴 radio에도 명시했다.
- 관계 쓰기 실패가 사용자 저장소에 남아same-A 재로그인에서 다시 나타날 수 있었다. 실패를 제출 인증범위에 귀속시켜 확정 데이터와 UI오류 수명을 분리했다.
- 첫 navigation 테스트의 마지막 직접 source.read는 fake timer를 진행하지 않아Android 시간초과였다. 소스 대기 timer를 명시적으로 진행하도록 테스트를 고쳤으며iOS 다음 실행은 통과했다. 최종 검사는 아래 후속 기록에서 확정한다.

## 2차 자체 재검토와 추가 수정

- 실제 StackRouter 동작을 검토해 Article의 `getId=articleId`가 이전 route를 앞으로 이동시키는 결함을 재현했다. 기사→작가→같은 기사에서 새 진입 기본 수준 대신 기존 임시 수준을 재사용하고 원래 복귀 사슬을 잃었다. Article/Identity/PublicList의 ID 재사용을 제거하고 공개 프로필/목록은 명시적인 push로 새 route 수명을 만든다. 새 기사 진입은 계정 기본값, 뒤의 기존 기사는 임시 수준을 보존한다. 수정 전 실제 navigation 회귀검사는 양 플랫폼 실패했고 수정 후 통과했다.
- 공개 화면 footer는 실제 Main 진입 탭을 보존한다. 같은 작성자/같은 기사 반복 진입에서도 Home/Explore와 이전 검색어로 돌아간다. 프로필 Lists/About public 탭과 개인 메뉴 수명은 분리했다.
- StrictMode 정리 후 FollowControl의 mounted guard가 false로 남을 가능성을 고쳐 setup에서 다시 true로 설정했다. Directory source 교체/늦은 결과/동기 예외/잘못된 응답과 실패 재시도 검사를 추가했다. HTTPS 공개 링크는 잘못된 scheme·credentials를 거부하고 늦은 실패를 교체된 URL에 적용하지 않는다.
- 원본 비교에서 프로필 카드의 불필요한 byline 여백과 큰 하단 간격을 줄이고 Lists 이미지 간격, Jordan의 실제 원본 avatar crop을 보정했다. 사진·글꼴 보간 차이는 남는다.
- 두 차례 모두 같은 실행자의 자체 검토다. 독립 검토자/별도 에이전트 검토로 계산하지 않는다.

## 실행 결과

실행 환경은 Node24.18.0/npm10.9.0, macOS이며 프로젝트 package/lockfile 의존성 변경은 없다. 아래 명령은 FE 디렉터리에서 해당 Node/npm bin을 PATH 앞에 두고 실행했다.

| 검사 | 실제 결과 |
| --- | --- |
| 초기 `npm run check` | 124 suites/794 tests 통과,293.027초·typecheck/lint 통과. 이후 수정 전 이력이다. |
| 실제 back stack 재현 | 수정 전 양 플랫폼2건 실패,수정 후 Community/Directory/StrictMode 관련6 suites/10 tests 통과. navigation mock 없음. |
| 최종 전체 재검사1 | `goal28-verified-check.log`:126 suites 중4실패/122통과,798 tests 중4실패/794통과. 전체2703.034초로 비정상적으로 길었으며 기존 SettingsNavigation/SettingsScreen/SearchScreen/LikeNavigation 시간초과·대기 실패가 발생했다. 통과로 계산하지 않는다. 정확한 실행 지연 원인은 확정하지 않았다. |
| 실패 파일 분리 재검사 | 같은 코드로 `caffeinate -i npm test -- --runTestsByPath src/app/navigation/SettingsNavigation.test.tsx src/features/settings/SettingsScreen.test.tsx src/features/search/SearchScreen.test.tsx src/app/navigation/LikeNavigation.test.tsx`:8 suites/76 tests 통과,80.274초. timeout을 늘리거나 검사 생략하지 않았다. |
| 현재 전체 재검사2 | `caffeinate -i npm run check`:typecheck/lint 및126 suites/798 tests 통과,296.895초. `goal28-final-verified.log`가 현재 코드의 최종 전체 검사다. |
| `npx expo export --platform ios --platform android --output-dir /tmp/kostolany-goals25-35.4FQsD5/goal28-current-export` | 최종 navigation 수정 후 양 플랫폼 JS/Hermes 생성 성공,각 약2.6MB·metadata10KB. 실제 native build/run이 아니다. |
| 실제8081 Chrome | 정상·5종 장애·긴목록·계정/테마·back stack·동일조건 비교 모두 완료,각 console/page 오류0. 아래 범위를 확인했다. |

첫 전체 재검사 도중 navigation 결함 수정으로 코드가 달라져 중단한 `goal28-final-check.log`도 최종 결과로 쓰지 않는다. 장애 설정은 정상으로 복원했고300명 긴목록 임시 주입도 제거했다.

## 브라우저·원본 비교

Chrome157.0.8103.79,393×759/DPR1·Light·글자100%·mock A,원본1179×2556을393×852로 정규화한 뒤 상단59/하단34를 제외한 비교 조건이다. 실제 iOS DPR/Safe Area 증명이 아니다. 현재 결과는 `goal28-matched.json`과6쌍 `goal28-final-*-compare.png`로 직접 대조했다. 캡처/로그/스크립트는 저장소 밖 `/tmp/kostolany-goals25-35.4FQsD5/goal28-*`다.

- Stories/Lists/About/Following/email on menu/public Following을 같은 대상·선택값으로 비교했다. 이름 bounds x96,y36,w145.375,h30;Follow target x24,y134,w345,h48;Stories tab x16,y194,w61.25,h48;이메일 행 x71.5,y182,w250,h48이다.
- 원본 sans/vector 미확보로 자간·굵기·줄바꿈,About Georgia 대체,사진 resize/crop·메뉴 blur/그림자 차이가 남는다. 원본 메뉴 약44px 행은48px 터치 영역을 확보했다. 비교의 완전 일치/200장 전체 검증을 주장하지 않는다.
- 원본 고정기사18/59 Responses는 보관 시점 수치다. 현재 같은 mock 응답 저장소가 비어 있어0을 표시하며 정적 수치를 실제 댓글 수로 가장하지 않는다. 공개 Followers 실제 명단은 미수록이다.
- 원본 Following 캡처의 선택 footer는 Explore지만 직전 프로필 캡처는 Home이다. 연속성/소유자 미확인을 기록하고 실제 앱은 해당 진입 탭을 보존한다.
- Lists 전체 Save/세부 메뉴·공개 목록 내용은 Goal32가 완성한다. Share 실제 실행은47,작성자 신고/차단은29,publication 확장 탐색은30이다.

정상 흐름은 Stories→Lists→공개 목록 preview→Lists 복귀→About→Follow→email on→Following→다른 publication Follow→해당 프로필→복귀→Followers 미수록→고정기사→복귀→내 Following→Unfollow→다른 소속 유지→Home Following이다. 실제 query 실패 재시도·write 실패 롤백/재시도·email 실패 선택 복원·3초 지연 중 연속follow/email/unfollow 최신 의도·지연 중 A→B→A를 확인했다.

320px 긴 한국어300명 Following fixture를 임시 주입해 처음 DOM8명,맨 아래31명,scrollTop46384/scrollHeight47046/viewport662를 확인했다. 마지막 작성자 진입→복귀 후 scrollTop46384 유지,가로 폭320,오류0이다. 정적300개 전부 DOM 렌더로 대체하지 않는다. 320px About·System dark(본문 rgb210,210,210)·긴 사용자 이름·guest 로그인 취소/성공 후 개인 행동 수동 재실행·same-A 재로그인 메뉴 정리·전체 reload 후 관계 초기화도 확인했다. 브라우저 입력은 실제 한글 OS IME 검증이 아니다.

## 플랫폼 잔여와 최종 확인 순서

현재 macOS에 Command Line Tools만 있고 전체 Xcode/Simulator가 없으며 Android SDK/adb/emulator도 없다. 실제 iOS·Android build/run,OS 큰글자·VoiceOver/TalkBack·키보드/IME·기기 뒤로가기/URL 열기는 해당 환경에서 확인해야 한다. 웹48px/선택 aria 상태·Dark/System와Jest 플랫폼 변환·JS/Hermes를 이 검증으로 대신하지 않는다. 원본 font/vector·추가 followers 화면 확보와 native 환경이 필요하다.

8081에서 Home 기사→작가명→Stories/Lists/About→Follow→Following 메뉴 email on/off→25 following→다른 작가/publication Follow→Profile 본인 Following을 확인한다. Home Following에서 같은 기사를 열고 작가→같은 기사로 다시 들어가 기본 설명 수준을 확인한 뒤 뒤로 가기하면 기존 기사 임시 수준이 유지된다. 로그아웃→B→A와reload로 사용자 데이터 수명을 확인한다. 장애 재현은 결과에 기록한 source 주입/시나리오를 이용하고 기본 미리보기는 정상이다.
