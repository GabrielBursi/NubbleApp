import { useAuthCredentials, useAuthCredentialsService } from '@/services/auth'
import { useOnBoarding } from '@/services/settings'

export type Stacks = 'Loading' | 'Auth' | 'App' | 'Onboarding'

export const useStackRouter = (): Stacks => {
	const showOnboarding = useOnBoarding()
	const ac = useAuthCredentials()
	const { isLoading } = useAuthCredentialsService()

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
