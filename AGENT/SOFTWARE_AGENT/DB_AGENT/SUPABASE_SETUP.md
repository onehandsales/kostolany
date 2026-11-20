# Supabase 설정과 역할

기준일: 2026-11-20. 2026-11-17의 초기 구성 방향을 유지하면서 검증 기준을 구체화했다. [공통 규칙](../COMMON/ENGINEERING_RULES.md)을 함께 따른다.

**프로젝트 생성 완료는 사용자에게 확인했다. 아래 설정이 실제로 적용됐는지는 아직 확인하지 않았다.** 프로젝트 이름·ref·리전·접속 문자열·키를 조회하거나 저장하지 않았다.

## SB-CONFIG-001 — 서비스 경계와 설정 증거

**대상:** Supabase 프로젝트·환경 설정, Auth·업무 DB·Storage 사용 경로.

| 서비스 | 역할 |
| --- | --- |
| Auth | Google 인증 연동, 세션·access/refresh token 발급·갱신 |
| PostgreSQL | 기사·프로필·반응·생성 작업 등 업무 데이터 |
| Storage | 콘텐츠에 필요한 이미지 등 파일 |
| Data API | 현재 앱 구성에서는 사용하지 않는 방향 |

Auth·Storage와 Data API는 별도 서비스다. Data API를 사용하지 않아도 인증과 파일 기능을 사용할 수 있다. 근거: [Supabase 구조](https://supabase.com/docs/guides/getting-started/architecture).

### 생성 화면에서 논의한 값

아래는 초기 논의 방향이다. Dashboard 항목 이름·제공 옵션·네트워크 조건은 실제 구성 시 공식 문서와 해당 프로젝트에서 확인한다. 옵션을 껐다고 필요한 접근 제어까지 자동으로 갖춰지는 것은 아니다.

| 옵션 | 권장 방향 | 실제 상태 |
| --- | --- | --- |
| Region | 한국 사용자를 기준으로 Seoul 등 구체적 리전 검토, 서버 위치와 함께 결정 | 미확인 |
| Enable Data API | OFF | 미확인 |
| Automatically expose new tables | OFF | 미확인 |
| Enable automatic RLS | 자동 생성 옵션은 OFF, 필요한 테이블 정책은 migration으로 명시 | 미확인 |
| Database password | 충분히 강한 값을 비밀 저장소에서 관리 | 값 미조회 |

자동 RLS 생성 옵션을 끄는 것은 기존 RLS나 Storage 정책을 모두 해제한다는 뜻이 아니다. Data API 사용 여부가 바뀌면 노출 스키마·grants·RLS를 함께 재검토한다.

### Data API OFF의 정확한 의미

- Supabase의 자동 테이블 REST API를 사용할 수 없게 한다.
- `supabase.from(...).select/insert/update/delete`와 Data API를 통한 RPC를 사용하지 않는 구성이다.
- Spring의 PostgreSQL JDBC 접속과 `@Transactional`은 계속 사용할 수 있다.
- Supabase Auth를 이용한 로그인·세션 갱신은 별도 API다.
- 모바일 업무 데이터 경로는 `모바일 → Spring API → PostgreSQL`로 구성한다.

**Data API를 끈 것만으로 특정 백엔드 서버만 DB에 접속하도록 제한되지는 않는다.** 유효한 DB 자격 증명을 가진 다른 프로그램도 네트워크 조건이 허용되면 접속할 수 있다.

근거: [Data API 비활성화](https://supabase.com/docs/guides/api/securing-your-api#disable-the-data-api), [DB 연결 보안](https://supabase.com/docs/guides/database/secure-data).

환경별 설정 명세에는 프로젝트 환경 구분, DB/서버 지역, PostgreSQL 버전, 연결 모드, Data API 노출 schema, Auth 공급자·redirect, Storage 공개 범위와 확인 일자를 기록한다. 값은 비밀이 아닌 설정 이름·방식으로 남기고 비밀번호·키·인증 URL 원문은 기록하지 않는다.

**금지·예외:** 문서에 권장 방향을 썼다는 이유로 실제 설정을 변경하거나 확인 완료로 표시하지 않는다. Data API 사용 방향이 바뀌면 노출 schema·grants·RLS·API 우회 경로를 함께 재설계한다.

**검증·완료:** 실제 설정과 API·DB 접근 경로를 확인한 환경만 완료로 표시한다. 미접속·미확인 항목은 유지한다. 개발·테스트·운영의 자격 증명과 접속 대상을 혼용하지 않는다.

## SB-DB-001 — DB 접속·최소 권한·연결 예산

**대상:** 서버/worker JDBC, migration 계정, 네트워크·TLS·pool 설정.

1. DB 접속 문자열·비밀번호는 서버와 허용한 운영 도구에서만 보관한다.
2. 모바일 앱은 업무 DB API를 호출하지 않고 Spring API를 호출한다.
3. 업무 실행 역할에는 필요한 테이블·명령 권한만 부여하고, migration 권한을 분리하는 것을 기본안으로 한다.
4. 접속 위치까지 제한하려면 Network Restrictions에서 백엔드의 고정 출발 IP와 필요한 관리 경로를 허용한다. 호스팅의 고정 IP·IPv4/IPv6 조건을 먼저 확인한다.
5. 허용 IP를 설정해도 DB 인증은 필요하다. Supabase 내부 Auth·Storage의 데이터 처리를 모두 Spring 경유로 바꾸는 설정은 아니다.

근거: [Network Restrictions](https://supabase.com/docs/guides/platform/network-restrictions).

### JDBC 연결 방식

지속 실행되는 Spring 서버는 direct connection을 우선 검토한다. 호스팅이 IPv4 전용이면 session pooler를 대안으로 검토한다. transaction pooler는 prepared statement·세션 상태·migration 호환성을 확인하지 않고 선택하지 않는다.

- Dashboard의 실제 연결 정보를 기준으로 JDBC URL·계정·TLS를 설정한다.
- 서버 인스턴스 수 × HikariCP 최대 연결 수와 worker·migration의 연결 사용량을 DB 한도 안에서 계산한다.
- Flyway는 direct connection을 우선 검토하고, 대체 경로가 필요하면 실제 migration 동작을 확인한다.
- 연결 문자열에 들어간 비밀번호를 로그·문서·모바일 번들에 노출하지 않는다.

- 업무 실행 역할에는 소유한 업무 테이블의 필요한 DML·sequence·schema 사용 권한만 부여한다. migration 실행 주체는 필요한 DDL 권한을 별도로 갖고, 평상시 API 자격 증명으로 DDL을 실행하지 않는다.
- 네트워크 허용 목록을 적용할 때 관리 경로·배포 중 구/신 서버·worker·IPv4/IPv6 경로를 확인한다. 접속 제한만으로 DB 인증·권한을 대체하지 않는다.
- 연결 예산은 `동시에 살아 있는 API 인스턴스 × 각 pool 상한 + worker pool + migration/관리/플랫폼 사용량 + 예비 연결`로 계산한다. rolling deployment 중 인스턴스 증가도 포함한다.
- 연결 획득·연결 수립·statement·잠금 대기·트랜잭션·외부 호출의 timeout은 적용 위치와 단위를 명시한다. 제한에 걸린 요청의 오류·재시도 동작을 계약과 맞춘다.
- TLS 인증서와 호스트 검증을 접속 방식·driver에 맞게 설정하고 검증을 끄는 우회로 연결 성공을 만들지 않는다. pooler 사용 시 prepared statement·세션 설정·migration 동작을 실제 선택한 driver로 검증한다.

JDBC는 모바일 사용자의 JWT를 자동으로 PostgreSQL 세션의 신원으로 전달하지 않는다. 업무 권한은 Spring에서 검사한다. DB RLS를 추가한다면 실행 역할의 우회 권한, 트랜잭션 범위의 사용자 문맥 설정, pool 반환 후 문맥 초기화, owner/BYPASSRLS의 영향을 명시하고 테스트한다.

**금지·예외:** 운영에 최고 권한 연결을 편의상 재사용하거나 모바일에 DB 비밀번호를 배포하지 않는다. 제한된 초기 관리 작업은 작업 범위·권한·회수 방법을 기록한다. connection mode 변경은 URL 교체만으로 검증을 끝내지 않는다.

**검증·완료:** 격리 환경에서 실행 역할의 필요한 DML 성공과 DDL/관리 schema 접근 거절을 확인한다. RLS 문맥을 쓰면 같은 pool 연결의 사용자 A→B 전환에서 데이터 누출이 없어야 한다. 실제 배포 환경의 TLS·접속 경로·pool 한도 검증은 로컬 DB 통과와 별도로 기록한다.

근거: [Supabase PostgreSQL 연결](https://supabase.com/docs/guides/database/connecting-to-postgres).

## SB-AUTH-001 — 신원 검증과 앱 권한의 분리

**대상:** Supabase 로그인·세션, JWT 검증, 앱 프로필 연결.

- Google 공급자와 iOS·Android 클라이언트 설정을 확인한다. 웹 기반 OAuth 방식이면 redirect/deep link도 플랫폼별로 등록한다.
- Spring 검증은 비대칭 JWT signing key + JWKS를 기본안으로 한다. 실제 프로젝트의 signing key·issuer·audience를 확인한다.
- 모바일에는 Supabase URL과 publishable key를 사용할 수 있다. 이것을 서버 비밀 키와 혼동하지 않는다.
- `secret`/`service_role` 키, DB 비밀번호, Google client secret은 모바일에 넣지 않는다.
- 인증 계정과 프로필 초기화·탈퇴는 별도 실패 경계를 가진다. [Backend 규칙](../BACKEND_AGENT/README.md)을 따른다.

- 서명 검증은 선택한 보안 라이브러리로 수행한다. 허용 알고리즘·issuer·audience를 구성하고 신뢰할 수 없는 토큰의 임의 URL로 JWKS를 조회하지 않는다.
- JWKS 키 교체·캐시·알 수 없는 key ID·조회 실패 때의 동작을 확인한다. 키 조회 실패를 서명 검증 생략으로 처리하지 않는다.
- Supabase 신원과 앱의 작성/발행/관리 권한을 구분한다. 사용자가 수정 가능한 metadata나 이메일 문자열을 관리자 판정에 사용하지 않는다.
- 세션 로그아웃·토큰 만료·앱 계정 차단/삭제의 효력 시점을 구분하고, 즉시 거절이 필요한 작업에는 서버의 계정 상태 검사를 적용한다.

**검증·완료:** 유효·만료·잘못된 서명/issuer/audience, 키 교체, 중복 프로필 초기화, 계정 상태별 권한을 검증한다. iOS·Android OAuth 복귀/세션 복원은 플랫폼별 별도 결과이며 서버 JWT 테스트로 대체하지 않는다. 추가 공급자는 현재 확정한 공급자와 구별해 계약한다.

근거: [JWT 검증](https://supabase.com/docs/guides/auth/jwts), [Google 로그인](https://supabase.com/docs/guides/auth/social-sign-in/auth-google).

## SB-FILE-001 — 파일 권한·업로드 검증·실패 정리

**대상:** 이미지 등 파일 업로드·다운로드·삭제·서명 URL 발급.

- 버킷·파일 경로·공개 여부는 콘텐츠의 공개 범위에 맞춰 정한다. 현재 버킷은 생성·검증하지 않았다.
- 비공개 파일은 서버 권한 확인 후 서명 URL 등으로 접근하게 하는 방식을 검토한다.
- 모바일의 직접 업로드가 필요하면 별도 Storage 정책 또는 제한된 서명 업로드 계약을 만든다.
- 서버의 고권한 키는 Storage RLS를 우회할 수 있으므로 서버에서 파일 접근 권한을 확인한다.
- 파일 업로드와 DB 행 저장은 같은 JDBC 트랜잭션이 아니다. 실패 시 재처리·고아 파일 정리를 설계한다.

- 업로드 계약에 허용 목적·확장자·실제 파일 형식·크기·이미지 차원·사용자별 제한을 명시한다. 클라이언트의 MIME과 원래 파일명만 신뢰하지 않는다.
- 저장 경로는 서버가 생성한 충돌 방지 키와 소유 관계로 결정한다. 임의 bucket/path를 요청값으로 받아 다른 사용자의 파일을 덮어쓰거나 삭제하지 않는다.
- 서명 URL에는 목적·대상·만료·권한 범위를 제한하고 로그에 URL 원문을 남기지 않는다. URL 발급과 파일 메타데이터 조회에도 자원별 권한을 적용한다.
- 업로드 완료와 DB 참조 확정의 순서, 실패한 업로드/DB 저장의 정리 방법, 재시도 중복, 고아 파일 회수 유예를 정한다. 정리 작업은 실제 참조가 없는지 다시 확인하고 사용 중인 파일을 삭제하지 않는다.

**금지·예외:** 고권한 서버 키의 Storage RLS 우회를 사용자 권한 검사 생략으로 사용하지 않는다. 공개 bucket은 누구나 읽어도 되는 파일의 정책이 확정된 경우에만 선택한다. 직접 업로드는 서버를 우회하더라도 동일 범위의 제한과 후속 검증을 보장해야 한다.

**검증·완료:** 타 사용자 파일 접근, 만료 URL, 임의 경로, MIME 위장·과대 파일, 업로드 성공 후 DB 실패, 중복 업로드·고아 정리를 검증한다. Storage stub 테스트와 실제 bucket/RLS 검증 결과를 구분한다.

근거: [Storage 접근 제어](https://supabase.com/docs/guides/storage/security/access-control).
