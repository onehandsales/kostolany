# DB 규칙

기준일: 2026-11-20. [공통 적용 기준](../COMMON/ENGINEERING_RULES.md)을 따른다. 예시 이름·SQL은 스키마 확정 또는 실행 기록이 아니다.

## DB-MODEL-001 — 데이터 소유권과 확장 가능한 관계

**대상:** 신규 테이블·관계, 작성자·콘텐츠·반응·작업의 저장 모델.

Supabase의 PostgreSQL을 업무 데이터베이스로 사용한다. Spring Boot가 JDBC/JPA로 접근하며 업무 트랜잭션을 관리한다. 이 문서는 스키마 설계 기준이며 실제 테이블 생성이나 migration 적용 결과가 아니다.

### 모델 검토의 출발점

아래는 책임 구분을 위한 후보 이름이다. 실제 테이블·컬럼·DDL은 첫 API 계약과 함께 정한다.

| 모델 후보 | 책임 |
| --- | --- |
| 앱 사용자 | Supabase 인증 사용자와 앱 프로필 연결 |
| RSS 공급처·수집 항목 | 출처, 외부 식별자, 원문 URL·시각, 수집 상태 |
| 기사 | 공통 사실, 제목·출처, 게시 상태·시각 |
| 수준별 콘텐츠 | 기사별 초등·중등·고등·성인 설명과 예시 |
| 좋아요·북마크 | 사용자와 기사의 관계 |
| 조회 이벤트 또는 집계 | 확정한 조회 인정·중복 제외 정책에 따른 기록 |
| 생성 작업·실행 기록 | 처리 상태, 입력·프롬프트·모델 버전, 실패·재처리 |

이 목록은 초기 모델의 출발점이며 전체 Medium 기능의 확정 스키마가 아니다. 댓글·팔로우·공개 목록·글쓰기 등은 실제 화면 흐름과 기능 계약에 맞춰 소유 모듈·권한·관계·삭제 정책을 추가 정의한다. 단일 좋아요와 횟수가 있는 박수처럼 의미가 다른 반응을 같은 unique 관계로 무조건 합치지 않는다.

- 각 테이블에 소유 모듈과 원본 데이터의 책임을 지정한다. 관계의 1:1·1:N·N:M, 필수/선택 여부, 수정 주체, 공개 범위, 삭제·보존 정책을 ERD와 명세에 기록한다.
- 작성자는 앱 사용자와 연결한다. 운영자 한 명의 글도 작성자 관계를 유지하고, 특정 사용자만 존재한다는 단일 행·고정 ID 가정을 넣지 않는다. 로그인 신원·작성자 관계·발행 권한을 같은 값으로 취급하지 않는다.
- 기사 공통 정보, 수준별 콘텐츠, 편집/생성 버전, 현재 공개 버전의 관계를 구별한다. 네 수준의 본문을 고정된 네 개 컬럼에 넣어 확장을 막지 않는다.
- 같은 콘텐츠·수준·버전의 중복과 공개 버전의 참조 무결성을 보장한다. 개정 전체가 한 버전인지 수준별 개별 버전인지 먼저 정하고 그 정의에 맞는 unique/FK를 설계한다.
- 공유 사실과 수준별 설명을 연결하고, 생성 출처·프롬프트/모델/근거 버전과 사람의 편집 이력을 추적할 수 있게 한다. 이력 보관 기간은 별도 정책이다.

사용자별 좋아요·북마크 중복 방지와 기사별 수준·버전 중복 방지를 DB 제약으로 표현하는 것을 기본안으로 한다. 정확한 키는 버전·재생성 정책을 정한 후 확정한다.

조회수의 이벤트 저장 여부, 보관 기간, 추천용 행동 데이터는 아직 미정이다. 미래 모의계좌·보유 자산·주문·체결 테이블을 만들지 않는다.

