import React, { memo } from 'react'
import { ImageBackground, StyleSheet } from 'react-native'

import { AppImages } from '@/assets/images'
import { Box, Button, Container, Icon, Text } from '@/components'
import { useNavigationApp, usePhotoList } from '@/hooks'

import { HeaderPhotoListProps } from './HeaderPhotoList.types'

const HeaderPhotoListMemoized = ({
	selectedImage,
}: Readonly<HeaderPhotoListProps>) => {
	const { PHOTO_ITEM_WIDTH } = usePhotoList(1)

	const { navigationAppStack } = useNavigationApp()

	const navigateToPublishPost = () => {
		navigationAppStack.navigate('PublishPostScreen', {
			imageUri: selectedImage!,
		})
	}

	return (
		<Box>
			<ImageBackground
				accessible
				role="banner"
				accessibilityLabel={selectedImage ?? AppImages.ImagePlaceholder}
				source={{ uri: selectedImage ?? AppImages.ImagePlaceholder }}
				defaultSource={{ uri: AppImages.ImagePlaceholder }}
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
				<Icon name="camera" />
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
