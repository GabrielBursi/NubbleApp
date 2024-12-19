import React, { memo } from 'react'
import { Image } from 'react-native'

import { ProfileAvatarProps } from './ProfileAvatar.types'
/**
 * @param imageURL
 * @param size
 * @default 32
 * @param borderRadius
 * @default 14
 */
const ProfileAvatarMemoized = ({
	imageURL,
	size = 32,
	borderRadius = 14,
	...propsImg
}: Readonly<ProfileAvatarProps>) => {
	return (
		<Image
			accessible
			role="img"
			accessibilityRole="image"
			accessibilityLabel={imageURL}
			source={{ uri: imageURL }}
			style={{ width: size, height: size, borderRadius }}
			{...propsImg}
		/>
	)
}

export const ProfileAvatar = memo(ProfileAvatarMemoized)
