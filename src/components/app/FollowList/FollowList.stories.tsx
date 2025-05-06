import type { Meta, StoryObj } from '@storybook/react'

import { FollowList } from './FollowList'

const meta: Meta<typeof FollowList> = {
	title: 'Components/FollowList',
	component: FollowList,
	args: {
		type: 'followers',
	},
	argTypes: {
		type: {
			control: 'inline-radio',
			options: ['followers', 'following'],
		},
	},
}
export default meta

type Story = StoryObj<typeof FollowList>

export const Basic: Story = {
	args: {},
}
