# Goal34 — Digest·날짜 필터·Library 연결

2026-11-20 KST · Windows · 시작 HEAD `4ddc4b7`(Goal33 사용자 커밋).

상태: **구현 완료·검증 잔여**. 두 차례 자체 검토와 후속 경계 검토를 수행했다. 원본 동일 재현과 실제 native 검증은 잔여다. 이번 승인은 Goal34 로컬 커밋 → Goal35 → Goal36 → Goal35·36 묶음 로컬 커밋까지이며 push·배포·Goal37 이후는 포함하지 않는다.

## 구현과 흐름

| 대상/진입 | 구현·검증 |
| --- | --- |
| 로그인 → Library → Digest | 안내 전용 탭을 실제 발행 묶음/기사 목록으로 교체했다. 비로그인 개인 Library 진입은 기존 인증 정책을 따른다. 로그인 성공만으로 개인 행동을 실행하지 않는다. |
| 날짜 → 임시 선택 → Cancel/Done | 취소는 확정 날짜를 유지한다. Done은 선택 ID를 조회하며 다른 날짜의 본문을 숨긴다. 같은 날짜 Done은 재조회/스크롤 초기화를 하지 않는다. |
| Digest → 기사 → 뒤로 | 실제 root stack의 `Digest` 출처로 진입하고 원래 Library 선택과 스크롤로 돌아온다. 기사 4단계 설명·개인 기본 설정을 변경하지 않았다. |
| Your lists/Saved lists/Highlighted/Reading history | 기존 저장소와 실제 navigation을 유지했다. Digest에서 저장·읽기·강조한 같은 기사를 내 목록/Highlighted/이력에서 다시 열었다. Saved lists는 목록 전체 저장 관계를 그대로 사용한다. |
| 최초/갱신/실패/빈 값 | 카탈로그 조회 실패와 상세 조회 실패를 나누어 같은 의도로 재시도한다. 발행 0건과 발행에 기사 0건을 구분한다. 당겨 새로고침 및 빈 상태의 명시적 새로고침을 제공한다. |
| 원본 갱신 | 선택 발행이 사라지면 남은 최신 발행으로 이동한다. 날짜 시트의 삭제된 초안은 Done을 막고 새 선택을 요청한다. 전체가 사라지면 선택/본문을 비운다. |
| Digest settings | Frequency/Daily, Push/On/chevron, Email/On/외부 화살표를 표시한다. 세부 변경은 지원 전 안내와 복귀까지만 연결했다. Goal44의 알림 설정 전체·실제 외부 이동·발송을 구현하지 않았다. |
| 계정/새로고침 | A→B→A·동일 A 재로그인 시 개인 navigation과 날짜/시트 초안을 초기화한다. source 교체는 새 화면 수명으로 분리한다. 앱 전체 Reload는 인증과 메모리 상태를 초기화한다. |

## 상태 계약

