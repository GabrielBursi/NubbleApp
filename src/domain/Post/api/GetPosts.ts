import { PaginationAdapters, PostAdapters } from '@/api/adapters'
import { PostServices } from '@/api/services'
import { PostModel } from '@/domain/Post'
import { PageApp } from '@/types/shared'

export const GetPosts = async (
	page: number = 1,
	userId?: PostModel['author']['id']
): Promise<PageApp<PostModel>> => {
	const posts = await PostServices.GetAllWithPagination({
		page,
		per_page: 5,
		user_id: userId ? Number(userId) : undefined,
	})
	return PaginationAdapters.ToPageModel(posts, PostAdapters.ToPost)
}
