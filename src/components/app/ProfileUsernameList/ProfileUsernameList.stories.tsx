import { Alert } from 'react-native'

import type { Meta, StoryObj } from '@storybook/react'

import { mockUsers } from '@/tests/mocks/mockUser'

import { ProfileUsernameList } from './ProfileUsernameList'

const meta: Meta<typeof ProfileUsernameList> = {
	title: 'Components/ProfileUsernameList',
	component: ProfileUsernameList,
	args: {
		users: mockUsers,
		onPressProfileItem: (user) => Alert.alert(user.fullName),
		onRemoveProfileItem: (user) => Alert.alert(user.fullName),
	},
	argTypes: {
		users: {
			type: 'symbol',
		},
		onPressProfileItem: {
			type: 'symbol',
		},
		onRemoveProfileItem: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof ProfileUsernameList>

export const Basic: Story = {
	args: {},
}

export const WithHeader: Story = {
	args: {
		headerTitle: 'Storybook',
	},
}
