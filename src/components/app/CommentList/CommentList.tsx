import React from 'react'

import { FlashList } from '@shopify/flash-list'

import {
	Box,
	CommentItem,
	Container,
	PostItem,
	SeeMore,
	TextInputAddComment,
} from '@/components'
import { useCommentList } from '@/domain/Comment'
import { usePostGetById } from '@/domain/Post'
import { useAppSafeArea } from '@/hooks'
import { useAuthCredentials } from '@/services/auth'

import { CommentListProps } from './CommentList.types'

const ItemSeparatorComponent = () => <Box mb="s16" />

export const CommentList = ({
	id: postId,
	authorId,
	showPost = false,
}: Readonly<CommentListProps>) => {
	const { comments, isLoading, hasNextPage, fetchMoreComments } =
		useCommentList(postId)

	const { bottom } = useAppSafeArea()

	const authCre = useAuthCredentials()

	const { post } = usePostGetById(showPost ? postId : undefined)

	return (
		<Box flex={1} justifyContent="space-between">
			<FlashList
				showsVerticalScrollIndicator={false}
				data={comments}
				keyExtractor={(comment, index) => `${comment.id}-${index}`}
				renderItem={({ item: comment }) =>
					showPost ? (
						<Container>
							<CommentItem
								comment={comment}
								postAuthorId={authorId}
								userId={authCre?.user.id}
								postId={postId}
							/>
						</Container>
					) : (
						<CommentItem
							comment={comment}
							postAuthorId={authorId}
							userId={authCre?.user.id}
							postId={postId}
						/>
					)
				}
				ItemSeparatorComponent={ItemSeparatorComponent}
				ListHeaderComponent={
					post ? <PostItem post={post} hideCommentAction /> : null
				}
				ListFooterComponent={
					hasNextPage ? (
						<SeeMore
							textAlign="center"
							mt="s10"
							// eslint-disable-next-line @typescript-eslint/no-misused-promises, sonarjs/no-misused-promises
							handleExpanded={fetchMoreComments}
						/>
					) : null
				}
				contentContainerStyle={{ paddingBottom: bottom }}
				refreshing={isLoading}
				disableAutoLayout
				// size CommentItem device: Pixel 8 Pro API 34
				estimatedItemSize={80}
				accessible
				accessibilityLabel="comments"
				aria-label="comments"
				role="list"
				accessibilityRole="list"
			/>
			{showPost ? (
				<Container flex={0}>
					<TextInputAddComment postId={postId} />
				</Container>
			) : (
				<TextInputAddComment postId={postId} />
			)}
		</Box>
	)
}
