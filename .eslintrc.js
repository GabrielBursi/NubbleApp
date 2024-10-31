module.exports = {
	env: {
		es6: true,
		node: true,
		jest: true,
		"jest/globals": true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'prettier',
		'plugin:styled-components-a11y/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:react-native/all',
		'plugin:react-redux/recommended',
		"plugin:json/recommended",
		"plugin:jest-formatting/recommended",
		"plugin:jest/recommended",
		"plugin:jest/style",
		"plugin:react-native/all",
		"plugin:@tanstack/eslint-plugin-query/recommended",
		"plugin:storybook/recommended"
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}', '*.spec.tsx'],
			extends: ['plugin:testing-library/react'],
			parserOptions: {
				sourceType: 'script',
			},
		},
		{
			files: ['*.ts', '*.tsx'],
			extends: [
				'plugin:@typescript-eslint/eslint-recommended',
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
			],
			parserOptions: {
				project: ['./tsconfig.json'],
			},
		},
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		tsconfigRootDir: __dirname,
		"ecmaFeatures": {
			"jsx": true
		}
	},
	plugins: [
		'react',
		'react-hooks',
		'@typescript-eslint',
		'prettier',
		'styled-components-a11y',
		"better-styled-components",
		"jsx-a11y",
		"react-native",
		"react-redux",
		"json-format",
		"jest-formatting",
		'jest',
		'testing-library'
	],
	rules: {
		'no-empty-function': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'react/display-name': 'off',
		'react/prop-types': 'off',
		'prettier/prettier': 'error',
		'react/react-in-jsx-scope': 'off',
		'react-hooks/exhaustive-deps': 'warn',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		"jest/no-disabled-tests": "warn",
		"jest/no-focused-tests": "error",
		"jest/no-identical-title": "error",
		"jest/prefer-to-have-length": "warn",
		"jest/valid-expect": "error",
		"jest/expect-expect": ["error", { "assertFunctionNames": ["expect"] }],
		'testing-library/await-async-queries': 'error',
		'testing-library/no-await-sync-queries': 'error',
		'testing-library/no-debugging-utils': 'warn',
		'testing-library/no-dom-import': 'off',
		"better-styled-components/sort-declarations-alphabetically": 2
	},
	settings: {
		react: {
			version: 'detect',
		},
		"json/sort-package-json": "standard",
		"json/ignore-files": ["**/package-lock.json"],
		"json/json-with-comments-files": ["**/tsconfig.json", ".vscode/**"],
	},
}
