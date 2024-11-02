import { ActivityIndicatorProps } from 'react-native'
import { ThemeColors } from '@/types/theme'
import { StrictOmit } from '@/types/utils'

export type LoadingProps = StrictOmit<ActivityIndicatorProps, 'color'> & {
	color: ThemeColors
}
