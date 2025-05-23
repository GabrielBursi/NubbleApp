import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { Icon } from '../Icon/Icon'

import { RightIconTextInput } from './RightIconTextInput'

const meta: Meta<typeof RightIconTextInput> = {
	title: 'Components/RightIconTextInput',
	component: RightIconTextInput,
	args: {
		allowClear: false,
		isFocused: false,
		loading: false,
		rightIcon: <Icon name="bookmark" color="gray3" />,
		onClear: action('onClear'),
		value: 'sb',
	},
	argTypes: {
		rightIcon: {
			type: 'symbol',
		},
		onClear: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof RightIconTextInput>

export const Basic: Story = {
	args: {},
}
