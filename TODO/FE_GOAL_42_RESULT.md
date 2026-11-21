# Goal42 — 프로필 사진·대명사·소개·Stories 필터

> 후속 변경: 내 Stories 카드의 저장/메뉴·반응 수 공유는 [Goal53 후속 결과](FE_GOAL_53_FOLLOWUP_RESULT.md)를 따른다. 아래 구현·검사·캡처는 Goal42 당시 이력으로 보존한다.


2026-11-20 KST · macOS 14.2 arm64 · 시작 HEAD `036ef6e` · 시작 작업 트리 clean.

**상태: 구현 완료·네이티브 검증 대기·원본 차이 잔여.** 프로필 사진/대명사/이름/short bio의 초안·저장·취소와 공유 표시, About 안내, Stories/관계 진입을 연결했다. 두 차례 자체 검토와 수정 후 현재 코드의 타입/lint·전체204 suites/1156 tests·8081·3플랫폼 export를 통과했다. 실제 iOS/Android 기기 검증과 아래 원본 차이는 남는다. 이를 Goal42 전체 완료·출시 완료로 표시하지 않는다.

**승인 경계:** 이번 Goal42만 수행한다. 커밋·push·배포를 하지 않으며 Goal43을 시작하지 않는다. 과거 Goal41→42 연속 실행/자동 커밋 승인은 이번 요청에 적용하지 않는다. 사용자가 결과 확인 후 직접 커밋한다.

## 시작 확인과 적용 규칙

- `git status --short`, HEAD와 실제 FE 소스를 확인했다. 초기 변경·삭제가 없었고 ENV·medium 원본을 수정하지 않았다. AGENT README/PROJECT_SCOPE, 공통 QUALITY_AND_WORKFLOW/ENGINEERING_RULES/IMPLEMENTATION_STATUS, UX README/MEDIUM_REFERENCE, FRONT_AGENT README와 ARCHITECTURE/CODE_CONVENTIONS/STATE_AND_DATA/MOBILE_UI_AND_PLATFORM/PERFORMANCE_AND_SECURITY/TESTING_AND_DELIVERY를 적용했다.
- 전체 계획의 공통 완료 조건·Goal42, 대응표 C51~C53/F08·F55·F56·F57·F61·F63, FE_GOALS/FE README, 선행28·37·39·40·41의 결과와 실제 저장소/navigation을 대조했다. F63 Story stats는 진입 경계만 확인하고 구현하지 않았다.
- 사용자 ID와 인증 revision을 보존하고 app→features→shared 방향, 기능별 저장소, 한국어 설명 주석/시나리오, typed ID/props, 최소48 논리 터치 영역을 유지했다. 별도 상태 프레임워크·백엔드·OAuth·Storage·RSS·AI를 추가하지 않았다.
- 시작 시 `localhost:8081`은 리스너가 없었다. 현재 Mac에서 Node24로 `npm run web`을 시작했으며 PID43927의8081을 유지한다. 과거 Windows PID5248이나 그 실행 성공을 현재 환경의 증거로 사용하지 않았다.
- 이전194 suites/1114 tests는 Goal41 당시 이력이다. 이번 결과는 아래 현재 실행 로그로 판정한다.

## 구현과 사용자 흐름

