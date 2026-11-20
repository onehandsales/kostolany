# Goal 33 — 내 목록 메모·정렬·공개 범위·편집·삭제

실행일: 2026-11-20 KST · Windows PowerShell · `D:\git_repository\kostolany_project`.

**판정: 구현 완료·검증 잔여.** 목록 편집과 공개 목록의 실제 mock 원본을 연결했다. 아래 자동 검사·웹 검증과 원본 동일 재현·실제 native 검증은 별개다. 원본에 없는 정책, 정렬 화면 구조/폰트 차이, 실제 OS 입력·접근성·native 실행이 남아 있으므로 Goal33 전체 완료로 판정하지 않는다.

## 승인과 시작 상태

- 최신 승인은 Goal32 로컬 커밋과 Goal33 구현·두 차례 자체 검토·검증·결과 기록까지다. 과거 Goal25~35 연속 실행/커밋/push 지시는 적용하지 않았다.
- Goal32 시작 HEAD `da38ae2`의 변경과 결과 문서·검사 로그·검사 이후 변경 시각을 대조했다. 별도 사용자 변경은 없었으며 Goal32 47개 파일만 **`4dabf10` — `feat(fe): implement public lists and saved list reactions for goal 32`**로 로컬 커밋했다. ENV·캡처·로그·임시 파일은 포함하지 않았다. Goal33 시작 상태는 이 커밋 직후 clean이다.
- Goal32의 152 suites/906 tests는 당시 기록이다. Goal33 검사로 재사용하지 않는다. Goal32 결과 문서는 당시 이력으로 보존했다.
- Node24.18.0/npm10.9.0, Expo57.0.33/RN0.86.3, 기존8081 PID5248을 확인했다. 서버 재시작/중복 서버, 의존성/lockfile/ENV/medium 원본 수정은 하지 않았다.
- AGENT README·PROJECT_SCOPE·공통/API/UX·현재 상태와 FRONT README/6개 규칙, Goal33/C28·C31~35, 선행 Goal32와 목록/인증 코드를 확인했다. 새 설명 주석은 한국어 한 문장·한 줄, 새 테스트 시나리오는 한국어다.
- Goal33 변경은 미커밋이며 push·배포·실제 서비스 연결을 하지 않는다. Goal34 이후는 시작하지 않는다.

## 구현과 상태 계약

| 대상 | 구현과 저장 경계 |
| --- | --- |
| Save to·생성 | 여러 목록의 선택은 시트 초안이다. Cancel/뒤로 닫기는 소속을 바꾸지 않고 Done은 직접 변경한 행만 적용한다. 시트 안에서 생성 완료한 목록은 선택 취소 후에도 빈 목록으로 남는다. |
| 제목·설명 | 기존 생성/편집 폼을 사용한다. 이름 60코드포인트, 설명 선택 입력/280코드포인트 정책을 유지한다. 편집 폼에서 공개 범위를 직접 바꾸는 스위치를 제거해 별도 확인을 우회하지 않는다. |
| 메모 | `notes[articleId]`는 사용자 소유 목록의 기사 관계다. Add/Edit·Cancel·Done·실패 입력 보존·재시도·빈값 지우기를 연결했다. 다른 목록의 같은 기사와 원본 본문은 바꾸지 않는다. |
| 순서 | `articleIds`의 순서를 사실 상태로 사용한다. 편집기 안에서만 드래그/접근성 위·아래 이동 초안을 변경한다. Cancel은 확정 순서를 유지하고 Done/Retry만 저장한다. 기사 구성이 달라졌으면 오래된 초안을 거절하고 최신 기사로 다시 편집하도록 안내한다. |
| 공개 범위 | Make private/public 확인·취소·실패/재시도를 연결했다. 확인 창이 열린 시점의 목표를 고정한다. 비공개에도 잠금 표시와 공유 아이콘이 있다. 공유는 목록 대상 안내이며 OS 공유/링크 발급은 아니다. |
| 제거·Undo | 제거는 해당 관계와 메모만 지운다. Undo 토큰은 사용자·인증 scope·목록·기사·제거 번호·이전 메모·인접 기사/인덱스를 가진다. 살아 있는 다음 기사 앞, 이전 기사 뒤, 둘 다 없으면 이전 인덱스 범위 안 순으로 복원한다. 현재 다른 기사 순서는 유지한다. |
| 삭제 | 사용자 목록만 확인 후 삭제한다. 취소는 유지한다. 실패는 Library에서 목록을 복원하고 재시도한다. 기본 Reading list는 UI와 source 양쪽에서 삭제/이름/공개 상태 변경을 거절한다. |
| 공개 목록 연결 | `UserListSource`가 제목·설명·메모·기사 구성/순서·공개 상태의 원본이다. 공개 목록 source는 같은 catalog를 투영한다. 별도 공개 fixture를 수정해 연동을 대신하지 않았다. |
| 방문자 Saved lists | 전체 목록 저장은 기존 Goal32 관계다. 소유자의 확정 편집을 같은 공개 상세에서 읽는다. 비공개/삭제 알림은 저장 관계를 제거하고 열린 상세·오래된 route·대기 응답에서 접근을 차단한다. 다시 공개해도 이전 저장 관계를 자동 복원하지 않는다. |
| 기본 읽기 목록 | 앱 기본 source는 Reading list도 같은 목록 저장소에 보관한다. 기존 북마크 인터페이스는 이를 투영한다. 메모/순서가 가능하며 기사 북마크와 읽기 목록 원본이 분리되지 않는다. 기존 주입 source의 이전 계약은 호환한다. |

