import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { storage } from '@/services/storage'

import { AppThemeOption, SettingsStore, ThemePreference } from '../models'
import { SettingsService } from '../SettingsService'

const useSettingsStore = create<SettingsStore>()(
	persist(
		(set, get) => ({
			appThemeOption: 'light',
			themePreference: 'system',
			showOnboarding: true,
			onThemeChange: (color) => {
				const updatedAppTheme = SettingsService.onThemeChange(
					color,
					get().themePreference
				)
				if (updatedAppTheme) {
					set({ appThemeOption: updatedAppTheme })
				}
			},
			setThemePreference: (newThemePreference) => {
				const updatedAppTheme =
					SettingsService.onChangePreference(newThemePreference)
				set({
					appThemeOption: updatedAppTheme,
					themePreference: newThemePreference,
				})
			},
			finishOnboarding: () => {
				set({ showOnboarding: false })
			},
		}),
		{
			name: '@Settings',
			storage: storage,
		}
	)
)

export const useAppThemeOptionZustand = (): AppThemeOption => {
	const appThemeOption = useSettingsStore((state) => state.appThemeOption)
	return appThemeOption
}

export const useThemePreferenceZustand = (): ThemePreference => {
	const themePreference = useSettingsStore((state) => state.themePreference)
	return themePreference
}

export const useOnBoardingZustand = () => {
	const showOnboarding = useSettingsStore((state) => state.showOnboarding)
	return showOnboarding
}

export const useSettingsServiceZustand = (): Pick<
	SettingsStore,
	'setThemePreference' | 'onThemeChange' | 'finishOnboarding'
> => {
	const setThemePreference = useSettingsStore(
		(state) => state.setThemePreference
	)
	const onThemeChange = useSettingsStore((state) => state.onThemeChange)
	const finishOnboarding = useSettingsStore((state) => state.finishOnboarding)

	return {
		setThemePreference,
		onThemeChange,
		finishOnboarding,
	} as const
}
