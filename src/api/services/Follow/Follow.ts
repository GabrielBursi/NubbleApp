import { NubbleApi } from '@/api/config'
import { FollowingUserAPIModel } from '@/domain/Follow'
import { UserModel } from '@/domain/User'
import { END_POINTS_API } from '@/types/api'

export const Follow = async (
	userId: UserModel['id']
): Promise<FollowingUserAPIModel> => {
	const { data } = await NubbleApi.post<FollowingUserAPIModel>(
		END_POINTS_API.FOLLOW,
		{},
		{ params: { followed_user_id: userId } }
	)
	return data
}
