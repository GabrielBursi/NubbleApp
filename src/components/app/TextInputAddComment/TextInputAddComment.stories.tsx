import type { Meta, StoryObj } from '@storybook/react'

import { TextInputAddComment } from './TextInputAddComment'

const meta: Meta<typeof TextInputAddComment> = {
	title: 'Components/TextInputAddComment',
	component: TextInputAddComment,
	args: {
		postId: '1',
	},
	argTypes: {
		postId: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof TextInputAddComment>

export const Basic: Story = {
	args: {},
}
