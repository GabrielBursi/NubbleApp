import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
	LoginScreen,
	SuccessScreen,
	SignUpScreen,
	ForgotPasswordScreen,
	HomeScreen,
} from '@/screens'
import { RootStackParamList } from '@/types/routes'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const StackRouter = () => {
	return (
		<Stack.Navigator
			initialRouteName="LoginScreen"
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="LoginScreen" component={LoginScreen} />
			<Stack.Screen name="SuccessScreen" component={SuccessScreen} />
			<Stack.Screen name="SignUpScreen" component={SignUpScreen} />
			<Stack.Screen
				name="ForgotPasswordScreen"
				component={ForgotPasswordScreen}
			/>
			<Stack.Screen name="HomeScreen" component={HomeScreen} />
		</Stack.Navigator>
	)
}
