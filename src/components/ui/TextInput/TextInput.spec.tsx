import React from 'react'
import { TextInput as RNTextInput } from 'react-native'

import { screen, userEvent, fireEvent } from '@testing-library/react-native'

import { appTheme } from '@/styles'
import { customRender } from '@/tests/utils'

import { Icon } from '../Icon/Icon'

import { TextInput } from './TextInput'

describe('TextInput Compound', () => {
	const inputRef = React.createRef<RNTextInput>()

	describe('<TextInput />', () => {
		const mockOnChangeText = jest.fn()

		it('should render the input correctly', () => {
			customRender(<TextInput ref={inputRef} label="jest" />)

			expect(screen.getByLabelText('jest', { exact: true })).toBeOnTheScreen()
			expect(screen.getByText('jest', { exact: true })).toBeOnTheScreen()
		})

		it('should render the input with right icon correctly', () => {
			customRender(
				<TextInput
					ref={inputRef}
					label="jest"
					RightComponent={<Icon name="bell" />}
				/>
			)

			expect(screen.getByRole('img')).toBeOnTheScreen()
			expect(screen.getByTestId('bell')).toBeOnTheScreen()
		})

		it('should render the input with left icon correctly', () => {
			customRender(
				<TextInput
					ref={inputRef}
					label="jest"
					LeftComponent={<Icon name="bell" />}
				/>
			)

			expect(screen.getByRole('img')).toBeOnTheScreen()
			expect(screen.getByTestId('bell')).toBeOnTheScreen()
		})

		it('should render the input loading correctly', () => {
			customRender(
				<TextInput
					ref={inputRef}
					label="jest"
					RightComponent={<Icon name="bell" />}
					loading
				/>
			)

			expect(screen.queryByRole('img')).not.toBeOnTheScreen()
			expect(screen.queryByTestId('bell')).not.toBeOnTheScreen()
			expect(screen.getByTestId('spin-indicator')).toBeOnTheScreen()
		})

		it('should render the focused input correctly', () => {
			customRender(<TextInput ref={inputRef} label="jest" />)

			fireEvent.press(screen.getByPlaceholderText('Digite aqui'))
			expect(screen.getByTestId('container-internal-input')).toHaveStyle({
				borderColor: appTheme.colors['primary'],
			})
			expect(
				screen.getByLabelText('jest', { exact: true })
			).toHaveAccessibilityState({
				selected: true,
			})
		})

		it('should handle focus and blur on input correctly', async () => {
			customRender(<TextInput ref={inputRef} label="jest" />)

			await userEvent.type(screen.getByPlaceholderText('Digite aqui'), 'sb')
			expect(screen.getByTestId('container-internal-input')).toHaveStyle({
				borderColor: appTheme.colors['gray4'],
			})
			expect(
				screen.getByLabelText('jest', { exact: true })
			).toHaveAccessibilityState({
				selected: false,
			})
		})

		it('should focus input on click label correctly', async () => {
			customRender(<TextInput ref={inputRef} label="jest" />)

			await userEvent.press(screen.getByText('jest', { exact: true }))

			expect(screen.getByTestId('container-internal-input')).toHaveStyle({
				borderColor: appTheme.colors['primary'],
			})
			expect(
				screen.getByLabelText('jest', { exact: true })
			).toHaveAccessibilityState({
				selected: true,
			})
		})

		it('should render the disabled input correctly', () => {
			customRender(<TextInput ref={inputRef} label="jest" disabled />)

			expect(screen.getByTestId('container-internal-input')).toHaveStyle({
				backgroundColor: appTheme.colors['gray5'],
			})
			expect(
				screen.getByLabelText('jest', { exact: true })
			).toHaveAccessibilityState({
				disabled: true,
			})
		})

		it('should render the input with error correctly', () => {
			customRender(
				<TextInput ref={inputRef} label="jest" errorMessage="jest error" />
			)

			expect(screen.getByTestId('container-internal-input')).toHaveStyle({
				borderWidth: 2,
				borderColor: appTheme.colors['error'],
			})
			expect(screen.getByText('jest error', { exact: true })).toBeOnTheScreen()
		})

		it('should clear the input correctly', async () => {
			customRender(
				<TextInput
					ref={inputRef}
					label="Allow Clear"
					onChangeText={mockOnChangeText}
					allowClear
					value="allow clear"
				/>
			)

			await userEvent.press(screen.getByText('Allow Clear', { exact: true }))
			await userEvent.press(screen.getByRole('img', { name: 'close' }))

			expect(mockOnChangeText).toHaveBeenCalledWith('')
			expect(screen.getByTestId('container-internal-input')).toHaveStyle({
				borderColor: appTheme.colors['primary'],
			})
			expect(
				screen.getByLabelText('Allow Clear', { exact: true })
			).toHaveAccessibilityState({
				selected: true,
			})
		})
	})

	describe('<TextInput.Email />', () => {
		it('should render the email input correctly', () => {
			customRender(<TextInput.Email ref={inputRef} />)

			expect(screen.getByLabelText('E-mail', { exact: true })).toBeOnTheScreen()
			expect(screen.getByTestId('message', { exact: true })).toBeOnTheScreen()
		})
	})

	describe('<TextInput.Password />', () => {
		it('should render the password input correctly', () => {
			customRender(<TextInput.Password ref={inputRef} />)

			expect(screen.getByLabelText('Senha', { exact: true })).toBeOnTheScreen()
			expect(screen.getByRole('img')).toBeOnTheScreen()
		})

		it('should toogle the icon on change visibility correctly', async () => {
			customRender(<TextInput.Password ref={inputRef} />)

			expect(screen.getByTestId('eyeOn', { exact: true })).toBeOnTheScreen()
			await userEvent.press(screen.getByTestId('eyeOn', { exact: true }))
			expect(screen.getByTestId('eyeOff', { exact: true })).toBeOnTheScreen()
		})
	})

	describe('<TextInput.Send />', () => {
		const mockOnPressSend = jest.fn()

		it('should render send input correctly', () => {
			customRender(
				<TextInput.Send ref={inputRef} onPressSend={mockOnPressSend} />
			)

			expect(screen.getByRole('button', { name: /enviar/i })).toBeOnTheScreen()
			expect(
				screen.getByPlaceholderText('Digite aqui', { exact: true })
			).toBeOnTheScreen()
		})

		it('should disable button send when there is no value correctly', () => {
			customRender(
				<TextInput.Send ref={inputRef} onPressSend={mockOnPressSend} value="" />
			)

			expect(screen.getByRole('button', { name: /enviar/i })).toBeDisabled()
		})

		it('should call on press send correctly', async () => {
			customRender(
				<TextInput.Send
					ref={inputRef}
					onPressSend={mockOnPressSend}
					value="jest"
				/>
			)

			await userEvent.press(
				screen.getByTestId('container-input-message', { exact: true })
			)
			await userEvent.type(
				screen.getByPlaceholderText('Digite aqui', { exact: true }),
				'jest'
			)
			await userEvent.press(screen.getByRole('button', { name: /enviar/i }))
			expect(mockOnPressSend).toHaveBeenCalled()
		})
	})

	describe('<TextInput.Search />', () => {
		it('should render the search input correctly', () => {
			customRender(<TextInput.Search ref={inputRef} />)

			expect(
				screen.getByPlaceholderText('Procure aqui', { exact: true })
			).toBeOnTheScreen()
		})
	})
})
