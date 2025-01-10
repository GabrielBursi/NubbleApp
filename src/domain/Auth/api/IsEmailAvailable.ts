import { AuthServices } from '@/api/services'

export const IsEmailAvailable = async (email: string): Promise<boolean> => {
	const { isAvailable } = await AuthServices.VerifyEmail(email)
	return isAvailable
}
