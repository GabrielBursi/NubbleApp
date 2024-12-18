import React, { memo, useMemo } from 'react'

import { NavigationProp, useNavigation } from '@react-navigation/native'

import { Box, Text } from '@/components'
import { RootAppStackRouterParamList } from '@/types/routes'

import { PostBottomProps } from './PostBottom.types'

const PostBottomMemoized = ({
	userName,
	commentCount = 0,
	text,
	id,
}: Readonly<PostBottomProps>) => {
	const navigation =
		useNavigation<NavigationProp<RootAppStackRouterParamList>>()

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
		navigation.navigate('PostCommentScreen', {
			postId: id,
		})
	}

	return (
		<Box mt="s16">
			<Text preset="paragraphMedium" bold>
				{userName}
			</Text>
			<Text preset="paragraphMedium" color="gray1">
				{text}
			</Text>
			{commentText && (
				<Text
					onPress={navigateToPostCommentScreen}
					mt="s8"
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
