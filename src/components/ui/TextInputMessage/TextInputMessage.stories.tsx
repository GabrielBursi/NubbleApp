import { Alert } from 'react-native'

import type { Meta, StoryObj } from '@storybook/react'

import { TextInputMessage } from './TextInputMessage'

const meta: Meta<typeof TextInputMessage> = {
	title: 'UI/TextInputMessage',
	component: TextInputMessage,
	args: {
		onPressSend: () => Alert.alert('send!'),
	},
	argTypes: {
		onPressSend: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof TextInputMessage>

export const Basic: Story = {
	args: {},
}
