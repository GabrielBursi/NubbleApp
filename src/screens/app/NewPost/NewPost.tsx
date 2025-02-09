import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'

import { FlashList } from '@shopify/flash-list'

import { HeaderPhotoList, PermissionManager, PhotoList } from '@/components'
import { PhotoList as IPhotoList, useCameraRoll } from '@/services/cameraRoll'
import { usePermission } from '@/services/permission'
import { ScreenTemplate } from '@/templates'

export const NewPostScreen = () => {
	const [selectedImage, setSelectedImage] = useState<IPhotoList>()
	const [
		{
			status: photoLibraryPermissionStatus,
			isLoading: isLoadingPhotoLibraryPermission,
		},
		checkPhotoLibraryPermission,
	] = usePermission('photoLibrary')
	const { photoList, fetchNextPage } = useCameraRoll(
		photoLibraryPermissionStatus === 'granted',
		setSelectedImage
	)

	const flatListRef = useRef<FlashList<IPhotoList>>(null)

	const handleSelectImage = useCallback((image: IPhotoList) => {
		setSelectedImage(image)
		flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
	}, [])

	const indexSelectedImage = useMemo(
		() => photoList.findIndex((img) => img.id === selectedImage?.id),
		[photoList, selectedImage]
	)

	useEffect(() => {
		checkPhotoLibraryPermission()
			.then(() => {})
			.catch((err) =>
				Alert.alert('Erro ao carregar as imagens da galeria', `Erro: ${err}`)
			)
	}, [checkPhotoLibraryPermission])

	return (
		<ScreenTemplate canGoBack title="Novo post" style={styles.containerScreen}>
			<PermissionManager
				permissionName="photoLibrary"
				description="Permita o Nubble acessar as images da sua galeria."
				status={photoLibraryPermissionStatus}
				isLoading={isLoadingPhotoLibraryPermission}
			>
				<PhotoList
					ref={flatListRef}
					photos={photoList}
					onPressImage={handleSelectImage}
					// eslint-disable-next-line @typescript-eslint/no-misused-promises, sonarjs/no-misused-promises
					onEndReached={fetchNextPage}
					indexSelectedImage={indexSelectedImage}
					onEndReachedThreshold={0.1}
					ListHeaderComponent={
						<HeaderPhotoList selectedImage={selectedImage} />
					}
				/>
			</PermissionManager>
		</ScreenTemplate>
	)
}

const styles = StyleSheet.create({
	containerScreen: {
		paddingHorizontal: 0,
	},
})
