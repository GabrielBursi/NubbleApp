import { FollowServices } from '@/api/services'
import { UserModel } from '@/domain/User'

export const isFollowing = async (
	userId: UserModel['id']
): Promise<{ isFollowing: boolean }> => {
	return FollowServices.IsFollowing(userId)
}
