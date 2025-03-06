import type { Meta, StoryObj } from '@storybook/react'

import { customFaker } from '@/tests/utils/customFaker'

import { OnBoardingProgressIndicator } from './OnBoardingProgressIndicator'

const meta: Meta<typeof OnBoardingProgressIndicator> = {
	title: 'OnBoarding/ProgressIndicator',
	component: OnBoardingProgressIndicator,
	args: {
		total: customFaker.number.int({ min: 5, max: 10 }),
		currentIndex: customFaker.number.int({ min: 5, max: 10 }),
	},
	argTypes: {
		total: {
			control: {
				min: 1,
				max: 10,
			},
		},
		currentIndex: {
			control: {
				min: 1,
				max: 10,
			},
		},
	},
}
export default meta

type Story = StoryObj<typeof OnBoardingProgressIndicator>

export const Basic: Story = {
	args: {},
}
