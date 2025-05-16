/* eslint-disable @typescript-eslint/require-await */
import { useCallback, useEffect } from 'react'

import { create } from 'zustand'

import { useAuthToken } from '@/domain/Auth/useCases/useAuthToken/useAuthToken'
import { UserApi } from '@/domain/User/api'
import { UserModel } from '@/domain/User/models/User'
import { StrictOmit } from '@/types/utils'

import { AuthCredentialsService } from '../models'

import { useAuthCredentialsStorage } from './useAuthCredentialsStorage'

type AuthCredentials = AuthCredentialsService['authCredentials']

const useAuthCredentialsStore = create<AuthCredentialsService>()(
	(set, get) => ({
		authCredentials: null,
		isLoading: true,
		saveCredentials: async (ac) => set({ authCredentials: ac }),
		removeCredentials: async () => set({ authCredentials: null }),
		setIsLoading: (isLoading) => set({ isLoading }),
		updateUser: async (user) => {
			const currentAc = get().authCredentials
			return currentAc
				? set({ authCredentials: { ...currentAc, user } })
				: set({ authCredentials: null })
		},
	})
)

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

	const updateUser = useCallback(
		async (user: UserModel) => {
			if (authCredentials) await saveCredentials({ ...authCredentials, user })
		},
		[authCredentials, saveCredentials]
	)

	const removeCredentials = useCallback(async () => {
		await UserApi.DeleteNotificationToken()
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
		updateUser,
	}
}
