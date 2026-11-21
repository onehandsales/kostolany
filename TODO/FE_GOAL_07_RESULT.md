# Goal 7 — 좋아요 등록·해제 결과

> Goal53 후속 링크 점검: 이 문서의 과거 경로 중 실제 파일이 없는 8곳은 링크 대신 당시 경로와 보관 상태를 표시했다. 과거 검사 결과·캡처를 재실행하거나 복구한 것이 아니다. 삭제된 `evidence/` 자료는 이 작업 트리에 없으며 역사적 결과의 보관 한계로 남긴다.


2026-11-18 KST. **구현·자동 검증·PC 브라우저 동작·모바일 폭 원본 비교 완료 / 실제 iOS·Android 기기 검증 대기**.

Goal 7만 진행했다. 홈·검색 결과·상세에서 같은 기사의 좋아요 등록·해제와 수치, 처리 중 상태, 실패 복구·재시도가 연결된다. 예시 기사와 고정 모의 사용자만 사용하며 실제 저장이나 인증 성공을 뜻하지 않는다.

## 적용 규칙과 보존

- `FRONT_AGENT/README.md`와 연결된 아키텍처·명명/주석·상태/데이터·모바일 UI·성능/보안·테스트/전달 6개 문서를 확인했다. `FE_GOALS.md`, AGENT 진입·제품 범위·기술 구성·현재 상태, UX와 공통 검증 규칙도 대조했다.
- 새 설명 주석과 수정한 설명 주석은 한글 한 문장·한 줄로 작성했다. 관련 없는 기존 영문 주석은 일괄 변경하지 않았다.
- 작업 전부터 수정되어 있던 `FRONT_AGENT/{README,CODE_CONVENTIONS,TESTING_AND_DELIVERY}.md`를 보존했다. 규칙 문서 7개 전체를 작업 시작 시 SHA-256과 대조했다.
- 기존 Expo 웹 서버 `127.0.0.1:8081` PID 24324를 유지했다. 검증용 별도 Chrome 프로필만 사용했다.
- `medium/flows`, Backend, 의존성·lockfile·ENV를 변경하지 않았다. 실제 Supabase·인증·RSS·AI 연결, 로그인 UI·북마크·Goal 8, 커밋·push·배포는 수행하지 않았다.

## 구현과 책임

| 파일/영역 | 책임 |
| --- | --- |
| `FE/src/features/likes/types.ts` | 반응 identity·절대 목표 명령·응답·표시 상태 계약 |
| `likes/data/createMockLikeSource.ts` | 고정 fixture 수치, 모의 조회·목표 상태 변경, 지연·반영 전 실패 |
| `likes/createLikeStore.ts` | 기사별 확정 상태·최신 의도·진행 명령, 수치 파생, 조회 세대, 실패 복구·재시도, 구독 |
| `likes/LikeProvider.tsx` | 앱 실행 수명의 공급부/사용자 범위를 조립 |
| `likes/useArticleLike.ts` | 기사별 `useSyncExternalStore` 구독과 사용자 이벤트 연결 |
| `likes/ArticleLikeControl.tsx` | 하트·수치·문구·터치 영역·접근성 표시 |
| `AppNavigator.tsx` | 모든 탭과 상세를 하나의 Provider 안에 배치 |
| 홈 `ArticleCard`, `SearchCard` | 기사 이동과 좋아요를 형제 조작 영역으로 분리 |
| `ArticleDetailScreen` | 본문 ScrollView 바깥의 하단 반응 바, 기존 사실 요약·AI 해석 유지 |

새 상태 관리 라이브러리나 저장소 SDK는 추가하지 않았다. Context에는 안정적인 저장소 참조만 전달하고 반응 변경은 해당 기사 구독자에게 전달한다. 각 화면의 카드 객체·조회 결과에는 수정 가능한 반응 상태를 복제하지 않는다.

## 상태 수명과 동시성 선택

