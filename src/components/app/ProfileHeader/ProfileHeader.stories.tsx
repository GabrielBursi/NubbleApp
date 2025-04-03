import type { Meta, StoryObj } from '@storybook/react'

import { generateUser } from '@/tests/mocks/mockUser'

import { ProfileHeader } from './ProfileHeader'

const meta: Meta<typeof ProfileHeader> = {
	title: 'Components/ProfileHeader',
	component: ProfileHeader,
	args: {
		user: generateUser(),
	},
	argTypes: {
		user: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof ProfileHeader>

export const Basic: Story = {
	args: {},
}
