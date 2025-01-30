import React, { ForwardedRef, forwardRef } from 'react'
import { TextInput as RNTextInput } from 'react-native'

import { Controller, FieldValues } from 'react-hook-form'

import { TextInput } from '@/components'
import { useControlledInput } from '@/hooks'

import {
	ControlledEmailInputProps,
	ControlledPasswordInputProps,
	ControlledTextInputProps,
} from './ControlledFormInput.types'

const ControlledTextInputInternal = <TField extends FieldValues>(
	{
		control,
		name,
		rules,
		...textInputProps
	}: Readonly<ControlledTextInputProps<TField>>,
	ref: ForwardedRef<RNTextInput>
) => {
	const { maxValue, minValue } = useControlledInput(rules)

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field, fieldState }) => (
				<TextInput
					value={field.value}
					ref={ref}
					onChangeText={field.onChange}
					errorMessage={fieldState.error?.message}
					aria-valuemax={maxValue}
					aria-valuemin={minValue}
					boxProps={{ mb: 's20' }}
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

const ControlledPasswordInputInternal = <TField extends FieldValues>(
	{
		control,
		name,
		rules,
		errorMessage,
		...passwordInputProps
	}: Readonly<ControlledPasswordInputProps<TField>>,
	ref: ForwardedRef<RNTextInput>
) => {
	const { maxValue, minValue } = useControlledInput(rules)

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field, fieldState }) => (
				<TextInput.Password
					value={field.value}
					ref={ref}
					onChangeText={field.onChange}
					errorMessage={fieldState.error?.message ?? errorMessage}
					aria-valuemax={maxValue}
					aria-valuemin={minValue}
					boxProps={{ mb: 's20' }}
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

const ControlledEmailInputInternal = <TField extends FieldValues>(
	{
		control,
		name,
		rules,
		errorMessage,
		...emailInputProps
	}: Readonly<ControlledEmailInputProps<TField>>,
	ref: ForwardedRef<RNTextInput>
) => {
	const { maxValue, minValue } = useControlledInput(rules)

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field, fieldState }) => (
				<TextInput.Email
					value={field.value}
					ref={ref}
					onChangeText={field.onChange}
					errorMessage={fieldState.error?.message ?? errorMessage}
					aria-valuemax={maxValue}
					aria-valuemin={minValue}
					boxProps={{ mb: 's20' }}
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

const ControlledTextInputInternalWithRef = forwardRef(
	ControlledTextInputInternal
) as <TField extends FieldValues>(
	props: ControlledTextInputProps<TField> & {
		ref?: React.ForwardedRef<RNTextInput>
	}
) => ReturnType<typeof ControlledTextInputInternal>

const ControlledPasswordInputInternalWithRef = forwardRef(
	ControlledPasswordInputInternal
) as <TField extends FieldValues>(
	props: ControlledPasswordInputProps<TField> & {
		ref?: React.ForwardedRef<RNTextInput>
	}
) => ReturnType<typeof ControlledPasswordInputInternal>

const ControlledEmailInputInternalWithRef = forwardRef(
	ControlledEmailInputInternal
) as <TField extends FieldValues>(
	props: ControlledEmailInputProps<TField> & {
		ref?: React.ForwardedRef<RNTextInput>
	}
) => ReturnType<typeof ControlledEmailInputInternal>

type ControlledTextInputInternal = typeof ControlledTextInputInternalWithRef
type ControlledPasswordInputInternal =
	typeof ControlledPasswordInputInternalWithRef
type ControlledEmailInputInternal = typeof ControlledEmailInputInternalWithRef
type CompoundControlledFormInput = ControlledTextInputInternal & {
	Password: ControlledPasswordInputInternal
	Email: ControlledEmailInputInternal
}

export const ControlledFormInput =
	ControlledTextInputInternalWithRef as CompoundControlledFormInput
ControlledFormInput.Password = ControlledPasswordInputInternalWithRef
ControlledFormInput.Email = ControlledEmailInputInternalWithRef
