import React, { useCallback, useState } from 'react'

import { FlashList } from '@shopify/flash-list'

import { Box, CommentItem, SeeMore, TextInputMessage } from '@/components'
import { useCommentList } from '@/domain/Comment'
import { useAppSafeArea } from '@/hooks'

import { CommentListProps } from './CommentList.types'

const ItemSeparatorComponent = () => <Box mb="s16" />

export const CommentList = ({ id: postId }: Readonly<CommentListProps>) => {
	const { comments, loading, meta, fetchMoreCommentsWithPagination } =
		useCommentList(postId)

	const { bottom } = useAppSafeArea()

	const [comment, setComment] = useState('')

	//TODO: implementar on press send
	const onPressSend = useCallback(() => {}, [])

	return (
		<Box flex={1} justifyContent="space-between">
			<FlashList
				showsVerticalScrollIndicator={false}
				data={comments}
				keyExtractor={(comment, index) => `${comment.id}-${index}`}
				renderItem={({ item: comment }) => <CommentItem {...comment} />}
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
			<TextInputMessage
				value={comment}
				onChangeText={setComment}
				placeholder="Adicione um comentário"
				onPressSend={onPressSend}
			/>
		</Box>
	)
}
