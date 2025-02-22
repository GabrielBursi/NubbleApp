import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { Icon } from './Icon'

const meta: Meta<typeof Icon> = {
	title: 'UI/Icon',
	component: Icon,
	args: {
		color: 'buttonPrimary',
		fillColor: 'backgroundContrast',
		size: 64,
		name: 'bookmark',
	},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof Icon>

export const Basic: Story = {
	args: {},
}

export const Pressable: Story = {
	args: {
		onPress: action('onPress'),
	},
}
