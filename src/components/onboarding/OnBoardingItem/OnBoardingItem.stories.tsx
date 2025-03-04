import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { AppImages } from '@/assets/images'
import { customFaker } from '@/tests/utils/customFaker'

import { OnBoardingItem } from './OnBoardingItem'

const meta: Meta<typeof OnBoardingItem> = {
	title: 'OnBoarding/Item',
	component: OnBoardingItem,
	args: {
		onPressNext: action('onPressNext'),
		onPressSkip: action('onPressSkip'),
		item: {
			subtitle: customFaker.lorem.sentence(),
			title: customFaker.lorem.word(),
			image: {
				dark: AppImages.OnboardingDark3,
				light: AppImages.OnboardingLight3,
			},
		},
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
	},
}
export default meta

type Story = StoryObj<typeof OnBoardingItem>

export const Basic: Story = {
	args: {},
}
