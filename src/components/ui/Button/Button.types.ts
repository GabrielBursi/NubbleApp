import { ThemeColors } from '@/types/theme'
import { TouchableOpacityBoxProps } from '../TouchableOpacityBox/TouchableOpacityBox.types'

export type ButtonUI = {
	container: TouchableOpacityBoxProps
	content: ThemeColors
}
export type ButtonState = {
	default: ButtonUI
	disabled: ButtonUI
}
export type ButtonPreset = 'primary' | 'outline'
export type ButtonProps = TouchableOpacityBoxProps & {
	title: string
	loading?: boolean
	preset?: ButtonPreset
	disabled?: boolean
}
