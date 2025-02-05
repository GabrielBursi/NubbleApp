import type { Meta, StoryObj } from '@storybook/react'

import { PublishPostScreen } from './PublishPost'

const meta: Meta<typeof PublishPostScreen> = {
	title: 'Screens/PublishPostScreen',
	component: PublishPostScreen,
	args: {},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof PublishPostScreen>

export const Basic: Story = {
	args: {},
}
