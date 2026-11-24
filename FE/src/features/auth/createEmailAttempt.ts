import type { AuthStore } from './createAuthStore';
import { emailFixtures, type EmailAuthSource, type EmailChallenge } from './emailAuthSource';
import type { AuthScenario } from './types';

type EmailState = { stage: 'email' | 'code'; email: string; name: string; code: string; challenge: EmailChallenge | null; busy: boolean; error: string | null };
export type EmailAttempt = ReturnType<typeof createEmailAttempt>;
export function createEmailAttempt(source: EmailAuthSource, auth: AuthStore, joining: boolean) {
  let state: EmailState = { stage: 'email', email: '', name: '', code: '', challenge: null, busy: false, error: null };
  const listeners = new Set<() => void>(); const authAttempt = auth.getLoginAttempt(); const revision = auth.getSnapshot().revision;
  let attemptId = source.begin(); let lease = new AbortController(); let sequence = 0; let active = false;
  const valid = () => active && !lease.signal.aborted && auth.getLoginAttempt() === authAttempt && auth.getSnapshot().revision === revision && !auth.getSnapshot().user && auth.getSnapshot().dialog?.kind === 'login';
  function publish(next: EmailState) { state = next; listeners.forEach(listener => listener()); }
  function resetRequest() { lease.abort(); source.cancel(attemptId); attemptId = source.begin(); lease = new AbortController(); sequence++; }
  async function request() {
    if (!valid() || state.busy) return; const operation = ++sequence; const operationLease = lease;
    publish({ ...state, busy: true, error: null, challenge: null });
    try {
      const challenge = await source.request({ attemptId, joining, email: state.email, name: state.name }, operationLease.signal);
      if (!valid() || operation !== sequence || lease !== operationLease) return;
      const expected = emailFixtures.find(item => item.email === state.email.trim().toLowerCase());
      if (!expected || challenge.userId !== expected.userId || challenge.attemptId !== attemptId || challenge.email !== expected.email || !challenge.id || !Number.isFinite(challenge.expiresAt) || !/^\d{6}$/u.test(challenge.mockCode)) throw new Error('request-failed');
      publish({ ...state, stage: 'code', busy: false, code: '', challenge });
    } catch (error) { if (valid() && operation === sequence && lease === operationLease) publish({ ...state, busy: false, error: error instanceof Error ? error.message : 'request-failed' }); }
  }
  async function verify(scenario: AuthScenario = 'success') {
    if (!valid() || state.busy || !state.challenge || !/^\d{6}$/u.test(state.code)) return;
    const operation = ++sequence; const operationLease = lease; const challenge = state.challenge; const code = state.code;
    publish({ ...state, busy: true, error: null });
    try {
      const userId = await source.verify({ attemptId, challengeId: challenge.id, code }, operationLease.signal);
      if (!valid() || operation !== sequence || lease !== operationLease) return;
      if (userId !== challenge.userId) throw new Error('verify-failed');
      await auth.signIn(userId, scenario, 'Email', joining);
      if (valid() && operation === sequence) publish({ ...state, busy: false, error: 'sign-in-failed' });
    } catch (error) { if (valid() && operation === sequence && lease === operationLease) publish({ ...state, busy: false, error: error instanceof Error ? error.message : 'verify-failed' }); }
  }
  return {
    getSnapshot: () => state, source,
    subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    activate() {
      active = true;
      if (lease.signal.aborted) {
        // Effect 재연결에서는 취소한 challenge를 재사용하지 않고 입력 폼부터 이어 간다.
        resetRequest();
        publish({ ...state, stage: 'email', busy: false, challenge: null, code: '', error: null });
      }
      const unsubscribe = auth.subscribe(() => { if (!valid()) { active = false; lease.abort(); source.cancel(attemptId); sequence++; } });
      return () => { active = false; lease.abort(); source.cancel(attemptId); sequence++; unsubscribe(); };
    },
    input(field: 'email' | 'name' | 'code', value: string) {
      if (!valid() || state.busy) return;
      if (field !== 'code') resetRequest();
      publish({ ...state, [field]: value, error: null, ...(field !== 'code' ? { challenge: null, code: '' } : {}) });
    },
    back() { if (!active) return; resetRequest(); auth.cancelLoginRequest(); publish({ ...state, stage: 'email', code: '', challenge: null, busy: false, error: null }); },
    request, verify,
  };
}
