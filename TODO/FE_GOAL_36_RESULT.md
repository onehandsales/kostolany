# Goal36 — 글쓰기 편집기·텍스트 서식

2026-11-20 KST · Windows · Goal34 커밋 `d05ca45478187a71148de3b12a55e6083263919c` 이후 Goal35와 함께 작업했다.

상태: **구현 완료·검증 잔여**. 두 차례 자체 검토와 후속 시각/입력 경계 수정을 수행했다. 실제 native 입력·OS IME·원본 동일 재현은 잔여다. Goal35·36을 함께 로컬 커밋한 뒤 종료하며 push·배포·Goal37 이후는 진행하지 않는다.

## 구현·흐름별 상태

| 대상 | 구현·검증 |
| --- | --- |
| Home/Explore/Profile → Write | 안내 전용 버튼을 실제 root Editor route에 연결했다. 비로그인은 기존 로그인 닫기/사용자 취소/실패/재시도를 따른다. 성공 후 원래 화면에서 Write를 다시 눌러야 한다. 기존 검색 입력 중에는 원래 정책대로 Write 버튼을 숨긴다. |
| 제목/본문 | 실제 제목 TextInput과 본문 입력/선택을 사용한다. 제목은 길이에 따라 높이가 늘어난다. web은 contenteditable/Selection, native는 multiline TextInput의 attributed Text 자식을 공통 모델에 연결했다. |
| 문단 서식 | 본문 헤더→소제목→일반, 인용→중앙 인용→일반, 글머리→번호 목록→일반, 구분선과 코드 블록을 적용한다. 여러 문단 선택, 목록 줄바꿈/빈 항목 종료를 지원한다. |
| 인라인 서식 | 선택 또는 커서의 굵기/기울임을 문서 범위에 적용한다. 링크는 선택 범위를 보존한 별도 입력 창에서 취소/검증 오류/적용/제거한다. web Ctrl/Cmd+B·I와 실제 마우스 선택을 확인했다. |
| 붙여넣기/조합 | web은 text/plain만 받아 HTML을 실행하지 않는다. 드롭도 현재 선택에 일반 텍스트만 삽입하며 파일/HTML은 받아 실행하지 않는다. 조합 중 서식 도구를 비활성화하고 DOM 재구성을 미룬다. 합성 composition 검사는 실제 한글 OS IME 검사가 아니다. |
| 뒤로/닫기 | 내용이 있으면 Keep writing/Discard를 확인한다. 취소 시 제목/본문/서식을 유지한다. 버리면 원래 탭으로 돌아가며 재진입은 빈 문서다. 실제 root navigation을 사용했다. |
| 계정/공급부/수명 | A→B→A와 동일 A 재로그인은 이전 편집 화면/링크 초안/오류를 즉시 숨기고 폐기한다. 프로필/기본 설정의 늦은 조회와 다른 기능의 공급부 교체는 같은 계정의 편집 내용을 초기화하지 않는다. unmount/새 앱 수명에서는 내용을 폐기한다. |
| 후속 진입 | 원본의 더보기/Next/@/이미지 위치는 기존 지원 전 안내로만 연결했다. 초안 저장/재개·멘션·이미지/Camera/Unsplash·발행을 구현한 것으로 기록하지 않는다. |

## 문서·선택·권한 계약

