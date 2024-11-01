import type { Meta, StoryObj } from '@storybook/react'

import { TouchableOpacityBox } from './TouchableOpacityBox'
import { Text } from 'react-native'

const meta: Meta<typeof TouchableOpacityBox> = {
	title: 'UI/TouchableOpacityBox',
	component: TouchableOpacityBox,
	args: {
		p: 's10',
		backgroundColor: 'buttonPrimary',
	},
	argTypes: {},
	render: (args) => (
		<TouchableOpacityBox onPress={() => console.log('Hi Storybook')} {...args}>
			<Text>Click Here</Text>
		</TouchableOpacityBox>
	),
}
export default meta

type Story = StoryObj<typeof TouchableOpacityBox>

export const Basic: Story = {
	args: {},
}
