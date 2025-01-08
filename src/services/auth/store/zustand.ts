import { create } from 'zustand'

import { StrictOmit } from '@/types/utils'

import { AuthCredentialsServiceWithoutPromise } from '../models'

const useAuthCredentialsStore = create<AuthCredentialsServiceWithoutPromise>(
	(set) => ({
		authCredentials: null,
		isLoading: false,
		saveCredentials: (ac) => set({ authCredentials: ac }),
		removeCredentials: () => set({ authCredentials: null }),
	})
)

export const useAuthCredentialsZustand =
	(): AuthCredentialsServiceWithoutPromise['authCredentials'] => {
		return useAuthCredentialsStore((state) => state.authCredentials)
	}

export const useAuthCredentialsServiceZustand = (): StrictOmit<
	AuthCredentialsServiceWithoutPromise,
	'authCredentials'
> => {
	const isLoading = useAuthCredentialsStore((state) => state.isLoading)
	const removeCredentials = useAuthCredentialsStore(
		(state) => state.removeCredentials
	)
	const saveCredentials = useAuthCredentialsStore(
		(state) => state.saveCredentials
	)

	return {
		saveCredentials,
		removeCredentials,
		isLoading,
	}
}
