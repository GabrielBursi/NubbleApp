import React from 'react'
import { Controller, FieldValues } from 'react-hook-form'

import { PasswordInput, TextInput } from '@/components'

import {
	ControlledPasswordInputProps,
	ControlledTextInputProps,
} from './ControlledFormInput.types'

const ControlledTextInput = <TField extends FieldValues>({
	control,
	name,
	rules,
	...textInputProps
}: Readonly<ControlledTextInputProps<TField>>) => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field, fieldState }) => (
				<TextInput
					value={field.value}
					onChangeText={field.onChange}
					errorMessage={fieldState.error?.message}
					aria-valuemax={rules?.max ? Number(rules.max) : undefined}
					aria-valuemin={rules?.min ? Number(rules.min) : undefined}
					accessibilityValue={{
						max: rules?.max ? Number(rules.max) : undefined,
						min: rules?.min ? Number(rules.min) : undefined,
					}}
					{...textInputProps}
				/>
			)}
		/>
	)
}

const ControlledPasswordInput = <TField extends FieldValues>({
	control,
	name,
	rules,
	...passwordInputProps
}: Readonly<ControlledPasswordInputProps<TField>>) => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field, fieldState }) => (
				<PasswordInput
					value={field.value}
					onChangeText={field.onChange}
					errorMessage={fieldState.error?.message}
					aria-valuemax={rules?.max ? Number(rules.max) : undefined}
					aria-valuemin={rules?.min ? Number(rules.min) : undefined}
					accessibilityValue={{
						max: rules?.max ? Number(rules.max) : undefined,
						min: rules?.min ? Number(rules.min) : undefined,
					}}
					{...passwordInputProps}
				/>
			)}
		/>
	)
}

type ControlledTextInputInternal = typeof ControlledTextInput
type ControlledPasswordInputInternal = typeof ControlledPasswordInput
type CompoundControlledFormInput = ControlledTextInputInternal & {
	Password: ControlledPasswordInputInternal
}

export const ControlledFormInput =
	ControlledTextInput as CompoundControlledFormInput
ControlledFormInput.Password = ControlledPasswordInput
