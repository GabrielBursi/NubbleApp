import React, { forwardRef, memo } from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'

import { FlashList } from '@shopify/flash-list'

import { AppImages } from '@/assets/images'
import { usePhotoList } from '@/hooks'
import { PhotoList as IPhotoList } from '@/services/multimedia'
import { themeConfig } from '@/styles'

import { PhotoListProps } from './PhotoList.types'

const PhotoListMemoized = forwardRef<
	FlashList<IPhotoList>,
	Readonly<PhotoListProps>
>(
	(
		{
			photos = [],
			numColumns = 4,
			onPressImage,
			indexSelectedImage,
			...propsFlashList
		},
		ref
	) => {
		const { PHOTO_ITEM_WIDTH } = usePhotoList(numColumns)

		return (
			<FlashList
				accessible
				accessibilityLabel="photos"
				aria-label="photos"
				role="list"
				accessibilityRole="list"
				ref={ref}
				extraData={indexSelectedImage}
				{...propsFlashList}
				data={photos}
				renderItem={({ item: image, index }) => (
					<Pressable onPress={() => onPressImage?.(image)}>
						<Image
							accessible
							role="listitem"
							accessibilityLabel={image.uri}
							source={{ uri: image.uri }}
							style={[
								{ width: PHOTO_ITEM_WIDTH, height: PHOTO_ITEM_WIDTH },
								indexSelectedImage === index && styles.imageSelected,
							]}
							defaultSource={AppImages.ImagePlaceholder}
						/>
					</Pressable>
				)}
				keyExtractor={(image, index) => `${image.id}-${image.uri}-${index}`}
				showsVerticalScrollIndicator={false}
				disableAutoLayout
				estimatedItemSize={PHOTO_ITEM_WIDTH}
				numColumns={numColumns}
			/>
		)
	}
)

//TODO: criar componente de imagem com restyle

const styles = StyleSheet.create({
	imageSelected: {
		borderColor: themeConfig.colors.greenPrimary,
		borderWidth: 2,
		opacity: 0.4,
	},
})

export const PhotoList = memo(PhotoListMemoized)
