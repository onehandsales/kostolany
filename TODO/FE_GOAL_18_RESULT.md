# Goal 18 — 라이브러리·목록 관리 클론

> Goal53 후속 링크 점검: 이 문서의 과거 경로 중 실제 파일이 없는 3곳은 링크 대신 당시 경로와 보관 상태를 표시했다. 과거 검사 결과·캡처를 재실행하거나 복구한 것이 아니다. 삭제된 `evidence/` 자료는 이 작업 트리에 없으며 역사적 결과의 보관 한계로 남긴다.


2026-11-19, 기준 `d016c06`. 구현·두 차례 자체 검토·관련 Jest/실제 브라우저 검증 수행. 폰트/플랫폼 차이와 native 검증은 대기. Goal 15 이후 변경은 미커밋이며 연속 지시에 따라 Goal 19로 진행한다.

## 원본과 구현

`medium/flows/Library`의 ANALYSIS와 화면 02~03, Creating a list 02~04, List detail 02~04, Deleting a list 02~04, Removing a story 01~02를 읽고 실제 PNG를 확인했다. 원본/구현 비교 (저장소 보관본 없음: `evidence/goal18/COMPARISON.html`), 원본 묶음 (저장소 보관본 없음: `evidence/goal18/originals-0.png`), 관리 원본 (저장소 보관본 없음: `evidence/goal18/originals-1.png`). 393×759 앱 영역 비교 기준은 Goal 15와 같다. 목록명·소속 수·현재 독자·스크롤 위치가 다른 비교는 동일 상태의 픽셀 일치 측정으로 표현하지 않는다.

- Your library, Your lists 등 가로 탭, 시작 배너·닫기, 기본/사용자 카드·동적 썸네일·기사 수·잠금/다운로드/더보기.
- 목록 소유자·제목·선택 설명·빈 상태·Start browsing, 기사 note 표식·작가·썸네일·시간·날짜·저장·기사 메뉴, 스크롤 제목과 하단 목록 반응.
- 생성 이름/60 카운터·설명/280 카운터·Private·Create/Cancel. Edit list info 메뉴는 원본 관찰이고 편집 폼은 생성 폼을 재사용한 자체 설계다.
- 위치를 측정하는 ActionMenu, 삭제 확인·Cancel/확정, Remove from list·Undo. Undo의 복구는 우리 저장소 명령으로 구현/검증했으며 원본 정적 캡처만으로 서버 복구를 관찰했다고 하지 않는다.
- 라이브러리 원본의 네 기사를 별도 fixture로 추가했다. 검색에서 제목으로 찾아 같은 기사 ID로 저장/상세 진입 가능하다. 원문/집계가 없는 부분은 생성하지 않는다.

## 상태·정책

user ID/list ID/article ID와 기존 직렬 쓰기·latest intent·삭제 tombstone을 유지했다. 이름은 식별자가 아니다. 기본 Reading list는 이름 수정/삭제 불가다. 한국어 내부 기본 목록명과 접근성 이름을 유지하고 영어 `Reading list`도 중복 예약 이름으로 막는다.

`UserListContent`에 선택적 description/isPrivate만 추가했다. 기존 필드가 없는 fixture도 호환된다. 설명은 제출 시 NFC, 코드 포인트 280자, 빈 값·줄바꿈 허용. Private는 로컬 표시 메타데이터이며 끄더라도 실제 공개·공유 권한이나 외부 서비스가 생기지 않는다. 초기 false는 생성 원본과 맞춘 구현 기본안이다. 기존 이름 60자/공백/중복 검증은 유지한다. 입력을 조합 도중 자르지 않는다.

생성·수정·기사 소속 명령에서 메타데이터를 보존하고 동일성 비교·조회·mock 저장에서도 함께 검증한다. 실패는 이전 확정 내용으로 복구하며 폼 초안은 유지한다. 삭제가 원문·좋아요·다른 목록 소속을 바꾸지 않는다. Undo는 해당 목록 소속만 true로 되돌리며 삭제된 목록을 만들지 않는다. A→B→A 메모리 유지, 앱 reload 초기화, 제출 후 닫기는 요청 취소가 아니라는 정책도 유지한다.

Saved lists/Digest/Highlighted/Reading history·note·다운로드·목록 반응·공유·수동 순서 변경·신고는 미연결 안내다. 원본 메뉴가 존재한다는 이유로 외부 서비스를 연결하지 않았다.

## 1차 검토 → 수정

