import { ThemeColors } from '@/types/theme'
import { StrictOmit } from '@/types/utils'

import { PressableBoxProps } from '../PressableBox/PressableBox.types'
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

export type InputButtonProps = {
	label: string
	value: string
} & StrictOmit<
	PressableBoxProps,
	| 'borderBottomColor'
	| 'borderBottomWidth'
	| 'paddingBottom'
	| 'role'
	| 'accessibilityRole'
	| 'accessible'
	| 'accessibilityLabel'
	| 'aria-label'
>
