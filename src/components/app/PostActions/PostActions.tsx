import React, { useCallback, useState } from 'react'

import { ActionIcon, Box } from '@/components'

import { PostActionsProps } from './PostActions.types'

export const PostActions = ({
	commentCount = 0,
	favoriteCount = 0,
	reactionCount = 0,
}: Readonly<PostActionsProps>) => {
	const [isLiked, setIsLiked] = useState(false)
	const [isFavorited, setIsFavorited] = useState(false)

	const likePost = useCallback(() => {
		//TODO: Implement like post
		setIsLiked((old) => !old)
	}, [])

	const navigateToComments = useCallback(() => {
		//TODO: Implement navigate to comments
	}, [])

	const favoritePost = useCallback(() => {
		setIsFavorited((old) => !old)
		// TODO: Implement favorite post
	}, [])

	return (
		<Box flexDirection="row" mt="s16" gap="s24">
			<ActionIcon
				onPress={likePost}
				label={reactionCount}
				name={{
					default: 'heart',
					marked: isLiked ? 'heartFill' : undefined,
				}}
			/>
			<ActionIcon
				onPress={navigateToComments}
				label={commentCount}
				name={{
					default: 'comment',
				}}
			/>
			<ActionIcon
				onPress={favoritePost}
				label={favoriteCount}
				name={{
					default: 'bookmark',
					marked: isFavorited ? 'bookmarkFill' : undefined,
				}}
			/>
		</Box>
	)
}
