import type { Meta, StoryObj } from '@storybook/react'

import { TextInput, Container, Icon } from '@/components/ui'

const meta: Meta<typeof TextInput> = {
	title: 'UI/TextInput',
	component: TextInput,
	args: {
		label: 'Storybook',
		disabled: false,
	},
	argTypes: {},
	render: (args) => (
		<Container>
			<TextInput {...args} />
			<TextInput {...args} />
		</Container>
	),
}
export default meta

type Story = StoryObj<typeof TextInput>

export const Basic: Story = {
	args: {},
}

export const WithError: Story = {
	args: {
		errorMessage: 'Storybook error',
	},
}

export const WithIcon: Story = {
	args: {
		RightComponent: <Icon name="eyeOn" />,
	},
}

export const Disabled: Story = {
	args: {
		disabled: true,
	},
}