| 화면/흐름 | 구현·계약 | 현재 확인 및 한계 |
| --- | --- | --- |
| 비로그인 개인 프로필 | 기존 로그인 닫기/사용자 취소/실패/재시도/성공 후 원래 프로필 복귀 유지 | 실제8081과 기존 실제 navigation 회귀. 자동 개인 행동 제출 없음 |
| 내 프로필→Edit profile | 이름/소개/사진/대명사를 편집 초안으로 복사, Close/Cancel은 미제출 초안 폐기 | 실제8081에서 취소·재진입, Save·재진입, 조회 실패/재시도 확인 |
| 이름50/소개160 | NFC 코드 포인트 계산, 이름 trim/연속 공백 한 칸, 소개 trim/CRLF 정규화, 빈 이름/초과는 제출 거절 | 50/51·160/161·공백·줄바꿈·긴 한국어를8081에서 확인. 조합 중 원문을 강제 절단하지 않음. 실제 OS IME는 미검증 |
| Update photo | Camera/Choose from library/Cancel. 선택 후 부모 미리보기, 부모 Save로 확정 | 웹 실제 파일 선택→취소/정상 저장, 손상 PNG 처리 실패→재선택. 카메라 권한/미지원/늦은 응답은 어댑터 및 화면 테스트. 실제 OS 성공은 대기 |
| 대명사 | 검색·후보·선택 chip·삭제·최대4. child Done은 부모 초안에만 반영 | 0/1/4,5번째 차단, 중복 무시, 삭제, 검색 없음, 긴 검색어, 하위 취소/Done→부모 취소/Save, 실패 재시도 확인 |
| 하위 뒤로/닫기 | 대명사 뒤로는 하위 미확정 선택만 버림. 사진 Cancel은 진행 요청을 무효화. 부모 입력은 유지 | Modal requestClose 회귀·브라우저 버튼/포커스 복귀 확인. Android 실제 Back/VoiceOver/TalkBack는 대기 |
| About | 편집 폼의 데스크톱 안내를 inline 정보로 표현. 프로필 About 탭은 short bio와 원본 예시 회원 시작 월 표시 | 안내를 모바일 긴 소개 편집기나 외부 링크 실행으로 바꾸지 않음. 편집 Close/프로필 탭 복귀 확인 |
| 내 Stories | 기존 mock 발행 저장소의 소유자 ID·Public/Unlisted 검사, 로딩/빈 상태/오류/재시도 유지 | 실제 작성→mock Publish→두 필터→상세→원래 필터 복귀를8081에서 수행. 다른 계정/다른 공개 범위 응답 거부·지연 조회는 테스트 |
| 팔로워/팔로잉 | 기존 관계 저장소를 재사용하고 두 진입 버튼을 분리 | 내 Followers/Following→작성자→followers/following 왕복, Follow·이메일 구독, 프로필 저장 후 관계 유지8081 확인. local mock 계정의 incoming followers는0 |
| 동일 ID의 표시 | 프로필/탭 아바타·내 목록 카드/상세·공개 목록 소유자·작성자 링크/공개 프로필·응답·내 발행 글이 현재 프로필을 구독 | 이름/사진을 식별자로 쓰지 않음. 공개 이름/사진 투영만 공유하며 타 계정의 개인 저장소/초안은 공유하지 않음 |
| A→B→A | 확정 프로필은 앱 실행 중 계정별 보존. revision마다 개인 화면·초안·시트·오류 재생성 |8081 실제 로그아웃 취소/실패/재시도/B로그인/A복귀. navigation 테스트에서 사진/저장 중 전환·같은A 재로그인 확인 |
| 다른 개인 데이터 | 프로필 변경은 인증 revision, 설명 기본값, 박수/북마크/목록, 작성 초안/발행, 관계, 온보딩 저장소를 reset하지 않음 |8081 기본 수준·북마크·발행·관계 유지, 기존 실제 navigation/각 저장소 전체 회귀. 온보딩 Continue setup 유지 |
| 새로고침/재실행 | 메모리 인증·프로필·개인 데이터 초기화 |8081 전체 reload 후 A 기본 이름/빈 대명사/초기 소개 확인. 실제 native 앱 종료·재실행 검증은 대기 |

초안의 50/160 표시와 검증은 기존 정책을 유지한다. 조합형 이모지를 하나의 grapheme으로 세는 정책은 새로 도입하지 않았다. 검색은 입력의 NFC/trim/소문자 정규화 후 **접두 일치**이며 자유 입력 대명사는 저장하지 않는다. 긴 후보 자체는 공식 후보에 없어 새 후보를 만들지 않았고, 긴 검색어/최대4 chip 및 확대 레이아웃으로 경계를 점검했다.

## 상태 소유권과 수명

| 소유자 | 기준 상태·수명 | 경쟁/정리 계약 |
| --- | --- | --- |
| AuthStore | 사용자 ID·인증 revision·로그인/로그아웃 요청 | 프로필 저장으로 revision을 바꾸지 않음. 기존 로그인 취소/늦은 응답 차단 유지 |
| ProfileProvider scope | source별 사용자 ID→ProfileStore, 사진 참조 등록부 | source 교체는 별도 scope. 실제 개인 route는 scope key로 재생성. StrictMode 즉시 재구독은 유지하고 실제 scope 이탈에서 저장소를 dispose |
| ProfileStore | 확정 name/bio/photo/pronouns, 조회 세대, 사용자별 직렬 저장 명령 | 중복 같은 Save 병합, 진행 중 쓰기+최신 대기 명령. 오래된 조회 무효화. 응답 소유자/필드 검증. queued 교체 자원 해제 |
| ProfileEditorSheet | 부모 초안·draftVersion·submission ID, 처음 진입한 사진 참조 | child Done은 초안만 변경. 실패 시 입력/사진/선택 보존. 저장 중 추가 편집은 이전 성공이 화면을 닫지 않음 |
| PronounsEditor | 하위 선택·검색어 | Done만 부모로 전달. 하위 뒤로/닫기는 하위 초안 폐기, 부모 Cancel은 부모 전체 미제출 초안 폐기 |
| 사진 선택 hook | AbortController/현재 요청, 최신 임시 lease | A선택→B선택의 늦은A 성공/실패 무시·정리. 하위 닫기/부모 닫기/계정/source/picker 교체 후 이전 응답이 화면을 다시 열지 않음 |
| 사진 참조 등록부 | 초안·제출 명령·확정 프로필의 참조 수 | 마지막 참조가 끝날 때 blob URL revoke/앱 캐시 삭제. 부모를 닫아도 제출된 명령/확정 사진은 살아 있음 |
| DraftSource/useStoryList | 작성 문서·발행 스냅샷, user/revision/visibility/source/attempt 기반 조회 | 상세 진입 중 구독만 중지하고 revision을0으로 만들지 않음. 복귀 시 최신 revision 재조회. 타 소유자/다른 공개 범위·중복ID 응답은 오류 |

