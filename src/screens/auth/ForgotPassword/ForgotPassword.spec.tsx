import {
	fireEvent,
	screen,
	userEvent,
	waitFor,
} from '@testing-library/react-native'

import { useAuthRequestNewPassword } from '@/domain/Auth/useCases/useAuthRequestNewPassword/useAuthRequestNewPassword'
import { useResetNavigation } from '@/hooks/useResetNavigation/useResetNavigation'
import { useToastService } from '@/services/toast/useToast'
import { customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { ForgotPasswordScreen } from './ForgotPassword'

type UseAuthRequestNewPassword = typeof useAuthRequestNewPassword
type ReturnUseAuthRequestNewPassword =
	ReturnHookMocked<UseAuthRequestNewPassword>
type MockUseAuthRequestNewPassword = HookMocked<UseAuthRequestNewPassword>

type UseResetNavigation = typeof useResetNavigation
type ReturnUseResetNavigation = ReturnHookMocked<UseResetNavigation>
type MockUseResetNavigation = HookMocked<UseResetNavigation>

type UseToastService = typeof useToastService
type ReturnUseToastService = ReturnHookMocked<UseToastService>
type MockUseToastService = HookMocked<UseToastService>

jest.mock(
	'@/domain/Auth/useCases/useAuthRequestNewPassword/useAuthRequestNewPassword'
)
jest.mock('@/hooks/useResetNavigation/useResetNavigation')
jest.mock('@/services/toast/useToast')

describe('<ForgotPasswordScreen/>', () => {
	const mockRequestNewPassword = jest.fn()
	const mockResetSuccess = jest.fn()
	const mockShowToast = jest.fn()

	const mockReturnUseAuthRequestNewPassword: ReturnUseAuthRequestNewPassword = {
		requestNewPassword: mockRequestNewPassword,
		isLoading: false,
	}

	const mockReturnUseResetNavigation: ReturnUseResetNavigation = {
		resetSuccess: mockResetSuccess,
	}

	const mockReturnUseToastService: ReturnUseToastService = {
		showToast: mockShowToast,
	}

	beforeEach(() => {
		;(
			useAuthRequestNewPassword as MockUseAuthRequestNewPassword
		).mockReturnValue(mockReturnUseAuthRequestNewPassword)
		;(useResetNavigation as MockUseResetNavigation).mockReturnValue(
			mockReturnUseResetNavigation
		)
		;(useToastService as MockUseToastService).mockReturnValue(
			mockReturnUseToastService
		)
		;(
			useAuthRequestNewPassword as MockUseAuthRequestNewPassword
		).mockImplementation(
			({
				onSuccess,
				onError,
			}: {
				onSuccess: () => void
				onError: () => void
			}) => {
				return {
					...mockReturnUseAuthRequestNewPassword,
					requestNewPassword: mockRequestNewPassword.mockImplementation(() => {
						onSuccess()
						onError()
					}),
				}
			}
		)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

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

	it('should call requestNewPassword and resetSuccess on valid email submission', async () => {
		customRender(<ForgotPasswordScreen />)

		await userEvent.type(
			screen.getByPlaceholderText('Digite seu e-mail', { exact: true }),
			'jest@email.com'
		)

		await userEvent.press(
			screen.getByRole('button', { name: /Recuperar senha/i })
		)

		expect(mockRequestNewPassword).toHaveBeenCalledWith('jest@email.com')
		await waitFor(() => {
			expect(mockResetSuccess).toHaveBeenCalledWith({
				title: 'Enviamos as instruções para seu  \n' + 'e-mail',
				description:
					'Clique no link enviado no seu e-mail para recuperar sua senha',
				icon: {
					name: 'messageRound',
					color: 'primary',
				},
			})
		})
	})

	it('should show toast error on failure', async () => {
		mockRequestNewPassword.mockImplementation(() => {
			throw new Error('Erro ao enviar o e-mail')
		})

		customRender(<ForgotPasswordScreen />)

		await userEvent.type(
			screen.getByPlaceholderText('Digite seu e-mail', { exact: true }),
			'jest@email.com'
		)

		await userEvent.press(
			screen.getByRole('button', { name: /Recuperar senha/i })
		)

		await waitFor(() => {
			expect(mockShowToast).toHaveBeenCalled()
		})
	})

	it('should validate the form correctly', async () => {
		customRender(<ForgotPasswordScreen />)

		expect(
			screen.getByRole('button', { name: /Recuperar senha/i })
		).toBeDisabled()

		await userEvent.type(
			screen.getByPlaceholderText('Digite seu e-mail', { exact: true }),
			'jest@email.com'
		)

		expect(
			screen.getByRole('button', { name: /Recuperar senha/i })
		).toBeEnabled()
	})

	it('should validate on submit editing email correctly', async () => {
		customRender(<ForgotPasswordScreen />)

		const fieldEmail = screen.getByPlaceholderText('Digite seu e-mail', {
			exact: true,
		})

		fireEvent(fieldEmail, 'submitEditing')

		await waitFor(() => {
			expect(
				screen.getByText('E-mail inválido', { exact: true })
			).toBeOnTheScreen()
		})

		await waitFor(() => {
			expect(
				screen.getByRole('button', { name: /recuperar senha/i })
			).toBeDisabled()
		})
	})
})
