import React, { memo, useCallback, useMemo } from 'react'
import { Pressable } from 'react-native'

import { Box, ProfileAvatar, Text } from '@/components'
import { useDeleteComment } from '@/domain/Comment'
import { useToastService } from '@/services/toast'

import { CommentItemProps } from './CommentItem.types'

export const CommentItemMemoized = ({
	comment,
	postAuthorId,
	userId = 0,
	postId,
}: Readonly<CommentItemProps>) => {
	const { author, createdAtRelative, id, message } = comment

	const { showToast } = useToastService()
	const { confirmDelete, isAllowedToDelete, deleteComment } = useDeleteComment(
		postId,
		{
			onSuccess: () =>
				showToast({
					message: 'Comentário excluído.',
					position: 'bottom',
				}),
		}
	)

	const isAllowedToDeleteComment = useMemo(
		() => isAllowedToDelete(comment, userId, Number(postAuthorId)),
		[comment, isAllowedToDelete, postAuthorId, userId]
	)

	const handleLongPress = useCallback(() => {
		confirmDelete(() => deleteComment(id))
	}, [confirmDelete, deleteComment, id])

	return (
		<Pressable
			disabled={!isAllowedToDeleteComment}
			onLongPress={handleLongPress}
			testID="container-comment"
		>
			<Box
				flexDirection="row"
				alignItems="flex-start"
				role="listitem"
				accessible
				aria-label={message}
			>
				<ProfileAvatar
					imageURL={author.profileURL}
					aria-label={author.userName}
				/>
				<Box ml="s12" flex={1}>
					<Box gap="s8" alignItems="center" flexDirection="row">
						<Text preset="paragraphSmall" bold>
							{author.userName}
						</Text>
						<Text preset="paragraphCaption">{createdAtRelative}</Text>
					</Box>
					<Text.Expanded preset="paragraphSmall" color="paragraph">
						{message}
					</Text.Expanded>
				</Box>
			</Box>
		</Pressable>
	)
}

export const CommentItem = memo(CommentItemMemoized)
