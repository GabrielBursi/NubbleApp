import type { Meta, StoryObj } from '@storybook/react'

import { Profile } from './Profile'

const meta: Meta<typeof Profile> = {
	title: 'Components/Profile',
	component: Profile,
	args: {
		userId: 1,
	},
	argTypes: {
		userId: {
			control: {
				min: 1,
			},
			type: 'number',
		},
	},
}
export default meta

type Story = StoryObj<typeof Profile>

export const Basic: Story = {
	args: {},
}
