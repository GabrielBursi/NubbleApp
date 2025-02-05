import type { Meta, StoryObj } from '@storybook/react'

import { customFaker } from '@/tests/utils/customFaker'

import { HeaderPhotoList } from './HeaderPhotoList'

const meta: Meta<typeof HeaderPhotoList> = {
	title: 'Components/Photo/HeaderPhotoList',
	component: HeaderPhotoList,
	args: {
		selectedImage: customFaker.image.url(),
	},
	argTypes: {
		selectedImage: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof HeaderPhotoList>

export const Basic: Story = {
	args: {},
}
