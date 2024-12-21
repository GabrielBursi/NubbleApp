import type { Meta, StoryObj } from '@storybook/react'

import { generateComment } from '@/tests/mocks/mockComments'

import { CommentItem } from './CommentItem'

const meta: Meta<typeof CommentItem> = {
	title: 'Components/CommentItem',
	component: CommentItem,
	args: generateComment(),
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof CommentItem>

export const Basic: Story = {
	args: {},
}
