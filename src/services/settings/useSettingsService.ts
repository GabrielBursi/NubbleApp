import { useEffect } from 'react'
import { Appearance } from 'react-native'

import { SettingsService } from './SettingsService'
import {
	useAppThemeOptionZustand,
	useOnBoardingZustand,
	useSettingsServiceZustand,
	useThemePreferenceZustand,
} from './store'

export const useAppThemeOption = useAppThemeOptionZustand
export const useThemePreference = useThemePreferenceZustand
export const useSettingsService = useSettingsServiceZustand
export const useOnBoarding = useOnBoardingZustand
export const useHandleTheme = () => {
	const themeOption = useAppThemeOption()

	const { onThemeChange } = useSettingsService()

	useEffect(() => {
		onThemeChange(Appearance.getColorScheme())
	}, [onThemeChange])

	useEffect(() => {
		const subscription = Appearance.addChangeListener((preferences) => {
			onThemeChange(preferences.colorScheme)
		})

		return () => {
			subscription.remove()
		}
	}, [onThemeChange])

	useEffect(() => {
		SettingsService.handleStatusBar(themeOption)
	}, [themeOption])

	return themeOption
}
