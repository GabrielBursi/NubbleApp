import React, { useCallback } from 'react'
import { Image } from 'react-native'

import {
	Box,
	InfinityScrollList,
	Loading,
	ProfileAvatar,
	Text,
} from '@/components'
import { PostApi } from '@/domain/Post'
import { useUserGetById } from '@/domain/User'
import { AppQueryKeys } from '@/types/api'

import { ProfileProps } from './Profile.types'

export const Profile = ({ userId }: Readonly<ProfileProps>) => {
	const { user, isLoading } = useUserGetById(userId)

	const getUserPosts = useCallback(
		(page: number) => {
			const userPosts = PostApi.GetPosts(page, String(userId))
			return userPosts
		},
		[userId]
	)

	if (isLoading || !user) return <Loading color="primaryContrast" />

	return (
		<InfinityScrollList
			accessibilityLabel="user posts"
			// TODO
			estimatedItemSize={100}
			getList={getUserPosts}
			keyExtractor={({ id }, index) => `${id}-${index}`}
			queryOpt={{ queryKey: [AppQueryKeys.POSTS, userId] }}
			ListHeaderComponent={
				<Box>
					<ProfileAvatar imageURL={user.profileUrl} />
					<Text>{user.fullName}</Text>
					<Text>{`@${user.username}`}</Text>
				</Box>
			}
			renderItem={({ item: post }) => (
				<Image
					source={{ uri: post.imageURL }}
					// eslint-disable-next-line react-native/no-inline-styles
					style={{ width: 100, height: 100 }}
					role="img"
					accessible
					accessibilityLabel={post.imageURL}
				/>
			)}
		/>
	)
}
