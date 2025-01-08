import {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react'

import { StrictOmit } from '@/types/utils'

import { AuthCredentialsServiceWithoutPromise } from '../models'

const AuthCredentialsContext =
	createContext<AuthCredentialsServiceWithoutPromise | null>(null)

export const AuthCredentialsProvider = ({
	children,
}: Readonly<PropsWithChildren>) => {
	const [authCredentials, setAuthCredentials] =
		useState<AuthCredentialsServiceWithoutPromise['authCredentials']>(null)

	const removeCredentials = useCallback(() => setAuthCredentials(null), [])
	const saveCredentials = useCallback(
		(ac: AuthCredentialsServiceWithoutPromise['authCredentials']) =>
			setAuthCredentials(ac),
		[]
	)

	const context: AuthCredentialsServiceWithoutPromise = useMemo(
		() => ({
			authCredentials,
			isLoading: false,
			removeCredentials,
			saveCredentials,
		}),
		[authCredentials, removeCredentials, saveCredentials]
	)

	return (
		<AuthCredentialsContext.Provider value={context}>
			{children}
		</AuthCredentialsContext.Provider>
	)
}

export const useAuthCredentialsContext =
	(): AuthCredentialsServiceWithoutPromise['authCredentials'] => {
		const context = useContext(AuthCredentialsContext)
		if (!context)
			throw new Error(
				'useAuthCredentialsContext  must be used inside a provider!'
			)
		return context.authCredentials
	}

export const useAuthCredentialsServiceContext = (): StrictOmit<
	AuthCredentialsServiceWithoutPromise,
	'authCredentials'
> => {
	const context = useContext(AuthCredentialsContext)
	if (!context)
		throw new Error(
			'useAuthCredentialsServiceContext  must be used inside a provider!'
		)
	const { removeCredentials, saveCredentials, isLoading } = context

	return { removeCredentials, saveCredentials, isLoading } as const
}
