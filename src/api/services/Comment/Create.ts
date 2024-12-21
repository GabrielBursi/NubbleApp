import { NubbleApi } from '@/api/config'
import { CommentAPIModel } from '@/domain/Comment'

//TODO: TRATAMENTO DE ERRO
export const Create = async (
	post_id: number,
	message: string
): Promise<CommentAPIModel> => {
	const { data } = await NubbleApi.post<CommentAPIModel>(`user/post_comment`, {
		post_id,
		message,
	})
	return data
}
