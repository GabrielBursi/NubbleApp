import { screen } from '@testing-library/react-native'
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
})
