import { screen, userEvent } from '@testing-library/react-native'

import { mockUseNavigation } from '@/tests/mocks'
import { customRender } from '@/tests/utils'

import { LoginScreen } from './Login'

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

	it('should validate the form correctly', async () => {
		customRender(
			<LoginScreen
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
				navigation={mockUseNavigation as any}
				route={{ key: 'LoginScreen', name: 'LoginScreen' }}
			/>
		)

		expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled()

		await userEvent.type(
			screen.getByPlaceholderText('Digite seu e-mail', {
				exact: true,
			}),
			'jest@email.com'
		)

		await userEvent.type(
			screen.getByPlaceholderText('Digite sua senha', {
				exact: true,
			}),
			'12345678'
		)

		expect(screen.getByRole('button', { name: /entrar/i })).toBeEnabled()
	})

	it('should do login correctly', async () => {
		customRender(
			<LoginScreen
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
				navigation={mockUseNavigation as any}
				route={{ key: 'LoginScreen', name: 'LoginScreen' }}
			/>
		)

		await userEvent.type(
			screen.getByPlaceholderText('Digite seu e-mail', {
				exact: true,
			}),
			'jest@email.com'
		)

		await userEvent.type(
			screen.getByPlaceholderText('Digite sua senha', {
				exact: true,
			}),
			'12345678'
		)

		await userEvent.press(screen.getByRole('button', { name: /entrar/i }))

		expect(mockUseNavigation.navigate).not.toHaveBeenCalled()
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
