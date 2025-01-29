import { NubbleApi } from '@/api/config'
import { UserAPIModel } from '@/domain/User'
import { END_POINTS_API, PageAPI } from '@/types/api'

export const GetAllWithPagination = async (
	search: string
): Promise<PageAPI<UserAPIModel>> => {
	const response = await NubbleApi<PageAPI<UserAPIModel>>(
		END_POINTS_API.USERS,
		{
			params: { search },
		}
	)
	return response.data
}
