import React, { useMemo } from 'react'

import { Radio } from '@/components'
import { RadioItem } from '@/components/ui/Radio/Radio.types'
import { ScreenTemplate } from '@/templates'
import { ThemeType } from '@/types/theme'

type ThemeButton = {
	label: string
	value: ThemeType
	description?: string
}

export const ThemeScreen = () => {
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

	return (
		<ScreenTemplate canGoBack title="Tema">
			<Radio.Group
				items={options}
				labelKey="label"
				descriptionKey="description"
				initialSelectedIndex={options.length - 1}
			/>
		</ScreenTemplate>
	)
}
