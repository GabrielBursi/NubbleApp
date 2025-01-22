import React, { ForwardedRef, forwardRef } from 'react'
import { TextInput as RNTextInput } from 'react-native'

import { Controller, FieldValues } from 'react-hook-form'

import { EmailInput, PasswordInput, TextInput } from '@/components'
import { useControlledInput } from '@/hooks'

import {
	ControlledEmailInputProps,
	ControlledPasswordInputProps,
	ControlledTextInputProps,
} from './ControlledFormInput.types'

const ControlledTextInputInner = <TField extends FieldValues>(
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

const ControlledPasswordInputInner = <TField extends FieldValues>(
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
				<PasswordInput
					value={field.value}
					ref={ref}
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

const ControlledEmailInputInner = <TField extends FieldValues>(
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
				<EmailInput
					value={field.value}
					ref={ref}
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

const ControlledTextInputInnerWithRef = forwardRef(
	ControlledTextInputInner
) as <TField extends FieldValues>(
	props: ControlledTextInputProps<TField> & {
		ref?: React.ForwardedRef<RNTextInput>
	}
) => ReturnType<typeof ControlledTextInputInner>

const ControlledPasswordInputInnerWithRef = forwardRef(
	ControlledPasswordInputInner
) as <TField extends FieldValues>(
	props: ControlledPasswordInputProps<TField> & {
		ref?: React.ForwardedRef<RNTextInput>
	}
) => ReturnType<typeof ControlledPasswordInputInner>

const ControlledEmailInputInnerWithRef = forwardRef(
	ControlledEmailInputInner
) as <TField extends FieldValues>(
	props: ControlledEmailInputProps<TField> & {
		ref?: React.ForwardedRef<RNTextInput>
	}
) => ReturnType<typeof ControlledEmailInputInner>

type ControlledTextInputInternal = typeof ControlledTextInputInnerWithRef
type ControlledPasswordInputInternal =
	typeof ControlledPasswordInputInnerWithRef
type ControlledEmailInputInternal = typeof ControlledEmailInputInnerWithRef
type CompoundControlledFormInput = ControlledTextInputInternal & {
	Password: ControlledPasswordInputInternal
	Email: ControlledEmailInputInternal
}

export const ControlledFormInput =
	ControlledTextInputInnerWithRef as CompoundControlledFormInput
ControlledFormInput.Password = ControlledPasswordInputInnerWithRef
ControlledFormInput.Email = ControlledEmailInputInnerWithRef
