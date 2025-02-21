import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { RadioButton } from './RadioButton'

const meta: Meta<typeof RadioButton> = {
	title: 'UI/RadioButton',
	component: RadioButton,
	args: {
		checked: true,
		onChange: action('onChange'),
		disabled: false,
	},
	argTypes: {
		onChange: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof RadioButton>

export const Basic: Story = {
	args: {},
}
