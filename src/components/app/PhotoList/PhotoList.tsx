import React, { memo } from 'react'
import { Image } from 'react-native'

import { FlashList } from '@shopify/flash-list'

import { AppImages } from '@/assets/images'
import { usePhotoList } from '@/hooks'

import { PhotoListProps } from './PhotoList.types'

const PhotoListMemoized = ({
	urlImages = [],
	numColumns = 4,
	...propsFlashList
}: Readonly<PhotoListProps>) => {
	const { PHOTO_ITEM_WIDTH } = usePhotoList(numColumns)

	return (
		<FlashList
			accessible
			accessibilityLabel="photos"
			aria-label="photos"
			role="list"
			accessibilityRole="list"
			{...propsFlashList}
			data={urlImages}
			renderItem={({ item: urlImagem }) => (
				<Image
					accessible
					role="listitem"
					accessibilityLabel={urlImagem}
					source={{ uri: urlImagem }}
					style={{ width: PHOTO_ITEM_WIDTH, height: PHOTO_ITEM_WIDTH }}
					defaultSource={{ uri: AppImages.ImagePlaceholder }}
				/>
			)}
			keyExtractor={(urlImage, index) => `${urlImage}-${index}`}
			showsVerticalScrollIndicator={false}
			disableAutoLayout
			estimatedItemSize={PHOTO_ITEM_WIDTH * PHOTO_ITEM_WIDTH}
			numColumns={numColumns}
		/>
	)
}

export const PhotoList = memo(PhotoListMemoized)
