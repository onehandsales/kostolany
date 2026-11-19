# Goal 22 — 원본 전수 대응·현재 코드·비교 환경 기준선

작업일: **2026-11-19 KST** · 프로젝트: `D:\git_repository\kostolany_project`.

후속 지시 반영: 사용자가 별도 `TODO/evidence` 폴더가 필요 없다고 지정했다. 생성된 캡처·로그·JSON·스크립트는 커밋에서 제외하고 검토 내용은 이 결과 문서, [비교 기준선](FE_GOAL_22_BASELINE.md), [현재 코드/공개 계약](FE_GOAL_22_CODE_AUDIT.md)에 남긴다. 실제 검증을 생략하는 의미는 아니며 이후 필요한 캡처는 저장소 밖 임시 경로를 사용한다. 이번 후속 요청으로 문서의 로컬 커밋을 진행하고 push·배포·Goal23 구현은 하지 않는다. 아래 미커밋 표기는 Goal22 실행 종료 당시의 이력이다.

후속 정리 검증: 문서 로컬 링크1,811개·63흐름/273단계/200화면/C72 대응·원본/FE 소스 보존 검사와 `git diff --check`를 통과했다. 앱 코드 변경이 없으므로 전체 테스트를 다시 실행하지 않았으며 위662건은 Goal22 실행 당시의 검사 결과다.

상태: **Goal22 기준선 작성·두 차례 자기 검토·수정·현재 자동 검사·대표 브라우저 검증 완료.** 정확한 원본 font·일부 미수록 화면·전체 시각 일치·실제 native 검증은 남아 있다. Goal23의 화면/기능 구현은 시작하지 않았다.

| 판정 구분 | 상태 |
| --- | --- |
| 구현/문서 | Goal22의 전수 대응·현재 코드/계약·비교 재현 기준선 완료. FE 기능 추가 없음 |
| 자동 검사 | 현재 타입/lint·662 tests/90 suites·문서 검사·양 플랫폼 JS/Hermes 통과 |
| 시각 검증 | 원본200장 축소 관찰·대표11쌍 비교 수행. 폰트/배치/상태 차이 잔여, 전체 동일 판정 불가 |
| native 검증 | 실제 실행·빌드·OS 기능 미검증. 필요한 환경과 담당52를 기록 |

## 범위와 보존

- 시작 Git은 clean, HEAD `5ff91ea39815d2307a6b22a7abaa178d84346e13`이다. 기존 FE 소스 기준은 `234b224` 이후 변경 없다. 이번 작업은 문서·검증 스크립트·증거만 추가/수정했고 **커밋·push·배포를 하지 않았다**.
- AGENT/README·PROJECT_SCOPE·공통 QUALITY_AND_WORKFLOW/API_CONTRACT·UX README/MEDIUM_REFERENCE, FRONT_AGENT README와 ARCHITECTURE/CODE_CONVENTIONS/STATE_AND_DATA/MOBILE_UI_AND_PLATFORM/PERFORMANCE_AND_SECURITY/TESTING_AND_DELIVERY를 읽고 적용했다.
- Goal1~21 결과를 이력/계약으로 대조했고 Goal21의638건이나 이전 재검토662건을 현재 결과로 대신하지 않았다.
- 기존 localhost8081(PID17148/HTTP200), 사용자 변경/삭제, `medium`382파일, ENV와 FE 소스를 보존했다. 시작 당시 사용자 미커밋 변경은 없었다. 실행 당시 해시 대조·캡처 비교·문서 링크/담당 검사 결과는 아래 표에 기록했다.
- mock/fixture만 사용했다. 실제 인증·메일/push·결제·서버/DB/Storage 연결, 신규 패키지 설치, 소스/아키텍처 확장은 없다. 브라우저에서 변경한 이름/저장은 격리된 mock context 수명에만 존재한다.

## 원본·현재 코드·비교 결과

