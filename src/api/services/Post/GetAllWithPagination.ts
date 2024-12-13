import { NubbleApi } from '@/api/config'
import { PostAPIModel } from '@/domain/Post'
import { PageAPI, PageQueryParams } from '@/types/api'

//TODO: TRATAMENTO DE ERRO
export const GetAllWithPagination = async (
	params?: PageQueryParams
): Promise<PageAPI<PostAPIModel>> => {
	const { data } = await NubbleApi.get<PageAPI<PostAPIModel>>('/user/post', {
		params,
	})
	return data
}
