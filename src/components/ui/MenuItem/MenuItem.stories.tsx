import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { MenuItem } from './MenuItem'

const meta: Meta<typeof MenuItem> = {
	title: 'UI/MenuItem',
	component: MenuItem,
	args: {
		label: 'Storybook',
		onPress: action('onPress'),
	},
	argTypes: {
		onPress: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof MenuItem>

export const Basic: Story = {
	args: {},
}
