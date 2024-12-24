import { CommentServices } from '@/api/services'
import { CommentModel } from '@/domain/Comment'

export const DeleteComment = async (
	commentId: CommentModel['id']
): Promise<string> => {
	const { message } = await CommentServices.DeleteById(commentId)
	return message
}
