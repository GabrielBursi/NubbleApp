import type { Meta, StoryObj } from '@storybook/react'

import { generateOnBoardingItem } from '@/tests/mocks/onboarding'

import { OnBoardingCarousel } from './OnBoardingCarousel'

const meta: Meta<typeof OnBoardingCarousel> = {
	title: 'OnBoarding/Carousel',
	component: OnBoardingCarousel,
	args: {
		items: [
			generateOnBoardingItem(),
			generateOnBoardingItem(),
			generateOnBoardingItem(),
			generateOnBoardingItem(),
		],
	},
	argTypes: {
		items: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof OnBoardingCarousel>

export const Basic: Story = {
	args: {},
}
