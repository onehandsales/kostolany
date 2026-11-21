import {
  followKey,
  validRelationship,
  type RelationshipCommand,
  type RelationshipSource,
  type RelationshipValue,
} from '../types';

export function createMockRelationshipSource({
  delay = 120,
  scenario = 'normal',
  canFollow = () => true,
}: {
  delay?: number;
  canFollow?: (userId: string, target: import('../types').RelationshipTarget) => boolean;
  scenario?: 'normal' | 'read-error' | 'write-error' | 'email-error' | 'slow';
} = {}): RelationshipSource {
  const values = new Map<string, RelationshipValue>();
  const completed = new Map<string, string>();
  const faults = new Set<string>();
  const pause = () => new Promise<void>((resolve) => setTimeout(resolve, scenario === 'slow' ? 3000 : delay));
  const value = (userId: string) => values.get(userId) ?? { userId, version: 0, relationships: [] };
  function failOnce(key: string) {
    if (!faults.has(key)) {
      faults.add(key);
      throw new Error('Mock relationship failure');
    }
  }
  return {
    async read(userId) {
      await pause();
      if (scenario === 'read-error') failOnce(`read:${userId}`);
      return value(userId);
    },
    async set(userId: string, command: RelationshipCommand) {
      if (!userId || !command.operationId || !validRelationship(command.relationship))
        throw new Error('Invalid relationship');
      if (command.relationship.target.kind === 'writer' && command.relationship.target.id === userId)
        throw new Error('Self relationship is not supported');
      await pause();
      const operation = JSON.stringify([userId, command.operationId]);
      const fingerprint = JSON.stringify(command.relationship);
      const existing = completed.get(operation);
      if (existing !== undefined) {
        if (existing !== fingerprint) throw new Error('Conflicting operation');
        return value(userId);
      }
      if (scenario === 'write-error') failOnce(`write:${userId}`);
      if (scenario === 'email-error' && command.relationship.email) failOnce(`email:${userId}`);
      if (command.relationship.following && !canFollow(userId, command.relationship.target))
        throw new Error('permission');
      const before = value(userId);
      const key = followKey(command.relationship.target);
      const next = {
        userId,
        version: before.version + 1,
        relationships: [
          ...before.relationships.filter((item) => followKey(item.target) !== key),
          command.relationship,
        ],
      };
      values.set(userId, next);
      completed.set(operation, fingerprint);
      return next;
    },
  };
}
