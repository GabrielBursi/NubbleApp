import type { Config } from 'jest'

const config: Config = {
	preset: 'react-native',
	collectCoverage: true,
	coverageDirectory: 'coverage',
	clearMocks: true,
	setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
	setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
	modulePaths: ['<rootDir>/src'],
	transformIgnorePatterns: ['node_modules/(?!@react-native|react-native)'],
	roots: ['<rootDir>/src'],
	collectCoverageFrom: [
		'src/components/**/**.tsx',
		'!src/components/**/*.stories.tsx',
		'!src/components/**/*.spec.tsx',
		'src/screens/**/**.tsx',
		'!src/screens/**/*.stories.tsx',
		'!src/screens/**/*.spec.tsx',
		'src/templates/**/index.tsx',
		'src/hooks/**/**.tsx',
		'src/domain/**/useCases/**/*.tsx',
		'!src/domain/**/useCases/**/*.test.tsx',
	],
	reporters: [
		'default',
		[
			'./node_modules/jest-html-reporter',
			{
				pageTitle: 'Unit Test Nubble App',
				outputPath: './coverage/unit-test-report.html',
				dateFormat: 'dd/mm/yyyy',
				includeFailureMsg: true,
				sort: 'status',
			},
		],
	],
}

export default config
