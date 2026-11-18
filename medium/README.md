# Medium iOS 플로우 분석

**63개 흐름 · 273단계 · 고유 이미지 200장**을 Gummble MCP로 조회하고 실제 이미지를 확인했다. 각 흐름 폴더에 `ANALYSIS.md` 1개를 작성했다.

- 검토: 2026-11-18 KST · R2 누락·내용 재검토 완료. 계정 재현은 미수행. [재검토 결과와 남은 범위](REVIEW_R2.md).
- 앱: `medium-ios` · version ID `1419` (`Latest`). 개별 캡처일·빌드는 일괄 확인되지 않았다.
- 구조: 최상위 6개 + 하위 57개, 최대 5단계 깊이. 각 숫자는 그 흐름 자체의 화면 수이며 자식 합계가 아니다.
- 공통 이미지는 한 번 관찰해 각 흐름의 단계 맥락에 재사용했다. 273장을 각각 별개 이미지로 검토했다고 계산하지 않는다.
- R1 검토 방식: 원본/고화질 10장, MCP optimized 190장. 모두 원본 PNG를 함께 보관했다.
- R2 검토 방식: 원본을 390×844로 축소한 비교 시트 34개에서 고유 이미지 200장을 다시 확인했다. 79개 화면 기록을 보완·교정하고 63개 흐름의 진입·종료·미수록 분기를 대조했다.
- 관찰·공식 설명·설계 가정·미확인을 문서에서 구분했다. 이 연구는 Kostolany 구현 범위를 자동으로 확정하지 않는다.

## 탐색

