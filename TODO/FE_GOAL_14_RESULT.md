# Goal 14 — FE 규칙 준수 검토·수정·재검토

작업일: 2026-11-19 KST. 시작 HEAD: `530476c`. 시작 작업 트리는 깨끗했다.

상태: **코드 수정·두 차례 자기 검토·자동/브라우저 검증 완료 / 실제 네이티브 검증 대기**.

사용자는 Goal 14~21을 연속 수행하도록 요청했다. 각 Goal의 검토·결과 기록은 유지하고, 이 Goal의 검사·로컬 커밋 뒤 Goal 15로 이어간다. 이번 단계에서 Medium 클론 디자인은 구현하지 않았다.

## 확인 범위와 규칙별 판정

AGENT 진입·공통 작업·제품·현재 상태·UX 문서, FRONT_AGENT README와 하위 6개, FE_GOALS·클론 계획을 확인했다. 실제 navigation·provider·store·hook·source·폼·공통 UI·설정·테스트를 대조했다. [파일 목록과 정적 검색 결과](evidence/goal14/static-inventory.json)는 수정 후 production 102개·test 40개이며, 이 목록 검사를 모든 줄의 정밀 검증 또는 네이티브 검증으로 표현하지 않는다.

| 규칙 | 검토한 경계와 판정 |
| --- | --- |
| 아키텍처 | app 조립→features→shared 방향, ID·callback 전달, 기능별 source/상태 소유권 확인. 역방향 import 검색 0건. 실제 화면으로 대체된 임시 화면 2개와 전용 설명 필드를 제거 |
| 명명·타입·주석 | HomeFeedScreen props 명칭과 공개 hook 반환 계약 보완. 직접 작성한 production 설명 주석을 한글 한 문장으로 정리. strict 유지, `any`·이중 단언·타입/lint 억제 추가 없음. 외부 패키지·기계 지시문은 수정하지 않음 |
| 상태·비동기 | 피드 공급부 교체 시 이전 결과 노출을 발견·수정. 개인 저장소의 사용자 격리·직렬 최신 목표·조회 세대·삭제 tombstone·수명과 기존 경합 테스트 대조 |
| 모바일 UI·플랫폼 | 검색 카드 큰 글자 세로 배치의 flex 축약 위험 수정. 기존 48 논리 단위 조작 영역·SafeArea·KeyboardAvoidingView·모달 닫기·이동 경계 검토. 실제 OS 글자 확대·키보드·스크린리더·제스처는 미검증 |
| 성능·보안 | feed/search/library FlatList, 유한 fixture 기사, 구독 정리·검색 타이머 cleanup, 로컬 메모리 개인 데이터 확인. 신규 통신·민감 로그·인증/영속 저장 추가 없음. 대규모/실기기 성능·실제 OAuth/보안 저장·배포 항목은 이번 범위에 해당하지 않거나 미검증 |
| 테스트·전달 | 회귀를 수정 전 재현하고 수정 후 검사. 실제 NavigationContainer·stack 테스트를 유지. 브라우저·Jest·JS/Hermes 번들·실제 native 결과를 구분하고 아래 증거를 새 실행으로 생성 |

검토 범위의 코드 수정 결과와 환경상 미검증을 분리했다. 체크리스트만으로 FE 전체가 모든 기기에서 완전히 준수한다고 선언하지 않는다. 과거 Goal 결과의 테스트 수를 이번 결과로 재사용하지 않았다.

## 1차 검토 — 발견 사항과 수정

