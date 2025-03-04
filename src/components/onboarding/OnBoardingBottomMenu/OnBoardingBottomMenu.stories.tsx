import type { Meta, StoryObj } from '@storybook/react'

import { OnBoardingBottomMenu } from './OnBoardingBottomMenu'

const meta: Meta<typeof OnBoardingBottomMenu> = {
	title: 'OnBoarding/BottomMenu',
	component: OnBoardingBottomMenu,
	args: {},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof OnBoardingBottomMenu>

export const Basic: Story = {
	args: {},
}
