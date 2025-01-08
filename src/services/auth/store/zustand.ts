/* eslint-disable @typescript-eslint/require-await */
import { create } from 'zustand'

import { StrictOmit } from '@/types/utils'

import { AuthCredentialsService } from '../models'

const useAuthCredentialsStore = create<AuthCredentialsService>((set) => ({
	authCredentials: null,
	isLoading: false,
	saveCredentials: async (ac) => set({ authCredentials: ac }),
	removeCredentials: async () => set({ authCredentials: null }),
}))

export const useAuthCredentialsZustand =
	(): AuthCredentialsService['authCredentials'] => {
		return useAuthCredentialsStore((state) => state.authCredentials)
	}

export const useAuthCredentialsServiceZustand = (): StrictOmit<
	AuthCredentialsService,
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
