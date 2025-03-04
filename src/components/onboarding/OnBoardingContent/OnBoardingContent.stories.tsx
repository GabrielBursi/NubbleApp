import type { Meta, StoryObj } from '@storybook/react'

import { customFaker } from '@/tests/utils/customFaker'

import { OnBoardingContent } from './OnBoardingContent'

const meta: Meta<typeof OnBoardingContent> = {
	title: 'OnBoarding/Content',
	component: OnBoardingContent,
	args: {
		subtitle: customFaker.lorem.sentence(),
		title: customFaker.lorem.word(),
	},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof OnBoardingContent>

export const Basic: Story = {
	args: {},
}
