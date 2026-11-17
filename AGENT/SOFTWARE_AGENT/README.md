# Software 구성

기준일: 2026-11-17. 이 문서는 목표 구성이다. 실제 구현 상태는 [현황](COMMON/IMPLEMENTATION_STATUS.md)을 따른다.

## 확정 방향과 구현 기본안

| 구분 | 확정 방향 | 구현 기본안 또는 미정 |
| --- | --- | --- |
| 서버 | Kotlin + Spring Boot | Spring MVC, Spring Security, Spring Data JPA |
| DB | Supabase PostgreSQL, 서버에서 접근 | PostgreSQL JDBC, HikariCP, Flyway |
| 인증 | Supabase Auth에 Google 로그인 위임 | Spring Security Resource Server로 Supabase JWT 검증 |
| 트랜잭션 | Spring의 `@Transactional` | 명령을 수행하는 application service가 경계 소유 |
| 모바일 | React Native, iOS + Android | TypeScript strict, Expo 사용 검토, TanStack Query |
| 파일 | Supabase Storage | 버킷 공개 여부·파일 접근 계약은 용도별 결정 |
| 서버 구조 | 단순한 구성으로 시작 | 하나의 배포 단위인 modular monolith |
| 빌드·검증 | 테스트 코드를 작성하고 검증 | Gradle Kotlin DSL, JUnit Jupiter, MockK, Testcontainers |
| 호스팅·버전 | 아직 선택하지 않음 | 초기화 시 공식 호환성을 확인하고 버전 고정 |

세부 도구는 이번 문서에서 제안한 출발점이다. 회사별 기술을 전부 도입하거나, 문서만으로 도구가 설치됐다고 표현하지 않는다.

## 요청의 경로

```text
React Native ── 로그인·세션 갱신 ──> Supabase Auth
     │
     └── Supabase access token + 업무 요청 ──> Spring Boot
                                                │
                                                ├── JPA/JDBC ──> Supabase PostgreSQL
                                                ├── 파일 처리 ──> Supabase Storage
                                                └── RSS·AI 공급자
```

- 기사·좋아요·북마크 등 업무 데이터는 Spring API로 처리한다.
- Google에서 받은 ID 토큰과 Supabase가 발급한 앱용 access token을 구분한다. 업무 API에는 Supabase access token을 사용한다.
- Supabase Auth를 쓴다고 Spring에서 별도의 access/refresh token 체계를 다시 만들지 않는다.
- Auth는 신원·세션을, Spring은 서비스 권한·업무 규칙을 담당한다.
- 모바일의 Storage 직접 업로드가 필요해지면 서명 URL 등 별도 계약을 만든다. 현재 직접 업로드 기능은 확정하지 않았다.

## 단순하게 유지할 경계

- 서버는 기능별 패키지로 나누되 배포 단위는 하나로 시작한다.
- 다른 기능의 DB 테이블을 임의로 쓰지 않고 소유 기능의 공개 application 기능을 호출한다.
- 외부 RSS·AI·Storage는 adapter 경계를 둔다. 단순 서비스마다 interface와 구현체를 기계적으로 만들지 않는다.
- Kafka·Redis·Kubernetes·MSA·CQRS·이벤트 소싱은 초기 필수 요소가 아니다. 문제와 도입 효과가 생기면 결정한다.
- API 계약, 중요한 테스트, 실패 복구, 실행 로그는 처음부터 갖춘다.

## 배포 구분

React Native 앱은 iOS·Android 빌드와 기기 설치·스토어 배포가 필요하다. Vercel의 웹 배포를 네이티브 앱 배포 완료로 취급하지 않는다. 도메인은 필요하면 백엔드 API나 공개 안내 페이지에 사용하며, 구매처와 서버 호스팅은 별개로 결정한다.

백엔드 지역은 사용자와 DB 지연을 고려한다. 실제 Supabase 리전은 아직 확인하지 않았다. Docker·CI 구성과 호스팅 선택은 실행 코드 초기화 이후 진행한다.

## 영역별 문서

- [Backend](BACKEND_AGENT/README.md)
- [DB와 스키마](DB_AGENT/README.md), [Supabase 설정](DB_AGENT/SUPABASE_SETUP.md)
- [모바일](FRONT_AGENT/README.md), [UX](../UXUI_AGENT/README.md)
- [API 계약](COMMON/API_CONTRACT.md), [검증·작업 규칙](COMMON/QUALITY_AND_WORKFLOW.md)
