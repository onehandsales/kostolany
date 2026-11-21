import { Linking } from 'react-native';
import { settingsDestinations, type SettingsPlatform } from './settingsDestinations';

export const settingsPlatform: SettingsPlatform = {
  async open(destination) {
    const target = settingsDestinations[destination];
    if (!target) throw new Error('invalid-destination');
    await Linking.openURL(target.url);
  },
  openAppSettings: () => Linking.openSettings(),
};
