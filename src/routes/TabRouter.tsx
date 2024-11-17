import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { HomeScreen } from '@/screens'
import { RootTabParamList } from '@/types/routes'

const Tab = createBottomTabNavigator<RootTabParamList>()

export const TabRouter = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Home" component={HomeScreen} />
		</Tab.Navigator>
	)
}
