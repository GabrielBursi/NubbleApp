import React from 'react'
import { Dimensions, Image } from 'react-native'

import normalize from 'react-native-normalize'

import { InfinityScrollList, PressableBox, Text } from '@/components'
import {
	PostReactionApi,
	PostReactionModel,
	PostReactionType,
} from '@/domain/PostReaction'
import { useAppNavigation } from '@/hooks'
import { ScreenTemplate } from '@/templates'
import { AppQueryKeys } from '@/types/api'

const NUM_COLUMNS = 2
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_PADDING = normalize(24, 'width')
const ITEM_MARGIN = normalize(16, 'width')
const ITEM_WITH =
	(SCREEN_WIDTH - ITEM_MARGIN - SCREEN_PADDING * 2) / NUM_COLUMNS

export const FavoriteScreen = () => {
	const { navigate } = useAppNavigation()

	return (
		<ScreenTemplate title="Favoritos">
			<InfinityScrollList<PostReactionModel>
				accessibilityLabel="favorites"
				// Pixel 5 API 34
				estimatedItemSize={200}
				keyExtractor={(item, index) => `${item.id}-${index}`}
				queryOpt={{ queryKey: [AppQueryKeys.FAVORITES] }}
				getList={(page) =>
					PostReactionApi.GetMyReactions(PostReactionType.FAVORITE, page)
				}
				renderItem={({ item }) => (
					<PressableBox
						accessible
						role="listitem"
						accessibilityLabel={item.post.text}
						testID="favorite-item"
						onPress={() =>
							navigate.toPostDetails({
								postId: item.post.id,
								postAuthorId: item.author.id.toString(),
							})
						}
					>
						<Image
							role="img"
							accessible
							accessibilityLabel={item.post.imageURL}
							source={{ uri: item.post.imageURL }}
							style={{ width: ITEM_WITH, height: ITEM_WITH }}
						/>
						<Text mt="s4" semiBold>
							{item.author.username}
						</Text>
					</PressableBox>
				)}
				numColumns={NUM_COLUMNS}
				errorMessage="erro ao carregar favoritos"
				emptyMessage="não há favoritos"
			/>
		</ScreenTemplate>
	)
}
