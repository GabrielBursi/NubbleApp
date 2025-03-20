import { useCallback } from 'react'

import { InfiniteData, useQueryClient } from '@tanstack/react-query'

import { PostModel } from '@/domain/Post'
import { PostReactionType } from '@/domain/PostReaction'
import { AppQueryKeys } from '@/types/api'
import { PageApp } from '@/types/shared'

type PostAction = 'increment' | 'decrement'
type InfinitePosts = InfiniteData<PageApp<PostModel>>

export const useInvalidateQueryPosts = () => {
	const queryClient = useQueryClient()

	const updatePostsQueryData = useCallback(
		(updater: (oldPosts: InfinitePosts) => InfinitePosts) => {
			queryClient.setQueryData<InfinitePosts>(
				[AppQueryKeys.POSTS],
				(oldPosts) => (oldPosts ? updater(oldPosts) : undefined)
			)
		},
		[queryClient]
	)

	const updatePostById = useCallback(
		(
			posts: PostModel[],
			postId: PostModel['id'],
			updater: (post: PostModel) => PostModel
		) => posts.map((post) => (post.id === postId ? updater(post) : post)),
		[]
	)

	const invalidateQueryFavorites = useCallback(async () => {
		await queryClient.invalidateQueries({
			exact: true,
			queryKey: [AppQueryKeys.FAVORITES],
		})
	}, [queryClient])

	const createCommentUpdater = useCallback(
		(action: PostAction) => (post: PostModel) => ({
			...post,
			commentCount:
				action === 'increment' ? post.commentCount + 1 : post.commentCount - 1,
		}),
		[]
	)

	const createReactionUpdater = useCallback(
		(reaction: PostReactionType, action: PostAction) =>
			(post: PostModel): PostModel => {
				if (reaction === PostReactionType.FAVORITE) {
					return {
						...post,
						reactions: [
							...post.reactions,
							{ postId: Number(post.id), emojiType: reaction },
						],
						favoriteCount:
							action === 'increment'
								? post.favoriteCount + 1
								: post.favoriteCount - 1,
					}
				}
				return {
					...post,
					reactions: [
						...post.reactions,
						{ postId: Number(post.id), emojiType: reaction },
					],
					reactionCount:
						action === 'increment'
							? post.reactionCount + 1
							: post.reactionCount - 1,
				}
			},
		[]
	)

	const updateInfinitePosts = useCallback(
		(
			postsData: InfinitePosts,
			postUpdater: (posts: PostModel[]) => PostModel[]
		): InfinitePosts => ({
			...postsData,
			pages: postsData.pages.map((page) => ({
				...page,
				data: postUpdater(page.data),
			})),
		}),
		[]
	)

	const updatePostCommentCount = useCallback(
		(postId: PostModel['id'], action: PostAction) =>
			updatePostsQueryData((postsData) =>
				updateInfinitePosts(postsData, (posts) =>
					updatePostById(posts, postId, createCommentUpdater(action))
				)
			),
		[
			updatePostsQueryData,
			updateInfinitePosts,
			updatePostById,
			createCommentUpdater,
		]
	)

	const updatePostReactionCount = useCallback(
		(postId: PostModel['id'], reaction: PostReactionType, action: PostAction) =>
			updatePostsQueryData((postsData) =>
				updateInfinitePosts(postsData, (posts) =>
					updatePostById(posts, postId, createReactionUpdater(reaction, action))
				)
			),
		[
			updatePostsQueryData,
			updateInfinitePosts,
			updatePostById,
			createReactionUpdater,
		]
	)

	return {
		updatePostCommentCount,
		updatePostReactionCount,
		invalidateQueryFavorites,
	} as const
}
