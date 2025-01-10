import { AuthAdapters } from '@/api/adapters'
import { AuthServices } from '@/api/services'
import { AuthCredentialsModel, SignInDataModel } from '@/domain/Auth'

export const Login = async (
	body: SignInDataModel
): Promise<AuthCredentialsModel> => {
	try {
		const authCredentialsAPI = await AuthServices.SignIn(body)
		return AuthAdapters.ToAuthCredentials(authCredentialsAPI)
	} catch {
		throw new Error('email ou senha inválido')
	}
}
