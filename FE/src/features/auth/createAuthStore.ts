import type { AuthScenario, AuthSnapshot, AuthSource, AuthUser, LoginContext, LogoutScenario } from './types';

export type AuthStore = ReturnType<typeof createAuthStore>;

export function createAuthStore(source: AuthSource, initialUser: AuthUser | null = null) {
  let snapshot: AuthSnapshot = initialUser ? { user: initialUser, dialog: null, revision: 0 }
    : { user: null, dialog: null, revision: 0 };
  let generation = 0;
  const listeners = new Set<() => void>();

  function publish(next: AuthSnapshot): void {
    snapshot = next;
    listeners.forEach((listener) => listener());
  }

  function closeDialog(): void {
    // 닫기 이후의 성공과 실패는 같은 사용자의 재시도에도 적용하지 않는다.
    generation += 1;
    publish({ ...snapshot, dialog: null });
  }

  async function signIn(userId: string, scenario: AuthScenario = 'success'): Promise<void> {
    const dialog = snapshot.dialog;
    if (!userId.trim() || snapshot.user || dialog?.kind !== 'login' || dialog.status === 'pending') return;
    const request = ++generation;
    publish({ user: null, revision: snapshot.revision, dialog: { ...dialog, status: 'pending', userId } });
    try {
      const result = await source.signIn({ userId, scenario });
      if (generation !== request) return;
      if (result.status === 'cancelled') { closeDialog(); return; }
      if (result.user.id !== userId || !result.user.name.trim()) throw new Error('Invalid auth response');
      // 로그인은 인증만 확정하며 진입 원인이 된 저장이나 좋아요를 자동 실행하지 않는다.
      publish({ user: result.user, dialog: null, revision: snapshot.revision + 1 });
    } catch {
      if (generation !== request) return;
      publish({ user: null, revision: snapshot.revision, dialog: { ...dialog, status: 'error', userId } });
    }
  }

  async function signOut(scenario: LogoutScenario = 'success'): Promise<void> {
    const { user, dialog } = snapshot;
    if (!user || dialog?.kind !== 'logout' || dialog.status === 'pending') return;
    const request = ++generation;
    publish({ user, revision: snapshot.revision, dialog: { kind: 'logout', status: 'pending' } });
    try {
      await source.signOut({ userId: user.id, scenario });
      if (generation !== request) return;
      publish({ user: null, dialog: null, revision: snapshot.revision + 1 });
    } catch {
      if (generation !== request) return;
      publish({ user, revision: snapshot.revision, dialog: { kind: 'logout', status: 'error' } });
    }
  }

  return {
    getSnapshot: (): AuthSnapshot => snapshot,
    subscribe(listener: () => void): () => void {
      listeners.add(listener);
      return () => { listeners.delete(listener); };
    },
    openLogin(context: LoginContext): void {
      if (snapshot.user || snapshot.dialog) return;
      publish({ ...snapshot, dialog: { kind: 'login', context, status: 'idle', userId: null } });
    },
    openLogout(): void {
      if (!snapshot.user || snapshot.dialog) return;
      publish({ ...snapshot, dialog: { kind: 'logout', status: 'idle' } });
    },
    closeDialog, signIn, signOut,
    async retry(): Promise<void> {
      const dialog = snapshot.dialog;
      if (dialog?.status !== 'error') return;
      // 실패 재현 뒤의 재시도는 정상 모의 응답을 요청하되 이전 요청의 사용자를 고정한다.
      if (dialog.kind === 'login' && dialog.userId) await signIn(dialog.userId);
      else if (dialog.kind === 'logout') await signOut();
    },
  };
}
