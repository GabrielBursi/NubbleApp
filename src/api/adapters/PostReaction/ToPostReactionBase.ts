import {
	PostReactionBaseAPIModel,
	PostReactionBaseModel,
} from '@/domain/PostReaction'

export const ToPostReactionBase = (
	postReactionBaseAPI: PostReactionBaseAPIModel
): PostReactionBaseModel => {
	return {
		id: postReactionBaseAPI.id,
		postId: postReactionBaseAPI.post_id,
		userId: postReactionBaseAPI.user_id,
		emojiType: postReactionBaseAPI.emoji_type,
		isChecked: postReactionBaseAPI.is_checked,
		createdAt: postReactionBaseAPI.created_at,
		updatedAt: postReactionBaseAPI.updated_at,
	}
}
