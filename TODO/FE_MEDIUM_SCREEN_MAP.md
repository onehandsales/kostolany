# Medium 클론 화면 대응 기준

**최신 상태(2026-11-19):** [Goal24 결과·8081 확인 순서](FE_GOAL_24_RESULT.md). Goal24 전역 Light/Dark/System과 기사 표시 설정 구현·두 차례 자체 검토/수정을 마쳤다. 현재 타입/lint·98 suites/690 tests, 8081 흐름·부분 시각 대조와 양 플랫폼 JS/Hermes가 통과했다. 원본 font/vector·시각/native 잔여는 계속 추적한다. 최신 사용자 지시에 따라 Goal24 로컬 커밋 후 종료하고 Goal25 이후는 미착수·별도 요청 대기다. push·배포는 하지 않는다. 실제 인증/결제/메일/서버/DB는 연결하지 않는다. 기존8081 PID17148·medium·ENV와 기존 계약을 보존한다. 캡처/로그/일회성 스크립트는 저장소 밖 임시 경로만 사용하며 TODO/evidence에는 쓰지 않는다. 아래 이전 Goal 승인·수치·중단 문구는 당시 이력이다.

2026-11-19 · Goal 15에서 결정한 구현 기준. 상태는 각 Goal 결과와 최종 Goal 21 결과를 함께 확인한다.

## 비교 조건과 자산

- 로컬 원본 PNG 1179×2556을 **비교용으로만** 393×852에 정규화한다. MCP의 390×844 메타데이터와 구분하며 실제 DPR·기기 모델을 확정하지 않는다.
- 상태바 약 59, 홈 인디케이터 약 34를 제외한 앱 영역은 비교용 393×759다. 브라우저에는 가짜 OS 상태바를 그리지 않는다. native에서는 Safe Area가 실제 OS 영역을 책임진다. 전체 원본/앱 영역 crop을 모두 보존하고 조정한 비교 이미지는 별도 표시한다.
- 기본 비교는 영어 원문·동일 이미지·첫 스크롤·같은 선택 상태다. 개인 화면은 mock A 이름을 원본 Alex Smith로 맞춘 상태도 별도 캡처한다. 새 사용자 B와 긴 한국어는 변형 검증이다.
- 원본 글꼴 파일은 제공되지 않았다. 시스템 산세리프와 Georgia/Android serif 대체를 사용한다. 글꼴 렌더·정확한 자간·원본 애니메이션은 미확인이다.
- 원본 사진은 PNG의 사진 영역만 잘라 로컬 자산으로 재사용하고 출처/좌표를 기록한다. 화면 전체를 배경으로 쓰거나 원본 텍스트를 이미지로 붙이지 않는다.
- 기본 추정값: 페이지 가로 여백24, 제목24/32 semibold, 카드 제목20/25 bold, 요약16/21, 작은 정보12~13/18, 본문20/30 serif. 흰 배경, 본문 #242424, 보조 #6b6b6b, 입력 #f2f2f2, 녹색 #1a8917. 화면별 실측에 따라 조정한다.
- 보이는 작은 아이콘과 48×48 이상의 터치 영역을 구분한다. 접근성으로 원본과 간격 차이가 생기면 기록한다. 글자 확대를 차단하지 않는다.

## 상태 계약과 기존 UI 처리

