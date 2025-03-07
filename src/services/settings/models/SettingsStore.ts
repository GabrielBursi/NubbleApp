import { ColorSchemeName } from 'react-native'

import { AppThemeOption } from './AppThemeOption'
import { ThemePreference } from './ThemePreference'

export interface SettingsStore {
	appThemeOption: AppThemeOption
	themePreference: ThemePreference
	showOnboarding: boolean
	setThemePreference: (themePreference: ThemePreference) => void
	onThemeChange: (color: ColorSchemeName) => void
	finishOnboarding: () => void
}
