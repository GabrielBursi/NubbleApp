import { TouchableOpacity } from 'react-native'

import {
	backgroundColor,
	border,
	createRestyleComponent,
	layout,
	spacing,
	spacingShorthand,
} from '@shopify/restyle'

import { AppTheme } from '@/types/theme'

import { TouchableOpacityBoxProps } from './TouchableOpacityBox.types'

export const TouchableOpacityBox = createRestyleComponent<
	TouchableOpacityBoxProps,
	AppTheme
>(
	[backgroundColor, spacing, spacingShorthand, layout, border],
	TouchableOpacity
)
