# Goal 47 — 기사·인용·작가·토픽·목록 공유와 이미지 저장

2026-11-21 KST, macOS. **공유 기능 구현·두 차례 자체 검토 수행, 원본 차이·실제 native 검증 잔여.** Goal46 커밋 `a14854230f08119ed45127fcfaee74962841944f`와 깨끗한 작업 트리에서 시작했다. 승인된 Goal44→53 연속 작업이며 이번 변경만 로컬 커밋한다. push·배포·외부 전송·실제 Friend Link 발급은 하지 않았다.

## 구현과 흐름

| 진입 | 구현·검증 |
| --- | --- |
| 기사 상세 | 원본 기사와 일반 fixture의 Share를 실제 공유 화면에 연결했다. 타입·기사 ID로 링크를 만들며 기존 기사로 돌아온다. |
| 인용 | 선택 원문의 텍스트·전역 start/end를 카드와 공유 문자열에 전달한다. Share 닫기/뒤로는 선택 메뉴로 복귀한다. 웹 DOM 범위 선택과 실제 navigation 테스트를 각각 확인했다. |
| 작가·publication | 기존 관계 메뉴의 이름만 전달하던 안내를 타입/ID 기반 공유로 교체했다. 공유가 Follow/구독/차단을 변경하지 않는다. 작가의 실제 브라우저 진입·복귀와 URL을 확인했다. publication은 동일 typed 경로·타입 테스트로 확인했다. |
| 토픽·공개 목록 | Life와 공개 morning routine 목록의 서로 다른 주소·제목·부모 복귀를 실제 navigation 및8081에서 확인했다. |
| 내 목록 | 소유 사용자 ID와 목록 ID를 조합하는 기존 `ownedPublicListId`를 사용한다. 긴 한국어 목록 생성→공유→비공개 전환→공유 내용 차단을 브라우저에서 확인했다. |
| 발행한 글 | 기존 PublishedStory의 ID·소유자·제목·Unlisted를 사용한다. 별도 통계/공유용 글 저장소는 만들지 않았다. Unlisted 주소·source/adapter 교체 회귀를 테스트했다. |
| 플레이어 | 같은 재생 기사 공유 화면을 연결하고 닫으면 플레이어로 복귀한다. 재생/속도/음성을 초기화하지 않는다. 실제 navigation·브라우저로 확인했다. |
| Copy link | Expo Clipboard의 실제 웹 복사 결과를 읽어 ID와 일치함을 확인했다. false·동기 예외·실패 후 재시도는 실패로 표시하고 카드 선택을 유지한다. |
| 카드 스타일 | 원본의10개 페이지 점과 가로 스와이프,48px 이전/다음 조작을 제공한다. 첫 배경은 SVG 대체이며 나머지9개 팔레트는 미수록 부분의 자체 보완이다. |
| Share via | native RN Share / 웹 Web Share를 분리했다. cancelled/returned/unsupported를 구분하고 returned를 실제 전송 완료로 표시하지 않는다. 실제 사람에게 보내지 않았다. |
| Save image | 카드 View만 PNG로 만든다. 웹은 실제 파일 다운로드, native는 추가 전용 사진 권한→Asset.create를 구현했다. 저장 완료 토스트는 반환값에 따라 구분한다. 실제 OS 앨범 저장은 검증 대기다. |
| Friend Link | 자기 글의 `?preview=friend` 복사와 타인 글의 자격 안내를 제공한다. 이는 자체 mock 계약이며 실제 paywall 우회 링크가 아니다. Friend 계정 권한 연결은 선행 계획대로 Goal48 범위다. |

공유 화면은 헤더 닫기·플랫폼 뒤로·스크롤, 처리 중 표시, 실패/재시도, 이미지 로딩/실패 시 이니셜 대체, 미지원·권한 거절 상태를 구분한다. 대상이 없어지거나 비공개이면 카드·문구·주소·저장 동작을 숨긴다. 원본에서 비공개 목록의 공유 버튼은 관찰되지만 펼친 결과는 없어 이 차단 정책은 자체 보완이다.

## 상태·주소·수명 계약

