import React, { useCallback } from 'react'

import { ActionIcon, Box } from '@/components'
import { PostReactionType } from '@/domain/PostReaction'
import { useReaction } from '@/domain/PostReaction/useCases/useReaction/useReaction'
import { useNavigationApp } from '@/hooks'
import { useToastService } from '@/services/toast'

import { PostActionsProps } from './PostActions.types'

export const PostActions = ({
	post,
	hideCommentAction = false,
}: Readonly<PostActionsProps>) => {
	const { author, id, commentCount, favoriteCount, reactionCount } = post

	const { showToast } = useToastService()
	const { reactToPost: favoritePost, hasReacted: hasFavorited } = useReaction({
		post,
		postReactionType: PostReactionType.FAVORITE,
		options: {
			onError: () =>
				showToast({
					type: 'error',
					message: 'Ocorreu um erro ao favoritar post.',
					position: 'bottom',
				}),
		},
	})
	const { reactToPost: likePost, hasReacted: hasLiked } = useReaction({
		post,
		postReactionType: PostReactionType.LIKE,
		options: {
			onError: () =>
				showToast({
					type: 'error',
					message: 'Ocorreu um erro ao dar like no post.',
					position: 'bottom',
				}),
		},
	})

	const { navigationAppStack } = useNavigationApp()

	const handleLikePost = useCallback(() => {
		likePost()
	}, [likePost])

	const navigateToComments = useCallback(() => {
		navigationAppStack.navigate('PostCommentScreen', {
			postAuthorId: author.id,
			postId: id,
		})
	}, [author.id, id, navigationAppStack])

	const handleFavoritePost = useCallback(() => {
		favoritePost()
	}, [favoritePost])

	return (
		<Box flexDirection="row" mt="s16" gap="s24">
			<ActionIcon
				onPress={handleLikePost}
				label={reactionCount}
				name={{
					default: 'heart',
					marked: hasLiked ? 'heartFill' : undefined,
				}}
			/>
			{!hideCommentAction && (
				<ActionIcon
					onPress={navigateToComments}
					label={commentCount}
					name={{
						default: 'comment',
					}}
				/>
			)}
			<ActionIcon
				onPress={handleFavoritePost}
				label={favoriteCount}
				name={{
					default: 'bookmark',
					marked: hasFavorited ? 'bookmarkFill' : undefined,
				}}
			/>
		</Box>
	)
}
