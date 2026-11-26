const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
const defaultBlockList = config.resolver.blockList;

// 빌드와 가상 기기 캐시를 제외해 캐시 갱신이 다시 파일 감시를 일으키지 않게 한다.
config.resolver.blockList = [
  ...(Array.isArray(defaultBlockList) ? defaultBlockList : defaultBlockList ? [defaultBlockList] : []),
  /(?:^|[/\\])\.cache(?:[/\\]|$)/,
];

module.exports = config;
