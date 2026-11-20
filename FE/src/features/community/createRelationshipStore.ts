import {
  followKey,
  validRelationship,
  type Relationship,
  type RelationshipCommand,
  type RelationshipSnapshot,
  type RelationshipSource,
  type RelationshipValue,
} from './types';

// 조회 세대와 대상별 마지막 의도를 분리하고 전체 사용자 쓰기를 직렬화한다.
export function createRelationshipStore(source: RelationshipSource, userId: string) {
  let confirmed: RelationshipValue | null = null;
  let state: RelationshipSnapshot = {
    status: 'loading',
    relationships: [],
    pending: [],
    errors: [],
    errorScopes: {},
    readError: false,
  };
  const listeners = new Set<() => void>();
  const desired = new Map<string, { intent: number; value: Relationship }>();
  const failed = new Map<string, { command: RelationshipCommand; scope: string }>();
  let queue = Promise.resolve();
  let sequence = 0;
  let generation = 0;
  let started = false;
  let reading = false;
  const scope = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  function publish(readError = state.readError) {
    const values = new Map(confirmed?.relationships.map((value) => [followKey(value.target), value]));
    desired.forEach((value, key) => values.set(key, value.value));
    state = {
      status: confirmed ? 'ready' : readError ? 'error' : 'loading',
      relationships: [...values.values()],
      pending: [...desired.keys()],
      errors: [...failed.keys()],
      errorScopes: Object.fromEntries([...failed].map(([key, item]) => [key, item.scope])),
      readError,
    };
    listeners.forEach((listener) => listener());
  }
  function valid(value: RelationshipValue): boolean {
    return Boolean(
      value &&
        value.userId === userId &&
        Number.isSafeInteger(value.version) &&
        value.version >= 0 &&
        Array.isArray(value.relationships) &&
        value.relationships.every(validRelationship) &&
        new Set(value.relationships.map((item) => followKey(item.target))).size ===
          value.relationships.length,
    );
  }
  async function read() {
    if (reading) return;
    reading = true;
    started = true;
    const request = ++generation;
    publish(false);
    try {
      const value = await source.read(userId);
      if (request !== generation) return;
      if (!valid(value)) throw new Error('Invalid relationships');
      if (!confirmed || value.version >= confirmed.version) confirmed = value;
      publish(false);
    } catch {
      if (request === generation) publish(true);
    } finally {
      reading = false;
    }
  }
  function submit(
    value: Relationship,
    sessionScope = 'default',
    previous?: RelationshipCommand,
  ): Promise<boolean> {
    if (!confirmed || !validRelationship(value)) return Promise.resolve(false);
    const key = followKey(value.target);
    const intent = ++sequence;
    const command = previous ?? { operationId: `${scope}:${intent}`, relationship: value };
    desired.set(key, { intent, value });
    failed.delete(key);
    publish();
    const result = queue.then(async () => {
      try {
        const returned = await source.set(userId, command);
        const saved = returned.relationships.find((item) => followKey(item.target) === key);
        if (
          !valid(returned) ||
          !saved ||
          saved.following !== value.following ||
          saved.email !== value.email ||
          (confirmed && returned.version < confirmed.version)
        )
          throw new Error('Invalid relationship mutation');
        confirmed = returned;
        generation += 1;
        if (desired.get(key)?.intent === intent) desired.delete(key);
        publish(false);
        return true;
      } catch {
        if (desired.get(key)?.intent === intent) {
          desired.delete(key);
          failed.set(key, { command, scope: sessionScope });
        }
        publish();
        return false;
      }
    });
    queue = result.then(() => {});
    return result;
  }
  return {
    userId,
    getSnapshot: () => state,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    ensure: () => {
      if (!started) void read();
    },
    reload: read,
    set: submit,
    retry: (key: string, sessionScope = 'default') => {
      const failure = failed.get(key);
      return failure?.scope === sessionScope
        ? submit(failure.command.relationship, sessionScope, failure.command)
        : Promise.resolve(false);
    },
  };
}
export type RelationshipStore = ReturnType<typeof createRelationshipStore>;