### 식별자·권한·수명

- 소유 원본 키는 `(userId, listId)`, 기사 관계 키는 여기에 `articleId`를 더한 값이다. 같은 문자열 목록 ID를 다른 사용자가 가져도 별개다. 공개 route ID는 `owned:` + `[ownerId, listId]`의 JSON이므로 충돌하지 않는다.
- 공개 목록 저장은 `(방문자 ID, 공개 목록 ID)` 관계다. 기사 북마크/개인 목록 소속/기사 좋아요·박수·응답/소유자 Follow와 합치지 않는다. 목록 저장으로 기사를 복사하거나 자동 Follow하지 않는다.
- 목록 반응은 기존 `{kind:'list', id}` 계약을 유지한다. 목록 편집/삭제는 원본 기사, 다른 목록 소속, 기사 반응 저장소를 삭제하지 않는다.
- 저장소 명령의 `userId`는 mock 호출 주체다. 해당 사용자의 소유 map에서 update 대상을 검사하고 없는 목록 update를 거절한다. UI는 현재 사용자의 목록 entry에서만 편집기를 연다. 실제 서버 인증/인가를 구현한 것은 아니다.
- 인증 revision은 로그인 수명을 구분한다. A→B→A/같은 A 재로그인에서 개인 navigation·시트·초안·오류는 새 수명으로 시작한다. 확정 원본은 같은 앱 실행 안에서 사용자별로 유지한다. 이미 제출한 A 명령은 A 원본에만 반영되며 B에 노출하지 않는다.
- 이전 수명의 목록 오류는 재로그인 화면에 복원하지 않는다. 실패한 미확정 생성은 새로 제출해야 한다. 이는 과거 일부 테스트가 기대하던 목록 오류 재노출을 수정한 정책이며, 새 요청의 계정 경계 요구를 따른다. 성공한 명령은 실제 source에 보존한 후 재조회한다.
- 프로필 공개 이름/소개는 기존 profile store의 조회된 공개 필드만 참조한다. 이름/기본 설명 설정 변경은 인증 revision이나 공개 navigation을 재생성하지 않는다.
- source 교체는 새로운 저장소 범위다. unmount에서 구독/조회 세대를 해제하며 이전 source의 응답은 새 범위에 들어가지 않는다. 전체 브라우저 Reload/새 앱 실행은 메모리 인증·목록·저장·메모를 초기화한다. 실제 native 프로세스 재실행은 미검증이다.

### 비동기·실패·충돌

