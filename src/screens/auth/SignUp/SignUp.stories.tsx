import type { Meta, StoryObj } from '@storybook/react'

import { SignUpScreen } from './SignUp'

const meta: Meta<typeof SignUpScreen> = {
	title: 'Screens/Auth/SignUpScreen',
	component: SignUpScreen,
	args: {},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof SignUpScreen>

export const Basic: Story = {
	args: {},
}
