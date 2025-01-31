import { useMemo } from 'react'

import { StorageKeys, useStorage } from '@/services/storage'

import { AuthCredentialsService } from '../models'

type AuthCredentials = AuthCredentialsService['authCredentials']

export const useAuthCredentialsStorage = () => {
	const {
		getItem: getAuth,
		removeItem: removeAuth,
		setItem: setAuth,
	} = useStorage<AuthCredentials>(StorageKeys.AUTH)

	return useMemo(
		() => ({
			getAuth,
			removeAuth,
			setAuth,
		}),
		[getAuth, removeAuth, setAuth]
	)
}
