import {
	act,
	fireEvent,
	screen,
	userEvent,
	waitFor,
} from '@testing-library/react-native'

import { useAuthValueIsAvailable } from '@/domain/Auth/useCases/useAuthValueIsAvailable/useAuthValueIsAvailable'
import { useUpdateUser } from '@/domain/User/useCases/useUpdateUser/useUpdateUser'
import { generateUser, mockUseNavigation } from '@/tests/mocks'
import { customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { EditProfileForm } from './EditProfileForm'

type UseAuthValueIsAvailable = typeof useAuthValueIsAvailable
type ReturnUseAuthValueIsAvailable = ReturnHookMocked<UseAuthValueIsAvailable>
type MockUseAuthValueIsAvailable = HookMocked<UseAuthValueIsAvailable>

type UseUpdateUser = typeof useUpdateUser
type ReturnUseUpdateUser = ReturnHookMocked<UseUpdateUser>
type MockUseUpdateUser = HookMocked<UseUpdateUser>

jest.mock(
	'@/domain/Auth/useCases/useAuthValueIsAvailable/useAuthValueIsAvailable'
)
jest.mock('@/domain/User/useCases/useUpdateUser/useUpdateUser')

describe('<EditProfileForm/>', () => {
	const mockUser = generateUser()
	const mockOnChangeValid = jest.fn()
	const mockOnChangeLoading = jest.fn()
	const mockUpdateUser = jest.fn()
	const mockRef = { current: { onSubmit: jest.fn() } }

	const mockReturnUseAuthValueIsAvailable: ReturnUseAuthValueIsAvailable = {
		isAvailable: false,
		isFetching: false,
		isUnavailable: false,
	}

	const mockReturnUseUpdateUser: ReturnUseUpdateUser = {
		isPending: false,
		isSuccess: false,
		user: null,
		update: mockUpdateUser,
	}

	beforeEach(() => {
		;(useAuthValueIsAvailable as MockUseAuthValueIsAvailable).mockReturnValue(
			mockReturnUseAuthValueIsAvailable
		)
		;(useUpdateUser as MockUseUpdateUser).mockReturnValue(
			mockReturnUseUpdateUser
		)
		;(useUpdateUser as MockUseUpdateUser).mockImplementation(
			({ onSuccess }: { onSuccess: () => void }) => {
				return {
					...mockReturnUseUpdateUser,
					update: mockUpdateUser.mockImplementation(() => {
						onSuccess()
					}),
				}
			}
		)
	})

	it('should render the fields disabled when user is not defined', () => {
		customRender(<EditProfileForm />)

		expect(screen.getByPlaceholderText('@', { exact: true })).toBeDisabled()
		expect(
			screen.getByPlaceholderText('Digite seu nome', { exact: true })
		).toBeDisabled()
		expect(
			screen.getByPlaceholderText('Digite seu sobrenome', { exact: true })
		).toBeDisabled()
	})

	it('should render the fields when user is defined', () => {
		customRender(<EditProfileForm user={mockUser} />)

		expect(
			screen.getByPlaceholderText('@', { exact: true })
		).toHaveDisplayValue(mockUser.username)
		expect(
			screen.getByPlaceholderText('Digite seu nome', { exact: true })
		).toHaveDisplayValue(mockUser.firstName)
		expect(
			screen.getByPlaceholderText('Digite seu sobrenome', { exact: true })
		).toHaveDisplayValue(mockUser.lastName)
	})

	it('should render the username field loading when user name is fetching', async () => {
		;(useAuthValueIsAvailable as MockUseAuthValueIsAvailable).mockReturnValue({
			...mockReturnUseAuthValueIsAvailable,
			isFetching: true,
		})

		customRender(<EditProfileForm user={mockUser} />)

		await userEvent.clear(screen.getByPlaceholderText('@', { exact: true }))
		await userEvent.type(
			screen.getByPlaceholderText('@', { exact: true }),
			'user.name_123'
		)

		expect(screen.getByTestId('spin-indicator')).toBeOnTheScreen()
	})

	it('should render the error on username field when user name is not available', async () => {
		;(useAuthValueIsAvailable as MockUseAuthValueIsAvailable).mockReturnValue({
			...mockReturnUseAuthValueIsAvailable,
			isUnavailable: true,
		})

		customRender(<EditProfileForm user={mockUser} />)

		await userEvent.clear(screen.getByPlaceholderText('@', { exact: true }))
		await userEvent.type(
			screen.getByPlaceholderText('@', { exact: true }),
			'user.name_123'
		)

		expect(
			screen.getByText('Usuário não está indisponível', { exact: true })
		).toBeOnTheScreen()
	})

	it('should call onChangeIsValid', async () => {
		customRender(
			<EditProfileForm user={mockUser} onChangeIsValid={mockOnChangeValid} />
		)
		await userEvent.type(
			screen.getByPlaceholderText('Digite seu nome', { exact: true }),
			'react'
		)
		await userEvent.type(
			screen.getByPlaceholderText('Digite seu sobrenome', { exact: true }),
			'native'
		)

		await waitFor(() => {
			expect(mockOnChangeValid).toHaveBeenCalledWith(true)
		})
	})

	it('should call onChangeIsLoading', () => {
		;(useUpdateUser as MockUseUpdateUser).mockReturnValue({
			...mockReturnUseUpdateUser,
			isPending: true,
		})

		customRender(
			<EditProfileForm
				user={mockUser}
				onChangeIsLoading={mockOnChangeLoading}
			/>
		)

		expect(mockOnChangeLoading).toHaveBeenCalledWith(true)
	})

	it('should focus on fields correctly', async () => {
		customRender(<EditProfileForm user={mockUser} />)

		const fieldUserName = screen.getByPlaceholderText('@', {
			exact: true,
		})

		const fieldName = screen.getByPlaceholderText('Digite seu nome', {
			exact: true,
		})

		const fieldLastName = screen.getByPlaceholderText('Digite seu sobrenome', {
			exact: true,
		})

		fireEvent(fieldUserName, 'submitEditing')

		await userEvent.press(screen.getByText('Nome', { exact: true }))
		expect(
			screen.getByPlaceholderText('Digite seu nome', { exact: true })
		).toHaveAccessibilityState({
			selected: true,
		})

		fireEvent(fieldName, 'submitEditing')

		await userEvent.press(screen.getByText('Sobrenome', { exact: true }))
		expect(
			screen.getByPlaceholderText('Digite seu sobrenome', { exact: true })
		).toHaveAccessibilityState({
			selected: true,
		})

		fireEvent(fieldLastName, 'submitEditing')
	})

	it('should validate form fields on submit', async () => {
		customRender(
			<EditProfileForm
				user={mockUser}
				ref={mockRef}
				onChangeIsValid={mockOnChangeValid}
			/>
		)

		const fieldUserName = screen.getByPlaceholderText('@', { exact: true })
		const fieldName = screen.getByPlaceholderText('Digite seu nome', {
			exact: true,
		})
		const fieldLastName = screen.getByPlaceholderText('Digite seu sobrenome', {
			exact: true,
		})

		await userEvent.clear(fieldUserName)
		await userEvent.clear(fieldName)
		await userEvent.clear(fieldLastName)

		fireEvent(fieldLastName, 'submitEditing')

		expect(mockOnChangeValid).toHaveBeenCalledWith(false)

		await userEvent.type(fieldUserName, 'user.name_123')
		await userEvent.type(fieldName, 'react')
		await userEvent.type(fieldLastName, 'native')

		expect(mockOnChangeValid).toHaveBeenCalledWith(true)
	})

	it('should update user on submit', async () => {
		customRender(
			<EditProfileForm
				user={mockUser}
				ref={mockRef}
				onChangeIsValid={mockOnChangeValid}
				onChangeIsLoading={mockOnChangeLoading}
			/>
		)

		const fieldUserName = screen.getByPlaceholderText('@', { exact: true })
		const fieldName = screen.getByPlaceholderText('Digite seu nome', {
			exact: true,
		})
		const fieldLastName = screen.getByPlaceholderText('Digite seu sobrenome', {
			exact: true,
		})

		await userEvent.clear(fieldUserName)
		await userEvent.clear(fieldName)
		await userEvent.clear(fieldLastName)

		await userEvent.type(fieldUserName, 'user.name_123')
		await userEvent.type(fieldName, 'react')
		await userEvent.type(fieldLastName, 'native')

		await act(() => {
			mockRef.current.onSubmit()
		})

		expect(mockUpdateUser).toHaveBeenCalledWith({
			firstName: 'React',
			lastName: 'Native',
			username: 'user.name_123',
		})
		expect(mockUseNavigation.goBack).toHaveBeenCalled()
	})
})
