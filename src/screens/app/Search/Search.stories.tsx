import type { Meta, StoryObj } from '@storybook/react'

import { SearchScreen } from './Search'

const meta: Meta<typeof SearchScreen> = {
	title: 'Screens/SearchScreen',
	component: SearchScreen,
	args: {},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof SearchScreen>

export const Basic: Story = {
	args: {},
}
