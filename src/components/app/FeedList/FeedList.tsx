import React, { memo } from 'react'

import { FeedHeader, InfinityScrollList, PostItem } from '@/components'
import { PostApi } from '@/domain/Post'
import { AppQueryKeys } from '@/types/api'

const FeedListMemoized = () => {
	return (
		<InfinityScrollList
			getList={PostApi.GetPosts}
			queryOpt={{ queryKey: [AppQueryKeys.POSTS] }}
			accessibilityLabel="feed"
			estimatedItemSize={714}
			keyExtractor={(post, index) => `${post.id}-${index}`}
			renderItem={({ item: post }) => <PostItem post={post} />}
			ListHeaderComponent={FeedHeader}
			emptyMessage="Não há publicações no seu feed"
			errorMessage="Não foi possível carregar o feed 😢"
		/>
	)
}

export const FeedList = memo(FeedListMemoized)
