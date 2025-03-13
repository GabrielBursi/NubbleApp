import { NubbleApi } from '@/api/config'
import {
	PostReactionBaseAPIModel,
	PostReactionType,
} from '@/domain/PostReaction'
import { END_POINTS_API } from '@/types/api'

//TODO: TRATAMENTO DE ERRO
/** create if not exists, otherelse edit */
export const Update = async (
	post_id: number,
	reaction_type: PostReactionType
): Promise<PostReactionBaseAPIModel> => {
	const path = `${END_POINTS_API.POST_REACTION}/${post_id}/${reaction_type}`
	const response = await NubbleApi.post<PostReactionBaseAPIModel>(path)
	return response.data
}
