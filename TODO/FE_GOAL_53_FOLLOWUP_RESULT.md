# Goal 53 후속 보완 결과

2026-11-21 KST. 이 문서는 Goal53 이후의 기존 FE 결함 보완 기록이다. [Goal53 당시 결과](FE_GOAL_53_RESULT.md)의 63개 흐름·273단계·200개 화면 및 262 suites/1430 tests는 역사적 실행 결과로 보존한다. 이번 검사는 아래에 별도로 기록한다.

## 시작 상태와 범위

- 시작 HEAD: `8cea3e88d0b4633901fa4394859ec290fda35537`, 작업 트리 clean.
- macOS, FE `.nvmrc`의 Node `24.18.0`을 `fnm exec --using 24.18.0`으로 사용했다. 기존 `http://localhost:8081`의 node PID `58453`을 재시작하지 않았다.
- AGENT 진입점·제품 범위·공통/UX와 FRONT_AGENT README 및 6개 규칙을 확인했다. 소스·테스트·문서만 변경하며 새 의존성·ENV·Medium 원본 변경은 없다.
- 사용자 승인 범위는 문서 정합성, 기존 기능·실패 복구·원본 UI 보완, 두 차례 자체 검토, 비네이티브 검사와 로컬 커밋 1회다. 실제 native 빌드·설치·기기 실행은 사용자가 나중에 진행한다. Xcode/SDK 설치·외부 서비스·push·배포·Goal54는 수행하지 않는다.

## 잔여 재분류와 처리

Goal53의 화면 판정 200행과 대응표 C01~C72의 72행을 다시 대조했다. `residual-inventory.json`은 기존 판정을 추출한 목록이며 이번 200장 재촬영 증거가 아니다. 198개 부분 대조·2개 비동등을 198개 미구현 기능으로 해석하지 않았다.

| 분류·대상 | 근거·영향 | 이번 조치와 현재 상태 |
| --- | --- | --- |
| 기능 누락: 기본 Reading list 카드 메뉴 | `LibraryListCard`, `ListActions`; Library/프로필 Lists | 상세와 같은 실제 메뉴 사용, Reorder는 해당 목록의 inline 편집으로 진입. 기본 이름·삭제·공개 전환 제한 유지. |
| 기능 누락: 내 Stories 반응·저장 | `ProfileStories`, `WrittenStoryScreen`, `publishedArticle`, 각 Clap/Response/Bookmark 공급부 | 발행 문서의 같은 ID로 박수·응답·저장·더보기·Library 재열기 연결. 통계의 발행 원본은 유지. |
| UX 결함: modal Reorder·자동 스크롤 없음 | S078/S157, F51; `ReorderListEditor`, `useReorderDrag` | 원래 목록 안에서 편집·Cancel/Done·실제 드래그·가장자리 자동 스크롤·접근성 위/아래 이동. 실제 native 조작은 미검증. |
| 실패 복구: 작가 웹사이트 | `SafeWebsiteLink`, `useExternalLink`; C21/S083 | 새 시도와 성공에서 오류 제거, 요청 세대/화면 수명으로 늦은 실패 차단. HTTPS·사용자정보 없는 URL 제한 유지. |
| 실패 복구: Medium Rules | `ResponsesPanel`, `ResponsePolicyLink`; C14/S008 | 공유 링크 처리 재사용, 정책 하위 화면을 닫으면 오류/요청 수명 종료. 발췌·공식 링크 방식 유지. |
| 조작 영역: guest clap | `ClapControl`; C03/C10 | 최소 너비 48 추가, 높이 48 유지. 320/393px 실제 웹 측정과 로그인 진입 확인. |
| 문서 상태·링크 오류 | 계획·대응표·현재 상태·과거 결과 19개 | Goal15~21·Goal31/46 최신 표기·C62·Goal53 중간 문구 수정. 깨진 링크 154곳 재확인: 없는 evidence 152, 삭제 코드 2. |
| 원본 시각 차이 | S026/S078/S169/S178 등 | 해당 원본 PNG와 현재 화면을 재대조해 inline 행/버튼·Stories 썸네일/본문·반응 위치를 수정했다. 공통 서체·벡터·native 상태바·일부 자료 차이는 전체 동일 재현으로 판정하지 않는다. |
| 편집 선택 UX | `RichDocumentBody`, `RichBody(.web)`; C40/C41 | 이미지 앞뒤가 별도 입력 구간이므로 이미지 경계를 넘는 단일 연속 선택은 미지원이다. 원본 캡처는 이미지 삽입/삭제를 보여주며 경계를 넘는 selection 계약은 미수록이다. 이를 지원했다고 표시하지 않고 별도 편집 모델 결정 대상으로 남긴다. |
| native 하이라이트 UX | `NativePassagePicker`; C19/C20 | 별도 Select a passage 화면을 사용하는 구현 차이다. 원본 본문 위 선택 핸들과 동일하지 않으며 단순 기기 검증 대기로 축소하지 않는다. 커스텀 native 본문 선택은 이번에 새로 구현하지 않았다. |
| 정책 전문 | `ResponsesPanel`; S008 | 발췌와 공식 링크 구현. 전문/원본 기사 화면과의 표현 차이는 유지하며 새 전문 복제는 요청 범위 밖이다. |
| OS 연결 구현/미검증 | Goal52 공유 사진 어댑터, 알림·공유·아이콘 어댑터 | Camera/Library OS 호출은 구현되어 있다. 실제 촬영/앨범/권한·공유·아이콘·IME·스크린리더 검증은 사용자 후속 작업이다. |
| 의도적 서비스 제외 | 인증·발행·통계·알림·멤버십·오디오·다운로드 | mock/메모리 계약 유지. 실제 OAuth/DB/Storage/AI/분석/결제/Push/Email/TTS/AirPlay/background playback/영속 offline은 미구현·범위 제외다. |

