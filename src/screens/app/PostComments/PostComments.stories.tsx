import type { Meta, StoryObj } from '@storybook/react'

import { PostCommentsScreen } from './PostComments'

const meta: Meta<typeof PostCommentsScreen> = {
	title: 'Screens/App/Stack/PostCommentsScreen',
	component: PostCommentsScreen,
	args: {},
	argTypes: {
		navigation: {
			type: 'symbol',
		},
		route: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof PostCommentsScreen>

export const Basic: Story = {
	args: {},
}
