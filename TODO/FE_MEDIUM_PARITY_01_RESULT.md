# Parity 1 — 비교 기준 고정과 실행 단위 정리

**최신 잔여 판정 — 2026-11-24:** [Parity1~8 잔여 정리·보완·재검토](FE_MEDIUM_PARITY_01_08_REVIEW.md). 아래 수치·미커밋·미착수·시각 차이는 해당 실행 당시 기록이다. 후속 해결과 이번 보완, 원본 근거 부족/기기/제외를 최신 표에서 구분하며 과거 증거를 현재 통과로 사용하지 않는다.

2026-11-23 KST, Windows, 시작 HEAD `82968fe`, 시작 작업 트리 clean. **비교 조건·추적·실행 배정과 재사용 도구 작성 완료 / Q01의 200화면 동일 fixture 재현은 미완료 / Q02 실제 UI 보정은 미착수.** 항목의 담당을 정한 사실과 실제 재현·동일성 완료를 구분한다. 이번 요청의 후반에 2번 묶음 실행 예시도 포함되어 범위를 질의했고, 응답이 없는 동안 앞의 명시적인 종료 조건에 따라 Parity 1까지 진행했다. 묶음2는 시작하지 않았다.

## 산출물

| 자료 | 내용 |
| --- | --- |
| [비교 프로토콜](MEDIUM_PARITY/COMPARISON_PROTOCOL.md) | 물리 PNG/논리 viewport/과거 정규화/OS 영역/crop/색공간·계정·시각·권한·증거 판정 |
| [200개 화면 조건](MEDIUM_PARITY/COMPARISON_BASELINE.md) | S별 실제 코드 경로·진입 절차·fixture 구성·원본 표시/상태·시간·스크롤·키보드·테마·플랫폼·잔여 |
| [기계 판독 기록](MEDIUM_PARITY/comparisonBaseline.json) | 원본/코드 해시, S/R/T/U/C 연결, 63흐름·273단계, source 후보와 실제 캡처 정보 |
| [공통 자산 기준](MEDIUM_PARITY/ASSET_BASELINE.md) | 대체 폰트·토큰·SVG·81개 출처 연결 crop·별도 앱 자산·미확보/시각 잔여 |
| [실행 계획](MEDIUM_PARITY/EXECUTION_PLAN.md) | 묶음1~22의 대상·선행·범위·검증·종료·결과 경로와 D/Q/V 전체 배정 |
| [생성·검사 도구](../tools/medium-parity/buildBaseline.py) | 원본을 다시 파싱하고 누락·중복·작업 배정·PNG 해시·crop·생성물 drift 검사 |
| [촬영 도구](../tools/medium-parity/capturePreview.mjs) | Node24/CDP, 기존 Chromium, 실제 previewLink/navigation/UI click과 캡처 |
| [이번 증거 요약](../tools/medium-parity/currentEvidence.json) | 코드 기준·환경·계정·시각·10개 PNG 경로/해시·관찰과 차이 |

원본 REQUIREMENTS/FLOWS/UNKNOWN/SCOPE/CONTRACTS 및 medium 분석·PNG를 수정하지 않았다. 기존 보완 목록과 FE/현재 상태 진입 문서에는 이번 결과 링크를 추가했다. Goal1~53 번호와 당시 검증·승인 이력을 유지한다.

## 비교 조건과 준비 상태

원본은 보관 Medium iOS version ID1419, PNG1179×2556이다. MCP390×844는 메타데이터, 393×852는 과거 비교 정규화이며 기기 모델·DPR 확인값이 아니다. 이번 CP-WEB-01은 Chromium390×844 CSS px/DSF1/UTC/en-US/JS Date2025-06-13T12:00:00Z/기본Light다. 원본 촬영시각이 아니라 비교용 기본안이다. OS 영역을 자르거나 원본을 변환하지 않았고 공통 crop 영역·허용치는 미확정으로 남겼다.

