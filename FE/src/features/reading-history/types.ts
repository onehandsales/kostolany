export type ReadingVisit = Readonly<{ articleId: string; visitedAt: string }>;
export type HistoryValue = Readonly<{ userId: string; visits: readonly ReadingVisit[] }>;
export type ReadingHistorySource = Readonly<{
  read: (userId: string) => Promise<HistoryValue>;
  save: (input: HistoryValue & { commandId: number }) => Promise<HistoryValue>;
}>;
export type HistorySnapshot = Readonly<{
  status: 'loading' | 'ready' | 'error';
  visits: readonly ReadingVisit[];
  isSaving: boolean;
  error: 'read' | 'write' | null;
  errorScope: string | null;
}>;
