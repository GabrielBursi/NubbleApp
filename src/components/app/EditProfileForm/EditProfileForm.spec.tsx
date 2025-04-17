import { fireEvent, screen, userEvent } from '@testing-library/react-native'

import { useAuthValueIsAvailable } from '@/domain/Auth/useCases/useAuthValueIsAvailable/useAuthValueIsAvailable'
import { generateUser } from '@/tests/mocks'
import { customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { EditProfileForm } from './EditProfileForm'

type UseAuthValueIsAvailable = typeof useAuthValueIsAvailable
type ReturnUseAuthValueIsAvailable = ReturnHookMocked<UseAuthValueIsAvailable>
type MockUseAuthValueIsAvailable = HookMocked<UseAuthValueIsAvailable>

jest.mock(
	'@/domain/Auth/useCases/useAuthValueIsAvailable/useAuthValueIsAvailable'
)

describe('<EditProfileForm/>', () => {
	const mockUser = generateUser()
	const mockOnChangeValid = jest.fn()
	const mockRef = { current: { onSubmit: jest.fn() } }

	const mockReturnUseAuthValueIsAvailable: ReturnUseAuthValueIsAvailable = {
		isAvailable: false,
		isFetching: false,
		isUnavailable: false,
	}

	beforeEach(() => {
		;(useAuthValueIsAvailable as MockUseAuthValueIsAvailable).mockReturnValue(
			mockReturnUseAuthValueIsAvailable
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

	it('should render the username field loading when user name is fetching', () => {
		;(useAuthValueIsAvailable as MockUseAuthValueIsAvailable).mockReturnValue({
			...mockReturnUseAuthValueIsAvailable,
			isFetching: true,
		})

		customRender(<EditProfileForm user={mockUser} />)

		expect(screen.getByTestId('spin-indicator')).toBeOnTheScreen()
	})

	it('should render the error on username field when user name is not available', () => {
		;(useAuthValueIsAvailable as MockUseAuthValueIsAvailable).mockReturnValue({
			...mockReturnUseAuthValueIsAvailable,
			isUnavailable: true,
		})

		customRender(<EditProfileForm user={mockUser} />)

		expect(
			screen.getByText('Usuário não está indisponível', { exact: true })
		).toBeOnTheScreen()
	})

	it('should call onChangeIsValid', async () => {
		;(useAuthValueIsAvailable as MockUseAuthValueIsAvailable).mockReturnValue({
			...mockReturnUseAuthValueIsAvailable,
			isFetching: false,
		})

		customRender(
			<EditProfileForm user={mockUser} onChangeIsValid={mockOnChangeValid} />
		)

		await userEvent.type(
			screen.getByPlaceholderText('@', { exact: true }),
			'user.name_123'
		)
		await userEvent.type(
			screen.getByPlaceholderText('Digite seu nome', { exact: true }),
			'react'
		)
		await userEvent.type(
			screen.getByPlaceholderText('Digite seu sobrenome', { exact: true }),
			'native'
		)

		expect(mockOnChangeValid).toHaveBeenCalledWith(true)
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
})
