import { NubbleApi } from '@/api/config'
import { FieldIsAvailableAPIModel } from '@/domain/Auth'
import { END_POINTS_API } from '@/types/api'

export const VerifyUsername = async (
	username: string
): Promise<FieldIsAvailableAPIModel> => {
	const { data } = await NubbleApi<FieldIsAvailableAPIModel>(
		END_POINTS_API.AUTH_VALIDATE_USERNAME,
		{
			params: {
				username,
			},
		}
	)

	return data
}
