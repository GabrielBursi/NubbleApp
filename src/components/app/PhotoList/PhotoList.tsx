import React, { memo } from 'react'
import { Image } from 'react-native'

import { FlashList } from '@shopify/flash-list'

import { HeaderPhotoList } from '@/components'
import { usePhotoList } from '@/hooks'

import { PhotoListProps } from './PhotoList.types'

const NUM_COLUMNS = 4

const PhotoListMemoized = ({ urlImages = [] }: Readonly<PhotoListProps>) => {
	const { PHOTO_ITEM_WIDTH } = usePhotoList(NUM_COLUMNS)

	return (
		<FlashList
			data={urlImages}
			renderItem={({ item: urlImagem }) => (
				<Image
					accessible
					role="listitem"
					accessibilityLabel={urlImagem}
					source={{ uri: urlImagem }}
					style={{ width: PHOTO_ITEM_WIDTH, height: PHOTO_ITEM_WIDTH }}
				/>
			)}
			numColumns={NUM_COLUMNS}
			keyExtractor={(urlImage, index) => `${urlImage}-${index}`}
			showsVerticalScrollIndicator={false}
			disableAutoLayout
			estimatedItemSize={PHOTO_ITEM_WIDTH * PHOTO_ITEM_WIDTH}
			accessible
			accessibilityLabel="photos"
			aria-label="photos"
			role="list"
			accessibilityRole="list"
			ListHeaderComponent={<HeaderPhotoList imageSelected={urlImages[0]} />}
		/>
	)
}

export const PhotoList = memo(PhotoListMemoized)
