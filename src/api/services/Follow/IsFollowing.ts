import { NubbleApi } from '@/api/config'
import { UserModel } from '@/domain/User'
import { END_POINTS_API } from '@/types/api'

export const IsFollowing = async (
	userId: UserModel['id']
): Promise<{ isFollowing: boolean }> => {
	const response = await NubbleApi<{ isFollowing: boolean }>(
		`${END_POINTS_API.FOLLOW}/is-following/${userId}`
	)
	return response.data
}
