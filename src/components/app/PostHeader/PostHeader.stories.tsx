import type { Meta, StoryObj } from '@storybook/react'

import { mockPosts } from '@/tests/mocks/mockPosts'

import { PostHeader } from './PostHeader'

const meta: Meta<typeof PostHeader> = {
	title: 'Components/Post/PostHeader',
	component: PostHeader,
	args: {
		author: mockPosts[0]?.author,
	},
	argTypes: {
		author: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof PostHeader>

export const Basic: Story = {
	args: {},
}
