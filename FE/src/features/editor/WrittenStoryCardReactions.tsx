import { View } from 'react-native';

import { ClapControl } from '../reactions/ClapControl';
import { useClaps, useClapStore } from '../reactions/ClapProvider';
import type { ClapStore } from '../reactions/createClapStore';
import { ResponseButton } from '../responses/ResponseButton';
import { useResponseCount } from '../responses/ResponseProvider';
import { publishedArticleId } from './publishedArticle';
import type { PublishedStory } from './publishing';

export function WrittenStoryCardReactions({ story, active = true }: { story: PublishedStory; active?: boolean }) {
  const store = useClapStore();
  return store ? <CardReactions active={active} story={story} store={store} /> : null;
}

function CardReactions({ story, store, active }: { story: PublishedStory; store: ClapStore; active: boolean }) {
  const target = { kind: 'article' as const, id: publishedArticleId(story.id) };
  const state = useClaps(store, target);
  const responses = useResponseCount(target);
  // 새 발행과 반응이 있는 원본 캡처를 구분하되 숨김 조건 자체는 명시적인 모의 표시 정책으로 둔다.
  if (!(state.total && state.total > 0) && !(responses && responses > 0) && !state.error) return null;
  return <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <ClapControl target={target} title={story.document.title} />
    <ResponseButton active={active} target={target} title={story.document.title} />
  </View>;
}
