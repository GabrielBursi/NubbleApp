import { Button, Text } from 'react-native'

import type { Meta, StoryObj } from '@storybook/react'

import { Container } from './Container'

const meta: Meta<typeof Container> = {
	title: 'UI/Container',
	component: Container,
	args: {},
	argTypes: {},
	render: () => (
		<Container>
			<Text>Container</Text>
			<Button title="Container" onPress={() => console.log('Hi Storybook!')} />
		</Container>
	),
}
export default meta

type Story = StoryObj<typeof Container>

export const Basic: Story = {
	args: {},
}
