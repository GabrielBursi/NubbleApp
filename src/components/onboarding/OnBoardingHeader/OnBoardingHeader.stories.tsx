import type { Meta, StoryObj } from '@storybook/react'

import { OnBoardingHeader } from './OnBoardingHeader'

const meta: Meta<typeof OnBoardingHeader> = {
	title: 'OnBoarding/OnBoardingHeader',
	component: OnBoardingHeader,
	args: {},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof OnBoardingHeader>

export const Basic: Story = {
	args: {},
}
