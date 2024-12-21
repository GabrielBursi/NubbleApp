import { CommentAPIModel, CommentModel } from '@/domain/Comment'
import { dateUtils } from '@/utils'

export const ToComment = (commentAPI: CommentAPIModel): CommentModel => ({
	id: commentAPI.id,
	message: commentAPI.message,
	createdAt: commentAPI.created_at,
	createdAtRelative: dateUtils.formatRelative(commentAPI.created_at),
	author: {
		id: commentAPI.user.id,
		name: commentAPI.user.full_name,
		profileURL: commentAPI.user.profile_url,
		userName: commentAPI.user.username,
	},
})
