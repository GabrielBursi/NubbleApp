import type { Meta, StoryObj } from '@storybook/react'

import { Box, Divider, Text } from '@/components/ui'

const meta: Meta<typeof Divider> = {
	title: ' UI/Divider',
	component: Divider,
	args: {},
	argTypes: {},
	render: () => (
		<Box gap="s4">
			<Text>Storybook</Text>
			<Divider />
			<Text>Storybook</Text>
			<Divider />
			<Text>Storybook</Text>
		</Box>
	),
}
export default meta

type Story = StoryObj<typeof Divider>

export const Basic: Story = {
	args: {},
}
