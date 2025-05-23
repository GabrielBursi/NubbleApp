import type { Meta, StoryObj } from '@storybook/react'

import { Box, Text } from '@/components/ui'
import { customFaker } from '@/tests/utils/customFaker'

const meta: Meta<typeof Text> = {
	title: 'UI/Text',
	component: Text,
	args: {},
	argTypes: {},
}
export default meta

type StoryText = StoryObj<typeof Text>
type StoryTextExpanded = StoryObj<typeof Text.Expanded>

export const Heading: StoryText = {
	render: () => (
		<Box gap="s10">
			<Text preset="headingLarge">Heading Large</Text>
			<Text preset="headingMedium">Heading Medium</Text>
			<Text preset="headingSmall">Heading Small</Text>
		</Box>
	),
}

export const Paragraph: StoryText = {
	render: () => (
		<Box gap="s24">
			<Box gap="s4">
				<Text preset="paragraphLarge">Paragraph Large</Text>
				<Text preset="paragraphMedium">Paragraph Medium</Text>
				<Text preset="paragraphSmall">Paragraph Small</Text>
			</Box>

			<Box gap="s4">
				<Text bold preset="paragraphLarge">
					Paragraph Large Bold
				</Text>
				<Text bold preset="paragraphMedium">
					Paragraph Medium Bold
				</Text>
				<Text bold preset="paragraphSmall">
					Paragraph Small Bold
				</Text>
			</Box>

			<Box gap="s4">
				<Text italic preset="paragraphLarge">
					Paragraph Large Italic
				</Text>
				<Text italic preset="paragraphMedium">
					Paragraph Medium Italic
				</Text>
				<Text italic preset="paragraphSmall">
					Paragraph Small Italic
				</Text>
			</Box>
		</Box>
	),
}

export const Expanded: StoryTextExpanded = {
	args: {
		numberOfLines: 4,
	},
	argTypes: {
		numberOfLines: {
			control: {
				type: 'number',
				max: 10,
				min: 2,
			},
		},
	},
	// eslint-disable-next-line react-native/no-raw-text
	render: (args) => (
		<Text.Expanded {...args}>
			{customFaker.lorem.paragraph({ min: 10, max: 20 })}
		</Text.Expanded>
	),
}
