import { ThemeColors } from '@/types/theme'
import { StrictOmit } from '@/types/utils'

import { TextProps } from '../Text/Text.types'
import { TouchableOpacityBoxProps } from '../TouchableOpacityBox/TouchableOpacityBox.types'

export type ButtonUI = {
	container: TouchableOpacityBoxProps
	content: { color: ThemeColors; textProps?: StrictOmit<TextProps, 'children'> }
}
export type ButtonState = {
	default: ButtonUI
	disabled: ButtonUI
}
export type ButtonPreset = 'primary' | 'outline' | 'ghost' | 'gray'
export type ButtonProps = TouchableOpacityBoxProps & {
	title: string
	loading?: boolean
	preset?: ButtonPreset
	disabled?: boolean
}
