import { CommentAdapters, PaginationAdapters } from '@/api/adapters'
import { CommentServices } from '@/api/services'
import { CommentModel } from '@/domain/Comment'
import { PostModel } from '@/domain/Post'
import { PageApp } from '@/types/shared'

export const GetComments = async (
	postId: PostModel['id'],
	page: number
): Promise<PageApp<CommentModel>> => {
	const comments = await CommentServices.GetAllWithPagination(postId, {
		page,
		per_page: 10,
	})
	return PaginationAdapters.ToPageModel(comments, CommentAdapters.ToComment)
}
