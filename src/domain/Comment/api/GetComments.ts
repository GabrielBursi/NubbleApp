import { CommentAdapters, PaginationAdapters } from '@/api/adapters'
import { CommentServices } from '@/api/services'
import { CommentModel } from '@/domain/Comment'
import { PageApp } from '@/types/shared'

export const GetComments = async (
	postId: number,
	page: number
): Promise<PageApp<CommentModel>> => {
	const { data, meta } = await CommentServices.GetAllWithPagination(postId, {
		page,
		per_page: 10,
	})
	return {
		data: data.map(CommentAdapters.ToComment),
		meta: PaginationAdapters.ToMetaPagination(meta),
	}
}
