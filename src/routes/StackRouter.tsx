import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { RootStackParamList } from '@/types/routes'
import HomeScreen from '@/screens/Home/Home'

const Stack = createStackNavigator<RootStackParamList>()

export const StackRouter = () => {
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen name="Home" component={HomeScreen} />
		</Stack.Navigator>
	)
}
