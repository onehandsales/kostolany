# Goal 25 — 기사 본문·누적 박수·읽음·상세 메뉴

2026-11-19 KST · macOS · 시작 HEAD `2e7aedd` · 시작 작업 트리 clean.

현재 상태: **구현 완료·검증 잔여**. 최신 사용자 요청은 Goal25→35의 순차 구현·두 차례 자체 검토·검증·결과 기록이다. 커밋/push/배포는 하지 않으며 Goal36은 시작하지 않는다. 아래 실행·검토 기록을 완료한 순서대로 갱신한다.

## 환경과 보존

- 기본 Node22.21.1/npm11.6.2, Homebrew Node24.10.0을 확인했다. `.nvmrc`의 Node24.18.0을 공식 배포에서 저장소 밖 임시 경로에 받아 공식 SHA256과 대조했고 npm10.9.0도 같은 임시 도구 경로에 준비했다. 프로젝트 의존성/lockfile/ENV는 변경하지 않았다.
- 시작 시 8081 listener 없음. 기존 `npm run web`으로 8081 Metro를 시작했다. Chrome/Playwright 검증 도구·Python/Pillow·명령 로그·이미지는 `/tmp/kostolany-goals25-35.4FQsD5`에 둔다.
- Xcode 전체 설치 없음: `xcode-select -p`는 CommandLineTools, `xcodebuild -version` 실패. adb/emulator 없음, Java23 있음. 실제 양 플랫폼 build/run·Safe Area·IME·스크린리더는 별도 검증 잔여다.
- medium 원본은 수정하지 않고 해시 목록을 외부 임시 경로에 보관했다. 원본에서 잘라낸 기사 내 이미지의 출처/crop은 `FE/assets/medium/SOURCES.json`에 기록한다.

## 범위·관찰·설계

