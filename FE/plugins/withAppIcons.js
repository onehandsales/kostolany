const {
  withAndroidManifest,
  withDangerousMod,
  withXcodeProject,
  AndroidConfig,
} = require('@expo/config-plugins');
const fs = require('node:fs/promises');
const path = require('node:path');
const ids = [
  'wordmark-black',
  'wordmark-white',
  'founder-black',
  'founder-white',
  'friend',
  'throwback-2012',
  'throwback-2015',
  'throwback-2017',
];

function configureAliases(manifest) {
  const application = AndroidConfig.Manifest.getMainApplicationOrThrow(manifest);
  const activity = application.activity?.find((item) => item.$['android:name'] === '.MainActivity');
  if (!activity) throw new Error('App icon plugin requires MainActivity');
  activity['intent-filter'] = activity['intent-filter']?.filter(
    (filter) =>
      !filter.category?.some((item) => item.$['android:name'] === 'android.intent.category.LAUNCHER'),
  );
  const existing = application['activity-alias'] ?? [];
  application['activity-alias'] = [
    ...existing.filter((item) => !/^\.KostolanyIcon\d+$/u.test(item.$['android:name'])),
    ...ids.map((_, index) => ({
      $: {
        'android:name': `.KostolanyIcon${index}`,
        'android:enabled': index === 0 ? 'true' : 'false',
        'android:exported': 'true',
        'android:targetActivity': '.MainActivity',
        'android:icon': `@drawable/kostolany_icon_${index}`,
        'android:label': '@string/app_name',
      },
      'intent-filter': [
        {
          action: [{ $: { 'android:name': 'android.intent.action.MAIN' } }],
          category: [{ $: { 'android:name': 'android.intent.category.LAUNCHER' } }],
        },
      ],
    })),
  ];
  return manifest;
}
function withAppIcons(config) {
  config = withAndroidManifest(config, (mod) => {
    mod.modResults = configureAliases(mod.modResults);
    return mod;
  });
  config = withDangerousMod(config, [
    'android',
    async (mod) => {
      const target = path.join(mod.modRequest.platformProjectRoot, 'app/src/main/res/drawable-nodpi');
      await fs.mkdir(target, { recursive: true });
      for (const [index, id] of ids.entries())
        await fs.copyFile(
          path.join(mod.modRequest.projectRoot, `assets/app-icons/${id}.png`),
          path.join(target, `kostolany_icon_${index}.png`),
        );
      return mod;
    },
  ]);
  config = withDangerousMod(config, [
    'ios',
    async (mod) => {
      const target = path.join(
        mod.modRequest.platformProjectRoot,
        mod.modRequest.projectName,
        'Images.xcassets',
      );
      for (const [index, id] of ids.entries()) {
        if (index === 0) continue;
        const asset = path.join(target, `KostolanyIcon${index}.appiconset`);
        await fs.mkdir(asset, { recursive: true });
        await fs.copyFile(
          path.join(mod.modRequest.projectRoot, `assets/app-icons/${id}.png`),
          path.join(asset, 'icon.png'),
        );
        await fs.writeFile(
          path.join(asset, 'Contents.json'),
          JSON.stringify({
            images: [{ idiom: 'universal', platform: 'ios', size: '1024x1024', filename: 'icon.png' }],
            info: { version: 1, author: 'xcode' },
          }),
        );
      }
      return mod;
    },
  ]);
  return withXcodeProject(config, (mod) => {
    const configurations = mod.modResults.pbxXCBuildConfigurationSection();
    for (const entry of Object.values(configurations)) {
      if (typeof entry !== 'object' || !entry.buildSettings?.ASSETCATALOG_COMPILER_APPICON_NAME) continue;
      entry.buildSettings.ASSETCATALOG_COMPILER_ALTERNATE_APPICON_NAMES =
        '"KostolanyIcon1 KostolanyIcon2 KostolanyIcon3 KostolanyIcon4 KostolanyIcon5 KostolanyIcon6 KostolanyIcon7"';
      entry.buildSettings.ASSETCATALOG_COMPILER_INCLUDE_ALL_APPICON_ASSETS = 'YES';
    }
    return mod;
  });
}
module.exports = withAppIcons;
module.exports.configureAliases = configureAliases;
