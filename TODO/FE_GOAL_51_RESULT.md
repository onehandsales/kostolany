# Goal 51 — 기능 간 상태·실패·계정 격리 통합 검증

2026-11-21 KST · macOS14.2 arm64 · Node24.18.0. 시작 HEAD `22b667481ed84465db74f714cacf55f80bb70a9e`(Goal50), 시작 작업 트리 clean. **공유 상태 결함 수정·두 차례 자체 검토 / 최종 자동 검사 통과 / 시각·실제 native 검증 잔여.** Goal44→53 연속 승인에 따라 단계 검증과 로컬 커밋 후52로 진행한다. 실제 외부 서비스나 전체 클론 완료를 뜻하지 않는다.

## 구현과 통합 흐름

| 실제 흐름 | 결과와 근거 |
| --- | --- |
| 검색→기사→박수→응답→highlight→저장→Library→원문→복귀 | 8081 실제 navigation. 박수18000→18001, Responses7→8, 선택 구절과 같은 원문 ID, Highlighted 복귀 탭 확인. DOM 텍스트 선택은 웹 검증이다. |
| People Follow→홈 Following→추천 관리→알림→Push→Digest 설정 | 관계 저장소의 Thomas 팔로우와 Following 행 일치. Push의 New Medium Digest Off가 Digest 설정의 같은 항목에도 반영된다. |
| 작성→발행→프로필 이름 변경→Stories→통계→본문→복귀 | 기존 Settings가 열려 있어도 발행 완료는 ProfileHome으로 이동하도록 수정. 원래 작성 ID/제목/본문·수정한 프로필 이름을 같은 발행 글과 통계에서 확인했다. |
| A→B→A·같은 A·전체 새로고침 | B에 A의 발행·highlight·Digest 선택 없음. A 재로그인에서 확정 값 유지. 전체 새로고침 후 인증과 메모리 발행 상태 초기화. |
| 프로필 조회/저장 실패→재시도 | 저장 실패의 입력 유지, 재시도 확정. A 조회 중 B→늦은 A 실패→A 및 같은 A 재로그인에서 이전 조회 오류 없음. |
| A 제출 저장→부모 닫기→B→늦은 A 성공/실패→A | 성공은 원래 A 프로필에 확정되고 B는 유지된다. 실패한 이전 초안·오류는 새 A 편집 화면에 나타나지 않는다. |
| 공개 목록→저장→기사 이동 중 private 변경→복귀 | 접근할 수 없는 본문/Responses를 숨기고 Saved lists에서 제거. 외부 검증 스크립트의 mock source 상태 변경이며 실제 타인 계정 서버 동작은 아니다. |

정상5묶음(`integrated.cjs/json`, 최종 로그 `integrated-final.log`)과 실패/계정/권한4묶음(`faults.cjs/json/log`)에서 console/page error0. 브라우저 실패 주입은 React 개발 트리를 통해 기존 source의 메서드만 일시 대체하며 실제 UI로 조작한다. finally에서 source를 복원하고 검증 브라우저를 닫았다. navigation을 mock으로 대체하지 않았다.

## 상태 소유권과 정책 변경

