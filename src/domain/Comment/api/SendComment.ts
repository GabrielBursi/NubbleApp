import { CommentAdapters } from '@/api/adapters'
import { CommentServices } from '@/api/services'
import { CommentModel } from '@/domain/Comment'
import { PostModel } from '@/domain/Post'

export const SendComment = async (
	postId: PostModel['id'],
	message: string
): Promise<CommentModel> => {
	const postCommentAPI = await CommentServices.Create(Number(postId), message)
	return CommentAdapters.ToComment(postCommentAPI)
}
