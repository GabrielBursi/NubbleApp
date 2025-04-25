import { NubbleApi } from '@/api/config'
import { FollowingUserAPIModel } from '@/domain/Follow'
import { END_POINTS_API, PageAPI, PageQueryParams } from '@/types/api'

export const GetMyFollowingList = async (
	params?: PageQueryParams
): Promise<PageAPI<FollowingUserAPIModel>> => {
	const { data } = await NubbleApi<PageAPI<FollowingUserAPIModel>>(
		`${END_POINTS_API.FOLLOW}/following`,
		{ params }
	)
	return data
}
