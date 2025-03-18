import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { EmptyList } from './EmptyList'

const meta: Meta<typeof EmptyList> = {
	title: 'Components/EmptyList',
	component: EmptyList,
	args: {
		emptyMessage: 'A lista está vazia',
		error: null,
		errorMessage: 'Ocorreu um erro ao tentar carregar a lista',
		loading: false,
		refetch: action('refetch'),
	},
	argTypes: {
		error: {
			type: 'symbol',
		},
		refetch: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof EmptyList>

export const Basic: Story = {
	args: {},
}
