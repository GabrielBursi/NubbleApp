import React, { memo } from 'react'
import { Dimensions, Image } from 'react-native'

import normalize from 'react-native-normalize'

import { PostImageProps } from './PostImage.types'

const PostImageMemoized = ({ imageURL }: Readonly<PostImageProps>) => {
	const screenWidth = Dimensions.get('screen').width

	return (
		<Image
			source={{ uri: imageURL }}
			resizeMode="cover"
			// eslint-disable-next-line react-native/no-inline-styles
			style={{
				width: screenWidth,
				height: screenWidth,
				marginHorizontal: -normalize(24, 'width'),
			}}
			accessible
			accessibilityRole="image"
			aria-label={imageURL}
			accessibilityLabel={imageURL}
			role="img"
		/>
	)
}

export const PostImage = memo(PostImageMemoized)
