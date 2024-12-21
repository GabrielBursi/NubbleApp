import { Alert } from 'react-native'

import type { Meta, StoryObj } from '@storybook/react'

import { SeeMore } from './SeeMore'

const meta: Meta<typeof SeeMore> = {
	title: 'Components/SeeMore',
	component: SeeMore,
	args: {
		onClickSeeMore: () => Alert.alert('Ver mais!'),
	},
	argTypes: {
		onClickSeeMore: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof SeeMore>

export const Basic: Story = {
	args: {},
}
