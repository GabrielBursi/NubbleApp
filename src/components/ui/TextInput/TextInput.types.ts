import {
	PressableProps,
	TextInputProps as RNTextInputProps,
} from 'react-native'

import { BoxProps } from '@/components/ui'
import { NonUndefined, OptionalProps, StrictOmit } from '@/types/utils'

export type TextInputProps = StrictOmit<
	RNTextInputProps,
	| 'editable'
	| 'accessibilityLabel'
	| 'accessible'
	| 'onFocus'
	| 'onBlur'
	| 'placeholderTextColor'
> & {
	label?: string
	errorMessage?: string
	RightComponent?: React.ReactElement
	LeftComponent?: React.ReactElement
	boxProps?: BoxProps
	/** @default false */
	disabled?: boolean
	/** @default false */
	loading?: boolean
	/** @default true */
	allowClear?: boolean
}

export type EmailInputProps = StrictOmit<
	TextInputProps,
	| 'secureTextEntry'
	| 'keyboardType'
	| 'autoCapitalize'
	| 'autoComplete'
	| 'autoCorrect'
	| 'label'
> &
	OptionalProps<TextInputProps, 'label'>

export type PasswordInputProps = StrictOmit<
	TextInputProps,
	'RightComponent' | 'secureTextEntry' | 'label' | 'allowClear'
> &
	OptionalProps<TextInputProps, 'label'>

export type SendInputProps = {
	onPressSend: NonUndefined<PressableProps['onPress']>
} & RNTextInputProps

export type SearchInputProps = StrictOmit<TextInputProps, 'LeftComponent'>

export type TextAreaInputProps = StrictOmit<
	TextInputProps,
	'multiline' | 'textAlignVertical' | 'style'
>

export type UsernameInputProps = StrictOmit<
	TextInputProps,
	'placeholder' | 'label' | 'autoCapitalize'
>

export type NameInputProps = StrictOmit<TextInputProps, 'autoCapitalize'>