- `ShareTarget`의 article/quote/writer/publication/topic/list·ID·제목·작성자 ID·가시성을 명시한다. 표시 이름/사진으로 대상을 식별하지 않는다. 확정 프로필은 기존 ProfileProvider를 읽고 공유 화면에는 편집 가능한 복제 저장소를 만들지 않는다.
- 주소는 `https://kostolany.invalid/{type}/{encodeURIComponent(id)}`다. quote는 article 주소에 `#quote-start-end`, Friend 미리보기는 `?preview=friend`를 사용한다. 실제 서비스에서 열리는 URL이나 인증 토큰이 아니다. Unlisted는 직접 링크 대상이며 private은 링크 생성 자체를 거부한다.
- `SharingProvider`는 플랫폼 adapter만 공급한다. 지역 공유 진입은 auth 사용자 ID/revision·adapter·필요한 데이터 source로 범위를 정한다. 범위가 어긋나면 이전 진입을 폐기해 같은 source 객체 A→B→A에서도 되살리지 않는다. 프로필 표시 데이터 변경도 진행 중 이미지 요청을 폐기하고 새 이미지 준비를 기다린다.
- 카드 스타일·오류·토스트·처리 요청은 화면 지역 상태다. 닫기·대상/접근 상태 변경·source/adapter 교체·계정 전환은 AbortController와 화면 수명으로 늦은 성공/실패를 무시한다. 실패는 현재 스타일을 유지한다. 저장 중 중복 버튼은 한 명령만 실행하고 완료 후 새 행동은 허용한다.
- 이미지 캡처 결과는 임시 자원이며 성공/실패/취소 모두 finally에서 release한다. 늦게 만들어진 이미지도 정리하고 사진 저장을 시작하지 않는다. 이미 OS/클립보드에 확정된 부작용을 화면 닫기로 되돌렸다고 주장하지 않는다. 임시 PNG 정리는 사진 보관함의 확정 사본을 삭제하지 않는다.
- 사진 모듈은 행동 시점에 로드한다. 모듈이 없는 이전 native 개발 빌드는 미지원 오류를 반환한다. 웹의 PNG 다운로드 시작은 브라우저가 파일을 영구 보관했다는 보장이 아니며 자동 검증에서는 실제 download 이벤트·파일을 따로 확인했다.
- 계정별 프로필·저장 목록·작성/발행·반응·관계·설정의 소유권과 메모리 재실행 정책을 바꾸지 않았다. 계정 전환은 공유 시트/오류를 제거하며 A의 확정 데이터를 지우지 않는다.

## 1차 자체 검토 → 수정·검증

코드·원본 PNG·navigation·초기 브라우저 캡처를 대조한 자체 검토이며 독립 검토가 아니다.

| 재현·기대 | 원인·수정·확인 |
| --- | --- |
| 기존 Share를 눌러도 대상을 전달하지 않았다 | 작가 메뉴가 이름만 보관하고 기사/목록은 안내만 표시했다. typed ID와 adapter를 연결하고 실제 복사 주소·부모 복귀를 확인했다. |
| native 모듈이 없는 빌드에서도 공유 진입/복사는 유지해야 한다 | 이미지 모듈을 지연 로드하고 미지원 오류를 분리했다. Jest VM의 dynamic import 제약은 loader 경계 대역으로 처리했으며 lint 무시나 앱 로직 우회를 넣지 않았다. |
| 아바타 A→B→A에서 이전 ready가 재사용될 수 있었다 | 표시 데이터별 하위 화면 키로 이미지 대기/요청을 함께 초기화했다. 새 사진 onLoad/error 전 저장 금지 회귀를 추가했다. |
| inline 공유의 adapter 교체에서 빈 부모 Modal이 남을 수 있었다 | 범위 불일치 시 부모 닫기까지 연결했다. 부모 close 호출과 늦은 캡처 정리를 확인했다. |
| 원본보다 제목 위치·카드 높이가 어긋났다 | 실제 비교로 Share 제목 x 위치와 부제 자간을 조정해 불필요한 한 줄/18px 증가를 줄였다. 원본 글꼴·배경 자산 차이는 남긴다. |

초기 타입/lint·테스트 실패도 수정했다. 렌더 중 ref 접근과 effect 안 setState 초기화, 중복 import, 잘못 쓴 fixture 작성자 ID 기대값을 고쳤다. 실행 결과를 검토 자체로 대체하지 않았다.

## 2차 재검토 → 수정·검증

