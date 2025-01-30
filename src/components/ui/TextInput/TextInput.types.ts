import { ComponentProps } from 'react'
import { TextInputProps as RNTextInputProps } from 'react-native'

import { Box } from '@/components/ui'
import { StrictOmit } from '@/types/utils'

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
