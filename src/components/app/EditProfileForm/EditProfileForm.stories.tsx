import type { Meta, StoryObj } from '@storybook/react'

import { EditProfileForm } from './EditProfileForm'

const meta: Meta<typeof EditProfileForm> = {
	title: 'Components/EditProfileForm',
	component: EditProfileForm,
	args: {},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof EditProfileForm>

export const Basic: Story = {
	args: {},
}
