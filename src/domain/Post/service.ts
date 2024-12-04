import { PostAdapters } from '@/api/adapters'
import { PostServices } from '@/api/services'
import { Post } from '@/domain'

export const getPosts = async (): Promise<Post[]> => {
	const postPageAPI = await PostServices.GetAllWithPagination()
	return postPageAPI.data.map(PostAdapters.ToPost)
}
