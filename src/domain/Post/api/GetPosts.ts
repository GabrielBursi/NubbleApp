import { PostAdapters } from '@/api/adapters'
import { PostServices } from '@/api/services'
import { PostModel } from '@/domain/Post'

export const GetPosts = async (page: number = 1): Promise<PostModel[]> => {
	const postPageAPI = await PostServices.GetAllWithPagination({
		page,
		per_page: 5,
	})
	return postPageAPI.data.map(PostAdapters.ToPost)
}
