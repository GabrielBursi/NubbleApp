import type { Meta, StoryObj } from '@storybook/react'

import { FavoriteScreen } from './Favorite'

const meta: Meta<typeof FavoriteScreen> = {
	title: 'Screens/App/FavoriteScreen',
	component: FavoriteScreen,
	args: {},
	argTypes: {},
}
export default meta

type Story = StoryObj<typeof FavoriteScreen>

export const Basic: Story = {
	args: {},
}
