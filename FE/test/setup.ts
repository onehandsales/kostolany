import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

// Jest has no native window insets; use the library's own provider mock.
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
