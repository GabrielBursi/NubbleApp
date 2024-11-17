import { FieldValues, UseControllerProps } from 'react-hook-form'

import { PasswordInputProps } from '@/components/ui/PasswordInput/PasswordInput.types'
import { TextInputProps } from '@/components/ui/TextInput/TextInput.types'

export type ControlledTextInputProps<TField extends FieldValues> =
	TextInputProps & UseControllerProps<TField>

export type ControlledPasswordInputProps<TField extends FieldValues> =
	PasswordInputProps & UseControllerProps<TField>
