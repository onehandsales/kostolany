# Kotlin·Spring Boot 코드 규칙

## 초기화 기본안

- Gradle Kotlin DSL과 Gradle Wrapper를 사용한다.
- JDK·Kotlin·Spring Boot·JPA/Hibernate·테스트 라이브러리는 함께 호환되는 버전으로 고정한다. 최신 번호만 따로 조합하지 않는다.
- Spring Boot의 dependency management를 우선하고 개별 override에는 이유를 남긴다.
- `kotlin-spring` 플러그인으로 Spring proxy 대상의 `final` 제약을 처리한다.
- JPA를 쓰면 선택한 Kotlin/JPA 버전에 맞게 no-arg 생성자와 entity proxy에 필요한 open 설정을 확인한다.
- Kotlin용 JSON 모듈과 nullability 설정을 실제 선택한 Spring/Jackson 버전에 맞춘다.

근거: [Spring Boot Kotlin 지원](https://docs.spring.io/spring-boot/reference/features/kotlin.html).

## 언어 사용

- 변경할 이유가 없으면 `val`을 사용한다. 불필요한 가변 상태와 전역 상태를 만들지 않는다.
- nullable은 “정말 없을 수 있음”을 표현할 때만 사용한다. 외부 데이터가 잘못됐다고 모두 빈 문자열·0으로 바꾸지 않는다.
- `!!`로 null 문제를 덮지 않는다. 외부 입력은 경계에서 검증하고, 필수 내부 값은 이유를 가진 예외로 처리한다.
- DTO·값 객체에는 `data class`를 사용할 수 있다. JPA entity는 기본적으로 일반 class로 작성한다.
- entity의 `equals`·`hashCode`·`toString`이 지연 로딩·순환 참조·ID 변경에 영향을 받지 않게 한다.
- 상태 값은 의미 있는 타입으로 표현한다. enum 변경이 DB·API·기존 앱에 주는 영향을 검토한다.
- 긴 `let`·`run`·`apply` 중첩보다 읽기 쉬운 이름과 작은 함수를 우선한다.
- 정확한 금액 계산이 필요해질 경우 `BigDecimal` 또는 명시적인 최소 화폐 단위를 사용한다. 모의투자용 모델을 미리 추가하지 않는다.
- 시간은 의미에 맞게 `Instant`·`LocalDate` 등을 사용한다. 테스트가 현재 시각에 좌우되면 `Clock`을 주입한다.

## Spring 사용

- 생성자 주입을 기본으로 한다. 서비스 의존성을 숨기는 필드 주입을 피한다.
- HTTP Controller는 얇게 유지하고 application service가 사용자 흐름을 담당한다.
- 외부 요청은 DTO와 Bean Validation으로 검증한다. Kotlin annotation의 적용 위치를 명시하고, 예를 들어 `@field:NotBlank`가 실제 검증되는지 테스트한다.
- 파라미터 검증 실패와 업무 상태 충돌을 구분하고 API 계약에 정의한 오류로 변환한다.
- `@RestControllerAdvice` 등 공통 경계에서 오류 응답을 일관되게 만든다.
- 설정은 환경별 typed configuration으로 받고 필수 누락은 시작 시 알 수 있게 한다.
- HTTP·JPA entity·Supabase SDK 타입이 서비스 외부 계약에 새지 않도록 한다.

## JPA와 트랜잭션

- 쓰기 유스케이스의 공개 application 메서드에 `org.springframework.transaction.annotation.Transactional`을 사용한다.
- entity를 응답 DTO로 사용하거나 lazy collection을 무분별하게 로그에 출력하지 않는다.
- 연관관계의 fetch·cascade·삭제 동작은 필요한 것만 지정한다. 모든 관계에 cascade를 붙이지 않는다.
- 목록 pagination과 collection fetch join을 함께 사용할 때 쿼리와 메모리 사용을 확인한다.
- 업무상 필요한 unique·FK·check를 애플리케이션 검증과 함께 DB에서 보장한다.
- 개발 편의를 위한 Hibernate 자동 스키마 변경을 공유·운영 DB에 사용하지 않는다. [DB 규칙](../DB_AGENT/README.md)을 따른다.

## 비동기와 외부 호출

- 초기 서버 기본안은 Spring MVC + blocking JPA다. 이 구성을 비동기 서버로 설명하지 않는다.
- imperative 트랜잭션이 coroutine·새 thread·`@Async` 경계를 자동으로 따라간다고 가정하지 않는다.
- `GlobalScope`나 추적되지 않는 백그라운드 작업으로 생성·저장을 처리하지 않는다.
- RSS·AI·Storage 호출은 timeout·제한된 재시도·오류 분류를 가진 adapter에서 수행한다.
- 프롬프트·모델·생성 정책은 버전으로 식별한다. 모델 결과를 검증하지 않고 바로 게시하지 않는다.

## 이름과 주석

- class는 `PascalCase`, 함수·속성은 `camelCase`, 상수는 `UPPER_SNAKE_CASE`를 사용한다.
- `Manager`, `Util`처럼 책임이 불분명한 이름보다 `ArticlePublicationService`처럼 일을 드러내는 이름을 쓴다.
- 코드만 읽어 알 수 있는 내용을 주석으로 반복하지 않는다. 권한 판단·동시성·외부 실패 처리의 이유를 설명한다.
- 동작과 의미가 같은 포맷 도구를 하나 정해 CI에서 검사한다. ktlint·detekt 도입 범위는 초기화 때 결정한다.
