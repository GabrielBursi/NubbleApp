import { AuthServices } from '@/api/services'

export const Logout = async () => {
	const message = await AuthServices.SignOut()
	return message
}