| 항목 | 이번 구현 기본안 | 관찰과의 구분 |
| --- | --- | --- |
| 콘텐츠 | 원본에 있는 영어 기사 카드와 커버를 fixture로 재현한다. 기존 금융 fixture도 검색/읽기 도구 회귀에 유지한다. 기사 ID가 유일한 저장·좋아요 키다. | 원본에서 제공되지 않은 전체 본문은 임의로 원문처럼 만들지 않는다. |
| 홈 탭 | For you/Following/Featured를 별도 화면 선택으로 구현한다. 기존 latest/popular/recommended 조회 계약은 fixture 페이지 구성에 재사용할 수 있으나 추천 알고리즘/팔로우 구현으로 표현하지 않는다. | 기존 정렬명을 번역만 해서 원본 탭과 같은 기능이라고 하지 않는다. |
| 홈 − / 더보기 | −는 추천 제어 안내, 더보기는 저장 등 기존 행동을 노출한다. 검색·상세의 북마크와 구분한다. | 원본 − 실행 결과는 미수록이다. |
| 박수와 하트 | 원본 집계·박수 모양을 표시하되 기존 1회 선택/해제 반응 저장소를 재사용하는 mock 반응임을 접근성/안내에 명시한다. 여러 번 박수·실제 집계는 구현하지 않는다. | 하트와 Medium 박수가 동일한 제품 정책이라고 주장하지 않는다. |
| 설명 4단계 | 기사 읽기 도구를 통해 유지한다. 원본 본문과 따로 표시하며 기본 수준 설정도 기존 사용자별 계약을 유지한다. | 자체 추가 기능이며 원본 대응 화면에 숨겨진 비교 제외가 아니다. 진입과 캡처를 별도 기록한다. |
| 로그인 | 영어 원본 소개/공급자 화면, Google은 기존 모의 인증 연결. A/B·성공/취소/실패 선택은 명시된 mock 영역에 둔다. | 원본 Google 성공·계정 선택 캡처는 없다. 다른 공급자/이메일/코드 입력은 연결하지 않는다. |
| 프로필·설정 | 이름·소개·편집·기본 설명 수준·로그아웃은 기존 저장소 연결. 원본의 기타 메뉴는 로컬 미연결 안내를 연다. | 실제 결제·통계·알림·공개 프로필·계정 삭제 기능은 없다. |
| 목록 | 기본 읽기 목록 + 사용자 목록 생성/편집/삭제, 복수 기사 소속 유지. 선택 설명/Private를 로컬 메타데이터로 저장하며 외부 공개 권한은 생성하지 않는다. | 공개 목록·공유·메모·다운로드·수동 정렬 서비스는 미연결. Edit list info 편집 폼은 자체 설계. |
| 수명 | 모든 사용자 데이터는 기존 app 공급부 메모리. user ID/기사 ID/목록 ID, auth revision 역할 유지. 이름/설정 변경으로 인증 revision 변경 안 함. 로그아웃 후 A→B→A 유지, 전체 reload 초기화. | 실제 서버 영속성 아님. |

## 화면군과 보이는 메뉴의 대응

| Goal / 앱 진입 | 원본 흐름·상태 | 구현 대상 | 별도 안내·미수록·제외 |
| --- | --- | --- | --- |
| 16 / Home | Home 01~04 | 헤더·탭·카드·스크롤·추가 조회·하단 탐색 | 알림·작성·추천 제어·추천 publication은 로컬 안내, 실제 팔로우·개인화 없음 |
| 16 / Explore | Explore 02~05 | 검색 입력·주제·Trending·추천 카드 | 작가/Publication 팔로우는 미연결 안내 |
| 16 / Search | Searching Medium 01~03 | 진입·닫기·지우기·주제·Stories 결과·기사 복귀 | People/Publications/Topics/Lists 결과는 원본 미수록; 미연결 안내. 0건·실패는 자체 설계 |
| 17 / Article | Story detail 02~07 | 제목·부제·메타·작가·커버·본문·토픽·반응 바·읽기 도구 | 듣기·팔로우·댓글·공유·작가 추천은 실제 서비스 미연결 안내; 캡처 밖 본문은 미수록 |
| 17 / Save to | Saving a story 02~03 | 선택·Done·Create new list·활성 북마크 | Done 확정은 기존 구현 기본안; 원본은 저장 시점 미확인 |
| 18 / Library | Library 02~05 | Your lists·기본/사용자 목록·배너·미리보기·빈 상태 | Saved lists/Digest/Highlighted/Reading history는 미연결 안내; 원본 Reading history 본문 미수록 |
| 18 / List | List detail 02~04 | 빈 상태·Start browsing·목록 기사·상세 복귀·더보기 | Add a note·다운로드·공유·댓글은 미연결 안내 |
| 18 / Create/Edit/Delete/Remove | Creating a list 02~04, Deleting a list 02~04, Removing a story 01~02 | 생성·편집·삭제 확인·제거·취소·실패 복구 | 편집 폼 미수록. Undo 표시와 실제 복구 관찰을 구분. 목록 삭제는 원문/좋아요/다른 목록 유지 |
| 19 / Sign in/out | Logging in 01~02, Onboarding 02, Logging out 01~03 | 브랜드·소개·공급자 버튼·mock Google·닫기·로그아웃 확인 | 가입/코드/외부 공급자/결제/권한 요청 제외. 로그아웃 후 소개로 이동 여부는 기존 공개 화면 유지 정책과 비교 기록 |
| 20 / Profile | Profile 02~06 | 아바타·이름·편집·설정·탭·빈 상태·소개 | 통계·글쓰기·팔로우 서비스 미연결 안내 |
| 20 / Edit profile | Editing profile information 02/06 | 이름·소개·카운터·Save·닫기 | 사진·대명사·About Page 편집 미연결 안내. 50/160만 관찰값, 공백/중복/실패는 자체 정책 |
| 20 / Settings | Settings 02~03 | 섹션·행·프로필 편집·기본 설명 수준·Sign out | 알림·결제·연결·테마·아이콘·앱 제어·웹 정책 링크는 로컬 미연결 안내. 실제 버전 문자열과 원본 버전을 구분 |