- `DigestIssue.id`는 발행 묶음 ID이고 `date`는 발행자의 날짜 문자열, `publishedAt`은 정렬용 ISO 시각이다. 사용자 ID는 조회 결과의 소유자다. 표시 날짜를 파싱해 정렬하지 않으며 날짜 문자열만을 발행 식별자로 사용하지 않는다.
- 카탈로그는 발행 시각 내림차순 최대 10개다. mock에는 누락 날짜와 10일보다 오래된 발행이 있다. last 10 digests를 최근 10일로 계산하지 않는다. 수신 빈도·Push·Email 상태는 발행 목록의 날짜나 개수와 별개다.
- source는 앱 실행 수명의 메모리 원본이고, store는 Library 계정/인증 revision/source 수명이다. 날짜 선택 초안은 시트 로컬, 확정 선택·조회 결과는 Digest store, 표시 스크롤은 마운트된 FlatList가 소유한다. Digest 탭을 벗어나도 방문한 패널은 숨겨 유지하며 계정 revision 변경 시 제거한다.
- 카탈로그/상세에 별도 요청 세대를 둔다. source 알림·unmount·재연결은 이전 응답 권한을 폐기한다. A→B→A 날짜 연속 선택에서도 마지막 요청만 반영한다. 사용자/발행 ID/날짜가 맞지 않는 결과는 오류로 처리한다. 중복 ID와 잘못된 날짜/시각은 카탈로그 오류다.
- 앱의 기사 catalog에서 ID로 기사를 찾아 저장·박수·응답·읽음 상태를 재사용한다. Digest 화면에 별도 개인 사실 상태를 만들지 않았다. 차단 설정 최초 조회 중에는 기사를 숨기고 차단한 작성자의 기사는 표시하지 않으며 조회 오류는 별도로 복구한다.
- 기본 지연은180ms이고 기본 장애 설정은 normal이다. 빈 날짜·실패·삭제 발행·오래된 응답은 제어된 source로 검증한다. 공유 설정/프로필 변경으로 인증 revision이나 공개 navigation을 재설정하지 않았다.
- 서버 추천·예약 발행·이메일·Push 서비스는 없다. 날짜별 기사 구성은 mock 기본안이다. 보관본 June8의 Goodbye Notion 전체 본문이나 나머지 기사 구성을 임의 원문으로 추가하지 않았다.

## 원본·공식 근거·자체 보완

보관본은 Medium iOS catalog version1419이며 실제 제품 빌드/OS/DPR은 미확인이다. `medium/README.md`, `REVIEW_R2.md`, `SOURCES.md`, F25·37·41·42·43·44·48·59·62의 관련 ANALYSIS와 실제 PNG31개를 외부 비교 시트로 확인했다. 31개는 고유 ID 기준이며 앱 전체200장 재검증으로 표현하지 않는다.