- 목록별 쓰기를 직렬 처리하고, 확정값/최신 제출 목표/로컬 편집 초안을 구분한다. 오래된 조회는 쓰기 revision/조회 generation으로 거절한다. Save/Done 전 초안은 다른 화면에 반영하지 않는다. 제출 뒤에는 처리 중 표시와 낙관적 상태를 사용하며 실패 시 확정값으로 복구한다.
- 같은 의도의 재시도는 `commandScope + commandId`를 재사용한다. source는 적용 명령을 기억해 응답 유실 후 중복 생성/변경 알림을 막는다. 응답 유실 후 반대 의도도 실제 쓰기로 보낸다.
- update는 `expectedContent`와 현재 원본을 비교한다. 다른 작업으로 기사가 제거되거나 순서/정보가 바뀌었으면 오래된 전체 내용을 덮어쓰지 않는다. 최신 원본과 충돌 안내를 보여주며 사용자가 다시 확인/편집한다. 삭제된 목록은 tombstone으로 보호한다.
- source가 적용한 성공 응답이라도 늦게 도착한 시점에 원본이 이미 삭제/변경되었으면 현재 catalog를 확인해 부활/역전을 막는다.
- 메모/정렬 저장 실패는 편집 초안을 유지한다. 원본에서 해당 기사/목록이 없어졌으면 편집기를 닫는다. 정렬 중 기사 구성이 바뀌면 최신 기사 재편집이 필요하다.
- Undo는 해당 제거 수명에서만 유효하다. 연속 제거의 화면 토스트는 가장 최근 제거를 가리킨다. 같은 기사 재추가/재제거, 다른 계정/로그인 수명, 삭제된 목록에서는 오래된 Undo를 적용하지 않는다. 보존할 인접 위치가 달라지면 위의 앵커 정책을 사용한다.

## 원본 근거와 미확인 정책

`medium/README.md`, `REVIEW_R2.md`, `SOURCES.md`, F04·F16·F37·F41·F42·F45·F46·F47·F48·F49·F50·F51·F55의 관련 분석/PNG를 확인했다. 관련 고유 PNG46장을 외부 임시 contact sheet8장으로 열어 관찰했다. 이는 46장 모두를 실제 구현과 동일 재현 비교했다는 뜻이 아니다.

