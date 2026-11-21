export const settingsDestinations = {
  help: { title: 'Help', url: 'https://help.medium.com/' },
  terms: { title: 'Terms of service', url: 'https://policy.medium.com/medium-terms-of-service-9db0094a1e0f' },
  privacy: { title: 'Privacy policy', url: 'https://policy.medium.com/medium-privacy-policy-f03bf92035c9' },
  rate: { title: 'Rate on the App Store', url: 'https://apps.apple.com/app/id828256236' },
} as const;
export type SettingsDestination = keyof typeof settingsDestinations;
export type SettingsPlatform = {
  open: (destination: SettingsDestination) => Promise<void>;
  openAppSettings: () => Promise<void>;
};
