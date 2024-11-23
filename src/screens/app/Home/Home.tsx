import React from 'react'

import { FlashList } from '@shopify/flash-list'

import { Box, FeedHeader, PostItem } from '@/components'
import { ScreenTemplate } from '@/templates'
import { mockPosts } from '@/tests/mocks/mockPosts'

const ItemSeparatorComponent = () => <Box mb="s16" />

export const HomeScreen = () => {
	return (
		<ScreenTemplate
			// eslint-disable-next-line react-native/no-inline-styles
			style={{
				paddingTop: 0,
				paddingBottom: 0,
				paddingHorizontal: 0,
			}}
		>
			<FlashList
				showsVerticalScrollIndicator={false}
				data={mockPosts}
				keyExtractor={(post) => post.id}
				renderItem={({ item: post }) => <PostItem {...post} />}
				ItemSeparatorComponent={ItemSeparatorComponent}
				ListHeaderComponent={FeedHeader}
				disableAutoLayout
				estimatedItemSize={300}
				accessible
				accessibilityLabel="feed"
				aria-label="feed"
				role="list"
				accessibilityRole="list"
			/>
		</ScreenTemplate>
	)
}
