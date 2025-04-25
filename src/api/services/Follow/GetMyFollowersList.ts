import { NubbleApi } from '@/api/config'
import { FollowerUserAPIModel } from '@/domain/Follow'
import { END_POINTS_API, PageAPI, PageQueryParams } from '@/types/api'

export const GetMyFollowersList = async (
	params?: PageQueryParams
): Promise<PageAPI<FollowerUserAPIModel>> => {
	const { data } = await NubbleApi<PageAPI<FollowerUserAPIModel>>(
		`${END_POINTS_API.FOLLOW}/followers`,
		{ params }
	)
	return data
}
