import React from 'react'
import { Text } from 'react-native'

import { ScreenTemplate } from '@/templates'

export const LoginScreen = () => {
	return (
		<ScreenTemplate scrollable>
			<Text accessibilityRole="text">Login</Text>
		</ScreenTemplate>
	)
}
