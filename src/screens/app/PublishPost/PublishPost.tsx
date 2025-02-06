import React, { useState } from 'react'
import { Dimensions, Image } from 'react-native'

import { Box, Button, TextInput } from '@/components'
import { ScreenTemplate } from '@/templates'
import { PublishPostScreenProps } from '@/types/screens'

const IMAGE_WIDTH = Dimensions.get('screen').width / 2

export const PublishPostScreen = ({
	route,
}: Readonly<PublishPostScreenProps>) => {
	const [description, setDescription] = useState('')

	return (
		<ScreenTemplate scrollable canGoBack title="Novo Post">
			<Box mt="s20" gap="s10">
				<Image
					accessible
					accessibilityLabel={route.params.imageUri}
					role="img"
					source={{
						uri: route.params.imageUri,
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
				<Button title="Publicar post" />
			</Box>
		</ScreenTemplate>
	)
}
