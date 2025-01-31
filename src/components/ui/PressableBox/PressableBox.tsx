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

import { PressableBoxProps } from './PressableBox.types'

export const PressableBox = createRestyleComponent<PressableBoxProps, AppTheme>(
	[backgroundColor, spacing, spacingShorthand, layout, border],
	TouchableOpacity
)
