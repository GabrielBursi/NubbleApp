import React, { memo } from 'react'
import { Image } from 'react-native'

import { PostImageProps } from './PostImage.types'

const PostImageMemoized = ({ imageURL }: Readonly<PostImageProps>) => {
	return (
		<Image
			source={{ uri: imageURL }}
			resizeMode="cover"
			// eslint-disable-next-line react-native/no-inline-styles
			style={{ width: 'auto', height: 300 }}
			accessible
			accessibilityRole="image"
			aria-label={imageURL}
			accessibilityLabel={imageURL}
			role="img"
		/>
	)
}

export const PostImage = memo(PostImageMemoized)
