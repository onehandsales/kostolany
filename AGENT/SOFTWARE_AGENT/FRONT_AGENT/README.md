# React Native 모바일 규칙

## 범위와 기술 기본안

iOS·Android용 React Native 앱을 만든다. 사용자용 웹을 함께 만드는 범위가 아니다. Medium 모바일을 읽기 UX 기준으로 삼는다.

- TypeScript `strict`를 기본안으로 한다.
- Expo 사용을 우선 검토하되, Google 로그인·보안 저장소 등 필요한 native library와 빌드 방식의 호환성을 확인한 뒤 확정한다.
- 서버 상태에는 TanStack Query를 기본안으로 검토한다. 화면의 임시 UI 상태와 서버 데이터를 구분한다.
- React Native·Expo·navigation·native module 버전을 함께 검증하고 lockfile로 고정한다.

## 기능별 구조

```text
src/
  app/          # 앱 진입, navigation, provider
  features/
    auth/
    feed/
    article/
    bookmark/
    settings/
  shared/       # API client, UI token, 공통 컴포넌트
```

이는 코드 구조 기본안이다. Expo Router를 채택하면 실제 route 디렉터리 규칙에 맞춘다. 아직 존재하지 않는 앱 코드를 구현 완료로 기록하지 않는다.

- 화면에 HTTP·세션 갱신·파싱 로직을 몰아넣지 않는다.
- API client와 기능별 query/mutation hook을 분리한다.
- 같은 서버 데이터를 여러 전역 저장소에 중복 보관하지 않는다.
- 업무 DB 접근용 `supabase.from`을 사용하지 않는다. Supabase client는 인증과 별도 계약이 있는 파일 기능에 한정한다.

## 로그인과 세션

1. Google 로그인 후 Supabase Auth 세션을 받는다.
2. 앱 API client가 Supabase access token을 Spring 요청에 붙인다.
3. Supabase SDK를 중심으로 refresh를 관리하며 별도의 앱 JWT 발급 체계를 만들지 않는다.

- 선택한 Google 로그인 방식에 맞게 iOS·Android 설정을 모두 검증한다. native module이 필요한 경우 Expo Go만으로 검증할 수 있다고 가정하지 않는다.
- 앱 재실행·foreground 복귀·로그아웃에서 세션과 화면 상태를 동기화한다. AppState listener가 중복 등록되지 않게 한다.
- 로그인 callback·redirect 실패, 취소, 네트워크 단절을 서로 다른 결과로 처리한다.
- token 영속 저장은 Keychain·Keystore 기반의 검증된 보안 저장소를 사용한다. AsyncStorage에 민감 토큰을 평문 저장하는 예제를 그대로 제품 규칙으로 복사하지 않는다.
- SecureStore 등 adapter를 사용하면 세션 크기 제한·삭제·복원·오류 동작까지 확인한다.
- refresh 동시 실행을 조율하고 `401 → refresh → 재요청`이 무한 반복되지 않게 한다. 쓰기 재시도는 API의 멱등성 계약을 따른다.
- 일시적인 네트워크 오류만으로 계정을 삭제하거나 확정 로그아웃 처리하지 않는다.
- 로그아웃·계정 전환 때 사용자별 query cache를 정리해 다른 사람의 북마크가 보이지 않게 한다.

근거: [Supabase React Native Auth](https://supabase.com/docs/guides/auth/quickstarts/react-native), [React Native 보안](https://reactnative.dev/docs/security).

## 데이터와 화면 상태

- 피드 query key에 정렬·설명 수준 등 실제 조회 조건을 포함한다. 개인 데이터에는 사용자 식별 범위를 포함한다.
- cursor는 서버 계약대로 사용하고 중복 요청·오래된 응답·끝 페이지를 처리한다.
- 좋아요·북마크 optimistic update를 쓰면 실패 시 복구하고 서버 결과와 재동기화한다.
- 설명 수준 전환 시 선택 표시와 본문·예시가 같은 버전을 가리키게 한다. 이전 응답이 최신 선택을 덮어쓰지 않게 한다.
- 첫 로딩, 다음 페이지 로딩, 빈 결과, 오류·재시도, 오프라인 상태를 구분한다.
- 기존 콘텐츠가 있는 상태의 갱신 실패 때문에 읽던 본문을 불필요하게 지우지 않는다.
- 동적 리스트는 FlatList 등 가상화 도구를 사용하고 안정적인 key·이미지 크기·렌더링 비용을 확인한다.
- 앱 복귀·네트워크 회복 시 재조회 정책을 정하고 데이터가 무조건 최신이라고 표시하지 않는다.

## 모바일 UX와 접근성

- Safe Area, OS 글자 크기, 긴 한국어 제목, 스크린리더 label을 고려한다.
- 작은 터치 영역과 색상만으로 구분하는 선택 상태를 피한다.
- 뒤로 가기, 읽던 위치 복원, 로그인 후 원래 행동으로 복귀를 설계한다.
- 본문과 출처 링크를 실제 작은 화면에서 확인한다. 큰 웹 화면을 축소한 것으로 모바일 검증을 대신하지 않는다.
- 공개 읽기와 로그인 요구 범위는 [제품 정책](../../PROJECT_SCOPE.md)을 확정한 뒤 반영한다.

## 테스트·배포

React Native Testing Library 등으로 사용자 행동과 오류 상태를 검증하는 것을 기본안으로 한다. 기능이 준비되면 로그인 → 읽기 → 반응 저장의 핵심 흐름을 두 플랫폼에서 확인한다.

개발 빌드, release 빌드, 실제 기기 설치, 스토어 제출·심사는 구분한다. Vercel 웹 배포나 한 플랫폼 시뮬레이터 성공을 iOS·Android 출시 완료로 기록하지 않는다.

관련 문서: [UX](../../UXUI_AGENT/README.md), [API 계약](../COMMON/API_CONTRACT.md), [공통 검증](../COMMON/QUALITY_AND_WORKFLOW.md).
