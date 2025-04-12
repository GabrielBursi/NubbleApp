import React from 'react'

import { EditProfileHeader } from '@/components'
import { useUserGetById } from '@/domain/User'
import { ScreenTemplate } from '@/templates'
import { EditProfileScreenProps } from '@/types/screens'

export const EditProfileScreen = ({
	route: {
		params: { userId },
	},
}: EditProfileScreenProps) => {
	const { user } = useUserGetById(userId)

	return (
		<ScreenTemplate canGoBack scrollable title="Editar Perfil">
			<EditProfileHeader user={user} />
		</ScreenTemplate>
	)
}
