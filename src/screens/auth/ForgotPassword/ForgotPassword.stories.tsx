import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPasswordScreen } from './ForgotPassword'

const meta: Meta<typeof ForgotPasswordScreen> = {
	title: 'Screens/Auth/Stack/ForgotPasswordScreen',
	component: ForgotPasswordScreen,
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

type Story = StoryObj<typeof ForgotPasswordScreen>

export const Basic: Story = {
	args: {},
}
