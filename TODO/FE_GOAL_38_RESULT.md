# Goal38 — 초안 저장·재개·멘션

2026-11-20 KST · Windows · 시작 HEAD `68a51b4a21f91945afecc5756223b48e2c4afadc` · Goal37 커밋 후 작업 트리 변경 없음.

상태: **구현 완료·검증 잔여**. Goal38의 mock 구현과 두 차례 자체 검토를 수행했다. 원본 동일 시각 재현·실제 native/OS 검증은 아래 구분대로 남는다. 승인된 Goal37→38→39→40 가운데 Goal38 변경만 로컬 커밋한 뒤 Goal39를 이어서 진행한다. 실제 서비스 저장·멘션 알림·외부 공유·push·배포는 포함하지 않는다.

## 구현과 흐름

| 대상 | 구현·실제 확인 |
| --- | --- |
| Write → 입력 → 나가기 | 제목/본문/서식/이미지/멘션을600ms 입력 지연 뒤 자동 저장한다. 닫기·navigation back·Drafts 이동은 남은 변경을 저장한 뒤 실행한다. 최초 저장 요청 전 내용이 빈 새 문서는 목록에 만들지 않는다. |
| 작성 메뉴 | 원본의 Drafts / Submit to publication / Add or edit topics / Edit story preview4항목을 배치했다. Drafts는 실제 route로 연결했고 나머지3개는 Goal39 연결 경계의 기존 안내다. Goal38에서 발행을 구현했다고 취급하지 않는다. |
| Drafts | 작성 메뉴와 프로필의 내 초안 진입, 목록/빈 상태/조회 실패/재시도/재개를 연결했다. 저장된 문서의 제목·서식·이미지·멘션 ID를 복원한다. |
| 저장 실패 | 입력을 유지하고 Retry로 같은 문서 버전을 재요청한다. 나가기 실패는 Keep writing / Try again / Discard unsaved changes를 제공한다. 버리기는 마지막 확정 초안을 삭제하지 않는다. |
| 멘션 | @ 입력/도구·이름/핸들 검색·지연·빈 결과·공급부 오류/재시도·동명이인 선택·메타데이터 삭제를 연결했다. 선택한 대상 ID와 이름/핸들을 문서에 저장한다. |
| 계정·수명 | A→B→A에서 확정 초안은 소유자별로 복원한다. 같은 A 재로그인도 이전 화면의 커서·시트·오류를 폐기한다. 앱 전체 새로고침은 인증과 모든 메모리 초안을 초기화한다. |

## 상태·권한·저장 계약

