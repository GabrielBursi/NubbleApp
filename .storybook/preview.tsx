import React from 'react'
import type { Preview } from '@storybook/react'
import { TestProvider } from '../src/providers'
import { appTheme } from '../src/styles'

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
				{ name: 'primary', value: appTheme.colors.background },
				{ name: 'secondary', value: appTheme.colors.backgroundContrast },
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