- F16 기사 상단/본문/말미/관련 기사, F24 상세 메뉴·다크 본문, Sending claps의 +16/피드백 종료, 목록 Viewed가 대상이다. +16은 16회 입력이나 서버 증가량의 증거로 사용하지 않는다.
- [공식 About claps](https://help.medium.com/hc/en-us/articles/115011350967-About-claps)를 2026-11-19 재조회했다. 기사/목록별 최대50, Undo, 참여자 목록과 작성자별 수치 접근 구분을 확인했다. 미수록 참여자 UI는 자체 보완이며 실제 참여자 데이터는 없다.
- `reactions`가 target kind/id와 사용자별 개인 박수 수를 소유한다. 목표 수를 직렬 저장하고 이전 조회를 무효화하며 실패에서 확정값 복구/같은 목표 재시도를 제공한다. 계정별 mock 총수는 원본 기준값+자기 기여이며 실제 전체 사용자 집계가 아니다.
- Medium과 한국어 금융 예시의 카드/상세를 모두 누적 박수로 전환했다. `LikeSource` 주입은 `ClapSource`로 변경했고 인증·개인 행동 재실행·북마크·4단계 설명 정책은 유지한다. 기존 likes 모듈은 과거 단위 테스트에만 남으며 production navigation은 사용하지 않는다. 기사/목록은 target kind로 구분하며 댓글 반응은 Goal26에서 별도 정책을 연결한다.
- `reading-history`는 로그인 계정별 이력을 소유한다. 기사 로딩 성공 후 활성 route 진입을 기록 조건으로 택한 mock 정책이며 읽기 완료/체류시간 측정은 아니다. 비로그인은 기록하지 않고 개인 데이터는 전체 새로고침에서 초기화된다.
- 최초 조회 중 읽은 항목을 조회 결과와 병합하고 전체 목록 저장은 직렬화한다. 실패는 읽음 의도를 유지하고 명시적으로 재시도한다. 삭제/전체 삭제 UI는 Goal31 담당이다.
- F24/09의 확인된 발췌와 삽입 이미지 일부를 추가하며 미수록 문단은 계속 표시한다. 관련 기사 두 개는 안정 ID로 카탈로그/검색/저장/상세 이동에 연결한다.
- 상세 메뉴 Show less/Follow/Mute/Report 진입은 준비하고 실제 처리는 이번 연속 범위의 Goal28/29/31에서 연결한다. Display는 Goal24 계약을 유지하고 Undo claps를 추가한다.

## 두 차례 자체 검토와 수정

독립 검토자를 사용하지 않았다. 아래는 동일 작업자의 서로 다른 시점/대상을 기준으로 수행한 자체 검토다.

### 1차 — 상태 계약·사용처·실패 검토

- 새 store의 조회 세대·직렬 명령·절대 개인 목표 수·실패 롤백·최신 의도를 검토했다. 새 store가 같은 mock source에 붙을 때 숫자 command ID가 충돌할 수 있어 store별 scope를 포함한 문자열 ID로 수정했다. Undo 뒤 오래된 중복 명령은 현재 값을 반환하며 상태를 되살리지 않는다.
- Medium만 누적 박수로 바꿨을 때 금융 카드/상세의 boolean 반응이 남는 문제를 발견했다. 실제 모든 사용처를 `rg`로 추적해 AppNavigator 주입·카드·상세·개인 기능 안내와 navigation 테스트를 누적 박수 계약으로 전환했다.
- `ClapControl`은 source/계정/revision/target별 key로 임시 피드백·참여자 시트를 격리한다. 늦은 A 응답은 A store에만 반영되며 B 화면이나 같은 A 재로그인의 시트/오류 초안을 복원하지 않는다.
- 최초 이력 조회 중 새 진입을 병합하고 후속 저장을 직렬화했다. 읽음 실패는 해당 화면의 재시도에 연결하며 article/list/clap 삭제 등 다른 데이터 명령은 호출하지 않는다.
- 중간 lint의 미사용 import를 제거했다. 중간 전체 검사는 반응 계약 전환 중 중단했으므로 최종 통과 근거로 사용하지 않았다.

### 2차 — 실제 navigation·원본 화면·전체 회귀 재검토

- 실제 AppNavigator 테스트에서 기사→관련 기사→원래 기사→홈 복귀와 같은 ID의 박수/Viewed를 확인했다. navigation을 mock으로 치환하지 않았다.
- 실제 Chrome에서 guest 로그인 닫기·로그인 후 재실행, 16회 누적/피드백 종료/Undo, 50 상한, A→B→A, 목록 Viewed, 금융 기사 박수/4단계 설명, reload 초기화를 확인했다.
- 원본 대조에서 상세 메뉴 글자/그룹 구분과 스크롤 시 상하 도구 표시 차이를 수정했다. 스크롤 방향 임계값은 자체 보완이다.
- RN Web의 원본 이미지 intrinsic 높이 때문에 삽입 이미지 위아래에 큰 빈 공간이 생기는 문제를 재현했다. 화면 폭과 원본 aspect ratio로 실제 높이를 지정했고 다크120% 본문을 재캡처해 공간 제거를 확인했다.
- 변경한 source 검증·사용처를 다시 읽고 source 교체/실패 후 재시도/같은 계정 revision 테스트를 실행했다. 남은 font/vector·줄바꿈·원본 미수록 메뉴 차이는 아래에 유지한다.

## 실행 결과

실행 경로 `FE`, Node24.18.0/npm10.9.0. npm/Node의 임시 bin 경로를 PATH 앞에 지정했다.

| 검사 | 실행·결과 |
| --- | --- |
| 핵심 navigation 회귀 | `npm test -- <인증·프로필·목록·박수 navigation 5파일>`: 10 suites/64 tests 통과. 논리32건×양 플랫폼. |
| 2차 UI·상태 격리 | `npm test -- ClapControl ReferenceArticleView ClapHistoryNavigation`: 6 suites/16 tests 통과. source 교체의 늦은 성공/실패·같은 A revision·read/write 실패 재시도 포함. |
| 현재 전체 검사 | `npm run check`: 타입/lint·106 suites/728 tests 통과, 논리364건×양 플랫폼, 260.073초. 이후 삽입 이미지 캡션 크기만 보정했고 타입/lint 재통과·실제 캡처로 확인했다. |
| JS/Hermes | `npm exec -- expo export --platform ios --platform android --output-dir /tmp/kostolany-goals25-35.4FQsD5/goal25-export`: 양 플랫폼 2.5MB hbc 생성 성공. 실제 native build/run은 아니다. |
| 실제 브라우저 | Chrome157.0.8103.79, 393×759/DPR1 및320×759. normal 흐름12장·계정/상한/목록/금융6장, read-error/write-error/slow 3시나리오5장. 모두 page/console error0. 실패 후 Retry와4초 지연 중2회→Undo→2회 최종 의도 보존 확인. scenario는finally에서normal 복원. |
| native | 전체 Xcode·simulator 없음, adb/emulator 없음. Java23만으로 Android build/run을 완료할 수 없다. 실제 IME/Safe Area/접근성·OS 큰 글자는 미검증. |

새 테스트는 `createClapStore`, `ClapControl`, `createReadingHistoryStore`, `ClapHistoryNavigation`에 둔다. 기존 인증·목록·프로필·설정·카탈로그 테스트는 바뀐 반응 계약으로 수정했다. 테스트 수 증가는 플랫폼 중복과 논리 사례를 구분한다.

## 원본 대조·측정·남은 차이

- 기준은 보관 iOS version1419 PNG1179×2556을393×852로 정규화한 뒤 top59/bottom34를 제외한393×759다. Chrome 기본 zoom/DPR1로 비교했으며 실제 iPhone DPR 또는 Safe Area 증거가 아니다.
- F38/02 `sc_0629a27b99a645cabe6e110b5d3d3d57`: +16 피드백/종료를 실제16회 입력으로 재현했다. 원본의 +16이16회 입력이었다고 단정하지 않는다. 본문/반응 글꼴·수작업 clap vector는 여전히 다르다.
- F24/02 `sc_d62e32234117483b85b4c73ed63249cd`: popup x135/width250/right8/top44를 맞췄다. 최소48 touch와 그룹 divider8로 원본의 약44행보다 커진다. 내 박수가 있는 상태의 Undo 추가행은 현재 공식 설명을 보완한 UI로 원본5행 캡처에 없는 상태다. 원본과 같은 무반응 상태에서5행으로 비교해야 한다.
- F24/09 `sc_d1d05d6500f349d89c5a3e5646ff238b`: 발췌2문단/삽입 이미지/설명을 직접 확인해 추가했다. 본문 x24/width345, image1035×393→345×131을 유지했다. 120% 글자는24/행간36이지만 대체 Georgia의 줄바꿈 차이로 이미지 시작점이 원본보다 약27px 아래다. 삽입 이미지 캡션은 별도18/26으로 보정했고 폰트 폭/줄바꿈은 잔여다. 전체 미수록 본문은 만들어 넣지 않는다.
- 관련 두 기사는 관찰된 제목/표지/메타데이터만 카탈로그와 연결하며 미수록 본문은 명시한다. 유료 배지는 실제 결제/접근 권한 검증을 뜻하지 않는다.
- Gummble 읽기 전용 재조회(2026-11-19, `Medium story claps readers list Undo claps`)는 관련 Library 화면4개를 반환했다. 직접 확인한 `sc_57f2...`, `sc_a42f...`, `sc_ddd5...`는 참가자/Undo 펼친 UI가 아니었다. 서로 다른 Library 버전이 섞이며 반환 메타데이터만으로1419로 확정하지 않는다. 참가자 전체 데이터/원본 UI는 미확보다. 현재 내 기여만 보여주며 타인 참여자를 만들지 않았다.
- 비교 이미지·실제 캡처·로그·일회성 검증 스크립트는 `/tmp/kostolany-goals25-35.4FQsD5`에만 있다. 임시 파일은 영구 보존을 보장하지 않는다. medium 원본·ENV·lockfile에는 변경이 없다.

## 8081 최종 확인 순서

1. Explore→검색→`ChatGPT Is Poisoning`→기사, guest 박수에서 로그인 닫기→재진입→모의 A 로그인→직접 박수 재실행.
2. 연속 박수→수치/피드백→숫자 눌러 내 기여→Undo. 50회에서 추가 입력 비활성 확인. Story options→Undo도 확인.
3. Display→120%·Dark→본문 발췌/이미지→관련 `Behold...The Prompt Bible is Here`→뒤로→기존 본문/설정 확인.
4. 북마크→Reading list 저장→검색 복귀 Viewed→Library→Reading list→같은 기사 재진입.
5. Profile→로그아웃→B 로그인→같은 기사 내 박수0→A 재로그인→A 기여 유지. 금융 기사 `금리가 오르면`의 박수·Undo·4단계 설명 확인.
6. 전체 reload→로그아웃/메모리 개인 데이터 초기화 확인. 임시 failure scenario는 정상값으로 복원한 후 재확인.

## 후속 연결과 검증 잔여

- Goal26은 정적 Responses 수·내용·작성·답글을 실제 상태로 연결한다. Goal27은 내 highlight, Goal28은 Follow/작가, Goal29는 Mute/Report, Goal30은 토픽, Goal31은 Show less/이력 삭제, Goal32는 공개 목록 박수를 담당한다. 이들 진입만으로 Goal25에서 기능 완료를 주장하지 않는다.
- Goal45 Listen, Goal47 Share, Goal48 멤버십 실제 기능은 이번25~35 범위 밖이다.
- 원본 폰트/vector·미수록 본문/참여자 UI·전체 화면 시각 동등성 및 실제 native 검증은 잔여다. 완료 후에도 상태는 **구현 완료·검증 잔여**로 유지한다.
- Goal25 구현/두 자체 검토/자동 검사/브라우저 조작을 마쳤다. Goal26부터35까지 순서대로 이어간다. Goal36·커밋/push/배포는 시작하지 않는다.
