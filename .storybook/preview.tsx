import React from 'react'
import type { Preview } from '@storybook/react'
import { TestProvider } from '../src/providers'
import { theme } from '../src/styles'

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		backgrounds: {
			default: 'primary',
			values: [
				{ name: 'primary', value: theme.colors.mainBg },
				{ name: 'secondary', value: theme.colors.secondaryBg },
			],
		},
	},
	decorators: [
		(Story) => (
			<TestProvider>
				<Story />
			</TestProvider>
		),
	],
}

export default preview
