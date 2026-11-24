# Medium Parity 묶음 15 — 프로필·게시 경과 시간

<a id="pre-commit-review"></a>

## 사용자 요청에 따른 커밋 전 추가 검토

2026-11-24 KST. 사용자의 검토·수정·커밋 요청으로 묶음15의 전체 diff와 시간 formatter/갱신 수명, 자식 편집 세대, 부모 저장/사진 lease, source·계정 경계, 요구사항/결과/추적 문서를 다시 대조했다. 추가 코드 결함을 발견하지 못했으며 새 제품 코드·테스트 변경은 하지 않았다. 아래 최초 기록의 미커밋 표현과 이번 로컬 커밋 요청을 구분하도록 현재 상태 문서를 갱신했다.

- 이번 새 검사: Node24.18.0 typecheck/lint 각각 종료0. ProfileDetailsNavigation/profilePublishedTime/ProfileDetails/ProfileScreen/profilePhoto/WrittenStoriesProvider의 양 플랫폼 **12 suites/76 tests 통과,40.771초**, 실패/skip/act 경고0.
- 앞선 최종 전체318 suites/1746 tests 이후 FE 코드 변경 없음,554 codeInputs 해시 불일치0을 확인했다. 이번 추가 검토에서 전체 테스트·브라우저·Hermes/native를 새로 실행했다고 기록하지 않는다. 이전 전체/브라우저 결과와 이번 관련 검사 결과는 별개다.
- 원본 S/T/U/C/flow 필드·assets·과거 증거/readiness/비교 조건의 의도하지 않은 변경0. 기존 입력4개의 삭제 상태와 금지 경로를 보존했다. 기존 사용자 staged 변경은 없었다.
- 이 요청으로 묶음15의30파일을 로컬 커밋 대상으로 확정했다. 전체 diff/staged diff·금지 경로·문서 해시를 확인한 뒤 커밋하며 실제 성공/해시는 Git 기록을 따른다. push·배포·묶음16 구현은 수행하지 않는다.
- 원본 동일 fixture/자산/시각·실제 OS/native 및9~14 잔여는 그대로 유지한다. 추가 자기 검토의 통과는 독립 리뷰·원본 전체 동일성·출시 완료가 아니다.

## 최초 구현·검증 기록

