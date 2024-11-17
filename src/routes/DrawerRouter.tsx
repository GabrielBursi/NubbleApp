import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer'

import { HomeScreen } from '@/screens'
import { RootDrawerParamList } from '@/types/routes'

const Drawer = createDrawerNavigator<RootDrawerParamList>()

export const DrawerRouter = () => {
	return (
		<Drawer.Navigator>
			<Drawer.Screen name="Home" component={HomeScreen} />
		</Drawer.Navigator>
	)
}
