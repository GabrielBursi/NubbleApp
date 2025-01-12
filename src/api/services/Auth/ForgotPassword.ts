import { NubbleApi } from '@/api/config'
import { ForgotPasswordParamModel } from '@/domain/Auth'
import { END_POINTS_API } from '@/types/api'

export const ForgotPassword = async (
	params: ForgotPasswordParamModel
): Promise<{ message: string }> => {
	const response = await NubbleApi.post<{ message: string }>(
		END_POINTS_API.AUTH_FORGOT_PASSWORD,
		params
	)

	return response.data
}
