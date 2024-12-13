import type { Meta, StoryObj } from '@storybook/react'

import { FeedList } from './FeedList'

const meta: Meta<typeof FeedList> = {
	title: 'Components/FeedList',
	component: FeedList,
	args: {},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof FeedList>

export const Basic: Story = {
	args: {},
}
