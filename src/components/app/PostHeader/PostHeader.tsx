import React, { memo } from 'react'
import { Image } from 'react-native'

import { Box, Text } from '@/components'
import { useAppTheme } from '@/hooks'

import { PostHeaderProps } from './PostHeader.types'

const PostHeaderMemoized = ({ author }: Readonly<PostHeaderProps>) => {
	const { borderRadii, spacing } = useAppTheme()

	return (
		<Box flexDirection="row" alignItems="center" mb="s16" gap="s12">
			<Image
				accessible
				accessibilityRole="image"
				aria-label={author.userName}
				accessibilityLabel={author.userName}
				role="img"
				source={{ uri: author.profileURL }}
				style={{
					width: spacing.s32,
					height: spacing.s32,
					borderRadius: borderRadii.s16,
				}}
			/>
			<Text semiBold preset="paragraphMedium">
				{author.userName}
			</Text>
		</Box>
	)
}

export const PostHeader = memo(PostHeaderMemoized)
