import { UserAdapters } from '@/api/adapters'
import { FollowServices, UserServices } from '@/api/services'

import { UserDetailsModel, UserModel } from '../models'

export const GetById = async (
	userId: UserModel['id']
): Promise<UserDetailsModel> => {
	const [userApi, { isFollowing }] = await Promise.all([
		UserServices.GetById(userId),
		FollowServices.IsFollowing(userId),
	])
	return UserAdapters.ToUserDetails(userApi, isFollowing)
}
