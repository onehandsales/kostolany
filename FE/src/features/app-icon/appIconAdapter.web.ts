import type { AppIconAdapter } from './types';

export const appIconAdapter: AppIconAdapter = {
  read: async () => ({ supported: false, applied: null }),
  apply: async () => {
    throw new Error('unsupported');
  },
};
