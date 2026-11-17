import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { MainTabs } from './src/app/navigation/MainTabs';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <MainTabs />
    </SafeAreaProvider>
  );
}
