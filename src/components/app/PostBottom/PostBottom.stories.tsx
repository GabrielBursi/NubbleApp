import type { Meta, StoryObj } from '@storybook/react'

import { PostBottom } from './PostBottom'

const meta: Meta<typeof PostBottom> = {
	title: 'Components/Post/PostBottom',
	component: PostBottom,
	args: {
		commentCount: 10,
		text: 'Storybook',
		userName: 'SB',
	},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof PostBottom>

export const Basic: Story = {
	args: {},
}
