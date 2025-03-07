import React from 'react'
import { ActivityIndicator } from 'react-native'

import { Box } from '@/components'
import { Stacks, useStackRouter } from '@/hooks'

import { AppStackRouter } from './stack/AppStack'
import { AuthStackRouter } from './stack/AuthStack'
import { OnboardingStackRouter } from './stack/OnBoardingStack'

function LoadingScreen() {
	return (
		<Box
			flex={1}
			backgroundColor="background"
			justifyContent="center"
			alignItems="center"
		>
			<ActivityIndicator size="large" />
		</Box>
	)
}

const stacks: Record<Stacks, React.ReactElement> = {
	Loading: <LoadingScreen />,
	Auth: <AuthStackRouter />,
	App: <AppStackRouter />,
	Onboarding: <OnboardingStackRouter />,
}

export const StackRouter = () => {
	const stack = useStackRouter()

	const Stack = stacks[stack]
	return Stack
}
