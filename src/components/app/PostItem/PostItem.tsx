import React, { memo } from 'react'

import {
	Box,
	PostActions,
	PostBottom,
	PostHeader,
	PostImage,
} from '@/components'

import { PostItemProps } from './PostItem.types'

const PostItemMemoized = ({
	author,
	commentCount,
	favoriteCount,
	imageURL,
	reactionCount,
	text,
}: Readonly<PostItemProps>) => {
	return (
		<Box paddingHorizontal="s24" marginBottom="s24">
			<PostHeader author={author} />
			<PostImage imageURL={imageURL} />
			<PostActions
				commentCount={commentCount}
				favoriteCount={favoriteCount}
				reactionCount={reactionCount}
			/>
			<PostBottom
				userName={author.userName}
				text={text}
				commentCount={commentCount}
			/>
		</Box>
	)
}

export const PostItem = memo(PostItemMemoized)
