import type { Meta, StoryObj } from '@storybook/react'

import { mockPosts } from '@/tests/mocks/mockPosts'

import { PostItem } from './PostItem'

const meta: Meta<typeof PostItem> = {
	title: 'Components/Post/PostItem',
	component: PostItem,
	args: {
		...mockPosts[0],
		author: {
			...mockPosts[0]!.author,
			profileURL: mockPosts[1]!.author.profileURL,
		},
		reactionCount: 10,
		id: mockPosts[0]?.id,
		hideCommentAction: false,
	},
	argTypes: {
		author: {
			type: 'symbol',
		},
		imageURL: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof PostItem>

export const Basic: Story = {
	args: {},
}
