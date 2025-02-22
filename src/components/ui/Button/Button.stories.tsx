import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { Box, Button, Text } from '@/components/ui'

const meta: Meta<typeof Button> = {
	title: 'UI/Button',
	component: Button,
	args: {
		title: 'Storybook',
		onPress: action('onPress'),
	},
	argTypes: {
		onPress: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof Button>

export const Basic: Story = {
	args: {},
	render: (args) => (
		<Box gap="s40">
			<Box gap="s12">
				<Text preset="headingSmall">Primary</Text>
				<Button {...args} />
				<Button {...args} loading />
				<Button {...args} disabled />
			</Box>

			<Box gap="s12">
				<Text preset="headingSmall">Outline</Text>
				<Button {...args} preset="outline" />
				<Button {...args} preset="outline" loading />
				<Button {...args} preset="outline" disabled />
			</Box>

			<Box gap="s12">
				<Text preset="headingSmall">Ghost</Text>
				<Button {...args} preset="ghost" />
				<Button {...args} preset="ghost" loading />
				<Button {...args} preset="ghost" disabled />
			</Box>
		</Box>
	),
}
