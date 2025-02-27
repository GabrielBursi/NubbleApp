import React, { useCallback, useMemo } from 'react'

import { Radio } from '@/components'
import { OptionSelected, RadioItem } from '@/components/ui/Radio/Radio.types'
import { useSettingsService, useThemePreference } from '@/services/settings'
import { ScreenTemplate } from '@/templates'
import { ThemeType } from '@/types/theme'

type ThemeButton = {
	label: string
	value: ThemeType
	description?: string
}

// TODO: TESTAR SCREEN E ARRUMAR COLOR DE INPUT

export const ThemeScreen = () => {
	const themePreference = useThemePreference()
	const { setThemePreference } = useSettingsService()

	const handleChangeTheme = useCallback(
		(opt: OptionSelected<ThemeButton>) => {
			setThemePreference(opt.option.value)
		},
		[setThemePreference]
	)

	const options = useMemo(
		(): RadioItem<ThemeButton>[] => [
			{ label: 'Claro', value: 'light' },
			{ label: 'Escuro', value: 'dark' },
			{
				label: 'Padrão do sistema',
				value: 'system',
				description:
					'A aparência será a mesma que você configurou no seu dispositivo',
			},
		],
		[]
	)

	const selectedItemIndex = useMemo(
		() => options.findIndex((item) => item.value === themePreference),
		[options, themePreference]
	)

	return (
		<ScreenTemplate canGoBack title="Tema">
			<Radio.Group
				items={options}
				labelKey="label"
				descriptionKey="description"
				initialSelectedIndex={selectedItemIndex}
				onOptionSelect={handleChangeTheme}
			/>
		</ScreenTemplate>
	)
}
