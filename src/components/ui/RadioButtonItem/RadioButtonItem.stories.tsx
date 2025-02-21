import type { Meta, StoryObj } from '@storybook/react'

import { customFaker } from '@/tests/utils/customFaker'

import { RadioButtonItem } from './RadioButtonItem'

const meta: Meta<typeof RadioButtonItem> = {
	title: 'UI/RadioButtonItem',
	component: RadioButtonItem,
	args: {
		side: 'left',
		label: 'Storybook',
		description: customFaker.lorem.paragraph({ min: 10, max: 15 }),
	},
	argTypes: {
		side: {
			type: 'string',
			control: 'radio',
			options: ['left', 'right'],
		},
	},
}
export default meta

type Story = StoryObj<typeof RadioButtonItem>

export const Basic: Story = {
	args: {},
}