원본의 메뉴를 표시하지만 안내로 끝나는 범위도 차이로 공개한다. 이 대응표는 Medium 전체 서비스 구현이나 100% UX 일치 선언이 아니다.

## 원본 파일 인덱스

화면 번호는 원본 파일명과 연결하며, 흐름 간 같은 screen ID는 중복 캡처다.

### Home

[ANALYSIS](<../medium/flows/Home/ANALYSIS.md>)

- [01_sc_5e0ba0e498ff49579bf838096aec4b5e](<../medium/flows/Home/screens/01_sc_5e0ba0e498ff49579bf838096aec4b5e.png>)
- [02_sc_1ef4e2f769774d2c958fcb38b96dc94f](<../medium/flows/Home/screens/02_sc_1ef4e2f769774d2c958fcb38b96dc94f.png>)
- [03_sc_e1cf4be8210f432098943d8a233d9d72](<../medium/flows/Home/screens/03_sc_e1cf4be8210f432098943d8a233d9d72.png>)
- [04_sc_4ec0a8b65f954b0984ece5b3b9f258e4](<../medium/flows/Home/screens/04_sc_4ec0a8b65f954b0984ece5b3b9f258e4.png>)

### Explore

[ANALYSIS](<../medium/flows/Explore/ANALYSIS.md>)

- [01_sc_5e0ba0e498ff49579bf838096aec4b5e](<../medium/flows/Explore/screens/01_sc_5e0ba0e498ff49579bf838096aec4b5e.png>)
- [02_sc_1c3e4349171248378eada528f7942269](<../medium/flows/Explore/screens/02_sc_1c3e4349171248378eada528f7942269.png>)
- [03_sc_602f368bf00a46b8b57d68f964ed6c16](<../medium/flows/Explore/screens/03_sc_602f368bf00a46b8b57d68f964ed6c16.png>)
- [04_sc_4352273aa0654f939705613dfa224e75](<../medium/flows/Explore/screens/04_sc_4352273aa0654f939705613dfa224e75.png>)
- [05_sc_6bc604f45031400d9cebd252cd89e7a2](<../medium/flows/Explore/screens/05_sc_6bc604f45031400d9cebd252cd89e7a2.png>)
- [06_sc_dfdd5f6377a848c59b3512417cb47490](<../medium/flows/Explore/screens/06_sc_dfdd5f6377a848c59b3512417cb47490.png>)

### Explore/Searching Medium

[ANALYSIS](<../medium/flows/Explore/Searching Medium/ANALYSIS.md>)

