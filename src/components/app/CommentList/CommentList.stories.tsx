import type { Meta, StoryObj } from '@storybook/react'

import { customFaker } from '@/tests/utils/customFaker'

import { CommentList } from './CommentList'

const meta: Meta<typeof CommentList> = {
	title: 'Components/CommentList',
	component: CommentList,
	args: {
		id: customFaker.string.uuid(),
		showPost: false,
		authorId: customFaker.string.uuid(),
	},
	argTypes: {
		id: {
			type: 'symbol',
		},
		authorId: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof CommentList>

export const Basic: Story = {
	args: {},
}
