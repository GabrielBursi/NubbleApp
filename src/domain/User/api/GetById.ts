import { UserAdapters } from '@/api/adapters'
import { UserServices } from '@/api/services'

import { UserDetailsModel, UserModel } from '../models'

export const GetById = async (
	userId: UserModel['id']
): Promise<UserDetailsModel> => {
	const [userApi, { isFollowing }] = await Promise.all([
		UserServices.GetById(userId.toString()),
		UserServices.IsFollowing(userId.toString()),
	])
	return UserAdapters.ToUserDetails(userApi, isFollowing)
}
