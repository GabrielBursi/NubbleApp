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

	const invalidateQueryFavorites = useCallback(async () => {
		await queryClient.invalidateQueries({
			exact: true,
			queryKey: [AppQueryKeys.FAVORITES],
		})
	}, [queryClient])

	const invalidateQueryPosts = useCallback(async () => {
		await queryClient.invalidateQueries({
			exact: true,
			queryKey: [AppQueryKeys.POSTS],
		})
	}, [queryClient])

	const cancelQueryPosts = useCallback(async () => {
		await queryClient.cancelQueries({
			exact: true,
			queryKey: [AppQueryKeys.POSTS],
		})
	}, [queryClient])

	const updatePostsQueryData = useCallback(
		(updater: (oldPosts: InfinitePosts) => InfinitePosts) => {
			queryClient.setQueryData<InfinitePosts>(
				[AppQueryKeys.POSTS],
				(oldPosts) => (oldPosts ? updater(oldPosts) : undefined)
			)
		},
		[queryClient]
	)

	const updatePostByIdData = useCallback(
		(postId: PostModel['id'], updater: (oldPost: PostModel) => PostModel) => {
			const postByIdData = queryClient.getQueryData<PostModel>([
				AppQueryKeys.POSTS_BY_ID,
				postId,
			])
			if (postByIdData)
				queryClient.setQueryData<PostModel>(
					[AppQueryKeys.POSTS_BY_ID, postId],
					(oldPost) => updater(oldPost!)
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
						reactions:
							action === 'increment'
								? [
										...post.reactions,
										{ postId: Number(post.id), emojiType: reaction },
									]
								: post.reactions.filter((r) => r.emojiType !== reaction),
						favoriteCount:
							action === 'increment'
								? post.favoriteCount + 1
								: post.favoriteCount - 1,
					}
				}
				return {
					...post,
					reactions:
						action === 'increment'
							? [
									...post.reactions,
									{ postId: Number(post.id), emojiType: reaction },
								]
							: post.reactions.filter((r) => r.emojiType !== reaction),
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

	const updatePostByIdReactionCount = useCallback(
		(postId: PostModel['id'], reaction: PostReactionType, action: PostAction) =>
			updatePostByIdData(postId, createReactionUpdater(reaction, action)),
		[createReactionUpdater, updatePostByIdData]
	)

	const updatePostReactionCount = useCallback(
		(
			postId: PostModel['id'],
			reaction: PostReactionType,
			action: PostAction
		) => {
			updatePostByIdReactionCount(postId, reaction, action)
			updatePostsQueryData((postsData) =>
				updateInfinitePosts(postsData, (posts) =>
					updatePostById(posts, postId, createReactionUpdater(reaction, action))
				)
			)
		},
		[
			updatePostByIdReactionCount,
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
		invalidateQueryPosts,
		cancelQueryPosts,
	} as const
}
