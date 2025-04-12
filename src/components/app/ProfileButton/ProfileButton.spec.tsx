import { screen, userEvent } from '@testing-library/react-native'

import { useAppNavigation } from '@/hooks/useAppNavigation/useAppNavigation'
import { customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { ProfileButton } from './ProfileButton'

type UseNavigationApp = typeof useAppNavigation
type ReturnUseNavigationApp = ReturnHookMocked<UseNavigationApp>
type MockUseNavigationApp = HookMocked<UseNavigationApp>

jest.mock('@/hooks/useAppNavigation/useAppNavigation')

describe('<ProfileButton/>', () => {
	const mockNavigateToEditProfile = jest.fn()

	const mockUseNavigationApp: ReturnUseNavigationApp = {
		navigate: {
			toEditProfile: mockNavigateToEditProfile,
		},
	}

	beforeEach(() => {
		;(useAppNavigation as MockUseNavigationApp).mockReturnValue(
			mockUseNavigationApp
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

	it('should navigate to edit profile when is my profile', async () => {
		customRender(<ProfileButton userId={1} isMyProfile />)

		await userEvent.press(screen.getByRole('button'))
		expect(mockNavigateToEditProfile).toHaveBeenCalled()
	})
})
