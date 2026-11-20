# Goal 32 — 공개 목록·Saved lists·목록 반응 결과

기준일: 2026-11-20 KST. 작업 위치: `D:\git_repository\kostolany_project`.

**상태: mock 기능 구현 완료·타입/lint/152 suites·906 tests 통과·원본 동일 재현/실제 native 검증 잔여.** 원본 미수록 화면과 플랫폼 검증을 문서화했다는 이유로 전체 완료로 처리하지 않는다. 이번 승인은 Goal32의 구현·두 차례 자체 검토·검증·결과 기록까지이며, 과거 Goal25~35 연속 진행 및 커밋/push 요청을 적용하지 않았다. Goal33 이후는 시작하지 않는다.

## 1. 시작 상태와 보존 범위

- 시작 Git: `main`, HEAD `da38ae2` (`feat(fe): implement Medium community and recommendations for goals 25-31`), 작업 트리 clean. 이번 변경은 미커밋이다.
- Windows `10.0.26200`, PowerShell, Node `v24.18.0`, npm `10.9.0`; FE `.nvmrc`/`packageManager`와 일치한다. Expo `57.0.33`, React Native `0.86.3`, React `19.2.3`을 유지했다.
- 기존 `http://localhost:8081`, listener PID `5248`을 사용했다. 서버를 재시작하거나 중복 실행하지 않았다.
- AGENT 진입점·PROJECT_SCOPE·공통 API/작업 규칙·UX/Medium 규칙·현재 상태, FRONT_AGENT README와 6개 하위 규칙, 전체 clone 계획/대응표 C29·C30, Goal25~31 결과를 현재 코드와 대조했다. Goal26 응답, Goal28 관계, Goal30 목록 진입, Goal31 계정/navigation 계약을 재사용했다.
- 이전 144 suites/856 tests는 Goal31 당시 기록이다. 아래 검사는 이번 변경에 대해 새로 실행했다.
- `medium` 문서/PNG·ENV·의존성/lockfile을 변경하지 않았다. 실제 OAuth·백엔드·Supabase·Storage·RSS·AI·결제·알림을 연결하지 않았다.
- `TODO/evidence`, `TODO/_evidence`, 저장소 내부 비교 HTML·로그·검증 스크립트를 만들지 않았다.

## 2. 구현과 화면별 상태

| 대상/진입 | 구현·연결 | 로딩·빈 상태·실패·복귀 |
| --- | --- | --- |
| Explore → Life → Self Improvement → See the full list | `PublicListPreviewScreen`을 실제 `PublicListScreen`으로 교체; 제목·설명·소유자·기사 수·Save 수·확인된 기사 행·고정 반응 영역 | 공개 목록 공급부 조회/재시도; 비공개/삭제 시 큐레이션 진입도 숨김; 목록 → 기사 → 목록 → 토픽 복귀 |
| 작성자 프로필 Lists → 공개 목록 | 같은 공급부의 접근 가능한 목록만 표시; listId와 ownerId 전달 | 삭제된 카드 제거; 조회 오류/재시도; 목록 → 소유자 프로필 또는 기사 → 원래 목록/프로필 복귀 |
| 공개 목록 전체 Save/Unsave | 계정별 전체 목록 저장; 선택/진행 상태·실패 Retry; 108 → 109 → 108 | 로그인 후 자동 재실행하지 않음; 실패 시 확정값으로 롤백하고 같은 목표를 재시도 |
| Library Saved lists | 실제 저장 목록·표지·소유자·기사 수·상세 진입·해제 | loading/empty/error/retry; 상세와 동일 저장소; 300개 긴 한국어 목록으로 스크롤 확인 |
| 목록 Claps | 목록 target의 누적 박수·내 기여·최대50·Undo; 98 → 148 → 98 | 기존 공유 박수 저장소/명령 재사용; 실패 Retry; 참여자 전체 정보는 미수록이므로 생성하지 않음 |
| 목록 Responses | 기존 대상별 응답 저장소/패널에 목록 target 연결; 작성·답글·수정·삭제·취소·정렬·반응·관리 권한 계약 유지 | 실패 입력 보존·재시도; 목록 권한 철회/계정 수명 변경 시 패널·초안 폐기; 원본 목록 패널과 같은 UI라는 주장은 하지 않음 |
| 소유자 Follow | 기존 writer 관계 저장소를 사용; 목록 하단/작성자 프로필 상태 동기화 | 기존 로그인·실패·취소·재시도 계약 유지; Save가 자동 Follow하지 않음 |
| Share 진입 | `{ kind: 'list', id, title }`를 선택하고 해당 목록 안내 열기 | 닫기/포커스 복귀; 실제 OS 공유·링크 발급은 Goal47 미구현 범위 |
| 소유자/방문자 | 소유자 자기 Save/Follow/Report 숨김; 방문자에게 편집/삭제/공개 범위 변경 메뉴를 제공하지 않음 | 목록 응답 관리에서는 ownerId 검증; Goal33 편집 UI는 선행 구현하지 않음 |

