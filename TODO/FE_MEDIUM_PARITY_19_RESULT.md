# Medium Parity 묶음 19 — 멤버십 UI

2026-11-24 KST. 시작 HEAD `50167d13fd1135f51ac4cd2b7ada8e1e873a169c`, 작업 트리/staged 없음. 선행2·12·14·이번18 결과와 현재 멤버십/소비자 코드를 확인했다. 실행 계획 V31만 대상으로 하며9~18의 원본/시각/구현/native 잔여는 기존 담당에 유지한다. 이번 연속 요청의 조건 충족 후19 로컬 커밋→20 진행이며 push/배포/21·22는 제외한다.

| 판정 | 결과 |
| --- | --- |
| 기능 | 확정 응답 검증·source 수명·성공 팝업 포커스·완료 안내 스크롤 보완 |
| 자동 검사 | 최종 타입/lint·iOS/Android320 suites/1778 tests 통과, 실패/skip/이번 act0 |
| 시각 |5 원본 PNG 직접 확인, 실제8081 메모리 부분 비교. 원본 서체/OS 시트/가격 시점·미수록 상태는 별도 |
| native | 실제 결제/스토어 없음. JS/Hermes와 실제 native/OS 접근성 실행을 구분하며21/Q07 대기 |

<a id="scope"></a>
## 요구사항과 원본

5 S/24 R/6 T/7 U/15 C. Subscribing to Medium 전체 ANALYSIS와 Onboarding의12단계·앞뒤 연결을 확인했다. 모든 원본1179×2556 PNG를 직접 열었다. 원본 ID/요구/과거 evidence/readiness를 유지한다.

| 화면·전체 R | 배정 단계 | 처리·비교 |
| --- | --- | --- |
| S129, R-S129-L/D/S/C01~04 | T-F53-12,T-F54-01 | monthly/annually·선택 표시·Member 카드·닫기. $6.98 SGD/month, Save up to $39는 보관 관찰값. 연간 가격은 미수록 표시 유지 |
| S059, R-S059-L/D/S/C01~02 | T-F54-02 | Member의8개 혜택·Select·스크롤·Friend $19.98 SGD/month. Friend의 미수록 상세 혜택은 기존 자체 계약이며 원본 관찰로 승격하지 않음 |
| S084, R-S084-L/D/S/C01 | T-F54-03 | 반투명 loading·녹색 spinner·중복 Select 방지·닫기. 원본은 독립 pending 상태이며 실제 스토어 요청/승인을 입증하지 않음 |
| S133, R-S133-L/D/S/C01 | T-F54-04 | 중앙 성공 안내·OK. 실제 구매 문구 대신 mock 확정 안내 유지. 성공 중 배경 버튼/주기 조작 차단 |
| S159, R-S159-L/D/S/C01 | T-F54-05 | Thanks·You can now access the best of Medium.·Start reading. 후자는 원본 문구이고 하단 한국어 mock 안내는 자체 UI. 작은 높이/큰 글자는 스크롤로 보완 |

- 직접 C65/66/67: 플랜/주기/확정 기록·계정별 자격·설정 진입/복귀. C50: 기존 온보딩 membership 제안/닫기·완료 연결.
- C09/36/53/58/59/60/61: 기사·프로필·다운로드·오디오의 기존 자격 소비 연결과 전체 회귀. 각 담당 기능 전체를19에서 새로 구현하지 않는다.
- C01/02/03: 대체 서체·테마·48px·포커스/작은 폭/큰 글자/스크롤. C71: 실제 OS/native와 외부 서비스 경계.
-7 U: U-S059 실제 혜택 조건/현재 가격, U-S084 스토어 진입/승인/실패, U-S129 청구/세금/지역/현재 가격, U-S133 영수증/상품ID/자동갱신, U-S159 권한 시점/다른 기기 동기화, U-F53 구독 닫기 및14 온보딩 분기, U-F54 연간/Friend 실제 선택·스토어 취소/실패/복원/갱신/해지. 원본 미확인 상태를 유지한다.

