import React from 'react'

import { FeedList } from '@/components'
import { ScreenTemplate } from '@/templates'

export const HomeScreen = () => {
	return (
		<ScreenTemplate
			// eslint-disable-next-line react-native/no-inline-styles
			style={{
				paddingTop: 0,
				paddingBottom: 0,
				paddingHorizontal: 0,
			}}
		>
			<FeedList />
		</ScreenTemplate>
	)
}
