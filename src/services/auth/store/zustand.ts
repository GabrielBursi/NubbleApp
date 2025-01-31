/* eslint-disable @typescript-eslint/require-await */
import { useCallback, useEffect } from 'react'

import { create } from 'zustand'

import { useAuthToken } from '@/domain/Auth/useCases/useAuthToken/useAuthToken'
import { StrictOmit } from '@/types/utils'

import { AuthCredentialsService } from '../models'

import { useAuthCredentialsStorage } from './useAuthCredentialsStorage'

type AuthCredentials = AuthCredentialsService['authCredentials']

const useAuthCredentialsStore = create<AuthCredentialsService>()((set) => ({
	authCredentials: null,
	isLoading: true,
	saveCredentials: async (ac) => set({ authCredentials: ac }),
	removeCredentials: async () => set({ authCredentials: null }),
	setIsLoading: (isLoading) => set({ isLoading }),
}))

export const useAuthCredentialsZustand = (): AuthCredentials => {
	return useAuthCredentialsStore((state) => state.authCredentials)
}

//TODO: PADRONIZAR  HOOK
export const useAuthCredentialsServiceZustand = (): StrictOmit<
	AuthCredentialsService,
	'authCredentials'
> => {
	const { removeToken, updateToken, registerInterceptor } = useAuthToken()
	const { getAuth, removeAuth, setAuth } = useAuthCredentialsStorage()

	const authCredentials = useAuthCredentialsZustand()

	const isLoading = useAuthCredentialsStore((state) => state.isLoading)
	const setIsLoading = useAuthCredentialsStore((state) => state.setIsLoading)
	const removeCredentialsStore = useAuthCredentialsStore(
		(state) => state.removeCredentials
	)
	const saveCredentialsStore = useAuthCredentialsStore(
		(state) => state.saveCredentials
	)

	const saveCredentials = useCallback(
		async (ac: NonNullable<AuthCredentials>) => {
			updateToken(ac.token)
			setIsLoading(true)
			await Promise.all([saveCredentialsStore(ac), setAuth(ac)])
			setIsLoading(false)
		},
		[setAuth, saveCredentialsStore, setIsLoading, updateToken]
	)

	const removeCredentials = useCallback(async () => {
		removeToken()
		setIsLoading(true)
		await Promise.all([removeCredentialsStore(), removeAuth()])
		setIsLoading(false)
	}, [removeAuth, removeCredentialsStore, removeToken, setIsLoading])

	useEffect(() => {
		getAuth()
			.then(async (auth) => {
				if (auth) await saveCredentials(auth)
			})
			.catch((error) => console.log(error))
			.finally(() => setIsLoading(false))
	}, [getAuth, saveCredentials, setIsLoading])

	useEffect(() => {
		const removeInterceptor = registerInterceptor({
			authCredentials,
			removeCredentials,
			saveCredentials,
		})

		return removeInterceptor
	}, [authCredentials, registerInterceptor, removeCredentials, saveCredentials])

	return {
		saveCredentials,
		removeCredentials,
		isLoading,
		setIsLoading,
	}
}
