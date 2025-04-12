import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { TextInput, Container, Icon } from '@/components/ui'

const meta: Meta<typeof TextInput> = {
	title: 'UI/TextInput',
	component: TextInput,
	args: {
		label: 'Storybook',
		disabled: false,
		loading: false,
		allowClear: true,
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

type TextInputStory = StoryObj<typeof TextInput>
type EmailInputStory = StoryObj<typeof TextInput.Email>
type PasswordInputStory = StoryObj<typeof TextInput.Password>
type SendInputStory = StoryObj<typeof TextInput.Send>
type SearchInputStory = StoryObj<typeof TextInput.Search>
type TextAreaInputStory = StoryObj<typeof TextInput.TextArea>
type UsernameInputStory = StoryObj<typeof TextInput.Username>
type NameInputStory = StoryObj<typeof TextInput.Name>

export const Basic: TextInputStory = {
	args: {},
}

export const WithError: TextInputStory = {
	args: {
		errorMessage: 'Storybook error',
	},
}

export const WithIcon: TextInputStory = {
	args: {
		RightComponent: <Icon name="eyeOn" />,
	},
}

export const Disabled: TextInputStory = {
	args: {
		disabled: true,
	},
}

export const Loading: TextInputStory = {
	args: {
		loading: true,
	},
}

export const Email: EmailInputStory = {
	args: {
		label: 'E-mail',
	},
	render: (args) => <TextInput.Email {...args} />,
}

export const Password: PasswordInputStory = {
	args: {
		label: 'Senha',
	},
	render: (args) => <TextInput.Password {...args} />,
}

export const Send: SendInputStory = {
	args: {
		onPressSend: action('onPressSend'),
	},
	argTypes: {
		onPressSend: {
			type: 'symbol',
		},
	},
	render: (args) => <TextInput.Send {...args} />,
}

export const Search: SearchInputStory = {
	args: {},
	argTypes: {},
	render: (args) => <TextInput.Search {...args} />,
}

export const TextArea: TextAreaInputStory = {
	args: {},
	argTypes: {},
	render: (args) => <TextInput.TextArea {...args} />,
}

export const Username: UsernameInputStory = {
	args: {},
	argTypes: {},
	render: (args) => <TextInput.Username {...args} />,
}

export const Name: NameInputStory = {
	args: {},
	argTypes: {},
	render: (args) => <TextInput.Username {...args} />,
}
