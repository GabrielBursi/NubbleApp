import { screen, userEvent } from '@testing-library/react-native'
import { customRender } from '@/tests/utils'
import { ForgotPasswordScreen } from './ForgotPassword'
import { mockUseNavigation } from '@/tests/mocks'

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

		await userEvent.press(
			screen.getByRole('button', { name: /Recuperar senha/i })
		)

		expect(mockUseNavigation.reset).toHaveBeenCalled()
	})
})
