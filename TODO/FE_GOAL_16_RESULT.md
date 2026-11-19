# Goal 16 — 홈·탐색·검색

2026-11-19 KST. 기준 커밋 `d016c06`, Goal15 미커밋 변경을 이어서 작업했다. 사용자 변경/삭제, 원본PNG, ENV,8081 프로세스를 보존했다. **대상 UI·mock 연결·두 차례 자기 검토 완료 / 원본 글꼴·일부 시각 차이와 native 검증 대기**다.100% 일치로 판정하지 않는다.

## 구현과 원본

기준은 [화면 대응표](FE_MEDIUM_SCREEN_MAP.md), Home01~04, Explore02~06, Searching Medium01~03이다. 실제 원본PNG를 열어 확인했고 [비교 페이지](evidence/goal16/COMPARISON.html)에 원본 screen ID와 실제 캡처를 연결했다. Home/검색/탐색은 첫 스크롤, Staff Picks·Who to follow는 원본 제목 위치에 맞춰 스크롤했다. 비교용 원본은393×852 정규화 뒤 OS59/34영역을 제외했다. 실제 캡처는393×759이며 가공 원본과 구분한다.

- Home: 영어 헤더, 알림, +·For you·Following·Featured·주제 탭, New, 원형−·더보기, 원본 카드/사진/작가/집계, 작성 버튼, 스크롤 헤더 접힘과 추가 페이지.
- Explore: Search Medium, 가로 주제, Trending, Staff Picks, Recommended for you, 가로 Who to follow, 기존 금융 예시 구역.
- Search: 뒤로·입력·지우기·주제 목록, Stories와 원본의 다른 범주 메뉴, Mindfulness 원본 결과, 상세 진입·검색어/스크롤 복귀,0건·실패/재시도.
- 원본 기사에는 `medium-*` ID를 부여했다. 금융 `example-*` ID를 재사용하지 않았다. 원본 기사도 상세 조회·좋아요·북마크·목록 저장에서 같은 ID를 사용한다.
- 사진/아바타만 원본에서 crop해 `FE/assets/medium`에 보관했다. [SOURCES.json](../FE/assets/medium/SOURCES.json)에는 물리 픽셀 좌표와 원본 경로가 있고 [추출 스크립트](evidence/goal16/extract-assets.py)로 재현할 수 있다. 글자/전체 화면을 배경 이미지로 붙이지 않았다.

## 구현 기본안과 범위 차이

`latest/popular/recommended`는 기존 조회 타입의 키로 남겼지만 기본 미리보기는 For you/Following/Featured의 **로컬 콘텐츠 묶음**을 조회한다. 실제 추천/팔로우 알고리즘으로 주장하지 않는다. 금융 fixture를 주입한 기존 테스트와 사용자별 비동기 계약은 유지한다. 기본 미리보기 페이지는3개, 기존 mock 기본값2개는 유지한다.

홈 −는 추천 제어 안내이며 북마크가 아니다. 더보기에서 기존 저장을 실행할 수 있다. 검색의 작은 북마크는 선택 시트를 열고 Done에서 변경한 행만 제출한다. 취소는 미제출 선택을 버린다. 박수 모양은 기존 1회 선택/해제 반응 저장소를 사용하는 mock이다. 실제 여러 번 박수·원본 집계 갱신 정책은 아니다.

알림·글쓰기·추천 제어·People/Publications/Topics/Lists 검색·Follow는 로컬 미연결 안내로 끝난다. 눌러도 아무 반응이 없는 메뉴로 만들지 않았지만 실제 해당 서비스의 UX를 구현한 것은 아니다. Following의 빈 상태와 오류·0건은 자체 설계다. Featured 빈 상태의 문구/추천 publication 버튼은 Home03을 따른다.

원본 첫 홈의 세 번째 카드는 Jeremiah Warren의 byline만 보인다. 이를 그대로 표시하고 미수록 제목/본문을 원문으로 추측하지 않았다. 이어지는 카드·페이지 순서는 로컬 구성이다. Staff Picks 두 번째 카드도 보이는 사진 조각/문구만 표시하고 미수록 부분 안내로 연결했다. 알려지지 않은 읽기 시간은0을 내부 미확인값으로 사용하고 상세에서0분으로 표시하지 않는다. 미수록 반응 수의0은 mock 초기값이다. 원본 기사 본문 전체가 제공된 것으로 간주하지 않는다.

4단계 설명은 기존 읽기 계약에 따라 원본 기사에도 **원문과 다른 로컬 읽기 연습**을 제공한다. 실제 원작자의 설명이나 AI 결과가 아니다. 사용자 ID·auth revision·공급부 메모리 수명·A→B→A·reload 초기화 정책은 바꾸지 않았다.

## 1차 검토 → 수정

