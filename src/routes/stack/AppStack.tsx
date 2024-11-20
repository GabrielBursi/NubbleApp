import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen, SettingsScreen } from '@/screens'
import { RootAppStackRouterParamList } from '@/types/routes'

const Stack = createNativeStackNavigator<RootAppStackRouterParamList>()

export const AppStackRouter = () => {
	return (
		<Stack.Navigator
			initialRouteName="HomeScreen"
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="HomeScreen" component={HomeScreen} />
			<Stack.Screen name="SettingsScreen" component={SettingsScreen} />
		</Stack.Navigator>
	)
}
