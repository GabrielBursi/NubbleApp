import type { Meta, StoryObj } from '@storybook/react'

import { HomeScreen } from '@/screens'

const meta: Meta<typeof HomeScreen> = {
	title: 'Screens/App/Tab/HomeScreen',
	component: HomeScreen,
	args: {},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof HomeScreen>

export const Basic: Story = {
	args: {},
}
