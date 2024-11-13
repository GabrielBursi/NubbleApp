import { screen, userEvent } from '@testing-library/react-native'
import { customRender } from '@/tests/utils'
import { LoginScreen } from './Login'
import { mockUseNavigation } from '@/tests/mocks'

describe('<LoginScreen/>', () => {
	it('should render the screen correctly', () => {
		customRender(
			<LoginScreen
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
				navigation={mockUseNavigation as any}
				route={{ key: 'LoginScreen', name: 'LoginScreen' }}
			/>
		)

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
			screen.getByRole('text', { name: /Esqueci minha senha/i })
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

	it('should navigate to forgot password screen correctly', async () => {
		customRender(
			<LoginScreen
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
				navigation={mockUseNavigation as any}
				route={{ key: 'LoginScreen', name: 'LoginScreen' }}
			/>
		)

		await userEvent.press(
			screen.getByRole('text', { name: /Esqueci minha senha/i })
		)

		expect(mockUseNavigation.navigate).toHaveBeenCalledWith(
			'ForgotPasswordScreen'
		)
	})

	it('should navigate to sign up screen correctly', async () => {
		customRender(
			<LoginScreen
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
				navigation={mockUseNavigation as any}
				route={{ key: 'LoginScreen', name: 'LoginScreen' }}
			/>
		)

		await userEvent.press(
			screen.getByRole('button', { name: /criar uma conta/i })
		)

		expect(mockUseNavigation.navigate).toHaveBeenCalledWith('SignUpScreen')
	})
})
