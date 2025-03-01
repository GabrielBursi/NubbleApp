import React, { memo, useCallback, useMemo } from 'react'

import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'

import { Icon, Box, ProfileAvatar, Text, PressableBox } from '@/components'
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
	const { isAllowedToDelete, deleteComment } = useDeleteComment(postId, {
		onSuccess: () =>
			showToast({
				message: 'Comentário excluído.',
				position: 'bottom',
			}),
	})

	const isAllowedToDeleteComment = useMemo(
		() => isAllowedToDelete(comment, userId, Number(postAuthorId)),
		[comment, isAllowedToDelete, postAuthorId, userId]
	)

	return (
		<Swipeable
			overshootRight={false}
			dragOffsetFromRightEdge={20}
			friction={2}
			testID="container-comment"
			renderRightActions={() =>
				isAllowedToDeleteComment ? (
					<Box
						justifyContent="center"
						alignContent="center"
						width={80}
						backgroundColor="redError"
						borderTopRightRadius="s8"
						borderBottomRightRadius="s8"
					>
						<PressableBox justifyContent="center" alignItems="center" gap="s8">
							<Icon name="trash" color="white70" />
							<Text preset="paragraphCaption" textAlign="center">
								Excluir comentário
							</Text>
						</PressableBox>
					</Box>
				) : null
			}
		>
			<Box
				flexDirection="row"
				alignItems="flex-start"
				role="listitem"
				gap="s10"
				accessible
				aria-label={message}
				backgroundColor="background"
			>
				<ProfileAvatar
					imageURL={author.profileURL}
					aria-label={author.userName}
				/>
				<Box flex={1}>
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
				{isAllowedToDeleteComment && (
					<Box
						backgroundColor="redError"
						borderRadius="s8"
						width={3}
						height={'100%'}
					/>
				)}
			</Box>
		</Swipeable>
	)
}

export const CommentItem = memo(CommentItemMemoized)
