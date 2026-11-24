# Medium Parity 8 — 목록 다운로드

최신 추가 검토는 [묶음7·8 전수 재검토](#additional-review)에 기록한다. 아래 1578건 등은 최초 묶음8 실행 이력이며 추가 수정 이후의 검사와 구분한다. 묶음7 커밋은 그대로 보존하고 양쪽의 추가 수정은 미커밋으로 둔다.

2026-11-24 · 시작 HEAD `41aebaa2e1236667f7eb833fa21c5f56ede0a60f`. 묶음7의 조건 충족 후 39개 파일을 `fix(fe): complete Medium parity batch 7 list workflows`로 로컬 커밋하고 깨끗한 트리에서 시작했다. 묶음7은 타입/lint·전체298 suites/1560 tests·양 플랫폼 Hermes export 및 가능한 웹 검증 통과, 시각 차이/U/native 대기다. 자세한 이전 결과는 [묶음7](FE_MEDIUM_PARITY_07_RESULT.md)에 보존한다.

이번 범위는 D07·V26만이다. 묶음8은 커밋하지 않으며 push·배포·묶음9를 수행하지 않는다. **기능/mock 구현·두 차례 자체 검토·가능한 웹 검증 완료.** 현재 코드의 타입/lint·전체302 suites/1578 tests·web/iOS/Android export가 통과했다. **시각 비교는 부분 보정·차이 잔여, native 검증은 환경 대기**로 각각 판정한다. 해결 가능한 구현/검토 지적은 수정했으며 원본 미확인/자산·기기 잔여를 출시 완료로 표현하지 않는다.

## 요구사항과 처리

| 대상 | 구현·검증 | 한계 |
| --- | --- | --- |
| D07 | 기본 DownloadProvider에 현재 발행 source/images 연결. 일반 ArticleDetail과 발행 문서 사본의 구분, 본문·서식·이미지 참조·version·소유권 검증, 발행 reader의 mock offline 사본 연결 | 메모리 payload/이미지 참조이며 파일 복제·영속 저장·실제 네트워크 차단 보장 아님 |
| R-S165-L/D/S/C01, T-F48-02 | 4 stories 유지, 시작→진행 중 정지 사각형, 부분 진행·취소·재시도. 393 폭에서 원본30초 표시를 독립 clock 조건으로 대조 | 원본은 진행으로 보이는 정적 상태. 바이트·퍼센트·취소 효과는 미기록 |
| R-S089-L/D/S/C01/C02, T-F48-03 | 4 stories 유지, 실제4개 사본 수신 뒤 목록/각 기사 채움 아이콘. 제거와 더보기 유지. 51초 독립 clock 조건 및 목록/Library 동기화 | 완료 아이콘은 제공된 mock 본문 범위의 수신 완료. 원본 전체 본문/오프라인 파일 확보를 뜻하지 않음 |
| C01/02/03/09/36/45/53/58~61/65~67/71 | Light/Dark·48px·회원용 별/읽기 시간/날짜/Viewed·발행 문서·목록/프로필 진입·계정 및 mock 멤버십 경계 대조 | 오디오/발행 편집/설정 전체나 다른 묶음으로 확장하지 않음 |
| U-S089/U-S165/U-F48 | 질문별 판정은 아래 원본 경계에 기록. 원본 미확인 상태 유지 | mock 실패/복구 검증이 원본 관찰을 대신하지 않음 |

묶음4·7 결과/실제 호출부와 묶음7 커밋을 확인했다. 공통·FE 하위6규칙 및 비교 protocol/baseline/asset/own UI는 묶음7에서 읽은 기준을 계속 적용했다. 묶음8의 REQUIREMENTS_04/07, F48 배정2단계, G35 및 C 계약·UNKNOWN·comparisonBaseline 연결을 직접 대조했다. F48 ANALYSIS와 S165/S089 원본 PNG(1179×2556)를 실제 열람했다. S011 시작 상태는 묶음7에서 읽은 연결 화면이며 묶음8에 재배정하지 않는다.

## 결함·원인·수정

| 재현 조건 | 원인 | 수정·확인 |
| --- | --- | --- |
| 일반 기사+발행 글 목록에서 Download list | 다운로드 공급부가 정적 articleFixtures만 조회 | 8081에서 1/2 error 재현. 발행 저장소 조회·문서/이미지 사본 공급을 연결하고 2/2 complete 확인 |
| mock offline에서 발행 글 열기 | WrittenStoryScreen이 다운로드 경로를 거치지 않고 항상 원문 조회 | 유효한 현재 계정 사본만 DocumentReader에 전달. 실제 navigation에서 원문 story 호출0·본문/이미지 표시, 마지막 사본 제거 시 즉시 숨김 |
| 첫 항목 대기 중 아직 받지 않은 발행 글 변경 | 받은 items의 버전만 대조 | 시작 시 전체 기사 version snapshot을 만들고 어느 항목이든 바뀌면 작업 중단. 이전 응답은 새 사본/완료를 덮지 않음 |
| A 로그아웃 중 삭제→같은 문서 복구 | 내용 fingerprint만 비교하면 비활성 A의 옛 사본과 구분 불가 | source의 로그인 독립 구독이 변경/삭제 세대를 기록. 명시적 실패 회귀 후 수정·재실행 통과 |
| 같은 ID의 발행 본문/공개범위 변경·삭제 | 발행 사본에 문서/이미지 수명 계약 없음 | 발행 문서·소유자·공개범위 등 payload fingerprint로 일치 판정. 변경/삭제 시 해당 사본 폐기, 복구 후 명시적 재다운로드 |
| version 표지만 맞는 다른 발행 payload | 공통 응답 검사에서 기사 ID만 확인 | 문서 유효성·전체 발행 fingerprint·모든 이미지 참조를 store에서 추가 검증. 맞지 않으면 error/사본 미수용 |
| Free 계정의 다운로드 멤버십 시트 중 외부 navigation 이탈 | DownloadControl/Feedback의 지역 boolean이 route에 잔류 | active·개인 scope에 시트 수명 연결. 실제 navigation blur/복귀 회귀에서 자동 재개 없음 |
| 진행/완료 아이콘 크기 | 진행 원/완료 원/기사 원이 같은 축소 규격 | 원본 진행 외곽 약24px, 완료 약20px, 기사 약16px에 맞춰 SVG bounds 조정. 실제 클릭 영역은48px 유지 |

## 사본·버전·접근권 정책

- `(userId,listId,articleId)`는 사본 소속, 인증 revision/source generation은 현재 세션, `jobId`는 한 다운로드 작업이다. 같은 목록의 중복 start는 같은 Promise를 공유한다. source 교체는 새 store, 계정 전환은 이전 요청 취소·오류 정리 후 사용자별 확정 사본만 재사용한다. 실제 AuthStore revision도 검사하므로 effect cleanup 이전의 늦은 응답도 차단한다.
- 시작 시 목록의 제목·설명·공개범위·메모·순서/기사 구성과 **모든 기사 버전**을 고정한다. 진행 중 목록 또는 어떤 기사 버전이라도 바뀌면 cancelled/outdated. 늦은 성공/실패는 취소·제거·새 job·source/계정 수명 뒤 적용하지 않는다. 묶음7의 표시용 updatedAt 자체는 다운로드 콘텐츠 비교 조건으로 쓰지 않는다.
- 일반 fixture는 기존 정책대로 버전 변경 후 과거 사본을 이용할 수 있고 outdated 안내 뒤 다시 받는다. **발행 사본은 문서·이미지 참조·공개범위/소유권의 일치가 깨지면 폐기한다.** 발행 이미지는 현재 편집 이미지 source가 소유한 참조여서 이전 문서와 수명 종료된 이미지가 섞이지 않도록 한 자체 mock 보완이다. 이 차이는 Medium 원본의 정책이라는 뜻이 아니다.
- 발행 버전은 원본의 문서 version뿐 아니라 제목/본문/서식/이미지/언급·userId·작성자·발행 옵션/시각을 포함한 확정 payload fingerprint와 해당 발행 문서의 변경/삭제 세대다. 앱의 인증과 독립인 source 구독이 A 로그아웃 중 삭제→동일 본문 복구도 관찰하므로 옛 사본과 같은 version으로 되돌아가지 않는다. 목록 ID/명령 시각에서 추정하지 않고, 관련 없는 초안 저장 revision만으로 정상 사본을 무효화하지 않는다. 조회 반환 payload와 현재 카탈로그·요청 시작 버전을 모두 대조한다.
- 발행 source의 확정 카탈로그와 본문 조회가 읽기 권한의 근거다. 본문 null은 같은 source revision에서 사용할 수 없는 글로 처리하고 다른 사본도 철회한다. 조회 중 owner/ID/version 변경이나 누락 이미지는 완료로 수용하지 않는다. 카탈로그 삭제/접근 철회 후 재등록해도 이미 지운 사본은 자동 부활하지 않는다.
- 기존 발행 계약은 Public/Unlisted이며 **Unlisted는 private가 아니다.** ID 링크를 아는 타인은 기존대로 읽을 수 있다. Public→Unlisted는 기존 사본을 무효화하지만 링크/소속이 유효하면 다시 받을 수 있다. 별도 private 발행 기능은 새로 만들지 않았다. 비공개에 준하는 접근 철회는 제어 source의 카탈로그 제거/null로 검증했다.
- 내 목록 private 전환은 소유자의 원문 접근을 철회하지 않는다. 목록 snapshot은 outdated가 되고 재다운로드할 수 있다. 타인의 Saved lists 전체 다운로드는 기존 지원 범위 밖이다. 목록 삭제는 해당 job/사본 전부, 기사 제거는 해당 관계 사본만 철회한다. 다른 목록의 유효 사본은 유지, Undo는 관계/메모/순서만 복원하고 사본은 복원하지 않는다.
- 취소/부분 실패는 이미 받은 유효 항목을 유지한다. 같은 snapshot·같은 version이면 재시도에서 성공 항목을 재사용한다. Remove download는 사본만 제거하며 원본·목록 소속·북마크·박수는 유지한다. 가장 최근 수신한 유효 사본으로 읽는다.
- mock Member/Friend의 offline 혜택과 콘텐츠 접근을 따로 검사한다. Free/혜택 철회 시 새 다운로드·사본 읽기는 막고 제거는 허용한다. Mute/Follow/이메일은 다운로드 소속을 지우지 않으며 Block은 기존 reader의 작성자 접근 제한을 계속 적용한다. 회원용 별표는 `memberOnly===true`이고 다운로드/멤버십/Viewed와 별도다.
- `setOnline(false)`는 검증용 mock 상태다. 일반 reader/발행 reader 모두 사본이 없거나 철회되면 본문을 숨기고 연결 후 재시도를 안내한다. 발행 사본은 cloneDocument/clonePublishOptions와 이미지 source의 현재 resolve 결과를 보관한다. 파일 bytes 복제·OS 네트워크 감지·용량/만료·비행기 모드·앱 재시작 후 offline 보장은 없다. 전체 Reload는 인증·개인 사본을 초기화한다.

## 두 차례 검토와 회귀

1차는 D07 재현, source/store/Provider/reader/Library 호출부와 source 구독, 목록/기사/사용자/작업 ID 경계를 확인했다. 일반·발행 union, 원문 조회/이미지 공급, 현재 버전과 접근권 비교를 연결했다. 새 unit 회귀는 혼합 부분 실패/재시도·독립 문서 사본·변경/Unlisted/삭제·진행 중 미수신 문서 변경·잘못된 owner/누락 이미지·A/B/A 늦은 실패를 검증한다.

2차는 전체 diff, 기본 fallback 실제 연결, 주입 source와 오래된 결과, 기존 일반 기사 다운로드/Undo/삭제/멤버십 경계, 발행 reader의 기존 표시 설정/읽기 이력·Block 경로까지 다시 검토했다. 비활성 A 동안 삭제→동일 문서 복구에서 사본 부활 가능성을 추가 재현해 문서별 세대를 보완했다. 버전만 맞춘 다른 발행 payload 수용을 차단했고 다운로드 멤버십 시트의 blur/scope 수명을 보완했다. 실제 SessionNavigation 테스트에 기본 공급부의 혼합 완료, 사본 본문/이미지·원문 조회0, 마지막 소속 삭제, A/B/A와 같은 A 재로그인 및 modal blur를 포함했다. navigation을 통째로 mock하지 않았다.

## 이번 검사 실행 이력

Node `/opt/homebrew/bin/node`24.10.0(engines24 충족, .nvmrc24.18.0과 구분), 검사 출력은 메모리에서만 확인했다. 묶음7 결과를 묶음8 변경 후 검사로 재사용하지 않는다.

| 검사 | 실제 결과 |
| --- | --- |
| 초기 typecheck | union의 일반 기사 test 접근에 nullable 오류1건. `article?.title`로 일반 사본 값 검사를 유지한 뒤 통과 |
| 서버 재시작 시 중단 검사 | 이전 process handle이 없어 완료 여부를 알 수 없었다. 결과를 통과로 계산하지 않고 재실행 |
| 다운로드 unit/provider 재실행 | 양 플랫폼6 suites/30 tests 통과,1.48초 |
| 첫 navigation focused | 4 suites 중3통과/1실패,14 tests 중13통과/1실패. iOS 새 기본 Provider 검사의30초 timeout. Reporter3608.495초. 당시 pmset에서09:41:51 Sleep·10:24:12 Wake 기록 확인 |
| 같은 navigation 독립 재실행 | 기대값/timeout 유지, 새 파일 양 플랫폼2 suites/4 tests 통과,6.47초(단조 시계8.45초),시계 불연속 없음 |
| payload 추가 검토 뒤 focused | 6 suites/26 tests 통과,12.232초 |
| blur 회귀 첫 실행 | 기존 B 목록 상세가 탭 복귀 후 유지되는데 helper가 Library 목록 카드 재진입을 찾던 준비 오류2건. 실제 보존된 상세 heading과 시트 부재를 검사하도록 바로잡음 |
| blur 회귀 재실행 | 양 플랫폼2 suites/10 tests 통과,8.38초. timeout/skip/기대 약화 없음 |
| typecheck/lint | exit0. 삭제/복구 세대와 helper 최적화까지 포함한 최종 실행 exit0 |
| 전체 중간 실행 | iOS151 suites/788 tests 통과,255.913초(단조257.02),act0. 두 번째 검토의 비활성 A 삭제/복구 결함을 발견해 Android를 직접 SIGTERM 중단(단조233.09초,진행 중 VirtualizedList act warning1). 중단 검사는 완료/통과로 계산하지 않음 |
| 삭제/복구 회귀 재현 | iOS 새 회귀1실패/기존6통과,0.932초. 옛 version이 동일한 문제를 실제 확인. 세대 보완 후 관련6 suites/28 tests 통과,19.883초 |
| 전체 최종 검사 | 최종 iOS151 suites/789 tests 전부 통과,257.314초(단조258.53); Android151 suites/789 tests 전부 통과,257.157초(단조258.27). 합계302 suites/1578 tests·실패/skip0,양쪽act warning0·exit0,시계 불연속 없음. 각각 fresh process 사용. `caffeinate -i`, Node --expose-gc/Jest --logHeapUsage 적용; 기존 timeout 유지, wall/monotonic 시계 감시. 명령 동안만 유휴 절전 방지하며 영구 전원 설정은 바꾸지 않음 |
| diff/추적/파일 제한 | git diff --check 통과,staged 없음. 변경25파일만 요청 범위,금지 경로 변경 없음. JSON parse·현재 코드 해시·200개 원본 해시/기존 evidence 이력 보존 확인 |
| export/native | 최종 코드의 `expo export --platform all` exit0,27.09초. web JS fc40752d…, iOS hbc a0291c03…, Android hbc b252e0b7… 생성 후 임시 출력 제거. iOS CLT만 존재·simctl exit72/xcodebuild exit1, Android adb/SDK/ANDROID_HOME 없음(JDK23). 실제 native build/run 불가 |

## 8081 브라우저·시각 비교

- 변경 전 일반1개+발행1개에서1/2 error를 실제 재현했다. 최종 기본 source로2/2 완료, mock offline 발행 본문과 노을 이미지 표시를 확인했다. 초기 fixture/제어 source 준비는 런타임에서 수행했고 새 제품 설정 UI를 만들지 않았다.
- 실제 버튼으로 시작/진행/완료·기사 열기/뒤로·Library 복귀·부분 실패 Retry·취소/제거/재시도를 확인했다. 열린 마지막 사본 제거 시 본문/이미지가 숨겨졌다. signal을 무시하는 이전 성공을 늦게 전달해도 제거한 사본이 되살아나지 않았다.
- 실제 로그아웃/모의 계정 선택으로 A→B→A를 실행했다. B에는 A 목록/사본0, A에는 확정2개 사본이 복원됐다. 같은 A 재로그인·source 교체·진행 중 계정 변경/늦은 실패는 actual navigation/unit 회귀에서도 검사했다.
- 발행 snapshot을 제어해 본문 version 변경→열린 사본 숨김→재다운로드한 새 제목, 삭제→사본 철회→원문 재등록 뒤 사본 부활 없음도 확인했다. 원래 `load/story/getPublishedSnapshot` 함수와 online=true를 복원했다. 실제 서비스 원격 권한 실험이 아니다.
- S165/S089의 동일4기사 순서로 About mindfulness를 준비했다. 393×852/DPR1에서30초/51초를 각각 독립 display clock 조건으로 맞추고 진행 정지/목록 및4기사 완료 아이콘을 메모리 이미지로 대조했다. 원본 촬영시각이나 두 캡처 사이 실시간 작업 시간을 추정하지 않는다.
- 320/393 Light/Dark에서 다운로드·회원용 별표·읽기 시간·날짜·북마크·더보기의 겹침 없이 줄바꿈을 확인했다. 보이는 버튼 중48px 미달0, 가로 overflow 없음. 기사별16px 아이콘은 비대화형이다. 원본보다 첫 제목 줄바꿈·카드 높이/서체·프로필/반응 bar·OS 상하 영역이 다르므로 전체 시각 동일성은 완료가 아니다.
- 320 폭 CSS 글자150%에서도 가로 overflow 없이 metadata 줄바꿈을 확인하고 원래 style을 복원했다. 실제 OS 글자 확대 검증은 아니다. 다운로드 버튼 focus→사본 제거 후 같은 버튼 focus 유지, 기사 열기/복귀 후 Viewed, 목록 더보기 메뉴·Escape 닫기를 확인했다.
- 앱 console.error/unhandled/window error0. harness의 selector/초기 렌더 대기·새로 열린 Expo 탭 선택 오류는 앱 결함으로 합산하지 않았다. 이후 원래 검증 tab ID를 고정했다.
- 서버 재시작 후 기존8081 PID39311이 처음에는 살아 있었으나 이후 bundle 요청 시 프로세스가 사라지고 connection refused가 발생했다. 종료 명령을 보내지 않았다. 동일 프로젝트·8081을 Node24로 재시작해 검증을 이어갔다(복구PID67564). 새 로그 파일 없이 기존 미리보기 주소를 유지한다.
- 세대 보완 후 전체 Reload에서 비로그인/개인 메모리 초기화를 확인하고 새 source로 혼합2개 완료·이미지/본문 사본을 다시 열었다. A 로그아웃 상태에서 제어 source 삭제→같은 문서 복구를 발생시켜 version #1→#3, A 재로그인 뒤 옛 발행 사본/완료 표시 없음, 명시적 Retry 뒤 완료를 확인했다. 모든 주입 함수를 원복하고 online=true·앱 오류0을 확인했다.
- 실제 native 실행·Safe Area/키보드·OS IME·Dynamic Type·스크린리더·비행기 모드/콜드 시작은 환경 대기다. 웹 CSS 확대/합성 입력/Jest/Hermes를 이 검증으로 부르지 않는다.

## 원본 미확인·자체 보완·남은 차이

F48은 정적 시작/정지/채움 상태를 관찰한다. 보관된 ANALYSIS의 도움말 요약(목록 사본/재탭 제거, offline 혜택)은 당시 기록으로 사용하며 이번에 최신 웹 문서를 조회했다고 하지 않는다.

- U-S165: 실패·중단·부분 다운로드의 원본 효과 미확인. 현재 cancel/부분 성공 보존/Retry는 자체 mock 계약과 테스트로만 판정한다.
- U-S089: 비행기 모드 실제 열기·캐시 만료 미확인. 실행 중 메모리 사본만 검증했으며 만료 시각을 새로 만들지 않았다.
- U-F48: 중단/부분 실패/재다운로드/사본 삭제는 자체 보완 검증. 저장 공간 부족/OS 파일 캐시/비행기 모드는 미구현·미확인. 원본과 같은 정책이라고 승격하지 않는다.
- 원본 폰트/vector·OS inset·정확 좌표/반응 및 계정 fixture 차이는 유지한다. 발행 본문 도구/공유/AI/외부 Storage나 실제 인증·백엔드·영구 offline을 추가하지 않았다.

## 수동 추적·파일 제한

EXECUTION_PLAN 상단/7커밋/8상태, BACKLOG D07/V26, S089/S165 REQUIREMENTS·FLOWS·G35 CONTRACTS·3개 UNKNOWN·COMPARISON_BASELINE·comparisonBaseline.json 및 FE/공통 현재 상태 문서를 직접 갱신했다. tools의 생성기 입력은 수정하지 않으므로 자동 입력과 수동 TODO의 최신 상태가 다르며 재생성하면 수동 상태가 되돌아갈 수 있다. 기존 evidenceContext/currentEvidence·원본 해시·과거 이력은 보존하고 `recipe-only`를 ready로 승격하지 않는다.

tools/evidence/비교 캡처 파일/검증 로그/검증용 manifest/별도 검증 도구·스크립트 폴더 생성·수정 없음. 필요한 FE 코드·회귀 테스트·결과/추적 문서만 변경한다. inline 명령·브라우저 임시 profile/메모리 screenshot과 임시 export 출력만 사용하며 임시 export 출력과 소유한 Chrome profile은 제거했다. 최종 Reload에서 비로그인/이전 fixture 없음·부팅 오류0을 확인했고 8081 HTTP200/PID67564는 유지했다. preview 장애 기본값·의존성·백엔드는 변경하지 않았다.

## 8081 최종 확인 순서

1. mock A 로그인→Library→일반 기사가 저장된 내 목록에서 Download list, 정지/완료와 카드별 표시 확인. 목록 및 Library 복귀 시 상태 일치 확인.
2. Home의 Write a story로 제목·본문·이미지를 가진 mock 글을 발행하고 같은 목록에 저장. 혼합 목록에서 Download again 또는 다운로드 시작→두 종류의 기사 완료 확인.
3. 진행 중 취소→Retry, 완료 아이콘 재탭으로 사본 제거. 원문·목록 소속·박수는 유지되는지 확인. 원본 목록 변경 뒤 outdated 안내/Download again 확인.
4. A 로그아웃→B 로그인→B의 목록/사본 확인→A 로그인. A 확정 사본만 복원되고 이전 시트·오류가 없는지 확인.
5. 320/393 및 Light/Dark에서 별표/Viewed/읽기 시간/날짜/저장/더보기와 아이콘·스크롤·뒤로 복귀 확인.
6. mock offline·부분 실패·문서 수정/철회·늦은 응답은 기본 UI에 새 설정을 노출하지 않았다. 위 런타임 제어와 회귀 테스트에서 검증하며 실제 비행기 모드 지원으로 해석하지 않는다. 전체 Reload는 메모리 사본 초기화.

## 변경 파일

FE 코드·회귀 테스트:

- `FE/src/app/navigation/DownloadsNavigation.test.tsx`
- `FE/src/features/bookmarks/LibraryListCard.tsx`
- `FE/src/features/bookmarks/ReadingListScreen.tsx`
- `FE/src/features/downloads/DownloadControl.tsx`
- `FE/src/features/downloads/DownloadProvider.tsx`
- `FE/src/features/downloads/createDownloadStore.test.ts`
- `FE/src/features/downloads/createDownloadStore.ts`
- `FE/src/features/downloads/createMockDownloadSource.ts`
- `FE/src/features/downloads/types.ts`
- `FE/src/features/editor/WrittenStoryScreen.tsx`
- `FE/src/app/navigation/PublishedDownloadsNavigation.test.tsx`
- `FE/src/features/downloads/publishedDownload.test.ts`
- `FE/src/features/downloads/publishedDownload.ts`

결과·추적·현재 상태:

- `AGENT/SOFTWARE_AGENT/COMMON/IMPLEMENTATION_STATUS.md`
- `FE/README.md`
- `TODO/FE_MEDIUM_PARITY_BACKLOG.md`
- `TODO/MEDIUM_PARITY/COMPARISON_BASELINE.md`
- `TODO/MEDIUM_PARITY/CONTRACTS.md`
- `TODO/MEDIUM_PARITY/EXECUTION_PLAN.md`
- `TODO/MEDIUM_PARITY/FLOWS.md`
- `TODO/MEDIUM_PARITY/REQUIREMENTS_04.md`
- `TODO/MEDIUM_PARITY/REQUIREMENTS_07.md`
- `TODO/MEDIUM_PARITY/UNKNOWN.md`
- `TODO/MEDIUM_PARITY/comparisonBaseline.json`
- `TODO/FE_MEDIUM_PARITY_08_RESULT.md`

권장 커밋 메시지: `fix(fe): support published stories in mock list downloads`. 이 묶음은 별도 요청 전까지 미커밋으로 둔다.

<a id="additional-review"></a>

## 묶음7·8 전수 재검토 — 2026-11-24

시작 HEAD `41aebaa`, 묶음8의 기존 미커밋25파일·staged 없음에서 시작했다. 기존 변경을 보존하고 묶음7 커밋의 코드/테스트 전체, 묶음8 전체 diff와 신규 파일, source/store/provider/reader 및 Library/Profile 호출부를 다시 자체 검토했다. 해당 D/V·R/T/U/C 배정과 결과 문서의 판정도 대조했다. 이전 1578건을 이번 검사로 대신하지 않는다.

| 발견 사항 | 재현·영향 | 원인·수정·회귀 |
| --- | --- | --- |
| P2 비활성 계정의 제거된 다운로드 사본 복원 | A 다운로드 완료→B 로그인 중 A의 기사 제거와 Undo가 각각 확정→A 복귀에서 옛 사본과 완료 표시가 되살아남 | active store만 카탈로그를 구독하므로 중간 소속 철회를 놓침. Provider가 비활성 사용자 cache도 source 변경 때 reconcile하고 source 교체/unmount 때 구독 해제. 새로운 다운로드 권한은 주지 않음. 실제 SessionNavigation의 A/B/A 회귀로 기존 사본 없음·명시적 재시도 후 완료 확인 |
| P2 발행 글 저장·응답 시트 수명 누락 | 발행 reader 또는 Profile Stories의 북마크/메뉴 Save to·응답 중 화면 이탈 후 초안/창 잔류 | WrittenStoryBookmark/메뉴/카드 반응에 active 전달, 메뉴는 이탈 때 지역 수명 종료. 확정 소속·박수·읽기 이력은 유지. reader와 프로필 두 저장 진입점·실제 navigation의 응답/메뉴 회귀 |
| 묶음7 추가 결함 2건 및 검사 보강 | 내 목록 응답 초안, Profile Lists의 이름 편집, Save to 부재 검사 | [묶음7 추가 검토](FE_MEDIUM_PARITY_07_RESULT.md#additional-review). 기존 커밋 amend 없이 현재 변경에 포함 |

정책 변경이 아니라 기존 철회/Undo·화면 이탈 계약의 연결 누락 수정이다. 인증이 없는 동안의 cache 관찰은 메모리 source 구독일 뿐 로그인·네트워크 요청·오프라인 저장을 추가하지 않는다. 활성 store의 요청 취소와 auth revision 검사는 그대로 유지한다. 소속을 다시 추가해도 폐기한 사본은 자동 복원하지 않고, 다른 유효한 목록의 사본은 유지한다.

1차는 UI·계정 경계의 실패 재현과 수정, 2차는 모든 호출부·구독 정리·동일 계정 재로그인·source 교체 및 기존 성공/실패/경합 테스트를 다시 검토했다. 테스트의 부재 단언도 실제 요소를 찾는지 확인했다. 불필요한 제품 기능·의존성·추상 계층은 추가하지 않았다.

### 추가 검사 이력

Node24.10.0, 기존 timeout 유지, skip/기대값 약화 없음. 출력은 파일로 저장하지 않았다.

| 검사 | 결과 |
| --- | --- |
| 최초 회귀 iOS 3파일 | 2 suites 실패/1통과, 2 tests 실패/14통과,9.34초. 내 목록 응답 초안·비활성 A 사본 복원 재현 |
| 발행 저장 시트 검사 보강 | dialog 부재 단언을 실제 heading으로 바꾼 뒤 1실패/5통과,1.902초. 기존 단언이 놓치던 reader 시트 잔류 재현 |
| 1차 수정 focused | 양 플랫폼12 suites/66 tests 통과,18.737초 |
| Profile Lists 재현 | 해당 이름으로 필터한 진단 실행1실패, 나머지7건은 필터 제외. 전체 통과/skip 완료로 계산하지 않음 |
| Profile Stories 메뉴 재현 | 1실패/7통과,2.063초. 메뉴 Save to의 active 누락 확인 |
| 호출부 보완 후 focused | ListEditingNavigation/WrittenStoryLifecycle 양 플랫폼4 suites/32 tests 통과,14.5초; PublishedDownloadsNavigation 양 플랫폼2 suites/8 tests 통과,8.575초 |
| 최종 typecheck/lint | `npm run typecheck`, `npm run lint` 모두 exit0 |
| 전체 현재 코드 검사 | iOS151 suites/795 tests 통과263.08초(단조264.29); Android151/795 통과257.921초(단조259.12). 합계302 suites/1590 tests, 실패/skip0, 양쪽 act warning0·exit0. 각 플랫폼 fresh process, `caffeinate -i`, Node --expose-gc/Jest --logHeapUsage, 시계 불연속 없음 |
| JS/Hermes export | 최종 로직의 `expo export --platform all` exit0,17.08초. web dff4f8c1…, iOS cf507f2a…hbc, Android ad0a7290…hbc. 임시 출력 제거, 실제 native 실행과 구분. 이후 한글 설명 주석1줄만 정리했으며 실행 로직은 동일 |
| 실제 native | CLT만 설치. simctl exit72·xcodebuild exit1, adb/Android SDK/ANDROID_HOME 없음. 실제 실행/빌드·OS 접근성/IME 검증 대기 |

### 이번 8081 재확인

- 기존 PID67564/8081 유지. 별도 임시 Chrome profile로 로그인·목록 생성·응답/이름 편집·기사/작성자 이동·뒤로 복귀를 조작했다. 미제출 상태에서 경로 이동은 실제 navigation의 제어 진입도 사용했고, mock navigation으로 바꾸지 않았다.
- 일반2개+본문/이미지가 있는 발행1개를 현재 source 명령으로 준비했다. 실제 다운로드 시작→3개 완료, mock offline 발행 본문/노을 표시·복귀를 확인했다. A→B에서 A의 제거/복원 두 확정을 제어 source로 발생시켜 사본 철회, A 복귀의 미다운로드 표시, 명시적 Retry 후 완료를 확인했다.
- 320/393 폭·Light/Dark에서 가로 overflow 없음, 보이는 button/tab의48px 미달0, 회원용 별표2개와 다운로드/읽기 시간/날짜/저장/더보기 배치를 확인했다. S165/S089 원본 PNG를 다시 열고 아이콘 상태를 부분 대조했다. 이번3기사/한국어 목록은 원본4기사/30·51초와 다른 fixture이며 새로운 동일 조건 전수 시각 통과로 계산하지 않는다.
- 캡처는 메모리에서만 보았고 파일로 저장하지 않았다. 앱 console/error/unhandled 오류0. 검증 명령의 잘못된 표시 날짜 selector·영문 뒤로 label·온보딩 닫힘 대기·작성자 target 입력 오류는 명령을 바로잡아 재확인했으며 앱 오류로 합산하지 않았다.
- CSS 확대/OS 글자 크기·IME·native 제스처를 새로 검증했다고 하지 않는다. 앞선 실행의 플랫폼 한계와 원본 차이를 유지한다.
- 발행 reader의 Save to 선택 중 유효한 작성자 화면으로 실제 navigation 이동→뒤로 복귀에서도 시트 폐기·기존 북마크 유지를 확인했다. 마지막 Reload에서 Home/이전 개인 fixture 없음·부팅 오류0을 확인하고 소유한 임시 Chrome profile을 제거했다. online=true·테마 system으로 복원 후 초기화했으며 preview 장애 설정은 수정하지 않았다.

추가 수정 파일은 `DownloadProvider.tsx`, `createDownloadStore.ts`, `WrittenStoryActions.tsx`, `WrittenStoryCardReactions.tsx`, `WrittenStoryScreen.tsx`, `WrittenStoryLifecycle.test.tsx`, `ProfileStories.tsx`, `PublishedDownloadsNavigation.test.tsx`와 묶음7 추가 검토에 적은4개 FE 파일이다. 결과/추적 문서도 수동 갱신한다. 기존 tools 입력과의 차이, 원본/evidence 과거 이력을 보존한다. tools/evidence/캡처/검증 로그/검증용 manifest/별도 검증 스크립트 폴더는 생성·수정하지 않는다.

묶음7 기존 커밋 `41aebaa` 유지, 이번 추가 수정 및 묶음8은 미커밋이다. 권장 메시지: `fix(fe): complete list downloads and close stale list dialogs`. 묶음9·push·배포를 진행하지 않는다.

최종 상태: 변경33파일(FE20·결과/추적13), staged 없음. `git diff --check`, 코드 해시·200개 원본 PNG 해시와 기존 R/T/U/C 연결·evidenceContext 보존 검사 통과. tools/evidence/캡처/검증 로그/manifest 생성 없음, 임시 export·소유 Chrome profile 제거,8081 HTTP200/PID67564 유지. 기능/mock 검증의 해결 가능한 지적은 수정했고 시각 차이·원본 미확인·native 대기는 유지한다. 전체 검사 이후 실행 로직 변경 없이 설명 주석과 결과/추적 문서만 정리했다.
