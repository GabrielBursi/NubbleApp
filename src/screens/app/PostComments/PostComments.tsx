import React from 'react'

import { CommentList } from '@/components'
import { ScreenTemplate } from '@/templates'
import { PostCommentScreenProps } from '@/types/screens'

export const PostCommentsScreen = ({
	route,
}: Readonly<PostCommentScreenProps>) => {
	return (
		<ScreenTemplate flex={1} title="Comentários" canGoBack>
			<CommentList id={route.params.postId} />
		</ScreenTemplate>
	)
}
