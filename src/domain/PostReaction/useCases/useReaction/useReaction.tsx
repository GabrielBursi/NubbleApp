import { useCallback, useMemo } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { PostModel } from '@/domain/Post'
import {
	PostReactionBaseModel,
	PostReactionModel,
	PostReactionType,
	PostReactionApi,
} from '@/domain/PostReaction'
import { useInvalidateQueryPosts } from '@/hooks'
import { AppQueryKeys } from '@/types/api'
import { MutationOptions } from '@/types/shared'

type UseReactionParams = {
	post: PostModel
	postReactionType: PostReactionType
	options?: MutationOptions<PostReactionBaseModel>
}

export const useReaction = ({
	post,
	postReactionType,
	options,
}: UseReactionParams) => {
	const hasReactedToPost = useCallback(
		(
			postReactions: Pick<PostReactionModel, 'emojiType'>[],
			postReactionType: PostReactionType
		) =>
			postReactions.some((reaction) => reaction.emojiType === postReactionType),
		[]
	)

	const hasReacted: boolean = useMemo(() => {
		return hasReactedToPost(post.reactions, postReactionType)
	}, [hasReactedToPost, post.reactions, postReactionType])

	const queryClient = useQueryClient()

	const {
		invalidateQueryFavorites,
		updatePostReactionCount,
		cancelQueryPosts,
	} = useInvalidateQueryPosts()

	const { mutate, data, error, isPending } = useMutation({
		mutationFn: () => PostReactionApi.ReactToPost(post.id, postReactionType),
		onMutate: async () => {
			await cancelQueryPosts()
			const previousPosts = queryClient.getQueryData([AppQueryKeys.POSTS])
			updatePostReactionCount(
				post.id,
				postReactionType,
				hasReacted ? 'decrement' : 'increment'
			)
			return { previousPosts }
		},
		onSuccess: async (data) => {
			if (postReactionType === PostReactionType.FAVORITE)
				await invalidateQueryFavorites()
			options?.onSuccess?.(data)
		},
		onError: async (_error, _variables, context) => {
			await cancelQueryPosts()
			queryClient.setQueryData([AppQueryKeys.POSTS], context?.previousPosts)
			options?.onError?.(options.errorMessage ?? 'erro ao reagir ao post')
		},
	})

	return {
		hasReacted,
		reactToPost: mutate,
		reaction: data ?? null,
		error,
		isLoading: isPending,
	} as const
}
