import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {
	LoginScreen,
	SuccessScreen,
	SignUpScreen,
	ForgotPasswordScreen,
} from '@/screens'
import { RootAuthStackRouterParamList } from '@/types/routes'

const AuthStack = createNativeStackNavigator<RootAuthStackRouterParamList>()

export const AuthStackRouter = () => {
	return (
		<AuthStack.Navigator
			initialRouteName="LoginScreen"
			screenOptions={{
				headerShown: false,
			}}
		>
			<AuthStack.Screen name="LoginScreen" component={LoginScreen} />
			<AuthStack.Screen name="SuccessScreen" component={SuccessScreen} />
			<AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
			<AuthStack.Screen
				name="ForgotPasswordScreen"
				component={ForgotPasswordScreen}
			/>
		</AuthStack.Navigator>
	)
}