<a id="contracts"></a>
## 확정·실패·계정 수명 계약

원본은 여러 시점의 상태 모음이다. 현재 요청 순서/취소/권한 반영은 기존 메모리 mock 계약이며 Medium의 실제 구매 정책으로 주장하지 않는다. 보관 SGD 월간 가격·$39를 현재 판매가 또는39% 할인으로 바꾸지 않고 연간 가격도 계산해 만들지 않았다.

- source는 계정 userId별 확정 record(tier/period/requestId/confirmedAt)를 보관한다. 화면의 선택 주기/선택 tier/phase는 별도의 세션 초안이다. 인증 revision은 구매로 증가하지 않는다.
- 요청은 화면 활성·인증 수명·controller identity·AbortSignal을 함께 확인한다. 중복 Select는 무시하고 주기 변경·닫기는 미확정 요청을 취소한다. 실패는 선택을 보존해 같은 버튼으로 재시도한다.
- 성공 안내는 응답의 소유자/등급/주기/유효 시각·비어 있지 않은 요청 ID와 실제 source 확정 record의 전체 일치를 확인한 뒤에만 표시한다. 같은 플랜 재요청의 기존 확정 record 재사용은 유지하며 요청 ID를 무조건 새 값으로 강제하지 않는다.
- source는 사용자별 마지막 요청과 완료 명령을 구분한다. 취소/늦은 응답이 새 권한을 만들지 않으며 이미 확정된 권한은 닫기로 되돌리지 않는다. Friend→Member 하향은 기존 mock 미지원 정책이다.
- provider의 source 수명은 교체/해제 시 끝난다. 같은 source A→B→A로 돌아와도 이전 소비자가 보관한 isCurrent/allows는 다시 유효해지지 않는다. 계정 A→B→A/같은 계정 재로그인은 인증 revision으로 별도 격리한다.
- `audio`/`offline`은 Member 또는 Friend, `friend-link`/`custom-icon`은 Friend다. 현재 계정 등급과 기사 `memberOnly`·작성자 badge는 별도다. 구매가 기사 데이터를 바꾸지 않는다.
- 모의 구매 후 원래 목적지로 돌아가 사용자가 개인 행동을 다시 실행한다. 온보딩의 onComplete만 기존 완료 저장을 호출한다. 실제 오디오·Storage·다운로드 영속성·구매 서비스는 추가하지 않았다.
- 새로고침은 source/인증/초안을 초기화한다. 초기A Member fixture와 B Free는 실제 결제/복원 결과가 아니다.

<a id="defects"></a>
## 결함과 두 차례 자기 검토

| 재현·원인 | 수정·검증 |
| --- | --- |
| requestId 없는 응답+빈 저장소에서 undefined끼리 비교하여 success | 비어 있지 않은 ID와 실제 confirmed 존재를 확인. 새 RED 회귀→GREEN |
| 같은 requestId라도 저장소는 Member, 응답은 Friend인데 success | tier/period/confirmedAt까지 확정 기록 대조. 실패 후 선택 유지 회귀 |
| source 교체 후 예전 allows/isCurrent가 기존 자격을 계속 반환 | source별 수명·교체/해제 cleanup. A→B→A 및 unmount의 이전 자격 무효화 회귀 |
| 성공 팝업 Tab→닫기→월간→연간 버튼으로 배경 포커스 이동 | 성공 중 배경 전체 aria-hidden/pointer 차단·웹 inert. 실제Tab3회 OK 유지, 실제 navigation에서 숨긴 배경 접근 불가 확인 |
|320×360 CSS2배에서 Welcome 제목 top=-87.5로 잘림 | 완료 안내 ScrollView/flexGrow. top24·scrollHeight583/clientHeight360, Start reading까지 실제 스크롤/복귀 확인 |

1차 자기 검토는 R/T/U/C·원본5장·세션/source/provider·소비자/온보딩·기존 회귀를 대조하고 위 확정/수명·화면 문제를 재현했다.2차 자기 재검토는 diff·초안/확정/기존 플랜 멱등성·계정/source ABA·기존 소비자와 실패/취소·포커스/스크롤을 확인했다. 독립 리뷰어나 하위 에이전트는 사용하지 않았다.

