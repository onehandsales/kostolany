# Medium iOS 플로우 분석

**63개 흐름 · 273단계 · 고유 이미지 200장**을 Gummble MCP로 조회하고 실제 이미지를 확인했다. 각 흐름 폴더에 `ANALYSIS.md` 1개를 작성했다.

- 검토: 2026-11-18 KST · R2 누락·내용 재검토 완료. 계정 재현은 미수행. [재검토 결과와 남은 범위](REVIEW_R2.md).
- 앱: `medium-ios` · version ID `1419` (`Latest`). 개별 캡처일·빌드는 일괄 확인되지 않았다.
- 구조: 최상위 6개 + 하위 57개, 최대 5단계 깊이. 각 숫자는 그 흐름 자체의 화면 수이며 자식 합계가 아니다.
- 공통 이미지는 한 번 관찰해 각 흐름의 단계 맥락에 재사용했다. 273장을 각각 별개 이미지로 검토했다고 계산하지 않는다.
- R1 검토 방식: 원본/고화질 10장, MCP optimized 190장. 모두 원본 PNG를 함께 보관했다.
- R2 검토 방식: 원본을 390×844로 축소한 비교 시트 34개에서 고유 이미지 200장을 다시 확인했다. 79개 화면 기록을 보완·교정하고 63개 흐름의 진입·종료·미수록 분기를 대조했다.
- 관찰·공식 설명·설계 가정·미확인을 문서에서 구분했다. 이 연구는 Kostolany 구현 범위를 자동으로 확정하지 않는다.

## 흐름별 이미지

각 Flow 폴더의 `screens/`에 해당 흐름 자체의 이미지를 배치했다. **63개 폴더 · 273개 PNG**이며, 부모 폴더에 자식 Flow 이미지를 합치지 않는다.

- 파일명: `01_<Screen ID>.png`, `02_<Screen ID>.png` 순서. 단계 번호는 MCP가 반환한 캡처 순서다.
- 분석 문서의 전체 단계표에서 화면 이름을 누르거나, 상세 분석의 로컬 이미지 링크로 해당 PNG를 열 수 있다.
- 원본 크기·내용의 이미지 273개를 각 Flow의 `screens/`에 보관한다. `medium/screens/`의 중복 200개는 Flow 파일과 SHA-256 일치를 확인한 뒤 삭제했다. 고유 화면 200개는 모두 Flow 폴더에 남아 있다.
- 배치 근거: 2026-11-18 02:34:47 UTC에 MCP에서 63개 Flow의 단계 ID·순서·이미지 URL·메타데이터를 다시 조회했다. 기존 원본과 동일하여 보관된 PNG를 사용했다.
- 배치 재검토는 파일 누락·초과·순서·문서 링크·원본 해시 대조다. R2 이후의 추가 시각 검토 횟수로 계산하지 않는다.

```text
medium/flows/Home/
├── ANALYSIS.md
├── screens/
│   ├── 01_<Screen ID>.png
│   └── ...
└── Story detail/
    ├── ANALYSIS.md
    └── screens/
        ├── 01_<Screen ID>.png
        └── ...
```

## 탐색

