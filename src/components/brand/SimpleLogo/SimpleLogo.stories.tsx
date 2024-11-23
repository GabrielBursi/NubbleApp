import type { Meta, StoryObj } from '@storybook/react'

import { SimpleLogo } from './SimpleLogo'

const meta: Meta<typeof SimpleLogo> = {
	title: 'Components/Brand/SimpleLogo',
	component: SimpleLogo,
	args: {
		width: 105,
	},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof SimpleLogo>

export const Basic: Story = {
	args: {},
}
