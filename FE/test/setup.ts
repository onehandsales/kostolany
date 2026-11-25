import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import { NativeEditorMock as mockNativeEditorView, nativeEditorCommands as mockNativeEditorCommands } from './nativeEditorMock';

// Jest에는 네이티브 화면 여백이 없어 라이브러리의 공식 공급부 대역을 사용한다.
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

// 리치텍스트의 native view 경계만 대체해 실제 JS wrapper와 편집기 이벤트 계약을 검증한다.
jest.mock('../node_modules/react-native-enriched-html/lib/module/spec/EnrichedTextInputNativeComponent', () => ({
  __esModule: true, default: mockNativeEditorView, Commands: mockNativeEditorCommands,
}));
