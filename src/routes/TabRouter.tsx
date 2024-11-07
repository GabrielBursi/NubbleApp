import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { RootTabParamList } from '@/types/routes'
import { HomeScreen } from '@/screens'

const Tab = createBottomTabNavigator<RootTabParamList>()

export const TabRouter = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Home" component={HomeScreen} />
		</Tab.Navigator>
	)
}
