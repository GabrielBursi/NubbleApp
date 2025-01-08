/* eslint-disable @typescript-eslint/require-await */
import {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react'

import { StrictOmit } from '@/types/utils'

import { AuthCredentialsService } from '../models'

const AuthCredentialsContext = createContext<AuthCredentialsService | null>(
	null
)

export const AuthCredentialsProvider = ({
	children,
}: Readonly<PropsWithChildren>) => {
	const [authCredentials, setAuthCredentials] =
		useState<AuthCredentialsService['authCredentials']>(null)

	const removeCredentials = useCallback(
		async () => setAuthCredentials(null),
		[]
	)
	const saveCredentials = useCallback(
		async (ac: AuthCredentialsService['authCredentials']) =>
			setAuthCredentials(ac),
		[]
	)

	const context: AuthCredentialsService = useMemo(
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
	(): AuthCredentialsService['authCredentials'] => {
		const context = useContext(AuthCredentialsContext)
		if (!context)
			throw new Error(
				'useAuthCredentialsContext  must be used inside a provider!'
			)
		return context.authCredentials
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
	const { removeCredentials, saveCredentials, isLoading } = context

	return { removeCredentials, saveCredentials, isLoading } as const
}
