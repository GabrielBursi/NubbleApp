import { useCallback } from 'react'

import { CommentApi } from '@/domain/Comment'
import { usePaginatedList } from '@/hooks'

export const useCommentList = (postId: number) => {
	const getComments = useCallback(
		(page: number) => CommentApi.GetComments(postId, page),
		[postId]
	)

	const { fetchMoreDataWithPagination, listData, refreshList, ...restData } =
		usePaginatedList(getComments)

	return {
		...restData,
		fetchMoreCommentsWithPagination: fetchMoreDataWithPagination,
		comments: listData,
		refreshComments: refreshList,
	} as const
}
