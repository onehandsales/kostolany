# Kotlin·Spring Boot 코드 규칙

기준일: 2026-11-20. [공통 규칙](../COMMON/ENGINEERING_RULES.md)의 필수·예외·완료 기준을 따른다.

## BE-KT-001 — 재현 가능한 빌드와 설정

**대상:** Backend 초기화, 의존성·컴파일러·빌드·설정 변경.

- Gradle Kotlin DSL과 Gradle Wrapper를 사용한다.
- JDK·Kotlin·Spring Boot·JPA/Hibernate·테스트 라이브러리는 함께 호환되는 버전으로 고정한다. 최신 번호만 따로 조합하지 않는다.
- Spring Boot의 dependency management를 우선하고 개별 override에는 이유를 남긴다.
- `kotlin-spring` 플러그인으로 Spring proxy 대상의 `final` 제약을 처리한다.
- JPA를 쓰면 선택한 Kotlin/JPA 버전에 맞게 no-arg 생성자와 entity proxy에 필요한 open 설정을 확인한다.
- Kotlin용 JSON 모듈과 nullability 설정을 실제 선택한 Spring/Jackson 버전에 맞춘다.

- 버전 선택 시 JDK toolchain, Kotlin·Spring Boot·Gradle·JDBC driver·Flyway·테스트 도구와 운영 PostgreSQL의 호환성을 기록한다. 동적 버전과 `latest` 태그를 사용하지 않는다.
- 환경 설정은 타입과 필수 여부·단위·기본값·허용 범위를 정의한다. 연결 비밀은 환경 또는 비밀 저장소에서 주입하고 저장소·로그에 기록하지 않는다.
- 검사 도구와 실행 task는 초기화 시 실제 build 설정과 연결하고 [품질 규칙](../COMMON/QUALITY_AND_WORKFLOW.md)의 실행 표에 등록한다.

**금지·예외:** 버전 override는 대상·호환 근거·회귀 검증을 남긴 경우만 허용한다. 환경마다 임의로 다른 컴파일러·포맷 설정을 사용하지 않는다.

**검증·완료:** Wrapper 기반 컴파일·테스트·포맷 검사가 재현되어야 한다. 필수 설정 누락·잘못된 범위는 비밀 값을 출력하지 않고 시작 단계에서 실패해야 한다. 현재 문서에 명령을 적는 것으로 도구 설치·검사 통과를 대신하지 않는다.