| 흐름 경로 | 자체 단계 | 분석 문서 |
| --- | ---: | --- |
| Onboarding | 13 | [ANALYSIS.md](<flows/Onboarding/ANALYSIS.md>) |
| Onboarding/Subscribing to Medium | 6 | [ANALYSIS.md](<flows/Onboarding/Subscribing to Medium/ANALYSIS.md>) |
| Home | 4 | [ANALYSIS.md](<flows/Home/ANALYSIS.md>) |
| Home/Publishing a story | 11 | [ANALYSIS.md](<flows/Home/Publishing a story/ANALYSIS.md>) |
| Home/Publishing a story/Changing text format | 5 | [ANALYSIS.md](<flows/Home/Publishing a story/Changing text format/ANALYSIS.md>) |
| Home/Publishing a story/Mentioning a user | 4 | [ANALYSIS.md](<flows/Home/Publishing a story/Mentioning a user/ANALYSIS.md>) |
| Home/Publishing a story/Drafts | 3 | [ANALYSIS.md](<flows/Home/Publishing a story/Drafts/ANALYSIS.md>) |
| Home/Publishing a story/Adding topics | 6 | [ANALYSIS.md](<flows/Home/Publishing a story/Adding topics/ANALYSIS.md>) |
| Home/Refine recommendations | 5 | [ANALYSIS.md](<flows/Home/Refine recommendations/ANALYSIS.md>) |
| Home/Refine recommendations/Filtering suggestions | 4 | [ANALYSIS.md](<flows/Home/Refine recommendations/Filtering suggestions/ANALYSIS.md>) |
| Home/Refine recommendations/Reading history | 2 | [ANALYSIS.md](<flows/Home/Refine recommendations/Reading history/ANALYSIS.md>) |
| Home/Refine recommendations/Reading history/Clearing history | 2 | [ANALYSIS.md](<flows/Home/Refine recommendations/Reading history/Clearing history/ANALYSIS.md>) |
| Home/Story detail | 7 | [ANALYSIS.md](<flows/Home/Story detail/ANALYSIS.md>) |
| Home/Story detail/Sending claps | 3 | [ANALYSIS.md](<flows/Home/Story detail/Sending claps/ANALYSIS.md>) |
| Home/Story detail/Responses | 3 | [ANALYSIS.md](<flows/Home/Story detail/Responses/ANALYSIS.md>) |
| Home/Story detail/Responses/Commenting a story | 3 | [ANALYSIS.md](<flows/Home/Story detail/Responses/Commenting a story/ANALYSIS.md>) |
| Home/Story detail/Responses/Commenting a story/Editing a response | 5 | [ANALYSIS.md](<flows/Home/Story detail/Responses/Commenting a story/Editing a response/ANALYSIS.md>) |
| Home/Story detail/Responses/Commenting a story/Deleting a response | 3 | [ANALYSIS.md](<flows/Home/Story detail/Responses/Commenting a story/Deleting a response/ANALYSIS.md>) |
| Home/Story detail/Responses/Sorting responses | 3 | [ANALYSIS.md](<flows/Home/Story detail/Responses/Sorting responses/ANALYSIS.md>) |
| Home/Story detail/Responses/Replying a response | 4 | [ANALYSIS.md](<flows/Home/Story detail/Responses/Replying a response/ANALYSIS.md>) |
| Home/Story detail/Responses/Medium policy | 2 | [ANALYSIS.md](<flows/Home/Story detail/Responses/Medium policy/ANALYSIS.md>) |
| Home/Story detail/Saving a story | 3 | [ANALYSIS.md](<flows/Home/Story detail/Saving a story/ANALYSIS.md>) |
| Home/Story detail/Sharing a story | 4 | [ANALYSIS.md](<flows/Home/Story detail/Sharing a story/ANALYSIS.md>) |
| Home/Story detail/Sharing a story/Downloading an image | 2 | [ANALYSIS.md](<flows/Home/Story detail/Sharing a story/Downloading an image/ANALYSIS.md>) |
| Home/Story detail/Author detail | 4 | [ANALYSIS.md](<flows/Home/Story detail/Author detail/ANALYSIS.md>) |
| Home/Story detail/Author detail/Following list | 2 | [ANALYSIS.md](<flows/Home/Story detail/Author detail/Following list/ANALYSIS.md>) |
| Home/Story detail/Author detail/Following an author | 4 | [ANALYSIS.md](<flows/Home/Story detail/Author detail/Following an author/ANALYSIS.md>) |
| Home/Story detail/Author detail/Following an author/Unfollowing an author | 2 | [ANALYSIS.md](<flows/Home/Story detail/Author detail/Following an author/Unfollowing an author/ANALYSIS.md>) |
| Home/Story detail/Author detail/Muting an author | 3 | [ANALYSIS.md](<flows/Home/Story detail/Author detail/Muting an author/ANALYSIS.md>) |
| Home/Story detail/Author detail/Blocking an author | 4 | [ANALYSIS.md](<flows/Home/Story detail/Author detail/Blocking an author/ANALYSIS.md>) |
| Home/Story detail/Author detail/Reporting an author | 5 | [ANALYSIS.md](<flows/Home/Story detail/Author detail/Reporting an author/ANALYSIS.md>) |
| Home/Story detail/Listening to a story | 5 | [ANALYSIS.md](<flows/Home/Story detail/Listening to a story/ANALYSIS.md>) |
| Home/Story detail/Listening to a story/Changing playback speed | 4 | [ANALYSIS.md](<flows/Home/Story detail/Listening to a story/Changing playback speed/ANALYSIS.md>) |
| Home/Story detail/Listening to a story/Changing voice | 6 | [ANALYSIS.md](<flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>) |
| Home/Story detail/Changing display | 9 | [ANALYSIS.md](<flows/Home/Story detail/Changing display/ANALYSIS.md>) |
| Home/Story detail/Highlighting a phrase | 3 | [ANALYSIS.md](<flows/Home/Story detail/Highlighting a phrase/ANALYSIS.md>) |
| Home/Story detail/Responding to a phrase | 4 | [ANALYSIS.md](<flows/Home/Story detail/Responding to a phrase/ANALYSIS.md>) |
| Home/Notifications | 2 | [ANALYSIS.md](<flows/Home/Notifications/ANALYSIS.md>) |
| Explore | 6 | [ANALYSIS.md](<flows/Explore/ANALYSIS.md>) |
| Explore/Searching Medium | 3 | [ANALYSIS.md](<flows/Explore/Searching Medium/ANALYSIS.md>) |
| Explore/Topic detail | 2 | [ANALYSIS.md](<flows/Explore/Topic detail/ANALYSIS.md>) |
| Explore/Topic detail/Browse curated list | 5 | [ANALYSIS.md](<flows/Explore/Topic detail/Browse curated list/ANALYSIS.md>) |
| Library | 5 | [ANALYSIS.md](<flows/Library/ANALYSIS.md>) |
| Library/Creating a list | 4 | [ANALYSIS.md](<flows/Library/Creating a list/ANALYSIS.md>) |
| Library/List detail | 4 | [ANALYSIS.md](<flows/Library/List detail/ANALYSIS.md>) |
| Library/List detail/Adding a note | 5 | [ANALYSIS.md](<flows/Library/List detail/Adding a note/ANALYSIS.md>) |
| Library/List detail/Removing a story | 2 | [ANALYSIS.md](<flows/Library/List detail/Removing a story/ANALYSIS.md>) |
| Library/List detail/Downloading a list | 3 | [ANALYSIS.md](<flows/Library/List detail/Downloading a list/ANALYSIS.md>) |
| Library/List detail/Making a list private | 5 | [ANALYSIS.md](<flows/Library/List detail/Making a list private/ANALYSIS.md>) |
| Library/List detail/Reordering items | 5 | [ANALYSIS.md](<flows/Library/List detail/Reordering items/ANALYSIS.md>) |
| Library/List detail/Deleting a list | 4 | [ANALYSIS.md](<flows/Library/List detail/Deleting a list/ANALYSIS.md>) |
| Library/Filtering digest | 4 | [ANALYSIS.md](<flows/Library/Filtering digest/ANALYSIS.md>) |
| Library/Filtering digest/Digest settings | 2 | [ANALYSIS.md](<flows/Library/Filtering digest/Digest settings/ANALYSIS.md>) |
| Profile | 6 | [ANALYSIS.md](<flows/Profile/ANALYSIS.md>) |
| Profile/Story stats | 4 | [ANALYSIS.md](<flows/Profile/Story stats/ANALYSIS.md>) |
| Profile/Editing profile information | 8 | [ANALYSIS.md](<flows/Profile/Editing profile information/ANALYSIS.md>) |
| Profile/Editing profile information/Adding pronouns | 6 | [ANALYSIS.md](<flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>) |
| Profile/Settings | 3 | [ANALYSIS.md](<flows/Profile/Settings/ANALYSIS.md>) |
| Profile/Settings/Switching to dark mode | 8 | [ANALYSIS.md](<flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>) |
| Profile/Settings/Changing notification settings | 3 | [ANALYSIS.md](<flows/Profile/Settings/Changing notification settings/ANALYSIS.md>) |
| Profile/Settings/Custom app icon | 2 | [ANALYSIS.md](<flows/Profile/Settings/Custom app icon/ANALYSIS.md>) |
| Profile/Settings/Logging out | 3 | [ANALYSIS.md](<flows/Profile/Settings/Logging out/ANALYSIS.md>) |
| Logging in | 7 | [ANALYSIS.md](<flows/Logging in/ANALYSIS.md>) |

