import React from 'react'
import { Text } from 'react-native'
import * as S from './Home.styles'

const HomeScreen = () => {
	return (
		<S.Home>
			<Text accessibilityRole="text">Home</Text>
			<Text accessibilityRole="text">Husky</Text>
		</S.Home>
	)
}

export default HomeScreen