| 작업 | 실제 결과 | 증거 |
| --- | --- | --- |
| 원본 전수 대응 | 63 ANALYSIS,273단계,고유200ID/PNG,43 UI요소 중복과 해시 일치; 원본 모두1179×2556 | [원본 대응표](FE_MEDIUM_FULL_CLONE_MAP.md) |
| 원본 육안 확인 | 200장을20개 축소 시트로 직접 확인; 대표11장은 확대 비교 | [원본ID·조건·비교 결과](FE_GOAL_22_BASELINE.md) |
| 현재 기능 분류 | C01~C72별 동작/부분/정적/안내/미구현, 코드 경로와 후속 담당 작성 | [현재 코드/계약](FE_GOAL_22_CODE_AUDIT.md) |
| 상태 소유권 | Auth/Like/Bookmark/Profile/ReadingSettings·source·사용자ID/기사ID/목록ID/sessionRevision·초안/route 수명 대조 | 같은 문서의 상태 소유권/계약 표 |
| 후속 공개 계약 | 반응 target종류, 관계, 읽기이력, editor/draft/media, 알림/설정/권한의 담당·입력/결과·의존성을 초안으로 명시 | 새 store/API/DB 구현 없음 |
| 대표 비교 | 14캡처 중 서로 다른 원본11장과 paired/overlay/diff 생성·확인; 조건/남은 차이 기록 | [기준선과11개 원본 링크](FE_GOAL_22_BASELINE.md) |
| 보충 조사 | 읽기 전용 Gummble 앱 metadata+3검색+추가3이미지; 공식 lists/claps/block 설명 재확인 | [조회 요약·screen ID·공식 출처](FE_GOAL_22_BASELINE.md) |

현재 동작하는 범위는 Stories 검색/기사 열기·복귀, 기존 boolean like, 다중 목록 저장·기본 목록 관리, Google mock A/B, 이름/소개·기본 설명 수준 등이다. Responses/Follow/Listen/Share/Write·여러 Library탭/설정은 안내 또는 정적 표현이다. 누적 박수·전체 목록 저장·작성/발행·온보딩·알림 등 후속 상태는 아직 없다. 기존 boolean like나 정적 highlight를 Medium의 해당 기능 완료로 보지 않는다.

원문·family/weight/size/line-height/letter-spacing/줄바꿈·bounds/여백/색/아이콘/사진·선택값/UX를 비교 항목으로 고정했다. 393×759, DPR1, light, 같은 기사/검색어/주요 선택값을 사용했다. 계정/fixture·웹 focus·OS sheet 영역이 다른 쌍은 진단용 비교로 표시했다. 원본을393×852로 줄여59/34를 제외한 값은 비교 좌표이며 실제 원본DPR·Safe Area의 증명이 아니다.

CDP에서 실제 Windows 렌더가 Arial/Segoe UI/Georgia 계열임을 확인했다. 원본 font파일이나 font picker를 확보하지 못했으므로 동일 글꼴·100% 일치 판정을 하지 않는다. **200장 원본 검토와11장 실제 구현 비교는 별개**다.

## 1차 검토 → 수정·검증

수행 방식: 단일 에이전트의 **자기 검토**다. 별도 독립 검토자로 표현하지 않는다. 문서·실제 코드·원본·브라우저 상태를 대조한 검토와 아래 명령 실행 결과는 분리한다.

| 발견 사항 / 재현·원인 | 수정·영향 | 확인 |
| --- | --- | --- |
| F45/F46/F50의 Report this item 진입은 있으나 흐름 관련Goal에29가 빠짐 | C24·해당F·중복S의 관련Goal 합집합·Goal29 원본 목록 연결 | 단계/ID/담당 합집합 검사 |
| Goal37에서 카메라/앨범 OS화면 전체를 미수록으로 표현 | 프로필의 실제갤러리 S113을 명시; 편집기 동일 picker·촬영/권한 실패 미확인으로 한정 | 원본PNG·ANALYSIS 재대조,37/42/52 책임 |
| 현재 공식 설명의 Undo claps/사용자 목록/Blocked users에 펼친 원본 근거 없음 | C10/C30·25/32, C24·29/49에 확인 과제로 명시; 과거 iOS 원본과 정책 충돌 분리 | 공식3페이지와 현재PNG 대조; UI 구현 안 함 |
| 기존 현재상태에 macOS/PID·638건 등 과거 수치가 현행처럼 남음 | 최신 Windows/662건/기준선 링크 추가, 기존 기록을 이력으로 표시 | 실제check/export/browser와 문서 대조 |
| 브라우저 최초 검색 label 대소문자·홈의 첫 카드 locator를 잘못 가정 | 실제 정규화 검색과 For you fixture의 표시 요소를 기다리도록 도구 수정 | attempt1/3 실패 보존 후 최종 흐름 통과; FE 결함으로 세지 않음 |
| 첫 캡처에 홈 loading·일부 이미지 미표시가 포함 | 결과 데이터·image decode·font ready·렌더 완료 대기 추가, 전14캡처 재촬영 | 최종 이미지 naturalWidth>0·manifest해시 확인 |
| DOM 측정에 비활성 route heading이 섞임 | aria-hidden/checkVisibility 필터 후 CDP font 대상을 한정 | 실제 활성 화면/측정값 재대조 |

