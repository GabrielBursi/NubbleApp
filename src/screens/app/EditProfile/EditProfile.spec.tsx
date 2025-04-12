import { screen } from '@testing-library/react-native'

import { useUserGetById } from '@/domain/User/useCases/useUserGetById/useUserGetById'
import { generateUser, mockUseNavigation } from '@/tests/mocks'
import { customRender } from '@/tests/utils'
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
			screen.getByRole('img', { name: mockUser.profileUrl })
		).toBeOnTheScreen()
		expect(
			screen.getByRole('text', { name: 'Editar Perfil' })
		).toBeOnTheScreen()
	})
})