원본에 없는 오류·빈 상태·미수록 안내·mock 로그인/계정 선택은 자체 보완이다. 기존 4단계 설명·기본 설명 설정·개인 목록·기사 북마크·좋아요 정책을 유지했다. Digest·다운로드·검색 미구현 유형을 확장하지 않았다.

## 3. 식별자·소유권·수명·실패 계약

| 계약 | 의미 |
| --- | --- |
| listId / ownerId | 공개 목록 ID는 catalog 내 유일하다. route는 소유자 ID도 검증한다. 중복 ID·같은 ID의 소유자 교체 응답을 거부한다. 같은 제목은 식별자로 사용하지 않는다. |
| articleIds | 원본 목록이 참조하는 기사 관계다. 전체 목록 Save가 이 관계를 복제하거나 개인 읽기 목록에 기사들을 추가하지 않는다. |
| userId / savedIds | 사용자별 공개 목록 저장 관계다. 기사 북마크·개인 목록 소속·좋아요와 별도이며 서로 해제해도 영향을 주지 않는다. |
| reaction target | 박수·응답 키에 `kind`와 `id`를 함께 사용한다. `article:동일ID`와 `list:동일ID`는 별개다. 팔로우는 목록이 아닌 소유자 `FollowTarget`에 연결한다. |
| source / store | mock source는 앱 메모리 수명, store는 source별·userId별 캐시다. source 교체 시 새 캐시를 사용하고 구독을 정리한다. 전체 Reload/재실행은 인증과 개인 상태를 초기화한다. |
| auth revision / scope | `[source generation, userId, auth revision]`은 화면 초안·시트·오류 수명이다. A→B→A 및 같은 A 재로그인에서도 이전 개인 UI를 재사용하지 않는다. 프로필 이름/기본 설정 편집은 이 revision을 변경하지 않는다. |
| 목록 조회 | `read(userId) → {userId, version, lists, savedIds}`; 구조/소유자/ID/버전 검사. 조회 요청 generation과 단조 증가 version으로 오래된 결과를 차단한다. |
| 목록 저장 | `save({userId,listId,ownerId,saved,commandId})`; toggle 서버 명령 대신 목표 상태를 보낸다. 사용자 저장소의 직렬 큐와 목록별 최신 의도로 중복/연속 조작을 합친다. |
| 재시도 | 같은 의도는 같은 commandId; 적용 후 응답 유실에도 중복 집계하지 않는다. 응답 유실 중 반대 의도를 누르면 이전 확정값과 같아도 공급부에 반대 명령을 보내 최종 의도를 확정한다. |
| 실패 표시 | 쓰기 실패는 해당 인증 scope의 오류만 표시한다. 입력/응답 초안은 실패 시 유지한다. 이전 인증 수명의 늦은 실패는 새 화면 오류가 되지 않는다. |
| 접근 변경 | mock `setVisibility`와 선택적 source `subscribe/canAccess` 경계로 재현한다. 현재 목록/진행 중 조회를 무효화하고 열린 상세·작성자 카드·큐레이션·Saved lists에서 제거한다. 박수/응답은 지연 완료 직전에도 접근을 검사한다. |

**mock 기본안:** 비공개 목록은 소유자만 읽고, 삭제 목록은 누구도 읽지 못한다. 비공개/삭제 시 모든 계정의 Saved lists 관계를 제거하며 다시 공개해도 과거 저장은 자동 복원하지 않는다. 원문 기사/기사 북마크/좋아요를 삭제하지 않는다. 오류 조회는 기존 목록 내용을 계속 노출하지 않고 재시도 상태로 전환한다. 접근권한을 서버에서 강제하는 실제 API 구현은 아니다.