자료의 상태 표기와 비교 증거를 수정했다. Goal23 이후의 시각/기능 차이를 이번에 앞당겨 구현하지 않았다. 새 제품 회귀 테스트나 중복 Jest 테스트도 추가하지 않았다. 신규 Python은 원본/링크/보존 검사 및 실제 브라우저 캡처 재현 도구다.

## 2차 재검토

수정된 계획/대응표와 C72개 코드 경로·실제 메뉴를 다시 읽고, 최종 이미지와 측정값·실행 로그를 대조했다. 첫 검토 표를 복사한 독립 검토가 아니라 **수정 후 두 번째 자기 검토**다.

| 재검토 항목 / 추가 발견 | 수정·재검증 결과 |
| --- | --- |
| F/S 담당은 추가됐으나 Goal29 본문의 원본 목록 연결도 필요 | F45/F46/F50을 Goal29 원본에 추가. 각F 관련Goal과 계획 역참조·각S 관련Goal 합집합 검사 통과 |
| 일부 새 코드 링크가 실제 파일명과 달랐음 | ListActions/ReadingListScreen/ExploreSections 및 feed/components 경로로 교정. 최종 로컬 링크 검사 통과 |
| S076 빈 생성폼을 처음 비교 메모에서 OS키보드 화면으로 잘못 분류 | 실제PNG에는 키보드가 없음 확인. manifest/비교 설명을 원본·웹 모두 키보드없음/웹focus차이로 수정 |
| 비활성 route 제외 후에도 로그인 modal 뒤의 기사 heading이 측정에 남음 | 활성 aria-modal dialog 안으로 측정 범위 한정. 브라우저 흐름·14캡처 재실행 통과; login/save/profile-edit/list-create는 해당modal제목만 측정됨 |
| 수정 캡처와 comparison 파일이 어긋날 가능성 | 최종 캡처로11쌍/overlay/diff 재생성, actualSha256와manifest 일치; 대표쌍 재확인. 미로딩 이미지0·console/pageerror0 |
| 원본/ENV/소스·미리보기 보존, 후속Goal 선행 관계 | medium382파일·보호대상 해시 유지, FE 변경은README뿐. HEAD변경없음,8081 PID17148/HTTP200 유지. 최소선행 역전/순환 없음 |

문서 도구와 비교 증거에 대한 수정 후 필요한 검사만 다시 실행했다. FE 소스/테스트가 바뀌지 않아 통과한 전체 Jest를 숫자 확인용으로 반복하지 않았다. 남은 폰트/메뉴/기기 확인은 책임과 필요 근거를 기록했으며 해소된 것으로 처리하지 않았다.

## 실제 실행 결과

| 검증 | 현재 실행 결과 | 증거·해석 |
| --- | --- | --- |
| Node/npm | v24.18.0/10.9.0 | package engines의Node24와 일치 |
| typecheck | 통과 | `npm.cmd run check` 내부 `tsc --noEmit` |
| lint | 통과 | `eslint . --max-warnings=0` |
| 전체 Jest | **90 suites/662 tests 통과**,417.737초 | `npm.cmd run check` exit0; iOS/Android 두 설정 합계 |
| Android export | 통과 | `npm.cmd run export:android` exit0; JS/Hermes만 |
| iOS export | 통과 | `npm.cmd run export:ios` exit0; JS/Hermes만 |
| 브라우저 | 최종 스크립트 통과,14캡처, console/pageerror0·외부요청0 | 실제 조작: 로그인→명시적저장→프로필수정→Library·reloadguest 확인 |
| 원본/문서 검사 | 통과:63흐름/273단계/200ID/C72/Goal32개·로컬 링크·담당 역참조·의존성·캡처해시·원본/소스 보존 | 문서 검사 exit0, `git diff --check` 통과 |
| native 실행·빌드 | **실행 불가·미검증** | Windows에는Xcode불가; AndroidSDK/adb/emulator/JDK없음. macOS+Xcode/iOS기기와 AndroidSDK/JDK+기기 필요 |

