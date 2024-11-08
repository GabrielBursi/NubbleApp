import type { Meta, StoryObj } from '@storybook/react'

import { PasswordInput } from './PasswordInput'

const meta: Meta<typeof PasswordInput> = {
	title: 'UI/PasswordInput',
	component: PasswordInput,
	args: {
		label: 'Senha',
		disabled: false,
	},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof PasswordInput>

export const Basic: Story = {
	args: {},
}
