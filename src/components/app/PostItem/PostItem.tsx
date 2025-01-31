import React, { memo } from 'react'

import {
	Box,
	PostActions,
	PostBottom,
	PostImage,
	ProfileUsername,
} from '@/components'

import { PostItemProps } from './PostItem.types'

const PostItemMemoized = ({
	author,
	commentCount,
	favoriteCount,
	imageURL,
	reactionCount,
	text,
	id,
}: Readonly<PostItemProps>) => {
	return (
		<Box paddingHorizontal="s24" marginBottom="s24" role="listitem" accessible>
			<ProfileUsername
				profileUrl={author.profileURL}
				username={author.userName}
				id={Number(author.id)}
			/>
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
				id={id}
				authorId={author.id}
			/>
		</Box>
	)
}

export const PostItem = memo(PostItemMemoized)