## 상태와 식별 계약

- `PublishedStory.id`/`userId`/문서는 `DraftSource`가 기준이다. 발행 시 갱신하는 읽기 전용 `getPublishedSnapshot()`을 카탈로그에서 투영한다. 초안 자동 저장은 이 snapshot을 갱신하지 않는다.
- fixture 기사 ID는 그대로 유지한다. 발행 글은 `written:${encodeURIComponent(story.id)}`를 공통 article target으로 사용하며, fixture의 예약 namespace 사용을 거부한다. 제목·이름으로 찾거나 독립 발행 원본을 생성하지 않는다.
- 카드/상세의 clap·response·bookmark·목록 관계는 같은 target을 사용한다. Library의 article route가 namespace를 해석해 작성 문서 상세로 연결한다. 통계는 기존 raw PublishedStory ID와 원본 발행 저장소를 유지하고 반응을 Views/Reads로 수집하지 않는다.
- 카탈로그는 같은 source 수명에서 발행이 추가되어도 identity를 유지한다. 새 글 때문에 개인 목록·박수·응답·공개 navigation을 초기화하지 않는다. source 교체 시 검증 callback과 개인 scope는 함께 교체한다.
- 작성자 표시는 userId로 공유 프로필을 읽는다. 이름·사진 변경은 소유권·인증 revision을 변경하지 않는다.
- Public은 기존 공개 검색/프로필 인덱스, Unlisted는 자기 목록과 알려진 링크 접근, 초안은 개인 범위다. 공개 목록의 타인 조회에는 Unlisted 발행 행을 인덱싱하지 않는다. 표시용 내부 카탈로그 자체를 공개 검색 결과로 사용하지 않는다.
- A/B의 박수·응답·저장은 기존 계정별 mock 계약을 따른다. 같은 앱 실행의 A 복귀에는 확정 데이터가 유지되지만 개인 화면·저장 초안·시트는 인증 revision/scope로 교체된다. 전체 새로고침은 메모리 인증/데이터를 초기화한다.
- 순서 초안은 현재 화면 소유이며 저장 전 Cancel/뒤로는 폐기한다. Done은 기존 `reorderList` 명령을 사용한다. 중간 기사 제거는 잘못된 membership 제출로 거부하고 최신 목록을 다시 받아 편집할 수 있다. 이미 제출되어 확정된 저장은 화면을 닫았다는 이유로 취소하지 않는다.
- Reorder의 빠른 이동·저장 실패·동시 삭제·늦은 응답은 기존 command/expectedContent/인증 scope 계약을 유지한다. 드래그는 안정된 목록 컨테이너에서 처리하고, viewport와 content 좌표·가변 행 높이로 위치를 계산한다. RAF는 끝 위치에서 더 이동하지 않고 종료/이탈 시 정리한다.
- 외부 링크는 최신 요청의 성공/실패만 화면에 반영한다. URL 교체와 정책 하위 화면 종료는 이전 오류를 폐기한다. 브라우저 실패 주입은 OS 권한 검증이 아니다.

