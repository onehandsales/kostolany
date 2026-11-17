module.exports = function (api) {
  api.cache(true);
  // Platform-specific jest-expo presets need an explicit Babel configuration.
  return { presets: ['babel-preset-expo'] };
};
