import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import {
	FavoriteScreen,
	HomeScreen,
	MyProfileScreen,
	NewPostScreen,
} from '@/screens'
import { RootAppTabBottomRouterParamList } from '@/types/routes'

const Tab = createBottomTabNavigator<RootAppTabBottomRouterParamList>()

export const AppBottomTabRouter = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen name="HomeScreen" component={HomeScreen} />
			<Tab.Screen name="NewPostScreen" component={NewPostScreen} />
			<Tab.Screen name="FavoriteScreen" component={FavoriteScreen} />
			<Tab.Screen name="MyProfileScreen" component={MyProfileScreen} />
		</Tab.Navigator>
	)
}