**제출과 취소를 구분한다.** 부모 Close/Cancel은 아직 제출하지 않은 변경을 버린다. 이미 제출한 A 저장은 화면을 닫거나 B로 바뀌어도 A 저장소에서 계속된다. 실패는 B나 새 편집 화면에 노출하지 않으며, 다시 A로 돌아와 확정/실패 상태를 확인한다. 이미 처리된 저장을 화면을 닫았다는 이유로 취소했다고 표시하지 않는다. source 자체가 교체되면 이전 scope의 성공이 새 scope를 수정하지 않는다.

확정 사진은 같은 실행의 A→B→A에서 유지한다. 공급부 해제/교체 시 참조를 정리하고 앱 재실행에서 프로필 URI를 복구하지 않는다. 프로세스 강제 종료 때 JS 정리가 실행된다고 보장하지 않으며 OS 캐시의 파일 잔존과 앱 메모리 프로필 복구는 별개다. 원본 사진 라이브러리 URI는 삭제하지 않는다. 사진 표시 실패 시 기본 아바타로 돌아가며 편집에서 재선택할 수 있다.

## 발견 문제·수정·두 차례 검토

검토자는 동일 작업자다. **독립 검토나 별도 에이전트 검토는 수행하지 않았다.** 검토 자체를 테스트 통과 횟수로 세지 않는다.

### 1차 자체 검토

구현 후 저장소/초안/사진 작업/세션 경계, 프로필 표시 사용처, 실제 navigation, 원본 폼과 브라우저 캡처를 검토했다.

| 재현 조건·기대/실제 | 원인 | 수정 | 검증 근거 |
| --- | --- | --- | --- |
| 기존 Update photo/Add pronouns 클릭 시 실제 편집이 필요하지만 안내만 열림 | placeholder 연결 | 사진 어댑터·하위 대명사 편집·부모 Save/Cancel 구현 | ProfileDetails/실제 navigation·8081 파일 선택 및 편집 |
| 사진 미리보기 후 부모 취소 또는 제출 중 이탈에서 자원을 너무 빨리 해제하거나 잔존할 위험 | 사진 수명이 문자열 URI만으로 표현됨 | 초안/제출/확정 참조 lease, 중복·교체·scope dispose 처리 | profilePhoto 자원 회귀·A/B navigation |
| 네이티브 변환기 생성 자체가 동기 예외를 내면 선택기 캐시가 정리되지 않음 | manipulate가 try 바깥 | 생성부터 try/finally에 포함, 기기 미지원 오류 구분 | profilePhotoPicker 동기 실패/권한/늦은 선택/원본 보호 |
| picker 교체 후 이전 busy/error가 남을 수 있음 | 상태에 picker 범위 없음 | 상태를 picker identity에 연결하고 이전 요청 abort | ProfileDetails 교체 회귀 |
| Stories 상세 이동 때 기존 행·스크롤 맥락을 유지해야 하지만 loading으로 바뀔 수 있음 | 비활성 시 getSnapshot이0으로 바뀌어 조회 key 변경 | 비활성도 실제 revision 유지, 구독만 중지 | WrittenStoriesProvider blur/복귀 회귀·실제 상세 복귀 |
| 동기 stories 조회 예외가 오류/재시도 UI로 연결되지 않음 | Promise 이전 동기 throw | 조회를 Promise 경계로 감쌈 | 동기 실패→재시도, 잘못된 소유자/공개 범위 응답 거부 |
| 내 followers를 누를 별도 경로 없음 | 하나의 버튼이 항상 following으로 이동 | 두 접근성 버튼으로 분리, 기존 관계 화면 재사용 | 실제 navigation·8081 두 경로 |
| 편집 닫기 후 키보드 포커스가 편집 진입으로 돌아오지 않음 | 제목 fallback만 사용 | 편집 진입 ref·하위 진입 ref로 복귀 |8081 activeElement 확인 |
| 이름/사진 변경 후 일부 응답/발행 글/목록의 이전 표시가 남음 | 발행 시점/fixture 표시 직접 사용 | userId로 현재 공개 프로필 투영·공통 ProfileAvatar 구독 | 기존 사용처 회귀·작성자 갱신8081 |
| 빈 Stories 배경/소개 서체/회원 시작 표시가 원본과 다름 | 기존 시각 누락 | 회색 빈 영역·세리프 소개·회원 시작 표시/간격 보정 | 원본과 실제 캡처 대조 |

