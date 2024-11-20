import type { Meta, StoryObj } from '@storybook/react'

import { mockPosts } from '@/tests/mocks/mockPosts'

import { PostImage } from './PostImage'

const meta: Meta<typeof PostImage> = {
	title: 'Components/Post/PostImage',
	component: PostImage,
	args: {
		imageURL: mockPosts[0].imageURL,
	},
	argTypes: {
		imageURL: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof PostImage>

export const Basic: Story = {
	args: {},
}
