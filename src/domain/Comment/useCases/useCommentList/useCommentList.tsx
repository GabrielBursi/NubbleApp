import { useCallback } from 'react'

import { CommentApi } from '@/domain/Comment'
import { PostModel } from '@/domain/Post'
import { usePaginatedList } from '@/hooks'

export const useCommentList = (postId: PostModel['id']) => {
	const getComments = useCallback(
		(page: number) => CommentApi.GetComments(postId, page),
		[postId]
	)

	const { fetchMoreDataWithPagination, listData, refreshList, ...restData } =
		usePaginatedList(getComments, 'comments')

	return {
		...restData,
		fetchMoreCommentsWithPagination: fetchMoreDataWithPagination,
		comments: listData,
		refreshComments: refreshList,
	} as const
}
