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

type Story = StoryObj<typeof ControlledFormInput>

export const Text: Story = {
	name: 'Text Input',
	args: {},
}

export const Password: Story = {
	name: 'Text Input',
	args: {
		label: 'Password',
	},
	render: (args) => <ControlledFormInput.Password {...args} />,
}
