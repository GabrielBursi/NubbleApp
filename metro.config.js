const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')
const path = require('path');
const withStorybook = require('@storybook/react-native/metro/withStorybook');
const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
	resolver: {
		resolverMainFields: ['sbmodern', 'react-native', 'browser', 'main'],
	},
}

const finalConfig = mergeConfig(defaultConfig, config);

module.exports = mergeConfig(getDefaultConfig(__dirname), config)
module.exports = withStorybook(finalConfig, {
	// Set to false to remove storybook specific options
	// you can also use a env variable to set this
	enabled: true,
	// Path to your storybook config
	configPath: path.resolve(__dirname, './.storybook'),

	// Optional websockets configuration
	// Starts a websocket server on the specified port and host on metro start
	// websockets: {
	//   port: 7007,
	//   host: 'localhost',
	// },
});
