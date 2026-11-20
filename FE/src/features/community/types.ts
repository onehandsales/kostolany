import type { ImageSourcePropType } from 'react-native';

export type FollowTarget = Readonly<{ kind: 'writer' | 'publication'; id: string }>;
export type RelationshipTarget = FollowTarget | Readonly<{ kind: 'topic'; id: string }>;
export type Relationship = Readonly<{ target: RelationshipTarget; following: boolean; email: boolean }>;
export type RelationshipValue = Readonly<{
  userId: string;
  version: number;
  relationships: readonly Relationship[];
}>;
export type RelationshipCommand = Readonly<{ operationId: string; relationship: Relationship }>;
export type RelationshipSource = {
  read: (userId: string) => Promise<RelationshipValue>;
  set: (userId: string, command: RelationshipCommand) => Promise<RelationshipValue>;
};
export type RelationshipSnapshot = {
  status: 'loading' | 'ready' | 'error';
  relationships: Relationship[];
  pending: string[];
  errors: string[];
  errorScopes: Readonly<Record<string, string>>;
  readError: boolean;
};
export type PublicIdentity = FollowTarget & {
  name: string;
  handle?: string;
  avatar?: ImageSourcePropType;
  bio?: string;
  followers?: string;
  followingCount?: number;
  friend?: boolean;
  verified?: boolean;
  website?: string;
  about?: string[];
  memberSince?: string;
  friendSince?: string;
  stories: string[];
  pinned: string[];
  lists: string[];
};
export type PublicDirectory = {
  identities: PublicIdentity[];
  following: Readonly<Record<string, FollowTarget[]>>;
};
export type DirectorySource = () => Promise<PublicDirectory>;
export const followKey = (target: RelationshipTarget) => `${target.kind}:${target.id}`;
export const emptyRelationship = (target: RelationshipTarget): Relationship => ({
  target,
  following: false,
  email: false,
});
export function validRelationship(value: Relationship): boolean {
  return Boolean(
    value &&
      value.target &&
      (value.target.kind === 'writer' ||
        value.target.kind === 'publication' ||
        value.target.kind === 'topic') &&
      typeof value.target.id === 'string' &&
      value.target.id.trim() &&
      typeof value.following === 'boolean' &&
      typeof value.email === 'boolean' &&
      (!value.email || (value.following && value.target.kind === 'writer')),
  );
}
