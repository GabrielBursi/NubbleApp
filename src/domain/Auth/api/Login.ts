import { AuthAdapters } from '@/api/adapters'
import { AuthServices } from '@/api/services'
import { AuthCredentialsModel, PayloadLogin } from '@/domain/Auth'

export const Login = async (
	body: PayloadLogin
): Promise<AuthCredentialsModel> => {
	try {
		const authCredentialsAPI = await AuthServices.SignIn(body)
		return AuthAdapters.ToAuthCredentials(authCredentialsAPI)
	} catch {
		throw new Error('email ou senha inválido')
	}
}
