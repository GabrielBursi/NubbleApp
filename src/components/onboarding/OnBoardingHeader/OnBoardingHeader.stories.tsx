import type { Meta, StoryObj } from '@storybook/react'

import { AppImages } from '@/assets/images'

import { OnBoardingHeader } from './OnBoardingHeader'

const meta: Meta<typeof OnBoardingHeader> = {
	title: 'OnBoarding/Header',
	component: OnBoardingHeader,
	args: {
		image: {
			dark: AppImages.OnboardingDark2,
			light: AppImages.OnboardingLight2,
		},
	},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof OnBoardingHeader>

export const Basic: Story = {
	args: {},
}
