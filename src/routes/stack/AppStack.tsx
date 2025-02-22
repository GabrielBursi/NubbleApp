import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
	PostCommentsScreen,
	SettingsScreen,
	SearchScreen,
	ProfileScreen,
	PublishPostScreen,
	CameraScreen,
} from '@/screens'
import { RootAppStackRouterParamList } from '@/types/routes'

import { AppBottomTabRouter } from '../tab/AppTabBottom'

const Stack = createNativeStackNavigator<RootAppStackRouterParamList>()

type AppStackRouterProps = {
	initialRouteName?: keyof RootAppStackRouterParamList
}

export const AppStackRouter = ({
	initialRouteName = 'AppTabNavigator',
}: AppStackRouterProps) => {
	return (
		<Stack.Navigator
			initialRouteName={initialRouteName}
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="AppTabNavigator" component={AppBottomTabRouter} />
			<Stack.Screen name="SettingsScreen" component={SettingsScreen} />
			<Stack.Screen name="PostCommentScreen" component={PostCommentsScreen} />
			<Stack.Screen name="SearchScreen" component={SearchScreen} />
			<Stack.Screen name="ProfileScreen" component={ProfileScreen} />
			<Stack.Screen name="PublishPostScreen" component={PublishPostScreen} />
			<Stack.Screen name="CameraScreen" component={CameraScreen} />
		</Stack.Navigator>
	)
}
