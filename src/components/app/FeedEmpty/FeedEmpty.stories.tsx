import type { Meta, StoryObj } from '@storybook/react'

import { FeedEmpty } from './FeedEmpty'

const meta: Meta<typeof FeedEmpty> = {
	title: 'Components/FeedEmpty',
	component: FeedEmpty,
	args: {
		error: null,
		loading: false,
		refetch: () => console.log('Refetch SB!'),
	},
	argTypes: {
		error: {
			type: 'symbol',
		},
		refetch: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof FeedEmpty>

export const Basic: Story = {
	args: {},
}

export const Loading: Story = {
	args: {
		loading: true,
	},
}

export const WithError: Story = {
	args: {
		error: 'Houve um erro.',
	},
}