| 범위 | 이번 상태 | 완료로 해석하면 안 되는 부분 |
| --- | --- | --- |
| 200화면 | 코드·원본·fixture 요구·조건·담당 연결 | 모든 source 주입/계정·데이터 일치의 실행 확인 아님 |
| 10화면 | 현재 web 진입·조작·PNG 확보 | 원본 집계·서체·OS영역 차이로 ready/동일성 통과 아님 |
| 188화면 | recipe-only, 개별 조건/담당 지정 | 이번 실제 실행·재촬영 없음; 해당 source·fixture·권한·시간 조건 재현 필요 |
| S043/S113 | native-required | splash 구현/실제 cold start, OS Photos 앨범·권한 환경 필요; web 대체 금지 |
| Q02 | 파일·대체값·출처·현재 토큰 조사 | 폰트 확보/공통 코드 보정/개별 V 렌더 일치 미완료 |

10개를 제외한 화면은 각각 COMPARISON_BASELINE의 blocker와 fixtureRecipe/sourceCandidates·수용 조건에 남겼다. 공통 스크롤 숫자를 추측해서 채우지 않고 보이는 anchor/레이아웃을 연결했다. 고유 제목·값·선택·입력·시간·R-ID는 화면별로 다르다. 동일 V의 절차를 공유하더라도 각 S의 완료 상태를 전파하지 않는다.

특정 준비 차이: S008은 정책 발췌문→기사 도구 연결(D08), S068은 알림 사건 배열, S116은 June8 issue의 Goodbye Notion 데이터, S122는 native 본문 선택(D09), S106/S011/S077은 목록 시간 모델(D13) 작업이 필요하다. Q04/Q05/Q06/Q11의 원본 없는 정책은 이번에 확정하지 않았다.

## 새 브라우저 증거와 관찰

초기 `npm.cmd run web`은 `expo-image-picker` plugin을 찾지 못해 실패했다. 추적 중인 package-lock 그대로 `npm.cmd ci --no-audit --no-fund`를 실행해 1,027개 패키지를 복원한 뒤 재시작했다. package.json/lockfile/ENV는 변경하지 않았다. 기존8081 listener는 없었으며 새 미리보기 `127.0.0.1:8081`을 실행했다. 실제 native 빌드/기기/외부 서비스는 시작하지 않았다.

HeadlessChrome148.0.0.0, Windows, guest 세션. 로컬 앱의 previewLink로 `medium-brain`을 열고 실제 UI click을 사용했다. source·navigation을 mock으로 교체하지 않았다. 비교 브라우저에서만 Date를 고정했고 원래 앱 설정/fixture는 보존했다. guest DisplaySettings는 JSON null 소유 범위의 기존 store를 사용한다.

최종 증거는 [captures.json](MEDIUM_PARITY/EVIDENCE/PARITY_01/captures.json)과 아래 PNG다. 재검토에서 기존 gitignore 대상인 작업용 출력과 채택 증거의 보관 위치를 분리했다. 10개 PNG와 촬영 로그를 추적되는 `MEDIUM_PARITY/EVIDENCE/PARITY_01/`에 함께 보관해 다른 checkout에서도 검사할 수 있다. 최초 네 장 촬영과 selector 오류가 난 중간 실행은 최종 증거로 합산하지 않았다. 표시 문자열 `Display settings` 대신 실제 접근성 label `기사 표시 설정`을 사용했다.

