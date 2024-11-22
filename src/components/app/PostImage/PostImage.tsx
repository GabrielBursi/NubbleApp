import React, { memo } from 'react'
import { Dimensions, Image } from 'react-native'

import { PostImageProps } from './PostImage.types'

const PostImageMemoized = ({ imageURL }: Readonly<PostImageProps>) => {
	return (
		<Image
			source={{ uri: imageURL }}
			resizeMode="cover"
			// eslint-disable-next-line react-native/no-inline-styles
			style={{
				width: Dimensions.get('screen').width,
				height: 300,
				marginHorizontal: -23,
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
