// 새 네이티브 모듈이 없는 개발 빌드도 공유 화면 진입과 링크 복사를 유지한다.
export const loadShareCapture = () => import('react-native-view-shot');
export const loadShareLibrary = () => import('expo-media-library');
