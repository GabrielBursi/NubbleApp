import React from 'react'

import { Profile } from '@/components'
import { ScreenTemplate } from '@/templates'
import { ProfileScreenProps } from '@/types/screens'

export const ProfileScreen = ({ route: { params } }: ProfileScreenProps) => {
	console.log({ params })

	return (
		<ScreenTemplate
			canGoBack
			// eslint-disable-next-line react-native/no-inline-styles
			style={{
				paddingHorizontal: 0,
			}}
		>
			<Profile userId={params.userId} />
		</ScreenTemplate>
	)
}