1차 수정 후 iOS 대상5 suites/20 tests를 통과했다. 이후 source 교체 사례를 추가했으므로 이 중간 수치를 최종 전체 결과로 사용하지 않는다.

### 2차 재검토와 추가 수정

수정된 코드/diff·새 회귀 테스트·실제8081 정상/실패/계정 흐름·9쌍 비교/overlay를 다시 확인했다.

- 원본S080의 `he` 후보는 `he/her`인데 contains 검색은 `she/them/they`까지 포함했다. 접두 검색으로 수정하고 `findPronouns(' He ')` 회귀를 추가했다.
- S082 빈 검색의0/4, S080 검색 중 후보, S094 선택 chip의2/4를 각각 확인했다. 검색 중0개 카운터는 숨기고 선택이 있거나 검색이 비었을 때 표시한다. 48px 터치와 작은 회색 입력 표면을 분리하는 과정의 텍스트 가림도 캡처에서 발견해 전경 zIndex를 수정했다.
- About 본문·회원 시작 문구의 크기/간격을 보정했다. 프로필 길이가 긴 경우 이름이 부모 폭을 넘지 않게 했다. 원본 사진·서체·아이콘·OS sheet 장식은 동일하지 않다.
- 새 source 교체 컴포넌트 테스트가 실제 앱의 scope key를 생략해 한 사례가 실패했다. 실제 route의 scope key 계약을 재현하도록 테스트 구성을 수정했다. 앱의 navigation을 mock으로 바꾸지 않았다.
- 전체 실행에서 ResponsesNavigation의 VirtualizedList 지연 갱신이 act 바깥에서 실행되는 경고를 확인했다. 가상 시계/사용자 동작 진행을 맞추고 기사 로딩·응답 표시를 기다리도록 고쳤다. 중간 가상 시계 전환에서 발견한 source.read 대기도 명시적으로 진행했다. 최종 해당2 suites/4 tests 통과, 해당 로그에 act 경고 없음.
- source 변경/계정 변경/늦은 성공·실패, 미제출 취소와 이미 제출된 저장, 사진 정리, 관계/기본값/발행 결과의 독립 소유권을 다시 확인했다. 현재 앱의 정책을 뒤집는 인증 revision 변경·새 영속 저장·통계 기능은 없다.

2차 수정 후 전체 검사·캡처 재생성과 터치 영역·Escape 닫기 재확인을 수행했다. 남은 네이티브/원본 차이를 문서에 적었다는 이유로 전체 완료 처리하지 않는다.

## 테스트와 실행 결과

`.nvmrc`는24.18.0, engines는Node24다. 기본 shell Node22 대신 `/Users/jaegeunsong/.local/share/fnm/node-versions/v24.18.0/installation/bin`을 PATH 앞에 넣었다. 의존성 설치는 `npx --yes npm@10.9.0 install ...`로 packageManager를 맞췄다. 검증 스크립트 실행기는 이 Node 배포에 동봉된 npm11.16.0이며 실제 실행 버전을 구분해 기록한다. React19.2.3/RN0.86.3/Expo57.0.33/TypeScript6.0.3.

| 검사 | 실제 결과 | 저장소 밖 로그 |
| --- | --- | --- |
| `npm run typecheck` | 통과 | `typecheck-final2.log` |
| `npm run lint` (`--max-warnings=0`) | 통과 | `lint-final3.log` |
| `npm test` iOS+Android 전체 | **204 suites/1156 tests 통과**, 실패0·skip0·355.276초. 최종 로그 console 경고/오류0 | `full-tests-final.log` |
| 2차 수정 회귀 `npm test -- --runTestsByPath src/features/profile/ProfileDetails.test.tsx src/features/profile/profilePhoto.test.ts` |4 suites/18 tests 통과,20.409초. 이후 시각 수정은 최종 전체에 포함 | `review2-targeted.log` |
| ResponsesNavigation 시계/대기 보정 |2 suites/4 tests 통과,8.457초 | `responses-warning-final.log` |
| `npx expo install --check` | Dependencies are up to date | `expo-check.log` |
| `npx expo config --type introspect --json` | 통과. 사진/카메라 사용 문구, 마이크 권한 제외 확인 | `expo-introspect.json`/`.log` |
| `npx expo export --platform all --max-workers 2 --output-dir "$T/export-final"` | web JS·iOS/Android Hermes 모두 통과 | `export-final.log` |
|8081 Chrome 실제 조작 | 정상·취소·실패/재시도·계정 전환·공유 표시·발행/필터·관계 확인. 최종 시각 수정 후9개 브라우저 흐름 재확인 통과, console/page 오류0 | `browser-*.json`, `browser-*.log` |

