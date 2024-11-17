import { TouchableOpacity } from 'react-native'

import {
	backgroundColor,
	border,
	createRestyleComponent,
	layout,
	spacing,
	spacingShorthand,
} from '@shopify/restyle'

import { TouchableOpacityBoxProps } from './TouchableOpacityBox.types'

import { AppTheme } from '@/types/theme'

export const TouchableOpacityBox = createRestyleComponent<
	TouchableOpacityBoxProps,
	AppTheme
>(
	[backgroundColor, spacing, spacingShorthand, layout, border],
	TouchableOpacity
)