| 문제 | 수정/검증 |
| --- | --- |
| C18-01 reference 사진이 카드 미리보기에서 누락 | thumbnail과 reference.image를 함께 선택하고 빈 세 칸도 렌더 |
| C18-02 새 메타데이터가 기존 clone/equality 경로에서 유실 | source/store의 조회·비교·수정·소속 변경·응답 검증을 함께 확장, 보존/삭제 경합 테스트 |
| C18-03 닫은 메뉴가 늦은 native 위치 측정으로 재개될 가능성 | 측정 revision을 닫기·재열기·unmount에서 무효화 |
| C18-04 UI 영문 전환 뒤 기존 한국어 getByText 회귀 | 동작 계약을 유지한 접근성 label 기준으로 검사, 실제 navigation 유지 |
| C18-05 시작 배너 높이·카드 간격·장식 원의 넘침 | 실제 원본 비교 후 배너124, header 여백, 첫 카드20, overflow 경계·닫기48 조정 |
| C18-06 생성 설명 입력 높이·Private 터치 영역 | multiline 1행 시작, 확대 가능한 입력/스크롤, 52×48 switch target |
| C18-07 새 실패 테스트가 배경/모달의 여러 alert를 하나로 가정 | 해당 폼 오류 문구로 조회하여 범위를 명확히 함 |

## 2차 재검토·실행 결과

- Node24.10.0 typecheck/lint 통과 로그 `evidence/goal18/typecheck.log`, `lint.log`.
- `metadata-recheck.log`: ListManagementNavigation/LibraryInteractions/createUserListStore/createMockUserListSource **110 tests, 8 suites 통과**. 새 메타데이터 경계/보존/삭제 중 응답, 실패 후 입력·재시도·편집 취소·B 조회 격리 포함.
- `bookmark-recheck.log`: BookmarkNavigation **10 tests, 2 suites 통과**. 실제 navigation을 사용하며 navigation mock 대체 없음.
- mediumCatalog 양 플랫폼 통과는 `tests-final.log`의 해당 suite에 기록. 이 로그 전체는 iOS BookmarkNavigation 1건 시간 초과로 실패했다(928.87s). 별도 재실행 14.971s의 10건 통과와 구분한다. 시간 초과 원인은 확정하지 않았으며 timeout 상한을 늘려 숨기지 않았다.
- `browser.mjs`/`browser.json`: 실제 8081에서 생성→네 기사 추가(첫 기사는 기본 목록에도 저장)→목록→기사→목록 복귀→이름/설명/Private 저장→제거/Undo→삭제 취소/확정→기본 목록 기사 유지,320px. console/page error 0.
- `failures.mjs`: create-error에서 설명 초안 보존·재시도 성공을 실제 브라우저에서 확인하고 mock 파일을 finally로 원복한다. 근거 `create-error.png`, `create-recovered.png`, `failures.json`.
- 변경 코드를 다시 읽어 기본 목록 보호·목록 간 ID 격리·metadata spread·삭제 후 UI unmount·메뉴 측정 응답 경계를 확인했다. 이는 두 번째 자체 코드/화면 검토이며 독립 리뷰나 자동 검사 수치로 표현하지 않는다.

## 남은 차이·대기

원본 글꼴 부재에 따른 굵기/줄바꿈, 자체 아이콘, mock 사용자 이름/실제 소속 데이터, 원본의 상대 생성 시각(우리 모델에 없음), 초기 읽기 목록 원본 사진 3장의 미수록 기사 정보, 최소48 터치와 폼 높이, 편집 폼 원본 부재는 남아 있다. 고정 바/모달/브라우저 focus ring은 iOS 원본과 동일하지 않다. 원본의 Public/Private 실서비스와 로컬 flag는 다르다.

Xcode/simctl·Android SDK/adb/emulator 부재로 native 실행·빌드/OS IME·큰 글자·스크린리더·키보드 Safe Area는 미검증. 브라우저·Jest를 실제 native 실행으로 보지 않는다. Goal21 JS/Hermes 재검증과 구분한다.

8081: Library 로그인 → New list → About mindfulness → Create. Explore에서 The Chimichurri Made Me Do It / Mind-Fullness / How Useful is Mind Fullness / Mind Fullness or Emptiness를 찾아 Save to에 목록을 선택한다. 목록 더보기에서 Edit list info/Delete list, 기사 더보기에서 Remove from list와 Undo를 확인한다. 커밋·push·배포 없음.
