import { screen, userEvent } from '@testing-library/react-native'

import { useAuthLogout } from '@/domain/Auth/useCases/useAuthLogout/useAuthLogout'
import { customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { SettingsScreen } from './Settings'

type UseAuthLogout = typeof useAuthLogout
type ReturnUseAuthLogout = ReturnHookMocked<UseAuthLogout>
type MockUseAuthLogout = HookMocked<UseAuthLogout>

jest.mock('@/domain/Auth/useCases/useAuthLogout/useAuthLogout')

describe('<SettingsScreen/>', () => {
	const mockLogout = jest.fn()

	const mockUseAuthLogout: ReturnUseAuthLogout = {
		logout: mockLogout,
	}

	beforeEach(() => {
		;(useAuthLogout as MockUseAuthLogout).mockReturnValue(mockUseAuthLogout)
	})

	it('should render settings screen', () => {
		customRender(<SettingsScreen />)

		expect(screen.getByRole('menu')).toBeOnTheScreen()
		expect(screen.getByRole('menuitem')).toBeOnTheScreen()
		expect(
			screen.getByRole('button', { name: /sair da conta/i })
		).toBeOnTheScreen()
	})

	it('should does logout correctly', async () => {
		customRender(<SettingsScreen />)

		await userEvent.press(
			screen.getByRole('button', { name: /sair da conta/i })
		)

		expect(mockLogout).toHaveBeenCalled()
	})
})