- Editor route의 `ownerId`와 인증 `revision`은 화면 소유권이다. 일치하지 않는 render에서는 개인 내용을 반환하지 않고 route를 닫는다. 계정 변경으로 폐기되는 화면은 이탈 확인 때문에 남지 않는다. 프로필 이름/기본 설명 수준은 revision 식별자에 넣지 않았다.
- `EditorDocument`는 `schemaVersion:1`, `title`, `body`, 줄별 `blocks`, 인라인 `marks`를 갖는다. `body`는 LF 기준 문자열이고 선택과 mark 위치는 RN/DOM과 같은 UTF-16 offset이다. 이모지/한글 범위, CRLF 정규화, 여러 문단 대체/삭제를 검사했다.
- `EditorValue.selection`은 순서가 정규화된 start/end이며 같은 값은 커서다. `typing`은 앞으로 입력할 서식이다. 화면은 입력 대상(title/body), 실제 focus, composition, 링크 초안을 따로 관리한다. 커서 서식 토글은 기존 문서 내용을 바꾸지 않으며 새 입력에만 적용한다.
- 목록 입력 표현은 `• ` 또는 번호 접두부를 포함한다. `editorOutput`은 접두부를 제외한 의미 블록과 텍스트/서식 조각을 반환한다. 사용자가 접두부를 직접 삭제하면 일반 문단으로 바뀐다. 구분선은 입력 위치 계산용 `· · ·` 줄이며 출력은 본문 없는 divider다.
- `editorOutput(document)`의 출력은 `{schemaVersion, title, blocks:[{type, content:[{text, formats}]}]}`이다. 이미지·멘션·초안 식별자·발행 상태·저장 시각은 아직 없다. 후속 기능은 이 계약을 명시적으로 확장해야 하며 UI의 DOM/선택/포커스를 저장 데이터로 사용하지 않는다.
- 링크는 공백/제어 문자·자격 증명 포함 URL을 거절하고 http/https만 정규화한다. 프로토콜 없는 주소는 https 기본안이다. 입력 오류에서도 URL과 원래 선택을 보존한다. 편집 중 링크를 누르는 동작은 외부 이동을 실행하지 않는다.
- 편집 문서는 화면 로컬 메모리다. 개인 저장소/별도 전역 상태/백엔드 요청/자동 저장은 없다. 따라서 원격 편집 성공/실패 응답이나 제출 중복 집계는 이 Goal에 존재하지 않는다. 인증 비동기·계정 경계는 기존 인증 store와 실제 navigation 검사를 사용한다.
- 다른 기능의 source 교체가 현재 편집기를 초기화해야 한다고 임의로 가정하지 않았다. 편집기는 그런 source의 데이터를 소유하지 않는다. 늦은 프로필/설정 응답, bookmark source 교체 후 현재 편집/안내 보존을 확인했고 앱 unmount 후 새 실행에서는 폐기했다.
- 새 라이브러리·의존성·lockfile 변경은 없다. 공통 모델과 두 플랫폼 입력 어댑터로 이번 텍스트 범위를 구현했다. 플랫폼별 rich text 입력 동작이 동일하다는 보장은 실제 native 검증 전에는 하지 않는다.

## 원본·공식 설명·자체 보완

`medium/README.md`, `REVIEW_R2.md`, `SOURCES.md`, F05·08·09·10·11 관련 분석과 실제 PNG20개를 확인했다. 보관본 catalog version1419이며 실제 제품 빌드/OS/DPR은 미확인이다.

