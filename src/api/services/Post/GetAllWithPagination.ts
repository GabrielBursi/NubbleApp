import { NubbleApi } from '@/api/config'
import { PostAPIModel } from '@/domain/Post'
import { END_POINTS_API } from '@/types/api'
import { PageAPI, PageQueryParams } from '@/types/api'

//TODO: TRATAMENTO DE ERRO
export const GetAllWithPagination = async (
	params?: PageQueryParams
): Promise<PageAPI<PostAPIModel>> => {
	const { data } = await NubbleApi.get<PageAPI<PostAPIModel>>(
		END_POINTS_API.POST,
		{
			params,
		}
	)
	return data
}