- [01_sc_1c3e4349171248378eada528f7942269](<../medium/flows/Explore/Searching Medium/screens/01_sc_1c3e4349171248378eada528f7942269.png>)
- [02_sc_047c91d900aa47448d61e4faacd68ad5](<../medium/flows/Explore/Searching Medium/screens/02_sc_047c91d900aa47448d61e4faacd68ad5.png>)
- [03_sc_8dc9eeb5f9d244ca9fa6fb7a973de82f](<../medium/flows/Explore/Searching Medium/screens/03_sc_8dc9eeb5f9d244ca9fa6fb7a973de82f.png>)

### Home/Story detail

[ANALYSIS](<../medium/flows/Home/Story detail/ANALYSIS.md>)

- [01_sc_1ef4e2f769774d2c958fcb38b96dc94f](<../medium/flows/Home/Story detail/screens/01_sc_1ef4e2f769774d2c958fcb38b96dc94f.png>)
- [02_sc_332d5b0923e546fcbf6a8fc613cda6a4](<../medium/flows/Home/Story detail/screens/02_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>)
- [03_sc_f4b06612bdbf48ecbd8a7b6e2607d117](<../medium/flows/Home/Story detail/screens/03_sc_f4b06612bdbf48ecbd8a7b6e2607d117.png>)
- [04_sc_c3fcf42b84be4b7298dfc138c224e241](<../medium/flows/Home/Story detail/screens/04_sc_c3fcf42b84be4b7298dfc138c224e241.png>)
- [05_sc_e1a92b59829c4678b3362d2dc6abae59](<../medium/flows/Home/Story detail/screens/05_sc_e1a92b59829c4678b3362d2dc6abae59.png>)
- [06_sc_c068a6d42c5c48fb9d60c8af4adb446f](<../medium/flows/Home/Story detail/screens/06_sc_c068a6d42c5c48fb9d60c8af4adb446f.png>)
- [07_sc_92624aea551d44a7bbcf71d7d78aff4c](<../medium/flows/Home/Story detail/screens/07_sc_92624aea551d44a7bbcf71d7d78aff4c.png>)

### Home/Story detail/Saving a story

[ANALYSIS](<../medium/flows/Home/Story detail/Saving a story/ANALYSIS.md>)

- [01_sc_332d5b0923e546fcbf6a8fc613cda6a4](<../medium/flows/Home/Story detail/Saving a story/screens/01_sc_332d5b0923e546fcbf6a8fc613cda6a4.png>)
- [02_sc_31edfd53d2874259a6ed5ecbc756d10b](<../medium/flows/Home/Story detail/Saving a story/screens/02_sc_31edfd53d2874259a6ed5ecbc756d10b.png>)
- [03_sc_dda8e78e9eb943629d3cf54eaed5fc22](<../medium/flows/Home/Story detail/Saving a story/screens/03_sc_dda8e78e9eb943629d3cf54eaed5fc22.png>)

### Library

[ANALYSIS](<../medium/flows/Library/ANALYSIS.md>)

- [01_sc_5e0ba0e498ff49579bf838096aec4b5e](<../medium/flows/Library/screens/01_sc_5e0ba0e498ff49579bf838096aec4b5e.png>)
- [02_sc_84e0421de98041bbb014822fc05dd3fb](<../medium/flows/Library/screens/02_sc_84e0421de98041bbb014822fc05dd3fb.png>)
- [03_sc_57450c38bf994be18d95fcaf712c56ba](<../medium/flows/Library/screens/03_sc_57450c38bf994be18d95fcaf712c56ba.png>)
- [04_sc_bafbf7b80b154e25aec15e120a13f72a](<../medium/flows/Library/screens/04_sc_bafbf7b80b154e25aec15e120a13f72a.png>)
- [05_sc_c37aefd0916548dda3cb46d61cc25193](<../medium/flows/Library/screens/05_sc_c37aefd0916548dda3cb46d61cc25193.png>)

### Library/Creating a list

[ANALYSIS](<../medium/flows/Library/Creating a list/ANALYSIS.md>)

