import React, { memo } from 'react'
import { ImageBackground, StyleSheet } from 'react-native'

import { AppImages } from '@/assets/images'
import { ActionIcon, Box, Button, Container, Text } from '@/components'
import { useAppNavigation, usePhotoList } from '@/hooks'

import { HeaderPhotoListProps } from './HeaderPhotoList.types'

const HeaderPhotoListMemoized = ({
	selectedImage,
}: Readonly<HeaderPhotoListProps>) => {
	const { PHOTO_ITEM_WIDTH } = usePhotoList(1)

	const { navigationAppStack } = useAppNavigation()

	const navigateToPublishPost = () => {
		navigationAppStack.navigate('PublishPostScreen', {
			imageUri: selectedImage!.uri,
		})
	}

	const navigateToCamera = () => {
		navigationAppStack.navigate('CameraScreen')
	}

	return (
		<Box>
			<ImageBackground
				accessible
				role="banner"
				accessibilityLabel={selectedImage?.uri}
				source={
					selectedImage?.uri
						? { uri: selectedImage?.uri }
						: AppImages.ImagePlaceholder
				}
				defaultSource={AppImages.ImagePlaceholder}
				style={[
					{
						width: PHOTO_ITEM_WIDTH,
						height: PHOTO_ITEM_WIDTH,
					},
					styles.imageBackground,
				]}
			>
				{!!selectedImage && (
					<Button
						title="Escolher essa"
						mb="s24"
						preset="ghost"
						onPress={navigateToPublishPost}
					/>
				)}
			</ImageBackground>
			<Container
				flexDirection="row"
				paddingVertical="s16"
				justifyContent="space-between"
				alignItems="center"
				flex={0}
			>
				<Text preset="headingSmall">Sua galeria</Text>
				<ActionIcon name={{ default: 'camera' }} onPress={navigateToCamera} />
			</Container>
		</Box>
	)
}

export const HeaderPhotoList = memo(HeaderPhotoListMemoized)

const styles = StyleSheet.create({
	imageBackground: {
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
})
