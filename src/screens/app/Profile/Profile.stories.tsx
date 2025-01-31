import type { Meta, StoryObj } from '@storybook/react'

import { ProfileScreen } from './Profile'

const meta: Meta<typeof ProfileScreen> = {
	title: 'Screens/ProfileScreen',
	component: ProfileScreen,
	args: {},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof ProfileScreen>

export const Basic: Story = {
	args: {},
}
