import type { Meta, StoryObj } from '@storybook/react'

import { Box } from './Box'
import { Text } from 'react-native'

const meta: Meta<typeof Box> = {
	title: 'UI/Box',
	component: Box,
	args: {
		paddingBottom: 's40',
		paddingLeft: 's56',
		marginTop: 's20',
		backgroundColor: 'carrotSecondary',
	},
	argTypes: {},
	render: (args) => (
		<Box {...args}>
			<Text>Storybook</Text>
		</Box>
	),
}
export default meta

type Story = StoryObj<typeof Box>

export const Basic: Story = {
	args: {},
}
