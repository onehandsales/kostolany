# Goal 26 — Responses·댓글·답글·정렬·수정·삭제

2026-11-19 KST, macOS. **구현 완료·시각/native 검증 잔여**. Goal25→35 연속 요청에 따라 다음 단계까지 계속하며 커밋/push/배포하지 않는다. 독립 검토자를 사용하지 않았다.

## 구현과 원본 추적

| 범위 | 구현·연결 | 근거와 남은 차이 |
| --- | --- | --- |
| C14, Responses·정렬·policy | 기사 반응 바·홈/검색·Explore 추천·관련 기사·본문 preview에서 같은 상태를 연다. Most Relevant/Most Recent, 정책 화면과 복귀를 연결했다. | F16/F30/F34/F36/F38. S100 `sc_915888…`, S112 `sc_9c9af…`, 정렬 `sc_9b944…`/`sc_280ed…`, policy `sc_063290…`. |
| C15, 작성·편집·삭제 | 작성/저장/취소, 소유자 편집·삭제, 확인/취소, 실패 후 입력·선택 보존과 재시도. | F31~33, 작성 `sc_cebfd…`/`sc_50079…`, 편집 `sc_08179…`/`sc_0950…`/`sc_c1a6…`, 삭제 `sc_aa1b3…`. |
| C16, 중첩 답글 | 부모별 펼침/접기·추가 답글·댓글 본문 펼침을 분리했다. 삭제된 부모의 기존 자식은 보존한다. | F35. 실제 동적 목록은 FlatList로 가상화한다. |
| C17, 댓글 반응·메뉴 | 댓글별 반응과 재시도, 내 댓글 메뉴, 캡처된 짧은 본문과 미수록 나머지를 구분한다. | F30~36. 댓글 반응은 기사 누적 박수와 별도 계약이다. |
| 후속 연결 | 인용 데이터/작성 UI는 준비했으나 본문 선택 진입은 Goal27, 작성자 관리 권한은 Goal29, 공개 목록 응답 진입은 Goal32다. | F25/F29를 이번 단계의 선택 기능 완료로 계산하지 않는다. |

Responses 아래 7개 관련 ANALYSIS의 관찰·미확인을 읽고, 실제 고유 PNG 16장을 외부 임시 비교 시트에서 확인했다. 63개 흐름·273단계·고유200장 전체 구현/시각 검증 완료를 뜻하지 않는다.

