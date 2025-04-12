import type { Meta, StoryObj } from '@storybook/react'

import { ProfileButton } from './ProfileButton'

const meta: Meta<typeof ProfileButton> = {
	title: 'Components/ProfileButton',
	component: ProfileButton,
	args: {
		isFollowing: false,
		isMyProfile: false,
		userId: 1,
	},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof ProfileButton>

export const Basic: Story = {
	args: {},
}
