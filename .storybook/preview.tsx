import React from 'react'
import type { Preview } from '@storybook/react'
import { TestProvider } from '../src/providers'
import { appTheme } from '../src/styles'
import { AuthStackRouter } from '../src/routes/stack/AuthStack'
import { AppStackRouter } from '../src/routes/stack/AppStack'
import { AppBottomTabRouter } from '../src/routes/tab/AppTabBottom'
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
			const folderComponent = title.split('/')
			const componentName = folderComponent[folderComponent.length - 1]
			if (title.startsWith('Screens/Auth/Stack')) {
				return (
					<TestProvider>
						<AuthStackRouter initialRouteName={componentName} />
					</TestProvider>
				)
			}

			if (title.startsWith('Screens/App/Stack')) {
				return (
					<TestProvider>
						<AppStackRouter initialRouteName={componentName} />
					</TestProvider>
				)
			}

			if (title.startsWith('Screens/App/Tab')) {
				return (
					<TestProvider>
						<AppBottomTabRouter initialRouteName={componentName} />
					</TestProvider>
				)
			}

			if (title.startsWith('Components/Photo'))
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
