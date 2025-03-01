import { screen, userEvent } from '@testing-library/react-native'

import { useThemePreference, useSettingsService } from '@/services/settings'
import { customRender } from '@/tests/utils'
import { HookMocked, ReturnHookMocked } from '@/types/tests'

import { ThemeScreen } from './Theme'

type UseThemePreference = typeof useThemePreference
type MockUseThemePreference = HookMocked<UseThemePreference>
type ReturnUseThemePreference = ReturnHookMocked<UseThemePreference>

type UseSettingsService = typeof useSettingsService
type MockUseSettingsService = HookMocked<UseSettingsService>
type ReturnUseSettingsService = ReturnHookMocked<UseSettingsService>

jest.mock('@/services/settings')

describe('<ThemeScreen/>', () => {
	const mockOnThemeChange = jest.fn()
	const mockSetThemePreference = jest.fn()

	const mockReturnUseThemePreference: ReturnUseThemePreference = 'system'
	const mockReturnUseSettingsService: ReturnUseSettingsService = {
		onThemeChange: mockOnThemeChange,
		setThemePreference: mockSetThemePreference,
	}

	beforeEach(() => {
		;(useThemePreference as MockUseThemePreference).mockReturnValue(
			mockReturnUseThemePreference
		)
		;(useSettingsService as MockUseSettingsService).mockReturnValue(
			mockReturnUseSettingsService
		)
	})

	it('should render the options of theme', () => {
		customRender(<ThemeScreen />)

		expect(screen.getByRole('radiogroup')).toBeOnTheScreen()
		expect(screen.getAllByRole('radio')).toHaveLength(3)
		expect(
			screen.getByRole('radio', { name: /Padrão do sistema/i })
		).toHaveAccessibilityState({ checked: true })
	})

	it('should render the system color preference as default', () => {
		customRender(<ThemeScreen />)

		expect(
			screen.getByRole('radio', { name: /Padrão do sistema/i })
		).toHaveAccessibilityState({ checked: true })
	})

	it('should change the theme type', async () => {
		customRender(<ThemeScreen />)

		await userEvent.press(screen.getByRole('radio', { name: /Escuro/i }))
		expect(mockSetThemePreference).toHaveBeenCalledWith('dark')
	})
})
