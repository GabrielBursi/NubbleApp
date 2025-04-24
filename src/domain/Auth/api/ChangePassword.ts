import { AuthServices } from '@/api/services'

import { EditPasswordParamsModel } from '../models'

export const ChangePassword = async (
	body: EditPasswordParamsModel
): Promise<string> => {
	const { message } = await AuthServices.UpdatePassword(body)
	return message
}