| ID | 재현·기대와 실제 | 수정·근거 |
| --- | --- | --- |
| C16-01 | 기존 금융 ID의 문구만 바꾸면 개인 저장의 기사 의미가 변함 | 별도 원본 ID·전체 catalog 연결과 사용자 분리 검사 추가 |
| C16-02 | 카드 요약을 전체 폭으로 놓아 원본의 줄바꿈과 카드 높이가 달라짐 | 홈/검색별 요약 폭, 제목 균형 줄바꿈, 메타 행 간격 조정 |
| C16-03 | publication avatar를 원형으로 잘라 원본 사각 이미지가 잘림; Ironkeel crop의 세로 좌표 오류 | publication 모서리 분리, 실제 원본 색 영역 확인 후 crop1962~2022로 수정 |
| C16-04 | 신규 원본 설명의4개 예시가 같음; 기존 계약 테스트 실패 | 단계별 읽기 연습/예시를 서로 다른 내용으로 작성, 원문과 구분 |
| C16-05 | 탐색 첫 화면만 구현하면 아래 Staff Picks·추천·Who to follow 누락 | 실제 원본04~06 확인 후 추가, 부분 캡처는 미수록 안내 |
| C16-06 | 검색 카드 저장을 즉시 토글하면 원본 선택 시트 흐름이 없음 | compact 버튼은 시트, 취소/Done의 실제 쓰기 횟수 회귀 테스트 |
| C16-07 | 원본OS 포함 이미지와 실제 브라우저, 입력 포커스/스크롤 상태가 다름 | 앱 영역 비교, Enter로 키보드 포커스 해제, 제목 기준 스크롤 정렬 |
| C16-08 | 새 아이콘/탭의 폭·하단 별 glyph가 경계를 넘을 수 있음 | 최소48px, 선택 Stories48px, 별 path를viewBox 안으로 수정 |
| C16-09 | 알 수 없는 읽기 시간을 임의로 채우거나0분으로 노출 | 원본 확인값만 유지, 미확인값은 상세에서 시간 표시 생략 |

타입 검사에서 이미지 source 숫자0의 style 조건과 테스트 commandId 누락도 발견해 Boolean 조건/명시 commandId로 수정했다. 동작 검증 실패와 타입/검토 발견을 구분했다.

## 2차 재검토와 실행 결과

최종 카드·검색·ExploreSections·mock catalog·Like/Bookmark compact 호출부를 다시 검토했다. 카드마다 독립적인 기사 ID와 선택 상태를 유지하고, 홈 카드의 원형−를 저장으로 잘못 연결하지 않았다. 기사 이름을 식별 키로 쓰지 않고 기존 요청 직렬화·늦은 응답 격리 코드는 유지했다. 선택 시트의 사용자 변경 reset key도 유지한다. 공유 토큰/탭 변경 후 홈·검색·하단4탭을 다시 캡처했다.

- Node24.10.0에서 typecheck/lint 통과. `git diff --check` 통과.
- 원본 데이터 연결·기존 피드/검색/상세 데이터·반응·navigation 관련 **20 suites /102 tests 통과** (`tests-fixed.log`,34.562초). 첫 실행은 설명 예시 중복으로2실패였고 수정 후 재실행했다.
- 탐색 하단/기본 App 변경 후 **10 suites /62 tests 통과** (`review-tests.log`,35.056초).
- compact 저장 취소/확정 추가 후 **4 suites /36 tests 통과** (`final-tests.log`,13.056초).
- 마지막 홈/기사 표시 회귀 **4 suites /40 tests 통과** (`final-regression.log`,8.404초).
-3개 초기 페이지/원본 catalog/App 재검증 **6 suites /20 tests 통과** (`catalog-final.log`,9.966초).
- 위 수치는 겹치는 검사들이며 합산한 고유 테스트 수가 아니다. 전체 테스트는 Goal21에서 현재 최종 코드로 다시 실행한다.
- 실제 Chrome: For you/Following/Featured→탐색→Staff Pick 상세/복귀→Follow 안내/닫기→검색→같은 기사 상세/복귀→지우기/0건→320폭/desktop. console 오류0. [브라우저 스크립트](evidence/goal16/browser.mjs), [결과](evidence/goal16/browser.json).
- 실제 스크롤로 추가 페이지의 ChatGPT 카드가 나타남을 별도 확인했다(`home-scrolled.png`).
- 피드 최초 오류→재시도, Featured 빈 상태→안내/닫기: [스크립트](evidence/goal16/failures.mjs)·[결과](evidence/goal16/failures.json). `finally`에서 mock 설정을 원래 normal로 복원하고 파일 동일성을 검사했다.
-320폭, CSS 글자130% 확대, 긴 한국어 검색/지우기: [결과](evidence/goal16/accessibility.json). 실제 OS Dynamic Type나 native IME/키보드 검증으로 표현하지 않는다. 캡처에서 제목·본문 겹침과 버튼 줄바꿈을 직접 확인했다.

## 남은 차이·미검증

원본 글꼴 파일 부재로 시스템 대체 글꼴의 굵기·문자폭·일부 줄바꿈이 남는다. 박수/댓글/북마크 세부 path·원본의 작은 조작 간격과48px 터치 영역도 차이가 있다. 일부 작가 인증 표식과 잘린 콘텐츠/소개 전체는 확보되지 않았다. 부분 원본, 로컬 묶음 순서, 외부 메뉴 안내, 금융 읽기 구역, mock 반응은 명시적인 범위 차이다. 해당 차이를 숨겨100% 일치나 Medium 전체 기능 완료로 보고하지 않는다.

iOS는 Xcode/Simulator, Android는SDK/adb/emulator가 없어 실제 빌드·실행·OS 글자 확대·IME·Safe Area 기기 검증은 대기다. 이번 브라우저/Jest 결과를 native 실행으로 간주하지 않는다. 양 플랫폼 최신 JS/Hermes 번들은 최종Goal21 검증에 포함한다.

8081에서는 Home/Featured와 Explore에서 원본 화면을 보고, `Mindfulness` 검색→기사→뒤로, 저장→모의 로그인→다시 저장을 따라갈 수 있다. 기사 상세·저장 시트 디자인은 다음Goal17 범위이며 이 문서는 그 화면의 클론 완료를 주장하지 않는다.
