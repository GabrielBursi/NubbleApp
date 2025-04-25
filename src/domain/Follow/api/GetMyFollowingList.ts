import { FollowAdapters, PaginationAdapters } from '@/api/adapters'
import { FollowServices } from '@/api/services'
import { PageApp } from '@/types/shared'

import { FollowUserModel } from '../models'

export const GetMyFollowingList = async (
	page: number
): Promise<PageApp<FollowUserModel>> => {
	const followingUserPageAPI = await FollowServices.GetMyFollowingList({
		page,
		per_page: 10,
	})

	return PaginationAdapters.ToPageModel(
		followingUserPageAPI,
		FollowAdapters.FromFollowingToUser
	)
}
