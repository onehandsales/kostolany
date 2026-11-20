export type DigestIssue = { id: string; publishedAt: string; date: string };
export type Digest = DigestIssue & { articleIds: readonly string[] };
export type DigestSource = {
  fetchIssues: (userId: string) => Promise<{ userId: string; issues: readonly DigestIssue[] }>;
  fetchDigest: (userId: string, issueId: string) => Promise<{ userId: string; digest: Digest }>;
  subscribe?: (listener: () => void) => () => void;
};
export type DigestSnapshot = {
  issues: readonly DigestIssue[];
  selectedId: string | null;
  catalogStatus: 'loading' | 'ready' | 'error';
  status: 'loading' | 'ready' | 'error';
  digest: Digest | null;
};
