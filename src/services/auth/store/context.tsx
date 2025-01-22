/* eslint-disable @typescript-eslint/require-await */
import {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'

//? import assim para teste não se perder
import { useAuthToken } from '@/domain/Auth/useCases/useAuthToken/useAuthToken'
import { StorageKeys } from '@/services/storage/models/Keys'
import { useStorage } from '@/services/storage/useStorage'
import { StrictOmit } from '@/types/utils'

import { AuthCredentialsService } from '../models'

const AuthCredentialsContext = createContext<AuthCredentialsService | null>(
	null
)

type AuthCredentials = AuthCredentialsService['authCredentials']

//TODO: PADRONIZAR  HOOK
export const AuthCredentialsProvider = ({
	children,
}: Readonly<PropsWithChildren>) => {
	const { updateToken, removeToken, registerInterceptor } = useAuthToken()
	const {
		get: fetchAuthStorage,
		remove: removeAuthStorage,
		set: saveAuthStorage,
	} = useStorage<AuthCredentials>(StorageKeys.AUTH)

	const [authCredentials, setAuthCredentials] = useState<AuthCredentials>(null)
	const [isLoading, setIsLoading] = useState(true)

	const removeCredentials = useCallback(async () => {
		setAuthCredentials(null)
		removeToken()
		setIsLoading(true)
		await removeAuthStorage()
		setIsLoading(false)
	}, [removeAuthStorage, removeToken])

	const saveCredentials = useCallback(
		async (ac: NonNullable<AuthCredentials>) => {
			setAuthCredentials(ac)
			updateToken(ac.token)
			setIsLoading(true)
			await saveAuthStorage(ac)
			setIsLoading(false)
		},
		[saveAuthStorage, updateToken]
	)

	useEffect(() => {
		fetchAuthStorage()
			.then(async (auth) => {
				if (auth) await saveCredentials(auth)
			})
			.catch((error) => console.log(error))
			.finally(() => setIsLoading(false))
	}, [fetchAuthStorage, saveCredentials])

	useEffect(() => {
		const removeInterceptor = registerInterceptor({
			authCredentials,
			removeCredentials,
			saveCredentials,
		})

		return removeInterceptor
	}, [authCredentials, registerInterceptor, removeCredentials, saveCredentials])

	const context: AuthCredentialsService = useMemo(
		() => ({
			authCredentials,
			isLoading,
			removeCredentials,
			saveCredentials,
			setIsLoading,
		}),
		[authCredentials, removeCredentials, saveCredentials, isLoading]
	)

	return (
		<AuthCredentialsContext.Provider value={context}>
			{children}
		</AuthCredentialsContext.Provider>
	)
}

export const useAuthCredentialsContext = (): AuthCredentials => {
	const context = useContext(AuthCredentialsContext)
	if (!context)
		throw new Error(
			'useAuthCredentialsContext  must be used inside a provider!'
		)
	const authCredentials: AuthCredentials = useMemo(
		() => context.authCredentials,
		[context.authCredentials]
	)

	return authCredentials
}

export const useAuthCredentialsServiceContext = (): StrictOmit<
	AuthCredentialsService,
	'authCredentials'
> => {
	const context = useContext(AuthCredentialsContext)
	if (!context)
		throw new Error(
			'useAuthCredentialsServiceContext  must be used inside a provider!'
		)
	const { removeCredentials, saveCredentials, isLoading, setIsLoading } =
		context

	const authCredServices: StrictOmit<
		AuthCredentialsService,
		'authCredentials'
	> = useMemo(
		() => ({
			removeCredentials,
			saveCredentials,
			isLoading,
			setIsLoading,
		}),
		[isLoading, removeCredentials, saveCredentials, setIsLoading]
	)

	return authCredServices
}
