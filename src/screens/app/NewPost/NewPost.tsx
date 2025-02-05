import React, { useCallback, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'

import { FlashList } from '@shopify/flash-list'

import { HeaderPhotoList, PhotoList } from '@/components'
import { useCameraRoll } from '@/services/cameraRoll'
import { ScreenTemplate } from '@/templates'

export const NewPostScreen = () => {
	const [selectedImage, setSelectedImage] = useState<string>()
	const { photoList, fetchNextPage } = useCameraRoll(true, setSelectedImage)

	const flatListRef = useRef<FlashList<string>>(null)

	const handleSelectImage = useCallback((imageUri: string) => {
		setSelectedImage(imageUri)
		flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
	}, [])

	return (
		<ScreenTemplate canGoBack title="Novo post" style={styles.containerScreen}>
			<PhotoList
				ref={flatListRef}
				urlImages={photoList}
				onPressImage={handleSelectImage}
				// eslint-disable-next-line @typescript-eslint/no-misused-promises, sonarjs/no-misused-promises
				onEndReached={fetchNextPage}
				selectedImage={selectedImage}
				onEndReachedThreshold={0.1}
				ListHeaderComponent={<HeaderPhotoList selectedImage={selectedImage} />}
			/>
		</ScreenTemplate>
	)
}

const styles = StyleSheet.create({
	containerScreen: {
		paddingHorizontal: 0,
	},
})
