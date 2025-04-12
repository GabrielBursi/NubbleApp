import { createRef } from 'react'
import { TextInput as RNTextInput } from 'react-native'

import { renderHook, screen } from '@testing-library/react-native'
import { FormProvider, useForm } from 'react-hook-form'

import { customRender } from '@/tests/utils'

import { ControlledFormInput } from './ControlledFormInput'

describe('<ControlledFormInput/>', () => {
	const inputRef = createRef<RNTextInput>()

	it('should render the text input correctly', () => {
		const { result } = renderHook(() => useForm())
		customRender(
			<FormProvider {...result.current}>
				<ControlledFormInput ref={inputRef} label="Jest" name="jest" />
			</FormProvider>
		)

		expect(screen.getByLabelText('Jest')).toBeOnTheScreen()
	})

	it('should render the password input correctly', () => {
		const { result } = renderHook(() => useForm())
		customRender(
			<FormProvider {...result.current}>
				<ControlledFormInput.Password ref={inputRef} label="Jest" name="jest" />
			</FormProvider>
		)

		expect(screen.getByLabelText('Jest')).toBeOnTheScreen()
	})

	it('should render the email input correctly', () => {
		const { result } = renderHook(() => useForm())
		customRender(
			<FormProvider {...result.current}>
				<ControlledFormInput.Email ref={inputRef} label="Jest" name="jest" />
			</FormProvider>
		)

		expect(screen.getByLabelText('Jest')).toBeOnTheScreen()
	})

	it('should render the username input correctly', () => {
		const { result } = renderHook(() => useForm())
		customRender(
			<FormProvider {...result.current}>
				<ControlledFormInput.Username ref={inputRef} name="username" />
			</FormProvider>
		)

		expect(screen.getByLabelText('Seu username')).toBeOnTheScreen()
	})

	it('should render the name input correctly', () => {
		const { result } = renderHook(() => useForm())
		customRender(
			<FormProvider {...result.current}>
				<ControlledFormInput.Name ref={inputRef} name="name" label="Nome" />
			</FormProvider>
		)

		expect(screen.getByLabelText('Nome')).toBeOnTheScreen()
	})

	it('should render with rules correctly', () => {
		const { result } = renderHook(() => useForm())
		customRender(
			<FormProvider {...result.current}>
				<ControlledFormInput
					rules={{ max: 10, min: 2 }}
					label="Jest"
					name="jest"
					testID="rtl"
					ref={inputRef}
				/>
				<ControlledFormInput.Password
					ref={inputRef}
					rules={{ max: 10, min: 2 }}
					label="Jest"
					name="jest"
					testID="jest"
				/>
			</FormProvider>
		)

		expect(screen.getByTestId('rtl')).toHaveAccessibilityValue({
			max: 10,
			min: 2,
		})

		expect(screen.getByTestId('jest')).toHaveAccessibilityValue({
			max: 10,
			min: 2,
		})
	})

	it('should render with error message correctly', () => {
		const { result } = renderHook(() => useForm())
		customRender(
			<FormProvider {...result.current}>
				<ControlledFormInput
					ref={inputRef}
					label="Jest"
					name="jest"
					testID="rtl"
					errorMessage="jest error"
				/>
			</FormProvider>
		)

		expect(screen.getByText('jest error', { exact: true })).toBeOnTheScreen()
	})
})
