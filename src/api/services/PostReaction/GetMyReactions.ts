import { NubbleApi } from '@/api/config'
import { PostReactionAPIModel, PostReactionType } from '@/domain/PostReaction'
import { END_POINTS_API, PageAPI, PageQueryParams } from '@/types/api'

type MyReactionsParam = PageQueryParams & {
	post_id?: number
	reaction_type?: PostReactionType
}

//TODO: TRATAMENTO DE ERRO
export const GetMyReactions = async (
	myReactionsParam?: MyReactionsParam
): Promise<PageAPI<PostReactionAPIModel>> => {
	const response = await NubbleApi.get<PageAPI<PostReactionAPIModel>>(
		`${END_POINTS_API.POST_REACTION}/my-reactions`,
		{
			params: {
				...myReactionsParam,
			},
		}
	)
	return response.data
}
