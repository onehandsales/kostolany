import {
  isAppIconId,
  validateDeviceIcon,
  type AppIconAdapter,
  type AppIconId,
  type DeviceIcon,
} from './types';

type IconSnapshot = Readonly<{
  device: DeviceIcon | null;
  status: 'idle' | 'loading' | 'ready' | 'error';
  applying: boolean;
}>;
export function createAppIconStore(adapter: AppIconAdapter) {
  let state: IconSnapshot = { device: null, status: 'idle', applying: false };
  let generation = 0;
  const listeners = new Set<() => void>();
  const set = (next: IconSnapshot) => {
    state = next;
    listeners.forEach((listener) => listener());
  };
  return {
    getSnapshot: () => state,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    async refresh() {
      if (state.applying) return;
      const request = ++generation;
      set({ ...state, status: 'loading' });
      try {
        const device = validateDeviceIcon(await adapter.read());
        if (request === generation) set({ ...state, device, status: 'ready' });
      } catch {
        if (request === generation) set({ ...state, status: 'error' });
      }
    },
    async apply(id: AppIconId, isAuthorized: () => boolean): Promise<'applied' | 'unavailable' | 'failed'> {
      if (!isAppIconId(id) || !isAuthorized() || state.applying || !state.device?.supported)
        return 'unavailable';
      ++generation;
      set({ ...state, applying: true });
      try {
        const device = validateDeviceIcon(await adapter.apply(id));
        if (!device.supported || device.applied !== id) throw new Error('unconfirmed-icon');
        // OS가 확정한 설치 단위 사실은 요청 화면이나 로그인 계정이 사라져도 유지한다.
        set({ device, applying: false, status: 'ready' });
        return 'applied';
      } catch {
        set({ ...state, applying: false });
        await this.refresh();
        return 'failed';
      }
    },
  };
}
export type AppIconStore = ReturnType<typeof createAppIconStore>;