**금지·예외:** UI에 보이는 값을 모두 컬럼으로 만들거나, 관계·검색 조건을 전부 JSONB 하나로 감추지 않는다. JSONB는 공급자별 비정형 부가 정보 등 변동성·조회 방식의 이유와 유효성 검사 범위를 기록한 경우 사용한다.

**검증·완료:** ERD·기능 계약·DDL의 cardinality와 소유권이 일치한다. 두 작성자, 여러 수준·버전, 같은 관계의 중복, 존재하지 않는 참조의 실패를 검증한다. 새 작가·공급자를 추가할 때 기존 소유권이나 공개 버전을 다시 해석할 필요가 없어야 한다.

## DB-AUTH-001 — 인증 사용자와 업무 데이터의 수명

**대상:** 앱 프로필 초기화·계정 상태·탈퇴·연관 데이터 삭제.

- Supabase `auth.users`는 인증 서비스가 관리한다. JPA로 해당 테이블을 직접 갱신해 회원 가입·로그아웃·탈퇴를 구현하지 않는다.
- 앱의 프로필·설명 수준 등 업무 속성은 앱 소유 테이블에 둔다.
- 앱 사용자에 Supabase 인증 ID를 unique하게 연결하는 것을 기본안으로 한다. 내부 PK를 별도로 둘지, 동일 UUID를 쓸지는 최초 스키마에서 결정한다.
- 프로필 초기화는 동시에 여러 요청이 들어와도 한 사용자만 만들어지도록 한다.
- 인증 계정 생성과 프로필 생성 사이의 부분 실패를 고려한다. Auth HTTP 호출까지 DB 롤백된다고 가정하지 않는다.
- Auth 계정 삭제 시 앱 데이터 보존·익명화·삭제 범위를 정한 뒤 FK의 삭제 정책을 선택한다. 모든 관계에 cascade delete를 자동 적용하지 않는다.
- 탈퇴 처리 중 재로그인·중복 요청·Auth 삭제 실패·업무 데이터 처리 실패의 순서와 복구 상태를 계약에 정한다. 이메일 재사용만으로 이전 사용자 데이터를 연결하지 않는다.
- 논리 삭제가 필요한 테이블은 읽기 필터, unique 키 재사용, 복구 가능 여부, 최종 삭제와 보관 기간을 함께 설계한다. 모든 테이블에 일괄 `deleted_at`을 추가하지 않는다.

**검증·완료:** 같은 인증 사용자의 동시 초기화는 프로필 하나로 수렴한다. 타 사용자 데이터 접근, 탈퇴 부분 실패, 재시도에 따른 중복·잘못된 재연결이 없어야 한다. 삭제·익명화 정책이 미정이면 destructive cascade를 먼저 확정하지 않는다.

## DB-SCHEMA-001 — 타입·제약·시간의 의미

**대상:** 앱 소유 테이블의 모든 컬럼·기본값·제약.

- 테이블·컬럼은 `snake_case`로 통일하고, JPA·API의 이름과 매핑한다.
- 식별자는 UUID를 기본안으로 검토한다. ID만으로 정렬이나 권한이 보장된다고 가정하지 않는다.
- `NOT NULL`, `UNIQUE`, FK, `CHECK`를 데이터 의미에 맞게 사용한다. 사용자 정책을 확정하지 않은 상태에서 새로운 사업 제약을 추가하지 않는다.
- 사건 발생·원문 게시·수집·콘텐츠 게시·생성 시각을 구분한다. 일반 시점은 `timestamptz`와 `Instant`로 다루고 API에서는 UTC 기준을 명시한다.
- 날짜만 의미하는 값은 날짜 타입을 사용한다. 모든 날짜에 임의 자정·시간대를 붙이지 않는다.
- 인덱스는 실제 filter·join·sort·pagination에 맞춰 설계한다. 피드와 개인 북마크 조회가 우선 검토 대상이다.
- 자주 조회하는 핵심 관계를 전부 JSONB에 넣지 않는다. 공급자별 비정형 부가 정보 등 이유가 있을 때 사용한다.
- 파생 집계를 저장하면 원본 관계와의 일관성·재계산 방법을 정한다.

