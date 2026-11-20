import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { useArticleModeration } from '../moderation/articleModeration';
import { useTheme } from '../../shared/theme/ThemeProvider';
import { fonts } from '../../shared/theme/tokens';
import { AppIcon } from '../../shared/ui/AppIcon';
import { ResponsesPanel } from './ResponsesPanel';
import { useResponseCount, useResponseScope } from './ResponseProvider';
import { responseTargetKey, type ResponseTarget } from './types';

type ResponseButtonProps = {
  target: ResponseTarget;
  title: string;
  label?: string;
  text?: string;
  size?: number;
  initialReplyId?: string;
};
export function ResponseButton(props: ResponseButtonProps) {
  const scope = useResponseScope();
  return <ScopedResponseButton key={`${scope?.scope}:${responseTargetKey(props.target)}`} {...props} />;
}
function ScopedResponseButton({
  target,
  title,
  text,
  label = `Responses, ${title}`,
  size = 16,
  initialReplyId,
}: ResponseButtonProps) {
  const [open, setOpen] = useState(false);
  const moderation = useArticleModeration();
  const unavailable =
    target.kind === 'article' && (moderation.blocked(target.id) || Boolean(moderation.state?.readError));
  if (open && unavailable) setOpen(false);
  const count = useResponseCount(target);
  const { colors } = useTheme();
  return (
    <View>
      <Pressable
        role="button"
        accessibilityLabel={label}
        onPress={() => setOpen(true)}
        style={{
          minHeight: 48,
          minWidth: 48,
          flexDirection: 'row',
          gap: 8,
          alignItems: 'center',
        }}
      >
        {!text && <AppIcon name="comment" size={size} color={colors.secondaryText} />}
        <Text
          style={{
            fontFamily: fonts.sans,
            fontSize: size > 20 ? 14 : 13,
            color: colors.secondaryText,
          }}
        >
          {text ?? count ?? '—'}
        </Text>
      </Pressable>
      {open && (
        <ResponsesPanel target={target} initialReplyId={initialReplyId} onClose={() => setOpen(false)} />
      )}
    </View>
  );
}