| 영역 | 기준 상태 / 수명과 이번 확인 |
| --- | --- |
| 인증·온보딩 | AuthStore userId/revision·원래 로그인 복귀 계약, 온보딩 계정 선택 이력. 프로필 이름 변경으로 revision을 올리지 않는다. |
| 프로필·사진·기본 수준 | 사용자별 ProfileStore/ReadingSettingsStore, 화면별 초안. 미확정 읽기와 읽기 오류는 인증 범위 이탈 시 무효화한다. 이미 제출한 성공은 A 저장소에 반영하고 옛 실패 메시지는 새 세션에 전달하지 않는다. 사진 참조/임시 자원 계약은42 유지. |
| 앱/읽기 테마·글자 | DisplaySettingsStore에 confirmed와 현재 선택을 분리. 제출 전 조회 대기 선택·실패 선택은 세션 종료 때 정리하고 제출된 저장은 원래 사용자에서 끝낸다. 실패 시 이전 확정 테마 복구. |
| highlight·관계·추천·차단 | 사용자별 확정 값/명령은 유지. ReadScopeBoundary와 각 store의 읽기 세대로 옛 성공/실패/finally를 차단. 정상 확정 캐시는 불필요하게 재조회하지 않는다. 화면 쓰기 오류는 기존 scope/AbortSignal 계약을 따른다. |
| Responses | 사용자·대상 kind/id별 store, 읽기 epoch와 명령 ID 중복 방지. 인증 범위별 재조회, pending 명령은 기존 대상별 순서로 처리. 기존 mock 세계의 계정별 응답 정책은 바꾸지 않는다. |
| 읽기 이력 | 계정별 방문/삭제 의도와 확정 값, 읽기 세대 분리. 읽기 전 방문을 새 조회에 병합하고 오래된 실패가 새 읽기를 해제하지 않는다. 최대500건 유지. |
| 개인 목록·공개 목록·박수 | UserListStore 목록 revision/삭제 방어·scope, PublicListStore 접근 재확인/저장 IDs, ClapStore 사용자/대상/명령 수명 유지. 기본 Reading list와 사용자 목록 합집합을 새 원본으로 복제하지 않는다. |
| 작성·발행·통계 | DraftSession 사용자/revision/문서 ID와 AbortSignal; 발행 operationId 중복 방지; 공개/Unlisted 계약; 통계는 발행 source 기반 mock 집계. 발행 후 중첩 ProfileHome을 명시한다. |
| 알림·권한·멤버십·다운로드·오디오·공유 | 알림 source 계정 확정 값과 세션 store 분리, OS 권한/아이콘은 설치 범위, 수신 선호는 계정 범위. Membership/Download live 권한·Listening 계정/전경/차단 guard·Share abort/임시 capture release의 기존 회귀를 포함했다. 실제 기기 callback 검증은 별도다. |

**명시적 정책 변경:** 기존 프로필·기본 수준의 일부 테스트는 A의 이전 조회 실패를 재로그인 후 표시하고 수동 재시도하도록 기대했다. 이번 요청의 이전 개인 오류 노출 금지에 맞춰 이전 미확정 조회를 폐기하고 필요한 값을 새 세션에서 읽는다. 기존 사용자 ID·확정 값·소유권·제출한 쓰기 성공은 보존한다. source 교체는 새 저장소 범위이며 앱 새로고침은 메모리 초기화다. 화면을 닫는 것과 제출한 저장 취소는 같은 의미가 아니다.

## 1차 검토·수정

독립 검토 없이 자체 검토했다. 외부 `review-1.md`에 실제 검토 경계와 중간 결과를 기록했다.

- 개인 공유 저장소의 인증 읽기 수명 누락을 재현했다. Highlight/Relationship/Recommendation/Moderation/Profile/ReadingSettings/DisplaySettings/ReadingHistory/Responses의 읽기와 오류를 분리했다.
- 이전 요청의 finally가 새 읽기 잠금을 푸는 경합과, 쓰기로 읽기를 무효화한 뒤 잠금이 남는 경합을 함께 수정했다.
- shared 컴포넌트는 feature 의존 없이 공통 읽기 수명 계약만 가진다. 소비 hook에서 effect 전에 scope 불일치 오류를 가린다.
- 관련 실제 navigation 및 제어된 Promise 검사로 오래된 성공·실패, A→B→A·같은 A, 쓰기 확정 보존을 검증했다. 기존 테스트의 정책 변경은 위에 명시했다.

## 2차 재검토·추가 수정

수정된 store/provider/사용처·테스트·실제 브라우저를 다시 검토했다. 첫 검토 기록을 복사하지 않았다.

