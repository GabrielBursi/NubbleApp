import React from 'react'

import { Button } from '@/components'
import { useAuthLogout } from '@/domain/Auth'
import { ScreenTemplate } from '@/templates'

export const MyProfileScreen = () => {
	const { logout } = useAuthLogout()

	return (
		<ScreenTemplate>
			<Button title="Sair" onPress={() => logout()} />
		</ScreenTemplate>
	)
}
