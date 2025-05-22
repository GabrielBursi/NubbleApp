import type { Meta, StoryObj } from '@storybook/react'

import { customFaker } from '@/tests/utils/customFaker'

import { ProfileAvatar } from './ProfileAvatar'

const meta: Meta<typeof ProfileAvatar> = {
	title: 'Components/ProfileAvatar',
	component: ProfileAvatar,
	args: {
		imageURL: customFaker.image.url(),
		borderRadius: 14,
		size: 32,
		authorId: customFaker.number.int({ min: 1 }),
	},
	argTypes: {
		imageURL: {
			type: 'symbol',
		},
		authorId: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof ProfileAvatar>

export const Basic: Story = {
	args: {},
}

export const Placeholder: Story = {
	args: {
		imageURL: null,
	},
}
