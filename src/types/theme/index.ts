import { appTheme, themeConfig } from '@/styles'

export type AppTheme = typeof appTheme
export type ThemeConfig = typeof themeConfig
export type ThemeColors = keyof AppTheme['colors']
export type ThemeFontFamily = keyof ThemeConfig['font']['family']
export type ThemeSpacings = keyof ThemeConfig['spacings']
