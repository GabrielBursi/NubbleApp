import { NubbleApi } from '@/api/config'
import { EditPasswordParamsModel } from '@/domain/Auth'
import { END_POINTS_API } from '@/types/api'

export const UpdatePassword = async (
	body: EditPasswordParamsModel
): Promise<{ message: string }> => {
	const { data } = await NubbleApi.post<{ message: string }>(
		`${END_POINTS_API.AUTH_UPDATE_PASSWORD}`,
		body
	)
	return data
}
