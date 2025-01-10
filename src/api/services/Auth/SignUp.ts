import { NubbleApi } from '@/api/config'
import { SignUpDataAPIModel } from '@/domain/Auth'
import { UserAPIModel } from '@/domain/User'
import { END_POINTS_API } from '@/types/api'

export const SignUp = async (
	body: SignUpDataAPIModel
): Promise<UserAPIModel> => {
	const { data } = await NubbleApi.post<UserAPIModel>(
		END_POINTS_API.AUTH_SIGNUP,
		body
	)
	return data
}
