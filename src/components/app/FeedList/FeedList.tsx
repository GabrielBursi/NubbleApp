import React, { memo } from 'react'
import { RefreshControl } from 'react-native'

import { useScrollToTop } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'

import { Box, FeedEmpty, FeedHeader, PostItem } from '@/components'
import { PostModel, usePostList } from '@/domain/Post'

const ItemSeparatorComponent = () => <Box mb="s16" />

const FeedListMemoized = () => {
	const { error, isLoading, posts, fetchMorePosts, refreshPosts } =
		usePostList()
	const flatListRef = React.useRef<FlashList<PostModel>>(null)
	//TODO: atualizar react navigation https://github.com/react-navigation/react-navigation/commit/a1f947a44f16a8d846c31d76efb0485780bd8de3
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
	useScrollToTop(flatListRef as any)

	return (
		<FlashList
			ref={flatListRef}
			showsVerticalScrollIndicator={false}
			data={posts}
			keyExtractor={(post, index) => `${post.id}-${index}`}
			renderItem={({ item: post }) => <PostItem {...post} />}
			ItemSeparatorComponent={ItemSeparatorComponent}
			ListHeaderComponent={FeedHeader}
			ListEmptyComponent={
				<FeedEmpty refetch={refreshPosts} error={error} loading={isLoading} />
			}
			refreshing={isLoading}
			refreshControl={
				// eslint-disable-next-line @typescript-eslint/no-misused-promises, sonarjs/no-misused-promises
				<RefreshControl refreshing={isLoading} onRefresh={refreshPosts} />
			}
			disableAutoLayout
			// size PostItem device: Pixel 8 Pro API 34
			estimatedItemSize={714}
			// eslint-disable-next-line @typescript-eslint/no-misused-promises, sonarjs/no-misused-promises
			onEndReached={fetchMorePosts}
			onEndReachedThreshold={0.1}
			accessible
			accessibilityLabel="feed"
			aria-label="feed"
			role="list"
			accessibilityRole="list"
		/>
	)
}

export const FeedList = memo(FeedListMemoized)
