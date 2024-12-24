import { END_POINTS_API, NubbleApi } from '@/api/config'
import { CommentAPIModel } from '@/domain/Comment'
import { PostAPIModel } from '@/domain/Post'

//TODO: TRATAMENTO DE ERRO
export const Create = async (
	post_id: PostAPIModel['id'],
	message: string
): Promise<CommentAPIModel> => {
	const { data } = await NubbleApi.post<CommentAPIModel>(
		END_POINTS_API.COMMENT,
		{
			post_id,
			message,
		}
	)
	return data
}