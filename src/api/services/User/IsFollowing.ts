import { NubbleApi } from '@/api/config'
import { END_POINTS_API } from '@/types/api'

export const IsFollowing = async (
	userId: string
): Promise<{ isFollowing: boolean }> => {
	const response = await NubbleApi<{ isFollowing: boolean }>(
		`${END_POINTS_API.USERS}/follow/is-following/${userId}`
	)
	return response.data
}