Save 수는 원본 비교 기준108에 **현재 mock 계정의 저장 여부**를 합한다. 박수도 기존 Goal25처럼98에 현재 계정의 기여를 합한다. A의 변화가 B의 수치에 합산되는 실제 전체 사용자 집계가 아니다. 응답도 기존 계정별 모의 세계 정책을 유지한다. 원본의 1 response는 내용·작성자 미수록이므로 실제 응답을 지어내지 않고 mock0부터 시작하며, 표시 수는 삭제되지 않은 최상위 응답 수다. 답글은 별도 수에 포함한다. 댓글 반응은 기존 boolean 계약을 유지하고 기사/목록의 최대50 정책을 댓글에 확대하지 않았다.

소유자 자기 Save 금지·미수록 대상의 초기0·재공개 시 자동 복원 안 함·알림 기반 권한 갱신은 이번 구현의 명시적 mock 정책이다. 공유 저장소를 화면별 사실 상태로 복제하지 않았다.

**박수 오류 수명 정책 보정:** 이전 AuthNavigation 검사는 A의 실패 박수 Retry가 재로그인 후에도 보존되는 동작을 기대했다. 이번 요청의 이전 인증 수명 오류 미노출 조건에 맞춰 공유 박수 오류/실패 초안만 새 revision에서 폐기하고, 확정 기여는 유지한다. 따라서 기사 박수에도 같은 경계가 적용되며 A 복귀 후 실패했던 행동은 박수 버튼을 다시 누른다. 인증 ID/개인 확정 데이터/기본 설정은 초기화하지 않는다. 관련 기존 integration assertion을 바꾸고 전체 검사를 다시 실행한다. 과거 결과 문서는 수정하지 않는다.

## 4. 실제 사용자 흐름과 검증 근거

| 흐름 | 실제 navigation/Jest | 8081 브라우저 |
| --- | --- | --- |
| Explore → 토픽 → 목록 → 기사 → 목록 → 토픽 | 새 integration 검사 | 실제 조작 확인 |
| 소유자 프로필 → Lists → 목록 → 기사/프로필 → 원래 경로 | 새 integration 검사 | 실제 조작 확인 |
| 비로그인 Save/Clap/Responses/Follow → 로그인 닫기 | 실제 AuthNavigation 및 공유 로그인 계약; 목록 target 전달 | 실제 조작 확인 |
| 로그인 사용자 취소·실패·Retry·성공 후 다시 Save | 기존 인증 통합 검사 재실행 | 성공 후 자동 Save 안 됨, 다시 실행 후109 확인 |
| 전체 목록 Save → Saved lists → 상세 → Unsave | 새 integration 검사 | 두 화면 상태와 빈 목록 확인 |
| 목록 Save와 기사 북마크 분리 | 새 integration 검사 | 목록 해제 후 기사 북마크 유지 확인 |
| 연속50 claps → 한도 → 내 기여 → Undo → 재진입 | 대상 충돌/한도/명령 검사와 navigation |148 및 disabled, Undo98 확인 |
| 응답 실패 → 초안 유지 → Retry → 작성/수정/취소/답글/삭제 | 새 navigation + 기존 응답 상태/권한 검사 | 실제 게시/수정 취소/수정 저장/답글/삭제 취소/삭제 확인 |
| Follow → 소유자 프로필 | 기존 관계 통합 계약 | Following 상태 일치 확인 |
| A 저장/응답 → 로그아웃 취소·실패·Retry → B → A | 새 실제 SessionNavigation 계정 경계 검사 | B 개인 상태 분리, A 저장/확정 응답 복원 |
| 같은 A 재로그인 | 새 실제 SessionNavigation 검사 | 별도 OS 계정 인증은 수행하지 않음 |
| A 쓰기 중 B 전환·늦은 A 응답·A 복귀 | scope/이전 응답/격리 검사 | 목록 Save 성공을5초 지연해 확인; 박수 실패도5초 지연해 B/A 새 세션 오류 격리 확인 |
| 비공개·삭제·옛 route·늦은 응답 | source/store/provider/navigation 검사 | UI 편집 없이 runtime mock source 경계로 재현 |
| 전체 Reload | 기존 메모리 source 계약 | 인증·Save·응답·테스트 권한 변경 초기화 확인 |