| 분류 | 근거/한계 |
| --- | --- |
| 관찰 | F43 `sc_bafbf7b80b154e25aec15e120a13f72a` 날짜/Today's highlights/표지/저장·반응, `sc_f647f3c6b04d48e9bb1b31f5d0fb2cfe` 라디오10개/Done, `sc_8866044a55164824903265c3b8b97337` 임시 June8 선택, `sc_a42fffc3afb34954bc5e4afcc2e08e04` 날짜/기사 교체. |
| 관찰 | F44 `sc_d17bad2e556e4b0abfdc9541f90c46f2` Daily/Push/Email의 서로 다른 진입 표현. 값 변경 결과는 미수록이다. F41의 Library 가로 탭과 F59 Push 토글, F62 테마를 대조했다. |
| 공식 설명 | 2026-11-20 조회한 [Medium 이메일 설정](https://help.medium.com/hc/en-us/articles/115004745947-Adjust-email-preferences)은 Digest 수신 주기와 알림 종류를 설명한다. 현재 공식 문서이며 보관 캡처의 UI 버전이나 발행 시각·최근10개 정책 전체를 증명하지 않는다. |
| 추가 검색 | Gummble `Digest history empty error date filter frequency settings`, `Digest history` 검색은 관련/기존 화면을 반환했다. 추가 profile 화면(`sc_befb6fde38cc48f3827ea389caed11de`)은 직접 열었으나 Digest 장애 근거로 사용하지 않았다. 빈 날짜/실패 UI를 확보한 것으로 기록하지 않는다. |
| 자체 보완 | 빈 발행/빈 기사, 조회 실패/재시도, 갱신 시 선택 무효화, 계정/수명, 누락 날짜 fixture, UTC 표시, 접근성 label/48px, Digest 카드 신고 메뉴 항목은 기존 앱 계약에 맞춘 기본안이다. 원본 더보기 펼친 화면의 복제라고 주장하지 않는다. |
| 미수록/후속 | 수신 빈도 전체 옵션·Email 목적지·생성/보관 기준·실제 시간대·목록 오류 형태·전체 기사 구성·Library Reading history/Saved lists 원본 본문은 미확인이다. Goal44 설정 전체와 Goal35 다운로드는 이 결과에 포함하지 않는다. |

## 두 차례 자체 검토와 수정

같은 작업자의 자체 검토이며 독립 제3자 검토가 아니다.

| 검토 | 재현·원인 → 수정·회귀 |
| --- | --- |
| 1차 연결/상태 | Digest 탭은 안내만 열었다 → typed source/store와 Library/Article 경로 연결. 조회 ID·세대, 빈 발행, 삭제된 날짜, 실패·재시도 검사를 추가했다. |
| 1차 접근성 | 새 탭의 New 배지가 접근성 이름에 합쳐져 빈 Library에서 Digest 조회가 실패했다 → 명시적 탭 label과 첫 방문 후 badge 해제, 실제 navigation 회귀 검사. |
| 1차 시각/브라우저 | 원본 이미지 비율만 지정하면 일부 web 이미지가 큰 고유 높이를 사용했다 → 가용 폭에 따른 명시적 높이, 모바일 캡처로 확인. |
| 2차 모달/복귀 | 설정 위 안내 모달에서 Escape가 설정까지 닫았다. 두 모달을 번갈아 마운트해도 같은 이벤트가 새 모달에 전달됐다 → 하나의 시트 안에서 설정/안내 페이지를 전환해 닫기와 복귀를 분리, 실제 Escape와 navigation 검사. |
| 2차 상태/표시 | Viewed 스타일이 제목의 크기까지 줄이고 새 Digest 카드가 차단된 기사를 표시할 수 있었다 → 색상만 변경, 기존 moderation 계약 연결과 조회 오류 처리. |
| 2차 원본 실측 | LibrarySheet 기본24px gap 때문에 날짜행이72px 간격이 되어 Done이 y908로 밀렸다 → Digest 내용 gap0, 날짜48px, 하단 여백/Done, 선택 가능한 왼쪽 닫기 위치. 다른 시트의 기본값은 유지한다. |
| 2차 연결 누락 | 탭이 열리는 것만으로 같은 기사의 저장/강조/이력 연결을 입증할 수 없었다 → Digest에서 시작하는 실제 navigation과8081 연결 흐름을 추가했다. |
| 2차 후속 경계 | 시간대가 다른 ISO 시각을 문자열로 정렬하면 최신 발행이 뒤바뀐다. 잘못된 날짜를 JS가 다음 달로 보정한다 → 실제 시각 정렬/달력 날짜 검증과 회귀 검사. |
| 2차 후속 권한 | 차단 설정 조회가 늦으면 아직 확인하지 않은 기사를 먼저 노출할 수 있다 → 최초 설정 확인 전 본문 보류, 실패/복구 후 허용 기사만 표시하는 실제 navigation 회귀 검사. |

## 실행 결과

외부 임시 경로 `T`는 `C:\Users\leehg\AppData\Local\Temp\kostolany-goals34-36-b11d473b813d478ba686fbd6af467413`이다. Node24.18.0/npm10.9.0, 기존8081 PID5248을 사용했다. 임시 산출물의 영구 보관은 보장하지 않는다.

- 최종 코드에서 `FE`의 `npm run check` 성공: `tsc --noEmit`, `eslint . --max-warnings=0`, 전체 **160suites/964tests 통과·실패0·skip0**(Jest580.306초, `goal34-check-verified.log`). 이후 제품 코드/테스트 변경 없이 문서만 확정했다. iOS/Android 두 Jest 프로젝트의 합계이며 실제 native 실행이 아니다. 일부 기존 검사에서 React act 경고가 출력되었고 실제 브라우저 console/page 오류는0이다.
- `createDigestStore.test.ts`: 발행10개/날짜 간격/빈 묶음, 읽기 실패·재시도·잘못된 소유자, 날짜 A→B→A 늦은 성공/실패, 원본 삭제·빈 catalog, 수명 종료/재연결, catalog 실패를 검증한다.
- `DigestNavigation.test.tsx`: 실제 AppNavigator와 React Navigation을 사용한다. 날짜 취소/확정·기사 복귀, Library 탭, 설정 안내 복귀, 실패·원본 무효화, A/B/A·동일 A, source 교체, 저장/강조/이력 연결을 검증한다. native 모듈 대역을 실제 native 실행으로 표현하지 않는다.
- 중간 `goal34-focused.log`:4suites 중2실패/18tests 중4실패. New 배지의 접근성 이름 문제를 수정한 `goal34-focused2.log`는4suites/18tests 통과(19.861초)다. 이 중간 기록을 최종 코드 검사로 대신하지 않는다.
- 중간 전체 `goal34-full.log`:159suites 통과/1실패,958tests 통과/1실패(602.075초). 실행 중 추가했던 연결 검사에서 기사 로딩을 기다리지 않고 북마크를 조회한 문제가 남았다. 최종 선택자/비동기 조회로 수정한 navigation2suites/8tests는18.61초에 통과했다. 혼합 코드 기준인 이 전체 실행은 최종 증거로 쓰지 않는다.
- `goal34-check-final.log` 전체 재검사는 후속 시간대/차단 경계 결함을 발견해 해당 검사 프로세스 트리만 중단했다.8081은 유지했다. 완주/통과로 집계하지 않는다. 이후 `npm run typecheck`, `npm run lint`, `npm test -- --watch=false --runTestsByPath src/features/digest/createDigestStore.test.ts src/app/navigation/DigestNavigation.test.tsx`는4suites/24tests 통과(21.279초, `goal34-boundaries.log`).
- `python -X utf8 T\browser34.py`: 정상/실패/갱신/계정/초기화8묶음 통과, console/page 오류0,320px 가로 overflow 없음. 장애는 런타임 mock source에만 주입했고 context 종료/Reload로 폐기했다.
- `python -X utf8 T\visual34.py`: 실제 저장·하이라이트·이력 연결과 테마/스크롤2묶음 통과, 오류0. DOM Range 선택은 web 합성 선택이며 실제 OS IME 검증이 아니다. 날짜 시트 Escape 뒤 원래 날짜 버튼 포커스 복귀를 확인했다.
- 최종 수정 후 위 두 스크립트를 다시 실행했다. `python -X utf8 T\moderation34.py`도 통과했다: 차단 설정 지연 동안 기사0개, 실패 후 재시도로 허용 기사만 표시, console/page 오류0. 별도 메모리 source에만 장애를 주입하고 브라우저 context 종료로 폐기했다.
- JS/Hermes export와 실제 native 결과는 아래 표로 분리한다. 의존성·ENV·실제 외부 서비스 변경은 없다.

## 실제 캡처와 남은 차이

원본1179×2556을393×852로 축소하고 `(0,59,393,818)`을 잘라393×759 앱 영역으로 비교했다. Edge headless/DPR1/en-US/light/모의 A, 기본 글자 크기, 모달 전환400ms 이후 캡처다. 실제 기기의 Safe Area 측정값이 아니다. `digest34/history34/settings34-pair.png`, `-overlay.png`, `-diff.png`를 만들고 확인했다. 동일률 점수는 계산하지 않았다.

| 원본/실제 | 실측·차이 |
| --- | --- |
| F43 기본 / `digest34.png` | 날짜 x20/y129/w297/h48, 설정 x325/y129/48×48. 원본 날짜 시각 영역은 약38px 높이이며 앱은48px 조작 영역이다. 원본/실제 hero 상단은 앱 영역 약272px로 대응한다. 기존 표지 자산의 crop·서체/줄바꿈·제목 baseline·메뉴 간격·하단 숫자는 다르다. |
| F43 날짜 / `history34.png` | 날짜행 x24/y79.875/w345/h48, Done x24/y687/w345/h48. 원본 Done은 약 y694/h42이다. 날짜 간격은48px로 맞추고 터치 기준에 따른 높이 차이를 남겼다. 원본 연속 날짜와 mock의 누락 날짜는 정책 검증용 차이다. |
| F44 설정 / `settings34.png` | Frequency x24/y79.875/w345/h71. 원본의 전체 폭 구분선·약90px 첫 행과 폰트/아이콘 벡터는 차이가 남는다. Push chevron과 Email 외부 화살표를 구분했다. |
| 반응/구성 | 원본158K 박수·1.3K 응답은 비교 캡처값이다. 현재 기존 기사 저장소의157K/실제 fixture 응답 수와 독립적이다. 숫자를 원본에 맞추려고 개인 상태를 조작하지 않았다. June8 기사 구성을 동일 재현했다고 주장하지 않는다. |
| 스크롤/큰 글자 | 탭/테마 이동 전후 같은 행 조작 bounds y589.28125로 유지했다.320×600과 CSS160% 확대에서 스크롤/Done 접근을 확인했다. 원본 폰트·벡터 미확보, OS 접근성·실제 기기 제스처는 잔여다. |

## 플랫폼과 보존

| 구분 | 결과/잔여 |
| --- | --- |
| 실제8081 web | 정상·실패·계정·읽기/저장/강조·원본3쌍 비교. 서버 재시작/중복 실행 없음. |
| iOS/Android Jest | 전체160suites/964tests 통과. 플랫폼 대역 검사이며 기기 실행이 아니다. |
| web JS / iOS·Android Hermes | 최종 수정 후 `npx expo export --platform all --output-dir T\export34-verified` 성공(`export34-verified.log`). web JS1개·iOS/Android 각각Hermes1개이며 실제 native build/run이 아니다. |
| iOS native | Windows이며 Xcode/xcodebuild/simulator가 없어 실행·빌드 불가. macOS/Xcode/시뮬레이터 또는 기기에서 Safe Area·VoiceOver·키보드/IME·뒤로/재실행 검증이 필요하다. |
| Android native | java/gradle/adb, JAVA_HOME/ANDROID_HOME/ANDROID_SDK_ROOT, 기본 Android SDK 디렉터리와 native 프로젝트가 없다. JDK/SDK/에뮬레이터 또는 기기에서 build/run·TalkBack·IME·프로세스 재실행 검증이 필요하다. |
| 보존 | 진행 중 추가된 Backend/DB/COMMON 규칙 사용자 변경을 포함해 무관한 변경을 보존·커밋 제외한다. medium 원본/ENV/lockfile/과거 결과를 보존한다. 저장소에 evidence·캡처·비교HTML·로그·검증스크립트를 추가하지 않았다. |

## 8081 확인 순서

1. 전체 새로고침 → 프로필 → 모의 로그인 시작 → A 로그인 → Library → Digest.
2. 날짜를 선택하고 취소한다. 다시 선택·Done → 기사 → Digest로 돌아가 선택 날짜가 유지되는지 본다.
3. June7을 선택해 빈 기사를 확인한다. 날짜 시트에서 최근10개 발행이 항상10일이 아님을 확인한다.
4. Digest settings → Frequency/Push/Email 각각의 지원 전 안내 → 닫기/복귀. 날짜와 목록이 바뀌지 않아야 한다.
5. June11의 ChatGPT 기사 → 저장 → Reading list 선택/Done → 문구 선택/Highlight → Digest로 복귀.
6. Your lists의 Reading list·Highlighted·Reading history에서 같은 기사를 열고 돌아온다. Saved lists는 기존 공개 목록 전체 Save로 채우고 기사 저장과 분리됨을 확인한다.
7. 프로필 설정에서 Dark/Light 전환 후 Library 복귀, 작은 폭/스크롤/모달 닫기를 확인한다.
8. 로그아웃→B→A 및 전체 새로고침으로 날짜 초안/시트와 메모리 초기화를 확인한다. 장애·늦은 응답·원본 삭제는 테스트 또는 외부 임시 스크립트의 제어 source로 재현한다.
