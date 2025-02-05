import type { Meta, StoryObj } from '@storybook/react'

import { customFaker } from '@/tests/utils/customFaker'

import { PhotoList } from './PhotoList'

const meta: Meta<typeof PhotoList> = {
	title: 'Components/Photo/PhotoList',
	component: PhotoList,
	args: {
		urlImages: Array.from({ length: 15 }, () => customFaker.image.url()),
	},
	argTypes: {
		urlImages: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof PhotoList>

export const Basic: Story = {
	args: {},
}
