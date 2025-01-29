import type { Meta, StoryObj } from '@storybook/react'

import { TextInput } from '..'

import { ScreenHeader } from './ScreenHeader'

const meta: Meta<typeof ScreenHeader> = {
	title: 'UI/ScreenHeader',
	component: ScreenHeader,
	args: {
		canGoBack: false,
		title: 'Storybook',
	},
	argTypes: {
		HeaderComponent: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof ScreenHeader>

export const Basic: Story = {
	args: {},
}

export const WithComponent: Story = {
	args: {
		HeaderComponent: <TextInput />,
	},
}
