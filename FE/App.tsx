import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator } from './src/app/navigation/AppNavigator';
import { PreviewLayout } from './src/shared/ui/PreviewLayout';

export default function App() {
  return (
    <SafeAreaProvider>
      <PreviewLayout />
      <AppNavigator />
    </SafeAreaProvider>
  );
}
