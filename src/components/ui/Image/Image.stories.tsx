import { Dimensions } from 'react-native'

import type { Meta, StoryObj } from '@storybook/react'

import { customFaker } from '@/tests/utils/customFaker'

import { Image } from './Image'

const meta: Meta<typeof Image> = {
	title: 'Components/Image',
	component: Image,
	args: {
		width: Dimensions.get('screen').width,
		height: Dimensions.get('screen').width,
		source: {
			uri: customFaker.image.url(),
		},
	},
	argTypes: {
		width: {
			type: 'symbol',
		},
		source: {
			type: 'symbol',
		},
		height: {
			type: 'symbol',
		},
	},
}
export default meta

type Story = StoryObj<typeof Image>

export const Basic: Story = {
	args: {},
}