작성일: 2026-11-24 KST. 기준: [실행 계획 묶음15](MEDIUM_PARITY/EXECUTION_PLAN.md#batch-15). 시작 HEAD는 `7a497f9e3e25ff06b69c04dc2e76810c42ca145b`이며 시작 working tree/staged 변경은 없었다. 묶음14 커밋 전 재검토를 포함한2·9·14 결과,5의 관계 카탈로그/계정 경계,13의 프로필 공유/접근권 계약을 현재 코드와 대조했다.

| 판정 축 | 이번 결과 |
| --- | --- |
| 기능 | D12 경과 시간, V32 저장 중 새 자식 편집의 수명 보완. 화면 체류 중 새 발행 목록의 오래된 표시 시각도 수정 |
| 자동 검사 | 현재 코드 타입/lint·최종 전체318 suites/1746 tests 통과, 실패/skip/act 경고0. 상세 이력은 아래 validation |
| 시각 | 대상18개 원본 PNG/ANALYSIS를 직접 확인하고 실제8081에서 부분 대조. 동일 fixture·자산·서체·OS 영역까지의 전체 동일성 완료 아님 |
| native | JS 구문/Hermes 컴파일과 Jest 양 플랫폼을 구분. 실제 iOS/Android 실행·빌드·OS picker/IME/접근성은 환경 대기 |

9~14 잔여는 원래 담당에 유지한다. 선행 전체 종료 승인·잔여 이전·실서비스 완료가 아니다. 이번 커밋/push/배포와 묶음16 진행은 하지 않는다.

<a id="scope"></a>

## 요구사항·원본·화면별 연결

직접 대상 D12/V32: **18 S / 118 R / 23 T / 25 U / 17 C**. 각 행의 `R-Sxxx-*`는 해당 화면의 L/D/S 및 명시된 C/V를 모두 포함한다. 공통 소비 C와 화면별 직접 C51/52/53을 구분한다. U-S는 각 화면에1개씩 연결되고 U-F08/F55/F56/F57/F58/F62/F63은 흐름의 미수록 부분을 계속 보유한다.

원본 경로는 [comparisonBaseline.json](MEDIUM_PARITY/comparisonBaseline.json)의 png/analysis와 연결했다. Profile, Editing profile information, Adding pronouns, Switching to dark mode, Publishing a story의 해당 ANALYSIS/PNG를 확인했다. 원본1179×2556 물리 픽셀은 CSS 단위나 확정 DPR로 취급하지 않는다. S047의 실제 소개는 `Curious mind sharing thoughts one story at a time`이며49자다.

| S / R 수 / T | 구현·현재 검증 | 차이·미확인 |
| --- | --- | --- |
| S005 /5 / F56-01,F57-05 | 사진 선택을 부모 미리보기에 전달. 웹 기존 예시 이미지 선택→Cancel 폐기/Save 재진입 확인 | 원본 인물 사진과 다른 예시 이미지. 원본 업로드 시점 미수록 |
| S020 /7 / F55-02,F57-01,F63-01 | 빈 Stories/Public/Get started, 편집·설정·통계·관계 진입 | 기본 A 이름/0 following은 mock 데이터. 원본 Alex/1 following과 독립 |
| S027 /5 / F56-06 | he/him 자식 Done→부모2/4. 부모 Cancel 뒤0/4 복구 | 자식 Done을 확정 저장으로 해석하지 않음 |
| S047 /6 / F55-06,F57-08 | About의 확정 소개/이름/pronouns,49자 원문을 입력해 실제 화면 대조 | 아바타·following fixture·정확 서체/간격 차이 |
| S074 /5 / F55-04 | Lists→Reading list→프로필 복귀, 발행 글 저장 후1 story 확인 | 원본4 stories/사진 조합과 이번0/1 story는 다른 fixture. 다운로드 전체는8 담당 |
| S080 /5 / F56-03 | he 검색→he/her 후보·선택 | 후보 사전/언어 전체는 자체 mock |
| S082 /5 / F56-02 | 빈 검색/0/4·Done·뒤로 취소 | 자식 뒤로 버튼은 자체 접근성 보완 |
| S094 /6 / F56-05 | he/him 칩2/4·삭제·Done, 최대4개/5번째 제한은 기존 회귀 재실행 | 원본의 초과/오류/검색 없는 경우 미수록 |
| S113 /7 / F57-04 | 웹 file input→실제 이미지 decode/canvas 미리보기. 잘못된 파일 실패→다른 이미지 재시도 | Mobbin 앨범3열/Location Is Included는 OS 화면. 실제 OS 재현 대기 |
| S120 /6 / F56-04 | he 선택1/4·칩 삭제/재검색 | 선택 정렬·다국어 사전은 원본 미확인 |
| S123 /6 / F57-02 | Name*/50, bio/160, 사진·대명사·desktop About 안내, Save/닫기 | 제출 때 검증, 입력 중 초과값 보존은 기존 mock 정책. 실제 모바일 About 편집 추가 없음 |
| S136 /5 / F57-07 | 저장 후 이름/pronouns/사진 표시 및 Stories 유지 | 원본 카드 본문·사진·집계 fixture와 구분 |
| S138 /5 / F57-06 | 부모2/4·49/160, 저장 실패 입력 보존/재시도·재진입 | 원본 실패/중복 저장 정책 미수록 |
| S144 /6 / F62-08 | Settings의 Dark→프로필 복귀,320/393 폭·긴 이름 확인 | OS 테마/원본 서체/정확 회색·사진 동일성 미확인 |
| S156 /6 / F57-03 | Camera/Library/Cancel, 사진 실패/재선택·부모 Cancel | 웹 capture=environment는 실제 촬영/OS 권한 검증이 아님 |
| S167 /4 / F55-05 | 빈 About 안내/Add a short bio·회원 시작 월 | June2025는 원본 표시 fixture이며 계정 가입일/등급에서 계산하지 않음 |
| S169 /16 / F55-03,F58-01 | 실제 publishedAt→23h ago, 카드→본문→복귀/Viewed, 박수·응답·저장·더보기/공유 연결 | 원본29/1·산 이미지와 이번1/1·별도 본문 fixture를 구분. 통계/설정의 후속 전체 범위 제외 |
| S178 /13 / F08-11 | Just now와 반응0 카드, 발행 후 재조회/체류 중 새 글/복귀 검증 | 원본 S169와 같은 연속 조작 결과로 단정하지 않음. 원본과 다른 제목·본문·사진 상태는 별도 |

위 T 표기는 모두 `T-` 접두사가 붙는다. 각 행의 U-S와 연결 U-F는 [UNKNOWN](MEDIUM_PARITY/UNKNOWN.md)에 유지했다. 조건을 정의하거나 코드가 존재한다는 이유로118 R을 모두 시각 통과로 집계하지 않는다.

<a id="contracts"></a>

## 계약과 상태 수명

- **C51/52/53 직접:** ProfileSource/사용자별 store가 확정 프로필을 소유한다. 편집 화면은 부모 fields, 자식 PronounsEditor는 검색어/선택 초안, 사진 요청은 AbortController/lease를 소유한다. 자식 Done은 부모 초안만 바꾸며 부모 Save에서 확정한다. Cancel은 미제출 초안을 폐기한다. 이미 제출한 저장의 성공까지 되돌리는 동작은 아니다.
- **C01/02/03:** 원본 배치·서체/색·줄바꿈과 Light/Dark,48px 목표·포커스·스크롤·작은 폭을 대조했다. Safe Area/OS 글자 확대/VoiceOver/TalkBack/키보드는 웹 검사로 완료하지 않는다.
- **C45/09:** 발행 source의 실제 publishedAt/문서 ID를 소비한다. Stories/Public/Unlisted→본문→복귀, 반응·저장·공유를 연결하며 작성/읽기 전체 기능은9·10·13에 유지한다.
- **C36:** Profile Lists가 기존 목록/다운로드 상태를 소비한다.8의 사본 정책을 변경하거나 재완료 처리하지 않는다.
- **C58/59/60/61:** 기존 발행 글 오디오 범위/미지원 경계를 유지했다.12의 Listen 구현·실제 오디오를 이번에 다시 검증 완료한 것이 아니다.
- **C65/66/67:** 회원 시작 월/프로필 하단 Friend 표식과 계정 멤버십·기사 memberOnly를 혼합하지 않는다. 설정 진입만 소비하며18·19 담당 기능을 확장하지 않는다.
- **C71:** 웹 사진 adapter와 mock/JS를 실제 iOS/Android picker·OS 권한·native 빌드와 구분한다.21/Q07과 공동 종료가 필요하다.

인증 revision은 세션 경계이고 이름은 표시 데이터다. 이름 변경으로 userId/revision/개인 데이터와 공개 navigation을 초기화하지 않는다. source version/userId/auth revision으로 개인 화면을 다시 구성하고, 같은 A 재로그인도 이전 미제출 초안·시트·오류를 가져오지 않는다. 확정 프로필은 useKnownProfile/useIdentityCatalog를 통해 공개 프로필·검색·관계 관리·온보딩 추천에 전달하며 미제출 초안은 전달하지 않는다. 관련 기존 navigation/store 회귀를 전체 검사에 포함했다.

사용자별 저장은 직렬화하며 진행 요청 뒤 최신 제출 의도를 보관한다. 중복 동일 제출은 합치고 오래된 실패는 새 초안의 오류가 되지 않는다. A 저장 중 B로 바꿔도 제출한 A 저장은 A 저장소에만 남는다. 사진은 요청 번호/abort로 늦은 결과를 버리고 미리보기·제출·확정에서 필요한 참조가 모두 없어질 때 release한다. 실제 Storage 업로드·영속 저장은 없다. 전체 새로고침은 인증과 개인 mock 데이터를 초기화한다.

useStoryList의 source/userId/sessionRevision/visibility/source revision/재시도 key와 abort를 확인했다. 공개 범위가 다른 응답·다른 소유자·중복 ID·잘못된 문서는 거부하고, 이탈 중 중단한 구독은 복귀 때 최신 revision을 재조회한다. 삭제/공개 범위/접근권 변경은 source의 최신 결과와 revision 계약으로 검증한다. 현재 기본 mock source에는 발행 후 삭제/공개 범위 편집 UI가 없으므로 이번에 새로 만들지 않았다. 이 부분은 controlled source 회귀와 실제 사용자 UI 실행을 구분한다.

<a id="time-policy"></a>

## D12 게시 경과 시간 계약

원본 직접 관찰은 S178 `Just now`, S169 `23h ago`다. 아래 나머지 경계는 **프로필 카드 전용 자체 mock 계약**이며 Medium 정책 확정이 아니다.

| 조건 | 표시 |
| --- | --- |
| 0≤경과<60초 | Just now |
| 1분≤경과<1시간 | 내림한 정수 m ago |
| 1시간≤경과<24시간 | 내림한 정수 h ago |
| 24시간 이상 | 기존 현지 날짜 toLocaleDateString 유지 |
| 미래/파싱 불가 publishedAt 또는 유효하지 않은 now | —; 존재하지 않는 경과 시간을 생성하지 않음 |

ID/명령 시각에서 게시 시각을 추정하지 않는다. 잘못된 publishedAt은 정상 source 조회 검증에서도 거부되며 formatter의 —는 방어 계약이다. 화면 활성/계정·source 변경/목록 loading→ready 전환 때 다음 animation frame에서 now를 갱신하고, 체류 중60초마다 갱신한다. 표시 경계에는 최대60초의 polling 지연이 있다. effect 재시작·비활성·unmount에서 frame/interval을 정리한다. 통계 UTC, 초안 Edited, 목록 상대 시간을 이 formatter로 통합하지 않았다. OS background 복귀/타이머 throttling은 실제 기기 대기다.

<a id="defects"></a>

## 발견한 결함과 수정

| 재현·원인 | 수정 | 검증 |
| --- | --- | --- |
| publishedAt이23시간 전이어도 기존 조건이1분 외에는 날짜만 출력 | profilePublishedTime에서 실제 시각 차이로 분/시간 표시 | 23h/Just now/경계 단위 회귀 + 실제 navigation 시간 진행/복귀 +8081 |
| Save 직후 Pronouns/사진을 열면 이전 저장 성공이 부모를 닫아 새 자식 선택을 버림. 자식 진입 때 draftVersion이 증가하지 않음 | openChild가 편집 세대 증가. 이미 제출한 저장은 확정하되 새 자식 화면은 유지 | 수정 전 양 자식 사례 실패→수정 후 통과. 웹에서도 지연 Save→he 선택→늦은 성공→Done/부모Cancel 확인 |
| 화면 체류 중 새 발행을 받으면 이전 interval의 now가 새 publishedAt보다 작아 —,23시간 조건이22h로 잠시 표시 | 목록 조회 상태/source 경계에도 표시 시각 갱신 | 브라우저 발견 후 실제 navigation RED1건→GREEN. 고정 시계로 새 발행 후 Just now/23h 동시 확인 |

이름50/소개160은 NFC 코드포인트 기준 검증이다. 이름 공백 합침/trim, 소개 내부 줄바꿈 보존·바깥 공백 정리를 유지한다. 하드 maxLength로 조합 입력을 자르지 않으며 초과값은 보존하고 Save에서 오류를 표시한다. 빈 이름/54자 이름/50자 한글, 소개 줄바꿈·실패 후 재시도를 확인했다. 실제 OS 한글 IME 완료 주장은 하지 않는다.

<a id="review"></a>

## 두 차례 자기 검토

1차: 원본18 PNG·118 R/23 T와 관련 C/U, 기존 profile source/store·photo lease·자식/부모 초안·실제 navigation을 대조했다. D12와 저장 후 자식 편집 종료 결함을 RED로 확인해 수정했다. 관련8 suites/62 tests를 통과했다.

2차: 호출부·계정/source 교체·공개 카탈로그·목록/발행 카드의 재조회·접근권·타이머 정리와 diff를 재검토했다. 브라우저에서 새 발행 직후 stale now를 추가 발견해 RED1건을 추가하고 수정했다. 이후 관련4 suites/32 tests, 타입/lint와 최종 전체 검사를 새로 수행했다. 새로운 기능을 추가하거나 timeout/기대값을 완화하지 않았다. **두 차례 모두 자기 검토이며 독립 리뷰를 수행했다고 표현하지 않는다.**

변경 코드의 한글 이유 주석/기존 명명·기능 경계를 유지했다. 추가 전역 상태·의존성·외부 연동은 없다. 기존 개인 데이터·통계·목록·작성 정책은 그대로 소비한다.

<a id="validation"></a>

## 실제 검사 결과와 이력

Node24.18.0(`fnm exec --using=24.18.0`), 기존 Jest iOS/Android 설정. 기본 Node22 결과를 대신 사용하지 않았다. 출력은 stdout/메모리만 사용했다.

| 실행 | 결과 |
| --- | --- |
| 최초 새 회귀 RED, iOS ProfileDetailsNavigation 선택3건 | 3실패/기존4건 필터 제외,3.192초.23h 표시와 저장 성공 후 자식2종 닫힘 재현 |
| 1차 수정 후 관련 ProfileDetailsNavigation/profilePublishedTime/ProfileDetails/ProfileScreen | 8 suites/62 tests 통과,39.216초 |
| 중간 전체 iOS | 159 suites/872 tests 통과,227.159초. 이후 stale now 추가 수정 전 결과이며 최종값 대신 사용하지 않음 |
| stale now RED, 선택1건 | 1실패/기존7건 필터 제외,2.501초. 새 글에서 Just now 없음 |
| 추가 수정 후 ProfileDetailsNavigation/profilePublishedTime | 4 suites/32 tests 통과,8.645초 |
| 최종 npm run typecheck / npm run lint | 각각 종료0 |
| 최종 전체 iOS | 159 suites/873 tests 통과,251.646초; 실패/skip/act 경고0 |
| 최종 전체 Android | 159 suites/873 tests 통과,227.807초; 실패/skip/act 경고0 |
| web/iOS/Android production Metro JS | 각각2,044,121 /2,364,955 /2,365,649 bytes, 메모리에서 구문 검사 통과 |
| iOS/Android Hermes | hermesc -dump-bytecode -O0 - stdin 컴파일 각각 종료0. 출력34,012,507 /34,025,532 bytes; RN 전역 선언 경고 각35, 컴파일 오류0 |

전체 명령은 플랫폼별 `node --expose-gc node_modules/jest/bin/jest.js --runInBand --logHeapUsage --selectProjects iOS` 및 Android를 실행하고 JSON 결과를 메모리에서 집계했다. 기존 방식처럼 명시적 GC/heap 계측을 사용하며 테스트 제한 시간은 변경하지 않았다. 선택 RED의 필터 제외는 제품 테스트에 skip을 추가한 것이 아니다. 이번 act 경고0을 과거 간헐적 경고의 원인 해결로 확대하지 않는다.

Hermes 첫 출력 집계에서 단순 `error:` 문자열 검색이 경고에 포함된 minified 소스의 필드명까지9/11건으로 세었다. 실제 종료는0이었다. 진단 행 기준으로 다시 실행해 각35 warning/0 error를 확인했다. 중간 정규식 escaping 수정도 stdout 집계 코드에만 해당하며 제품/검사 설정 변경이 아니다. JS/Hermes 메모리 컴파일은 expo export 산출물·실제 native 빌드/런타임 성공이 아니다.

기존 ProfileDetails/ProfileScreen/ProfileProvider/profilePhotoPicker/profilePhoto/createProfileStore/profileValidation, WrittenStoriesProvider/WrittenStoryLifecycle, ProfileDetailsNavigation 및 관계/온보딩 navigation 검사도 전체 실행에 포함했다. 새 테스트는 formatter8개와 실제 navigation4개(자식2·시간 진행1·새 발행1)로 플랫폼별12개 증가했다. navigation 자체를 통째로 mock하지 않았다.

<a id="browser"></a>

## 실제8081·시각·입력 확인

Document Control 연결0을 확인하고 설치된 Chrome headless/CDP로 기존8081을 직접 조작했다. 기존 서버 PID22023을 재시작하거나 종료하지 않았다. 실제 DOM 입력·버튼/마우스·키보드와 CDP 메모리 이미지를 사용했고 비교 캡처 파일을 저장하지 않았다.

- 로그인A→빈 프로필→편집→he/him Done→부모Cancel→재진입0/4, 이후 Save→About/재진입 확인.
- 공백 이름·54/50 오류→50자 한글·소개 줄바꿈,1회 저장 실패 주입→입력 보존→Retry 성공. source 함수는 해당 실패 호출에서 바로 정상 함수로 복원했다.
- Library 예시 sunset 이미지→blob 미리보기→Cancel 폐기, 다시 선택→Save/재진입 유지. 파일 형식 오류를 강제 주입한 뒤 실제 decode/canvas 경로로 재선택했다. Camera의 capture=environment·선택 취소는 웹 adapter 수준이다.
- Save 응답을 메모리에서 지연→새 Pronouns/he 선택→이전 성공 후 자식 유지→Done/부모Cancel. 이미 보낸 이름만 확정되고 대명사는 저장되지 않았다. 이름 저장 전후 auth revision1 유지.
- Stories/Public↔Unlisted 빈 목록, 조회 실패→Retry/필터 유지, 카드→본문→뒤로/Viewed, 박수1·응답1→프로필 집계 반영, Save to→Reading list1 story→프로필 복귀, 더보기/공유 열기·닫기, Lists/통계/Following·Settings 진입/복귀.
- Settings 로그아웃→B→A 복귀에서 A의 확정 이름/글/저장 유지·새 편집 초안 초기화를 확인했다. 늦은 A 성공/실패·source 교체/권한 철회는 별도 기존 자동 회귀와 구분한다.
- 320/393 폭 Light/Dark,320에서50자 한글 이름 줄바꿈/가로 overflow0, 편집 버튼/선택 칩의48px 목표, 기본 닫기 뒤 편집 버튼 포커스 복귀와 Escape 닫기를 확인했다. CSS 약130% 글자 확대에서320px 가로 넘침0. 스크롤 후 입력/Save/Cancel 접근 가능. OS 큰 글자/소프트 키보드 가림/IME·실기기 스크린리더 검증은 아니다.

CP-WEB-01의390×844/DSF1/UTC/en-US와 기준 Date=2025-06-13T12:00:00Z를 별도 적용해 About49자와 카드 시간 구조를 메모리에서 대조했다. D12의23h/직후·체류 중 새 발행은 기준 시계를 각각 이동해 만든 독립 fixture다. 별도의 일반 동작/작은 폭 검사는 실제 날짜와320/393 조건이며 CP 결과와 혼용하지 않는다. CDP 연결 종료 시 emulation이 해제된 초기 기본504폭 관찰은390/393 비교로 집계하지 않았다.

원본과 남는 차이: 인물 아바타·산 사진·본문 길이·반응29/1·Reading list4개/Following1개를 모두 맞춘 전 화면 동일 fixture는 아니다. 대체 serif/sans의 굵기·행간·정확 좌표와 OS inset도 차이가 있다. 자체 Continue setup은 프로필 탭 위에, Drafts는 Public 아래에 공간을 추가하고 mock 안내는 아래쪽 스크롤 영역을 차지한다. Viewed 및 자식 뒤로/검증 메시지도 자체 UI다. 이를 잘라내거나 원본 요소로 기록하지 않았다.

자동 조작 중 로그인 gate/Retry label/메뉴 배경 좌표를 잘못 선택한 사례가 있어 실제 표시된 컨트롤로 재진행했다. DOM click으로 file chooser를 열 때 user activation warning3건이 발생했고 이후 CDP mouse 입력으로 다시 선택해 경고0을 확인했다. 이는 OS picker 성공이 아니며 제품 console 오류와 분리한다. 최종 정상 복원/새로고침 결과는 아래 종료 기록을 따른다.

<a id="remaining"></a>

## 남은 항목·담당·종료 조건

| 항목 | 현재 이유/영향 | 담당·종료 조건 |
| --- | --- | --- |
| 원본 시각/동일 fixture | 사진·서체·집계/목록 수·정확 배치 차이; 전체 동일성 승인 불가 | 15 및 Q01/Q02/Q12: 확보 가능한 같은 데이터/자산으로18화면 재대조, 추가 UI의 최종 배치 판정 |
| U-S18/U-F7 | 사진 제거/업로드 시점·권한·대명사 사전/초과·Public 펼친 정책·실패/시간 경계 미수록 | 15/Q03: 추가 원본 확보 또는 자체 정책 승인과 원본 미확인 분리. 기존 U 삭제 없음 |
| 실제 iOS | Xcode.app 없음, xcode-select는 CommandLineTools, simctl 조회 실패 | 15+21/Q07: Xcode/SDK·시뮬레이터 또는 기기에서 사진·권한·키보드·Safe Area·뒤로/취소·background 시계·VoiceOver 확인 |
| 실제 Android | Android SDK/adb 없음, native android 프로젝트 없음 | 15+21/Q07: SDK/JDK/에뮬레이터 또는 기기에서 빌드·picker·권한·IME·TalkBack/뒤로 확인 |
| 웹 한글 입력/큰 글자 | CDP 텍스트 입력·CSS 확대만 수행 | 15+21: 실제 한국어 OS IME 조합·입력 중 저장/취소·Dynamic Type/font scale 확인 |
| 발행 후 삭제/공개 변경 | 기본 mock에 해당 편집 UI 없음. source 계약/controlled 회귀만 검증 | 9의 기존 범위 판정 유지;15는 최신 source/revision 소비. 새 발행 관리 기능 추가 없이 인계 |
| 9~14 잔여 | 기존 작성/읽기/선택/오디오/공유/인증·시각/native 범위 | 각 기존 결과의 소유자/종료 조건 그대로 유지.15 성공으로 승격하거나 이전하지 않음 |

<a id="walkthrough"></a>

## 8081 최종 확인 순서

1. 새로고침→Profile→로그인→모의 A. 실제 계정/사진 정보는 입력하지 않는다.
2. Edit your profile에서 공백 이름 Save 오류→Alex Smith·소개 입력. Add pronouns에서 he/him→Done→부모Cancel→재진입해 미저장을 확인한다.
3. 다시 he/him과 소개를 입력하고 예시 이미지로 Update photo→Choose from library. 부모Cancel/Save를 각각 확인하고 About/재진입에서 확정 값만 확인한다.
4. Stories의 Get started/작성으로 모의 글을 발행한다. 프로필에서 Just now,1분 이상 체류 후 m ago, 상세 진입/뒤로 복귀를 확인한다.23h는 실제23시간 기다리거나 테스트의 고정 시계 사례로 확인하며 ID를 바꿔 재현하지 않는다.
5. 글에서 박수·응답 후 프로필 카드로 돌아온다. Save to→Reading list→Done, Lists→읽기 목록→프로필로 돌아간다. Public/Unlisted·더보기/공유 닫기·View stats/Settings/관계 목록의 복귀도 확인한다.
6. Settings에서 Light/Dark를 바꾸고320/393 폭에서 이름/탭/카드를 확인한다. 로그아웃→B→A로 전환해 A 확정 값 유지/미제출 초안 제거를 확인한다.
7. 전체 새로고침으로 guest/초기 mock 복원을 확인한다. 실패/늦은 응답은 결과에 기록한 자동 회귀 또는 일시적 source 주입으로 재현하며 정상 소스를 변경한 채 남기지 않는다.

<a id="files"></a>

## 변경·수동 추적·종료

FE 변경5개: `ProfileStories.tsx`, `ProfileEditorSheet.tsx`, `ProfileDetailsNavigation.test.tsx`, 신규 `profilePublishedTime.ts`, 신규 `profilePublishedTime.test.ts`. 결과/실행 계획/BACKLOG·해당 R/T/U/C·비교/자산/자체 UI·FE/AGENT 현재 상태 문서를 수동으로 갱신했다.

comparisonBaseline의18 S/23 T/25 U/17 C와 연결7 flows에15 review를 추가하고 batch15·manualUpdate를 갱신했다. 기존14 manualUpdate는 history에 보존했다. 원본 관찰·요구/ID·PNG 해시·과거 증거·readiness·assets는 유지한다. 새 formatter/회귀2개를 codeInputs에 명시적으로 추가해554개 경로와 존재하는 inputs의 LF 정규화 해시를 갱신했다. 없는 자동 입력4개는 복원하지 않았다. 이 수동 갱신은 tools 생성기 실행 결과가 아니며 자동 자료의 삭제/미확인 차이는 그대로다.

마지막 브라우저 새로고침에서 Home/guest·실제 Date·임시 clock 부재·편집 창 부재·console/exception 오류0을 확인했다. 예시 이미지/사진 URL·지연/실패 함수·CSS 글자 확대는 해당 메모리 실행과 함께 초기화됐다. 검사용 Chrome PID28990을 종료하고 해당 임시 프로필 경로만 제거했다.8081 PID22023은 그대로 유지했다. 테스트 출력/JS/Hermes bytecode와 화면 이미지는 파일로 저장하지 않았다.

최종 변경30개 경로(FE 코드/회귀5·결과/추적/현재 상태25), staged0. JSON의 기존 S/T/U/C/flow 필드·assets·프로필 조건·다른 batch 상태 보존 검사는 차이0, 입력/codeInputs 해시 불일치0, 새 결과 링크 누락0, 금지 경로 변경0, git diff --check 통과다. 기존 codeInputs 순서도 유지하고 새2경로만 추가했다. 기존 원본 파일·삭제된 자동 입력4개와 과거 증거를 변경하지 않았다.

권장 커밋 메시지: `fix(fe): harden parity 15 profile editing and published time`

tools 생성기·별도 검증 스크립트 폴더·evidence·캡처 파일·검증 로그·manifest 생성/수정 금지 준수. 기존 tools/과거 삭제 상태와 증거를 복원하지 않는다. 새로 만든 것은 위 FE 코드/회귀와 요청된 결과 문서뿐이다. 커밋/push/배포·묶음16은 수행하지 않는다.