check.log의 첫 PASS 줄에 붙은 PowerShell `NativeCommandError`는 Jest stderr 출력의 redirection 표시다. 명령 exit0·마지막90/662PASS를 함께 확인했으며 Jest 실패로 오인하지 않는다. browser-attempt1/3은 도구 locator 실패, attempt2/4 및 browser-review1은 캡처/측정 개선 전 기록이며 최종 통과 기록과 구분한다.

실제 OS Safe Area/IME/한글 조합/큰 글자/VoiceOver/TalkBack/제스처/권한·카메라·공유·음성 native 행동은 수행하지 못했다. headless viewport/키보드 이벤트/JS번들을 그 증거로 대신하지 않는다. 각 기능 담당과 Goal52에서 필요한 플랫폼 검증을 이어간다.

## 잔여와 Goal23 선행 조건

- Goal23 시작 자료: [실행 계획](FE_MEDIUM_FULL_CLONE_GOALS.md), [원본 대응표](FE_MEDIUM_FULL_CLONE_MAP.md), 현재 코드72행, 기준선11쌍/실측값을 읽는다. 기존계약·source/사용자/초안 수명과8081을 보존한다.
- 원본 font/정확한 icon·Font family 펼친 메뉴는 미확인이다. Gummble 재조회가 이를 해결하지 못했다. 폰트 출처 확보와 원본좌표 측정을 Goal23 첫 작업으로 유지하고 대체품을 동일 판정하지 않는다.
- 추가 Gummble3이미지는 로컬200밖이며 versionId가 없어서1419 비교대상에 편입하지 않았다. 직접 PNG저장은HTTP403으로 실패했으며 metadata만 보존했다.
- 11쌍에는 font·행높이·아이콘·sheet위치·일부fixture/포커스 차이가 있다. 현재 공식정책/원본충돌, 미수록분기 및 다음조회방법은 FE_GOAL_22_BASELINE.md의 담당표에 남겼다.
- 전체200장 구현비교·63흐름 기능/실패/경합 완성은51/53, 실제native는52의 후속범위다. 이번 기준선 완료가 이들 미완료 항목을 해소한 것은 아니다.

## 8081 최종 확인 순서

1. 기존 [localhost8081](http://localhost:8081)을 새 context로 열고 For you 로딩 완료·사진을 확인한다. Explore→Mindfulness검색→Stories결과, People안내→닫기.
2. 검색어를 `ChatGPT Is Poisoning`으로 바꿔 기사 상단을 연다. Listen/Responses/Share/Follow의 안내와 닫기를 각각 확인한다.
3. 북마크→로그인화면→Google mock A 성공. 처음 행동은 자동 실행되지 않으므로 사용자가 다시 북마크→Reading list체크→Done을 실행한다.
4. 상세뒤로→검색어가 남은 Explore→Profile→Edit your profile. 이름을Alex Smith로 저장하고 재표시를 확인한다. 다시편집→닫기로 취소한다.
5. Settings→System default표시, Dark클릭은안내임을확인→닫기→Profile복귀.
6. Library→Reading list의1story·저장기사 확인→New list빈폼. 전체Reload뒤Profile이guest로초기화되는지확인한다.
7. 화면비교는393×759/DPR1/light조건과 [화면별 비교 결과](FE_GOAL_22_BASELINE.md)을 사용한다. 320/1440폭은 별도레이아웃관찰이며iOS/Android실행검증이아니다.

Goal22 실행은 결과 보고에서 종료했다. 이후 사용자 요청에 따라 Goal22 문서만 로컬 커밋하며 다음Goal 자동실행·push·배포는 하지 않는다.
