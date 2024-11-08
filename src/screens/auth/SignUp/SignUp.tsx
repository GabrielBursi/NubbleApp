import React from 'react'
import { Text } from 'react-native'

import { ScreenTemplate } from '@/templates'

export const SignUpScreen = () => {
	return (
		<ScreenTemplate canGoBack scrollable>
			<Text accessibilityRole="text">SignUp</Text>
		</ScreenTemplate>
	)
}
