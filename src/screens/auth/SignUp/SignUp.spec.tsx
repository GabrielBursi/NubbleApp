/* eslint-disable sonarjs/no-hardcoded-credentials */
import { screen, userEvent } from '@testing-library/react-native'

import { useAuthSignUp } from '@/domain/Auth/useCases/useAuthSignUp/useAuthSignUp'
import { useResetNavigation } from '@/hooks/useResetNavigation/useResetNavigation'
import { customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { SignUpScreen } from './SignUp'
type UseResetNavigation = typeof useResetNavigation
type ReturnUseResetNavigation = ReturnHookMocked<UseResetNavigation>
type MockUseResetNavigation = HookMocked<UseResetNavigation>

type UseAuthSignUp = typeof useAuthSignUp
type ReturnUseAuthSignUp = ReturnHookMocked<UseAuthSignUp>
type MockUseAuthSignUp = HookMocked<UseAuthSignUp>

jest.mock('@/domain/Auth/useCases/useAuthSignUp/useAuthSignUp')
jest.mock('@/hooks/useResetNavigation/useResetNavigation')

describe('<SignUpScreen/>', () => {
	const mockResetSuccess = jest.fn()
	const mockSignUp = jest.fn()

	const mockReturnUseResetNavigation: ReturnUseResetNavigation = {
		resetSuccess: mockResetSuccess,
	}

	const mockReturnUseAuthSignUp: ReturnUseAuthSignUp = {
		signUp: mockSignUp,
		isLoading: false,
	}

	beforeEach(() => {
		;(useResetNavigation as MockUseResetNavigation).mockReturnValue(
			mockReturnUseResetNavigation
		)
		;(useAuthSignUp as MockUseAuthSignUp).mockReturnValue(
			mockReturnUseAuthSignUp
		)
		;(useAuthSignUp as MockUseAuthSignUp).mockImplementation(
			({ onSuccess }: { onSuccess: () => void }) => {
				return {
					...mockReturnUseAuthSignUp,
					signUp: mockSignUp.mockImplementation(() => {
						onSuccess()
					}),
				}
			}
		)
	})

	it('should render the screen correctly', () => {
		customRender(<SignUpScreen />)

		expect(
			screen.getAllByRole('text', { name: 'Criar uma conta' })
		).toHaveLength(2)

		expect(
			screen.getByLabelText('Seu username', {
				exact: true,
			})
		).toBeOnTheScreen()
		expect(
			screen.getByLabelText('Nome', {
				exact: true,
			})
		).toBeOnTheScreen()
		expect(
			screen.getByLabelText('Sobrenome', {
				exact: true,
			})
		).toBeOnTheScreen()
		expect(
			screen.getByLabelText('E-mail', {
				exact: true,
			})
		).toBeOnTheScreen()
		expect(
			screen.getByLabelText('Senha', {
				exact: true,
			})
		).toBeOnTheScreen()
		expect(
			screen.getByRole('button', { name: /criar uma conta/i })
		).toBeOnTheScreen()
	})

	it('should signup correctly', async () => {
		customRender(<SignUpScreen />)

		await userEvent.type(
			screen.getByPlaceholderText('@', {
				exact: true,
			}),
			'user.name_123'
		)

		await userEvent.type(
			screen.getByPlaceholderText('Digite seu nome', {
				exact: true,
			}),
			'jest'
		)

		await userEvent.type(
			screen.getByPlaceholderText('Digite seu sobrenome', {
				exact: true,
			}),
			'jest'
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

		await userEvent.press(
			screen.getByRole('button', { name: /criar uma conta/i })
		)

		expect(mockSignUp).toHaveBeenCalledWith({
			email: 'jest@email.com',
			firstName: 'Jest',
			lastName: 'Jest',
			password: '12345678',
			username: 'user.name_123',
		})
		expect(mockResetSuccess).toHaveBeenCalledWith({
			description: 'Agora é só fazer login na nossa plataforma',
			icon: {
				color: 'success',
				name: 'checkRound',
			},
			title: 'Sua conta foi criada com sucesso!',
		})
	})

	it('should validate the form correctly', async () => {
		customRender(<SignUpScreen />)

		expect(
			screen.getByRole('button', { name: /criar uma conta/i })
		).toBeDisabled()

		await userEvent.type(
			screen.getByPlaceholderText('@', {
				exact: true,
			}),
			'user.name_123'
		)

		await userEvent.type(
			screen.getByPlaceholderText('Digite seu nome', {
				exact: true,
			}),
			'jest'
		)

		await userEvent.type(
			screen.getByPlaceholderText('Digite seu sobrenome', {
				exact: true,
			}),
			'jest'
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

		expect(
			screen.getByRole('button', { name: /criar uma conta/i })
		).toBeEnabled()
	})
})
