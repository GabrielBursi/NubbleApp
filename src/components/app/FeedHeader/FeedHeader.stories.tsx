import type { Meta, StoryObj } from '@storybook/react'

import { FeedHeader } from './FeedHeader'

const meta: Meta<typeof FeedHeader> = {
	title: 'Components/FeedHeader',
	component: FeedHeader,
	args: {},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof FeedHeader>

export const Basic: Story = {
	args: {},
}