## 발견 사항과 검토

| 재현·기대/실제 | 원인·수정 | 확인 |
| --- | --- | --- |
| 기본 카드 더보기에서 안내만 표시 | 기본 목록 분기에서 `ReferenceNotice`를 사용함 → 실제 `ListActions`와 Reorder route 연결 | Library와 프로필 Lists 브라우저, 실제 navigation 회귀 |
| 발행 글에서 반응/저장 불가·Library 재열기 불가 | 정적 fixture ID 검증·분리된 작성 상세 → canonical 발행 snapshot 투영, 공통 target 및 route 연결 | 작성부터 재열기까지 navigation/브라우저 |
| source 교체 뒤 새 글 저장이 과거 catalog를 검사 | 기본 BookmarkSource callback이 초기 catalog를 캡처함 → source scope 교체와 callback 교체를 결합 | 새 source의 새 ID를 저장하는 회귀 |
| 작성 글 더보기의 미제출 저장 초안이 계정 경계를 넘을 가능성 | 공개 상세의 로컬 menu 상태에 세션 key 없음 → bookmark scope·auth revision·story ID로 경계 부여 | A→B→A 및 같은 A 재로그인 회귀 |
| 드래그 시작이 press-out에서 사라짐 | 손잡이 press-out이 armed ID를 먼저 지움 → 클릭 종료와 drag 종료를 분리, 새 gesture에서 초기화 | 13행 실제 브라우저 드래그, 최종 0→409px 자동 스크롤(가상화로 content 높이가 861→1068px 갱신됨), 순서 저장/재진입 |
| 링크 실패 뒤 성공해도 오류 표시 유지 | 성공/재시도 reset 및 요청 세대 없음 → 공통 hook으로 최신 결과만 적용 | Jest의 역순 응답/URL 교체, 실제 브라우저 실패→성공 |
| 정책 닫기 후 재진입에 이전 오류 유지 | 오류가 부모 Responses 수명에 존재 → 하위 정책 링크 수명으로 이동 | 정책 close/reentry navigation/브라우저 |
| guest clap의 폭 48 미만 | 높이만 지정됨 → 최소 너비 추가 | 320/393px 측정 모두 48×48 이상 |
| S178만으로 프로필 반응 표시를 일반화할 위험 | 새 발행0 화면과 S169 반응 존재 화면이 다름 → 두 원본 상태를 구분해 적용 | 원본 직접 확인, 후속 카드/상세 수치 회귀 |

1차 자체 검토에서는 파일 경계·카탈로그/검증 callback·auth scope·순서 제출 계약·PNG·실제 브라우저를 확인했다. 위 source 교체, 저장 초안 경계, 드래그 press-out, S169/S178 구분을 수정 대상으로 찾아 보완했다. `useKnownProfile`의 optional ID 타입 오류와 새 테스트의 발행 전 save 누락도 현재 검사에서 찾아 수정했다. 독립 검토자를 사용하지 않았다.

2차 자체 재검토는 수정된 공급부/저장소 diff와 실제 navigation 테스트, 393×759 원본 비교 4쌍, 320/393 브라우저 및 실패 복구 결과를 기준으로 별도로 수행했다. 다음을 추가로 발견해 수정하고 다시 확인했다.

