import React, { memo } from 'react'

import { FlashList } from '@shopify/flash-list'

import { Box, FeedEmpty, FeedHeader, PostItem } from '@/components'
import { usePostList } from '@/domain/Post'

const ItemSeparatorComponent = () => <Box mb="s16" />

const FeedListMemoized = () => {
	const { error, loading, posts, refetch } = usePostList()

	return (
		<FlashList
			showsVerticalScrollIndicator={false}
			data={posts}
			keyExtractor={(post) => post.id}
			renderItem={({ item: post }) => <PostItem {...post} />}
			ItemSeparatorComponent={ItemSeparatorComponent}
			ListHeaderComponent={FeedHeader}
			ListEmptyComponent={
				<FeedEmpty refetch={refetch} error={error} loading={loading} />
			}
			disableAutoLayout
			estimatedItemSize={300}
			accessible
			accessibilityLabel="feed"
			aria-label="feed"
			role="list"
			accessibilityRole="list"
		/>
	)
}

export const FeedList = memo(FeedListMemoized)
