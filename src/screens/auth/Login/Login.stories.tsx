import type { Meta, StoryObj } from '@storybook/react'

import { LoginScreen } from './Login'

const meta: Meta<typeof LoginScreen> = {
	title: 'Screens/Auth/Stack/LoginScreen',
	component: LoginScreen,
	args: {},
	argTypes: {
		navigation: {
			type: 'symbol',
		},
		route: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof LoginScreen>

export const Basic: Story = {
	args: {},
}
