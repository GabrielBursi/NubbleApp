import { UserAdapters } from '@/api/adapters'
import { UserServices } from '@/api/services'

import { UpdateUserParams, UserModel } from '../models'

export const Update = async (
	updatedParams: UpdateUserParams
): Promise<UserModel> => {
	const userAPI = await UserServices.Update(updatedParams)
	return UserAdapters.ToUser(userAPI)
}
