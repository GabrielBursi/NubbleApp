import type { Meta, StoryObj } from '@storybook/react'

import { generateFollowUser } from '@/tests/mocks/mockFollow'

import { FollowListItem } from './FollowListItem'

const meta: Meta<typeof FollowListItem> = {
	title: 'Components/FollowListItem',
	component: FollowListItem,
	args: {
		buttonTitle: 'Storybook',
		canUndoRemoveFollow: false,
		toastMessage: 'Storybook',
		user: generateFollowUser(),
	},
	argTypes: {
		user: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof FollowListItem>

export const Basic: Story = {
	args: {},
}
