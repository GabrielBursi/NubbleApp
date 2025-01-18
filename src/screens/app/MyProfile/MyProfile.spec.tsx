import { screen, userEvent } from '@testing-library/react-native'

import { useAuthLogout } from '@/domain/Auth/useCases/useAuthLogout/useAuthLogout'
import { customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { MyProfileScreen } from './MyProfile'

type UseAuthLogout = typeof useAuthLogout
type ReturnUseAuthLogout = ReturnHookMocked<UseAuthLogout>
type MockUseAuthLogout = HookMocked<UseAuthLogout>

jest.mock('@/domain/Auth/useCases/useAuthLogout/useAuthLogout')

describe('<MyProfileScreen/>', () => {
	const mockLogout = jest.fn()

	const mockUseAuthLogout: ReturnUseAuthLogout = {
		logout: mockLogout,
	}

	beforeEach(() => {
		;(useAuthLogout as MockUseAuthLogout).mockReturnValue(mockUseAuthLogout)
	})

	it('should render logout button', () => {
		customRender(<MyProfileScreen />)

		expect(screen.getByRole('button', { name: /sair/i })).toBeOnTheScreen()
	})

	it('should does logout correctly', async () => {
		customRender(<MyProfileScreen />)

		await userEvent.press(screen.getByRole('button', { name: /sair/i }))

		expect(mockLogout).toHaveBeenCalled()
	})
})