| 항목 | 이번 구현의 선택 |
| --- | --- |
| 상태 소유자 | `AppNavigator`의 `LikeProvider`가 만든 저장소 하나 |
| 식별 범위 | Provider의 `userId` + 저장소 내부 `articleId`; 실행 사용자는 `example-reader`로 고정 |
| 화면 이동 | 카드 unmount·가상화·상세 이탈은 구독만 해제하며 공유 변경은 끝까지 처리 |
| 재진입 | 이미 조회한 반응을 재사용하며 화면 진입마다 초기값으로 덮거나 재조회하지 않음 |
| 공급부/사용자 범위 교체 | 새 저장소로 격리하며 이전 인스턴스의 응답은 새 구독자에게 반영되지 않음; 실제 계정 전환 UI는 없음 |
| 초기 조회 | 수치가 없으면 `—`와 불러오는 중 상태를 표시하고 첫 조회 완료 전 조작을 막음; 실패 시 조회 재시도 |
| 연속 입력 | 기사별 쓰기를 하나씩 직렬 처리하고 대기 의도는 마지막 boolean 목표로 합침; 다른 기사 조작은 허용 |
| 낙관적 표시 | 입력 즉시 선택·수치·접근성 상태를 같은 snapshot에서 갱신; 쓰기 중에도 반대 선택 가능 |
| 수치 | `확정 count + 현재 목표의 0/1 - 확정 선택의 0/1`; 성공 시 다시 증가시키지 않음 |
| 성공 | 응답의 절대값을 확정 기준으로 갱신하고 더 최신 선택은 보존; 다음 목표가 확정 상태와 다를 때만 후속 명령 |
| 실패 | 최신 의도에 해당하는 실패만 마지막 확정 상태·수치로 복구하고 실패 목표를 보관; 다른 기사에 영향 없음 |
| 오래된 실패 | 진행 중 입력이 바뀌었으면 예전 실패로 새 목표를 롤백하지 않고 필요한 최신 목표를 처리 |
| 오래된 조회 | 쓰기 의도 발생 시 읽기 세대를 올려 이전 조회의 성공·실패 모두 무효화; 쓰기 중 새 조회는 보내지 않음 |
| 재시도 | 저장된 실패 목표를 그대로 재전송; 현재 선택을 다시 뒤집지 않으며 처리 중 재시도 연타는 무시 |
| 앱 재실행 | 메모리만 사용하며 전체 새로고침·앱 재실행·Provider 재생성 시 초기화; Fast Refresh의 보존 여부는 정책으로 보장하지 않음 |

동일 기사에서 오래된 쓰기 응답이 더 최신 쓰기 성공 뒤에 도착하는 상황은 직렬화로 발생시키지 않는다. 그 대신 오래된 명령을 기다리는 중 새 의도가 들어오는 경우, 실패한 옛 등록 이후 최신 등록을 다시 처리하는 경우, 공급부 교체 전의 성공·실패가 새 성공 뒤 도착하는 경우를 검증했다. 조회 응답은 쓰기와 겹칠 수 있으므로 별도 세대 검사가 필요하다.

공급부는 같은 목표를 반복 적용해도 해당 모의 사용자의 반응을 한 번만 집계한다. 응답의 기사·사용자·목표와 정수 수치를 검사하며 선택된 상태의 수치가 1보다 작거나 음수이면 오류로 처리한다. 음수 clamp로 잘못된 전이를 숨기지 않는다. `commandId`는 모의 실행 내 명령 식별자이며 실제 서버의 멱등키·버전 계약으로 확정한 값이 아니다.

**한계:** 이 모의 공급부의 실패는 반영 전 실패다. 실제 서버가 저장한 뒤 연결이 끊긴 결과 불명 상태, 다른 사용자 동시 반응, 영속 저장, 오프라인 큐는 구현하지 않았다. 실제 API 연결 시 결과 확인·멱등 재시도·집계 버전 계약을 별도로 정해야 한다. 현재 기사 수는 고정 10개이며 대규모 캐시 성능을 검증한 것은 아니다.

