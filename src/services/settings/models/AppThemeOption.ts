import { ThemeType } from '@/types/theme'

export type AppThemeOption = Exclude<ThemeType, 'system'>
