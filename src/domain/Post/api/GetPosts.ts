import { PostAdapters } from '@/api/adapters'
import { PostServices } from '@/api/services'
import { PostModel } from '@/domain/Post'

export const GetPosts = async (): Promise<PostModel[]> => {
	const postPageAPI = await PostServices.GetAllWithPagination()
	return postPageAPI.data.map(PostAdapters.ToPost)
}
