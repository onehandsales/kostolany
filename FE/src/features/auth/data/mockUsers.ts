import type { AuthUser } from '../types';

// 기존 개인 데이터의 소유자 ID를 유지하고 실제 계정 정보 없이 두 독자를 구분한다.
export const mockUserA: AuthUser = { id: 'example-reader', name: '예시 독자 A' };
export const mockUserB: AuthUser = { id: 'example-reader-b', name: '예시 독자 B' };
export const mockUsers: readonly AuthUser[] = [mockUserA, mockUserB];
