import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { generateOnBoardingItem } from '@/tests/mocks/onboarding'
import { customFaker } from '@/tests/utils/customFaker'

import { OnBoardingItem } from './OnBoardingItem'

const meta: Meta<typeof OnBoardingItem> = {
	title: 'OnBoarding/Item',
	component: OnBoardingItem,
	args: {
		onPressNext: action('onPressNext'),
		onPressSkip: action('onPressSkip'),
		item: generateOnBoardingItem(),
		isLast: false,
		total: customFaker.number.int({ min: 5, max: 10 }),
		index: customFaker.number.int({ min: 5, max: 10 }),
	},
	argTypes: {
		item: {
			type: 'symbol',
		},
		onPressNext: {
			type: 'symbol',
		},
		onPressSkip: {
			type: 'symbol',
		},
		total: {
			control: {
				min: 1,
				max: 10,
			},
		},
		index: {
			control: {
				min: 1,
				max: 10,
			},
		},
	},
}
export default meta

type Story = StoryObj<typeof OnBoardingItem>

export const Basic: Story = {
	args: {},
}