- S169의 반응은 날짜 옆에 있어야 하는데 날짜 `flex:1` 때문에 오른쪽으로 밀렸다. 날짜 뒤에 박수/응답을 두고 그 뒤에 가변 여백을 배치했다. S178의 반응0 상태에는 저장/메뉴만 유지한다.
- React lint가 드래그 반환 객체 전체를 ref 값으로 추론하던 경계를 분리했다. 제스처 측정/RAF는 state 소유 컨트롤러의 event/effect에서만 갱신하고 UI는 구조 분해한 상태/콜백을 받는다. lint 억제는 추가하지 않았다. 렌더의 `Date.now()`도 상태와 정리되는 활성 화면 타이머로 옮겼다.
- 실제 키보드 Escape로 목록 메뉴를 닫으면 메뉴 버튼 대신 제목으로 포커스가 이동했다. `ActionMenu`의 실제 버튼 ref로 닫기 포커스를 복구하고, inline 순서 편집의 Cancel/완료는 상세의 뒤로 버튼으로 복귀시켰다. 브라우저 Enter/Escape·위/아래 조작으로 재검증했다.
- C50의 과거 mock 권한과 C51의 모호한 “구현/실행 대기”를 현재 공유 알림/사진 어댑터 코드와 대조해 구현됨/실기기 미검증으로 구분했다. 인계 문서의 도메인 통합 잔여는 FE 연결 완료와 후속 서버의 영속 ID/권한 설계로 분리했다.

두 검토 모두 자체 검토다. 코드/캡처 검토를 독립 검토자 검증이나 자동 검사 통과로 대체하지 않았다. 실제 native 선택 UX·미수록 원본·외부 서비스 제외는 아래 잔여이며 전체 동일 재현 완료로 변경하지 않는다.

## 실제 검사 결과

모든 명령은 FE 디렉터리에서 Node24.18.0으로 실행했다. 이전 Goal53의 262/1430을 이번 결과로 재사용하지 않았다.

| 검사 | 실행과 실제 결과 | 외부 증거 |
| --- | --- | --- |
| TypeScript | `fnm exec --using 24.18.0 npm run typecheck` 통과, exit0 | `typecheck-final.log` |
| lint | `fnm exec --using 24.18.0 npm run lint` 통과, warnings0, exit0 | `lint-final.log` |
| 전체 Jest | `fnm exec --using 24.18.0 npm test -- --json --outputFile <외부>/full-tests-final.json` **270 suites / 1442 tests 통과**, 실패0·skip0·snapshot0,478.152초 | `full-tests-final.log/.json` |
| 최종 영향 회귀 | 포커스/Stories 정렬 보정 후 실제 navigation 9개 파일을 `npm test -- --runTestsByPath ... --json --outputFile <외부>/review2-final.json`로 재실행: **18 suites / 72 tests 통과**, 실패0,42.662초 | `review2-final.log/.json` |
| JS/Hermes export | `fnm exec --using 24.18.0 npx expo export --platform all --output-dir <외부>/export-verified` 통과. web JS·iOS/Android `.hbc` 생성, exit0 | `export-verified.log`, `export-verified/metadata.json` |
| 실제 8081 | 발행/반응/저장/재열기·기본 메뉴·inline/drag·실패 복구·계정 격리·키보드·320/393 터치 확인. 최종 선택한 7개 브라우저 결과의 pageerror/console error0 | `browser-final-summary.json` 및 각 원본 `.json/.cjs` |
| 로컬 문서 링크 |64개 Markdown의 로컬 링크2547개 중 누락0. 앵커/외부 URL 내용 검증과 구분 | `link-audit-final.json` |
| 실제 native | 이번 사용자 제외 범위로 빌드·설치·기기 실행 미실행 | Jest iOS/Android 설정 및 `.hbc`를 기기 결과로 세지 않음 |

전체 Jest는 iOS135/Android135 suite 합계다. 첫 전체 실행은 새 source 교체 테스트의 Unlisted 선택 누락 때문에 268 suites/1440 tests 통과·2 suites/2 tests 실패였고, 고친 뒤 위 전체 실행을 통과했다. 최종 시각/포커스 보정은 추가 영향 회귀와 최신 타입/lint/export/브라우저로 재확인했다. 전체 로그의 기존 VirtualizedList 비동기 `act(...)` 경고3건은 숨기지 않았으며 브라우저 console error0과 별개다. lint를 끄거나 경고를 필터링하지 않았다.

