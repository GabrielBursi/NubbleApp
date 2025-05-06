import React from 'react'

import { FollowList } from '@/components'
import { ScreenTemplate } from '@/templates'

export const MyFollowersScreen = () => {
	return (
		<ScreenTemplate title="Seguidores" canGoBack>
			<FollowList type="followers" />
		</ScreenTemplate>
	)
}
