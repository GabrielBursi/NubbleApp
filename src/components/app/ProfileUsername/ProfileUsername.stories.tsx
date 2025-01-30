import type { Meta, StoryObj } from '@storybook/react'

import { mockUser } from '@/tests/mocks/mockUser'

import { ProfileUsername } from './ProfileUsername'

const meta: Meta<typeof ProfileUsername> = {
	title: 'Components/ProfileUsername',
	component: ProfileUsername,
	args: {
		...mockUser,
	},
	argTypes: {
		profileUrl: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof ProfileUsername>

export const Basic: Story = {
	args: {},
}
