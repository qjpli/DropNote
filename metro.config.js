// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Disable package exports to avoid Node.js-only module resolution (e.g., "ws" from Supabase)
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
