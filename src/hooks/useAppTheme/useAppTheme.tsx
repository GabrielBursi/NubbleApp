import { useTheme } from '@shopify/restyle'
import { AppTheme } from '@/types/theme'
import { themeConfig } from '@/styles'

export const useAppTheme = () => {
	const appTheme = useTheme<AppTheme>()
	return { ...appTheme, font: themeConfig.font } as const
}
