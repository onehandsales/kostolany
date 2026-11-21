import { AndroidConfig } from '@expo/config-plugins';
import { configureAliases } from '../../../plugins/withAppIcons';
import { appIconIds } from './types';

it('아이콘 설정 생성은 런처 하나와 기존 딥링크를 보존하고 반복 적용해도 alias를 늘리지 않는다', () => {
  const launch = { action: [{ $: { 'android:name': 'android.intent.action.MAIN' } }], category: [{ $: { 'android:name': 'android.intent.category.LAUNCHER' } }] };
  const deepLink = { action: [{ $: { 'android:name': 'android.intent.action.VIEW' } }] };
  const manifest: AndroidConfig.Manifest.AndroidManifest = { manifest: { queries: [], $: { 'xmlns:android': 'http://schemas.android.com/apk/res/android' }, application: [{ $: { 'android:name': '.MainApplication' }, activity: [{ $: { 'android:name': '.MainActivity' }, 'intent-filter': [launch, deepLink] }] }] } };
  const result = configureAliases(manifest); configureAliases(result);
  const application = AndroidConfig.Manifest.getMainApplicationOrThrow(result);
  expect(application.activity?.[0]?.['intent-filter']).toEqual([deepLink]);
  const aliases = application['activity-alias'] ?? [];
  expect(aliases).toHaveLength(appIconIds.length);
  expect(aliases.filter(item => item.$?.['android:enabled'] === 'true').map(item => item.$?.['android:name'])).toEqual(['.KostolanyIcon0']);
});
