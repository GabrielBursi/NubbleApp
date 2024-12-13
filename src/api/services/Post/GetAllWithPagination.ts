import { NubbleApi } from '@/api/config'
import { PostAPIModel } from '@/domain/Post'
import { PageAPI } from '@/types/api'

//TODO: TRATAMENTO DE ERRO
export const GetAllWithPagination = async (): Promise<
	PageAPI<PostAPIModel>
> => {
	const { data } = await NubbleApi.get<PageAPI<PostAPIModel>>('/user/post')
	return data
}
