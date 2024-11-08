import { screen } from '@testing-library/react-native'
import { customRender } from '@/tests/utils'
import { LoginScreen } from './Login'

describe('<LoginScreen/>', () => {
	it('should render the screen correctly', () => {
		customRender(<LoginScreen />)

		expect(screen.getByText('Olá', { exact: true })).toBeOnTheScreen()
		expect(
			screen.getByText('Digite seu e-mail e senha para entrar', { exact: true })
		).toBeOnTheScreen()
		expect(
			screen.getByPlaceholderText('Digite seu e-mail', {
				exact: true,
			})
		).toBeOnTheScreen()
		expect(
			screen.getByPlaceholderText('Digite sua senha', {
				exact: true,
			})
		).toBeOnTheScreen()
		expect(screen.getByRole('button', { name: /entrar/i })).toBeOnTheScreen()
		expect(
			screen.getByRole('button', { name: /criar uma conta/i })
		).toBeOnTheScreen()
	})
})
