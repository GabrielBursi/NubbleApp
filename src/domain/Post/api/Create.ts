import { PostAdapters } from '@/api/adapters'
import { PostServices } from '@/api/services'
import { ImageForUpload } from '@/services/multimedia'

import { PostModel } from '../models'

export const Create = async (
	text: string,
	postImage: ImageForUpload
): Promise<PostModel> => {
	const postApiData = await PostServices.Create(text, postImage)
	return PostAdapters.ToPost(postApiData)
}
