# Kostolany Project — AGENT

**Parity10 커밋 전 재검토(2026-11-24):** [추가 결함·수정·현재 검사](../TODO/FE_MEDIUM_PARITY_10_RESULT.md#pre-commit-review). 소유자에게 숨겨진 상위 응답의 차단을 놓치는 답글 확정 누락을 수정했다. 새 관련118 tests·타입/lint 통과, 전체/JS 번들은 이번 수정 후 미재실행이며 과거 시간초과/실제 화면 잔여는 유지한다. 이번 사용자 요청으로42파일 로컬 커밋 범위를 확정했다. 아래 미커밋 기록은 당시 이력이며9/10 전체 완료·11 시작·push/배포 승인이 아니다.

**최신 — Parity10(2026-11-24):** [기사·응답 보완·재검토·잔여](../TODO/FE_MEDIUM_PARITY_10_RESULT.md). 사용자 인계에 따라9 잔여를9 소유로 유지한 채 V13/V20을 보완했다. 메타데이터/추천 ID·응답 시간/선택/포커스·늦은 결과/권한을 수정하고 검증했다. 실제 화면 연결 없음·자산/fixture·원본 미확인·기기 대기는 남아10 전체 완료가 아니다. 아래9 미착수/미커밋 문장은 당시 이력이며 선행 커밋은12e0928이다. 이번 커밋/push/배포/11 시작 없음.

**커밋 전 재검토 — 2026-11-24:** [최신 검토](../TODO/FE_MEDIUM_PARITY_09_RESULT.md#pre-commit-review). 추가 코드 결함은 발견하지 못했고 관련90 tests·타입/lint를 새로 통과했다. 후속 사용자 요청으로 이 문서와 추가 보완분을 로컬 커밋 대상으로 확정했다. 아래 미커밋 문구는 이전 실행 이력이며9 전체 미완료·10 미착수·push/배포 미실행은 유지한다.

**최신 — Parity9 추가 보완(2026-11-24):** [추가 검토·종료 판정](../TODO/FE_MEDIUM_PARITY_09_RESULT.md#additional-review). 기존 변경을 `30907e2`에 커밋했고 이후 native 인용/구분선 부분 보완은 미커밋이다. 관련90 tests·타입/lint·메모리 JS 통과와 실제 브라우저 차단·native 구현 잔여/기기 대기를 분리한다. 아래 최초 실행 이력보다 이 판정을 우선하며 묶음9 전체 종료·묶음10 시작·push·배포는 하지 않았다.

**현재 FE 작업 — Parity9(2026-11-24):** [작성·초안·발행 결과](../TODO/FE_MEDIUM_PARITY_09_RESULT.md)와 [현재 상태](SOFTWARE_AGENT/COMMON/IMPLEMENTATION_STATUS.md)를 따른다. 구현/자동 검증, 브라우저 실행 차단, 원본 미확인·native 구현 잔여/기기 대기를 구분한다. 새 tools/evidence/캡처/로그/manifest는 만들지 않으며 묶음10·커밋·push·배포는 별도 요청 전 진행하지 않는다.

작성일: 2026-11-17

금융 뉴스를 이해하기 쉽게 전달하는 모바일 앱의 제품 범위, 개발 규칙, 검증 상태를 관리한다. Kotlin/Spring Boot와 React Native로 1차 MVP를 만들고, Supabase는 Auth·PostgreSQL·Storage에 사용한다.

## 먼저 읽기

1. [제품 범위와 결정](PROJECT_SCOPE.md)
2. [현재 상태와 다음 작업](SOFTWARE_AGENT/COMMON/IMPLEMENTATION_STATUS.md)
3. [전체 기술 구성](SOFTWARE_AGENT/README.md)
4. 담당 영역의 Backend·DB·Frontend·UX 문서
5. API 변경 시 [계약 규칙](SOFTWARE_AGENT/COMMON/API_CONTRACT.md), 구현 시 [검증·작업 규칙](SOFTWARE_AGENT/COMMON/QUALITY_AND_WORKFLOW.md)

## 문서 지도

| 영역 | 문서 | 책임 |
| --- | --- | --- |
| 제품 | [PROJECT_SCOPE](PROJECT_SCOPE.md) | 사용자 가치, MVP, 미정 정책 |
| 전체 구성 | [SOFTWARE_AGENT](SOFTWARE_AGENT/README.md) | 서비스 경계와 기술 선택 |
| 공통 | [API_CONTRACT](SOFTWARE_AGENT/COMMON/API_CONTRACT.md) | 모바일과 서버가 공유하는 계약 |
| 공통 | [QUALITY_AND_WORKFLOW](SOFTWARE_AGENT/COMMON/QUALITY_AND_WORKFLOW.md) | 테스트, 관측, 작업·완료 기준 |
| 현황 | [IMPLEMENTATION_STATUS](SOFTWARE_AGENT/COMMON/IMPLEMENTATION_STATUS.md) | 문서·코드·외부 설정·실동작 구분 |
| 백엔드 | [BACKEND_AGENT](SOFTWARE_AGENT/BACKEND_AGENT/README.md) | 구조와 모듈 책임 |
| Kotlin | [KOTLIN_SPRING](SOFTWARE_AGENT/BACKEND_AGENT/KOTLIN_SPRING.md) | 언어·Spring·JPA 코드 규칙 |
| 트랜잭션 | [TRANSACTION](SOFTWARE_AGENT/BACKEND_AGENT/TRANSACTION.md) | 원자성, 동시성, 외부 호출 |
| 콘텐츠 | [CONTENT_PIPELINE](SOFTWARE_AGENT/BACKEND_AGENT/CONTENT_PIPELINE.md) | RSS 수집, AI 생성, 재처리 |
| 데이터베이스 | [DB_AGENT](SOFTWARE_AGENT/DB_AGENT/README.md) | 스키마·마이그레이션·데이터 규칙 |
| Supabase | [SUPABASE_SETUP](SOFTWARE_AGENT/DB_AGENT/SUPABASE_SETUP.md) | Auth·DB·Storage·접속 설정 |
| 모바일 | [FRONT_AGENT](SOFTWARE_AGENT/FRONT_AGENT/README.md) | React Native 구현·세션·화면 상태 |
| UX | [UXUI_AGENT](UXUI_AGENT/README.md) | Medium 모바일 참고와 화면 흐름 |

## 문서와 작업의 원칙

- 최신 사용자 지시를 우선한다. 사용자가 정하지 않은 사업 정책을 확정 사실로 만들지 않는다.
- `확정 방향`, `구현 기본안`, `미정`, `실제 확인 결과`를 구분한다. 기본안은 구현을 위한 제안이며 사용자 확정 이력이 아니다.
- 현재 프로젝트의 규칙은 이 폴더가 기준이다. OneHandSales에서는 계약·모듈 소유권·트랜잭션·검증 원칙을 참고했으며, CRM 도메인과 기존 구현 기술은 가져오지 않는다.
- 작성 전 기존 파일과 Git 상태를 확인한다. 사용자 변경을 보존하고, 검색은 `rg`, 수정은 가능한 경우 `apply_patch`를 사용한다.
- 요청된 작업을 끝까지 수행한다. 이미 승인된 범위 안의 가역적 구현 선택 때문에 승인을 반복해서 요청하지 않는다.
- 문서 작성 요청을 실제 DB 변경·배포·비밀 값 변경으로 확대하지 않는다. 파괴적 작업과 커밋은 명시적인 요청 없이 수행하지 않는다.
- 실행하지 않은 테스트·배포·로그인·외부 연결을 완료로 기록하지 않는다.
- 모든 함수의 내용을 반복하는 주석보다 설계 이유, 원자성, 예외 처리 이유를 설명한다.
- 문서 수나 패턴 수를 늘리는 것보다 실제 사용자 흐름과 검증 가능한 결과를 우선한다.

## 현재 출발점

사용자가 Supabase 프로젝트 생성을 완료했다고 알렸다. 이 문서 작업에서는 실제 프로젝트에 접속하지 않았다. 설정 값, 인증 공급자, DB 연결, 버킷, 정책은 아직 확인하지 않았다.

문서 작성 전 대상 폴더에는 역할별 빈 디렉터리만 있었다. 실행 코드는 아직 없다. 문서 작성 후 사용자의 커밋 요청에 따라 2026-11-17 로컬 Git 저장소를 `main` 브랜치로 초기화했다. 이번 산출물은 `AGENT` 내부 문서이며, 저장소 루트나 앱 코드에 자동 적용되는 설정 파일을 생성한 것은 아니다.
