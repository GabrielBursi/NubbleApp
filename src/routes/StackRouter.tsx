import React from 'react'
import { ActivityIndicator } from 'react-native'

import { Box } from '@/components'
import { useAuthCredentials, useAuthCredentialsService } from '@/services/auth'

import { AppStackRouter } from './stack/AppStack'
import { AuthStackRouter } from './stack/AuthStack'

export const StackRouter = () => {
	const auth = useAuthCredentials()
	const { isLoading } = useAuthCredentialsService()

	if (isLoading)
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

	return auth ? <AppStackRouter /> : <AuthStackRouter />
}