신규 테스트 파일은 `profilePhoto.test.ts`, `profilePhotoPicker.test.ts`, `ProfileDetails.test.tsx`, `ProfileDetailsNavigation.test.tsx`, `WrittenStoriesProvider.test.tsx`다. 21개 시나리오를 두 Jest 플랫폼에서 실행한다. 기존 CommunityNavigation/TopicNavigation은 분리된 Following 진입 label로 갱신했고 ResponsesNavigation은 시간 경고를 수정했다. navigation 통합 테스트는 실제 SessionNavigation/native-stack/tabs를 사용한다. 계정 경합을 제어하기 위한 일부 테스트의 AuthStore probe와 Expo API 경계 mock은 실제 OS 조작 증거가 아니다.

중간 실패를 숨기지 않는다. 최초 신규 테스트의 renderer matcher/SDK mock 선언 및 Jest 동적 import 문제를 고친 뒤 정적 플랫폼 어댑터로 검증했다. 첫 전체 실행은203 suites/1155 tests 통과,1 suite/1 test 실패(총204/1156,387.69초)였고, 누락된 테스트 scope key를 수정했다. `--selectProjects ios`는 프로젝트 이름이 실제 `iOS`여서 검사0건으로 실패했다. 브라우저 harness의 첫 expect API/발행 후 복귀 화면/홈 북마크 위치 가정도 실제 UI에 맞춰 수정했으며 실패한 실행을 성공으로 집계하지 않는다.

## Medium 원본·공식 자료·자체 보완

보관본은 `medium/README.md`의 Medium iOS version ID1419다. F55/F56/F57 프로필 원본 PNG와 관련 ANALYSIS, F08 발행·F61 로그아웃·F63 경계 및 선행 화면 정책을 확인했다. 14개 프로필 단계 참조에는 중복 PNG가 있으며 전체200장 새 검증으로 세지 않는다.

2026-11-20에 Gummble의 `Medium iOS profile edit pronouns remove photo Public Unlisted stories filter`, `Public Unlisted filter`, `Remove profile photo` 검색과 상세 이미지를 확인했다. 사진 제거 검색은 기존S123 편집 폼을 반환했고 제거 메뉴는 없었다. Public 검색의4개 fallback은 Digest·Reading list Highlighted·Add topics·Email settings여서 Public 펼침 근거가 아니었다. 추가 화면은390×844 메타데이터와 서로 다른 UI를 보였지만 정확한 버전 ID는 확인하지 못했다.1419 보관본과 같은 버전이라고 단정하거나 보관본을 덮어쓰지 않았으며 새 보관본 파일은 추가하지 않았다.

