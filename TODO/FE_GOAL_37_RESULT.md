# Goal37 — 글쓰기 이미지·Camera·Library·Unsplash

2026-11-20 KST · Windows · 시작 HEAD `66f1041cf1993fe379ecd8cbef452a113d14a55a` · 시작 작업 트리 변경 없음.

상태: **구현 완료·검증 잔여**. local/mock 범위의 구현과 두 차례 자체 검토를 수행했다. 원본 동일 재현·실제 native 검증 및 실제 OS picker 구현은 아래 구분대로 남는다. 승인 범위는 Goal37→38→39→40이며 각 Goal별 로컬 커밋 후 다음 Goal을 진행한다. push·배포·Goal41 이후는 제외한다. 이전 Goal36의 전체168suites/1014tests와 후속2suites/10tests는 당시 코드의 검사로만 확인했다.

## 구현과 사용자 흐름

| 흐름 | 구현·검증 |
| --- | --- |
| Write → 이미지 메뉴 | 기존 실제 Editor route에서 Take photo / Choose from library / Search photos on Unsplash / Cancel을 연결했다. 제목·본문·서식은 유지한다. |
| Camera / Library | 로컬 fixture 선택기와 권한 허용/제한/거절/취소 계약을 구현했다. 실제 OS 카메라·사진 선택기 호출은 미구현이며 이번 mock 선택 검사를 native picker 검사로 기록하지 않는다. |
| Unsplash | 로컬 예시임을 표시한 검색·2열 목록·빈 결과·로딩·오류·동일 검색 재시도·선택을 연결했다. 실제 Unsplash API를 호출하지 않는다. |
| 선택 → 문서 삽입 | 선택한 문단 끝에 이미지 블록과 뒤의 입력 영역을 추가한다. 제목·본문·앞뒤 서식·이미지 순서가 문서와 출력에 들어간다. 이미지 선택 후 삭제 X는 해당 블록만 제거한다. |
| 실패·취소 | 삽입 실패는 선택 자산을 보존하고 재시도한다. 처리 중 X/이탈/문서 변경/계정 변경/공급부 교체는 늦은 완료를 무시하고 자산 lease를 해제한다. 이미지 표시 실패에도 다시 시도할 수 있다. |
| 복귀·계정 | Goal37 시점에는 기존 Keep writing/Discard 정책을 유지한다. A→B→A·동일 A 재로그인·새 앱 수명에서 이전 문서/시트/오류를 폐기한다. 초안 저장은 Goal38 담당이다. |

## 문서·자산·비동기 계약

- `EditorDocument.schemaVersion`을2로 확장했다. `version`은 문서 변경 세대이며 `title/body/blocks/marks`를 유지하고 `images`를 추가했다. 이전v1은 화면 메모리만 존재했으므로 영속 데이터 migration 대상은 없다.
- 본문은 기존 LF/UTF-16 위치 체계를 유지한다. 이미지의 내부 위치 표식은 독립 줄의 U+FFFC이며 `id/offset/assetId/source/description/credit/width/height`를 저장한다. 출력은 같은 순서의 `type:'image'` 블록과 메타데이터를 반환한다. 임의 HTML·외부 스크립트는 저장·실행하지 않는다.
- 삽입 위치는 현재 선택 마지막 문단의 끝이다. 텍스트 선택을 이미지로 대체하지 않는다. 문서와 선택/커서/앞으로 입력할 서식은 별도 상태다. 이미지 앞뒤 입력 구간은 공통 문서로 병합해 다른 구간의 서식·이미지를 보존한다.
- 선택기 내부 검색어·검색 결과·권한과 확정 문서의 이미지를 구분한다. 삽입 작업은 `image-{authRevision}-{sequence}`와 당시 문서 객체/버전·공급부·사용자·인증 revision에 묶인다. 중복 실행은 진행 작업 참조로 차단하고 같은 삽입 ID를 재적용해도 중복 블록을 만들지 않는다.
- 검색은 입력 원문을 보존하고 조회에서만 공백/NFC/소문자를 정규화한다. 검색어 변경 시 이전 결과를 즉시 숨기며180ms debounce·AbortSignal·응답 수명 검사를 적용한다. 목록 기본 조회/권한은180ms, 준비는360ms의 mock 기본 지연이다.
- `EditorImageSource`는 `search/requestAccess/prepare/resolve` 경계다. `prepare` 결과의 자산 ID·유한 양수 크기·렌더 가능한 자산을 검증한다. 성공/실패 응답 적용 전 실제 인증 store의 현재 사용자·revision을 다시 확인한다.
- 준비된 `ImageLease.release`는 취소·늦은 응답·블록 삭제·화면 이탈/공급부 교체에 호출한다. 현재 자산은 기존 번들 PNG4개이며 임시 URI/object URL·업로드·파일 생성이 없다. 따라서 release는 번들 원본을 삭제하지 않는다. 미래 파일/URL adapter를 이미 구현했다고 주장하지 않는다.
- 새 의존성·전역 저장소·ENV 변경은 없다. 프로필 이름·기본 설명 수준은 인증 revision에 포함하지 않으며 기존 개인 데이터 정책을 변경하지 않았다.

