import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator } from './src/app/navigation/AppNavigator';
import { PreviewLayout } from './src/shared/ui/PreviewLayout';
import { StartupBoundary } from './src/shared/ui/StartupBoundary';

export default function App() {
  return (
    <SafeAreaProvider>
      <PreviewLayout />
      <StartupBoundary><AppNavigator /></StartupBoundary>
    </SafeAreaProvider>
  );
}
