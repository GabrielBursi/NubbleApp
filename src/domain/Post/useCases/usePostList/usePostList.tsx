import { PostApi } from '@/domain/Post'
import { usePaginatedList } from '@/hooks'

export const usePostList = () => {
	const { fetchMoreDataWithPagination, listData, refreshList, ...restData } =
		usePaginatedList(PostApi.GetPosts)

	return {
		...restData,
		fetchMorePostsWithPagination: fetchMoreDataWithPagination,
		posts: listData,
		refreshPosts: refreshList,
	} as const
}
