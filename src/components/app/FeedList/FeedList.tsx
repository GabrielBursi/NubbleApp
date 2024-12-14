import React, { memo } from 'react'
import { RefreshControl } from 'react-native'

import { FlashList } from '@shopify/flash-list'

import { Box, FeedEmpty, FeedHeader, PostItem } from '@/components'
import { usePostList } from '@/domain/Post'

const ItemSeparatorComponent = () => <Box mb="s16" />

const FeedListMemoized = () => {
	const { error, loading, posts, fetchMorePostsWithPagination, refreshPosts } =
		usePostList()

	return (
		<FlashList
			showsVerticalScrollIndicator={false}
			data={posts}
			keyExtractor={(post) => post.id}
			renderItem={({ item: post }) => <PostItem {...post} />}
			ItemSeparatorComponent={ItemSeparatorComponent}
			ListHeaderComponent={FeedHeader}
			ListEmptyComponent={
				<FeedEmpty refetch={refreshPosts} error={error} loading={loading} />
			}
			refreshing={loading}
			refreshControl={
				<RefreshControl refreshing={loading} onRefresh={refreshPosts} />
			}
			disableAutoLayout
			estimatedItemSize={300}
			onEndReached={fetchMorePostsWithPagination}
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
