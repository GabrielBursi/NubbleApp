import { ComponentProps } from 'react'
import {
	PressableProps,
	TextInputProps as RNTextInputProps,
} from 'react-native'

import { Box } from '@/components/ui'
import { NonUndefined, OptionalProps, StrictOmit } from '@/types/utils'

export type TextInputProps = StrictOmit<
	RNTextInputProps,
	| 'editable'
	| 'accessibilityLabel'
	| 'accessible'
	| 'onFocus'
	| 'onBlur'
	| 'style'
	| 'placeholderTextColor'
> & {
	label?: string
	errorMessage?: string
	RightComponent?: React.ReactElement
	LeftComponent?: React.ReactElement
	boxProps?: ComponentProps<typeof Box>
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
