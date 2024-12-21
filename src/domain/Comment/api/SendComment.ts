import { CommentAdapters } from '@/api/adapters'
import { CommentServices } from '@/api/services'
import { CommentModel } from '@/domain/Comment'

export const SendComment = async (
	postId: number,
	message: string
): Promise<CommentModel> => {
	const postCommentAPI = await CommentServices.Create(postId, message)
	return CommentAdapters.ToComment(postCommentAPI)
}
