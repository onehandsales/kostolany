export const appIconIds = [
  'wordmark-black',
  'wordmark-white',
  'founder-black',
  'founder-white',
  'friend',
  'throwback-2012',
  'throwback-2015',
  'throwback-2017',
] as const;
export type AppIconId = (typeof appIconIds)[number];
export type DeviceIcon = Readonly<{ supported: boolean; applied: AppIconId | null }>;
export type AppIconAdapter = {
  read: () => Promise<DeviceIcon>;
  apply: (id: AppIconId) => Promise<DeviceIcon>;
};
export function isAppIconId(value: unknown): value is AppIconId {
  return appIconIds.some((id) => id === value);
}
export function validateDeviceIcon(value: DeviceIcon): DeviceIcon {
  if (typeof value.supported !== 'boolean' || (value.applied !== null && !isAppIconId(value.applied)))
    throw new Error('invalid-icon-response');
  return value;
}
