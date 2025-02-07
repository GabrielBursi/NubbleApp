import type { Meta, StoryObj } from '@storybook/react'

import { ActionIcon } from './ActionIcon'

const meta: Meta<typeof ActionIcon> = {
	title: 'Components/Post/ActionIcon',
	component: ActionIcon,
	args: {
		label: 775200,
		positionLabel: 'right',
		icon: {
			default: 'heart',
			marked: 'heartFill',
		},
		marked: false,
		onPress: () => console.log('Hi storybook!'),
	},
	argTypes: {
		positionLabel: {
			control: 'inline-radio',
			options: ['right', 'left'],
		},
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

export const Text: Story = {
	args: {
		label: 'storybook',
	},
	argTypes: {
		label: {
			type: 'string',
		},
	},
}
