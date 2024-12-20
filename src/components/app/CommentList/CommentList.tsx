import React from 'react'

import { FlashList } from '@shopify/flash-list'

import { Box, CommentItem } from '@/components'
import { useCommentList } from '@/domain/Comment'

import { CommentListProps } from './CommentList.types'

const ItemSeparatorComponent = () => <Box mb="s16" />

export const CommentList = ({ id: postId }: Readonly<CommentListProps>) => {
	const { comments, loading } = useCommentList(postId)

	return (
		<FlashList
			showsVerticalScrollIndicator={false}
			data={comments}
			keyExtractor={(comment, index) => `${comment.id}-${index}`}
			renderItem={({ item: comment }) => <CommentItem {...comment} />}
			ItemSeparatorComponent={ItemSeparatorComponent}
			refreshing={loading}
			disableAutoLayout
			estimatedItemSize={300}
			accessible
			accessibilityLabel="feed"
			aria-label="feed"
			role="list"
			accessibilityRole="list"
		/>
	)
}
