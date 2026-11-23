import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../shared/theme/ThemeProvider';
import { useReturnFocus } from '../../shared/ui/useReturnFocus';
import { PolicyArticle, policyResponseTarget } from './PolicyArticle';
import { ResponsesPanel } from './ResponsesPanel';
import { useResponseScope } from './ResponseProvider';

type PolicyArticleScreenProps = { onBack: () => void; active?: boolean };

export function PolicyArticleScreen({ onBack, active = true }: PolicyArticleScreenProps) {
  const scope = useResponseScope();
  return <ScopedPolicyArticleScreen key={scope?.scope} onBack={onBack} active={active} />;
}

function ScopedPolicyArticleScreen({ onBack, active }: PolicyArticleScreenProps) {
  const { colors } = useTheme();
  const [responses, setResponses] = useState(false);
  const openResponses = useReturnFocus(active !== false && !responses);
  return <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
    <PolicyArticle onBack={onBack} active={active} backLabel="이전 화면으로 돌아가기"
      onResponses={() => openResponses(() => setResponses(true))} />
    {responses && <ResponsesPanel target={policyResponseTarget} active={active} onClose={() => setResponses(false)} />}
  </SafeAreaView>;
}
