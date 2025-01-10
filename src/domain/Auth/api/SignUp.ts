import { AuthServices } from '@/api/services'
import { SignUpDataModel } from '@/domain/Auth'

export const SignUp = async (body: SignUpDataModel): Promise<void> => {
	try {
		await AuthServices.SignUp(body)
	} catch {
		throw new Error('não foi possível criar a conta')
	}
}
