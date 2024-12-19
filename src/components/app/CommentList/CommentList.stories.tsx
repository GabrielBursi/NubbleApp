import type { Meta, StoryObj } from '@storybook/react'

import { customFaker } from '@/tests/utils'

import { CommentList } from './CommentList'

const meta: Meta<typeof CommentList> = {
	title: 'Components/CommentList',
	component: CommentList,
	args: {
		id: customFaker.string.uuid(),
	},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof CommentList>

export const Basic: Story = {
	args: {},
}
