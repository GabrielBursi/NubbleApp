import { FieldValues, UseControllerProps } from 'react-hook-form'

import {
	TextInputProps,
	EmailInputProps,
	PasswordInputProps,
	UsernameInputProps,
	NameInputProps,
} from '@/components/ui/TextInput/TextInput.types'

type ControlledInputProps<
	TProps extends object,
	TField extends FieldValues,
> = TProps & UseControllerProps<TField>

export type ControlledTextInputProps<TField extends FieldValues> =
	ControlledInputProps<TextInputProps, TField>

export type ControlledPasswordInputProps<TField extends FieldValues> =
	ControlledInputProps<PasswordInputProps, TField>

export type ControlledEmailInputProps<TField extends FieldValues> =
	ControlledInputProps<EmailInputProps, TField>

export type ControlledUsernameInputProps<TField extends FieldValues> =
	ControlledInputProps<UsernameInputProps, TField>

export type ControlledNameInputProps<TField extends FieldValues> =
	ControlledInputProps<NameInputProps, TField>
