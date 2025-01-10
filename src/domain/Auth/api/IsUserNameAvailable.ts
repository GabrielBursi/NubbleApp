import { AuthServices } from '@/api/services'

export const IsUserNameAvailable = async (
	username: string
): Promise<boolean> => {
	const { isAvailable } = await AuthServices.VerifyUsername(username)
	return isAvailable
}
