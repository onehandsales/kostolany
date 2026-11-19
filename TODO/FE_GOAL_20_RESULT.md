# Goal 20 — 프로필·편집·설정 클론

2026-11-19 · 기준 커밋 `d016c06` 이후 연속 작업. 구현·두 차례 자체 검토·관련 자동/브라우저 검증 완료. 원본 글꼴/아이콘/일부 치수 차이와 실제 네이티브 검증은 남아 있다. 이 단계는 커밋하지 않았다.

## 구현과 기준

- Profile의 아바타·이름·followers 표시, View stats/Edit your profile, Stories/Lists/About, Public 선택 진입과 빈 상태를 재현했다. Stats·글쓰기·팔로우는 실제 기능으로 오인하지 않도록 미연결 안내를 연다. 팔로우 수·가입 월은 원본의 예시이며 실제 회원 정보가 아니라고 표시한다.
- Lists는 기존 기본/사용자 목록 저장소를 조회한다. `ProfileList` 실제 navigation으로 목록→기사→원래 목록→프로필에 복귀한다. Article 경로에 Profile origin·소유자 ID·인증 revision을 전달하고, 삭제된 목록이나 이전 사용자로 잘못 복귀하지 않도록 기존 검사를 확장했다.
- 편집은 X/Edit profile/Save, 사진·Update photo, Name*/50, Pronouns/0 of 4, Short bio/160, About Page 안내의 원본 구성을 재현했다. 사진·대명사·About Page 변경은 미연결 안내다. 이름·소개만 기존 검증/저장소를 사용한다.
- Settings의 Account/Configure Medium/Social/About Medium/App Controls와 메뉴를 재현했다. Edit profile은 같은 프로필 편집기를 열고 Sign out은 기존 인증 저장소로 연결한다. Appearance는 원본 선택 모습과 미연결 안내이며 실제 테마를 변경하지 않는다. 기본 설명 수준은 별도의 `Reading tools · local example` 섹션에 표시한다. 버전은 원본 4.263을 복사하지 않고 실제 프로젝트 0.1.0으로 표시한다.
- 새로운 백엔드·인증·업로드·외부 링크를 연결하지 않았다. 기존 사용자 변경과 8081 서버를 보존했다.

## 상태와 규칙 검토

인증 ID가 개인 저장소의 키이며 이름은 표시값이다. 프로필·설정은 사용자별 공급부가 확정 상태를 소유하고, 편집기는 초안/제출 식별자를 소유한다. 이름/기본 수준 변경은 인증 revision·좋아요·북마크·목록·공개 navigation을 초기화하지 않는다. A→B→A와 재로그인에는 메모리 데이터를 보존하고 개인 화면/초안을 세션 키로 정리한다. 전체 Reload/앱 재실행은 초기 fixture로 돌아간다. 화면 닫기와 제출된 저장 요청 취소를 구분하는 기존 정책을 유지했다.

변경 영역의 app→features→shared 방향, named export·props 계약·한글 설명 주석, 기존 요청/오류 소유자, Safe Area·48pt 터치 영역·입력 스크롤·글자 확대, 사용자별 격리를 직접 확인했다. 코드는 여러 줄로 정리했으며 임시 Prettier 실행은 프로젝트 의존성/설정에 추가하지 않았다. 검사 통과만으로 규칙 준수나 실제 OS 검증을 대신하지 않았다.

## 1차 검토 → 수정

| 발견 | 수정 | 근거 |
| --- | --- | --- |
| 소개를 항상 노출하던 이전 화면과 Stories/Lists/About 구조 불일치 | About에 소개를 표시하고 기존 테스트도 실제 About 선택을 수행 | ProfileScreen/ProfileNavigation tests |
| 프로필 Lists에서 목록·기사로 진입하는 경로 없음 | 기존 ReadingListScreen과 실제 Profile stack 연결 | 새 navigation 회귀 테스트·browser.json |
| 편집 모달과 진입 버튼 접근성 이름 중복 | 모달을 `프로필 편집 창`으로 구분 | 닫기/뒤로 테스트 |
| 프로필·라이브러리 탭 선택이 web DOM에 전달되지 않음 | `aria-selected`, Appearance 버튼 `aria-pressed` 명시 | 실제 브라우저 선택 상태 assertion·native matcher |
| 설정 행이 flex-wrap 상태에서 위쪽 정렬, 편집 폼 간격 과다 | 행 alignContent 중앙 정렬·입력 그룹 간격 조정·프로필 빈 상태 크기 조정 | 원본/구현 재캡처 |
| 목록 메뉴 backdrop이 native 모달 접근성 범위 밖, compact 북마크 hint는 즉시 해제라고 안내 | 메뉴 모달 루트 범위에 닫기 포함·저장 대상 선택 hint로 수정 | 관련 LibraryInteractions 재검사 |

## 실행 결과와 2차 재검토

