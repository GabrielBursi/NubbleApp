import React from 'react'

import { Profile } from '@/components'
import { useAuthCredentials } from '@/services/auth'
import { ScreenTemplate } from '@/templates'

export const MyProfileScreen = () => {
	const auth = useAuthCredentials()
	if (!auth?.user.id) return null

	return (
		<ScreenTemplate>
			<Profile userId={auth.user.id} isMyProfile />
		</ScreenTemplate>
	)
}
