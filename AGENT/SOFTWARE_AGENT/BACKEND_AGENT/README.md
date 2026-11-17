# Backend 규칙

## 기본 구조

Kotlin + Spring Boot로 하나의 배포 단위를 만든다. 기능별로 책임을 나누는 modular monolith를 기본안으로 한다. 실제 MSA를 구축했다고 표현하지 않는다.

```text
<base-package>/
  account/       # Supabase 신원과 앱 사용자 연결
  article/       # 콘텐츠, 설명 수준, 게시·조회
  reaction/      # 좋아요, 북마크, 조회 이벤트
  ingestion/     # RSS·AI 작업 조율과 재처리
  shared/        # HTTP 오류·보안 설정 등 필요한 공통 기반
```

패키지명과 코드 루트는 초기화 때 고정한다. 각 기능에 필요한 경우 다음 역할을 둔다. 빈 계층을 전부 미리 만들지 않는다.

| 역할 | 책임 |
| --- | --- |
| `api` | Controller, 요청·응답 DTO, 입력 검증과 HTTP 변환 |
| `application` | 사용자 흐름, 권한, 트랜잭션 경계, 외부 작업 조율 |
| `domain` | 프레임워크 없이 검증할 가치가 있는 순수 업무 정책 |
| `infrastructure` | JPA persistence, RSS·AI·Storage adapter |

## 의존 규칙

- Controller는 application service를 호출한다. 직접 JPA repository나 외부 AI를 호출하지 않는다.
- 같은 기능의 application service가 Spring Data JPA repository를 사용하는 실용적인 구성을 허용한다. 모든 repository에 별도 port를 강제하지 않는다.
- 도메인 정책을 독립시켜야 하는 경우에만 repository port나 별도 domain model을 도입한다. 단순 CRUD에서 JPA entity와 똑같은 객체를 반복 생성하지 않는다.
- 순수 `domain` 정책에는 Spring·JPA·HTTP SDK를 넣지 않는다. JPA entity는 persistence 모델로 구분한다.
- 다른 기능의 repository·entity를 직접 수정하지 않는다. 그 기능이 공개한 application 서비스·query 계약을 사용한다.
- 기능 간 공개 계약과 HTTP 응답에는 JPA entity·Hibernate proxy·Supabase SDK 객체를 노출하지 않는다.
- 여러 기능을 조율할 때 책임자를 하나 정하고 순환 의존을 만들지 않는다.
- RSS·AI·Storage adapter는 공급자별 데이터와 오류를 앱에서 사용하는 결과로 변환한다.
- `shared`를 업무 로직을 모으는 공간으로 쓰지 않는다. 재사용되지 않는 코드는 소유 기능 안에 둔다.

## 인증과 권한

1. 모바일이 Supabase Auth에서 발급받은 access token을 Bearer 헤더로 전달한다.
2. Spring Security가 서명·허용 알고리즘·만료·issuer·audience를 검증한다.
3. 검증한 `sub`를 Supabase 인증 사용자 식별자로 사용해 앱 사용자와 연결한다.
4. application service가 해당 작업의 권한과 데이터 소유권을 확인한다.

비대칭 서명 키와 JWKS 검증을 기본안으로 한다. 실제 키 종류를 먼저 확인하고 issuer·JWKS URL·audience를 프로젝트 설정과 맞춘다. legacy HS256 토큰에 JWKS 방식을 그대로 적용하지 않는다.

JWT를 단순 decode한 값, 클라이언트가 보낸 이메일·userId, 수정 가능한 사용자 metadata를 권한 근거로 쓰지 않는다. Supabase의 DB 역할 `authenticated`를 앱 관리자 권한으로 해석하지 않는다.

JWT의 로컬 검증만으로 원격 로그아웃·계정 삭제가 즉시 반영된다고 가정하지 않는다. 즉시 차단이 필요한 작업은 별도 서비스 계정 상태 확인 등 정책을 정한다.

인증 계정과 앱 프로필의 최초 연결은 재시도·동시 요청에도 중복되지 않아야 한다. Supabase Auth 계정 작업과 앱 프로필 쓰기는 하나의 JDBC 트랜잭션이라고 가정하지 않는다.

근거: [Supabase JWT](https://supabase.com/docs/guides/auth/jwts), [Spring Security Resource Server](https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/jwt.html).

## 읽기와 쓰기

- 조회는 필요한 컬럼·페이지 범위만 읽는다. 피드에서 본문 4개 전체를 불필요하게 가져오지 않는다.
- JPA entity를 그대로 JSON으로 내보내지 않고 트랜잭션 안에서 필요한 응답 데이터를 구성한다.
- `open-in-view=false`를 기본안으로 하여 응답 직렬화 중 숨은 DB 조회를 방지한다.
- N+1이나 정렬 비용이 확인되면 projection·fetch 전략·인덱스를 검토한다. 캐시를 먼저 붙여 원인을 가리지 않는다.
- 쓰기 흐름의 원자성·중복 요청·동시성은 [트랜잭션 규칙](TRANSACTION.md)을 따른다.
- 생성·수집은 사용자 조회 요청마다 수행하지 않는다. 저장된 게시 콘텐츠를 읽도록 한다.

## 함께 읽기

- [Kotlin/Spring 규칙](KOTLIN_SPRING.md)
- [트랜잭션](TRANSACTION.md)
- [콘텐츠 파이프라인](CONTENT_PIPELINE.md)
- [DB 규칙](../DB_AGENT/README.md)
- [API 계약](../COMMON/API_CONTRACT.md), [검증](../COMMON/QUALITY_AND_WORKFLOW.md)