필드별 명세에 `물리명 / 한글 의미 / 타입·길이·정밀도·단위 / nullable과 NULL 의미 / 기본값과 적용 조건 / PK·FK·unique·check / 참조 삭제 정책 / 읽기·쓰기 주체`를 작성한다. API 필드가 다른 이름이면 매핑을 표시한다.

상태 값은 허용 값·전이·알 수 없는 값의 처리·추가 시 마이그레이션을 정한다. DB enum·CHECK·코드 테이블 중 선택 이유를 기록한다. 기간의 포함/제외 경계와 시간 정밀도를 명시하고, 원문 시각을 알 수 없으면 수집 시각으로 조용히 대체하지 않는다.

**금지·예외:** 제약을 application 검사만으로 대신하거나 잘못된 데이터를 기본값 0·빈 문자열로 숨기지 않는다. FK·unique·NOT NULL을 생략해야 하면 실제 데이터 수명·분산 경계 등의 이유와 정합성 검증·복구 방법을 기록한다.

**검증·완료:** 정상 값과 NULL·범위 초과·중복·잘못된 참조·삭제 충돌을 실제 PostgreSQL에서 검증한다. constraint 이름으로 원인을 식별할 수 있고 공개 API에는 안정적인 업무 오류로 변환되어야 한다.

## DB-DOC-001 — 모든 테이블·컬럼의 한글 한 줄 주석

**대상:** 앱이 소유하는 모든 테이블과 전체 컬럼. 앱이 정의한 view·materialized view 및 그 컬럼도 같은 기준으로 관리한다.

- 테이블에는 `COMMENT ON TABLE`, 컬럼에는 `COMMENT ON COLUMN`을 migration에 포함한다. view 등은 객체 종류에 맞는 COMMENT를 사용한다. SQL 파일의 `--` 설명만으로 실제 DB 주석을 대신하지 않는다.
- 저장되는 주석은 공백이 아닌 한글 설명 한 줄이어야 한다. ID·생성/수정 시각·FK·버전·보조 컬럼도 예외가 아니다. 컬럼명 번역에 그치지 않고 무엇을 의미하는지 설명한다.
- nullable이면 NULL의 의미, 수치면 단위, 시간은 어떤 사건의 시각인지, FK는 참조 대상, 집계는 집계 대상, 상태는 허용 값/정의 위치를 포함한다. 복잡한 정책은 상세 명세를 연결하되 주석 자체로 기본 의미를 알 수 있게 한다.
- 컬럼 의미 변경·추가·rename 시 주석도 같은 변경에서 갱신한다. 이미 적용된 migration을 고치지 않고 후속 migration으로 반영한다.
- 주석에 비밀번호·개인정보·운영 키를 넣지 않는다. DB 주석은 비밀 저장소가 아니다.

아래는 설명용 SQL이다. 실제 schema·테이블·필드는 아직 확정하지 않는다.

```sql
COMMENT ON TABLE app.article IS '작성자와 공통 정보를 연결하고 콘텐츠의 공개 버전을 관리한다.';
COMMENT ON COLUMN app.article.id IS '서비스 내부에서 콘텐츠를 고유하게 식별하는 UUID이다.';
COMMENT ON COLUMN app.article.revision IS '동시 수정 충돌을 감지하기 위해 변경 시 증가하는 정수 버전 번호이다.';
```

**예외:** Supabase 관리 스키마와 외부 extension 소유 객체, Flyway 이력 등 도구 생성 객체는 앱 소유 검사에서 제외한다. 제외는 schema·객체명·소유 근거로 명시하고 앱 업무 테이블을 광범위한 패턴으로 제외하지 않는다. 파티션 자동 생성이 있다면 생성 경로에서도 주석을 보장한다.