## 원본과 근거의 구분

`medium/README.md`, `REVIEW_R2.md`, `SOURCES.md`, F08 Publishing a story와 F09 Changing text format 분석 및 F08 실제 이미지 메뉴/선택/삽입 PNG4장·F09 PNG5장을 확인했다. 비교 기준은 보관본 catalog1419이며 현재 제품 빌드·OS·DPR로 해석하지 않는다.

| 분류 | 근거·차이 |
| --- | --- |
| 관찰 | F08 `sc_c609f8fa87b84b76bea6f312df2e3e0f`: 하단4행 메뉴, `sc_785431954ec4405eb0a3b22debce165a`: Unsplash 검색/2열 사진/크레딧, `sc_ae30c2a2ca504522b03f98f11d59c429`: 어두운 사진/스피너/녹색 테두리/X, `sc_bed3857c8edc4a02b07af1e095ad7fba`: 삽입 사진/키보드 숨김. |
| 공식 설명 | 2026-11-20 확인한 [Using images](https://help.medium.com/hc/en-us/articles/215679797-Using-images)와 [Using the story editor](https://help.medium.com/hc/en-us/articles/215194537-Using-the-story-editor)는 이미지 삽입·선택·삭제·alt 설명을 제공한다. 현재 웹 중심 설명을 보관 iOS의 권한/메뉴 픽셀 증거로 사용하지 않는다. |
| 추가 조사 | Gummble의 `Medium story editor Unsplash image library camera permissions` 검색은 정확 일치0·완화 결과3건이었다. 권한/취소 화면을 추가 확보했다고 판단하지 않았다. 프로필 S113은 편집기 OS 선택기와 동일하다는 근거가 아니다. |
| 자체 보완 | fixture 출처 안내, Camera/Library 모의 선택, 빈 결과/권한/오류/재시도,48px 삭제·검색 영역, 소스 변경 Back을 추가했다. 원본의 사진·작가 이름은 실제 Unsplash 결과로 복제하지 않았다. |
| 미수록·제외 | 실제 촬영/OS 권한·제한 사진 선택·원격 검색 실패 UI, 이미지 로딩이 업로드인지 다운로드인지, 원본 폰트/벡터·전체 사진 데이터는 미확인이다. 실제 업로드/Storage/Unsplash API·초안 저장·발행은 미연동/후속 범위다. |

## 두 차례 자체 검토와 수정

같은 작업자의 자체 검토이며 제3자 독립 검토가 아니다.

| 차수 | 재현·원인 → 수정·검증 |
| --- | --- |
| 1차 모델/수명 | 문서에 그림을 단순 덧붙이면 이후 편집/출력 위치와 삭제가 분리될 위험 → UTF-16 이미지 위치·분할 입력/병합·출력·중복 ID·앞뒤 서식 회귀 검사를 추가했다. |
| 1차 공급부 | 준비 응답이 다른 assetId나 잘못된 크기여도 삽입할 수 있었다 → identity/크기/표시 가능 검증·lease 해제·재시도 회귀를 추가했다. |
| 1차 복구 | 이미지 decode 실패에 복구 UI가 없었다 → 오류/재시도와 삭제/이탈 시 자원 해제 검사를 추가했다. |
| 2차 입력 | 분할 구간 객체의 매번 생성으로 web DOM을 선택 중 재구성할 위험 → 문서 version과 명시적 focus 요청에만 DOM을 재구성하도록 했다. 기존 선택/서식 navigation과 실제 브라우저 입력을 확인했다. |
| 2차 시각 | RN Web Image가 자산의 원래 높이168px를 적용해357px 본문에서 사진이 작게 보였다 → 명시적 자동 높이/비율을 적용,357×249.89px 표시를 확인했다. 선택기 서체·파란 버튼·시트 높이도 보정했다. |
| 2차 접근성 | 이미지 선택 버튼 안에 오류 재시도 버튼을 중첩할 수 있었다 → 오류 영역과 선택 버튼을 분리하고48px 삭제/재시도를 유지했다. |
| 2차 후속 복구 | 이미지가 선택되기 전에 decode에 실패하면 삭제 X에 접근할 수 없었다 → 실패 시 해당 블록을 선택해 재시도 없이 삭제하도록 했다. 화면 이탈 후 늦은 자산 해제도 기존 회귀 시나리오에 추가했다. |

## 실제 검사와 환경

Node24.18.0/npm10.9.0, PowerShell, Expo57.0.33/RN0.86.3/React19.2.3. 기존8081 PID5248을 보존했다. 아래 `T`는 저장소 밖 `C:\Users\leehg\AppData\Local\Temp\kostolany-goals37-40-bafd1b1de3db45efb8a382e232817076`이며 임시 산출물의 영구 보존은 보장하지 않는다.

- 초기 타입 검사에서 색상 토큰 이름, 신규 테스트의 지원하지 않는 옵션을 수정했다. lint는 구간 memoization 경고를 발견해 선택/문서 수명을 분리했다. 오류를 무시하는 설정은 추가하지 않았다.
- 관련 검사 `npm test -- --testPathPattern="editorModel|editorImages|EditorNavigation|EditorImagesNavigation|ImagePickerSheet"`: 수정 중간 코드10suites/46tests 통과(33.219초). 이후 자산 identity/표시 실패·시각 수정이 있어 이 수치를 최종 전체 검사로 쓰지 않는다.
- 첫 `npm run check`는 시각 수정 필요로 자체 검사 프로세스27588의 명령을 확인한 뒤 해당 트리만 중단했다. 성공으로 집계하지 않는다. 수정 후 `goal37-check-final.log`의 전체 타입/lint·174suites/1038tests 통과, 실패0·skip0,629.365초다. 해당 전체 실행 중 제품/테스트 코드를 수정하지 않았다. 일부 기존 React act 경고는 남고 브라우저 오류와 구분한다.
- 전체 검사 이후 `RichDocumentBody`의 실패 이미지 선택/삭제와 기존 `EditorImagesNavigation`의 관련 단언·unmount 경합만 수정했다. 이 마지막 변경은 `post37-type/lint/tests.log`와 `export37-post.log`에서 별도로 확인한다.174/1038을 이 후속 수정 이후의 전체 재실행이라고 표현하지 않는다.
- 최종 `npm run typecheck`, `npm run lint`, `npm test -- --testPathPattern="EditorImagesNavigation|editorImages"` 통과:4suites/14tests, 실패0·skip0,21.727초. 최종3플랫폼 export도 성공했다. `post37.py`의 실제 decode 실패→재시도 없이 삭제→정상 재삽입 통과, console/page 오류0이며 모의 공급부를 정상값으로 복원했다.
- `editorImages.test.ts`: 삽입/출력 순서·중복·앞뒤 편집/서식·다중 이미지 삭제. `ImagePickerSheet.test.tsx`: 검색 역전/입력 보존/재시도/빈 값·권한 거절/제한/취소·source 교체. `EditorImagesNavigation.test.tsx`: 실제 React Navigation으로 삽입/실패/편집/삭제/복귀·늦은 결과·계정/동일 계정·자산 identity/decode/해제를 검사한다. navigation 자체를 mock하지 않았다.
- `browser37.py`: 실제8081의7흐름 그룹 통과, console/page 오류0. 삽입 실패·권한·지연은 브라우저 메모리 공급부만 제어했고 마지막 Reload로 정상 기본값에 복원했다. 실제 OS 권한 검사가 아니다.
- `reference37.py`: 같은 제목/본문, 인라인 강조 없는 기준 캡처·로딩·긴80문단·320px 툴바 수평 스크롤·Escape 닫기를 확인했다. page 오류0, 원본3쌍/overlay/diff를 생성했다.
- `visual37.py`: Dark 테마·실제 마우스 드래그 선택/Ctrl+B·문단 사이 이미지 삽입·Escape를 확인했다. 합성 composition 중 이미지 도구 비활성/복구도 확인했으며 실제 OS IME 검사는 아니다. console/page 오류0이다.
- `npx expo export --platform all --output-dir T\export37`: web JS·iOS/Android Hermes export 성공(`export37.log`). 실제 native build/run은 아니다.

## 시각 비교와 남은 차이

원본1179×2556→393×852 정규화 후 y59..818의393×759 영역을 Edge393×759/DPR1/en-US/light 실제 캡처와 비교했다. `reference-menu37/picker37/inserted37`의 pair·50% overlay·절대 diff를 사용했다. 일치율은 계산하지 않았다.

- 메뉴 첫 행 x8,y519,w377,h56; 원본은 약x8,y523,w377,h57이다. 하단 여백/글꼴/굵기 차이가 남는다.
- 검색 영역 x16,y112.59,w361,h48, 첫 사진 x16,y192.59,w172.5,h120.75. 원본 검색 면은 약y67,h36, 첫 사진은 약y134다. fixture 안내·48px 조작·추가 Back과 간격으로 차이가 난다. 원본 가변 높이 사진 배열과 현재 FlatList의 행별 정렬도 다르다.
- 본문 사진 x18,y300,w357,h249.89, 삭제 X x327,y300,w48,h48. 원본 산/호수 사진은 약x18,y319,w357이며 다른 비율/원본 사진이다. fixture 내용·crop·본문 아래 간격과 서체가 다르다.
-320×600에서 툴바를 수평 스크롤하면 이미지 버튼 x272,y551.5,w48,h48로 완전히 접근한다. CSS160% 확대·합성 입력은 OS 접근성/IME 검사가 아니다.
- 삽입 대기 자산은 확정 문서 밖 임시 미리보기이며 현재 본문 아래에 표시한다. 확정 삽입은 선택 문단 끝이다. 문서 중간 선택에서 대기 미리보기의 동일 위치 재현은 잔여 시각 차이다.
- 이미지 사이의 텍스트 구간은 개별 입력 영역이다. 같은 구간의 여러 문단 선택을 유지하지만 이미지를 가로지르는 OS 연속 텍스트 선택은 지원하지 않는다. 원본의 해당 선택 정책도 미수록이다.

## 플랫폼별 결과와 잔여

| 구분 | 상태·필요 환경·영향 |
| --- | --- |
| 기능 | local/mock 선택→문서 삽입/삭제와 오류/권한/계정 경계를 구현했다. 실제 native picker 호출·촬영·임시 URI adapter는 미구현이며 실서비스 연결 상태가 아니다. |
| 자동 | 전체174suites/1038tests·타입/lint 통과 후 마지막 복구 수정의 최종 타입/lint·4suites/14tests와3플랫폼 export 통과. 각 코드 기준은 위 기록과 같다. |
| 원본 시각 |3쌍 비교·치수 보정 수행. 폰트/아이콘/사진·권한 화면·가변 높이 배열/대기 배치 동일 재현 잔여. |
| iOS native | Windows에 Xcode/xcodebuild와 FE/ios가 없다. macOS/Xcode·시뮬레이터/기기에서 이미지/키보드/Safe Area/VoiceOver·실제 OS IME 확인 필요. |
| Android native | Java/Gradle/adb·FE/android가 없다. JDK/Android SDK·에뮬레이터/기기에서 사진·IME/Back/TalkBack·TextInput 문단 장식 확인 필요. |

Goal36의 native 인용선·중앙 정렬·목록 내어쓰기 차이는 이번 이미지 연결로 해결되지 않았다. 검증 잔여와 기존 native 표현 구현 차이를 구분해 유지한다. 원본 자료와 ENV·lockfile·기존 미리보기는 보존했고 저장소 내부 evidence/캡처/로그/비교 파일은 만들지 않았다.

## 8081 최종 확인 순서

1. Home → Write → 모의 로그인 → Write를 다시 누르고 제목/본문을 입력한다.
2. 이미지 버튼 → Cancel → 다시 이미지 버튼 → Unsplash에서 `노을` 검색/없는 검색어/지우기를 확인한다.
3. 사진을 선택하고 이미지 앞뒤 본문을 편집한다. 사진을 눌러 녹색 테두리/X로 삭제한다. Camera/Library도 로컬 선택 흐름을 확인한다.
4. Close → Keep writing → Close → Discard, 다시 Write에서 빈 문서인지 확인한다.
5. A→B→A·같은 A 재로그인·Reload 시 이전 선택기/오류/문서가 남지 않는지 확인한다. 장애 경합은 결과에 적힌 제어 source/browser 시나리오로 재현한다.
6.320px/긴 한국어·긴 문서·큰 글자에서 사진/툴바/스크롤/시트 취소·Escape를 확인한다. 실제 기기 키보드·IME는 별도 실행이 필요하다.
