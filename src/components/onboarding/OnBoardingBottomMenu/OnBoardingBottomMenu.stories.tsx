import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { OnBoardingBottomMenu } from './OnBoardingBottomMenu'

const meta: Meta<typeof OnBoardingBottomMenu> = {
	title: 'OnBoarding/BottomMenu',
	component: OnBoardingBottomMenu,
	args: {
		onPressNext: action('onPressNext'),
		onPressSkip: action('onPressSkip'),
		isLast: false,
	},
	argTypes: {
		onPressNext: {
			type: 'symbol',
		},
		onPressSkip: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof OnBoardingBottomMenu>

export const Basic: Story = {
	args: {},
}
