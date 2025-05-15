import { NubbleApi } from '@/api/config'
import { END_POINTS_API } from '@/types/api'

export const SaveNotificationToken = async (token: string): Promise<string> => {
	const response = await NubbleApi.post<string>(
		`${END_POINTS_API.USERS}/notification-token`,
		{
			token,
		}
	)
	return response.data
}
