import { AuthCredentialsModel } from '@/domain/Auth'

export interface AuthCredentialsService {
	/**  @default null */
	authCredentials: AuthCredentialsModel | null
	saveCredentials: (ac: AuthCredentialsModel) => Promise<void>
	removeCredentials: () => Promise<void>
	/**  @default false */
	isLoading: boolean
}

export interface AuthCredentialsServiceWithoutPromise
	extends Omit<
		AuthCredentialsService,
		'saveCredentials' | 'removeCredentials'
	> {
	saveCredentials: (ac: AuthCredentialsModel) => void
	removeCredentials: () => void
}
