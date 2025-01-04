import { UserAdapters } from '@/api/adapters'
import { AuthCredentialsModel, AuthCredentialsAPIModel } from '@/domain/Auth'

export const ToAuthCredentials = (
	authCredentialsAPI: AuthCredentialsAPIModel
): AuthCredentialsModel => ({
	token: authCredentialsAPI.auth.token,
	user: UserAdapters.ToUser(authCredentialsAPI.user),
})
