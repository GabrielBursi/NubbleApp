import { NubbleApi } from '@/api/config'
import { PostAPIModel } from '@/domain/Post'
import { END_POINTS_API } from '@/types/api'

export const GetById = async (postId: string): Promise<PostAPIModel> => {
	const response = await NubbleApi.get<PostAPIModel>(
		`${END_POINTS_API.POST}/${postId}`
	)
	return response.data
}