## 화면용 기본안과 재현

1인 1좋아요를 등록·해제하는 기본안이며 Medium의 다중 박수 정책을 채택한 것이 아니다. 고정 사용자는 처음에 모든 기사를 선택하지 않은 상태다. 수치는 다른 모의 독자의 반응을 나타내는 임의 예시다. 좋아요로 피드·검색 결과 순서를 재정렬하지 않는다.

| 기사 ID | 초기 수치 |
| --- | ---: |
| `example-latest-rates` | 24 |
| `example-latest-exchange` | 0 |
| `example-latest-housing` | 8 |
| `example-latest-prices` | 16 |
| `example-popular-cash` | 128 |
| `example-popular-market` | 96 |
| `example-popular-debt` | 42 |
| `example-recommended-psychology` | 32 |
| `example-recommended-news` | 12 |
| `example-recommended-time` | 6 |

`FE/src/features/likes/data/likePreview.ts`의 `likePreviewScenario`를 변경한 뒤 전체 새로고침한다. 결과 전달 시 `normal`로 복구했다. 제품 화면에 개발용 장애 스위치를 추가하지 않았다.

| 값 | 재현 |
| --- | --- |
| `normal` | 조회·쓰기 각각 350ms 뒤 성공 |
| `write-error` | 기사별 첫 쓰기만 반영 전에 실패; 재시도 성공 |
| `unlike-error` | 등록 성공 후 기사별 첫 해제만 실패; 선택·수치 복구 후 해제 재시도 |
| `read-error` | 기사별 첫 조회 실패; 조회 재시도 성공 |
| `slow` | 조회·쓰기 각각 1,800ms; 빠른 연속 조작과 화면 이동 확인 |

