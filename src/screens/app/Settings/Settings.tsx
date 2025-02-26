import React, { useMemo } from 'react'

import { MenuItemList, Button } from '@/components'
import { MenuItemListProps } from '@/components/ui/MenuItemList/MenuItemList.types'
import { useAuthLogout } from '@/domain/Auth'
import { ScreenTemplate } from '@/templates'
import { SettingsScreenProps } from '@/types/screens'

export const SettingsScreen = ({
	navigation,
}: Readonly<SettingsScreenProps>) => {
	const { isLoading, logout } = useAuthLogout()

	const items: Required<MenuItemListProps>['items'] = useMemo(
		() => [
			{ label: 'Termos de uso' },
			{ label: 'Política de privacidade' },
			{ label: 'Tema', onPress: () => navigation.navigate('ThemeScreen') },
		],
		[navigation]
	)

	return (
		<ScreenTemplate canGoBack title="Configurações">
			<MenuItemList
				items={items}
				ListFooterComponent={
					<Button
						mt="s48"
						loading={isLoading}
						title="Sair da conta"
						onPress={() => logout()}
					/>
				}
			/>
		</ScreenTemplate>
	)
}
