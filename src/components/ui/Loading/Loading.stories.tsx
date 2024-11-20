import type { Meta, StoryObj } from '@storybook/react'

import { appTheme } from '@/styles'

import { Loading } from './Loading'

const meta: Meta<typeof Loading> = {
	title: 'UI/Loading',
	component: Loading,
	args: {
		color: 'greenPrimary',
		size: 84,
	},
	argTypes: {
		color: {
			options: Object.keys(appTheme.colors),
			control: { type: 'radio' },
		},
	},
}
export default meta

type Story = StoryObj<typeof Loading>

export const Basic: Story = {
	args: {},
}
