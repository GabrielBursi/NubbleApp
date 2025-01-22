import React from 'react'

import { FlashList } from '@shopify/flash-list'

import { Box, CommentItem, SeeMore, TextInputAddComment } from '@/components'
import { useCommentList } from '@/domain/Comment'
import { useAppSafeArea } from '@/hooks'
import { useAuthCredentials } from '@/services/auth'

import { CommentListProps } from './CommentList.types'

const ItemSeparatorComponent = () => <Box mb="s16" />

export const CommentList = ({
	id: postId,
	authorId,
}: Readonly<CommentListProps>) => {
	const { comments, isLoading, hasNextPage, fetchMoreComments } =
		useCommentList(postId)

	const { bottom } = useAppSafeArea()

	const authCre = useAuthCredentials()

	return (
		<Box flex={1} justifyContent="space-between">
			<FlashList
				showsVerticalScrollIndicator={false}
				data={comments}
				keyExtractor={(comment, index) => `${comment.id}-${index}`}
				renderItem={({ item: comment }) => (
					<CommentItem
						comment={comment}
						postAuthorId={authorId}
						userId={authCre?.user.id}
						postId={postId}
					/>
				)}
				ItemSeparatorComponent={ItemSeparatorComponent}
				ListFooterComponent={
					// eslint-disable-next-line @typescript-eslint/no-misused-promises, sonarjs/no-misused-promises
					hasNextPage ? <SeeMore onClickSeeMore={fetchMoreComments} /> : null
				}
				contentContainerStyle={{ paddingBottom: bottom }}
				refreshing={isLoading}
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