[Write a response](https://help.medium.com/hc/en-us/articles/214578008-Write-a-response), [Manage responses](https://help.medium.com/hc/en-us/articles/217048127-Manage-responses), [Medium Rules](https://policy.medium.com/medium-rules-30e5502c4eb4)를 2026-11-19 조회했다. 로그인 작성과 인용, 작성자의 숨김/토론 종료를 구분했다. Policy 화면은 보관본의 첫 두 문단과 표시일(2021-05-26), 현재 공식 링크를 제공한다. 전체 규칙을 내장하지 않았다.

Gummble에서 미수록 Radu의 펼친 본문을 보완 검색했으나 반환된 `sc_e6491…` 작성자 프로필, `sc_a829…` 프로필 편집, `sc_ddd5…` Library는 해당 본문을 제공하지 않았다. 실제 이미지도 확인했으며, 반환 화면의 제품 버전은 확인되지 않아 보관 version ID1419의 근거로 대체하지 않았다.

## 데이터·명령·권한·수명

- `features/responses`가 상태를 소유한다. 사용자·article/list 대상·response·parent·author·operation ID와 version을 구분하며 AppNavigator의 `responseSource`로 공급부를 주입한다.
- 사용자별 mock 세계와 저장소는 provider 메모리 수명이다. 같은 실행의 A→B→A에서는 A의 확정 데이터를 유지하고 전체 새로고침/재실행에서는 초기화한다. 실제 서버·로컬 영속 저장·이메일·외부 신고 전송은 없다.
- 조회 세대와 version으로 오래된 성공/실패를 무시한다. 대상별 변경은 직렬 실행한다. 같은 operation ID/같은 payload는 재실행해도 중복 생성/반응 증가가 없고, 다른 payload는 거부한다. 실패는 같은 operation ID로 재시도한다. 반환 대상·소유자·변경 결과도 검증한다.
- 작성·편집은 명시적 제출이다. 중복 제출을 즉시 막고 실패 시 초안을 보존한다. 전송 후 추가로 입력한 새 초안과 답글 펼침/접기 의도를 늦은 성공으로 덮지 않는다. 편집 취소는 원문을 바꾸지 않는다.
- 소유자만 편집/삭제한다. 삭제는 부모의 tombstone을 남겨 기존 답글을 유지하며 새 답글/편집/반응을 거부한다. 댓글 삭제가 기사·박수·북마크·읽음 이력을 삭제하지 않는다.
- 사용자/auth revision/source가 바뀌면 열린 패널·메뉴·초안·오류를 격리한다. 늦은 A 변경은 A의 저장소에만 반영한다. 비로그인 작성은 로그인으로 연결하며, 로그인 취소는 기존 패널로 복귀한다. 성공 뒤에는 개인 행동을 사용자가 다시 실행한다.

## 관찰과 자체 보완 정책

- 원본 832/833/834는 서로 다른 캡처의 숫자다. 미수록 수백 개 댓글을 만들어 넣지 않고 관찰한 댓글/답글 10개를 초기 fixture로 사용했다. 실제 mock 수는 삭제되지 않은 최상위 댓글 7개에서 시작한다. 답글 수는 부모에 반영한다. 이는 Medium의 실제 집계 정책 확정이 아니다.
- Most Relevant는 fixture relevance와 내 새 댓글 우선, Most Recent는 생성 시각/ID 순이다. 수정 시각으로 재정렬하지 않는다. 상대 날짜 표시와 정렬용 보완 timestamp(2025-06-08 기준)를 분리했다. 이 날짜는 캡처일이 아니다.
- 댓글 박수는 자체 mock 목표 반응 0/1과 해제다. 기사/목록 상한50을 댓글에 일반화하지 않는다. 자기 댓글 반응 비활성은 보관 화면을 참고한 mock 권한이며 공식 상한/권한으로 단정하지 않는다.
- 캡처에서 끊긴 본문은 발췌까지만 저장한다. Read more 뒤에도 미수록 원문을 생성하지 않고 나머지 미제공을 표시한다. 사용자가 작성한 긴 본문은 실제 저장된 전체 내용을 펼친다.
- 입력 5000 UTF-16 단위, 답글 초기1개/추가5개, 들여쓰기 최대3단계, 삭제 확인·tombstone은 자체 보완이다. 전체 데이터는 메모리에 있고 See more는 표시 범위를 늘린다. 서버 cursor 페이지네이션 구현이 아니다.

## 1차 자체 검토 → 수정·검증

1. 실제 navigation 회귀에서 작성 실패/재시도→답글→편집 취소/저장→삭제 취소/확정→정렬→정책→기사/홈 복귀를 검토했다. 패널과 진입 버튼의 접근성 이름이 겹쳐 선택이 모호했던 문제를 별도 패널 label로 수정했다. navigation 자체를 mock하지 않았다.
2. 브라우저에서 전송 중 Hide replies를 누르면 늦은 성공의 자동 펼침이 새 선택을 덮었다. 펼침 의도 세대를 추가하고 추가 입력한 새 초안도 보존했다. 입력 변경 유무 두 경우를 회귀 검사한다.
3. See more replies가 표시된 자식보다 앞에 나타나는 순서를 고쳤다. 부모 삭제 뒤 기존 자식 보존·새 답글 거부, 중복 명령과 다른 대상 격리를 검사했다.
4. 댓글 메뉴가 본문 흐름을 밀던 문제를 버튼 좌표 기반 popover로 고쳤다. Read more의 3줄 접기와 20px 답글 들여쓰기, 수정 전 날짜 표시를 보정했다.

## 2차 자체 재검토 → 추가 수정·검증

1. A→B→A와 같은 A의 새 revision, source 교체, 늦은 성공/실패를 검토했다. 새 scope가 이전 개인 초안/메뉴를 노출하지 않는 UI 회귀를 추가했다.
2. 중간 검사에서 teardown 뒤 native no-op 포커스 복귀의 프레임 오류가 나타났다. ResponsesPanel과 공통 TopPopover의 복귀 프레임을 실제 web에서만 예약하도록 수정했다. native 포커스 검증은 별도 잔여다.
3. 전체 소비자를 재검색해 Explore 추천 카드의 정적 박수/응답 수치를 찾았다. 공유 ClapControl/ResponseButton으로 연결했다. 추천 카드에서 쓴 댓글이 상세에서 같은 수/내용으로 보이는 실제 8081 흐름을 확인했다. Goal25 누적 박수 소비자도 함께 수정했다.
4. source가 성공을 반환해도 실제 명령 대상의 변경 결과가 빠진 경우를 검토했다. 소유자/본문/부모/삭제/반응 효과를 검사하도록 보완하고 회귀 검사를 추가했다.
5. 비로그인 작성→로그인 취소 시 Responses가 닫히던 문제를 수정했다. 취소는 패널 유지, 성공은 기존 개인 패널 정리 후 수동 재진입 정책으로 검증했다.
6. 원본과 다시 비교해 정렬 팝업의 위치/17px 글자, 8개 작성자 사진 crop, 댓글 14px/18px를 보정했다. 345px 본문에서 Bérnie의 13px 표현은 5줄/90px였고 14px로 원본의 6줄/108px에 맞췄다. 원본 font/vector와 일부 세로 간격은 남아 있다.
7. 전체 검사 1회에서 검색이 로딩 상태인 채 대기가 끝났다(해당 suite394.822초, 원인은 환경 정지로 확정할 수 없음). 무수정 단독 재실행은 양 플랫폼 8건 통과했다. 검색 debounce를 실제 시간에 맡기던 기존 테스트를 다른 검색 검사처럼 fake timer로 통일했다. 실제 navigation은 그대로이며 최종 전체 검사를 다시 실행했다.

## 실행 결과와 증거

Node24.18.0/npm10.9.0, 기존 lockfile/의존성을 사용했다. 명령은 FE에서 임시 Node/npm 경로를 PATH 앞에 두고 실행했다. 로그·캡처·비교·일회성 스크립트는 모두 저장소 밖 `/tmp/kostolany-goals25-35.4FQsD5`에 있다. 임시 파일의 장기 보존은 보장하지 않는다.

| 검사 | 실제 결과 |
| --- | --- |
| `npm run check` | 타입/lint·112 suites/758 tests 통과,274.582초. `goal26-verified-check.log`. 379개 논리 사례를 iOS/Android 설정으로 각각 실행한 수치이며 실제 native 실행이 아니다. 최종 14px 표현 보정은 별도 타입/lint·브라우저/번들로 재확인했다. |
| 신규 source/UI/실제 navigation 검사 | `createResponseStore.test`, `ResponsesPanel.test`, `ResponsesNavigation.test`. 중간 6 suites/28 tests 및 guest·정렬 변경 뒤 실제 navigation 2 suites/4 tests 통과. 최종 전체 결과에 포함한다. |
| 이전 전체 실행 | 중간112 suites/754 tests 통과. 후속 회귀 추가 뒤 111 suites/757 tests 통과·검색1건 실패. 두 기록 모두 최종 통과로 대체하지 않는다. |
| 정상 8081 브라우저 | `goal26-browser.cjs/json`: 정렬, 작성/편집/취소, 답글 접기/추가, 댓글 박수, 정책 복귀, 삭제 취소/확정,320px,검색 카드 재진입. 11개 캡처, console/page 오류0. |
| 실패·계정 브라우저 | `goal26-faults.cjs/json`: 조회 실패/재시도, 저장 실패와 5000단위 한국어 입력 보존/재시도,3초 지연 A 작성 중 B 전환→A 복귀. B7/A8·새 초안 비움, 오류0. |
| 비로그인 브라우저 | `goal26-guest.cjs/json`: 로그인 취소 패널 유지, 성공 뒤 수동 재진입·7개/빈 초안, 오류0. |
| 추천 카드 연결 | `goal26-explore.cjs/json`: 추천 카드 Responses0→작성1→기사 상세 Responses1·동일 본문. 오류0. |
| 긴 목록·가상화 | `goal26-long.cjs/json`:320×759에서 자체 fixture300개/긴 한국어, 본문 펼침과 연속 스크롤로300번째 도달. 시작 DOM댓글9개/끝19개, scrollHeight83813px·viewport628px, 오류0. 첫 시도는 가상화 항목 측정 전 한 번의 끝 점프로 미도달했고, 연속 스크롤로 재검사했다. 종료 기록을 남기도록 검증 스크립트 cleanup도 보완했다. |
| 양 플랫폼 JS/Hermes | `npx expo export --platform ios --platform android --output-dir /tmp/kostolany-goals25-35.4FQsD5/goal26-current-export` 성공, 각2.5MB. 실제 native build/run 아님. 최종 댓글 글자 크기 보정 뒤 다시 export했다. |

장애 시나리오는 `responsePreviewScenario = 'normal'`로 복원했다. 실제 HTTP8081 서버는 유지했고 중복 시작하지 않았다.

## 원본 시각 비교와 플랫폼 잔여

- macOS Chrome157,393×759/DPR1/Light/mock A, 정상 fixture로 실제 화면을 촬영했다. 원본1179×2556을393×852로 정규화하고 상단59/하단34를 제외한 앱 영역과 비교했다. 이는 원본 기기/DPR의 증명이 아니다. 모달 이동 애니메이션이 끝나기 전 초기 캡처는 제외하고400ms 뒤 재촬영했다.
- 대표 비교: 초기 Responses `sc_915888…`, 최근 정렬 `sc_280ed…`, 내 댓글 메뉴 `sc_08179…`, 정렬 팝업 `sc_9b944…`. 실제 비교 이미지는 `goal26-*-compare.png`다. 본문 x24/폭345, 헤더와 정렬 컨트롤,32px 사진,20px 자식 들여쓰기,250px 정렬 메뉴를 비교했다.
- 원본 수834와 mock7, Alex/원본 계정과 예시 독자A, 원본 날짜와 새 댓글 시각, OS 키보드 부재는 같은 상태의 시각 일치로 계산하지 않는다. 원본 SF 폰트 파일/vector 미확보, 아이콘·사진 안의 배지, blur/shadow, 줄바꿈·일부 세로 간격이 남았다. popover 행과 Read more/반응의48px 조작 영역은 원본의 약44px 메뉴/더 작은 행과 차이가 있다.
- 320px·긴 한국어·실제 DOM 가상화와 web 접근성 이름/선택·focus·뒤로/모달 닫기·스크롤을 확인했다. 합성 입력·web 검사를 실제 한글 IME, OS 글자 확대, VoiceOver/TalkBack, 키보드 가림 검증으로 표현하지 않는다.
- iOS: Command Line Tools만 있고 full Xcode/Simulator가 없어 native build/run·실제 Safe Area/키보드/OS 접근성 미검증. Android: SDK/adb/emulator가 없어 native build/run 미검증. Java23만으로 충분하지 않다. 해당 환경과 기기에서 Goal52의 전체 플랫폼 검증이 필요하다. 환경 제약과 무관한 mock 구현/자동/web 검증은 수행했다.

## 8081 최종 확인 순서

1. Profile에서 예시 독자A 모의 로그인 → Explore에서 `ChatGPT Is Poisoning` 검색 → 기사 → Responses. 초기 최상위7개를 확인한다.
2. Most Recent/Most Relevant 전환 → 댓글 작성 → 내 메뉴 Edit → Cancel/Save → Bérnie Reply → Hide replies/Show replies/See more replies → 댓글 박수 → Medium policy와 복귀.
3. 내 댓글 Delete → Cancel → 다시 Delete 확인 → 수/본문 확인 → 기사와 검색 복귀 → 검색 카드 Responses로 같은 상태 확인.
4. Explore의 `How Old Is Your Body?` 추천 카드 Responses에서 작성 → 해당 기사 상세로 진입 → 같은 응답 확인.
5. Profile 로그아웃/B/A 전환과 전체 Reload를 비교한다. 같은 실행의 A 데이터는 유지하고 Reload는 초기화한다. 비로그인 Responses에서 로그인 취소와 성공 후 수동 재실행을 구분한다.

## 변경 위치와 다음 단계

`FE/src/features/responses/`, AppNavigator/source 주입, 기사/카드/Explore 소비자, 공통 TopPopover/AppIcon, 실제 navigation 회귀,8개 사진과 `assets/medium/SOURCES.json`이 주요 변경이다. ENV·medium 원본·lockfile은 변경하지 않았다.

Goal27에서 본문 선택→Highlight→Library→원문, 선택→인용 Responses를 연결한다. Goal29의 관리 권한과 Goal32의 공개 목록 응답 진입은 아직 완료하지 않았다. Goal36 이후 실제 인증/공유 등은 이번 범위에서 시작하지 않는다.
