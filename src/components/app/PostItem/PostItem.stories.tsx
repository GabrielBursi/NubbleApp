import type { Meta, StoryObj } from '@storybook/react'

import { generatePost } from '@/tests/mocks/mockPosts'

import { PostItem } from './PostItem'

const meta: Meta<typeof PostItem> = {
	title: 'Components/Post/PostItem',
	component: PostItem,
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

type Story = StoryObj<typeof PostItem>

export const Basic: Story = {
	args: {},
}
