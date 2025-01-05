/* eslint-disable sonarjs/no-hardcoded-credentials */
import { screen, userEvent } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { useAuthLogin } from '@/domain/Auth/useCases/useAuthLogin/useAuthLogin'
import { useToastService } from '@/services/toast/useToast'
import { mockUseNavigation } from '@/tests/mocks'
import { serverTest } from '@/tests/server'
import { customRender } from '@/tests/utils'
import { END_POINTS_API } from '@/types/api'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { LoginScreen } from './Login'

type UseToastService = typeof useToastService
type ReturnUseToastService = ReturnHookMocked<UseToastService>
type MockUseToastService = HookMocked<UseToastService>

type UseAuthLogin = typeof useAuthLogin
type ReturnUseAuthLogin = ReturnHookMocked<UseAuthLogin>
type MockUseAuthLogin = HookMocked<UseAuthLogin>

jest.mock('@/domain/Auth/useCases/useAuthLogin/useAuthLogin')
jest.mock('@/services/toast/useToast')

describe('<LoginScreen/>', () => {
	const mockShowToast = jest.fn()
	const mockLogin = jest.fn()

	const mockUseToastService: ReturnUseToastService = {
		showToast: mockShowToast,
	}
	const mockUseAuthLogin: ReturnUseAuthLogin = {
		isLoading: false,
		authCredentials: null,
		login: mockLogin,
	}

	beforeEach(() => {
		;(useToastService as MockUseToastService).mockReturnValue(
			mockUseToastService
		)
		;(useAuthLogin as MockUseAuthLogin).mockReturnValue(mockUseAuthLogin)
		;(useAuthLogin as MockUseAuthLogin).mockImplementation(
			({ onError }: { onError: () => void }) => {
				return {
					...mockUseAuthLogin,
					login: mockLogin.mockImplementation(() => {
						onError()
					}),
				}
			}
		)
	})

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

	it('should does login correctly', async () => {
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

		expect(mockLogin).toHaveBeenCalledWith({
			email: 'jest@email.com',
			password: '12345678',
		})
	})

	it('should show message error on try to login correctly', async () => {
		serverTest.use(
			...[
				http.post(`${Config.API_URL}${END_POINTS_API.AUTH_SIGNIN}`, () =>
					HttpResponse.error()
				),
			]
		)

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

		expect(mockShowToast).toHaveBeenCalled()
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
