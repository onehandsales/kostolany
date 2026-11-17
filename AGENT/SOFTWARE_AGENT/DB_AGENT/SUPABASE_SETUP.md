# Supabase 설정과 역할

기준일: 2026-11-17

**프로젝트 생성 완료는 사용자에게 확인했다. 아래 설정이 실제로 적용됐는지는 아직 확인하지 않았다.** 프로젝트 이름·ref·리전·접속 문자열·키를 조회하거나 저장하지 않았다.

## 사용 서비스

| 서비스 | 역할 |
| --- | --- |
| Auth | Google 인증 연동, 세션·access/refresh token 발급·갱신 |
| PostgreSQL | 기사·프로필·반응·생성 작업 등 업무 데이터 |
| Storage | 콘텐츠에 필요한 이미지 등 파일 |
| Data API | 현재 앱 구성에서는 사용하지 않는 방향 |

Auth·Storage와 Data API는 별도 서비스다. Data API를 사용하지 않아도 인증과 파일 기능을 사용할 수 있다. 근거: [Supabase 구조](https://supabase.com/docs/guides/getting-started/architecture).

## 생성 화면에서 논의한 값

| 옵션 | 권장 방향 | 실제 상태 |
| --- | --- | --- |
| Region | 한국 사용자를 기준으로 Seoul 등 구체적 리전 검토, 서버 위치와 함께 결정 | 미확인 |
| Enable Data API | OFF | 미확인 |
| Automatically expose new tables | OFF | 미확인 |
| Enable automatic RLS | 자동 생성 옵션은 OFF, 필요한 테이블 정책은 migration으로 명시 | 미확인 |
| Database password | 충분히 강한 값을 비밀 저장소에서 관리 | 값 미조회 |

자동 RLS 생성 옵션을 끄는 것은 기존 RLS나 Storage 정책을 모두 해제한다는 뜻이 아니다. Data API 사용 여부가 바뀌면 노출 스키마·grants·RLS를 함께 재검토한다.

## Data API OFF의 정확한 의미

- Supabase의 자동 테이블 REST API를 사용할 수 없게 한다.
- `supabase.from(...).select/insert/update/delete`와 Data API를 통한 RPC를 사용하지 않는 구성이다.
- Spring의 PostgreSQL JDBC 접속과 `@Transactional`은 계속 사용할 수 있다.
- Supabase Auth를 이용한 로그인·세션 갱신은 별도 API다.
- 모바일 업무 데이터 경로는 `모바일 → Spring API → PostgreSQL`로 구성한다.

**Data API를 끈 것만으로 특정 백엔드 서버만 DB에 접속하도록 제한되지는 않는다.** 유효한 DB 자격 증명을 가진 다른 프로그램도 네트워크 조건이 허용되면 접속할 수 있다.

근거: [Data API 비활성화](https://supabase.com/docs/guides/api/securing-your-api#disable-the-data-api), [DB 연결 보안](https://supabase.com/docs/guides/database/secure-data).

## DB 접속 통제

1. DB 접속 문자열·비밀번호는 서버와 허용한 운영 도구에서만 보관한다.
2. 모바일 앱은 업무 DB API를 호출하지 않고 Spring API를 호출한다.
3. 업무 실행 역할에는 필요한 테이블·명령 권한만 부여하고, migration 권한을 분리하는 것을 기본안으로 한다.
4. 접속 위치까지 제한하려면 Network Restrictions에서 백엔드의 고정 출발 IP와 필요한 관리 경로를 허용한다. 호스팅의 고정 IP·IPv4/IPv6 조건을 먼저 확인한다.
5. 허용 IP를 설정해도 DB 인증은 필요하다. Supabase 내부 Auth·Storage의 데이터 처리를 모두 Spring 경유로 바꾸는 설정은 아니다.

근거: [Network Restrictions](https://supabase.com/docs/guides/platform/network-restrictions).

## JDBC 연결 방식

지속 실행되는 Spring 서버는 direct connection을 우선 검토한다. 호스팅이 IPv4 전용이면 session pooler를 대안으로 검토한다. transaction pooler는 prepared statement·세션 상태·migration 호환성을 확인하지 않고 선택하지 않는다.

- Dashboard의 실제 연결 정보를 기준으로 JDBC URL·계정·TLS를 설정한다.
- 서버 인스턴스 수 × HikariCP 최대 연결 수와 worker·migration의 연결 사용량을 DB 한도 안에서 계산한다.
- Flyway는 direct connection을 우선 검토하고, 대체 경로가 필요하면 실제 migration 동작을 확인한다.
- 연결 문자열에 들어간 비밀번호를 로그·문서·모바일 번들에 노출하지 않는다.

근거: [Supabase PostgreSQL 연결](https://supabase.com/docs/guides/database/connecting-to-postgres).

## Auth 설정

- Google 공급자와 iOS·Android 클라이언트 설정을 확인한다. 웹 기반 OAuth 방식이면 redirect/deep link도 플랫폼별로 등록한다.
- Spring 검증은 비대칭 JWT signing key + JWKS를 기본안으로 한다. 실제 프로젝트의 signing key·issuer·audience를 확인한다.
- 모바일에는 Supabase URL과 publishable key를 사용할 수 있다. 이것을 서버 비밀 키와 혼동하지 않는다.
- `secret`/`service_role` 키, DB 비밀번호, Google client secret은 모바일에 넣지 않는다.
- 인증 계정과 프로필 초기화·탈퇴는 별도 실패 경계를 가진다. [Backend 규칙](../BACKEND_AGENT/README.md)을 따른다.

근거: [JWT 검증](https://supabase.com/docs/guides/auth/jwts), [Google 로그인](https://supabase.com/docs/guides/auth/social-sign-in/auth-google).

## Storage 설정

- 버킷·파일 경로·공개 여부는 콘텐츠의 공개 범위에 맞춰 정한다. 현재 버킷은 생성·검증하지 않았다.
- 비공개 파일은 서버 권한 확인 후 서명 URL 등으로 접근하게 하는 방식을 검토한다.
- 모바일의 직접 업로드가 필요하면 별도 Storage 정책 또는 제한된 서명 업로드 계약을 만든다.
- 서버의 고권한 키는 Storage RLS를 우회할 수 있으므로 서버에서 파일 접근 권한을 확인한다.
- 파일 업로드와 DB 행 저장은 같은 JDBC 트랜잭션이 아니다. 실패 시 재처리·고아 파일 정리를 설계한다.

근거: [Storage 접근 제어](https://supabase.com/docs/guides/storage/security/access-control).
