import { NubbleApi } from '@/api/config'
import { AuthCredentialsAPIModel, PayloadLogin } from '@/domain/Auth'
import { END_POINTS_API } from '@/types/api'

export const SignIn = async (
	body: PayloadLogin
): Promise<AuthCredentialsAPIModel> => {
	const { data } = await NubbleApi.post<AuthCredentialsAPIModel>(
		END_POINTS_API.AUTH_SIGNIN,
		body
	)
	return data
}