실제 navigation 테스트는 `AppNavigator`/`SessionNavigation`, native-stack, bottom-tabs를 사용한다. navigation 자체를 mock으로 대체하지 않았다. Jest iOS/Android 프로젝트는 플랫폼 분기 검사이며 실제 기기 실행은 아니다.

## 5. 발견한 결함과 두 차례 자체 검토

독립적인 제3자 리뷰가 아닌 동일 작업자의 자체 검토다.

| 검토 | 재현·원인 | 수정·회귀 근거 |
| --- | --- | --- |
| 구현/1차 | 공개 목록 route는 정적 preview이고 Saved lists는 안내만 존재; 타입에 list가 있어도 저장/반응이 연결되지 않음 | 공개 source/store/provider, 상세, Saved lists를 연결하고 실제 navigation 회귀 추가 |
| 1차 | 저장 적용 뒤 응답을 잃는 사이 Unsave → 기존 확정값false와 같다는 이유로 해제 명령 생략 가능 | 불확실한 쓰기를 추적해 반대 의도도 전송; 적용 후 유실/중복 Retry/마지막 해제 회귀 |
| 1차 | 계정 변경마다 응답 공급부를 새로 만들면 A 확정 응답이 사라질 수 있음 | 사용자 ID를 공급부 생성 의존성에서 배제하고 읽는 계정을 ownerFor 인자로 전달; A→B→A 실제 navigation 검사 |
| 1차 | 목록 로그인 박수가 기사 문맥을 전달할 수 있고 오래된 오류가 같은 계정 재로그인에서 남을 수 있음 | save-list/clap-list 문맥, readErrorScope 및 화면 scope 적용; 이전 인증 수명 실패 회귀 |
| 2차 | 비공개/삭제 후 작성자 Lists와 토픽 큐레이션은 정적 fixture 카드를 계속 표시 | 공개 저장소의 접근 가능한 목록으로 필터; profile→list→article 복귀/삭제 및 토픽 카드 제거 회귀 |
| 2차 | 권한을 복귀 조회에서만 확인하면 열린 상세·대기 중 반응이 접근 철회를 늦게 반영 | source 권한 알림·동기 접근 검사·조회 무효화·쓰기 완료 직전 재검사; 늦은 조회/반응 거부 회귀 |
| 2차 후속 대조 | 기존 공유 박수 저장소도 적용 응답 유실 중 Undo 목표0을 생략할 수 있고, 이전 A 쓰기 실패가 재로그인 시 오류로 남을 수 있음 | 박수 불확실 쓰기의 목표값 확정·인증 scope별 오류 수명/이전 조회 무효화; 목록 Undo 유실 및 A→B→A/같은 A 오류 회귀 추가 |
| 2차 후속 대조 | 기본 fixture ID만 아는 박수 공급부는 새 목록/변경 기준 수치에서 guest와 로그인 표시가 달라질 수 있음 | 공개 목록 공급부의 baselineClaps 조회 callback을 재사용; 새 목록 기준 수치 회귀 |
| 2차 후속 계정 경계 | B에서 비공개가 된 목록이 A 캐시에 남아 A 복귀 첫 렌더에 노출될 수 있음 | 공개 목록 hook에서 현재 source 접근 권한으로 캐시/저장 관계를 즉시 필터; A 복귀의 모든 렌더를 관찰하는 회귀 추가 |
| 2차 | 원본 대조에서 첫 기사 thumbnail/byline, Knowable avatar, Darius verified 연결 누락·본문 제목 과대 | 원본 crop7개 추가, 목록 카드16/21·제목24/30·verified 전달; 실제 캡처 재대조 |
| 검사 수정 | 권한 알림이 동기 구독이 된 뒤 테스트의 source 변경이 React act 밖에서 일어나 프로필 삭제 assertion 실패 | source 권한 변경을 `act`로 감싸 실제 업데이트를 기다림; 변경 후 해당8 suites42 tests 통과 |

2차 수정 이후 최종 타입/lint/전체 테스트와 번들·실제 브라우저 대조를 다시 실행했다. 승인 범위 밖 기능이나 신규 의존성을 추가하지 않았다.

## 6. 자동 검사·실행 결과

모든 npm 명령의 작업 디렉터리는 `FE`, Node24.18.0/npm10.9.0이다.

