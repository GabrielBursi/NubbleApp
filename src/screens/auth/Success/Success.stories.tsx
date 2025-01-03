import type { Meta, StoryObj } from '@storybook/react'

import { SuccessScreen } from './Success'

const meta: Meta<typeof SuccessScreen> = {
	title: 'Screens/Auth/SuccessScreen',
	component: SuccessScreen,
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

type Story = StoryObj<typeof SuccessScreen>

export const Basic: Story = {
	args: {},
}
