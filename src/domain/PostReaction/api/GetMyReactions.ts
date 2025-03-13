import { PaginationAdapters, PostReactionAdapters } from '@/api/adapters'
import { PostReactionServices } from '@/api/services'
import { PageApp } from '@/types/shared'

import { PostReactionModel, PostReactionType } from '../models'

const PER_PAGE = 10

export const GetMyReactions = async (
	reactionType: PostReactionType,
	page: number
): Promise<PageApp<PostReactionModel>> => {
	const postReactionsApiPage = await PostReactionServices.GetMyReactions({
		page,
		per_page: PER_PAGE,
		reaction_type: reactionType,
	})

	return PaginationAdapters.ToPageModel(
		postReactionsApiPage,
		PostReactionAdapters.ToPostReaction
	)
}
