module.exports = {
	presets: ['module:@react-native/babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				alias: {
					'@/api': './src/api',
					'@/components': './src/components',
					'@/hooks': './src/hooks',
					'@/providers': './src/providers',
					'@/routes': './src/routes',
					'@/screens': './src/screens',
					'@/storage': './src/storage',
					'@/store': './src/store',
					'@/styles': './src/styles',
					'@/templates': './src/templates',
					'@/tests': './src/tests',
					'@/types': './src/types',
					'@/utils': './src/utils',
					'@/domain': './src/domain',
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
