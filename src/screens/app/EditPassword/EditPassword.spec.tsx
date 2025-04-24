import {
	fireEvent,
	screen,
	userEvent,
	waitFor,
} from '@testing-library/react-native'

import { useAuthUpdatePassword } from '@/domain/Auth/useCases/useAuthUpdatePassword/useAuthUpdatePassword'
import { useToastService } from '@/services/toast'
import { generateUser, mockUseNavigation } from '@/tests/mocks'
import { customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { EditPasswordScreen } from './EditPassword'

type UseAuthUpdatePassword = typeof useAuthUpdatePassword
type ReturnUseAuthUpdatePassword = ReturnHookMocked<UseAuthUpdatePassword>
type MockedUseAuthUpdatePassword = HookMocked<UseAuthUpdatePassword>

type UseToastService = typeof useToastService
type ReturnUseToastService = ReturnHookMocked<UseToastService>
type MockedUseToastService = HookMocked<UseToastService>

jest.mock('@/domain/Auth/useCases/useAuthUpdatePassword/useAuthUpdatePassword')
jest.mock('@/services/toast')

describe('<EditPasswordScreen/>', () => {
	const mockUpdatePassword = jest.fn()
	const mockShowToast = jest.fn()
	const mockUser = generateUser()

	const returnUseAuthUpdatePassword: ReturnUseAuthUpdatePassword = {
		isLoading: false,
		successMessage: null,
		updatePassword: mockUpdatePassword,
	}

	const returnUseToastService: ReturnUseToastService = {
		showToast: mockShowToast,
	}

	beforeEach(() => {
		;(useAuthUpdatePassword as MockedUseAuthUpdatePassword).mockReturnValue(
			returnUseAuthUpdatePassword
		)
		;(useAuthUpdatePassword as MockedUseAuthUpdatePassword).mockImplementation(
			({ onSuccess }: { onSuccess: () => void }) => {
				return {
					...returnUseAuthUpdatePassword,
					updatePassword: mockUpdatePassword.mockImplementation(() => {
						onSuccess()
					}),
				}
			}
		)
		;(useToastService as MockedUseToastService).mockReturnValue(
			returnUseToastService
		)
	})

	it('should render the screen correctly', () => {
		customRender(
			<EditPasswordScreen
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
				navigation={mockUseNavigation as any}
				route={{
					key: 'EditPasswordScreen',
					name: 'EditPasswordScreen',
					params: { userId: mockUser.id },
				}}
			/>
		)

		expect(screen.getByLabelText('Senha Atual', { exact: true })).toBeEnabled()
		expect(screen.getByLabelText('Nova Senha', { exact: true })).toBeEnabled()
		expect(
			screen.getByLabelText('Confirmar Senha', { exact: true })
		).toBeEnabled()
		expect(
			screen.getByRole('button', { name: /salvar alterações/i })
		).toBeDisabled()
		expect(screen.getByText('Alterar Senha', { exact: true })).toBeOnTheScreen()
	})

	it('should update the password', async () => {
		customRender(
			<EditPasswordScreen
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
				navigation={mockUseNavigation as any}
				route={{
					key: 'EditPasswordScreen',
					name: 'EditPasswordScreen',
					params: { userId: mockUser.id },
				}}
			/>
		)

		await userEvent.type(
			screen.getByPlaceholderText('Digite sua senha atual', { exact: true }),
			'12345678'
		)
		await userEvent.type(
			screen.getByPlaceholderText('Digite a nova senha', { exact: true }),
			'jest1234'
		)
		await userEvent.type(
			screen.getByPlaceholderText('Confirme sua senha', { exact: true }),
			'jest1234'
		)

		expect(
			screen.getByRole('button', { name: /salvar alterações/i })
		).toBeEnabled()
		await userEvent.press(
			screen.getByRole('button', { name: /salvar alterações/i })
		)
		expect(mockUpdatePassword).toHaveBeenCalledWith({
			currentPassword: '12345678',
			newPassword: 'jest1234',
		})
		expect(mockShowToast).toHaveBeenCalled()
		expect(mockUseNavigation.goBack).toHaveBeenCalled()
	})

	it('should validate the form', async () => {
		customRender(
			<EditPasswordScreen
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
				navigation={mockUseNavigation as any}
				route={{
					key: 'EditPasswordScreen',
					name: 'EditPasswordScreen',
					params: { userId: mockUser.id },
				}}
			/>
		)

		const confirmPassword = screen.getByPlaceholderText('Confirme sua senha', {
			exact: true,
		})

		fireEvent(confirmPassword, 'submitEditing')

		await waitFor(() => {
			expect(
				screen.getByText('Esse campo é obrigatório', { exact: true })
			).toBeOnTheScreen()
		})

		await waitFor(() => {
			expect(
				screen.getAllByText('Senha deve ter no mínimo 8 caracteres', {
					exact: true,
				})
			).toHaveLength(2)
		})
	})

	it('should focus on fields correctly', async () => {
		customRender(
			<EditPasswordScreen
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
				navigation={mockUseNavigation as any}
				route={{
					key: 'EditPasswordScreen',
					name: 'EditPasswordScreen',
					params: { userId: mockUser.id },
				}}
			/>
		)

		const fieldCurrentPassword = screen.getByLabelText('Senha Atual', {
			exact: true,
		})

		const fieldNewPassword = screen.getByLabelText('Nova Senha', {
			exact: true,
		})

		const fielConfirmedPassword = screen.getByLabelText('Confirmar Senha', {
			exact: true,
		})

		fireEvent(fieldCurrentPassword, 'submitEditing')

		await userEvent.press(screen.getByText('Senha Atual', { exact: true }))
		expect(
			screen.getByLabelText('Senha Atual', { exact: true })
		).toHaveAccessibilityState({
			selected: true,
		})

		fireEvent(fieldNewPassword, 'submitEditing')

		await userEvent.press(screen.getByText('Nova Senha', { exact: true }))
		expect(
			screen.getByLabelText('Nova Senha', { exact: true })
		).toHaveAccessibilityState({
			selected: true,
		})

		fireEvent(fielConfirmedPassword, 'submitEditing')

		await userEvent.press(screen.getByText('Confirmar Senha', { exact: true }))
		expect(
			screen.getByLabelText('Confirmar Senha', { exact: true })
		).toHaveAccessibilityState({
			selected: true,
		})
	})
})
