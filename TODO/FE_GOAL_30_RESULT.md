# Goal 30 — 토픽·Publication·큐레이션 탐색

2026-11-19~20 KST, macOS. **구현 완료·시각/native 검증 잔여**. Goal 29 최종 132 suites/824 tests 뒤 착수했다. Goal 35까지 연속 요청을 유지한다.

## 현재 구현과 계약

`features/topics`의 주입 가능한 공개 catalog/source, 조회 오류·재시도·공급부/조회 세대 경계, TopicScreen·DiscoveryScreen을 구현했다. 작가/publication 관계에 topic kind를 추가하되 공개 프로필 FollowTarget과 관계 RelationshipTarget을 구별한다. topic은 이메일 구독 대상이 아니다. 사용자별 직렬 쓰기·최신 의도·operationId 재시도·인증 scope는 기존 관계 저장소를 공유한다. 내 Following 목록과 Following 기사 피드가 같은 토픽 관계를 사용한다. 새로고침/재실행은 개인 메모리 상태를 초기화한다.

Explore 칩·빈 검색의 토픽 행·홈 토픽 탭·기사 하단 토픽을 실제 상세로 연결했다. 기존 한글 금융 키워드 바로가기는 검색 계약을 유지한다. Life→Self Improvement→기사/큐레이션→공개 목록 진입과 뒤로 복귀를 연결했다. 공개 목록 전체 저장/본문 구성은 Goal 32에서 완성한다. 공유는 대상 식별 진입이며 실행은 Goal 47이다.

Who to follow 캐러셀의 작가/publication 링크·Follow, See all·See more suggestions, Recommended publications를 연결했다. 추천 행은 mute/block과 같은 상태를 사용한다. publication 상세는 보관된 화면이 없어 공개 작가 화면 구조를 재사용한 자체 보완이다. 미수록 콘텐츠를 기사로 만들어 채우지 않고 빈 상태를 제공한다. 실제 추천 알고리즘·이메일 전송·외부 검색은 없다.

## 원본과 관찰

F01~05, F07, F12~15 관련 ANALYSIS를 확인했다. F07의 발행 토픽 5개 제한은 작성용 계약이며 독자의 팔로우 상한으로 사용하지 않는다. 직접 본 원본 ID는 `sc_5e0ba0e498ff49579bf838096aec4b5e`, `sc_1c3e4349171248378eada528f7942269`, `sc_602f368bf00a46b8b57d68f964ed6c16`, `sc_4352273aa0654f939705613dfa224e75`, `sc_6bc604f45031400d9cebd252cd89e7a2`, `sc_dfdd5f6377a848c59b3512417cb47490`, `sc_4602e853aca341a697239bc9f55b6da3`, `sc_7de88da749774d0483716f2e861fb080`, `sc_974be74d8855401e84cbad9f01dc8e93`, `sc_15a122b14ac84b3d80c37fb84dfae4c7`, `sc_bd0cb76562a74fb69a3569e15daf02ee`다. 버전 ID 1419 보관본이 기본 기준이다.

Life 7.1M followers/1.3M Stories와 Self Improvement 10.6M/1M은 서로 다른 토픽 캡처다. Follow→Following의 같은 대상 전환으로 해석하지 않는다. 초기 계정 관계는 비어 있으며 화면 비교에서 직접 Follow한다. 캡처 수치는 정적 관찰이고 실제 사용자 증가에 따른 공식 집계 정책은 구현하지 않는다.

큐레이션 미리보기 첫 글과 전체 목록 첫 글·순서는 다르다. 목록의 8 stories 표시를 8개 전체 콘텐츠 확보로 계산하지 않는다. 두 번째 미리보기 사진은 오른쪽 97×120 부분만 확보했다. 첫 시도에 전체 목록 하단 사진을 재사용했으나 떠 있는 컨트롤이 섞여 1차 시각 검토에서 발견·폐기했다. 현재 원본 큐레이션의 순수 사진 부분만 crop하고 미수록 나머지를 확대·합성해 채우지 않는다. 새 사진 8개의 출처와 물리 crop 좌표는 `FE/assets/medium/SOURCES.json`에 남긴다.

