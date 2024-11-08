import React from 'react'
import { Text } from 'react-native'

import { ScreenTemplate } from '@/templates'

export const HomeScreen = () => {
	return (
		<ScreenTemplate canGoBack>
			<Text accessibilityRole="text">Home</Text>
		</ScreenTemplate>
	)
}
