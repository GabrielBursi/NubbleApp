import React, { memo, useMemo } from 'react'

import { Box, Text } from '@/components'
import { useNavigationApp } from '@/hooks'

import { PostBottomProps } from './PostBottom.types'

const PostBottomMemoized = ({
	userName,
	commentCount = 0,
	text,
	id,
	authorId,
	hideCommentAction = false,
}: Readonly<PostBottomProps>) => {
	const { navigationAppStack } = useNavigationApp()

	const commentText = useMemo(() => {
		if (commentCount === 0) {
			return null
		} else if (commentCount === 1) {
			return 'ver comentário'
		} else {
			return `ver ${commentCount} comentários`
		}
	}, [commentCount])

	const navigateToPostCommentScreen = () => {
		navigationAppStack.navigate('PostCommentScreen', {
			postId: id,
			postAuthorId: authorId,
		})
	}

	return (
		<Box mt="s16">
			<Text preset="paragraphMedium" bold>
				{userName}
			</Text>
			<Text.Expanded preset="paragraphMedium" color="paragraph">
				{text}
			</Text.Expanded>
			{commentText && !hideCommentAction && (
				<Text
					onPress={navigateToPostCommentScreen}
					mt="s12"
					preset="paragraphSmall"
					bold
					color="primary"
				>
					{commentText}
				</Text>
			)}
		</Box>
	)
}

export const PostBottom = memo(PostBottomMemoized)
