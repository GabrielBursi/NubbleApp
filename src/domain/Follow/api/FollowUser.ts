import { FollowAdapters } from '@/api/adapters'
import { FollowServices } from '@/api/services'
import { UserModel } from '@/domain/User'

export const FollowUser = async (
	userId: UserModel['id']
): Promise<UserModel> => {
	const data = await FollowServices.Follow(userId)
	return FollowAdapters.FromFollowingToUser(data)
}
