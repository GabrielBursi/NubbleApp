import type { Meta, StoryObj } from '@storybook/react'

import { mockUsers } from '@/tests/mocks/mockUser'

import { ProfileUsernameList } from './ProfileUsernameList'

const meta: Meta<typeof ProfileUsernameList> = {
	title: 'Components/ProfileUsernameList',
	component: ProfileUsernameList,
	args: {
		users: mockUsers,
	},
	argTypes: {
		users: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof ProfileUsernameList>

export const Basic: Story = {
	args: {},
}
