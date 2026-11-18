import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { render, screen, userEvent } from '@testing-library/react-native';
import { Pressable, Text } from 'react-native';

import { ExplanationSection } from '../../features/article/ExplanationSection';
import { createMockExplanationSource } from '../../features/article/data/mockExplanationSource';

const Stack = createNativeStackNavigator<{ First: undefined; Second: undefined }>();
const source = createMockExplanationSource({ delayMs: 0 });
const preference = { scopeKey: 'A:1', status: 'ready' as const, level: 'middle' as const };
it('다른 화면에서 기존 기사 인스턴스로 뒤로 복귀하면 임시 선택을 유지한다', async () => {
  await render(<NavigationContainer><Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="First">{({ navigation }) => <>
      <ExplanationSection articleId="example-latest-rates" source={source} preference={preference} />
      <Pressable role="button" onPress={() => navigation.navigate('Second')}><Text>다음 화면</Text></Pressable>
    </>}</Stack.Screen>
    <Stack.Screen name="Second">{({ navigation }) => <Pressable role="button" onPress={() => navigation.goBack()}>
      <Text>기존 기사로 뒤로 복귀</Text>
    </Pressable>}</Stack.Screen>
  </Stack.Navigator></NavigationContainer>);
  const user = userEvent.setup();
  await user.press(screen.getByRole('radio', { name: '고등학생' }));
  await user.press(screen.getByRole('button', { name: '다음 화면' }));
  await user.press(screen.getByRole('button', { name: '기존 기사로 뒤로 복귀' }));
  expect(screen.getByRole('radio', { name: '고등학생' })).toBeChecked();
  expect(screen.getByRole('heading', { name: '고등학생 수준 설명' })).toBeVisible();
});