| 흐름 경로 | 자체 단계 | 분석 문서 | 이미지 |
| --- | ---: | --- | --- |
| Onboarding | 13 | [ANALYSIS.md](<flows/Onboarding/ANALYSIS.md>) | [screens/](<flows/Onboarding/screens/>) |
| Onboarding/Subscribing to Medium | 6 | [ANALYSIS.md](<flows/Onboarding/Subscribing to Medium/ANALYSIS.md>) | [screens/](<flows/Onboarding/Subscribing to Medium/screens/>) |
| Home | 4 | [ANALYSIS.md](<flows/Home/ANALYSIS.md>) | [screens/](<flows/Home/screens/>) |
| Home/Publishing a story | 11 | [ANALYSIS.md](<flows/Home/Publishing a story/ANALYSIS.md>) | [screens/](<flows/Home/Publishing a story/screens/>) |
| Home/Publishing a story/Changing text format | 5 | [ANALYSIS.md](<flows/Home/Publishing a story/Changing text format/ANALYSIS.md>) | [screens/](<flows/Home/Publishing a story/Changing text format/screens/>) |
| Home/Publishing a story/Mentioning a user | 4 | [ANALYSIS.md](<flows/Home/Publishing a story/Mentioning a user/ANALYSIS.md>) | [screens/](<flows/Home/Publishing a story/Mentioning a user/screens/>) |
| Home/Publishing a story/Drafts | 3 | [ANALYSIS.md](<flows/Home/Publishing a story/Drafts/ANALYSIS.md>) | [screens/](<flows/Home/Publishing a story/Drafts/screens/>) |
| Home/Publishing a story/Adding topics | 6 | [ANALYSIS.md](<flows/Home/Publishing a story/Adding topics/ANALYSIS.md>) | [screens/](<flows/Home/Publishing a story/Adding topics/screens/>) |
| Home/Refine recommendations | 5 | [ANALYSIS.md](<flows/Home/Refine recommendations/ANALYSIS.md>) | [screens/](<flows/Home/Refine recommendations/screens/>) |
| Home/Refine recommendations/Filtering suggestions | 4 | [ANALYSIS.md](<flows/Home/Refine recommendations/Filtering suggestions/ANALYSIS.md>) | [screens/](<flows/Home/Refine recommendations/Filtering suggestions/screens/>) |
| Home/Refine recommendations/Reading history | 2 | [ANALYSIS.md](<flows/Home/Refine recommendations/Reading history/ANALYSIS.md>) | [screens/](<flows/Home/Refine recommendations/Reading history/screens/>) |
| Home/Refine recommendations/Reading history/Clearing history | 2 | [ANALYSIS.md](<flows/Home/Refine recommendations/Reading history/Clearing history/ANALYSIS.md>) | [screens/](<flows/Home/Refine recommendations/Reading history/Clearing history/screens/>) |
| Home/Story detail | 7 | [ANALYSIS.md](<flows/Home/Story detail/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/screens/>) |
| Home/Story detail/Sending claps | 3 | [ANALYSIS.md](<flows/Home/Story detail/Sending claps/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/Sending claps/screens/>) |
| Home/Story detail/Responses | 3 | [ANALYSIS.md](<flows/Home/Story detail/Responses/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/Responses/screens/>) |
| Home/Story detail/Responses/Commenting a story | 3 | [ANALYSIS.md](<flows/Home/Story detail/Responses/Commenting a story/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/Responses/Commenting a story/screens/>) |
| Home/Story detail/Responses/Commenting a story/Editing a response | 5 | [ANALYSIS.md](<flows/Home/Story detail/Responses/Commenting a story/Editing a response/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/Responses/Commenting a story/Editing a response/screens/>) |
| Home/Story detail/Responses/Commenting a story/Deleting a response | 3 | [ANALYSIS.md](<flows/Home/Story detail/Responses/Commenting a story/Deleting a response/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/Responses/Commenting a story/Deleting a response/screens/>) |
| Home/Story detail/Responses/Sorting responses | 3 | [ANALYSIS.md](<flows/Home/Story detail/Responses/Sorting responses/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/Responses/Sorting responses/screens/>) |
| Home/Story detail/Responses/Replying a response | 4 | [ANALYSIS.md](<flows/Home/Story detail/Responses/Replying a response/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/Responses/Replying a response/screens/>) |
| Home/Story detail/Responses/Medium policy | 2 | [ANALYSIS.md](<flows/Home/Story detail/Responses/Medium policy/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/Responses/Medium policy/screens/>) |
| Home/Story detail/Saving a story | 3 | [ANALYSIS.md](<flows/Home/Story detail/Saving a story/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/Saving a story/screens/>) |
| Home/Story detail/Sharing a story | 4 | [ANALYSIS.md](<flows/Home/Story detail/Sharing a story/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/Sharing a story/screens/>) |
| Home/Story detail/Sharing a story/Downloading an image | 2 | [ANALYSIS.md](<flows/Home/Story detail/Sharing a story/Downloading an image/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/Sharing a story/Downloading an image/screens/>) |
| Home/Story detail/Author detail | 4 | [ANALYSIS.md](<flows/Home/Story detail/Author detail/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/Author detail/screens/>) |
| Home/Story detail/Author detail/Following list | 2 | [ANALYSIS.md](<flows/Home/Story detail/Author detail/Following list/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/Author detail/Following list/screens/>) |
| Home/Story detail/Author detail/Following an author | 4 | [ANALYSIS.md](<flows/Home/Story detail/Author detail/Following an author/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/Author detail/Following an author/screens/>) |
| Home/Story detail/Author detail/Following an author/Unfollowing an author | 2 | [ANALYSIS.md](<flows/Home/Story detail/Author detail/Following an author/Unfollowing an author/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/Author detail/Following an author/Unfollowing an author/screens/>) |
| Home/Story detail/Author detail/Muting an author | 3 | [ANALYSIS.md](<flows/Home/Story detail/Author detail/Muting an author/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/Author detail/Muting an author/screens/>) |
| Home/Story detail/Author detail/Blocking an author | 4 | [ANALYSIS.md](<flows/Home/Story detail/Author detail/Blocking an author/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/Author detail/Blocking an author/screens/>) |
| Home/Story detail/Author detail/Reporting an author | 5 | [ANALYSIS.md](<flows/Home/Story detail/Author detail/Reporting an author/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/Author detail/Reporting an author/screens/>) |
| Home/Story detail/Listening to a story | 5 | [ANALYSIS.md](<flows/Home/Story detail/Listening to a story/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/Listening to a story/screens/>) |
| Home/Story detail/Listening to a story/Changing playback speed | 4 | [ANALYSIS.md](<flows/Home/Story detail/Listening to a story/Changing playback speed/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/Listening to a story/Changing playback speed/screens/>) |
| Home/Story detail/Listening to a story/Changing voice | 6 | [ANALYSIS.md](<flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/Listening to a story/Changing voice/screens/>) |
| Home/Story detail/Changing display | 9 | [ANALYSIS.md](<flows/Home/Story detail/Changing display/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/Changing display/screens/>) |
| Home/Story detail/Highlighting a phrase | 3 | [ANALYSIS.md](<flows/Home/Story detail/Highlighting a phrase/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/Highlighting a phrase/screens/>) |
| Home/Story detail/Responding to a phrase | 4 | [ANALYSIS.md](<flows/Home/Story detail/Responding to a phrase/ANALYSIS.md>) | [screens/](<flows/Home/Story detail/Responding to a phrase/screens/>) |
| Home/Notifications | 2 | [ANALYSIS.md](<flows/Home/Notifications/ANALYSIS.md>) | [screens/](<flows/Home/Notifications/screens/>) |
| Explore | 6 | [ANALYSIS.md](<flows/Explore/ANALYSIS.md>) | [screens/](<flows/Explore/screens/>) |
| Explore/Searching Medium | 3 | [ANALYSIS.md](<flows/Explore/Searching Medium/ANALYSIS.md>) | [screens/](<flows/Explore/Searching Medium/screens/>) |
| Explore/Topic detail | 2 | [ANALYSIS.md](<flows/Explore/Topic detail/ANALYSIS.md>) | [screens/](<flows/Explore/Topic detail/screens/>) |
| Explore/Topic detail/Browse curated list | 5 | [ANALYSIS.md](<flows/Explore/Topic detail/Browse curated list/ANALYSIS.md>) | [screens/](<flows/Explore/Topic detail/Browse curated list/screens/>) |
| Library | 5 | [ANALYSIS.md](<flows/Library/ANALYSIS.md>) | [screens/](<flows/Library/screens/>) |
| Library/Creating a list | 4 | [ANALYSIS.md](<flows/Library/Creating a list/ANALYSIS.md>) | [screens/](<flows/Library/Creating a list/screens/>) |
| Library/List detail | 4 | [ANALYSIS.md](<flows/Library/List detail/ANALYSIS.md>) | [screens/](<flows/Library/List detail/screens/>) |
| Library/List detail/Adding a note | 5 | [ANALYSIS.md](<flows/Library/List detail/Adding a note/ANALYSIS.md>) | [screens/](<flows/Library/List detail/Adding a note/screens/>) |
| Library/List detail/Removing a story | 2 | [ANALYSIS.md](<flows/Library/List detail/Removing a story/ANALYSIS.md>) | [screens/](<flows/Library/List detail/Removing a story/screens/>) |
| Library/List detail/Downloading a list | 3 | [ANALYSIS.md](<flows/Library/List detail/Downloading a list/ANALYSIS.md>) | [screens/](<flows/Library/List detail/Downloading a list/screens/>) |
| Library/List detail/Making a list private | 5 | [ANALYSIS.md](<flows/Library/List detail/Making a list private/ANALYSIS.md>) | [screens/](<flows/Library/List detail/Making a list private/screens/>) |
| Library/List detail/Reordering items | 5 | [ANALYSIS.md](<flows/Library/List detail/Reordering items/ANALYSIS.md>) | [screens/](<flows/Library/List detail/Reordering items/screens/>) |
| Library/List detail/Deleting a list | 4 | [ANALYSIS.md](<flows/Library/List detail/Deleting a list/ANALYSIS.md>) | [screens/](<flows/Library/List detail/Deleting a list/screens/>) |
| Library/Filtering digest | 4 | [ANALYSIS.md](<flows/Library/Filtering digest/ANALYSIS.md>) | [screens/](<flows/Library/Filtering digest/screens/>) |
| Library/Filtering digest/Digest settings | 2 | [ANALYSIS.md](<flows/Library/Filtering digest/Digest settings/ANALYSIS.md>) | [screens/](<flows/Library/Filtering digest/Digest settings/screens/>) |
| Profile | 6 | [ANALYSIS.md](<flows/Profile/ANALYSIS.md>) | [screens/](<flows/Profile/screens/>) |
| Profile/Story stats | 4 | [ANALYSIS.md](<flows/Profile/Story stats/ANALYSIS.md>) | [screens/](<flows/Profile/Story stats/screens/>) |
| Profile/Editing profile information | 8 | [ANALYSIS.md](<flows/Profile/Editing profile information/ANALYSIS.md>) | [screens/](<flows/Profile/Editing profile information/screens/>) |
| Profile/Editing profile information/Adding pronouns | 6 | [ANALYSIS.md](<flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>) | [screens/](<flows/Profile/Editing profile information/Adding pronouns/screens/>) |
| Profile/Settings | 3 | [ANALYSIS.md](<flows/Profile/Settings/ANALYSIS.md>) | [screens/](<flows/Profile/Settings/screens/>) |
| Profile/Settings/Switching to dark mode | 8 | [ANALYSIS.md](<flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>) | [screens/](<flows/Profile/Settings/Switching to dark mode/screens/>) |
| Profile/Settings/Changing notification settings | 3 | [ANALYSIS.md](<flows/Profile/Settings/Changing notification settings/ANALYSIS.md>) | [screens/](<flows/Profile/Settings/Changing notification settings/screens/>) |
| Profile/Settings/Custom app icon | 2 | [ANALYSIS.md](<flows/Profile/Settings/Custom app icon/ANALYSIS.md>) | [screens/](<flows/Profile/Settings/Custom app icon/screens/>) |
| Profile/Settings/Logging out | 3 | [ANALYSIS.md](<flows/Profile/Settings/Logging out/ANALYSIS.md>) | [screens/](<flows/Profile/Settings/Logging out/screens/>) |
| Logging in | 7 | [ANALYSIS.md](<flows/Logging in/ANALYSIS.md>) | [screens/](<flows/Logging in/screens/>) |

