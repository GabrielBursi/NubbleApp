import { NubbleApi } from '@/api/config'
import { PostAPI } from '@/domain'
import { PageAPI } from '@/types/api'

export const GetAllWithPagination = async (): Promise<PageAPI<PostAPI>> => {
	const { data } = await NubbleApi<PageAPI<PostAPI>>(`/user/post`)
	return data
}