- [01_sc_57450c38bf994be18d95fcaf712c56ba](<../medium/flows/Library/Creating a list/screens/01_sc_57450c38bf994be18d95fcaf712c56ba.png>)
- [02_sc_675e3eda08504708979533659dacdcf6](<../medium/flows/Library/Creating a list/screens/02_sc_675e3eda08504708979533659dacdcf6.png>)
- [03_sc_ca3b32e4373a40fc84405838671eab27](<../medium/flows/Library/Creating a list/screens/03_sc_ca3b32e4373a40fc84405838671eab27.png>)
- [04_sc_35dcbd9d4308404b9f11ecd03f893eb8](<../medium/flows/Library/Creating a list/screens/04_sc_35dcbd9d4308404b9f11ecd03f893eb8.png>)

### Library/List detail

[ANALYSIS](<../medium/flows/Library/List detail/ANALYSIS.md>)

- [01_sc_35dcbd9d4308404b9f11ecd03f893eb8](<../medium/flows/Library/List detail/screens/01_sc_35dcbd9d4308404b9f11ecd03f893eb8.png>)
- [02_sc_967232cfb5f845839053e0d371d78911](<../medium/flows/Library/List detail/screens/02_sc_967232cfb5f845839053e0d371d78911.png>)
- [03_sc_0b1e7b64b9f14f2cb5358161e0f67a94](<../medium/flows/Library/List detail/screens/03_sc_0b1e7b64b9f14f2cb5358161e0f67a94.png>)
- [04_sc_e20e59ee459b4a0d9a0a0302091962bd](<../medium/flows/Library/List detail/screens/04_sc_e20e59ee459b4a0d9a0a0302091962bd.png>)

### Library/List detail/Deleting a list

[ANALYSIS](<../medium/flows/Library/List detail/Deleting a list/ANALYSIS.md>)

- [01_sc_0b1e7b64b9f14f2cb5358161e0f67a94](<../medium/flows/Library/List detail/Deleting a list/screens/01_sc_0b1e7b64b9f14f2cb5358161e0f67a94.png>)
- [02_sc_71f31ac7803a47f89b2e76b6a9355a7c](<../medium/flows/Library/List detail/Deleting a list/screens/02_sc_71f31ac7803a47f89b2e76b6a9355a7c.png>)
- [03_sc_a1562b1931fc4650a544861094934588](<../medium/flows/Library/List detail/Deleting a list/screens/03_sc_a1562b1931fc4650a544861094934588.png>)
- [04_sc_7749ef5c35474c229a2515a9c2a53878](<../medium/flows/Library/List detail/Deleting a list/screens/04_sc_7749ef5c35474c229a2515a9c2a53878.png>)

### Library/List detail/Removing a story

[ANALYSIS](<../medium/flows/Library/List detail/Removing a story/ANALYSIS.md>)

- [01_sc_fa4e79f0bed747d698ae44e23f9223f9](<../medium/flows/Library/List detail/Removing a story/screens/01_sc_fa4e79f0bed747d698ae44e23f9223f9.png>)
- [02_sc_a79a8c62cfd64776ae74f84e0d98b5c3](<../medium/flows/Library/List detail/Removing a story/screens/02_sc_a79a8c62cfd64776ae74f84e0d98b5c3.png>)

### Logging in

[ANALYSIS](<../medium/flows/Logging in/ANALYSIS.md>)

- [01_sc_d55739aa2ac1495da026006235e7c0a7](<../medium/flows/Logging in/screens/01_sc_d55739aa2ac1495da026006235e7c0a7.png>)
- [02_sc_e4d414380a1047a2b7970cf7869a0866](<../medium/flows/Logging in/screens/02_sc_e4d414380a1047a2b7970cf7869a0866.png>)
- [03_sc_da2ab413cfe5481d9abe4f23eeaeb426](<../medium/flows/Logging in/screens/03_sc_da2ab413cfe5481d9abe4f23eeaeb426.png>)
- [04_sc_1d3dc01005c343c18427fe2c199e4075](<../medium/flows/Logging in/screens/04_sc_1d3dc01005c343c18427fe2c199e4075.png>)
- [05_sc_10e0a1c6f1154b3b85f8d5ed18b692d7](<../medium/flows/Logging in/screens/05_sc_10e0a1c6f1154b3b85f8d5ed18b692d7.png>)
- [06_sc_bc8c0aff71644874a42b97e6c7fd4ce2](<../medium/flows/Logging in/screens/06_sc_bc8c0aff71644874a42b97e6c7fd4ce2.png>)
- [07_sc_5e0ba0e498ff49579bf838096aec4b5e](<../medium/flows/Logging in/screens/07_sc_5e0ba0e498ff49579bf838096aec4b5e.png>)