- Node24.10.0에서 typecheck·lint 통과: [typecheck](evidence/goal20/typecheck-final.log), [lint](evidence/goal20/lint-final.log). 고정 `.nvmrc`24.18.0과 실행 patch 차이는 유지 기록한다.
- 프로필/설정/기사 경로 **86 tests,10 suites 통과**,95.24s: [tests-final](evidence/goal20/tests-final.log). 실제 navigation을 사용하며 navigation을 mock으로 바꾸지 않았다.
- 마지막 접근성·메뉴 수정 후 프로필/실제 navigation/라이브러리 상호작용 **48 tests,6 suites 통과**,41.252s: [tests-second-review](evidence/goal20/tests-second-review.log). 이 실행은 위 테스트와 중복되는 재검사이므로 합산하지 않는다.
- [브라우저](evidence/goal20/browser.json): 편집 취소/저장·About·Profile Lists→목록→기사→복귀·Settings에서 같은 프로필 수정·기본 수준 저장·로그아웃 취소·B→A 데이터 격리 통과, console/page errors 0.
- [실패 검증](evidence/goal20/failures.json): 프로필/설정 조회 실패·재시도, 저장 실패·입력/선택 보존·재시도 통과. 장애 설정은 finally에서 모두 normal로 복원했다. 초기 재현 스크립트가 상수 대신 타입 union의 normal을 치환한 문제는 수정했으며, 실제 실패 화면이 나온 재실행 결과만 통과로 기록했다.
- 첫 테스트는 이전 화면 문구 전제와 중복 접근성 이름으로 실패했다. 중간 Android 실행에 938초의 비정상 지연과 5초 timeout이 있었고 원인은 확정하지 않았다. 동일 테스트 재실행은 통과했다. 첫 브라우저의 일시적 로딩 timeout도 재현되지 않았으며 무조건 제품 결함이 없다고 추정하지 않는다. 로그를 삭제하지 않았다.
- 두 번째 코드 검토에서 ID/revision/편집 초안/늦은 응답 계약과 새 경로 소비자를 다시 확인했다. 마지막 UI 캡처와 선택 상태·공통 메뉴의 회귀를 대조했다. 리뷰 판정과 테스트 실행 결과는 별개이며, 독립된 외부 리뷰를 받았다는 의미가 아니다.

## 원본 비교와 남은 차이

[원본/실제 구현 7쌍 비교](evidence/goal20/COMPARISON.html), [비교 생성 스크립트](evidence/goal20/compare.py), [실제 브라우저 재현 스크립트](evidence/goal20/browser.mjs).

Profile 02/05, Editing profile information 02/06, Settings 02/03, Logging out02의 실제 PNG와 해당 ANALYSIS를 확인했다. 1179×2556 원본을 비교용393×852로 정규화하고 OS 상단59/하단34를 제외한393×759 영역과 실제 브라우저를 비교했다. DPR·기기 모델을 확정한 것은 아니다.

원본: 정보 위계·탭·메뉴·50/160 카운터·입력/저장/닫기 배치. 자체 기본안: 입력 공백/NFC/code-point/중복 이름/실패/늦은 응답 정책, mock 계정·가입 정보·4단계 설명 설정. 미연결: 사진·대명사·통계·About Page·팔로우·결제·알림·테마·아이콘 등 안내 메뉴.

남은 차이: 원본 폰트 파일·정확한 아이콘 자산 없음, 시스템 폰트의 글자 폭/굵기와 SVG 윤곽 차이. Settings 헤더48/행 및 섹션 높이 차이, 입력 최소48pt와 웹 포커스 윤곽선, native 시트 뒤 카드/키보드 표현 차이. 개인 목록·이름·소개는 실제 mock 상태에 따라 원본과 달라진다. 하단 설정의 스크롤 위치·자체 Reading tools/모의 UI도 차이다. **100% 일치로 판정하지 않는다.**

320px 긴 한국어·여러 줄 소개·CSS130% 확대에서 가로 넘침과 닫기를 확인했다. 이는 OS 글자 확대·실제 한글 IME·네이티브 키보드 가림/VoiceOver/TalkBack 검증이 아니다. Xcode/Simulator·Android SDK/에뮬레이터가 없어 실제 iOS/Android 실행/빌드는 대기하며, Goal21에서 가능한 JS/Hermes export를 별도 실행한다.

## 8081 확인 순서

프로필 탭→모의 로그인 A→Edit your profile→이름/소개 저장→About→Lists에서 저장 목록/기사/뒤로 복귀→설정 톱니→Edit profile 또는 아래 Reading tools→기본 수준 저장→Sign out 취소/확인→B 로그인→A 재로그인. 실패는 profilePreview/settingsPreview의 상수를 read-error/save-error로 바꿔 전체 Reload한 뒤 재시도하고 반드시 normal로 복원한다.
