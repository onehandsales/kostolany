import { requireOptionalNativeModule } from 'expo-modules-core';
import { validateDeviceIcon, type AppIconAdapter } from './types';

export const appIconAdapter: AppIconAdapter = {
  async read() {
    const module = requireOptionalNativeModule<AppIconAdapter>('KostolanyAppIcon');
    return module ? validateDeviceIcon(await module.read()) : { supported: false, applied: null };
  },
  async apply(id) {
    const module = requireOptionalNativeModule<AppIconAdapter>('KostolanyAppIcon');
    if (!module) throw new Error('unsupported');
    return validateDeviceIcon(await module.apply(id));
  },
};
