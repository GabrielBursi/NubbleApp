import React, { useCallback } from 'react'
import { Dimensions, Image } from 'react-native'

import {
	Container,
	InfinityScrollList,
	Loading,
	ProfileHeader,
} from '@/components'
import { PostApi } from '@/domain/Post'
import { useUserGetById } from '@/domain/User'
import { AppQueryKeys } from '@/types/api'

import { ProfileProps } from './Profile.types'

const NUM_COLUMNS = 3
const SCREEN_WIDTH = Dimensions.get('screen').width
const ITEM_WIDTH = SCREEN_WIDTH / NUM_COLUMNS

export const Profile = ({
	userId,
	isMyProfile = false,
}: Readonly<ProfileProps>) => {
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
			estimatedItemSize={ITEM_WIDTH}
			getList={getUserPosts}
			keyExtractor={({ id }, index) => `${id}-${index}`}
			queryOpt={{ queryKey: [AppQueryKeys.POSTS, userId] }}
			numColumns={NUM_COLUMNS}
			ListHeaderComponent={
				<Container>
					<ProfileHeader isMyProfile={isMyProfile} user={user} />
				</Container>
			}
			ItemSeparatorComponent={null}
			renderItem={({ item: post }) => (
				<Image
					source={{ uri: post.imageURL }}
					// eslint-disable-next-line react-native/no-inline-styles
					style={{
						width: ITEM_WIDTH,
						height: ITEM_WIDTH,
					}}
					role="img"
					accessible
					accessibilityLabel={post.imageURL}
				/>
			)}
		/>
	)
}
