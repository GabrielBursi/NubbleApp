import { PropsWithChildren } from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { FormProvider, useForm } from 'react-hook-form'

import { ControlledFormInput } from './ControlledFormInput'

const MockFormProvider = ({ children }: PropsWithChildren) => {
	const form = useForm()
	return <FormProvider {...form}>{children}</FormProvider>
}

const meta: Meta<typeof ControlledFormInput> = {
	title: 'Components/ControlledFormInput',
	component: ControlledFormInput,
	args: {
		name: 'storybook',
		label: 'Storybook',
	},
	argTypes: {
		control: {
			type: 'symbol',
		},
		rules: {
			type: 'symbol',
		},
	},
	decorators: [
		(Story) => (
			<MockFormProvider>
				<Story />
			</MockFormProvider>
		),
	],
}
export default meta

type ControlledFormInputStory = StoryObj<typeof ControlledFormInput>
type ControlledFormEmailInputStory = StoryObj<typeof ControlledFormInput.Email>
type ControlledFormPasswordInputStory = StoryObj<
	typeof ControlledFormInput.Password
>
type ControlledFormUsernameInputStory = StoryObj<
	typeof ControlledFormInput.Username
>
type ControlledFormNameInputStory = StoryObj<typeof ControlledFormInput.Name>

export const Text: ControlledFormInputStory = {
	name: 'Text Input',
	args: {},
}

export const Password: ControlledFormPasswordInputStory = {
	name: 'Password Input',
	args: {
		label: 'Password',
	},
	render: (args) => <ControlledFormInput.Password {...args} />,
}

export const Email: ControlledFormEmailInputStory = {
	name: 'Email Input',
	args: {
		label: 'Email',
	},
	render: (args) => <ControlledFormInput.Email {...args} />,
}

export const Username: ControlledFormUsernameInputStory = {
	name: 'Username Input',
	args: {},
	render: (args) => <ControlledFormInput.Username {...args} />,
}

export const Name: ControlledFormNameInputStory = {
	name: 'Name Input',
	args: {
		label: 'Name',
	},
	render: (args) => <ControlledFormInput.Name {...args} />,
}
