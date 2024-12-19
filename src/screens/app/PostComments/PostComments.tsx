import React from 'react'

import { Box, CommentList } from '@/components'
import { ScreenTemplate } from '@/templates'
import { PostCommentScreenProps } from '@/types/screens'

export const PostCommentsScreen = ({
	route,
}: Readonly<PostCommentScreenProps>) => {
	return (
		<ScreenTemplate title="Comentários" canGoBack>
			<Box>
				<CommentList id={route.params.postId} />
			</Box>
		</ScreenTemplate>
	)
}
