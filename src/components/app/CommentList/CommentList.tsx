import React from 'react'

import { FlashList } from '@shopify/flash-list'

import { Box, CommentItem, SeeMore, TextInputAddComment } from '@/components'
import { useCommentList } from '@/domain/Comment'
import { useAppSafeArea } from '@/hooks'

import { CommentListProps } from './CommentList.types'

const ItemSeparatorComponent = () => <Box mb="s16" />

export const CommentList = ({
	id: postId,
	authorId,
}: Readonly<CommentListProps>) => {
	const { comments, loading, meta, fetchMoreCommentsWithPagination } =
		useCommentList(postId)

	const { bottom } = useAppSafeArea()

	return (
		<Box flex={1} justifyContent="space-between">
			<FlashList
				showsVerticalScrollIndicator={false}
				data={comments}
				keyExtractor={(comment, index) => `${comment.id}-${index}`}
				renderItem={({ item: comment }) => (
					<CommentItem comment={comment} postAuthorId={authorId} userId={1} />
				)}
				ItemSeparatorComponent={ItemSeparatorComponent}
				ListFooterComponent={
					meta?.hasNextPage ? (
						<SeeMore onClickSeeMore={fetchMoreCommentsWithPagination} />
					) : null
				}
				contentContainerStyle={{ paddingBottom: bottom }}
				refreshing={loading}
				disableAutoLayout
				estimatedItemSize={300}
				accessible
				accessibilityLabel="feed"
				aria-label="feed"
				role="list"
				accessibilityRole="list"
			/>
			<TextInputAddComment postId={postId} />
		</Box>
	)
}