<a id="verification"></a>
## 현재 검사와 실패 이력

Node24.18.0, Jest iOS/Android 설정별 전체 실행. 결과는 메모리 집계하며 로그 파일을 만들지 않는다.

- 확정 검증 RED: 기존8통과/새2실패,1.977초. provider source 수명 RED:1실패1.882초. 기대한 잘못된 success/오래된 권한이 실제로 재현됐다.
- 관련6 suites/35 tests15.056초 통과/act0. 첫 typecheck 통과, lint4오류: render 중 ref 접근. source별 수명을 useMemo로 옮겼으나 후속 lint1오류/1경고(렌더 closure의 mutable 변수/추론할 수 없는 effect 의존성)가 있었다. 컴포넌트 밖 수명 factory·명시적 effect로 수정했으며 lint 규칙을 끄지 않았다.
- 중간 관련6/35 재실행15.474초 통과/act0. 최종 factory 형태는 아래 전체 실행에 포함한다.
- 최종 typecheck/lint exit0. iOS160 suites/889 tests226.561초 모두 통과/실패·skip·이번 act0.
- 메모리 번들 첫 호출에서 CommonJS 코드를 ESM으로 실행해 require 미정의 오류1회가 있었다. 호출 모드만 바로잡아 web/iOS/Android 구문 통과(2,049,912/2,370,688/2,371,382 bytes), iOS/Android Hermes exit0·각35경고/0오류를 확인했다. 파일 출력 없음.
- 최종 Android160 suites/889 tests228.405초 모두 통과(실패/skip/이번 act0). 합계320 suites/1778 tests.
- 브라우저 보조 조작2회는 기사 상세에서 직접 Library 탭을 찾거나 이미 Settings로 복귀한 화면에서 설정 열기 버튼을 다시 찾아 중단됐다. 실제 화면의 홈 복귀/유지된 설정 경로로 수정해 재실행했다. 앱 오류나 제품 변경으로 처리하지 않는다.
- skip·기대값 약화·timeout 상향 없음.18에서 확인한 호스트 sleep 방지는 연속 작업 중 임시 유지한다. 과거 act 경고가 이번에 재현되지 않았더라도 원인 해결로 주장하지 않는다.

<a id="browser"></a>
## 실제8081와 시각 비교

기존8081 PID22023을 보존하고 별도 Chrome158/CDP의 실제 포인터/Tab·스크롤로 조작했다. 캡처는 메모리로만 보았으며 저장 파일 없음.320/393 CSS폭·DSF1 웹과 원본1179×2556 iOS/OS영역은 동일 기기 조건이 아니다.

- A Member→monthly/annually→닫기/재진입 monthly 복원. Friend 일회성 실패→선택/기존 Member 유지→재시도→success→OK→Welcome→Settings 복귀.
- B Free→Member 확정→OK/Welcome/복귀. 느린 Friend 요청 중 닫기 또는 주기 변경→늦은 응답 뒤 B Member 유지, 이전 success 미노출. 주기 변경은 현재 mock 취소 정책이며 원본 미수록이다. runtime purchase 함수를 복원했다. 최종 기본URL reload 뒤 주입 객체가 없고 console/runtime 오류0을 확인했다.
- 성공/Welcome/processing·기본 플랜/스크롤을 각각 원본에 연결해 메모리 비교했다. 원본 pending의 닫기와 현재 덮개 opacity·spinner 위치, 성공 문구·웹 modal/OS alert, welcome mock 안내 높이 차이가 남는다.
- B Friend와 custom icon 잠금 해제는 실제 UI, OS Apply는 웹 미지원으로 구분한다. A의 느린 Friend 요청→닫기/로그아웃→B Friend→늦은 A 응답→A Member 복귀에서 이전 success/자격이 나타나지 않았고 이전 isCurrent도 false였다.320/393 각각 Light/Dark와 viewport 내48px 미만 대상0·가로 넘침0을 확인했다. A Member의 기사 Listen→mock mini, Friend Link gate→모의Friend→같은 Share 복귀, 저장→Library→Download 완료/목록 상세를 직접 조작했다. 다운로드가 실제 오프라인 보장을 뜻하지 않으며 실제 링크 발급/결제도 없다.
-320/CSS2배의 주기 두 카드 텍스트는 각각118px 내부에서 줄바꿈하고 가로 넘침이 없다.320×360 확대 Welcome은 스크롤로 모든 내용/버튼에 접근한다. CSS 확대·합성 키 입력은 OS 접근성/IME가 아니다.

