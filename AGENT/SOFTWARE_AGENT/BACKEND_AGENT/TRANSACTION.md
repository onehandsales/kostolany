# 트랜잭션·동시성 규칙

## 소유권과 범위

트랜잭션 경계는 application service가 소유한다. Controller와 순수 domain 정책에서 시작하지 않는다. Spring이 관리하는 동일 DataSource·transaction manager에 참여하는 JPA/JDBC 작업을 원자적으로 묶는다.

Supabase에 PostgreSQL이 있다는 사실은 이 원칙을 바꾸지 않는다. Spring이 JDBC로 접속하므로 일반 PostgreSQL과 같은 방식으로 트랜잭션을 관리한다.

| 작업 | 트랜잭션 관계 |
| --- | --- |
| 같은 업무 흐름의 JPA 저장·갱신 | 같은 transaction manager에 참여하면 함께 커밋·롤백 |
| Supabase Auth HTTP 요청 | JDBC 트랜잭션에 포함되지 않음 |
| Supabase Storage 업로드·삭제 | JDBC 트랜잭션에 포함되지 않음 |
| RSS·AI HTTP 호출 | JDBC 트랜잭션에 포함되지 않음 |
| 별도 thread·프로세스의 작업 | 기존 imperative 트랜잭션 자동 전파 없음 |

## 어노테이션 규칙

- `org.springframework.transaction.annotation.Transactional`을 사용한다. 이름은 `@Transaction`이 아니다.
- 쓰기 메서드의 경계를 명시하고, 필요한 읽기 서비스에는 `@Transactional(readOnly = true)`를 사용한다.
- Spring proxy를 통과하는 공개 메서드 호출을 기본으로 한다. 같은 객체 내부에서 다른 `@Transactional` 메서드를 호출하는 self-invocation에 의존하지 않는다.
- annotation이 있는 클래스를 직접 `new`로 만들어 트랜잭션이 적용됐다고 가정하지 않는다.
- 기본 전파 `REQUIRED`를 출발점으로 한다. `REQUIRES_NEW`는 외부 작업의 롤백과 다른 커밋이 필요한 이유 및 연결 풀 영향을 검토한 경우에만 사용한다.
- 별도 설정이 없으면 Spring 기본 롤백은 `RuntimeException`·`Error` 기준이다. checked exception까지 롤백해야 하면 `rollbackFor` 또는 프로젝트 전역 정책을 명시하고 테스트한다.
- 예외를 잡아 성공처럼 반환하면 원래 의도한 롤백이 되지 않을 수 있다. 실패를 정상 응답으로 숨기지 않는다.
- `readOnly`는 사용자 권한 검증이나 모든 쓰기 차단을 대신하지 않는다.

근거: [Spring @Transactional](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html), [롤백 규칙](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/rolling-back.html).

## 외부 작업은 짧은 DB 작업과 분리

콘텐츠 생성은 다음 흐름을 기본안으로 한다.

```text
짧은 트랜잭션: 생성 작업 확보·상태 기록
        ↓ commit
트랜잭션 밖: RSS 본문 확보·AI 호출·응답 검증
        ↓
짧은 트랜잭션: 콘텐츠·수준별 설명 저장 + 작업 성공 상태
```

네트워크 응답을 기다리는 동안 DB 연결·잠금을 오래 잡지 않는다. 생성 실패 상태는 실패한 트랜잭션이 끝난 뒤 별도의 짧은 작업으로 기록한다. 한 클래스의 self-invocation을 피하도록 별도 service 경계나 필요 시 `TransactionTemplate`을 사용한다.

콘텐츠 저장과 후속 작업 전달을 함께 보장해야 한다면 같은 트랜잭션에 작업 행 또는 outbox를 기록한다. 메모리 이벤트나 `afterCommit` callback만으로 서버 장애 시 전달을 보장했다고 하지 않는다. 별도 메시지 브로커는 필수 조건이 아니다.

## 이 앱의 원자성 기본안

| 작업 | 함께 성공해야 하는 범위 |
| --- | --- |
| 콘텐츠 게시 | 공통 기사 정보·필요한 수준별 설명·게시 상태 |
| 좋아요·북마크 등록 | 사용자와 기사에 대한 관계 저장, 저장형 집계가 있으면 집계 일관성 |
| 프로필 초기화 | 인증 사용자와 앱 프로필의 중복 없는 연결 |
| 작업 성공 처리 | 생성 결과와 작업 성공 기록의 불일치 방지 |

여러 기능이 한 작업에 참여하면 조율 owner와 같은 트랜잭션 참여 여부를 계약에 기록한다. 각 repository에서 독립된 새 트랜잭션을 열어 원자성을 깨지 않는다.

## 중복과 동시성

- `이미 존재하는지 조회 → 없으면 저장`만으로 중복을 막지 않는다. 합의된 업무 키에 DB unique 제약을 둔다.
- 좋아요·북마크 등록·해제는 반복 호출해도 동일한 최종 상태가 되도록 설계한다.
- 집계 수를 저장한다면 읽어온 값에 1을 더해 덮어쓰는 방식 대신 원자적 갱신·재계산 등 일관성 전략을 정한다.
- optimistic version·조건부 update·row lock은 실제 충돌 지점에 맞춰 선택한다. 분산 락을 기본 도입하지 않는다.
- 중복 또는 deadlock 후 PostgreSQL 트랜잭션이 실패한 상태에서 계속 쿼리하지 않는다. 필요하면 전체 작업을 경계 밖에서 제한적으로 재시도하거나 적절한 upsert를 사용한다.
- 격리 수준을 일괄 `SERIALIZABLE`로 올리지 않는다. 필요한 불변식과 재시도 비용을 근거로 선택한다.
- 앱이 timeout을 받았어도 서버에서 커밋했을 수 있다. 쓰기 재시도 결과를 계약과 테스트로 확인한다.

## 검증

실제 Spring 서비스 프록시와 격리 PostgreSQL을 사용해 중간 실패의 전체 롤백, 같은 요청 재실행, 동시 중복 요청, 카운터 갱신을 검증한다. 단순히 `@Transactional`이 붙어 있거나 mock 함수가 호출됐다는 이유로 원자성 검증을 완료하지 않는다.
