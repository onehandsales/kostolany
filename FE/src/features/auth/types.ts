// 인증 이름은 모의 계정 선택용 고정 표시이며 수정 가능한 이름은 프로필 저장소가 소유한다.
export type AuthUser = Readonly<{ id: string; name: string }>;
export type AuthScenario = 'success' | 'cancel' | 'failure' | 'slow';
export type LogoutScenario = Exclude<AuthScenario, 'cancel'>;
export type LoginContext =
  | Readonly<{ kind: 'like' | 'bookmark' | 'highlight'; articleId: string }>
  | Readonly<{ kind: 'save-list' | 'clap-list'; listId: string }>
  | Readonly<{ kind: 'response'; targetKind: 'article' | 'list'; targetId: string }>
  | Readonly<{ kind: 'follow'; targetKind: 'writer' | 'publication' | 'topic'; targetId: string }>
  | Readonly<{ kind: 'library' | 'profile' | 'moderation' | 'recommendations' }>;
export type AuthSource = {
  signIn: (input: {
    userId: string;
    scenario: AuthScenario;
  }) => Promise<{ status: 'success'; user: AuthUser } | { status: 'cancelled' }>;
  signOut: (input: { userId: string; scenario: LogoutScenario }) => Promise<void>;
};
type LoginDialog = Readonly<
  { kind: 'login'; context: LoginContext } & (
    | { status: 'idle'; userId: null }
    | { status: 'pending' | 'error'; userId: string }
  )
>;
type LogoutDialog = Readonly<{ kind: 'logout'; status: 'idle' | 'pending' | 'error' }>;
export type AuthSnapshot = Readonly<
  { revision: number } & (
    | { user: null; dialog: LoginDialog | null }
    | { user: AuthUser; dialog: LogoutDialog | null }
  )
>;
