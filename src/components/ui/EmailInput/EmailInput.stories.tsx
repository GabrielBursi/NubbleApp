import type { Meta, StoryObj } from '@storybook/react'

import { EmailInput } from './EmailInput'

const meta: Meta<typeof EmailInput> = {
	title: 'UI/EmailInput',
	component: EmailInput,
	args: {},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof EmailInput>

export const Basic: Story = {
	args: {},
}
