import { renderHook, screen } from '@testing-library/react-native'
import { FormProvider, useForm } from 'react-hook-form'

import { customRender } from '@/tests/utils'

import { ControlledFormInput } from './ControlledFormInput'

describe('<ControlledFormInput/>', () => {
	it('should render the text input correctly', () => {
		const { result } = renderHook(() => useForm())
		customRender(
			<FormProvider {...result.current}>
				<ControlledFormInput label="Jest" name="jest" />
			</FormProvider>
		)

		expect(screen.getByLabelText('Jest')).toBeOnTheScreen()
	})

	it('should render the password input correctly', () => {
		const { result } = renderHook(() => useForm())
		customRender(
			<FormProvider {...result.current}>
				<ControlledFormInput.Password label="Jest" name="jest" />
			</FormProvider>
		)

		expect(screen.getByLabelText('Jest')).toBeOnTheScreen()
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
				/>
				<ControlledFormInput.Password
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
})
