import type { Meta, StoryObj } from '@storybook/react'

import { NewPostScreen } from './NewPost'

const meta: Meta<typeof NewPostScreen> = {
	title: 'Screens/NewPostScreen',
	component: NewPostScreen,
	args: {},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof NewPostScreen>

export const Basic: Story = {
	args: {},
}
