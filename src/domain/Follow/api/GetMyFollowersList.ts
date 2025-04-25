import { FollowAdapters, PaginationAdapters } from '@/api/adapters'
import { FollowServices } from '@/api/services'
import { PageApp } from '@/types/shared'

import { FollowUserModel } from '../models'

export const GetMyFollowersList = async (
	page: number
): Promise<PageApp<FollowUserModel>> => {
	const followPageAPI = await FollowServices.GetMyFollowersList({
		page,
		per_page: 10,
	})

	return PaginationAdapters.ToPageModel(
		followPageAPI,
		FollowAdapters.FromFollowerToUser
	)
}
