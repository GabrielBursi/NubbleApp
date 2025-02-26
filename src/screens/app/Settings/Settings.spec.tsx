import { screen, userEvent } from '@testing-library/react-native'

import { useAuthLogout } from '@/domain/Auth/useCases/useAuthLogout/useAuthLogout'
import { mockUseNavigation } from '@/tests/mocks'
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
		customRender(
			<SettingsScreen
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
				navigation={mockUseNavigation as any}
				route={{ key: 'SettingsScreen', name: 'SettingsScreen' }}
			/>
		)

		expect(screen.getByRole('menu')).toBeOnTheScreen()
		expect(screen.getAllByRole('menuitem')).toHaveLength(3)
		expect(
			screen.getByRole('button', { name: /sair da conta/i })
		).toBeOnTheScreen()
	})

	it('should does logout correctly', async () => {
		customRender(
			<SettingsScreen
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
				navigation={mockUseNavigation as any}
				route={{ key: 'SettingsScreen', name: 'SettingsScreen' }}
			/>
		)

		await userEvent.press(
			screen.getByRole('button', { name: /sair da conta/i })
		)

		expect(mockLogout).toHaveBeenCalled()
	})

	it('should navigate to theme screen correctly', async () => {
		customRender(
			<SettingsScreen
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
				navigation={mockUseNavigation as any}
				route={{ key: 'SettingsScreen', name: 'SettingsScreen' }}
			/>
		)

		await userEvent.press(screen.getByRole('menuitem', { name: /tema/i }))
		expect(mockUseNavigation.navigate).toHaveBeenCalled()
	})
})
