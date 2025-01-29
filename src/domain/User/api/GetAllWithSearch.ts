import { PaginationAdapters, UserAdapters } from '@/api/adapters'
import { UserServices } from '@/api/services'
import { PageApp } from '@/types/shared'

import { UserModel } from '../models'

export const GetAllWithSearch = async (
	search: string
): Promise<PageApp<UserModel>> => {
	const userPageAPI = await UserServices.GetAllWithPagination(search)

	return PaginationAdapters.ToPageModel(userPageAPI, UserAdapters.ToUser)
}
