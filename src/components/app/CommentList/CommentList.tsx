import React from 'react'

import { FlashList } from '@shopify/flash-list'

import { Box, CommentItem } from '@/components'
import { useCommentList } from '@/domain/Comment'

import { CommentListProps } from './CommentList.types'

const ItemSeparatorComponent = () => <Box mb="s16" />

export const CommentList = ({ id: postId }: Readonly<CommentListProps>) => {
	const { comments, fetchMoreCommentsWithPagination, loading } =
		useCommentList(postId)

	return (
		<FlashList
			showsVerticalScrollIndicator={false}
			data={comments}
			keyExtractor={(comment) => `${comment.id}`}
			renderItem={({ item: comment }) => <CommentItem {...comment} />}
			ItemSeparatorComponent={ItemSeparatorComponent}
			refreshing={loading}
			disableAutoLayout
			estimatedItemSize={300}
			onEndReached={fetchMoreCommentsWithPagination}
			onEndReachedThreshold={0.1}
			accessible
			accessibilityLabel="feed"
			aria-label="feed"
			role="list"
			accessibilityRole="list"
		/>
	)
}