근거: [Spring Boot Kotlin 지원](https://docs.spring.io/spring-boot/reference/features/kotlin.html).

## BE-KT-002 — 타입·상태·함수의 책임

**대상:** 운영 코드와 직접 작성하는 테스트·도구 코드.

- 변경할 이유가 없으면 `val`을 사용한다. 불필요한 가변 상태와 전역 상태를 만들지 않는다.
- nullable은 “정말 없을 수 있음”을 표현할 때만 사용한다. 외부 데이터가 잘못됐다고 모두 빈 문자열·0으로 바꾸지 않는다.
- `!!`로 null 문제를 덮지 않는다. 외부 입력은 경계에서 검증하고, 필수 내부 값은 이유를 가진 예외로 처리한다.
- DTO·값 객체에는 `data class`를 사용할 수 있다. JPA entity는 기본적으로 일반 class로 작성한다.
- entity의 `equals`·`hashCode`·`toString`이 지연 로딩·순환 참조·ID 변경에 영향을 받지 않게 한다.
- 상태 값은 의미 있는 타입으로 표현한다. enum 변경이 DB·API·기존 앱에 주는 영향을 검토한다.
- 긴 `let`·`run`·`apply` 중첩보다 읽기 쉬운 이름과 작은 함수를 우선한다.
- 정확한 금액 계산이 필요해질 경우 `BigDecimal` 또는 명시적인 최소 화폐 단위를 사용한다. 모의투자용 모델을 미리 추가하지 않는다.
- 시간은 의미에 맞게 `Instant`·`LocalDate` 등을 사용한다. 테스트가 현재 시각에 좌우되면 `Clock`을 주입한다.

- API의 입력 DTO, 업무 명령, 저장 Entity, 응답 DTO의 책임을 구별한다. 단순 전달에 동일 객체를 여러 번 복제하지 않되 외부·저장 타입을 공개 계약으로 노출하지 않는다.
- 함수 이름은 수행하는 작업과 결과를 드러내고, 서로 다른 권한·트랜잭션·재시도 단위의 작업은 분리한다. 줄 수만 맞추기 위한 분할보다 하나의 업무 책임과 독립적인 테스트 가능성을 기준으로 한다.
- 알 수 없는 상태 값과 잘못된 외부 입력은 명시적으로 거절하거나 계약에 정한 fallback을 사용한다. 예외를 `null`, 빈 목록, 성공 값으로 바꾸어 숨기지 않는다.
- 오류를 변환할 때 원인 예외를 보존하고, 공개 응답용 코드와 내부 진단 정보를 구분한다. 재시도 가능 여부를 예외 문자열 비교로 결정하지 않는다.

**검증·완료:** null·빈 값·최솟값·최댓값·알 수 없는 상태·시간 경계를 관련 정책 테스트로 확인한다. 허용하지 않은 가변 공유 상태, 강제 null 해제, 의미를 숨기는 fallback은 0건이어야 한다. 예외는 공통 절차로 기록한다.

## BE-KT-003 — Spring·JPA 실행 경계

**대상:** Controller·service·Entity·비동기 실행과 설정 바인딩.

- 생성자 주입을 기본으로 한다. 서비스 의존성을 숨기는 필드 주입을 피한다.
- HTTP Controller는 얇게 유지하고 application service가 사용자 흐름을 담당한다.
- 외부 요청은 DTO와 Bean Validation으로 검증한다. Kotlin annotation의 적용 위치를 명시하고, 예를 들어 `@field:NotBlank`가 실제 검증되는지 테스트한다.
- 파라미터 검증 실패와 업무 상태 충돌을 구분하고 API 계약에 정의한 오류로 변환한다.
- `@RestControllerAdvice` 등 공통 경계에서 오류 응답을 일관되게 만든다.
- 설정은 환경별 typed configuration으로 받고 필수 누락은 시작 시 알 수 있게 한다.
- HTTP·JPA entity·Supabase SDK 타입이 서비스 외부 계약에 새지 않도록 한다.

### JPA와 트랜잭션

- 쓰기 유스케이스의 공개 application 메서드에 `org.springframework.transaction.annotation.Transactional`을 사용한다.
- entity를 응답 DTO로 사용하거나 lazy collection을 무분별하게 로그에 출력하지 않는다.
- 연관관계의 fetch·cascade·삭제 동작은 필요한 것만 지정한다. 모든 관계에 cascade를 붙이지 않는다.
- 목록 pagination과 collection fetch join을 함께 사용할 때 쿼리와 메모리 사용을 확인한다.
- 업무상 필요한 unique·FK·check를 애플리케이션 검증과 함께 DB에서 보장한다.
- 개발 편의를 위한 Hibernate 자동 스키마 변경을 공유·운영 DB에 사용하지 않는다. [DB 규칙](../DB_AGENT/README.md)을 따른다.

### 비동기와 외부 호출

- 초기 서버 기본안은 Spring MVC + blocking JPA다. 이 구성을 비동기 서버로 설명하지 않는다.
- imperative 트랜잭션이 coroutine·새 thread·`@Async` 경계를 자동으로 따라간다고 가정하지 않는다.
- `GlobalScope`나 추적되지 않는 백그라운드 작업으로 생성·저장을 처리하지 않는다.
- RSS·AI·Storage 호출은 timeout·제한된 재시도·오류 분류를 가진 adapter에서 수행한다.
- 프롬프트·모델·생성 정책은 버전으로 식별한다. 모델 결과를 검증하지 않고 바로 게시하지 않는다.

**검증·완료:** 실제 HTTP 경계의 Bean Validation, Entity JSON 노출 방지, lazy loading을 포함한 조회, Spring proxy를 통한 트랜잭션 적용을 검증한다. 비동기 실행은 executor 크기·작업 제한·종료 처리·오류 관측·재처리 방법을 가진다. coroutine·reactive 전환은 전체 I/O·트랜잭션 모델의 변경 근거와 검증 없이 부분 적용하지 않는다.

## BE-DOC-001 — 모든 클래스·메서드·함수의 한글 주석

**대상:** 직접 작성하는 운영 코드, 테스트 코드, 빌드 로직·스크립트의 선언. Kotlin 외 언어로 작성한 보조 코드도 같은 목적과 누락 검사 원칙을 따른다.

- class는 `PascalCase`, 함수·속성은 `camelCase`, 상수는 `UPPER_SNAKE_CASE`를 사용한다.
- `Manager`, `Util`처럼 책임이 불분명한 이름보다 `ArticlePublicationService`처럼 일을 드러내는 이름을 쓴다.
- 모든 class·interface·enum class·object와 직접 선언한 함수·메서드에 최소 한 줄의 한글 설명을 작성한다. 공개 여부와 무관하며 DTO·Entity·테스트 클래스, private·local·extension·override·abstract 함수도 포함한다.
- Kotlin은 선언 바로 위의 KDoc을 기본으로 한다. 첫 설명 문장은 한글 한 문장·물리적 한 줄로 쓰고, 어노테이션이 있으면 그 위에 둔다. 복잡한 계약은 아래에 매개변수·반환·예외·동시성 설명을 추가할 수 있다.
- 주석은 책임과 의도를 설명한다. `기사 서비스`, `처리한다`, 함수명을 한글로 옮긴 문장만으로 끝내지 않는다. 권한·원자성·상태 변화·외부 실패 중 중요한 제약을 포함한다.
- 클래스 주석은 주 생성자의 역할을 함께 설명할 수 있다. 직접 선언한 보조 생성자·사용자 정의 getter/setter·init 블록에는 별도 한글 설명을 붙인다. 코드 없이 자동 생성되는 생성자·접근자·data class 메서드는 개별 주석 대상이 아니다.
- 이름 있는 함수형 변수의 람다와 익명 클래스는 선언·생성 위치에 한글 설명을 둔다. 인라인 `map`·`let` 등의 단순 콜백은 별도 주석을 강제하지 않는다. 그 안에 독립적인 업무 판단·부수 효과가 생기면 이름 있는 함수로 분리한다.
- 테스트 함수도 무엇을 어떤 조건에서 검증하는지 한 줄로 설명한다. 동작 변경 시 해당 주석을 같은 변경에서 갱신한다.

다음은 주석 위치와 의미를 설명하는 코드 예시이며 서비스 정책을 확정하지 않는다.

```kotlin
/** 저장된 수정 버전과 요청 버전을 비교해 동시 수정 충돌을 판별한다. */
class RevisionPolicy {
    /** 요청이 현재 버전을 기준으로 작성되었으면 수정 가능 여부를 참으로 반환한다. */
    fun matches(current: Long, requested: Long): Boolean = current == requested
}
```

**금지·예외:** 저작 코드의 `override`나 private 선언이라는 이유로 생략하지 않는다. 외부 라이브러리·자동 생성 파일만 생성 경로와 생성 근거를 명시해 제외한다. 파일 전체·테스트 폴더 전체를 일괄 제외하지 않는다. 상위 문서의 “코드 반복 주석 지양”은 의미 있는 설명을 쓰라는 뜻이며 주석 생략의 근거가 아니다.

**검증 방법:** 초기화 시 AST 기반 검사 또는 동일하게 선언을 식별하는 검사로 대상 선언과 인접 주석을 연결한다. 단순 텍스트 검색으로 문자열 안의 한글을 주석으로 인정하지 않는다. 주석 없음·빈 주석·한글 설명 없음은 파일·선언·행 번호와 함께 실패시킨다.

**완료 조건:** 자동 생성 제외 목록 이외 누락 0건, 모든 첫 설명 문장이 한 줄인 상태여야 한다. 검사기 자체에 클래스·private·override·테스트·보조 생성자·accessor·익명 함수형 값·어노테이션·자동 생성 제외의 통과/실패 fixture를 둔다. 설명의 정확성은 리뷰에서 확인한다. 검사기가 연결되기 전에는 “한글 주석 자동 검사 완료”라고 기록하지 않는다.
