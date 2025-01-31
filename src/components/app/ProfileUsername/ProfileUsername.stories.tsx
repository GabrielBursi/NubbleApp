import { Alert } from 'react-native'

import type { Meta, StoryObj } from '@storybook/react'

import { mockUser } from '@/tests/mocks/mockUser'

import { ProfileUsername } from './ProfileUsername'

const meta: Meta<typeof ProfileUsername> = {
	title: 'Components/ProfileUsername',
	component: ProfileUsername,
	args: {
		...mockUser,
		onPress: () => Alert.alert(mockUser.fullName),
	},
	argTypes: {
		profileUrl: {
			type: 'symbol',
		},
		onPress: {
			type: 'symbol',
		},
		RightComponent: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof ProfileUsername>

export const Basic: Story = {
	args: {},
}
