import React, { useCallback, useState } from 'react'
import { Dimensions, Image, Pressable } from 'react-native'

import {
	Container,
	InfinityScrollList,
	Loading,
	ProfileHeader,
} from '@/components'
import { PostApi } from '@/domain/Post'
import { useUserGetById } from '@/domain/User'
import { useAppNavigation } from '@/hooks'
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
	const { navigate } = useAppNavigation()

	const [postsCount, setPostsCount] = useState(0)

	const getUserPosts = useCallback(
		async (page: number) => {
			const userPosts = await PostApi.GetPosts(page, String(userId))
			setPostsCount(userPosts.meta.total)
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
					<ProfileHeader
						isMyProfile={isMyProfile}
						user={user}
						postsCount={postsCount}
					/>
				</Container>
			}
			ItemSeparatorComponent={null}
			renderItem={({ item: post }) => (
				<Pressable
					onPress={() => {
						navigate.toPostDetails({
							postAuthorId: userId.toString(),
							postId: post.id,
						})
					}}
				>
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
				</Pressable>
			)}
		/>
	)
}
