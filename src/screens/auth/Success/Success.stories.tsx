import type { Meta, StoryObj } from '@storybook/react'

import { customFaker } from '@/tests/utils/customFaker'

import { SuccessScreen } from './Success'

const meta: Meta<typeof SuccessScreen> = {
	title: 'Screens/Auth/Stack/SuccessScreen',
	component: SuccessScreen,
	args: {
		route: {
			key: 'SuccessScreen',
			name: 'SuccessScreen',
			params: {
				description: customFaker.lorem.paragraph(),
				icon: {
					name: 'check',
				},
				title: customFaker.lorem.word(),
			},
		},
	},
	argTypes: {
		navigation: {
			type: 'symbol',
		},
		route: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof SuccessScreen>

export const Basic: Story = {
	args: {},
}
