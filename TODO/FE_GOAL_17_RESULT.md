# Goal 17 — 기사 상세·반응 바·저장 대상 선택

> Goal53 후속 링크 점검: 이 문서의 과거 경로 중 실제 파일이 없는 1곳은 링크 대신 당시 경로와 보관 상태를 표시했다. 과거 검사 결과·캡처를 재실행하거나 복구한 것이 아니다. 삭제된 `evidence/` 자료는 이 작업 트리에 없으며 역사적 결과의 보관 한계로 남긴다.


2026-11-19. 기준 커밋 `d016c06`; Goal 15~17 변경은 미커밋. 연속 요청에 따라 다음 Goal로 진행한다. 구현·두 차례 자체 검토·관련 자동/브라우저 검증을 수행했으며 원본 폰트·아이콘 차이와 native 검증은 남아 있다. 100% 일치 판정은 하지 않는다.

## 구현과 원본

`ReferenceArticleView`는 원본 기사용 제목·배지·작가·Follow·커버·serif 본문·인용 강조·토픽·작가 소개·고정 반응 바를 제공한다. `ReferenceArticleFooter`는 캡처에 보이는 응답과 후속 기사 미리보기만 표시한다. 댓글/팔로우/공유/청취는 로컬 미연결 안내다. 금융 fixture의 기존 상세·설명은 유지한다. 원문 전체가 없는 구간은 명시적으로 생략하며 자체 문장을 원문으로 채우지 않는다.

원본은 `medium/flows/Home/Story detail/ANALYSIS.md`, screens 02~07과 `Saving a story/ANALYSIS.md`, screen 02. 실제 PNG를 열어 읽고 비교 페이지 (저장소 보관본 없음: `evidence/goal17/COMPARISON.html`)에 연결했다. 원본 1179×2556을 393×852로 정규화하고 OS 위59/아래34를 제외한 앱 393×759와 실제 Chrome 캡처를 비교했다. DPR 확정은 아니다.

저장 시트는 Save to / Create new list... / Reading list / 체크 / Done 구조, 배경 터치·native back 취소, 48 이상 터치 영역을 적용했다. 선택은 Done에서 기존 목록 저장소로 제출한다. 기본 목록 한국어 접근성 이름과 사용자 목록 ID는 유지한다. 취소는 제출하지 않는다. 박수 모양은 기존 1회 좋아요 toggle이며 Medium의 다중 박수 기능이 아니다.

4단계 설명은 Story options → Reading tools 및 본문 하단에서 연다. 접었다 다시 열면 임시 수준을 유지한다. 사용자/인증 revision 변경 시 도구·메뉴·안내를 렌더 전에 닫으며 설명 세션은 기존 scope로 초기화한다. 개인 데이터 소유자·메모리 수명·최신 의도/실패 복구 저장소는 변경하지 않았다. 프로필 이름은 인증 fixture가 아닌 ProfileProvider의 확정 상태에서 읽는다.

## 1차 검토 → 수정

| 발견 | 수정·근거 |
| --- | --- |
| C17-01 커버 crop에 위 여백 포함, 하단 잘림 | 원본 물리 좌표 `(72,1269,1107,1959)`로 재추출. 추출 스크립트와 SOURCES.json도 수정 |
| C17-02 웹 Image가 원본 높이를 유지 | 화면 폭·본문 최대 폭으로 높이를 명시하여 1.5/2 비율 보장 |
| C17-03 공통 시트 heading/Modal 접근성 이름 중복 | 동일 title에서는 heading의 별도 label 제거. native requestClose 회귀 검사 |
| C17-04 저장 시트 capture가 fade 중 반투명 | 캡처 시점 안정화 후 재촬영. UI 투명도 결함과 구분 |
| C17-05 본문 글자 폭·굵기 차이 | 실제 대조 후 reference 본문 18/30으로 조정, 금융 본문 유지 |
| C17-06 숨긴 도구의 선택·이전 사용자 UI 경계 | 도구 mount 유지 + scope guard. 전용 회귀 테스트 추가 |

타입 검사에서 ReferenceBlock의 union 분기가 좁혀지지 않는 문제를 개별 kind union으로 수정했다. 초기 테스트의 미지원 matcher/빠진 공급부 및 브라우저의 radio/북마크 query 오류도 고쳤다. 실패 로그를 최종 통과로 바꾸지 않고 보관한다.

## 2차 재검토와 실행

- `ReferenceArticleView.test.tsx`: 도구 접기/재열기 선택 유지, 인증 범위 변경 후 메뉴/도구 정리와 기본 수준 재적용.
- Node 24.10.0: typecheck/lint 통과. `tests-final.log`에 ArticleDetailScreen/ExplanationSection/HomeFeedScreen/LibraryInteractions/ReferenceArticleView의 양 플랫폼 결과 기록.
- 실제 8081 Chrome: ChatGPT 검색 → 기사 → 읽기 도구 선택/재열기 → 원래 검색 복귀 → mock 로그인 → 저장 시트 체크/Done → 다시 열기 → 해제 선택 후 취소 → 저장 유지. 응답/후속 기사 스크롤과 320px 가로 넘침도 확인. `browser.json` console/page error 0.
- 상세 로딩 훅은 화면에서 한 번 호출하고 legacy/reference 렌더에 상태를 전달한다. ID/소스 변경 및 오래된 응답 검증은 기존 ArticleDetailScreen 테스트로 재실행했다.
- 공통 시트/반응 변경의 앞 단계 영향: HomeFeedScreen과 LibraryInteractions 회귀를 재실행했다. 화면 캡처 비교는 review 결과이며 테스트 수에 합산하지 않는다.

## 남은 차이·검증 대기

원본 폰트 파일 부재로 system sans/Georgia를 사용한다. 자체 SVG 박수/댓글/공유 선 모양, 일부 굵기와 줄바꿈, OS status/home indicator, 스크롤 시 상단 접힘이 다르다. 캡처에 없는 본문/후속 글 원문은 미확인이다. 응답 미리보기의 현재 독자 표시는 mock 프로필이며 원본 Alex Smith 고정값이 아니다. API/댓글/공유/실제 인증은 제외한다.

iOS Xcode·simctl과 Android SDK·adb·emulator가 없는 기존 환경 제약이 지속된다. Jest의 iOS/Android는 실제 기기 실행이 아니다. 최종 Goal 21에서 JS/Hermes 번들을 별도 재검증한다. OS 글자 확대·스크린리더·IME·키보드·native Safe Area는 기기/시뮬레이터에서 확인해야 한다.

8081: Explore → Search Medium → `ChatGPT Is Poisoning` → 기사. Story options에서 Reading tools, 하단 북마크에서 로그인 후 다시 눌러 Save to → Reading list → Done. Library에서 같은 기사를 열 수 있다. 커밋/push/배포 없음.