수정 코드·현재 캡처·실제 저장 PNG·실패/경합 결과를 새로 검토했다.

- 인용 선택의 웹 portal은 높이/포커스 경계가 일반 공유 Modal과 달랐다. 선택 overlay 대신 같은 ShareSheet를 교체 표시해 중첩 Modal 없이 닫기/뒤로/원래 선택 복귀를 맞췄다. 실제 DOM 선택과 인용 회귀를 다시 통과했다.
- source/adapter가 원래 객체로 돌아오면 숨겨 둔 이전 공유 진입이 되살아날 여지가 있었다. 불일치 시 진입 자체를 폐기하고 작성 글의 source·토픽 데이터·일반 기사 source를 입력 경계로 연결했다. Unlisted 발행 글의 source/adapter A→B→A 회귀를 추가했다.
- 동기 복사 실패→재시도·웹 공유 취소 대역·캡처 중 닫기→재진입→늦은 이미지 정리·비공개 목록 차단을 브라우저에서 확인했다. 부모 선택·스타일을 보존하고 이전 성공 토스트가 나타나지 않았다.
- 320px Dark·CSS 글자160%에서 카드 높이가 늘어나도 저장 PNG에 전체 카드가 포함됐다. `exported-large-card.png`와762px 높이를 확인했다. 실제 Dynamic Type/OS 스크린리더 증거는 아니다.
- 실제 원본5쌍과 구현 캡처를 다시 열어 비교했다. 배경 패턴·글꼴·일부 아이콘/간격·웹 저장 문구·추가 조작 차이가 남는다. 단순 일치율을 계산하지 않았다.

## 실제 검사 결과

Node24.18.0(`FE/.nvmrc`), npm, Expo57.0.33/RN0.86.3. 실행 위치는 `FE`이며 아래 명령은 해당 Node 경로를 PATH 앞에 설정했다.

| 검사 | 실제 결과·시점 |
| --- | --- |
| `npm run typecheck`, `npm run lint`, `npm test -- --runInBand` | 전체 검사230 suites/1318 tests 통과,373.873초. `full-check.log`. 이후 수명 보완은 아래 영향 검사로 다시 확인했다. |
| 공유·인용·플레이어·작성 글 영향 검사 | 14 suites/54 tests,23.805초. `review-2-check.log`. |
| 최종 타입/lint + `npm test -- --runInBand --testPathPattern='sharing\|SharingNavigation\|WrittenStoryScreen\|TopicNavigation\|HighlightsNavigation\|ListeningNavigation'` | 16 suites/60 tests 통과,24.831초. `final-check.log`. 최종 수명 보완·Unlisted/source 회귀 포함. 이전 전체 기록을 최종 코드 전체 재실행으로 표현하지 않는다. |
| 실제 navigation | `SharingNavigation.test.tsx`에서 기사/인용/작가/토픽/공개 목록·계정 A→B→A/같은 A 재로그인·늦은 성공/실패를 검증했다. navigation은 대역이 아니며 외부 공유 adapter만 대역이다. |
| 단위/컴포넌트 회귀 | `types`, `shareAdapter`, `ShareSheet`, `WrittenStoryScreen`에서 주소·비공개·권한·실패/재시도·중복 저장·취소·대상/source/접근 변경·임시 파일 정리·사진 교체를 확인했다. |
| 8081 Chrome | `browser.cjs`4개 묶음, `extended.cjs`4개, `faults.cjs`4개 통과. 각 console/page 오류0. 추가 `focus.cjs`에서 실제 마우스 스와이프→2번 스타일, Escape 닫기→기사 제목 포커스 복귀도 확인했다. 초기 자동화 selector/스크롤/로그인 모달 대기 오류는 수정해 다시 실행했다. |
| `npx expo export --platform all --max-workers 2 --output-dir …/final-export` | web JS와 iOS/Android Hermes 번들 성공. native 빌드/설치/실행이 아니다. |
| `npx expo config --type introspect --json` | iOS 사진 추가/선택/카메라 설명과 Android 권한 설정 확인. native manifest 빌드 결과가 아니라 config plugin 적용 결과다. |
| `npm audit --json` | moderate3개. expo57.0.33·@expo/fingerprint0.20.16·minimatch10.2.6은 시작 HEAD와 같은 버전이다. 자동 강제 업그레이드는 하지 않았다. |

