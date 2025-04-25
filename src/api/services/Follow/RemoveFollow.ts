import { NubbleApi } from '@/api/config'
import { END_POINTS_API } from '@/types/api'

export const RemoveFollow = async (followId: number): Promise<string> => {
	const { data } = await NubbleApi.delete<string>(
		`${END_POINTS_API.FOLLOW}/${followId}`
	)
	return data
}
