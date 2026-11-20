import type { BillingPeriod, MembershipSource, MembershipTier } from './types';

type Plan = Exclude<MembershipTier, 'free'>;
type MembershipSessionState = {
  period: BillingPeriod;
  selected: Plan | null;
  phase: 'choosing' | 'pending' | 'error' | 'success' | 'welcome';
};
let sequence = 0;
export function createMembershipSession(source: MembershipSource, userId: string, isCurrent: () => boolean) {
  let state: MembershipSessionState = { period: 'monthly', selected: null, phase: 'choosing' };
  let controller: AbortController | null = null;
  let active = false;
  const listeners = new Set<() => void>();
  function publish(next: MembershipSessionState) {
    state = next;
    listeners.forEach((listener) => listener());
  }
  function cancel() {
    controller?.abort();
    controller = null;
  }
  return {
    getSnapshot: () => state,
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    activate() {
      active = true;
      return () => {
        active = false;
        cancel();
      };
    },
    setPeriod(period: BillingPeriod) {
      if (!active || !isCurrent() || state.phase === 'success' || state.phase === 'welcome') return;
      cancel();
      publish({ period, selected: null, phase: 'choosing' });
    },
    async select(tier: Plan) {
      if (
        !active ||
        !isCurrent() ||
        state.phase === 'pending' ||
        state.phase === 'success' ||
        state.phase === 'welcome'
      )
        return;
      const period = state.period;
      const request = new AbortController();
      controller = request;
      const valid = () => active && isCurrent() && controller === request && !request.signal.aborted;
      publish({ period, selected: tier, phase: 'pending' });
      try {
        const record = await source.purchase(
          { userId, tier, period, requestId: `membership-${++sequence}` },
          request.signal,
          valid,
        );
        if (!valid()) return;
        if (
          record.userId !== userId ||
          record.tier !== tier ||
          record.period !== period ||
          !Number.isFinite(Date.parse(record.confirmedAt))
        )
          throw new Error('MEMBERSHIP_RESPONSE_MISMATCH');
        const confirmed = source.getSnapshot().find((item) => item.userId === userId);
        if (confirmed?.requestId !== record.requestId) throw new Error('MEMBERSHIP_NOT_CONFIRMED');
        publish({ period, selected: tier, phase: 'success' });
      } catch {
        if (valid()) publish({ period, selected: tier, phase: 'error' });
      } finally {
        if (controller === request) controller = null;
      }
    },
    welcome() {
      if (active && isCurrent() && state.phase === 'success') publish({ ...state, phase: 'welcome' });
    },
    close() {
      cancel();
      publish({ period: 'monthly', selected: null, phase: 'choosing' });
    },
  };
}
