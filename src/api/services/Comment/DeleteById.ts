import { END_POINTS_API, NubbleApi } from '@/api/config'
import { CommentAPIModel } from '@/domain/Comment'

//TODO: TRATAMENTO DE ERRO
export const DeleteById = async (
	comment_id: CommentAPIModel['id']
): Promise<{ message: string }> => {
	const { data } = await NubbleApi.delete<{ message: string }>(
		`${END_POINTS_API.COMMENT}/${comment_id}`
	)
	return data
}