### Onboarding

[ANALYSIS](<../medium/flows/Onboarding/ANALYSIS.md>)

- [01_sc_39bd15e8585d404daa48b34a448b0e32](<../medium/flows/Onboarding/screens/01_sc_39bd15e8585d404daa48b34a448b0e32.png>)
- [02_sc_d55739aa2ac1495da026006235e7c0a7](<../medium/flows/Onboarding/screens/02_sc_d55739aa2ac1495da026006235e7c0a7.png>)
- [03_sc_a4438be77c814444b7f0c005ee44e8b6](<../medium/flows/Onboarding/screens/03_sc_a4438be77c814444b7f0c005ee44e8b6.png>)
- [04_sc_4510def6bbb1459ab0b5f18d07b8427e](<../medium/flows/Onboarding/screens/04_sc_4510def6bbb1459ab0b5f18d07b8427e.png>)
- [05_sc_10e0a1c6f1154b3b85f8d5ed18b692d7](<../medium/flows/Onboarding/screens/05_sc_10e0a1c6f1154b3b85f8d5ed18b692d7.png>)
- [06_sc_55d8ee5f826740d69ebd2e163aaa6486](<../medium/flows/Onboarding/screens/06_sc_55d8ee5f826740d69ebd2e163aaa6486.png>)
- [07_sc_3795c955a89d404c85112e637857e74a](<../medium/flows/Onboarding/screens/07_sc_3795c955a89d404c85112e637857e74a.png>)
- [08_sc_5843ae43bf154aadb5507c6fa51d150d](<../medium/flows/Onboarding/screens/08_sc_5843ae43bf154aadb5507c6fa51d150d.png>)
- [09_sc_05f2a886f5464a728dd61a6291707a3d](<../medium/flows/Onboarding/screens/09_sc_05f2a886f5464a728dd61a6291707a3d.png>)
- [10_sc_301ef788e5514bb5b8e9c1fc9afcfa61](<../medium/flows/Onboarding/screens/10_sc_301ef788e5514bb5b8e9c1fc9afcfa61.png>)
- [11_sc_e9f4c426cfb3426d9ca05121dea00ce3](<../medium/flows/Onboarding/screens/11_sc_e9f4c426cfb3426d9ca05121dea00ce3.png>)
- [12_sc_b4e85416681544c9b996826eefa22432](<../medium/flows/Onboarding/screens/12_sc_b4e85416681544c9b996826eefa22432.png>)
- [13_sc_5e0ba0e498ff49579bf838096aec4b5e](<../medium/flows/Onboarding/screens/13_sc_5e0ba0e498ff49579bf838096aec4b5e.png>)

### Profile

[ANALYSIS](<../medium/flows/Profile/ANALYSIS.md>)

- [01_sc_5e0ba0e498ff49579bf838096aec4b5e](<../medium/flows/Profile/screens/01_sc_5e0ba0e498ff49579bf838096aec4b5e.png>)
- [02_sc_1bd141b757934a88b4a003855e1794cc](<../medium/flows/Profile/screens/02_sc_1bd141b757934a88b4a003855e1794cc.png>)
- [03_sc_d76d3680605f4b62ab31e3039d6c4fe6](<../medium/flows/Profile/screens/03_sc_d76d3680605f4b62ab31e3039d6c4fe6.png>)
- [04_sc_64afef71457f48808c33def66fd6d90e](<../medium/flows/Profile/screens/04_sc_64afef71457f48808c33def66fd6d90e.png>)
- [05_sc_d55f02281f894078a734269d60de79c4](<../medium/flows/Profile/screens/05_sc_d55f02281f894078a734269d60de79c4.png>)
- [06_sc_3cd0855e78a84d4ea413f0e5b3dffb73](<../medium/flows/Profile/screens/06_sc_3cd0855e78a84d4ea413f0e5b3dffb73.png>)

