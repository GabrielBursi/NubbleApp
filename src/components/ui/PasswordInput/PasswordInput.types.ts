import { ComponentProps } from 'react'

import { TextInput } from '@/components/ui'
import { OptionalProps, StrictOmit } from '@/types/utils'

type TextInputProps = ComponentProps<typeof TextInput>

export type PasswordInputProps = StrictOmit<
	TextInputProps,
	'RightComponent' | 'secureTextEntry' | 'label'
> &
	OptionalProps<TextInputProps, 'label'>
