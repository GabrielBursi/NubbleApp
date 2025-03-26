import type { Meta, StoryObj } from '@storybook/react'

import { generatePost } from '@/tests/mocks/mockPosts'

import { PostActions } from './PostActions'

const meta: Meta<typeof PostActions> = {
	title: 'Components/Post/PostActions',
	component: PostActions,
	args: {
		post: generatePost(),
		hideCommentAction: false,
	},
	argTypes: {
		post: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof PostActions>

export const Basic: Story = {
	args: {},
}
