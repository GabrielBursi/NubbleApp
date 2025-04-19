import { AuthCredentialsModel } from '@/domain/Auth'
import { UserModel } from '@/domain/User'

export interface AuthCredentialsService {
	/**  @default null */
	authCredentials: AuthCredentialsModel | null
	saveCredentials: (ac: AuthCredentialsModel) => Promise<void>
	updateUser: (user: UserModel) => Promise<void>
	removeCredentials: () => Promise<void>
	/**  @default false */
	isLoading: boolean
	setIsLoading: (isLoading: boolean) => void
}
