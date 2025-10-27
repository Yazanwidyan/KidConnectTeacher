const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {
  resetCache: true,
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
