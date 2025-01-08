import React from 'react'

import { useAuthCredentials } from '@/services/auth'

import { AppStackRouter } from './stack/AppStack'
import { AuthStackRouter } from './stack/AuthStack'

export const StackRouter = () => {
	const auth = useAuthCredentials()

	return auth ? <AppStackRouter /> : <AuthStackRouter />
}
