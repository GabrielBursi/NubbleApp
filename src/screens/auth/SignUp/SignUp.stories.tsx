import type { Meta, StoryObj } from '@storybook/react'

import { SignUpScreen } from './SignUp'

const meta: Meta<typeof SignUpScreen> = {
	title: 'Screens/Auth/Stack/SignUpScreen',
	component: SignUpScreen,
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

type Story = StoryObj<typeof SignUpScreen>

export const Basic: Story = {
	args: {},
}