- 브라우저의 설정→다른 탭→작성/발행에서 Settings 화면이 남는 연결 결함을 추가 발견했다. 발행 완료 목적지를 중첩 `Main/Profile/ProfileHome`으로 지정했다. PublishingNavigation의 선행 조건에 기존 Settings 방문을 추가해 수정 전2suites/4tests 실패, 수정 후 실제 목적지와 Stories/본문 복귀를 확인했다.
- 전체 검사에서 이전 Goal50의 발행 링크 변경(`/article`→`/written`)이 WrittenStoryScreen의 기존 기대값에 빠진 사실을 발견했다. 경로의 의미와 실제 복사 링크 navigation 회귀에 맞춰 기대값을 바로잡았다. 제품 경로를 옛 값으로 되돌리지 않았다.
- 브라우저4실패 묶음에서 입력 보존/재시도·옛 조회 오류 제거·늦은 제출 성공의 원래 계정 확정·private 공개 목록의 접근 해제를 확인했다.
- 원본4쌍과 현재 캡처를 직접 대조했다. 기능 fixture의 변경 수치와 원본의 차이를 동일 재현으로 계산하지 않았다.

## 실제 검사

실행 위치 `FE`, PATH 앞에 `/Users/jaegeunsong/.local/share/fnm/node-versions/v24.18.0/installation/bin`을 지정했다.

| 검사 | 실제 결과 |
| --- | --- |
| `npm run typecheck` / `npm run lint` | 둘 다 통과, `typecheck-complete.log` / `lint-complete.log` |
| `npm test -- --runInBand` | **254suites/1410tests 모두 통과,386.899초**, `tests-complete.log`. 마지막 발행 복귀/공유 기대값 수정 포함 |
| 읽기 수명 관련 회귀 | 16suites/64tests,950.017초 (`read-scope-regression.log`), 공통4store 경합2suites/8tests,0.859초 (`read-stores.log`). 이 긴 시간은 실제 로그 값이다. |
| 중간 전체 검사 | 254suites 중252통과/2실패,1410tests 중1408통과/2실패,544.277초. 두 실패는 이전 `/article/published-one` 기대값으로 위에서 수정했다. 최종 성공으로 대체 기록하지 않았다. |
| 중간 발행/프로필/설정 회귀 | 8suites 중7통과/1실패,54tests 중53통과/1실패,79.726초. 전체 Jest와 동시 실행 중 기존 설정 시나리오5초 timeout; 최종 전체 검사에서 같은 사례를 포함해 모두 통과했다. VirtualizedList act 경고도 중간 로그에 보존했다. |
| 브라우저 | 정상5묶음+실패4묶음, error0. 첫 스크립트는 첫 홈 페이지에 없는 기사·중복 Responses heading·낙관적 반영 시점·스크롤 후 숨겨진 도구 막대로 실패했다. 검색 진입/패널 범위/확정 대기/위로 스크롤로 보정했으며 제품 결함과 구분했다. |
| `expo export --platform all --max-workers 1` | web JS·iOS/Android Hermes 모두 성공, `export.log` / `export/metadata.json`. native build/run은 아니다 |
| iOS/Android native | 현재 환경 재확인 `platform.json`: CLT만 설치되어 xcodebuild/simctl 불가, adb/emulator/Android SDK 없음. native build/install/run·권한·OS 접근성 미검증. |

추가/수정 테스트: `readScopeStores.test.ts`, `PassageReader.test.tsx`, Profile/ReadingSettings/DisplaySettings/ReadingHistory/Responses store/provider 검사, 실제 `ProfileNavigation`·`SettingsNavigation`·`PublishingNavigation`, 발행 공유 경로 기대값. navigation 자체는 실제 컴포넌트를 사용한다. 초기에 루트에서 npm을 호출한 경로 오류(`publish-before.log`)는 FE에서 다시 실행한 로그와 구분한다.

## 원본 대조와 잔여

medium README, Library 및 Profile/Story stats ANALYSIS, 실제 PNG와 현재 캡처를 직접 확인했다. 전체 원본/컨트롤 목록은 대응표를 기준으로 하며 이번 통합 시각 대조는 아래4개 고유 원본이다. **200장 전수 대조는 이번4장으로 대체하지 않는다.** 웹393×759/Light/기본 글자, 원본1179×2556을1/3로 줄이고 iOS 시스템 영역59/34를 제외한 원본/실제/50% overlay다.

