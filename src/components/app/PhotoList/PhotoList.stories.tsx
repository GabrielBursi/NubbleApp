import { Alert } from 'react-native'

import type { Meta, StoryObj } from '@storybook/react'

import { customFaker } from '@/tests/utils/customFaker'

import { PhotoList } from './PhotoList'

const images = Array.from({ length: 15 }, () => customFaker.image.url())

const meta: Meta<typeof PhotoList> = {
	title: 'Components/Photo/PhotoList',
	component: PhotoList,
	args: {
		urlImages: images,
		onPressImage: (uri) => Alert.alert(uri),
	},
	argTypes: {
		urlImages: {
			type: 'symbol',
		},
		selectedImage: {
			type: 'symbol',
		},
		onPressImage: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof PhotoList>

export const Basic: Story = {
	args: {},
}

export const WithSelectedImage: Story = {
	args: {
		urlImages: images,
		selectedImage: images[0],
	},
}
