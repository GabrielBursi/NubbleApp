import type { Meta, StoryObj } from '@storybook/react'

import { PostActions } from './PostActions'

const meta: Meta<typeof PostActions> = {
	title: 'Components/Post/PostActions',
	component: PostActions,
	args: {
		commentCount: 50,
		favoriteCount: 25,
		reactionCount: 10,
		hideCommentAction: false,
	},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof PostActions>

export const Basic: Story = {
	args: {},
}