- 기존 `PublishingNavigation`에는 발행→박수→응답→저장→프로필→Library 재열기·동일 반응·source 교체 후 저장을 추가했다. navigation을 mock하지 않는다.
- `PublishedLibrarySession`은 실제 SessionNavigation과 AuthStore로 A/B 및 같은 계정 재로그인·시트 초안 폐기를 확인한다.
- `ListEditingNavigation`은 기본 카드 메뉴 제한/inline 진입과 기존 실패·재시도·메모·공개 범위·계정 경계를 확인한다. 기존 `listEditing`의 늦은 저장·삭제·expectedContent 회귀를 함께 실행한다.
- `publishedArticle`은 발행만 catalog 갱신·기존 목록 보존·Unlisted·계정별/다중 목록·원본 문서 보존을, `reorderGeometry`는 가변 높이·끝 위치·프레임 경과에 따른 edge 이동을 검증한다.
- `SafeWebsiteLink`/`ResponsesNavigation`은 실패→성공·오래된 실패·URL 교체·정책 close/reentry를 검증한다.
- 중간 실패를 숨기지 않는다: 첫 새 계정 테스트 fixture는 초안을 저장하지 않고 publish해 `draft-version-conflict`였고 save→publish로 수정했다. source 교체 테스트는 개인 화면 초기화 후 Public 필터를 Unlisted로 다시 선택해야 하는 계약을 반영한다. 브라우저 스크립트의 숨은 탭 동일 label/로그아웃 intro 경로는 실제 navigation에 맞게 조정했다. 이런 검증 코드 수정은 앱 기능 결함과 구분한다.

## 원본과 실제 캡처

원본 PNG를 직접 열고 실제 navigation으로 촬영한 현재 화면과 비교했다. 비교 HTML/PNG는 `compare-S078`, `compare-S169`, `compare-S178`, `compare-S026`이다. 원본 1179×2556을 논리 폭393으로 표시하고 상단59/하단34의 OS 영역을 제외한 **393×759 앱 영역**으로 대조했다. 원본 native 상태바나 OS 화면의 웹 재현을 주장하지 않는다.

| ID | 원본 경로 (`medium/flows/` 기준) | 실제 캡처·남은 차이 |
| --- | --- | --- |
| S078 | `Library/List detail/Reordering items/screens/03_sc_6a1036b35729490195c460e5b934bd68.png` | `reference-S078-current.png`. 실제 Alex Smith/동일 목록명/4개 fixture 제목을 입력해 대조. inline 행 padding·구분선·handle·38px 시각 pill/48px 조작 영역 보정. 생성 상대 시각·서체/굵기·미세 y좌표·빈 영역 선은 차이. |
| S169 | `Profile/screens/03_sc_d76d3680605f4b62ab31e3039d6c4fe6.png` | `reference-S169-current.png`. 실제 새 발행 뒤 박수1/응답1·저장을 확인. 날짜 옆 반응/우측 저장·더보기 보정. 계정/제목/본문/사진/반응 수는 기능 fixture로 원본 데이터와 다르고, Continue setup·Drafts는 자체 진입이다. |
| S178 | `Home/Publishing a story/screens/11_sc_e3b2276c9abd4bc7b08e6e4c322dee9e.png` | `reference-profile-published.png`. 발행 직후 Just now·반응0·저장/메뉴 상태 대조. 데이터와 자체 진입 차이를 숨기지 않는다. |
| S026 | `Home/screens/02_sc_1ef4e2f769774d2c958fcb38b96dc94f.png` | `reference-home-S026-scroll.png`. 실제 추가 조회한 Jordan/IDE 카드와 접힌 탭을 대조. 현재 fixture가 더 짧아 최대 스크롤646px에서도 Jordan 버튼 상단136px이 목표84px보다 아래에 남는다(`browser-reference-links.json`). 미수록 세 번째 본문/기사를 꾸며 추가하지 않았다. |

