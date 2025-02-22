import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { SeeMore } from './SeeMore'

const meta: Meta<typeof SeeMore> = {
	title: 'Components/SeeMore',
	component: SeeMore,
	args: {
		handleExpanded: action('handleExpanded'),
		textSeeLess: 'Ver menos',
		textSeeMore: 'Ver mais',
		expanded: false,
	},
	argTypes: {
		handleExpanded: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof SeeMore>

export const Basic: Story = {
	args: {},
}

export const Expanded: Story = {
	args: {
		expanded: true,
	},
}
