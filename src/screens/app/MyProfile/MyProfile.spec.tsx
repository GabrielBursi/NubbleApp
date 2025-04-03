import { screen, waitFor } from '@testing-library/react-native'

import { useAuthCredentials } from '@/services/auth/useAuthCredentials'
import { generateUser } from '@/tests/mocks'
import { customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { MyProfileScreen } from './MyProfile'

type UseAuthCredentials = typeof useAuthCredentials
type ReturnUseAuthCredentials = ReturnHookMocked<UseAuthCredentials>
type MockUseAuthCredentials = HookMocked<UseAuthCredentials>

jest.mock('@/services/auth/useAuthCredentials')

describe('<MyProfileScreen/>', () => {
	const mockUser = generateUser()

	const mockUseAuthCredentialsService: ReturnUseAuthCredentials = {
		user: mockUser,
	}

	beforeEach(() => {
		;(useAuthCredentials as MockUseAuthCredentials).mockReturnValue(
			mockUseAuthCredentialsService
		)
	})

	it('should render my profile screen correctly', async () => {
		customRender(<MyProfileScreen />)

		await waitFor(() => {
			expect(screen.getByRole('list', { name: 'user posts' })).toBeOnTheScreen()
		})
	})

	it('should not render my profile screen without credentials', () => {
		;(useAuthCredentials as MockUseAuthCredentials).mockReturnValue(null)
		const { root } = customRender(<MyProfileScreen />)
		expect(root).toBeUndefined()
		expect(screen.queryByRole('list')).not.toBeOnTheScreen()
	})
})