| ID | 위치·재현·기대 동작 | 원인과 수정 | 확인 |
| --- | --- | --- | --- |
| R14-01 | `feed/useFeed.ts`: 기사 조회 후 source를 교체하거나 hook 정렬 A→B→A. 새 응답 전에는 새 범위의 로딩이어야 함 | 상태가 sort/source identity를 포함하지 않아 이전 기사·cursor·ready가 남음. 렌더부터 identity를 분리하고 새 범위로 초기화, 과거 범위의 갱신 거부 | 새 회귀 3개 × 양 Jest 환경: 수정 전 6건 실패, 수정 후 관련 50건 통과 |
| R14-02 | `search/SearchCard.tsx`: fontScale > 1.3의 세로 배치 | `flex: 0` 축약이 웹에서 제목 높이를 0으로 만들 수 있는 기존 홈 결함과 동일한 패턴. grow/shrink/basis를 명시해 내용 높이를 유지 | 정적 스타일·사용처 대조, 관련 검색 테스트, 작은 폭 웹 확인. 실제 fontScale > 1.3 네이티브 렌더는 미검증이며 CSS 확대와 혼동하지 않음 |
| R14-03 | 초기 article/feed/search/theme·진입점·테스트 설정의 설명 주석과 HomeFeed props | 영문 설명·여러 줄 설명을 한글 한 문장으로 정리, `HomeFeedScreenProps` 명칭, 조회/설명/검색/프로필 hook 반환 계약 명시 | production 설명 주석·억제 구문 검색, 타입/lint 검사 |
| R14-04 | `TabPlaceholderScreen`, 전용 `Screen`, tabs.description | 현 navigation에서 사용하지 않는 초기 화면이 남아 있음. 소비자 검색 후 해당 파일·필드만 제거 | import/사용처 검색, 타입 검사와 실제 탭/navigation 회귀 |
| R14-05 | FE README 검증 수와 파일 지도 | 앞 절 602건과 뒤 Goal 13 절 608건이 혼재하고 미사용 파일을 현재 구조로 소개 | 최신 검사 안내를 결과 문서 링크로 연결하고 삭제된 파일을 지도에서 제거 |

수정 전 로그: [feed-before.log](evidence/goal14/feed-before.log). 관련 검사: [feed-after.log](evidence/goal14/feed-after.log). 초기 브라우저 스크립트의 기사 제목 오타는 실제 fixture와 맞춰 수정했으며 앱 결함으로 계산하지 않았다.

## 2차 재검토

- R14-01의 source/sort 비교, 요청별 active cleanup, 같은 tick 중복 요청 차단, 실패 후 같은 cursor 재시도와 호출부의 정렬별 스크롤 수명을 다시 대조했다. key 사용 여부와 별개로 hook이 새 조회 범위의 이전 데이터를 숨긴다.
- 상태 갱신은 해당 hook의 로컬 identity 조정이며 render 중 외부 요청·저장·구독을 실행하지 않는다. 요청은 effect에서 시작한다. query cache나 전역 도구를 추가하지 않았다.
- R14-02의 기본 title 스타일과 큰 글자 분기 병합을 확인했다. 제목·썸네일을 중첩 버튼으로 만들지 않았으며 normal/작은 폭 카드의 기존 읽기 행동을 유지한다.
- R14-03/04의 모든 변경 diff·호출부를 재확인했다. 더 이상 쓰이지 않는 import나 준비 중 화면 소비자가 남지 않았다. 주석 변경이 fixture·ID·지연/실패 시나리오 값을 바꾸지 않았다.
- 인증 generation, 사용자 ID, 개인 화면 revision, 프로필 이름·설정의 분리와 목록 삭제 처리 구조를 다시 확인했다. 이름 변경/설정 저장이 인증 revision이나 공개 navigation을 초기화하지 않는다.
- 신규 발견 사항을 무시하거나 다음 Goal에 넘기지 않았다. 아래 환경 제약은 해결됐다고 표시하지 않는다. 두 검토는 같은 작업자의 자기 검토이며 독립 검토자 리뷰가 아니다.

## 상태·식별자·수명

기존 정책을 유지한다. `userId`는 개인 데이터 소유자, `articleId`는 동일 기사, `listId`는 이름과 무관한 목록 식별자다. 인증 revision은 개인 화면·초안·시트의 수명이다. 로그아웃은 데이터 삭제가 아니며 이미 제출한 쓰기는 원래 사용자의 저장소에만 적용된다. A→B→A에서 A 확정 상태와 제출된 명령은 유지하고 B에게 노출하지 않는다. 전체 Reload/JS 실행 환경 재생성에서 메모리 데이터와 인증을 초기화한다.

기본 읽기 목록과 사용자 목록의 합집합에서 북마크 선택을 파생한다. 한 소속 제거·목록 삭제는 다른 소속·기사·좋아요를 삭제하지 않는다. 프로필/설정 초안과 확정 상태를 분리하고, 닫기는 미제출 초안 폐기이며 제출된 저장 취소가 아니다. 상세 새 진입은 기본 설정, 기존 인스턴스 복귀는 임시 선택을 유지한다.

## 검증 결과

