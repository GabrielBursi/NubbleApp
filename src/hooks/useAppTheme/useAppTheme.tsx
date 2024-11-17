import { useTheme } from '@shopify/restyle'

import { themeConfig } from '@/styles'
import { AppTheme } from '@/types/theme'

export const useAppTheme = () => {
	const appTheme = useTheme<AppTheme>()
	return { ...appTheme, font: themeConfig.font } as const
}
