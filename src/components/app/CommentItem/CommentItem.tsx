import React, { memo } from 'react'

import { Box, ProfileAvatar, Text } from '@/components'

import { CommentItemProps } from './CommentItem.types'

export const CommentItemMemoized = ({
	author,
	message,
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
			<Box ml="s12">
				<Text preset="paragraphSmall" bold>
					{author.userName}
				</Text>
				<Text preset="paragraphSmall" color="gray1">
					{message}
				</Text>
			</Box>
		</Box>
	)
}

export const CommentItem = memo(CommentItemMemoized)