| 원본 screen ID | 현재 캡처/차이와 판정 |
| --- | --- |
| `sc_5e0ba0e498ff49579bf838096aec4b5e` | `home-before.png`/`compare-01.png`: 원본 카드·탭 구성 유지. 실제 응답 source의0건과 원본1.3K/529, 글꼴·아이콘·문자 폭 차이 잔여. |
| `sc_c37aefd0916548dda3cb46d61cc25193` | `library-highlighted.png`/`compare-02.png`: 선택 탭·인용·작성자·원문 복귀 확인. 실제 저장한25자 구절1건과 원본 다중 긴 구절의 fixture 조건이 다르다. Remove highlight는 기존 자체 기능이다. 원본 콘텐츠 동일 조건 비교 통과로 세지 않는다. |
| `sc_1bd141b757934a88b4a003855e1794cc` | `account-a-restored.png`/`compare-03.png`: 계정 재로그인 후 이름/관계/발행 행 유지. 원본 빈 Stories와 현재 발행1건·Continue setup/Drafts의 자체 진입점 차이, 폰트·탭 높이 차이 잔여. |
| `sc_c6580d2d071a4f079981013ccc658af4` | `published-stats.png`/`compare-04.png`: Lifetime·Latest·글 행·Views/Reads0/0. 현재11월 mock 신규 발행0과 원본6월11/2의 날짜/월간 fixture 차이이며 원본의 불일치 집계 원인을 추측하지 않는다. |

읽음·수신 설정·관계·새 발행 초기0통계·계정 메모리·실패 재시도는 현재 FE mock 계약이다. 원본 관찰이나 실제 서비스 데이터로 표현하지 않는다. native/글꼴/일부 원본 메뉴 미수록은 다음 단계에서도 별도 판정해야 한다.

## 증거·보존·8081 확인

저장소 밖 증거: `/var/folders/jg/zn9h2_f91nxfpwz9hzpkqcv80000gn/T/kostolany-goal51-vq25xqi4`. 로그·브라우저 스크립트·캡처·pairs.json·compare-01..04.png·리뷰 기록. 시스템 임시 디렉터리이므로 정리/재부팅 뒤 사라질 수 있으며 Git에 포함하지 않는다. 재현은 해당 `.cjs`의 로컬 Playwright 경로를 설치 환경에 맞춰 Node24로 실행한다. 비교기는 Goal43 외부 도구 경로를 사용한다. 기존8081 PID58453·ENV·medium·사용자 변경을 보존하고 저장소 내부 evidence/임시 검증 스크립트를 추가하지 않았다.

1. 새로고침→프로필→mock A 로그인→온보딩 닫기→탐색에서 ChatGPT 검색→기사.
2. 박수·Responses 작성→본문 구절 선택/Highlight→위로 스크롤→북마크 Reading list 적용→Library Highlighted→원문→뒤로.
3. People Thomas 검색/Follow→Following→알림→프로필 Settings Push의 Digest Off→Library Digest settings에서 같은 값 확인.
4. Settings를 열어 둔 상태에서 Home Write→제목/본문→Next→Publish now→내 프로필 Stories로 직접 복귀→이름 수정→View stats→발행 글→뒤로.
5. 로그아웃→B→통계/Highlighted/Digest 확인→A 재로그인→확정 값 유지. 편집 취소→재진입은 미저장 초안을 보이지 않는다.
6. 전체 새로고침→A 로그인→발행/개인 상태의 메모리 초기화를 확인한다. 제어된 실패·늦은 응답은 외부 faults.cjs로 재현한다.

기능 수정·두 차례 자체 검토·자동 검사·브라우저 검증은 완료했고 원본 시각 차이와 실제 native 검증은 남아 있다. 플랫폼 결과는 위 표를 따른다. 실제 서비스 분석/발송/Storage/인증/결제는 연결하지 않았다. 로컬 커밋 권장 메시지: `fix(fe): isolate session reads and complete integrated flows for goal 51`.
