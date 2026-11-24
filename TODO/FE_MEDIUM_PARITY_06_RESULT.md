# Medium Parity 6 — Digest

**최신 잔여 판정 — 2026-11-24:** [Parity1~8 잔여 정리·보완·재검토](FE_MEDIUM_PARITY_01_08_REVIEW.md). 아래 수치·미커밋·미착수·시각 차이는 해당 실행 당시 기록이다. 후속 해결과 이번 보완, 원본 근거 부족/기기/제외를 최신 표에서 구분하며 과거 증거를 현재 통과로 사용하지 않는다.

2026-11-23~24(KST), macOS. 시작 HEAD `bb8b896054ff1af1482ee9d640c74b6390f30c4c`, 시작 작업 트리 clean. [실행 계획 묶음6](MEDIUM_PARITY/EXECUTION_PLAN.md#batch-06)의 D02·D04·D11·V27만 수행했다. AGENT 공통·UX 규칙과 FRONT README/하위6개, 묶음2·묶음5의 추가 재검토까지 확인했다. 과거 Goal 결과·검사·이미지는 현재 실행 결과로 재사용하지 않았다.

**판정:** Digest 기능 보완·mock 회귀 검증 완료. 원본과의 시각 동일성은 미완료이며 U 미확인·실제 native 검증은 남는다. D04의 메모와 D11의 내 목록 카드 소비자는 묶음7 잔여다. 실제 인증·백엔드·추천·이메일 발송이나 출시 완료가 아니다.

사용자 제한에 따라 `tools`와 그 하위 파일을 생성·수정하지 않았다. 별도 검증 도구/스크립트 폴더, evidence 폴더, 캡처·검증 로그 파일·manifest를 만들지 않았다. 화면은 메모리에서 열람했다. 기존 tools와 과거 결과/삭제 이력은 보존한다. 임시 브라우저와 export 출력은 실행 후 정리하며 8081 서버는 유지한다. 커밋·push·배포·묶음7은 수행하지 않는다.

## 요구사항별 처리

| 대상 | 구현·검증 | 남은 범위 |
| --- | --- | --- |
| D02 | Digest가 현재 사용자 관계의 `excluded`를 소비해 Mute/Block을 반영한다. 기존/새 호·날짜 왕복·늦은 조회·Unmute·A/B를 확인했다. 발행 원본은 변경하지 않는다. | Medium의 기존 호 처리 시점은 미확인. 아래 자체 정책을 원본 정책으로 승격하지 않는다. |
| D04 Digest | 기존 공통 원문 표시와 같이 확인된 양수만 `min read`로 표시한다. 0·누락은 숨긴다. 날짜 전환·재조회·기사 복귀에도 같은 처리다. | 메모 및 기타 소비자는 묶음7. 임의 시간 추정 없음. |
| D11 Digest | `memberOnly === true`에만 금색 star16과 `회원용 기사, 제목` 접근성 이름을 표시한다. false/미확인은 생략한다. | 내 목록 카드는 묶음7. 현재 계정 등급·작성자 verified·Friend와 별개다. |
| V27 | June12/June8 구성, 날짜10개·선택/Done/취소, 오류·빈 호·재시도, 기사/작성자/반응/저장/New list/설정 연결, 화면 이탈·포커스·스크롤 수명을 보완했다. | S116 사진/아바타·집계·서체·OS 영역 등 시각 차이, U/native 대기. |

## D02 정책과 근거

- **원본 화면:** F22는 작성자 메뉴·음소거 성공을 보여 주지만 Mute 이후 Home/Digest 조회를 담고 있지 않다. 전후 Follow/Following의 차이를 Mute 효과로 해석하지 않는다.
- **보관 문서:** [medium/SOURCES.md#mute](../medium/SOURCES.md#mute)는 2026-11-18 확인한 도움말의 추천 피드·Digest 제외 및 새로고침 가능성을 설명한다. 이번에 Medium 계정이나 최신 서버 정책을 실행한 것이 아니며, 이 설명만으로 기존 호의 변경/캐시 정책은 확정할 수 없다.
- **채택한 자체 mock 정책:** 기존 호와 이후 source가 공급하는 새 호 모두 **현재 조회 화면의 최신 Mute/Block**으로 필터한다. 호의 `articleIds`는 보존한다. Mute 성공이 관계 저장소에 반영되면 현재 표시에서 제외하고 Unmute하면 해당 호 원본에 있던 글이 다시 보인다. 새로운 기사나 추천 호를 생성하지 않는다.
- **이유·대안:** 과거 호를 항상 유지하고 미래 발행 때만 걸러내는 대안에는 발행 시점별 관계 snapshot이 필요하지만 현재 mock에는 그 계약이 없다. 근거 없는 발행/추천 이력을 새로 만들지 않고 기존 Home의 사용자 제어 의미와 현재 관계 저장소를 재사용했다. 따라서 과거 발송 이메일이나 불변의 발행 snapshot을 재현하는 장점은 제공하지 않는다.
- **변경 영향:** 이전 Digest는 Block만 제외해 Home와 결과가 달랐다. 이제 Home 추천과 Digest 표시가 Mute/Block에 같은 제외 기준을 사용한다. 공개 프로필·검색은 음소거로 접근을 금지하지 않는다. Follow·작가별 이메일·Mute·Block은 각각 기존 저장소의 별도 상태이며 이번 필터가 Follow/이메일/저장/박수를 수정하지 않는다.
- **조회·캐시:** 필터된 기사 ID를 별도 캐시하지 않는다. raw Digest 응답과 현재 관계로 렌더링할 때 파생하므로 조회 시작 후 관계가 바뀌어도 이전 응답이 Mute를 해제하거나 Block된 기사를 복원하지 않는다. 관계 조회 중/실패에는 기사를 먼저 노출하지 않고 재시도한다.
- **적용 한계:** 다음 발행분은 테스트에서 `replaceIssues`로 공급한 모의 새 호다. 자동 발행·생성 주기·실제 추천·이메일 발송은 구현하지 않았다. 정책 변경을 되돌릴 경우 Digest 소비자의 필터 선택만 바꾸며 기존 호/개인 데이터의 이관은 필요 없다.

## 결함 재현·원인·수정

| 재현 조건·기대 동작 | 원인과 수정 | 확인 |
| --- | --- | --- |
| 작성자 Mute 뒤 날짜 왕복/재조회에서도 해당 글이 노출됨 | `blocked`만 사용하던 Digest에 기존 `excluded` 관계 필터 연결 | 화면+저장소 회귀와 실제 8081 Home/Digest·날짜 왕복·관리 목록 Unmute·A→B→A |
| June8에도 June12의 love/jeremiah가 반복됨 | 짝수 index 반복 fixture를 June8의 Goodbye Notion/xeladu와 관찰된 다음 Alex byline으로 분리 | 실제 navigation으로 작성자·기사 상세/복귀·박수·응답·저장, 브라우저 같은 경로 |
| 0 min read와 회원용 별표 누락 | 미확인 시간을 그대로 출력하고 memberOnly 분기 없음 | 0/누락/양수 및 true/false/미확인 회귀, 날짜 재조회·복귀·Light/Dark·320/393 확인 |
| 화면 이탈 뒤 날짜 초안·설정/행동 창 또는 늦은 결과가 남을 수 있음 | 유지되는 Library가 Digest 포커스를 전달하지 않음 | 중첩 실제 navigation focus 전달, 이탈 시 초안·시트/카드 행동 UI 제거·조회 세대 종료, 확정 날짜만 재조회에 유지 |
| 같은 발행 ID라도 다른 발행 시각/중복 기사 응답 수용 | 상세 응답 검증이 userId/id/date에만 한정 | publishedAt 일치·기사 ID 배열/중복 검증 및 snapshot 복사. 실패 후 같은 날짜 재시도 회귀 |
| 날짜/설정 창 닫기 뒤 포커스가 진입 버튼으로 돌아오지 않음 | 포털이 열린 뒤에는 최초 진입 요소를 잃을 수 있음 | 기존 `useReturnFocus` 연결. 실제 웹 Cancel/Escape/Done과 설정 닫기에서 확인 |
| 2차 검토: 기사 복귀 때 목록 스크롤이 0으로 초기화 | 이탈/재조회 때 기사 배열이 비워져 웹 목록 높이가 줄어듦 | 로딩 중 위치를 덮지 않고 같은 확정 날짜의 콘텐츠 높이 복구 후 위치 복원. 새 날짜는0. 실제 navigation 회귀와 웹114px→기사→114px |
| 추가 Alex byline의 공개 카탈로그 연결 | 추천 작성자 정보 병합이 기존 stories를 빈 배열로 덮음 | 같은 ID의 이미 연결된 stories를 유지. 새 별도 카탈로그를 만들지 않음 |

날짜 선택기의 글자16/24·SVG 닫기, 설정 버튼 원형 테두리, 큰 글자의 날짜 줄바꿈과 메타데이터 폭도 보완했다. 이미지 파일·의존성·실제 서비스 연결을 추가하지 않았다.

## 상태와 수명

| 상태 | 소유권·수명 |
| --- | --- |
| 원본 호 | DigestSource의 id/date/publishedAt/articleIds. 표시 날짜와 발행 시각은 별개이며 publishedAt 내림차순 최대10개를 사용한다. |
| 확정 날짜/조회 | 사용자·source별 DigestContent의 store. catalog/detail 요청 세대를 별도로 검사한다. 실패 시 확정 날짜를 유지하고 실패한 날짜의 이전 기사로 꾸미지 않는다. |
| 날짜 초안 | 모달 지역 상태. Done만 조회 날짜를 바꾸며 취소/Escape/이탈은 폐기한다. 갱신으로 선택 호가 사라지면 Done을 비활성화한다. |
| 화면 이탈/복귀 | 요청 세대를 종료하고 이전 결과/오류를 제거한다. 같은 화면 수명에는 확정 날짜/스크롤만 유지하고 복귀 시 재조회한다. 다른 Library 탭에서도 동일하다. |
| 인증/source | Library의 bookmark scope가 userId·인증 revision·source 수명을 구분한다. Digest source/user 교체도 별도 key로 초기화한다. 같은 계정 재로그인에도 이전 날짜 초안/시트/오류를 재사용하지 않는다. |
| 관계/반응/저장 | 기존 userId별 저장소와 기사/작성자 ID를 사용한다. 화면 이탈은 이미 확정된 개인 데이터의 삭제나 쓰기 롤백이 아니다. |

빠른 A→B→A 날짜 선택, 역순 성공/실패, 카탈로그 교체·선택 호 삭제, source 교체, 조회 중 Mute/Block, 계정 변경과 늦은 A 응답은 회귀로 검사했다. 8081에서도 A의 June8 조회를 지연시킨 뒤 B 로그인→June12→늦은 A 응답→A 복귀에서 June12·새 화면 상태가 유지됐다. 이 지연은 격리 브라우저의 source 함수에만 주입했고 원래 함수로 복원했다.

## 원본·R/T/U/C와 fixture

S096/S116/S132/S193의 실제 PNG를 각각 열고 관련 Library/Filtering digest/Digest settings/F22 ANALYSIS와 보관 SOURCES를 확인했다. 직접 범위는 **36 R·6 T**, 연결된 U-S4개/U-F3개 및 D02의 추가 U-F22 맥락이다. 전200화면이나 연결 기능 전체를 새로 검증했다는 뜻은 아니다.

| 화면·요구 범위 | 현재 처리 | 원본 차이·한계 |
| --- | --- | --- |
| [S132](MEDIUM_PARITY/REQUIREMENTS_06.md#s132) R-L/D/S/V, C01~09 | June12, Today’s highlights, Kris Gage/love, 별·3 min read, 날짜·설정·저장·더보기·박수·응답·작성자·기사·New list | 원본158K/1.3K 대비 현재 공유 mock157K/0. 정적인 원본 수치로 live 저장소를 덮지 않음. 기존 love crop의 해상도·구도와 폰트/간격/OS 영역 차이 |
| [S193](MEDIUM_PARITY/REQUIREMENTS_08.md#s193) R-L/D/S, C01~03 | June12 선택, June3까지10개, last10 안내·Done·닫기·포커스 | 원본의 기기/inset·서체·radio 렌더 차이. 연속10일은 이 fixture 조건이며 보관기간10일 계약 아님 |
| [S096](MEDIUM_PARITY/REQUIREMENTS_04.md#s096) R-L/D/S, C01 | June8 임시 선택 표시, Done 전 확정 날짜 유지, 취소/이탈 시 폐기 | 선택 즉시 서버 조회 여부는 원본 미확인. mock은 Done에서만 조회 |
| [S116](MEDIUM_PARITY/REQUIREMENTS_05.md#s116) R-L/D/S/V, C01~09 | June8 Goodbye Notion, xeladu, 관찰된 요약·2분·회원용 별, 박수170 seed와 실제 변경, 기사/작성자·저장/응답/메뉴/New list/설정 연결 | **해당 사진·xeladu 아바타가 FE 자산에 없어 미구현 차이로 남는다.** 파일 제한 안에서 새 이미지 파일을 만들지 않음. 원본 응답17은 관찰 메타데이터이며 현재 실제 mock 응답은0. Alex의 미수록 제목/본문은 기존 placeholder 정책 |

T-F41-04, T-F43-01~04, T-F44-01을 이번 대상으로 연결했다. F44의 설정에서 Push 진입/복귀도 확인했으나 이메일 외부 발송·설정 기능 전체는 담당 후속 묶음이다. F22의 작성자 Mute/Unmute는 D02 맥락으로 확인했다.

C37/C38은 Digest 진입·발행분 선택·Library 연결 범위다. C01/02/03은 서체/배치·접근성·큰 글자/터치·포커스·스크롤의 해당 소비자, C09/23/31/32/53/67/70은 기사·작성자·저장/새 목록·설정과 사용자 수명 연결만 확인했다. C36/58~61/65/66의 다운로드·재생·멤버십·권한 전체를 완료 처리하지 않으며 C71 실제 OS는 대기다.

June12/June8의 보이는 기사·작성자·2/3분·회원용 글 여부는 관찰에서 가져왔다. June12~June3 날짜 목록도 원본과 일치시켰다. 나머지 날짜의 기사 조합, June7 빈 호, June2의11번째 호, 발행 시각08:00Z는 자체 fixture다. 날짜에 간격이 있는 별도 테스트 입력으로10호와10일의 차이를 유지했다. 본문·발행일·사진·응답 내용을 추정해 생성하지 않았다.

U-S096/116/132/193, U-F41/43/44 및 U-F22의 원본 미확인은 유지한다. 생성 기준·보관기간·시간대·과거 콘텐츠 불변성/캐시·실제 Mute 적용 시점·발송 효력은 mock 성공으로 확정되지 않는다.

## 두 차례 검토와 테스트

1. **1차 검토:** 기존 코드·batch2/5 수명 정책·R/T/U/C·원본 PNG를 대조했다. Mute 연결, June8 반복 구성, 읽기 시간/회원용 별, focus 전달과 응답 검증을 수정했다. 관련 회귀와 실제 navigation·웹 흐름으로 검증했다.
2. **2차 재검토:** diff와 카탈로그/타입 영향, source/auth 수명, 빈 호/실패/날짜 취소·포커스·작은 폭·큰 글자를 다시 확인했다. Alex 카탈로그의 stories 보존, 닫기 포커스와 설정 테두리/날짜 글자를 보완했다. 마지막 실제 기사 복귀에서 스크롤 초기화를 발견해 수정하고 회귀·웹 위치 복원·최종 전체 검사/번들을 다시 확인했다. 같은 에이전트의 자체 재검토이며 별도 독립 리뷰는 아니다.

| 테스트 | 의미 있는 변경 |
| --- | --- |
| `features/digest/DigestPanel.test.tsx` 신규2 | 조회 중 Mute·늦은 응답·새 호·Unmute·Block/Unblock·원본 보존; 0/누락/양수 및 memberOnly true/false/미확인과 재조회 |
| `features/digest/createDigestStore.test.ts` 신규2·기존1수정 | 이탈/재연결 뒤 늦은 성공/실패; 발행 시각/중복 기사 오류·재시도. 간격 있는 날짜로10호 검사 유지 |
| `app/navigation/DigestNavigation.test.tsx` 신규2·기존보완 | 실제 navigation에서 초안 중 다른 작성자 링크→복귀, June8 작성자/기사/반응/저장, A 조회→B→늦은 A→A. 기존 기사 복귀 사례에 스크롤120 복원 추가 |

신규 논리 사례6개는 iOS/Android Jest 설정에서12건이다. 기존 관련 검사도 재실행했다. 실제 stack/tab은 mock하지 않았으며 스크롤 사례의 `scrollToOffset` spy는 native 스크롤 명령만 관찰한다. 별도의 실제 웹114px 복귀 결과와 구분한다.

## 검사 실행과 실패·재실행

Node24.10.0/npm11.6.0을 FE 디렉터리에서 사용했다. `engines >=24 <25` 범위이며 `.nvmrc`의24.18.0과 동일 버전이라고 기록하지 않는다.

| 순서 | 실제 결과 |
| --- | --- |
| 초기 typecheck | 새 Alex 카드의 미확인 memberOnly를 기존 필수 boolean 타입이 허용하지 않아 실패. `ReferenceStory.memberOnly?`로 미확인을 표현하고 소비자는 true만 표시하도록 수정. 후속 typecheck/lint 통과 |
| 기존 Digest 회귀 | 4 suites /24 tests 통과,15.047초 |
| 신규 회귀 최초 실행 | 6 suites 중2실패/4통과,36 tests 중2실패/34통과,12.020초. 테스트의 잘못된 `Close responses` label을 실제 `Responses 닫기`로 수정 |
| 신규 회귀 재실행 | 6 suites /36 tests 통과,11.668초 |
| 첫 전체 `npm run check` | typecheck/lint 통과,294 suites /1546 tests 통과,551.881초. 실행 중 UI 보완이 있어 아래 최종 검사와 구분 |
| 포커스/시각 보완 후 | typecheck/lint·영향10 suites /56 tests 통과,19.938초 |
| 스크롤 수정 후 | typecheck/lint·영향10 suites /56 tests 통과,21.448초 |
| 스크롤 수정 후 전체 `npm run check` | typecheck/lint 통과. 293 suites 통과/1실패,1544 tests 통과/2실패,580.365초. Android `ModerationRouteLifetime` 첫 사례가 기본5초 제한을 초과했고 다음 사례는 `Report author` 탐색 실패. overlapping act 경고 동반 |
| 실패 파일 단독 재실행 | 코드 변경·제한 변경 없이 iOS/Android 2 suites /4 tests 통과,8.608초. 재현 여부 확인과 전체 통과는 별도다. |
| 최종 전체 Jest 재실행 | `npx jest --runInBand --testTimeout=15000`: 294 suites /1546 tests 모두 통과,535.855초,exit0. 기본5초 타이밍 실패를 구분하기 위해 제한만15초로 변경했으며 기대값·기능·테스트 코드는 바꾸지 않았다. 최종 기본5초 `npm run check` 전체가 통과했다는 뜻은 아니다. |
| 첫 iOS/Android JS/Hermes export | 양쪽 exit0, `.hbc` 생성 확인. 스크롤 수정 전 실행이며 최종 재실행과 구분. 임시 출력 정리 완료 |
| 최종 JS/Hermes export | 스크롤 수정 후 iOS/Android 각각 exit0. iOS1441/Android1436 modules, 양쪽3.6MB `.hbc` 생성 확인. 임시 출력 자동 정리 완료. 실제 native 빌드/설치/실행은 아니다. |

첫 전체 검사에는 기존 `LibraryInteractions` 양 플랫폼 및 Android `AuthNavigation`의 VirtualizedList act 경고가 출력됐다. 테스트 실패와 구분한다. Expo의 NO_COLOR/FORCE_COLOR 경고도 앱 실행 오류로 계산하지 않는다. 첫 export 명령은 `rm -rf` 정리 구문 때문에 도구에서 실행 전 거절됐다. Python `TemporaryDirectory` 안에서 만든 출력만 자동 정리하는 방식으로 변경해 실제 export를 실행했다. 검사 로그 파일은 저장하지 않았다.

## 현재 웹·플랫폼 확인과 한계

- 기존 `http://localhost:8081`을 유지하고 별도 Chrome157.0.8103.80 임시 프로필에서 직접 조작했다. CP-WEB-01은390×844/DPR1/UTC/en-US/JS Date2025-06-13T12:00Z/Light 기준이다. 추가320×640·393×852와 OS 선호 Light/Dark를 구분했다. 원본1179×2556 물리 PNG의 기기/DPR·촬영시각을 역산하지 않았다.
- 원본 PNG4개를 직접 열고 현재 날짜 두 선택 상태·June12/June8 화면을 메모리에서 비교했다. 일부 Dark/큰 글자 진단은 출력 크기 때문에 메모리 JPEG80을 사용했으며 픽셀 동일성/색 정확도 점수로 쓰지 않았다. 파일 캡처/manifest가 없어 `ready/current-web-capture`로 승격하지 않는다.
- 실제 흐름: 날짜 선택/Cancel/Done/Escape, 기사·작성자 진입/복귀, 박수, 응답 열기/닫기, 저장/새 목록, 설정/Push 복귀, 기사 신고 메뉴/선택/취소, 날짜 초안 중 작성자 링크 이동/복귀, Mute·날짜 왕복·Home와 비교·B/A·관리 목록 Unmute, 조회 실패/같은 날짜 재시도, 늦은 A 응답, 최종 스크롤 복원을 조작했다. 해당 실행의 수집 app console error/unhandled rejection은0이다.
- source 실패/지연은 격리 브라우저의 기존 source 함수에 한정해 주입했다. 함수를 원래 값으로 복원했으며 FE 정상 scenario는 바꾸지 않았다. 도구 label 오류와 Fast Refresh로 초기화된 상태에서의 선택 실패는 앱 결함/통과로 집계하지 않았다. 작성자 링크는 RN Web의 한 url 구독에 이벤트를 전달해 실제 navigation을 실행한 것으로 OS deep link 검증과 구분한다.
- 별표16px·메타데이터·48px 행동 영역·스크롤·모달 닫기를320/393 Light/Dark에서 확인했다.320에서는 반응/저장/더보기가 다음 줄로 배치될 수 있으며 겹치지 않는다. CSS 글자1.8배의 줄바꿈·메타데이터도 확인했다. 긴 한국어 목록 이름을 실제 입력칸에 넣어 생성했다. CSS 확대·CDP 합성 입력은 OS Dynamic Type/한국어 IME/터치 기기 검증이 아니다.
- **iOS 실제 실행/빌드 불가:** `xcode-select -p`는 CommandLineTools, `xcrun simctl list devices`는 utility 없음으로 실패, Xcode.app 없음. Xcode 및 iOS runtime/시뮬레이터 또는 연결 기기가 필요하다.
- **Android 실제 실행/빌드 불가:** PATH에 adb/emulator 없음, 기본 Android SDK 경로 없음. Android SDK·AVD 또는 연결 기기가 필요하다. 이 환경에서 네이티브 프로젝트를 생성하거나 SDK를 설치하지 않았다.
- iOS/Android Jest는 테스트 설정이며 JS/Hermes export는 번들 생성이다. 실제 native 설치·빌드·실행·Safe Area/notch·VoiceOver/TalkBack·OS 큰 글자·키보드 가림/IME·물리 뒤로 동작은 검증 대기다.

## 추적 문서와 변경 파일

FE 변경은 DigestPanel/source/store·회귀3파일, LibraryScreen/LibraryNavigator의 focus, mediumDigestStories/mediumFixtures/publicDirectory와 memberOnly 타입이다. `ListNoteSheet`·`ListStoryCard`를 수정하지 않았다. 새 이미지·의존성·서비스 연동은 없다.

이 결과, EXECUTION_PLAN 상단/묶음6, BACKLOG의 D02/D04/D11/V27, REQUIREMENTS04/05/06/08의 대상4화면, FLOWS F41/43/44/F22, G34 CONTRACTS, U-F22, OWN_UI_POLICY, COMPARISON_BASELINE/JSON·ASSET_BASELINE 및 FE README·구현 현황을 갱신했다. 기존 R/T/U/C·원본 PNG·과거 currentEvidence/latestReview는 보존한다.

사용자의 tools 변경 금지에 따라 TODO의 비교 상태/fixture/코드 해시는 **직접 갱신**했다. tools의 기존 `comparisonProfiles.json`/`executionBatches.json`은 당시 June8 불일치/묶음6 미착수 값을 보존하므로 자동 재생성 시 이번 수동 갱신을 덮을 수 있다. 생성기 전체 drift 검사를 통과했다고 주장하지 않는다. 기존 삭제된 evidence를 복원하지 않았으며 이전 strict 오류 수를 이번 검사 결과로 재사용하지 않는다. 현재 TODO 구조·대상36 R/6 T 연결 보존·200 원본 PNG 해시·534 코드 해시·과거 evidence 메타데이터 보존을 읽기 전용 검사로 확인했다. tools 및 묶음7 코드 변경, 새 evidence/캡처/로그/manifest 경로가 없음을 Git 변경 목록으로 확인했다. 변경은 FE 코드·테스트12파일과 결과/추적 문서16파일이며 시작 HEAD를 유지한다. `git diff --check`와 최종8081 HTTP200을 확인했다.

## 8081 최종 확인 순서

1. 새로고침→Library→모의 로그인 A→Digest. June12, Kris Gage의 글, 금색 별·3 min read를 확인한다. 실제 계정 정보는 필요 없다.
2. 날짜→June8을 선택하고 취소/Escape. June12 유지와 날짜 버튼 포커스를 확인한다. 다시June8→Done에서 Goodbye Notion/xeladu·2 min read·별이 보인다. 사진/아바타와 응답17의 차이는 위 잔여를 따른다.
3. xeladu 프로필→뒤로, 기사→Digest로 돌아가기를 실행한다. 같은 날짜를 유지한다. 박수·응답 열기/닫기·저장 대상 선택/Done·New list를 확인한다.
4. June11로 전환해0 min read가 없는지 확인한다. 아래 기사까지 스크롤→기사→복귀에서 위치를 확인한다. 다른 날짜를 적용하면 맨 위로 이동한다. June7은 모의 빈 호다.
5. Digest 설정→Push notifications→뒤로→닫기. Digest 날짜와 버튼 포커스가 유지되는지 확인한다. 주기/이메일과 선택 호 날짜는 서로 다른 상태다.
6. June12→Kris Gage 프로필→더보기→Mute author→확정→복귀. 글이 숨겨지는지, June8→June12 왕복에서도 유지되는지, Home에도 제외되는지 확인한다.
7. Profile→Settings→로그아웃→Sign in→B 로그인→Digest에서 같은 글을 확인한다. 다시A 로그인→Digest에서 숨김이 유지된다. Settings→Refine recommendations→Muted→Unmute Kris Gage→확정 후 Digest에서 복원된다.
8. 320/393폭·Light/Dark에서 별과 메타데이터/반응·저장·더보기, 날짜 모달의 선택/닫기·스크롤을 확인한다. 사용자 조작은 최소48px 대상으로 유지된다.
9. 전체 새로고침하면 인증과 이 실행의 개인 데이터는 기존 메모리 정책대로 초기화된다. 오류/지연 주입은 기본 UI 옵션이 아니며 위 테스트 source 시나리오로 재현한다. 정상 기본값에 장애를 남기지 않는다.

권장 커밋 메시지: `fix(fe): align Digest filtering, fixtures and screen lifecycles`

묶음6 결과 보고에서 종료한다. 커밋은 별도 사용자 요청 전까지 하지 않으며 묶음7을 시작하지 않는다.
