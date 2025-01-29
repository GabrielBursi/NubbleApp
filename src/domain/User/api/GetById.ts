import { UserAdapters } from '@/api/adapters'
import { UserServices } from '@/api/services'

import { UserModel } from '../models'

export const GetById = async (id: number): Promise<UserModel> => {
	const userAPI = await UserServices.GetById(id.toString())
	return UserAdapters.ToUser(userAPI)
}
