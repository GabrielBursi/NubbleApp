import React from 'react'

import { ActionIcon, Box } from '@/components'

import { PostActionsProps } from './PostActions.types'

export const PostActions = ({
	commentCount = 0,
	favoriteCount = 0,
	reactionCount = 0,
}: Readonly<PostActionsProps>) => {
	const likePost = () => {
		//TODO: Implement like post
	}

	const navigateToComments = () => {
		//TODO: Implement navigate to comments
	}

	const favoritePost = () => {
		// TODO: Implement favorite post
	}

	return (
		<Box flexDirection="row" gap="s24">
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
