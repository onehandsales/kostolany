import type { ReaderNotification } from './types';

// 원본 문장 배치와 달리 목적지는 기존 공개 fixture를 사용하며 미수록 알림 종류는 연결 검증용이다.
export function notificationFixtures(userId: string): ReaderNotification[] {
  if (userId !== 'example-reader') return [];
  return [
    { id: 'notice-follow', eventId: 'event-follow-jordan', recipientId: userId, actorId: 'jordan', actorName: 'Jordan Gibbs',
      kind: 'follow', subject: '', target: { kind: 'writer', id: 'jordan' }, occurredAt: '2025-02-12T12:00:00Z', read: false },
    { id: 'notice-list', eventId: 'event-list-morning', recipientId: userId, actorId: 'medium-staff', actorName: 'Medium Staff',
      kind: 'list-story', subject: 'The power of a morning routine', target: { kind: 'list', id: 'public-morning-routine', ownerId: 'medium-staff' }, occurredAt: '2024-11-19T12:00:00Z', read: false },
    { id: 'notice-clap', eventId: 'event-clap-rates', recipientId: userId, actorId: 'akinyele', actorName: 'Akinyele',
      kind: 'clap', subject: '기준금리와 시장의 변화', target: { kind: 'article', id: 'example-latest-rates' }, occurredAt: '2024-06-04T12:00:00Z', read: true },
    { id: 'notice-response', eventId: 'event-response-brain', recipientId: userId, actorId: 'author-bernie', actorName: 'Bérnie',
      kind: 'response', subject: 'AI Is Doing Something to Our Brains', target: { kind: 'response', articleId: 'medium-brain', responseId: 'brain-bernie' }, occurredAt: '2024-06-03T12:00:00Z', read: false },
    { id: 'notice-mention', eventId: 'event-mention-brain', recipientId: userId, actorId: 'example-reader-b', actorName: '예시 독자 B',
      kind: 'mention', subject: 'AI Is Doing Something to Our Brains', target: { kind: 'article', id: 'medium-brain' }, occurredAt: '2024-06-02T12:00:00Z', read: false },
  ];
}
