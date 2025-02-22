import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { Text } from '../Text/Text'

import { PressableBox } from './PressableBox'

const meta: Meta<typeof PressableBox> = {
	title: 'UI/PressableBox',
	component: PressableBox,
	args: {
		paddingBottom: 's40',
		paddingLeft: 's56',
		marginTop: 's20',
		backgroundColor: 'carrotSecondary',
		onPress: action('onPress'),
	},
	argTypes: {
		onPress: {
			type: 'symbol',
		},
	},
	render: (args) => (
		<PressableBox {...args}>
			<Text>Storybook</Text>
		</PressableBox>
	),
}
export default meta

type Story = StoryObj<typeof PressableBox>

export const Basic: Story = {
	args: {},
}
