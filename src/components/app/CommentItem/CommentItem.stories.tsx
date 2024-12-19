import type { Meta, StoryObj } from '@storybook/react'

import { customFaker } from '@/tests/utils'

import { CommentItem } from './CommentItem'

const meta: Meta<typeof CommentItem> = {
	title: 'Components/CommentItem',
	component: CommentItem,
	args: {
		id: customFaker.number.int(),
		message: customFaker.lorem.text(),
		createdAt: customFaker.date.past().toUTCString(),
		author: {
			id: customFaker.number.int(),
			name: customFaker.person.firstName(),
			profileURL: customFaker.image.url(),
			userName: customFaker.internet.username(),
		},
	},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof CommentItem>

export const Basic: Story = {
	args: {},
}
