import { NubbleApi } from '@/api/config'
import { END_POINTS_API } from '@/types/api'

export const DeleteNotificationToken = async (): Promise<string> => {
	const response = await NubbleApi.delete<string>(
		`${END_POINTS_API.USERS}/notification-token`
	)
	return response.data
}
