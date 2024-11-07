import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { RootDrawerParamList } from '@/types/routes'
import { HomeScreen } from '@/screens'

const Drawer = createDrawerNavigator<RootDrawerParamList>()

export const DrawerRouter = () => {
	return (
		<Drawer.Navigator>
			<Drawer.Screen name="Home" component={HomeScreen} />
		</Drawer.Navigator>
	)
}
