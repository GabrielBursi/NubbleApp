import { useCallback } from 'react'

import { InfiniteData, useQueryClient } from '@tanstack/react-query'

import { PostModel } from '@/domain/Post'
import { AppQueryKeys } from '@/types/api'
import { PageApp } from '@/types/shared'

type Action = 'increment' | 'decrement'

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

	const updatePosts = useCallback(
		(
			posts: PostModel[],
			postId: PostModel['id'],
			updater: (post: PostModel) => PostModel
		) => {
			const updatedPosts = posts.map((post) =>
				post.id === postId ? updater(post) : post
			)

			return updatedPosts
		},
		[]
	)

	const updateCountPosts = useCallback(
		(posts: PostModel[], postId: PostModel['id'], action: Action) =>
			updatePosts(posts, postId, (post) => ({
				...post,
				commentCount:
					action === 'increment'
						? post.commentCount + 1
						: post.commentCount - 1,
			})),
		[updatePosts]
	)

	const invalidateCommentCountPost = useCallback(
		(postId: PostModel['id'], action: Action) => {
			queryClient.setQueryData<InfiniteData<PageApp<PostModel>>>(
				[AppQueryKeys.POSTS],
				(oldData) => {
					if (oldData) {
						const data = oldData.pages

						const updatedPosts = data.map((page) => {
							const posts = page.data
							const updatedData = updateCountPosts(posts, postId, action)

							return {
								...page,
								data: updatedData,
							}
						})

						return {
							...oldData,
							pages: updatedPosts,
						}
					}

					return undefined
				}
			)
		},
		[queryClient, updateCountPosts]
	)

	return {
		invalidateCommentCountPost,
		invalidateQueryComments,
	} as const
}
