import { AuthAdapters } from '@/api/adapters'
import { AuthServices } from '@/api/services'

import { AuthCredentialsModel } from '../models'

export const AuthenticateByRefreshToken = async (
	refreshToken: string
): Promise<AuthCredentialsModel> => {
	const acAPI = await AuthServices.RefreshToken(refreshToken)
	return AuthAdapters.ToAuthCredentials(acAPI)
}
