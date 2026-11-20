export type MembershipTier = 'free' | 'member' | 'friend';
export type BillingPeriod = 'monthly' | 'annually';
export type MembershipBenefit = 'audio' | 'offline' | 'friend-link' | 'custom-icon';
export type MembershipRecord = Readonly<{
  userId: string;
  tier: Exclude<MembershipTier, 'free'>;
  period: BillingPeriod;
  confirmedAt: string;
  requestId: string;
}>;
export type MembershipRequest = Readonly<{
  userId: string;
  tier: Exclude<MembershipTier, 'free'>;
  period: BillingPeriod;
  requestId: string;
}>;
export type MembershipSource = {
  getSnapshot: () => readonly MembershipRecord[];
  subscribe: (listener: () => void) => () => void;
  purchase: (
    request: MembershipRequest,
    signal: AbortSignal,
    isCurrent: () => boolean,
  ) => Promise<MembershipRecord>;
};

export function hasMembershipBenefit(tier: MembershipTier, benefit: MembershipBenefit): boolean {
  return benefit === 'friend-link' || benefit === 'custom-icon'
    ? tier === 'friend'
    : tier === 'member' || tier === 'friend';
}
