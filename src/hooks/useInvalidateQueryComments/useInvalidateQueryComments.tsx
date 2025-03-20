import { useCallback } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { PostModel } from '@/domain/Post'
import { AppQueryKeys } from '@/types/api'

export const useInvalidateQueryComments = () => {
	const queryClient = useQueryClient()

	const invalidateQueryComments = useCallback(
		async (postId: PostModel['id']) => {
			await queryClient.invalidateQueries({
				exact: true,
				queryKey: [AppQueryKeys.COMMENTS, postId],
			})
		},
		[queryClient]
	)

	return {
		invalidateQueryComments,
	} as const
}
