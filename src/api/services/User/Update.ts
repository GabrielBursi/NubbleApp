import { NubbleApi } from '@/api/config'
import { UpdateUserParams, UserAPIModel } from '@/domain/User'
import { END_POINTS_API } from '@/types/api'

export const Update = async (body: UpdateUserParams): Promise<UserAPIModel> => {
	const { data } = await NubbleApi.put<UserAPIModel>(
		`${END_POINTS_API.USERS}`,
		body
	)
	return data
}
