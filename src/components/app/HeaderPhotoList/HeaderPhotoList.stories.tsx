import type { Meta, StoryObj } from '@storybook/react'

import { customFaker } from '@/tests/utils/customFaker'

import { HeaderPhotoList } from './HeaderPhotoList'

const meta: Meta<typeof HeaderPhotoList> = {
	title: 'Components/Photo/HeaderPhotoList',
	component: HeaderPhotoList,
	args: {
		selectedImage: {
			uri: customFaker.image.url(),
			id: customFaker.string.uuid(),
		},
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
