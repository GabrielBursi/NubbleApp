import { PostApi } from '@/domain/Post'
import { usePaginatedList } from '@/hooks'
import { AppQueryKeys } from '@/types/api'

export const usePostList = () => {
	const { fetchNextPage, list, refreshList, ...restData } = usePaginatedList(
		PostApi.GetPosts,
		{ queryKey: [AppQueryKeys.POSTS] }
	)

	return {
		...restData,
		fetchMorePosts: fetchNextPage,
		posts: list,
		refreshPosts: refreshList,
	} as const
}
