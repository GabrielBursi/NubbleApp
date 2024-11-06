import { IconName, ThemeColors } from '@/types/theme'
import { PressableProps } from 'react-native'

export type IconProps = {
	name: IconName
	color?: ThemeColors
	fillColor?: ThemeColors
	size?: number
} & Pick<PressableProps, 'onPress'>
