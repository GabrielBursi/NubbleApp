import { PostReactionAPIModel, PostReactionModel } from '@/domain/PostReaction'

import { UserAdapters } from '../User'

import { ToPostReactionBase } from './ToPostReactionBase'

export const ToPostReaction = (
	postReactionAPI: PostReactionAPIModel
): PostReactionModel => {
	return {
		...ToPostReactionBase(postReactionAPI),
		author: UserAdapters.ToUser(postReactionAPI.user),
		post: {
			id: String(postReactionAPI.post.id),
			text: postReactionAPI.post.text,
			imageURL: postReactionAPI.post.image_url,
		},
	}
}