`expo-clipboard~57.0.2`, `expo-media-library~57.0.6`, `react-native-view-shot5.1.0`은 설치된 Expo57 호환 목록을 확인해 추가했다. OS 복사·앨범 저장·동일 카드 캡처에 필요한 최소 경계다. SVG를 새 래스터 서비스에 보내지 않으며 view-shot의 웹 구현은 html2canvas를 사용한다. 새 native 빌드가 필요하다. Android 전체 사진 읽기 권한은 차단하고 기존 프로필 OS picker는 전체 라이브러리 조회를 요청하지 않는 방식을 유지했다.

## Medium 원본·보완·차이

`medium/README.md`, Goal47의 F03/04/16/17/19/20/21/25/26/28/39/40/45/46/47/49/50/51 대응표와 관련 ANALYSIS의 공유 진입/미수록 분기를 확인했다. Sharing a story/Downloading an image 실제 PNG, Life·팔로우 메뉴·작가 더보기(`sc_c25f22caf7cd49ba88c8611fb7480932`)·구절 선택·비공개 목록의 실제 PNG를 직접 열었다.

비교 조건: 원본1179×2556을393px 너비로 축소하고 OS 상단59/하단34를 제외한393×759와 같은 크기8081 Chrome 캡처를 병렬/50% overlay로 대조했다. 웹을 동일 iOS 렌더러로 간주하지 않는다.

| 원본 ID | 구현 캡처·판정 |
| --- | --- |
| `sc_332d5b0923e546fcbf6a8fc613cda6a4` | `article-entry.png` / Share 진입 연결. 기존 기사 원본 차이 유지. |
| `sc_d1c962cd0a8240ee94769a612a81d64f` | `article-share.png` / 카드·메타·점·가로 동작 연결. 추상 배경/폰트/주소/추가 이전·다음 조작 차이. |
| `sc_4225892a7f304ec9b0442fad0aae38bb` | `copy-toast.png` / 실제 복사 후 Link copied. 폰트·토스트 폭 차이. |
| `sc_221a38b7f8ac42959ddd75840253b5c8` | `save-action.png` / 가로 스크롤 후 Save image. 아이콘·스크롤 위치 차이. |
| `sc_62256b592ebc4b028f1097aa21f9e400` | `save-toast.png` / 웹은 Image download started로 구분. OS 앨범 성공 문구를 웹에서 재현한 척하지 않는다. |

