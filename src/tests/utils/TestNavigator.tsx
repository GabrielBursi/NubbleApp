import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TestNavigator = ({ component }: { component: any }) => {
	return (
		<Stack.Navigator
			initialRouteName="Test"
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="Test"
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-assignment
				component={component}
			/>
		</Stack.Navigator>
	)
}
