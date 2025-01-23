import React, { useCallback } from 'react'

import { ActionIcon, Box } from '@/components'

import { PostActionsProps } from './PostActions.types'

export const PostActions = ({
	commentCount = 0,
	favoriteCount = 0,
	reactionCount = 0,
}: Readonly<PostActionsProps>) => {
	const likePost = useCallback(() => {
		//TODO: Implement like post
	}, [])

	const navigateToComments = useCallback(() => {
		//TODO: Implement navigate to comments
	}, [])

	const favoritePost = useCallback(() => {
		// TODO: Implement favorite post
	}, [])

	return (
		<Box flexDirection="row" mt="s16" gap="s24">
			<ActionIcon
				onPress={likePost}
				count={reactionCount}
				icon={{
					default: 'heart',
					marked: 'heartFill',
				}}
			/>
			<ActionIcon
				onPress={navigateToComments}
				count={commentCount}
				icon={{
					default: 'comment',
					marked: 'comment',
				}}
			/>
			<ActionIcon
				onPress={favoritePost}
				count={favoriteCount}
				icon={{
					default: 'bookmark',
					marked: 'bookmarkFill',
				}}
			/>
		</Box>
	)
}
