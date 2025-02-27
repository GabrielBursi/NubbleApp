import { Appearance, ColorSchemeName, Platform, StatusBar } from 'react-native'

import { lightTheme } from '@/styles'

import { AppThemeOption, ThemePreference } from './models'

export abstract class SettingsService {
	static onChangePreference(themePreference: ThemePreference): AppThemeOption {
		if (themePreference === 'system') {
			const colorScheme = Appearance.getColorScheme()
			return colorScheme ? colorScheme : 'light'
		}

		return themePreference
	}

	static onThemeChange(
		color: ColorSchemeName,
		themePreference: ThemePreference
	): AppThemeOption | null {
		if (themePreference === 'system') {
			return color ? color : 'light'
		}
		return null
	}

	static handleStatusBar(appColor: AppThemeOption) {
		StatusBar.setBarStyle(
			appColor === 'dark' ? 'light-content' : 'dark-content',
			true
		)

		if (Platform.OS === 'android') {
			StatusBar.setBackgroundColor(
				appColor === 'dark'
					? lightTheme.colors.grayBlack
					: lightTheme.colors.grayWhite
			)
		}
	}
}
