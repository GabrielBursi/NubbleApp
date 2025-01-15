import { NubbleApi } from '@/api/config'
import { AuthCredentialsAPIModel } from '@/domain/Auth'
import { END_POINTS_API } from '@/types/api'

export const RefreshToken = async (
	refreshToken: string
): Promise<AuthCredentialsAPIModel> => {
	const response = await NubbleApi.post<AuthCredentialsAPIModel>(
		END_POINTS_API.AUTH_REFRESH_TOKEN,
		{ refreshToken }
	)

	return response.data
}
