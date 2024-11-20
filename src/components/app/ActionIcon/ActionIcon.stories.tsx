import type { Meta, StoryObj } from '@storybook/react'

import { ActionIcon } from './ActionIcon'

const meta: Meta<typeof ActionIcon> = {
	title: 'Components/Post/ActionIcon',
	component: ActionIcon,
	args: {
		count: 775200,
		icon: {
			default: 'heart',
			marked: 'heartFill',
		},
		marked: false,
		onPress: () => console.log('Hi storybook!'),
	},
	argTypes: {
		onPress: {
			type: 'symbol',
		},
		icon: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof ActionIcon>

export const Basic: Story = {
	args: {},
}

export const Marked: Story = {
	args: {
		marked: true,
	},
}
