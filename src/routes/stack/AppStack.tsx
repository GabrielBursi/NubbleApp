import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SettingsScreen } from '@/screens'
import { RootAppStackRouterParamList } from '@/types/routes'

import { AppBottomTabRouter } from '../tab/AppTabBottom'

const Stack = createNativeStackNavigator<RootAppStackRouterParamList>()

export const AppStackRouter = () => {
	return (
		<Stack.Navigator
			initialRouteName="AppTabNavigator"
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="AppTabNavigator" component={AppBottomTabRouter} />
			<Stack.Screen name="SettingsScreen" component={SettingsScreen} />
		</Stack.Navigator>
	)
}