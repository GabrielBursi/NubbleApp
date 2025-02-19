import { NubbleApi } from '@/api/config'
import { PostAPIModel } from '@/domain/Post'
import { ImageForUpload } from '@/services/multimedia'
import { END_POINTS_API } from '@/types/api'

//TODO: TRATAMENTO DE ERRO
export const Create = async (
	text: string,
	imageCover: ImageForUpload
): Promise<PostAPIModel> => {
	const form = new FormData()
	form.append('text', text)
	form.append('imageCover', imageCover)

	const response = await NubbleApi.postForm<PostAPIModel>(
		END_POINTS_API.POST,
		form
	)
	return response.data
}
