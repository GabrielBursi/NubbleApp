import { screen, userEvent } from '@testing-library/react-native'

import { mockUseNavigation } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

import { ForgotPasswordScreen } from './ForgotPassword'

describe('<ForgotPasswordScreen/>', () => {
	it('should render the screen correctly', () => {
		customRender(<ForgotPasswordScreen />)

		expect(
			screen.getByRole('text', { name: /Esqueci minha senha/i })
		).toBeOnTheScreen()
		expect(
			screen.getByRole('button', { name: /Recuperar senha/i })
		).toBeOnTheScreen()
		expect(screen.getByPlaceholderText('Digite seu e-mail')).toBeOnTheScreen()
	})

	it('should navigate to success screen on retrieve password correctly', async () => {
		customRender(<ForgotPasswordScreen />)

		await userEvent.type(
			screen.getByPlaceholderText('Digite seu e-mail', {
				exact: true,
			}),
			'jest@email.com'
		)

		await userEvent.press(
			screen.getByRole('button', { name: /Recuperar senha/i })
		)

		expect(mockUseNavigation.reset).toHaveBeenCalled()
	})

	it('should validate the form correctly', async () => {
		customRender(<ForgotPasswordScreen />)

		expect(
			screen.getByRole('button', { name: /Recuperar senha/i })
		).toBeDisabled()

		await userEvent.type(
			screen.getByPlaceholderText('Digite seu e-mail', {
				exact: true,
			}),
			'jest@email.com'
		)

		expect(
			screen.getByRole('button', { name: /Recuperar senha/i })
		).toBeEnabled()
	})
})