| 구분 | 확인 내용 |
| --- | --- |
| 보관본 관찰 | iOS version ID1419. Save to/새 목록, 메모 입력과 기사 위 메모, 드래그 표시·Cancel/Done, 비공개 경고/잠금, 제거 Undo 표시, 삭제 확인을 확인했다. 빈 메모에서도 Done은 녹색이다. |
| 현재 공식 설명 | [Create and manage lists](https://help.medium.com/hc/en-us/articles/214993247-Create-and-manage-lists)를 이번에 열었다(페이지 갱신2026-11-11). 앱의 다중 목록 저장, 선택 입력 설명, public/private, 메모, 재정렬, 기본 Reading list 삭제 불가를 대조했다. 보관본과 같은 앱 버전의 화면이라고 보지 않는다. |
| 추가 검색 | Gummble medium-ios 검색2회(`7544101c-1be7-4fa0-bd74-dde0b8b0868b`, `6bd963c4-a13f-4201-a88e-8ae89361c4f6`). 반환된 `sc_64b75d913b284d708ab44e4f3663a59f` 상세는 Custom app icon 화면으로, 미수록 편집 정책의 증거가 아니었다. 필요한 빈값/Undo 결과/편집 폼을 추가 확보하지 못했다. 원본 PNG/문서는 수정하지 않았다. |
| 자체 보완 | 빈/공백 메모 Done은 기존 메모 지우기, 비어 있으면 변경 없음으로 처리한다. 임의 최대 길이/멤버십 제한은 추가하지 않았다. 메모는 목록 공개 범위를 따른다는 mock 기본안이다. Undo 위치/충돌, 재시도/계정 수명, 접근성 이동 버튼, View list 진입, 편집 폼/정렬 시트는 구현 기본안을 명시한다. |
| 미확인 | 실제 Medium의 메모 빈값 저장·삭제 방식·최대 길이·세부 가시성, 실제 Undo 결과/유효 시간/경쟁 정책, 편집 폼 정확한 UI, 원본 폰트·벡터, Android 대응 화면은 미확인이다. 녹색 Done만으로 빈값 저장 정책을 확정하지 않았다. |
| 제외/보존 | Digest·다운로드·실제 공유/링크·검색 유형 확장은 하지 않았다. 기존4단계 설명·기본 설정·개인 목록·mock A/B 계정과 기존 반응 계약을 유지한다. 실제 OAuth/백엔드/Storage/RSS/AI/결제/알림 발송은 연결하지 않았다. |

## 두 차례 자체 검토와 결함 수정

두 검토는 같은 작업자의 **자체 검토**이며 독립적인 제3자 검토가 아니다.

| 단계 | 재현·원인 | 수정·확인 |
| --- | --- | --- |
| 1차 | 목록 순서를 바꿔도 목록 equality가 집합으로 비교하고 화면은 fixture 순서로 필터했다. | 순서까지 비교하고 저장된 ID 순서로 렌더링. 순서 저장/재진입·취소/실패 검사. |
| 1차 | 메모/정렬 메뉴는 안내뿐이고 공개 목록 source는 소유 목록과 별개였다. | 관계 메모/정렬 편집기, canonical catalog 투영/변경 구독, 소유 편집→방문자 상세/Saved lists 연결. |
| 1차 | 비공개가 즉시 적용되고 편집 폼 스위치로 확인을 우회할 수 있었다. | 별도 확인 창과 취소/실패/재시도. 정보 편집은 제목/설명만 제출. |
| 1차 | 응답 유실 뒤 같은 생성/메모를 재시도하면 다른 명령이 되고, 이전 확정값과 같은 삭제 목표는 전송하지 않을 수 있었다. | 안정 명령 ID와 uncertain 상태, 실제 적용 후 응답 유실 회귀 검사. |
| 1차 | 메모 전송 중 다른 요청이 기사를 제거하면 오래된 전체 목록이 기사를 되살릴 수 있었다. | expectedContent 충돌 검사, 최신 원본 복구/재편집. 목록/기사 제거 경합 검사. |
| 브라우저/2차 | 비공개 저장의 낙관적 값이 확인 창 prop을 반전시켜 public 확인으로 바뀌고 닫히지 않았다. | 확인 목표를 로컬 수명에 고정. 실제 navigation 실패/재시도와8081 취소/확정 회귀. |
| 브라우저/2차 | 드래그 중 responder 재생성과 FlatList 행의 상대 좌표로 위치 변경이 적용되지 않았다. | 행 높이 누적 위치, 안정된 responder/callback, 이동 중 스크롤 잠금과 접근성 위/아래 이동. 웹 마우스와 CDP 합성 터치로 순서 변경 확인. |
| 2차 | 늦은 성공 응답 전에 원본 목록을 삭제하면 로컬 entry가 되살아날 수 있었다. | 수신 시 현재 catalog까지 확인. 삭제 후 늦은 성공 회귀 검사. |
| 2차 | 기본 북마크 source의 직접 인터페이스와 관리 Reading list 원본이 분리될 여지가 있었다. | 관리 모드의 기존 인터페이스도 같은 원본으로 위임하고 사용자별 연속 쓰기를 직렬화. 계약 간 메모/순서/제거 일치 검사. |
| 2차 추가 확인 | 공개 목록 fallback source가 useMemo 최적화 캐시에 사실 상태 수명을 맡겼다. | provider의 상태로 수명을 소유하도록 수정. 일반 재렌더의 저장 관계 유지·소유 source 교체 시 새 원본/개인 관계 초기화·늦은 이전 변경 격리 검사. |
| 2차 | 이전 세션의 목록 오류와 실제 source에 저장하지 않은 테스트 성공 응답이 재조회 정책과 충돌했다. | 이전 오류 제거, 테스트 성공을 원본 적용 후 반환하도록 수정. A/B/A·동일 A·source 교체 회귀 유지. |
| 시각/2차 | 메모 편집기 여백과 작성자 아바타가 원본과 달랐다. | 본문 여백/카드 간격 보정과 기존 byline 재사용. 실제 PNG/DOM 좌표를 다시 비교. 폰트·줄바꿈·crop 차이는 잔여. |
| 전달 전 표시 검토 | 내 목록 공유 안내 제목에 내부 직렬화 ID가 노출되었다. | 공유 대상으로 ID/제목을 보관하되 사용자에게는 제목만 표시하도록 정리했다. 이후 타입/lint·목록 navigation32 tests·비공개 공유 진입 브라우저·전체 플랫폼 export를 다시 확인했다. 실제 공유 실행을 추가하지 않았다. |

## 사용자 흐름 검증 상태

| 흐름 | 자동 검사 | 8081/한계 |
| --- | --- | --- |
| 기사→Save to→새 목록/다중 선택→Done→Library→기사→목록 복귀 | 기존 ListManagement/Bookmark navigation과 새 ListEditing navigation | 실제 생성·기본/사용자 다중 저장·기사 진입/복귀 확인. |
| Save to 선택 취소·생성 후 선택 취소 | 기존 navigation 검사 유지 | 선택 초안/확정 관계는 자동 검사에서 확인. |
| 제목/설명 편집 취소·실패·입력 보존·재시도 | 기존 ListManagement navigation | 실제 설명 저장/재진입, 제목/설명 저장 실패 입력 보존·Retry 확인. |
| 메모 추가·수정·취소·지우기·실패·재시도 | 새 navigation/source 검사 | 실제 메모 취소·실패 입력 유지·Retry·표시 확인. 빈값/지우기는 실제 navigation 검사. |
| 다른 목록의 같은 기사 메모 격리 | 새 listEditing store 검사 | 관계 단위 원본을 검사. 브라우저에서 별도 두 목록 메모를 모두 반복 입력하지는 않았다. |
| 순서 Cancel/Done·실패/재시도·재진입 | 새 navigation/store 검사 | 실제 마우스 드래그 Cancel/Done, 저장 실패/Retry, canonical 순서 일치, 웹 합성 터치와46개 기사 스크롤/이동 확인. native 터치 아님. |
| 제거·Undo·연속 제거/정렬·삭제 경합 | 기존/새 store 및 navigation | 실제 제거/Undo로 위치·메모 복원. 경합은 제어된 source/Promise 검사. |
| 삭제 취소·실패·Retry·Reading list 보호 | 기존 navigation/source + 새 managed source 검사 | 실제 취소/확정·실패 후 Library 복원/Retry·기본 삭제 메뉴 없음·원본 기사/기본 저장 유지 확인. |
| A 공개 목록을 B가 저장하고 소유 편집 반영 | 새 실제 navigation/store | B 실제 Save→A의 편집/메모/정렬 UI→B Saved lists/같은 내용 확인. 열린 공개 route를 유지하기 위한 로그인/로그아웃 진입만 mock auth store로 호출하고 확인·계정 선택은 UI로 조작했다. 별도로 canonical source 변경 주입도 검사했다. 두 기기 동시 조작은 아니다. |
| 비공개 취소/확정·방문자 철회·오래된 route | 새 navigation/store | A의 실제 UI 취소 후 B 저장 유지, 확정 후 B 오래된 route 접근 불가/Saved lists 제거, A 삭제 후 B 관계 복원 없음 확인. 별도로 B 기사 진입 중 canonical 비공개 변경을 주입해 복귀도 확인했다. |
| 원본 기사·다른 소속·북마크·기사 반응 보존 | 기존 ListManagement + 새 listEditing 검사 | 실제 사용자 목록 삭제 후 Reading list의 같은 기사 유지. |
| A→B→A·같은 A·초안/오류/시트 | 기존 Auth/LibraryInteractions + 새 navigation | B→설정 로그아웃→A UI 로그인·확정 데이터 복원. 동일 A 이전 초안 폐기는 navigation 검사. |
| 새로고침/재실행 | source/provider 수명 검사 | 브라우저 Reload에서 인증/목록/저장 초기화 확인. 실제 native 프로세스 재실행 미검증. |

`AppNavigator`/`SessionNavigation`을 실제 React Navigation과 provider로 렌더링했다. navigation 자체를 mock하지 않았다. native 환경 경계를 대역화한 Jest 검사는 실제 기기 실행과 구분한다.

## 명령·환경·검사 결과

외부 임시 경로 `T`:
`C:\Users\leehg\AppData\Local\Temp\kostolany-goal33-2cb7cc89243b44fbb43fe5bafbf7c435`

저장소에는 결과 문서와 앱 코드/회귀 테스트만 둔다. `TODO/evidence`, `TODO/_evidence`, 별도 비교 HTML/로그/검증 스크립트를 새로 만들지 않았다. 외부 임시 파일은 영구 보관을 보장하지 않으므로 본 문서에 출처/조건/판정을 함께 기록한다.

- `FE`에서 `npm.cmd run check`: **exit0, typecheck·lint·전체156 suites/940 tests 통과(578.413초)**. `T\final-complete.log`. iOS/Android Jest 설정 합산이며 실제 native 실행이 아니다. Goal32 결과로 대체하지 않았다.
- 전체 검사 후 `ReadingListScreen`의 공유 안내 표시만 정리했다. ID/제목 대상 보관과 제목 표시를 분리한 뒤 `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd test -- --watch=false --runTestsByPath src/app/navigation/ListEditingNavigation.test.tsx src/app/navigation/ListManagementNavigation.test.tsx`를 다시 실행했다. **exit0,4 suites/32 tests 통과(45.103초)**, `T\final-share-regression.log`. 이 최종 표시 변경 이후 전체940개를 다시 실행했다고 표현하지 않는다.
- 전체 Jest 로그에는 일부 navigation 검사에서 비동기 갱신의 `act(...)` 경고가 남는다. 검사 실패는 아니며 경고 없는 Jest 실행으로 보고하지 않는다. 실제 브라우저 console/page 오류0과 구분한다.
- 추가 `listEditing.test.ts`: 메모/순서/Undo, 기본 목록 단일 원본, 소유 편집→공개 상세/Saved lists, ID 충돌/권한, 응답 유실/중복, 기사 제거 충돌, 삭제 후 늦은 성공, 이전 인증 실패를 검사한다.
- 추가 `ListEditingNavigation.test.tsx`: 실제 목록/기사 복귀, 메모 실패/취소/지우기/Undo, 정렬 취소/Retry/공개 반영, 비공개 목표/방문자 철회, 동일 A/B 초안 수명 네 시나리오를 iOS/Android Jest 설정에서 실행한다.
- 수정 기존 검사: `createUserListStore.test.ts`, `createLibraryStore.test.ts`, `LibraryInteractions.test.tsx`, `ListManagementNavigation.test.tsx`, `AuthNavigation.test.tsx`, `PublicListProvider.test.tsx`. 새 정책/실제 source 적용/오류 수명과 일치하도록 변경하고 일반 재렌더/source 교체를 검사했다.
- 중간 검사 `editing-focused.log`:6 suites/46 tests 통과. `navigation-fixed.log`:6 suites/42 tests 통과(103.812초). 중간 전체 `review1-full.log`:154 suites 중4실패,926 tests 중7실패(591.298초); 이전 정책 기대/미저장 성공 대역/중복 오류 표시를 수정했다. 중간 실패 수치나 통과 수치는 최종 결과를 대신하지 않는다.
- 이후 `final-check.log`:156 suites 중2실패/938 tests 중4실패(606.588초). 원본에 적용하지 않은 createLibraryStore 테스트의 성공 대역을 수정했다. `library-regression.log`2 suites/12 tests, 최종 provider/목록 검사는 `lifetime-final.log`4 suites/18 tests(9.359초) 통과. 최종 전체 재검사를 별도로 수행했다.
- `python -X utf8 T\browser33.py`: 정상/장애/계정/초기화 11개 단계 통과, console/page 오류0. 393×759/DPR1/Edge headless/light, 320px·dark·CSS160% 캡처 포함. `browser33-report.json`에 취소/확정 순서와 캡처를 기록했다.
- `python -X utf8 T\failures33.py`: 생성 적용 후 응답 유실/중복 방지, 제목·설명 실패/입력 보존, 정렬 실패 초안/Retry, 비공개 실패/Retry, 제거 실패/복구/Retry/Undo, 삭제 실패 Library 복원/Retry, 조회 실패/Retry의7개 단계 통과·console/page 오류0. 장애는 실행 중 mock source wrapper로만 주입했다.
- `python -X utf8 T\owner33.py`: B 저장→A 실제 정보/메모/순서 편집→B Saved lists, 비공개 취소/저장 유지, A UI 비공개 확정/B 오래된 route 철회, A UI 삭제/B 관계 미복원4단계 통과·console/page 오류0. 인증 진입만 mock store를 사용했으며 확인·계정 선택과 편집은 UI다. 마지막 표시 정리 후 비공개 Share 아이콘→정확한 목록 제목 안내→닫기도 다시 확인했다.
- `python -X utf8 T\visual33.py`: 원본 기사 fixture를 canonical source에 시드한 비교 조건이다. 메모 autofocus/Escape 원래 버튼 복귀, 48×48 drag/Cancel/Done, 긴 한글·40줄 메모·320×600폭, 합성 composition/Enter, 기존46개 기사로 만든 스트레스 목록의 스크롤/마지막 기사 이동을 확인했다. console/page 오류0. 실제 한글 OS IME 검사가 아니다.
- `python -X utf8 T\compare33.py`: 원본/실제8쌍 side-by-side·50% overlay·absolute RGB diff를 저장했다. diff는 상태·글꼴·배경 차이를 포함하므로 일치율을 계산하거나 동일 재현 증거로 사용하지 않는다.
- `npx.cmd expo export --platform all --output-dir T\export-delivery`: 마지막 표시 정리 후 **exit0**. web JS1개와 iOS/Android Hermes bundle 각1개를 생성했다. iOS `index-93858724d91b2c1ac6bb4b5d72403784.hbc`, Android `index-6a1a93b6c5818ee8644805a2b3ae09cf.hbc`이며 각 약2.8MB다. 실제 native build/run은 아니다. 개발 서버는 그대로 사용했다.
- `git diff --check` 확인. 장애 주입은 브라우저 실행 중 source wrapper만 변경했으며 Reload/컨텍스트 종료로 폐기했다. 파일의 preview 기본값은 normal을 유지한다.
- 전체 검사 기준 `FE/src`315개 TS/TSX의 SHA256 manifest를 외부 임시 경로에 기록했다. 이후 차이는 위 공유 안내 표시 파일1개이며 영향 검사/브라우저/export를 재실행했다. 결과 문서 변경은 앱 코드 변경과 구분한다.

## 실제 캡처와 시각 차이

원본1179×2556을393×852로 축소하고 앱 영역 `(0,59)~(393,818)`을 잘라393×759로 비교했다. OS 상태/홈 영역을 제외한 비교이며 Safe Area의 실제 기기 검증은 아니다. 웹 캡처는 모달 전환400ms 이후다. 원본 글꼴/벡터는 확보하지 못했다. 별도 생성한 원본 데이터/본문은 없다.

| 원본 screen ID / 흐름 | 실제 캡처 | 관찰·실측·남은 차이 |
| --- | --- | --- |
| `sc_ffa4d0c8f01440e1a0842a4e1a59708a` F45 | `compare-note-empty.png` | 빈 메모 Done 녹색. 입력 영역 x16/y98.875/w361/h48, Done x24/y374.875/w345/h48, Cancel48×48. 빈값 동작은 자체 정책. |
| `sc_f4f970015d6743538664901310d2c17b` F45 | `compare-note-filled.png` | 같은 기사/메모 문자열. 원본 Done 녹색 bounds x24/y373/w345/h38, 실제 x24/y375/w345/h48. x/폭 일치, y+2/높이+10. 실제48 터치 보장, 글꼴·제목 줄바꿈·사진 crop·포커스 녹색 밑줄 차이 잔여. |
| `sc_02d96a649c7a461b9c07155d33c1dbfc` F45 | `compare-note-saved.png` | 메모가 해당 기사 위에 표시된다. 원본/웹 스크롤 위치·작성자 표시 데이터가 달라 전체 좌표 동일성은 판정하지 않는다. |
| `sc_6a1036b35729490195c460e5b934bd68` F51 | `compare-reorder-four.png` | 보관본에서 관찰한 네 기사 구성으로 비교. 실제 핸들48×48. 원본은 목록 내부 편집/하단 탭 유지, 현재는 전체 높이 편집 시트로 헤더·Cancel/Done y좌표/하단 탭 노출이 다르다. 원본 동일 재현 미완료. |
| `sc_95e504331794455fb4776bd322254c76` F49 | `compare-private-confirm.png` | 경고/Cancel/Make private 확인. 원본 약270px 폭, 구현300px 폭이고 버튼 색은 원본 파랑/구현 테마 녹색. 배경 스크롤 상태 다름. |
| `sc_a1562b1931fc4650a544861094934588` F47 | `compare-delete-confirm.png` | 삭제 경고·닫기·빨간 Delete. 시트 상단은 약1px 차이, 폰트/줄바꿈·버튼 y/배경 상태 차이 잔여. |
| `sc_fa4e79f0bed747d698ae44e23f9223f9` F45 | `compare-row-menu.png` | Add/Edit note·Remove·Report 대상 연결. 원본 메모 없음/실제 저장 메모 있음에 따른 Edit 문구 차이, 메뉴 typography/상태 차이 명시. |
| `sc_a79a8c62cfd64776ae74f84e0d98b5c3` F50 | `compare-remove-undo.png` | 제거 토스트와 Undo. 원본은 Undo 실행 결과 미수록이며 실제 복원은 mock 구현/검사다. 토스트 위치/목록 스크롤 차이 잔여. |

추가 캡처는 생성·빈 목록·공개 목록·오류·방문자 저장/철회·320px/dark/CSS160%·긴 메모/제목이다. 원본8쌍 대조와 실제 캡처가 전체46장/13흐름의 동일 시각 재현 완료를 뜻하지 않는다. CSS 글자 확대, CDP 터치, 합성 composition은 실제 OS 글자 크기/터치/IME로 표현하지 않는다.

## 플랫폼별 상태와 잔여

| 구분 | 결과/필요 환경/영향 |
| --- | --- |
| Jest iOS/Android 설정 | 전체156 suites/940 tests 통과, 마지막 표시 정리 후 관련4 suites/32 tests와 타입/lint 재통과. React Native 플랫폼 대역이며 설치/실행 증거가 아니다. |
| 실제8081 웹 | Edge에서 정상·실패·복귀·계정/권한·메모/정렬·캡처를 실행했다. 320px 가로 overflow 없음, 긴 메모에서 Done 스크롤 접근, Escape 포커스 복귀 확인. |
| web JS / iOS·Android Hermes | 최종 Expo export exit0, web JS1개/iOS·Android hbc각1개 생성 확인. JS/bytecode 생성이며 native build/run이 아니다. |
| iOS native | Windows에 Xcode/xcodebuild/iOS simulator가 없어 실행/빌드 불가. macOS+Xcode+simulator/실기기로 Safe Area·VoiceOver·IME·키보드 가림·제스처·재실행 검증 필요. |
| Android native | java/gradle/adb 명령, JAVA_HOME/ANDROID_HOME/ANDROID_SDK_ROOT, `%LOCALAPPDATA%\Android\Sdk`가 없고 native 프로젝트도 생성하지 않았다. JDK/Android SDK/에뮬레이터 또는 실기기 환경에서 build/run·TalkBack·IME·뒤로/드래그/재실행 검증 필요. |
| 남은 UI/정책 | 정렬 편집 시트와 원본 inline 구조, 폰트/아이콘/crop/일부 좌표, 미수록 메모 정책 확인이 필요하다. 긴 목록 가장자리의 자동 드래그 스크롤은 제공하지 않으며 스크롤 후 이동 또는 접근성 위/아래 조작을 사용한다. |

## 8081 최종 확인 순서

1. 기존 `http://localhost:8081`을 연다. 프로필→모의 로그인→A를 선택한다. 실제 계정 정보는 필요 없다.
2. Library→새 목록에서 제목과 선택 설명을 입력하고 만든다. Home의 기사→북마크→Save to에서 Reading list와 새 목록을 선택해 Done한다. 다시 열어 선택을 바꾸고 취소하면 이전 확정 선택이 유지된다.
3. 다른 기사도 새 목록에 저장한다. Library→목록→기사→뒤로로 같은 목록에 복귀한다.
4. Add a note에서 입력 후 Cancel, 다시 입력 후 Done을 확인한다. Edit note에서 내용을 비우고 Done하면 메모가 지워진다. 다른 목록의 같은 기사에는 이 메모가 없다.
5. 목록 메뉴→Edit list info에서 제목/설명을 저장/취소한다. Reorder items에서 핸들을 끌어 이동한 뒤 Cancel과 Done을 각각 확인한다. 핸들을 눌러 위/아래 버튼으로도 이동할 수 있다.
6. 기사 메뉴→Remove from list→Undo로 기사와 메모/위치가 복원되는지 확인한다. Reading list/다른 목록의 같은 기사는 유지된다.
7. 목록 메뉴→Make list private에서 Cancel, 다시 확인을 실행한다. Private/잠금과 Share 아이콘이 유지된다. Make public으로 되돌릴 수 있다.
8. 목록 메뉴→View list로 같은 목록의 공개 투영을 확인한다. 제목·설명·메모·순서가 같다. owner 프로필 진입→Lists에서도 해당 공개 목록을 열 수 있다. 실제 공유 실행은 제공하지 않는다.
9. 목록 삭제에서 Cancel 후 확인을 실행한다. Library로 복귀하며 사용자 목록만 사라진다. 기본 Reading list에는 Delete가 없다.
10. 프로필→설정→로그아웃→B 로그인→개인 목록이 분리되는지, 다시 A 로그인→확정 목록이 복원되는지 확인한다. 편집 중이던 초안/시트는 남지 않는다.
11. 전체 Reload 후 인증·개인 메모리 데이터가 초기화되는지 확인한다. 오류/경합은 결과의 회귀 테스트 또는 외부 임시 브라우저 스크립트로 재현하며, 재현 후 normal/Reload 상태로 돌아온다.

두 계정이 같은 공개 목록을 동시에 보는 검증은 실제 navigation 검사와 브라우저의 명시적 mock source/auth 진입으로 수행했다. 일반 UI에서 아직 구현하지 않은 Lists 검색이나 실제 공유 링크를 이 순서의 전제로 추가하지 않았다. 후속 기능은 별도 승인 전까지 시작하지 않는다.
