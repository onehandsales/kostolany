# Goal39 — 토픽·발행 미리보기·mock Publish

> 후속 변경: 발행 글의 공통 반응/저장·Library 재열기는 [Goal53 후속 결과](FE_GOAL_53_FOLLOWUP_RESULT.md)를 따른다. 아래 구현·검사·캡처는 Goal39 당시 이력으로 보존한다.


> 2026-11-21 후속 기록: 공개 발행 글의 검색·작성자/publication 공개 프로필 연결은 Goal50에서 보완했다. [Goal50 결과](FE_GOAL_50_RESULT.md)를 참조한다. 아래 과거 실행 결과는 변경하지 않는다.
**Goal42 후속 확인(2026-11-20, macOS):** Goal42에서 내 Stories 상세 진입 중 source revision이0으로 바뀌어 목록 행을 잃던 문제를 수정하고, 작성자 표시를 사용자 ID 기준의 현재 프로필 이름/사진에 연결했다. 발행 문서·작성자 ID·발행 시점 스냅샷은 유지한다. 현재 실행 증거는 Goal42 결과를 따르며 이 문서의 과거 검사 결과를 대체하지 않는다. [현재 결과](FE_GOAL_42_RESULT.md).

2026-11-20 KST · Windows · 시작 HEAD `3b419431ed3d822a42a7a5f45bb661fa183e3410` · Goal38 커밋 후 작업 트리 변경 없음.

상태: **구현 완료·검증 잔여**. mock 구현·두 차례 자체 검토·현재 환경에서 실행 가능한 필수 검사를 마쳤다. 원본 동일 시각과 실제 native/OS 검증은 남는다. Goal39 변경만 로컬 커밋한다. 실제 서비스 발행·외부 링크·검색 유형 확장·통계·알림은 포함하지 않는다.

## 구현과 흐름

| 대상 | 구현·검증 |
| --- | --- |
| 작성 메뉴·Next | Submit to publication / Add or edit topics / Edit story preview와 Next를 실제 화면에 연결했다. Editor route 안에서 하나의 DraftSession을 공유해 돌아올 때 문서·커서·서식이 유지된다. |
| 토픽 | 기존 TopicProvider/catalog의 ID를 사용한다. 검색 지연·오류/재시도·빈 결과·최대5·6번째 거절·chip 제거·검색 X를 분리한다. 선택 화면의 로컬 초안은 Save로만 반영하고 뒤로는 취소한다. |
| 미리보기 | 실제 제목·본문 요약·첫 이미지와 작성자를 표시한다. Edit는 편집기로 돌아간다. 자체 보완한 본문 전체 미리보기에서 서식·문단·전체 이미지·멘션을 확인한다. |
| Publication | 기존 directory의 두 publication을 선택/취소한다. 모의 편집 권한으로 즉시 발행하는 보완 정책을 화면에 명시한다. 실제 원고 심사·제출 시스템은 구현하지 않는다. |
| Unlisted | 공개 목록에서 제외한다. 자신의 Unlisted 관리 목록과 알려진 story ID의 상세 접근은 가능하다. 비공개와 다르며 외부 URL은 발급하지 않는다. |
| 발행·내 Stories | 자동 저장을 마친 동일 문서와 설정을 발행하고 초안을 봉인한다. Profile Stories에서 실제 작성 내용 상세로 이동·복귀한다. 기존 기사 fixture/4단계 설명으로 본문을 대체하지 않는다. |
| 실패·복구 | 알려진 실패는 문서·선택을 유지해 수정/재시도한다. 응답 유실 등 결과 불명은 입력/이탈을 잠그고 동일 발행 요청으로 결과를 확인한다. 목록·상세 조회 실패도 재시도한다. |
| 계정·새 실행 | A/B 개인 목록을 분리하고 로그아웃은 발행 글을 삭제하지 않는다. 같은 A 재로그인은 이전 편집 시트·오류를 폐기한다. 앱 새로고침은 인증·초안·발행 글을 모두 초기화한다. |

## 문서·권한·수명 계약