2026-11-19 현재 공식 [Refine recommendations](https://help.medium.com/hc/en-us/articles/224488047-Refine-recommendations), [Your homepage](https://help.medium.com/hc/en-us/articles/115012586467-Your-homepage), [Using topics](https://help.medium.com/hc/en-us/articles/214741038-Using-topics)를 대조했다. 추천 입력의 대상 분리와 publication homepage Follow를 확인했다. 실제 추천 순서/모델은 보관 캡처와 같은 것이라고 주장하지 않는다.

Gummble publication 상세 보완 검색은 보관 Home과 `sc_ddd503426d044b0c8b30948d72a5e263`, `sc_e6491de53d8743dca8a3ff0fc99dc1cb`를 반환했다. 후자 둘은 실제 이미지로 확인한 구형 Reading list와 David Gerken 작성자 화면(390×844)이며 publication 상세 근거가 아니다. 미수록 범위와 버전 차이를 유지한다.

## 1차 자체 검토와 수정

토픽 추가로 프로필 Following 숫자와 목록이 달라지는 연결을 찾아 내 목록에 토픽 행을 추가했다. 공개 작가의 캡처된 following 명단은 그대로 유지한다. Following 기사 조회는 주입한 topic catalog를 사용하도록 바꿨다. 토픽 소유 관계와 작가/publication의 같은 문자열 ID가 섞이지 않도록 kind를 포함한다.

기존 한글 검색 바로가기가 빈 토픽 상세로 바뀌는 회귀를 발견해 금융 검색과 Medium 토픽을 분리했다. 원본 근거 없는 모든 토픽의 Life 관련 칩 복제는 제거했다. 최초 타입/lint와 navigation 실행은 중복 import 때문에 실패했고 중복 선언을 제거했다. 이후 타입 검사와 실제 navigation/검색 회귀 6 suites/28 tests(22.673초)가 통과했다. source 포함 초기 12 suites 실행의 4개 실행 실패를 통과로 계산하지 않는다.

브라우저 정상 10캡처 흐름에서 팔로우·큐레이션/기사 복귀·추천 publication·목록 확장을 확인했고 오류 0이었다. 원본 대조에서 사진의 intrinsic 크기가 aspectRatio보다 우선하여 크게 표시되는 문제를 발견했다. 비율을 가진 컨테이너와 명시적 자식 width/height로 수정했다. 48px 터치 target은 유지하면서 토픽 집계 간격·칩 폭·큐레이터 행 간격을 보정했다. 현재 수정 후 캡처/장애 시나리오를 재검사한다.

## 검증 당시 진행 기록

`/tmp/kostolany-goals25-35.4FQsD5/goal30-*`에 일회성 스크립트·로그·비교 이미지가 있다. source 실패/빈 catalog/쓰기 실패/느린 응답 및 계정 격리 브라우저 검사 후 normal 복원을 확인한다. 다음은 2차 자체 재검토, 필요한 회귀, 현재 코드 전체 check와 양 플랫폼 JS/Hermes, 최종 화면 대조/결과 갱신이다. 아직 Goal 30 최종 완료 상태로 계산하지 않는다.

원본 font/vector·publication 상세·미수록 기사 본문/사진 범위와 실제 native 검증이 남는다. 전체 Xcode/Simulator 및 Android SDK/adb/emulator가 필요하다. 웹 문구 선택/브라우저·Jest·JS/Hermes를 실제 native build/run·OS IME 검증으로 표현하지 않는다.

## 2차 자체 재검토와 추가 수정

추천 publication 화면이 토픽 공급부 실패 때문에 함께 막히는 결합을 발견해 publication 필터는 디렉터리 공급부만 기다리도록 수정했다. 실제 navigation 회귀를 추가했다. Follow 버튼의 web 선택 의미를 `aria-pressed`로 명시했다. 첫 장애 스크립트의 `aria-selected` 단정 실패는 button 역할과 맞지 않는 검사였으며 올바른 상태로 수정 후 재실행한다.

원본 비교를 다시 보며 사진 크기 컨테이너만 바꾸면 RN Image의 intrinsic width/height가 남는 점을 확인했다. 자식 이미지에도 100% 크기를 지정했다. 큐레이션 byline을 실제 작가/publication 진입으로 연결하고 사진 부분 캡처를 명시적으로 유지한다. 최종 검사 전 정상 preview 설정 복원과 현재 화면 재캡처를 수행한다.

최종 검사 첫 실행은 RN 0.86의 타입에 없는 StyleSheet.absoluteFillObject 때문에 typecheck에서 중단됐다. 지원되는 StyleSheet.absoluteFill로 바꿨으며 규칙/타입을 억제하지 않았다. 해당 실행은 통과로 계산하지 않고 수정 후 전체 check/export를 다시 실행한다.

추가 브라우저 재검토에서 기사에서 토픽을 열고 복귀한 뒤 접힌 상단 버튼이 웹 접근성 트리와 tab 순서에 남는 것을 실측했다(`goal30-header-probe.json`: 부모 높이0, aria-hidden 없음, 버튼 tabIndex0). 원래 위로 스크롤해 chrome을 다시 보이는 동작은 정상이다. 숨긴 상단/반응 막대에 aria-hidden과 display:none을 적용하여 실제 웹 포커스에서도 제외하고 위 스크롤 복귀 회귀를 추가했다. React 컴포넌트 상태 수명은 유지한다.

수정 전 전체 실행은 138 suites 중136 통과/2 실패, 834 tests 중832 통과/2 실패(298.712초)였다. 두 실패는 같은 새 publication 확장 테스트에서 가상 목록의 멀리 있는 미렌더 행을 즉시 단정한 것이다. 확장 직후 실제 렌더 범위의 추가 행을 비동기로 확인하도록 수정했다. `goal30-final-verified.log`를 통과 기록으로 사용하지 않는다. 접근성 수정까지 포함한 최종 검사를 새로 실행한다.


## 최종 실행 결과와 비교

위 “진행/재실행” 문장은 실패를 포함한 검사 당시 이력이다. 이후 두 차례 자체 검토를 마쳤으며 독립 검토로 계산하지 않는다.

- Node24.18.0/npm10.9.0, FE에서 `caffeinate -i npm run check`: 타입/lint 통과, **138 suites/836 tests 통과,296.885초**(`goal30-current-check.log`). 이전 Goal 수치를 대신 쓰지 않았다.
- 이후 시각 전용 여백/캐러셀 보정 후 `npm run typecheck && npm run lint && npm test -- --runInBand TopicNavigation SearchNavigation`: **4 suites/12 tests 통과,5.365초**(`goal30-layout-final-check.log`). 상태/명령 코드는 전체 검사 뒤 바꾸지 않았다.
- 브라우저 Chrome157/Playwright1.58.2,393×759/DPR1 정상10캡처와 320px/SystemDark·빈 큐레이션·캐러셀·기사 토픽 복귀4캡처: 모두 완료,console/page 오류0. 캐러셀 끝 scrollLeft667=max667, 좁은 화면 document/viewport320 일치.
- 읽기 실패/빈 catalog/관계 쓰기 실패/느린 응답4시나리오 모두 완료,오류0. A→B→A·같은 A 재로그인·새로고침·빠른 연속 의도·게스트 로그인 취소/성공 후 수동 재실행을 확인했다. 장애 설정은 normal로 복원했다.
- 접힌 기사 상단은 수정 후 접근성 노출0·프로그램 포커스 불가·aria-hidden=true·높이0(`goal30-header-fixed.json`). 실제 OS VoiceOver/TalkBack 검증은 아니다.
- 양 플랫폼 JS/Hermes export 성공(각 약2.7MB,metadata11KB), 실제 APK/IPA·native 실행과 구분한다. 마지막 시각 보정 후 export도 별도로 실행했다.

원본1179×2556을393×852로 축소한 뒤 상단59/하단34를 제외한393×759와 구현393×759를 나란히 대조했다. 이 보정은 기기 DPR 측정이 아니다. Life/Self Improvement 원본·큐레이션·Who to follow 첫/후반을 실제 확인했다. 토픽 Follow target은75.31×48이며 큐레이션 마지막 위치에서 제목y86,사진y174,전체 목록 targety574(원본 약88/180/575)다. 보정 전140/214/614에서 개선했고 목록·기사 뒤로 복귀 scrollTop687을 유지했다.

마지막 시각 재검토에서 추천 캐러셀의 본문18px·높이약398px·전체 폭 Follow가 원본13px·약290px·내용 폭 버튼과 달랐다. 카드 본문13/20·3줄,내부 간격과 Follow 폭을 수정했다. 48px target은 유지한다. 원본과 같은 Who to follow 제목 위치/가로 위치로 별도 재캡처했다. 원본 publication 배경/verified icon 일부,서체·굵기·줄바꿈·정확한 blur/벡터는 남는다. 큐레이션 두 번째 사진은97px 부분만 확보했고 전체 사진/본문을 합성하지 않았다. 메뉴 원본이 미수록인 큐레이션 더보기→기사 신고는 자체 보완이다. “100% 일치”나 전체 클론 완료가 아니다.

## 저장 수명·후속 범위·플랫폼

공개 catalog와 원본 표시는 개인 데이터가 아니다. Follow는 userId+kind+targetId로 분리하고 기본 메모리 수명을 유지한다. 스크롤/필터는 화면 수명,오류/팝오버는 인증 revision scope다. 프로필 이름/설정 변경은 인증을 초기화하지 않는다. 이메일은 작가 관계에만 적용하며 실제 발송하지 않는다. 공개 목록 전체 Save/반응/응답은32,추천 관리/이력은31,공유 실행은47 담당이다.

macOS에서 기존8081 서버를 보존했다. Xcode 전체/Simulator와 Android SDK/adb/emulator가 없어 실제 native build/run·OS 큰 글자·IME·Safe Area·제스처는 미검증이다. JS/Hermes와 Jest의 iOS/Android 프로젝트 이름을 기기 실행으로 표현하지 않는다. 웹320px·테마·실제 클릭/스크롤을 검증했지만 실제 한국어 OS IME나 스크린리더를 대신하지 않는다.

## 8081 최종 확인 순서

1. 탐색→Life→Follow→로그인 닫기,다시 로그인 성공 후 직접 Follow→Self Improvement→Following.
2. Pope 기사→뒤로→큐레이션→미리보기 기사→뒤로→See the full list→뒤로,스크롤 유지.
3. 홈 Following과 프로필 Following에서 같은 토픽 확인,토픽 해제 후 반영 확인.
4. 탐색 Who to follow 가로 끝·See all·See more→작가/publication,Recommended publications→Follow→About→뒤로.
5. 기사 하단 AI 토픽→Follow→기사 복귀→위로 스크롤하여 헤더 복원. 320px·Dark/System 반복.
6. mock 실패/느린 응답 주입은 저장소 밖 시나리오 스크립트 기록을 참고하고 실행 후 normal 복원.

검증 산출물은 `/tmp/kostolany-goals25-35.4FQsD5/goal30-*`이며 영구 증거 저장소는 아니다. 의존성/lockfile/ENV/medium 원본 변경·외부 연동·커밋/push/배포는 없다. Goal31로 이어간다.
