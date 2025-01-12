import { AuthServices } from '@/api/services'

export const RequestNewPassword = async (email: string): Promise<string> => {
	try {
		const { message } = await AuthServices.ForgotPassword({ email })
		return message
	} catch {
		throw new Error('não possível recuperar senha')
	}
}
