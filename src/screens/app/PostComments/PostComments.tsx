import React from 'react'

import { Box, Text } from '@/components'
import { ScreenTemplate } from '@/templates'
import { PostCommentScreenProps } from '@/types/screens'

export const PostCommentsScreen = ({
	route,
}: Readonly<PostCommentScreenProps>) => {
	console.log(route.params)

	return (
		<ScreenTemplate title="Comentários" canGoBack>
			<Box>
				<Text>Tela de comentários</Text>
			</Box>
		</ScreenTemplate>
	)
}
