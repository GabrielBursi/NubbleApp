import { screen, userEvent } from '@testing-library/react-native'

import { useFollowUser } from '@/domain/Follow/useCases/useFollowUser/useFollowUser'
import { useAppNavigation } from '@/hooks/useAppNavigation/useAppNavigation'
import { customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { ProfileButton } from './ProfileButton'

type UseNavigationApp = typeof useAppNavigation
type ReturnUseNavigationApp = ReturnHookMocked<UseNavigationApp>
type MockUseNavigationApp = HookMocked<UseNavigationApp>
type UseFollowUser = typeof useFollowUser
type ReturnUseFollowUser = ReturnHookMocked<UseFollowUser>
type MockUseFollowUser = HookMocked<UseFollowUser>

jest.mock('@/hooks/useAppNavigation/useAppNavigation')
jest.mock('@/domain/Follow/useCases/useFollowUser/useFollowUser')

describe('<ProfileButton/>', () => {
	const mockNavigateToEditProfile = jest.fn()
	const mockFollowUser = jest.fn()

	const mockUseNavigationApp: ReturnUseNavigationApp = {
		navigate: {
			toEditProfile: mockNavigateToEditProfile,
		},
	}

	const mockReturnUseFollowUser: ReturnUseFollowUser = {
		followUser: mockFollowUser,
		isLoading: false,
		error: null,
		followContext: null,
		followingUser: null,
		isSuccess: false,
	}

	beforeEach(() => {
		;(useAppNavigation as MockUseNavigationApp).mockReturnValue(
			mockUseNavigationApp
		)
		;(useFollowUser as MockUseFollowUser).mockReturnValue(
			mockReturnUseFollowUser
		)
	})

	it('should render follow button', () => {
		customRender(<ProfileButton userId={1} />)

		expect(screen.getByRole('button', { name: /Seguir/i })).toBeOnTheScreen()
	})

	it('should render following button', () => {
		customRender(<ProfileButton userId={1} isFollowing />)

		expect(screen.getByRole('button', { name: /Mensagem/i })).toBeOnTheScreen()
	})

	it('should render my profile button', () => {
		customRender(<ProfileButton userId={1} isMyProfile />)

		expect(
			screen.getByRole('button', { name: /Editar perfil/i })
		).toBeOnTheScreen()
	})

	it('should disable the button when is loading following user', async () => {
		;(useFollowUser as MockUseFollowUser).mockReturnValue({
			...mockReturnUseFollowUser,
			isLoading: true,
		})

		customRender(<ProfileButton userId={1} />)

		await userEvent.press(screen.getByRole('button'))
		expect(mockNavigateToEditProfile).not.toHaveBeenCalled()
		expect(mockFollowUser).not.toHaveBeenCalled()
	})

	it('should navigate to edit profile when is my profile', async () => {
		customRender(<ProfileButton userId={1} isMyProfile />)

		await userEvent.press(screen.getByRole('button'))
		expect(mockNavigateToEditProfile).toHaveBeenCalled()
	})

	it('should follow user when is not following', async () => {
		customRender(<ProfileButton userId={1} isFollowing={false} />)

		await userEvent.press(screen.getByRole('button'))
		expect(mockFollowUser).toHaveBeenCalledWith(1)
	})

	it('should not when is already following', async () => {
		customRender(<ProfileButton userId={1} isFollowing />)

		await userEvent.press(screen.getByRole('button'))
		expect(mockFollowUser).not.toHaveBeenCalled()
	})
})
