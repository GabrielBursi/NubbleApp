import type { Meta, StoryObj } from '@storybook/react'

import { generateUser } from '@/tests/mocks/mockUser'

import { EditProfileHeader } from './EditProfileHeader'

const meta: Meta<typeof EditProfileHeader> = {
	title: 'Components/EditProfileHeader',
	component: EditProfileHeader,
	args: {
		user: generateUser(),
	},
	argTypes: {
		user: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof EditProfileHeader>

export const Basic: Story = {
	args: {},
}
