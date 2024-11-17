import { TouchableOpacityProps as RNTouchableOpacityProps } from 'react-native'

import {
	BackgroundColorProps,
	BorderProps,
	LayoutProps,
	SpacingProps,
	SpacingShorthandProps,
} from '@shopify/restyle'

import { AppTheme } from '@/types/theme'

export type TouchableOpacityBoxProps = BackgroundColorProps<AppTheme> &
	SpacingProps<AppTheme> &
	LayoutProps<AppTheme> &
	BorderProps<AppTheme> &
	SpacingShorthandProps<AppTheme> &
	RNTouchableOpacityProps
