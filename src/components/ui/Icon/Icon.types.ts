import { PressableProps } from 'react-native'

import { IconName, ThemeColors } from '@/types/theme'

export type IconProps = {
	name: IconName
	color?: ThemeColors
	fillColor?: ThemeColors
	size?: number
} & Pick<PressableProps, 'onPress'>
