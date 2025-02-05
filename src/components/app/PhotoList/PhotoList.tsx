import React, { memo } from 'react'
import { Dimensions, Image } from 'react-native'

import { FlashList } from '@shopify/flash-list'

import { PhotoListProps } from './PhotoList.types'

const SCREEN_WIDTH = Dimensions.get('screen').width
const NUM_COLUMNS = 4
const ITEM_WIDTH = SCREEN_WIDTH / NUM_COLUMNS

const PhotoListMemoized = ({ urlImages = [] }: Readonly<PhotoListProps>) => {
	return (
		<FlashList
			data={urlImages}
			renderItem={({ item: urlImagem }) => (
				<Image
					accessible
					role="listitem"
					accessibilityLabel={urlImagem}
					source={{ uri: urlImagem }}
					style={{ width: ITEM_WIDTH, height: ITEM_WIDTH }}
				/>
			)}
			numColumns={NUM_COLUMNS}
			keyExtractor={(urlImage, index) => `${urlImage}-${index}`}
			showsVerticalScrollIndicator={false}
			disableAutoLayout
			estimatedItemSize={ITEM_WIDTH * ITEM_WIDTH}
			accessible
			accessibilityLabel="photos"
			aria-label="photos"
			role="list"
			accessibilityRole="list"
		/>
	)
}

export const PhotoList = memo(PhotoListMemoized)
