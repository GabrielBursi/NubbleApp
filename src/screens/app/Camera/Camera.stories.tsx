import type { Meta, StoryObj } from '@storybook/react'

import { CameraScreen } from './Camera'

const meta: Meta<typeof CameraScreen> = {
	title: 'Screens/CameraScreen',
	component: CameraScreen,
	args: {},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof CameraScreen>

export const Basic: Story = {
	args: {},
}
