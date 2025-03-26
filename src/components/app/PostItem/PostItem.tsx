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
	post,
	hideCommentAction = false,
}: Readonly<PostItemProps>) => {
	const { author, imageURL, text, id, commentCount } = post

	return (
		<Box
			paddingHorizontal="s24"
			marginBottom="s24"
			role="listitem"
			accessible
			accessibilityLabel={author.userName}
			aria-label={author.userName}
		>
			<ProfileUsername
				profileUrl={author.profileURL}
				username={author.userName}
				id={Number(author.id)}
			/>
			<PostImage imageURL={imageURL} />
			<PostActions post={post} hideCommentAction={hideCommentAction} />
			<PostBottom
				userName={author.userName}
				text={text}
				commentCount={commentCount}
				id={id}
				authorId={author.id}
				hideCommentAction={hideCommentAction}
			/>
		</Box>
	)
}

export const PostItem = memo(PostItemMemoized)
