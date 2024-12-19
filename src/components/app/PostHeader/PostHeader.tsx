import React, { memo } from 'react'

import { Box, ProfileAvatar, Text } from '@/components'

import { PostHeaderProps } from './PostHeader.types'

const PostHeaderMemoized = ({ author }: Readonly<PostHeaderProps>) => {
	return (
		<Box flexDirection="row" alignItems="center" mb="s16" gap="s12">
			<ProfileAvatar
				aria-label={author.userName}
				accessibilityLabel={author.userName}
				imageURL={author.profileURL}
			/>
			<Text semiBold preset="paragraphMedium">
				{author.userName}
			</Text>
		</Box>
	)
}

export const PostHeader = memo(PostHeaderMemoized)
