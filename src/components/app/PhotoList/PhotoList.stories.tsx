import { Alert } from 'react-native'

import type { Meta, StoryObj } from '@storybook/react'

import { PhotoList as IPhotoList } from '@/services/cameraRoll'
import { customFaker } from '@/tests/utils/customFaker'

import { PhotoList } from './PhotoList'

const mockImages: IPhotoList[] = Array.from({ length: 15 }, () => ({
	uri: customFaker.image.url(),
	id: customFaker.string.uuid(),
}))

const meta: Meta<typeof PhotoList> = {
	title: 'Components/Photo/PhotoList',
	component: PhotoList,
	args: {
		photos: mockImages,
		onPressImage: (image) => Alert.alert(image.uri),
	},
	argTypes: {
		photos: {
			type: 'symbol',
		},
		indexSelectedImage: {
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
		photos: mockImages,
		indexSelectedImage: 0,
	},
}