## 근거와 재검증

- [공식 도움말·API 대조](SOURCES.md): 26개 공식 출처와 적용 범위. R2에서 차단·신고·응답 관리 3개 추가.
- [R2 화면 검토 기록](_research/r2-image-review.json): 실제 재검토 인덱스와 보완·교정 내역.
- [R2 흐름 검토 기록](_research/r2-flow-review.json): 63개 흐름의 진입·종료·미수록 분기·교차 연결.
- [R2 MCP 대조](_research/r2-mcp-comparison.json) · [R2 트리 대조](_research/r2-live-tree.json): 전체 단계·최신 200개 화면 집합·부모/자식 구조 재확인.
- [조회 카탈로그](_research/catalog.json): Flow ID·부모/자식·MCP 단계 순서·Screen ID·원본 URL.
- [이미지 매니페스트](_research/image-manifest.json): 원본 PNG 크기·SHA-256·파일 경로.
- [화면 관찰 기록](_research/observations): 시각 확인 후 작성한 200개 화면별 관찰.
- [흐름별 해석](_research/flow-profiles.json): 목적·연결의 한계·공식 자료 매핑.
- [검증 결과](_research/validation.json): 문서·단계·로컬 링크·이미지 무결성 검사.

```powershell
node medium/_research/validate-docs.mjs
```

문서를 다시 조립하려면 `node medium/_research/generate-docs.mjs`를 실행한다. 이 명령은 63개 분석 문서와 이 색인·공식 자료 요약을 덮어쓴다. 수동 교정은 관찰 기록·흐름별 해석·생성기에도 반영해야 유지된다.

## 남아 있는 검증

실제 로그인·구매·발행·삭제·신고·공유를 실행하지 않았다. 실패·취소·권한 거부·오프라인·다른 계정·다른 기기 동기화는 각 문서 8절의 확인 항목이다. 현재 도움말과 과거 화면의 차이는 기존 캡처를 수정하지 않고 기록했다.
