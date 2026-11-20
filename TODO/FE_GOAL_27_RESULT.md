# Goal 27 — 문구 선택·Highlight·인용 Responses

2026-11-19 KST, macOS. **구현 완료·시각/native 검증 잔여**. Goal25·26은 구현 완료·시각/native 검증 잔여이며, 최신 요청에 따라35까지 계속한다. 커밋/push/배포·실제 외부 서비스 연결은 하지 않는다.

## 원본과 구현 범위

- C19/C20, F24/F25/F29/F30~36/F41. Highlighting a phrase와 Responding to a phrase ANALYSIS, Library의 Highlighted 화면 및 미확인을 읽었다. 실제 원본 `sc_f4b066…`, `sc_a8112b…`, `sc_0da01c…`, `sc_8accfd…`, `sc_1b7c2…`, `sc_fcdcd…`, `sc_c37aefd…` 7장을 직접 확인했다. Goal26의 Responses 원본 검토도 이어서 적용한다.
- 웹에서 실제 DOM Selection/Range의 시작·끝을 본문 UTF-16 offset으로 매핑한다. 마우스 드래그 중 메뉴로 선택을 가로채지 않고, 선택을 마친 뒤 Highlight/Respond/Share/더보기를 연다. 실제 본문 Text를 사용하며 화면 이미지/텍스트 이미지를 선택 구현으로 사용하지 않는다.
- 기사 사실 요약과 Medium 캡처 본문을 선택할 수 있다. 계정 기본 설명 수준·임시 설명 수준은 별개로 보존하며 생성 설명은 이번 원문 범위에 포함하지 않는다.
- 사용자 하이라이트 source/store/provider와 AppNavigator 주입, Library Highlighted의 가상화 목록·원문 복귀·제거, 인용 Responses 작성·실패/재시도를 연결했다. 원문에서 제거해도 인용 댓글 자체를 삭제하지 않는다.
- 내 하이라이트와 타인 강조 표시 설정은 별도다. 같은 원문/같은 범위 저장은 중복되지 않고 겹친 구간은 각각의 항목으로 유지한다. 삭제는 해당 항목만 지운다.
- Share는 선택된 article/version/start/end/text를 가지고 실제 공유를 하지 않는 초안 진입이다. 외부 공유 실행은 Goal47 담당이다. 미수록 더보기 항목을 원본처럼 만들지 않는다.

## 공식 자료와 플랫폼 경계