브라우저 경로: [로컬 미리보기](http://localhost:8081) → 홈 하트 → 기사 상세 → 하트/뒤로 → 탐색에서 `금리` 검색 → 같은 기사 하트/상세 → 검색 복귀. 전체 새로고침은 반응과 실패 이력을 초기화한다.

## 원본 확인과 시각 비교

이번에 로컬 보관 분석 문서와 실제 PNG를 다시 확인했다. Gummble MCP 재조회나 실제 Medium 계정 재현은 하지 않았다.

| 출처 | 확인 내용 |
| --- | --- |
| 앱 | Medium iOS, `medium-ios`, `4674239e-d24a-4ef4-aed5-9682429edd48` |
| 버전 | 보관된 MCP 카탈로그 `Latest` ID `1419`; 제품 빌드·캡처일·기기·OS·DPR은 미확인 |
| 상위 흐름 | [Story detail](<../medium/flows/Home/Story detail/ANALYSIS.md>), `d34a6d85-ab07-4cb3-87d2-28db79260b80`; 반응 영역 관련 기록 대조 |
| 하위 흐름 | [Sending claps](<../medium/flows/Home/Story detail/Sending claps/ANALYSIS.md>), `17fcaee5-2661-40cf-9220-e87e733eaaf4`; PNG 3장 확인 |
| 미선택 | `sc_332d5b0923e546fcbf6a8fc613cda6a4`; 상위 단계 02와 동일 이미지 |
| 입력 피드백 | `sc_0629a27b99a645cabe6e110b5d3d3d57`; 녹색 +16 표시와 채운 박수 아이콘 |
| 선택 유지 | `sc_e3b85b46c655483eb954e6f953d0b7f6`; +16 배지 없이 채운 아이콘 |
| 검토일·크기 | 2026-11-18 KST; 원본 1179×2556 px, 보관 MCP 메타데이터 390×844 |

나란히 비교 HTML (저장소 보관본 없음: `evidence/goal7/COMPARISON.html`) · 실제 비교 캡처 (저장소 보관본 없음: `evidence/goal7/comparison.png`). HTML은 원본을 가로 390px로 비율 유지 축소하며 원본 파일을 수정하거나 잘라내지 않았다. 자체 캡처는 390×844 CSS px이다. 서로 다른 콘텐츠·플랫폼 조건이므로 픽셀 차이 점수는 산출하지 않았다.

| 관점 | 원본 관찰 | 구현·차이 |
| --- | --- | --- |
| 배치 | 흰 바탕의 하단 반응 영역, 얇은 위 구분선, 왼쪽 아이콘·수치 | 상세 ScrollView 밖에 바를 두어 스크롤 중에도 접근 가능; 정상 높이 약 56px, 실패 시 안내만큼 높이 증가 |
| 여백 | 화면 왼쪽 약 24 논리 단위 지점의 반응 영역으로 관찰 | 좌우 24px, 아이콘과 수치 간격 8px, 48px 이상 터치 영역; DOM 실측 55.09×48px |
| 아이콘·선택 | 윤곽 박수 → 검게 채운 박수 | 자체 24px 하트 윤곽 → 채움과 ‘좋아요 취소’; 원본과 다른 단일 반응 의미를 드러냄 |
| 수치·피드백 | 축약값 18K, 일시적 +16 배지 | 정확한 예시 정수, 14/22px 수치, 13/20px 상태 문구; 다중 누적 배지·애니메이션 없음 |
| 목록 | 이번 원본은 상세 반응 참고 | 홈·검색에는 기존 카드 하단에 같은 조작 추가; 기존 정보 위계·본문·썸네일 배치는 유지 |
| 화면 차이 | iOS 상태 표시줄·홈 인디케이터와 여러 행동 | 브라우저에는 OS inset이 없으며 댓글·북마크·공유·듣기·Follow 등 미구현 버튼을 추가하지 않음 |
| 자체 요소 | 영문 기사·사진 | 한글·자체 삽화·사실 요약·AI 해석·4단계 설명을 유지; 기존 화면 전체를 교체하지 않음 |

Safe Area는 상세 화면 바깥 `SafeAreaView`가 소유한다. 반응 바에 bottom inset을 다시 더하지 않고 ScrollView와 형제로 배치하여 본문 마지막 문단이 가려지지 않도록 했다. 오류 문구와 상태 문구는 고정 높이 없이 줄바꿈한다. 카드 이동 버튼 안에 좋아요 버튼을 중첩하지 않았다.

Native는 `togglebutton`과 `checked/busy/disabled`, 웹은 `button`과 `aria-pressed/aria-busy/aria-disabled`를 사용한다. 기사 제목·수치·선택·처리 상태는 동일 snapshot에서 접근성 이름을 만든다. 상태 문구의 polite 안내와 오류 alert를 제공한다. [RN 0.86 접근성 기준](https://reactnative.dev/docs/0.86/accessibility)을 대조했으며 VoiceOver·TalkBack 실제 발화는 검증하지 못했다.

## 검증 결과

| 검사 | 결과·한계 |
| --- | --- |
| `npm.cmd run check` | 통과: TypeScript, ESLint 경고 0, Jest 32 suites / 194건 통과 |
| 테스트 범위 | 기존 67 + 새 30 = 97개 논리 테스트를 iOS·Android Jest에서 각각 실행; 네이티브 런타임 실행이 아님 |
| 상태·공급부 | 중복 등록/해제, 0 경계, 마지막 의도, 직렬화, 실패 복구·재시도 연타, 동기 예외, 잘못된 identity/수치, 오래된 조회 성공·실패, 구독 종료 후 완료, 다른 기사 독립 처리 |
| 컴포넌트 | 두 소비자의 선택/수치/접근성 일치, 처리 중 입력 허용, 조회·쓰기 실패/재시도, 공급부 교체 뒤 늦은 쓰기 성공·실패 격리, StrictMode·재진입 |
| 실제 navigation 포함 테스트 | 홈 처리 중 상세 진입 → 해제 → 홈 복귀, 검색→상세→검색→홈 상태 일치, 상세 이탈 후 실패·목록에서 재시도 |
| `npm.cmd run export:android` | 통과: 989 modules, JS/Hermes 약 2.2MB, `dist/android` |
| `npm.cmd run export:ios` | 통과: 994 modules, JS/Hermes 약 2.2MB, `dist/ios` |
| PC 브라우저 | Chrome 158.0.8127.36 headless/CDP 실제 렌더·클릭, 1365×900; 등록·해제·실패 복구·재시도·홈/검색/상세 복귀 일치 |
| 지연·실패 브라우저 | `normal/write-error/unlike-error/read-error/slow` 5개 모의 시나리오 통과; 늦은 조회 응답 경합은 Promise 제어 자동 테스트로 확인 |
| 모바일 폭 | 390×844·320×740 실제 브라우저 캡처 확인; 가로 넘침 없음, 마지막 문단이 반응 바 위에 보임 |
| 큰 글자 보조 확인 | 320px 브라우저에서 텍스트 CSS 크기/행간 2배로 하단 조작 접근과 가로 넘침 확인; OS Dynamic Type·RN fontScale 실기기 검증을 대신하지 않음 |
| 콘솔·외부 요청 | 5개 시나리오에서 JS/콘솔 오류 0, 앱의 외부 HTTP 요청 0; localhost 개발 요청만 관찰 |
| 코드 검토 | 자기 검토 수행; 독립 리뷰는 미실시 |
| 변경 검사 | `git diff --check` 통과, 보호 문서 해시·참고 파일 변경 여부 확인 |

브라우저 근거: 정상 흐름 (저장소 보관본 없음: `evidence/goal7/normal-checks.json`), 등록 실패 (저장소 보관본 없음: `evidence/goal7/write-error-checks.json`), 해제 실패 (저장소 보관본 없음: `evidence/goal7/unlike-error-checks.json`), 조회 실패 (저장소 보관본 없음: `evidence/goal7/read-error-checks.json`), 연속 조작 (저장소 보관본 없음: `evidence/goal7/slow-checks.json`), 실측 (저장소 보관본 없음: `evidence/goal7/measurements.json`).

검토 중 수정한 사항:

- React Native Web의 설치된 구현은 native `accessibilityState`를 그대로 웹 상태 속성으로 변환하지 않아 웹에 명시적인 ARIA 속성을 전달했다. 수정 후 실제 DOM의 선택·처리 상태를 확인했다.
- 기존 단독 화면 테스트에 공유 Provider를 연결했다. StrictMode 효과 재실행을 확인하는 테스트는 StrictMode를 렌더 트리 최상위에 유지하여 검증 의미를 보존했다.
- RNTL 14의 `toBeChecked` matcher는 `togglebutton`을 지원하지 않아 native checked 상태와 접근성 이름·수치를 함께 검사했다. 통과를 위해 제품 role을 바꾸지 않았다.
- 기존 홈·검색·기사·4단계 설명의 전체 회귀 테스트를 통과했다. 검토 후 기능상 차단 문제는 발견하지 못했다.

## 남은 한계

- Windows 환경에 Android SDK·에뮬레이터·adb와 macOS/Xcode, 연결 기기가 없어 **실제 iOS·Android 실행, APK/AAB/IPA 빌드·설치, native 원본 비교는 미검증**이다.
- 실제 Safe Area·시스템 바, OS 글자 확대, VoiceOver/TalkBack, iOS 스와이프 복귀·Android 시스템 제스처, background/process 재생성은 미검증이다. 브라우저와 Jest의 native 대역을 해당 증거로 사용하지 않는다.
- 모의 데이터만 변경한다. 실제 서버 권한·집계·영속성·다중 사용자·결과 불명 복구는 후속 API 계약과 검증이 필요하다.
- 기존 의존성 audit 경고는 이번에 변경하거나 재검사하지 않았다. 패키지를 추가하지 않았다.
- Goal 8 이후는 미착수다. 원본 전체 UX/UI 교체와 후속 기능을 이번 완료 범위에 포함하지 않는다.
