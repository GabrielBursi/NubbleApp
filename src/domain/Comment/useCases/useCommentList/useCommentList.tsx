import { useCallback } from 'react'

import { CommentApi } from '@/domain/Comment'
import { PostModel } from '@/domain/Post'
import { usePaginatedList } from '@/hooks'
import { AppQueryKeys } from '@/types/api'

export const useCommentList = (postId: PostModel['id']) => {
	const getComments = useCallback(
		(page: number) => CommentApi.GetComments(postId, page),
		[postId]
	)

	const { fetchNextPage, list, refreshList, ...restData } = usePaginatedList(
		getComments,
		{ queryKey: [AppQueryKeys.COMMENTS, postId] }
	)

	return {
		...restData,
		fetchMoreComments: fetchNextPage,
		comments: list,
		refreshComments: refreshList,
	} as const
}