## 잔여와 종료 조건

| 잔여 | 담당·영향·종료 조건 |
| --- | --- |
| 보관 가격/원본7 U·연간/Friend 실제 구매·혜택 전체 |19/V31. 추가 원본/동일 조건 관찰 전 미확인 유지. 실제 결제/스토어는 이번 제외로 새 구현하지 않음 |
| 원본 서체·시트 inset/OS alert·정확 간격/플랜 상세·mock 안내 높이 |19/Q02/Q12. 같은 비교 조건/확보 자산으로 재대조 필요. 현재 메모리 부분 비교를 전체 동일성 완료로 승격하지 않음 |
| native 모달/스크린리더/큰 글자/뒤로·Safe Area |21/Q07+19. 현재 Xcode CommandLineTools뿐이고simctl/Android SDK·adb/실기기 없음. 실제 기기 빌드/설치/조작 후 판정 |
| 앞 묶음의 구현·시각·원본/native 잔여 |9~18 각 기존 담당 유지.19의 구매 gate 확인이 오디오/다운로드/아이콘 전체 완료를 뜻하지 않음 |

현재 해결 가능한 지적과 자동 검사 실패는 남지 않았으며 원본/native 잔여를 명시한 로컬 커밋·20 진행 조건을 충족한다.

20의 통계는 멤버십 권한을 집계 데이터나 게시 시각으로 사용하지 않는다. 이번 확정 기록·source 수명 보완은 자격 소비자가 유지할 계약이며 통계/analytics 기능 확장이 아니다.

##8081 최종 확인 순서

1. 새로고침→Notifications→모의B 로그인→Profile→Settings→Membership and payment.
2. monthly의 SGD 가격/8혜택·Friend 카드→annually의 미수록 가격→닫기/재진입으로 초안 폐기 확인.
3. Member Select→processing→success의 OK만 Tab 접근→Welcome→Start reading→원래 설정. 이미 확정된 플랜은 Current plan이다.
4. Friend 업그레이드→완료→Custom app icon 잠금 해제/선택 취소. 웹 실제 런처 적용은 미지원이다.
5. B 로그아웃→A 로그인/Member→B 재로그인/Friend. 자격과 계정명이 섞이지 않는지 확인한다.
6. 기사 Listen/Share Friend link·Library Download list의 기존 자격 안내와 원래 목적지 복귀를 확인한다. 성공 후 개인 행동은 다시 누른다.
7.320/393 Light/Dark·CSS 큰 글자·스크롤/닫기·짧은 높이 Welcome 확인 후 기본 URL reload로 정상 mock 초기화.

## 변경과 수동 추적

FE 멤버십 session/provider/sheet와 회귀3파일, 결과·실행 계획/BACKLOG·관련 R/T/U/C/비교·현재 상태를 변경한다. comparisonBaseline의19 review/묶음 상태·존재 입력 해시를 수동 갱신하고18 manualUpdate 원문을 history에 보존한다. runtime555 codeInputs 목록은 변경하지 않는다. 원본 요구·ID·readiness·과거 evidence 및 삭제된4입력은 유지하며 tools 생성기를 실행하지 않는다.

tools/evidence/캡처/검증로그/검증manifest/별도 검증폴더 생성·수정 없음. 새 제품 자산·의존성·실제 외부 서비스도 추가하지 않았다. 로컬 커밋 뒤20만 진행한다.
