import { PostReactionAdapters } from '@/api/adapters'
import { PostReactionServices } from '@/api/services'

import { PostReactionBaseModel, PostReactionType } from '../models'

export const ReactToPost = async (
	postId: string,
	reactionType: PostReactionType
): Promise<PostReactionBaseModel> => {
	const postReactionBaseAPI = await PostReactionServices.Update(
		postId,
		reactionType
	)

	return PostReactionAdapters.ToPostReactionBase(postReactionBaseAPI)
}
