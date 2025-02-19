import React, { useState } from 'react'
import { Dimensions, Image } from 'react-native'

import { Box, Button, TextInput } from '@/components'
import { usePostCreate } from '@/domain/Post'
import { useNavigationApp } from '@/hooks'
import { useToastService } from '@/services/toast'
import { ScreenTemplate } from '@/templates'
import { PublishPostScreenProps } from '@/types/screens'

const IMAGE_WIDTH = Dimensions.get('screen').width / 2

export const PublishPostScreen = ({
	route,
}: Readonly<PublishPostScreenProps>) => {
	const imageUri = route.params.imageUri

	const [description, setDescription] = useState('')
	const { navigationAppTab } = useNavigationApp()
	const { showToast } = useToastService()
	const { createPost, loading } = usePostCreate({
		onSuccess: () => {
			navigationAppTab.navigate('HomeScreen')
			showToast({ message: 'Foto publicada!', type: 'success' })
		},
	})

	const publishPost = () => {
		createPost({ description, imageUri })
	}

	return (
		<ScreenTemplate scrollable canGoBack title="Novo Post">
			<Box mt="s20" gap="s10">
				<Image
					accessible
					accessibilityLabel={imageUri}
					role="img"
					source={{
						uri: imageUri,
					}}
					// eslint-disable-next-line react-native/no-inline-styles
					style={{
						width: IMAGE_WIDTH,
						height: IMAGE_WIDTH,
						alignSelf: 'center',
					}}
				/>
				<TextInput.TextArea
					label="Escreva uma legenda"
					value={description}
					onChangeText={setDescription}
				/>
				<Button
					title="Publicar post"
					onPress={publishPost}
					loading={loading}
					disabled={!description.length}
				/>
			</Box>
		</ScreenTemplate>
	)
}
