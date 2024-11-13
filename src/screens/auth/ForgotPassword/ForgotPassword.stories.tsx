import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPasswordScreen } from './ForgotPassword'

const meta: Meta<typeof ForgotPasswordScreen> = {
	title: 'Screens/Auth/ForgotPasswordScreen',
	component: ForgotPasswordScreen,
	args: {},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof ForgotPasswordScreen>

export const Basic: Story = {
	args: {},
}
