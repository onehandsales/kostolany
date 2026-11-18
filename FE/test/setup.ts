import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

// Jest에는 네이티브 화면 여백이 없어 라이브러리의 공식 공급부 대역을 사용한다.
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
