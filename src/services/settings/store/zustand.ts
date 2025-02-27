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

export const useSettingsServiceZustand = (): Pick<
	SettingsStore,
	'setThemePreference' | 'onThemeChange'
> => {
	const setThemePreference = useSettingsStore(
		(state) => state.setThemePreference
	)
	const onThemeChange = useSettingsStore((state) => state.onThemeChange)

	return {
		setThemePreference,
		onThemeChange,
	} as const
}