- DraftSource가 앱 수명의 초안·발행 글·발행 영수증을 소유한다. DraftSession은 화면 입력·선택·자동 저장/발행 작업을 소유한다. WrittenStoriesProvider는 같은 source와 이미지 공급부를 전달하며 별도 사실 저장소를 만들지 않는다.
- draft ID와 published story ID를 구분하고 user ID로 할당 소유권을 확인한다. document.version은 제목/본문/서식/이미지/멘션뿐 아니라 발행 설정 변경에도 증가하는 편집 세대다. schema3 출력 형식과 UTF16 위치 계약은 유지한다.
- 토픽 선택은 ID 기준 유일하며5개 이하다. publication은 허용된 로컬 대상만 받는다. 화면 선택 초안 → session 설정 → 자동 저장 확정 → 발행 snapshot을 구분한다.
- `${draftId}:${version}` 저장 작업과 `publish:${draftId}:${version}` 발행 작업은 다르다. 발행 Promise를 공유하고 자동 저장 완료 후 정확히 같은 document/settings로 요청한다. 처리 중 편집은 잠근다.
- source는 명령과 반환 객체를 복사하고 문서/설정/소유자를 검사한다. 저장한 버전과 다른 발행은 충돌이다. 동일 요청·payload 재시도는 동일 영수증을 반환한다. 발행 기록 생성·초안 삭제·봉인은 같은 동기 구간에서 확정해 늦은 저장이 초안을 부활시키지 못한다.
- 성공 응답 유실은 uncertain으로 표시하고 같은 command를 유지한다. 그 사이 프로필 이름이 바뀌어도 이미 제출한 authorName snapshot으로 재시도한다. 이름/기본 설정 변경은 인증 revision이나 공개 navigation을 초기화하지 않는다.
- 인증 revision은 같은 사용자 재로그인도 다른 화면 수명으로 취급한다. 로그아웃/계정 전환/source 교체/unmount는 진행 요청의 lease를 중단한다. commit 전 중단된 발행은 적용하지 않는다. commit 후 응답만 늦은 경우 발행 사실은 남고 과거 화면 상태만 무시한다.
- 제목과 본문 또는 이미지가 있어야 발행하는 것은 자체 mock 기본안이다. 빈 편집기의 Next가 녹색인 원본 관찰을 빈 문서 발행 가능의 근거로 삼지 않았다.
- Unlisted 공개 인덱스 제외와 알려진 ID 읽기를 분리한다. Unlisted 목록 조회는 소유자만 가능하며 다른 계정의 목록은 반환하지 않는다. 공개/Unlisted 글 자체는 로그아웃으로 삭제하지 않는다.
- 기존 fixture 기사의 설명·박수·저장 계약은 보존한다. 새 authored story는 문서 전용 상세로 읽으며 아직 연결하지 않은 반응/공유 버튼을 작동하는 것처럼 표시하지 않는다. 이미지 자산은 Goal37의 정적 번들 참조를 사용하므로 URL 생성/해제·업로드가 없다.

## 원본·공식 근거·보완