**검증 방법:** migration 적용 후 `obj_description`과 `col_description`으로 실제 저장된 주석을 검사한다. 다음은 전용 `app` schema를 가정한 검사용 조회 예시다. 실행 환경의 소유 schema·도구 이력 이름에 맞게 확정해야 하며, 이번 문서 작성에서 DB에 실행한 SQL이 아니다.

```sql
WITH app_schemas(schema_name) AS (
    VALUES ('app')
), owned_relations AS (
    SELECT c.oid, n.nspname, c.relname
    FROM pg_catalog.pg_class c
    JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
    JOIN app_schemas s ON s.schema_name = n.nspname
    WHERE c.relkind IN ('r', 'p', 'v', 'm', 'f')
      AND NOT (n.nspname = 'app' AND c.relname = 'flyway_schema_history')
), descriptions AS (
    SELECT format('%I.%I', r.nspname, r.relname) AS object_name,
           pg_catalog.obj_description(r.oid, 'pg_class') AS description
    FROM owned_relations r
    UNION ALL
    SELECT format('%I.%I.%I', r.nspname, r.relname, a.attname),
           pg_catalog.col_description(r.oid, a.attnum)
    FROM owned_relations r
    JOIN pg_catalog.pg_attribute a ON a.attrelid = r.oid
    WHERE a.attnum > 0 AND NOT a.attisdropped
)
SELECT object_name, 'INVALID_KOREAN_COMMENT' AS violation
FROM descriptions
WHERE description IS NULL
   OR btrim(description) = ''
   OR description !~ '[가-힣]'
   OR position(chr(10) IN description) > 0
   OR position(chr(13) IN description) > 0
UNION ALL
SELECT s.schema_name, 'NO_OWNED_RELATIONS'
FROM app_schemas s
WHERE NOT EXISTS (
    SELECT 1 FROM owned_relations r WHERE r.nspname = s.schema_name
)
ORDER BY object_name, violation;
```

공유 `public` schema를 사용한다면 실제 앱 소유 객체와 도구/extension 객체를 분류한 목록을 사용한다. 목록 누락을 막기 위해 migration이 생성한 모든 업무 객체와 목록을 대조한다. 빈 schema·대상 0개·일부 schema 누락을 검사 성공으로 처리하지 않는다.

