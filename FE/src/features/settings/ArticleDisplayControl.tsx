import { useState } from 'react';

import { IconButton } from '../../shared/ui/IconButton';
import { ArticleDisplayPopover } from './ArticleDisplayPopover';
import { useSettingsScopeKey } from './ReadingSettingsProvider';

export function ArticleDisplayControl() {
  const scope = useSettingsScopeKey();
  const [openedScope, setOpenedScope] = useState<string | null>(null);
  if (openedScope !== null && openedScope !== scope) setOpenedScope(null);
  return <>
    <IconButton icon="settings" label="기사 표시 설정" onPress={() => setOpenedScope(scope)} />
    {openedScope === scope && <ArticleDisplayPopover onClose={() => setOpenedScope(null)} />}
  </>;
}
