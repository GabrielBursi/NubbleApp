import { ColorSchemeName } from 'react-native'

import { iconRegistry } from '@/components'
import { darkTheme, lightTheme, themeConfig } from '@/styles'

import { NonUndefined } from '../utils'

export type AppTheme = typeof lightTheme | typeof darkTheme
export type ThemeConfig = typeof themeConfig
export type ThemeColors = keyof AppTheme['colors']
export type ThemeFontFamilyKeys = keyof ThemeConfig['font']['family']
export type ThemeFontFamily = ThemeConfig['font']['family'][ThemeFontFamilyKeys]
export type ThemeSpacings = keyof ThemeConfig['spacings']
export type TextVariants =
	| 'headingLarge'
	| 'headingMedium'
	| 'headingSmall'
	| 'paragraphLarge'
	| 'paragraphMedium'
	| 'paragraphSmall'
	| 'paragraphCaption'
	| 'paragraphCaptionSmall'
export type IconType = typeof iconRegistry
export type IconName = keyof IconType
export type IconBase = {
	size?: number
	color?: string
	fillColor?: string
}

export type ThemeType = NonUndefined<NonNullable<ColorSchemeName>> | 'system'
