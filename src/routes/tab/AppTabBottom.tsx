import React from 'react'

import {
	BottomTabBarProps,
	createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'

import { useAppTheme } from '@/hooks'
import {
	FavoriteScreen,
	HomeScreen,
	MyProfileScreen,
	NewPostScreen,
} from '@/screens'
import { RootAppTabBottomRouterParamList } from '@/types/routes'

import { AppTabBarCustom } from './AppTabBarCustom'

const Tab = createBottomTabNavigator<RootAppTabBottomRouterParamList>()

export const AppBottomTabRouter = () => {
	const { spacing } = useAppTheme()

	function renderTabBar(props: BottomTabBarProps) {
		return <AppTabBarCustom {...props} />
	}

	return (
		<Tab.Navigator
			tabBar={renderTabBar}
			initialRouteName="HomeScreen"
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					paddingTop: spacing.s20,
				},
			}}
		>
			<Tab.Screen name="HomeScreen" component={HomeScreen} />
			<Tab.Screen name="NewPostScreen" component={NewPostScreen} />
			<Tab.Screen name="FavoriteScreen" component={FavoriteScreen} />
			<Tab.Screen name="MyProfileScreen" component={MyProfileScreen} />
		</Tab.Navigator>
	)
}
