import { PostApi } from '@/domain/Post'
import { usePaginatedList } from '@/hooks'
import { AppQueryKeys } from '@/types/api'

export const usePostList = () => {
	const { fetchMoreDataWithPagination, listData, refreshList, ...restData } =
		usePaginatedList(PostApi.GetPosts, AppQueryKeys.POSTS)

	return {
		...restData,
		fetchMorePostsWithPagination: fetchMoreDataWithPagination,
		posts: listData,
		refreshPosts: refreshList,
	} as const
}