- `DraftSource`가 앱 navigation 수명 동안 확정 초안을 소유한다. `DraftSession`은 한 편집 route의 입력값/선택/저장 상태를 소유하며 화면마다 별도 확정 저장소를 만들지 않는다. source 교체는 이전 화면을 재사용하지 않는다.
- `draftId`는 source가 사용자에게 할당한 ID다. `userId`는 소유권, `document.version`은 편집 변경 세대, `${draftId}:${version}`은 저장 작업 ID, 인증 `revision`은 로그인 수명이다. 저장소는 ID 문자열 접두사에 의존하지 않고 할당 소유권과 기존 기록의 소유자를 모두 확인한다.
- 기본 mock 지연160ms, 입력 debounce600ms. 저장 중 후속 입력은 화면에서 유지하고 직렬 저장 루프가 최신 버전까지 처리한다. 같은 작업의 중복 flush는 진행 Promise를 공유한다. 과거 성공은 현재 입력을 교체하지 않으며 과거 실패 뒤 더 최신 입력이 있으면 최신 의도를 저장한다.
- 최초 저장 요청 전에 모든 입력을 지우면 idle로 돌아가며 초안을 생성하지 않는다. 이미 저장했거나 저장 요청이 진행 중인 문서를 비우면 빈 내용도 최신 버전으로 확정하고 기존 ID를 유지한다. 빈 문서로 만들기와 초안 삭제는 같은 동작이 아니다.
- 저장 작업 ID의 payload가 달라지면 충돌 오류다. 같은 버전/내용의 재시도는 같은 기록을 반환하고 낮은 버전은 최신 저장값을 덮지 않는다. 성공 뒤 응답 유실을 재현한 재시도도 초안을 중복 생성하지 않는다. 목록 정렬은 `updatedAt DESC`, 동률은 ID 순서인 자체 mock 정책이다.
- 저장소는 명령 문서를 복사하고 schema/버전·블록 수·안전한 링크·이미지 위치/크기·멘션 범위/대상을 확인한다. 조회 결과도 소유자와 문서 구조를 검증한다. 조회/저장 완료 직전 AbortSignal을 재확인한다.
- route의 사용자/revision 검증과 AuthStore 구독으로 로그아웃·계정 변경 시 즉시 편집 세션을 중단한다. 공급부 교체/unmount도 타이머·조회·저장을 중단한다. AbortSignal을 무시하는 임의 외부 저장 구현의 부작용까지 취소한다고 주장하지 않으며 현재 mock 저장소는 commit 직전에 signal을 검사한다.
- 프로필 이름과 기본 설명 수준 변경은 인증 revision이나 공개 navigation을 초기화하지 않는다. Drafts 진입/재개는 Editor와 Drafts를 replace해 숨겨진 편집기가 계속 자동 저장하지 않게 한다. 원래 Home/Explore/Profile route로 복귀한다.
- schemaVersion3은 기존 LF/UTF-16 본문·블록·서식·이미지 계약에 `mentions[{start,end,target:{id,name,handle}}]`을 추가한다. 구간 출력에도 대상 메타데이터가 들어간다. schema2는 Goal37에서 화면 수명만 있었으므로 영속 migration 대상이 없다.
- 멘션 앞/뒤 삽입은 위치와 대상을 유지한다. 내부 수정·범위 삭제는 해당 메타데이터를 제거하고 남은 글자는 일반 텍스트가 된다. 직접 붙여넣은 표시 이름만으로 멘션 ID를 만들지 않는다. @ 검색은 현재 커서 앞의 토큰에만 적용하고 이메일 문자열은 검색으로 취급하지 않는다.
- 기존 DirectoryProvider의 사용자 ID와 오류/재시도를 재사용한다. 후보 필터는180ms 지연과 검색 키/디렉터리 객체를 비교하며 이전 검색 결과를 숨긴다. 선택 직전 문서와 커서가 같아야 적용한다. Sam Lee 동명이인은 별개 고정 fixture ID다. 실제 계정 검색이나 발행 알림은 없다.
- 자산은 Goal37의 번들 PNG ID를 저장한다. 두 초안이 같은 자산을 참조해도 한 초안의 이미지 삭제/화면 해제는 번들 원본을 삭제하지 않는다. 재개할 때 추가 이미지 ID가 기존 ID와 충돌하지 않게 생성한다. 임시 URI/object URL 저장·업로드·기기 파일 영속화를 구현한 것은 아니다.

## 이탈 정책 변경

Goal36/37은 화면을 닫으면 문서를 폐기하고 Keep writing/Discard를 확인했다. Goal38부터 공식 자동 저장 설명과 Drafts 재개 요구에 맞춰 **저장 성공 후 나가기**로 변경했다. 정상 이탈에는 폐기 확인을 표시하지 않는다. 저장 실패에서만 입력 보존·재시도·미확정 변경 폐기를 구분한다. 로그아웃으로 이미 확정한 초안을 지우지 않지만 아직 저장되지 않은 입력은 계정 수명 종료와 함께 폐기한다. A/B 전환·실패 이탈·재개 navigation/브라우저로 확인했다. 앱 재시작 이후 보존은 계속 지원하지 않는다.

## 원본·공식 설명·자체 보완

