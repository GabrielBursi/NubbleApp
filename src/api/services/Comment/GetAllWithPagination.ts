import { NubbleApi } from '@/api/config'
import { CommentAPIModel } from '@/domain/Comment'
import { PostModel } from '@/domain/Post'
import { PageAPI, PageQueryParams } from '@/types/api'

//TODO: TRATAMENTO DE ERRO
export const GetAllWithPagination = async (
	post_id: PostModel['id'],
	params?: PageQueryParams
): Promise<PageAPI<CommentAPIModel>> => {
	const { data } = await NubbleApi.get<PageAPI<CommentAPIModel>>(
		'/user/post_comment',
		{
			params: {
				post_id,
				...params,
			},
		}
	)
	return data
}