S169/S178은 같은 viewport/반응 유무를 맞춘 기능 비교이며 원본과 동일한 계정·글·사진 fixture 비교가 아니다. S026도 스크롤 조건의 잔여가 있어 정확한 픽셀 일치 검증으로 세지 않는다. 비교 4쌍을 다시 열어 본 뒤 S169 정렬을 보정·재촬영했다.

- S078/F51: 별도 modal에서 목록 header·행·핸들·하단 Cancel/Done을 유지하는 inline 편집으로 보정했다. 위/아래 조작은 접근성 보완이며 원본 관찰로 주장하지 않는다.
- S169/F55와 S178/F08: 반응이 있는 기존 글과 새 발행 직후 글을 구분한다. 원본의 실제 숨김 조건은 캡처만으로 확정할 수 없으므로 반응 값이 있을 때 카드에 표시하는 규칙은 우리 mock 표시 정책이다. 날짜/이름/이미지와 Continue setup·Drafts는 별도 데이터/자체 기능 차이다.
- S026/F05: 실제 추가 조회 뒤 같은 Jordan 기사로 위치 맞춤을 시도했고 현재 content 끝 때문에 남는 y차이를 기록했다. 세 번째 부분 기사 미수록 fixture, 원본 집계값과 실제 mock 반응 수, 글꼴/줄바꿈 차이는 남는다.
- S083/F17와 S008/F34: 링크 실패 복구를 확인했다. 웹사이트 추가 줄, 정책 발췌/공식 링크는 현재 보완이며 원본 전문/기사 화면과 동일하지 않다.
- 사진 제거·Public 펼친 옵션·통계의 월/정렬 메뉴·Email/Tailored/Digest 선택지는 보관본 미수록 또는 일부만 관찰한 항목이다. 기존 Goal42~44의 명시적 mock 보완을 유지하며 현재 공식 설명을 과거 캡처의 옵션·기본값 근거로 소급하지 않는다.
- 공유의 확인된 카드/스타일과 추가 팔레트는 구분한다. C62 Friend-link 권한은 이미 Goal48에서 연결됐으며 실제 링크 발급은 없다. 미수록 기사 본문을 추측 생성하지 않는다.
- S043 native splash와 S113 OS Photos는 웹 대응 화면과 비동등이다. 이번에 이 두 화면을 동일 재현이나 기기 검증 완료로 바꾸지 않는다.

작성 글 연결은 이번 요청의 박수·응답·북마크/목록·더보기·Library 재열기 범위다. 기존 fixture 전용 설명 수준·하이라이트·오디오·다운로드까지 동일 도메인으로 확장했다고 주장하지 않는다. 특히 발행 글이 들어간 목록의 기존 mock 다운로드는 해당 발행 본문을 제공하지 않으므로 본문 조회 실패/재시도 경로이며, 영속 오프라인 구현 완료가 아니다.

## 브라우저 결과와 플랫폼 경계

- 실제 8081: 발행→반응/응답→저장→Library 재열기, Reading list 실제 메뉴, inline Cancel/Done, 13행 edge drag, 다른 탭에서 기사 제거 후 순서 저장 거부→최신 목록 복구, 웹사이트/정책 링크 실패→성공, 정책 재진입을 조작했다.
- 계정별 목록 A→B(0건)→A(확정 복원), 전체 새로고침 후 A 재로그인의 메모리 초기화를 확인했다.
- 320/393 모바일 폭, 긴 한국어 제목, Light/Dark, CSS 글자 확대, labels/선택/비활성·뒤로·메뉴/시트 닫기·스크롤을 확인했다. CSS 확대와 웹 마우스/키보드를 Dynamic Type·IME·VoiceOver·TalkBack으로 표시하지 않는다.
- OS Camera/Library·권한·공유·아이콘 연결 코드와 실제 native 실행을 구분한다. 실제 native 검증은 이번 사용자 제외 범위이며 완료로 세지 않는다. 오디오의 실제 TTS/AirPlay와 영속 오프라인은 구현되지 않은 별도 기능이다.
- 실제 서비스 MVP·외부 연동·출시·전체 200장 동일 재현 완료를 주장하지 않는다.

