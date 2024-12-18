import React, { memo } from 'react'
import { RefreshControl } from 'react-native'

import { useScrollToTop } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'

import { Box, FeedEmpty, FeedHeader, PostItem } from '@/components'
import { PostModel, usePostList } from '@/domain/Post'

const ItemSeparatorComponent = () => <Box mb="s16" />

const FeedListMemoized = () => {
	const { error, loading, posts, fetchMorePostsWithPagination, refreshPosts } =
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