| 대상 | 이번 조작/관찰 | 남은 차이 |
| --- | --- | --- |
| [S069](MEDIUM_PARITY/EVIDENCE/PARITY_01/S069.png) | 홈 For you, 첫 두 기사/박수 표시 | 원본 응답1.3K/529 대비 현재0; 웹 scrollbar·폰트·카드 높이·자체 placeholder |
| [S021](MEDIUM_PARITY/EVIDENCE/PARITY_01/S021.png) | Explore Trending 상위 기사 순서 | 서체·행간·세로 위치·OS 영역/scrollbar |
| [S004](MEDIUM_PARITY/EVIDENCE/PARITY_01/S004.png) | 검색 진입·빈 검색·토픽 | 한국어 금융 토픽 추가, focus 밑줄, 크기/간격; Q12/V02 |
| [S037](MEDIUM_PARITY/EVIDENCE/PARITY_01/S037.png) | 기사 상단·작가·커버 | 원본 응답834 대비 현재7, 부제 줄바꿈·본문 크기 |
| [S168](MEDIUM_PARITY/EVIDENCE/PARITY_01/S168.png) | Story options 다섯 행동 | popover 위치·행 분리·서체 대조 잔여 |
| [S063](MEDIUM_PARITY/EVIDENCE/PARITY_01/S063.png) | Display100%/Default/System Light/others on | 팝오버 크기·열 구획·서체·응답 집계 |
| [S125](MEDIUM_PARITY/EVIDENCE/PARITY_01/S125.png) | 120%로 변경, 배경 제목 줄바꿈 변경 | 정확 배치·원본 계정/집계 미일치 |
| [S119](MEDIUM_PARITY/EVIDENCE/PARITY_01/S119.png) | System/Light/Dark 메뉴 | 정확 좌표·폰트·OS 렌더 미검증 |
| [S198](MEDIUM_PARITY/EVIDENCE/PARITY_01/S198.png) | Dark120%/others on | 흰 웹 scrollbar·부제 줄바꿈·반응7·서체 |
| [S001](MEDIUM_PARITY/EVIDENCE/PARITY_01/S001.png) | others off 토글 실제 확인 | 강조 데이터 삭제 여부는 이번 검사 아님; 원본 배치/집계 차이 |

최초 실행의 PNG10개를 직접 열어 확인했다. 그중 S069/S021/S004/S037/S063/S198 원본6개를 다시 열어 쌍으로 대조했다. 나머지4개는 현재 조작 결과만 확인했으며 원본 재대조 완료로 합산하지 않았다. 재검토에서는 보강한 도구로 10개를 다시 촬영했고 최초 10개와 PNG SHA-256이 모두 일치했다. 글자 크기100/120%, System/Dark 선택, 하이라이트 on/off의 실제 DOM 상태9건도 통과했다. 최종 실행의 console error/page exception은0개다. info/log4개는 오류로 세지 않았다. 기존 Goal53의200캡처/테스트 수치를 재사용하지 않았다.

## 검증

저장소 루트의 Python3.13/Node24.18.0과 FE lockfile 의존성을 사용했다. 새 도구 테스트는 화면 누락·작업 무배정·없는 묶음·중복 묶음·실제 증거 파일 누락·잘못된 화면/단계 연결·native 담당 누락·선행 순환·다른 PNG·crop 범위 초과를 실제 실패시키고 줄바꿈이 다른 같은 텍스트를 동일하게 처리하는 검증이다.

- `python tools/medium-parity/buildBaseline.py --check`: S200/R1392/T273/U263/C72/F63/DQV59/묶음22/출처 crop81, 누락·중복·연결 오류0.
- `python -X utf8 -m unittest discover -s tools/medium-parity -p "test*.py" -v`: 재검토에서 14개 통과.
- `node --check tools/medium-parity/capturePreview.mjs`: 통과.
- `node tools/medium-parity/capturePreview.mjs --browser=C:/Users/leehg/AppData/Local/ms-playwright/chromium-1223/chrome-win64/chrome.exe --out=TODO/evidence/parity-01/review-verified`: 재검토 실행10개·상태 assertion9건 통과, console 오류0.
- 의도적으로 잘못된 탭 표시값을 요구한 별도 시나리오: 실제 브라우저에서 상태 검사 실패, exit1, run.status=failed. 이미 파일이 있는 출력 경로로 재실행: 증거를 덮어쓰기 전에 exit1. 실패 실행은 최종 캡처 수에 포함하지 않았다.
- FE에서 `npm.cmd run typecheck`, `npm.cmd run lint`: 이번 실제 실행 모두 exit0.
- 신규 결과/비교 Markdown5개의 로컬 링크·앵커1,545개 검사: 오류0.
- `git checkout-index --all --prefix=<새 임시 폴더>/`로 커밋 대상 파일만 별도 전개한 뒤 `buildBaseline.py --check`: 오류0. 기존 ignored 증거·node_modules 없이 채택 PNG·로그·원본·코드 연결을 검사했고 CRLF 체크아웃에서도 생성물 일치를 확인했다.
- `git diff --check`: 통과. FE 제품 코드·app.json·package/lockfile·medium 및 기존 요구사항 문서 변경 없음.
- FE 전체 Jest/iOS·Android JS export/native 빌드·기기 검증은 이번에 실행하지 않았다. FE 제품 코드는 그대로이며 새 도구 검사와 웹 실행을 수행했다.

