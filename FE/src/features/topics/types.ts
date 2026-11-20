export type Topic = {
  id: string;
  name: string;
  followers?: string;
  storyCount?: string;
  related: string[];
  stories: string[];
  curations: string[];
};
export type Curation = {
  id: string;
  title: string;
  curatorId: string;
  listId: string;
  previewStories: string[];
  partialImageWidths?: Readonly<Record<string, number>>;
};
export type TopicCatalog = { topics: Topic[]; curations: Curation[] };
export type TopicSource = () => Promise<TopicCatalog>;