2026-11-19 [About highlights](https://help.medium.com/hc/en-us/articles/214406358-About-highlights)를 재조회했다. 원문의 강조 제거·인용 응답·Library 관리와 타인 강조 설정을 대조했다. 공식 서비스의 작성자/팔로워 노출·알림을 로컬 mock에서 구현한 것으로 표현하지 않는다.

[RN0.86 Text](https://reactnative.dev/docs/0.86/text), [TextInput](https://reactnative.dev/docs/0.86/textinput), 설치된 RN0.86.3 타입/Android 구현, [React DOM createPortal](https://react.dev/reference/react-dom/createPortal), [Selection](https://developer.mozilla.org/en-US/docs/Web/API/Selection), [Range 위치](https://developer.mozilla.org/en-US/docs/Web/API/Range/getBoundingClientRect)를 확인했다. 현재 React 공식 페이지는19.3 표시지만 설치된 React DOM19.2.3의 기존 portal API를 사용한다. 새 런타임 의존성은 추가하지 않았다. 누락된 react-dom 타입 패키지를 대신해 사용한 createPortal 함수의 구체적인 공개 타입만 선언했으며 any/타입 검사 억제로 처리하지 않았다.

native Text의 selectable은 선택 offset을 반환하지 않는다. 별도 Select a passage 입력에서 실제 onSelectionChange를 받아 Done으로 범위를 확정하는 adapter를 구현했다. iOS는 읽기 전용 입력, Android는 readOnly가 isEnabled=false로 전체 입력을 비활성화하는 로컬 구현을 확인해 선택을 허용하되 원문 편집 이벤트는 원래 값으로 복구하고 소프트 키보드를 열지 않도록 했다. 이 adapter의 Jest 합성 선택 이벤트와 JS/Hermes 검증은 실제 OS 선택 핸들/기기 동작의 증명이 아니다. 원본의 본문 위 즉시 native 메뉴와 별도 선택 입력의 UX 차이가 남는다.

Gummble 보완 검색은 Library 두 화면(`sc_a42fff…`, `sc_57f2…`, 앞 Goal에서 이미지 확인)과 설정 로그아웃 확인(`sc_2d1afd…`, 이번 이미지 확인)을 반환했다. 필요한 선택 더보기/강조 제거 UI는 확보하지 못했다. `sc_2d1afd…` 화면의 표시는4.263.185257이며 보관 version ID1419의 동일 제품 빌드 근거로 사용하지 않는다.

## 계약·수명·자체 정책

- 사용자별 provider 메모리에 저장하며 전체 reload/restart에서 초기화한다. A→B→A에서는 확정한 A 데이터가 유지되고 revision/source/기사 활성 상태 변경으로 선택·메뉴·초안 수명을 격리한다.
- articleId·본문 version·start/end·인용문·highlight ID·operation ID를 구분한다. 현재 version은 선택 가능 여부를 포함한 본문 블록의 정확한 직렬화 값이다. 해시 충돌을 가정하지 않고 실제 본문 변경과 미수록 경계 변경을 감지한다. 실제 백엔드의 버전 형식/저장 정책은 미확정이다.
- 미수록 문단·이미지 설명·구분선을 넘어선 범위를 거부한다. 연속한 본문 여러 문단은 두 줄바꿈을 포함한 정규 원문으로 저장한다. 원문이 달라진 과거 강조는 현재 본문에 재부착하지 않고 Library의 저장 인용은 보존한다.
- 대상별 절대 selected 명령과 사용자/operation 중복 방지, 직렬 쓰기, 조회 세대/version을 사용한다. 원문 복귀는 현재 사용자/revision 소유의 highlight ID로만 요청하며 실제 원문/버전/텍스트가 맞을 때 위치를 복원한다.
- 작성 중인 인용 응답 실패는 본문과 인용을 유지한다. 인용만으로 게시할 수 없고 별도 응답 본문이 필요하다. 인용 제거는 자체 보완이며 원래 하이라이트를 지우지 않는다.

## 1차 자체 검토와 수정

독립 검토자를 사용하지 않은 두 차례 자체 검토다. 구현 직후 코드·source 계약·실제 드래그/원문 복귀를 검토했다.

- 최초 inline Modal이 웹 드래그/스크롤을 가로챌 수 있어 웹 portal로 분리했다. 스크롤/resize에서 범위 위치를 다시 읽고 바깥 클릭/Escape로 선택을 끝낸다.
- 조회 중 쓰기 실패가 최초 조회까지 무효화해 loading을 남길 수 있어 읽기 무효화 시점을 성공 후로 옮겼다. 이전 조회 성공/실패, 중복 명령과 삭제 후 이전 완료를 검사했다.
- 저장 중 취소→새 범위를 선택하면 늦은 성공이 새 메뉴를 닫지 않도록 의도 세대를 추가했다. 원문 복귀 타이머 완료 기록도 실제 실행 시점으로 옮겼다.
- Android readOnly가 선택 자체를 비활성화하는 설치 코드 경로를 확인해 별도 입력 adapter를 보완했다. 실제 OS 검증은 남아 있다.

## 2차 자체 재검토와 추가 수정

1차 수정 후 계정 전환·긴/겹친 범위·원본 대조·실패 흐름을 새로 실행하고 검토했다.

- 선택한 구간이 같아도 스크롤로 bounds가 바뀌면 새 선택으로 처리하여 저장 후 메뉴가 남았다. 구간 식별과 위치 변화를 분리했다. 실제 3초 지연 저장 중60px 스크롤에서 메뉴 y186→126으로 이동하고 완료 후 닫힘을 확인했다.
- Library 목록 교체 때 수평 탭이 초기 위치로 돌아가 Highlighted 선택을 가렸다. 선택 탭 layout 위치로 다시 스크롤한다.
- 기존18px 본문이 공통20px 설정으로 덮였다. 기본 본문 크기를 매개변수로 받아 reference18/30px, 금융20/30px와 사용자 배율을 함께 유지한다. 원본 폰트 미확보에 따른 굵은 문단 줄바꿈 차이는 남는다.
- Highlight 로그인 목적을 bookmark와 구분하고, unmount 후 오류/성공 처리와 원문 anchor 재시도 수명을 점검했다. 같은 A 재로그인의 메뉴/초안 격리와 확정 데이터 유지가 동작한다.

## 실제 실행 결과

모든 명령은 FE에서 Node24.18.0/npm10.9.0 PATH로 실행했다. 임시 도구 경로는 `/tmp/kostolany-goals25-35.4FQsD5/{tooling/node_modules/.bin,node-v24.18.0-darwin-arm64/bin}`이다.

- `npm run check`: 최종 `goal27-final-check.log`, 타입/lint·**118 suites/778 tests**,288.008초, iOS/Android Jest 두 프로젝트 모두 통과(논리389건을 플랫폼별 실행). 이전 Goal690/758 기록을 재사용하지 않았다.
- 신규 source/선택UI/실제 navigation 회귀6 suites/20 tests 통과. 늦은 조회 성공/실패, 삭제 실패/재시도, 중복 명령, 여러 문단·emoji offset·미수록 경계·본문 변경, A→B→A·same-A·새 선택 의도를 검사했다.
- 실제 navigation은 선택 입력 이벤트→저장 실패/재시도→Library→원문→인용 실패/재시도→강조 제거→빈 상태까지 연결한다. navigation 자체는 mock하지 않았으며 native 선택 이벤트만 합성이다.
- `npx expo export --platform ios --platform android --output-dir /tmp/kostolany-goals25-35.4FQsD5/goal27-export`: 양 플랫폼 JS/Hermes 성공, 최종 각 약2.6MB. 실제 native build/run이 아니다.
- `git diff --check` 통과. 새 의존성·lockfile·medium 원본 변경 없음.

8081/Chrome157,393×759 DPR1에서 실행한 독립 브라우저 기록:

| 기록 | 실제 확인 | 결과 |
| --- | --- | --- |
| goal27-browser | 실제 마우스 드래그→저장→Library→원문→인용 게시→제거→빈 상태,7캡처 | 완료·console/page 오류0 |
| goal27-faults | 최초 조회 실패/재시도, 저장 실패/선택 보존, 지연 중A→B→A | 3흐름 완료·오류0 |
| goal27-scroll-race | 지연 저장 중 스크롤/메뉴 위치·완료 닫힘 | 완료·오류0 |
| goal27-extra | guest 취소/성공 후 재실행, 여러 문단, 중복/겹침 개별 제거, 타인 강조 off,Dark/120%/Sans/320px,same-A·reload | 완료·오류0 |
| goal27-quote-remove-errors | 인용 게시 실패 시 인용·입력 보존/재시도, Library 제거 실패 시 행 보존/재시도 | 완료·오류0 |
| goal27-matched | 동일 기사/문구·Light100%·원본과 같은 첫 문단 및 toolbar 조건 | 완료·오류0 |

장애 재현용 highlightPreview/responsePreview는 모두 normal로 복원했다. 전역 새로고침 후 인증/내 하이라이트 초기화를 확인했다. 타인 강조 off는 내 강조·인용 댓글을 지우지 않는다.

## 원본 시각 대조와 잔여

원본1179×2556을393×852로 정규화하고 상단59/하단34px OS 영역을 제외해393×759 web과 나란히 비교했다. 실제 기기 DPR/OS 조건 일치의 증명은 아니다. 최종18px 변경 후 선택/저장/인용 초안/인용 게시/Library5쌍을 다시 생성하고 직접 확인했다.

- 선택 문구는 원본의 “This … public eye at large”와 동일하다. 최종 원문 복귀 강조 bounds x24/y290/폭344.328/높이81. 메뉴48px 높이/280px 폭, 화면 밖으로 나가지 않게 위치 제한. 실제 웹 선택 표시이며 native 핸들은 없다.
- 일반 문단18px/행간30px,좌우24px. 보관 원본과 Georgia 굵은 글꼴 폭이 달라 강조 문단이 원본3줄/구현4줄이며 뒤 문단과 메뉴의 수직 위치 차이가 남는다. 원본 font/vector 미확보를100% 일치로 보지 않는다.
- 인용 배경·테두리·본문은 실제 선택 텍스트다. web은 OS 키보드가 없어 원본보다 댓글 노출 영역이 크다. 정렬/작성자 mock 이름/실제7→8 root댓글 수는834 정적 수와 다르다. 원본 시각 비교에서 데이터 차이와 키보드 차이를 분리한다.
- Library는 원본의 여러 독자 저장 예시 대신 현재 사용자가 직접 저장한 구간을 보여준다. Remove highlight는 미수록 관리 동작을 위한 자체 보완 버튼이다. Digest New 배지·탭 간격 등은34에서 다시 다룬다.
- web 포커스/닫기/스크롤·작은 폭·큰 기사 글자·Dark는 확인했다. 실제 OS 접근성 글자·Safe Area·한국어 IME·native 선택 핸들·키보드 가림은 미검증이다.

현재 macOS에는 CommandLineTools만 있고 full Xcode/Simulator,Android SDK/adb/emulator가 없어 실제 iOS·Android build/run은 수행하지 못했다. Java23만으로 Android 실행을 주장하지 않는다. 필요한 환경을 갖춘 뒤 native adapter와 터치/선택/IME를 검증해야 한다.

## 8081 최종 확인 순서와 후속

1. Profile에서 모의 A 로그인, Home 추가 기사에서 ChatGPT Is Poisoning Your Brain 열기.
2. 본문 문구를 드래그해 Highlight, 뒤로→Library→Highlighted에서 항목 열기, 해당 원문 위치 확인.
3. 저장 강조를 눌러 Respond, 본문 입력 후 제출, Responses의 인용/댓글 수 확인. 취소와 실패 재시도에서도 입력 유지 확인.
4. 본문 메뉴 Remove highlight 또는 Library Remove highlight, 다른 강조/기존 인용 댓글 유지 확인.
5. 다른 구간·여러 문단·겹친 구간을 저장하고 개별 제거, 타인 강조 off·Dark·기사 글자 확대 확인.
6. A→B→A/same-A에서 개인 메뉴 초기화·확정 항목 격리 확인. 전체 reload 후 다시 로그인하면 메모리 데이터 초기화.

공유 실행47, Library의 나머지 탭31/32/34는 후속 담당이다. Goal28로 계속 진행한다. 결과·계약·검토는 이 문서와 highlights feature/실제 navigation 테스트에 남겼다. 캡처·비교·로그·일회성 스크립트는 저장소 밖 `/tmp/kostolany-goals25-35.4FQsD5/goal27-*`이며 임시 경로 삭제 시 사라진다.