| 분류 | 근거와 적용 |
| --- | --- |
| 관찰 | F08 `sc_397cb0f05ba54659adac7376f29512dd` 빈 편집기·Close/더보기/Next·Tt 등 도구, `sc_4db886af7d024100a72b9e02fa3c1ee8` 실제 제목/본문·커서·키보드, `sc_bed3857c8edc4a02b07af1e095ad7fba` 키보드 닫힌 상태를 확인했다. |
| 관찰 | F09 `sc_24b381a199374acb8d2a6a516052c9a7` Tt 활성/본문 형태 변화, `sc_e5826f356093493a86c19716420e8fdf` 왼쪽 선/기울임 인용, `sc_1b0cd82ee04a4c8c9d52b9a2d088823b` 글머리 들여쓰기, `sc_19b2bef0854047f5b17cfeca07781ca5` 가운데 점 구분선과 하단 도구를 대조했다. |
| 관찰·제외 | 이미지·발행 미리보기/발행·Drafts·@후보는 F08/10/11에 있지만 Goal37 이후다. 원본의 빈 Next가 녹색이라는 사실을 빈 문서 발행 허용 정책으로 해석하지 않았다. |
| 공식 설명 | 2026-11-20 조회한 [Using the story editor](https://help.medium.com/hc/en-us/articles/215194537-Using-the-story-editor)는 선택 강조/링크, 모바일 헤더/인용 순환과 목록을 설명한다. [Using code blocks and inline code](https://help.medium.com/hc/en-us/articles/35756844492439-Using-code-blocks-and-inline-code)는 모바일 {} 코드 블록을 설명한다. 현재 문서는 보관본과 같은 버전의 UI 증거가 아니다. |
| 기술 근거 | 설치 버전과 맞는 [RN0.86 TextInput](https://reactnative.dev/docs/0.86/textinput), 로컬 RN0.86.3의 multiline 자식 처리, [DOM Selection](https://developer.mozilla.org/en-US/docs/Web/API/Selection)을 확인했다. 최신 RN 문서의 버전을 그대로 적용하지 않았다. |
| 추가 검색 | Gummble `writing editor code formatting bold italic hyperlink selected text`는 관련성이 낮은 프로필/기타/비공개 화면을 반환했다. 보관본에 없는 선택 서식 메뉴·코드 실행 결과를 추가 확보했다고 주장하지 않는다. |
| 자체 보완 | B/I/링크 보조 도구 행, 링크 입력/검증 오류, 중앙 인용 표시, 번호 목록, 코드의 단색 고정폭 표현, 이탈 확인, 일반 텍스트 붙여넣기/드롭과48px 조작 영역은 이번 mock 기본안이다. |
| 미수록·잔여 | 원본 코드 도구 실행 뒤 UI·언어 선택·구문 강조·전체 지원 서식·플랫폼별 선택 메뉴·저장 정책은 미수록이다. 자동 Markdown 단축키·inline code 전체·편집 undo/redo 이력·발행/초안 영속 저장을 구현했다고 주장하지 않는다. |

## 두 차례 자체 검토·결함과 회귀

같은 작업자의 자체 검토이며 독립 제3자 검토가 아니다.

| 검토 | 재현·원인 → 수정·검증 |
| --- | --- |
| 1차 문서/선택 | 연속 줄바꿈 가운데 Enter를 입력하면 공통 접두부 diff가 뒤쪽 삽입으로 해석했다 → 현재 선택과 일치하는 편집을 우선 적용, 번호 목록/커서 회귀 검사. |
| 1차 계약 | 링크와 텍스트/서식 구간, 제목/본문 분리, 계정 route 권한, 이탈 정책을 검토했다 → 위험 URL 거절·정규화·범위 분할/유지·실제 navigation 검사. |
| 1차 검사 준비 | 테스트의 잘못된 문자열 offset, 이전 matcher/탭/재시도 label 때문에 초기 검사가 실패했다 → 현재 API/실제 화면 label과 범위를 사용했다. 제품 검증을 완화하지 않았다. |
| 2차 web 접근성 | RN의 selected 상태만으로 web button의 토글 상태가 노출되지 않았다 → aria-pressed를 추가하고 실제 DOM과 native 접근성 상태를 확인했다. |
| 2차 선택 수명 | 선택만 바뀌어도 DOM을 다시 그리면 마우스 드래그 중 노드가 교체될 수 있었다 → 문서/명시적 focus 요청 때만 재구성, 실제 마우스로 Music 선택과 Ctrl+B 확인. 렌더 중 ref 갱신 lint 오류도 layout effect로 수정했다. |
| 2차 서식 전환 | 헤더 상태에서 인용 버튼을 처음 누르면 일반 문단이 되었다 → 다른 서식 계열에서 첫 적용 상태로 진입, navigation 회귀 검사. |
| 2차 키보드/모달 | contenteditable은 RN Keyboard.dismiss만으로 blur되지 않았다. fade가 끝나기 전 Escape가 무시되었다 → 입력 어댑터의 명시적 blur 요청, 즉시 열리는 링크 창, 취소 후 다음 프레임 선택/포커스 복원. 실제 Escape/키보드 닫기 검사. |
| 2차 작은 화면 | 긴 본문에서 horizontal ScrollView의 flexShrink 때문에 툴바가 약8px로 눌리고48px 버튼이 화면 밖으로 나갔다 → 본문 flex 공간과 툴바 고정 높이/축소 금지,320×600 경계 회귀 확인. |
| 2차 원본 대조 | 글머리의 다음 줄이 왼쪽으로 돌아오고 구분선 점 간격이 좁았다 → web의 실제 입력 마커를 유지한 들여쓰기/내어쓰기와 점 간격을 조정했다. 원본5쌍을 다시 생성했다. |
| 2차 후속 일관성 | 목록 접두부를 지워도 목록 도구가 계속 활성일 수 있었다 → 입력 표현과 의미 블록을 함께 일반 문단으로 전환, 모델 회귀 검사. |
| 2차 후속 포커스 표시 | 빈 제목의 browser 기본 테두리가 원본에 없고 제목에 포커스해도 이전 본문 서식이 활성으로 보일 수 있었다 → 테두리를 제거하고 제목/본문 대상에 맞춘 활성 상태, navigation 회귀·실제 캡처 재검사. |

## 실제 검사 기록

외부 임시 경로 `T`=`C:\Users\leehg\AppData\Local\Temp\kostolany-goals34-36-b11d473b813d478ba686fbd6af467413`. Node24.18.0/npm10.9.0, 기존8081 PID5248을 보존했다. 임시 산출물의 영구 보관은 보장하지 않는다.

- `FE`의 전체 `npm run check` 성공: `tsc --noEmit`, `eslint . --max-warnings=0`, **168suites/1014tests 통과·실패0·skip0**,653.522초(`goal36-check-verified.log`). 이 실행 동안 제품 코드/테스트를 수정하지 않았다. 일부 기존 검사에 React act 경고가 있으며 브라우저 console/page 오류와 구분한다.
- 전체 검사 종료 후 `StoryEditorScreen`의 제목 outline/입력 대상별 활성 표시와 기존 navigation 시나리오의 해당 단언만 수정했다. **최종 코드**에서 `npm run typecheck`, `npm run lint`, `npm test -- --watch=false --runTestsByPath src/app/navigation/EditorNavigation.test.tsx` 모두 통과: **2suites/10tests**,28.78초(`goal36-post-types.log`, `goal36-post-lint.log`, `goal36-post-navigation.log`). 168/1014를 이 두 표시 수정 이후의 전체 재실행이라고 표현하지 않는다. 문서 확정 외 추가 코드 변경은 없다.
- `editorModel.test.ts`는 한글/이모지·부분 서식 해제·커서 서식·문단 경계·목록/빈 줄 종료·구분선·링크 안전성·긴 본문/붙여넣기/출력 계약을 검증한다.
- `EditorNavigation.test.tsx`는 실제 AppNavigator/React Navigation으로 홈·탐색·프로필 진입/복귀, 로그인 닫기/취소/실패/재시도, 제목/선택 서식/링크/이탈, 계정과 공유 공급부/앱 수명을 검증한다. navigation을 mock으로 바꾸지 않았다. native 모듈 대역은 실제 native 실행과 다르다.
- 초기 `goal36-initial.log`는10실패/12통과였다. 테스트 준비 오류와 반복 줄바꿈 결함을 수정해 `goal36-review1.log` 4suites/22tests 통과(22.973초). 중간 lint의 render 중 ref 접근 오류도 수정했다.
- 추가 수명 검사는 먼저 설정 조회 화면을 방문해야 하는 준비 오류와, 다른 기능 source 교체를 편집기 폐기로 잘못 기대한 테스트를 바로잡았다. `goal36-review2-verified.log` 4suites/24tests 통과(21.609초), 후속 모달/마커 검사 `goal36-review2-ui.log` 4suites/24tests 통과(20.143초). 이 수치를 최종 코드 전체 검사로 대신하지 않는다.
- 원본 대조 중 마지막 들여쓰기/구분선 수정이 필요해 첫 전체 실행 `goal36-check-final.log`를 자기 검사 프로세스 트리만 확인하고 중단했다. 통과 기록으로 집계하지 않는다. 이후 수정된 코드에서 `goal36-check-verified.log`로 전체 검사를 새로 시작했다.
- export 최초 시도는 외부 로그 경로 오타로 실행 전에 종료되었고 경로를 고쳐 재실행했다. 전체 검사 기준의 `goal36-export-verified.log` 성공 후 마지막 표시 수정까지 포함한 `npx expo export --platform all --output-dir T\export36-post`도 성공했다(`goal36-post-export.log`). web JS 및 iOS/Android Hermes .hbc 생성이지 native build/run은 아니다.
- `browser36.py`: 실제8081의 **8흐름 그룹**(로그인 후 명시 재진입, 선택/링크, 문단 도구, 여러 문단/이탈, 일반 텍스트 붙여넣기/합성 조합,100문단/320px/CSS확대, A/B/A·동일 A,Reload) 통과, console/page 오류0. 스크립트 문자열 줄바꿈 오류는 외부 시나리오를 수정했다.
- `visual36.py`: 실제 로그인 사용자 취소/실패/재시도, Dark 테마, 실제 마우스 드래그 선택, Ctrl+B, 링크 창 Escape/본문 focus 복원, 키보드 닫기, 작은 화면 도구 영역의 **3흐름 그룹** 통과, console/page 오류0. `reference36.py`는 인라인 서식 없는 동일 본문으로5개 비교 캡처를 만들었으며 오류0이다.
- 마지막 표시 수정 후 `visual36.py` 3흐름과 `reference36.py`의 제목 outline0/헤더 활성 상태/5캡처를 다시 확인하고 비교물을 재생성했다. 기본8흐름은 그 직전 문서/입력 로직 기준이고 최종 포커스 변경의 실제 브라우저 영향 검사를 별도로 구분한다.

## 원본 시각 대조

원본1179×2556을393×852로 축소하고 y59..818을 잘라393×759로 비교했다. 실제 Edge393×759,DPR1,en-US,light의 `reference-empty36/paragraph36/quote36/bullet36/divider36`를 사용했다. `T`의 각 `*-pair.png`, `*-overlay.png`, `*-diff.png`를 생성하고 직접 확인했다. Overlay는50% 합성, diff는 절대 차이며 임의 일치율을 계산하지 않았다.

- 실제 제목 입력 x18,y69,w357,h76, 본문 x18,y156,w357이다. 일반 본문 기준 원본 제목 glyph 상단 약75/구현77, 본문 약163/구현164로 근접했지만 글꼴/굵기 차이가 남는다. 원본 첫 줄은 quite까지, 구현은 the까지여서 이후 줄바꿈이 다르다.
- 원본 상단 구분선은 crop 기준 약39px, 구현은48px 부근이다. 48px 터치 영역을 유지하며 내용 여백을 조정했다. 원본 폰트/벡터를 확보하지 못했고 Tt/인용/목록/코드/이미지 도구는 근사 문자 아이콘이다.
- web 인용선의 x0과 목록의 본문 들여쓰기를 원본에 맞추었다. 인용/목록의 제목과 본문 사이 여백·행 높이/구분선 위치에는 차이가 남는다. 코드의 실행 후 원본은 없어 현재 단색 코드 화면을 동일 재현이라고 기록하지 않는다.
- 원본의 실제 iOS 키보드는 하단 영역을 차지하지만 Edge 데스크톱에는 OS 키보드가 없다. 소프트웨어 키보드 모양을 가짜로 넣지 않았다. 실제 툴바 x9,y710.5,w48,h48이며320×600에서는 y551.5..599.5 안에 들어간다. 본문 focus 중 B/I/링크/키보드 닫기 보조 행은 자체 보완이다.
- 원본의 삽입 이미지/선택 테두리/삭제 X는 Goal37 범위이므로 이번 캡처에 넣지 않았다. Playwright 캡처의 기본 caret 숨김 때문에 원본의 파란 입력 커서와도 다르다. 실제 input focus/선택은 별도 조작으로 확인했다.
- native는 TextInput의 글자 크기/굵기/기울임/고정폭/링크 밑줄을 연결했지만 web의 인용선·중앙 인용/구분선 정렬·목록 내어쓰기와 같은 문단 장식의 native 동일 재현은 미완료다. 실제 플랫폼 검증 없이 이 차이를 숨기지 않는다.

## 플랫폼과 남은 검증

| 구분 | 결과/한계 |
| --- | --- |
| 자동 | 전체168suites/1014tests 및 이후 표시 수정의 타입/lint·2suites/10tests 통과. 코드 기준은 위 실행 기록대로 구분하며 실제 OS 실행이 아니다. |
| web | 실제8081 조작·선택·키 입력·포커스·모달·계정·320px·긴 제목/100문단·Dark 테마를 확인했다. 합성 composition/clipboard 이벤트와 CSS160% 확대는 OS IME/접근성 검사가 아니다. |
| JS/Hermes | 마지막 표시 수정까지 포함해 web JS와 iOS/Android .hbc export 성공. native build/run과 분리한다. |
| iOS native | Windows에서 Xcode/xcodebuild가 없고 FE/ios 프로젝트도 없다. macOS/Xcode·시뮬레이터/기기에서 rich TextInput 선택·문단 장식·한글 조합·키보드/Safe Area/VoiceOver를 확인해야 한다. |
| Android native | Java/JDK·Gradle·Android SDK/adb·FE/android 프로젝트가 없다. 해당 도구와 에뮬레이터/기기에서 multiline attributed text·IME/Back/키보드 가림/TalkBack을 확인해야 한다. |

정상 기본 mock 설정은 유지했고 장애/계정 전환은 테스트 source 또는 브라우저 메모리에서만 제어했다. ENV·medium 원본·기존8081·사용자 변경을 보존했다. 저장소 안에 TODO/evidence·TODO/_evidence·비교 HTML·로그·검증 스크립트·캡처를 추가하지 않았다.

## 8081 최종 확인 순서

1. Home → Write → 로그인 닫기, 모의 사용자 취소/실패/재시도를 확인한다. 성공 후 Write를 다시 눌러 빈 편집기를 연다.
2. 제목과 한국어 여러 문단을 입력한다. 본문을 선택하고 B/I/링크를 적용한다. 잘못된 URL의 입력 보존, Cancel/Done/Remove link를 확인한다.
3. Tt·인용·목록을 반복해 형식을 순환한다. 목록에서 Enter와 빈 항목 Enter, 마커 삭제를 확인한다. 구분선과 {} 코드 도구를 적용한다.
4. 여러 문단을 드래그 선택하고 서식/일반 텍스트 붙여넣기를 확인한다. 키보드 닫기·긴 문서 스크롤·320px·Dark 테마에서도 도구에 접근한다.
5. Close → Keep writing → Close → Discard 후 원래 홈/탐색/프로필로 돌아간다. 다시 Write를 누르면 빈 문서다. 더보기/Next/@/이미지는 지원 전 안내이며 저장/발행하지 않는다.
6. A/B/A와 동일 A 재로그인, 전체 Reload 후 이전 작성 내용이 남지 않는지 확인한다. 편집 중 계정 전환 경합은 결과의 제어 source/browser 시나리오로 재현한다.

## 최종 확정

Goal34는 `d05ca45478187a71148de3b12a55e6083263919c`에 Digest/Library 코드·테스트·문서17개를 로컬 커밋했다. Goal35·36의 다운로드/편집기 코드·navigation/모델 회귀 검사·결과/현재 상태 문서는 두 번째 묶음 로컬 커밋 범위다. 그 해시는 최종 응답과 Git log에서 확인한다. ENV·원본·임시 산출물·무관한 사용자 변경은 포함하지 않는다.

기능 구현, 자동 검사, 원본 시각 대조, 실제 native 실행을 구분한다. 세 Goal은 **구현 완료·검증 잔여**이며 원본 폰트/문단 장식 차이·실제 native/OS IME는 남는다. 다운로드는 메모리 사본이고 편집 내용도 화면 수명뿐이다. 실제 서비스 연동/출시 완료가 아니며 두 번째 로컬 커밋 후 종료한다. push·배포·Goal37 이후 개발은 수행하지 않는다.
