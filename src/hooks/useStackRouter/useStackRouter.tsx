import { useEffect } from 'react'

import { useAuthCredentials, useAuthCredentialsService } from '@/services/auth'
import { SettingsService, useOnBoarding } from '@/services/settings'

export type Stacks = 'Loading' | 'Auth' | 'App' | 'Onboarding'

export const useStackRouter = (): Stacks => {
	const showOnboarding = useOnBoarding()
	const ac = useAuthCredentials()
	const { isLoading } = useAuthCredentialsService()

	useEffect(() => {
		if (!isLoading) {
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			SettingsService.hideSplashScreen()
		}
	}, [isLoading])

	if (isLoading) {
		return 'Loading'
	}

	if (showOnboarding) {
		return 'Onboarding'
	}

	if (ac) {
		return 'App'
	}

	return 'Auth'
}
