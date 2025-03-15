import React, { useMemo } from 'react'

import { CommentList } from '@/components'
import { ScreenTemplate } from '@/templates'
import { PostCommentScreenProps } from '@/types/screens'

export const PostCommentsScreen = ({
	route,
}: Readonly<PostCommentScreenProps>) => {
	const showPost = useMemo(
		() => route.params.showPost ?? false,
		[route.params.showPost]
	)

	return (
		<ScreenTemplate
			flex={1}
			title={showPost ? 'Post' : 'Comentários'}
			canGoBack
			style={
				// eslint-disable-next-line react-native/no-inline-styles
				showPost && {
					paddingHorizontal: 0,
				}
			}
		>
			<CommentList
				id={route.params.postId}
				authorId={route.params.postAuthorId}
				showPost={showPost}
			/>
		</ScreenTemplate>
	)
}
