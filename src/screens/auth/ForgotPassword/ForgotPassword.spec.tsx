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
		customRender(<ForgotPasswordScreen navigation={mockUseNavigation} />)

		await userEvent.press(
			screen.getByRole('button', { name: /Recuperar senha/i })
		)

		expect(mockUseNavigation.navigate).toHaveBeenCalledWith('SuccessScreen', {
			description:
				'Clique no link enviado no seu e-mail para recuperar sua senha',
			icon: { color: 'primary', name: 'messageRound' },
			title: `Enviamos as instruções para seu  ${'\n'}e-mail`,
		})
	})
})
