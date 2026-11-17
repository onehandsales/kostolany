import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StartScreen } from './src/app/StartScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <StartScreen />
    </SafeAreaProvider>
  );
}
