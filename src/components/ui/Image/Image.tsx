import { memo } from 'react'
import { Image as RNImage } from 'react-native'

import {
	backgroundColor,
	border,
	createRestyleComponent,
	layout,
	spacing,
	spacingShorthand,
} from '@shopify/restyle'

import { AppImages } from '@/assets/images'
import { AppTheme } from '@/types/theme'
import { StrictOmit } from '@/types/utils'

import { ImageProps } from './Image.types'

const ImageRestyle = createRestyleComponent<ImageProps, AppTheme>(
	[backgroundColor, spacing, spacingShorthand, layout, border],
	RNImage
)

const ImageMemoized = (
	props: Readonly<StrictOmit<ImageProps, 'accessible' | 'role'>>
) => (
	<ImageRestyle
		defaultSource={AppImages.ImagePlaceholder}
		{...props}
		accessible
		role="img"
	/>
)

export const Image = memo(ImageMemoized)