환경: macOS 14.2 arm64, `/opt/homebrew/opt/node@24/bin`의 Node 24.10.0·npm 11.6.0. Node 24 engine을 충족한다. `.nvmrc` 24.18.0·packageManager npm 10.9.0과의 차이는 유지·기록하며 의존성이나 lockfile을 바꾸지 않았다.

| 검사 | 이번 실행 결과·증거 |
| --- | --- |
| 수정 전 회귀 | 6 실패·2 통과, 2 suites. 신규 논리 3개 × iOS/Android |
| 수정 후 feed/search 관련 | 50 통과, 6 suites, 20.052초 |
| 타입·lint·전체 테스트 | 통과, 614건(논리 307개 × iOS/Android), 80 suites, 245.554초. [check.log](evidence/goal14/check.log) |
| iOS JS/Hermes | 성공, 약 2.3MB hbc. [로그](evidence/goal14/export-ios.log) |
| Android JS/Hermes | 성공, 약 2.3MB hbc. [로그](evidence/goal14/export-android.log) |
| 8081 실제 Chrome | 검색→상세→수준→로그인 닫기/성공→좋아요/저장→검색 복귀→읽기 목록→프로필 취소→기본 수준 저장→로그아웃 취소/확인. 콘솔 오류 0. [스크립트](evidence/goal14/browser.mjs) · [결과](evidence/goal14/browser.log) |
| 캡처 | 390×844 홈·검색·기사·목록·설정, 320×740 홈, 1365×900 홈. 실제 캡처 7장 |
| iOS native 실행/빌드 | Xcode.app 없음, CLT만 존재. xcodebuild·simctl 실패. 미검증 |
| Android native 실행/빌드 | Android SDK·adb·emulator 없음. 미검증 |

[플랫폼 명령 결과](evidence/goal14/platform.json). VoiceOver/TalkBack, Dynamic Type/실제 fontScale, 한글 IME·소프트 키보드, Safe Area·OS 뒤로/스와이프·native 모달 포커스는 호환 Xcode/Simulator 또는 Android SDK·에뮬레이터/기기에서 확인해야 한다. 자동 검사나 브라우저로 대체 통과시키지 않는다.

## 원본 대조와 남은 차이

보관된 Medium iOS Latest 카탈로그 1419, Home/Explore·Searching Medium 분석과 실제 원본 PNG 2장을 확인했다. 화면 ID는 `sc_5e0ba0e498ff49579bf838096aec4b5e`, `sc_8dc9eeb5f9d244ca9fa6fb7a973de82f`다. 원본은 1179×2556px이며 실제 기기·DPR·제품 빌드는 미확인이다.

[원본·구현 나란히 비교](evidence/goal14/COMPARISON.html)는 원본 표시 폭만 390px로 맞춘다. 실제 캡처를 가공하지 않았다. 현재 한국어 문구·자체 삽화·최신/인기/추천·하트·예시 안내·추가 반응 행은 원본과 다르다. 검색도 원본 Mindfulness/Stories 등과 내용·탭·본문 높이가 다르다. 시스템 상태바·여백·폰트까지 같은 조건이 아니므로 픽셀 일치를 주장하지 않는다. 이 차이를 숨기지 않고 다음 클론 단계의 기준선으로 남긴다.

이번 Goal은 코드 규칙 검토 단계로, 원본의 글쓰기·추천 제어·알림·댓글·팔로우·외부 인증 등은 구현하지 않았다. 4단계 설명·단일 좋아요·A/B 모의 인증은 기존 앱 추가 요소다.

## 보존·커밋·다음 단계

- 8081 PID `42833` 유지. ENV·원본 medium·기존 사용자 삭제·의존성·외부 서비스는 변경하지 않았다. 과거 삭제된 evidence를 복원하지 않고 goal14 증거만 새로 생성했다.
- 검증용 preview 상수는 모두 `normal`이다. 실제 계정·토큰·개인정보를 요청하거나 만들지 않았다.
- 전체 검사 통과와 최종 diff를 확인했다. 이 결과를 포함한 Goal 14 변경만 로컬 커밋 대상으로 확정했다. 커밋 해시는 후속 진행 기록에 남기며 push·배포는 하지 않는다. Goal 15~21의 변경에는 이 커밋 허용을 적용하지 않는다.
- 사용자의 연속 진행 요청에 따라 다음은 Goal 15다. 네이티브 검증 대기를 후속 Goal 완료로 지우지 않는다.
