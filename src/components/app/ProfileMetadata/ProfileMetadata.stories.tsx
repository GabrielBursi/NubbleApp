import type { Meta, StoryObj } from '@storybook/react'

import { customFaker } from '@/tests/utils/customFaker'

import { ProfileMetadata } from './ProfileMetadata'

const meta: Meta<typeof ProfileMetadata> = {
	title: 'Components/ProfileMetadata',
	component: ProfileMetadata,
	args: {
		followersCount: customFaker.number.int({ min: 1 }),
		followingCount: customFaker.number.int({ min: 1 }),
		postsCount: customFaker.number.int({ min: 1 }),
		isMyProfile: false,
	},
	argTypes: {
		followersCount: {
			type: 'number',
			control: {
				min: 1,
			},
		},
		followingCount: {
			type: 'number',
			control: {
				min: 1,
			},
		},
		postsCount: {
			type: 'number',
			control: {
				min: 1,
			},
		},
	},
}
export default meta

type Story = StoryObj<typeof ProfileMetadata>

export const Basic: Story = {
	args: {},
}
