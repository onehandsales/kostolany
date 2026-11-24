# Parity 13 — 공유 보완·검증 결과

2026-11-24 KST. 시작 HEAD/main `1ac2baf0f75aef555e2194335cfc65f23e26be9f`, origin/main과 같았고 staged/unstaged/untracked 변경은 없었다.
직접 범위는 V23, 4화면·5단계·32 R·6 U·18 C다.
공유의 독립 가능한 mock/web 연결을 보완했다. 원본 자산·정확한 배치, 원본 미확인, 실제 OS 공유/사진 저장은 남아 있으므로 **묶음13 전체 동일성 완료가 아니다.**
[실행 계획](MEDIUM_PARITY/EXECUTION_PLAN.md#batch-13) · [보완 목록](FE_MEDIUM_PARITY_BACKLOG.md#v23) · [비교 기준](MEDIUM_PARITY/COMPARISON_BASELINE.md)

| 판정 | 최종 상태 |
| --- | --- |
| 기능 | mock/web 공유 연결·권한·표시 결함 수정, 두 차례 자기 검토와 커밋 전 추가2건 수정·재검토 수행 |
| 자동 검사 | 추가 검토 후 타입/lint·전체316 suites/1708 tests 통과, 이번 act 경고0. 최초1706 tests/경고1건 이력은7절, 현재 결과는13절 |
| 시각 비교 | 원본4화면과 실제 웹 부분 대조. 자산/정확 배치·미확인 잔여로 전체 동일성 미완료 |
| native | JS/Hermes 검사 통과. 실제 기기 빌드/공유/사진 저장은 환경 부재로 미실행 |

<a id="scope"></a>

## 1. 작업 기준과 선행 상태

AGENT/README, PROJECT_SCOPE, 공통 ENGINEERING_RULES/QUALITY_AND_WORKFLOW, UXUI/Medium 원본 지침과 FRONT_AGENT README·ARCHITECTURE·CODE_CONVENTIONS·STATE_AND_DATA·MOBILE_UI_AND_PLATFORM·PERFORMANCE_AND_SECURITY·TESTING_AND_DELIVERY를 확인했다.
RNTL14 비동기 이벤트를 await하고 실제 SessionNavigation을 사용했다. 같은 작업자의 두 차례 자기 검토이며 독립 리뷰는 아니다.

선행2의 공통 서체/48px/테마/자체 UI, 7의 목록·비공개·소유권, 10의 기사/응답/발행 접근, 11의 선택 UTF-16/version 계약을 현재 코드와 대조했다.
9~12의 추가·커밋 전 검토까지 확인했다. Git에는 9 추가 `12e0928`, 10 `79cc8ed`, 11 `9d44e3f`, 12 `1ac2baf`가 존재한다. 이전 문서의 미착수/미커밋은 당시 이력이다.
9의 편집기·자산, 10의 기사/응답·fixture, 11의 native 다중 문단/플로팅/배치, 12의 오디오·발행 Listen 지원·시각 잔여는 원래 담당에 유지한다.
이번13 진행은 9~12 전체 종료 승인이나 잔여 이전이 아니다. 14는 시작하지 않았다.

현재 환경은 macOS14.2 arm64, 프로젝트 Node24.18.0이다. 기본 PATH의 Node22.21.1 대신 `fnm exec --using=24.18.0`을 사용했다.
시작 시8081 리스너가 없어 기존 `npm run web`으로 Expo 미리보기를 시작했다. 과거 Windows/PID29280을 현재 서버로 취급하지 않았다.
Document Control 연결 세션은0이었고 이번 권한/환경에서 로컬 Chrome158 headless/CDP를 사용했다. 과거 실행 차단이 현재에도 존재한다고 가정하지 않았다.
ENV·medium·의존성·과거 이력을 변경하지 않았다. 커밋·push·배포하지 않았다.

<a id="source-review"></a>

## 2. 원본 관찰과 비교 조건

F39 [Sharing a story/ANALYSIS](<../medium/flows/Home/Story detail/Sharing a story/ANALYSIS.md>), F40 [Downloading an image/ANALYSIS](<../medium/flows/Home/Story detail/Sharing a story/Downloading an image/ANALYSIS.md>)와 실제 원본4장, 진입 기사 S037을 직접 열었다.
S028은 두 흐름에 연결된 동일 원본이다. 별도 성공 실행 두 번으로 세지 않는다.
원본 PNG1179×2556 물리px와 보관390×844 메타데이터, 이번 브라우저 CSS viewport320/393×852·DSF1은 서로 다른 정보다. 원본 DPR/기기/계정을 확정하지 않았다.
계정은 비로그인 기사 및 예시 A 목록, 기본 brain fixture, Light/Dark, 기본 글자와 CSS120% 확대를 각각 확인했다. 시계 고정이 필요한 상대 시간 화면의 완료로 확대하지 않는다.
메모리 화면 열람과 제품 PNG 열람만 수행했다. 비교 캡처/로그/manifest 파일은 없다.

원본에서 관찰한 것은 카드·10개 점·행동 순서와 `Link copied`, `Image saved to library` 안내다.
실제 클립보드 문자열·Friend 발급·OS 전송 결과·앨범 파일·사진 권한·추가 스타일의 동작은 원본에 없다.
기본 카드의 `5 min read`, 제목·부제·Jordan 사진/이름·Medium 워드마크는 기존 fixture와 자산을 소비한다.
회전 주소의 원본은 `medium.com/@jordan_gibbs`, 현재는 `kostolany.invalid`다. 실제 Medium 링크처럼 바꾸지 않았다.
배경은 기존 SVG gradient 근사, 글꼴과 아이콘은 대체 자산이다. 원본 blur/벡터/폰트 파일을 확보했다고 기록하지 않는다.

<a id="screen-status"></a>

## 3. 화면별 R/T 처리

| 화면·R 전체 | 단계 | 구현·이번 확인 | 남은 차이 |
| --- | --- | --- | --- |
| S163: R-S163-L/D/S/C01~C04/V,8개 | T-F39-02 | 진입/닫기·카드·점·Copy→Friend→Share via→Save 순서. 가로 스크롤 후 Save 전체 노출, 48px 이상 조작. 읽기 시간은 유효 양수만 표시 | blur/폰트/벡터·회전 주소·OS 상단 영역·정확한 간격.10팔레트/이전·다음 버튼은 자체 구현 |
| S051: R-S051-L/D/S/C01~C06,9개 | T-F39-03 | 실제 web clipboard 읽기로 brain URL 확인. 권한 거절 때 오류/재시도, 성공 뒤에만 Link copied. 선택 스타일·닫기·페이지 상태 확인 | 원본 clipboard URL/수명 미확인. 토스트의 정확 위치/크기와 native 복사는 별도 |
| S028: R-S028-L/D/S/C01~C03,6개 | T-F39-04, T-F40-01 | 같은 카드에서 행동 가로 이동. Friend 모의 자격, Share via 반환/취소/실패/미지원, Save 생성/재시도 | 원본 Friend/외부 시트의 실행 결과 미수록; OS 결과 대기 |
| S073: R-S073-L/D/S/C01~C06,9개 | T-F40-02 | 실제 카드 PNG 생성·브라우저 다운로드 요청, 실패 후 재시도·중복/늦은 이미지 정리 자동 검사 | 웹은 Image download started. 디스크 완료/사진 보관함은 미검증. 원본 Image saved to library를 웹 성공처럼 표시하지 않음 |

각 화면의 직접 C 연결은 C23/61/62/63/64다. U-S와 해당 U-F는6절에 남긴다.
R 원문·ID·과거 증거·readiness는 수정/승격하지 않았고 새 실행 판정은 별도 `parity13Review`로 연결했다.

<a id="implementation"></a>

## 4. 구현·대상·수명 정책

| 대상 | URL·지원 | 접근/수명 |
| --- | --- | --- |
| 일반/원본/정책 기사 | `/article/{기사ID}` | source·화면 focus·차단/조회 상태를 확인. 미확인 읽기 시간을 만들지 않음 |
| 인용 | `/article/{기사ID}#quote-{start}-{end}` | PassageReader가 문서 version·UTF-16 선택과 resolvePassage를 검사. URL은 안정적 mock 주소이며 본문 version을 고정한 외부 링크가 아님 |
| 작성자/Publication | `/writer/{ID}`, `/publication/{ID}` | 카탈로그/최신 프로필 소비. 작성자 차단/관계 조회 미완료·실패 때 공유 실행 불가. route/auth/source 변경은 기존 시트를 폐기 |
| 토픽 | `/topic/{ID}` | 실제 navigation focus와 topic source 데이터 수명에 연결 |
| 공개/내 목록 | `/list/{ID}` | 최신 제목·설명·공개 범위를 소비. 기본 Reading list/비공개는 아이콘 유지, 카드/실행은 거절. 삭제·접근 철회는 이전 요청을 폐기 |
| 발행 글 | `/written/{발행ID}` | 일반 기사 카탈로그의 published ID와 구분. 작성 source revision·문서/권한 재조회·auth revision을 소비. Unlisted 모의 링크 지원; 제목/작성자/공개 범위 최신화 |
| 오디오 공유 | 현재 플레이어의 기사 대상 | 기존 플레이어 scope/기사 수명을 소비. 새 오디오 지원이나 발행 Listen을 구현하지 않음 |

모든 URL은 `https://kostolany.invalid`이며 외부 공개 서비스가 아니다. ID는 encodeURIComponent로 인코딩한다.
발행 글의 본문 선택/인용·Highlight는 기존 Q11 미지원 판정을 유지한다. 공유13에서11의 다중 문단 native 문제를 해결했다고 기록하지 않는다.
카드 Save image는 선택 카드만 캡처하며 기사 원본 사진·목록 다운로드 사본을 저장하는 기능이 아니다.
누락/0/음수/비유한 읽기 시간은 숫자로 표시하지 않고 Story/Reading list 등의 대상 설명을 사용한다.
사진이 없거나 로딩 실패하면 기존 이름 이니셜을 사용한다. 새 사진·이름·본문을 생성하지 않았다.

Friend Link 버튼은 기사/인용/발행 대상에 존재한다. 무료 글은 일반 Copy link로 안내한다.
회원용 글은 로그인한 소유자 또는 현재 Friend 자격에서 `?preview=friend` 모의 링크를 복사한다. 실제 발급/토큰/접근 우회가 아니다.
자격 변경은 공유 요청·카드 수명을 새로 시작하지만 공유에서 진입한 구독 성공/Welcome 화면은 유지한다.
구독 화면 소유권을 공유 요청과 분리해 기존 구매 흐름 회귀를 수정했다.

공유 요청은 adapter·auth 사용자/revision·source·대상 데이터·접근/자격·화면 focus에 묶인다.
공유창 닫기·경계 변경은 AbortSignal로 이전 UI 성공/실패를 버린다. 이미 완료된 OS 클립보드/사진 저장을 되돌리지는 못한다.
이미지 생성/저장 중 다른 실행과 스타일 변경은 잠근다. 실패는 같은 선택으로 재시도한다.
늦게 생성된 이미지와 사용 후 이미지는 release하며, 정리 실패를 외부 저장 실패로 바꾸지 않는다.
웹에서는 data URI이고 releaseCapture는 라이브러리의 no-op이다. 객체 URL이나 임시 파일을 새로 생성하지 않는다.

<a id="findings"></a>

## 5. 결함과 두 차례 자기 검토

| 재현·원인 | 수정 | 확인 |
| --- | --- | --- |
| 토픽/기사의 열린 공유 중 다른 경로 진입 후 복귀: focus를 공유 수명에 연결하지 않아 이전 시트/응답이 남음 | useShareDialog에 active 적용, 실제 FocusedTopic 연결 및 기사/공개 목록/프로필/발행 소비자 확인 | 실제 navigator의 토픽→토픽, 기사→작성자 이탈 회귀. navigation을 mock하지 않음 |
| 열린 목록 공유 중 목록 이름/설명 갱신: 진입 snapshot을 계속 사용 | 현재 목록/발행 데이터로 표시값과 접근을 다시 계산 | 실제 공개 목록 제목 갱신→이전 copy abort→비공개→복원 회귀 |
| 사진 권한 설정 요청의 늦은 실패가 새 저장 성공 뒤 오류 표시 | 설정 시도 번호와 새 실행 수명 연결 | red→green 회귀 |
| 아바타 load가 카드 layout보다 먼저 도착하면 Save 활성 | 유효 폭/높이와 이미지 load/fallback이 모두 준비돼야 활성 | A→B→A·사진 실패·layout 전 비활성 회귀 |
| Friend 자격 철회 중 이전 copy가 성공 안내 | 자격 변경에서 공유 요청 수명 폐기 | 제어된 MembershipSource 철회 회귀 |
| 위 자격 key의 첫 수정이 공유 안 구독 성공 화면까지 unmount | 구독 패널과 공유 요청의 수명 분리 | 전체 iOS 검사에서 발견한 MembershipNavigation 실패 수정; 기존 통합 기대를 유지해 재검사 |
| 작성자 공유 중 차단 확정에 접근 검사 없음 | 관계 조회/차단 상태를 SharePanel available에 연결 | 실제 ModerationStore 차단→copy abort→카드 비노출 회귀 |
| 웹 Expo Clipboard의 legacy execCommand 대체가 false도 true로 반환할 수 있음 | 웹은 navigator.clipboard.writeText의 확정 성공만 인정. 부재는 unsupported, 거절은 copy 오류 | 브라우저 권한 deny에서 실제 오류, grant 후 재시도/clipboard 읽기 성공; web adapter 회귀 |
| 웹 늦은/유효하지 않은 캡처 출력이 소비자에게 오기 전 정리되지 않음 | adapter에서 반환 전 release | 늦은 PNG/invalid 출력/정상 PNG 소비자 정리 회귀 |
| 공유 닫기 뒤 포커스가 기사 제목으로만 이동 | 기존 useReturnFocus를 공유 진입에 연결 | 실제 브라우저 열기=공유 닫기, 닫기=Share story 버튼 포커스 |
| 확정 프로필에서 사진을 제거해도 공유 진입 snapshot의 이전 사진으로 대체 | 확정 사진 없음과 프로필 미조회를 구분. 사진 없음은 이니셜로 표시 | 실제 ProfileStore의 사진 제거 중 copy abort·이전 사진/늦은 성공 비노출 red→green 회귀 |

1차 검토는 직접 공유 UI/adapter·선행 계약과 모든 호출부를 대조해 focus·metadata·권한/이미지 준비·설정 요청을 수정했다.
2차 검토는 브라우저의 실제 clipboard/export, 전체 테스트의 기존 구독 연결, 원본/생성 이미지, 변경 diff·추적 문서 보존을 확인했다. 최종 사진 검토에서 삭제한 아바타의 이전 snapshot 재사용을 추가로 재현·수정했으며 이후 검사를 다시 실행했다.
외부 독립 리뷰나 다른 작업자의 승인을 받은 것으로 표현하지 않는다.

검증 도중 전역 Canvas.toDataURL을 실패시키자 html2canvas의 SVG 지원 탐지까지 실패해 이후 PNG 배경이 빠졌다.
이는 일반 실행 결과와 분리했다. 새로고침한 정상 실행에서는 SVG 배경이 포함됐고, 오류 주입을 출력 크기의 canvas에 한정하자 실패→재시도에서도 배경이 유지됐다.
그 탐색 과정의 DOM SVG 대체/폭 지정은 런타임에서만 수행하고 새로고침으로 복원했다. 해당 실험을 제품 코드 수정 성과로 계산하지 않는다.

<a id="contracts"></a>

## 6. C·U와 지원 경계

| C 계약 | 이번 소비·남은 범위 |
| --- | --- |
| C01/02/03 | 서체/카드/테마·48px·폭/큰 글자·focus. 실제 OS 글자 확대/IME/VoiceOver/TalkBack/Safe Area는 기기 대기 |
| C09/23/53 | 기사·작성자 메뉴·프로필/목록 공유 대상. 각 화면 전체 동일성 완료와 구분 |
| C36 | 목록 다운로드와 공유 카드 PNG는 별개. 다운로드 source/영속 offline 구현 변경 없음 |
| C58/59/60/61 | 플레이어의 기존 Share 호출/수명 소비. 속도/음성/오디오 전체 재구현 없음 |
| C62/63/64 | 직접 범위: 카드·복사·Friend·Share via·Save image·대상별 URL/권한 |
| C65/66/67 | 최신 모의 자격·구독 성공 복귀·설정 소비. 실제 결제/계정 연결 없음 |
| C71 | native adapter 정적/모의 경계 검사. 실제 OS 공유·권한·사진 파일 검증은13과 Q07/21 소유 |

| U | 현재 판정·종료 조건 |
| --- | --- |
| U-S028 | 사진 권한·저장 형식 원본 미확인. 원본 자료/범위 결정 필요; 현재 PNG는 자체 web 계약 |
| U-S051 | 원본 clipboard URL/유효기간 미확인. mock URL 검증으로 닫지 않음 |
| U-S073 | 실제 보관함 파일/해상도/권한 거절 미확인. 원본 근거와 별도 OS 저장 확인 필요 |
| U-S163 | Friend 자격/발급·외부 전달 원본 미확인. 자체 mock 자격과 분리 |
| U-F39 | 미수록 스타일·Friend 거절·OS 공유/취소 결과 미확인.10개 팔레트를 원본 재현으로 확정하지 않음 |
| U-F40 | 허용/거절/저장 실패·파일 형식/해상도 원본 미확인. 원본 성공 토스트로 파일 저장 완료를 추정하지 않음 |

U는13/Q03 담당으로 열어 둔다. 실제 앱의 OS 실행 확인은 Q07/21과 공동 담당이며 원본 미확인을 해소하는 증거와는 별개다.

<a id="validation"></a>

## 7. 이번 검사와 실패·재실행

FE에서 Node24.18.0으로 실행했다. skip 추가, timeout 증가, 기대값 약화, 의존성 변경은 없다.
전체 검사는 `node --expose-gc node_modules/jest/bin/jest.js --runInBand --selectProjects iOS|Android --json`을 각 새 프로세스로 실행한다.
macOS `caffeinate -i`는 검사 중 절전 방지에만 사용한다. stdout/stderr/JSON은 메모리에 수집하며 로그 파일은 만들지 않는다.

| 검사 | 이번 실행 결과 |
| --- | --- |
| 타입/lint | 최초 타입 통과·lint set-state-in-effect1건 실패. 자격 수명 구조 수정 뒤 통과. 최종 사진 제거 수정 뒤 typecheck/lint도 각각 종료0 |
| 토픽/설정 요청 red→green | iOS2 tests 실패 → 동일2 tests 통과(4.991초); 필터 밖12건은 해당 실행 미실행 |
| 이미지 준비/Friend 철회 red | iOS2 tests 실패, 필터 밖8건 미실행. 수정 후 관련 검사에 포함 |
| 공유4파일 관련 검사 |8 suites/40 tests 통과,15.466초 |
| web adapter/ShareSheet |4 suites/26 tests 통과,3.619초(후속 웹 copy 회귀 추가 전) |
| 공개 목록 navigation 추가 |2 tests는 제목 중복 query로 실패,10 통과. 공유 카드 안으로 query 범위를 정확히 제한 후12 tests 통과,9.82초 |
| 기사 이탈/작성자 차단 |4 suites/22 tests 통과,11.519초 |
| 첫 전체 iOS |158 suites 중157 통과;852 tests 중851 통과/1실패,228.256초. MembershipNavigation의 구독 성공 화면 회귀이며 시간초과가 아님. act 경고0 |
| 위 회귀 수정 후 관련 검사 |6 suites/34 tests 통과,7.612초. 기존 MembershipNavigation 기대 유지 |
| 구독 회귀 수정 후 전체 | iOS158 suites/852 tests 통과222.090초, Android158 suites/852 tests 통과231.392초. 실패/skip/act 경고0. 아래 사진 수정 전 실행 |
| 확정 사진 제거 red | iOS1 test 실패,1.594초. 필터 밖10건은 미실행. 제거한 사진이 실제로 남는 것을 재현 |
| 사진 수정 후 관련 검사 |4 suites/28 tests 통과,17.441초. ShareSheet/MembershipNavigation을 양 플랫폼 설정에서 재검사 |
| 최종 전체 iOS |158 suites/853 tests 통과,222.225초. 실패/skip0. act 경고1건을 성공 수치와 별도로 남김 |
| 최종 전체 Android |158 suites/853 tests 통과,223.633초. 실패/skip/act 경고0. 최종 양 플랫폼 합계316 suites/1706 tests 통과 |
| JS 구문 | 현재8081의 production 설정 Metro 번들을 메모리에서 받아 vm.Script 파싱. web4,783,764 / iOS5,898,144 / Android5,906,507 bytes, HTTP200·모두 통과 |
| Hermes | iOS/Android 번들을 hermesc -dump-bytecode -O0 -의 stdin으로 컴파일, stdout을 메모리에서 소비. 각 종료0·오류0. 바이트코드 텍스트36,210,512 /36,232,328 bytes. RN 전역 변수 관련 경고는 각각35개이며 실제 런타임 오류/기기 실행과 구분 |

이전9~12의 전체 시간초과/단독 통과·act 경고는 과거 이력으로 보존한다. 이번 전체 검사의 실패와 최종 재실행을 분리하며 단독 통과를 전체 통과로 바꾸지 않는다.
추가 테스트는 ShareSheet·SharingNavigation·ModerationDialogs와 새 shareAdapterWeb이다. 기존 native adapter/대상 URL/멤버십/발행/선택 테스트는 전체 검사의 소비 회귀다.

Hermes 출력 경로 시도도 구분한다. 첫 `-emit-binary -out=/dev/null`은 컴파일 뒤 atomic 임시 출력 파일을 /dev에 만들려다 종료6으로 실패했다. `-out=-` 재시도는 stdout이 아니라 FE/-에 바이너리를 생성했다. 이번 명령이 만든5,113,178바이트 파일만 즉시 제거했다. 이후 `-dump-bytecode`의 stdout 방식을 작은 입력으로 먼저 확인한 뒤 두 전체 번들에 적용했다. 빌드 산출물은 남기지 않았고 이 시도를 처음부터 파일 생성이 전혀 없었던 것으로 기록하지 않는다.

<a id="browser"></a>

## 8. 실제 브라우저 확인과 한계

- 8081 Home→기사 더 보기→brain→Share, 기본 카드/가로 행동 이동/스타일 변경/닫기·Escape·복귀를 직접 조작했다.
- 실제 clipboard `https://kostolany.invalid/article/medium-brain`, 권한 deny의 오류·grant 재시도를 확인했다. 처음 legacy fallback이 거절을 성공 처리하던 경로와 수정 후 결과를 구분했다.
- 실제 브라우저 포인터 드래그로 본문 선택→Share passage→Copy를 실행했다. 선택 카드의 실제 문구와 `#quote-0-74`, 공유 닫기 뒤 선택 메뉴 복귀를 확인했다. native OS 선택이 아니다.
- Jordan options→Share author→실제 clipboard `/writer/jordan`과 프로필/기사 복귀, Explore→Life 공유 `/topic/life`→Self Improvement→공개 목록 공유 `/list/public-morning-routine`→같은 토픽 복귀를 직접 확인했다.
- A 모의 로그인→새 공개 목록(60자 한국어 제목/긴 설명)→목록 공유→Save를 조작했다.320px/Dark/CSS120%에서 카드268×945 PNG 생성, 문구 가로 넘침0, 전체 카드 높이에 맞는 출력이었다. 기본393 카드341×533도 확인했다.
- Light/Dark·320/393에서 제목·작성자·회전 주소·워드마크·점·행동 영역을 확인했다. 닫기/스타일48×48, 행동108×76. 긴 카드는 세로 스크롤하며 Save는 가로 이동으로 노출한다.
- 정상 이미지와 선택 스타일 이미지의 텍스트·작성자·배경을 메모리에서 열람했다. 비교 스크린샷은 파일로 저장하지 않았다.
- 파일 생성을 막기 위해 브라우저 다운로드를 deny했다. PNG 생성과 `downloadWillBegin` 뒤 `downloadProgress:canceled`까지만 확인했다. 제품 안내는 Image download started. 디스크 완료/앨범 저장은 확인하지 않았다.
- Canvas 출력 실패 주입 후 오류/재시도를 확인했다. 실제 플랫폼 고장이 아닌 의도한 브라우저 경계 주입이다. Share API 부재/AbortError도 경계 대역으로 검사했고 복원했다.
- 실제 navigator.share는 headless 환경에서 OS 처리가 완료되지 않았다. 시트를 떠난 뒤 두 번째 요청은 InvalidStateError를 반환했다. 앱의 오류 처리와 외부 전달 완료는 다르며 실제 OS 시트/사용자 취소/수신 전달을 통과로 기록하지 않는다. 외부 사람/채널에 전송하지 않았다.
- 테스트 드라이버의 clipboard 읽기 권한 누락, HMR 뒤 경로 초기화, 중복 제목 query, 연결마다 viewport 설정이 필요한 점은 드라이버 조건으로 보정했다. 앱 오류나 성공 검증으로 혼합하지 않는다.
- 최종 새로고침→기사→공유→Copy→닫기를 다시 조작한 CDP Runtime/Log에서 console error·런타임 예외0, 닫기 뒤 Share story 포커스를 확인했다. 앞선 정상 기사/토픽/공개 목록 왕복에서도 런타임 예외0이었다. 드라이버 자체의 누락 label/clipboard 읽기 권한 오류와 분리한다. CSS 확대·CDP 입력은 실제 OS 글자 확대/한글 IME 검증이 아니다.

<a id="comparison"></a>

## 9. 시각·native·잔여 판정

| 분류·담당 | 남은 항목·영향 | 종료 조건 |
| --- | --- | --- |
| 기능·자동 검사13 | 해결 가능한 공유 수명/권한/복사 결함 수정; 최종 검사 결과는7절 | 현재 최종 검사와 결과 문서 일치 |
| 시각13/Q01/Q02 | SVG gradient와 원본 blur, 시스템 서체/워드마크/아이콘, 회전 주소, 토스트/OS 영역 간격. 부분 비교이며 픽셀 동일성 아님 | 원본 자산/조건 확보 후 해당4화면 재대조·보정.21로 이전하지 않음 |
| 자체 정책13/Q12 |10팔레트·스타일 이동 버튼·mock 링크 안내·미지원/실패/권한 안내·web 다운로드 토스트 | 자체 정책으로 유지/명시. 원본 관찰로 바꾸거나 비교를 위해 숨기지 않음 |
| 원본 미확인13/Q03 |6 U의 Friend/외부 전달/사진/추가 스타일 | 질문별 원본 근거 또는 명시적 범위 판정 |
| native13+Q07/21 | iOS 사진 권한/보관함/실제 share/Clipboard, Android 대응 동작·IME·접근성·Safe Area | Xcode/Simulator 또는 기기, Android SDK/adb와 기기·개발 빌드에서 실제 실행 |
| 제품 파일 저장13 | 브라우저 다운로드 요청은 확인, 실제 완성 파일 저장은 제한으로 미검증 | 파일 저장이 허용된 환경에서 생성물 열기/완료 확인. 토스트만으로 통과 금지 |
| 기존9~12 | 각 문서의 구현/시각/지원/원본 잔여 | 원래 담당 유지. 이번13의 테스트 통과로 닫지 않음 |
| 검사 안정성22/관련 suite | 최종 전체 iOS는 모두 통과했으나 act 경고1건. 앞선 전체 실행에서는0이었음. 현재 요약에서 발생 suite/stack은 분류하지 못함 | 상세 경고 위치를 확보해 비동기 갱신 경계를 검토. 경고0/전체 안정성 완료로 승격하지 않음 |

현재 xcode-select는 `/Library/Developer/CommandLineTools`다. `xcrun simctl`은 도구를 찾지 못하고 `xcodebuild -version`은 Xcode 필요 오류로 종료했다.
Android SDK 기본 경로와 adb가 없었다. JDK17/21/23/11은 있지만 SDK/기기를 대신하지 않는다.
따라서 실제 iOS/Android 빌드·실행은 수행하지 못했다. Jest의 두 프로젝트 설정, Metro JS/Hermes 검사와 구분한다.

<a id="tracking"></a>

## 10. 추적 문서와 파일 제한

실행 계획 상단·묶음13/V23, 관련 R/T/U/C의 추가 판정, 비교/자산/자체 정책, TODO/FE/AGENT 현재 상태를 수동 갱신했다.
comparisonBaseline.json은 기존 추적 문서이며 새 검증 manifest가 아니다. 이번13 리뷰와 현재 존재하는 입력 해시를 갱신했다.
새 shareAdapterWeb.test.ts를 codeInputs에 추가해 기존551개를552개로 갱신했다. 입력80개 중 기존 누락4개는 그대로이며, R1395·200화면·63흐름·273단계·263 U·72 C·22묶음 등록은 유지한다.
원본 요구·ID·image hash·과거 currentEvidence/evidenceContext/readiness는 보존한다. 원본/기기 동일성 완료로 승격하지 않는다.
자동 생성기는 실행하지 않았다. 템플릿/tools에 변경을 반영하지 않았으므로 향후 생성기가 수동 추가 판정을 덮지 않도록 구분해야 한다.
삭제된 과거 입력4개(EVIDENCE/PARITY_01/captures.json 및 tools/medium-parity의3파일)는 부재 그대로 유지한다.

tools·별도 검증 스크립트 폴더·evidence·비교 캡처·검증 로그·새 manifest를 생성/수정/복원하지 않았다.
브라우저 런타임 프로필/Metro·Jest 도구 캐시는 검증 산출물 파일과 구분한다. 제품 PNG도 메모리에서만 확인했다.7절의 임시 Hermes 바이너리1개는 생성 직후 제거했다.
새 로컬 링크24개/앵커 오류0, 원본/R/T/U/C 필드와 과거 증거/readiness의 의도하지 않은 변경0을 확인했다.
Chrome의 임시 권한/다운로드 차단/viewport를 복원하고 정상 Home으로 새로고침한 뒤 이번에 띄운 Chrome과 임시 프로필을 종료·제거했다.8081 Expo 미리보기는 유지한다.

변경 FE 파일은17개다. 공유5개(ShareCard, ShareSheet, ShareSheet.test, SharingProvider, shareAdapter.web)와 새 shareAdapterWeb.test, navigation2개, 기사2개, ReadingListScreen·PublicIdentityScreen·WrittenStoryActions·PublicListScreen·TopicScreen, ModerationDialogs와 해당 테스트다.
문서는 결과1개와 실행/추적/현재 상태19개이며, 총37개 변경 경로·금지 경로 변경0·staged 변경0과 diff --check 통과를 최종 확인했다.

<a id="reproduce"></a>

## 11. 8081 최종 확인 순서

1. http://localhost:8081 을 새로고침한다. 기본 mock 메모리 데이터로 시작한다.
2. Home의 기사 더 보기에서 ChatGPT Is Poisoning Your Brain...을 열고 하단 Share story를 누른다.
3. 제목/부제/5 min read/Jordan/Medium·회전 mock 주소·점 표시를 확인한다. 카드 또는 이동 버튼으로 스타일을 바꾼다.
4. Copy link 후 clipboard에서 `/article/medium-brain`을 확인한다. 브라우저 쓰기 권한 거절에서는 성공 안내 없이 오류가 나오며 허용 후 재시도한다.
5. 행동 영역을 가로 이동해 Save image를 누른다. 선택 카드 PNG가 생성된다. 파일 저장을 허용했다면 실제 파일까지 별도로 열어 확인한다. 이번 작업은 다운로드 요청까지만 확인했다.
6. Share via는 환경 지원/실제 OS 결과를 확인하되 실제 사람에게 전송하지 않는다. 취소에는 전달 완료 안내가 없어야 한다.
7. 닫기/Escape 후 원래 기사와 Share story 포커스를 확인한다. 본문 문구를 선택해 Share passage를 열고 quote 범위와 카드 문구·복귀를 확인한다.
8. 작성자 프로필의 options→Share author, Explore→Life→Self Improvement→공개 목록→Share에서 대상별 주소가 달라지는지 확인한다.
9. A 모의 로그인 후 Library에서 긴 한국어 공개 목록을 만들고 공유한다. 기본/비공개 목록은 아이콘과 실제 공유 권한이 별개임을 확인한다.
10. 무료/회원용 글의 Friend 안내, 모의 Friend 업그레이드의 성공/Welcome/복귀를 확인한다. 실제 Friend 발급이나 결제가 아니다.
11.320/393폭과 Light/Dark에서 가로 행동 이동·긴 카드 세로 스크롤·48px 조작·닫기/복귀를 확인한다.
12. 개발 도구로 적용한 권한/장애/글자 스타일은 복원하고 전체 새로고침한다. 원본/native/제품 파일 완료 미검증은 위 잔여로 유지한다.

<a id="next"></a>

## 12. 종료 경계

묶음13만 수행하며 최종 기능·자동 검사·시각·native 판정을 구분한다.9~12 전체 완료, 외부 공유 서비스/실제 MVP 출시 완료로 표현하지 않는다.
커밋·push·배포는 수행하지 않는다. 권장 커밋 메시지: `fix(fe): harden parity 13 sharing lifecycle and web export`.
묶음14는 이번 작업에 포함되지 않는다.


<a id="pre-commit-review"></a>

## 13. 커밋 전 추가 검토 — 2026-11-24 KST

사용자의 후속 요청으로 전체 변경과 공유 호출부·추적 문서를 다시 검토했다. 이번 요청은 수정·검증 후 묶음13 로컬 커밋을 승인하며 push·배포·묶음14 구현은 포함하지 않는다. 위 미커밋 문장은 최초 작업 종료 시점의 이력이다.
검토 시작 HEAD는1ac2baf였고 staged는 비어 있었다. 작업 중인37파일은 앞선 묶음13 변경이며 별도 사용자 변경은 관찰되지 않았다.

### 추가 발견과 수정

| 재현·원인 | 수정·회귀 확인 |
| --- | --- |
| clipboard API가 없는 환경에서 Copy link 실패 안내가 다시 Copy link를 권함. 미지원 안내를 행동별로 구분하지 않았음 | copy/Friend 복사는 링크 복사 미지원으로 안내하고 다른 공유 행동의 Copy link 대안과 분리. 기존 ShareSheet 실패·재시도 테스트에 양 분기를 추가 |
| Jordan 프로필 Lists→AAA AI 공유→복사 중 공개 목록 재조회 실패. 목록 화면은 오류를 보이지만 공유는 이전 snapshot을 계속 사용 | 공개 목록·디렉터리·관계 조회 상태를 공유 가능 조건에 포함. 실제 SessionNavigation에서 진행 요청 abort·카드/행동 차단·늦은 성공 폐기·목록 재시도 후 새 공유 성공 확인 |

최초 검토 뒤 두 결함을 테스트로 재현하고 수정했다. 재검토에서는 기사/인용/정책 기사/토픽/작성자/Publication/내 목록/공개 목록/발행/오디오 호출부의 focus·source·auth revision·접근권 연결과 구독 성공 화면 유지, 임시 이미지 정리, 기존 사진 제거 회귀를 다시 확인했다. 같은 작업자의 자기 검토이며 독립 리뷰가 아니다.
원본200화면·63흐름·273단계·263미확인·72계약의 기존 필드는 HEAD와 비교해 변경0이었다. 별도 parity13Review와 수동 실행 기록만 추가하며 원본/readiness/currentEvidence를 승격하지 않는다.

### 이번 실행 이력

- 첫 전체 검사 명령은 프로젝트 이름을 소문자 ios/android로 지정해 두 실행 모두 No tests found/종료1이었다. 실제 Jest displayName iOS/Android를 확인해 명령만 수정했으며 검사 설정은 변경하지 않았다.
- 이어 시작한 전체 검사는 위 추가 결함 수정이 필요해 중단했다. 완료된 전체 검사로 집계하지 않는다.
- 수정 전 iOS 표적2 tests가 각각 안내 문구와 abort 누락으로 실패했다. 필터 밖17건은 해당 실행 미실행이며 skip을 코드에 추가하지 않았다.
- 수정 후 관련5파일·양 플랫폼 검사는58 tests 통과/2실패였다. navigation 회귀는 통과했고 ShareSheet의 부분 문자열 기대가 RNTL의 기본 전체 문자열 비교와 맞지 않아 실패했다. 실제 전체 안내 문구를 정확히 기대하도록 보정했으며 제품 동작 기대를 약화하지 않았다.
- 최종 타입/lint 통과. 수정 후 전체 iOS158 suites/854 tests 통과(232.351초), 실패/미실행/act 경고0. 수정 후 전체 Android158 suites/854 tests 통과(225.906초), 실패/미실행/act 경고0. 합계316 suites/1708 tests 통과이며 추가한 navigation 회귀1건이 양 플랫폼에서 각각 실행되었다. 과거 act 경고1건은 이번에 재현되지 않았을 뿐 원인을 해결했다고 판정하지 않는다.

### 추가 실제 브라우저·플랫폼 확인

현재8081 PID22023을 유지했다. 연결 Document Control 세션은0이며 별도의 임시 Chrome headless/CDP로 직접 조작했다.
clipboard API 부재는 런타임 경계 주입으로 새 안내를 확인했고 즉시 복원했다. 실제 clipboard 복사는 /article/medium-brain과 /list/public-aaa-ai를 읽어 확인했다. 공유 닫기 뒤 Share story 포커스 복귀, Jordan→Lists→AAA AI→공유→닫기를 확인했다. 프로필 목록의 재조회 실패·복구는 위 실제 navigation Jest 검사이며 브라우저에서 재현했다고 기록하지 않는다.
320/393×852와 Light/Dark 각각 body 폭320/393, 카드 폭268/341, 닫기48×48을 확인했다. 두 확인 구간의 console error/런타임 예외는 각각0이었다. 첫 드라이버에서 이미 더 불러온 Home의 기사 더 보기 버튼을 찾지 못한 오류는 실제 표시된 기사 버튼으로 바로잡았으며 제품 오류로 세지 않는다.
현재 수정 후 web/iOS/Android production Metro 번들 HTTP200과 메모리 JS 구문 검사 통과:4,784,067 /5,898,447 /5,906,810 bytes. 이번 추가 검토에서 Hermes와 실제 native 빌드는 재실행하지 않았으며 앞선 Hermes 결과를 새 수정 후 결과로 대체하지 않는다.
브라우저 권한·런타임 변경 복원 후 Home 새로고침, 이번 Chrome만 종료하고 임시 프로필을 제거했다. 별도 도구/스크립트 폴더·evidence·비교 캡처·검증 로그·manifest를 생성하지 않았다. tools와 기존 삭제 상태도 보존했다.

### 잔여와 커밋 경계

원본 자산/서체/정확한 배치·6 U, 실제 OS 공유·사진 권한·앨범 저장 및 디스크 저장 완료는 앞선 판정대로 남는다. 이번 브라우저 확인은 이 잔여를 해소하지 않는다.9~12 잔여도 기존 담당에 유지한다.
다음 독립 범위는 실행 계획의 묶음14(V29·V30,16화면·19단계, 선행2)이며 이번에 시작하지 않는다.13 전체 동일성 완료와 로컬 변경 커밋을 구분한다.

최종 커밋 범위는37파일(FE 코드/테스트17·결과/추적 문서20)이다. 실행 계획과 관련 현재 상태 문서에 추가 검토를 연결하고 comparisonBaseline의 preCommitReview 및 존재하는 입력 해시를 수동 갱신했다. 자동 생성기와 누락된 tools/evidence 입력4개는 복원하지 않았다.
이번 사용자 승인에 따라 이 변경만 stage·최종 diff 확인 후 로컬 커밋하며 실제 성공/식별자는 Git 이력을 따른다. 커밋 메시지는 `fix(fe): harden parity 13 sharing lifecycle and web export`다. push·배포·묶음14 시작은 하지 않는다.
