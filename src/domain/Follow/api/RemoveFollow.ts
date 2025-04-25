import { FollowServices } from '@/api/services'
import { UserModel } from '@/domain/User'

export const RemoveFollow = async (
	followId: UserModel['id']
): Promise<void> => {
	await FollowServices.RemoveFollow(followId)
}
