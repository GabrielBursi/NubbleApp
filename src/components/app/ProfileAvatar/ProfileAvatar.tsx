import React, { memo, useCallback } from 'react'
import { Image, Pressable } from 'react-native'

import { useAppNavigation } from '@/hooks'

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
	authorId,
	...propsImg
}: Readonly<ProfileAvatarProps>) => {
	const { navigate } = useAppNavigation()

	const handleOnPress = useCallback(() => {
		navigate.toProfile(authorId!)
	}, [authorId, navigate])

	return (
		<Pressable disabled={!authorId} onPress={handleOnPress}>
			<Image
				accessible
				role="img"
				accessibilityRole="image"
				accessibilityLabel={imageURL}
				source={{ uri: imageURL }}
				style={{ width: size, height: size, borderRadius }}
				{...propsImg}
			/>
		</Pressable>
	)
}

export const ProfileAvatar = memo(ProfileAvatarMemoized)