### Profile/Editing profile information

[ANALYSIS](<../medium/flows/Profile/Editing profile information/ANALYSIS.md>)

- [01_sc_1bd141b757934a88b4a003855e1794cc](<../medium/flows/Profile/Editing profile information/screens/01_sc_1bd141b757934a88b4a003855e1794cc.png>)
- [02_sc_a829121c47a444cd8a8fd0d9889edaed](<../medium/flows/Profile/Editing profile information/screens/02_sc_a829121c47a444cd8a8fd0d9889edaed.png>)
- [03_sc_cba29e82e4364a239d3e5423213fa670](<../medium/flows/Profile/Editing profile information/screens/03_sc_cba29e82e4364a239d3e5423213fa670.png>)
- [04_sc_9fd133df622e4ddd859bbbeb845ba4da](<../medium/flows/Profile/Editing profile information/screens/04_sc_9fd133df622e4ddd859bbbeb845ba4da.png>)
- [05_sc_05df03a16c6b466b8ba91d9d6244c2f5](<../medium/flows/Profile/Editing profile information/screens/05_sc_05df03a16c6b466b8ba91d9d6244c2f5.png>)
- [06_sc_befb6fde38cc48f3827ea389caed11de](<../medium/flows/Profile/Editing profile information/screens/06_sc_befb6fde38cc48f3827ea389caed11de.png>)
- [07_sc_be99c4fdcf634190a324ec9820a84f43](<../medium/flows/Profile/Editing profile information/screens/07_sc_be99c4fdcf634190a324ec9820a84f43.png>)
- [08_sc_3cd0855e78a84d4ea413f0e5b3dffb73](<../medium/flows/Profile/Editing profile information/screens/08_sc_3cd0855e78a84d4ea413f0e5b3dffb73.png>)

### Profile/Settings

[ANALYSIS](<../medium/flows/Profile/Settings/ANALYSIS.md>)

- [01_sc_d76d3680605f4b62ab31e3039d6c4fe6](<../medium/flows/Profile/Settings/screens/01_sc_d76d3680605f4b62ab31e3039d6c4fe6.png>)
- [02_sc_ddd51660cb8346a1b200ed970a2d5c45](<../medium/flows/Profile/Settings/screens/02_sc_ddd51660cb8346a1b200ed970a2d5c45.png>)
- [03_sc_c653047933aa40b2be7a8f281643d41d](<../medium/flows/Profile/Settings/screens/03_sc_c653047933aa40b2be7a8f281643d41d.png>)

### Profile/Settings/Logging out

[ANALYSIS](<../medium/flows/Profile/Settings/Logging out/ANALYSIS.md>)

- [01_sc_c653047933aa40b2be7a8f281643d41d](<../medium/flows/Profile/Settings/Logging out/screens/01_sc_c653047933aa40b2be7a8f281643d41d.png>)
- [02_sc_2d1afd7a02a347868564f9757753d077](<../medium/flows/Profile/Settings/Logging out/screens/02_sc_2d1afd7a02a347868564f9757753d077.png>)
- [03_sc_d55739aa2ac1495da026006235e7c0a7](<../medium/flows/Profile/Settings/Logging out/screens/03_sc_d55739aa2ac1495da026006235e7c0a7.png>)

## Goal21 최종 실행 상태

각 대상의 구현/두 검토/성공·실패·경합·실제 navigation·8081 상태는 [최종 결과](FE_GOAL_21_RESULT.md)에 정리했다. [최종31쌍 비교](evidence/goal21/COMPARISON.html)는 실제 최신 캡처다. 원본 폰트/아이콘·일부 헤더/간격·모의 데이터/메뉴·native 검증 차이가 남아100% 일치로 판정하지 않는다. 원본 편집 폼의 사진/대명사, 응답의 사용자명, 기본 읽기 목록 초기 기사 수 등 서로 다른 상태를 같은 상태로 취급하지 않는다.