## 증거 보관과 재현

외부 증거 루트: `/var/folders/jg/zn9h2_f91nxfpwz9hzpkqcv80000gn/T/kostolany-goal53-followup-wbpvykui`.

`baseline.json`은 시작 상태/ENV 해시, `broken-links-before.json`은 154개 실제 누락 경로, `residual-inventory.json`은 기존 판정 목록이다. 브라우저 `.cjs/.json/.log`와 PNG, 비교 HTML, 타입/lint/Jest/export 로그는 모두 이 경로에 있다. 저장소에는 임시 스크립트·로그·캡처나 `TODO/evidence`·`TODO/_evidence`를 추가하지 않았다. 임시 경로이므로 시스템 정리나 다른 기기에서 보존을 보장하지 않는다. 스크립트는 외부 Playwright 설치 경로와 Chrome을 사용하므로 다른 환경에서는 경로를 맞춰야 한다.

과거 evidence 152곳은 파일이 없다는 사실과 원래 경로를 문서에 남기고 죽은 링크를 비활성화했다. 빈 파일을 만들지 않았다. `TabPlaceholderScreen.tsx`와 `shared/ui/Screen.tsx`는 Goal14 커밋 `d016c06`의 삭제 이력이며 당시 설명을 현재 파일 링크로 위장하지 않았다.

## 8081 최종 확인 순서

1. 새로고침 → 홈에서 guest 박수 → 로그인 닫기. 카드 이동과 로그인 동작이 중복되지 않는지 확인한다.
2. 프로필에서 mock A 로그인 → 홈 Write → 제목/본문 → Next → Publish now → 내 Stories의 저장/더보기 → 상세에서 박수·응답.
3. 저장 대상에서 Reading list와 새 사용자 목록 선택 → Done → Library → 같은 글 다시 열기. 반응/저장 및 실제 작성 본문을 확인한다.
4. Library와 프로필 Lists의 Reading list 더보기 → Reorder items. 이름/삭제/공개 전환은 제공하지 않는다. 핸들·위/아래 이동→Cancel, 재진입→Done을 확인한다.
5. 여러 글을 저장해 긴 목록의 핸들을 상하 가장자리에 유지한다. 자동 스크롤 뒤 놓고 저장·재진입한다. 다른 탭에서 목록 기사를 제거한 뒤 오래된 순서 저장은 거부되고 최신 목록으로 복구해야 한다.
6. 작성자 About 웹사이트와 Responses→Medium policy 링크를 확인한다. 실패 주입 재현은 외부 `browser-links.cjs`를 사용한다. 첫 실패 뒤 성공하면 오류가 사라지고 정책 재진입에는 오류가 남지 않는다.
7. 설정 Dark → 작은 모바일 폭/긴 한글/순서 편집 확인 → 로그아웃 → intro에서 Sign in으로 B 로그인 → B의 빈 목록 → A 재로그인 후 확정 목록 복원. 새로고침은 메모리 데이터를 초기화한다.

## 마무리

시작 clean 상태와 이번 diff를 대조했다. 기존 ENV·Medium 원본 변경과 저장소 내부 임시 로그/캡처 추가는 없다. 기존8081 PID58453과 HTTP200을 유지했다. `preservation-final.json`에 확인 결과를 남겼다. 문서 갱신 후 최종 diff·staged diff를 검토하고 이번 코드/테스트/문서만 **로컬 커밋1회**로 기록한다. 커밋 메시지는 `fix(fe): complete Goal 53 follow-up flows and documentation`이며 실제 해시는 최종 보고에서 제공한다. push·배포·Goal54·백엔드는 수행하지 않는다.

요청된 A~F 기능/연결·실패 복구와 가능한 원본 보정은 구현했고 자동/8081 검사를 위와 같이 구분했다. 원본 미수록/부분 시각 차이와 편집/하이라이트 선택 UX, 실제 native 검증·의도적 서비스 제외가 남아 전체 클론/실서비스 완료로 판정하지 않는다.