## 개발 시 참고할 자료

- [공식 도움말·API 대조](SOURCES.md): 26개 공식 출처와 적용 범위. R2에서 차단·신고·응답 관리 3개 추가.
- [재검토 결과](REVIEW_R2.md): 63개 흐름·200개 고유 화면의 검토 범위, 보완 내용과 남은 질문.
- 각 Flow의 `ANALYSIS.md`: 목적·단계 순서·화면 ID·원본 URL·관찰 내용·공식 자료 대조·설계 후보·미확인 범위.
- 각 Flow의 `screens/`: 문서의 단계 번호와 화면 ID에 대응하는 이미지. 위 탐색 표에서 바로 열 수 있다.

조사 중간 자료와 문서 자동 생성·검증 도구는 정리했다. 분석 결과와 원본 링크는 완성된 문서에 보존했으며, 이후 수정은 해당 문서에 직접 반영한다. 이전 조사 자료와 도구가 필요하면 Git 이력의 `956effd` 커밋에서 확인할 수 있다.

## 남아 있는 검증

실제 로그인·구매·발행·삭제·신고·공유를 실행하지 않았다. 실패·취소·권한 거부·오프라인·다른 계정·다른 기기 동기화는 각 문서 8절의 확인 항목이다. 현재 도움말과 과거 화면의 차이는 기존 캡처를 수정하지 않고 기록했다.
