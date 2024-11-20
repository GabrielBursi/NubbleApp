import React from 'react'

import { AppStackRouter } from './stack/AppStack'
import { AuthStackRouter } from './stack/AuthStack'

export const StackRouter = () => {
	const auth = true

	return auth ? <AppStackRouter /> : <AuthStackRouter />
}
