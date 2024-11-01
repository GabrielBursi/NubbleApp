import { useTheme } from '@shopify/restyle'
import { AppTheme } from '@/types/theme'

export const useAppTheme = () => useTheme<AppTheme>()
