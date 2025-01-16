/* eslint-disable @typescript-eslint/require-await */
import { useCallback, useEffect } from 'react'

import { create } from 'zustand'

import { useAuthToken } from '@/domain/Auth/useCases/useAuthToken/useAuthToken'
import { StorageKeys, useStorage } from '@/services/storage'
import { StrictOmit } from '@/types/utils'

import { AuthCredentialsService } from '../models'

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
	const {
		get: fetchAuthStorage,
		remove: removeAuthStorage,
		set: saveAuthStorage,
	} = useStorage<AuthCredentials>(StorageKeys.AUTH)

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
			await Promise.all([saveCredentialsStore(ac), saveAuthStorage(ac)])
			setIsLoading(false)
		},
		[saveAuthStorage, saveCredentialsStore, setIsLoading, updateToken]
	)

	const removeCredentials = useCallback(async () => {
		removeToken()
		setIsLoading(true)
		await Promise.all([removeCredentialsStore(), removeAuthStorage()])
		setIsLoading(false)
	}, [removeAuthStorage, removeCredentialsStore, removeToken, setIsLoading])

	useEffect(() => {
		fetchAuthStorage()
			.then(async (auth) => {
				if (auth) await saveCredentials(auth)
			})
			.catch((error) => console.log(error))
			.finally(() => setIsLoading(false))
	}, [fetchAuthStorage, saveCredentials, setIsLoading])

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
