import { useState } from 'react';

import type { ExplanationPreference } from './explanationTypes';

export function useEntryExplanationPreference(articleId: string, preference?: ExplanationPreference): ExplanationPreference | undefined {
  const key = JSON.stringify([articleId, preference?.scopeKey]);
  const [entry, setEntry] = useState(() => ({ key, value: preference?.status === 'ready' ? preference : null }));
  if (entry.key !== key) {
    setEntry({ key, value: preference?.status === 'ready' ? preference : null });
    return preference;
  }
  // 기사 본문을 기다리는 동안에도 진입 시 확정한 기본값은 이후 저장 응답으로 바꾸지 않는다.
  if (!entry.value && preference?.status === 'ready') {
    setEntry({ key, value: preference });
    return preference;
  }
  return entry.value ?? preference;
}