| 명령/검사 | 실제 결과 |
| --- | --- |
| `npm.cmd run typecheck`, `npm.cmd run lint` | 구현 중 및 2차 변경 단계 통과; lint 최대 warning0 |
| `npm.cmd test -- --runTestsByPath src/app/navigation/PublicListsNavigation.test.tsx src/features/public-lists/createPublicListStore.test.ts src/features/public-lists/publicListReactions.test.ts src/features/public-lists/PublicListProvider.test.tsx` | 2차 수정 뒤 **8 suites / 42 tests 통과**,36.839초 |
| 중간 `npm.cmd run check` | 1 failed/151 passed suites,1 failed/891 passed tests,574.083초. 작업 중 추가한 권한 알림 테스트 동기화 실패; 위 act 수정 후 focused 통과. 최종 성공으로 대체해 적지 않음 |
| 2차 `npm.cmd run check` | **152 suites/898 tests 통과**,550.85초. 이후 공유 박수 추가 결함 수정이 있어 아래 최종 검사를 다시 수행 |
| 공유 박수 수정 후 typecheck/lint 및 관련5개 테스트 파일 | 타입/lint 통과, **10 suites/54 tests 통과**,45.623초; 박수 저장소/컨트롤/목록 반응/공개 목록 navigation/박수·이력 navigation |
| 공유 박수 수정 후 전체 검사 중 발견 | 기존 AuthNavigation의 재로그인 후 과거 박수 오류 보존 기대와 현재 요구의 오류 폐기 조건이 충돌. 해당 assertion을 수정하기 위해 자체 검사만 중단했으며 이 부분 실행을 전체 통과로 기록하지 않음 |
| `npm.cmd test -- --runTestsByPath src/app/navigation/AuthNavigation.test.tsx` | 오류 수명 기대 조정 후 **2 suites/10 tests 통과**,70.099초 |
| 공개 목록 첫 렌더 권한 수정 후 typecheck/lint 및 provider/navigation 검사 | 타입/lint 통과, **4 suites/16 tests 통과**,25.233초. 기존 진행 중 전체 검사는 최종 변경과 결과를 맞추기 위해 중단·별도 로그 보관 후 다시 실행 |
| 최종 `npm.cmd run check` | **exit0, typecheck/lint 및 152 suites/906 tests 통과**,548.752초. `final-check-complete.log`; 최종 구현·수정 테스트 전체를 두 Jest 프로젝트에서 실행 |
| `npm.cmd exec -- expo export --platform all --output-dir <저장소 밖 임시경로>/export-complete` | 최종 구현 코드에서 exit0; web JS1.4MB, iOS Hermes2.8MB, Android Hermes2.8MB 생성. 실제 native build/run이 아님 |
| `git diff --check` | 통과 |

새 회귀 파일: `createPublicListStore.test.ts`(11시나리오), `PublicListProvider.test.tsx`(source 교체/unmount와 A 캐시 권한 철회 첫 렌더의2시나리오), `publicListReactions.test.ts`(4시나리오), `PublicListsNavigation.test.tsx`(6시나리오). 기존 `createClapStore.test.ts`와 `ClapControl.test.tsx`에도 각1개 경합/인증 회귀를 추가했다. 각 Jest 플랫폼에서 실행한다. 기존 인증·프로필·설정·관계·박수·응답·개인 목록/navigation 검사도 전체 실행 대상이다.

전체 Jest에서 기존 ResponsesNavigation 등의 비동기 `act(...)` console 경고가 관찰되었다. warning을 숨기거나 브라우저 오류로 혼동하지 않는다. 새 focused8 suites에서는 해당 권한 알림 경고를 수정했다. 추가 provider 검사의 render 중 외부 변수 대입은 lint가 검출해 effect로 옮겼고, 첫 화면 관찰은 layout effect에서 수행하도록 수정한 뒤 lint/회귀를 통과했다. PowerShell의 stderr `NativeCommandError` 포맷만으로 실패를 판정하지 않고 프로세스 종료 코드와 Jest summary를 확인한다.

## 7. Medium 근거·원본 비교

보관본 기준은 iOS catalog version ID1419이며 실제 제품 빌드/기기/캡처일은 미확인이다. `medium/README.md`, `REVIEW_R2.md`, `SOURCES.md`와 관련 ANALYSIS/PNG를 대조했다. 다음 화면의 원본을 직접 열어 확인했다.

