import type { Meta, StoryObj } from '@storybook/react'

import { GoBack } from './GoBack'

const meta: Meta<typeof GoBack> = {
	title: 'Components/GoBack',
	component: GoBack,
	args: {
		showLabel: true,
	},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof GoBack>

export const Basic: Story = {
	args: {},
}
