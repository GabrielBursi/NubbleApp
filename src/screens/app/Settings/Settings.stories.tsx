import type { Meta, StoryObj } from '@storybook/react'

import { SettingsScreen } from './Settings'

const meta: Meta<typeof SettingsScreen> = {
	title: 'Screens/App/Stack/SettingsScreen',
	component: SettingsScreen,
	args: {},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof SettingsScreen>

export const Basic: Story = {
	args: {},
}
