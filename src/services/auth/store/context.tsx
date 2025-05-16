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
import { UserApi } from '@/domain/User/api'
import { UserModel } from '@/domain/User/models/User'
import { StrictOmit } from '@/types/utils'

import { AuthCredentialsService } from '../models'

import { useAuthCredentialsStorage } from './useAuthCredentialsStorage'

const AuthCredentialsContext = createContext<AuthCredentialsService | null>(
	null
)

type AuthCredentials = AuthCredentialsService['authCredentials']

//TODO: PADRONIZAR  HOOK
export const AuthCredentialsProvider = ({
	children,
}: Readonly<PropsWithChildren>) => {
	const { updateToken, removeToken, registerInterceptor } = useAuthToken()
	const { getAuth, removeAuth, setAuth } = useAuthCredentialsStorage()

	const [authCredentials, setAuthCredentials] = useState<AuthCredentials>(null)
	const [isLoading, setIsLoading] = useState(true)

	const removeCredentials = useCallback(async () => {
		await UserApi.DeleteNotificationToken()
		setAuthCredentials(null)
		removeToken()
		setIsLoading(true)
		await removeAuth()
		setIsLoading(false)
	}, [removeAuth, removeToken])

	const saveCredentials = useCallback(
		async (ac: NonNullable<AuthCredentials>) => {
			setAuthCredentials(ac)
			updateToken(ac.token)
			setIsLoading(true)
			await setAuth(ac)
			setIsLoading(false)
		},
		[setAuth, updateToken]
	)

	const updateUser = useCallback(
		async (user: UserModel) => {
			if (authCredentials) await saveCredentials({ ...authCredentials, user })
		},
		[authCredentials, saveCredentials]
	)

	useEffect(() => {
		getAuth()
			.then(async (auth) => {
				if (auth) await saveCredentials(auth)
			})
			.catch((error) => console.log(error))
			.finally(() => setIsLoading(false))
	}, [getAuth, saveCredentials])

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
			updateUser,
		}),
		[authCredentials, removeCredentials, saveCredentials, isLoading, updateUser]
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
	const {
		removeCredentials,
		saveCredentials,
		isLoading,
		setIsLoading,
		updateUser,
	} = context

	const authCredServices: StrictOmit<
		AuthCredentialsService,
		'authCredentials'
	> = useMemo(
		() => ({
			removeCredentials,
			saveCredentials,
			isLoading,
			setIsLoading,
			updateUser,
		}),
		[isLoading, removeCredentials, saveCredentials, setIsLoading, updateUser]
	)

	return authCredServices
}