- `medium/README.md`, `REVIEW_R2.md`, `SOURCES.md`, F07/F08/F09/F10/F55/F63 관련 분석과 실제 PNG를 대조했다. 실제 계정으로 Medium 발행을 실행한 것은 아니다.
- F07: `sc_a51d0e5d058b47809e1c299e1c28ff0e` Add topics, `sc_234fd58378fc447ba6bc2e6c0033f9c2` Music 검색, `sc_57162331e2334952b5da8676e4de3c22` 선택, `sc_a4216c4ff1f64bb59bc982a8d0067b6e` Music/Culture/Art chip을 관찰했다. 동명/악센트 표기와 집계는 화면 비교 fixture이며 새 발행 수치로 취급하지 않는다.
- F08: `sc_1ceed9061b86476ebc7eb5acb9dd89c7` 초기 preview, `sc_c3bdb30e524c4709ae45998ec529a6c0` 토픽 선택 후, `sc_39fb71a1ee0d43f09bab33c7ef775259` Unlisted Off, `sc_e3b2276c9abd4bc7b08e6e4c322dee9e` 발행 후 내 Stories를 직접 확인했다. publication 선택 이후와 Unlisted On은 미수록이다.
- [Using topics](https://help.medium.com/hc/en-us/articles/214741038-Using-topics): 최대5개와 모바일 Topics/Save를 대조했다. [Unlisted publishing](https://help.medium.com/hc/en-us/articles/215552778-Unlisted-publishing): 공개 노출 제외, 링크를 아는 사람의 읽기 가능을 확인했다. 모두 현재 공식 설명이며 보관본의 제품 버전과 같다고 가정하지 않는다.
- [Publication 제출](https://help.medium.com/hc/en-us/articles/213904978-How-to-submit-a-story-to-a-publication): 일반 writer는 검토 요청하고 owner/editor는 발행할 수 있다. 이번 mock은 두 publication의 모의 편집 권한으로 제한하며 모든 실제 publication이 즉시 발행된다고 주장하지 않는다.
- Gummble 추가 검색은 exact0, 관련1개 `sc_2d1afd7a02a347868564f9757753d077` 로그아웃 확인만 반환했다. publication 선택 후/Unlisted On의 추가 원본을 확보하지 못했다.
- 자체 보완: publication 선택 UI/권한, Unlisted 관리 필터, 제목/내용 필수, 실패/결과 불명/재시도, 전체 문서 미리보기, 고정 fixture 이미지와 모의 작성자 표시. 미수록 본문·반응·실제 발행 수치를 만들어 채우지 않았다.

## 두 차례 자체 검토·발견 결함

1. 1차 자체 검토: 문서 snapshot·저장/발행 순서·영수증·소유권·토픽 최대 수를 대조했다. 번호 목록이 본문을 숫자로 파싱해 NaN이 되는 결함을 연속 번호 계산으로 수정했다. 새 Stories 조회가 기존 초안 실패 카운터를 소비하는 결함은 별도 storyReadFailures로 분리했다. 기존 Next 안내 검사를 실제 미리보기 복귀 검사로 바꿨다. 초기 lint의 사용하지 않는 import도 제거했다.
2. 2차 자체 재검토: 실제 navigation/브라우저의 결과 유실 재시도, A 발행 중 B 전환, source 교체, 실제 문서 reader, 원본 비교와 조회 응답 검증을 점검했다. 잘못된 ID/문서 조회를 거부하고 재시도하도록 보완했으며, 기존 프로필 단독 검사에서 발견한 불필요한 AuthProvider 의존성을 제거해 공유 context로 인증 revision을 전달했다. 미리보기 제목/발행 버튼/Edit 위치와 토픽 입력/행 구분선을 보정했다. 수정 후 타입 검사와 관련10suites/42tests를 통과했고 최종 전체 검사도 통과했다. 독립적인 제3자 검토가 아니다.

## 검사·캡처·플랫폼

- 환경: Node24.18.0/npm10.9.0, Expo57/RN0.86.3/React19.2.3, Windows PowerShell, Edge headless. 기존8081 PID5248을 보존했다.
- 추가 `publishing.test.ts`: 중복/응답 유실/봉인/권한/토픽/실패 후 수정/이미지·멘션 snapshot/늦은 A 결과를 검사한다. `PublishingNavigation.test.tsx`: 실제 navigation의 편집→토픽/취소/5개 제한→발행→Stories→상세, 실패/응답 유실/Unlisted/source 교체를 검사한다. `WrittenStoryScreen.test.tsx`는 다른 ID/잘못된 문서/교체 전 늦은 응답의 회귀 검사다. navigation은 mock하지 않았다.
- 최종 `npm.cmd run check`: 타입/lint·**186suites/1074tests PASS**, Jest 647.119초. `goal39-check-verified.log` 기준이며 이후 제품/테스트 변경 없이 문서만 확정했다. 초기 lint 미사용 import 실패와 이후 AuthProvider 의존성 실패는 수정했고 실패한 중간 전체 실행은 중단했다. 통과 기록으로 대체하지 않는다. 최종 실행의 기존 Android ResponsesPanel `act(...)` 경고1종은 테스트 실패나 브라우저 console 오류와 구분한다.
- 8081 `browser39.py`: 정상·5개 제한·Cancel/Edit/Publication·결과 유실 재시도·실제 본문/서식/이미지/멘션·A/B/같은A·320px/CSS큰글자·Unlisted·새로고침5그룹 PASS, console/page 오류0.
- `failures39.py`: Stories/상세 조회 오류와 재시도, Dark, A 발행 중 logout→B→늦은A→A 복귀2그룹 PASS. 장애 source는 정상으로 복원하고 새로고침했다.
- 증거는 저장소 밖 `C:\Users\leehg\AppData\Local\Temp\kostolany-goals37-40-bafd1b1de3db45efb8a382e232817076`에만 있다. browser39/failures39 JSON, 캡처12개 이상, pairs39와 화면별 pair/overlay/diff, export39/log를 구분한다. 임시 파일은 영구 증거 보존을 보장하지 않는다.
- 비교 조건: 실제 PNG1179×2556을393×852로 축소한 후 상단59/하단34를 제외한393×759 영역과 웹393×759 DPR1을 비교했다. OS 영역 정규화이지 동일 기기 렌더라는 주장이 아니다. 작은 폭320×600와 CSS160%는 별도 검증이며 OS 글자 확대/IME 검사가 아니다.
- 원본과 같은 제목/본문을 입력한 `reference39.py` 추가 비교4쌍도 캡처/직접 확인했다. 제목 글자 영역을 회색값100 미만으로 측정한 결과 원본 `(25,67,193×29)`, 구현 `(26,89,193×30)`으로 y22px 차이가 남는다. 구현 DOM의 Edit `(304,450,48×48)`, Topics `(24,535,345×100)`, Publish `(24,687,345×48)`, Stories 카드 `(0,349,393×145)`를 기록했다. 원본과 다른 대체 이미지·작성자, 기본 토픽 순서/fixture 구성·집계 일부 미수록, 서체/벡터, preview 여백/스크롤 시 고정 제목, 토픽 chip 표현, 프로필 Drafts 추가로 인한 카드 위치·반응 아이콘 미연결 차이가 남는다. 임의의 일치율이나 동일 재현 완료를 주장하지 않는다.
- 최종 `npx.cmd expo export --platform all --output-dir <외부임시>/export39-final`에서 iOS/Android Hermes와 web JS export를 통과했다. 실제 native build/run은 Windows에서 Xcode/JDK/AndroidSDK/adb/gradle 및 native 프로젝트/기기 부재로 실행할 수 없다. macOS+Xcode/Simulator와 Android JDK/SDK+기기에서 build/run·OSIME·키보드·Safe Area·VoiceOver/TalkBack이 남는다. Goal36 native 편집 문단 장식 차이도 기존 잔여다.

## 8081 최종 확인 순서

1. 새로고침 → Write a story → 모의A 로그인 → 다시 Write → 제목/본문/서식/@멘션/이미지 입력 → Next.
2. Topics에서 Music 검색/선택 → 검색 X → chip 유지 확인 → 뒤로 취소 → 재선택 후5개와6번째 제한 → Save.
3. Publication 선택 취소/Select → Edit로 문서 복귀 → Next → 전체 본문 미리보기 → 뒤로.
4. Publish now → Profile Stories → 해당 제목 열기 → 실제 작성 문서 확인 → 뒤로 → Drafts에서 발행된 초안이 없는지 확인.
5. 새 글을 Unlisted로 발행 → Public에 없는지 확인 → Stories 필터 Unlisted → 상세 확인.
6. B 로그인에서 A 개인 목록이 보이지 않는지, A 재로그인에서 발행 글이 남는지 확인 → 전체 새로고침 후 메모리 초기화 확인.

모의 발행 결과이며 실제 공개 게시·백엔드 연동·출시 완료가 아니다. Goal39 커밋 뒤 승인된 Goal40만 진행한다.

## Goal51 후속 확인 — 과거 실행 결과와 구분

Goal51에서 Settings가 열린 프로필 탭을 유지한 채 홈에서 발행하면 Settings로 복귀하는 결함을 재현하고 ProfileHome 목적지를 명시했다. 또한 Goal50의 `/written` 공유 경로에 맞춰 WrittenStoryScreen 기존 테스트의 기대 URL을 수정했다. [Goal51 결과](FE_GOAL_51_RESULT.md)의 현재 전체 검사와 실제 8081 흐름을 따른다. 이 문서의 당시 검사 수치는 변경하지 않는다.
