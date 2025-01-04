import { NubbleApi } from '@/api/config'
import { END_POINTS_API } from '@/types/api'

export const SignOut = async (): Promise<string> => {
	const { data } = await NubbleApi<string>(END_POINTS_API.AUTH_SIGNOUT)
	return data
}