- **관찰:** 보관본 iOS version1419의 F10 Drafts/ANALYSIS와 F11 Mentioning a user/ANALYSIS, 실제 PNG5장을 직접 열었다. F10 `sc_2436081faa2445cb86e17ea0b88b4fc9`의4항목 메뉴, `sc_c020fbe7604a43569b5bf77da2725119`의Drafts/Close/행/Edited 1 minute ago를 대조했다.
- **관찰:** F11 `sc_e3c9949b35ca4bc7b3328ee4e887fc5a`의입력 힌트, `sc_fbca217fbc1346d09deb4c0d09dac86e`의Sam Lee @samlee / LI Sam @samlee-hk / Sam Lee @sam.lee, `sc_15dd105a441c426ca638b4db6cb30997`의녹색 선택 결과를 확인했다. 미수록 프로필 본문과 아바타 사진은 원본 데이터처럼 만들지 않았다.
- **공식 설명:** [Create, edit, or delete a story](https://help.medium.com/hc/en-us/articles/214874698-Create-edit-or-delete-a-story)의자동 저장·Drafts 재개·프로필 필터 설명(조회 시2026-11-13갱신), [Using the story editor](https://help.medium.com/hc/en-us/articles/215194537-Using-the-story-editor)의@이름/사용자명 선택 설명(2026-11-11갱신)을 확인했다. 현재 도움말을 보관본과 같은 버전의 UI 증거로 취급하지 않는다.
- **추가 조회:** Gummble의 `Medium drafts autosave save failed empty drafts` 검색은 exact0/fallback3였다. 반환ID `sc_a829121c47a444cd8a8fd0d9889edaed`, `sc_2d1afd7a02a347868564f9757753d077`, `sc_57f2ae59009b42388697183d5c90da4a`는 빈 상태/저장 오류의 근거로 확보되지 않았다.
- **미수록/자체 보완:** debounce600ms,저장 상태/오류 문구,빈 목록,실패 후 이탈,버전 충돌,검색 실패,메모리 초기화,멘션 내부 편집,프로필 Drafts 진입 배치와 재개 route 교체 정책이다. 자동 저장의 존재는 공식 설명이지만 정확한 주기/재시도 UI는 관찰하지 못했다.
- Goal39의 토픽/미리보기/발행,Goal40 인증 코드,Goal41온보딩은 이 커밋에 구현하지 않는다. 실제 공유 URL·멘션 알림·앱 재실행 후 디스크 보존도 없다.

## 발견한 결함과 두 차례 자체 검토

| 재현·원인 | 수정·회귀 확인 |
| --- | --- |
| 이미지 포함 초안을 재개하면 삽입 sequence가 초기화돼 기존 이미지 ID와 충돌 | 현재 문서의 ID를 건너뛰어 생성한다. 실제 navigation과 브라우저에서 같은 사진2개 삽입/재개를 확인했다. |
| 멘션 후보 클릭 시 blur로 서식 도구가 접혀 행이 이동하고 클릭이 취소 | 후보가 표시되는 동안 서식 행을 숨겨 클릭 중 레이아웃을 유지한다. 실제 브라우저 후보 클릭과 회귀 검사를 연결했다. |
| 로그인 중단 뒤 저장 timer/응답이 남거나 재활성화된 session에 이전 결과가 적용될 위험 | 실제 auth store/revision·AbortSignal·operation lease·조회 세대를 검증한다. unmount/재활성화/로그아웃과 늦은 저장 응답 단위 검사를 추가했다. |
| source 교체 뒤 새 문서가 이전 저장소의 ID를 사용해 저장 실패 | 새 source에서 ID를 할당하고 편집 컴포넌트를 교체한다. 교체 후 입력의 실제 확정 저장을 navigation 검사로 확인했다. |
| 사용자 ID 접두사가 겹칠 때 문자열 검사만으로 잘못된 소유권 허용 가능 | 명시적 ID 할당 소유권 map으로 검사한다. B의 미저장 ID를 A가 쓰는 명령을 거부하는 검사와 문서 구조 검사를 보완했다. |
| 첫 저장 전 입력을 모두 지웠는데 Saving 표시가 남음 | 빈 새 문서의 idle 복귀와 저장 중 빈 문서의 최신 변경을 구분했다. 저장소에 빈 새 기록이 생기지 않는 단위 회귀를 추가했다. |

1차 자체 검토는 저장소/편집 세션/인증 경계·응답 유실·문서 복원·멘션 구간을 검토했다. 저장 전후 복사/abort,이미지 ID 충돌,실제 복귀 연결을 수정하고 단위/navigation 검사를 실행했다.

2차 자체 재검토는 수정된 코드와 실제 브라우저를 대상으로 메뉴 닫기·포커스/행 이동·source 교체·소유권/문서 검증·계정 전환·원본 차이를 확인했다. 멘션 클릭 배치와 source 교체 ID를 수정했다. 전체 검사 이후에는 빈 문서 저장 표시,후보 FlatList,상대 시간/시트 간격/저장 상태 위치와 후보 이름·핸들/구분선의 시각 보정을 재검토하고 영향 검사를 다시 실행했다. 이는 모두 자체 검토이며 독립 제3자 검토가 아니다. 최종 수정 이후 검사 기준은 아래에 구분한다.

## 자동 검사·실행 결과

- 환경: Node24.18.0/npm10.9.0,Expo57.0.33/RN0.86.3/React19.2.3/TypeScript6.0.3/Jest29.7.0. 신규 의존성과 lockfile/ENV 변경 없음.
- 추가: `draftSession.test.ts`(저장 응답 유실/최신 입력/권한/취소/재활성화/복원), `editorMentions.test.ts`(동명이인/범위 편집/이미지 구간 병합), `DraftsNavigation.test.tsx`(실제 Stack/탭/저장/재개/실패/계정/source/검색).
- 수정: 기존 `EditorNavigation.test.tsx`, `EditorImagesNavigation.test.tsx`를 새 저장 이탈 정책에 맞게 수정했다. navigation 자체를 mock하지 않았다. 기존 선택/서식/이미지/계정 회귀 확인을 보존했다.
- 초기 부분 검사에서 fake timer의0ms source 조회와 UI 비동기 준비 대기/접근성 질의 문제를 수정했다. 중단한 첫 부분 검사는 통과 기록으로 사용하지 않는다. `goal38-related3.log`: 12suites/54tests 통과(최종 소유권/source 교체 회귀 보완 전 기준).
- **전체 검사:** FE에서 `npm.cmd run check`의타입 검사→lint→Jest iOS/Android 전체 **180suites/1060tests 통과**,649.168초(`goal38-check.log`). 전체 실행 동안 제품/테스트 코드를 고정했다. Goal37의174/1038을 재사용한 수치가 아니다. 기존 Android ResponsesNavigation 검사에서 HistoryFeedback의 `act(...)` 경고1건이 기록됐지만 실패/skip은 없다. 브라우저 console 오류와 구분한다.
- **후속 영향 검사1:** 전체 검사 뒤 빈 문서 상태/시각 보정/후보 가상화와 회귀 기대값을 보완했다. `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd test -- --runInBand --testPathPattern="editorModel|editorMentions|draftSession|DraftsNavigation|EditorNavigation|EditorImagesNavigation"` 통과,**12suites/54tests**,39.667초(`post38-*.log`).
- **최종 후속 영향 검사2:** 마지막 후보 이름·핸들/48px행과 메뉴 구분선 보정 뒤 `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd test -- --runInBand --testPathPattern="DraftsNavigation|EditorNavigation"` 통과,**4suites/18tests**,26.209초(`final38-*.log`). 전체180/1060은 앞선 고정 코드 기준이며 이 마지막 시각 변경에 전체 검사를 다시 실행했다고 표현하지 않는다.
- **최종 플랫폼 export:** `npx.cmd expo export --platform all --output-dir "C:\Users\leehg\AppData\Local\Temp\kostolany-goals37-40-bafd1b1de3db45efb8a382e232817076\export38-final"` 성공(`export38-final.log`). web JS와iOS/Android Hermes `.hbc`를 각각 생성했다. 마지막 제품 코드에서 브라우저6흐름과시각/합성입력2흐름도 다시 통과했고console/page오류0이다. 이후에는 결과/현재 상태 문서만 수정했다.

## 브라우저·시각·플랫폼

- 기존8081 PID5248을 재시작/중복 실행하지 않았다. Edge headless,393×759,DPR1,en-US,Light를 기본으로 로그인 A/스크롤/선택 상태를 실제 조작했다. `browser38.py`6흐름(작성/이미지/멘션 저장·재개,실패 이탈/재시도,목록/재개 조회 실패,320폭/CSS확대/Escape,A/B/A·동일A,Reload초기화) 통과,console/page 오류0.
- `reference38.py`는원본 문구로5쌍의실제 캡처·나란히/overlay/diff를 생성하고 직접 열어 비교했다. Dark/긴 한국어 제목,합성 composition 중 멘션 삽입 비활성도 확인했으며 오류0. 합성 이벤트는 실제 OS IME/가상 키보드 검사가 아니다.
- 외부 임시 경로: `C:\Users\leehg\AppData\Local\Temp\kostolany-goals37-40-bafd1b1de3db45efb8a382e232817076`. `browser38.json`, `reference38.json`, `reference-*-pair/overlay/diff.png`, `pairs38.jpg`, `goal38-*.log`에 당시 조건/로그/캡처가 있다. 임시 파일은 추후 삭제될 수 있으며 저장소에는 넣지 않는다.
- 비교 정규화:1179×2556원본→393×852→y59..818crop. 실제393×759,DPR1,글자100%,Light. 기기 키보드는 원본에 있고 브라우저에는 없다. 동일 기기/OS 비교나 임의 일치율로 표현하지 않는다.
- 실측: 작성 메뉴 첫 버튼 `(x105,y48,w218,h48)`이며 원본 메뉴 상단은약39px,행 높이는약44px다.48px 터치 조건으로 상단/높이가 다르다. Drafts 첫 행은 `(x16,y111,w361,h76)`,제목 상단은 구현약125px/원본127px다. 원본Edited 1 minute ago와 구현Edited just now는 각 저장 시각에 따른 데이터 차이다. 이전 별도 Saved줄22px은 상단 헤더 안으로 옮겨 제목 배치를 보정했다.
- 최종 후보 첫 행은 `(x10,y565,w373,h48)`이다. 원본은약`x9,y359,h48`이며 이름/핸들의 가로 배치를 맞췄다. 브라우저에는 원본의 하단 OS 키보드가 없어 고정 영역의 화면 좌표가 다르다. 원본 폰트/벡터 미확보,기존 로컬 fixture 사진/crop,미수록 후보 아바타의 글자 대체,실제 키보드 유무와 native 문단 장식 차이는 남는다. 원본의 시트 뒤 편집기와 현재 replace route의 배경 처리도 같다고 주장하지 않는다.
- Windows에서 `java/adb/gradle/xcodebuild`를 찾지 못했고 FE/android·FE/ios 프로젝트와 사용 가능한 native SDK/기기가 없다. iOS는 macOS+Xcode/Simulator,Android는 JDK+SDK/에뮬레이터 또는 기기에서 build/run·IME·키보드·VoiceOver/TalkBack·OS 글자 확대·Safe Area를 추가 확인해야 한다. Jest iOS/Android 프로젝트와 JS/Hermes export는 native 실행 증거가 아니다.
- 장애 재현은 브라우저 런타임 source만 교체했고 정상 함수를 복원한 뒤 페이지를 새로고침했다. 저장소 기본값은 정상이다. Goal37의실제Camera/Library picker 호출 미구현과 native/원본 시각 잔여는 그대로 구분한다.

## 8081 최종 확인 순서

1. 전체 새로고침 → Write a story → 모의 Google A 로그인 → 원래 홈에서 Write를 다시 누른다.
2. 제목/본문/서식을 입력하고 로컬 사진을 삽입한다. 본문에 `@samlee`를 입력해 이름이 같은 서로 다른 핸들 후보를 확인하고 하나를 선택한다.
3. Saved 표시 확인 → Close → 프로필의 내 초안 → 해당 행 → 제목/본문/서식/사진/녹색 멘션을 확인한다.
4. 사진을 추가·삭제하고 More → Drafts → 같은 초안을 재개해 결과를 확인한다. 빈 새 글은 나갔다가 Drafts에서 생성되지 않음을 확인한다.
5. 설정에서 로그아웃 → B 로그인 → Drafts 빈 상태 → A 재로그인 → 확정 초안 복원을 확인한다. 같은 A 재로그인에서도 이전 시트/입력이 열린 채 남지 않는다.
6. 320폭과 Dark에서 메뉴/긴 제목/후보/스크롤/Escape를 확인하고 전체 새로고침 후 세션과 초안이 초기화되는지 확인한다. 오류/응답 역전은 추가한 테스트와 위 외부 브라우저 재현 기록의 mock source로 검사했다.

기능 구현,자동 검사,원본 시각 대조,실제 native 검증을 별도 판정하며 이 mock 결과를 서비스 연동·출시 완료로 취급하지 않는다.
