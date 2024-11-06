import { iconRegistry } from '@/components'
import { appTheme, themeConfig } from '@/styles'

export type AppTheme = typeof appTheme
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
