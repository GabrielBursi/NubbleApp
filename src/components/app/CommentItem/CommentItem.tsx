import React, { memo } from 'react'

import { Box, ProfileAvatar, Text } from '@/components'

import { CommentItemProps } from './CommentItem.types'

export const CommentItemMemoized = ({
	author,
	message,
	createdAtRelative,
}: Readonly<CommentItemProps>) => {
	return (
		<Box
			flexDirection="row"
			alignItems="center"
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
				<Text preset="paragraphSmall" color="gray1">
					{message}
				</Text>
			</Box>
		</Box>
	)
}

export const CommentItem = memo(CommentItemMemoized)
