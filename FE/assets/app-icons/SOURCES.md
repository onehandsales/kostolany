# 앱 아이콘 예시 자산

Goal49에서 직접 그린 Kostolany K 기하 도형이다. Medium 로고나 보관 PNG를 추출하지 않았다. 8개 이름은 F60의 온전히 읽히는 선택 이름에 대응하지만 원본 자산과 동일하지 않다. 원본에서 잘린 추가 카드의 이름/전체 개수는 확정하지 않았다.

각 PNG는 1024×1024, RGB, alpha 없음이다. 기본 Wordmark Black과 iOS alternate assets·Android launcher aliases가 같은 파일을 사용한다. 생성 코드와 시각 검증은 Goal49 외부 증거 경로에 보관하며 이는 런타임 의존성이 아니다. UI 미리보기·기기 실제 적용·OS 지원을 분리한다.

## Parity18 시작 자산과 적용 경계

`../start-wordmark.svg`는 보관 S043의 흰 글자·검은 배경·중앙 배치를 참고해 작성한 벡터다. 원본의 독립 워드마크/서체를 확보하지 못해 Georgia bold를 사용했다. 원본 PNG의 픽셀 추출이나 동일 로고가 아니며 글자 폭·획 차이가 남는다. `../start-wordmark.png`는 이 SVG를 로컬 Chrome의 SVG/canvas로 래스터화한 960×240 RGBA 제품 자산이다. 비교 캡처/검증 파일이 아니다. OS 상태바·홈 인디케이터를 포함하지 않는다.

`StartupBoundary`는 이 자산으로 앱 시작 UI를 표시한다. 원본의 표시 시간/인증 자동 이동은 미확인이므로 앱 첫 배치와 이미지 준비 후 전환하는 자체 정책을 사용하고 기존 Home·인증·온보딩 분기를 보존한다. 개발 웹 `?parityStart=hold`는 명시적 비교만 유지하며 일반 실행과 production에는 적용하지 않는다.

app.json의 expo-splash-screen 설정은 같은 PNG·검정 배경·contain을 사용한다(iOS 기본308pt, Android200dp). Expo57의 bundledNativeModules가 요구하는 ~57.0.11 범위의57.0.12를 추가했다. 플러그인 구성 확인은 native 생성/실행 성공이 아니다. [Expo57 공식 splash 문서](https://docs.expo.dev/versions/v57.0.0/sdk/splash-screen/)의 config plugin을 사용하며 실제 standalone cold start/OS 크기·클리핑은21/Q07에서 확인해야 한다.

기존8개 K 아이콘은 변경하지 않았다. 원본 S075의8개 이름/잠금/선택과 대응하나 이미지 동일성은18/Q02 잔여다. 하단 잘린 추가 카드는 이름·전체 개수가 미확인이므로 만들지 않는다. 웹은 OS 아이콘 적용을 지원하지 않으며 native adapter·런처 alias·실제 기기 결과를 구분한다.