**완료 조건:** 전체 앱 소유 객체/컬럼을 검사했고 위반 0건이어야 한다. 주석 없는 새 컬럼·영문만 있는 주석·빈 주석·여러 줄 주석을 추가한 실패 fixture와 정상 한글 주석 fixture로 검사기 자체를 검증한다. 의미·NULL·단위의 정확성은 스키마 리뷰에서 확인한다. 근거: [PostgreSQL COMMENT](https://www.postgresql.org/docs/current/sql-comment.html), [주석 조회 함수](https://www.postgresql.org/docs/current/functions-info.html#FUNCTIONS-INFO-COMMENT).

## DB-INDEX-001 — 조회 근거가 있는 인덱스와 집계

**대상:** 목록·검색·참조 조회의 인덱스, 파생 집계와 캐시 원본.

인덱스마다 대상 query·filter·join·sort·페이지 경계·예상 선택도와 읽기 이득/쓰기 비용을 기록한다. 복합 인덱스의 컬럼 순서와 부분 인덱스 조건은 실제 쿼리와 맞춘다. 유사한 중복 인덱스와 FK 참조 조회 비용을 함께 확인한다.

집계를 저장하면 원본 테이블, 동기/비동기 반영 시점, 허용 지연, 중복 반영 방지, 재계산·불일치 탐지 방법을 정한다. 집계만 남기고 복구할 근거를 제거하지 않는다.

**금지·예외:** 모든 컬럼에 인덱스를 만들거나 실행 계획 없이 캐시로 병목을 숨기지 않는다. `EXPLAIN ANALYZE`는 쿼리를 실제 실행하므로 쓰기 쿼리와 운영 부하에 주의하고 격리 환경을 우선한다.

**검증·완료:** 대표 규모·분포·최대 페이지에서 실행 계획과 시간·쿼리 수·인덱스 크기/쓰기 영향을 기록한다. 작은 데이터의 index scan 여부만으로 성공을 판정하지 않는다. 집계 오류를 의도적으로 만든 뒤 원본으로 복구할 수 있어야 한다.

## DB-MIG-001 — 재현 가능한 마이그레이션과 배포 호환성

**대상:** 앱 소유 schema·테이블·제약·인덱스·주석·업무 데이터 변환.

- Flyway와 버전별 SQL migration을 기본안으로 한다. 실제 backend 경로는 초기화 때 고정한다.
- 공유·운영 DB는 Hibernate `ddl-auto=update/create/create-drop`으로 관리하지 않는다. JPA는 `validate` 또는 검증된 운영 설정을 사용한다.
- 적용된 migration 파일을 수정하지 않고 후속 migration을 추가한다.
- 앱 업무 스키마와 Supabase의 `auth`·`storage` 등 관리 스키마를 구분한다. 관리 스키마를 Flyway로 재생성하거나 임의 변경하지 않는다.
- 새 컬럼·제약은 기존 데이터, 이전 앱·서버 버전, backfill, 잠금 시간과 함께 검토한다.
- 배포 전 격리 PostgreSQL에 migration을 적용하고 중요한 제약·조회·트랜잭션을 확인한다.
- 기존 데이터가 있는 Supabase에 임의 baseline·reset·clean을 실행하지 않는다.
- 파괴적 변경은 영향 데이터와 복구 방법을 구체화하고 명시적 작업 범위 안에서 수행한다.
- migration은 적용 순서가 명확한 고유 버전과 목적을 가진다. 동시 작업의 버전 충돌은 공유 DB 적용 전에 정리한다. 적용된 파일의 checksum을 편의상 repair해서 이력을 숨기지 않는다.
- 각 변경에 기존 데이터의 양·위반 가능성, 잠금·예상 시간, old/new 서버 호환, backfill과 중단/재개, 실패 복구를 기록한다.
- 필수 컬럼 추가 등은 확장 → 호환 코드 → 제한된 batch backfill → 데이터 검증 → 제약 강화 → 구버전 사용 종료 → 제거 순서를 필요에 맞게 나눈다. 미확정 기본값으로 기존 데이터를 덮어 채우지 않는다.
- 트랜잭션을 사용할 수 없는 DDL이 포함되면 파일을 분리하고 Flyway 실행 설정, 중간 실패의 잔여 객체 탐지·정리, 재실행 절차를 정한다. 모든 DDL이 자동 롤백된다고 가정하지 않는다.
- rollback은 애플리케이션 버전 복귀, 후속 migration을 통한 forward fix, 백업 복원을 구분한다. 삭제된 데이터를 역방향 DDL만으로 복원할 수 있다고 기록하지 않는다.

**검증·완료:** 빈 DB에 전체 적용, 지원하는 이전 버전 DB에 대표 기존 데이터를 넣고 업그레이드, migration 검증 재실행, 제약·주석·조회·데이터 보존을 확인한다. 자동 적용 대상에서 관리 schema가 제외되고, 실패 시 중단 지점과 복구 방법이 명확해야 한다. 파괴적 실행은 이미 명시적으로 승인된 데이터 범위를 넘지 않는다.

## 연결과 권한의 상세 기준

[Supabase 설정](SUPABASE_SETUP.md)을 따른다. 실행 서버의 업무용 DB 역할과 migration 권한을 구분하는 것을 기본안으로 한다. 최대 권한의 계정을 모바일에 넣거나 앱에 DB 연결 문자열을 배포하지 않는다.

Spring의 JDBC 연결에 모바일 사용자의 Supabase RLS 문맥이 자동으로 적용되지는 않는다. 사용자별 소유권 검사는 Spring이 수행한다. 직접 연결에도 RLS를 활용하려면 역할·세션 문맥·우회 권한을 별도로 설계하고 테스트한다.
