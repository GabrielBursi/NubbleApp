import { PostAdapters } from '@/api/adapters'
import { PostServices } from '@/api/services'

import { PostModel } from '../models'

export const GetById = async (postId: string): Promise<PostModel> => {
	const postApiData = await PostServices.GetById(postId)
	return PostAdapters.ToPost(postApiData)
}
