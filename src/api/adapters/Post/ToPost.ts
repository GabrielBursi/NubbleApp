import { PostModel, PostAPIModel } from '@/domain/Post'

/**
 * @description Adapta o PostAPIModel para o modelo de PostModel
 */
export const ToPost = (postAPI: PostAPIModel): PostModel => {
	return {
		id: postAPI.id.toString(),
		text: postAPI.text,
		author: {
			profileURL: postAPI.user.profile_url,
			name: postAPI.user.full_name,
			userName: postAPI.user.username,
			id: postAPI.user.id,
		},
		imageURL: postAPI.image_url,
		reactionCount: parseInt(postAPI.meta.like_count, 10),
		commentCount: parseInt(postAPI.meta.comments_count, 10),
		favoriteCount: parseInt(postAPI.meta.favorite_count, 10),
		reactions: postAPI.reactions.map((reaction) => ({
			emojiType: reaction.emoji_type,
			postId: reaction.post_id,
		})),
	}
}
