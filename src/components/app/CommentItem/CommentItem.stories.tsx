import type { Meta, StoryObj } from '@storybook/react'

import { generateComment } from '@/tests/mocks/mockComments'

import { CommentItem } from './CommentItem'

const meta: Meta<typeof CommentItem> = {
	title: 'Components/CommentItem',
	component: CommentItem,
	args: { comment: generateComment(), postAuthorId: '1', userId: 1 },
	argTypes: {
		comment: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof CommentItem>

export const Basic: Story = {
	args: {},
}
