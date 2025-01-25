import { ComponentProps } from 'react'

import { OptionalProps, StrictOmit } from '@/types/utils'

import { TextInput } from '../TextInput/TextInput'

type TextInputProps = ComponentProps<typeof TextInput>

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
