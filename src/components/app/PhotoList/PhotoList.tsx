import React, { forwardRef, memo } from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'

import { FlashList } from '@shopify/flash-list'

import { AppImages } from '@/assets/images'
import { usePhotoList } from '@/hooks'
import { themeConfig } from '@/styles'

import { PhotoListProps } from './PhotoList.types'

const PhotoListMemoized = forwardRef<
	FlashList<string>,
	Readonly<PhotoListProps>
>(
	(
		{
			urlImages = [],
			numColumns = 4,
			onPressImage,
			selectedImage,
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
				extraData={selectedImage}
				{...propsFlashList}
				data={urlImages}
				renderItem={({ item: urlImagem }) => (
					<Pressable onPress={() => onPressImage?.(urlImagem)}>
						<Image
							accessible
							role="listitem"
							accessibilityLabel={urlImagem}
							source={{ uri: urlImagem }}
							style={[
								{ width: PHOTO_ITEM_WIDTH, height: PHOTO_ITEM_WIDTH },
								selectedImage === urlImagem && styles.imageSelected,
							]}
							defaultSource={AppImages.ImagePlaceholder}
						/>
					</Pressable>
				)}
				keyExtractor={(urlImage, index) => `${urlImage}-${index}`}
				showsVerticalScrollIndicator={false}
				disableAutoLayout
				estimatedItemSize={PHOTO_ITEM_WIDTH * PHOTO_ITEM_WIDTH}
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
