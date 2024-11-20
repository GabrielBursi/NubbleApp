import type { Meta, StoryObj } from '@storybook/react'

import { MyProfileScreen } from './MyProfile'

const meta: Meta<typeof MyProfileScreen> = {
	title: 'Screens/MyProfileScreen',
	component: MyProfileScreen,
	args: {},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof MyProfileScreen>

export const Basic: Story = {
	args: {},
}
