export type AccountConnection = Readonly<{ userId: string; facebook: boolean }>;
export type AccountConnectionSource = {
  getSnapshot: () => readonly AccountConnection[];
  subscribe: (listener: () => void) => () => void;
  setFacebook: (
    userId: string,
    connected: boolean,
    signal: AbortSignal,
    isCurrent: () => boolean,
  ) => Promise<AccountConnection>;
};
export function createMockAccountConnectionSource(
  options: { delayMs?: number; failures?: number } = {},
): AccountConnectionSource {
  let records: readonly AccountConnection[] = [];
  let failures = options.failures ?? 0;
  const latest = new Map<string, object>();
  const listeners = new Set<() => void>();
  return {
    getSnapshot: () => records,
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    async setFacebook(userId, facebook, signal, isCurrent) {
      if (!userId || signal.aborted || !isCurrent()) throw new Error('cancelled');
      const request = {};
      latest.set(userId, request);
      await new Promise<void>((resolve, reject) => {
        const abort = () => {
          clearTimeout(timer);
          reject(new Error('cancelled'));
        };
        const timer = setTimeout(() => {
          signal.removeEventListener('abort', abort);
          resolve();
        }, options.delayMs ?? 300);
        signal.addEventListener('abort', abort, { once: true });
      });
      if (signal.aborted || !isCurrent() || latest.get(userId) !== request) throw new Error('cancelled');
      if (failures-- > 0) throw new Error('failed');
      const record = { userId, facebook };
      records = [...records.filter((item) => item.userId !== userId), record];
      listeners.forEach((listener) => listener());
      return record;
    },
  };
}
