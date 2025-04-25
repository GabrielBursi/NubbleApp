import { NubbleApi } from '@/api/config'
import { UserAPIModel, UserModel } from '@/domain/User'
import { END_POINTS_API } from '@/types/api'

export const GetById = async (
	userId: UserModel['id']
): Promise<UserAPIModel> => {
	const response = await NubbleApi<UserAPIModel>(
		`${END_POINTS_API.USERS}/${userId}`
	)
	return response.data
}
