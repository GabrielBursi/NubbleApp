import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'

import { FlashList } from '@shopify/flash-list'

import { HeaderPhotoList, PhotoList } from '@/components'
import { useCameraRoll } from '@/services/cameraRoll'
import { usePermission } from '@/services/permission'
import { ScreenTemplate } from '@/templates'

export const NewPostScreen = () => {
	const [selectedImage, setSelectedImage] = useState<string>()
	const [
		{ status: photoLibraryPermissionStatus },
		checkPhotoLibraryPermission,
	] = usePermission('photoLibrary')
	const { photoList, fetchNextPage } = useCameraRoll(
		photoLibraryPermissionStatus === 'granted',
		setSelectedImage
	)

	const flatListRef = useRef<FlashList<string>>(null)

	const handleSelectImage = useCallback((imageUri: string) => {
		setSelectedImage(imageUri)
		flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
	}, [])

	useEffect(() => {
		checkPhotoLibraryPermission()
			.then(() => {})
			.catch((err) =>
				Alert.alert('Erro ao carregar as imagens da galeria', `Erro: ${err}`)
			)
	}, [checkPhotoLibraryPermission])

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
