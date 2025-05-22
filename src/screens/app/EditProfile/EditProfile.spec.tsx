import { screen, userEvent, waitFor } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import Config from 'react-native-config'

import { FieldIsAvailableAPIModel } from '@/domain/Auth'
import { useUserGetById } from '@/domain/User/useCases/useUserGetById/useUserGetById'
import { generateUser, mockUseNavigation } from '@/tests/mocks'
import { serverTest } from '@/tests/server'
import { customRender } from '@/tests/utils'
import { END_POINTS_API } from '@/types/api'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { EditProfileScreen } from './EditProfile'

type UseUserGetById = typeof useUserGetById
type ReturnUseUseUserGetById = ReturnHookMocked<UseUserGetById>
type MockUseUseUserGetById = HookMocked<UseUserGetById>

jest.mock('@/domain/User/useCases/useUserGetById/useUserGetById')

describe('<EditProfileScreen/>', () => {
	const mockUser = generateUser()

	const mockReturnUseUseUserGetById: ReturnUseUseUserGetById = {
		user: mockUser,
		error: null,
		isLoading: false,
	}

	beforeEach(() => {
		;(useUserGetById as MockUseUseUserGetById).mockReturnValue(
			mockReturnUseUseUserGetById
		)
	})

	const editProfileScreen = (
		<EditProfileScreen // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
			navigation={mockUseNavigation as any}
			route={{
				key: 'EditProfileScreen',
				name: 'EditProfileScreen',
				params: {
					userId: mockUser.id,
				},
				path: 'EditProfileScreen',
			}}
		/>
	)

	it('should call useUserGetById correctly', () => {
		customRender(editProfileScreen)
		expect(useUserGetById).toHaveBeenCalledWith(mockUser.id)
	})

	it('should edit profile screen correctly', () => {
		customRender(editProfileScreen)
		expect(
			screen.getByRole('img', { name: mockUser.profileUrl! })
		).toBeOnTheScreen()
		expect(
			screen.getByRole('text', { name: 'Editar Perfil' })
		).toBeOnTheScreen()
		expect(screen.getByRole('button', { name: /email/i })).toBeOnTheScreen()
		expect(screen.getByText(mockUser.email, { exact: true })).toBeOnTheScreen()
		expect(screen.getByRole('button', { name: /senha/i })).toBeOnTheScreen()
		expect(
			screen.getByRole('button', { name: /salvar alterações/i })
		).toBeDisabled()
		expect(
			screen.getByRole('button', { name: /salvar alterações/i })
		).toBeDisabled()
		expect(screen.getByRole('form')).toBeOnTheScreen()
	})

	it('should navigate to edit email and edit password screen', async () => {
		;(useUserGetById as MockUseUseUserGetById).mockReturnValue({
			...mockReturnUseUseUserGetById,
			user: null,
		})

		customRender(editProfileScreen)

		await userEvent.press(screen.getByRole('button', { name: /email/i }))
		await userEvent.press(screen.getByRole('button', { name: /senha/i }))

		expect(mockUseNavigation.navigate).toHaveBeenCalledTimes(2)
		expect(mockUseNavigation.navigate).toHaveBeenCalledWith('EditEmailScreen', {
			userId: mockUser.id,
		})
		expect(mockUseNavigation.navigate).toHaveBeenCalledWith(
			'EditPasswordScreen',
			{
				userId: mockUser.id,
			}
		)
	})

	it('should submit the form', async () => {
		serverTest.use(
			...[
				http.get(
					`${Config.API_URL}${END_POINTS_API.AUTH_VALIDATE_USERNAME}`,
					() =>
						HttpResponse.json<FieldIsAvailableAPIModel>(
							{ isAvailable: true, message: 'true' },
							{ status: 200 }
						)
				),
			]
		)

		customRender(editProfileScreen)
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

		await waitFor(
			() => {
				expect(screen.queryByTestId('spin-indicator')).not.toBeOnTheScreen()
			},
			{ timeout: 7000 }
		)

		await waitFor(
			() => {
				expect(
					screen.getByRole('button', { name: /salvar alterações/i })
				).toBeEnabled()
			},
			{ timeout: 7000 }
		)

		await userEvent.press(
			screen.getByRole('button', { name: /salvar alterações/i })
		)
	})
})
