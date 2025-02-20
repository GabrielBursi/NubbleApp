import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { customFaker } from '@/tests/utils/customFaker'

import { MenuItemList } from './MenuItemList'

const meta: Meta<typeof MenuItemList> = {
	title: 'Components/MenuItemList',
	component: MenuItemList,
	args: {
		items: [
			{ label: customFaker.lorem.word(), onPress: action('onPress') },
			{ label: customFaker.lorem.words(3), onPress: action('onPress') },
			{ label: customFaker.lorem.word(), onPress: action('onPress') },
			{ label: customFaker.lorem.words(2), onPress: action('onPress') },
			{ label: customFaker.lorem.word(), onPress: action('onPress') },
		],
	},
	argTypes: {
		items: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof MenuItemList>

export const Basic: Story = {
	args: {},
}
