import React from 'react'

import { Controller, FieldValues } from 'react-hook-form'

import { EmailInput, PasswordInput, TextInput } from '@/components'
import { useControlledInput } from '@/hooks'

import {
	ControlledEmailInputProps,
	ControlledPasswordInputProps,
	ControlledTextInputProps,
} from './ControlledFormInput.types'

const ControlledTextInput = <TField extends FieldValues>({
	control,
	name,
	rules,
	...textInputProps
}: Readonly<ControlledTextInputProps<TField>>) => {
	const { maxValue, minValue } = useControlledInput(rules)

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
					aria-valuemax={maxValue}
					aria-valuemin={minValue}
					accessibilityValue={{
						max: maxValue,
						min: minValue,
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
	errorMessage,
	...passwordInputProps
}: Readonly<ControlledPasswordInputProps<TField>>) => {
	const { maxValue, minValue } = useControlledInput(rules)

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field, fieldState }) => (
				<PasswordInput
					value={field.value}
					onChangeText={field.onChange}
					errorMessage={fieldState.error?.message ?? errorMessage}
					aria-valuemax={maxValue}
					aria-valuemin={minValue}
					accessibilityValue={{
						max: maxValue,
						min: minValue,
					}}
					{...passwordInputProps}
				/>
			)}
		/>
	)
}

const ControlledEmailInput = <TField extends FieldValues>({
	control,
	name,
	rules,
	errorMessage,
	...emailInputProps
}: Readonly<ControlledEmailInputProps<TField>>) => {
	const { maxValue, minValue } = useControlledInput(rules)

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field, fieldState }) => (
				<EmailInput
					value={field.value}
					onChangeText={field.onChange}
					errorMessage={fieldState.error?.message ?? errorMessage}
					aria-valuemax={maxValue}
					aria-valuemin={minValue}
					accessibilityValue={{
						max: maxValue,
						min: minValue,
					}}
					{...emailInputProps}
				/>
			)}
		/>
	)
}

type ControlledTextInputInternal = typeof ControlledTextInput
type ControlledPasswordInputInternal = typeof ControlledPasswordInput
type ControlledEmailInputInternal = typeof ControlledEmailInput
type CompoundControlledFormInput = ControlledTextInputInternal & {
	Password: ControlledPasswordInputInternal
	Email: ControlledEmailInputInternal
}

export const ControlledFormInput =
	ControlledTextInput as CompoundControlledFormInput
ControlledFormInput.Password = ControlledPasswordInput
ControlledFormInput.Email = ControlledEmailInput