## 작업 배정과 부분 완료

전체59개 ID를 22묶음에 배정했다. Q02/Q03/Q08/Q12는 공통 기준과 해당 화면 소비자에 걸쳐 유지한다. Q09는 과거 문구 판정만 완료이고 S015/S068/S125의 시각 보정은9/16/4에서 별도로 수행한다. D04는 Digest와 note, D11은 Digest와 내 목록을 모두 확인해야 닫힌다. Q11은 읽기 범위·Highlight·Listen을 분리한다. Q07은 사용자 후속 기기 진행 대기, Q08은 실제 외부 서비스 제외를 유지하며 Q10은 마지막22다. 순서와 의존성은 실행 계획을 따른다.

## 다음 요청의 정확한 범위

**묶음2 — 공통 서체·아이콘·자산·레이아웃 보정(Q02)과 자체 추가 UI 처리 기준(Q12).** ASSET_BASELINE과 이번 6쌍/10개 진단을 기준으로 확보된 근거 안에서 공통 UI를 보정한다. 48×48 터치 영역과 보이는 아이콘 크기, 서체/줄바꿈·모달·팝오버·웹 스크롤 영역을 구분한다. 자체 UI의 상태별 노출과 접근 경로·mock 사실을 보존한다. 정책·원본 자산 근거가 없으면 미확인으로 남긴다.

개별 D 결함 전체·기능별 V 전체·백엔드·실제 서비스·native 실행은 이 묶음으로 확장하지 않는다. 해당 공통 변경에 영향을 받는 화면·회귀만 검증하고 각 V의 차이를 기록한다. 결과는 `TODO/FE_MEDIUM_PARITY_02_RESULT.md`에 남기며 Q02/Q12 전체를 자동 완료 처리하지 않는다. 커밋·push·배포·묶음3 자동 시작 없이 종료한다.

## 커밋 전 재검토

후속 요청에 따라 Parity 1 산출물을 다시 검토했고 다음 누락을 수정했다.

- 채택 증거가 Git 제외 경로에만 있었던 문제: 10개 PNG·최종 촬영 로그를 추적 경로에 보관하고 모든 링크를 갱신했다.
- 진단 캡처 파일 누락과 존재하지 않는 작업 묶음을 허용한 문제: 파일·해시·로그·요청/촬영 목록·실행 완료·담당·R/T/U/C 연결 검사를 보강했다.
- S113 OS Photos의 기기 검증 담당 누락: 프로필 구현 묶음15와 기기 검증 대기 묶음21을 함께 연결했다.
- Windows 줄바꿈에 따라 해시가 달라지는 문제: 텍스트만 LF 정규화하고 PNG는 원본 바이트 해시를 유지했다.
- 표시 문자열만으로 토글 변경을 인정할 수 있었던 문제: 실제 선택 속성·글자 크기 assertion과 실제 촬영 시각·실행 상태를 추가하고 재실행했다.

이번 후속 요청은 검토 통과 후 커밋까지 승인한다. 묶음2 구현·push·배포는 시작하지 않는다. Q01의 미재현 화면, Q02의 시각 보정, Q07의 기기 대기는 그대로 남기며 이번 기록 보완과 구분한다.

최종 미리보기는 `http://localhost:8081`, 이번에 시작한 Metro PID29280을 유지했다. 기기별 UI 동작·원본200장 전체의 현재 렌더·각 source의 동일 fixture 주입은 미검증이다. 새 도구와 문서를 직접 다시 검토했고, 독립 리뷰를 수행했다고 기록하지 않는다.