| 구분 | 근거/판정 |
| --- | --- |
| 원본 관찰 | S123 편집, S156 사진 source 메뉴, S005 선택 후 부모, S082/S080/S120/S094 대명사 빈 검색/후보/선택, S027/S138 부모 반환, S136/S047 저장 프로필/About, S020 빈 Stories |
| 현재 공식 설명 | [Your profile page](https://help.medium.com/hc/en-us/articles/115004747067-Your-profile-page): 사진/이름/short bio,160자. [Pronouns](https://help.medium.com/hc/en-us/articles/23866640775063-How-to-set-your-pronouns-on-Medium): 최대4·Done 후 부모 Save·13후보. 보관된 전체 후보 목록의 관찰로 취급하지 않음 |
| 사진 제거 미수록 | 공식 프로필 도움말의 Remove는 웹 설명에서 확인되지만 앱 설명에는 변경만 확인. 모바일 제거 메뉴는 구현하지 않음. 이를 Medium 모바일에서 제거가 절대 불가능하다는 결론으로 쓰지 않음 |
| 필터 미수록 | Public 펼친 옵션을 확보하지 못함. [Unlisted publishing](https://help.medium.com/hc/en-us/articles/215552778-Unlisted-publishing)의 공개 노출 제외 설명을 참고하되, 앱의 Public/Unlisted 두 옵션은 Goal39의 자체 mock 보완 정책으로 유지 |
| 자체 보완 | 대명사 취소/back 버튼, 오류/재시도 문구·4개 제한 안내·미지원 안내, 접근성 label/포커스, 모의 계정·온보딩 재개·Drafts 링크, NFC 정책, 사진 크기/리소스 수명 |
| 이번 제외 | 긴 About 모바일 편집기, 근거 없는 사진 Remove, Story stats43, 실제 OAuth/백엔드/Storage 업로드/발행 링크/RSS/AI, 새로운 관계·알림·결제 기능 |

## 캡처 비교와 남은 차이

`$T/COMPARISON.html`, `$T/pairs.json`, `compare-S*.png`에 원본/실제/50% overlay를 함께 보관했다. 원본1179×2556을393×852로 줄이고 위59/아래34를 제외해 브라우저393×759와 앱 영역을 맞췄다. 이것은 비교용 정규화이며 실제 OS Safe Area 측정이 아니다. 프로필 비교는 온보딩 추가 행이 없는 mock B로 이름/대명사/소개 입력을 맞췄다. 사용자 사진 대신 기존 검증용 `FE/assets/medium/radu-response.png`를 선택했다.

| 원본 | 실제 캡처 | 확인/남은 차이 |
| --- | --- | --- |
| S123 `sc_a829121c47a444cd8a8fd0d9889edaed` | `edit-before.png` | 헤더/이름50/소개160/안내 배치. 대체 font/미세 간격/아바타 기본색/웹 포커스 장식 차이 |
| S156 `sc_cba29e82e4364a239d3e5423213fa670` | `photo-menu.png` | Camera/Library/Cancel·부모 dim. OS safe inset와 title/행 높이 일부 차이 |
| S005 `sc_05df03a16c6b466b8ba91d9d6244c2f5` | `photo-selected.png` | 선택 사진 부모 미리보기. 검증용 인물/원본 인물은 다름 |
| S082 `sc_743e421bb2b14205b19b76062fdf27cd` | `pronouns-empty.png` | 빈 검색·0/4. 자체 뒤로 버튼, 원본 sheet 뒤층 장식 차이 |
| S080 `sc_6c7a00132f3c47e6b2e803743cc10d21` | `pronouns-search.png` | `he/her` 접두 후보 보정. 후보48px 터치와 서체 차이 |
| S094 `sc_82178c6b5a56471cb64fecb5a4e4bc4e` | `pronouns-two.png` | he/him·2/4·삭제. 터치 영역을 위해 chip hit box와 실제 시각 폭 분리 |
| S138 `sc_befb6fde38cc48f3827ea389caed11de` | `edit-complete.png` | 부모 chip·49/160·About. 대체 서체와 여러 줄 입력 때문에 예시 소개가2줄로 보여 하단 위치 차이 |
| S136 `sc_be99c4fdcf634190a324ec9820a84f43` | `profile-saved.png` | 저장 후 사진/이름/he/him 헤더 비교. **아래 원본 발행 글과 구현 빈 목록은 같은 데이터 조건이 아니므로 헤더 비교로 제한** |
| S047 `sc_3cd0855e78a84d4ea413f0e5b3dffb73` | `profile-about.png` | 소개 세리프/회원 시작 문구 보정. 사진·관계 수·탭 폰트/여백·하단 아이콘 차이 |

실제 발행 결과와 필터는 별도 `stories-public.png`, `stories-filter-menu.png`, `stories-unlisted.png`, `story-current-author.png`로 확인했다. 메뉴 원본이 없어 픽셀 동일 판정을 하지 않는다. 작성 글 카드에는 원본 mock 수치/박수/북마크/통계 컨트롤을 임의로 붙이지 않았다. 전체200장 비교나 근거 없는 일치율·100% 동일 재현을 주장하지 않는다.

## Camera/Library 구현과 플랫폼 검증

| 층/플랫폼 | 구현 및 확인 | 남은 조건/영향 |
| --- | --- | --- |
| Goal42 native 어댑터 | Expo ImagePicker 카메라 권한→launchCameraAsync, 이미지 전용 launchImageLibraryAsync. 전체 라이브러리 읽기 권한 선행 요청 없음. ImageManipulator로 긴 변768 이하 JPEG 처리, 앱 캐시만 정리 | 실제 시스템 picker·권한 거절/제한/설정 복구·카메라 성공은 기기 검증 대기 |
| Goal42 web 어댑터 | 사용자 클릭 안에서 file input, Camera는capture hint, Image decode/canvas JPEG/blob URL. 정상 파일/손상 파일/부모 취소·저장 수명 검증; 늦은 교체 응답은 주입 picker 테스트 | Chrome 파일 선택을 iOS/Android 촬영 성공으로 표현하지 않음. 브라우저별 OS 취소/capture·HEIC 지원 차이 가능 |
| 테스트 주입 picker | 허가/거절/미지원/처리 실패·늦은 응답·A/B 제어 | 실제 OS 권한 화면이 아니며 native API 경계 mock임 |
| Goal37 작성 편집기 | 기존 번들 fixture 선택 유지, 관련 전체 회귀 포함 | 실제 OS picker 호출은 Goal37 잔여. 프로필 구현으로 작성 편집기까지 해결했다고 기록하지 않음 |
| iOS 빌드/실행 | JS/Hermes export·iOS Jest 및 config 검사 | Xcode.app 없음, xcode-select는CommandLineTools, xcodebuild 오류·simctl 없음. 실제 빌드/Simulator/물리 기기 실행 미실행. Xcode+runtime/카메라 기기 필요 |
| Android 빌드/실행 | JS/Hermes export·Android Jest 및 config 검사 | SDK·adb 없음. JDK17/21/23은 설치돼 있으나 SDK/에뮬레이터가 없어 실제 Gradle build/run 미실행. SDK·build tools·adb·기기 필요 |
| 입력/접근성 |393폭/320폭·긴 한국어·Light/Dark·48px·접근성 label/checked/disabled·스크롤·브라우저 포커스 복귀. CSS160%와 합성 composition 이벤트 확인 | 브라우저 실측 터치 영역은8개 주요 컨트롤 모두 최소48×48이고 Escape로 사진 메뉴→부모, 대명사→부모, 부모→프로필 닫기를 확인했다(`browser-accessibility.json`, 오류0). 실제 키보드 가림/한글 IME·Dynamic Type·OS 글자 확대·VoiceOver/TalkBack·제스처 Back·Safe Area는 대기 |

추가 의존성은 SDK57 호환 고정 버전 `expo-image-picker@57.0.21`, `expo-image-manipulator@57.0.22`, `expo-file-system@57.0.7`이다. 선택·크기 제한·임시 캐시 수명 때문에 필요하다. file-system은 기존 Expo 중첩 의존성을 직접 의존성으로 끌어올렸으며, 이미지 로더는 SDK의 전이 의존성이다. 대체로 웹 input만 사용하면 네이티브 요구를 충족하지 못하고, 계속 mock을 쓰면 OS 연결이 미구현으로 남으므로 플랫폼 어댑터를 분리했다.

공식 [ImagePicker SDK57](https://docs.expo.dev/versions/v57.0.0/sdk/imagepicker/), [ImageManipulator SDK57](https://docs.expo.dev/versions/v57.0.0/sdk/imagemanipulator/)와 설치 SDK 소스를 확인했다. app.json plugin은 카메라/사진 설명을 지정하고 마이크 권한을 제외한다. SDK Android manifest의 구형 READ/WRITE_EXTERNAL_STORAGE 선언(maxSdk32)은 SDK 호환 선언이며 앱에서 전체 라이브러리 권한을 요청하는 호출과 구분한다. Android activity 재생성의 pending picker 결과를 새 세션 프로필로 자동 복구하는 기능은 넣지 않았다. 앱 재실행의 메모리 초기화와 같은 기준이며 해당 OS 상황은 기기에서 확인해야 한다.

OS 사진 선택기/권한 화면은 시스템 UI다. Medium 자체 화면의 픽셀 재현 대상으로 만들지 않았다. 사진은 로컬 검증용이며 실제 사용자 사진·계정·토큰을 요청하지 않았다.

## 증거 위치·재현·보관 한계

`T=/var/folders/jg/zn9h2_f91nxfpwz9hzpkqcv80000gn/T/kostolany-goal42-cgqksvkl`

- 캡처·비교·로그·Playwright/Swift 일회성 도구·export 모두 `$T` 아래다. 저장소의 TODO/evidence·TODO/_evidence나 새 검증 스크립트/로그/캡처 파일을 만들지 않았다.
- macOS 임시 디렉터리이므로 영구 보존을 보장하지 않는다. 삭제되면 결과 문서의 화면 ID와 아래 순서로 재검증해야 한다. 링크만으로 이미지가 저장소에 보존되는 것은 아니다.
- Chrome Playwright 도구는 `$T`에 설치했고 기존 Google Chrome channel을 사용했다. `node "$T/browser-profile.cjs"`, `node "$T/browser-flows.cjs"`, `node "$T/browser-stories.cjs"`, `node "$T/browser-relationships.cjs"`는8081의 실제 navigation/DOM을 조작한다. 설치한 automation Chromium 버전과 기존 캐시가 달라 Chrome channel로 전환했다.
- `browser-flows`의 조회/저장 장애는 해당 독립 브라우저 페이지의 mock source를 한 번 실패하도록 임시 교체한 것이다. 정상 함수로 복원하고 reload/페이지 종료했다. 앱 소스에 디버그 경로를 추가하지 않았다. 최종 profilePreview 등 장애 상수는normal이다.
- `swiftc "$T/compare.swift" -o "$T/compare"` 후 `"$T/compare" "$T"`로 원본/캡처 비교를 생성한다. 해당 도구/이미지가 남아 있어야 재실행할 수 있다.

## 8081에서 최종 확인하는 순서

1. `http://localhost:8081` 새로고침→프로필→모의 로그인 시작. 닫기 후 다시 열고 모의 동작 선택에서 사용자 취소/실패→재시도를 확인한다. 정상 A로 로그인한다.
2. Edit your profile에서 이름/소개를 바꾸고 Close. 재진입해 기존 값인지 확인한다. 이름50/51,소개160/161·공백 이름을 넣어 저장 경계를 확인한다.
3. Update photo→Camera/Library 또는 Cancel. 검증용 `FE/assets/medium/radu-response.png`를 선택해 미리보기→부모 취소, 재선택→Save를 비교한다. 웹 Camera는 파일 선택/capture hint이며 네이티브 카메라 검증이 아니다.
4. Add pronouns→`he` 검색→he, `him`→him→Done. 부모를 취소하면 사라지는지 확인하고, 다시 선택→Save 후 프로필/재진입에서 유지되는지 확인한다. 네 개·다섯 번째·중복·삭제·검색 없음도 확인한다.
5. 편집 폼 아래 About Page 데스크톱 안내를 읽고 닫는다. 프로필 About에서 저장한 소개를 확인한다. 설정의 Edit profile에서도 같은 값을 확인한다.
6. 프로필 Write a story에서 제목/본문→Next→Publish now로 공개 글을 하나 만들고, 다른 글은 Unlisted를 켜서 발행한다. 프로필 Public/Unlisted 선택별 결과→글 상세→뒤로에서 필터가 유지되는지 확인한다. 프로필 이름을 바꾸고 같은 글 작성자 표시도 확인한다.
7. 홈 작성자→Follow·이메일 구독→프로필 My following/My followers→작성자/관계 화면→복귀. 이름/사진 변경 뒤 관계와 목록 소유자 표시를 확인한다. 저장 목록·박수·기본 설명 수준·작성 초안을 만든 뒤 프로필 편집 전후에도 확인한다.
8. 설정에서 로그아웃 취소, 모의 실패→재시도. 가입 intro의 Sign in→B 로그인에서 B 프로필 확인→로그아웃→A 재로그인. A의 확정 사진/대명사/소개와 개인 데이터를 확인한다.
9. 320px 폭·Dark·큰 글자 대체 확인에서 입력/검색/사진 메뉴/닫기·스크롤을 확인한다. 마지막 전체 reload로 인증/개인 프로필이 초기화되는지 확인한다. 실제 OS IME/접근성/카메라는 위 기기 환경에서 별도 수행해야 한다.

## 마무리

최종 diff·새 파일·문서 링크/현재 승인·Git 상태를 검토했다. HEAD는 `036ef6e3f8ab15af0fa6ae14487b7a2bfe8c2aaf` 그대로이며 staged 변경은 없다. 시작 clean에서 이번 코드/테스트/문서만 변경했다. ENV·medium 원본·기존 evidence를 수정하지 않았고 저장소 내부 임시 스크립트/로그/캡처는 추가하지 않았다.8081을 유지하고 mock 장애 기본값은normal이다. 커밋·push·배포를 하지 않았으며 Goal43을 시작하지 않는다. 권장 커밋 메시지: `feat(fe): implement Goal 42 profile editing and stories flows`.

## Goal52 후속 수정 — 2026-11-21

프로필 사진 선택을 shared/media로 추출하고 프로필768변/부모 Save·Cancel·계정별 확정 사진 계약을 유지했다. 편집기는1600변 정책을 별도로 사용한다. Goal42의 당시 검사 결과를 덮어쓰지 않으며 실제 native 사진 실행은 여전히 대기다. 현재 코드의 두 차례 검토·실행 결과와 환경 한계는 [Goal52 결과](FE_GOAL_52_RESULT.md)를 따른다. 과거 실행 결과는 당시 코드의 증거로 유지한다.