- Gummble의 Medium 공유/인용/작가/목록 추가 조회에서 정확한 새 결과를 확보하지 못했다. 반환된 관련 로그아웃 화면을 공유 근거로 사용하지 않았다. 대상별 펼친 카드·나머지 스타일·실제 OS 화면은 미수록/미검증이다.
- [현재 공식 Friend Links 설명](https://help.medium.com/hc/en-us/articles/360006543813-About-Friend-Links)은2026-11-21 조회 자료이며 과거 보관본의 픽셀·기본값을 증명하지 않는다. 실제 링크 발급/권한 우회는 없다.
- Expo57 [Clipboard](https://docs.expo.dev/versions/v57.0.0/sdk/clipboard/), [MediaLibrary](https://docs.expo.dev/versions/v57.0.0/sdk/media-library/)와 설치된 소스, [view-shot](https://github.com/gre/react-native-view-shot)의 설치 버전 API를 대조했다. 최신 upstream과 설치 버전을 혼용하지 않았다.
- 대체 SVG 배경/10개 팔레트, 대상별 카드 문구, private 차단,48px 이전/다음, 미리보기 주소 설명은 자체 보완이다. 원본 `medium.com/@jordan_gibbs`를 우리 링크처럼 사용하지 않는다. 이미지 저장과 목록 offline 다운로드는 별개다.

## 플랫폼·남은 검증

| 환경 | 구현·실행 구분 |
| --- | --- |
| web | 실제 clipboard·PNG 다운로드·선택/복귀·실패/경합·320px/Dark/CSS160% 확인. Web Share는 미지원 및 취소 대역을 확인했고 실제 외부 전송은 하지 않았다. |
| iOS | RN Share·Clipboard·PNG 캡처·사진 추가 권한·Asset.create·OS 설정 진입 구현. Xcode/Simulator 없음: `xcrun simctl`72, `xcodebuild -version`1. 실제 공유 취소/사진 허용·거절/앨범 저장·VoiceOver·Dynamic Type 검증 대기. |
| Android | 같은 adapter와 앱별 권한 경계 구현. SDK/adb/emulator·native 프로젝트 없음. 실제 API별 권한/저장소·공유 반환·설정 복귀·TalkBack 검증 대기. |

macOS14.2 arm64, CommandLineTools만 존재하며 Java11/17/21/23을 확인했다. 이 환경 사실을 과거 기록에서 가져오지 않았다. 필요한 환경은 Expo57/RN0.86 호환 개발 빌드, Xcode와 iOS Simulator/기기, Android SDK·에뮬레이터/기기다. 네이티브에서 사진 권한 미결정/허용/거절→재시도, Share 취소/복귀, 큰 글자 캡처·앨범 파일·background 중 취소를 수행해야 한다. OS 화면은 Medium 자체 화면의 픽셀 비교 대상이 아니다. 필수 native 검증·원본 자산 차이·Goal48 권한 연결이 남아 전체 동일 재현/출시 완료로 표시하지 않는다.

## 증거·재현·8081 확인 순서

증거 루트: `/var/folders/jg/zn9h2_f91nxfpwz9hzpkqcv80000gn/T/kostolany-goal47-4j499_8r`.

- `baseline.json`, `platform.json`, `native-config.json`, 검사 로그와 브라우저 스크립트/JSON을 보관했다. `pairs.json`과 `compare-01.png`~`compare-05.png`, 실제 `exported-card.png`·`exported-large-card.png`를 포함한다. 임시 OS 디렉터리이므로 정리되면 증거가 사라진다. 저장소 내부에 임시 로그/캡처/검증 스크립트를 추가하지 않았다.
- 외부 스크립트는 로컬 Playwright/Chrome과 기존8081을 사용한다. 기능 검증은 mock A/B·한국어 목록·실패 주입을 사용하고, 원본 비교는 medium-brain 기사 fixture와393×759 조건을 사용한다. CSS 확대/합성 선택 이벤트는 OS 접근성/IME 검증이 아니다. 실패 주입은 브라우저 메모리에서만 수행하고 끝에 복원/새로고침했다.

1. 8081 새로고침→Notifications→모의 A 로그인→탐색 검색→ChatGPT 기사→Share story. Copy link 후 미리보기 주소와 토스트를 확인한다.
2.  카드 스와이프/이전·다음→Save image까지 가로 스크롤→PNG 다운로드. Share via의 지원/미지원·닫기와 기사 복귀를 확인한다.
3.  본문 문구 선택→Share→인용/주소 범위→닫기→원래 선택. 작가 이름→options→Share author→닫기를 확인한다.
4.  Listen→확장→공유→닫기→같은 플레이어 상태를 확인한다.
5.  탐색 Life→공유→Self Improvement→공개 목록→공유→뒤로, 라이브러리 새 목록→공유→Make list private→공유 차단을 확인한다.
6.  프로필→설정→로그아웃→B 로그인, 이전 공유 시트/오류가 남지 않는지 확인한다. A 재로그인·늦은 응답은 자동 navigation 회귀에서도 검증했다. 새로고침은 메모리 mock을 초기화한다.

기존8081 PID58453을 재시작/종료하지 않았고 ENV·medium 원본·사용자 변경을 건드리지 않았다. 최종 diff/staged 검토 후 이 Goal만 로컬 커밋하고 Goal48로 진행한다.


## Goal48 후속 연결 — 이전 실행 기록과 구분

2026-11-21의 [Goal48 결과](FE_GOAL_48_RESULT.md)에서 계정별 mock 멤버십을 연결했다. A는 기존 Member, B는 Free 기본 fixture이며 확정 권한을 Listen·offline·공유가 함께 읽는다. 미확정 요청 취소와 확정 후 닫기를 구분한다. 온보딩/설정의 멤버십 안내를 실제 mock 플랜으로 연결하고 Friend 링크는 memberOnly·작성자/Friend 자격을 검사한다. 실제 결제/음성 출력/링크 발급·native 실행 완료를 뜻하지 않는다. 위 과거 검사 수치와 당시 제한은 당시 기록으로 유지한다.