| 구분 | 근거 | 적용/한계 |
| --- | --- | --- |
| 관찰 | F04 `sc_15a122b14ac84b3d80c37fb84dfae4c7`, `sc_bd0cb76562a74fb69a3569e15daf02ee` | 공개 목록 상단/하단,8 stories·108 saves·98 claps·1 response, Save/Follow/Share. 앞3편과 끝2편만 식별; 중간3편 전체 순서/본문은 만들지 않음 |
| 관찰 | Author detail Lists `sc_334d50df678445baaa7ba445c96861ba` | Jordan Gibbs의 AAA AI·2 stories·카드/표지 관찰. 해당 목록 상세·기사 제목은 미수록이므로 기사0개 안내 |
| 관찰 | Library `sc_57450c38bf994be18d95fcaf712c56ba` | Your lists/Saved lists/Digest/Highlighted 탭; Saved lists 본문 캡처라는 증거는 아님 |
| 관찰 | 비공개 확인 `sc_95e504331794455fb4776bd322254c76` | 다른 독자의 Library에서도 저장 목록이 제거된다는 안내 |
| 관찰 | 삭제 확인 `sc_a1562b1931fc4650a544861094934588` | 다른 독자의 Library에서도 목록 제거, 포함 기사 원문은 삭제하지 않는다는 안내 |
| 공식 설명 | [Create and manage lists](https://help.medium.com/hc/en-us/articles/214993247-Create-and-manage-lists) | 2026-11-20 조회, 문서 표시 갱신11-11: 전체 Save→Saved lists, 비공개는 소유자만 접근. 최신 도움말을 보관본 동일 버전 증거로 사용하지 않음 |
| 공식 설명 | [About claps](https://help.medium.com/hc/en-us/articles/115011350967-About-claps) | 조회일 동일, 표시 갱신11-13: 기사·목록 최대50/Undo. 기사 작성자별 기여 열람 설명을 목록/댓글 정책으로 임의 확대하지 않음 |
| 공식 설명의 한계 | [Write a response](https://help.medium.com/hc/en-us/articles/214578008-Write-a-response) | 기사 응답 설명이며 목록 Responses 펼친 UI가 같다는 근거는 아님 |
| 추가 조회/미수록 | Gummble search `5ade4e94-49bf-4cf4-b952-10d1261355cd` | “Medium Saved lists library and list responses claps readers” 조회. 반환2장은 Digest `sc_a42fffc3afb34954bc5e4afcc2e08e04` 및 위 비공개 확인; 둘 다 열어 확인했으나 누락 화면을 확보하지 못함. 별도 버전 동일성 미확인 |
| 자체 보완 | Saved lists 카드/빈 상태, 목록 Responses 재사용 UI, 내 기여만 있는 Claps 시트, 오류·재시도·mock 인증 | 기능 검증용 UI이며 원본 동일 재현 미완료. 다른 박수 참여자·미수록 응답·미수록 본문은 원본처럼 생성하지 않음 |

공개 목록의 더보기 버튼은 관찰했으나 방문자 메뉴를 펼친 전체 배치는 미확인이다. 현재 Share/Undo claps/Report 연결은 기존 공유·박수·신고 계약을 재사용한 mock 보완이며, 내 목록 관리 메뉴 원본의 편집/정렬/공개 범위 변경은 Goal33 범위로 남긴다.

비교 환경: Windows Edge `157.0.4341.60`, Playwright 실제 브라우저,393×759/DPR1/en-US/light/fontScale1/reduced-motion, guest/스크롤 상단 및 Follow 하단. HEAD da38ae2 이후 미커밋 코드, normal fixture. 원본1179×2556을393×852로 정규화하고 y59~818을 잘라 앱 영역393×759로 비교했다. 이것은 실제 iPhone Safe Area/DPR 검증이 아닌 비교용 정규화다.

실제 캡처 두 쌍에 side-by-side/50% overlay/diff를 생성해 확인했다. 임의의 일치율은 계산하지 않았다.

| 항목 | 원본 정규화 관찰 / 구현 실측 | 남은 차이 |
| --- | --- | --- |
| 목록 제목 | 원본 한 줄, x약24/y약124; 구현 x24/y120/w345/h60,24px/30px/800 | Windows 대체 글꼴에서 두 줄; 원본 font 파일 미확보, 높이·뒤 콘텐츠 위치 차이 |
| 소유자 avatar | 원본 x24/y약53/48×48; 구현 소유자행 x24/y56/w345/h48 | 원본 글꼴 baseline/촬영 crop·날짜 띄어쓰기 차이 |
| 첫 기사 byline/사진 | 원본 byline y약226, 사진 x289/y약258/80×56; 구현 기사 진입영역 x24/y269/w345/h91 | 제목 줄바꿈의 누적 차이; 원본 앞쪽 기사 구분선 y약392, 구현 y442 |
| 터치 영역 | 구현 Back x8/y0/48×48, Save x289/y0/48×48; Response/Share 각각48×48 | 아이콘 벡터 모양·선 두께는 원본과 다름 |
| 반응 pill | 구현 버튼 y645/48높이; 원본 pill 외곽 y약654~694 | 원본 응답1과 mock0은 별개; guest 초기 조회는 잠시 `—`, 완료 후0. 로그인 시 내 기여 버튼 구성에 따른 폭 차이 |
| 하단 More from | 동일 소유자/소개/Follow 연결; 구현 Follow74.47×48 | 미수록3편 생략과 명시적 안내로 scroll 길이·위치 다름, 제목/소개 크기·줄바꿈·여백 차이 |
| Saved lists/Responses | 실제 동작/캡처 확보 | 대응하는 원본 본문 미수록이므로 동일 시각 판정 보류 |

새 자산은 보관 PNG에서 추출한 UI 콘텐츠 crop이며 원본 파일은 변경하지 않았다. F04/04의 원본 pixel box `(left,top,right,bottom)`: working-morning `(867,952,1107,1120)`, daily-notes `(867,1524,1107,1692)`, denis-volkov `(72,1428,144,1500)`, public-list-curious `(72,856,144,928)`, knowable `(72,1998,144,2070)`. F04/05: oprah-morning `(867,1323,1107,1491)`, insider `(72,1227,144,1299)`. 신규 자산은 `FE/assets/medium`에 있고 원본 화면 ID는 위 표를 따른다.

## 8. 브라우저·접근성·플랫폼

- 브라우저 정상 흐름10묶음·추가 권한/계정 경계5묶음은 pageerror/console error0. 최종 권한 처리 변경 후 정상/장애/계정 경계 흐름도 다시 통과했다. A 쓰기를5초 지연한 동안 B 로그인, 늦은 A 성공, A 복귀를 확인했고 비공개 전환 시 열린 응답 초안·목록·큐레이션·Saved lists 제거, 재공개 후 저장 관계 미복원, 삭제와 Reload 복구를 확인했다.
- 장애 흐름7묶음은 초기 실행 오류0이었고 최종 재실행에서도 행동 검사는 모두 통과했으나 `Failed to load resource: net::ERR_NO_BUFFER_SPACE`가1건 기록됐다. 이를 `browser-fault-resource-error.json`으로 보존했다. 요청 실패 URL 수집을 추가한 재실행에서는7묶음 모두 통과했고 console/page 오류0·requestfailed0으로 재현되지 않았다. 최초 요청 URL이 없어 원인은 확정하지 않으며 전체 이력을 오류0으로 바꾸지 않는다.
- 추가 박수 경계2묶음도 실제 브라우저에서 오류0으로 통과했다. 박수를 적용한 뒤3초 지연 후 응답을 유실시켜 Undo0이 공급부/화면 양쪽에 반영되는지 검사했고, A의5초 지연 실패 중 B 전환 후 A 재로그인에서 과거 Retry가 노출되지 않고 새 박수는 가능함을 확인했다. runtime source 조작은 Reload로 복원했다.
- 320px에서 가로 document overflow 없음, 긴 한국어 저장 목록300개와 스크롤·모달/뒤로 복귀 확인. 작은 폭 기사 행은 세로 배치한다. light/system dark 및 CSS160% 글자 확대를 캡처했다.
- 별도 runtime mock에서 기존 fixture 기사36편과 긴 한국어 제목을 묶어320px 상세 스크롤 높이7934px, 가로 overflow 없음, 끝의 Follow 도달을 확인했다. 목록 기준 박수123을 guest/로그인에서 유지하고124로 증가했다. 이36편 구성/순서는 부하·배치 검증용이며 Medium 원본 목록이라고 기록하지 않는다. Reload로 폐기했다.
- Save 선택·busy/disabled, 박수 접근성 값/한도·버튼 label,48×48 터치 영역을 확인했다. Responses Escape 후 `Responses, The power of a morning routine` 버튼으로 DOM 포커스가 복귀했다.
- 응답 입력은 높이430px로 줄인 viewport에서 제출/삭제/취소/닫기를 확인했다. 합성 compositionstart/end와 한글 문자열 입력 후 게시를 확인했다. **실제 OS 키보드/한글 IME/접근성 글자 확대/VoiceOver/TalkBack 검증은 아니다.**
- Windows에 `adb`, `emulator`, `java`, `xcodebuild` 명령이 없고 Android SDK/JAVA_HOME/ANDROID_HOME이 없다. 실제 Android native build/run은 JDK·Android SDK·에뮬레이터 또는 기기가 필요하다. iOS는 macOS·Xcode·시뮬레이터/기기가 필요하다.
- iOS/Android Hermes export와 Jest 플랫폼 프로젝트는 통과 범위를 별도로 기록하며 설치·실행·서명·OS 뒤로 가기/제스처·기기 Safe Area를 증명하지 않는다. 이 항목은 검증 잔여다.
- 브라우저 장애 재현에 바꾼 publicList/clap/response preview 설정은 모두 `normal`로 복원했다. runtime source 변경은 새로고침으로 폐기한다.

임시 산출물 위치: `C:\Users\leehg\AppData\Local\Temp\kostolany-goal32-5f0d5d56103f4567af0b124e073f3077`. `browser-full-report.json`, `browser-fault-report.json`, `browser-boundary-report.json`, `browser-long-detail-report.json`, `browser-clap-boundaries-report.json`, `comparison-metrics.json`, `comparison-{top,bottom}-{side,overlay,diff}.png`, 실제 캡처, `review1-check.log`, `review2-focused.log`, `final-check.log`, `clap-final-regression.log`, `auth-scope-regression.log`, `access-final-regression.log`, 중간 중단 로그, `final-check-complete.log`, `export-complete.log`와 `export-complete` 출력이 있다. 저장소에 포함하지 않았으며 OS 임시 파일 정리 시 사라질 수 있다. 재현 조건·결론은 이 문서에 남긴다.

## 9. 8081 최종 확인 순서

1. 기존8081을 열고 전체 Reload한다. Explore(탐색) → Life → Self Improvement → See the full list로 들어간다. 제목/Medium Staff/8 stories/108 saves와 확인 가능한5편을 확인한다.
2. 비로그인 Save/박수/Responses 작성/Follow에서 로그인 화면을 열고 닫는다. 모의 결과 선택에서 사용자 취소·실패 후 Retry를 확인한다. A 로그인 성공 직후는 저장 전이며, Save를 다시 눌러109가 되는지 확인한다.
3. 첫 기사를 열어 설명 수준을 바꾸고 기사 북마크의 Save to에서 읽기 목록을 선택한다. 공개 목록으로 돌아와 Library → Saved lists → 같은 목록으로 들어간다.
4. 목록을 Unsave하고 기사 북마크는 유지되는지 확인한다. Saved lists가 비는 것을 확인한 뒤 목록만 다시 Save한다.
5. 목록 박수를 연속 입력해50회 한도/총148을 확인한다. 수치 버튼의 내 기여 → Undo 또는 목록 메뉴의 Undo claps로98로 돌아오는지 확인한다.
6. Responses에서 한국어 작성 → 수정 취소 → 수정 저장 → 답글 → 삭제 취소/확인을 수행한다. 최상위 응답 수와 답글 표시를 구분한다. 닫으면 원래 목록으로 돌아온다.
7. 하단 Follow → Medium Staff 프로필의 Following을 확인하고 Lists에서 목록을 다시 연다. 기사/소유자 프로필 진입 후 Back으로 원래 경로에 복귀한다. Share는 해당 목록 안내만 열리는지 확인한다.
8. Profile → Settings에서 로그아웃 취소·모의 실패·Retry 후 B로 로그인한다. B의 Save/박수/응답 상태는 A와 분리된다. 다시 A로 로그인하면 A 확정 데이터는 유지되고 이전 시트·초안은 없다.
9. 전체 Reload하면 로그인과 개인 상태가 초기화된다. 비공개/삭제는 제품 편집 UI를 추가하지 않았으므로 source의 `setVisibility`를 사용하는 회귀 테스트로 재현한다.

Goal32의 기능·자동 검사·원본 대조·native 검증 상태를 구분해 보고한 뒤 종료한다. 후속 개발·커밋·push·배포는 수행하지 않는다.
