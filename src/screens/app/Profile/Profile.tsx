import React from 'react'

import { Profile } from '@/components'
import { ScreenTemplate } from '@/templates'
import { ProfileScreenProps } from '@/types/screens'

export const ProfileScreen = ({ route: { params } }: ProfileScreenProps) => {
	return (
		<ScreenTemplate canGoBack>
			<Profile userId={params.userId} />
		</ScreenTemplate>
	)
}
