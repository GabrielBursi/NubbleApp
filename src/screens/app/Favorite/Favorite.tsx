import React from 'react'
import { Dimensions, Image } from 'react-native'

import { InfinityScrollList, PressableBox, Text } from '@/components'
import {
	PostReactionApi,
	PostReactionModel,
	PostReactionType,
} from '@/domain/PostReaction'
import { ScreenTemplate } from '@/templates'
import { AppQueryKeys } from '@/types/api'
import { FavoriteScreenProps } from '@/types/screens'

const NUM_COLUMNS = 2
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_PADDING = 24
const ITEM_MARGIN = 16
const ITEM_WITH =
	(SCREEN_WIDTH - ITEM_MARGIN - SCREEN_PADDING * 2) / NUM_COLUMNS

//TODO: navegação, estimatedItemSize, estilo contentContainerStyle columnWrapperStyle, separar componente de item

export const FavoriteScreen = ({ navigation }: FavoriteScreenProps) => {
	return (
		<ScreenTemplate title="Favoritos">
			<InfinityScrollList<PostReactionModel>
				accessibilityLabel="favorites"
				estimatedItemSize={100}
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
							navigation.navigate('PostCommentScreen', {
								postId: item.post.id,
								postAuthorId: item.author.id.toString(),
								showPost: true,
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
				// contentContainerStyle={{ rowGap: SCREEN_PADDING }}
				// columnWrapperStyle={{ columnGap: ITEM_MARGIN }}
				errorMessage="erro ao carregar favoritos"
				emptyMessage="não há favoritos"
			/>
		</ScreenTemplate>
	)
}
