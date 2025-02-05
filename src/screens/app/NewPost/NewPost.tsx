import React from 'react'
import { Image } from 'react-native'

import { Text } from '@/components'
import { useCameraRoll } from '@/services/cameraRoll'
import { ScreenTemplate } from '@/templates'

export const NewPostScreen = () => {
	const { list } = useCameraRoll()

	return (
		<ScreenTemplate scrollable>
			<Text accessibilityRole="text">NewPost</Text>
			{list.map((photo) => (
				<Image
					key={photo}
					source={{ uri: photo }}
					// eslint-disable-next-line react-native/no-inline-styles
					style={{ width: 200, height: 200 }}
				/>
			))}
		</ScreenTemplate>
	)
}
