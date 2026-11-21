import { settingsDestinations, type SettingsPlatform } from './settingsDestinations';

export const settingsPlatform: SettingsPlatform = {
  async open(destination) {
    const target = settingsDestinations[destination];
    if (!target) throw new Error('invalid-destination');
    const opened = window.open(target.url, '_blank');
    if (!opened) throw new Error('blocked');
    opened.opener = null;
  },
  async openAppSettings() {
    throw new Error('unsupported');
  },
};
