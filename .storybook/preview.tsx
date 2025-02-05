import React from 'react'
import type { Preview } from '@storybook/react'
import { TestProvider } from '../src/providers'
import { appTheme } from '../src/styles'
import { Container } from '../src/components'
import {
	configureReanimatedLogger,
	ReanimatedLogLevel,
} from 'react-native-reanimated'

configureReanimatedLogger({
	level: ReanimatedLogLevel.warn,
	strict: false,
})

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
		(Story, { title }) => {
			if (title.startsWith('Screen') || title.includes('Photo'))
				return (
					<TestProvider>
						<Story />
					</TestProvider>
				)

			return (
				<TestProvider>
					<Container marginTop="s24">
						<Story />
					</Container>
				</TestProvider>
			)
		},
	],
}

export default preview
