module.exports = {
	presets: ["babel-preset-expo"],
	"env": {
		"test": {
			"plugins": ["react-native-config-node/transform"]
		}
	},
	plugins: [
		[
			'module-resolver',
			{
				alias: {
					'@/api': './src/api',
					'@/assets': './src/assets',
					'@/components': './src/components',
					'@/hooks': './src/hooks',
					'@/providers': './src/providers',
					'@/routes': './src/routes',
					'@/screens': './src/screens',
					'@/store': './src/store',
					'@/styles': './src/styles',
					'@/templates': './src/templates',
					'@/tests': './src/tests',
					'@/types': './src/types',
					'@/utils': './src/utils',
					'@/domain': './src/domain',
					'@/services': './src/services',
					'@/context': './src/context',
				},
			},
		],
		[
			'react-native-reanimated/plugin',
			{
				relativeSourceLocation: true,
			},
		],
	],
}
