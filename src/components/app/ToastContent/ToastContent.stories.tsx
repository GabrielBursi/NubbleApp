import type { Meta, StoryObj } from '@storybook/react'

import { generateToast } from '@/tests/mocks'

import { ToastContent } from './ToastContent'

const meta: Meta<typeof ToastContent> = {
	title: 'Components/ToastContent',
	component: ToastContent,
	args: generateToast(),
	argTypes: {
		action: {
			type: 'symbol',
		},
		position: {
			control: 'inline-radio',
			options: ['bottom', 'top'],
		},
		type: {
			control: 'inline-radio',
			options: ['error', 'success'],
		},
	},
}
export default meta

type Story = StoryObj<typeof ToastContent>

export const Success: Story = {
	args: {
		type: 'success',
	},
}

export const ErrorToast: Story = {
	name: 'Error',
	args: {
		type: 'error',
	},
}
