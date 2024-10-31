import type { Meta, StoryObj } from '@storybook/react'

import HomeScreen from './Home'

const meta: Meta<typeof HomeScreen> = {
	title: 'Screens/HomeScreen',
	component: HomeScreen,
	args: {},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof HomeScreen>

export const Basic: Story = {
	args: {},
}
